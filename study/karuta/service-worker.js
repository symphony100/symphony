const cacheName = "symphony-cache-v1";
const assetsToCache = [
  "/symphony/study/karuta/",
  "/symphony/study/karuta/use/",
  "/symphony/study/karuta/cards.json",
  "/symphony/study/karuta/manifest.json",
  "/symphony/study/karuta/tatami.png",
  "/symphony/study/karuta/icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
