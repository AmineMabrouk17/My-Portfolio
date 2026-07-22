import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = "https://my-portfolio-seven-chi-94.vercel.app";
const title = "Amine Mabrouk — Full Stack Developer";
const description =
  "Amine Mabrouk — Full Stack Developer specializing in Angular, Next.js, Node.js and Laravel. Based in Tunis, Tunisia.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Amine Mabrouk",
  },
  description,
  keywords: [
    "Amine Mabrouk",
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
    siteName: "Amine Mabrouk — Full Stack Developer",
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
