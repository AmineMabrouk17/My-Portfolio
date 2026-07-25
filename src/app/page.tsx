import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";

const Experience = dynamic(() => import("@/components/sections/Experience"), { ssr: false });
const Projects = dynamic(() => import("@/components/sections/Projects"), { ssr: false });
const Education = dynamic(() => import("@/components/sections/Education"), { ssr: false });
const Languages = dynamic(() => import("@/components/sections/Languages"), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false });

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Amine Mabrouk",
  jobTitle: "Full Stack Developer",
  url: "https://my-portfolio-seven-chi-94.vercel.app",
  email: "mailto:amx72001@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tunis",
    addressCountry: "TN",
  },
  sameAs: ["https://github.com/AmineMabrouk17"],
  knowsAbout: ["Angular", "Next.js", "Node.js", "Laravel", "TypeScript"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Navbar />
      <main id="top">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Languages />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
