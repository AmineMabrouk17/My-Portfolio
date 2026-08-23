"use client";

import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { AnimatedText } from "@/components/motion/animated-text";
import ProjectList from "@/components/ProjectList";
import { useEffect, useRef, useState } from "react";

function CursorFollower({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onEnter = () => { visible.current = true; };
    const onLeave = () => { visible.current = false; };
    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);
    container.addEventListener("mousemove", onMove);

    let raf: number;
    const tick = () => {
      const b = badgeRef.current;
      if (b) {
        const lerp = visible.current ? 0.12 : 0.25;
        pos.current.x += (mouse.current.x - pos.current.x) * lerp;
        pos.current.y += (mouse.current.y - pos.current.y) * lerp;
        const opacity = visible.current ? 1 : 0;
        const scale = visible.current ? 1 : 0.7;
        b.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(${scale})`;
        b.style.opacity = String(opacity);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [containerRef]);

  return (
    <div
      ref={badgeRef}
      className="pointer-events-none absolute top-0 left-0 z-30 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[var(--color-accent-3)] px-4 py-2 text-[13px] font-semibold text-black opacity-0 transition-[opacity,scale] duration-200"
    >
      View Project →
    </div>
  );
}

function MockWidgetCastCue() {
  const movies = [
    { w: "w-10", h: "h-14", from: "from-[#ff6b6b]/30", to: "to-[#ffa94d]/20" },
    { w: "w-10", h: "h-14", from: "from-[#ffa94d]/30", to: "to-[#FFE566]/20" },
    { w: "w-10", h: "h-14", from: "from-[#FFE566]/30", to: "to-[#ff6b6b]/20" },
    { w: "w-10", h: "h-14", from: "from-[#ff6b6b]/20", to: "to-[#ffa94d]/30" },
    { w: "w-10", h: "h-14", from: "from-[#ffa94d]/20", to: "to-[#FFE566]/30" },
  ];
  return (
    <div className="flex h-full w-full flex-col p-5 gap-3">
      <div className="flex gap-2 overflow-hidden">
        {movies.map((m, i) => (
          <div key={i} className={`${m.w} ${m.h} rounded-lg bg-gradient-to-br ${m.from} ${m.to} border border-white/[0.06] shrink-0`} />
        ))}
      </div>
      <div className="flex-1 rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-2.5 rounded-full bg-white/10 w-24" />
          <div className="h-2 rounded-full bg-[#FFE566]/40 w-12" />
        </div>
        <div className="h-2 rounded-full bg-white/[0.06] w-40" />
        <div className="flex gap-1 mt-auto">
          {[1,2,3,4,5].map(i => (
            <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i <= 3 ? "#FFE566" : "none"} stroke="#FFE566" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockWidgetLeadGen() {
  return (
    <div className="flex h-full w-full flex-col p-5 gap-3">
      <div className="h-5 rounded-lg bg-gradient-to-r from-[#ff6b6b]/20 via-[#ffa94d]/15 to-[#FFE566]/10 w-32" />
      <div className="h-3 rounded-md bg-white/[0.06] w-48" />
      <div className="h-3 rounded-md bg-white/[0.04] w-36" />
      <div className="flex gap-2 mt-2">
        <div className="h-8 w-24 rounded-lg bg-[var(--color-accent)]/80" />
        <div className="h-8 flex-1 rounded-lg bg-white/[0.04] border border-white/[0.06]" />
      </div>
      <div className="flex gap-3 mt-auto">
        {[1,2,3].map(i => (
          <div key={i} className="flex-1 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
            <div className="h-1.5 rounded-full bg-white/10 w-8" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MockWidgetEcom() {
  const items = ["from-[#ff6b6b]/25", "from-[#ffa94d]/25", "from-[#FFE566]/25"];
  return (
    <div className="flex h-full w-full flex-col p-5 gap-3">
      <div className="flex items-center justify-between">
        <div className="h-3 rounded-full bg-white/10 w-20" />
        <div className="flex gap-2">
          <div className="h-7 w-7 rounded-lg bg-white/[0.04] border border-white/[0.06]" />
          <div className="h-7 w-7 rounded-lg bg-white/[0.04] border border-white/[0.06]" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 flex-1">
        {items.map((bg, i) => (
          <div key={i} className={`rounded-xl bg-gradient-to-br ${bg} to-transparent border border-white/[0.06] flex flex-col justify-end p-2`}>
            <div className="h-1.5 rounded-full bg-white/10 w-8 mb-1" />
            <div className="h-1.5 rounded-full bg-white/[0.06] w-6" />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="h-2 rounded-full bg-white/[0.06] w-16" />
        <div className="h-6 w-16 rounded-md bg-[var(--color-accent)]/80" />
      </div>
    </div>
  );
}

function MockWidgetBudgetIQ() {
  return (
    <div className="flex h-full w-full flex-col p-5 gap-3">
      <div className="flex gap-2">
        <div className="flex-1 rounded-xl bg-white/[0.04] border border-white/[0.06] p-2">
          <div className="h-1.5 rounded-full bg-[#22c55e]/50 w-10 mb-1" />
          <div className="h-3 rounded-full bg-white/10 w-14" />
        </div>
        <div className="flex-1 rounded-xl bg-white/[0.04] border border-white/[0.06] p-2">
          <div className="h-1.5 rounded-full bg-[#ff6b6b]/50 w-10 mb-1" />
          <div className="h-3 rounded-full bg-white/10 w-14" />
        </div>
      </div>
      <div className="flex-1 rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 relative overflow-hidden">
        <svg viewBox="0 0 200 60" className="w-full h-full opacity-40" preserveAspectRatio="none">
          <polyline points="0,50 30,40 60,45 90,25 120,30 150,15 180,20 200,10" fill="none" stroke="#ff6b6b" strokeWidth="2" />
          <polyline points="0,55 30,50 60,42 90,35 120,38 150,28 180,32 200,22" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 3" />
        </svg>
      </div>
      <div className="flex gap-2">
        {[1,2,3].map(i => (
          <div key={i} className="flex-1 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
            <div className="h-1.5 rounded-full bg-white/[0.08] w-6" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MockWidgetEscrow() {
  return (
    <div className="flex h-full w-full flex-col p-5 gap-3 items-center justify-center">
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 text-center">
          <div className="w-8 h-8 rounded-full bg-[#ff6b6b]/20 mx-auto mb-2 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 w-12 mx-auto" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="h-px w-10 bg-gradient-to-r from-[#ff6b6b] to-[#22c55e]" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-accent-2)]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          <div className="h-px w-10 bg-gradient-to-r from-[#22c55e] to-[#FFE566]" />
        </div>
        <div className="flex-1 rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 text-center">
          <div className="w-8 h-8 rounded-full bg-[#22c55e]/20 mx-auto mb-2 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 w-12 mx-auto" />
        </div>
      </div>
      <div className="w-full rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20 p-2 text-center">
        <div className="h-2 rounded-full bg-[#22c55e]/30 w-20 mx-auto" />
      </div>
    </div>
  );
}

const mockWidgets: Record<string, () => React.JSX.Element> = {
  castcue: MockWidgetCastCue,
  leadgen: MockWidgetLeadGen,
  ecom: MockWidgetEcom,
  budgetiq: MockWidgetBudgetIQ,
  trustless: MockWidgetEscrow,
};

type CaseStudy = { problem: string; solution: string; result: string };

interface Project {
  slug: string;
  titleKey: string;
  subKey?: string;
  date?: string;
  caseStudy: CaseStudy;
  tags: string[];
  link?: string;
  source?: string;
  featured?: boolean;
  screenshot?: string;
}

const projects: Project[] = [
  {
    slug: "castcue",
    subKey: "proj.castcue.sub",
    titleKey: "proj.castcue.title",
    caseStudy: { problem: "proj.castcue.problem", solution: "proj.castcue.solution", result: "proj.castcue.result" },
    tags: ["Next.js", "React 19", "TypeScript", "Cloudflare Workers", "Cloudflare D1", "Better Auth", "HeroUI"],
    link: "https://cast-cue.cast-cue.workers.dev",
    source: "https://github.com/AmineMabrouk17/Cast-Cue",
    screenshot: "/projects/castncue.png",
  },
  {
    slug: "leadgen",
    subKey: "proj.leadgen.sub",
    titleKey: "proj.leadgen.title",
    caseStudy: { problem: "proj.leadgen.problem", solution: "proj.leadgen.solution", result: "proj.leadgen.result" },
    tags: ["Astro", "TypeScript", "Cloudflare Pages", "Formspree", "GTM", "GA4", "Meta Pixel"],
    date: "2026",
    link: "https://lead-generation-landing-page.pages.dev",
    source: "https://github.com/AmineMabrouk17/lead-generation-landing-page",
    screenshot: "/projects/lead-generation.png",
  },
  {
    slug: "ecom",
    subKey: "proj.ecom.sub",
    titleKey: "proj.ecom.title",
    caseStudy: { problem: "proj.ecom.problem", solution: "proj.ecom.solution", result: "proj.ecom.result" },
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Supabase", "PostgreSQL", "Stripe", "Zustand"],
    link: "https://ecommerce-website-puce-beta.vercel.app/",
    source: "https://github.com/AmineMabrouk17/ecommerce-website",
    screenshot: "/projects/ecommerce.png",
  },
  {
    slug: "budgetiq",
    subKey: "proj.budgetiq.sub",
    titleKey: "proj.budgetiq.title",
    caseStudy: { problem: "proj.budgetiq.problem", solution: "proj.budgetiq.solution", result: "proj.budgetiq.result" },
    tags: ["Next.js", "TypeScript", "Supabase", "Gemini AI", "Tailwind CSS", "DaisyUI", "Recharts"],
    link: "https://budgetiq-two.vercel.app",
    source: "https://github.com/AmineMabrouk17/BudgetIQ",
    screenshot: "/projects/budgetiq.png",
  },
  {
    slug: "trustless",
    subKey: "proj.trustless.sub",
    titleKey: "proj.trustless.title",
    caseStudy: { problem: "proj.trustless.problem", solution: "proj.trustless.solution", result: "proj.trustless.result" },
    tags: ["Solidity", "Foundry", "Next.js", "wagmi", "viem"],
    link: "https://trustless-escrow-demo.vercel.app",
    source: "https://github.com/AmineMabrouk17/nextjs-solidity-escrow",
    screenshot: "/projects/trustlesseScrow.png",
  },
];

const cryptoProject: Project = {
  slug: "crypto",
  subKey: "proj.crypto.sub",
  titleKey: "proj.crypto.title",
  featured: true,
  caseStudy: { problem: "proj.crypto.problem", solution: "proj.crypto.solution", result: "proj.crypto.result" },
  tags: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "lightweight-charts", "Binance WebSocket", "Yahoo Finance", "SWR", "Gemini API", "Groq", "Turborepo"],
  link: "https://crypto-stocks-web-taupe.vercel.app",
  source: "https://github.com/AmineMabrouk17/crypto-stocks",
};

function CaseStudyDrawer({ caseStudy, t }: { caseStudy: CaseStudy; t: (k: string) => string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-[13px] font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-3)] transition-colors cursor-pointer"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}><polyline points="9 18 15 12 9 6" /></svg>
        {open ? "Hide details" : "Problem → Solution → Result"}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[400px] mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col gap-2.5 text-[14px] leading-[1.55]">
          {(["problem", "solution", "result"] as const).map((key) => (
            <div key={key} className="flex gap-2.5">
              <span className="text-[var(--color-accent-3)] font-semibold whitespace-nowrap">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
              <span className="text-[var(--color-muted)]">{t(caseStudy[key])}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const MockWidget = mockWidgets[project.slug];

  return (
    <ScrollReveal delay={index * 80}>
      <div
        ref={containerRef}
        className="group relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[20px] overflow-hidden transition-all duration-300 hover:border-[var(--color-accent)]"
      >
        <CursorFollower containerRef={containerRef} />

        <div className="relative aspect-[16/10] w-full bg-[#0a0d14] border-b border-[var(--color-border)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
          {project.screenshot ? (
            <img
              src={project.screenshot}
              alt={t(project.titleKey)}
              className="w-full h-full object-cover absolute inset-0"
              loading="lazy"
            />
          ) : (
            MockWidget && <MockWidget />
          )}
        </div>

        <div className="p-[30px]">
          {project.subKey && (
            <div className="text-[var(--color-muted-2)] text-[12px] font-semibold uppercase tracking-[0.12em] mb-2">
              {t(project.subKey)}
            </div>
          )}
          {project.date && !project.subKey && (
            <div className="text-[var(--color-muted-2)] text-[12px] font-semibold uppercase tracking-[0.12em] mb-2">
              {project.date}
            </div>
          )}
          <h3 className="text-[22px] font-bold tracking-[-0.02em] mb-1">
            <span className="text-[var(--color-accent-3)]">/</span> {t(project.titleKey)}
          </h3>

          <CaseStudyDrawer caseStudy={project.caseStudy} t={t} />

          <div className="flex flex-wrap gap-[7px] mt-4 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11.5px] py-[4px] px-[10px] rounded-md bg-white/[0.04] border border-[var(--color-border)] text-[var(--color-muted)] font-medium tracking-wide uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          {(project.link || project.source) && (
            <div className="flex flex-wrap gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl no-underline font-semibold text-sm bg-[var(--color-accent-3)] text-black transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_color-mix(in_srgb,var(--color-accent-3)_40%,transparent)]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  {t("proj.demo")}
                </a>
              )}
              {project.source && (
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl no-underline font-semibold text-sm border border-[var(--color-border)] text-[var(--color-text)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent-3)]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>
                  {t("proj.source")}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}

function FeaturedProjectCard() {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal>
      <div
        ref={containerRef}
        className="group relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[20px] overflow-hidden transition-all duration-300 hover:border-[var(--color-accent-3)]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CursorFollower containerRef={containerRef} />

        <div className="relative w-full min-h-[420px] max-lg:min-h-[280px] overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] border-b border-[var(--color-border)]">
          <img
            src="/projects/crypto-stocks/hero-dashboard.png"
            alt="Crypto & Stocks Dashboard"
            className="w-full h-full object-contain absolute inset-0 transition-opacity duration-300"
            style={{ opacity: hovered ? 0 : 1 }}
            loading="eager"
          />
          <img
            src="/projects/crypto-stocks/demo.gif"
            alt="Crypto & Stocks Dashboard Demo"
            className="w-full h-full object-contain absolute inset-0 transition-opacity duration-300"
            style={{ opacity: hovered ? 1 : 0 }}
          />
        </div>

        <div className="p-[30px]">
          {cryptoProject.subKey && (
            <div className="text-[var(--color-muted-2)] text-[12px] font-semibold uppercase tracking-[0.12em] mb-2">
              {t(cryptoProject.subKey)}
            </div>
          )}
          <h3 className="text-[22px] font-bold tracking-[-0.02em] mb-1">
            <span className="text-[var(--color-accent-3)]">/</span> {t(cryptoProject.titleKey)}
          </h3>
          <p className="text-[var(--color-muted)] text-[14.5px] mb-2 leading-relaxed">
            {t("proj.crypto.desc")}
          </p>

          <CaseStudyDrawer caseStudy={cryptoProject.caseStudy} t={t} />

          <div className="flex flex-wrap gap-[7px] mt-4 mb-4">
            {cryptoProject.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11.5px] py-[4px] px-[10px] rounded-md bg-white/[0.04] border border-[var(--color-border)] text-[var(--color-muted)] font-medium tracking-wide uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {cryptoProject.link && (
              <a
                href={cryptoProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl no-underline font-semibold text-sm bg-[var(--color-accent-3)] text-black transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_color-mix(in_srgb,var(--color-accent-3)_40%,transparent)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                {t("proj.demo")}
              </a>
            )}
            {cryptoProject.source && (
              <a
                href={cryptoProject.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl no-underline font-semibold text-sm border border-[var(--color-border)] text-[var(--color-text)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent-3)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>
                {t("proj.source")}
              </a>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function Projects() {
  const { t } = useI18n();

  return (
    <section id="projects" className="py-[90px] max-lg:py-[70px]">
      <div className="max-w-[1200px] mx-auto px-8">
        <ScrollReveal>
          <div className="mb-12 flex items-end justify-between flex-wrap gap-5">
            <div>
              <div className="text-[var(--color-accent)] text-[13px] font-medium tracking-[0.15em] mb-2">
                {t("proj.num")}
              </div>
              <AnimatedText
                as="h2"
                text={t("proj.h2")}
                className="text-[clamp(30px,4vw,44px)] font-bold tracking-[-0.03em] leading-none"
              />
            </div>
            <p className="text-[var(--color-muted)] max-w-[480px] text-[15px]">
              {t("proj.sub")}
            </p>
          </div>
        </ScrollReveal>

        <div className="mb-[60px]">
          <ProjectList />
        </div>

        <div className="flex flex-col gap-[22px] mb-[60px]">
          {projects.map((project, i) => (
            <ProjectCard key={project.titleKey} project={project} index={i} />
          ))}
        </div>

        <ScrollReveal>
          <h3 className="text-[24px] font-semibold mb-6 text-[var(--color-accent-3)] flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10M18 20V4M6 20v-4" /></svg>
            {t("proj.crypto.section")}
          </h3>
        </ScrollReveal>

        <FeaturedProjectCard />
      </div>
    </section>
  );
}
