"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { gsap, SplitText } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function Hero() {
  const { t } = useI18n();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const el = headlineRef.current;
    if (!el) return;

    const staticSpan = el.querySelector("span");
    if (!staticSpan) return;

    let split: SplitText | undefined;

    const ctx = gsap.context(() => {
      split = SplitText.create(staticSpan, { type: "words", mask: "words" });

      gsap.from(split.words, {
        yPercent: 120,
        duration: 0.8,
        stagger: 0.06,
        ease: "power4.out",
      });

      if (summaryRef.current) {
        gsap.from(summaryRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: split.words.length * 0.06 + 0.8 + 0.2,
          ease: "power3.out",
        });
      }
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <section className="pt-[140px] pb-[60px] max-lg:pt-[120px]">
      <div className="max-w-[1120px] mx-auto px-8">
        <ScrollReveal>
          <div className="flex items-center flex-wrap gap-2 text-[0.78rem] font-bold tracking-[0.08em] uppercase mb-[26px]">
            <span className="text-[#9d8df1]">Amine Mabrouk</span>
            <span className="text-white/35">·</span>
            <span className="text-[#d2e823]">{t("hero.tag")}</span>
          </div>

          <h1
            ref={headlineRef}
            className="font-semibold leading-[1.14] tracking-[-0.035em] mb-8 max-w-[980px] text-[clamp(2.4rem,5.6vw,4.6rem)]"
          >
            <span className="inline-block">{t("hero.headline")}</span>{" "}
            <span className="text-[#d2e823] font-normal">{t("hero.headlineAccent")}</span>
          </h1>

          <p
            ref={summaryRef}
            className="text-[clamp(1.05rem,1.8vw,1.25rem)] leading-[1.6] text-[var(--color-muted)] max-w-[580px] font-normal mb-10"
          >
            {t("hero.summary")}
          </p>

          <div className="flex gap-3.5 flex-wrap">
            <MagneticButton
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full no-underline font-semibold text-[15px] bg-[#f3f4f6] text-[#111827] transition-all duration-200 hover:-translate-y-px hover:opacity-95"
              style={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.45)" }}
            >
              {t("hero.cta1")}
            </MagneticButton>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full no-underline font-semibold text-[15px] border border-white/15 text-[var(--color-text)] transition-all duration-200 hover:bg-white/[0.06] hover:-translate-y-px"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              {t("hero.cta2")}
            </a>
          </div>

          <div className="flex gap-3 mt-9">
            <a
              href="https://github.com/AmineMabrouk17"
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
              className="w-[42px] h-[42px] grid place-items-center rounded-full bg-white/[0.03] border border-white/10 text-[var(--color-muted)] no-underline transition-all duration-200 hover:text-white hover:border-white/30 hover:-translate-y-0.5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/amine-mabrouk"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
              className="w-[42px] h-[42px] grid place-items-center rounded-full bg-white/[0.03] border border-white/10 text-[var(--color-muted)] no-underline transition-all duration-200 hover:text-white hover:border-white/30 hover:-translate-y-0.5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="mailto:amx72001@gmail.com?subject=Inquiry%20via%20Portfolio"
              aria-label="Email"
              className="w-[42px] h-[42px] grid place-items-center rounded-full bg-white/[0.03] border border-white/10 text-[var(--color-muted)] no-underline transition-all duration-200 hover:text-white hover:border-white/30 hover:-translate-y-0.5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13L2 4" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
