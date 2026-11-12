// Markdown reference emitters: per-area docs, guides, README.

import { areaSlug } from './source.mjs';

function escapeCell(value) {
  return String(value ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\n+/g, ' ')
    .trim();
}

function typeParts(schema) {
  if (!schema || !Object.keys(schema).length) return ['any'];
  if (schema.anyOf) return schema.anyOf.flatMap(typeParts);
  if (schema.type === 'array') {
    if (!schema.items || !Object.keys(schema.items).length) return ['array'];
    return [`${typeParts(schema.items).join(' | ')}[]`];
  }
  if (schema.type === 'object') return ['object'];
  if (schema.contentMediaType) return ['string (binary)'];
  if (schema.type) return [schema.type];
  return ['any'];
}

function typeLabel(schema) {
  return [...new Set(typeParts(schema))].join(' | ');
}

function enumHint(schema) {
  if (!Array.isArray(schema.enum) || !schema.enum.length) return '';
  return `枚举：${schema.enum.map((value) => JSON.stringify(value)).join(' / ')}`;
}

function describe(schema) {
  const description = String(schema.description ?? '').replace(/[。；;]\s*$/, '');
  const hint = enumHint(schema);
  return escapeCell([description, hint].filter(Boolean).join('；'));
}

function flattenSchema(schema, prefix = '', rows = [], parentRequired = false) {
  const properties = schema?.properties ?? {};
  const required = new Set(schema?.required ?? []);
  for (const [name, property] of Object.entries(properties)) {
    const path = prefix ? `${prefix}.${name}` : name;
    rows.push({
      field: path,
      type: typeLabel(property),
      required: required.has(name) ? '是' : '',
      description: describe(property),
    });
    if (property.type === 'object' && property.properties) {
      flattenSchema(property, path, rows);
    } else if (property.type === 'array' && property.items?.properties) {
      flattenSchema(property.items, `${path}[]`, rows);
    }
  }
  return rows;
}

export function renderSchemaTable(schema, { empty = '（无）' } = {}) {
  const rows = flattenSchema(schema);
  if (!rows.length) return `${empty}\n`;
  const lines = ['| 字段 | 类型 | 必填 | 说明 |', '| --- | --- | --- | --- |'];
  for (const row of rows) {
    lines.push(`| \`${escapeCell(row.field)}\` | ${escapeCell(row.type)} | ${row.required} | ${row.description} |`);
  }
  return `${lines.join('\n')}\n`;
}

function jsonBlock(value) {
  return `\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\`\n`;
}

function renderExamples(examples, label) {
  const usable = examples.filter((example) => Object.hasOwn(example, 'value') || example.raw);
  if (!usable.length) return '';
  const chunks = [];
  for (const [index, example] of usable.entries()) {
    const title = example.name ? example.name.replace(/[：:]\s*$/, '') : label;
    const heading = usable.length > 1 ? `**${label} ${index + 1}：${title}**` : `**${label}**`;
    if (Object.hasOwn(example, 'value')) chunks.push(`${heading}\n\n${jsonBlock(example.value)}`);
    else chunks.push(`${heading}\n\n\`\`\`\n${example.raw}\n\`\`\`\n`);
  }
  return chunks.join('\n');
}

