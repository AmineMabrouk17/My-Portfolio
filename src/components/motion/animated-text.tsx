"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ElementType,
} from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Layout effect timing hides each word beneath its mask before the first
// paint, preventing a flash of unmasked text; the useEffect fallback avoids
// the SSR warning.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type AnimatedTextProps = {
  /** Full sentence to split into masked, staggered words. */
  text: string;
  /** Element to render. */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  /** Delay before the first word moves, in seconds. */
  delay?: number;
  /** Time between consecutive word starts, in seconds. */
  stagger?: number;
  /** Per-word travel time, in seconds. */
  duration?: number;
  /** ScrollTrigger start position. */
  threshold?: string;
};

export function AnimatedText({
  text,
  as: Tag = "p",
  className,
  delay = 0,
  stagger = 0.03,
  duration = 0.9,
  threshold = "top 85%",
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ").filter(Boolean);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || words.length === 0) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-animated-text-word]"),
        { yPercent: 115 },
        {
          yPercent: 0,
          duration,
          delay,
          stagger,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: threshold,
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [text, delay, stagger, duration, threshold]);

  if (words.length === 0) return null;

  const Component = Tag as ElementType;

  return (
    // Full sentence lives on the label so screen readers hear one fluent
    // phrase instead of fragmented words.
    <Component ref={ref} aria-label={text} className={cn(className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-top"
          style={
            i < words.length - 1
              ? { marginInlineEnd: "0.25em" }
              : undefined
          }
        >
          <span
            data-animated-text-word
            className="inline-block will-change-transform"
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
