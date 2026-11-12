# 存储

> 区域 `storage`（存储） ｜ 3 个内容分组 ｜ 12 个端点（未公开 12）

[← 返回 API 总览](../README.md)

## CES

> 分组路径：存储 / CES

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/nexus/ces/find` | [查询自定义实体](#post-v2-nexus-ces-find) | 企业令牌 |
| `POST` | `/v2/nexus/ces/insert` | [创建自定义实体](#post-v2-nexus-ces-insert) | 企业令牌 |
| `POST` | `/v2/nexus/ces/update` | [更新自定义实体](#post-v2-nexus-ces-update) | 企业令牌 |
| `POST` | `/v2/nexus/ces/count` | [获取自定义实体数量](#post-v2-nexus-ces-count) | 企业令牌 |
| `POST` | `/v2/nexus/ces/delete` | [删除自定义实体](#post-v2-nexus-ces-delete) | 企业令牌 |

<a id="post-v2-nexus-ces-find"></a>

### 查询自定义实体

`POST /v2/nexus/ces/find` ｜ 令牌：企业令牌 ｜ Scope：`pcp:storage:app` ｜ **未公开端点**

查询自定义实体。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_name` | string | 是 | 自定义实体的名字 |
| `condition` | object | 是 | 查询条件，参考 [ConditionBuilder](https://open.pingcode.com/reference/functions/storage/ces-condition-builder) |
| `condition.name` | object |  |  |
| `condition.name.eq` | string |  |  |
| `options` | object |  | 可选配置项，参考 [CesFindOptions](https://open.pingcode.com/reference/functions/storage/ces-find-options) |
| `options.skip` | number |  |  |
| `options.limit` | number |  |  |
| `options.sort` | object[] |  |  |
| `options.sort[].property_key` | string |  |  |
| `options.sort[].order` | number |  |  |
| `options.hint` | string |  |  |
| `options.projection` | string \| string[] |  |  |
| `options.includes` | object |  |  |
| `options.includes.metadata` | boolean |  |  |

**请求示例**

```json
{
  "entity_name": "user",
  "condition": {
    "name": {
      "eq": "john"
    }
  },
  "options": {
    "skip": 0,
    "limit": 10,
    "sort": [
      {
        "property_key": "age",
        "order": 1
      }
    ],
    "hint": "age_1",
    "projection": [
      "name",
      "age"
    ],
    "includes": {
      "metadata": true
    }
  }
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```json
[
  {
    "name": "john",
    "age": 10,
    "_created_at": 1778897962,
    "_created_by": "01110010000000000000000000000000",
    "_updated_at": 1781078029853,
    "_updated_by": "01110010000000000000000000000000"
  },
  {
    "name": "tom",
    "age": 12,
    "_created_at": 1678897962,
    "_created_by": "01110010000000000000000000000000",
    "_updated_at": 1681078029853,
    "_updated_by": "01110010000000000000000000000000"
  }
]
```

<a id="post-v2-nexus-ces-insert"></a>

### 创建自定义实体

`POST /v2/nexus/ces/insert` ｜ 令牌：企业令牌 ｜ Scope：`pcp:storage:app` ｜ **未公开端点**

创建自定义实体。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_name` | string | 是 | 自定义实体的名字 |
| `value` | object[] | 是 | 自定义实体的值 |
| `value[].name` | string |  |  |
| `value[].age` | number |  |  |
| `options` | object |  | 可选配置项，参考 [CesFindOptions](https://open.pingcode.com/reference/functions/storage/ces-find-options) |
| `options.ordered` | boolean |  |  |

**请求示例**

```json
{
  "entity_name": "user",
  "value": [
    {
      "name": "john",
      "age": 10
    },
    {
      "name": "tom",
      "age": 12
    }
  ],
  "options": {
    "ordered": true
  }
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```json
[
  {
    "name": "john",
    "age": 10
  },
  {
    "name": "tom",
    "age": 12
  }
]
```

<a id="post-v2-nexus-ces-update"></a>

### 更新自定义实体

`POST /v2/nexus/ces/update` ｜ 令牌：企业令牌 ｜ Scope：`pcp:storage:app` ｜ **未公开端点**

更新自定义实体。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_name` | string | 是 | 自定义实体的名字 |
| `condition` | object | 是 | 查询条件，参考 [ConditionBuilder](https://open.pingcode.com/reference/functions/storage/ces-condition-builder) |
| `condition.name` | object |  |  |
| `condition.name.eq` | string |  |  |
| `value` | object | 是 | 更新的值 |
| `value.age` | number |  |  |

**请求示例**

```json
{
  "entity_name": "user",
  "condition": {
    "name": {
      "eq": "john"
    }
  },
  "value": {
    "age": 10
  }
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```json
null
```

<a id="post-v2-nexus-ces-count"></a>

### 获取自定义实体数量

`POST /v2/nexus/ces/count` ｜ 令牌：企业令牌 ｜ Scope：`pcp:storage:app` ｜ **未公开端点**

获取自定义实体数量。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_name` | string | 是 | 自定义实体的名字 |
| `condition` | object | 是 | 查询条件，参考 [ConditionBuilder](https://open.pingcode.com/reference/functions/storage/ces-condition-builder) |
| `condition.name` | object |  |  |
| `condition.name.eq` | string |  |  |

**请求示例**

```json
{
  "entity_name": "user",
  "condition": {
    "name": {
      "eq": "john"
    }
  }
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```json
2
```

<a id="post-v2-nexus-ces-delete"></a>

### 删除自定义实体

`POST /v2/nexus/ces/delete` ｜ 令牌：企业令牌 ｜ Scope：`pcp:storage:app` ｜ **未公开端点**

删除自定义实体。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_name` | string | 是 | 自定义实体的名字 |
| `condition` | object | 是 | 查询条件，参考 [ConditionBuilder](https://open.pingcode.com/reference/functions/storage/ces-condition-builder) |
| `condition.name` | object |  |  |
| `condition.name.eq` | string |  |  |

**请求示例**

```json
{
  "entity_name": "user",
  "condition": {
    "name": {
      "eq": "john"
    }
  }
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```json
true
```

## KVS

> 分组路径：存储 / KVS

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/nexus/kvs/get` | [读取存储数据](#post-v2-nexus-kvs-get) | 企业令牌 |
| `POST` | `/v2/nexus/kvs/delete` | [删除存储数据](#post-v2-nexus-kvs-delete) | 企业令牌 |
| `POST` | `/v2/nexus/kvs/set` | [写入存储数据](#post-v2-nexus-kvs-set) | 企业令牌 |

<a id="post-v2-nexus-kvs-get"></a>

### 读取存储数据

`POST /v2/nexus/kvs/get` ｜ 令牌：企业令牌 ｜ Scope：`pcp:storage:app` ｜ **未公开端点**

读取存储数据。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `key` | string | 是 | 数据存储的 `key` |
| `options` | object |  | 可选配置项 |
| `options.secret` | boolean |  | 获取的数据是否为加密数据，默认值为 `false` |

**请求示例**

```json
{
  "key": "kvs_secret_key",
  "options": {
    "secret": true
  }
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `key` | string |  |  |
| `value` | string |  |  |

**响应示例**

```json
{
  "key": "kvs_secret_key",
  "value": "kvs_secret_value"
}
```

<a id="post-v2-nexus-kvs-delete"></a>

### 删除存储数据

`POST /v2/nexus/kvs/delete` ｜ 令牌：企业令牌 ｜ Scope：`pcp:storage:app` ｜ **未公开端点**

删除存储数据。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `key` | string | 是 | 数据存储的 `key` |

**请求示例**

```json
{
  "key": "kvs_key"
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```json
true
```

<a id="post-v2-nexus-kvs-set"></a>

### 写入存储数据

`POST /v2/nexus/kvs/set` ｜ 令牌：企业令牌 ｜ Scope：`pcp:storage:app` ｜ **未公开端点**

写入存储数据。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `key` | string | 是 | 数据存储的 `key` |
| `value` | string \| number \| boolean \| object \| array | 是 | 数据存储的 `value` |
| `options` | object |  | 可选配置项 |
| `options.policy` | string |  | 数据存储策略。默认值为 `FAIL_IF_EXISTS`，当 `key` 已经存在时，直接报错。当值为 `OVERRIDE` 时表示会覆盖旧的 `value`；枚举："OVERRIDE" / "FAIL_IF_EXISTS" |
| `options.secret` | boolean |  | 值 `value` 是否加密，默认值为 `false` |

**请求示例**

```json
{
  "key": "kvs_key",
  "value": "kvs_value",
  "options": {
    "policy": "OVERRIDE"
  }
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `key` | string |  |  |
| `value` | string |  |  |

**响应示例**

```json
{
  "key": "kvs_key",
  "value": "kvs_value"
}
```

## NOS

> 分组路径：存储 / NOS

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/nexus/nos/create_upload_url` | [创建一个上传地址](#post-v2-nexus-nos-create-upload-url) | 企业令牌 |
| `POST` | `/v2/nexus/nos/create_download_url` | [创建一个下载地址](#post-v2-nexus-nos-create-download-url) | 企业令牌 |
| `POST` | `/v2/nexus/nos/get_metadata` | [获取一个对象元数据](#post-v2-nexus-nos-get-metadata) | 企业令牌 |
| `POST` | `/v2/nexus/nos/delete` | [删除一个对象](#post-v2-nexus-nos-delete) | 企业令牌 |

<a id="post-v2-nexus-nos-create-upload-url"></a>

### 创建一个上传地址

`POST /v2/nexus/nos/create_upload_url` ｜ 令牌：企业令牌 ｜ Scope：`pcp:storage:app` ｜ **未公开端点**

创建上传文件的 URL 地址。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `key` | string | 是 | 对象文件的 `key`，不同对象 `key` 的值不能相同 |
| `size` | number | 是 | 对象文件的大小，单位为字节 |
| `checksum` | string | 是 | 对象文件的签名字符串 |
| `checksum_type` | string | 是 | 对象文件的签名方式；枚举："SHA1" / "SHA256" / "CRC32" / "CRC32C" |
| `options` | object |  | 可选配置项 |
| `options.overwrite` | boolean |  | 是否允许覆盖同 `key` 对象文件。默认值为 `false`，当 `key` 已经存在时，直接报错。当值为 `true` 时表示会覆盖旧的对象文件 |

**请求示例**

```json
{
  "key": "nos/demo.png",
  "size": 1048576,
  "checksum": "a591a6d40bf420404a011733cfb762b0b96589e1",
  "checksum_type": "SHA1",
  "options": {
    "overwrite": true
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
  "url": "https://{nos_api_root}/api/upload/ef7123649a6a49c895945ebef251dc30?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```

<a id="post-v2-nexus-nos-create-download-url"></a>

### 创建一个下载地址

`POST /v2/nexus/nos/create_download_url` ｜ 令牌：企业令牌 ｜ Scope：`pcp:storage:app` ｜ **未公开端点**

创建文件下载的 URL 地址。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `key` | string | 是 | 对象文件的 `key` |

**请求示例**

```json
{
  "key": "nos/demo.png"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `url` | string |  |  |

**响应示例**

```json
{
  "url": "https://{nos_api_root}/api/download/451f6c4ae36b4d689f85d6621b7643a0?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```

<a id="post-v2-nexus-nos-get-metadata"></a>

### 获取一个对象元数据

`POST /v2/nexus/nos/get_metadata` ｜ 令牌：企业令牌 ｜ Scope：`pcp:storage:app` ｜ **未公开端点**

获取对象的基本信息。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `key` | string | 是 | 对象文件的 `key` |

**请求示例**

```json
{
  "key": "nos/demo.png"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `key` | string |  |  |
| `name` | string |  |  |
| `size` | string |  |  |
| `mime_type` | string |  |  |
| `checksum` | string |  |  |
| `created_at` | number |  |  |

**响应示例**

```json
{
  "key": "nos/demo.png",
  "name": "demo.png",
  "size": "1048576",
  "mime_type": "image/png",
  "checksum": "a591a6d40bf420404a011733cfb762b0b96589e1",
  "created_at": 1784025238
}
```

<a id="post-v2-nexus-nos-delete"></a>

### 删除一个对象

`POST /v2/nexus/nos/delete` ｜ 令牌：企业令牌 ｜ Scope：`pcp:storage:app` ｜ **未公开端点**

删除一个对象。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `key` | string | 是 | 对象文件的 `key` |

**请求示例**

```json
{
  "key": "nos/demo.png"
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```json
true
```
