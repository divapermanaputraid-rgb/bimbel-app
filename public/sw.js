const CACHE_NAME = "bimbel-sd-v2";

// Static only — never precache auth/dashboard HTML (personalized SSR).
const PRECACHE = [
  "/manifest.json",
  "/assets/book-theme.css",
  "/assets/book-engine.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        PRECACHE.map((url) =>
          cache.add(url).catch(() => {
            // Ignore missing asset during install
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

function isStaticAsset(pathname) {
  return (
    pathname.startsWith("/buku/") ||
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/icons/")
  );
}

function shouldRuntimeCache(request, response) {
  if (request.method !== "GET") return false;
  if (!response || response.status !== 200) return false;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;
  if (url.pathname.startsWith("/api/")) return false;
  return isStaticAsset(url.pathname);
}

function isNavigation(request) {
  return request.mode === "navigate" || request.destination === "document";
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return; // network only

  // Documents (login, dashboard, app shells): network-first so sessions stay fresh.
  if (isNavigation(request)) {
    event.respondWith(
      fetch(request)
        .then((response) => response)
        .catch(() =>
          caches
            .match("/manifest.json")
            .then(
              () =>
                new Response(
                  "<!doctype html><meta charset=utf-8><title>Offline</title><p>Offline. Buku yang sudah dibuka masih bisa dibuka dari riwayat/tab.</p>",
                  { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } }
                )
            )
        )
    );
    return;
  }

  // Static books/assets: cache-first after first successful fetch.
  if (!isStaticAsset(url.pathname) && url.pathname !== "/manifest.json") {
    return; // let browser handle other same-origin GETs
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          if (shouldRuntimeCache(request, response) || (url.pathname === "/manifest.json" && response.status === 200)) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => new Response("", { status: 503 }));
    })
  );
});
