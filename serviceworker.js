const CACHE_NAME = "version-1";
const urlsToCACHE = ["index.html", "offline.html"];
const self = this;

// instaLl serviceWorker
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened Cache");
      return cache.addAll(urlsToCACHE);
    })
  );
});
// Listen for requests
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.requests).then(() => {
      return fetch(e.request).catch(() => caches.match("offline.html"));
    })
  );
});
// Activate serviceWorker
self.addEventListener("activate", (e) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  e.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
