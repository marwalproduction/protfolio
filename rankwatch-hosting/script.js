const sections = [...document.querySelectorAll('main > section[id]')];
const links = [...document.querySelectorAll('.sidebar nav a')];
const progress = document.getElementById('progress');
const count = document.getElementById('chapter-count');
let scheduled = false;
function updateChapter() {
  const offset = window.innerWidth <= 720 ? 150 : 140;
  let active = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= offset) active = section;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = sections.at(-1);
  links.forEach(link => {
    if (link.hash === '#' + active.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  count.textContent = String(sections.indexOf(active) + 1).padStart(2, '0') + ' / ' + String(sections.length).padStart(2, '0');
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (distance > 0 ? Math.min(100, window.scrollY / distance * 100) : 100) + '%';
  scheduled = false;
}
function requestUpdate() {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateChapter); }
}
window.addEventListener('scroll', requestUpdate, { passive: true });
window.addEventListener('resize', requestUpdate);
window.addEventListener('load', requestUpdate);
updateChapter();
