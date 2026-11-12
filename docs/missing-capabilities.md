# pingcode-mcp 能力缺口清单

> 记录时间：2026-11-11
> 基线：11 个固定工具、27 条路由白名单（GET 24 / POST 5 / PATCH 1）
> 依据：本仓库源码 + 本次会话对真实租户的实测

## 说明

本清单区分两类缺口：

- **设计排除**：明确不做，属于项目边界（见第 3 节），不建议补。
- **实现缺口**：协议或业务上需要、但当前白名单与工具集未覆盖，可以补。

每条给出：现状、实测表现、影响、候选实现。优先级分 P0（阻塞日常使用）、P1（明显影响效率）、P2（锦上添花）。

## 1. 总览

| 编号 | 缺口 | 类型 | 优先级 |
| --- | --- | --- | --- |
| A1 | 无法修改已有页面正文 | 实现缺口 | **P0** |
| A2 | 无法在页面顶部/中部插入内容 | 实现缺口 | **P0** |
| B1 | 分组节点（`type: group`）不能作为父页 | 实现缺口 | **P0** |
| B2 | 无页面删除 / 移动 / 重命名 | 实现缺口 | P1 |
| C1 | 无全文搜索，`title_contains` 只过滤当前页 | 实现缺口 | P1 |
| F4 | 上游错误体被丢弃，400 无法定位 | 实现缺口 | P1 |
| A3 | 无页面版本回滚 / 发布控制 | 实现缺口 | P1 |
| D1 | 附件不能读取 | 实现缺口 | P1 |
| E1 | 工作项不能删除 | 实现缺口 | P1 |
| E2 | 评论不能编辑 / 删除 | 实现缺口 | P1 |
| E4 | 工作项字段白名单偏窄 | 实现缺口 | P1 |
| F1 | 个人令牌过期无预警 | 实现缺口 | P1 |
| E3 | 工作项关系不能删除 | 实现缺口 | P2 |
| D3 | 富内容（导图/白板）不完整 | 设计限制 | P2 |
| E5 | 无批量操作 | 实现缺口 | P2 |
| G1 | 服务器不暴露 MCP resources | 实现缺口 | P2 |
| G2 | 不支持 MCP prompts | 设计排除 | — |
| G3 | 仅 stdio，无 HTTP 传输 | 设计排除 | — |

## 2. 详细条目

### A. 页面内容编辑

#### A1 无法修改已有页面正文（P0）

**现状**：`client.js` 的路由白名单里，Wiki 只有读取（`GET /v2/wiki/pages/{id}`、`/content`、`/versions`）与创建（`POST /v2/wiki/pages`）。`PATCH` 只放行工作项：

```js
PATCH: [route(`/v2/pjm/workitems/${ID}`, [], fields)]
```

工具集也没有 `update_page`。

**影响**：任何"改一下这份文档"的需求都做不了。本次会话中"在 `OpenTac_DIY调查报告` 顶端加入测试内容"正是因此失败。

**候选实现**：新增 `pingcode_update_page`，参数 `page_id`、`expected_updated_at`（乐观并发）、`content`、可选 `name`；`dry_run` 预览；沿用 0600/白名单校验风格。需要先确认官方是否提供页面正文更新端点。

#### A2 无法在页面顶部/中部插入内容（P0）

**现状**：`create_page` 只能新建整页，`content` 上限 32000 字符且拒绝任何 HTML 标签（`rawHTML` 正则）。

**影响**：无法做"追加一段结论""在标题下加提示"这类局部编辑；也没有 `content_template` 之类的插入语义。

**候选实现**：随 A1 一并解决（读 → 改 → 写回），或在客户端提供 `prepend`/`append` 便利参数，但底层仍需 A1 的写接口。

#### A3 无版本回滚 / 发布控制（P1）

**现状**：可列版本（`/versions`）、读指定版本正文，但不能把某版本设为当前，也没有发布/取消发布操作。`create_page` 的返回里 `publication_status` 与 `visibility` 恒为 `unknown`。

**影响**：误改后无法通过工具回滚，只能去网页。

**候选实现**：确认官方的发布/回滚端点后加 `pingcode_publish_page` / `pingcode_restore_page_version`。

#### A4 `create_page` 拒绝原始 HTML（P2）

**现状**：`content` 用正则拦截 `<!--`、`<!doctype`、`<tag>` 等形态。

**影响**：无法写入需要 HTML 的排版（如居中、`<br>`）。这是安全取舍，但会挡住部分正常用法。

**候选实现**：保持拒绝，或在文档中明确"需要 HTML 的页面请在网页编辑"。

### B. 页面组织与生命周期

#### B1 分组节点不能作为父页（P0）

**现状**：`create_page` 在写入前用 `GET /v2/wiki/pages/{parent_id}` 校验父页；但**分组类型节点**（`type: group`）在该端点返回 400。

