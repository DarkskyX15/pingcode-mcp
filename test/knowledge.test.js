import test from 'node:test';
import assert from 'node:assert/strict';

const module = await import('../knowledge.js').catch(error => {
  if (error.code === 'ERR_MODULE_NOT_FOUND' && error.message.includes('/knowledge.js')) return {};
  throw error;
});
const page = (extra = {}) => ({
  id: 'page-1', short_id: 'short1', html_url: 'https://team.pingcode.com/wiki/pages/short1',
  name: '方法记录', type: 'document', space: { id: 'space-1', name: '研究' },
  parent: { id: 'parent-1', name: '方法' }, created_at: 100, updated_at: 200,
  created_by: { id: 'app-author', name: 'API application' }, published_at: 0,
  is_locked: 0, is_archived: 0, is_deleted: 0, ...extra,
});
const collection = (values, extra = {}) => ({ values, total: values.length, page_index: 0, page_size: 25, has_more: false, ...extra });
function fakeClient(responses = {}) {
  const calls = [];
  const request = method => async (path, args = {}) => {
    calls.push({ method, path, args });
    const key = `${method} ${path}`;
    assert.ok(Object.hasOwn(responses, key), `unexpected request ${key}`);
    const response = responses[key];
    if (response instanceof Error) throw response;
    return structuredClone(response);
  };
  return { calls, get: request('get'), list: request('list'), post: request('post') };
}
function tool(name, client) {
  assert.equal(typeof module.knowledgeTools, 'function', 'knowledgeTools must implement the page tools');
  const found = module.knowledgeTools(client).find(item => item.name === `pingcode_${name}`);
  assert.ok(found, `missing ${name}`);
  return found;
}
function readable(extra = {}) {
  return fakeClient({
    'get /v2/wiki/pages/page-1': page(),
    'get /v2/wiki/pages/page-1/content': { id: 'body-id-is-not-a-version', format_type: 'markdown', content: '# 结果\n[原文](https://example.invalid/paper)' },
    ...extra,
  });
}
function writable(extra = {}) {
  return fakeClient({
    'get /v2/wiki/spaces/space-1': { id: 'space-1', name: '研究', is_archived: 0, is_deleted: 0 },
    'get /v2/wiki/pages/parent-1': page({ id: 'parent-1', parent: undefined }),
    'post /v2/wiki/pages': page({ id: 'created-1' }),
    ...extra,
  });
}
const createInput = { space_id: 'space-1', parent_id: 'parent-1', name: '实验记录', content: '# 记录\n[来源](https://example.invalid/paper)' };

test('registers exactly three static page tools with read and write annotations', () => {
  const client = fakeClient();
  const first = tool('list_pages', client);
  assert.deepEqual(module.knowledgeTools(client).map(({ name, readOnly }) => [name, readOnly]), [
    ['pingcode_list_pages', true], ['pingcode_get_page', true], ['pingcode_create_page', false],
  ]);
  assert.equal(first.schema.safeParse({ space_id: 's', token: 'not-allowed' }).success, false);
});

test('listing filters titles only inside one requested page and preserves server pagination', async () => {
  const client = fakeClient({ 'list /v2/wiki/pages': collection([
    page(), page({ id: 'page-2', name: '其他主题' }),
  ], { total: 12, page_index: 1, page_size: 2, has_more: true }) });
  const result = await tool('list_pages', client).execute({ space_id: 'space-1', parent_id: 'parent-1', title_contains: '方法', page_index: 1, page_size: 2 });
  assert.deepEqual(client.calls, [{ method: 'list', path: '/v2/wiki/pages', args: { space_id: 'space-1', parent_id: 'parent-1', page_index: 1, page_size: 2 } }]);
  assert.deepEqual(result.values.map(value => value.id), ['page-1']);
  assert.equal(result.total, 12);
  assert.equal(result.has_more, true);
  assert.equal(result.page_index, 1);
  assert.equal(result.matched_in_page, 1);
  assert.equal(result.enumerated_in_page, 2);
  assert.equal(result.title_filter_scope, 'returned_page_only');
  assert.equal(result.full_text_search, false);
  assert.equal(result.partial, true);
  assert.equal(result.effective_filters.title_contains, '方法');
});

