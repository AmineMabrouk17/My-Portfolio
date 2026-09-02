import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import { ScrollProgress } from "@/components/motion/scroll-progress";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const siteUrl = "https://my-portfolio-seven-chi-94.vercel.app";
const title = "Amine Mabrouk — Full Stack Developer Portfolio";
const description =
  "Amine Mabrouk's portfolio — Full Stack Developer specializing in Angular, Next.js, Node.js and Laravel. Based in Tunis, Tunisia.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Amine Mabrouk",
  },
  description,
  keywords: [
    "Amine Mabrouk",
    "Amine Mabrouk Portfolio",
    "Full Stack Developer",
    "Angular Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Laravel Developer",
    "Tunisia software engineer",
  ],
  authors: [{ name: "Amine Mabrouk", url: siteUrl }],
  creator: "Amine Mabrouk",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Amine Mabrouk — Full Stack Developer Portfolio",
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ScrollProgress className="bg-[var(--color-accent)]" />
        <Preloader />
        <Providers>
          <SmoothScroll>{children}</SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
