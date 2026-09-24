/* ============================================================
   SENDER · ATELIER — app.js
   Motor scroll-driven (método ScrollCraft): el scroll es el
   transporte del film y de la narrativa. GSAP + ScrollTrigger +
   Lenis vía CDN (globales). i18n.js autónomo (ES/EN, 198 claves).
   ============================================================ */
import './i18n.js';

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
const Lenis = window.Lenis;
if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $  = (s, c) => (c || document).querySelector(s);
const $$ = (s, c) => [...(c || document).querySelectorAll(s)];

/* ---------- Lenis smooth scroll ---------- */
let lenis = null;
if (Lenis && !reduce) {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ---------- Split words (títulos display) ---------- */
function splitWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w) => `<span class="w"><span>${w}</span></span>`).join(' ');
}
function splitAll() { $$('.split').forEach(splitWords); }

/* ---------- Loader + intro del hero ---------- */
function finishLoad() {
  document.body.classList.remove('loading');
  if (reduce) { ScrollTrigger.refresh(); return; }
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, onComplete: () => ScrollTrigger.refresh() });
  tl.from('.hero-title .w > span', { yPercent: 112, duration: 1.1, stagger: 0.06 }, 0.05)
    .from('.hero-eyebrow', { y: 16, opacity: 0, duration: 0.7 }, 0.25)
    .from('.hero-sub', { y: 20, opacity: 0, duration: 0.8 }, 0.5)
    .from('.hero-cta .btn', { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.65)
    .from('.hero-stats .stat', { y: 24, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.8)
    .from('.hero-hint', { opacity: 0, duration: 0.8 }, 1.2);
}
window.addEventListener('load', () => {
  splitAll();
  setTimeout(finishLoad, 900);
});
splitAll(); // por si load ya pasó

/* ---------- Reveals con scroll (fuera del hero) ---------- */
$$('.rv').forEach((el) => {
  if (el.closest('#hero')) return;
  if (reduce) return;
  gsap.from(el, {
    y: 42, opacity: 0, duration: 0.95, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
  });
});
$$('.split').forEach((el) => {
  if (el.closest('#hero') || reduce) return;
  ScrollTrigger.create({
    trigger: el, start: 'top 88%', once: true,
    onEnter: () => gsap.from(el.querySelectorAll('.w > span'), { yPercent: 112, duration: 0.95, stagger: 0.05, ease: 'power4.out' }),
  });
});

/* ---------- Nav + menú ---------- */
const nav = $('#nav');
ScrollTrigger.create({ start: 40, onUpdate: (self) => nav.classList.toggle('scrolled', self.scroll() > 40) });
const menu = $('#menu');
function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  menu.setAttribute('aria-hidden', String(!open));
  $('#burger').setAttribute('aria-expanded', String(open));
  if (lenis) (open ? lenis.stop() : lenis.start());
  if (open) setTimeout(() => { const a = $('#menu a'); a && a.focus(); }, 60);
}
$('#burger').addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
$('#menu-close').addEventListener('click', () => setMenu(false));
$$('#menu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

/* ---------- Anclas suaves ---------- */
$$('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const t = $(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(t, { offset: -10 }); else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  });
});

/* ---------- i18n: re-split tras cambio de idioma ---------- */
window.addEventListener('langchange', () => {
  splitAll();
  $$('.lang [data-lang]').forEach((s) => s.classList.toggle('on', s.dataset.lang === (localStorage.getItem('sender-lang') || 'es')));
});

/* ---------- Contadores ---------- */
$$('[data-count]').forEach((el) => {
  const end = parseFloat(el.dataset.count);
  const o = { v: 0 };
  gsap.to(o, {
    v: end, duration: 2, ease: 'power1.out',
    scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('es-CL'); },
  });
});

