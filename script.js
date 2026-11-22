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
      'hero.p1': 'Aspiring network engineer. I turn cables, configs and curiosity into working networks.',
      'hero.p2': 'CCNA-certified and based in Yokohama, I build and troubleshoot networks in my home lab to turn certification knowledge into hands-on skill.',
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
      'lab.badge': 'Draft',
      'lab.baby.title': 'Baby monitor',
      'lab.baby.desc': 'Placeholder text. Describe what you built, the devices and protocols you used, and what you learned.',
      'lab.nextcloud.title': 'Nextcloud',
      'lab.nextcloud.desc': 'Self-hosted file storage and sync.',
      'lab.pihole.title': 'Pi-hole',
      'lab.pihole.desc': 'Network-wide DNS filtering that blocks ads and trackers for every device.',
      'lab.pialert.title': 'Pi-Alert',
      'lab.pialert.desc': 'Network scanner that alerts me when a new device joins.',
      'lab.photoAlt': '{name}, photo {n}',
      'lightbox.label': 'Photo viewer',
      'lightbox.close': 'Close photo viewer',
      'lightbox.prev': 'Previous photo',
      'lightbox.next': 'Next photo'
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
      'hero.p1': 'ネットワークエンジニアを目指して。ケーブルと設定、そして好奇心で、動くネットワークをつくります。',
      'hero.p2': 'CCNA取得済み、横浜在住。ホームラボでネットワークの構築とトラブルシューティングを重ね、資格の知識を実践的なスキルに変えています。',
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
      'lab.badge': '下書き',
      'lab.baby.title': 'ベビーモニター',
      'lab.baby.desc': '仮の文章です。作ったもの、使用した機器やプロトコル、学んだことを書いてください。',
      'lab.nextcloud.title': 'Nextcloud',
      'lab.nextcloud.desc': 'セルフホスト型のファイル保存・同期サービス。',
      'lab.pihole.title': 'Pi-hole',
      'lab.pihole.desc': 'ネットワーク全体のDNSフィルタリングで、すべての端末の広告やトラッカーをブロック。',
      'lab.pialert.title': 'Pi-Alert',
      'lab.pialert.desc': 'ネットワークをスキャンし、新しい端末が接続すると通知するツール。',
      'lab.photoAlt': '{name}の写真 {n}',
      'lightbox.label': '写真ビューア',
      'lightbox.close': '写真を閉じる',
      'lightbox.prev': '前の写真',
      'lightbox.next': '次の写真'
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

    // Photo alt text is built from each card's (already translated) title
    document.querySelectorAll('.lab-card').forEach(function (card) {
      var name = card.querySelector('h3').textContent;
      card.querySelectorAll('.shot img').forEach(function (img, i) {
        img.alt = dict['lab.photoAlt'].replace('{name}', name).replace('{n}', i + 1);
      });
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });
  }

  /* Photo file types: the HTML starts with .jpg; if a file isn't found, try the other
     common extensions before giving up. Once you know your exact file types you can
     write them straight into index.html and delete this block. */
  var PHOTO_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG'];
  document.querySelectorAll('img[data-photo]').forEach(function (img) {
    var tried = 0;
    img.addEventListener('error', function () {
      tried += 1;
      if (tried < PHOTO_EXTS.length) {
        img.src = img.getAttribute('data-photo') + '.' + PHOTO_EXTS[tried];
      } else {
        img.closest('.shot').hidden = true; // no matching file: hide the empty tile
      }
    });
  });

  /* Photo viewer (native <dialog>: Esc closes it, focus is trapped while open) */
  var box = document.getElementById('lightbox');
  var boxImg = document.getElementById('lightbox-img');
  var boxCaption = document.getElementById('lightbox-cap');
  var gallery = { imgs: [], index: 0 };

  function showPhoto(i) {
    gallery.index = (i + gallery.imgs.length) % gallery.imgs.length;
    var img = gallery.imgs[gallery.index];
    boxImg.src = img.currentSrc || img.src;
    boxImg.alt = img.alt;
    boxCaption.textContent = img.alt;
  }

  if (box && typeof box.showModal === 'function') {
    document.querySelectorAll('.lab-card .shot').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('.lab-card');
        gallery.imgs = Array.prototype.slice.call(card.querySelectorAll('.shot:not([hidden]) img'));
        showPhoto(gallery.imgs.indexOf(btn.querySelector('img')));
        box.showModal();
      });
    });

    box.querySelector('.lightbox__close').addEventListener('click', function () { box.close(); });
    box.querySelector('.lightbox__prev').addEventListener('click', function () { showPhoto(gallery.index - 1); });
    box.querySelector('.lightbox__next').addEventListener('click', function () { showPhoto(gallery.index + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); }); // click the dark backdrop
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') showPhoto(gallery.index - 1);
      if (e.key === 'ArrowRight') showPhoto(gallery.index + 1);
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
