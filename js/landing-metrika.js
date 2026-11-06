/* Цели Яндекс.Метрики нового лендинга (счётчик 99098822, 06.11.2026):
   signup_click {place} — любая ссылка на регистрацию (place = utm_content: hero, nav, teaser, pricing, card1…);
   wa_click {place} — ссылка на WhatsApp Қорлан; pricing_view — открыта страница тарифов;
   toggle_period {period} — переключатель «Помесячно / За год». В Метрике цели — тип «JavaScript-событие» с этими id. */
(function () {
  var ID = 99098822;
  function goal(name, params) { try { if (window.ym) ym(ID, 'reachGoal', name, params || {}); } catch (e) {} }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (a) {
      var h = a.getAttribute('href') || '';
      if (h.indexOf('/auth/signup') !== -1) {
        var m = h.match(/utm_content=([^&]+)/);
        goal('signup_click', { place: m ? decodeURIComponent(m[1]) : 'other' });
      } else if (h.indexOf('wa.me/') !== -1) {
        var sec = a.closest('section');
        goal('wa_click', { place: sec ? (sec.id || sec.className.split(' ')[0]) : 'footer' });
      }
    }
    var b = e.target.closest && e.target.closest('.p-toggle button');
    if (b) goal('toggle_period', { period: b.getAttribute('data-period') });
  }, true);
  if (/^\/pricing\/?/.test(location.pathname)) goal('pricing_view');
})();
