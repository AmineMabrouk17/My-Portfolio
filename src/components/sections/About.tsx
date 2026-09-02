"use client";

import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { AnimatedText } from "@/components/motion/animated-text";
import Marquee from "@/components/Marquee";

const MARQUEE_ITEMS = [
  "Secure Architecture",
  "High-Performance Apps",
  "Real-time Features",
  "Cloud Migrations",
  "System Security",
  "Automated Monitoring",
  "Data-Driven Systems",
  "Seamless UX",
  "Business Value",
  "Next.js",
  "Angular",
  "Laravel",
  "TypeScript",
  "Node.js",
];

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="relative py-[100px] max-lg:py-[80px] overflow-hidden">
      <div className="about-glow" />
      <div className="about-texture" />

      <div className="relative mx-auto px-8 text-center">
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
          <AnimatedText
            as="h2"
            text={t("about.h2")}
            className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-tight mb-8 text-[var(--color-text)]"
          />
        </ScrollReveal>

        {/* SEO / screen-reader paragraph */}
        <p className="sr-only">
          {t("about.bio")} {t("about.sub")}
        </p>

        {/* Marquee row (single) */}
        <ScrollReveal>
          <Marquee items={MARQUEE_ITEMS} className="mb-6" />
        </ScrollReveal>

        {/* Static diploma badge */}
        <ScrollReveal>
          <p className="inline-block rounded-full border border-[var(--color-muted)]/20 bg-[var(--color-surface)]/60 px-5 py-2 text-[14px] leading-[1.7] text-[var(--color-muted)]">
            Full Stack Developer — National Engineering Diploma (Master&apos;s equivalent)
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
