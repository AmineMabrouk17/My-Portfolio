"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { gsap, SplitText } from "@/lib/gsap";

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
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full no-underline font-semibold text-[15px] bg-[#f3f4f6] text-[#111827] transition-all duration-200 hover:-translate-y-px hover:opacity-95"
              style={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.45)" }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
              </svg>
              {t("hero.cta1")}
            </a>
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
              href="mailto:amx72001@gmail.com?subject=Inquiry%20via%20Portfolio"
              aria-label="Email"
              className="w-[42px] h-[42px] grid place-items-center rounded-full bg-white/[0.03] border border-white/10 text-[var(--color-muted)] no-underline transition-all duration-200 hover:text-white hover:border-white/30 hover:-translate-y-0.5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13L2 4" />
              </svg>
            </a>
            <a
              href="tel:+21627865121"
              aria-label="Phone"
              className="w-[42px] h-[42px] grid place-items-center rounded-full bg-white/[0.03] border border-white/10 text-[var(--color-muted)] no-underline transition-all duration-200 hover:text-white hover:border-white/30 hover:-translate-y-0.5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </a>
            <a
              href="#contact"
              aria-label="Location"
              className="w-[42px] h-[42px] grid place-items-center rounded-full bg-white/[0.03] border border-white/10 text-[var(--color-muted)] no-underline transition-all duration-200 hover:text-white hover:border-white/30 hover:-translate-y-0.5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
