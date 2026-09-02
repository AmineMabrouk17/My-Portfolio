"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, CustomWiggle } from "@/lib/gsap";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

export function MagneticButton({
  children,
  strength = 0.35,
  className,
  href,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && "ontouchstart" in window) return;

    let wiggleEase: number | ((progress: number) => number) | string =
      "back.out(1.4)";
    try {
      wiggleEase = CustomWiggle.create("magneticWiggle", {
        wiggles: 3,
        type: "easeOut",
      });
    } catch {
      wiggleEase = "back.out(1.4)";
    }

    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - (left + width / 2)) * strength;
      const y = (e.clientY - (top + height / 2)) * strength;
      gsap.to(el, {
        x,
        y,
        duration: 0.35,
        ease: "power2.out",
        force3D: true,
        overwrite: true,
      });
    };
    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.9,
        ease: wiggleEase,
        force3D: true,
        overwrite: true,
      });
    };
    const onEnter = () => {
      el.style.willChange = "transform";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onEnter);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseenter", onEnter);
    };
  }, [strength]);

  const cls = `${className ?? ""} inline-block will-change-transform`;

  if (href) {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} className={cls} {...props}>
      {children}
    </button>
  );
}
