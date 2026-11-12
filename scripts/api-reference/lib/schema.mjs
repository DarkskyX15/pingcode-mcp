// Field-table -> JSON Schema (2020-12) conversion with example-based enrichment.

import { htmlToMarkdown } from './html.mjs';

const PRIMITIVES = {
  String: () => ({ type: 'string' }),
  Number: () => ({ type: 'number' }),
  Boolean: () => ({ type: 'boolean' }),
  Object: () => ({ type: 'object' }),
  Array: () => ({ type: 'array' }),
  File: () => ({ type: 'string', contentMediaType: 'application/octet-stream' }),
};

export const DYNAMIC_ROOTS = new Set(['properties', 'entity_properties']);

export function cleanDescription(html) {
  return htmlToMarkdown(html).replace(/\s+/g, ' ').trim();
}

export function typeToSchema(typeString) {
  const value = String(typeString || 'String').trim();
  if (PRIMITIVES[value]) return PRIMITIVES[value]();

  const arrayMatch = /^(.+)\[\]$/.exec(value);
  if (arrayMatch) {
    return { type: 'array', items: typeToSchema(arrayMatch[1]) };
  }

  if (value.includes('|') || value.includes('/')) {
    const parts = value
      .split(/[|/]/)
      .map((part) => part.trim())
      .filter(Boolean);
    const variants = [];
    for (const part of parts) {
      const schema = typeToSchema(part);
      const signature = JSON.stringify(schema);
      if (!variants.some((variant) => JSON.stringify(variant) === signature)) variants.push(schema);
    }
    const schema = variants.length === 1 ? variants[0] : { anyOf: variants };
    schema['x-pingcode-type'] = value;
    return schema;
  }

  return { type: 'string', 'x-pingcode-type': value };
}

