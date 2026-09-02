"use client";

import { useEffect, useRef } from "react";
import { gsap, Observer } from "@/lib/gsap";

export interface MarqueeProps {
  items: string[];
  className?: string;
}

export default function Marquee({ items, className }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (reducedRef.current) return;
    const row = containerRef.current?.querySelector<HTMLElement>(
      "[data-marquee-row]",
    );
    if (!row) return;

    // The row is built from two identical halves (data-marquee-half).
    // Animating the whole track to xPercent -50 shifts it by exactly one
    // half, which is identical to the other half — so the wrap is perfectly
    // seamless: nothing ever appears or disappears at the edges.
    const tween = gsap.to(row, {
      xPercent: -50,
      repeat: -1,
      duration: 30,
      ease: "none",
    });

    let observer: ReturnType<typeof Observer.create> | null = null;
    observer = Observer.create({
      type: "wheel,touch",
      onUp: () => {
        // Scrolling up: run forward
        gsap.to(tween, { timeScale: 1, duration: 0.3, overwrite: true });
      },
      onDown: () => {
        // Scrolling down: reverse
        gsap.to(tween, { timeScale: -1, duration: 0.3, overwrite: true });
      },
    });

    return () => {
      tween.kill();
      observer?.kill();
    };
  }, []);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Build one wide "half" by repeating the phrase set enough times that it is
  // always much wider than any viewport. The track duplicates this identical
  // half so the -50% wrap is seamless.
  const REPEATS = 6;
  const half: string[] = [];
  for (let i = 0; i < REPEATS; i++) {
    half.push(...items);
  }

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={className}>
        <div className="overflow-hidden py-2">
          <p className="text-center text-sm text-[var(--color-muted)]">
            {items.join(" • ")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      <div aria-hidden="true" className="overflow-hidden py-2">
        <div data-marquee-row className="flex w-max">
          {[half, half].map((group, gi) =>
            group.map((text, itemIdx) => (
              <span
                key={`${gi}-${itemIdx}`}
                data-marquee-half={gi}
                className="block shrink-0 whitespace-nowrap px-4 text-[clamp(1rem,2.5vw,1.5rem)] font-bold tracking-tight text-[var(--color-text)] opacity-80"
              >
                {text}
              </span>
            )),
          )}
        </div>
      </div>
    </div>
  );
}
