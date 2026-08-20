"use client";

import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="relative py-[100px] max-lg:py-[80px] overflow-hidden">
      <div className="about-glow" />
      <div className="about-texture" />

      <div className="relative max-w-[720px] mx-auto px-8 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 mb-8">
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{
                  backgroundColor: "var(--color-accent-dim)",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--color-accent-dim)" }}
              />
            </span>
            <span className="text-[13px] font-medium tracking-[0.15em] uppercase text-[var(--color-muted)]">
              {t("about.num")}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-tight mb-8 text-[var(--color-text)]">
            {t("about.h2")}
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-[clamp(0.95rem,1.4vw,1.1rem)] leading-[1.75] text-[var(--color-muted)] mb-6">
            {t("about.bio")}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-[14px] leading-[1.7] text-[var(--color-muted-2)] italic">
            {t("about.sub")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
