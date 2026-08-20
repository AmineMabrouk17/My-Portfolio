"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useI18n } from "@/i18n/I18nContext";

const ARC_PATH = "M 60 260 C 260 30, 740 30, 940 260";
const ARC_LENGTH = 1000;
const MILESTONE_PCTS = [0.1, 0.36, 0.64, 0.9];

const NODE_POSITIONS = MILESTONE_PCTS.map((t) => ({
  x: (1 - t) ** 3 * 60 + 3 * (1 - t) ** 2 * t * 260 + 3 * (1 - t) * t ** 2 * 740 + t ** 3 * 940,
  y: (1 - t) ** 3 * 260 + 3 * (1 - t) ** 2 * t * 30 + 3 * (1 - t) * t ** 2 * 30 + t ** 3 * 260,
}));

const jobs = [
  {
    company: "Infraway",
    titleKey: "exp.job1.title",
    date: "Jul 2025 – Present",
    descKey: "exp.job1.desc",
    bullets: ["exp.job1.b1", "exp.job1.b2", "exp.job1.b3", "exp.job1.b4", "exp.job1.b5"],
  },
  {
    company: "Infraway",
    titleKey: "exp.job2.title",
    date: "Feb 2025 – Jun 2025",
    descKey: "exp.job2.desc",
    bullets: ["exp.job2.b1", "exp.job2.b2", "exp.job2.b3"],
  },
  {
    company: "Infraway",
    titleKey: "exp.job3.title",
    date: "Jul 2024 – Aug 2024",
    descKey: "exp.job3.desc",
    bullets: ["exp.job3.b1", "exp.job3.b2"],
  },
  {
    company: "Infraway",
    titleKey: "exp.job4.title",
    date: "Jul 2023 – Aug 2023",
    descKey: "exp.job4.desc",
    bullets: ["exp.job4.b1"],
  },
];

