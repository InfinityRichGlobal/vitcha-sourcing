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

const historyPart = html => { const start = html.indexOf('id="activity-history"'); return html.slice(start, html.indexOf('<script>', start)); };

test('report includes all concise events in chronological order without copying old fields', () => {
  const record = item();
  record.history = Array.from({ length: 32 }, (_, i) => ({ id: `event-${i}`, version: 2, kind: 'handoff', user: 'SuperiCez', timestamp: `2026-10-30T00:${String(i).padStart(2, '0')}:00Z`, action: 'ส่งต่อ', changes: [{ field: 'handoffNotes', before: null, after: 'old large note'.repeat(1000) }] }));
  const html = historyPart(report(record, n => n, 'print', users));
  assert.equal((html.match(/class="audit-event"/g) || []).length, 32);
  assert.ok(!html.includes('old large note') && !html.includes('audit-change'));
  assert.ok(text(html).includes('อัปเดตการส่งต่องาน'));
  assert.ok(text(html).includes('SuperiCez'));
  assert.ok(html.indexOf('data-activity-id="event-0"') < html.indexOf('data-activity-id="event-31"'));
});

test('comments and replies retain all text and named attachments separately from concise history', () => {
  const record = item();
  record.history = [{ id: 'note-1', version: 2, kind: 'comment', action: 'แสดงความคิดเห็น', user: 'May', timestamp: '2026-10-30T00:00:00Z', content: { id: 'note-1', text: 'ข้อความจริง' } }];
  record.reviewerNotes = [{ id: 'note-1', author: 'May', text: 'ข้อความจริง', timestamp: '2026-10-30T00:00:00Z', media: [{ id: 'p', type: 'image', name: 'หน้าร้านแนวตั้ง.jpg', url: 'https://example.com/portrait.jpg' }, { id: 'v', type: 'video', name: 'ชมร้าน.mp4', url: '/media/clip' }], voiceUrl: '/media/voice', replies: [{ id: 'reply-1', author: 'Lek', text: 'คำตอบครบถ้วน', timestamp: '2026-10-30T01:00:00Z' }] }];
  const html = report(record, n => n, 'print');
  const comments = html.slice(html.indexOf('id="record-comments"'), html.indexOf('id="activity-history"'));
  assert.ok(text(comments).includes('ข้อความจริง') && text(comments).includes('คำตอบครบถ้วน'));
  for (const label of ['May', 'Lek', 'หน้าร้านแนวตั้ง.jpg', 'ชมร้าน.mp4', 'เสียงแนบ', 'ตอบกลับ #1.1']) assert.ok(text(comments).includes(label), label);
  assert.ok(comments.includes('data-video-src="https://vitcha-sourcing-fxjw.onrender.com/media/clip"'));
  assert.ok(comments.includes('href="https://vitcha-sourcing-fxjw.onrender.com/media/voice"'));
  const history = historyPart(html);
  assert.equal((history.match(/class="audit-event"/g) || []).length, 2);
  assert.ok(!history.includes('ข้อความจริง') && !history.includes('คำตอบครบถ้วน'));
  assert.equal((history.match(/<img /g) || []).length, 2);
  assert.equal((history.match(/class="person-avatar"/g) || []).length, 2);
  assert.ok(!history.includes('data-video-src') && !history.includes('portrait.jpg'));
});

test('legacy comments match their existing actor/time log instead of appearing twice', () => {
  const record = item();
  record.history = [{ action: 'แสดงความคิดเห็น: \"ข้อความเดิม\"', user: 'May', timestamp: '2026-10-30T00:00:00Z' }];
  record.reviewerNotes = [{ id: 'note-1', author: 'May', text: 'ข้อความเดิม', timestamp: '2026-10-30T00:00:00Z', replies: [] }];
  assert.equal((historyPart(report(record, n => n, 'print')).match(/class="audit-event"/g) || []).length, 1);
});

test('report does not substitute unrelated photos for video posters or emit unsafe comment links', () => {
  const record = item(); record.videos = ['/media/actual-clip']; record.photos.storefrontAndAtmosphere = ['https://example.com/unrelated.jpg'];
  record.reviewerNotes = [{ id: 'bad', author: '<img onerror=alert(1)>', text: '<svg onload=alert(1)>', timestamp: '', voiceUrl: 'javascript:alert(1)', replies: [] }];
  const html = report(record, n => n, 'print');
  const clip = html.slice(html.indexOf('<figure class="video-card"'), html.indexOf('</figure>'));
  assert.ok(!clip.includes('unrelated.jpg'));
  assert.ok(clip.includes('hidden') && clip.includes('data-video-src="https://vitcha-sourcing-fxjw.onrender.com/media/actual-clip"'));
  assert.ok(!html.includes('href="javascript:'));
  assert.ok(!html.includes('<svg onload=') && !html.includes('<img onerror='));
});


test('location report uses location ratings, contacts and lease data without restaurant placeholders', () => {
  const record = { ...item(), type: 'location', locationType: 'คอมมูนิตี้มอลล์', zoneOrFloor: 'ชั้น 1', ratings: { footTraffic: 4, visibility: 3, accessibility: 2, valueRoi: 5 }, spaceSpecs: { usableAreaSqm: 120, layoutFormat: 'corner' }, leaseTerms: { monthlyRentThb: 60000, contactPerson: 'เจ้าของพื้นที่', contactPhone: '0123456789', rentModel: 'fixed' } };
  const plain = text(report(record, n => n, 'print'));
  assert.ok(plain.includes('รายงานสำรวจทำเล') && plain.includes('คนสัญจร 4/5'));
  for (const value of ['ข้อมูลพื้นที่และเงื่อนไขเช่า', '60000', '120', 'เจ้าของพื้นที่', '0123456789', 'ห้องมุม']) assert.ok(plain.includes(value), value);
  assert.ok(!plain.includes('undefined') && !plain.includes('รสชาติ') && !plain.includes('เมนูชิม'));
});
