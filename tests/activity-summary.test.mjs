import test from 'node:test';
import assert from 'node:assert/strict';
import { activityMediaCounts, compactActivity, compactActivityHistories } from '../src/utils/activitySummary.js';
import { recordActivity } from '../server/activity-history.js';
const actor = { id: 'a', alias: 'นายเอ', avatar: 'data:image/png;base64,DO_NOT_COPY' };
const urls = n => Array.from({ length: n }, (_, i) => `/uploads/image-${i}.jpg`);
const base = { user: 'นายเอ', userId: 'a', timestamp: '2026-11-08T12:00:00Z', id: 'event' };

test('image replacement counts additions and removals rather than a net difference or unchanged images', () => {
  const before = { photos: { storefrontAndAtmosphere: urls(3) } };
  const after = { photos: { storefrontAndAtmosphere: urls(8).slice(3) } };
  assert.deepEqual(activityMediaCounts(before, after), { images: { added: 5, removed: 3 } });
  const item = { ...after, history: [] };
  const event = recordActivity(item, actor, { kind: 'update', before, fields: ['photos'] });
  assert.match(event.action, /เพิ่มรูปภาพ 5 รูป · ลบรูปภาพ 3 รูป/);
  assert.equal(event.changes, undefined); assert.equal(event.userAvatar, undefined);
  assert.ok(!JSON.stringify(event).includes('/uploads/'));
  recordActivity(item, actor, { kind: 'update', before: after, fields: ['photos'] });
  assert.equal(item.history.length, 1);
});

test('comment summary counts five photos and one voice once despite legacy aliases', () => {
  const content = { text: 'full text', media: urls(5).map(url => ({ type: 'image', url })), photoUrl: urls(5)[0], voiceUrl: '/audio/a.m4a', replies: [{ photoUrl: '/reply.jpg' }] };
  const event = compactActivity({ ...base, kind: 'comment', content });
  assert.equal(event.action, 'แสดงความคิดเห็น · แนบรูปภาพ 5 รูป · แนบเสียง 1 ไฟล์');
  assert.equal(event.content, undefined);
  assert.deepEqual(compactActivity(event), event);
});

test('media moved between groups and Drive size aliases are not logged as uploads/deletions', () => {
  const before = { photos: { a: ['https://drive.google.com/file/d/same/view'], b: [] }, voiceNotes: [{ url: '/audio/a' }], voiceNoteUrl: '/audio/a' };
  const after = { photos: { a: [], b: ['https://lh3.googleusercontent.com/d/same=s600'] }, voiceNotes: [{ url: '/audio/a' }] };
  assert.deepEqual(activityMediaCounts(before, after), {});
  assert.deepEqual(activityMediaCounts({}, { catalogItems: [{ voiceNoteUrl: '/audio/a', voiceNotes: [{ url: '/audio/a' }, { url: '/audio/b' }] }] }), { audio: { added: 2, removed: 0 } });
  assert.deepEqual(activityMediaCounts({}, { attachedFiles: [{ url: '/pdf/a', mimeType: 'application/pdf' }], videos: ['/video/a'] }), { videos: { added: 1, removed: 0 }, files: { added: 1, removed: 0 } });
});

test('legacy migration reduces history only, retaining events and all current content; reruns are no-ops', () => {
  const event = { ...base, version: 2, kind: 'update', changes: [{ field: 'photos', before: urls(8), after: urls(5) }, { field: 'memo', before: 'old'.repeat(1000), after: 'new'.repeat(1000) }], userAvatar: actor.avatar };
  const item = { id: 's', photos: { a: urls(5) }, memo: 'current', reviewerNotes: [{ id: 'n', text: 'original', photoUrl: '/uploads/comment.jpg' }], history: [event], revision: 9 };
  const db = { suppliers: [structuredClone(item)], drinkStores: [], locations: [], trash: [{ ...structuredClone(item), _trashedFrom: 'locations' }], users: [actor] };
  const before = structuredClone(db);
  assert.equal(compactActivityHistories(db), true);
  assert.equal(db.suppliers[0].history.length, 1);
  assert.equal(db.suppliers[0].history[0].action, 'แก้ไขข้อมูลรายการ · ลบรูปภาพ 3 รูป');
  assert.ok(JSON.stringify(db.suppliers[0].history).length < JSON.stringify(before.suppliers[0].history).length / 10);
  assert.deepEqual({ ...db.suppliers[0], history: [] }, { ...before.suppliers[0], history: [] });
  assert.deepEqual(db.users, before.users);
  assert.equal(db.trash[0].history[0].version, 3);
  assert.equal(compactActivityHistories(db), false);
});
