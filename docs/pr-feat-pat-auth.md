# PR 草案：feat(auth): 支持个人访问令牌，工具集增至 11 个

- **分支**：`feat/pat-auth` → `main`
- **提交**：`7360438`、`694628b`、`ae163e6`
- **对比链接**：<https://github.com/duyang92/pingcode-mcp/compare/main...feat/pat-auth>
- **用法**：下面「PR 正文」一节可直接粘贴到 GitHub 的 PR description。

---

## PR 正文

### 概述

为 pingcode-mcp 增加 **PingCode 个人访问令牌（Personal Access Token）** 鉴权，使没有企业后台权限的成员也能使用这套 MCP。企业令牌（Client Credentials）路径保持完全不变，两种凭据共用同一个 `credentials.json`，靠文件内的 `auth_mode` 区分。

### 背景

此前只能使用企业令牌，而它需要在 PingCode 企业后台「应用 → 凭据管理」中创建，普通成员没有该入口。官方同时提供个人访问令牌：在个人设置里自助创建、可随时撤销、按 scopes 收窄，正好覆盖这类场景。

但原实现把"企业应用身份"写死在三处：凭据文件只接受 `grant_type=client_credentials`、工具结果固定返回 `auth_mode: "enterprise"` / `actor: "application"`、路由白名单拒绝 `/v2/myself`。直接把 PAT 塞进去会让这些声明变成假话，因此本 PR 正式引入第二类凭据，并让身份标注如实地从凭据推导。

### 主要改动

#### 凭据模型（`auth.js`）

- `readCredentials` 按 `auth_mode` 分支：缺省 → 企业校验（行为不变）；`"personal"` → 独立白名单（仅 `auth_mode` / `access_token` / `token_type` / `obtained_at`）；其他取值 → `CREDENTIAL_FORMAT_INVALID`
- 个人凭据文件出现 `grant_type`、`refresh_token` 或未知键一律拒绝，避免与授权码流程的用户令牌混淆
- 新增 `credentialIdentity()`：从凭据推导 `{ auth_mode, actor, current_user: null }`，不产生网络请求
- 新增 `publicUser()`：只放行 `id` / `name` / `display_name`，邮箱、手机号不进入模型
- 新增 `import` 命令：`node auth.js import <token-file|-> <credential-file> [--check]`
  - 令牌只从 **0600 文件或 stdin** 读取，不接受命令行参数（避免 shell 历史与 `ps` 泄漏）
  - 拒绝覆盖已有文件（`OUTPUT_EXISTS`），原子写入 0600
  - `--check` 先用 `GET /v2/myself` 预检，失败不落盘
- `renew` 遇到个人凭据返回 `PERSONAL_RENEW_UNSUPPORTED`（PAT 无刷新语义）
- `verify` 分模式：企业分支逐字保持；个人分支额外查询 `/v2/myself`，scope 不足时标记 `identity_unverified` 而非报错

#### 客户端（`client.js`）

- 路由支持按模式放行：`/v2/myself` 仅个人凭据可达，企业模式仍在发请求前返回 `ROUTE_NOT_ALLOWED`
- `request()` 调整为先读凭据再校验路由（本地读取无网络副作用，非法输入依旧不触网）
- 新增无网络的 `identity()` 方法

#### 服务端（`server.js` / `workitems.js`）

- 在唯一的工具注册循环中统一注入身份，删除 `contextTool` 与 `writeResult` 里的硬编码字段
- 新增第 11 个只读工具 **`pingcode_get_current_user`**：仅个人凭据可用，企业凭据返回 `IDENTITY_REQUIRES_PERSONAL_TOKEN` 且不触网；这是唯一会在结果中显示当前用户的工具，其余工具 `current_user` 恒为 `null`
- 输出裁剪优先级加入身份键，保证 `output_truncated` 时仍能看出当前身份
- 服务器 instructions 与工具描述改为中性措辞，说明个人模式下写入以令牌归属用户名义记录

