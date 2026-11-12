import { z } from 'zod';
import { idSchema, paginationSchema, safeError } from './client.js';

const fail = code => { throw new Error(code); };
const WI = '/v2/pjm/workitems';
const DICTIONARY = '/v2/pjm/workitem';
const pageSchema = z.strictObject(paginationSchema);
const text = limit => z.string().min(1).max(limit).refine(value => value.trim().length > 0, 'Text cannot be blank');
// An explicit UTC offset is mandatory; epoch seconds and 0/1 are the API contract.
const dateSchema = z.strictObject({ date: z.iso.datetime({ offset: true, precision: 0 }), with_time: z.boolean() });
const mutableFields = {
  title: text(500).optional(), description: text(50_000).optional(), assignee_id: idSchema.optional(),
  state_id: idSchema.optional(), priority_id: idSchema.optional(), parent_id: idSchema.optional(),
  start: dateSchema.optional(), due: dateSchema.optional(),
};
const dryRun = { dry_run: z.boolean().default(false) };
const listSchema = z.strictObject({
  project_ids: z.array(idSchema).min(1).max(5).refine(ids => new Set(ids).size === ids.length, 'Project IDs must be unique'),
  assignee_id: idSchema.optional(), state_id: idSchema.optional(), type_id: idSchema.optional(),
  identifier: z.int().min(1).optional(), keywords: text(200).optional(), ...paginationSchema,
});
const getSchema = z.strictObject({
  work_item_id: idSchema, comments: pageSchema.optional(), relations: pageSchema.optional(), page_relations: pageSchema.optional(),
});
const createSchema = z.strictObject({ project_id: idSchema, type_id: idSchema, ...mutableFields, title: text(500), ...dryRun });
const updateSchema = z.strictObject({ work_item_id: idSchema, expected_updated_at: z.int().min(0), ...mutableFields, ...dryRun })
  .refine(args => Object.keys(mutableFields).some(key => args[key] !== undefined), 'At least one mutable field is required');
const commentSchema = z.strictObject({ work_item_id: idSchema, content: text(50_000), ...dryRun });
// Keep the root an object for SDK registration; refinement enforces the two fixed branches.
const relationSchema = z.strictObject({
  work_item_id: idSchema, kind: z.enum(['work_item', 'page']),
  target_work_item_id: idSchema.optional(), relation_type_id: idSchema.optional(), page_id: idSchema.optional(), ...dryRun,
}).refine(args => args.kind === 'work_item'
  ? args.target_work_item_id !== undefined && args.relation_type_id !== undefined && args.page_id === undefined
  : args.page_id !== undefined && args.target_work_item_id === undefined && args.relation_type_id === undefined,
'Supply only the fields of the selected relation branch');

function checkedId(value) {
  if (!idSchema.safeParse(value).success) fail('INVALID_UPSTREAM_REFERENCE');
  return value;
}
const pick = (value, keys) => Object.fromEntries(keys.filter(key => value[key] !== undefined).map(key => [key, value[key]]));
function changes(args) {
  const value = pick(args, Object.keys(mutableFields));
  for (const key of ['start', 'due']) if (value[key]) value[key] = { date: Date.parse(value[key].date) / 1000, with_time: Number(value[key].with_time) };
  return value;
}

// Search only a bounded dictionary. A miss in truncated data is never proof of invalidity.
async function findAvailable(client, path, query, predicate, missingCode) {
  for (let page_index = 0; page_index < 5; page_index++) {
    const page = await client.list(path, { ...query, page_index, page_size: 100 });
    const match = page.values.find(predicate);
    if (match) return match;
    if (!page.has_more) fail(missingCode);
  }
  fail('DICTIONARY_INCOMPLETE');
}

