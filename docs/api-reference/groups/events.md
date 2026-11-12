# 事件

> 区域 `events`（事件） ｜ 1 个内容分组 ｜ 3 个端点（未公开 3）

[← 返回 API 总览](../README.md)

## Webhook

> 分组路径：事件 / Webhook

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/nexus/webhook/query_urls` | [获取_Webhook_URL_列表](#post-v2-nexus-webhook-query-urls) | 企业令牌 |
| `POST` | `/v2/nexus/webhook/get_url` | [获取一个_Webhook_URL](#post-v2-nexus-webhook-get-url) | 企业令牌 |
| `POST` | `/v2/nexus/webhook/delete_url` | [删除一个_Webhook_URL](#post-v2-nexus-webhook-delete-url) | 企业令牌 |

<a id="post-v2-nexus-webhook-query-urls"></a>

### 获取_Webhook_URL_列表

`POST /v2/nexus/webhook/query_urls` ｜ 令牌：企业令牌 ｜ Scope：`pcp:event:app` ｜ **未公开端点**

获取当前安装下已分配的 Webhook URL 列表，可通过 `web_trigger_key` 过滤。参考 [webhook.queryUrls](https://open.pingcode.com/reference/functions/events/webhook-url#queryurls)。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `web_trigger_key` | string |  | 通过 web trigger key 过滤；不传则返回当前安装下所有 Webhook URL |

**请求示例**

```json
{
  "web_trigger_key": "incoming-build"
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```json
[
  {
    "web_trigger_key": "incoming-build",
    "url": "https://{nexus_webhook_root}/wh/{uuid}"
  }
]
```

<a id="post-v2-nexus-webhook-get-url"></a>

### 获取一个_Webhook_URL

`POST /v2/nexus/webhook/get_url` ｜ 令牌：企业令牌 ｜ Scope：`pcp:event:app` ｜ **未公开端点**

为指定 `web_trigger_key` 获取一个对外可访问的 Webhook URL；若不存在则创建。参考 [webhook.getUrl](https://open.pingcode.com/reference/functions/events/webhook-url#geturl)。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `web_trigger_key` | string | 是 | manifest 文件中配置的 web trigger key |
| `options` | object |  | 可选配置项 |
| `options.force_create` | boolean |  | 是否强制重新生成新 URL。为 `true` 始终创建新的 Webhook URL; `false` 返回已经存在的 Webhook URL 或者创建新的 Webhook URL。默认值为 `false` |

**请求示例**

```json
{
  "web_trigger_key": "incoming-build",
  "options": {
    "force_create": false
  }
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `url` | string |  |  |

**响应示例**

```json
{
  "url": "https://{nexus_webhook_root}/wh/{uuid}"
}
```

<a id="post-v2-nexus-webhook-delete-url"></a>

### 删除一个_Webhook_URL

`POST /v2/nexus/webhook/delete_url` ｜ 令牌：企业令牌 ｜ Scope：`pcp:event:app` ｜ **未公开端点**

删除指定的 Webhook URL，外部再访问该 URL 将不再触发 handler。参考 [webhook.deleteUrl](https://open.pingcode.com/reference/functions/events/webhook-url#deleteurl)。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `webhook_url` | string | 是 | 要删除的 Webhook URL |

**请求示例**

```json
{
  "webhook_url": "https://{nexus_webhook_root}/wh/{uuid}"
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```json
true
```
