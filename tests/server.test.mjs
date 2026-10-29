import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createApp } from '../server/app.js';

const item = { id: 'sup-test', name: 'Tea machine', category: 'Machine', rating: 4, quickTags: [], photos: { storefrontAndAtmosphere: [], contactCards: [] }, catalogItems: [], location: { lat: 13.7, lng: 100.5 }, status: 'scouted' };
async function setup(t, options = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vitcha-api-test-'));
  const users = [['ice','admin'],['admin','admin'],['review','reviewer'],['view','viewer'],['beam','reviewer'],['mook','admin'],['ann','viewer']].map(([id, role]) => ({ id: `user-${id}`, emailOrId: id, name: id, alias: id, role, pin: '876543', createdAt: '', avatar: '' }));
  const defaults = { users, invites: [{ id: 'i1', code: 'INVITE1', role: 'reviewer', isUsed: false }, { id: 'i2', code: 'INVITE2', role: 'admin', isUsed: false }], suppliers: [], drinkStores: [], notifications: [], categories: [], storeCategories: [], quickTagsList: [], quickMessages: [] };
  const app = createApp({ dataDir: dir, defaults, ...options });
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  t.after(async () => { await new Promise(resolve => server.close(resolve)); fs.rmSync(dir, { recursive: true, force: true }); });
  const call = async (route, token, body, method = 'POST') => {
    const response = await fetch(base + route, { method, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
    return { status: response.status, data: await response.json() };
  };
  const login = async (id) => { const r = await call('/api/login', null, { idOrEmail: id, pin: '876543' }); assert.equal(r.status, 200); return r.data.token; };
  return { call, login, dir, base };
}

test('every data/mutation API requires a real session', async t => {
  const { call } = await setup(t);
  for (const [route, method] of [['/api/data','GET'],['/api/suppliers','POST'],['/api/users','POST'],['/api/invites','POST'],['/api/sync','POST'],['/api/upload','POST'],['/api/backup','GET']]) assert.equal((await call(route, 'forged', method === 'GET' ? undefined : {}, method)).status, 401, route);
});
test('snapshot polling avoids repeated payloads while observing writes and changed identities', async t => {
  const { call, login } = await setup(t); const token = await login('ice');
  const first = (await call('/api/data', token, undefined, 'GET')).data;
  const poll = version => call(`/api/data?since=${encodeURIComponent(version)}`, token, undefined, 'GET');
  assert.equal((await poll(first.version)).data.unchanged, true);
  await call('/api/suppliers', token, item);
  const changed = (await poll(first.version)).data;
  assert.equal(changed.suppliers.length, 1); assert.notEqual(changed.version, first.version);
  await call('/api/simulate', token, { userId: 'user-ann' });
  const simulated = (await poll(changed.version)).data;
  assert.equal(simulated.user.id, 'user-ann'); assert.notEqual(simulated.version, changed.version);
});
test('login uses exact identity, no founder fallback PIN, and hashes legacy PIN', async t => {
  const { call, login, dir } = await setup(t);
  assert.equal((await call('/api/login', null, { idOrEmail: 'ice', pin: '1234' })).status, 401);
  assert.equal((await call('/api/login', null, { idOrEmail: 'ic', pin: '876543' })).status, 401);
  for (const id of ['beam','ann','mook']) assert.equal((await call('/api/login', null, { idOrEmail: id, pin: '876543' })).status, 401);
  const token = await login('ice');
  const result = await call('/api/data', token, undefined, 'GET');
  const encoded = JSON.stringify(result.data);
  assert.ok(!encoded.includes('876543')); assert.ok(!encoded.includes('pinHash')); assert.ok(!encoded.includes('"pin"'));
  assert.equal(result.data.users.some(u => ['user-beam','user-ann','user-mook'].includes(u.id)), false);
  const saved = JSON.parse(fs.readFileSync(path.join(dir, 'database.json'))).users.find(u => u.id === 'user-ice');
  assert.ok(saved.pinHash); assert.equal(saved.pin, undefined);
});
test('viewer is read-only even when forging role and creator fields', async t => {
  const { call, login } = await setup(t); const viewer = await login('view'); const admin = await login('admin');
  await call('/api/suppliers', admin, item);
  for (const action of ['comment','reply','handoff','like']) assert.equal((await call('/api/suppliers/sup-test/actions', viewer, { action, operationId: action, data: { text: 'x' }, role: 'admin' })).status, 403);
  assert.equal((await call('/api/suppliers', viewer, { ...item, id: 'new', role: 'admin' })).status, 403);
  assert.equal((await call('/api/suppliers/sup-test', viewer, { revision: 1 }, 'DELETE')).status, 403);
  assert.equal((await call('/api/users', viewer, { id: 'user-view', revision: 0, role: 'admin' })).status, 403);
  assert.equal((await call('/api/invites', viewer, { role: 'admin' })).status, 403);
});
test('reviewer may add and hand off but cannot edit or delete core records', async t => {
  const { call, login } = await setup(t); const token = await login('review');
  const created = await call('/api/suppliers', token, { ...item, creator: { id: 'user-ice' } });
  assert.equal(created.status, 200); assert.equal(created.data.item.creator.id, 'user-review');
  assert.equal((await call('/api/suppliers', token, { ...item, name: 'overwrite', revision: 1 })).status, 403);
  assert.equal((await call('/api/suppliers/sup-test', token, { revision: 1 }, 'DELETE')).status, 403);
  assert.equal((await call('/api/suppliers/sup-test/actions', token, { action: 'handoff', revision: 1, operationId: 'h1', data: { handoffStage: 'rfq_sent' } })).status, 200);
});
test('admin cannot delete/demote founder or invoke founder simulation', async t => {
  const { call, login } = await setup(t); const token = await login('admin');
  assert.equal((await call('/api/users/user-ice', token, { revision: 0 }, 'DELETE')).status, 403);
  assert.equal((await call('/api/users', token, { id: 'user-ice', role: 'viewer', revision: 0 })).status, 403);
  assert.equal((await call('/api/simulate', token, { userId: 'user-ice' })).status, 403);
  assert.equal((await call('/api/system/clear', token, { revision: 0, confirm: 'CLEAR_RECORDS' })).status, 403);
});
test('founder simulation is enforced server-side and can safely return', async t => {
  const { call, login } = await setup(t); const token = await login('ice');
  assert.equal((await call('/api/simulate', token, { userId: 'user-ann' })).data.user.role, 'viewer');
  assert.equal((await call('/api/suppliers', token, item)).status, 403);
  assert.equal((await call('/api/backup', token, undefined, 'GET')).status, 403);
  assert.equal((await call('/api/simulate', token, { userId: 'user-ice' })).data.user.id, 'user-ice');
  assert.equal((await call('/api/suppliers', token, item)).status, 200);
});
test('legacy simulation roles are repaired without changing real member permissions', async t => {
  const users = [['ice','admin'],['ann','reviewer'],['mook','editor'],['beam','admin'],['real','editor']].map(([id,role]) => ({ id: `user-${id}`, emailOrId: id, name: id, alias: id, role, pin: '876543' }));
  const { call, login, dir } = await setup(t, { defaults: { users, invites: [], suppliers: [], drinkStores: [], notifications: [] } });
  const token = await login('ice');
  for (const [id,role] of [['ann','viewer'],['mook','admin'],['beam','reviewer']]) {
    const result = await call('/api/simulate', token, { userId: `user-${id}` });
    assert.equal(result.status,200); assert.equal(result.data.user.role,role);
    if (role === 'viewer') assert.equal((await call('/api/upload',token,{mimeType:'image/png',base64:'data:image/png;base64,eA=='})).status,403);
    assert.equal((await call('/api/backup',token,undefined,'GET')).status,403);
  }
  const stored=JSON.parse(fs.readFileSync(path.join(dir,'database.json')));
  assert.equal(stored.users.find(u=>u.id==='user-real').role,'editor');
  assert.equal(stored.users.length,5);
});
test('registration rejects duplicate accounts without changing user or consuming invite', async t => {
  const { call, login } = await setup(t);
  const r = await call('/api/register', null, { code: 'INVITE1', name: 'attacker', emailOrId: 'ICE', pin: '9999', role: 'admin' });
  assert.equal(r.status, 409);
  const token = await login('ice');
  const data = (await call('/api/data', token, undefined, 'GET')).data;
  assert.equal(data.users.find(u => u.id === 'user-ice').name, 'ice');
  assert.equal(data.invites.find(i => i.code === 'INVITE1').isUsed, false);
});
test('concurrent registration consumes invite exactly once and ignores supplied role', async t => {
  const { call } = await setup(t);
  const results = await Promise.all(['first','second'].map(emailOrId => call('/api/register', null, { code: 'INVITE1', name: emailOrId, emailOrId, pin: '654321', role: 'admin' })));
  assert.deepEqual(results.map(x => x.status).sort(), [201,400]);
  const created = results.find(x => x.status === 201).data;
  assert.equal(created.user.role, 'reviewer'); assert.equal(created.user.pin, undefined);
  assert.equal((await call('/api/register', null, { code: 'MADE-UP', name: 'other', emailOrId: 'other', pin: '654321', role: 'admin' })).status, 400);
});
test('simultaneous comments and replies are appended, retried operation is deduplicated', async t => {
  const { call, login } = await setup(t); const token = await login('review');
  await call('/api/suppliers', token, item);
  const command = i => ({ action: 'comment', operationId: `note-${i}`, data: { text: `comment ${i}` } });
  const results = await Promise.all(Array.from({ length: 12 }, (_, i) => call('/api/suppliers/sup-test/actions', token, command(i))));
  assert.ok(results.every(r => r.status === 200));
  await call('/api/suppliers/sup-test/actions', token, command(0));
  await Promise.all([1,2].map(i => call('/api/suppliers/sup-test/actions', token, { action: 'reply', operationId: `reply-${i}`, data: { noteId: 'note-0', text: `reply ${i}` } })));
  const saved = (await call('/api/data', token, undefined, 'GET')).data.suppliers[0];
  assert.equal(saved.reviewerNotes.length, 12); assert.equal(saved.reviewerNotes.find(n => n.id === 'note-0').replies.length, 2);
});
test('stale edits and deletes return 409 and preserve new comments', async t => {
  const { call, login } = await setup(t); const token = await login('admin');
  await call('/api/suppliers', token, item);
  await call('/api/suppliers/sup-test/actions', token, { action: 'comment', operationId: 'note', data: { text: 'keep me' } });
  assert.equal((await call('/api/suppliers', token, { ...item, name: 'stale', revision: 1, reviewerNotes: [] })).status, 409);
  assert.equal((await call('/api/suppliers/sup-test', token, { revision: 1 }, 'DELETE')).status, 409);
  const saved = (await call('/api/data', token, undefined, 'GET')).data.suppliers[0];
  assert.equal(saved.name, item.name); assert.equal(saved.reviewerNotes[0].text, 'keep me');
});
test('editing cannot replace protected comments, creator, history or handoff', async t => {
  const { call, login } = await setup(t); const token = await login('admin');
  await call('/api/suppliers', token, item);
  await call('/api/suppliers/sup-test/actions', token, { action: 'comment', operationId: 'keep', data: { text: 'keep' } });
  const r = await call('/api/suppliers', token, { ...item, revision: 2, name: 'new', reviewerNotes: [], creator: { id: 'x' }, handoffStage: 'ordered' });
  assert.equal(r.status, 200); assert.equal(r.data.item.reviewerNotes.length, 1); assert.equal(r.data.item.creator.id, 'user-admin'); assert.notEqual(r.data.item.handoffStage, 'ordered');
});
test('role changes, logout, PIN change and deletion invalidate privileges immediately', async t => {
  const { call, login } = await setup(t); const admin = await login('admin'); const review = await login('review');
  assert.equal((await call('/api/users', admin, { id: 'user-review', role: 'viewer', revision: 0 })).status, 200);
  assert.equal((await call('/api/suppliers', review, item)).status, 403);
  await call('/api/users/user-review', admin, { revision: 1 }, 'DELETE');
  assert.equal((await call('/api/data', review, undefined, 'GET')).status, 401);
  await call('/api/logout', admin, {});
  assert.equal((await call('/api/data', admin, undefined, 'GET')).status, 401);
});
test('bulk overwrite is disabled, explicit founder clear handles empty arrays without deleting users', async t => {
  const { call, login } = await setup(t); const token = await login('ice');
  await call('/api/suppliers', token, item);
  assert.equal((await call('/api/sync', token, { users: [], suppliers: [] })).status, 410);
  const before = (await call('/api/data', token, undefined, 'GET')).data;
  assert.equal((await call('/api/system/clear', token, { revision: before.revision, confirm: 'CLEAR_RECORDS', password: '5888' })).status, 200);
  const after = (await call('/api/data', token, undefined, 'GET')).data;
  assert.deepEqual(after.suppliers, []); assert.equal(after.users.length, before.users.length);
});
test('media upload rejects active content and browser-only video URLs', async t => {
  const { call, login } = await setup(t); const token = await login('review');
  assert.equal((await call('/api/upload', token, { mimeType: 'text/html', base64: 'data:text/html;base64,PGgxPng8L2gxPg==' })).status, 400);
  assert.equal((await call('/api/suppliers', token, { ...item, videos: ['idb://local'] })).status, 400);
});

test('clear requires the matching password server-side and rejected requests preserve data', async t => {
  const { call, login } = await setup(t);
  const token = await login('ice');
  const admin = await login('admin');
  await call('/api/suppliers', token, item);
  const before = (await call('/api/data', token, undefined, 'GET')).data;
  for (const [confirm, password] of [['CLEAR_RECORDS', undefined], ['CLEAR_RECORDS', 'wrong'], ['CLEAR_RECORDS', '5999'], ['CLEAR_MOCKUP', undefined], ['CLEAR_MOCKUP', '5888']]) {
    assert.equal((await call('/api/system/clear', token, { revision: before.revision, confirm, password })).status, 403);
  }
  assert.equal((await call('/api/system/clear', admin, { revision: before.revision, confirm: 'CLEAR_RECORDS', password: '5888' })).status, 403);
  assert.equal((await call('/api/system/clear', token, { revision: before.revision - 1, confirm: 'CLEAR_RECORDS', password: '5888' })).status, 409);
  const after = (await call('/api/data', token, undefined, 'GET')).data;
  assert.equal(after.revision, before.revision);
  assert.deepEqual(after.suppliers, before.suppliers);
});

test('mockup clear preserves real records with legacy-looking IDs in every collection', async t => {
  const { call, login } = await setup(t); const token = await login('ice');
  const records = [
    ['suppliers', 'suppliers', item],
    ['drink-stores', 'drinkStores', { ...item, id: 'store-real', storeName: 'Real store', drinkItems: [], ratings: { taste: 4, aesthetics: 4, value: 4, speed: 4 } }],
    ['locations', 'locations', { ...item, id: 'loc-real', ratings: { footTraffic: 4, visibility: 4, accessibility: 4, valueRoi: 4 } }],
  ];
  for (const [route, , record] of records) {
    assert.equal((await call(`/api/${route}`, token, record)).status, 200);
    assert.equal((await call(`/api/${route}`, token, { ...record, id: `sample-${record.id}`, isMockup: true })).status, 200);
  }
  const before = (await call('/api/data', token, undefined, 'GET')).data;
  assert.equal((await call('/api/system/clear', token, { revision: before.revision, confirm: 'CLEAR_MOCKUP', password: '5999' })).status, 200);
  const after = (await call('/api/data', token, undefined, 'GET')).data;
  for (const [, collection, record] of records) assert.deepEqual(after[collection].map(x => x.id), [record.id]);
  assert.deepEqual(after.users, before.users);
});

test('trash restore cannot duplicate a live record and preserves both versions on conflict', async t => {
  const { call, login } = await setup(t); const token = await login('ice');
  await call('/api/suppliers', token, item);
  assert.equal((await call('/api/suppliers/sup-test', token, { revision: 1 }, 'DELETE')).status, 200);
  assert.equal((await call('/api/suppliers', token, { ...item, name: 'New live record' })).status, 200);
  assert.equal((await call('/api/trash/sup-test/restore', token, {})).status, 409);
  assert.equal((await call('/api/trash', token, undefined, 'GET')).data.items.length, 1);
  const data = (await call('/api/data', token, undefined, 'GET')).data;
  assert.equal(data.suppliers.length, 1); assert.equal(data.suppliers[0].name, 'New live record');
});

test('restoring a record invalidates edits based on its pre-deletion revision', async t => {
  const { call, login } = await setup(t); const token = await login('ice');
  await call('/api/suppliers', token, item);
  await call('/api/suppliers/sup-test', token, { revision: 1 }, 'DELETE');
  assert.equal((await call('/api/trash/sup-test/restore', token, {})).status, 200);
  assert.equal((await call('/api/suppliers', token, { ...item, name: 'Stale overwrite', revision: 1 })).status, 409);
});

test('login throttling blocks credential checks across aliases but not another account', async t => {
  const { call, login } = await setup(t);
  for (let i = 0; i < 31; i++) await call('/api/login', null, { idOrEmail: 'ice', pin: 'wrong' });
  assert.equal((await call('/api/login', null, { idOrEmail: 'user-ice', pin: '876543' })).status, 429);
  assert.ok(await login('admin'));
  const later = Date.now() + 16 * 60000;
  t.mock.method(Date, 'now', () => later);
  assert.ok(await login('ice'));
});

test('retrying a create after a lost response does not duplicate the record', async t => {
  const { call, login } = await setup(t); const token = await login('review');
  const first = await call('/api/suppliers', token, item);
  const retry = await call('/api/suppliers', token, item);
  assert.equal(retry.status, 200); assert.equal(retry.data.item.id, first.data.item.id);
  const data = (await call('/api/data', token, undefined, 'GET')).data;
  assert.equal(data.suppliers.length, 1);
});

test('changed PIN revokes other sessions while preserving the updating session', async t => {
  const { call, login } = await setup(t); const one = await login('review'); const two = await login('review');
  assert.equal((await call('/api/users', one, { id: 'user-review', revision: 0, pin: 'new-654321' })).status, 200);
  assert.equal((await call('/api/data', two, undefined, 'GET')).status, 401);
  assert.equal((await call('/api/data', one, undefined, 'GET')).status, 200);
  assert.equal((await call('/api/login', null, { idOrEmail: 'review', pin: '876543' })).status, 401);
  assert.equal((await call('/api/login', null, { idOrEmail: 'review', pin: 'new-654321' })).status, 200);
});

test('invalid invite cannot be presented as verified and sessions expire', async t => {
  const { call, login } = await setup(t, { sessionTtlMs: -1 });
  assert.equal((await call('/api/invite/INVALID', null, undefined, 'GET')).status, 404);
  assert.equal((await call('/api/invite/INVITE1', null, undefined, 'GET')).data.role, 'reviewer');
  const token = await login('review');
  assert.equal((await call('/api/data', token, undefined, 'GET')).status, 401);
});

test('record import preserves real members and rejects stale database snapshots', async t => {
  const { call, login } = await setup(t); const token = await login('ice');
  const created = await call('/api/suppliers', token, item);
  const data = (await call('/api/data', token, undefined, 'GET')).data;
  const snapshot = { suppliers: [created.data.item], drinkStores: [], users: [], invites: [] };
  assert.equal((await call('/api/system/import', token, { snapshot, revision: data.revision })).status, 200);
  assert.equal((await call('/api/system/import', token, { snapshot, revision: data.revision })).status, 409);
  const after = (await call('/api/data', token, undefined, 'GET')).data;
  assert.equal(after.users.length, data.users.length); assert.equal(after.invites.length, data.invites.length);
});

test('store records use the same authorization and revision protections', async t => {
  const { call, login } = await setup(t); const admin = await login('admin'); const review = await login('review');
  const store = { id: 'store-test', storeName: 'Tea shop', photos: { storefrontAndAtmosphere: [], menuBoard: [], drinkCups: [] }, ratings: { taste: 4, aesthetics: 4, value: 4, speed: 4 }, drinkItems: [], location: { lat: 13, lng: 100 } };
  const created = await call('/api/drink-stores', review, store); assert.equal(created.status, 200);
  assert.equal((await call('/api/drink-stores', review, { ...store, revision: 1 })).status, 403);
  assert.equal((await call('/api/drink-stores', admin, { ...store, storeName: 'Changed', revision: 1 })).status, 200);
  assert.equal((await call('/api/drink-stores/store-test', admin, { revision: 1 }, 'DELETE')).status, 409);
  assert.equal((await call('/api/drink-stores/store-test', admin, { revision: 2 }, 'DELETE')).status, 200);
});

test('private maintenance and broadcasts are rejected for every other role', async t => {
  const {call,login}=await setup(t);
  for (const id of ['admin','review','view']) {
    const token=await login(id);
    for (const [route,method,body] of [['/api/backup','GET',undefined],['/api/system/import','POST',{}],['/api/system/clear','POST',{}],['/api/notifications','POST',{id:'n',title:'x',message:'y'}],['/api/simulate','POST',{userId:'user-ice'}]]) {
      const result=await call(route,token,body,method); assert.equal(result.status,403,`${id} ${route}`);
      assert.doesNotMatch(JSON.stringify(result.data),/ผู้ก่อตั้ง|คุณไอซ์|เจ้าของระบบ/);
    }
  }
});

test('forty simultaneous invitations stay distinct; request retry is idempotent; each binds one identity', async t => {
  const {call,login}=await setup(t); const token=await login('admin');
  const invitations=await Promise.all(Array.from({length:40},(_,i)=>call('/api/invites',token,{role:'reviewer',prefilledAlias:`Person ${i}`,requestId:`request-${i}`})));
  assert.ok(invitations.every(r=>r.status===201));
  assert.equal(new Set(invitations.map(r=>r.data.invite.code)).size,40);
  const retry=await call('/api/invites',token,{role:'reviewer',prefilledAlias:'Person 0',requestId:'request-0'});
  assert.equal(retry.data.invite.id,invitations[0].data.invite.id);
  const code=retry.data.invite.code;
  assert.equal((await call('/api/register',token,{code,name:'existing',emailOrId:'existing',pin:'x'})).status,409);
  const signup=await call('/api/register',null,{code,name:'Person',emailOrId:'person-new',pin:'🎉'});
  assert.equal(signup.status,201);
  assert.equal((await call('/api/register',null,{code,name:'Person',emailOrId:'person-other',pin:'🎉'})).status,400);
  assert.equal((await call(`/api/invite/${code}`,null,undefined,'GET')).status,404);
  const data=(await call('/api/data',token,undefined,'GET')).data;
  assert.equal(data.invites.length,42);assert.equal(data.invites.find(i=>i.code===code).usedBy,signup.data.user.id);
});

test('one display name and immediate avatar update appear in all sessions, posts, notes, likes and views', async t => {
  const {call,login}=await setup(t); const author=await login('review'); const observer=await login('view');
  await call('/api/suppliers',author,item);
  for (const [action,operationId,data] of [['comment','note',{text:'hello'}],['reply','reply',{noteId:'note',text:'reply'}],['like','like',{liked:true}],['view','view',{}]]) await call('/api/suppliers/sup-test/actions',author,{action,operationId,data});
  const avatar=`data:image/png;base64,${fs.readFileSync(new URL('./fixtures/photo.png',import.meta.url)).toString('base64')}`;
  assert.equal((await call('/api/profile/avatar',author,{avatar,revision:0})).status,200);
  assert.equal((await call('/api/users',author,{id:'user-review',name:'unused',alias:'Current name',revision:1,pin:' 🔒 A ! '})).status,200);
  const data=(await call('/api/data',observer,undefined,'GET')).data, record=data.suppliers[0];
  assert.equal(record.creator.avatar,avatar);assert.equal(record.creator.alias,'Current name');assert.equal(record.creator.name,'Current name');
  for (const note of [record.reviewerNotes[0],record.reviewerNotes[0].replies[0]]) {assert.equal(note.author,'Current name');assert.equal(note.authorAvatar,avatar);assert.equal(note.authorId,'user-review');}
  assert.equal(record.likes[0].avatar,avatar);assert.equal(record.viewedBy[0].avatar,avatar);
  assert.equal(data.users.find(u=>u.id==='user-review').name,'Current name');
  assert.equal((await call('/api/profile/avatar',author,{avatar,revision:0})).status,409);
  assert.equal((await call('/api/login',null,{idOrEmail:'review',pin:' 🔒 A ! '})).status,200);
  assert.equal((await call('/api/login',null,{idOrEmail:'review',pin:'🔒 A !'})).status,401);
});

test('configured recovery credential accepts the exact account after throttling without exposure or changing its password', async t => {
  const {scryptSync}=await import('node:crypto'); const recovery='test-only-recovery'; const salt='private-test-salt';
  const {call,login,dir}=await setup(t,{recoveryPasswordHash:`${salt}:${scryptSync(recovery,salt,32).toString('hex')}`});
  const before=JSON.parse(fs.readFileSync(path.join(dir,'database.json'))).users.map(u=>u.pinHash);
  for(let i=0;i<31;i++) await call('/api/login',null,{idOrEmail:'ice',pin:'bad'});
  for(const id of ['ice','admin','review','view']) {
    const result=await call('/api/login',null,{idOrEmail:id,pin:recovery});assert.equal(result.status,200);
    const data=await call('/api/data',result.data.token,undefined,'GET');assert.doesNotMatch(JSON.stringify(data),/test-only-recovery|passwordHash|pinHash/);
  }
  assert.notEqual((await call('/api/login',null,{idOrEmail:'nonexistent',pin:recovery})).status,200);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(dir,'database.json'))).users.map(u=>u.pinHash),before);
});

