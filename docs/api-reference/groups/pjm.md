# 项目管理

> 区域 `pjm`（项目管理） ｜ 7 个内容分组 ｜ 130 个端点

[← 返回 API 总览](../README.md)

## 项目

> 分组路径：项目管理 / 项目

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/pjm/projects` | [创建一个项目](#post-v2-pjm-projects) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/projects/{project_id}/clone` | [复制一个项目](#post-v2-pjm-projects-project-id-clone) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/projects/{project_id}` | [获取一个项目](#get-v2-pjm-projects-project-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/projects/{project_id}/progress` | [获取一个项目进度](#get-v2-pjm-projects-project-id-progress) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/pjm/projects/{project_id}` | [部分更新一个项目](#patch-v2-pjm-projects-project-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/projects` | [获取项目列表](#get-v2-pjm-projects) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/project/project_states` | [获取可用的项目状态列表](#get-v2-pjm-project-project-states) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/projects/{project_id}/members` | [向项目中添加一个成员](#post-v2-pjm-projects-project-id-members) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/projects/{project_id}/members/{member_id}` | [获取项目中的一个成员](#get-v2-pjm-projects-project-id-members-member-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/pjm/projects/{project_id}/members/{member_id}` | [部分更新项目中的一个成员](#patch-v2-pjm-projects-project-id-members-member-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/projects/{project_id}/members` | [获取项目中的成员列表](#get-v2-pjm-projects-project-id-members) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/pjm/projects/{project_id}/members/{member_id}` | [在项目中移除一个成员](#delete-v2-pjm-projects-project-id-members-member-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/projects/{project_id}/project_properties` | [向项目中添加一个项目属性](#post-v2-pjm-projects-project-id-project-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/projects/{project_id}/project_properties/{project_property_id}` | [获取项目中的一个项目属性](#get-v2-pjm-projects-project-id-project-properties-project-property-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/projects/{project_id}/project_properties` | [获取项目中的项目属性列表](#get-v2-pjm-projects-project-id-project-properties) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/pjm/projects/{project_id}/project_properties/{project_property_id}` | [在项目中移除一个项目属性](#delete-v2-pjm-projects-project-id-project-properties-project-property-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/projects/{project_id}/local_config` | [开启项目本地配置](#post-v2-pjm-projects-project-id-local-config) | 企业令牌 / 用户令牌 |

<a id="post-v2-pjm-projects"></a>

### 创建一个项目

`POST /v2/pjm/projects` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:project`

用于创建一个项目。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `template_type` | string | 是 | 项目类型；枚举："kanban" / "scrum" / "waterfall" / "hybrid" |
| `template_id` | string |  | 项目流程模版的 id。项目流程模版可以通过`获取全部项目流程模版列表`获取 |
| `scope_type` | string |  | 项目的所属类型。默认值 `organization`。允许值分别表示企业可见和团队可见；枚举："organization" / "user_group" |
| `scope_id` | string |  | 项目的所属 id。当 `scope_type` 为 `user_group` 时，该字段必填，且表示团队 id；当 `scope_type` 为其他值时，该字段无效 |
| `name` | string | 是 | 项目的名称。最大长度为 255 |
| `visibility` | string |  | 项目的可见范围。允许值分别表示组织全部成员可见和仅项目成员可见；枚举："public" / "private" |
| `identifier` | string | 是 | 项目的标识。在一个企业中这个标识是唯一的。项目的标识由大写英文字母/数字/下划线/连接线组成（不超过 15 个字符） |
| `description` | string |  | 项目的描述 |
| `members` | object |  | 项目成员的列表。当项目的 `scope_type` 变为 `user_group` 时，项目成员必须是 `scope_id` 指定的团队内的成员；当 `scope_type` 为其他值时，项目成员可以是任意成员或团队 |
| `members.id` | string | 是 | 企业成员或团队的 id |
| `members.type` | string | 是 | 项目成员的类型；枚举："user" / "user_group" |
| `start` | object |  | 项目的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object |  | 项目的结束时间 |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |
| `assignee_id` | string |  | 项目负责人的 id |

**请求示例**

```json
{
  "scope_type": "user_group",
  "scope_id": "63c8fb32729dee3334d96af7",
  "name": "Scrum 项目",
  "visibility": "private",
  "template_type": "scrum",
  "template_id": "5fa690f1ae0571487ea49030",
  "identifier": "SCR",
  "description": "这是一个 scrum 类型的项目",
  "members": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "type": "user"
    }
  ],
  "start": {
    "date": 1680278400,
    "with_time": 0
  },
  "due": {
    "date": 1682870399,
    "with_time": 0
  },
  "assignee_id": "8168dd057b104c81bceb2e48bdf283d0"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 项目的 id |
