const CACHE_NAME="jairrestaura-neuro-offline-v2";
const CORE=["/","/index.html","/manifest.webmanifest"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE)));self.skipWaiting()});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith("jairrestaura-neuro-")&&key!==CACHE_NAME).map(key=>caches.delete(key)))));self.clients.claim()});
self.addEventListener("fetch",event=>{
 const request=event.request;if(request.method!=="GET")return;
 const url=new URL(request.url);if(url.origin!==self.location.origin)return;
 if(request.mode==="navigate"){event.respondWith(fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put("/index.html",copy))}return response}).catch(()=>caches.match("/index.html").then(hit=>hit||caches.match("/"))));return}
 event.respondWith(caches.match(request).then(cached=>{if(cached)return cached;return fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy))}return response}).catch(()=>new Response("Recurso no disponible sin conexión",{status:503,headers:{"Content-Type":"text/plain; charset=utf-8"}}))}))
});