test('reviewers curate products, categories and ordered sets without changing source records; stale batches are atomic', async t => {
  const {call,login}=await setup(t);const reviewer=await login('review');const viewer=await login('view');const admin=await login('admin');
  for(const id of ['a','b']) assert.equal((await call('/api/suppliers',reviewer,{...item,id,catalogItems:[{id:'product',name:`Machine ${id}`,memo:'source',photo:''}]})).status,200);
  const read=async()=> (await call('/api/data',reviewer,undefined,'GET')).data;
  const original=await read(), products=original.products;
  for(const [route,method,body] of [['/api/product-taxonomy','POST',{kind:'tags',action:'add',name:'Tag',revision:0}],['/api/products/'+products[0].id,'PATCH',{revision:0,changes:{memo:'no'}}],['/api/product-sets','POST',{}]]) assert.equal((await call(route,viewer,body,method)).status,403);
  assert.equal((await call('/api/product-taxonomy',reviewer,{kind:'categories',action:'add',name:'Machines',revision:0})).status,200);
  assert.equal((await call('/api/product-taxonomy',reviewer,{kind:'tags',action:'add',name:'Compare',revision:1})).status,200);
  const taxonomy=await read(); const category=taxonomy.productCategories[0].id, tag=taxonomy.productTags[0].id;
  assert.equal((await call('/api/products/'+products[0].id,reviewer,{revision:0,changes:{memo:'Team memo',categoryId:category,tagIds:[tag],decision:'keep'}},'PATCH')).status,200);
  assert.equal((await call('/api/products/batch',reviewer,{items:products.map(p=>({id:p.id,revision:0})),changes:{decision:'reject'}})).status,409);
  let after=await read();assert.equal(after.products.find(p=>p.id===products[1].id).revision,0);assert.deepEqual(after.suppliers,original.suppliers);
  assert.equal((await call('/api/products/batch',reviewer,{items:after.products.map(p=>({id:p.id,revision:p.revision})),changes:{decision:'keep'},addTagIds:[tag]})).status,200);
  const ids=products.map(p=>p.id);
  assert.equal((await call('/api/product-sets',reviewer,{id:'compare',name:'Compare machines',memo:'Budget',productIds:ids})).status,200);
  assert.equal((await call('/api/product-sets',reviewer,{id:'compare',name:'Compare machines',memo:'Budget',productIds:[...ids].reverse(),revision:1})).status,200);
  after=await read();assert.deepEqual(after.productSets[0].productIds,[...ids].reverse());
  assert.equal((await call('/api/product-taxonomy',reviewer,{kind:'tags',action:'delete',id:tag,revision:2})).status,200);
  after=await read();assert.ok(after.products.every(p=>p.tagIds.length===0));
  assert.equal((await call('/api/suppliers/a',admin,{revision:1},'DELETE')).status,200);
  after=await read();assert.equal(after.products.length,1);assert.equal(after.productSets[0].productIds.length,1);
});

