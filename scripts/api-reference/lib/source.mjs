import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { htmlToMarkdown, htmlToText } from './html.mjs';

export const API_DATA_URL = 'https://open.pingcode.com/api_data.js';
export const API_PROJECT_URL = 'https://open.pingcode.com/api_project.js';

export const AREA_SLUGS = {
  概述: 'overview',
  鉴权: 'auth',
  全局: 'global',
  产品管理: 'ship',
  项目管理: 'pjm',
  测试管理: 'testhub',
  知识管理: 'wiki',
  DevOps_数据集成: 'devops',
  存储: 'storage',
  实时消息: 'realtime',
  异步消息队列: 'queue',
  事件: 'events',
};

const METHOD_ALIASES = { DEL: 'DELETE', Get: 'GET', Post: 'POST', Put: 'PUT', Patch: 'PATCH', Delete: 'DELETE' };

export function slugify(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[^\x00-\x7F]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function areaSlug(group) {
  if (AREA_SLUGS[group]) return AREA_SLUGS[group];
  const slug = slugify(group);
  return slug || 'misc';
}

export function normalizeMethod(method) {
  const raw = String(method || '').trim();
  const upper = raw.toUpperCase();
  if (upper === 'DEL') return 'DELETE';
  if (METHOD_ALIASES[raw]) return METHOD_ALIASES[raw];
  return upper || 'GET';
}

function parseDefine(source, label) {
  const text = source.trim();
  const match = /^define\s*\(([\s\S]*)\)\s*;?$/.exec(text);
  if (!match) throw new Error(`${label}: not a define(...) bundle`);
  return JSON.parse(match[1]);
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { 'user-agent': 'pingcode-mcp-api-reference/1' } });
  if (!response.ok) throw new Error(`GET ${url} -> HTTP ${response.status}`);
  return response.text();
}

