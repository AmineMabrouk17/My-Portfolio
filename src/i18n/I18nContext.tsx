"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import en from "./locales/en/common.json";
import fr from "./locales/fr/common.json";
import ar from "./locales/ar/common.json";

const locales = { en, fr, ar } as const;
type Locale = keyof typeof locales;

interface I18nContextType {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj) as string;
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("preferred-lang") as Locale | null;
  return saved && saved in locales ? saved : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("preferred-lang", newLocale);
    document.documentElement.setAttribute("lang", newLocale);
    document.documentElement.setAttribute("dir", newLocale === "ar" ? "rtl" : "ltr");
  }, []);

  const t = useCallback(
    (key: string): string => {
      return getNestedValue(locales[locale], key) || key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export type { Locale };
