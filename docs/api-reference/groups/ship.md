# 产品管理

> 区域 `ship`（产品管理） ｜ 6 个内容分组 ｜ 114 个端点

[← 返回 API 总览](../README.md)

## 产品

> 分组路径：产品管理 / 产品

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/ship/products` | [创建一个产品](#post-v2-ship-products) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/products/{product_id}` | [获取一个产品](#get-v2-ship-products-product-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/ship/products/{product_id}` | [部分更新一个产品](#patch-v2-ship-products-product-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/products` | [获取产品列表](#get-v2-ship-products) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/ship/products/{product_id}/members` | [向产品中添加一个成员](#post-v2-ship-products-product-id-members) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/products/{product_id}/members/{member_id}` | [获取产品中的一个成员](#get-v2-ship-products-product-id-members-member-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/products/{product_id}/members` | [获取产品中的成员列表](#get-v2-ship-products-product-id-members) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/ship/products/{product_id}/members/{member_id}` | [在产品中移除一个成员](#delete-v2-ship-products-product-id-members-member-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/products/{product_id}/ticket_types/{ticket_type_id}` | [获取产品中的一个工单类型](#get-v2-ship-products-product-id-ticket-types-ticket-type-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/products/{product_id}/ticket_types` | [获取产品中的工单类型列表](#get-v2-ship-products-product-id-ticket-types) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/ship/idea_suites` | [创建一个需求模块](#post-v2-ship-idea-suites) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea_suites/{idea_suite_id}` | [获取一个需求模块](#get-v2-ship-idea-suites-idea-suite-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea_suites` | [获取需求模块列表](#get-v2-ship-idea-suites) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/ship/idea_suites/{idea_suite_id}` | [删除一个需求模块](#delete-v2-ship-idea-suites-idea-suite-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/products/{product_id}/idea_plans/{idea_plan_id}` | [获取一个需求计划](#get-v2-ship-products-product-id-idea-plans-idea-plan-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/products/{product_id}/idea_plans` | [获取需求计划列表](#get-v2-ship-products-product-id-idea-plans) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_channels/{ticket_channel_id}` | [获取一个工单渠道](#get-v2-ship-ticket-channels-ticket-channel-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_channels` | [获取工单渠道列表](#get-v2-ship-ticket-channels) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/ship/customers` | [创建一个客户](#post-v2-ship-customers) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/customers/{customer_id}` | [获取一个客户](#get-v2-ship-customers-customer-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/ship/customers/{customer_id}` | [部分更新一个客户](#patch-v2-ship-customers-customer-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/customers` | [获取客户列表](#get-v2-ship-customers) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/ship/products/{product_id}/users` | [创建一个用户](#post-v2-ship-products-product-id-users) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/products/{product_id}/users/{user_id}` | [获取一个用户](#get-v2-ship-products-product-id-users-user-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/ship/products/{product_id}/users/{user_id}` | [部分更新一个用户](#patch-v2-ship-products-product-id-users-user-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/products/{product_id}/users` | [获取用户列表](#get-v2-ship-products-product-id-users) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/ship/products/{product_id}/users/{user_id}` | [删除一个用户](#delete-v2-ship-products-product-id-users-user-id) | 企业令牌 / 用户令牌 |

<a id="post-v2-ship-products"></a>

### 创建一个产品

`POST /v2/ship/products` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:product`

用于创建一个产品。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `scope_type` | string |  | 产品的所属类型。默认值 `organization`。允许值分别表示企业可见和团队可见；枚举："organization" / "user_group" |
| `scope_id` | string |  | 产品的所属 id。当 `scope_type` 为 `user_group` 时，该字段必填，且表示团队 id；当 `scope_type` 为其他值时，该字段无效 |
| `name` | string | 是 | 产品的名称（不超过 32 个字符） |
| `visibility` | string |  | 产品的可见范围。允许值分别表示组织全部成员可见和仅产品成员可见；枚举："public" / "private" |
| `identifier` | string | 是 | 产品的标识。在一个企业中这个标识是唯一的。产品的标识由大写英文字母/数字/下划线/连接线组成（不超过 15 个字符） |
| `description` | string |  | 产品的描述 |
| `members` | object |  | 产品成员的列表 |
| `members.id` | string | 是 | 企业成员或团队的 id |
| `members.type` | string | 是 | 产品成员的类型；枚举："user" / "user_group" |
| `entity_properties` | object |  |  |
| `entity_properties.entity_property_key_a` | object |  |  |
| `entity_properties.entity_property_key_a.score` | number |  |  |
| `entity_properties.entity_property_key_a.risk` | string |  |  |
| `entity_properties.entity_property_key_b` | string |  |  |

**请求示例**

```json
{
  "name": "示例产品",
  "identifier": "SLC",
  "description": "示例产品描述",
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
    },
    {
      "id": "63c8fb32729dee3334d96af7",
      "type": "user_group"
    }
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 产品的 id |
| `url` | string | 是 | 产品的资源地址 |
| `identifier` | string | 是 | 产品的标识 |
| `name` | string | 是 | 产品的名称 |
| `scope_type` | string | 是 | 产品的所属类型；枚举："organization" / "user_group" |
| `scope_id` | string | 是 | 产品的所属 id |
| `visibility` | string | 是 | 产品的可见性；枚举："private" / "public" |
| `color` | string | 是 | 产品的主题色 |
| `description` | string | 是 | 产品的描述 |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `members` | object[] | 是 | 产品的成员列表 |
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
  "id": "6422711c3f12e6c1e46d40e9",
  "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
  "identifier": "SLC",
  "name": "示例产品",
  "visibility": "private",
  "scope_type": "user_group",
  "scope_id": "6422711c3f12e6c1e46d40e9",
  "color": "#FA8888",
  "description": "示例产品描述",
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
      "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9/members/a0417f68e846aae315c85d24643678a9",
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

<a id="get-v2-ship-products-product-id"></a>

### 获取一个产品

`GET /v2/ship/products/{product_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:product`

用于按 id 获取产品全量信息。  
 默认不含已删除/已归档产品。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的产品。该值默认为 `false` |
| `include_archived` | boolean |  | 是否包含已归档的产品。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 产品的 id |
| `url` | string | 是 | 产品的资源地址 |
| `identifier` | string | 是 | 产品的标识 |
| `name` | string | 是 | 产品的名称 |
| `scope_type` | string | 是 | 产品的所属类型；枚举："organization" / "user_group" |
| `scope_id` | string | 是 | 产品的所属 id |
| `visibility` | string | 是 | 产品的可见性；枚举："private" / "public" |
| `color` | string | 是 | 产品的主题色 |
| `description` | string | 是 | 产品的描述 |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `members` | object[] | 是 | 产品的成员列表 |
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
  "id": "6422711c3f12e6c1e46d40e9",
  "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
  "identifier": "SLC",
  "name": "示例产品",
  "scope_type": "user_group",
  "scope_id": "6422711c3f12e6c1e46d40e9",
  "visibility": "private",
  "color": "#FA8888",
  "description": "示例产品描述",
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
      "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9/members/a0417f68e846aae315c85d24643678a9",
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
      "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9/members/63c8fb32729dee3334d96af7",
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

<a id="patch-v2-ship-products-product-id"></a>

### 部分更新一个产品

`PATCH /v2/ship/products/{product_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:product`

用于部分更新一个产品。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 产品的名称（不超过 32 个字符） |
| `identifier` | string |  | 产品的标识。在一个企业中这个标识是唯一的。产品的标识由大写英文字母/数字/下划线/连接线组成（不超过 15 个字符） |
| `description` | string |  | 产品的描述 |

**请求示例**

```json
{
  "name": "示例产品",
  "identifier": "SLC",
  "description": "示例产品描述"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 产品的 id |
| `url` | string | 是 | 产品的资源地址 |
| `identifier` | string | 是 | 产品的标识 |
| `name` | string | 是 | 产品的名称 |
| `scope_type` | string | 是 | 产品的所属类型；枚举："organization" / "user_group" |
| `scope_id` | string | 是 | 产品的所属 id |
| `visibility` | string | 是 | 产品的可见性；枚举："private" / "public" |
| `color` | string | 是 | 产品的主题色 |
| `description` | string | 是 | 产品的描述 |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `members` | object[] | 是 | 产品的成员列表 |
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
  "id": "6422711c3f12e6c1e46d40e9",
  "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
  "identifier": "SLC",
  "name": "示例产品",
  "scope_type": "user_group",
  "scope_id": "6422711c3f12e6c1e46d40e9",
  "visibility": "private",
  "color": "#FA8888",
  "description": "示例产品描述",
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
      "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9/members/a0417f68e846aae315c85d24643678a9",
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
  "updated_at": 1583293300,
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

<a id="get-v2-ship-products"></a>

### 获取产品列表

`GET /v2/ship/products` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:product`

用于分页获取产品。  
 默认不含已删除/已归档项。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `scope_type` | string |  | 产品的所属类型。允许值分别表示企业可见和团队可见；枚举："organization" / "user_group" |
| `scope_id` | string |  | 产品的所属 id。仅支持团队的 id |
| `keywords` | string |  | 关键字。只支持 `name` 关键字搜索 |
| `member_type` | string |  | 产品成员的类型。`member_type` 和 `member_id` 必须同时存在；枚举："user" / "user_group" |
| `member_id` | string |  | 产品成员的 id。值为企业成员或团队的 id。值为企业成员或团队的 id。`member_id` 和 `member_type` 必须同时存在 |
| `created_between` | string |  | 创建时间介于的时间范围，通过','分割起始时间 |
| `updated_between` | string |  | 更新时间介于的时间范围，通过','分割起始时间 |
| `include_deleted` | boolean |  | 是否查询已删除的产品。该值默认为 `false` |
| `include_archived` | boolean |  | 是否查询已归档的产品。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 产品全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].identifier` | string |  |  |
| `values[].name` | string |  |  |
| `values[].visibility` | string |  |  |
| `values[].scope_type` | string |  |  |
| `values[].scope_id` | string |  |  |
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
      "id": "6422711c3f12e6c1e46d40e9",
      "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
      "identifier": "SLC",
      "name": "示例产品",
      "visibility": "private",
      "scope_type": "user_group",
      "scope_id": "6422711c3f12e6c1e46d40e9",
      "color": "#FA8888",
      "description": "示例产品描述",
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
          "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9/members/a0417f68e846aae315c85d24643678a9",
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
          "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9/members/63c8fb32729dee3334d96af7",
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
  ]
}
```

<a id="post-v2-ship-products-product-id-members"></a>

### 向产品中添加一个成员

