// A second copy of the stamps makes the reel loop without a gap.
const track = document.getElementById('track');
for (const item of [...track.children]) {
  const copy = item.cloneNode(true);
  copy.dataset.copy = '';
  copy.setAttribute('aria-hidden', 'true');
  copy.querySelector('a').tabIndex = -1;
  track.append(copy);
}

// Undo any keyboard scrolling once focus leaves, so the loop restarts without a gap.
const reel = track.parentElement;
reel.addEventListener('focusin', (event) => {
  // A half-visible stamp is not scrolled by the browser on its own.
  if (event.target.matches(':focus-visible')) event.target.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'instant' });
});
reel.addEventListener('focusout', (event) => {
  if (!reel.contains(event.relatedTarget)) reel.scrollLeft = 0;
});

const pause = document.getElementById('pause');
pause.addEventListener('click', () => {
  const paused = track.parentElement.classList.toggle('paused');
  pause.textContent = paused ? 'Play' : 'Pause';
});
