"use client";

import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { AnimatedText } from "@/components/motion/animated-text";
import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";

type CaseStudy = { problem: string; solution: string; result: string };

interface Project {
  slug: string;
  titleKey: string;
  subKey?: string;
  caseStudy: CaseStudy;
  tags: string[];
  link?: string;
  source?: string;
  screenshot: string;
}

// One ordered list, one representation: the case-study card is the portfolio.
const projects: Project[] = [
  {
    slug: "crypto",
    subKey: "proj.crypto.sub",
    titleKey: "proj.crypto.title",
    caseStudy: { problem: "proj.crypto.problem", solution: "proj.crypto.solution", result: "proj.crypto.result" },
    tags: ["Next.js", "TypeScript", "Binance WebSocket", "Yahoo Finance", "SWR", "Gemini API", "Groq", "Turborepo"],
    link: "https://crypto-stocks-web-taupe.vercel.app",
    source: "https://github.com/AmineMabrouk17/crypto-stocks",
    screenshot: "/projects/crypto-stocks/hero-dashboard.webp",
  },
  {
    slug: "castcue",
    subKey: "proj.castcue.sub",
    titleKey: "proj.castcue.title",
    caseStudy: { problem: "proj.castcue.problem", solution: "proj.castcue.solution", result: "proj.castcue.result" },
    tags: ["Next.js", "React 19", "TypeScript", "Cloudflare Workers", "Cloudflare D1", "Better Auth", "HeroUI"],
    link: "https://cast-cue.cast-cue.workers.dev",
    source: "https://github.com/AmineMabrouk17/Cast-Cue",
    screenshot: "/projects/castncue.webp",
  },
  {
    slug: "gamestore",
    subKey: "proj.gamestore.sub",
    titleKey: "proj.gamestore.title",
    caseStudy: { problem: "proj.gamestore.problem", solution: "proj.gamestore.solution", result: "proj.gamestore.result" },
    tags: ["Next.js", "React 19", "TypeScript", "Cloudflare Workers", "Cloudflare D1", "next-intl", "Tailwind CSS", "Framer Motion"],
    link: "https://gamestore-tn.cast-cue.workers.dev",
    source: "https://github.com/AmineMabrouk17/GameStore-TN",
    screenshot: "/projects/gamestore.webp",
  },
  {
    slug: "budgetiq",
    subKey: "proj.budgetiq.sub",
    titleKey: "proj.budgetiq.title",
    caseStudy: { problem: "proj.budgetiq.problem", solution: "proj.budgetiq.solution", result: "proj.budgetiq.result" },
    tags: ["Next.js", "TypeScript", "Supabase", "Gemini AI", "Tailwind CSS", "DaisyUI", "Recharts"],
    link: "https://budgetiq-two.vercel.app",
    source: "https://github.com/AmineMabrouk17/BudgetIQ",
    screenshot: "/projects/budgetiq.webp",
  },
  {
    slug: "rakt3adi",
    subKey: "proj.rakt3adi.sub",
    titleKey: "proj.rakt3adi.title",
    caseStudy: { problem: "proj.rakt3adi.problem", solution: "proj.rakt3adi.solution", result: "proj.rakt3adi.result" },
    tags: ["Python", "python-telegram-bot", "SQLite", "Systemd", "pytest", "GitHub Actions"],
    screenshot: "/projects/rakt3adi.webp",
  },
  {
    slug: "saletbot",
    subKey: "proj.saletbot.sub",
    titleKey: "proj.saletbot.title",
    caseStudy: { problem: "proj.saletbot.problem", solution: "proj.saletbot.solution", result: "proj.saletbot.result" },
    tags: ["Python", "python-telegram-bot", "Gemini API", "SQLite", "Pillow", "APScheduler"],
    screenshot: "/projects/saletbot.webp",
  },
];