test('ancestor listing uses fixed API parameters and supplies default pagination', async () => {
  const client = fakeClient({ 'list /v2/wiki/pages': collection([]) });
  const result = await tool('list_pages', client).execute({ space_id: 'space-1', ancestor_id: 'ancestor-1' });
  assert.deepEqual(client.calls[0], { method: 'list', path: '/v2/wiki/pages', args: { space_id: 'space-1', ancestor_id: 'ancestor-1', page_index: 0, page_size: 25 } });
  assert.equal(result.partial, false);
});

test('page tools reject ambiguous scopes, path injection and undeclared parameters before any request', async () => {
  const client = fakeClient();
  for (const [name, args] of [
    ['list_pages', {}], ['list_pages', { space_id: 's', parent_id: 'p', ancestor_id: 'a' }],
    ['list_pages', { space_id: '../other' }], ['list_pages', { space_id: 's', page_size: 101 }],
    ['get_page', { page_id: 'p', format_type: 'html' }], ['get_page', { page_id: 'p', include_public_image_token: 'content' }],
    ['create_page', { ...createInput, author_id: 'someone-else' }],
    ['create_page', { ...createInput, format_type: 'html' }],
  ]) await assert.rejects(tool(name, client).execute(args), /INVALID_ARGUMENT/);
  assert.equal(client.calls.length, 0);
});

test('listing returns bounded page metadata without unrequested bodies, image tokens or extension objects', async () => {
  const client = fakeClient({ 'list /v2/wiki/pages': collection([page({ content: 'not enumerated', public_image_token: 'private-image-token', entity_properties: { oversized: 'private extension' } })]) });
  const result = await tool('list_pages', client).execute({ space_id: 'space-1' });
  assert.doesNotMatch(JSON.stringify(result), /not enumerated|private-image-token|private extension/);
  assert.equal(result.values[0].html_url, 'https://team.pingcode.com/wiki/pages/short1');
});

test('unexpected oversized page metadata fails explicitly instead of silently trimming names', async () => {
  const client = fakeClient({ 'list /v2/wiki/pages': collection([page({ name: 'x'.repeat(100_000) })]) });
  await assert.rejects(tool('list_pages', client).execute({ space_id: 'space-1' }), /UPSTREAM_RESPONSE_TOO_LARGE/);
});

test('current page content does not fabricate a version from the body ID or modification time', async () => {
  const client = readable();
  const result = await tool('get_page', client).execute({ page_id: 'page-1' });
  assert.deepEqual(client.calls, [
    { method: 'get', path: '/v2/wiki/pages/page-1', args: {} },
    { method: 'get', path: '/v2/wiki/pages/page-1/content', args: { format_type: 'markdown' } },
  ]);
  assert.deepEqual(result.version, { id: null, pinned: false });
  assert.equal(result.content.value, '# 结果\n[原文](https://example.invalid/paper)');
  assert.equal(result.content.complete_text, true);
  assert.equal(result.representation_complete, false);
  assert.equal(result.attachments_fetched, false);
  assert.ok(result.limitations.includes('CURRENT_VERSION_UNKNOWN'));
  assert.ok(result.limitations.includes('RICH_CONTENT_MAY_BE_MISSING'));
  assert.ok(!Number.isNaN(Date.parse(result.retrieved_at)));
});

test('historical content verifies page membership and sends the requested version to the content endpoint', async () => {
  const client = readable({
    'get /v2/wiki/pages/page-1/versions/version-2': { id: 'version-2', page: { id: 'page-1' }, name: 'v2', order: 2, status: 'published', created_at: 150 },
    'get /v2/wiki/pages/page-1/content': { format_type: 'text', content: '历史正文' },
  });
  const result = await tool('get_page', client).execute({ page_id: 'page-1', version_id: 'version-2', format_type: 'text' });
  // The content server must honor the selected representation too.
  assert.equal(result.version.id, 'version-2');
  assert.equal(result.version.pinned, true);
  assert.deepEqual(client.calls.at(-1), { method: 'get', path: '/v2/wiki/pages/page-1/content', args: { format_type: 'text', version_id: 'version-2' } });
  assert.equal(result.metadata_scope, 'current_page_metadata');
});

