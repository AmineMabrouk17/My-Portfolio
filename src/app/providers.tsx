"use client";

import { type ReactNode } from "react";
import { I18nProvider } from "@/i18n/I18nContext";
import CursorLight from "@/components/motion/CursorLight";

export default function Providers({ children }: { children: ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>;
}
