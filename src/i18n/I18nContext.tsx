"use client";

import { createContext, useContext, useState, useCallback, useSyncExternalStore, type ReactNode } from "react";
import en from "./locales/en/common.json";
import fr from "./locales/fr/common.json";
import ar from "./locales/ar/common.json";

const locales = { en, fr, ar } as const;
type Locale = keyof typeof locales;

const STORAGE_KEY = "preferred-lang";

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

function subscribeToStorage(cb: () => void): () => void {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function getSnapshot(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
  return saved && saved in locales ? saved : "en";
}

function getServerSnapshot(): Locale {
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribeToStorage, getSnapshot, getServerSnapshot);
  const [, forceRender] = useState(0);

  const setLocale = useCallback((newLocale: Locale) => {
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.setAttribute("lang", newLocale);
    document.documentElement.setAttribute("dir", newLocale === "ar" ? "rtl" : "ltr");
    forceRender((n) => n + 1);
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
