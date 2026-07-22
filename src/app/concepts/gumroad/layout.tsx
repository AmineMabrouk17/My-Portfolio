import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gumroad Marketplace Concept",
  robots: { index: false, follow: false },
};

export default function GumroadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
