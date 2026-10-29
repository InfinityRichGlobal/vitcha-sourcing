import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { randomBytes, randomUUID, createHash, createHmac, scryptSync, timingSafeEqual } from 'node:crypto';
import { createPersistence } from './persistence.js';
import { DEFAULT_DATABASE } from './defaults.js';
import { productData, registerProductRoutes } from './products.js';

const MOCK_ROLES = { 'user-beam': 'reviewer', 'user-ann': 'viewer', 'user-mook': 'admin' };
const MOCK_IDS = new Set(Object.keys(MOCK_ROLES));
const ROLES = ['admin', 'reviewer', 'viewer'];
const STAGES = ['awaiting', 'rfq_sent', 'sample_test', 'negotiate', 'approved', 'ordered'];
const STATUSES = ['scouted', 'reviewing', 'rfq_sent', 'shortlisted', 'ordered'];
const HANDOFF = ['assignedTo', 'targetFollowUpDate', 'handoffNotes', 'handoffStage', 'status'];
const SUPPLIER = ['name', 'chineseName', 'marketOrCity', 'category', 'rating', 'quickTags', 'isFactory', 'phone', 'wechatId', 'lineId', 'address', 'photos', 'videos', 'catalogItems', 'memo', 'voiceNoteUrl', 'voiceDurationSec', 'voiceNotes', 'location', 'country'];
const STORE = ['storeName', 'chineseName', 'storeCategory', 'brandConcept', 'city', 'phone', 'lineId', 'wechatId', 'photos', 'videos', 'ratings', 'drinkItems', 'tastingNotes', 'voiceNoteUrl', 'voiceDurationSec', 'voiceNotes', 'location', 'country'];
const LOCATION = ['name', 'foreignName', 'locationType', 'zoneOrFloor', 'unitNumber', 'location', 'spaceSpecs', 'leaseTerms', 'ratings', 'photos', 'videos', 'voiceNoteUrl', 'voiceDurationSec', 'voiceNotes', 'quickTags', 'country'];
const now = () => new Date().toISOString();
const pick = (obj, keys) => Object.fromEntries(keys.filter(k => obj[k] !== undefined).map(k => [k, obj[k]]));
const clean = value => typeof value === 'string' ? value.trim() : '';
const fail = (status, message) => { throw Object.assign(new Error(message), { status }); };
const publicUser = u => ({ ...pick(u, ['id', 'name', 'alias', 'avatar', 'emailOrId', 'createdAt', 'lastActiveAt', 'statusNote', 'revision']), name: u.alias || u.name, role: u.role === 'editor' ? 'reviewer' : u.role });
function currentIdentity(db, value, idKey = 'id') {
  if (!value) return value;
  const user = db.users.find(u => u.id === value[idKey]);
  return user ? { ...value, ...pick(publicUser(user), ['name', 'alias', 'avatar', 'role']) } : value;
}
function currentNote(db, note) {
  const candidates = note.authorId ? db.users.filter(u => u.id === note.authorId) : db.users.filter(u => [u.alias, u.name].includes(note.author));
  const user = candidates.length === 1 ? publicUser(candidates[0]) : null;
  return { ...note, ...(user ? { authorId: user.id, author: user.alias, authorAvatar: user.avatar, authorRole: user.role } : {}), ...(note.replies ? { replies: note.replies.map(reply => currentNote(db, reply)) } : {}) };
}
function currentHistory(db, h) {
  const user = db.users.find(u => (h.userId && u.id === h.userId) || [u.alias, u.name].includes(h.user));
  return user ? { ...h, user: user.alias || user.name, userAvatar: user.avatar } : h;
}
function currentRecord(db, record) {
  return { ...record, creator: currentIdentity(db, record.creator), reviewerNotes: (record.reviewerNotes || []).map(note => currentNote(db, note)), likes: (record.likes || []).map(like => currentIdentity(db, like, 'userId')), viewedBy: (record.viewedBy || []).map(view => currentIdentity(db, view, 'userId')), history: (record.history || []).map(h => currentHistory(db, h)) };
}
const revision = record => record.revision || 0;
function expectRevision(record, value) {
  if (!Number.isInteger(value) || value !== revision(record)) fail(409, 'ข้อมูลมีการเปลี่ยนแปลง กรุณาปิดแล้วเปิดรายการใหม่ก่อนแก้ไขอีกครั้ง');
}
function pinHash(pin) {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(pin, salt, 32).toString('hex')}`;
}
function verifyPin(user, pin) {
  if (user.pinHash) {
    const [salt, hash] = user.pinHash.split(':');
    const actual = scryptSync(pin, salt, 32);
    const expected = Buffer.from(hash || '', 'hex');
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  }
  const a = Buffer.from(String(user.pin || ''));
  const b = Buffer.from(pin);
  return a.length > 0 && a.length === b.length && timingSafeEqual(a, b);
}
function validateRecord(record, collection) {
  if (!clean(record.name || record.storeName)) fail(400, 'กรุณาระบุชื่อรายการ');
  if (!record.photos || !Array.isArray(record.photos.storefrontAndAtmosphere)) fail(400, 'รูปภาพไม่ถูกต้อง');
  for (const photos of Object.values(record.photos)) if (!Array.isArray(photos) || photos.length > 200 || photos.some(x => typeof x !== 'string' || x.length > 5 * 1024 * 1024)) fail(400, 'รูปภาพไม่ถูกต้องหรือมีจำนวนมากเกินไป');
  if (record.quickTags && (!Array.isArray(record.quickTags) || record.quickTags.some(x => typeof x !== 'string'))) fail(400, 'ป้ายกำกับไม่ถูกต้อง');
  if (collection === 'suppliers' && (!Number.isFinite(record.rating) || record.rating < 1 || record.rating > 5 || !clean(record.category))) fail(400, 'กรุณาระบุหมวดหมู่และคะแนน 1–5');
  if (collection === 'drinkStores' && (!record.ratings || ['taste','aesthetics','value','speed'].some(k => !Number.isFinite(record.ratings[k]) || record.ratings[k] < 1 || record.ratings[k] > 5))) fail(400, 'คะแนนร้านน้ำต้องอยู่ระหว่าง 1–5');
  if (collection === 'locations' && (!record.ratings || ['footTraffic','visibility','accessibility','valueRoi'].some(k => !Number.isFinite(record.ratings[k]) || record.ratings[k] < 1 || record.ratings[k] > 5))) fail(400, 'คะแนนการประเมินทำเลต้องอยู่ระหว่าง 1–5');
  if (record.videos && !Array.isArray(record.videos)) fail(400, 'รายการวิดีโอไม่ถูกต้อง');
  if (!record.location || !Number.isFinite(record.location.lat) || !Number.isFinite(record.location.lng) || Math.abs(record.location.lat) > 90 || Math.abs(record.location.lng) > 180) fail(400, 'พิกัดไม่ถูกต้อง');
  if (collection !== 'locations') {
    if (!Array.isArray(record[collection === 'suppliers' ? 'catalogItems' : 'drinkItems'])) fail(400, 'รายละเอียดสินค้าไม่ถูกต้อง');
    const entries = record[collection === 'suppliers' ? 'catalogItems' : 'drinkItems'];
    const itemIds = new Set();
    for (const entry of entries) {
      if (!entry || typeof entry !== 'object' || Array.isArray(entry)) fail(400, 'รายละเอียดสินค้าไม่ถูกต้อง');
      if (entry.name !== undefined && typeof entry.name !== 'string') fail(400, 'ชื่อสินค้าไม่ถูกต้อง');
      if (entry.id && (typeof entry.id !== 'string' || itemIds.has(entry.id))) fail(400, 'รหัสสินค้าซ้ำหรือไม่ถูกต้อง');
      entry.id ||= randomUUID(); itemIds.add(entry.id);
      if (entry.photo !== undefined && (typeof entry.photo !== 'string' || /^(idb:|blob:)/.test(entry.photo))) fail(400, 'กรุณาอัปโหลดรูปสินค้าให้สำเร็จก่อน');
    }
  }
  if ((record.videos || []).some(url => typeof url !== 'string' || /^(idb:|blob:)/.test(url))) fail(400, 'กรุณาอัปโหลดวิดีโอขึ้นเซิร์ฟเวอร์ให้สำเร็จก่อน');
}

export function createApp({ dataDir, defaults = DEFAULT_DATABASE, sessionTtlMs = 30 * 24 * 60 * 60 * 1000, recoveryPasswordHash = null, persistence = null, mediaStorage = null } = {}) {
  const app = express();
  const storage = persistence || createPersistence(path.join(dataDir, 'database.json'), defaults);
  const uploads = path.join(dataDir, 'uploads');
  fs.mkdirSync(uploads, { recursive: true });
  const sessions = new Map();
  const revokedTokens = new Set();
  const sessionSecret = recoveryPasswordHash || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || 'vitcha-persistent-session-secret-v1';
  const attempts = new Map();
  const read = () => storage.read();
  const afterCommit = callback => storage.afterCommit ? storage.afterCommit(callback) : callback();
  // Every read/validate/write transaction below is synchronous (no await between
  // read and save). Run one Node writer per DATA_DIR; revisions protect stale clients.
  const save = db => { db.updatedAt = now(); db.revision = revision(db) + 1; storage.save(db); };
  const notify = (db, user, type, title, message, targetId) => {
    db.notifications = [{ id: randomUUID(), actorId: user.id, actorAlias: user.alias, avatar: user.avatar, type, title, message, targetId, timestamp: now(), read: false, readBy: [user.id], clearedBy: [] }, ...(db.notifications || [])].slice(0, 80);
  };
  const touch = item => { item.revision = revision(item) + 1; item.updatedAt = now(); };
  // One-time migration of legacy plaintext credentials before serving requests.
  const initial = read();
  let migrated = false;
  for (const user of initial.users || []) {
    // Reserved simulation personas had inconsistent roles in legacy exports.
    // Normalize only these non-login identities, preserving every real member.
    if (MOCK_IDS.has(user.id) && user.role !== MOCK_ROLES[user.id]) {
      user.role = MOCK_ROLES[user.id]; user.revision = revision(user) + 1; migrated = true;
    }
    if (typeof user.pin === 'string') {
      if (user.pin && !user.pinHash) user.pinHash = pinHash(user.pin);
      delete user.pin; migrated = true;
    }
  }
  // Resolve legacy author snapshots once, before users rename their profiles.
  function identifyNotes(notes) {
    for (const note of notes || []) {
      if (!note.authorId) {
        const matches = initial.users.filter(u => [u.alias, u.name].includes(note.author));
        if (matches.length === 1) { note.authorId = matches[0].id; migrated = true; }
      }
      identifyNotes(note.replies);
    }
  }
  for (const record of [...(initial.suppliers || []), ...(initial.drinkStores || [])]) {
    identifyNotes(record.reviewerNotes);
    const seen = new Set();
    for (const entry of [...(record.catalogItems || []), ...(record.drinkItems || [])]) {
      if (!entry || typeof entry !== 'object') continue;
      if (!entry.id || seen.has(entry.id)) { entry.id = randomUUID(); migrated = true; }
      seen.add(entry.id);
    }
  }
  if (migrated) save(initial);

  const requireAdmin = req => { if (req.user.role !== 'admin') fail(403, 'สิทธิ์นี้ใช้ได้เฉพาะผู้ดูแลระบบ'); };
  const requireWriter = req => { if (!['admin', 'reviewer'].includes(req.user.role)) fail(403, 'บัญชีนี้ดูข้อมูลได้เท่านั้น'); };
  const requireFounder = req => { if (req.user.id !== 'user-ice' || req.session.simulatedId) fail(403, 'ไม่สามารถดำเนินการนี้ได้'); };
  const sessionResult = (s, db) => ({ user: publicUser(db.users.find(u => u.id === (s.simulatedId || s.userId))), simulated: !!s.simulatedId });
  function signSessionToken(userId, expires, credential) {
    const payload = Buffer.from(JSON.stringify({ u: userId, e: expires, n: randomBytes(12).toString('hex') })).toString('base64url');
    const sig = createHmac('sha256', `${sessionSecret}:${credential}`).update(payload).digest('base64url');
    return `${payload}.${sig}`;
  }
  function resolveSession(token, db) {
    if (!token || typeof token !== 'string' || revokedTokens.has(token)) return null;
    const existing = sessions.get(token);
    if (existing) {
      const actor = db.users.find(u => u.id === existing.userId);
      if (!actor || existing.expires <= Date.now() || (actor.pinHash || actor.pin) !== existing.credential) {
        sessions.delete(token);
        return null;
      }
      return existing;
    }
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [payload, sig] = parts;
    let parsed;
    try {
      parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    } catch {
      return null;
    }
    if (!parsed || typeof parsed.u !== 'string' || !Number.isFinite(parsed.e) || parsed.e <= Date.now()) return null;
    const actor = db.users.find(u => u.id === parsed.u);
    if (!actor) return null;
    const credential = actor.pinHash || actor.pin;
    if (!credential) return null;
    const expectedSig = createHmac('sha256', `${sessionSecret}:${credential}`).update(payload).digest('base64url');
    const a = Buffer.from(sig);
    const b = Buffer.from(expectedSig);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    const restored = { userId: actor.id, expires: parsed.e, credential };
    sessions.set(token, restored);
    return restored;
  }
  function issueSession(user, db) {
    const expires = Date.now() + sessionTtlMs;
    const credential = user.pinHash || user.pin;
    const token = signSessionToken(user.id, expires, credential);
    const s = { userId: user.id, expires, credential };
    afterCommit(() => sessions.set(token, s));
    return { token, ...sessionResult(s, db) };
  }
  function rateLimit(req) {
    const key = req.ip;
    const at = Date.now();
    for (const [k, v] of attempts) if (v.until <= at) attempts.delete(k);
    const entry = attempts.get(key) || { count: 0, until: at + 15 * 60000 };
    if (++entry.count > 30) fail(429, 'ลองหลายครั้งเกินไป กรุณารอ 15 นาที');
    attempts.set(key, entry);
  }
  app.disable('x-powered-by');
  app.use(cors({ origin: true, methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
  app.use((req, res, next) => { res.set('X-Content-Type-Options', 'nosniff'); res.set('Cache-Control', 'no-store'); next(); });
  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
  if (storage.middleware) app.use('/api', storage.middleware());
  // Parse auth requests separately; reject unauthenticated large bodies before parsing.
  app.use(['/api/login', '/api/register'], express.json({ limit: '2mb' }));
  app.post('/api/login', (req, res) => {
    const key = clean(req.body?.idOrEmail).toLowerCase();
    const pin = typeof req.body?.pin === 'string' ? req.body.pin : '';
    if (!key || !pin || pin.length > 4096) fail(400, 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
    const db = read();
    const user = db.users.find(u => !MOCK_IDS.has(u.id) && [clean(u.emailOrId).toLowerCase(), u.id.toLowerCase(), u.id.replace(/^user-/, '').toLowerCase()].includes(key));
    const recovery = !!user && !!recoveryPasswordHash && verifyPin({ pinHash: recoveryPasswordHash }, pin);
    if (!user || (!recovery && !verifyPin(user, pin))) { rateLimit(req); fail(401, 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'); }
    if (!recovery && !user.pinHash) { user.pinHash = pinHash(pin); delete user.pin; save(db); }
    for (const [token, s] of sessions) if (s.expires <= Date.now()) sessions.delete(token);
    res.json({ success: true, ...issueSession(user, db) });
  });
  app.get('/api/invite/:code', (req, res) => {
    rateLimit(req);
    const invite = read().invites.find(i => i.code === clean(req.params.code).toUpperCase());
    if (!invite || invite.isUsed || !ROLES.includes(invite.role)) fail(404, 'คำเชิญไม่ถูกต้องหรือถูกใช้แล้ว');
    res.json(pick(invite, ['role', 'prefilledAlias']));
  });
  app.post('/api/register', (req, res) => {
    rateLimit(req);
    const db = read();
    if (resolveSession(req.headers.authorization?.replace(/^Bearer /, ''), db)) fail(409, 'มีบัญชีเข้าสู่ระบบอยู่แล้ว กรุณาออกจากระบบก่อนสมัครบัญชีใหม่');
    const { code, name, alias, emailOrId, pin, avatar } = req.body || {};
    if (!clean(name) || !clean(emailOrId) || !/^[\p{L}\p{N}_.@+\-]{3,120}$/u.test(clean(emailOrId)) || typeof pin !== 'string' || pin.length < 1 || pin.length > 4096) fail(400, 'กรุณาระบุชื่อ ไอดี และรหัสผ่าน');
    const invite = db.invites.find(i => i.code === clean(code).toUpperCase());
    if (!invite || invite.isUsed || !ROLES.includes(invite.role)) fail(400, 'รหัสคำเชิญไม่ถูกต้องหรือถูกใช้แล้ว');
    const key = clean(emailOrId).toLowerCase();
    if (db.users.some(u => [clean(u.emailOrId).toLowerCase(), u.id.toLowerCase(), u.id.replace(/^user-/, '').toLowerCase()].includes(key))) fail(409, 'ชื่อผู้ใช้หรืออีเมลนี้มีบัญชีอยู่แล้ว กรุณาเข้าสู่ระบบ');
    const user = { id: `user-${randomUUID()}`, name: clean(alias) || clean(name), alias: clean(alias) || clean(name), emailOrId: key, avatar: clean(avatar), pinHash: pinHash(pin), role: invite.role, createdAt: now(), revision: 0 };
    db.users.push(user);
    invite.isUsed = true; invite.usedBy = user.id; invite.usedAt = now();
    notify(db, user, 'system', 'สมาชิกใหม่เข้าร่วมทีม', user.alias);
    save(db); // Account and invite consumption succeed or fail together.
    res.status(201).json({ success: true, ...issueSession(user, db) });
  });
  app.use('/api', (req, res, next) => {
    const token = req.headers.authorization?.replace(/^Bearer /, '');
    const db = read();
    const s = resolveSession(token, db);
    const actor = s && db.users.find(u => u.id === s.userId);
    if (!s || !actor) { sessions.delete(token); return res.status(401).json({ error: 'เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่' }); }
    if (s.simulatedId && actor.id !== 'user-ice') return res.status(403).json({ error: 'ไม่มีสิทธิ์จำลองบัญชี' });
    const user = db.users.find(u => u.id === (s.simulatedId || s.userId));
    if (!user) return res.status(401).json({ error: 'ไม่พบบัญชีผู้ใช้' });
    req.user = publicUser(user); req.session = s; req.token = token;
    next();
  });
  app.use('/api', express.json({ limit: '75mb' }));
  registerProductRoutes(app, { read, save, requireWriter });
  app.get('/api/session', (req, res) => res.json(sessionResult(req.session, read())));
  app.post('/api/logout', (req, res) => { sessions.delete(req.token); if (req.token) revokedTokens.add(req.token); res.json({ success: true }); });
  app.post('/api/simulate', (req, res) => {
    if (req.session.userId !== 'user-ice') fail(403, 'ไม่สามารถดำเนินการนี้ได้');
    const id = req.body.userId;
    if (id !== 'user-ice' && !MOCK_IDS.has(id)) fail(400, 'เลือกบัญชีจำลองที่กำหนดไว้');
    if (!read().users.some(u => u.id === id)) fail(404, 'ไม่พบบัญชีจำลอง');
    req.session.simulatedId = id === 'user-ice' ? undefined : id;
    res.json(sessionResult(req.session, read()));
  });
  app.get('/api/data', (req, res) => {
    const db = read();
    const version = `${revision(db)}:${req.user.id}:${!!req.session.simulatedId}`;
    if (req.query.since === version) return res.json({ unchanged: true, version });
    res.set('X-Vitcha-Version', version);
    const userNotifications = (db.notifications || [])
      .filter(n => (!n.forAdminOnly || req.user.id === 'user-ice') && !(n.clearedBy || []).includes(req.user.id))
      .map(n => {
        const actor = db.users.find(u => u.id === n.actorId);
        const isRead = Boolean(n.read || (n.readBy || []).includes(req.user.id));
        return {
          ...(actor ? { ...n, avatar: actor.avatar, actorAlias: actor.alias } : n),
          read: isRead,
        };
      });
    res.json({ version, ...productData(db), ...pick(db, ['suppliers', 'drinkStores', 'locations', 'categories', 'storeCategories', 'quickTagsList', 'quickMessages', 'updatedAt', 'revision']), suppliers: (db.suppliers || []).map(item => currentRecord(db, item)), drinkStores: (db.drinkStores || []).map(item => currentRecord(db, item)), locations: (db.locations || []).map(item => currentRecord(db, item)), users: db.users.filter(u => !MOCK_IDS.has(u.id)).map(publicUser), invites: req.user.role === 'admin' ? db.invites : [], notifications: userNotifications, ...sessionResult(req.session, db) });
  });
  app.get('/api/backup', (req, res) => { requireFounder(req); res.json(read()); });
  for (const [route, collection] of [['suppliers', 'suppliers'], ['drink-stores', 'drinkStores'], ['locations', 'locations']]) {
    app.post(`/api/${route}`, (req, res) => {
      requireWriter(req);
      const input = req.body;
      if (!clean(input.id)) fail(400, 'Missing id');
      const db = read();
      const list = db[collection] ||= [];
      const target = list.find(x => x.id === input.id);
      const fields = collection === 'suppliers' ? SUPPLIER : collection === 'drinkStores' ? STORE : LOCATION;
      const creationHash = createHash('sha256').update(JSON.stringify(pick(input, [...fields, ...HANDOFF]))).digest('hex');
      let item;
      if (target && input.revision === undefined) {
        if (target.creator?.id === req.user.id && target.creationHash === creationHash) return res.json({ success: true, item: target });
        fail(409, 'รายการนี้ถูกบันทึกแล้ว กรุณาโหลดข้อมูลล่าสุด');
      }
      if (target) {
        requireAdmin(req); expectRevision(target, input.revision);
        item = { ...target, ...pick(input, fields) };
        validateRecord(item, collection);
        // Concurrent notes, likes, handoff and audit history are not client-editable.
        touch(item); item.history = [...(target.history || []), { action: 'แก้ไขและอัปเดตข้อมูลรายการ', user: req.user.alias, userAvatar: req.user.avatar, timestamp: now() }];
        list[list.indexOf(target)] = item;
      } else {
        if (input.revision !== undefined) fail(404, 'รายการนี้ถูกลบแล้ว');
        const createdAt = now();
        item = { ...pick(input, [...fields, ...HANDOFF]), id: input.id, type: collection === 'suppliers' ? 'supplier' : collection === 'drinkStores' ? 'drink_store' : 'location', creator: { ...pick(req.user, ['id', 'name', 'alias', 'avatar']), timestamp: createdAt }, creationHash, reviewerNotes: [], likes: [], viewedBy: [], history: [{ action: 'สร้างบันทึกรายการสำรวจใหม่', user: req.user.alias, userAvatar: req.user.avatar, timestamp: createdAt }], revision: 1, updatedAt: createdAt };
        validateRecord(item, collection); list.unshift(item);
      }
      notify(db, req.user, item.type, target ? 'อัปเดตข้อมูลรายการ' : 'เพิ่มรายการใหม่', item.name || item.storeName, item.id);
      save(db); res.json({ success: true, item });
    });
    app.delete(`/api/${route}/:id`, (req, res) => {
      requireAdmin(req); const db = read(); const list = db[collection] || [];
      const item = list.find(x => x.id === req.params.id);
      if (!item) fail(404, 'ไม่พบรายการ');
      expectRevision(item, req.body?.revision);
      db[collection] = list.filter(x => x.id !== item.id); save(db); res.json({ success: true });
    });
    app.post(`/api/${route}/:id/actions`, (req, res) => {
      const { action, data = {}, operationId } = req.body;
      if (action !== 'view') requireWriter(req);
      const db = read(); const item = (db[collection] || []).find(x => x.id === req.params.id);
      if (!item) fail(404, 'ไม่พบรายการ');
      if (!clean(operationId)) fail(400, 'Missing operation ID');
      if ((item.appliedOperations || []).includes(operationId)) return res.json({ success: true });
      const author = { authorId: req.user.id, author: req.user.alias, authorAvatar: req.user.avatar, authorRole: req.user.role, timestamp: now() };
      if (action === 'comment' || action === 'reply') {
        const rawText = clean(data.text);
        const voiceUrl = clean(data.voiceUrl || data.audioUrl);
        const photoUrl = clean(data.photoUrl || data.imageUrl);
        const duration = typeof data.duration === 'number' && data.duration > 0 ? Math.round(data.duration) : undefined;
        let text = rawText;
        if (!text && (voiceUrl || photoUrl)) {
          text = photoUrl && voiceUrl ? '📷 แนบรูปภาพและเสียง' : photoUrl ? '📷 แนบรูปภาพ' : '🎙️ ข้อความเสียง';
        }
        if (!text || text.length > 10000) fail(400, 'ความคิดเห็นต้องมี 1–10000 ตัวอักษร');
        item.reviewerNotes ||= [];
        if (action === 'comment') {
          item.reviewerNotes.push({ ...author, id: operationId, text, voiceUrl, photoUrl, duration, replies: [] });
        } else {
          const note = item.reviewerNotes.find(n => n.id === data.noteId);
          if (!note) fail(404, 'ไม่พบความคิดเห็น');
          (note.replies ||= []).push({ ...author, id: operationId, text, voiceUrl, photoUrl, duration, replyToAuthor: clean(data.replyToAuthor), replyToId: clean(data.replyToId) });
        }
      } else if (action === 'handoff') {
        expectRevision(item, req.body.revision);
        const patch = pick(data, HANDOFF);
        if (patch.handoffStage && !STAGES.includes(patch.handoffStage)) fail(400, 'สเตจไม่ถูกต้อง');
        if (patch.status && !STATUSES.includes(patch.status)) fail(400, 'สถานะไม่ถูกต้อง');
        for (const value of Object.values(patch)) if (typeof value !== 'string' || value.length > 10000) fail(400, 'ข้อมูลงานไม่ถูกต้อง');
        Object.assign(item, patch);
      } else if (action === 'like') {
        item.likes = (item.likes || []).filter(l => l.userId !== req.user.id);
        if (data.liked === true) item.likes.push({ userId: req.user.id, alias: req.user.alias, avatar: req.user.avatar, timestamp: now() });
      } else if (action === 'view') {
        item.viewedBy ||= [];
        const entry = item.viewedBy.find(v => v.userId === req.user.id);
        if (entry) { entry.lastViewedAt = now(); entry.viewCount++; }
        else item.viewedBy.push({ userId: req.user.id, ...pick(req.user, ['name', 'alias', 'avatar', 'role']), lastViewedAt: now(), viewCount: 1 });
      } else fail(400, 'Unknown action');
      item.appliedOperations = [...(item.appliedOperations || []), operationId].slice(-500);
      // Views and likes do not invalidate an editor's main-data version.
      if (!['view', 'like'].includes(action)) {
        touch(item);
        const stageLabels = {
          awaiting: 'พาร์ท 1: รอรับช่วงต่อ',
          rfq_sent: 'พาร์ท 2: ขอสเปก / ส่ง RFQ',
          sample_test: 'พาร์ท 3: ทดสอบตัวอย่าง Lab/R&D',
          negotiate: 'พาร์ท 4: ต่อรองราคา & MOQ',
          approved: 'พาร์ท 5: ตัวเต็งอนุมัติ',
          ordered: 'พาร์ท 6: สั่งซื้อสำเร็จ',
        };
        const statusLabels = {
          scouted: '1. สำรวจแล้ว',
          reviewing: '2. เทียบสเปก',
          rfq_sent: '3. ส่ง RFQ',
          shortlisted: '4. ตัวเต็ง (Shortlist)',
          ordered: '5. สั่งซื้อแล้ว (Ordered)',
        };
        let historyText = action;
        if (action === 'handoff') {
          const parts = [];
          if (data.handoffStage) parts.push(`ย้ายเข้าสู่ ${stageLabels[data.handoffStage] || data.handoffStage}`);
          if (data.status) parts.push(`เปลี่ยนสถานะเป็น ${statusLabels[data.status] || data.status}`);
          if (data.assignedTo !== undefined) parts.push(data.assignedTo ? `มอบหมายผู้รับช่วงต่อ: ${data.assignedTo}` : 'ยกเลิกผู้รับผิดชอบ');
          if (data.targetFollowUpDate) parts.push(`นัดติดตาม: ${data.targetFollowUpDate}`);
          if (data.handoffNotes) parts.push(`บันทึกส่งต่องาน: ${clean(data.handoffNotes).slice(0, 80)}`);
          historyText = parts.length > 0 ? parts.join(' · ') : 'อัปเดตสถานะการส่งต่องาน';
        } else if (action === 'comment') {
          historyText = `แสดงความคิดเห็น: "${clean(data.text || 'แนบไฟล์สื่อ').slice(0, 60)}"`;
        } else if (action === 'reply') {
          historyText = `ตอบกลับความคิดเห็น${data.replyToAuthor ? ` @${clean(data.replyToAuthor)}` : ''}`;
        }
        (item.history ||= []).push({ action: historyText, user: req.user.alias, userAvatar: req.user.avatar, timestamp: now() });
        const notifTitle = action === 'handoff' ? 'อัปเดตงานส่งต่อ' : action === 'reply' ? 'ตอบกลับความคิดเห็น' : 'ความคิดเห็นใหม่';
        notify(db, req.user, action === 'handoff' ? 'status' : action, notifTitle, clean(data.text).slice(0, 120) || item.name || item.storeName, item.id);
      }
      save(db); res.json({ success: true });
    });
  }
  app.post('/api/profile/avatar', (req, res) => {
    if (req.session.simulatedId) fail(403, 'ไม่สามารถดำเนินการนี้ได้');
    const db = read(); const user = db.users.find(u => u.id === req.user.id);
    expectRevision(user, req.body.revision);
    const avatar = req.body.avatar;
    if (typeof avatar !== 'string' || avatar.length > 2 * 1024 * 1024 || !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+=*$/.test(avatar)) fail(400, 'รูปโปรไฟล์ไม่ถูกต้อง');
    user.avatar = avatar; user.revision = revision(user) + 1;
    save(db); res.json({ success: true, user: publicUser(user) });
  });
  app.post('/api/users', (req, res) => {
    const db = read(); const input = req.body;
    const user = db.users.find(u => u.id === input.id);
    if (!user) fail(404, 'สร้างบัญชีใหม่ผ่านคำเชิญเท่านั้น');
    expectRevision(user, input.revision);
    if (input.role !== undefined) {
      requireAdmin(req);
      if (user.id === 'user-ice' || MOCK_IDS.has(user.id) || !ROLES.includes(input.role)) fail(403, 'ไม่สามารถเปลี่ยนสิทธิ์บัญชีนี้');
      user.role = input.role;
    } else {
      if (user.id !== req.user.id || req.session.simulatedId) fail(403, 'แก้ไขโปรไฟล์ของตนเองเท่านั้น');
      if (input.emailOrId !== undefined) {
        const key = clean(input.emailOrId).toLowerCase();
        if (!/^[\p{L}\p{N}_.@+\-]{3,120}$/u.test(key)) fail(400, 'ชื่อผู้ใช้ไม่ถูกต้อง');
        if (db.users.some(u => u.id !== user.id && [clean(u.emailOrId).toLowerCase(), u.id, u.id.replace(/^user-/, '')].includes(key))) fail(409, 'ชื่อผู้ใช้นี้ถูกใช้แล้ว');
        user.emailOrId = key;
      }
      Object.assign(user, pick(input, ['avatar']));
      if (input.alias !== undefined || input.name !== undefined) {
        const displayName = clean(input.alias ?? input.name);
        if (!displayName || displayName.length > 120) fail(400, 'กรุณาระบุชื่อที่แสดงไม่เกิน 120 ตัวอักษร');
        user.name = displayName; user.alias = displayName;
      }
      if (input.pin) {
        if (typeof input.pin !== 'string' || input.pin.length < 1 || input.pin.length > 4096) fail(400, 'รหัสผ่านไม่ถูกต้อง');
        user.pinHash = pinHash(input.pin); delete user.pin;
      }
    }
    user.revision = revision(user) + 1; save(db);
    if (user.id === req.session.userId) afterCommit(() => { req.session.credential = user.pinHash || user.pin; });
    res.json({ success: true, user: publicUser(user) });
  });
  app.delete('/api/users/:id', (req, res) => {
    requireAdmin(req);
    if (req.params.id === 'user-ice' || MOCK_IDS.has(req.params.id) || req.params.id === req.user.id) fail(403, 'ไม่สามารถลบบัญชีนี้');
    const db = read(); const target = db.users.find(u => u.id === req.params.id);
    if (!target) fail(404, 'ไม่พบบัญชี'); expectRevision(target, req.body?.revision);
    db.users = db.users.filter(u => u.id !== target.id); save(db); res.json({ success: true });
  });
  app.post('/api/invites', (req, res) => {
    requireAdmin(req); const db = read();
    if (!ROLES.includes(req.body.role)) fail(400, 'สิทธิ์ไม่ถูกต้อง');
    const requestId = clean(req.body.requestId);
    const existing = requestId && db.invites.find(i => i.requestId === requestId && i.createdById === req.user.id);
    if (existing) return res.json({ success: true, invite: existing });
    const invite = { requestId, createdById: req.user.id, id: `inv-${randomUUID()}`, code: `VITCHA-${randomBytes(12).toString('hex').toUpperCase()}`, role: req.body.role, prefilledAlias: clean(req.body.prefilledAlias), isUsed: false, createdAt: now(), createdBy: req.user.alias };
    db.invites.unshift(invite); save(db); res.status(201).json({ success: true, invite });
  });
  app.delete('/api/invites/:id', (req, res) => {
    requireAdmin(req); const db = read(); db.invites = db.invites.filter(i => i.id !== req.params.id); save(db); res.json({ success: true });
  });
  app.post('/api/notifications', (req, res) => {
    requireFounder(req); const db = read();
    const n = { ...pick(req.body, ['id', 'title', 'message', 'type', 'targetId']), actorId: req.user.id, actorAlias: req.user.alias, avatar: req.user.avatar, timestamp: now(), read: false, readBy: [req.user.id], clearedBy: [] };
    if (!clean(n.id) || !clean(n.title) || !clean(n.message)) fail(400, 'ข้อมูลแจ้งเตือนไม่ครบ');
    if (!(db.notifications || []).some(x => x.id === n.id)) { db.notifications = [n, ...(db.notifications || [])].slice(0, 80); save(db); }
    res.json({ success: true });
  });
  app.post('/api/notifications/read', (req, res) => {
    const db = read();
    const { id, all } = req.body || {};
    let changed = false;
    for (const n of db.notifications || []) {
      if (all || n.id === id) {
        n.readBy ||= [];
        if (!n.readBy.includes(req.user.id)) {
          n.readBy.push(req.user.id);
          changed = true;
        }
      }
    }
    if (changed) save(db);
    res.json({ success: true });
  });
  app.post('/api/notifications/clear', (req, res) => {
    const db = read();
    const { id, all } = req.body || {};
    let changed = false;
    for (const n of db.notifications || []) {
      if (all || n.id === id) {
        n.clearedBy ||= [];
        if (!n.clearedBy.includes(req.user.id)) {
          n.clearedBy.push(req.user.id);
          changed = true;
        }
      }
    }
    if (changed) save(db);
    res.json({ success: true });
  });
  app.post('/api/sync', (_req, _res) => fail(410, 'ปิดการเขียนทับฐานข้อมูลจากเครื่องผู้ใช้แล้ว'));
  app.post('/api/system/samples', (req, res) => {
    requireFounder(req); const db = read();
    const { operationId, snapshot } = req.body;
    if (!clean(operationId)) fail(400, 'Missing operation ID');
    if ((db.sampleOperations || []).includes(operationId)) return res.json({ success: true });
    expectRevision(db, req.body.revision);
    if (!snapshot || !Array.isArray(snapshot.suppliers) || !Array.isArray(snapshot.drinkStores) || snapshot.suppliers.length + snapshot.drinkStores.length > 100) fail(400, 'ข้อมูลตัวอย่างไม่ถูกต้อง');
    const collections = ['suppliers', 'drinkStores', ...(Array.isArray(snapshot.locations) ? ['locations'] : [])];
    for (const collection of collections) {
      const fields = collection === 'suppliers' ? SUPPLIER : collection === 'drinkStores' ? STORE : LOCATION;
      const existingIds = new Set((db[collection] || []).map(x => x.id));
      const additions = (snapshot[collection] || []).map(source => {
        const nextId = clean(source.id) && !existingIds.has(clean(source.id)) ? clean(source.id) : `demo-${randomUUID()}`;
        existingIds.add(nextId);
        const record = {
          ...pick(source, [...fields, ...HANDOFF]),
          id: nextId,
          type: collection === 'suppliers' ? 'supplier' : collection === 'drinkStores' ? 'drink_store' : 'location',
          creator: source.creator?.id ? source.creator : { ...pick(req.user, ['id', 'name', 'alias', 'avatar']), timestamp: now() },
          reviewerNotes: Array.isArray(source.reviewerNotes) ? source.reviewerNotes : [],
          likes: Array.isArray(source.likes) ? source.likes : [],
          viewedBy: Array.isArray(source.viewedBy) ? source.viewedBy : [],
          history: Array.isArray(source.history) ? source.history : [],
          revision: 1,
          updatedAt: source.updatedAt || now(),
        };
        validateRecord(record, collection); return record;
      });
      db[collection] = [...additions, ...(db[collection] || [])];
    }
    if (snapshot.productWorkspace && typeof snapshot.productWorkspace === 'object') {
      db.productWorkspace = snapshot.productWorkspace;
    }
    if (Array.isArray(snapshot.notifications)) {
      db.notifications = [...snapshot.notifications, ...(db.notifications || [])].slice(0, 80);
    }
    db.sampleOperations = [...(db.sampleOperations || []), operationId].slice(-100);
    save(db); res.json({ success: true });
  });
  app.post('/api/system/clear', (req, res) => {
    requireFounder(req); const db = read(); expectRevision(db, req.body.revision);
    if (req.body.confirm !== 'CLEAR_RECORDS') fail(400, 'กรุณายืนยันการล้างรายการ');
    db.suppliers = []; db.drinkStores = []; db.locations = []; db.productWorkspace = {}; db.notifications = []; save(db); res.json({ success: true });
  });
  app.post('/api/system/import', (req, res) => {
    requireFounder(req); const db = read(); expectRevision(db, req.body.revision);
    const snapshot = req.body.snapshot;
    if (!snapshot || !Array.isArray(snapshot.suppliers) || !Array.isArray(snapshot.drinkStores)) fail(400, 'ไฟล์สำรองไม่ถูกต้อง');
    const importCollections = ['suppliers', 'drinkStores', ...(Array.isArray(snapshot.locations) ? ['locations'] : [])];
    for (const collection of importCollections) {
      const ids = new Set();
      for (const record of (snapshot[collection] || [])) {
        if (!clean(record.id) || ids.has(record.id) || !record.creator?.id || !Array.isArray(record.history) || !Array.isArray(record.reviewerNotes)) fail(400, 'ข้อมูลรายการในไฟล์ไม่ครบหรือมีรหัสซ้ำ');
        ids.add(record.id); validateRecord(record, collection);
        const previous = (db[collection] || []).find(x => x.id === record.id);
        record.revision = Math.max(revision(previous || {}), revision(record)) + 1;
        record.updatedAt = now();
      }
      db[collection] = snapshot[collection];
    }
    // Import only records. Never restore old membership or permissions from a client.
    save(db); res.json({ success: true });
  });
  app.post('/api/settings', (req, res) => {
    requireAdmin(req); const db = read();
    // Compare the settings snapshot only; unrelated views/comments do not conflict.
    if (JSON.stringify(req.body.previous) !== JSON.stringify(pick(db, ['categories', 'storeCategories', 'quickTagsList', 'quickMessages']))) fail(409, 'การตั้งค่าถูกแก้ไขแล้ว กรุณาลองใหม่');
    const next = pick(req.body.values || {}, ['categories', 'storeCategories', 'quickTagsList', 'quickMessages']);
    for (const [key, value] of Object.entries(next)) {
      if (!Array.isArray(value) || value.length > 500) fail(400, 'การตั้งค่าไม่ถูกต้อง');
      if (key !== 'quickMessages' && value.some(x => typeof x !== 'string' || !x.trim() || x.length > 200)) fail(400, 'การตั้งค่าไม่ถูกต้อง');
      if (key === 'quickMessages' && value.some(x => !x || !clean(x.id) || !clean(x.title) || !clean(x.text))) fail(400, 'ข้อความด่วนไม่ครบ');
    }
    Object.assign(db, next); save(db); res.json({ success: true });
  });
  app.post('/api/upload', async (req, res) => {
    requireWriter(req);
    const { base64, mimeType } = req.body;
    const types = { 'video/mp4': '.mp4', 'video/quicktime': '.mov', 'video/webm': '.webm', 'audio/webm': '.webm', 'audio/mp4': '.m4a', 'audio/mpeg': '.mp3', 'audio/wav': '.wav', 'audio/x-wav': '.wav', 'audio/ogg': '.ogg', 'audio/aac': '.aac', 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' };
    if (!types[mimeType] || typeof base64 !== 'string' || !base64.startsWith(`data:${mimeType};base64,`)) fail(400, 'ชนิดไฟล์ไม่รองรับ');
    const bytes = Buffer.from(base64.split(',')[1], 'base64');
    if (!bytes.length || bytes.length > 50 * 1024 * 1024) fail(413, 'ไฟล์ต้องไม่เกิน 50 MB');
    const filename = `${randomBytes(24).toString('hex')}${types[mimeType]}`;
    if (mediaStorage) {
      const url = await mediaStorage.upload({ filename, bytes, mimeType });
      res.status(201).json({ success: true, url });
    } else {
      fs.writeFileSync(path.join(uploads, filename), bytes, { flag: 'wx' });
      res.status(201).json({ success: true, url: `/uploads/${filename}` });
    }
  });

  app.post('/api/drive/session', async (req, res) => {
    requireWriter(req);
    const { filename, mimeType, fileSize, recordType, recordId, recordTitle } = req.body || {};
    if (!filename || !mimeType || typeof fileSize !== 'number' || fileSize <= 0) {
      fail(400, 'ข้อมูลไฟล์ไม่ถูกต้อง');
    }
    const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB ceiling
    if (fileSize > MAX_FILE_SIZE) fail(413, 'ไฟล์ต้องไม่เกิน 100 MB');
    if (mediaStorage?.createDirectUploadSession) {
      try {
        const session = await mediaStorage.createDirectUploadSession({
          filename,
          mimeType,
          fileSize,
          recordType: recordType || 'misc',
          recordId: recordId || 'general',
          recordTitle: recordTitle || '',
        });
        if (session.directAvailable) {
          return res.json({ success: true, ...session });
        }
      } catch (err) {
        console.warn('Google Drive direct upload session failed, falling back:', err.message);
      }
    }
    res.json({ success: true, directAvailable: false, maxFallbackSize: 50 * 1024 * 1024 });
  });

  app.post('/api/drive/complete', async (req, res) => {
    requireWriter(req);
    const { fileId, folderId, recordId, filename, mimeType, fileSize, md5Checksum } = req.body || {};
    if (!fileId) fail(400, 'Missing fileId');
    if (mediaStorage?.completeDirectUpload) {
      const result = await mediaStorage.completeDirectUpload({
        fileId,
        folderId,
        recordId,
        filename,
        mimeType,
        fileSize,
        md5Checksum,
      });
      return res.json({ success: true, ...result });
    }
    fail(500, 'Drive completion handler not available');
  });

  app.get('/api/drive/status', async (req, res) => {
    requireAdmin(req);
    if (mediaStorage?.getDriveStatus) {
      const status = await mediaStorage.getDriveStatus();
      return res.json(status);
    }
    res.json({ configured: false, connected: false, folderId: '1OXmOSXAA7py0ixs6vT3EBjndZCvpkDT1', message: 'Google Drive integration is in local/fallback mode' });
  });

  app.post('/api/drive/config', async (req, res) => {
    requireFounder(req);
    const { clientId, clientSecret, refreshToken, folderId } = req.body || {};
    if (!clean(clientId) || !clean(clientSecret) || !clean(refreshToken)) {
      fail(400, 'กรุณากรอก Client ID, Client Secret และ Refresh Token ให้ครบถ้วน');
    }
    if (mediaStorage?.configureDrive) {
      try {
        const status = await mediaStorage.configureDrive({ clientId, clientSecret, refreshToken, folderId });
        return res.json({ success: true, ...status });
      } catch (err) {
        fail(400, err.message || 'เชื่อมต่อ Google Drive ไม่สำเร็จ');
      }
    }
    fail(503, 'เซิร์ฟเวอร์นี้ไม่ได้เปิดโหมด Cloud Media Storage');
  });
  // Unpredictable media URLs support native video range requests. Never accept HTML/SVG.
  if (mediaStorage?.serve) app.get('/media/:id', mediaStorage.serve);
  app.use('/uploads', express.static(uploads, { dotfiles: 'deny', setHeaders: res => { res.set('X-Content-Type-Options', 'nosniff'); res.set('Content-Security-Policy', "default-src 'none'; sandbox"); } }));
  app.use('/api', (_req, res) => res.status(404).json({ error: 'Unknown endpoint' }));
  app.use((err, _req, res, _next) => {
    const status = err.status || 500;
    if (status >= 500) console.error('Request failed:', err.message);
    res.status(status).json({ error: status >= 500 ? 'บันทึกไม่สำเร็จ กรุณาตรวจสอบการเชื่อมต่อแล้วลองใหม่' : err.message });
  });
  return app;
}
