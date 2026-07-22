"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/i18n/I18nContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", key: "nav.about" },
    { href: "#skills", key: "nav.skills" },
    { href: "#experience", key: "nav.experience" },
    { href: "#projects", key: "nav.projects" },
    { href: "#education", key: "nav.education" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300"
      style={{
        padding: isScrolled ? "12px 0" : "18px 0",
        background: isScrolled
          ? "rgba(10, 13, 20, 0.85)"
          : "rgba(10, 13, 20, 0.6)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 no-underline">
          <div
            className="w-[34px] h-[34px] rounded-[9px] bg-gradient grid place-items-center text-[var(--color-accent-dark)] font-extrabold text-[15px]"
            style={{ boxShadow: "0 0 24px rgba(255, 107, 107, 0.4)" }}
          >
            AM
          </div>
        </a>

        <div
          className={`${
            isMobileOpen ? "flex" : "hidden"
          } lg:flex items-center gap-2 max-lg:absolute max-lg:top-full max-lg:left-0 max-lg:right-0 max-lg:flex-col max-lg:bg-[rgba(10,13,20,0.98)] max-lg:p-8 max-lg:gap-1.5 max-lg:border-b`}
          style={{ borderColor: "var(--color-border)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[var(--color-muted)] no-underline text-sm font-medium px-3.5 py-2 rounded-lg transition-all duration-200 hover:text-[var(--color-text)] hover:bg-white/5"
              onClick={() => setIsMobileOpen(false)}
            >
              {t(link.key)}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-[var(--color-text)] text-[var(--color-accent-dark)] no-underline px-4 py-2.5 rounded-[10px] font-semibold text-sm transition-all duration-200 hover:bg-[var(--color-accent)] hover:-translate-y-px"
            onClick={() => setIsMobileOpen(false)}
          >
            {t("nav.contact")}
          </a>
          <LanguageSwitcher />
        </div>

        <button
          className="lg:hidden bg-transparent border-none text-[var(--color-text)] text-[22px] cursor-pointer"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
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
  );
}