**实测**：

```
pingcode_get_page(page_id=6af414f81e638b1c83723162)   # OpenTac 分组
→ {"error":"PINGCODE_HTTP_400","status":400}

pingcode_create_page(parent_id=同 id, dry_run=true)
→ {"error":"PINGCODE_HTTP_400","status":400}
```

**影响**：无法把页面建进任何"分组/文件夹"，只能建在空间根目录或用 `document` 作为父页。团队知识库通常按分组组织，因此这是高频阻塞。

**候选实现**：在 `pageMetadata` 之前先判断节点类型；对 `type: group` 跳过页面元数据校验（或改用分组接口），只校验空间归属与归档状态。

#### B2 无页面删除 / 移动 / 重命名（P1）

**现状**：没有对应工具，也没有 `DELETE` 路由。

**影响**：测试页、废弃页只能去网页清理；改标题只能新建再删旧。

**候选实现**：`pingcode_delete_page`、`pingcode_move_page`（改 `parent_id`）、`pingcode_rename_page`（改 `name`），均需 `dry_run`。

### C. 检索

#### C1 无全文搜索（P1）

**现状**：`list_pages` 的 `title_contains` 明确只过滤**当前返回页**：

```json
{"enumerated_in_page": 26, "matched_in_page": 2, "total": 26,
 "title_filter_scope": "returned_page_only", "full_text_search": false}
```

工作项侧 `keywords` 也只匹配编号/标题。

**影响**：找不到"正文里提到某关键词"的页面；空间大时需要自己翻页。

**候选实现**：若官方有搜索端点，加 `pingcode_search`；否则至少提供"遍历全部分页并在客户端过滤"的辅助工具，并明确标注覆盖范围。

#### C2 无跨空间 / 跨项目检索（P2）

**现状**：`list_work_items` 一次最多 5 个项目；`list_pages` 必须给定 `space_id`。

**影响**：不知道目标在哪个空间/项目时无法开始。

#### C3 无按时间/作者的过滤（P2）

**现状**：页面列表不支持 `updated_at` 区间或 `created_by` 过滤；工作项不支持按完成时间过滤。

### D. 富内容与附件

#### D1 附件不能读取（P1）

**现状**：所有响应都标 `attachments_fetched: false`；没有下载端点。

**影响**：报告里的图片、PDF 无法取回，只能看到链接文本。

**候选实现**：新增受控下载工具（固定域名白名单、大小上限、内容类型限制），并把字节写入工作区指定路径。

#### D2 公共图片 token 被禁用（P2）

**现状**：`include_public_image_token` 只允许显式 `false`：

```js
if (query.include_public_image_token !== undefined && query.include_public_image_token !== false)
  throw failure('QUERY_NOT_ALLOWED');
```

**影响**：无法通过签名 URL 在外部渲染图片（这也是有意的安全取舍）。

#### D3 富内容不完整（P2，设计限制）

**现状**：`get_page` 恒带 `RICH_CONTENT_MAY_BE_MISSING`、`MARKDOWN_CONVERSION_MAY_LOSE_LAYOUT`。

**影响**：导图、白板、部分排版无法还原，只能回网页查看。

#### D4 正文窗口与大小上限（P2）

**现状**：读取单次最多 20000 字符（默认 12000），可分窗续读；写入上限 32000 字符。

**影响**：超长文档需要多次读取；超长页面无法一次创建。

### E. 工作项

#### E1 工作项不能删除（P1）

**现状**：无 `DELETE` 路由，无删除工具。

**影响**：误建的工作项只能去网页删。本次 `dry_run` 测试没产生垃圾数据，但真实误操作会留下痕迹。

#### E2 评论不能编辑 / 删除（P1）

**现状**：只有 `pingcode_add_comment`（追加），评论读通过 `get_work_item` 的 `comments` 集合。

**影响**：写错评论无法撤回，只能再补一条说明。

#### E3 工作项关系不能删除（P2）

**现状**：`pingcode_add_relation` 只能建；`/v2/pjm/workitems/{id}/relations` 只有 GET 与 POST。

#### E4 工作项字段白名单偏窄（P1）

**现状**：可写字段固定为

```js
['title', 'description', 'assignee_id', 'state_id', 'priority_id', 'start', 'due', 'parent_id']
```

**缺失**：`tags`、参与者（`participants`）、迭代（`sprint`）、看板/泳道、工时（`workloads`）、自定义属性（`entity_properties`）、关注人。这些在接口返回里有，但工具写不了，也无法通过工具删除或清空（只接受 `null` 以外的值）。

#### E5 无批量操作（P2）

**现状**：创建/更新/评论一次一项。官方文档里存在批量接口（如企业成员批量设置），工作项侧未暴露。

**影响**：批量建任务需要 N 次调用，容易触发限流（公有云企业 RPM 200–500+）。

