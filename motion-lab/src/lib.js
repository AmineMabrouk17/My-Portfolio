/* Deterministic frame clock. Every prototype is a pure function of t (ms),
   so a capture can seek to any instant and get the same pixels. */
window.addEventListener("error", (e) => { window.__err = String(e.message || e); });
window.addEventListener("unhandledrejection", (e) => { window.__err = String(e.reason && e.reason.stack || e.reason); });

window.L = (() => {
  const clamp = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
  const lerp = (a, b, p) => a + (b - a) * p;
  // 0..1 window: returns progress inside [start, start+dur]
  const prog = (t, start, dur) => clamp((t - start) / dur);
  const easeOut = (p) => 1 - Math.pow(1 - p, 3);
  const easeOutExpo = (p) => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p));
  const easeInOut = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
  const easeOutQuint = (p) => 1 - Math.pow(1 - p, 5);
  const mix = (t, start, end, from, to, ease = easeOut) =>
    lerp(from, to, ease(prog(t, start, end - start)));
  // deterministic pseudo-random
  const rnd = (seed) => {
    const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  };
  const set = (el, props) => {
    if (!el._s) el._s = {};
    for (const k in props) {
      if (el._s[k] === props[k]) continue;
      el._s[k] = props[k];
      el.style[k] = props[k];
    }
  };
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => [...r.querySelectorAll(s)];
  const ready = () =>
    Promise.all([
      document.fonts.ready,
      ...[...document.images].map((i) => (i.complete ? 0 : i.decode().catch(() => 0))),
    ]);
  return { clamp, lerp, prog, easeOut, easeOutExpo, easeInOut, easeOutQuint, mix, rnd, set, q, qa, ready };
})();

window.__seek = (t) => {
  if (window.render) window.render(t);
  document.documentElement.setAttribute("data-t", String(t));
};

(async () => {
  await document.fonts.ready;
  await L.ready();
  window.__duration = window.DURATION || 6000;
  window.__seek(0);
  window.__ready = true;

  // Live playback for the browser. Capture runs pass ?capture so the clock
  // stays under the harness's control instead.
  if (location.search.indexOf("capture") === -1) {
    const start = performance.now();
    const loop = () => {
      window.__seek((performance.now() - start) % window.__duration);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
})();
