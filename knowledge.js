/** Three fixed Wiki operations. Content is data; external links and attachments are never fetched. */
import { z } from 'zod';
import { idSchema, paginationSchema, safeError } from './client.js';

const MAX_CONTENT_CHARS = 20_000;
const fail = (code, extra = {}) => { throw Object.assign(new Error(code), { code, ...extra }); };
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const rawHTML = /<(?:!--|!doctype\b|\/?[A-Za-z][A-Za-z0-9-]*(?:\s[^<>]*|\/?)>)/i;
const titleSchema = z.string().min(1).max(256).refine(value => value.trim().length > 0);

const listSchema = z.strictObject({
  space_id: idSchema,
  parent_id: idSchema.optional(),
  ancestor_id: idSchema.optional(),
  title_contains: z.string().min(1).max(256).optional(),
  ...paginationSchema,
}).refine(value => !(value.parent_id && value.ancestor_id), { message: 'PARENT_AND_ANCESTOR_EXCLUSIVE' });

const getSchema = z.strictObject({
  page_id: idSchema,
  format_type: z.enum(['text', 'markdown']).default('markdown'),
  version_id: idSchema.optional(),
  include_versions: z.boolean().default(false),
  versions_page_index: paginationSchema.page_index,
  versions_page_size: paginationSchema.page_size,
  content_offset: z.number().int().min(0).max(2_097_152).default(0),
  max_content_chars: z.number().int().min(1).max(MAX_CONTENT_CHARS).default(12_000),
});

const createSchema = z.strictObject({
  space_id: idSchema,
  parent_id: idSchema.optional(),
  name: titleSchema,
  content: z.string().min(1).max(32_000).refine(value => value.trim().length > 0 && !rawHTML.test(value)),
  dry_run: z.boolean().default(false),
});

function selected(object, keys) {
  if (!isObject(object)) fail('UPSTREAM_RESPONSE_INVALID');
  const result = {};
  for (const key of keys) {
    const value = object[key];
    if (value === undefined) continue;
    if (typeof value === 'string') {
      if (value.length > 4096) fail('UPSTREAM_RESPONSE_TOO_LARGE');
    } else if (value !== null && typeof value !== 'boolean' && !(typeof value === 'number' && Number.isFinite(value))) {
      fail('UPSTREAM_RESPONSE_INVALID');
    }
    result[key] = value;
  }
  return result;
}

function requireId(object, expected) {
  if (!isObject(object) || !idSchema.safeParse(object.id).success || (expected !== undefined && object.id !== expected)) fail('UPSTREAM_RESPONSE_INVALID');
}

function pageMetadata(page, expectedId) {
  requireId(page, expectedId);
  const result = selected(page, ['id', 'short_id', 'name', 'type', 'html_url', 'created_at', 'updated_at', 'published_at', 'is_locked', 'is_archived', 'is_deleted']);
  for (const key of ['space', 'parent']) {
    if (page[key] !== undefined && page[key] !== null) result[key] = selected(page[key], ['id', 'name', 'identifier']);
  }
  for (const key of ['created_by', 'updated_by', 'published_by']) {
    if (page[key] !== undefined && page[key] !== null) result[key] = selected(page[key], ['id', 'name', 'display_name']);
  }
  return result;
}

function versionMetadata(version, pageId, versionId) {
  requireId(version, versionId);
  if (!isObject(version.page) || version.page.id !== pageId) fail('VERSION_PAGE_MISMATCH');
  const result = selected(version, ['id', 'name', 'order', 'status', 'created_at']);
  if (version.created_by) result.created_by = selected(version.created_by, ['id', 'name', 'display_name']);
  return result;
}

function pagination(result) {
  return { total: result.total, page_index: result.page_index, page_size: result.page_size, has_more: result.has_more };
}

function definition(name, description, schema, readOnly, execute) {
  return {
    name, description, schema, readOnly,
    async execute(input) {
      const parsed = schema.safeParse(input);
      if (!parsed.success) fail('INVALID_ARGUMENT');
      return execute(parsed.data);
    },
  };
}

