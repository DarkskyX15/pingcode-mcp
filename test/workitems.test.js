import assert from 'node:assert/strict';
import { test } from 'node:test';

// Only the transport is fake: schemas, target checks and payload mapping run unchanged.
import { workitemTools } from '../workitems.js';
const page = (values, extra = {}) => ({ values, total: values.length, page_index: 0, page_size: 100, has_more: false, ...extra });
function fixture(overrides = {}) {
  const calls = [];
  const item = { id: 'w1', project: { id: 'p1' }, type: { id: 'task', group: 'task' }, title: 'Before', updated_at: 42 };
  const dictionaries = {
    '/v2/pjm/workitem/workitem_types': [{ id: 'task', group: 'task' }],
    '/v2/pjm/workitem/workitem_states': [{ id: 'done', type: 'completed' }],
    '/v2/pjm/workitem/workitem_priorities': [{ id: 'high' }],
    '/v2/pjm/projects/p1/members': [{ id: 'user1', type: 'user', user: { id: 'user1' } }],
    '/v2/pjm/workitem_relation_types': [{ id: 'blocks', category: 'block' }],
    '/v2/pjm/workitem_type_plans': [{ id: 'plan1' }],
  };
  const handlers = {
    get: async path => {
      if (path === '/v2/pjm/workitems/w1') return item;
      if (path === '/v2/pjm/workitems/parent' || path === '/v2/pjm/workitems/parent-short') return { id: 'parent', project: { id: 'p1' }, type: { id: 'story' } };
      if (path === '/v2/pjm/workitems/w2') return { id: 'w2', project: { id: 'p2' }, type: { id: 'task' } };
      if (path === '/v2/pjm/projects/p1') return { id: 'p1' };
      if (path === '/v2/pjm/workitem_type_plans/plan1/workitem_types/story') return { type: { id: 'story' }, sub_types: [{ id: 'task' }] };
      if (path === '/v2/wiki/pages/page1') return { id: 'page1', space: { id: 'space1' } };
      throw new Error('UNEXPECTED_TEST_GET');
    },
    list: async (path, query) => page(dictionaries[path] ?? [], { page_index: query.page_index, page_size: query.page_size }),
    post: async (_path, body) => ({ id: 'created', ...body }),
    patch: async (_path, body) => ({ ...item, ...body }),
    ...overrides,
  };
  const client = Object.fromEntries(Object.entries(handlers).map(([method, handler]) => [method, async (path, data = {}) => {
    calls.push({ method, path, data }); return handler(path, data);
  }]));
  const tools = workitemTools(client);
  const invoke = (name, args) => {
    const tool = tools.find(value => value.name === `pingcode_${name}`);
    return tool.execute(tool.schema.parse(args));
  };
  return { tools, invoke, calls, item, dictionaries };
}

test('six strict tools expose only the two read operations as read-only', () => {
  const { tools } = fixture();
  assert.deepEqual(tools.filter(t => t.readOnly).map(t => t.name).sort(), ['pingcode_get_work_item', 'pingcode_list_work_items']);
  assert.equal(tools.length, 6);
  for (const tool of tools) assert.equal(tool.schema.safeParse({ base_url: 'https://invalid.example' }).success, false);
});

test('cross-project list sends scalar filters and reports a failed project without claiming complete coverage', async () => {
  const { invoke, calls } = fixture({ list: async (_path, query) => {
    if (query.project_id === 'p2') throw Object.assign(new Error('private upstream text'), { code: 'FORBIDDEN' });
    return page([{ id: 'w1' }], { total: 8, page_index: 1, page_size: 2, has_more: true });
  } });
  const result = await invoke('list_work_items', { project_ids: ['p1', 'p2'], assignee_id: 'user1', keywords: 'ABC-5', page_index: 1, page_size: 2 });
  assert.deepEqual(calls.map(c => c.data), [
    { project_id: 'p1', assignee_id: 'user1', keywords: 'ABC-5', page_index: 1, page_size: 2 },
    { project_id: 'p2', assignee_id: 'user1', keywords: 'ABC-5', page_index: 1, page_size: 2 },
  ]);
  assert.equal(result.partial, true); assert.deepEqual(result.requested_project_ids, ['p1', 'p2']);
  assert.equal(result.results[0].has_more, true); assert.equal(result.results[1].error, 'FORBIDDEN');
  assert.doesNotMatch(JSON.stringify(result), /private upstream text/);
});

