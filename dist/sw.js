// Cache the application shell only. Team data and uploads stay on the server.
const CACHE_NAME = 'vitcha-sourcing-v20';
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
