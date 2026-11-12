import assert from 'node:assert/strict';
import { mkdtemp, writeFile, chmod, readFile, symlink, rm, mkdir, stat } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import * as auth from '../auth.js';

const run = promisify(execFile);
const PERSONAL = { auth_mode: 'personal', token_type: 'Bearer', access_token: 'PERSONAL-SYNTHETIC-TOKEN' };
async function personalFile(t) {
  const dir = await mkdtemp(join(tmpdir(), 'pingcode-personal-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const path = join(dir, 'credentials.json');
  await writeFile(path, JSON.stringify(PERSONAL), { mode: 0o600 });
  return { dir, path };
}
const myself = () => new Response('{"id":"user-1","name":"probe","display_name":"Probe","email":"private@example.invalid"}');

async function fixture(t) {
  const dir = await mkdtemp(join(tmpdir(), 'pingcode-enterprise-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const path = join(dir, 'credentials.json'); const env = join(dir, 'pingcode.env');
  await writeFile(path, JSON.stringify({ grant_type: 'client_credentials', access_token: 'test-access', token_type: 'Bearer' }), { mode: 0o600 });
  await writeFile(env, 'PINGCODE_CLIENT_ID="test-client"\nPINGCODE_CLIENT_SECRET="test-secret"\nPINGCODE_USERNAME="unused-user"\nPINGCODE_PASSWORD="unused-password"\n', { mode: 0o600 });
  return { dir, path, env };
}
const response = () => new Response('{"access_token":"new-access","token_type":"Bearer","expires_in":1234567890}');

test('enterprise credentials are explicit and do not imply a current personal user', async t => {
  const { path } = await fixture(t);
  assert.equal((await auth.readCredentials(path)).grant_type, 'client_credentials');
  await writeFile(path, '{"grant_type":"authorization_code","access_token":"user-token","refresh_token":"refresh","token_type":"Bearer"}');
  await assert.rejects(auth.readCredentials(path), /ENTERPRISE_CREDENTIALS_REQUIRED/);
});

test('public files, symlinks and public parent directories cannot supply credentials', async t => {
  const { dir, path } = await fixture(t);
  await chmod(path, 0o644);await assert.rejects(auth.readCredentials(path), /PRIVATE_FILE_REQUIRED/);
  await chmod(path, 0o600);const alias=join(dir,'alias');await symlink(path, alias);
  await assert.rejects(auth.readCredentials(alias), /PRIVATE_FILE_REQUIRED/);
  await chmod(dir, 0o755);await assert.rejects(auth.readCredentials(path), /PRIVATE_DIRECTORY_REQUIRED/);
});

test('client credentials exchange calls only the official endpoint and saves no password or secret', async t => {
  const { env, dir } = await fixture(t); const output=join(dir,'new','credentials.json');let calls=0;
  const result = await auth.acquireCredentials(env, output, async (url, options) => {
    calls++;assert.equal(url.origin,'https://open.pingcode.com');assert.equal(url.pathname,'/v2/auth/token');
    assert.equal(url.searchParams.get('grant_type'),'client_credentials');assert.equal(url.searchParams.get('client_secret'),'test-secret');
    assert.equal(options.redirect,'error');return response();
  });
  assert.equal(calls,1);assert.equal(result.auth_mode,'enterprise');
  const text=await readFile(output,'utf8');assert.doesNotMatch(text,/test-secret|unused-user|unused-password|refresh_token/);
  assert.equal((await auth.readCredentials(output)).access_token,'new-access');
});

test('unsafe configuration or output is rejected before sending credentials', async t => {
  const { env, dir, path } = await fixture(t);let calls=0;const fetchImpl=async()=>{calls++;return response();};
  await assert.rejects(auth.acquireCredentials(env,path,fetchImpl),/OUTPUT_EXISTS/);
  const publicDir=join(dir,'public');await mkdir(publicDir,{mode:0o755});
  await assert.rejects(auth.acquireCredentials(env,join(publicDir,'token.json'),fetchImpl),/PRIVATE_DIRECTORY_REQUIRED/);
  await chmod(env,0o644);await assert.rejects(auth.acquireCredentials(env,join(dir,'fresh.json'),fetchImpl),/PRIVATE_FILE_REQUIRED/);
  assert.equal(calls,0);
});

test('enterprise access verification checks project, Wiki and team scopes without calling myself', async t => {
  const { path }=await fixture(t);const urls=[];
  const result=await auth.verifyAccess(path,async(url,options)=>{
    const u=new URL(url);urls.push(u.pathname);assert.equal(options.headers.Authorization,'Bearer test-access');
    if(u.pathname==='/v2/directory/team')return new Response('{"id":"team-1","name":"not printed"}');
    return new Response('{"page_index":0,"page_size":1,"total":2,"values":[{"name":"private content"}]}');
  });
  assert.deepEqual(urls.sort(),['/v2/directory/team','/v2/pjm/projects','/v2/wiki/spaces']);
  assert.equal(result.auth_mode,'enterprise');assert.equal(result.current_user,null);assert.equal(result.all_read_checks_passed,true);
  assert.doesNotMatch(JSON.stringify(result),/private content|not printed|test-access/);
});

test('a missing scope is reported separately and does not masquerade as a personal identity', async t => {
  const { path }=await fixture(t);
  const result=await auth.verifyAccess(path,async url=>new URL(url).pathname==='/v2/wiki/spaces'?new Response('secret body',{status:403}):new Response('{"total":0,"values":[]}'));
  assert.equal(result.all_read_checks_passed,false);assert.equal(result.checks.wiki_spaces.error,'PINGCODE_HTTP_403');
  assert.equal(result.checks.projects.ok,true);assert.equal(result.current_user,null);
});

test('failed token requests expose no upstream bodies, URLs or secret values and are not retried', async t => {
  const { env, dir }=await fixture(t);let calls=0;
  await assert.rejects(auth.acquireCredentials(env,join(dir,'new.json'),async()=>{calls++;throw Error('https://evil.invalid/?client_secret=test-secret');}),error=>{
    assert.equal(error.message,'NETWORK_ERROR');return true;
  });
  assert.equal(calls,1);
  await assert.rejects(auth.acquireCredentials(env,join(dir,'new.json'),async()=>new Response('test-secret',{status:401})),/PINGCODE_HTTP_401/);
  await assert.rejects(readFile(join(dir,'new.json')));
});

test('explicit renewal replaces credentials while failed renewal preserves the previous token', async t => {
  const { env,path }=await fixture(t);
  await auth.renewCredentials(env,path,async()=>response());
  const before=await readFile(path,'utf8');assert.equal((await auth.readCredentials(path)).access_token,'new-access');
  await assert.rejects(auth.renewCredentials(env,path,async()=>{throw Error('test-secret');}),/NETWORK_ERROR/);
  assert.equal(await readFile(path,'utf8'),before);
});

test('personal credentials declare their mode and keep the enterprise default unmarked', async t => {
  const { path } = await personalFile(t);
  assert.equal((await auth.readCredentials(path)).auth_mode, 'personal');
  const { path: enterprise } = await fixture(t);
  assert.equal((await auth.readCredentials(enterprise)).auth_mode, undefined);
  for (const change of [{ auth_mode: 'oauth' }, { grant_type: 'client_credentials' }, { refresh_token: 'r' }, { scope: 'x' }, { auth_mode: 'personal', token_type: 'Basic' }]) {
    await writeFile(path, JSON.stringify({ ...PERSONAL, ...change }));
    await assert.rejects(auth.readCredentials(path), /CREDENTIAL_FORMAT_INVALID/);
  }
});

test('identity derivation is a pure function of the credential mode', async () => {
  assert.deepEqual(auth.credentialIdentity({ auth_mode: 'personal' }), { auth_mode: 'personal', actor: 'user', current_user: null });
  assert.deepEqual(auth.credentialIdentity({ grant_type: 'client_credentials' }), { auth_mode: 'enterprise', actor: 'application', current_user: null });
});

test('personal tokens import from stdin or a private file and never overwrite', async t => {
  const { dir } = await personalFile(t); const output = join(dir, 'state', 'credentials.json');
  async function* stream() { yield Buffer.from('  STDIN-SYNTHETIC-TOKEN\n'); }
  const result = await auth.importPersonalToken('-', output, { stdin: stream() });
  assert.equal(result.auth_mode, 'personal'); assert.doesNotMatch(JSON.stringify(result), /STDIN-SYNTHETIC-TOKEN/);
  assert.equal((await stat(output)).mode & 0o777, 0o600);
  assert.deepEqual((await auth.readCredentials(output)).access_token, 'STDIN-SYNTHETIC-TOKEN');
  await assert.rejects(auth.importPersonalToken('-', output, { stdin: stream() }), /OUTPUT_EXISTS/);

  const tokenFile = join(dir, 'token.txt');
  await writeFile(tokenFile, 'FILE-SYNTHETIC-TOKEN\n', { mode: 0o644 });
  await assert.rejects(auth.importPersonalToken(tokenFile, join(dir, 'a.json')), /PRIVATE_FILE_REQUIRED/);
  await chmod(tokenFile, 0o600);
  await auth.importPersonalToken(tokenFile, join(dir, 'b.json'));
  assert.equal((await auth.readCredentials(join(dir, 'b.json'))).access_token, 'FILE-SYNTHETIC-TOKEN');
});

test('a token given as a command argument is refused instead of stored', async t => {
  const { dir } = await personalFile(t); const output = join(dir, 'from-argv.json');
  await assert.rejects(run(process.execPath, [new URL('../auth.js', import.meta.url).pathname, 'import', 'RAW-TOKEN-ARGV']), error => {
    assert.match(error.stderr, /USAGE/); assert.doesNotMatch(error.stderr, /RAW-TOKEN-ARGV/); return true;
  });
  await assert.rejects(stat(output));
});

test('optional import precheck refuses to save a token the server rejects', async t => {
  const { dir } = await personalFile(t); const output = join(dir, 'checked.json'); let calls = 0;
  async function* stream() { yield Buffer.from('CHECKED-SYNTHETIC-TOKEN'); }
  await assert.rejects(auth.importPersonalToken('-', output, {
    check: true, stdin: stream(),
    fetchImpl: async () => { calls++; return new Response('leaked-body', { status: 403 }); },
  }), /PINGCODE_HTTP_403/);
  assert.equal(calls, 1); await assert.rejects(stat(output));

  async function* ok() { yield Buffer.from('CHECKED-SYNTHETIC-TOKEN'); }
  const result = await auth.importPersonalToken('-', output, {
    check: true, stdin: ok(),
    fetchImpl: async (url) => { assert.equal(new URL(url).pathname, '/v2/myself'); return myself(); },
  });
  assert.equal(result.saved, true); assert.doesNotMatch(JSON.stringify(result), /CHECKED-SYNTHETIC-TOKEN/);
});

test('personal verification reports the owner and degrades when the scope is missing', async t => {
  const { path } = await personalFile(t); const urls = [];
  const result = await auth.verifyAccess(path, async (url) => {
    const u = new URL(url); urls.push(u.pathname);
    if (u.pathname === '/v2/directory/team') return new Response('{"id":"team-1"}');
    if (u.pathname === '/v2/myself') return myself();
    return new Response('{"page_index":0,"page_size":1,"total":0,"values":[]}');
  });
  assert.deepEqual(urls.sort(), ['/v2/directory/team', '/v2/myself', '/v2/pjm/projects', '/v2/wiki/spaces']);
  assert.equal(result.auth_mode, 'personal'); assert.equal(result.actor, 'user');
  assert.deepEqual(result.current_user, { id: 'user-1', name: 'probe', display_name: 'Probe' });
  assert.equal(result.identity_unverified, false); assert.equal(result.all_read_checks_passed, true);
  assert.doesNotMatch(JSON.stringify(result), /private@example.invalid/);

  const degraded = await auth.verifyAccess(path, async url => {
    const u = new URL(url);
    if (u.pathname === '/v2/directory/team') return new Response('{"id":"team-1"}');
    if (u.pathname === '/v2/myself') return new Response('secret body', { status: 403 });
    return new Response('{"page_index":0,"page_size":1,"total":0,"values":[]}');
  });
  assert.equal(degraded.identity_unverified, true); assert.equal(degraded.identity_error, 'PINGCODE_HTTP_403');
  assert.equal(degraded.current_user, null); assert.equal(degraded.all_read_checks_passed, true);
});

test('personal credentials cannot be renewed and the file is left untouched', async t => {
  const { dir, path } = await personalFile(t);
  const env = join(dir, 'pingcode.env');
  await writeFile(env, 'PINGCODE_CLIENT_ID="test-client"\nPINGCODE_CLIENT_SECRET="test-secret"\n', { mode: 0o600 });
  let calls = 0; const before = await readFile(path, 'utf8');
  await assert.rejects(auth.renewCredentials(env, path, async () => { calls++; return response(); }), /PERSONAL_RENEW_UNSUPPORTED/);
  assert.equal(calls, 0); assert.equal(await readFile(path, 'utf8'), before);
});
