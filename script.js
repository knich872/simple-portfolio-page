/* Language switcher: Japanese / American English.
   English is written directly in index.html (so the page still reads fine without JS).
   To change wording, edit the matching key below. To translate a new element, give it
   data-i18n="some.key" (text), data-i18n-aria="some.key" (aria-label) or
   data-i18n-alt="some.key" (image alt), then add some.key to both languages. */
(function () {
  'use strict';

  var STORAGE_KEY = 'portfolio-lang';
  var HTML_LANG = { en: 'en-US', ja: 'ja' };

  var translations = {
    en: {
      'meta.title': 'Kyle Nichols | Full Stack Web Developer',
      'meta.description': 'Portfolio of Kyle Nichols, a full stack web developer based in Yokohama: web apps and networking home lab projects.',
      'nav.skip': 'Skip to content',
      'nav.toggle': 'Toggle navigation',
      'nav.projects': 'Projects',
      'nav.lab': 'Home Lab',
      'lang.group': 'Language',
      'hero.title': "Hi, I'm Kyle",
      'hero.p1': 'Full stack web developer looking to make a difference.',
      'hero.p2': "I'm currently based in Yokohama, honing my skills and expanding my knowledge base.",
      'hero.alt': 'Kyle Nichols',
      'contact.group': 'Contact links',
      'contact.email': 'Email',
      'projects.title': 'Check out my work',
      'projects.grocerease': 'Real-time shared groceries list',
      'projects.gearshare': 'P2P gear rental',
      'projects.storylab': 'Easily create YouTube scripts',
      'lab.title': 'Networking home lab',
      'lab.intro': 'Hands-on networking projects I build and test at home.',
      'lab.badge': 'Placeholder',
      'lab.p1.title': 'Home lab project one',
      'lab.p2.title': 'Home lab project two',
      'lab.p3.title': 'Home lab project three',
      'lab.placeholder': 'Placeholder text. Describe the topology, the hardware and software you used, and what you learned.'
    },
    ja: {
      'meta.title': 'Kyle Nichols | フルスタックWebデベロッパー',
      'meta.description': '横浜を拠点とするフルスタックWebデベロッパー、Kyle Nicholsのポートフォリオ。Webアプリとネットワークのホームラボ作品を紹介します。',
      'nav.skip': '本文へスキップ',
      'nav.toggle': 'メニューを開閉',
      'nav.projects': 'プロジェクト',
      'nav.lab': 'ホームラボ',
      'lang.group': '言語',
      'hero.title': 'はじめまして、カイルです',
      'hero.p1': '世の中の役に立つものづくりを目指す、フルスタックWebデベロッパーです。',
      'hero.p2': '現在は横浜を拠点に、スキルを磨き、知識の幅を広げています。',
      'hero.alt': 'Kyle Nicholsの写真',
      'contact.group': '連絡先リンク',
      'contact.email': 'メールを送る',
      'projects.title': '制作実績',
      'projects.grocerease': 'リアルタイムで共有できる買い物リスト',
      'projects.gearshare': '個人間で借りられるギアレンタル',
      'projects.storylab': 'YouTubeの台本を簡単に作成',
      'lab.title': 'ネットワーキング・ホームラボ',
      'lab.intro': '自宅で構築・検証しているネットワークの実践プロジェクトです。',
      'lab.badge': '仮',
      'lab.p1.title': 'ホームラボ プロジェクト1',
      'lab.p2.title': 'ホームラボ プロジェクト2',
      'lab.p3.title': 'ホームラボ プロジェクト3',
      'lab.placeholder': '仮の文章です。構成、使用した機器やソフトウェア、学んだことを書いてください。'
    }
  };

  function detectLanguage() {
    var fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (fromUrl && translations[fromUrl]) return fromUrl;
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && translations[saved]) return saved;
    } catch (e) { /* storage blocked: fall through */ }
    var browser = (navigator.language || '').toLowerCase();
    return browser.indexOf('ja') === 0 ? 'ja' : 'en';
  }

  function applyLanguage(lang) {
    var dict = translations[lang];

    function setFor(selector, dataAttr, apply) {
      document.querySelectorAll(selector).forEach(function (el) {
        var key = el.getAttribute(dataAttr);
        if (dict[key] === undefined) {
          console.warn('Missing translation for "' + key + '" (' + lang + ')');
          return;
        }
        apply(el, dict[key]);
      });
    }

    document.documentElement.lang = HTML_LANG[lang];
    document.title = dict['meta.title'];
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', dict['meta.description']);

    setFor('[data-i18n]', 'data-i18n', function (el, text) { el.textContent = text; });
    setFor('[data-i18n-aria]', 'data-i18n-aria', function (el, text) { el.setAttribute('aria-label', text); });
    setFor('[data-i18n-alt]', 'data-i18n-alt', function (el, text) { el.setAttribute('alt', text); });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-lang');
      applyLanguage(lang);
      try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    });
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  applyLanguage(detectLanguage());
})();
