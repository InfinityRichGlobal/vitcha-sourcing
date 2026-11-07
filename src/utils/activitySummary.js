// Shared by the server, timeline and report. Never retain media URLs or field values.
const labels = { images: ['รูปภาพ', 'รูป'], videos: ['วิดีโอ', 'ไฟล์'], audio: ['เสียง', 'ไฟล์'], files: ['ไฟล์แนบ', 'ไฟล์'] };
const actions = { create: 'สร้างรายการ', update: 'แก้ไขข้อมูลรายการ', comment: 'แสดงความคิดเห็น', reply: 'ตอบกลับความคิดเห็น', handoff: 'อัปเดตการส่งต่องาน', delete: 'ลบรายการเข้าถังขยะ', restore: 'กู้คืนรายการจากถังขยะ' };
const list = value => Array.isArray(value) ? value : [];

function mediaIn(value = {}) {
  const sets = Object.fromEntries(Object.keys(labels).map(key => [key, new Set()]));
  const add = (kind, url) => {
    if (typeof url !== 'string' || !url.trim()) return;
    // A Drive preview and original are the same file; aliases are not extra photos.
    const drive = url.match(/(?:drive\.google\.com\/file\/d\/|lh3\.googleusercontent\.com\/d\/)([^/?=]+)/);
    sets[kind].add(drive ? `drive:${drive[1]}` : url);
  };
  const photos = value.photos || {};
  for (const group of Array.isArray(photos) ? [photos] : Object.values(photos)) {
    if (Array.isArray(group)) for (const url of group) add('images', url);
  }
  for (const entry of [...list(value.catalogItems), ...list(value.drinkItems)]) {
    add('images', entry?.photo);
    add('audio', entry?.voiceNoteUrl);
    for (const voice of list(entry?.voiceNotes)) add('audio', voice?.url);
  }
  for (const url of list(value.videos)) add('videos', url);
  for (const entry of list(value.voiceNotes)) add('audio', entry?.url);
  add('audio', value.voiceNoteUrl);
  add('audio', value.voiceUrl || value.audioUrl);
  add('images', value.photoUrl || value.imageUrl);
  for (const entry of list(value.media)) if (entry) add(entry.type === 'video' ? 'videos' : 'images', entry.url);
  for (const entry of list(value.attachedFiles)) {
    if (!entry) continue;
    const kind = entry.mimeType?.startsWith('image/') ? 'images' : entry.mimeType?.startsWith('video/') ? 'videos' : entry.mimeType?.startsWith('audio/') ? 'audio' : 'files';
    add(kind, entry.url);
  }
  return sets;
}

export function activityMediaCounts(before = {}, after = {}) {
  const old = mediaIn(before), next = mediaIn(after);
  return Object.fromEntries(Object.keys(labels).flatMap(key => {
    const added = [...next[key]].filter(url => !old[key].has(url)).length;
    const removed = [...old[key]].filter(url => !next[key].has(url)).length;
    return added || removed ? [[key, { added, removed }]] : [];
  }));
}

export function activityKind(event) {
  if (event.kind) return event.kind;
  const text = event.action || '';
  if (Object.hasOwn(actions, text)) return text;
  return /ตอบกลับ|^reply$/.test(text) ? 'reply' : /ความคิดเห็น|คอมเม|^comment$/.test(text) ? 'comment'
    : /กู้คืน/.test(text) ? 'restore' : /ลบรายการ|ถังขยะ/.test(text) ? 'delete'
    : /สร้าง|เพิ่มรายการ/.test(text) ? 'create' : /ส่งต่อ|รับช่วง|ย้ายเข้าสู่|สถานะ|^handoff$/.test(text) ? 'handoff' : 'update';
}

export function compactActivity(event) {
  const kind = activityKind(event);
  let media = event.mediaCounts;
  if (!media) {
    const before = {}, after = {};
    for (const change of event.changes || []) { before[change.field] = change.before; after[change.field] = change.after; }
    media = activityMediaCounts(before, ['comment', 'reply'].includes(kind) ? event.content || {} : after);
  }
  const counts = Object.fromEntries(Object.keys(labels).flatMap(key => {
    const added = Math.max(0, Math.floor(Number(media[key]?.added) || 0));
    const removed = Math.max(0, Math.floor(Number(media[key]?.removed) || 0));
    return added || removed ? [[key, { added, removed }]] : [];
  }));
  const parts = [actions[kind] || 'บันทึกกิจกรรม'];
  for (const [key, [label, unit]] of Object.entries(labels)) {
    const count = counts[key];
    if (count?.added) parts.push(`${['comment', 'reply'].includes(kind) ? 'แนบ' : 'เพิ่ม'}${label} ${count.added} ${unit}`);
    if (count?.removed) parts.push(`ลบ${label} ${count.removed} ${unit}`);
  }
  return {
    ...(event.id ? { id: event.id } : {}), version: 3, kind,
    action: parts.join(' · '), user: event.user, ...(event.userId ? { userId: event.userId } : {}), timestamp: event.timestamp,
    ...(Object.keys(counts).length ? { mediaCounts: counts } : {}),
  };
}

export function compactActivityHistories(db) {
  let changed = false;
  for (const key of ['suppliers', 'drinkStores', 'locations', 'trash']) {
    for (const item of db[key] || []) {
      if (key === 'trash' && !['suppliers', 'drinkStores', 'locations'].includes(item._trashedFrom)) continue;
      if (!item.history?.some(event => event.version !== 3)) continue;
      const notes = (item.reviewerNotes || []).flatMap(note => [note, ...(note.replies || [])]);
      item.history = item.history.map(event => {
        if (event.version !== 3 && !event.content && ['comment', 'reply'].includes(activityKind(event))) {
          const note = notes.find(note => note.id === event.id || note.timestamp === event.timestamp && (note.authorId && note.authorId === event.userId || note.author === event.user));
          if (note) return compactActivity({ ...event, content: note });
        }
        return compactActivity(event);
      });
      changed = true;
    }
  }
  return changed;
}
