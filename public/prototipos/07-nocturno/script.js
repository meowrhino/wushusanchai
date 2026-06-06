// 07 · Nocturno — nav, menú, reveal y parallax sutil (vanilla)
(function () {
  'use strict';
  document.body.classList.add('js');

  // Menú móvil
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Nav con fondo al hacer scroll
  const nav = document.getElementById('topnav');
  const heroBg = document.querySelector('.hero-bg');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 20);
    if (heroBg && !reduce && y < window.innerHeight) {
      heroBg.style.transform = 'scale(1.06) translateY(' + (y * 0.15) + 'px)';
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  // Sección activa
  const links = Array.prototype.slice.call(document.querySelectorAll('.menu a[href^="#"]'));
  const sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navObs.observe(s); });
  }

  // Reveal de secciones (robusto)
  const reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (r) { r.classList.add('in'); });
    return;
  }
  const revObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  reveals.forEach(function (r) { revObs.observe(r); });
  requestAnimationFrame(function () {
    const vh = window.innerHeight;
    reveals.forEach(function (r) { if (r.getBoundingClientRect().top < vh * 0.95) r.classList.add('in'); });
  });
  setTimeout(function () { reveals.forEach(function (r) { r.classList.add('in'); }); }, 1100);
})();
