# 测试管理

> 区域 `testhub`（测试管理） ｜ 5 个内容分组 ｜ 77 个端点

[← 返回 API 总览](../README.md)

## 测试库

> 分组路径：测试管理 / 测试库

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/testhub/libraries` | [创建一个测试库](#post-v2-testhub-libraries) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/libraries/{library_id}` | [获取一个测试库](#get-v2-testhub-libraries-library-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/testhub/libraries/{library_id}` | [部分更新一个测试库](#patch-v2-testhub-libraries-library-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/libraries` | [获取测试库列表](#get-v2-testhub-libraries) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/testhub/libraries/{library_id}/members` | [向测试库中添加一个成员](#post-v2-testhub-libraries-library-id-members) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/libraries/{library_id}/members/{member_id}` | [获取测试库中的一个成员](#get-v2-testhub-libraries-library-id-members-member-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/testhub/libraries/{library_id}/members/{member_id}` | [部分更新测试库中的一个成员](#patch-v2-testhub-libraries-library-id-members-member-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/libraries/{library_id}/members` | [获取测试库中的成员列表](#get-v2-testhub-libraries-library-id-members) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/testhub/libraries/{library_id}/members/{member_id}` | [在测试库中移除一个成员](#delete-v2-testhub-libraries-library-id-members-member-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/testhub/testcase_suites` | [创建一个用例模块](#post-v2-testhub-testcase-suites) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_suites/{testcase_suite_id}` | [获取一个用例模块](#get-v2-testhub-testcase-suites-testcase-suite-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_suites` | [获取用例模块列表](#get-v2-testhub-testcase-suites) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/testhub/testcase_suites/{testcase_suite_id}` | [删除一个用例模块](#delete-v2-testhub-testcase-suites-testcase-suite-id) | 企业令牌 / 用户令牌 |

<a id="post-v2-testhub-libraries"></a>

### 创建一个测试库

`POST /v2/testhub/libraries` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:library`

用于创建一个测试库。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `scope_type` | string |  | 测试库的所属类型。默认值 `organization`。允许值分别表示企业可见和团队可见；枚举："organization" / "user_group" |
| `scope_id` | string |  | 测试库的所属 id。当 `scope_type` 为 `user_group` 时，该字段必填，且表示团队 id；当 `scope_type` 为其他值时，该字段无效 |
| `name` | string | 是 | 测试库的名称 |
| `visibility` | string |  | 测试库的可见范围。允许值分别表示组织全部成员可见和仅测试库成员可见；枚举："public" / "private" |
| `identifier` | string | 是 | 测试库的标识。在一个企业中这个标识是唯一的。项目的标识由大写英文字母/数字/下划线/连接线组成（不超过 15 个字符） |
| `description` | string |  | 测试库的描述 |
| `members` | object |  | 测试库成员的列表。当测试库的 `scope_type` 变为 `user_group` 时，测试库成员必须是 `scope_id` 指定的团队内的成员；当 `scope_type` 为其他值时，测试库成员可以是任意成员或团队 |
| `members.id` | string | 是 | 企业成员或团队的 id |
| `members.type` | string | 是 | 测试库成员的类型；枚举："user" / "user_group" |
| `entity_properties` | object |  |  |
| `entity_properties.entity_property_key_a` | object |  |  |
| `entity_properties.entity_property_key_a.score` | number |  |  |
| `entity_properties.entity_property_key_a.risk` | string |  |  |
| `entity_properties.entity_property_key_b` | string |  |  |

**请求示例**

```json
{
  "scope_type": "user_group",
  "scope_id": "63c8fb32729dee3334d96af7",
  "name": "测试库",
  "visibility": "private",
  "identifier": "CSK",
  "description": "这是一个测试库",
  "entity_properties": {
    "entity_property_key_a": {
      "score": 95,
      "risk": "low"
    },
    "entity_property_key_b": "123456"
  },
  "members": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "type": "user"
    }
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 测试库的 id |
| `url` | string | 是 | 测试库的资源地址 |
| `identifier` | string | 是 | 测试库的标识 |
| `name` | string | 是 | 测试库的名称 |
| `scope_type` | string | 是 | 测试库的所属类型；枚举："organization" / "user_group" |
| `scope_id` | string | 是 | 测试库的所属 id |
| `visibility` | string | 是 | 测试库的可见性；枚举："private" / "public" |
| `color` | string | 是 | 测试库的主题色 |
| `description` | string | 是 | 测试库的描述 |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `members` | object[] | 是 | 测试库的成员列表 |
| `members[].id` | string |  |  |
| `members[].url` | string |  |  |
| `members[].type` | string |  |  |
| `members[].user` | object |  |  |
| `members[].user.id` | string |  |  |
| `members[].user.url` | string |  |  |
| `members[].user.name` | string |  |  |
| `members[].user.display_name` | string |  |  |
| `members[].user.avatar` | string |  |  |
| `created_at` | number | 是 | 测试库的创建时间 |
| `created_by` | object | 是 | 测试库的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 测试库的更新时间 |
| `updated_by` | object | 是 | 测试库的更新人 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |
| `is_archived` | number | 是 | 是否已归档；枚举：0 / 1 |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5eb623f6a70571487ea47000",
  "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
  "identifier": "CSK",
  "name": "测试库",
  "scope_type": "user_group",
  "scope_id": "63c8fb32729dee3334d96af7",
  "visibility": "private",
  "color": "#F693E7",
  "description": "这是一个测试库",
  "entity_properties": {
    "entity_property_key_a": {
      "score": 95,
      "risk": "low"
    },
    "entity_property_key_b": "123456"
  },
  "members": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
      "type": "user",
      "user": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      }
    }
  ],
  "created_at": 1583290300,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1583290300,
  "updated_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "is_archived": 0,
  "is_deleted": 0
}
```

<a id="get-v2-testhub-libraries-library-id"></a>

### 获取一个测试库

`GET /v2/testhub/libraries/{library_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:library`

用于按 id 获取测试库全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的测试库。该值默认为 `false` |
| `include_archived` | boolean |  | 是否包含已归档的测试库。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 测试库的 id |
| `url` | string | 是 | 测试库的资源地址 |
| `identifier` | string | 是 | 测试库的标识 |
| `name` | string | 是 | 测试库的名称 |
| `scope_type` | string | 是 | 测试库的所属类型；枚举："organization" / "user_group" |
| `scope_id` | string | 是 | 测试库的所属 id |
| `visibility` | string | 是 | 测试库的可见性；枚举："private" / "public" |
| `color` | string | 是 | 测试库的主题色 |
| `description` | string | 是 | 测试库的描述 |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `members` | object[] | 是 | 测试库的成员列表 |
| `members[].id` | string |  |  |
| `members[].url` | string |  |  |
| `members[].type` | string |  |  |
| `members[].user` | object |  |  |
| `members[].user.id` | string |  |  |
| `members[].user.url` | string |  |  |
| `members[].user.name` | string |  |  |
| `members[].user.display_name` | string |  |  |
| `members[].user.avatar` | string |  |  |
| `created_at` | number | 是 | 测试库的创建时间 |
| `created_by` | object | 是 | 测试库的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 测试库的更新时间 |
| `updated_by` | object | 是 | 测试库的更新人 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |
| `is_archived` | number | 是 | 是否已归档；枚举：0 / 1 |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5eb623f6a70571487ea47000",
  "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
  "identifier": "CSK",
  "name": "测试库",
  "scope_type": "user_group",
  "scope_id": "63c8fb32729dee3334d96af7",
  "visibility": "private",
  "color": "#F693E7",
  "description": "这是一个测试库",
  "entity_properties": {
    "entity_property_key_a": {
      "score": 95,
      "risk": "low"
    },
    "entity_property_key_b": "123456"
  },
  "members": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
      "type": "user",
      "user": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      }
    }
  ],
  "created_at": 1583290300,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1583290300,
  "updated_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "is_archived": 0,
  "is_deleted": 0
}
```

<a id="patch-v2-testhub-libraries-library-id"></a>

### 部分更新一个测试库

`PATCH /v2/testhub/libraries/{library_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:library`

用于部分更新一个测试库。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 测试库的名称 |
| `identifier` | string |  | 测试库的标识。在一个企业中这个标识是唯一的。项目的标识由大写英文字母/数字/下划线/连接线组成（不超过 15 个字符） |
| `description` | string |  | 测试库的描述 |

**请求示例**

```json
{
  "name": "测试库",
  "identifier": "CSK",
  "description": "这是一个测试库"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 测试库的 id |
| `url` | string | 是 | 测试库的资源地址 |
| `identifier` | string | 是 | 测试库的标识 |
| `name` | string | 是 | 测试库的名称 |
| `scope_type` | string | 是 | 测试库的所属类型；枚举："organization" / "user_group" |
| `scope_id` | string | 是 | 测试库的所属 id |
| `visibility` | string | 是 | 测试库的可见性；枚举："private" / "public" |
| `color` | string | 是 | 测试库的主题色 |
| `description` | string | 是 | 测试库的描述 |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `members` | object[] | 是 | 测试库的成员列表 |
| `members[].id` | string |  |  |
| `members[].url` | string |  |  |
| `members[].type` | string |  |  |
| `members[].user` | object |  |  |
| `members[].user.id` | string |  |  |
| `members[].user.url` | string |  |  |
| `members[].user.name` | string |  |  |
| `members[].user.display_name` | string |  |  |
| `members[].user.avatar` | string |  |  |
| `created_at` | number | 是 | 测试库的创建时间 |
| `created_by` | object | 是 | 测试库的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 测试库的更新时间 |
| `updated_by` | object | 是 | 测试库的更新人 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |
| `is_archived` | number | 是 | 是否已归档；枚举：0 / 1 |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5eb623f6a70571487ea47000",
  "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
  "identifier": "CSK",
  "name": "测试库",
  "scope_type": "user_group",
  "scope_id": "63c8fb32729dee3334d96af7",
  "visibility": "private",
  "color": "#F693E7",
  "description": "这是一个测试库",
  "entity_properties": {
    "entity_property_key_a": {
      "score": 95,
      "risk": "low"
    },
    "entity_property_key_b": "123456"
  },
  "members": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
      "type": "user",
      "user": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      }
    }
  ],
  "created_at": 1583290300,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1583290300,
  "updated_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "is_archived": 0,
  "is_deleted": 0
}
```

<a id="get-v2-testhub-libraries"></a>

### 获取测试库列表

`GET /v2/testhub/libraries` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:library`

用于分页获取测试库。  
 默认不含已删除/已归档项。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `scope_type` | string |  | 测试库的所属类型。允许值分别表示企业可见和团队可见；枚举："organization" / "user_group" |
| `scope_id` | string |  | 测试库的所属 id。仅支持团队的 id |
| `keywords` | string |  | 关键字。只支持 `name` 关键字搜索 |
| `member_type` | string |  | 测试库成员的类型。`member_type` 和 `member_id` 必须同时存在；枚举："user" / "user_group" |
| `member_id` | string |  | 测试库成员的 id。值为企业成员或团队的 id。`member_id` 和 `member_type` 必须同时存在 |
| `created_between` | string |  | 创建时间介于的时间范围，通过','分割起始时间 |
| `updated_between` | string |  | 更新时间介于的时间范围，通过','分割起始时间 |
| `include_deleted` | boolean |  | 是否查询已删除的测试库。该值默认为 `false` |
| `include_archived` | boolean |  | 是否查询已归档的测试库。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 测试库全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].identifier` | string |  |  |
| `values[].name` | string |  |  |
| `values[].scope_type` | string |  |  |
| `values[].scope_id` | string |  |  |
| `values[].visibility` | string |  |  |
| `values[].color` | string |  |  |
| `values[].description` | string |  |  |
| `values[].entity_properties` | object |  |  |
| `values[].entity_properties.entity_property_key_a` | object |  |  |
| `values[].entity_properties.entity_property_key_a.score` | number |  |  |
| `values[].entity_properties.entity_property_key_a.risk` | string |  |  |
| `values[].entity_properties.entity_property_key_b` | string |  |  |
| `values[].members` | object[] |  |  |
| `values[].members[].id` | string |  |  |
| `values[].members[].url` | string |  |  |
| `values[].members[].type` | string |  |  |
| `values[].members[].user` | object |  |  |
| `values[].members[].user.id` | string |  |  |
| `values[].members[].user.url` | string |  |  |
| `values[].members[].user.name` | string |  |  |
| `values[].members[].user.display_name` | string |  |  |
| `values[].members[].user.avatar` | string |  |  |
| `values[].created_at` | number |  |  |
| `values[].created_by` | object |  |  |
| `values[].created_by.id` | string |  |  |
| `values[].created_by.url` | string |  |  |
| `values[].created_by.name` | string |  |  |
| `values[].created_by.display_name` | string |  |  |
| `values[].created_by.avatar` | string |  |  |
| `values[].updated_at` | number |  |  |
| `values[].updated_by` | object |  |  |
| `values[].updated_by.id` | string |  |  |
| `values[].updated_by.url` | string |  |  |
| `values[].updated_by.name` | string |  |  |
| `values[].updated_by.display_name` | string |  |  |
| `values[].updated_by.avatar` | string |  |  |
| `values[].is_archived` | number |  |  |
| `values[].is_deleted` | number |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5eb623f6a70571487ea47000",
      "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
      "identifier": "CSK",
      "name": "测试库",
      "scope_type": "user_group",
      "scope_id": "63c8fb32729dee3334d96af7",
      "visibility": "private",
      "color": "#F693E7",
      "description": "这是一个测试库",
      "entity_properties": {
        "entity_property_key_a": {
          "score": 95,
          "risk": "low"
        },
        "entity_property_key_b": "123456"
      },
      "members": [
        {
          "id": "a0417f68e846aae315c85d24643678a9",
          "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
          "type": "user",
          "user": {
            "id": "a0417f68e846aae315c85d24643678a9",
            "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
            "name": "john",
            "display_name": "John",
            "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
          }
        }
      ],
      "created_at": 1583290300,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "updated_at": 1583290300,
      "updated_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "is_archived": 0,
      "is_deleted": 0
    }
  ]
}
```

<a id="post-v2-testhub-libraries-library-id-members"></a>

### 向测试库中添加一个成员

`POST /v2/testhub/libraries/{library_id}/members` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:library`

用于向测试库中添加企业成员或团队。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `member` | object | 是 | 测试库的成员 |
| `member.id` | string | 是 | 企业成员或团队的 id |
| `member.type` | string | 是 | 成员的类型；枚举："user" / "user_group" |
| `role_id` | string |  | 角色的 id |

**请求示例**

```json
{
  "member": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "type": "user"
  },
  "role_id": "6422711c3f12e6c1e46d40e6"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 测试库成员的 id |
| `url` | string | 是 | 测试库成员的资源地址 |
| `library` | object | 是 | 所属测试库的引用结构数据 |
| `library.id` | string |  |  |
| `library.url` | string |  |  |
| `library.identifier` | string |  |  |
| `library.name` | string |  |  |
| `library.is_archived` | number |  |  |
| `library.is_deleted` | number |  |  |
| `type` | string | 是 | 测试库成员的类型；枚举："user" / "user_group" |
| `user` | object |  | 企业成员的引用结构数据。当 `type` 为 `user` 时，该字段返回 |
| `user.id` | string |  |  |
| `user.url` | string |  |  |
| `user.name` | string |  |  |
| `user.display_name` | string |  |  |
| `user.avatar` | string |  |  |
| `user_group` | object |  | 团队的引用结构数据。当 `type` 为 `user_group` 时，该字段返回 |
| `role` | object | 是 | 成员角色的引用结构数据 |
| `role.id` | string |  |  |
| `role.url` | string |  |  |
| `role.name` | string |  |  |

**响应示例**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
  "library": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
    "identifier": "CSK",
    "name": "测试库",
    "is_archived": 0,
    "is_deleted": 0
  },
  "type": "user",
  "user": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "role": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/directory/roles/6422711c3f12e6c1e46d40e6",
    "name": "管理员"
  }
}
```

<a id="get-v2-testhub-libraries-library-id-members-member-id"></a>

### 获取测试库中的一个成员

`GET /v2/testhub/libraries/{library_id}/members/{member_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:library`

用于按 id 获取测试库成员全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |
| `member_id` | string | 是 | 测试库成员的 id，即企业成员或团队的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 测试库成员的 id |
| `url` | string | 是 | 测试库成员的资源地址 |
| `library` | object | 是 | 所属测试库的引用结构数据 |
| `library.id` | string |  |  |
| `library.url` | string |  |  |
| `library.identifier` | string |  |  |
| `library.name` | string |  |  |
| `library.is_archived` | number |  |  |
| `library.is_deleted` | number |  |  |
| `type` | string | 是 | 测试库成员的类型；枚举："user" / "user_group" |
| `user` | object |  | 企业成员的引用结构数据。当 `type` 为 `user` 时，该字段返回 |
| `user.id` | string |  |  |
| `user.url` | string |  |  |
| `user.name` | string |  |  |
| `user.display_name` | string |  |  |
| `user.avatar` | string |  |  |
| `user_group` | object |  | 团队的引用结构数据。当 `type` 为 `user_group` 时，该字段返回 |
| `role` | object | 是 | 成员角色的引用结构数据 |
| `role.id` | string |  |  |
| `role.url` | string |  |  |
| `role.name` | string |  |  |

**响应示例**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
  "library": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
    "identifier": "CSK",
    "name": "测试库",
    "is_archived": 0,
    "is_deleted": 0
  },
  "type": "user",
  "user": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "role": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/directory/roles/6422711c3f12e6c1e46d40e6",
    "name": "管理员"
  }
}
```

<a id="patch-v2-testhub-libraries-library-id-members-member-id"></a>

### 部分更新测试库中的一个成员

`PATCH /v2/testhub/libraries/{library_id}/members/{member_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:library`

用于部分更新测试库成员的角色。  
 仅管理员可更改其他用户的角色。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |
| `member_id` | string | 是 | 企业成员或团队的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `role_id` | string |  | 角色的 id。管理员可以更改其他用户的角色，但非管理员用户无权更改其他用户的角色 |

**请求示例**

```json
{
  "role_id": "6422711c3f12e6c1e46d40e6"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 测试库成员的 id |
| `url` | string | 是 | 测试库成员的资源地址 |
| `library` | object | 是 | 所属测试库的引用结构数据 |
| `library.id` | string |  |  |
| `library.url` | string |  |  |
| `library.identifier` | string |  |  |
| `library.name` | string |  |  |
| `library.is_archived` | number |  |  |
| `library.is_deleted` | number |  |  |
| `type` | string | 是 | 测试库成员的类型；枚举："user" / "user_group" |
| `user` | object |  | 企业成员的引用结构数据。当 `type` 为 `user` 时，该字段返回 |
| `user.id` | string |  |  |
| `user.url` | string |  |  |
| `user.name` | string |  |  |
| `user.display_name` | string |  |  |
| `user.avatar` | string |  |  |
| `user_group` | object |  | 团队的引用结构数据。当 `type` 为 `user_group` 时，该字段返回 |
| `role` | object | 是 | 成员角色的引用结构数据 |
| `role.id` | string |  |  |
| `role.url` | string |  |  |
| `role.name` | string |  |  |

**响应示例**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
  "library": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
    "identifier": "CSK",
    "name": "测试库",
    "is_archived": 0,
    "is_deleted": 0
  },
  "type": "user",
  "user": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "role": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/directory/roles/6422711c3f12e6c1e46d40e6",
    "name": "管理员"
  }
}
```

<a id="get-v2-testhub-libraries-library-id-members"></a>

### 获取测试库中的成员列表

`GET /v2/testhub/libraries/{library_id}/members` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:library`