`POST /v2/ship/products/{product_id}/members` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:product`

用于向产品中添加企业成员或团队。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `member` | object | 是 | 产品的成员 |
| `member.id` | string | 是 | 企业成员或团队的 id |
| `member.type` | string | 是 | 产品成员的类型；枚举："user" / "user_group" |
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
| `id` | string | 是 | 产品成员的 id |
| `url` | string | 是 | 产品成员的资源地址 |
| `product` | object | 是 | 所属产品的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.identifier` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `type` | string | 是 | 产品成员的类型；枚举："user" / "user_group" |
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
  "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9/members/a0417f68e846aae315c85d24643678a9",
  "product": {
    "id": "6422711c3f12e6c1e46d40e9",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
    "name": "示例产品",
    "identifier": "SLC",
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

<a id="get-v2-ship-products-product-id-members-member-id"></a>

### 获取产品中的一个成员

`GET /v2/ship/products/{product_id}/members/{member_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:product`

用于按 id 获取产品成员全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |
| `member_id` | string | 是 | 产品成员的 id，即企业成员或团队的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 产品成员的 id |
| `url` | string | 是 | 产品成员的资源地址 |
| `product` | object | 是 | 所属产品的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.identifier` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `type` | string | 是 | 产品成员的类型；枚举："user" / "user_group" |
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
  "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9/members/a0417f68e846aae315c85d24643678a9",
  "product": {
    "id": "6422711c3f12e6c1e46d40e9",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
    "name": "示例产品",
    "identifier": "SLC",
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

<a id="get-v2-ship-products-product-id-members"></a>

### 获取产品中的成员列表

`GET /v2/ship/products/{product_id}/members` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:product`

用于分页获取产品中的成员。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 产品成员全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].type` | string |  |  |
| `values[].product` | object |  |  |
| `values[].product.id` | string |  |  |
| `values[].product.url` | string |  |  |
| `values[].product.name` | string |  |  |
| `values[].product.identifier` | string |  |  |
| `values[].product.is_archived` | number |  |  |
| `values[].product.is_deleted` | number |  |  |
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
      "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9/members/a0417f68e846aae315c85d24643678a9",
      "type": "user",
      "product": {
        "id": "6422711c3f12e6c1e46d40e9",
        "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
        "name": "示例产品",
        "identifier": "SLC",
        "is_archived": 0,
        "is_deleted": 0
      },
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
      "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9/members/63c8fb32729dee3334d96af7",
      "product": {
        "id": "6422711c3f12e6c1e46d40e9",
        "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
        "name": "示例产品",
        "identifier": "SLC",
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

<a id="delete-v2-ship-products-product-id-members-member-id"></a>

### 在产品中移除一个成员

`DELETE /v2/ship/products/{product_id}/members/{member_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:product`

用于按成员 id 从产品中移除一个成员。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |
| `member_id` | string | 是 | 企业成员或团队的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 产品成员的 id |
| `url` | string | 是 | 产品成员的资源地址 |
| `product` | object | 是 | 所属产品的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.identifier` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `type` | string | 是 | 产品成员的类型；枚举："user" / "user_group" |
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
  "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9/members/a0417f68e846aae315c85d24643678a9",
  "product": {
    "id": "6422711c3f12e6c1e46d40e9",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
    "name": "示例产品",
    "identifier": "SLC",
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

<a id="get-v2-ship-products-product-id-ticket-types-ticket-type-id"></a>

### 获取产品中的一个工单类型

`GET /v2/ship/products/{product_id}/ticket_types/{ticket_type_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取产品中的工单类型全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |
| `ticket_type_id` | string | 是 | 工单类型的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 产品中工单类型关联的 id |
| `url` | string | 是 | 产品中工单类型关联的资源地址 |
| `product` | object | 是 | 产品的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.identifier` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `ticket_type` | object | 是 | 工单类型的引用结构数据 |
| `ticket_type.id` | string |  |  |
| `ticket_type.url` | string |  |  |
| `ticket_type.name` | string |  |  |

**响应示例**

```json
{
  "id": "63bb744214bd13c9def24ca9",
  "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9/ticket_types/63bb744214bd13c9def24ca9",
  "product": {
    "id": "6422711c3f12e6c1e46d40e9",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
    "name": "自动化",
    "identifier": "FLOW",
    "is_archived": 0,
    "is_deleted": 0
  },
  "ticket_type": {
    "id": "63bb744214bd13c9def24ca9",
    "url": "https://{rest_api_root}/v2/ship/ticket_types/63bb744214bd13c9def24ca9",
    "name": "需求"
  }
}
```

<a id="get-v2-ship-products-product-id-ticket-types"></a>

### 获取产品中的工单类型列表

`GET /v2/ship/products/{product_id}/ticket_types` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取产品中的工单类型。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 产品中的工单类型全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].product` | object |  |  |
| `values[].product.id` | string |  |  |
| `values[].product.url` | string |  |  |
| `values[].product.name` | string |  |  |
| `values[].product.identifier` | string |  |  |
| `values[].product.is_archived` | number |  |  |
| `values[].product.is_deleted` | number |  |  |
| `values[].ticket_type` | object |  |  |
| `values[].ticket_type.id` | string |  |  |
| `values[].ticket_type.url` | string |  |  |
| `values[].ticket_type.name` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "63bb744214bd13c9def24ca9",
      "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9/ticket_types/63bb744214bd13c9def24ca9",
      "product": {
        "id": "6422711c3f12e6c1e46d40e9",
        "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
        "name": "自动化",
        "identifier": "FLOW",
        "is_archived": 0,
        "is_deleted": 0
      },
      "ticket_type": {
        "id": "63bb744214bd13c9def24ca9",
        "url": "https://{rest_api_root}/v2/ship/ticket_types/63bb744214bd13c9def24ca9",
        "name": "需求"
      }
    }
  ]
}
```

<a id="post-v2-ship-idea-suites"></a>

### 创建一个需求模块

`POST /v2/ship/idea_suites` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:product`

用于创建一个需求模块。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |
| `name` | string | 是 | 模块名称。需求模块为树形结构，同一层次下的名称不能重复 |
| `type` | string | 是 | 模块类型。允许值分别表示子产品和模块；枚举："product" / "module" |
| `parent_id` | string |  | 父模块的 id |

**请求示例**

```json
{
  "product_id": "6422711c3f12e6c1e46d40e6",
  "name": "技术支持确认",
  "type": "module",
  "parent_id": "63bb744414bd13c9def24ce3"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求模块的 id |
| `url` | string | 是 | 需求模块的资源地址 |
| `product` | object | 是 | 所属产品的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `name` | string | 是 | 需求模块的名称 |
| `type` | string | 是 | 需求模块的类型；枚举："product" / "module" |
| `parent` | object | 是 | 父级需求模块的引用结构数据 |
| `parent.id` | string |  |  |
| `parent.url` | string |  |  |
| `parent.name` | string |  |  |
| `parent.type` | string |  |  |

**响应示例**

```json
{
  "id": "63eca881a0a13a3efc8d49f0",
  "url": "https://{rest_api_root}/v2/ship/idea_suites/63eca881a0a13a3efc8d49f0",
  "product": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "技术支持确认",
  "type": "module",
  "parent": {
    "id": "63bb744414bd13c9def24ce3",
    "url": "https://{rest_api_root}/v2/ship/idea_suites/63bb744414bd13c9def24ce3",
    "name": "父级产品模块",
    "type": "module"
  }
}
```

<a id="get-v2-ship-idea-suites-idea-suite-id"></a>

### 获取一个需求模块

`GET /v2/ship/idea_suites/{idea_suite_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:product`

用于按 id 获取需求模块全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_suite_id` | string | 是 | 需求模块的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求模块的 id |
| `url` | string | 是 | 需求模块的资源地址 |
| `product` | object | 是 | 所属产品的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `name` | string | 是 | 需求模块的名称 |
| `type` | string | 是 | 需求模块的类型；枚举："product" / "module" |
| `parent` | object | 是 | 父级需求模块的引用结构数据 |
| `parent.id` | string |  |  |
| `parent.url` | string |  |  |
| `parent.name` | string |  |  |
| `parent.type` | string |  |  |

**响应示例**

```json
{
  "id": "63eca881a0a13a3efc8d49f0",
  "url": "https://{rest_api_root}/v2/ship/idea_suites/63eca881a0a13a3efc8d49f0",
  "product": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "技术支持确认",
  "type": "module",
  "parent": {
    "id": "63bb744414bd13c9def24ce3",
    "url": "https://{rest_api_root}/v2/ship/idea_suites/63bb744414bd13c9def24ce3",
    "name": "父级产品模块",
    "type": "module"
  }
}
```

<a id="get-v2-ship-idea-suites"></a>

### 获取需求模块列表

`GET /v2/ship/idea_suites` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:product`

用于分页获取需求模块。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 需求模块全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].product` | object |  |  |
| `values[].product.id` | string |  |  |
| `values[].product.url` | string |  |  |
| `values[].product.identifier` | string |  |  |
| `values[].product.name` | string |  |  |
| `values[].product.is_archived` | number |  |  |
| `values[].product.is_deleted` | number |  |  |
| `values[].name` | string |  |  |
| `values[].type` | string |  |  |
| `values[].parent` | object |  |  |
| `values[].parent.id` | string |  |  |
| `values[].parent.url` | string |  |  |
| `values[].parent.name` | string |  |  |
| `values[].parent.type` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "63eca881a0a13a3efc8d49f0",
      "url": "https://{rest_api_root}/v2/ship/idea_suites/63eca881a0a13a3efc8d49f0",
      "product": {
        "id": "6422711c3f12e6c1e46d40e6",
        "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6",
        "identifier": "SLC",
        "name": "示例产品",
        "is_archived": 0,
        "is_deleted": 0
      },
      "name": "技术支持确认",
      "type": "module",
      "parent": {
        "id": "63bb744414bd13c9def24ce3",
        "url": "https://{rest_api_root}/v2/ship/idea_suites/63bb744414bd13c9def24ce3",
        "name": "父级产品模块",
        "type": "module"
      }
    }
  ]
}
```

<a id="delete-v2-ship-idea-suites-idea-suite-id"></a>

### 删除一个需求模块

`DELETE /v2/ship/idea_suites/{idea_suite_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:product`

用于删除一个需求模块。  
 请注意，删除一个模块会自动删除其所有的子模块。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_suite_id` | string | 是 | 模块 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求模块的 id |
| `url` | string | 是 | 需求模块的资源地址 |
| `product` | object | 是 | 所属产品的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `name` | string | 是 | 需求模块的名称 |
| `type` | string | 是 | 需求模块的类型；枚举："product" / "module" |
| `parent` | object | 是 | 父级需求模块的引用结构数据 |
| `parent.id` | string |  |  |
| `parent.url` | string |  |  |
| `parent.name` | string |  |  |
| `parent.type` | string |  |  |

**响应示例**

```json
{
  "id": "63eca881a0a13a3efc8d49f0",
  "url": "https://{rest_api_root}/v2/ship/idea_suites/63eca881a0a13a3efc8d49f0",
  "product": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "技术支持确认",
  "type": "module",
  "parent": {
    "id": "63bb744414bd13c9def24ce3",
    "url": "https://{rest_api_root}/v2/ship/idea_suites/63bb744414bd13c9def24ce3",
    "name": "父级产品模块",
    "type": "module"
  }
}
```

<a id="get-v2-ship-products-product-id-idea-plans-idea-plan-id"></a>

### 获取一个需求计划

`GET /v2/ship/products/{product_id}/idea_plans/{idea_plan_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:product`

用于按 id 获取产品中的需求计划全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |
| `idea_plan_id` | string | 是 | 需求计划的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求计划的 id |
| `url` | string | 是 | 需求计划的资源地址 |
| `product` | object | 是 | 需求计划所属产品的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `name` | string | 是 | 需求计划的名称 |
| `assignee` | object | 是 | 需求计划负责人的引用结构数据 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `start_at` | object | 是 | 需求计划的开始时间，单位为秒 |
| `start_at.date` | number |  |  |
| `start_at.with_time` | number |  |  |
| `end_at` | object | 是 | 需求计划的结束时间，单位为秒 |
| `end_at.date` | number |  |  |
| `end_at.with_time` | number |  |  |

**响应示例**

```json
{
  "id": "63bb744414bd13c9def24ce4",
  "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6/idea_plans/63bb744414bd13c9def24ce4",
  "product": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "账号管理",
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "start_at": {
    "date": 1672704000,
    "with_time": 0
  },
  "end_at": {
    "date": 1672963199,
    "with_time": 0
  }
}
```

<a id="get-v2-ship-products-product-id-idea-plans"></a>

### 获取需求计划列表

`GET /v2/ship/products/{product_id}/idea_plans` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:product`

用于分页获取产品中的需求计划。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 产品中的需求计划全量结构数据的数组 |

**响应示例**

```
        {
            "id": "63bb744414bd13c9def24ce4",
            "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6/idea_plans/63bb744414bd13c9def24ce4",
                "id": "6422711c3f12e6c1e46d40e6",
                "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6",
                "identifier": "SLC",
                "name": "示例产品",
                "is_archived": 0,
                "is_deleted": 0
            },
            "name": "账号管理",
            "assignee": {
                "id": "a0417f68e846aae315c85d24643678a9",
                "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
                "name": "john",
                "display_name": "John",
                "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
            },
            "start_at": { "date": 1672704000, "with_time": 0 },
            "end_at": { "date": 1672963199, "with_time": 0 }
        }
    ]
}
```

<a id="get-v2-ship-ticket-channels-ticket-channel-id"></a>

### 获取一个工单渠道

`GET /v2/ship/ticket_channels/{ticket_channel_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取工单渠道全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_channel_id` | string | 是 | 工单渠道的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单渠道的 id |
| `url` | string | 是 | 工单渠道的资源地址 |
| `name` | string | 是 | 工单渠道的名称 |
| `product` | object | 是 | 工单渠道关联产品的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `description` | string | 是 | 工单渠道的描述 |

**响应示例**

```json
{
  "id": "63eca881a0a13a3efc8d49ed",
  "url": "https://{rest_api_root}/v2/ship/ticket_channels/63eca881a0a13a3efc8d49ed",
  "name": "客户反馈 Web 渠道",
  "product": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  },
  "description": "收集客户反馈意见的 Web 渠道"
}
```

<a id="get-v2-ship-ticket-channels"></a>

### 获取工单渠道列表

`GET /v2/ship/ticket_channels` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取工单渠道。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工单渠道全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].product` | object |  |  |
| `values[].product.id` | string |  |  |
| `values[].product.url` | string |  |  |
| `values[].product.identifier` | string |  |  |
| `values[].product.name` | string |  |  |
| `values[].product.is_archived` | number |  |  |
| `values[].product.is_deleted` | number |  |  |
| `values[].description` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "63eca881a0a13a3efc8d49ed",
      "url": "https://{rest_api_root}/v2/ship/ticket_channels/63eca881a0a13a3efc8d49ed",
      "name": "客户反馈 Web 渠道",
      "product": {
        "id": "6422711c3f12e6c1e46d40e6",
        "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6",
        "identifier": "SLC",
        "name": "示例产品",
        "is_archived": 0,
        "is_deleted": 0
      },
      "description": "收集客户反馈意见的 Web 渠道"
    }
  ]
}
```

<a id="post-v2-ship-customers"></a>

### 创建一个客户

`POST /v2/ship/customers` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:product`

用于创建客户。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |
| `name` | string | 是 | 客户的名称 |
| `assignee_id` | string |  | 客户的负责人 id |
| `scale` | number |  | 客户的规模 |
| `description` | string |  | 客户的描述 |

**请求示例**

```json
{
  "product_id": "6422711c3f12e6c1e46d40e6",
  "name": "上海 XX 新零售有限公司",
  "assignee_id": "a0417f68e846aae315c85d24643678a9",
  "scale": 200,
  "description": "上海 XX 新零售有限公司的描述"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 客户的 id |
| `url` | string | 是 | 客户的资源地址 |
| `product` | object | 是 | 客户关联产品的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `name` | string | 是 | 客户的名称 |
| `assignee` | object | 是 | 客户负责人的引用结构数据 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `scale` | number | 是 | 客户的规模 |
| `description` | string | 是 | 客户的描述 |
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
| `is_archived` | number | 是 | 是否已归档 |
| `is_deleted` | number | 是 | 是否已删除 |

**响应示例**

```json
{
  "id": "64dd899e3f6383ba72ec2a0d",
  "url": "https://{rest_api_root}/v2/ship/customers/64dd899e3f6383ba72ec2a0d",
  "product": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "上海 XX 新零售有限公司",
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "scale": 200,
  "description": "上海 XX 新零售有限公司的描述",
  "created_at": 1692240286,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1692240286,
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

<a id="get-v2-ship-customers-customer-id"></a>

### 获取一个客户

`GET /v2/ship/customers/{customer_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:product`

用于按 id 获取客户全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `customer_id` | string | 是 | 客户的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 客户的 id |
| `url` | string | 是 | 客户的资源地址 |
| `product` | object | 是 | 客户关联产品的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `name` | string | 是 | 客户的名称 |
| `assignee` | object | 是 | 客户负责人的引用结构数据 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `scale` | number | 是 | 客户的规模 |
| `description` | string | 是 | 客户的描述 |
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
| `is_archived` | number | 是 | 是否已归档 |
| `is_deleted` | number | 是 | 是否已删除 |

**响应示例**

```json
{
  "id": "64dd899e3f6383ba72ec2a0d",
  "url": "https://{rest_api_root}/v2/ship/customers/64dd899e3f6383ba72ec2a0d",
  "product": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "上海 XX 新零售有限公司",
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "scale": 200,
  "description": "上海 XX 新零售有限公司的描述",
  "created_at": 1692240286,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1692240286,
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

<a id="patch-v2-ship-customers-customer-id"></a>

### 部分更新一个客户

`PATCH /v2/ship/customers/{customer_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:product`

用于部分更新一个客户。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `customer_id` | string | 是 | 客户的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 客户的名称 |
| `assignee_id` | string |  | 客户的负责人 id |
| `scale` | number |  | 客户的规模 |
| `description` | string |  | 客户的描述 |

**请求示例**

```json
{
  "name": "上海 XX 新零售有限公司",
  "assignee_id": "a0417f68e846aae315c85d24643678a9",
  "scale": 200,
  "description": "上海 XX 新零售有限公司的描述"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 客户的 id |
| `url` | string | 是 | 客户的资源地址 |
| `product` | object | 是 | 客户关联产品的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `name` | string | 是 | 客户的名称 |
| `assignee` | object | 是 | 客户负责人的引用结构数据 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `scale` | number | 是 | 客户的规模 |
| `description` | string | 是 | 客户的描述 |
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
| `is_archived` | number | 是 | 是否已归档 |
| `is_deleted` | number | 是 | 是否已删除 |

**响应示例**

```json
{
  "id": "64dd899e3f6383ba72ec2a0d",
  "url": "https://{rest_api_root}/v2/ship/customers/64dd899e3f6383ba72ec2a0d",
  "product": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "上海 XX 新零售有限公司",
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "scale": 200,
  "description": "上海 XX 新零售有限公司的描述",
  "created_at": 1692240286,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1692241286,
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

<a id="get-v2-ship-customers"></a>

### 获取客户列表

`GET /v2/ship/customers` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:product`

用于分页获取客户。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 客户全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].product` | object |  |  |
| `values[].product.id` | string |  |  |
| `values[].product.url` | string |  |  |
| `values[].product.identifier` | string |  |  |
| `values[].product.name` | string |  |  |
| `values[].product.is_archived` | number |  |  |
| `values[].product.is_deleted` | number |  |  |
| `values[].name` | string |  |  |
| `values[].assignee` | object |  |  |
| `values[].assignee.id` | string |  |  |
| `values[].assignee.url` | string |  |  |
| `values[].assignee.name` | string |  |  |
| `values[].assignee.display_name` | string |  |  |
| `values[].assignee.avatar` | string |  |  |
| `values[].scale` | number |  |  |
| `values[].description` | string |  |  |
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
      "id": "64dd899e3f6383ba72ec2a0d",
      "url": "https://{rest_api_root}/v2/ship/customers/64dd899e3f6383ba72ec2a0d",
      "product": {
        "id": "6422711c3f12e6c1e46d40e6",
        "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6",
        "identifier": "SLC",
        "name": "示例产品",
        "is_archived": 0,
        "is_deleted": 0
      },
      "name": "上海 XX 新零售有限公司",
      "assignee": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "scale": 200,
      "description": "上海 XX 新零售有限公司的描述",
      "created_at": 1692240286,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "updated_at": 1692240286,
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

<a id="post-v2-ship-products-product-id-users"></a>

### 创建一个用户

`POST /v2/ship/products/{product_id}/users` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:product`

用于在产品中创建用户。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `type` | string |  | 用户类型。internal 为内部用户，external 为外部用户；枚举："internal" / "external" |
| `user_id` | string |  | type 为 internal 时必填，企业成员的用户 id |
| `name` | string |  | 用户的名称。type 为 external 时必填 |
| `email` | string |  | 外部用户的邮箱地址，type 为 external 时邮箱与手机号其中一个必填 |
| `mobile` | string |  | 外部用户的手机号，type 为 external 时邮箱与手机号其中一个必填，若同时存在以手机号为准 |
| `customer_id` | string |  | 用户所属客户的 id |

**请求示例 1：外部用户请求示例**

```json
{
  "name": "jack",
  "email": "jack@email.com",
  "customer_id": "64dd899e3f6383ba72ec2a01"
}
```

**请求示例 2：内部用户请求示例**

```json
{
  "type": "internal",
  "user_id": "a0417f68e846aae315c85d24643678a9"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用户的 id |
| `url` | string | 是 | 用户的资源地址 |
| `name` | string | 是 | 用户的名称 |
| `display_name` | string | 是 | 用户的显示名称 |
| `avatar` | string | 是 | 用户的头像 |
| `email` | string | 是 | 用户的邮箱地址 |
| `mobile` | string | 是 | 用户的手机号 |
| `product` | object | 是 | 用户关联产品的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `customer` | object | 是 | 用户所属客户的引用结构数据 |
| `customer.id` | string |  |  |
| `customer.url` | string |  |  |
| `customer.name` | string |  |  |
| `type` | string | 是 | 用户类型；枚举："internal" / "external" |

**响应示例**

```json
{
  "id": "64a2b61c3a12e6c2e46d41e9",
  "url": "https://{rest_api_root}/v2/ship/products/64a2b61c3a12e6c2e46d41e9/users/64a2b61c3a12e6c2e46d41e9",
  "name": "jack",
  "display_name": "Jack",
  "avatar": "https://s3.amazonaws.com/bucket/a46ef40c-e21e-48cf-a579-cace9fba839a_160x160.png",
  "email": "jack@email.com",
  "mobile": null,
  "type": "external",
  "product": {
    "id": "6422711c3f12e6c1e46d40e9",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  },
  "customer": {
    "id": "64dd899e3f6383ba72ec2a01",
    "url": "https://{rest_api_root}/v2/ship/customers/64dd899e3f6383ba72ec2a01",
    "name": "深圳 XX 新零售有限公司"
  }
}
```

<a id="get-v2-ship-products-product-id-users-user-id"></a>

### 获取一个用户

`GET /v2/ship/products/{product_id}/users/{user_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:product`

用于按 id 获取产品中的用户全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |
| `user_id` | string | 是 | 用户的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用户的 id |
| `url` | string | 是 | 用户的资源地址 |
| `name` | string | 是 | 用户的名称 |
| `display_name` | string | 是 | 用户的显示名称 |
| `avatar` | string | 是 | 用户的头像 |
| `email` | string | 是 | 用户的邮箱地址 |
| `mobile` | string | 是 | 用户的手机号 |
| `product` | object | 是 | 用户关联产品的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `customer` | object | 是 | 用户所属客户的引用结构数据 |
| `customer.id` | string |  |  |
| `customer.url` | string |  |  |
| `customer.name` | string |  |  |
| `type` | string | 是 | 用户类型；枚举："internal" / "external" |

**响应示例**

```json
{
  "id": "64a2b61c3a12e6c2e46d41e9",
  "url": "https://{rest_api_root}/v2/ship/products/64a2b61c3a12e6c2e46d41e9/users/64a2b61c3a12e6c2e46d41e9",
  "name": "jack",
  "display_name": "Jack",
  "avatar": "https://s3.amazonaws.com/bucket/a46ef40c-e21e-48cf-a579-cace9fba839a_160x160.png",
  "email": "jack@email.com",
  "mobile": null,
  "type": "external",
  "product": {
    "id": "6422711c3f12e6c1e46d40e9",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  },
  "customer": {
    "id": "64dd899e3f6383ba72ec2a01",
    "url": "https://{rest_api_root}/v2/ship/customers/64dd899e3f6383ba72ec2a01",
    "name": "深圳 XX 新零售有限公司"
  }
}
```

<a id="patch-v2-ship-products-product-id-users-user-id"></a>

### 部分更新一个用户

`PATCH /v2/ship/products/{product_id}/users/{user_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:product`

用于部分更新一个用户。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |
| `user_id` | string | 是 | 用户的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `customer_id` | string |  | 用户所属客户的 id |

**请求示例**

```json
{
  "customer_id": "64dd899e3f6383ba72ec2a01"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用户的 id |
| `url` | string | 是 | 用户的资源地址 |
| `name` | string | 是 | 用户的名称 |
| `display_name` | string | 是 | 用户的显示名称 |
| `avatar` | string | 是 | 用户的头像 |
| `email` | string | 是 | 用户的邮箱地址 |
| `mobile` | string | 是 | 用户的手机号 |
| `product` | object | 是 | 用户关联产品的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `customer` | object | 是 | 用户所属客户的引用结构数据 |
| `customer.id` | string |  |  |
| `customer.url` | string |  |  |
| `customer.name` | string |  |  |
| `type` | string | 是 | 用户类型；枚举："internal" / "external" |

**响应示例**

```json
{
  "id": "64a2b61c3a12e6c2e46d41e9",
  "url": "https://{rest_api_root}/v2/ship/products/64a2b61c3a12e6c2e46d41e9/users/64a2b61c3a12e6c2e46d41e9",
  "name": "jack",
  "display_name": "Jack",
  "avatar": "https://s3.amazonaws.com/bucket/a46ef40c-e21e-48cf-a579-cace9fba839a_160x160.png",
  "email": "jack@email.com",
  "mobile": null,
  "type": "external",
  "product": {
    "id": "6422711c3f12e6c1e46d40e9",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  },
  "customer": {
    "id": "64dd899e3f6383ba72ec2a01",
    "url": "https://{rest_api_root}/v2/ship/customers/64dd899e3f6383ba72ec2a01",
    "name": "深圳 XX 新零售有限公司"
  }
}
```

<a id="get-v2-ship-products-product-id-users"></a>

### 获取用户列表

`GET /v2/ship/products/{product_id}/users` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:product`

用于分页获取产品中的用户。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 用户全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].display_name` | string |  |  |
| `values[].avatar` | string |  |  |
| `values[].email` | string |  |  |
| `values[].mobile` | null |  |  |
| `values[].type` | string |  |  |
| `values[].product` | object |  |  |
| `values[].product.id` | string |  |  |
| `values[].product.url` | string |  |  |
| `values[].product.identifier` | string |  |  |
| `values[].product.name` | string |  |  |
| `values[].product.is_archived` | number |  |  |
| `values[].product.is_deleted` | number |  |  |
| `values[].customer` | object |  |  |
| `values[].customer.id` | string |  |  |
| `values[].customer.url` | string |  |  |
| `values[].customer.name` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "64a2b61c3a12e6c2e46d41e9",
      "url": "https://{rest_api_root}/v2/ship/products/64a2b61c3a12e6c2e46d41e9/users/64a2b61c3a12e6c2e46d41e9",
      "name": "jack",
      "display_name": "Jack",
      "avatar": "https://s3.amazonaws.com/bucket/a46ef40c-e21e-48cf-a579-cace9fba839a_160x160.png",
      "email": "jack@email.com",
      "mobile": null,
      "type": "external",
      "product": {
        "id": "6422711c3f12e6c1e46d40e9",
        "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
        "identifier": "SLC",
        "name": "示例产品",
        "is_archived": 0,
        "is_deleted": 0
      },
      "customer": {
        "id": "64dd899e3f6383ba72ec2a01",
        "url": "https://{rest_api_root}/v2/ship/customers/64dd899e3f6383ba72ec2a01",
        "name": "深圳 XX 新零售有限公司"
      }
    }
  ]
}
```

<a id="delete-v2-ship-products-product-id-users-user-id"></a>

### 删除一个用户

`DELETE /v2/ship/products/{product_id}/users/{user_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:product`

用于按 id 删除产品中的用户。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |
| `user_id` | string | 是 | 用户的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 用户的 id |
| `url` | string | 是 | 用户的资源地址 |
| `name` | string | 是 | 用户的名称 |
| `display_name` | string | 是 | 用户的显示名称 |
| `avatar` | string | 是 | 用户的头像 |
| `email` | string | 是 | 用户的邮箱地址 |
| `mobile` | string | 是 | 用户的手机号 |
| `product` | object | 是 | 用户关联产品的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `customer` | object | 是 | 用户所属客户的引用结构数据 |
| `customer.id` | string |  |  |
| `customer.url` | string |  |  |
| `customer.name` | string |  |  |
| `type` | string | 是 | 用户类型；枚举："internal" / "external" |

**响应示例**

```json
{
  "id": "64a2b61c3a12e6c2e46d41e9",
  "url": "https://{rest_api_root}/v2/ship/products/64a2b61c3a12e6c2e46d41e9/users/64a2b61c3a12e6c2e46d41e9",
  "name": "jack",
  "display_name": "Jack",
  "avatar": "https://s3.amazonaws.com/bucket/a46ef40c-e21e-48cf-a579-cace9fba839a_160x160.png",
  "email": "jack@email.com",
  "mobile": null,
  "type": "external",
  "product": {
    "id": "6422711c3f12e6c1e46d40e9",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  },
  "customer": {
    "id": "64dd899e3f6383ba72ec2a01",
    "url": "https://{rest_api_root}/v2/ship/customers/64dd899e3f6383ba72ec2a01",
    "name": "深圳 XX 新零售有限公司"
  }
}
```

## 工单

> 分组路径：产品管理 / 工单

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/ship/tickets` | [创建一个工单](#post-v2-ship-tickets) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/tickets/{ticket_id}` | [获取一个工单](#get-v2-ship-tickets-ticket-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/ship/tickets/{ticket_id}` | [部分更新一个工单](#patch-v2-ship-tickets-ticket-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/tickets` | [获取工单列表](#get-v2-ship-tickets) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/ship/tickets/search` | [搜索工单列表](#post-v2-ship-tickets-search) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket/ticket_types` | [获取可用的工单类型列表](#get-v2-ship-ticket-ticket-types) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket/ticket_states` | [获取可用的工单状态列表](#get-v2-ship-ticket-ticket-states) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket/ticket_properties` | [获取可用的工单属性列表](#get-v2-ship-ticket-ticket-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket/ticket_channels` | [获取可用的工单渠道列表](#get-v2-ship-ticket-ticket-channels) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket/ticket_priorities` | [获取可用的工单优先级列表](#get-v2-ship-ticket-ticket-priorities) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket/ticket_solutions` | [获取可用的工单解决方案列表](#get-v2-ship-ticket-ticket-solutions) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket/tags` | [获取可用的工单标签列表](#get-v2-ship-ticket-tags) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/tickets/{ticket_id}/transition_histories/{transition_history_id}` | [获取一条工单流转记录](#get-v2-ship-tickets-ticket-id-transition-histories-transition-history-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/tickets/{ticket_id}/transition_histories` | [获取工单流转记录列表](#get-v2-ship-tickets-ticket-id-transition-histories) | 企业令牌 / 用户令牌 |

<a id="post-v2-ship-tickets"></a>

### 创建一个工单

`POST /v2/ship/tickets` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:ticket`

用于创建一个工单。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 工单的产品 id |
| `title` | string | 是 | 工单的标题，最大长度为 255 |
| `type_id` | string | 是 | 工单的类型 id，您可以在 “获取工单类型列表” API 获取 |
| `description` | string |  | 工单的描述 |
| `submitter_id` | string |  | 工单的提交人 id，企业授权时，该值有效；个人鉴权时，指定无效 |
| `company_id` | string |  | 工单的客户 id，您可以在 “获取产品客户列表” API 获取 |
| `channel_id` | string |  | 工单的渠道 id，您可以在 “获取渠道列表” API 获取 |
| `assignee_id` | string |  | 工单的负责人 id |
| `priority_id` | string |  | 工单的优先级 id，您可以在 “获取工单优先级列表” API 获取 |
| `properties` | object |  | 工单的自定义属性 |

**请求示例**

```json
{
  "product_id": "6422711c3f12e6c1e46d40e9",
  "title": "希望新增支持第三方账号注册",
  "type_id": "63eca880a0a13a3efc8d49e0",
  "description": "<p>希望支持其他更多第三方平台的账号注册，以便用第三方账号登录找回更换了手机号的账号，保障账号安全</p>",
  "submitter_id": "a0417f68e846aae315c85d24643678a9",
  "company_id": "63eca881a0a13a3efc8d49fc",
  "channel_id": "64550d9ec696b249b5fc607d",
  "assignee_id": "a0417f68e846aae315c85d24643678a9",
  "priority_id": "5cb9466afda1ce4ca0090004",
  "properties": {
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value"
  }
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单的 id |
| `url` | string | 是 | 工单的资源地址 |
| `short_id` | string | 是 | 工单的短 id |
| `html_url` | string | 是 | 工单的 html 地址 |
| `product` | object | 是 | 工单的所属产品 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `identifier` | number | 是 | 工单的编号 |
| `whole_identifier` | string | 是 | 工单的完整编号 |
| `title` | string | 是 | 工单的标题 |
| `assignee` | object | 是 | 工单的负责人 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `state` | object | 是 | 工单的状态 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `type` | object | 是 | 工单的类型 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `company` | object | 是 | 工单的客户 |
| `company.id` | string |  |  |
| `company.url` | string |  |  |
| `company.name` | string |  |  |
| `solution` | object | 是 | 工单的解决方案 |
| `solution.id` | string |  |  |
| `solution.url` | string |  |  |
| `solution.name` | string |  |  |
| `priority` | object | 是 | 工单的优先级 |
| `priority.url` | string |  |  |
| `priority.id` | string |  |  |
| `priority.name` | string |  |  |
| `priority.color` | string |  |  |
| `channel` | object \| string | 是 | 工单的渠道。外部渠道提交的工单的渠道是 Object 类型，内部工单的渠道是 `internal` 字符串 |
| `channel.id` | string |  |  |
| `channel.url` | string |  |  |
| `channel.name` | string |  |  |
| `description` | string | 是 | 工单的描述 |
| `properties` | object | 是 | 工单的自定义属性 |
| `properties.prop_a` | string |  |  |
| `properties.prop_b` | string |  |  |
| `estimated_at` | object | 是 | 工单的预计时间 |
| `tags` | object[] | 是 | 工单的标签列表 |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `participants` | object[] | 是 | 工单的关注人列表 |
| `participants[].id` | string |  |  |
| `participants[].url` | string |  |  |
| `participants[].type` | string |  |  |
| `participants[].user` | object |  |  |
| `participants[].user.id` | string |  |  |
| `participants[].user.url` | string |  |  |
| `participants[].user.name` | string |  |  |
| `participants[].user.display_name` | string |  |  |
| `participants[].user.avatar` | string |  |  |
| `participants[].user_group` | object |  |  |
| `participants[].user_group.id` | string |  |  |
| `participants[].user_group.url` | string |  |  |
| `participants[].user_group.name` | string |  |  |
| `submitter` | object | 是 | 工单的提交人 |
| `submitter.id` | string |  |  |
| `submitter.url` | string |  |  |
| `submitter.name` | string |  |  |
| `submitter.display_name` | string |  |  |
| `submitter.avatar` | string |  |  |
| `completed_at` | number | 是 | 工单的完成时间 |
| `completed_by` | object | 是 | 工单的完成人 |
| `completed_by.id` | string |  |  |
| `completed_by.url` | string |  |  |
| `completed_by.name` | string |  |  |
| `completed_by.display_name` | string |  |  |
| `completed_by.avatar` | string |  |  |
| `created_at` | number | 是 | 工单的创建时间 |
| `created_by` | object | 是 | 工单的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 工单的更新时间 |
| `updated_by` | object | 是 | 工单的更新人 |
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
  "id": "63eca888a0a13a3efc8d4a43",
  "url": "https://{rest_api_root}/v2/ship/tickets/63eca888a0a13a3efc8d4a43",
  "short_id": "pdMUgQzZ",
  "html_url": "https://yctech.pingcode.com/ship/tickets/pdMUgQzZ",
  "product": {
    "id": "6422711c3f12e6c1e46d40e9",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  },
  "identifier": 1,
  "whole_identifier": "SLC-T1",
  "title": "希望新增支持第三方账号注册",
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "state": {
    "id": "63eca880a0a13a3efc8d49d9",
    "url": "https://{rest_api_root}/v2/ship/ticket_states/63eca880a0a13a3efc8d49d9",
    "name": "待处理",
    "type": "pending"
  },
  "type": {
    "id": "63eca880a0a13a3efc8d49e0",
    "url": "https://{rest_api_root}/v2/ship/ticket_types/63eca880a0a13a3efc8d49e0",
    "name": "需求"
  },
  "company": {
    "id": "63eca881a0a13a3efc8d49fc",
    "url": "https://{rest_api_root}/v2/ship/customers/63eca881a0a13a3efc8d49fc",
    "name": "北京 XX 科技有限公司"
  },
  "solution": {
    "id": "62f217ae16e3661a20124330",
    "url": "https://{rest_api_root}/v2/ship/ticket_solutions/62f217ae16e3661a20124330",
    "name": "进入需求池"
  },
  "priority": {
    "url": "https://{rest_api_root}/v2/ship/ticket_priorities/5cb9466afda1ce4ca0090004",
    "id": "5cb9466afda1ce4ca0090004",
    "name": "P1",
    "color": "#FF7575"
  },
  "channel": {
    "id": "64550d9ec696b249b5fc607d",
    "url": "https://{rest_api_root}/v2/ship/ticket_channels/64550d9ec696b249b5fc607d",
    "name": "channel-1"
  },
  "description": "<p>希望支持其他更多第三方平台的账号注册，以便用第三方账号登录找回更换了手机号的账号，保障账号安全</p>",
  "properties": {
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value"
  },
  "estimated_at": null,
  "tags": [],
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
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=ticket&principal_id=63eca888a0a13a3efc8d4a43",
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
      "url": "https://{rest_api_root}/v2/participants/63c8fb32729dee3334d96af7?principal_type=ticket&principal_id=63eca888a0a13a3efc8d4a43",
      "type": "user_group",
      "user_group": {
        "id": "63c8fb32729dee3334d96af7",
        "url": "https://{rest_api_root}/v2/directory/groups/63c8fb32729dee3334d96af7",
        "name": "Open Team"
      }
    }
  ],
  "submitter": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "completed_at": 1689579131,
  "completed_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "created_at": 1676454024,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1676454024,
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

<a id="get-v2-ship-tickets-ticket-id"></a>

### 获取一个工单

`GET /v2/ship/tickets/{ticket_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:ticket`

用于按 id、whole_identifier 或 short_id 获取工单全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_id` | string | 是 | 工单的 id、whole_identifier 或 short_id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_public_image_token` | string |  | 包含获取图片资源 token 的属性。使用','分割，最多 32 个，支持 `description` 和自定义多行文本类型的属性。参数示例 `description,properties.prop_b` |
| `include_deleted` | boolean |  | 是否包含已删除的工单。该值默认为`false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单的 id |
| `url` | string | 是 | 工单的资源地址 |
| `short_id` | string | 是 | 工单的短 id |
| `html_url` | string | 是 | 工单的 html 地址 |
| `product` | object | 是 | 工单的所属产品 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `identifier` | number | 是 | 工单的编号 |
| `whole_identifier` | string | 是 | 工单的完整编号 |
| `title` | string | 是 | 工单的标题 |
| `assignee` | object | 是 | 工单的负责人 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `state` | object | 是 | 工单的状态 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `type` | object | 是 | 工单的类型 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `company` | object | 是 | 工单的客户 |
| `company.id` | string |  |  |
| `company.url` | string |  |  |
| `company.name` | string |  |  |
| `solution` | object | 是 | 工单的解决方案 |
| `solution.id` | string |  |  |
| `solution.url` | string |  |  |
| `solution.name` | string |  |  |
| `priority` | object | 是 | 工单的优先级 |
| `priority.url` | string |  |  |
| `priority.id` | string |  |  |
| `priority.name` | string |  |  |
| `priority.color` | string |  |  |
| `channel` | object \| string | 是 | 工单的渠道。外部渠道提交的工单的渠道是 Object 类型，内部工单的渠道是 `internal` 字符串 |
| `channel.id` | string |  |  |
| `channel.url` | string |  |  |
| `channel.name` | string |  |  |
| `description` | string | 是 | 工单的描述 |
| `properties` | object | 是 | 工单的自定义属性 |
| `estimated_at` | object | 是 | 工单的预计时间 |
| `estimated_at.from` | object | 是 | 预计时间的开始时间 |
| `estimated_at.from.date` | number |  |  |
| `estimated_at.from.with_time` | number |  |  |
| `estimated_at.to` | object | 是 | 预计时间的结束时间 |
| `estimated_at.to.date` | number |  |  |
| `estimated_at.to.with_time` | number |  |  |
| `estimated_at.granularity` | string | 是 | 预计时间的周期单位；枚举："year" / "quarter" / "month" / "day" |
| `tags` | object[] | 是 | 工单的标签列表 |
| `tags[].id` | string |  |  |
| `tags[].url` | string |  |  |
| `tags[].name` | string |  |  |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `participants` | object[] | 是 | 工单的关注人列表 |
| `participants[].id` | string |  |  |
| `participants[].url` | string |  |  |
| `participants[].type` | string |  |  |
| `participants[].user` | object |  |  |
| `participants[].user.id` | string |  |  |
| `participants[].user.url` | string |  |  |
| `participants[].user.name` | string |  |  |
| `participants[].user.display_name` | string |  |  |
| `participants[].user.avatar` | string |  |  |
| `participants[].user_group` | object |  |  |
| `participants[].user_group.id` | string |  |  |
| `participants[].user_group.url` | string |  |  |
| `participants[].user_group.name` | string |  |  |
| `public_image_token` | string | 是 | 工单描述和自定义多行文本类型属性里获取图片资源 token。获取一个工单和获取工单列表参数 `include_public_image_token` 值有效时返回 |
| `submitter` | object | 是 | 工单的提交人 |
| `submitter.id` | string |  |  |
| `submitter.url` | string |  |  |
| `submitter.name` | string |  |  |
| `submitter.display_name` | string |  |  |
| `submitter.avatar` | string |  |  |
| `completed_at` | number | 是 | 工单的完成时间 |
| `completed_by` | object | 是 | 工单的完成人 |
| `completed_by.id` | string |  |  |
| `completed_by.url` | string |  |  |
| `completed_by.name` | string |  |  |
| `completed_by.display_name` | string |  |  |
| `completed_by.avatar` | string |  |  |
| `created_at` | number | 是 | 工单的创建时间 |
| `created_by` | object | 是 | 工单的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 工单的更新时间 |
| `updated_by` | object | 是 | 工单的更新人 |
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
  "id": "63eca888a0a13a3efc8d4a43",
  "url": "https://{rest_api_root}/v2/ship/tickets/63eca888a0a13a3efc8d4a43",
  "short_id": "pdMUgQzZ",
  "html_url": "https://yctech.pingcode.com/ship/tickets/pdMUgQzZ",
  "product": {
    "id": "6422711c3f12e6c1e46d40e9",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  },
  "identifier": 1,
  "whole_identifier": "SLC-T1",
  "title": "希望新增支持第三方账号注册",
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "state": {
    "id": "63eca880a0a13a3efc8d49d9",
    "url": "https://{rest_api_root}/v2/ship/ticket_states/63eca880a0a13a3efc8d49d9",
    "name": "待处理",
    "type": "pending"
  },
  "estimated_at": {
    "from": {
      "date": 1701619200,
      "with_time": 0
    },
    "to": {
      "date": 1702742399,
      "with_time": 0
    },
    "granularity": "day"
  },
  "type": {
    "id": "63eca880a0a13a3efc8d49e0",
    "url": "https://{rest_api_root}/v2/ship/ticket_types/63eca880a0a13a3efc8d49e0",
    "name": "需求"
  },
  "company": {
    "id": "63eca881a0a13a3efc8d49fc",
    "url": "https://{rest_api_root}/v2/ship/customers/63eca881a0a13a3efc8d49fc",
    "name": "北京 XX 科技有限公司"
  },
  "solution": {
    "id": "62f217ae16e3661a20124330",
    "url": "https://{rest_api_root}/v2/ship/ticket_solutions/62f217ae16e3661a20124330",
    "name": "进入需求池"
  },
  "priority": {
    "url": "https://{rest_api_root}/v2/ship/ticket_priorities/5cb9466afda1ce4ca0090004",
    "id": "5cb9466afda1ce4ca0090004",
    "name": "P1",
    "color": "#FF7575"
  },
  "channel": {
    "id": "64550d9ec696b249b5fc607d",
    "url": "https://{rest_api_root}/v2/ship/ticket_channels/64550d9ec696b249b5fc607d",
    "name": "channel-1"
  },
  "description": "<p>希望支持其他更多第三方平台的账号注册，以便用第三方账号登录找回更换了手机号的账号，保障账号安全</p>",
  "properties": {
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value"
  },
  "tags": [
    {
      "id": "63eca881a0a13a3efc8d49f1",
      "url": "https://{rest_api_root}/v2/ship/tags/63eca881a0a13a3efc8d49f1",
      "name": "已确认"
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
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=ticket&principal_id=63eca888a0a13a3efc8d4a43",
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
      "url": "https://{rest_api_root}/v2/participants/63c8fb32729dee3334d96af7?principal_type=ticket&principal_id=63eca888a0a13a3efc8d4a43",
      "type": "user_group",
      "user_group": {
        "id": "63c8fb32729dee3334d96af7",
        "url": "https://{rest_api_root}/v2/directory/groups/63c8fb32729dee3334d96af7",
        "name": "Open Team"
      }
    }
  ],
  "public_image_token": "N96GlJ4AMQoBCw9pZQ2EMl-AprLN_V_DYlghupBNkJA",
  "submitter": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "completed_at": 1689579131,
  "completed_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "created_at": 1676454024,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1676454024,
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

<a id="patch-v2-ship-tickets-ticket-id"></a>

### 部分更新一个工单

`PATCH /v2/ship/tickets/{ticket_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:ticket`

用于部分更新一个工单。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_id` | string | 是 | 工单 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title` | string |  | 工单的标题，最大长度为 255 |
| `description` | string |  | 工单的描述 |
| `type_id` | string |  | 工单的类型 id，您可以在 “获取工单类型列表” API 获取 |
| `state_id` | string |  | 工单的状态 id，您可以在 “获取工单状态列表” API 获取 |
| `assignee_id` | string |  | 工单的负责人 id |
| `submitter_id` | string |  | 工单的提交人 id，企业授权时，该值有效；个人鉴权时，指定无效 |
| `solution_id` | string |  | 工单的解决方案 id，您可以在 “获取工单解决方案列表” API 获取 |
| `priority_id` | string |  | 工单的优先级 id，您可以在 “获取工单优先级列表” API 获取 |
| `company_id` | string |  | 工单的客户 id，您可以在 “获取产品客户列表” API 获取 |
| `properties` | object |  | 工单的自定义属性 |

**请求示例**

```json
{
  "title": "希望新增支持第三方账号注册",
  "description": "<p>希望支持其他更多第三方平台的账号注册，以便用第三方账号登录找回更换了手机号的账号，保障账号安全</p>",
  "type_id": "63eca880a0a13a3efc8d49e0",
  "state_id": "63eca880a0a13a3efc8d49e0",
  "assignee_id": "a0417f68e846aae315c85d24643678a9",
  "submitter_id": "a0417f68e846aae315c85d24643678a9",
  "solution_id": "62f217ae16e3661a20124330",
  "priority_id": "5cb9466afda1ce4ca0090004",
  "company_id": "63eca881a0a13a3efc8d49fc",
  "properties": {
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value"
  }
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单的 id |
| `url` | string | 是 | 工单的资源地址 |
| `short_id` | string | 是 | 工单的短 id |
| `html_url` | string | 是 | 工单的 html 地址 |
| `product` | object | 是 | 工单的所属产品 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `identifier` | number | 是 | 工单的编号 |
| `whole_identifier` | string | 是 | 工单的完整编号 |
| `title` | string | 是 | 工单的标题 |
| `assignee` | object | 是 | 工单的负责人 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `state` | object | 是 | 工单的状态 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `type` | object | 是 | 工单的类型 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `company` | object | 是 | 工单的客户 |
| `company.id` | string |  |  |
| `company.url` | string |  |  |
| `company.name` | string |  |  |
| `solution` | object | 是 | 工单的解决方案 |
| `solution.id` | string |  |  |
| `solution.url` | string |  |  |
| `solution.name` | string |  |  |
| `priority` | object | 是 | 工单的优先级 |
| `priority.id` | string |  |  |
| `priority.url` | string |  |  |
| `priority.name` | string |  |  |
| `priority.color` | string |  |  |
| `channel` | object \| string | 是 | 工单的渠道。外部渠道提交的工单的渠道是 Object 类型，内部工单的渠道是 `internal` 字符串 |
| `channel.id` | string |  |  |
| `channel.url` | string |  |  |
| `channel.name` | string |  |  |
| `description` | string | 是 | 工单的描述 |
| `properties` | object | 是 | 工单的自定义属性 |
| `properties.prop_a` | string |  |  |
| `properties.prop_b` | string |  |  |
| `estimated_at` | object | 是 | 工单的预计时间 |
| `estimated_at.from` | object |  |  |
| `estimated_at.from.date` | number |  |  |
| `estimated_at.from.with_time` | number |  |  |
| `estimated_at.to` | object |  |  |
| `estimated_at.to.date` | number |  |  |
| `estimated_at.to.with_time` | number |  |  |
| `estimated_at.granularity` | string |  |  |
| `tags` | object[] | 是 | 工单的标签列表 |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `participants` | object[] | 是 | 工单的关注人列表 |
| `participants[].id` | string |  |  |
| `participants[].url` | string |  |  |
| `participants[].type` | string |  |  |
| `participants[].user` | object |  |  |
| `participants[].user.id` | string |  |  |
| `participants[].user.url` | string |  |  |
| `participants[].user.name` | string |  |  |
| `participants[].user.display_name` | string |  |  |
| `participants[].user.avatar` | string |  |  |
| `participants[].user_group` | object |  |  |
| `participants[].user_group.id` | string |  |  |
| `participants[].user_group.url` | string |  |  |
| `participants[].user_group.name` | string |  |  |
| `submitter` | object | 是 | 工单的提交人 |
| `submitter.id` | string |  |  |
| `submitter.url` | string |  |  |
| `submitter.name` | string |  |  |
| `submitter.display_name` | string |  |  |
| `submitter.avatar` | string |  |  |
| `completed_at` | number | 是 | 工单的完成时间 |
| `completed_by` | object | 是 | 工单的完成人 |
| `completed_by.id` | string |  |  |
| `completed_by.url` | string |  |  |
| `completed_by.name` | string |  |  |
| `completed_by.display_name` | string |  |  |
| `completed_by.avatar` | string |  |  |
| `created_at` | number | 是 | 工单的创建时间 |
| `created_by` | object | 是 | 工单的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 工单的更新时间 |
| `updated_by` | object | 是 | 工单的更新人 |
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
  "id": "63eca888a0a13a3efc8d4a43",
  "url": "https://{rest_api_root}/v2/ship/tickets/63eca888a0a13a3efc8d4a43",
  "short_id": "pdMUgQzZ",
  "html_url": "https://yctech.pingcode.com/ship/tickets/pdMUgQzZ",
  "product": {
    "id": "6422711c3f12e6c1e46d40e9",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  },
  "identifier": 1,
  "whole_identifier": "SLC-T1",
  "title": "希望新增支持第三方账号注册",
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "state": {
    "id": "63eca880a0a13a3efc8d49d9",
    "url": "https://{rest_api_root}/v2/ship/ticket_states/63eca880a0a13a3efc8d49d9",
    "name": "待处理",
    "type": "pending"
  },
  "estimated_at": {
    "from": {
      "date": 1701619200,
      "with_time": 0
    },
    "to": {
      "date": 1702742399,
      "with_time": 0
    },
    "granularity": "day"
  },
  "type": {
    "id": "63eca880a0a13a3efc8d49e0",
    "url": "https://{rest_api_root}/v2/ship/ticket_types/63eca880a0a13a3efc8d49e0",
    "name": "需求"
  },
  "company": {
    "id": "63eca881a0a13a3efc8d49fc",
    "url": "https://{rest_api_root}/v2/ship/customers/63eca881a0a13a3efc8d49fc",
    "name": "北京 XX 科技有限公司"
  },
  "solution": {
    "id": "62f217ae16e3661a20124330",
    "url": "https://{rest_api_root}/v2/ship/ticket_solutions/62f217ae16e3661a20124330",
    "name": "进入需求池"
  },
  "priority": {
    "id": "5cb9466afda1ce4ca0090004",
    "url": "https://{rest_api_root}/v2/ship/ticket_priorities/5cb9466afda1ce4ca0090004",
    "name": "P1",
    "color": "#FF7575"
  },
  "channel": {
    "id": "64550d9ec696b249b5fc607d",
    "url": "https://{rest_api_root}/v2/ship/ticket_channels/64550d9ec696b249b5fc607d",
    "name": "channel-1"
  },
  "description": "<p>希望支持其他更多第三方平台的账号注册，以便用第三方账号登录找回更换了手机号的账号，保障账号安全</p>",
  "properties": {
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value"
  },
  "tags": [],
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
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=ticket&principal_id=63eca888a0a13a3efc8d4a43",
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
      "url": "https://{rest_api_root}/v2/participants/63c8fb32729dee3334d96af7?principal_type=ticket&principal_id=63eca888a0a13a3efc8d4a43",
      "type": "user_group",
      "user_group": {
        "id": "63c8fb32729dee3334d96af7",
        "url": "https://{rest_api_root}/v2/directory/groups/63c8fb32729dee3334d96af7",
        "name": "Open Team"
      }
    }
  ],
  "submitter": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "completed_at": 1689579131,
  "completed_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "created_at": 1676454024,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1676455024,
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

<a id="get-v2-ship-tickets"></a>

### 获取工单列表

`GET /v2/ship/tickets` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:ticket`

用于分页获取工单。  
 复杂组合、日期或自定义属性过滤请使用「搜索工单列表」。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string |  | 产品的 id |
| `type_id` | string |  | 工单类型的 id |
| `state_id` | string |  | 工单状态的 id |
| `priority_id` | string |  | 工单优先级的 id |
| `keywords` | string |  | 关键字。支持工单编号和工单标题 |
| `include_public_image_token` | string |  | 包含获取图片资源 token 的属性。使用','分割，最多 32 个，支持 `description` 和自定义多行文本类型的属性。参数示例 `description,properties.prop_b` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工单全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].short_id` | string |  |  |
| `values[].html_url` | string |  |  |
| `values[].product` | object |  |  |
| `values[].product.id` | string |  |  |
| `values[].product.url` | string |  |  |
| `values[].product.identifier` | string |  |  |
| `values[].product.name` | string |  |  |
| `values[].product.is_archived` | number |  |  |
| `values[].product.is_deleted` | number |  |  |
| `values[].identifier` | number |  |  |
| `values[].whole_identifier` | string |  |  |
| `values[].title` | string |  |  |
| `values[].assignee` | object |  |  |
| `values[].assignee.id` | string |  |  |
| `values[].assignee.url` | string |  |  |
| `values[].assignee.name` | string |  |  |
| `values[].assignee.display_name` | string |  |  |
| `values[].assignee.avatar` | string |  |  |
| `values[].state` | object |  |  |
| `values[].state.id` | string |  |  |
| `values[].state.url` | string |  |  |
| `values[].state.name` | string |  |  |
| `values[].state.type` | string |  |  |
| `values[].estimated_at` | object |  |  |
| `values[].estimated_at.from` | object |  |  |
| `values[].estimated_at.from.date` | number |  |  |
| `values[].estimated_at.from.with_time` | number |  |  |
| `values[].estimated_at.to` | object |  |  |
| `values[].estimated_at.to.date` | number |  |  |
| `values[].estimated_at.to.with_time` | number |  |  |
| `values[].estimated_at.granularity` | string |  |  |
| `values[].type` | object |  |  |
| `values[].type.id` | string |  |  |
| `values[].type.url` | string |  |  |
| `values[].type.name` | string |  |  |
| `values[].company` | object |  |  |
| `values[].company.id` | string |  |  |
| `values[].company.url` | string |  |  |
| `values[].company.name` | string |  |  |
| `values[].solution` | object |  |  |
| `values[].solution.id` | string |  |  |
| `values[].solution.url` | string |  |  |
| `values[].solution.name` | string |  |  |
| `values[].priority` | object |  |  |
| `values[].priority.url` | string |  |  |
| `values[].priority.id` | string |  |  |
| `values[].priority.name` | string |  |  |
| `values[].priority.color` | string |  |  |
| `values[].channel` | object |  |  |
| `values[].channel.id` | string |  |  |
| `values[].channel.url` | string |  |  |
| `values[].channel.name` | string |  |  |
| `values[].description` | string |  |  |
| `values[].properties` | object |  |  |
| `values[].properties.prop_a` | string |  |  |
| `values[].properties.prop_b` | string |  |  |
| `values[].tags` | object[] |  |  |
| `values[].tags[].id` | string |  |  |
| `values[].tags[].url` | string |  |  |
| `values[].tags[].name` | string |  |  |
| `values[].entity_properties` | object |  |  |
| `values[].entity_properties.entity_property_key_a` | object |  |  |
| `values[].entity_properties.entity_property_key_a.score` | number |  |  |
| `values[].entity_properties.entity_property_key_a.risk` | string |  |  |
| `values[].entity_properties.entity_property_key_b` | string |  |  |
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
| `values[].participants[].user_group` | object |  |  |
| `values[].participants[].user_group.id` | string |  |  |
| `values[].participants[].user_group.url` | string |  |  |
| `values[].participants[].user_group.name` | string |  |  |
| `values[].public_image_token` | string |  |  |
| `values[].submitter` | object |  |  |
| `values[].submitter.id` | string |  |  |
| `values[].submitter.url` | string |  |  |
| `values[].submitter.name` | string |  |  |
| `values[].submitter.display_name` | string |  |  |
| `values[].submitter.avatar` | string |  |  |
| `values[].completed_at` | number |  |  |
| `values[].completed_by` | object |  |  |
| `values[].completed_by.id` | string |  |  |
| `values[].completed_by.url` | string |  |  |
| `values[].completed_by.name` | string |  |  |
| `values[].completed_by.display_name` | string |  |  |
| `values[].completed_by.avatar` | string |  |  |
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
      "id": "63eca888a0a13a3efc8d4a43",
      "url": "https://{rest_api_root}/v2/ship/tickets/63eca888a0a13a3efc8d4a43",
      "short_id": "pdMUgQzZ",
      "html_url": "https://yctech.pingcode.com/ship/tickets/pdMUgQzZ",
      "product": {
        "id": "6422711c3f12e6c1e46d40e9",
        "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
        "identifier": "SLC",
        "name": "示例产品",
        "is_archived": 0,
        "is_deleted": 0
      },
      "identifier": 1,
      "whole_identifier": "SLC-T1",
      "title": "希望新增支持第三方账号注册",
      "assignee": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "state": {
        "id": "63eca880a0a13a3efc8d49d9",
        "url": "https://{rest_api_root}/v2/ship/ticket_states/63eca880a0a13a3efc8d49d9",
        "name": "待处理",
        "type": "pending"
      },
      "estimated_at": {
        "from": {
          "date": 1701619200,
          "with_time": 0
        },
        "to": {
          "date": 1702742399,
          "with_time": 0
        },
        "granularity": "day"
      },
      "type": {
        "id": "63eca880a0a13a3efc8d49e0",
        "url": "https://{rest_api_root}/v2/ship/ticket_types/63eca880a0a13a3efc8d49e0",
        "name": "需求"
      },
      "company": {
        "id": "63eca881a0a13a3efc8d49fc",
        "url": "https://{rest_api_root}/v2/ship/customers/63eca881a0a13a3efc8d49fc",
        "name": "北京 XX 科技有限公司"
      },
      "solution": {
        "id": "62f217ae16e3661a20124330",
        "url": "https://{rest_api_root}/v2/ship/ticket_solutions/62f217ae16e3661a20124330",
        "name": "进入需求池"
      },
      "priority": {
        "url": "https://{rest_api_root}/v2/ship/ticket_priorities/5cb9466afda1ce4ca0090004",
        "id": "5cb9466afda1ce4ca0090004",
        "name": "P1",
        "color": "#FF7575"
      },
      "channel": {
        "id": "64550d9ec696b249b5fc607d",
        "url": "https://{rest_api_root}/v2/ship/ticket_channels/64550d9ec696b249b5fc607d",
        "name": "channel-1"
      },
      "description": "<p>希望支持其他更多第三方平台的账号注册，以便用第三方账号登录找回更换了手机号的账号，保障账号安全</p>",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      },
      "tags": [
        {
          "id": "63eca881a0a13a3efc8d49f1",
          "url": "https://{rest_api_root}/v2/ship/tags/63eca881a0a13a3efc8d49f1",
          "name": "已确认"
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
          "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=ticket&principal_id=63eca888a0a13a3efc8d4a43",
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
          "url": "https://{rest_api_root}/v2/participants/63c8fb32729dee3334d96af7?principal_type=ticket&principal_id=63eca888a0a13a3efc8d4a43",
          "type": "user_group",
          "user_group": {
            "id": "63c8fb32729dee3334d96af7",
            "url": "https://{rest_api_root}/v2/directory/groups/63c8fb32729dee3334d96af7",
            "name": "Open Team"
          }
        }
      ],
      "public_image_token": "N96GlJ4AMQoBCw9pZQ2EMl-AprLN_V_DYlghupBNkJA",
      "submitter": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "completed_at": 1689579131,
      "completed_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "created_at": 1676454024,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "updated_at": 1676454024,
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

<a id="post-v2-ship-tickets-search"></a>

### 搜索工单列表

`POST /v2/ship/tickets/search` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:ticket`

用于按类 MongoDB 结构化条件搜索工单。  
 默认不含已删除/已归档项。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `mode` | string | 是 | 搜索模式。`query` 表示基于 `payload.filter` 的结构化条件查询；枚举："query" |
| `payload` | object | 是 | 搜索参数 |
| `payload.filter` | object |  | 过滤条件。 过滤时使用类 MongoDB 的查询语法，可通过属性名、操作符和对应值进行过滤。 引用类型（含数组引用类型）使用 `{属性名}.id` 作为属性名，例如 `product.id`、`tags.id`、`participants.id`。 自定义属性使用 `properties.{属性 key}` 作为属性名，例如 `properties.prop_a`。 文本类型（如 `title`、`description`，以及自定义单行文本、多行文本、链接类型）的操作符： `exists`、`contains`。 数字类型（如 `identifier`，以及自定义数字、进度、评分类型）的操作符： `exists`、`eq`、`ne`、`gt`、`lt`、`gte`、`lte`。 时间类型（如 `created_at`、`updated_at`、`completed_at`，以及自定义日期）的操作符： `exists`、`gt`、`lt`、`gte`、`lte`、`between`（值为 `[起始时间戳, 结束时间戳]`；过滤时以「天」为单位。 选项类型（自定义下拉单选、下拉多选、级联单选、级联多选）的操作符： `exists`、`in`、`nin`。 引用类型（如 `product.id`、`type.id`、`state.id`、`priority.id`、`assignee.id`、`submitter.id`、`company.id`、`solution.id`、`channel.id`、`tags.id`、`participants.id`）的操作符： `exists`、`in`、`nin`。 每个属性仅支持一个操作符。 暂不支持使用逻辑运算符。 内置属性暂不支持过滤：`id`、`url`、`whole_identifier`、`short_id`、`html_url`、`public_image_token`、`estimated_at`、`is_archived`、`is_deleted` |
| `payload.filter.title` | object |  |  |
| `payload.filter.title.contains` | string |  |  |
| `payload.filter.assignee.id` | object |  |  |
| `payload.filter.assignee.id.nin` | string[] |  |  |
| `payload.filter.product.id` | object |  |  |
| `payload.filter.product.id.in` | string[] |  |  |
| `payload.filter.tags.id` | object |  |  |
| `payload.filter.tags.id.in` | string[] |  |  |
| `payload.filter.participants.id` | object |  |  |
| `payload.filter.participants.id.in` | string[] |  |  |
| `payload.filter.created_at` | object |  |  |
| `payload.filter.created_at.gte` | number |  |  |
| `payload.keywords` | string |  | 关键字。支持工单编号和工单标题 |
| `payload.include_public_image_token` | string |  | 包含获取图片资源 token 的属性。使用 `,` 分割，最多 32 个，支持 `description` 和自定义多行文本类型的属性 |
| `payload.page_size` | number |  | 每页条数，取值范围 1-100 |
| `payload.page_index` | number |  | 页码，从 0 开始 |

**请求示例**

```json
{
  "mode": "query",
  "payload": {
    "filter": {
      "title": {
        "contains": "注册"
      },
      "assignee.id": {
        "nin": [
          "315c85d24643678a9a0417f68e846aae"
        ]
      },
      "product.id": {
        "in": [
          "6422711c3f12e6c1e46d40e9"
        ]
      },
      "tags.id": {
        "in": [
          "63eca881a0a13a3efc8d49f1"
        ]
      },
      "participants.id": {
        "in": [
          "a0417f68e846aae315c85d24643678a9"
        ]
      },
      "created_at": {
        "gte": 1730000000
      }
    },
    "keywords": "SLC-T1",
    "include_public_image_token": "description",
    "page_size": 10,
    "page_index": 0
  }
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工单全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].short_id` | string |  |  |
| `values[].html_url` | string |  |  |
| `values[].product` | object |  |  |
| `values[].product.id` | string |  |  |
| `values[].product.url` | string |  |  |
| `values[].product.identifier` | string |  |  |
| `values[].product.name` | string |  |  |
| `values[].product.is_archived` | number |  |  |
| `values[].product.is_deleted` | number |  |  |
| `values[].identifier` | number |  |  |
| `values[].whole_identifier` | string |  |  |
| `values[].title` | string |  |  |
| `values[].assignee` | object |  |  |
| `values[].assignee.id` | string |  |  |
| `values[].assignee.url` | string |  |  |
| `values[].assignee.name` | string |  |  |
| `values[].assignee.display_name` | string |  |  |
| `values[].assignee.avatar` | string |  |  |
| `values[].state` | object |  |  |
| `values[].state.id` | string |  |  |
| `values[].state.url` | string |  |  |
| `values[].state.name` | string |  |  |
| `values[].state.type` | string |  |  |
| `values[].estimated_at` | object |  |  |
| `values[].estimated_at.from` | object |  |  |
| `values[].estimated_at.from.date` | number |  |  |
| `values[].estimated_at.from.with_time` | number |  |  |
| `values[].estimated_at.to` | object |  |  |
| `values[].estimated_at.to.date` | number |  |  |
| `values[].estimated_at.to.with_time` | number |  |  |
| `values[].estimated_at.granularity` | string |  |  |
| `values[].type` | object |  |  |
| `values[].type.id` | string |  |  |
| `values[].type.url` | string |  |  |
| `values[].type.name` | string |  |  |
| `values[].company` | object |  |  |
| `values[].company.id` | string |  |  |
| `values[].company.url` | string |  |  |
| `values[].company.name` | string |  |  |
| `values[].solution` | object |  |  |
| `values[].solution.id` | string |  |  |
| `values[].solution.url` | string |  |  |
| `values[].solution.name` | string |  |  |
| `values[].priority` | object |  |  |
| `values[].priority.url` | string |  |  |
| `values[].priority.id` | string |  |  |
| `values[].priority.name` | string |  |  |
| `values[].priority.color` | string |  |  |
| `values[].channel` | object |  |  |
| `values[].channel.id` | string |  |  |
| `values[].channel.url` | string |  |  |
| `values[].channel.name` | string |  |  |
| `values[].description` | string |  |  |
| `values[].properties` | object |  |  |
| `values[].properties.prop_a` | string |  |  |
| `values[].properties.prop_b` | string |  |  |
| `values[].tags` | object[] |  |  |
| `values[].tags[].id` | string |  |  |
| `values[].tags[].url` | string |  |  |
| `values[].tags[].name` | string |  |  |
| `values[].entity_properties` | object |  |  |
| `values[].entity_properties.entity_property_key_a` | object |  |  |
| `values[].entity_properties.entity_property_key_a.score` | number |  |  |
| `values[].entity_properties.entity_property_key_a.risk` | string |  |  |
| `values[].entity_properties.entity_property_key_b` | string |  |  |
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
| `values[].participants[].user_group` | object |  |  |
| `values[].participants[].user_group.id` | string |  |  |
| `values[].participants[].user_group.url` | string |  |  |
| `values[].participants[].user_group.name` | string |  |  |
| `values[].public_image_token` | string |  |  |
| `values[].submitter` | object |  |  |
| `values[].submitter.id` | string |  |  |
| `values[].submitter.url` | string |  |  |
| `values[].submitter.name` | string |  |  |
| `values[].submitter.display_name` | string |  |  |
| `values[].submitter.avatar` | string |  |  |
| `values[].completed_at` | number |  |  |
| `values[].completed_by` | object |  |  |
| `values[].completed_by.id` | string |  |  |
| `values[].completed_by.url` | string |  |  |
| `values[].completed_by.name` | string |  |  |
| `values[].completed_by.display_name` | string |  |  |
| `values[].completed_by.avatar` | string |  |  |
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
  "page_size": 10,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "63eca888a0a13a3efc8d4a43",
      "url": "https://{rest_api_root}/v2/ship/tickets/63eca888a0a13a3efc8d4a43",
      "short_id": "pdMUgQzZ",
      "html_url": "https://yctech.pingcode.com/ship/tickets/pdMUgQzZ",
      "product": {
        "id": "6422711c3f12e6c1e46d40e9",
        "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
        "identifier": "SLC",
        "name": "示例产品",
        "is_archived": 0,
        "is_deleted": 0
      },
      "identifier": 1,
      "whole_identifier": "SLC-T1",
      "title": "希望新增支持第三方账号注册",
      "assignee": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "state": {
        "id": "63eca880a0a13a3efc8d49d9",
        "url": "https://{rest_api_root}/v2/ship/ticket_states/63eca880a0a13a3efc8d49d9",
        "name": "待处理",
        "type": "pending"
      },
      "estimated_at": {
        "from": {
          "date": 1701619200,
          "with_time": 0
        },
        "to": {
          "date": 1702742399,
          "with_time": 0
        },
        "granularity": "day"
      },
      "type": {
        "id": "63eca880a0a13a3efc8d49e0",
        "url": "https://{rest_api_root}/v2/ship/ticket_types/63eca880a0a13a3efc8d49e0",
        "name": "需求"
      },
      "company": {
        "id": "63eca881a0a13a3efc8d49fc",
        "url": "https://{rest_api_root}/v2/ship/customers/63eca881a0a13a3efc8d49fc",
        "name": "北京 XX 科技有限公司"
      },
      "solution": {
        "id": "62f217ae16e3661a20124330",
        "url": "https://{rest_api_root}/v2/ship/ticket_solutions/62f217ae16e3661a20124330",
        "name": "进入需求池"
      },
      "priority": {
        "url": "https://{rest_api_root}/v2/ship/ticket_priorities/5cb9466afda1ce4ca0090004",
        "id": "5cb9466afda1ce4ca0090004",
        "name": "P1",
        "color": "#FF7575"
      },
      "channel": {
        "id": "64550d9ec696b249b5fc607d",
        "url": "https://{rest_api_root}/v2/ship/ticket_channels/64550d9ec696b249b5fc607d",
        "name": "channel-1"
      },
      "description": "<p>希望支持其他更多第三方平台的账号注册，以便用第三方账号登录找回更换了手机号的账号，保障账号安全</p>",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      },
      "tags": [
        {
          "id": "63eca881a0a13a3efc8d49f1",
          "url": "https://{rest_api_root}/v2/ship/tags/63eca881a0a13a3efc8d49f1",
          "name": "已确认"
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
          "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=ticket&principal_id=63eca888a0a13a3efc8d4a43",
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
          "url": "https://{rest_api_root}/v2/participants/63c8fb32729dee3334d96af7?principal_type=ticket&principal_id=63eca888a0a13a3efc8d4a43",
          "type": "user_group",
          "user_group": {
            "id": "63c8fb32729dee3334d96af7",
            "url": "https://{rest_api_root}/v2/directory/groups/63c8fb32729dee3334d96af7",
            "name": "Open Team"
          }
        }
      ],
      "public_image_token": "N96GlJ4AMQoBCw9pZQ2EMl-AprLN_V_DYlghupBNkJA",
      "submitter": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "completed_at": 1689579131,
      "completed_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "created_at": 1676454024,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "updated_at": 1676454024,
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

<a id="get-v2-ship-ticket-ticket-types"></a>

### 获取可用的工单类型列表

`GET /v2/ship/ticket/ticket_types` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:ticket`

用于分页获取产品中的工单类型。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工单类型的全量结构数据的数组 |
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
      "id": "63bb744214bd13c9def24ca9",
      "url": "https://{rest_api_root}/v2/ship/ticket_types/63bb744214bd13c9def24ca9",
      "name": "需求"
    }
  ]
}
```

<a id="get-v2-ship-ticket-ticket-states"></a>

### 获取可用的工单状态列表

`GET /v2/ship/ticket/ticket_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:ticket`

用于分页获取产品中的工单状态。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工单状态全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].type` | string |  |  |
| `values[].color` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "6422711c3f12e6c1e46d40f2",
      "url": "https://{rest_api_root}/v2/ship/ticket_states/6422711c3f12e6c1e46d40f2",
      "name": "处理中",
      "type": "pending",
      "color": "#56ABFB"
    }
  ]
}
```

<a id="get-v2-ship-ticket-ticket-properties"></a>

### 获取可用的工单属性列表

`GET /v2/ship/ticket/ticket_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:ticket`

用于分页获取产品中的工单属性。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工单属性全量结构数据的数组 |
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
      "id": "solution",
      "url": "https://{rest_api_root}/v2/ship/ticket_properties/solution",
      "name": "解决方案",
      "type": "select",
      "options": [
        {
          "id": "6422711c3f12e6c1e46d40e9",
          "text": "进入需求池"
        }
      ]
    },
    {
      "id": "identifier",
      "url": "https://{rest_api_root}/v2/ship/ticket_properties/identifier",
      "name": "编号",
      "type": "text",
      "options": null
    }
  ]
}
```

