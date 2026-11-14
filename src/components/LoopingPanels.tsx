"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const REPEATS = 4;
const ACCENTS = ["bg-[#ff6b6b]", "bg-[#ffa94d]", "bg-[#FFE566]"];

/**
 * Inter-section looping strip (GSAP-6).
 *
 * A 56px band of repeated labels that scrolls forever without a seam, and
 * flips direction when the page scroll is reversed. Decorative only, so the
 * whole strip is hidden from assistive tech, and `prefers-reduced-motion`
 * leaves it parked as a static band.
 */
export default function LoopingPanels({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  const stripRef = useRef<HTMLElement>(null);
  const items = t("strip.items")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  useEffect(() => {
    const strip = stripRef.current;
    const track = strip?.querySelector<HTMLElement>("[data-loop-track]");
    if (!strip || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let direction = 1;
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 48,
      ease: "none",
      repeat: -1,
    });

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (self.direction === direction) return;
        direction = self.direction;
        gsap.to(tween, {
          timeScale: direction,
          duration: 0.5,
          overwrite: true,
        });
      },
    });

    return () => {
      trigger.kill();
      tween.kill();
    };
  }, [items.length]);

  return (
    <section
      ref={stripRef}
      data-looping-panels
      aria-hidden="true"
      className={`relative flex h-14 items-center overflow-hidden border-y border-white/[0.08] bg-[var(--color-surface)]/40 select-none ${className}`}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />
      <div data-loop-track className="flex w-max items-center will-change-transform">
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0 items-center">
            {Array.from({ length: REPEATS }).flatMap((_, repeat) =>
              items.map((item, index) => {
                const accent = ACCENTS[(repeat * items.length + index) % ACCENTS.length];
                return (
                  <span key={`${repeat}-${index}`} className="flex shrink-0 items-center">
                    <span className="whitespace-nowrap px-7 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/45 max-sm:text-[10px]">
                      {item}
                    </span>
                    <span className={`h-1.5 w-1.5 rotate-45 ${accent}`} />
                  </span>
                );
              }),
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
