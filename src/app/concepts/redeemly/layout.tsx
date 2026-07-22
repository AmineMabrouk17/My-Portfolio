import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redeemly Topup Platform Concept",
  robots: { index: false, follow: false },
};

export default function RedeemlyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
