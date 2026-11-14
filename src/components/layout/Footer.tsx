"use client";

import { useI18n } from "@/i18n/I18nContext";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] pt-8 pb-10">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="inline-flex items-center gap-2 text-[14px] text-[var(--color-muted)]">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-status)]"
            />
            {t("footer.available")}
          </p>

          <div className="flex flex-wrap items-center gap-1">
            <a
              href="mailto:amx72001@gmail.com"
              className="inline-flex min-h-[44px] items-center px-2 text-[14px] text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              <bdi>amx72001@gmail.com</bdi>
            </a>
            <a
              href="https://github.com/AmineMabrouk17"
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-[44px] items-center px-2 text-[14px] text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/amine-mabrouk"
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-[44px] items-center px-2 text-[14px] text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <p className="mt-6 text-[13px] text-[var(--color-muted-2)]">
          © {year} Amine Mabrouk · {t("footer.built")}{" "}
          <span className="text-[var(--color-accent)]">♥</span>{" "}
          {t("footer.in")} <bdi>{t("footer.location")}</bdi>
        </p>
      </div>
    </footer>
  );
}
