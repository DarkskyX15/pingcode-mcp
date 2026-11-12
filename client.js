/** Fixed PingCode V2 transport. No cookies, arbitrary endpoints, redirects or automatic replay. */
import { z } from 'zod';
import { readCredentials, credentialIdentity } from './auth.js';

export const idSchema = z.string().regex(/^[A-Za-z0-9_-]{1,128}$/);
export const paginationSchema = {
  page_index: z.number().int().min(0).max(100000).default(0),
  page_size: z.number().int().min(1).max(100).default(25)
};

const ID = '[A-Za-z0-9_-]{1,128}';
const pageKeys = ['page_index', 'page_size'];
// A route may be limited to an authentication mode; /v2/myself has no enterprise meaning.
const route = (pattern, query = [], body = [], modes = null) => ({ pattern: new RegExp(`^${pattern}$`), query: new Set([...query, ...pageKeys]), body: new Set(body), modes: modes ? new Set(modes) : null });
const fields = ['title', 'description', 'assignee_id', 'state_id', 'priority_id', 'start', 'due', 'parent_id'];
const routes = {
  GET: [
    route('/v2/directory/team'),
    route('/v2/myself', [], [], ['personal']),
    route('/v2/pjm/projects', ['keywords']), route(`/v2/pjm/projects/${ID}`),
    route(`/v2/pjm/projects/${ID}/members`), route(`/v2/pjm/projects/${ID}/members/${ID}`),
    route('/v2/pjm/workitem/workitem_types', ['project_id']),
    route('/v2/pjm/workitem/workitem_states', ['project_id', 'workitem_type_id']),
    route('/v2/pjm/workitem/workitem_priorities', ['project_id']),
    route('/v2/pjm/workitem_relation_types'),
    route('/v2/pjm/workitem_type_plans', ['for_project_id']),
    route(`/v2/pjm/workitem_type_plans/${ID}/workitem_types/${ID}`),
    route('/v2/pjm/workitems', ['project_id', 'identifier', 'keywords', 'assignee_id', 'state_id', 'priority_id', 'type_id', 'parent_id', 'include_public_image_token']),
    route(`/v2/pjm/workitems/${ID}`, ['include_public_image_token']),
    route(`/v2/pjm/workitems/${ID}/relations`, ['relation_type']),
    route('/v2/comments', ['principal_type', 'principal_id']),
    route('/v2/relations', ['principal_type', 'principal_id', 'target_type']),
    route('/v2/wiki/spaces', ['keywords']), route(`/v2/wiki/spaces/${ID}`),
    route('/v2/wiki/pages', ['space_id', 'parent_id', 'ancestor_id']),
    route(`/v2/wiki/pages/${ID}`),
    route(`/v2/wiki/pages/${ID}/content`, ['format_type', 'version_id']),
    route(`/v2/wiki/pages/${ID}/versions`),
    route(`/v2/wiki/pages/${ID}/versions/${ID}`)
  ],
  POST: [
    route('/v2/pjm/workitems', [], ['project_id', 'type_id', ...fields]),
    route('/v2/comments', [], ['principal_type', 'principal_id', 'content']),
    route(`/v2/pjm/workitems/${ID}/relations`, [], ['target_workitem_id', 'relation_type_id']),
    route('/v2/relations', [], ['principal_type', 'principal_id', 'target_type', 'target_id']),
    route('/v2/wiki/pages', [], ['space_id', 'parent_id', 'name', 'content', 'format_type'])
  ],
  PATCH: [route(`/v2/pjm/workitems/${ID}`, [], fields)]
};

function failure(code, details = {}) {
  return Object.assign(new Error(code), { code, ...details });
}

function validate(method, path, query, body, mode = 'enterprise') {
  const match = typeof path === 'string' && routes[method]?.find(item => item.pattern.test(path));
  if (!match) throw failure('ROUTE_NOT_ALLOWED');
  if (match.modes && !match.modes.has(mode)) throw failure('ROUTE_NOT_ALLOWED');
  for (const [key, value] of Object.entries(query)) {
    if (!match.query.has(key) || !['string', 'number', 'boolean'].includes(typeof value) || String(value).length > 512) throw failure('QUERY_NOT_ALLOWED');
    if (pageKeys.includes(key) && (!Number.isInteger(value) || value < (key === 'page_size' ? 1 : 0) || value > (key === 'page_size' ? 100 : 100000))) throw failure('INVALID_PAGINATION');
  }
  if (body !== undefined) {
    if (!body || Array.isArray(body) || typeof body !== 'object' || !Object.keys(body).length || Object.keys(body).some(key => !match.body.has(key)) || Object.values(body).some(value => value === null)) throw failure('BODY_NOT_ALLOWED');
    if (path === '/v2/comments' && body.principal_type !== 'workitem') throw failure('BODY_NOT_ALLOWED');
    if (path === '/v2/relations' && (body.principal_type !== 'workitem' || body.target_type !== 'page')) throw failure('BODY_NOT_ALLOWED');
    if (path === '/v2/wiki/pages' && body.format_type !== 'markdown') throw failure('BODY_NOT_ALLOWED');
    if (Buffer.byteLength(JSON.stringify(body)) > 131072) throw failure('INPUT_TOO_LARGE');
  }
}