| `url` | string | 是 | 项目的地址 |
| `template_type` | string | 是 | 项目类型；枚举："kanban" / "scrum" / "waterfall" / "hybrid" |
| `template` | object | 是 | 项目流程模版的引用结构数据 |
| `template.id` | string |  |  |
| `template.url` | string |  |  |
| `template.name` | string |  |  |
| `template.type` | string |  |  |
| `template.is_system` | number |  |  |
| `scope_id` | string | 是 | 项目的所属 id |
| `scope_type` | string | 是 | 项目的所属类型；枚举："organization" / "user_group" |
| `name` | string | 是 | 项目的名称 |
| `color` | string | 是 | 项目的主题色 |
| `identifier` | string | 是 | 项目的标识 |
| `visibility` | string | 是 | 项目的可见性；枚举："private" / "public" |
| `description` | string | 是 | 项目的描述 |
| `state` | object | 是 | 项目状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `assignee` | object | 是 | 项目负责人的引用结构数据 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `start` | object | 是 | 项目的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object | 是 | 项目的结束时间 |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |
| `properties` | object | 是 | 项目的自定义属性键值对集合 |
| `members` | object[] | 是 | 项目成员的引用结构数据列表 |
| `members[].id` | string |  |  |
| `members[].url` | string |  |  |
| `members[].type` | string |  |  |
| `members[].user` | object |  |  |
| `members[].user.id` | string |  |  |
| `members[].user.url` | string |  |  |
| `members[].user.name` | string |  |  |
| `members[].user.display_name` | string |  |  |
| `members[].user.avatar` | string |  |  |
| `is_local_configure` | number | 是 | 是否已启用本地配置；枚举：0 / 1 |
| `created_at` | number | 是 | 项目的创建时间 |
| `created_by` | object | 是 | 项目创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 项目的更新时间 |
| `updated_by` | object | 是 | 项目更新人的引用结构数据 |
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
  "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
  "template_type": "scrum",
  "template": {
    "id": "5fa690f1ae0571487ea49030",
    "url": "https://{rest_api_root}/v2/pjm/project_templates/5fa690f1ae0571487ea49030",
    "name": "Scrum 项目流程",
    "type": "scrum",
    "is_system": 1
  },
  "scope_type": "user_group",
  "scope_id": "63c8fb32729dee3334d96af7",
  "name": "Scrum 项目",
  "color": "#F693E7",
  "identifier": "SCR",
  "visibility": "private",
  "description": "这是一个 scrum 类型的项目",
  "state": {
    "id": "66cbf3b4b78a55fcd1a76296",
    "url": "https://{rest_api_root}/v2/pjm/project_states/66cbf3b4b78a55fcd1a76296",
    "name": "正常",
    "type": "in_progress"
  },
  "assignee": {
    "id": "8168dd057b104c81bceb2e48bdf283d0",
    "url": "https://{rest_api_root}/v2/directory/users/8168dd057b104c81bceb2e48bdf283d0",
    "name": "john",
    "display_name": "john",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "start": {
    "date": 1680278400,
    "with_time": 0
  },
  "due": {
    "date": 1682870399,
    "with_time": 0
  },
  "properties": {},
  "members": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
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
  "is_local_configure": 0,
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

<a id="post-v2-pjm-projects-project-id-clone"></a>

### 复制一个项目

`POST /v2/pjm/projects/{project_id}/clone` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:project`

用于复制一个项目。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `scope_type` | string |  | 项目的所属类型。默认使用原项目的所属。允许值分别表示企业可见和团队可见；枚举："organization" / "user_group" |
| `scope_id` | string |  | 项目的所属 id。当 `scope_type` 为 `user_group` 时，该字段必填，且表示团队 id；当 `scope_type` 为其他值时，该字段无效 |
| `name` | string |  | 项目的名称。最大长度为 255。默认使用原项目的名称 |
| `visibility` | string |  | 项目的可见范围。默认使用原项目的可见范围。允许值分别表示组织全部成员可见和仅项目成员可见；枚举："public" / "private" |
| `identifier` | string | 是 | 项目的标识。在一个企业中这个标识是唯一的。项目的标识由大写英文字母/数字/下划线/连接线组成（不超过 15 个字符） |
| `description` | string |  | 项目的描述。默认使用原项目的描述 |
| `members` | object |  | 项目成员的列表。当项目的 `scope_type` 变为 `user_group` 时，项目成员必须是 `scope_id` 指定的团队内的成员；当 `scope_type` 为其他值时，项目成员可以是任意成员或团队，默认使用原项目的成员列表 |
| `members.id` | string | 是 | 企业成员或团队的 id |
| `members.type` | string | 是 | 项目成员的类型；枚举："user" / "user_group" |

**请求示例**

```json
{
  "scope_type": "user_group",
  "scope_id": "63c8fb32729dee3334d96af7",
  "name": "复制的 Scrum 项目",
  "visibility": "public",
  "identifier": "SCRC",
  "description": "这是一个复制的 Scrum 类型的项目",
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
| `id` | string | 是 | 项目的 id |
| `url` | string | 是 | 项目的地址 |
| `template_type` | string | 是 | 项目类型；枚举："kanban" / "scrum" / "waterfall" / "hybrid" |
| `template` | object | 是 | 项目流程模版的引用结构数据 |
| `template.id` | string |  |  |
| `template.url` | string |  |  |
| `template.name` | string |  |  |
| `template.type` | string |  |  |
| `template.is_system` | number |  |  |
| `scope_id` | string | 是 | 项目的所属 id |
| `scope_type` | string | 是 | 项目的所属类型；枚举："organization" / "user_group" |
| `name` | string | 是 | 项目的名称 |
| `color` | string | 是 | 项目的主题色 |
| `identifier` | string | 是 | 项目的标识 |
| `visibility` | string | 是 | 项目的可见性；枚举："private" / "public" |
| `description` | string | 是 | 项目的描述 |
| `state` | object | 是 | 项目状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `assignee` | object | 是 | 项目负责人的引用结构数据 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `start` | object | 是 | 项目的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object | 是 | 项目的结束时间 |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |
| `properties` | object | 是 | 项目的自定义属性键值对集合 |
| `members` | object[] | 是 | 项目成员的引用结构数据列表 |
| `members[].id` | string |  |  |
| `members[].url` | string |  |  |
| `members[].type` | string |  |  |
| `members[].user` | object |  |  |
| `members[].user.id` | string |  |  |
| `members[].user.url` | string |  |  |
| `members[].user.name` | string |  |  |
| `members[].user.display_name` | string |  |  |
| `members[].user.avatar` | string |  |  |
| `is_local_configure` | number | 是 | 是否已启用本地配置；枚举：0 / 1 |
| `created_at` | number | 是 | 项目的创建时间 |
| `created_by` | object | 是 | 项目创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 项目的更新时间 |
| `updated_by` | object | 是 | 项目更新人的引用结构数据 |
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
  "id": "5ab623f6a70571487ea47001",
  "url": "https://{rest_api_root}/v2/pjm/projects/5ab623f6a70571487ea47001",
  "template_type": "scrum",
  "template": {
    "id": "5fa690f1ae0571487ea49030",
    "url": "https://{rest_api_root}/v2/pjm/project_templates/5fa690f1ae0571487ea49030",
    "name": "Scrum 项目流程",
    "type": "scrum",
    "is_system": 1
  },
  "scope_type": "user_group",
  "scope_id": "63c8fb32729dee3334d96af7",
  "name": "复制的 Scrum 项目",
  "color": "#F693E7",
  "identifier": "SCRC",
  "visibility": "public",
  "description": "这是一个复制的 Scrum 类型的项目",
  "state": {
    "id": "66cbf3b4b78a55fcd1a76296",
    "url": "https://{rest_api_root}/v2/pjm/project_states/66cbf3b4b78a55fcd1a76296",
    "name": "正常",
    "type": "in_progress"
  },
  "assignee": {
    "id": "8168dd057b104c81bceb2e48bdf283d0",
    "url": "https://{rest_api_root}/v2/directory/users/8168dd057b104c81bceb2e48bdf283d0",
    "name": "john",
    "display_name": "john",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "start": {
    "date": 1680278400,
    "with_time": 0
  },
  "due": {
    "date": 1682870399,
    "with_time": 0
  },
  "properties": {},
  "members": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
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
  "is_local_configure": 0,
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

<a id="get-v2-pjm-projects-project-id"></a>

### 获取一个项目

`GET /v2/pjm/projects/{project_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:project`

用于按 id 获取项目全量信息。  
 默认不含已删除/已归档项目。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的项目。该值默认为 `false` |
| `include_archived` | boolean |  | 是否包含已归档的项目。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 项目的 id |
| `url` | string | 是 | 项目的地址 |
| `template_type` | string | 是 | 项目类型；枚举："kanban" / "scrum" / "waterfall" / "hybrid" |
| `template` | object | 是 | 项目流程模版的引用结构数据 |
| `template.id` | string |  |  |
| `template.url` | string |  |  |
| `template.name` | string |  |  |
| `template.type` | string |  |  |
| `template.is_system` | number |  |  |
| `scope_id` | string | 是 | 项目的所属 id |
| `scope_type` | string | 是 | 项目的所属类型；枚举："organization" / "user_group" |
| `name` | string | 是 | 项目的名称 |
| `color` | string | 是 | 项目的主题色 |
| `identifier` | string | 是 | 项目的标识 |
| `visibility` | string | 是 | 项目的可见性；枚举："private" / "public" |
| `description` | string | 是 | 项目的描述 |
| `state` | object | 是 | 项目状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `assignee` | object | 是 | 项目负责人的引用结构数据 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `start` | object | 是 | 项目的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object | 是 | 项目的结束时间 |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |
| `properties` | object | 是 | 项目的自定义属性键值对集合 |
| `properties.prop_a` | string |  |  |
| `properties.prop_b` | string |  |  |
| `members` | object[] | 是 | 项目成员的引用结构数据列表 |
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
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `is_local_configure` | number | 是 | 是否已启用本地配置；枚举：0 / 1 |
| `created_at` | number | 是 | 项目的创建时间 |
| `created_by` | object | 是 | 项目创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 项目的更新时间 |
| `updated_by` | object | 是 | 项目更新人的引用结构数据 |
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
  "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
  "template_type": "scrum",
  "template": {
    "id": "5fa690f1ae0571487ea49030",
    "url": "https://{rest_api_root}/v2/pjm/project_templates/5fa690f1ae0571487ea49030",
    "name": "Scrum 项目流程",
    "type": "scrum",
    "is_system": 1
  },
  "scope_type": "user_group",
  "scope_id": "63c8fb32729dee3334d96af7",
  "name": "Scrum 项目",
  "color": "#F693E7",
  "identifier": "SCR",
  "visibility": "private",
  "description": "这是一个 scrum 类型的项目",
  "state": {
    "id": "66cbf3b4b78a55fcd1a76296",
    "url": "https://{rest_api_root}/v2/pjm/project_states/66cbf3b4b78a55fcd1a76296",
    "name": "正常",
    "type": "in_progress"
  },
  "assignee": {
    "id": "8168dd057b104c81bceb2e48bdf283d0",
    "url": "https://{rest_api_root}/v2/directory/users/8168dd057b104c81bceb2e48bdf283d0",
    "name": "john",
    "display_name": "john",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "start": {
    "date": 1680278400,
    "with_time": 0
  },
  "due": {
    "date": 1682870399,
    "with_time": 0
  },
  "properties": {
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value"
  },
  "entity_properties": {},
  "members": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
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
      "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000/members/63c8fb32729dee3334d96af7",
      "type": "user_group",
      "user_group": {
        "id": "63c8fb32729dee3334d96af7",
        "url": "https://{rest_api_root}/v2/directory/groups/63c8fb32729dee3334d96af7",
        "name": "Open Team"
      }
    }
  ],
  "is_local_configure": 0,
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

<a id="get-v2-pjm-projects-project-id-progress"></a>

### 获取一个项目进度

`GET /v2/pjm/projects/{project_id}/progress` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:project`

用于按项目 id 获取工作项进度统计。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem` | object | 是 | 项目工作项进度统计 |
| `workitem.total` | number | 是 | 工作项总数 |
| `workitem.pending_count` | number | 是 | 待处理工作项数量 |
| `workitem.in_progress_count` | number | 是 | 进行中工作项数量 |
| `workitem.completed_count` | number | 是 | 已完成工作项数量 |

**响应示例**

```json
{
  "workitem": {
    "total": 4,
    "pending_count": 1,
    "in_progress_count": 2,
    "completed_count": 1
  }
}
```

<a id="patch-v2-pjm-projects-project-id"></a>

### 部分更新一个项目

`PATCH /v2/pjm/projects/{project_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:project`

用于部分更新一个项目。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 项目的名称。最大长度为 255 |
| `identifier` | string |  | 项目的标识。在一个企业中这个标识是唯一的。项目的标识由大写英文字母/数字/下划线/连接线组成（不超过 15 个字符） |
| `description` | string |  | 项目的描述 |
| `start` | object |  | 项目的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object |  | 项目的结束时间 |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |
| `assignee_id` | string |  | 项目负责人的 id |
| `state_id` | string |  | 项目状态的 id。项目状态可以通过`获取项目状态列表`获取 |
| `properties` | object |  | 项目自定义属性的键值对集合。需要注意自定义属性需要包含在项目属性方案中。例如属性方案中包含 `prop_a` 和 `prop_b` |

**请求示例**

```json
{
  "name": "Scrum 项目",
  "identifier": "SCR",
  "description": "这是一个 scrum 类型的项目",
  "start": {
    "date": 1680278400,
    "with_time": 0
  },
  "due": {
    "date": 1682870399,
    "with_time": 0
  },
  "assignee_id": "a0417f68e846aae315c85d24643678a9",
  "state_id": "66cbf3b4b78a55fcd1a76296",
  "properties": {
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value"
  }
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 项目的 id |
| `url` | string | 是 | 项目的地址 |
| `template_type` | string | 是 | 项目类型；枚举："kanban" / "scrum" / "waterfall" / "hybrid" |
| `template` | object | 是 | 项目流程模版的引用结构数据 |
| `template.id` | string |  |  |
| `template.url` | string |  |  |
| `template.name` | string |  |  |
| `template.type` | string |  |  |
| `template.is_system` | number |  |  |
| `scope_id` | string | 是 | 项目的所属 id |
| `scope_type` | string | 是 | 项目的所属类型；枚举："organization" / "user_group" |
| `name` | string | 是 | 项目的名称 |
| `color` | string | 是 | 项目的主题色 |
| `identifier` | string | 是 | 项目的标识 |
| `visibility` | string | 是 | 项目的可见性；枚举："private" / "public" |
| `description` | string | 是 | 项目的描述 |
| `state` | object | 是 | 项目状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `assignee` | object | 是 | 项目负责人的引用结构数据 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `start` | object | 是 | 项目的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object | 是 | 项目的结束时间 |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |
| `properties` | object | 是 | 项目的自定义属性键值对集合 |
| `properties.prop_a` | string |  |  |
| `properties.prop_b` | string |  |  |
| `members` | object[] | 是 | 项目成员的引用结构数据列表 |
| `members[].id` | string |  |  |
| `members[].url` | string |  |  |
| `members[].type` | string |  |  |
| `members[].user` | object |  |  |
| `members[].user.id` | string |  |  |
| `members[].user.url` | string |  |  |
| `members[].user.name` | string |  |  |
| `members[].user.display_name` | string |  |  |
| `members[].user.avatar` | string |  |  |
| `is_local_configure` | number | 是 | 是否已启用本地配置；枚举：0 / 1 |
| `created_at` | number | 是 | 项目的创建时间 |
| `created_by` | object | 是 | 项目创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 项目的更新时间 |
| `updated_by` | object | 是 | 项目更新人的引用结构数据 |
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
  "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
  "template_type": "scrum",
  "template": {
    "id": "5fa690f1ae0571487ea49030",
    "url": "https://{rest_api_root}/v2/pjm/project_templates/5fa690f1ae0571487ea49030",
    "name": "Scrum 项目流程",
    "type": "scrum",
    "is_system": 1
  },
  "scope_type": "user_group",
  "scope_id": "63c8fb32729dee3334d96af7",
  "name": "Scrum 项目",
  "color": "#F693E7",
  "identifier": "SCR",
  "visibility": "private",
  "description": "这是一个 scrum 类型的项目",
  "state": {
    "id": "66cbf3b4b78a55fcd1a76296",
    "url": "https://{rest_api_root}/v2/pjm/project_states/66cbf3b4b78a55fcd1a76296",
    "name": "正常",
    "type": "in_progress"
  },
  "assignee": {
    "id": "8168dd057b104c81bceb2e48bdf283d0",
    "url": "https://{rest_api_root}/v2/directory/users/8168dd057b104c81bceb2e48bdf283d0",
    "name": "john",
    "display_name": "john",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "start": {
    "date": 1680278400,
    "with_time": 0
  },
  "due": {
    "date": 1682870399,
    "with_time": 0
  },
  "properties": {
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value"
  },
  "members": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
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
  "is_local_configure": 0,
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

<a id="get-v2-pjm-projects"></a>

### 获取项目列表

`GET /v2/pjm/projects` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:project`

用于分页获取项目。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `scope_type` | string |  | 项目的所属类型。允许值分别表示企业可见和团队可见；枚举："organization" / "user_group" |
| `scope_id` | string |  | 项目的所属 id。仅支持团队的 id |
| `keywords` | string |  | 关键字。只支持 `name` 关键字搜索 |
| `member_type` | string |  | 项目成员的类型。`member_type` 和 `member_id` 必须同时存在；枚举："user" / "user_group" |
| `member_id` | string |  | 项目成员的 id。值为企业成员或团队的 id。`member_id` 和 `member_type` 必须同时存在 |
| `template_type` | string |  | 项目类型；枚举："scrum" / "kanban" / "waterfall" / "hybrid" |
| `created_between` | string |  | 创建时间介于的时间范围，通过','分割起始时间 |
| `updated_between` | string |  | 更新时间介于的时间范围，通过','分割起始时间 |
| `include_deleted` | boolean |  | 是否查询已删除的项目。该值默认为 `false` |
| `include_archived` | boolean |  | 是否查询已归档的项目。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 项目全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].template_type` | string |  |  |
| `values[].template` | object |  |  |
| `values[].template.id` | string |  |  |
| `values[].template.url` | string |  |  |
| `values[].template.name` | string |  |  |
| `values[].template.type` | string |  |  |
| `values[].template.is_system` | number |  |  |
| `values[].scope_type` | string |  |  |
| `values[].scope_id` | string |  |  |
| `values[].name` | string |  |  |
| `values[].color` | string |  |  |
| `values[].visibility` | string |  |  |
| `values[].identifier` | string |  |  |
| `values[].description` | string |  |  |
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
| `values[].start` | object |  |  |
| `values[].start.date` | number |  |  |
| `values[].start.with_time` | number |  |  |
| `values[].due` | object |  |  |
| `values[].due.date` | number |  |  |
| `values[].due.with_time` | number |  |  |
| `values[].properties` | object |  |  |
| `values[].properties.prop_a` | string |  |  |
| `values[].properties.prop_b` | string |  |  |
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
| `values[].is_local_configure` | number |  |  |
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
      "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
      "template_type": "scrum",
      "template": {
        "id": "5fa690f1ae0571487ea49030",
        "url": "https://{rest_api_root}/v2/pjm/project_templates/5fa690f1ae0571487ea49030",
        "name": "Scrum 项目流程",
        "type": "scrum",
        "is_system": 1
      },
      "scope_type": "user_group",
      "scope_id": "63c8fb32729dee3334d96af7",
      "name": "Scrum 项目",
      "color": "#F693E7",
      "visibility": "private",
      "identifier": "SCR",
      "description": "这是一个 scrum 类型的项目",
      "state": {
        "id": "66cbf3b4b78a55fcd1a76296",
        "url": "https://{rest_api_root}/v2/pjm/project_states/66cbf3b4b78a55fcd1a76296",
        "name": "正常",
        "type": "in_progress"
      },
      "assignee": {
        "id": "8168dd057b104c81bceb2e48bdf283d0",
        "url": "https://{rest_api_root}/v2/directory/users/8168dd057b104c81bceb2e48bdf283d0",
        "name": "john",
        "display_name": "john",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "start": {
        "date": 1680278400,
        "with_time": 0
      },
      "due": {
        "date": 1682870399,
        "with_time": 0
      },
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      },
      "members": [
        {
          "id": "a0417f68e846aae315c85d24643678a9",
          "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
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
      "is_local_configure": 0,
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

<a id="get-v2-pjm-project-project-states"></a>

### 获取可用的项目状态列表

`GET /v2/pjm/project/project_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:project`

用于分页获取项目中可用的项目状态。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `page_size` | number | 是 | 每页条数 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 项目状态引用结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].type` | string |  |  |

**响应示例**

```json
{
  "page_index": 0,
  "page_size": 30,
  "total": 5,
  "values": [
    {
      "id": "66cbf5401e7cc374c85acb1b",
      "url": "https://{rest_api_root}/v2/pjm/project_states/66cbf5401e7cc374c85acb1b",
      "name": "未开始",
      "type": "pending"
    },
    {
      "id": "66cbf5401e7cc374c85acb1c",
      "url": "https://{rest_api_root}/v2/pjm/project_states/66cbf5401e7cc374c85acb1c",
      "name": "正常",
      "type": "in_progress"
    },
    {
      "id": "66cbf5401e7cc374c85acb1d",
      "url": "https://{rest_api_root}/v2/pjm/project_states/66cbf5401e7cc374c85acb1d",
      "name": "预警",
      "type": "in_progress"
    },
    {
      "id": "66cbf5401e7cc374c85acb1e",
      "url": "https://{rest_api_root}/v2/pjm/project_states/66cbf5401e7cc374c85acb1e",
      "name": "延期",
      "type": "in_progress"
    },
    {
      "id": "66cbf5401e7cc374c85acb1f",
      "url": "https://{rest_api_root}/v2/pjm/project_states/66cbf5401e7cc374c85acb1f",
      "name": "结束",
      "type": "completed"
    }
  ]
}
```

<a id="post-v2-pjm-projects-project-id-members"></a>

### 向项目中添加一个成员

`POST /v2/pjm/projects/{project_id}/members` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:project`

用于向指定项目添加一个成员。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `member` | object | 是 | 项目的成员 |
| `member.id` | string | 是 | 企业成员或团队的 id |
| `member.type` | string | 是 | 项目成员的类型；枚举："user" / "user_group" |
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
| `id` | string | 是 | 资源的 id |
| `url` | string | 是 | 资源的地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `type` | string | 是 | 项目成员的类型 |
| `user` | object | 是 | 用户的引用结构数据 |
| `user.id` | string |  |  |
| `user.url` | string |  |  |
| `user.name` | string |  |  |
| `user.display_name` | string |  |  |
| `user.avatar` | string |  |  |
| `user_group` | object | 是 | 团队的引用结构数据 |
| `role` | object | 是 | role 的引用结构数据 |
| `role.id` | string |  |  |
| `role.url` | string |  |  |
| `role.name` | string |  |  |

**响应示例**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "template_type": "scrum",
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

<a id="get-v2-pjm-projects-project-id-members-member-id"></a>

### 获取项目中的一个成员

`GET /v2/pjm/projects/{project_id}/members/{member_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:project`

用于按 id 获取项目中的一个成员全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |
| `member_id` | string | 是 | 企业成员或团队的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 资源的 id |
| `url` | string | 是 | 资源的地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `type` | string | 是 | 项目成员的类型 |
| `user` | object | 是 | 用户的引用结构数据 |
| `user.id` | string |  |  |
| `user.url` | string |  |  |
| `user.name` | string |  |  |
| `user.display_name` | string |  |  |
| `user.avatar` | string |  |  |
| `user_group` | object | 是 | 团队的引用结构数据 |
| `role` | object | 是 | role 的引用结构数据 |
| `role.id` | string |  |  |
| `role.url` | string |  |  |
| `role.name` | string |  |  |

**响应示例**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "template_type": "scrum",
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

<a id="patch-v2-pjm-projects-project-id-members-member-id"></a>

### 部分更新项目中的一个成员

`PATCH /v2/pjm/projects/{project_id}/members/{member_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:project`

用于部分更新项目成员角色。  
 仅管理员可更改其他用户的角色。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |
| `member_id` | string | 是 | 企业成员或团队的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `role_id` | string |  | 角色的 id |

**请求示例**

```json
{
  "role_id": "6422711c3f12e6c1e46d40e6"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 项目内的成员的 id |
| `url` | string | 是 | 项目内的成员的地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `type` | string | 是 | 项目成员的类型 |
| `user` | object | 是 | 用户的引用结构数据 |
| `user.id` | string |  |  |
| `user.url` | string |  |  |
| `user.name` | string |  |  |
| `user.display_name` | string |  |  |
| `user.avatar` | string |  |  |
| `role` | object | 是 | role 的引用结构数据 |
| `role.id` | string |  |  |
| `role.url` | string |  |  |
| `role.name` | string |  |  |

**响应示例**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "template_type": "scrum",
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

<a id="get-v2-pjm-projects-project-id-members"></a>

### 获取项目中的成员列表

`GET /v2/pjm/projects/{project_id}/members` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:project`

用于分页获取某项目中的成员。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 项目中的成员的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].project` | object |  |  |
| `values[].project.id` | string |  |  |
| `values[].project.url` | string |  |  |
| `values[].project.identifier` | string |  |  |
| `values[].project.name` | string |  |  |
| `values[].project.template_type` | string |  |  |
| `values[].project.is_archived` | number |  |  |
| `values[].project.is_deleted` | number |  |  |
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
      "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
      "project": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
        "identifier": "SCR",
        "name": "Scrum 项目",
        "template_type": "scrum",
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
      "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000/members/63c8fb32729dee3334d96af7",
      "project": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
        "identifier": "SCR",
        "name": "Scrum 项目",
        "template_type": "scrum",
        "is_archived": 0,
        "is_deleted": 0
      },
      "type": "user_group",
      "user_group": {
        "id": "63c8fb32729dee3334d96af7",
        "url": "https://{rest_api_root}/v2/directory/user_groups/63c8fb32729dee3334d96af7",
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

<a id="delete-v2-pjm-projects-project-id-members-member-id"></a>

### 在项目中移除一个成员

`DELETE /v2/pjm/projects/{project_id}/members/{member_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:project`

用于从指定项目移除一个成员。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |
| `member_id` | string | 是 | 企业成员或团队的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 资源的 id |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `type` | string | 是 | 项目成员的类型 |
| `user` | object | 是 | 用户的引用结构数据 |
| `user.id` | string |  |  |
| `user.url` | string |  |  |
| `user.name` | string |  |  |
| `user.display_name` | string |  |  |
| `user.avatar` | string |  |  |
| `role` | object | 是 | role 的引用结构数据 |
| `role.id` | string |  |  |
| `role.url` | string |  |  |
| `role.name` | string |  |  |
| `url` | string |  |  |

**响应示例**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000/members/a0417f68e846aae315c85d24643678a9",
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "template_type": "scrum",
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

<a id="post-v2-pjm-projects-project-id-project-properties"></a>

### 向项目中添加一个项目属性

`POST /v2/pjm/projects/{project_id}/project_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于向项目中添加一个项目属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `property_id` | string | 是 | 项目属性的 id |

**请求示例**

```json
{
  "property_id": "risk"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 资源的 id |
| `url` | string | 是 | 资源的地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `property` | object | 是 | 项目属性的引用结构数据 |
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
  "id": "risk",
  "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000/project_properties/risk",
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "template_type": "scrum",
    "is_archived": 0,
    "is_deleted": 0
  },
  "property": {
    "id": "risk",
    "url": "https://{rest_api_root}/v2/pjm/project_properties/risk",
    "name": "项目风险",
    "type": "select",
    "options": [
      {
        "id": "5efb1859110533727a82c603",
        "text": "高"
      },
      {
        "id": "5efb1859110533727a82c604",
        "text": "中"
      },
      {
        "id": "5efb1859110533727a82c605",
        "text": "低"
      }
    ]
  }
}
```

<a id="get-v2-pjm-projects-project-id-project-properties-project-property-id"></a>

### 获取项目中的一个项目属性

`GET /v2/pjm/projects/{project_id}/project_properties/{project_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于按 id 获取项目中的一个项目属性全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |
| `project_property_id` | string | 是 | 项目属性的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 资源的 id |
| `url` | string | 是 | 资源的地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `property` | object | 是 | 属性的引用结构数据 |
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
  "id": "risk",
  "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000/project_properties/risk",
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "template_type": "scrum",
    "is_archived": 0,
    "is_deleted": 0
  },
  "property": {
    "id": "risk",
    "url": "https://{rest_api_root}/v2/pjm/project_properties/risk",
    "name": "项目风险",
    "type": "select",
    "options": [
      {
        "id": "5efb1859110533727a82c603",
        "text": "高"
      },
      {
        "id": "5efb1859110533727a82c604",
        "text": "中"
      },
      {
        "id": "5efb1859110533727a82c605",
        "text": "低"
      }
    ]
  }
}
```

<a id="get-v2-pjm-projects-project-id-project-properties"></a>

### 获取项目中的项目属性列表

`GET /v2/pjm/projects/{project_id}/project_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于分页获取某项目中的项目属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 项目中的项目属性全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].project` | object |  |  |
| `values[].project.id` | string |  |  |
| `values[].project.url` | string |  |  |
| `values[].project.identifier` | string |  |  |
| `values[].project.name` | string |  |  |
| `values[].project.template_type` | string |  |  |
| `values[].project.is_archived` | number |  |  |
| `values[].project.is_deleted` | number |  |  |
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
  "total": 1,
  "values": [
    {
      "id": "risk",
      "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000/project_properties/risk",
      "project": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
        "identifier": "SCR",
        "name": "Scrum 项目",
        "template_type": "scrum",
        "is_archived": 0,
        "is_deleted": 0
      },
      "property": {
        "id": "risk",
        "url": "https://{rest_api_root}/v2/pjm/project_properties/risk",
        "name": "项目风险",
        "type": "select",
        "options": [
          {
            "id": "5efb1859110533727a82c603",
            "text": "高"
          }
        ]
      }
    }
  ]
}
```

<a id="delete-v2-pjm-projects-project-id-project-properties-project-property-id"></a>

### 在项目中移除一个项目属性

`DELETE /v2/pjm/projects/{project_id}/project_properties/{project_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于从指定项目移除一个项目属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |
| `project_property_id` | string | 是 | 项目属性的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 资源的 id |
| `url` | string | 是 | 资源的地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `property` | object | 是 | 属性的引用结构数据 |
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
  "id": "risk",
  "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000/project_properties/risk",
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "template_type": "scrum",
    "is_archived": 0,
    "is_deleted": 0
  },
  "property": {
    "id": "risk",
    "url": "https://{rest_api_root}/v2/pjm/project_properties/risk",
    "name": "项目风险",
    "type": "select",
    "options": [
      {
        "id": "5efb1859110533727a82c603",
        "text": "高"
      }
    ]
  }
}
```

<a id="post-v2-pjm-projects-project-id-local-config"></a>

### 开启项目本地配置

`POST /v2/pjm/projects/{project_id}/local_config` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:project`

用于为指定项目开启本地配置。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 项目的 id |
| `url` | string | 是 | 项目的地址 |
| `template_type` | string | 是 | 项目类型 |
| `template` | object | 是 | 项目流程模版的引用结构数据 |
| `template.id` | string |  |  |
| `template.url` | string |  |  |
| `template.name` | string |  |  |
| `template.type` | string |  |  |
| `template.is_system` | number |  |  |
| `scope_type` | string | 是 | 项目的所属类型 |
| `scope_id` | string | 是 | 项目的所属 id |
| `name` | string | 是 | 项目的名称 |
| `color` | string | 是 | 项目的主题色 |
| `identifier` | string | 是 | 项目的标识 |
| `visibility` | string | 是 | 项目的可见性 |
| `description` | string | 是 | 项目的描述 |
| `is_local_configure` | number | 是 | 是否已启用本地配置 |
| `created_at` | number | 是 | 项目的创建时间 |
| `created_by` | object | 是 | 项目的创建人 |
| `updated_at` | number | 是 | 项目的更新时间 |
| `updated_by` | object | 是 | 项目的更新人 |
| `is_archived` | number | 是 | 是否已归档；枚举：0 / 1 |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5eb623f6a70571487ea47000",
  "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
  "template_type": "scrum",
  "template": {
    "id": "5fa690f1ae0571487ea49030",
    "url": "https://{rest_api_root}/v2/pjm/project_templates/5fa690f1ae0571487ea49030",
    "name": "Scrum 项目流程",
    "type": "scrum",
    "is_system": 1
  },
  "scope_type": "user_group",
  "scope_id": "63c8fb32729dee3334d96af7",
  "name": "Scrum 项目",
  "color": "#F693E7",
  "identifier": "SCR",
  "visibility": "private",
  "description": "这是一个 scrum 类型的项目",
  "is_local_configure": 1,
  "created_at": 1583290300,
  "updated_at": 1583290300,
  "is_archived": 0,
  "is_deleted": 0
}
```

## 迭代

> 分组路径：项目管理 / 迭代

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/pjm/sprints` | [创建一个迭代](#post-v2-pjm-sprints) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/sprints/bulk/create` | [批量创建迭代](#post-v2-pjm-sprints-bulk-create) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/sprints/{sprint_id}` | [获取一个迭代](#get-v2-pjm-sprints-sprint-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/pjm/sprints/{sprint_id}` | [部分更新一个迭代](#patch-v2-pjm-sprints-sprint-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/sprints` | [获取迭代列表](#get-v2-pjm-sprints) | 企业令牌 / 用户令牌 |

<a id="post-v2-pjm-sprints"></a>

### 创建一个迭代

`POST /v2/pjm/sprints` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:sprint`

用于创建一个迭代。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |
| `name` | string | 是 | 迭代的名称 |
| `start` | object | 是 | 迭代的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object | 是 | 迭代的结束时间 |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |
| `assignee_id` | string | 是 | 迭代负责人的 id |
| `description` | string |  | 迭代的描述 |
| `status` | string |  | 迭代的状态；枚举："pending" / "in_progress" / "completed" |
| `category_ids` | string[] |  | 迭代类别的 id 列表 |
| `phase_id` | string |  | 关联阶段的 id。该字段只有项目类型为 `waterfall` 和 `hybrid` 时有效 |

**请求示例**

```json
{
  "project_id": "5eb623f6a70571487ea47000",
  "name": "Sprint 2",
  "start": {
    "date": 1589791860,
    "with_time": 0
  },
  "due": {
    "date": 1589791860,
    "with_time": 0
  },
  "assignee_id": "a0417f68e846aae315c85d24643678a9",
  "description": "This is sprint 2",
  "status": "pending",
  "category_ids": [
    "5e6b35de50ef8153c2062f70"
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 迭代的 id |
| `url` | string | 是 | 迭代的地址 |
| `project` | object | 是 | 迭代所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `name` | string | 是 | 迭代的名称 |
| `status` | string | 是 | 迭代的状态；枚举："pending" / "in_progress" / "completed" |
| `assignee` | object | 是 | 迭代负责人的引用结构数据 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `start` | object | 是 | 迭代的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object | 是 | 迭代的结束时间 |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |
| `description` | string | 是 | 迭代的描述 |
| `categories` | object[] | 是 | 迭代关联的类别列表 |
| `phase` | object |  | 迭代关联的阶段引用结构数据 |
| `phase.id` | string |  |  |
| `phase.url` | string |  |  |
| `phase.short_id` | string |  |  |
| `phase.html_url` | string |  |  |
| `phase.whole_identifier` | string |  |  |
| `phase.title` | string |  |  |
| `phase.start` | object |  |  |
| `phase.start.date` | number |  |  |
| `phase.start.with_time` | number |  |  |
| `phase.due` | object |  |  |
| `phase.due.date` | number |  |  |
| `phase.due.with_time` | number |  |  |
| `phase.parent_id` | null |  |  |
| `phase.properties` | object |  |  |
| `phase.properties.prop_a` | string |  |  |
| `phase.properties.prop_b` | string |  |  |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5ecf7b74eaab845a2aa53132",
  "url": "https://{rest_api_root}/v2/pjm/sprints/5ecf7b74eaab845a2aa53132",
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "template_type": "scrum",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "Sprint 2",
  "status": "pending",
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "start": {
    "date": 1589791860,
    "with_time": 0
  },
  "due": {
    "date": 1589791860,
    "with_time": 0
  },
  "description": "This is sprint 2",
  "categories": [],
  "phase": {
    "id": "5edca524cad2fa1125cb0630",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
    "short_id": "eqWqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/eqWqLmTO",
    "whole_identifier": "HYB-1",
    "title": "开发阶段",
    "start": {
      "date": 1583290309,
      "with_time": 0
    },
    "due": {
      "date": 1583290347,
      "with_time": 0
    },
    "parent_id": null,
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  },
  "is_deleted": 0
}
```

<a id="post-v2-pjm-sprints-bulk-create"></a>

### 批量创建迭代

`POST /v2/pjm/sprints/bulk/create` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:sprint`

用于批量创建迭代，单次最多支持 100 条。  
接口支持部分成功，单条失败不会影响其他条目，已成功的数据不会回滚。  
响应按请求条目顺序返回对应结果，通过 `state`（`success` / `failure`）判断操作结果，失败时通过 `message` 返回失败原因。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `sprints` | object | 是 | 需要批量创建的迭代。该参数是一个对象数组（数组内对象不得超过 100 个） |
| `sprints.project_id` | string | 是 | 迭代所属项目的 id |
| `sprints.name` | string | 是 | 迭代的名称 |
| `sprints.start` | object | 是 | 迭代的开始时间 |
| `sprints.due` | object | 是 | 迭代的结束时间 |
| `sprints.assignee_id` | string |  | 迭代负责人的 id |
| `sprints.description` | string |  | 迭代的描述 |
| `sprints.status` | string |  | 迭代的状态；枚举："pending" / "in_progress" / "completed" |
| `sprints.category_ids` | string[] |  | 迭代类别的 id 列表 |
| `sprints.phase_id` | string |  | 关联阶段的 id。该字段只有项目类型为 `waterfall` 和 `hybrid` 时有效 |

**请求示例**

```json
{
  "sprints": [
    {
      "project_id": "5eb623f6a70571487ea47000",
      "name": "Sprint 2",
      "start": {
        "date": 1589791860,
        "with_time": 0
      },
      "due": {
        "date": 1589791860,
        "with_time": 0
      },
      "assignee_id": "a0417f68e846aae315c85d24643678a9",
      "description": "This is sprint 2",
      "status": "pending",
      "category_ids": [
        "5e6b35de50ef8153c2062f70"
      ]
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
    "sprint": {
      "id": "5ecf7b74eaab845a2aa53132",
      "url": "https://{rest_api_root}/v2/pjm/sprints/5ecf7b74eaab845a2aa53132",
      "project": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
        "identifier": "SCR",
        "name": "Scrum 项目",
        "template_type": "scrum",
        "is_archived": 0,
        "is_deleted": 0
      },
      "name": "Sprint 2",
      "status": "pending",
      "assignee": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "start": {
        "date": 1589791860,
        "with_time": 0
      },
      "due": {
        "date": 1589791860,
        "with_time": 0
      },
      "description": "This is sprint 2",
      "categories": [],
      "phase": {
        "id": "5edca524cad2fa1125cb0630",
        "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
        "short_id": "eqWqLmTO",
        "html_url": "https://yctech.pingcode.com/pjm/workitems/eqWqLmTO",
        "whole_identifier": "HYB-1",
        "title": "开发阶段",
        "start": {
          "date": 1583290309,
          "with_time": 0
        },
        "due": {
          "date": 1583290347,
          "with_time": 0
        },
        "parent_id": null,
        "properties": {
          "prop_a": "prop_a_value",
          "prop_b": "prop_b_value"
        }
      },
      "is_deleted": 0
    }
  }
]
```

<a id="get-v2-pjm-sprints-sprint-id"></a>

### 获取一个迭代

`GET /v2/pjm/sprints/{sprint_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:sprint`

用于按 id 获取迭代全量信息。默认不含已删除项。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `sprint_id` | string | 是 | 迭代的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的迭代。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 迭代的 id |
| `url` | string | 是 | 迭代的地址 |
| `project` | object | 是 | 迭代所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `name` | string | 是 | 迭代的名称 |
| `status` | string | 是 | 迭代的状态；枚举："pending" / "in_progress" / "completed" |
| `assignee` | object | 是 | 迭代负责人的引用结构数据 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `start` | object | 是 | 迭代的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object | 是 | 迭代的结束时间 |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |
| `description` | string | 是 | 迭代的描述 |
| `started_at` | number | 是 | 迭代的实际开始时间 |
| `completed_at` | number | 是 | 迭代的实际完成时间 |
| `total_story_points` | number | 是 | 迭代的总故事点 |
| `started_story_points` | number | 是 | 迭代已开始的故事点 |
| `completed_story_points` | number | 是 | 迭代已完成的故事点 |
| `categories` | object[] | 是 | 迭代关联的类别列表 |
| `categories[].id` | string |  |  |
| `categories[].url` | string |  |  |
| `categories[].name` | string |  |  |
| `phase` | object |  | 迭代关联的阶段引用结构数据 |
| `phase.id` | string |  |  |
| `phase.url` | string |  |  |
| `phase.short_id` | string |  |  |
| `phase.html_url` | string |  |  |
| `phase.whole_identifier` | string |  |  |
| `phase.title` | string |  |  |
| `phase.start` | object |  |  |
| `phase.start.date` | number |  |  |
| `phase.start.with_time` | number |  |  |
| `phase.due` | object |  |  |
| `phase.due.date` | number |  |  |
| `phase.due.with_time` | number |  |  |
| `phase.parent_id` | null |  |  |
| `phase.properties` | object |  |  |
| `phase.properties.prop_a` | string |  |  |
| `phase.properties.prop_b` | string |  |  |
| `created_at` | number | 是 | 迭代的创建时间 |
| `created_by` | object | 是 | 迭代的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 迭代的更新时间 |
| `updated_by` | object | 是 | 迭代的更新人 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5ecf7b74eaab845a2aa53138",
  "url": "https://{rest_api_root}/v2/pjm/sprints/5ecf7b74eaab845a2aa53138",
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "template_type": "scrum",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "Sprint 1",
  "status": "completed",
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "start": {
    "date": 1589791860,
    "with_time": 0
  },
  "due": {
    "date": 1589791860,
    "with_time": 0
  },
  "description": "This is sprint 1",
  "started_at": 1589791860,
  "completed_at": 1589791960,
  "total_story_points": 0,
  "started_story_points": 0,
  "completed_story_points": 0,
  "categories": [
    {
      "id": "676a460a0fd987b7ea320887",
      "url": "https://{rest_api_root}/v2/categories/676a460a0fd987b7ea320887?entity_type=sprint",
      "name": "Category 1"
    }
  ],
  "phase": {
    "id": "5edca524cad2fa1125cb0630",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
    "short_id": "eqWqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/eqWqLmTO",
    "whole_identifier": "HYB-1",
    "title": "开发阶段",
    "start": {
      "date": 1583290309,
      "with_time": 0
    },
    "due": {
      "date": 1583290347,
      "with_time": 0
    },
    "parent_id": null,
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
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
  "is_deleted": 0
}
```

<a id="patch-v2-pjm-sprints-sprint-id"></a>

### 部分更新一个迭代

`PATCH /v2/pjm/sprints/{sprint_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:sprint`

用于部分更新一个迭代。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `sprint_id` | string | 是 | 迭代的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 迭代的名称 |
| `start` | object |  | 迭代的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object |  | 迭代的结束时间 |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |
| `assignee_id` | string |  | 迭代负责人的 id |
| `description` | string |  | 迭代的描述 |
| `status` | string |  | 迭代的状态；枚举："pending" / "in_progress" / "completed" |
| `category_ids` | string[] |  | 迭代类别的 id 列表 |
| `phase_id` | string |  | 关联阶段的 id。该字段只有项目类型为 `waterfall` 和 `hybrid` 时有效 |

**请求示例**

```json
{
  "name": "Sprint 2",
  "start": {
    "date": 1589791860,
    "with_time": 0
  },
  "due": {
    "date": 1589791860,
    "with_time": 0
  },
  "assignee_id": "a0417f68e846aae315c85d24643678a9",
  "description": "This is sprint 2",
  "status": "in_progress",
  "category_ids": [
    "5e6b35de50ef8153c2062f70"
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 迭代的 id |
| `url` | string | 是 | 迭代的地址 |
| `project` | object | 是 | 迭代所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `name` | string | 是 | 迭代的名称 |
| `status` | string | 是 | 迭代的状态；枚举："pending" / "in_progress" / "completed" |
| `assignee` | object | 是 | 迭代负责人的引用结构数据 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `start` | object | 是 | 迭代的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object | 是 | 迭代的结束时间 |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |
| `description` | string | 是 | 迭代的描述 |
| `started_at` | number | 是 | 迭代的实际开始时间 |
| `completed_at` | number | 是 | 迭代的实际完成时间 |
| `total_story_points` | number | 是 | 迭代的总故事点 |
| `started_story_points` | number | 是 | 迭代已开始的故事点 |
| `completed_story_points` | number | 是 | 迭代已完成的故事点 |
| `categories` | object[] | 是 | 迭代关联的类别列表 |
| `categories[].id` | string |  |  |
| `categories[].url` | string |  |  |
| `categories[].name` | string |  |  |
| `phase` | object |  | 迭代关联的阶段引用结构数据 |
| `phase.id` | string |  |  |
| `phase.url` | string |  |  |
| `phase.short_id` | string |  |  |
| `phase.html_url` | string |  |  |
| `phase.whole_identifier` | string |  |  |
| `phase.title` | string |  |  |
| `phase.start` | object |  |  |
| `phase.start.date` | number |  |  |
| `phase.start.with_time` | number |  |  |
| `phase.due` | object |  |  |
| `phase.due.date` | number |  |  |
| `phase.due.with_time` | number |  |  |
| `phase.parent_id` | null |  |  |
| `phase.properties` | object |  |  |
| `phase.properties.prop_a` | string |  |  |
| `phase.properties.prop_b` | string |  |  |
| `created_at` | number | 是 | 迭代的创建时间 |
| `created_by` | object | 是 | 迭代的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 迭代的更新时间 |
| `updated_by` | object | 是 | 迭代的更新人 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5ecf7b74eaab845a2aa53132",
  "url": "https://{rest_api_root}/v2/pjm/sprints/5ecf7b74eaab845a2aa53132",
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "template_type": "scrum",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "Sprint 2",
  "status": "in_progress",
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "start": {
    "date": 1589791860,
    "with_time": 0
  },
  "due": {
    "date": 1589791860,
    "with_time": 0
  },
  "description": "This is sprint 2",
  "started_at": 1589791860,
  "completed_at": 1589791960,
  "total_story_points": 0,
  "started_story_points": 0,
  "completed_story_points": 0,
  "categories": [
    {
      "id": "676a460a0fd987b7ea320887",
      "url": "https://{rest_api_root}/v2/categories/676a460a0fd987b7ea320887?entity_type=sprint",
      "name": "Category 1"
    }
  ],
  "phase": {
    "id": "5edca524cad2fa1125cb0630",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
    "short_id": "eqWqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/eqWqLmTO",
    "whole_identifier": "HYB-1",
    "title": "开发阶段",
    "start": {
      "date": 1583290309,
      "with_time": 0
    },
    "due": {
      "date": 1583290347,
      "with_time": 0
    },
    "parent_id": null,
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
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
  "is_deleted": 0
}
```

<a id="get-v2-pjm-sprints"></a>

### 获取迭代列表

`GET /v2/pjm/sprints` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:sprint`

用于分页获取某项目中的迭代。默认不含已删除项。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |
| `name` | string |  | 按名称筛选 |
| `status` | string |  | 按状态筛选；枚举："pending" / "in_progress" / "completed" |
| `include_deleted` | boolean |  | 是否包含已删除的迭代。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 迭代全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].project` | object |  |  |
| `values[].project.id` | string |  |  |
| `values[].project.url` | string |  |  |
| `values[].project.identifier` | string |  |  |
| `values[].project.name` | string |  |  |
| `values[].project.template_type` | string |  |  |
| `values[].project.is_archived` | number |  |  |
| `values[].project.is_deleted` | number |  |  |
| `values[].name` | string |  |  |
| `values[].status` | string |  |  |
| `values[].assignee` | object |  |  |
| `values[].assignee.id` | string |  |  |
| `values[].assignee.url` | string |  |  |
| `values[].assignee.name` | string |  |  |
| `values[].assignee.display_name` | string |  |  |
| `values[].assignee.avatar` | string |  |  |
| `values[].start` | object |  |  |
| `values[].start.date` | number |  |  |
| `values[].start.with_time` | number |  |  |
| `values[].due` | object |  |  |
| `values[].due.date` | number |  |  |
| `values[].due.with_time` | number |  |  |
| `values[].description` | string |  |  |
| `values[].started_at` | number |  |  |
| `values[].completed_at` | number |  |  |
| `values[].total_story_points` | number |  |  |
| `values[].started_story_points` | number |  |  |
| `values[].completed_story_points` | number |  |  |
| `values[].categories` | object[] |  |  |
| `values[].categories[].id` | string |  |  |
| `values[].categories[].url` | string |  |  |
| `values[].categories[].name` | string |  |  |
| `values[].phase` | object |  |  |
| `values[].phase.id` | string |  |  |
| `values[].phase.url` | string |  |  |
| `values[].phase.short_id` | string |  |  |
| `values[].phase.html_url` | string |  |  |
| `values[].phase.whole_identifier` | string |  |  |
| `values[].phase.title` | string |  |  |
| `values[].phase.start` | object |  |  |
| `values[].phase.start.date` | number |  |  |
| `values[].phase.start.with_time` | number |  |  |
| `values[].phase.due` | object |  |  |
| `values[].phase.due.date` | number |  |  |
| `values[].phase.due.with_time` | number |  |  |
| `values[].phase.parent_id` | null |  |  |
| `values[].phase.properties` | object |  |  |
| `values[].phase.properties.prop_a` | string |  |  |
| `values[].phase.properties.prop_b` | string |  |  |
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
| `values[].is_deleted` | number |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5ecf7b74eaab845a2aa53138",
      "url": "https://{rest_api_root}/v2/pjm/sprints/5ecf7b74eaab845a2aa53138",
      "project": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
        "identifier": "SCR",
        "name": "Scrum 项目",
        "template_type": "scrum",
        "is_archived": 0,
        "is_deleted": 0
      },
      "name": "Sprint 1",
      "status": "completed",
      "assignee": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "start": {
        "date": 1589791860,
        "with_time": 0
      },
      "due": {
        "date": 1589791860,
        "with_time": 0
      },
      "description": "This is sprint 1",
      "started_at": 1589791860,
      "completed_at": 1589791960,
      "total_story_points": 0,
      "started_story_points": 0,
      "completed_story_points": 0,
      "categories": [
        {
          "id": "676a460a0fd987b7ea320887",
          "url": "https://{rest_api_root}/v2/categories/676a460a0fd987b7ea320887?entity_type=sprint",
          "name": "Category 1"
        }
      ],
      "phase": {
        "id": "5edca524cad2fa1125cb0630",
        "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
        "short_id": "eqWqLmTO",
        "html_url": "https://yctech.pingcode.com/pjm/workitems/eqWqLmTO",
        "whole_identifier": "HYB-1",
        "title": "开发阶段",
        "start": {
          "date": 1583290309,
          "with_time": 0
        },
        "due": {
          "date": 1583290347,
          "with_time": 0
        },
        "parent_id": null,
        "properties": {
          "prop_a": "prop_a_value",
          "prop_b": "prop_b_value"
        }
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
      "is_deleted": 0
    }
  ]
}
```

## 看板

> 分组路径：项目管理 / 看板

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/pjm/boards` | [创建一个看板](#post-v2-pjm-boards) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/boards/{board_id}` | [获取一个看板](#get-v2-pjm-boards-board-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/pjm/boards/{board_id}` | [部分更新一个看板](#patch-v2-pjm-boards-board-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/boards` | [获取看板列表](#get-v2-pjm-boards) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/pjm/boards/{board_id}` | [删除一个看板](#delete-v2-pjm-boards-board-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/boards/{board_id}/entries` | [创建一个看板栏](#post-v2-pjm-boards-board-id-entries) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/boards/{board_id}/entries/{entry_id}` | [获取一个看板栏](#get-v2-pjm-boards-board-id-entries-entry-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/pjm/boards/{board_id}/entries/{entry_id}` | [部分更新一个看板栏](#patch-v2-pjm-boards-board-id-entries-entry-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/boards/{board_id}/entries` | [获取看板栏列表](#get-v2-pjm-boards-board-id-entries) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/pjm/boards/{board_id}/entries/{entry_id}` | [删除一个看板栏](#delete-v2-pjm-boards-board-id-entries-entry-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/boards/{board_id}/swimlanes` | [创建一个泳道](#post-v2-pjm-boards-board-id-swimlanes) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/boards/{board_id}/swimlanes/{swimlane_id}` | [获取一个泳道](#get-v2-pjm-boards-board-id-swimlanes-swimlane-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/pjm/boards/{board_id}/swimlanes/{swimlane_id}` | [部分更新一个泳道](#patch-v2-pjm-boards-board-id-swimlanes-swimlane-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/boards/{board_id}/swimlanes` | [获取泳道列表](#get-v2-pjm-boards-board-id-swimlanes) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/pjm/boards/{board_id}/swimlanes/{swimlane_id}` | [删除一个泳道](#delete-v2-pjm-boards-board-id-swimlanes-swimlane-id) | 企业令牌 / 用户令牌 |

<a id="post-v2-pjm-boards"></a>

### 创建一个看板

`POST /v2/pjm/boards` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:board`

用于创建一个看板。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |
| `name` | string | 是 | 看板的名字。在同一个项目中该名字是唯一的 |
| `workitem_type_ids` | string[] |  | 看板支持的工作项类型 id 列表 |

**请求示例**

```json
{
  "project_id": "5eb623f6a70571487ea41919",
  "name": "一个看板",
  "workitem_type_ids": [
    "630da48bc9443b1aa94ce3ea",
    "630da48bc9443b1aa94ce3eb",
    "630da48bc9443b1aa94ce3ec"
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 看板的 id |
| `url` | string | 是 | 看板的地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `name` | string | 是 | 看板的名称 |
| `workitem_type_ids` | string[] | 是 | 看板支持的工作项类型列表 |
| `is_deleted` | number |  |  |

**响应示例**

```json
{
  "id": "5eb623f6a70571487ea47222",
  "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222",
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "KANBAN",
    "name": "kanban",
    "template_type": "kanban",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "一个看板",
  "workitem_type_ids": [
    "630da48bc9443b1aa94ce3ea",
    "630da48bc9443b1aa94ce3eb",
    "630da48bc9443b1aa94ce3ec"
  ],
  "is_deleted": 0
}
```

<a id="get-v2-pjm-boards-board-id"></a>

### 获取一个看板

`GET /v2/pjm/boards/{board_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:board`

用于按 id 获取看板全量信息。默认不含已删除项。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `board_id` | string | 是 | 看板的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的看板。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 看板的 id |
| `url` | string | 是 | 看板的地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `name` | string | 是 | 看板的名称 |
| `workitem_type_ids` | string[] | 是 | 看板支持的工作项类型列表 |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5eb623f6a70571487ea47222",
  "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222",
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "KANBAN",
    "name": "kanban",
    "template_type": "kanban",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "kanban",
  "workitem_type_ids": [
    "630da48bc9443b1aa94ce3ea",
    "630da48bc9443b1aa94ce3eb",
    "630da48bc9443b1aa94ce3ec"
  ],
  "is_deleted": 0
}
```

<a id="patch-v2-pjm-boards-board-id"></a>

### 部分更新一个看板

`PATCH /v2/pjm/boards/{board_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:board`

用于部分更新一个看板。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `board_id` | string | 是 | 看板的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 看板的名字。在同一个项目中该名字是唯一的 |
| `workitem_type_ids` | string[] |  | 看板支持的工作项类型 id 列表 |

**请求示例**

```json
{
  "name": "一个看板",
  "workitem_type_ids": [
    "630da48bc9443b1aa94ce3ea",
    "630da48bc9443b1aa94ce3eb"
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 看板的 id |
| `url` | string | 是 | 看板的地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `name` | string | 是 | 看板的名称 |
| `workitem_type_ids` | string[] | 是 | 看板支持的工作项类型列表 |
| `is_deleted` | number |  |  |

**响应示例**

```json
{
  "id": "5eb623f6a70571487ea47222",
  "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222",
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "KANBAN",
    "name": "kanban",
    "template_type": "kanban",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "一个看板",
  "workitem_type_ids": [
    "630da48bc9443b1aa94ce3ea",
    "630da48bc9443b1aa94ce3eb"
  ],
  "is_deleted": 0
}
```

<a id="get-v2-pjm-boards"></a>

### 获取看板列表

`GET /v2/pjm/boards` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:board`

用于分页获取某项目中的看板。默认不含已删除项。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |
| `include_deleted` | boolean |  | 是否包含已删除的看板。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 看板全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].project` | object |  |  |
| `values[].project.id` | string |  |  |
| `values[].project.url` | string |  |  |
| `values[].project.identifier` | string |  |  |
| `values[].project.name` | string |  |  |
| `values[].project.template_type` | string |  |  |
| `values[].project.is_archived` | number |  |  |
| `values[].project.is_deleted` | number |  |  |
| `values[].name` | string |  |  |
| `values[].workitem_type_ids` | string \| string \| string[] |  |  |
| `values[].is_deleted` | number |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5eb623f6a70571487ea47222",
      "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222",
      "project": {
        "id": "5eb623f6a70571487ea41919",
        "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
        "identifier": "KANBAN",
        "name": "kanban",
        "template_type": "kanban",
        "is_archived": 0,
        "is_deleted": 0
      },
      "name": "kanban",
      "workitem_type_ids": [
        "630da48bc9443b1aa94ce3ea",
        "630da48bc9443b1aa94ce3eb",
        "630da48bc9443b1aa94ce3ec"
      ],
      "is_deleted": 0
    }
  ]
}
```

<a id="delete-v2-pjm-boards-board-id"></a>

### 删除一个看板

`DELETE /v2/pjm/boards/{board_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:board`

用于删除一个看板。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `board_id` | string | 是 | 看板的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 看板的 id |
| `url` | string | 是 | 看板的地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `name` | string | 是 | 看板的名称 |
| `workitem_type_ids` | string[] | 是 | 看板支持的工作项类型列表 |
| `is_deleted` | number |  |  |

**响应示例**

```json
{
  "id": "5eb623f6a70571487ea47222",
  "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222",
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "KANBAN",
    "name": "kanban",
    "template_type": "kanban",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "一个看板",
  "workitem_type_ids": [
    "630da48bc9443b1aa94ce3ea",
    "630da48bc9443b1aa94ce3eb"
  ],
  "is_deleted": 0
}
```

<a id="post-v2-pjm-boards-board-id-entries"></a>

### 创建一个看板栏

`POST /v2/pjm/boards/{board_id}/entries` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:board`

用于创建一个看板栏。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `board_id` | string | 是 | 看板的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 看板栏的名字 |
| `is_split` | boolean |  | 是否将看板栏拆分为进行中和已完成 |
| `wip_limit` | number |  | 在制品数量 |
| `dod` | string |  | 完成的定义 |

**请求示例**

```json
{
  "name": "一个看板栏",
  "is_split": true,
  "wip_limit": 1,
  "dod": "Unit test passed"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 看板栏的 id |
| `url` | string | 是 | 看板栏的地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `board` | object | 是 | 所属看板的引用结构数据 |
| `board.id` | string |  |  |
| `board.url` | string |  |  |
| `board.name` | string |  |  |
| `board.workitem_type_ids` | string \| string \| string[] |  |  |
| `name` | string | 是 | 看板栏的名称 |
| `is_system` | number | 是 | 是否为系统内置看板栏；枚举：0 / 1 |
| `is_split` | boolean | 是 | 是否将看板栏拆分为进行中和已完成 |
| `wip_limit` | number | 是 | 在制品数量 |
| `dod` | string | 是 | 完成的定义 |
| `is_deleted` | number |  |  |

**响应示例**

```json
{
  "id": "5ab623f6a70571487ea45634",
  "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222/entries/5ab623f6a70571487ea45634",
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "KANBAN",
    "name": "kanban",
    "template_type": "kanban",
    "is_archived": 0,
    "is_deleted": 0
  },
  "board": {
    "id": "5eb623f6a70571487ea47222",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222",
    "name": "kanban",
    "workitem_type_ids": [
      "630da48bc9443b1aa94ce3ea",
      "630da48bc9443b1aa94ce3eb",
      "630da48bc9443b1aa94ce3ec"
    ]
  },
  "name": "一个看板栏",
  "is_system": 0,
  "is_split": true,
  "wip_limit": 1,
  "dod": "Unit test passed",
  "is_deleted": 0
}
```

<a id="get-v2-pjm-boards-board-id-entries-entry-id"></a>

### 获取一个看板栏

`GET /v2/pjm/boards/{board_id}/entries/{entry_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:board`

用于按 id 获取看板栏全量信息。默认不含已删除项。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `board_id` | string | 是 | 看板的 id |
| `entry_id` | string | 是 | 看板栏的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的看板栏。该值默认为 `false`。仅当所属看板已被删除时，传 `true` 才能获取到该看板下已删除的看板栏；若仅删除了看板栏而看板仍存在，传 `true` 无法获取 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 看板栏的 id |
| `url` | string | 是 | 看板栏的地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `board` | object | 是 | 所属看板的引用结构数据 |
| `board.id` | string |  |  |
| `board.url` | string |  |  |
| `board.name` | string |  |  |
| `board.workitem_type_ids` | string \| string \| string[] |  |  |
| `name` | string | 是 | 看板栏的名称 |
| `is_system` | number | 是 | 是否为系统内置看板栏；枚举：0 / 1 |
| `is_split` | boolean | 是 | 是否将看板栏拆分为进行中和已完成 |
| `wip_limit` | number | 是 | 在制品数量 |
| `dod` | string | 是 | 完成的定义 |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5ab623f6a70571487ea45634",
  "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222/entries/5ab623f6a70571487ea45634",
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "KANBAN",
    "name": "kanban",
    "template_type": "kanban",
    "is_archived": 0,
    "is_deleted": 0
  },
  "board": {
    "id": "5eb623f6a70571487ea47222",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222",
    "name": "kanban",
    "workitem_type_ids": [
      "630da48bc9443b1aa94ce3ea",
      "630da48bc9443b1aa94ce3eb",
      "630da48bc9443b1aa94ce3ec"
    ]
  },
  "name": "一个看板栏",
  "is_system": 0,
  "is_split": true,
  "wip_limit": 1,
  "dod": "Unit test passed",
  "is_deleted": 0
}
```

<a id="patch-v2-pjm-boards-board-id-entries-entry-id"></a>

### 部分更新一个看板栏

`PATCH /v2/pjm/boards/{board_id}/entries/{entry_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:board`

用于部分更新一个看板栏。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `board_id` | string | 是 | 看板的 id |
| `entry_id` | string | 是 | 看板栏的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 看板栏的名字 |
| `is_split` | boolean |  | 是否将看板栏拆分为进行中和已完成 |
| `wip_limit` | number |  | 在制品数量 |
| `dod` | string |  | 完成的定义 |

**请求示例**

```json
{
  "name": "一个看板栏",
  "is_split": true,
  "wip_limit": 1,
  "dod": "Unit test passed"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 看板栏的 id |
| `url` | string | 是 | 看板栏的地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `board` | object | 是 | 所属看板的引用结构数据 |
| `board.id` | string |  |  |
| `board.url` | string |  |  |
| `board.name` | string |  |  |
| `board.workitem_type_ids` | string \| string \| string[] |  |  |
| `name` | string | 是 | 看板栏的名称 |
| `is_system` | number | 是 | 是否为系统内置看板栏；枚举：0 / 1 |
| `is_split` | boolean | 是 | 是否将看板栏拆分为进行中和已完成 |
| `wip_limit` | number | 是 | 在制品数量 |
| `dod` | string | 是 | 完成的定义 |
| `is_deleted` | number |  |  |

**响应示例**

```json
{
  "id": "5ab623f6a70571487ea45634",
  "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222/entries/5ab623f6a70571487ea45634",
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "KANBAN",
    "name": "kanban",
    "template_type": "kanban",
    "is_archived": 0,
    "is_deleted": 0
  },
  "board": {
    "id": "5eb623f6a70571487ea47222",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222",
    "name": "kanban",
    "workitem_type_ids": [
      "630da48bc9443b1aa94ce3ea",
      "630da48bc9443b1aa94ce3eb",
      "630da48bc9443b1aa94ce3ec"
    ]
  },
  "name": "一个看板栏",
  "is_system": 0,
  "is_split": true,
  "wip_limit": 1,
  "dod": "Unit test passed",
  "is_deleted": 0
}
```

<a id="get-v2-pjm-boards-board-id-entries"></a>

### 获取看板栏列表

`GET /v2/pjm/boards/{board_id}/entries` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:board`

用于分页获取某看板中的看板栏。默认不含已删除项。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `board_id` | string | 是 | 看板的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的看板栏。该值默认为 `false`。仅当所属看板已被删除时，传 `true` 才能获取到该看板下已删除的看板栏；若仅删除了看板栏而看板仍存在，传 `true` 无法获取 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object | 是 | 看板栏全量结构数据的数组 |
| `values.is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5ab623f6a70571487ea45634",
      "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222/entries/5ab623f6a70571487ea45634",
      "project": {
        "id": "5eb623f6a70571487ea41919",
        "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
        "identifier": "KANBAN",
        "name": "kanban",
        "template_type": "kanban",
        "is_archived": 0,
        "is_deleted": 0
      },
      "board": {
        "id": "5eb623f6a70571487ea47222",
        "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222",
        "name": "kanban",
        "workitem_type_ids": [
          "630da48bc9443b1aa94ce3ea",
          "630da48bc9443b1aa94ce3eb",
          "630da48bc9443b1aa94ce3ec"
        ]
      },
      "name": "一个看板栏",
      "is_system": 0,
      "is_split": true,
      "wip_limit": 1,
      "dod": "Unit test passed",
      "is_deleted": 0
    }
  ]
}
```

<a id="delete-v2-pjm-boards-board-id-entries-entry-id"></a>

### 删除一个看板栏

`DELETE /v2/pjm/boards/{board_id}/entries/{entry_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:board`

用于删除一个看板栏。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `board_id` | string | 是 | 看板的 id |
| `entry_id` | string | 是 | 看板栏的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 看板栏的 id |
| `url` | string | 是 | 看板栏的地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `board` | object | 是 | 所属看板的引用结构数据 |
| `board.id` | string |  |  |
| `board.url` | string |  |  |
| `board.name` | string |  |  |
| `board.workitem_type_ids` | string \| string \| string[] |  |  |
| `name` | string | 是 | 看板栏的名称 |
| `is_system` | number | 是 | 是否为系统内置看板栏；枚举：0 / 1 |
| `is_split` | boolean | 是 | 是否将看板栏拆分为进行中和已完成 |
| `wip_limit` | number | 是 | 在制品数量 |
| `dod` | string | 是 | 完成的定义 |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5ab623f6a70571487ea45634",
  "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222/entries/5ab623f6a70571487ea45634",
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "KANBAN",
    "name": "kanban",
    "template_type": "kanban",
    "is_archived": 0,
    "is_deleted": 0
  },
  "board": {
    "id": "5eb623f6a70571487ea47222",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222",
    "name": "kanban",
    "workitem_type_ids": [
      "630da48bc9443b1aa94ce3ea",
      "630da48bc9443b1aa94ce3eb",
      "630da48bc9443b1aa94ce3ec"
    ]
  },
  "name": "一个看板栏",
  "is_system": 0,
  "is_split": true,
  "wip_limit": 1,
  "dod": "Unit test passed",
  "is_deleted": 0
}
```

<a id="post-v2-pjm-boards-board-id-swimlanes"></a>

### 创建一个泳道

`POST /v2/pjm/boards/{board_id}/swimlanes` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:board`

用于创建一个泳道。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `board_id` | string | 是 | 看板的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 泳道的名字 |

**请求示例**

```json
{
  "name": "一个泳道"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 泳道的 id |
| `url` | string | 是 | 泳道的地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `board` | object | 是 | 所属看板的引用结构数据 |
| `board.id` | string |  |  |
| `board.url` | string |  |  |
| `board.name` | string |  |  |
| `board.workitem_type_ids` | string \| string \| string[] |  |  |
| `name` | string | 是 | 泳道的名称 |
| `is_system` | number | 是 | 是否为系统内置泳道；枚举：0 / 1 |
| `is_deleted` | number |  |  |

**响应示例**

```json
{
  "id": "5bb623f6a70571487ea44357",
  "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47223/swimlanes/5bb623f6a70571487ea44357",
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "KANBAN",
    "name": "kanban",
    "template_type": "kanban",
    "is_archived": 0,
    "is_deleted": 0
  },
  "board": {
    "id": "5eb623f6a70571487ea47223",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47223",
    "name": "默认看板",
    "workitem_type_ids": [
      "630da48bc9443b1aa94ce3ea",
      "630da48bc9443b1aa94ce3eb",
      "630da48bc9443b1aa94ce3ec"
    ]
  },
  "name": "一个泳道",
  "is_system": 0,
  "is_deleted": 0
}
```

<a id="get-v2-pjm-boards-board-id-swimlanes-swimlane-id"></a>

### 获取一个泳道

`GET /v2/pjm/boards/{board_id}/swimlanes/{swimlane_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:board`

用于按 id 获取泳道全量信息。默认不含已删除项。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `board_id` | string | 是 | 看板的 id |
| `swimlane_id` | string | 是 | 泳道的 id. |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的泳道。该值默认为 `false`。仅当所属看板已被删除时，传 `true` 才能获取到该看板下已删除的泳道；若仅删除了泳道而看板仍存在，传 `true` 无法获取 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 泳道的 id |
| `url` | string | 是 | 泳道的地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `board` | object | 是 | 所属看板的引用结构数据 |
| `board.id` | string |  |  |
| `board.url` | string |  |  |
| `board.name` | string |  |  |
| `board.workitem_type_ids` | string \| string \| string[] |  |  |
| `name` | string | 是 | 泳道的名称 |
| `is_system` | number | 是 | 是否为系统内置泳道；枚举：0 / 1 |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5bb623f6a70571487ea44357",
  "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47223/swimlanes/5bb623f6a70571487ea44357",
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "KANBAN",
    "name": "kanban",
    "template_type": "kanban",
    "is_archived": 0,
    "is_deleted": 0
  },
  "board": {
    "id": "5eb623f6a70571487ea47223",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47223",
    "name": "默认看板",
    "workitem_type_ids": [
      "630da48bc9443b1aa94ce3ea",
      "630da48bc9443b1aa94ce3eb",
      "630da48bc9443b1aa94ce3ec"
    ]
  },
  "name": "一个泳道",
  "is_system": 0,
  "is_deleted": 0
}
```

<a id="patch-v2-pjm-boards-board-id-swimlanes-swimlane-id"></a>

### 部分更新一个泳道

`PATCH /v2/pjm/boards/{board_id}/swimlanes/{swimlane_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:board`

用于部分更新一个泳道。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `board_id` | string | 是 | 看板的 id |
| `swimlane_id` | string | 是 | 泳道的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 泳道的名字 |

**请求示例**

```json
{
  "name": "一个泳道"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 泳道的 id |
| `url` | string | 是 | 泳道的地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `board` | object | 是 | 所属看板的引用结构数据 |
| `board.id` | string |  |  |
| `board.url` | string |  |  |
| `board.name` | string |  |  |
| `board.workitem_type_ids` | string \| string \| string[] |  |  |
| `name` | string | 是 | 泳道的名称 |
| `is_system` | number | 是 | 是否为系统内置泳道；枚举：0 / 1 |
| `is_deleted` | number |  |  |

**响应示例**

```json
{
  "id": "5bb623f6a70571487ea44357",
  "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47223/swimlanes/5bb623f6a70571487ea44357",
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "KANBAN",
    "name": "kanban",
    "template_type": "kanban",
    "is_archived": 0,
    "is_deleted": 0
  },
  "board": {
    "id": "5eb623f6a70571487ea47223",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47223",
    "name": "默认看板",
    "workitem_type_ids": [
      "630da48bc9443b1aa94ce3ea",
      "630da48bc9443b1aa94ce3eb",
      "630da48bc9443b1aa94ce3ec"
    ]
  },
  "name": "一个泳道",
  "is_system": 0,
  "is_deleted": 0
}
```

<a id="get-v2-pjm-boards-board-id-swimlanes"></a>

### 获取泳道列表

`GET /v2/pjm/boards/{board_id}/swimlanes` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:board`

用于分页获取某看板中的泳道。默认不含已删除项。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `board_id` | string | 是 | 看板的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的泳道。该值默认为 `false`。仅当所属看板已被删除时，传 `true` 才能获取到该看板下已删除的泳道；若仅删除了泳道而看板仍存在，传 `true` 无法获取 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object | 是 | 泳道全量结构数据的数组 |
| `values.is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5bb623f6a70571487ea44357",
      "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47223/swimlanes/5bb623f6a70571487ea44357",
      "project": {
        "id": "5eb623f6a70571487ea41919",
        "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
        "identifier": "KANBAN",
        "name": "kanban",
        "template_type": "kanban",
        "is_archived": 0,
        "is_deleted": 0
      },
      "board": {
        "id": "5eb623f6a70571487ea47223",
        "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47223",
        "name": "默认看板",
        "workitem_type_ids": [
          "630da48bc9443b1aa94ce3ea",
          "630da48bc9443b1aa94ce3eb",
          "630da48bc9443b1aa94ce3ec"
        ]
      },
      "name": "一个泳道",
      "is_system": 0,
      "is_deleted": 0
    }
  ]
}
```

<a id="delete-v2-pjm-boards-board-id-swimlanes-swimlane-id"></a>

### 删除一个泳道

`DELETE /v2/pjm/boards/{board_id}/swimlanes/{swimlane_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:board`

用于删除一个泳道。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `board_id` | string | 是 | 看板的 id |
| `swimlane_id` | string | 是 | 泳道的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 泳道的 id |
| `url` | string | 是 | 泳道的地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `board` | object | 是 | 所属看板的引用结构数据 |
| `board.id` | string |  |  |
| `board.url` | string |  |  |
| `board.name` | string |  |  |
| `board.workitem_type_ids` | string \| string \| string[] |  |  |
| `name` | string | 是 | 泳道的名称 |
| `is_system` | number | 是 | 是否为系统内置泳道；枚举：0 / 1 |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5bb623f6a70571487ea44357",
  "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47223/swimlanes/5bb623f6a70571487ea44357",
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "KANBAN",
    "name": "kanban",
    "template_type": "kanban",
    "is_archived": 0,
    "is_deleted": 0
  },
  "board": {
    "id": "5eb623f6a70571487ea47223",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47223",
    "name": "默认看板",
    "workitem_type_ids": [
      "630da48bc9443b1aa94ce3ea",
      "630da48bc9443b1aa94ce3eb",
      "630da48bc9443b1aa94ce3ec"
    ]
  },
  "name": "一个泳道",
  "is_system": 0,
  "is_deleted": 0
}
```

## 工作项

> 分组路径：项目管理 / 工作项

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/pjm/workitems` | [创建一个工作项](#post-v2-pjm-workitems) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitems/{workitem_id}` | [获取一个工作项](#get-v2-pjm-workitems-workitem-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/pjm/workitems/{workitem_id}` | [部分更新一个工作项](#patch-v2-pjm-workitems-workitem-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/workitems/bulk/set` | [批量设置工作项属性](#post-v2-pjm-workitems-bulk-set) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitems` | [获取工作项列表](#get-v2-pjm-workitems) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/workitems/search` | [搜索工作项列表](#post-v2-pjm-workitems-search) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/pjm/workitems/{workitem_id}` | [删除一个工作项](#delete-v2-pjm-workitems-workitem-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem/workitem_types` | [获取可用的工作项类型列表](#get-v2-pjm-workitem-workitem-types) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem/workitem_states` | [获取可用的工作项状态列表](#get-v2-pjm-workitem-workitem-states) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem/workitem_properties` | [获取可用的工作项属性列表](#get-v2-pjm-workitem-workitem-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem/workitem_priorities` | [获取可用的工作项优先级列表](#get-v2-pjm-workitem-workitem-priorities) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem/workitem_tags` | [获取可用的工作项标签列表](#get-v2-pjm-workitem-workitem-tags) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/workitems/{workitem_id}/workitem_tags` | [向工作项中添加一个标签](#post-v2-pjm-workitems-workitem-id-workitem-tags) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitems/{workitem_id}/workitem_tags/{workitem_tag_id}` | [获取工作项中的一个标签](#get-v2-pjm-workitems-workitem-id-workitem-tags-workitem-tag-id) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/pjm/workitems/{workitem_id}/workitem_tags/{workitem_tag_id}` | [在工作项中移除一个标签](#delete-v2-pjm-workitems-workitem-id-workitem-tags-workitem-tag-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_relation_types/{workitem_relation_type_id}` | [获取一个工作项内部关联类型](#get-v2-pjm-workitem-relation-types-workitem-relation-type-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_relation_types` | [获取工作项内部关联类型列表](#get-v2-pjm-workitem-relation-types) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/workitems/{workitem_id}/relations` | [创建一个工作项内部关联](#post-v2-pjm-workitems-workitem-id-relations) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitems/{workitem_id}/relations/{relation_id}` | [获取一个工作项内部关联](#get-v2-pjm-workitems-workitem-id-relations-relation-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitems/{workitem_id}/relations` | [获取工作项内部关联列表](#get-v2-pjm-workitems-workitem-id-relations) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/pjm/workitems/{workitem_id}/relations/{relation_id}` | [删除一个工作项内部关联](#delete-v2-pjm-workitems-workitem-id-relations-relation-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitems/{workitem_id}/transition_histories/{transition_history_id}` | [获取一条工作项流转记录](#get-v2-pjm-workitems-workitem-id-transition-histories-transition-history-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitems/{workitem_id}/transition_histories` | [获取工作项流转记录列表](#get-v2-pjm-workitems-workitem-id-transition-histories) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/deliverable_targets` | [创建一个工作项交付目标](#post-v2-pjm-deliverable-targets) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/deliverable_targets/{deliverable_target_id}` | [获取一个工作项交付目标](#get-v2-pjm-deliverable-targets-deliverable-target-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/pjm/deliverable_targets/{deliverable_target_id}` | [部分更新一个工作项交付目标](#patch-v2-pjm-deliverable-targets-deliverable-target-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/deliverable_targets` | [获取工作项交付目标列表](#get-v2-pjm-deliverable-targets) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/pjm/deliverable_targets/{deliverable_target_id}` | [删除一个工作项交付目标](#delete-v2-pjm-deliverable-targets-deliverable-target-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/deliverables` | [提交一个工作项交付物](#post-v2-pjm-deliverables) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/deliverables/{deliverable_id}` | [获取一个工作项交付物](#get-v2-pjm-deliverables-deliverable-id) | 企业令牌 / 用户令牌 |

<a id="post-v2-pjm-workitems"></a>

### 创建一个工作项

`POST /v2/pjm/workitems` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:workitem`

用于创建一个工作项。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |
| `type_id` | string | 是 | 工作项类型的 id。可以通过`获取全部工作项类型列表`获得 |
| `title` | string | 是 | 工作项的标题 |
| `description` | string |  | 工作项的描述 |
| `start` | object |  | 工作项的开始时间。当工作项类型为里程碑时，该参数无效 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object |  | 工作项的截止时间 |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |
| `priority_id` | string |  | 工作项优先级的 id |
| `state_id` | string |  | 工作项状态的 id。工作项状态的 id 在设置时必须同时满足工作项类型的工作项状态方案和工作项状态流转的状态值才能成功完成设置。工作项状态方案可以通过`获取工作项状态方案列表`获取。工作项状态流转则可以通过`获取工作项状态方案中的状态流转列表`获取 |
| `assignee_id` | string |  | 工作项负责人的 id |
| `parent_id` | string |  | 工作项的父工作项的 id。当前工作项类型支持的父工作类型包含 `parent_id` 对应的工作项类型时，该参数有效。具体配置见属性与视图子工作项配置 |
| `sprint_id` | string |  | 所属迭代 id。该字段只有项目类型为 `scrum` 和 `hybrid` 时有效 |
| `release_ids` | string[] |  | 所属发布的 id 列表 |
| `board_id` | string |  | 看板的 id。该字段只有项目类型为 `kanban` 和 `hybrid` 时有效 |
| `entry_id` | string |  | 看板栏的 id。该字段只有项目类型为 `kanban` 和 `hybrid` 时有效 |
| `entry_status` | number |  | 工作项所在看板栏的分区。`1`：进行中（doing），`2`：已完成（done）。该字段只有项目类型为 `kanban` 和 `hybrid` 时有效，且看板栏开启拆分时有意义；枚举：1 / 2 |
| `swimlane_id` | string |  | 泳道的 id。该字段只有项目类型为 `kanban` 和 `hybrid` 时有效 |
| `properties` | object |  | 工作项属性的键值对集合，需要注意的是，当前工作项类型对应的工作项属性方案需要包含这些工作项属性，例如工作项属性方案中包含 `prop_a` 和 `prop_b` |
| `participant_ids` | string[] |  | 工作项关注人的 id 列表 |

**请求示例**

```json
{
  "project_id": "5eb623f6a70571487ea47000",
  "type_id": "630da48bc9443b1aa94ce3ee",
  "title": "这是一个缺陷",
  "description": "这是一个缺陷的描述",
  "start": {
    "date": 1583290309,
    "with_time": 1
  },
  "due": {
    "date": 1583290347,
    "with_time": 1
  },
  "state_id": "5c9b35de90ad7153c2062f18",
  "parent_id": "5edca112b06305c524cad2fa",
  "sprint_id": "5ecf7b74eaab845a2aa53138",
  "release_ids": [
    "5eb623487ea47001f6a70571"
  ],
  "board_id": "5eb623f6a70571487ea47222",
  "entry_id": "5ee1c4fac5b3c51206f0a861",
  "entry_status": 1,
  "swimlane_id": "5ee1c4fac5b3c51206f0a866",
  "priority_id": "5eb623f6a70571487ea47111",
  "assignee_id": "a0417f68e846aae315c85d24643678a9",
  "participant_ids": [
    "a0417f68e846aae315c85d24643678a9"
  ],
  "properties": {
    "story_points": 1,
    "estimated_workload": 1,
    "remaining_workload": 1,
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value"
  }
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项的 id |
| `url` | string | 是 | 工作项的地址 |
| `short_id` | string | 是 | 工作项的短 id |
| `html_url` | string | 是 | 工作项的 html 地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `identifier` | number | 是 | 工作项的编号 |
| `whole_identifier` | string | 是 | 工作项的完整编号 |
| `title` | string | 是 | 工作项的标题 |
| `type` | object | 是 | 工作项类型的引用结构数据 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `type.group` | string |  |  |
| `start` | object | 是 | 工作项的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object | 是 | 工作项的结束时间 |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |
| `parent_id` | string | 是 | 工作项的父工作项 id |
| `parent` | object | 是 | 父工作项的引用结构数据 |
| `parent.id` | string |  |  |
| `parent.url` | string |  |  |
| `parent.short_id` | string |  |  |
| `parent.html_url` | string |  |  |
| `parent.whole_identifier` | string |  |  |
| `parent.title` | string |  |  |
| `parent.start` | object |  |  |
| `parent.start.date` | number |  |  |
| `parent.start.with_time` | number |  |  |
| `parent.due` | object |  |  |
| `parent.due.date` | number |  |  |
| `parent.due.with_time` | number |  |  |
| `parent.parent_id` | string |  |  |
| `parent.properties` | object |  |  |
| `parent.properties.prop_a` | string |  |  |
| `parent.properties.prop_b` | string |  |  |
| `parent.properties.risk` | null |  |  |
| `parent.properties.business_value` | null |  |  |
| `parent.properties.effort` | null |  |  |
| `parent.properties.backlog_type` | null |  |  |
| `parent.properties.backlog_from` | null |  |  |
| `assignee` | object | 是 | 负责人的引用结构数据 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `state` | object | 是 | 工作项状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `state.color` | string |  |  |
| `priority` | object | 是 | 工作项优先级的引用结构数据 |
| `priority.id` | string |  |  |
| `priority.url` | string |  |  |
| `priority.name` | string |  |  |
| `priority.color` | string |  |  |
| `releases` | object[] | 是 | 所属发布的引用结构数据列表 |
| `releases[].id` | string |  |  |
| `releases[].url` | string |  |  |
| `releases[].name` | string |  |  |
| `releases[].start` | object |  |  |
| `releases[].start.date` | number |  |  |
| `releases[].start.with_time` | number |  |  |
| `releases[].published_at` | object |  |  |
| `releases[].published_at.date` | number |  |  |
| `releases[].published_at.with_time` | number |  |  |
| `releases[].stage` | object |  |  |
| `releases[].stage.id` | string |  |  |
| `releases[].stage.url` | string |  |  |
| `releases[].stage.name` | string |  |  |
| `releases[].stage.type` | string |  |  |
| `releases[].stage.color` | string |  |  |
| `sprint` | object | 是 | 所属迭代的引用结构数据 |
| `sprint.id` | string |  |  |
| `sprint.url` | string |  |  |
| `sprint.name` | string |  |  |
| `sprint.start` | object |  |  |
| `sprint.start.date` | number |  |  |
| `sprint.start.with_time` | number |  |  |
| `sprint.due` | object |  |  |
| `sprint.due.date` | number |  |  |
| `sprint.due.with_time` | number |  |  |
| `sprint.status` | string |  |  |
| `board` | object | 是 | 所属看板的引用结构数据 |
| `board.id` | string |  |  |
| `board.url` | string |  |  |
| `board.name` | string |  |  |
| `board.workitem_type_ids` | string \| string \| string \| string[] |  |  |
| `entry` | object | 是 | 所属看板栏的引用结构数据 |
| `entry.id` | string |  |  |
| `entry.url` | string |  |  |
| `entry.name` | string |  |  |
| `entry_status` | number | 是 | 工作项所在看板栏的分区。`1`：进行中（doing），`2`：已完成（done）。该字段只有项目类型为 `kanban` 和 `hybrid` 时有效，且看板栏开启拆分时有意义；枚举：1 / 2 |
| `entry_position` | number | 是 | 工作项在看板栏中的位置。仅看板/混合项目时有意义 |
| `swimlane` | object | 是 | 所属泳道的引用结构数据 |
| `swimlane.id` | string |  |  |
| `swimlane.url` | string |  |  |
| `swimlane.name` | string |  |  |
| `phase` | object | 是 | 所属计划的引用结构数据 |
| `description` | string | 是 | 工作项的描述 |
| `completed_at` | number | 是 | 工作项的完成时间 |
| `properties` | object | 是 | 工作项的自定义属性，以键值对形式组织。包括用户自定义属性（如 `prop_a`、`prop_b`）以及部分系统内置属性（如 `story_points`、`estimated_workload`、`remaining_workload`、`bug_type`、`solution`、`risk` 等） |
| `properties.story_points` | number |  |  |
| `properties.estimated_workload` | number |  |  |
| `properties.remaining_workload` | number |  |  |
| `properties.prop_a` | string |  |  |
| `properties.prop_b` | string |  |  |
| `properties.severity` | null |  |  |
| `properties.replay_version` | null |  |  |
| `properties.reappear_probability` | null |  |  |
| `properties.bug_type` | null |  |  |
| `properties.reason` | null |  |  |
| `properties.solution` | null |  |  |
| `properties.replay_step` | null |  |  |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `tags` | object[] | 是 | 工作项标签的引用结构数据列表 |
| `participants` | object[] | 是 | 工作项关注人的引用结构数据列表 |
| `participants[].id` | string |  |  |
| `participants[].url` | string |  |  |
| `participants[].type` | string |  |  |
| `participants[].user` | object |  |  |
| `participants[].user.id` | string |  |  |
| `participants[].user.url` | string |  |  |
| `participants[].user.name` | string |  |  |
| `participants[].user.display_name` | string |  |  |
| `participants[].user.avatar` | string |  |  |
| `created_at` | number | 是 | 工作项的创建时间 |
| `created_by` | object | 是 | 创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 工作项的更新时间 |
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
  "id": "5edca524cad2fa1125cb0630",
  "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
  "short_id": "1bAqLmTG",
  "html_url": "https://yctech.pingcode.com/pjm/workitems/1bAqLmTG",
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "template_type": "scrum",
    "is_archived": 0,
    "is_deleted": 0
  },
  "identifier": 5,
  "whole_identifier": "SCR-5",
  "title": "这是一个缺陷",
  "type": {
    "id": "630da48bc9443b1aa94ce3ec",
    "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ec",
    "name": "缺陷",
    "group": "bug"
  },
  "start": {
    "date": 1583290309,
    "with_time": 1
  },
  "due": {
    "date": 1583290347,
    "with_time": 1
  },
  "parent_id": "5edca112b06305c524cad2fa",
  "parent": {
    "id": "5edca112b06305c524cad2fa",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca112b06305c524cad2fa",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "whole_identifier": "SCR-3",
    "title": "这是一个用户故事",
    "start": {
      "date": 1583290309,
      "with_time": 1
    },
    "due": {
      "date": 1583290347,
      "with_time": 1
    },
    "parent_id": "5edca524cad2fa112b06309c",
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value",
      "risk": null,
      "business_value": null,
      "effort": null,
      "backlog_type": null,
      "backlog_from": null
    }
  },
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "releases": [
    {
      "id": "5eb623487ea47001f6a70571",
      "url": "https://{rest_api_root}/v2/pjm/releases/5eb623487ea47001f6a70571",
      "name": "1.0.1",
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
    }
  ],
  "sprint": {
    "id": "5ecf7b74eaab845a2aa53138",
    "url": "https://{rest_api_root}/v2/pjm/sprints/5ecf7b74eaab845a2aa53138",
    "name": "Sprint 1",
    "start": {
      "date": 1589791860,
      "with_time": 0
    },
    "due": {
      "date": 1589791860,
      "with_time": 0
    },
    "status": "completed"
  },
  "state": {
    "id": "5c9b35de90ad7153c2062f18",
    "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
    "name": "新建",
    "type": "pending",
    "color": "#ff7575"
  },
  "priority": {
    "id": "5eb623f6a70571487ea47111",
    "url": "https://{rest_api_root}/v2/pjm/workitem_priorities/5eb623f6a70571487ea47111",
    "name": "最高",
    "color": "#FF7575"
  },
  "board": {
    "id": "5eb623f6a70571487ea47222",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222",
    "name": "kanban",
    "workitem_type_ids": [
      "5eb623f6a70571487ea47101",
      "5eb623f6a70571487ea47102",
      "5eb623f6a70571487ea47103",
      "5eb623f6a70571487ea47104"
    ]
  },
  "entry": {
    "id": "5ee1c4fac5b3c51206f0a861",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222/entries/5ee1c4fac5b3c51206f0a861",
    "name": "需求池"
  },
  "entry_status": 1,
  "entry_position": 1,
  "swimlane": {
    "id": "5ee1c4fac5b3c51206f0a866",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222/swimlanes/5ee1c4fac5b3c51206f0a866",
    "name": "默认泳道"
  },
  "phase": null,
  "description": "这是一个缺陷的描述",
  "completed_at": 1583290347,
  "properties": {
    "story_points": 1,
    "estimated_workload": 1,
    "remaining_workload": 1,
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value",
    "severity": null,
    "replay_version": null,
    "reappear_probability": null,
    "bug_type": null,
    "reason": null,
    "solution": null,
    "replay_step": null
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
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
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

<a id="get-v2-pjm-workitems-workitem-id"></a>

### 获取一个工作项

`GET /v2/pjm/workitems/{workitem_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:workitem`

用于按 id、short_id 或 whole_identifier 获取工作项全量信息。  
 默认不含已删除/已归档项。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_id` | string | 是 | 工作项的 id、short_id 或 whole_identifier |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_public_image_token` | string |  | 包含获取图片资源 token 的属性。使用','分割，最多 32 个，支持 `description` 和自定义多行文本类型的属性。参数示例 `description,properties.prop_b` |
| `include_deleted` | boolean |  | 是否包含已删除的工作项。该值默认为 `false` |
| `include_archived` | boolean |  | 是否包含已归档的工作项。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项的 id |
| `url` | string | 是 | 工作项的地址 |
| `short_id` | string | 是 | 工作项的短 id |
| `html_url` | string | 是 | 工作项的 html 地址 |
| `project` | object | 是 | 工作项所属的项目 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `identifier` | number | 是 | 工作项的编号 |
| `whole_identifier` | string | 是 | 工作项的完整编号 |
| `title` | string | 是 | 工作项的标题 |
| `type` | object | 是 | 工作项类型的引用结构数据 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `type.group` | string |  |  |
| `start` | object | 是 | 工作项的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object | 是 | 工作项的结束时间 |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |
| `parent_id` | string | 是 | 工作项的父工作项 id |
| `parent` | object | 是 | 工作项的父工作项 |
| `parent.id` | string |  |  |
| `parent.url` | string |  |  |
| `parent.short_id` | string |  |  |
| `parent.html_url` | string |  |  |
| `parent.whole_identifier` | string |  |  |
| `parent.title` | string |  |  |
| `parent.start` | object |  |  |
| `parent.start.date` | number |  |  |
| `parent.start.with_time` | number |  |  |
| `parent.due` | object |  |  |
| `parent.due.date` | number |  |  |
| `parent.due.with_time` | number |  |  |
| `parent.parent_id` | null |  |  |
| `parent.properties` | object |  |  |
| `parent.properties.prop_a` | string |  |  |
| `parent.properties.prop_b` | string |  |  |
| `parent.properties.risk` | null |  |  |
| `parent.properties.business_value` | null |  |  |
| `parent.properties.effort` | null |  |  |
| `parent.properties.backlog_type` | null |  |  |
| `parent.properties.backlog_from` | null |  |  |
| `assignee` | object | 是 | 工作项的负责人 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `state` | object | 是 | 工作项的状态 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `state.color` | string |  |  |
| `priority` | object | 是 | 工作项的优先级 |
| `priority.id` | string |  |  |
| `priority.url` | string |  |  |
| `priority.name` | string |  |  |
| `priority.color` | string |  |  |
| `releases` | object[] | 是 | 工作项所属的发布列表 |
| `releases[].id` | string |  |  |
| `releases[].url` | string |  |  |
| `releases[].name` | string |  |  |
| `releases[].start` | object |  |  |
| `releases[].start.date` | number |  |  |
| `releases[].start.with_time` | number |  |  |
| `releases[].published_at` | object |  |  |
| `releases[].published_at.date` | number |  |  |
| `releases[].published_at.with_time` | number |  |  |
| `releases[].stage` | object |  |  |
| `releases[].stage.id` | string |  |  |
| `releases[].stage.url` | string |  |  |
| `releases[].stage.name` | string |  |  |
| `releases[].stage.type` | string |  |  |
| `releases[].stage.color` | string |  |  |
| `sprint` | object | 是 | 工作项所属的迭代 |
| `sprint.id` | string |  |  |
| `sprint.url` | string |  |  |
| `sprint.name` | string |  |  |
| `sprint.start` | object |  |  |
| `sprint.start.date` | number |  |  |
| `sprint.start.with_time` | number |  |  |
| `sprint.due` | object |  |  |
| `sprint.due.date` | number |  |  |
| `sprint.due.with_time` | number |  |  |
| `sprint.status` | string |  |  |
| `board` | object | 是 | 工作项所属的看板 |
| `board.id` | string |  |  |
| `board.url` | string |  |  |
| `board.name` | string |  |  |
| `board.workitem_type_ids` | string \| string \| string \| string[] |  |  |
| `entry` | object | 是 | 工作项所属的看板栏 |
| `entry.id` | string |  |  |
| `entry.url` | string |  |  |
| `entry.name` | string |  |  |
| `entry_status` | number | 是 | 工作项所在看板栏的分区。`1`：进行中（doing），`2`：已完成（done）。该字段只有项目类型为 `kanban` 和 `hybrid` 时有效，且看板栏开启拆分时有意义；枚举：1 / 2 |
| `entry_position` | number | 是 | 工作项在看板栏中的位置。仅看板/混合项目时有意义 |
| `swimlane` | object | 是 | 工作项的所属的泳道 |
| `swimlane.id` | string |  |  |
| `swimlane.url` | string |  |  |
| `swimlane.name` | string |  |  |
| `phase` | object | 是 | 工作项的所属计划 |
| `phase.id` | string |  |  |
| `phase.url` | string |  |  |
| `phase.short_id` | string |  |  |
| `phase.html_url` | string |  |  |
| `phase.whole_identifier` | string |  |  |
| `phase.title` | string |  |  |
| `phase.start` | null |  |  |
| `phase.due` | null |  |  |
| `phase.parent_id` | null |  |  |
| `phase.properties` | null |  |  |
| `description` | string | 是 | 工作项的描述 |
| `completed_at` | number | 是 | 工作项的完成时间 |
| `properties` | object | 是 | 工作项的自定义属性，以键值对形式组织。包括用户自定义属性（如 `prop_a`、`prop_b`）以及部分系统内置属性（如 `story_points`、`estimated_workload`、`remaining_workload`、`bug_type`、`solution`、`risk` 等） |
| `properties.story_points` | number |  |  |
| `properties.estimated_workload` | number |  |  |
| `properties.remaining_workload` | number |  |  |
| `properties.prop_a` | string |  |  |
| `properties.prop_b` | string |  |  |
| `properties.risk` | null |  |  |
| `properties.backlog_type` | null |  |  |
| `properties.backlog_from` | null |  |  |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `tags` | object[] | 是 | 工作项的标签列表 |
| `tags[].id` | string |  |  |
| `tags[].url` | string |  |  |
| `tags[].name` | string |  |  |
| `participants` | object[] | 是 | 工作项的关注人列表 |
| `participants[].id` | string |  |  |
| `participants[].url` | string |  |  |
| `participants[].type` | string |  |  |
| `participants[].user` | object |  |  |
| `participants[].user.id` | string |  |  |
| `participants[].user.url` | string |  |  |
| `participants[].user.name` | string |  |  |
| `participants[].user.display_name` | string |  |  |
| `participants[].user.avatar` | string |  |  |
| `public_image_token` | string | 是 | 工作项描述和自定义多行文本类型属性里获取图片资源 token。获取一个工作项和获取工作项列表参数 `include_public_image_token` 值有效时返回 |
| `created_at` | number | 是 | 工作项的创建时间 |
| `created_by` | object | 是 | 工作项的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 工作项的更新时间 |
| `updated_by` | object | 是 | 工作项的更新人 |
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
  "id": "6efca131b06329c524cdd2fb",
  "url": "https://{rest_api_root}/v2/pjm/workitems/6efca131b06329c524cdd2fb",
  "short_id": "eqWqLmTO",
  "html_url": "https://yctech.pingcode.com/pjm/workitems/eqWqLmTO",
  "project": {
    "id": "5eb623f6a70571487ea47004",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47004",
    "identifier": "HBR",
    "name": "Hybrid 项目",
    "template_type": "hybrid",
    "is_archived": 0,
    "is_deleted": 0
  },
  "identifier": 1,
  "whole_identifier": "HBR-1",
  "title": "这是一个用户故事",
  "type": {
    "id": "630da48bc9443b1aa94ce3ea",
    "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
    "name": "用户故事",
    "group": "requirement"
  },
  "start": {
    "date": 1583290309,
    "with_time": 1
  },
  "due": {
    "date": 1583290347,
    "with_time": 1
  },
  "parent_id": "5edfa3b67463c1ee626c0980",
  "parent": {
    "id": "5edfa3b67463c1ee626c0980",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edfa3b67463c1ee626c0980",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "whole_identifier": "HBR-2",
    "title": "这是一个特性",
    "start": {
      "date": 1583290309,
      "with_time": 1
    },
    "due": {
      "date": 1583290347,
      "with_time": 1
    },
    "parent_id": null,
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value",
      "risk": null,
      "business_value": null,
      "effort": null,
      "backlog_type": null,
      "backlog_from": null
    }
  },
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "releases": [
    {
      "id": "5eb623487ea47001f6a70571",
      "url": "https://{rest_api_root}/v2/pjm/releases/5eb623487ea47001f6a70582",
      "name": "1.0.1",
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
    }
  ],
  "sprint": {
    "id": "5ecf7b74eaab845a2aa53139",
    "url": "https://{rest_api_root}/v2/pjm/sprints/5ecf7b74eaab845a2aa53139",
    "name": "Sprint 1",
    "start": {
      "date": 1589791860,
      "with_time": 0
    },
    "due": {
      "date": 1589791860,
      "with_time": 0
    },
    "status": "completed"
  },
  "state": {
    "id": "5c9b35de90ad7153c2062f18",
    "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
    "name": "新建",
    "type": "pending",
    "color": "#ff7575"
  },
  "priority": {
    "id": "5eb623f6a70571487ea47111",
    "url": "https://{rest_api_root}/v2/pjm/workitem_priorities/5eb623f6a70571487ea47111",
    "name": "最高",
    "color": "#FF7575"
  },
  "board": {
    "id": "5eb623f6a70571487ea47333",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47333",
    "name": "kanban",
    "workitem_type_ids": [
      "5eb623f6a70571487ea47101",
      "5eb623f6a70571487ea47102",
      "5eb623f6a70571487ea47103",
      "5eb623f6a70571487ea47104"
    ]
  },
  "entry": {
    "id": "5ee1c4fac5b3c51206f0a862",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47333/entries/5ee1c4fac5b3c51206f0a862",
    "name": "需求池"
  },
  "entry_status": 1,
  "entry_position": 1,
  "swimlane": {
    "id": "5ee1c4fac5b3c51206f0a867",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47333/swimlanes/5ee1c4fac5b3c51206f0a867",
    "name": "默认泳道"
  },
  "phase": {
    "id": "63761fee31caaf77189816b5",
    "url": "https://{rest_api_root}/v2/pjm/workitems/63761fee31caaf77189816b5",
    "short_id": "pHase001",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/pHase001",
    "whole_identifier": "WTF-1",
    "title": "这是一个阶段",
    "start": null,
    "due": null,
    "parent_id": null,
    "properties": null
  },
  "description": "<p>这是一个用户故事的描述<p><img src=\"https://atlas.pingcode.com/files/public/689a9d124df436ef91923a3a\" originUrl=\"https://atlas.pingcode.com/files/public/689a9d124df436ef91923a3a\" alt=\"图片.png\" size=\"35460\" style=\"text-align: center;\" />",
  "completed_at": 1583290347,
  "properties": {
    "story_points": 1,
    "estimated_workload": 1,
    "remaining_workload": 1,
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value",
    "risk": null,
    "backlog_type": null,
    "backlog_from": null
  },
  "tags": [
    {
      "id": "5e6b35de50ef8153c2062f70",
      "url": "https://{rest_api_root}/v2/pjm/tags/5e6b35de50ef8153c2062f70",
      "name": "标签-1"
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
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=workitem&principal_id=5edca112b06305c524cad2fa",
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
  "public_image_token": "-fkvANQ2dcVECK6Xg45L3kG8VCbOTK8NrNckGkxljRY",
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

<a id="patch-v2-pjm-workitems-workitem-id"></a>

### 部分更新一个工作项

`PATCH /v2/pjm/workitems/{workitem_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:workitem`

用于部分更新一个工作项。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_id` | string | 是 | 工作项的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title` | string |  | 工作项的标题 |
| `description` | string |  | 工作项的描述 |
| `start` | object |  | 工作项的开始时间。当工作项类型为里程碑时，该参数无效 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object |  | 工作项的截止时间 |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |
| `priority_id` | string |  | 工作项优先级的 id |
| `state_id` | string |  | 工作项状态的 id。工作项状态的 id 在设置时必须同时满足工作项类型的工作项状态方案和工作项状态流转的状态值才能成功完成设置 |
| `assignee_id` | string |  | 工作项负责人的 id |
| `parent_id` | string |  | 工作项的父工作项的 id |
| `release_ids` | string[] |  | 所属发布的 id 列表 |
| `sprint_id` | string |  | 所属迭代的 id。该字段只有项目类型为 `scrum` 和 `hybrid` 时有效 |
| `board_id` | string |  | 看板的 id。该字段只有项目类型为 `kanban` 和 `hybrid` 时有效 |
| `entry_id` | string |  | 看板栏的 id。该字段只有项目类型为 `kanban` 和 `hybrid` 时有效 |
| `entry_status` | number |  | 工作项所在看板栏的分区。`1`：进行中（doing），`2`：已完成（done）。该字段只有项目类型为 `kanban` 和 `hybrid` 时有效，且看板栏开启拆分时有意义；枚举：1 / 2 |
| `swimlane_id` | string |  | 泳道的 id。该字段只有项目类型为 `kanban` 和 `hybrid` 时有效 |
| `phase_id` | string |  | 所属计划的 id。该字段只有项目类型为 `waterfall` 和 `hybrid` 时有效 |
| `properties` | object |  | 工作项属性的键值对集合 |
| `properties.story_points` | number |  |  |
| `properties.estimated_workload` | number |  |  |
| `properties.remaining_workload` | number |  |  |

**请求示例**

```json
{
  "title": "这是一个用户故事",
  "description": "这是一个用户故事的描述",
  "start": {
    "date": 1583290309,
    "with_time": 1
  },
  "due": {
    "date": 1583290347,
    "with_time": 0
  },
  "sprint_id": "5ecf7b74eaab845a2aa53138",
  "release_ids": [
    "5eb623487ea47001f6a70571"
  ],
  "board_id": "5eb623f6a70571487ea47222",
  "entry_id": "5ee1c4fac5b3c51206f0a861",
  "entry_status": 2,
  "swimlane_id": "5ee1c4fac5b3c51206f0a866",
  "priority_id": "5eb623f6a70571487ea47111",
  "assignee_id": "a0417f68e846aae315c85d24643678a9",
  "state_id": "5c9b35de90ad7153c2062f18",
  "parent_id": "5edfa3b67463c1ee626c0979",
  "properties": {
    "story_points": 1,
    "estimated_workload": 1,
    "remaining_workload": 1
  }
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项的 id |
| `url` | string | 是 | 工作项的地址 |
| `short_id` | string | 是 | 工作项的短 id |
| `html_url` | string | 是 | 工作项的网页地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `identifier` | number | 是 | 工作项的编号 |
| `whole_identifier` | string | 是 | 工作项的完整编号 |
| `title` | string | 是 | 工作项的标题 |
| `type` | object | 是 | 工作项类型的引用结构数据 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `type.group` | string |  |  |
| `start` | object | 是 | 工作项的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object | 是 | 工作项的结束时间 |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |
| `parent_id` | string | 是 | 工作项的父工作项 id |
| `parent` | object | 是 | 父工作项的引用结构数据 |
| `parent.id` | string |  |  |
| `parent.url` | string |  |  |
| `parent.short_id` | string |  |  |
| `parent.html_url` | string |  |  |
| `parent.whole_identifier` | string |  |  |
| `parent.title` | string |  |  |
| `parent.start` | object |  |  |
| `parent.start.date` | number |  |  |
| `parent.start.with_time` | number |  |  |
| `parent.due` | object |  |  |
| `parent.due.date` | number |  |  |
| `parent.due.with_time` | number |  |  |
| `parent.parent_id` | null |  |  |
| `parent.properties` | object |  |  |
| `parent.properties.prop_a` | string |  |  |
| `parent.properties.prop_b` | string |  |  |
| `parent.properties.risk` | null |  |  |
| `parent.properties.business_value` | null |  |  |
| `parent.properties.effort` | null |  |  |
| `parent.properties.backlog_type` | null |  |  |
| `parent.properties.backlog_from` | null |  |  |
| `assignee` | object | 是 | 负责人的引用结构数据 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `state` | object | 是 | 工作项状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `state.color` | string |  |  |
| `priority` | object | 是 | 工作项优先级的引用结构数据 |
| `priority.id` | string |  |  |
| `priority.url` | string |  |  |
| `priority.name` | string |  |  |
| `priority.color` | string |  |  |
| `releases` | object[] | 是 | 所属发布的引用结构数据列表 |
| `releases[].id` | string |  |  |
| `releases[].url` | string |  |  |
| `releases[].name` | string |  |  |
| `releases[].start` | object |  |  |
| `releases[].start.date` | number |  |  |
| `releases[].start.with_time` | number |  |  |
| `releases[].published_at` | object |  |  |
| `releases[].published_at.date` | number |  |  |
| `releases[].published_at.with_time` | number |  |  |
| `releases[].stage` | object |  |  |
| `releases[].stage.id` | string |  |  |
| `releases[].stage.url` | string |  |  |
| `releases[].stage.name` | string |  |  |
| `releases[].stage.type` | string |  |  |
| `releases[].stage.color` | string |  |  |
| `sprint` | object | 是 | 所属迭代的引用结构数据 |
| `sprint.id` | string |  |  |
| `sprint.url` | string |  |  |
| `sprint.name` | string |  |  |
| `sprint.start` | object |  |  |
| `sprint.start.date` | number |  |  |
| `sprint.start.with_time` | number |  |  |
| `sprint.due` | object |  |  |
| `sprint.due.date` | number |  |  |
| `sprint.due.with_time` | number |  |  |
| `sprint.status` | string |  |  |
| `board` | object | 是 | 所属看板的引用结构数据 |
| `board.id` | string |  |  |
| `board.url` | string |  |  |
| `board.name` | string |  |  |
| `board.workitem_type_ids` | string \| string \| string \| string[] |  |  |
| `entry` | object | 是 | 所属看板栏的引用结构数据 |
| `entry.id` | string |  |  |
| `entry.url` | string |  |  |
| `entry.name` | string |  |  |
| `entry_status` | number | 是 | 工作项所在看板栏的分区。`1`：进行中（doing），`2`：已完成（done）。该字段只有项目类型为 `kanban` 和 `hybrid` 时有效，且看板栏开启拆分时有意义；枚举：1 / 2 |
| `entry_position` | number | 是 | 工作项在看板栏中的位置。仅看板/混合项目时有意义 |
| `swimlane` | object | 是 | 所属泳道的引用结构数据 |
| `swimlane.id` | string |  |  |
| `swimlane.url` | string |  |  |
| `swimlane.name` | string |  |  |
| `phase` | object | 是 | 所属计划的引用结构数据 |
| `description` | string | 是 | 工作项的描述 |
| `completed_at` | number | 是 | 工作项的完成时间 |
| `properties` | object | 是 | 工作项的自定义属性，以键值对形式组织。包括用户自定义属性（如 `prop_a`、`prop_b`）以及部分系统内置属性（如 `story_points`、`estimated_workload`、`remaining_workload`、`bug_type`、`solution`、`risk` 等） |
| `properties.story_points` | number |  |  |
| `properties.estimated_workload` | number |  |  |
| `properties.remaining_workload` | number |  |  |
| `properties.prop_a` | string |  |  |
| `properties.prop_b` | string |  |  |
| `properties.risk` | null |  |  |
| `properties.backlog_type` | null |  |  |
| `properties.backlog_from` | null |  |  |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `tags` | object[] | 是 | 工作项标签的引用结构数据列表 |
| `tags[].id` | string |  |  |
| `tags[].url` | string |  |  |
| `tags[].name` | string |  |  |
| `participants` | object[] | 是 | 工作项关注人的引用结构数据列表 |
| `participants[].id` | string |  |  |
| `participants[].url` | string |  |  |
| `participants[].type` | string |  |  |
| `participants[].user` | object |  |  |
| `participants[].user.id` | string |  |  |
| `participants[].user.url` | string |  |  |
| `participants[].user.name` | string |  |  |
| `participants[].user.display_name` | string |  |  |
| `participants[].user.avatar` | string |  |  |
| `created_at` | number | 是 | 工作项的创建时间 |
| `created_by` | object | 是 | 创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 工作项的更新时间 |
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
  "id": "5edca524cad2fa1125cb0630",
  "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
  "short_id": "1bAqLmTG",
  "html_url": "https://yctech.pingcode.com/pjm/workitems/1bAqLmTG",
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "template_type": "scrum",
    "is_archived": 0,
    "is_deleted": 0
  },
  "identifier": 5,
  "whole_identifier": "SCR-5",
  "title": "这是一个用户故事",
  "type": {
    "id": "630da48bc9443b1aa94ce3ea",
    "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
    "name": "用户故事",
    "group": "requirement"
  },
  "start": {
    "date": 1583290309,
    "with_time": 1
  },
  "due": {
    "date": 1583290347,
    "with_time": 0
  },
  "parent_id": "5edca112b06305c524cad2fa",
  "parent": {
    "id": "5edca112b06305c524cad2fa",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca112b06305c524cad2fa",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "whole_identifier": "SCR-3",
    "title": "这是一个特性",
    "start": {
      "date": 1583290309,
      "with_time": 1
    },
    "due": {
      "date": 1583290347,
      "with_time": 1
    },
    "parent_id": null,
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value",
      "risk": null,
      "business_value": null,
      "effort": null,
      "backlog_type": null,
      "backlog_from": null
    }
  },
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "releases": [
    {
      "id": "5eb623487ea47001f6a70571",
      "url": "https://{rest_api_root}/v2/pjm/releases/5eb623487ea47001f6a70571",
      "name": "1.0.1",
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
    }
  ],
  "sprint": {
    "id": "5ecf7b74eaab845a2aa53138",
    "url": "https://{rest_api_root}/v2/pjm/sprints/5ecf7b74eaab845a2aa53138",
    "name": "Sprint 1",
    "start": {
      "date": 1589791860,
      "with_time": 0
    },
    "due": {
      "date": 1589791860,
      "with_time": 0
    },
    "status": "completed"
  },
  "state": {
    "id": "5c9b35de90ad7153c2062f18",
    "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
    "name": "新建",
    "type": "pending",
    "color": "#ff7575"
  },
  "priority": {
    "id": "5eb623f6a70571487ea47111",
    "url": "https://{rest_api_root}/v2/pjm/workitem_priorities/5eb623f6a70571487ea47111",
    "name": "最高",
    "color": "#FF7575"
  },
  "board": {
    "id": "5eb623f6a70571487ea47222",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222",
    "name": "kanban",
    "workitem_type_ids": [
      "5eb623f6a70571487ea47101",
      "5eb623f6a70571487ea47102",
      "5eb623f6a70571487ea47103",
      "5eb623f6a70571487ea47104"
    ]
  },
  "entry": {
    "id": "5ee1c4fac5b3c51206f0a861",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222/entries/5ee1c4fac5b3c51206f0a861",
    "name": "需求池"
  },
  "entry_status": 2,
  "entry_position": 1,
  "swimlane": {
    "id": "5ee1c4fac5b3c51206f0a866",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222/swimlanes/5ee1c4fac5b3c51206f0a866",
    "name": "默认泳道"
  },
  "phase": null,
  "description": "这是一个用户故事的描述",
  "completed_at": null,
  "properties": {
    "story_points": 1,
    "estimated_workload": 1,
    "remaining_workload": 1,
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value",
    "risk": null,
    "backlog_type": null,
    "backlog_from": null
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
      "id": "5e6b35de50ef8153c2062f70",
      "url": "https://{rest_api_root}/v2/pjm/tags/5e6b35de50ef8153c2062f70",
      "name": "标签-1"
    }
  ],
  "participants": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
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

<a id="post-v2-pjm-workitems-bulk-set"></a>

### 批量设置工作项属性

`POST /v2/pjm/workitems/bulk/set` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:workitem`

用于批量为多个工作项设置相同的属性值。单次最多支持 100 条。  
接口支持部分成功，单条失败不会影响其他条目，已成功的数据不会回滚。  
响应按请求条目顺序返回对应结果，通过 `state`（`success` / `failure`）判断操作结果，失败时通过 `message` 返回失败原因。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ids` | string[] | 是 | 工作项 id 列表。数组长度不超过 100 |
| `property_name` | string | 是 | 要设置的属性名。支持内置字段（如 `title`、`state_id`）或自定义属性（如 `properties.prop_a`） |
| `property_value` | string \| number \| string[] \| object[] |  | 要写入的属性值，取值规则与「部分更新一个工作项」中同名参数一致 |

**请求示例**

```json
{
  "ids": [
    "547000eb6a70571487623fea"
  ],
  "property_name": "title",
  "property_value": "这是一个工作项"
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
  }
]
```

<a id="get-v2-pjm-workitems"></a>

### 获取工作项列表

`GET /v2/pjm/workitems` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:workitem`

用于分页获取工作项列表。  
 默认不含已删除/已归档项。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `identifier` | number |  | 工作项的编号 |
| `keywords` | string |  | 关键字，匹配编号或标题 |
| `project_id` | string |  | 项目的 id |
| `type_id` | string |  | 工作项类型的 id |
| `parent_id` | string |  | 父工作项的 id |
| `assignee_id` | string |  | 负责人的 id |
| `state_id` | string |  | 状态的 id |
| `priority_id` | string |  | 优先级的 id |
| `bug_type_id` | string |  | 缺陷类型的 id |
| `tag_id` | string |  | 标签的 id |
| `sprint_id` | string |  | 迭代的 id |
| `board_id` | string |  | 看板的 id |
| `entry_id` | string |  | 看板栏的 id |
| `swimlane_id` | string |  | 泳道的 id |
| `phase_id` | string |  | 计划的 id |
| `release_id` | string |  | 发布的 id |
| `created_by` | string |  | 创建人的 id |
| `participant_id` | string |  | 关注人的 id |
| `created_between` | string |  | 创建时间范围，使用 `,` 分割起止时间戳 |
| `updated_between` | string |  | 更新时间范围，使用 `,` 分割起止时间戳 |
| `include_public_image_token` | string |  | 包含获取图片资源 token 的属性 |
| `include_deleted` | boolean |  | 是否包含已删除的工作项 |
| `include_archived` | boolean |  | 是否包含已归档的工作项 |
| `page_size` | number |  | 每页条数 |
| `page_index` | number |  | 页码，从 0 开始 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].short_id` | string |  |  |
| `values[].html_url` | string |  |  |
| `values[].project` | object |  |  |
| `values[].project.id` | string |  |  |
| `values[].project.url` | string |  |  |
| `values[].project.identifier` | string |  |  |
| `values[].project.name` | string |  |  |
| `values[].project.template_type` | string |  |  |
| `values[].project.is_archived` | number |  |  |
| `values[].project.is_deleted` | number |  |  |
| `values[].identifier` | number |  |  |
| `values[].whole_identifier` | string |  |  |
| `values[].title` | string |  |  |
| `values[].type` | object |  |  |
| `values[].type.id` | string |  |  |
| `values[].type.url` | string |  |  |
| `values[].type.name` | string |  |  |
| `values[].type.group` | string |  |  |
| `values[].start` | object |  |  |
| `values[].start.date` | number |  |  |
| `values[].start.with_time` | number |  |  |
| `values[].due` | object |  |  |
| `values[].due.date` | number |  |  |
| `values[].due.with_time` | number |  |  |
| `values[].parent_id` | string |  |  |
| `values[].parent` | object |  |  |
| `values[].parent.id` | string |  |  |
| `values[].parent.url` | string |  |  |
| `values[].parent.short_id` | string |  |  |
| `values[].parent.html_url` | string |  |  |
| `values[].parent.whole_identifier` | string |  |  |
| `values[].parent.title` | string |  |  |
| `values[].parent.start` | object |  |  |
| `values[].parent.start.date` | number |  |  |
| `values[].parent.start.with_time` | number |  |  |
| `values[].parent.due` | object |  |  |
| `values[].parent.due.date` | number |  |  |
| `values[].parent.due.with_time` | number |  |  |
| `values[].parent.parent_id` | null |  |  |
| `values[].parent.properties` | object |  |  |
| `values[].parent.properties.prop_a` | string |  |  |
| `values[].parent.properties.prop_b` | string |  |  |
| `values[].parent.properties.risk` | null |  |  |
| `values[].parent.properties.business_value` | null |  |  |
| `values[].parent.properties.effort` | null |  |  |
| `values[].parent.properties.backlog_type` | null |  |  |
| `values[].parent.properties.backlog_from` | null |  |  |
| `values[].assignee` | object |  |  |
| `values[].assignee.id` | string |  |  |
| `values[].assignee.url` | string |  |  |
| `values[].assignee.name` | string |  |  |
| `values[].assignee.display_name` | string |  |  |
| `values[].assignee.avatar` | string |  |  |
| `values[].releases` | object[] |  |  |
| `values[].releases[].id` | string |  |  |
| `values[].releases[].url` | string |  |  |
| `values[].releases[].name` | string |  |  |
| `values[].releases[].start` | object |  |  |
| `values[].releases[].start.date` | number |  |  |
| `values[].releases[].start.with_time` | number |  |  |
| `values[].releases[].published_at` | object |  |  |
| `values[].releases[].published_at.date` | number |  |  |
| `values[].releases[].published_at.with_time` | number |  |  |
| `values[].releases[].stage` | object |  |  |
| `values[].releases[].stage.id` | string |  |  |
| `values[].releases[].stage.url` | string |  |  |
| `values[].releases[].stage.name` | string |  |  |
| `values[].releases[].stage.type` | string |  |  |
| `values[].releases[].stage.color` | string |  |  |
| `values[].sprint` | object |  |  |
| `values[].sprint.id` | string |  |  |
| `values[].sprint.url` | string |  |  |
| `values[].sprint.name` | string |  |  |
| `values[].sprint.start` | object |  |  |
| `values[].sprint.start.date` | number |  |  |
| `values[].sprint.start.with_time` | number |  |  |
| `values[].sprint.due` | object |  |  |
| `values[].sprint.due.date` | number |  |  |
| `values[].sprint.due.with_time` | number |  |  |
| `values[].sprint.status` | string |  |  |
| `values[].state` | object |  |  |
| `values[].state.id` | string |  |  |
| `values[].state.url` | string |  |  |
| `values[].state.name` | string |  |  |
| `values[].state.type` | string |  |  |
| `values[].state.color` | string |  |  |
| `values[].priority` | object |  |  |
| `values[].priority.id` | string |  |  |
| `values[].priority.url` | string |  |  |
| `values[].priority.name` | string |  |  |
| `values[].priority.color` | string |  |  |
| `values[].board` | object |  |  |
| `values[].board.id` | string |  |  |
| `values[].board.url` | string |  |  |
| `values[].board.name` | string |  |  |
| `values[].board.workitem_type_ids` | string \| string \| string \| string[] |  |  |
| `values[].entry` | object |  |  |
| `values[].entry.id` | string |  |  |
| `values[].entry.url` | string |  |  |
| `values[].entry.name` | string |  |  |
| `values[].entry_status` | number |  |  |
| `values[].entry_position` | number |  |  |
| `values[].swimlane` | object |  |  |
| `values[].swimlane.id` | string |  |  |
| `values[].swimlane.url` | string |  |  |
| `values[].swimlane.name` | string |  |  |
| `values[].phase` | null |  |  |
| `values[].description` | string |  |  |
| `values[].completed_at` | null |  |  |
| `values[].properties` | object |  |  |
| `values[].properties.story_points` | number |  |  |
| `values[].properties.estimated_workload` | number |  |  |
| `values[].properties.remaining_workload` | number |  |  |
| `values[].properties.prop_a` | string |  |  |
| `values[].properties.prop_b` | string |  |  |
| `values[].properties.risk` | null |  |  |
| `values[].properties.backlog_type` | null |  |  |
| `values[].properties.backlog_from` | null |  |  |
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
| `values[].public_image_token` | string |  |  |
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
      "id": "5edca524cad2fa1125cb0630",
      "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
      "short_id": "1bAqLmTG",
      "html_url": "https://yctech.pingcode.com/pjm/workitems/1bAqLmTG",
      "project": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
        "identifier": "SCR",
        "name": "Scrum 项目",
        "template_type": "scrum",
        "is_archived": 0,
        "is_deleted": 0
      },
      "identifier": 5,
      "whole_identifier": "SCR-5",
      "title": "这是一个用户故事",
      "type": {
        "id": "630da48bc9443b1aa94ce3ea",
        "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
        "name": "用户故事",
        "group": "requirement"
      },
      "start": {
        "date": 1583290309,
        "with_time": 1
      },
      "due": {
        "date": 1583290347,
        "with_time": 0
      },
      "parent_id": "5edca112b06305c524cad2fa",
      "parent": {
        "id": "5edca112b06305c524cad2fa",
        "url": "https://{rest_api_root}/v2/pjm/workitems/5edca112b06305c524cad2fa",
        "short_id": "c9WqLmTO",
        "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
        "whole_identifier": "SCR-3",
        "title": "这是一个特性",
        "start": {
          "date": 1583290309,
          "with_time": 1
        },
        "due": {
          "date": 1583290347,
          "with_time": 1
        },
        "parent_id": null,
        "properties": {
          "prop_a": "prop_a_value",
          "prop_b": "prop_b_value",
          "risk": null,
          "business_value": null,
          "effort": null,
          "backlog_type": null,
          "backlog_from": null
        }
      },
      "assignee": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "releases": [
        {
          "id": "5eb623487ea47001f6a70571",
          "url": "https://{rest_api_root}/v2/pjm/releases/5eb623487ea47001f6a70571",
          "name": "1.0.1",
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
        }
      ],
      "sprint": {
        "id": "5ecf7b74eaab845a2aa53138",
        "url": "https://{rest_api_root}/v2/pjm/sprints/5ecf7b74eaab845a2aa53138",
        "name": "Sprint 1",
        "start": {
          "date": 1589791860,
          "with_time": 0
        },
        "due": {
          "date": 1589791860,
          "with_time": 0
        },
        "status": "completed"
      },
      "state": {
        "id": "5c9b35de90ad7153c2062f18",
        "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
        "name": "新建",
        "type": "pending",
        "color": "#ff7575"
      },
      "priority": {
        "id": "5eb623f6a70571487ea47111",
        "url": "https://{rest_api_root}/v2/pjm/workitem_priorities/5eb623f6a70571487ea47111",
        "name": "最高",
        "color": "#FF7575"
      },
      "board": {
        "id": "5eb623f6a70571487ea47222",
        "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222",
        "name": "kanban",
        "workitem_type_ids": [
          "5eb623f6a70571487ea47101",
          "5eb623f6a70571487ea47102",
          "5eb623f6a70571487ea47103",
          "5eb623f6a70571487ea47104"
        ]
      },
      "entry": {
        "id": "5ee1c4fac5b3c51206f0a861",
        "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222/entries/5ee1c4fac5b3c51206f0a861",
        "name": "需求池"
      },
      "entry_status": 1,
      "entry_position": 1,
      "swimlane": {
        "id": "5ee1c4fac5b3c51206f0a866",
        "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222/swimlanes/5ee1c4fac5b3c51206f0a866",
        "name": "默认泳道"
      },
      "phase": null,
      "description": "这是一个用户故事的描述",
      "completed_at": null,
      "properties": {
        "story_points": 1,
        "estimated_workload": 1,
        "remaining_workload": 1,
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value",
        "risk": null,
        "backlog_type": null,
        "backlog_from": null
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
          "id": "5e6b35de50ef8153c2062f70",
          "url": "https://{rest_api_root}/v2/pjm/tags/5e6b35de50ef8153c2062f70",
          "name": "标签-1"
        }
      ],
      "participants": [
        {
          "id": "a0417f68e846aae315c85d24643678a9",
          "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
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
      "public_image_token": "-fkvANQ2dcVECK6Xg45L3kG8VCbOTK8NrNckGkxljRY",
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

<a id="post-v2-pjm-workitems-search"></a>

### 搜索工作项列表

`POST /v2/pjm/workitems/search` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:workitem`

用于按类 MongoDB 结构化条件搜索工作项。  
 默认不含已删除/已归档项。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `mode` | string | 是 | 搜索模式。`query` 表示基于 `payload.filter` 的结构化条件查询；枚举："query" |
| `payload` | object | 是 | 搜索参数 |
| `payload.filter` | object |  | 过滤条件。 过滤时使用类 MongoDB 的查询语法，可通过属性名、操作符和对应值进行过滤。 引用类型（含数组引用类型）使用 `{属性名}.id` 作为属性名，例如 `project.id`、`type.id`、`releases.id`、`tags.id`、`participants.id`。 自定义属性使用 `properties.{属性 key}` 作为属性名，例如 `properties.prop_a`。 文本类型（如 `title`、`description`，以及自定义单行文本、多行文本、链接类型）的操作符： `exists`、`contains`。 数字类型（如 `story_points`、`identifier`，以及自定义数字、进度、评分类型）的操作符： `exists`、`eq`、`ne`、`gt`、`lt`、`gte`、`lte`。 时间类型（如 `start`、`due`、`created_at`，以及自定义日期）的操作符： `exists`、`gt`、`lt`、`gte`、`lte`、`between`（值为 `[起始时间戳, 结束时间戳]`；过滤时以「天」为单位。 选项类型（自定义下拉单选、下拉多选、级联单选、级联多选）的操作符： `exists`、`in`、`nin`。 引用类型（如 `project.id`、`type.id`、`assignee.id`、`releases.id`、`tags.id`、`participants.id`）的操作符： `exists`、`in`、`nin`。 每个属性仅支持一个操作符。 暂不支持使用逻辑运算符。 内置属性暂不支持过滤：`id`、`url`、`whole_identifier`、`short_id`、`html_url`、`public_image_token`、`is_archived`、`is_deleted` |
| `payload.filter.title` | object |  |  |
| `payload.filter.title.contains` | string |  |  |
| `payload.filter.type.id` | object |  |  |
| `payload.filter.type.id.in` | string[] |  |  |
| `payload.filter.releases.id` | object |  |  |
| `payload.filter.releases.id.in` | string[] |  |  |
| `payload.filter.start` | object |  |  |
| `payload.filter.start.gte` | number |  |  |
| `payload.filter.due` | object |  |  |
| `payload.filter.due.lte` | number |  |  |
| `payload.keywords` | string |  | 关键字。支持工作项完整编号和工作项标题 |
| `payload.include_public_image_token` | string |  | 包含获取图片资源 token 的属性。使用 `,` 分割，最多 32 个，支持 `description` 和自定义多行文本类型的属性 |
| `payload.include_deleted` | boolean |  | 是否查询已删除的工作项 |
| `payload.include_archived` | boolean |  | 是否查询已归档的工作项 |
| `payload.page_size` | number |  | 每页条数，取值范围 1-100 |
| `payload.page_index` | number |  | 页码，从 0 开始 |

**请求示例**

```json
{
  "mode": "query",
  "payload": {
    "filter": {
      "title": {
        "contains": "用户故事"
      },
      "type.id": {
        "in": [
          "630da48bc9443b1aa94ce3ea"
        ]
      },
      "releases.id": {
        "in": [
          "5eb623487ea47001f6a70571"
        ]
      },
      "start": {
        "gte": 1730000000
      },
      "due": {
        "lte": 1730086400
      }
    },
    "keywords": "SCR-1",
    "page_size": 30,
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
| `values` | object[] | 是 | 工作项全量结构数据的数组。`type` 为工作项类型引用，`start`、`due` 为 DateValue |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].short_id` | string |  |  |
| `values[].html_url` | string |  |  |
| `values[].project` | object |  |  |
| `values[].project.id` | string |  |  |
| `values[].project.url` | string |  |  |
| `values[].project.identifier` | string |  |  |
| `values[].project.name` | string |  |  |
| `values[].project.template_type` | string |  |  |
| `values[].project.is_archived` | number |  |  |
| `values[].project.is_deleted` | number |  |  |
| `values[].identifier` | number |  |  |
| `values[].whole_identifier` | string |  |  |
| `values[].title` | string |  |  |
| `values[].type` | object |  |  |
| `values[].type.id` | string |  |  |
| `values[].type.url` | string |  |  |
| `values[].type.name` | string |  |  |
| `values[].type.group` | string |  |  |
| `values[].start` | object |  |  |
| `values[].start.date` | number |  |  |
| `values[].start.with_time` | number |  |  |
| `values[].due` | object |  |  |
| `values[].due.date` | number |  |  |
| `values[].due.with_time` | number |  |  |
| `values[].parent_id` | string |  |  |
| `values[].parent` | object |  |  |
| `values[].parent.id` | string |  |  |
| `values[].parent.url` | string |  |  |
| `values[].parent.short_id` | string |  |  |
| `values[].parent.html_url` | string |  |  |
| `values[].parent.identifier` | string |  |  |
| `values[].parent.title` | string |  |  |
| `values[].parent.start` | object |  |  |
| `values[].parent.start.date` | number |  |  |
| `values[].parent.start.with_time` | number |  |  |
| `values[].parent.due` | object |  |  |
| `values[].parent.due.date` | number |  |  |
| `values[].parent.due.with_time` | number |  |  |
| `values[].parent.parent_id` | null |  |  |
| `values[].parent.properties` | object |  |  |
| `values[].parent.properties.prop_a` | string |  |  |
| `values[].parent.properties.prop_b` | string |  |  |
| `values[].parent.properties.risk` | null |  |  |
| `values[].parent.properties.business_value` | null |  |  |
| `values[].parent.properties.effort` | null |  |  |
| `values[].parent.properties.backlog_type` | null |  |  |
| `values[].parent.properties.backlog_from` | null |  |  |
| `values[].assignee` | object |  |  |
| `values[].assignee.id` | string |  |  |
| `values[].assignee.url` | string |  |  |
| `values[].assignee.name` | string |  |  |
| `values[].assignee.display_name` | string |  |  |
| `values[].assignee.avatar` | string |  |  |
| `values[].releases` | object[] |  |  |
| `values[].releases[].id` | string |  |  |
| `values[].releases[].url` | string |  |  |
| `values[].releases[].name` | string |  |  |
| `values[].releases[].start` | object |  |  |
| `values[].releases[].start.date` | number |  |  |
| `values[].releases[].start.with_time` | number |  |  |
| `values[].releases[].published_at` | object |  |  |
| `values[].releases[].published_at.date` | number |  |  |
| `values[].releases[].published_at.with_time` | number |  |  |
| `values[].releases[].stage` | object |  |  |
| `values[].releases[].stage.id` | string |  |  |
| `values[].releases[].stage.url` | string |  |  |
| `values[].releases[].stage.name` | string |  |  |
| `values[].releases[].stage.type` | string |  |  |
| `values[].releases[].stage.color` | string |  |  |
| `values[].sprint` | object |  |  |
| `values[].sprint.id` | string |  |  |
| `values[].sprint.url` | string |  |  |
| `values[].sprint.name` | string |  |  |
| `values[].sprint.start` | object |  |  |
| `values[].sprint.start.date` | number |  |  |
| `values[].sprint.start.with_time` | number |  |  |
| `values[].sprint.due` | object |  |  |
| `values[].sprint.due.date` | number |  |  |
| `values[].sprint.due.with_time` | number |  |  |
| `values[].sprint.status` | string |  |  |
| `values[].state` | object |  |  |
| `values[].state.id` | string |  |  |
| `values[].state.url` | string |  |  |
| `values[].state.name` | string |  |  |
| `values[].state.type` | string |  |  |
| `values[].state.color` | string |  |  |
| `values[].priority` | object |  |  |
| `values[].priority.id` | string |  |  |
| `values[].priority.url` | string |  |  |
| `values[].priority.name` | string |  |  |
| `values[].priority.color` | string |  |  |
| `values[].board` | object |  |  |
| `values[].board.id` | string |  |  |
| `values[].board.url` | string |  |  |
| `values[].board.name` | string |  |  |
| `values[].board.workitem_type_ids` | string \| string \| string \| string[] |  |  |
| `values[].entry` | object |  |  |
| `values[].entry.id` | string |  |  |
| `values[].entry.url` | string |  |  |
| `values[].entry.name` | string |  |  |
| `values[].entry_status` | number |  |  |
| `values[].entry_position` | number |  |  |
| `values[].swimlane` | object |  |  |
| `values[].swimlane.id` | string |  |  |
| `values[].swimlane.url` | string |  |  |
| `values[].swimlane.name` | string |  |  |
| `values[].phase` | null |  |  |
| `values[].description` | string |  |  |
| `values[].completed_at` | null |  |  |
| `values[].properties` | object |  |  |
| `values[].properties.story_points` | number |  |  |
| `values[].properties.estimated_workload` | number |  |  |
| `values[].properties.remaining_workload` | number |  |  |
| `values[].properties.prop_a` | string |  |  |
| `values[].properties.prop_b` | string |  |  |
| `values[].properties.risk` | null |  |  |
| `values[].properties.backlog_type` | null |  |  |
| `values[].properties.backlog_from` | null |  |  |
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
| `values[].public_image_token` | string |  |  |
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
      "id": "5edca524cad2fa1125cb0630",
      "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
      "short_id": "1bAqLmTG",
      "html_url": "https://yctech.pingcode.com/pjm/workitems/1bAqLmTG",
      "project": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
        "identifier": "SCR",
        "name": "Scrum 项目",
        "template_type": "scrum",
        "is_archived": 0,
        "is_deleted": 0
      },
      "identifier": 5,
      "whole_identifier": "SCR-5",
      "title": "这是一个用户故事",
      "type": {
        "id": "630da48bc9443b1aa94ce3ea",
        "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
        "name": "用户故事",
        "group": "requirement"
      },
      "start": {
        "date": 1583290309,
        "with_time": 1
      },
      "due": {
        "date": 1583290347,
        "with_time": 0
      },
      "parent_id": "5edca112b06305c524cad2fa",
      "parent": {
        "id": "5edca112b06305c524cad2fa",
        "url": "https://{rest_api_root}/v2/pjm/workitems/5edca112b06305c524cad2fa",
        "short_id": "c9WqLmTO",
        "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
        "identifier": "SCR-3",
        "title": "这是一个特性",
        "start": {
          "date": 1583290309,
          "with_time": 1
        },
        "due": {
          "date": 1583290347,
          "with_time": 1
        },
        "parent_id": null,
        "properties": {
          "prop_a": "prop_a_value",
          "prop_b": "prop_b_value",
          "risk": null,
          "business_value": null,
          "effort": null,
          "backlog_type": null,
          "backlog_from": null
        }
      },
      "assignee": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "releases": [
        {
          "id": "5eb623487ea47001f6a70571",
          "url": "https://{rest_api_root}/v2/pjm/releases/5eb623487ea47001f6a70571",
          "name": "1.0.1",
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
        }
      ],
      "sprint": {
        "id": "5ecf7b74eaab845a2aa53138",
        "url": "https://{rest_api_root}/v2/pjm/sprints/5ecf7b74eaab845a2aa53138",
        "name": "Sprint 1",
        "start": {
          "date": 1589791860,
          "with_time": 0
        },
        "due": {
          "date": 1589791860,
          "with_time": 0
        },
        "status": "completed"
      },
      "state": {
        "id": "5c9b35de90ad7153c2062f18",
        "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
        "name": "新建",
        "type": "pending",
        "color": "#ff7575"
      },
      "priority": {
        "id": "5eb623f6a70571487ea47111",
        "url": "https://{rest_api_root}/v2/pjm/workitem_priorities/5eb623f6a70571487ea47111",
        "name": "最高",
        "color": "#FF7575"
      },
      "board": {
        "id": "5eb623f6a70571487ea47222",
        "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222",
        "name": "kanban",
        "workitem_type_ids": [
          "5eb623f6a70571487ea47101",
          "5eb623f6a70571487ea47102",
          "5eb623f6a70571487ea47103",
          "5eb623f6a70571487ea47104"
        ]
      },
      "entry": {
        "id": "5ee1c4fac5b3c51206f0a861",
        "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222/entries/5ee1c4fac5b3c51206f0a861",
        "name": "需求池"
      },
      "entry_status": 1,
      "entry_position": 1,
      "swimlane": {
        "id": "5ee1c4fac5b3c51206f0a866",
        "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222/swimlanes/5ee1c4fac5b3c51206f0a866",
        "name": "默认泳道"
      },
      "phase": null,
      "description": "这是一个用户故事的描述",
      "completed_at": null,
      "properties": {
        "story_points": 1,
        "estimated_workload": 1,
        "remaining_workload": 1,
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value",
        "risk": null,
        "backlog_type": null,
        "backlog_from": null
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
          "id": "5e6b35de50ef8153c2062f70",
          "url": "https://{rest_api_root}/v2/pjm/tags/5e6b35de50ef8153c2062f70",
          "name": "标签-1"
        }
      ],
      "participants": [
        {
          "id": "a0417f68e846aae315c85d24643678a9",
          "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
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
      "public_image_token": "-fkvANQ2dcVECK6Xg45L3kG8VCbOTK8NrNckGkxljRY",
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

<a id="delete-v2-pjm-workitems-workitem-id"></a>

### 删除一个工作项

`DELETE /v2/pjm/workitems/{workitem_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:workitem`

用于删除一个工作项。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_id` | string | 是 | 工作项的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项的 id |
| `url` | string | 是 | 工作项的地址。删除后地址包含 `include_deleted=true` |
| `short_id` | string | 是 | 工作项的短 id |
| `html_url` | string | 是 | 工作项的 html 地址 |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `identifier` | string | 是 | 工作项的标识 |
| `title` | string | 是 | 工作项的标题 |
| `type` | object | 是 | 工作项类型的引用结构数据 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `type.group` | string |  |  |
| `start` | object | 是 | 工作项的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object | 是 | 工作项的结束时间 |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |
| `parent_id` | string | 是 | 工作项的父工作项 id |
| `parent` | object | 是 | 父工作项的引用结构数据 |
| `parent.id` | string |  |  |
| `parent.url` | string |  |  |
| `parent.short_id` | string |  |  |
| `parent.html_url` | string |  |  |
| `parent.identifier` | string |  |  |
| `parent.title` | string |  |  |
| `parent.start` | object |  |  |
| `parent.start.date` | number |  |  |
| `parent.start.with_time` | number |  |  |
| `parent.due` | object |  |  |
| `parent.due.date` | number |  |  |
| `parent.due.with_time` | number |  |  |
| `parent.parent_id` | null |  |  |
| `parent.properties` | object |  |  |
| `parent.properties.prop_a` | string |  |  |
| `parent.properties.prop_b` | string |  |  |
| `parent.properties.risk` | null |  |  |
| `parent.properties.business_value` | null |  |  |
| `parent.properties.effort` | null |  |  |
| `parent.properties.backlog_type` | null |  |  |
| `parent.properties.backlog_from` | null |  |  |
| `assignee` | object | 是 | 负责人的引用结构数据 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `state` | object | 是 | 工作项状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `state.color` | string |  |  |
| `priority` | object | 是 | 工作项优先级的引用结构数据 |
| `priority.id` | string |  |  |
| `priority.url` | string |  |  |
| `priority.name` | string |  |  |
| `priority.color` | string |  |  |
| `releases` | object[] | 是 | 所属发布的引用结构数据列表 |
| `releases[].id` | string |  |  |
| `releases[].url` | string |  |  |
| `releases[].name` | string |  |  |
| `releases[].start` | object |  |  |
| `releases[].start.date` | number |  |  |
| `releases[].start.with_time` | number |  |  |
| `releases[].published_at` | object |  |  |
| `releases[].published_at.date` | number |  |  |
| `releases[].published_at.with_time` | number |  |  |
| `releases[].stage` | object |  |  |
| `releases[].stage.id` | string |  |  |
| `releases[].stage.url` | string |  |  |
| `releases[].stage.name` | string |  |  |
| `releases[].stage.type` | string |  |  |
| `releases[].stage.color` | string |  |  |
| `sprint` | object | 是 | 所属迭代的引用结构数据 |
| `sprint.id` | string |  |  |
| `sprint.url` | string |  |  |
| `sprint.name` | string |  |  |
| `sprint.start` | object |  |  |
| `sprint.start.date` | number |  |  |
| `sprint.start.with_time` | number |  |  |
| `sprint.due` | object |  |  |
| `sprint.due.date` | number |  |  |
| `sprint.due.with_time` | number |  |  |
| `sprint.status` | string |  |  |
| `board` | object | 是 | 所属看板的引用结构数据 |
| `board.id` | string |  |  |
| `board.url` | string |  |  |
| `board.name` | string |  |  |
| `board.workitem_type_ids` | string \| string \| string \| string[] |  |  |
| `entry` | object | 是 | 所属看板栏的引用结构数据 |
| `entry.id` | string |  |  |
| `entry.url` | string |  |  |
| `entry.name` | string |  |  |
| `entry_status` | number | 是 | 工作项所在看板栏的分区。`1`：进行中（doing），`2`：已完成（done）。该字段只有项目类型为 `kanban` 和 `hybrid` 时有效，且看板栏开启拆分时有意义；枚举：1 / 2 |
| `entry_position` | number | 是 | 工作项在看板栏中的位置。仅看板/混合项目时有意义 |
| `swimlane` | object | 是 | 所属泳道的引用结构数据 |
| `swimlane.id` | string |  |  |
| `swimlane.url` | string |  |  |
| `swimlane.name` | string |  |  |
| `phase` | object | 是 | 所属计划的引用结构数据 |
| `description` | string | 是 | 工作项的描述 |
| `completed_at` | number | 是 | 工作项的完成时间 |
| `properties` | object | 是 | 工作项的自定义属性，以键值对形式组织。包括用户自定义属性（如 `prop_a`、`prop_b`）以及部分系统内置属性（如 `story_points`、`estimated_workload`、`remaining_workload`、`bug_type`、`solution`、`risk` 等） |
| `properties.story_points` | number |  |  |
| `properties.estimated_workload` | number |  |  |
| `properties.remaining_workload` | number |  |  |
| `properties.prop_a` | string |  |  |
| `properties.prop_b` | string |  |  |
| `properties.risk` | null |  |  |
| `properties.backlog_type` | null |  |  |
| `properties.backlog_from` | null |  |  |
| `entity_properties` | object | 是 | 以键值型数据结构组织的实体扩展属性的集合 |
| `entity_properties.entity_property_key_a` | object |  |  |
| `entity_properties.entity_property_key_a.score` | number |  |  |
| `entity_properties.entity_property_key_a.risk` | string |  |  |
| `entity_properties.entity_property_key_b` | string |  |  |
| `tags` | object[] | 是 | 工作项标签的引用结构数据列表 |
| `tags[].id` | string |  |  |
| `tags[].url` | string |  |  |
| `tags[].name` | string |  |  |
| `participants` | object[] | 是 | 工作项关注人的引用结构数据列表 |
| `participants[].id` | string |  |  |
| `participants[].url` | string |  |  |
| `participants[].type` | string |  |  |
| `participants[].user` | object |  |  |
| `participants[].user.id` | string |  |  |
| `participants[].user.url` | string |  |  |
| `participants[].user.name` | string |  |  |
| `participants[].user.display_name` | string |  |  |
| `participants[].user.avatar` | string |  |  |
| `created_at` | number | 是 | 工作项的创建时间 |
| `created_by` | object | 是 | 创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 工作项的更新时间 |
| `updated_by` | object | 是 | 更新人的引用结构数据 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |
| `is_archived` | number | 是 | 是否已归档；枚举：0 / 1 |
| `is_deleted` | number | 是 | 是否已删除。删除成功后为 `1`；枚举：0 / 1 |
| `whole_identifier` | string |  |  |

**响应示例**

```json
{
  "id": "5edca524cad2fa1125cb0630",
  "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630?include_deleted=true",
  "short_id": "1bAqLmTG",
  "html_url": "https://yctech.pingcode.com/pjm/workitems/1bAqLmTG",
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "template_type": "scrum",
    "is_archived": 0,
    "is_deleted": 0
  },
  "identifier": 5,
  "whole_identifier": "SCR-5",
  "title": "这是一个用户故事",
  "type": {
    "id": "630da48bc9443b1aa94ce3ea",
    "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
    "name": "用户故事",
    "group": "requirement"
  },
  "start": {
    "date": 1583290309,
    "with_time": 1
  },
  "due": {
    "date": 1583290347,
    "with_time": 0
  },
  "parent_id": "5edca112b06305c524cad2fa",
  "parent": {
    "id": "5edca112b06305c524cad2fa",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca112b06305c524cad2fa",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "identifier": "SCR-3",
    "title": "这是一个特性",
    "start": {
      "date": 1583290309,
      "with_time": 1
    },
    "due": {
      "date": 1583290347,
      "with_time": 1
    },
    "parent_id": null,
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value",
      "risk": null,
      "business_value": null,
      "effort": null,
      "backlog_type": null,
      "backlog_from": null
    }
  },
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "releases": [
    {
      "id": "5eb623487ea47001f6a70571",
      "url": "https://{rest_api_root}/v2/pjm/releases/5eb623487ea47001f6a70571",
      "name": "1.0.1",
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
    }
  ],
  "sprint": {
    "id": "5ecf7b74eaab845a2aa53138",
    "url": "https://{rest_api_root}/v2/pjm/sprints/5ecf7b74eaab845a2aa53138",
    "name": "Sprint 1",
    "start": {
      "date": 1589791860,
      "with_time": 0
    },
    "due": {
      "date": 1589791860,
      "with_time": 0
    },
    "status": "completed"
  },
  "state": {
    "id": "5c9b35de90ad7153c2062f18",
    "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
    "name": "新建",
    "type": "pending",
    "color": "#ff7575"
  },
  "priority": {
    "id": "5eb623f6a70571487ea47111",
    "url": "https://{rest_api_root}/v2/pjm/workitem_priorities/5eb623f6a70571487ea47111",
    "name": "最高",
    "color": "#FF7575"
  },
  "board": {
    "id": "5eb623f6a70571487ea47222",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222",
    "name": "kanban",
    "workitem_type_ids": [
      "5eb623f6a70571487ea47101",
      "5eb623f6a70571487ea47102",
      "5eb623f6a70571487ea47103",
      "5eb623f6a70571487ea47104"
    ]
  },
  "entry": {
    "id": "5ee1c4fac5b3c51206f0a861",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222/entries/5ee1c4fac5b3c51206f0a861",
    "name": "需求池"
  },
  "entry_status": 1,
  "entry_position": 1,
  "swimlane": {
    "id": "5ee1c4fac5b3c51206f0a866",
    "url": "https://{rest_api_root}/v2/pjm/boards/5eb623f6a70571487ea47222/swimlanes/5ee1c4fac5b3c51206f0a866",
    "name": "默认泳道"
  },
  "phase": null,
  "description": "这是一个用户故事的描述",
  "completed_at": null,
  "properties": {
    "story_points": 1,
    "estimated_workload": 1,
    "remaining_workload": 1,
    "prop_a": "prop_a_value",
    "prop_b": "prop_b_value",
    "risk": null,
    "backlog_type": null,
    "backlog_from": null
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
      "id": "5e6b35de50ef8153c2062f70",
      "url": "https://{rest_api_root}/v2/pjm/tags/5e6b35de50ef8153c2062f70",
      "name": "标签-1"
    }
  ],
  "participants": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
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
  "is_deleted": 1
}
```

<a id="get-v2-pjm-workitem-workitem-types"></a>

### 获取可用的工作项类型列表

`GET /v2/pjm/workitem/workitem_types` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:workitem`

