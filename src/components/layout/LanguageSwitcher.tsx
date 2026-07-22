"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n, type Locale } from "@/i18n/I18nContext";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية", flag: "🇹🇳" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative ms-2" ref={menuRef}>
      <button
        className="flex items-center gap-1.5 bg-white/5 border border-[var(--color-border)] rounded-lg px-3 py-1.5 text-[var(--color-muted)] text-[13px] font-medium cursor-pointer transition-all duration-200 hover:text-[var(--color-text)] hover:border-[var(--color-border-2)] hover:bg-white/5 font-[inherit]"
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
        >
          <path d="M2.5 3.5L5 6L7.5 3.5" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-[calc(100%+6px)] right-0 bg-[var(--color-surface)] border border-[var(--color-border-2)] rounded-[10px] p-1.5 min-w-[120px] shadow-xl"
          style={{ boxShadow: "0 12px 32px -8px rgba(0,0,0,0.6)" }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-[13px] cursor-pointer transition-all duration-150 border-none bg-transparent w-full text-left font-[inherit] ${
                locale === lang.code
                  ? "text-[var(--color-accent)] bg-[rgba(255,107,107,0.06)]"
                  : "text-[var(--color-muted)] hover:bg-white/5 hover:text-[var(--color-text)]"
              }`}
              onClick={() => {
                setLocale(lang.code);
                setIsOpen(false);
              }}
            >
              <span className="text-[15px] leading-none">{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
