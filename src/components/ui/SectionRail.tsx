"use client";

import { useEffect, useRef, useState } from "react";
import s from "./section-rail.module.css";

/**
 * The bench index: a fixed rail down the right edge that carries the reader's
 * position through the page. The marker tracks scroll, the active section is
 * the one crossing the middle of the viewport, and the numbers are the same
 * mono voice the sections use.
 *
 * It is navigation first — every item is a link — and the motion is the
 * scroll relationship itself, not decoration.
 */
const SECTIONS = [
  { id: "about", num: "01", label: "About" },
  { id: "skills", num: "02", label: "Skills" },
  { id: "experience", num: "03", label: "Experience" },
  { id: "projects", num: "04", label: "Projects" },
  { id: "contact", num: "05", label: "Contact" },
] as const;

export default function SectionRail() {
  const railRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        // The line sits at the vertical middle of the viewport.
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((io) => io.disconnect());
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      rail.style.setProperty("--p", p.toFixed(4));
      // The hero owns the first viewport; the index belongs to the page below it.
      rail.dataset.shown = window.scrollY > window.innerHeight * 0.55 ? "true" : "false";
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav ref={railRef} className={s.rail} aria-label="Sections">
      <span className={s.line} aria-hidden="true">
        <span className={s.fill} />
      </span>
      <ul className={s.list}>
        {SECTIONS.map(({ id, num, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`${s.item} ${active === id ? s.on : ""}`}
              aria-current={active === id ? "true" : undefined}
            >
              <span className={s.num}>{num}</span>
              <span className={s.label}>{label}</span>
              <span className={s.tick} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
