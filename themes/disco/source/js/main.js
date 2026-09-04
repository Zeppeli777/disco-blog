(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 入场动画（逐个显现） ---- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('on');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.06 });
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = Math.min((i % 6) * 70, 420) + 'ms';
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('on'); });
  }

  /* ---- 导航 flavor 条：hover 显示台词，否则轮播 ---- */
  var strip = document.getElementById('flavor-strip');
  var menuFlavors = Array.prototype.slice.call(document.querySelectorAll('.menu-item'))
    .map(function (a) { return a.getAttribute('data-flavor'); })
    .filter(Boolean);
  if (strip) {
    var pool = menuFlavors.length ? menuFlavors : ['……'];
    var idx = 0;
    var show = function (t) {
      strip.classList.remove('show');
      setTimeout(function () { strip.textContent = t; strip.classList.add('show'); }, 160);
    };
    document.querySelectorAll('.menu-item').forEach(function (a) {
      a.addEventListener('mouseenter', function () { show(a.getAttribute('data-flavor')); });
      a.addEventListener('focus', function () { show(a.getAttribute('data-flavor')); });
    });
    show(pool[0]);
    setInterval(function () { idx = (idx + 1) % pool.length; show(pool[idx]); }, 7000);
  }

  /* ---- 页脚随机台词 ---- */
  var footQuote = document.getElementById('foot-quote');
  var footData = document.getElementById('foot-quotes');
  if (footQuote && footData) {
    try {
      var quotes = JSON.parse(footData.textContent);
      if (quotes && quotes.length) footQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    } catch (e) { /* 忽略 */ }
  }

  /* ---- 检定横幅：点击掷 2d6（纯装饰，命运是虚构的） ---- */
  document.querySelectorAll('.check-banner[data-roll]').forEach(function (el) {
    var dice = el.querySelector('.cb-dice');
    var fire = function () {
      if (!dice || el.dataset.rolling) return;
      el.dataset.rolling = '1';
      var d = function () { return 1 + Math.floor(Math.random() * 6); };
      if (reduceMotion) {
        var a0 = d(), b0 = d();
        dice.textContent = '掷骰 ' + a0 + ' + ' + b0 + ' = ' + (a0 + b0);
        return;
      }
      el.classList.add('rolling');
      var t = setInterval(function () { dice.textContent = '⚀ ' + d() + '  ⚁ ' + d(); }, 90);
      setTimeout(function () {
        clearInterval(t);
        var a = d(), b = d();
        dice.textContent = '掷骰 ' + a + ' + ' + b + ' = ' + (a + b);
        el.classList.remove('rolling');
        delete el.dataset.rolling;
      }, 950);
    };
    el.addEventListener('click', fire);
    el.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); fire(); } });
  });

  /* ---- 本地预览时给 giscus 换成内置暗色主题（生产环境用自定义 CSS） ---- */
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    var trySet = function () {
      var f = document.querySelector('iframe.giscus-frame');
      if (f) {
        f.contentWindow.postMessage({ giscus: { setConfig: { theme: 'dark' } } }, 'https://giscus.app');
      } else {
        setTimeout(trySet, 800);
      }
    };
    setTimeout(trySet, 1500);
  }
})();
