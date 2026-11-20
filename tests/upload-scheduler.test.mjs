import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

const bundle = await build({ entryPoints: ['src/services/uploadScheduler.ts'], bundle: true, write: false, format: 'esm', platform: 'node' });
const { withUploadSlot } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
const tick = () => new Promise(resolve => setImmediate(resolve));

test('independent upload groups share two slots and release them after a rejected upload', async () => {
  let active = 0, maximum = 0;
  const started = [], release = [];
  const tasks = Array.from({ length: 8 }, (_, id) => withUploadSlot(async () => {
    started.push(id); active++; maximum = Math.max(maximum, active);
    try {
      await new Promise(resolve => { release[id] = resolve; });
      if (id === 0) throw new Error('Interrupted original');
      return id;
    } finally { active--; }
  }));
  const results = Promise.allSettled(tasks);
  await tick();
  assert.deepEqual(started, [0, 1]);
  for (let id = 0; id < 8; id++) { release[id](); await tick(); }
  assert.equal(maximum, 2);
  assert.deepEqual(started, [0, 1, 2, 3, 4, 5, 6, 7]);
  const settled = await results;
  assert.equal(settled[0].status, 'rejected');
  assert.equal(settled.slice(1).every(result => result.status === 'fulfilled'), true);
});

test('canceling a waiting file never sends it and does not block the next group', async () => {
  const release = [];
  const blockers = [0, 1].map(i => withUploadSlot(() => new Promise(resolve => { release[i] = resolve; })));
  await tick();
  const controller = new AbortController(); let canceledStarted = false, nextStarted = false;
  const canceled = withUploadSlot(async () => { canceledStarted = true; }, controller.signal);
  const rejected = assert.rejects(canceled, error => error.name === 'AbortError');
  const next = withUploadSlot(async () => { nextStarted = true; });
  controller.abort(); await rejected;
  release[0](); await tick();
  assert.equal(canceledStarted, false); assert.equal(nextStarted, true);
  release[1](); await Promise.all([...blockers, next]);
  const alreadyAborted = new AbortController(); alreadyAborted.abort();
  await assert.rejects(withUploadSlot(async () => { throw new Error('Must not start'); }, alreadyAborted.signal), error => error.name === 'AbortError');
  assert.equal(await withUploadSlot(async () => 'healthy'), 'healthy');
});
