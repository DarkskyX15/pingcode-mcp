# 概述与通用约定

> 来源：PingCode REST API V2 概述分组

[← 返回 API 总览](../README.md)

## 欢迎使用

欢迎使用 PingCode Representational State Transfer APIs （简称 PingCode REST API）。 PingCode REST API 基于 HTTP 协议实现与 PingCode 服务端的远程数据交互，支持对平台各类资源进行创建、修改、查询、删除等常规业务操作。

## 数据结构

PingCode REST API 使用 `json` 作为通讯格式，所有时间均使用 10 位数字组成的时间戳。 PingCode REST API 为每一种资源定义两种数据结构，全量结构和引用结构。 全量结构包含资源的所有属性，引用结构只包含必要属性。当获取单个资源或分页获取资源列表时，PingCode REST API 将返回全量结构； 当获取其他资源引用当前资源时，PingCode REST API 将返回引用结构。

### 全量结构

```
{
     "id": "5e05d8448f8461dada9ba29c",
     "url": "https://{rest_api_root}/v2/{resource}",
     "name": "资源名称",
     "desc": "资源简介",
     "created_at": 1578897962
}
```

### 引用结构

```
{
     "id": "5e05d8448f8461dada9ba29c",
     "url": "https://{rest_api_root}/v2/{resource}",
     "name": "资源名称"
}
```

## 使用方式

PingCode REST API 支持 `OPTIONS`/`GET`/`PUT`/`PATCH`/`POST`/`DELETE` 等标准的 HTTP 请求。 对于 `GET`/`DELETE` 请求，通过 `querystring` 传递参数；对于 `POST`/`PUT`/`PATCH` 请求，需要在 `headers` 中添加 `"content-type": "application/json"`，然后通过 `body` 传递参数。 PingCode REST API 使用[HTTP 状态码](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml)指示已执行操作的状态； 使用 `response body` 传递数据。

### 单个资源

当创建、更新、获取、删除单个资源成功时，会返回当前操作的资源。

```
HTTP 状态码：200
Body：
{
     "id": "5e05d8448f8461dada9ba29c",
     "url": "https://{rest_api_root}/v2/{resource}",
     "name": "资源名称",
     "desc": "资源简介",
     "created_at": 1578897962
}
```

### 分页数据

当请求多条数据时，默认每一页返回 30 条，最大返回 100 条。 通过在 `querystring` 中设置 `page_size` 和 `page_index`，指定每一页的数据量和第几页的数据（`page_index` 为 0 时，表示第一页）。 在返回的数据结构中，`page_size` 表示当前每页的数据量，`page_index` 表示当前在第几页，`total` 表示资源总数量，`values` 表示资源的数组。

```
HTTP 状态码：200
Body：
{
     "page_size": 30,
     "page_index": 0,
     "total": 100,
     "values": [
         {
             "id": "5e05d8448f8461dada9ba29c",
             "url": "https://{rest_api_root}/v2/{resource}",
             "name": "资源名称",
             "desc": "资源简介",
             "created_at": 1578897962
         },
         ...
     ]
}
```

### 错误

当请求失败时，会返回错误码和错误信息。

```
HTTP 状态码：500
Body：
{
     "code": "100000",
     "message": "Internal Server Error"
}
```

## 频率限制

为保证服务的稳定性，PingCode REST API 会对请求实施频率限制。公有云与私有部署环境采用不同策略。

### 公有云

公有云同时启用两层限流，任一达到上限即触发限流：

- 企业限流：按企业统计每分钟请求总数（RPM）
- 单接口突发限流：按企业 + HTTP Method + Route 统计每秒请求总数（RPS）

#### 企业限流

按企业独立计数，每分钟重置一次。各版本配额如下：

| 企业版本 | 每分钟请求上限（RPM） | 说明 |
| --- | --- | --- |
| 免费版 | 200 | 固定配额，全企业共享 |
| 付费版 | 500 + 用户数 × 20 | 固定 500，每增加 1 名成员额外增加 20 |

  
#### 单接口突发限流

按企业 + HTTP Method + Route 独立计数，每秒重置一次。默认配额如下：

