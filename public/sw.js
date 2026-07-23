const CACHE_NAME = "bimbel-sd-v1";
const PRECACHE = [
  "/",
  "/login",
  "/dashboard/siswa",
  "/dashboard/guru",
  "/assets/book-theme.css",
  "/assets/book-engine.js",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        PRECACHE.map((url) =>
          cache.add(url).catch(() => {
            // Shell routes may 302 without session; ignore install failures per URL
          })
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

function shouldRuntimeCache(request, response) {
  if (request.method !== "GET") return false;
  if (!response || response.status !== 200) return false;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;
  if (url.pathname.startsWith("/api/")) return false;
  return (
    url.pathname.startsWith("/buku/") ||
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/icons/")
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return; // network only

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          if (shouldRuntimeCache(request, response)) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          if (request.mode === "navigate" || request.destination === "document") {
            return caches
              .match("/")
              .then((home) => home || new Response("Offline", { status: 503 }));
          }
          return new Response("", { status: 503 });
        });
    })
  );
});
