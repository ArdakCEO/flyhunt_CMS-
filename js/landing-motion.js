/* Анимации нового лендинга (06.11.2026): появление блоков, «ИИ проверяет отклики» в первом экране, счётчик дней.
   Работает только если на <html> есть .js-anim (ставит инлайн-скрипт в <head> при no-preference и наличии IntersectionObserver). */
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('js-anim')) return;

  // 1. появление при прокрутке; в группах — лесенкой
  var groups = ['.three-grid > *', '.t-rows > .t-row', '.p-grid > .p-card', '.ticks > *', '.faq details', '.strip > img',
    '.cmp-r', '.extras .wrap > *'];
  var singles = ['section:not(.hero):not(.pricing-page) .sec-h', '.pt-box', '.base .wrap > *', '.korlan .wrap > *', '.t-total',
    '.final .box', '.p-cta', '.p-tokens', '.p-alt'];
  var marked = [];
  groups.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el, i) {
      if (el.hasAttribute('data-rv')) return;
      el.setAttribute('data-rv', ''); el.style.setProperty('--d', Math.min(i, 6) * 0.08 + 's'); marked.push(el);
    });
  });
  singles.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (el.hasAttribute('data-rv') || el.querySelector('[data-rv]')) return;
      el.setAttribute('data-rv', ''); marked.push(el);
    });
  });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  marked.forEach(function (el) { io.observe(el); });

  // 2. первый экран: строки кандидатов по одной, оценка ИИ «досчитывается»
  var rows = document.querySelectorAll('.hero .ui-body .row');
  rows.forEach(function (row, i) {
    var d = 0.5 + i * 0.6;
    row.style.setProperty('--d', d + 's');
    var sc = row.querySelector('.score');
    if (!sc) return;
    row.classList.add('lm-scan');
    var target = parseInt(sc.textContent, 10) || 0;
    sc.textContent = '…';
    setTimeout(function () { countUp(sc, target, 700); }, (d + 0.35) * 1000);
  });

  // 3. счётчик дней акции (страница тарифов): число досчитывается до N
  var days = document.querySelector('.p-days');
  if (days) {
    var m = days.textContent.match(/(\d+)/);
    if (m) {
      var n = +m[1], tpl = days.textContent;
      var o = { textContent: '' };
      countUp(o, n, 900, function (v) { days.textContent = tpl.replace(m[1], v); });
    }
  }

  function countUp(el, to, ms, set) {
    // страховка: во вкладке в фоне requestAnimationFrame не идёт — итоговое число ставим таймером
    setTimeout(function () { if (set) set(to); else el.textContent = to; }, ms + 150);
    var t0 = performance.now();
    (function step(t) {
      var k = Math.min(1, (t - t0) / ms), v = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (set) set(v); else el.textContent = v;
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
})();