用于分页获取项目中可用的工作项类型。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项类型的引用结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].group` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "630da48bc9443b1aa94ce3ea",
      "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
      "name": "用户故事",
      "group": "requirement"
    },
    {
      "id": "630da48bc9443b1aa94ce3eb",
      "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3eb",
      "name": "缺陷",
      "group": "bug"
    }
  ]
}
```

<a id="get-v2-pjm-workitem-workitem-states"></a>

### 获取可用的工作项状态列表

`GET /v2/pjm/workitem/workitem_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:workitem`

用于分页获取项目中指定工作项类型可用的状态。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |
| `workitem_type_id` | string | 是 | 工作项类型的 id。可以通过「获取可用的工作项类型列表」获得 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项状态的引用结构数据的数组 |
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
      "id": "5c9b35de90ad7153c2062f18",
      "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
      "name": "新建",
      "type": "pending",
      "color": "#ff7575"
    }
  ]
}
```

<a id="get-v2-pjm-workitem-workitem-properties"></a>

### 获取可用的工作项属性列表

`GET /v2/pjm/workitem/workitem_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:workitem`

用于分页获取项目中指定工作项类型可用的属性。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |
| `workitem_type_id` | string | 是 | 工作项类型的 id。可以通过「获取可用的工作项类型列表」获得 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项属性的引用结构数据的数组 |
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
      "id": "severity",
      "url": "https://{rest_api_root}/v2/pjm/workitem_properties/severity",
      "name": "严重程度",
      "type": "select",
      "options": [
        {
          "id": "5efb1859110533727a82c603",
          "text": "严重"
        },
        {
          "id": "5efb1859110533727a82c604",
          "text": "一般"
        }
      ]
    },
    {
      "id": "identifier",
      "url": "https://{rest_api_root}/v2/pjm/workitem_properties/identifier",
      "name": "编号",
      "type": "text",
      "options": null
    }
  ]
}
```

