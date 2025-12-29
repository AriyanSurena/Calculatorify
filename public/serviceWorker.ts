let cacheVersion = 0.1;

let currentCaches = {
    fonts: "font-cache-v-" + cacheVersion,
    pages: "pages-cache-v-" + cacheVersion,
};

self.addEventListener("install", event => {
    console.log("Service Worker Installed:", event);
    
    // استفاده از event.waitUntil برای اطمینان از نصب
    event.waitUntil(
        Promise.all([
            caches.open(currentCaches.fonts).then(cache => {
                return cache.addAll(["/assets/fonts/"]);
            }),
            caches.open(currentCaches.pages).then(cache => {
                return cache.addAll(["/", "/index.html"]);
            })
        ]).catch(error => {
            console.error("Error during installation:", error);
        })
    );
});

self.addEventListener("activate", event => {
    console.log("Service Worker activated:", event);
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // حذف کش‌های قدیمی
                    if (!Object.values(currentCaches).includes(cacheName)) {
                        console.log("Deleting old cache:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", event => {
    console.log("Service Worker fetch:", event.request.url);
    
    // فقط GET requests را هندل کن
    if (event.request.method !== 'GET') return;
    
    event.respondWith(
        (async () => {
            const cacheNames = Object.values(currentCaches);
            
            // اول در کش‌ها جستجو کن
            for (const cacheName of cacheNames) {
                try {
                    const cache = await caches.open(cacheName);
                    const response = await cache.match(event.request);
                    
                    if (response) {
                        console.log("Found in cache:", cacheName);
                        return response;
                    }
                } catch (error) {
                    console.error("Error accessing cache:", cacheName, error);
                }
            }
            
            // اگر در کش پیدا نشد، از شبکه بگیر
            console.log("Not in cache, fetching from network:", event.request.url);
            try {
                const networkResponse = await fetch(event.request);
                
                // برای درخواست‌های بعدی در کش ذخیره کن
                if (networkResponse.ok) {
                    const cache = await caches.open(currentCaches.pages);
                    cache.put(event.request, networkResponse.clone());
                }
                
                return networkResponse;
            } catch (error) {
                console.error("Fetch failed:", error);
                // می‌توانی یک fallback برگردانی
                return new Response('Network error', {
                    status: 408,
                    headers: {'Content-Type': 'text/plain'}
                });
            }
        })()
    );
});