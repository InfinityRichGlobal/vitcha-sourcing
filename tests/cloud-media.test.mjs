import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createCloudMedia } from '../server/cloud-media.js';
import { supabaseRequest } from '../server/supabase-persistence.js';

const url = 'https://fixture.supabase.co', key = 'sb_secret_fixture';
test('cloud uploads preserve image, video and audio bytes and wait for durable metadata', async () => {
  const objects = new Map(), records = [];
  let allowCommit, reachedCommit;
  const gate = new Promise(r => { allowCommit = r; });
  const entered = new Promise(r => { reachedCommit = r; });
  const media = createCloudMedia({ url, key,
    fetchImpl: async (target, options) => {
      assert.equal(options.headers.apikey, key); assert.equal(options.headers['x-upsert'], 'false');
      objects.set(target.split('/vitcha-media/')[1], options.body);
      return new Response('{}', { status: 200 });
    },
    request: async (route, options) => { assert.equal(route, '/rest/v1/vitcha_media'); reachedCommit(); await gate; records.push(JSON.parse(options.body)); },
  });
  const files = [['photo.png','image/png'],['clip.webm','video/webm'],['tone.wav','audio/wav']];
  let completed = false;
  const pending = Promise.all(files.map(([filename,mimeType]) => media.upload({ filename, mimeType, bytes: fs.readFileSync(`tests/fixtures/${filename}`) }))).then(r => { completed = true; return r; });
  await entered; assert.equal(completed, false); allowCommit();
  const paths = await pending; assert.equal(new Set(paths).size, 3);
  for (const record of records) { assert.match(record.sha256, /^[a-f0-9]{64}$/); assert.equal(record.bytes, objects.get(record.file_id).length); assert.equal(record.provider, 'supabase'); }
  assert.ok(paths.every(p => /^\/media\/[a-f0-9]{48}$/.test(p)));
});

test('failed object or metadata storage cannot return a successful media URL', async () => {
  let rows = 0;
  const media = createCloudMedia({ url, key, fetchImpl: async () => new Response('', { status: 507 }), request: async () => { rows++; } });
  await assert.rejects(media.upload({ filename: 'photo.png', mimeType: 'image/png', bytes: Buffer.from('file') }));
  assert.equal(rows, 0);
  const failedMetadata = createCloudMedia({ url, key, fetchImpl: async () => new Response('{}'), request: async () => { throw new Error('metadata unavailable'); } });
  await assert.rejects(failedMetadata.upload({ filename: 'photo.png', mimeType: 'image/png', bytes: Buffer.from('file') }), /metadata unavailable/);
});

test('private media uses short-lived signed links and rejects foreign origins', async () => {
  let signed = '/object/sign/vitcha-media/file?token=fixture', target;
  const media = createCloudMedia({ url, key, request: async (route, options) => {
    if (route.startsWith('/rest/')) return [{ provider: 'supabase', file_id: 'file' }];
    assert.equal(JSON.parse(options.body).expiresIn, 120); return { signedURL: signed };
  } });
  const res = { set() {}, redirect(status, location) { assert.equal(status, 307); target = location; } };
  await media.serve({ params: { id: 'a'.repeat(48) } }, res);
  assert.equal(target, `${url}/storage/v1/object/sign/vitcha-media/file?token=fixture`);
  signed = 'https://foreign.example/file';
  await assert.rejects(media.serve({ params: { id: 'a'.repeat(48) } }, res), /Invalid media origin/);
});

test('Supabase transport accepts empty successful inserts and hides upstream error details', async () => {
  let response = new Response('', { status: 201 });
  const request = supabaseRequest({ url, key, fetchImpl: async (_url, options) => { assert.equal(options.headers.apikey, key); assert.equal(options.headers.Authorization, undefined); return response; } });
  assert.equal(await request('/rest/v1/vitcha_media'), null);
  response = new Response('{"code":"PT409"}', { status: 409 });
  await assert.rejects(request('/rest/v1/rpc/vitcha_commit'), e => e.status === 409);
  response = new Response('{"message":"private upstream details"}', { status: 500 });
  await assert.rejects(request('/rest/v1/vitcha_state'), e => e.status === 503 && !e.message.includes('private'));
});