用于分页获取测试库中的成员。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 测试库中的成员全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].library` | object |  |  |
| `values[].library.id` | string |  |  |
| `values[].library.url` | string |  |  |
| `values[].library.identifier` | string |  |  |
| `values[].library.name` | string |  |  |
| `values[].library.is_archived` | number |  |  |
| `values[].library.is_deleted` | number |  |  |
| `values[].type` | string |  |  |
| `values[].user` | object |  |  |
| `values[].user.id` | string |  |  |
| `values[].user.url` | string |  |  |
| `values[].user.name` | string |  |  |
| `values[].user.display_name` | string |  |  |
| `values[].user.avatar` | string |  |  |
| `values[].role` | object |  |  |
| `values[].role.id` | string |  |  |
| `values[].role.url` | string |  |  |
| `values[].role.name` | string |  |  |
| `values[].user_group` | object |  |  |
| `values[].user_group.id` | string |  |  |
| `values[].user_group.url` | string |  |  |
| `values[].user_group.name` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
      "library": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
        "identifier": "CSK",
        "name": "测试库",
        "is_archived": 0,
        "is_deleted": 0
      },
      "type": "user",
      "user": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "role": {
        "id": "6422711c3f12e6c1e46d40e6",
        "url": "https://{rest_api_root}/v2/directory/roles/6422711c3f12e6c1e46d40e6",
        "name": "管理员"
      }
    },
    {
      "id": "63c8fb32729dee3334d96af7",
      "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000/members/63c8fb32729dee3334d96af7",
      "library": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
        "identifier": "CSK",
        "name": "测试库",
        "is_archived": 0,
        "is_deleted": 0
      },
      "type": "user_group",
      "user_group": {
        "id": "63c8fb32729dee3334d96af7",
        "url": "https://{rest_api_root}/v2/directory/groups/63c8fb32729dee3334d96af7",
        "name": "Open Team"
      },
      "role": {
        "id": "6422711c3f12e6c1e46d40e6",
        "url": "https://{rest_api_root}/v2/directory/roles/6422711c3f12e6c1e46d40e6",
        "name": "管理员"
      }
    }
  ]
}
```

<a id="delete-v2-testhub-libraries-library-id-members-member-id"></a>

### 在测试库中移除一个成员

`DELETE /v2/testhub/libraries/{library_id}/members/{member_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:library`

用于按成员 id 从测试库中移除一个成员。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |
| `member_id` | string | 是 | 企业成员或团队的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 测试库成员的 id |
| `url` | string | 是 | 测试库成员的资源地址 |
| `library` | object | 是 | 所属测试库的引用结构数据 |
| `library.id` | string |  |  |
| `library.url` | string |  |  |
| `library.identifier` | string |  |  |
| `library.name` | string |  |  |
| `library.is_archived` | number |  |  |
| `library.is_deleted` | number |  |  |
| `type` | string | 是 | 测试库成员的类型；枚举："user" / "user_group" |
| `user` | object |  | 企业成员的引用结构数据。当 `type` 为 `user` 时，该字段返回 |
| `user.id` | string |  |  |
| `user.url` | string |  |  |
| `user.name` | string |  |  |
| `user.display_name` | string |  |  |
| `user.avatar` | string |  |  |
| `user_group` | object |  | 团队的引用结构数据。当 `type` 为 `user_group` 时，该字段返回 |
| `role` | object | 是 | 成员角色的引用结构数据 |
| `role.id` | string |  |  |
| `role.url` | string |  |  |
| `role.name` | string |  |  |

**响应示例**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
  "library": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
    "identifier": "CSK",
    "name": "测试库",
    "is_archived": 0,
    "is_deleted": 0
  },
  "type": "user",
  "user": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "role": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/directory/roles/6422711c3f12e6c1e46d40e6",
    "name": "管理员"
  }
}
```

<a id="post-v2-testhub-testcase-suites"></a>

### 创建一个用例模块

`POST /v2/testhub/testcase_suites` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:library`

用于在测试库中创建一个用例模块。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |
| `name` | string | 是 | 测试模块名称。测试模块为树形结构，同一层次下的名称不能重复 |
| `parent_id` | string |  | 父测试模块的 id |

**请求示例**

