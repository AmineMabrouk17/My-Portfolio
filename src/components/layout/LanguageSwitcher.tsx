"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n, type Locale } from "@/i18n/I18nContext";

const languages: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
];

export default function LanguageSwitcher() {
  const { t, locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const current = languages.find((lang) => lang.code === locale) ?? languages[0];

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  return (
    <div className="relative ms-1" ref={menuRef}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="language-menu"
        aria-label={`${t("nav.language")}: ${current.label}`}
        className="flex min-h-[44px] items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white/5 px-3 text-[14px] font-medium text-[var(--color-muted)] cursor-pointer transition-all duration-200 hover:border-[var(--color-border-2)] hover:bg-white/10 hover:text-[var(--color-text)] font-[inherit]"
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

      {/* A disclosure of buttons, not a listbox: no arrow-key contract to fake.
          Always mounted so it can grow from its trigger; `visibility` keeps the
          collapsed menu out of the accessibility tree and the tab order. */}
      <div
        id="language-menu"
        data-open={isOpen}
        className="lang-menu absolute top-[calc(100%+6px)] end-0 bg-[var(--color-surface)] border border-[var(--color-border-2)] rounded-xl p-1.5 min-w-[150px] shadow-xl"
        style={{ boxShadow: "0 12px 32px -8px rgba(0,0,0,0.6)" }}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            lang={lang.code}
            aria-current={locale === lang.code ? "true" : undefined}
            className={`flex min-h-[44px] w-full items-center justify-between gap-2 rounded-lg border-none bg-transparent px-3 text-start text-[14px] cursor-pointer transition-all duration-150 font-[inherit] ${
              locale === lang.code
                ? "text-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)]"
                : "text-[var(--color-muted)] hover:bg-white/5 hover:text-[var(--color-text)]"
            }`}
            onClick={() => {
              setLocale(lang.code);
              setIsOpen(false);
              triggerRef.current?.focus();
            }}
          >
            <span>{lang.label}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-muted-2)]">
              {lang.code}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
