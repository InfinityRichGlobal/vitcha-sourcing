import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { packSnapshot } from '../server/snapshot-wire.js';
const compiled = await build({ entryPoints: ['src/services/snapshotWire.ts'], bundle: true, write: false, format: 'esm', platform: 'node' });
const { unpackSnapshot } = await import(`data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString('base64')}`);
test('repeated current-profile avatars cannot inflate the wire snapshot; exact round trip', () => {
  const avatars = Array.from({length:10},(_,i)=>'data:image/jpeg;base64,'+String(i).repeat(70000));
  const snapshot = { users: avatars.map(avatar=>({avatar})), suppliers: Array.from({length:30},()=>({creator:{avatar:avatars[0]},reviewerNotes:avatars.map(authorAvatar=>({authorAvatar}))})), leadLabItems: [], version:'7' };
  const packed=packSnapshot(snapshot);
  assert.ok(JSON.stringify(snapshot).length>20000000);
  assert.ok(JSON.stringify(packed).length<800000);
  assert.deepEqual(unpackSnapshot(packed),snapshot);
  assert.equal(unpackSnapshot(snapshot),snapshot);
  assert.throws(()=>unpackSnapshot({wireFormat:'images-v1',images:[],snapshot:{$vitchaImage:8}}));
});
