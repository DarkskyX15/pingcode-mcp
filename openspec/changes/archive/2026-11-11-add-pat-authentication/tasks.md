# Tasks

## 1. 凭据模型与导入命令

- [x] 1.1 在 `auth.js` 中让 `readCredentials` 按 `auth_mode` 分支：缺省走既有企业校验，`personal` 走新白名单（仅 `auth_mode`、`access_token`、`token_type`、`obtained_at`），其余取值报 `CREDENTIAL_FORMAT_INVALID`；以 `test/auth.test.js` 新增用例覆盖三种分支并通过
- [x] 1.2 导出一个无副作用的身份推导函数，返回 `{ auth_mode, actor, current_user: null }`，企业为 `application`、个人为 `user`；以单元测试断言两种凭据的返回值
- [x] 1.3 新增 `auth.js import <token-file|-> <credential-file>`：从 0600 文件或标准输入读取令牌，拒绝把令牌作为参数传入，校验字符集，目标已存在时报 `OUTPUT_EXISTS`，写入权限 0600；以测试覆盖 stdin、宽权限令牌文件、参数直传、重复导入四条路径
- [x] 1.4 为 `import` 增加 `--check`：先调用 `GET /v2/myself` 预检，失败时不落盘；以注入的 fetch 断言失败场景下目标文件不存在
- [x] 1.5 保证 `acquire`、`renew`、`import` 的输出在成功与失败路径都不含令牌、Client Secret 或上游正文；以测试断言输出字符串不含合成令牌与上游 body
- [x] 1.6 在 `README.md` 补充个人凭据文件格式与 `import` 用法（含 stdin 示例）；以在干净目录按文档命令执行一次 `import` 成功作为验证

## 2. 客户端路由与模式判定

- [x] 2.1 让 `client.js` 的路由校验接受鉴权模式，个人模式放行 `/v2/myself`，企业模式仍返回 `ROUTE_NOT_ALLOWED`；以测试断言企业模式零网络请求、个人模式携带 Bearer 头命中固定主机
- [x] 2.2 把 `request()` 调整为先读取凭据再校验路由，保持非法路由与非法参数零网络请求；以既有安全断言测试继续通过作为验证
- [x] 2.3 为客户端新增无网络的 `identity()` 方法，内部只读凭据并复用 1.2 的推导；以测试断言调用期间 fetch 未被触发

## 3. 身份注入与业务工具

- [x] 3.1 在 `server.js` 的工具注册循环中统一注入身份，删除 `contextTool` 里的硬编码身份字段；以 `test/server.test.js` 断言个人模式 `actor: "user"`、企业模式 `actor: "application"` 且两者 `current_user` 均为 `null`
- [x] 3.2 移除 `workitems.js` 中 `writeResult` 的硬编码身份字段，改由注册循环注入；以写工具测试断言结果仍含正确的 `auth_mode` 与 `actor`
- [x] 3.3 把身份键加入 `server.js` 中输出裁剪的保底优先级列表，确保注入发生在裁剪之前；以超大返回用例断言 `output_truncated` 为真时 `auth_mode` 仍存在
- [x] 3.4 更新 `server.js` 的服务器 instructions 与各工具描述中"企业应用身份"的措辞，说明个人模式下写入以令牌归属用户名义记录；以 `listTools` 测试断言描述文本不再声称恒为企业身份

## 4. 身份查询工具

- [x] 4.1 注册第十一个只读工具，无必需参数，个人模式调用 `/v2/myself` 并返回用户标识、名称与显示名；以测试断言个人模式返回身份且 `auth_mode: "personal"`
- [x] 4.2 让该工具在企业模式下于发请求前失败并返回 `IDENTITY_REQUIRES_PERSONAL_TOKEN`，个人模式 scope 不足时透传上游状态码；以测试断言企业模式零网络请求、403 不被伪造成身份
- [x] 4.3 把既有工具数断言由 10 更新为 11，并保留"参数 schema 不接受额外属性"的检查；以 `test/server.test.js` 中两种凭据模式下的 `listTools` 断言各为 11 个工具
- [x] 4.4 在 `README.md` 工具表补入该工具并说明其唯一能看到当前用户；以文档表格行数与 `listTools` 实际输出一致作为验证

## 5. 验证命令与文档

- [x] 5.1 让 `verifyAccess` 分模式：企业分支逐字保持（三项只读检查、`current_user: null`），个人分支额外查询 `/v2/myself` 并在 scope 不足时标记 `identity_unverified` 而非报错；以测试覆盖两条分支与单项 403 不影响其他项
- [x] 5.2 让 `renew` 在个人凭据上返回 `PERSONAL_RENEW_UNSUPPORTED` 且不触网；以测试断言零网络请求与文件内容不变
- [x] 5.3 改写 `README.md` 鉴权章节为"企业令牌 / 个人令牌"二选一，写入 PAT 创建路径、最小 scope 清单、无自动续期与 401 表现；以读者按文档完成一次真实验证作为验收

## 6. 集成验证

- [x] 6.1 运行 `npm test`，确认原有 65 个用例（工具数断言除外）语义不变且新增用例全部通过
- [x] 6.2 用真实个人令牌执行 `verify`、上下文查询、工作项列表与身份查询四个调用，确认返回值正确且输出中不出现令牌原文
- [x] 6.3 用企业凭据跑一遍只读与 `dry_run` 写入路径，确认 `actor: "application"` 与既有行为一致
- [x] 6.4 运行 `openspec validate add-pat-authentication --strict` 确认规划产物自洽

## Workflow follow-up

- 实现完成后运行 `openspec archive add-pat-authentication`，把 delta 合入主 spec
- 推送 `feat/pat-auth` 分支并按需开 PR
- 处理仓库根目录未跟踪的 `PINGCODE-TOKEN.txt`（移出仓库或加入 `.gitignore`）
