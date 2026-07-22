"use client";

import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Contact() {
  const { t } = useI18n();

  return (
    <section id="contact" className="py-[90px] max-lg:py-[70px]">
      <div className="max-w-[1200px] mx-auto px-8">
        <ScrollReveal>
          <div
            className="bg-gradient-to-br from-[rgba(255,107,107,0.06)] to-[rgba(255,169,77,0.06)] border border-[var(--color-border-2)] rounded-[28px] py-[60px] px-[60px] max-md:py-10 max-md:px-6 text-center relative overflow-hidden"
          >
            <div
              className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255,107,107,0.1), transparent 60%)",
              }}
            />

            <div className="text-[var(--color-accent)] text-[13px] font-medium tracking-[0.15em] mb-3 relative">
              {t("contact.num")}
            </div>
            <h2 className="text-[clamp(30px,4vw,44px)] font-bold tracking-[-0.03em] leading-none mb-3.5 relative">
              {t("contact.h2")}
            </h2>
            <p className="text-[var(--color-muted)] text-base max-w-[520px] mx-auto mb-8 relative">
              {t("contact.text")}
            </p>

            <a
              href="mailto:amx72001@gmail.com"
              className="font-semibold text-[clamp(24px,4vw,38px)] bg-gradient text-transparent bg-clip-text no-underline inline-block mb-7 relative hover:opacity-85 transition-opacity"
            >
              amx72001@gmail.com
            </a>

            <div className="flex gap-3.5 justify-center relative flex-wrap">
              <a
                href="https://github.com/AmineMabrouk17"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl no-underline font-semibold text-sm bg-white/[0.04] text-[var(--color-text)] border border-[var(--color-border-2)] transition-all duration-200 hover:bg-white/[0.08] hover:-translate-y-0.5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="tel:+21627865121"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl no-underline font-semibold text-sm bg-white/[0.04] text-[var(--color-text)] border border-[var(--color-border-2)] transition-all duration-200 hover:bg-white/[0.08] hover:-translate-y-0.5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                +216 27 865 121
              </a>
              <a
                href="mailto:amx72001@gmail.com"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl no-underline font-semibold text-sm bg-[var(--color-accent)] text-[var(--color-accent-dark)] transition-all duration-200 hover:-translate-y-0.5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13L2 4" />
                </svg>
                {t("contact.email")}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
