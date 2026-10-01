/* HPRCA service-worker cleanup only.
   The current app does not use offline caching. This file removes the old
   HPRCA cache and unregisters itself so it cannot keep serving stale HTML.
   Do not add a fetch handler or cache-first strategy here. */
self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    try {
      const names = await caches.keys();
      await Promise.all(names
        .filter(name => /^hprca[-_]/i.test(name))
        .map(name => caches.delete(name)));
    } finally {
      await self.registration.unregister();
    }
  })());
});
