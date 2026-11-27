"use client";

import { useRef, useState, useEffect } from "react";
import { useI18n } from "@/i18n/I18nContext";
import styles from "./experience.module.css";
import { AnimatedText } from "@/components/motion/animated-text";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const jobs = [
  {
    company: "Infraway",
    titleKey: "exp.job1.title",
    dateKey: "exp.job1.date",
    descKey: "exp.job1.desc",
    bullets: ["exp.job1.b1", "exp.job1.b2", "exp.job1.b3"],
    tech: ["Angular", "Laravel", "PHP", "TypeScript", "REST APIs", "Git"],
  },
  {
    company: "Infraway",
    titleKey: "exp.job2.title",
    dateKey: "exp.job2.date",
    descKey: "exp.job2.desc",
    bullets: ["exp.job2.b1", "exp.job2.b2", "exp.job2.b3"],
    tech: ["Python", "Flask", "MySQL", "Grafana", "REST APIs"],
  },
];

function SectionHeading({ t }: { t: (key: string) => string }) {
  return (
    <div className="mb-12">
      <div className="text-[var(--color-accent)] font-mono text-[12px] font-medium tracking-[0.16em] mb-2">
        {t("exp.num")}
      </div>
      <AnimatedText
        as="h2"
        text={t("exp.h2")}
        className="text-[clamp(32px,4.2vw,46px)] font-bold tracking-[-0.025em] leading-none"
      />
      <p className="mt-3 max-w-[46ch] text-pretty text-[16px] text-[var(--color-muted)]">{t("exp.sub")}</p>
    </div>
  );
}

function JobCard({ t, job, index }: { t: (key: string) => string; job: (typeof jobs)[number]; index: number }) {
  return (
    <article
      data-card-index={index}
      className="timeline-card rounded-[18px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7 transition-colors hover:border-[var(--color-accent)]/40"
    >
      <div className="flex items-center justify-between flex-wrap gap-2.5 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-accent)] text-sm font-medium">{job.company}</span>
        </div>
        <span className="font-mono text-[11px] tracking-[0.06em] text-[var(--color-muted-2)] bg-white/[0.04] px-[11px] py-[5px] rounded-full border border-[var(--color-border)] whitespace-nowrap">
          <bdi dir="ltr">{t(job.dateKey)}</bdi>
        </span>
      </div>

      <h3 className="text-[21px] font-semibold leading-snug tracking-[-0.02em] mb-2.5">
        {t(job.titleKey)}
      </h3>

      <p className="text-[var(--color-muted)] text-[16px] mb-4">{t(job.descKey)}</p>

      <ul className="space-y-2 mb-5">
        {job.bullets.map((bullet) => (
          <li key={bullet} className="text-sm text-[var(--color-muted)] ps-[22px] relative">
            <span className="absolute start-0 top-0 text-[var(--color-accent)]">▹</span>
            {t(bullet)}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {job.tech.map((tech) => (
          <span
            key={tech}
            className="text-xs text-[var(--color-muted-2)] bg-[var(--color-bg-2)] px-2.5 py-1 rounded-md border border-[var(--color-border)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}

function SectionMarkup({ t }: { t: (key: string) => string }) {
  return (
    <div id="timeline" className="flex flex-col gap-10 lg:gap-12">
      {jobs.map((job, i) => (
        <JobCard key={job.titleKey} t={t} job={job} index={i} />
      ))}
    </div>
  );
}

function StaticExperience({ t }: { t: (key: string) => string }) {
  return (
    <section id="experience" className="py-[90px] max-lg:py-[70px]">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionHeading t={t} />
        <div id="timeline" className="flex flex-col gap-10">
          {jobs.map((job, i) => (
            <div key={job.titleKey} className="relative ps-8 border-s-2 border-[var(--color-accent)]/30">
              <div
                className="absolute start-[-9px] top-1 w-[17px] h-[17px] rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-accent)]"
                style={{ boxShadow: "0 0 14px color-mix(in srgb, var(--color-accent) 50%, transparent)" }}
              />
              <JobCard t={t} job={job} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Experience() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 768px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      setReducedMotion(mqReduced.matches);
      setIsDesktop(mqDesktop.matches);
      setReady(true);
    };

    apply();
    mqDesktop.addEventListener("change", apply);
    mqReduced.addEventListener("change", apply);
    return () => {
      mqDesktop.removeEventListener("change", apply);
      mqReduced.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    if (!ready || reducedMotion) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");

      if (isDesktop) {
        gsap.fromTo(
          cards,
          { x: 120, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 82%",
            },
          },
        );
      } else {
        gsap.fromTo(
          cards,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 85%",
            },
          },
        );
      }

      cards.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) {
              setActive(Number(card.dataset.cardIndex ?? 0));
            }
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [ready, reducedMotion, isDesktop]);

  // The rail fills with the section's own scroll progress: the timeline is
  // drawn, not simply present.
  useEffect(() => {
    if (!ready || reducedMotion || !isDesktop) return;
    const root = rootRef.current;
    const rail = railRef.current;
    if (!root || !rail) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const r = root.getBoundingClientRect();
      const start = window.innerHeight * 0.75;
      const total = Math.max(1, r.height - window.innerHeight * 0.2);
      const p = Math.min(1, Math.max(0, (start - r.top) / total));
      rail.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ready, reducedMotion, isDesktop]);

  if (!ready || reducedMotion) {
    return <StaticExperience t={t} />;
  }

  return (
    <section id="experience" ref={rootRef} className="py-[90px] max-lg:py-[70px]">
      <div className="max-w-[1200px] mx-auto px-8">
        <SectionHeading t={t} />

        <div className="md:grid md:grid-cols-[132px_1fr] md:gap-12">
          {isDesktop && (
            <div className="hidden md:block">
              <div className="md:sticky md:top-32">
                <div className="relative">
                  <div
                    ref={railRef}
                    className={`${styles.rail} absolute start-[7px] top-1 bottom-1 w-px`}
                    style={{ background: "var(--color-border-2)" }}
                  >
                    <span className={styles.fill} aria-hidden="true" />
                  </div>
                  {jobs.map((job, i) => {
                    const isActive = i === active;
                    return (
                      <button
                        key={job.titleKey}
                        type="button"
                        onClick={() => {
                          setActive(i);
                          document
                            .querySelector(`[data-card-index="${i}"]`)
                            ?.scrollIntoView({ behavior: "smooth", block: "center" });
                        }}
                        aria-label={`${t(job.titleKey)} — ${t(job.dateKey)}`}
                        className="relative z-10 mb-[56px] -ms-3.5 grid h-11 w-11 place-items-center rounded-full cursor-pointer last:mb-0"
                      >
                        <span
                          aria-hidden="true"
                          className="block h-4 w-4 rounded-full transition-[background-color,border-color,box-shadow] duration-200 ease-[var(--ease-out)]"
                          style={{
                            background: isActive ? "var(--color-accent)" : "var(--color-bg-2)",
                            border: isActive ? "1px solid var(--color-accent)" : "1px solid var(--color-border-2)",
                            boxShadow: isActive
                              ? "0 0 18px color-mix(in srgb, var(--color-accent) 60%, transparent)"
                              : "none",
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <SectionMarkup t={t} />
        </div>
      </div>
    </section>
  );
}