```json
{
  "library_id": "5eb623f6a70571487ea47000",
  "name": "登录",
  "parent_id": "5eb623f6a70571487ea46999"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例模块的 id |
| `url` | string | 是 | 用例模块的资源地址 |
| `library` | object | 是 | 所属测试库的引用结构数据 |
| `library.id` | string |  |  |
| `library.url` | string |  |  |
| `library.identifier` | string |  |  |
| `library.name` | string |  |  |
| `library.is_archived` | number |  |  |
| `library.is_deleted` | number |  |  |
| `name` | string | 是 | 用例模块的名称 |
| `parent` | object |  | 父测试模块的引用结构数据 |
| `parent.id` | string |  |  |
| `parent.url` | string |  |  |
| `parent.name` | string |  |  |
| `paths` | string | 是 | 用例模块的路径，以`/`分隔 |

**响应示例**

```json
{
  "id": "55714870a70ea4eb623f6700",
  "url": "https://{rest_api_root}/v2/testhub/testcase_suites/55714870a70ea4eb623f6700",
  "library": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
    "identifier": "CSK",
    "name": "测试库",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "登录",
  "parent": {
    "id": "5eb623f6a70571487ea46999",
    "url": "https://{rest_api_root}/v2/testhub/testcase_suites/5eb623f6a70571487ea46999",
    "name": "用户"
  },
  "paths": "首页/用户"
}
```

<a id="get-v2-testhub-testcase-suites-testcase-suite-id"></a>

### 获取一个用例模块

`GET /v2/testhub/testcase_suites/{testcase_suite_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:library`

用于按 id 获取用例模块全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_suite_id` | string | 是 | 用例模块的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例模块的 id |
| `url` | string | 是 | 用例模块的资源地址 |
| `library` | object | 是 | 所属测试库的引用结构数据 |
| `library.id` | string |  |  |
| `library.url` | string |  |  |
| `library.identifier` | string |  |  |
| `library.name` | string |  |  |
| `library.is_archived` | number |  |  |
| `library.is_deleted` | number |  |  |
| `name` | string | 是 | 用例模块的名称 |
| `parent` | object |  | 父测试模块的引用结构数据 |
| `parent.id` | string |  |  |
| `parent.url` | string |  |  |
| `parent.name` | string |  |  |
| `paths` | string | 是 | 用例模块的路径，以`/`分隔 |

**响应示例**

```json
{
  "id": "55714870a70ea4eb623f6700",
  "url": "https://{rest_api_root}/v2/testhub/testcase_suites/55714870a70ea4eb623f6700",
  "library": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
    "identifier": "CSK",
    "name": "测试库",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "登录",
  "parent": {
    "id": "5eb623f6a70571487ea46999",
    "url": "https://{rest_api_root}/v2/testhub/testcase_suites/5eb623f6a70571487ea46999",
    "name": "用户"
  },
  "paths": "首页/用户"
}
```

<a id="get-v2-testhub-testcase-suites"></a>

### 获取用例模块列表

`GET /v2/testhub/testcase_suites` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:library`

用于分页获取测试库中的用例模块，可按父模块筛选。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |
| `parent_id` | string |  | 父测试模块的 id。值可以是 `root` 或者某个模块 id，当为空时，获取到所有的模块，当为 `root` 时，获取到所有的一级模块，当为某个模块 id 时，获取到该模块的直属子模块 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 用例模块全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].library` | object |  |  |
| `values[].library.id` | string |  |  |
| `values[].library.url` | string |  |  |
| `values[].library.identifier` | string |  |  |
| `values[].library.name` | string |  |  |
| `values[].library.is_archived` | number |  |  |
| `values[].library.is_deleted` | number |  |  |
| `values[].name` | string |  |  |
| `values[].parent` | object |  |  |
| `values[].parent.id` | string |  |  |
| `values[].parent.url` | string |  |  |
| `values[].parent.name` | string |  |  |
| `values[].paths` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "55714870a70ea4eb623f6700",
      "url": "https://{rest_api_root}/v2/testhub/testcase_suites/55714870a70ea4eb623f6700",
      "library": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
        "identifier": "CSK",
        "name": "测试库",
        "is_archived": 0,
        "is_deleted": 0
      },
      "name": "登录",
      "parent": {
        "id": "5eb623f6a70571487ea46999",
        "url": "https://{rest_api_root}/v2/testhub/testcase_suites/5eb623f6a70571487ea46999",
        "name": "用户"
      },
      "paths": "首页/用户"
    }
  ]
}
```

<a id="delete-v2-testhub-testcase-suites-testcase-suite-id"></a>

### 删除一个用例模块

`DELETE /v2/testhub/testcase_suites/{testcase_suite_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:library`

用于删除一个用例模块。  
 请注意，删除一个模块会自动删除其所有的子模块。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_suite_id` | string | 是 | 测试模块的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例模块的 id |
| `url` | string | 是 | 用例模块的资源地址 |
| `library` | object | 是 | 所属测试库的引用结构数据 |
| `library.id` | string |  |  |
| `library.url` | string |  |  |
| `library.identifier` | string |  |  |
| `library.name` | string |  |  |
| `library.is_archived` | number |  |  |
| `library.is_deleted` | number |  |  |
| `name` | string | 是 | 用例模块的名称 |
| `parent` | object |  | 父测试模块的引用结构数据 |
| `parent.id` | string |  |  |
| `parent.url` | string |  |  |
| `parent.name` | string |  |  |
| `paths` | string | 是 | 用例模块的路径，以`/`分隔 |

**响应示例**

```json
{
  "id": "55714870a70ea4eb623f6701",
  "url": "https://{rest_api_root}/v2/testhub/testcase_suites/55714870a70ea4eb623f6701",
  "library": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
    "identifier": "CSK",
    "name": "测试库",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "注册",
  "parent": {
    "id": "5eb623f6a70571487ea46999",
    "url": "https://{rest_api_root}/v2/testhub/testcase_suites/5eb623f6a70571487ea46999",
    "name": "用户"
  },
  "paths": "首页/用户"
}
```

## 用例

> 分组路径：测试管理 / 用例

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/testhub/testcases` | [创建一个用例](#post-v2-testhub-testcases) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcases/{testcase_id}` | [获取一个用例](#get-v2-testhub-testcases-testcase-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/testhub/testcases/{testcase_id}` | [部分更新一个用例](#patch-v2-testhub-testcases-testcase-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/testhub/testcases/bulk/create` | [批量创建用例](#post-v2-testhub-testcases-bulk-create) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/testhub/testcases/bulk/update` | [批量部分更新用例](#post-v2-testhub-testcases-bulk-update) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcases` | [获取用例列表](#get-v2-testhub-testcases) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/testhub/testcases/search` | [搜索用例列表](#post-v2-testhub-testcases-search) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/testhub/testcases/{testcase_id}` | [删除一个用例](#delete-v2-testhub-testcases-testcase-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase/testcase_suites` | [获取可用的用例模块列表](#get-v2-testhub-testcase-testcase-suites) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase/testcase_properties` | [获取可用的用例属性列表](#get-v2-testhub-testcase-testcase-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase/testcase_states` | [获取可用的用例状态列表](#get-v2-testhub-testcase-testcase-states) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase/testcase_types` | [获取可用的用例类型列表](#get-v2-testhub-testcase-testcase-types) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcases/{testcase_id}/histories/{history_id}` | [获取用例的一条执行历史](#get-v2-testhub-testcases-testcase-id-histories-history-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcases/{testcase_id}/histories` | [获取用例的执行历史列表](#get-v2-testhub-testcases-testcase-id-histories) | 企业令牌 / 用户令牌 |

<a id="post-v2-testhub-testcases"></a>

### 创建一个用例

`POST /v2/testhub/testcases` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:testcase`

用于创建一个用例。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |
| `title` | string | 是 | 测试用例的标题 |
| `suite_id` | string |  | 测试用例所属模块的 id |
| `type_id` | string |  | 测试用例类型的 id |
| `important_level_id` | string |  | 测试用例重要程度的 id |
| `maintenance_id` | string |  | 测试用例维护人的 id |
| `participant_ids` | string[] |  | 测试用例关注人的 id 列表 |
| `properties` | object |  | 测试用例属性的键值对集合，需要注意的是，当前测试用例对应的属性方案需要包含这些测试用例属性 |
| `properties.prop_a` | string |  |  |
| `properties.prop_b` | string |  |  |
| `description` | string |  | 测试用例的描述 |
| `precondition` | string |  | 测试用例的前置条件 |
| `steps` | object[] |  | 测试用例的步骤列表。steps 是整体更新的 |
| `steps[].step_id` | string |  |  |
| `steps[].description` | string |  |  |
| `steps[].is_group` | boolean |  |  |
| `steps[].expected_value` | string |  |  |
| `steps[].group_id` | string |  |  |

**请求示例**

```json
{
  "library_id": "5eb623f6a70571487ea47000",
  "title": "这是一个测试用例",
  "suite_id": "55714870a70ea4eb623f6700",
  "type_id": "5cf189b35de9c20620ad7153",
  "important_level_id": "57a109b35ae8c20630fd7256",
  "maintenance_id": "a0417f68e846aae315c85d24643678a9",
  "participant_ids": [
    "a0417f68e846aae315c85d24643678a9"
  ],
  "properties": {
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value"
  },
  "description": "测试用例的备注",
  "precondition": "前置条件的描述信息",
  "steps": [
    {
      "step_id": "5cdca524cade3a112b063071",
      "description": "UI 测试",
      "is_group": true
    },
    {
      "step_id": "5cdca524cade3a112b063072",
      "description": "在浏览器地址栏中输入 https://pingcode.com",
      "expected_value": "成功访问 PingCode 官网",
      "is_group": false,
      "group_id": "5cdca524cade3a112b063071"
    }
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例的 id |
| `url` | string |  |  |
| `title` | string |  |  |

**响应示例**

```json
{
  "id": "5edca524cad2fa112b06305c",
  "url": "https://{rest_api_root}/v2/testhub/testcases/5edca524cad2fa112b06305c",
  "title": "这是一个测试用例"
}
```

<a id="get-v2-testhub-testcases-testcase-id"></a>

### 获取一个用例

`GET /v2/testhub/testcases/{testcase_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:testcase`

用于按 id、short_id 或 whole_identifier 获取用例全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_id` | string | 是 | 测试用例的 id、short_id 或 whole_identifier |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否查询已删除的用例。该值默认为 `false` |
| `include_public_image_token` | string |  | 包含获取图片资源 token 的属性。使用','分割，最多 32 个，支持 `description` 和自定义多行文本类型的属性。参数示例 `description,properties.prop_b` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例的 id |
| `url` | string | 是 | 用例的资源地址 |
| `short_id` | string | 是 | 用例的短 id |
| `html_url` | string | 是 | 用例的 html 地址 |
| `library` | object | 是 | 用例所属的测试库 |
| `library.id` | string |  |  |
| `library.url` | string |  |  |
| `library.identifier` | string |  |  |
| `library.name` | string |  |  |
| `library.is_archived` | number |  |  |
| `library.is_deleted` | number |  |  |
| `identifier` | number | 是 | 用例的编号 |
| `whole_identifier` | string | 是 | 用例的完整编号 |
| `title` | string | 是 | 用例的标题 |
| `important_level` | object | 是 | 用例的重要程度 |
| `important_level.id` | string |  |  |
| `important_level.url` | string |  |  |
| `important_level.name` | string |  |  |
| `suite` | object | 是 | 用例所属的测试模块 |
| `suite.id` | string |  |  |
| `suite.url` | string |  |  |
| `suite.name` | string |  |  |
| `suite.paths` | string |  |  |
| `state` | object | 是 | 用例的状态 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `type` | object | 是 | 用例的类型 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `maintenance` | object | 是 | 用例的维护人 |
| `maintenance.id` | string |  |  |
| `maintenance.url` | string |  |  |
| `maintenance.name` | string |  |  |
| `maintenance.display_name` | string |  |  |
| `maintenance.avatar` | string |  |  |
| `test_type` | string | 是 | 用例的测试类型。允许值分别表示自动测试和手动测试；枚举："automation" / "manual" |
| `description` | string | 是 | 用例的描述 |
| `precondition` | string | 是 | 用例的前置条件 |
| `properties` | object | 是 | 用例的自定义属性。自定义属性包括用户自定义的属性和一些系统内置的属性。用户自定义的属性例如 `prop_a` 和 `prop_b`。系统内置的属性例如 `estimated_workload` 和 `remaining_workload` |
| `properties.prop_a` | string |  |  |
| `properties.prop_b` | string |  |  |
| `properties.estimated_workload` | number |  |  |
| `properties.remaining_workload` | number |  |  |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `entity_properties.entity_property_key_a` | object |  |  |
| `entity_properties.entity_property_key_a.score` | number |  |  |
| `entity_properties.entity_property_key_a.risk` | string |  |  |
| `entity_properties.entity_property_key_b` | string |  |  |
| `steps` | object[] | 是 | 用例的步骤列表 |
| `steps[].step_id` | string |  |  |
| `steps[].description` | string |  |  |
| `steps[].expected_value` | null \| string |  |  |
| `steps[].is_group` | boolean |  |  |
| `steps[].group_id` | null \| string |  |  |
| `participants` | object[] | 是 | 用例的关注人列表 |
| `participants[].id` | string |  |  |
| `participants[].url` | string |  |  |
| `participants[].type` | string |  |  |
| `participants[].user` | object |  |  |
| `participants[].user.id` | string |  |  |
| `participants[].user.url` | string |  |  |
| `participants[].user.name` | string |  |  |
| `participants[].user.display_name` | string |  |  |
| `participants[].user.avatar` | string |  |  |
| `public_image_token` | string | 是 | 用例描述和自定义多行文本类型属性里获取图片资源 token。获取一个用例和获取用例列表参数 `include_public_image_token` 值有效时返回 |
| `created_at` | number | 是 | 用例的创建时间 |
| `created_by` | object | 是 | 用例的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 用例的更新时间 |
| `updated_by` | object | 是 | 用例的更新人 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |
| `is_archived` | number | 是 | 是否已归档；枚举：0 / 1 |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5edca524cad2fa112b06305c",
  "url": "https://{rest_api_root}/v2/testhub/testcases/5edca524cad2fa112b06305c",
  "short_id": "fdUw3C",
  "html_url": "https://yctech.pingcode.com/testhub/cases/fdUw3C",
  "library": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
    "identifier": "CSK",
    "name": "测试库",
    "is_archived": 0,
    "is_deleted": 0
  },
  "identifier": 10,
  "whole_identifier": "CSK-10",
  "title": "这是一个测试用例",
  "important_level": {
    "id": "57a109b35ae8c20630fd7256",
    "url": "https://{rest_api_root}/v2/testhub/testcase_important_levels/57a109b35ae8c20630fd7256",
    "name": "P1"
  },
  "suite": {
    "id": "55714870a70ea4eb623f6700",
    "url": "https://{rest_api_root}/v2/testhub/testcase_suites/55714870a70ea4eb623f6700",
    "name": "登录",
    "paths": "首页/账户"
  },
  "state": {
    "id": "686f62038668bbae4f4dd0c1",
    "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c1",
    "name": "设计",
    "type": "pending"
  },
  "type": {
    "id": "5cf189b35de9c20620ad7153",
    "url": "https://{rest_api_root}/v2/testhub/testcase_types/5cf189b35de9c20620ad7153",
    "name": "功能测试"
  },
  "maintenance": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "test_type": "automation",
  "description": "测试用例的备注",
  "precondition": "前置条件的描述信息",
  "properties": {
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value",
    "estimated_workload": 8,
    "remaining_workload": 5
  },
  "steps": [
    {
      "step_id": "524cad5edb06305cca2fa111",
      "description": "网页访问",
      "expected_value": null,
      "is_group": true,
      "group_id": null
    },
    {
      "step_id": "524cad5edb06305cca2fa112",
      "description": "在浏览器地址栏中输入 https://pingcode.com",
      "expected_value": "成功访问 PingCode 官网",
      "is_group": false,
      "group_id": "524cad5edb06305cca2fa111"
    }
  ],
  "entity_properties": {
    "entity_property_key_a": {
      "score": 95,
      "risk": "low"
    },
    "entity_property_key_b": "123456"
  },
  "participants": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=testcase&principal_id=5edca524cad2fa112b06305c",
      "type": "user",
      "user": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      }
    }
  ],
  "public_image_token": "IcF1VmJFF-UIi9lMU18m1NFFAruWXYx0ZAm90pJ2LGk",
  "created_at": 1583290300,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1583290300,
  "updated_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "is_archived": 0,
  "is_deleted": 0
}
```

<a id="patch-v2-testhub-testcases-testcase-id"></a>

### 部分更新一个用例

`PATCH /v2/testhub/testcases/{testcase_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:testcase`

用于部分更新一个用例。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_id` | string | 是 | 测试用例的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `suite_id` | string |  | 测试用例所属模块的 id |
| `state_id` | string |  | 测试用例状态的 id |
| `type_id` | string |  | 测试用例类型的 id |
| `title` | string |  | 测试用例的标题 |
| `important_level_id` | string |  | 测试用例重要程度的 id |
| `maintenance_id` | string |  | 测试用例维护人的 id |
| `properties` | object |  | 测试用例属性的键值对集合 |
| `description` | string |  | 测试用例的备注 |
| `precondition` | string |  | 测试用例的前置条件 |
| `steps` | object[] |  | 测试用例的步骤列表。steps 是整体更新的 |

**请求示例**

```json
{
  "suite_id": "55714870a70ea4eb623f6700",
  "state_id": "686f62038668bbae4f4dd0c1",
  "type_id": "5cf189b35de9c20620ad7153",
  "title": "这是一个测试用例",
  "important_level_id": "57a109b35ae8c20630fd7256",
  "maintenance_id": "a0417f68e846aae315c85d24643678a9"
}
```

**响应**

源文档未提供响应结构。

<a id="post-v2-testhub-testcases-bulk-create"></a>

### 批量创建用例

`POST /v2/testhub/testcases/bulk/create` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:testcase`

用于批量创建用例，单次最多支持 100 条。  
接口支持部分成功，单条失败不会影响其他条目，已成功的数据不会回滚。  
响应按请求条目顺序返回对应结果，通过 `state`（`success` / `failure`）判断操作结果，失败时通过 `message` 返回失败原因。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcases` | object | 是 | 创建单个测试用例必要参数的数组，数组内对象不能超过 100 个 |
| `testcases.test_library_id` | string | 是 | 测试库的 id |
| `testcases.title` | string | 是 | 测试用例的标题 |
| `testcases.suite_id` | string |  | 测试用例所属模块的 id |
| `testcases.type_id` | string |  | 测试用例类型的 id |
| `testcases.important_level_id` | string |  | 测试用例重要程度的 id |
| `testcases.maintenance_id` | string |  | 测试用例维护人的 id |
| `testcases.participant_ids` | string[] |  | 测试用例关注人的 id 列表 |
| `testcases.properties` | object |  | 测试用例属性的键值对集合 |
| `testcases.description` | string |  | 测试用例的描述 |
| `testcases.precondition` | string |  | 测试用例的前置条件 |
| `testcases.steps` | object[] |  | 测试用例的步骤列表。steps 是整体更新的 |

**请求示例**

```json
{
  "testcases": [
    {
      "test_library_id": "5eb623f6a70571487ea47000",
      "title": "这是一个测试用例",
      "type_id": "5cf189b35de9c20620ad7153",
      "important_level_id": "57a109b35ae8c20630fd7256"
    }
  ]
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```json
[
  {
    "state": "success",
    "testcase": {
      "id": "5edca524cad2fa112b06305c",
      "url": "https://{rest_api_root}/v2/testhub/testcases/5edca524cad2fa112b06305c",
      "short_id": "fdUw3C",
      "html_url": "https://yctech.pingcode.com/testhub/cases/fdUw3C",
      "library": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
        "identifier": "CSK",
        "name": "测试库",
        "is_archived": 0,
        "is_deleted": 0
      },
      "identifier": 10,
      "whole_identifier": "CSK-10",
      "title": "这是一个测试用例",
      "important_level": {
        "id": "57a109b35ae8c20630fd7256",
        "url": "https://{rest_api_root}/v2/testhub/testcase_important_levels/57a109b35ae8c20630fd7256",
        "name": "P1"
      },
      "suite": {
        "id": "55714870a70ea4eb623f6700",
        "url": "https://{rest_api_root}/v2/testhub/testcase_suites/55714870a70ea4eb623f6700",
        "name": "登录",
        "paths": "首页/账户"
      },
      "state": {
        "id": "686f62038668bbae4f4dd0c1",
        "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c1",
        "name": "设计",
        "type": "pending"
      },
      "type": {
        "id": "5cf189b35de9c20620ad7153",
        "url": "https://{rest_api_root}/v2/testhub/testcase_types/5cf189b35de9c20620ad7153",
        "name": "功能测试"
      },
      "maintenance": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "test_type": "automation",
      "description": "测试用例的备注",
      "precondition": "前置条件的描述信息",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value",
        "estimated_workload": 8,
        "remaining_workload": 5
      },
      "steps": [
        {
          "step_id": "524cad5edb06305cca2fa111",
          "description": "网页访问",
          "expected_value": null,
          "is_group": true,
          "group_id": null
        },
        {
          "step_id": "524cad5edb06305cca2fa112",
          "description": "在浏览器地址栏中输入 https://pingcode.com",
          "expected_value": "成功访问 PingCode 官网",
          "is_group": false,
          "group_id": "524cad5edb06305cca2fa111"
        }
      ],
      "entity_properties": {
        "entity_property_key_a": {
          "score": 95,
          "risk": "low"
        },
        "entity_property_key_b": "123456"
      },
      "participants": [
        {
          "id": "a0417f68e846aae315c85d24643678a9",
          "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=testcase&principal_id=5edca524cad2fa112b06305c",
          "type": "user",
          "user": {
            "id": "a0417f68e846aae315c85d24643678a9",
            "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
            "name": "john",
            "display_name": "John",
            "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
          }
        }
      ],
      "created_at": 1583290300,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "updated_at": 1583290300,
      "updated_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "is_archived": 0,
      "is_deleted": 0
    }
  },
  {
    "state": "failure",
    "message": "测试库不存在"
  }
]
```

<a id="post-v2-testhub-testcases-bulk-update"></a>

### 批量部分更新用例

`POST /v2/testhub/testcases/bulk/update` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:testcase`

用于批量部分更新用例，单次最多支持 100 条。  
接口支持部分成功，单条失败不会影响其他条目，已成功的数据不会回滚。  
响应按请求条目顺序返回对应结果，通过 `state`（`success` / `failure`）判断操作结果，失败时通过 `message` 返回失败原因。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcases` | object | 是 | 部分更新测试用例的数组 |
| `testcases.id` | string | 是 | 测试用例的 id |
| `testcases.suite_id` | string |  | 测试用例所属模块的 id |
| `testcases.state_id` | string |  | 测试用例状态的 id |
| `testcases.type_id` | string |  | 测试用例类型的 id |
| `testcases.title` | string |  | 测试用例的标题 |
| `testcases.important_level_id` | string |  | 测试用例重要程度的 id |
| `testcases.maintenance_id` | string |  | 测试用例维护人的 id |
| `testcases.properties` | object |  | 测试用例属性的键值对集合 |
| `testcases.description` | string |  | 测试用例的备注 |
| `testcases.precondition` | string |  | 测试用例的前置条件 |
| `testcases.steps` | object[] |  | 测试用例的步骤列表。steps 是整体更新的 |

**请求示例**

```json
{
  "testcases": [
    {
      "id": "5edca524cad2fa112b06305c",
      "state_id": "686f62038668bbae4f4dd0c1",
      "title": "这是一个测试用例"
    }
  ]
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```json
[
  {
    "state": "success",
    "testcase": {
      "id": "5edca524cad2fa112b06305c",
      "url": "https://{rest_api_root}/v2/testhub/testcases/5edca524cad2fa112b06305c",
      "short_id": "fdUw3C",
      "html_url": "https://yctech.pingcode.com/testhub/cases/fdUw3C",
      "library": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
        "identifier": "CSK",
        "name": "测试库",
        "is_archived": 0,
        "is_deleted": 0
      },
      "identifier": 10,
      "whole_identifier": "CSK-10",
      "title": "这是一个测试用例",
      "important_level": {
        "id": "57a109b35ae8c20630fd7256",
        "url": "https://{rest_api_root}/v2/testhub/testcase_important_levels/57a109b35ae8c20630fd7256",
        "name": "P1"
      },
      "suite": {
        "id": "55714870a70ea4eb623f6700",
        "url": "https://{rest_api_root}/v2/testhub/testcase_suites/55714870a70ea4eb623f6700",
        "name": "登录",
        "paths": "首页/账户"
      },
      "state": {
        "id": "686f62038668bbae4f4dd0c1",
        "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c1",
        "name": "设计",
        "type": "pending"
      },
      "type": {
        "id": "5cf189b35de9c20620ad7153",
        "url": "https://{rest_api_root}/v2/testhub/testcase_types/5cf189b35de9c20620ad7153",
        "name": "功能测试"
      },
      "maintenance": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "test_type": "automation",
      "description": "测试用例的备注",
      "precondition": "前置条件的描述信息",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value",
        "estimated_workload": 8,
        "remaining_workload": 5
      },
      "steps": [
        {
          "step_id": "524cad5edb06305cca2fa111",
          "description": "网页访问",
          "expected_value": null,
          "is_group": true,
          "group_id": null
        },
        {
          "step_id": "524cad5edb06305cca2fa112",
          "description": "在浏览器地址栏中输入 https://pingcode.com",
          "expected_value": "成功访问 PingCode 官网",
          "is_group": false,
          "group_id": "524cad5edb06305cca2fa111"
        }
      ],
      "entity_properties": {
        "entity_property_key_a": {
          "score": 95,
          "risk": "low"
        },
        "entity_property_key_b": "123456"
      },
      "participants": [
        {
          "id": "a0417f68e846aae315c85d24643678a9",
          "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=testcase&principal_id=5edca524cad2fa112b06305c",
          "type": "user",
          "user": {
            "id": "a0417f68e846aae315c85d24643678a9",
            "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
            "name": "john",
            "display_name": "John",
            "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
          }
        }
      ],
      "created_at": 1583290300,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "updated_at": 1583290300,
      "updated_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "is_archived": 0,
      "is_deleted": 0
    }
  },
  {
    "state": "failure",
    "message": "测试用例不存在"
  }
]
```

<a id="get-v2-testhub-testcases"></a>

### 获取用例列表

`GET /v2/testhub/testcases` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:testcase`

用于简单查询用例列表。  
 复杂组合、日期或自定义属性过滤请使用「搜索用例列表」。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string |  | 测试库的 id |
| `maintenance_id` | string |  | 维护人的 id |
| `state_id` | string |  | 状态的 id |
| `important_level_id` | string |  | 重要程度的 id |
| `tag_id` | string |  | 标签的 id |
| `keywords` | string |  | 关键字。支持用例编号和用例标题 |
| `created_between` | string |  | 创建时间介于的时间范围，通过','分割起始时间 |
| `updated_between` | string |  | 更新时间介于的时间范围，通过','分割起始时间 |
| `include_public_image_token` | string |  | 包含获取图片资源 token 的属性。使用','分割，最多 32 个 |
| `include_deleted` | boolean |  | 是否查询已删除的用例。该值默认为`false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 用例全量结构数据的数组 |

<a id="post-v2-testhub-testcases-search"></a>

### 搜索用例列表

`POST /v2/testhub/testcases/search` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:testcase`

用于按类 MongoDB 结构化条件搜索用例。  
 默认不含已删除/已归档项。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `mode` | string | 是 | 搜索模式。`query` 表示基于 `payload.filter` 的结构化条件查询；枚举："query" |
| `payload` | object | 是 | 搜索参数 |
| `payload.filter` | object |  | 过滤条件 |
| `payload.filter.title` | object |  |  |
| `payload.filter.title.contains` | string |  |  |
| `payload.filter.library.id` | object |  |  |
| `payload.filter.library.id.in` | string[] |  |  |
| `payload.keywords` | string |  | 关键字。支持用例编号和用例标题 |
| `payload.include_public_image_token` | string |  | 包含获取图片资源 token 的属性 |
| `payload.include_deleted` | boolean |  | 是否查询已删除的用例 |
| `payload.page_size` | number |  | 每页条数，取值范围 1-100 |
| `payload.page_index` | number |  | 页码，从 0 开始 |

**请求示例**

```json
{
  "mode": "query",
  "payload": {
    "filter": {
      "title": {
        "contains": "登录"
      },
      "library.id": {
        "in": [
          "5eb623f6a70571487ea47000"
        ]
      }
    },
    "keywords": "CSK",
    "page_size": 10,
    "page_index": 0
  }
}
```

**响应**

源文档未提供响应结构。

<a id="delete-v2-testhub-testcases-testcase-id"></a>

### 删除一个用例

`DELETE /v2/testhub/testcases/{testcase_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:testcase`

用于按 id 删除一个用例。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_id` | string | 是 | 测试用例的 id |

**响应**

源文档未提供响应结构。

<a id="get-v2-testhub-testcase-testcase-suites"></a>

### 获取可用的用例模块列表

`GET /v2/testhub/testcase/testcase_suites` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:testcase`

用于分页获取测试库中的用例模块。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 用例模块的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].paths` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "55714870a70ea4eb623f6700",
      "url": "https://{rest_api_root}/v2/testhub/testcase_suites/55714870a70ea4eb623f6700",
      "name": "登录",
      "paths": "首页/用户"
    }
  ]
}
```

<a id="get-v2-testhub-testcase-testcase-properties"></a>

### 获取可用的用例属性列表

`GET /v2/testhub/testcase/testcase_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:testcase`

用于分页获取测试库中的用例属性。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 用例属性的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].type` | string |  |  |
| `values[].options` | object[] \| null |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "environment",
      "url": "https://{rest_api_root}/v2/testhub/testcase_properties/environment",
      "name": "重现环境",
      "type": "select",
      "options": [
        {
          "id": "5efb1859110533727a82c603",
          "text": "测试"
        },
        {
          "id": "5efb1859110533727a82c604",
          "text": "生产"
        }
      ]
    },
    {
      "id": "estimated_workload",
      "url": "https://{rest_api_root}/v2/testhub/testcase_properties/estimated_workload",
      "name": "预估工时",
      "type": "number",
      "options": null
    }
  ]
}
```

<a id="get-v2-testhub-testcase-testcase-states"></a>

### 获取可用的用例状态列表

`GET /v2/testhub/testcase/testcase_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于分页获取测试库中的用例状态。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `page_size` | number | 是 | 每页条数 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 用例状态全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].type` | string |  |  |

**响应示例**

```json
{
  "page_index": 0,
  "page_size": 30,
  "total": 3,
  "values": [
    {
      "id": "686f62038668bbae4f4dd0c1",
      "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c1",
      "name": "设计",
      "type": "pending"
    },
    {
      "id": "686f62038668bbae4f4dd0c2",
      "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c2",
      "name": "就绪",
      "type": "completed"
    },
    {
      "id": "686f62038668bbae4f4dd0c3",
      "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c3",
      "name": "废弃",
      "type": "closed"
    }
  ]
}
```

<a id="get-v2-testhub-testcase-testcase-types"></a>

### 获取可用的用例类型列表

`GET /v2/testhub/testcase/testcase_types` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:testcase`

用于分页获取测试库中的用例类型。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 用例类型的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5cf189b35de9c20620ad7153",
      "url": "https://{rest_api_root}/v2/testhub/testcase_types/5cf189b35de9c20620ad7153",
      "name": "功能测试"
    }
  ]
}
```

<a id="get-v2-testhub-testcases-testcase-id-histories-history-id"></a>

### 获取用例的一条执行历史

`GET /v2/testhub/testcases/{testcase_id}/histories/{history_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:testcase`

用于按 id 获取用例的一条执行历史全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_id` | string | 是 | 测试用例的 id |
| `history_id` | string | 是 | 执行历史的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 执行历史的 id |
| `url` | string | 是 | 执行历史的资源地址 |
| `testrun` | object | 是 | 执行用例的引用结构数据 |
| `testrun.id` | string |  |  |
| `testrun.url` | string |  |  |
| `testrun.short_id` | string |  |  |
| `testrun.html_url` | string |  |  |
| `testrun.status` | string |  |  |
| `library` | object | 是 | 所属测试库的引用结构数据 |
| `library.id` | string |  |  |
| `library.url` | string |  |  |
| `library.identifier` | string |  |  |
| `library.name` | string |  |  |
| `library.is_archived` | number |  |  |
| `library.is_deleted` | number |  |  |
| `testplan` | object | 是 | 所属测试计划的引用结构数据 |
| `testplan.id` | string |  |  |
| `testplan.url` | string |  |  |
| `testplan.short_id` | string |  |  |
| `testplan.html_url` | string |  |  |
| `testplan.name` | string |  |  |
| `testplan.status` | string |  |  |
| `testplan.start_at` | object |  |  |
| `testplan.start_at.date` | number |  |  |
| `testplan.start_at.with_time` | number |  |  |
| `testplan.end_at` | object |  |  |
| `testplan.end_at.date` | number |  |  |
| `testplan.end_at.with_time` | number |  |  |
| `testcase` | object | 是 | 关联测试用例的引用结构数据 |
| `testcase.id` | string |  |  |
| `testcase.url` | string |  |  |
| `testcase.short_id` | string |  |  |
| `testcase.html_url` | string |  |  |
| `testcase.whole_identifier` | string |  |  |
| `testcase.title` | string |  |  |
| `testcase.test_type` | string |  |  |
| `testcase.properties` | object |  |  |
| `testcase.properties.prop_a` | string |  |  |
| `testcase.properties.prop_b` | string |  |  |
| `executed_status` | object | 是 | 执行结果的引用结构数据 |
| `remark` | string | 是 | 执行备注 |
| `executed_at` | number | 是 | 执行时间，单位为秒 |
| `executed_by` | object | 是 | 执行人的引用结构数据 |
| `executed_by.id` | string |  |  |
| `executed_by.url` | string |  |  |
| `executed_by.name` | string |  |  |
| `executed_by.display_name` | string |  |  |
| `executed_by.avatar` | string |  |  |
| `steps` | object[] | 是 | 执行步骤列表 |
| `steps[].step_id` | string |  |  |
| `steps[].status` | string |  |  |
| `steps[].actual_value` | null |  |  |
| `status` | string |  |  |

**响应示例**

```json
{
  "id": "65115f0939286e26e05a66db",
  "url": "https://{rest_api_root}/v2/testhub/testruns/547000eb6a70571487623fea/histories/65115f0939286e26e05a66db",
  "testrun": {
    "id": "547000eb6a70571487623fea",
    "url": "https://{rest_api_root}/v2/testhub/testruns/547000eb6a70571487623fea",
    "short_id": "Aq1u38yX",
    "html_url": "https://yctech.pingcode.com/testhub/runs/Aq1u38yX",
    "status": "pass"
  },
  "library": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
    "identifier": "CSK",
    "name": "测试库",
    "is_archived": 0,
    "is_deleted": 0
  },
  "testplan": {
    "id": "5eb6a70571487623fea47000",
    "url": "https://{rest_api_root}/v2/testhub/testplans/5eb6a70571487623fea47000",
    "short_id": "7nNkViOD",
    "html_url": "https://yctech.pingcode.com/testhub/libraries/CSK/plans/7nNkViOD/runs",
    "name": "测试计划",
    "status": "in_progress",
    "start_at": {
      "date": 1589791860,
      "with_time": 1
    },
    "end_at": {
      "date": 1589791870,
      "with_time": 1
    }
  },
  "testcase": {
    "id": "5edca524cad2fa112b06305c",
    "url": "https://{rest_api_root}/v2/testhub/testcases/5edca524cad2fa112b06305c",
    "short_id": "fdUw3C",
    "html_url": "https://yctech.pingcode.com/testhub/cases/fdUw3C",
    "whole_identifier": "CSK-10",
    "title": "这是一个测试用例",
    "test_type": "automation",
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  },
  "status": "pass",
  "executed_at": 1583290300,
  "executed_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "steps": [
    {
      "step_id": "524cad5edb06305cca2fa112",
      "status": "pass",
      "actual_value": null
    }
  ]
}
```

<a id="get-v2-testhub-testcases-testcase-id-histories"></a>

### 获取用例的执行历史列表

`GET /v2/testhub/testcases/{testcase_id}/histories` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:testcase`

