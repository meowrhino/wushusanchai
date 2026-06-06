// 08 · Recorrido — deck horizontal (vanilla)
(function () {
  'use strict';
  const deck = document.getElementById('deck');
  const bar = document.getElementById('bar');
  const dots = Array.prototype.slice.call(document.querySelectorAll('.dots button'));
  const panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
  if (!deck) return;

  const isMobile = function () { return window.matchMedia('(max-width:820px)').matches; };
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Rueda vertical -> desplazamiento horizontal (solo escritorio)
  deck.addEventListener('wheel', function (e) {
    if (isMobile()) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      deck.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });

  // Estado activo + barra de progreso
  let ticking = false;
  function update() {
    if (isMobile()) { ticking = false; return; }
    const max = deck.scrollWidth - deck.clientWidth;
    const ratio = max > 0 ? deck.scrollLeft / max : 0;
    const idx = Math.round(deck.scrollLeft / deck.clientWidth);
    if (bar) bar.style.width = (8 + ratio * 92) + '%';
    dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
    ticking = false;
  }
  deck.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }, { passive: true });

  // Navegación por puntos
  function goTo(i) {
    const target = panels[i];
    if (!target) return;
    if (isMobile()) {
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    } else {
      deck.scrollTo({ left: i * deck.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
    }
  }
  dots.forEach(function (d) {
    d.addEventListener('click', function () { goTo(parseInt(d.getAttribute('data-go'), 10)); });
  });

  // Teclado (flechas) en escritorio
  window.addEventListener('keydown', function (e) {
    if (isMobile()) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const idx = Math.round(deck.scrollLeft / deck.clientWidth);
      goTo(idx + (e.key === 'ArrowRight' ? 1 : -1));
      e.preventDefault();
    }
  });

  update();
  window.addEventListener('resize', update);
})();
