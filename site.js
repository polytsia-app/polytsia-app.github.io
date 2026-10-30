// Перемикач мови: ?lang=en у посиланні > збережений вибір > мова браузера (українська — за замовчуванням)
(function () {
  var root = document.documentElement;
  function apply(lang) {
    root.classList.toggle('lang-en', lang === 'en');
    root.setAttribute('lang', lang);
    var btn = document.getElementById('lang');
    if (btn) {
      btn.textContent = lang === 'en' ? 'UA' : 'EN';
      btn.setAttribute('aria-label', lang === 'en' ? 'Українська' : 'English');
    }
    var t = root.getAttribute(lang === 'en' ? 'data-title-en' : 'data-title-uk');
    if (t) document.title = t;
  }
  var param = new URLSearchParams(location.search).get('lang');
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var browser = (navigator.language || 'uk').toLowerCase().indexOf('uk') === 0 ? 'uk' : 'en';
  var lang = param === 'en' || param === 'uk' ? param : saved || browser;
  apply(lang);
  document.addEventListener('DOMContentLoaded', function () {
    apply(lang);
    // посилання на розділ (#delete) веде до відповідного заголовка англійською (#delete-en)
    if (lang === 'en' && location.hash) {
      var el = document.getElementById(location.hash.slice(1) + '-en');
      if (el) el.scrollIntoView();
    }
    var btn = document.getElementById('lang');
    if (btn) btn.addEventListener('click', function () {
      lang = lang === 'en' ? 'uk' : 'en';
      try { localStorage.setItem('lang', lang); } catch (e) {}
      apply(lang);
    });
  });
})();
