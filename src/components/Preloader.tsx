"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap";

const noopSubscribe = () => () => {};

/**
 * Arrival wordmark. Shows once per session, never fabricates a loading
 * percentage, and can always be dismissed (click or Escape).
 */
export default function Preloader() {
  // Client-only by design: the server snapshot is `false`, so hydration
  // matches and the overlay only appears once we can read sessionStorage.
  const show = useSyncExternalStore(
    noopSubscribe,
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return false;
      }
      return sessionStorage.getItem("preloaderSeen") !== "1";
    },
    () => false
  );
  const [dismissed, setDismissed] = useState(false);
  const completeRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!show) return;

    document.body.style.overflow = "hidden";
    let done = false;

    const complete = () => {
      if (done) return;
      done = true;

      sessionStorage.setItem("preloaderSeen", "1");
      window.dispatchEvent(new CustomEvent("preloader:done"));

      gsap.to("#preloader", {
        yPercent: -100,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          document.body.style.overflow = "";
          setDismissed(true);
        },
      });
    };

    completeRef.current = complete;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") complete();
    };

    window.addEventListener("load", complete);
    window.addEventListener("keydown", onKey);

    gsap.fromTo(
      ".preloader-text",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
    gsap.fromTo(
      ".preloader-line",
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: "power2.out" }
    );

    // Cap the wait: the wordmark is a greeting, not a progress bar.
    const timer = setTimeout(complete, 600);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", complete);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      gsap.killTweensOf("#preloader");
    };
  }, [show]);

  if (!show || dismissed) return null;

  return (
    <div
      id="preloader"
      role="status"
      aria-live="polite"
      onClick={() => completeRef.current()}
      className="fixed inset-0 z-[9999] flex cursor-pointer flex-col items-center justify-center bg-black text-white"
    >
      <span className="sr-only">Loading</span>
      <p className="preloader-text text-4xl font-light tracking-widest opacity-0">
        AM
      </p>
      <div className="mt-8 h-px w-40 overflow-hidden">
        <div className="preloader-line h-full w-full origin-left scale-x-0 bg-white" />
      </div>
    </div>
  );
}
