/** PingCode public-cloud credentials: enterprise application tokens and personal access tokens. */
import { constants } from 'node:fs';
import { open, lstat, mkdir, rename, unlink } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseEnv } from 'node:util';

const ROOT = 'https://open.pingcode.com';
const fail = code => { throw new Error(code); };
const tokenString = value => typeof value === 'string' && /^[\x21-\x7e]{1,4096}$/.test(value);
const ENTERPRISE_KEYS = ['grant_type', 'access_token', 'token_type', 'expires_in', 'obtained_at'];
const PERSONAL_KEYS = ['auth_mode', 'access_token', 'token_type', 'obtained_at'];
const USER_FIELDS = ['id', 'name', 'display_name'];

async function privateDirectory(path, create = false) {
  if (create) await mkdir(path, { recursive: true, mode: 0o700 });
  const stat = await lstat(path);
  if (!stat.isDirectory() || stat.uid !== process.getuid() || (stat.mode & 0o077)) fail('PRIVATE_DIRECTORY_REQUIRED');
}

async function readPrivate(path) {
  let handle;
  try {
    await privateDirectory(dirname(resolve(path)));
    handle = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW);
    const stat = await handle.stat();
    if (!stat.isFile() || stat.uid !== process.getuid() || (stat.mode & 0o077) || stat.size > 16_384) fail('PRIVATE_FILE_REQUIRED');
    return await handle.readFile('utf8');
  } catch (error) {
    if (['PRIVATE_DIRECTORY_REQUIRED', 'PRIVATE_FILE_REQUIRED'].includes(error.message)) throw error;
    fail('PRIVATE_FILE_REQUIRED');
  } finally { await handle?.close(); }
}

// Enterprise files predate auth_mode and must keep working without migration.
export async function readCredentials(path) {
  let value;
  try { value = JSON.parse(await readPrivate(path)); }
  catch (error) {
    if (['PRIVATE_DIRECTORY_REQUIRED', 'PRIVATE_FILE_REQUIRED'].includes(error.message)) throw error;
    fail('CREDENTIAL_FORMAT_INVALID');
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail('ENTERPRISE_CREDENTIALS_REQUIRED');
  if (value.auth_mode === undefined) {
    if (value.grant_type !== 'client_credentials'
        || !tokenString(value.access_token) || value.token_type !== 'Bearer'
        || Object.keys(value).some(key => !ENTERPRISE_KEYS.includes(key))) fail('ENTERPRISE_CREDENTIALS_REQUIRED');
    return value;
  }
  if (value.auth_mode !== 'personal') fail('CREDENTIAL_FORMAT_INVALID');
  if (!tokenString(value.access_token) || value.token_type !== 'Bearer'
      || Object.keys(value).some(key => !PERSONAL_KEYS.includes(key))) fail('CREDENTIAL_FORMAT_INVALID');
  return value;
}

// Identity is derived from the credential alone; no request and no inferred assignee.
export function credentialIdentity(credentials) {
  const personal = credentials.auth_mode === 'personal';
  return { auth_mode: personal ? 'personal' : 'enterprise', actor: personal ? 'user' : 'application', current_user: null };
}

// Only the fields a token owner lookup may publish; no contact details or permissions.
export function publicUser(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail('RESPONSE_INVALID');
  const result = {};
  for (const key of USER_FIELDS) {
    if (typeof value[key] === 'string' && value[key].length <= 512) result[key] = value[key];
  }
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(result.id ?? '')) fail('RESPONSE_INVALID');
  return result;
}

async function application(path) {
  const env = parseEnv(await readPrivate(path));
  if (!tokenString(env.PINGCODE_CLIENT_ID) || !tokenString(env.PINGCODE_CLIENT_SECRET)) fail('APPLICATION_CREDENTIALS_REQUIRED');
  return { client_id: env.PINGCODE_CLIENT_ID, client_secret: env.PINGCODE_CLIENT_SECRET };
}

async function request(url, headers, fetchImpl) {
  let response;
  try { response = await fetchImpl(url, { method: 'GET', headers, redirect: 'error', signal: AbortSignal.timeout(15_000) }); }
  catch { fail('NETWORK_ERROR'); }
  if (!response.ok) { await response.body?.cancel(); fail(`PINGCODE_HTTP_${response.status}`); }
  try {
    const reader = response.body.getReader(); const chunks = []; let size = 0;
    while (true) {
      const { value, done } = await reader.read(); if (done) break;
      size += value.byteLength;
      if (size > 65_536) { await reader.cancel(); fail('RESPONSE_INVALID'); }
      chunks.push(value);
    }
    const value = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!value || typeof value !== 'object' || Array.isArray(value)) fail('RESPONSE_INVALID');
    return value;
  } catch { fail('RESPONSE_INVALID'); }
}

async function tokenResponse(app, fetchImpl) {
  const url = new URL('/v2/auth/token', ROOT);
  url.search = new URLSearchParams({ grant_type: 'client_credentials', ...app });
  const value = await request(url, {}, fetchImpl);
  if (!tokenString(value.access_token) || String(value.token_type).toLowerCase() !== 'bearer') fail('TOKEN_RESPONSE_INVALID');
  const result = { grant_type: 'client_credentials', access_token: value.access_token, token_type: 'Bearer', obtained_at: Math.floor(Date.now() / 1000) };
  // Preserve the server field without assuming duration versus epoch semantics.
  if (['number', 'string'].includes(typeof value.expires_in)) result.expires_in = value.expires_in;
  return result;
}

async function saveNew(path, value) {
  let handle;
  try {
    handle = await open(path, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW, 0o600);
    await handle.writeFile(JSON.stringify(value) + '\n'); await handle.sync();
  } catch (error) { fail(error.code === 'EEXIST' ? 'OUTPUT_EXISTS' : 'CREDENTIAL_SAVE_FAILED'); }
  finally { await handle?.close(); }
}