<a id="get-v2-pjm-workitem-workitem-priorities"></a>

### 获取可用的工作项优先级列表

`GET /v2/pjm/workitem/workitem_priorities` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:workitem`

用于分页获取项目中可用的工作项优先级。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项优先级的全量结构数据的数组 |
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
      "id": "5eb623f6a70571487ea47111",
      "url": "https://{rest_api_root}/v2/pjm/workitem_priorities/5eb623f6a70571487ea47111",
      "name": "最高",
      "color": "#FF7575"
    }
  ]
}
```

<a id="get-v2-pjm-workitem-workitem-tags"></a>

### 获取可用的工作项标签列表

`GET /v2/pjm/workitem/workitem_tags` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:workitem`

用于分页获取项目中可用的工作项标签，包含企业级全局标签与该项目的本地标签。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |
| `name` | string |  | 标签的名称 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项标签的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].color` | string |  |  |
| `values[].project` | null \| object |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "5e6b35de50ef8153c2062f70",
      "url": "https://{rest_api_root}/v2/pjm/tags/5e6b35de50ef8153c2062f70",
      "name": "全局标签",
      "color": "#56ABFB",
      "project": null
    },
    {
      "id": "5e6b35de50ef8153c2062f71",
      "url": "https://{rest_api_root}/v2/pjm/tags/5e6b35de50ef8153c2062f71",
      "name": "本地标签",
      "color": "#56ABFB",
      "project": {
        "id": "5eb623f6a70571487ea41919",
        "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
        "identifier": "KB",
        "name": "看板项目",
        "template_type": "kanban",
        "is_archived": 0,
        "is_deleted": 0
      }
    }
  ]
}
```

<a id="post-v2-pjm-workitems-workitem-id-workitem-tags"></a>

### 向工作项中添加一个标签

`POST /v2/pjm/workitems/{workitem_id}/workitem_tags` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:workitem`

