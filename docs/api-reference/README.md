# PingCode REST API V2 端点参考

本目录由 [open.pingcode.com](https://open.pingcode.com/) 的 `api_data.js` 生成：每个端点一份 JSON Schema 文档，另附 OpenAPI 3.1 与按区域拆分的 Markdown 参考。

## 统计

| 项目 | 数量 |
| --- | --- |
| 端点 | 499 |
| 公开（出现在官方导航） | 477 |
| 未公开（数据中存在、导航中隐藏） | 22 |
| 分组 | 80 |
| 区域 | 12 |
| 源记录（含文档/导航页） | 629 |
| OpenAPI 操作 | 496 |

同路径同方法的多变体接口（OAuth 授权、附件上传）在 OpenAPI 中合并为一个操作，变体列表见 `x-pingcode.variants`；单端点 JSON 仍保持一一对应。

## 鉴权

- 请求头：`Authorization: Bearer {access_token}`。
- 企业令牌（Client Credentials）拥有管理员身份；用户令牌（授权码 / 个人访问令牌）以用户身份执行。
- 每个端点标注所需令牌类型与 scope（`pcp:<read|write>:<domain>:<resource>`）。实际调用还受应用数据范围与用户权限限制。
- 详细流程见 [鉴权指南](guides/auth.md)，通用约定见 [概述指南](guides/overview.md)。

## 目录

| 区域 | 目录 | 端点数 | 未公开 | 说明 |
| --- | --- | --- | --- | --- |
| 鉴权 | [`auth`](groups/auth.md) | 4 | 0 | 4 个分组 |
| 全局 | [`global`](groups/global.md) | 83 | 4 | 23 个分组 |
| 产品管理 | [`ship`](groups/ship.md) | 114 | 0 | 8 个分组 |
| 项目管理 | [`pjm`](groups/pjm.md) | 130 | 0 | 9 个分组 |
| 测试管理 | [`testhub`](groups/testhub.md) | 77 | 0 | 7 个分组 |
| 知识管理 | [`wiki`](groups/wiki.md) | 19 | 0 | 3 个分组 |
| DevOps_数据集成 | [`devops`](groups/devops.md) | 54 | 0 | 15 个分组 |
| 存储 | [`storage`](groups/storage.md) | 12 | 12 | 4 个分组 |
| 实时消息 | [`realtime`](groups/realtime.md) | 2 | 2 | 2 个分组 |
| 事件 | [`events`](groups/events.md) | 3 | 3 | 2 个分组 |
| 异步消息队列 | [`queue`](groups/queue.md) | 1 | 1 | 2 个分组 |

## 未公开端点

以下端点存在于 `api_data.js`，但未出现在官方导航（`api_project.order`）中，调用前请自行确认可用性。

| 方法 | 路径 | 名称 | 分组 |
| --- | --- | --- | --- |
| `POST` | `/v2/nexus/ces/insert` | [创建自定义实体](groups/storage.md#post-v2-nexus-ces-insert) | CES |
| `POST` | `/v2/nexus/ces/delete` | [删除自定义实体](groups/storage.md#post-v2-nexus-ces-delete) | CES |
| `POST` | `/v2/nexus/ces/update` | [更新自定义实体](groups/storage.md#post-v2-nexus-ces-update) | CES |
| `POST` | `/v2/nexus/ces/find` | [查询自定义实体](groups/storage.md#post-v2-nexus-ces-find) | CES |
| `POST` | `/v2/nexus/ces/count` | [获取自定义实体数量](groups/storage.md#post-v2-nexus-ces-count) | CES |
| `POST` | `/v2/nexus/kvs/set` | [写入存储数据](groups/storage.md#post-v2-nexus-kvs-set) | KVS |
| `POST` | `/v2/nexus/kvs/delete` | [删除存储数据](groups/storage.md#post-v2-nexus-kvs-delete) | KVS |
| `POST` | `/v2/nexus/kvs/get` | [读取存储数据](groups/storage.md#post-v2-nexus-kvs-get) | KVS |
| `POST` | `/v2/nexus/nos/create_upload_url` | [创建一个上传地址](groups/storage.md#post-v2-nexus-nos-create-upload-url) | NOS |
| `POST` | `/v2/nexus/nos/create_download_url` | [创建一个下载地址](groups/storage.md#post-v2-nexus-nos-create-download-url) | NOS |
| `POST` | `/v2/nexus/nos/delete` | [删除一个对象](groups/storage.md#post-v2-nexus-nos-delete) | NOS |
| `POST` | `/v2/nexus/nos/get_metadata` | [获取一个对象元数据](groups/storage.md#post-v2-nexus-nos-get-metadata) | NOS |
| `POST` | `/v2/nexus/queue/push` | [推送消息到异步队列](groups/queue.md#post-v2-nexus-queue-push) | Queue |
| `POST` | `/v2/nexus/realtime/publish` | [发布实时消息](groups/realtime.md#post-v2-nexus-realtime-publish) | Realtime |
| `POST` | `/v2/nexus/realtime/sign_token` | [签发实时消息令牌](groups/realtime.md#post-v2-nexus-realtime-sign-token) | Realtime |
| `POST` | `/v2/nexus/webhook/delete_url` | [删除一个_Webhook_URL](groups/events.md#post-v2-nexus-webhook-delete-url) | Webhook |
| `POST` | `/v2/nexus/webhook/query_urls` | [获取_Webhook_URL_列表](groups/events.md#post-v2-nexus-webhook-query-urls) | Webhook |
| `POST` | `/v2/nexus/webhook/get_url` | [获取一个_Webhook_URL](groups/events.md#post-v2-nexus-webhook-get-url) | Webhook |
| `POST` | `/v2/permission/check/pilot` | [检查我的_Pilot_权限](groups/global.md#post-v2-permission-check-pilot) | 权限 |
| `POST` | `/v2/permission/check/principal` | [检查我的_Principal_权限](groups/global.md#post-v2-permission-check-principal) | 权限 |
| `GET` | `/v2/permission/my/pilot` | [获取我的_Pilot_权限](groups/global.md#get-v2-permission-my-pilot) | 权限 |
| `GET` | `/v2/permission/my/principal` | [获取我的_Principal_权限](groups/global.md#get-v2-permission-my-principal) | 权限 |

## 文件结构

```text
README.md                 本文件
catalog.json              端点索引（id / 方法 / 路径 / 分组 / 鉴权 / scope / 文件位置）
openapi.json              OpenAPI 3.1（可直接导入 Postman、Insomnia、Redoc 等）
endpoints/<area>/<id>.json  单端点 JSON Schema 文档（请求 / 响应 / 示例）
groups/<area>.md          按区域拆分的可读参考
guides/*.md               概述与鉴权指南
_source/                  源数据快照与清单（api_data / api_project）
```

单端点 JSON 的根是 `pingcode-endpoint/1` 容器，`request.*.schema` 与 `response.schema` 为 JSON Schema 2020-12；`meta` 携带方法、路径、令牌、scope、分组路径、源文件等。

## 生成与校验

```bash
npm run docs:api         # 拉取 api_data.js 并重建
npm run docs:api:build   # 仅用 _source 快照离线重建
npm run docs:api:check   # 校验计数、路径参数、OpenAPI、示例
```

## 来源

- 源：https://open.pingcode.com/api_data.js / https://open.pingcode.com/api_project.js
- apiDoc 生成时间：2026-11-10T06:43:32.707Z（apiDoc 0.20.1）
- api_data.js SHA-256：`7fea98c7c411a12b95f32b010549b83e4adf1ea7fd0facca1e723f36adb2b6f7`
- api_project.js SHA-256：`1ba201e048cc4cff180869500f358ab11d00d4370bcfe5dc07b9cf20f8768483`
