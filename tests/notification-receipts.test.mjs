import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
const bundle = await build({ entryPoints: ['src/services/notificationReceipts.ts'], bundle: true, write: false, format: 'esm', platform: 'node' });
const { NotificationReceipts } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
const values = new Map();
Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) } });
const notice = (id, read = false) => ({ id, read, title: id });
test('pending read receipt survives stale polls and reload until the server confirms', () => {
 const receipt = new NotificationReceipts('server|member-a');
 receipt.remember(['one'], 'read');
 assert.equal(receipt.merge([notice('one')])[0].read, true);
 const restored = new NotificationReceipts('server|member-a');
 assert.deepEqual(restored.pending('read'), ['one']);
 restored.acknowledge(['one'], 'read');
 assert.deepEqual(restored.pending('read'), []);
 assert.equal(restored.merge([notice('one')])[0].read, true);
 assert.equal(restored.merge([notice('one', true)])[0].read, true);
 assert.equal(new NotificationReceipts('server|member-a').read.size, 0);
});
test('clear receipts cannot resurrect on stale polls and do not cross accounts or servers', () => {
 const receipt = new NotificationReceipts('server|member-b'); receipt.remember(['old'], 'clear');
 assert.deepEqual(receipt.merge([notice('old')]), []);
 assert.equal(new NotificationReceipts('server|other-member').clear.size, 0);
 assert.equal(new NotificationReceipts('other-server|member-b').clear.size, 0);
 receipt.acknowledge(['old'], 'clear'); receipt.merge([]);
 assert.equal(new NotificationReceipts('server|member-b').clear.size, 0);
});
test('read-all captures visible IDs without hiding a newly arrived notification', () => {
 const receipt = new NotificationReceipts('server|member-c');receipt.remember(['old'], 'read');
 assert.deepEqual(receipt.merge([notice('new'),notice('old')]).map(n=>n.read),[false,true]);
});
