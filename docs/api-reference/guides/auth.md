# 鉴权指南

> 企业令牌、用户令牌（授权码）与个人访问令牌

[← 返回 API 总览](../README.md)

## 获取企业令牌

客户端凭据模式（`OAuth2 Client Credentials`）是最简单、直接的授权方式。通过该方式获取的访问令牌（`access_token`）不区分用户身份，在 PingCode 中被称为企业令牌。企业令牌拥有系统管理员权限，主要用于访问、操作全局数据，请谨慎保管。  
 获取企业令牌需提供 `client_id` 和 `client_secret`。您可前往 PingCode 企业后台的凭据管理页面创建应用、配置数据范围，即可获取这两个参数。调用接口时，只需在 HTTP 请求的请求头中添加 `Authorization: Bearer {access_token}`，就能访问受保护数据。  
 注：`access_token` 有效期为 30 天；删除应用或重置应用密钥（`Secret`），都会导致当前令牌立即失效。

> 端点：`GET /v2/auth/token?grant_type=client_credentials`

## 请求授权

授权码模式（`OAuth2 Authorization Code`）是最常用的授权方式，适用于企业员工管理个人数据。通过该方式获取的访问令牌（`access_token`）在 PingCode 中被称为用户令牌，该令牌归属指定用户，仅可访问对应用户权限范围内的数据。  
 开发者可通过引导用户手动授权的方式获取用户令牌，使用该模式需提前准备 `client_id` 和 `redirect_uri` 两个核心参数。开发者可登录 PingCode 企业后台，在凭据管理模块创建应用、配置对应数据权限范围，同时获取应用唯一标识 `client_id` 以及授权回调地址 `redirect_uri`。完成配置后，需在第三方应用的页面引导用户通过浏览器访问 PingCode 授权页面，由用户自主完成授权确认操作；授权成功后，页面将自动跳转至预设的 `redirect_uri` 回调地址，同时在 URL 参数中返回临时授权码 `code`。开发者可凭借已获取的 `client_id` 和临时 `code` 兑换正式的用户令牌，后续调用接口、访问受保护资源时，只需在 HTTP 请求头部配置 `Authorization: Bearer {access_token}` 格式参数，即可完成权限校验与数据访问。  
 用户访问授权页面前需已登录 PingCode。  
 授权页面地址：`https://{oauth2_root}/authorize`。

> 端点：`GET https://{oauth2_root}/authorize?response_type=code`

## 获取用户令牌

用于获取用户令牌。  
 注：`access_token` 有效期为 30 天；删除应用或重置应用密钥（`Secret`），都会导致当前令牌立即失效。

> 端点：`GET /v2/auth/token?grant_type=authorization_code`

## 刷新用户令牌

开发者可通过 `refresh_token` 刷新获取全新的 `access_token`，从而避免用户频繁重复授权的问题。PingCode 中 `refresh_token` 的默认有效期为 90 天；删除应用或重置应用密钥（`Secret`），都会导致当前令牌立即失效。

> 端点：`GET /v2/auth/token?grant_type=refresh_token`

## 使用个人访问令牌

个人访问令牌（`Personal Access Token`）是一种以个人身份访问 PingCode REST API 的鉴权方式，适用于脚本、CI/CD、本地工具等不便走 OAuth2 授权流程的场景。  
 令牌在 PingCode 个人设置中创建、撤销或重新生成。创建时需配置令牌名称、有效期与授权范围（`scopes`），有效期以个人设置页面的可选项为准；令牌明文仅在创建时展示一次，请妥善保管，遗失后只能重置后重新生成。  
 调用接口时，在 HTTP 请求头中添加 `Authorization: Bearer {access_token}` 即可。服务端以令牌归属用户的身份执行请求，仅可访问该用户权限范围内且令牌 `scopes` 覆盖的资源。