用于向指定工作项添加一个已定义的标签。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_id` | string | 是 | 工作项的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `tag_id` | string | 是 | 标签的 id |

**请求示例**

```json
{
  "tag_id": "5e6b35de50ef8153c2062f70"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项标签的 id |
| `url` | string | 是 | 工作项标签的地址 |
| `workitem` | object | 是 | 工作项的引用结构数据 |
| `workitem.id` | string |  |  |
| `workitem.url` | string |  |  |
| `workitem.short_id` | string |  |  |
| `workitem.html_url` | string |  |  |
| `workitem.whole_identifier` | string |  |  |
| `workitem.title` | string |  |  |
| `workitem.start` | object |  |  |
| `workitem.start.date` | number |  |  |
| `workitem.start.with_time` | number |  |  |
| `workitem.due` | object |  |  |
| `workitem.due.date` | number |  |  |
| `workitem.due.with_time` | number |  |  |
| `workitem.parent_id` | string |  |  |
| `tag` | object | 是 | 标签的引用结构数据 |
| `tag.id` | string |  |  |
| `tag.url` | string |  |  |
| `tag.name` | string |  |  |

**响应示例**

```json
{
  "id": "5e6b35de50ef8153c2062f70",
  "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630/workitem_tags/5e6b35de50ef8153c2062f70",
  "workitem": {
    "id": "5edca524cad2fa1125cb0630",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "whole_identifier": "SCR-5",
    "title": "这是一个缺陷",
    "start": {
      "date": 1583290309,
      "with_time": 1
    },
    "due": {
      "date": 1583290347,
      "with_time": 1
    },
    "parent_id": "5edca524cad2fa112b05105c"
  },
  "tag": {
    "id": "5e6b35de50ef8153c2062f70",
    "url": "https://{rest_api_root}/v2/pjm/tags/5e6b35de50ef8153c2062f70",
    "name": "标签-1"
  }
}
```

<a id="get-v2-pjm-workitems-workitem-id-workitem-tags-workitem-tag-id"></a>

### 获取工作项中的一个标签

`GET /v2/pjm/workitems/{workitem_id}/workitem_tags/{workitem_tag_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:workitem`

用于按 id 获取工作项中的一个标签全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_id` | string | 是 | 工作项的 id |
| `workitem_tag_id` | string | 是 | 工作项标签的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项标签的 id |
| `url` | string | 是 | 工作项标签的地址 |
| `workitem` | object | 是 | 工作项的引用结构数据 |
| `workitem.id` | string |  |  |
| `workitem.url` | string |  |  |
| `workitem.short_id` | string |  |  |
| `workitem.html_url` | string |  |  |
| `workitem.whole_identifier` | string |  |  |
| `workitem.title` | string |  |  |
| `workitem.start` | object |  |  |
| `workitem.start.date` | number |  |  |
| `workitem.start.with_time` | number |  |  |
| `workitem.due` | object |  |  |
| `workitem.due.date` | number |  |  |
| `workitem.due.with_time` | number |  |  |
| `workitem.parent_id` | string |  |  |
| `tag` | object | 是 | 标签的引用结构数据 |
| `tag.id` | string |  |  |
| `tag.url` | string |  |  |
| `tag.name` | string |  |  |

**响应示例**

```json
{
  "id": "5e6b35de50ef8153c2062f70",
  "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630/workitem_tags/5e6b35de50ef8153c2062f70",
  "workitem": {
    "id": "5edca524cad2fa1125cb0630",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "whole_identifier": "SCR-5",
    "title": "这是一个缺陷",
    "start": {
      "date": 1583290309,
      "with_time": 1
    },
    "due": {
      "date": 1583290347,
      "with_time": 1
    },
    "parent_id": "5edca524cad2fa112b05105c"
  },
  "tag": {
    "id": "5e6b35de50ef8153c2062f70",
    "url": "https://{rest_api_root}/v2/pjm/tags/5e6b35de50ef8153c2062f70",
    "name": "标签-1"
  }
}
```

<a id="delete-v2-pjm-workitems-workitem-id-workitem-tags-workitem-tag-id"></a>

### 在工作项中移除一个标签

`DELETE /v2/pjm/workitems/{workitem_id}/workitem_tags/{workitem_tag_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:workitem`

用于从指定工作项移除一个标签。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_id` | string | 是 | 工作项的 id |
| `workitem_tag_id` | string | 是 | 工作项标签的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项标签的 id |
| `url` | string | 是 | 工作项标签的地址 |
| `workitem` | object | 是 | 工作项的引用结构数据 |
| `workitem.id` | string |  |  |
| `workitem.url` | string |  |  |
| `workitem.short_id` | string |  |  |
| `workitem.html_url` | string |  |  |
| `workitem.whole_identifier` | string |  |  |
| `workitem.title` | string |  |  |
| `workitem.start` | object |  |  |
| `workitem.start.date` | number |  |  |
| `workitem.start.with_time` | number |  |  |
| `workitem.due` | object |  |  |
| `workitem.due.date` | number |  |  |
| `workitem.due.with_time` | number |  |  |
| `workitem.parent_id` | string |  |  |
| `tag` | object | 是 | 标签的引用结构数据 |
| `tag.id` | string |  |  |
| `tag.url` | string |  |  |
| `tag.name` | string |  |  |

**响应示例**

```json
{
  "id": "5e6b35de50ef8153c2062f70",
  "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630/workitem_tags/5e6b35de50ef8153c2062f70",
  "workitem": {
    "id": "5edca524cad2fa1125cb0630",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "whole_identifier": "SCR-5",
    "title": "这是一个缺陷",
    "start": {
      "date": 1583290309,
      "with_time": 1
    },
    "due": {
      "date": 1583290347,
      "with_time": 1
    },
    "parent_id": "5edca524cad2fa112b05105c"
  },
  "tag": {
    "id": "5e6b35de50ef8153c2062f70",
    "url": "https://{rest_api_root}/v2/pjm/tags/5e6b35de50ef8153c2062f70",
    "name": "标签-1"
  }
}
```

<a id="get-v2-pjm-workitem-relation-types-workitem-relation-type-id"></a>

### 获取一个工作项内部关联类型

`GET /v2/pjm/workitem_relation_types/{workitem_relation_type_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:workitem`

用于按 id 获取工作项内部关联类型全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_relation_type_id` | string | 是 | 工作项内部关联类型的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项内部关联类型的 id |
| `url` | string | 是 | 工作项内部关联类型的地址 |
| `name` | string | 是 | 工作项内部关联类型的名称 |
| `category` | string | 是 | 关联类型分类；枚举："mention" / "clone" / "cloned_by" / "duplicate" / "relate" / "cause" / "caused_by" / "block" / "blocked_by" / "dependency" |
| `is_system` | number | 是 | 是否为系统预设类型 |

**响应示例**

```json
{
  "id": "676510af06fd48a4a4e12616",
  "url": "https://{rest_api_root}/v2/pjm/workitem_relation_types/676510af06fd48a4a4e12616",
  "name": "重复",
  "category": "duplicate",
  "is_system": 1
}
```

<a id="get-v2-pjm-workitem-relation-types"></a>

### 获取工作项内部关联类型列表

`GET /v2/pjm/workitem_relation_types` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:workitem`

用于分页获取企业内全部工作项内部关联类型。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `page_size` | number | 是 | 每页条数 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项内部关联类型的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].category` | string |  |  |
| `values[].is_system` | number |  |  |

**响应示例**

```json
{
  "page_index": 0,
  "page_size": 30,
  "total": 1,
  "values": [
    {
      "id": "676510af06fd48a4a4e12616",
      "url": "https://{rest_api_root}/v2/pjm/workitem_relation_types/676510af06fd48a4a4e12616",
      "name": "重复",
      "category": "duplicate",
      "is_system": 1
    }
  ]
}
```

<a id="post-v2-pjm-workitems-workitem-id-relations"></a>

### 创建一个工作项内部关联

`POST /v2/pjm/workitems/{workitem_id}/relations` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:workitem`

用于将当前工作项与目标工作项建立指定类型的内部关联。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_id` | string | 是 | 工作项的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `target_workitem_id` | string | 是 | 目标工作项的 id |
| `relation_type_id` | string | 是 | 关联类型的 id |

**请求示例**

```json
{
  "target_workitem_id": "5f9a65ef20ef8153c1462e64",
  "relation_type_id": "5f9a65ef20ef8153c1462e65"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项内部关联的 id |
| `url` | string | 是 | 工作项内部关联的地址 |
| `relation_type` | object | 是 | 关联类型的引用结构数据 |
| `relation_type.category` | string |  | 关联类型分类；枚举："mention" / "clone" / "cloned_by" / "duplicate" / "relate" / "cause" / "caused_by" / "block" / "blocked_by" / "dependency" |
| `relation_type.id` | string |  |  |
| `relation_type.url` | string |  |  |
| `relation_type.name` | string |  |  |
| `origin_workitem` | object | 是 | 源工作项的引用结构数据 |
| `origin_workitem.id` | string |  |  |
| `origin_workitem.url` | string |  |  |
| `origin_workitem.short_id` | string |  |  |
| `origin_workitem.html_url` | string |  |  |
| `origin_workitem.whole_identifier` | string |  |  |
| `origin_workitem.title` | string |  |  |
| `origin_workitem.start` | object |  |  |
| `origin_workitem.start.date` | number |  |  |
| `origin_workitem.start.with_time` | number |  |  |
| `origin_workitem.due` | object |  |  |
| `origin_workitem.due.date` | number |  |  |
| `origin_workitem.due.with_time` | number |  |  |
| `origin_workitem.parent_id` | string |  |  |
| `origin_workitem.properties` | object |  |  |
| `origin_workitem.properties.prop_a` | string |  |  |
| `origin_workitem.properties.prop_b` | string |  |  |
| `target_workitem` | object | 是 | 目标工作项的引用结构数据 |
| `target_workitem.id` | string |  |  |
| `target_workitem.url` | string |  |  |
| `target_workitem.short_id` | string |  |  |
| `target_workitem.html_url` | string |  |  |
| `target_workitem.whole_identifier` | string |  |  |
| `target_workitem.title` | string |  |  |
| `target_workitem.start` | object |  |  |
| `target_workitem.start.date` | number |  |  |
| `target_workitem.start.with_time` | number |  |  |
| `target_workitem.due` | object |  |  |
| `target_workitem.due.date` | number |  |  |
| `target_workitem.due.with_time` | number |  |  |
| `target_workitem.parent_id` | null |  |  |
| `target_workitem.properties` | object |  |  |
| `target_workitem.properties.prop_a` | string |  |  |
| `target_workitem.properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "58fb35de50ef8153c2062e36",
  "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2b06305cfa112/relations/58fb35de50ef8153c2062e36",
  "relation_type": {
    "id": "5f9a65ef20ef8153c1462e65",
    "url": "https://{rest_api_root}/v2/pjm/workitem_relation_types/5f9a65ef20ef8153c1462e65",
    "name": "关联",
    "category": "relate"
  },
  "origin_workitem": {
    "id": "5edca524cad2b06305cfa112",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2b06305cfa112",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "whole_identifier": "SCR-4",
    "title": "这是一个任务",
    "start": {
      "date": 1583290309,
      "with_time": 1
    },
    "due": {
      "date": 1583290347,
      "with_time": 1
    },
    "parent_id": "5edca524cad2fa1125cb0629",
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  },
  "target_workitem": {
    "id": "5f9a65ef20ef8153c1462e64",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5f9a65ef20ef8153c1462e64",
    "short_id": "a9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/a9WqLmTO",
    "whole_identifier": "SCR-5",
    "title": "这是一个缺陷",
    "start": {
      "date": 1583290309,
      "with_time": 1
    },
    "due": {
      "date": 1583290347,
      "with_time": 1
    },
    "parent_id": null,
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  }
}
```

<a id="get-v2-pjm-workitems-workitem-id-relations-relation-id"></a>

### 获取一个工作项内部关联

`GET /v2/pjm/workitems/{workitem_id}/relations/{relation_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:workitem`

用于按 id 获取工作项内部关联全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_id` | string | 是 | 工作项的 id |
| `relation_id` | string | 是 | 工作项内部关联的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的内部关联 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项内部关联的 id |
| `url` | string | 是 | 工作项内部关联的地址 |
| `relation_type` | object | 是 | 关联类型的引用结构数据 |
| `relation_type.category` | string |  | 关联类型分类；枚举："mention" / "clone" / "cloned_by" / "duplicate" / "relate" / "cause" / "caused_by" / "block" / "blocked_by" / "dependency" |
| `relation_type.id` | string |  |  |
| `relation_type.url` | string |  |  |
| `relation_type.name` | string |  |  |
| `origin_workitem` | object | 是 | 源工作项的引用结构数据 |
| `origin_workitem.id` | string |  |  |
| `origin_workitem.url` | string |  |  |
| `origin_workitem.short_id` | string |  |  |
| `origin_workitem.html_url` | string |  |  |
| `origin_workitem.whole_identifier` | string |  |  |
| `origin_workitem.title` | string |  |  |
| `origin_workitem.start` | object |  |  |
| `origin_workitem.start.date` | number |  |  |
| `origin_workitem.start.with_time` | number |  |  |
| `origin_workitem.due` | object |  |  |
| `origin_workitem.due.date` | number |  |  |
| `origin_workitem.due.with_time` | number |  |  |
| `origin_workitem.parent_id` | string |  |  |
| `origin_workitem.properties` | object |  |  |
| `origin_workitem.properties.prop_a` | string |  |  |
| `origin_workitem.properties.prop_b` | string |  |  |
| `target_workitem` | object | 是 | 目标工作项的引用结构数据 |
| `target_workitem.id` | string |  |  |
| `target_workitem.url` | string |  |  |
| `target_workitem.short_id` | string |  |  |
| `target_workitem.html_url` | string |  |  |
| `target_workitem.whole_identifier` | string |  |  |
| `target_workitem.title` | string |  |  |
| `target_workitem.start` | object |  |  |
| `target_workitem.start.date` | number |  |  |
| `target_workitem.start.with_time` | number |  |  |
| `target_workitem.due` | object |  |  |
| `target_workitem.due.date` | number |  |  |
| `target_workitem.due.with_time` | number |  |  |
| `target_workitem.parent_id` | null |  |  |
| `target_workitem.properties` | object |  |  |
| `target_workitem.properties.prop_a` | string |  |  |
| `target_workitem.properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "58fb35de50ef8153c2062e36",
  "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2b06305cfa112/relations/58fb35de50ef8153c2062e36",
  "relation_type": {
    "id": "5f9a65ef20ef8153c1462e65",
    "url": "https://{rest_api_root}/v2/pjm/workitem_relation_types/5f9a65ef20ef8153c1462e65",
    "name": "关联",
    "category": "relate"
  },
  "origin_workitem": {
    "id": "5edca524cad2b06305cfa112",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2b06305cfa112",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "whole_identifier": "SCR-4",
    "title": "这是一个任务",
    "start": {
      "date": 1583290309,
      "with_time": 1
    },
    "due": {
      "date": 1583290347,
      "with_time": 1
    },
    "parent_id": "5edca524cad2fa1125cb0629",
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  },
  "target_workitem": {
    "id": "5f9a65ef20ef8153c1462e64",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5f9a65ef20ef8153c1462e64",
    "short_id": "a9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/a9WqLmTO",
    "whole_identifier": "SCR-5",
    "title": "这是一个缺陷",
    "start": {
      "date": 1583290309,
      "with_time": 1
    },
    "due": {
      "date": 1583290347,
      "with_time": 1
    },
    "parent_id": null,
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  }
}
```

<a id="get-v2-pjm-workitems-workitem-id-relations"></a>

### 获取工作项内部关联列表

`GET /v2/pjm/workitems/{workitem_id}/relations` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:workitem`

用于分页获取工作项的内部关联列表。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_id` | string | 是 | 工作项的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `relation_type` | string |  | 关联的类型；枚举："mention" / "clone" / "cloned_by" / "duplicate" / "relate" / "cause" / "caused_by" / "block" / "blocked_by" / "dependency" / "自定义关联类型的" / "id" |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `page_size` | number | 是 | 每页条数 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项内部关联的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].relation_type` | object |  |  |
| `values[].relation_type.id` | string |  |  |
| `values[].relation_type.url` | string |  |  |
| `values[].relation_type.name` | string |  |  |
| `values[].relation_type.category` | string |  |  |
| `values[].origin_workitem` | object |  |  |
| `values[].origin_workitem.id` | string |  |  |
| `values[].origin_workitem.url` | string |  |  |
| `values[].origin_workitem.short_id` | string |  |  |
| `values[].origin_workitem.html_url` | string |  |  |
| `values[].origin_workitem.whole_identifier` | string |  |  |
| `values[].origin_workitem.title` | string |  |  |
| `values[].origin_workitem.start` | object |  |  |
| `values[].origin_workitem.start.date` | number |  |  |
| `values[].origin_workitem.start.with_time` | number |  |  |
| `values[].origin_workitem.due` | object |  |  |
| `values[].origin_workitem.due.date` | number |  |  |
| `values[].origin_workitem.due.with_time` | number |  |  |
| `values[].origin_workitem.parent_id` | string |  |  |
| `values[].origin_workitem.properties` | object |  |  |
| `values[].origin_workitem.properties.prop_a` | string |  |  |
| `values[].origin_workitem.properties.prop_b` | string |  |  |
| `values[].target_workitem` | object |  |  |
| `values[].target_workitem.id` | string |  |  |
| `values[].target_workitem.url` | string |  |  |
| `values[].target_workitem.short_id` | string |  |  |
| `values[].target_workitem.html_url` | string |  |  |
| `values[].target_workitem.whole_identifier` | string |  |  |
| `values[].target_workitem.title` | string |  |  |
| `values[].target_workitem.start` | object |  |  |
| `values[].target_workitem.start.date` | number |  |  |
| `values[].target_workitem.start.with_time` | number |  |  |
| `values[].target_workitem.due` | object |  |  |
| `values[].target_workitem.due.date` | number |  |  |
| `values[].target_workitem.due.with_time` | number |  |  |
| `values[].target_workitem.parent_id` | null |  |  |
| `values[].target_workitem.properties` | object |  |  |
| `values[].target_workitem.properties.prop_a` | string |  |  |
| `values[].target_workitem.properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "page_index": 0,
  "page_size": 30,
  "total": 1,
  "values": [
    {
      "id": "58fb35de50ef8153c2062e36",
      "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2b06305cfa112/relations/58fb35de50ef8153c2062e36",
      "relation_type": {
        "id": "5f9a65ef20ef8153c1462e65",
        "url": "https://{rest_api_root}/v2/pjm/workitem_relation_types/5f9a65ef20ef8153c1462e65",
        "name": "关联",
        "category": "relate"
      },
      "origin_workitem": {
        "id": "5edca524cad2b06305cfa112",
        "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2b06305cfa112",
        "short_id": "c9WqLmTO",
        "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
        "whole_identifier": "SCR-4",
        "title": "这是一个任务",
        "start": {
          "date": 1583290309,
          "with_time": 1
        },
        "due": {
          "date": 1583290347,
          "with_time": 1
        },
        "parent_id": "5edca524cad2fa1125cb0629",
        "properties": {
          "prop_a": "prop_a_value",
          "prop_b": "prop_b_value"
        }
      },
      "target_workitem": {
        "id": "5f9a65ef20ef8153c1462e64",
        "url": "https://{rest_api_root}/v2/pjm/workitems/5f9a65ef20ef8153c1462e64",
        "short_id": "a9WqLmTO",
        "html_url": "https://yctech.pingcode.com/pjm/workitems/a9WqLmTO",
        "whole_identifier": "SCR-5",
        "title": "这是一个缺陷",
        "start": {
          "date": 1583290309,
          "with_time": 1
        },
        "due": {
          "date": 1583290347,
          "with_time": 1
        },
        "parent_id": null,
        "properties": {
          "prop_a": "prop_a_value",
          "prop_b": "prop_b_value"
        }
      }
    }
  ]
}
```

<a id="delete-v2-pjm-workitems-workitem-id-relations-relation-id"></a>

### 删除一个工作项内部关联

`DELETE /v2/pjm/workitems/{workitem_id}/relations/{relation_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:workitem`

用于删除当前工作项与目标工作项之间的内部关联。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_id` | string | 是 | 工作项的 id |
| `relation_id` | string | 是 | 工作项内部关联的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项内部关联的 id |
| `url` | string | 是 | 工作项内部关联的地址 |
| `relation_type` | object | 是 | 关联类型的引用结构数据 |
| `relation_type.category` | string |  | 关联类型分类；枚举："mention" / "clone" / "cloned_by" / "duplicate" / "relate" / "cause" / "caused_by" / "block" / "blocked_by" / "dependency" |
| `relation_type.id` | string |  |  |
| `relation_type.url` | string |  |  |
| `relation_type.name` | string |  |  |
| `origin_workitem` | object | 是 | 源工作项的引用结构数据 |
| `origin_workitem.id` | string |  |  |
| `origin_workitem.url` | string |  |  |
| `origin_workitem.short_id` | string |  |  |
| `origin_workitem.html_url` | string |  |  |
| `origin_workitem.whole_identifier` | string |  |  |
| `origin_workitem.title` | string |  |  |
| `origin_workitem.start` | object |  |  |
| `origin_workitem.start.date` | number |  |  |
| `origin_workitem.start.with_time` | number |  |  |
| `origin_workitem.due` | object |  |  |
| `origin_workitem.due.date` | number |  |  |
| `origin_workitem.due.with_time` | number |  |  |
| `origin_workitem.parent_id` | string |  |  |
| `origin_workitem.properties` | object |  |  |
| `origin_workitem.properties.prop_a` | string |  |  |
| `origin_workitem.properties.prop_b` | string |  |  |
| `target_workitem` | object | 是 | 目标工作项的引用结构数据 |
| `target_workitem.id` | string |  |  |
| `target_workitem.url` | string |  |  |
| `target_workitem.short_id` | string |  |  |
| `target_workitem.html_url` | string |  |  |
| `target_workitem.whole_identifier` | string |  |  |
| `target_workitem.title` | string |  |  |
| `target_workitem.start` | object |  |  |
| `target_workitem.start.date` | number |  |  |
| `target_workitem.start.with_time` | number |  |  |
| `target_workitem.due` | object |  |  |
| `target_workitem.due.date` | number |  |  |
| `target_workitem.due.with_time` | number |  |  |
| `target_workitem.parent_id` | null |  |  |
| `target_workitem.properties` | object |  |  |
| `target_workitem.properties.prop_a` | string |  |  |
| `target_workitem.properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "58fb35de50ef8153c2062e36",
  "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2b06305cfa112/relations/58fb35de50ef8153c2062e36",
  "relation_type": {
    "id": "5f9a65ef20ef8153c1462e65",
    "url": "https://{rest_api_root}/v2/pjm/workitem_relation_types/5f9a65ef20ef8153c1462e65",
    "name": "关联",
    "category": "relate"
  },
  "origin_workitem": {
    "id": "5edca524cad2b06305cfa112",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2b06305cfa112",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "whole_identifier": "SCR-4",
    "title": "这是一个任务",
    "start": {
      "date": 1583290309,
      "with_time": 1
    },
    "due": {
      "date": 1583290347,
      "with_time": 1
    },
    "parent_id": "5edca524cad2fa1125cb0629",
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  },
  "target_workitem": {
    "id": "5f9a65ef20ef8153c1462e64",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5f9a65ef20ef8153c1462e64",
    "short_id": "a9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/a9WqLmTO",
    "whole_identifier": "SCR-5",
    "title": "这是一个缺陷",
    "start": {
      "date": 1583290309,
      "with_time": 1
    },
    "due": {
      "date": 1583290347,
      "with_time": 1
    },
    "parent_id": null,
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  }
}
```

<a id="get-v2-pjm-workitems-workitem-id-transition-histories-transition-history-id"></a>

### 获取一条工作项流转记录

`GET /v2/pjm/workitems/{workitem_id}/transition_histories/{transition_history_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:workitem`

用于按 id 获取一条工作项流转记录全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_id` | string | 是 | 工作项的 id |
| `transition_history_id` | string | 是 | 工作项流转记录的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项流转记录的 id |
| `url` | string | 是 | 工作项流转记录的地址 |
| `workitem` | object | 是 | 工作项的引用结构数据 |
| `workitem.id` | string |  |  |
| `workitem.url` | string |  |  |
| `workitem.short_id` | string |  |  |
| `workitem.html_url` | string |  |  |
| `workitem.whole_identifier` | string |  |  |
| `workitem.title` | string |  |  |
| `workitem.start` | object |  |  |
| `workitem.start.date` | number |  |  |
| `workitem.start.with_time` | number |  |  |
| `workitem.due` | object |  |  |
| `workitem.due.date` | number |  |  |
| `workitem.due.with_time` | number |  |  |
| `workitem.parent_id` | string |  |  |
| `workitem.properties` | object |  |  |
| `workitem.properties.prop_a` | string |  |  |
| `workitem.properties.prop_b` | string |  |  |
| `from_state` | object | 是 | 流转前状态的引用结构数据 |
| `from_state.id` | string |  |  |
| `from_state.url` | string |  |  |
| `from_state.name` | string |  |  |
| `from_state.type` | string |  |  |
| `from_state.color` | string |  |  |
| `to_state` | object | 是 | 流转后状态的引用结构数据 |
| `to_state.id` | string |  |  |
| `to_state.url` | string |  |  |
| `to_state.name` | string |  |  |
| `to_state.type` | string |  |  |
| `to_state.color` | string |  |  |
| `created_at` | number | 是 | 流转记录的创建时间 |
| `created_by` | object | 是 | 创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |

**响应示例**

```json
{
  "id": "5e6b35de50ef8153c2062f70",
  "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630/transition_histories/5e6b35de50ef8153c2062f70",
  "workitem": {
    "id": "5edca524cad2fa1125cb0630",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "whole_identifier": "SCR-5",
    "title": "这是一个缺陷",
    "start": {
      "date": 1674493200,
      "with_time": 1
    },
    "due": {
      "date": 1674493200,
      "with_time": 1
    },
    "parent_id": "5edca524cad2fa112b05105c",
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  },
  "from_state": {
    "id": "5c9b35de90ad7153c2062f18",
    "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
    "name": "新建",
    "type": "pending",
    "color": "#56ABFB"
  },
  "to_state": {
    "id": "5ef85b1e9481936604da7f4c",
    "url": "https://{rest_api_root}/v2/pjm/workitem_states/5ef85b1e9481936604da7f4c",
    "name": "进行中",
    "type": "in_progress",
    "color": "#F6C659"
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

<a id="get-v2-pjm-workitems-workitem-id-transition-histories"></a>

### 获取工作项流转记录列表

`GET /v2/pjm/workitems/{workitem_id}/transition_histories` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:workitem`

用于分页获取某工作项的流转记录。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_id` | string | 是 | 工作项的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项流转记录的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].workitem` | object |  |  |
| `values[].workitem.id` | string |  |  |
| `values[].workitem.url` | string |  |  |
| `values[].workitem.short_id` | string |  |  |
| `values[].workitem.html_url` | string |  |  |
| `values[].workitem.whole_identifier` | string |  |  |
| `values[].workitem.title` | string |  |  |
| `values[].workitem.start` | object |  |  |
| `values[].workitem.start.date` | number |  |  |
| `values[].workitem.start.with_time` | number |  |  |
| `values[].workitem.due` | object |  |  |
| `values[].workitem.due.date` | number |  |  |
| `values[].workitem.due.with_time` | number |  |  |
| `values[].workitem.parent_id` | string |  |  |
| `values[].workitem.properties` | object |  |  |
| `values[].workitem.properties.prop_a` | string |  |  |
| `values[].workitem.properties.prop_b` | string |  |  |
| `values[].from_state` | object |  |  |
| `values[].from_state.id` | string |  |  |
| `values[].from_state.url` | string |  |  |
| `values[].from_state.name` | string |  |  |
| `values[].from_state.type` | string |  |  |
| `values[].from_state.color` | string |  |  |
| `values[].to_state` | object |  |  |
| `values[].to_state.id` | string |  |  |
| `values[].to_state.url` | string |  |  |
| `values[].to_state.name` | string |  |  |
| `values[].to_state.type` | string |  |  |
| `values[].to_state.color` | string |  |  |
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
      "id": "5e6b35de50ef8153c2062f70",
      "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630/transition_histories/5e6b35de50ef8153c2062f70",
      "workitem": {
        "id": "5edca524cad2fa1125cb0630",
        "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
        "short_id": "c9WqLmTO",
        "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
        "whole_identifier": "SCR-5",
        "title": "这是一个缺陷",
        "start": {
          "date": 1674493200,
          "with_time": 1
        },
        "due": {
          "date": 1674493200,
          "with_time": 1
        },
        "parent_id": "5edca524cad2fa112b05105c",
        "properties": {
          "prop_a": "prop_a_value",
          "prop_b": "prop_b_value"
        }
      },
      "from_state": {
        "id": "5c9b35de90ad7153c2062f18",
        "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
        "name": "新建",
        "type": "pending",
        "color": "#56ABFB"
      },
      "to_state": {
        "id": "5ef85b1e9481936604da7f4c",
        "url": "https://{rest_api_root}/v2/pjm/workitem_states/5ef85b1e9481936604da7f4c",
        "name": "进行中",
        "type": "in_progress",
        "color": "#F6C659"
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

<a id="post-v2-pjm-deliverable-targets"></a>

### 创建一个工作项交付目标

`POST /v2/pjm/deliverable_targets` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:workitem`

用于创建工作项交付目标。  
 所属项目须为 waterfall 或 hybrid。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_id` | string | 是 | 工作项的 id。工作项所属项目类型必须为 `waterfall` 或 `hybrid` |
| `name` | string | 是 | 工作项交付目标的名称 |

**请求示例**

```json
{
  "workitem_id": "63761fee31caaf77189816b4",
  "name": "工作项交付目标"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项交付目标的 id |
| `url` | string | 是 | 工作项交付目标的地址 |
| `name` | string | 是 | 工作项交付目标的名称 |
| `deliverable` | object | 是 | 工作项交付物的引用结构数据。未提交时为 `null` |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `workitem` | object | 是 | 所属工作项的引用结构数据 |
| `workitem.id` | string |  |  |
| `workitem.url` | string |  |  |
| `workitem.short_id` | string |  |  |
| `workitem.html_url` | string |  |  |
| `workitem.whole_identifier` | string |  |  |
| `workitem.title` | string |  |  |
| `workitem.start` | object |  |  |
| `workitem.start.date` | number |  |  |
| `workitem.start.with_time` | number |  |  |
| `workitem.due` | object |  |  |
| `workitem.due.date` | number |  |  |
| `workitem.due.with_time` | number |  |  |
| `workitem.parent_id` | string |  |  |
| `workitem.properties` | object |  |  |
| `workitem.properties.prop_a` | string |  |  |
| `workitem.properties.prop_b` | string |  |  |
| `created_at` | number | 是 | 工作项交付目标的创建时间 |
| `created_by` | object | 是 | 创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 工作项交付目标的更新时间 |
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
  "id": "63761fee31caaf7718981876",
  "url": "https://{rest_api_root}/v2/pjm/deliverable_targets/63761fee31caaf7718981876",
  "name": "阶段交付目标",
  "deliverable": null,
  "project": {
    "id": "6375cc81e3004de4ea14aa52",
    "url": "https://{rest_api_root}/v2/pjm/projects/6375cc81e3004de4ea14aa52",
    "identifier": "WTF",
    "name": "瀑布项目",
    "template_type": "waterfall",
    "is_archived": 0,
    "is_deleted": 0
  },
  "workitem": {
    "id": "63761fee31caaf77189816b4",
    "url": "https://{rest_api_root}/v2/pjm/workitems/63761fee31caaf77189816b4",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "whole_identifier": "WTF-5",
    "title": "这是一个阶段",
    "start": {
      "date": 1583290309,
      "with_time": 1
    },
    "due": {
      "date": 1583290347,
      "with_time": 1
    },
    "parent_id": "5edca524cad2fa1125cb0629",
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  },
  "created_at": 1668685806,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1668685806,
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

<a id="get-v2-pjm-deliverable-targets-deliverable-target-id"></a>

### 获取一个工作项交付目标

`GET /v2/pjm/deliverable_targets/{deliverable_target_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:workitem`

用于按 id 获取工作项交付目标全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `deliverable_target_id` | string | 是 | 工作项交付目标的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项交付目标的 id |
| `url` | string | 是 | 工作项交付目标的地址 |
| `name` | string | 是 | 工作项交付目标的名称 |
| `deliverable` | object | 是 | 工作项交付物的引用结构数据 |
| `deliverable.id` | string |  |  |
| `deliverable.url` | string |  |  |
| `deliverable.content_type` | string |  |  |
| `deliverable.content` | object |  |  |
| `deliverable.content.name` | string |  |  |
| `deliverable.content.href` | string |  |  |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `workitem` | object | 是 | 所属工作项的引用结构数据 |
| `workitem.id` | string |  |  |
| `workitem.url` | string |  |  |
| `workitem.short_id` | string |  |  |
| `workitem.html_url` | string |  |  |
| `workitem.whole_identifier` | string |  |  |
| `workitem.title` | string |  |  |
| `workitem.start` | object |  |  |
| `workitem.start.date` | number |  |  |
| `workitem.start.with_time` | number |  |  |
| `workitem.due` | object |  |  |
| `workitem.due.date` | number |  |  |
| `workitem.due.with_time` | number |  |  |
| `workitem.parent_id` | string |  |  |
| `workitem.properties` | object |  |  |
| `workitem.properties.prop_a` | string |  |  |
| `workitem.properties.prop_b` | string |  |  |
| `created_at` | number | 是 | 工作项交付目标的创建时间 |
| `created_by` | object | 是 | 创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 工作项交付目标的更新时间 |
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
  "id": "63761fee31caaf7718981876",
  "url": "https://{rest_api_root}/v2/pjm/deliverable_targets/63761fee31caaf7718981876",
  "name": "阶段交付目标",
  "deliverable": {
    "id": "63761fee31caaf7718981878",
    "url": "https://{rest_api_root}/v2/pjm/deliverables/63761fee31caaf7718981878",
    "content_type": "link",
    "content": {
      "name": "PingCode",
      "href": "https://www.pingcode.com"
    }
  },
  "project": {
    "id": "6375cc81e3004de4ea14aa52",
    "url": "https://{rest_api_root}/v2/pjm/projects/6375cc81e3004de4ea14aa52",
    "identifier": "WTF",
    "name": "瀑布项目",
    "template_type": "waterfall",
    "is_archived": 0,
    "is_deleted": 0
  },
  "workitem": {
    "id": "63761fee31caaf77189816b4",
    "url": "https://{rest_api_root}/v2/pjm/workitems/63761fee31caaf77189816b4",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "whole_identifier": "WTF-5",
    "title": "这是一个阶段",
    "start": {
      "date": 1583290309,
      "with_time": 1
    },
    "due": {
      "date": 1583290347,
      "with_time": 1
    },
    "parent_id": "5edca524cad2fa1125cb0629",
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  },
  "created_at": 1668685806,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1668685806,
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

<a id="patch-v2-pjm-deliverable-targets-deliverable-target-id"></a>

### 部分更新一个工作项交付目标

`PATCH /v2/pjm/deliverable_targets/{deliverable_target_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:workitem`

用于部分更新工作项交付目标。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `deliverable_target_id` | string | 是 | 工作项交付目标 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_id` | string |  | 工作项的 id |
| `name` | string |  | 工作项交付目标的名称 |

**请求示例**

```json
{
  "workitem_id": "63761fee31caaf77189816b4",
  "name": "工作项交付目标"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项交付目标的 id |
| `url` | string | 是 | 工作项交付目标的地址 |
| `name` | string | 是 | 工作项交付目标的名称 |
| `deliverable` | object | 是 | 工作项交付物的引用结构数据 |
| `deliverable.id` | string |  |  |
| `deliverable.url` | string |  |  |
| `deliverable.content_type` | string |  |  |
| `deliverable.content` | object |  |  |
| `deliverable.content.name` | string |  |  |
| `deliverable.content.href` | string |  |  |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `workitem` | object | 是 | 所属工作项的引用结构数据 |
| `workitem.id` | string |  |  |
| `workitem.url` | string |  |  |
| `workitem.short_id` | string |  |  |
| `workitem.html_url` | string |  |  |
| `workitem.whole_identifier` | string |  |  |
| `workitem.title` | string |  |  |
| `workitem.start` | object |  |  |
| `workitem.start.date` | number |  |  |
| `workitem.start.with_time` | number |  |  |
| `workitem.due` | object |  |  |
| `workitem.due.date` | number |  |  |
| `workitem.due.with_time` | number |  |  |
| `workitem.parent_id` | string |  |  |
| `workitem.properties` | object |  |  |
| `workitem.properties.prop_a` | string |  |  |
| `workitem.properties.prop_b` | string |  |  |
| `created_at` | number | 是 | 工作项交付目标的创建时间 |
| `created_by` | object | 是 | 创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 工作项交付目标的更新时间 |
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
  "id": "63761fee31caaf7718981876",
  "url": "https://{rest_api_root}/v2/pjm/deliverable_targets/63761fee31caaf7718981876",
  "name": "阶段交付目标",
  "deliverable": {
    "id": "63761fee31caaf7718981878",
    "url": "https://{rest_api_root}/v2/pjm/deliverables/63761fee31caaf7718981878",
    "content_type": "link",
    "content": {
      "name": "PingCode",
      "href": "https://www.pingcode.com"
    }
  },
  "project": {
    "id": "6375cc81e3004de4ea14aa52",
    "url": "https://{rest_api_root}/v2/pjm/projects/6375cc81e3004de4ea14aa52",
    "identifier": "WTF",
    "name": "瀑布项目",
    "template_type": "waterfall",
    "is_archived": 0,
    "is_deleted": 0
  },
  "workitem": {
    "id": "63761fee31caaf77189816b4",
    "url": "https://{rest_api_root}/v2/pjm/workitems/63761fee31caaf77189816b4",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "whole_identifier": "WTF-5",
    "title": "这是一个阶段",
    "start": {
      "date": 1583290309,
      "with_time": 1
    },
    "due": {
      "date": 1583290347,
      "with_time": 1
    },
    "parent_id": "5edca524cad2fa1125cb0629",
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  },
  "created_at": 1668685806,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1668687806,
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

<a id="get-v2-pjm-deliverable-targets"></a>

### 获取工作项交付目标列表

`GET /v2/pjm/deliverable_targets` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:workitem`

用于按项目或工作项分页获取交付目标。  
 项目须为 waterfall 或 hybrid。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string |  | 项目的 id。项目类型必须为 `waterfall` 或 `hybrid` |
| `workitem_id` | string |  | 工作项的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项交付目标全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].deliverable` | object |  |  |
| `values[].deliverable.id` | string |  |  |
| `values[].deliverable.url` | string |  |  |
| `values[].deliverable.content_type` | string |  |  |
| `values[].deliverable.content` | object |  |  |
| `values[].deliverable.content.name` | string |  |  |
| `values[].deliverable.content.href` | string |  |  |
| `values[].deliverable.content.id` | string |  |  |
| `values[].deliverable.content.url` | string |  |  |
| `values[].deliverable.content.title` | string |  |  |
| `values[].deliverable.content.size` | number |  |  |
| `values[].deliverable.content.type` | string |  |  |
| `values[].project` | object |  |  |
| `values[].project.id` | string |  |  |
| `values[].project.url` | string |  |  |
| `values[].project.identifier` | string |  |  |
| `values[].project.name` | string |  |  |
| `values[].project.template_type` | string |  |  |
| `values[].project.is_archived` | number |  |  |
| `values[].project.is_deleted` | number |  |  |
| `values[].workitem` | object |  |  |
| `values[].workitem.id` | string |  |  |
| `values[].workitem.url` | string |  |  |
| `values[].workitem.short_id` | string |  |  |
| `values[].workitem.html_url` | string |  |  |
| `values[].workitem.whole_identifier` | string |  |  |
| `values[].workitem.title` | string |  |  |
| `values[].workitem.start` | object |  |  |
| `values[].workitem.start.date` | number |  |  |
| `values[].workitem.start.with_time` | number |  |  |
| `values[].workitem.due` | object |  |  |
| `values[].workitem.due.date` | number |  |  |
| `values[].workitem.due.with_time` | number |  |  |
| `values[].workitem.parent_id` | string |  |  |
| `values[].workitem.properties` | object |  |  |
| `values[].workitem.properties.prop_a` | string |  |  |
| `values[].workitem.properties.prop_b` | string |  |  |
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
  "total": 2,
  "values": [
    {
      "id": "63761fee31caaf7718981876",
      "url": "https://{rest_api_root}/v2/pjm/deliverable_targets/63761fee31caaf7718981876",
      "name": "阶段交付目标",
      "deliverable": {
        "id": "63761fee31caaf7718981878",
        "url": "https://{rest_api_root}/v2/pjm/deliverables/63761fee31caaf7718981878",
        "content_type": "link",
        "content": {
          "name": "PingCode",
          "href": "https://www.pingcode.com"
        }
      },
      "project": {
        "id": "6375cc81e3004de4ea14aa52",
        "url": "https://{rest_api_root}/v2/pjm/projects/6375cc81e3004de4ea14aa52",
        "identifier": "WTF",
        "name": "瀑布项目",
        "template_type": "waterfall",
        "is_archived": 0,
        "is_deleted": 0
      },
      "workitem": {
        "id": "63761fee31caaf77189816b4",
        "url": "https://{rest_api_root}/v2/pjm/workitems/63761fee31caaf77189816b4",
        "short_id": "c9WqLmTO",
        "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
        "whole_identifier": "WTF-5",
        "title": "这是一个阶段",
        "start": {
          "date": 1583290309,
          "with_time": 1
        },
        "due": {
          "date": 1583290347,
          "with_time": 1
        },
        "parent_id": "5edca524cad2fa1125cb0629",
        "properties": {
          "prop_a": "prop_a_value",
          "prop_b": "prop_b_value"
        }
      },
      "created_at": 1668685806,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "updated_at": 1668685806,
      "updated_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "is_archived": 0,
      "is_deleted": 0
    },
    {
      "id": "63761fee31caaf7718981877",
      "url": "https://{rest_api_root}/v2/pjm/deliverable_targets/63761fee31caaf7718981877",
      "name": "缺陷交付目标",
      "deliverable": {
        "id": "63761fee31caaf7718981879",
        "url": "https://{rest_api_root}/v2/pjm/deliverables/63761fee31caaf7718981879",
        "content_type": "file",
        "content": {
          "id": "64abd9050461799795b6ea3e",
          "url": "https://{rest_api_root}/v2/attachments/64abd9050461799795b6ea3e?principal_type=deliverable_target&principal_id=63761fee31caaf7718981877",
          "title": "fixed.png",
          "size": 11396,
          "type": "file"
        }
      },
      "project": {
        "id": "6375cc81e3004de4ea14aa52",
        "url": "https://{rest_api_root}/v2/pjm/projects/6375cc81e3004de4ea14aa52",
        "identifier": "WTF",
        "name": "瀑布项目",
        "template_type": "waterfall",
        "is_archived": 0,
        "is_deleted": 0
      },
      "workitem": {
        "id": "63761fee31caaf77189816b5",
        "url": "https://{rest_api_root}/v2/pjm/workitems/63761fee31caaf77189816b5",
        "short_id": "c9WqLmTO",
        "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
        "whole_identifier": "WTF-6",
        "title": "这是一个缺陷",
        "start": {
          "date": 1583290319,
          "with_time": 1
        },
        "due": {
          "date": 1583290357,
          "with_time": 1
        },
        "parent_id": "5edca524cad2fa1125cb0623",
        "properties": {
          "prop_a": "prop_a_value",
          "prop_b": "prop_b_value"
        }
      },
      "created_at": 1668685816,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "updated_at": 1668685816,
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

<a id="delete-v2-pjm-deliverable-targets-deliverable-target-id"></a>

### 删除一个工作项交付目标

`DELETE /v2/pjm/deliverable_targets/{deliverable_target_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:workitem`

用于按 id 删除一个工作项交付目标。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `deliverable_target_id` | string | 是 | 工作项交付目标的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项交付目标的 id |
| `url` | string | 是 | 工作项交付目标的地址 |
| `name` | string | 是 | 工作项交付目标的名称 |
| `deliverable` | object | 是 | 工作项交付物的引用结构数据 |
| `deliverable.id` | string |  |  |
| `deliverable.url` | string |  |  |
| `deliverable.content_type` | string |  |  |
| `deliverable.content` | object |  |  |
| `deliverable.content.name` | string |  |  |
| `deliverable.content.href` | string |  |  |
| `project` | object | 是 | 所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `workitem` | object | 是 | 所属工作项的引用结构数据 |
| `workitem.id` | string |  |  |
| `workitem.url` | string |  |  |
| `workitem.short_id` | string |  |  |
| `workitem.html_url` | string |  |  |
| `workitem.whole_identifier` | string |  |  |
| `workitem.title` | string |  |  |
| `workitem.start` | object |  |  |
| `workitem.start.date` | number |  |  |
| `workitem.start.with_time` | number |  |  |
| `workitem.due` | object |  |  |
| `workitem.due.date` | number |  |  |
| `workitem.due.with_time` | number |  |  |
| `workitem.parent_id` | string |  |  |
| `workitem.properties` | object |  |  |
| `workitem.properties.prop_a` | string |  |  |
| `workitem.properties.prop_b` | string |  |  |
| `created_at` | number | 是 | 工作项交付目标的创建时间 |
| `created_by` | object | 是 | 创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 工作项交付目标的更新时间 |
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
  "id": "63761fee31caaf7718981876",
  "url": "https://{rest_api_root}/v2/pjm/deliverable_targets/63761fee31caaf7718981876",
  "name": "阶段交付目标",
  "deliverable": {
    "id": "63761fee31caaf7718981878",
    "url": "https://{rest_api_root}/v2/pjm/deliverables/63761fee31caaf7718981878",
    "content_type": "link",
    "content": {
      "name": "PingCode",
      "href": "https://www.pingcode.com"
    }
  },
  "project": {
    "id": "6375cc81e3004de4ea14aa52",
    "url": "https://{rest_api_root}/v2/pjm/projects/6375cc81e3004de4ea14aa52",
    "identifier": "WTF",
    "name": "瀑布项目",
    "template_type": "waterfall",
    "is_archived": 0,
    "is_deleted": 0
  },
  "workitem": {
    "id": "63761fee31caaf77189816b4",
    "url": "https://{rest_api_root}/v2/pjm/workitems/63761fee31caaf77189816b4",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "whole_identifier": "WTF-5",
    "title": "这是一个阶段",
    "start": {
      "date": 1583290309,
      "with_time": 1
    },
    "due": {
      "date": 1583290347,
      "with_time": 1
    },
    "parent_id": "5edca524cad2fa1125cb0629",
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  },
  "created_at": 1668685806,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "updated_at": 1668685806,
  "updated_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "is_archived": 0,
  "is_deleted": 1
}
```

<a id="post-v2-pjm-deliverables"></a>

### 提交一个工作项交付物

`POST /v2/pjm/deliverables` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:workitem`

用于向工作项交付目标提交一个交付物。  
提交 `文件` 时使用 `multipart/form-data`；提交 `页面/链接` 时使用 `application/json`。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `deliverable_target_id` | string | 是 | 工作项交付目标的 id |

**请求头**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `content-type` | string | 是 | 提交 `文件` 时为 `multipart/form-data`；提交 `页面/链接` 时为 `application/json` |

**请求体**（`multipart/form-data`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `content_type` | string |  | 交付物的类型。提交 `页面/链接` 时使用此属性；枚举："page" / "link" |
| `content` | string \| object |  | 交付物内容。提交 `页面/链接` 时使用此属性。当类型为 `page` 时为页面 `id`；当类型为 `link` 时为包含 `name`、`href` 的对象 |
| `content.name` | string |  |  |
| `content.href` | string |  |  |
| `file` | string (binary) |  | 交付物文件。提交 `文件` 时使用此属性 |

**请求示例 1：请求示例（页面）**

```json
{
  "content_type": "page",
  "content": "5da588ca84c7377a5d327e6c"
}
```

**请求示例 2：请求示例（链接）**

```json
{
  "content_type": "link",
  "content": {
    "name": "PingCode",
    "href": "https://www.pingcode.com"
  }
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 交付物的 id |
| `url` | string | 是 | 交付物的地址 |
| `content_type` | string | 是 | 交付物的类型；枚举："file" / "page" / "link" |
| `content` | object | 是 | 交付物的内容。类型为 `file` 时为附件引用结构数据；类型为 `page` 时为包含 `id`、`version_id` 的对象；类型为 `link` 时为包含 `name`、`href` 的对象 |
| `content.id` | string |  |  |
| `content.url` | string |  |  |
| `content.title` | string |  |  |
| `content.size` | number |  |  |
| `content.type` | string |  |  |
| `content.version_id` | string |  |  |
| `content.name` | string |  |  |
| `content.href` | string |  |  |

**响应示例 1：响应示例（文件）**

```json
{
  "id": "63761fee31caaf7718981878",
  "url": "https://{rest_api_root}/v2/pjm/deliverables/63761fee31caaf7718981878",
  "content_type": "file",
  "content": {
    "id": "5da588ca84c7377a5d327e6c",
    "url": "https://{rest_api_root}/v2/attachments/5da588ca84c7377a5d327e6c?principal_type=deliverable_target&principal_id=63761fee31caaf7718981876",
    "title": "这是一个图片类型的附件",
    "size": 1024,
    "type": "file"
  }
}
```

**响应示例 2：响应示例（页面）**

```json
{
  "id": "63761fee31caaf7718981878",
  "url": "https://{rest_api_root}/v2/pjm/deliverables/63761fee31caaf7718981878",
  "content_type": "page",
  "content": {
    "id": "5da588ca84c7377a5d327e6c",
    "version_id": "5da588ca84c7377a5d327e6d"
  }
}
```

**响应示例 3：响应示例（链接）**

```json
{
  "id": "63761fee31caaf7718981878",
  "url": "https://{rest_api_root}/v2/pjm/deliverables/63761fee31caaf7718981878",
  "content_type": "link",
  "content": {
    "name": "PingCode",
    "href": "https://www.pingcode.com"
  }
}
```

<a id="get-v2-pjm-deliverables-deliverable-id"></a>

### 获取一个工作项交付物

`GET /v2/pjm/deliverables/{deliverable_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:workitem`

用于按 id 获取已提交的工作项交付物全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `deliverable_id` | string | 是 | 交付物的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 交付物的 id |
| `url` | string | 是 | 交付物的地址 |
| `content_type` | string | 是 | 交付物的类型；枚举："file" / "page" / "link" |
| `content` | object | 是 | 交付物的内容。类型为 `file` 时为附件引用结构数据；类型为 `page` 时为包含 `id`、`version_id` 的对象；类型为 `link` 时为包含 `name`、`href` 的对象 |
| `content.id` | string |  |  |
| `content.url` | string |  |  |
| `content.title` | string |  |  |
| `content.size` | number |  |  |
| `content.type` | string |  |  |
| `content.version_id` | string |  |  |
| `content.name` | string |  |  |
| `content.href` | string |  |  |

**响应示例 1：响应示例（文件）**

```json
{
  "id": "63761fee31caaf7718981878",
  "url": "https://{rest_api_root}/v2/pjm/deliverables/63761fee31caaf7718981878",
  "content_type": "file",
  "content": {
    "id": "5da588ca84c7377a5d327e6c",
    "url": "https://{rest_api_root}/v2/attachments/5da588ca84c7377a5d327e6c?principal_type=deliverable_target&principal_id=63761fee31caaf7718981876",
    "title": "这是一个图片类型的附件",
    "size": 1024,
    "type": "file"
  }
}
```

**响应示例 2：响应示例（页面）**

```json
{
  "id": "63761fee31caaf7718981878",
  "url": "https://{rest_api_root}/v2/pjm/deliverables/63761fee31caaf7718981878",
  "content_type": "page",
  "content": {
    "id": "5da588ca84c7377a5d327e6c",
    "version_id": "5da588ca84c7377a5d327e6d"
  }
}
```

**响应示例 3：响应示例（链接）**

```json
{
  "id": "63761fee31caaf7718981878",
  "url": "https://{rest_api_root}/v2/pjm/deliverables/63761fee31caaf7718981878",
  "content_type": "link",
  "content": {
    "name": "PingCode",
    "href": "https://www.pingcode.com"
  }
}
```

## 发布

> 分组路径：项目管理 / 发布

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/pjm/releases` | [创建一个发布](#post-v2-pjm-releases) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/releases/bulk/create` | [批量创建发布](#post-v2-pjm-releases-bulk-create) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/releases/{release_id}` | [获取一个发布](#get-v2-pjm-releases-release-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/pjm/releases/{release_id}` | [部分更新一个发布](#patch-v2-pjm-releases-release-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/releases` | [获取发布列表](#get-v2-pjm-releases) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/pjm/releases/{release_id}` | [删除一个发布](#delete-v2-pjm-releases-release-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/release/release_stages` | [获取可用的发布阶段列表](#get-v2-pjm-release-release-stages) | 企业令牌 / 用户令牌 |

<a id="post-v2-pjm-releases"></a>

### 创建一个发布

`POST /v2/pjm/releases` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:release`

用于创建一个发布。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |
| `name` | string | 是 | 发布的名称。同一项目下该名称是唯一的 |
| `start` | object | 是 | 发布的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `published_at` | object | 是 | 发布的时间 |
| `published_at.date` | number |  |  |
| `published_at.with_time` | number |  |  |
| `assignee_id` | string | 是 | 负责人的 id |
| `stage_id` | string |  | 发布阶段的 id |
| `category_ids` | string[] |  | 发布类别 id 数组 |

**请求示例**

```json
{
  "project_id": "5eb623f6a70571487ea47000",
  "name": "1.0.0",
  "start": {
    "date": 1565193600,
    "with_time": 0
  },
  "published_at": {
    "date": 1566403200,
    "with_time": 0
  },
  "assignee_id": "a0417f68e846aae315c85d24643678a9",
  "stage_id": "5f44a8f8bb347b14b49624a1",
  "category_ids": [
    "676a460a0fd987b7ea320889"
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 发布的 id |
| `url` | string | 是 | 发布的地址 |
| `project` | object | 是 | 发布所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.template_type` | string |  |  |
| `project.name` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `name` | string | 是 | 发布的名称 |
| `start` | object | 是 | 发布的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `published_at` | object | 是 | 发布的时间 |
| `published_at.date` | number |  |  |
| `published_at.with_time` | number |  |  |
| `stage` | object | 是 | 发布的当前阶段 |
| `stage.id` | string |  |  |
| `stage.url` | string |  |  |
| `stage.name` | string |  |  |
| `stage.type` | string |  |  |
| `stage.color` | string |  |  |
| `assignee` | object | 是 | 发布负责人的引用结构数据 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `stage_transitions` | object[] | 是 | 发布的阶段流转列表 |
| `stage_transitions[].stage` | object |  |  |
| `stage_transitions[].stage.id` | string |  |  |
| `stage_transitions[].stage.url` | string |  |  |
| `stage_transitions[].stage.name` | string |  |  |
| `stage_transitions[].stage.type` | string |  |  |
| `stage_transitions[].stage.color` | string |  |  |
| `stage_transitions[].operated_at` | null |  |  |
| `progress` | number | 是 | 发布的进度 |
| `changelog` | string | 是 | 发布的发布日志 |
| `categories` | object[] | 是 | 发布的类别列表 |
| `categories[].id` | string |  |  |
| `categories[].url` | string |  |  |
| `categories[].name` | string |  |  |
| `created_at` | number | 是 | 发布的创建时间 |
| `created_by` | object | 是 | 发布创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 发布的更新时间 |
| `updated_by` | object | 是 | 发布更新人的引用结构数据 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5eb623f6a70571487ea47001",
  "url": "https://{rest_api_root}/v2/pjm/releases/5eb623f6a70571487ea47001",
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "template_type": "scrum",
    "name": "Scrum 项目",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "1.0.0",
  "start": {
    "date": 1565193600,
    "with_time": 0
  },
  "published_at": {
    "date": 1566403200,
    "with_time": 0
  },
  "stage": {
    "id": "5f44a8f8bb347b14b49624a1",
    "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a1",
    "name": "未开始",
    "type": "pending",
    "color": "#FA8888"
  },
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "stage_transitions": [
    {
      "stage": {
        "id": "5f44a8f8bb347b14b49624a1",
        "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a1",
        "name": "未开始",
        "type": "pending",
        "color": "#FA8888"
      },
      "operated_at": null
    },
    {
      "stage": {
        "id": "5f44a8f8bb347b14b49624a2",
        "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a2",
        "name": "进行中",
        "type": "in_progress",
        "color": "#56ABFB"
      },
      "operated_at": null
    },
    {
      "stage": {
        "id": "5f44a8f8bb347b14b49624a3",
        "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a3",
        "name": "已发布",
        "type": "published",
        "color": "#73D897"
      },
      "operated_at": null
    }
  ],
  "progress": 0,
  "changelog": null,
  "categories": [
    {
      "id": "676a460a0fd987b7ea320889",
      "url": "https://{rest_api_root}/v2/categories/676a460a0fd987b7ea320889?entity_type=release",
      "name": "私有部署发布"
    }
  ],
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
  },
  "is_deleted": 0
}
```

<a id="post-v2-pjm-releases-bulk-create"></a>

### 批量创建发布

`POST /v2/pjm/releases/bulk/create` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:release`

用于批量创建发布，单次最多支持 100 条。  
接口支持部分成功，单条失败不会影响其他条目，已成功的数据不会回滚。  
响应按请求条目顺序返回对应结果，通过 `state`（`success` / `failure`）判断操作结果，失败时通过 `message` 返回失败原因。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `releases` | object | 是 | 需要批量创建的发布。该参数是一个对象数组（数组内对象不得超过 100 个） |
| `releases.project_id` | string | 是 | 发布所属项目的 id |
| `releases.name` | string | 是 | 发布的名称 |
| `releases.start` | object | 是 | 发布的开始时间 |
| `releases.published_at` | object | 是 | 发布的时间 |
| `releases.assignee_id` | string |  | 发布负责人的 id |
| `releases.stage_id` | string |  | 发布阶段的 id |
| `releases.category_ids` | string[] |  | 发布类别的 id 列表 |

**请求示例**

```json
{
  "releases": [
    {
      "project_id": "5eb623f6a70571487ea47000",
      "name": "1.0.0",
      "start": {
        "date": 1565193600,
        "with_time": 0
      },
      "published_at": {
        "date": 1566403200,
        "with_time": 0
      },
      "assignee_id": "a0417f68e846aae315c85d24643678a9",
      "stage_id": "5f44a8f8bb347b14b49624a1",
      "category_ids": [
        "676a460a0fd987b7ea320889"
      ]
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
    "release": {
      "id": "5eb623f6a70571487ea47001",
      "url": "https://{rest_api_root}/v2/pjm/releases/5eb623f6a70571487ea47001",
      "project": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
        "identifier": "SCR",
        "template_type": "scrum",
        "name": "Scrum 项目",
        "is_archived": 0,
        "is_deleted": 0
      },
      "name": "1.0.0",
      "start": {
        "date": 1565193600,
        "with_time": 0
      },
      "published_at": {
        "date": 1566403200,
        "with_time": 0
      },
      "stage": {
        "id": "5f44a8f8bb347b14b49624a1",
        "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a1",
        "name": "未开始",
        "type": "pending",
        "color": "#FA8888"
      },
      "assignee": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "stage_transitions": [
        {
          "stage": {
            "id": "5f44a8f8bb347b14b49624a1",
            "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a1",
            "name": "未开始",
            "type": "pending",
            "color": "#FA8888"
          },
          "operated_at": null
        },
        {
          "stage": {
            "id": "5f44a8f8bb347b14b49624a2",
            "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a2",
            "name": "进行中",
            "type": "in_progress",
            "color": "#56ABFB"
          },
          "operated_at": null
        },
        {
          "stage": {
            "id": "5f44a8f8bb347b14b49624a3",
            "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a3",
            "name": "已发布",
            "type": "published",
            "color": "#73D897"
          },
          "operated_at": null
        }
      ],
      "progress": 0,
      "changelog": null,
      "categories": [
        {
          "id": "676a460a0fd987b7ea320889",
          "url": "https://{rest_api_root}/v2/categories/676a460a0fd987b7ea320889?entity_type=release",
          "name": "私有部署发布"
        }
      ],
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
      },
      "is_deleted": 0
    }
  }
]
```

<a id="get-v2-pjm-releases-release-id"></a>

### 获取一个发布

`GET /v2/pjm/releases/{release_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:release`

用于按 id 获取发布全量信息。默认不含已删除项。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `release_id` | string | 是 | 发布的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的发布。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 发布的 id |
| `url` | string | 是 | 发布的地址 |
| `project` | object | 是 | 发布所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.template_type` | string |  |  |
| `project.name` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `name` | string | 是 | 发布的名称 |
| `start` | object | 是 | 发布的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `published_at` | object | 是 | 发布的时间 |
| `published_at.date` | number |  |  |
| `published_at.with_time` | number |  |  |
| `stage` | object | 是 | 发布的当前阶段 |
| `stage.id` | string |  |  |
| `stage.url` | string |  |  |
| `stage.name` | string |  |  |
| `stage.type` | string |  |  |
| `stage.color` | string |  |  |
| `assignee` | object | 是 | 发布负责人的引用结构数据 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `stage_transitions` | object[] | 是 | 发布的阶段流转列表 |
| `stage_transitions[].stage` | object |  |  |
| `stage_transitions[].stage.id` | string |  |  |
| `stage_transitions[].stage.url` | string |  |  |
| `stage_transitions[].stage.name` | string |  |  |
| `stage_transitions[].stage.type` | string |  |  |
| `stage_transitions[].stage.color` | string |  |  |
| `stage_transitions[].operated_at` | number |  |  |
| `progress` | number | 是 | 发布的进度 |
| `changelog` | string | 是 | 发布的发布日志 |
| `categories` | object[] | 是 | 发布的类别列表 |
| `categories[].id` | string |  |  |
| `categories[].url` | string |  |  |
| `categories[].name` | string |  |  |
| `created_at` | number | 是 | 发布的创建时间 |
| `created_by` | object | 是 | 发布的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 发布的更新时间 |
| `updated_by` | object | 是 | 发布的更新人 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5eb623f6a70571487ea47001",
  "url": "https://{rest_api_root}/v2/pjm/releases/5eb623f6a70571487ea47001",
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "template_type": "scrum",
    "name": "Scrum 项目",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "1.0.0",
  "start": {
    "date": 1565193600,
    "with_time": 0
  },
  "published_at": {
    "date": 1566403200,
    "with_time": 0
  },
  "stage": {
    "id": "5f44a8f8bb347b14b49624a1",
    "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a1",
    "name": "未开始",
    "type": "pending",
    "color": "#FA8888"
  },
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "stage_transitions": [
    {
      "stage": {
        "id": "5f44a8f8bb347b14b49624a1",
        "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a1",
        "name": "未开始",
        "type": "pending",
        "color": "#FA8888"
      },
      "operated_at": 1565366400
    }
  ],
  "progress": 0,
  "changelog": "发布日志",
  "categories": [
    {
      "id": "676a460a0fd987b7ea320889",
      "url": "https://{rest_api_root}/v2/categories/676a460a0fd987b7ea320889?entity_type=release",
      "name": "私有部署发布"
    }
  ],
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
  },
  "is_deleted": 0
}
```

<a id="patch-v2-pjm-releases-release-id"></a>

### 部分更新一个发布

`PATCH /v2/pjm/releases/{release_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:release`

用于部分更新一个发布。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `release_id` | string | 是 | 发布的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 发布的名称。同一项目下该名称是唯一的 |
| `start` | object |  | 发布的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `published_at` | object |  | 发布的时间 |
| `published_at.date` | number |  |  |
| `published_at.with_time` | number |  |  |
| `assignee_id` | string |  | 负责人的 id |
| `stage_id` | string |  | 发布阶段的 id |
| `stage_operated_at` | number |  | 发布阶段的日期。需要和 stage_id 一起传递 |
| `category_ids` | string[] |  | 发布类别 id 数组 |

**请求示例**

```json
{
  "name": "1.0.0",
  "start": {
    "date": 1565193600,
    "with_time": 0
  },
  "published_at": {
    "date": 1566403200,
    "with_time": 0
  },
  "assignee_id": "a0417f68e846aae315c85d24643678a9",
  "stage_id": "5f44a8f8bb347b14b49624a1",
  "stage_operated_at": 1565366400,
  "category_ids": [
    "676a460a0fd987b7ea320889"
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 发布的 id |
| `url` | string | 是 | 发布的地址 |
| `project` | object | 是 | 发布所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.template_type` | string |  |  |
| `project.name` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `name` | string | 是 | 发布的名称 |
| `start` | object | 是 | 发布的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `published_at` | object | 是 | 发布的时间 |
| `published_at.date` | number |  |  |
| `published_at.with_time` | number |  |  |
| `stage` | object | 是 | 发布的当前阶段 |
| `stage.id` | string |  |  |
| `stage.url` | string |  |  |
| `stage.name` | string |  |  |
| `stage.type` | string |  |  |
| `stage.color` | string |  |  |
| `assignee` | object | 是 | 发布负责人的引用结构数据 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `stage_transitions` | object[] | 是 | 发布的阶段流转列表 |
| `stage_transitions[].stage` | object |  |  |
| `stage_transitions[].stage.id` | string |  |  |
| `stage_transitions[].stage.url` | string |  |  |
| `stage_transitions[].stage.name` | string |  |  |
| `stage_transitions[].stage.type` | string |  |  |
| `stage_transitions[].stage.color` | string |  |  |
| `stage_transitions[].operated_at` | number \| null |  |  |
| `progress` | number | 是 | 发布的进度 |
| `changelog` | string | 是 | 发布的发布日志 |
| `categories` | object[] | 是 | 发布的类别列表 |
| `categories[].id` | string |  |  |
| `categories[].url` | string |  |  |
| `categories[].name` | string |  |  |
| `created_at` | number | 是 | 发布的创建时间 |
| `created_by` | object | 是 | 发布创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 发布的更新时间 |
| `updated_by` | object | 是 | 发布更新人的引用结构数据 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5eb623f6a70571487ea47001",
  "url": "https://{rest_api_root}/v2/pjm/releases/5eb623f6a70571487ea47001",
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "template_type": "scrum",
    "name": "Scrum 项目",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "1.0.0",
  "start": {
    "date": 1565193600,
    "with_time": 0
  },
  "published_at": {
    "date": 1566403200,
    "with_time": 0
  },
  "stage": {
    "id": "5f44a8f8bb347b14b49624a1",
    "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a1",
    "name": "未开始",
    "type": "pending",
    "color": "#FA8888"
  },
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "stage_transitions": [
    {
      "stage": {
        "id": "5f44a8f8bb347b14b49624a1",
        "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a1",
        "name": "未开始",
        "type": "pending",
        "color": "#FA8888"
      },
      "operated_at": 1565366400
    },
    {
      "stage": {
        "id": "5f44a8f8bb347b14b49624a2",
        "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a2",
        "name": "进行中",
        "type": "in_progress",
        "color": "#56ABFB"
      },
      "operated_at": null
    },
    {
      "stage": {
        "id": "5f44a8f8bb347b14b49624a3",
        "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a3",
        "name": "已发布",
        "type": "published",
        "color": "#73D897"
      },
      "operated_at": null
    }
  ],
  "progress": 0,
  "changelog": "发布日志",
  "categories": [
    {
      "id": "676a460a0fd987b7ea320889",
      "url": "https://{rest_api_root}/v2/categories/676a460a0fd987b7ea320889?entity_type=release",
      "name": "私有部署发布"
    }
  ],
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
  },
  "is_deleted": 0
}
```

<a id="get-v2-pjm-releases"></a>

### 获取发布列表

`GET /v2/pjm/releases` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:release`

用于分页获取发布列表。默认不含已删除项。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |
| `name` | string |  | 发布的名字 |
| `status` | string |  | 发布的状态；枚举："pending" / "in_progress" / "published" |
| `created_between` | string |  | 创建时间介于的时间范围，通过','分割起始时间 |
| `updated_between` | string |  | 更新时间介于的时间范围，通过','分割起始时间 |
| `include_deleted` | boolean |  | 是否包含已删除的发布。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 发布全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].project` | object |  |  |
| `values[].project.id` | string |  |  |
| `values[].project.url` | string |  |  |
| `values[].project.identifier` | string |  |  |
| `values[].project.template_type` | string |  |  |
| `values[].project.name` | string |  |  |
| `values[].project.is_archived` | number |  |  |
| `values[].project.is_deleted` | number |  |  |
| `values[].name` | string |  |  |
| `values[].start` | object |  |  |
| `values[].start.date` | number |  |  |
| `values[].start.with_time` | number |  |  |
| `values[].published_at` | object |  |  |
| `values[].published_at.date` | number |  |  |
| `values[].published_at.with_time` | number |  |  |
| `values[].stage` | object |  |  |
| `values[].stage.id` | string |  |  |
| `values[].stage.url` | string |  |  |
| `values[].stage.name` | string |  |  |
| `values[].stage.type` | string |  |  |
| `values[].stage.color` | string |  |  |
| `values[].assignee` | object |  |  |
| `values[].assignee.id` | string |  |  |
| `values[].assignee.url` | string |  |  |
| `values[].assignee.name` | string |  |  |
| `values[].assignee.display_name` | string |  |  |
| `values[].assignee.avatar` | string |  |  |
| `values[].stage_transitions` | object[] |  |  |
| `values[].stage_transitions[].stage` | object |  |  |
| `values[].stage_transitions[].stage.id` | string |  |  |
| `values[].stage_transitions[].stage.url` | string |  |  |
| `values[].stage_transitions[].stage.name` | string |  |  |
| `values[].stage_transitions[].stage.type` | string |  |  |
| `values[].stage_transitions[].stage.color` | string |  |  |
| `values[].stage_transitions[].operated_at` | number |  |  |
| `values[].progress` | number |  |  |
| `values[].changelog` | string |  |  |
| `values[].categories` | object[] |  |  |
| `values[].categories[].id` | string |  |  |
| `values[].categories[].url` | string |  |  |
| `values[].categories[].name` | string |  |  |
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
| `values[].is_deleted` | number |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5eb623f6a70571487ea47001",
      "url": "https://{rest_api_root}/v2/pjm/releases/5eb623f6a70571487ea47001",
      "project": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
        "identifier": "SCR",
        "template_type": "scrum",
        "name": "Scrum 项目",
        "is_archived": 0,
        "is_deleted": 0
      },
      "name": "1.0.0",
      "start": {
        "date": 1565193600,
        "with_time": 0
      },
      "published_at": {
        "date": 1566403200,
        "with_time": 0
      },
      "stage": {
        "id": "5f44a8f8bb347b14b49624a1",
        "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a1",
        "name": "未开始",
        "type": "pending",
        "color": "#FA8888"
      },
      "assignee": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "stage_transitions": [
        {
          "stage": {
            "id": "5f44a8f8bb347b14b49624a1",
            "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a1",
            "name": "未开始",
            "type": "pending",
            "color": "#FA8888"
          },
          "operated_at": 1565366400
        },
        {
          "stage": {
            "id": "5f44a8f8bb347b14b49624a2",
            "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a2",
            "name": "进行中",
            "type": "in_progress",
            "color": "#56ABFB"
          },
          "operated_at": 1565366400
        },
        {
          "stage": {
            "id": "5f44a8f8bb347b14b49624a3",
            "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a3",
            "name": "已发布",
            "type": "published",
            "color": "#73D897"
          },
          "operated_at": 1565366400
        }
      ],
      "progress": 0,
      "changelog": "发布日志",
      "categories": [
        {
          "id": "676a460a0fd987b7ea320889",
          "url": "https://{rest_api_root}/v2/categories/676a460a0fd987b7ea320889?entity_type=release",
          "name": "私有部署发布"
        }
      ],
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
      },
      "is_deleted": 0
    }
  ]
}
```

<a id="delete-v2-pjm-releases-release-id"></a>

### 删除一个发布

`DELETE /v2/pjm/releases/{release_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:release`

用于删除一个发布。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `release_id` | string | 是 | 发布的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 发布的 id |
| `url` | string | 是 | 发布的地址 |
| `project` | object | 是 | 发布所属项目的引用结构数据 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.template_type` | string |  |  |
| `project.name` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |
| `name` | string | 是 | 发布的名称 |
| `start` | object | 是 | 发布的开始时间 |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `published_at` | object | 是 | 发布的时间 |
| `published_at.date` | number |  |  |
| `published_at.with_time` | number |  |  |
| `stage` | object | 是 | 发布的当前阶段 |
| `stage.id` | string |  |  |
| `stage.url` | string |  |  |
| `stage.name` | string |  |  |
| `stage.type` | string |  |  |
| `stage.color` | string |  |  |
| `assignee` | object | 是 | 发布负责人的引用结构数据 |
| `assignee.id` | string |  |  |
| `assignee.url` | string |  |  |
| `assignee.name` | string |  |  |
| `assignee.display_name` | string |  |  |
| `assignee.avatar` | string |  |  |
| `stage_transitions` | object[] | 是 | 发布的阶段流转列表 |
| `stage_transitions[].stage` | object |  |  |
| `stage_transitions[].stage.id` | string |  |  |
| `stage_transitions[].stage.url` | string |  |  |
| `stage_transitions[].stage.name` | string |  |  |
| `stage_transitions[].stage.type` | string |  |  |
| `stage_transitions[].stage.color` | string |  |  |
| `stage_transitions[].operated_at` | null |  |  |
| `progress` | number | 是 | 发布的进度 |
| `changelog` | string | 是 | 发布的发布日志 |
| `categories` | object[] | 是 | 发布的类别列表 |
| `categories[].id` | string |  |  |
| `categories[].url` | string |  |  |
| `categories[].name` | string |  |  |
| `created_at` | number | 是 | 发布的创建时间 |
| `created_by` | object | 是 | 发布创建人的引用结构数据 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 发布的更新时间 |
| `updated_by` | object | 是 | 发布更新人的引用结构数据 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5eb623f6a70571487ea47001",
  "url": "https://{rest_api_root}/v2/pjm/releases/5eb623f6a70571487ea47001",
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "template_type": "scrum",
    "name": "Scrum 项目",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "1.0.0",
  "start": {
    "date": 1565193600,
    "with_time": 0
  },
  "published_at": {
    "date": 1566403200,
    "with_time": 0
  },
  "stage": {
    "id": "5f44a8f8bb347b14b49624a1",
    "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a1",
    "name": "未开始",
    "type": "pending",
    "color": "#FA8888"
  },
  "assignee": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "stage_transitions": [
    {
      "stage": {
        "id": "5f44a8f8bb347b14b49624a1",
        "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a1",
        "name": "未开始",
        "type": "pending",
        "color": "#FA8888"
      },
      "operated_at": null
    },
    {
      "stage": {
        "id": "5f44a8f8bb347b14b49624a2",
        "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a2",
        "name": "进行中",
        "type": "in_progress",
        "color": "#56ABFB"
      },
      "operated_at": null
    },
    {
      "stage": {
        "id": "5f44a8f8bb347b14b49624a3",
        "url": "https://{rest_api_root}/v2/pjm/release_stages/5f44a8f8bb347b14b49624a3",
        "name": "已发布",
        "type": "published",
        "color": "#73D897"
      },
      "operated_at": null
    }
  ],
  "progress": 0,
  "changelog": null,
  "categories": [
    {
      "id": "676a460a0fd987b7ea320889",
      "url": "https://{rest_api_root}/v2/categories/676a460a0fd987b7ea320889?entity_type=release",
      "name": "私有部署发布"
    }
  ],
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
  },
  "is_deleted": 0
}
```

<a id="get-v2-pjm-release-release-stages"></a>

### 获取可用的发布阶段列表

`GET /v2/pjm/release/release_stages` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:release`

用于分页获取项目中可用的发布阶段。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_id` | string | 是 | 项目的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 发布阶段的引用结构数据的数组 |
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
      "id": "5c9b35de90ad7153c2062f18",
      "url": "https://{rest_api_root}/v2/pjm/release_stages/5c9b35de90ad7153c2062f18",
      "name": "新建",
      "type": "pending",
      "color": "#ff7575"
    }
  ]
}
```

## 项目配置

> 分组路径：项目管理 / 项目配置中心 / 项目配置

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `GET` | `/v2/pjm/project_states/{project_state_id}` | [获取一个项目状态](#get-v2-pjm-project-states-project-state-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/project_states` | [获取全部项目状态列表](#get-v2-pjm-project-states) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/project_properties` | [创建一个项目属性](#post-v2-pjm-project-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/project_properties/{project_property_id}` | [获取一个项目属性](#get-v2-pjm-project-properties-project-property-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/pjm/project_properties/{project_property_id}` | [部分更新一个项目属性](#patch-v2-pjm-project-properties-project-property-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/project_properties` | [获取项目属性列表](#get-v2-pjm-project-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/project_templates/{template_id}` | [获取一个项目流程模版](#get-v2-pjm-project-templates-template-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/project_templates` | [获取全部项目流程模版列表](#get-v2-pjm-project-templates) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/tags` | [创建一个项目标签](#post-v2-pjm-tags) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/tags/{tag_id}` | [获取一个项目标签](#get-v2-pjm-tags-tag-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/pjm/tags/{tag_id}` | [部分更新一个项目标签](#patch-v2-pjm-tags-tag-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/tags` | [获取全部项目标签列表](#get-v2-pjm-tags) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/pjm/tags/{tag_id}` | [删除一个项目标签](#delete-v2-pjm-tags-tag-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/release_stages` | [创建一个发布阶段](#post-v2-pjm-release-stages) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/release_stages/{release_stage_id}` | [获取一个发布阶段](#get-v2-pjm-release-stages-release-stage-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/pjm/release_stages/{release_stage_id}` | [部分更新一个发布阶段](#patch-v2-pjm-release-stages-release-stage-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/release_stages` | [获取发布阶段列表](#get-v2-pjm-release-stages) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/pjm/release_stages/{release_stage_id}` | [删除一个发布阶段](#delete-v2-pjm-release-stages-release-stage-id) | 企业令牌 / 用户令牌 |

<a id="get-v2-pjm-project-states-project-state-id"></a>

### 获取一个项目状态

`GET /v2/pjm/project_states/{project_state_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于按 id 获取项目状态全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_state_id` | string | 是 | 项目状态的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 项目状态的 id |
| `url` | string | 是 | 项目状态的地址 |
| `name` | string | 是 | 项目状态的名称 |
| `type` | string | 是 | 项目状态的类型 |

**响应示例**

```json
{
  "id": "66cbf5401e7cc374c85acb1b",
  "url": "https://{rest_api_root}/v2/pjm/project_states/66cbf5401e7cc374c85acb1b",
  "name": "未开始",
  "type": "pending"
}
```

<a id="get-v2-pjm-project-states"></a>

### 获取全部项目状态列表

`GET /v2/pjm/project_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于分页获取企业内全部项目状态。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 项目状态的全量结构数据的数组 |
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
      "id": "66cbf5401e7cc374c85acb1b",
      "url": "https://{rest_api_root}/v2/pjm/project_states/66cbf5401e7cc374c85acb1b",
      "name": "未开始",
      "type": "pending",
      "color": "#56ABFB"
    }
  ]
}
```

<a id="post-v2-pjm-project-properties"></a>

### 创建一个项目属性

`POST /v2/pjm/project_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于创建一个项目属性。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 项目属性的名称。在一个企业中这个名称是唯一的 |
| `type` | string | 是 | 项目属性的类型；枚举："text" / "textarea" / "select" / "multi_select" / "cascade_select" / "cascade_multi_select" / "member" / "members" / "date" / "number" / "progress" / "rate" / "link" / "referred_select" / "referred_multi_select" |
| `referred_object_type` | string |  | 引用对象的类型，当属性类型为 referred_select,referred_multi_select 时必填。用于限定该属性值是哪种数据类型的 id 或 id 数组；枚举："product" / "project" / "library" / "space" |
| `options` | object |  | 选择项列表。当属性类型为 `select,multi_select,cascade_select,cascade_multi_select` 时可选填此项 |
| `options.id` | string |  | 选择项 id。该值在选择项中是唯一的 |
| `options.text` | string | 是 | 选择项内容。该值在选择项中是唯一的 |
| `options.parent_id` | string |  | 选择项父级 id。当属性类型为 `cascade_select,cascade_multi_select` 时，`parent_id` 参数有效，用于构建级联类型选择项之间的父子关系，最多存在 4 级 |

**请求示例**

```json
{
  "name": "项目风险",
  "type": "select",
  "options": [
    {
      "text": "高"
    },
    {
      "id": "5efb1859110533727a82c604",
      "text": "中"
    },
    {
      "id": "5efb1859110533727a82c605",
      "text": "低"
    }
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 项目属性的 id |
| `url` | string | 是 | 项目属性的地址 |
| `name` | string | 是 | 项目属性的名称 |
| `type` | string | 是 | 项目属性的类型 |
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
  "id": "risk",
  "url": "https://{rest_api_root}/v2/pjm/project_properties/risk",
  "name": "项目风险",
  "type": "select",
  "options": [
    {
      "id": "5efb1859110533727a82c603",
      "text": "高",
      "color": "#FF7575"
    },
    {
      "id": "5efb1859110533727a82c604",
      "text": "中",
      "color": "#FF7575"
    },
    {
      "id": "5efb1859110533727a82c605",
      "text": "低",
      "color": "#FF7575"
    }
  ],
  "is_removable": 0,
  "is_name_editable": 0,
  "is_options_editable": 0
}
```

<a id="get-v2-pjm-project-properties-project-property-id"></a>

### 获取一个项目属性

`GET /v2/pjm/project_properties/{project_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于按 id 获取项目属性全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_property_id` | string | 是 | 项目属性的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 项目属性的 id |
| `url` | string | 是 | 项目属性的地址 |
| `name` | string | 是 | 项目属性的名称 |
| `type` | string | 是 | 项目属性的类型 |
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
  "id": "risk",
  "url": "https://{rest_api_root}/v2/pjm/project_properties/risk",
  "name": "项目风险",
  "type": "select",
  "options": [
    {
      "id": "5efb1859110533727a82c603",
      "text": "高",
      "color": "#FF7575"
    },
    {
      "id": "5efb1859110533727a82c604",
      "text": "中",
      "color": "#FF7575"
    },
    {
      "id": "5efb1859110533727a82c605",
      "text": "低",
      "color": "#FF7575"
    }
  ],
  "is_removable": 0,
  "is_name_editable": 0,
  "is_options_editable": 0
}
```

<a id="patch-v2-pjm-project-properties-project-property-id"></a>

### 部分更新一个项目属性

`PATCH /v2/pjm/project_properties/{project_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于部分更新一个项目属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `project_property_id` | string | 是 | 项目属性的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 项目属性的名称。在一个企业中这个名称是唯一的 |
| `referred_object_type` | string |  | 引用对象的类型，当属性类型为 referred_select,referred_multi_select 时必填。用于限定该属性值是哪种数据类型的 id 或 id 数组；枚举："product" / "project" / "library" / "space" |
| `options` | object |  | 选择项列表。`options` 是整体更新的 |
| `options.id` | string |  | 选择项的 `id`。如果 `option` 中不包含用于确定唯一性的 `id`，那么这个 `option` 将被视为新建，并为之创建新的 `id` |
| `options.text` | string | 是 | 选择项内容 |
| `options.parent_id` | string |  | 选择项父级 id。当属性类型为 `cascade_select,cascade_multi_select` 时，`parent_id` 参数有效，用于构建级联类型选择项之间的父子关系，最多存在 4 级 |

**请求示例**

```json
{
  "name": "项目规模",
  "options": [
    {
      "id": "5efb1859110533727a82c605",
      "text": "大"
    },
    {
      "text": "小"
    }
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 项目属性的 id |
| `url` | string | 是 | 项目属性的地址 |
| `name` | string | 是 | 项目属性的名称 |
| `type` | string | 是 | 项目属性的类型 |
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
  "id": "xiangmuguimo",
  "url": "https://{rest_api_root}/v2/pjm/project_properties/xiangmuguimo",
  "name": "项目规模",
  "type": "select",
  "options": [
    {
      "id": "5efb1859110533727a82c605",
      "text": "大",
      "color": "#FF7575"
    },
    {
      "id": "5efb1859110533727a82c606",
      "text": "小",
      "color": "#FF7575"
    }
  ],
  "is_removable": 1,
  "is_name_editable": 1,
  "is_options_editable": 1
}
```

<a id="get-v2-pjm-project-properties"></a>

### 获取项目属性列表

`GET /v2/pjm/project_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于分页获取企业内全部项目属性。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 项目属性全量结构数据的数组 |
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
      "id": "risk",
      "url": "https://{rest_api_root}/v2/pjm/project_properties/risk",
      "name": "项目风险",
      "type": "select",
      "options": [
        {
          "id": "5efb1859110533727a82c603",
          "text": "高",
          "color": "#FF7575"
        },
        {
          "id": "5efb1859110533727a82c604",
          "text": "中",
          "color": "#FF7575"
        },
        {
          "id": "5efb1859110533727a82c605",
          "text": "低",
          "color": "#FF7575"
        }
      ],
      "is_removable": 0,
      "is_name_editable": 0,
      "is_options_editable": 0
    },
    {
      "id": "name",
      "url": "https://{rest_api_root}/v2/pjm/project_properties/name",
      "name": "名称",
      "type": "text",
      "options": null,
      "is_removable": 0,
      "is_name_editable": 0,
      "is_options_editable": 0
    }
  ]
}
```

<a id="get-v2-pjm-project-templates-template-id"></a>

### 获取一个项目流程模版

`GET /v2/pjm/project_templates/{template_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于按 id 获取项目流程模版全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `template_id` | string | 是 | 项目流程模版的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 项目流程模版的 id |
| `url` | string | 是 | 项目流程模版的资源地址 |
| `name` | string | 是 | 项目流程模版的名称 |
| `type` | string | 是 | 项目流程模版的类型；枚举："scrum" / "kanban" / "waterfall" / "hybrid" |
| `description` | string | 是 | 项目流程模版的描述 |
| `is_system` | number | 是 | 是否为系统内置模版；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5fa690f1ae0571487ea49030",
  "url": "https://{rest_api_root}/v2/pjm/project_templates/5fa690f1ae0571487ea49030",
  "name": "Scrum 项目流程",
  "type": "scrum",
  "description": "Scrum 项目流程模版",
  "is_system": 1
}
```

<a id="get-v2-pjm-project-templates"></a>

### 获取全部项目流程模版列表

`GET /v2/pjm/project_templates` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于分页获取企业内全部项目流程模版。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 项目流程模版全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].type` | string |  |  |
| `values[].description` | string |  |  |
| `values[].is_system` | number |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5fa690f1ae0571487ea49030",
      "url": "https://{rest_api_root}/v2/pjm/project_templates/5fa690f1ae0571487ea49030",
      "name": "Scrum 项目流程",
      "type": "scrum",
      "description": "Scrum 项目流程模版",
      "is_system": 1
    }
  ]
}
```

<a id="post-v2-pjm-tags"></a>

### 创建一个项目标签

`POST /v2/pjm/tags` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于创建一个项目标签。传入 `project_id` 时创建指定项目下的标签；不传时创建企业级标签。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 标签的名称。在同一作用域内这个名称是唯一的 |
| `project_id` | string |  | 项目的 id |

**请求示例**

```json
{
  "name": "标签-1",
  "project_id": "5eb623f6a70571487ea41919"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 项目标签的 id |
| `url` | string | 是 | 项目标签的地址 |
| `name` | string | 是 | 项目标签的名称 |
| `color` | string | 是 | 项目标签的颜色 |
| `project` | object | 是 | 项目的引用结构数据。该标签是此项目的本地标签 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |

**响应示例**

```json
{
  "id": "5e6b35de50ef8153c2062f70",
  "url": "https://{rest_api_root}/v2/pjm/tags/5e6b35de50ef8153c2062f70",
  "name": "标签-1",
  "color": "#56ABFB",
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "KB",
    "name": "看板项目",
    "template_type": "kanban",
    "is_archived": 0,
    "is_deleted": 0
  }
}
```

<a id="get-v2-pjm-tags-tag-id"></a>

### 获取一个项目标签

`GET /v2/pjm/tags/{tag_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于按 id 获取项目标签全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `tag_id` | string | 是 | 项目标签的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 项目标签的 id |
| `url` | string | 是 | 项目标签的地址 |
| `name` | string | 是 | 项目标签的名称 |
| `color` | string | 是 | 项目标签的颜色 |
| `project` | object | 是 | 项目的引用结构数据。该标签是此项目的本地标签 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |

**响应示例 1：响应示例（全局标签）**

```json
{
  "id": "5e6b35de50ef8153c2062f71",
  "url": "https://{rest_api_root}/v2/pjm/tags/5e6b35de50ef8153c2062f71",
  "name": "标签-全局",
  "color": "#56ABFB",
  "project": null
}
```

**响应示例 2：响应示例（项目本地化标签）**

```json
{
  "id": "5e6b35de50ef8153c2062f70",
  "url": "https://{rest_api_root}/v2/pjm/tags/5e6b35de50ef8153c2062f70",
  "name": "标签-1",
  "color": "#56ABFB",
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "KB",
    "name": "看板项目",
    "template_type": "kanban",
    "is_archived": 0,
    "is_deleted": 0
  }
}
```

<a id="patch-v2-pjm-tags-tag-id"></a>

### 部分更新一个项目标签

`PATCH /v2/pjm/tags/{tag_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于部分更新一个项目标签。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `tag_id` | string | 是 | 标签的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 标签的名称。在一个企业中这个名称是唯一的 |

**请求示例**

```json
{
  "name": "标签-2"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 项目标签的 id |
| `url` | string | 是 | 项目标签的地址 |
| `name` | string | 是 | 项目标签的名称 |
| `color` | string | 是 | 项目标签的颜色 |
| `project` | object | 是 | 项目的引用结构数据。该标签是此项目的本地标签 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |

**响应示例**

```json
{
  "id": "5e6b35de50ef8153c2062f70",
  "url": "https://{rest_api_root}/v2/pjm/tags/5e6b35de50ef8153c2062f70",
  "name": "标签-2",
  "color": "#56ABFB",
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "KB",
    "name": "看板项目",
    "template_type": "kanban",
    "is_archived": 0,
    "is_deleted": 0
  }
}
```

<a id="get-v2-pjm-tags"></a>

### 获取全部项目标签列表

`GET /v2/pjm/tags` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于分页获取项目标签列表。传入 `project_id` 时获取指定项目下的标签；不传时获取全部标签。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 标签的名称 |
| `project_id` | string |  | 项目的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 项目标签的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].color` | string |  |  |
| `values[].project` | null \| object |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "5e6b35de50ef8153c2062f71",
      "url": "https://{rest_api_root}/v2/pjm/tags/5e6b35de50ef8153c2062f71",
      "name": "标签-全局",
      "color": "#56ABFB",
      "project": null
    },
    {
      "id": "5e6b35de50ef8153c2062f70",
      "url": "https://{rest_api_root}/v2/pjm/tags/5e6b35de50ef8153c2062f70",
      "name": "标签-2",
      "color": "#56ABFB",
      "project": {
        "id": "5eb623f6a70571487ea41919",
        "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
        "identifier": "KB",
        "name": "看板项目",
        "template_type": "kanban",
        "is_archived": 0,
        "is_deleted": 0
      }
    }
  ]
}
```

<a id="delete-v2-pjm-tags-tag-id"></a>

### 删除一个项目标签

`DELETE /v2/pjm/tags/{tag_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于删除一个项目标签。可删除企业级标签，也可删除项目下的标签。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `tag_id` | string | 是 | 标签的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 项目标签的 id |
| `url` | string | 是 | 项目标签的地址 |
| `name` | string | 是 | 项目标签的名称 |
| `color` | string | 是 | 项目标签的颜色 |
| `project` | object | 是 | 项目的引用结构数据。该标签是此项目的本地标签 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |

**响应示例**

```json
{
  "id": "5e6b35de50ef8153c2062f70",
  "url": "https://{rest_api_root}/v2/pjm/tags/5e6b35de50ef8153c2062f70",
  "name": "标签-2",
  "color": "#56ABFB",
  "project": {
    "id": "5eb623f6a70571487ea41919",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea41919",
    "identifier": "KB",
    "name": "看板项目",
    "template_type": "kanban",
    "is_archived": 0,
    "is_deleted": 0
  }
}
```

<a id="post-v2-pjm-release-stages"></a>

### 创建一个发布阶段

`POST /v2/pjm/release_stages` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于创建一个发布阶段。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 发布阶段的名称。在一个企业中这个名称是唯一的 |
| `type` | string | 是 | 发布阶段的类型；枚举："pending" / "in_progress" / "published" |

**请求示例**

```json
{
  "name": "新建",
  "type": "pending"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 发布阶段的 id |
| `url` | string | 是 | 发布阶段的地址 |
| `name` | string | 是 | 发布阶段的名称 |
| `type` | string | 是 | 发布阶段的类型；枚举："pending" / "in_progress" / "published" |
| `color` | string | 是 | 发布阶段的颜色 |

**响应示例**

```json
{
  "id": "5c9b35de90ad7153c2062f18",
  "url": "https://{rest_api_root}/v2/pjm/release_stages/5c9b35de90ad7153c2062f18",
  "name": "新建",
  "type": "pending",
  "color": "#ff7575"
}
```

<a id="get-v2-pjm-release-stages-release-stage-id"></a>

### 获取一个发布阶段

`GET /v2/pjm/release_stages/{release_stage_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于按 id 获取发布阶段全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `release_stage_id` | string | 是 | 发布阶段的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 发布阶段的 id |
| `url` | string | 是 | 发布阶段的地址 |
| `name` | string | 是 | 发布阶段的名称 |
| `type` | string | 是 | 发布阶段的类型；枚举："pending" / "in_progress" / "published" |
| `color` | string | 是 | 发布阶段的颜色 |

**响应示例**

```json
{
  "id": "5c9b35de90ad7153c2062f18",
  "url": "https://{rest_api_root}/v2/pjm/release_stages/5c9b35de90ad7153c2062f18",
  "name": "新建",
  "type": "pending",
  "color": "#ff7575"
}
```

<a id="patch-v2-pjm-release-stages-release-stage-id"></a>

### 部分更新一个发布阶段

`PATCH /v2/pjm/release_stages/{release_stage_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于部分更新一个发布阶段。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `release_stage_id` | string | 是 | 发布阶段的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 发布阶段的名称。在一个企业中这个名称是唯一的 |
| `type` | string |  | 发布阶段的类型；枚举："pending" / "in_progress" / "published" |

**请求示例**

```json
{
  "name": "新建",
  "type": "in_progress"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 发布阶段的 id |
| `url` | string | 是 | 发布阶段的地址 |
| `name` | string | 是 | 发布阶段的名称 |
| `type` | string | 是 | 发布阶段的类型；枚举："pending" / "in_progress" / "published" |
| `color` | string | 是 | 发布阶段的颜色 |

**响应示例**

```json
{
  "id": "5c9b35de90ad7153c2062f18",
  "url": "https://{rest_api_root}/v2/pjm/release_stages/5c9b35de90ad7153c2062f18",
  "name": "新建",
  "type": "in_progress",
  "color": "#ff7575"
}
```

<a id="get-v2-pjm-release-stages"></a>

### 获取发布阶段列表

`GET /v2/pjm/release_stages` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于分页获取企业内全部发布阶段。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 发布阶段的全量结构数据的数组 |
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
      "id": "5c9b35de90ad7153c2062f18",
      "url": "https://{rest_api_root}/v2/pjm/release_stages/5c9b35de90ad7153c2062f18",
      "name": "新建",
      "type": "in_progress",
      "color": "#ff7575"
    }
  ]
}
```

<a id="delete-v2-pjm-release-stages-release-stage-id"></a>

### 删除一个发布阶段

`DELETE /v2/pjm/release_stages/{release_stage_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于删除一个发布阶段。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `release_stage_id` | string | 是 | 发布阶段的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `replace_id` | string |  | 替换的发布阶段 id，如果一个发布阶段已经被发布使用，删除该发布阶段时需要提供一个替换的发布阶段 |

**请求示例**

```json
{
  "replace_id": "5c9b35de90ad7153c2062f19"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 发布阶段的 id |
| `url` | string | 是 | 发布阶段的地址 |
| `name` | string | 是 | 发布阶段的名称 |
| `type` | string | 是 | 发布阶段的类型；枚举："pending" / "in_progress" / "published" |
| `color` | string | 是 | 发布阶段的颜色 |

**响应示例**

```json
{
  "id": "5c9b35de90ad7153c2062f18",
  "url": "https://{rest_api_root}/v2/pjm/release_stages/5c9b35de90ad7153c2062f18",
  "name": "新建",
  "type": "in_progress",
  "color": "#ff7575"
}
```

## 工作项配置

> 分组路径：项目管理 / 项目配置中心 / 工作项配置

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/pjm/workitem_types` | [创建一个工作项类型](#post-v2-pjm-workitem-types) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_types/{workitem_type_id}` | [获取一个工作项类型](#get-v2-pjm-workitem-types-workitem-type-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/pjm/workitem_types/{workitem_type_id}` | [部分更新一个工作项类型](#patch-v2-pjm-workitem-types-workitem-type-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_types` | [获取全部工作项类型列表](#get-v2-pjm-workitem-types) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/pjm/workitem_types/{workitem_type_id}` | [删除一个工作项类型](#delete-v2-pjm-workitem-types-workitem-type-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_type_plans/{workitem_type_plan_id}` | [获取一个工作项类型方案](#get-v2-pjm-workitem-type-plans-workitem-type-plan-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_type_plans` | [获取工作项类型方案列表](#get-v2-pjm-workitem-type-plans) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/workitem_type_plans/{workitem_type_plan_id}/workitem_types` | [向工作项类型方案中添加一个类型](#post-v2-pjm-workitem-type-plans-workitem-type-plan-id-workitem-types) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_type_plans/{workitem_type_plan_id}/workitem_types/{workitem_type_id}` | [获取工作项类型方案中的一个类型](#get-v2-pjm-workitem-type-plans-workitem-type-plan-id-workitem-types-workitem-type-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/pjm/workitem_type_plans/{workitem_type_plan_id}/workitem_types/{workitem_type_id}` | [部分更新工作项类型方案中的一个类型](#patch-v2-pjm-workitem-type-plans-workitem-type-plan-id-workitem-types-workitem-type-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_type_plans/{workitem_type_plan_id}/workitem_types` | [获取工作项类型方案中的类型列表](#get-v2-pjm-workitem-type-plans-workitem-type-plan-id-workitem-types) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/pjm/workitem_type_plans/{workitem_type_plan_id}/workitem_types/{workitem_type_id}` | [在工作项类型方案中移除一个类型](#delete-v2-pjm-workitem-type-plans-workitem-type-plan-id-workitem-types-workitem-type-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/workitem_states` | [创建一个工作项状态](#post-v2-pjm-workitem-states) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_states/{state_id}` | [获取一个工作项状态](#get-v2-pjm-workitem-states-state-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/pjm/workitem_states/{state_id}` | [部分更新一个工作项状态](#patch-v2-pjm-workitem-states-state-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_states` | [获取全部工作项状态列表](#get-v2-pjm-workitem-states) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_state_plans/{workitem_state_plan_id}` | [获取一个工作项状态方案](#get-v2-pjm-workitem-state-plans-workitem-state-plan-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_state_plans` | [获取工作项状态方案列表](#get-v2-pjm-workitem-state-plans) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/workitem_state_plans/{workitem_state_plan_id}/workitem_states` | [向工作项状态方案中添加一个状态](#post-v2-pjm-workitem-state-plans-workitem-state-plan-id-workitem-states) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_state_plans/{workitem_state_plan_id}/workitem_states/{workitem_state_id}` | [获取工作项状态方案中的一个状态](#get-v2-pjm-workitem-state-plans-workitem-state-plan-id-workitem-states-workitem-state-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_state_plans/{workitem_state_plan_id}/workitem_states` | [获取工作项状态方案中的状态列表](#get-v2-pjm-workitem-state-plans-workitem-state-plan-id-workitem-states) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/pjm/workitem_state_plans/{workitem_state_plan_id}/workitem_states/{workitem_state_id}` | [在工作项状态方案中移除一个状态](#delete-v2-pjm-workitem-state-plans-workitem-state-plan-id-workitem-states-workitem-state-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/workitem_state_plans/{workitem_state_plan_id}/workitem_state_flows` | [向工作项状态方案中添加一个状态流转](#post-v2-pjm-workitem-state-plans-workitem-state-plan-id-workitem-state-flows) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_state_plans/{workitem_state_plan_id}/workitem_state_flows/{workitem_state_flow_id}` | [获取工作项状态方案中的一个状态流转](#get-v2-pjm-workitem-state-plans-workitem-state-plan-id-workitem-state-flows-workitem-state-flow-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_state_plans/{workitem_state_plan_id}/workitem_state_flows` | [获取工作项状态方案中的状态流转列表](#get-v2-pjm-workitem-state-plans-workitem-state-plan-id-workitem-state-flows) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/pjm/workitem_state_plans/{workitem_state_plan_id}/workitem_state_flows/{workitem_state_flow_id}` | [在工作项状态方案中移除一个状态流转](#delete-v2-pjm-workitem-state-plans-workitem-state-plan-id-workitem-state-flows-workitem-state-flow-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/workitem_properties` | [创建一个工作项属性](#post-v2-pjm-workitem-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_properties/{workitem_property_id}` | [获取一个工作项属性](#get-v2-pjm-workitem-properties-workitem-property-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/pjm/workitem_properties/{workitem_property_id}` | [部分更新一个工作项属性](#patch-v2-pjm-workitem-properties-workitem-property-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_properties` | [获取全部工作项属性列表](#get-v2-pjm-workitem-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_property_plans/{workitem_property_plan_id}` | [获取一个工作项属性方案](#get-v2-pjm-workitem-property-plans-workitem-property-plan-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_property_plans` | [获取工作项属性方案列表](#get-v2-pjm-workitem-property-plans) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/pjm/workitem_property_plans/{workitem_property_plan_id}/workitem_properties` | [向工作项属性方案中添加一个属性](#post-v2-pjm-workitem-property-plans-workitem-property-plan-id-workitem-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_property_plans/{workitem_property_plan_id}/workitem_properties/{workitem_property_id}` | [获取工作项属性方案中的一个属性](#get-v2-pjm-workitem-property-plans-workitem-property-plan-id-workitem-properties-workitem-property-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_property_plans/{workitem_property_plan_id}/workitem_properties` | [获取工作项属性方案中的属性列表](#get-v2-pjm-workitem-property-plans-workitem-property-plan-id-workitem-properties) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/pjm/workitem_property_plans/{workitem_property_plan_id}/workitem_properties/{workitem_property_id}` | [在工作项属性方案中移除一个属性](#delete-v2-pjm-workitem-property-plans-workitem-property-plan-id-workitem-properties-workitem-property-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_priorities/{workitem_priority_id}` | [获取一个工作项优先级](#get-v2-pjm-workitem-priorities-workitem-priority-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/pjm/workitem_priorities` | [获取全部工作项优先级列表](#get-v2-pjm-workitem-priorities) | 企业令牌 / 用户令牌 |

<a id="post-v2-pjm-workitem-types"></a>

### 创建一个工作项类型

`POST /v2/pjm/workitem_types` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于创建一个工作项类型。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 工作项类型的名称。在一个企业中这个名称是唯一的 |
| `group` | string | 是 | 工作项类型的分组；枚举："requirement" / "task" / "bug" / "issue" |

**请求示例**

```json
{
  "name": "功能缺陷",
  "group": "bug"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项类型的 id |
| `url` | string | 是 | 工作项类型的地址 |
| `name` | string | 是 | 工作项类型的名称 |
| `group` | string | 是 | 工作项类型的分组；枚举："requirement" / "task" / "bug" / "issue" / "plan" |
| `icon` | string | 是 | 工作项类型的图标 |
| `color` | string | 是 | 工作项类型的颜色 |
| `is_system` | number | 是 | 是否为系统内置工作项类型；枚举：0 / 1 |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "630da48bc9443b1aa94ce3fc",
  "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3fc",
  "name": "功能缺陷",
  "group": "bug",
  "icon": "bug",
  "color": "#FA8888",
  "is_system": 0,
  "is_deleted": 0
}
```

<a id="get-v2-pjm-workitem-types-workitem-type-id"></a>

### 获取一个工作项类型

`GET /v2/pjm/workitem_types/{workitem_type_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于按 id 获取工作项类型全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_type_id` | string | 是 | 工作项类型的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的工作项类型。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项类型的 id |
| `url` | string | 是 | 工作项类型的地址 |
| `name` | string | 是 | 工作项类型的名称 |
| `group` | string | 是 | 工作项类型的分组；枚举："requirement" / "task" / "bug" / "issue" / "plan" |
| `icon` | string | 是 | 工作项类型的图标 |
| `color` | string | 是 | 工作项类型的颜色 |
| `is_system` | number | 是 | 是否为系统内置工作项类型；枚举：0 / 1 |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "630da48bc9443b1aa94ce3ea",
  "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
  "name": "需求",
  "group": "requirement",
  "icon": "story",
  "color": "#56ABFB",
  "is_system": 1,
  "is_deleted": 0
}
```

<a id="patch-v2-pjm-workitem-types-workitem-type-id"></a>

### 部分更新一个工作项类型

`PATCH /v2/pjm/workitem_types/{workitem_type_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于部分更新一个工作项类型。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_type_id` | string | 是 | 工作项类型的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 工作项类型的名称。在一个企业中这个名称是唯一的 |

**请求示例**

```json
{
  "name": "非功能性需求"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项类型的 id |
| `url` | string | 是 | 工作项类型的地址 |
| `name` | string | 是 | 工作项类型的名称 |
| `group` | string | 是 | 工作项类型的分组；枚举："requirement" / "task" / "bug" / "issue" / "plan" |
| `icon` | string | 是 | 工作项类型的图标 |
| `color` | string | 是 | 工作项类型的颜色 |
| `is_system` | number | 是 | 是否为系统内置工作项类型；枚举：0 / 1 |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "630da48bc9443b1aa94ce3df",
  "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3df",
  "name": "非功能性需求",
  "group": "requirement",
  "icon": "story",
  "color": "#56ABFB",
  "is_system": 0,
  "is_deleted": 0
}
```

<a id="get-v2-pjm-workitem-types"></a>

### 获取全部工作项类型列表

`GET /v2/pjm/workitem_types` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于分页获取企业内全部工作项类型。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的工作项类型。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项类型的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].group` | string |  |  |
| `values[].icon` | string |  |  |
| `values[].color` | string |  |  |
| `values[].is_system` | number |  |  |
| `values[].is_deleted` | number |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "630da48bc9443b1aa94ce3ea",
      "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
      "name": "需求",
      "group": "requirement",
      "icon": "story",
      "color": "#56ABFB",
      "is_system": 1,
      "is_deleted": 0
    },
    {
      "id": "6385c650fef18f2d7222d15d",
      "url": "https://{rest_api_root}/v2/pjm/workitem_types/6385c650fef18f2d7222d15d?include_deleted=true",
      "name": "自定义",
      "group": "issue",
      "icon": "issue",
      "color": "#73D897",
      "is_system": 0,
      "is_deleted": 1
    }
  ]
}
```

<a id="delete-v2-pjm-workitem-types-workitem-type-id"></a>

### 删除一个工作项类型

`DELETE /v2/pjm/workitem_types/{workitem_type_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于删除一个工作项类型。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_type_id` | string | 是 | 工作项类型的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项类型的 id |
| `url` | string | 是 | 工作项类型的地址 |
| `name` | string | 是 | 工作项类型的名称 |
| `group` | string | 是 | 工作项类型的分组；枚举："requirement" / "task" / "bug" / "issue" / "plan" |
| `icon` | string | 是 | 工作项类型的图标 |
| `color` | string | 是 | 工作项类型的颜色 |
| `is_system` | number | 是 | 是否为系统内置工作项类型；枚举：0 / 1 |
| `is_deleted` | number | 是 | 是否已删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "630da48bc9443b1aa94ce3df",
  "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3df",
  "name": "非功能性需求",
  "group": "requirement",
  "icon": "story",
  "color": "#56ABFB",
  "is_system": 0,
  "is_deleted": 0
}
```

<a id="get-v2-pjm-workitem-type-plans-workitem-type-plan-id"></a>

### 获取一个工作项类型方案

`GET /v2/pjm/workitem_type_plans/{workitem_type_plan_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于按 id 获取工作项类型方案全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_type_plan_id` | string | 是 | 工作项类型方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项类型方案的 id |
| `url` | string | 是 | 工作项类型方案的地址 |
| `project_template` | object | 是 | 项目流程模版的引用结构数据。该方案属于此项目流程模版 |
| `project_template.id` | string |  |  |
| `project_template.url` | string |  |  |
| `project_template.name` | string |  |  |
| `project_template.type` | string |  |  |
| `project_template.is_system` | number |  |  |
| `project` | object | 是 | 项目的引用结构数据。该方案是此项目的本地化方案 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |

**响应示例 1：响应示例（流程方案）**

```json
{
  "id": "5fa690f1ae0571487ea49030",
  "url": "https://{rest_api_root}/v2/pjm/workitem_type_plans/5fa690f1ae0571487ea49030",
  "project_template": {
    "id": "5fa690f1ae0571487ea49030",
    "url": "https://{rest_api_root}/v2/pjm/project_templates/5fa690f1ae0571487ea49030",
    "name": "Scrum 项目流程",
    "type": "scrum",
    "is_system": 1
  },
  "project": null
}
```

**响应示例 2：响应示例（项目本地化方案）**

```json
{
  "id": "5eb623f6a70571487ea47000",
  "url": "https://{rest_api_root}/v2/pjm/workitem_type_plans/5eb623f6a70571487ea47000",
  "project_template": null,
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "template_type": "scrum",
    "is_archived": 0,
    "is_deleted": 0
  }
}
```

<a id="get-v2-pjm-workitem-type-plans"></a>

### 获取工作项类型方案列表

`GET /v2/pjm/workitem_type_plans` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于分页获取工作项类型方案列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `for_project_id` | string |  | 项目的 id。只返回该项目正在使用的工作项类型方案 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项类型方案的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].project_template` | object \| null |  |  |
| `values[].project` | null \| object |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "5fa690f1ae0571487ea49030",
      "url": "https://{rest_api_root}/v2/pjm/workitem_type_plans/5fa690f1ae0571487ea49030",
      "project_template": {
        "id": "5fa690f1ae0571487ea49030",
        "url": "https://{rest_api_root}/v2/pjm/project_templates/5fa690f1ae0571487ea49030",
        "name": "Scrum 项目流程",
        "type": "scrum",
        "is_system": 1
      },
      "project": null
    },
    {
      "id": "5eb623f6a70571487ea47000",
      "url": "https://{rest_api_root}/v2/pjm/workitem_type_plans/5eb623f6a70571487ea47000",
      "project_template": null,
      "project": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
        "identifier": "SCR",
        "name": "Scrum 项目",
        "template_type": "scrum",
        "is_archived": 0,
        "is_deleted": 0
      }
    }
  ]
}
```

