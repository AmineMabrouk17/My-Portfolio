"use client";

import { useEffect, useRef } from "react";
import { gsap, Observer } from "@/lib/gsap";

export interface MarqueeProps {
  rows: string[][];
  className?: string;
}

export default function Marquee({ rows, className }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (reducedRef.current) return;
    const rowEls = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>("[data-marquee-row]") ??
        [],
    );
    if (rowEls.length === 0) return;

    const baseSigns = rowEls.map((_, i) => (i % 2 === 0 ? 1 : -1));
    const tweens = rowEls.map((row, i) =>
      gsap.to(row, {
        xPercent: -50 * baseSigns[i],
        repeat: -1,
        duration: 60,
        ease: "none",
      }),
    );

    let observer: ReturnType<typeof Observer.create> | null = null;
    observer = Observer.create({
      type: "wheel,touch",
      onUp: () => {
        // Scrolling up: run forward (base direction)
        gsap.to(tweens, {
          timeScale: (index: number) => baseSigns[index],
          duration: 0.3,
          overwrite: true,
        });
      },
      onDown: () => {
        // Scrolling down: reverse every row
        gsap.to(tweens, {
          timeScale: (index: number) => -baseSigns[index],
          duration: 0.3,
          overwrite: true,
        });
      },
    });

    return () => {
      tweens.forEach((tw) => tw.kill());
      observer?.kill();
    };
  }, []);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Build one wide "half" per row by repeating the phrase set enough times so
  // it is always much wider than any viewport. Each track duplicates this
  // identical half so the -50% wrap is seamless: nothing pops at the edges.
  const REPEATS = 6;

  function buildHalf(items: string[]) {
    const half: string[] = [];
    for (let i = 0; i < REPEATS; i++) {
      half.push(...items);
    }
    return half;
  }

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={className}>
        {rows.map((items, r) => (
          <div key={r} className="overflow-hidden py-2">
            <p className="text-center text-sm text-[var(--color-muted)]">
              {items.join(" • ")}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      {rows.map((items, r) => {
        const half = buildHalf(items);
        return (
          <div key={r} aria-hidden="true" className="overflow-hidden py-2">
            <div data-marquee-row className="flex w-max">
              {[half, half].map((group, gi) =>
                group.map((text, itemIdx) => (
                  <span
                    key={`${r}-${gi}-${itemIdx}`}
                    className="block shrink-0 whitespace-nowrap px-4 text-[clamp(1rem,2.5vw,1.5rem)] font-bold tracking-tight text-[var(--color-text)] opacity-80"
                  >
                    {text}
                  </span>
                )),
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
