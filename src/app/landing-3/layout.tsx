import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ماستر كلاس احترافي",
  robots: { index: false, follow: false },
};

export default function Landing3Layout({ children }: { children: React.ReactNode }) {
  return children;
}
