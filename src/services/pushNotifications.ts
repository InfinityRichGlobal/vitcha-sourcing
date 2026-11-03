import { requestJson, sendJson, getSessionToken } from './api';
let registrationGeneration = 0;
type Progress = (message: string) => void;
function supported() {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}
async function bounded<T>(promise: Promise<T>, message: string, timeoutMs = 20000): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  try {
    return await Promise.race([promise, new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error(message)), timeoutMs); })]);
  } finally { clearTimeout(timer!); }
}
async function registration() {
  await bounded(navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }), 'เตรียมระบบแจ้งเตือนนานเกินไป กรุณาเปิดแอปใหม่แล้วลองอีกครั้ง');
  return bounded(navigator.serviceWorker.ready, 'ยังเปิดระบบแจ้งเตือนไม่สำเร็จ กรุณาเปิดแอปใหม่แล้วลองอีกครั้ง');
}
export async function enablePushNotifications(askPermission = true, onProgress: Progress = () => {}) {
  const generation = registrationGeneration, token = getSessionToken();
  const assertCurrent = () => { if (generation !== registrationGeneration || token !== getSessionToken()) throw new Error('บัญชีเปลี่ยนแล้ว กรุณาเปิดแจ้งเตือนใหม่'); };
  if (!supported()) throw new Error('บน iPhone ให้เพิ่มแอปไปยังหน้าจอโฮม แล้วเปิดจากไอคอนแอป (iOS 16.4 ขึ้นไป)');
  // Keep the permission request in the tap handler; do not prompt a granted device again.
  let permission = Notification.permission;
  if (askPermission && permission !== 'granted') {
    onProgress('รออนุญาตแจ้งเตือนบนเครื่อง…');
    permission = await bounded(Notification.requestPermission(), 'ยังไม่ได้รับคำตอบเรื่องสิทธิ์แจ้งเตือน กรุณาอนุญาตบนเครื่องแล้วลองใหม่', 30000);
  }
  if (permission !== 'granted') throw new Error('ยังไม่ได้อนุญาตแจ้งเตือน กรุณาเปิดสิทธิ์ในตั้งค่าของอุปกรณ์');
  onProgress('กำลังเตรียมระบบแจ้งเตือน…');
  const reg = await registration();
  const { publicKey } = await requestJson('/api/push/config', {}, 15000);
  assertCurrent();
  const key = Uint8Array.from(atob(publicKey.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
  onProgress('กำลังเชื่อมต่อบริการแจ้งเตือนของเครื่อง…');
  const stalled = 'บริการแจ้งเตือนของเครื่องยังไม่ตอบกลับ กรุณาตรวจการเชื่อมต่อ แล้วเปิดแอปจากหน้าจอโฮมเพื่อลองอีกครั้ง';
  let subscription = await bounded(reg.pushManager.getSubscription(), stalled);
  const existingKey = subscription?.options.applicationServerKey;
  if (subscription && existingKey && Array.from(new Uint8Array(existingKey)).join() !== Array.from(key).join()) { await bounded(subscription.unsubscribe(), stalled); subscription = null; }
  subscription ||= await bounded(reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: key }), stalled);
  assertCurrent();
  onProgress('กำลังลงทะเบียนเครื่องกับเซิร์ฟเวอร์…');
  await requestJson('/api/push/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subscription: subscription.toJSON() }) }, 15000);
  return subscription;
}
export async function syncPushNotifications() {
  if (!supported() || Notification.permission !== 'granted') return;
  await enablePushNotifications(false);
}
export async function disablePushNotifications() {
  registrationGeneration++;
  if (!supported()) return;
  const reg = await bounded(navigator.serviceWorker.getRegistration(), 'ยังปิดแจ้งเตือนไม่สำเร็จ');
  const subscription = reg ? await bounded(reg.pushManager.getSubscription(), 'ยังปิดแจ้งเตือนไม่สำเร็จ') : null;
  if (!subscription) return;
  await sendJson('/api/push/unsubscribe', { endpoint: subscription.endpoint });
  await bounded(subscription.unsubscribe(), 'ยังปิดแจ้งเตือนไม่สำเร็จ');
}
export async function testPushNotification(onProgress: Progress = () => {}) {
  const subscription = await enablePushNotifications(true, onProgress);
  onProgress('กำลังส่งข้อความจากเซิร์ฟเวอร์เข้ามือถือ…');
  return requestJson('/api/push/test', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ endpoint: subscription.endpoint }) }, 45000);
}
export async function dismissDeviceNotifications(ids: string[]) {
  if (!('serviceWorker' in navigator)) return;
  try {
    const reg = await bounded(navigator.serviceWorker.getRegistration(), 'timeout', 2000);
    if (!reg?.getNotifications) return;
    const notifications = await bounded(reg.getNotifications(), 'timeout', 2000);
    for (const notification of notifications) if (ids.includes(notification.tag)) notification.close();
  } catch { /* Inbox read state does not depend on OS notification availability. */ }
}