<a id="post-v2-pjm-workitem-type-plans-workitem-type-plan-id-workitem-types"></a>

### 向工作项类型方案中添加一个类型

`POST /v2/pjm/workitem_type_plans/{workitem_type_plan_id}/workitem_types` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于向工作项类型方案中添加一个类型。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_type_plan_id` | string | 是 | 工作项类型方案的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_type_id` | string | 是 | 工作项类型的 id |

**请求示例**

```json
{
  "workitem_type_id": "5c9b35de90ad7153c2062f18"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项类型方案中工作项类型的 id |
| `url` | string | 是 | 工作项类型方案中工作项类型的地址 |
| `type_plan` | object | 是 | 工作项类型方案的引用结构数据 |
| `type_plan.id` | string |  |  |
| `type_plan.url` | string |  |  |
| `type` | object | 是 | 工作项类型的引用结构数据 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `type.group` | string |  |  |
| `sub_types` | object[] | 是 | 子工作项类型的引用结构数据列表 |

**响应示例**

```json
{
  "id": "630da48bc9443b1aa94ce3ea",
  "url": "https://{rest_api_root}/v2/pjm/workitem_type_plans/65b0d9fd9ee456e672657e39/workitem_types/630da48bc9443b1aa94ce3ea",
  "type_plan": {
    "id": "65b0d9fd9ee456e672657e39",
    "url": "https://{rest_api_root}/v2/pjm/workitem_type_plans/65b0d9fd9ee456e672657e39"
  },
  "type": {
    "id": "630da48bc9443b1aa94ce3ea",
    "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
    "name": "需求",
    "group": "requirement"
  },
  "sub_types": []
}
```

<a id="get-v2-pjm-workitem-type-plans-workitem-type-plan-id-workitem-types-workitem-type-id"></a>

### 获取工作项类型方案中的一个类型

`GET /v2/pjm/workitem_type_plans/{workitem_type_plan_id}/workitem_types/{workitem_type_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于按 id 获取工作项类型方案中的一个类型。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_type_plan_id` | string | 是 | 工作项类型方案的 id |
| `workitem_type_id` | string | 是 | 工作项类型的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项类型方案中工作项类型的 id |
| `url` | string | 是 | 工作项类型方案中工作项类型的地址 |
| `type_plan` | object | 是 | 工作项类型方案的引用结构数据 |
| `type_plan.id` | string |  |  |
| `type_plan.url` | string |  |  |
| `type` | object | 是 | 工作项类型的引用结构数据 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `type.group` | string |  |  |
| `sub_types` | object[] | 是 | 子工作项类型的引用结构数据列表 |
| `sub_types[].id` | string |  |  |
| `sub_types[].url` | string |  |  |
| `sub_types[].name` | string |  |  |
| `sub_types[].group` | string |  |  |

**响应示例**

```json
{
  "id": "630da48bc9443b1aa94ce3ea",
  "url": "https://{rest_api_root}/v2/pjm/workitem_type_plans/65b0d9fd9ee456e672657e39/workitem_types/630da48bc9443b1aa94ce3ea",
  "type_plan": {
    "id": "65b0d9fd9ee456e672657e39",
    "url": "https://{rest_api_root}/v2/pjm/workitem_type_plans/65b0d9fd9ee456e672657e39"
  },
  "type": {
    "id": "630da48bc9443b1aa94ce3ea",
    "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
    "name": "需求",
    "group": "requirement"
  },
  "sub_types": [
    {
      "id": "630da48bc9443b1aa94ce3eb",
      "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3eb",
      "name": "缺陷",
      "group": "bug"
    },
    {
      "id": "6385c650fef18f2d7222d15d",
      "url": "https://{rest_api_root}/v2/pjm/workitem_types/6385c650fef18f2d7222d15d",
      "name": "自定义",
      "group": "issue"
    }
  ]
}
```

<a id="patch-v2-pjm-workitem-type-plans-workitem-type-plan-id-workitem-types-workitem-type-id"></a>

### 部分更新工作项类型方案中的一个类型

`PATCH /v2/pjm/workitem_type_plans/{workitem_type_plan_id}/workitem_types/{workitem_type_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于部分更新工作项类型方案中的一个类型。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_type_plan_id` | string | 是 | 工作项类型方案的 id |
| `workitem_type_id` | string | 是 | 工作项类型的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `sub_type_ids` | string[] | 是 | 子工作项类型 id 的列表，最多只能 20 个 |

**请求示例**

```json
{
  "sub_type_ids": [
    "630da48bc9443b1aa94ce3eb",
    "6385c650fef18f2d7222d15d"
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项类型方案中工作项类型的 id |
| `url` | string | 是 | 工作项类型方案中工作项类型的地址 |
| `type_plan` | object | 是 | 工作项类型方案的引用结构数据 |
| `type_plan.id` | string |  |  |
| `type_plan.url` | string |  |  |
| `type` | object | 是 | 工作项类型的引用结构数据 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `type.group` | string |  |  |
| `sub_types` | object[] | 是 | 子工作项类型的引用结构数据列表 |
| `sub_types[].id` | string |  |  |
| `sub_types[].url` | string |  |  |
| `sub_types[].name` | string |  |  |
| `sub_types[].group` | string |  |  |

**响应示例**

```json
{
  "id": "630da48bc9443b1aa94ce3ea",
  "url": "https://{rest_api_root}/v2/pjm/workitem_type_plans/65b0d9fd9ee456e672657e39/workitem_types/630da48bc9443b1aa94ce3ea",
  "type_plan": {
    "id": "65b0d9fd9ee456e672657e39",
    "url": "https://{rest_api_root}/v2/pjm/workitem_type_plans/65b0d9fd9ee456e672657e39"
  },
  "type": {
    "id": "630da48bc9443b1aa94ce3ea",
    "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
    "name": "需求",
    "group": "requirement"
  },
  "sub_types": [
    {
      "id": "630da48bc9443b1aa94ce3eb",
      "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3eb",
      "name": "缺陷",
      "group": "bug"
    },
    {
      "id": "6385c650fef18f2d7222d15d",
      "url": "https://{rest_api_root}/v2/pjm/workitem_types/6385c650fef18f2d7222d15d",
      "name": "自定义",
      "group": "issue"
    }
  ]
}
```

<a id="get-v2-pjm-workitem-type-plans-workitem-type-plan-id-workitem-types"></a>

### 获取工作项类型方案中的类型列表

`GET /v2/pjm/workitem_type_plans/{workitem_type_plan_id}/workitem_types` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于分页获取工作项类型方案中的类型列表。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_type_plan_id` | string | 是 | 工作项类型方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项类型方案中的工作项类型的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].type_plan` | object |  |  |
| `values[].type_plan.id` | string |  |  |
| `values[].type_plan.url` | string |  |  |
| `values[].type` | object |  |  |
| `values[].type.id` | string |  |  |
| `values[].type.url` | string |  |  |
| `values[].type.name` | string |  |  |
| `values[].type.group` | string |  |  |
| `values[].sub_types` | object[] |  |  |
| `values[].sub_types[].id` | string |  |  |
| `values[].sub_types[].url` | string |  |  |
| `values[].sub_types[].name` | string |  |  |
| `values[].sub_types[].group` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "630da48bc9443b1aa94ce3ea",
      "url": "https://{rest_api_root}/v2/pjm/workitem_type_plans/65b0d9fd9ee456e672657e39/workitem_types/630da48bc9443b1aa94ce3ea",
      "type_plan": {
        "id": "65b0d9fd9ee456e672657e39",
        "url": "https://{rest_api_root}/v2/pjm/workitem_type_plans/65b0d9fd9ee456e672657e39"
      },
      "type": {
        "id": "630da48bc9443b1aa94ce3ea",
        "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
        "name": "需求",
        "group": "requirement"
      },
      "sub_types": [
        {
          "id": "630da48bc9443b1aa94ce3eb",
          "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3eb",
          "name": "缺陷",
          "group": "bug"
        }
      ]
    }
  ]
}
```

<a id="delete-v2-pjm-workitem-type-plans-workitem-type-plan-id-workitem-types-workitem-type-id"></a>

### 在工作项类型方案中移除一个类型

`DELETE /v2/pjm/workitem_type_plans/{workitem_type_plan_id}/workitem_types/{workitem_type_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于从工作项类型方案中移除一个类型。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_type_plan_id` | string | 是 | 工作项类型方案的 id |
| `workitem_type_id` | string | 是 | 工作项类型的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项类型方案中工作项类型的 id |
| `url` | string | 是 | 工作项类型方案中工作项类型的地址 |
| `type_plan` | object | 是 | 工作项类型方案的引用结构数据 |
| `type_plan.id` | string |  |  |
| `type_plan.url` | string |  |  |
| `type` | object | 是 | 工作项类型的引用结构数据 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `type.group` | string |  |  |
| `sub_types` | object[] | 是 | 子工作项类型的引用结构数据列表 |

**响应示例**

```json
{
  "id": "630da48bc9443b1aa94ce3ea",
  "url": "https://{rest_api_root}/v2/pjm/workitem_type_plans/65b0d9fd9ee456e672657e39/workitem_types/630da48bc9443b1aa94ce3ea",
  "type_plan": {
    "id": "65b0d9fd9ee456e672657e39",
    "url": "https://{rest_api_root}/v2/pjm/workitem_type_plans/65b0d9fd9ee456e672657e39"
  },
  "type": {
    "id": "630da48bc9443b1aa94ce3ea",
    "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
    "name": "需求",
    "group": "requirement"
  },
  "sub_types": []
}
```

<a id="post-v2-pjm-workitem-states"></a>

### 创建一个工作项状态

`POST /v2/pjm/workitem_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于创建一个工作项状态。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 工作项状态的名称。在一个企业中这个名称是唯一的 |
| `type` | string | 是 | 工作项状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |

**请求示例**

```json
{
  "name": "新建",
  "type": "pending"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项状态的 id |
| `url` | string | 是 | 工作项状态的地址 |
| `name` | string | 是 | 工作项状态的名称 |
| `type` | string | 是 | 工作项状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |
| `color` | string | 是 | 工作项状态的颜色 |
| `is_system` | number | 是 | 是否为系统内置状态；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5c9b35de90ad7153c2062f18",
  "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
  "name": "新建",
  "type": "pending",
  "color": "#ff7575",
  "is_system": 0
}
```

<a id="get-v2-pjm-workitem-states-state-id"></a>

### 获取一个工作项状态

`GET /v2/pjm/workitem_states/{state_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于按 id 获取工作项状态全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `state_id` | string | 是 | 工作项状态的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项状态的 id |
| `url` | string | 是 | 工作项状态的地址 |
| `name` | string | 是 | 工作项状态的名称 |
| `type` | string | 是 | 工作项状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |
| `color` | string | 是 | 工作项状态的颜色 |
| `is_system` | number | 是 | 是否为系统内置状态；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5c9b35de90ad7153c2062f18",
  "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
  "name": "新建",
  "type": "pending",
  "color": "#ff7575",
  "is_system": 0
}
```

<a id="patch-v2-pjm-workitem-states-state-id"></a>

### 部分更新一个工作项状态

`PATCH /v2/pjm/workitem_states/{state_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于部分更新一个工作项状态。  
 仅非系统内置状态可更新。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `state_id` | string | 是 | 工作项状态的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 工作项状态的名称。在一个企业中这个名称是唯一的 |
| `type` | string |  | 工作项状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |

**请求示例**

```json
{
  "name": "新建",
  "type": "pending"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项状态的 id |
| `url` | string | 是 | 工作项状态的地址 |
| `name` | string | 是 | 工作项状态的名称 |
| `type` | string | 是 | 工作项状态的类型；枚举："pending" / "in_progress" / "completed" / "closed" |
| `color` | string | 是 | 工作项状态的颜色 |
| `is_system` | number | 是 | 是否为系统内置状态；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "5c9b35de90ad7153c2062f18",
  "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
  "name": "新建",
  "type": "pending",
  "color": "#ff7575",
  "is_system": 0
}
```

<a id="get-v2-pjm-workitem-states"></a>

### 获取全部工作项状态列表

`GET /v2/pjm/workitem_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于分页获取企业内全部工作项状态。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项状态的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].type` | string |  |  |
| `values[].color` | string |  |  |
| `values[].is_system` | number |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5c9b35de90ad7153c2062f18",
      "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
      "name": "新建",
      "type": "pending",
      "color": "#ff7575",
      "is_system": 1
    }
  ]
}
```

<a id="get-v2-pjm-workitem-state-plans-workitem-state-plan-id"></a>

### 获取一个工作项状态方案

`GET /v2/pjm/workitem_state_plans/{workitem_state_plan_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于按 id 获取工作项状态方案全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_state_plan_id` | string | 是 | 工作项状态方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项状态方案的 id |
| `url` | string | 是 | 工作项状态方案的地址 |
| `workitem_type` | object | 是 | 工作项类型的引用结构数据 |
| `workitem_type.id` | string |  |  |
| `workitem_type.url` | string |  |  |
| `workitem_type.name` | string |  |  |
| `workitem_type.group` | string |  |  |
| `project_template` | object | 是 | 项目流程模版的引用结构数据。该方案属于此项目流程模版 |
| `project_template.id` | string |  |  |
| `project_template.url` | string |  |  |
| `project_template.name` | string |  |  |
| `project_template.type` | string |  |  |
| `project_template.is_system` | number |  |  |
| `project` | object | 是 | 项目的引用结构数据。该方案是此项目的本地化方案 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |

**响应示例 1：响应示例（流程方案）**

```json
{
  "id": "5c9b62f18ad715335de90c20",
  "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c20",
  "workitem_type": {
    "id": "630da48bc9443b1aa94ce3ea",
    "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
    "name": "用户故事",
    "group": "requirement"
  },
  "project_template": {
    "id": "5fa690f1ae0571487ea49030",
    "url": "https://{rest_api_root}/v2/pjm/project_templates/5fa690f1ae0571487ea49030",
    "name": "Scrum 项目流程",
    "type": "scrum",
    "is_system": 1
  },
  "project": null
}
```

**响应示例 2：响应示例（项目本地化方案）**

```json
{
  "id": "5c9b62f18ad715335de90c21",
  "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c21",
  "workitem_type": {
    "id": "630da48bc9443b1aa94ce3ea",
    "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
    "name": "用户故事",
    "group": "requirement"
  },
  "project_template": null,
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "template_type": "scrum",
    "is_archived": 0,
    "is_deleted": 0
  }
}
```

<a id="get-v2-pjm-workitem-state-plans"></a>

### 获取工作项状态方案列表

`GET /v2/pjm/workitem_state_plans` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于分页获取工作项状态方案列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `for_project_id` | string |  | 项目的 id。只返回该项目正在使用的工作项状态方案 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项状态方案的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].workitem_type` | object |  |  |
| `values[].workitem_type.id` | string |  |  |
| `values[].workitem_type.url` | string |  |  |
| `values[].workitem_type.name` | string |  |  |
| `values[].workitem_type.group` | string |  |  |
| `values[].project_template` | object \| null |  |  |
| `values[].project` | null \| object |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "5c9b62f18ad715335de90c20",
      "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c20",
      "workitem_type": {
        "id": "630da48bc9443b1aa94ce3ea",
        "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
        "name": "用户故事",
        "group": "requirement"
      },
      "project_template": {
        "id": "5fa690f1ae0571487ea49030",
        "url": "https://{rest_api_root}/v2/pjm/project_templates/5fa690f1ae0571487ea49030",
        "name": "Scrum 项目流程",
        "type": "scrum",
        "is_system": 1
      },
      "project": null
    },
    {
      "id": "5c9b62f18ad715335de90c21",
      "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c21",
      "workitem_type": {
        "id": "630da48bc9443b1aa94ce3ea",
        "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
        "name": "用户故事",
        "group": "requirement"
      },
      "project_template": null,
      "project": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
        "identifier": "SCR",
        "name": "Scrum 项目",
        "template_type": "scrum",
        "is_archived": 0,
        "is_deleted": 0
      }
    }
  ]
}
```

