import type { MetadataRoute } from "next";

const siteUrl = "https://my-portfolio-seven-chi-94.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/landing-1", "/landing-2", "/landing-3", "/concepts"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