| HTTP 方法 | 请求上限（RPS） |
| --- | --- |
| GET / POST / PATCH / PUT / DELETE | 30 |

  
#### 响应头

无论是否触发限流，公有云响应均会携带以下限流状态头：

| Header | 说明 |
| --- | --- |
| X-RateLimit-Team-Limit | 企业每分钟请求配额上限 |
| X-RateLimit-Team-Remaining | 当前周期内企业剩余可用请求数 |
| X-RateLimit-Team-Reset | 企业配额重置的 Unix 时间戳（秒，UTC） |
| X-RateLimit-Burst-Limit | 当前路由每秒请求配额上限 |
| X-RateLimit-Burst-Remaining | 当前周期内路由剩余可用请求数 |
| X-RateLimit-Burst-Reset | 路由配额重置的 Unix 时间戳（秒，UTC） |

当返回 429 时，额外返回：

| Header | 说明 |
| --- | --- |
| X-RateLimit-Retry-After | 建议重试等待秒数 |
| X-RateLimit-Reason | 触发限流的原因。企业限流为 `pingcode-team`，单接口突发限流为 `pingcode-burst` |

```
HTTP 状态码：429
Headers：
{
     "X-RateLimit-Team-Limit": 200,
     "X-RateLimit-Team-Remaining": 0,
     "X-RateLimit-Team-Reset": 1785023460,
     "X-RateLimit-Burst-Limit": 30,
     "X-RateLimit-Burst-Remaining": 20,
     "X-RateLimit-Burst-Reset": 1785023412,
     "X-RateLimit-Retry-After": 50,
     "X-RateLimit-Reason": "pingcode-team"
}
Body：
{
     "code": "100038",
     "message": "请求频率过高"
}
```

### 私有部署

默认每人每分钟请求上限为 200，限流额度支持管理员配置。触发限流时，响应头仅返回 `X-PC-Retry-After`（建议重试等待秒数）。

```
HTTP 状态码：429
Headers：
{
     "X-PC-Retry-After": 50
}
Body：
{
     "code": "100038",
     "message": "请求频率过高"
}
```

### 合理请求

由于存在频率限制，最小化请求十分必要，建议：

1. 合理规划请求频率：公有云按企业版本配额评估并发，私有部署结合实例配置评估并发。
2. 处理限流响应：收到 429 时，读取对应重试头设置延迟后再重试，避免立即重试导致持续限流。
3. 监控剩余配额：通过 X-RateLimit-Team-Remaining、X-RateLimit-Burst-Remaining 提前预判额度并主动降速。
4. 优先使用批量接口，减少请求次数。
5. 缓存不会轻易变更的数据。

另外，使用 PingCode Flow 中的发送 Webhook 和发送 HTTP 请求，将变更数据推送给订阅者，也可以有效降低 REST API 请求量，从而降低触发频率限制的风险。

## URI_结构

PingCode REST API 遵循 REST 规范，采用层级化、标准化的 URI 路径定位业务资源。路径中通过 {参数名} 标记动态路径参数，接口调用时需替换为实际业务数值。 所有接口统一遵循以下通用路径格式：

```
https://{rest_api_root}/v2[/{area}]/{resource}[/{action}]
```

路径参数说明：

```
- rest_api_root：API 根路径
  - 公有云环境：open.pingcode.com
  - 私有部署环境：{自定义域名}/open
  - 其他环境：{在上下文中提供的地址}
- area：资源所属子区域（可空）
- resource：资源路径
- action：特殊操作（可空）
```

接口路径示例：

```
https://open.pingcode.com/v2/directory/users
https://open.pingcode.com/v2/ship/products
https://open.pingcode.com/v2/ship/products/6422711c3f12e6c1e46d40e9/idea_plans
https://open.pingcode.com/v2/devops/environments
https://open.pingcode.com/v2/testhub/testruns/bulk/create
```

另外，在下文中提到的其他路径参数：

```
- oauth2_root：OAuth2 授权页面根路径
  - 公有云环境：open.pingcode.com/oauth2
  - 私有部署环境：{自定义域名}/oauth2
  - 其他环境：{在上下文中提供的地址}
```
