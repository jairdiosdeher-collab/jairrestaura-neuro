const CACHE_NAME="jairrestaura-neuro-offline-v3";
const CORE=[
 "/","/index.html","/manifest.webmanifest","/src/main.jsx","/src/styles.css",
 "/images/hero-neuro.svg",
 "/images/areas/comprender.svg","/images/areas/comunicar.svg","/images/areas/aprender.svg",
 "/images/areas/familia.svg","/images/areas/acompanar.svg","/images/areas/bienestar.svg","/images/areas/herramientas.svg",
 "/images/icons/arrows.svg",
 "/images/icons/brain.svg",
 "/images/icons/calendar.svg",
 "/images/icons/communication.svg",
 "/images/icons/compass.svg",
 "/images/icons/family.svg",
 "/images/icons/headphones.svg",
 "/images/icons/health.svg",
 "/images/icons/heart.svg",
 "/images/icons/home.svg",
 "/images/icons/journal.svg",
 "/images/icons/moon.svg",
 "/images/icons/nutrition.svg",
 "/images/icons/people.svg",
 "/images/icons/play.svg",
 "/images/icons/puzzle.svg",
 "/images/icons/scales.svg",
 "/images/icons/school.svg",
 "/images/icons/search.svg",
 "/images/icons/speech.svg",
 "/images/icons/star.svg",
 "/images/icons/support.svg"
];
self.addEventListener("install",event=>{
 event.waitUntil(caches.open(CACHE_NAME).then(async cache=>{
  await Promise.all(CORE.map(async path=>{try{await cache.add(path)}catch(error){console.warn("No se pudo precargar:",path)}}));
 }));
 self.skipWaiting();
});
self.addEventListener("activate",event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith("jairrestaura-neuro-")&&key!==CACHE_NAME).map(key=>caches.delete(key)))));
 self.clients.claim();
});
self.addEventListener("fetch",event=>{
 const request=event.request;
 if(request.method!=="GET")return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin)return;
 if(request.mode==="navigate"){
  event.respondWith(fetch(request).then(response=>{
   if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put("/index.html",copy))}
   return response;
  }).catch(()=>caches.match("/index.html").then(hit=>hit||caches.match("/"))));
  return;
 }
 event.respondWith(caches.match(request).then(cached=>{
  if(cached)return cached;
  return fetch(request).then(response=>{
   if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy))}
   return response;
  }).catch(()=>new Response("Recurso no disponible sin conexión",{status:503,headers:{"Content-Type":"text/plain; charset=utf-8"}}));
 }));
});
