const CACHE = 'prov910-elegant-motion-finishes-v6';
const FILES = [
  './', './index.html', './sobre-mi.html', './productos.html', './producto.html', './contacto.html', './blog.html',
  './styles.css', './app.js', './manifest.webmanifest',
  './assets/icon.svg', './assets/logo-prov910-principal.png', './assets/logo-prov910-inverso.png',
  './assets/logo-prov910-white.png', './assets/anillo-referencia.png', './assets/guia-prov910.pdf',
  './assets/ring-05-templar-cross.jpg', './assets/ring-06-classic-cross.jpg',
  './assets/ring-07-crown-thorns.jpg', './assets/ring-08-ichthys.jpg',
  './assets/ring-09-braided-cross.jpg', './assets/ring-10-alpha-omega.jpg',
  './assets/ring-11-lords-prayer.jpg', './assets/ring-12-hammered-gold-cross.jpg',
  './assets/ring-13-roman-cross.jpg', './assets/ring-14-templar-shield.jpg',
  './assets/ring-15-carbon-cross.jpg',
  './anillo-cruz-clasico.html',
  './anillo-ichthys.html',
  './anillo-cruz-dorada.html',
  './anillo-sello-vintage.html',
  './anillo-cruz-jerusalen.html',
  './anillo-cruz-ancha.html',
  './anillo-corona-espinas.html',
  './anillo-ichthys-plata.html',
  './anillo-cruz-trenzada.html',
  './anillo-alfa-omega.html',
  './anillo-padre-nuestro.html',
  './anillo-cruz-martillada.html',
  './anillo-iv-plus.html',
  './anillo-escudo-templario.html',
  './anillo-cruz-carbono.html'
];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); }
    return response;
  }).catch(() => event.request.mode === 'navigate' ? caches.match('./index.html') : Promise.reject(new Error('Offline resource unavailable')))));
});
