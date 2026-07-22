"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="#top"
      className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] grid place-items-center text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-200 hover:-translate-y-1 z-50"
      style={{ boxShadow: "var(--shadow)" }}
      aria-label="Back to top"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </a>
  );
}
