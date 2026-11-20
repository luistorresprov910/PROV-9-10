const CACHE = 'prov910-reviews-product-linked-v14';
const FILES = [
  './', './index.html', './sobre-mi.html', './productos.html', './producto.html', './contacto.html', './blog.html', './reviews.html',
  './styles.css', './app.js', './manifest.webmanifest',
  './assets/icon.svg', './assets/image-proveedor-pendiente.svg', './assets/logo-prov910-principal.png', './assets/logo-prov910-inverso.png',
  './assets/logo-prov910.png', './assets/logo-prov910-white.png', './assets/prov910-logo-principal.png', './assets/prov910-logo-inverso.png',
  './assets/anillo-referencia.png', './assets/guia-prov910.pdf',
  './assets/catalog/ring-06-classic-cross-pro.jpg', './assets/catalog/ring-12-hammered-gold-cross-pro.jpg', './assets/catalog/ring-14-templar-shield-pro.jpg',
  './assets/catalog/ring-01-reference-pro.jpg', './assets/catalog/ring-01-reference-detalle.jpg',
  './assets/catalog/ring-05-templar-cross-pro.jpg', './assets/catalog/ring-05-templar-cross-detalle.jpg',
  './assets/catalog/ring-06-classic-cross-pro.jpg', './assets/catalog/ring-06-classic-cross-detalle.jpg',
  './assets/catalog/ring-07-crown-thorns-pro.jpg', './assets/catalog/ring-07-crown-thorns-detalle.jpg',
  './assets/catalog/ring-08-ichthys-pro.jpg', './assets/catalog/ring-08-ichthys-detalle.jpg',
  './assets/catalog/ring-09-braided-cross-pro.jpg', './assets/catalog/ring-09-braided-cross-detalle.jpg',
  './assets/catalog/ring-10-alpha-omega-pro.jpg', './assets/catalog/ring-10-alpha-omega-detalle.jpg',
  './assets/catalog/ring-11-lords-prayer-pro.jpg', './assets/catalog/ring-11-lords-prayer-detalle.jpg',
  './assets/catalog/ring-12-hammered-gold-cross-pro.jpg', './assets/catalog/ring-12-hammered-gold-cross-detalle.jpg',
  './assets/catalog/ring-13-roman-cross-pro.jpg', './assets/catalog/ring-13-roman-cross-detalle.jpg',
  './assets/catalog/ring-14-templar-shield-pro.jpg', './assets/catalog/ring-14-templar-shield-detalle.jpg',
  './assets/catalog/ring-15-carbon-cross-pro.jpg', './assets/catalog/ring-15-carbon-cross-detalle.jpg',
  './assets/ring-05-templar-cross.jpg', './assets/ring-06-classic-cross.jpg', './assets/ring-07-crown-thorns.jpg',
  './assets/ring-08-ichthys.jpg', './assets/ring-09-braided-cross.jpg', './assets/ring-10-alpha-omega.jpg',
  './assets/ring-11-lords-prayer.jpg', './assets/ring-12-hammered-gold-cross.jpg', './assets/ring-13-roman-cross.jpg',
  './assets/ring-14-templar-shield.jpg', './assets/ring-15-carbon-cross.jpg',
  './anillo-cruz-clasico.html', './anillo-ichthys.html', './anillo-minimalista.html', './anillo-cruz-dorada.html',
  './anillo-cruz-celta.html', './anillo-sello-vintage.html', './anillo-cruz-jerusalen.html', './anillo-cruz-ancha.html',
  './anillo-corona-espinas.html', './anillo-ichthys-plata.html', './anillo-cruz-trenzada.html', './anillo-alfa-omega.html',
  './anillo-padre-nuestro.html', './anillo-cruz-martillada.html', './anillo-iv-plus.html', './anillo-escudo-templario.html',
  './anillo-cruz-carbono.html'
];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const isAppShell = url.origin === self.location.origin && (event.request.mode === 'navigate' || /\.(?:html|js|css)$/.test(url.pathname));
  if (isAppShell) {
    event.respondWith(fetch(event.request).then(response => {
      if (response && response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
      return response;
    }).catch(() => caches.match(event.request).then(cached => cached || caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response && response.ok && url.origin === self.location.origin) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
    return response;
  })));
});