test('eight concurrent records preserve photos, playable video, audio and text on the server', async t => {
  const {call,login,base,dir}=await setup(t);const token=await login('review');
  const media=[['photo.png','image/png'],['clip.webm','video/webm'],['tone.wav','audio/wav']].map(([file,type])=>({bytes:fs.readFileSync(new URL(`./fixtures/${file}`,import.meta.url)),type}));
  const records=await Promise.all(Array.from({length:8},async(_,index)=>{
    const urls=await Promise.all(media.map(async({bytes,type})=>{const r=await call('/api/upload',token,{mimeType:type,base64:`data:${type};base64,${bytes.toString('base64')}`});assert.equal(r.status,201);return r.data.url;}));
    const r=await call('/api/suppliers',token,{...item,id:`bulk-${index}`,name:`Machine ${index}`,memo:`ทดสอบข้อความ ${index}`,photos:{storefrontAndAtmosphere:[urls[0]],contactCards:[]},videos:[urls[1]],voiceNotes:[{id:`audio-${index}`,url:urls[2],durationSec:.5}],catalogItems:[{id:`catalog-${index}`,name:`Part ${index}`,photo:urls[0],memo:'Text + media'}]});assert.equal(r.status,200);return {urls,id:r.data.item.id};
  }));
  const data=(await call('/api/data',token,undefined,'GET')).data;assert.equal(data.suppliers.length,8);assert.equal(data.products.length,8);
  assert.equal(fs.readdirSync(path.join(dir,'uploads')).length,24);
  for(const {urls,id} of records) {
    const record=data.suppliers.find(s=>s.id===id);assert.equal(record.videos[0],urls[1]);assert.equal(record.voiceNotes[0].url,urls[2]);
    for(let i=0;i<urls.length;i++){const r=await fetch(base+urls[i]);assert.equal(r.status,200);assert.deepEqual(Buffer.from(await r.arrayBuffer()),media[i].bytes);}
  }
  const partial=await fetch(base+records[0].urls[1],{headers:{Range:'bytes=0-63'}});assert.equal(partial.status,206);assert.equal((await partial.arrayBuffer()).byteLength,64);
});

