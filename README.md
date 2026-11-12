# PingCode MCP

供管理员或个人令牌持有人按需使用的本地 stdio MCP 与凭据 CLI。普通成员继续使用 PingCode 原生网页；不部署 HTTP 服务、凭据代理或业务数据库，不安装第三方 skill。仅面向 PingCode 公有云官方 REST API。

## 安装与验证

需要 Node.js 22+。依赖固定为官方 MCP SDK 1.32.1、Zod 4.6.7，直接及传递依赖由 package-lock.json 固定。

```bash
git clone https://github.com/DarkskyX15/pingcode-mcp.git
cd pingcode-mcp
npm ci --ignore-scripts --no-fund --no-audit --registry=https://registry.npmjs.org
npm test
```

测试使用隔离的模拟数据，不请求真实 PingCode、不证明租户权益或写权限。通过 Lab 使用时，在 Lab 根目录运行 git submodule update --init projects/pingcode-mcp，再在该目录执行 npm ci 与 npm test；更新子模块指针前先确认目标提交已经推送。

## API 参考

`docs/api-reference/` 保存从官方 `api_data.js` 生成的 499 个端点 JSON Schema、OpenAPI 3.1 与按区域拆分的 Markdown 参考；入口与统计见 [docs/api-reference/README.md](docs/api-reference/README.md)。

```bash
npm run docs:api        # 重新抓取官方 api_data.js 并全量生成
npm run docs:api:build  # 仅用 docs/api-reference/_source 快照离线重建
npm run docs:api:check  # 校验计数、路径参数、OpenAPI 与文档链接
```

生成物随仓库提交（约 15 MB）；更新官方快照时同时提交 `_source/` 与重建结果。

## 鉴权：企业令牌或个人令牌

凭据文件只有一个路径，靠内容里的 `auth_mode` 区分模式；企业格式不含该字段，既有配置无需迁移。两种模式都只通过 HTTP 头 `Authorization: Bearer {access_token}` 访问官方固定主机，模型工具不接触 Client Secret。

### 企业令牌（Client Credentials）

