// Service worker: lets the Grief Calendar open even without internet.
//
// How it works:
//   - Pages (HTML) try the internet first, so updates show up straight away.
//     If there's no internet, the saved copy is used instead.
//   - Everything else (code, fonts, paintings, icons) is saved the first time it loads,
//     then served from the saved copy, which makes the app fast and work offline.
//
// Change CACHE_NAME (e.g. to v2) whenever you want everyone to get a fresh copy of everything.
const CACHE_NAME = 'grief-calendar-v1';

// Take over straight away when a new version is installed
self.addEventListener('install', () => self.skipWaiting());

// Delete old caches from earlier versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Pages: internet first, saved copy if offline
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((hit) => hit || caches.match('./')))
    );
    return;
  }

  // Everything else: saved copy first, internet if we don't have it yet
  event.respondWith(
    caches.match(request).then((hit) => {
      if (hit) return hit;
      return fetch(request).then((response) => {
        // Only save good responses (this also covers Google Fonts, which come back as "opaque")
        if (response.ok || response.type === 'opaque') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