<a id="post-v2-pjm-workitem-state-plans-workitem-state-plan-id-workitem-states"></a>

### 向工作项状态方案中添加一个状态

`POST /v2/pjm/workitem_state_plans/{workitem_state_plan_id}/workitem_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于向工作项状态方案中添加一个状态。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_state_plan_id` | string | 是 | 工作项状态方案的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `state_id` | string | 是 | 工作项状态的 id |

**请求示例**

```json
{
  "state_id": "5c9b35de90ad7153c2062f18"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项状态方案中状态关联的 id |
| `url` | string | 是 | 工作项状态方案中状态关联的地址 |
| `state_plan` | object | 是 | 工作项状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `state` | object | 是 | 工作项状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `state.color` | string |  |  |

**响应示例**

```json
{
  "id": "5cc2062f189b35de90ad7153",
  "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c20/workitem_states/5c9b35de90ad7153c2062f18",
  "state_plan": {
    "id": "5c9b62f18ad715335de90c20",
    "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c20"
  },
  "state": {
    "id": "5c9b35de90ad7153c2062f18",
    "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
    "name": "新建",
    "type": "pending",
    "color": "#ff7575"
  }
}
```

<a id="get-v2-pjm-workitem-state-plans-workitem-state-plan-id-workitem-states-workitem-state-id"></a>

### 获取工作项状态方案中的一个状态

`GET /v2/pjm/workitem_state_plans/{workitem_state_plan_id}/workitem_states/{workitem_state_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于按 id 获取工作项状态方案中的一个状态。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_state_plan_id` | string | 是 | 工作项状态方案的 id |
| `workitem_state_id` | string | 是 | 工作项状态的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项状态方案中状态关联的 id |
| `url` | string | 是 | 工作项状态方案中状态关联的地址 |
| `state_plan` | object | 是 | 工作项状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `state` | object | 是 | 工作项状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `state.color` | string |  |  |

**响应示例**

```json
{
  "id": "5cc2062f189b35de90ad7153",
  "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c20/workitem_states/5c9b35de90ad7153c2062f18",
  "state_plan": {
    "id": "5c9b62f18ad715335de90c20",
    "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c20"
  },
  "state": {
    "id": "5c9b35de90ad7153c2062f18",
    "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
    "name": "新建",
    "type": "pending",
    "color": "#ff7575"
  }
}
```

<a id="get-v2-pjm-workitem-state-plans-workitem-state-plan-id-workitem-states"></a>

### 获取工作项状态方案中的状态列表

`GET /v2/pjm/workitem_state_plans/{workitem_state_plan_id}/workitem_states` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于分页获取工作项状态方案中的状态列表。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_state_plan_id` | string | 是 | 工作项状态方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项状态方案中状态的全量结构数据的数组 |
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
| `values[].state.color` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5cc2062f189b35de90ad7153",
      "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c20/workitem_states/5c9b35de90ad7153c2062f18",
      "state_plan": {
        "id": "5c9b62f18ad715335de90c20",
        "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c20"
      },
      "state": {
        "id": "5c9b35de90ad7153c2062f18",
        "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
        "name": "新建",
        "type": "pending",
        "color": "#ff7575"
      }
    }
  ]
}
```

<a id="delete-v2-pjm-workitem-state-plans-workitem-state-plan-id-workitem-states-workitem-state-id"></a>

### 在工作项状态方案中移除一个状态

`DELETE /v2/pjm/workitem_state_plans/{workitem_state_plan_id}/workitem_states/{workitem_state_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于从工作项状态方案移除一个状态。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_state_plan_id` | string | 是 | 工作项状态方案的 id |
| `workitem_state_id` | string | 是 | 工作项状态的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项状态方案中状态关联的 id |
| `url` | string | 是 | 工作项状态方案中状态关联的地址 |
| `state_plan` | object | 是 | 工作项状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `state` | object | 是 | 工作项状态的引用结构数据 |
| `state.id` | string |  |  |
| `state.url` | string |  |  |
| `state.name` | string |  |  |
| `state.type` | string |  |  |
| `state.color` | string |  |  |

**响应示例**

```json
{
  "id": "5cc2062f189b35de90ad7153",
  "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c20/workitem_states/5c9b35de90ad7153c2062f18",
  "state_plan": {
    "id": "5c9b62f18ad715335de90c20",
    "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c20"
  },
  "state": {
    "id": "5c9b35de90ad7153c2062f18",
    "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
    "name": "新建",
    "type": "pending",
    "color": "#ff7575"
  }
}
```

<a id="post-v2-pjm-workitem-state-plans-workitem-state-plan-id-workitem-state-flows"></a>

### 向工作项状态方案中添加一个状态流转

`POST /v2/pjm/workitem_state_plans/{workitem_state_plan_id}/workitem_state_flows` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于向工作项状态方案添加一条状态流转。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_state_plan_id` | string | 是 | 工作项状态方案的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `from_state_id` | string | 是 | 起始工作项状态的 id |
| `to_state_id` | string | 是 | 目标工作项状态的 id |

**请求示例**

```json
{
  "from_state_id": "5c9b35de90ad7153c2062f18",
  "to_state_id": "5c9b35de90ad7153c2062f19"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 状态流转的 id |
| `url` | string | 是 | 状态流转的地址 |
| `state_plan` | object | 是 | 工作项状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `from_state` | object | 是 | 起始工作项状态的引用结构数据 |
| `from_state.id` | string |  |  |
| `from_state.url` | string |  |  |
| `from_state.name` | string |  |  |
| `from_state.type` | string |  |  |
| `from_state.color` | string |  |  |
| `to_state` | object | 是 | 目标工作项状态的引用结构数据 |
| `to_state.id` | string |  |  |
| `to_state.url` | string |  |  |
| `to_state.name` | string |  |  |
| `to_state.type` | string |  |  |
| `to_state.color` | string |  |  |

**响应示例**

```json
{
  "id": "5cc2062f189b35de90ad7153",
  "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c20/workitem_state_flows/5cc2062f189b35de90ad7153",
  "state_plan": {
    "id": "5c9b62f18ad715335de90c20",
    "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c20"
  },
  "from_state": {
    "id": "5c9b35de90ad7153c2062f18",
    "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
    "name": "新建",
    "type": "pending",
    "color": "#ff7575"
  },
  "to_state": {
    "id": "5c9b35de90ad7153c2062f19",
    "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f19",
    "name": "进行中",
    "type": "in_progress",
    "color": "#56abfb"
  }
}
```

<a id="get-v2-pjm-workitem-state-plans-workitem-state-plan-id-workitem-state-flows-workitem-state-flow-id"></a>

### 获取工作项状态方案中的一个状态流转

`GET /v2/pjm/workitem_state_plans/{workitem_state_plan_id}/workitem_state_flows/{workitem_state_flow_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于按 id 获取工作项状态方案中的一条状态流转。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_state_plan_id` | string | 是 | 工作项状态方案的 id |
| `workitem_state_flow_id` | string | 是 | 状态流转的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 状态流转的 id |
| `url` | string | 是 | 状态流转的地址 |
| `state_plan` | object | 是 | 工作项状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `from_state` | object | 是 | 起始工作项状态的引用结构数据 |
| `from_state.id` | string |  |  |
| `from_state.url` | string |  |  |
| `from_state.name` | string |  |  |
| `from_state.type` | string |  |  |
| `from_state.color` | string |  |  |
| `to_state` | object | 是 | 目标工作项状态的引用结构数据 |
| `to_state.id` | string |  |  |
| `to_state.url` | string |  |  |
| `to_state.name` | string |  |  |
| `to_state.type` | string |  |  |
| `to_state.color` | string |  |  |

**响应示例**

```json
{
  "id": "5cc2062f189b35de90ad7153",
  "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c20/workitem_state_flows/5cc2062f189b35de90ad7153",
  "state_plan": {
    "id": "5c9b62f18ad715335de90c20",
    "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c20"
  },
  "from_state": {
    "id": "5c9b35de90ad7153c2062f18",
    "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
    "name": "新建",
    "type": "pending",
    "color": "#ff7575"
  },
  "to_state": {
    "id": "5c9b35de90ad7153c2062f19",
    "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f19",
    "name": "进行中",
    "type": "in_progress",
    "color": "#56abfb"
  }
}
```

<a id="get-v2-pjm-workitem-state-plans-workitem-state-plan-id-workitem-state-flows"></a>

### 获取工作项状态方案中的状态流转列表

`GET /v2/pjm/workitem_state_plans/{workitem_state_plan_id}/workitem_state_flows` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于分页获取工作项状态方案中的状态流转列表。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_state_plan_id` | string | 是 | 工作项状态方案的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `from_state_id` | string |  | 起始工作项状态的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 状态流转的全量结构数据的数组 |
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
| `values[].from_state.color` | string |  |  |
| `values[].to_state` | object |  |  |
| `values[].to_state.id` | string |  |  |
| `values[].to_state.url` | string |  |  |
| `values[].to_state.name` | string |  |  |
| `values[].to_state.type` | string |  |  |
| `values[].to_state.color` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5cc2062f189b35de90ad7153",
      "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c20/workitem_state_flows/5cc2062f189b35de90ad7153",
      "state_plan": {
        "id": "5c9b62f18ad715335de90c20",
        "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c20"
      },
      "from_state": {
        "id": "5c9b35de90ad7153c2062f18",
        "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
        "name": "新建",
        "type": "pending",
        "color": "#ff7575"
      },
      "to_state": {
        "id": "5c9b35de90ad7153c2062f19",
        "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f19",
        "name": "进行中",
        "type": "in_progress",
        "color": "#56abfb"
      }
    }
  ]
}
```

<a id="delete-v2-pjm-workitem-state-plans-workitem-state-plan-id-workitem-state-flows-workitem-state-flow-id"></a>

### 在工作项状态方案中移除一个状态流转

`DELETE /v2/pjm/workitem_state_plans/{workitem_state_plan_id}/workitem_state_flows/{workitem_state_flow_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于从工作项状态方案中移除一条状态流转。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_state_plan_id` | string | 是 | 工作项状态方案的 id |
| `workitem_state_flow_id` | string | 是 | 状态流转的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 状态流转的 id |
| `url` | string | 是 | 状态流转的地址 |
| `state_plan` | object | 是 | 工作项状态方案的引用结构数据 |
| `state_plan.id` | string |  |  |
| `state_plan.url` | string |  |  |
| `from_state` | object | 是 | 起始工作项状态的引用结构数据 |
| `from_state.id` | string |  |  |
| `from_state.url` | string |  |  |
| `from_state.name` | string |  |  |
| `from_state.type` | string |  |  |
| `from_state.color` | string |  |  |
| `to_state` | object | 是 | 目标工作项状态的引用结构数据 |
| `to_state.id` | string |  |  |
| `to_state.url` | string |  |  |
| `to_state.name` | string |  |  |
| `to_state.type` | string |  |  |
| `to_state.color` | string |  |  |

**响应示例**

```json
{
  "id": "5cc2062f189b35de90ad7153",
  "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c20/workitem_state_flows/5cc2062f189b35de90ad7153",
  "state_plan": {
    "id": "5c9b62f18ad715335de90c20",
    "url": "https://{rest_api_root}/v2/pjm/workitem_state_plans/5c9b62f18ad715335de90c20"
  },
  "from_state": {
    "id": "5c9b35de90ad7153c2062f18",
    "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f18",
    "name": "新建",
    "type": "pending",
    "color": "#ff7575"
  },
  "to_state": {
    "id": "5c9b35de90ad7153c2062f19",
    "url": "https://{rest_api_root}/v2/pjm/workitem_states/5c9b35de90ad7153c2062f19",
    "name": "进行中",
    "type": "in_progress",
    "color": "#56abfb"
  }
}
```

<a id="post-v2-pjm-workitem-properties"></a>

### 创建一个工作项属性

`POST /v2/pjm/workitem_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于创建一个工作项属性。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 工作项属性的名称。在一个企业中这个名称是唯一的 |
| `type` | string | 是 | 工作项属性的类型；枚举："text" / "textarea" / "select" / "multi_select" / "cascade_select" / "cascade_multi_select" / "member" / "members" / "date" / "number" / "progress" / "rate" / "link" / "referred_select" / "referred_multi_select" |
| `referred_object_type` | string |  | 引用对象的类型，当属性类型为 referred_select,referred_multi_select 时必填。用于限定该属性值是哪种数据类型的 id 或 id 数组；枚举："product" / "project" / "library" / "space" |
| `options` | object |  | 选择项列表。当工作项属性类型为 `select,multi_select,cascade_select,cascade_multi_select` 时可选填此项 |
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
      "id": "5efb1859110533727a82c604",
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
| `id` | string | 是 | 工作项属性的 id |
| `url` | string | 是 | 工作项属性的地址 |
| `name` | string | 是 | 工作项属性的名称 |
| `type` | string | 是 | 工作项属性的类型 |
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
  "url": "https://{rest_api_root}/v2/pjm/workitem_properties/severity",
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
  "url": "https://{rest_api_root}/v2/pjm/workitem_properties/jiliandanxuan",
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

<a id="get-v2-pjm-workitem-properties-workitem-property-id"></a>

### 获取一个工作项属性

`GET /v2/pjm/workitem_properties/{workitem_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于按 id 获取工作项属性全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_property_id` | string | 是 | 工作项属性的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的工作项属性。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项属性的 id |
| `url` | string | 是 | 工作项属性的地址 |
| `name` | string | 是 | 工作项属性的名称 |
| `type` | string | 是 | 工作项属性的类型 |
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
| `is_deleted` | number | 是 | 是否已删除 |

**响应示例**

```json
{
  "id": "severity",
  "url": "https://{rest_api_root}/v2/pjm/workitem_properties/severity",
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
  "display_separator": null,
  "is_deleted": 0
}
```

<a id="patch-v2-pjm-workitem-properties-workitem-property-id"></a>

### 部分更新一个工作项属性

`PATCH /v2/pjm/workitem_properties/{workitem_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于部分更新一个工作项属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_property_id` | string | 是 | 工作项属性的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 工作项属性的名称。在一个企业中这个名称是唯一的 |
| `referred_object_type` | string |  | 引用对象的类型，当属性类型为 referred_select,referred_multi_select 时必填。用于限定该属性值是哪种数据类型的 id 或 id 数组；枚举："product" / "project" / "library" / "space" |
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
      "id": "5efb1859110533727a82c624",
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
    },
    {
      "text": "子-create",
      "parent_id": "64b9f741eec7fd94e63b411f"
    }
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项属性的 id |
| `url` | string | 是 | 工作项属性的地址 |
| `name` | string | 是 | 工作项属性的名称 |
| `type` | string | 是 | 工作项属性的类型 |
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
  "url": "https://{rest_api_root}/v2/pjm/workitem_properties/severity",
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
  "url": "https://{rest_api_root}/v2/pjm/workitem_properties/jiliandanxuan",
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
    },
    {
      "id": "64b9f741eec7fd94e63b411g",
      "text": "子-create",
      "color": "#FF7575",
      "parent_id": "64b9f741eec7fd94e63b411f"
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

<a id="get-v2-pjm-workitem-properties"></a>

### 获取全部工作项属性列表

`GET /v2/pjm/workitem_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于分页获取企业内全部工作项属性。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的工作项属性。该值默认为 `false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项属性全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].type` | string |  |  |
| `values[].options` | object[] \| null |  |  |
| `values[].is_removable` | number |  |  |
| `values[].is_name_editable` | number |  |  |
| `values[].is_options_editable` | number |  |  |
| `values[].select_all_level` | boolean |  |  |
| `values[].display_all_level` | boolean |  |  |
| `values[].display_separator` | null |  |  |
| `values[].is_deleted` | number |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "severity",
      "url": "https://{rest_api_root}/v2/pjm/workitem_properties/severity",
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
      "display_separator": null,
      "is_deleted": 0
    },
    {
      "id": "identifier",
      "url": "https://{rest_api_root}/v2/pjm/workitem_properties/identifier",
      "name": "编号",
      "type": "text",
      "options": null,
      "is_removable": 0,
      "is_name_editable": 0,
      "is_options_editable": 0,
      "select_all_level": false,
      "display_all_level": false,
      "display_separator": null,
      "is_deleted": 0
    }
  ]
}
```

