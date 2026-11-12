# authentication Specification

## Purpose

定义 pingcode-mcp 接受哪些凭据、如何校验与保存它们，以及企业令牌与个人访问令牌在端点访问权限、失败表现和续期能力上的差别，使个人令牌可在不削弱企业令牌既有保证的前提下被使用。

## Requirements

### Requirement: Credential files declare an authentication mode

凭据文件 SHALL 自描述鉴权模式：不含 `auth_mode` 时按企业凭据解释，`auth_mode: "personal"` 时按个人访问令牌解释，其他取值 MUST 被拒绝为 `CREDENTIAL_FORMAT_INVALID`。不含 `auth_mode` 的既有文件 MUST 继续按企业凭据工作，无需迁移。

#### Scenario: Enterprise file without auth_mode

- **WHEN** 凭据文件含 `grant_type: "client_credentials"`、`token_type: "Bearer"` 与非空 `access_token`，且不含 `auth_mode`
- **THEN** 文件被接受，鉴权模式报告为 `enterprise`

#### Scenario: Personal file

- **WHEN** 凭据文件含 `auth_mode: "personal"`、`token_type: "Bearer"` 与非空 `access_token`
- **THEN** 文件被接受，鉴权模式报告为 `personal`

#### Scenario: Unknown mode value

- **WHEN** 凭据文件含 `auth_mode: "oauth"`，或同时含 `auth_mode: "personal"` 与 `grant_type: "authorization_code"`
- **THEN** 读取失败并返回 `CREDENTIAL_FORMAT_INVALID`

### Requirement: Personal credential files exclude enterprise-only fields

个人凭据文件 MUST NOT 携带 `grant_type` 或 `refresh_token`，因为这两者属于授权码流程与客户端凭据流程，出现即视为格式错误。个人凭据文件 MUST NOT 携带未定义的额外键。

#### Scenario: Personal file carrying grant_type

- **WHEN** 凭据文件含 `auth_mode: "personal"` 与 `grant_type: "client_credentials"`
- **THEN** 读取失败并返回 `CREDENTIAL_FORMAT_INVALID`

#### Scenario: Personal file carrying refresh_token

- **WHEN** 凭据文件含 `auth_mode: "personal"` 与 `refresh_token`
- **THEN** 读取失败并返回 `CREDENTIAL_FORMAT_INVALID`

#### Scenario: Personal file with unknown key

- **WHEN** 凭据文件含 `auth_mode: "personal"` 与未定义键 `scope`
- **THEN** 读取失败并返回 `CREDENTIAL_FORMAT_INVALID`

### Requirement: Credential files require private ownership and permissions

凭据文件与配置文件 MUST 由当前用户拥有、权限恰为 0600，直接父目录 MUST 为 0700 且属于当前用户，且 MUST NOT 是符号链接。任一条件不满足时 MUST 在发出任何网络请求前失败。

#### Scenario: World-readable credential file

- **WHEN** 凭据文件权限为 0644
- **THEN** 读取失败并返回 `PRIVATE_FILE_REQUIRED`，且不发出网络请求

#### Scenario: Symlinked credential file

- **WHEN** 凭据路径是指向合法文件的符号链接
- **THEN** 读取失败并返回 `PRIVATE_FILE_REQUIRED`

#### Scenario: Permissive parent directory

- **WHEN** 凭据文件的直接父目录权限为 0755
- **THEN** 读取失败并返回 `PRIVATE_DIRECTORY_REQUIRED`

### Requirement: Enterprise credentials are acquired by client credentials exchange

企业凭据 SHALL 通过向固定官方端点发起 `client_credentials` 交换获得，交换 MUST NOT 发送浏览器会话、密码、个人授权码或 refresh_token。`acquire` MUST 只创建新文件，`renew` MUST 以原子替换更新已有文件。

#### Scenario: Acquire creates a new file

- **WHEN** 以私有 `application.env` 与不存在的输出路径执行 acquire
- **THEN** 只发起一次 `GET /v2/auth/token` 交换，保存的文件含 `grant_type`、`token_type`、`access_token`，且不含 Client Secret

#### Scenario: Acquire refuses an existing target

- **WHEN** 输出路径已存在
- **THEN** 返回 `OUTPUT_EXISTS`，且不发出网络请求

#### Scenario: Failed renewal preserves the previous token

- **WHEN** renew 过程中网络失败
- **THEN** 返回 `NETWORK_ERROR`，且原凭据文件内容保持不变

### Requirement: Personal access tokens are imported from a secret source