function StaticExperience({ t }: { t: (key: string) => string }) {
  return (
    <section id="experience" className="py-[90px] max-lg:py-[70px]">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="mb-12">
          <div className="text-[var(--color-accent)] text-[13px] font-medium tracking-[0.15em] mb-2">
            {t("exp.num")}
          </div>
          <h2 className="text-[clamp(30px,4vw,44px)] font-bold tracking-[-0.03em] leading-none">
            {t("exp.h2")}
          </h2>
        </div>

        <div className="flex flex-col gap-10">
          {jobs.map((job) => (
            <div key={job.titleKey} className="relative pl-8 border-l-2 border-[var(--color-accent)]/30">
              <div
                className="absolute left-[-9px] top-1 w-[17px] h-[17px] rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-accent)]"
                style={{ boxShadow: "0 0 14px color-mix(in srgb, var(--color-accent) 50%, transparent)" }}
              />
              <div className="flex justify-between items-start flex-wrap gap-2.5 mb-1.5">
                <div>
                  <div className="text-[var(--color-accent)] text-sm font-medium tracking-[0.02em]">
                    {job.company}
                  </div>
                  <div className="text-[21px] font-semibold mt-1 tracking-[-0.02em]">
                    {t(job.titleKey)}
                  </div>
                </div>
                <span className="text-[13px] text-[var(--color-muted-2)] bg-white/[0.04] px-[11px] py-[5px] rounded-full border border-[var(--color-border)] whitespace-nowrap">
                  {job.date}
                </span>
              </div>
              <div className="text-[var(--color-muted)] text-[15px] mt-2 mb-3.5">
                {t(job.descKey)}
              </div>
              <ul className="list-none flex flex-col gap-2">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm text-[var(--color-muted)] pl-[22px] relative">
                    <span className="absolute left-0 top-0 text-[var(--color-accent)]">▹</span>
                    {t(bullet)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Experience() {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const syncArc = useCallback((progress: number) => {
    const clamped = Math.min(1, Math.max(0, progress));

    if (progressPathRef.current) {
      progressPathRef.current.style.strokeDashoffset = String(ARC_LENGTH * (1 - clamped));
    }

    const headPt = getPointAtProgress(clamped);
    if (headRef.current) {
      headRef.current.setAttribute("cx", String(headPt.x));
      headRef.current.setAttribute("cy", String(headPt.y));
    }

    let step = 0;
    for (let i = MILESTONE_PCTS.length - 1; i >= 0; i--) {
      if (clamped >= MILESTONE_PCTS[i] - 0.01) {
        step = i;
        break;
      }
    }

    setActiveStep((prev) => {
      if (prev !== step) return step;
      return prev;
    });

    nodeRefs.current.forEach((circle, i) => {
      if (!circle) return;
      if (clamped >= MILESTONE_PCTS[i] - 0.01) {
        circle.setAttribute("fill", "#ffffff");
        circle.setAttribute("r", String(i === step ? 6 : 4.5));
      } else {
        circle.setAttribute("fill", "#262629");
        circle.setAttribute("r", "4.5");
      }
    });
  }, []);

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const raw = -rect.top / scrollable;
      syncArc(raw);
    });
  }, [syncArc]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  const jumpToStep = useCallback((step: number) => {
    const el = containerRef.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    const targetY = el.offsetTop + MILESTONE_PCTS[step] * scrollable;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }, []);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return <StaticExperience t={t} />;
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[420vh]"
      id="timeline-scroll-wrapper"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 py-8 sm:py-12">
        <header className="w-full max-w-4xl mx-auto border-b border-white/[0.06] pb-5">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[var(--color-accent)] uppercase block mb-1.5">
            {t("exp.num")}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t("exp.h2")}
          </h1>
        </header>

        <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center my-auto">
          <div className="relative w-full h-32 sm:h-44 flex items-center justify-center">
            {mounted && (
              <svg
                viewBox="0 0 1000 280"
                className="w-full h-full overflow-visible"
              >
                <defs>
                  <filter id="node-glow" x="-60%" y="-60%" width="220%" height="220%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ffffff" floodOpacity="0.9" />
                    <feDropShadow dx="0" dy="0" stdDeviation="9" floodColor="#ffffff" floodOpacity="0.6" />
                  </filter>
                </defs>

                <path
                  d={ARC_PATH}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                <path
                  ref={progressPathRef}
                  d={ARC_PATH}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={ARC_LENGTH}
                  strokeDashoffset={ARC_LENGTH}
                />

                {NODE_POSITIONS.map((pos, i) => (
                  <circle
                    key={i}
                    ref={(el) => { nodeRefs.current[i] = el; }}
                    cx={pos.x}
                    cy={pos.y}
                    r={4.5}
                    fill="#262629"
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => jumpToStep(i)}
                  />
                ))}

                <circle
                  ref={headRef}
                  cx={NODE_POSITIONS[0].x}
                  cy={NODE_POSITIONS[0].y}
                  r={4.5}
                  fill="#ffffff"
                  filter="url(#node-glow)"
                  className="pointer-events-none"
                />
              </svg>
            )}
          </div>

          <div className="relative w-full min-h-[300px] sm:min-h-[280px] mt-2">
            {jobs.map((job, i) => (
              <div
                key={job.titleKey}
                className={
                  i === activeStep
                    ? "transition-all duration-500 opacity-100 transform translate-y-0"
                    : "absolute inset-0 transition-all duration-500 opacity-0 pointer-events-none transform translate-y-4"
                }
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono font-bold text-[var(--color-accent)] tracking-widest uppercase">
                    {`0${i + 1} / ${jobs[i].company}`}
                  </span>
                  <span className="text-neutral-600 font-mono">·</span>
                  <span className="text-xs font-mono text-neutral-400 bg-white/[0.04] px-2.5 py-0.5 rounded-full border border-white/10">
                    {job.date}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">
                  {t(job.titleKey)}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 font-medium mb-4">
                  {t(job.descKey)}
                </p>

                <ul className="space-y-2 text-xs sm:text-[13px] text-neutral-300 leading-relaxed border-l border-white/10 pl-4">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{t(bullet)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <footer className="w-full text-center pb-2">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-neutral-500 tracking-widest uppercase">
            <span>{t("exp.sub")}</span>
            <svg
              className="w-3.5 h-3.5 animate-bounce text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </footer>

        <div
          className="pointer-events-none absolute inset-0 arc-ambient-glow"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(255,255,255,0.03), transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}

function getPointAtProgress(t: number) {
  const mt = 1 - t;
  return {
    x: mt ** 3 * 60 + 3 * mt ** 2 * t * 260 + 3 * mt * t ** 2 * 740 + t ** 3 * 940,
    y: mt ** 3 * 260 + 3 * mt ** 2 * t * 30 + 3 * mt * t ** 2 * 30 + t ** 3 * 260,
  };
}
