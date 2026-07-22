"use client";

import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

const skills = [
  {
    icon: "window",
    titleKey: "skills.frontend",
    tags: ["Angular 20", "Next.js 14", "React.js", "TypeScript", "JavaScript ES2025"],
  },
  {
    icon: "server",
    titleKey: "skills.backend",
    tags: ["Node.js", "Laravel 12 (PHP)", "Flask (Python)", "REST APIs"],
  },
  {
    icon: "database",
    titleKey: "skills.databases",
    tags: ["MySQL", "Supabase", "PostgreSQL", "NoSQL"],
  },
  {
    icon: "infinity",
    titleKey: "skills.devops",
    tags: ["Docker", "Git / GitHub"],
  },
  {
    icon: "cpu",
    titleKey: "skills.ai",
    tags: ["Hugging Face (NLP)", "Python", "Machine Learning"],
  },
];

const iconMap: Record<string, React.JSX.Element> = {
  window: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
  server: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>,
  database: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>,
  infinity: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 12c-2-2.67-4-4-6-4a4 4 0 100 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 000-8c-2 0-4 1.33-6 4z" /></svg>,
  cpu: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>,
};

export default function Skills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="py-[90px] max-lg:py-[70px]">
      <div className="max-w-[1200px] mx-auto px-8">
        <ScrollReveal>
          <div className="mb-12 flex items-end justify-between flex-wrap gap-5">
            <div>
              <div className="text-[var(--color-accent)] text-[13px] font-medium tracking-[0.15em] mb-2">
                {t("skills.num")}
              </div>
              <h2 className="text-[clamp(30px,4vw,44px)] font-bold tracking-[-0.03em] leading-none">
                {t("skills.h2")}
              </h2>
            </div>
            <p className="text-[var(--color-muted)] max-w-[480px] text-[15px]">
              {t("skills.sub")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
          {skills.map((skill, i) => (
            <ScrollReveal key={skill.titleKey} delay={i * 80}>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[18px] p-[26px] transition-all duration-300 relative overflow-hidden hover:border-[var(--color-border-2)] hover:-translate-y-[3px] hover:bg-[var(--color-surface-2)] group">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="w-[46px] h-[46px] rounded-[12px] bg-[rgba(255,107,107,0.08)] text-[var(--color-accent)] grid place-items-center text-xl mb-4.5">
                  {iconMap[skill.icon]}
                </div>
                <h3 className="text-lg font-semibold mb-3.5">
                  {t(skill.titleKey)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
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
      </div>
    </section>
  );
}
