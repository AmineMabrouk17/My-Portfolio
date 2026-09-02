"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STRIP_TEXT =
  "// SELECTED WORK // 2026 // BUILD FAST // SHIP SECURELY // ";

export default function LoopingPanels() {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const row = rowRef.current;
    if (!row) return;

    const tween = gsap.to(row, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "none",
    });

    const st = ScrollTrigger.create({
      trigger: row,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        tween.timeScale(self.direction);
      },
    });

    return () => {
      st.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      className="relative h-14 overflow-hidden border-y border-border will-change-transform"
      aria-hidden="true"
    >
      <div ref={rowRef} className="flex h-full items-center whitespace-nowrap">
        <span className="shrink-0 px-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {STRIP_TEXT}
        </span>
        <span className="shrink-0 px-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {STRIP_TEXT}
        </span>
      </div>
    </div>
  );
}
