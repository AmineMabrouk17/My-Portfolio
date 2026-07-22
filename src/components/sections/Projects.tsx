"use client";

import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Projects() {
  const { t } = useI18n();

  const mainProjects = [
    {
      icon: "video",
      titleKey: "proj.rizz.title",
      descKey: "proj.rizz.desc",
      tags: ["Next.js", "WebRTC", "Node.js", "Supabase", "Monorepo"],
      date: "2025 – Present",
    },
    {
      icon: "tower",
      subKey: "proj.ai.sub",
      titleKey: "proj.ai.title",
      descKey: "proj.ai.desc",
      tags: ["Hugging Face", "Python", "Flask", "Asterisk", "FastAGI"],
    },
  ];

  const landingPages = [
    { icon: "window", subKey: "proj.lp1.sub", titleKey: "proj.lp1.title", descKey: "proj.lp1.desc", link: "/landing-1" },
    { icon: "pager", subKey: "proj.lp2.sub", titleKey: "proj.lp2.title", descKey: "proj.lp2.desc", link: "/landing-2" },
    { icon: "compass", subKey: "proj.lp3.sub", titleKey: "proj.lp3.title", descKey: "proj.lp3.desc", link: "/landing-3" },
  ];

  const concepts = [
    {
      icon: "store",
      subKey: "proj.souq.sub",
      titleKey: "proj.souq.title",
      descKey: "proj.souq.desc",
      bullets: ["proj.souq.b1", "proj.souq.b2", "proj.souq.b3"],
      link: "/concepts/gumroad",
    },
    {
      icon: "gift",
      subKey: "proj.redeemly.sub",
      titleKey: "proj.redeemly.title",
      descKey: "proj.redeemly.desc",
      bullets: ["proj.redeemly.b1", "proj.redeemly.b2", "proj.redeemly.b3"],
      link: "/concepts/redeemly",
    },
  ];

  return (
    <section id="projects" className="py-[90px] max-lg:py-[70px]">
      <div className="max-w-[1200px] mx-auto px-8">
        <ScrollReveal>
          <div className="mb-12 flex items-end justify-between flex-wrap gap-5">
            <div>
              <div className="text-[var(--color-accent)] text-[13px] font-medium tracking-[0.15em] mb-2">
                {t("proj.num")}
              </div>
              <h2 className="text-[clamp(30px,4vw,44px)] font-bold tracking-[-0.03em] leading-none">
                {t("proj.h2")}
              </h2>
            </div>
            <p className="text-[var(--color-muted)] max-w-[480px] text-[15px]">
              {t("proj.sub")}
            </p>
          </div>
        </ScrollReveal>

        {/* Main Projects */}
        <div className="grid grid-cols-2 gap-[22px] max-lg:grid-cols-1 mb-[60px]">
          {mainProjects.map((project, i) => (
            <ScrollReveal key={project.titleKey} delay={i * 80}>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[20px] p-[30px] transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:border-[var(--color-accent)]" style={{ boxShadow: "0 20px 40px -20px rgba(255,107,107,0.0)" }}>
                <div className="w-[54px] h-[54px] rounded-[14px] bg-[rgba(255,169,77,0.1)] text-[var(--color-accent-2)] grid place-items-center text-[22px] mb-4.5">
                  {project.icon === "video" ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
                  )}
                </div>
                {project.subKey && (
                  <div className="text-[var(--color-muted-2)] text-[13px] mb-3.5 font-medium">
                    {t(project.subKey)}
                  </div>
                )}
                <div className="text-[var(--color-muted-2)] text-[13px] mb-3.5 font-medium">
                  {project.date}
                </div>
                <h3 className="text-[21px] font-semibold tracking-[-0.02em] mb-2">
                  {t(project.titleKey)}
                </h3>
                <p className="text-[var(--color-muted)] text-[14.5px] mb-4.5">
                  {t(project.descKey)}
                </p>
                <div className="flex flex-wrap gap-[7px] mb-4.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[12.5px] py-[5px] px-[11px] rounded-lg bg-white/[0.04] border border-[var(--color-border)] text-[var(--color-muted)] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Landing Pages */}
        <ScrollReveal>
          <h3 className="text-[24px] font-semibold mb-6 text-[var(--color-accent)] flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2" /><line x1="2" y1="8" x2="22" y2="8" /></svg>
            {t("proj.landing")}
          </h3>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-[22px] max-lg:grid-cols-1">
          {landingPages.map((page, i) => (
            <ScrollReveal key={page.titleKey} delay={i * 80}>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[20px] p-[30px] transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:border-[var(--color-accent)]">
                <div className="w-[54px] h-[54px] rounded-[14px] bg-[rgba(255,169,77,0.1)] text-[var(--color-accent-2)] grid place-items-center text-[22px] mb-4.5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                </div>
                <div className="text-[var(--color-muted-2)] text-[13px] mb-3.5 font-medium">
                  {t(page.subKey)}
                </div>
                <h3 className="text-[21px] font-semibold tracking-[-0.02em] mb-2">
                  {t(page.titleKey)}
                </h3>
                <p className="text-[var(--color-muted)] text-[14.5px] mb-4.5">
                  {t(page.descKey)}
                </p>
                <div className="flex flex-wrap gap-[7px] mb-4.5">
                  <span className="text-[12.5px] py-[5px] px-[11px] rounded-lg bg-white/[0.04] border border-[var(--color-border)] text-[var(--color-muted)] font-medium">HTML5</span>
                  <span className="text-[12.5px] py-[5px] px-[11px] rounded-lg bg-white/[0.04] border border-[var(--color-border)] text-[var(--color-muted)] font-medium">CSS3</span>
                  <span className="text-[12.5px] py-[5px] px-[11px] rounded-lg bg-white/[0.04] border border-[var(--color-border)] text-[var(--color-muted)] font-medium">JavaScript</span>
                </div>
                <a href={page.link} className="inline-flex items-center gap-2 text-[var(--color-accent)] no-underline text-[13.5px] font-semibold tracking-tight hover:gap-3 transition-all duration-200">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  {t("proj.demo")}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Concept Designs */}
        <ScrollReveal>
          <h3 className="text-[24px] font-semibold mt-14 mb-2 text-[var(--color-accent)] flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
            {t("proj.concept.h3")}
          </h3>
          <p className="text-[var(--color-muted)] text-[15px] mb-6 max-w-[640px]">
            {t("proj.concept.intro")}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-[22px] max-lg:grid-cols-1">
          {concepts.map((concept, i) => (
            <ScrollReveal key={concept.titleKey} delay={i * 80}>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[20px] p-[30px] transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:border-[var(--color-accent)]">
                <div className="w-[54px] h-[54px] rounded-[14px] bg-[rgba(255,169,77,0.1)] text-[var(--color-accent-2)] grid place-items-center text-[22px] mb-4.5">
                  {concept.icon === "store" ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" /></svg>
                  )}
                </div>
                <div className="text-[var(--color-muted-2)] text-[13px] mb-3.5 font-medium">
                  {t(concept.subKey)}
                </div>
                <h3 className="text-[21px] font-semibold tracking-[-0.02em] mb-2">
                  {t(concept.titleKey)}
                </h3>
                <p className="text-[var(--color-muted)] text-[14.5px] mb-4.5">
                  {t(concept.descKey)}
                </p>
                <ul className="text-[var(--color-muted)] text-[14.5px] mb-4.5 pl-[18px] flex flex-col gap-1.5">
                  {concept.bullets.map((bullet) => (
                    <li key={bullet}>{t(bullet)}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-[7px] mb-4.5">
                  <span className="text-[12.5px] py-[5px] px-[11px] rounded-lg bg-white/[0.04] border border-[var(--color-border)] text-[var(--color-muted)] font-medium">UI/UX</span>
                  <span className="text-[12.5px] py-[5px] px-[11px] rounded-lg bg-white/[0.04] border border-[var(--color-border)] text-[var(--color-muted)] font-medium">HTML5</span>
                  <span className="text-[12.5px] py-[5px] px-[11px] rounded-lg bg-white/[0.04] border border-[var(--color-border)] text-[var(--color-muted)] font-medium">CSS3</span>
                  <span className="text-[12.5px] py-[5px] px-[11px] rounded-lg bg-white/[0.04] border border-[var(--color-border)] text-[var(--color-muted)] font-medium">JavaScript</span>
                  <span className="text-[12.5px] py-[5px] px-[11px] rounded-lg bg-white/[0.04] border border-[var(--color-border)] text-[var(--color-muted)] font-medium">Responsive</span>
                </div>
                <a href={concept.link} className="inline-flex items-center gap-2 text-[var(--color-accent)] no-underline text-[13.5px] font-semibold tracking-tight hover:gap-3 transition-all duration-200">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  {t("proj.demo")}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA Banner */}
        <ScrollReveal>
          <div className="mt-8 border border-[var(--color-border-2)] rounded-[16px] p-7 px-8 bg-white/[0.02] flex items-center justify-between gap-6 flex-wrap">
            <p className="text-[var(--color-text)] text-base font-medium m-0 max-w-[520px]">
              {t("proj.concept.ctatext")}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl no-underline font-semibold text-sm bg-[var(--color-accent)] text-[var(--color-accent-dark)] transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
              </svg>
              {t("proj.concept.ctabtn")}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