<a id="get-v2-ship-ticket-ticket-channels"></a>

### 获取可用的工单渠道列表

`GET /v2/ship/ticket/ticket_channels` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:ticket`

用于分页获取产品中的工单渠道。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工单渠道全量结构数据的数组 |
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
      "id": "63eca881a0a13a3efc8d49ed",
      "url": "https://{rest_api_root}/v2/ship/ticket_channels/63eca881a0a13a3efc8d49ed",
      "name": "客户反馈 Web 渠道"
    }
  ]
}
```

<a id="get-v2-ship-ticket-ticket-priorities"></a>

### 获取可用的工单优先级列表

`GET /v2/ship/ticket/ticket_priorities` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:ticket`

用于分页获取产品中的工单优先级。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工单优先级全量结构数据的数组 |
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
      "id": "5cb9466afda1ce4ca0090005",
      "url": "https://{rest_api_root}/v2/ship/ticket_priorities/5cb9466afda1ce4ca0090005",
      "name": "P0",
      "color": "#FF7575"
    }
  ]
}
```

<a id="get-v2-ship-ticket-ticket-solutions"></a>

### 获取可用的工单解决方案列表

`GET /v2/ship/ticket/ticket_solutions` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:ticket`

用于分页获取产品中的工单解决方案。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工单解决方案全量结构数据的数组 |
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
      "id": "6422711c3f12e6c1e46d40e9",
      "url": "https://{rest_api_root}/v2/ship/ticket_solutions/6422711c3f12e6c1e46d40e9",
      "name": "进入需求池"
    }
  ]
}
```