/* ---------- FILM: el scroll es el transporte (firma ScrollCraft) ---------- */
(() => {
  const v = $('#film');
  if (!v) return;
  let ready = false, tgt = 0, cur = 0;
  v.addEventListener('loadedmetadata', () => { ready = true; v.pause(); }, { once: true });
  ScrollTrigger.create({
    trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true,
    onUpdate: (self) => { tgt = self.progress; },
  });
  const tc = $('#tc');
  const fmtTC = (t) => {
    const f = Math.floor((t % 1) * 30);
    const s = Math.floor(t) % 60, m = Math.floor(t / 60) % 60, h = Math.floor(t / 3600);
    const p = (x) => String(x).padStart(2, '0');
    return `${p(h)}:${p(m)}:${p(s)}:${p(f)}`;
  };
  (function tick() {
    if (ready && v.duration && isFinite(v.duration)) {
      if (tc) tc.textContent = fmtTC(v.currentTime);
      cur += (tgt - cur) * (reduce ? 1 : 0.12);
      const t = cur * (v.duration - 0.05);
      if (Math.abs(v.currentTime - t) > 0.01) { try { v.currentTime = t; } catch (_) {} }
    }
    requestAnimationFrame(tick);
  })();
})();

/* ---------- Catálogo: stacks keynote (4 vistas por producto) ---------- */
$$('.prod').forEach((prod) => {
  const imgs = $$('.pstack img', prod);
  const cnt = $('.pstack-count b', prod);
  let last = -1;
  const set = (p) => {
    const i = Math.min(imgs.length - 1, Math.max(0, Math.floor(p * imgs.length)));
    if (i === last) return;
    last = i;
    imgs.forEach((im, k) => im.classList.toggle('on', k === i));
    if (cnt) cnt.textContent = String(i + 1);
  };
  ScrollTrigger.create({
    trigger: prod, start: 'top 78%', end: 'bottom 62%', scrub: true,
    onUpdate: (self) => set(self.progress),
  });
  set(0);
});

/* ---------- Espectro: dial + knob arrastrable + paneles ---------- */
(() => {
  const BANDS = [
    { name: 'NAVTEX', min: 490e3, max: 518e3 },
    { name: 'AM', min: 530e3, max: 1.7e6 },
    { name: 'HF', min: 2e6, max: 30e6 },
    { name: 'FM', min: 88e6, max: 108e6 },
  ];
  const knob = $('#knob'), freq = $('#freq'), unit = $('#unit'), bandEl = $('#band-name');
  const needle = $('#needle'), segs = $$('.seg'), panels = $$('.panel');
  if (!knob) return;
  let n = 0, lastBand = -1, dragging = false;

  function fmt(f) {
    if (f >= 1e6) return [(f / 1e6).toLocaleString('es-CL', { minimumFractionDigits: 1, maximumFractionDigits: 2 }), 'MHz'];
    return [(f / 1e3).toLocaleString('es-CL', { minimumFractionDigits: 1, maximumFractionDigits: 1 }), 'kHz'];
  }
  function setSpectrum(x) {
    n = Math.min(0.99999, Math.max(0, x));
    const bi = Math.min(BANDS.length - 1, Math.floor(n * BANDS.length));
    const r = n * BANDS.length - bi;
    const b = BANDS[bi];
    const f = Math.exp(Math.log(b.min) + r * (Math.log(b.max) - Math.log(b.min)));
    const [val, un] = fmt(f);
    freq.textContent = val; unit.textContent = un; bandEl.textContent = b.name;
    needle.style.left = (n * 100).toFixed(2) + '%';
    knob.style.transform = `rotate(${(n * 720).toFixed(1)}deg)`;
    knob.setAttribute('aria-valuenow', Math.round(n * 100));
    knob.setAttribute('aria-valuetext', `${val} ${un} — ${b.name}`);
    if (bi !== lastBand) {
      lastBand = bi;
      segs.forEach((s, i) => s.classList.toggle('active', i === bi));
      panels.forEach((p, i) => p.classList.toggle('active', i === bi));
    }
  }
  ScrollTrigger.create({
    trigger: '#espectro', start: 'top 72%', end: 'bottom 58%', scrub: 0.4,
    onUpdate: (self) => { if (!dragging) setSpectrum(self.progress); },
  });
  // knob: arrastre vertical + teclado (movimiento firma)
  let y0 = 0, n0 = 0;
  knob.addEventListener('pointerdown', (e) => {
    dragging = true; y0 = e.clientY; n0 = n;
    knob.setPointerCapture(e.pointerId);
  });
  knob.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    setSpectrum(n0 + (y0 - e.clientY) * 0.0022);
  });
  const up = () => { dragging = false; };
  knob.addEventListener('pointerup', up); knob.addEventListener('pointercancel', up);
  knob.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 0.08 : 0.02;
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { setSpectrum(n + step); e.preventDefault(); }
    if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { setSpectrum(n - step); e.preventDefault(); }
    if (e.key === 'Home') { setSpectrum(0); e.preventDefault(); }
    if (e.key === 'End') { setSpectrum(0.999); e.preventDefault(); }
  });
  setSpectrum(0);
})();