用于获取用例的执行历史列表。  
 获取测试用例所有执行用例的最后一次执行结果。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_id` | string | 是 | 测试用例的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 用例的执行历史的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].testrun` | object |  |  |
| `values[].testrun.id` | string |  |  |
| `values[].testrun.url` | string |  |  |
| `values[].testrun.short_id` | string |  |  |
| `values[].testrun.html_url` | string |  |  |
| `values[].testrun.status` | string |  |  |
| `values[].library` | object |  |  |
| `values[].library.id` | string |  |  |
| `values[].library.url` | string |  |  |
| `values[].library.identifier` | string |  |  |
| `values[].library.name` | string |  |  |
| `values[].library.is_archived` | number |  |  |
| `values[].library.is_deleted` | number |  |  |
| `values[].testplan` | object |  |  |
| `values[].testplan.id` | string |  |  |
| `values[].testplan.url` | string |  |  |
| `values[].testplan.short_id` | string |  |  |
| `values[].testplan.html_url` | string |  |  |
| `values[].testplan.name` | string |  |  |
| `values[].testplan.status` | string |  |  |
| `values[].testplan.start_at` | object |  |  |
| `values[].testplan.start_at.date` | number |  |  |
| `values[].testplan.start_at.with_time` | number |  |  |
| `values[].testplan.end_at` | object |  |  |
| `values[].testplan.end_at.date` | number |  |  |
| `values[].testplan.end_at.with_time` | number |  |  |
| `values[].testcase` | object |  |  |
| `values[].testcase.id` | string |  |  |
| `values[].testcase.url` | string |  |  |
| `values[].testcase.short_id` | string |  |  |
| `values[].testcase.html_url` | string |  |  |
| `values[].testcase.whole_identifier` | string |  |  |
| `values[].testcase.title` | string |  |  |
| `values[].testcase.test_type` | string |  |  |
| `values[].testcase.properties` | object |  |  |
| `values[].testcase.properties.prop_a` | string |  |  |
| `values[].testcase.properties.prop_b` | string |  |  |
| `values[].status` | string |  |  |
| `values[].executed_at` | number |  |  |
| `values[].executed_by` | object |  |  |
| `values[].executed_by.id` | string |  |  |
| `values[].executed_by.url` | string |  |  |
| `values[].executed_by.name` | string |  |  |
| `values[].executed_by.display_name` | string |  |  |
| `values[].executed_by.avatar` | string |  |  |
| `values[].steps` | object[] |  |  |
| `values[].steps[].step_id` | string |  |  |
| `values[].steps[].status` | string |  |  |
| `values[].steps[].actual_value` | null |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "65115f0939286e26e05a66db",
      "url": "https://{rest_api_root}/v2/testhub/testruns/547000eb6a70571487623fea/histories/65115f0939286e26e05a66db",
      "testrun": {
        "id": "547000eb6a70571487623fea",
        "url": "https://{rest_api_root}/v2/testhub/testruns/547000eb6a70571487623fea",
        "short_id": "Aq1u38yX",
        "html_url": "https://yctech.pingcode.com/testhub/runs/Aq1u38yX",
        "status": "pass"
      },
      "library": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
        "identifier": "CSK",
        "name": "测试库",
        "is_archived": 0,
        "is_deleted": 0
      },
      "testplan": {
        "id": "5eb6a70571487623fea47000",
        "url": "https://{rest_api_root}/v2/testhub/testplans/5eb6a70571487623fea47000",
        "short_id": "7nNkViOD",
        "html_url": "https://yctech.pingcode.com/testhub/libraries/CSK/plans/7nNkViOD/runs",
        "name": "测试计划",
        "status": "in_progress",
        "start_at": {
          "date": 1589791860,
          "with_time": 1
        },
        "end_at": {
          "date": 1589791870,
          "with_time": 1
        }
      },
      "testcase": {
        "id": "5edca524cad2fa112b06305c",
        "url": "https://{rest_api_root}/v2/testhub/testcases/5edca524cad2fa112b06305c",
        "short_id": "fdUw3C",
        "html_url": "https://yctech.pingcode.com/testhub/cases/fdUw3C",
        "whole_identifier": "CSK-10",
        "title": "这是一个测试用例",
        "test_type": "automation",
        "properties": {
          "prop_a": "prop_a_value",
          "prop_b": "prop_b_value"
        }
      },
      "status": "pass",
      "executed_at": 1583290300,
      "executed_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "steps": [
        {
          "step_id": "524cad5edb06305cca2fa112",
          "status": "pass",
          "actual_value": null
        }
      ]
    }
  ]
}
```

## 计划

> 分组路径：测试管理 / 计划

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/testhub/testplans` | [创建一个计划](#post-v2-testhub-testplans) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testplans/{testplan_id}` | [获取一个计划](#get-v2-testhub-testplans-testplan-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/testhub/testplans/{testplan_id}` | [部分更新一个计划](#patch-v2-testhub-testplans-testplan-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testplans` | [获取计划列表](#get-v2-testhub-testplans) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testplan_types/{testplan_type_id}` | [获取一个计划类型](#get-v2-testhub-testplan-types-testplan-type-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testplan_types` | [获取计划类型列表](#get-v2-testhub-testplan-types) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/testhub/testruns` | [创建一个执行用例](#post-v2-testhub-testruns) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testruns/{testrun_id}` | [获取一个执行用例](#get-v2-testhub-testruns-testrun-id) | 企业令牌 / 用户令牌 |
| `PUT` | `/v2/testhub/testruns/{testrun_id}` | [全量更新一个执行用例](#put-v2-testhub-testruns-testrun-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/testhub/testruns/{testrun_id}` | [部分更新一个执行用例](#patch-v2-testhub-testruns-testrun-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/testhub/testruns/bulk/create` | [批量创建执行用例](#post-v2-testhub-testruns-bulk-create) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/testhub/testruns/bulk/update` | [批量部分更新执行用例](#post-v2-testhub-testruns-bulk-update) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/testhub/testruns/bulk/delete` | [批量删除执行用例](#post-v2-testhub-testruns-bulk-delete) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testruns` | [获取执行用例列表](#get-v2-testhub-testruns) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/testhub/testruns/search` | [搜索执行用例列表](#post-v2-testhub-testruns-search) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testrun/statuses` | [获取可用的执行用例执行结果列表](#get-v2-testhub-testrun-statuses) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testruns/{testrun_id}/histories/{history_id}` | [获取一条执行用例结果记录](#get-v2-testhub-testruns-testrun-id-histories-history-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testruns/{testrun_id}/histories` | [获取执行用例结果记录列表](#get-v2-testhub-testruns-testrun-id-histories) | 企业令牌 / 用户令牌 |

<a id="post-v2-testhub-testplans"></a>

### 创建一个计划

`POST /v2/testhub/testplans` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:testplan`

用于创建一个测试计划。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |
| `name` | string | 是 | 计划的名称。名称在一个测试库里唯一 |
| `start_at` | object | 是 | 开始时间 |
| `start_at.date` | number |  |  |
| `start_at.with_time` | number |  |  |
| `end_at` | object | 是 | 结束时间 |
| `end_at.date` | number |  |  |
| `end_at.with_time` | number |  |  |
| `assignee_id` | string | 是 | 负责人 id |
| `type_id` | string |  | 计划类型 id |
| `project_id` | string |  | 关联项目 id。该字段在 sprint_id 或 release_id 有值时必填 |
| `sprint_id` | string |  | 关联迭代 id。该字段仅在 type_id 代表迭代测试时有效 |
| `release_id` | string |  | 关联发布 id。该字段仅在 type_id 代表发布测试时有效 |

**请求示例**

```json
{
  "library_id": "5eb623f6a70571487ea47000",
  "name": "测试计划",
  "type_id": "641d0ab2b998f883f9c67b2f",
  "project_id": "5eb623f6a70571487ea41919",
  "release_id": "641d0ab2b998f883f9c67b2c",
  "start_at": {
    "date": 1589791860,
    "with_time": 1
  },
  "end_at": {
    "date": 1589791870,
    "with_time": 1
  },
  "assignee_id": "a0417f68e846aae315c85d24643678a9"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 计划的 id |
| `url` | string | 是 | 计划的资源地址 |
| `short_id` | string | 是 | 计划的短 id |
| `html_url` | string | 是 | 计划的 html 地址 |
| `library` | object | 是 | 计划所属的测试库 |
| `library.id` | string |  |  |
| `library.url` | string |  |  |
| `library.identifier` | string |  |  |
| `library.name` | string |  |  |
| `library.is_archived` | number |  |  |
| `library.is_deleted` | number |  |  |
| `name` | string | 是 | 计划的名称 |
| `state` | object | 是 | 计划的状态 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `assignee` | object | 是 | 计划的负责人 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `start_at` | object | 是 | 计划的开始时间 |
| `start_at.date` | number |  |  |
| `start_at.with_time` | number |  |  |
| `end_at` | object | 是 | 计划的结束时间 |
| `end_at.date` | number |  |  |
| `end_at.with_time` | number |  |  |
| `type` | object | 是 | 计划关联的类型 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `project` | object | 是 | 计划关联的项目 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `sprint` | object | 是 | 计划关联的迭代 |
| `release` | object | 是 | 计划关联的发布 |
| `release.id` | string |  |  |
| `release.url` | string |  |  |
| `release.name` | string |  |  |
| `release.start` | object |  |  |
| `release.start.date` | number |  |  |
| `release.start.with_time` | number |  |  |
| `release.published_at` | object |  |  |
| `release.published_at.date` | number |  |  |
| `release.published_at.with_time` | number |  |  |
| `release.stage` | object |  |  |
| `release.stage.id` | string |  |  |
| `release.stage.url` | string |  |  |
| `release.stage.name` | string |  |  |
| `release.stage.type` | string |  |  |
| `release.stage.color` | string |  |  |
| `summary` | string | 是 | 计划测试报告的概要 |
| `created_at` | number | 是 | 计划的创建时间 |
| `created_by` | object | 是 | 计划的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 计划的更新时间 |
| `updated_by` | object | 是 | 计划的更新人 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |

**响应示例**

```json
{
  "id": "5eb6a70571487623fea47000",
  "url": "https://{rest_api_root}/v2/testhub/testplans/5eb6a70571487623fea47000",
  "short_id": "7nNkViOD",
  "html_url": "https://yctech.pingcode.com/testhub/libraries/CSK/plans/7nNkViOD/runs",
  "library": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
    "identifier": "CSK",
    "name": "测试库",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "测试计划",
  "state": {
    "id": "652d0cb2b798f983d9c67c2b",
    "url": "https://{rest_api_root}/v2/testhub/testplan_states/652d0cb2b798f983d9c67c2b",
    "name": "进行中",
    "type": "in_progress"
  },
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "start_at": {
    "date": 1589791860,
    "with_time": 1
  },
  "end_at": {
    "date": 1589791870,
    "with_time": 1
  },
  "type": {
    "id": "641d0ab2b998f883f9c67b2c",
    "url": "https://{rest_api_root}/v2/testhub/testplan_types/641d0ab2b998f883f9c67b2c",
    "name": "发布测试"
  },
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "type": "scrum",
    "is_archived": 0,
    "is_deleted": 0
  },
  "sprint": null,
  "release": {
    "id": "5eb623f6a70571487ea47001",
    "url": "https://{rest_api_root}/v2/pjm/releases/5eb623f6a70571487ea47001",
    "name": "1.0.0",
    "start": {
      "date": 1565255712,
      "with_time": 0
    },
    "published_at": {
      "date": 1565255879,
      "with_time": 0
    },
    "stage": {
      "id": "5f44a8f8bb347b14b49624a1",
      "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a1",
      "name": "未开始",
      "type": "pending",
      "color": "#FA8888"
    }
  },
  "summary": "",
  "created_at": 1565366200,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1565366200,
  "updated_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

<a id="get-v2-testhub-testplans-testplan-id"></a>

### 获取一个计划

`GET /v2/testhub/testplans/{testplan_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:testplan`

用于按 id 或 short_id 获取测试计划全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testplan_id` | string | 是 | 测试计划的 id 或 short_id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的计划。该值默认为`false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 计划的 id |
| `url` | string | 是 | 计划的资源地址 |
| `short_id` | string | 是 | 计划的短 id |
| `html_url` | string | 是 | 计划的 html 地址 |
| `library` | object | 是 | 计划所属的测试库 |
| `library.id` | string |  |  |
| `library.url` | string |  |  |
| `library.identifier` | string |  |  |
| `library.name` | string |  |  |
| `library.is_archived` | number |  |  |
| `library.is_deleted` | number |  |  |
| `name` | string | 是 | 计划的名称 |
| `state` | object | 是 | 计划的状态 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `assignee` | object | 是 | 计划的负责人 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `start_at` | object | 是 | 计划的开始时间 |
| `start_at.date` | number |  |  |
| `start_at.with_time` | number |  |  |
| `end_at` | object | 是 | 计划的结束时间 |
| `end_at.date` | number |  |  |
| `end_at.with_time` | number |  |  |
| `type` | object | 是 | 计划关联的类型 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `project` | object | 是 | 计划关联的项目 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `sprint` | object | 是 | 计划关联的迭代 |
| `release` | object | 是 | 计划关联的发布 |
| `release.id` | string |  |  |
| `release.url` | string |  |  |
| `release.name` | string |  |  |
| `release.start` | object |  |  |
| `release.start.date` | number |  |  |
| `release.start.with_time` | number |  |  |
| `release.published_at` | object |  |  |
| `release.published_at.date` | number |  |  |
| `release.published_at.with_time` | number |  |  |
| `release.stage` | object |  |  |
| `release.stage.id` | string |  |  |
| `release.stage.url` | string |  |  |
| `release.stage.name` | string |  |  |
| `release.stage.type` | string |  |  |
| `release.stage.color` | string |  |  |
| `summary` | string | 是 | 计划测试报告的概要 |
| `created_at` | number | 是 | 计划的创建时间 |
| `created_by` | object | 是 | 计划的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 计划的更新时间 |
| `updated_by` | object | 是 | 计划的更新人 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |

**响应示例**

```json
{
  "id": "5eb6a70571487623fea47000",
  "url": "https://{rest_api_root}/v2/testhub/testplans/5eb6a70571487623fea47000",
  "short_id": "7nNkViOD",
  "html_url": "https://yctech.pingcode.com/testhub/libraries/CSK/plans/7nNkViOD/runs",
  "library": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
    "identifier": "CSK",
    "name": "测试库",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "测试计划",
  "state": {
    "id": "652d0cb2b798f983d9c67c2b",
    "url": "https://{rest_api_root}/v2/testhub/testplan_states/652d0cb2b798f983d9c67c2b",
    "name": "进行中",
    "type": "in_progress"
  },
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "start_at": {
    "date": 1589791860,
    "with_time": 1
  },
  "end_at": {
    "date": 1589791870,
    "with_time": 1
  },
  "type": {
    "id": "641d0ab2b998f883f9c67b2c",
    "url": "https://{rest_api_root}/v2/testhub/testplan_types/641d0ab2b998f883f9c67b2c",
    "name": "发布测试"
  },
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "type": "scrum",
    "is_archived": 0,
    "is_deleted": 0
  },
  "sprint": null,
  "release": {
    "id": "5eb623487ea47001f6a70571",
    "url": "https://{rest_api_root}/v2/pjm/releases/5eb623487ea47001f6a70571",
    "name": "1.0.0",
    "start": {
      "date": 1565255712,
      "with_time": 0
    },
    "published_at": {
      "date": 1565255879,
      "with_time": 0
    },
    "stage": {
      "id": "5f44a8f8bb347b14b49624a1",
      "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a1",
      "name": "未开始",
      "type": "pending",
      "color": "#FA8888"
    }
  },
  "summary": "测试报告的概要",
  "created_at": 1565366200,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1565366200,
  "updated_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

<a id="patch-v2-testhub-testplans-testplan-id"></a>

### 部分更新一个计划

`PATCH /v2/testhub/testplans/{testplan_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:testplan`

用于部分更新一个测试计划。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testplan_id` | string | 是 | 测试计划的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 测试计划的名称。名称在一个测试库里唯一 |
| `type_id` | string |  | 测试计划类型的 id。指定测试计划类型时，建议同时指定对应的 sprint_id 或 release_id |
| `project_id` | string |  | 项目的 id |
| `sprint_id` | string |  | 迭代的 id。该字段仅在测试计划类型为迭代测试时有效 |
| `release_id` | string |  | 发布的 id。该字段仅在测试计划类型为发布测试时有效 |
| `start_at` | object |  | 测试计划的开始时间 |
| `start_at.date` | number |  |  |
| `start_at.with_time` | number |  |  |
| `end_at` | object |  | 测试计划的结束时间 |
| `end_at.date` | number |  |  |
| `end_at.with_time` | number |  |  |
| `assignee_id` | string |  | 测试计划负责人的 id |
| `state_id` | string |  | 测试计划状态的 id |
| `summary` | string |  | 测试报告的概要信息 |

**请求示例**

```json
{
  "name": "测试计划",
  "type_id": "641d0ab2b998f883f9c67b2c",
  "project_id": "5eb623f6a70571487ea41919",
  "release_id": "5eb623487ea47001f6a70571",
  "start_at": {
    "date": 1589791860,
    "with_time": 1
  },
  "end_at": {
    "date": 1589791870,
    "with_time": 1
  },
  "assignee_id": "a0417f68e846aae315c85d24643678a9",
  "state_id": "652d0cb2b798f983d9c67c2b",
  "summary": "测试报告的概要"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 计划的 id |
| `url` | string | 是 | 计划的资源地址 |
| `short_id` | string | 是 | 计划的短 id |
| `html_url` | string | 是 | 计划的 html 地址 |
| `library` | object | 是 | 计划所属的测试库 |
| `library.id` | string |  |  |
| `library.url` | string |  |  |
| `library.identifier` | string |  |  |
| `library.name` | string |  |  |
| `library.is_archived` | number |  |  |
| `library.is_deleted` | number |  |  |
| `name` | string | 是 | 计划的名称 |
| `state` | object | 是 | 计划的状态 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `assignee` | object | 是 | 计划的负责人 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `start_at` | object | 是 | 计划的开始时间 |
| `start_at.date` | number |  |  |
| `start_at.with_time` | number |  |  |
| `end_at` | object | 是 | 计划的结束时间 |
| `end_at.date` | number |  |  |
| `end_at.with_time` | number |  |  |
| `type` | object | 是 | 计划关联的类型 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `project` | object | 是 | 计划关联的项目 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `sprint` | object | 是 | 计划关联的迭代 |
| `release` | object | 是 | 计划关联的发布 |
| `release.id` | string |  |  |
| `release.url` | string |  |  |
| `release.name` | string |  |  |
| `release.start` | object |  |  |
| `release.start.date` | number |  |  |
| `release.start.with_time` | number |  |  |
| `release.published_at` | object |  |  |
| `release.published_at.date` | number |  |  |
| `release.published_at.with_time` | number |  |  |
| `release.stage` | object |  |  |
| `release.stage.id` | string |  |  |
| `release.stage.url` | string |  |  |
| `release.stage.name` | string |  |  |
| `release.stage.type` | string |  |  |
| `release.stage.color` | string |  |  |
| `summary` | string | 是 | 计划测试报告的概要 |
| `created_at` | number | 是 | 计划的创建时间 |
| `created_by` | object | 是 | 计划的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 计划的更新时间 |
| `updated_by` | object | 是 | 计划的更新人 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |

**响应示例**

```json
{
  "id": "5eb6a70571487623fea47000",
  "url": "https://{rest_api_root}/v2/testhub/testplans/5eb6a70571487623fea47000",
  "short_id": "7nNkViOD",
  "html_url": "https://yctech.pingcode.com/testhub/libraries/CSK/plans/7nNkViOD/runs",
  "library": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
    "identifier": "CSK",
    "name": "测试库",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "测试计划",
  "state": {
    "id": "652d0cb2b798f983d9c67c2b",
    "url": "https://{rest_api_root}/v2/testhub/testplan_states/652d0cb2b798f983d9c67c2b",
    "name": "进行中",
    "type": "in_progress"
  },
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "start_at": {
    "date": 1589791860,
    "with_time": 1
  },
  "end_at": {
    "date": 1589791870,
    "with_time": 1
  },
  "type": {
    "id": "641d0ab2b998f883f9c67b2c",
    "url": "https://{rest_api_root}/v2/testhub/testplan_types/641d0ab2b998f883f9c67b2c",
    "name": "发布测试"
  },
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "type": "scrum",
    "is_archived": 0,
    "is_deleted": 0
  },
  "sprint": null,
  "release": {
    "id": "5eb623487ea47001f6a70571",
    "url": "https://{rest_api_root}/v2/pjm/releases/5eb623487ea47001f6a70571",
    "name": "1.0.0",
    "start": {
      "date": 1565255712,
      "with_time": 0
    },
    "published_at": {
      "date": 1565255879,
      "with_time": 0
    },
    "stage": {
      "id": "5f44a8f8bb347b14b49624a1",
      "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a1",
      "name": "未开始",
      "type": "pending",
      "color": "#FA8888"
    }
  },
  "summary": "测试报告的概要",
  "created_at": 1565366200,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1565366200,
  "updated_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

<a id="get-v2-testhub-testplans"></a>

### 获取计划列表

`GET /v2/testhub/testplans` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:testplan`

用于分页获取测试计划列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |
| `name` | string |  | 计划名称 |
| `created_between` | string |  | 创建时间介于的时间范围，通过','分割起始时间 |
| `updated_between` | string |  | 更新时间介于的时间范围，通过','分割起始时间 |
| `include_deleted` | boolean |  | 是否包含已删除的测试计划。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 计划全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].short_id` | string |  |  |
| `values[].html_url` | string |  |  |
| `values[].library` | object |  |  |
| `values[].library.id` | string |  |  |
| `values[].library.url` | string |  |  |
| `values[].library.identifier` | string |  |  |
| `values[].library.name` | string |  |  |
| `values[].library.is_archived` | number |  |  |
| `values[].library.is_deleted` | number |  |  |
| `values[].name` | string |  |  |
| `values[].state` | object |  |  |
| `values[].state.id` | string |  |  |
| `values[].state.url` | string |  |  |
| `values[].state.name` | string |  |  |
| `values[].state.type` | string |  |  |
| `values[].assignee` | object |  |  |
| `values[].assignee.id` | string |  |  |
| `values[].assignee.url` | string |  |  |
| `values[].assignee.name` | string |  |  |
| `values[].assignee.display_name` | string |  |  |
| `values[].assignee.avatar` | string |  |  |
| `values[].start_at` | object |  |  |
| `values[].start_at.date` | number |  |  |
| `values[].start_at.with_time` | number |  |  |
| `values[].end_at` | object |  |  |
| `values[].end_at.date` | number |  |  |
| `values[].end_at.with_time` | number |  |  |
| `values[].type` | object |  |  |
| `values[].type.id` | string |  |  |
| `values[].type.url` | string |  |  |
| `values[].type.name` | string |  |  |
| `values[].project` | object |  |  |
| `values[].project.id` | string |  |  |
| `values[].project.url` | string |  |  |
| `values[].project.identifier` | string |  |  |
| `values[].project.name` | string |  |  |
| `values[].project.type` | string |  |  |
| `values[].project.is_archived` | number |  |  |
| `values[].project.is_deleted` | number |  |  |
| `values[].sprint` | null |  |  |
| `values[].release` | object |  |  |
| `values[].release.id` | string |  |  |
| `values[].release.url` | string |  |  |
| `values[].release.name` | string |  |  |
| `values[].release.start` | object |  |  |
| `values[].release.start.date` | number |  |  |
| `values[].release.start.with_time` | number |  |  |
| `values[].release.published_at` | object |  |  |
| `values[].release.published_at.date` | number |  |  |
| `values[].release.published_at.with_time` | number |  |  |
| `values[].release.stage` | object |  |  |
| `values[].release.stage.id` | string |  |  |
| `values[].release.stage.url` | string |  |  |
| `values[].release.stage.name` | string |  |  |
| `values[].release.stage.type` | string |  |  |
| `values[].release.stage.color` | string |  |  |
| `values[].summary` | string |  |  |
| `values[].created_at` | number |  |  |
| `values[].created_by` | object |  |  |
| `values[].created_by.id` | string |  |  |
| `values[].created_by.url` | string |  |  |
| `values[].created_by.name` | string |  |  |
| `values[].created_by.display_name` | string |  |  |
| `values[].created_by.avatar` | string |  |  |
| `values[].updated_at` | number |  |  |
| `values[].updated_by` | object |  |  |
| `values[].updated_by.id` | string |  |  |
| `values[].updated_by.url` | string |  |  |
| `values[].updated_by.name` | string |  |  |
| `values[].updated_by.display_name` | string |  |  |
| `values[].updated_by.avatar` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5eb6a70571487623fea47000",
      "url": "https://{rest_api_root}/v2/testhub/testplans/5eb6a70571487623fea47000",
      "short_id": "7nNkViOD",
      "html_url": "https://yctech.pingcode.com/testhub/libraries/CSK/plans/7nNkViOD/runs",
      "library": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
        "identifier": "CSK",
        "name": "测试库",
        "is_archived": 0,
        "is_deleted": 0
      },
      "name": "测试计划",
      "state": {
        "id": "652d0cb2b798f983d9c67c2b",
        "url": "https://{rest_api_root}/v2/testhub/testplan_states/652d0cb2b798f983d9c67c2b",
        "name": "进行中",
        "type": "in_progress"
      },
      "assignee": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "start_at": {
        "date": 1589791860,
        "with_time": 1
      },
      "end_at": {
        "date": 1589791870,
        "with_time": 1
      },
      "type": {
        "id": "641d0ab2b998f883f9c67b2c",
        "url": "https://{rest_api_root}/v2/testhub/testplan_types/641d0ab2b998f883f9c67b2c",
        "name": "发布测试"
      },
      "project": {
        "id": "5eb623f6a70571487ea41919",
        "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
        "identifier": "SCR",
        "name": "Scrum 项目",
        "type": "scrum",
        "is_archived": 0,
        "is_deleted": 0
      },
      "sprint": null,
      "release": {
        "id": "5eb623487ea47001f6a70571",
        "url": "https://{rest_api_root}/v2/pjm/releases/5eb623487ea47001f6a70571",
        "name": "1.0.0",
        "start": {
          "date": 1565255712,
          "with_time": 0
        },
        "published_at": {
          "date": 1565255879,
          "with_time": 0
        },
        "stage": {
          "id": "5f44a8f8bb347b14b49624a1",
          "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a1",
          "name": "未开始",
          "type": "pending",
          "color": "#FA8888"
        }
      },
      "summary": "测试报告的概要",
      "created_at": 1565366200,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "updated_at": 1565366200,
      "updated_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      }
    }
  ]
}
```

<a id="get-v2-testhub-testplan-types-testplan-type-id"></a>

### 获取一个计划类型

`GET /v2/testhub/testplan_types/{testplan_type_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:testplan`

用于按 id 获取计划类型全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testplan_type_id` | string | 是 | 计划类型的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 计划类型的 id |
| `url` | string | 是 | 计划类型的资源地址 |
| `library` | object | 是 | 所属测试库的引用结构数据 |
| `library.id` | string |  |  |
| `library.url` | string |  |  |
| `library.identifier` | string |  |  |
| `library.name` | string |  |  |
| `library.is_archived` | number |  |  |
| `library.is_deleted` | number |  |  |
| `name` | string | 是 | 计划类型的名称 |

**响应示例**

```json
{
  "id": "642f765b6950bc66cfa82f05",
  "url": "https://{rest_api_root}/v2/testhub/testplan_types/642f765b6950bc66cfa82f05",
  "library": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
    "identifier": "CSK",
    "name": "测试库",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "普通测试"
}
```

<a id="get-v2-testhub-testplan-types"></a>

### 获取计划类型列表

`GET /v2/testhub/testplan_types` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:testplan`

用于分页获取计划类型列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 计划类型全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].library` | object |  |  |
| `values[].library.id` | string |  |  |
| `values[].library.url` | string |  |  |
| `values[].library.identifier` | string |  |  |
| `values[].library.name` | string |  |  |
| `values[].library.is_archived` | number |  |  |
| `values[].library.is_deleted` | number |  |  |
| `values[].name` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "642f765b6950bc66cfa82f05",
      "url": "https://{rest_api_root}/v2/testhub/testplan_types/642f765b6950bc66cfa82f05",
      "library": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
        "identifier": "CSK",
        "name": "测试库",
        "is_archived": 0,
        "is_deleted": 0
      },
      "name": "普通测试"
    }
  ]
}
```

<a id="post-v2-testhub-testruns"></a>

### 创建一个执行用例

`POST /v2/testhub/testruns` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:testplan`

用于创建一个执行用例。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |
| `testplan_id` | string | 是 | 测试计划的 id |
| `testcase_id` | string | 是 | 测试用例的 id |
| `executor_id` | string |  | 执行人的 id |

**响应**

源文档未提供响应结构。

<a id="get-v2-testhub-testruns-testrun-id"></a>

### 获取一个执行用例

`GET /v2/testhub/testruns/{testrun_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:testplan`

用于按 id 或 short_id 获取执行用例全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testrun_id` | string | 是 | 执行用例的 id 或 short_id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的执行用例。该值默认为`false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string |  |  |
| `url` | string |  |  |
| `short_id` | string |  |  |
| `html_url` | string |  |  |
| `status` | string |  |  |
| `library` | object |  |  |
| `library.id` | string |  |  |
| `library.url` | string |  |  |
| `library.identifier` | string |  |  |
| `library.name` | string |  |  |
| `library.is_archived` | number |  |  |
| `library.is_deleted` | number |  |  |
| `testplan` | object |  |  |
| `testplan.id` | string |  |  |
| `testplan.url` | string |  |  |
| `testplan.short_id` | string |  |  |
| `testplan.html_url` | string |  |  |
| `testplan.name` | string |  |  |
| `testplan.status` | string |  |  |
| `testplan.start_at` | object |  |  |
| `testplan.start_at.date` | number |  |  |
| `testplan.start_at.with_time` | number |  |  |
| `testplan.end_at` | object |  |  |
| `testplan.end_at.date` | number |  |  |
| `testplan.end_at.with_time` | number |  |  |
| `testcase` | object |  |  |
| `testcase.id` | string |  |  |
| `testcase.url` | string |  |  |
| `testcase.short_id` | string |  |  |
| `testcase.html_url` | string |  |  |
| `testcase.whole_identifier` | string |  |  |
| `testcase.title` | string |  |  |
| `testcase.test_type` | string |  |  |
| `latest_executed_status` | object |  |  |
| `latest_executed_status.id` | string |  |  |
| `latest_executed_status.url` | string |  |  |
| `latest_executed_status.name` | string |  |  |
| `is_archived` | number |  |  |
| `is_deleted` | number |  |  |

**响应示例**

```json
{
  "id": "547000eb6a70571487623fea",
  "url": "https://{rest_api_root}/v2/testhub/testruns/547000eb6a70571487623fea",
  "short_id": "Aq1u38yX",
  "html_url": "https://yctech.pingcode.com/testhub/runs/Aq1u38yX",
  "status": "not_start",
  "library": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
    "identifier": "CSK",
    "name": "测试库",
    "is_archived": 0,
    "is_deleted": 0
  },
  "testplan": {
    "id": "5eb6a70571487623fea47000",
    "url": "https://{rest_api_root}/v2/testhub/testplans/5eb6a70571487623fea47000",
    "short_id": "7nNkViOD",
    "html_url": "https://yctech.pingcode.com/testhub/libraries/CSK/plans/7nNkViOD/runs",
    "name": "测试计划",
    "status": "in_progress",
    "start_at": {
      "date": 1589791860,
      "with_time": 1
    },
    "end_at": {
      "date": 1589791870,
      "with_time": 1
    }
  },
  "testcase": {
    "id": "5edca524cad2fa112b06305c",
    "url": "https://{rest_api_root}/v2/testhub/testcases/5edca524cad2fa112b06305c",
    "short_id": "fdUw3C",
    "html_url": "https://yctech.pingcode.com/testhub/cases/fdUw3C",
    "whole_identifier": "CSK-10",
    "title": "这是一个测试用例",
    "test_type": "automation"
  },
  "latest_executed_status": {
    "id": "68d117800d5dd2484a198265",
    "url": "https://{rest_api_root}/v2/testhub/testrun_statuses/68d117800d5dd2484a198265",
    "name": "未测"
  },
  "is_archived": 0,
  "is_deleted": 0
}
```

<a id="put-v2-testhub-testruns-testrun-id"></a>

### 全量更新一个执行用例

`PUT /v2/testhub/testruns/{testrun_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:testplan`

用于全量更新执行用例的执行结果与步骤。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testrun_id` | string | 是 | 执行用例的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `status_id` | string | 是 | 执行用例执行结果的 id |
| `remark` | string |  | 执行用例执行结果的备注 |
| `steps` | object[] | 是 | 执行用例步骤的列表 |
| `executor_id` | string |  | 执行人的 id。不传默认执行人为空 |

**响应**

源文档未提供响应结构。

<a id="patch-v2-testhub-testruns-testrun-id"></a>

### 部分更新一个执行用例

`PATCH /v2/testhub/testruns/{testrun_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:testplan`

用于部分更新执行用例的执行结果与步骤。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testrun_id` | string | 是 | 执行用例的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `status_id` | string | 是 | 执行用例执行结果的 id |
| `remark` | string |  | 执行用例执行结果的备注 |
| `steps` | object[] |  | 执行用例步骤的列表 |
| `executor_id` | string |  | 执行人的 id |

**响应**

源文档未提供响应结构。

<a id="post-v2-testhub-testruns-bulk-create"></a>

### 批量创建执行用例

`POST /v2/testhub/testruns/bulk/create` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:testplan`

用于批量创建执行用例，单次最多支持 100 条。接口支持部分成功，单条失败不会影响其他条目，已成功的数据不会回滚。响应按请求条目顺序返回对应结果，通过 `state`（`success` / `failure`）判断操作结果，失败时通过 `message` 返回失败原因。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testruns` | object | 是 | 创建单个执行用例必要参数的数组。数组长度不超过 100 |
| `testruns.library_id` | string | 是 | 执行用例所属测试库的 id |
| `testruns.testplan_id` | string | 是 | 执行用例所属测试计划的 id |
| `testruns.testcase_id` | string | 是 | 测试用例的 id |
| `testruns.executor_id` | string |  | 执行人的 id |

**请求示例**

```json
{
  "testruns": [
    {
      "library_id": "5eb623f6a70571487ea47000",
      "testplan_id": "5eb6a70571487623fea47000",
      "testcase_id": "5edca524cad2fa112b06305c",
      "executor_id": "a0417f68e846aae315c85d24643678a9"
    }
  ]
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```json
[
  {
    "state": "success",
    "testrun": {
      "id": "547000eb6a70571487623fea",
      "url": "https://{rest_api_root}/v2/testhub/testruns/547000eb6a70571487623fea",
      "short_id": "Aq1u38yX",
      "html_url": "https://yctech.pingcode.com/testhub/runs/Aq1u38yX",
      "status": "not_start",
      "library": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
        "identifier": "CSK",
        "name": "测试库",
        "is_archived": 0,
        "is_deleted": 0
      },
      "testplan": {
        "id": "5eb6a70571487623fea47000",
        "url": "https://{rest_api_root}/v2/testhub/testplans/5eb6a70571487623fea47000",
        "short_id": "7nNkViOD",
        "html_url": "https://yctech.pingcode.com/testhub/libraries/CSK/plans/7nNkViOD/runs",
        "name": "测试计划",
        "status": "in_progress",
        "start_at": {
          "date": 1589791860,
          "with_time": 1
        },
        "end_at": {
          "date": 1589791870,
          "with_time": 1
        }
      },
      "testcase": {
        "id": "5edca524cad2fa112b06305c",
        "url": "https://{rest_api_root}/v2/testhub/testcases/5edca524cad2fa112b06305c",
        "short_id": "fdUw3C",
        "html_url": "https://yctech.pingcode.com/testhub/cases/fdUw3C",
        "whole_identifier": "CSK-10",
        "title": "这是一个测试用例",
        "test_type": "automation"
      },
      "latest_executed_status": {
        "id": "68d117800d5dd2484a198265",
        "url": "https://{rest_api_root}/v2/testhub/testrun_statuses/68d117800d5dd2484a198265",
        "name": "未测"
      },
      "is_archived": 0,
      "is_deleted": 0
    }
  },
  {
    "state": "failure",
    "message": "测试用例不存在"
  }
]
```

<a id="post-v2-testhub-testruns-bulk-update"></a>

### 批量部分更新执行用例

`POST /v2/testhub/testruns/bulk/update` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:testplan`

用于批量部分更新执行用例，单次最多支持 100 条。接口支持部分成功，单条失败不会影响其他条目，已成功的数据不会回滚。响应按请求条目顺序返回对应结果，通过 `state`（`success` / `failure`）判断操作结果，失败时通过 `message` 返回失败原因。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testruns` | object | 是 | 部分更新单个执行用例必要参数的数组。数组长度不超过 100 |
| `testruns.id` | string | 是 | 执行用例的 id（与 testrun_id 等价） |
| `testruns.testrun_id` | string |  | 执行用例的 id |
| `testruns.status_id` | string |  | 执行用例执行结果的 id |
| `testruns.remark` | string |  | 执行用例执行结果的备注 |
| `testruns.steps` | object[] |  | 执行用例的步骤列表 |
| `testruns.executor_id` | string |  | 执行人的 id |

**请求示例**

```json
{
  "testruns": [
    {
      "id": "547000eb6a70571487623fea",
      "status_id": "68d117800d5dd2484a198265",
      "executor_id": "a0417f68e846aae315c85d24643678a9"
    }
  ]
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```json
[
  {
    "state": "success",
    "testrun": {
      "id": "547000eb6a70571487623fea",
      "url": "https://{rest_api_root}/v2/testhub/testruns/547000eb6a70571487623fea",
      "short_id": "Aq1u38yX",
      "html_url": "https://yctech.pingcode.com/testhub/runs/Aq1u38yX",
      "status": "not_start",
      "library": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
        "identifier": "CSK",
        "name": "测试库",
        "is_archived": 0,
        "is_deleted": 0
      },
      "testplan": {
        "id": "5eb6a70571487623fea47000",
        "url": "https://{rest_api_root}/v2/testhub/testplans/5eb6a70571487623fea47000",
        "short_id": "7nNkViOD",
        "html_url": "https://yctech.pingcode.com/testhub/libraries/CSK/plans/7nNkViOD/runs",
        "name": "测试计划",
        "status": "in_progress",
        "start_at": {
          "date": 1589791860,
          "with_time": 1
        },
        "end_at": {
          "date": 1589791870,
          "with_time": 1
        }
      },
      "testcase": {
        "id": "5edca524cad2fa112b06305c",
        "url": "https://{rest_api_root}/v2/testhub/testcases/5edca524cad2fa112b06305c",
        "short_id": "fdUw3C",
        "html_url": "https://yctech.pingcode.com/testhub/cases/fdUw3C",
        "whole_identifier": "CSK-10",
        "title": "这是一个测试用例",
        "test_type": "automation"
      },
      "latest_executed_status": {
        "id": "68d117800d5dd2484a198265",
        "url": "https://{rest_api_root}/v2/testhub/testrun_statuses/68d117800d5dd2484a198265",
        "name": "未测"
      },
      "is_archived": 0,
      "is_deleted": 0
    }
  },
  {
    "state": "failure",
    "message": "执行用例不存在"
  }
]
```

<a id="post-v2-testhub-testruns-bulk-delete"></a>

### 批量删除执行用例

`POST /v2/testhub/testruns/bulk/delete` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:testplan`

用于批量删除执行用例，单次最多支持 100 条。接口支持部分成功，单条失败不会影响其他条目，已成功的数据不会回滚。响应按请求条目顺序返回对应结果，通过 `state`（`success` / `failure`）判断操作结果，失败时通过 `message` 返回失败原因。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ids` | string[] | 是 | 需要删除的执行用例 id 列表。数组长度不超过 100 |

**请求示例**

```json
{
  "ids": [
    "547000eb6a70571487623fea"
  ]
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```json
[
  {
    "state": "success",
    "id": "547000eb6a70571487623fea"
  },
  {
    "state": "failure",
    "message": "执行用例不存在"
  }
]
```

<a id="get-v2-testhub-testruns"></a>

### 获取执行用例列表

`GET /v2/testhub/testruns` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:testplan`

用于分页获取执行用例列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testplan_id` | string |  | 测试计划的 id |
| `testcase_id` | string |  | 测试用例的 id |
| `status_id` | string |  | 执行结果的 id |
| `suite_id` | string |  | 模块的 id |
| `keywords` | string |  | 关键字。支持用例编号和用例标题 |

**响应**

源文档未提供响应结构。

<a id="post-v2-testhub-testruns-search"></a>

### 搜索执行用例列表

`POST /v2/testhub/testruns/search` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:testplan`

用于按类 MongoDB 结构化条件搜索执行用例。  
 默认不含已删除/已归档项。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `mode` | string | 是 | 搜索模式。`query` 表示基于 `payload.filter` 的结构化条件查询；枚举："query" |
| `payload` | object | 是 | 搜索参数 |

**响应**

源文档未提供响应结构。

<a id="get-v2-testhub-testrun-statuses"></a>

### 获取可用的执行用例执行结果列表

`GET /v2/testhub/testrun/statuses` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于分页获取测试库中的执行用例执行结果。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `library_id` | string | 是 | 测试库的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 执行用例执行结果全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |

**响应示例**

```json
{
  "page_index": 0,
  "page_size": 30,
  "total": 5,
  "values": [
    {
      "id": "68d117800d5dd2484a198261",
      "url": "https://{rest_api_root}/v2/testhub/testrun_statuses/68d117800d5dd2484a198261",
      "name": "通过"
    },
    {
      "id": "68d117800d5dd2484a198262",
      "url": "https://{rest_api_root}/v2/testhub/testrun_statuses/68d117800d5dd2484a198262",
      "name": "受阻"
    },
    {
      "id": "68d117800d5dd2484a198263",
      "url": "https://{rest_api_root}/v2/testhub/testrun_statuses/68d117800d5dd2484a198263",
      "name": "失败"
    },
    {
      "id": "68d117800d5dd2484a198264",
      "url": "https://{rest_api_root}/v2/testhub/testrun_statuses/68d117800d5dd2484a198264",
      "name": "跳过"
    },
    {
      "id": "68d117800d5dd2484a198265",
      "url": "https://{rest_api_root}/v2/testhub/testrun_statuses/68d117800d5dd2484a198265",
      "name": "未测"
    }
  ]
}
```

<a id="get-v2-testhub-testruns-testrun-id-histories-history-id"></a>

### 获取一条执行用例结果记录

`GET /v2/testhub/testruns/{testrun_id}/histories/{history_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:testplan`

用于按 id 获取一条执行用例结果记录全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testrun_id` | string | 是 | 执行用例的 id |
| `history_id` | string | 是 | 执行用例结果记录的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 执行用例结果记录的 id |
| `url` | string | 是 | 执行用例结果记录的资源地址 |
| `testrun` | object | 是 | 执行用例的引用结构数据 |
| `testrun.id` | string |  |  |
| `testrun.url` | string |  |  |
| `testrun.short_id` | string |  |  |
| `testrun.html_url` | string |  |  |
| `testrun.status` | string |  |  |
| `library` | object | 是 | 所属测试库的引用结构数据 |
| `library.id` | string |  |  |
| `library.url` | string |  |  |
| `library.identifier` | string |  |  |
| `library.name` | string |  |  |
| `library.is_archived` | number |  |  |
| `library.is_deleted` | number |  |  |
| `testplan` | object | 是 | 所属测试计划的引用结构数据 |
| `testplan.id` | string |  |  |
| `testplan.url` | string |  |  |
| `testplan.short_id` | string |  |  |
| `testplan.html_url` | string |  |  |
| `testplan.name` | string |  |  |
| `testplan.status` | string |  |  |
| `testplan.start_at` | object |  |  |
| `testplan.start_at.date` | number |  |  |
| `testplan.start_at.with_time` | number |  |  |
| `testplan.end_at` | object |  |  |
| `testplan.end_at.date` | number |  |  |
| `testplan.end_at.with_time` | number |  |  |
| `testcase` | object | 是 | 关联测试用例的引用结构数据 |
| `testcase.id` | string |  |  |
| `testcase.url` | string |  |  |
| `testcase.short_id` | string |  |  |
| `testcase.html_url` | string |  |  |
| `testcase.whole_identifier` | string |  |  |
| `testcase.title` | string |  |  |
| `testcase.test_type` | string |  |  |
| `testcase.properties` | object |  |  |
| `testcase.properties.prop_a` | string |  |  |
| `testcase.properties.prop_b` | string |  |  |
| `executed_status` | object | 是 | 执行结果的引用结构数据 |
| `executed_status.id` | string |  |  |
| `executed_status.url` | string |  |  |
| `executed_status.name` | string |  |  |
| `remark` | string | 是 | 执行用例执行结果的备注 |
| `executed_at` | number | 是 | 执行时间，单位为秒 |
| `executed_by` | object | 是 | 执行人的引用结构数据 |
| `executed_by.id` | string |  |  |
| `executed_by.url` | string |  |  |
| `executed_by.name` | string |  |  |
| `executed_by.display_name` | string |  |  |
| `executed_by.avatar` | string |  |  |
| `steps` | object[] | 是 | 执行用例步骤列表 |
| `steps[].step_id` | string |  |  |
| `steps[].status` | string |  |  |
| `steps[].actual_value` | null |  |  |

**响应示例**

```json
{
  "id": "65115f0939286e26e05a66db",
  "url": "https://{rest_api_root}/v2/testhub/testruns/547000eb6a70571487623fea/histories/65115f0939286e26e05a66db",
  "testrun": {
    "id": "547000eb6a70571487623fea",
    "url": "https://{rest_api_root}/v2/testhub/testruns/547000eb6a70571487623fea",
    "short_id": "Aq1u38yX",
    "html_url": "https://yctech.pingcode.com/testhub/runs/Aq1u38yX",
    "status": "pass"
  },
  "library": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
    "identifier": "CSK",
    "name": "测试库",
    "is_archived": 0,
    "is_deleted": 0
  },
  "testplan": {
    "id": "5eb6a70571487623fea47000",
    "url": "https://{rest_api_root}/v2/testhub/testplans/5eb6a70571487623fea47000",
    "short_id": "7nNkViOD",
    "html_url": "https://yctech.pingcode.com/testhub/libraries/CSK/plans/7nNkViOD/runs",
    "name": "测试计划",
    "status": "in_progress",
    "start_at": {
      "date": 1589791860,
      "with_time": 1
    },
    "end_at": {
      "date": 1589791870,
      "with_time": 1
    }
  },
  "testcase": {
    "id": "5edca524cad2fa112b06305c",
    "url": "https://{rest_api_root}/v2/testhub/testcases/5edca524cad2fa112b06305c",
    "short_id": "fdUw3C",
    "html_url": "https://yctech.pingcode.com/testhub/cases/fdUw3C",
    "whole_identifier": "CSK-10",
    "title": "这是一个测试用例",
    "test_type": "automation",
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  },
  "executed_status": {
    "id": "68d117800d5dd2484a198261",
    "url": "https://{rest_api_root}/v2/testhub/testrun_statuses/68d117800d5dd2484a198261",
    "name": "通过"
  },
  "remark": "执行用例执行结果的备注",
  "executed_at": 1583290300,
  "executed_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "steps": [
    {
      "step_id": "524cad5edb06305cca2fa112",
      "status": "pass",
      "actual_value": null
    }
  ]
}
```

<a id="get-v2-testhub-testruns-testrun-id-histories"></a>

### 获取执行用例结果记录列表

`GET /v2/testhub/testruns/{testrun_id}/histories` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:testplan`

用于分页获取执行用例的结果记录。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testrun_id` | string | 是 | 执行用例的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 执行用例结果记录全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].testrun` | object |  |  |
| `values[].testrun.id` | string |  |  |
| `values[].testrun.url` | string |  |  |
| `values[].testrun.short_id` | string |  |  |
| `values[].testrun.html_url` | string |  |  |
| `values[].testrun.status` | string |  |  |
| `values[].library` | object |  |  |
| `values[].library.id` | string |  |  |
| `values[].library.url` | string |  |  |
| `values[].library.identifier` | string |  |  |
| `values[].library.name` | string |  |  |
| `values[].library.is_archived` | number |  |  |
| `values[].library.is_deleted` | number |  |  |
| `values[].testplan` | object |  |  |
| `values[].testplan.id` | string |  |  |
| `values[].testplan.url` | string |  |  |
| `values[].testplan.short_id` | string |  |  |
| `values[].testplan.html_url` | string |  |  |
| `values[].testplan.name` | string |  |  |
| `values[].testplan.status` | string |  |  |
| `values[].testplan.start_at` | object |  |  |
| `values[].testplan.start_at.date` | number |  |  |
| `values[].testplan.start_at.with_time` | number |  |  |
| `values[].testplan.end_at` | object |  |  |
| `values[].testplan.end_at.date` | number |  |  |
| `values[].testplan.end_at.with_time` | number |  |  |
| `values[].testcase` | object |  |  |
| `values[].testcase.id` | string |  |  |
| `values[].testcase.url` | string |  |  |
| `values[].testcase.short_id` | string |  |  |
| `values[].testcase.html_url` | string |  |  |
| `values[].testcase.whole_identifier` | string |  |  |
| `values[].testcase.title` | string |  |  |
| `values[].testcase.test_type` | string |  |  |
| `values[].testcase.properties` | object |  |  |
| `values[].testcase.properties.prop_a` | string |  |  |
| `values[].testcase.properties.prop_b` | string |  |  |
| `values[].executed_status` | object |  |  |
| `values[].executed_status.id` | string |  |  |
| `values[].executed_status.url` | string |  |  |
| `values[].executed_status.name` | string |  |  |
| `values[].remark` | string |  |  |
| `values[].executed_at` | number |  |  |
| `values[].executed_by` | object |  |  |
| `values[].executed_by.id` | string |  |  |
| `values[].executed_by.url` | string |  |  |
| `values[].executed_by.name` | string |  |  |
| `values[].executed_by.display_name` | string |  |  |
| `values[].executed_by.avatar` | string |  |  |
| `values[].steps` | object[] |  |  |
| `values[].steps[].step_id` | string |  |  |
| `values[].steps[].status` | string |  |  |
| `values[].steps[].actual_value` | null |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "65115f0939286e26e05a66db",
      "url": "https://{rest_api_root}/v2/testhub/testruns/547000eb6a70571487623fea/histories/65115f0939286e26e05a66db",
      "testrun": {
        "id": "547000eb6a70571487623fea",
        "url": "https://{rest_api_root}/v2/testhub/testruns/547000eb6a70571487623fea",
        "short_id": "Aq1u38yX",
        "html_url": "https://yctech.pingcode.com/testhub/runs/Aq1u38yX",
        "status": "pass"
      },
      "library": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
        "identifier": "CSK",
        "name": "测试库",
        "is_archived": 0,
        "is_deleted": 0
      },
      "testplan": {
        "id": "5eb6a70571487623fea47000",
        "url": "https://{rest_api_root}/v2/testhub/testplans/5eb6a70571487623fea47000",
        "short_id": "7nNkViOD",
        "html_url": "https://yctech.pingcode.com/testhub/libraries/CSK/plans/7nNkViOD/runs",
        "name": "测试计划",
        "status": "in_progress",
        "start_at": {
          "date": 1589791860,
          "with_time": 1
        },
        "end_at": {
          "date": 1589791870,
          "with_time": 1
        }
      },
      "testcase": {
        "id": "5edca524cad2fa112b06305c",
        "url": "https://{rest_api_root}/v2/testhub/testcases/5edca524cad2fa112b06305c",
        "short_id": "fdUw3C",
        "html_url": "https://yctech.pingcode.com/testhub/cases/fdUw3C",
        "whole_identifier": "CSK-10",
        "title": "这是一个测试用例",
        "test_type": "automation",
        "properties": {
          "prop_a": "prop_a_value",
          "prop_b": "prop_b_value"
        }
      },
      "executed_status": {
        "id": "68d117800d5dd2484a198261",
        "url": "https://{rest_api_root}/v2/testhub/testrun_statuses/68d117800d5dd2484a198261",
        "name": "通过"
      },
      "remark": "执行用例执行结果的备注",
      "executed_at": 1583290300,
      "executed_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "steps": [
        {
          "step_id": "524cad5edb06305cca2fa112",
          "status": "pass",
          "actual_value": null
        }
      ]
    }
  ]
}
```

## 用例配置

> 分组路径：测试管理 / 测试配置中心 / 用例配置

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `GET` | `/v2/testhub/testcase_types/{testcase_type_id}` | [获取一个用例类型](#get-v2-testhub-testcase-types-testcase-type-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_types` | [获取全部用例类型列表](#get-v2-testhub-testcase-types) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/testhub/testcase_states` | [创建一个用例状态](#post-v2-testhub-testcase-states) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_states/{testcase_state_id}` | [获取一个用例状态](#get-v2-testhub-testcase-states-testcase-state-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/testhub/testcase_states/{testcase_state_id}` | [部分更新一个用例状态](#patch-v2-testhub-testcase-states-testcase-state-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_states` | [获取全部用例状态列表](#get-v2-testhub-testcase-states) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_state_plans/{testcase_state_plan_id}` | [获取一个用例状态方案](#get-v2-testhub-testcase-state-plans-testcase-state-plan-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_state_plans` | [获取用例状态方案列表](#get-v2-testhub-testcase-state-plans) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/testhub/testcase_state_plans/{testcase_state_plan_id}/testcase_states` | [向用例状态方案中添加一个状态](#post-v2-testhub-testcase-state-plans-testcase-state-plan-id-testcase-states) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_state_plans/{testcase_state_plan_id}/testcase_states/{testcase_state_id}` | [获取用例状态方案中的一个状态](#get-v2-testhub-testcase-state-plans-testcase-state-plan-id-testcase-states-testcase-state-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_state_plans/{testcase_state_plan_id}/testcase_states` | [获取用例状态方案中的状态列表](#get-v2-testhub-testcase-state-plans-testcase-state-plan-id-testcase-states) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/testhub/testcase_state_plans/{testcase_state_plan_id}/testcase_states/{testcase_state_id}` | [在用例状态方案中移除一个状态](#delete-v2-testhub-testcase-state-plans-testcase-state-plan-id-testcase-states-testcase-state-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/testhub/testcase_state_plans/{testcase_state_plan_id}/testcase_state_flows` | [向用例状态方案中添加一个状态流转](#post-v2-testhub-testcase-state-plans-testcase-state-plan-id-testcase-state-flows) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_state_plans/{testcase_state_plan_id}/testcase_state_flows/{testcase_state_flow_id}` | [获取用例状态方案中的一个状态流转](#get-v2-testhub-testcase-state-plans-testcase-state-plan-id-testcase-state-flows-testcase-state-flow-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_state_plans/{testcase_state_plan_id}/testcase_state_flows` | [获取用例状态方案中的状态流转列表](#get-v2-testhub-testcase-state-plans-testcase-state-plan-id-testcase-state-flows) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/testhub/testcase_state_plans/{testcase_state_plan_id}/testcase_state_flows/{testcase_state_flow_id}` | [在用例状态方案中移除一个状态流转](#delete-v2-testhub-testcase-state-plans-testcase-state-plan-id-testcase-state-flows-testcase-state-flow-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/testhub/testcase_properties` | [创建一个用例属性](#post-v2-testhub-testcase-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_properties/{testcase_property_id}` | [获取一个用例属性](#get-v2-testhub-testcase-properties-testcase-property-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/testhub/testcase_properties/{testcase_property_id}` | [部分更新一个用例属性](#patch-v2-testhub-testcase-properties-testcase-property-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_properties` | [获取全部用例属性列表](#get-v2-testhub-testcase-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_property_plans/{testcase_property_plan_id}` | [获取一个用例属性方案](#get-v2-testhub-testcase-property-plans-testcase-property-plan-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_property_plans` | [获取用例属性方案列表](#get-v2-testhub-testcase-property-plans) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/testhub/testcase_property_plans/{testcase_property_plan_id}/testcase_properties` | [向用例属性方案中添加一个属性](#post-v2-testhub-testcase-property-plans-testcase-property-plan-id-testcase-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_property_plans/{testcase_property_plan_id}/testcase_properties/{testcase_property_id}` | [获取用例属性方案中的一个属性](#get-v2-testhub-testcase-property-plans-testcase-property-plan-id-testcase-properties-testcase-property-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_property_plans/{testcase_property_plan_id}/testcase_properties` | [获取用例属性方案中的属性列表](#get-v2-testhub-testcase-property-plans-testcase-property-plan-id-testcase-properties) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/testhub/testcase_property_plans/{testcase_property_plan_id}/testcase_properties/{testcase_property_id}` | [在用例属性方案中移除一个属性](#delete-v2-testhub-testcase-property-plans-testcase-property-plan-id-testcase-properties-testcase-property-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_important_levels/{testcase_important_level_id}` | [获取一个用例重要程度](#get-v2-testhub-testcase-important-levels-testcase-important-level-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testcase_important_levels` | [获取全部重要程度列表](#get-v2-testhub-testcase-important-levels) | 企业令牌 / 用户令牌 |

<a id="get-v2-testhub-testcase-types-testcase-type-id"></a>

### 获取一个用例类型

`GET /v2/testhub/testcase_types/{testcase_type_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于按 id 获取用例类型全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_type_id` | string | 是 | 用例类型的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例类型的 id |
| `url` | string | 是 | 用例类型的资源地址 |
| `name` | string | 是 | 用例类型的名称 |

**响应示例**

```json
{
  "id": "5cf189b35de9c20620ad7153",
  "url": "https://{rest_api_root}/v2/testhub/testcase_types/5cf189b35de9c20620ad7153",
  "name": "功能测试"
}
```

<a id="get-v2-testhub-testcase-types"></a>

### 获取全部用例类型列表

`GET /v2/testhub/testcase_types` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于分页获取企业内全部用例类型。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 全部用例类型全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5cf189b35de9c20620ad7153",
      "url": "https://{rest_api_root}/v2/testhub/testcase_types/5cf189b35de9c20620ad7153",
      "name": "功能测试"
    }
  ]
}
```

<a id="post-v2-testhub-testcase-states"></a>

### 创建一个用例状态

`POST /v2/testhub/testcase_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:configuration`

用于创建一个用例状态。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 用例状态的名称，在一个企业中这个名称是唯一的 |
| `type` | string | 是 | 用例状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |

**请求示例**

```json
{
  "name": "待评审",
  "type": "pending"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例状态的 id |
| `url` | string | 是 | 用例状态的资源地址 |
| `name` | string | 是 | 用例状态的名称 |
| `type` | string | 是 | 用例状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |
| `color` | string | 是 | 用例状态的颜色 |

**响应示例**

```json
{
  "id": "686f62038668bbae4f4dd0c4",
  "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c4",
  "name": "待评审",
  "type": "pending",
  "color": "#56ABFB"
}
```

<a id="get-v2-testhub-testcase-states-testcase-state-id"></a>

### 获取一个用例状态

`GET /v2/testhub/testcase_states/{testcase_state_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于按 id 获取用例状态全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_state_id` | string | 是 | 用例状态的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例状态的 id |
| `url` | string | 是 | 用例状态的资源地址 |
| `name` | string | 是 | 用例状态的名称 |
| `type` | string | 是 | 用例状态的类型；枚举："pending" / "completed" / "closed" |
| `color` | string | 是 | 用例状态的颜色 |

**响应示例**

```json
{
  "id": "686f62038668bbae4f4dd0c1",
  "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c1",
  "name": "设计",
  "type": "pending",
  "color": "#56ABFB"
}
```

<a id="patch-v2-testhub-testcase-states-testcase-state-id"></a>

### 部分更新一个用例状态

`PATCH /v2/testhub/testcase_states/{testcase_state_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:configuration`

用于部分更新一个用例状态。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_state_id` | string | 是 | 用例状态的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 用例状态的名称，在一个企业中这个名称是唯一的 |
| `type` | string |  | 用例状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |

**请求示例**

```json
{
  "name": "已评审",
  "type": "completed"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例状态的 id |
| `url` | string | 是 | 用例状态的资源地址 |
| `name` | string | 是 | 用例状态的名称 |
| `type` | string | 是 | 用例状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |
| `color` | string | 是 | 用例状态的颜色 |

**响应示例**

```json
{
  "id": "686f62038668bbae4f4dd0c4",
  "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c4",
  "name": "已评审",
  "type": "completed",
  "color": "#73D897"
}
```

<a id="get-v2-testhub-testcase-states"></a>

### 获取全部用例状态列表

`GET /v2/testhub/testcase_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于分页获取企业内全部用例状态。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `page_size` | number | 是 | 每页条数 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 全部用例状态全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].type` | string |  |  |

**响应示例**

```json
{
  "page_index": 0,
  "page_size": 30,
  "total": 3,
  "values": [
    {
      "id": "686f62038668bbae4f4dd0c1",
      "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c1",
      "name": "设计",
      "type": "pending"
    },
    {
      "id": "686f62038668bbae4f4dd0c2",
      "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c2",
      "name": "就绪",
      "type": "completed"
    },
    {
      "id": "686f62038668bbae4f4dd0c3",
      "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c3",
      "name": "废弃",
      "type": "closed"
    }
  ]
}
```

<a id="get-v2-testhub-testcase-state-plans-testcase-state-plan-id"></a>

### 获取一个用例状态方案

`GET /v2/testhub/testcase_state_plans/{testcase_state_plan_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于按 id 获取用例状态方案全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_state_plan_id` | string | 是 | 用例状态方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例状态方案的 id |
| `url` | string | 是 | 用例状态方案的资源地址 |
| `library` | object | 是 | 测试库的引用结构数据。该方案是此测试库的本地化方案 |
| `library.id` | string |  |  |
| `library.url` | string |  |  |
| `library.identifier` | string |  |  |
| `library.name` | string |  |  |
| `library.is_archived` | number |  |  |
| `library.is_deleted` | number |  |  |

**响应示例 1：响应示例（全局方案）**

```json
{
  "id": "686f62038668bbae4f4dd0d1",
  "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d1",
  "library": null
}
```

**响应示例 2：响应示例（测试库本地化方案）**

```json
{
  "id": "686f62038668bbae4f4dd0d2",
  "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d2",
  "library": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
    "identifier": "CSK",
    "name": "测试库",
    "is_archived": 0,
    "is_deleted": 0
  }
}
```

<a id="get-v2-testhub-testcase-state-plans"></a>

### 获取用例状态方案列表

`GET /v2/testhub/testcase_state_plans` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于分页获取用例状态方案列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `for_library_id` | string |  | 测试库的 id。只返回该测试库正在使用的用例状态方案 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 用例状态方案全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].library` | null \| object |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "686f62038668bbae4f4dd0d1",
      "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d1",
      "library": null
    },
    {
      "id": "686f62038668bbae4f4dd0d2",
      "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d2",
      "library": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
        "identifier": "CSK",
        "name": "测试库",
        "is_archived": 0,
        "is_deleted": 0
      }
    }
  ]
}
```

<a id="post-v2-testhub-testcase-state-plans-testcase-state-plan-id-testcase-states"></a>

### 向用例状态方案中添加一个状态

`POST /v2/testhub/testcase_state_plans/{testcase_state_plan_id}/testcase_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:configuration`

用于向用例状态方案中添加一个状态。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_state_plan_id` | string | 是 | 用例状态方案的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `state_id` | string | 是 | 用例状态的 id |

**请求示例**

```json
{
  "state_id": "686f62038668bbae4f4dd0c1"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例状态方案中状态关联的 id |
| `url` | string | 是 | 用例状态方案中状态关联的资源地址 |
| `state_plan` | object | 是 | 用例状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `state` | object | 是 | 用例状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |

**响应示例**

```json
{
  "id": "686f62038668bbae4f4dd0c1",
  "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d1/testcase_states/686f62038668bbae4f4dd0c1",
  "state_plan": {
    "id": "686f62038668bbae4f4dd0d1",
    "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d1"
  },
  "state": {
    "id": "686f62038668bbae4f4dd0c1",
    "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c1",
    "name": "设计",
    "type": "pending"
  }
}
```

<a id="get-v2-testhub-testcase-state-plans-testcase-state-plan-id-testcase-states-testcase-state-id"></a>

### 获取用例状态方案中的一个状态

`GET /v2/testhub/testcase_state_plans/{testcase_state_plan_id}/testcase_states/{testcase_state_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于按 id 获取用例状态方案中的一个状态。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_state_plan_id` | string | 是 | 用例状态方案的 id |
| `testcase_state_id` | string | 是 | 用例状态的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例状态方案中状态关联的 id |
| `url` | string | 是 | 用例状态方案中状态关联的资源地址 |
| `state_plan` | object | 是 | 用例状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `state` | object | 是 | 用例状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |

**响应示例**

```json
{
  "id": "686f62038668bbae4f4dd0c1",
  "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d1/testcase_states/686f62038668bbae4f4dd0c1",
  "state_plan": {
    "id": "686f62038668bbae4f4dd0d1",
    "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d1"
  },
  "state": {
    "id": "686f62038668bbae4f4dd0c1",
    "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c1",
    "name": "设计",
    "type": "pending"
  }
}
```

<a id="get-v2-testhub-testcase-state-plans-testcase-state-plan-id-testcase-states"></a>

### 获取用例状态方案中的状态列表

`GET /v2/testhub/testcase_state_plans/{testcase_state_plan_id}/testcase_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于分页获取用例状态方案中的状态。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_state_plan_id` | string | 是 | 用例状态方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 用例状态方案中的状态全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].state_plan` | object |  |  |
| `values[].state_plan.id` | string |  |  |
| `values[].state_plan.url` | string |  |  |
| `values[].state` | object |  |  |
| `values[].state.id` | string |  |  |
| `values[].state.url` | string |  |  |
| `values[].state.name` | string |  |  |
| `values[].state.type` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "686f62038668bbae4f4dd0c1",
      "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d1/testcase_states/686f62038668bbae4f4dd0c1",
      "state_plan": {
        "id": "686f62038668bbae4f4dd0d1",
        "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d1"
      },
      "state": {
        "id": "686f62038668bbae4f4dd0c1",
        "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c1",
        "name": "设计",
        "type": "pending"
      }
    }
  ]
}
```

<a id="delete-v2-testhub-testcase-state-plans-testcase-state-plan-id-testcase-states-testcase-state-id"></a>

### 在用例状态方案中移除一个状态

`DELETE /v2/testhub/testcase_state_plans/{testcase_state_plan_id}/testcase_states/{testcase_state_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:configuration`

用于在用例状态方案中移除一个状态。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_state_plan_id` | string | 是 | 用例状态方案的 id |
| `testcase_state_id` | string | 是 | 用例状态的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例状态方案中状态关联的 id |
| `url` | string | 是 | 用例状态方案中状态关联的资源地址 |
| `state_plan` | object | 是 | 用例状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `state` | object | 是 | 用例状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |

**响应示例**

```json
{
  "id": "686f62038668bbae4f4dd0c1",
  "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d1/testcase_states/686f62038668bbae4f4dd0c1",
  "state_plan": {
    "id": "686f62038668bbae4f4dd0d1",
    "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d1"
  },
  "state": {
    "id": "686f62038668bbae4f4dd0c1",
    "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c1",
    "name": "设计",
    "type": "pending"
  }
}
```

<a id="post-v2-testhub-testcase-state-plans-testcase-state-plan-id-testcase-state-flows"></a>

### 向用例状态方案中添加一个状态流转

`POST /v2/testhub/testcase_state_plans/{testcase_state_plan_id}/testcase_state_flows` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:configuration`

用于向用例状态方案中添加一个状态流转。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_state_plan_id` | string | 是 | 用例状态方案的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `from_state_id` | string | 是 | 起始用例状态的 id |
| `to_state_id` | string | 是 | 目标用例状态的 id |

**请求示例**

```json
{
  "from_state_id": "686f62038668bbae4f4dd0c1",
  "to_state_id": "686f62038668bbae4f4dd0c2"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例状态流转的 id |
| `url` | string | 是 | 用例状态流转的资源地址 |
| `state_plan` | object | 是 | 用例状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `from_state` | object | 是 | 起始用例状态的引用结构数据 |
| `from_state.id` | string |  |  |
| `from_state.url` | string |  |  |
| `from_state.name` | string |  |  |
| `from_state.type` | string |  |  |
| `to_state` | object | 是 | 目标用例状态的引用结构数据 |
| `to_state.id` | string |  |  |
| `to_state.url` | string |  |  |
| `to_state.name` | string |  |  |
| `to_state.type` | string |  |  |

**响应示例**

```json
{
  "id": "686f62038668bbae4f4dd0e1",
  "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d1/testcase_state_flows/686f62038668bbae4f4dd0e1",
  "state_plan": {
    "id": "686f62038668bbae4f4dd0d1",
    "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d1"
  },
  "from_state": {
    "id": "686f62038668bbae4f4dd0c1",
    "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c1",
    "name": "设计",
    "type": "pending"
  },
  "to_state": {
    "id": "686f62038668bbae4f4dd0c2",
    "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c2",
    "name": "就绪",
    "type": "completed"
  }
}
```

<a id="get-v2-testhub-testcase-state-plans-testcase-state-plan-id-testcase-state-flows-testcase-state-flow-id"></a>

### 获取用例状态方案中的一个状态流转

`GET /v2/testhub/testcase_state_plans/{testcase_state_plan_id}/testcase_state_flows/{testcase_state_flow_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于按 id 获取用例状态方案中的一个状态流转。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_state_plan_id` | string | 是 | 用例状态方案的 id |
| `testcase_state_flow_id` | string | 是 | 用例状态流转的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例状态流转的 id |
| `url` | string | 是 | 用例状态流转的资源地址 |
| `state_plan` | object | 是 | 用例状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `from_state` | object | 是 | 起始用例状态的引用结构数据 |
| `from_state.id` | string |  |  |
| `from_state.url` | string |  |  |
| `from_state.name` | string |  |  |
| `from_state.type` | string |  |  |
| `to_state` | object | 是 | 目标用例状态的引用结构数据 |
| `to_state.id` | string |  |  |
| `to_state.url` | string |  |  |
| `to_state.name` | string |  |  |
| `to_state.type` | string |  |  |

**响应示例**

```json
{
  "id": "686f62038668bbae4f4dd0e1",
  "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d1/testcase_state_flows/686f62038668bbae4f4dd0e1",
  "state_plan": {
    "id": "686f62038668bbae4f4dd0d1",
    "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d1"
  },
  "from_state": {
    "id": "686f62038668bbae4f4dd0c1",
    "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c1",
    "name": "设计",
    "type": "pending"
  },
  "to_state": {
    "id": "686f62038668bbae4f4dd0c2",
    "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c2",
    "name": "就绪",
    "type": "completed"
  }
}
```

<a id="get-v2-testhub-testcase-state-plans-testcase-state-plan-id-testcase-state-flows"></a>

### 获取用例状态方案中的状态流转列表

`GET /v2/testhub/testcase_state_plans/{testcase_state_plan_id}/testcase_state_flows` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于分页获取用例状态方案中的状态流转。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_state_plan_id` | string | 是 | 用例状态方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 用例状态方案中的状态流转全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].state_plan` | object |  |  |
| `values[].state_plan.id` | string |  |  |
| `values[].state_plan.url` | string |  |  |
| `values[].from_state` | object |  |  |
| `values[].from_state.id` | string |  |  |
| `values[].from_state.url` | string |  |  |
| `values[].from_state.name` | string |  |  |
| `values[].from_state.type` | string |  |  |
| `values[].to_state` | object |  |  |
| `values[].to_state.id` | string |  |  |
| `values[].to_state.url` | string |  |  |
| `values[].to_state.name` | string |  |  |
| `values[].to_state.type` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "686f62038668bbae4f4dd0e1",
      "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d1/testcase_state_flows/686f62038668bbae4f4dd0e1",
      "state_plan": {
        "id": "686f62038668bbae4f4dd0d1",
        "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d1"
      },
      "from_state": {
        "id": "686f62038668bbae4f4dd0c1",
        "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c1",
        "name": "设计",
        "type": "pending"
      },
      "to_state": {
        "id": "686f62038668bbae4f4dd0c2",
        "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c2",
        "name": "就绪",
        "type": "completed"
      }
    }
  ]
}
```

<a id="delete-v2-testhub-testcase-state-plans-testcase-state-plan-id-testcase-state-flows-testcase-state-flow-id"></a>

### 在用例状态方案中移除一个状态流转

`DELETE /v2/testhub/testcase_state_plans/{testcase_state_plan_id}/testcase_state_flows/{testcase_state_flow_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:configuration`

用于在用例状态方案中移除一个状态流转。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_state_plan_id` | string | 是 | 用例状态方案的 id |
| `testcase_state_flow_id` | string | 是 | 用例状态流转的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例状态流转的 id |
| `url` | string | 是 | 用例状态流转的资源地址 |
| `state_plan` | object | 是 | 用例状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `from_state` | object | 是 | 起始用例状态的引用结构数据 |
| `from_state.id` | string |  |  |
| `from_state.url` | string |  |  |
| `from_state.name` | string |  |  |
| `from_state.type` | string |  |  |
| `to_state` | object | 是 | 目标用例状态的引用结构数据 |
| `to_state.id` | string |  |  |
| `to_state.url` | string |  |  |
| `to_state.name` | string |  |  |
| `to_state.type` | string |  |  |

**响应示例**

```json
{
  "id": "686f62038668bbae4f4dd0e1",
  "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d1/testcase_state_flows/686f62038668bbae4f4dd0e1",
  "state_plan": {
    "id": "686f62038668bbae4f4dd0d1",
    "url": "https://{rest_api_root}/v2/testhub/testcase_state_plans/686f62038668bbae4f4dd0d1"
  },
  "from_state": {
    "id": "686f62038668bbae4f4dd0c1",
    "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c1",
    "name": "设计",
    "type": "pending"
  },
  "to_state": {
    "id": "686f62038668bbae4f4dd0c2",
    "url": "https://{rest_api_root}/v2/testhub/testcase_states/686f62038668bbae4f4dd0c2",
    "name": "就绪",
    "type": "completed"
  }
}
```

<a id="post-v2-testhub-testcase-properties"></a>

### 创建一个用例属性

`POST /v2/testhub/testcase_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:configuration`

用于创建一个用例属性。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 用例属性的名称。在一个企业中这个名称是唯一的 |
| `type` | string | 是 | 用例属性的类型；枚举："text" / "textarea" / "select" / "multi_select" / "cascade_select" / "cascade_multi_select" / "member" / "members" / "date" / "number" / "progress" / "rate" / "link" / "referred_select" / "referred_multi_select" |
| `referred_object_type` | string |  | 引用对象类型。创建 `referred_select,referred_multi_select` 属性时必填，更新已有引用选择属性时可用于调整引用对象类型；枚举："product" / "project" / "library" / "space" |
| `options` | object |  | 选择项列表。当用例属性类型为 `select,multi_select,cascade_select,cascade_multi_select` 时可选填此项 |
| `options.id` | string |  | 选择项 id。该值在选择项中是唯一的 |
| `options.text` | string | 是 | 选择项内容。该值在选择项中是唯一的 |
| `options.parent_id` | string |  | 选择项父级 id。当属性类型为 `cascade_select,cascade_multi_select` 时，`parent_id` 参数有效，用于构建级联类型选择项之间的父子关系，最多存在 4 级 |

**请求示例**

```json
{
  "name": "严重程度",
  "type": "select",
  "options": [
    {
      "text": "严重"
    },
    {
      "text": "一般"
    }
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例属性的 id |
| `url` | string | 是 | 用例属性的资源地址 |
| `name` | string | 是 | 用例属性的名称 |
| `type` | string | 是 | 用例属性的类型 |
| `referred_object_type` | string | 是 | 引用对象类型 |
| `options` | object | 是 | 下拉选项值 |
| `options.id` | string | 是 | 选择项 id。该值在选择项中是唯一的 |
| `options.text` | string | 是 | 选择项内容。该值在选择项中是唯一的 |
| `options.color` | string | 是 | 选择项颜色 |
| `options.parent_id` | string | 是 | 选择项父级 id。当属性类型为 `cascade_select` 或 `cascade_multi_select` 时返回，用于表示级联选择项的父子关系 |
| `is_removable` | number | 是 | 是否允许删除 |
| `is_name_editable` | number | 是 | 是否允许修改名称 |
| `is_options_editable` | number | 是 | 是否允许修改下拉选项值 |

**响应示例**

```json
{
  "id": "severity",
  "url": "https://{rest_api_root}/v2/testhub/testcase_properties/severity",
  "name": "严重程度",
  "type": "select",
  "options": [
    {
      "id": "5efb1859110533727a82c603",
      "text": "严重",
      "color": "#FF7575"
    },
    {
      "id": "5efb1859110533727a82c604",
      "text": "一般",
      "color": "#FF7575"
    }
  ],
  "is_removable": 1,
  "is_name_editable": 1,
  "is_options_editable": 1
}
```

<a id="get-v2-testhub-testcase-properties-testcase-property-id"></a>

### 获取一个用例属性

`GET /v2/testhub/testcase_properties/{testcase_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于按 id 获取用例属性全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_property_id` | string | 是 | 用例属性的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例属性的 id |
| `url` | string | 是 | 用例属性的资源地址 |
| `name` | string | 是 | 用例属性的名称 |
| `type` | string | 是 | 用例属性的类型 |
| `referred_object_type` | string | 是 | 引用对象类型 |
| `options` | object | 是 | 下拉选项值 |
| `options.id` | string | 是 | 选择项 id。该值在选择项中是唯一的 |
| `options.text` | string | 是 | 选择项内容。该值在选择项中是唯一的 |
| `options.color` | string | 是 | 选择项颜色 |
| `options.parent_id` | string | 是 | 选择项父级 id。当属性类型为 `cascade_select` 或 `cascade_multi_select` 时返回，用于表示级联选择项的父子关系 |
| `is_removable` | number | 是 | 是否允许删除 |
| `is_name_editable` | number | 是 | 是否允许修改名称 |
| `is_options_editable` | number | 是 | 是否允许修改下拉选项值 |

**响应示例**

```json
{
  "id": "severity",
  "url": "https://{rest_api_root}/v2/testhub/testcase_properties/severity",
  "name": "严重程度",
  "type": "select",
  "options": [
    {
      "id": "5efb1859110533727a82c603",
      "text": "严重",
      "color": "#FF7575"
    },
    {
      "id": "5efb1859110533727a82c604",
      "text": "一般",
      "color": "#FF7575"
    }
  ],
  "is_removable": 1,
  "is_name_editable": 1,
  "is_options_editable": 1
}
```

<a id="patch-v2-testhub-testcase-properties-testcase-property-id"></a>

### 部分更新一个用例属性

`PATCH /v2/testhub/testcase_properties/{testcase_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:configuration`

用于部分更新一个用例属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_property_id` | string | 是 | 用例属性的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 用例属性的名称。在一个企业中这个名称是唯一的 |
| `referred_object_type` | string | 是 | 引用对象类型。创建 `referred_select,referred_multi_select` 属性时必填，更新已有引用选择属性时可用于调整引用对象类型；枚举："product" / "project" / "library" / "space" |
| `options` | object |  | 选择项列表。`options` 是整体更新的。当用例属性类型为 `select,multi_select,cascade_select,cascade_multi_select` 时可选填此项 |
| `options.id` | string |  | 选择项 id。该值在选择项中是唯一的 |
| `options.text` | string | 是 | 选择项内容。该值在选择项中是唯一的 |
| `options.parent_id` | string |  | 选择项父级 id。当属性类型为 `cascade_select,cascade_multi_select` 时，`parent_id` 参数有效，用于构建级联类型选择项之间的父子关系，最多存在 4 级 |

**请求示例**

```json
{
  "name": "严重程度-update",
  "options": [
    {
      "id": "5efb1859110533727a82c603",
      "text": "严重-update"
    },
    {
      "text": "一般"
    }
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例属性的 id |
| `url` | string | 是 | 用例属性的资源地址 |
| `name` | string | 是 | 用例属性的名称 |
| `type` | string | 是 | 用例属性的类型 |
| `referred_object_type` | string | 是 | 引用对象类型 |
| `options` | object | 是 | 下拉选项值 |
| `options.id` | string | 是 | 选择项 id。该值在选择项中是唯一的 |
| `options.text` | string | 是 | 选择项内容。该值在选择项中是唯一的 |
| `options.color` | string | 是 | 选择项颜色 |
| `options.parent_id` | string | 是 | 选择项父级 id。当属性类型为 `cascade_select` 或 `cascade_multi_select` 时返回，用于表示级联选择项的父子关系 |
| `is_removable` | number | 是 | 是否允许删除 |
| `is_name_editable` | number | 是 | 是否允许修改名称 |
| `is_options_editable` | number | 是 | 是否允许修改下拉选项值 |

**响应示例**

```json
{
  "id": "severity-update",
  "url": "https://{rest_api_root}/v2/testhub/testcase_properties/severity",
  "name": "严重程度-update",
  "type": "select",
  "options": [
    {
      "id": "5efb1859110533727a82c603",
      "text": "严重-update",
      "color": "#FF7575"
    },
    {
      "id": "5efb1859110533727a82c624",
      "text": "一般",
      "color": "#FF7575"
    }
  ],
  "is_removable": 1,
  "is_name_editable": 1,
  "is_options_editable": 1
}
```

<a id="get-v2-testhub-testcase-properties"></a>

### 获取全部用例属性列表

`GET /v2/testhub/testcase_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于分页获取企业内全部用例属性。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 用例属性的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].type` | string |  |  |
| `values[].options` | object[] \| null |  |  |
| `values[].is_removable` | number |  |  |
| `values[].is_name_editable` | number |  |  |
| `values[].is_options_editable` | number |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "environment",
      "url": "https://{rest_api_root}/v2/testhub/testcase_properties/environment",
      "name": "重现环境",
      "type": "select",
      "options": [
        {
          "id": "5efb1859110533727a82c603",
          "text": "测试",
          "color": "#FF7575"
        },
        {
          "id": "5efb1859110533727a82c604",
          "text": "生产",
          "color": "#FF7575"
        }
      ],
      "is_removable": 0,
      "is_name_editable": 0,
      "is_options_editable": 0
    },
    {
      "id": "estimated_workload",
      "url": "https://{rest_api_root}/v2/testhub/testcase_properties/estimated_workload",
      "name": "预估工时",
      "type": "number",
      "options": null,
      "is_removable": 0,
      "is_name_editable": 0,
      "is_options_editable": 0
    }
  ]
}
```

<a id="get-v2-testhub-testcase-property-plans-testcase-property-plan-id"></a>

### 获取一个用例属性方案

`GET /v2/testhub/testcase_property_plans/{testcase_property_plan_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于按 id 获取用例属性方案全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_property_plan_id` | string | 是 | 用例属性方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例属性方案的 id |
| `url` | string | 是 | 用例属性方案的资源地址 |
| `library` | object | 是 | 测试库的引用结构数据。该方案是此测试库的本地化方案 |
| `library.id` | string |  |  |
| `library.url` | string |  |  |
| `library.identifier` | string |  |  |
| `library.name` | string |  |  |
| `library.is_archived` | number |  |  |
| `library.is_deleted` | number |  |  |

**响应示例 1：响应示例（全局方案）**

```json
{
  "id": "5f8a21f18ef715265de90c21",
  "url": "https://{rest_api_root}/v2/testhub/testcase_property_plans/5f8a21f18ef715265de90c21",
  "library": null
}
```

**响应示例 2：响应示例（测试库本地化方案）**

```json
{
  "id": "5f8a21f18ef715265de90c22",
  "url": "https://{rest_api_root}/v2/testhub/testcase_property_plans/5f8a21f18ef715265de90c22",
  "library": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
    "identifier": "CSK",
    "name": "测试库",
    "is_archived": 0,
    "is_deleted": 0
  }
}
```

<a id="get-v2-testhub-testcase-property-plans"></a>

### 获取用例属性方案列表

`GET /v2/testhub/testcase_property_plans` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于分页获取用例属性方案列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `for_library_id` | string |  | 测试库的 id。只返回该测试库正在使用的用例属性方案 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 用例属性方案全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].library` | null \| object |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "5f8a21f18ef715265de90c21",
      "url": "https://{rest_api_root}/v2/testhub/testcase_property_plans/5f8a21f18ef715265de90c21",
      "library": null
    },
    {
      "id": "5f8a21f18ef715265de90c22",
      "url": "https://{rest_api_root}/v2/testhub/testcase_property_plans/5f8a21f18ef715265de90c22",
      "library": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/testhub/libraries/5eb623f6a70571487ea47000",
        "identifier": "CSK",
        "name": "测试库",
        "is_archived": 0,
        "is_deleted": 0
      }
    }
  ]
}
```

<a id="post-v2-testhub-testcase-property-plans-testcase-property-plan-id-testcase-properties"></a>

### 向用例属性方案中添加一个属性

`POST /v2/testhub/testcase_property_plans/{testcase_property_plan_id}/testcase_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:configuration`

用于向用例属性方案添加一个属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_property_plan_id` | string | 是 | 用例属性方案的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `property_id` | string | 是 | 用例属性的 id |

**请求示例**

```json
{
  "property_id": "environment"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例属性方案中属性关联的 id |
| `url` | string | 是 | 用例属性方案中属性关联的资源地址 |
| `property_plan` | object | 是 | 用例属性方案的引用结构数据 |
| `property_plan.id` | string |  |  |
| `property_plan.url` | string |  |  |
| `property` | object | 是 | 用例属性的引用结构数据 |
| `property.id` | string |  |  |
| `property.url` | string |  |  |
| `property.name` | string |  |  |
| `property.type` | string |  |  |
| `property.options` | object[] |  |  |
| `property.options[].id` | string |  |  |
| `property.options[].text` | string |  |  |

**响应示例**

```json
{
  "id": "environment",
  "url": "https://{rest_api_root}/v2/testhub/testcase_property_plans/5f8a21f18ef715265de90c21/testcase_properties/environment",
  "property_plan": {
    "id": "5f8a21f18ef715265de90c21",
    "url": "https://{rest_api_root}/v2/testhub/testcase_property_plans/5f8a21f18ef715265de90c21"
  },
  "property": {
    "id": "environment",
    "url": "https://{rest_api_root}/v2/testhub/testcase_properties/environment",
    "name": "重现环境",
    "type": "select",
    "options": [
      {
        "id": "5efb1859110533727a82c603",
        "text": "test"
      },
      {
        "id": "5efb1859110533727a82c604",
        "text": "beta"
      }
    ]
  }
}
```

<a id="get-v2-testhub-testcase-property-plans-testcase-property-plan-id-testcase-properties-testcase-property-id"></a>

### 获取用例属性方案中的一个属性

`GET /v2/testhub/testcase_property_plans/{testcase_property_plan_id}/testcase_properties/{testcase_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于按 id 获取用例属性方案中的一个属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_property_plan_id` | string | 是 | 用例属性方案的 id |
| `testcase_property_id` | string | 是 | 用例属性的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例属性方案中属性关联的 id |
| `url` | string | 是 | 用例属性方案中属性关联的资源地址 |
| `property_plan` | object | 是 | 用例属性方案的引用结构数据 |
| `property_plan.id` | string |  |  |
| `property_plan.url` | string |  |  |
| `property` | object | 是 | 用例属性的引用结构数据 |
| `property.id` | string |  |  |
| `property.url` | string |  |  |
| `property.name` | string |  |  |
| `property.type` | string |  |  |
| `property.options` | object[] |  |  |
| `property.options[].id` | string |  |  |
| `property.options[].text` | string |  |  |

**响应示例**

```json
{
  "id": "environment",
  "url": "https://{rest_api_root}/v2/testhub/testcase_property_plans/5f8a21f18ef715265de90c21/testcase_properties/environment",
  "property_plan": {
    "id": "5f8a21f18ef715265de90c21",
    "url": "https://{rest_api_root}/v2/testhub/testcase_property_plans/5f8a21f18ef715265de90c21"
  },
  "property": {
    "id": "environment",
    "url": "https://{rest_api_root}/v2/testhub/testcase_properties/environment",
    "name": "重现环境",
    "type": "select",
    "options": [
      {
        "id": "5efb1859110533727a82c603",
        "text": "test"
      },
      {
        "id": "5efb1859110533727a82c604",
        "text": "beta"
      }
    ]
  }
}
```

<a id="get-v2-testhub-testcase-property-plans-testcase-property-plan-id-testcase-properties"></a>

### 获取用例属性方案中的属性列表

`GET /v2/testhub/testcase_property_plans/{testcase_property_plan_id}/testcase_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于分页获取用例属性方案中的属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_property_plan_id` | string | 是 | 用例属性方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 用例属性方案中的属性全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].property_plan` | object |  |  |
| `values[].property_plan.id` | string |  |  |
| `values[].property_plan.url` | string |  |  |
| `values[].property` | object |  |  |
| `values[].property.id` | string |  |  |
| `values[].property.url` | string |  |  |
| `values[].property.name` | string |  |  |
| `values[].property.type` | string |  |  |
| `values[].property.options` | object[] |  |  |
| `values[].property.options[].id` | string |  |  |
| `values[].property.options[].text` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "environment",
      "url": "https://{rest_api_root}/v2/testhub/testcase_property_plans/5f8a21f18ef715265de90c21/testcase_properties/environment",
      "property_plan": {
        "id": "5f8a21f18ef715265de90c21",
        "url": "https://{rest_api_root}/v2/testhub/testcase_property_plans/5f8a21f18ef715265de90c21"
      },
      "property": {
        "id": "environment",
        "url": "https://{rest_api_root}/v2/testhub/testcase_properties/environment",
        "name": "重现环境",
        "type": "select",
        "options": [
          {
            "id": "5efb1859110533727a82c603",
            "text": "test"
          },
          {
            "id": "5efb1859110533727a82c604",
            "text": "beta"
          }
        ]
      }
    }
  ]
}
```

<a id="delete-v2-testhub-testcase-property-plans-testcase-property-plan-id-testcase-properties-testcase-property-id"></a>

### 在用例属性方案中移除一个属性

`DELETE /v2/testhub/testcase_property_plans/{testcase_property_plan_id}/testcase_properties/{testcase_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:testhub:configuration`

用于从用例属性方案中移除一个属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_property_plan_id` | string | 是 | 用例属性方案的 id |
| `testcase_property_id` | string | 是 | 用例属性的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例属性方案中属性关联的 id |
| `url` | string | 是 | 用例属性方案中属性关联的资源地址 |
| `property_plan` | object | 是 | 用例属性方案的引用结构数据 |
| `property_plan.id` | string |  |  |
| `property_plan.url` | string |  |  |
| `property` | object | 是 | 用例属性的引用结构数据 |
| `property.id` | string |  |  |
| `property.url` | string |  |  |
| `property.name` | string |  |  |
| `property.type` | string |  |  |
| `property.options` | object[] |  |  |
| `property.options[].id` | string |  |  |
| `property.options[].text` | string |  |  |

**响应示例**

```json
{
  "id": "environment",
  "url": "https://{rest_api_root}/v2/testhub/testcase_property_plans/5f8a21f18ef715265de90c21/testcase_properties/environment",
  "property_plan": {
    "id": "5f8a21f18ef715265de90c21",
    "url": "https://{rest_api_root}/v2/testhub/testcase_property_plans/5f8a21f18ef715265de90c21"
  },
  "property": {
    "id": "environment",
    "url": "https://{rest_api_root}/v2/testhub/testcase_properties/environment",
    "name": "重现环境",
    "type": "select",
    "options": [
      {
        "id": "5efb1859110533727a82c603",
        "text": "test"
      },
      {
        "id": "5efb1859110533727a82c604",
        "text": "beta"
      }
    ]
  }
}
```

<a id="get-v2-testhub-testcase-important-levels-testcase-important-level-id"></a>

### 获取一个用例重要程度

`GET /v2/testhub/testcase_important_levels/{testcase_important_level_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于按 id 获取用例重要程度全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testcase_important_level_id` | string | 是 | 用例重要程度的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用例重要程度的 id |
| `url` | string | 是 | 用例重要程度的资源地址 |
| `name` | string | 是 | 用例重要程度的名称 |
| `color` | string | 是 | 用例重要程度的颜色 |

**响应示例**

```json
{
  "id": "57a109b35ae8c20630fd7256",
  "url": "https://{rest_api_root}/v2/testhub/testcase_important_levels/57a109b35ae8c20630fd7256",
  "name": "P1",
  "color": "#56ABFB"
}
```

<a id="get-v2-testhub-testcase-important-levels"></a>

### 获取全部重要程度列表

`GET /v2/testhub/testcase_important_levels` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于分页获取企业内全部用例重要程度。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 重要程度的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].color` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "57a109b35ae8c20630fd7256",
      "url": "https://{rest_api_root}/v2/testhub/testcase_important_levels/57a109b35ae8c20630fd7256",
      "name": "P11",
      "color": "#56ABFB"
    }
  ]
}
```

## 计划配置

> 分组路径：测试管理 / 测试配置中心 / 计划配置

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `GET` | `/v2/testhub/testplan_states/{testplan_state_id}` | [获取一个计划状态](#get-v2-testhub-testplan-states-testplan-state-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testplan_states` | [获取全部计划状态列表](#get-v2-testhub-testplan-states) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testrun_statuses/{testrun_status_id}` | [获取一个执行结果](#get-v2-testhub-testrun-statuses-testrun-status-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/testhub/testrun_statuses` | [获取全部执行结果列表](#get-v2-testhub-testrun-statuses-2) | 企业令牌 / 用户令牌 |

<a id="get-v2-testhub-testplan-states-testplan-state-id"></a>

### 获取一个计划状态

`GET /v2/testhub/testplan_states/{testplan_state_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于按 id 获取计划状态全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testplan_state_id` | string | 是 | 计划状态的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 计划状态的 id |
| `url` | string | 是 | 计划状态的资源地址 |
| `name` | string | 是 | 计划状态的名称 |
| `type` | string | 是 | 计划状态的类型；枚举："pending" / "in_progress" / "completed" |
| `is_system` | number | 是 | 是否为系统内置状态；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "686f62038668bbae4f4dd0ca",
  "url": "https://{rest_api_root}/v2/testhub/testplan_states/686f62038668bbae4f4dd0ca",
  "name": "未开始",
  "type": "pending",
  "is_system": 1
}
```

<a id="get-v2-testhub-testplan-states"></a>

### 获取全部计划状态列表

`GET /v2/testhub/testplan_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于分页获取企业内全部计划状态。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `page_size` | number | 是 | 每页条数 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 全部计划状态全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].type` | string |  |  |
| `values[].is_system` | number |  |  |

**响应示例**

```json
{
  "page_index": 0,
  "page_size": 30,
  "total": 4,
  "values": [
    {
      "id": "686f62038668bbae4f4dd0ca",
      "url": "https://{rest_api_root}/v2/testhub/testplan_states/686f62038668bbae4f4dd0ca",
      "name": "未开始",
      "type": "pending",
      "is_system": 1
    },
    {
      "id": "652d0cb2b798f983d9c67c2b",
      "url": "https://{rest_api_root}/v2/testhub/testplan_states/652d0cb2b798f983d9c67c2b",
      "name": "进行中",
      "type": "in_progress",
      "is_system": 1
    },
    {
      "id": "652d0cb2b798f983d9c67c2d",
      "url": "https://{rest_api_root}/v2/testhub/testplan_states/652d0cb2b798f983d9c67c2d",
      "name": "已完成",
      "type": "completed",
      "is_system": 1
    },
    {
      "id": "652d0cb2b798f983d9c67c2e",
      "url": "https://{rest_api_root}/v2/testhub/testplan_states/652d0cb2b798f983d9c67c2e",
      "name": "已终止",
      "type": "completed",
      "is_system": 0
    }
  ]
}
```

<a id="get-v2-testhub-testrun-statuses-testrun-status-id"></a>

### 获取一个执行结果

`GET /v2/testhub/testrun_statuses/{testrun_status_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于按 id 获取执行结果全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `testrun_status_id` | string | 是 | 执行结果的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 执行结果的 id |
| `url` | string | 是 | 执行结果的资源地址 |
| `name` | string | 是 | 执行结果的名称 |
| `is_system` | number | 是 | 是否为系统内置结果；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "68d117800d5dd2484a198261",
  "url": "https://{rest_api_root}/v2/testhub/testrun_statuses/68d117800d5dd2484a198261",
  "name": "通过",
  "is_system": 1
}
```

<a id="get-v2-testhub-testrun-statuses-2"></a>

### 获取全部执行结果列表

`GET /v2/testhub/testrun_statuses` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:testhub:configuration`

