# 异步消息队列

> 区域 `queue`（异步消息队列） ｜ 1 个内容分组 ｜ 1 个端点（未公开 1）

[← 返回 API 总览](../README.md)

## Queue

> 分组路径：异步消息队列 / Queue

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/nexus/queue/push` | [推送消息到异步队列](#post-v2-nexus-queue-push) | 企业令牌 |

<a id="post-v2-nexus-queue-push"></a>

### 推送消息到异步队列

`POST /v2/nexus/queue/push` ｜ 令牌：企业令牌 ｜ Scope：`pcp:async:app` ｜ **未公开端点**

将一条或多条 payload 推入异步队列，调用只保证入队，不等待消费者执行。参考 [queue.push](https://open.pingcode.com/reference/functions/async/queue#push)。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `queue_key` | string | 是 | 队列名，必须与 manifest 中某个 `async.queues` 条目的 `key` 一致 |
| `payload` | object[] | 是 | payload 数组；数组中的每一项会原样出现在消费者收到的 `task.payload`。单次推送条数为 `1` ~ `32` |
| `payload[].imageId` | string |  |  |
| `options` | object |  | 异步队列推送选项 |
| `options.delay` | number |  | 延时投递的秒数。入队后至少延迟该秒数才可被消费；不传或传 `0` 表示尽快投递；取值范围为 `0` ~ `1800`。批量推送时对本次所有任务生效 |

**请求示例**

```json
{
  "queue_key": "image-processing",
  "payload": [
    {
      "imageId": "img-1"
    }
  ],
  "options": {
    "delay": 10
  }
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `job_id` | string |  |  |

**响应示例**

```json
{
  "job_id": "job-id-1"
}
```