<a id="get-v2-pjm-workitem-property-plans-workitem-property-plan-id"></a>

### 获取一个工作项属性方案

`GET /v2/pjm/workitem_property_plans/{workitem_property_plan_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于按 id 获取工作项属性方案全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_property_plan_id` | string | 是 | 工作项属性方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项属性方案的 id |
| `url` | string | 是 | 工作项属性方案的地址 |
| `workitem_type` | object | 是 | 工作项属性方案适用的工作项类型 |
| `workitem_type.id` | string |  |  |
| `workitem_type.url` | string |  |  |
| `workitem_type.name` | string |  |  |
| `workitem_type.group` | string |  |  |
| `project_template` | object | 是 | 项目流程模版的引用结构数据。该方案属于此项目流程模版 |
| `project_template.id` | string |  |  |
| `project_template.url` | string |  |  |
| `project_template.name` | string |  |  |
| `project_template.type` | string |  |  |
| `project_template.is_system` | number |  |  |
| `project` | object | 是 | 项目的引用结构数据。该方案是此项目的本地化方案 |
| `project.id` | string |  |  |
| `project.url` | string |  |  |
| `project.identifier` | string |  |  |
| `project.name` | string |  |  |
| `project.template_type` | string |  |  |
| `project.is_archived` | number |  |  |
| `project.is_deleted` | number |  |  |

**响应示例 1：响应示例（流程方案）**

```json
{
  "id": "5f8a21f18ef715265de90c21",
  "url": "https://{rest_api_root}/v2/pjm/workitem_property_plans/5f8a21f18ef715265de90c21",
  "workitem_type": {
    "id": "630da48bc9443b1aa94ce3ea",
    "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
    "name": "用户故事",
    "group": "requirement"
  },
  "project_template": {
    "id": "5fa690f1ae0571487ea49030",
    "url": "https://{rest_api_root}/v2/pjm/project_templates/5fa690f1ae0571487ea49030",
    "name": "Scrum 项目流程",
    "type": "scrum",
    "is_system": 1
  },
  "project": null
}
```

**响应示例 2：响应示例（项目本地化方案）**

```json
{
  "id": "5f8a21f18ef715265de90c22",
  "url": "https://{rest_api_root}/v2/pjm/workitem_property_plans/5f8a21f18ef715265de90c22",
  "workitem_type": {
    "id": "630da48bc9443b1aa94ce3ea",
    "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
    "name": "用户故事",
    "group": "requirement"
  },
  "project_template": null,
  "project": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "template_type": "scrum",
    "is_archived": 0,
    "is_deleted": 0
  }
}
```

<a id="get-v2-pjm-workitem-property-plans"></a>

### 获取工作项属性方案列表

`GET /v2/pjm/workitem_property_plans` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于分页获取工作项属性方案列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `for_project_id` | string |  | 项目的 id。只返回该项目正在使用的工作项属性方案 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项属性方案的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].workitem_type` | object |  |  |
| `values[].workitem_type.id` | string |  |  |
| `values[].workitem_type.url` | string |  |  |
| `values[].workitem_type.name` | string |  |  |
| `values[].workitem_type.group` | string |  |  |
| `values[].project_template` | object \| null |  |  |
| `values[].project` | null \| object |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "5f8a21f18ef715265de90c21",
      "url": "https://{rest_api_root}/v2/pjm/workitem_property_plans/5f8a21f18ef715265de90c21",
      "workitem_type": {
        "id": "630da48bc9443b1aa94ce3ea",
        "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
        "name": "用户故事",
        "group": "requirement"
      },
      "project_template": {
        "id": "5fa690f1ae0571487ea49030",
        "url": "https://{rest_api_root}/v2/pjm/project_templates/5fa690f1ae0571487ea49030",
        "name": "Scrum 项目流程",
        "type": "scrum",
        "is_system": 1
      },
      "project": null
    },
    {
      "id": "5f8a21f18ef715265de90c22",
      "url": "https://{rest_api_root}/v2/pjm/workitem_property_plans/5f8a21f18ef715265de90c22",
      "workitem_type": {
        "id": "630da48bc9443b1aa94ce3ea",
        "url": "https://{rest_api_root}/v2/pjm/workitem_types/630da48bc9443b1aa94ce3ea",
        "name": "用户故事",
        "group": "requirement"
      },
      "project_template": null,
      "project": {
        "id": "5eb623f6a70571487ea47000",
        "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
        "identifier": "SCR",
        "name": "Scrum 项目",
        "template_type": "scrum",
        "is_archived": 0,
        "is_deleted": 0
      }
    }
  ]
}
```

<a id="post-v2-pjm-workitem-property-plans-workitem-property-plan-id-workitem-properties"></a>

### 向工作项属性方案中添加一个属性

`POST /v2/pjm/workitem_property_plans/{workitem_property_plan_id}/workitem_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于向工作项属性方案中添加一个属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_property_plan_id` | string | 是 | 工作项属性方案的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `property_id` | string | 是 | 工作项属性的 id |

**请求示例**

```json
{
  "property_id": "severity"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 资源的 id |
| `url` | string | 是 | 资源的地址 |
| `property_plan` | object | 是 | 工作项属性方案的引用结构数据 |
| `property_plan.id` | string |  |  |
| `property_plan.url` | string |  |  |
| `property` | object | 是 | 属性的引用结构数据 |
| `property.id` | string |  |  |
| `property.url` | string |  |  |
| `property.name` | string |  |  |
| `property.type` | string |  |  |

**响应示例**

```json
{
  "id": "severity",
  "url": "https://{rest_api_root}/v2/pjm/workitem_property_plans/5f8a21f18ef715265de90c21/workitem_properties/severity",
  "property_plan": {
    "id": "5f8a21f18ef715265de90c21",
    "url": "https://{rest_api_root}/v2/pjm/workitem_property_plans/5f8a21f18ef715265de90c21"
  },
  "property": {
    "id": "severity",
    "url": "https://{rest_api_root}/v2/pjm/workitem_properties/severity",
    "name": "严重程度",
    "type": "select"
  }
}
```

<a id="get-v2-pjm-workitem-property-plans-workitem-property-plan-id-workitem-properties-workitem-property-id"></a>

### 获取工作项属性方案中的一个属性

`GET /v2/pjm/workitem_property_plans/{workitem_property_plan_id}/workitem_properties/{workitem_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于按 id 获取工作项属性方案中的一个属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_property_plan_id` | string | 是 | 工作项属性方案的 id |
| `workitem_property_id` | string | 是 | 工作项属性的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项属性方案中属性关联的 id |
| `url` | string | 是 | 工作项属性方案中属性关联的地址 |
| `property_plan` | object | 是 | 工作项属性方案的引用结构数据 |
| `property_plan.id` | string |  |  |
| `property_plan.url` | string |  |  |
| `property` | object | 是 | 工作项属性的引用结构数据 |
| `property.id` | string |  |  |
| `property.url` | string |  |  |
| `property.name` | string |  |  |
| `property.type` | string |  |  |

**响应示例**

```json
{
  "id": "severity",
  "url": "https://{rest_api_root}/v2/pjm/workitem_property_plans/5f8a21f18ef715265de90c21/workitem_properties/severity",
  "property_plan": {
    "id": "5f8a21f18ef715265de90c21",
    "url": "https://{rest_api_root}/v2/pjm/workitem_property_plans/5f8a21f18ef715265de90c21"
  },
  "property": {
    "id": "severity",
    "url": "https://{rest_api_root}/v2/pjm/workitem_properties/severity",
    "name": "严重程度",
    "type": "select"
  }
}
```

<a id="get-v2-pjm-workitem-property-plans-workitem-property-plan-id-workitem-properties"></a>

### 获取工作项属性方案中的属性列表

`GET /v2/pjm/workitem_property_plans/{workitem_property_plan_id}/workitem_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于分页获取工作项属性方案中的属性列表。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_property_plan_id` | string | 是 | 工作项属性方案的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项属性方案中属性的全量结构数据的数组 |
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
  "total": 2,
  "values": [
    {
      "id": "severity",
      "url": "https://{rest_api_root}/v2/pjm/workitem_property_plans/5f8a21f18ef715265de90c21/workitem_properties/severity",
      "property_plan": {
        "id": "5f8a21f18ef715265de90c21",
        "url": "https://{rest_api_root}/v2/pjm/workitem_property_plans/5f8a21f18ef715265de90c21"
      },
      "property": {
        "id": "severity",
        "url": "https://{rest_api_root}/v2/pjm/workitem_properties/severity",
        "name": "严重程度",
        "type": "select"
      }
    },
    {
      "id": "identifier",
      "url": "https://{rest_api_root}/v2/pjm/workitem_property_plans/5f8a21f18ef715265de90c21/workitem_properties/identifier",
      "property_plan": {
        "id": "5f8a21f18ef715265de90c21",
        "url": "https://{rest_api_root}/v2/pjm/workitem_property_plans/5f8a21f18ef715265de90c21"
      },
      "property": {
        "id": "identifier",
        "url": "https://{rest_api_root}/v2/pjm/workitem_properties/identifier",
        "name": "编号",
        "type": "text"
      }
    }
  ]
}
```

<a id="delete-v2-pjm-workitem-property-plans-workitem-property-plan-id-workitem-properties-workitem-property-id"></a>

### 在工作项属性方案中移除一个属性

`DELETE /v2/pjm/workitem_property_plans/{workitem_property_plan_id}/workitem_properties/{workitem_property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:pjm:configuration`

用于从工作项属性方案中移除一个属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_property_plan_id` | string | 是 | 工作项属性方案的 id |
| `workitem_property_id` | string | 是 | 工作项属性的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 资源的 id |
| `url` | string | 是 | 资源的地址 |
| `property_plan` | object | 是 | 工作项属性方案的引用结构数据 |
| `property_plan.id` | string |  |  |
| `property_plan.url` | string |  |  |
| `property` | object | 是 | 属性的引用结构数据 |
| `property.id` | string |  |  |
| `property.url` | string |  |  |
| `property.name` | string |  |  |
| `property.type` | string |  |  |

**响应示例**

```json
{
  "id": "severity",
  "url": "https://{rest_api_root}/v2/pjm/workitem_property_plans/5f8a21f18ef715265de90c21/workitem_properties/severity",
  "property_plan": {
    "id": "5f8a21f18ef715265de90c21",
    "url": "https://{rest_api_root}/v2/pjm/workitem_property_plans/5f8a21f18ef715265de90c21"
  },
  "property": {
    "id": "severity",
    "url": "https://{rest_api_root}/v2/pjm/workitem_properties/severity",
    "name": "严重程度",
    "type": "select"
  }
}
```

<a id="get-v2-pjm-workitem-priorities-workitem-priority-id"></a>

### 获取一个工作项优先级

`GET /v2/pjm/workitem_priorities/{workitem_priority_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于按 id 获取工作项优先级全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workitem_priority_id` | string | 是 | 工作项优先级的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工作项优先级的 id |
| `url` | string | 是 | 工作项优先级的地址 |
| `name` | string | 是 | 工作项优先级的名称 |
| `color` | string | 是 | 优先级的颜色 |

**响应示例**

```json
{
  "id": "5eb623f6a70571487ea47111",
  "url": "https://{rest_api_root}/v2/pjm/workitem_priorities/5eb623f6a70571487ea47111",
  "name": "最高",
  "color": "#FF7575"
}
```

<a id="get-v2-pjm-workitem-priorities"></a>

### 获取全部工作项优先级列表

`GET /v2/pjm/workitem_priorities` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:pjm:configuration`

用于分页获取企业内全部工作项优先级。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工作项优先级全量结构数据的数组 |
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
      "id": "5eb623f6a70571487ea47111",
      "url": "https://{rest_api_root}/v2/pjm/workitem_priorities/5eb623f6a70571487ea47111",
      "name": "最高",
      "color": "#FF7575"
    }
  ]
}
```