用于分页获取企业内全部执行结果。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `page_size` | number | 是 | 每页条数 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 全部执行结果全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].is_system` | number |  |  |

**响应示例**

```json
{
  "page_index": 0,
  "page_size": 30,
  "total": 5,
  "values": [
    {
      "id": "68d117800d5dd2484a198261",
      "url": "https://{rest_api_root}/v2/testhub/testrun_statuses/68d117800d5dd2484a198261",
      "name": "通过",
      "is_system": 1
    },
    {
      "id": "68d117800d5dd2484a198262",
      "url": "https://{rest_api_root}/v2/testhub/testrun_statuses/68d117800d5dd2484a198262",
      "name": "受阻",
      "is_system": 1
    },
    {
      "id": "68d117800d5dd2484a198263",
      "url": "https://{rest_api_root}/v2/testhub/testrun_statuses/68d117800d5dd2484a198263",
      "name": "失败",
      "is_system": 1
    },
    {
      "id": "68d117800d5dd2484a198264",
      "url": "https://{rest_api_root}/v2/testhub/testrun_statuses/68d117800d5dd2484a198264",
      "name": "跳过",
      "is_system": 1
    },
    {
      "id": "68d117800d5dd2484a198265",
      "url": "https://{rest_api_root}/v2/testhub/testrun_statuses/68d117800d5dd2484a198265",
      "name": "未测",
      "is_system": 1
    }
  ]
}
```
