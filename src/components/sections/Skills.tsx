"use client";

import type { IconType } from "react-icons";
import {
  SiAngular,
  SiBetterauth,
  SiCloudflare,
  SiCloudflareworkers,
  SiDocker,
  SiEslint,
  SiGithubactions,
  SiGooglegemini,
  SiHeroui,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNvidia,
  SiOpenrouter,
  SiPnpm,
  SiPostgresql,
  SiPytest,
  SiPython,
  SiReact,
  SiRust,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTelegram,
  SiTokio,
  SiTurborepo,
  SiTypescript,
  SiUpstash,
  SiVitest,
  SiZod,
} from "react-icons/si";
import { TbApi, TbSettings } from "react-icons/tb";
import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { AnimatedText } from "@/components/motion/animated-text";

const skills = [
  {
    icon: "window",
    titleKey: "skills.frontend",
    evidenceKey: "skills.evidence.frontend",
    tags: ["Angular", "Next.js", "React", "TypeScript", "Tailwind CSS", "HeroUI"],
  },
  {
    icon: "server",
    titleKey: "skills.backend",
    evidenceKey: "skills.evidence.backend",
    tags: ["Rust", "Tokio", "Python", "Laravel", "Node.js", "REST APIs", "Better Auth", "Telegram Bot API"],
  },
  {
    icon: "database",
    titleKey: "skills.databases",
    evidenceKey: "skills.evidence.databases",
    tags: ["PostgreSQL", "Supabase", "Cloudflare D1", "Upstash Redis", "MySQL", "SQLite"],
  },
  {
    icon: "infinity",
    titleKey: "skills.devops",
    evidenceKey: "skills.evidence.devops",
    tags: ["Cloudflare Workers", "Docker", "GitHub Actions", "systemd", "pnpm", "Turborepo"],
  },
  {
    icon: "cpu",
    titleKey: "skills.ai",
    evidenceKey: "skills.evidence.ai",
    tags: ["Gemini", "OpenRouter", "NVIDIA NIM", "Zod"],
  },
  {
    icon: "shield",
    titleKey: "skills.testing",
    evidenceKey: "skills.evidence.testing",
    tags: ["pytest", "Vitest", "Playwright", "ESLint", "Pyright"],
  },
];

const techIcons: Record<string, IconType> = {
  Angular: SiAngular,
  "Next.js": SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  HeroUI: SiHeroui,
  Rust: SiRust,
  Tokio: SiTokio,
  Python: SiPython,
  Laravel: SiLaravel,
  "Node.js": SiNodedotjs,
  "REST APIs": TbApi,
  "Better Auth": SiBetterauth,
  "Telegram Bot API": SiTelegram,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  "Cloudflare D1": SiCloudflare,
  "Upstash Redis": SiUpstash,
  MySQL: SiMysql,
  SQLite: SiSqlite,
  "Cloudflare Workers": SiCloudflareworkers,
  Docker: SiDocker,
  "GitHub Actions": SiGithubactions,
  systemd: TbSettings,
  pnpm: SiPnpm,
  Turborepo: SiTurborepo,
  Gemini: SiGooglegemini,
  OpenRouter: SiOpenrouter,
  "NVIDIA NIM": SiNvidia,
  Zod: SiZod,
  pytest: SiPytest,
  Vitest: SiVitest,
  ESLint: SiEslint,
};

const iconMap: Record<string, React.JSX.Element> = {
  window: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
  server: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>,
  database: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>,
  infinity: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 12c-2-2.67-4-4-6-4a4 4 0 100 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 000-8c-2 0-4 1.33-6 4z" /></svg>,
  cpu: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>,
  shield: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>,
};

export default function Skills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="py-[90px] max-lg:py-[70px]">
      <div className="max-w-[1200px] mx-auto px-8">
        <ScrollReveal>
          <div className="mb-12 flex items-end justify-between flex-wrap gap-5">
            <div>
              <div className="text-[var(--color-accent)] font-mono text-[12px] font-medium tracking-[0.16em] mb-2">
                {t("skills.num")}
              </div>
              <AnimatedText
                as="h2"
                text={t("skills.h2")}
                className="text-[clamp(32px,4.2vw,46px)] font-bold tracking-[-0.025em] leading-none"
              />
            </div>
            <p className="max-w-[480px] text-pretty text-[16px] text-[var(--color-muted)]">
              {t("skills.sub")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {skills.map((skill, i) => (
            <ScrollReveal
              key={skill.titleKey}
              delay={i * 80}
            >
              <div className="group relative h-full overflow-hidden rounded-[18px] border border-[var(--color-border)] bg-[var(--color-surface)] p-[26px] transition-colors duration-300 hover:border-[var(--color-border-2)] hover:bg-[var(--color-surface-2)]">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="w-[46px] h-[46px] rounded-[12px] bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)] text-[var(--color-accent)] grid place-items-center text-xl mb-4.5">
                  {iconMap[skill.icon]}
                </div>
                <h3 className="mb-1 text-lg font-semibold">
                  {t(skill.titleKey)}
                </h3>
                <p className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-muted-2)]">
                  {t(skill.evidenceKey)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag) => {
                    const TechIcon = techIcons[tag];
                    return (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 text-[12px] py-[5px] px-[11px] rounded-lg bg-white/[0.04] border border-[var(--color-border)] text-[var(--color-muted)] font-medium"
                      >
                        {TechIcon ? <TechIcon size={13} className="shrink-0" aria-hidden="true" /> : null}
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
