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
    const container = containerRef.current;
    if (!container) return;

    const rowEls = Array.from(
      container.querySelectorAll<HTMLElement>("[data-marquee-row]"),
    );

    // Base direction for each row: even rows move forward (+1),
    // odd rows move in reverse (-1) to alternate the rhythm.
    const baseSigns = rowEls.map((_, i) => (i % 2 === 0 ? 1 : -1));

    const tweens = rowEls.map((row, i) =>
      gsap.to(row, {
        xPercent: -50 * baseSigns[i],
        repeat: -1,
        duration: 30,
        ease: "none",
      }),
    );

    let observer: ReturnType<typeof Observer.create> | null = null;

    if (tweens.length > 0) {
      observer = Observer.create({
        type: "wheel,touch",
        onUp: () => {
          // Scrolling up: rows run forward (base direction)
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
    }

    return () => {
      tweens.forEach((tw) => tw.kill());
      observer?.kill();
    };
  }, []);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div ref={containerRef} className={className}>
      {rows.map((items, rowIdx) => {
        // Duplicate each row's content once. The row is animated to
        // xPercent -50, so the second identical half exactly replaces the
        // first — a perfectly seamless wrap with no visible seam or pop.
        const track = [...items, ...items];

        if (prefersReducedMotion) {
          return (
            <div key={rowIdx} className="overflow-hidden py-2">
              <p className="text-center text-sm text-[var(--color-muted)]">
                {items.join(" • ")}
              </p>
            </div>
          );
        }

        return (
          <div key={rowIdx} aria-hidden="true" className="overflow-hidden py-2">
            <div data-marquee-row className="flex w-max">
              {track.map((text, itemIdx) => (
                <span
                  key={`${rowIdx}-${itemIdx}`}
                  className="block shrink-0 whitespace-nowrap px-4 text-[clamp(1rem,2.5vw,1.5rem)] font-bold tracking-tight text-[var(--color-text)] opacity-80"
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