<a id="get-v2-ship-ticket-tags"></a>

### 获取可用的工单标签列表

`GET /v2/ship/ticket/tags` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:ticket`

用于分页获取产品中可用的工单标签，包含企业级全局标签与该产品的本地标签。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工单标签全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].color` | string |  |  |
| `values[].product` | null \| object |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "63eca881a0a13a3efc8d49f0",
      "url": "https://{rest_api_root}/v2/ship/tags/63eca881a0a13a3efc8d49f0",
      "name": "全局标签",
      "color": "#56ABFB",
      "product": null
    },
    {
      "id": "63eca881a0a13a3efc8d49f1",
      "url": "https://{rest_api_root}/v2/ship/tags/63eca881a0a13a3efc8d49f1",
      "name": "本地标签",
      "color": "#56ABFB",
      "product": {
        "id": "6422711c3f12e6c1e46d40e6",
        "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6",
        "identifier": "SLC",
        "name": "示例产品",
        "is_archived": 0,
        "is_deleted": 0
      }
    }
  ]
}
```

<a id="get-v2-ship-tickets-ticket-id-transition-histories-transition-history-id"></a>

### 获取一条工单流转记录

`GET /v2/ship/tickets/{ticket_id}/transition_histories/{transition_history_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:ticket`

用于按 id 获取一条工单流转记录全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_id` | string | 是 | 工单的 id |
| `transition_history_id` | string | 是 | 工单流转记录的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单流转记录的 id |
| `url` | string | 是 | 工单流转记录的资源地址 |
| `ticket` | object | 是 | 工单的引用结构数据 |
| `ticket.id` | string |  |  |
| `ticket.url` | string |  |  |
| `ticket.short_id` | string |  |  |
| `ticket.html_url` | string |  |  |
| `ticket.whole_identifier` | string |  |  |
| `ticket.title` | string |  |  |
| `from_state` | object | 是 | 流转前工单状态的引用结构数据 |
| `to_state` | object | 是 | 流转后工单状态的引用结构数据 |
| `to_state.id` | string |  |  |
| `to_state.url` | string |  |  |
| `to_state.name` | string |  |  |
| `to_state.type` | string |  |  |
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
  "id": "64c3676c983bb9481ee1eea5",
  "url": "https://{rest_api_root}/v2/ship/tickets/5edca524cad2fa1125cb0630/transition_histories/64c3676c983bb9481ee1eea5",
  "ticket": {
    "id": "63eca888a0a13a3efc8d4a43",
    "url": "https://{rest_api_root}/v2/ship/tickets/63eca888a0a13a3efc8d4a43",
    "short_id": "pdMUgQzZ",
    "html_url": "https://yctech.pingcode.com/ship/tickets/pdMUgQzZ",
    "whole_identifier": "SLC-T1",
    "title": "希望新增支持第三方账号注册"
  },
  "from_state": null,
  "to_state": {
    "id": "63e1bf51898a0be5a2d21b29",
    "url": "https://{rest_api_root}/v2/ship/ticket_states/63e1bf51898a0be5a2d21b29",
    "name": "待处理",
    "type": "pending"
  },
  "created_at": 1674528614,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

<a id="get-v2-ship-tickets-ticket-id-transition-histories"></a>

### 获取工单流转记录列表

`GET /v2/ship/tickets/{ticket_id}/transition_histories` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:ticket`

用于分页获取工单的流转记录。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_id` | string | 是 | 工单的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工单流转记录全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].ticket` | object |  |  |
| `values[].ticket.id` | string |  |  |
| `values[].ticket.url` | string |  |  |
| `values[].ticket.short_id` | string |  |  |
| `values[].ticket.html_url` | string |  |  |
| `values[].ticket.whole_identifier` | string |  |  |
| `values[].ticket.title` | string |  |  |
| `values[].from_state` | null \| object |  |  |
| `values[].to_state` | object |  |  |
| `values[].to_state.id` | string |  |  |
| `values[].to_state.url` | string |  |  |
| `values[].to_state.name` | string |  |  |
| `values[].to_state.type` | string |  |  |
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
  "total": 2,
  "values": [
    {
      "id": "64c3676c983bb9481ee1eea5",
      "url": "https://{rest_api_root}/v2/ship/tickets/5edca524cad2fa1125cb0630/transition_histories/64c3676c983bb9481ee1eea5",
      "ticket": {
        "id": "63eca888a0a13a3efc8d4a43",
        "url": "https://{rest_api_root}/v2/ship/tickets/63eca888a0a13a3efc8d4a43",
        "short_id": "pdMUgQzZ",
        "html_url": "https://yctech.pingcode.com/ship/tickets/pdMUgQzZ",
        "whole_identifier": "SLC-T1",
        "title": "希望新增支持第三方账号注册"
      },
      "from_state": null,
      "to_state": {
        "id": "63e1bf51898a0be5a2d21b29",
        "url": "https://{rest_api_root}/v2/ship/ticket_states/63e1bf51898a0be5a2d21b29",
        "name": "待处理",
        "type": "pending"
      },
      "created_at": 1674528614,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      }
    },
    {
      "id": "658bdb79e5839f556562accf",
      "url": "https://{rest_api_root}/v2/ship/tickets/5edca524cad2fa1125cb0630/transition_histories/658bdb79e5839f556562accf",
      "ticket": {
        "id": "63eca888a0a13a3efc8d4a43",
        "url": "https://{rest_api_root}/v2/ship/tickets/63eca888a0a13a3efc8d4a43",
        "short_id": "pdMUgQzZ",
        "html_url": "https://yctech.pingcode.com/ship/tickets/pdMUgQzZ",
        "whole_identifier": "SLC-T1",
        "title": "希望新增支持第三方账号注册"
      },
      "from_state": {
        "id": "63e1bf51898a0be5a2d21b29",
        "url": "https://{rest_api_root}/v2/ship/ticket_states/63e1bf51898a0be5a2d21b29",
        "name": "待处理",
        "type": "pending"
      },
      "to_state": {
        "id": "63e1bf51898a0be5a2d21b2b",
        "url": "https://{rest_api_root}/v2/ship/ticket_states/63e1bf51898a0be5a2d21b2b",
        "name": "处理中",
        "type": "in_progress"
      },
      "created_at": 1674528614,
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

## 需求

> 分组路径：产品管理 / 需求

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/ship/ideas` | [创建一个需求](#post-v2-ship-ideas) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ideas/{idea_id}` | [获取一个需求](#get-v2-ship-ideas-idea-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/ship/ideas/{idea_id}` | [部分更新一个需求](#patch-v2-ship-ideas-idea-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ideas` | [获取需求列表](#get-v2-ship-ideas) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/ship/ideas/search` | [搜索需求列表](#post-v2-ship-ideas-search) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea/idea_states` | [获取可用的需求状态列表](#get-v2-ship-idea-idea-states) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea/idea_properties` | [获取可用的需求属性列表](#get-v2-ship-idea-idea-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea/idea_suites` | [获取可用的需求模块列表](#get-v2-ship-idea-idea-suites) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea/idea_plans` | [获取可用的需求计划列表](#get-v2-ship-idea-idea-plans) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea/idea_priorities` | [获取可用的需求优先级列表](#get-v2-ship-idea-idea-priorities) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea/tags` | [获取可用的需求标签列表](#get-v2-ship-idea-tags) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ideas/{idea_id}/transition_histories/{transition_history_id}` | [获取一条需求流转记录](#get-v2-ship-ideas-idea-id-transition-histories-transition-history-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ideas/{idea_id}/transition_histories` | [获取需求流转记录列表](#get-v2-ship-ideas-idea-id-transition-histories) | 企业令牌 / 用户令牌 |

<a id="post-v2-ship-ideas"></a>

### 创建一个需求

`POST /v2/ship/ideas` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:idea`

用于创建一个需求。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 需求的产品 id |
| `title` | string | 是 | 需求的标题，最大长度为 255 |
| `assignee_id` | string |  | 需求负责人的 id |
| `description` | string |  | 需求的描述 |
| `suite_id` | string |  | 需求的产品模块 id |
| `priority_id` | string |  | 需求优先级的 id，您可以在 `获取需求优先级列表` API 获取 |
| `properties` | object |  | 需求属性的键值对集合。要注意的是，当前产品的需求属性视图需要包含这些需求属性，例如需求属性视图中包含 `prop_a` 和 `prop_b` |

**请求示例**

```json
{
  "product_id": "6422711c3f12e6c1e46d40e9",
  "title": "示例需求",
  "assignee_id": "a0417f68e846aae315c85d24643678a9",
  "description": "这是一段描述",
  "suite_id": "63bb744414bd13c9def24ce4",
  "priority_id": "5cb9466afda1ce4ca0090005",
  "properties": {
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value"
  }
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string |  |  |
| `url` | string |  |  |
| `short_id` | string |  |  |
| `html_url` | string |  |  |
| `product` | object |  |  |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `identifier` | number |  |  |
| `whole_identifier` | string |  |  |
| `title` | string |  |  |
| `assignee` | object |  |  |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `state` | object |  |  |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `priority` | object |  |  |
| `priority.id` | string |  |  |
| `priority.url` | string |  |  |
| `priority.name` | string |  |  |
| `priority.color` | string |  |  |
| `plan` | null |  |  |
| `suite` | object |  |  |
| `suite.id` | string |  |  |
| `suite.url` | string |  |  |
| `suite.name` | string |  |  |
| `suite.type` | string |  |  |
| `plan_at` | null |  |  |
| `real_at` | null |  |  |
| `score` | number |  |  |
| `rate` | number |  |  |
| `description` | string |  |  |
| `properties` | object |  |  |
| `properties.backlog_from` | string |  |  |
| `properties.backlog_type` | string |  |  |
| `properties.prop_a` | string |  |  |
| `properties.prop_b` | string |  |  |
| `entity_properties` | object |  |  |
| `entity_properties.entity_property_key_a` | object |  |  |
| `entity_properties.entity_property_key_a.score` | number |  |  |
| `entity_properties.entity_property_key_a.risk` | string |  |  |
| `entity_properties.entity_property_key_b` | string |  |  |
| `tags` | object[] |  |  |
| `tags[].id` | string |  |  |
| `tags[].url` | string |  |  |
| `tags[].name` | string |  |  |
| `participants` | object[] |  |  |
| `participants[].id` | string |  |  |
| `participants[].url` | string |  |  |
| `participants[].type` | string |  |  |
| `participants[].user` | object |  |  |
| `participants[].user.id` | string |  |  |
| `participants[].user.url` | string |  |  |
| `participants[].user.name` | string |  |  |
| `participants[].user.display_name` | string |  |  |
| `participants[].user.avatar` | string |  |  |
| `completed_at` | null |  |  |
| `completed_by` | null |  |  |
| `created_at` | number |  |  |
| `created_by` | object |  |  |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number |  |  |
| `updated_by` | object |  |  |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |
| `is_archived` | number |  |  |
| `is_deleted` | number |  |  |

**响应示例**

```json
{
  "id": "64b4d70ba368e6594360ea24",
  "url": "https://{rest_api_root}/v2/ship/ideas/64b4d70ba368e6594360ea24",
  "short_id": "Ogf1EYey",
  "html_url": "https://yctech.pingcode.com/ship/ideas/Ogf1EYey",
  "product": {
    "id": "6422711c3f12e6c1e46d40e9",
    "url": "http://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  },
  "identifier": 1,
  "whole_identifier": "SLC-1",
  "title": "示例需求",
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "state": {
    "id": "63e1bf51898a0be5a2d21b2a",
    "url": "https://{rest_api_root}/v2/ship/idea_states/63e1bf51898a0be5a2d21b2a",
    "name": "待评审",
    "type": "pending"
  },
  "priority": {
    "id": "5cb9466afda1ce4ca0090001",
    "url": "https://{rest_api_root}/v2/ship/idea_priorities/5cb9466afda1ce4ca0090001",
    "name": "P4",
    "color": "#FF7575"
  },
  "plan": null,
  "suite": {
    "id": "63bb744414bd13c9def24ce4",
    "url": "https://{rest_api_root}/v2/ship/idea_suites/63bb744414bd13c9def24ce4",
    "name": "需求模块",
    "type": "module"
  },
  "plan_at": null,
  "real_at": null,
  "score": 0,
  "rate": 0,
  "description": "这是一段描述",
  "properties": {
    "backlog_from": "5cb7e6e2fda1ce4ca0000001",
    "backlog_type": "5cb7e763fda1ce4ca0010002",
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value"
  },
  "entity_properties": {
    "entity_property_key_a": {
      "score": 95,
      "risk": "low"
    },
    "entity_property_key_b": "123456"
  },
  "tags": [
    {
      "id": "63eca881a0a13a3efc8d49f1",
      "url": "https://{rest_api_root}/v2/ship/tags/63eca881a0a13a3efc8d49f1",
      "name": "已确认"
    }
  ],
  "participants": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=idea&principal_id=64b4d70ba368e6594360ea24",
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
  "completed_at": null,
  "completed_by": null,
  "created_at": 1689573131,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1689573131,
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

<a id="get-v2-ship-ideas-idea-id"></a>

### 获取一个需求

`GET /v2/ship/ideas/{idea_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:idea`

用于按 id、whole_identifier 或 short_id 获取需求全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_id` | string | 是 | 需求的 id、whole_identifier 或 short_id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_public_image_token` | string |  | 包含获取图片资源 token 的属性。使用','分割，最多 32 个，支持 `description` 和自定义多行文本类型的属性。参数示例 `description,properties.xxx` |
| `include_deleted` | boolean |  | 是否包含已删除的需求。该值默认为`false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求的 id |
| `url` | string | 是 | 需求的资源地址 |
| `short_id` | string | 是 | 需求的短 id |
| `html_url` | string | 是 | 需求的 html 地址 |
| `product` | object | 是 | 需求的所属产品 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `identifier` | number | 是 | 需求的编号 |
| `whole_identifier` | string | 是 | 需求的完整编号 |
| `title` | string | 是 | 需求的标题 |
| `assignee` | object | 是 | 需求的负责人 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `state` | object | 是 | 需求的状态 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `priority` | object | 是 | 需求的优先级 |
| `priority.id` | string |  |  |
| `priority.url` | string |  |  |
| `priority.name` | string |  |  |
| `priority.color` | string |  |  |
| `plan` | object | 是 | 需求的计划 |
| `plan.id` | string |  |  |
| `plan.url` | string |  |  |
| `plan.name` | string |  |  |
| `suite` | object | 是 | 需求的模块 |
| `suite.id` | string |  |  |
| `suite.url` | string |  |  |
| `suite.name` | string |  |  |
| `suite.type` | string |  |  |
| `plan_at` | object | 是 | 需求的计划时间范围 |
| `plan_at.from` | object | 是 | 需求的计划开始时间 |
| `plan_at.from.date` | number |  |  |
| `plan_at.from.with_time` | number |  |  |
| `plan_at.to` | object | 是 | 需求的计划结束时间 |
| `plan_at.to.date` | number |  |  |
| `plan_at.to.with_time` | number |  |  |
| `plan_at.granularity` | string | 是 | 需求的计划时间周期单位；枚举："year" / "quarter" / "month" / "day" |
| `real_at` | object | 是 | 需求的实际时间范围 |
| `real_at.from` | object | 是 | 需求的实际开始时间 |
| `real_at.from.date` | number |  |  |
| `real_at.from.with_time` | number |  |  |
| `real_at.to` | object | 是 | 需求的实际结束时间 |
| `real_at.to.date` | number |  |  |
| `real_at.to.with_time` | number |  |  |
| `real_at.granularity` | string | 是 | 需求的计划时间周期单位；枚举："year" / "quarter" / "month" / "day" |
| `score` | number | 是 | 需求的分数 |
| `rate` | number | 是 | 需求的进度，取值范围为 0 到 100 的整数 |
| `description` | string | 是 | 需求的描述 |
| `properties` | object | 是 | 需求的自定义属性 |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `tags` | object[] | 是 | 需求的标签列表 |
| `tags[].id` | string |  |  |
| `tags[].url` | string |  |  |
| `tags[].name` | string |  |  |
| `participants` | object[] | 是 | 需求的关注人列表 |
| `participants[].id` | string |  |  |
| `participants[].url` | string |  |  |
| `participants[].type` | string |  |  |
| `participants[].user` | object |  |  |
| `participants[].user.id` | string |  |  |
| `participants[].user.url` | string |  |  |
| `participants[].user.name` | string |  |  |
| `participants[].user.display_name` | string |  |  |
| `participants[].user.avatar` | string |  |  |
| `participants[].user_group` | object |  |  |
| `participants[].user_group.id` | string |  |  |
| `participants[].user_group.url` | string |  |  |
| `participants[].user_group.name` | string |  |  |
| `public_image_token` | string | 是 | 需求描述和自定义多行文本类型属性里获取图片资源 token。获取一个需求和获取需求列表参数 `include_public_image_token` 值有效时返回 |
| `completed_at` | number | 是 | 需求的完成时间 |
| `completed_by` | object | 是 | 需求的完成人 |
| `completed_by.id` | string |  |  |
| `completed_by.url` | string |  |  |
| `completed_by.name` | string |  |  |
| `completed_by.display_name` | string |  |  |
| `completed_by.avatar` | string |  |  |
| `created_at` | number | 是 | 需求的创建时间 |
| `created_by` | object | 是 | 需求的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 需求的更新时间 |
| `updated_by` | object | 是 | 需求的更新人 |
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
  "id": "64b4d70ba368e6594360ea24",
  "url": "https://{rest_api_root}/v2/ship/ideas/64b4d70ba368e6594360ea24",
  "short_id": "Ogf1EYey",
  "html_url": "https://yctech.pingcode.com/ship/ideas/Ogf1EYey",
  "product": {
    "id": "6422711c3f12e6c1e46d40e9",
    "url": "http://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  },
  "identifier": 1,
  "whole_identifier": "SLC-1",
  "title": "示例需求",
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "state": {
    "id": "63e1bf51898a0be5a2d21b2a",
    "url": "https://{rest_api_root}/v2/ship/idea_states/63e1bf51898a0be5a2d21b2a",
    "name": "待评审",
    "type": "pending"
  },
  "priority": {
    "id": "5cb9466afda1ce4ca0090005",
    "url": "https://{rest_api_root}/v2/ship/idea_priorities/5cb9466afda1ce4ca0090005",
    "name": "P0",
    "color": "#FF7575"
  },
  "plan": {
    "id": "63bb744414bd13c9def24ce4",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9/idea_plans/63bb744414bd13c9def24ce4",
    "name": "账号管理"
  },
  "suite": {
    "id": "63bb744414bd13c9def24ce4",
    "url": "https://{rest_api_root}/v2/ship/idea_suites/63bb744414bd13c9def24ce4",
    "name": "需求模块",
    "type": "module"
  },
  "plan_at": {
    "from": {
      "date": 1690732800,
      "with_time": 0
    },
    "to": {
      "date": 1691337599,
      "with_time": 0
    },
    "granularity": "day"
  },
  "real_at": {
    "from": {
      "date": 1690732800,
      "with_time": 0
    },
    "to": {
      "date": 1691337599,
      "with_time": 0
    },
    "granularity": "day"
  },
  "score": 0,
  "rate": 60,
  "description": "这是一段描述",
  "properties": {
    "backlog_from": "5cb7e6e2fda1ce4ca0000001",
    "backlog_type": "5cb7e763fda1ce4ca0010002"
  },
  "entity_properties": {
    "entity_property_key_a": {
      "score": 95,
      "risk": "low"
    },
    "entity_property_key_b": "123456"
  },
  "tags": [
    {
      "id": "63eca881a0a13a3efc8d49f1",
      "url": "https://{rest_api_root}/v2/ship/tags/63eca881a0a13a3efc8d49f1",
      "name": "已确认"
    }
  ],
  "participants": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=idea&principal_id=64b4d70ba368e6594360ea24",
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
      "url": "https://{rest_api_root}/v2/participants/63c8fb32729dee3334d96af7?principal_type=idea&principal_id=64b4d70ba368e6594360ea24",
      "type": "user_group",
      "user_group": {
        "id": "63c8fb32729dee3334d96af7",
        "url": "https://{rest_api_root}/v2/directory/groups/63c8fb32729dee3334d96af7",
        "name": "Open Team"
      }
    }
  ],
  "public_image_token": "-fkvANQ2dcVECK6Xg45L3kG8VCbOTK8NrNckGkxljQD",
  "completed_at": 1689579131,
  "completed_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "created_at": 1689573131,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1689579131,
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

<a id="patch-v2-ship-ideas-idea-id"></a>

### 部分更新一个需求

`PATCH /v2/ship/ideas/{idea_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:idea`

用于部分更新一个需求。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_id` | string | 是 | 需求 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title` | string |  | 需求的标题，最大长度为 255 |
| `description` | string |  | 需求的描述 |
| `state_id` | string |  | 需求状态的 id，您可以在 `获取需求状态列表` API 获取 |
| `priority_id` | string |  | 需求优先级的 id，您可以在 `获取需求优先级列表` API 获取 |
| `assignee_id` | string |  | 需求负责人的 id |
| `rate` | number |  | 需求的进度，取值范围为：0 到 100 的整数 |
| `plan_at` | object |  | 需求的计划时间。plan_at 是整体更新的，其中包含 `from`、`to`、`granularity` 三个属性，均为必填 |
| `plan_at.from` | object | 是 | 需求的计划开始时间。为秒级时间戳 |
| `plan_at.from.date` | number |  |  |
| `plan_at.from.with_time` | number |  |  |
| `plan_at.to` | object | 是 | 需求的计划结束时间。为秒级时间戳 |
| `plan_at.to.date` | number |  |  |
| `plan_at.to.with_time` | number |  |  |
| `plan_at.granularity` | string | 是 | 需求的计划时间周期单位；枚举："year" / "quarter" / "month" / "day" |
| `real_at` | object |  | 需求的实际时间，参数格式同 `plan_at` |
| `real_at.from` | object |  |  |
| `real_at.from.date` | number |  |  |
| `real_at.from.with_time` | number |  |  |
| `real_at.to` | object |  |  |
| `real_at.to.date` | number |  |  |
| `real_at.to.with_time` | number |  |  |
| `real_at.granularity` | string |  |  |
| `plan_id` | string |  | 产品排期的 id，您可以在 `获取产品排期列表` API 获取 |
| `suite_id` | string |  | 产品模块的 id，您可以在 `获取产品模块列表` API 获取 |
| `properties` | object |  | 需求的自定义属性 |

**请求示例**

```json
{
  "title": "示例需求",
  "description": "这是一段描述",
  "state_id": "63e1bf51898a0be5a2d21b2a",
  "priority_id": "5cb9466afda1ce4ca0090005",
  "assignee_id": "a0417f68e846aae315c85d24643678a9",
  "rate": 88,
  "plan_at": {
    "from": {
      "date": 1690732800,
      "with_time": 0
    },
    "to": {
      "date": 1691337599,
      "with_time": 0
    },
    "granularity": "day"
  },
  "real_at": {
    "from": {
      "date": 1690732800,
      "with_time": 0
    },
    "to": {
      "date": 1691337599,
      "with_time": 0
    },
    "granularity": "day"
  },
  "plan_id": "63bb744414bd13c9def24ce4",
  "suite_id": "63bb744414bd13c9def24ce4",
  "properties": {
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value"
  }
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string |  |  |
| `url` | string |  |  |
| `short_id` | string |  |  |
| `html_url` | string |  |  |
| `product` | object |  |  |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |
| `identifier` | number |  |  |
| `whole_identifier` | string |  |  |
| `title` | string |  |  |
| `assignee` | object |  |  |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `state` | object |  |  |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `priority` | object |  |  |
| `priority.id` | string |  |  |
| `priority.url` | string |  |  |
| `priority.name` | string |  |  |
| `priority.color` | string |  |  |
| `plan` | object |  |  |
| `plan.id` | string |  |  |
| `plan.url` | string |  |  |
| `plan.name` | string |  |  |
| `suite` | object |  |  |
| `suite.id` | string |  |  |
| `suite.url` | string |  |  |
| `suite.name` | string |  |  |
| `suite.type` | string |  |  |
| `plan_at` | object |  |  |
| `plan_at.from` | object |  |  |
| `plan_at.from.date` | number |  |  |
| `plan_at.from.with_time` | number |  |  |
| `plan_at.to` | object |  |  |
| `plan_at.to.date` | number |  |  |
| `plan_at.to.with_time` | number |  |  |
| `plan_at.granularity` | string |  |  |
| `real_at` | object |  |  |
| `real_at.from` | object |  |  |
| `real_at.from.date` | number |  |  |
| `real_at.from.with_time` | number |  |  |
| `real_at.to` | object |  |  |
| `real_at.to.date` | number |  |  |
| `real_at.to.with_time` | number |  |  |
| `real_at.granularity` | string |  |  |
| `score` | number |  |  |
| `rate` | number |  |  |
| `description` | string |  |  |
| `properties` | object |  |  |
| `properties.backlog_from` | string |  |  |
| `properties.backlog_type` | string |  |  |
| `properties.prop_a` | string |  |  |
| `properties.prop_b` | string |  |  |
| `entity_properties` | object |  |  |
| `entity_properties.entity_property_key_a` | object |  |  |
| `entity_properties.entity_property_key_a.score` | number |  |  |
| `entity_properties.entity_property_key_a.risk` | string |  |  |
| `entity_properties.entity_property_key_b` | string |  |  |
| `tags` | object[] |  |  |
| `tags[].id` | string |  |  |
| `tags[].url` | string |  |  |
| `tags[].name` | string |  |  |
| `participants` | object[] |  |  |
| `participants[].id` | string |  |  |
| `participants[].url` | string |  |  |
| `participants[].type` | string |  |  |
| `participants[].user` | object |  |  |
| `participants[].user.id` | string |  |  |
| `participants[].user.url` | string |  |  |
| `participants[].user.name` | string |  |  |
| `participants[].user.display_name` | string |  |  |
| `participants[].user.avatar` | string |  |  |
| `completed_at` | number |  |  |
| `completed_by` | object |  |  |
| `completed_by.id` | string |  |  |
| `completed_by.url` | string |  |  |
| `completed_by.name` | string |  |  |
| `completed_by.display_name` | string |  |  |
| `completed_by.avatar` | string |  |  |
| `created_at` | number |  |  |
| `created_by` | object |  |  |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number |  |  |
| `updated_by` | object |  |  |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |
| `is_archived` | number |  |  |
| `is_deleted` | number |  |  |

**响应示例**

```json
{
  "id": "64b4d70ba368e6594360ea24",
  "url": "https://{rest_api_root}/v2/ship/ideas/64b4d70ba368e6594360ea24",
  "short_id": "Ogf1EYey",
  "html_url": "https://yctech.pingcode.com/ship/ideas/Ogf1EYey",
  "product": {
    "id": "6422711c3f12e6c1e46d40e9",
    "url": "http://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  },
  "identifier": 1,
  "whole_identifier": "SLC-1",
  "title": "示例需求",
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "state": {
    "id": "63e1bf51898a0be5a2d21b2a",
    "url": "https://{rest_api_root}/v2/ship/idea_states/63e1bf51898a0be5a2d21b2a",
    "name": "待评审",
    "type": "pending"
  },
  "priority": {
    "id": "5cb9466afda1ce4ca0090005",
    "url": "https://{rest_api_root}/v2/ship/idea_priorities/5cb9466afda1ce4ca0090005",
    "name": "P0",
    "color": "#FF7575"
  },
  "plan": {
    "id": "63bb744414bd13c9def24ce4",
    "url": "http://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9/idea_plans/63bb744414bd13c9def24ce4",
    "name": "账号管理"
  },
  "suite": {
    "id": "63bb744414bd13c9def24ce4",
    "url": "https://{rest_api_root}/v2/ship/idea_suites/63bb744414bd13c9def24ce4",
    "name": "需求模块",
    "type": "module"
  },
  "plan_at": {
    "from": {
      "date": 1690732800,
      "with_time": 0
    },
    "to": {
      "date": 1691337599,
      "with_time": 0
    },
    "granularity": "day"
  },
  "real_at": {
    "from": {
      "date": 1690732800,
      "with_time": 0
    },
    "to": {
      "date": 1691337599,
      "with_time": 0
    },
    "granularity": "day"
  },
  "score": 0,
  "rate": 88,
  "description": "这是一段描述",
  "properties": {
    "backlog_from": "5cb7e6e2fda1ce4ca0000001",
    "backlog_type": "5cb7e763fda1ce4ca0010002",
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value"
  },
  "entity_properties": {
    "entity_property_key_a": {
      "score": 95,
      "risk": "low"
    },
    "entity_property_key_b": "123456"
  },
  "tags": [
    {
      "id": "63eca881a0a13a3efc8d49f1",
      "url": "https://{rest_api_root}/v2/ship/tags/63eca881a0a13a3efc8d49f1",
      "name": "已确认"
    }
  ],
  "participants": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=idea&principal_id=64b4d70ba368e6594360ea24",
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
  "completed_at": 1689578888,
  "completed_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "created_at": 1689573131,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1689578888,
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

<a id="get-v2-ship-ideas"></a>

### 获取需求列表

`GET /v2/ship/ideas` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:idea`

用于简单查询需求列表。  
 复杂组合、日期或自定义属性过滤请使用「搜索需求列表」。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string |  | 产品的 id |
| `state_id` | string |  | 需求状态的 id |
| `priority_id` | string |  | 需求优先级的 id |
| `keywords` | string |  | 关键字。支持需求编号和需求标题 |
| `include_public_image_token` | string |  | 包含获取图片资源 token 的属性。使用','分割，最多 32 个，支持 `description` 和自定义多行文本类型的属性。参数示例 `description,properties.prop_b` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 需求全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].short_id` | string |  |  |
| `values[].html_url` | string |  |  |
| `values[].product` | object |  |  |
| `values[].product.id` | string |  |  |
| `values[].product.url` | string |  |  |
| `values[].product.identifier` | string |  |  |
| `values[].product.name` | string |  |  |
| `values[].product.is_archived` | number |  |  |
| `values[].product.is_deleted` | number |  |  |
| `values[].identifier` | number |  |  |
| `values[].whole_identifier` | string |  |  |
| `values[].title` | string |  |  |
| `values[].assignee` | object |  |  |
| `values[].assignee.id` | string |  |  |
| `values[].assignee.url` | string |  |  |
| `values[].assignee.name` | string |  |  |
| `values[].assignee.display_name` | string |  |  |
| `values[].assignee.avatar` | string |  |  |
| `values[].state` | object |  |  |
| `values[].state.id` | string |  |  |
| `values[].state.url` | string |  |  |
| `values[].state.name` | string |  |  |
| `values[].state.type` | string |  |  |
| `values[].priority` | object |  |  |
| `values[].priority.id` | string |  |  |
| `values[].priority.url` | string |  |  |
| `values[].priority.name` | string |  |  |
| `values[].priority.color` | string |  |  |
| `values[].plan` | object |  |  |
| `values[].plan.id` | string |  |  |
| `values[].plan.url` | string |  |  |
| `values[].plan.name` | string |  |  |
| `values[].suite` | object |  |  |
| `values[].suite.id` | string |  |  |
| `values[].suite.url` | string |  |  |
| `values[].suite.name` | string |  |  |
| `values[].suite.type` | string |  |  |
| `values[].plan_at` | object |  |  |
| `values[].plan_at.from` | object |  |  |
| `values[].plan_at.from.date` | number |  |  |
| `values[].plan_at.from.with_time` | number |  |  |
| `values[].plan_at.to` | object |  |  |
| `values[].plan_at.to.date` | number |  |  |
| `values[].plan_at.to.with_time` | number |  |  |
| `values[].plan_at.granularity` | string |  |  |
| `values[].real_at` | object |  |  |
| `values[].real_at.from` | object |  |  |
| `values[].real_at.from.date` | number |  |  |
| `values[].real_at.from.with_time` | number |  |  |
| `values[].real_at.to` | object |  |  |
| `values[].real_at.to.date` | number |  |  |
| `values[].real_at.to.with_time` | number |  |  |
| `values[].real_at.granularity` | string |  |  |
| `values[].score` | number |  |  |
| `values[].rate` | number |  |  |
| `values[].description` | string |  |  |
| `values[].properties` | object |  |  |
| `values[].properties.backlog_from` | string |  |  |
| `values[].properties.backlog_type` | string |  |  |
| `values[].public_image_token` | string |  |  |
| `values[].entity_properties` | object |  |  |
| `values[].entity_properties.entity_property_key_a` | object |  |  |
| `values[].entity_properties.entity_property_key_a.score` | number |  |  |
| `values[].entity_properties.entity_property_key_a.risk` | string |  |  |
| `values[].entity_properties.entity_property_key_b` | string |  |  |
| `values[].tags` | object[] |  |  |
| `values[].tags[].id` | string |  |  |
| `values[].tags[].url` | string |  |  |
| `values[].tags[].name` | string |  |  |
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
| `values[].participants[].user_group` | object |  |  |
| `values[].participants[].user_group.id` | string |  |  |
| `values[].participants[].user_group.url` | string |  |  |
| `values[].participants[].user_group.name` | string |  |  |
| `values[].completed_at` | number |  |  |
| `values[].completed_by` | object |  |  |
| `values[].completed_by.id` | string |  |  |
| `values[].completed_by.url` | string |  |  |
| `values[].completed_by.name` | string |  |  |
| `values[].completed_by.display_name` | string |  |  |
| `values[].completed_by.avatar` | string |  |  |
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
      "id": "64b4d70ba368e6594360ea24",
      "url": "https://{rest_api_root}/v2/ship/ideas/64b4d70ba368e6594360ea24",
      "short_id": "Ogf1EYey",
      "html_url": "https://yctech.pingcode.com/ship/ideas/Ogf1EYey",
      "product": {
        "id": "6422711c3f12e6c1e46d40e9",
        "url": "http://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
        "identifier": "SLC",
        "name": "示例产品",
        "is_archived": 0,
        "is_deleted": 0
      },
      "identifier": 1,
      "whole_identifier": "SLC-1",
      "title": "示例需求",
      "assignee": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "state": {
        "id": "63e1bf51898a0be5a2d21b2a",
        "url": "https://{rest_api_root}/v2/ship/idea_states/63e1bf51898a0be5a2d21b2a",
        "name": "待评审",
        "type": "pending"
      },
      "priority": {
        "id": "5cb9466afda1ce4ca0090005",
        "url": "https://{rest_api_root}/v2/ship/idea_priorities/5cb9466afda1ce4ca0090005",
        "name": "P0",
        "color": "#FF7575"
      },
      "plan": {
        "id": "63bb744414bd13c9def24ce4",
        "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9/idea_plans/63bb744414bd13c9def24ce4",
        "name": "账号管理"
      },
      "suite": {
        "id": "63bb744414bd13c9def24ce4",
        "url": "https://{rest_api_root}/v2/ship/idea_suites/63bb744414bd13c9def24ce4",
        "name": "需求模块",
        "type": "module"
      },
      "plan_at": {
        "from": {
          "date": 1690732800,
          "with_time": 0
        },
        "to": {
          "date": 1691337599,
          "with_time": 0
        },
        "granularity": "day"
      },
      "real_at": {
        "from": {
          "date": 1690732800,
          "with_time": 0
        },
        "to": {
          "date": 1691337599,
          "with_time": 0
        },
        "granularity": "day"
      },
      "score": 0,
      "rate": 60,
      "description": "这是一段描述",
      "properties": {
        "backlog_from": "5cb7e6e2fda1ce4ca0000001",
        "backlog_type": "5cb7e763fda1ce4ca0010002"
      },
      "public_image_token": "-fkvANQ2dcVECK6Xg45L3kG8VCbOTK8NrNckGkxljQd",
      "entity_properties": {
        "entity_property_key_a": {
          "score": 95,
          "risk": "low"
        },
        "entity_property_key_b": "123456"
      },
      "tags": [
        {
          "id": "63eca881a0a13a3efc8d49f1",
          "url": "https://{rest_api_root}/v2/ship/tags/63eca881a0a13a3efc8d49f1",
          "name": "已确认"
        }
      ],
      "participants": [
        {
          "id": "a0417f68e846aae315c85d24643678a9",
          "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=idea&principal_id=64b4d70ba368e6594360ea24",
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
          "url": "https://{rest_api_root}/v2/participants/63c8fb32729dee3334d96af7?principal_type=idea&principal_id=64b4d70ba368e6594360ea24",
          "type": "user_group",
          "user_group": {
            "id": "63c8fb32729dee3334d96af7",
            "url": "https://{rest_api_root}/v2/directory/groups/63c8fb32729dee3334d96af7",
            "name": "Open Team"
          }
        }
      ],
      "completed_at": 1689573131,
      "completed_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "created_at": 1689573131,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "updated_at": 1689579131,
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

<a id="post-v2-ship-ideas-search"></a>

### 搜索需求列表

`POST /v2/ship/ideas/search` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:idea`

用于按类 MongoDB 结构化条件搜索需求。  
 默认不含已删除/已归档项。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `mode` | string | 是 | 搜索模式。`query` 表示基于 `payload.filter` 的结构化条件查询；枚举："query" |
| `payload` | object | 是 | 搜索参数 |
| `payload.filter` | object |  | 过滤条件。 过滤时使用类 MongoDB 的查询语法，可通过属性名、操作符和对应值进行过滤。 引用类型（含数组引用类型）使用 `{属性名}.id` 作为属性名，例如 `product.id`、`tags.id`、`participants.id`。 自定义属性使用 `properties.{属性 key}` 作为属性名，例如 `properties.prop_a`。 文本类型（如 `title`、`description`，以及自定义单行文本、多行文本、链接类型）的操作符： `exists`、`contains`。 数字类型（如 `identifier`、`score`、`effort`、`rate`）的操作符： `exists`、`eq`、`ne`、`gt`、`lt`、`gte`、`lte`。 时间类型（如 `created_at`、`updated_at`、`completed_at`、以及自定义日期）的操作符： `exists`、`gt`、`lt`、`gte`、`lte`、`between`（值为 `[起始时间戳, 结束时间戳]`；过滤时以「天」为单位。 选项类型（自定义下拉单选、下拉多选、级联单选、级联多选）的操作符： `exists`、`in`、`nin`。 引用类型（如 `product.id`、`state.id`、`priority.id`、`assignee.id`、`company.id`、`tags.id`）的操作符： `exists`、`in`、`nin`。 每个属性仅支持一个操作符。 暂不支持使用逻辑运算符。 内置属性暂不支持过滤：`id`、`url`、`whole_identifier`、`short_id`、`html_url`、`public_image_token`、`is_archived`、`is_deleted` |
| `payload.filter.title` | object |  |  |
| `payload.filter.title.contains` | string |  |  |
| `payload.filter.assignee.id` | object |  |  |
| `payload.filter.assignee.id.nin` | string[] |  |  |
| `payload.filter.product.id` | object |  |  |
| `payload.filter.product.id.in` | string[] |  |  |
| `payload.filter.tags.id` | object |  |  |
| `payload.filter.tags.id.in` | string[] |  |  |
| `payload.filter.participants.id` | object |  |  |
| `payload.filter.participants.id.in` | string[] |  |  |
| `payload.filter.created_at` | object |  |  |
| `payload.filter.created_at.gte` | number |  |  |
| `payload.keywords` | string |  | 关键字。支持需求编号和需求标题 |
| `payload.include_public_image_token` | string |  | 包含获取图片资源 token 的属性。使用 `,` 分割，最多 32 个，支持 `description` 和自定义多行文本类型的属性 |
| `payload.page_size` | number |  | 每页条数，取值范围 1-100 |
| `payload.page_index` | number |  | 页码，从 0 开始 |

**请求示例**

```json
{
  "mode": "query",
  "payload": {
    "filter": {
      "title": {
        "contains": "账号"
      },
      "assignee.id": {
        "nin": [
          "315c85d24643678a9a0417f68e846aae"
        ]
      },
      "product.id": {
        "in": [
          "6422711c3f12e6c1e46d40e9"
        ]
      },
      "tags.id": {
        "in": [
          "63eca881a0a13a3efc8d49f1"
        ]
      },
      "participants.id": {
        "in": [
          "a0417f68e846aae315c85d24643678a9"
        ]
      },
      "created_at": {
        "gte": 1730000000
      }
    },
    "keywords": "SLC-1",
    "include_public_image_token": "description",
    "page_size": 10,
    "page_index": 0
  }
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 需求全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].short_id` | string |  |  |
| `values[].html_url` | string |  |  |
| `values[].product` | object |  |  |
| `values[].product.id` | string |  |  |
| `values[].product.url` | string |  |  |
| `values[].product.identifier` | string |  |  |
| `values[].product.name` | string |  |  |
| `values[].product.is_archived` | number |  |  |
| `values[].product.is_deleted` | number |  |  |
| `values[].identifier` | number |  |  |
| `values[].whole_identifier` | string |  |  |
| `values[].title` | string |  |  |
| `values[].assignee` | object |  |  |
| `values[].assignee.id` | string |  |  |
| `values[].assignee.url` | string |  |  |
| `values[].assignee.name` | string |  |  |
| `values[].assignee.display_name` | string |  |  |
| `values[].assignee.avatar` | string |  |  |
| `values[].state` | object |  |  |
| `values[].state.id` | string |  |  |
| `values[].state.url` | string |  |  |
| `values[].state.name` | string |  |  |
| `values[].state.type` | string |  |  |
| `values[].priority` | object |  |  |
| `values[].priority.id` | string |  |  |
| `values[].priority.url` | string |  |  |
| `values[].priority.name` | string |  |  |
| `values[].priority.color` | string |  |  |
| `values[].plan` | object |  |  |
| `values[].plan.id` | string |  |  |
| `values[].plan.url` | string |  |  |
| `values[].plan.name` | string |  |  |
| `values[].suite` | object |  |  |
| `values[].suite.id` | string |  |  |
| `values[].suite.url` | string |  |  |
| `values[].suite.name` | string |  |  |
| `values[].suite.type` | string |  |  |
| `values[].plan_at` | object |  |  |
| `values[].plan_at.from` | object |  |  |
| `values[].plan_at.from.date` | number |  |  |
| `values[].plan_at.from.with_time` | number |  |  |
| `values[].plan_at.to` | object |  |  |
| `values[].plan_at.to.date` | number |  |  |
| `values[].plan_at.to.with_time` | number |  |  |
| `values[].plan_at.granularity` | string |  |  |
| `values[].real_at` | object |  |  |
| `values[].real_at.from` | object |  |  |
| `values[].real_at.from.date` | number |  |  |
| `values[].real_at.from.with_time` | number |  |  |
| `values[].real_at.to` | object |  |  |
| `values[].real_at.to.date` | number |  |  |
| `values[].real_at.to.with_time` | number |  |  |
| `values[].real_at.granularity` | string |  |  |
| `values[].score` | number |  |  |
| `values[].rate` | number |  |  |
| `values[].description` | string |  |  |
| `values[].properties` | object |  |  |
| `values[].properties.backlog_from` | string |  |  |
| `values[].properties.backlog_type` | string |  |  |
| `values[].public_image_token` | string |  |  |
| `values[].entity_properties` | object |  |  |
| `values[].entity_properties.entity_property_key_a` | object |  |  |
| `values[].entity_properties.entity_property_key_a.score` | number |  |  |
| `values[].entity_properties.entity_property_key_a.risk` | string |  |  |
| `values[].entity_properties.entity_property_key_b` | string |  |  |
| `values[].tags` | object[] |  |  |
| `values[].tags[].id` | string |  |  |
| `values[].tags[].url` | string |  |  |
| `values[].tags[].name` | string |  |  |
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
| `values[].participants[].user_group` | object |  |  |
| `values[].participants[].user_group.id` | string |  |  |
| `values[].participants[].user_group.url` | string |  |  |
| `values[].participants[].user_group.name` | string |  |  |
| `values[].completed_at` | number |  |  |
| `values[].completed_by` | object |  |  |
| `values[].completed_by.id` | string |  |  |
| `values[].completed_by.url` | string |  |  |
| `values[].completed_by.name` | string |  |  |
| `values[].completed_by.display_name` | string |  |  |
| `values[].completed_by.avatar` | string |  |  |
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
  "page_size": 10,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "64b4d70ba368e6594360ea24",
      "url": "https://{rest_api_root}/v2/ship/ideas/64b4d70ba368e6594360ea24",
      "short_id": "Ogf1EYey",
      "html_url": "https://yctech.pingcode.com/ship/ideas/Ogf1EYey",
      "product": {
        "id": "6422711c3f12e6c1e46d40e9",
        "url": "http://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
        "identifier": "SLC",
        "name": "示例产品",
        "is_archived": 0,
        "is_deleted": 0
      },
      "identifier": 1,
      "whole_identifier": "SLC-1",
      "title": "示例需求",
      "assignee": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "state": {
        "id": "63e1bf51898a0be5a2d21b2a",
        "url": "https://{rest_api_root}/v2/ship/idea_states/63e1bf51898a0be5a2d21b2a",
        "name": "待评审",
        "type": "pending"
      },
      "priority": {
        "id": "5cb9466afda1ce4ca0090005",
        "url": "https://{rest_api_root}/v2/ship/idea_priorities/5cb9466afda1ce4ca0090005",
        "name": "P0",
        "color": "#FF7575"
      },
      "plan": {
        "id": "63bb744414bd13c9def24ce4",
        "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9/idea_plans/63bb744414bd13c9def24ce4",
        "name": "账号管理"
      },
      "suite": {
        "id": "63bb744414bd13c9def24ce4",
        "url": "https://{rest_api_root}/v2/ship/idea_suites/63bb744414bd13c9def24ce4",
        "name": "需求模块",
        "type": "module"
      },
      "plan_at": {
        "from": {
          "date": 1690732800,
          "with_time": 0
        },
        "to": {
          "date": 1691337599,
          "with_time": 0
        },
        "granularity": "day"
      },
      "real_at": {
        "from": {
          "date": 1690732800,
          "with_time": 0
        },
        "to": {
          "date": 1691337599,
          "with_time": 0
        },
        "granularity": "day"
      },
      "score": 0,
      "rate": 60,
      "description": "这是一段描述",
      "properties": {
        "backlog_from": "5cb7e6e2fda1ce4ca0000001",
        "backlog_type": "5cb7e763fda1ce4ca0010002"
      },
      "public_image_token": "-fkvANQ2dcVECK6Xg45L3kG8VCbOTK8NrNckGkxljQd",
      "entity_properties": {
        "entity_property_key_a": {
          "score": 95,
          "risk": "low"
        },
        "entity_property_key_b": "123456"
      },
      "tags": [
        {
          "id": "63eca881a0a13a3efc8d49f1",
          "url": "https://{rest_api_root}/v2/ship/tags/63eca881a0a13a3efc8d49f1",
          "name": "已确认"
        }
      ],
      "participants": [
        {
          "id": "a0417f68e846aae315c85d24643678a9",
          "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=idea&principal_id=64b4d70ba368e6594360ea24",
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
          "url": "https://{rest_api_root}/v2/participants/63c8fb32729dee3334d96af7?principal_type=idea&principal_id=64b4d70ba368e6594360ea24",
          "type": "user_group",
          "user_group": {
            "id": "63c8fb32729dee3334d96af7",
            "url": "https://{rest_api_root}/v2/directory/groups/63c8fb32729dee3334d96af7",
            "name": "Open Team"
          }
        }
      ],
      "completed_at": 1689573131,
      "completed_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "created_at": 1689573131,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "updated_at": 1689579131,
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

<a id="get-v2-ship-idea-idea-states"></a>

### 获取可用的需求状态列表

`GET /v2/ship/idea/idea_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:idea`

用于分页获取产品中的需求状态。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 需求状态全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].type` | string |  |  |
| `values[].color` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "63e1bf51898a0be5a2d21b2a",
      "url": "https://{rest_api_root}/v2/ship/idea_states/63e1bf51898a0be5a2d21b2a",
      "name": "待评审",
      "type": "pending",
      "color": "#56ABFB"
    }
  ]
}
```

<a id="get-v2-ship-idea-idea-properties"></a>

### 获取可用的需求属性列表

`GET /v2/ship/idea/idea_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:idea`

用于分页获取产品中的需求属性。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 需求属性全量结构数据的数组 |
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
      "id": "backlog_type",
      "url": "https://{rest_api_root}/v2/ship/idea_properties/backlog_type",
      "name": "需求类型",
      "type": "select",
      "options": [
        {
          "id": "5cb7e763fda1ce4ca0010002",
          "text": "功能需求"
        },
        {
          "id": "5cb7e763fda1ce4ca0010004",
          "text": "体验优化"
        }
      ]
    },
    {
      "id": "identifier",
      "url": "https://{rest_api_root}/v2/ship/idea_properties/identifier",
      "name": "编号",
      "type": "text",
      "options": null
    }
  ]
}
```

<a id="get-v2-ship-idea-idea-suites"></a>

### 获取可用的需求模块列表

`GET /v2/ship/idea/idea_suites` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:idea`

用于分页获取产品中的需求模块。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 需求模块全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].type` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "63bb744414bd13c9def24ce4",
      "url": "https://{rest_api_root}/v2/ship/idea_suites/63bb744414bd13c9def24ce4",
      "name": "需求模块",
      "type": "module"
    }
  ]
}
```

<a id="get-v2-ship-idea-idea-plans"></a>

### 获取可用的需求计划列表

`GET /v2/ship/idea/idea_plans` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:idea`

