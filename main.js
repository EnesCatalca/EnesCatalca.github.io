// A small print of each project follows the pointer while it is over that row.
const peek = document.getElementById('peek');
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

if (peek && fine) {
  for (const row of document.querySelectorAll('.index a[data-img]')) {
    const img = new Image();
    img.src = row.dataset.img; // warm the cache so the first hover is instant
    row.addEventListener('pointerenter', () => {
      peek.src = row.dataset.img;
      peek.classList.add('on');
    });
    row.addEventListener('pointerleave', () => peek.classList.remove('on'));
    row.addEventListener('pointermove', (e) => {
      // Sit beside the cursor, flipping left near the right edge.
      const x = e.clientX + 28 + 190 > innerWidth ? e.clientX - 218 : e.clientX + 28;
      peek.style.setProperty('--x', `${x}px`);
      peek.style.setProperty('--y', `${Math.min(Math.max(8, e.clientY - 95), innerHeight - 198)}px`);
    });
  }
  // Scrolling moves the row away without a pointerleave, so hide on scroll too.
  addEventListener('scroll', () => peek.classList.remove('on'), { passive: true });
}
