/* gointervals service worker. Cache-first for hashed assets, network-first for pages.
   Every timer route is precached so it works offline even if never visited. */
/* __BUILD_VERSION__ is replaced at build time by scripts/stamp-sw.mjs so every
   deploy gets a fresh cache and the previous one is deleted on activate. */
const VERSION = '__BUILD_VERSION__';
const PRECACHE = [
  '/',
  '/interval',
  '/meditation',
  '/tabata',
  '/emom',
  '/pomodoro',
  '/about',
  '/404',
  '/manifest.webmanifest',
  '/fonts/dm-sans-latin.woff2',
  '/fonts/azeret-mono-latin.woff2',
  '/favicon.svg',
];

/* An update never interrupts a session: this worker waits until the page says the
   timer is idle (Base.astro posts SKIP_WAITING then) or until every tab has closed. */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((c) => Promise.allSettled(PRECACHE.map((u) => c.add(u)))),
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
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
