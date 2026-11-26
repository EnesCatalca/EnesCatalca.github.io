// Barcodes: each one encodes its own label, so no two look alike.
for (const svg of document.querySelectorAll('.barcode[data-code]')) {
  let seed = 0;
  for (const ch of svg.dataset.code) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  let x = 0, bars = '';
  while (x < 118) {
    const w = 0.8 + Math.floor(rand() * 4) * 0.9;
    if (rand() > 0.35) bars += `<rect x="${x.toFixed(1)}" y="0" width="${w.toFixed(1)}" height="40"/>`;
    x += w + 0.9;
  }
  svg.innerHTML = bars;
}

// A second copy of the ticker makes the loop seamless.
const tickerTrack = document.querySelector('.ticker-track');
tickerTrack.append(...[...tickerTrack.children].map((node) => node.cloneNode(true)));

// Readout in the bar: which section you are in and how far down the sheet.
const pct = document.getElementById('pct');
const sec = document.getElementById('sec');
const sections = [...document.querySelectorAll('[data-sec]')];
const slices = document.querySelector('.slices');
let queued = false;
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
function update() {
  queued = false;
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? Math.min(1, scrollY / max) : 0;
  pct.textContent = String(Math.round(p * 100)).padStart(3, '0') + '%';
  let label = '§00 COVER';
  for (const s of sections) if (s.getBoundingClientRect().top < innerHeight * 0.4) label = s.dataset.sec;
  sec.textContent = label;
  // The three city panels drift apart slightly while the band crosses the screen.
  const r = slices.getBoundingClientRect();
  if (!still && r.bottom > 0 && r.top < innerHeight) {
    const t = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
    slices.style.setProperty('--shift', `${(t * 60).toFixed(1)}px`);
  }
}
addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
addEventListener('resize', update);
update();
