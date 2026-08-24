(() => {
  'use strict';

  /* ---------- Header: shrink on scroll + active link ---------- */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const progressBar = document.getElementById('progressBar');

  function onScroll() {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    const doc = document.documentElement;
    const total = doc.scrollHeight - window.innerHeight;
    progressBar.style.width = total > 0 ? (window.scrollY / total) * 100 + '%' : '0%';

    let current = '';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 160) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMenu() {
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }

  navToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
    mobileMenu.setAttribute('aria-hidden', !open);
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (link.dataset.tab) setTab(link.dataset.tab);
      closeMenu();
    });
  });

  /* ---------- About tabs ---------- */
  const tabButtons = document.querySelectorAll('.tab-btn');

  function setTab(name) {
    tabButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === name));
    document.querySelectorAll('.tab-panel').forEach((panel) => {
      panel.classList.toggle('active', panel.id === 'tab-' + name);
    });
  }

  tabButtons.forEach((btn) => btn.addEventListener('click', () => setTab(btn.dataset.tab)));

  /* ---------- Watermark typing animation (loops forever) ---------- */
  const watermarkText = 'portfolio';
  const watermarkEl = document.getElementById('watermarkText');
  let wIndex = 0;
  let wDeleting = false;

  function typeWatermark() {
    if (!wDeleting) {
      wIndex++;
      watermarkEl.textContent = watermarkText.slice(0, wIndex);
      if (wIndex === watermarkText.length) {
        wDeleting = true;
        setTimeout(typeWatermark, 2200);
        return;
      }
      setTimeout(typeWatermark, 150);
    } else {
      wIndex--;
      watermarkEl.textContent = watermarkText.slice(0, wIndex);
      if (wIndex === 0) {
        wDeleting = false;
        setTimeout(typeWatermark, 600);
        return;
      }
      setTimeout(typeWatermark, 70);
    }
  }

  typeWatermark();

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(revealEls).indexOf(entry.target);
          entry.target.style.setProperty('--reveal-delay', (index % 8) * 0.06 + 's');
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.stat-num');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.count;
        const duration = 1600;
        const start = performance.now();

        function step(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString();
          if (p < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((el) => counterObserver.observe(el));

  /* ---------- Pixel cowboy & horse sprite (8-frame gallop) ---------- */
  const sprite = document.getElementById('pxSprite');
  const PX = 4;
  const BROWN = '#a16207';
  const LIGHTB = '#c98a3d';
  const DARKB = '#6b4423';
  const MANE = '#4a3000';
  const HOOF = '#292524';
  const SADDLE = '#8b1a1a';
  const BLANKET = '#0ea5a4';
  const HAT = '#f5f5f4';
  const SKIN = '#ffd9a8';
  const SHIRT = '#b91c1c';
  const VEST = '#2f2f2f';
  const PANTS = '#1e3a8a';
  const BELT = '#1f2937';
  const GOLD = '#fbbf24';
  const GLOVE = '#f5f5f4';

  const horseBody = [];
  for (let y = 7; y <= 9; y++) {
    for (let x = 5; x <= 13; x++) horseBody.push([x, y]);
  }
  const horseBelly = [[5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9]];
  const horseChest = [[10, 7], [11, 7], [12, 7]];
  const horseNeck = [[11, 5], [12, 5], [13, 5], [11, 6], [12, 6], [13, 6]];
  const horseHead = [[13, 3], [14, 3], [15, 3], [16, 3], [17, 3], [13, 4], [14, 4], [15, 4], [16, 4], [17, 4]];
  const horseMuzzle = [[16, 3], [17, 3], [16, 4], [17, 4]];
  const horseEye = [[15, 3]];
  const horseNostril = [[17, 4]];
  const horseEar = [[13, 2], [14, 2]];
  const horseMane = [[10, 4], [11, 4], [12, 4], [13, 4], [11, 5], [12, 5], [13, 5], [12, 6]];
  const saddleBlanket = [[5, 7], [10, 7]];
  const saddle = [[6, 7], [7, 7], [8, 7], [9, 7], [7, 6], [8, 6]];
  const saddleCinch = [[6, 8], [6, 9]];
  const riderPants = [[7, 6], [8, 6]];
  const riderBelt = [[6, 6], [7, 6], [8, 6], [9, 6]];
  const riderBuckle = [[8, 6]];
  const riderBoot = [[7, 7], [8, 7], [9, 7]];
  const riderShirt = [[7, 4], [8, 4], [9, 4], [7, 5], [8, 5], [9, 5]];
  const riderVest = [[7, 4], [8, 4]];
  const riderBandana = [[6, 4], [6, 5]];
  const riderBandanaTails = [[5, 5], [5, 6]];
  const riderArmFwd = [[10, 4], [11, 4]];
  const riderGlove = [[11, 4]];
  const riderSkin = [[7, 3], [8, 3]];
  const riderEye = [[8, 3]];
  const riderHair = [[6, 3]];
  const riderHat = [[5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [6, 0], [7, 0], [8, 0], [9, 0], [6, 1], [7, 1], [8, 1], [9, 1]];
  const hatBand = [[6, 1], [7, 1], [8, 1], [9, 1]];

  const HIND_A = {
    legs: [[4, 10], [5, 10], [3, 11], [4, 11], [2, 12], [3, 12], [5, 10], [6, 10], [4, 11], [5, 11], [3, 12], [4, 12]],
    hooves: [[1, 13], [2, 13], [2, 13], [3, 13]]
  };
  const HIND_AB = {
    legs: [[4, 10], [5, 10], [4, 11], [5, 11], [3, 12], [4, 12], [5, 10], [6, 10], [5, 11], [6, 11], [4, 12], [5, 12]],
    hooves: [[3, 13], [4, 13], [4, 13], [5, 13]]
  };
  const HIND_B = {
    legs: [[5, 10], [6, 10], [5, 11], [6, 11], [5, 12], [6, 12], [6, 10], [7, 10], [6, 11], [7, 11], [6, 12], [7, 12]],
    hooves: [[5, 13], [6, 13], [6, 13], [7, 13]]
  };
  const HIND_BC = {
    legs: [[5, 10], [6, 10], [5, 11], [6, 11], [6, 12], [7, 12], [6, 10], [7, 10], [6, 11], [7, 11], [7, 12], [8, 12]],
    hooves: [[6, 13], [7, 13], [7, 13], [8, 13]]
  };
  const HIND_C = {
    legs: [[6, 10], [7, 10], [6, 11], [7, 11], [6, 12], [7, 12], [7, 10], [8, 10], [7, 11], [8, 11], [7, 12], [8, 12]],
    hooves: [[6, 13], [7, 13], [7, 13], [8, 13]]
  };
  const HIND_CD = {
    legs: [[6, 10], [7, 10], [7, 11], [8, 11], [7, 12], [8, 12], [7, 10], [8, 10], [8, 11], [9, 11], [8, 12], [9, 12]],
    hooves: [[7, 13], [8, 13], [8, 13], [9, 13]]
  };
  const HIND_D = {
    legs: [[7, 10], [8, 10], [8, 11], [9, 11], [8, 12], [9, 12], [8, 10], [9, 10], [9, 11], [10, 11], [9, 12], [10, 12]],
    hooves: [[9, 13], [10, 13], [10, 13], [11, 13]]
  };

  const FRONT_A = {
    legs: [[10, 10], [11, 10], [11, 11], [12, 11], [12, 12], [13, 12], [11, 10], [12, 10], [12, 11], [13, 11], [13, 12], [14, 12]],
    hooves: [[13, 13], [14, 13], [14, 13], [15, 13]]
  };
  const FRONT_AB = {
    legs: [[9, 10], [10, 10], [10, 11], [11, 11], [10, 12], [11, 12], [10, 10], [11, 10], [11, 11], [12, 11], [11, 12], [12, 12]],
    hooves: [[10, 13], [11, 13], [11, 13], [12, 13]]
  };
  const FRONT_B = {
    legs: [[9, 10], [10, 10], [9, 11], [10, 11], [9, 12], [10, 12], [10, 10], [11, 10], [10, 11], [11, 11], [10, 12], [11, 12]],
    hooves: [[9, 13], [10, 13], [10, 13], [11, 13]]
  };
  const FRONT_BC = {
    legs: [[10, 10], [11, 10], [11, 11], [12, 11], [11, 12], [12, 12], [11, 10], [12, 10], [12, 11], [13, 11], [12, 12], [13, 12]],
    hooves: [[11, 13], [12, 13], [12, 13], [13, 13]]
  };
  const FRONT_C = {
    legs: [[10, 10], [11, 10], [11, 11], [12, 11], [11, 12], [12, 12], [11, 10], [12, 10], [12, 11], [13, 11], [12, 12], [13, 12]],
    hooves: [[11, 13], [12, 13], [12, 13], [13, 13]]
  };
  const FRONT_CD = {
    legs: [[10, 10], [11, 10], [10, 11], [11, 11], [9, 12], [10, 12], [11, 10], [12, 10], [11, 11], [12, 11], [10, 12], [11, 12]],
    hooves: [[9, 13], [10, 13], [10, 13], [11, 13]]
  };
  const FRONT_D = {
    legs: [[9, 10], [10, 10], [8, 11], [9, 11], [8, 12], [9, 12], [10, 10], [11, 10], [9, 11], [10, 11], [9, 12], [10, 12]],
    hooves: [[8, 13], [9, 13], [9, 13], [10, 13]]
  };

  const GALLOP = [
    { legs: HIND_A.legs.concat(FRONT_A.legs), hooves: HIND_A.hooves.concat(FRONT_A.hooves) },
    { legs: HIND_AB.legs.concat(FRONT_A.legs), hooves: HIND_AB.hooves.concat(FRONT_A.hooves) },
    { legs: HIND_B.legs.concat(FRONT_AB.legs), hooves: HIND_B.hooves.concat(FRONT_AB.hooves) },
    { legs: HIND_BC.legs.concat(FRONT_B.legs), hooves: HIND_BC.hooves.concat(FRONT_B.hooves) },
    { legs: HIND_C.legs.concat(FRONT_BC.legs), hooves: HIND_C.hooves.concat(FRONT_BC.hooves) },
    { legs: HIND_CD.legs.concat(FRONT_C.legs), hooves: HIND_CD.hooves.concat(FRONT_C.hooves) },
    { legs: HIND_D.legs.concat(FRONT_CD.legs), hooves: HIND_D.hooves.concat(FRONT_CD.hooves) },
    { legs: HIND_D.legs.concat(FRONT_D.legs), hooves: HIND_D.hooves.concat(FRONT_D.hooves) }
  ];

  function pxShadow(cells, color) {
    return cells.map((c) => c[0] * PX + 'px ' + c[1] * PX + 'px 0 0 ' + color).join(',');
  }

  function renderRunner(i) {
    const f = GALLOP[i];
    sprite.style.boxShadow = [
      pxShadow(f.legs, DARKB),
      pxShadow(f.hooves, HOOF),
      pxShadow(horseBody, BROWN),
      pxShadow(horseBelly, LIGHTB),
      pxShadow(horseChest, LIGHTB),
      pxShadow(horseNeck, BROWN),
      pxShadow(horseHead, BROWN),
      pxShadow(horseMuzzle, LIGHTB),
      pxShadow(saddleBlanket, BLANKET),
      pxShadow(saddle, SADDLE),
      pxShadow(saddleCinch, DARKB),
      pxShadow(horseMane, MANE),
      pxShadow(horseEar, DARKB),
      pxShadow(horseEye, HOOF),
      pxShadow(horseNostril, HOOF),
      pxShadow(riderPants, PANTS),
      pxShadow(riderBelt, BELT),
      pxShadow(riderBuckle, GOLD),
      pxShadow(riderBoot, HOOF),
      pxShadow(riderShirt, SHIRT),
      pxShadow(riderBandana, SHIRT),
      pxShadow(riderBandanaTails, SHIRT),
      pxShadow(riderVest, VEST),
      pxShadow(riderArmFwd, SHIRT),
      pxShadow(riderGlove, GLOVE),
      pxShadow(riderSkin, SKIN),
      pxShadow(riderEye, HOOF),
      pxShadow(riderHair, MANE),
      pxShadow(riderHat, HAT),
      pxShadow(hatBand, MANE)
    ].join(',');
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    renderRunner(0);
  } else {
    renderRunner(0);
    let frame = 0;
    setInterval(() => {
      frame = (frame + 1) % GALLOP.length;
      renderRunner(frame);
    }, 100);
  }

  /* ---------- Custom cursor ---------- */
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.opacity = 1;
    ring.style.opacity = 1;
    dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  (function followRing() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
    requestAnimationFrame(followRing);
  })();

  document.querySelectorAll('a, button, .svc-card, .skill-item, .contact-item, .section-toggle, .achv-photo, .exp-main-photo, .lb-btn').forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = 0;
    ring.style.opacity = 0;
  });

  /* ---------- Collapsible sections (What I Do / Technical Skills) ---------- */
  document.querySelectorAll('.section-toggle').forEach((toggle) => {
    const panel = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!panel) return;
    const label = toggle.querySelector('.toggle-chip-label');

    function setOpen(open) {
      toggle.classList.toggle('open', open);
      panel.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (label) label.textContent = open ? (label.dataset.closeLabel || 'Click to hide') : (label.dataset.openLabel || 'Click here to see');
    }

    function flip() {
      setOpen(!panel.classList.contains('open'));
    }

    toggle.addEventListener('click', flip);
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flip();
      }
    });
  });

  /* ---------- Broken image placeholders ---------- */
  function makeFallback(fileName) {
    const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='#1b2437'/><stop offset='1' stop-color='#101623'/>" +
      "</linearGradient></defs>" +
      "<rect width='800' height='1000' fill='url(#g)'/>" +
      "<g fill='none' stroke='#3b82f6' stroke-width='14' opacity='0.85'>" +
      "<rect x='310' y='430' width='180' height='130' rx='18'/>" +
      "<circle cx='400' cy='495' r='34'/>" +
      "<path d='M350 430 l22-28 h56 l22 28'/></g>" +
      "<text x='400' y='640' text-anchor='middle' font-family='Arial,sans-serif' font-size='26' fill='#94a3c4'>Add photo:</text>" +
      "<text x='400' y='680' text-anchor='middle' font-family='monospace' font-size='24' fill='#e2e8f0'>images/" + fileName + "</text></svg>";
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  document.querySelectorAll('img[data-fallback]').forEach((img) => {
    const showFallback = () => {
      const name = (img.dataset.fallback || '').split('/').pop() || 'photo.jpg';
      img.src = makeFallback(name);
    };
    img.addEventListener('error', showFallback, { once: true });
    if (img.complete && img.naturalWidth === 0 && img.getClientRects().length) showFallback();
  });

  /* ---------- Photo gallery lightbox with swipe ---------- */
  const lightbox = document.getElementById('lightbox');

  if (lightbox) {
    const track = document.getElementById('lbTrack');
    const stage = lightbox.querySelector('.lb-stage');
    const counterEl = document.getElementById('lbCounter');
    const btnPrev = lightbox.querySelector('.lb-prev');
    const btnNext = lightbox.querySelector('.lb-next');
    const atpData = document.getElementById('atpData');
    const atpMainPhoto = document.getElementById('atpMainPhoto');
    const openAtpBtn = document.getElementById('openAtpGallery');

    let slides = [];
    let current = 0;
    let lastFocus = null;

    function collect(selector) {
      return Array.from(document.querySelectorAll(selector)).map((img) => ({
        src: img.getAttribute('src'),
        alt: img.alt || 'Photo'
      }));
    }

    function collectAtp() {
      if (!atpData) return [];
      return Array.from(atpData.querySelectorAll('img')).map((img) => ({
        src: img.getAttribute('src'),
        alt: img.alt || 'ATP photo'
      }));
    }

    /* "+N Photos" chip on the ATP cover photo */
    const atpCount = document.getElementById('atpCount');
    if (atpCount) {
      const n = collectAtp().length;
      atpCount.textContent = n > 0 ? n + (n === 1 ? ' Photo' : ' Photos') : 'Photos';
    }

    function applyTransform(instant) {
      track.style.transition = instant ? 'none' : '';
      track.style.transform = 'translateX(' + (-current * 100) + '%)';
      counterEl.textContent = (current + 1) + ' / ' + slides.length;
      btnPrev.disabled = current === 0;
      btnNext.disabled = current === slides.length - 1;
    }

    function buildSlides(items) {
      track.innerHTML = '';
      slides = items.map((item) => {
        const slide = document.createElement('div');
        slide.className = 'lb-slide';
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        img.draggable = false;
        slide.appendChild(img);
        track.appendChild(slide);
        return slide;
      });
    }

    function goTo(i, instant) {
      current = Math.max(0, Math.min(slides.length - 1, i));
      applyTransform(instant);
    }

    function openLightbox(name, startIndex) {
      let items = [];
      if (name === 'spup') items = collect('.achv-media img');
      else if (name === 'atp') items = collectAtp();
      if (!items.length) return;
      buildSlides(items);
      lastFocus = document.activeElement;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lb-lock');
      goTo(startIndex || 0, true);
      lightbox.querySelector('.lb-close').focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lb-lock');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    /* triggers */
    document.querySelectorAll('[data-gallery="spup"]').forEach((photo, idx) => {
      photo.addEventListener('click', () => openLightbox('spup', idx));
      photo.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox('spup', idx);
        }
      });
    });

    if (atpMainPhoto) {
      atpMainPhoto.addEventListener('click', () => openLightbox('atp', 0));
      atpMainPhoto.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox('atp', 0);
        }
      });
    }

    if (openAtpBtn) openAtpBtn.addEventListener('click', () => openLightbox('atp', 0));

    lightbox.querySelectorAll('[data-lb-close]').forEach((el) => el.addEventListener('click', closeLightbox));
    btnPrev.addEventListener('click', () => goTo(current - 1));
    btnNext.addEventListener('click', () => goTo(current + 1));

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') goTo(current - 1);
      else if (e.key === 'ArrowRight') goTo(current + 1);
    });

    /* drag & swipe */
    let dragging = false;
    let startX = 0;
    let deltaX = 0;

    stage.addEventListener('pointerdown', (e) => {
      if (slides.length < 2) return;
      dragging = true;
      deltaX = 0;
      startX = e.clientX;
      stage.classList.add('lb-dragging');
      track.style.transition = 'none';
      stage.setPointerCapture(e.pointerId);
    });

    stage.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      deltaX = e.clientX - startX;
      const pct = (deltaX / stage.clientWidth) * 100;
      track.style.transform = 'translateX(calc(' + (-current * 100) + '% + ' + pct + '%))';
    });

    function endDrag() {
      if (!dragging) return;
      dragging = false;
      stage.classList.remove('lb-dragging');
      track.style.transition = '';
      const threshold = Math.min(90, stage.clientWidth * 0.16);
      if (deltaX <= -threshold && current < slides.length - 1) goTo(current + 1);
      else if (deltaX >= threshold && current > 0) goTo(current - 1);
      else applyTransform(false);
    }

    stage.addEventListener('pointerup', endDrag);
    stage.addEventListener('pointercancel', endDrag);
  }
})();