test('missing or mismatched historical versions never fall back to current content', async () => {
  for (const response of [new Error('PINGCODE_HTTP_404'), { id: 'version-2', page: { id: 'other-page' } }]) {
    const client = readable({ 'get /v2/wiki/pages/page-1/versions/version-2': response });
    await assert.rejects(tool('get_page', client).execute({ page_id: 'page-1', version_id: 'version-2' }), /PINGCODE_HTTP_404|VERSION_PAGE_MISMATCH/);
    assert.equal(client.calls.some(call => call.path.endsWith('/content')), false);
  }
});

test('version listing is opt-in, paginated independently, and cannot pin current content', async () => {
  const client = readable({ 'list /v2/wiki/pages/page-1/versions': collection([{ id: 'v2', page: { id: 'page-1' }, status: 'published', name: 'v2' }], { page_index: 2, page_size: 1, total: 4, has_more: true }) });
  const result = await tool('get_page', client).execute({ page_id: 'page-1', include_versions: true, versions_page_index: 2, versions_page_size: 1 });
  assert.deepEqual(client.calls.at(-1), { method: 'list', path: '/v2/wiki/pages/page-1/versions', args: { page_index: 2, page_size: 1 } });
  assert.equal(result.versions.has_more, true);
  assert.equal(result.versions.page_index, 2);
  assert.equal(result.version.id, null);
});

test('an optional version-list failure preserves readable content and identifies partial results', async () => {
  const client = readable({ 'list /v2/wiki/pages/page-1/versions': new Error('PINGCODE_HTTP_403') });
  const result = await tool('get_page', client).execute({ page_id: 'page-1', include_versions: true });
  assert.ok(result.content.value.startsWith('# 结果'));
  assert.equal(result.versions.error, 'PINGCODE_HTTP_403');
  assert.equal(result.partial, true);
});

test('content windows report their exact Unicode range and do not silently lose long content', async () => {
  const client = readable({ 'get /v2/wiki/pages/page-1/content': { format_type: 'markdown', content: '甲😀乙丙' } });
  const result = await tool('get_page', client).execute({ page_id: 'page-1', content_offset: 1, max_content_chars: 2 });
  assert.equal(result.content.value, '😀乙');
  assert.equal(result.content.total_chars, 4);
  assert.equal(result.content.returned_chars, 2);
  assert.equal(result.content.has_more, true);
  assert.equal(result.content.next_offset, 3);
  assert.equal(result.content.complete_text, false);
  assert.equal(result.partial, true);
  assert.ok(result.limitations.includes('CONTENT_WINDOW_ONLY'));
});

test('content offsets outside the available body and oversized windows are rejected', async () => {
  const client = readable({ 'get /v2/wiki/pages/page-1/content': { format_type: 'markdown', content: '短文' } });
  await assert.rejects(tool('get_page', client).execute({ page_id: 'page-1', content_offset: 3 }), /CONTENT_OFFSET_OUT_OF_RANGE/);
  await assert.rejects(tool('get_page', client).execute({ page_id: 'page-1', max_content_chars: 100_000 }), /INVALID_ARGUMENT/);
});

test('unexpected HTML and missing content are not presented as successfully read Markdown', async () => {
  for (const response of [{ format_type: 'html', content: '<script>bad()</script>' }, { format_type: 'markdown' }]) {
    const client = readable({ 'get /v2/wiki/pages/page-1/content': response });
    await assert.rejects(tool('get_page', client).execute({ page_id: 'page-1' }), /CONTENT_FORMAT_UNEXPECTED|PAGE_CONTENT_UNAVAILABLE/);
  }
});

test('group metadata is returned without attempting an unsupported document-body read', async () => {
  const client = fakeClient({ 'get /v2/wiki/pages/page-1': page({ type: 'group' }) });
  const result = await tool('get_page', client).execute({ page_id: 'page-1' });
  assert.equal(client.calls.length, 1);
  assert.equal(result.content, null);
  assert.ok(result.limitations.includes('NON_DOCUMENT_PAGE'));
});

