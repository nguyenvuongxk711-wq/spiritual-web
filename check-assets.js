fetch('http://localhost:3001/')
  .then(r => r.text())
  .then(async html => {
    const css = Array.from(html.matchAll(/href="([^"]+\.css[^"]*)"/g)).map(m => m[1]);
    console.log('home', html.includes('Tử Vi Lá Số'));
    console.log('css', css);
    for (const c of css) {
      const r = await fetch('http://localhost:3001' + c);
      console.log(c, r.status, r.headers.get('content-type'));
    }
  })
  .catch(e => console.error(e.message));