test('an admin can change another admin and promote members without changing the primary account',async t=>{
  const {call,login}=await setup(t);const token=await login('admin');
  const member=(await call('/api/register',null,{code:'INVITE2',name:'Second admin',emailOrId:'second-admin',pin:'x'})).data.user;
  assert.equal(member.role,'admin');
  assert.equal((await call('/api/users',token,{id:member.id,role:'viewer',revision:0})).status,200);
  assert.equal((await call('/api/users',token,{id:member.id,role:'admin',revision:1})).status,200);
  assert.equal((await call('/api/users',token,{id:'user-ice',role:'viewer',revision:0})).status,403);
});

test('malformed catalog entries cannot break the product feed',async t=>{
  const {call,login}=await setup(t);const token=await login('review');
  for(const catalogItems of [[null],[{id:'same'},{id:'same'}],[{name:123}]]) assert.equal((await call('/api/suppliers',token,{...item,catalogItems})).status,400);
  assert.equal((await call('/api/data',token,undefined,'GET')).status,200);
});

test('sample loading is private, atomic and does not duplicate on retry',async t=>{
  const {call,login}=await setup(t);const owner=await login('ice');const admin=await login('admin');
  assert.equal((await call('/api/system/samples',admin,{})).status,403);
  const before=(await call('/api/data',owner,undefined,'GET')).data;
  const base={revision:before.revision,operationId:'samples',snapshot:{suppliers:[item],drinkStores:[]}};
  assert.equal((await call('/api/system/samples',owner,{...base,snapshot:{suppliers:[item,{...item,catalogItems:[null]}],drinkStores:[]}})).status,400);
  assert.equal((await call('/api/data',owner,undefined,'GET')).data.suppliers.length,0);
  assert.equal((await call('/api/system/samples',owner,base)).status,200);
  assert.equal((await call('/api/system/samples',owner,base)).status,200);
  assert.equal((await call('/api/data',owner,undefined,'GET')).data.suppliers.length,1);
});

