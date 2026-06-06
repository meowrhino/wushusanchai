// 06 · Bento — reveal de tarjetas al entrar en viewport (vanilla, robusto)
(function () {
  'use strict';
  document.body.classList.add('js');
  const tiles = Array.prototype.slice.call(document.querySelectorAll('.tile'));

  function reveal(el, i) {
    el.style.transitionDelay = (Math.min(i, 6) * 55) + 'ms';
    el.classList.add('in');
  }

  if (!('IntersectionObserver' in window)) {
    tiles.forEach(function (t) { t.classList.add('in'); });
    return;
  }

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        reveal(entry.target, tiles.indexOf(entry.target));
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });

  tiles.forEach(function (t) { io.observe(t); });

  // Revela de inmediato lo que ya está en pantalla al cargar (evita parpadeo en blanco)
  requestAnimationFrame(function () {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    tiles.forEach(function (t, i) {
      if (t.getBoundingClientRect().top < vh * 0.95) reveal(t, i);
    });
  });

  // Red de seguridad: nada se queda oculto pase lo que pase
  setTimeout(function () {
    tiles.forEach(function (t, i) { if (!t.classList.contains('in')) reveal(t, i); });
  }, 1000);
})();
