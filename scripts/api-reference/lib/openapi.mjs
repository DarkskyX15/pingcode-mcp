// OpenAPI 3.1 emitter for the normalized PingCode endpoint set.

function stripInternal(schema) {
  if (!schema || typeof schema !== 'object') return schema;
  if (Array.isArray(schema)) return schema.map(stripInternal);
  const result = {};
  for (const [key, value] of Object.entries(schema)) {
    if (key === 'x-inferred-from-example' || key === 'x-pingcode-type' || key === 'x-example-keys' || key === 'x-undocumented') continue;
    if (key === 'x-dynamic-key' || key === 'x-dynamic-key-description') continue;
    result[key] = stripInternal(value);
  }
  return result;
}

function exampleMap(examples) {
  const map = {};
  examples.forEach((example, index) => {
    if (!Object.hasOwn(example, 'value')) return;
    let key = example.name || `example-${index + 1}`;
    key = key.replace(/[：:]\s*$/, '').trim() || `example-${index + 1}`;
    let unique = key;
    let suffix = 2;
    while (Object.hasOwn(map, unique)) {
      unique = `${key} (${suffix})`;
      suffix += 1;
    }
    map[unique] = { value: example.value };
  });
  return map;
}

function parametersFromSchema(schema, location) {
  const properties = schema?.properties ?? {};
  const required = new Set(schema?.required ?? []);
  return Object.entries(properties).map(([name, property]) => {
    const parameter = {
      name,
      in: location,
      required: location === 'path' ? true : required.has(name),
      schema: stripInternal(property),
    };
    if (property.description) parameter.description = property.description;
    return parameter;
  });
}

function bodyContent(endpoint, schemas) {
  const examples = exampleMap(schemas.requestExamples);
  const media = {
    schema: stripInternal(schemas.bodySchema),
  };
  if (Object.keys(examples).length) media.examples = examples;
  return media;
}

function responseContent(endpoint, schemas) {
  const content = {};
  const media = { schema: stripInternal(schemas.responseSchema) };
  const examples = exampleMap(schemas.responseExamples);
  if (Object.keys(examples).length) media.examples = examples;
  content['application/json'] = media;
  return content;
}

function operationFor(endpoint, schemas) {
  const operation = {
    operationId: endpoint.id,
    summary: endpoint.name,
    description: endpoint.descriptionMarkdown || endpoint.summary || '',
    tags: [endpoint.group],
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: endpoint.method === 'DELETE' ? '成功（源文档未单独说明响应体）' : '成功',
        content: responseContent(endpoint, schemas),
      },
    },
    'x-pingcode': {
      tokens: endpoint.auth.tokens,
      scopes: endpoint.auth.scopes,
      listed: endpoint.listed,
      area: endpoint.area,
      groupPath: endpoint.groupPath,
      docsUrl: endpoint.docsUrl,
      sourceFile: endpoint.sourceFile,
      contentType: endpoint.contentType,
    },
  };

  const parameters = [
    ...parametersFromSchema(schemas.pathSchema, 'path'),
    ...parametersFromSchema(schemas.querySchema, 'query'),
    ...parametersFromSchema(schemas.headerSchema, 'header'),
  ];
  if (parameters.length) operation.parameters = parameters;

  const bodyFields = Object.keys(schemas.bodySchema?.properties ?? {}).length;
  if (bodyFields) {
    operation.requestBody = {
      required: true,
      content: {
        [endpoint.contentType]: bodyContent(endpoint, schemas),
      },
    };
  }

  if (endpoint.absolute && endpoint.baseUrl) {
    operation.servers = [
      {
        url: endpoint.baseUrl,
        variables: {
          oauth2_root: {
            default: 'open.pingcode.com/oauth2',
            description: 'OAuth2 授权页面根路径；公有云为 open.pingcode.com/oauth2。',
          },
        },
      },
    ];
  } else if (endpoint.baseUrl) {
    operation.servers = [{ url: endpoint.baseUrl }];
  }

  return operation;
}


function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function disjoin(a, b) {
  if (!a) return b;
  if (!b) return a;
  if (deepEqual(a, b)) return a;
  return { anyOf: [a, b] };
}

function mergeExamples(target, source) {
  const existing = target.examples ?? {};
  for (const [key, value] of Object.entries(source.examples ?? {})) {
    let unique = key;
    let suffix = 2;
    while (Object.hasOwn(existing, unique) && !deepEqual(existing[unique], value)) {
      unique = `${key} (${suffix})`;
      suffix += 1;
    }
    if (!Object.hasOwn(existing, unique)) existing[unique] = value;
  }
  if (Object.keys(existing).length) target.examples = existing;
}

function mergeParameterSchema(a, b) {
  if (deepEqual(a, b)) return a;
  if (a.type && b.type && a.type !== b.type) return { anyOf: [a, b] };
  const merged = { ...a };
  if (Array.isArray(a.enum) && Array.isArray(b.enum)) merged.enum = [...new Set([...a.enum, ...b.enum])];
  if (!merged.description && b.description) merged.description = b.description;
  return merged;
}

function mergeParameter(target, source) {
  const merged = { ...target };
  merged.required = Boolean(target.required && source.required);
  merged.schema = mergeParameterSchema(target.schema ?? {}, source.schema ?? {});
  if (!merged.description && source.description) merged.description = source.description;
  return merged;
}

