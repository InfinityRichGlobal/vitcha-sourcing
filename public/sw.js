// Cache the application shell only. Team data and uploads stay on the server.
const CACHE_NAME = 'vitcha-sourcing-v21';
const STATIC_ASSETS = ['./', './index.html', './manifest.json', './logo.jpg'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith('vitcha-sourcing-') && key !== CACHE_NAME) await caches.delete(key);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || /\/(api|uploads|media)\//.test(url.pathname)) return;
  const staticAsset = /\/assets\//.test(url.pathname) || /\/(index\.html|manifest\.json|logo\.jpg)$/.test(url.pathname);
  if (!staticAsset && event.request.mode !== 'navigate') return;
  event.respondWith((async () => {
    try {
      const response = await fetch(event.request, { cache: 'no-store' });
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(() => {}));
      }
      return response;
    } catch {
      return await caches.match(event.request) || (event.request.mode === 'navigate' ? await caches.match('./index.html') : null) || Response.error();
    }
  })());
});

self.addEventListener('push', event => {
  let payload = {};
  try { payload = event.data?.json() || {}; } catch {}
  event.waitUntil(self.registration.showNotification(payload.title || 'VITCHA Sourcing', {
    body: payload.body || 'มีข้อมูลใหม่จากทีม',
    icon: new URL('./logo.jpg', self.registration.scope).href,
    badge: new URL('./logo.jpg', self.registration.scope).href,
    tag: payload.id || 'vitcha-update',
    data: { targetId: payload.targetId, type: payload.type },
  }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil((async () => {
    const url = new URL(self.registration.scope);
    const { targetId, type } = event.notification.data || {};
    if (targetId) { url.searchParams.set('notificationTarget', targetId); url.searchParams.set('notificationType', type || ''); }
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const client = clients.find(c => c.url.startsWith(self.registration.scope));
    if (client) { await client.navigate(url.href); return client.focus(); }
    return self.clients.openWindow(url.href);
  })());
});