function CaseStudyDrawer({
  caseStudy,
  slug,
  title,
}: {
  caseStudy: CaseStudy;
  slug: string;
  title: string;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const panelId = `case-study-${slug}`;

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${open ? t("proj.labels.hide") : t("proj.labels.details")} — ${title}`}
        className="inline-flex min-h-[44px] items-center gap-2 text-[14px] font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-2)] cursor-pointer"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        {open ? t("proj.labels.hide") : t("proj.labels.details")}
      </button>

      {/* The panel element always exists so aria-controls is never dangling;
          collapsed, it is a 0fr grid row that keeps the copy out of the
          accessibility tree, so the height can travel instead of jumping. */}
      <div id={panelId} data-open={open} className="case-study-panel">
        <div className="flex flex-col gap-2.5 pt-3 text-[15px] leading-[1.55]">
          {(["problem", "solution", "result"] as const).map((key) => (
            <div key={key} className="flex gap-2.5">
              <span className="whitespace-nowrap font-semibold text-[var(--color-accent-2)]">
                {t(`proj.labels.${key}`)}:
              </span>
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
  const shotRef = useRef<HTMLImageElement>(null);

  // A cached image can finish decoding before React attaches onLoad, so the
  // mount check covers it and the handler covers everything after.
  useEffect(() => {
    const img = shotRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      img.dataset.loaded = "true";
    }
  }, []);

  return (
    <ScrollReveal delay={(index % 2) * 80} className="h-full">
      <article className="project-card group flex h-full flex-col overflow-hidden rounded-[18px] border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors duration-300 hover:border-[var(--color-accent)]/60">
        <div className="relative aspect-[3/2] w-full overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg)]">
          <img
            ref={shotRef}
            src={project.screenshot}
            alt={`${t(project.titleKey)} — ${t("proj.alt")}`}
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            onLoad={(e) => {
              e.currentTarget.dataset.loaded = "true";
            }}
            className="project-shot absolute inset-0 h-full w-full object-cover saturate-[.85] transition duration-300 group-hover:saturate-100"
          />
          {/* Warm scrim keeps foreign app palettes inside the room at rest;
              full colour is the hover/focus reward. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[var(--color-bg)]/25 transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0"
          />
        </div>

        <div className="flex flex-1 flex-col p-[26px]">
          {project.subKey && (
            <div className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-muted-2)]">
              {t(project.subKey)}
            </div>
          )}
          <h3 className="mb-1 text-[21px] font-bold tracking-[-0.02em]">
            <span className="text-[var(--color-accent-2)]">/</span> {t(project.titleKey)}
          </h3>
          <p className="mb-1 text-[15px] leading-relaxed text-[var(--color-muted)]">
            {t(`proj.${project.slug}.one`)}
          </p>

          <CaseStudyDrawer
            caseStudy={project.caseStudy}
            slug={project.slug}
            title={t(project.titleKey)}
          />

          <div className="mt-4 mb-5 flex flex-wrap gap-[7px]">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[var(--color-border)] bg-white/[0.04] px-[10px] py-[4px] font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--color-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3">
            {!project.link && !project.source && (
              <a
                href={`mailto:amx72001@gmail.com?subject=${encodeURIComponent(
                  `${t("proj.ask")} — ${t(project.titleKey)}`
                )}`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[var(--color-field-border)] px-5 text-sm font-semibold text-[var(--color-text)] no-underline transition-colors hover:border-[var(--color-accent)] hover:bg-white/[0.04]"
              >
                {t("proj.ask")}
              </a>
            )}
              {project.link && (
                <MagneticButton
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.2}
                  aria-label={`${t("proj.demo")} — ${t(project.titleKey)}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-accent-dark)] no-underline transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {t("proj.demo")}
                </MagneticButton>
              )}
              {project.source && (
                <MagneticButton
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.2}
                  aria-label={`${t("proj.source")} — ${t(project.titleKey)}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[var(--color-field-border)] px-5 text-sm font-semibold text-[var(--color-text)] no-underline transition-transform duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                  </svg>
                  {t("proj.source")}
                </MagneticButton>
              )}
          </div>
        </div>
      </article>
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
              <div className="text-[var(--color-accent)] font-mono text-[12px] font-medium tracking-[0.16em] mb-2">
                {t("proj.num")}
              </div>
              <AnimatedText
                as="h2"
                text={t("proj.h2")}
                className="text-[clamp(32px,4.2vw,46px)] font-bold tracking-[-0.025em] leading-none"
              />
            </div>
            <p className="max-w-[480px] text-pretty text-[16px] text-[var(--color-muted)]">
              {t("proj.sub")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-[22px] lg:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