test('list does not infer a personal assignee and rejects unbounded or duplicate project scopes', async () => {
  const { tools, invoke, calls } = fixture();
  await invoke('list_work_items', { project_ids: ['p1'] });
  assert.equal('assignee_id' in calls[0].data, false);
  const schema = tools.find(t => t.name === 'pingcode_list_work_items').schema;
  for (const args of [{ project_ids: [] }, { project_ids: ['p1', 'p1'] }, { project_ids: ['a', 'b', 'c', 'd', 'e', 'f'] }, { project_ids: ['../x'] }, { project_ids: ['p1'], due_before: 'tomorrow' }]) assert.equal(schema.safeParse(args).success, false);
});

test('get reads optional comments and both relation collections with independent pagination and partial failures', async () => {
  const { invoke, calls } = fixture({ list: async (path, query) => {
    if (path === '/v2/relations') throw Object.assign(new Error('denied'), { code: 'FORBIDDEN' });
    return page([{ id: 'entry' }], { page_index: query.page_index, page_size: query.page_size });
  } });
  const result = await invoke('get_work_item', { work_item_id: 'w1', comments: { page_index: 2, page_size: 3 }, relations: { page_index: 1, page_size: 4 }, page_relations: { page_size: 5 } });
  assert.equal(result.work_item.id, 'w1'); assert.equal(result.partial, true);
  assert.deepEqual(calls.slice(1), [
    { method: 'list', path: '/v2/comments', data: { principal_type: 'workitem', principal_id: 'w1', page_index: 2, page_size: 3 } },
    { method: 'list', path: '/v2/pjm/workitems/w1/relations', data: { page_index: 1, page_size: 4 } },
    { method: 'list', path: '/v2/relations', data: { principal_type: 'workitem', principal_id: 'w1', target_type: 'page', page_index: 0, page_size: 5 } },
  ]);
  assert.equal(result.collections.page_relations.error, 'FORBIDDEN');
});

test('create dry run validates target dictionaries and parent type but makes no write', async () => {
  const { invoke, calls } = fixture();
  const result = await invoke('create_work_item', { project_id: 'p1', type_id: 'task', title: 'New', assignee_id: 'user1', state_id: 'done', priority_id: 'high', parent_id: 'parent', dry_run: true });
  assert.equal(result.dry_run, true); assert.equal(result.changes.parent_id, 'parent');
  assert.equal(calls.some(c => ['post', 'patch'].includes(c.method)), false);
  assert.ok(calls.some(c => c.path === '/v2/pjm/workitem_type_plans/plan1/workitem_types/story'));
});

test('create maps explicit offset dates to official epoch seconds and with_time integers', async () => {
  const { invoke, calls } = fixture();
  await invoke('create_work_item', { project_id: 'p1', type_id: 'task', title: 'New', description: 'Text', due: { date: '2026-10-22T09:00:00+08:00', with_time: true } });
  assert.deepEqual(calls.find(c => c.method === 'post'), { method: 'post', path: '/v2/pjm/workitems', data: { project_id: 'p1', type_id: 'task', title: 'New', description: 'Text', due: { date: 1792630800, with_time: 1 } } });
});

test('schemas reject null clearing, arbitrary properties, author impersonation and dates without timezone', () => {
  const { tools } = fixture();
  const create = tools.find(t => t.name === 'pingcode_create_work_item').schema;
  const update = tools.find(t => t.name === 'pingcode_update_work_item').schema;
  const comment = tools.find(t => t.name === 'pingcode_add_comment').schema;
  for (const extra of [{ properties: {} }, { assignee_id: null }, { assignee_id: '' }, { due: null }, { due: { date: '2026-10-22T09:00:00', with_time: true } }]) assert.equal(create.safeParse({ project_id: 'p1', type_id: 'task', title: 'New', ...extra }).success, false);
  for (const extra of [{ project_id: 'p2' }, { type_id: 'bug' }, { properties: {} }, { due: null }]) assert.equal(update.safeParse({ work_item_id: 'w1', expected_updated_at: 42, title: 'New', ...extra }).success, false);
  assert.equal(update.safeParse({ work_item_id: 'w1', expected_updated_at: 42 }).success, false);
  assert.equal(comment.safeParse({ work_item_id: 'w1', content: 'Hi', created_by: 'admin' }).success, false);
});