个人令牌 SHALL 通过 `auth.js import` 导入，令牌 MUST 来自权限 0600 的文件或标准输入，MUST NOT 接受命令行参数直接传递令牌。导入 MUST 校验令牌字符集与文件权限，拒绝覆盖已存在的凭据文件，成功后写入权限 0600 的个人凭据文件。

#### Scenario: Import from standard input

- **WHEN** 从标准输入提供合法令牌并指定不存在的输出路径
- **THEN** 生成含 `auth_mode: "personal"` 的凭据文件，权限为 0600

#### Scenario: Import from a group-readable token file

- **WHEN** 令牌文件权限为 0644
- **THEN** 返回 `PRIVATE_FILE_REQUIRED`，且不创建凭据文件

#### Scenario: Token supplied as an argument

- **WHEN** 命令行只给出令牌字符串而未给出令牌文件或标准输入标记
- **THEN** 返回用法错误，且不创建凭据文件

#### Scenario: Import refuses to overwrite

- **WHEN** 目标凭据文件已存在
- **THEN** 返回 `OUTPUT_EXISTS`，且原文件内容保持不变

### Requirement: Credential values never appear in command output

`acquire`、`renew`、`import`、`verify` 的输出 MUST NOT 包含 `access_token`、`refresh_token`、`client_secret` 或令牌前缀，无论成功还是失败。上游返回的错误正文 MUST NOT 被透传到输出。

#### Scenario: Successful import output

- **WHEN** 导入成功
- **THEN** 输出只含保存状态与鉴权模式，不含令牌内容

#### Scenario: Failed verification output

- **WHEN** 验证时上游返回 401 且正文含令牌
- **THEN** 输出只含 `PINGCODE_HTTP_401`，不含上游正文与令牌

### Requirement: Renewal applies only to enterprise credentials

`renew` MUST 仅对企业凭据生效。遇到个人凭据时 MUST 失败并返回 `PERSONAL_RENEW_UNSUPPORTED`，因为个人访问令牌没有刷新语义，重新导入是唯一的更新方式。

#### Scenario: Renew on a personal credential file

- **WHEN** 对含 `auth_mode: "personal"` 的凭据文件执行 renew
- **THEN** 返回 `PERSONAL_RENEW_UNSUPPORTED`，且不发出网络请求

#### Scenario: Renew on an enterprise credential file

- **WHEN** 对企业凭据文件执行 renew 且上游成功
- **THEN** 凭据文件被原子替换为新令牌

### Requirement: Access verification reports mode-specific results

`verify` SHALL 始终检查团队信息、项目列表与 Wiki 空间三项读取权限，并对个人凭据额外报告令牌归属用户。企业凭据 MUST NOT 触发仅限用户令牌的端点。单项检查失败 MUST 被单独报告，且 MUST NOT 阻止其余检查。

#### Scenario: Enterprise verification stays user-free

- **WHEN** 对企业凭据执行 verify
- **THEN** 返回 `auth_mode: "enterprise"`、`current_user: null`，且只访问三个读取端点

#### Scenario: Personal verification reports the owner

- **WHEN** 对个人凭据执行 verify 且令牌具备个人账号读取范围
- **THEN** 返回 `auth_mode: "personal"` 与归属用户的标识

#### Scenario: Missing scope is isolated

- **WHEN** 个人凭据缺少 Wiki 空间读取范围
- **THEN** 该检查报告 `PINGCODE_HTTP_403`，其余检查仍为通过，且整体结果为未全部通过

### Requirement: Only personal credentials may call user-only endpoints

客户端 MUST 仅在个人模式放行 `/v2/myself`。企业模式请求该路径 MUST 在发出网络请求前被拒绝，因为企业令牌不区分用户身份。

#### Scenario: Personal mode allows the endpoint

- **WHEN** 以个人凭据请求 `/v2/myself`
- **THEN** 请求被发往固定官方主机并携带 Bearer 头

#### Scenario: Enterprise mode rejects the endpoint

- **WHEN** 以企业凭据请求 `/v2/myself`
- **THEN** 返回 `ROUTE_NOT_ALLOWED`，且不发出网络请求

### Requirement: Personal credentials authorize writes without an extra flag

个人凭据 SHALL 默认可读可写，读取凭据时 MUST NOT 要求额外的写入开关。写入结果 MUST 如实标注为个人身份，不得标注为企业应用身份。

#### Scenario: Personal mode creates a work item

- **WHEN** 以个人凭据调用创建工具且上游成功
- **THEN** 写入执行，结果标注 `actor: "user"`

#### Scenario: Enterprise mode is unchanged

- **WHEN** 以企业凭据调用同一创建工具
- **THEN** 行为与变更前一致，结果标注 `actor: "application"`
