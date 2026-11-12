# Spec Delta

## Purpose

定义模型可见的身份语义：普通工具结果只声明当前是哪种鉴权模式，绝不推断具体用户；只有专用工具可以回答"这个令牌属于谁"，且仅对个人访问令牌开放。

## ADDED Requirements

### Requirement: Ordinary tool results report the active authentication mode

每个业务工具的结果 SHALL 声明 `auth_mode` 与 `actor`，二者取值 MUST 由实际凭据推导：企业凭据为 `enterprise` 与 `application`，个人凭据为 `personal` 与 `user`。工具 MUST NOT 硬编码与凭据不符的身份。

#### Scenario: Enterprise credential result

- **WHEN** 以企业凭据调用任一业务工具
- **THEN** 结果为 `auth_mode: "enterprise"`、`actor: "application"`

#### Scenario: Personal credential result

- **WHEN** 以个人凭据调用任一业务工具
- **THEN** 结果为 `auth_mode: "personal"`、`actor: "user"`

### Requirement: Ordinary tool results never expose the current user

除专用身份工具外，所有工具结果的 `current_user` MUST 恒为 `null`，无论凭据类型。系统 MUST NOT 从令牌推断用户并注入业务结果。

#### Scenario: Personal credential context call

- **WHEN** 以个人凭据调用上下文工具
- **THEN** 结果的 `current_user` 为 `null`，且结果中不含用户名称、邮箱或成员标识

#### Scenario: Enterprise credential context call

- **WHEN** 以企业凭据调用上下文工具
- **THEN** 结果的 `current_user` 为 `null`

### Requirement: A dedicated read-only tool reports the token owner

系统 SHALL 提供一个仅用于身份核对的只读工具，调用固定官方端点并返回归属用户的标识与显示名。该工具 MUST 被标注为只读，MUST NOT 接受任何影响查询目标的参数，且 MUST NOT 返回权限信息、部门层级或联系方式之外的可写状态。

#### Scenario: Personal token owner lookup

- **WHEN** 以个人凭据调用该身份工具
- **THEN** 返回归属用户的标识、名称与显示名，并标注 `auth_mode: "personal"`

#### Scenario: Tool rejects extra arguments

- **WHEN** 调用该身份工具并传入未定义的参数
- **THEN** 调用被 MCP 参数边界拒绝，且不发出网络请求

### Requirement: The token owner tool is unavailable to enterprise credentials

以企业凭据调用该身份工具时 MUST 失败并返回明确错误码，MUST NOT 发出网络请求，也 MUST NOT 返回空对象冒充成功。

#### Scenario: Enterprise caller is rejected

- **WHEN** 以企业凭据调用该身份工具
- **THEN** 返回 `IDENTITY_REQUIRES_PERSONAL_TOKEN`，且不发出网络请求

#### Scenario: Missing personal scope is reported

- **WHEN** 以个人凭据调用该身份工具但令牌缺少个人账号读取范围
- **THEN** 返回上游状态对应的错误码，且不返回伪造的身份

### Requirement: The fixed tool inventory is eleven tools

服务器 SHALL 注册固定数量的工具：原有十个业务工具加上一个身份工具。工具集合 MUST NOT 因凭据类型而增减，MUST NOT 暴露任何可枚举其他工具的元数据。

#### Scenario: Enterprise credential tool listing

- **WHEN** 以企业凭据启动服务器并列出工具
- **THEN** 恰好返回十一个工具，且参数 schema 均不接受额外属性

#### Scenario: Personal credential tool listing

- **WHEN** 以个人凭据启动服务器并列出工具
- **THEN** 恰好返回十一个工具，名称与顺序稳定
