const routes = ['/', '/tu-vi/', '/ngay/tot-xau/', '/phong-thuy/huong-nha/', '/que/kinh-dich/', '/tuoi/vo-chong/', '/calendar/doi-ngay/', '/sim/', '/meditation/'];
(async () => {
  for (const p of routes) {
    const r = await fetch('http://localhost:3002' + p);
    console.log(p, r.status);
  }
})();
