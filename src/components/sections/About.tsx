"use client";

import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="py-[90px] max-lg:py-[70px]">
      <div className="max-w-[1200px] mx-auto px-8">
        <ScrollReveal>
          <div className="mb-12 flex items-end justify-between flex-wrap gap-5">
            <div>
              <div className="text-[var(--color-accent)] text-[13px] font-medium tracking-[0.15em] mb-2">
                {t("about.num")}
              </div>
              <h2 className="text-[clamp(30px,4vw,44px)] font-bold tracking-[-0.03em] leading-none">
                {t("about.h2")}
              </h2>
            </div>
            <p className="text-[var(--color-muted)] max-w-[480px] text-[15px]">
              {t("about.sub")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[20px] p-9 max-w-[900px]"
          >
            <p className="text-lg leading-[1.7] text-[var(--color-text)]">
              {t("about.bio")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