/* ---------- Proyectos: track horizontal pinned ---------- */
(() => {
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1001px)', () => {
    const track = $('#htrack');
    const dist = () => track.scrollWidth - window.innerWidth;
    const tween = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: '#proyectos', start: 'top top', end: () => '+=' + dist(),
        pin: '.proj-pin', scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: (self) => { $('#proj-now').textContent = String(Math.min(4, Math.floor(self.progress * 4) + 1)).padStart(2, '0'); },
      },
    });
    $$('.slide').forEach((s) => {
      const m = $('.slide-media img', s);
      if (m) gsap.fromTo(m, { xPercent: -6, scale: 1.12 }, {
        xPercent: 6, ease: 'none',
        scrollTrigger: { trigger: s, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
      });
    });
    return () => { tween.scrollTrigger && tween.scrollTrigger.kill(); };
  });
  // video Rapa Nui: play solo cuando la slide es visible
  const vid = $('.slide-media video');
  if (vid) {
    new IntersectionObserver((es) => { es[0].isIntersecting ? vid.play().catch(() => {}) : vid.pause(); }, { threshold: 0.4 }).observe(vid);
  }
})();

/* ---------- Capacidades: Ken Burns sutil al scroll ---------- */
if (!reduce) {
  $$('.cap-media img').forEach((img) => {
    gsap.fromTo(img, { yPercent: -5 }, {
      yPercent: 5, ease: 'none',
      scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
    });
  });
}

/* ---------- CTA band: video ambiente ---------- */
(() => {
  const band = $('.cta-band');
  if (!band) return;
  const v = document.createElement('video');
  v.src = './assets/videos/cta-loop.mp4';
  v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute('aria-hidden', 'true');
  v.preload = 'metadata';
  band.prepend(v);
  new IntersectionObserver((es) => { es[0].isIntersecting ? v.play().catch(() => {}) : v.pause(); }, { threshold: 0.3 }).observe(band);
})();

/* ---------- v1.1: tilt 3D de puntero (lenguaje awwwards-3d) ---------- */
(() => {
  if (reduce || !matchMedia('(pointer: fine)').matches) return;
  $$('[data-tilt]').forEach((el) => {
    gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.01 });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, { rotationY: x * 8, rotationX: -y * 8, transformPerspective: 1000, duration: 0.6, ease: 'power2.out' });
    });
    el.addEventListener('pointerleave', () => {
      gsap.to(el, { rotationX: 0, rotationY: 0, duration: 1.1, ease: 'elastic.out(1, 0.45)' });
    });
  });
})();

/* ---------- v1.1: despliegue keynote con perspectiva en stacks ---------- */
if (!reduce) {
  $$('.prod').forEach((prod) => {
    const st = $('.pstack', prod);
    if (!st) return;
    gsap.fromTo(st, { rotationX: 10, scale: 0.94 }, {
      rotationX: 0, scale: 1, transformPerspective: 1100, ease: 'none',
      scrollTrigger: { trigger: prod, start: 'top 88%', end: 'top 38%', scrub: 0.6 },
    });
  });
  const cb = $('.cover-bg');
  if (cb) gsap.fromTo(cb, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.cat-cover', start: 'top bottom', end: 'bottom top', scrub: 0.7 } });
}

/* ---------- v1.2: botones magnéticos ---------- */
if (!reduce && matchMedia('(pointer: fine)').matches) {
  $$('.btn').forEach((b) => {
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4, ease: 'power2.out' });
    });
    b.addEventListener('pointerleave', () => gsap.to(b, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' }));
  });
}
