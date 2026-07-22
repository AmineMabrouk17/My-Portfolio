"use client";

import { useI18n } from "@/i18n/I18nContext";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-[var(--color-border)] mt-20">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <p className="text-[var(--color-muted-2)] text-[13px]">
            © {year} Amine Mabrouk · {t("footer.built")}{" "}
            <span className="text-[var(--color-accent)]">♥</span>{" "}
            {t("footer.in")} Tunis, Tunisia
          </p>
        </div>
      </div>
    </footer>
  );
}
