"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_AFTER_TYPING = 2000;
const PAUSE_AFTER_DELETING = 500;

export function Typewriter({
  words,
  className,
}: {
  words: string[];
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = words[wordIndex % words.length] ?? "";

  useEffect(() => {
    if (reduceMotion) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentWord.length) {
            setCharIndex((i) => i + 1);
          } else {
            setIsDeleting(true);
          }
        } else {
          if (charIndex > 0) {
            setCharIndex((i) => i - 1);
          } else {
            setIsDeleting(false);
            setWordIndex((i) => (i + 1) % words.length);
          }
        }
      },
      isDeleting
        ? charIndex === 0
          ? PAUSE_AFTER_DELETING
          : DELETING_SPEED
        : charIndex === currentWord.length
          ? PAUSE_AFTER_TYPING
          : TYPING_SPEED,
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentWord, wordIndex, words.length, reduceMotion]);

  if (reduceMotion) {
    return <span className={className}>{words[0] ?? ""}</span>;
  }

  return (
    <span className={className}>
      {currentWord.slice(0, charIndex)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block ml-[1px] w-[2px] h-[0.85em] bg-[var(--color-accent)] align-middle"
      />
    </span>
  );
}
