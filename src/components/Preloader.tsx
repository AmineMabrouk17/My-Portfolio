"use client";

import { useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader() {
  const [show] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return false;
    return sessionStorage.getItem("preloaderSeen") !== "1";
  });
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!show) return;

    document.body.style.overflow = "hidden";

    const timers: ReturnType<typeof setTimeout>[] = [];
    const done = { current: false };

    const tl = gsap.timeline();

    const counter = { value: 0 };
    const counterEl = document.querySelector<HTMLElement>(".preloader-counter");

    tl.to(".preloader-line", {
      scaleX: 1,
      duration: 1.2,
      ease: "none",
    })
      .to(
        counter,
        {
          value: 100,
          duration: 1.2,
          ease: "none",
          onUpdate() {
            if (counterEl)
              counterEl.textContent = `${Math.round(counter.value)}%`;
          },
        },
        "<"
      )
      .to(
        ".preloader-text",
        {
          keyframes: [
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1 },
            { scale: 1.05 },
            { scale: 1 },
          ],
          duration: 1.2,
          ease: "power3.inOut",
        },
        "<"
      );

    const complete = () => {
      if (done.current) return;
      done.current = true;

      timers.forEach(clearTimeout);

      sessionStorage.setItem("preloaderSeen", "1");
      window.dispatchEvent(new CustomEvent("preloader:done"));

      tl.to("#preloader", {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          document.body.style.overflow = "";
          setDismissed(true);
        },
      });
    };

    timers.push(setTimeout(complete, 1800));
    window.addEventListener("load", complete);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", complete);
      document.body.style.overflow = "";
      tl.kill();
    };
  }, [show]);

  if (!show || dismissed) return null;

  return (
    <div
      id="preloader"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white"
    >
      <p className="preloader-text text-4xl font-light tracking-widest opacity-0">
        AM
      </p>
      <div className="mt-8 h-px w-40 overflow-hidden">
        <div className="preloader-line h-full w-full origin-left scale-x-0 bg-white" />
      </div>
      <p className="preloader-text preloader-counter mt-4 text-sm tabular-nums opacity-0">
        0%
      </p>
    </div>
  );
}
