const cacheName = "symphony-cache-v1";
const assetsToCache = [
  "/symphony/study/",
  "/symphony/study/icon.png",
  "/symphony/study/",
  "/symphony/study/manifest.json",
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
