"use client";

import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/i18n/I18nContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useI18n();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobileOpen) return;

    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    // Move focus into the menu so keyboard users are not left behind the toggle.
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [isMobileOpen]);

  const navLinks = [
    { href: "#projects", key: "nav.work" },
    { href: "#about", key: "nav.about" },
    { href: "#experience", key: "nav.experience" },
    { href: "#skills", key: "nav.stack" },
  ];

  return (
    <header className="fixed top-6 left-0 w-full flex justify-center z-50 px-5">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:start-0 focus:z-[60] focus:rounded-full focus:bg-[var(--color-text)] focus:px-4 focus:py-2 focus:text-[14px] focus:font-semibold focus:text-[var(--color-accent-dark)]"
      >
        {t("nav.skip")}
      </a>
      <nav
        ref={navRef}
        aria-label={t("nav.label")}
        className="flex items-center justify-between w-full max-w-[720px] h-[52px] rounded-full border backdrop-blur-xl transition-all duration-300"
        style={{
          paddingBlock: "5px",
          paddingInlineStart: "24px",
          paddingInlineEnd: "6px",
          background: "rgba(23, 18, 19, 0.72)",
          borderColor: "rgba(243, 236, 230, 0.09)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.45)",
        }}
      >
        <a
          href="#top"
          aria-label={t("nav.home")}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-[14px] font-bold tracking-[0.22em] uppercase text-[var(--color-text)] no-underline"
        >
          A M
        </a>

        <div
          ref={menuRef}
          id="primary-navigation"
          data-open={isMobileOpen}
          className="nav-menu items-center gap-3 lg:flex max-lg:absolute max-lg:top-full max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:flex-col max-lg:bg-[rgba(23,18,19,0.98)] max-lg:p-6 max-lg:gap-1 max-lg:rounded-2xl max-lg:border max-lg:min-w-[220px] max-lg:mt-3"
          style={{ borderColor: "rgba(243, 236, 230, 0.09)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-[44px] items-center px-2 text-[var(--color-muted)] no-underline text-[14px] font-medium transition-colors duration-200 hover:text-[var(--color-text)]"
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
            className="inline-flex min-h-[44px] items-center gap-1.5 bg-[var(--color-text)] text-[var(--color-accent-dark)] no-underline px-4 rounded-full text-[14px] font-semibold transition-all duration-200 hover:-translate-y-px hover:opacity-95"
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
              aria-hidden="true"
              className="rtl:-scale-x-100"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          <button
            ref={toggleRef}
            className="lg:hidden w-11 h-11 grid place-items-center bg-transparent border-none text-[var(--color-text)] cursor-pointer p-0"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={t("nav.menu")}
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
              aria-hidden="true"
            >
              {/* Both glyphs stay mounted so the toggle crossfades instead of
                  swapping in a single frame. */}
              <path
                d="M3 12h18M3 6h18M3 18h18"
                className={`transition-opacity duration-150 ${
                  isMobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <path
                d="M18 6L6 18M6 6l12 12"
                className={`transition-opacity duration-150 ${
                  isMobileOpen ? "opacity-100" : "opacity-0"
                }`}
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
