"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/i18n/I18nContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useI18n();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const navLinks = [
    { href: "#projects", key: "nav.work" },
    { href: "#experience", key: "nav.experience" },
    { href: "#skills", key: "nav.stack" },
  ];

  return (
    <header className="fixed top-6 left-0 w-full flex justify-center z-50 px-5">
      <nav
        className="flex items-center justify-between w-full max-w-[620px] h-[52px] rounded-full border backdrop-blur-xl transition-all duration-300"
        style={{
          paddingBlock: "5px",
          paddingInlineStart: "24px",
          paddingInlineEnd: "6px",
          background: "rgba(24, 26, 30, 0.72)",
          borderColor: "rgba(255, 255, 255, 0.09)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.45)",
        }}
      >
        <a
          href="#top"
          className="inline-flex min-h-[44px] items-center text-[14px] font-bold tracking-[0.22em] uppercase text-[var(--color-text)] no-underline"
        >
          A M
        </a>

        <div
          id="primary-navigation"
          className={`${
            isMobileOpen ? "flex" : "hidden"
          } lg:flex items-center gap-4 max-lg:absolute max-lg:top-full max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:flex-col max-lg:bg-[rgba(24,26,30,0.98)] max-lg:p-6 max-lg:gap-1 max-lg:rounded-2xl max-lg:border max-lg:min-w-[220px] max-lg:mt-3`}
          style={{ borderColor: "rgba(255, 255, 255, 0.09)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-[44px] items-center px-2 text-[var(--color-muted)] no-underline text-[13.8px] font-medium transition-colors duration-200 hover:text-[var(--color-text)]"
              onClick={() => setIsMobileOpen(false)}
            >
              {t(link.key)}
            </a>
          ))}
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href="#contact"
            className="inline-flex min-h-[44px] items-center gap-1.5 bg-[var(--color-text)] text-[var(--color-accent-dark)] no-underline px-4 rounded-full text-[13.8px] font-semibold transition-all duration-200 hover:-translate-y-px hover:opacity-95"
            onClick={() => setIsMobileOpen(false)}
          >
            {t("nav.contact")}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          <button
            className="lg:hidden w-11 h-11 grid place-items-center bg-transparent border-none text-[var(--color-text)] cursor-pointer p-0"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
            aria-controls="primary-navigation"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {isMobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
