"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useI18n } from "@/i18n/I18nContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Project {
  id: string;
  titleKey: string;
  categoryKey: string;
  year: string;
  href?: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: "castcue",
    titleKey: "proj.castcue.title",
    categoryKey: "proj.castcue.sub",
    year: "2026",
    href: "https://cast-cue.cast-cue.workers.dev",
    image: "/projects/castncue.png",
  },
  {
    id: "leadgen",
    titleKey: "proj.leadgen.title",
    categoryKey: "proj.leadgen.sub",
    year: "2026",
    href: "https://lead-generation-landing-page.pages.dev",
    image: "/projects/lead-generation.png",
  },
  {
    id: "ecom",
    titleKey: "proj.ecom.title",
    categoryKey: "proj.ecom.sub",
    year: "2026",
    href: "https://ecommerce-website-puce-beta.vercel.app/",
    image: "/projects/ecommerce.png",
  },
  {
    id: "budgetiq",
    titleKey: "proj.budgetiq.title",
    categoryKey: "proj.budgetiq.sub",
    year: "2026",
    href: "https://budgetiq-two.vercel.app",
    image: "/projects/budgetiq.png",
  },
  {
    id: "trustless",
    titleKey: "proj.trustless.title",
    categoryKey: "proj.trustless.sub",
    year: "2026",
    href: "https://trustless-escrow-demo.vercel.app",
    image: "/projects/trustlesseScrow.png",
  },
  {
    id: "crypto",
    titleKey: "proj.crypto.title",
    categoryKey: "proj.crypto.sub",
    year: "2026",
    href: "https://crypto-stocks-web-taupe.vercel.app",
    image: "/projects/crypto-stocks/hero-dashboard.png",
  },
];

const OFFSET_X = 20;
const OFFSET_Y = -140;

export default function ProjectList() {
  const { t } = useI18n();
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;

    // Floating cursor-follow preview: fine pointer + desktop only
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!canHover || !isDesktop) return;

    const rtl = document.documentElement.dir === "rtl";
    const offsetX = rtl ? -OFFSET_X - preview.offsetWidth : OFFSET_X;

    gsap.set(preview, { x: 0, y: 0, scale: 0.8 });

    const xTo = gsap.quickTo(preview, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.45, ease: "power3" });

    let visible = false;

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX + offsetX);
      yTo(e.clientY + OFFSET_Y);
    };

    const onOver = (e: MouseEvent) => {
      const row = (e.target as HTMLElement).closest<HTMLElement>("[data-project-row]");
      if (!row) return;
      if (!visible) {
        visible = true;
        // Snap to entry point so the preview doesn't lerp across the screen
        gsap.set(preview, { x: e.clientX + offsetX, y: e.clientY + OFFSET_Y });
        gsap.to(preview, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        });
      }
      const index = Number(row.dataset.projectRow);
      setActiveIndex((prev) => (prev === index ? prev : index));
    };

    const onHide = () => {
      if (!visible) return;
      visible = false;
      gsap.to(preview, {
        autoAlpha: 0,
        scale: 0.8,
        duration: 0.25,
        ease: "power2.in",
        overwrite: true,
      });
    };

    list.addEventListener("mousemove", onMove);
    list.addEventListener("mouseover", onOver);
    list.addEventListener("mouseleave", onHide);

    return () => {
      list.removeEventListener("mousemove", onMove);
      list.removeEventListener("mouseover", onOver);
      list.removeEventListener("mouseleave", onHide);
      gsap.killTweensOf(preview);
    };
  }, []);

  return (
    <>
      <ScrollReveal>
        <div
          ref={listRef}
          className="border-t border-[var(--color-border)]"
          role="list"
        >
          {PROJECTS.map((project, i) => (
            <a
              key={project.id}
              role="listitem"
              data-project-row={i}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group -mx-3 block rounded-lg px-3 py-5 transition-colors duration-300 hover:bg-white/[0.03] md:py-6"
            >
              <div className="mb-4 aspect-[16/10] w-full overflow-hidden rounded-lg border border-[var(--color-border)] bg-[#0a0d14] md:hidden">
                <img
                  src={project.image}
                  alt={t(project.titleKey)}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center gap-4 md:gap-6">
                <span className="text-sm tabular-nums text-[var(--color-muted-2)] transition-colors duration-300 group-hover:text-[var(--color-accent-3)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="min-w-0 flex-1 truncate text-base font-semibold tracking-tight transition-all duration-300 group-hover:italic md:text-xl ltr:group-hover:translate-x-2 rtl:group-hover:-translate-x-2">
                  {t(project.titleKey)}
                </h3>
                <span className="hidden max-w-[260px] truncate text-sm text-[var(--color-muted)] sm:block">
                  {t(project.categoryKey)}
                </span>
                <span className="hidden text-sm tabular-nums text-[var(--color-muted)] md:block">
                  {project.year}
                </span>
                <span
                  aria-hidden
                  className="text-lg text-[var(--color-muted)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent-3)]"
                >
                  &#8599;
                </span>
              </div>
            </a>
          ))}
        </div>
      </ScrollReveal>

      {/* Floating cursor-follow preview — kept outside ScrollReveal because its
          persistent transform would break position: fixed */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 hidden opacity-0 invisible md:block"
      >
        <div className="relative aspect-[16/10] w-[400px] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[#0a0d14] shadow-2xl shadow-black/50">
          {PROJECTS.map((project, i) => (
            <img
              key={project.id}
              src={project.image}
              alt=""
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
                i === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