test('Google Drive CENTER direct resumable upload and runtime configuration persist to vitcha_media and vitcha_runtime', async () => {
  const insertedMedia = [], runtimeSaves = [];
  const media = createCloudMedia({
    url,
    key,
    fetchImpl: async (target) => {
      if (target === 'https://oauth2.googleapis.com/token') {
        return new Response(JSON.stringify({ access_token: 'tok-123', expires_in: 3600 }), { status: 200 });
      }
      if (target.startsWith('https://www.googleapis.com/drive/v3/about')) {
        return new Response(JSON.stringify({ user: { emailAddress: 'ice@vitcha.com' }, storageQuota: { usage: '100', limit: '1000' } }), { status: 200 });
      }
      if (target.startsWith('https://www.googleapis.com/drive/v3/files?q=')) {
        return new Response(JSON.stringify({ files: [{ id: 'folder-abc', name: 'suppliers' }] }), { status: 200 });
      }
      if (target.startsWith('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable')) {
        return new Response('', { status: 200, headers: { location: 'https://www.googleapis.com/upload/drive/v3/files?upload_id=session-xyz' } });
      }
      if (target.startsWith('https://www.googleapis.com/drive/v3/files/drive-file-999?')) return new Response(JSON.stringify({id:'drive-file-999',size:'12345',mimeType:'image/jpeg',md5Checksum:'abc123md5',trashed:false,parents:['folder-abc']}));
      throw new Error(`Unexpected fetch: ${target}`);
    },
    request: async (route, options) => {
      if (route === '/rest/v1/vitcha_runtime') {
        runtimeSaves.push(JSON.parse(options.body));
        return null;
      }
      if (route === '/rest/v1/vitcha_media') {
        insertedMedia.push(JSON.parse(options.body));
        return null;
      }
      return [];
    },
  });

  const status = await media.configureDrive({
    clientId: 'cid',
    clientSecret: 'csec',
    refreshToken: 'rtok',
    folderId: '1OXmOSXAA7py0ixs6vT3EBjndZCvpkDT1',
  });
  assert.equal(status.connected, true);
  assert.equal(runtimeSaves.length, 1);
  assert.equal(runtimeSaves[0].key, 'google_drive');
  assert.equal(runtimeSaves[0].value.folderId, '1OXmOSXAA7py0ixs6vT3EBjndZCvpkDT1');

  const session = await media.createDirectUploadSession({
    filename: 'cup.jpg',
    mimeType: 'image/jpeg',
    fileSize: 12345,
    recordType: 'suppliers',
    recordId: 'sup-01',
    recordTitle: 'Test Cup Factory',
  });
  assert.equal(session.directAvailable, true);
  assert.ok(session.sessionUrl.startsWith('https://www.googleapis.com/upload/drive/v3/files'));

  const completed = await media.completeDirectUpload({
    fileId: 'drive-file-999',
    mimeType: 'image/jpeg',
    fileSize: 12345,
    md5Checksum: 'abc123md5',
  });
  assert.equal(completed.success, true);
  assert.match(completed.url, /^\/media\/[a-f0-9]{48}$/);
  assert.equal(insertedMedia.length, 1);
  assert.equal(insertedMedia[0].provider, 'drive');
  assert.equal(insertedMedia[0].file_id, 'drive-file-999');
  assert.equal(insertedMedia[0].bytes, 12345);
});


test('direct upload completion cannot acknowledge a missing, truncated or trashed Drive file', async () => {
 for(const metadata of [null,{size:'1',mimeType:'image/png',md5Checksum:'x'}, {size:'10',mimeType:'image/png',md5Checksum:'x',trashed:true}]) {
  let writes=0;
  const media=createCloudMedia({url,key,drive:{clientId:'c',refreshToken:'r',folderId:'f'},request:async()=>{writes++;},fetchImpl:async target=>target.includes('oauth2')?new Response(JSON.stringify({access_token:'t',expires_in:3600})):new Response(JSON.stringify(metadata||{}),{status:metadata?200:404})});
  await assert.rejects(media.completeDirectUpload({fileId:'file',fileSize:10,mimeType:'image/png',md5Checksum:'x'}));
  assert.equal(writes,0);
 }
});
