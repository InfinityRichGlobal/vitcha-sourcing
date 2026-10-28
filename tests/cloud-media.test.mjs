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