#### E6 无附件 / 活动记录 / 评审（P2）

**现状**：工作项的附件、活动记录（activity）、评审（review）均未暴露，尽管接口返回里能看到相关字段名。

### F. 凭据与运维

#### F1 个人令牌过期无预警（P1）

**现状**：凭据文件不含可信的过期时间；PAT 过期后第一次调用返回 `PINGCODE_HTTP_401`。`verify` 也不检查有效期。

**影响**：只能在使用时才发现失效。

**候选实现**：`import` 时记录 `obtained_at`（已有），由 `verify` 输出"令牌年龄"提示；或增加可选 `--expires-in` 记录。

#### F2 个人凭据无自动续期（设计排除）

**现状**：`renew` 对个人凭据返回 `PERSONAL_RENEW_UNSUPPORTED`。

**影响**：需要人工重新导入。企业令牌可 `renew`，但需自行安排定时任务。

#### F3 无 scope introspection（P1）

**现状**：官方没有查询令牌权限的接口，只能靠 403 逐项试。`verify` 覆盖团队/项目/空间三项，其余资源未知。

**候选实现**：把 `verify` 扩展成"按工具清单逐项探活"，让缺口一次暴露。

#### F4 上游错误体被丢弃（P1）

**现状**：`safeError()` 只输出 `error`、`status`、`request_id`、`retry_after_seconds`，上游响应体一律丢弃。本次 `PINGCODE_HTTP_400` 就完全无法定位原因。

**影响**：排障只能靠猜。这对 400/422 这类参数错误尤其痛苦。

**候选实现**：在脱敏前提下透出上游 `code` / `message` 字段（官方错误体是 `{"code","message"}`），长度与字段白名单受控。

#### F5 无多凭据 / 多租户切换（P2）

**现状**：一个进程只能读一份凭据文件（`process.argv[2]`）。

**影响**：同时服务两个 PingCode 组织需要起两个进程、两套 MCP 配置。

#### F6 429 不自动重试（设计排除）

**现状**：返回 `retry_after_seconds`，由调用方决定。

**影响**：批量操作需要自己写退避逻辑。

### G. 协议层

#### G1 服务器不暴露 MCP resources（P2）

**现状**：只注册 tools；`list_mcp_resources` 返回 `{"resources":[]}`。

**影响**：客户端无法把 Wiki 页面当作"资源"挂载浏览。

#### G2 不支持 MCP prompts（设计排除）

#### G3 仅 stdio，无 HTTP 传输（设计排除）

**现状**：`server.js` 只接 `StdioServerTransport`。

## 3. 明确不在范围内（不建议补）

以下属于项目刻意设定的边界，补上会改变安全模型：

- 成员、部门、团队、角色、权限管理
- 网页登录态、密码、个人授权码、refresh_token 流程
- 任意 URL / 端点 / 请求头 / token 透传
- 凭据代理、业务数据库、常驻 HTTP 服务
- 搜索/导出以外的管理后台功能
- 自动重试写操作（避免重复创建）
- 附件自动下载与外链自动追踪

## 4. 建议的后续变更（OpenSpec 候选）

| 建议变更名 | 覆盖条目 | 说明 |
| --- | --- | --- |
| `add-page-update` | A1、A2 | 新增 `pingcode_update_page`，含 `dry_run` 与并发校验 |
| `fix-group-page-parent` | B1 | 让 `create_page` 支持分组父级 |
| `add-error-detail` | F4 | 受控透出上游 `code`/`message` |
| `add-page-lifecycle` | B2、A3 | 删除/移动/重命名/版本回滚 |
| `add-workitem-fields` | E2、E3、E4 | 评论与关系管理、字段扩展 |
| `add-full-text-search` | C1、C2 | 若官方支持搜索端点 |
| `add-expiry-hint` | F1、F3 | `verify` 输出令牌年龄与逐工具探活 |

## 5. 附：实测证据

```text
# 1. 无页面更新路由（源码）
client.js: PATCH 仅 /v2/pjm/workitems/{id}

# 2. 分组节点不可读取
pingcode_get_page(6af414f81e638b1c83723162) → PINGCODE_HTTP_400

# 3. create_page 挂分组父级在预览阶段即失败
pingcode_create_page(parent_id=6af414f8..., dry_run=true) → PINGCODE_HTTP_400

# 4. create_page 挂空间根目录成功
pingcode_create_page(space_id=LABDOCS, dry_run=true) → {"dry_run":true,"write_performed":false}
pingcode_create_page(space_id=LABDOCS) → {"write_performed":true, page.id=6af4688195a747e0d5f5828c}

# 5. 标题过滤只作用于当前页
{"enumerated_in_page":26,"matched_in_page":2,"title_filter_scope":"returned_page_only"}

# 6. 上游错误体不返回
{"error":"PINGCODE_HTTP_400","status":400}
```
