"use client";

import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ParticleText from "@/components/ui/ParticleText";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="flex flex-col justify-center min-h-screen max-w-[1120px] w-full mx-auto px-8 pt-[140px] pb-[60px] max-lg:pt-[120px]">
      <ScrollReveal>
        <div className="flex items-center flex-wrap gap-2 text-[0.78rem] font-bold tracking-[0.08em] uppercase mb-[26px]">
          <span className="text-[#9d8df1]">{t("hero.eyebrow1")}</span>
          <span className="text-white/35">·</span>
          <span className="text-[#d2e823]">{t("hero.eyebrow2")}</span>
        </div>

        <h1 className="font-semibold leading-[1.14] tracking-[-0.035em] text-[clamp(2.4rem,5.6vw,4.6rem)] max-w-[980px] mb-8 text-[var(--color-text)]">
          {t("hero.headline")}{" "}
          <ParticleText text={t("hero.headlineWord")} />{" "}
          {t("hero.headlineEnd")}
        </h1>

        <p className="text-[clamp(1.05rem,1.8vw,1.25rem)] font-normal leading-[1.6] text-[var(--color-muted)] max-w-[580px]">
          {t("hero.subhead")}
        </p>
      </ScrollReveal>
    </section>
  );
}
