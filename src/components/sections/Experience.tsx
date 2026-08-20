"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/lib/utils";

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
                style={{ boxShadow: "0 0 14px rgba(255,107,107,0.5)" }}
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
  const arcTrackRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const rafRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const raw = -rect.top / scrollable;
      const progress = Math.min(1, Math.max(0, raw));

      const offset = ARC_LENGTH * (1 - progress);
      if (arcTrackRef.current) {
        arcTrackRef.current.style.strokeDashoffset = String(offset);
      }

      let pos = NODE_POSITIONS[0];
      for (let i = MILESTONE_PCTS.length - 1; i >= 0; i--) {
        if (progress >= MILESTONE_PCTS[i]) {
          pos = NODE_POSITIONS[i];
          break;
        }
      }
      if (headRef.current) {
        headRef.current.setAttribute("transform", `translate(${pos.x}, ${pos.y})`);
      }

      let step = 0;
      for (let i = MILESTONE_PCTS.length - 1; i >= 0; i--) {
        if (progress >= MILESTONE_PCTS[i]) {
          step = i;
          break;
        }
      }
      setActiveStep(step);
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
    <div ref={containerRef} className="relative" style={{ height: "420vh" }}>
      <div className="sticky top-0 h-screen flex flex-col">
        <div className="flex-1 flex flex-col max-w-[1200px] w-full mx-auto px-8 pt-[100px] pb-10 max-lg:pt-[80px]">
          <div className="mb-8 max-lg:mb-6">
            <div className="text-[var(--color-accent)] text-[13px] font-medium tracking-[0.15em] mb-2">
              {t("exp.num")}
            </div>
            <h2 className="text-[clamp(30px,4vw,44px)] font-bold tracking-[-0.03em] leading-none">
              {t("exp.h2")}
            </h2>
          </div>

          <div className="flex-1 flex items-center gap-12 min-h-0 max-xl:flex-col max-xl:gap-6 max-xl:justify-center">
            <div className="relative w-[480px] h-[290px] shrink-0 max-xl:w-full max-xl:max-w-[500px] max-xl:h-auto max-xl:aspect-[480/290]">
              <svg
                viewBox="0 0 1000 290"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter id="arc-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="head-glow" x="-100%" y="-100%" width="300%" height="300%">
                    <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="white" floodOpacity="0.6" />
                  </filter>
                </defs>

                <path
                  d={ARC_PATH}
                  fill="none"
                  stroke="var(--color-border)"
                  strokeWidth="2"
                />

                <path
                  ref={arcTrackRef}
                  d={ARC_PATH}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  filter="url(#arc-glow)"
                  strokeDasharray={ARC_LENGTH}
                  strokeDashoffset={ARC_LENGTH}
                />

                {NODE_POSITIONS.map((pos, i) => (
                  <g key={i} onClick={() => jumpToStep(i)} className="cursor-pointer">
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={22}
                      fill="transparent"
                    />
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={7}
                      className={cn(
                        "transition-all duration-500",
                        i <= activeStep
                          ? "fill-[var(--color-accent)] stroke-[var(--color-accent)]"
                          : "fill-[var(--color-bg)] stroke-[var(--color-border)]"
                      )}
                      strokeWidth="2"
                    />
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={3}
                      className={cn(
                        "transition-all duration-500",
                        i <= activeStep ? "fill-white" : "fill-[var(--color-border)]"
                      )}
                    />
                  </g>
                ))}

                <g ref={headRef} filter="url(#head-glow)">
                  <circle cx="0" cy="0" r={5} fill="white" />
                </g>
              </svg>
            </div>

            <div className="relative flex-1 min-h-[320px] max-xl:min-h-[260px] max-w-[600px]">
              {jobs.map((job, i) => (
                <div
                  key={job.titleKey}
                  className={cn(
                    "absolute inset-0 transition-all duration-500",
                    i === activeStep
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-4 pointer-events-none"
                  )}
                >
                  <div className="mb-4">
                    <span className="text-[var(--color-accent)] text-sm font-medium tracking-[0.02em]">
                      {job.company}
                    </span>
                  </div>
                  <h3 className="text-[22px] font-semibold tracking-[-0.02em] mb-1.5 leading-tight">
                    {t(job.titleKey)}
                  </h3>
                  <span className="inline-block text-[13px] text-[var(--color-muted-2)] bg-white/[0.04] px-[11px] py-[5px] rounded-full border border-[var(--color-border)] mb-3.5">
                    {job.date}
                  </span>
                  <p className="text-[var(--color-muted)] text-[15px] mb-4">
                    {t(job.descKey)}
                  </p>
                  <ul className="list-none flex flex-col gap-2">
                    {job.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="text-sm text-[var(--color-muted)] pl-[22px] relative"
                      >
                        <span className="absolute left-0 top-0 text-[var(--color-accent)]">▹</span>
                        {t(bullet)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(255,255,255,0.03), transparent 70%)",
          }}
        />

        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-[var(--color-muted)] text-sm tracking-wide opacity-60">
            {t("exp.sub")}
          </p>
        </div>
      </div>
    </div>
  );
}