export function redactOutput(value, secrets = []) {
  if (typeof value === 'string') {
    for (const secret of secrets) if (secret) value = value.split(secret).join('[REDACTED]');
    return value.replace(/((?:[?&]|\b)(?:access_token|refresh_token|public_image_token|client_secret|password|token|api[_-]?key|signature|sig|x-amz-(?:signature|credential|security-token)|x-goog-(?:signature|credential))=)[^&#\s<>"')]+/gi, '$1[REDACTED]')
      .replace(/(\bBearer\s+)[A-Za-z0-9._~+\/-]+=*/gi, '$1[REDACTED]');
  }
  if (Array.isArray(value)) return value.map(item => redactOutput(item, secrets));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [redactOutput(key, secrets), /^(access_token|refresh_token|client_secret|password|authorization|cookie|public_image_token|token|api[_-]?key)$/i.test(key) ? '[REDACTED]' : redactOutput(item, secrets)]));
  return value;
}

async function jsonBody(response) {
  const chunks = []; let size = 0;
  const reader = response.body?.getReader();
  if (!reader) throw failure('RESPONSE_INVALID');
  while (true) {
    const { value, done } = await reader.read(); if (done) break;
    size += value.byteLength;
    if (size > 2097152) { await reader.cancel(); throw failure('RESPONSE_TOO_LARGE'); }
    chunks.push(value);
  }
  try {
    const data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw failure('RESPONSE_INVALID');
    return data;
  } catch { throw failure('RESPONSE_INVALID'); }
}

export class PingCodeClient {
  #secrets = new Set();
  constructor({ credentialPath, fetchImpl = fetch }) {
    this.credentialPath = credentialPath; this.fetchImpl = fetchImpl;
  }
  get(path, query = {}) { return this.request('GET', path, query); }
  post(path, body) { return this.request('POST', path, {}, body); }
  patch(path, body) { return this.request('PATCH', path, {}, body); }
  // Local only: reports the credential mode without contacting the server.
  async identity() { return credentialIdentity(await readCredentials(this.credentialPath)); }
  sanitize(value) { return redactOutput(value, [...this.#secrets]); }
  async list(path, query = {}) {
    const data = await this.get(path, { page_index: 0, page_size: 25, ...query });
    const { values, total, page_index, page_size } = data;
    if (!Array.isArray(values) || !Number.isInteger(total) || total < 0 || !Number.isInteger(page_index) || page_index < 0 || !Number.isInteger(page_size) || page_size < 1 || page_size > 100 || values.length > page_size) throw failure('PAGINATION_RESPONSE_INVALID');
    return { values, total, page_index, page_size, has_more: (page_index + 1) * page_size < total };
  }
  async request(method, path, query = {}, body) {
    // Credentials decide which routes exist, so they are read before validation.
    // A local read has no network side effect: rejected input still never reaches the network.
    const credentials = await readCredentials(this.credentialPath);
    this.#secrets.add(credentials.access_token);
    validate(method, path, query, body, credentials.auth_mode === 'personal' ? 'personal' : 'enterprise');
    if (query.include_public_image_token !== undefined && query.include_public_image_token !== false) throw failure('QUERY_NOT_ALLOWED');
    const url = new URL(path, 'https://open.pingcode.com');
    for (const [key, value] of Object.entries(query)) url.searchParams.set(key, String(value));
    const write = method !== 'GET'; let response;
    try {
      response = await this.fetchImpl(url, { method, headers: { Authorization: `Bearer ${credentials.access_token}`, ...(write ? { 'Content-Type': 'application/json' } : {}) },
        ...(write ? { body: JSON.stringify(body) } : {}), redirect: 'error', signal: AbortSignal.timeout(15000) });
    } catch { throw failure(write ? 'WRITE_RESULT_UNKNOWN' : 'NETWORK_ERROR', { unknown: write }); }
    let request_id = response.headers.get('x-request-id') || response.headers.get('x-correlation-id');
    if (!request_id || !/^[A-Za-z0-9_-]{1,128}$/.test(request_id) || request_id.includes(credentials.access_token)) request_id = undefined;
    if (!response.ok) {
      // Body cleanup must never replace the classification of a completed HTTP request.
      try { await response.body?.cancel(); } catch { /* keep the observed status */ }
      const retry = Number(response.headers.get('x-ratelimit-retry-after') || response.headers.get('x-pc-retry-after') || response.headers.get('retry-after'));
      const unknown = write && response.status >= 500;
      throw failure(response.status === 429 ? 'RATE_LIMITED' : unknown ? 'WRITE_RESULT_UNKNOWN' : `PINGCODE_HTTP_${response.status}`, {
        status: response.status, unknown, ...(request_id ? { request_id } : {}),
        ...(response.status === 429 && Number.isFinite(retry) && retry >= 0 ? { retry_after_seconds: Math.min(retry, 86400) } : {})
      });
    }
    try { return this.sanitize(await jsonBody(response)); }
    catch { throw failure(write ? 'WRITE_RESULT_UNKNOWN' : 'RESPONSE_INVALID_OR_TOO_LARGE', { unknown: write, ...(request_id ? { request_id } : {}) }); }
  }
}

export function safeError(error) {
  const code = /^[A-Z][A-Z0-9_]{0,100}$/.test(error.code || error.message) ? (error.code || error.message) : 'TOOL_FAILED';
  return { error: code, ...(error.unknown ? { write_result: 'unknown', retry_automatically: false } : {}),
    ...Object.fromEntries(['status', 'retry_after_seconds', 'request_id'].filter(key => error[key] !== undefined).map(key => [key, error[key]])) };
}
