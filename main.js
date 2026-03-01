/* ===== NAVBAR ===== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target))
      navLinks.classList.remove('open');
  });
}

/* ===== SCROLL ===== */
const navbar = document.getElementById('navbar');
function onScroll() {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ===== FADE-IN ===== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ===== LUCIDE ICONS ===== */
if (typeof lucide !== 'undefined') lucide.createIcons();
