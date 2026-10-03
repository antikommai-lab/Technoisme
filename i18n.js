/* Wiki Technoïsme — i18n loader
   Ajouter une langue = 1) traduire content.fr.js en content.<lang>.js  2) ajouter le code dans LANGS. */
(function () {
  var LANGS = ['fr', 'en', 'es'];
  var LABELS = { fr: 'FR', en: 'EN', es: 'ES' };
  window.I18N = window.I18N || {};
  function detect() {
    try { var s = localStorage.getItem('wiki-lang'); if (s && LANGS.indexOf(s) >= 0) return s; } catch (e) {}
    var n = (navigator.language || 'fr').slice(0, 2).toLowerCase();
    return LANGS.indexOf(n) >= 0 ? n : 'fr';
  }
  function apply(lang) {
    var dict = window.I18N[lang]; if (!dict) return;
    document.documentElement.lang = lang;
    for (var k in dict) {
      if (!Object.prototype.hasOwnProperty.call(dict, k)) continue;
      var v = dict[k];
      if (k === 'doc-title') { document.title = v; continue; }
      if (k === 'meta-description') { var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute('content', v); continue; }
      if (k === 'search-placeholder') { var si = document.querySelector('.wm-searchbar input'); if (si) si.placeholder = v; continue; }
      var el = document.getElementById(k);
      if (el) el.innerHTML = v;
    }
  }
  function load(lang, cb) {
    if (window.I18N[lang]) { cb(); return; }
    var s = document.createElement('script');
    s.src = 'content.' + lang + '.js';
    s.onload = cb; s.onerror = cb;
    document.head.appendChild(s);
  }
  window.switchLang = function (lang) {
    try { localStorage.setItem('wiki-lang', lang); } catch (e) {}
    location.reload();
  };
  document.addEventListener('DOMContentLoaded', function () {
    var lang = detect();
    load(lang, function () { apply(lang); });
    var sw = document.getElementById('lang-switcher');
    if (sw) {
      sw.innerHTML = '';
      LANGS.forEach(function (l) {
        var b = document.createElement('button');
        b.className = 'lang-btn' + (l === lang ? ' active' : '');
        b.textContent = LABELS[l];
        b.title = l;
        b.onclick = function () { window.switchLang(l); };
        sw.appendChild(b);
      });
    }
  });
})();
