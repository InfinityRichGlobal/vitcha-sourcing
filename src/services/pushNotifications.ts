import { requestJson, sendJson, getSessionToken } from './api';
let registrationGeneration = 0;
function supported() {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}
async function registration() {
  await navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
  let timer: ReturnType<typeof setTimeout>;
  try {
    return await Promise.race([navigator.serviceWorker.ready, new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error('ยังเปิดระบบแจ้งเตือนไม่สำเร็จ กรุณาโหลดหน้าใหม่')), 15000); })]);
  } finally { clearTimeout(timer!); }
}
export async function enablePushNotifications(askPermission = true) {
  const generation = registrationGeneration, token = getSessionToken();
  const assertCurrent = () => { if (generation !== registrationGeneration || token !== getSessionToken()) throw new Error('บัญชีเปลี่ยนแล้ว กรุณาเปิดแจ้งเตือนใหม่'); };
  if (!supported()) throw new Error('บน iPhone ให้เพิ่มแอปไปยังหน้าจอโฮม แล้วเปิดจากไอคอนแอป (iOS 16.4 ขึ้นไป)');
  // Request permission synchronously from the user's tap, before any network work.
  const permission = askPermission ? await Notification.requestPermission() : Notification.permission;
  if (permission !== 'granted') throw new Error('ยังไม่ได้อนุญาตแจ้งเตือน กรุณาเปิดสิทธิ์ในตั้งค่าของอุปกรณ์');
  const reg = await registration();
  const { publicKey } = await requestJson('/api/push/config');
  assertCurrent();
  const key = Uint8Array.from(atob(publicKey.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
  let subscription = await reg.pushManager.getSubscription();
  const existingKey = subscription?.options.applicationServerKey;
  if (subscription && existingKey && Array.from(new Uint8Array(existingKey)).join() !== Array.from(key).join()) { await subscription.unsubscribe(); subscription = null; }
  subscription ||= await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: key });
  assertCurrent();
  await sendJson('/api/push/subscribe', { subscription: subscription.toJSON() });
  return subscription;
}
export async function syncPushNotifications() {
  if (!supported() || Notification.permission !== 'granted') return;
  await enablePushNotifications(false);
}
export async function disablePushNotifications() {
  registrationGeneration++;
  if (!supported()) return;
  const reg = await navigator.serviceWorker.getRegistration();
  const subscription = await reg?.pushManager.getSubscription();
  if (!subscription) return;
  await sendJson('/api/push/unsubscribe', { endpoint: subscription.endpoint });
  await subscription.unsubscribe();
}
export async function testPushNotification() {
  const subscription = await enablePushNotifications();
  return sendJson('/api/push/test', { endpoint: subscription.endpoint });
}