export function knowledgeTools(client) {
  return [
    definition('pingcode_list_pages', '按明确空间及可选父页或祖先分页枚举元数据；标题匹配仅限当前返回页，不是全文搜索。', listSchema, true, async args => {
      const { title_contains, page_index, page_size, ...filters } = args;
      const result = await client.list('/v2/wiki/pages', { ...filters, page_index, page_size });
      const pages = result.values.map(value => pageMetadata(value));
      const values = title_contains === undefined ? pages : pages.filter(value => typeof value.name === 'string' && value.name.toLowerCase().includes(title_contains.toLowerCase()));
      return {
        values, ...pagination(result),
        effective_filters: { ...filters, ...(title_contains !== undefined ? { title_contains } : {}) },
        enumerated_in_page: pages.length, matched_in_page: values.length,
        title_filter_scope: 'returned_page_only', full_text_search: false,
        partial: result.page_index > 0 || result.has_more,
        coverage: 'one_page_of_api_visible_results',
      };
    }),
    definition('pingcode_get_page', '读取页面元数据及 text/markdown 正文；可指定历史版本或按需分页列版本。长正文显式分窗，图表和附件不保证完整，也不打开外链。', getSchema, true, async args => {
      const path = `/v2/wiki/pages/${args.page_id}`;
      const page = pageMetadata(await client.get(path), args.page_id);
      let versionDetails = null;
      if (args.version_id !== undefined) {
        versionDetails = versionMetadata(await client.get(`${path}/versions/${args.version_id}`), args.page_id, args.version_id);
      }
      const limitations = ['RICH_CONTENT_MAY_BE_MISSING', 'ATTACHMENTS_NOT_FETCHED', 'EXTERNAL_LINKS_NOT_OPENED', 'CONTENT_MAY_BE_REDACTED'];
      if (!args.version_id) limitations.push('CURRENT_VERSION_UNKNOWN', 'UNPINNED_CONTENT_MAY_CHANGE_BETWEEN_READS');
      let content = null;
      if (page.type === 'document') {
        const query = { format_type: args.format_type, ...(args.version_id ? { version_id: args.version_id } : {}) };
        const response = await client.get(`${path}/content`, query);
        if (!isObject(response) || typeof response.content !== 'string') fail('PAGE_CONTENT_UNAVAILABLE');
        if (response.format_type !== args.format_type) fail('CONTENT_FORMAT_UNEXPECTED');
        const characters = Array.from(response.content);
        if (args.content_offset > characters.length) fail('CONTENT_OFFSET_OUT_OF_RANGE');
        const end = Math.min(characters.length, args.content_offset + args.max_content_chars);
        const hasMore = end < characters.length;
        content = {
          format_type: args.format_type, value: characters.slice(args.content_offset, end).join(''),
          offset: args.content_offset, offset_unit: 'unicode_code_points_in_returned_text',
          total_chars: characters.length, returned_chars: end - args.content_offset,
          has_more: hasMore, next_offset: hasMore ? end : null,
          complete_text: args.content_offset === 0 && !hasMore,
        };
        if (!content.complete_text) limitations.push('CONTENT_WINDOW_ONLY');
        limitations.push(args.format_type === 'text' ? 'TEXT_FORMATTING_LOSS' : 'MARKDOWN_CONVERSION_MAY_LOSE_LAYOUT');
      } else {
        limitations.push('NON_DOCUMENT_PAGE');
      }
      const result = {
        page, html_url: page.html_url ?? null,
        metadata_scope: 'current_page_metadata',
        version: { id: args.version_id ?? null, pinned: args.version_id !== undefined },
        version_details: versionDetails, content, representation_complete: false,
        attachments_fetched: false, partial: !content?.complete_text, limitations,
      };
      if (args.include_versions) {
        const query = { page_index: args.versions_page_index, page_size: args.versions_page_size };
        try {
          const versions = await client.list(`${path}/versions`, query);
          result.versions = {
            values: versions.values.map(version => versionMetadata(version, args.page_id)),
            ...pagination(versions), effective_filters: { page_id: args.page_id },
            partial: versions.page_index > 0 || versions.has_more,
          };
          result.partial ||= result.versions.partial;
        } catch (error) {
          result.versions = { ...safeError(error), ...query, values: [], total: null, has_more: null, partial: true };
          result.partial = true;
        }
      }
      return { ...result, retrieved_at: new Date().toISOString() };
    }),
    definition('pingcode_create_page', '在明确空间及可选父页创建普通 Markdown 页面；不接受原始 HTML、附件、权限或作者参数。dry_run 只核对目标，页面关联需另行调用关联工具。', createSchema, false, async args => {
      const space = await client.get(`/v2/wiki/spaces/${args.space_id}`);
      requireId(space, args.space_id);
      if (space.is_archived || space.is_deleted) fail('SPACE_UNAVAILABLE');
      let parent = null;
      if (args.parent_id !== undefined) {
        parent = pageMetadata(await client.get(`/v2/wiki/pages/${args.parent_id}`), args.parent_id);
        if (parent.space?.id !== args.space_id) fail('PARENT_SPACE_MISMATCH');
        if (parent.is_archived || parent.is_deleted) fail('PARENT_UNAVAILABLE');
      }
      const body = {
        space_id: args.space_id, ...(args.parent_id ? { parent_id: args.parent_id } : {}),
        name: args.name, content: args.content, format_type: 'markdown',
      };
      if (args.dry_run) return {
        dry_run: true, write_performed: false,
        target: { space: selected(space, ['id', 'name', 'identifier']), parent },
        changes: { name: args.name, format_type: 'markdown', content_chars: Array.from(args.content).length },
      };
      const response = await client.post('/v2/wiki/pages', body);
      let page;
      try { page = pageMetadata(response); }
      catch { fail('WRITE_RESULT_UNKNOWN', { unknown: true }); }
      return {
        dry_run: false, write_performed: true, page, html_url: page.html_url ?? null,
        publication_status: 'unknown', visibility: 'unknown',
        limitations: ['OBSERVED_PAGE_FIELDS_ONLY', 'NO_RELATION_CREATED', 'TENANT_PUBLICATION_STATE_NOT_VERIFIED'],
      };
    }),
  ];
}
