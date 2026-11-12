# Design

## Context

见 `proposal.md — Why`。当前实现的关键约束：

- `auth.js` 的 `readCredentials` 是唯一的凭据入口，`client.js` 的 `request()` 每次调用都重新读取它，因此换令牌无需重启进程。这个特性必须保留。
- 路由白名单定义在 `client.js` 的模块级 `routes` 常量中，`validate()` 是无状态的纯函数，当前不接触凭据。
- 身份字段现在硬编码在 `server.js` 的 `contextTool` 与 `workitems.js` 的 `writeResult` 两处。
- `server.js` 的工具注册已经收敛到单一循环，是所有工具的唯一切面。
- `bounded()` 输出预算在注册循环内执行，会按键优先级裁剪。

## Goals / Non-Goals

**Goals:**

- 让同一份凭据文件可以表达两种鉴权模式，且企业格式零迁移、零行为变化。
- 把"我是什么身份"变成从凭据推导的单一事实来源，消除硬编码。
- 身份查询与其他工具彻底分离：业务结果永远不含当前用户。

**Non-Goals:**

- 不实现授权码流程与 refresh_token 续期（`refresh_token` 明确拒绝）。
- 不做 scope 自检或权限预检接口（官方无 introspection 端点）。
- 不实现令牌过期自动续期；PAT 过期按 401 处理。
- 不改动 DSH / Codex 的接入方式，仍是"命令 + 凭据文件路径"。

## Decisions

### D1：同一文件 + `auth_mode` 判别字段

凭据文件保持单一路径。缺省 `auth_mode` 即企业凭据，`auth_mode: "personal"` 为个人令牌。

- **为什么**：`server.js` 只接受一个参数，双文件方案需要新增命令行参数并让所有既有配置失效；判别字段让既有 `credentials.json` 无需改动。
- **备选**：独立 `personal.json` + `--pat` 参数（隔离更好，但配置面变大、两种凭据无法共用同一条 MCP 配置）；按文件名嗅探（隐式、易错，拒绝）。
- **代价**：模式判别放在文件内容里，意味着读到文件才知道模式，无法在启动时静态确定。

### D2：个人凭据采用独立的键白名单

个人文件只允许 `auth_mode`、`access_token`、`token_type`、`obtained_at`；出现 `grant_type` 或 `refresh_token` 直接判为格式错误。

- **为什么**：`grant_type: authorization_code` 的用户令牌是第三种语义（归属用户但有 refresh 生命周期），必须与 PAT 区分开，否则会鼓励错误的续期预期。白名单而非黑名单，延续现有"严格对象"风格。
- **备选**：复用企业校验再加分支（会产生大量 `if`，且容易漏判）。

### D3：`import` 是独立命令，不复用 `acquire`

`acquire` 走网络交换，`import` 走本地令牌导入，两者的输入、失败模式、幂等性都不同。

- **为什么**：合并会让 `acquire` 同时承担"有 secret"和"有 token"两条路径，破坏现有的原子写入与 `OUTPUT_EXISTS` 语义。
- **令牌来源**：仅 0600 文件或 stdin。**拒绝 argv 传令牌**，因为 `ps` 与 shell history 会泄漏。
- **可选 `--check`**：先用 `/v2/myself` 预检，失败则不落盘，避免存进一个无效令牌。

### D4：模式判定放在客户端，身份注入放在注册循环

- `client.js` 新增 `validate()` 的模式参数：路由表为个人模式追加 `/v2/myself`，企业模式仍返回 `ROUTE_NOT_ALLOWED`。`request()` 改为先读凭据、再校验路由（原顺序相反）。本地读取不产生网络副作用，因此"非法路由不触网"的既有保证不变。
- `client.js` 新增 `identity()`：读一次凭据，返回 `{ auth_mode, actor, current_user: null }`，**不产生任何 HTTP 请求**。
- `server.js` 的注册循环在 `execute` 前后各做一件事：调用 `identity()` 取身份、把身份并入输出。工具本身不再写身份字段。

