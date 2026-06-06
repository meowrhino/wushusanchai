// 05 · Esquina — interacciones mínimas (vanilla)
(function () {
  'use strict';

  // --- Menú móvil ---
  const burger = document.querySelector('.burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Sombra/borde del header al hacer scroll ---
  const top = document.querySelector('.top');
  const onScroll = function () {
    if (top) top.classList.toggle('scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Sección activa (nav superior + índice lateral) ---
  const links = Array.prototype.slice.call(
    document.querySelectorAll('.nav a[href^="#"], .edge-index a[href^="#"]')
  );
  const sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);
  const unique = sections.filter(function (s, i, arr) { return arr.indexOf(s) === i; });

  if ('IntersectionObserver' in window && unique.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    unique.forEach(function (s) { observer.observe(s); });
  }
})();
