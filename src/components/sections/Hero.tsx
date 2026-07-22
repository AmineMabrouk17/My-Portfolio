"use client";

import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="pt-40 pb-24 max-lg:pt-32 max-lg:pb-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-[1.3fr_0.7fr] gap-15 items-center max-lg:grid-cols-1 max-lg:gap-12">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[var(--color-border-2)] rounded-full text-[13px] text-[var(--color-muted)] bg-white/[0.02] mb-6">
              <span
                className="w-[7px] h-[7px] rounded-full bg-[var(--color-accent)]"
                style={{
                  boxShadow: "0 0 12px var(--color-accent)",
                  animation: "pulse 2s infinite",
                }}
              />
              <span>{t("hero.tag")}</span>
            </div>

            <h1 className="font-bold leading-[1.02] tracking-[-0.035em] mb-5 text-[clamp(44px,6.5vw,82px)]">
              I build{" "}
              <span className="text-gradient">production-grade</span>{" "}
              software.
            </h1>

            <p className="text-[clamp(18px,2vw,22px)] text-[var(--color-muted)] mb-6 font-normal">
              {t("hero.role")}
            </p>

            <p className="text-base text-[var(--color-muted)] max-w-[560px] mb-9">
              {t("hero.summary")}
            </p>

            <div className="flex gap-3.5 flex-wrap">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl no-underline font-semibold text-sm bg-[var(--color-accent)] text-[var(--color-accent-dark)] transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  boxShadow: "0 10px 30px -10px rgba(255,107,107,0.5)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
                </svg>
                {t("hero.cta1")}
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl no-underline font-semibold text-sm bg-white/[0.04] text-[var(--color-text)] border border-[var(--color-border-2)] transition-all duration-200 hover:bg-white/[0.08] hover:-translate-y-0.5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                {t("hero.cta2")}
              </a>
            </div>

            <div className="flex gap-3.5 mt-9">
              <a
                href="https://github.com/AmineMabrouk17"
                target="_blank"
                rel="noopener"
                aria-label="GitHub"
                className="w-[42px] h-[42px] grid place-items-center rounded-[11px] bg-white/[0.03] border border-[var(--color-border)] text-[var(--color-muted)] no-underline transition-all duration-200 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:-translate-y-0.5"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="mailto:amx72001@gmail.com"
                aria-label="Email"
                className="w-[42px] h-[42px] grid place-items-center rounded-[11px] bg-white/[0.03] border border-[var(--color-border)] text-[var(--color-muted)] no-underline transition-all duration-200 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:-translate-y-0.5"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13L2 4" />
                </svg>
              </a>
              <a
                href="tel:+21627865121"
                aria-label="Phone"
                className="w-[42px] h-[42px] grid place-items-center rounded-[11px] bg-white/[0.03] border border-[var(--color-border)] text-[var(--color-muted)] no-underline transition-all duration-200 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:-translate-y-0.5"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </a>
              <a
                href="#contact"
                aria-label="Location"
                className="w-[42px] h-[42px] grid place-items-center rounded-[11px] bg-white/[0.03] border border-[var(--color-border)] text-[var(--color-muted)] no-underline transition-all duration-200 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:-translate-y-0.5"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </a>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-3.5 max-lg:max-w-[420px]">
            {[
              { icon: "code", titleKey: "hero.svc1.title", descKey: "hero.svc1.desc" },
              { icon: "chart", titleKey: "hero.svc2.title", descKey: "hero.svc2.desc" },
              { icon: "plug", titleKey: "hero.svc3.title", descKey: "hero.svc3.desc" },
            ].map((svc, i) => (
              <ScrollReveal key={svc.titleKey} delay={i * 100}>
                <div
                  className="relative rounded-[20px] bg-gradient-to-br from-[rgba(255,107,107,0.06)] to-[rgba(255,169,77,0.06)] border border-[var(--color-border-2)] p-5.5 flex items-center gap-4.5 transition-all duration-300 hover:border-[var(--color-accent)] hover:translate-x-1.5"
                  style={{ boxShadow: "var(--shadow)" }}
                >
                  <div className="w-[50px] h-[50px] min-w-[50px] rounded-[14px] bg-gradient grid place-items-center text-xl text-[var(--color-accent-dark)]">
                    {svc.icon === "code" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                    )}
                    {svc.icon === "chart" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                    )}
                    {svc.icon === "plug" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22v-5M9 8V2M15 8V2M18 8V5a3 3 0 00-3-3H9a3 3 0 00-3 3v3" /><rect x="6" y="8" width="12" height="14" rx="2" /></svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight mb-0.5">
                      {t(svc.titleKey)}
                    </h3>
                    <p className="text-[var(--color-muted)] text-[13px] leading-snug">
                      {t(svc.descKey)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
