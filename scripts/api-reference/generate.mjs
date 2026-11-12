#!/usr/bin/env node
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { renderAreaDoc, renderGuide, renderReadme } from './lib/docs.mjs';
import { buildOpenApi } from './lib/openapi.mjs';
import { buildEndpointSchemas } from './lib/schema.mjs';
import { areaSlug, loadSource, normalizeSource } from './lib/source.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, '..', '..');

function parseArgs(argv) {
  const options = { fetchRemote: false, outDir: path.join(REPO_ROOT, 'docs', 'api-reference') };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--fetch') options.fetchRemote = true;
    else if (arg === '--out') {
      options.outDir = path.resolve(argv[index + 1]);
      index += 1;
    } else if (arg.startsWith('--out=')) options.outDir = path.resolve(arg.slice('--out='.length));
    else if (arg === '--help' || arg === '-h') {
      console.log('usage: node scripts/api-reference/generate.mjs [--fetch] [--out DIR]');
      process.exit(0);
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function hasExampleContent(example) {
  return Object.hasOwn(example, 'value') || Boolean(example.raw);
}

function endpointDocument(endpoint, schemas) {
  const request = {};
  if (Object.keys(schemas.pathSchema.properties ?? {}).length) request.path = { schema: schemas.pathSchema };
  if (Object.keys(schemas.querySchema.properties ?? {}).length) request.query = { schema: schemas.querySchema };
  if (Object.keys(schemas.headerSchema.properties ?? {}).length) request.headers = { schema: schemas.headerSchema };
  const bodyProperties = Object.keys(schemas.bodySchema.properties ?? {});
  if (bodyProperties.length) {
    request.body = {
      required: true,
      contentType: endpoint.contentType,
      schema: schemas.bodySchema,
    };
    const examples = schemas.requestExamples.filter(hasExampleContent);
    if (examples.length) request.body.examples = examples;
  }

  const response = { status: 200, schema: schemas.responseSchema };
  const responseExamples = schemas.responseExamples.filter(hasExampleContent);
  if (responseExamples.length) response.examples = responseExamples;

  const meta = {
    name: endpoint.name,
    method: endpoint.method,
    path: endpoint.path,
    group: endpoint.group,
    groupPath: endpoint.groupPath,
    area: endpoint.area,
    tags: [endpoint.group],
    listed: endpoint.listed,
    version: endpoint.version,
    auth: endpoint.auth,
    description: endpoint.descriptionMarkdown,
    summary: endpoint.summary,
    sourceFile: endpoint.sourceFile,
    docsUrl: endpoint.docsUrl,
  };
  if (endpoint.baseUrl) meta.baseUrl = endpoint.baseUrl;
  if (endpoint.originalUrl !== endpoint.path) meta.originalUrl = endpoint.originalUrl;
  if (endpoint.queryDefaults.length) meta.queryDefaults = endpoint.queryDefaults;

  return {
    schemaVersion: 'pingcode-endpoint/1',
    id: endpoint.id,
    meta,
    request,
    response,
  };
}

function sortEndpoints(a, b) {
  const areaA = a.groupPath[0] ?? '';
  const areaB = b.groupPath[0] ?? '';
  if (areaA !== areaB) return areaA.localeCompare(areaB, 'zh');
  if (a.groupPath.join('/') !== b.groupPath.join('/')) return a.groupPath.join('/').localeCompare(b.groupPath.join('/'), 'zh');
  return a.name.localeCompare(b.name, 'zh');
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const outDir = options.outDir;
  const warnings = [];

  const { apiData, project, sourceMeta } = await loadSource({
    outDir,
    fetchRemote: options.fetchRemote,
    warningSink: (message) => warnings.push({ code: 'source', message }),
  });
  const normalized = normalizeSource(apiData, project);
  warnings.push(...normalized.warnings);

  const { endpoints, groups, roots, guideBuckets, stats } = normalized;
  const schemasById = new Map();
  for (const endpoint of endpoints) {
    schemasById.set(endpoint.id, buildEndpointSchemas(endpoint));
  }
  for (const group of groups.values()) {
    group.schemas = schemasById;
  }

  for (const dir of ['endpoints', 'groups', 'guides']) {
    rmSync(path.join(outDir, dir), { recursive: true, force: true });
  }
  mkdirSync(path.join(outDir, 'endpoints'), { recursive: true });
  mkdirSync(path.join(outDir, 'groups'), { recursive: true });
  mkdirSync(path.join(outDir, 'guides'), { recursive: true });

  const endpointFiles = [];
  for (const endpoint of endpoints) {
    const area = areaSlug(endpoint.area) || 'misc';
    const dir = path.join(outDir, 'endpoints', area);
    mkdirSync(dir, { recursive: true });
    const document = endpointDocument(endpoint, schemasById.get(endpoint.id));
    const file = path.join(dir, `${endpoint.id}.json`);
    writeFileSync(file, `${JSON.stringify(document, null, 2)}\n`);
    endpointFiles.push(file);
  }

  const areas = roots
    .map((root) => {
      const areaEndpoints = endpoints.filter((endpoint) => endpoint.area === root);
      const areaGroups = [...groups.values()].filter((group) => group.area === root);
      return {
        name: root,
        slug: areaSlug(root),
        endpoints: areaEndpoints.length,
        hidden: areaEndpoints.filter((endpoint) => !endpoint.listed).length,
        groups: areaGroups.length,
      };
    })
    .filter((area) => area.endpoints > 0 || groups.get(area.name)?.notes.length);

  for (const area of areas) {
    const content = renderAreaDoc({ root: area.name, groups });
    writeFileSync(path.join(outDir, 'groups', `${area.slug}.md`), content);
  }

  const guides = [];
  if (guideBuckets.overview.length) {
    const content = renderGuide({
      title: '概述与通用约定',
      subtitle: '来源：PingCode REST API V2 概述分组',
      docs: guideBuckets.overview,
    });
    writeFileSync(path.join(outDir, 'guides', 'overview.md'), content);
    guides.push('guides/overview.md');
  }
  const authEndpointDocs = endpoints
    .filter((endpoint) => endpoint.area === '鉴权')
    .map((endpoint) => ({
      name: endpoint.name,
      order: project.order?.indexOf(endpoint.name) ?? 10_000,
      descriptionMarkdown: [
        endpoint.descriptionMarkdown,
        `> 端点：\`${endpoint.method} ${endpoint.originalUrl}\`${endpoint.auth.scopes.length ? ` ｜ Scope：${endpoint.auth.scopes.map((scope) => `\`${scope}\``).join('、')}` : ''}`,
      ]
        .filter(Boolean)
        .join('\n\n'),
    }));
  const authDocs = [...guideBuckets.auth, ...authEndpointDocs].sort((a, b) => {
    const orderA = a.order ?? 10_000;
    const orderB = b.order ?? 10_000;
    return orderA - orderB || a.name.localeCompare(b.name, 'zh');
  });
  if (authDocs.length) {
    const content = renderGuide({
      title: '鉴权指南',
      subtitle: '企业令牌、用户令牌（授权码）与个人访问令牌',
      docs: authDocs,
    });
    writeFileSync(path.join(outDir, 'guides', 'auth.md'), content);
    guides.push('guides/auth.md');
  }

  const catalog = endpoints
    .slice()
    .sort(sortEndpoints)
    .map((endpoint) => ({
      id: endpoint.id,
      method: endpoint.method,
      path: endpoint.path,
      name: endpoint.name,
      summary: endpoint.summary,
      group: endpoint.group,
      groupPath: endpoint.groupPath,
      area: endpoint.area,
      listed: endpoint.listed,
      auth: endpoint.auth.tokens,
      scopes: endpoint.auth.scopes,
      contentType: endpoint.contentType,
      file: `endpoints/${areaSlug(endpoint.area)}/${endpoint.id}.json`,
      docs: { file: `groups/${areaSlug(endpoint.area)}.md`, anchor: endpoint.id },
      docsUrl: endpoint.docsUrl,
    }));
  writeFileSync(path.join(outDir, 'catalog.json'), `${JSON.stringify(catalog, null, 2)}\n`);

  const openapi = buildOpenApi({ project, endpoints, schemasById, groups, roots });
  writeFileSync(path.join(outDir, 'openapi.json'), `${JSON.stringify(openapi, null, 2)}\n`);
  const openapiOperations = Object.values(openapi.paths).reduce(
    (sum, item) => sum + Object.keys(item).filter((key) => ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'].includes(key)).length,
    0,
  );

  const generatedAt = new Date().toISOString();
  sourceMeta.generatedAt = generatedAt;
  const readme = renderReadme({
    project,
    stats,
    sourceMeta,
    areas,
    endpoints,
    groups,
    counts: { openapiOperations },
  });
  writeFileSync(path.join(outDir, 'README.md'), readme);

  const manifest = {
    generator: 'scripts/api-reference/generate.mjs',
    schemaVersion: 'pingcode-endpoint/1',
    generatedAt,
    source: sourceMeta,
    stats,
    outputs: {
      endpointFiles: endpointFiles.length,
      areaDocs: areas.length,
      guides: guides.length,
      catalogEntries: catalog.length,
      openapiOperations,
    },
    warnings,
  };
  writeFileSync(path.join(outDir, '_source', 'MANIFEST.json'), `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(
    `generated ${endpointFiles.length} endpoints, ${areas.length} area docs, ${guides.length} guides -> ${path.relative(REPO_ROOT, outDir)}`,
  );
  console.log(`openapi: ${Object.keys(openapi.paths).length} paths`);
  if (warnings.length) console.log(`warnings: ${warnings.length} (see _source/MANIFEST.json)`);
}

main().catch((error) => {
  console.error(error.stack || String(error));
  process.exit(1);
});