用于分页获取产品中的需求计划。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 需求计划全量结构数据的数组 |
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
      "id": "63bb744414bd13c9def24ce4",
      "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6/idea_plans/63bb744414bd13c9def24ce4",
      "name": "账号管理"
    }
  ]
}
```

<a id="get-v2-ship-idea-idea-priorities"></a>

### 获取可用的需求优先级列表

`GET /v2/ship/idea/idea_priorities` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:idea`

用于分页获取产品中的需求优先级。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 需求优先级全量结构数据的数组 |
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
      "id": "5cb9466afda1ce4ca0090005",
      "url": "https://{rest_api_root}/v2/ship/idea_priorities/5cb9466afda1ce4ca0090005",
      "name": "P0",
      "color": "#FF7575"
    }
  ]
}
```

<a id="get-v2-ship-idea-tags"></a>

### 获取可用的需求标签列表

`GET /v2/ship/idea/tags` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:idea`

用于分页获取产品中可用的需求标签，包含企业级全局标签与该产品的本地标签。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 产品的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 需求标签全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].color` | string |  |  |
| `values[].product` | null \| object |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "63eca881a0a13a3efc8d49f0",
      "url": "https://{rest_api_root}/v2/ship/tags/63eca881a0a13a3efc8d49f0",
      "name": "全局标签",
      "color": "#56ABFB",
      "product": null
    },
    {
      "id": "63eca881a0a13a3efc8d49f1",
      "url": "https://{rest_api_root}/v2/ship/tags/63eca881a0a13a3efc8d49f1",
      "name": "本地标签",
      "color": "#56ABFB",
      "product": {
        "id": "6422711c3f12e6c1e46d40e6",
        "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6",
        "identifier": "SLC",
        "name": "示例产品",
        "is_archived": 0,
        "is_deleted": 0
      }
    }
  ]
}
```

<a id="get-v2-ship-ideas-idea-id-transition-histories-transition-history-id"></a>

### 获取一条需求流转记录

`GET /v2/ship/ideas/{idea_id}/transition_histories/{transition_history_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:idea`

用于按 id 获取一条需求流转记录全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_id` | string | 是 | 需求的 id |
| `transition_history_id` | string | 是 | 需求流转记录的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求流转记录的 id |
| `url` | string | 是 | 需求流转记录的资源地址 |
| `idea` | object | 是 | 需求的引用结构数据 |
| `idea.id` | string |  |  |
| `idea.url` | string |  |  |
| `idea.short_id` | string |  |  |
| `idea.html_url` | string |  |  |
| `idea.whole_identifier` | string |  |  |
| `idea.title` | string |  |  |
| `from_state` | object | 是 | 流转前需求状态的引用结构数据 |
| `to_state` | object | 是 | 流转后需求状态的引用结构数据 |
| `to_state.id` | string |  |  |
| `to_state.url` | string |  |  |
| `to_state.name` | string |  |  |
| `to_state.type` | string |  |  |
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
  "id": "64c3676c983bb9481ee1eea5",
  "url": "https://{rest_api_root}/v2/ship/ideas/64b4d70ba368e6594360ea24/transition_histories/64c3676c983bb9481ee1eea5",
  "idea": {
    "id": "64b4d70ba368e6594360ea24",
    "url": "https://{rest_api_root}/v2/ship/ideas/64b4d70ba368e6594360ea24",
    "short_id": "Ogf1EYey",
    "html_url": "https://yctech.pingcode.com/ship/ideas/Ogf1EYey",
    "whole_identifier": "SLC-1",
    "title": "示例需求"
  },
  "from_state": null,
  "to_state": {
    "id": "63e1bf51898a0be5a2d21b29",
    "url": "https://{rest_api_root}/v2/ship/idea_states/63e1bf51898a0be5a2d21b29",
    "name": "待处理",
    "type": "pending"
  },
  "created_at": 1674528614,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

<a id="get-v2-ship-ideas-idea-id-transition-histories"></a>

### 获取需求流转记录列表

`GET /v2/ship/ideas/{idea_id}/transition_histories` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:idea`