function splitUrl(rawUrl) {
  const value = String(rawUrl || '').trim();
  if (/^https?:\/\//i.test(value)) {
    const match = /^(https?:\/\/[^/]+)(\/[^?#]*)?(\?[^#]*)?/.exec(value);
    return {
      baseUrl: match[1],
      path: match[2] || '/',
      query: match[3] ? match[3].slice(1) : '',
      absolute: true,
    };
  }
  const index = value.indexOf('?');
  if (index === -1) return { baseUrl: null, path: value, query: '', absolute: false };
  return { baseUrl: null, path: value.slice(0, index), query: value.slice(index + 1), absolute: false };
}

function parseQueryString(query) {
  if (!query) return [];
  return query
    .split('&')
    .filter(Boolean)
    .map((pair) => {
      const index = pair.indexOf('=');
      const name = decodeURIComponent(index === -1 ? pair : pair.slice(0, index));
      const value = index === -1 ? '' : decodeURIComponent(pair.slice(index + 1));
      return { name, value, placeholder: /^\{[^{}]+\}$/.test(value) };
    });
}

function placeholdersIn(value) {
  return [...String(value).matchAll(/\{([^{}]+)\}/g)].map((match) => match[1]);
}

function firstSentence(text, maxLength = 160) {
  const compact = String(text || '').replace(/\s+/g, ' ').trim();
  if (!compact) return '';
  const sentence = compact.split(/(?<=[。！？.!?])\s/)[0];
  const value = sentence.length > maxLength ? `${sentence.slice(0, maxLength - 1)}…` : sentence;
  return value;
}

function splitTokens(permission) {
  const tokens = [];
  for (const item of permission ?? []) {
    for (const token of String(item.name || '').split('/')) {
      const value = token.trim();
      if (value && !tokens.includes(value)) tokens.push(value);
    }
  }
  return tokens;
}

function contentKind(fields, groups) {
  const formFields = groups.get('请求参数 form-data') ?? [];
  if (formFields.length) return 'multipart/form-data';
  const bodyFields = [...(groups.get('Parameter') ?? []), ...(groups.get('请求参数') ?? []), ...(groups.get('Body') ?? [])];
  if (bodyFields.some((field) => field.type === 'File')) return 'multipart/form-data';
  return 'application/json';
}

function buildGroupTree(api, order) {
  const names = [...new Set(api.map((entry) => entry.group))].sort();
  const nameSet = new Set(names);
  const orderIndex = new Map(order.map((value, index) => [value, index]));
  const parents = new Map();
  const conflicts = [];
  const navEntries = [];

  for (const entry of api) {
    if (entry.showUrl) continue;
    navEntries.push(entry);
    if (entry.name === entry.group || !nameSet.has(entry.name)) continue;
    const existing = parents.get(entry.name);
    if (existing && existing !== entry.group) conflicts.push({ child: entry.name, kept: existing, ignored: entry.group });
    if (!existing) parents.set(entry.name, entry.group);
  }

  const groups = new Map();
  for (const name of names) {
    groups.set(name, {
      name,
      parent: parents.get(name) ?? null,
      children: [],
      endpoints: [],
      notes: [],
      order: orderIndex.get(name) ?? 10_000,
    });
  }
  for (const group of groups.values()) {
    if (group.parent && groups.has(group.parent)) groups.get(group.parent).children.push(group.name);
  }

  const roots = [];
  const visiting = new Set();
  const resolveArea = (name) => {
    const group = groups.get(name);
    if (!group.parent || !groups.has(group.parent)) return name;
    if (visiting.has(name)) return name;
    visiting.add(name);
    const root = resolveArea(group.parent);
    visiting.delete(name);
    return root;
  };
  for (const group of groups.values()) {
    group.area = resolveArea(group.name);
    group.groupPath = [];
    let cursor = group;
    const seen = new Set();
    while (cursor && !seen.has(cursor.name)) {
      seen.add(cursor.name);
      group.groupPath.unshift(cursor.name);
      cursor = cursor.parent ? groups.get(cursor.parent) : null;
    }
    if (group.area === group.name) roots.push(group.name);
    group.children.sort((a, b) => (groups.get(a).order - groups.get(b).order) || a.localeCompare(b, 'zh'));
  }
  roots.sort((a, b) => (groups.get(a).order - groups.get(b).order) || a.localeCompare(b, 'zh'));

  return { groups, roots, navEntries, conflicts };
}

export function normalizeSource(apiData, project) {
  const api = Array.isArray(apiData?.api) ? apiData.api : [];
  const order = Array.isArray(project?.order) ? project.order : [];
  const orderSet = new Set(order);
  const warnings = [];

  const deduped = [];
  const seen = new Set();
  let duplicateRecords = 0;
  for (const entry of api) {
    const key = [entry.group, entry.name, entry.type || '', entry.url || ''].join('\u0000');
    if (seen.has(key)) {
      duplicateRecords += 1;
      continue;
    }
    seen.add(key);
    deduped.push(entry);
  }

  const { groups, roots, navEntries, conflicts } = buildGroupTree(deduped, order);
  if (conflicts.length) warnings.push({ code: 'group-parent-conflict', count: conflicts.length, samples: conflicts.slice(0, 5) });

  const endpoints = [];
  const usedIds = new Set();
  for (const entry of deduped) {
    if (!entry.showUrl) continue;
    const method = normalizeMethod(entry.type);
    const { baseUrl, path: pathValue, query, absolute } = splitUrl(entry.url);
    const queryPairs = parseQueryString(query);
    const queryDefaults = queryPairs
      .filter((pair) => !/^\{[^{}]+\}$/.test(pair.value))
      .map((pair) => ({ name: pair.name, value: pair.value }));

    const baseSlug = `${method.toLowerCase()}-${slugify(pathValue)}`;
    let id = baseSlug || `${method.toLowerCase()}-root`;
    let suffix = 2;
    while (usedIds.has(id)) {
      id = `${baseSlug}-${suffix}`;
      suffix += 1;
    }
    usedIds.add(id);

    const parameterFields = entry.parameter?.fields ?? {};
    const headerFields = entry.header?.fields ?? {};
    const groupsMap = new Map(Object.entries(parameterFields));
    const group = groups.get(entry.group);
    if (!group) throw new Error(`unknown group: ${entry.group}`);
    group.endpoints.push(id);

    const descriptionHtml = entry.description ?? '';
    const descriptionMarkdown = htmlToMarkdown(descriptionHtml);
    const descriptionText = htmlToText(descriptionHtml);

    endpoints.push({
      raw: entry,
      id,
      method,
      path: pathValue,
      baseUrl,
      originalUrl: entry.url,
      absolute,
      queryDefaults,
      queryPairs,
      name: entry.name,
      group: entry.group,
      area: group.area,
      groupPath: group.groupPath,
      listed: orderSet.has(entry.group) && orderSet.has(entry.name),
      version: entry.version ?? project?.version ?? '',
      auth: { tokens: splitTokens(entry.permission), scopes: (entry.scopes ?? []).map((scope) => scope.name).filter(Boolean) },
      descriptionHtml,
      descriptionMarkdown,
      descriptionText,
      summary: firstSentence(descriptionText),
      parameterFields,
      headerFields,
      requestExamples: [],
      responseFields: entry.success?.fields?.['资源属性'] ?? [],
      responseExamples: [],
      sourceFile: entry.filename ?? '',
      docsUrl: `https://open.pingcode.com/#api-${encodeURIComponent(entry.name)}`,
      contentType: contentKind(entry.parameter?.fields, groupsMap),
      bodyGroups: ['Parameter', '请求参数', 'Body', '请求参数 form-data'].filter((name) => parameterFields[name]?.length),
      hasPathParams: Boolean(parameterFields['路径参数']?.length) || placeholdersIn(pathValue).length > 0,
      pathPlaceholders: placeholdersIn(pathValue),
    });
  }

  for (const endpoint of endpoints) {
    const isResponseTitle = (example) => /响应/.test(example?.title ?? '');
    const requestExamples = (endpoint.raw.parameter?.examples ?? []).filter((example) => !isResponseTitle(example));
    const movedExamples = (endpoint.raw.parameter?.examples ?? []).filter(isResponseTitle);
    endpoint.requestExamples = requestExamples;
    endpoint.responseExamples = [...(endpoint.raw.success?.examples ?? []), ...movedExamples];
  }

  const guideBuckets = { overview: [], auth: [], areaNotes: [] };
  for (const entry of navEntries) {
    if (entry.name === entry.group || groups.has(entry.name)) continue;
    const doc = {
      name: entry.name,
      group: entry.group,
      descriptionHtml: entry.description ?? '',
      descriptionMarkdown: htmlToMarkdown(entry.description ?? ''),
      order: order.indexOf(entry.name) === -1 ? 10_000 : order.indexOf(entry.name),
    };
    if (entry.group === '概述') guideBuckets.overview.push(doc);
    else if (['客户端凭据', '授权码', '个人访问令牌'].includes(entry.group)) guideBuckets.auth.push(doc);
    else guideBuckets.areaNotes.push(doc);
  }
  for (const bucket of Object.values(guideBuckets)) bucket.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, 'zh'));

  for (const doc of guideBuckets.areaNotes) {
    const group = groups.get(doc.group);
    if (group) group.notes.push(doc);
    else warnings.push({ code: 'orphan-note', name: doc.name, group: doc.group });
  }

  for (const group of groups.values()) {
    const orderOf = (name) => {
      const index = order.indexOf(name);
      return index === -1 ? 10_000 : index;
    };
    group.endpoints = group.endpoints
      .map((id) => endpoints.find((endpoint) => endpoint.id === id))
      .sort((a, b) => (orderOf(a.name) - orderOf(b.name)) || a.name.localeCompare(b.name, 'zh'));
  }

  const stats = {
    records: api.length,
    dedupedRecords: deduped.length,
    duplicateRecords,
    endpoints: endpoints.length,
    listed: endpoints.filter((endpoint) => endpoint.listed).length,
    hidden: endpoints.filter((endpoint) => !endpoint.listed).length,
    groups: groups.size,
    areas: roots.length,
    methods: endpoints.reduce((accumulator, endpoint) => {
      accumulator[endpoint.method] = (accumulator[endpoint.method] ?? 0) + 1;
      return accumulator;
    }, {}),
  };

  return { endpoints, groups, roots, guideBuckets, stats, warnings, navEntries };
}