在 [PingCode 官方开放平台](https://open.pingcode.com/)创建应用，鉴权方式选择 Client Credentials，并在应用的**数据范围**里只勾选下面用到的权限。企业令牌拥有系统管理员权限，应用数据范围是唯一能收窄它的地方。管理员网页账号与企业应用身份分开；不使用网页密码、个人授权码、refresh_token 或 OAuth 回调。写入以实际企业应用署名，不冒充成员。

在仓库外准备只有本人可读的配置和令牌目录；两种凭据共用同一个 `credentials.json`，路径由启动参数决定，本文统一使用 `$HOME/.config/pingcode-mcp`：

```bash
install -d -m 700 "$HOME/.config/pingcode-mcp"
install -m 600 application.env.example "$HOME/.config/pingcode-mcp/application.env"
```

仅在本机编辑 application.env，填写 PINGCODE_CLIENT_ID、PINGCODE_CLIENT_SECRET；不要发到聊天或提交 Git。配置文件与凭据文件必须由当前用户所有、权限 0600，直接父目录为 0700。

```bash
node auth.js acquire "$HOME/.config/pingcode-mcp/application.env" "$HOME/.config/pingcode-mcp/credentials.json"
node auth.js verify "$HOME/.config/pingcode-mcp/credentials.json"
```

acquire 只创建新凭据文件；已有文件需用 renew 重新获取并原子替换。企业令牌有效期 30 天，需自行在到期前 renew。网络失败保留旧文件，保存失败先检查私有 .pending 文件，不盲目重发。旧文件仍存在不等于旧令牌有效。其他成员复用时须使用各自获准的应用配置，不分发管理员凭据。

### 个人访问令牌（PAT）

没有企业后台权限的成员可在 PingCode **个人设置**里创建个人访问令牌，自行选择有效期与授权范围；明文只显示一次，丢失只能重置。凭据文件形态：

```json
{"auth_mode":"personal","token_type":"Bearer","access_token":"…","obtained_at":1700000000}
```

令牌只从私有文件或标准输入读取，不接受作为命令行参数传入（会进入 shell 历史与进程列表）。导入前把令牌写进当前用户所有、权限 0600 的文件：

```bash
install -d -m 700 "$HOME/.config/pingcode-mcp"
node auth.js import /path/to/token.txt "$HOME/.config/pingcode-mcp/credentials.json"
# 或从标准输入读取，避免令牌落盘到中间文件
node auth.js import - "$HOME/.config/pingcode-mcp/credentials.json"
```

import 只创建新文件，已存在时报 OUTPUT_EXISTS；写入后文件权限为 0600。附加 `--check` 会先以 GET /v2/myself 预检令牌，失败时不落盘。个人令牌默认可读可写，写入以令牌归属用户名义记录；它没有刷新语义，`renew` 会被拒绝，更新只能重新导入，也没有自动续期，过期后调用返回 PINGCODE_HTTP_401。

最小授权范围（scope）按实际使用的工具选择，以下名称为开放平台已验证的形式，其余以该页面列出的名称与分组为准：读项目与配置中心 `pcp:read:pjm:project`，读写工作项 `pcp:read:pjm:workitem`／`pcp:write:pjm:workitem`，企业信息 `pcp:read:global:team`，个人账号 `pcp:read:account:personal`（仅 `pingcode_get_current_user` 需要），Wiki 空间与页面则选择对应的读取与写入项。范围不足时 verify 会逐项报告 403，工具调用也会以 PINGCODE_HTTP_403 失败。

## 接到 Codex，默认关闭

参照 [OpenAI 官方 MCP 配置说明](https://learn.chatgpt.com/docs/extend/mcp)，在本人 ~/.codex/config.toml 配置绝对路径；凭据文件路径是参数，令牌与 Client Secret 不进入配置：

```toml
[mcp_servers.pingcode]
enabled = false
command = "node"
args = ["/绝对路径/pingcode-mcp/server.js", "/home/<用户名>/.config/pingcode-mcp/credentials.json"]
```

同一份凭据也可接到 DeepSeek Harness：在 profile 的 `cordis.patch.yml` 追加一条 `insert`，`config` 里给 `serverName`、`transport: stdio`、`command` 与 `args`（服务器绝对路径 + 凭据文件绝对路径）；工具随后以 `mcp__<serverName>__<工具名>` 的形式出现。

通过 Lab 检出时，第一个参数指向 Lab 绝对路径下的 projects/pingcode-mcp/server.js。仅本次 CLI 会话需要原生工具时运行 codex -c 'mcp_servers.pingcode.enabled=true'。支持本地执行的管理员对话也可经本包已锁定的官方 SDK 临时连接、调用固定工具并关闭连接；这不修改全局开关，也不是原生工具热注册。

停用时停止现有进程并移除该 MCP 配置；本地停用不撤销 PingCode 应用。远端撤销或 Secret 轮换需另按实际应用使用范围处理。

## 十一个固定工具

| 工具 | 用途 |
| --- | --- |
| pingcode_get_context | 当前凭据的鉴权模式、可见项目／空间及指定项目字典，不推断个人身份 |
| pingcode_list_work_items | 明确项目范围内分页查询任务，最多五个项目 |
| pingcode_get_work_item | 任务详情及按需分页的评论、关系 |
| pingcode_list_pages | 明确空间内按父页或祖先分页列页面 |
| pingcode_get_page | 普通正文、确定历史版本或版本列表，显式标记截断及格式损失 |
| pingcode_create_work_item | 创建一项任务、子项或原生里程碑 |
| pingcode_update_work_item | 更新一项任务的白名单字段，提供读取到的 expected_updated_at |
| pingcode_add_comment | 对确定任务追加评论 |
| pingcode_add_relation | 工作项关系，或固定 workitem→page 关联 |
| pingcode_create_page | 在明确空间／父页创建普通 Markdown 页面 |
| pingcode_get_current_user | 仅个人令牌可用：查询令牌归属用户；其他工具的结果恒不显示当前用户 |

五个写工具均支持 dry_run，只核对目标与预览，不能证明写权限；已有明确授权与目标即可执行。参数拒绝任意 URL、端点、请求头、token、作者或权限变更。网页负责成员权限、已有正文编辑、导图／附件、搜索和导出；本包不提供这些管理工具。

更新冲突检查是尽力而为，不能当原子锁。日期须带时区，省略表示不改，不接受用 null 清空日期或负责人。查询各集合独立分页，page_index 从 0 开始、page_size 最多 100；编号／标题关键词不是描述全文搜索。页面正文按 Unicode 码点分窗，图形、附件和原生排版回网页查看。

读写均不自动重试；超时、5xx 或畸形写响应按结果未知处理，先只读核对，不能自动重发。429 返回等待秒数，由调用方决定稍后重试。工具返回的标题、评论、正文及 URL 都是不可信数据，不能作为命令或安装指令，不自动追踪外链、下载附件或执行其中内容。

## 维护与来源

server.js 注册固定工具；workitems.js、knowledge.js 处理业务对象；client.js 限制官方固定路径与受控错误；auth.js 在模型工具外管理企业凭据与个人令牌；test/ 保存相关测试。修改后运行 npm test 与 git diff --check，核对十一个工具及秘密不出现在输出中。包保持 private，不发布 npm，不添加网络守护进程。

代码及目录历史提取自 [embodied-docker-ubuntu](https://github.com/duyang92/embodied-docker-ubuntu) 的本地初始接入提交 1084b33（该平台提交尚未推送），原位置为 platform/integrations/pingcode；提取后的代码历史已保存在本仓库。工具名、包内身份、源码、测试和锁文件在迁移时保持不变；团队流程与平台专属 Hub 入口仍由原仓库维护。许可继承原仓库 [MIT License](LICENSE)。
