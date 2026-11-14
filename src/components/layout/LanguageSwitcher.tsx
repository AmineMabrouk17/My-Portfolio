"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n, type Locale } from "@/i18n/I18nContext";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية", flag: "🇹🇳" },
];

export default function LanguageSwitcher() {
  const { t, locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const current = languages.find((lang) => lang.code === locale) ?? languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div className="relative ms-1" ref={menuRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="language-menu"
        aria-label={`${t("nav.language")}: ${current.label}`}
        className="flex min-h-[40px] items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white/5 px-3 text-[14px] font-medium text-[var(--color-muted)] cursor-pointer transition-all duration-200 hover:border-[var(--color-border-2)] hover:bg-white/10 hover:text-[var(--color-text)] font-[inherit]"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <span>{locale.toUpperCase()}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M2.5 3.5L5 6L7.5 3.5" />
        </svg>
      </button>

      {isOpen && (
        <div
          id="language-menu"
          role="listbox"
          aria-label={t("nav.language")}
          className="absolute top-[calc(100%+6px)] end-0 bg-[var(--color-surface)] border border-[var(--color-border-2)] rounded-xl p-1.5 min-w-[140px] shadow-xl"
          style={{ boxShadow: "0 12px 32px -8px rgba(0,0,0,0.6)" }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              role="option"
              aria-selected={locale === lang.code}
              lang={lang.code}
              className={`flex min-h-[44px] w-full items-center gap-2 rounded-lg border-none bg-transparent px-3 text-start text-[14px] cursor-pointer transition-all duration-150 font-[inherit] ${
                locale === lang.code
                  ? "text-[var(--color-accent)] bg-[rgba(255,107,107,0.06)]"
                  : "text-[var(--color-muted)] hover:bg-white/5 hover:text-[var(--color-text)]"
              }`}
              onClick={() => {
                setLocale(lang.code);
                setIsOpen(false);
              }}
            >
              <span className="text-[16px] leading-none" aria-hidden="true">
                {lang.flag}
              </span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
