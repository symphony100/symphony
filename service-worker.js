const cacheName = "symphony-cache-v1";
const assetsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "https://symphony100.github.io/symphony/symphony.png"
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
