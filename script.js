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
      'meta.title': 'Kyle Nichols | Aspiring Network Engineer, CCNA',
      'meta.description': 'Kyle Nichols is a CCNA-certified networking self-starter in Yokohama, building home lab projects on the way to a network engineer role.',
      'nav.skip': 'Skip to content',
      'nav.toggle': 'Toggle navigation',
      'nav.projects': 'Web Projects',
      'nav.lab': 'Home Lab',
      'lang.group': 'Language',
      'hero.title': "Hi, I'm Kyle",
      'hero.p1': 'A CCNA-certified networking self-starter, working toward my first role as a network engineer.',
      'hero.p2': "I'm based in Yokohama, where I build and troubleshoot networks in my home lab to turn certification knowledge into hands-on skill.",
      'hero.cert': 'Cisco CCNA certified',
      'hero.alt': 'Kyle Nichols',
      'contact.group': 'Contact links',
      'contact.email': 'Email',
      'projects.title': 'Earlier web projects',
      'projects.intro': 'Web apps I built three years ago, before I turned my focus to networking.',
      'projects.grocerease': 'Real-time shared groceries list',
      'projects.gearshare': 'P2P gear rental',
      'projects.storylab': 'Easily create YouTube scripts',
      'lab.title': 'Networking home lab',
      'lab.intro': 'Networking projects from the last six months, built and tested on my own equipment.',
      'lab.badge': 'Placeholder',
      'lab.p1.title': 'Home lab project one',
      'lab.p2.title': 'Home lab project two',
      'lab.p3.title': 'Home lab project three',
      'lab.placeholder': 'Placeholder text. Describe the goal, the topology, the devices and protocols you used, and what you learned.'
    },
    ja: {
      'meta.title': 'Kyle Nichols | ネットワークエンジニア志望・CCNA',
      'meta.description': '横浜在住、CCNA取得済みのKyle Nichols。ネットワークエンジニアを目指して、ホームラボで実践的なプロジェクトに取り組んでいます。',
      'nav.skip': '本文へスキップ',
      'nav.toggle': 'メニューを開閉',
      'nav.projects': 'Web制作',
      'nav.lab': 'ホームラボ',
      'lang.group': '言語',
      'hero.title': 'はじめまして、カイルです',
      'hero.p1': 'CCNA取得済み。ネットワークエンジニアとしての第一歩を目指し、自ら学び続けています。',
      'hero.p2': '横浜を拠点に、ホームラボでネットワークの構築とトラブルシューティングを重ね、資格の知識を実践的なスキルに変えています。',
      'hero.cert': 'Cisco CCNA 取得',
      'hero.alt': 'Kyle Nicholsの写真',
      'contact.group': '連絡先リンク',
      'contact.email': 'メールを送る',
      'projects.title': '過去のWeb制作',
      'projects.intro': 'ネットワークに軸足を移す前、3年前に作ったWebアプリです。',
      'projects.grocerease': 'リアルタイムで共有できる買い物リスト',
      'projects.gearshare': '個人間で借りられるギアレンタル',
      'projects.storylab': 'YouTubeの台本を簡単に作成',
      'lab.title': 'ネットワーキング・ホームラボ',
      'lab.intro': '過去6か月間に、自前の機器で構築・検証したネットワークのプロジェクトです。',
      'lab.badge': '仮',
      'lab.p1.title': 'ホームラボ プロジェクト1',
      'lab.p2.title': 'ホームラボ プロジェクト2',
      'lab.p3.title': 'ホームラボ プロジェクト3',
      'lab.placeholder': '仮の文章です。目的、構成図、使用した機器やプロトコル、学んだことを書いてください。'
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
