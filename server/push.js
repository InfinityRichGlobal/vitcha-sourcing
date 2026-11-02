import webpush from 'web-push';
import { createHash } from 'node:crypto';

export const newPushKeys = () => webpush.generateVAPIDKeys();
const fail = (status, message) => { throw Object.assign(new Error(message), { status }); };
export function validSubscription(subscription) {
  try {
    const endpoint = new URL(subscription.endpoint);
    const host = endpoint.hostname;
    const trusted = host === 'web.push.apple.com' || host.endsWith('.push.apple.com') || host === 'fcm.googleapis.com' || host === 'updates.push.services.mozilla.com' || host.endsWith('.notify.windows.com');
    return endpoint.protocol === 'https:' && !endpoint.username && !endpoint.password && !endpoint.port && trusted && subscription.endpoint.length < 4096 && Buffer.from(subscription.keys?.p256dh || '', 'base64url').length === 65 && Buffer.from(subscription.keys?.auth || '', 'base64url').length === 16;
  } catch { return false; }
}
export function createPushDelivery(send = webpush.sendNotification.bind(webpush)) {
  const expired = new Set();
  async function deliver(db, notification, subscriptions) {
    const payload = JSON.stringify({ id: notification.id, title: String(notification.title || 'VITCHA Sourcing').slice(0, 120), body: String(notification.message || '').slice(0, 400), targetId: notification.targetId, type: notification.type });
    const results = await Promise.all(subscriptions.filter(s => !expired.has(s.endpoint)).map(async subscription => {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          await send(subscription, payload, { vapidDetails: { subject: process.env.VAPID_SUBJECT || 'https://vitcha-sourcing-fxjw.onrender.com', ...db.pushVapid }, TTL: 86400, urgency: 'high', timeout: 15000 });
          return true;
        } catch (error) {
          if ([404, 410].includes(error.statusCode)) { expired.add(subscription.endpoint); return false; }
          if (attempt === 1 || (error.statusCode && error.statusCode < 500 && error.statusCode !== 429)) {
            console.warn('Web Push delivery failed:', error.statusCode || 'network'); return false;
          }
        }
      }
      return false;
    }));
    return { accepted: results.filter(Boolean).length, failed: results.filter(x => !x).length };
  }
  return {
    expired,
    deliver,
    async broadcast(db, notification) {
      const subscriptions = (db.pushSubscriptions || []).filter(s => s.userId !== notification.actorId && db.users.some(u => u.id === s.userId) && (!notification.forAdminOnly || s.userId === 'user-ice') && !(notification.clearedBy || []).includes(s.userId));
      return deliver(db, notification, subscriptions);
    },
  };
}
export function registerPushRoutes(app, { read, save, delivery }) {
  app.get('/api/push/config', (_req, res) => res.json({ publicKey: read().pushVapid.publicKey }));
  app.post('/api/push/subscribe', (req, res) => {
    if (req.session.simulatedId) fail(403, 'กรุณาใช้บัญชีจริงเพื่อเปิดแจ้งเตือน');
    const sub = req.body?.subscription;
    if (!validSubscription(sub)) fail(400, 'ข้อมูลการแจ้งเตือนไม่ถูกต้อง');
    const db = read();
    db.pushSubscriptions = (db.pushSubscriptions || []).filter(s => s.endpoint !== sub.endpoint && !delivery.expired.has(s.endpoint));
    if (db.pushSubscriptions.filter(s => s.userId === req.user.id).length >= 10) fail(400, 'ลงทะเบียนอุปกรณ์ครบ 10 เครื่องแล้ว');
    db.pushSubscriptions.push({ endpoint: sub.endpoint, keys: { auth: sub.keys.auth, p256dh: sub.keys.p256dh }, userId: req.user.id, sessionKey: createHash('sha256').update(req.token).digest('hex'), updatedAt: new Date().toISOString() });
    delivery.expired.delete(sub.endpoint);
    save(db); res.json({ success: true });
  });
  app.post('/api/push/unsubscribe', (req, res) => {
    const db = read(); db.pushSubscriptions = (db.pushSubscriptions || []).filter(s => s.userId !== req.user.id || s.endpoint !== req.body?.endpoint);
    save(db); res.json({ success: true });
  });
  const lastTest = new Map();
  app.post('/api/push/test', async (req, res) => {
    if (Date.now() - (lastTest.get(req.user.id) || 0) < 10000) fail(429, 'กรุณารอ 10 วินาทีก่อนทดสอบอีกครั้ง');
    const db = read(); const subscriptions = (db.pushSubscriptions || []).filter(s => s.userId === req.user.id && s.endpoint === req.body?.endpoint);
    if (!subscriptions.length) fail(400, 'กรุณาเปิดรับแจ้งเตือนบนเครื่องนี้ก่อน');
    lastTest.set(req.user.id, Date.now());
    const result = await delivery.deliver(db, { id: `test-${Date.now()}`, title: 'ทดสอบแจ้งเตือน VITCHA', message: 'การแจ้งเตือนนี้ส่งจากเซิร์ฟเวอร์ถึงมือถือของคุณ' }, subscriptions);
    if (!result.accepted) fail(502, 'บริการ Push ยังไม่รับข้อความ กรุณาเปิดรับแจ้งเตือนใหม่แล้วลองอีกครั้ง');
    res.json(result);
  });
}
