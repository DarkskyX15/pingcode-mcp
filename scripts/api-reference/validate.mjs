#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { areaSlug } from './lib/source.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, '..', '..');
const OUT_DIR = path.join(REPO_ROOT, 'docs', 'api-reference');
const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];

const errors = [];
const warnings = [];
const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);

function readJson(file) {
  return JSON.parse(readFileSync(file, 'utf8'));
}

function walkFiles(dir, suffix) {
  const result = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...walkFiles(full, suffix));
    else if (entry.name.endsWith(suffix)) result.push(full);
  }
  return result.sort();
}

const VALID_TYPES = new Set(['string', 'number', 'integer', 'boolean', 'object', 'array', 'null']);

function validateSchema(schema, location) {
  if (schema === null || typeof schema !== 'object' || Array.isArray(schema)) {
    fail(`${location}: schema is not an object`);
    return;
  }
  if (schema.type && !VALID_TYPES.has(schema.type)) fail(`${location}: invalid type ${schema.type}`);
  if (schema.type === 'array' && schema.items !== undefined && (typeof schema.items !== 'object' || Array.isArray(schema.items))) {
    fail(`${location}: array items must be an object`);
  }
  if (schema.enum !== undefined && (!Array.isArray(schema.enum) || schema.enum.length === 0)) {
    fail(`${location}: enum must be a non-empty array`);
  }
  if (schema.anyOf !== undefined) {
    if (!Array.isArray(schema.anyOf) || schema.anyOf.length === 0) fail(`${location}: anyOf must be a non-empty array`);
    else schema.anyOf.forEach((item, index) => validateSchema(item, `${location}.anyOf[${index}]`));
  }
  if (schema.required !== undefined) {
    if (!Array.isArray(schema.required)) fail(`${location}: required must be an array`);
    else if (schema.properties) {
      for (const name of schema.required) {
        if (!Object.hasOwn(schema.properties, name)) fail(`${location}: required "${name}" not in properties`);
      }
    }
  }
  for (const [name, child] of Object.entries(schema.properties ?? {})) {
    validateSchema(child, `${location}.properties.${name}`);
  }
  if (schema.items) validateSchema(schema.items, `${location}.items`);
  if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
    validateSchema(schema.additionalProperties, `${location}.additionalProperties`);
  }
}