test('invalid dictionary IDs and incomplete dictionary coverage cannot authorize a write', async () => {
  const f = fixture(); f.dictionaries['/v2/pjm/workitem/workitem_types'] = [];
  await assert.rejects(f.invoke('create_work_item', { project_id: 'p1', type_id: 'unknown', title: 'New' }), /TYPE_NOT_AVAILABLE/);
  assert.equal(f.calls.some(c => c.method === 'post'), false);
  let pages = 0;
  const g = fixture({ list: async () => { pages++; return page([], { total: 900, has_more: true }); } });
  await assert.rejects(g.invoke('create_work_item', { project_id: 'p1', type_id: 'unknown', title: 'New', dry_run: true }), /DICTIONARY_INCOMPLETE/);
  assert.equal(pages, 5);
});

test('a parent in another project or a disallowed parent type is rejected before write', async () => {
  const f = fixture();
  await assert.rejects(f.invoke('create_work_item', { project_id: 'p1', type_id: 'task', title: 'New', parent_id: 'w2' }), /PARENT_PROJECT_MISMATCH/);
  const g = fixture({ get: async path => {
    if (path === '/v2/pjm/projects/p1') return { id: 'p1' };
    if (path === '/v2/pjm/workitems/parent') return { id: 'parent', project: { id: 'p1' }, type: { id: 'story' } };
    if (path === '/v2/pjm/workitem_type_plans/plan1/workitem_types/story') return { type: { id: 'story' }, sub_types: [] };
    throw new Error('UNEXPECTED_TEST_GET');
  } });
  await assert.rejects(g.invoke('create_work_item', { project_id: 'p1', type_id: 'task', title: 'New', parent_id: 'parent' }), /PARENT_TYPE_MISMATCH/);
  assert.equal([...f.calls, ...g.calls].some(c => c.method === 'post'), false);
});

test('update reads current version first and refuses a stale or unavailable expected version', async () => {
  const { invoke, calls, item } = fixture();
  await assert.rejects(invoke('update_work_item', { work_item_id: 'w1', expected_updated_at: 41, title: 'After' }), /UPDATE_CONFLICT/);
  delete item.updated_at;
  await assert.rejects(invoke('update_work_item', { work_item_id: 'w1', expected_updated_at: 42, title: 'After' }), /UPDATE_VERSION_UNAVAILABLE/);
  assert.equal(calls.every(c => c.method === 'get'), true);
});

test('update sends only the explicitly supplied mutable fields and labels conflict checking as best effort', async () => {
  const { invoke, calls } = fixture();
  const result = await invoke('update_work_item', { work_item_id: 'w1', expected_updated_at: 42, title: 'After' });
  assert.deepEqual(calls.find(c => c.method === 'patch'), { method: 'patch', path: '/v2/pjm/workitems/w1', data: { title: 'After' } });
  assert.equal(result.concurrency_check, 'best_effort');
});

test('comment targets only the specified work item without fabricated author or time', async () => {
  const { invoke, calls } = fixture();
  await invoke('add_comment', { work_item_id: 'w1', content: 'Decision' });
  assert.deepEqual(calls.find(c => c.method === 'post'), { method: 'post', path: '/v2/comments', data: { principal_type: 'workitem', principal_id: 'w1', content: 'Decision' } });
});

test('relations use distinct official payloads for internal work items and workitem to page', async () => {
  const { invoke, calls } = fixture();
  await invoke('add_relation', { work_item_id: 'w1', kind: 'work_item', target_work_item_id: 'w2', relation_type_id: 'blocks' });
  await invoke('add_relation', { work_item_id: 'w1', kind: 'page', page_id: 'page1' });
  assert.deepEqual(calls.filter(c => c.method === 'post'), [
    { method: 'post', path: '/v2/pjm/workitems/w1/relations', data: { target_workitem_id: 'w2', relation_type_id: 'blocks' } },
    { method: 'post', path: '/v2/relations', data: { principal_type: 'workitem', principal_id: 'w1', target_type: 'page', target_id: 'page1' } },
  ]);
});

test('relation branches reject mixed fields, unsupported targets and self relation', async () => {
  const { invoke, tools } = fixture(); const schema = tools.find(t => t.name === 'pingcode_add_relation').schema;
  for (const args of [{ kind: 'page', page_id: 'page1', relation_type_id: 'blocks' }, { kind: 'work_item', target_work_item_id: 'w2' }, { kind: 'arbitrary', target_id: 'x' }]) assert.equal(schema.safeParse({ work_item_id: 'w1', ...args }).success, false);
  await assert.rejects(invoke('add_relation', { work_item_id: 'w1', kind: 'work_item', target_work_item_id: 'w1', relation_type_id: 'blocks' }), /SELF_RELATION/);
});

