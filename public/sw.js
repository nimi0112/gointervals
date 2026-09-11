/* Go Intervals service worker. Cache-first for hashed assets, network-first for pages.
   Bump VERSION to invalidate. Every timer route is precached so it works offline even if never visited. */
const VERSION = 'gi-v1';
const PRECACHE = [
  '/',
  '/interval',
  '/timer',
  '/stopwatch',
  '/tabata',
  '/emom',
  '/pomodoro',
  '/meditation',
  '/about',
  '/404',
  '/manifest.webmanifest',
  '/fonts/bricolage-latin.woff2',
  '/fonts/jetbrains-mono-latin.woff2',
  '/favicon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(VERSION)
      .then((c) => Promise.allSettled(PRECACHE.map((u) => c.add(u))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Hashed build assets and fonts: cache first, they never change under the same name.
  if (url.pathname.startsWith('/_astro/') || url.pathname.startsWith('/fonts/')) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put(req, copy));
            return res;
          }),
      ),
    );
    return;
  }

  // Pages and everything else: network first, fall back to cache, then to the 404 page.
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok && (req.mode === 'navigate' || url.pathname.startsWith('/og/'))) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then((hit) => hit || (req.mode === 'navigate' ? caches.match('/404') : undefined)),
      ),
  );
});
