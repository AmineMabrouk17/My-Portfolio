"use client";

import { useI18n } from "@/i18n/I18nContext";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-[var(--color-border)] mt-20">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <p className="text-[var(--color-muted-2)] text-[14px]">
            © {year} Amine Mabrouk · {t("footer.built")}{" "}
            <span className="text-[var(--color-accent)]">♥</span>{" "}
            {t("footer.in")} Tunis, Tunisia
          </p>
          <div className="flex items-center gap-1">
            <a
              href="mailto:amx72001@gmail.com"
              className="inline-flex min-h-[44px] items-center px-2 text-[14px] text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              amx72001@gmail.com
            </a>
            <a
              href="https://github.com/AmineMabrouk17"
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-[44px] items-center px-2 text-[14px] text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
