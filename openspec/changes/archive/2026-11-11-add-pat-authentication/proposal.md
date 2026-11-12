# Proposal

## Why

企业令牌（OAuth2 Client Credentials）只能由能进入 PingCode 管理后台「应用 → 凭据管理」的人创建，而实际使用者往往是没有该权限的普通成员；PingCode 官方同时提供**个人访问令牌（Personal Access Token）**，在个人设置里自助创建、可随时撤销、按 scopes 收窄，正好覆盖这类场景。

当前实现把"企业应用身份"写死在三处：凭据文件只接受 `grant_type=client_credentials`，工具结果固定返回 `auth_mode: "enterprise"` / `actor: "application"`，客户端白名单明确拒绝 `/v2/myself`。直接塞入 PAT 会让这些声明变成假话，因此需要在保持企业令牌路径完全不变的前提下，正式支持第二类凭据。

## What Changes

- **凭据文件支持第二种形态**：同一文件、同一路径传入，新增 `auth_mode: "personal"`；企业格式（`grant_type: "client_credentials"`）保持不变，未写 `auth_mode` 时按企业凭据解释。
- **新增导入命令**：`node auth.js import <token-file|-> <credential-file>`，从 0600 文件或 stdin 读取令牌，校验字符集与文件权限，拒绝覆盖已有文件，任何输出都不回显令牌。
- **新增第 11 个只读工具** `pingcode_get_current_user`：调用 `GET /v2/myself`，仅个人令牌可用；这是工具结果中唯一出现用户身份的地方，用于验证令牌归属。
- **身份字段如实标注**：`auth_mode` 取值扩展为 `enterprise` / `personal`，`actor` 对应 `application` / `user`；所有普通工具的结果中 `current_user` 仍恒为 `null`，不推断当前用户。
- **PAT 默认可读可写**：不引入 `allow_writes` 之类开关，写操作以令牌归属用户名义记录。
- **`verify` 分模式**：个人模式额外调用 `/v2/myself` 并报告归属人，scope 不足时降级；`renew` 遇到个人凭据明确拒绝（PAT 无刷新语义）。
- **BREAKING**：固定工具数由 10 变为 11；`/v2/myself` 在个人模式下加入客户端允许路由，企业模式下仍返回受限错误。
- 不新增运行时依赖，不改变 DSH / Codex 的接入方式（仍然只传凭据文件路径）。

## Capabilities

### New Capabilities

- `authentication`: 凭据种类与文件格式、文件权限要求、Bearer 传输、`acquire` / `renew` / `import` / `verify` 的行为、按模式区分的失败码，以及"企业凭据永不访问仅限用户令牌的端点"这一约束。
- `identity`: 工具结果中 `auth_mode` / `actor` / `current_user` 的语义与暴露边界，以及专用身份查询工具 `pingcode_get_current_user` 的可用条件与返回字段。

### Modified Capabilities

（无：仓库此前没有 OpenSpec spec，全部按新能力建立。）

## Impact

- **代码**：`auth.js`（凭据校验、导入命令、verify 分支）、`client.js`（`/v2/myself` 按模式放行）、`server.js`（身份注入、新工具注册、工具数）、`workitems.js`（移除硬编码身份字段）、`knowledge.js`（工具描述文案）。
- **测试**：`test/auth.test.js`、`test/client.test.js`、`test/server.test.js` 需扩展；现有 65 个用例中与企业模式相关的语义保持不变。
- **文档**：`README.md` 增加 PAT 章节，工具表由 10 行变 11 行。
- **兼容性**：企业令牌用户无感知；依赖 `auth_mode === "enterprise"` 字面量的外部消费者仍成立；断言"正好 10 个工具"的测试需要更新。
- **安全边界**：PAT 以个人身份写入，不再声称应用署名；仅个人模式可访问 `/v2/myself`。