async function checkParent(client, projectId, typeId, parentId, currentId) {
  if (parentId === currentId) fail('SELF_PARENT');
  const parent = await client.get(`${WI}/${parentId}`);
  checkedId(parent.id);
  if (parent.id === currentId) fail('SELF_PARENT');
  if (parent.project?.id !== projectId) fail('PARENT_PROJECT_MISMATCH');
  const parentTypeId = checkedId(parent.type?.id);
  const plans = await client.list('/v2/pjm/workitem_type_plans', { for_project_id: projectId, page_index: 0, page_size: 100 });
  if (plans.has_more) fail('DICTIONARY_INCOMPLETE');
  if (plans.values.length !== 1) fail('TYPE_PLAN_AMBIGUOUS');
  const planId = checkedId(plans.values[0].id);
  const configured = await client.get(`/v2/pjm/workitem_type_plans/${planId}/workitem_types/${parentTypeId}`);
  if (configured.type?.id !== parentTypeId || !Array.isArray(configured.sub_types)) fail('PARENT_TYPE_UNVERIFIED');
  if (!configured.sub_types.some(type => type.id === typeId)) fail('PARENT_TYPE_MISMATCH');
  return parent.id;
}

async function validateFields(client, projectId, typeId, body, currentId) {
  const project = await client.get(`/v2/pjm/projects/${projectId}`);
  if (project.id !== projectId || project.is_deleted || project.is_archived) fail('PROJECT_UNAVAILABLE');
  const type = await findAvailable(client, `${DICTIONARY}/workitem_types`, { project_id: projectId }, row => row.id === typeId, 'TYPE_NOT_AVAILABLE');
  if (body.start && type.group === 'milestone') fail('MILESTONE_START_UNSUPPORTED');
  if (body.assignee_id) await findAvailable(client, `/v2/pjm/projects/${projectId}/members`, {},
    row => row.type === 'user' && row.user?.id === body.assignee_id, 'ASSIGNEE_MEMBERSHIP_UNVERIFIED');
  if (body.state_id) await findAvailable(client, `${DICTIONARY}/workitem_states`, { project_id: projectId, workitem_type_id: typeId },
    row => row.id === body.state_id, 'STATE_NOT_AVAILABLE');
  if (body.priority_id) await findAvailable(client, `${DICTIONARY}/workitem_priorities`, { project_id: projectId },
    row => row.id === body.priority_id, 'PRIORITY_NOT_AVAILABLE');
  if (body.parent_id) body.parent_id = await checkParent(client, projectId, typeId, body.parent_id, currentId);
}

async function readItem(client, id) {
  const item = await client.get(`${WI}/${id}`);
  checkedId(item.id);
  return item;
}

function writeResult(dry_run, target, body, result, expectedResultId) {
  if (!dry_run && (!idSchema.safeParse(result?.id).success || (expectedResultId !== undefined && result.id !== expectedResultId))) {
    throw Object.assign(new Error('WRITE_RESULT_UNKNOWN'), { code: 'WRITE_RESULT_UNKNOWN', unknown: true });
  }
  return { dry_run, target, changes: body, ...(dry_run ? {} : { result }) };
}

