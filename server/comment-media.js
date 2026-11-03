import { randomUUID } from 'node:crypto';

export function parseCommentMedia(value) {
  const invalid = () => { throw Object.assign(new Error('ไฟล์แนบความคิดเห็นไม่ถูกต้อง (สูงสุด 20 รูป/วิดีโอ)'), { status: 400 }); };
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > 20) invalid();
  const ids = new Set();
  return value.map(item => {
    if (!item || !['image', 'video'].includes(item.type) || typeof item.url !== 'string' || item.url.length > 4096 || !(/^(https?:\/\/|\/(?:media|uploads)\/)/.test(item.url))) invalid();
    if (/\s|[<>"\\]/.test(item.url)) invalid();
    if (/^https?:/.test(item.url)) { try { const url = new URL(item.url); if (url.username || url.password) invalid(); } catch { invalid(); } }
    const id = typeof item.id === 'string' && item.id.length <= 100 ? item.id : randomUUID();
    if (ids.has(id)) invalid(); ids.add(id);
    return { id, type: item.type, url: item.url, ...(typeof item.name === 'string' ? { name: item.name.slice(0, 160) } : {}) };
  });
}