function checkLocalLinks(file, text) {
  const dir = path.dirname(file);
  for (const match of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    const href = match[1];
    if (!href || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#') || href.startsWith('mailto:')) continue;
    const [target, anchor] = href.split('#');
    const resolved = path.resolve(dir, decodeURIComponent(target || path.basename(file)));
    if (!existsSync(resolved)) {
      fail(`${path.relative(OUT_DIR, file)}: missing link target ${href}`);
      continue;
    }
    if (anchor) {
      const body = readFileSync(resolved, 'utf8');
      if (!body.includes(`<a id="${anchor}"></a>`)) fail(`${path.relative(OUT_DIR, file)}: missing anchor #${anchor} in ${path.relative(OUT_DIR, resolved)}`);
    }
  }
}

function main() {
  if (!existsSync(OUT_DIR)) throw new Error(`missing output dir: ${OUT_DIR}`);
  const manifest = readJson(path.join(OUT_DIR, '_source', 'MANIFEST.json'));
  const catalog = readJson(path.join(OUT_DIR, 'catalog.json'));
  const openapi = readJson(path.join(OUT_DIR, 'openapi.json'));

  if (catalog.length !== manifest.stats.endpoints) {
    fail(`catalog entries ${catalog.length} != endpoints ${manifest.stats.endpoints}`);
  }
  const ids = new Set();
  for (const entry of catalog) {
    if (ids.has(entry.id)) fail(`duplicate catalog id ${entry.id}`);
    ids.add(entry.id);
    if (!existsSync(path.join(OUT_DIR, entry.file))) fail(`catalog file missing: ${entry.file}`);
  }

  const files = walkFiles(path.join(OUT_DIR, 'endpoints'), '.json');
  if (files.length !== manifest.stats.endpoints) fail(`endpoint files ${files.length} != ${manifest.stats.endpoints}`);

  const docsByArea = new Map();
  for (const file of files) {
    const doc = readJson(file);
    const relative = path.relative(OUT_DIR, file);
    if (doc.schemaVersion !== 'pingcode-endpoint/1') fail(`${relative}: bad schemaVersion`);
    if (path.basename(file, '.json') !== doc.id) fail(`${relative}: id mismatch`);
    if (!doc.meta || !doc.request || !doc.response) fail(`${relative}: missing meta/request/response`);
    if (!HTTP_METHODS.includes(String(doc.meta?.method).toLowerCase())) fail(`${relative}: bad method ${doc.meta?.method}`);

    const placeholders = [...String(doc.meta?.path ?? '').matchAll(/\{([^{}]+)\}/g)].map((match) => match[1]);
    const pathSchema = doc.request?.path?.schema;
    for (const placeholder of placeholders) {
      if (!pathSchema?.properties?.[placeholder]) fail(`${relative}: path parameter ${placeholder} not documented`);
      else if (!(pathSchema.required ?? []).includes(placeholder)) fail(`${relative}: path parameter ${placeholder} not required`);
    }
    if (placeholders.length && !pathSchema) fail(`${relative}: path parameters without request.path.schema`);

    for (const [section, schema] of [
      ['path', doc.request?.path?.schema],
      ['query', doc.request?.query?.schema],
      ['headers', doc.request?.headers?.schema],
      ['body', doc.request?.body?.schema],
      ['response', doc.response?.schema],
    ]) {
      if (schema) validateSchema(schema, `${relative}.${section}`);
    }

    for (const example of doc.request?.body?.examples ?? []) {
      if (!Object.hasOwn(example, 'value') && typeof example.raw !== 'string') fail(`${relative}: bad request example`);
    }
    for (const example of doc.response?.examples ?? []) {
      if (!Object.hasOwn(example, 'value') && typeof example.raw !== 'string') fail(`${relative}: bad response example`);
    }

    const areaFile = path.join(OUT_DIR, `groups/${doc.meta.area ? areaSlug(doc.meta.area) : 'misc'}.md`);
    if (!existsSync(areaFile)) fail(`${relative}: missing area doc ${path.relative(OUT_DIR, areaFile)}`);
    else {
      if (!docsByArea.has(areaFile)) docsByArea.set(areaFile, readFileSync(areaFile, 'utf8'));
      if (!docsByArea.get(areaFile).includes(`<a id="${doc.id}"></a>`)) fail(`${relative}: anchor missing in ${path.basename(areaFile)}`);
    }
  }

  const openapiOperations = [];
  for (const [route, item] of Object.entries(openapi.paths ?? {})) {
    const routePlaceholders = [...route.matchAll(/\{([^{}]+)\}/g)].map((match) => match[1]);
    for (const method of HTTP_METHODS) {
      const operation = item[method];
      if (!operation) continue;
      openapiOperations.push(operation);
      if (!operation.operationId) fail(`openapi ${method.toUpperCase()} ${route}: missing operationId`);
      if (!operation.responses?.['200']) fail(`openapi ${method.toUpperCase()} ${route}: missing 200 response`);
      const declared = new Set((operation.parameters ?? []).filter((parameter) => parameter.in === 'path').map((parameter) => parameter.name));
      for (const placeholder of routePlaceholders) {
        if (!declared.has(placeholder)) fail(`openapi ${method.toUpperCase()} ${route}: path parameter ${placeholder} not declared`);
      }
      for (const parameter of operation.parameters ?? []) {
        if (parameter.in === 'path' && parameter.required !== true) fail(`openapi ${method.toUpperCase()} ${route}: path parameter ${parameter.name} not required`);
        if (parameter.in === 'path' && !routePlaceholders.includes(parameter.name)) fail(`openapi ${method.toUpperCase()} ${route}: declared path parameter ${parameter.name} missing from route`);
      }
    }
  }
  const operationIds = new Set();
  for (const operation of openapiOperations) {
    if (operationIds.has(operation.operationId)) fail(`openapi: duplicate operationId ${operation.operationId}`);
    operationIds.add(operation.operationId);
  }
  if (openapiOperations.length !== manifest.outputs.openapiOperations) {
    fail(`openapi operations ${openapiOperations.length} != manifest ${manifest.outputs.openapiOperations}`);
  }

  const readmePath = path.join(OUT_DIR, 'README.md');
  checkLocalLinks(readmePath, readFileSync(readmePath, 'utf8'));
  for (const file of walkFiles(path.join(OUT_DIR, 'groups'), '.md')) {
    checkLocalLinks(file, readFileSync(file, 'utf8'));
  }
  for (const file of walkFiles(path.join(OUT_DIR, 'guides'), '.md')) {
    checkLocalLinks(file, readFileSync(file, 'utf8'));
  }

  if (manifest.stats.endpoints !== 499) warn(`endpoint count changed: ${manifest.stats.endpoints} (expected 499 for the 2026-11-10 snapshot)`);
  if (manifest.stats.hidden < 1) warn('no hidden endpoints detected');

  console.log(`endpoints: ${files.length}`);
  console.log(`openapi: ${Object.keys(openapi.paths).length} paths / ${openapiOperations.length} operations`);
  console.log(`catalog: ${catalog.length}`);
  console.log(`warnings: ${warnings.length}`);
  for (const warning of warnings) console.log(`  warn: ${warning}`);
  if (errors.length) {
    console.error(`\nFAILED with ${errors.length} error(s):`);
    for (const error of errors.slice(0, 50)) console.error(`  - ${error}`);
    if (errors.length > 50) console.error(`  ... ${errors.length - 50} more`);
    process.exit(1);
  }
  console.log('OK');
}

main();
