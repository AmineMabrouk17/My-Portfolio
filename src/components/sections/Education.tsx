"use client";

import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { AnimatedText } from "@/components/motion/animated-text";

const education = [
  {
    school: "FSB Bizerte",
    titleKey: "edu.degree.title",
    date: "2020 – 2025",
    programKey: "edu.degree.program",
    descKey: "edu.degree.desc",
  },
];

export default function Education() {
  const { t } = useI18n();

  return (
    <section id="education" className="py-[90px] max-lg:py-[70px]">
      <div className="max-w-[1200px] mx-auto px-8">
        <ScrollReveal>
          <div className="mb-12 flex items-end justify-between flex-wrap gap-5">
            <div>
              <div className="text-[var(--color-accent)] font-mono text-[12px] font-medium tracking-[0.16em] mb-2">
                {t("edu.num")}
              </div>
              <AnimatedText
                as="h2"
                text={t("edu.h2")}
                className="text-[clamp(32px,4.2vw,46px)] font-bold tracking-[-0.025em] leading-none"
              />
            </div>
            <p className="max-w-[480px] text-pretty text-[16px] text-[var(--color-muted)]">
              {t("edu.sub")}
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-[18px] max-w-[760px]">
          {education.map((edu, i) => (
            <ScrollReveal key={edu.titleKey} delay={i * 80}>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[18px] p-7 transition-all duration-300 hover:border-[var(--color-border-2)]">
                <div className="text-[var(--color-accent)] text-sm font-medium mb-1.5">
                  {edu.school}
                </div>
                <h3 className="text-lg font-semibold mb-2.5 tracking-tight">
                  {t(edu.titleKey)}
                </h3>
                <div className="mb-3 font-mono text-[12px] font-medium tracking-[0.02em] text-[var(--color-muted-2)]">
                  {edu.date} · {t(edu.programKey)}
                </div>
                <p className="text-[var(--color-muted)] text-sm italic">
                  {t(edu.descKey)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