- **为什么**：注册循环是唯一切面，能保证十一个工具的身份字段不可能不一致；把 `identity()` 做成无网络调用，使只读工具不会因为身份查询多付一次请求。
- **代价**：每次工具调用多一次本地文件读取。选"不缓存"是因为缓存会引入模式过期问题（用户重新 `import` 后进程仍用旧模式），而 0600 小文件的读取成本可忽略。
- **备选**：在 `PingCodeClient` 构造时确定模式（模式可热换，拒绝）；让每个工具自己读凭据（重复且易漏，拒绝）。

### D5：身份字段在 `bounded()` 之前注入，并加入裁剪优先级

`server.js` 的 `bounded()` 按 `['id','result','target','dry_run','html_url','url']` 排序保留关键键。设计上把身份键加入该优先级列表，使输出被裁剪时身份仍然可见。

- **为什么**：否则超大返回会把 `auth_mode` 裁掉，模型无法判断当前是哪种身份在操作。
- **注意**：注入必须发生在 `bounded()` 之前，且在 `redactOutput()` 之前不受影响。

### D6：身份查询是第十一个工具，而不是 `get_context` 的开关

工具名 `pingcode_get_current_user`，无必需参数，只读注解。

- **为什么**：`get_context` 的契约明确写着"不推断个人身份"，把身份塞进去会破坏它。独立工具让"谁能查身份"变成路由级的硬约束，也便于测试。
- **企业模式**：直接返回 `IDENTITY_REQUIRES_PERSONAL_TOKEN`，在发请求前失败。
- **scope 不足**：透传上游状态码，不伪造身份。

### D7：PAT 默认可读可写，不引入写入开关

- **为什么**：多一个开关就多一种状态组合，且用户已明确不需要；PAT 的收窄手段是令牌自身的 scopes 与有效期，重复授权是冗余。
- **代价**：误写风险上升。缓解方式是保持既有的 `dry_run`、`expected_updated_at` 乐观并发与写前校验不变。

### D8：`verify` 分模式，企业分支逐字不变

- 企业：仍只探 `/v2/directory/team`、`/v2/pjm/projects`、`/v2/wiki/spaces`，`current_user` 恒为 `null`。
- 个人：额外探 `/v2/myself`；成功则填 `current_user`，scope 不足则标 `identity_unverified: true` 而不报错。

- **为什么**：现有测试把"企业模式不调 `/v2/myself`"当作安全不变量断言，保持它可让回归测试零改动。

## Risks / Trade-offs

- **[工作项端点对用户令牌的实测缺失]** 官方文档对所有接口标注"企业令牌/用户令牌"，但未逐条验证 → 实现后第一步用真实 PAT 冒烟只读工具，把结果记入 README。
- **[scope 不足只能靠 403 发现]** 没有 introspection 端点 → `verify` 逐项报告 403，README 列出最小 scope 清单。
- **[PAT 过期无预警]** 凭据文件不含可信过期时间 → 过期表现为 `PINGCODE_HTTP_401`；如需提醒，可在导入时记录 `obtained_at` 并在 `verify` 里提示年龄。
- **[身份字段污染业务结果]** 身份注入改变所有工具输出形状 → 新增测试锁定：业务工具 `current_user` 恒为 `null`。
- **[工具数从 10 变 11]** 现有测试断言 `tools.length === 10` → 计划内更新为 11，并保留"参数不接受额外属性"的断言。
- **[`request()` 校验顺序变化]** 先读凭据再校验路由 → 保证非法路由仍然零网络请求；补一条测试锁定。
- **[写操作以个人名义留痕]** 审计语义改变 → 工具描述与 README 明确说明，`actor: "user"` 如实上报。

## Migration Plan

1. 企业用户：无操作。既有 `credentials.json` 不含 `auth_mode`，按企业凭据继续工作。
2. 个人用户：`node auth.js import <token-file> <credentials.json>`（或 `-` 走 stdin）。
3. 回滚：删除 `openspec/` 变更与代码提交即可；个人凭据文件对企业路径无影响，反之亦然。
4. 兼容性：`auth_mode` 新增取值属于增量；依赖 `enterprise` 字面量的消费者不受影响。
