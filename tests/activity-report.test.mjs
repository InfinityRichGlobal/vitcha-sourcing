import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'vitcha-report-test-'));
const bundle = path.join(dir, 'report.cjs');
await build({ entryPoints: ['src/utils/exportReport.ts'], outfile: bundle, bundle: true, platform: 'node', format: 'cjs', logLevel: 'silent' });
const { buildExecutiveReportHtml: report } = createRequire(import.meta.url)(bundle);
await fs.rm(dir, { recursive: true, force: true });
const text = html => html.replace(/<[^>]*>/g, '').replaceAll('&amp;', '&');
const item = () => ({ id: 'report-test', type: 'supplier', name: 'รายงานทดสอบ', category: 'ชา', rating: 4, photos: { storefrontAndAtmosphere: [], contactCards: [] }, catalogItems: [], quickTags: [], location: { lat: 13, lng: 100 }, creator: { alias: 'ผู้สร้าง', timestamp: '2026-10-30T00:00:00Z' }, history: [], reviewerNotes: [], handoffStage: 'sample_test', assignedTo: 'member-1' });
const users = [{ id: 'member-1', alias: 'May', name: 'May', role: 'editor' }];

test('report includes every event, full before/after values, repeated/backward stages and member names', () => {
  const record = item();
  const longText = 'บันทึกยาวมาก ต้องอ่านได้ครบทุกบรรทัด\n'.repeat(80) + 'จบข้อความสำคัญ';
  record.history = Array.from({ length: 32 }, (_, i) => ({ id: `event-${i}`, version: 2, kind: 'handoff', user: 'SuperiCez', userId: 'owner-id', timestamp: `2026-10-30T${String(Math.floor(i / 60)).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}:00Z`, action: `เหตุการณ์ที่ ${i}`, stageBefore: i % 2 ? 'sample_test' : 'rfq_sent', stageAfter: i % 2 ? 'rfq_sent' : 'sample_test', changes: [{ field: 'assignedTo', before: null, after: 'member-1' }, { field: 'handoffNotes', before: i === 0 ? 'บันทึกเดิม' : null, after: i === 31 ? longText : `บันทึกใหม่ ${i}` }] }));
  const html = report(record, n => n * 5, 'pdf', users);
  const plain = text(html);
  assert.equal((html.match(/class="audit-event"/g) || []).length, 32);
  assert.ok(plain.includes('จบข้อความสำคัญ'));
  assert.equal((plain.match(/บันทึกยาวมาก/g) || []).length, 80);
  assert.ok(plain.includes('ก่อนเปลี่ยน') && plain.includes('หลังเปลี่ยน') && plain.includes('บันทึกเดิม'));
  assert.ok(plain.includes('พาร์ท 3: ทดสอบตัวอย่าง Lab/R&D → พาร์ท 2: ขอสเปก / ส่ง RFQ'));
  assert.ok(plain.includes('บันทึกเข้า 16 ครั้ง'));
  assert.ok(plain.includes('ผู้รับช่วงต่อ: May'));
  assert.ok(plain.includes('SuperiCez'));
  assert.ok(!plain.includes('owner-id'));
  assert.ok(html.indexOf('data-activity-id="event-0"') < html.indexOf('data-activity-id="event-30"'));
  assert.ok(html.indexOf('data-activity-id="event-1"') < html.indexOf('data-activity-id="event-31"'));
});