用于分页获取需求的流转记录。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_id` | string | 是 | 需求的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 需求流转记录全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].idea` | object |  |  |
| `values[].idea.id` | string |  |  |
| `values[].idea.url` | string |  |  |
| `values[].idea.short_id` | string |  |  |
| `values[].idea.html_url` | string |  |  |
| `values[].idea.whole_identifier` | string |  |  |
| `values[].idea.title` | string |  |  |
| `values[].from_state` | null \| object |  |  |
| `values[].to_state` | object |  |  |
| `values[].to_state.id` | string |  |  |
| `values[].to_state.url` | string |  |  |
| `values[].to_state.name` | string |  |  |
| `values[].to_state.type` | string |  |  |
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
  "total": 2,
  "values": [
    {
      "id": "64c3676c983bb9481ee1eea5",
      "url": "https://{rest_api_root}/v2/ship/ideas/64b4d70ba368e6594360ea24/transition_histories/64c3676c983bb9481ee1eea5",
      "idea": {
        "id": "64b4d70ba368e6594360ea24",
        "url": "https://{rest_api_root}/v2/ship/ideas/64b4d70ba368e6594360ea24",
        "short_id": "Ogf1EYey",
        "html_url": "https://yctech.pingcode.com/ship/ideas/Ogf1EYey",
        "whole_identifier": "SLC-1",
        "title": "示例需求"
      },
      "from_state": null,
      "to_state": {
        "id": "63e1bf51898a0be5a2d21b29",
        "url": "https://{rest_api_root}/v2/ship/idea_states/63e1bf51898a0be5a2d21b29",
        "name": "待处理",
        "type": "pending"
      },
      "created_at": 1674528614,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      }
    },
    {
      "id": "658bdb79e5839f556562accf",
      "url": "https://{rest_api_root}/v2/ship/ideas/64b4d70ba368e6594360ea24/transition_histories/658bdb79e5839f556562accf",
      "idea": {
        "id": "64b4d70ba368e6594360ea24",
        "url": "https://{rest_api_root}/v2/ship/ideas/64b4d70ba368e6594360ea24",
        "short_id": "Ogf1EYey",
        "html_url": "https://yctech.pingcode.com/ship/ideas/Ogf1EYey",
        "whole_identifier": "SLC-1",
        "title": "示例需求"
      },
      "from_state": {
        "id": "63e1bf51898a0be5a2d21b29",
        "url": "https://{rest_api_root}/v2/ship/idea_states/63e1bf51898a0be5a2d21b29",
        "name": "待处理",
        "type": "pending"
      },
      "to_state": {
        "id": "63e1bf51898a0be5a2d21b2b",
        "url": "https://{rest_api_root}/v2/ship/idea_states/63e1bf51898a0be5a2d21b2b",
        "name": "处理中",
        "type": "in_progress"
      },
      "created_at": 1674528614,
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

## 产品配置

> 分组路径：产品管理 / 产品配置中心 / 产品配置

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/ship/tags` | [创建一个产品标签](#post-v2-ship-tags) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/tags/{tag_id}` | [获取一个产品标签](#get-v2-ship-tags-tag-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/tags` | [获取全部产品标签列表](#get-v2-ship-tags) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/ship/tags/{tag_id}` | [删除一个产品标签](#delete-v2-ship-tags-tag-id) | 企业令牌 / 用户令牌 |

<a id="post-v2-ship-tags"></a>

### 创建一个产品标签

`POST /v2/ship/tags` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:product`

用于创建一个标签。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string |  | 产品的 id。传入时创建该产品的本地标签；不传则创建全局标签 |
| `name` | string | 是 | 标签的名称。在同一范围内（全局或同一产品）名称唯一 |

**请求示例**

```json
{
  "name": "标签-1"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 标签的 id |
| `url` | string | 是 | 标签的资源地址 |
| `name` | string | 是 | 标签的名称 |
| `color` | string | 是 | 标签的颜色 |
| `product` | object | 是 | 产品的引用结构数据。该标签是此产品的本地标签 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |

**响应示例**

```json
{
  "id": "63eca881a0a13a3efc8d49f0",
  "url": "https://{rest_api_root}/v2/ship/tags/63eca881a0a13a3efc8d49f0",
  "name": "标签-1",
  "color": "#56ABFB",
  "product": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  }
}
```

<a id="get-v2-ship-tags-tag-id"></a>

### 获取一个产品标签

`GET /v2/ship/tags/{tag_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取产品中的标签全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `tag_id` | string | 是 | 标签的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 标签的 id |
| `url` | string | 是 | 标签的资源地址 |
| `name` | string | 是 | 标签的名称 |
| `color` | string | 是 | 标签的颜色 |
| `product` | object | 是 | 产品的引用结构数据。该标签是此产品的本地标签 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |

**响应示例 1：响应示例（全局标签）**

```json
{
  "id": "63eca881a0a13a3efc8d49f1",
  "url": "https://{rest_api_root}/v2/ship/tags/63eca881a0a13a3efc8d49f1",
  "name": "标签-全局",
  "color": "#56ABFB",
  "product": null
}
```

**响应示例 2：响应示例（产品本地化标签）**

```json
{
  "id": "63eca881a0a13a3efc8d49f0",
  "url": "https://{rest_api_root}/v2/ship/tags/63eca881a0a13a3efc8d49f0",
  "name": "标签-1",
  "color": "#56ABFB",
  "product": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  }
}
```

<a id="get-v2-ship-tags"></a>

### 获取全部产品标签列表

`GET /v2/ship/tags` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取标签。传入 `product_id` 时返回该产品下的标签；不传时返回全量标签（含系统标签与各产品标签）。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string |  | 产品的 id。不传则返回全量标签 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 标签全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].color` | string |  |  |
| `values[].product` | null \| object |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "63eca881a0a13a3efc8d49f1",
      "url": "https://{rest_api_root}/v2/ship/tags/63eca881a0a13a3efc8d49f1",
      "name": "标签-全局",
      "color": "#56ABFB",
      "product": null
    },
    {
      "id": "63eca881a0a13a3efc8d49f0",
      "url": "https://{rest_api_root}/v2/ship/tags/63eca881a0a13a3efc8d49f0",
      "name": "标签-1",
      "color": "#56ABFB",
      "product": {
        "id": "6422711c3f12e6c1e46d40e6",
        "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6",
        "identifier": "SLC",
        "name": "示例产品",
        "is_archived": 0,
        "is_deleted": 0
      }
    }
  ]
}
```

<a id="delete-v2-ship-tags-tag-id"></a>

### 删除一个产品标签

`DELETE /v2/ship/tags/{tag_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:product`

用于按 id 从产品中移除一个标签。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `tag_id` | string | 是 | 标签的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 标签的 id |
| `url` | string | 是 | 标签的资源地址 |
| `name` | string | 是 | 标签的名称 |
| `color` | string | 是 | 标签的颜色 |
| `product` | object | 是 | 产品的引用结构数据。该标签是此产品的本地标签 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |

**响应示例**

```json
{
  "id": "63eca881a0a13a3efc8d49f0",
  "url": "https://{rest_api_root}/v2/ship/tags/63eca881a0a13a3efc8d49f0",
  "name": "标签-1",
  "color": "#56ABFB",
  "product": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e6",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  }
}
```

## 工单配置

> 分组路径：产品管理 / 产品配置中心 / 工单配置

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `GET` | `/v2/ship/ticket_types/{ticket_type_id}` | [获取一个工单类型](#get-v2-ship-ticket-types-ticket-type-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_types` | [获取全部工单类型列表](#get-v2-ship-ticket-types) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/ship/ticket_states` | [创建一个工单状态](#post-v2-ship-ticket-states) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_states/{ticket_state_id}` | [获取一个工单状态](#get-v2-ship-ticket-states-ticket-state-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/ship/ticket_states/{ticket_state_id}` | [部分更新一个工单状态](#patch-v2-ship-ticket-states-ticket-state-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_states` | [获取全部工单状态列表](#get-v2-ship-ticket-states) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_state_plans/{ticket_state_plan_id}` | [获取一个工单状态方案](#get-v2-ship-ticket-state-plans-ticket-state-plan-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_state_plans` | [获取工单状态方案列表](#get-v2-ship-ticket-state-plans) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/ship/ticket_state_plans/{ticket_state_plan_id}/ticket_states` | [向工单状态方案中添加一个状态](#post-v2-ship-ticket-state-plans-ticket-state-plan-id-ticket-states) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_state_plans/{ticket_state_plan_id}/ticket_states/{ticket_state_id}` | [获取工单状态方案中的一个状态](#get-v2-ship-ticket-state-plans-ticket-state-plan-id-ticket-states-ticket-state-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_state_plans/{ticket_state_plan_id}/ticket_states` | [获取工单状态方案中的状态列表](#get-v2-ship-ticket-state-plans-ticket-state-plan-id-ticket-states) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/ship/ticket_state_plans/{ticket_state_plan_id}/ticket_states/{ticket_state_id}` | [在工单状态方案中移除一个状态](#delete-v2-ship-ticket-state-plans-ticket-state-plan-id-ticket-states-ticket-state-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/ship/ticket_state_plans/{ticket_state_plan_id}/ticket_state_flows` | [向工单状态方案中添加一个状态流转](#post-v2-ship-ticket-state-plans-ticket-state-plan-id-ticket-state-flows) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_state_plans/{ticket_state_plan_id}/ticket_state_flows/{ticket_state_flow_id}` | [获取工单状态方案中的一个状态流转](#get-v2-ship-ticket-state-plans-ticket-state-plan-id-ticket-state-flows-ticket-state-flow-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_state_plans/{ticket_state_plan_id}/ticket_state_flows` | [获取工单状态方案中的状态流转列表](#get-v2-ship-ticket-state-plans-ticket-state-plan-id-ticket-state-flows) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/ship/ticket_state_plans/{ticket_state_plan_id}/ticket_state_flows/{ticket_state_flow_id}` | [在工单状态方案中移除一个状态流转](#delete-v2-ship-ticket-state-plans-ticket-state-plan-id-ticket-state-flows-ticket-state-flow-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/ship/ticket_properties` | [创建一个工单属性](#post-v2-ship-ticket-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_properties/{ticket_property_id}` | [获取一个工单属性](#get-v2-ship-ticket-properties-ticket-property-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/ship/ticket_properties/{ticket_property_id}` | [部分更新一个工单属性](#patch-v2-ship-ticket-properties-ticket-property-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_properties` | [获取全部工单属性列表](#get-v2-ship-ticket-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_property_plans/{ticket_property_plan_id}` | [获取一个工单属性方案](#get-v2-ship-ticket-property-plans-ticket-property-plan-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_property_plans` | [获取工单属性方案列表](#get-v2-ship-ticket-property-plans) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/ship/ticket_property_plans/{ticket_property_plan_id}/ticket_properties` | [向工单属性方案中添加一个属性](#post-v2-ship-ticket-property-plans-ticket-property-plan-id-ticket-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_property_plans/{ticket_property_plan_id}/ticket_properties/{ticket_property_id}` | [获取工单属性方案中的一个属性](#get-v2-ship-ticket-property-plans-ticket-property-plan-id-ticket-properties-ticket-property-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_property_plans/{ticket_property_plan_id}/ticket_properties` | [获取工单属性方案中的属性列表](#get-v2-ship-ticket-property-plans-ticket-property-plan-id-ticket-properties) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/ship/ticket_property_plans/{ticket_property_plan_id}/ticket_properties/{ticket_property_id}` | [在工单属性方案中移除一个属性](#delete-v2-ship-ticket-property-plans-ticket-property-plan-id-ticket-properties-ticket-property-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_priorities/{ticket_priority_id}` | [获取一个工单优先级](#get-v2-ship-ticket-priorities-ticket-priority-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_priorities` | [获取全部工单优先级列表](#get-v2-ship-ticket-priorities) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_solutions/{ticket_solution_id}` | [获取一个工单解决方案](#get-v2-ship-ticket-solutions-ticket-solution-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/ticket_solutions` | [获取全部工单解决方案列表](#get-v2-ship-ticket-solutions) | 企业令牌 / 用户令牌 |

<a id="get-v2-ship-ticket-types-ticket-type-id"></a>

### 获取一个工单类型

`GET /v2/ship/ticket_types/{ticket_type_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取工单类型全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_type_id` | string | 是 | 工单类型的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单类型的 id |
| `url` | string | 是 | 工单类型的资源地址 |
| `name` | string | 是 | 工单类型的名称 |
| `is_system` | number | 是 | 是否为系统内置类型 |

**响应示例**

```json
{
  "id": "63bb744214bd13c9def24ca9",
  "url": "https://{rest_api_root}/v2/ship/ticket_types/63bb744214bd13c9def24ca9",
  "name": "需求",
  "is_system": 1
}
```

<a id="get-v2-ship-ticket-types"></a>

### 获取全部工单类型列表

`GET /v2/ship/ticket_types` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取企业内全部工单类型。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 全部工单类型全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].is_system` | number |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "63bb744214bd13c9def24ca9",
      "url": "https://{rest_api_root}/v2/ship/ticket_types/63bb744214bd13c9def24ca9",
      "name": "需求",
      "is_system": 1
    }
  ]
}
```

<a id="post-v2-ship-ticket-states"></a>

### 创建一个工单状态

`POST /v2/ship/ticket_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于创建一个工单状态。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 工单状态的名称，在一个企业中这个名称是唯一的 |
| `type` | string | 是 | 工单状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |

**请求示例**

```json
{
  "name": "处理中",
  "type": "pending"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单状态的 id |
| `url` | string | 是 | 工单状态的资源地址 |
| `name` | string | 是 | 工单状态的名称 |
| `type` | string | 是 | 工单状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |
| `color` | string | 是 | 工单状态的颜色 |

**响应示例**

```json
{
  "id": "6422711c3f12e6c1e46d40f2",
  "url": "https://{rest_api_root}/v2/ship/ticket_states/6422711c3f12e6c1e46d40f2",
  "name": "处理中",
  "type": "pending",
  "color": "#56ABFB"
}
```

<a id="get-v2-ship-ticket-states-ticket-state-id"></a>

### 获取一个工单状态

`GET /v2/ship/ticket_states/{ticket_state_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取工单状态全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_state_id` | string | 是 | 工单状态的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单状态的 id |
| `url` | string | 是 | 工单状态的资源地址 |
| `name` | string | 是 | 工单状态的名称 |
| `type` | string | 是 | 工单状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |
| `color` | string | 是 | 工单状态的颜色 |

**响应示例**

```json
{
  "id": "6422711c3f12e6c1e46d40f2",
  "url": "https://{rest_api_root}/v2/ship/ticket_states/6422711c3f12e6c1e46d40f2",
  "name": "处理中",
  "type": "pending",
  "color": "#56ABFB"
}
```

<a id="patch-v2-ship-ticket-states-ticket-state-id"></a>

### 部分更新一个工单状态

`PATCH /v2/ship/ticket_states/{ticket_state_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于部分更新一个工单状态。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_state_id` | string | 是 | 工单状态 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 工单状态的名称，在一个企业中这个名称是唯一的 |
| `type` | string |  | 工单状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |

**请求示例**

```json
{
  "name": "已完成",
  "type": "completed"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单状态的 id |
| `url` | string | 是 | 工单状态的资源地址 |
| `name` | string | 是 | 工单状态的名称 |
| `type` | string | 是 | 工单状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |
| `color` | string | 是 | 工单状态的颜色 |

**响应示例**

```json
{
  "id": "6422711c3f12e6c1e46d40f2",
  "url": "https://{rest_api_root}/v2/ship/ticket_states/6422711c3f12e6c1e46d40f2",
  "name": "已完成",
  "type": "completed",
  "color": "#56AB25"
}
```

<a id="get-v2-ship-ticket-states"></a>

### 获取全部工单状态列表

`GET /v2/ship/ticket_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取企业内全部工单状态。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 全部工单状态全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].type` | string |  |  |
| `values[].color` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "6422711c3f12e6c1e46d40f2",
      "url": "https://{rest_api_root}/v2/ship/ticket_states/6422711c3f12e6c1e46d40f2",
      "name": "处理中",
      "type": "pending",
      "color": "#F6C659"
    }
  ]
}
```

<a id="get-v2-ship-ticket-state-plans-ticket-state-plan-id"></a>

### 获取一个工单状态方案

`GET /v2/ship/ticket_state_plans/{ticket_state_plan_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取工单状态方案全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_state_plan_id` | string | 是 | 工单状态方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单状态方案的 id |
| `url` | string | 是 | 工单状态方案的资源地址 |
| `product` | object | 是 | 产品的引用结构数据。该方案是此产品的本地化方案 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |

**响应示例 1：响应示例（全局方案）**

```json
{
  "id": "63feb3da9cc1ead1d2be93f4",
  "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f4",
  "product": null
}
```

**响应示例 2：响应示例（产品本地化方案）**

```json
{
  "id": "63feb3da9cc1ead1d2be93f5",
  "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f5",
  "product": {
    "id": "6422711c3f12e6c1e46d40e9",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  }
}
```

<a id="get-v2-ship-ticket-state-plans"></a>

### 获取工单状态方案列表

`GET /v2/ship/ticket_state_plans` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取企业内全部工单状态方案。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `for_product_id` | string |  | 产品的 id。只返回该产品正在使用的工单状态方案 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工单状态方案全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].product` | null \| object |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "63feb3da9cc1ead1d2be93f4",
      "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f4",
      "product": null
    },
    {
      "id": "63feb3da9cc1ead1d2be93f5",
      "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f5",
      "product": {
        "id": "6422711c3f12e6c1e46d40e9",
        "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
        "identifier": "SLC",
        "name": "示例产品",
        "is_archived": 0,
        "is_deleted": 0
      }
    }
  ]
}
```

<a id="post-v2-ship-ticket-state-plans-ticket-state-plan-id-ticket-states"></a>

### 向工单状态方案中添加一个状态

`POST /v2/ship/ticket_state_plans/{ticket_state_plan_id}/ticket_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于向工单状态方案中添加一个状态。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_state_plan_id` | string | 是 | 工单状态方案的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `state_id` | string | 是 | 工单状态的 id |

**请求示例**