test('users manage their own notifications independently: marking read and clearing does not affect other users', async t => {
  const { call, login } = await setup(t);
  const owner = await login('ice');
  const reviewer = await login('review');
  const viewer = await login('view');

  // Create a supplier record as reviewer to trigger notification
  await call('/api/suppliers', reviewer, { ...item, id: 'sup-notif-1' });

  // Add a comment to trigger a notification
  await call('/api/suppliers/sup-notif-1/actions', reviewer, {
    action: 'comment',
    operationId: 'c-notif-1',
    data: { text: 'New reviewer comment' },
  });

  // Owner reads data: should have notification, marked unread
  let ownerData = (await call('/api/data', owner, undefined, 'GET')).data;
  assert.ok(ownerData.notifications.length > 0);
  const notifId = ownerData.notifications[0].id;
  assert.equal(ownerData.notifications[0].read, false);

  // Viewer reads data: should also have notification, marked unread
  let viewerData = (await call('/api/data', viewer, undefined, 'GET')).data;
  assert.ok(viewerData.notifications.length > 0);
  assert.equal(viewerData.notifications[0].read, false);

  // Owner marks the notification as read
  assert.equal((await call('/api/notifications/read', owner, { id: notifId })).status, 200);

  // Owner data now has read: true
  ownerData = (await call('/api/data', owner, undefined, 'GET')).data;
  assert.equal(ownerData.notifications.find(n => n.id === notifId).read, true);

  // Viewer data STILL has read: false (isolated!)
  viewerData = (await call('/api/data', viewer, undefined, 'GET')).data;
  assert.equal(viewerData.notifications.find(n => n.id === notifId).read, false);

  // Viewer clears notifications for themselves
  assert.equal((await call('/api/notifications/clear', viewer, { id: notifId })).status, 200);

  // Viewer now has 0 notifications
  viewerData = (await call('/api/data', viewer, undefined, 'GET')).data;
  assert.ok(!viewerData.notifications.some(n => n.id === notifId));

  // Owner STILL has the notification in their box (not deleted for everyone!)
  ownerData = (await call('/api/data', owner, undefined, 'GET')).data;
  assert.ok(ownerData.notifications.some(n => n.id === notifId));
});

