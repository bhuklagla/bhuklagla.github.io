const ROOT = new URL('./', self.location.href);
const CACHE = 'bhuk-lagla-v2';
const core = ['', 'menu/', 'offline/', 'brand/logo.webp', 'icons/icon-192.png'].map(
  (path) => new URL(path, ROOT).href,
);
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(core)));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith('bhuk-lagla-') && key !== CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const requestUrl = new URL(request.url);
  if (
    request.method !== 'GET' ||
    requestUrl.origin !== ROOT.origin ||
    !requestUrl.pathname.startsWith(ROOT.pathname) ||
    requestUrl.pathname.includes('/insights/')
  )
    return;
  if (request.mode === 'navigate') {
    const clean = new Request(requestUrl.origin + requestUrl.pathname, {
      headers: request.headers,
    });
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            event.waitUntil(caches.open(CACHE).then((cache) => cache.put(clean, copy)));
          }
          return response;
        })
        .catch(
          async () =>
            (await caches.match(clean)) ||
            (await caches.match(new URL('offline/', ROOT).href)) ||
            Response.error(),
        ),
    );
  } else if (/\.(?:webp|png|ico|woff2|css|js)$/.test(requestUrl.pathname)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              event.waitUntil(caches.open(CACHE).then((cache) => cache.put(request, copy)));
            }
            return response;
          }),
      ),
    );
  }
});
