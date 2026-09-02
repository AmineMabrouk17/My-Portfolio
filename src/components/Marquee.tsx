"use client";

import { useEffect, useRef } from "react";
import { gsap, Observer } from "@/lib/gsap";

/* ------------------------------------------------------------------ */
/*  horizontalLoop — canonical helper from GSAP docs                   */
/*  https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop     */
/* ------------------------------------------------------------------ */
interface HorizontalLoopConfig {
  repeat?: number;
  paused?: boolean;
  speed?: number;
  paddingRight?: number;
  snap?: false | number;
  reversed?: boolean;
}

function horizontalLoop(
  items: gsap.DOMTarget,
  config: HorizontalLoopConfig = {},
) {
  const targets = gsap.utils.toArray<HTMLElement>(items);
  config = config || {};
  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete() {
      tl.totalTime(tl.rawTime() + tl.duration() * 100);
    },
  });

  const length = targets.length;
  const startX = targets[0].offsetLeft;
  const times: number[] = [];
  const widths: number[] = [];
  const xPercents: number[] = [];
  let curIndex = 0;
  const pixelsPerSecond = (config.speed || 1) * 100;
  const snap =
    config.snap === false
      ? (v: number) => v
      : gsap.utils.snap(config.snap || 1);
  let curX: number;
  let distanceToStart: number;
  let distanceToLoop: number;
  let item: HTMLElement;
  let i: number;

  gsap.set(targets, {
    xPercent: (index) => {
      const current = targets[index as number];
      const w = (widths[index as number] = parseFloat(
        gsap.getProperty(current, "width", "px") as string,
      ));
      xPercents[index as number] = snap(
        (parseFloat(gsap.getProperty(current, "x", "px") as string) / w) *
          100 +
          (gsap.getProperty(current, "xPercent") as number),
      );
      return xPercents[index as number];
    },
  });

  gsap.set(targets, { x: 0 });

  const totalWidth =
    targets[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    targets[length - 1].offsetWidth *
      (gsap.getProperty(targets[length - 1], "scaleX") as number) +
    (parseFloat(String(config.paddingRight)) || 0);

  for (i = 0; i < length; i++) {
    item = targets[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);

    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0,
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond,
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);

    times[i] = distanceToStart / pixelsPerSecond;
  }

  function toIndex(index: number, vars?: gsap.TweenVars) {
    vars = vars || {};
    if (Math.abs(index - curIndex) > length / 2) {
      index += index > curIndex ? -length : length; // always go the shortest direction
    }
    const unwrap = gsap.utils.wrap(0, length);
    const newIndex = unwrap(index);
    let time = times[newIndex];

    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = {
        time: gsap.utils.wrap(0, tl.duration()),
      };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }

  (tl as gsap.core.Timeline & Record<string, unknown>).next = (vars?: gsap.TweenVars) =>
    toIndex(curIndex + 1, vars);
  (tl as gsap.core.Timeline & Record<string, unknown>).previous = (
    vars?: gsap.TweenVars,
  ) => toIndex(curIndex - 1, vars);
  (tl as gsap.core.Timeline & Record<string, unknown>).current = () => curIndex;
  (tl as gsap.core.Timeline & Record<string, unknown>).toIndex = (
    index: number,
    vars?: gsap.TweenVars,
  ) => toIndex(index, vars);

  (tl as gsap.core.Timeline & Record<string, unknown>).times = times;

  tl.progress(1, true).progress(0, true);

  if (config.reversed) {
    (tl.vars as { onReverseComplete?: () => void }).onReverseComplete?.();
    tl.reverse();
  }

  return tl;
}

/* ------------------------------------------------------------------ */
/*  Marquee component                                                 */
/* ------------------------------------------------------------------ */

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
    const loops: ReturnType<typeof horizontalLoop>[] = [];
    let observer: ReturnType<typeof Observer.create> | null = null;

    // Base direction for each row: even rows move forward (+1),
    // odd rows move in reverse (-1) to alternate the rhythm.
    const baseSigns = rowEls.map((_, i) => (i % 2 === 0 ? 1 : -1));

    rowEls.forEach((row, i) => {
      const items = Array.from(
        row.querySelectorAll<HTMLElement>("[data-marquee-item]"),
      );
      if (items.length === 0) return;

      const loop = horizontalLoop(items, {
        repeat: -1,
        paused: false,
        speed: 0.6,
      });
      loop.timeScale(baseSigns[i]);
      loops.push(loop);
    });

    if (loops.length > 0) {
      observer = Observer.create({
        type: "wheel,touch",
        onUp: () => {
          // Scrolling up: rows run forward (base direction)
          gsap.to(loops, {
            timeScale: (index: number) => baseSigns[index],
            duration: 0.3,
            overwrite: true,
          });
        },
        onDown: () => {
          // Scrolling down: reverse every row
          gsap.to(loops, {
            timeScale: (index: number) => -baseSigns[index],
            duration: 0.3,
            overwrite: true,
          });
        },
      });
    }

    return () => {
      loops.forEach((l) => l.kill());
      observer?.kill();
    };
  }, []);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div ref={containerRef} className={className}>
      {rows.map((items, rowIdx) => {
        const loopItems = [...items, ...items];

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
              {loopItems.map((text, itemIdx) => (
                <span
                  key={`${rowIdx}-${itemIdx}`}
                  data-marquee-item
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
