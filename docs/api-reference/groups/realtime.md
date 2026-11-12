# 实时消息

> 区域 `realtime`（实时消息） ｜ 1 个内容分组 ｜ 2 个端点（未公开 2）

[← 返回 API 总览](../README.md)

## Realtime

> 分组路径：实时消息 / Realtime

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/nexus/realtime/publish` | [发布实时消息](#post-v2-nexus-realtime-publish) | 企业令牌 |
| `POST` | `/v2/nexus/realtime/sign_token` | [签发实时消息令牌](#post-v2-nexus-realtime-sign-token) | 企业令牌 |

<a id="post-v2-nexus-realtime-publish"></a>

### 发布实时消息

`POST /v2/nexus/realtime/publish` ｜ 令牌：企业令牌 ｜ Scope：`pcp:realtime:app` ｜ **未公开端点**

将数据实时推送到通道中。参考 [realtime.publish](https://open.pingcode.com/reference/functions/realtime/realtime#publish)。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `channel` | string | 是 | 通道唯一标识名称 |
| `payload` | string \| number \| boolean \| object \| array | 是 | 发布的数据内容 |
| `payload.workitemId` | string |  |  |
| `payload.field` | string |  |  |
| `extension_key` | string |  | 扩展标识，对应 manifest 中扩展模块的 `key`。当 `options.scope` 为 `self`、`context` 时必填。参考 [Extensions](https://open.pingcode.com/reference/resource/extensions) |
| `extension_data` | object |  | 扩展上下文数据，需与 `extension_key` 配套传入。当 `options.scope` 为 `self`、`context` 时必填。参考 [Extensions](https://open.pingcode.com/reference/resource/extensions) |
| `extension_data.workitem` | object |  |  |
| `extension_data.workitem.id` | string |  |  |
| `options` | object |  | 发布行为的配置项 |
| `options.scope` | string |  | 消息广播的作用范围，默认值为 `self`；枚举："self" / "global" / "token" / "context" |
| `options.token` | string |  | 鉴权 Token，仅在 `scope = token` 时传入；可通过`签发实时消息令牌`获取 |
| `options.context` | string |  | 业务实体上下文，仅在 `scope = context` 时传入；枚举："project" / "workitem" / "sprint" / "product" / "idea" / "ticket" / "space" / "page" / "library" / "testcase" / "testplan" / "baseline" / "release" / "plan" / "widget" / "dashboard" / "entry" |

**请求示例**

```json
{
  "channel": "workitem-updated",
  "payload": {
    "workitemId": "xxx",
    "field": "title"
  },
  "extension_key": "workitem-panel",
  "extension_data": {
    "workitem": {
      "id": "xxx"
    }
  },
  "options": {
    "scope": "self"
  }
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `message_id` | string |  |  |

**响应示例**

```json
{
  "message_id": "message-id-1"
}
```

<a id="post-v2-nexus-realtime-sign-token"></a>

### 签发实时消息令牌

`POST /v2/nexus/realtime/sign_token` ｜ 令牌：企业令牌 ｜ Scope：`pcp:realtime:app` ｜ **未公开端点**

为指定通道签发实时消息令牌，用于对订阅或发布权限做更精细的控制。参考 [realtime.signToken](https://open.pingcode.com/reference/functions/realtime/realtime#signtoken)。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `channel` | string | 是 | 通道唯一标识名称 |
| `claims` | object | 是 | 签发 `token` 需要加密的数据对象 |
| `claims.workitemId` | string |  |  |
| `permissions` | string[] |  | 签发 `token` 时要确定的操作权限，默认值为 `['subscribe', 'publish']`；枚举："subscribe" / "publish" |

**请求示例**

```json
{
  "channel": "workitem-updated",
  "claims": {
    "workitemId": "xxx"
  },
  "permissions": [
    "subscribe"
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `token` | string |  |  |
| `expires_at` | number |  |  |

**响应示例**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "expires_at": 1784025238000
}
```
