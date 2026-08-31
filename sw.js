const CACHE_NAME = 'unisync-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil( 
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Always fetch fresh status updates from Blynk REST API directly
  if (event.request.url.includes('blynk.cloud')) {
    event.respondWith(fetch(event.request));
  } else {
    // Serve cached assets for UI speed
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
