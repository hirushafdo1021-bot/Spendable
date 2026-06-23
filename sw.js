const CACHE='perch-cal-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>self.clients.claim());
self.addEventListener('fetch',e=>{
  e.respondWith(
    caches.open(CACHE).then(c=>
      c.match(e.request).then(hit=>
        hit || fetch(e.request).then(resp=>{ try{c.put(e.request,resp.clone());}catch(_){} return resp; }).catch(()=>hit)
      )
    )
  );
});