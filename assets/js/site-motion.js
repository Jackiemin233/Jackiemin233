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

  function animatePointCloud() {
    const panel = document.querySelector('.point-cloud-panel');
    const canvas = panel && panel.querySelector('.point-cloud-panel__canvas');
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const visual = document.querySelector('.home-hero__visual');
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionPreference.matches;
    let seed = 17;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const points = [];
    const joints = [
      [[-.34, -.75, 0], [-.62, -.12, 0]], [[-.62, -.12, 0], [-.72, .48, 0]],
      [[.34, -.75, 0], [.62, -.12, 0]], [[.62, -.12, 0], [.72, .48, 0]],
      [[-.18, .55, 0], [-.26, 1.2, 0]], [[-.26, 1.2, 0], [-.29, 1.8, 0]],
      [[.18, .55, 0], [.26, 1.2, 0]], [[.26, 1.2, 0], [.29, 1.8, 0]]
    ];

    function ellipsoid(cx, cy, cz, rx, ry, rz, count) {
      for (let i = 0; i < count; i++) {
        const latitude = Math.acos(2 * random() - 1);
        const longitude = random() * Math.PI * 2;
        points.push([
          cx + rx * Math.sin(latitude) * Math.cos(longitude),
          cy + ry * Math.cos(latitude),
          cz + rz * Math.sin(latitude) * Math.sin(longitude)
        ]);
      }
    }
    function limb(start, end, radius, count) {
      const dx = end[0] - start[0];
      const dy = end[1] - start[1];
      const length = Math.hypot(dx, dy);
      for (let i = 0; i < count; i++) {
        const t = random();
        const a = random() * Math.PI * 2;
        points.push([
          start[0] + dx * t - dy / length * radius * Math.cos(a),
          start[1] + dy * t + dx / length * radius * Math.cos(a),
          radius * Math.sin(a)
        ]);
      }
    }
    ellipsoid(0, -1.17, 0, .25, .29, .23, 45);
    ellipsoid(0, -.29, 0, .38, .63, .23, 80);
    ellipsoid(0, .46, 0, .31, .24, .22, 30);
    joints.forEach(([start, end], index) => limb(start, end, index < 4 ? .105 : .13, 18));

    let width = 0;
    let height = 0;
    let frameId = 0;
    let visible = true;
    let angle = .28;
    let pointerTarget = 0;
    let pointerOffset = 0;
    let lastFrame = 0;
    let lastPaint = 0;

    function project(point, cosine, sine) {
      const x = point[0] * cosine - point[2] * sine;
      const z = point[0] * sine + point[2] * cosine;
      const perspective = 1 / (1 + z * .19);
      const scale = Math.min(width * .27, height * .22);
      return [width * .5 + x * scale * perspective, height * .48 + point[1] * scale * perspective, z];
    }
    function paint() {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const cosine = Math.cos(angle + pointerOffset);
      const sine = Math.sin(angle + pointerOffset);
      context.strokeStyle = 'rgba(154, 216, 180, .10)';
      context.lineWidth = 1;
      context.beginPath();
      context.ellipse(width * .5, height * .49, width * .38, height * .43, 0, 0, Math.PI * 2);
      context.stroke();
      context.strokeStyle = 'rgba(174, 227, 193, .20)';
      joints.forEach(([start, end]) => {
        const a = project(start, cosine, sine);
        const b = project(end, cosine, sine);
        context.beginPath();
        context.moveTo(a[0], a[1]);
        context.lineTo(b[0], b[1]);
        context.stroke();
      });
      points.forEach((point) => {
        const [x, y, z] = project(point, cosine, sine);
        const alpha = Math.max(.48, Math.min(.9, .7 - z * .28));
        context.fillStyle = `rgba(178, 235, 197, ${alpha})`;
        context.beginPath();
        context.arc(x, y, 1.05 - z * .16, 0, Math.PI * 2);
        context.fill();
      });
      panel.classList.add('is-ready');
    }
    function resize() {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      const pixelWidth = Math.round(bounds.width * ratio);
      const pixelHeight = Math.round(bounds.height * ratio);
      if (!pixelWidth || !pixelHeight) return;
      if (canvas.width === pixelWidth && canvas.height === pixelHeight) return;
      width = bounds.width;
      height = bounds.height;
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      paint();
    }
    function stop() {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
      lastFrame = 0;
    }
    function tick(time) {
      frameId = 0;
      if (!visible || document.hidden || reducedMotion) return;
      const elapsed = lastFrame ? Math.min(time - lastFrame, 50) : 0;
      lastFrame = time;
      angle = (angle + elapsed * .00024) % (Math.PI * 2);
      pointerOffset += (pointerTarget - pointerOffset) * Math.min(1, elapsed * .006);
      if (time - lastPaint >= 32) {
        paint();
        lastPaint = time;
      }
      frameId = requestAnimationFrame(tick);
    }
    function start() {
      if (!reducedMotion && visible && !document.hidden && !frameId) {
        lastFrame = 0;
        frameId = requestAnimationFrame(tick);
      }
    }

    resize();
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
    else window.addEventListener('resize', resize, { passive: true });
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && visual) {
      visual.addEventListener('pointermove', (event) => {
        const rect = visual.getBoundingClientRect();
        pointerTarget = ((event.clientX - rect.left) / rect.width - .5) * .65;
      }, { passive: true });
      visual.addEventListener('pointerleave', () => { pointerTarget = 0; });
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      }, { rootMargin: '160px 0px' }).observe(panel);
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });
    window.addEventListener('pageshow', start);
    const onMotionChange = (event) => {
      reducedMotion = event.matches;
      if (reducedMotion) {
        stop();
        pointerTarget = 0;
        pointerOffset = 0;
        paint();
      } else start();
    };
    if (motionPreference.addEventListener) motionPreference.addEventListener('change', onMotionChange);
    else motionPreference.addListener(onMotionChange);
    start();
  }

  function init() {
    revealOnScroll();
    animatePointCloud();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
