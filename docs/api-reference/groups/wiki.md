# 知识管理

> 区域 `wiki`（知识管理） ｜ 2 个内容分组 ｜ 19 个端点

[← 返回 API 总览](../README.md)

## 空间

> 分组路径：知识管理 / 空间

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/wiki/spaces` | [创建一个空间](#post-v2-wiki-spaces) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/wiki/spaces/{space_id}` | [获取一个空间](#get-v2-wiki-spaces-space-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/wiki/spaces/{space_id}` | [部分更新一个空间](#patch-v2-wiki-spaces-space-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/wiki/spaces` | [获取空间列表](#get-v2-wiki-spaces) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/wiki/spaces/{space_id}` | [删除一个空间](#delete-v2-wiki-spaces-space-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/wiki/spaces/{space_id}/members` | [向空间中添加一个成员](#post-v2-wiki-spaces-space-id-members) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/wiki/spaces/{space_id}/members/{member_id}` | [获取空间中的一个成员](#get-v2-wiki-spaces-space-id-members-member-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/wiki/spaces/{space_id}/members` | [获取空间中的成员列表](#get-v2-wiki-spaces-space-id-members) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/wiki/spaces/{space_id}/members/{member_id}` | [在空间中移除一个成员](#delete-v2-wiki-spaces-space-id-members-member-id) | 企业令牌 / 用户令牌 |

<a id="post-v2-wiki-spaces"></a>

### 创建一个空间

`POST /v2/wiki/spaces` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:wiki:space`

用于创建一个空间。  
 企业令牌不能创建 `scope_type` 为 `user` 类型的空间。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `scope_type` | string | 是 | 空间的所属类型。允许值分别表示企业可见、团队可见和用户可见；枚举："organization" / "user_group" / "user" |
| `scope_id` | string |  | 空间的所属 id。当 `scope_type` 为 `user_group` 时，该字段必填，且表示团队 id；当 `scope_type` 为其他值时，该字段无效 |
| `name` | string | 是 | 空间的名称（不超过 32 个字符） |
| `visibility` | string |  | 空间可见性。允许值分别表示组织全部成员可见和仅空间成员可见；枚举："public" / "private" |
| `identifier` | string | 是 | 空间的标识。在一个企业中这个标识是唯一的。产品的标识由大写英文字母/数字/下划线/连接线组成（不超过 15 个字符） |
| `description` | string |  | 空间的描述 |
| `members` | object |  | 空间成员的列表 |
| `members.id` | string | 是 | 企业成员或团队的 `id` |
| `members.type` | string | 是 | 空间成员类型；枚举："user" / "user_group" |

**请求示例**

```
{
    "name": "团队空间",
    "identifier": "GROUP",
    "scope_type": "user_group",
    "scope_id": "63c8fb32729dee3334d96af7",
    "description": "团队空间所属一个团队，只能添加所属团队内的成员。",
    "members": [
        {
            "id": "a0417f68e846aae315c85d24643678a9",
            "type": "user"
        }
    ],
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 空间的 id |
| `url` | string | 是 | 空间的资源地址 |
| `identifier` | string | 是 | 空间的标识 |
| `name` | string | 是 | 空间的名称 |
| `scope_type` | string | 是 | 空间的所属类型；枚举："organization" / "user_group" / "user" |
| `scope_id` | string | 是 | 空间的所属 id |
| `visibility` | string | 是 | 空间的可见性；枚举："private" / "public" |
| `color` | string | 是 | 空间的主题色 |
| `description` | string | 是 | 空间的描述 |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `members` | object[] | 是 | 空间的成员列表 |
| `members[].id` | string |  |  |
| `members[].url` | string |  |  |
| `members[].type` | string |  |  |
| `members[].user` | object |  |  |
| `members[].user.id` | string |  |  |
| `members[].user.url` | string |  |  |
| `members[].user.name` | string |  |  |
| `members[].user.display_name` | string |  |  |
| `members[].user.avatar` | string |  |  |
| `members[].user_group` | object |  |  |
| `members[].user_group.id` | string |  |  |
| `members[].user_group.url` | string |  |  |
| `members[].user_group.name` | string |  |  |
| `created_at` | number | 是 | 创建时间，单位为秒 |
| `created_by` | object | 是 | 创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 更新时间，单位为秒 |
| `updated_by` | object | 是 | 更新人的引用结构数据 |
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
  "id": "642fd641209b56920a6c6e5f",
  "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5f",
  "identifier": "GROUP",
  "name": "团队空间",
  "scope_type": "user_group",
  "scope_id": "63c8fb32729dee3334d96af7",
  "visibility": "private",
  "color": "#FB7894",
  "description": "团队空间所属一个团队，只能添加所属团队内的成员。",
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
      "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5f/members/a0417f68e846aae315c85d24643678a9",
      "type": "user",
      "user": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      }
    },
    {
      "id": "63c8fb32729dee3334d96af7",
      "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5f/members/63c8fb32729dee3334d96af7",
      "type": "user_group",
      "user_group": {
        "id": "63c8fb32729dee3334d96af7",
        "url": "https://{rest_api_root}/v2/directory/groups/63c8fb32729dee3334d96af7",
        "name": "Open Team"
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

<a id="get-v2-wiki-spaces-space-id"></a>

### 获取一个空间

`GET /v2/wiki/spaces/{space_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:wiki:space`

用于按 id 获取空间全量信息。  
 默认不含已删除/已归档空间。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `space_id` | string | 是 | 空间的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的空间。该值默认为 `false` |
| `include_archived` | boolean |  | 是否包含已归档的空间。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 空间的 id |
| `url` | string | 是 | 空间的资源地址 |
| `identifier` | string | 是 | 空间的标识 |
| `name` | string | 是 | 空间的名称 |
| `scope_type` | string | 是 | 空间的所属类型。允许值分别表示企业可见、团队可见和用户可见；枚举："organization" / "user_group" / "user" |
| `scope_id` | string | 是 | 空间的所属 id |
| `visibility` | string | 是 | 空间的可见性；枚举："private" / "public" |
| `color` | string | 是 | 空间的主题色 |
| `description` | string | 是 | 空间的描述 |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `members` | object[] | 是 | 空间的成员列表 |
| `members[].id` | string |  |  |
| `members[].url` | string |  |  |
| `members[].type` | string |  |  |
| `members[].user` | object |  |  |
| `members[].user.id` | string |  |  |
| `members[].user.url` | string |  |  |
| `members[].user.name` | string |  |  |
| `members[].user.display_name` | string |  |  |
| `members[].user.avatar` | string |  |  |
| `members[].user_group` | object |  |  |
| `members[].user_group.id` | string |  |  |
| `members[].user_group.url` | string |  |  |
| `members[].user_group.name` | string |  |  |
| `created_at` | number | 是 | 空间的创建时间 |
| `created_by` | object | 是 | 空间的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 空间的更新时间 |
| `updated_by` | object | 是 | 空间的更新人 |
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
  "id": "642fd641209b56920a6c6e5e",
  "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e",
  "identifier": "DEMO",
  "name": "示例空间",
  "scope_type": "user_group",
  "scope_id": "63c8fb32729dee3334d96af7",
  "visibility": "private",
  "color": "#FB7894",
  "description": "示例空间描述",
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
      "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e/members/a0417f68e846aae315c85d24643678a9",
      "type": "user",
      "user": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      }
    },
    {
      "id": "63c8fb32729dee3334d96af7",
      "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e/members/63c8fb32729dee3334d96af7",
      "type": "user_group",
      "user_group": {
        "id": "63c8fb32729dee3334d96af7",
        "url": "https://{rest_api_root}/v2/directory/groups/63c8fb32729dee3334d96af7",
        "name": "Open Team"
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
  "updated_at": 1583290400,
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

<a id="patch-v2-wiki-spaces-space-id"></a>

### 部分更新一个空间

`PATCH /v2/wiki/spaces/{space_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:wiki:space`

用于部分更新一个空间。  
 企业令牌不能更新 `scope_type` 为 `user` 类型的空间。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `space_id` | string | 是 | 空间的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 空间的名称（不超过 32 个字符） |
| `identifier` | string |  | 空间的标识。在一个企业中这个标识是唯一的。产品的标识由大写英文字母/数字/下划线/连接线组成（不超过 15 个字符） |
| `description` | string |  | 空间的描述 |

**请求示例**

```json
{
  "name": "示例空间",
  "identifier": "DEMO",
  "description": "示例空间描述"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 空间的 id |
| `url` | string | 是 | 空间的资源地址 |
| `identifier` | string | 是 | 空间的标识 |
| `name` | string | 是 | 空间的名称 |
| `scope_type` | string | 是 | 空间的所属类型；枚举："organization" / "user_group" / "user" |
| `scope_id` | string | 是 | 空间的所属 id |
| `visibility` | string | 是 | 空间的可见性；枚举："private" / "public" |
| `color` | string | 是 | 空间的主题色 |
| `description` | string | 是 | 空间的描述 |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `members` | object[] | 是 | 空间的成员列表 |
| `members[].id` | string |  |  |
| `members[].url` | string |  |  |
| `members[].type` | string |  |  |
| `members[].user` | object |  |  |
| `members[].user.id` | string |  |  |
| `members[].user.url` | string |  |  |
| `members[].user.name` | string |  |  |
| `members[].user.display_name` | string |  |  |
| `members[].user.avatar` | string |  |  |
| `members[].user_group` | object |  |  |
| `members[].user_group.id` | string |  |  |
| `members[].user_group.url` | string |  |  |
| `members[].user_group.name` | string |  |  |
| `created_at` | number | 是 | 创建时间，单位为秒 |
| `created_by` | object | 是 | 创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 更新时间，单位为秒 |
| `updated_by` | object | 是 | 更新人的引用结构数据 |
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
  "id": "642fd641209b56920a6c6e5e",
  "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e",
  "identifier": "DEMO",
  "name": "示例空间",
  "scope_type": "user_group",
  "scope_id": "63c8fb32729dee3334d96af7",
  "visibility": "private",
  "color": "#FB7894",
  "description": "示例空间描述",
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
      "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e/members/a0417f68e846aae315c85d24643678a9",
      "type": "user",
      "user": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      }
    },
    {
      "id": "63c8fb32729dee3334d96af7",
      "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e/members/63c8fb32729dee3334d96af7",
      "type": "user_group",
      "user_group": {
        "id": "63c8fb32729dee3334d96af7",
        "url": "https://{rest_api_root}/v2/directory/groups/63c8fb32729dee3334d96af7",
        "name": "Open Team"
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
  "updated_at": 1583290400,
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

<a id="get-v2-wiki-spaces"></a>

### 获取空间列表

`GET /v2/wiki/spaces` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:wiki:space`

用于分页获取空间列表。  
 默认可按所属类型、关键词等过滤，不含已删除/已归档空间。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `scope_type` | string |  | 空间的所属类型。允许值分别表示企业可见、团队可见和用户可见；枚举："organization" / "user_group" / "user" |
| `scope_id` | string |  | 空间的所属 id。仅支持团队的 id |
| `keywords` | string |  | 关键字。只支持 `name` 关键字搜索 |
| `member_type` | string |  | 空间成员的类型。`member_type` 和 `member_id` 必须同时存在；枚举："user" / "user_group" |
| `member_id` | string |  | 空间成员的 id。值为企业成员或团队的 id。`member_id` 和 `member_type` 必须同时存在 |
| `created_between` | string |  | 创建时间介于的时间范围，通过','分割起始时间 |
| `updated_between` | string |  | 更新时间介于的时间范围，通过','分割起始时间 |
| `include_deleted` | boolean |  | 是否查询已删除的空间。该值默认为 `false` |
| `include_archived` | boolean |  | 是否查询已归档的空间。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 空间全量结构数据的数组 |
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
| `values[].members[].user_group` | object |  |  |
| `values[].members[].user_group.id` | string |  |  |
| `values[].members[].user_group.url` | string |  |  |
| `values[].members[].user_group.name` | string |  |  |
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
      "id": "642fd641209b56920a6c6e5e",
      "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e",
      "identifier": "DEMO",
      "name": "示例空间",
      "scope_type": "user_group",
      "scope_id": "63c8fb32729dee3334d96af7",
      "visibility": "private",
      "color": "#FB7894",
      "description": "示例空间描述",
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
          "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e/members/a0417f68e846aae315c85d24643678a9",
          "type": "user",
          "user": {
            "id": "a0417f68e846aae315c85d24643678a9",
            "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
            "name": "john",
            "display_name": "John",
            "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
          }
        },
        {
          "id": "63c8fb32729dee3334d96af7",
          "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e/members/63c8fb32729dee3334d96af7",
          "type": "user_group",
          "user_group": {
            "id": "63c8fb32729dee3334d96af7",
            "url": "https://{rest_api_root}/v2/directory/groups/63c8fb32729dee3334d96af7",
            "name": "Open Team"
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
      "updated_at": 1583290400,
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

<a id="delete-v2-wiki-spaces-space-id"></a>

### 删除一个空间

`DELETE /v2/wiki/spaces/{space_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:wiki:space`

用于按 id 删除一个空间。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `space_id` | string | 是 | 空间的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 空间的 id |
| `url` | string | 是 | 空间的资源地址 |
| `identifier` | string | 是 | 空间的标识 |
| `name` | string | 是 | 空间的名称 |
| `scope_type` | string | 是 | 空间的所属类型；枚举："organization" / "user_group" / "user" |
| `scope_id` | string | 是 | 空间的所属 id |
| `visibility` | string | 是 | 空间的可见性；枚举："private" / "public" |
| `color` | string | 是 | 空间的主题色 |
| `description` | string | 是 | 空间的描述 |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `members` | object[] | 是 | 空间的成员列表 |
| `members[].id` | string |  |  |
| `members[].url` | string |  |  |
| `members[].type` | string |  |  |
| `members[].user` | object |  |  |
| `members[].user.id` | string |  |  |
| `members[].user.url` | string |  |  |
| `members[].user.name` | string |  |  |
| `members[].user.display_name` | string |  |  |
| `members[].user.avatar` | string |  |  |
| `members[].user_group` | object |  |  |
| `members[].user_group.id` | string |  |  |
| `members[].user_group.url` | string |  |  |
| `members[].user_group.name` | string |  |  |
| `created_at` | number | 是 | 创建时间，单位为秒 |
| `created_by` | object | 是 | 创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 更新时间，单位为秒 |
| `updated_by` | object | 是 | 更新人的引用结构数据 |
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
  "id": "642fd641209b56920a6c6e5e",
  "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e",
  "identifier": "DEMO",
  "name": "示例空间",
  "scope_type": "user_group",
  "scope_id": "63c8fb32729dee3334d96af7",
  "visibility": "private",
  "color": "#FB7894",
  "description": "示例空间描述",
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
      "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e/members/a0417f68e846aae315c85d24643678a9",
      "type": "user",
      "user": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      }
    },
    {
      "id": "63c8fb32729dee3334d96af7",
      "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e/members/63c8fb32729dee3334d96af7",
      "type": "user_group",
      "user_group": {
        "id": "63c8fb32729dee3334d96af7",
        "url": "https://{rest_api_root}/v2/directory/groups/63c8fb32729dee3334d96af7",
        "name": "Open Team"
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
  "updated_at": 1583290400,
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

<a id="post-v2-wiki-spaces-space-id-members"></a>

### 向空间中添加一个成员

`POST /v2/wiki/spaces/{space_id}/members` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:wiki:space`

用于向指定空间添加一个成员。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `space_id` | string | 是 | 空间的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `member` | object | 是 | 空间的成员 |
| `member.id` | string | 是 | 企业成员或团队的 id |
| `member.type` | string | 是 | 空间成员的类型；枚举："user" / "user_group" |
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
| `id` | string | 是 | 空间成员的 id |
| `url` | string | 是 | 空间成员的资源地址 |
| `space` | object | 是 | 所属空间的引用结构数据 |
| `space.id` | string |  |  |
| `space.url` | string |  |  |
| `space.identifier` | string |  |  |
| `space.name` | string |  |  |
| `space.is_archived` | number |  |  |
| `space.is_deleted` | number |  |  |
| `type` | string | 是 | 空间成员的类型；枚举："user" / "user_group" |
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
  "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e/members/a0417f68e846aae315c85d24643678a9",
  "space": {
    "id": "642fd641209b56920a6c6e5e",
    "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e",
    "identifier": "DEMO",
    "name": "示例空间",
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

<a id="get-v2-wiki-spaces-space-id-members-member-id"></a>

### 获取空间中的一个成员

`GET /v2/wiki/spaces/{space_id}/members/{member_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:wiki:space`

用于按 id 获取空间中的一个成员。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `space_id` | string | 是 | 空间的 id |
| `member_id` | string | 是 | 空间成员的 id，即企业成员或团队的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 空间成员的 id |
| `url` | string | 是 | 空间成员的资源地址 |
| `space` | object | 是 | 所属空间的引用结构数据 |
| `space.id` | string |  |  |
| `space.url` | string |  |  |
| `space.identifier` | string |  |  |
| `space.name` | string |  |  |
| `space.is_archived` | number |  |  |
| `space.is_deleted` | number |  |  |
| `type` | string | 是 | 空间成员的类型；枚举："user" / "user_group" |
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
  "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e/members/a0417f68e846aae315c85d24643678a9",
  "space": {
    "id": "642fd641209b56920a6c6e5e",
    "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e",
    "identifier": "DEMO",
    "name": "示例空间",
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

<a id="get-v2-wiki-spaces-space-id-members"></a>

### 获取空间中的成员列表

`GET /v2/wiki/spaces/{space_id}/members` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:wiki:space`

用于分页获取指定空间中的成员列表。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `space_id` | string | 是 | 空间的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 空间中的成员全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].space` | object |  |  |
| `values[].space.id` | string |  |  |
| `values[].space.url` | string |  |  |
| `values[].space.identifier` | string |  |  |
| `values[].space.name` | string |  |  |
| `values[].space.is_archived` | number |  |  |
| `values[].space.is_deleted` | number |  |  |
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
      "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e/members/a0417f68e846aae315c85d24643678a9",
      "space": {
        "id": "642fd641209b56920a6c6e5e",
        "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e",
        "identifier": "DEMO",
        "name": "示例空间",
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
      "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e/members/63c8fb32729dee3334d96af7",
      "space": {
        "id": "642fd641209b56920a6c6e5e",
        "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e",
        "identifier": "DEMO",
        "name": "示例空间",
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

<a id="delete-v2-wiki-spaces-space-id-members-member-id"></a>

### 在空间中移除一个成员

`DELETE /v2/wiki/spaces/{space_id}/members/{member_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:wiki:space`

用于从指定空间中移除一个成员。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `space_id` | string | 是 | 空间的 id |
| `member_id` | string | 是 | 企业成员或团队的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 空间成员的 id |
| `url` | string | 是 | 空间成员的资源地址 |
| `space` | object | 是 | 所属空间的引用结构数据 |
| `space.id` | string |  |  |
| `space.url` | string |  |  |
| `space.identifier` | string |  |  |
| `space.name` | string |  |  |
| `space.is_archived` | number |  |  |
| `space.is_deleted` | number |  |  |
| `type` | string | 是 | 空间成员的类型；枚举："user" / "user_group" |
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
  "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e/members/a0417f68e846aae315c85d24643678a9",
  "space": {
    "id": "642fd641209b56920a6c6e5e",
    "url": "https://{rest_api_root}/v2/wiki/spaces/642fd641209b56920a6c6e5e",
    "identifier": "DEMO",
    "name": "示例空间",
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

## 页面

> 分组路径：知识管理 / 页面

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/wiki/pages` | [创建一个页面](#post-v2-wiki-pages) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/wiki/pages/{page_id}` | [获取一个页面](#get-v2-wiki-pages-page-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/wiki/pages/{page_id}` | [部分更新一个页面](#patch-v2-wiki-pages-page-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/wiki/pages` | [获取页面列表](#get-v2-wiki-pages) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/wiki/pages/{page_id}` | [删除一个页面](#delete-v2-wiki-pages-page-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/wiki/pages/{page_id}/content` | [获取一个文档正文](#get-v2-wiki-pages-page-id-content) | 企业令牌 / 用户令牌 |
| `PUT` | `/v2/wiki/pages/{page_id}/content` | [更新一个文档正文](#put-v2-wiki-pages-page-id-content) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/wiki/pages/{page_id}/versions/{version_id}` | [获取一个页面版本](#get-v2-wiki-pages-page-id-versions-version-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/wiki/pages/{page_id}/versions` | [获取页面版本列表](#get-v2-wiki-pages-page-id-versions) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/wiki/pages/{page_id}/versions/{version_id}/restore` | [恢复一个页面版本](#post-v2-wiki-pages-page-id-versions-version-id-restore) | 企业令牌 / 用户令牌 |

<a id="post-v2-wiki-pages"></a>

### 创建一个页面

`POST /v2/wiki/pages` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:wiki:page`

用于创建一个页面。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `space_id` | string | 是 | 空间的 id |
| `name` | string | 是 | 页面的名称 |
| `parent_id` | string |  | 父页面的 id |
| `content` | string \| object[] |  | 页面的内容。`format_type` 为 `text`/`markdown`/`html` 时为字符串；为 `block` 时为块文档数组（与「获取一个文档正文」返回的 `block` 结构一致） |
| `format_type` | string |  | 页面内容的格式。content 和 format_type 字段必须同时传递；枚举："text" / "markdown" / "html" / "block" |

**请求示例**

```json
{
  "space_id": "63e1bf51760505c8795ebcc8",
  "name": "示例页面",
  "parent_id": "63e1bf51760505c8795ebcce",
  "content": "空间是记录信息和知识的页面集合，通过组织页面层级将知识系统化、结构化，便于团队沉淀经验、共享资源，实现知识增值，加快知识流动，在知识管理层面助力企业更快更好的发布产品。 PingCode 空间支持以下特性： 页面支持插入多种元素以及关联页面，满足编写需要 编辑过程自动保存草稿，无需担心内容丢失 提供丰富的模板，使用模板保持页面的一致性，让空间更加规范 使用锁定功能锁定页面最终版本 删除的页面放进回收站，随时恢复 树状页面结构，直接拖动页面编排目录，让知识管理更方便高效 通过设置成员角色来进行权限控制 通过页面评论实现成员沟通交流，形成反馈闭环  【PingCode 空间】当前处于不断迭代过程中，更多功能即将呈现，敬请期待~",
  "format_type": "text"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 页面的 id |
| `url` | string | 是 | 页面的资源地址 |
| `short_id` | string | 是 | 页面的短 id |
| `html_url` | string | 是 | 页面的 html 地址 |
| `space` | object | 是 | 所属空间的引用结构数据 |
| `space.id` | string |  |  |
| `space.url` | string |  |  |
| `space.name` | string |  |  |
| `space.identifier` | string |  |  |
| `space.is_archived` | number |  |  |
| `space.is_deleted` | number |  |  |
| `name` | string | 是 | 页面的名称 |
| `type` | string | 是 | 页面的类型；枚举："document" / "group" |
| `parent` | object |  | 父页面的引用结构数据 |
| `parent.id` | string |  |  |
| `parent.url` | string |  |  |
| `parent.short_id` | string |  |  |
| `parent.html_url` | string |  |  |
| `parent.name` | string |  |  |
| `parent.type` | string |  |  |
| `icon` | string | 是 | 页面的图标 |
| `reading` | number | 是 | 页面的阅读量 |
| `published_at` | number | 是 | 页面的发布时间，单位为秒 |
| `published_by` | object | 是 | 发布人的引用结构数据 |
| `published_by.id` | string |  |  |
| `published_by.url` | string |  |  |
| `published_by.name` | string |  |  |
| `published_by.display_name` | string |  |  |
| `published_by.avatar` | string |  |  |
| `tags` | object[] | 是 | 页面标签列表 |
| `participants` | object[] | 是 | 页面关注人列表 |
| `participants[].id` | string |  |  |
| `participants[].url` | string |  |  |
| `participants[].type` | string |  |  |
| `participants[].user` | object |  |  |
| `participants[].user.id` | string |  |  |
| `participants[].user.url` | string |  |  |
| `participants[].user.name` | string |  |  |
| `participants[].user.display_name` | string |  |  |
| `participants[].user.avatar` | string |  |  |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `position` | number | 是 | 页面在同级中的排序位置 |
| `created_at` | number | 是 | 创建时间，单位为秒 |
| `created_by` | object | 是 | 创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 更新时间，单位为秒 |
| `updated_by` | object | 是 | 更新人的引用结构数据 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |
| `is_locked` | number | 是 | 是否锁定页面；枚举：0 / 1 |
| `is_archived` | number | 是 | 是否已归档；枚举：0 / 1 |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "63e1bf51760505c8795ebccc",
  "url": "https://{rest_api_root}/v2/wiki/pages/63e1bf51760505c8795ebccc",
  "short_id": "5-x6NN",
  "html_url": "https://yctech.pingcode.com/wiki/pages/5-x6NN",
  "space": {
    "id": "63e1bf51760505c8795ebcc8",
    "url": "https://{rest_api_root}/v2/wiki/spaces/63e1bf51760505c8795ebcc8",
    "name": "示例空间",
    "identifier": "DEMO",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "示例页面",
  "type": "document",
  "parent": {
    "id": "63e1bf51760505c8795ebcce",
    "url": "https://{rest_api_root}/v2/wiki/pages/63e1bf51760505c8795ebcce",
    "short_id": "c-x6NN",
    "html_url": "https://yctech.pingcode.com/wiki/pages/c-x6NN",
    "name": "模板",
    "type": "document"
  },
  "icon": "file-fill",
  "reading": 0,
  "published_at": 1675738962,
  "published_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "tags": [],
  "participants": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=page&principal_id=63e1bf51760505c8795ebccc",
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
  "entity_properties": {
    "entity_property_key_a": {
      "score": 95,
      "risk": "low"
    },
    "entity_property_key_b": "123456"
  },
  "position": 65536,
  "created_at": 1675738962,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1675738962,
  "updated_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "is_locked": 0,
  "is_archived": 0,
  "is_deleted": 0
}
```

<a id="get-v2-wiki-pages-page-id"></a>

### 获取一个页面

`GET /v2/wiki/pages/{page_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:wiki:page`

用于按 id 或 short_id 获取页面全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_id` | string | 是 | 页面的 id 或 short_id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的页面。该值默认为`false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 页面的 id |
| `url` | string | 是 | 页面的资源地址 |
| `short_id` | string | 是 | 页面的短 id |
| `html_url` | string | 是 | 页面的 html 地址 |
| `space` | object | 是 | 所属空间的引用结构数据 |
| `space.id` | string |  |  |
| `space.url` | string |  |  |
| `space.name` | string |  |  |
| `space.identifier` | string |  |  |
| `space.is_archived` | number |  |  |
| `space.is_deleted` | number |  |  |
| `name` | string | 是 | 页面的名称 |
| `type` | string | 是 | 页面的类型；枚举："document" / "group" |
| `parent` | object |  | 父页面的引用结构数据 |
| `parent.id` | string |  |  |
| `parent.url` | string |  |  |
| `parent.short_id` | string |  |  |
| `parent.html_url` | string |  |  |
| `parent.name` | string |  |  |
| `parent.type` | string |  |  |
| `icon` | string | 是 | 页面的图标 |
| `reading` | number | 是 | 页面的阅读量 |
| `published_at` | number | 是 | 页面的发布时间，单位为秒 |
| `published_by` | object | 是 | 发布人的引用结构数据 |
| `published_by.id` | string |  |  |
| `published_by.url` | string |  |  |
| `published_by.name` | string |  |  |
| `published_by.display_name` | string |  |  |
| `published_by.avatar` | string |  |  |
| `tags` | object[] | 是 | 页面标签列表 |
| `participants` | object[] | 是 | 页面关注人列表 |
| `participants[].id` | string |  |  |
| `participants[].url` | string |  |  |
| `participants[].type` | string |  |  |
| `participants[].user` | object |  |  |
| `participants[].user.id` | string |  |  |
| `participants[].user.url` | string |  |  |
| `participants[].user.name` | string |  |  |
| `participants[].user.display_name` | string |  |  |
| `participants[].user.avatar` | string |  |  |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `position` | number | 是 | 页面在同级中的排序位置 |
| `created_at` | number | 是 | 创建时间，单位为秒 |
| `created_by` | object | 是 | 创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 更新时间，单位为秒 |
| `updated_by` | object | 是 | 更新人的引用结构数据 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |
| `is_locked` | number | 是 | 是否锁定页面；枚举：0 / 1 |
| `is_archived` | number | 是 | 是否已归档；枚举：0 / 1 |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "63e1bf51760505c8795ebccc",
  "url": "https://{rest_api_root}/v2/wiki/pages/63e1bf51760505c8795ebccc",
  "short_id": "5-x6NN",
  "html_url": "https://yctech.pingcode.com/wiki/pages/5-x6NN",
  "space": {
    "id": "63e1bf51760505c8795ebcc8",
    "url": "https://{rest_api_root}/v2/wiki/spaces/63e1bf51760505c8795ebcc8",
    "name": "示例空间",
    "identifier": "DEMO",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "示例页面",
  "type": "document",
  "parent": {
    "id": "63e1bf51760505c8795ebcce",
    "url": "https://{rest_api_root}/v2/wiki/pages/63e1bf51760505c8795ebcce",
    "short_id": "c-x6NN",
    "html_url": "https://yctech.pingcode.com/wiki/pages/c-x6NN",
    "name": "模板",
    "type": "document"
  },
  "icon": "file-fill",
  "reading": 0,
  "published_at": 1675738962,
  "published_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "tags": [],
  "participants": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=page&principal_id=63e1bf51760505c8795ebccc",
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
  "entity_properties": {
    "entity_property_key_a": {
      "score": 95,
      "risk": "low"
    },
    "entity_property_key_b": "123456"
  },
  "position": 65536,
  "created_at": 1675738962,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1675738962,
  "updated_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "is_locked": 0,
  "is_archived": 0,
  "is_deleted": 0
}
```

<a id="patch-v2-wiki-pages-page-id"></a>

### 部分更新一个页面

`PATCH /v2/wiki/pages/{page_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:wiki:page`

用于部分更新一个页面。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_id` | string | 是 | 页面的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 页面的名称 |
| `parent_id` | string |  | 父页面的 id |
| `is_locked` | number |  | 是否锁定页面；枚举：0 / 1 |

**请求示例**

```json
{
  "name": "示例页面 updated",
  "parent_id": "63e1bf51760505c8795ebcce",
  "is_locked": 1
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 页面的 id |
| `url` | string | 是 | 页面的资源地址 |
| `short_id` | string | 是 | 页面的短 id |
| `html_url` | string | 是 | 页面的 html 地址 |
| `space` | object | 是 | 所属空间的引用结构数据 |
| `space.id` | string |  |  |
| `space.url` | string |  |  |
| `space.name` | string |  |  |
| `space.identifier` | string |  |  |
| `space.is_archived` | number |  |  |
| `space.is_deleted` | number |  |  |
| `name` | string | 是 | 页面的名称 |
| `type` | string | 是 | 页面的类型；枚举："document" / "group" |
| `parent` | object |  | 父页面的引用结构数据 |
| `parent.id` | string |  |  |
| `parent.url` | string |  |  |
| `parent.short_id` | string |  |  |
| `parent.html_url` | string |  |  |
| `parent.name` | string |  |  |
| `parent.type` | string |  |  |
| `icon` | string | 是 | 页面的图标 |
| `reading` | number | 是 | 页面的阅读量 |
| `published_at` | number | 是 | 页面的发布时间，单位为秒 |
| `published_by` | object | 是 | 发布人的引用结构数据 |
| `published_by.id` | string |  |  |
| `published_by.url` | string |  |  |
| `published_by.name` | string |  |  |
| `published_by.display_name` | string |  |  |
| `published_by.avatar` | string |  |  |
| `tags` | object[] | 是 | 页面标签列表 |
| `tags[].id` | string |  |  |
| `tags[].url` | string |  |  |
| `tags[].name` | string |  |  |
| `participants` | object[] | 是 | 页面关注人列表 |
| `participants[].id` | string |  |  |
| `participants[].url` | string |  |  |
| `participants[].type` | string |  |  |
| `participants[].user` | object |  |  |
| `participants[].user.id` | string |  |  |
| `participants[].user.url` | string |  |  |
| `participants[].user.name` | string |  |  |
| `participants[].user.display_name` | string |  |  |
| `participants[].user.avatar` | string |  |  |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `position` | number | 是 | 页面在同级中的排序位置 |
| `created_at` | number | 是 | 创建时间，单位为秒 |
| `created_by` | object | 是 | 创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 更新时间，单位为秒 |
| `updated_by` | object | 是 | 更新人的引用结构数据 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |
| `is_locked` | number | 是 | 是否锁定页面；枚举：0 / 1 |
| `is_archived` | number | 是 | 是否已归档；枚举：0 / 1 |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "63e1bf51760505c8795ebccc",
  "url": "https://{rest_api_root}/v2/wiki/pages/63e1bf51760505c8795ebccc",
  "short_id": "5-x6NN",
  "html_url": "https://yctech.pingcode.com/wiki/pages/5-x6NN",
  "space": {
    "id": "63e1bf51760505c8795ebcc8",
    "url": "https://{rest_api_root}/v2/wiki/spaces/63e1bf51760505c8795ebcc8",
    "name": "示例空间",
    "identifier": "DEMO",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "示例页面 updated",
  "type": "document",
  "parent": {
    "id": "63e1bf51760505c8795ebcce",
    "url": "https://{rest_api_root}/v2/wiki/pages/63e1bf51760505c8795ebcce",
    "short_id": "c-x6NN",
    "html_url": "https://yctech.pingcode.com/wiki/pages/c-x6NN",
    "name": "模板",
    "type": "document"
  },
  "icon": "file-fill",
  "reading": 0,
  "published_at": 1675739999,
  "published_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "tags": [
    {
      "id": "69fed72014555f4b0637437a",
      "url": "https://{rest_api_root}/v2/wiki/page_tags/69fed72014555f4b0637437a",
      "name": "标签-1"
    }
  ],
  "participants": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=page&principal_id=63e1bf51760505c8795ebccc",
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
  "entity_properties": {
    "entity_property_key_a": {
      "score": 95,
      "risk": "low"
    },
    "entity_property_key_b": "123456"
  },
  "position": 65536,
  "created_at": 1675738962,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1675739999,
  "updated_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "is_locked": 1,
  "is_archived": 0,
  "is_deleted": 0
}
```

<a id="get-v2-wiki-pages"></a>

### 获取页面列表

`GET /v2/wiki/pages` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:wiki:page`

用于分页获取页面列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `space_id` | string |  | 空间的 id |
| `parent_id` | string |  | 父页面的 id。查询该页面下的直接子页面。与 `ancestor_id` 互斥，只允许传入其中一个 |
| `ancestor_id` | string |  | 祖先页面的 id。查询该页面下的全部子孙页面。与 `parent_id` 互斥，只允许传入其中一个 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 页面全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].short_id` | string |  |  |
| `values[].html_url` | string |  |  |
| `values[].space` | object |  |  |
| `values[].space.id` | string |  |  |
| `values[].space.url` | string |  |  |
| `values[].space.name` | string |  |  |
| `values[].space.identifier` | string |  |  |
| `values[].space.is_archived` | number |  |  |
| `values[].space.is_deleted` | number |  |  |
| `values[].name` | string |  |  |
| `values[].type` | string |  |  |
| `values[].parent` | object |  |  |
| `values[].parent.id` | string |  |  |
| `values[].parent.url` | string |  |  |
| `values[].parent.short_id` | string |  |  |
| `values[].parent.html_url` | string |  |  |
| `values[].parent.name` | string |  |  |
| `values[].parent.type` | string |  |  |
| `values[].icon` | string |  |  |
| `values[].reading` | number |  |  |
| `values[].published_at` | number |  |  |
| `values[].published_by` | object |  |  |
| `values[].published_by.id` | string |  |  |
| `values[].published_by.url` | string |  |  |
| `values[].published_by.name` | string |  |  |
| `values[].published_by.display_name` | string |  |  |
| `values[].published_by.avatar` | string |  |  |
| `values[].tags` | array |  |  |
| `values[].participants` | object[] |  |  |
| `values[].participants[].id` | string |  |  |
| `values[].participants[].url` | string |  |  |
| `values[].participants[].type` | string |  |  |
| `values[].participants[].user` | object |  |  |
| `values[].participants[].user.id` | string |  |  |
| `values[].participants[].user.url` | string |  |  |
| `values[].participants[].user.name` | string |  |  |
| `values[].participants[].user.display_name` | string |  |  |
| `values[].participants[].user.avatar` | string |  |  |
| `values[].entity_properties` | object |  |  |
| `values[].entity_properties.entity_property_key_a` | object |  |  |
| `values[].entity_properties.entity_property_key_a.score` | number |  |  |
| `values[].entity_properties.entity_property_key_a.risk` | string |  |  |
| `values[].entity_properties.entity_property_key_b` | string |  |  |
| `values[].position` | number |  |  |
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
| `values[].is_locked` | number |  |  |
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
      "id": "63e1bf51760505c8795ebccc",
      "url": "https://{rest_api_root}/v2/wiki/pages/63e1bf51760505c8795ebccc",
      "short_id": "5-x6NN",
      "html_url": "https://yctech.pingcode.com/wiki/pages/5-x6NN",
      "space": {
        "id": "63e1bf51760505c8795ebcc8",
        "url": "https://{rest_api_root}/v2/wiki/spaces/63e1bf51760505c8795ebcc8",
        "name": "示例空间",
        "identifier": "DEMO",
        "is_archived": 0,
        "is_deleted": 0
      },
      "name": "示例页面",
      "type": "document",
      "parent": {
        "id": "63e1bf51760505c8795ebcce",
        "url": "https://{rest_api_root}/v2/wiki/pages/63e1bf51760505c8795ebcce",
        "short_id": "c-x6NN",
        "html_url": "https://yctech.pingcode.com/wiki/pages/c-x6NN",
        "name": "模板",
        "type": "document"
      },
      "icon": "file-fill",
      "reading": 0,
      "published_at": 1675738962,
      "published_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "tags": [],
      "participants": [
        {
          "id": "a0417f68e846aae315c85d24643678a9",
          "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=page&principal_id=63e1bf51760505c8795ebccc",
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
      "entity_properties": {
        "entity_property_key_a": {
          "score": 95,
          "risk": "low"
        },
        "entity_property_key_b": "123456"
      },
      "position": 65536,
      "created_at": 1675738962,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "updated_at": 1675738962,
      "updated_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "is_locked": 0,
      "is_archived": 0,
      "is_deleted": 0
    }
  ]
}
```

<a id="delete-v2-wiki-pages-page-id"></a>

### 删除一个页面

`DELETE /v2/wiki/pages/{page_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:wiki:page`

用于按 id 删除一个页面。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_id` | string | 是 | 页面的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 页面的 id |
| `url` | string | 是 | 页面的资源地址 |
| `short_id` | string | 是 | 页面的短 id |
| `html_url` | string | 是 | 页面的 html 地址 |
| `name` | string | 是 | 页面的名称 |
| `type` | string | 是 | 页面的类型；枚举："document" / "group" |
| `space` | object | 是 | 所属空间的引用结构数据 |
| `space.id` | string |  |  |
| `space.url` | string |  |  |
| `space.name` | string |  |  |
| `space.identifier` | string |  |  |
| `space.is_archived` | number |  |  |
| `space.is_deleted` | number |  |  |
| `parent` | object |  | 父页面的引用结构数据 |
| `parent.id` | string |  |  |
| `parent.url` | string |  |  |
| `parent.short_id` | string |  |  |
| `parent.html_url` | string |  |  |
| `parent.name` | string |  |  |
| `parent.type` | string |  |  |
| `icon` | string | 是 | 页面的图标 |
| `reading` | number | 是 | 页面的阅读量 |
| `published_at` | number | 是 | 页面的发布时间，单位为秒 |
| `published_by` | object | 是 | 发布人的引用结构数据 |
| `published_by.id` | string |  |  |
| `published_by.url` | string |  |  |
| `published_by.name` | string |  |  |
| `published_by.display_name` | string |  |  |
| `published_by.avatar` | string |  |  |
| `tags` | object[] | 是 | 页面标签列表 |
| `tags[].id` | string |  |  |
| `tags[].url` | string |  |  |
| `tags[].name` | string |  |  |
| `participants` | object[] | 是 | 页面关注人列表 |
| `participants[].id` | string |  |  |
| `participants[].url` | string |  |  |
| `participants[].type` | string |  |  |
| `participants[].user` | object |  |  |
| `participants[].user.id` | string |  |  |
| `participants[].user.url` | string |  |  |
| `participants[].user.name` | string |  |  |
| `participants[].user.display_name` | string |  |  |
| `participants[].user.avatar` | string |  |  |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `position` | number | 是 | 页面在同级中的排序位置 |
| `created_at` | number | 是 | 创建时间，单位为秒 |
| `created_by` | object | 是 | 创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 更新时间，单位为秒 |
| `updated_by` | object | 是 | 更新人的引用结构数据 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |
| `is_locked` | number | 是 | 是否锁定页面；枚举：0 / 1 |
| `is_archived` | number | 是 | 是否已归档；枚举：0 / 1 |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "63e1bf51760505c8795ebccc",
  "url": "https://{rest_api_root}/v2/wiki/pages/63e1bf51760505c8795ebccc",
  "short_id": "5-x6NN",
  "html_url": "https://yctech.pingcode.com/wiki/pages/5-x6NN",
  "name": "示例页面 updated",
  "type": "document",
  "space": {
    "id": "63e1bf51760505c8795ebcc8",
    "url": "https://{rest_api_root}/v2/wiki/spaces/63e1bf51760505c8795ebcc8",
    "name": "示例空间",
    "identifier": "DEMO",
    "is_archived": 0,
    "is_deleted": 0
  },
  "parent": {
    "id": "63e1bf51760505c8795ebcce",
    "url": "https://{rest_api_root}/v2/wiki/pages/63e1bf51760505c8795ebcce",
    "short_id": "c-x6NN",
    "html_url": "https://yctech.pingcode.com/wiki/pages/c-x6NN",
    "name": "模板",
    "type": "document"
  },
  "icon": "file-fill",
  "reading": 0,
  "published_at": 1675739999,
  "published_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "tags": [
    {
      "id": "69fed72014555f4b0637437a",
      "url": "https://{rest_api_root}/v2/wiki/page_tags/69fed720145555f4b0637437a",
      "name": "标签-1"
    }
  ],
  "participants": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=page&principal_id=63e1bf51760505c8795ebccc",
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
  "entity_properties": {
    "entity_property_key_a": {
      "score": 95,
      "risk": "low"
    },
    "entity_property_key_b": "123456"
  },
  "position": 65536,
  "created_at": 1675738962,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1675739999,
  "updated_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "is_locked": 0,
  "is_archived": 0,
  "is_deleted": 1
}
```

<a id="get-v2-wiki-pages-page-id-content"></a>

### 获取一个文档正文

`GET /v2/wiki/pages/{page_id}/content` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:wiki:page`

用于查看文档正文。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_id` | string | 是 | 页面的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `format_type` | string |  | 正文格式；枚举："text" / "markdown" / "html" / "block" |
| `version_id` | string |  | 页面版本的 id。默认值为页面当前版本的 id |
| `include_public_image_token` | string |  | 包含获取图片资源 token 的属性。仅支持 `content`，参数示例 `content`。仅当 `format_type` 为 `markdown`、`html` 或 `block` 时有效 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 文档正文的 id |
| `url` | string | 是 | 文档正文的资源地址 |
| `format_type` | string | 是 | 正文格式；枚举："text" / "markdown" / "html" / "block" |
| `content` | string \| object[] | 是 | 正文内容。`format_type` 为 `text`/`markdown`/`html` 时为字符串；为 `block` 时为块文档数组 |
| `public_image_token` | string |  | 正文内图片资源的公开预览 token。传参 `include_public_image_token=content` 且 `format_type` 为 `markdown`、`html` 或 `block` 时返回 |

**响应示例**

```json
{
  "id": "65093a8e4d4c8ca623da8fcd",
  "url": "https://{rest_api_root}/v2/wiki/pages/65093a8e4d4c8ca623da8fcd/content?include_public_image_token=content",
  "format_type": "html",
  "content": "空间是记录信息和知识的页面集合，通过组织页面层级将知识系统化、结构化，便于团队沉淀经验、共享资源，实现知识增值，加快知识流动，在知识管理层面助力企业更快更好的发布产品。 PingCode 空间支持以下特性： 页面支持插入多种元素以及关联页面，满足编写需要 编辑过程自动保存草稿，无需担心内容丢失 提供丰富的模板，使用模板保持页面的一致性，让空间更加规范 使用锁定功能锁定页面最终版本 删除的页面放进回收站，随时恢复 树状页面结构，直接拖动页面编排目录，让知识管理更方便高效 通过设置成员角色来进行权限控制 通过页面评论实现成员沟通交流，形成反馈闭环  【PingCode 空间】当前处于不断迭代过程中，更多功能即将呈现，敬请期待~",
  "public_image_token": "N96GlJ4AMQoBCw9pZQ2EMl-AprLN_V_DYlghupBNkJA"
}
```

<a id="put-v2-wiki-pages-page-id-content"></a>

### 更新一个文档正文

`PUT /v2/wiki/pages/{page_id}/content` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:wiki:page`

用于更新文档正文。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_id` | string | 是 | 页面的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `content` | string \| object[] | 是 | 页面的内容。`format_type` 为 `text`/`markdown`/`html` 时为字符串；为 `block` 时为块文档数组（与「获取一个文档正文」返回的 `block` 结构一致） |
| `format_type` | string | 是 | 页面内容的格式；枚举："text" / "markdown" / "html" / "block" |

**请求示例**

```json
{
  "content": "**空间是记录信息和知识的页面集合，通过组织页面层级将知识系统化、结构化，便于团队沉淀经验、共享资源，实现知识增值，加快知识流动，在知识管理层面助力企业更快更好的发布产品。** *PingCode* 空间支持以下特性： 页面支持插入多种元素以及关联页面，满足编写需要 编辑过程自动保存草稿，无需担心内容丢失 提供丰富的模板，使用模板保持页面的一致性，让空间更加规范 使用锁定功能锁定页面最终版本 删除的页面放进回收站，随时恢复 树状页面结构，直接拖动页面编排目录，让知识管理更方便高效 通过设置成员角色来进行权限控制 通过页面评论实现成员沟通交流，形成反馈闭环 **【PingCode 空间】当前处于不断迭代过程中，更多功能即将呈现，敬请期待~**",
  "format_type": "markdown"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 文档正文的 id |
| `url` | string | 是 | 文档正文的资源地址 |
| `format_type` | string | 是 | 正文格式；枚举："text" / "markdown" / "html" / "block" |
| `content` | string \| object[] | 是 | 正文内容 |

**响应示例**

```json
{
  "id": "65093a8e4d4c8ca623da8fcd",
  "url": "https://{rest_api_root}/v2/wiki/pages/65093a8e4d4c8ca623da8fcd/content",
  "format_type": "markdown",
  "content": "**空间是记录信息和知识的页面集合，通过组织页面层级将知识系统化、结构化，便于团队沉淀经验、共享资源，实现知识增值，加快知识流动，在知识管理层面助力企业更快更好的发布产品。** *PingCode* 空间支持以下特性： 页面支持插入多种元素以及关联页面，满足编写需要 编辑过程自动保存草稿，无需担心内容丢失 提供丰富的模板，使用模板保持页面的一致性，让空间更加规范 使用锁定功能锁定页面最终版本 删除的页面放进回收站，随时恢复 树状页面结构，直接拖动页面编排目录，让知识管理更方便高效 通过设置成员角色来进行权限控制 通过页面评论实现成员沟通交流，形成反馈闭环 **【PingCode 空间】当前处于不断迭代过程中，更多功能即将呈现，敬请期待~**"
}
```

<a id="get-v2-wiki-pages-page-id-versions-version-id"></a>

### 获取一个页面版本

`GET /v2/wiki/pages/{page_id}/versions/{version_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:wiki:page`

用于按 id 获取一个页面版本。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_id` | string | 是 | 页面的 id |
| `version_id` | string | 是 | 页面版本的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 页面版本的 id |
| `url` | string | 是 | 页面版本的资源地址 |
| `page` | object | 是 | 所属页面的引用结构数据 |
| `page.id` | string |  |  |
| `page.url` | string |  |  |
| `page.short_id` | string |  |  |
| `page.html_url` | string |  |  |
| `page.name` | string |  |  |
| `page.type` | string |  |  |
| `name` | string | 是 | 页面版本的名称 |
| `order` | number | 是 | 页面版本的序号 |
| `status` | string | 是 | 页面版本的状态；枚举："published" / "draft" |
| `created_at` | number | 是 | 创建时间，单位为秒 |
| `created_by` | object | 是 | 创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |

**响应示例**

```json
{
  "id": "65093abf4d4c8ca623da8fff",
  "url": "https://{rest_api_root}/v2/wiki/pages/65093a8e4d4c8ca623da8fcd/versions/65093abf4d4c8ca623da8fff",
  "page": {
    "id": "65093a8e4d4c8ca623da8fcd",
    "url": "https://{rest_api_root}/v2/wiki/pages/65093a8e4d4c8ca623da8fcd",
    "short_id": "5-x6NN",
    "html_url": "https://yctech.pingcode.com/wiki/pages/5-x6NN",
    "name": "主页",
    "type": "document"
  },
  "name": "v2 恢复自 v1",
  "order": 2,
  "status": "published",
  "created_at": 1695103832,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

<a id="get-v2-wiki-pages-page-id-versions"></a>

### 获取页面版本列表

`GET /v2/wiki/pages/{page_id}/versions` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:wiki:page`

用于分页获取页面版本列表。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_id` | string | 是 | 页面的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 页面版本全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].page` | object |  |  |
| `values[].page.id` | string |  |  |
| `values[].page.url` | string |  |  |
| `values[].page.short_id` | string |  |  |
| `values[].page.html_url` | string |  |  |
| `values[].page.name` | string |  |  |
| `values[].page.type` | string |  |  |
| `values[].name` | string |  |  |
| `values[].order` | number |  |  |
| `values[].status` | string |  |  |
| `values[].created_at` | number |  |  |
| `values[].created_by` | object |  |  |
| `values[].created_by.id` | string |  |  |
| `values[].created_by.url` | string |  |  |
| `values[].created_by.name` | string |  |  |
| `values[].created_by.display_name` | string |  |  |
| `values[].created_by.avatar` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "65093abf4d4c8ca623da8ffe",
      "url": "https://{rest_api_root}/v2/wiki/pages/65093a8e4d4c8ca623da8fcd/versions/65093abf4d4c8ca623da8ffe",
      "page": {
        "id": "65093a8e4d4c8ca623da8fcd",
        "url": "https://{rest_api_root}/v2/wiki/pages/65093a8e4d4c8ca623da8fcd",
        "short_id": "AAx6NN",
        "html_url": "https://yctech.pingcode.com/wiki/pages/AAx6NN",
        "name": "主页",
        "type": "document"
      },
      "name": "v1",
      "order": 1,
      "status": "published",
      "created_at": 1695103679,
      "created_by": {
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

<a id="post-v2-wiki-pages-page-id-versions-version-id-restore"></a>

### 恢复一个页面版本

`POST /v2/wiki/pages/{page_id}/versions/{version_id}/restore` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:wiki:page`

用于基于指定历史版本新建当前版本。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_id` | string | 是 | 页面的 id |
| `version_id` | string | 是 | 页面版本的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 页面版本的 id |
| `url` | string | 是 | 页面版本的资源地址 |
| `page` | object | 是 | 所属页面的引用结构数据 |
| `page.id` | string |  |  |
| `page.url` | string |  |  |
| `page.short_id` | string |  |  |
| `page.html_url` | string |  |  |
| `page.name` | string |  |  |
| `page.type` | string |  |  |
| `name` | string | 是 | 页面版本的名称 |
| `order` | number | 是 | 页面版本的序号 |
| `status` | string | 是 | 页面版本的状态；枚举："published" / "draft" |
| `created_at` | number | 是 | 创建时间，单位为秒 |
| `created_by` | object | 是 | 创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |

**响应示例**

```json
{
  "id": "65093abf4d4c8ca623da8fff",
  "url": "https://{rest_api_root}/v2/wiki/pages/65093a8e4d4c8ca623da8fcd/versions/65093abf4d4c8ca623da8fff",
  "page": {
    "id": "65093a8e4d4c8ca623da8fcd",
    "url": "https://{rest_api_root}/v2/wiki/pages/65093a8e4d4c8ca623da8fcd",
    "short_id": "5-x6NN",
    "html_url": "https://yctech.pingcode.com/wiki/pages/5-x6NN",
    "name": "主页",
    "type": "document"
  },
  "name": "v2 恢复自 v1",
  "order": 2,
  "status": "published",
  "created_at": 1695103832,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```