test('all remaining write tools support dry run without a post or patch', async () => {
  const { invoke, calls } = fixture();
  await invoke('update_work_item', { work_item_id: 'w1', expected_updated_at: 42, title: 'After', dry_run: true });
  await invoke('add_comment', { work_item_id: 'w1', content: 'Decision', dry_run: true });
  await invoke('add_relation', { work_item_id: 'w1', kind: 'page', page_id: 'page1', dry_run: true });
  await invoke('add_relation', { work_item_id: 'w1', kind: 'work_item', target_work_item_id: 'w2', relation_type_id: 'blocks', dry_run: true });
  assert.equal(calls.some(c => ['post', 'patch'].includes(c.method)), false);
});

test('an unknown write outcome propagates without retrying or fabricating success', async () => {
  const unknown = Object.assign(new Error('WRITE_OUTCOME_UNKNOWN'), { code: 'WRITE_OUTCOME_UNKNOWN', unknown: true });
  const { invoke, calls } = fixture({ post: async () => { throw unknown; } });
  await assert.rejects(invoke('add_comment', { work_item_id: 'w1', content: 'Decision' }), error => error === unknown);
  assert.equal(calls.filter(c => c.method === 'post').length, 1);
});

test('partial reads retain controlled request and rate-limit metadata', async () => {
  const { invoke } = fixture({ list: async () => { throw Object.assign(new Error('private response'), { code: 'RATE_LIMITED', status: 429, request_id: 'request-1', retry_after_seconds: 12 }); } });
  const result = await invoke('list_work_items', { project_ids: ['p1'] });
  assert.equal(result.results[0].request_id, 'request-1');
  assert.equal(result.results[0].retry_after_seconds, 12);
  assert.doesNotMatch(JSON.stringify(result), /private response/);
});

test('resolved parent aliases cannot make the item its own parent during a dry run', async () => {
  const { invoke, calls } = fixture({ get: async path => {
    if (path === '/v2/pjm/projects/p1') return { id: 'p1' };
    if (path === '/v2/pjm/workitems/w1' || path === '/v2/pjm/workitems/short-alias') return { id: 'w1', project: { id: 'p1' }, type: { id: 'task' }, updated_at: 42 };
    throw new Error('UNEXPECTED_TEST_GET');
  } });
  await assert.rejects(invoke('update_work_item', { work_item_id: 'w1', expected_updated_at: 42, parent_id: 'short-alias', dry_run: true }), /SELF_PARENT/);
  assert.equal(calls.some(c => c.method === 'patch'), false);
});

test('a write response without a valid object ID is unknown and never retried', async () => {
  for (const [name, args] of [
    ['create_work_item', { project_id: 'p1', type_id: 'task', title: 'New' }],
    ['update_work_item', { work_item_id: 'w1', expected_updated_at: 42, title: 'After' }],
    ['add_comment', { work_item_id: 'w1', content: 'Decision' }],
    ['add_relation', { work_item_id: 'w1', kind: 'page', page_id: 'page1' }],
    ['add_relation', { work_item_id: 'w1', kind: 'work_item', target_work_item_id: 'w2', relation_type_id: 'blocks' }],
  ]) {
    for (const response of [{}, { id: '' }, { id: '../invalid' }, { id: null }]) {
      const { invoke, calls } = fixture({ post: async () => response, patch: async () => response });
      await assert.rejects(invoke(name, args), error => error.code === 'WRITE_RESULT_UNKNOWN' && error.unknown === true);
      assert.equal(calls.filter(c => ['post', 'patch'].includes(c.method)).length, 1);
    }
  }
});

test('an update response identifying another work item is unknown and never retried', async () => {
  const { invoke, calls } = fixture({ patch: async () => ({ id: 'different-item', title: 'After' }) });
  await assert.rejects(invoke('update_work_item', { work_item_id: 'w1', expected_updated_at: 42, title: 'After' }),
    error => error.code === 'WRITE_RESULT_UNKNOWN' && error.unknown === true);
  assert.equal(calls.filter(call => call.method === 'patch').length, 1);
});

for (const [name, args, method] of [
  ['create_work_item', { project_id: 'p1', type_id: 'task', title: 'New' }, 'post'],
  ['update_work_item', { work_item_id: 'w1', expected_updated_at: 42 }, 'patch'],
]) test(`${name} normalizes a validated parent short ID to its canonical ID`, async () => {
  const { invoke, calls } = fixture();
  const preview = await invoke(name, { ...args, parent_id: 'parent-short', dry_run: true });
  assert.equal(preview.changes.parent_id, 'parent');
  await invoke(name, { ...args, parent_id: 'parent-short' });
  assert.equal(calls.find(call => call.method === method).data.parent_id, 'parent');
});
