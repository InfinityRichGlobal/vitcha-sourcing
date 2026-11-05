import fs from 'node:fs';
import path from 'node:path';
import { randomBytes } from 'node:crypto';
import express from 'express';

export const MAX_UPLOAD_BYTES = 2 * 1024 ** 3;
export const UPLOAD_CHUNK_BYTES = 4 * 1024 ** 2;
const TTL = 2 * 60 * 60 * 1000;
const fail = (status, message) => { throw Object.assign(new Error(message), { status }); };
const types = new Map(Object.entries({ 'video/mp4': '.mp4', 'video/quicktime': '.mov', 'video/webm': '.webm', 'audio/mp4': '.m4a', 'audio/mpeg': '.mp3', 'audio/webm': '.webm', 'audio/wav': '.wav', 'audio/x-wav': '.wav', 'audio/ogg': '.ogg', 'audio/aac': '.aac', 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif', 'application/pdf': '.pdf', 'application/msword': '.doc', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx', 'application/vnd.ms-excel': '.xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx', 'application/vnd.ms-powerpoint': '.ppt', 'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx', 'text/plain': '.txt', 'text/csv': '.csv', 'application/zip': '.zip', 'application/x-zip-compressed': '.zip' }));

/** Small binary requests avoid base64 expansion, proxy limits and whole-file RAM use. */
export function registerUploadSessions(app, { uploads, mediaStorage, requireWriter }) {
  const staging = path.join(path.dirname(uploads), 'pending-uploads');
  fs.mkdirSync(staging, { recursive: true });
  const sessions = new Map();
  const remove = session => { session.controller.abort(); fs.rmSync(session.filePath, { force: true }); sessions.delete(session.id); };
  const sweep = () => {
    for (const s of sessions.values()) if (Date.now() - s.touched > TTL) remove(s);
    for (const name of fs.readdirSync(staging)) {
      const file = path.join(staging, name);
      if (fs.statSync(file).mtimeMs < Date.now() - TTL) fs.rmSync(file, { force: true });
    }
  };
  function get(req) {
    requireWriter(req);
    const s = sessions.get(req.params.id);
    if (!s || s.userId !== req.user.id) fail(404, 'การอัปโหลดหมดอายุ กรุณาเลือกไฟล์ใหม่');
    s.touched = Date.now();
    return s;
  }
  app.post('/api/uploads', (req, res) => {
    requireWriter(req); sweep();
    const { filename, mimeType, fileSize, recordType, recordId, recordTitle } = req.body || {};
    if (!types.has(mimeType) || !Number.isSafeInteger(fileSize) || fileSize < 1) fail(400, 'ชนิดหรือขนาดไฟล์ไม่ถูกต้อง');
    if (fileSize > MAX_UPLOAD_BYTES) fail(413, 'ไฟล์ต้องไม่เกิน 2 GB');
    // Six original photos may use chunks concurrently, alongside a video/audio job.
    if ([...sessions.values()].filter(s => s.userId === req.user.id && !s.result).length >= 8 || sessions.size >= 100) fail(429, 'มีไฟล์กำลังอัปโหลดหลายรายการ กรุณารอสักครู่');
    if (mediaStorage && !mediaStorage.uploadFromFile) fail(503, 'เซิร์ฟเวอร์ยังไม่รองรับการอัปโหลดไฟล์ใหญ่');
    const id = randomBytes(24).toString('hex');
    const filePath = path.join(staging, id);
    fs.writeFileSync(filePath, '', { flag: 'wx' });
    sessions.set(id, { id, userId: req.user.id, filePath, filename: `${id}${types.get(mimeType)}`, originalName: String(filename || '').slice(0, 255), mimeType, fileSize, recordType, recordId, recordTitle, offset: 0, touched: Date.now(), controller: new AbortController() });
    res.status(201).json({ id, chunkSize: UPLOAD_CHUNK_BYTES });
  });
  app.post('/api/uploads/:id/chunk', express.raw({ type: 'application/octet-stream', limit: UPLOAD_CHUNK_BYTES }), (req, res) => {
    const s = get(req); const offset = Number(req.query.offset); const bytes = req.body;
    if (s.finishing || s.result) fail(409, 'ไฟล์กำลังตรวจสอบหรือบันทึกแล้ว');
    if (!Number.isSafeInteger(offset) || offset < 0 || !Buffer.isBuffer(bytes) || !bytes.length || offset + bytes.length > s.fileSize) fail(400, 'ข้อมูลส่วนของไฟล์ไม่ถูกต้อง');
    if (offset < s.offset && offset + bytes.length <= s.offset) {
      const previous = Buffer.alloc(bytes.length); const fd = fs.openSync(s.filePath, 'r');
      try { fs.readSync(fd, previous, 0, bytes.length, offset); } finally { fs.closeSync(fd); }
      if (!previous.equals(bytes)) fail(409, 'ข้อมูลส่วนของไฟล์ไม่ตรงกัน');
      return res.json({ offset: s.offset });
    }
    if (offset !== s.offset) fail(409, 'ลำดับส่วนของไฟล์ไม่ตรงกัน');
    fs.appendFileSync(s.filePath, bytes); s.offset += bytes.length;
    res.json({ offset: s.offset });
  });
  app.post('/api/uploads/:id/complete', async (req, res) => {
    const s = get(req);
    if (s.result) return res.json(s.result);
    if (s.offset !== s.fileSize) fail(409, 'ไฟล์ยังอัปโหลดไม่ครบ');
    if (s.finishing) fail(409, 'กำลังบันทึกไฟล์ กรุณารอสักครู่');
    s.finishing = true;
    try {
      let url;
      if (mediaStorage) url = await mediaStorage.uploadFromFile({ ...s, signal: s.controller.signal });
      else { fs.renameSync(s.filePath, path.join(uploads, s.filename)); url = `/uploads/${s.filename}`; }
      s.controller.signal.throwIfAborted();
      s.result = { success: true, url }; s.touched = Date.now();
      fs.rmSync(s.filePath, { force: true }); res.json(s.result);
    } finally { s.finishing = false; }
  });
  app.delete('/api/uploads/:id', (req, res) => { const s = get(req); remove(s); res.json({ success: true }); });
}