test('comments and replies support photoUrl and voiceUrl attachments and send reply notifications', async t => {
  const { call, login } = await setup(t);
  const reviewer = await login('review');
  const admin = await login('admin');

  // Create supplier
  await call('/api/suppliers', reviewer, { ...item, id: 'sup-rich-comment' });

  // Add comment with photoUrl and voiceUrl
  const commentRes = await call('/api/suppliers/sup-rich-comment/actions', reviewer, {
    action: 'comment',
    operationId: 'note-rich-1',
    data: {
      text: 'ตรวจสอบตัวอย่างสินค้าแล้ว',
      photoUrl: 'https://lh3.googleusercontent.com/d/photo-123',
      voiceUrl: 'https://drive.google.com/uc?id=voice-456&export=download',
      duration: 12,
    },
  });
  assert.equal(commentRes.status, 200);

  // Reply to note with attachment
  const replyRes = await call('/api/suppliers/sup-rich-comment/actions', admin, {
    action: 'reply',
    operationId: 'reply-rich-1',
    data: {
      noteId: 'note-rich-1',
      text: 'รับทราบ พร้อมอนุมัติต่อ',
      replyToAuthor: 'ช่างบีม (วิศวกร)',
      photoUrl: 'https://lh3.googleusercontent.com/d/reply-photo-789',
    },
  });
  assert.equal(replyRes.status, 200);

  const data = (await call('/api/data', reviewer, undefined, 'GET')).data;
  const supplier = data.suppliers.find(s => s.id === 'sup-rich-comment');
  assert.equal(supplier.reviewerNotes.length, 1);
  const note = supplier.reviewerNotes[0];
  assert.equal(note.photoUrl, 'https://lh3.googleusercontent.com/d/photo-123');
  assert.equal(note.voiceUrl, 'https://drive.google.com/uc?id=voice-456&export=download');
  assert.equal(note.duration, 12);
  assert.equal(note.replies.length, 1);
  assert.equal(note.replies[0].photoUrl, 'https://lh3.googleusercontent.com/d/reply-photo-789');

  // Reviewer should receive reply notification
  const reviewerNotifs = data.notifications;
  assert.ok(reviewerNotifs.some(n => n.type === 'reply' && n.title === 'ตอบกลับความคิดเห็น'));
});

test('Google Drive session endpoint enforces file size and provides upload details or fallback', async t => {
  const { call, login } = await setup(t);
  const token = await login('review');

  // Reject files over 100 MB
  const overSize = await call('/api/drive/session', token, {
    filename: 'big.mp4',
    mimeType: 'video/mp4',
    fileSize: 150 * 1024 * 1024,
  });
  assert.equal(overSize.status, 413);

  // Valid size returns direct upload session or clean fallback
  const valid = await call('/api/drive/session', token, {
    filename: 'sample.jpg',
    mimeType: 'image/jpeg',
    fileSize: 500 * 1024,
    recordType: 'suppliers',
    recordId: 'sup-001',
    recordTitle: 'Test Supplier',
  });
  assert.equal(valid.status, 200);
  assert.equal(typeof valid.data.directAvailable, 'boolean');
});
