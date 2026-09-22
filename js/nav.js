/* ============================================================
   ОБЩАЯ НАВИГАЦИЯ для всех страниц сайта:
   бургер, мобильное меню, выпадающее меню «Решения»
   ============================================================ */
(function(){
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');

  function setOpen(open){
    if(!burger || !menu) return;
    menu.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.documentElement.classList.toggle('menu-open', open);
  }

  if(burger && menu){
    burger.addEventListener('click', function(){ setOpen(!menu.classList.contains('open')); });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ setOpen(false); });
    });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', function(){ if(window.innerWidth > 1140) setOpen(false); });
  }

  /* после клика по пункту меню снимаем фокус: иначе выпадающее меню
     «Решения» остаётся открытым, а пункт — подсвеченным */
  document.querySelectorAll('.nav-links a').forEach(function(a){
    a.addEventListener('click', function(){ a.blur(); });
  });
})();
