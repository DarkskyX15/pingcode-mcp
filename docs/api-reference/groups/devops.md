# DevOps_数据集成

> 区域 `devops`（DevOps_数据集成） ｜ 11 个内容分组 ｜ 54 个端点

[← 返回 API 总览](../README.md)

## 托管平台

> 分组路径：DevOps_数据集成 / 代码 / 托管平台

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/devops/products` | [创建一个托管平台](#post-v2-devops-products) | 企业令牌 |
| `GET` | `/v2/devops/products/{product_id}` | [获取一个托管平台](#get-v2-devops-products-product-id) | 企业令牌 |
| `PUT` | `/v2/devops/products/{product_id}` | [全量更新一个托管平台](#put-v2-devops-products-product-id) | 企业令牌 |
| `PATCH` | `/v2/devops/products/{product_id}` | [部分更新一个托管平台](#patch-v2-devops-products-product-id) | 企业令牌 |
| `GET` | `/v2/devops/products` | [获取托管平台列表](#get-v2-devops-products) | 企业令牌 |

<a id="post-v2-devops-products"></a>

### 创建一个托管平台

`POST /v2/devops/products` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于创建一个托管平台。  
 企业内实际的代码托管平台，例如 Github 或私有部署的 Gitlab。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 代码托管平台的名称，在一个企业中这个名称是唯一的 |
| `type` | string | 是 | 代码托管平台的产品类型，主要用于显示图标；枚举："github" / "gitlab" / "bitbucket" / "coding.net" / "gogs" / "git" / "svn" / "gerrit" / "other" |
| `description` | string |  | 代码托管平台的简介 |

**请求示例**

```json
{
  "name": "Github",
  "type": "github",
  "description": "Github 公有云"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 托管平台的 id |
| `url` | string | 是 | 托管平台的资源地址 |
| `name` | string | 是 | 托管平台的名称 |
| `type` | string | 是 | 托管平台的类型；枚举："github" / "gitlab" / "bitbucket" / "coding.net" / "gogs" / "git" / "svn" / "gerrit" / "other" |
| `description` | string | 是 | 托管平台的描述 |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080765",
  "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
  "name": "Github",
  "type": "github",
  "description": "Github 公有云"
}
```

<a id="get-v2-devops-products-product-id"></a>

### 获取一个托管平台

`GET /v2/devops/products/{product_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:code`

用于按 id 获取托管平台全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 托管平台的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 托管平台的 id |
| `url` | string | 是 | 托管平台的资源地址 |
| `name` | string | 是 | 托管平台的名称 |
| `type` | string | 是 | 托管平台的类型；枚举："github" / "gitlab" / "bitbucket" / "coding.net" / "gogs" / "git" / "svn" / "gerrit" / "other" |
| `description` | string | 是 | 托管平台的描述 |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080765",
  "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
  "name": "Github",
  "type": "github",
  "description": "Github 公有云"
}
```

<a id="put-v2-devops-products-product-id"></a>

### 全量更新一个托管平台

`PUT /v2/devops/products/{product_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于全量更新一个托管平台。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 代码托管平台的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 代码托管平台的名称，在一个企业中这个名称是唯一的 |
| `type` | string | 是 | 代码托管平台的产品类型，主要用于显示图标；枚举："github" / "gitlab" / "bitbucket" / "coding.net" / "gogs" / "git" / "svn" / "gerrit" / "other" |
| `description` | string |  | 代码托管平台简介 |

**请求示例**

```json
{
  "name": "Github",
  "type": "github",
  "description": "Github 公有云"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 托管平台的 id |
| `url` | string | 是 | 托管平台的资源地址 |
| `name` | string | 是 | 托管平台的名称 |
| `type` | string | 是 | 托管平台的类型；枚举："github" / "gitlab" / "bitbucket" / "coding.net" / "gogs" / "git" / "svn" / "gerrit" / "other" |
| `description` | string | 是 | 托管平台的描述 |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080765",
  "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
  "name": "Github",
  "type": "github",
  "description": "Github 公有云"
}
```

<a id="patch-v2-devops-products-product-id"></a>

### 部分更新一个托管平台

`PATCH /v2/devops/products/{product_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于部分更新一个托管平台。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 代码托管平台的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 代码托管平台的名称，在一个企业中这个名称是唯一的 |
| `type` | string |  | 代码托管平台的产品类型，主要用于显示图标；枚举："github" / "gitlab" / "bitbucket" / "coding.net" / "gogs" / "git" / "svn" / "gerrit" / "other" |
| `description` | string |  | 代码托管平台简介 |

**请求示例**

```json
{
  "name": "Github",
  "type": "github",
  "description": "Github 公有云"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 托管平台的 id |
| `url` | string | 是 | 托管平台的资源地址 |
| `name` | string | 是 | 托管平台的名称 |
| `type` | string | 是 | 托管平台的类型；枚举："github" / "gitlab" / "bitbucket" / "coding.net" / "gogs" / "git" / "svn" / "gerrit" / "other" |
| `description` | string | 是 | 托管平台的描述 |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080765",
  "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
  "name": "Github",
  "type": "github",
  "description": "Github 公有云"
}
```

<a id="get-v2-devops-products"></a>

### 获取托管平台列表

`GET /v2/devops/products` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:code`

用于分页获取托管平台列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 代码托管平台的名称 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 托管平台全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].name` | string |  |  |
| `values[].type` | string |  |  |
| `values[].description` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "564587fe700d43b81b080765",
      "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
      "name": "Github",
      "type": "github",
      "description": "Github 公有云"
    }
  ]
}
```

## 托管平台用户

> 分组路径：DevOps_数据集成 / 代码 / 托管平台用户

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/devops/users` | [创建一个托管平台用户](#post-v2-devops-users) | 企业令牌 |
| `GET` | `/v2/devops/users/{user_id}` | [获取一个托管平台用户](#get-v2-devops-users-user-id) | 企业令牌 |
| `PUT` | `/v2/devops/users/{user_id}` | [全量更新一个托管平台用户](#put-v2-devops-users-user-id) | 企业令牌 |
| `PATCH` | `/v2/devops/users/{user_id}` | [部分更新一个托管平台用户](#patch-v2-devops-users-user-id) | 企业令牌 |
| `GET` | `/v2/devops/users` | [获取托管平台用户列表](#get-v2-devops-users) | 企业令牌 |

<a id="post-v2-devops-users"></a>

### 创建一个托管平台用户

`POST /v2/devops/users` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于创建一个托管平台用户。  
 代码托管平台内实际的用户，用于在 PingCode 中显示该用户在代码托管平台上的名称、头像以及主页的信息。如果没有手动创建用户，在操作代码仓库、分支、拉取请求时，将自动创建仅包含该用户名的用户。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 代码托管平台的 id |
| `name` | string | 是 | 代码托管平台上的用户名，同一代码托管平台下，该用户名是唯一的 |
| `display_name` | string |  | 用户显示名 |
| `html_url` | string |  | 代码托管平台上的用户主页地址 |
| `avatar_url` | string |  | 代码托管平台上的用户头像地址 |

**请求示例**

```json
{
  "product_id": "564587fe700d43b81b080765",
  "name": "terry",
  "display_name": "Terry",
  "html_url": "https://github.com/terrylee",
  "avatar_url": "https://avatars2.githubusercontent.com/u/694592?v=4"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 托管平台用户的 id |
| `url` | string | 是 | 托管平台用户的资源地址 |
| `html_url` | string | 是 | 代码托管平台上的用户主页地址 |
| `product` | object | 是 | 托管平台的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.type` | string |  |  |
| `name` | string | 是 | 托管平台用户的名称 |
| `display_name` | string | 是 | 托管平台用户的显示名 |
| `avatar_url` | string | 是 | 代码托管平台上的用户头像地址 |

**响应示例**

```json
{
  "id": "5666aea91f99e33cb7c44964",
  "url": "https://{rest_api_root}/v2/devops/users/5666aea91f99e33cb7c44964",
  "html_url": "https://github.com/terrylee",
  "product": {
    "id": "564587fe700d43b81b080765",
    "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
    "name": "Github",
    "type": "github"
  },
  "name": "terry",
  "display_name": "Terry",
  "avatar_url": "https://avatars2.githubusercontent.com/u/694592?v=4"
}
```

<a id="get-v2-devops-users-user-id"></a>

### 获取一个托管平台用户

`GET /v2/devops/users/{user_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:code`

用于按 id 获取托管平台用户全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `user_id` | string | 是 | 托管平台用户的 id |

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 托管平台的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 托管平台用户的 id |
| `url` | string | 是 | 托管平台用户的资源地址 |
| `html_url` | string | 是 | 代码托管平台上的用户主页地址 |
| `product` | object | 是 | 托管平台 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.type` | string |  |  |
| `name` | string | 是 | 托管平台用户的名称 |
| `display_name` | string | 是 | 托管平台用户的显示名 |
| `avatar_url` | string | 是 | 代码托管平台上的用户头像地址 |

**响应示例**

```json
{
  "id": "5666aea91f99e33cb7c44964",
  "url": "https://{rest_api_root}/v2/devops/users/5666aea91f99e33cb7c44964",
  "html_url": "https://github.com/terrylee",
  "product": {
    "id": "564587fe700d43b81b080765",
    "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
    "name": "Github",
    "type": "github"
  },
  "name": "terry",
  "display_name": "Terry",
  "avatar_url": "https://avatars2.githubusercontent.com/u/694592?v=4"
}
```

<a id="put-v2-devops-users-user-id"></a>

### 全量更新一个托管平台用户

`PUT /v2/devops/users/{user_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于全量更新一个托管平台用户。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `user_id` | string | 是 | 托管平台用户的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 代码托管平台的 id |
| `name` | string | 是 | 代码托管平台上的用户名，同一代码托管平台下，该用户名是唯一的 |
| `display_name` | string |  | 用户显示名 |
| `html_url` | string |  | 代码托管平台上的用户主页地址 |
| `avatar_url` | string |  | 代码托管平台上的用户头像地址 |

**请求示例**

```json
{
  "product_id": "564587fe700d43b81b080765",
  "name": "terry",
  "display_name": "Terry",
  "html_url": "https://github.com/terrylee",
  "avatar_url": "https://avatars2.githubusercontent.com/u/694592?v=4"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 托管平台用户的 id |
| `url` | string | 是 | 托管平台用户的资源地址 |
| `html_url` | string | 是 | 代码托管平台上的用户主页地址 |
| `product` | object | 是 | 托管平台的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.type` | string |  |  |
| `name` | string | 是 | 托管平台用户的名称 |
| `display_name` | string | 是 | 托管平台用户的显示名 |
| `avatar_url` | string | 是 | 代码托管平台上的用户头像地址 |

**响应示例**

```json
{
  "id": "5666aea91f99e33cb7c44964",
  "url": "https://{rest_api_root}/v2/devops/users/5666aea91f99e33cb7c44964",
  "html_url": "https://github.com/terrylee",
  "product": {
    "id": "564587fe700d43b81b080765",
    "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
    "name": "Github",
    "type": "github"
  },
  "name": "terry",
  "display_name": "Terry",
  "avatar_url": "https://avatars2.githubusercontent.com/u/694592?v=4"
}
```

<a id="patch-v2-devops-users-user-id"></a>

### 部分更新一个托管平台用户

`PATCH /v2/devops/users/{user_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于部分更新一个托管平台用户。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `user_id` | string | 是 | 托管平台用户的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 代码托管平台的 id |
| `name` | string |  | 代码托管平台上的用户名，同一代码托管平台下，该用户名是唯一的 |
| `display_name` | string |  | 用户显示名 |
| `html_url` | string |  | 代码托管平台上的用户主页地址 |
| `avatar_url` | string |  | 代码托管平台上的用户头像地址 |

**请求示例**

```json
{
  "product_id": "564587fe700d43b81b080765",
  "name": "terry",
  "display_name": "Terry",
  "html_url": "https://github.com/terrylee",
  "avatar_url": "https://avatars2.githubusercontent.com/u/694592?v=4"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 托管平台用户的 id |
| `url` | string | 是 | 托管平台用户的资源地址 |
| `html_url` | string | 是 | 代码托管平台上的用户主页地址 |
| `product` | object | 是 | 托管平台的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.type` | string |  |  |
| `name` | string | 是 | 托管平台用户的名称 |
| `display_name` | string | 是 | 托管平台用户的显示名 |
| `avatar_url` | string | 是 | 代码托管平台上的用户头像地址 |

**响应示例**

```json
{
  "id": "5666aea91f99e33cb7c44964",
  "url": "https://{rest_api_root}/v2/devops/users/5666aea91f99e33cb7c44964",
  "html_url": "https://github.com/terrylee",
  "product": {
    "id": "564587fe700d43b81b080765",
    "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
    "name": "Github",
    "type": "github"
  },
  "name": "terry",
  "display_name": "Terry",
  "avatar_url": "https://avatars2.githubusercontent.com/u/694592?v=4"
}
```

<a id="get-v2-devops-users"></a>

### 获取托管平台用户列表

`GET /v2/devops/users` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:code`

用于分页获取托管平台用户列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 代码托管平台的 id |
| `name` | string |  | 用户名 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 托管平台用户全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].html_url` | string |  |  |
| `values[].product` | object |  |  |
| `values[].product.id` | string |  |  |
| `values[].product.url` | string |  |  |
| `values[].product.name` | string |  |  |
| `values[].product.type` | string |  |  |
| `values[].name` | string |  |  |
| `values[].display_name` | string |  |  |
| `values[].avatar_url` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5666aea91f99e33cb7c44964",
      "url": "https://{rest_api_root}/v2/devops/users/5666aea91f99e33cb7c44964",
      "html_url": "https://github.com/terrylee",
      "product": {
        "id": "564587fe700d43b81b080765",
        "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
        "name": "Github",
        "type": "github"
      },
      "name": "terry",
      "display_name": "Terry",
      "avatar_url": "https://avatars2.githubusercontent.com/u/694592?v=4"
    }
  ]
}
```

## 代码仓库

> 分组路径：DevOps_数据集成 / 代码 / 代码仓库

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/devops/repos` | [创建一个代码仓库](#post-v2-devops-repos) | 企业令牌 |
| `GET` | `/v2/devops/repos/{repo_id}` | [获取一个代码仓库](#get-v2-devops-repos-repo-id) | 企业令牌 |
| `PUT` | `/v2/devops/repos/{repo_id}` | [全量更新一个代码仓库](#put-v2-devops-repos-repo-id) | 企业令牌 |
| `PATCH` | `/v2/devops/repos/{repo_id}` | [部分更新一个代码仓库](#patch-v2-devops-repos-repo-id) | 企业令牌 |
| `GET` | `/v2/devops/repos` | [获取代码仓库列表](#get-v2-devops-repos) | 企业令牌 |

<a id="post-v2-devops-repos"></a>

### 创建一个代码仓库

`POST /v2/devops/repos` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于创建一个代码仓库。  
 代码托管平台内实际的代码仓库，用于在 PingCode 中显示代码仓库的详细信息。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 代码托管平台的 id |
| `name` | string | 是 | 代码仓库的名称 |
| `full_name` | string | 是 | 代码仓库的全称。同一代码托管平台下，代码仓库的全称是唯一的 |
| `description` | string |  | 代码仓库的简介 |
| `is_fork` | boolean |  | 是否是 fork 仓库 |
| `is_private` | boolean |  | 是否是私有仓库 |
| `owner_name` | string |  | 代码仓库拥有者的用户名 |
| `html_url` | string |  | 代码仓库的地址。如果为空，在 PingCode 中不显示相关跳转链接 |
| `branches_url` | string |  | 代码仓库的分支地址，使用 `{branch}` 表示分支名。如果为空，在 PingCode 中不显示相关跳转链接 |
| `commits_url` | string |  | 代码仓库的提交地址，使用 `{sha}` 表示提交的 SHA 值。如果为空，在 PingCode 中不显示相关跳转链接 |
| `compare_url` | string |  | 代码仓库的分支对比地址，使用 `{base}` 和 `{head}` 表示基准分支名和需要进行对比的分支名。如果为空，在 PingCode 中不显示相关跳转链接 |
| `pulls_url` | string |  | 代码仓库的拉取请求地址，使用 `{number}` 表示拉取请求的编号。如果为空，在 PingCode 中不显示相关跳转链接 |

**请求示例**

```json
{
  "product_id": "564587fe700d43b81b080765",
  "name": "ngx-planet",
  "full_name": "worktile/ngx-planet",
  "description": "A powerful, reliable, fully-featured and production ready Micro Frontend library for Angular",
  "is_fork": false,
  "is_private": false,
  "owner_name": "terry",
  "html_url": "https://github.com/worktile/ngx-planet",
  "branches_url": "https://github.com/worktile/ngx-planet/tree/{branch}",
  "commits_url": "https://github.com/worktile/ngx-planet/commit/{sha}",
  "compare_url": "https://github.com/worktile/ngx-planet/compare/{base}...{head}",
  "pulls_url": "https://github.com/worktile/ngx-planet/pull/{number}"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 代码仓库的 id |
| `url` | string | 是 | 代码仓库的资源地址 |
| `html_url` | string | 是 | 代码仓库的地址 |
| `product` | object | 是 | 托管平台的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.type` | string |  |  |
| `name` | string | 是 | 代码仓库的名称 |
| `full_name` | string | 是 | 代码仓库的全称 |
| `created_at` | number | 是 | 代码仓库的创建时间 |
| `owner` | object | 是 | 代码仓库拥有者的引用结构数据 |
| `owner.id` | string |  |  |
| `owner.url` | string |  |  |
| `owner.name` | string |  |  |
| `is_fork` | boolean | 是 | 代码仓库是否是 fork 仓库 |
| `is_private` | boolean | 是 | 代码仓库是否是私有仓库 |
| `description` | string | 是 | 代码仓库的描述 |
| `branches_url` | string | 是 | 代码仓库的分支地址模板 |
| `commits_url` | string | 是 | 代码仓库的提交地址模板 |
| `compare_url` | string | 是 | 代码仓库的分支对比地址模板 |
| `pulls_url` | string | 是 | 代码仓库的拉取请求地址模板 |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080766",
  "url": "https://{rest_api_root}/v2/devops/repos/564587fe700d43b81b080766",
  "html_url": "https://github.com/worktile/ngx-planet",
  "product": {
    "id": "564587fe700d43b81b080765",
    "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
    "name": "Github",
    "type": "github"
  },
  "name": "ngx-planet",
  "full_name": "worktile/ngx-planet",
  "created_at": 1403018919,
  "owner": {
    "id": "5666aea91f99e33cb7c44964",
    "url": "https://{rest_api_root}/v2/devops/users/5666aea91f99e33cb7c44964",
    "name": "terry"
  },
  "is_fork": false,
  "is_private": false,
  "description": "A powerful, reliable, fully-featured and production ready Micro Frontend library for Angular",
  "branches_url": "https://github.com/worktile/ngx-planet/tree/{branch}",
  "commits_url": "https://github.com/worktile/ngx-planet/commit/{sha}",
  "compare_url": "https://github.com/worktile/ngx-planet/compare/{base}...{head}",
  "pulls_url": "https://github.com/worktile/ngx-planet/pull/{number}"
}
```

<a id="get-v2-devops-repos-repo-id"></a>

### 获取一个代码仓库

`GET /v2/devops/repos/{repo_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:code`

用于按 id 获取代码仓库全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `repo_id` | string | 是 | 代码仓库的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 代码仓库的 id |
| `url` | string | 是 | 代码仓库的资源地址 |
| `html_url` | string | 是 | 代码仓库的地址 |
| `product` | object | 是 | 托管平台 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.type` | string |  |  |
| `name` | string | 是 | 代码仓库的名称 |
| `full_name` | string | 是 | 代码仓库的全称 |
| `created_at` | number | 是 | 代码仓库的创建时间 |
| `owner` | object | 是 | 代码仓库的拥有者 |
| `owner.id` | string |  |  |
| `owner.url` | string |  |  |
| `owner.name` | string |  |  |
| `is_fork` | boolean | 是 | 代码仓库是否是 fork 仓库 |
| `is_private` | boolean | 是 | 代码仓库是否是私有仓库 |
| `description` | string | 是 | 代码仓库的描述 |
| `branches_url` | string | 是 | 代码仓库的分支地址模板，链接后面括号里的值会被替换成真实地址 |
| `commits_url` | string | 是 | 代码仓库的提交地址模板，链接后面括号里的值会被替换成真实地址 |
| `compare_url` | string | 是 | 代码仓库的分支对比地址模板，链接后面括号里的值会被替换成真实地址 |
| `pulls_url` | string | 是 | 代码仓库的拉取请求地址模板，链接后面括号里的值会被替换成真实地址 |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080766",
  "url": "https://{rest_api_root}/v2/devops/repos/564587fe700d43b81b080766",
  "html_url": "https://github.com/worktile/ngx-planet",
  "product": {
    "id": "564587fe700d43b81b080765",
    "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
    "name": "Github",
    "type": "github"
  },
  "name": "ngx-planet",
  "full_name": "worktile/ngx-planet",
  "created_at": 1403018919,
  "owner": {
    "id": "5666aea91f99e33cb7c44964",
    "url": "https://{rest_api_root}/v2/devops/users/5666aea91f99e33cb7c44964",
    "name": "terry"
  },
  "is_fork": false,
  "is_private": false,
  "description": "A powerful, reliable, fully-featured and production ready Micro Frontend library for Angular",
  "branches_url": "https://github.com/worktile/ngx-planet/tree/{branch}",
  "commits_url": "https://github.com/worktile/ngx-planet/commit/{sha}",
  "compare_url": "https://github.com/worktile/ngx-planet/compare/{base}...{head}",
  "pulls_url": "https://github.com/worktile/ngx-planet/pull/{number}"
}
```

<a id="put-v2-devops-repos-repo-id"></a>

### 全量更新一个代码仓库

`PUT /v2/devops/repos/{repo_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于全量更新一个代码仓库。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `repo_id` | string | 是 | 代码仓库的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 代码仓库的名称 |
| `full_name` | string | 是 | 代码仓库的全称。同一代码托管平台下，代码仓库的全称是唯一的 |
| `description` | string |  | 代码仓库的简介 |
| `is_fork` | boolean |  | 是否是 fork 仓库 |
| `is_private` | boolean |  | 是否是私有仓库 |
| `owner_name` | string |  | 代码仓库拥有者的用户名 |
| `html_url` | string |  | 代码仓库在代码托管平台上的地址。如果为空，在 PingCode 中不显示相关跳转链接 |
| `branches_url` | string |  | 代码仓库的分支地址，使用 `{branch}` 表示分支名。如果为空，在 PingCode 中不显示相关跳转链接 |
| `commits_url` | string |  | 代码仓库的提交地址，使用 `{sha}` 表示提交的 SHA 值。如果为空，在 PingCode 中不显示相关跳转链接 |
| `compare_url` | string |  | 代码仓库的分支对比地址，使用 `{base}` 和 `{head}` 表示基准分支名和需要进行对比的分支名。如果为空，在 PingCode 中不显示相关跳转链接 |
| `pulls_url` | string |  | 代码仓库的拉取请求地址，使用 `{number}` 表示拉取请求的编号。如果为空，在 PingCode 中不显示相关跳转链接 |

**请求示例**

```json
{
  "name": "ngx-planet",
  "full_name": "worktile/ngx-planet",
  "description": "A powerful, reliable, fully-featured and production ready Micro Frontend library for Angular",
  "is_fork": false,
  "is_private": false,
  "owner_name": "terry",
  "html_url": "https://github.com/worktile/ngx-planet",
  "branches_url": "https://github.com/worktile/ngx-planet/tree/{branch}",
  "commits_url": "https://github.com/worktile/ngx-planet/commit/{sha}",
  "compare_url": "https://github.com/worktile/ngx-planet/compare/{base}...{head}",
  "pulls_url": "https://github.com/worktile/ngx-planet/pull/{number}"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 代码仓库的 id |
| `url` | string | 是 | 代码仓库的资源地址 |
| `html_url` | string | 是 | 代码仓库的地址 |
| `product` | object | 是 | 托管平台的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.type` | string |  |  |
| `name` | string | 是 | 代码仓库的名称 |
| `full_name` | string | 是 | 代码仓库的全称 |
| `created_at` | number | 是 | 代码仓库的创建时间 |
| `owner` | object | 是 | 代码仓库拥有者的引用结构数据 |
| `owner.id` | string |  |  |
| `owner.url` | string |  |  |
| `owner.name` | string |  |  |
| `is_fork` | boolean | 是 | 代码仓库是否是 fork 仓库 |
| `is_private` | boolean | 是 | 代码仓库是否是私有仓库 |
| `description` | string | 是 | 代码仓库的描述 |
| `branches_url` | string | 是 | 代码仓库的分支地址模板 |
| `commits_url` | string | 是 | 代码仓库的提交地址模板 |
| `compare_url` | string | 是 | 代码仓库的分支对比地址模板 |
| `pulls_url` | string | 是 | 代码仓库的拉取请求地址模板 |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080766",
  "url": "https://{rest_api_root}/v2/devops/repos/564587fe700d43b81b080766",
  "html_url": "https://github.com/worktile/ngx-planet",
  "product": {
    "id": "564587fe700d43b81b080765",
    "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
    "name": "Github",
    "type": "github"
  },
  "name": "ngx-planet",
  "full_name": "worktile/ngx-planet",
  "created_at": 1403018919,
  "owner": {
    "id": "5666aea91f99e33cb7c44964",
    "url": "https://{rest_api_root}/v2/devops/users/5666aea91f99e33cb7c44964",
    "name": "terry"
  },
  "is_fork": false,
  "is_private": false,
  "description": "A powerful, reliable, fully-featured and production ready Micro Frontend library for Angular",
  "branches_url": "https://github.com/worktile/ngx-planet/tree/{branch}",
  "commits_url": "https://github.com/worktile/ngx-planet/commit/{sha}",
  "compare_url": "https://github.com/worktile/ngx-planet/compare/{base}...{head}",
  "pulls_url": "https://github.com/worktile/ngx-planet/pull/{number}"
}
```

<a id="patch-v2-devops-repos-repo-id"></a>

### 部分更新一个代码仓库

`PATCH /v2/devops/repos/{repo_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于部分更新一个代码仓库。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `repo_id` | string | 是 | 代码仓库的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 代码仓库的名称 |
| `full_name` | string |  | 代码仓库的全称。同一代码托管平台下，代码仓库的全称是唯一的 |
| `description` | string |  | 代码仓库的简介 |
| `is_fork` | boolean |  | 是否是 fork 仓库 |
| `is_private` | boolean |  | 是否是私有仓库 |
| `owner_name` | string |  | 代码仓库拥有者的用户名 |
| `html_url` | string |  | 代码仓库在代码托管平台上的地址。如果为空，在 PingCode 中不显示相关跳转链接 |
| `branches_url` | string |  | 代码仓库的分支地址，使用 `{branch}` 表示分支名。如果为空，在 PingCode 中不显示相关跳转链接 |
| `commits_url` | string |  | 代码仓库的提交地址，使用 `{sha}` 表示提交的 SHA 值。如果为空，在 PingCode 中不显示相关跳转链接 |
| `compare_url` | string |  | 代码仓库的分支对比地址，使用 `{base}` 和 `{head}` 表示基准分支名和需要进行对比的分支名。如果为空，在 PingCode 中不显示相关跳转链接 |
| `pulls_url` | string |  | 代码仓库的拉取请求地址，使用 `{number}` 表示拉取请求的编号。如果为空，在 PingCode 中不显示相关跳转链接 |

**请求示例**

```json
{
  "name": "ngx-planet",
  "full_name": "worktile/ngx-planet",
  "description": "A powerful, reliable, fully-featured and production ready Micro Frontend library for Angular",
  "is_fork": false,
  "is_private": false,
  "owner_name": "terry",
  "html_url": "https://github.com/worktile/ngx-planet",
  "branches_url": "https://github.com/worktile/ngx-planet/tree/{branch}",
  "commits_url": "https://github.com/worktile/ngx-planet/commit/{sha}",
  "compare_url": "https://github.com/worktile/ngx-planet/compare/{base}...{head}",
  "pulls_url": "https://github.com/worktile/ngx-planet/pull/{number}"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 代码仓库的 id |
| `url` | string | 是 | 代码仓库的资源地址 |
| `html_url` | string | 是 | 代码仓库的地址 |
| `product` | object | 是 | 托管平台的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.type` | string |  |  |
| `name` | string | 是 | 代码仓库的名称 |
| `full_name` | string | 是 | 代码仓库的全称 |
| `created_at` | number | 是 | 代码仓库的创建时间 |
| `owner` | object | 是 | 代码仓库拥有者的引用结构数据 |
| `owner.id` | string |  |  |
| `owner.url` | string |  |  |
| `owner.name` | string |  |  |
| `is_fork` | boolean | 是 | 代码仓库是否是 fork 仓库 |
| `is_private` | boolean | 是 | 代码仓库是否是私有仓库 |
| `description` | string | 是 | 代码仓库的描述 |
| `branches_url` | string | 是 | 代码仓库的分支地址模板 |
| `commits_url` | string | 是 | 代码仓库的提交地址模板 |
| `compare_url` | string | 是 | 代码仓库的分支对比地址模板 |
| `pulls_url` | string | 是 | 代码仓库的拉取请求地址模板 |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080766",
  "url": "https://{rest_api_root}/v2/devops/repos/564587fe700d43b81b080766",
  "html_url": "https://github.com/worktile/ngx-planet",
  "product": {
    "id": "564587fe700d43b81b080765",
    "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
    "name": "Github",
    "type": "github"
  },
  "name": "ngx-planet",
  "full_name": "worktile/ngx-planet",
  "created_at": 1403018919,
  "owner": {
    "id": "5666aea91f99e33cb7c44964",
    "url": "https://{rest_api_root}/v2/devops/users/5666aea91f99e33cb7c44964",
    "name": "terry"
  },
  "is_fork": false,
  "is_private": false,
  "description": "A powerful, reliable, fully-featured and production ready Micro Frontend library for Angular",
  "branches_url": "https://github.com/worktile/ngx-planet/tree/{branch}",
  "commits_url": "https://github.com/worktile/ngx-planet/commit/{sha}",
  "compare_url": "https://github.com/worktile/ngx-planet/compare/{base}...{head}",
  "pulls_url": "https://github.com/worktile/ngx-planet/pull/{number}"
}
```

<a id="get-v2-devops-repos"></a>

### 获取代码仓库列表

`GET /v2/devops/repos` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:code`

用于分页获取指定托管平台下的代码仓库列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 代码托管平台的 id |
| `full_name` | string |  | 代码仓库的全称 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 代码仓库全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].html_url` | string |  |  |
| `values[].product` | object |  |  |
| `values[].product.id` | string |  |  |
| `values[].product.url` | string |  |  |
| `values[].product.name` | string |  |  |
| `values[].product.type` | string |  |  |
| `values[].name` | string |  |  |
| `values[].full_name` | string |  |  |
| `values[].created_at` | number |  |  |
| `values[].owner` | object |  |  |
| `values[].owner.id` | string |  |  |
| `values[].owner.url` | string |  |  |
| `values[].owner.name` | string |  |  |
| `values[].is_fork` | boolean |  |  |
| `values[].is_private` | boolean |  |  |
| `values[].description` | string |  |  |
| `values[].branches_url` | string |  |  |
| `values[].commits_url` | string |  |  |
| `values[].compare_url` | string |  |  |
| `values[].pulls_url` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "564587fe700d43b81b080766",
      "url": "https://{rest_api_root}/v2/devops/repos/564587fe700d43b81b080766",
      "html_url": "https://github.com/worktile/ngx-planet",
      "product": {
        "id": "564587fe700d43b81b080765",
        "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
        "name": "Github",
        "type": "github"
      },
      "name": "ngx-planet",
      "full_name": "worktile/ngx-planet",
      "created_at": 1403018919,
      "owner": {
        "id": "5666aea91f99e33cb7c44964",
        "url": "https://{rest_api_root}/v2/devops/users/5666aea91f99e33cb7c44964",
        "name": "terry"
      },
      "is_fork": false,
      "is_private": false,
      "description": "A powerful, reliable, fully-featured and production ready Micro Frontend library for Angular",
      "branches_url": "https://github.com/worktile/ngx-planet/tree/{branch}",
      "commits_url": "https://github.com/worktile/ngx-planet/commit/{sha}",
      "compare_url": "https://github.com/worktile/ngx-planet/compare/{base}...{head}",
      "pulls_url": "https://github.com/worktile/ngx-planet/pull/{number}"
    }
  ]
}
```

## 代码分支

> 分组路径：DevOps_数据集成 / 代码 / 代码分支

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/devops/branches` | [创建一个代码分支](#post-v2-devops-branches) | 企业令牌 |
| `GET` | `/v2/devops/branches/{branch_id}` | [获取一个代码分支](#get-v2-devops-branches-branch-id) | 企业令牌 |
| `PATCH` | `/v2/devops/branches/{branch_id}` | [部分更新一个代码分支](#patch-v2-devops-branches-branch-id) | 企业令牌 |
| `GET` | `/v2/devops/branches` | [获取代码分支列表](#get-v2-devops-branches) | 企业令牌 |
| `DELETE` | `/v2/devops/branches/{branch_id}` | [删除一个代码分支](#delete-v2-devops-branches-branch-id) | 企业令牌 |

<a id="post-v2-devops-branches"></a>

### 创建一个代码分支

`POST /v2/devops/branches` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于录入代码仓库中的实际分支，供在 PingCode 中展示。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 代码托管平台的 id |
| `repo_id` | string | 是 | 代码仓库的 id |
| `name` | string | 是 | 分支的名称。同一代码仓库下，分支的名称是唯一的 |
| `sender_name` | string | 是 | 分支创建者的用户名 |
| `is_default` | boolean |  | 是否设置为默认分支。当创建分支时，如果当前仓库的分支数为 0，则新创建的分支会自动设置为该仓库的默认分支。如果创建分支时设置了该分支为默认分支，并且仓库已经有默认分支存在，那么其他分支将被取消默认属性，而该分支将被设置为新的默认分支 |
| `workitem_identifiers` | string[] |  | PingCode 工作项编号的列表。通过该参数将分支与一个或多个工作项关联，分支和工作项关联后，分支下所有的提交都会和该工作项关联 |

**请求示例**

```json
{
  "product_id": "564587fe700d43b81b080765",
  "repo_id": "564587fe700d43b81b080766",
  "name": "terry/#PLM-001",
  "sender_name": "terry",
  "is_default": true,
  "workitem_identifiers": [
    "PLM-001"
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 代码分支的 id |
| `url` | string | 是 | 代码分支的资源地址 |
| `product` | object | 是 | 托管平台的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.type` | string |  |  |
| `repository` | object | 是 | 代码仓库的引用结构数据 |
| `repository.id` | string |  |  |
| `repository.url` | string |  |  |
| `repository.name` | string |  |  |
| `repository.full_name` | string |  |  |
| `repository.created_at` | number |  |  |
| `name` | string | 是 | 代码分支的名称 |
| `created_at` | number | 是 | 代码分支的创建时间 |
| `sender` | object | 是 | 代码分支创建者的引用结构数据 |
| `sender.id` | string |  |  |
| `sender.url` | string |  |  |
| `sender.name` | string |  |  |
| `is_default` | boolean | 是 | 代码分支是否为默认分支 |
| `workitems` | object[] | 是 | 代码分支关联的工作项列表 |
| `workitems[].id` | string |  |  |
| `workitems[].url` | string |  |  |
| `workitems[].short_id` | string |  |  |
| `workitems[].html_url` | string |  |  |
| `workitems[].identifier` | string |  |  |
| `workitems[].title` | string |  |  |
| `workitems[].start` | object |  |  |
| `workitems[].start.date` | number |  |  |
| `workitems[].start.with_time` | number |  |  |
| `workitems[].due` | object |  |  |
| `workitems[].due.date` | number |  |  |
| `workitems[].due.with_time` | number |  |  |
| `workitems[].parent_id` | string |  |  |
| `workitems[].properties` | object |  |  |
| `workitems[].properties.prop_a` | string |  |  |
| `workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080767",
  "url": "https://{rest_api_root}/v2/devops/branches/564587fe700d43b81b080767",
  "product": {
    "id": "564587fe700d43b81b080765",
    "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
    "name": "Github",
    "type": "github"
  },
  "repository": {
    "id": "564587fe700d43b81b080766",
    "url": "https://{rest_api_root}/v2/devops/repos/564587fe700d43b81b080766",
    "name": "ngx-planet",
    "full_name": "worktile/ngx-planet",
    "created_at": 1403018919
  },
  "name": "terry/#PLM-001",
  "created_at": 1403018919,
  "sender": {
    "id": "5666aea91f99e33cb7c44964",
    "url": "https://{rest_api_root}/v2/devops/users/5666aea91f99e33cb7c44964",
    "name": "terry"
  },
  "is_default": true,
  "workitems": [
    {
      "id": "564587fe700d43b81b080ab8",
      "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
      "short_id": "c9WqLmTO",
      "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
      "identifier": "PLM-001",
      "title": "这是一个用户故事",
      "start": {
        "date": 1583290309,
        "with_time": 1
      },
      "due": {
        "date": 1583290347,
        "with_time": 1
      },
      "parent_id": "5edca524cad2fa112b06105c",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      }
    }
  ]
}
```

<a id="get-v2-devops-branches-branch-id"></a>

### 获取一个代码分支

`GET /v2/devops/branches/{branch_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:code`

用于按 id 获取代码分支全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `branch_id` | string | 是 | 代码分支的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 代码分支的 id |
| `url` | string | 是 | 代码分支的资源地址 |
| `product` | object | 是 | 代码分支的托管平台 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.type` | string |  |  |
| `repository` | object | 是 | 代码分支的代码仓库 |
| `repository.id` | string |  |  |
| `repository.url` | string |  |  |
| `repository.name` | string |  |  |
| `repository.full_name` | string |  |  |
| `repository.created_at` | number |  |  |
| `name` | string | 是 | 代码分支的名称 |
| `created_at` | number | 是 | 代码分支的创建时间 |
| `sender` | object | 是 | 代码分支的创建者 |
| `sender.id` | string |  |  |
| `sender.url` | string |  |  |
| `sender.name` | string |  |  |
| `is_default` | boolean | 是 | 代码分支是否为默认分支 |
| `workitems` | object[] | 是 | 代码分支关联的工作项列表 |
| `workitems[].id` | string |  |  |
| `workitems[].url` | string |  |  |
| `workitems[].short_id` | string |  |  |
| `workitems[].html_url` | string |  |  |
| `workitems[].identifier` | string |  |  |
| `workitems[].title` | string |  |  |
| `workitems[].start` | object |  |  |
| `workitems[].start.date` | number |  |  |
| `workitems[].start.with_time` | number |  |  |
| `workitems[].due` | object |  |  |
| `workitems[].due.date` | number |  |  |
| `workitems[].due.with_time` | number |  |  |
| `workitems[].parent_id` | string |  |  |
| `workitems[].properties` | object |  |  |
| `workitems[].properties.prop_a` | string |  |  |
| `workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080767",
  "url": "https://{rest_api_root}/v2/devops/branches/564587fe700d43b81b080767",
  "product": {
    "id": "564587fe700d43b81b080765",
    "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
    "name": "Github",
    "type": "github"
  },
  "repository": {
    "id": "564587fe700d43b81b080766",
    "url": "https://{rest_api_root}/v2/devops/repos/564587fe700d43b81b080766",
    "name": "ngx-planet",
    "full_name": "worktile/ngx-planet",
    "created_at": 1403018919
  },
  "name": "terry/#PLM-001",
  "created_at": 1403018919,
  "sender": {
    "id": "5666aea91f99e33cb7c44964",
    "url": "https://{rest_api_root}/v2/devops/users/5666aea91f99e33cb7c44964",
    "name": "terry"
  },
  "is_default": false,
  "workitems": [
    {
      "id": "564587fe700d43b81b080ab8",
      "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
      "short_id": "c9WqLmTO",
      "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
      "identifier": "PLM-001",
      "title": "这是一个用户故事",
      "start": {
        "date": 1583290309,
        "with_time": 1
      },
      "due": {
        "date": 1583290347,
        "with_time": 1
      },
      "parent_id": "5edca524cad2fa112b06105c",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      }
    }
  ]
}
```

<a id="patch-v2-devops-branches-branch-id"></a>

### 部分更新一个代码分支

`PATCH /v2/devops/branches/{branch_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于部分更新一个代码分支。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `branch_id` | string | 是 | 分支的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 代码托管平台的 id |
| `repo_id` | string | 是 | 代码仓库的 id |
| `is_default` | boolean |  | 是否设置为默认分支。该值只能是 `true`，设置该分支为默认分支后将取消其他分支的默认属性 |
| `workitem_identifiers` | string[] |  | PingCode 工作项编号的列表。通过该参数将分支与一个或多个工作项关联，分支和工作项关联后，分支下所有的提交都会和该工作项关联 |

**请求示例**

```json
{
  "product_id": "564587fe700d43b81b080765",
  "repo_id": "564587fe700d43b81b080766",
  "is_default": true,
  "workitem_identifiers": [
    "PLM-001"
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 代码分支的 id |
| `url` | string | 是 | 代码分支的资源地址 |
| `product` | object | 是 | 托管平台的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.type` | string |  |  |
| `repository` | object | 是 | 代码仓库的引用结构数据 |
| `repository.id` | string |  |  |
| `repository.url` | string |  |  |
| `repository.name` | string |  |  |
| `repository.full_name` | string |  |  |
| `repository.created_at` | number |  |  |
| `name` | string | 是 | 代码分支的名称 |
| `created_at` | number | 是 | 代码分支的创建时间 |
| `sender` | object | 是 | 代码分支创建者的引用结构数据 |
| `sender.id` | string |  |  |
| `sender.url` | string |  |  |
| `sender.name` | string |  |  |
| `is_default` | boolean | 是 | 代码分支是否为默认分支 |
| `workitems` | object[] | 是 | 代码分支关联的工作项列表 |
| `workitems[].id` | string |  |  |
| `workitems[].url` | string |  |  |
| `workitems[].short_id` | string |  |  |
| `workitems[].html_url` | string |  |  |
| `workitems[].identifier` | string |  |  |
| `workitems[].title` | string |  |  |
| `workitems[].start` | object |  |  |
| `workitems[].start.date` | number |  |  |
| `workitems[].start.with_time` | number |  |  |
| `workitems[].due` | object |  |  |
| `workitems[].due.date` | number |  |  |
| `workitems[].due.with_time` | number |  |  |
| `workitems[].parent_id` | string |  |  |
| `workitems[].properties` | object |  |  |
| `workitems[].properties.prop_a` | string |  |  |
| `workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080767",
  "url": "https://{rest_api_root}/v2/devops/branches/564587fe700d43b81b080767",
  "product": {
    "id": "564587fe700d43b81b080765",
    "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
    "name": "Github",
    "type": "github"
  },
  "repository": {
    "id": "564587fe700d43b81b080766",
    "url": "https://{rest_api_root}/v2/devops/repos/564587fe700d43b81b080766",
    "name": "ngx-planet",
    "full_name": "worktile/ngx-planet",
    "created_at": 1403018919
  },
  "name": "terry/#PLM-001",
  "created_at": 1403018919,
  "sender": {
    "id": "5666aea91f99e33cb7c44964",
    "url": "https://{rest_api_root}/v2/devops/users/5666aea91f99e33cb7c44964",
    "name": "terry"
  },
  "is_default": true,
  "workitems": [
    {
      "id": "564587fe700d43b81b080ab8",
      "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
      "short_id": "c9WqLmTO",
      "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
      "identifier": "PLM-001",
      "title": "这是一个用户故事",
      "start": {
        "date": 1583290309,
        "with_time": 1
      },
      "due": {
        "date": 1583290347,
        "with_time": 1
      },
      "parent_id": "5edca524cad2fa112b06105c",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      }
    }
  ]
}
```

<a id="get-v2-devops-branches"></a>

### 获取代码分支列表

`GET /v2/devops/branches` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:code`

用于分页获取指定仓库的代码分支列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 代码托管平台的 id |
| `repo_id` | string | 是 | 代码仓库的 id |
| `name` | string |  | 分支的名称 |
| `workitem_id` | string |  | 工作项的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 代码分支全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].product` | object |  |  |
| `values[].product.id` | string |  |  |
| `values[].product.url` | string |  |  |
| `values[].product.name` | string |  |  |
| `values[].product.type` | string |  |  |
| `values[].repository` | object |  |  |
| `values[].repository.id` | string |  |  |
| `values[].repository.url` | string |  |  |
| `values[].repository.name` | string |  |  |
| `values[].repository.full_name` | string |  |  |
| `values[].repository.created_at` | number |  |  |
| `values[].name` | string |  |  |
| `values[].created_at` | number |  |  |
| `values[].sender` | object |  |  |
| `values[].sender.id` | string |  |  |
| `values[].sender.url` | string |  |  |
| `values[].sender.name` | string |  |  |
| `values[].is_default` | boolean |  |  |
| `values[].workitems` | object[] |  |  |
| `values[].workitems[].id` | string |  |  |
| `values[].workitems[].url` | string |  |  |
| `values[].workitems[].short_id` | string |  |  |
| `values[].workitems[].html_url` | string |  |  |
| `values[].workitems[].identifier` | string |  |  |
| `values[].workitems[].title` | string |  |  |
| `values[].workitems[].start` | object |  |  |
| `values[].workitems[].start.date` | number |  |  |
| `values[].workitems[].start.with_time` | number |  |  |
| `values[].workitems[].due` | object |  |  |
| `values[].workitems[].due.date` | number |  |  |
| `values[].workitems[].due.with_time` | number |  |  |
| `values[].workitems[].parent_id` | string |  |  |
| `values[].workitems[].properties` | object |  |  |
| `values[].workitems[].properties.prop_a` | string |  |  |
| `values[].workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "564587fe700d43b81b080767",
      "url": "https://{rest_api_root}/v2/devops/branches/564587fe700d43b81b080767",
      "product": {
        "id": "564587fe700d43b81b080765",
        "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
        "name": "Github",
        "type": "github"
      },
      "repository": {
        "id": "564587fe700d43b81b080766",
        "url": "https://{rest_api_root}/v2/devops/repos/564587fe700d43b81b080766",
        "name": "ngx-planet",
        "full_name": "worktile/ngx-planet",
        "created_at": 1403018919
      },
      "name": "terry/#PLM-001",
      "created_at": 1403018919,
      "sender": {
        "id": "5666aea91f99e33cb7c44964",
        "url": "https://{rest_api_root}/v2/devops/users/5666aea91f99e33cb7c44964",
        "name": "terry"
      },
      "is_default": false,
      "workitems": [
        {
          "id": "564587fe700d43b81b080ab8",
          "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
          "short_id": "c9WqLmTO",
          "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
          "identifier": "PLM-001",
          "title": "这是一个用户故事",
          "start": {
            "date": 1583290309,
            "with_time": 1
          },
          "due": {
            "date": 1583290347,
            "with_time": 1
          },
          "parent_id": "5edca524cad2fa112b06105c",
          "properties": {
            "prop_a": "prop_a_value",
            "prop_b": "prop_b_value"
          }
        }
      ]
    }
  ]
}
```

<a id="delete-v2-devops-branches-branch-id"></a>

### 删除一个代码分支

`DELETE /v2/devops/branches/{branch_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于删除一个代码分支。  
 删除分支后，不会移除该分支和工作项的关联历史，在关联历史中，依然可以查询到删除的分支。默认分支不能被删除。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `branch_id` | string | 是 | 分支的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 代码分支的 id |
| `url` | string | 是 | 代码分支的资源地址 |
| `product` | object | 是 | 托管平台的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.type` | string |  |  |
| `repository` | object | 是 | 代码仓库的引用结构数据 |
| `repository.id` | string |  |  |
| `repository.url` | string |  |  |
| `repository.name` | string |  |  |
| `repository.full_name` | string |  |  |
| `repository.created_at` | number |  |  |
| `name` | string | 是 | 代码分支的名称 |
| `created_at` | number | 是 | 代码分支的创建时间 |
| `sender` | object | 是 | 代码分支创建者的引用结构数据 |
| `sender.id` | string |  |  |
| `sender.url` | string |  |  |
| `sender.name` | string |  |  |
| `is_default` | boolean | 是 | 代码分支是否为默认分支 |
| `workitems` | object[] | 是 | 代码分支关联的工作项列表 |
| `workitems[].id` | string |  |  |
| `workitems[].url` | string |  |  |
| `workitems[].short_id` | string |  |  |
| `workitems[].html_url` | string |  |  |
| `workitems[].identifier` | string |  |  |
| `workitems[].title` | string |  |  |
| `workitems[].start` | object |  |  |
| `workitems[].start.date` | number |  |  |
| `workitems[].start.with_time` | number |  |  |
| `workitems[].due` | object |  |  |
| `workitems[].due.date` | number |  |  |
| `workitems[].due.with_time` | number |  |  |
| `workitems[].parent_id` | string |  |  |
| `workitems[].properties` | object |  |  |
| `workitems[].properties.prop_a` | string |  |  |
| `workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080768",
  "url": "https://{rest_api_root}/v2/devops/branches/564587fe700d43b81b080768",
  "product": {
    "id": "564587fe700d43b81b080765",
    "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
    "name": "Github",
    "type": "github"
  },
  "repository": {
    "id": "564587fe700d43b81b080766",
    "url": "https://{rest_api_root}/v2/devops/repos/564587fe700d43b81b080766",
    "name": "ngx-planet",
    "full_name": "worktile/ngx-planet",
    "created_at": 1403018919
  },
  "name": "terry/#PLM-001",
  "created_at": 1403018919,
  "sender": {
    "id": "5666aea91f99e33cb7c44964",
    "url": "https://{rest_api_root}/v2/devops/users/5666aea91f99e33cb7c44964",
    "name": "terry"
  },
  "is_default": false,
  "workitems": [
    {
      "id": "564587fe700d43b81b080ab8",
      "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
      "short_id": "c9WqLmTO",
      "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
      "identifier": "PLM-001",
      "title": "这是一个用户故事",
      "start": {
        "date": 1583290309,
        "with_time": 1
      },
      "due": {
        "date": 1583290347,
        "with_time": 1
      },
      "parent_id": "5edca524cad2fa112b06105c",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      }
    }
  ]
}
```

## 提交

> 分组路径：DevOps_数据集成 / 代码 / 提交

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/devops/commits` | [创建一个提交](#post-v2-devops-commits) | 企业令牌 |
| `GET` | `/v2/devops/commits/{commit_id_or_sha}` | [获取一个提交](#get-v2-devops-commits-commit-id-or-sha) | 企业令牌 |
| `GET` | `/v2/devops/commits` | [获取提交列表](#get-v2-devops-commits) | 企业令牌 |

<a id="post-v2-devops-commits"></a>

### 创建一个提交

`POST /v2/devops/commits` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于录入代码仓库中的实际提交，供在 PingCode 中展示。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `sha` | string | 是 | 提交的 SHA 值 |
| `message` | string | 是 | 提交的描述信息 |
| `committer_name` | string | 是 | 提交者的用户名 |
| `committed_at` | number | 是 | 提交的时间 |
| `tree_id` | string |  | 提交树的 SHA 值 |
| `files_added` | string[] | 是 | 新增文件的文件名列表 |
| `files_removed` | string[] | 是 | 移除文件的文件名列表 |
| `files_modified` | string[] | 是 | 更新文件的文件名列表 |
| `workitem_identifiers` | string[] |  | PingCode 工作项编号的列表。通过该参数将提交与一个或多个工作项关联 |

**请求示例**

```json
{
  "sha": "96a024347146ebdc5f481f45e6e6871e0c43af5f",
  "message": "feat(scope): #PLM-001 initialization code structure",
  "committer_name": "terry",
  "committed_at": 1403018919,
  "tree_id": "1bf8989985e70389c07daa5052464a9c6f4896bb",
  "files_added": [
    "index.ts"
  ],
  "files_removed": [
    "utilities.ts"
  ],
  "files_modified": [
    "README.md"
  ],
  "workitem_identifiers": [
    "PLM-001"
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 提交的 id |
| `url` | string | 是 | 提交的资源地址 |
| `sha` | string | 是 | 提交的 SHA 值 |
| `message` | string | 是 | 提交的描述信息 |
| `committer_name` | string | 是 | 提交者的用户名 |
| `committed_at` | number | 是 | 提交的时间 |
| `tree_id` | string | 是 | 提交树的 SHA 值 |
| `files_added` | string[] | 是 | 提交新增文件的文件名列表 |
| `files_removed` | string[] | 是 | 提交移除文件的文件名列表 |
| `files_modified` | string[] | 是 | 提交更新文件的文件名列表 |
| `file_changed_count` | number | 是 | 提交更新文件数量 |
| `workitems` | object[] | 是 | 提交关联的 PingCode 工作项列表 |
| `workitems[].id` | string |  |  |
| `workitems[].url` | string |  |  |
| `workitems[].short_id` | string |  |  |
| `workitems[].html_url` | string |  |  |
| `workitems[].identifier` | string |  |  |
| `workitems[].title` | string |  |  |
| `workitems[].start` | object |  |  |
| `workitems[].start.date` | number |  |  |
| `workitems[].start.with_time` | number |  |  |
| `workitems[].due` | object |  |  |
| `workitems[].due.date` | number |  |  |
| `workitems[].due.with_time` | number |  |  |
| `workitems[].parent_id` | string |  |  |
| `workitems[].properties` | object |  |  |
| `workitems[].properties.prop_a` | string |  |  |
| `workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "5e3bb2128cfda459bbafa3fb",
  "url": "https://{rest_api_root}/v2/devops/commits/5e3bb2128cfda459bbafa3fb",
  "sha": "96a024347146ebdc5f481f45e6e6871e0c43af5f",
  "message": "feat(scope): #PLM-001 initialization code structure",
  "committer_name": "terry",
  "committed_at": 1403018919,
  "tree_id": "1bf8989985e70389c07daa5052464a9c6f4896bb",
  "files_added": [
    "index.ts"
  ],
  "files_removed": [
    "utilities.ts"
  ],
  "files_modified": [
    "README.md"
  ],
  "file_changed_count": 3,
  "workitems": [
    {
      "id": "564587fe700d43b81b080ab8",
      "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
      "short_id": "c9WqLmTO",
      "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
      "identifier": "PLM-001",
      "title": "这是一个用户故事",
      "start": {
        "date": 1583290309,
        "with_time": 1
      },
      "due": {
        "date": 1583290347,
        "with_time": 1
      },
      "parent_id": "5edca524cad2fa112b06105c",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      }
    }
  ]
}
```

<a id="get-v2-devops-commits-commit-id-or-sha"></a>

### 获取一个提交

`GET /v2/devops/commits/{commit_id_or_sha}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:code`

用于按 id 或 SHA 获取提交全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `commit_id_or_sha` | string | 是 | 提交的 id 或 SHA 值 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 提交的 id |
| `url` | string | 是 | 提交的资源地址 |
| `sha` | string | 是 | 提交的 SHA 值 |
| `message` | string | 是 | 提交的描述信息 |
| `committer_name` | string | 是 | 提交者的用户名 |
| `committed_at` | number | 是 | 提交的时间 |
| `tree_id` | string | 是 | 提交树的 SHA 值 |
| `files_added` | string[] | 是 | 提交新增文件的文件名列表 |
| `files_removed` | string[] | 是 | 提交移除文件的文件名列表 |
| `files_modified` | string[] | 是 | 提交更新文件的文件名列表 |
| `file_changed_count` | number | 是 | 提交更新文件数量 |
| `workitems` | object[] | 是 | 提交关联的 PingCode 的工作项列表 |
| `workitems[].id` | string |  |  |
| `workitems[].url` | string |  |  |
| `workitems[].short_id` | string |  |  |
| `workitems[].html_url` | string |  |  |
| `workitems[].identifier` | string |  |  |
| `workitems[].title` | string |  |  |
| `workitems[].start` | object |  |  |
| `workitems[].start.date` | number |  |  |
| `workitems[].start.with_time` | number |  |  |
| `workitems[].due` | object |  |  |
| `workitems[].due.date` | number |  |  |
| `workitems[].due.with_time` | number |  |  |
| `workitems[].parent_id` | string |  |  |
| `workitems[].properties` | object |  |  |
| `workitems[].properties.prop_a` | string |  |  |
| `workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "5e3bb2128cfda459bbafa3fb",
  "url": "https://{rest_api_root}/v2/devops/commits/5e3bb2128cfda459bbafa3fb",
  "sha": "96a024347146ebdc5f481f45e6e6871e0c43af5f",
  "message": "feat(scope): #PLM-001 initialization code structure",
  "committer_name": "terry",
  "committed_at": 1403018919,
  "tree_id": "1bf8989985e70389c07daa5052464a9c6f4896bb",
  "files_added": [
    "index.ts"
  ],
  "files_removed": [
    "utilities.ts"
  ],
  "files_modified": [
    "README.md"
  ],
  "file_changed_count": 3,
  "workitems": [
    {
      "id": "564587fe700d43b81b080ab8",
      "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
      "short_id": "c9WqLmTO",
      "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
      "identifier": "PLM-001",
      "title": "这是一个用户故事",
      "start": {
        "date": 1583290309,
        "with_time": 1
      },
      "due": {
        "date": 1583290347,
        "with_time": 1
      },
      "parent_id": "5edca524cad2fa112b06105c",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      }
    }
  ]
}
```

<a id="get-v2-devops-commits"></a>

### 获取提交列表

`GET /v2/devops/commits` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:code`

用于分页获取提交列表，可按 SHA 或工作项过滤。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `sha` | string |  | 提交的 SHA 值 |
| `workitem_id` | string |  | 工作项的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 提交全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].sha` | string |  |  |
| `values[].message` | string |  |  |
| `values[].committer_name` | string |  |  |
| `values[].committed_at` | number |  |  |
| `values[].tree_id` | string |  |  |
| `values[].files_added` | string[] |  |  |
| `values[].files_removed` | string[] |  |  |
| `values[].files_modified` | string[] |  |  |
| `values[].file_changed_count` | number |  |  |
| `values[].workitems` | object[] |  |  |
| `values[].workitems[].id` | string |  |  |
| `values[].workitems[].url` | string |  |  |
| `values[].workitems[].short_id` | string |  |  |
| `values[].workitems[].html_url` | string |  |  |
| `values[].workitems[].identifier` | string |  |  |
| `values[].workitems[].title` | string |  |  |
| `values[].workitems[].start` | object |  |  |
| `values[].workitems[].start.date` | number |  |  |
| `values[].workitems[].start.with_time` | number |  |  |
| `values[].workitems[].due` | object |  |  |
| `values[].workitems[].due.date` | number |  |  |
| `values[].workitems[].due.with_time` | number |  |  |
| `values[].workitems[].parent_id` | string |  |  |
| `values[].workitems[].properties` | object |  |  |
| `values[].workitems[].properties.prop_a` | string |  |  |
| `values[].workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5e3bb2128cfda459bbafa3fb",
      "url": "https://{rest_api_root}/v2/devops/commits/5e3bb2128cfda459bbafa3fb",
      "sha": "96a024347146ebdc5f481f45e6e6871e0c43af5f",
      "message": "feat(scope): #PLM-001 initialization code structure",
      "committer_name": "terry",
      "committed_at": 1403018919,
      "tree_id": "1bf8989985e70389c07daa5052464a9c6f4896bb",
      "files_added": [
        "index.ts"
      ],
      "files_removed": [
        "utilities.ts"
      ],
      "files_modified": [
        "README.md"
      ],
      "file_changed_count": 3,
      "workitems": [
        {
          "id": "564587fe700d43b81b080ab8",
          "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
          "short_id": "c9WqLmTO",
          "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
          "identifier": "PLM-001",
          "title": "这是一个用户故事",
          "start": {
            "date": 1583290309,
            "with_time": 1
          },
          "due": {
            "date": 1583290347,
            "with_time": 1
          },
          "parent_id": "5edca524cad2fa112b06105c",
          "properties": {
            "prop_a": "prop_a_value",
            "prop_b": "prop_b_value"
          }
        }
      ]
    }
  ]
}
```

## 提交引用

> 分组路径：DevOps_数据集成 / 代码 / 提交引用

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/devops/refs` | [创建一个提交引用](#post-v2-devops-refs) | 企业令牌 |
| `GET` | `/v2/devops/refs/{ref_id}` | [获取一个提交引用](#get-v2-devops-refs-ref-id) | 企业令牌 |
| `GET` | `/v2/devops/refs` | [获取提交引用列表](#get-v2-devops-refs) | 企业令牌 |

<a id="post-v2-devops-refs"></a>

### 创建一个提交引用

`POST /v2/devops/refs` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于创建一个提交引用。  
 提交引用是提交与分支的一种关联关系，一个提交可以与多个分支关联，一个分支也可以与多个提交关联。当提交与分支关联后，提交会自动与由此分支发起的拉取请求关联，当拉取请求合并后，这些关联的提交将自动被标记为“已合并”状态。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 代码托管平台的 id |
| `repo_id` | string | 是 | 代码仓库的 id |
| `sha` | string | 是 | 提交的 SHA 值 |
| `meta_type` | string | 是 | 引用实体的类型；枚举："branch" |
| `meta_id` | string | 是 | 引用实体的 id，例如：`branch_id` |

**请求示例**

```json
{
  "product_id": "564587fe700d43b81b080765",
  "repo_id": "564587fe700d43b81b080766",
  "sha": "96a024347146ebdc5f481f45e6e6871e0c43af5f",
  "meta_type": "branch",
  "meta_id": "564587fe700d43b81b080767"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 提交引用的 id |
| `url` | string | 是 | 提交引用的资源地址 |
| `product` | object | 是 | 托管平台的引用结构数据 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.type` | string |  |  |
| `repository` | object | 是 | 代码仓库的引用结构数据 |
| `repository.id` | string |  |  |
| `repository.url` | string |  |  |
| `repository.name` | string |  |  |
| `repository.full_name` | string |  |  |
| `repository.created_at` | number |  |  |
| `commit` | object | 是 | 提交的引用结构数据 |
| `commit.id` | string |  |  |
| `commit.url` | string |  |  |
| `commit.sha` | string |  |  |
| `commit.message` | string |  |  |
| `commit.committer_name` | string |  |  |
| `commit.committed_at` | number |  |  |
| `meta` | object | 是 | 提交引用实体的引用结构数据 |
| `meta.id` | string |  |  |
| `meta.url` | string |  |  |
| `meta.name` | string |  |  |
| `meta.type` | string |  |  |

**响应示例**

```json
{
  "id": "5e451b7dd704c212f7de8b4f",
  "url": "https://{rest_api_root}/v2/devops/refs/5e451b7dd704c212f7de8b4f",
  "product": {
    "id": "564587fe700d43b81b080765",
    "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
    "name": "Github",
    "type": "github"
  },
  "repository": {
    "id": "564587fe700d43b81b080766",
    "url": "https://{rest_api_root}/v2/devops/repos/564587fe700d43b81b080766",
    "name": "ngx-planet",
    "full_name": "worktile/ngx-planet",
    "created_at": 1403018919
  },
  "commit": {
    "id": "5e3bb2128cfda459bbafa3fb",
    "url": "https://{rest_api_root}/v2/devops/commits/5e3bb2128cfda459bbafa3fb",
    "sha": "96a024347146ebdc5f481f45e6e6871e0c43af5f",
    "message": "feat(scope): #PLM-001 initialization code structure",
    "committer_name": "terry",
    "committed_at": 1403018919
  },
  "meta": {
    "id": "564587fe700d43b81b080767",
    "url": "https://{rest_api_root}/v2/devops/branches/564587fe700d43b81b080767",
    "name": "terry/#PLM-001",
    "type": "branch"
  }
}
```

<a id="get-v2-devops-refs-ref-id"></a>

### 获取一个提交引用

`GET /v2/devops/refs/{ref_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:code`

用于按 id 获取一个提交引用。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ref_id` | string | 是 | 提交引用的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 提交引用的 id |
| `url` | string | 是 | 提交引用的资源地址 |
| `product` | object | 是 | 提交引用的托管平台 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.type` | string |  |  |
| `repository` | object | 是 | 提交引用的代码仓库 |
| `repository.id` | string |  |  |
| `repository.url` | string |  |  |
| `repository.name` | string |  |  |
| `repository.full_name` | string |  |  |
| `repository.created_at` | number |  |  |
| `commit` | object | 是 | 提交引用的代码提交 |
| `commit.id` | string |  |  |
| `commit.url` | string |  |  |
| `commit.sha` | string |  |  |
| `commit.message` | string |  |  |
| `commit.committer_name` | string |  |  |
| `commit.committed_at` | number |  |  |
| `meta` | object | 是 | 提交引用的实体，如分支 |
| `meta.id` | string |  |  |
| `meta.url` | string |  |  |
| `meta.name` | string |  |  |
| `meta.type` | string |  |  |

**响应示例**

```json
{
  "id": "5e451b7dd704c212f7de8b4f",
  "url": "https://{rest_api_root}/v2/devops/refs/5e451b7dd704c212f7de8b4f",
  "product": {
    "id": "564587fe700d43b81b080765",
    "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
    "name": "Github",
    "type": "github"
  },
  "repository": {
    "id": "564587fe700d43b81b080766",
    "url": "https://{rest_api_root}/v2/devops/repos/564587fe700d43b81b080766",
    "name": "ngx-planet",
    "full_name": "worktile/ngx-planet",
    "created_at": 1403018919
  },
  "commit": {
    "id": "5e3bb2128cfda459bbafa3fb",
    "url": "https://{rest_api_root}/v2/devops/commits/5e3bb2128cfda459bbafa3fb",
    "sha": "96a024347146ebdc5f481f45e6e6871e0c43af5f",
    "message": "feat(scope): #PLM-001 initialization code structure",
    "committer_name": "terry",
    "committed_at": 1403018919
  },
  "meta": {
    "id": "564587fe700d43b81b080767",
    "url": "https://{rest_api_root}/v2/devops/branches/564587fe700d43b81b080767",
    "name": "terry/#PLM-001",
    "type": "branch"
  }
}
```

<a id="get-v2-devops-refs"></a>

### 获取提交引用列表

`GET /v2/devops/refs` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:code`

用于按引用实体分页获取提交引用列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 代码托管平台的 id |
| `repo_id` | string | 是 | 代码仓库的 id |
| `meta_type` | string |  | 引用实体的类型；枚举："branch" |
| `meta_id` | string |  | 引用实体的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 提交引用全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].product` | object |  |  |
| `values[].product.id` | string |  |  |
| `values[].product.url` | string |  |  |
| `values[].product.name` | string |  |  |
| `values[].product.type` | string |  |  |
| `values[].repository` | object |  |  |
| `values[].repository.id` | string |  |  |
| `values[].repository.url` | string |  |  |
| `values[].repository.name` | string |  |  |
| `values[].repository.full_name` | string |  |  |
| `values[].repository.created_at` | number |  |  |
| `values[].commit` | object |  |  |
| `values[].commit.id` | string |  |  |
| `values[].commit.url` | string |  |  |
| `values[].commit.sha` | string |  |  |
| `values[].commit.message` | string |  |  |
| `values[].commit.committer_name` | string |  |  |
| `values[].commit.committed_at` | number |  |  |
| `values[].meta` | object |  |  |
| `values[].meta.id` | string |  |  |
| `values[].meta.url` | string |  |  |
| `values[].meta.name` | string |  |  |
| `values[].meta.type` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "5e451b7dd704c212f7de8b4f",
      "url": "https://{rest_api_root}/v2/devops/refs/5e451b7dd704c212f7de8b4f",
      "product": {
        "id": "564587fe700d43b81b080765",
        "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
        "name": "Github",
        "type": "github"
      },
      "repository": {
        "id": "564587fe700d43b81b080766",
        "url": "https://{rest_api_root}/v2/devops/repos/564587fe700d43b81b080766",
        "name": "ngx-planet",
        "full_name": "worktile/ngx-planet",
        "created_at": 1403018919
      },
      "commit": {
        "id": "5e3bb2128cfda459bbafa3fb",
        "url": "https://{rest_api_root}/v2/devops/commits/5e3bb2128cfda459bbafa3fb",
        "sha": "96a024347146ebdc5f481f45e6e6871e0c43af5f",
        "message": "feat(scope): #PLM-001 initialization code structure",
        "committer_name": "terry",
        "committed_at": 1403018919
      },
      "meta": {
        "id": "564587fe700d43b81b080767",
        "url": "https://{rest_api_root}/v2/devops/branches/564587fe700d43b81b080767",
        "name": "terry/#PLM-001",
        "type": "branch"
      }
    }
  ]
}
```

## 拉取请求

> 分组路径：DevOps_数据集成 / 代码 / 拉取请求

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/devops/prs` | [创建一个拉取请求](#post-v2-devops-prs) | 企业令牌 |
| `GET` | `/v2/devops/prs/{pr_id}` | [获取一个拉取请求](#get-v2-devops-prs-pr-id) | 企业令牌 |
| `PUT` | `/v2/devops/prs/{pr_id}` | [全量更新一个拉取请求](#put-v2-devops-prs-pr-id) | 企业令牌 |
| `PATCH` | `/v2/devops/prs/{pr_id}` | [部分更新一个拉取请求](#patch-v2-devops-prs-pr-id) | 企业令牌 |
| `GET` | `/v2/devops/prs` | [获取拉取请求列表](#get-v2-devops-prs) | 企业令牌 |

<a id="post-v2-devops-prs"></a>

### 创建一个拉取请求

`POST /v2/devops/prs` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于创建一个拉取请求。  
 代码仓库内实际的拉取请求，用于在 PingCode 中显示拉取请求的详细信息。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 代码托管平台的 id |
| `repo_id` | string | 是 | 代码仓库的 id |
| `title` | string | 是 | 拉取请求的标题 |
| `number` | number | 是 | 拉取请求的编号。同一代码仓库下，该值是唯一的 |
| `creator_name` | string | 是 | 拉取请求创建者的用户名 |
| `source_branch_id` | string |  | 源分支的 id |
| `target_branch_id` | string | 是 | 目标分支的 id |
| `status` | string | 是 | 拉取请求的状态；枚举："open" / "closed" / "merged" / "abandoned" |
| `description` | string |  | 拉取请求的描述 |
| `merged_at` | number |  | 拉取请求合并的时间。当拉取请求状态为 `merged` 时，该值为必填 |
| `merged_commit_sha` | string |  | 源分支最后一次提交的 SHA 值。当拉取请求状态为 `merged` 时，该值为必填 |
| `merged_by_name` | string |  | 拉取请求合并者的用户名。当拉取请求状态为 `merged` 时，该值为必填 |
| `comments_count` | number |  | 拉取请求的评论数量 |
| `review_comments_count` | number |  | 代码评审的评论数量 |
| `commits_count` | number |  | 代码的提交数量 |
| `additions_count` | number |  | 新增文件的数量 |
| `deletions_count` | number |  | 删除文件的数量 |
| `changed_files_count` | number |  | 更改文件的数量 |
| `workitem_identifiers` | string[] |  | PingCode 工作项编号的列表。通过该参数将拉取请求与一个或多个工作项关联 |

**请求示例**

```json
{
  "product_id": "564587fe700d43b81b080765",
  "repo_id": "564587fe700d43b81b080766",
  "title": "fix(doc): #PLM-001 fix document title",
  "number": 1,
  "creator_name": "terry",
  "description": "Please give some great suggestions",
  "source_branch_id": "564587fe700d43b81b080767",
  "target_branch_id": "564587fe700d43b81b080776",
  "status": "merged",
  "merged_at": 1473018919,
  "merged_commit_sha": "96a024347146ebdc5f481f45e6e6871e0c43af5f",
  "merged_by_name": "terry",
  "workitem_identifiers": [
    "PLM-001"
  ]
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```
同「获取一个拉取请求」响应结构。
```

<a id="get-v2-devops-prs-pr-id"></a>

### 获取一个拉取请求

`GET /v2/devops/prs/{pr_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:code`

用于按 id 获取拉取请求全量信息。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `pr_id` | string | 是 | 拉取请求的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 拉取请求的 id |
| `url` | string | 是 | 拉取请求的资源地址 |
| `product` | object | 是 | 拉取请求的托管平台 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.type` | string |  |  |
| `repository` | object | 是 | 拉取请求的代码仓库 |
| `repository.id` | string |  |  |
| `repository.url` | string |  |  |
| `repository.name` | string |  |  |
| `repository.full_name` | string |  |  |
| `repository.created_at` | number |  |  |
| `title` | string | 是 | 拉取请求的标题 |
| `number` | number | 是 | 拉取请求的编号 |
| `status` | string | 是 | 拉取请求的状态；枚举："open" / "closed" / "merged" / "abandoned" |
| `description` | string | 是 | 拉取请求的描述 |
| `author` | object | 是 | 拉取请求的创建者 |
| `author.id` | string |  |  |
| `author.url` | string |  |  |
| `author.name` | string |  |  |
| `source_branch` | object | 是 | 拉取请求的源分支 |
| `source_branch.id` | string |  |  |
| `source_branch.url` | string |  |  |
| `source_branch.name` | string |  |  |
| `source_branch.created_at` | number |  |  |
| `target_branch` | object | 是 | 拉取请求的目标分支 |
| `target_branch.id` | string |  |  |
| `target_branch.url` | string |  |  |
| `target_branch.name` | string |  |  |
| `target_branch.created_at` | number |  |  |
| `created_at` | number | 是 | 拉取请求的创建时间 |
| `merged_at` | number | 是 | 拉取请求的合并的时间 |
| `merged_commit_sha` | string | 是 | 拉取请求的源分支最后一次提交的 SHA 值 |
| `merged_by` | object | 是 | 拉取请求的合并者 |
| `merged_by.id` | string |  |  |
| `merged_by.url` | string |  |  |
| `merged_by.name` | string |  |  |
| `comments_count` | number | 是 | 拉取请求的评论数量 |
| `review_comments_count` | number | 是 | 拉取请求的代码评审评论数量 |
| `commits_count` | number | 是 | 拉取请求的提交数量 |
| `additions_count` | number | 是 | 拉取请求的新增文件数量 |
| `deletions_count` | number | 是 | 拉取请求的删除文件数量 |
| `changed_files_count` | number | 是 | 拉取请求的更改文件数量 |
| `workitems` | object[] | 是 | 拉取请求关联的 PingCode 的工作项列表 |

**响应示例**

```json
{
  "id": "594587fe700d43b81b080789",
  "url": "https://{rest_api_root}/v2/devops/prs/594587fe700d43b81b080789",
  "product": {
    "id": "564587fe700d43b81b080765",
    "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
    "name": "Github",
    "type": "github"
  },
  "repository": {
    "id": "564587fe700d43b81b080766",
    "url": "https://{rest_api_root}/v2/devops/repos/564587fe700d43b81b080766",
    "name": "ngx-planet",
    "full_name": "worktile/ngx-planet",
    "created_at": 1403018919
  },
  "title": "fix(doc): #PLM-001 fix document title",
  "number": 1,
  "status": "merged",
  "description": "Please give some great suggestions",
  "author": {
    "id": "5666aea91f99e33cb7c44964",
    "url": "https://{rest_api_root}/v2/devops/users/5666aea91f99e33cb7c44964",
    "name": "terry"
  },
  "source_branch": {
    "id": "564587fe700d43b81b080767",
    "url": "https://{rest_api_root}/v2/devops/branches/564587fe700d43b81b080767",
    "name": "terry/#PLM-001",
    "created_at": 1403018919
  },
  "target_branch": {
    "id": "564587fe700d43b81b080776",
    "url": "https://{rest_api_root}/v2/devops/branches/564587fe700d43b81b080776",
    "name": "develop",
    "created_at": 1402018919
  },
  "created_at": 1403014000,
  "merged_at": 1473018919,
  "merged_commit_sha": "96a024347146ebdc5f481f45e6e6871e0c43af5f",
  "merged_by": {
    "id": "5666aea91f99e33cb7c44964",
    "url": "https://{rest_api_root}/v2/devops/users/5666aea91f99e33cb7c44964",
    "name": "terry"
  },
  "comments_count": 2,
  "review_comments_count": 2,
  "commits_count": 2,
  "additions_count": 0,
  "deletions_count": 0,
  "changed_files_count": 3,
  "workitems": []
}
```

<a id="put-v2-devops-prs-pr-id"></a>

### 全量更新一个拉取请求

`PUT /v2/devops/prs/{pr_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于全量更新一个拉取请求。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `pr_id` | string | 是 | 拉取请求的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title` | string | 是 | 拉取请求的标题 |
| `creator_name` | string | 是 | 拉取请求创建者的用户名 |
| `source_branch_id` | string | 是 | 源分支的 id |
| `target_branch_id` | string | 是 | 目标分支的 id |
| `status` | string | 是 | 拉取请求的状态；枚举："open" / "closed" / "merged" / "abandoned" |
| `description` | string |  | 拉取请求的描述 |
| `merged_at` | number |  | 拉取请求合并的时间。当拉取请求状态为 `merged` 时，该值为必填 |
| `merged_commit_sha` | string |  | 源分支最后一次提交的 SHA 值。当拉取请求状态为 `merged` 时，该值为必填 |
| `merged_by_name` | string |  | 拉取请求合并者的用户名。当拉取请求状态为 `merged` 时，该值为必填 |
| `comments_count` | number |  | 拉取请求的评论数量 |
| `review_comments_count` | number |  | 代码评审的评论数量 |
| `commits_count` | number |  | 代码的提交数量 |
| `additions_count` | number |  | 新增文件的数量 |
| `deletions_count` | number |  | 删除文件的数量 |
| `changed_files_count` | number |  | 更改文件的数量 |
| `workitem_identifiers` | string[] |  | PingCode 工作项编号的列表。通过该参数将拉取请求与一个或多个工作项关联 |

**响应**

源文档未提供响应结构。

**响应示例**

```
同「获取一个拉取请求」响应结构。
```

<a id="patch-v2-devops-prs-pr-id"></a>

### 部分更新一个拉取请求

`PATCH /v2/devops/prs/{pr_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于部分更新一个拉取请求。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `pr_id` | string | 是 | 拉取请求的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `status` | string | 是 | 拉取请求的状态；枚举："open" / "closed" / "merged" / "abandoned" |
| `title` | string |  | 拉取请求的标题 |
| `creator_name` | string |  | 拉取请求创建者的用户名 |
| `description` | string |  | 拉取请求的描述 |
| `target_branch_id` | string |  | 目标分支的 id |
| `source_branch_id` | string |  | 源分支的 id |
| `merged_at` | number |  | 拉取请求合并的时间。当拉取请求状态为 `merged` 时，该值为必填 |
| `merged_commit_sha` | string |  | 源分支最后一次提交的 SHA 值。当拉取请求状态为 `merged` 时，该值为必填 |
| `merged_by_name` | string |  | 拉取请求合并者的用户名。当拉取请求状态为 `merged` 时，该值为必填 |
| `comments_count` | number |  | 拉取请求的评论数量 |
| `review_comments_count` | number |  | 代码评审的评论数量 |
| `commits_count` | number |  | 代码的提交数量 |
| `additions_count` | number |  | 新增文件的数量 |
| `deletions_count` | number |  | 删除文件的数量 |
| `changed_files_count` | number |  | 更改文件的数量 |
| `workitem_identifiers` | string[] |  | PingCode 工作项编号的列表。通过该参数将拉取请求与一个或多个工作项关联 |

**响应**

源文档未提供响应结构。

**响应示例**

```
同「获取一个拉取请求」响应结构。
```

<a id="get-v2-devops-prs"></a>

### 获取拉取请求列表

`GET /v2/devops/prs` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:code`

用于分页获取指定仓库的拉取请求列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 代码托管平台的 id |
| `repo_id` | string | 是 | 代码仓库的 id |
| `number` | number |  | 拉取请求的编号 |
| `workitem_id` | string |  | 工作项的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 拉取请求全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].product` | object |  |  |
| `values[].product.id` | string |  |  |
| `values[].product.url` | string |  |  |
| `values[].product.name` | string |  |  |
| `values[].product.type` | string |  |  |
| `values[].repository` | object |  |  |
| `values[].repository.id` | string |  |  |
| `values[].repository.url` | string |  |  |
| `values[].repository.name` | string |  |  |
| `values[].repository.full_name` | string |  |  |
| `values[].repository.created_at` | number |  |  |
| `values[].title` | string |  |  |
| `values[].number` | number |  |  |
| `values[].status` | string |  |  |
| `values[].workitems` | array |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "594587fe700d43b81b080789",
      "url": "https://{rest_api_root}/v2/devops/prs/594587fe700d43b81b080789",
      "product": {
        "id": "564587fe700d43b81b080765",
        "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
        "name": "Github",
        "type": "github"
      },
      "repository": {
        "id": "564587fe700d43b81b080766",
        "url": "https://{rest_api_root}/v2/devops/repos/564587fe700d43b81b080766",
        "name": "ngx-planet",
        "full_name": "worktile/ngx-planet",
        "created_at": 1403018919
      },
      "title": "fix(doc): #PLM-001 fix document title",
      "number": 1,
      "status": "merged",
      "workitems": []
    }
  ]
}
```

## 代码评审

> 分组路径：DevOps_数据集成 / 代码 / 代码评审

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/devops/pr_reviews` | [创建一个代码评审](#post-v2-devops-pr-reviews) | 企业令牌 |
| `GET` | `/v2/devops/pr_reviews/{review_id}` | [获取一个代码评审](#get-v2-devops-pr-reviews-review-id) | 企业令牌 |
| `PUT` | `/v2/devops/pr_reviews/{review_id}` | [全量更新一个代码评审](#put-v2-devops-pr-reviews-review-id) | 企业令牌 |
| `PATCH` | `/v2/devops/pr_reviews/{review_id}` | [部分更新一个代码评审](#patch-v2-devops-pr-reviews-review-id) | 企业令牌 |
| `GET` | `/v2/devops/pr_reviews` | [获取代码评审列表](#get-v2-devops-pr-reviews) | 企业令牌 |

<a id="post-v2-devops-pr-reviews"></a>

### 创建一个代码评审

`POST /v2/devops/pr_reviews` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于创建一个代码评审。  
 拉取请求实际的代码评审记录，用于在 PingCode 中显示代码评审的详细信息。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 代码托管平台的 id |
| `repo_id` | string | 是 | 代码仓库的 id |
| `pr_id` | string | 是 | 拉取请求的 id |
| `status` | string | 是 | 代码评审的状态；枚举："comment" / "approved" / "request_changes" |
| `reviewer_name` | string | 是 | 评审人的用户名 |
| `description` | string |  | 代码评审的描述 |
| `submitted_at` | number | 是 | 提交的时间 |
| `html_url` | string |  | 代码评审的地址。如果为空，在 PingCode 中不显示相关跳转链接 |

**请求示例**

```json
{
  "product_id": "564587fe700d43b81b080765",
  "repo_id": "564587fe700d43b81b080766",
  "pr_id": "594587fe700d43b81b080789",
  "status": "approved",
  "reviewer_name": "anytao",
  "description": "Review has approved",
  "submitted_at": 1403014111,
  "html_url": "https://github.com/worktile/ngx-planet/pull/127#pullrequestreview-384383294"
}
```

**响应**

源文档未提供响应结构。

**响应示例**

```
同「获取一个代码评审」响应结构。
```

<a id="get-v2-devops-pr-reviews-review-id"></a>

### 获取一个代码评审

`GET /v2/devops/pr_reviews/{review_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:code`

用于按 id 获取一个代码评审。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `review_id` | string | 是 | 代码评审的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 代码评审的 id |
| `url` | string | 是 | 代码评审的资源地址 |
| `html_url` | string | 是 | 代码评审的地址 |
| `product` | object | 是 | 代码评审的托管平台 |
| `product.id` | string |  |  |
| `product.url` | string |  |  |
| `product.name` | string |  |  |
| `product.type` | string |  |  |
| `repository` | object | 是 | 代码评审的代码仓库 |
| `repository.id` | string |  |  |
| `repository.url` | string |  |  |
| `repository.name` | string |  |  |
| `repository.full_name` | string |  |  |
| `repository.created_at` | number |  |  |
| `pull_request` | object | 是 | 代码评审的拉取请求 |
| `pull_request.id` | string |  |  |
| `pull_request.url` | string |  |  |
| `pull_request.number` | number |  |  |
| `reviewer` | object | 是 | 代码评审的评审人 |
| `reviewer.id` | string |  |  |
| `reviewer.url` | string |  |  |
| `reviewer.name` | string |  |  |
| `status` | string | 是 | 代码评审的状态；枚举："comment" / "approved" / "request_changes" |
| `description` | string | 是 | 代码评审的描述 |
| `submitted_at` | number | 是 | 代码评审的提交时间 |

**响应示例**

```json
{
  "id": "524587fe700d43b81b080988",
  "url": "https://{rest_api_root}/v2/devops/pr_reviews/524587fe700d43b81b080988",
  "html_url": "https://github.com/worktile/ngx-planet/pull/127#pullrequestreview-384383294",
  "product": {
    "id": "564587fe700d43b81b080765",
    "url": "https://{rest_api_root}/v2/devops/products/564587fe700d43b81b080765",
    "name": "Github",
    "type": "github"
  },
  "repository": {
    "id": "564587fe700d43b81b080766",
    "url": "https://{rest_api_root}/v2/devops/repos/564587fe700d43b81b080766",
    "name": "ngx-planet",
    "full_name": "worktile/ngx-planet",
    "created_at": 1403018919
  },
  "pull_request": {
    "id": "594587fe700d43b81b080789",
    "url": "https://{rest_api_root}/v2/devops/prs/594587fe700d43b81b080789",
    "number": 1
  },
  "reviewer": {
    "id": "5999aea91f99e33cb7c44964",
    "url": "https://{rest_api_root}/v2/devops/users/5999aea91f99e33cb7c44964",
    "name": "anytao"
  },
  "status": "approved",
  "description": "Review has approved",
  "submitted_at": 1403014111
}
```

<a id="put-v2-devops-pr-reviews-review-id"></a>

### 全量更新一个代码评审

`PUT /v2/devops/pr_reviews/{review_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于全量更新一个代码评审。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `review_id` | string | 是 | 代码评审的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `reviewer_name` | string | 是 | 评审人的用户名 |
| `status` | string | 是 | 代码评审的状态；枚举："comment" / "approved" / "request_changes" |
| `submitted_at` | number | 是 | 提交的时间 |
| `description` | string |  | 代码评审的描述 |
| `html_url` | string |  | 代码评审的地址。如果为空，在 PingCode 中不显示相关跳转链接 |

**响应**

源文档未提供响应结构。

**响应示例**

```
同「获取一个代码评审」响应结构。
```

<a id="patch-v2-devops-pr-reviews-review-id"></a>

### 部分更新一个代码评审

`PATCH /v2/devops/pr_reviews/{review_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:code`

用于部分更新一个代码评审。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `review_id` | string | 是 | 代码评审的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `reviewer_name` | string |  | 评审人的用户名 |
| `status` | string |  | 代码评审的状态；枚举："comment" / "approved" / "request_changes" |
| `description` | string |  | 代码评审的描述 |
| `submitted_at` | number |  | 提交的时间 |
| `html_url` | string |  | 代码评审的地址。如果为空，在 PingCode 中不显示相关跳转链接 |

**响应**

源文档未提供响应结构。

**响应示例**

```
同「获取一个代码评审」响应结构。
```

<a id="get-v2-devops-pr-reviews"></a>

### 获取代码评审列表

`GET /v2/devops/pr_reviews` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:code`

用于分页获取指定拉取请求的代码评审列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `product_id` | string | 是 | 代码托管平台的 id |
| `repo_id` | string | 是 | 代码仓库的 id |
| `pr_id` | string | 是 | 拉取请求的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 代码评审全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].html_url` | string |  |  |
| `values[].status` | string |  |  |
| `values[].description` | string |  |  |
| `values[].submitted_at` | number |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "524587fe700d43b81b080988",
      "url": "https://{rest_api_root}/v2/devops/pr_reviews/524587fe700d43b81b080988",
      "html_url": "https://github.com/worktile/ngx-planet/pull/127#pullrequestreview-384383294",
      "status": "approved",
      "description": "Review has approved",
      "submitted_at": 1403014111
    }
  ]
}
```

## 构建记录

> 分组路径：DevOps_数据集成 / 构建 / 构建记录

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/devops/builds` | [创建一条构建记录](#post-v2-devops-builds) | 企业令牌 |
| `GET` | `/v2/devops/builds/{build_id}` | [获取一条构建记录](#get-v2-devops-builds-build-id) | 企业令牌 |
| `PUT` | `/v2/devops/builds/{build_id}` | [全量更新一条构建记录](#put-v2-devops-builds-build-id) | 企业令牌 |
| `PATCH` | `/v2/devops/builds/{build_id}` | [部分更新一条构建记录](#patch-v2-devops-builds-build-id) | 企业令牌 |
| `GET` | `/v2/devops/builds` | [获取构建记录列表](#get-v2-devops-builds) | 企业令牌 |
| `DELETE` | `/v2/devops/builds/{build_id}` | [删除一条构建记录](#delete-v2-devops-builds-build-id) | 企业令牌 |

<a id="post-v2-devops-builds"></a>

### 创建一条构建记录

`POST /v2/devops/builds` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:build`

用于创建一条构建记录。  
 企业内实际的构建记录，用于在 PingCode 中显示构建的详细信息。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 构建的名称 |
| `identifier` | string | 是 | 构建的编号 |
| `job_url` | string |  | 构建任务的地址。如果为空，在 PingCode 中不显示相关跳转链接 |
| `provider` | string | 是 | 构建工具的名称；枚举："bamboo" / "bitbucket" / "jenkins" / "other" |
| `result_overview` | string |  | 构建结果的概述 |
| `result_url` | string |  | 构建结果的地址。如果为空，在 PingCode 中不显示相关的跳转链接 |
| `start_at` | number | 是 | 构建开始的时间 |
| `end_at` | number | 是 | 构建结束的时间 |
| `duration` | number | 是 | 构建持续的时间。单位为秒 |
| `status` | string | 是 | 构建的状态；枚举："success" / "failure" |
| `workitem_identifiers` | string[] |  | PingCode 工作项编号的列表。通过该参数将构建与一个或多个工作项关联 |
| `start` | object |  |  |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object |  |  |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |

**请求示例**

```json
{
  "name": "unit-test",
  "identifier": "131",
  "job_url": "https://your-job-url",
  "provider": "jenkins",
  "result_overview": "1000 test cases pass",
  "result_url": "https://your-result-url",
  "start": {
    "date": 1583290309,
    "with_time": 1
  },
  "due": {
    "date": 1583290347,
    "with_time": 1
  },
  "duration": 38,
  "status": "success",
  "workitem_identifiers": [
    "PLM-001"
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 构建记录的 id |
| `url` | string | 是 | 构建记录的资源地址 |
| `name` | string | 是 | 构建记录的名称 |
| `identifier` | string | 是 | 构建记录的编号 |
| `job_url` | string | 是 | 构建任务的地址 |
| `provider` | string | 是 | 构建工具的名称；枚举："bamboo" / "bitbucket" / "jenkins" / "other" |
| `result_overview` | string | 是 | 构建结果的概述 |
| `result_url` | string | 是 | 构建结果的地址 |
| `start_at` | number | 是 | 构建开始的时间 |
| `status` | string | 是 | 构建的状态；枚举："success" / "failure" / "unknown" |
| `end_at` | number | 是 | 构建结束的时间 |
| `duration` | number | 是 | 构建持续的时间，单位为秒 |
| `workitems` | object[] | 是 | 构建关联的 PingCode 工作项列表 |
| `workitems[].id` | string |  |  |
| `workitems[].url` | string |  |  |
| `workitems[].short_id` | string |  |  |
| `workitems[].html_url` | string |  |  |
| `workitems[].identifier` | string |  |  |
| `workitems[].title` | string |  |  |
| `workitems[].start` | object |  |  |
| `workitems[].start.date` | number |  |  |
| `workitems[].start.with_time` | number |  |  |
| `workitems[].due` | object |  |  |
| `workitems[].due.date` | number |  |  |
| `workitems[].due.with_time` | number |  |  |
| `workitems[].parent_id` | string |  |  |
| `workitems[].properties` | object |  |  |
| `workitems[].properties.prop_a` | string |  |  |
| `workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080765",
  "url": "https://{rest_api_root}/v2/devops/builds/564587fe700d43b81b080765",
  "name": "unit-test",
  "identifier": "131",
  "job_url": "https://your-job-url",
  "provider": "jenkins",
  "result_overview": "1000 test cases pass",
  "result_url": "https://your-result-url",
  "start_at": 1583290309,
  "status": "success",
  "end_at": 1583290347,
  "duration": 38,
  "workitems": [
    {
      "id": "564587fe700d43b81b080ab8",
      "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
      "short_id": "c9WqLmTO",
      "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
      "identifier": "PLM-001",
      "title": "这是一个用户故事",
      "start": {
        "date": 1583290309,
        "with_time": 1
      },
      "due": {
        "date": 1583290347,
        "with_time": 1
      },
      "parent_id": "5edca524cad2fa112b06105c",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      }
    }
  ]
}
```

<a id="get-v2-devops-builds-build-id"></a>

### 获取一条构建记录

`GET /v2/devops/builds/{build_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:build`

用于按 id 获取一条构建记录。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `build_id` | string | 是 | 构建记录的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 构建记录的 id |
| `url` | string | 是 | 构建记录的资源地址 |
| `identifier` | string | 是 | 构建记录的编号 |
| `name` | string | 是 | 构建记录的名称 |
| `job_url` | string | 是 | 构建任务的地址 |
| `provider` | string | 是 | 构建工具的名称；枚举："bamboo" / "bitbucket" / "jenkins" / "other" |
| `result_overview` | string | 是 | 构建结果的概述 |
| `result_url` | string | 是 | 构建结果的地址 |
| `start_at` | number | 是 | 构建开始的时间 |
| `end_at` | number | 是 | 构建结束的时间 |
| `status` | string | 是 | 构建的状态；枚举："success" / "failure" / "unknown" |
| `duration` | number | 是 | 构建持续的时间，单位为秒 |
| `workitems` | object[] | 是 | 构建关联的 PingCode 的工作项列表 |
| `workitems[].id` | string |  |  |
| `workitems[].url` | string |  |  |
| `workitems[].short_id` | string |  |  |
| `workitems[].html_url` | string |  |  |
| `workitems[].identifier` | string |  |  |
| `workitems[].title` | string |  |  |
| `workitems[].start` | object |  |  |
| `workitems[].start.date` | number |  |  |
| `workitems[].start.with_time` | number |  |  |
| `workitems[].due` | object |  |  |
| `workitems[].due.date` | number |  |  |
| `workitems[].due.with_time` | number |  |  |
| `workitems[].parent_id` | string |  |  |
| `workitems[].properties` | object |  |  |
| `workitems[].properties.prop_a` | string |  |  |
| `workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080765",
  "url": "https://{rest_api_root}/v2/devops/builds/564587fe700d43b81b080765",
  "identifier": "131",
  "name": "unit-test",
  "job_url": "https://your-job-url",
  "provider": "jenkins",
  "result_overview": "1000 test cases pass",
  "result_url": "https://your-result-url",
  "start_at": 1583290309,
  "status": "success",
  "end_at": 1583290347,
  "duration": 38,
  "workitems": [
    {
      "id": "564587fe700d43b81b080ab8",
      "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
      "short_id": "c9WqLmTO",
      "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
      "identifier": "PLM-001",
      "title": "这是一个用户故事",
      "start": {
        "date": 1583290309,
        "with_time": 1
      },
      "due": {
        "date": 1583290347,
        "with_time": 1
      },
      "parent_id": "5edca524cad2fa112b06105c",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      }
    }
  ]
}
```

<a id="put-v2-devops-builds-build-id"></a>

### 全量更新一条构建记录

`PUT /v2/devops/builds/{build_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:build`

用于全量更新一条构建记录。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `build_id` | string | 是 | 构建的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 构建的名称 |
| `identifier` | string | 是 | 构建的编号 |
| `job_url` | string |  | 构建任务的地址。如果为空，在 PingCode 中不显示相关跳转链接 |
| `provider` | string | 是 | 构建工具的名称；枚举："bamboo" / "bitbucket" / "jenkins" / "other" |
| `result_overview` | string |  | 构建结果的概述 |
| `result_url` | string |  | 构建结果的地址。如果为空，在 PingCode 中不显示相关的跳转链接 |
| `start_at` | number | 是 | 构建开始的时间 |
| `end_at` | number | 是 | 构建结束的时间 |
| `duration` | number | 是 | 构建持续的时间。单位为秒 |
| `status` | string | 是 | 构建的状态；枚举："success" / "failure" |
| `workitem_identifiers` | string[] |  | PingCode 工作项编号的列表。通过该参数将构建与一个或多个工作项关联 |
| `start` | object |  |  |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object |  |  |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |

**请求示例**

```json
{
  "name": "unit-test",
  "identifier": "131",
  "job_url": "https://your-job-url",
  "provider": "jenkins",
  "result_overview": "1000 test cases pass",
  "result_url": "https://your-result-url",
  "start": {
    "date": 1583290309,
    "with_time": 1
  },
  "due": {
    "date": 1583290347,
    "with_time": 1
  },
  "duration": 38,
  "status": "success",
  "workitem_identifiers": [
    "PLM-001"
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 构建记录的 id |
| `url` | string | 是 | 构建记录的资源地址 |
| `identifier` | string | 是 | 构建记录的编号 |
| `name` | string | 是 | 构建记录的名称 |
| `job_url` | string | 是 | 构建任务的地址 |
| `provider` | string | 是 | 构建工具的名称；枚举："bamboo" / "bitbucket" / "jenkins" / "other" |
| `result_overview` | string | 是 | 构建结果的概述 |
| `result_url` | string | 是 | 构建结果的地址 |
| `start_at` | number | 是 | 构建开始的时间 |
| `status` | string | 是 | 构建的状态；枚举："success" / "failure" / "unknown" |
| `end_at` | number | 是 | 构建结束的时间 |
| `duration` | number | 是 | 构建持续的时间，单位为秒 |
| `workitems` | object[] | 是 | 构建关联的 PingCode 工作项列表 |
| `workitems[].id` | string |  |  |
| `workitems[].url` | string |  |  |
| `workitems[].short_id` | string |  |  |
| `workitems[].html_url` | string |  |  |
| `workitems[].identifier` | string |  |  |
| `workitems[].title` | string |  |  |
| `workitems[].start` | object |  |  |
| `workitems[].start.date` | number |  |  |
| `workitems[].start.with_time` | number |  |  |
| `workitems[].due` | object |  |  |
| `workitems[].due.date` | number |  |  |
| `workitems[].due.with_time` | number |  |  |
| `workitems[].parent_id` | string |  |  |
| `workitems[].properties` | object |  |  |
| `workitems[].properties.prop_a` | string |  |  |
| `workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080765",
  "url": "https://{rest_api_root}/v2/devops/builds/564587fe700d43b81b080765",
  "identifier": "131",
  "name": "unit-test",
  "job_url": "https://your-job-url",
  "provider": "jenkins",
  "result_overview": "1000 test cases pass",
  "result_url": "https://your-result-url",
  "start_at": 1583290309,
  "status": "success",
  "end_at": 1583290347,
  "duration": 38,
  "workitems": [
    {
      "id": "564587fe700d43b81b080ab8",
      "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
      "short_id": "c9WqLmTO",
      "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
      "identifier": "PLM-001",
      "title": "这是一个用户故事",
      "start": {
        "date": 1583290309,
        "with_time": 1
      },
      "due": {
        "date": 1583290347,
        "with_time": 1
      },
      "parent_id": "5edca524cad2fa112b06105c",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      }
    }
  ]
}
```

<a id="patch-v2-devops-builds-build-id"></a>

### 部分更新一条构建记录

`PATCH /v2/devops/builds/{build_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:build`

用于部分更新一条构建记录。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `build_id` | string | 是 | 构建的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 构建的名称 |
| `identifier` | string |  | 构建的编号 |
| `job_url` | string |  | 构建任务的地址。如果为空，在 PingCode 中不显示相关跳转链接 |
| `provider` | string |  | 构建工具的名称；枚举："bamboo" / "bitbucket" / "jenkins" / "other" |
| `result_overview` | string |  | 构建结果的概述 |
| `result_url` | string |  | 构建结果的地址。如果为空，在 PingCode 中不显示相关的跳转链接 |
| `start_at` | number |  | 构建开始的时间 |
| `end_at` | number |  | 构建结束的时间 |
| `status` | string |  | 构建的状态；枚举："success" / "failure" |
| `duration` | number |  | 构建持续的时间。单位为秒 |
| `workitem_identifiers` | string[] |  | PingCode 工作项编号的列表。通过该参数将构建与一个或多个工作项关联 |
| `start` | object |  |  |
| `start.date` | number |  |  |
| `start.with_time` | number |  |  |
| `due` | object |  |  |
| `due.date` | number |  |  |
| `due.with_time` | number |  |  |

**请求示例**

```json
{
  "name": "unit-test",
  "identifier": "131",
  "job_url": "https://your-job-url",
  "provider": "jenkins",
  "result_overview": "1000 test cases pass",
  "result_url": "https://your-result-url",
  "start": {
    "date": 1583290309,
    "with_time": 1
  },
  "due": {
    "date": 1583290347,
    "with_time": 1
  },
  "status": "success",
  "duration": 38,
  "workitem_identifiers": [
    "PLM-001"
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 构建记录的 id |
| `url` | string | 是 | 构建记录的资源地址 |
| `identifier` | string | 是 | 构建记录的编号 |
| `name` | string | 是 | 构建记录的名称 |
| `job_url` | string | 是 | 构建任务的地址 |
| `provider` | string | 是 | 构建工具的名称；枚举："bamboo" / "bitbucket" / "jenkins" / "other" |
| `result_overview` | string | 是 | 构建结果的概述 |
| `result_url` | string | 是 | 构建结果的地址 |
| `start_at` | number | 是 | 构建开始的时间 |
| `status` | string | 是 | 构建的状态；枚举："success" / "failure" / "unknown" |
| `end_at` | number | 是 | 构建结束的时间 |
| `duration` | number | 是 | 构建持续的时间，单位为秒 |
| `workitems` | object[] | 是 | 构建关联的 PingCode 工作项列表 |
| `workitems[].id` | string |  |  |
| `workitems[].url` | string |  |  |
| `workitems[].short_id` | string |  |  |
| `workitems[].html_url` | string |  |  |
| `workitems[].identifier` | string |  |  |
| `workitems[].title` | string |  |  |
| `workitems[].start` | object |  |  |
| `workitems[].start.date` | number |  |  |
| `workitems[].start.with_time` | number |  |  |
| `workitems[].due` | object |  |  |
| `workitems[].due.date` | number |  |  |
| `workitems[].due.with_time` | number |  |  |
| `workitems[].parent_id` | string |  |  |
| `workitems[].properties` | object |  |  |
| `workitems[].properties.prop_a` | string |  |  |
| `workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080765",
  "url": "https://{rest_api_root}/v2/devops/builds/564587fe700d43b81b080765",
  "identifier": "131",
  "name": "unit-test",
  "job_url": "https://your-job-url",
  "provider": "jenkins",
  "result_overview": "1000 test cases pass",
  "result_url": "https://your-result-url",
  "start_at": 1583290309,
  "status": "failure",
  "end_at": 1583290347,
  "duration": 38,
  "workitems": [
    {
      "id": "564587fe700d43b81b080ab8",
      "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
      "short_id": "c9WqLmTO",
      "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
      "identifier": "PLM-001",
      "title": "这是一个用户故事",
      "start": {
        "date": 1583290309,
        "with_time": 1
      },
      "due": {
        "date": 1583290347,
        "with_time": 1
      },
      "parent_id": "5edca524cad2fa112b06105c",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      }
    }
  ]
}
```

<a id="get-v2-devops-builds"></a>

### 获取构建记录列表

`GET /v2/devops/builds` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:build`

用于分页获取构建记录列表。

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 构建记录全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].identifier` | string |  |  |
| `values[].name` | string |  |  |
| `values[].job_url` | string |  |  |
| `values[].provider` | string |  |  |
| `values[].result_overview` | string |  |  |
| `values[].result_url` | string |  |  |
| `values[].start_at` | number |  |  |
| `values[].status` | string |  |  |
| `values[].end_at` | number |  |  |
| `values[].duration` | number |  |  |
| `values[].workitems` | object[] |  |  |
| `values[].workitems[].id` | string |  |  |
| `values[].workitems[].url` | string |  |  |
| `values[].workitems[].short_id` | string |  |  |
| `values[].workitems[].html_url` | string |  |  |
| `values[].workitems[].identifier` | string |  |  |
| `values[].workitems[].title` | string |  |  |
| `values[].workitems[].start` | object |  |  |
| `values[].workitems[].start.date` | number |  |  |
| `values[].workitems[].start.with_time` | number |  |  |
| `values[].workitems[].due` | object |  |  |
| `values[].workitems[].due.date` | number |  |  |
| `values[].workitems[].due.with_time` | number |  |  |
| `values[].workitems[].parent_id` | string |  |  |
| `values[].workitems[].properties` | object |  |  |
| `values[].workitems[].properties.prop_a` | string |  |  |
| `values[].workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "564587fe700d43b81b080765",
      "url": "https://{rest_api_root}/v2/devops/builds/564587fe700d43b81b080765",
      "identifier": "131",
      "name": "unit-test",
      "job_url": "https://your-job-url",
      "provider": "jenkins",
      "result_overview": "1000 test cases pass",
      "result_url": "https://your-result-url",
      "start_at": 1583290309,
      "status": "success",
      "end_at": 1583290347,
      "duration": 38,
      "workitems": [
        {
          "id": "564587fe700d43b81b080ab8",
          "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
          "short_id": "c9WqLmTO",
          "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
          "identifier": "PLM-001",
          "title": "这是一个用户故事",
          "start": {
            "date": 1583290309,
            "with_time": 1
          },
          "due": {
            "date": 1583290347,
            "with_time": 1
          },
          "parent_id": "5edca524cad2fa112b06105c",
          "properties": {
            "prop_a": "prop_a_value",
            "prop_b": "prop_b_value"
          }
        }
      ]
    }
  ]
}
```

<a id="delete-v2-devops-builds-build-id"></a>

### 删除一条构建记录

`DELETE /v2/devops/builds/{build_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:build`

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `build_id` | string | 是 | 构建的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 构建记录的 id |
| `url` | string | 是 | 构建记录的资源地址 |
| `identifier` | string | 是 | 构建记录的编号 |
| `name` | string | 是 | 构建记录的名称 |
| `job_url` | string | 是 | 构建任务的地址 |
| `provider` | string | 是 | 构建工具的名称；枚举："bamboo" / "bitbucket" / "jenkins" / "other" |
| `result_overview` | string | 是 | 构建结果的概述 |
| `result_url` | string | 是 | 构建结果的地址 |
| `start_at` | number | 是 | 构建开始的时间 |
| `status` | string | 是 | 构建的状态；枚举："success" / "failure" / "unknown" |
| `end_at` | number | 是 | 构建结束的时间 |
| `duration` | number | 是 | 构建持续的时间，单位为秒 |
| `workitems` | object[] | 是 | 构建关联的 PingCode 工作项列表 |
| `workitems[].id` | string |  |  |
| `workitems[].url` | string |  |  |
| `workitems[].short_id` | string |  |  |
| `workitems[].html_url` | string |  |  |
| `workitems[].identifier` | string |  |  |
| `workitems[].title` | string |  |  |
| `workitems[].start` | object |  |  |
| `workitems[].start.date` | number |  |  |
| `workitems[].start.with_time` | number |  |  |
| `workitems[].due` | object |  |  |
| `workitems[].due.date` | number |  |  |
| `workitems[].due.with_time` | number |  |  |
| `workitems[].parent_id` | string |  |  |
| `workitems[].properties` | object |  |  |
| `workitems[].properties.prop_a` | string |  |  |
| `workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080765",
  "url": "https://{rest_api_root}/v2/devops/builds/564587fe700d43b81b080765",
  "identifier": "131",
  "name": "unit-test",
  "job_url": "https://your-job-url",
  "provider": "jenkins",
  "result_overview": "1000 test cases pass",
  "result_url": "https://your-result-url",
  "start_at": 1583290309,
  "status": "success",
  "end_at": 1583290347,
  "duration": 38,
  "workitems": [
    {
      "id": "564587fe700d43b81b080ab8",
      "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
      "short_id": "c9WqLmTO",
      "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
      "identifier": "PLM-001",
      "title": "这是一个用户故事",
      "start": {
        "date": 1583290309,
        "with_time": 1
      },
      "due": {
        "date": 1583290347,
        "with_time": 1
      },
      "parent_id": "5edca524cad2fa112b06105c",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      }
    }
  ]
}
```

## 环境

> 分组路径：DevOps_数据集成 / 交付 / 环境

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/devops/environments` | [创建一个环境](#post-v2-devops-environments) | 企业令牌 |
| `GET` | `/v2/devops/environments/{env_id}` | [获取一个环境](#get-v2-devops-environments-env-id) | 企业令牌 |
| `PUT` | `/v2/devops/environments/{env_id}` | [全量更新一个环境](#put-v2-devops-environments-env-id) | 企业令牌 |
| `PATCH` | `/v2/devops/environments/{env_id}` | [部分更新一个环境](#patch-v2-devops-environments-env-id) | 企业令牌 |
| `GET` | `/v2/devops/environments` | [获取环境列表](#get-v2-devops-environments) | 企业令牌 |
| `DELETE` | `/v2/devops/environments/{env_id}` | [删除一个环境](#delete-v2-devops-environments-env-id) | 企业令牌 |

<a id="post-v2-devops-environments"></a>

### 创建一个环境

`POST /v2/devops/environments` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:deploy`

用于创建一个环境。  
 企业内实际的部署环境，用于在 PingCode 中显示各个环境的部署信息。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 环境的名称。同一团队内，环境的名称是唯一的 |
| `html_url` | string |  | 环境的地址。如果为空，在 PingCode 中不显示相关跳转链接 |

**请求示例**

```json
{
  "name": "Production",
  "html_url": "https://your-environment-url"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 环境的 id |
| `url` | string | 是 | 环境的资源地址 |
| `html_url` | string | 是 | 环境的真实地址 |
| `name` | string | 是 | 环境的名称 |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080123",
  "url": "https://{rest_api_root}/v2/devops/environments/564587fe700d43b81b080123",
  "html_url": "https://your-environment-url",
  "name": "Production"
}
```

<a id="get-v2-devops-environments-env-id"></a>

### 获取一个环境

`GET /v2/devops/environments/{env_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:deploy`

用于按 id 获取一个部署环境。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `env_id` | string | 是 | 环境的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 环境的 id |
| `url` | string | 是 | 环境的资源地址 |
| `html_url` | string | 是 | 环境的真实地址 |
| `name` | string | 是 | 环境的名称 |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080123",
  "url": "https://{rest_api_root}/v2/devops/environments/564587fe700d43b81b080123",
  "html_url": "https://your-environment-url",
  "name": "Production"
}
```

<a id="put-v2-devops-environments-env-id"></a>

### 全量更新一个环境

`PUT /v2/devops/environments/{env_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:deploy`

用于全量更新一个部署环境。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `env_id` | string | 是 | 环境的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 环境的名称。同一团队内，环境的名称是唯一的 |
| `html_url` | string |  | 环境的地址。如果为空，在 PingCode 中不显示相关跳转链接 |

**请求示例**

```json
{
  "name": "Production",
  "html_url": "https://your-environment-url"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 环境的 id |
| `url` | string | 是 | 环境的资源地址 |
| `html_url` | string | 是 | 环境的真实地址 |
| `name` | string | 是 | 环境的名称 |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080123",
  "url": "https://{rest_api_root}/v2/devops/environments/564587fe700d43b81b080123",
  "html_url": "https://your-environment-url",
  "name": "Production"
}
```

<a id="patch-v2-devops-environments-env-id"></a>

### 部分更新一个环境

`PATCH /v2/devops/environments/{env_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:deploy`

用于部分更新一个部署环境。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `env_id` | string | 是 | 环境的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string |  | 环境的名称。同一团队内，环境的名称是唯一的 |
| `html_url` | string |  | 环境的地址。如果为空，在 PingCode 中不显示相关跳转链接 |

**请求示例**

```json
{
  "name": "Production",
  "html_url": "https://your-environment-url"
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 环境的 id |
| `url` | string | 是 | 环境的资源地址 |
| `html_url` | string | 是 | 环境的真实地址 |
| `name` | string | 是 | 环境的名称 |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080123",
  "url": "https://{rest_api_root}/v2/devops/environments/564587fe700d43b81b080123",
  "html_url": "https://your-environment-url",
  "name": "Production"
}
```

<a id="get-v2-devops-environments"></a>

### 获取环境列表

`GET /v2/devops/environments` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:deploy`

用于分页获取部署环境列表。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 环境的名称 |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 环境全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].html_url` | string |  |  |
| `values[].name` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "564587fe700d43b81b080123",
      "url": "https://{rest_api_root}/v2/devops/environments/564587fe700d43b81b080123",
      "html_url": "https://your-environment-url",
      "name": "Production"
    }
  ]
}
```

<a id="delete-v2-devops-environments-env-id"></a>

### 删除一个环境

`DELETE /v2/devops/environments/{env_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:deploy`

用于删除部署环境。  
 删除前需先删除该环境下的部署记录。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `env_id` | string | 是 | 环境的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 环境的 id |
| `url` | string | 是 | 环境的资源地址 |
| `html_url` | string | 是 | 环境的真实地址 |
| `name` | string | 是 | 环境的名称 |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080123",
  "url": "https://{rest_api_root}/v2/devops/environments/564587fe700d43b81b080123",
  "html_url": "https://your-environment-url",
  "name": "Production"
}
```

## 部署

> 分组路径：DevOps_数据集成 / 交付 / 部署

| 方法 | 路径 | 名称 | 令牌 |
| --- | --- | --- | --- |
| `POST` | `/v2/devops/deploys` | [创建一个部署](#post-v2-devops-deploys) | 企业令牌 |
| `GET` | `/v2/devops/deploys/{deploy_id}` | [获取一个部署](#get-v2-devops-deploys-deploy-id) | 企业令牌 |
| `PUT` | `/v2/devops/deploys/{deploy_id}` | [全量更新一个部署](#put-v2-devops-deploys-deploy-id) | 企业令牌 |
| `PATCH` | `/v2/devops/deploys/{deploy_id}` | [部分更新一个部署](#patch-v2-devops-deploys-deploy-id) | 企业令牌 |
| `GET` | `/v2/devops/deploys` | [获取部署列表](#get-v2-devops-deploys) | 企业令牌 |
| `DELETE` | `/v2/devops/deploys/{deploy_id}` | [删除一个部署](#delete-v2-devops-deploys-deploy-id) | 企业令牌 |

<a id="post-v2-devops-deploys"></a>

### 创建一个部署

`POST /v2/devops/deploys` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:deploy`

用于创建一个部署。  
 企业内实际的部署记录，用于在 PingCode 中显示部署的详细信息。

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `status` | string | 是 | 部署的状态；枚举："not_deployed" / "deployed" |
| `env_id` | string | 是 | 环境的 id |
| `release_name` | string | 是 | 发布的名称 |
| `release_url` | string |  | 版本发布的地址。如果为空，在 PingCode 中不显示相关跳转链接 |
| `start_at` | number | 是 | 部署开始的时间 |
| `end_at` | number | 是 | 部署结束的时间 |
| `duration` | number | 是 | 部署持续的时间。单位为秒 |
| `workitem_identifiers` | string[] |  | PingCode 工作项编号的列表。通过该参数将部署与一个或多个工作项关联 |

**请求示例**

```json
{
  "status": "deployed",
  "env_id": "564587fe700d43b81b080123",
  "release_name": "1.1.0",
  "release_url": "https://github.com/worktile/ngx-planet/releases/tag/1.1.0",
  "start_at": 1583143467,
  "end_at": 1583143667,
  "duration": 200,
  "workitem_identifiers": [
    "PLM-001"
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 部署的 id |
| `url` | string | 是 | 部署的资源地址 |
| `status` | string | 是 | 部署的状态；枚举："not_deployed" / "deployed" |
| `release_name` | string | 是 | 发布的名称 |
| `environment` | object | 是 | 环境的引用结构数据 |
| `environment.id` | string |  |  |
| `environment.url` | string |  |  |
| `environment.name` | string |  |  |
| `release_url` | string | 是 | 版本发布的地址 |
| `start_at` | number | 是 | 部署开始的时间 |
| `end_at` | number | 是 | 部署结束的时间 |
| `duration` | number | 是 | 部署持续的时间，单位为秒 |
| `workitems` | object[] | 是 | 部署关联的 PingCode 工作项列表 |
| `workitems[].id` | string |  |  |
| `workitems[].url` | string |  |  |
| `workitems[].short_id` | string |  |  |
| `workitems[].html_url` | string |  |  |
| `workitems[].identifier` | string |  |  |
| `workitems[].title` | string |  |  |
| `workitems[].start` | object |  |  |
| `workitems[].start.date` | number |  |  |
| `workitems[].start.with_time` | number |  |  |
| `workitems[].due` | object |  |  |
| `workitems[].due.date` | number |  |  |
| `workitems[].due.with_time` | number |  |  |
| `workitems[].parent_id` | string |  |  |
| `workitems[].properties` | object |  |  |
| `workitems[].properties.prop_a` | string |  |  |
| `workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080339",
  "url": "https://{rest_api_root}/v2/devops/deploys/564587fe700d43b81b080339",
  "status": "deployed",
  "release_name": "1.1.0",
  "environment": {
    "id": "564587fe700d43b81b080123",
    "url": "https://{rest_api_root}/v2/devops/environments/564587fe700d43b81b080123",
    "name": "Production"
  },
  "release_url": "https://github.com/worktile/ngx-planet/releases/tag/1.1.0",
  "start_at": 1583143467,
  "end_at": 1583143667,
  "duration": 200,
  "workitems": [
    {
      "id": "564587fe700d43b81b080ab8",
      "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
      "short_id": "c9WqLmTO",
      "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
      "identifier": "PLM-001",
      "title": "这是一个用户故事",
      "start": {
        "date": 1583290309,
        "with_time": 1
      },
      "due": {
        "date": 1583290347,
        "with_time": 1
      },
      "parent_id": "5edca524cad2fa112b06105c",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      }
    }
  ]
}
```

<a id="get-v2-devops-deploys-deploy-id"></a>

### 获取一个部署

`GET /v2/devops/deploys/{deploy_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:deploy`

用于按 id 获取一条部署记录。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `deploy_id` | string | 是 | 部署的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 部署的 id |
| `url` | string | 是 | 部署的资源地址 |
| `status` | string | 是 | 部署的状态；枚举："not_deployed" / "deployed" |
| `release_name` | string | 是 | 发布的名称 |
| `environment` | object | 是 | 发布的环境 |
| `environment.id` | string |  |  |
| `environment.url` | string |  |  |
| `environment.name` | string |  |  |
| `release_url` | string | 是 | 版本发布的地址 |
| `start_at` | number | 是 | 部署开始的时间 |
| `end_at` | number | 是 | 部署结束的时间 |
| `duration` | number | 是 | 部署持续的时间。单位为秒 |
| `workitems` | object[] | 是 | 部署关联的 PingCode 的工作项列表 |
| `workitems[].id` | string |  |  |
| `workitems[].url` | string |  |  |
| `workitems[].short_id` | string |  |  |
| `workitems[].html_url` | string |  |  |
| `workitems[].identifier` | string |  |  |
| `workitems[].title` | string |  |  |
| `workitems[].start` | object |  |  |
| `workitems[].start.date` | number |  |  |
| `workitems[].start.with_time` | number |  |  |
| `workitems[].due` | object |  |  |
| `workitems[].due.date` | number |  |  |
| `workitems[].due.with_time` | number |  |  |
| `workitems[].parent_id` | string |  |  |
| `workitems[].properties` | object |  |  |
| `workitems[].properties.prop_a` | string |  |  |
| `workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080339",
  "url": "https://{rest_api_root}/v2/devops/deploys/564587fe700d43b81b080339",
  "status": "deployed",
  "release_name": "1.1.0",
  "environment": {
    "id": "564587fe700d43b81b080123",
    "url": "https://{rest_api_root}/v2/devops/environments/564587fe700d43b81b080123",
    "name": "Production"
  },
  "release_url": "https://github.com/worktile/ngx-planet/releases/tag/1.1.0",
  "start_at": 1583143467,
  "end_at": 1583143667,
  "duration": 200,
  "workitems": [
    {
      "id": "564587fe700d43b81b080ab8",
      "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
      "short_id": "c9WqLmTO",
      "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
      "identifier": "PLM-001",
      "title": "这是一个用户故事",
      "start": {
        "date": 1583290309,
        "with_time": 1
      },
      "due": {
        "date": 1583290347,
        "with_time": 1
      },
      "parent_id": "5edca524cad2fa112b06105c",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      }
    }
  ]
}
```

<a id="put-v2-devops-deploys-deploy-id"></a>

### 全量更新一个部署

`PUT /v2/devops/deploys/{deploy_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:deploy`

用于全量更新一条部署记录。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `deploy_id` | string | 是 | 部署的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `status` | string | 是 | 部署的状态；枚举："not_deployed" / "deployed" |
| `env_id` | string | 是 | 环境的 id |
| `release_name` | string | 是 | 版本发布的名称 |
| `release_url` | string |  | 版本发布的地址。如果为空，在 PingCode 中不显示相关跳转链接 |
| `start_at` | number | 是 | 部署开始的时间 |
| `end_at` | number | 是 | 部署结束的时间 |
| `duration` | number | 是 | 部署持续的时间。单位为秒 |
| `workitem_identifiers` | string[] |  | PingCode 工作项编号的列表。通过该参数将部署与一个或多个工作项关联 |

**请求示例**

```json
{
  "status": "deployed",
  "env_id": "564587fe700d43b81b080123",
  "release_name": "1.1.0",
  "release_url": "https://your-release-host/release",
  "start_at": 1583143467,
  "end_at": 1583143667,
  "duration": 200,
  "workitem_identifiers": [
    "PLM-001"
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 部署的 id |
| `url` | string | 是 | 部署的资源地址 |
| `status` | string | 是 | 部署的状态；枚举："not_deployed" / "deployed" |
| `release_name` | string | 是 | 发布的名称 |
| `environment` | object | 是 | 环境的引用结构数据 |
| `environment.id` | string |  |  |
| `environment.url` | string |  |  |
| `environment.name` | string |  |  |
| `release_url` | string | 是 | 版本发布的地址 |
| `start_at` | number | 是 | 部署开始的时间 |
| `end_at` | number | 是 | 部署结束的时间 |
| `duration` | number | 是 | 部署持续的时间，单位为秒 |
| `workitems` | object[] | 是 | 部署关联的 PingCode 工作项列表 |
| `workitems[].id` | string |  |  |
| `workitems[].url` | string |  |  |
| `workitems[].short_id` | string |  |  |
| `workitems[].html_url` | string |  |  |
| `workitems[].identifier` | string |  |  |
| `workitems[].title` | string |  |  |
| `workitems[].start` | object |  |  |
| `workitems[].start.date` | number |  |  |
| `workitems[].start.with_time` | number |  |  |
| `workitems[].due` | object |  |  |
| `workitems[].due.date` | number |  |  |
| `workitems[].due.with_time` | number |  |  |
| `workitems[].parent_id` | string |  |  |
| `workitems[].properties` | object |  |  |
| `workitems[].properties.prop_a` | string |  |  |
| `workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080339",
  "url": "https://{rest_api_root}/v2/devops/deploys/564587fe700d43b81b080339",
  "status": "deployed",
  "release_name": "1.1.0",
  "environment": {
    "id": "564587fe700d43b81b080123",
    "url": "https://{rest_api_root}/v2/devops/environments/564587fe700d43b81b080123",
    "name": "Production"
  },
  "release_url": "https://your-release-host/release",
  "start_at": 1583143467,
  "end_at": 1583143667,
  "duration": 200,
  "workitems": [
    {
      "id": "564587fe700d43b81b080ab8",
      "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
      "short_id": "c9WqLmTO",
      "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
      "identifier": "PLM-001",
      "title": "这是一个用户故事",
      "start": {
        "date": 1583290309,
        "with_time": 1
      },
      "due": {
        "date": 1583290347,
        "with_time": 1
      },
      "parent_id": "5edca524cad2fa112b06105c",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      }
    }
  ]
}
```

<a id="patch-v2-devops-deploys-deploy-id"></a>

### 部分更新一个部署

`PATCH /v2/devops/deploys/{deploy_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:deploy`

用于部分更新一条部署记录。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `deploy_id` | string | 是 | 部署的 id |

**请求体**（`application/json`）

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `status` | string |  | 部署的状态；枚举："not_deployed" / "deployed" |
| `env_id` | string |  | 环境的 id |
| `release_name` | string |  | 版本发布的名称 |
| `release_url` | string |  | 版本发布的地址。如果为空，在 PingCode 中不显示相关跳转链接 |
| `start_at` | number |  | 部署开始的时间 |
| `end_at` | number |  | 部署结束的时间 |
| `duration` | number |  | 部署持续的时间。单位为秒 |
| `workitem_identifiers` | string[] |  | PingCode 工作项编号的列表。通过该参数将部署与一个或多个工作项关联 |

**请求示例**

```json
{
  "status": "deployed",
  "env_id": "564587fe700d43b81b080123",
  "release_name": "1.1.0",
  "release_url": "https://github.com/worktile/ngx-planet/releases/tag/1.1.0",
  "start_at": 1583143467,
  "end_at": 1583143667,
  "duration": 200,
  "workitem_identifiers": [
    "PLM-001"
  ]
}
```

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 部署的 id |
| `url` | string | 是 | 部署的资源地址 |
| `status` | string | 是 | 部署的状态；枚举："not_deployed" / "deployed" |
| `release_name` | string | 是 | 发布的名称 |
| `environment` | object | 是 | 环境的引用结构数据 |
| `environment.id` | string |  |  |
| `environment.url` | string |  |  |
| `environment.name` | string |  |  |
| `release_url` | string | 是 | 版本发布的地址 |
| `start_at` | number | 是 | 部署开始的时间 |
| `end_at` | number | 是 | 部署结束的时间 |
| `duration` | number | 是 | 部署持续的时间，单位为秒 |
| `workitems` | object[] | 是 | 部署关联的 PingCode 工作项列表 |
| `workitems[].id` | string |  |  |
| `workitems[].url` | string |  |  |
| `workitems[].short_id` | string |  |  |
| `workitems[].html_url` | string |  |  |
| `workitems[].identifier` | string |  |  |
| `workitems[].title` | string |  |  |
| `workitems[].start` | object |  |  |
| `workitems[].start.date` | number |  |  |
| `workitems[].start.with_time` | number |  |  |
| `workitems[].due` | object |  |  |
| `workitems[].due.date` | number |  |  |
| `workitems[].due.with_time` | number |  |  |
| `workitems[].parent_id` | string |  |  |
| `workitems[].properties` | object |  |  |
| `workitems[].properties.prop_a` | string |  |  |
| `workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080339",
  "url": "https://{rest_api_root}/v2/devops/deploys/564587fe700d43b81b080339",
  "status": "deployed",
  "release_name": "1.1.0",
  "environment": {
    "id": "564587fe700d43b81b080123",
    "url": "https://{rest_api_root}/v2/devops/environments/564587fe700d43b81b080123",
    "name": "Production"
  },
  "release_url": "https://github.com/worktile/ngx-planet/releases/tag/1.1.0",
  "start_at": 1583143467,
  "end_at": 1583143667,
  "duration": 200,
  "workitems": [
    {
      "id": "564587fe700d43b81b080ab8",
      "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
      "short_id": "c9WqLmTO",
      "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
      "identifier": "PLM-001",
      "title": "这是一个用户故事",
      "start": {
        "date": 1583290309,
        "with_time": 1
      },
      "due": {
        "date": 1583290347,
        "with_time": 1
      },
      "parent_id": "5edca524cad2fa112b06105c",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      }
    }
  ]
}
```

<a id="get-v2-devops-deploys"></a>

### 获取部署列表

`GET /v2/devops/deploys` ｜ 令牌：企业令牌 ｜ Scope：`pcp:read:devops:deploy`

用于分页获取部署列表，可按环境过滤。

**查询参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `env_id` | string |  | 环境的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `page_size` | number | 是 | 每页条数 |
| `page_index` | number | 是 | 页码，从 0 开始 |
| `total` | number | 是 | 总条数 |
| `values` | object[] | 是 | 部署的全量结构数据的数组 |
| `values[].id` | string |  |  |
| `values[].url` | string |  |  |
| `values[].status` | string |  |  |
| `values[].release_name` | string |  |  |
| `values[].environment` | object |  |  |
| `values[].environment.id` | string |  |  |
| `values[].environment.url` | string |  |  |
| `values[].environment.name` | string |  |  |
| `values[].release_url` | string |  |  |
| `values[].start_at` | number |  |  |
| `values[].end_at` | number |  |  |
| `values[].duration` | number |  |  |
| `values[].workitems` | object[] |  |  |
| `values[].workitems[].id` | string |  |  |
| `values[].workitems[].url` | string |  |  |
| `values[].workitems[].short_id` | string |  |  |
| `values[].workitems[].html_url` | string |  |  |
| `values[].workitems[].identifier` | string |  |  |
| `values[].workitems[].title` | string |  |  |
| `values[].workitems[].start` | object |  |  |
| `values[].workitems[].start.date` | number |  |  |
| `values[].workitems[].start.with_time` | number |  |  |
| `values[].workitems[].due` | object |  |  |
| `values[].workitems[].due.date` | number |  |  |
| `values[].workitems[].due.with_time` | number |  |  |
| `values[].workitems[].parent_id` | string |  |  |
| `values[].workitems[].properties` | object |  |  |
| `values[].workitems[].properties.prop_a` | string |  |  |
| `values[].workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "page_size": 30,
  "page_index": 0,
  "total": 1,
  "values": [
    {
      "id": "564587fe700d43b81b080339",
      "url": "https://{rest_api_root}/v2/devops/deploys/564587fe700d43b81b080339",
      "status": "deployed",
      "release_name": "1.1.0",
      "environment": {
        "id": "564587fe700d43b81b080123",
        "url": "https://{rest_api_root}/v2/devops/environments/564587fe700d43b81b080123",
        "name": "Production"
      },
      "release_url": "https://github.com/worktile/ngx-planet/releases/tag/1.1.0",
      "start_at": 1583143467,
      "end_at": 1583143667,
      "duration": 200,
      "workitems": [
        {
          "id": "564587fe700d43b81b080ab8",
          "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
          "short_id": "c9WqLmTO",
          "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
          "identifier": "PLM-001",
          "title": "这是一个用户故事",
          "start": {
            "date": 1583290309,
            "with_time": 1
          },
          "due": {
            "date": 1583290347,
            "with_time": 1
          },
          "parent_id": "5edca524cad2fa112b06105c",
          "properties": {
            "prop_a": "prop_a_value",
            "prop_b": "prop_b_value"
          }
        }
      ]
    }
  ]
}
```

<a id="delete-v2-devops-deploys-deploy-id"></a>

### 删除一个部署

`DELETE /v2/devops/deploys/{deploy_id}` ｜ 令牌：企业令牌 ｜ Scope：`pcp:write:devops:deploy`

用于按 id 删除一条部署记录。

**路径参数**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `deploy_id` | string | 是 | 部署的 id |

**响应**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 部署的 id |
| `url` | string | 是 | 部署的资源地址 |
| `status` | string | 是 | 部署的状态；枚举："not_deployed" / "deployed" |
| `release_name` | string | 是 | 发布的名称 |
| `environment` | object | 是 | 环境的引用结构数据 |
| `environment.id` | string |  |  |
| `environment.url` | string |  |  |
| `environment.name` | string |  |  |
| `release_url` | string | 是 | 版本发布的地址 |
| `start_at` | number | 是 | 部署开始的时间 |
| `end_at` | number | 是 | 部署结束的时间 |
| `duration` | number | 是 | 部署持续的时间，单位为秒 |
| `workitems` | object[] | 是 | 部署关联的 PingCode 工作项列表 |
| `workitems[].id` | string |  |  |
| `workitems[].url` | string |  |  |
| `workitems[].short_id` | string |  |  |
| `workitems[].html_url` | string |  |  |
| `workitems[].identifier` | string |  |  |
| `workitems[].title` | string |  |  |
| `workitems[].start` | object |  |  |
| `workitems[].start.date` | number |  |  |
| `workitems[].start.with_time` | number |  |  |
| `workitems[].due` | object |  |  |
| `workitems[].due.date` | number |  |  |
| `workitems[].due.with_time` | number |  |  |
| `workitems[].parent_id` | string |  |  |
| `workitems[].properties` | object |  |  |
| `workitems[].properties.prop_a` | string |  |  |
| `workitems[].properties.prop_b` | string |  |  |

**响应示例**

```json
{
  "id": "564587fe700d43b81b080339",
  "url": "https://{rest_api_root}/v2/devops/deploys/564587fe700d43b81b080339",
  "status": "deployed",
  "release_name": "1.1.0",
  "environment": {
    "id": "564587fe700d43b81b080123",
    "url": "https://{rest_api_root}/v2/devops/environments/564587fe700d43b81b080123",
    "name": "Production"
  },
  "release_url": "https://github.com/worktile/ngx-planet/releases/tag/1.1.0",
  "start_at": 1583143467,
  "end_at": 1583143667,
  "duration": 200,
  "workitems": [
    {
      "id": "564587fe700d43b81b080ab8",
      "url": "https://{rest_api_root}/v2/pjm/workitems/564587fe700d43b81b080ab8",
      "short_id": "c9WqLmTO",
      "html_url": "https://yctech.pingcode.com/pjm/workitems/c9WqLmTO",
      "identifier": "PLM-001",
      "title": "这是一个用户故事",
      "start": {
        "date": 1583290309,
        "with_time": 1
      },
      "due": {
        "date": 1583290347,
        "with_time": 1
      },
      "parent_id": "5edca524cad2fa112b06105c",
      "properties": {
        "prop_a": "prop_a_value",
        "prop_b": "prop_b_value"
      }
    }
  ]
}
```
