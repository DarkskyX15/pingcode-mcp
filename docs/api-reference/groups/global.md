# 全局

> 区域 `global`（全局） ｜ 20 个内容分组 ｜ 83 个端点（未公开 4）

[← 返回 API 总览](../README.md)

## 个人

> 分组路径：全局 / 个人

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `GET` | `/v2/myself` | [获取个人信息](#get-v2-myself) | 用户令牌 |

<a id="get-v2-myself"></a>

### 获取个人信息

`GET /v2/myself` ｜ 令牌：用户令牌 ｜ Scope：`pcp:read:account:personal`

用于获取当前用户的个人信息。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 个人的 id |
| `url` | string | 是 | 个人的地址 |
| `name` | string | 是 | 个人的名称 |
| `display_name` | string | 是 | 个人的显示名 |
| `avatar` | string | 是 | 个人的头像 |
| `department` | object | 是 | 个人的部门 |
| `department.id` | string |  |  |
| `department.url` | string |  |  |
| `department.name` | string |  |  |
| `job` | object | 是 | 个人的职位 |
| `job.id` | string |  |  |
| `job.url` | string |  |  |
| `job.name` | string |  |  |
| `email` | string | 是 | 个人的邮箱 |
| `mobile` | string | 是 | 个人的手机号 |
| `status` | string | 是 | 个人的状态 |
| `employee_number` | string | 是 | 个人的工号 |
| `locale` | string | 是 | 个人的语言偏好 |
| `timezone` | string | 是 | 个人的时区偏好 |

**响应示例**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
  "name": "john",
  "display_name": "John",
  "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png",
  "department": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/directory/departments/6422711c3f12e6c1e46d40e6",
    "name": "技术支持"
  },
  "job": {
    "id": "6440c881c56f557eb1aff6e5",
    "url": "https://{rest_api_root}/v2/directory/jobs/6440c881c56f557eb1aff6e5",
    "name": "后端工程师"
  },
  "email": "terry@pingcode.com",
  "mobile": "15000000000",
  "status": "enabled",
  "employee_number": "zxv",
  "locale": "zh-CN",
  "timezone": "Asia/Shanghai"
}
```

## 组织

> 分组路径：全局 / 组织

## 企业

> 分组路径：全局 / 组织 / 企业

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `GET` | `/v2/directory/team` | [获取企业信息](#get-v2-directory-team) | 企业令牌 / 用户令牌 |

<a id="get-v2-directory-team"></a>

### 获取企业信息

`GET /v2/directory/team` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:team`

用于获取当前企业的基本信息。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 企业的 id |
| `url` | string | 是 | 企业的地址 |
| `name` | string | 是 | 企业的名称 |
| `domain` | string | 是 | 企业的二级域名 |

**响应示例**

```json
{
  "id": "56ba35de87ad7153c2062f65",
  "url": "https://{rest_api_root}/v2/directory/team",
  "name": "YCtech",
  "domain": "yctech"
}
```

## 企业成员

> 分组路径：全局 / 组织 / 企业成员

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/directory/users` | [创建一个企业成员](#post-v2-directory-users) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/directory/users/{user_id}` | [获取一个企业成员](#get-v2-directory-users-user-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/directory/users/{user_id}` | [部分更新一个企业成员](#patch-v2-directory-users-user-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/directory/users/bulk/set` | [批量设置企业成员属性](#post-v2-directory-users-bulk-set) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/directory/users` | [获取企业成员列表](#get-v2-directory-users) | 企业令牌 / 用户令牌 |

<a id="post-v2-directory-users"></a>

### 创建一个企业成员

`POST /v2/directory/users` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:global:team`

用于创建一个企业成员。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 企业成员的名称，在一个企业中这个名称是唯一的 |
| `display_name` | string | 是 | 企业成员的显示名 |
| `email` | string |  | 企业成员的邮箱地址，在一个企业中这个邮箱地址是唯一的，邮箱地址和手机号其中一个必填 |
| `mobile` | string |  | 企业成员的手机号，在一个企业中这个手机号是唯一，邮箱地址和手机号其中一个必填 |
| `password` | string |  | 企业成员的密码，长度为 6～200 的字符串(包含 6 和 200) |
| `department_id` | string |  | 企业成员的部门 id |
| `job_id` | string |  | 企业成员的职位 id |
| `employee_number` | string |  | 企业成员的工号 |

**请求示例**

```json
{
  "name": "john",
  "display_name": "John",
  "email": "john@email.com",
  "mobile": "15000000000",
  "password": "123456",
  "department_id": "6422711c3f12e6c1e46d40e6",
  "job_id": "6440c881c56f557eb1aff6e5",
  "employee_number": "zxv"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 企业成员的 id |
| `url` | string | 是 | 企业成员的资源地址 |
| `name` | string | 是 | 企业成员的名称 |
| `display_name` | string | 是 | 企业成员的显示名 |
| `avatar` | string | 是 | 企业成员的头像地址 |
| `department` | object | 是 | 企业成员的部门 |
| `department.id` | string |  |  |
| `department.url` | string |  |  |
| `department.name` | string |  |  |
| `job` | object | 是 | 企业成员的职位 |
| `job.id` | string |  |  |
| `job.url` | string |  |  |
| `job.name` | string |  |  |
| `email` | string | 是 | 企业成员的邮箱地址 |
| `mobile` | string | 是 | 企业成员的手机号 |
| `status` | string | 是 | 企业成员的状态；枚举："enabled" / "disabled" / "init" |
| `employee_number` | string | 是 | 企业成员的工号 |

**响应示例**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
  "name": "john",
  "display_name": "John",
  "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png",
  "department": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/directory/departments/6422711c3f12e6c1e46d40e6",
    "name": "技术支持"
  },
  "job": {
    "id": "6440c881c56f557eb1aff6e5",
    "url": "https://{rest_api_root}/v2/directory/jobs/6440c881c56f557eb1aff6e5",
    "name": "后端工程师"
  },
  "email": "john@email.com",
  "mobile": "15000000000",
  "status": "init",
  "employee_number": "zxv"
}
```

<a id="get-v2-directory-users-user-id"></a>

### 获取一个企业成员

`GET /v2/directory/users/{user_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:team`

用于按 id 获取企业成员全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `user_id` | string | 是 | 企业成员的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 企业成员的 id |
| `url` | string | 是 | 企业成员的资源地址 |
| `name` | string | 是 | 企业成员的名称 |
| `display_name` | string | 是 | 企业成员的显示名 |
| `avatar` | string | 是 | 企业成员的头像地址 |
| `department` | object | 是 | 企业成员的部门 |
| `department.id` | string |  |  |
| `department.url` | string |  |  |
| `department.name` | string |  |  |
| `job` | object | 是 | 企业成员的职位 |
| `job.id` | string |  |  |
| `job.url` | string |  |  |
| `job.name` | string |  |  |
| `email` | string | 是 | 企业成员的邮箱地址 |
| `mobile` | string | 是 | 企业成员的手机号 |
| `status` | string | 是 | 企业成员的状态；枚举："enabled" / "disabled" / "init" |
| `employee_number` | string | 是 | 企业成员的工号 |

**响应示例**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
  "name": "john",
  "display_name": "John",
  "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png",
  "department": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/directory/departments/6422711c3f12e6c1e46d40e6",
    "name": "技术支持"
  },
  "job": {
    "id": "6440c881c56f557eb1aff6e5",
    "url": "https://{rest_api_root}/v2/directory/jobs/6440c881c56f557eb1aff6e5",
    "name": "后端工程师"
  },
  "email": "john@email.com",
  "mobile": "15000000000",
  "status": "enabled",
  "employee_number": "zxv"
}
```

<a id="patch-v2-directory-users-user-id"></a>

### 部分更新一个企业成员

`PATCH /v2/directory/users/{user_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:global:team`

用于部分更新一个企业成员。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `user_id` | string | 是 | 企业成员的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 企业成员的名称，在一个企业中这个名称是唯一的 |
| `display_name` | string |  | 企业成员的显示名 |
| `email` | string |  | 企业成员的邮箱地址，在一个企业中这个邮箱地址是唯一的 |
| `mobile` | string |  | 企业成员的手机号，在一个企业中这个手机号是唯一的 |
| `status` | string |  | 企业成员的状态；枚举："enabled" / "disabled" |
| `employee_number` | string |  | 企业成员的工号 |
| `department_id` | string |  | 企业成员的部门 id |
| `job_id` | string |  | 企业成员的职位 id |

**请求示例**

```json
{
  "name": "john",
  "display_name": "John",
  "email": "john@email.com",
  "mobile": "15000000000",
  "status": "enabled",
  "employee_number": "zxv",
  "department_id": "6422711c3f12e6c1e46d40e6",
  "job_id": "6440c881c56f557eb1aff6e5"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 企业成员的 id |
| `url` | string | 是 | 企业成员的资源地址 |
| `name` | string | 是 | 企业成员的名称 |
| `display_name` | string | 是 | 企业成员的显示名 |
| `avatar` | string | 是 | 企业成员的头像地址 |
| `department` | object | 是 | 企业成员的部门 |
| `department.id` | string |  |  |
| `department.url` | string |  |  |
| `department.name` | string |  |  |
| `job` | object | 是 | 企业成员的职位 |
| `job.id` | string |  |  |
| `job.url` | string |  |  |
| `job.name` | string |  |  |
| `email` | string | 是 | 企业成员的邮箱地址 |
| `mobile` | string | 是 | 企业成员的手机号 |
| `status` | string | 是 | 企业成员的状态；枚举："enabled" / "disabled" / "init" |
| `employee_number` | string | 是 | 企业成员的工号 |

**响应示例**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
  "name": "john",
  "display_name": "John",
  "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png",
  "department": {
    "id": "6422711c3f12e6c1e46d40e6",
    "url": "https://{rest_api_root}/v2/directory/departments/6422711c3f12e6c1e46d40e6",
    "name": "技术支持"
  },
  "job": {
    "id": "6440c881c56f557eb1aff6e5",
    "url": "https://{rest_api_root}/v2/directory/jobs/6440c881c56f557eb1aff6e5",
    "name": "后端工程师"
  },
  "email": "john@email.com",
  "mobile": "15000000000",
  "status": "enabled",
  "employee_number": "zxv"
}
```

<a id="post-v2-directory-users-bulk-set"></a>

### 批量设置企业成员属性

`POST /v2/directory/users/bulk/set` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:global:team`

用于批量为多个企业成员设置相同的属性值。单次最多支持 100 条。  
接口支持部分成功，单条失败不会影响其他条目，已成功的数据不会回滚。  
响应按请求条目顺序返回对应结果，通过 `state`（`success` / `failure`）判断操作结果，失败时通过 `message` 返回失败原因。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ids` | string[] | 是 | 企业成员 id 列表。数组长度不超过 100，不能包含自己和团队拥有者 |
| `property_name` | string | 是 | 需要设置的企业成员属性名，目前仅支持：status（可选值为：enabled、disabled） |
| `property_value` | string | 是 | 需要设置的企业成员属性值 |

**请求示例**

```json
{
  "ids": [
    "a0417f68e846aae315c85d24643678a9"
  ],
  "property_name": "status",
  "property_value": "enabled"
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```json
[
  {
    "state": "success",
    "id": "a0417f68e846aae315c85d24643678a9"
  }
]
```

<a id="get-v2-directory-users"></a>

### 获取企业成员列表

`GET /v2/directory/users` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:team`

用于分页获取企业成员列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 企业成员的名称，在一个企业中这个名称是唯一的 |
| `keywords` | string |  | 关键词模糊搜索，支持姓名、用户名 |
| `emails` | string |  | 企业成员的邮箱地址，使用','分割，最多只能 20 个 |
| `mobiles` | string |  | 企业成员的手机号，使用','分割，最多只能 20 个 |
| `department_ids` | string |  | 企业成员的部门 id，使用','分割，最多只能 20 个 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 企业成员全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].display_name` | string |  |  |
| `values[].avatar` | string |  |  |
| `values[].department` | object |  |  |
| `values[].department.id` | string |  |  |
| `values[].department.url` | string |  |  |
| `values[].department.name` | string |  |  |
| `values[].job` | object |  |  |
| `values[].job.id` | string |  |  |
| `values[].job.url` | string |  |  |
| `values[].job.name` | string |  |  |
| `values[].email` | string |  |  |
| `values[].mobile` | string |  |  |
| `values[].status` | string |  |  |
| `values[].employee_number` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
      "name": "john",
      "display_name": "John",
      "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png",
      "department": {
        "id": "6422711c3f12e6c1e46d40e6",
        "url": "https://{rest_api_root}/v2/directory/departments/6422711c3f12e6c1e46d40e6",
        "name": "技术支持"
      },
      "job": {
        "id": "6440c881c56f557eb1aff6e5",
        "url": "https://{rest_api_root}/v2/directory/jobs/6440c881c56f557eb1aff6e5",
        "name": "后端工程师"
      },
      "email": "john@email.com",
      "mobile": "15000000000",
      "status": "enabled",
      "employee_number": "zxv"
    }
  ]
}
```

## 部门