```json
{
  "state_id": "63bb744214bd13c9def24ca2"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单状态方案中状态关联的 id |
| `url` | string | 是 | 工单状态方案中状态关联的资源地址 |
| `state_plan` | object | 是 | 工单状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `state` | object | 是 | 工单状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |

**响应示例**

```json
{
  "id": "63bb744214bd13c9def24ca2",
  "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f4/ticket_states/63bb744214bd13c9def24ca2",
  "state_plan": {
    "id": "63feb3da9cc1ead1d2be93f4",
    "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f4"
  },
  "state": {
    "id": "63bb744214bd13c9def24ca2",
    "url": "https://{rest_api_root}/v2/ship/ticket_states/63bb744214bd13c9def24ca2",
    "name": "待处理",
    "type": "pending"
  }
}
```

<a id="get-v2-ship-ticket-state-plans-ticket-state-plan-id-ticket-states-ticket-state-id"></a>

### 获取工单状态方案中的一个状态

`GET /v2/ship/ticket_state_plans/{ticket_state_plan_id}/ticket_states/{ticket_state_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取工单状态方案中的一个状态。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_state_plan_id` | string | 是 | 工单状态方案的 id |
| `ticket_state_id` | string | 是 | 工单状态的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单状态方案中状态关联的 id |
| `url` | string | 是 | 工单状态方案中状态关联的资源地址 |
| `state_plan` | object | 是 | 工单状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `state` | object | 是 | 工单状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |

**响应示例**

```json
{
  "id": "63bb744214bd13c9def24ca2",
  "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f4/ticket_states/63bb744214bd13c9def24ca2",
  "state_plan": {
    "id": "63feb3da9cc1ead1d2be93f4",
    "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f4"
  },
  "state": {
    "id": "63bb744214bd13c9def24ca2",
    "url": "https://{rest_api_root}/v2/ship/ticket_states/63bb744214bd13c9def24ca2",
    "name": "待处理",
    "type": "pending"
  }
}
```

<a id="get-v2-ship-ticket-state-plans-ticket-state-plan-id-ticket-states"></a>

### 获取工单状态方案中的状态列表

`GET /v2/ship/ticket_state_plans/{ticket_state_plan_id}/ticket_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取工单状态方案中的状态。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_state_plan_id` | string | 是 | 工单状态方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工单状态方案中的状态全量结构数据的数组 |
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
      "id": "63bb744214bd13c9def24ca2",
      "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f4/ticket_states/63bb744214bd13c9def24ca2",
      "state_plan": {
        "id": "63feb3da9cc1ead1d2be93f4",
        "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f4"
      },
      "state": {
        "id": "63bb744214bd13c9def24ca2",
        "url": "https://{rest_api_root}/v2/ship/ticket_states/63bb744214bd13c9def24ca2",
        "name": "待处理",
        "type": "pending"
      }
    }
  ]
}
```

<a id="delete-v2-ship-ticket-state-plans-ticket-state-plan-id-ticket-states-ticket-state-id"></a>

### 在工单状态方案中移除一个状态

`DELETE /v2/ship/ticket_state_plans/{ticket_state_plan_id}/ticket_states/{ticket_state_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于在工单状态方案中移除一个状态。  
 移除状态后，每种类型的状态至少存在一种，否则将无法移除。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_state_plan_id` | string | 是 | 工单状态方案的 id |
| `ticket_state_id` | string | 是 | 工单状态的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单状态方案中状态关联的 id |
| `url` | string | 是 | 工单状态方案中状态关联的资源地址 |
| `state_plan` | object | 是 | 工单状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `state` | object | 是 | 工单状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |

**响应示例**

```json
{
  "id": "63bb744214bd13c9def24ca2",
  "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f4/ticket_states/63bb744214bd13c9def24ca2",
  "state_plan": {
    "id": "63feb3da9cc1ead1d2be93f4",
    "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f4"
  },
  "state": {
    "id": "63bb744214bd13c9def24ca2",
    "url": "https://{rest_api_root}/v2/ship/ticket_states/63bb744214bd13c9def24ca2",
    "name": "待处理",
    "type": "pending"
  }
}
```

<a id="post-v2-ship-ticket-state-plans-ticket-state-plan-id-ticket-state-flows"></a>

### 向工单状态方案中添加一个状态流转

`POST /v2/ship/ticket_state_plans/{ticket_state_plan_id}/ticket_state_flows` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于向工单状态方案中添加一个状态流转。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_state_plan_id` | string | 是 | 工单状态方案的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `from_state_id` | string | 是 | 起始工单状态的 id |
| `to_state_id` | string | 是 | 可更改为的工单状态的 id |

**请求示例**

```json
{
  "from_state_id": "63bb744214bd13c9def24ca5",
  "to_state_id": "63bb744214bd13c9def24ca2"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单状态流转的 id |
| `url` | string | 是 | 工单状态流转的资源地址 |
| `state_plan` | object | 是 | 工单状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `from_state` | object | 是 | 起始工单状态的引用结构数据 |
| `from_state.id` | string |  |  |
| `from_state.url` | string |  |  |
| `from_state.name` | string |  |  |
| `from_state.type` | string |  |  |
| `to_state` | object | 是 | 目标工单状态的引用结构数据 |
| `to_state.id` | string |  |  |
| `to_state.url` | string |  |  |
| `to_state.name` | string |  |  |
| `to_state.type` | string |  |  |

**响应示例**

```json
{
  "id": "63feb3da9cc1ead1d2be93fd",
  "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f4/ticket_state_flows/63feb3da9cc1ead1d2be93fd",
  "state_plan": {
    "id": "63feb3da9cc1ead1d2be93f4",
    "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f4"
  },
  "from_state": {
    "id": "63bb744214bd13c9def24ca5",
    "url": "https://{rest_api_root}/v2/ship/ticket_states/63bb744214bd13c9def24ca5",
    "name": "已计划",
    "type": "in_progress"
  },
  "to_state": {
    "id": "63bb744214bd13c9def24ca2",
    "url": "https://{rest_api_root}/v2/ship/ticket_states/63bb744214bd13c9def24ca2",
    "name": "待处理",
    "type": "pending"
  }
}
```

<a id="get-v2-ship-ticket-state-plans-ticket-state-plan-id-ticket-state-flows-ticket-state-flow-id"></a>

### 获取工单状态方案中的一个状态流转

`GET /v2/ship/ticket_state_plans/{ticket_state_plan_id}/ticket_state_flows/{ticket_state_flow_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取工单状态方案中的一个状态流转。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_state_plan_id` | string | 是 | 工单状态方案的 id |
| `ticket_state_flow_id` | string | 是 | 工单状态流转的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单状态流转的 id |
| `url` | string | 是 | 工单状态流转的资源地址 |
| `state_plan` | object | 是 | 工单状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `from_state` | object | 是 | 起始工单状态的引用结构数据 |
| `from_state.id` | string |  |  |
| `from_state.url` | string |  |  |
| `from_state.name` | string |  |  |
| `from_state.type` | string |  |  |
| `to_state` | object | 是 | 目标工单状态的引用结构数据 |
| `to_state.id` | string |  |  |
| `to_state.url` | string |  |  |
| `to_state.name` | string |  |  |
| `to_state.type` | string |  |  |

**响应示例**

```json
{
  "id": "63feb3da9cc1ead1d2be93fd",
  "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f4/ticket_state_flows/63feb3da9cc1ead1d2be93fd",
  "state_plan": {
    "id": "63feb3da9cc1ead1d2be93f4",
    "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f4"
  },
  "from_state": {
    "id": "63bb744214bd13c9def24ca5",
    "url": "https://{rest_api_root}/v2/ship/ticket_states/63bb744214bd13c9def24ca5",
    "name": "已计划",
    "type": "in_progress"
  },
  "to_state": {
    "id": "63bb744214bd13c9def24ca2",
    "url": "https://{rest_api_root}/v2/ship/ticket_states/63bb744214bd13c9def24ca2",
    "name": "待处理",
    "type": "pending"
  }
}
```

<a id="get-v2-ship-ticket-state-plans-ticket-state-plan-id-ticket-state-flows"></a>

### 获取工单状态方案中的状态流转列表

`GET /v2/ship/ticket_state_plans/{ticket_state_plan_id}/ticket_state_flows` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取工单状态方案中的状态流转。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_state_plan_id` | string | 是 | 工单状态方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工单状态方案中的工单状态流转全量结构数据的数组 |
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
      "id": "63feb3da9cc1ead1d2be93f5",
      "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f4/ticket_states/63feb3da9cc1ead1d2be93f5",
      "state_plan": {
        "id": "63feb3da9cc1ead1d2be93f4",
        "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f4"
      },
      "from_state": {
        "id": "63bb744214bd13c9def24ca2",
        "url": "https://{rest_api_root}/v2/ship/ticket_states/63bb744214bd13c9def24ca2",
        "name": "待处理",
        "type": "pending"
      },
      "to_state": {
        "id": "63bb744214bd13c9def24ca4",
        "url": "https://{rest_api_root}/v2/ship/ticket_states/63bb744214bd13c9def24ca4",
        "name": "处理中",
        "type": "in_progress"
      }
    }
  ]
}
```

<a id="delete-v2-ship-ticket-state-plans-ticket-state-plan-id-ticket-state-flows-ticket-state-flow-id"></a>

### 在工单状态方案中移除一个状态流转

`DELETE /v2/ship/ticket_state_plans/{ticket_state_plan_id}/ticket_state_flows/{ticket_state_flow_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于从工单状态方案中移除一个状态流转。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_state_plan_id` | string | 是 | 工单状态方案的 id |
| `ticket_state_flow_id` | string | 是 | 工单状态流转的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单状态流转的 id |
| `url` | string | 是 | 工单状态流转的资源地址 |
| `state_plan` | object | 是 | 工单状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `from_state` | object | 是 | 起始工单状态的引用结构数据 |
| `from_state.id` | string |  |  |
| `from_state.url` | string |  |  |
| `from_state.name` | string |  |  |
| `from_state.type` | string |  |  |
| `to_state` | object | 是 | 目标工单状态的引用结构数据 |
| `to_state.id` | string |  |  |
| `to_state.url` | string |  |  |
| `to_state.name` | string |  |  |
| `to_state.type` | string |  |  |

**响应示例**

```json
{
  "id": "63feb3da9cc1ead1d2be93fd",
  "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f4/ticket_state_flows/63feb3da9cc1ead1d2be93fd",
  "state_plan": {
    "id": "63feb3da9cc1ead1d2be93f4",
    "url": "https://{rest_api_root}/v2/ship/ticket_state_plans/63feb3da9cc1ead1d2be93f4"
  },
  "from_state": {
    "id": "63bb744214bd13c9def24ca5",
    "url": "https://{rest_api_root}/v2/ship/ticket_states/63bb744214bd13c9def24ca5",
    "name": "已计划",
    "type": "in_progress"
  },
  "to_state": {
    "id": "63bb744214bd13c9def24ca2",
    "url": "https://{rest_api_root}/v2/ship/ticket_states/63bb744214bd13c9def24ca2",
    "name": "待处理",
    "type": "pending"
  }
}
```

<a id="post-v2-ship-ticket-properties"></a>

### 创建一个工单属性

`POST /v2/ship/ticket_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于创建工单属性。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 工单属性的名称。在一个企业中这个名称是唯一的 |
| `type` | string | 是 | 工单属性的类型；枚举："text" / "textarea" / "select" / "multi_select" / "cascade_select" / "cascade_multi_select" / "member" / "members" / "date" / "number" / "progress" / "rate" / "link" / "referred_select" / "referred_multi_select" |
| `referred_object_type` | string |  | 引用对象类型。创建 `referred_select,referred_multi_select` 属性时必填，更新已有引用选择属性时可用于调整引用对象类型；枚举："product" / "project" / "library" / "space" |
| `options` | object |  | 选择项列表。当工单属性类型为 `select,multi_select,cascade_select,cascade_multi_select` 时可选填此项 |
| `options.id` | string |  | 选择项 id。该值在选择项中是唯一的 |
| `options.text` | string | 是 | 选择项内容。该值在选择项中是唯一的 |
| `options.parent_id` | string |  | 选择项父级 id。当属性类型为 `cascade_select,cascade_multi_select` 时，`parent_id` 参数有效，用于构建级联类型选择项之间的父子关系，最多存在 4 级 |

**请求示例 1：请求示例（select）**

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

**请求示例 2：请求示例（cascade_select）**

```json
{
  "name": "级联单选",
  "type": "cascade_select",
  "options": [
    {
      "id": "64b9f741eec7fd94e63b411e",
      "text": "父"
    },
    {
      "text": "子",
      "parent_id": "64b9f741eec7fd94e63b411e"
    }
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单属性的 id |
| `url` | string | 是 | 工单属性的资源地址 |
| `name` | string | 是 | 工单属性的名称 |
| `type` | string | 是 | 工单属性的类型 |
| `referred_object_type` | string | 是 | 引用对象类型 |
| `options` | object | 是 | 下拉选项值 |
| `options.id` | string | 是 | 选择项 id。该值在选择项中是唯一的 |
| `options.text` | string | 是 | 选择项内容。该值在选择项中是唯一的 |
| `options.color` | string | 是 | 选择项颜色 |
| `options.parent_id` | string | 是 | 选择项父级 id。当属性类型为 `cascade_select` 或 `cascade_multi_select` 时返回，用于表示级联选择项的父子关系 |
| `is_removable` | number | 是 | 是否允许删除 |
| `is_name_editable` | number | 是 | 是否允许修改名称 |
| `is_options_editable` | number | 是 | 是否允许修改下拉选项值 |
| `select_all_level` | boolean |  |  |
| `display_all_level` | boolean |  |  |
| `display_separator` | null |  |  |

**响应示例 1：响应示例（select）**

```json
{
  "id": "severity",
  "url": "https://{rest_api_root}/v2/ship/ticket_properties/severity",
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
  "select_all_level": false,
  "display_all_level": false,
  "display_separator": null,
  "is_removable": 1,
  "is_name_editable": 1,
  "is_options_editable": 1
}
```

**响应示例 2：响应示例（cascade_select）**

```json
{
  "id": "jiliandanxuan",
  "url": "https://{rest_api_root}/v2/ship/ticket_properties/jiliandanxuan",
  "name": "级联单选",
  "type": "cascade_select",
  "options": [
    {
      "id": "64b9f741eec7fd94e63b411e",
      "text": "父",
      "color": "#FF7575"
    },
    {
      "id": "64b9f741eec7fd94e63b411f",
      "text": "子",
      "color": "#FF7575",
      "parent_id": "64b9f741eec7fd94e63b411e"
    }
  ],
  "select_all_level": false,
  "display_all_level": false,
  "display_separator": "/",
  "is_removable": 1,
  "is_name_editable": 1,
  "is_options_editable": 1
}
```

<a id="get-v2-ship-ticket-properties-ticket-property-id"></a>

### 获取一个工单属性

`GET /v2/ship/ticket_properties/{ticket_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取工单属性全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_property_id` | string | 是 | 工单属性的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单属性的 id |
| `url` | string | 是 | 工单属性的资源地址 |
| `name` | string | 是 | 工单属性的名称 |
| `type` | string | 是 | 工单属性的类型 |
| `referred_object_type` | string | 是 | 引用对象类型 |
| `options` | object | 是 | 下拉选项值 |
| `options.id` | string | 是 | 选择项 id。该值在选择项中是唯一的 |
| `options.text` | string | 是 | 选择项内容。该值在选择项中是唯一的 |
| `options.color` | string | 是 | 选择项颜色 |
| `options.parent_id` | string | 是 | 选择项父级 id。当属性类型为 `cascade_select` 或 `cascade_multi_select` 时返回，用于表示级联选择项的父子关系 |
| `is_removable` | number | 是 | 是否允许删除 |
| `is_name_editable` | number | 是 | 是否允许修改名称 |
| `is_options_editable` | number | 是 | 是否允许修改下拉选项值 |
| `select_all_level` | boolean |  |  |
| `display_all_level` | boolean |  |  |
| `display_separator` | null |  |  |

**响应示例**

```json
{
  "id": "severity",
  "url": "https://{rest_api_root}/v2/ship/ticket_properties/severity",
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
  "select_all_level": false,
  "display_all_level": false,
  "display_separator": null,
  "is_removable": 1,
  "is_name_editable": 1,
  "is_options_editable": 1
}
```

<a id="patch-v2-ship-ticket-properties-ticket-property-id"></a>

### 部分更新一个工单属性

`PATCH /v2/ship/ticket_properties/{ticket_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于部分更新一个工单属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_property_id` | string | 是 | 工单属性的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 工单属性的名称。在一个企业中这个名称是唯一的 |
| `referred_object_type` | string |  | 引用对象类型。创建 `referred_select,referred_multi_select` 属性时必填，更新已有引用选择属性时可用于调整引用对象类型；枚举："product" / "project" / "library" / "space" |
| `options` | object |  | 选择项列表。`options` 是整体更新的 |
| `options.id` | string |  | 选择项 id。该值在选择项中是唯一的 |
| `options.text` | string | 是 | 选择项内容。该值在选择项中是唯一的 |
| `options.parent_id` | string |  | 选择项父级 id。当属性类型为 `cascade_select,cascade_multi_select` 时，`parent_id` 参数有效，用于构建级联类型选择项之间的父子关系，最多存在 4 级 |

**请求示例 1：请求示例（select）**

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

**请求示例 2：请求示例（cascade_select）**

```json
{
  "name": "级联单选-update",
  "options": [
    {
      "id": "64b9f741eec7fd94e63b411e",
      "text": "父-update"
    },
    {
      "id": "64b9f741eec7fd94e63b411f",
      "text": "子",
      "parent_id": "64b9f741eec7fd94e63b411e"
    }
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单属性的 id |
| `url` | string | 是 | 工单属性的资源地址 |
| `name` | string | 是 | 工单属性的名称 |
| `type` | string | 是 | 工单属性的类型 |
| `referred_object_type` | string | 是 | 引用对象类型 |
| `options` | object | 是 | 下拉选项值 |
| `options.id` | string | 是 | 选择项 id。该值在选择项中是唯一的 |
| `options.text` | string | 是 | 选择项内容。该值在选择项中是唯一的 |
| `options.color` | string | 是 | 选择项颜色 |
| `options.parent_id` | string | 是 | 选择项父级 id。当属性类型为 `cascade_select` 或 `cascade_multi_select` 时返回，用于表示级联选择项的父子关系 |
| `is_removable` | number | 是 | 是否允许删除 |
| `is_name_editable` | number | 是 | 是否允许修改名称 |
| `is_options_editable` | number | 是 | 是否允许修改下拉选项值 |
| `select_all_level` | boolean |  |  |
| `display_all_level` | boolean |  |  |
| `display_separator` | null |  |  |

**响应示例 1：响应示例（select）**

```json
{
  "id": "severity-update",
  "url": "https://{rest_api_root}/v2/ship/ticket_properties/severity",
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
  "select_all_level": false,
  "display_all_level": false,
  "display_separator": null,
  "is_removable": 1,
  "is_name_editable": 1,
  "is_options_editable": 1
}
```

**响应示例 2：响应示例（cascade_select）**

```json
{
  "id": "jiliandanxuan",
  "url": "https://{rest_api_root}/v2/ship/ticket_properties/jiliandanxuan",
  "name": "级联单选-update",
  "type": "cascade_select",
  "options": [
    {
      "id": "64b9f741eec7fd94e63b411e",
      "text": "父-update",
      "color": "#FF7575"
    },
    {
      "id": "64b9f741eec7fd94e63b411f",
      "text": "子",
      "color": "#FF7575",
      "parent_id": "64b9f741eec7fd94e63b411e"
    }
  ],
  "select_all_level": false,
  "display_all_level": false,
  "display_separator": "/",
  "is_removable": 1,
  "is_name_editable": 1,
  "is_options_editable": 1
}
```

<a id="get-v2-ship-ticket-properties"></a>

### 获取全部工单属性列表

`GET /v2/ship/ticket_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取企业内全部工单属性。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 全部工单属性全量结构数据的数组 |
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
      "id": "solution",
      "url": "https://{rest_api_root}/v2/ship/ticket_properties/solution",
      "name": "解决方案",
      "type": "select",
      "options": [
        {
          "id": "6422711c3f12e6c1e46d40e9",
          "text": "进入需求池",
          "color": "#FF7575"
        }
      ],
      "is_removable": 0,
      "is_name_editable": 0,
      "is_options_editable": 0
    },
    {
      "id": "identifier",
      "url": "https://{rest_api_root}/v2/ship/ticket_properties/identifier",
      "name": "编号",
      "type": "text",
      "options": null,
      "is_removable": 0,
      "is_name_editable": 0,
      "is_options_editable": 0
    }
  ]
}
```

<a id="get-v2-ship-ticket-property-plans-ticket-property-plan-id"></a>

### 获取一个工单属性方案

`GET /v2/ship/ticket_property_plans/{ticket_property_plan_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取工单属性方案全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_property_plan_id` | string | 是 | 工单属性方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单属性方案的 id |
| `url` | string | 是 | 工单属性方案的资源地址 |
| `product` | object | 是 | 产品的引用结构数据。该方案是此产品的本地化方案 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |

**响应示例 1：响应示例（全局方案）**

```json
{
  "id": "5f8a21f18ef715265de90c21",
  "url": "https://{rest_api_root}/v2/ship/ticket_property_plans/5f8a21f18ef715265de90c21",
  "product": null
}
```

**响应示例 2：响应示例（产品本地化方案）**

```json
{
  "id": "5f8a21f18ef715265de90c22",
  "url": "https://{rest_api_root}/v2/ship/ticket_property_plans/5f8a21f18ef715265de90c22",
  "product": {
    "id": "6422711c3f12e6c1e46d40e9",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  }
}
```

<a id="get-v2-ship-ticket-property-plans"></a>

### 获取工单属性方案列表

`GET /v2/ship/ticket_property_plans` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取企业内全部工单属性方案。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `for_product_id` | string |  | 产品的 id。只返回该产品正在使用的工单属性方案 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工单属性方案全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].product` | null \| object |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "5f8a21f18ef715265de90c21",
      "url": "https://{rest_api_root}/v2/ship/ticket_property_plans/5f8a21f18ef715265de90c21",
      "product": null
    },
    {
      "id": "5f8a21f18ef715265de90c22",
      "url": "https://{rest_api_root}/v2/ship/ticket_property_plans/5f8a21f18ef715265de90c22",
      "product": {
        "id": "6422711c3f12e6c1e46d40e9",
        "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
        "identifier": "SLC",
        "name": "示例产品",
        "is_archived": 0,
        "is_deleted": 0
      }
    }
  ]
}
```

<a id="post-v2-ship-ticket-property-plans-ticket-property-plan-id-ticket-properties"></a>

### 向工单属性方案中添加一个属性

`POST /v2/ship/ticket_property_plans/{ticket_property_plan_id}/ticket_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于向工单属性方案添加一个属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_property_plan_id` | string | 是 | 工单属性方案的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `property_id` | string | 是 | 工单属性的 id |

**请求示例**

```json
{
  "property_id": "solution"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 属性方案中工单属性关联的 id |
| `url` | string | 是 | 属性方案中工单属性关联的资源地址 |
| `property_plan` | object | 是 | 工单属性方案的引用结构数据 |
| `property_plan.id` | string |  |  |
| `property_plan.url` | string |  |  |
| `property` | object | 是 | 工单属性的引用结构数据 |
| `property.id` | string |  |  |
| `property.url` | string |  |  |
| `property.name` | string |  |  |
| `property.type` | string |  |  |

**响应示例**

```json
{
  "id": "solution",
  "url": "https://{rest_api_root}/v2/ship/ticket_property_plans/5f8a21f18ef715265de90c21/ticket_properties/solution",
  "property_plan": {
    "id": "5f8a21f18ef715265de90c21",
    "url": "https://{rest_api_root}/v2/ship/ticket_property_plans/5f8a21f18ef715265de90c21"
  },
  "property": {
    "id": "solution",
    "url": "https://{rest_api_root}/v2/ship/ticket_properties/solution",
    "name": "解决方案",
    "type": "select"
  }
}
```

<a id="get-v2-ship-ticket-property-plans-ticket-property-plan-id-ticket-properties-ticket-property-id"></a>

### 获取工单属性方案中的一个属性

`GET /v2/ship/ticket_property_plans/{ticket_property_plan_id}/ticket_properties/{ticket_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取工单属性方案中的一个属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_property_plan_id` | string | 是 | 工单属性方案的 id |
| `ticket_property_id` | string | 是 | 工单属性的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 属性方案中工单属性关联的 id |
| `url` | string | 是 | 属性方案中工单属性关联的资源地址 |
| `property_plan` | object | 是 | 工单属性方案的引用结构数据 |
| `property_plan.id` | string |  |  |
| `property_plan.url` | string |  |  |
| `property` | object | 是 | 工单属性的引用结构数据 |
| `property.id` | string |  |  |
| `property.url` | string |  |  |
| `property.name` | string |  |  |
| `property.type` | string |  |  |

**响应示例**

```json
{
  "id": "solution",
  "url": "https://{rest_api_root}/v2/ship/ticket_property_plans/5f8a21f18ef715265de90c21/ticket_properties/solution",
  "property_plan": {
    "id": "5f8a21f18ef715265de90c21",
    "url": "https://{rest_api_root}/v2/ship/ticket_property_plans/5f8a21f18ef715265de90c21"
  },
  "property": {
    "id": "solution",
    "url": "https://{rest_api_root}/v2/ship/ticket_properties/solution",
    "name": "解决方案",
    "type": "select"
  }
}
```

<a id="get-v2-ship-ticket-property-plans-ticket-property-plan-id-ticket-properties"></a>

### 获取工单属性方案中的属性列表

`GET /v2/ship/ticket_property_plans/{ticket_property_plan_id}/ticket_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取工单属性方案中的属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_property_plan_id` | string | 是 | 工单属性方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 属性方案中的工单属性全量结构数据的数组 |
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

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "solution",
      "url": "https://{rest_api_root}/v2/ship/ticket_property_plans/5f8a21f18ef715265de90c21/ticket_properties/solution",
      "property_plan": {
        "id": "5f8a21f18ef715265de90c21",
        "url": "https://{rest_api_root}/v2/ship/ticket_property_plans/5f8a21f18ef715265de90c21"
      },
      "property": {
        "id": "solution",
        "url": "https://{rest_api_root}/v2/ship/ticket_properties/solution",
        "name": "解决方案",
        "type": "select"
      }
    }
  ]
}
```

<a id="delete-v2-ship-ticket-property-plans-ticket-property-plan-id-ticket-properties-ticket-property-id"></a>

### 在工单属性方案中移除一个属性

`DELETE /v2/ship/ticket_property_plans/{ticket_property_plan_id}/ticket_properties/{ticket_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于从工单属性方案中移除一个属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_property_plan_id` | string | 是 | 工单属性方案的 id |
| `ticket_property_id` | string | 是 | 工单属性的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 属性方案中工单属性关联的 id |
| `url` | string | 是 | 属性方案中工单属性关联的资源地址 |
| `property_plan` | object | 是 | 工单属性方案的引用结构数据 |
| `property_plan.id` | string |  |  |
| `property_plan.url` | string |  |  |
| `property` | object | 是 | 工单属性的引用结构数据 |
| `property.id` | string |  |  |
| `property.url` | string |  |  |
| `property.name` | string |  |  |
| `property.type` | string |  |  |

**响应示例**

```json
{
  "id": "solution",
  "url": "https://{rest_api_root}/v2/ship/ticket_property_plans/5f8a21f18ef715265de90c21/ticket_properties/solution",
  "property_plan": {
    "id": "5f8a21f18ef715265de90c21",
    "url": "https://{rest_api_root}/v2/ship/ticket_property_plans/5f8a21f18ef715265de90c21"
  },
  "property": {
    "id": "solution",
    "url": "https://{rest_api_root}/v2/ship/ticket_properties/solution",
    "name": "解决方案",
    "type": "select"
  }
}
```

<a id="get-v2-ship-ticket-priorities-ticket-priority-id"></a>

### 获取一个工单优先级

`GET /v2/ship/ticket_priorities/{ticket_priority_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取工单优先级全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_priority_id` | string | 是 | 工单优先级的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单优先级的 id |
| `url` | string | 是 | 工单优先级的资源地址 |
| `name` | string | 是 | 工单优先级的名称 |
| `color` | string | 是 | 优先级的颜色 |

**响应示例**

```json
{
  "id": "5cb9466afda1ce4ca0090005",
  "url": "https://{rest_api_root}/v2/ship/ticket_priorities/5cb9466afda1ce4ca0090005",
  "name": "P0",
  "color": "#FF7575"
}
```

<a id="get-v2-ship-ticket-priorities"></a>

### 获取全部工单优先级列表

`GET /v2/ship/ticket_priorities` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取企业内全部工单优先级。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工单优先级全量结构数据的数组 |
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
      "id": "5cb9466afda1ce4ca0090005",
      "url": "https://{rest_api_root}/v2/ship/ticket_priorities/5cb9466afda1ce4ca0090005",
      "name": "P0",
      "color": "#FF7575"
    }
  ]
}
```

<a id="get-v2-ship-ticket-solutions-ticket-solution-id"></a>

### 获取一个工单解决方案

`GET /v2/ship/ticket_solutions/{ticket_solution_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取工单解决方案全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ticket_solution_id` | string | 是 | 工单解决方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工单解决方案的 id |
| `url` | string | 是 | 工单解决方案的资源地址 |
| `name` | string | 是 | 工单解决方案的名称 |

**响应示例**

```json
{
  "id": "6422711c3f12e6c1e46d40e9",
  "url": "https://{rest_api_root}/v2/ship/ticket_solutions/6422711c3f12e6c1e46d40e9",
  "name": "进入需求池"
}
```

<a id="get-v2-ship-ticket-solutions"></a>

### 获取全部工单解决方案列表

`GET /v2/ship/ticket_solutions` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取企业内全部工单解决方案。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工单解决方案全量结构数据的数组 |
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
      "id": "6422711c3f12e6c1e46d40e9",
      "url": "https://{rest_api_root}/v2/ship/ticket_solutions/6422711c3f12e6c1e46d40e9",
      "name": "进入需求池"
    }
  ]
}
```

## 需求配置

> 分组路径：产品管理 / 产品配置中心 / 需求配置

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/ship/idea_states` | [创建一个需求状态](#post-v2-ship-idea-states) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea_states/{idea_state_id}` | [获取一个需求状态](#get-v2-ship-idea-states-idea-state-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/ship/idea_states/{idea_state_id}` | [部分更新一个需求状态](#patch-v2-ship-idea-states-idea-state-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea_states` | [获取全部需求状态列表](#get-v2-ship-idea-states) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea_state_plans/{idea_state_plan_id}` | [获取一个需求状态方案](#get-v2-ship-idea-state-plans-idea-state-plan-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea_state_plans` | [获取需求状态方案列表](#get-v2-ship-idea-state-plans) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/ship/idea_state_plans/{idea_state_plan_id}/idea_states` | [向需求状态方案中添加一个状态](#post-v2-ship-idea-state-plans-idea-state-plan-id-idea-states) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea_state_plans/{idea_state_plan_id}/idea_states/{idea_state_id}` | [获取需求状态方案中的一个状态](#get-v2-ship-idea-state-plans-idea-state-plan-id-idea-states-idea-state-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea_state_plans/{idea_state_plan_id}/idea_states` | [获取需求状态方案中的状态列表](#get-v2-ship-idea-state-plans-idea-state-plan-id-idea-states) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/ship/idea_state_plans/{idea_state_plan_id}/idea_states/{idea_state_id}` | [在需求状态方案中移除一个状态](#delete-v2-ship-idea-state-plans-idea-state-plan-id-idea-states-idea-state-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/ship/idea_state_plans/{idea_state_plan_id}/idea_state_flows` | [向需求状态方案中添加一个状态流转](#post-v2-ship-idea-state-plans-idea-state-plan-id-idea-state-flows) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea_state_plans/{idea_state_plan_id}/idea_state_flows/{idea_state_flow_id}` | [获取需求状态方案中的一个状态流转](#get-v2-ship-idea-state-plans-idea-state-plan-id-idea-state-flows-idea-state-flow-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea_state_plans/{idea_state_plan_id}/idea_state_flows` | [获取需求状态方案中的状态流转列表](#get-v2-ship-idea-state-plans-idea-state-plan-id-idea-state-flows) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/ship/idea_state_plans/{idea_state_plan_id}/idea_state_flows/{idea_state_flow_id}` | [在需求状态方案中移除一个状态流转](#delete-v2-ship-idea-state-plans-idea-state-plan-id-idea-state-flows-idea-state-flow-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/ship/idea_properties` | [创建一个需求属性](#post-v2-ship-idea-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea_properties/{idea_property_id}` | [获取一个需求属性](#get-v2-ship-idea-properties-idea-property-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/ship/idea_properties/{idea_property_id}` | [部分更新一个需求属性](#patch-v2-ship-idea-properties-idea-property-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea_properties` | [获取全部需求属性列表](#get-v2-ship-idea-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea_property_plans/{idea_property_plan_id}` | [获取一个需求属性方案](#get-v2-ship-idea-property-plans-idea-property-plan-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea_property_plans` | [获取需求属性方案列表](#get-v2-ship-idea-property-plans) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/ship/idea_property_plans/{idea_property_plan_id}/idea_properties` | [向需求属性方案中添加一个属性](#post-v2-ship-idea-property-plans-idea-property-plan-id-idea-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea_property_plans/{idea_property_plan_id}/idea_properties/{idea_property_id}` | [获取需求属性方案中的一个属性](#get-v2-ship-idea-property-plans-idea-property-plan-id-idea-properties-idea-property-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea_property_plans/{idea_property_plan_id}/idea_properties` | [获取需求属性方案中的属性列表](#get-v2-ship-idea-property-plans-idea-property-plan-id-idea-properties) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/ship/idea_property_plans/{idea_property_plan_id}/idea_properties/{idea_property_id}` | [在需求属性方案中移除一个属性](#delete-v2-ship-idea-property-plans-idea-property-plan-id-idea-properties-idea-property-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea_priorities/{idea_priority_id}` | [获取一个需求优先级](#get-v2-ship-idea-priorities-idea-priority-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/ship/idea_priorities` | [获取全部需求优先级列表](#get-v2-ship-idea-priorities) | 企业令牌 / 用户令牌 |

<a id="post-v2-ship-idea-states"></a>

### 创建一个需求状态

`POST /v2/ship/idea_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于创建一个需求状态。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 需求状态的名称，在一个企业中这个名称是唯一的 |
| `type` | string | 是 | 需求状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |

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
| `id` | string | 是 | 需求状态的 id |
| `url` | string | 是 | 需求状态的资源地址 |
| `name` | string | 是 | 需求状态的名称 |
| `type` | string | 是 | 需求状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |
| `color` | string | 是 | 需求状态的颜色 |

**响应示例**

```json
{
  "id": "63e1bf51898a0be5a2d21b2a",
  "url": "https://{rest_api_root}/v2/ship/idea_states/63e1bf51898a0be5a2d21b2a",
  "name": "待评审",
  "type": "pending",
  "color": "#56ABFB"
}
```

<a id="get-v2-ship-idea-states-idea-state-id"></a>

### 获取一个需求状态

`GET /v2/ship/idea_states/{idea_state_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取需求状态全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_state_id` | string | 是 | 需求状态的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求状态的 id |
| `url` | string | 是 | 需求状态的资源地址 |
| `name` | string | 是 | 需求状态的名称 |
| `type` | string | 是 | 需求状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |
| `color` | string | 是 | 需求状态的颜色 |

**响应示例**

```json
{
  "id": "63e1bf51898a0be5a2d21b2a",
  "url": "https://{rest_api_root}/v2/ship/idea_states/63e1bf51898a0be5a2d21b2a",
  "name": "待评审",
  "type": "pending",
  "color": "#56ABFB"
}
```

<a id="patch-v2-ship-idea-states-idea-state-id"></a>

### 部分更新一个需求状态

`PATCH /v2/ship/idea_states/{idea_state_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于部分更新一个需求状态。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_state_id` | string | 是 | 需求状态 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 需求状态的名称，在一个企业中这个名称是唯一的 |
| `type` | string |  | 需求状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |

**请求示例**

```json
{
  "name": "已完成",
  "type": "completed"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求状态的 id |
| `url` | string | 是 | 需求状态的资源地址 |
| `name` | string | 是 | 需求状态的名称 |
| `type` | string | 是 | 需求状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |
| `color` | string | 是 | 需求状态的颜色 |

**响应示例**

```json
{
  "id": "63e1bf51898a0be5a2d21b2a",
  "url": "https://{rest_api_root}/v2/ship/idea_states/63e1bf51898a0be5a2d21b2a",
  "name": "已完成",
  "type": "completed",
  "color": "#56ABFB"
}
```

<a id="get-v2-ship-idea-states"></a>

### 获取全部需求状态列表

`GET /v2/ship/idea_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取企业内全部需求状态。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 全部需求状态的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].type` | string |  |  |
| `values[].color` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "63e1bf51898a0be5a2d21b2a",
      "url": "https://{rest_api_root}/v2/ship/idea_states/63e1bf51898a0be5a2d21b2a",
      "name": "待评审",
      "type": "pending",
      "color": "#56ABFB"
    }
  ]
}
```

<a id="get-v2-ship-idea-state-plans-idea-state-plan-id"></a>

### 获取一个需求状态方案

`GET /v2/ship/idea_state_plans/{idea_state_plan_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取需求状态方案全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_state_plan_id` | string | 是 | 需求状态方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求状态方案的 id |
| `url` | string | 是 | 需求状态方案的资源地址 |
| `product` | object | 是 | 产品的引用结构数据。该方案是此产品的本地化方案 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |

**响应示例 1：响应示例（全局方案）**

```json
{
  "id": "63feb3da9cc1ead1d2be93f4",
  "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f4",
  "product": null
}
```

**响应示例 2：响应示例（产品本地化方案）**

```json
{
  "id": "63feb3da9cc1ead1d2be93f5",
  "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f5",
  "product": {
    "id": "6422711c3f12e6c1e46d40e9",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  }
}
```

<a id="get-v2-ship-idea-state-plans"></a>

### 获取需求状态方案列表

`GET /v2/ship/idea_state_plans` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取企业内全部需求状态方案。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `for_product_id` | string |  | 产品的 id。只返回该产品正在使用的需求状态方案 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 需求状态方案全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].product` | null \| object |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "63feb3da9cc1ead1d2be93f4",
      "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f4",
      "product": null
    },
    {
      "id": "63feb3da9cc1ead1d2be93f5",
      "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f5",
      "product": {
        "id": "6422711c3f12e6c1e46d40e9",
        "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
        "identifier": "SLC",
        "name": "示例产品",
        "is_archived": 0,
        "is_deleted": 0
      }
    }
  ]
}
```

<a id="post-v2-ship-idea-state-plans-idea-state-plan-id-idea-states"></a>

### 向需求状态方案中添加一个状态

`POST /v2/ship/idea_state_plans/{idea_state_plan_id}/idea_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于向需求状态方案中添加一个状态。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_state_plan_id` | string | 是 | 需求状态方案的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `state_id` | string | 是 | 需求状态的 id |

**请求示例**

```json
{
  "state_id": "63bb744214bd13c9def24ca2"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求状态方案中状态关联的 id |
| `url` | string | 是 | 需求状态方案中状态关联的资源地址 |
| `state_plan` | object | 是 | 需求状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `state` | object | 是 | 需求状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |

**响应示例**

```json
{
  "id": "63bb744214bd13c9def24ca2",
  "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f4/idea_states/63bb744214bd13c9def24ca2",
  "state_plan": {
    "id": "63feb3da9cc1ead1d2be93f4",
    "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f4"
  },
  "state": {
    "id": "63bb744214bd13c9def24ca2",
    "url": "https://{rest_api_root}/v2/ship/idea_states/63bb744214bd13c9def24ca2",
    "name": "待处理",
    "type": "pending"
  }
}
```

<a id="get-v2-ship-idea-state-plans-idea-state-plan-id-idea-states-idea-state-id"></a>

### 获取需求状态方案中的一个状态

`GET /v2/ship/idea_state_plans/{idea_state_plan_id}/idea_states/{idea_state_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取需求状态方案中的一个状态。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_state_plan_id` | string | 是 | 需求状态方案的 id |
| `idea_state_id` | string | 是 | 需求状态的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求状态方案中状态关联的 id |
| `url` | string | 是 | 需求状态方案中状态关联的资源地址 |
| `state_plan` | object | 是 | 需求状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `state` | object | 是 | 需求状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |

**响应示例**

```json
{
  "id": "63bb744214bd13c9def24ca2",
  "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f4/idea_states/63bb744214bd13c9def24ca2",
  "state_plan": {
    "id": "63feb3da9cc1ead1d2be93f4",
    "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f4"
  },
  "state": {
    "id": "63bb744214bd13c9def24ca2",
    "url": "https://{rest_api_root}/v2/ship/idea_states/63bb744214bd13c9def24ca2",
    "name": "待处理",
    "type": "pending"
  }
}
```

<a id="get-v2-ship-idea-state-plans-idea-state-plan-id-idea-states"></a>

### 获取需求状态方案中的状态列表

`GET /v2/ship/idea_state_plans/{idea_state_plan_id}/idea_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取需求状态方案中的状态。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_state_plan_id` | string | 是 | 需求状态方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 需求状态方案中的状态全量结构数据的数组 |
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
      "id": "63bb744214bd13c9def24ca2",
      "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f4/idea_states/63bb744214bd13c9def24ca2",
      "state_plan": {
        "id": "63feb3da9cc1ead1d2be93f4",
        "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f4"
      },
      "state": {
        "id": "63bb744214bd13c9def24ca2",
        "url": "https://{rest_api_root}/v2/ship/idea_states/63bb744214bd13c9def24ca2",
        "name": "待处理",
        "type": "pending"
      }
    }
  ]
}
```

<a id="delete-v2-ship-idea-state-plans-idea-state-plan-id-idea-states-idea-state-id"></a>

### 在需求状态方案中移除一个状态

`DELETE /v2/ship/idea_state_plans/{idea_state_plan_id}/idea_states/{idea_state_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于在需求状态方案中移除一个状态。  
 移除状态后，每种类型的状态至少存在一种，否则将无法移除。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_state_plan_id` | string | 是 | 需求状态方案的 id |
| `idea_state_id` | string | 是 | 需求状态的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求状态方案中状态关联的 id |
| `url` | string | 是 | 需求状态方案中状态关联的资源地址 |
| `state_plan` | object | 是 | 需求状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `state` | object | 是 | 需求状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |

**响应示例**

```json
{
  "id": "63bb744214bd13c9def24ca2",
  "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f4/idea_states/63bb744214bd13c9def24ca2",
  "state_plan": {
    "id": "63feb3da9cc1ead1d2be93f4",
    "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f4"
  },
  "state": {
    "id": "63bb744214bd13c9def24ca2",
    "url": "https://{rest_api_root}/v2/ship/idea_states/63bb744214bd13c9def24ca2",
    "name": "待处理",
    "type": "pending"
  }
}
```

<a id="post-v2-ship-idea-state-plans-idea-state-plan-id-idea-state-flows"></a>

### 向需求状态方案中添加一个状态流转

`POST /v2/ship/idea_state_plans/{idea_state_plan_id}/idea_state_flows` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于向需求状态方案中添加一个状态流转。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_state_plan_id` | string | 是 | 需求状态方案的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `from_state_id` | string | 是 | 起始需求状态的 id |
| `to_state_id` | string | 是 | 可更改为的需求状态的 id |

**请求示例**

```json
{
  "from_state_id": "63bb744214bd13c9def24ca5",
  "to_state_id": "63bb744214bd13c9def24ca2"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求状态流转的 id |
| `url` | string | 是 | 需求状态流转的资源地址 |
| `state_plan` | object | 是 | 需求状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `from_state` | object | 是 | 起始需求状态的引用结构数据 |
| `from_state.id` | string |  |  |
| `from_state.url` | string |  |  |
| `from_state.name` | string |  |  |
| `from_state.type` | string |  |  |
| `to_state` | object | 是 | 目标需求状态的引用结构数据 |
| `to_state.id` | string |  |  |
| `to_state.url` | string |  |  |
| `to_state.name` | string |  |  |
| `to_state.type` | string |  |  |

**响应示例**

```json
{
  "id": "63feb3da9cc1ead1d2be93fd",
  "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f4/idea_state_flows/63feb3da9cc1ead1d2be93fd",
  "state_plan": {
    "id": "63feb3da9cc1ead1d2be93f4",
    "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f4"
  },
  "from_state": {
    "id": "63bb744214bd13c9def24ca5",
    "url": "https://{rest_api_root}/v2/ship/idea_states/63bb744214bd13c9def24ca5",
    "name": "已计划",
    "type": "in_progress"
  },
  "to_state": {
    "id": "63bb744214bd13c9def24ca2",
    "url": "https://{rest_api_root}/v2/ship/idea_states/63bb744214bd13c9def24ca2",
    "name": "待处理",
    "type": "pending"
  }
}
```

<a id="get-v2-ship-idea-state-plans-idea-state-plan-id-idea-state-flows-idea-state-flow-id"></a>

### 获取需求状态方案中的一个状态流转

`GET /v2/ship/idea_state_plans/{idea_state_plan_id}/idea_state_flows/{idea_state_flow_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取需求状态方案中的一个状态流转。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_state_plan_id` | string | 是 | 需求状态方案的 id |
| `idea_state_flow_id` | string | 是 | 需求状态流转的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求状态流转的 id |
| `url` | string | 是 | 需求状态流转的资源地址 |
| `state_plan` | object | 是 | 需求状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `from_state` | object | 是 | 起始需求状态的引用结构数据 |
| `from_state.id` | string |  |  |
| `from_state.url` | string |  |  |
| `from_state.name` | string |  |  |
| `from_state.type` | string |  |  |
| `to_state` | object | 是 | 目标需求状态的引用结构数据 |
| `to_state.id` | string |  |  |
| `to_state.url` | string |  |  |
| `to_state.name` | string |  |  |
| `to_state.type` | string |  |  |

**响应示例**

```json
{
  "id": "63feb3da9cc1ead1d2be93fd",
  "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f4/idea_state_flows/63feb3da9cc1ead1d2be93fd",
  "state_plan": {
    "id": "63feb3da9cc1ead1d2be93f4",
    "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f4"
  },
  "from_state": {
    "id": "63bb744214bd13c9def24ca5",
    "url": "https://{rest_api_root}/v2/ship/idea_states/63bb744214bd13c9def24ca5",
    "name": "已计划",
    "type": "in_progress"
  },
  "to_state": {
    "id": "63bb744214bd13c9def24ca2",
    "url": "https://{rest_api_root}/v2/ship/idea_states/63bb744214bd13c9def24ca2",
    "name": "待处理",
    "type": "pending"
  }
}
```

<a id="get-v2-ship-idea-state-plans-idea-state-plan-id-idea-state-flows"></a>

### 获取需求状态方案中的状态流转列表

`GET /v2/ship/idea_state_plans/{idea_state_plan_id}/idea_state_flows` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取需求状态方案中的状态流转。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_state_plan_id` | string | 是 | 需求状态方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 需求状态方案中的需求状态流转全量结构数据的数组 |
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
      "id": "63feb3da9cc1ead1d2be93f5",
      "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f4/idea_state_flows/63feb3da9cc1ead1d2be93f5",
      "state_plan": {
        "id": "63feb3da9cc1ead1d2be93f4",
        "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f4"
      },
      "from_state": {
        "id": "63bb744214bd13c9def24ca2",
        "url": "https://{rest_api_root}/v2/ship/idea_states/63bb744214bd13c9def24ca2",
        "name": "待处理",
        "type": "pending"
      },
      "to_state": {
        "id": "63bb744214bd13c9def24ca4",
        "url": "https://{rest_api_root}/v2/ship/idea_states/63bb744214bd13c9def24ca4",
        "name": "处理中",
        "type": "in_progress"
      }
    }
  ]
}
```

<a id="delete-v2-ship-idea-state-plans-idea-state-plan-id-idea-state-flows-idea-state-flow-id"></a>

### 在需求状态方案中移除一个状态流转

`DELETE /v2/ship/idea_state_plans/{idea_state_plan_id}/idea_state_flows/{idea_state_flow_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于从需求状态方案中移除一个状态流转。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_state_plan_id` | string | 是 | 需求状态方案的 id |
| `idea_state_flow_id` | string | 是 | 需求状态流转的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求状态流转的 id |
| `url` | string | 是 | 需求状态流转的资源地址 |
| `state_plan` | object | 是 | 需求状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `from_state` | object | 是 | 起始需求状态的引用结构数据 |
| `from_state.id` | string |  |  |
| `from_state.url` | string |  |  |
| `from_state.name` | string |  |  |
| `from_state.type` | string |  |  |
| `to_state` | object | 是 | 目标需求状态的引用结构数据 |
| `to_state.id` | string |  |  |
| `to_state.url` | string |  |  |
| `to_state.name` | string |  |  |
| `to_state.type` | string |  |  |

**响应示例**

```json
{
  "id": "63feb3da9cc1ead1d2be93fd",
  "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f4/idea_state_flows/63feb3da9cc1ead1d2be93fd",
  "state_plan": {
    "id": "63feb3da9cc1ead1d2be93f4",
    "url": "https://{rest_api_root}/v2/ship/idea_state_plans/63feb3da9cc1ead1d2be93f4"
  },
  "from_state": {
    "id": "63bb744214bd13c9def24ca5",
    "url": "https://{rest_api_root}/v2/ship/idea_states/63bb744214bd13c9def24ca5",
    "name": "已计划",
    "type": "in_progress"
  },
  "to_state": {
    "id": "63bb744214bd13c9def24ca2",
    "url": "https://{rest_api_root}/v2/ship/idea_states/63bb744214bd13c9def24ca2",
    "name": "待处理",
    "type": "pending"
  }
}
```

<a id="post-v2-ship-idea-properties"></a>

### 创建一个需求属性

`POST /v2/ship/idea_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于创建一个需求属性。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 需求属性的名称。在一个企业中这个名称是唯一的 |
| `type` | string | 是 | 需求属性的类型；枚举："text" / "textarea" / "select" / "multi_select" / "cascade_select" / "cascade_multi_select" / "member" / "members" / "date" / "number" / "progress" / "rate" / "link" / "referred_select" / "referred_multi_select" |
| `referred_object_type` | string |  | 引用对象类型。创建 `referred_select,referred_multi_select` 属性时必填，更新已有引用选择属性时可用于调整引用对象类型；枚举："product" / "project" / "library" / "space" |
| `options` | object |  | 选择项列表。当需求属性类型为 `select,multi_select,cascade_select,cascade_multi_select` 时可选填此项 |
| `options.id` | string |  | 选择项 id。该值在选择项中是唯一的 |
| `options.text` | string | 是 | 选择项内容。该值在选择项中是唯一的 |
| `options.parent_id` | string |  | 选择项父级 id。当属性类型为 `cascade_select,cascade_multi_select` 时，`parent_id` 参数有效，用于构建级联类型选择项之间的父子关系，最多存在 4 级 |

**请求示例 1：请求示例（select）**

```json
{
  "name": "严重程度",
  "type": "select",
  "options": [
    {
      "id": "5efb1859110533727a82c603",
      "text": "严重"
    },
    {
      "text": "一般"
    }
  ]
}
```

**请求示例 2：请求示例（cascade_select）**

```json
{
  "name": "级联单选",
  "type": "cascade_select",
  "options": [
    {
      "id": "64b9f741eec7fd94e63b411e",
      "text": "父"
    },
    {
      "id": "64b9f741eec7fd94e63b411f",
      "text": "子",
      "parent_id": "64b9f741eec7fd94e63b411e"
    }
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求属性的 id |
| `url` | string | 是 | 需求属性的资源地址 |
| `name` | string | 是 | 需求属性的名称 |
| `type` | string | 是 | 需求属性的类型 |
| `referred_object_type` | string | 是 | 引用对象类型 |
| `options` | object | 是 | 下拉选项值 |
| `options.id` | string | 是 | 选择项 id。该值在选择项中是唯一的 |
| `options.text` | string | 是 | 选择项内容。该值在选择项中是唯一的 |
| `options.color` | string | 是 | 选择项颜色 |
| `options.parent_id` | string | 是 | 选择项父级 id。当属性类型为 `cascade_select` 或 `cascade_multi_select` 时返回，用于表示级联选择项的父子关系 |
| `is_removable` | number | 是 | 是否允许删除 |
| `is_name_editable` | number | 是 | 是否允许修改名称 |
| `is_options_editable` | number | 是 | 是否允许修改下拉选项值 |
| `select_all_level` | boolean | 是 | 级联选择时是否允许选择全部层级 |
| `display_all_level` | boolean | 是 | 级联选择时是否展示全部层级 |
| `display_separator` | string | 是 | 级联选择时的层级分隔符 |

**响应示例 1：响应示例（select）**

```json
{
  "id": "severity",
  "url": "https://{rest_api_root}/v2/ship/idea_properties/severity",
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
  "is_options_editable": 1,
  "select_all_level": false,
  "display_all_level": false,
  "display_separator": null
}
```

**响应示例 2：响应示例（cascade_select）**

```json
{
  "id": "jiliandanxuan",
  "url": "https://{rest_api_root}/v2/ship/idea_properties/jiliandanxuan",
  "name": "级联单选",
  "type": "cascade_select",
  "options": [
    {
      "id": "64b9f741eec7fd94e63b411e",
      "text": "父",
      "color": "#FF7575"
    },
    {
      "id": "64b9f741eec7fd94e63b411f",
      "text": "子",
      "color": "#FF7575",
      "parent_id": "64b9f741eec7fd94e63b411e"
    }
  ],
  "is_removable": 1,
  "is_name_editable": 1,
  "is_options_editable": 1,
  "select_all_level": false,
  "display_all_level": false,
  "display_separator": "/"
}
```

<a id="get-v2-ship-idea-properties-idea-property-id"></a>

### 获取一个需求属性

`GET /v2/ship/idea_properties/{idea_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取需求属性全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_property_id` | string | 是 | 需求属性的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求属性的 id |
| `url` | string | 是 | 需求属性的资源地址 |
| `name` | string | 是 | 需求属性的名称 |
| `type` | string | 是 | 需求属性的类型 |
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
  "url": "https://{rest_api_root}/v2/ship/idea_properties/severity",
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

<a id="patch-v2-ship-idea-properties-idea-property-id"></a>

### 部分更新一个需求属性

`PATCH /v2/ship/idea_properties/{idea_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于部分更新一个需求属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_property_id` | string | 是 | 需求属性的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 需求属性的名称。在一个企业中这个名称是唯一的 |
| `referred_object_type` | string |  | 引用对象类型。创建 `referred_select,referred_multi_select` 属性时必填，更新已有引用选择属性时可用于调整引用对象类型；枚举："product" / "project" / "library" / "space" |
| `options` | object |  | 选择项列表。`options` 是整体更新的 |
| `options.id` | string |  | 选择项 id。该值在选择项中是唯一的 |
| `options.text` | string | 是 | 选择项内容。该值在选择项中是唯一的 |
| `options.parent_id` | string |  | 选择项父级 id。当属性类型为 `cascade_select,cascade_multi_select` 时，`parent_id` 参数有效，用于构建级联类型选择项之间的父子关系，最多存在 4 级 |

**请求示例 1：请求示例（select）**

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

**请求示例 2：请求示例（cascade_select）**

```json
{
  "name": "级联单选-update",
  "options": [
    {
      "id": "64b9f741eec7fd94e63b411e",
      "text": "父-update"
    },
    {
      "id": "64b9f741eec7fd94e63b411f",
      "text": "子-update",
      "parent_id": "64b9f741eec7fd94e63b411e"
    }
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求属性的 id |
| `url` | string | 是 | 需求属性的资源地址 |
| `name` | string | 是 | 需求属性的名称 |
| `type` | string | 是 | 需求属性的类型 |
| `referred_object_type` | string | 是 | 引用对象类型 |
| `options` | object | 是 | 下拉选项值 |
| `options.id` | string | 是 | 选择项 id。该值在选择项中是唯一的 |
| `options.text` | string | 是 | 选择项内容。该值在选择项中是唯一的 |
| `options.color` | string | 是 | 选择项颜色 |
| `options.parent_id` | string | 是 | 选择项父级 id。当属性类型为 `cascade_select` 或 `cascade_multi_select` 时返回，用于表示级联选择项的父子关系 |
| `is_removable` | number | 是 | 是否允许删除 |
| `is_name_editable` | number | 是 | 是否允许修改名称 |
| `is_options_editable` | number | 是 | 是否允许修改下拉选项值 |
| `select_all_level` | boolean | 是 | 级联选择时是否允许选择全部层级 |
| `display_all_level` | boolean | 是 | 级联选择时是否展示全部层级 |
| `display_separator` | string | 是 | 级联选择时的层级分隔符 |

**响应示例 1：响应示例（select）**

```json
{
  "id": "severity-update",
  "url": "https://{rest_api_root}/v2/ship/idea_properties/severity",
  "name": "严重程度-update",
  "type": "select",
  "options": [
    {
      "id": "64b9f741eec7fd94e63b411e",
      "text": "父",
      "color": "#FF7575"
    },
    {
      "id": "64b9f741eec7fd94e63b411f",
      "text": "子",
      "color": "#FF7575"
    }
  ],
  "is_removable": 1,
  "is_name_editable": 1,
  "is_options_editable": 1,
  "select_all_level": false,
  "display_all_level": false,
  "display_separator": null
}
```

**响应示例 2：响应示例（cascade_select）**

```json
{
  "id": "jiliandanxuan",
  "url": "https://{rest_api_root}/v2/ship/idea_properties/jiliandanxuan",
  "name": "级联单选-update",
  "type": "cascade_select",
  "options": [
    {
      "id": "64b9f741eec7fd94e63b411e",
      "text": "父-update",
      "color": "#FF7575"
    },
    {
      "id": "64b9f741eec7fd94e63b411f",
      "text": "子-update",
      "color": "#FF7575",
      "parent_id": "64b9f741eec7fd94e63b411e"
    }
  ],
  "is_removable": 1,
  "is_name_editable": 1,
  "is_options_editable": 1,
  "select_all_level": false,
  "display_all_level": false,
  "display_separator": "/"
}
```

<a id="get-v2-ship-idea-properties"></a>

### 获取全部需求属性列表

`GET /v2/ship/idea_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取企业内全部需求属性。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 全部需求属性的全量结构数据的数组 |
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
      "id": "backlog_type",
      "url": "https://{rest_api_root}/v2/ship/idea_properties/backlog_type",
      "name": "需求类型",
      "type": "select",
      "options": [
        {
          "id": "5cb7e763fda1ce4ca0010002",
          "text": "功能需求",
          "color": "#FF7575"
        },
        {
          "id": "5cb7e763fda1ce4ca0010004",
          "text": "体验优化",
          "color": "#FF7575"
        }
      ],
      "is_removable": 0,
      "is_name_editable": 0,
      "is_options_editable": 0
    },
    {
      "id": "identifier",
      "url": "https://{rest_api_root}/v2/ship/idea_properties/identifier",
      "name": "编号",
      "type": "text",
      "options": null,
      "is_removable": 0,
      "is_name_editable": 0,
      "is_options_editable": 0
    }
  ]
}
```

<a id="get-v2-ship-idea-property-plans-idea-property-plan-id"></a>

### 获取一个需求属性方案

`GET /v2/ship/idea_property_plans/{idea_property_plan_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取需求属性方案全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_property_plan_id` | string | 是 | 需求属性方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求属性方案的 id |
| `url` | string | 是 | 需求属性方案的资源地址 |
| `product` | object | 是 | 产品的引用结构数据。该方案是此产品的本地化方案 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.identifier` | string |  |  |
| `product.name` | string |  |  |
| `product.is_archived` | number |  |  |
| `product.is_deleted` | number |  |  |

**响应示例 1：响应示例（全局方案）**

```json
{
  "id": "5d7a21f19ef715269ae90c50",
  "url": "https://{rest_api_root}/v2/ship/idea_property_plans/5d7a21f19ef715269ae90c50",
  "product": null
}
```

**响应示例 2：响应示例（产品本地化方案）**

```json
{
  "id": "5f8a21f18ef715265de90c22",
  "url": "https://{rest_api_root}/v2/ship/idea_property_plans/5f8a21f18ef715265de90c22",
  "product": {
    "id": "6422711c3f12e6c1e46d40e9",
    "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
    "identifier": "SLC",
    "name": "示例产品",
    "is_archived": 0,
    "is_deleted": 0
  }
}
```

<a id="get-v2-ship-idea-property-plans"></a>

### 获取需求属性方案列表

`GET /v2/ship/idea_property_plans` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取企业内全部需求属性方案。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `for_product_id` | string |  | 产品的 id。只返回该产品正在使用的需求属性方案 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 需求属性方案全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].product` | null \| object |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "5d7a21f19ef715269ae90c50",
      "url": "https://{rest_api_root}/v2/ship/idea_property_plans/5d7a21f19ef715269ae90c50",
      "product": null
    },
    {
      "id": "5f8a21f18ef715265de90c22",
      "url": "https://{rest_api_root}/v2/ship/idea_property_plans/5f8a21f18ef715265de90c22",
      "product": {
        "id": "6422711c3f12e6c1e46d40e9",
        "url": "https://{rest_api_root}/v2/ship/products/6422711c3f12e6c1e46d40e9",
        "identifier": "SLC",
        "name": "示例产品",
        "is_archived": 0,
        "is_deleted": 0
      }
    }
  ]
}
```

<a id="post-v2-ship-idea-property-plans-idea-property-plan-id-idea-properties"></a>

### 向需求属性方案中添加一个属性

`POST /v2/ship/idea_property_plans/{idea_property_plan_id}/idea_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于向需求属性方案中添加一个属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_property_plan_id` | string | 是 | 需求属性方案的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `property_id` | string | 是 | 需求属性的 id |

**请求示例**

```json
{
  "property_id": "solution"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 属性方案中需求属性关联的 id |
| `url` | string | 是 | 属性方案中需求属性关联的资源地址 |
| `property_plan` | object | 是 | 需求属性方案的引用结构数据 |
| `property_plan.id` | string |  |  |
| `property_plan.url` | string |  |  |
| `property` | object | 是 | 需求属性的引用结构数据 |
| `property.id` | string |  |  |
| `property.url` | string |  |  |
| `property.name` | string |  |  |
| `property.type` | string |  |  |

**响应示例**

```json
{
  "id": "solution",
  "url": "https://{rest_api_root}/v2/ship/idea_property_plans/5d7a21f19ef715269ae90c50/idea_properties/solution",
  "property_plan": {
    "id": "5d7a21f19ef715269ae90c50",
    "url": "https://{rest_api_root}/v2/ship/idea_property_plans/5d7a21f19ef715269ae90c50"
  },
  "property": {
    "id": "solution",
    "url": "https://{rest_api_root}/v2/ship/idea_properties/solution",
    "name": "解决方案",
    "type": "select"
  }
}
```

<a id="get-v2-ship-idea-property-plans-idea-property-plan-id-idea-properties-idea-property-id"></a>

### 获取需求属性方案中的一个属性

`GET /v2/ship/idea_property_plans/{idea_property_plan_id}/idea_properties/{idea_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取需求属性方案中的一个属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_property_plan_id` | string | 是 | 需求属性方案的 id |
| `idea_property_id` | string | 是 | 需求属性的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 属性方案中需求属性关联的 id |
| `url` | string | 是 | 属性方案中需求属性关联的资源地址 |
| `property_plan` | object | 是 | 需求属性方案的引用结构数据 |
| `property_plan.id` | string |  |  |
| `property_plan.url` | string |  |  |
| `property` | object | 是 | 需求属性的引用结构数据 |
| `property.id` | string |  |  |
| `property.url` | string |  |  |
| `property.name` | string |  |  |
| `property.type` | string |  |  |

**响应示例**

```json
{
  "id": "solution",
  "url": "https://{rest_api_root}/v2/ship/idea_property_plans/5d7a21f19ef715269ae90c50/idea_properties/solution",
  "property_plan": {
    "id": "5d7a21f19ef715269ae90c50",
    "url": "https://{rest_api_root}/v2/ship/idea_property_plans/5d7a21f19ef715269ae90c50"
  },
  "property": {
    "id": "solution",
    "url": "https://{rest_api_root}/v2/ship/idea_properties/solution",
    "name": "解决方案",
    "type": "select"
  }
}
```

<a id="get-v2-ship-idea-property-plans-idea-property-plan-id-idea-properties"></a>

### 获取需求属性方案中的属性列表

`GET /v2/ship/idea_property_plans/{idea_property_plan_id}/idea_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取需求属性方案中的属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_property_plan_id` | string | 是 | 需求属性方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 属性方案中的需求属性全量结构数据的数组 |
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

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "solution",
      "url": "https://{rest_api_root}/v2/ship/idea_property_plans/5d7a21f19ef715269ae90c50/idea_properties/solution",
      "property_plan": {
        "id": "5d7a21f19ef715269ae90c50",
        "url": "https://{rest_api_root}/v2/ship/idea_property_plans/5d7a21f19ef715269ae90c50"
      },
      "property": {
        "id": "solution",
        "url": "https://{rest_api_root}/v2/ship/idea_properties/solution",
        "name": "解决方案",
        "type": "select"
      }
    }
  ]
}
```

<a id="delete-v2-ship-idea-property-plans-idea-property-plan-id-idea-properties-idea-property-id"></a>

### 在需求属性方案中移除一个属性

`DELETE /v2/ship/idea_property_plans/{idea_property_plan_id}/idea_properties/{idea_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:ship:configuration`

用于从需求属性方案中移除一个属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_property_plan_id` | string | 是 | 需求属性方案的 id |
| `idea_property_id` | string | 是 | 需求属性的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 属性方案中需求属性关联的 id |
| `url` | string | 是 | 属性方案中需求属性关联的资源地址 |
| `property_plan` | object | 是 | 需求属性方案的引用结构数据 |
| `property_plan.id` | string |  |  |
| `property_plan.url` | string |  |  |
| `property` | object | 是 | 需求属性的引用结构数据 |
| `property.id` | string |  |  |
| `property.url` | string |  |  |
| `property.name` | string |  |  |
| `property.type` | string |  |  |

**响应示例**

```json
{
  "id": "solution",
  "url": "https://{rest_api_root}/v2/ship/idea_property_plans/5d7a21f19ef715269ae90c50/idea_properties/solution",
  "property_plan": {
    "id": "5d7a21f19ef715269ae90c50",
    "url": "https://{rest_api_root}/v2/ship/idea_property_plans/5d7a21f19ef715269ae90c50"
  },
  "property": {
    "id": "solution",
    "url": "https://{rest_api_root}/v2/ship/idea_properties/solution",
    "name": "解决方案",
    "type": "select"
  }
}
```

<a id="get-v2-ship-idea-priorities-idea-priority-id"></a>

### 获取一个需求优先级

`GET /v2/ship/idea_priorities/{idea_priority_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于按 id 获取需求优先级全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idea_priority_id` | string | 是 | 需求优先级的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 需求优先级的 id |
| `url` | string | 是 | 需求优先级的资源地址 |
| `name` | string | 是 | 需求优先级的名称 |
| `color` | string | 是 | 优先级的颜色 |

**响应示例**

```json
{
  "id": "5cb9466afda1ce4ca0090005",
  "url": "https://{rest_api_root}/v2/ship/idea_priorities/5cb9466afda1ce4ca0090005",
  "name": "P0",
  "color": "#FF7575"
}
```

<a id="get-v2-ship-idea-priorities"></a>

### 获取全部需求优先级列表

`GET /v2/ship/idea_priorities` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:ship:configuration`

用于分页获取企业内全部需求优先级。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 需求优先级的全量结构数据的数组 |
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
      "id": "5cb9466afda1ce4ca0090005",
      "url": "https://{rest_api_root}/v2/ship/idea_priorities/5cb9466afda1ce4ca0090005",
      "name": "P0",
      "color": "#FF7575"
    }
  ]
}
```
