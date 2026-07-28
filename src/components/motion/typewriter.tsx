"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const WORD_INTERVAL = 180;
const DISPLAY_DURATION = 2200;

export function Typewriter({
  words,
  className,
}: {
  words: string[];
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const dirRef = useRef<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentPhrase = words[wordIndex % words.length] ?? "";
  const tokens = currentPhrase.split(" ");

  useEffect(() => {
    if (reduceMotion) return;

    const tick = () => {
      if (dirRef.current === 1) {
        if (visibleCount < tokens.length) {
          setVisibleCount((c) => c + 1);
          timerRef.current = setTimeout(tick, WORD_INTERVAL);
        } else {
          dirRef.current = -1;
          timerRef.current = setTimeout(tick, DISPLAY_DURATION);
        }
      } else {
        if (visibleCount > 0) {
          setVisibleCount((c) => c - 1);
          timerRef.current = setTimeout(tick, 50);
        } else {
          dirRef.current = 1;
          setWordIndex((i) => (i + 1) % words.length);
          timerRef.current = setTimeout(tick, WORD_INTERVAL);
        }
      }
    };

    timerRef.current = setTimeout(tick, visibleCount === 0 ? 0 : WORD_INTERVAL);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visibleCount, tokens.length, wordIndex, words.length, reduceMotion]);

  if (reduceMotion) {
    return <span className={className}>{currentPhrase}</span>;
  }

  return (
    <span className={className}>
      {tokens.map((token, i) => (
        <motion.span
          key={`${wordIndex}-${i}`}
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={
            i < visibleCount
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: -8, filter: "blur(4px)" }
          }
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block mr-[0.35em] whitespace-nowrap"
        >
          {token}
        </motion.span>
      ))}
    </span>
  );
}
