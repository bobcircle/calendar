const CACHE_NAME = '3501-test-v5'; // 升級到 v5
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-512.png'
  'https://bobcircle.github.io/calendar/',
  'https://bobcircle.github.io/calendar/index.html' // 確保絕對路徑也被快取
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