> 分组路径：全局 / 组织 / 部门

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/directory/departments` | [创建一个部门](#post-v2-directory-departments) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/directory/departments/{department_id}` | [获取一个部门](#get-v2-directory-departments-department-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/directory/departments/{department_id}` | [部分更新一个部门](#patch-v2-directory-departments-department-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/directory/departments` | [获取部门列表](#get-v2-directory-departments) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/directory/departments/{department_id}` | [删除一个部门](#delete-v2-directory-departments-department-id) | 企业令牌 / 用户令牌 |

<a id="post-v2-directory-departments"></a>

### 创建一个部门

`POST /v2/directory/departments` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:global:team`

用于创建一个部门。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 部门的名称，在一个企业中这个名称是唯一的 |
| `parent_id` | string |  | 父部门的 id |
| `manager_id` | string |  | 部门负责人的 id |

**请求示例**

```json
{
  "name": "技术支持",
  "parent_id": "6422711c3f12e6c1e46d40e2",
  "manager_id": "70e9933e5e7948779b9b8978b6489038"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 部门的 id |
| `url` | string | 是 | 部门的资源地址 |
| `name` | string | 是 | 部门的名称 |
| `manager` | object | 是 | 部门的负责人 |
| `manager.id` | string |  |  |
| `manager.url` | string |  |  |
| `manager.name` | string |  |  |
| `manager.display_name` | string |  |  |
| `manager.avatar` | string |  |  |
| `parent` | object | 是 | 父部门 |
| `parent.id` | string |  |  |
| `parent.url` | string |  |  |
| `parent.name` | string |  |  |

**响应示例**

```json
{
  "id": "6422711c3f12e6c1e46d40e6",
  "url": "https://{rest_api_root}/v2/directory/departments/6422711c3f12e6c1e46d40e6",
  "name": "技术支持",
  "manager": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "parent": {
    "id": "6422711c3f12e6c1e46d40e2",
    "url": "https://{rest_api_root}/v2/directory/departments/6422711c3f12e6c1e46d40e2",
    "name": "技术中心"
  }
}
```

<a id="get-v2-directory-departments-department-id"></a>

### 获取一个部门

`GET /v2/directory/departments/{department_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:team`

用于按 id 获取部门全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `department_id` | string | 是 | 部门的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 部门的 id |
| `url` | string | 是 | 部门的资源地址 |
| `name` | string | 是 | 部门的名称 |
| `manager` | object | 是 | 部门的负责人 |
| `manager.id` | string |  |  |
| `manager.url` | string |  |  |
| `manager.name` | string |  |  |
| `manager.display_name` | string |  |  |
| `manager.avatar` | string |  |  |
| `parent` | object | 是 | 父部门 |
| `parent.id` | string |  |  |
| `parent.url` | string |  |  |
| `parent.name` | string |  |  |

**响应示例**

```json
{
  "id": "6422711c3f12e6c1e46d40e6",
  "url": "https://{rest_api_root}/v2/directory/departments/6422711c3f12e6c1e46d40e6",
  "name": "技术支持",
  "manager": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "parent": {
    "id": "6422711c3f12e6c1e46d40e2",
    "url": "https://{rest_api_root}/v2/directory/departments/6422711c3f12e6c1e46d40e2",
    "name": "技术中心"
  }
}
```

<a id="patch-v2-directory-departments-department-id"></a>

### 部分更新一个部门

`PATCH /v2/directory/departments/{department_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:global:team`

用于部分更新一个部门。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `department_id` | string | 是 | 部门的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 部门的名称，在一个企业中这个名称是唯一的 |
| `parent_id` | string |  | 父部门的 id |
| `manager_id` | string |  | 部门负责人的 id |

**请求示例**

```json
{
  "name": "技术支持",
  "parent_id": "6422711c3f12e6c1e46d40e2",
  "manager_id": "70e9933e5e7948779b9b8978b6489038"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 部门的 id |
| `url` | string | 是 | 部门的资源地址 |
| `name` | string | 是 | 部门的名称 |
| `manager` | object | 是 | 部门的负责人 |
| `manager.id` | string |  |  |
| `manager.url` | string |  |  |
| `manager.name` | string |  |  |
| `manager.display_name` | string |  |  |
| `manager.avatar` | string |  |  |
| `parent` | object | 是 | 父部门 |
| `parent.id` | string |  |  |
| `parent.url` | string |  |  |
| `parent.name` | string |  |  |

**响应示例**

```json
{
  "id": "6422711c3f12e6c1e46d40e6",
  "url": "https://{rest_api_root}/v2/directory/departments/6422711c3f12e6c1e46d40e6",
  "name": "技术支持",
  "manager": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "parent": {
    "id": "6422711c3f12e6c1e46d40e2",
    "url": "https://{rest_api_root}/v2/directory/departments/6422711c3f12e6c1e46d40e2",
    "name": "技术中心"
  }
}
```

<a id="get-v2-directory-departments"></a>

### 获取部门列表

`GET /v2/directory/departments` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:team`

用于分页获取企业部门列表。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 部门全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].manager` | object |  |  |
| `values[].manager.id` | string |  |  |
| `values[].manager.url` | string |  |  |
| `values[].manager.name` | string |  |  |
| `values[].manager.display_name` | string |  |  |
| `values[].manager.avatar` | string |  |  |
| `values[].parent` | object |  |  |
| `values[].parent.id` | string |  |  |
| `values[].parent.url` | string |  |  |
| `values[].parent.name` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "6422711c3f12e6c1e46d40e6",
      "url": "https://{rest_api_root}/v2/directory/departments/6422711c3f12e6c1e46d40e6",
      "name": "技术支持",
      "manager": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "parent": {
        "id": "6422711c3f12e6c1e46d40e2",
        "url": "https://{rest_api_root}/v2/directory/departments/6422711c3f12e6c1e46d40e2",
        "name": "技术中心"
      }
    }
  ]
}
```

<a id="delete-v2-directory-departments-department-id"></a>

### 删除一个部门

`DELETE /v2/directory/departments/{department_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:global:team`

用于按 id 删除一个部门。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `department_id` | string | 是 | 部门的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 部门的 id |
| `url` | string | 是 | 部门的资源地址 |
| `name` | string | 是 | 部门的名称 |
| `manager` | object | 是 | 部门的负责人 |
| `manager.id` | string |  |  |
| `manager.url` | string |  |  |
| `manager.name` | string |  |  |
| `manager.display_name` | string |  |  |
| `manager.avatar` | string |  |  |
| `parent` | object | 是 | 父部门 |
| `parent.id` | string |  |  |
| `parent.url` | string |  |  |
| `parent.name` | string |  |  |

**响应示例**

```json
{
  "id": "6422711c3f12e6c1e46d40e6",
  "url": "https://{rest_api_root}/v2/directory/departments/6422711c3f12e6c1e46d40e6",
  "name": "技术支持",
  "manager": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "parent": {
    "id": "6422711c3f12e6c1e46d40e2",
    "url": "https://{rest_api_root}/v2/directory/departments/6422711c3f12e6c1e46d40e2",
    "name": "技术中心"
  }
}
```

## 团队

> 分组路径：全局 / 组织 / 团队

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/directory/user_groups` | [创建一个团队](#post-v2-directory-user-groups) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/directory/user_groups/{user_group_id}` | [获取一个团队](#get-v2-directory-user-groups-user-group-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/directory/user_groups/{user_group_id}` | [部分更新一个团队](#patch-v2-directory-user-groups-user-group-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/directory/user_groups` | [获取团队列表](#get-v2-directory-user-groups) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/directory/user_groups/{user_group_id}/members` | [向团队中添加一个成员](#post-v2-directory-user-groups-user-group-id-members) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/directory/user_groups/{user_group_id}/members/{member_id}` | [获取团队中的一个成员](#get-v2-directory-user-groups-user-group-id-members-member-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/directory/user_groups/{user_group_id}/members` | [获取团队中的成员列表](#get-v2-directory-user-groups-user-group-id-members) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/directory/user_groups/{user_group_id}/members/{member_id}` | [在团队中移除一个成员](#delete-v2-directory-user-groups-user-group-id-members-member-id) | 企业令牌 / 用户令牌 |

<a id="post-v2-directory-user-groups"></a>

### 创建一个团队

`POST /v2/directory/user_groups` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:global:team`

用于创建一个团队。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 团队的名称，在一个企业中这个名称是唯一的 |
| `visibility` | string |  | 团队的可见范围；枚举："private" / "public" |
| `description` | string |  | 团队的描述 |

**请求示例**

```json
{
  "name": "Open Team",
  "visibility": "private",
  "description": "This is Open Team."
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 团队的 id |
| `url` | string | 是 | 团队的资源地址 |
| `name` | string | 是 | 团队的名称 |
| `visibility` | string | 是 | 团队的可见性；枚举："private" / "public" |
| `description` | string | 是 | 团队的描述 |

**响应示例**

```json
{
  "id": "63c8fb32729dee3334d96af7",
  "url": "https://{rest_api_root}/v2/directory/user_groups/63c8fb32729dee3334d96af7",
  "name": "Open Team",
  "visibility": "private",
  "description": "This is Open Team."
}
```

<a id="get-v2-directory-user-groups-user-group-id"></a>

### 获取一个团队

`GET /v2/directory/user_groups/{user_group_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:team`

用于按 id 获取团队全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `user_group_id` | string | 是 | 团队的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 团队的 id |
| `url` | string | 是 | 团队的资源地址 |
| `name` | string | 是 | 团队的名称 |
| `visibility` | string | 是 | 团队的可见性；枚举："private" / "public" |
| `description` | string | 是 | 团队的描述 |

**响应示例**

```json
{
  "id": "63c8fb32729dee3334d96af7",
  "url": "https://{rest_api_root}/v2/directory/user_groups/63c8fb32729dee3334d96af7",
  "name": "Open Team",
  "visibility": "private",
  "description": "This is Open Team."
}
```

<a id="patch-v2-directory-user-groups-user-group-id"></a>

### 部分更新一个团队

`PATCH /v2/directory/user_groups/{user_group_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:global:team`

用于部分更新一个团队。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `user_group_id` | string | 是 | 团队 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 团队的名称，在一个企业中这个名称是唯一的 |
| `visibility` | string |  | 团队的可见范围；枚举："private" / "public" |
| `description` | string |  | 团队的描述 |

**请求示例**

```json
{
  "name": "Open Team Update",
  "visibility": "public",
  "description": "This is Update Open Team."
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 团队的 id |
| `url` | string | 是 | 团队的资源地址 |
| `name` | string | 是 | 团队的名称 |
| `visibility` | string | 是 | 团队的可见性；枚举："private" / "public" |
| `description` | string | 是 | 团队的描述 |

**响应示例**

```json
{
  "id": "63c8fb32729dee3334d96af7",
  "url": "https://{rest_api_root}/v2/directory/user_groups/63c8fb32729dee3334d96af7",
  "name": "Open Team Update",
  "visibility": "public",
  "description": "This is Update Open Team."
}
```

<a id="get-v2-directory-user-groups"></a>

### 获取团队列表

`GET /v2/directory/user_groups` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:team`

用于分页获取企业团队列表。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 团队全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].visibility` | string |  |  |
| `values[].description` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 2,
  "values": [
    {
      "id": "63c8fb32729dee3334d96af7",
      "url": "https://{rest_api_root}/v2/directory/user_groups/63c8fb32729dee3334d96af7",
      "name": "Open Team",
      "visibility": "private",
      "description": "This is Open Team."
    },
    {
      "id": "64ca0f67cb78a0a80e1a999e",
      "url": "https://{rest_api_root}/v2/directory/user_groups/64ca0f67cb78a0a80e1a999e",
      "name": "PingCode",
      "visibility": "public",
      "description": "This is PingCode."
    }
  ]
}
```

<a id="post-v2-directory-user-groups-user-group-id-members"></a>

### 向团队中添加一个成员

`POST /v2/directory/user_groups/{user_group_id}/members` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:global:team`

用于向指定团队添加一个成员。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `user_group_id` | string | 是 | 团队 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `member_id` | string | 是 | 成员 id |
| `member_type` | string |  | 成员类型；枚举："user" |
| `role` | string | 是 | 团队角色；枚举："manager" / "member" |

**请求示例**

```json
{
  "member_id": "a0417f68e846aae315c85d24643678a9",
  "member_type": "user",
  "role": "manager"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 团队成员的 id |
| `url` | string | 是 | 团队成员的资源地址 |
| `user_group` | object | 是 | 所属团队的引用结构数据 |
| `user_group.id` | string |  |  |
| `user_group.url` | string |  |  |
| `user_group.name` | string |  |  |
| `member_type` | string | 是 | 团队成员的类型；枚举："user" |
| `user` | object | 是 | 成员的引用结构数据 |
| `user.id` | string |  |  |
| `user.url` | string |  |  |
| `user.name` | string |  |  |
| `user.display_name` | string |  |  |
| `user.avatar` | string |  |  |
| `role` | string | 是 | 成员在团队中的角色；枚举："manager" / "member" |

**响应示例**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/directory/user_groups/64ca0f67cb78a0a80e1a999e/members/a0417f68e846aae315c85d24643678a9",
  "user_group": {
    "id": "64ca0f67cb78a0a80e1a999e",
    "url": "https://{rest_api_root}/v2/directory/user_groups/64ca0f67cb78a0a80e1a999e",
    "name": "PingCode"
  },
  "member_type": "user",
  "user": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "role": "manager"
}
```

<a id="get-v2-directory-user-groups-user-group-id-members-member-id"></a>

### 获取团队中的一个成员

`GET /v2/directory/user_groups/{user_group_id}/members/{member_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:team`

用于按 id 获取团队中的一个成员。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `user_group_id` | string | 是 | 团队的 id |
| `member_id` | string | 是 | 团队成员的 id，即用户的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 团队成员的 id |
| `url` | string | 是 | 团队成员的资源地址 |
| `user_group` | object | 是 | 所属团队的引用结构数据 |
| `user_group.id` | string |  |  |
| `user_group.url` | string |  |  |
| `user_group.name` | string |  |  |
| `member_type` | string | 是 | 团队成员的类型；枚举："user" |
| `user` | object | 是 | 成员的引用结构数据 |
| `user.id` | string |  |  |
| `user.url` | string |  |  |
| `user.name` | string |  |  |
| `user.display_name` | string |  |  |
| `user.avatar` | string |  |  |
| `role` | string | 是 | 成员在团队中的角色；枚举："manager" / "member" |

**响应示例**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/directory/user_groups/64ca0f67cb78a0a80e1a999e/members/a0417f68e846aae315c85d24643678a9",
  "user_group": {
    "id": "64ca0f67cb78a0a80e1a999e",
    "url": "https://{rest_api_root}/v2/directory/user_groups/64ca0f67cb78a0a80e1a999e",
    "name": "PingCode"
  },
  "member_type": "user",
  "user": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "role": "manager"
}
```

<a id="get-v2-directory-user-groups-user-group-id-members"></a>

### 获取团队中的成员列表

`GET /v2/directory/user_groups/{user_group_id}/members` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:team`

用于分页获取指定团队中的成员列表。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `user_group_id` | string | 是 | 团队 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 团队中的成员全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].user_group` | object |  |  |
| `values[].user_group.id` | string |  |  |
| `values[].user_group.url` | string |  |  |
| `values[].user_group.name` | string |  |  |
| `values[].member_type` | string |  |  |
| `values[].user` | object |  |  |
| `values[].user.id` | string |  |  |
| `values[].user.url` | string |  |  |
| `values[].user.name` | string |  |  |
| `values[].user.display_name` | string |  |  |
| `values[].user.avatar` | string |  |  |
| `values[].role` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/directory/user_groups/64ca0f67cb78a0a80e1a999e/members/a0417f68e846aae315c85d24643678a9",
      "user_group": {
        "id": "64ca0f67cb78a0a80e1a999e",
        "url": "https://{rest_api_root}/v2/directory/user_groups/64ca0f67cb78a0a80e1a999e",
        "name": "PingCode"
      },
      "member_type": "user",
      "user": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "role": "manager"
    }
  ]
}
```

<a id="delete-v2-directory-user-groups-user-group-id-members-member-id"></a>

### 在团队中移除一个成员

`DELETE /v2/directory/user_groups/{user_group_id}/members/{member_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:global:team`

用于从指定团队中移除一个成员。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `user_group_id` | string | 是 | 团队 id |
| `member_id` | string | 是 | 团队成员的 id，即用户的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 团队成员的 id |
| `url` | string | 是 | 团队成员的资源地址 |
| `user_group` | object | 是 | 所属团队的引用结构数据 |
| `user_group.id` | string |  |  |
| `user_group.url` | string |  |  |
| `user_group.name` | string |  |  |
| `member_type` | string | 是 | 团队成员的类型；枚举："user" |
| `user` | object | 是 | 成员的引用结构数据 |
| `user.id` | string |  |  |
| `user.url` | string |  |  |
| `user.name` | string |  |  |
| `user.display_name` | string |  |  |
| `user.avatar` | string |  |  |
| `role` | string | 是 | 成员在团队中的角色；枚举："manager" / "member" |

**响应示例**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/directory/user_groups/64ca0f67cb78a0a80e1a999e/members/a0417f68e846aae315c85d24643678a9",
  "user_group": {
    "id": "64ca0f67cb78a0a80e1a999e",
    "url": "https://{rest_api_root}/v2/directory/user_groups/64ca0f67cb78a0a80e1a999e",
    "name": "PingCode"
  },
  "member_type": "user",
  "user": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "role": "manager"
}
```

## 角色

> 分组路径：全局 / 组织 / 角色

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `GET` | `/v2/directory/roles/{role_id}` | [获取一个角色](#get-v2-directory-roles-role-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/directory/roles` | [获取角色列表](#get-v2-directory-roles) | 企业令牌 / 用户令牌 |

<a id="get-v2-directory-roles-role-id"></a>

### 获取一个角色

`GET /v2/directory/roles/{role_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:team`

用于按 id 获取角色全量信息，含是否为系统内置。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `role_id` | string | 是 | 角色的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 角色的 id |
| `url` | string | 是 | 角色的资源地址 |
| `name` | string | 是 | 角色的名称 |
| `is_system` | number | 是 | 角色是否为系统内置；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "6422711c3f12e6c1e46d40e6",
  "url": "https://{rest_api_root}/v2/directory/roles/6422711c3f12e6c1e46d40e6",
  "name": "管理员",
  "is_system": 1
}
```

<a id="get-v2-directory-roles"></a>

### 获取角色列表

`GET /v2/directory/roles` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:team`

用于分页获取企业角色列表，含系统内置与自定义角色。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 角色全量结构数据的数组 |
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
      "id": "6422711c3f12e6c1e46d40e6",
      "url": "https://{rest_api_root}/v2/directory/roles/6422711c3f12e6c1e46d40e6",
      "name": "管理员",
      "is_system": 1
    }
  ]
}
```

## 职位

> 分组路径：全局 / 组织 / 职位

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `GET` | `/v2/directory/jobs/{job_id}` | [获取一个职位](#get-v2-directory-jobs-job-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/directory/jobs` | [获取职位列表](#get-v2-directory-jobs) | 企业令牌 / 用户令牌 |

<a id="get-v2-directory-jobs-job-id"></a>

### 获取一个职位

`GET /v2/directory/jobs/{job_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:team`

用于按 id 获取职位全量信息，含是否为系统内置。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `job_id` | string | 是 | 职位的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 职位的 id |
| `url` | string | 是 | 职位的资源地址 |
| `name` | string | 是 | 职位的名称 |
| `is_system` | number | 是 | 职位是否为系统内置；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "6422711c3f12e6c1e46d40e6",
  "url": "https://{rest_api_root}/v2/directory/jobs/6422711c3f12e6c1e46d40e6",
  "name": "技术总监",
  "is_system": 1
}
```

<a id="get-v2-directory-jobs"></a>

### 获取职位列表

`GET /v2/directory/jobs` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:team`

用于分页获取企业职位列表，含系统内置与自定义职位。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 职位全量结构数据的数组 |
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
      "id": "6422711c3f12e6c1e46d40e6",
      "url": "https://{rest_api_root}/v2/directory/jobs/6422711c3f12e6c1e46d40e6",
      "name": "技术总监",
      "is_system": 1
    }
  ]
}
```

## 日志

> 分组路径：全局 / 安全 / 日志

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `GET` | `/v2/security/login_logs` | [获取登录日志列表](#get-v2-security-login-logs) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/security/audit_logs` | [获取审计日志列表](#get-v2-security-audit-logs) | 企业令牌 / 用户令牌 |

<a id="get-v2-security-login-logs"></a>

### 获取登录日志列表

`GET /v2/security/login_logs` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:security`

用于按登录时间范围分页获取登录日志。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `logged_between` | string | 是 | 登录时间介于的时间范围，通过','分割起始时间 |
| `user_ids` | string |  | 成员 id 的列表，使用','分割，最多只能 20 个 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 登录日志的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].user` | object |  |  |
| `values[].user.id` | string |  |  |
| `values[].user.url` | string |  |  |
| `values[].user.name` | string |  |  |
| `values[].user.display_name` | string |  |  |
| `values[].user.avatar` | string |  |  |
| `values[].login_method` | string |  |  |
| `values[].region` | string |  |  |
| `values[].ip` | string |  |  |
| `values[].user_agent` | string |  |  |
| `values[].created_at` | number |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5fca7b74efab845a2fa53181",
      "url": "https://{rest_api_root}/v2/security/login_logs/5fca7b74efab845a2fa53181",
      "user": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "login_method": "账号密码",
      "region": "北京海淀区",
      "ip": "45.251.20.42",
      "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "created_at": 1676454024
    }
  ]
}
```

<a id="get-v2-security-audit-logs"></a>

### 获取审计日志列表

`GET /v2/security/audit_logs` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:security`

用于分页获取审计日志。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `operated_between` | string | 是 | 操作时间介于的时间范围，通过','分割起始时间 |
| `operated_bys` | string |  | 操作人的列表，使用','分割，最多只能 20 个 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 审计日志的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].operated_by` | object |  |  |
| `values[].operated_by.id` | string |  |  |
| `values[].operated_by.url` | string |  |  |
| `values[].operated_by.name` | string |  |  |
| `values[].operated_by.display_name` | string |  |  |
| `values[].operated_by.avatar` | string |  |  |
| `values[].operated_at` | number |  |  |
| `values[].operate_object` | string |  |  |
| `values[].application` | string |  |  |
| `values[].ip` | string |  |  |
| `values[].summary` | string |  |  |
| `values[].detail` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5fca7b74efab845a2fa53181",
      "url": "https://{rest_api_root}/v2/security/audit_logs/5fca7b74efab845a2fa53181",
      "operated_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "operated_at": 1676454024,
      "operate_object": "规则",
      "application": "自动化",
      "ip": "45.251.20.42",
      "summary": "修改规则",
      "detail": "规则：规则 1\n 类型：自动化规则\n 描述：-"
    }
  ]
}
```

## 权限