test('report preserves legacy comments and replies, deduplicates snapshots and does not invent stage history', () => {
  const record = item();
  record.history = [{ action: 'ประวัติเก่าที่มีอยู่', user: 'ผู้บันทึกเดิม', timestamp: '2026-10-29T00:00:00Z' }, { id: 'note-1', version: 2, kind: 'comment', action: 'แสดงความคิดเห็น', user: 'May', timestamp: '2026-10-30T00:00:00Z', stageAfter: 'sample_test', content: { id: 'note-1', text: 'ข้อความเต็มจาก snapshot' } }];
  record.reviewerNotes = [{ id: 'note-1', author: 'May', text: 'ข้อความเต็มจาก snapshot', timestamp: '2026-10-30T00:00:00Z', replies: [{ id: 'reply-1', author: 'Lek', text: 'คำตอบเก่าที่ยังมีครบ', timestamp: '2026-10-30T01:00:00Z' }] }];
  const html = report(record, n => n, 'print');
  const activity = html.slice(html.indexOf('id="activity-history"'), html.indexOf('<script>\n    // Extract'));
  const plain = text(activity);
  assert.equal((activity.match(/class="audit-event"/g) || []).length, 3);
  assert.equal((plain.match(/ข้อความเต็มจาก snapshot/g) || []).length, 1);
  assert.ok(plain.includes('คำตอบเก่าที่ยังมีครบ'));
  assert.ok(plain.includes('ไม่เติมขั้นตอนย้อนหลัง'));
  assert.ok(!plain.includes('เคยอยู่ขั้นตอนนี้'));
});

test('history output escapes user text and rejects unsafe links while retaining removed media', () => {
  const record = item();
  record.history = [{ id: 'change', version: 2, kind: 'update', user: '<img onerror=alert(1)>', userAvatar: '/logo.jpg', action: '<script>alert(1)</script>', timestamp: '2026-10-30T00:00:00Z', changes: [{ field: 'attachedFiles', before: [{ name: 'สเปกเดิม', url: 'https://example.com/spec.pdf' }], after: [] }, { field: 'photos', before: ['/logo.jpg'], after: [] }, { field: 'voiceNotes', before: [], after: [{ url: 'javascript:alert(1)' }, { url: 'http://' }] }], content: { text: '<svg onload=alert(1)>', voiceUrl: '/audio/clip.m4a' } }];
  const html = report(record, n => n, 'print');
  assert.ok(html.includes('href="https://example.com/spec.pdf"'));
  assert.ok(html.includes('src="https://vitcha-sourcing-fxjw.onrender.com/logo.jpg"'));
  assert.ok(!html.includes('href="javascript:'));
  assert.ok(!html.includes('<svg onload=') && !html.includes('<img onerror=') && !html.includes('<script>alert(1)</script>'));
  assert.ok(text(html).includes('เปิดไฟล์เสียง'));
  assert.ok(html.includes('class="audit-avatar" src="/logo.jpg"'));
  assert.ok(!html.includes('id="activity-history"') || (html.match(/class="audit-content"/g) || []).length === 1);
});

test('report stops at the furthest relevant stage and gives skipped stages one short line', () => {
  const record = item();
  record.history = [{ id: 'skip', version: 2, kind: 'handoff', user: 'May', action: 'ส่งทดสอบ', timestamp: '2026-10-30T00:00:00Z', stageBefore: 'awaiting', stageAfter: 'sample_test', changes: [] }];
  let html = report(record, n => n, 'print');
  let activity = text(html.slice(html.indexOf('id="activity-history"'), html.indexOf('<script>\n    // Extract')));
  assert.equal((html.match(/class="audit-stage /g) || []).length, 3);
  assert.ok(activity.includes('พาร์ท 2: ไม่พบการบันทึกในพาร์ทนี้'));
  assert.ok(!activity.includes('พาร์ท 4:') && !activity.includes('พาร์ท 5:') && !activity.includes('พาร์ท 6:'));
  record.history.push({ id: 'back', version: 2, kind: 'handoff', user: 'May', action: 'ทดสอบซ้ำ', timestamp: '2026-10-30T01:00:00Z', stageBefore: 'approved', stageAfter: 'sample_test', changes: [] });
  html = report(record, n => n, 'print');
  activity = text(html.slice(html.indexOf('id="activity-history"'), html.indexOf('<script>\n    // Extract')));
  assert.ok(activity.includes('พาร์ท 5: ตัวเต็งอนุมัติ → พาร์ท 3:'));
  assert.ok(!activity.includes('พาร์ท 6:'));
});
