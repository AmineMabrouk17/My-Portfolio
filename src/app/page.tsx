import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import LoopingPanels from "@/components/LoopingPanels";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import { Experience, Projects, Education, Contact } from "@/components/sections/LazySections";

const siteUrl = "https://my-portfolio-seven-chi-94.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Amine Mabrouk",
      alternateName: "Amine Mabrouk Portfolio",
      jobTitle: "Full Stack Developer",
      description:
        "Full Stack Developer specializing in Angular, Next.js, Node.js and Laravel.",
      url: siteUrl,
      email: "mailto:amx72001@gmail.com",
      telephone: "+21627865121",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tunis",
        addressCountry: "TN",
      },
      sameAs: ["https://github.com/AmineMabrouk17"],
      knowsAbout: ["Angular", "Next.js", "Node.js", "Laravel", "TypeScript"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Amine Mabrouk — Full Stack Developer Portfolio",
      description:
        "Amine Mabrouk's portfolio — Full Stack Developer specializing in Angular, Next.js, Node.js and Laravel.",
      inLanguage: ["en", "fr", "ar"],
      publisher: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="top">
        <Hero />
        <LoopingPanels />
        <About />
        <LoopingPanels />
        <Skills />
        <LoopingPanels />
        <Experience />
        <LoopingPanels />
        <Projects />
        <LoopingPanels />
        <Education />
        <LoopingPanels />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
