"use client";

import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { AnimatedText } from "@/components/motion/animated-text";
import Marquee from "@/components/Marquee";

export default function About() {
  const { t } = useI18n();
  const words = t("about.marquee")
    .split("•")
    .map((word) => word.trim())
    .filter(Boolean);

  return (
    <section id="about" className="relative py-[90px] max-lg:py-[70px] overflow-hidden">
      <div className="about-glow" />
      <div className="about-texture" />

      <div className="relative mx-auto max-w-[1200px] px-8">
        {/* Same header grammar as every other section — About is not a
            centered exception. */}
        <ScrollReveal>
          <div className="mb-12 flex items-end justify-between flex-wrap gap-5">
            <div>
              <div className="text-[var(--color-accent)] font-mono text-[12px] font-medium tracking-[0.16em] mb-2">
                {t("about.num")}
              </div>
              <AnimatedText
                as="h2"
                text={t("about.h2")}
                className="text-[clamp(32px,4.2vw,46px)] font-bold tracking-[-0.025em] leading-none"
              />
            </div>
            <p className="max-w-[480px] text-pretty text-[16px] text-[var(--color-muted)]">
              {t("about.sub")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
          <ScrollReveal>
            <p className="max-w-[62ch] text-[16px] leading-[1.7] text-[var(--color-muted)]">
              {t("about.bio")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <Marquee rows={[words]} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