export function workitemTools(client) {
  return [
    {
      name: 'pingcode_list_work_items', readOnly: true, schema: listSchema,
      description: 'List one page per explicit project (at most five). Keywords match identifiers/titles only; an omitted assignee means all assignees. Reports filters, coverage and partial results.',
      execute: async args => {
        const filters = pick(args, ['assignee_id', 'state_id', 'type_id', 'identifier', 'keywords']);
        const results = [];
        for (const project_id of args.project_ids) {
          const query = { project_id, ...filters, page_index: args.page_index, page_size: args.page_size };
          try {
            const page = await client.list(WI, query);
            results.push({ project_id, effective_filters: query, ...page, partial: page.has_more || page.page_index > 0 });
          } catch (error) {
            results.push({ project_id, effective_filters: query, ...safeError(error), partial: true });
          }
        }
        return { requested_project_ids: args.project_ids, results, partial: results.some(result => result.partial), scope: 'explicit_projects_only', keywords_scope: 'identifier_or_title' };
      },
    },
    {
      name: 'pingcode_get_work_item', readOnly: true, schema: getSchema,
      description: 'Read one work item. Optional comments, internal relations and page relations each have their own page options. Linked page bodies and external URLs are not fetched.',
      execute: async args => {
        const work_item = await readItem(client, args.work_item_id);
        const id = work_item.id; const collections = {};
        const requests = [
          ['comments', '/v2/comments', { principal_type: 'workitem', principal_id: id }],
          ['relations', `${WI}/${id}/relations`, {}],
          ['page_relations', '/v2/relations', { principal_type: 'workitem', principal_id: id, target_type: 'page' }],
        ];
        for (const [name, path, scope] of requests) if (args[name]) {
          const query = { ...scope, ...args[name] };
          try {
            const page = await client.list(path, query);
            collections[name] = { effective_filters: query, ...page, partial: page.has_more || page.page_index > 0 };
          } catch (error) { collections[name] = { effective_filters: query, ...safeError(error), partial: true }; }
        }
        return { work_item, collections, partial: Object.values(collections).some(value => value.partial), linked_page_content_loaded: false };
      },
    },
    {
      name: 'pingcode_create_work_item', readOnly: false, schema: createSchema,
      description: 'Create one work item, child item or native milestone in an explicit project and type. Dates require ISO 8601 with UTC offset. dry_run only validates and previews; it does not prove write permission or a legal transition.',
      execute: async args => {
        const body = { project_id: args.project_id, type_id: args.type_id, ...changes(args) };
        await validateFields(client, args.project_id, args.type_id, body);
        const result = args.dry_run ? undefined : await client.post(WI, body);
        return writeResult(args.dry_run, { project_id: args.project_id, type_id: args.type_id }, body, result);
      },
    },
    {
      name: 'pingcode_update_work_item', readOnly: false, schema: updateSchema,
      description: 'Update only supplied whitelisted fields on one item. Requires expected_updated_at, checked before writing on a best-effort basis (not an atomic precondition). No null clearing, type changes or project moves. dry_run performs reads only.',
      execute: async args => {
        const current = await readItem(client, args.work_item_id);
        if (!Number.isSafeInteger(current.updated_at)) fail('UPDATE_VERSION_UNAVAILABLE');
        if (current.updated_at !== args.expected_updated_at) fail('UPDATE_CONFLICT');
        const projectId = checkedId(current.project?.id); const typeId = checkedId(current.type?.id);
        const body = changes(args);
        await validateFields(client, projectId, typeId, body, current.id);
        const result = args.dry_run ? undefined : await client.patch(`${WI}/${current.id}`, body);
        return { ...writeResult(args.dry_run, { work_item_id: current.id, project_id: projectId }, body, result, current.id), concurrency_check: 'best_effort', observed_updated_at: current.updated_at };
      },
    },
    {
      name: 'pingcode_add_comment', readOnly: false, schema: commentSchema,
      description: 'Append one comment to an explicit work item under the identity of the credential in use. Does not set an author or historical timestamp. dry_run reads the target and previews only.',
      execute: async args => {
        const item = await readItem(client, args.work_item_id);
        const body = { principal_type: 'workitem', principal_id: item.id, content: args.content };
        const result = args.dry_run ? undefined : await client.post('/v2/comments', body);
        return writeResult(args.dry_run, { work_item_id: item.id }, body, result);
      },
    },
    {
      name: 'pingcode_add_relation', readOnly: false, schema: relationSchema,
      description: 'Create either an internal work-item relation using a known relation type, or a fixed workitem-to-page association. Reads both targets first. dry_run previews only; no arbitrary principal/target types, downloads or retries.',
      execute: async args => {
        const origin = await readItem(client, args.work_item_id);
        let path; let body;
        if (args.kind === 'work_item') {
          const target = await readItem(client, args.target_work_item_id);
          if (origin.id === target.id) fail('SELF_RELATION');
          await findAvailable(client, '/v2/pjm/workitem_relation_types', {}, row => row.id === args.relation_type_id, 'RELATION_TYPE_NOT_AVAILABLE');
          path = `${WI}/${origin.id}/relations`;
          body = { target_workitem_id: target.id, relation_type_id: args.relation_type_id };
        } else {
          const page = await client.get(`/v2/wiki/pages/${args.page_id}`);
          if (page.id !== args.page_id) fail('PAGE_TARGET_MISMATCH');
          path = '/v2/relations';
          body = { principal_type: 'workitem', principal_id: origin.id, target_type: 'page', target_id: page.id };
        }
        const result = args.dry_run ? undefined : await client.post(path, body);
        return writeResult(args.dry_run, { work_item_id: origin.id, kind: args.kind }, body, result);
      },
    },
  ];
}
