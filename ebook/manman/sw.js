var CACHE = 'manman-v1';
var FILES = [
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

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) {
      return c.addAll(FILES);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request).then(function(res) {
        var c = res.clone();
        caches.open(CACHE).then(function(cache) {
          cache.put(e.request, c);
        });
        return res;
      });
    }).catch(function() {
      return caches.match('./index.html');
    })
  );
});