test('image preview tokens are not requested or included in page output', async () => {
  const client = readable({ 'get /v2/wiki/pages/page-1/content': { format_type: 'markdown', content: '普通正文', public_image_token: 'private-image-token', url: 'https://open.pingcode.com/content?token=private-image-token' } });
  const result = await tool('get_page', client).execute({ page_id: 'page-1' });
  assert.doesNotMatch(JSON.stringify(result), /private-image-token|public_image_token/);
  assert.deepEqual(client.calls[1].args, { format_type: 'markdown' });
});

test('create dry run resolves the exact space and parent without any write or relation request', async () => {
  const client = writable();
  const result = await tool('create_page', client).execute({ ...createInput, dry_run: true });
  assert.deepEqual(client.calls.map(call => [call.method, call.path]), [['get', '/v2/wiki/spaces/space-1'], ['get', '/v2/wiki/pages/parent-1']]);
  assert.equal(result.dry_run, true);
  assert.equal(result.write_performed, false);
  assert.equal(result.target.space.id, 'space-1');
  assert.equal(result.target.parent.id, 'parent-1');
  assert.equal(result.changes.name, '实验记录');
  assert.equal(result.changes.format_type, 'markdown');
});

test('a parent from another space prevents both preview and creation', async () => {
  for (const dry_run of [true, false]) {
    const client = writable({ 'get /v2/wiki/pages/parent-1': page({ id: 'parent-1', space: { id: 'other-space' } }) });
    await assert.rejects(tool('create_page', client).execute({ ...createInput, dry_run }), /PARENT_SPACE_MISMATCH/);
    assert.equal(client.calls.some(call => call.method === 'post'), false);
  }
});

test('archived or deleted target containers prevent writes', async () => {
  for (const extra of [
    { 'get /v2/wiki/spaces/space-1': { id: 'space-1', is_archived: 1 } },
    { 'get /v2/wiki/pages/parent-1': page({ id: 'parent-1', is_deleted: 1 }) },
  ]) {
    const client = writable(extra);
    await assert.rejects(tool('create_page', client).execute(createInput), /SPACE_UNAVAILABLE|PARENT_UNAVAILABLE/);
    assert.equal(client.calls.some(call => call.method === 'post'), false);
  }
});

test('creation sends one Markdown object and reports actual identity without inventing a draft state', async () => {
  const client = writable();
  const result = await tool('create_page', client).execute(createInput);
  assert.deepEqual(client.calls.at(-1), { method: 'post', path: '/v2/wiki/pages', args: { ...createInput, format_type: 'markdown' } });
  assert.equal(client.calls.filter(call => call.method === 'post').length, 1);
  assert.equal(result.page.id, 'created-1');
  assert.equal(result.page.created_by.id, 'app-author');
  assert.equal(result.publication_status, 'unknown');
  assert.equal(result.visibility, 'unknown');
  assert.equal(result.page.published_at, 0);
});

test('root-page creation omits parent_id and only checks the selected space', async () => {
  const client = writable();
  const { parent_id, ...input } = createInput;
  await tool('create_page', client).execute(input);
  assert.deepEqual(client.calls.map(call => call.method), ['get', 'post']);
  assert.equal(Object.hasOwn(client.calls[1].args, 'parent_id'), false);
});

test('blank titles, unbounded content and raw HTML cannot create pages', async () => {
  const client = fakeClient();
  for (const change of [{ name: '  ' }, { content: '' }, { content: 'x'.repeat(100_000) }, { content: '<script>bad()</script>' }]) {
    await assert.rejects(tool('create_page', client).execute({ ...createInput, ...change }), /INVALID_ARGUMENT/);
  }
  assert.equal(client.calls.length, 0);
});

test('unknown write results and malformed success responses never trigger a duplicate POST', async () => {
  for (const response of [new Error('WRITE_RESULT_UNKNOWN'), {}]) {
    const client = writable({ 'post /v2/wiki/pages': response });
    await assert.rejects(tool('create_page', client).execute(createInput), /WRITE_RESULT_UNKNOWN/);
    assert.equal(client.calls.filter(call => call.method === 'post').length, 1);
  }
});
