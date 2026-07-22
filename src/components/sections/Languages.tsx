"use client";

import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

const languages = [
  { name: "French", levelKey: "langs.fr", width: "75%" },
  { name: "Arabic", levelKey: "langs.ar", width: "100%" },
  { name: "English", levelKey: "langs.en", width: "50%" },
  { name: "German", levelKey: "langs.de", width: "50%" },
];

export default function Languages() {
  const { t } = useI18n();

  return (
    <section id="languages" className="py-[90px] max-lg:py-[70px]">
      <div className="max-w-[1200px] mx-auto px-8">
        <ScrollReveal>
          <div className="mb-12 flex items-end justify-between flex-wrap gap-5">
            <div>
              <div className="text-[var(--color-accent)] text-[13px] font-medium tracking-[0.15em] mb-2">
                {t("langs.num")}
              </div>
              <h2 className="text-[clamp(30px,4vw,44px)] font-bold tracking-[-0.03em] leading-none">
                {t("langs.h2")}
              </h2>
            </div>
            <p className="text-[var(--color-muted)] max-w-[480px] text-[15px]">
              {t("langs.sub")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          {languages.map((lang, i) => (
            <ScrollReveal key={lang.name} delay={i * 80}>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[16px] p-[22px] transition-all duration-300 hover:border-[var(--color-border-2)] hover:-translate-y-0.5">
                <div className="flex justify-between items-center mb-3.5">
                  <span className="font-semibold text-base">{lang.name}</span>
                  <span className="text-xs text-[var(--color-accent)] font-medium">
                    {t(lang.levelKey)}
                  </span>
                </div>
                <div className="h-[5px] bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient rounded-full transition-[width] duration-1000"
                    style={{ width: lang.width }}
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
