/* Wiki Technoïsme — i18n loader
   Ajouter une langue = 1) traduire content.fr.js en content.<lang>.js  2) ajouter le code dans LANGS. */
(function () {
  var LANGS = ['fr', 'en', 'es', 'de', 'ja', 'pt', 'zh', 'ko', 'it'];
  var LABELS = {
  fr: { svg: "<svg viewBox=\"0 0 22 14\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid meet\"><rect width=\"22\" height=\"14\" fill=\"#0055A4\"/><rect x=\"7.33\" width=\"7.33\" height=\"14\" fill=\"#fff\"/><rect x=\"14.66\" width=\"7.34\" height=\"14\" fill=\"#EF4135\"/></svg>", name: "Français" },
  en: { svg: "<svg viewBox=\"0 0 22 14\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid meet\"><rect width=\"22\" height=\"14\" fill=\"#012169\"/><path d=\"M0,0 22,14 M22,0 0,14\" stroke=\"#fff\" stroke-width=\"3\"/><path d=\"M0,0 22,14 M22,0 0,14\" stroke=\"#C8102E\" stroke-width=\"1.2\"/><path d=\"M11,0 11,14 M0,7 22,7\" stroke=\"#fff\" stroke-width=\"5\"/><path d=\"M11,0 11,14 M0,7 22,7\" stroke=\"#C8102E\" stroke-width=\"2.8\"/></svg>", name: "English" },
  es: { svg: "<svg viewBox=\"0 0 22 14\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid meet\"><rect width=\"22\" height=\"14\" fill=\"#AA151B\"/><rect y=\"3.5\" width=\"22\" height=\"7\" fill=\"#F1BF00\"/></svg>", name: "Español" },
  de: { svg: "<svg viewBox=\"0 0 22 14\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid meet\"><rect width=\"22\" height=\"4.67\" fill=\"#000\"/><rect y=\"4.67\" width=\"22\" height=\"4.66\" fill=\"#DD0000\"/><rect y=\"9.33\" width=\"22\" height=\"4.67\" fill=\"#FFCE00\"/></svg>", name: "Deutsch" },
  ja: { svg: "<svg viewBox=\"0 0 22 14\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid meet\"><rect width=\"22\" height=\"14\" fill=\"#fff\"/><circle cx=\"11\" cy=\"7\" r=\"4\" fill=\"#BC002D\"/></svg>", name: "日本語" },
  pt: { svg: "<svg viewBox=\"0 0 22 14\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid meet\"><rect width=\"22\" height=\"14\" fill=\"#DA291C\"/><rect width=\"8.8\" height=\"14\" fill=\"#046A38\"/><circle cx=\"8.8\" cy=\"7\" r=\"2.6\" fill=\"#FEDD00\"/></svg>", name: "Português" },
  zh: { svg: "<svg viewBox=\"0 0 22 14\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid meet\"><rect width=\"22\" height=\"14\" fill=\"#FE0000\"/><rect width=\"10\" height=\"7\" fill=\"#000095\"/><circle cx=\"5\" cy=\"3.5\" r=\"1.8\" fill=\"#fff\"/></svg>", name: "中文（繁體）" },
  ko: { svg: "<svg viewBox=\"0 0 22 14\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid meet\"><rect width=\"22\" height=\"14\" fill=\"#fff\"/><path d=\"M11 3a4 4 0 1 0 0 8 4.2 4.2 0 1 1 0-8z\" fill=\"#CD2E3A\"/><path d=\"M11 3a4 4 0 1 1 0 8 4.2 4.2 0 1 0 0-8z\" fill=\"#0047A0\"/></svg>", name: "한국어" },
  it: { svg: "<svg viewBox=\"0 0 22 14\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid meet\"><rect width=\"22\" height=\"14\" fill=\"#008C45\"/><rect x=\"7.33\" width=\"7.33\" height=\"14\" fill=\"#F4F9FF\"/><rect x=\"14.66\" width=\"7.34\" height=\"14\" fill=\"#CD212A\"/></svg>", name: "Italiano" }
  };
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
        b.className = 'lang-btn' 
+ (l === lang ? ' active' : '');
        b.innerHTML = LABELS[l].svg;
        b.title = LABELS[l].name;
        b.setAttribute('aria-label', LABELS[l].name);
        b
.onclick = function () { window.switchLang(l); };
        sw.appendChild(b);
      });
    }
  });
})();
