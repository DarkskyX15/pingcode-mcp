# 鉴权

> 区域 `auth`（鉴权） ｜ 2 个内容分组 ｜ 4 个端点

[← 返回 API 总览](../README.md)

## 客户端凭据

> 分组路径：鉴权 / 客户端凭据

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `GET` | `/v2/auth/token` | [获取企业令牌](#get-v2-auth-token) |  |

<a id="get-v2-auth-token"></a>

### 获取企业令牌

`GET /v2/auth/token`

客户端凭据模式（`OAuth2 Client Credentials`）是最简单、直接的授权方式。通过该方式获取的访问令牌（`access_token`）不区分用户身份，在 PingCode 中被称为企业令牌。企业令牌拥有系统管理员权限，主要用于访问、操作全局数据，请谨慎保管。  
 获取企业令牌需提供 `client_id` 和 `client_secret`。您可前往 PingCode 企业后台的凭据管理页面创建应用、配置数据范围，即可获取这两个参数。调用接口时，只需在 HTTP 请求的请求头中添加 `Authorization: Bearer {access_token}`，就能访问受保护数据。  
 注：`access_token` 有效期为 30 天；删除应用或重置应用密钥（`Secret`），都会导致当前令牌立即失效。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `grant_type` | string | 是 | 授权类型，这里固定为：`client_credentials`；枚举："client_credentials" |
| `client_id` | string | 是 | PingCode 应用的 Client ID |
| `client_secret` | string | 是 | PingCode 应用的 Secret |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `access_token` | string | 是 | 令牌 |
| `token_type` | string | 是 | 令牌类型 |
| `expires_in` | string | 是 | 过期时间 |

**响应示例**

```json
{
  "access_token": "e7321ca8-f724-4abd-9169-d76d095c6acf",
  "token_type": "Bearer",
  "expires_in": 1577808000
}
```

## 授权码

> 分组路径：鉴权 / 授权码

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `GET` | `/authorize` | [请求授权](#get-authorize) |  |
| `GET` | `/v2/auth/token` | [获取用户令牌](#get-v2-auth-token-3) |  |
| `GET` | `/v2/auth/token` | [刷新用户令牌](#get-v2-auth-token-2) |  |

<a id="get-authorize"></a>

### 请求授权

`GET https://{oauth2_root}/authorize`

服务地址：`https://{oauth2_root}`（源 URL：`https://{oauth2_root}/authorize?response_type=code`）

授权码模式（`OAuth2 Authorization Code`）是最常用的授权方式，适用于企业员工管理个人数据。通过该方式获取的访问令牌（`access_token`）在 PingCode 中被称为用户令牌，该令牌归属指定用户，仅可访问对应用户权限范围内的数据。  
 开发者可通过引导用户手动授权的方式获取用户令牌，使用该模式需提前准备 `client_id` 和 `redirect_uri` 两个核心参数。开发者可登录 PingCode 企业后台，在凭据管理模块创建应用、配置对应数据权限范围，同时获取应用唯一标识 `client_id` 以及授权回调地址 `redirect_uri`。完成配置后，需在第三方应用的页面引导用户通过浏览器访问 PingCode 授权页面，由用户自主完成授权确认操作；授权成功后，页面将自动跳转至预设的 `redirect_uri` 回调地址，同时在 URL 参数中返回临时授权码 `code`。开发者可凭借已获取的 `client_id` 和临时 `code` 兑换正式的用户令牌，后续调用接口、访问受保护资源时，只需在 HTTP 请求头部配置 `Authorization: Bearer {access_token}` 格式参数，即可完成权限校验与数据访问。  
 用户访问授权页面前需已登录 PingCode。  
 授权页面地址：`https://{oauth2_root}/authorize`。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `response_type` | string | 是 | 响应类型，这里固定为 code 类型；枚举："code" |
| `client_id` | string | 是 | PingCode 应用的 Client ID |

**响应**

源文档未提供响应结构。

<a id="get-v2-auth-token-3"></a>

### 获取用户令牌

`GET /v2/auth/token`

用于获取用户令牌。  
 注：`access_token` 有效期为 30 天；删除应用或重置应用密钥（`Secret`），都会导致当前令牌立即失效。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `grant_type` | string | 是 | 授权类型，这里固定为：`authorization_code`；枚举："authorization_code" |
| `client_id` | string | 是 | PingCode 应用的 Client ID |
| `client_secret` | string | 是 | PingCode 应用的 Secret |
| `code` | string | 是 | 用户授权后，在回调地址中拿到的 `code` 值 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `access_token` | string | 是 | 令牌 |
| `refresh_token` | string | 是 | 刷新令牌 |
| `token_type` | string | 是 | 令牌类型 |
| `expires_in` | string | 是 | 过期时间 |

**响应示例**

```json
{
  "access_token": "e7321ca8-f724-4abd-9169-d76d095c6acf",
  "refresh_token": "f724-4abd-9169-e7321ca8-d76d095c6acf",
  "token_type": "Bearer",
  "expires_in": 1577808000
}
```

<a id="get-v2-auth-token-2"></a>

### 刷新用户令牌

`GET /v2/auth/token`

开发者可通过 `refresh_token` 刷新获取全新的 `access_token`，从而避免用户频繁重复授权的问题。PingCode 中 `refresh_token` 的默认有效期为 90 天；删除应用或重置应用密钥（`Secret`），都会导致当前令牌立即失效。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `grant_type` | string | 是 | 授权类型，这里固定为：`refresh_token`；枚举："refresh_token" |
| `refresh_token` | string | 是 | 通过 `authorization_code` 获取 `access_token` 时，一起返回的 `refresh_token` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `access_token` | string | 是 | 令牌 |
| `refresh_token` | string | 是 | 刷新令牌 |
| `token_type` | string | 是 | 令牌类型 |
| `expires_in` | string | 是 | 过期时间 |

**响应示例**

```json
{
  "access_token": "e7321ca8-f724-4abd-9169-d76d095c6acf",
  "refresh_token": "f724-4abd-9169-e7321ca8-d76d095c6acf",
  "token_type": "Bearer",
  "expires_in": 1577808000
}
```
