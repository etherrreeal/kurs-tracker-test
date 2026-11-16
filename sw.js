/* service worker «курс.» · версия c45f2925d305
   приложение работает без сети. данные пользователя лежат в IndexedDB и этим файлом не затрагиваются:
   при обновлении удаляются только старые кэши файлов программы (kurs-*). */
const V='kurs-c45f2925d305',ASSETS=["./", "./index.html", "./app.js", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ASSETS.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('kurs-')&&k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith(caches.open(V).then(c=>c.match(r,{ignoreSearch:true})).then(hit=>hit||fetch(r).catch(()=>r.mode==='navigate'?caches.match('./index.html'):Response.error())))});
