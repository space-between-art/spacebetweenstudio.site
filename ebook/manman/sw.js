// Service Worker for 《慢慢成為自己的品牌》
// 離線閱讀功能

const CACHE_NAME = 'manman-ebook-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './images/ch00-cover.png',
  './images/ch01-prologue.png',
  './images/ch02-fog.png',
  './images/ch04-studio.png',
  './images/ch06-guangguang.png',
  './images/ch07-shadow.png',
  './images/ch08-mirror.png',
  './images/ch09-crack.png',
  './images/ch10-naming.png',
  './images/ch11-connection.png',
  './images/ch12-breathe.png',
  './images/ch13-kintsugi.png',
  './images/ch14-afterword.png'
];

// Install event - 緩存所有資源
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker for offline reading...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching all assets for offline use');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        console.log('[SW] All assets cached successfully');
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error('[SW] Failed to cache assets:', err);
      })
  );
});

// Activate event - 清理舊緩存
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Service worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - 優先使用緩存，網路失敗時回退到緩存
self.addEventListener('fetch', (event) => {
  // 只處理 GET 請求
  if (event.request.method !== 'GET') return;
  
  // 跳過非同源請求（除了字體）
  const url = new URL(event.request.url);
  if (url.origin !== location.origin && 
      !url.hostname.includes('fonts.googleapis.com') && 
      !url.hostname.includes('fonts.gstatic.com') &&
      !url.hostname.includes('pixabay.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // 如果有緩存，直接返回
        if (cachedResponse) {
          return cachedResponse;
        }

        // 沒有緩存，從網路獲取
        return fetch(event.request)
          .then((response) => {
            // 檢查是否為有效響應
            if (!response || response.status !== 200) {
              return response;
            }

            // 複製響應以便緩存
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // 網路失敗，嘗試返回離線頁面
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
            return new Response('離線中，無法載入此資源', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// 處理來自主線程的消息
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
