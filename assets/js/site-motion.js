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
    const canvas = document.querySelector('.point-cloud-panel__canvas');
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const visual = document.querySelector('.home-hero__visual');
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
    ellipsoid(0, -1.17, 0, .25, .29, .23, 55);
    ellipsoid(0, -.29, 0, .38, .63, .23, 105);
    ellipsoid(0, .46, 0, .31, .24, .22, 40);
    joints.forEach(([start, end], i) => limb(start, end, i < 4 ? .105 : .13, 25));

    let width = 0;
    let height = 0;
    let frameId = 0;
    let visible = true;
    let pointerAngle = 0;
    let smoothAngle = 0;

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (reducedMotion) draw(0);
    }
    function project(point, angle) {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x = point[0] * cos - point[2] * sin;
      const z = point[0] * sin + point[2] * cos;
      const perspective = 1 / (1 + z * .19);
      const scale = Math.min(width * .27, height * .22);
      return [width * .5 + x * scale * perspective, height * .48 + point[1] * scale * perspective, z];
    }
    function draw(time) {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      smoothAngle += (pointerAngle - smoothAngle) * .04;
      const angle = (reducedMotion ? .3 : time * .00026) + smoothAngle;
      context.strokeStyle = 'rgba(154, 216, 180, .10)';
      context.lineWidth = 1;
      context.beginPath();
      context.ellipse(width * .5, height * .49, width * .38, height * .43, 0, 0, Math.PI * 2);
      context.stroke();
      context.strokeStyle = 'rgba(174, 227, 193, .20)';
      joints.forEach(([start, end]) => {
        const a = project(start, angle);
        const b = project(end, angle);
        context.beginPath();
        context.moveTo(a[0], a[1]);
        context.lineTo(b[0], b[1]);
        context.stroke();
      });
      points.map((point) => project(point, angle)).sort((a, b) => b[2] - a[2]).forEach(([x, y, z]) => {
        const alpha = Math.max(.38, Math.min(.95, .72 - z * .38));
        context.fillStyle = `rgba(178, 235, 197, ${alpha})`;
        context.beginPath();
        context.arc(x, y, z < 0 ? 1.25 : .9, 0, Math.PI * 2);
        context.fill();
      });
    }
    function tick(time) {
      frameId = 0;
      if (!visible || document.hidden) return;
      draw(time);
      frameId = requestAnimationFrame(tick);
    }
    function resume() {
      if (!reducedMotion && visible && !document.hidden && !frameId) frameId = requestAnimationFrame(tick);
    }
    resize();
    if (reducedMotion) return;
    visual.addEventListener('pointermove', (event) => {
      const rect = visual.getBoundingClientRect();
      pointerAngle = ((event.clientX - rect.left) / rect.width - .5) * .75;
    }, { passive: true });
    visual.addEventListener('pointerleave', () => { pointerAngle = 0; });
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
    else window.addEventListener('resize', resize, { passive: true });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) resume();
        else if (frameId) { cancelAnimationFrame(frameId); frameId = 0; }
      }).observe(canvas);
    }
    document.addEventListener('visibilitychange', resume);
    resume();
  }

  function init() {
    revealOnScroll();
    animatePointCloud();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