export function renderEndpoint(endpoint, schemas) {
  const lines = [];
  lines.push(`<a id="${endpoint.id}"></a>`);
  lines.push('');
  lines.push(`### ${endpoint.name}`);
  lines.push('');
  const displayPath = endpoint.baseUrl ? `${endpoint.baseUrl}${endpoint.path}` : endpoint.path;
  const meta = [`\`${endpoint.method} ${displayPath}\``];
  if (endpoint.auth.tokens.length) meta.push(`令牌：${endpoint.auth.tokens.join(' / ')}`);
  if (endpoint.auth.scopes.length) meta.push(`Scope：${endpoint.auth.scopes.map((scope) => `\`${scope}\``).join('、')}`);
  if (!endpoint.listed) meta.push('**未公开端点**');
  lines.push(meta.join(' ｜ '));
  lines.push('');
  if (endpoint.baseUrl) {
    lines.push(`服务地址：\`${endpoint.baseUrl}\`${endpoint.originalUrl !== endpoint.path ? `（源 URL：\`${endpoint.originalUrl}\`）` : ''}`);
    lines.push('');
  }
  if (endpoint.descriptionMarkdown) {
    lines.push(endpoint.descriptionMarkdown);
    lines.push('');
  }

  const pathRows = flattenSchema(schemas.pathSchema);
  if (pathRows.length) {
    lines.push('**路径参数**');
    lines.push('');
    lines.push(renderSchemaTable(schemas.pathSchema));
  }
  const queryRows = flattenSchema(schemas.querySchema);
  if (queryRows.length) {
    lines.push('**查询参数**');
    lines.push('');
    lines.push(renderSchemaTable(schemas.querySchema));
  }
  const headerRows = flattenSchema(schemas.headerSchema);
  if (headerRows.length) {
    lines.push('**请求头**');
    lines.push('');
    lines.push(renderSchemaTable(schemas.headerSchema));
  }
  const bodyRows = flattenSchema(schemas.bodySchema);
  if (bodyRows.length) {
    lines.push(`**请求体**（\`${endpoint.contentType}\`）`);
    lines.push('');
    lines.push(renderSchemaTable(schemas.bodySchema));
    const examples = renderExamples(schemas.requestExamples, '请求示例');
    if (examples) lines.push(examples);
  }

  lines.push('**响应**');
  lines.push('');
  lines.push(renderSchemaTable(schemas.responseSchema, { empty: '源文档未提供响应结构。' }));
  const responseExamples = renderExamples(schemas.responseExamples, '响应示例');
  if (responseExamples) lines.push(responseExamples);

  return `${lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
}

export function renderAreaDoc({ root, groups, groupNotes }) {
  const rootGroup = groups.get(root);
  const leafGroups = [];
  const collect = (name) => {
    const group = groups.get(name);
    if (!group) return;
    if (group.endpoints.length || group.notes.length) leafGroups.push(group);
    for (const child of group.children) collect(child);
  };
  collect(root);

  const endpointCount = leafGroups.reduce((sum, group) => sum + group.endpoints.length, 0);
  const hiddenCount = leafGroups.reduce((sum, group) => sum + group.endpoints.filter((endpoint) => !endpoint.listed).length, 0);

  const lines = [];
  lines.push(`# ${root}`);
  lines.push('');
  lines.push(`> 区域 \`${areaSlug(root)}\`（${root}） ｜ ${leafGroups.length} 个内容分组 ｜ ${endpointCount} 个端点${hiddenCount ? `（未公开 ${hiddenCount}）` : ''}`);
  lines.push('');
  lines.push('[← 返回 API 总览](../README.md)');
  lines.push('');

  for (const group of leafGroups) {
    if (group.name !== root) {
      lines.push(`## ${group.name}`);
      lines.push('');
      if (group.groupPath.length > 1) {
        lines.push(`> 分组路径：${group.groupPath.join(' / ')}`);
        lines.push('');
      }
    }
    for (const note of group.notes) {
      if (!note.descriptionMarkdown.trim()) continue;
      lines.push(`### ${note.name}`);
      lines.push('');
      lines.push(note.descriptionMarkdown);
      lines.push('');
    }
    if (group.endpoints.length) {
      lines.push('| 方法 | 路径 | 名称 | 令牌 |');
      lines.push('| --- | --- | --- | --- |');
      for (const endpoint of group.endpoints) {
        lines.push(
          `| \`${endpoint.method}\` | \`${endpoint.path}\` | [${escapeCell(endpoint.name)}](#${endpoint.id}) | ${endpoint.auth.tokens.join(' / ')} |`,
        );
      }
      lines.push('');
    }
    for (const endpoint of group.endpoints) {
      lines.push(renderEndpoint(endpoint, group.schemas.get(endpoint.id)));
    }
  }

  return `${lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
}

export function renderGuide({ title, subtitle, docs, backLink = '../README.md' }) {
  const lines = [`# ${title}`, ''];
  if (subtitle) {
    lines.push(`> ${subtitle}`);
    lines.push('');
  }
  lines.push(`[← 返回 API 总览](${backLink})`);
  lines.push('');
  for (const doc of docs) {
    lines.push(`## ${doc.name}`);
    lines.push('');
    lines.push(doc.descriptionMarkdown);
    lines.push('');
  }
  return `${lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
}

export function renderReadme({ project, stats, sourceMeta, areas, endpoints, groups, counts }) {
  const hidden = endpoints.filter((endpoint) => !endpoint.listed);
  const lines = [];
  lines.push('# PingCode REST API V2 端点参考');
  lines.push('');
  lines.push(
    '本目录由 [open.pingcode.com](https://open.pingcode.com/) 的 `api_data.js` 生成：每个端点一份 JSON Schema 文档，另附 OpenAPI 3.1 与按区域拆分的 Markdown 参考。',
  );
  lines.push('');
  lines.push('## 统计');
  lines.push('');
  lines.push('| 项目 | 数量 |');
  lines.push('| --- | --- |');
  lines.push(`| 端点 | ${stats.endpoints} |`);
  lines.push(`| 公开（出现在官方导航） | ${stats.listed} |`);
  lines.push(`| 未公开（数据中存在、导航中隐藏） | ${stats.hidden} |`);
  lines.push(`| 分组 | ${stats.groups} |`);
  lines.push(`| 区域 | ${stats.areas} |`);
  lines.push(`| 源记录（含文档/导航页） | ${stats.records} |`);
  lines.push(`| OpenAPI 操作 | ${counts.openapiOperations} |`);
  lines.push('');
  lines.push('同路径同方法的多变体接口（OAuth 授权、附件上传）在 OpenAPI 中合并为一个操作，变体列表见 `x-pingcode.variants`；单端点 JSON 仍保持一一对应。');
  lines.push('');
  lines.push('## 鉴权');
  lines.push('');
  lines.push('- 请求头：`Authorization: Bearer {access_token}`。');
  lines.push('- 企业令牌（Client Credentials）拥有管理员身份；用户令牌（授权码 / 个人访问令牌）以用户身份执行。');
  lines.push('- 每个端点标注所需令牌类型与 scope（`pcp:<read|write>:<domain>:<resource>`）。实际调用还受应用数据范围与用户权限限制。');
  lines.push('- 详细流程见 [鉴权指南](guides/auth.md)，通用约定见 [概述指南](guides/overview.md)。');
  lines.push('');
  lines.push('## 目录');
  lines.push('');
  lines.push('| 区域 | 目录 | 端点数 | 未公开 | 说明 |');
  lines.push('| --- | --- | --- | --- | --- |');
  for (const area of areas) {
    lines.push(
      `| ${area.name} | [\`${area.slug}\`](groups/${area.slug}.md) | ${area.endpoints} | ${area.hidden} | ${area.groups} 个分组 |`,
    );
  }
  lines.push('');
  lines.push('## 未公开端点');
  lines.push('');
  lines.push('以下端点存在于 `api_data.js`，但未出现在官方导航（`api_project.order`）中，调用前请自行确认可用性。');
  lines.push('');
  lines.push('| 方法 | 路径 | 名称 | 分组 |');
  lines.push('| --- | --- | --- | --- |');
  for (const endpoint of hidden) {
    lines.push(
      `| \`${endpoint.method}\` | \`${endpoint.path}\` | [${escapeCell(endpoint.name)}](groups/${areaSlug(endpoint.area)}.md#${endpoint.id}) | ${endpoint.group} |`,
    );
  }
  lines.push('');
  lines.push('## 文件结构');
  lines.push('');
  lines.push('```text');
  lines.push('README.md                 本文件');
  lines.push('catalog.json              端点索引（id / 方法 / 路径 / 分组 / 鉴权 / scope / 文件位置）');
  lines.push('openapi.json              OpenAPI 3.1（可直接导入 Postman、Insomnia、Redoc 等）');
  lines.push('endpoints/<area>/<id>.json  单端点 JSON Schema 文档（请求 / 响应 / 示例）');
  lines.push('groups/<area>.md          按区域拆分的可读参考');
  lines.push('guides/*.md               概述与鉴权指南');
  lines.push('_source/                  源数据快照与清单（api_data / api_project）');
  lines.push('```');
  lines.push('');
  lines.push('单端点 JSON 的根是 `pingcode-endpoint/1` 容器，`request.*.schema` 与 `response.schema` 为 JSON Schema 2020-12；`meta` 携带方法、路径、令牌、scope、分组路径、源文件等。');
  lines.push('');
  lines.push('## 生成与校验');
  lines.push('');
  lines.push('```bash');
  lines.push('npm run docs:api         # 拉取 api_data.js 并重建');
  lines.push('npm run docs:api:build   # 仅用 _source 快照离线重建');
  lines.push('npm run docs:api:check   # 校验计数、路径参数、OpenAPI、示例');
  lines.push('```');
  lines.push('');
  lines.push('## 来源');
  lines.push('');
  lines.push(`- 源：${sourceMeta.apiDataUrl} / ${sourceMeta.apiProjectUrl}`);
  lines.push(`- apiDoc 生成时间：${sourceMeta.apidocGeneratedAt || '未知'}（apiDoc ${sourceMeta.apidocVersion || '未知'}）`);
  lines.push(`- api_data.js SHA-256：\`${sourceMeta.apiDataSha256}\``);
  lines.push(`- api_project.js SHA-256：\`${sourceMeta.apiProjectSha256}\``);

  return `${lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
}