> 分组路径：全局 / 权限

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `GET` | `/v2/permission/points` | [获取全部权限点](#get-v2-permission-points) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/permission/my/global` | [获取我的全局权限](#get-v2-permission-my-global) | 用户令牌 |
| `POST` | `/v2/permission/check/global` | [检查我的全局权限](#post-v2-permission-check-global) | 用户令牌 |
| `GET` | `/v2/permission/my/pilot` | [获取我的_Pilot_权限](#get-v2-permission-my-pilot) | 用户令牌 |
| `GET` | `/v2/permission/my/principal` | [获取我的_Principal_权限](#get-v2-permission-my-principal) | 用户令牌 |
| `POST` | `/v2/permission/check/pilot` | [检查我的_Pilot_权限](#post-v2-permission-check-pilot) | 用户令牌 |
| `POST` | `/v2/permission/check/principal` | [检查我的_Principal_权限](#post-v2-permission-check-principal) | 用户令牌 |

<a id="get-v2-permission-points"></a>

### 获取全部权限点

`GET /v2/permission/points` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:permission`

用于获取全部权限点定义。  
 响应体为对象，包含：`global`、`pjm`、`ship`、`testhub`、`wiki` 属性，对应的属性值为权限信息的数组。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `global` | object |  | 全局权限信息的列表 |
| `global.key` | string | 是 | 权限点 |
| `global.name` | string |  | 权限点的名称 |
| `global.group` | string |  | 权限点所属分组，用于区分权限点适用的资源类型，如 `project`、`workitem`、`sprint` 等 |
| `pjm` | object[] |  | 项目管理权限信息列表。元素字段同 `global` |
| `pjm[].key` | string |  |  |
| `pjm[].name` | string |  |  |
| `pjm[].group` | string |  |  |
| `ship` | object[] |  | 产品管理权限信息列表。元素字段同 `global` |
| `testhub` | object[] |  | 测试管理权限信息列表。元素字段同 `global` |
| `wiki` | object[] |  | 知识库管理权限信息列表。元素字段同 `global` |

**响应示例**

```json
{
  "global": [
    {
      "key": "pca:global:pjm:project:create",
      "name": "新建项目",
      "group": "project"
    }
  ],
  "pjm": [
    {
      "key": "pca:pjm:task:create",
      "name": "创建任务",
      "group": "workitem"
    },
    {
      "key": "pca:pjm:sprint:manage",
      "name": "迭代管理",
      "group": "sprint"
    }
  ]
}
```

<a id="get-v2-permission-my-global"></a>

### 获取我的全局权限

`GET /v2/permission/my/global` ｜ 令牌：用户令牌 ｜ Scope：`pcp:read:global:permission`

用于获取当前用户的全局权限。响应体为对象数组。

**响应**

源文档未提供响应结构。

**响应示例**

```json
[
  {
    "key": "pca:global:user:manage:member",
    "has_permission": 1
  },
  {
    "key": "pca:global:team:manage:system",
    "has_permission": 1
  },
  {
    "key": "pca:global:overview:home",
    "has_permission": 1
  }
]
```

<a id="post-v2-permission-check-global"></a>

### 检查我的全局权限

`POST /v2/permission/check/global` ｜ 令牌：用户令牌 ｜ Scope：`pcp:read:global:permission`

用于按指定权限点检查当前用户的全局权限。  
 响应体为对象数组，包含请求中每个权限点的检查结果。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `permissions` | string[] | 是 | 需要检查的权限点列表 |

**请求示例**

```json
{
  "permissions": [
    "pca:global:user:manage:member",
    "pca:global:team:manage:system",
    "pca:global:overview:home"
  ]
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```json
[
  {
    "key": "pca:global:user:manage:member",
    "has_permission": 1
  },
  {
    "key": "pca:global:team:manage:system",
    "has_permission": 1
  },
  {
    "key": "pca:global:overview:home",
    "has_permission": 1
  }
]
```

<a id="get-v2-permission-my-pilot"></a>

### 获取我的_Pilot_权限

`GET /v2/permission/my/pilot` ｜ 令牌：用户令牌 ｜ Scope：`pcp:read:global:permission` ｜ **未公开端点**

用于获取当前用户在指定 Pilot 上的权限。响应体为对象数组。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `type` | string | 是 | Pilot 的类型；枚举："product" / "project" / "library" / "space" |
| `id` | string | 是 | Pilot 的 id |

**响应**

源文档未提供响应结构。

**响应示例**

```json
[
  {
    "key": "pca:pjm:task:create",
    "has_permission": 1
  },
  {
    "key": "pca:pjm:sprint:manage",
    "has_permission": 1
  }
]
```

<a id="get-v2-permission-my-principal"></a>

### 获取我的_Principal_权限

`GET /v2/permission/my/principal` ｜ 令牌：用户令牌 ｜ Scope：`pcp:read:global:permission` ｜ **未公开端点**

用于获取当前用户在指定 Principal 上的权限。响应体为对象数组。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `type` | string | 是 | Principal 的类型；枚举："idea" / "ticket" / "workitem" / "testcase" / "page" |
| `id` | string | 是 | Principal 的 id |

**响应**

源文档未提供响应结构。

**响应示例**

```json
[
  {
    "key": "pca:testhub:testcase:edit",
    "has_permission": 1
  },
  {
    "key": "pca:testhub:testcase:delete",
    "has_permission": 0
  }
]
```

<a id="post-v2-permission-check-pilot"></a>

### 检查我的_Pilot_权限

`POST /v2/permission/check/pilot` ｜ 令牌：用户令牌 ｜ Scope：`pcp:read:global:permission` ｜ **未公开端点**

用于按指定权限点，批量检查当前用户在多个 Pilot 上是否具备相应权限。  
 响应体为对象，属性名为请求 `permissions` 中的权限点。  
 每个属性值为对象，其中 `pilot_ids` 为在该权限下有权限的 Pilot 的 id 列表（无权限时为空数组）。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `permissions` | string[] | 是 | 需要检查的权限点列表 |
| `type` | string | 是 | Pilot 的类型；枚举："product" / "project" / "library" / "space" |
| `ids` | string[] | 是 | Pilot 的 id 列表 |

**请求示例**

```json
{
  "permissions": [
    "pca:pjm:project:setting",
    "pca:pjm:project:manage:member"
  ],
  "type": "project",
  "ids": [
    "5e05d8448f8461dada9ba29c",
    "5e05d8448f8461dada9ba29d"
  ]
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```json
{
  "$permission_key": {
    "pilot_ids": [
      "5e05d8448f8461dada9ba29c"
    ]
  }
}
```

<a id="post-v2-permission-check-principal"></a>

### 检查我的_Principal_权限

`POST /v2/permission/check/principal` ｜ 令牌：用户令牌 ｜ Scope：`pcp:read:global:permission` ｜ **未公开端点**

用于按指定权限点，批量检查当前用户在多个 Principal 上是否具备相应权限。  
 响应体为对象，属性名为请求 `permissions` 中的权限点。  
 每个属性值为对象，其中 `principal_ids` 为在该权限下有权限的 Principal 的 id 列表（无权限时为空数组）。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `permissions` | string[] | 是 | 需要检查的权限点列表 |
| `type` | string | 是 | Principal 的类型；枚举："idea" / "ticket" / "workitem" / "testcase" / "page" |
| `ids` | string[] | 是 | Principal 的 id 列表 |

**请求示例**

```json
{
  "permissions": [
    "pca:testhub:testcase:create",
    "pca:testhub:testcase:edit"
  ],
  "type": "testcase",
  "ids": [
    "5e05d8448f8461dada9ba29c",
    "5e05d8448f8461dada9ba29d"
  ]
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```json
{
  "$permission_key": {
    "principal_ids": [
      "5e05d8448f8461dada9ba29c"
    ]
  }
}
```

## 表达式

> 分组路径：全局 / 表达式

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/expression/analyse` | [分析一组表达式](#post-v2-expression-analyse) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/expression/evaluate` | [计算一组表达式](#post-v2-expression-evaluate) | 企业令牌 / 用户令牌 |

<a id="post-v2-expression-analyse"></a>

### 分析一组表达式

`POST /v2/expression/analyse` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖上下文主体的作用域`

用于分析和校验一组表达式的语法。分析时将结合上下文进行类型推断，表达式可引用内置资源对象、当前用户以及自定义变量。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `expressions` | string[] | 是 | 需要分析的表达式列表，数量范围为 1～16 条，每条长度为 1～8192 个字符 |
| `context` | object |  | 表达式分析时使用的上下文。上下文中的对象可在表达式中以其键名直接引用，例如： `workitem.state.type`、`user.id`、`custom.order.amount`。 值得注意的是，在 `context` 中的特定属性键值对在运行时将被自动补全为对应资源的全量结构，例如：`{ context: { workitem: { id: '5edca524cad2fa1125cb0630' } } }` 在运行时将被自动补全为 `{ context: { workitem: { …工作项全量结构… } } }`，类似效果的属性键包括：`product`、`ticket`、`idea`、`project`、`workitem`、`library`、`testcase`、`testrun`、`space`、`page`。另外，在自动补全资源时要求具备对应资源的作用域。例如 `context.workitem` 要求作用域包括 `pcp:read:pjm:workitem`。未传入或值为 `null` 的内置资源，在表达式中取值为 `null`，可通过 `workitem == null` 进行判断。 当前用户 `user` 由系统根据调用令牌自动注入，无需也不支持通过请求传入；若请求中包含 `context.user`，该值将被忽略。`user` 仅包含 `id`、`locale`、`timezone` 三个字段。使用用户令牌调用时，`user` 为当前用户，可在表达式中通过 `user.id`、`user.locale`、`user.timezone` 引用；使用企业令牌调用时，`user` 为 `null`，可通过 `user == null` 进行判断。 自定义变量统一通过 `context.custom` 传入，详见该参数说明 |
| `context.custom` | object |  | 自定义变量的键值对集合。表达式中通过 `custom` 引用，例如 `custom.order.amount`。嵌套深度不超过 8 层，JSON 序列化后不超过 65536 个字符，对象或数组的元素数量不超过 1024。键名不能占用内置上下文名称 |
| `context.custom.order` | object |  |  |
| `context.custom.order.amount` | number |  |  |
| `context.custom.order.status` | string |  |  |
| `context.workitem` | object |  |  |
| `context.workitem.id` | string |  |  |

**请求示例**

```json
{
  "expressions": [
    "workitem.state.type == 'pending' && workitem.tags.some(t => t.name == '标签-1')",
    "user != null && user.id == workitem.assignee.id",
    "custom.order.amount + '元'"
  ],
  "context": {
    "workitem": {
      "id": "5edca524cad2fa112b06305c"
    },
    "custom": {
      "order": {
        "amount": 100,
        "status": "open"
      }
    }
  }
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `results` | object | 是 | 表达式分析结果列表 |
| `results.expression` | string | 是 | 被分析的表达式 |
| `results.valid` | boolean | 是 | 表达式是否有效 |
| `results.type` | string | 是 | 表达式推断出的结果类型 |
| `results.diagnostics` | object | 是 | 表达式的诊断信息列表 |
| `results.diagnostics.code` | string | 是 | 诊断码 |
| `results.diagnostics.severity` | string | 是 | 诊断级别 |
| `results.diagnostics.message` | string | 是 | 诊断信息 |
| `results.diagnostics.line` | number | 是 | 错误所在行号 |
| `results.diagnostics.column` | number | 是 | 错误所在列号 |
| `results.diagnostics.start` | number | 是 | 错误起始位置 |
| `results.diagnostics.end` | number | 是 | 错误结束位置 |
| `results.diagnostics.source_line` | string | 是 | 出错的源码行 |
| `results.diagnostics.node_type` | string | 是 | 出错的语法节点类型 |

**响应示例**

```json
{
  "results": [
    {
      "expression": "workitem.state.type == 'pending' && workitem.tags.some(t => t.name == '标签-1')",
      "valid": true,
      "type": "Boolean",
      "diagnostics": []
    },
    {
      "expression": "user != null && user.id == workitem.assignee.id",
      "valid": true,
      "type": "Boolean",
      "diagnostics": []
    },
    {
      "expression": "custom.order.amount + '元'",
      "valid": false,
      "type": "Unknown",
      "diagnostics": [
        {
          "code": "type-mismatch",
          "severity": "error",
          "message": "Operator + cannot be applied to Number and String",
          "line": 1,
          "column": 14,
          "start": 13,
          "end": 14,
          "source_line": "order.amount + '元'",
          "node_type": "BinaryExpression"
        }
      ]
    }
  ]
}
```

<a id="post-v2-expression-evaluate"></a>

### 计算一组表达式

`POST /v2/expression/evaluate` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖上下文主体的作用域`

用于计算一组表达式并返回其结果。计算时将结合上下文求值，表达式可引用内置资源对象、当前用户以及自定义变量。  
 计算前会做类型校验，类型不匹配时整批失败。单次集合操作的元素数量上限为 1024。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `expand` | boolean |  | 是否返回表达式计算的实际消耗。该值默认为 `false`。仅当值为 `true` 时，响应中才会包含 `metrics` |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `expressions` | string[] | 是 | 需要计算的表达式列表，数量范围为 1～16 条，每条长度为 1～8192 个字符 |
| `context` | object |  | 表达式计算时使用的上下文。上下文中的对象可在表达式中以其键名直接引用，例如 `workitem.whole_identifier`、`user.id`、`custom.config.value.enabled`。 值得注意的是，在 `context` 中的特定属性键值对在运行时将被自动补全为对应资源的全量结构，例如：`{ context: { workitem: { id: '5edca524cad2fa1125cb0630' } } }` 在运行时将被自动补全为 `{ context: { workitem: { …工作项全量结构… } } }`，类似效果的属性键包括：`product`、`ticket`、`idea`、`project`、`workitem`、`library`、`testcase`、`testrun`、`space`、`page`。另外，在自动补全资源时要求具备对应资源的作用域。例如 `context.workitem` 要求作用域包括 `pcp:read:pjm:workitem`。未传入或值为 `null` 的内置资源，在表达式中取值为 `null`，可通过 `workitem == null` 进行判断。 当前用户 `user` 由系统根据调用令牌自动注入，无需也不支持通过请求传入；若请求中包含 `context.user`，该值将被忽略。`user` 仅包含 `id`、`locale`、`timezone` 三个字段。使用用户令牌调用时，`user` 为当前用户，可在表达式中通过 `user.id`、`user.locale`、`user.timezone` 引用；使用企业令牌调用时，`user` 为 `null`，可通过 `user == null` 进行判断。 自定义变量统一通过 `context.custom` 传入，详见该参数说明 |
| `context.custom` | object |  | 自定义变量的键值对集合。表达式中通过 `custom` 引用，例如 `custom.order.amount`。嵌套深度不超过 8 层，JSON 序列化后不超过 65536 个字符，对象或数组的元素数量不超过 1024。键名不能占用内置上下文名称 |
| `context.custom.config` | object |  |  |
| `context.custom.config.type` | string |  |  |
| `context.custom.config.value` | object |  |  |
| `context.custom.config.value.enabled` | boolean |  |  |
| `context.custom.config.value.threshold` | number |  |  |
| `context.custom.order` | object |  |  |
| `context.custom.order.amount` | number |  |  |
| `context.custom.order.status` | string |  |  |
| `context.workitem` | object |  |  |
| `context.workitem.id` | string |  |  |

**请求示例**

```json
{
  "expressions": [
    "({ key: workitem.whole_identifier, type: workitem.type, done: workitem.state.name == '已完成', extra: custom.config.value.enabled })",
    "custom.order.amount * 10"
  ],
  "context": {
    "workitem": {
      "id": "5edca524cad2fa112b06305c"
    },
    "custom": {
      "config": {
        "type": "json",
        "value": {
          "enabled": true,
          "threshold": 3
        }
      },
      "order": {
        "amount": 100,
        "status": "open"
      }
    }
  }
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `results` | object | 是 | 表达式计算结果列表 |
| `results.value` | object | 是 | 表达式的计算结果。该值可以是任意 JSON |
| `results.metrics` | object |  | 表达式计算的实际消耗。仅当查询参数 `expand` 为 `true` 时返回 |
| `results.metrics.steps` | object | 是 | 表达式计算的步骤数 |
| `results.metrics.steps.value` | number | 是 | 实际执行的步骤数 |
| `results.metrics.steps.limit` | number | 是 | 允许的步骤数上限，默认为 8192 |
| `results.metrics.expensive_operations` | object | 是 | 表达式计算的高开销操作数 |
| `results.metrics.expensive_operations.value` | number | 是 | 实际执行的高开销操作数 |
| `results.metrics.expensive_operations.limit` | number | 是 | 允许的高开销操作数上限，默认为 8 |

**响应示例**

```json
{
  "results": [
    {
      "value": {
        "key": "SCR-1",
        "type": "epic",
        "done": true,
        "extra": true
      },
      "metrics": {
        "steps": {
          "value": 24,
          "limit": 8192
        },
        "expensive_operations": {
          "value": 3,
          "limit": 8
        }
      }
    },
    {
      "value": 1000,
      "metrics": {
        "steps": {
          "value": 6,
          "limit": 8192
        },
        "expensive_operations": {
          "value": 0,
          "limit": 8
        }
      }
    }
  ]
}
```

## 工时

> 分组路径：全局 / 工时

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/workloads` | [创建一个工时](#post-v2-workloads) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/workloads/{workload_id}` | [获取一个工时](#get-v2-workloads-workload-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/workloads/{workload_id}` | [部分更新一个工时](#patch-v2-workloads-workload-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/workloads` | [获取工时列表](#get-v2-workloads) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/workloads/{workload_id}` | [删除一个工时](#delete-v2-workloads-workload-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/workload_types/{type_id}` | [获取一个工时类型](#get-v2-workload-types-type-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/workload_types` | [获取工时类型列表](#get-v2-workload-types) | 企业令牌 / 用户令牌 |

<a id="post-v2-workloads"></a>

### 创建一个工时

`POST /v2/workloads` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:global:workload`、`依赖工时所属主体的作用域`

用于创建一个工时。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 工时主体的类型。例如： 在 `principal_type` 为 `workitem` 时，创建工作项的工时，此时要求作用域包括 `pcp:write:pjm:workitem`；枚举："workitem" / "idea" / "ticket" / "testcase" |
| `principal_id` | string | 是 | 工时主体的id |
| `type_id` | string |  | 工时类型的id |
| `duration` | number | 是 | 工时的时长。单位是小时，数值可以是为0-24之间，最多包含一位小数的正数 |
| `report_at` | object | 是 | 工时的登记日期 |
| `report_at.date` | number | 是 | 工时的登记日期。该值为十位数字组成的时间戳，会被转换为该时间当天的零点零分零秒 |
| `report_at.with_time` | number |  |  |
| `report_by_id` | string |  | 工时的登记人，企业鉴权时必填。个人鉴权时不需要传递，即使传递了也会被忽略 |
| `recorded_at` | number |  | 工时的登记时间。该值为十位数字组成的时间戳，默认是当前时间。建议只有在数据同步时使用 |
| `description` | string |  | 工时的说明 |

**请求示例**

```json
{
  "principal_id": "5edca524cad2fa1125cb0630",
  "principal_type": "workitem",
  "type_id": "5a86eaf6a72585327ea46fge0",
  "duration": 8,
  "report_at": {
    "date": 1593290347,
    "with_time": 0
  },
  "report_by_id": "a0417f68e846aae315c85d24643678a9",
  "recorded_at": 1593290347,
  "description": "这是一个工时"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工时的 id |
| `url` | string | 是 | 工时的资源地址 |
| `principal_type` | string | 是 | 工时主体的类型；枚举："workitem" / "idea" / "ticket" / "testcase" |
| `principal` | object | 是 | 工时的主体 |
| `principal.id` | string |  |  |
| `principal.url` | string |  |  |
| `principal.identifier` | string |  |  |
| `principal.title` | string |  |  |
| `principal.type` | string |  |  |
| `principal.start_at` | number |  |  |
| `principal.end_at` | number |  |  |
| `principal.parent_id` | string |  |  |
| `principal.short_id` | string |  |  |
| `principal.html_url` | string |  |  |
| `principal.properties` | object |  |  |
| `principal.properties.prop_a` | string |  |  |
| `principal.properties.prop_b` | string |  |  |
| `type` | object | 是 | 工时的类型 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `duration` | number | 是 | 工时的时长。单位是小时，数值可以是为 0-24 之间，最多包含一位小数的正数 |
| `review_state` | string | 是 | 工时的评审状态；枚举："no_review" / "pending" / "in_progress" / "approved" / "rejected" / "terminated" |
| `description` | string | 是 | 工时的说明 |
| `report_at` | object | 是 | 工时的登记日期 |
| `report_at.date` | number |  |  |
| `report_at.with_time` | number |  |  |
| `report_by` | object | 是 | 工时的登记人 |
| `report_by.id` | string |  |  |
| `report_by.url` | string |  |  |
| `report_by.name` | string |  |  |
| `report_by.display_name` | string |  |  |
| `report_by.avatar` | string |  |  |
| `recorded_at` | number | 是 | 工时的登记时间。该值为十位数字组成的时间戳 |
| `created_at` | number | 是 | 工时的创建时间。该值为十位数字组成的时间戳 |
| `created_by` | object | 是 | 工时的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |

**响应示例**

```json
{
  "id": "5f168f764eba01a5278b87cd",
  "url": "https://{rest_api_root}/v2/workloads/5f168f764eba01a5278b87cd",
  "principal_type": "workitem",
  "principal": {
    "id": "5edca524cad2fa1125cb0630",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
    "identifier": "SCR-5",
    "title": "这是一个缺陷",
    "type": "bug",
    "start_at": 1583290309,
    "end_at": 1583290347,
    "parent_id": "5edca524cad2fa1125cb0629",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  },
  "type": {
    "id": "5a86eaf6a72585327ea46fge0",
    "url": "https://{rest_api_root}/v2/workload_types/5a86eaf6a72585327ea46fge0",
    "name": "研发"
  },
  "duration": 8,
  "review_state": "approved",
  "description": "这是一个工时",
  "report_at": {
    "date": 1593290347,
    "with_time": 0
  },
  "report_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "recorded_at": 1593290347,
  "created_at": 1593290347,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

<a id="get-v2-workloads-workload-id"></a>

### 获取一个工时

`GET /v2/workloads/{workload_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:workload`

用于按 id 获取工时记录全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workload_id` | string | 是 | 工时的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工时的 id |
| `url` | string | 是 | 工时的资源地址 |
| `principal_type` | string | 是 | 工时主体的类型；枚举："workitem" / "idea" / "ticket" / "testcase" |
| `principal` | object | 是 | 工时的主体 |
| `principal.id` | string |  |  |
| `principal.url` | string |  |  |
| `principal.identifier` | string |  |  |
| `principal.title` | string |  |  |
| `principal.type` | string |  |  |
| `principal.start_at` | number |  |  |
| `principal.end_at` | number |  |  |
| `principal.parent_id` | string |  |  |
| `principal.short_id` | string |  |  |
| `principal.html_url` | string |  |  |
| `principal.properties` | object |  |  |
| `principal.properties.prop_a` | string |  |  |
| `principal.properties.prop_b` | string |  |  |
| `type` | object | 是 | 工时的类型 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `duration` | number | 是 | 工时的时长。单位是小时，数值可以是为 0-24 之间，最多包含一位小数的正数 |
| `review_state` | string | 是 | 工时的评审状态；枚举："no_review" / "pending" / "in_progress" / "approved" / "rejected" / "terminated" |
| `description` | string | 是 | 工时的说明 |
| `report_at` | object | 是 | 工时的登记日期 |
| `report_at.date` | number |  |  |
| `report_at.with_time` | number |  |  |
| `report_by` | object | 是 | 工时的登记人 |
| `report_by.id` | string |  |  |
| `report_by.url` | string |  |  |
| `report_by.name` | string |  |  |
| `report_by.display_name` | string |  |  |
| `report_by.avatar` | string |  |  |
| `recorded_at` | number | 是 | 工时的登记时间。该值为十位数字组成的时间戳 |
| `created_at` | number | 是 | 工时的创建时间。该值为十位数字组成的时间戳 |
| `created_by` | object | 是 | 工时的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |

**响应示例**

```json
{
  "id": "5f168f764eba01a5278b87cd",
  "url": "https://{rest_api_root}/v2/workloads/5f168f764eba01a5278b87cd",
  "principal_type": "workitem",
  "principal": {
    "id": "5edca524cad2fa1125cb0630",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
    "identifier": "SCR-5",
    "title": "这是一个缺陷",
    "type": "bug",
    "start_at": 1583290309,
    "end_at": 1583290347,
    "parent_id": "5edca524cad2fa1125cb0629",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  },
  "type": {
    "id": "5a86eaf6a72585327ea46fge0",
    "url": "https://{rest_api_root}/v2/workload_types/5a86eaf6a72585327ea46fge0",
    "name": "研发"
  },
  "duration": 8,
  "review_state": "approved",
  "description": "这是一个工时",
  "report_at": {
    "date": 1593290347,
    "with_time": 0
  },
  "report_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "recorded_at": 1593290347,
  "created_at": 1593290347,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

<a id="patch-v2-workloads-workload-id"></a>

### 部分更新一个工时

`PATCH /v2/workloads/{workload_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:global:workload`

用于部分更新工时记录。  
 用户令牌只能更新自己登记的工时。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workload_id` | string | 是 | 工时的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `type_id` | string |  | 工时类型的 id |
| `duration` | number |  | 工时的时长。单位是小时，数值可以是为 0-24 之间，最多包含一位小数的正数 |
| `report_at` | object |  | 工时的登记日期 |
| `report_at.date` | number | 是 | 工时的登记日期。该值为十位数字组成的时间戳，会被转换为该时间当天的零点零分零秒 |
| `report_at.with_time` | number |  |  |
| `description` | string |  | 工时的说明 |

**请求示例**

```json
{
  "type_id": "5a86eaf6a72585327ea46fge0",
  "duration": 8,
  "report_at": {
    "date": 1593290347,
    "with_time": 0
  },
  "description": "这是一个工时"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工时的 id |
| `url` | string | 是 | 工时的资源地址 |
| `principal_type` | string | 是 | 工时主体的类型；枚举："workitem" / "idea" / "ticket" / "testcase" |
| `principal` | object | 是 | 工时的主体 |
| `principal.id` | string |  |  |
| `principal.url` | string |  |  |
| `principal.identifier` | string |  |  |
| `principal.title` | string |  |  |
| `principal.type` | string |  |  |
| `principal.start_at` | number |  |  |
| `principal.end_at` | number |  |  |
| `principal.parent_id` | string |  |  |
| `principal.short_id` | string |  |  |
| `principal.html_url` | string |  |  |
| `principal.properties` | object |  |  |
| `principal.properties.prop_a` | string |  |  |
| `principal.properties.prop_b` | string |  |  |
| `type` | object | 是 | 工时的类型 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `duration` | number | 是 | 工时的时长。单位是小时，数值可以是为 0-24 之间，最多包含一位小数的正数 |
| `review_state` | string | 是 | 工时的评审状态；枚举："no_review" / "pending" / "in_progress" / "approved" / "rejected" / "terminated" |
| `description` | string | 是 | 工时的说明 |
| `report_at` | object | 是 | 工时的登记日期 |
| `report_at.date` | number |  |  |
| `report_at.with_time` | number |  |  |
| `report_by` | object | 是 | 工时的登记人 |
| `report_by.id` | string |  |  |
| `report_by.url` | string |  |  |
| `report_by.name` | string |  |  |
| `report_by.display_name` | string |  |  |
| `report_by.avatar` | string |  |  |
| `recorded_at` | number | 是 | 工时的登记时间。该值为十位数字组成的时间戳 |
| `created_at` | number | 是 | 工时的创建时间。该值为十位数字组成的时间戳 |
| `created_by` | object | 是 | 工时的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |

**响应示例**

```json
{
  "id": "5f168f764eba01a5278b87cd",
  "url": "https://{rest_api_root}/v2/workloads/5f168f764eba01a5278b87cd",
  "principal_type": "workitem",
  "principal": {
    "id": "5edca524cad2fa1125cb0630",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
    "identifier": "SCR-5",
    "title": "这是一个缺陷",
    "type": "bug",
    "start_at": 1583290309,
    "end_at": 1583290347,
    "parent_id": "5edca524cad2fa1125cb0629",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  },
  "type": {
    "id": "5a86eaf6a72585327ea46fge0",
    "url": "https://{rest_api_root}/v2/workload_types/5a86eaf6a72585327ea46fge0",
    "name": "研发"
  },
  "duration": 8,
  "review_state": "approved",
  "description": "这是一个工时",
  "report_at": {
    "date": 1593290347,
    "with_time": 0
  },
  "report_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "recorded_at": 1593290347,
  "created_at": 1593290347,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

<a id="get-v2-workloads"></a>

### 获取工时列表

`GET /v2/workloads` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:workload`、`依赖工时所属主体的作用域`

用于查询工时列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string |  | 工时主体的类型。当查询参数含有 pilot_id 或 principal_id 时，principal_type 参数必填。例如： 在 `principal_type` 为 `workitem` 时，获取工作项的工时列表，此时要求作用域包括 `pcp:write:pjm:workitem`; 当不传 `principal_type` 时，获取多类型主体的工时列表，此时要求作用域包括 `pcp:write:pjm:workitem`, `pcp:write:ship:idea`, `pcp:write:ship:ticket`, `pcp:write:testhub:testcase`；枚举："workitem" / "idea" / "ticket" / "testcase" |
| `pilot_id` | string |  | 工时主体所在产品、项目或测试库的id。使用该参数过滤数据时，登记日期查询的起始时间和登记日期查询的结束时间的跨度最大为3个月 |
| `principal_id` | string |  | 工时主体的id |
| `start_at` | number |  | 登记日期查询的起始时间。开始时间会转换为对应日期的开始时间点。开始时间和结束时间须同时存在 |
| `end_at` | number |  | 登记日期查询的结束时间。结束时间会转换为对应日期的结束时间点 |
| `report_by_id` | string |  | 登记人的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工时全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].principal_type` | string |  |  |
| `values[].principal` | object |  |  |
| `values[].principal.id` | string |  |  |
| `values[].principal.url` | string |  |  |
| `values[].principal.identifier` | string |  |  |
| `values[].principal.title` | string |  |  |
| `values[].principal.type` | string |  |  |
| `values[].principal.start_at` | number |  |  |
| `values[].principal.end_at` | number |  |  |
| `values[].principal.parent_id` | string |  |  |
| `values[].principal.short_id` | string |  |  |
| `values[].principal.html_url` | string |  |  |
| `values[].principal.properties` | object |  |  |
| `values[].principal.properties.prop_a` | string |  |  |
| `values[].principal.properties.prop_b` | string |  |  |
| `values[].type` | object |  |  |
| `values[].type.id` | string |  |  |
| `values[].type.url` | string |  |  |
| `values[].type.name` | string |  |  |
| `values[].duration` | number |  |  |
| `values[].review_state` | string |  |  |
| `values[].description` | string |  |  |
| `values[].report_at` | object |  |  |
| `values[].report_at.date` | number |  |  |
| `values[].report_at.with_time` | number |  |  |
| `values[].report_by` | object |  |  |
| `values[].report_by.id` | string |  |  |
| `values[].report_by.url` | string |  |  |
| `values[].report_by.name` | string |  |  |
| `values[].report_by.display_name` | string |  |  |
| `values[].report_by.avatar` | string |  |  |
| `values[].recorded_at` | number |  |  |
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
      "id": "5f168f764eba01a5278b87cd",
      "url": "https://{rest_api_root}/v2/workloads/5f168f764eba01a5278b87cd",
      "principal_type": "workitem",
      "principal": {
        "id": "5edca524cad2fa1125cb0630",
        "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
        "identifier": "SCR-5",
        "title": "这是一个缺陷",
        "type": "bug",
        "start_at": 1583290309,
        "end_at": 1583290347,
        "parent_id": "5edca524cad2fa1125cb0629",
        "short_id": "c9WqLmTO",
        "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
        "properties": {
          "prop_a": "prop_a_value",
          "prop_b": "prop_b_value"
        }
      },
      "type": {
        "id": "5a86eaf6a72585327ea46fge0",
        "url": "https://{rest_api_root}/v2/workload_types/5a86eaf6a72585327ea46fge0",
        "name": "研发"
      },
      "duration": 8,
      "review_state": "approved",
      "description": "这是一个工时",
      "report_at": {
        "date": 1593290347,
        "with_time": 0
      },
      "report_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "recorded_at": 1593290347,
      "created_at": 1593290347,
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

<a id="delete-v2-workloads-workload-id"></a>

### 删除一个工时

`DELETE /v2/workloads/{workload_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:write:global:workload`

用于删除工时记录。  
 用户令牌只能删除自己登记的工时。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workload_id` | string | 是 | 工时的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工时的 id |
| `url` | string | 是 | 工时的资源地址 |
| `principal_type` | string | 是 | 工时主体的类型；枚举："workitem" / "idea" / "ticket" / "testcase" |
| `principal` | object | 是 | 工时的主体 |
| `principal.id` | string |  |  |
| `principal.url` | string |  |  |
| `principal.identifier` | string |  |  |
| `principal.title` | string |  |  |
| `principal.type` | string |  |  |
| `principal.start_at` | number |  |  |
| `principal.end_at` | number |  |  |
| `principal.parent_id` | string |  |  |
| `principal.short_id` | string |  |  |
| `principal.html_url` | string |  |  |
| `principal.properties` | object |  |  |
| `principal.properties.prop_a` | string |  |  |
| `principal.properties.prop_b` | string |  |  |
| `type` | object | 是 | 工时的类型 |
| `type.id` | string |  |  |
| `type.url` | string |  |  |
| `type.name` | string |  |  |
| `duration` | number | 是 | 工时的时长。单位是小时，数值可以是为 0-24 之间，最多包含一位小数的正数 |
| `review_state` | string | 是 | 工时的评审状态；枚举："no_review" / "pending" / "in_progress" / "approved" / "rejected" / "terminated" |
| `description` | string | 是 | 工时的说明 |
| `report_at` | object | 是 | 工时的登记日期 |
| `report_at.date` | number |  |  |
| `report_at.with_time` | number |  |  |
| `report_by` | object | 是 | 工时的登记人 |
| `report_by.id` | string |  |  |
| `report_by.url` | string |  |  |
| `report_by.name` | string |  |  |
| `report_by.display_name` | string |  |  |
| `report_by.avatar` | string |  |  |
| `recorded_at` | number | 是 | 工时的登记时间。该值为十位数字组成的时间戳 |
| `created_at` | number | 是 | 工时的创建时间。该值为十位数字组成的时间戳 |
| `created_by` | object | 是 | 工时的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |

**响应示例**

```json
{
  "id": "5f168f764eba01a5278b87cd",
  "url": "https://{rest_api_root}/v2/workloads/5f168f764eba01a5278b87cd",
  "principal_type": "workitem",
  "principal": {
    "id": "5edca524cad2fa1125cb0630",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
    "identifier": "SCR-5",
    "title": "这是一个缺陷",
    "type": "bug",
    "start_at": 1583290309,
    "end_at": 1583290347,
    "parent_id": "5edca524cad2fa1125cb0629",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  },
  "type": {
    "id": "5a86eaf6a72585327ea46fge0",
    "url": "https://{rest_api_root}/v2/workload_types/5a86eaf6a72585327ea46fge0",
    "name": "研发"
  },
  "duration": 8,
  "review_state": "approved",
  "description": "这是一个工时",
  "report_at": {
    "date": 1593290347,
    "with_time": 0
  },
  "report_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "recorded_at": 1593290347,
  "created_at": 1593290347,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

<a id="get-v2-workload-types-type-id"></a>

### 获取一个工时类型

`GET /v2/workload_types/{type_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:workload`

用于按 id 获取工时类型全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `type_id` | string | 是 | 工时类型的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 工时类型的 id |
| `url` | string | 是 | 工时类型的资源地址 |
| `name` | string | 是 | 工时类型的名称 |

**响应示例**

```json
{
  "id": "5a86eaf6a72585327ea46fge0",
  "url": "https://{rest_api_root}/v2/workload_types/5a86eaf6a72585327ea46fge0",
  "name": "研发"
}
```

<a id="get-v2-workload-types"></a>

### 获取工时类型列表

`GET /v2/workload_types` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`pcp:read:global:workload`

用于分页获取工时类型列表。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 工时类型的全量结构数据的数组 |
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
      "id": "5a86eaf6a72585327ea46fge0",
      "url": "https://{rest_api_root}/v2/workload_types/5a86eaf6a72585327ea46fge0",
      "name": "研发"
    }
  ]
}
```

## 评论

> 分组路径：全局 / 通用 / 评论

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/comments` | [创建一条评论](#post-v2-comments) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/comments/{comment_id}` | [获取一条评论](#get-v2-comments-comment-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/comments` | [获取评论列表](#get-v2-comments) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/comments/{comment_id}` | [删除一条评论](#delete-v2-comments-comment-id) | 企业令牌 / 用户令牌 |

<a id="post-v2-comments"></a>

### 创建一条评论

`POST /v2/comments` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖评论所属主体的作用域`

用于向指定主体创建一条评论。  
 需通过 principal_type 指定所属主体。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 评论主体的类型。例如： 在 `principal_type` 为 `workitem` 时，创建工作项的评论，此时要求作用域包括 `pcp:write:pjm:workitem`； 在 `principal_type` 为 `workitem_review（工作项评审）` 时，创建工作项评审的评论，此时要求作用域包括 `pcp:write:pjm:project`；枚举："workitem" / "workitem_review" / "testrun" / "testcase" / "testcase_review" / "idea" / "idea_review" / "ticket" / "page" |
| `principal_id` | string |  | 评论主体的 id |
| `content` | string | 是 | 评论的内容 |
| `reply_comment_id` | string |  | 被回复评论的 id |
| `created_at` | number |  | 评论的创建时间 |
| `created_by` | string |  | 评论的创建人 |

**请求示例**

```json
{
  "principal_type": "workitem",
  "principal_id": "5edca524cad2fa1125cb0630",
  "content": "这是一个工作项评论",
  "created_at": 1565255712,
  "created_by": "a0417f68e846aae315c85d24643678a9"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 评论的 id |
| `url` | string | 是 | 评论的资源地址 |
| `content` | string | 是 | 评论的内容 |
| `attachment_count` | number | 是 | 评论的附件数量 |
| `attachments` | object[] | 是 | 评论的附件列表 |
| `is_reply_comment` | number | 是 | 是否是回复评论；枚举：0 / 1 |
| `reply_comment` | object | 是 | 被回复的评论 |
| `created_at` | number | 是 | 评论的创建时间 |
| `created_by` | object | 是 | 评论的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `is_deleted` | number | 是 | 评论是否被删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "59f72dfaeadb5b5197b7da6d",
  "url": "https://{rest_api_root}/v2/comments/59f72dfaeadb5b5197b7da6d?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
  "content": "这是一个工作项评论",
  "attachment_count": 0,
  "attachments": [],
  "is_reply_comment": 0,
  "reply_comment": null,
  "created_at": 1565255712,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "is_deleted": 0
}
```

<a id="get-v2-comments-comment-id"></a>

### 获取一条评论

`GET /v2/comments/{comment_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖评论所属主体的作用域`

用于按 id 获取一条评论。  
 需通过 principal_type 指定所属主体。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `comment_id` | string | 是 | 评论的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 评论主体的类型。例如： 在 `principal_type` 为 `workitem` 时，获取工作项的评论，此时要求作用域包括 `pcp:read:pjm:workitem`； 在 `principal_type` 为 `workitem_review（工作项评审）` 时，获取工作项评审的评论，此时要求作用域包括 `pcp:read:pjm:project`；枚举："workitem" / "workitem_review" / "testrun" / "testcase" / "testcase_review" / "idea" / "idea_review" / "ticket" / "page" |
| `principal_id` | string |  | 评论主体的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 评论的 id |
| `url` | string | 是 | 评论的资源地址 |
| `content` | string | 是 | 评论的内容。被删除的评论 content 字段会被置空，is_deleted 字段为 1 |
| `attachment_count` | number | 是 | 评论的附件数量 |
| `attachments` | object[] | 是 | 评论的附件列表 |
| `attachments[].id` | string |  |  |
| `attachments[].url` | string |  |  |
| `attachments[].title` | string |  |  |
| `attachments[].size` | number |  |  |
| `attachments[].type` | string |  |  |
| `is_reply_comment` | number | 是 | 是否是回复评论；枚举：0 / 1 |
| `reply_comment` | object | 是 | 被回复的评论 |
| `created_at` | number | 是 | 评论的创建时间 |
| `created_by` | object | 是 | 评论的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `is_deleted` | number | 是 | 评论是否被删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "59f72dfaeadb5b5197b7da6d",
  "url": "https://{rest_api_root}/v2/comments/59f72dfaeadb5b5197b7da6d?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
  "content": "这是一个工作项评论",
  "attachment_count": 1,
  "attachments": [
    {
      "id": "5da588ca84c7377a5d327e6d",
      "url": "https://{rest_api_root}/v2/attachments/5da588ca84c7377a5d327e6d?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630&comment_id=59f72dfaeadb5b5197b7da6d",
      "title": "这是一个代码片段",
      "size": 16,
      "type": "snippet"
    }
  ],
  "is_reply_comment": 0,
  "reply_comment": null,
  "created_at": 1565255712,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "is_deleted": 0
}
```

<a id="get-v2-comments"></a>

### 获取评论列表

`GET /v2/comments` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖评论所属主体的作用域`

用于分页获取指定主体的评论列表。  
 需通过 principal_type 指定所属主体。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 评论主体的类型。例如： 在 `principal_type` 为 `workitem` 时，获取工作项的评论列表，此时要求作用域包括 `pcp:read:pjm:workitem`； 在 `principal_type` 为 `workitem_review（工作项评审）` 时，获取工作项评审的评论列表，此时要求作用域包括 `pcp:read:pjm:project`；枚举："workitem" / "workitem_review" / "testrun" / "testcase" / "testcase_review" / "idea" / "idea_review" / "ticket" / "page" |
| `principal_id` | string |  | 评论主体的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 评论全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].content` | string |  |  |
| `values[].attachment_count` | number |  |  |
| `values[].attachments` | any \| any[] |  |  |
| `values[].is_reply_comment` | number |  |  |
| `values[].reply_comment` | null \| object |  |  |
| `values[].created_at` | number |  |  |
| `values[].created_by` | object |  |  |
| `values[].created_by.id` | string |  |  |
| `values[].created_by.url` | string |  |  |
| `values[].created_by.name` | string |  |  |
| `values[].created_by.display_name` | string |  |  |
| `values[].created_by.avatar` | string |  |  |
| `values[].is_deleted` | number |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "59f72dfaeadb5b5197b7da6d",
      "url": "https://{rest_api_root}/v2/comments/59f72dfaeadb5b5197b7da6d?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
      "content": "这是一个工作项评论",
      "attachment_count": 0,
      "attachments": [],
      "is_reply_comment": 0,
      "reply_comment": null,
      "created_at": 1565255712,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      },
      "is_deleted": 0
    },
    {
      "id": "50f72dfaeadb5b5197b7da6e",
      "url": "https://{rest_api_root}/v2/comments/59f72dfaeadb5b5197b7da6d?principal_type=workitem&principal_id=50f72dfaeadb5b5197b7da6e",
      "content": "这是一个工作项评论回复",
      "attachment_count": 0,
      "attachments": [],
      "is_reply_comment": 1,
      "reply_comment": {
        "id": "59f72dfaeadb5b5197b7da6d",
        "url": "https://{rest_api_root}/v2/comments/59f72dfaeadb5b5197b7da6d?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
        "content": "这是一个工作项评论",
        "is_deleted": 0
      },
      "created_at": 1565255712,
      "created_by": {
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

<a id="delete-v2-comments-comment-id"></a>

### 删除一条评论

`DELETE /v2/comments/{comment_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖评论所属主体的作用域`

用于按 id 删除一条评论。  
 需通过 principal_type 指定所属主体。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `comment_id` | string | 是 | 评论的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 评论主体的类型。例如： 在 `principal_type` 为 `workitem` 时，删除工作项的评论，此时要求作用域包括 `pcp:write:pjm:workitem`； 在 `principal_type` 为 `workitem_review（工作项评审）` 时，删除工作项评审的评论，此时要求作用域包括 `pcp:write:pjm:project`；枚举："workitem" / "workitem_review" / "testrun" / "testcase" / "testcase_review" / "idea" / "idea_review" / "ticket" / "page" |
| `principal_id` | string |  | 评论主体的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 评论的 id |
| `url` | string | 是 | 评论的资源地址 |
| `content` | string | 是 | 评论的内容。被删除后为空字符串 |
| `attachment_count` | number | 是 | 评论的附件数量 |
| `attachments` | object[] | 是 | 评论的附件列表 |
| `is_reply_comment` | number | 是 | 是否是回复评论；枚举：0 / 1 |
| `reply_comment` | object | 是 | 被回复的评论 |
| `created_at` | number | 是 | 评论的创建时间 |
| `created_by` | object | 是 | 评论的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `is_deleted` | number | 是 | 评论是否被删除；枚举：0 / 1 |

**响应示例**

```json
{
  "id": "59f72dfaeadb5b5197b7da6d",
  "url": "https://{rest_api_root}/v2/comments/59f72dfaeadb5b5197b7da6d?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
  "content": "",
  "attachment_count": 0,
  "attachments": [],
  "is_reply_comment": 0,
  "reply_comment": null,
  "created_at": 1565255712,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  },
  "is_deleted": 1
}
```

## 附件

> 分组路径：全局 / 通用 / 附件

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/attachments` | [上传一个文件](#post-v2-attachments-2) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/attachments` | [上传一个代码段](#post-v2-attachments) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/attachments/{attachment_id}` | [获取一个附件](#get-v2-attachments-attachment-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/attachments` | [获取附件列表](#get-v2-attachments) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/attachments/{attachment_id}` | [删除一个附件](#delete-v2-attachments-attachment-id) | 企业令牌 / 用户令牌 |

<a id="post-v2-attachments-2"></a>

### 上传一个文件

`POST /v2/attachments` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖附件所属主体的作用域`

用于向指定主体上传一个文件。  
 需通过 principal_type 指定所属主体。  
 向所属主体的评论上传时还需传 comment_id。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 附件主体的类型。例如： 在 `principal_type` 为 `workitem` 时，向工作项上传文件，此时要求作用域包括 `pcp:write:pjm:workitem`； 在 `principal_type` 为 `workitem_review（工作项评审）` 时，向工作项评审上传文件，此时要求作用域包括 `pcp:write:pjm:project`；枚举："workitem" / "workitem_review" / "testcase" / "testcase_review" / "testrun" / "idea" / "idea_review" / "ticket" / "page" |
| `principal_id` | string | 是 | 附件主体的 id |
| `comment_id` | string |  | 附件主体的评论 id。当需要向附件主体的评论上传文件或者代码段时，需要传入该参数 |

**请求头**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `content-type` | string | 是 | `multipart/form-data` |

**请求体**（`multipart/form-data`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `file` | string (binary) | 是 | 要上传的文件 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string |  |  |
| `url` | string |  |  |
| `title` | string |  |  |
| `size` | number |  |  |
| `type` | string |  |  |
| `file_type` | string |  |  |
| `ext` | string |  |  |
| `download_url` | string |  |  |
| `created_at` | number |  |  |
| `created_by` | object |  |  |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |

**响应示例**

```json
{
  "id": "5da588ca84c7377a5d327e6c",
  "url": "https://{rest_api_root}/v2/attachments/5da588ca84c7377a5d327e6c?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
  "title": "这是一个图片类型的附件",
  "size": 1024,
  "type": "file",
  "file_type": "image",
  "ext": "png",
  "download_url": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a.png",
  "created_at": 1583290347,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

<a id="post-v2-attachments"></a>

### 上传一个代码段

`POST /v2/attachments` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖附件所属主体的作用域`

用于向指定主体上传一个代码段。  
 需通过 principal_type 指定所属主体。

**请求头**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `content-type` | string | 是 | `application/json` |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 附件主体的类型。例如： 在 `principal_type` 为 `workitem` 时，向工作项上传代码段，此时要求作用域包括 `pcp:write:pjm:workitem`； 在 `principal_type` 为 `workitem_review（工作项评审）` 时，向工作项评审上传代码段，此时要求作用域包括 `pcp:write:pjm:project`；枚举："workitem" / "workitem_review" / "testcase" / "testcase_review" / "testrun" / "idea" / "idea_review" / "ticket" / "page" |
| `principal_id` | string | 是 | 附件主体的 id |
| `comment_id` | string |  | 附件主体的评论 id。当需要向附件主体的评论上传文件或者代码段时，需要传入该参数 |
| `title` | string | 是 | 代码段的标题 |
| `format` | string | 是 | 代码段的语言；枚举："clike" / "css" / "dart" / "django" / "dockerfile" / "go" / "markdown" / "nginx" / "python" / "php" / "shell" / "sql" / "swift" / "html" / "javascript" / "jsx" / "pascal" / "sass" / "stylus" / "vue" / "yaml" / "haskell" |
| `content` | string | 是 | 代码段的内容 |

**请求示例**

```json
{
  "principal_type": "workitem",
  "principal_id": "5edca524cad2fa1125cb0630",
  "comment_id": "59f72dfaeadb5b5197b7da6d",
  "title": "这是一个代码片段",
  "format": "javascript",
  "content": "const a = 'abc';"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string |  |  |
| `url` | string |  |  |
| `title` | string |  |  |
| `size` | number |  |  |
| `type` | string |  |  |
| `format` | string |  |  |
| `content` | string |  |  |
| `line` | number |  |  |
| `created_at` | number |  |  |
| `created_by` | object |  |  |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |

**响应示例**

```json
{
  "id": "5da588ca84c7377a5d327e6d",
  "url": "https://{rest_api_root}/v2/attachments/5da588ca84c7377a5d327e6d?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630&comment_id=59f72dfaeadb5b5197b7da6d",
  "title": "这是一个代码片段",
  "size": 16,
  "type": "snippet",
  "format": "javascript",
  "content": "const a = 'abc';",
  "line": 1,
  "created_at": 1583290347,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

<a id="get-v2-attachments-attachment-id"></a>

### 获取一个附件

`GET /v2/attachments/{attachment_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖附件所属主体的作用域`

用于按 id 获取一个附件，支持文件、代码段、链接和页面。  
 需通过 principal_type 指定所属主体。  
 获取所属主体的评论附件时还需传 comment_id。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `attachment_id` | string | 是 | 附件的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 附件主体的类型。例如： 在 `principal_type` 为 `workitem` 时，获取工作项的附件，此时要求作用域包括 `pcp:read:pjm:workitem`； 在 `principal_type` 为 `deliverable_target` 时，获取交付目标的附件，此时要求作用域包括 `pcp:read:pjm:project`； 在 `principal_type` 为 `workitem_review（工作项评审）` 时，获取工作项评审的附件，此时要求作用域包括 `pcp:read:pjm:project`；枚举："workitem" / "workitem_review" / "deliverable_target" / "testcase" / "testcase_review" / "testrun" / "idea" / "idea_review" / "ticket" / "page" |
| `principal_id` | string | 是 | 附件主体的 id |
| `comment_id` | string |  | 附件主体的评论 id。当需要获取评论附件时，需要传入该参数 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 附件的 id |
| `url` | string | 是 | 附件的资源地址 |
| `title` | string | 是 | 附件的标题 |
| `size` | number | 是 | 附件的大小 |
| `type` | string | 是 | 附件的类型；枚举："file" / "snippet" / "link" / "page" |
| `file_type` | string |  | 文件的类型。当附件的类型为 `file` 时返回；枚举："image" / "other" |
| `ext` | string |  | 文件的扩展名。当附件的类型为 `file` 时返回 |
| `download_url` | string |  | 文件的下载地址。当附件的类型为 `file` 时返回 |
| `format` | string |  | 代码的格式。当附件的类型为 `snippet` 时返回；枚举："clike" / "css" / "dart" / "django" / "dockerfile" / "go" / "markdown" / "nginx" / "python" / "php" / "shell" / "sql" / "swift" / "html" / "javascript" / "jsx" / "pascal" / "sass" / "stylus" / "vue" / "yaml" / "haskell" |
| `content` | string |  | 代码的内容。当附件的类型为 `snippet` 时返回 |
| `line` | number |  | 代码的行数。当附件的类型为 `snippet` 时返回 |
| `link_url` | string |  | 链接的地址。当附件的类型为 `link` 时返回 |
| `short_id` | string |  | 页面的短 id。当附件的类型为 `page` 时返回 |
| `html_url` | string |  | 页面的访问地址。当附件的类型为 `page` 时返回 |
| `created_at` | number | 是 | 附件的创建时间 |
| `created_by` | object | 是 | 附件的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |

**响应示例 1：响应示例（文件）**

```json
{
  "id": "5da588ca84c7377a5d327e6c",
  "url": "https://{rest_api_root}/v2/attachments/5da588ca84c7377a5d327e6c?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
  "title": "这是一个图片类型的附件",
  "size": 1024,
  "type": "file",
  "file_type": "image",
  "ext": "png",
  "download_url": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a.png",
  "created_at": 1583290347,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

**响应示例 2：响应示例（代码段）**

```json
{
  "id": "5da588ca84c7377a5d327e6d",
  "url": "https://{rest_api_root}/v2/attachments/5da588ca84c7377a5d327e6d?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630&comment_id=59f72dfaeadb5b5197b7da6d",
  "title": "这是一个代码片段",
  "size": 16,
  "type": "snippet",
  "format": "javascript",
  "content": "const a = 'abc';",
  "line": 1,
  "created_at": 1583290347,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

**响应示例 3：响应示例（链接）**

```json
{
  "id": "5da588ca84c7377a5d327e70",
  "url": "https://{rest_api_root}/v2/attachments/5da588ca84c7377a5d327e70?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
  "title": "外部文档",
  "type": "link",
  "link_url": "https://example.com/docs",
  "created_at": 1583290400,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

**响应示例 4：响应示例（页面）**

```json
{
  "id": "5da588ca84c7377a5d327e71",
  "url": "https://{rest_api_root}/v2/attachments/5da588ca84c7377a5d327e71?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
  "title": "需求说明",
  "type": "page",
  "short_id": "AbCdEfGh",
  "html_url": "https://yctech.pingcode.com/wiki/pages/AbCdEfGh",
  "created_at": 1583290380,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

<a id="get-v2-attachments"></a>

### 获取附件列表

`GET /v2/attachments` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖附件所属主体的作用域`

用于分页获取指定主体的附件列表。  
 需通过 principal_type 指定所属主体。  
 获取所属主体的评论附件时还需传 comment_id。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 附件主体的类型。例如： 在 `principal_type` 为 `workitem` 时，获取工作项的附件列表，此时要求作用域包括 `pcp:read:pjm:workitem`； 在 `principal_type` 为 `workitem_review（工作项评审）` 时，获取工作项评审的附件列表，此时要求作用域包括 `pcp:read:pjm:project`；枚举："workitem" / "workitem_review" / "testcase" / "testcase_review" / "testrun" / "idea" / "idea_review" / "ticket" / "page" |
| `principal_id` | string | 是 | 附件主体的 id |
| `comment_id` | string |  | 附件主体的评论 id。当需要获取评论附件时，需要传入该参数 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object | 是 | 附件全量结构数据的数组 |
| `values.type` | string | 是 | 附件的类型；枚举："file" / "snippet" / "link" / "page" |
| `values.link_url` | string |  | 链接的地址。当附件的类型为 `link` 时返回 |
| `values.short_id` | string |  | 页面的短 id。当附件的类型为 `page` 时返回 |
| `values.html_url` | string |  | 页面的访问地址。当附件的类型为 `page` 时返回 |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 4,
  "values": [
    {
      "id": "5da588ca84c7377a5d327e70",
      "url": "https://{rest_api_root}/v2/attachments/5da588ca84c7377a5d327e70?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
      "title": "外部文档",
      "type": "link",
      "link_url": "https://example.com/docs",
      "created_at": 1583290400,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      }
    },
    {
      "id": "5da588ca84c7377a5d327e71",
      "url": "https://{rest_api_root}/v2/attachments/5da588ca84c7377a5d327e71?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
      "title": "需求说明",
      "type": "page",
      "short_id": "AbCdEfGh",
      "html_url": "https://yctech.pingcode.com/wiki/pages/AbCdEfGh",
      "created_at": 1583290380,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      }
    },
    {
      "id": "5da588ca84c7377a5d327e6d",
      "url": "https://{rest_api_root}/v2/attachments/5da588ca84c7377a5d327e6d?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
      "title": "这是一个代码片段",
      "size": 16,
      "type": "snippet",
      "format": "javascript",
      "content": "const a = 'abc';",
      "line": 1,
      "created_at": 1583290347,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
      }
    },
    {
      "id": "5da588ca84c7377a5d327e6f",
      "url": "https://{rest_api_root}/v2/attachments/5da588ca84c7377a5d327e6f?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
      "title": "这是一个图片类型的附件",
      "size": 1024,
      "type": "file",
      "file_type": "image",
      "ext": "png",
      "download_url": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839b.png",
      "created_at": 1583290340,
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

<a id="delete-v2-attachments-attachment-id"></a>

### 删除一个附件

`DELETE /v2/attachments/{attachment_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖附件所属主体的作用域`

用于按 id 删除一个附件。  
 需通过 principal_type 指定所属主体。  
 删除所属主体的评论附件时还需传 comment_id。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `attachment_id` | string | 是 | 附件的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 附件主体的类型。例如： 在 `principal_type` 为 `workitem` 时，删除工作项的附件，此时要求作用域包括 `pcp:write:pjm:workitem`； 在 `principal_type` 为 `workitem_review（工作项评审）` 时，删除工作项评审的附件，此时要求作用域包括 `pcp:write:pjm:project`；枚举："workitem" / "workitem_review" / "testcase" / "testcase_review" / "testrun" / "idea" / "idea_review" / "ticket" / "page" |
| `principal_id` | string | 是 | 附件主体的 id |
| `comment_id` | string |  | 附件主体的评论 id。当需要删除评论附件时，需要传入该参数 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 附件的 id |
| `url` | string | 是 | 附件的资源地址 |
| `title` | string | 是 | 附件的标题 |
| `size` | number | 是 | 附件的大小 |
| `type` | string | 是 | 附件的类型；枚举："file" / "snippet" |
| `file_type` | string | 是 | 文件的类型；枚举："image" / "other" |
| `ext` | string | 是 | 文件的扩展名 |
| `download_url` | string | 是 | 文件的下载地址 |
| `created_at` | number | 是 | 附件的创建时间 |
| `created_by` | object | 是 | 附件的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |

**响应示例**

```json
{
  "id": "5da588ca84c7377a5d327e6c",
  "url": "https://{rest_api_root}/v2/attachments/5da588ca84c7377a5d327e6c?principal_type=workitem&principal_id=5edca524cad2fa1125cb0630",
  "title": "这是一个图片类型的附件",
  "size": 1024,
  "type": "file",
  "file_type": "image",
  "ext": "png",
  "download_url": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a.png",
  "created_at": 1583290347,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

## 关注人

> 分组路径：全局 / 通用 / 关注人

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/participants` | [添加一个关注人](#post-v2-participants) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/participants/{participant_id}` | [获取一个关注人](#get-v2-participants-participant-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/participants` | [获取关注人列表](#get-v2-participants) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/participants/{participant_id}` | [移除一个关注人](#delete-v2-participants-participant-id) | 企业令牌 / 用户令牌 |

<a id="post-v2-participants"></a>

### 添加一个关注人

`POST /v2/participants` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖关注人所属主体的作用域`

用于向指定主体添加一个关注人。  
 需通过 principal_type 指定所属主体。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 关注人主体的类型。例如： 在 `principal_type` 为 `workitem` 时，添加工作项的关注人，此时要求作用域包括 `pcp:write:pjm:workitem`； 在 `principal_type` 为 `workitem_review（工作项评审）` 时，添加工作项评审的关注人，此时要求作用域包括 `pcp:write:pjm:project`；枚举："workitem" / "workitem_review" / "testcase" / "testcase_review" / "idea" / "idea_review" / "ticket" / "page" |
| `principal_id` | string |  | 关注人主体的 id |
| `type` | string | 是 | 关注人的类型；枚举："user" / "user_group" |
| `participant_id` | string | 是 | 关注人的 id。用户的 id 或者团队的 id |

**请求示例 1：请求示例（工作项）**

```json
{
  "principal_type": "workitem",
  "principal_id": "63e1bf51760505c8795ebccc",
  "type": "user",
  "participant_id": "a0417f68e846aae315c85d24643678a9"
}
```

**请求示例 2：请求示例（产品需求评审）**

```json
{
  "principal_type": "idea_review",
  "principal_id": "6f168f764eba01a5278b87cd",
  "type": "user",
  "participant_id": "a0417f68e846aae315c85d24643678a9"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 关注人的 id |
| `url` | string | 是 | 关注人的资源地址 |
| `type` | string | 是 | 关注人的类型；枚举："user" / "user_group" |
| `user` | object |  | 关注的用户。当 `type` 为 `user` 时返回 |
| `user.id` | string |  |  |
| `user.url` | string |  |  |
| `user.name` | string |  |  |
| `user.display_name` | string |  |  |
| `user.avatar` | string |  |  |
| `user_group` | object |  | 关注的团队。当 `type` 为 `user_group` 时返回 |

**响应示例 1：响应示例（工作项）**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=workitem&principal_id=63e1bf51760505c8795ebccc",
  "type": "user",
  "user": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

**响应示例 2：响应示例（产品需求评审）**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=idea_review&principal_id=6f168f764eba01a5278b87cd",
  "type": "user",
  "user": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

<a id="get-v2-participants-participant-id"></a>

### 获取一个关注人

`GET /v2/participants/{participant_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖关注人所属主体的作用域`

用于按 id 获取一个关注人。  
 需通过 principal_type 指定所属主体。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `participant_id` | string | 是 | 关注人的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 关注人主体的类型。例如： 在 `principal_type` 为 `workitem` 时，获取工作项的关注人，此时要求作用域包括 `pcp:read:pjm:workitem`； 在 `principal_type` 为 `workitem_review（工作项评审）` 时，获取工作项评审的关注人，此时要求作用域包括 `pcp:read:pjm:project`；枚举："workitem" / "workitem_review" / "testcase" / "testcase_review" / "idea" / "idea_review" / "ticket" / "page" |
| `principal_id` | string |  | 关注人主体的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 关注人的 id |
| `url` | string | 是 | 关注人的资源地址 |
| `type` | string | 是 | 关注人的类型；枚举："user" / "user_group" |
| `user` | object |  | 关注的用户。当 `type` 为 `user` 时，该字段返回 |
| `user.id` | string |  |  |
| `user.url` | string |  |  |
| `user.name` | string |  |  |
| `user.display_name` | string |  |  |
| `user.avatar` | string |  |  |
| `user_group` | object |  | 关注的团队。当 `type` 为 `user_group` 时，该字段返回 |

**响应示例**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=workitem&principal_id=63e1bf51760505c8795ebccc",
  "type": "user",
  "user": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

<a id="get-v2-participants"></a>

### 获取关注人列表

`GET /v2/participants` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖关注人所属主体的作用域`

用于分页获取指定主体的关注人列表。  
 需通过 principal_type 指定所属主体。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 关注人主体的类型。例如： 在 `principal_type` 为 `workitem` 时，获取工作项的关注人列表，此时要求作用域包括 `pcp:read:pjm:workitem`； 在 `principal_type` 为 `workitem_review（工作项评审）` 时，获取工作项评审的关注人列表，此时要求作用域包括 `pcp:read:pjm:project`；枚举："workitem" / "workitem_review" / "testcase" / "testcase_review" / "idea" / "idea_review" / "ticket" / "page" |
| `principal_id` | string |  | 关注人主体的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 关注人全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].type` | string |  |  |
| `values[].user` | object |  |  |
| `values[].user.id` | string |  |  |
| `values[].user.url` | string |  |  |
| `values[].user.name` | string |  |  |
| `values[].user.display_name` | string |  |  |
| `values[].user.avatar` | string |  |  |
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
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=workitem&principal_id=63e1bf51760505c8795ebccc",
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
      "url": "https://{rest_api_root}/v2/participants/63c8fb32729dee3334d96af7?principal_type=workitem&principal_id=63e1bf51760505c8795ebccc",
      "type": "user_group",
      "user_group": {
        "id": "63c8fb32729dee3334d96af7",
        "url": "https://{rest_api_root}/v2/directory/user_groups/63c8fb32729dee3334d96af7",
        "name": "Open Team"
      }
    }
  ]
}
```

<a id="delete-v2-participants-participant-id"></a>

### 移除一个关注人

`DELETE /v2/participants/{participant_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖关注人所属主体的作用域`

用于从指定主体移除一个关注人。  
 需通过 principal_type 指定所属主体。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `participant_id` | string | 是 | 关注人的 id。用户的 id 或者团队的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 关注人主体的类型。例如： 在 `principal_type` 为 `workitem` 时，移除工作项的关注人，此时要求作用域包括 `pcp:write:pjm:workitem`； 在 `principal_type` 为 `workitem_review（工作项评审）` 时，移除工作项评审的关注人，此时要求作用域包括 `pcp:write:pjm:project`；枚举："workitem" / "workitem_review" / "testcase" / "testcase_review" / "idea" / "idea_review" / "ticket" / "page" |
| `principal_id` | string |  | 关注人主体的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 关注人的 id |
| `url` | string | 是 | 关注人的资源地址 |
| `type` | string | 是 | 关注人的类型；枚举："user" / "user_group" |
| `user` | object |  | 关注的用户。当 `type` 为 `user` 时返回 |
| `user.id` | string |  |  |
| `user.url` | string |  |  |
| `user.name` | string |  |  |
| `user.display_name` | string |  |  |
| `user.avatar` | string |  |  |
| `user_group` | object |  | 关注的团队。当 `type` 为 `user_group` 时返回 |

**响应示例**

```json
{
  "id": "a0417f68e846aae315c85d24643678a9",
  "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=workitem&principal_id=63e1bf51760505c8795ebccc",
  "type": "user",
  "user": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

## 实体扩展属性

> 分组路径：全局 / 通用 / 实体扩展属性

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/entity_properties` | [向实体中添加一个扩展属性](#post-v2-entity-properties) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/entity_properties/{property_id}` | [获取实体中的一个扩展属性](#get-v2-entity-properties-property-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/entity_properties` | [获取实体中的扩展属性列表](#get-v2-entity-properties) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/entity_properties/{property_id}` | [在实体中移除一个扩展属性](#delete-v2-entity-properties-property-id) | 企业令牌 / 用户令牌 |

<a id="post-v2-entity-properties"></a>

### 向实体中添加一个扩展属性

`POST /v2/entity_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖所属实体的作用域`

用于向指定实体添加扩展属性。  
 value 为 JSON 且不超过 2KB、嵌套深度不超过 8 层，可通过 overwrite 覆盖已存在的 property_key。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_type` | string | 是 | 实体类型。例如： 在 `entity_type` 为 `workitem` 时，向工作项添加扩展属性，此时要求作用域包括 `pcp:write:pjm:workitem`；枚举："workitem" / "idea" / "ticket" / "testcase" / "product" / "project" / "library" / "space" / "page" |
| `entity_id` | string | 是 | 实体的 id |
| `property_key` | string | 是 | 属性键。最大长度 256。仅允许字母、数字、冒号、下划线、点、连字符（`a-zA-Z0-9:._-`）。用于显示在实体的 `entity_properties` 属性中 |
| `value` | object | 是 | 属性值。`value` 为任意合法 JSON，不超过 2KB，嵌套深度不超过 8 层. |
| `value.score` | number |  |  |
| `value.risk` | string |  |  |
| `overwrite` | number | 是 | 当相同 `property_key` 已存在时是否覆盖。1 表示覆盖，0 表示不覆盖 |

**请求示例**

```json
{
  "entity_type": "workitem",
  "entity_id": "6efca131b06329c524cdd2fb",
  "property_key": "entity_property_key_a",
  "value": {
    "score": 95,
    "risk": "low"
  },
  "overwrite": 1
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 属性 id |
| `property_key` | string | 是 | 属性键。用于显示在实体的 `entity_properties` 属性中 |
| `url` | string | 是 | 属性资源地址 |
| `value` | object | 是 | 属性值 |
| `value.score` | number |  |  |
| `value.risk` | string |  |  |

**响应示例**

```json
{
  "id": "entity_property_key_a",
  "url": "https://{rest_api_root}/v2/entity_properties/entity_property_key_a?entity_type=workitem&entity_id=6efca131b06329c524cdd2fb",
  "property_key": "entity_property_key_a",
  "value": {
    "score": 95,
    "risk": "low"
  }
}
```

<a id="get-v2-entity-properties-property-id"></a>

### 获取实体中的一个扩展属性

`GET /v2/entity_properties/{property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖所属实体的作用域`

用于获取指定实体上的一个扩展属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `property_id` | string | 是 | 扩展属性的 id 或 property_key |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_type` | string | 是 | 实体类型。例如： 在 `entity_type` 为 `workitem` 时，获取工作项的扩展属性，此时要求作用域包括 `pcp:read:pjm:workitem`；枚举："workitem" / "idea" / "ticket" / "testcase" / "product" / "project" / "library" / "space" / "page" |
| `entity_id` | string | 是 | 实体的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 属性 id |
| `property_key` | string | 是 | 属性键。用于显示在实体的 `entity_properties` 属性中 |
| `url` | string | 是 | 属性资源地址 |
| `value` | object | 是 | 属性值 |
| `value.score` | number |  |  |
| `value.risk` | string |  |  |

**响应示例**

```json
{
  "id": "entity_property_key_a",
  "url": "https://{rest_api_root}/v2/entity_properties/entity_property_key_a?entity_type=workitem&entity_id=6efca131b06329c524cdd2fb",
  "property_key": "entity_property_key_a",
  "value": {
    "score": 95,
    "risk": "low"
  }
}
```

<a id="get-v2-entity-properties"></a>

### 获取实体中的扩展属性列表

`GET /v2/entity_properties` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖所属实体的作用域`

用于获取指定实体上的扩展属性列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_type` | string | 是 | 实体类型。例如： 在 `entity_type` 为 `workitem` 时，获取工作项的扩展属性列表，此时要求作用域包括 `pcp:read:pjm:workitem`；枚举："workitem" / "idea" / "ticket" / "testcase" / "product" / "project" / "library" / "space" / "page" |
| `entity_id` | string | 是 | 实体的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `page_size` | number | 是 | 每页条数 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 扩展属性全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].property_key` | string |  |  |
| `values[].value` | object |  |  |
| `values[].value.score` | number |  |  |
| `values[].value.risk` | string |  |  |

**响应示例**

```json
{
  "page_index": 0,
  "page_size": 30,
  "total": 1,
  "values": [
    {
      "id": "entity_property_key_a",
      "url": "https://{rest_api_root}/v2/entity_properties/entity_property_key_a?entity_type=workitem&entity_id=6efca131b06329c524cdd2fb",
      "property_key": "entity_property_key_a",
      "value": {
        "score": 95,
        "risk": "low"
      }
    }
  ]
}
```

<a id="delete-v2-entity-properties-property-id"></a>

### 在实体中移除一个扩展属性

`DELETE /v2/entity_properties/{property_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖所属实体的作用域`

用于移除指定实体上的一个扩展属性。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `property_id` | string | 是 | 扩展属性的 id 或 property_key |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_type` | string | 是 | 实体类型。例如： 在 `entity_type` 为 `workitem` 时，移除工作项的扩展属性，此时要求作用域包括 `pcp:write:pjm:workitem`；枚举："workitem" / "idea" / "ticket" / "testcase" / "product" / "project" / "library" / "space" / "page" |
| `entity_id` | string | 是 | 实体的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 属性 id |
| `property_key` | string | 是 | 属性键。用于显示在实体的 `entity_properties` 属性中 |
| `url` | string | 是 | 属性资源地址 |
| `value` | object | 是 | 移除前的属性值 |
| `value.score` | number |  |  |
| `value.risk` | string |  |  |

**响应示例**

```json
{
  "id": "entity_property_key_a",
  "url": "https://{rest_api_root}/v2/entity_properties/entity_property_key_a?entity_type=workitem&entity_id=6efca131b06329c524cdd2fb",
  "property_key": "entity_property_key_a",
  "value": {
    "score": 95,
    "risk": "low"
  }
}
```

## 关联

> 分组路径：全局 / 通用 / 关联

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/relations` | [创建一个关联](#post-v2-relations) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/relations/{relation_id}` | [获取一个关联](#get-v2-relations-relation-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/relations` | [获取关联列表](#get-v2-relations) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/relations/{relation_id}` | [删除一个关联](#delete-v2-relations-relation-id) | 企业令牌 / 用户令牌 |

<a id="post-v2-relations"></a>

### 创建一个关联

`POST /v2/relations` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖关联主体和关联目标的作用域`

用于创建两个资源的关联关系。  
 主体类型与目标类型需搭配使用。  
 暂不支持创建主体是页面的关联关系。  
 工作项与工作项的关联请使用工作项内部关联接口。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 关联主体的类型；枚举："idea" / "ticket" / "workitem" / "testplan" / "testrun" / "testcase" |
| `principal_id` | string | 是 | 关联主体的 id |
| `target_type` | string | 是 | 关联的目标类型；枚举："idea" / "ticket" / "workitem" / "testcase" / "page" |
| `target_id` | string | 是 | 关联的目标 id |

**请求示例**

```json
{
  "principal_id": "547000eb6a70571487623fea",
  "principal_type": "testrun",
  "target_type": "workitem",
  "target_id": "5edca524cad2fa1125cb0630"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 关联的 id |
| `url` | string | 是 | 关联的资源地址 |
| `principal_type` | string | 是 | 关联主体的类型；枚举："idea" / "ticket" / "workitem" / "testplan" / "testrun" / "testcase" / "page" |
| `principal` | object | 是 | 关联的主体 |
| `principal.id` | string |  |  |
| `principal.url` | string |  |  |
| `principal.short_id` | string |  |  |
| `principal.html_url` | string |  |  |
| `principal.status` | string |  |  |
| `target_type` | string | 是 | 关联的目标类型；枚举："ticket" / "workitem" / "testcase" / "idea" / "page" |
| `target` | object | 是 | 关联的目标 |
| `target.id` | string |  |  |
| `target.url` | string |  |  |
| `target.short_id` | string |  |  |
| `target.html_url` | string |  |  |
| `target.whole_identifier` | string |  |  |
| `target.title` | string |  |  |
| `target.start` | object |  |  |
| `target.start.date` | number |  |  |
| `target.start.with_time` | number |  |  |
| `target.due` | object |  |  |
| `target.due.date` | number |  |  |
| `target.due.with_time` | number |  |  |
| `target.parent_id` | string |  |  |
| `target.properties` | object |  |  |
| `target.properties.prop_a` | string |  |  |
| `target.properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "fa1125cb06305edca524cad2",
  "url": "https://{rest_api_root}/v2/relations/fa1125cb06305edca524cad2",
  "principal_type": "testrun",
  "principal": {
    "id": "547000eb6a70571487623fea",
    "url": "https://{rest_api_root}/v2/testhub/testruns/547000eb6a70571487623fea",
    "short_id": "Aq1u38yX",
    "html_url": "https://yctech.pingcode.com/testhub/runs/Aq1u38yX",
    "status": "failure"
  },
  "target_type": "workitem",
  "target": {
    "id": "5edca524cad2fa1125cb0630",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "whole_identifier": "SCR-5",
    "title": "这是一个缺陷",
    "start": {
      "date": 1583290309,
      "with_time": 0
    },
    "due": {
      "date": 1583290347,
      "with_time": 0
    },
    "parent_id": "5edca524cad2fa112b06105c",
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  }
}
```

<a id="get-v2-relations-relation-id"></a>

### 获取一个关联

`GET /v2/relations/{relation_id}` ｜ 令牌：企业令牌 / 用户令牌

用于按 id 获取关联全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `relation_id` | string | 是 | 关联的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `include_deleted` | boolean |  | 是否包含已删除的关联。该值默认为`false` |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 关联的 id |
| `url` | string | 是 | 关联的资源地址 |
| `principal_type` | string | 是 | 关联主体的类型；枚举："idea" / "ticket" / "workitem" / "testplan" / "testrun" / "testcase" / "page" |
| `principal` | object | 是 | 关联的主体 |
| `principal.id` | string |  |  |
| `principal.url` | string |  |  |
| `principal.short_id` | string |  |  |
| `principal.html_url` | string |  |  |
| `principal.whole_identifier` | string |  |  |
| `principal.title` | string |  |  |
| `principal.start` | object |  |  |
| `principal.start.date` | number |  |  |
| `principal.start.with_time` | number |  |  |
| `principal.due` | object |  |  |
| `principal.due.date` | number |  |  |
| `principal.due.with_time` | number |  |  |
| `principal.parent_id` | string |  |  |
| `principal.properties` | object |  |  |
| `principal.properties.prop_a` | string |  |  |
| `principal.properties.prop_b` | string |  |  |
| `target_type` | string | 是 | 关联的目标类型；枚举："ticket" / "workitem" / "testcase" / "idea" / "page" |
| `target` | object | 是 | 关联的目标 |
| `target.id` | string |  |  |
| `target.url` | string |  |  |
| `target.short_id` | string |  |  |
| `target.html_url` | string |  |  |
| `target.whole_identifier` | string |  |  |
| `target.title` | string |  |  |

**响应示例**

```json
{
  "id": "653b1b4a3113be5bb040e4c5",
  "url": "https://{rest_api_root}/v2/relations/653b1b4a3113be5bb040e4c5",
  "principal_type": "workitem",
  "principal": {
    "id": "5edca524cad2fa1125cb0630",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "whole_identifier": "SCR-5",
    "title": "这是一个缺陷",
    "start": {
      "date": 1583290309,
      "with_time": 0
    },
    "due": {
      "date": 1583290347,
      "with_time": 0
    },
    "parent_id": "5edca524cad2fa112b06105c",
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  },
  "target_type": "idea",
  "target": {
    "id": "64b4d70ba368e6594360ea24",
    "url": "https://{rest_api_root}/v2/ship/ideas/64b4d70ba368e6594360ea24",
    "short_id": "Ogf1EYey",
    "html_url": "https://yctech.pingcode.com/ship/ideas/Ogf1EYey",
    "whole_identifier": "SLC-1",
    "title": "示例需求"
  }
}
```

<a id="get-v2-relations"></a>

### 获取关联列表

`GET /v2/relations` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖关联主体和关联目标的作用域`

用于获取关联列表。  
 主体类型与目标类型需搭配使用。  
 工作项与工作项的关联请使用工作项内部关联接口。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 关联主体的类型；枚举："idea" / "ticket" / "workitem" / "testplan" / "testrun" / "testcase" / "page" |
| `principal_id` | string | 是 | 关联主体的 id |
| `target_type` | string | 是 | 关联的目标类型；枚举："idea" / "ticket" / "workitem" / "testcase" / "page" |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 关联全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].principal_type` | string |  |  |
| `values[].principal` | object |  |  |
| `values[].principal.id` | string |  |  |
| `values[].principal.url` | string |  |  |
| `values[].principal.short_id` | string |  |  |
| `values[].principal.html_url` | string |  |  |
| `values[].principal.whole_identifier` | string |  |  |
| `values[].principal.title` | string |  |  |
| `values[].target_type` | string |  |  |
| `values[].target` | object |  |  |
| `values[].target.id` | string |  |  |
| `values[].target.url` | string |  |  |
| `values[].target.short_id` | string |  |  |
| `values[].target.html_url` | string |  |  |
| `values[].target.whole_identifier` | string |  |  |
| `values[].target.title` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "64b4d70ba368e6594360ea79",
      "url": "https://{rest_api_root}/v2/relations/64b4d70ba368e6594360ea79",
      "principal_type": "idea",
      "principal": {
        "id": "64b4d70ba368e6594360ea24",
        "url": "https://{rest_api_root}/v2/ship/ideas/64b4d70ba368e6594360ea24",
        "short_id": "Ogf1EYey",
        "html_url": "https://yctech.pingcode.com/ship/ideas/Ogf1EYey",
        "whole_identifier": "SLC-1",
        "title": "示例需求"
      },
      "target_type": "ticket",
      "target": {
        "id": "63eca888a0a13a3efc8d4a43",
        "url": "https://{rest_api_root}/v2/ship/tickets/63eca888a0a13a3efc8d4a43",
        "short_id": "pdMUgQzZ",
        "html_url": "https://yctech.pingcode.com/ship/tickets/pdMUgQzZ",
        "whole_identifier": "SLC-T1",
        "title": "希望新增支持第三方账号注册"
      }
    }
  ]
}
```

<a id="delete-v2-relations-relation-id"></a>

### 删除一个关联

`DELETE /v2/relations/{relation_id}` ｜ 令牌：企业令牌 / 用户令牌

用于按 id 删除一个关联。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `relation_id` | string | 是 | 关联的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 关联的 id |
| `url` | string | 是 | 关联的资源地址 |
| `principal_type` | string | 是 | 关联主体的类型；枚举："idea" / "ticket" / "workitem" / "testplan" / "testrun" / "testcase" / "page" |
| `principal` | object | 是 | 关联的主体 |
| `principal.id` | string |  |  |
| `principal.url` | string |  |  |
| `principal.short_id` | string |  |  |
| `principal.html_url` | string |  |  |
| `principal.name` | string |  |  |
| `principal.status` | string |  |  |
| `principal.start_at` | object |  |  |
| `principal.start_at.date` | number |  |  |
| `principal.start_at.with_time` | number |  |  |
| `principal.end_at` | object |  |  |
| `principal.end_at.date` | number |  |  |
| `principal.end_at.with_time` | number |  |  |
| `target_type` | string | 是 | 关联的目标类型；枚举："ticket" / "workitem" / "testcase" / "idea" / "page" |
| `target` | object | 是 | 关联的目标 |
| `target.id` | string |  |  |
| `target.url` | string |  |  |
| `target.short_id` | string |  |  |
| `target.html_url` | string |  |  |
| `target.whole_identifier` | string |  |  |
| `target.title` | string |  |  |
| `target.start` | object |  |  |
| `target.start.date` | number |  |  |
| `target.start.with_time` | number |  |  |
| `target.due` | object |  |  |
| `target.due.date` | number |  |  |
| `target.due.with_time` | number |  |  |
| `target.parent_id` | string |  |  |
| `target.properties` | object |  |  |
| `target.properties.prop_a` | string |  |  |
| `target.properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "fa1125cb06305edca524cad2",
  "url": "https://{rest_api_root}/v2/relations/fa1125cb06305edca524cad2",
  "principal_type": "testplan",
  "principal": {
    "id": "5eb6a70571487623fea47000",
    "url": "https://{rest_api_root}/v2/testhub/testplans/5eb6a70571487623fea47000",
    "short_id": "AbCdEf12",
    "html_url": "https://yctech.pingcode.com/testhub/libraries/LIB/plans/AbCdEf12/runs",
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
  "target_type": "workitem",
  "target": {
    "id": "5edca524cad2fa1125cb0630",
    "url": "https://{rest_api_root}/v2/pjm/workitems/5edca524cad2fa1125cb0630",
    "short_id": "c9WqLmTO",
    "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
    "whole_identifier": "SCR-5",
    "title": "这是一个缺陷",
    "start": {
      "date": 1583290309,
      "with_time": 0
    },
    "due": {
      "date": 1583290347,
      "with_time": 0
    },
    "parent_id": "5edca524cad2fa112b06105c",
    "properties": {
      "prop_a": "prop_a_value",
      "prop_b": "prop_b_value"
    }
  }
}
```

## 活动记录

> 分组路径：全局 / 通用 / 活动记录

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `GET` | `/v2/activities/{activity_id}` | [获取一条活动记录](#get-v2-activities-activity-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/activities` | [获取活动记录列表](#get-v2-activities) | 企业令牌 / 用户令牌 |

<a id="get-v2-activities-activity-id"></a>

### 获取一条活动记录

`GET /v2/activities/{activity_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖所属主体的作用域`

用于按 id 获取一条活动记录。  
 需通过 principal_type 指定所属主体。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `activity_id` | string | 是 | 活动记录的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 主体的类型。例如： 在 `principal_type` 为 `workitem` 时，获取工作项的活动记录，此时要求作用域包括 `pcp:read:pjm:workitem`；枚举："workitem" / "testrun" / "testcase" / "idea" / "ticket" |
| `principal_id` | string | 是 | 主体的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 活动记录的 id |
| `url` | string | 是 | 活动记录的资源地址 |
| `template` | string | 是 | 活动记录的模板 |
| `type` | string | 是 | 活动记录的操作类型 |
| `summary` | string | 是 | 活动记录的摘要 |
| `content` | object | 是 | 活动记录的内容 |
| `content.property_key` | string |  |  |
| `content.origin` | null |  |  |
| `content.target` | object[] |  |  |
| `content.target[].id` | string |  |  |
| `content.target[].name` | string |  |  |
| `client` | string | 是 | 活动记录的客户端；枚举："\"unknown\"" / "\"web\"" / "\"mail\"" / "\"iphone\"" / "\"ipad\"" / "\"android\"" / "\"android_hd\"" / "\"winphone\"" / "\"win8\"" / "\"wap\"" / "\"weixin\"" / "\"api\"" / "\"hook\"" / "\"fetch\"" / "\"windows\"" / "\"mac\"" / "\"h5\"" / "\"flow\"" |
| `created_at` | number | 是 | 活动记录的创建时间 |
| `created_by` | object | 是 | 活动记录的创建者 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |

**响应示例**

```json
{
  "id": "694ae20fdb8e0baef70f7ddb",
  "url": "https://{rest_api_root}/v2/activities/694ae20fdb8e0baef70f7ddb?principal_type=idea&principal_id=683562430d684517b06b814b",
  "template": "update-property",
  "type": "update",
  "summary": "修改了引用多选",
  "content": {
    "property_key": "yinyongduoxuan",
    "origin": null,
    "target": [
      {
        "id": "65fa797d8f0358d376233220",
        "name": "REST API 产品"
      }
    ]
  },
  "client": "web",
  "created_at": 1766515215,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/b46ef40c-e22e-4ecf-a599-cace9fba839a_160x160.png"
  }
}
```

<a id="get-v2-activities"></a>

### 获取活动记录列表

`GET /v2/activities` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖所属主体的作用域`

用于分页获取指定主体的活动记录列表。  
 需通过 principal_type 指定所属主体。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 主体的类型。例如： 在 `principal_type` 为 `workitem` 时，获取工作项的活动记录列表，此时要求作用域包括 `pcp:read:pjm:workitem`；枚举："workitem" / "testrun" / "testcase" / "idea" / "ticket" |
| `principal_id` | string | 是 | 主体的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `page_size` | number | 是 | 每页条数 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 活动记录全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].template` | string |  |  |
| `values[].type` | string |  |  |
| `values[].summary` | string |  |  |
| `values[].content` | object |  |  |
| `values[].content.property_key` | string |  |  |
| `values[].content.origin` | null |  |  |
| `values[].content.target` | object[] |  |  |
| `values[].content.target[].id` | string |  |  |
| `values[].content.target[].name` | string |  |  |
| `values[].client` | string |  |  |
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
  "page_index": 0,
  "page_size": 30,
  "total": 1,
  "values": [
    {
      "id": "694ae20fdb8e0baef70f7ddb",
      "url": "https://{rest_api_root}/v2/activities/694ae20fdb8e0baef70f7ddb?principal_type=idea&principal_id=683562430d684517b06b814b",
      "template": "update-property",
      "type": "update",
      "summary": "修改了引用多选",
      "content": {
        "property_key": "yinyongduoxuan",
        "origin": null,
        "target": [
          {
            "id": "65fa797d8f0358d376233220",
            "name": "REST API 产品"
          }
        ]
      },
      "client": "web",
      "created_at": 1766515215,
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

## 评审

> 分组路径：全局 / 通用 / 评审

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/reviews` | [创建一个评审](#post-v2-reviews) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/reviews/{review_id}` | [获取一个评审](#get-v2-reviews-review-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/reviews` | [获取评审列表](#get-v2-reviews) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/reviews/{review_id}` | [删除一个评审](#delete-v2-reviews-review-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/reviews/{review_id}/principals` | [向评审中添加一个评审内容](#post-v2-reviews-review-id-principals) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/reviews/{review_id}/principals/{principal_id}` | [获取评审中的一个评审内容](#get-v2-reviews-review-id-principals-principal-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/reviews/{review_id}/principals` | [获取评审中的评审内容列表](#get-v2-reviews-review-id-principals) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/reviews/{review_id}/principals/{principal_id}` | [在评审中移除一个评审内容](#delete-v2-reviews-review-id-principals-principal-id) | 企业令牌 / 用户令牌 |

<a id="post-v2-reviews"></a>

### 创建一个评审

`POST /v2/reviews` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖评审所属主体的作用域`

用于创建一个评审。  
 需通过 principal_type 指定所属主体。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title` | string | 是 | 评审的标题 |
| `pilot_id` | string | 是 | 评审主体所在产品、项目或测试库的 id |
| `principal_type` | string | 是 | 评审主体的类型。例如： 在 `principal_type` 为 `workitem` 时，创建工作项的评审，此时要求作用域包括 `pcp:write:pjm:project`；枚举："idea" / "workitem" / "testcase" |
| `description` | string |  | 评审的描述 |

**请求示例**

```json
{
  "title": "这是一个评审",
  "pilot_id": "63bb744314bd13c9def24cb4",
  "principal_type": "idea",
  "description": "这是一个评审的描述"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 评审的 id |
| `url` | string | 是 | 评审的资源地址 |
| `short_id` | string | 是 | 评审的短 id |
| `html_url` | string | 是 | 评审的 html 地址 |
| `identifier` | number | 是 | 评审的编号 |
| `whole_identifier` | string | 是 | 评审的完整编号 |
| `title` | string | 是 | 评审的标题 |
| `state` | string | 是 | 评审的状态；枚举："pending" / "in_progress" / "completed" / "repealed" |
| `principal_type` | string | 是 | 评审主体的类型；枚举："idea" / "workitem" / "testcase" |
| `pilot` | object | 是 | 评审所在的产品、项目或测试库 |
| `pilot.id` | string |  |  |
| `pilot.url` | string |  |  |
| `pilot.name` | string |  |  |
| `pilot.identifier` | string |  |  |
| `pilot.is_archived` | number |  |  |
| `pilot.is_deleted` | number |  |  |
| `description` | string | 是 | 评审的描述 |
| `participants` | object[] | 是 | 评审的关注人列表 |
| `participants[].id` | string |  |  |
| `participants[].url` | string |  |  |
| `participants[].type` | string |  |  |
| `participants[].user` | object |  |  |
| `participants[].user.id` | string |  |  |
| `participants[].user.url` | string |  |  |
| `participants[].user.name` | string |  |  |
| `participants[].user.display_name` | string |  |  |
| `participants[].user.avatar` | string |  |  |
| `submitted_at` | number | 是 | 评审的提交时间 |
| `submitted_by` | object | 是 | 评审的提交人 |
| `completed_at` | number | 是 | 评审的完成时间 |
| `completed_by` | object | 是 | 评审的完成人 |
| `created_at` | number | 是 | 评审的创建时间 |
| `created_by` | object | 是 | 评审的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 评审的更新时间 |
| `updated_by` | object | 是 | 评审的更新人 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |

**响应示例**

```json
{
  "id": "5f168f764eba01a5278b87cd",
  "url": "https://{rest_api_root}/v2/reviews/5f168f764eba01a5278b87cd?principal_type=idea",
  "short_id": "LsEy8mZF",
  "html_url": "https://yctech.pingcode.com/reviews/LsEy8mZF",
  "identifier": 5,
  "whole_identifier": "SCR-R5",
  "title": "这是一个评审",
  "state": "pending",
  "principal_type": "idea",
  "pilot": {
    "id": "63bb744314bd13c9def24cb4",
    "url": "https://{rest_api_root}/v2/ship/products/63bb744314bd13c9def24cb4",
    "name": "示例产品",
    "identifier": "SLC",
    "is_archived": 0,
    "is_deleted": 0
  },
  "description": "这是一个评审的描述",
  "participants": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=idea&review_id=6f168f764eba01a5278b87cd",
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
  "submitted_at": null,
  "submitted_by": null,
  "completed_at": null,
  "completed_by": null,
  "created_at": 1593290347,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/avatar.png"
  },
  "updated_at": 1593291347,
  "updated_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/avatar.png"
  }
}
```

<a id="get-v2-reviews-review-id"></a>

### 获取一个评审

`GET /v2/reviews/{review_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖评审所属主体的作用域`

用于按 id 获取一个评审。  
 需通过 principal_type 指定所属主体。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `review_id` | string | 是 | 评审的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 评审主体的类型。例如： 在 `principal_type` 为 `workitem` 时，获取工作项的评审，此时要求作用域包括 `pcp:read:pjm:project`；枚举："workitem" / "testcase" / "idea" |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 评审的 id |
| `url` | string | 是 | 评审的资源地址 |
| `short_id` | string | 是 | 评审的短 id |
| `html_url` | string | 是 | 评审的 html 地址 |
| `identifier` | number | 是 | 评审的编号 |
| `whole_identifier` | string | 是 | 评审的完整编号 |
| `title` | string | 是 | 评审的标题 |
| `state` | string | 是 | 评审状态；枚举："pending" / "in_progress" / "completed" / "repealed" |
| `principal_type` | string | 是 | 评审主体的类型；枚举："idea" / "workitem" / "testcase" |
| `pilot` | object | 是 | 评审所在的产品、项目或测试库 |
| `pilot.id` | string |  |  |
| `pilot.url` | string |  |  |
| `pilot.name` | string |  |  |
| `pilot.identifier` | string |  |  |
| `pilot.is_archived` | number |  |  |
| `pilot.is_deleted` | number |  |  |
| `description` | string | 是 | 评审的描述 |
| `participants` | object[] | 是 | 评审的关注人列表 |
| `participants[].id` | string |  |  |
| `participants[].url` | string |  |  |
| `participants[].type` | string |  |  |
| `participants[].user` | object |  |  |
| `participants[].user.id` | string |  |  |
| `participants[].user.url` | string |  |  |
| `participants[].user.name` | string |  |  |
| `participants[].user.display_name` | string |  |  |
| `participants[].user.avatar` | string |  |  |
| `submitted_at` | number | 是 | 评审的提交时间 |
| `submitted_by` | object | 是 | 评审的提交人 |
| `submitted_by.id` | string |  |  |
| `submitted_by.url` | string |  |  |
| `submitted_by.name` | string |  |  |
| `submitted_by.display_name` | string |  |  |
| `submitted_by.avatar` | string |  |  |
| `completed_at` | number | 是 | 评审的完成时间 |
| `completed_by` | object | 是 | 评审的完成人 |
| `completed_by.id` | string |  |  |
| `completed_by.url` | string |  |  |
| `completed_by.name` | string |  |  |
| `completed_by.display_name` | string |  |  |
| `completed_by.avatar` | string |  |  |
| `created_at` | number | 是 | 评审的创建时间 |
| `created_by` | object | 是 | 评审的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 评审的更新时间 |
| `updated_by` | object | 是 | 评审的更新人 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |

**响应示例**

```json
{
  "id": "6f168f764eba01a5278b87cd",
  "url": "https://{rest_api_root}/v2/reviews/6f168f764eba01a5278b87cd?principal_type=idea",
  "short_id": "LsEy8mZF",
  "html_url": "https://yctech.pingcode.com/reviews/LsEy8mZF",
  "identifier": 5,
  "whole_identifier": "SCR-R5",
  "title": "这是一个评审",
  "state": "completed",
  "principal_type": "idea",
  "pilot": {
    "id": "63bb744314bd13c9def24cb4",
    "url": "https://{rest_api_root}/v2/ship/products/63bb744314bd13c9def24cb4",
    "name": "示例产品",
    "identifier": "SLC",
    "is_archived": 0,
    "is_deleted": 0
  },
  "description": "这是一个评审的描述",
  "participants": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=idea&review_id=6f168f764eba01a5278b87cd",
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
  "submitted_at": 1593290347,
  "submitted_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/avatar.png"
  },
  "completed_at": 1593291347,
  "completed_by": {
    "id": "b2417f68e846aae315c85d24643678b0",
    "url": "https://{rest_api_root}/v2/directory/users/b2417f68e846aae315c85d24643678b0",
    "name": "mary",
    "display_name": "Mary",
    "avatar": "https://s3.amazonaws.com/bucket/avatar2.png"
  },
  "created_at": 1593290347,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/avatar.png"
  },
  "updated_at": 1593291347,
  "updated_by": {
    "id": "b2417f68e846aae315c85d24643678b0",
    "url": "https://{rest_api_root}/v2/directory/users/b2417f68e846aae315c85d24643678b0",
    "name": "mary",
    "display_name": "Mary",
    "avatar": "https://s3.amazonaws.com/bucket/avatar2.png"
  }
}
```

<a id="get-v2-reviews"></a>

### 获取评审列表

`GET /v2/reviews` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖评审所属主体的作用域`

用于分页获取评审列表。  
 需通过 principal_type 与 pilot_id 指定所属产品、项目或测试库。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 评审主体的类型。例如： 在 `principal_type` 为 `workitem` 时，获取工作项的评审列表，此时要求作用域包括 `pcp:read:pjm:project`；枚举："workitem" / "testcase" / "idea" |
| `pilot_id` | string | 是 | 评审主体所在产品、项目或测试库的 id |
| `status` | string |  | 评审的状态；枚举："pending" / "in_progress" / "completed" / "repealed" |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 评审全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].short_id` | string |  |  |
| `values[].html_url` | string |  |  |
| `values[].identifier` | number |  |  |
| `values[].whole_identifier` | string |  |  |
| `values[].title` | string |  |  |
| `values[].state` | string |  |  |
| `values[].principal_type` | string |  |  |
| `values[].pilot` | object |  |  |
| `values[].pilot.id` | string |  |  |
| `values[].pilot.url` | string |  |  |
| `values[].pilot.name` | string |  |  |
| `values[].pilot.identifier` | string |  |  |
| `values[].pilot.is_archived` | number |  |  |
| `values[].pilot.is_deleted` | number |  |  |
| `values[].description` | string |  |  |
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
| `values[].submitted_at` | number |  |  |
| `values[].submitted_by` | object |  |  |
| `values[].submitted_by.id` | string |  |  |
| `values[].submitted_by.url` | string |  |  |
| `values[].submitted_by.name` | string |  |  |
| `values[].submitted_by.display_name` | string |  |  |
| `values[].submitted_by.avatar` | string |  |  |
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

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5f168f764eba01a5278b87cd",
      "url": "https://{rest_api_root}/v2/reviews/5f168f764eba01a5278b87cd?principal_type=idea",
      "short_id": "LsEy8mZF",
      "html_url": "https://yctech.pingcode.com/reviews/LsEy8mZF",
      "identifier": 5,
      "whole_identifier": "SCR-R5",
      "title": "这是一个评审",
      "state": "completed",
      "principal_type": "idea",
      "pilot": {
        "id": "63bb744314bd13c9def24cb4",
        "url": "https://{rest_api_root}/v2/ship/products/63bb744314bd13c9def24cb4",
        "name": "示例产品",
        "identifier": "SLC",
        "is_archived": 0,
        "is_deleted": 0
      },
      "description": "这是一个评审的描述",
      "participants": [
        {
          "id": "a0417f68e846aae315c85d24643678a9",
          "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=idea&review_id=6f168f764eba01a5278b87cd",
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
      "submitted_at": 1593290347,
      "submitted_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/avatar.png"
      },
      "completed_at": 1593291347,
      "completed_by": {
        "id": "b2417f68e846aae315c85d24643678b0",
        "url": "https://{rest_api_root}/v2/directory/users/b2417f68e846aae315c85d24643678b0",
        "name": "mary",
        "display_name": "Mary",
        "avatar": "https://s3.amazonaws.com/bucket/avatar2.png"
      },
      "created_at": 1593290347,
      "created_by": {
        "id": "a0417f68e846aae315c85d24643678a9",
        "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
        "name": "john",
        "display_name": "John",
        "avatar": "https://s3.amazonaws.com/bucket/avatar.png"
      },
      "updated_at": 1593291347,
      "updated_by": {
        "id": "b2417f68e846aae315c85d24643678b0",
        "url": "https://{rest_api_root}/v2/directory/users/b2417f68e846aae315c85d24643678b0",
        "name": "mary",
        "display_name": "Mary",
        "avatar": "https://s3.amazonaws.com/bucket/avatar2.png"
      }
    }
  ]
}
```

<a id="delete-v2-reviews-review-id"></a>

### 删除一个评审

`DELETE /v2/reviews/{review_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖评审所属主体的作用域`

用于按 id 删除一个评审。  
 需通过 principal_type 指定所属主体。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `review_id` | string | 是 | 评审的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 评审主体的类型。例如： 在 `principal_type` 为 `workitem` 时，删除工作项的评审，此时要求作用域包括 `pcp:write:pjm:project`；枚举："workitem" / "testcase" / "idea" |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 评审的 id |
| `url` | string | 是 | 评审的资源地址 |
| `short_id` | string | 是 | 评审的短 id |
| `html_url` | string | 是 | 评审的 html 地址 |
| `identifier` | number | 是 | 评审的编号 |
| `whole_identifier` | string | 是 | 评审的完整编号 |
| `title` | string | 是 | 评审的标题 |
| `state` | string | 是 | 评审的状态；枚举："pending" / "in_progress" / "completed" / "repealed" |
| `principal_type` | string | 是 | 评审主体的类型；枚举："idea" / "workitem" / "testcase" |
| `pilot` | object | 是 | 评审所在的产品、项目或测试库 |
| `pilot.id` | string |  |  |
| `pilot.url` | string |  |  |
| `pilot.name` | string |  |  |
| `pilot.identifier` | string |  |  |
| `pilot.is_archived` | number |  |  |
| `pilot.is_deleted` | number |  |  |
| `description` | string | 是 | 评审的描述 |
| `participants` | object[] | 是 | 评审的关注人列表 |
| `participants[].id` | string |  |  |
| `participants[].url` | string |  |  |
| `participants[].type` | string |  |  |
| `participants[].user` | object |  |  |
| `participants[].user.id` | string |  |  |
| `participants[].user.url` | string |  |  |
| `participants[].user.name` | string |  |  |
| `participants[].user.display_name` | string |  |  |
| `participants[].user.avatar` | string |  |  |
| `submitted_at` | number | 是 | 评审的提交时间 |
| `submitted_by` | object | 是 | 评审的提交人 |
| `completed_at` | number | 是 | 评审的完成时间 |
| `completed_by` | object | 是 | 评审的完成人 |
| `created_at` | number | 是 | 评审的创建时间 |
| `created_by` | object | 是 | 评审的创建人 |
| `created_by.id` | string |  |  |
| `created_by.url` | string |  |  |
| `created_by.name` | string |  |  |
| `created_by.display_name` | string |  |  |
| `created_by.avatar` | string |  |  |
| `updated_at` | number | 是 | 评审的更新时间 |
| `updated_by` | object | 是 | 评审的更新人 |
| `updated_by.id` | string |  |  |
| `updated_by.url` | string |  |  |
| `updated_by.name` | string |  |  |
| `updated_by.display_name` | string |  |  |
| `updated_by.avatar` | string |  |  |

**响应示例**

```json
{
  "id": "5f168f764eba01a5278b87cd",
  "url": "https://{rest_api_root}/v2/reviews/5f168f764eba01a5278b87cd?principal_type=idea",
  "short_id": "LsEy8mZF",
  "html_url": "https://yctech.pingcode.com/reviews/LsEy8mZF",
  "identifier": 5,
  "whole_identifier": "SCR-R5",
  "title": "这是一个评审",
  "state": "pending",
  "principal_type": "idea",
  "pilot": {
    "id": "63bb744314bd13c9def24cb4",
    "url": "https://{rest_api_root}/v2/ship/products/63bb744314bd13c9def24cb4",
    "name": "示例产品",
    "identifier": "SLC",
    "is_archived": 0,
    "is_deleted": 0
  },
  "description": "这是一个评审的描述",
  "participants": [
    {
      "id": "a0417f68e846aae315c85d24643678a9",
      "url": "https://{rest_api_root}/v2/participants/a0417f68e846aae315c85d24643678a9?principal_type=idea&review_id=6f168f764eba01a5278b87cd",
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
  "submitted_at": null,
  "submitted_by": null,
  "completed_at": null,
  "completed_by": null,
  "created_at": 1593290347,
  "created_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/avatar.png"
  },
  "updated_at": 1593291347,
  "updated_by": {
    "id": "a0417f68e846aae315c85d24643678a9",
    "url": "https://{rest_api_root}/v2/directory/users/a0417f68e846aae315c85d24643678a9",
    "name": "john",
    "display_name": "John",
    "avatar": "https://s3.amazonaws.com/bucket/avatar.png"
  }
}
```

<a id="post-v2-reviews-review-id-principals"></a>

### 向评审中添加一个评审内容

`POST /v2/reviews/{review_id}/principals` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖评审所属主体的作用域`

用于向评审中添加一个评审内容。  
 需通过 principal_type 指定所属主体。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `review_id` | string | 是 | 评审的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_id` | string | 是 | 评审内容的 id |
| `principal_type` | string | 是 | 评审主体的类型。例如： 在 `principal_type` 为 `workitem` 时，向工作项评审中添加评审内容，此时要求作用域包括 `pcp:write:pjm:project`；枚举："idea" / "workitem" / "testcase" |

**请求示例**

```json
{
  "principal_id": "63bb744514bd13c9def24ceb",
  "principal_type": "idea"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 评审内容的 id |
| `url` | string | 是 | 评审内容的资源地址 |
| `review` | object | 是 | 所属评审的引用结构数据 |
| `review.id` | string |  |  |
| `review.url` | string |  |  |
| `review.short_id` | string |  |  |
| `review.html_url` | string |  |  |
| `review.whole_identifier` | string |  |  |
| `review.title` | string |  |  |
| `review.state` | string |  |  |
| `review.principal_type` | string |  |  |
| `principal_type` | string | 是 | 评审内容的类型；枚举："idea" / "workitem" / "testcase" |
| `principal` | object | 是 | 评审内容的引用结构数据 |
| `principal.id` | string |  |  |
| `principal.url` | string |  |  |
| `principal.short_id` | string |  |  |
| `principal.html_url` | string |  |  |
| `principal.whole_identifier` | string |  |  |
| `principal.title` | string |  |  |

**响应示例**

```json
{
  "id": "63bb744514bd13c9def24ceb",
  "url": "https://{rest_api_root}/v2/reviews/68ccfe6b3eef8131da564e4a/principals/63bb744514bd13c9def24ceb?principal_type=idea",
  "review": {
    "id": "68ccfe6b3eef8131da564e4a",
    "url": "https://{rest_api_root}/v2/reviews/68ccfe6b3eef8131da564e4a?principal_type=idea",
    "short_id": "LK7Qy-NA",
    "html_url": "https://yctech.pingcode.com/ship/reviews/LK7Qy-NA",
    "whole_identifier": "SLC-R11",
    "title": "这是一个需求评审",
    "state": "pending",
    "principal_type": "idea"
  },
  "principal_type": "idea",
  "principal": {
    "id": "63bb744514bd13c9def24ceb",
    "url": "https://{rest_api_root}/v2/ship/ideas/63bb744514bd13c9def24ceb",
    "short_id": "Omi8PFL0",
    "html_url": "https://yctech.pingcode.com/ship/ideas/Omi8PFL0",
    "whole_identifier": "SLC-1",
    "title": "这是一个产品需求"
  }
}
```

<a id="get-v2-reviews-review-id-principals-principal-id"></a>

### 获取评审中的一个评审内容

`GET /v2/reviews/{review_id}/principals/{principal_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖评审所属主体的作用域`

用于查看评审中的一个评审内容。  
 需通过 principal_type 指定所属主体。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `review_id` | string | 是 | 评审的 id |
| `principal_id` | string | 是 | 评审内容的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 评审主体的类型。例如： 在 `principal_type` 为 `workitem` 时，获取工作项评审中的评审内容，此时要求作用域包括 `pcp:read:pjm:project`；枚举："workitem" / "testcase" / "idea" |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 评审内容的 id |
| `url` | string | 是 | 评审内容的资源地址 |
| `review` | object | 是 | 所属评审的引用结构数据 |
| `review.id` | string |  |  |
| `review.url` | string |  |  |
| `review.short_id` | string |  |  |
| `review.html_url` | string |  |  |
| `review.whole_identifier` | string |  |  |
| `review.title` | string |  |  |
| `review.state` | string |  |  |
| `review.principal_type` | string |  |  |
| `principal_type` | string | 是 | 评审内容的类型；枚举："idea" / "workitem" / "testcase" |
| `principal` | object | 是 | 评审内容的引用结构数据 |
| `principal.id` | string |  |  |
| `principal.url` | string |  |  |
| `principal.short_id` | string |  |  |
| `principal.html_url` | string |  |  |
| `principal.whole_identifier` | string |  |  |
| `principal.title` | string |  |  |

**响应示例**

```json
{
  "id": "63bb744514bd13c9def24ceb",
  "url": "https://{rest_api_root}/v2/reviews/68ccfe6b3eef8131da564e4a/principals/63bb744514bd13c9def24ceb?principal_type=idea",
  "review": {
    "id": "68ccfe6b3eef8131da564e4a",
    "url": "https://{rest_api_root}/v2/reviews/68ccfe6b3eef8131da564e4a?principal_type=idea",
    "short_id": "LK7Qy-NA",
    "html_url": "https://yctech.pingcode.com/ship/reviews/LK7Qy-NA",
    "whole_identifier": "SLC-R11",
    "title": "这是一个需求评审",
    "state": "pending",
    "principal_type": "idea"
  },
  "principal_type": "idea",
  "principal": {
    "id": "63bb744514bd13c9def24ceb",
    "url": "https://{rest_api_root}/v2/ship/ideas/63bb744514bd13c9def24ceb",
    "short_id": "Omi8PFL0",
    "html_url": "https://yctech.pingcode.com/ship/ideas/Omi8PFL0",
    "whole_identifier": "SLC-1",
    "title": "这是一个产品需求"
  }
}
```

<a id="get-v2-reviews-review-id-principals"></a>

### 获取评审中的评审内容列表

`GET /v2/reviews/{review_id}/principals` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖评审所属主体的作用域`

用于分页获取评审中的评审内容列表。  
 需通过 principal_type 指定所属主体。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `review_id` | string | 是 | 评审的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 评审主体的类型。例如： 在 `principal_type` 为 `workitem` 时，获取工作项评审中的评审内容列表，此时要求作用域包括 `pcp:read:pjm:project`；枚举："workitem" / "testcase" / "idea" |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 评审内容全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].review` | object |  |  |
| `values[].review.id` | string |  |  |
| `values[].review.url` | string |  |  |
| `values[].review.short_id` | string |  |  |
| `values[].review.html_url` | string |  |  |
| `values[].review.whole_identifier` | string |  |  |
| `values[].review.title` | string |  |  |
| `values[].review.state` | string |  |  |
| `values[].review.principal_type` | string |  |  |
| `values[].principal_type` | string |  |  |
| `values[].principal` | object |  |  |
| `values[].principal.id` | string |  |  |
| `values[].principal.url` | string |  |  |
| `values[].principal.short_id` | string |  |  |
| `values[].principal.html_url` | string |  |  |
| `values[].principal.whole_identifier` | string |  |  |
| `values[].principal.title` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "63bb744514bd13c9def24ceb",
      "url": "https://{rest_api_root}/v2/reviews/68ccfe6b3eef8131da564e4a/principals/63bb744514bd13c9def24ceb?principal_type=idea",
      "review": {
        "id": "68ccfe6b3eef8131da564e4a",
        "url": "https://{rest_api_root}/v2/reviews/68ccfe6b3eef8131da564e4a?principal_type=idea",
        "short_id": "LK7Qy-NA",
        "html_url": "https://yctech.pingcode.com/ship/reviews/LK7Qy-NA",
        "whole_identifier": "SLC-R11",
        "title": "这是一个需求评审",
        "state": "pending",
        "principal_type": "idea"
      },
      "principal_type": "idea",
      "principal": {
        "id": "63bb744514bd13c9def24ceb",
        "url": "https://{rest_api_root}/v2/ship/ideas/63bb744514bd13c9def24ceb",
        "short_id": "Omi8PFL0",
        "html_url": "https://yctech.pingcode.com/ship/ideas/Omi8PFL0",
        "whole_identifier": "SLC-1",
        "title": "这是一个产品需求"
      }
    }
  ]
}
```

<a id="delete-v2-reviews-review-id-principals-principal-id"></a>

### 在评审中移除一个评审内容

`DELETE /v2/reviews/{review_id}/principals/{principal_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖评审所属主体的作用域`

用于从评审中移除一个评审内容。  
 需通过 principal_type 指定所属主体。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `review_id` | string | 是 | 评审的 id |
| `principal_id` | string | 是 | 评审内容的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `principal_type` | string | 是 | 评审主体的类型。例如： 在 `principal_type` 为 `workitem` 时，在工作项评审中移除评审内容，此时要求作用域包括 `pcp:write:pjm:project`；枚举："workitem" / "testcase" / "idea" |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 评审内容的 id |
| `url` | string | 是 | 评审内容的资源地址 |
| `review` | object | 是 | 所属评审的引用结构数据 |
| `review.id` | string |  |  |
| `review.url` | string |  |  |
| `review.short_id` | string |  |  |
| `review.html_url` | string |  |  |
| `review.whole_identifier` | string |  |  |
| `review.title` | string |  |  |
| `review.state` | string |  |  |
| `review.principal_type` | string |  |  |
| `principal_type` | string | 是 | 评审内容的类型；枚举："idea" / "workitem" / "testcase" |
| `principal` | object | 是 | 评审内容的引用结构数据 |
| `principal.id` | string |  |  |
| `principal.url` | string |  |  |
| `principal.short_id` | string |  |  |
| `principal.html_url` | string |  |  |
| `principal.whole_identifier` | string |  |  |
| `principal.title` | string |  |  |

**响应示例**

```json
{
  "id": "63bb744514bd13c9def24ceb",
  "url": "https://{rest_api_root}/v2/reviews/68ccfe6b3eef8131da564e4a/principals/63bb744514bd13c9def24ceb?principal_type=idea",
  "review": {
    "id": "68ccfe6b3eef8131da564e4a",
    "url": "https://{rest_api_root}/v2/reviews/68ccfe6b3eef8131da564e4a?principal_type=idea",
    "short_id": "LK7Qy-NA",
    "html_url": "https://yctech.pingcode.com/ship/reviews/LK7Qy-NA",
    "whole_identifier": "SLC-R11",
    "title": "这是一个需求评审",
    "state": "pending",
    "principal_type": "idea"
  },
  "principal_type": "idea",
  "principal": {
    "id": "63bb744514bd13c9def24ceb",
    "url": "https://{rest_api_root}/v2/ship/ideas/63bb744514bd13c9def24ceb",
    "short_id": "Omi8PFL0",
    "html_url": "https://yctech.pingcode.com/ship/ideas/Omi8PFL0",
    "whole_identifier": "SLC-1",
    "title": "这是一个产品需求"
  }
}
```

## 类别与分组

> 分组路径：全局 / 通用 / 类别与分组

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/categories` | [创建一个类别](#post-v2-categories) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/categories/{category_id}` | [获取一个类别](#get-v2-categories-category-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/categories/{category_id}` | [部分更新一个类别](#patch-v2-categories-category-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/categories` | [获取类别列表](#get-v2-categories) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/categories/{category_id}` | [删除一个类别](#delete-v2-categories-category-id) | 企业令牌 / 用户令牌 |
| `POST` | `/v2/sections` | [创建一个分组](#post-v2-sections) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/sections/{section_id}` | [获取一个分组](#get-v2-sections-section-id) | 企业令牌 / 用户令牌 |
| `PATCH` | `/v2/sections/{section_id}` | [部分更新一个分组](#patch-v2-sections-section-id) | 企业令牌 / 用户令牌 |
| `GET` | `/v2/sections` | [获取分组列表](#get-v2-sections) | 企业令牌 / 用户令牌 |
| `DELETE` | `/v2/sections/{section_id}` | [删除一个分组](#delete-v2-sections-section-id) | 企业令牌 / 用户令牌 |

<a id="post-v2-categories"></a>

### 创建一个类别

`POST /v2/categories` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖 entity_type 对应的作用域`

用于创建一个类别。  
 需通过 entity_type 指定类别所属实体类型。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_type` | string | 是 | 类别所属实体类型。例如： 在 `entity_type` 为 `sprint` 时，创建迭代的类别，此时要求作用域包括 `pcp:write:pjm:sprint`；枚举："sprint" / "release" / "testplan" / "project" / "library" / "product" |
| `pilot_id` | string |  | 类别所在的产品、项目或测试库的 id。仅 `entity_type` 为 `sprint`、`release` 或 `testplan` 时有效且必填 |
| `name` | string | 是 | 类别的名称 |
| `section_id` | string |  | 类别所属分组 id。仅 `entity_type` 为 `sprint`、`release` 或 `testplan` 时有效 |

**请求示例**

```json
{
  "entity_type": "sprint",
  "pilot_id": "5eb623f6a70571487ea47000",
  "name": "Category 1",
  "section_id": "634f869a0fd987b7ea320833"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 类别的 id |
| `url` | string | 是 | 类别的地址 |
| `pilot` | object |  | 类别所在的产品、项目或测试库的引用结构数据。仅 `entity_type` 为 `sprint`、`release` 或 `testplan` 时返回 |
| `pilot.id` | string |  |  |
| `pilot.url` | string |  |  |
| `pilot.identifier` | string |  |  |
| `pilot.name` | string |  |  |
| `pilot.template_type` | string |  |  |
| `pilot.is_archived` | number |  |  |
| `pilot.is_deleted` | number |  |  |
| `name` | string | 是 | 类别的名称 |
| `section` | object |  | 所属分组的引用结构数据 |
| `section.id` | string |  |  |
| `section.url` | string |  |  |
| `section.name` | string |  |  |

**响应示例**

```json
{
  "id": "676a460a0fd987b7ea320887",
  "url": "https://{rest_api_root}/v2/categories/676a460a0fd987b7ea320887?entity_type=sprint",
  "pilot": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "template_type": "scrum",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "Category 1",
  "section": {
    "id": "634f869a0fd987b7ea320833",
    "url": "https://{rest_api_root}/v2/sections/634f869a0fd987b7ea320833?entity_type=sprint",
    "name": "Section 1"
  }
}
```

<a id="get-v2-categories-category-id"></a>

### 获取一个类别

`GET /v2/categories/{category_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖 entity_type 对应的作用域`

用于按 id 获取类别全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `category_id` | string | 是 | 类别的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_type` | string | 是 | 类别所属实体类型。例如： 在 `entity_type` 为 `sprint` 时，获取迭代的类别，此时要求作用域包括 `pcp:read:pjm:sprint`；枚举："sprint" / "release" / "testplan" / "project" / "library" / "product" |

**响应**

源文档未提供响应结构。

<a id="patch-v2-categories-category-id"></a>

### 部分更新一个类别

`PATCH /v2/categories/{category_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖 entity_type 对应的作用域`

用于部分更新一个类别。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `category_id` | string | 是 | 类别的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_type` | string | 是 | 类别所属实体类型。例如： 在 `entity_type` 为 `sprint` 时，更新迭代的类别，此时要求作用域包括 `pcp:write:pjm:sprint`；枚举："sprint" / "release" / "testplan" / "project" / "library" / "product" |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 类别的名称 |
| `section_id` | string |  | 类别所属分组 id。仅 `entity_type` 为 `sprint`、`release` 或 `testplan` 时有效 |

**响应**

源文档未提供响应结构。

<a id="get-v2-categories"></a>

### 获取类别列表

`GET /v2/categories` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖 entity_type 对应的作用域`

用于分页获取指定实体类型的类别列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_type` | string | 是 | 类别所属实体类型。例如： 在 `entity_type` 为 `sprint` 时，获取迭代的类别，此时要求作用域包括 `pcp:read:pjm:sprint`；枚举："sprint" / "release" / "testplan" / "project" / "library" / "product" |
| `pilot_id` | string |  | 类别所在的产品、项目或测试库的 id。仅 `entity_type` 为 `sprint`、`release` 或 `testplan` 时有效且必填 |

**响应**

源文档未提供响应结构。

<a id="delete-v2-categories-category-id"></a>

### 删除一个类别

`DELETE /v2/categories/{category_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖 entity_type 对应的作用域`

用于按 id 删除一个类别。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `category_id` | string | 是 | 类别的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_type` | string | 是 | 类别所属实体类型。例如： 在 `entity_type` 为 `sprint` 时，删除迭代的类别，此时要求作用域包括 `pcp:write:pjm:sprint`；枚举："sprint" / "release" / "testplan" / "project" / "library" / "product" |

**响应**

源文档未提供响应结构。

<a id="post-v2-sections"></a>

### 创建一个分组

`POST /v2/sections` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖 entity_type 对应的作用域`

用于创建一个分组。  
 需通过 entity_type 指定分组所属实体类型。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_type` | string | 是 | 分组所属实体类型。例如： 在 `entity_type` 为 `sprint` 时，创建迭代的分组，此时要求作用域包括 `pcp:write:pjm:sprint`；枚举："sprint" / "release" / "testplan" |
| `pilot_id` | string | 是 | 分组所在的产品、项目或测试库的 id |
| `name` | string | 是 | 分组的名称 |

**请求示例**

```json
{
  "entity_type": "sprint",
  "pilot_id": "5eb623f6a70571487ea47000",
  "name": "Section 1"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 分组的 id |
| `url` | string | 是 | 分组的地址 |
| `pilot` | object | 是 | 分组所在的产品、项目或测试库的引用结构数据 |
| `pilot.id` | string |  |  |
| `pilot.url` | string |  |  |
| `pilot.identifier` | string |  |  |
| `pilot.name` | string |  |  |
| `pilot.template_type` | string |  |  |
| `pilot.is_archived` | number |  |  |
| `pilot.is_deleted` | number |  |  |
| `name` | string | 是 | 分组的名称 |

**响应示例**

```json
{
  "id": "634f869a0fd987b7ea320833",
  "url": "https://{rest_api_root}/v2/sections/634f869a0fd987b7ea320833?entity_type=sprint",
  "pilot": {
    "id": "5eb623f6a70571487ea47000",
    "url": "https://{rest_api_root}/v2/pjm/projects/5eb623f6a70571487ea47000",
    "identifier": "SCR",
    "name": "Scrum 项目",
    "template_type": "scrum",
    "is_archived": 0,
    "is_deleted": 0
  },
  "name": "Section 1"
}
```

<a id="get-v2-sections-section-id"></a>

### 获取一个分组

`GET /v2/sections/{section_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖 entity_type 对应的作用域`

用于按 id 获取分组全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `section_id` | string | 是 | 分组的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_type` | string | 是 | 分组所属实体类型。例如： 在 `entity_type` 为 `sprint` 时，获取迭代的分组，此时要求作用域包括 `pcp:read:pjm:sprint`；枚举："sprint" / "release" / "testplan" |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 分组的 id |
| `url` | string | 是 | 分组的地址 |
| `pilot` | object | 是 | 分组所在的产品、项目或测试库的引用结构数据 |
| `name` | string | 是 | 分组的名称 |

<a id="patch-v2-sections-section-id"></a>

### 部分更新一个分组

`PATCH /v2/sections/{section_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖 entity_type 对应的作用域`

用于部分更新一个分组。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `section_id` | string | 是 | 分组的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_type` | string | 是 | 分组所属实体类型。例如： 在 `entity_type` 为 `sprint` 时，更新迭代的分组，此时要求作用域包括 `pcp:write:pjm:sprint`；枚举："sprint" / "release" / "testplan" |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 分组的名称 |

**请求示例**

```json
{
  "name": "Section 1"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 分组的 id |
| `url` | string | 是 | 分组的地址 |
| `pilot` | object | 是 | 分组所在的产品、项目或测试库的引用结构数据 |
| `name` | string | 是 | 分组的名称 |

<a id="get-v2-sections"></a>

### 获取分组列表

`GET /v2/sections` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖 entity_type 对应的作用域`

用于分页获取某 Pilot 下指定实体类型的分组。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_type` | string | 是 | 分组所属实体类型。例如： 在 `entity_type` 为 `sprint` 时，获取迭代的分组，此时要求作用域包括 `pcp:read:pjm:sprint`；枚举："sprint" / "release" / "testplan" |
| `pilot_id` | string | 是 | 分组所在的产品、项目或测试库的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 分组全量结构数据的数组 |

<a id="delete-v2-sections-section-id"></a>

### 删除一个分组

`DELETE /v2/sections/{section_id}` ｜ 令牌：企业令牌 / 用户令牌 ｜ Scope：`依赖 entity_type 对应的作用域`

用于按 id 删除一个分组。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `section_id` | string | 是 | 分组的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `entity_type` | string | 是 | 分组所属实体类型。例如： 在 `entity_type` 为 `sprint` 时，删除迭代的分组，此时要求作用域包括 `pcp:write:pjm:sprint`；枚举："sprint" / "release" / "testplan" |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 分组的 id |
| `url` | string | 是 | 分组的地址 |
| `pilot` | object | 是 | 分组所在的产品、项目或测试库的引用结构数据 |
| `name` | string | 是 | 分组的名称 |
