"use client";

import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

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

export default function Experience() {
  const { t } = useI18n();

  return (
    <section id="experience" className="py-[90px] max-lg:py-[70px]">
      <div className="max-w-[1200px] mx-auto px-8">
        <ScrollReveal>
          <div className="mb-12 flex items-end justify-between flex-wrap gap-5">
            <div>
              <div className="text-[var(--color-accent)] text-[13px] font-medium tracking-[0.15em] mb-2">
                {t("exp.num")}
              </div>
              <h2 className="text-[clamp(30px,4vw,44px)] font-bold tracking-[-0.03em] leading-none">
                {t("exp.h2")}
              </h2>
            </div>
            <p className="text-[var(--color-muted)] max-w-[480px] text-[15px]">
              {t("exp.sub")}
            </p>
          </div>
        </ScrollReveal>

        <div className="timeline relative pl-[30px]">
          <div
            className="absolute left-2 top-2 bottom-2 w-px"
            style={{
              background: "linear-gradient(to bottom, var(--color-accent), var(--color-accent-2), transparent)",
            }}
          />

          {jobs.map((job, i) => (
            <ScrollReveal key={job.titleKey} delay={i * 100}>
              <div className="relative pb-[42px] job">
                <div
                  className="absolute left-[-30px] top-1.5 w-[17px] h-[17px] rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-accent)]"
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
                    <li
                      key={bullet}
                      className="text-sm text-[var(--color-muted)] pl-[22px] relative"
                    >
                      <span className="absolute left-0 top-0 text-[var(--color-accent)]">
                        ▹
                      </span>
                      {t(bullet)}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
