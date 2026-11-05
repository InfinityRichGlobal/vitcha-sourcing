import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { build } from 'esbuild';
import { createCloudMedia } from '../server/cloud-media.js';
const bytes = fs.readFileSync('tests/fixtures/photo.png');
const drive = { clientId: 'client', refreshToken: 'refresh', folderId: 'root' };
const fileId = 'public-image_123';
const fixture = (overrides = {}) => {
  const rows = [], sent = [];
  const options = {
    url: 'https://fixture.supabase.co', key: 'fixture', drive, publicDriveImages: true, driveOnly: true,
    request: async (route, options) => { rows.push(JSON.parse(options.body)); },
    fetchImpl: async (url, options) => {
      if (url.includes('oauth2')) return Response.json({ access_token: 'token', expires_in: 3600 });
      if (url.includes('files?q=')) return Response.json({ files: [{ id: 'folder' }] });
      if (url.includes('uploadType=resumable')) return new Response('', { headers: { location: 'https://www.googleapis.com/upload/session' } });
      if (url.endsWith('/upload/session')) { sent.push(options.body); return Response.json({ id: fileId, size: bytes.length, md5Checksum: createHash('md5').update(bytes).digest('hex') }); }
      if (url.includes(`/files/${fileId}?`)) return Response.json({ id: fileId, size: bytes.length, mimeType: 'image/png', md5Checksum: createHash('md5').update(bytes).digest('hex'), parents: ['folder'] });
      throw new Error(`Unexpected request ${url}`);
    }, ...overrides,
  };
  return { media: createCloudMedia(options), rows, sent };
};

test('original Drive image is byte-identical and yields a direct public URL only after durable acknowledgement', async () => {
  let release, entered;
  const gate = new Promise(r => release = r), waiting = new Promise(r => entered = r);
  const { media, sent } = fixture({ request: async (_route, options) => {
    const row = JSON.parse(options.body); assert.equal(row.provider, 'drive'); assert.equal(row.bytes, bytes.length);
    assert.equal(row.sha256, createHash('sha256').update(bytes).digest('hex')); entered(); await gate;
  } });
  let done = false;
  const pending = media.upload({ filename: 'photo.png', mimeType: 'image/png', bytes }).then(url => { done = true; return url; });
  await waiting; assert.equal(done, false); assert.deepEqual(sent[0], bytes); release();
  assert.equal(await pending, `https://lh3.googleusercontent.com/d/${fileId}=s0`);
  const failed = fixture({ request: async () => { throw new Error('metadata down'); } }).media;
  await assert.rejects(failed.upload({ filename: 'photo.png', mimeType: 'image/png', bytes }), /metadata down/);
});

test('chunked Drive image completion returns the same direct URL and Drive-only never silently uses Supabase', async () => {
  const { media, rows } = fixture();
  const result = await media.completeDirectUpload({ fileId, folderId: 'folder', fileSize: bytes.length, mimeType: 'image/png' });
  assert.equal(result.url, `https://lh3.googleusercontent.com/d/${fileId}=s0`); assert.equal(rows.length, 1);
  const missing = fixture({ drive: null, fetchImpl: () => assert.fail('No fallback storage allowed') }).media;
  await assert.rejects(missing.upload({ filename: 'photo.png', mimeType: 'image/png', bytes }), e => e.status === 503);
  await assert.rejects(missing.createDirectUploadSession({ filename: 'photo.png', mimeType: 'image/png', fileSize: bytes.length }), e => e.status === 503);
});

test('legacy Drive image URLs redirect at the requested size without OAuth or transferring the file through the server', async () => {
  const media = fixture({ request: async () => [{ provider: 'drive', file_id: fileId, mime_type: 'image/png' }], fetchImpl: () => assert.fail('Public reads must not fetch Google bytes on the server') }).media;
  for (const [query, target] of [[{}, `https://lh3.googleusercontent.com/d/${fileId}=s0`], [{ size: '600' }, `https://lh3.googleusercontent.com/d/${fileId}=s600`], [{ size: '2000' }, `https://lh3.googleusercontent.com/d/${fileId}=s2000`], [{ size: 'foreign' }, `https://lh3.googleusercontent.com/d/${fileId}=s0`], [{ original: '1' }, `https://drive.google.com/file/d/${fileId}/view`]]) {
    let redirected;
    await media.serve({ params: { id: 'a'.repeat(48) }, query }, { set() {}, redirect(status, url) { assert.equal(status, 307); redirected = url; } });
    assert.equal(redirected, target);
  }
});

test('display sizes never alter canonical URLs or local previews, and original links lead to the Drive file', async () => {
  const bundle = await build({ entryPoints: ['src/utils/mediaUrl.ts'], bundle: true, write: false, format: 'esm', platform: 'node' });
  const { imageDisplayUrl, originalImageUrl, driveImageId } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
  for (const source of [`https://lh3.googleusercontent.com/d/${fileId}=s0`, `https://drive.google.com/file/d/${fileId}/view`, `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`]) {
    assert.equal(imageDisplayUrl(source, 600), `https://lh3.googleusercontent.com/d/${fileId}=s600`);
    assert.equal(imageDisplayUrl(source, 2000), `https://lh3.googleusercontent.com/d/${fileId}=s2000`);
    assert.equal(originalImageUrl(source), `https://drive.google.com/file/d/${fileId}/view`);
  }
  for (const source of ['blob:preview', 'data:image/png;base64,xxx', '/logo.jpg', 'https://lh3.googleusercontent.com.evil/d/file=s0']) {
    assert.equal(imageDisplayUrl(source), source); assert.equal(driveImageId(source), null);
  }
  const legacy = `/media/${'a'.repeat(48)}`;
  assert.equal(new URL(imageDisplayUrl(legacy, 96)).search, '?size=96');
  assert.equal(new URL(originalImageUrl(imageDisplayUrl(legacy, 600))).search, '?original=1');
});
