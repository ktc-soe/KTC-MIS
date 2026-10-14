const CACHE_NAME = 'kibidula-ktc-v3';
const APP_SHELL = ['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png','./icons/favicon.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', event => { if (event.request.method !== 'GET' || event.request.url.includes('script.google.com')) return; event.respondWith(fetch(event.request).then(response => { const copy=response.clone(); caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy)); return response; }).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('./index.html')))); });

self.addEventListener('push', event => {
  let data={title:'Kibidula KTC',body:'New notification',tag:'ktc'};
  try{if(event.data)data=event.data.json();}catch(e){}
  event.waitUntil(self.registration.showNotification(data.title||'Kibidula KTC',{body:data.body||data.message||'',tag:data.tag||'ktc',icon:'./icons/icon-192.png',badge:'./icons/favicon.png',data:{url:'./'}}));
});
self.addEventListener('notificationclick', event => { event.notification.close(); event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const c of list){if('focus' in c)return c.focus()}return clients.openWindow(event.notification.data?.url||'./')})); });