function coerceEnum(value, schema) {
  if (schema.type === 'number') {
    const number = Number(value);
    if (Number.isFinite(number)) return number;
  }
  if (schema.type === 'boolean') return String(value).toLowerCase() === 'true' || value === '1';
  return value;
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function emptyObjectSchema() {
  return { type: 'object', properties: {}, required: [] };
}

function ensureObject(node) {
  if (node.type !== 'object') {
    node.type = 'object';
    if (!node.properties) node.properties = {};
    if (!node.required) node.required = [];
  }
  if (!node.properties) node.properties = {};
  if (!node.required) node.required = [];
  return node;
}

function ensurePath(root, segments) {
  let cursor = root;
  for (const segment of segments) {
    ensureObject(cursor);
    if (!cursor.properties[segment]) cursor.properties[segment] = { type: 'object' };
    cursor = cursor.properties[segment];
  }
  return cursor;
}

function mergeSchemaIntoNode(node, schema, field) {
  const next = { ...schema };
  const description = cleanDescription(field.description ?? '');
  if (description) next.description = description;
  if (field.allowedValues?.length) next.enum = field.allowedValues.map((value) => coerceEnum(value, schema));
  if (field.defaultValue !== undefined && field.defaultValue !== null && field.defaultValue !== '') {
    const defaultValue = coerceEnum(field.defaultValue, schema);
    next.default = defaultValue;
  }
  if (node.description && !next.description) next.description = node.description;
  if (node.properties) {
    next.properties = { ...node.properties, ...(next.properties ?? {}) };
    if (node.required?.length) next.required = [...new Set([...(next.required ?? []), ...node.required])];
  }
  if (node['x-example-keys']) next['x-example-keys'] = node['x-example-keys'];
  if (node.additionalProperties !== undefined) next.additionalProperties = node.additionalProperties;
  Object.assign(node, next);
  return node;
}

function setNestedExampleKey(container, segments, schema) {
  if (!container['x-example-keys']) container['x-example-keys'] = {};
  let cursor = container['x-example-keys'];
  for (const segment of segments.slice(0, -1)) {
    if (!cursor[segment]) cursor[segment] = {};
    cursor = cursor[segment];
  }
  cursor[segments[segments.length - 1]] = schema;
}

export function buildObjectSchema(fields, options = {}) {
  const root = emptyObjectSchema();
  const dynamicRoots = options.dynamicRoots ?? DYNAMIC_ROOTS;

  for (const field of fields ?? []) {
    const name = String(field.field ?? '').trim();
    if (!name) continue;
    const segments = name.split('.');
    const dynamicIndex = segments.findIndex((segment) => segment.startsWith('$'));

    if (dynamicIndex !== -1) {
      const parent = ensurePath(root, segments.slice(0, dynamicIndex));
      ensureObject(parent);
      parent.additionalProperties = parent.additionalProperties === true ? true : typeToSchema(field.type);
      parent['x-dynamic-key'] = segments.slice(dynamicIndex).join('.');
      if (field.description) parent['x-dynamic-key-description'] = cleanDescription(field.description);
      continue;
    }

    if (dynamicRoots.has(segments[0]) && segments.length > 1) {
      const parent = ensurePath(root, [segments[0]]);
      ensureObject(parent);
      if (parent.additionalProperties === undefined) parent.additionalProperties = true;
      setNestedExampleKey(parent, segments.slice(1), typeToSchema(field.type));
      continue;
    }

    const parent = ensurePath(root, segments.slice(0, -1));
    ensureObject(parent);
    const key = segments[segments.length - 1];
    const schema = typeToSchema(field.type);
    if (parent.properties[key]) {
      mergeSchemaIntoNode(parent.properties[key], schema, field);
    } else {
      parent.properties[key] = mergeSchemaIntoNode({ ...schema }, schema, field);
    }
    if (!field.optional && !parent.required.includes(key)) parent.required.push(key);
  }

  prune(root);
  return root;
}

function prune(node) {
  if (Array.isArray(node.required) && node.required.length === 0) delete node.required;
  if (isPlainObject(node.properties)) {
    for (const child of Object.values(node.properties)) prune(child);
    if (!Object.keys(node.properties).length) delete node.properties;
  }
  if (isPlainObject(node.items)) prune(node.items);
  if (isPlainObject(node.additionalProperties)) prune(node.additionalProperties);
  if (Array.isArray(node.anyOf)) node.anyOf.forEach(prune);
  return node;
}

function unionInferred(schemas) {
  if (!schemas.length) return { type: 'object', additionalProperties: true, 'x-inferred-from-example': true };
  if (schemas.length === 1) return schemas[0];
  const types = new Set(schemas.map((schema) => schema.type));
  if (types.size === 1 && types.has('object')) {
    const merged = { type: 'object', properties: {}, 'x-inferred-from-example': true };
    for (const schema of schemas) {
      for (const [key, value] of Object.entries(schema.properties ?? {})) {
        merged.properties[key] = merged.properties[key] ? unionInferred([merged.properties[key], value]) : value;
      }
    }
    return merged;
  }
  if (types.size === 1 && types.has('array')) {
    return { type: 'array', items: unionInferred(schemas.map((schema) => schema.items ?? {})), 'x-inferred-from-example': true };
  }
  return { anyOf: schemas, 'x-inferred-from-example': true };
}

export function inferSchema(value, depth = 0) {
  if (depth > 8) return { 'x-inferred-from-example': true };
  if (value === null) return { type: 'null', 'x-inferred-from-example': true };
  if (Array.isArray(value)) {
    const itemSchemas = value.slice(0, 5).map((item) => inferSchema(item, depth + 1));
    const schema = { type: 'array', 'x-inferred-from-example': true };
    if (itemSchemas.length) schema.items = unionInferred(itemSchemas);
    return schema;
  }
  if (isPlainObject(value)) {
    const schema = { type: 'object', properties: {}, 'x-inferred-from-example': true };
    for (const [key, item] of Object.entries(value)) schema.properties[key] = inferSchema(item, depth + 1);
    return schema;
  }
  if (typeof value === 'string') return { type: 'string', 'x-inferred-from-example': true };
  if (typeof value === 'number') return { type: 'number', 'x-inferred-from-example': true };
  if (typeof value === 'boolean') return { type: 'boolean', 'x-inferred-from-example': true };
  return { 'x-inferred-from-example': true };
}

function hasProperties(schema) {
  return isPlainObject(schema.properties) && Object.keys(schema.properties).length > 0;
}

export function mergeDocumented(documented, inferred, depth = 0) {
  if (depth > 8 || !inferred) return documented;
  if (!documented || !Object.keys(documented).length) return inferred;
  if (documented['x-dynamic-key'] || documented.additionalProperties === true) return documented;

  if (documented.type === 'array') {
    if (inferred.type === 'array' && inferred.items) {
      if (!documented.items || !Object.keys(documented.items).length) documented.items = inferred.items;
      else documented.items = mergeDocumented(documented.items, inferred.items, depth + 1);
      documented['x-inferred-from-example'] = true;
    }
    return documented;
  }

  if (documented.type === 'object' || (!documented.type && hasProperties(inferred))) {
    if (inferred.type !== 'object') return documented;
    if (!documented.type) documented.type = 'object';
    if (!documented.properties) documented.properties = {};
    let touched = false;
    for (const [key, value] of Object.entries(inferred.properties ?? {})) {
      if (documented.properties[key]) {
        documented.properties[key] = mergeDocumented(documented.properties[key], value, depth + 1);
      } else {
        documented.properties[key] = value;
        touched = true;
      }
    }
    if (touched) documented['x-inferred-from-example'] = true;
    return documented;
  }

  return documented;
}

export function parseExample(example) {
  const name = example?.title ?? '';
  const type = example?.type ?? 'json';
  if (typeof example?.content !== 'string') return { name, type, raw: example?.content ?? null };
  try {
    return { name, type, value: JSON.parse(example.content) };
  } catch {
    return { name, type, raw: example.content };
  }
}

export function buildEndpointSchemas(endpoint) {
  const pathFields = endpoint.parameterFields['路径参数'] ?? [];
  const pathSchema = buildObjectSchema(pathFields);
  for (const placeholder of endpoint.pathPlaceholders) {
    if (!pathSchema.properties[placeholder]) {
      pathSchema.properties[placeholder] = {
        type: 'string',
        description: '路径参数（源文档未单独列出）。',
        'x-undocumented': true,
      };
    }
    if (!pathSchema.required) pathSchema.required = [];
    if (!pathSchema.required.includes(placeholder)) pathSchema.required.push(placeholder);
  }
  prune(pathSchema);

  const queryFields = [...(endpoint.parameterFields['查询参数'] ?? [])];
  const queryNames = new Set(queryFields.map((field) => field.field));
  for (const pair of endpoint.queryPairs) {
    const placeholder = pair.placeholder;
    const name = placeholder ? pair.value.slice(1, -1) : pair.name;
    if (placeholder) {
      if (!queryNames.has(name)) {
        queryFields.push({ field: name, type: 'String', optional: false, description: `查询参数（源 URL 内嵌：${endpoint.originalUrl}）。` });
        queryNames.add(name);
      }
    } else if (pair.name && !queryNames.has(pair.name)) {
      queryFields.push({
        field: pair.name,
        type: 'String',
        optional: true,
        description: `源 URL 固定值：${pair.value}`,
        allowedValues: [pair.value],
      });
      queryNames.add(pair.name);
    }
  }
  const querySchema = buildObjectSchema(queryFields);
  for (const pair of endpoint.queryPairs) {
    const name = pair.placeholder ? pair.value.slice(1, -1) : pair.name;
    const property = querySchema.properties[name];
    if (!property) continue;
    if (!pair.placeholder && !property.enum) property.enum = [pair.value];
    if (!property.description) property.description = '查询参数。';
  }
  prune(querySchema);

  const headerFields = endpoint.headerFields.Header ?? [];
  const headerSchema = buildObjectSchema(headerFields);
  prune(headerSchema);

  const bodyFields = [];
  for (const group of ['Parameter', '请求参数', 'Body', '请求参数 form-data']) {
    bodyFields.push(...(endpoint.parameterFields[group] ?? []));
  }
  let bodySchema = buildObjectSchema(bodyFields);
  const requestValues = endpoint.requestExamples
    .map(parseExample)
    .filter((example) => Object.hasOwn(example, 'value'))
    .map((example) => example.value);
  for (const value of requestValues) bodySchema = mergeDocumented(bodySchema, inferSchema(value));
  prune(bodySchema);

  const documented = buildObjectSchema(endpoint.responseFields);
  const parsedExamples = endpoint.responseExamples.map(parseExample);
  const values = parsedExamples.filter((example) => Object.hasOwn(example, 'value')).map((example) => example.value);

  let responseSchema = documented;
  if (values.length) {
    const allArrays = values.every(Array.isArray);
    const rootLooksLikeWrapper = hasProperties(documented) && ('values' in documented.properties || 'total' in documented.properties);
    if (allArrays && hasProperties(documented) && !rootLooksLikeWrapper) {
      responseSchema = { type: 'array', items: documented };
      for (const value of values) responseSchema = mergeDocumented(responseSchema, inferSchema(value));
    } else {
      for (const value of values) responseSchema = mergeDocumented(responseSchema, inferSchema(value));
    }
  }
  if (!Object.keys(responseSchema).length) {
    responseSchema = { description: '源文档未提供响应结构。' };
  }
  prune(responseSchema);

  return {
    pathSchema,
    querySchema,
    headerSchema,
    bodySchema,
    responseSchema,
    requestExamples: endpoint.requestExamples.map(parseExample),
    responseExamples: parsedExamples,
  };
}
