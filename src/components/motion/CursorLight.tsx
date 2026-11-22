"use client";

import { useEffect, useRef } from "react";

/**
 * A slow ember lamp that follows the pointer. It is light, not decoration:
 * a very low-opacity warm radial that only exists on precise-pointer devices,
 * stays out of the way of text, and disables itself under reduced motion.
 */
export default function CursorLight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let tx = x;
    let ty = y;
    let raf = 0;
    let idle = 0;

    const render = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`;
      raf = requestAnimationFrame(render);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = "1";
      idle = window.setTimeout(() => {
        el.style.opacity = "0.35";
      }, 900);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      window.clearTimeout(idle);
    };
  }, []);

  return <div ref={ref} className="cursor-light" aria-hidden="true" />;
}
