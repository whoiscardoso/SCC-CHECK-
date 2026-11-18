// Service worker do app SCC Check: abre mesmo sem internet e sempre busca a versão mais nova quando online.
const CACHE="scc-check-v2";
const SHELL=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request,u=new URL(r.url);
  // Só arquivos do próprio app. Supabase, fontes e qualquer outro site passam direto (dados de tickets nunca ficam em cache).
  if(r.method!=="GET"||u.origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c))}return res}).catch(()=>caches.match(r).then(h=>h||(r.mode==="navigate"?caches.match("./index.html"):undefined))));
});