export async function acquireCredentials(envPath, outputPath, fetchImpl = fetch) {
  const app = await application(envPath);
  try { await lstat(outputPath); fail('OUTPUT_EXISTS'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  await privateDirectory(dirname(resolve(outputPath)), true);
  const credentials = await tokenResponse(app, fetchImpl);
  await saveNew(outputPath, credentials);
  return { saved: true, auth_mode: 'enterprise', current_user: null };
}

// A personal token is copied from a private file or stdin; argv never carries the secret.
async function readTokenSource(source, stdin) {
  if (source !== '-') return (await readPrivate(source)).trim();
  const chunks = []; let size = 0;
  for await (const chunk of stdin) {
    size += chunk.length;
    if (size > 16_384) fail('TOKEN_INPUT_TOO_LARGE');
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8').trim();
}

export async function importPersonalToken(source, outputPath, options = {}) {
  const { check = false, fetchImpl = fetch, stdin = process.stdin } = options;
  const token = await readTokenSource(source, stdin);
  if (!tokenString(token)) fail('TOKEN_FORMAT_INVALID');
  try { await lstat(outputPath); fail('OUTPUT_EXISTS'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  await privateDirectory(dirname(resolve(outputPath)), true);
  if (check) await request(new URL('/v2/myself', ROOT), { Authorization: `Bearer ${token}` }, fetchImpl);
  await saveNew(outputPath, { auth_mode: 'personal', token_type: 'Bearer', access_token: token, obtained_at: Math.floor(Date.now() / 1000) });
  return { saved: true, auth_mode: 'personal', current_user: null };
}

export async function renewCredentials(envPath, path, fetchImpl = fetch) {
  const app = await application(envPath);
  const current = await readCredentials(path);
  // Personal access tokens have no refresh grant; re-import is the only update path.
  if (current.auth_mode === 'personal') fail('PERSONAL_RENEW_UNSUPPORTED');
  await privateDirectory(dirname(resolve(path)));
  const lockPath = path + '.lock'; let lock;
  try { lock = await open(lockPath, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW, 0o600); }
  catch { fail('CREDENTIALS_BUSY'); }
  const pending = path + '.pending';
  try {
    try { await lstat(pending); fail('PENDING_CREDENTIALS'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    const next = await tokenResponse(app, fetchImpl);
    try { await saveNew(pending, next); await rename(pending, path); }
    catch { fail('CREDENTIAL_SAVE_FAILED_CHECK_PENDING_FILE'); }
    return { saved: true, auth_mode: 'enterprise', current_user: null };
  } finally { await lock.close(); await unlink(lockPath); }
}

export async function verifyAccess(path, fetchImpl = fetch) {
  const credentials = await readCredentials(path);
  const checks = {};
  for (const [name, route] of [['team', '/v2/directory/team'], ['projects', '/v2/pjm/projects?page_index=0&page_size=1'], ['wiki_spaces', '/v2/wiki/spaces?page_index=0&page_size=1']]) {
    try {
      const value = await request(new URL(route, ROOT), { Authorization: `Bearer ${credentials.access_token}` }, fetchImpl);
      if (name === 'team') {
        if (typeof value.id !== 'string') fail('RESPONSE_INVALID');
        checks[name] = { ok: true, team_id: value.id };
      } else {
        if (!Array.isArray(value.values) || !Number.isFinite(value.total)) fail('RESPONSE_INVALID');
        checks[name] = { ok: true, visible_total: value.total, page_index: 0, page_size: 1 };
      }
    } catch (error) { checks[name] = { ok: false, error: /^[A-Z][A-Z0-9_]+$/.test(error.message) ? error.message : 'ACCESS_CHECK_FAILED' }; }
  }
  const result = {
    ...credentialIdentity(credentials), checks,
    all_read_checks_passed: Object.values(checks).every(item => item.ok), write_access_verified: false,
  };
  // Enterprise tokens are not tied to a user, so /v2/myself is never attempted for them.
  if (credentials.auth_mode === 'personal') {
    try {
      result.current_user = publicUser(await request(new URL('/v2/myself', ROOT), { Authorization: `Bearer ${credentials.access_token}` }, fetchImpl));
      result.identity_unverified = false;
    } catch (error) {
      result.identity_unverified = true;
      result.identity_error = /^[A-Z][A-Z0-9_]+$/.test(error.message) ? error.message : 'IDENTITY_CHECK_FAILED';
    }
  }
  return result;
}

async function main(args) {
  const [command, ...parameters] = args;
  if (command === 'acquire' && parameters.length === 2) return acquireCredentials(...parameters);
  if (command === 'renew' && parameters.length === 2) return renewCredentials(...parameters);
  if (command === 'verify' && parameters.length === 1) return verifyAccess(...parameters);
  if (command === 'import') {
    const check = parameters.includes('--check');
    const values = parameters.filter(item => item !== '--check');
    if (values.length === 2) return importPersonalToken(values[0], values[1], { check });
  }
  fail('USAGE: node auth.js acquire ENV_FILE CREDENTIAL_FILE | renew ENV_FILE CREDENTIAL_FILE | import TOKEN_FILE|- CREDENTIAL_FILE [--check] | verify CREDENTIAL_FILE');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try { console.log(JSON.stringify(await main(process.argv.slice(2)))); }
  catch (error) {
    const message = /^[A-Z][A-Z0-9_]+$/.test(error.message) || error.message.startsWith('USAGE:') ? error.message : 'LOCAL_AUTH_ERROR';
    console.error(JSON.stringify({ error: message })); process.exitCode = 1;
  }
}