function mergeOperations(target, source) {
  const parameters = [...(target.parameters ?? [])];
  for (const parameter of source.parameters ?? []) {
    const index = parameters.findIndex((item) => item.name === parameter.name && item.in === parameter.in);
    if (index === -1) parameters.push(parameter);
    else parameters[index] = mergeParameter(parameters[index], parameter);
  }
  if (parameters.length) target.parameters = parameters;

  if (source.requestBody) {
    if (!target.requestBody) {
      target.requestBody = source.requestBody;
    } else {
      for (const [contentType, media] of Object.entries(source.requestBody.content ?? {})) {
        const existing = target.requestBody.content[contentType];
        if (!existing) {
          target.requestBody.content[contentType] = media;
        } else {
          existing.schema = disjoin(existing.schema, media.schema);
          mergeExamples(existing, media);
        }
      }
    }
  }

  const sourceResponse = source.responses?.['200'];
  const targetResponse = target.responses?.['200'];
  if (sourceResponse && targetResponse) {
    const a = targetResponse.content?.['application/json'];
    const b = sourceResponse.content?.['application/json'];
    if (a && b) {
      a.schema = disjoin(a.schema, b.schema);
      mergeExamples(a, b);
    }
    if (sourceResponse.description && sourceResponse.description !== targetResponse.description) {
      targetResponse.description = [...new Set([targetResponse.description, sourceResponse.description])].join(' / ');
    }
  }

  target.description = [target.description, source.description].filter(Boolean).join('\n\n');
  target.tags = [...new Set([...(target.tags ?? []), ...(source.tags ?? [])])];

  const targetMeta = target['x-pingcode'];
  const sourceMeta = source['x-pingcode'];
  targetMeta.tokens = [...new Set([...(targetMeta.tokens ?? []), ...(sourceMeta.tokens ?? [])])];
  targetMeta.scopes = [...new Set([...(targetMeta.scopes ?? []), ...(sourceMeta.scopes ?? [])])];
  targetMeta.listed = Boolean(targetMeta.listed || sourceMeta.listed);
  targetMeta.variants = targetMeta.variants ?? [
    { id: target.operationId, name: target.summary, docsUrl: targetMeta.docsUrl },
  ];
  targetMeta.variants.push({ id: source.operationId, name: source.summary, docsUrl: sourceMeta.docsUrl });
}

export function buildOpenApi({ project, endpoints, schemasById, groups, roots }) {
  const paths = {};
  const usedTags = new Set();
  const tagGroups = [];

  for (const root of roots) {
    const rootGroup = groups.get(root);
    if (!rootGroup) continue;
    const tags = [];
    const collect = (name) => {
      const group = groups.get(name);
      if (!group) return;
      if (group.endpoints.length) tags.push(name);
      for (const child of group.children) collect(child);
    };
    collect(root);
    if (!tags.length) continue;
    tagGroups.push({ name: root, tags });
    tags.forEach((tag) => usedTags.add(tag));
  }

  for (const endpoint of endpoints) {
    const schemas = schemasById.get(endpoint.id);
    const operation = operationFor(endpoint, schemas);
    const pathItem = paths[endpoint.path] ?? {};
    const methodKey = endpoint.method.toLowerCase();
    if (pathItem[methodKey]) mergeOperations(pathItem[methodKey], operation);
    else pathItem[methodKey] = operation;
    paths[endpoint.path] = pathItem;
  }

  const tags = [...usedTags]
    .sort((a, b) => {
      const orderA = groups.get(a)?.order ?? 10_000;
      const orderB = groups.get(b)?.order ?? 10_000;
      return orderA - orderB || a.localeCompare(b, 'zh');
    })
    .map((name) => {
      const group = groups.get(name);
      return {
        name,
        description: `所属区域：${group?.area ?? ''} ｜ 路径：${(group?.groupPath ?? []).join(' / ')}`,
        'x-pingcode-group': {
          path: group?.groupPath ?? [],
          area: group?.area ?? '',
          endpoints: group?.endpoints.length ?? 0,
        },
      };
    });

  for (const item of Object.values(paths)) {
    for (const operation of Object.values(item)) {
      if ((operation['x-pingcode']?.variants?.length ?? 0) > 1) {
        for (const parameter of operation.parameters ?? []) {
          if (parameter.in !== 'path') parameter.required = false;
        }
      }
    }
  }

  return {
    openapi: '3.1.0',
    info: {
      title: project?.title || 'PingCode REST API V2',
      version: project?.version || '2.0.0',
      description:
        'PingCode REST API V2 端点参考。由 open.pingcode.com 的 api_data.js 生成；每个操作携带 x-pingcode 扩展（令牌类型、scope、源文件、是否公开）。',
    },
    servers: [
      {
        url: 'https://{rest_api_root}',
        description: '公有云默认 open.pingcode.com；私有部署使用 {自定义域名}/open。',
        variables: {
          rest_api_root: {
            default: 'open.pingcode.com',
            description: 'REST API 根路径。',
          },
        },
      },
    ],
    tags,
    'x-tagGroups': tagGroups,
    paths,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          description: '企业令牌（Client Credentials，管理员身份）或用户令牌（授权码 / PAT，用户身份）。',
        },
      },
    },
  };
}
