(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealOnScroll() {
    if (reducedMotion || !('IntersectionObserver' in window)) return;
    const nodes = document.querySelectorAll([
      '.home-about', '.home-selected .section-heading', '.selected-paper', '.home-contact',
      '.pub-group__header', '.pub-group__subhead', '.pub-group .list__item',
      '.cv-topline', '.cv-index', '.cv-section__heading', '.cv-entry',
      '.cv-paper-group', '.cv-paper-subgroup', '.cv-paper', '.cv-skill',
      '.cv-awards li', '.cv-service'
    ].join(', '));
    const pending = [];
    nodes.forEach((node, index) => {
      if (node.getBoundingClientRect().top < window.innerHeight * 0.92) return;
      node.classList.add('reveal-item');
      node.style.setProperty('--reveal-delay', `${(index % 3) * 55}ms`);
      pending.push(node);
    });
    if (!pending.length) return;
    document.documentElement.classList.add('js-motion');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.06 });
    pending.forEach((node) => observer.observe(node));
  }

  function animateAmbientParticles() {
    const canvas = document.querySelector('.ambient-particles');
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduceMotion = motionPreference.matches;
    let seed = 233;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    let particles = [];
    let width = 0;
    let height = 0;
    let frameId = 0;
    let visible = true;
    let lastPaint = 0;
    const colors = ['94, 139, 113', '129, 156, 141', '167, 182, 173'];

    function paint() {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        context.fillStyle = `rgba(${colors[particle.color]}, ${particle.alpha})`;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
    }
    function resize() {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const pixelWidth = Math.round(bounds.width * ratio);
      const pixelHeight = Math.round(bounds.height * ratio);
      if (!pixelWidth || !pixelHeight) return;
      if (canvas.width === pixelWidth && canvas.height === pixelHeight) return;
      width = bounds.width;
      height = bounds.height;
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(72, Math.max(18, Math.round(width * height / 15000)));
      particles = Array.from({ length: count }, () => ({
        x: random() * width,
        y: random() * height,
        radius: .9 + random() * 1.5,
        alpha: .20 + random() * .22,
        color: Math.floor(random() * colors.length),
        dx: (random() - .5) * 4,
        dy: -2.5 - random() * 4
      }));
      paint();
    }
    function stop() {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
      lastPaint = 0;
    }
    function tick(time) {
      frameId = 0;
      if (!visible || document.hidden || reduceMotion) return;
      if (!lastPaint || time - lastPaint >= 33) {
        const seconds = lastPaint ? Math.min(time - lastPaint, 50) / 1000 : 0;
        particles.forEach((particle) => {
          particle.x += particle.dx * seconds;
          particle.y += particle.dy * seconds;
          if (particle.y < -particle.radius) particle.y = height + particle.radius;
          if (particle.x < -particle.radius) particle.x = width + particle.radius;
          if (particle.x > width + particle.radius) particle.x = -particle.radius;
        });
        paint();
        lastPaint = time;
      }
      frameId = requestAnimationFrame(tick);
    }
    function start() {
      if (!reduceMotion && visible && !document.hidden && !frameId) {
        lastPaint = 0;
        frameId = requestAnimationFrame(tick);
      }
    }

    resize();
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
    else window.addEventListener('resize', resize, { passive: true });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      }, { rootMargin: '160px 0px' }).observe(canvas);
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });
    window.addEventListener('pageshow', start);
    const onMotionChange = (event) => {
      reduceMotion = event.matches;
      if (reduceMotion) {
        stop();
        paint();
      } else start();
    };
    if (motionPreference.addEventListener) motionPreference.addEventListener('change', onMotionChange);
    else motionPreference.addListener(onMotionChange);
    start();
  }

  function init() {
    revealOnScroll();
    animateAmbientParticles();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