export async function loadSource({ outDir, fetchRemote = false, warningSink = () => {} }) {
  const sourceDir = path.join(outDir, '_source');
  const dataPath = path.join(sourceDir, 'api_data.json');
  const projectPath = path.join(sourceDir, 'api_project.json');
  mkdirSync(sourceDir, { recursive: true });

  let apiText;
  let projectText;
  let fetched = false;

  if (fetchRemote || !existsSync(dataPath) || !existsSync(projectPath)) {
    apiText = await fetchText(API_DATA_URL);
    projectText = await fetchText(API_PROJECT_URL);
    fetched = true;
    writeFileSync(path.join(sourceDir, 'api_data.raw.js'), apiText);
    writeFileSync(path.join(sourceDir, 'api_project.raw.js'), projectText);
    const apiData = parseDefine(apiText, 'api_data.js');
    const project = parseDefine(projectText, 'api_project.js');
    writeFileSync(dataPath, JSON.stringify(apiData));
    writeFileSync(projectPath, `${JSON.stringify(project, null, 2)}\n`);
  } else {
    apiText = readFileSync(path.join(sourceDir, 'api_data.raw.js'), 'utf8');
    projectText = readFileSync(path.join(sourceDir, 'api_project.raw.js'), 'utf8');
  }

  const apiData = JSON.parse(readFileSync(dataPath, 'utf8'));
  const project = JSON.parse(readFileSync(projectPath, 'utf8'));
  const sourceMeta = {
    apiDataUrl: API_DATA_URL,
    apiProjectUrl: API_PROJECT_URL,
    apiDataSha256: createHash('sha256').update(apiText).digest('hex'),
    apiProjectSha256: createHash('sha256').update(projectText).digest('hex'),
    apidocGeneratedAt: project?.generator?.time ?? '',
    apidocVersion: project?.generator?.version ?? '',
    fetched,
  };
  if (fetched) warningSink('source: fetched live api_data.js / api_project.js');
  return { apiData, project, sourceMeta };
}