#### 文档与工程配置

- `README.md`：鉴权章节改为"企业令牌 / 个人令牌"二选一，补充 PAT 创建路径、`import` 用法、最小 scope、无自动续期与 401 表现；工具表 10 → 11
- `.gitignore`：忽略 `.dsh/`（本地会话缓存）
- 引入 [OpenSpec](https://openspec.dev/) 变更工作流：本次的提案、规范增量、设计与任务随 PR 一起提交，归档后进入 `openspec/specs/`（新增 `authentication`、`identity` 两个主 spec）

### 行为变化与兼容性

| 项 | 变化 |
| --- | --- |
| 企业凭据文件 | **无变化**，不含 `auth_mode` 的既有文件继续按企业模式工作，无需迁移 |
| **工具数量** | **10 → 11**（**BREAKING**：断言固定工具数的外部消费者需更新） |
| `/v2/myself` | 企业对公仍被拒绝；个人模式新开放 |
| `auth_mode` / `actor` | 新增 `personal` / `user` 取值；`enterprise` / `application` 语义不变 |
| 业务工具 `current_user` | 恒为 `null`（个人模式下也不暴露），只有身份工具例外 |
| 个人模式写入 | 默认可读可写，以令牌归属用户名义留痕 |

### 安全设计

- 令牌与 Client Secret 从不进入 MCP 配置，只传凭据文件路径
- 凭据文件强制 0600、父目录 0700、当前用户所有、禁止软链，任一不满足在触网前失败
- `import` 输出的任何字段都不含令牌；工具输出经 `redactOutput()` 兜底
- 不用 PAT 冒充应用身份：结果里的 `actor` 如实反映实际执行身份
- 企业令牌仍拥有系统管理员权限，收窄手段是应用侧"数据范围"，README 已说明

### 测试

```
npm test  →  79 passed / 0 failed（原 65 个均为语义回归，新增 14 个）
```

新增覆盖：个人/企业两种凭据分支及非法模式拒绝；`import` 的 stdin、宽权限令牌文件、参数直传拒绝、重复导入、`--check` 失败不落盘、输出不含令牌；`renew` 对个人凭据零网络请求；`verify` 两种分支与单项 403 隔离；`/v2/myself` 仅个人可达；身份注入与业务结果 `current_user` 恒 `null`；身份工具的企业拒绝与 403 透传；输出裁剪后身份键仍存在。

### 真机验证

用真实个人令牌（含 `pcp:read:account:personal`、项目、Wiki 权限）验证：

- `auth.js verify` → `all_read_checks_passed: true`，`current_user` 正确
- DSH 端到端：11 个 `mcp__pingcode__*` 工具全部可用，`get_context` / `list_work_items` / `list_pages` / `create_work_item(dry_run)` 均返回真实数据
- 工具输出与令牌原文做字面匹配：**0 次命中**
- 企业形态凭据跑同一套调用：`actor: "application"`，`dry_run` 未落库，身份工具返回 `IDENTITY_REQUIRES_PERSONAL_TOKEN`

### 已知限制

- 未验证完整的 `client_credentials` 真机交换（本机无企业应用凭据），该路径仍由注入 fetch 的单测覆盖
- 没有 scope introspection 接口，权限不足只能靠 403 发现；`verify` 会逐项报告
- PAT 无自动续期，过期后调用返回 `PINGCODE_HTTP_401`，需重新导入
- 单测使用隔离的模拟数据，不请求真实 PingCode

### 审查建议关注

- [ ] 个人凭据的键白名单是否足够严格
- [ ] 身份注入放在注册循环，是否覆盖了全部 11 个工具
- [ ] `/v2/myself` 的模式门是否只影响个人凭据
- [ ] `import` 的令牌来源限制（文件 / stdin，无 argv）是否达成预期
- [ ] README 中对 scope 名称的表述是否与实际开放平台一致

---

> OpenSpec 的完整工作流文档见 <https://openspec.dev/>。
