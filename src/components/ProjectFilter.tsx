"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap, Flip } from "@/lib/gsap";

const FILTER_TAGS = [
  { label: "All", value: "all" },
  { label: "Next.js", value: "nextjs" },
  { label: "Astro", value: "astro" },
  { label: "Solidity", value: "solidity" },
  { label: "AI", value: "ai" },
  { label: "Real-time", value: "realtime" },
] as const;

type FilterValue = (typeof FILTER_TAGS)[number]["value"];

interface TagMap {
  [key: string]: string[];
}

const TAG_MAP: TagMap = {
  castcue: ["nextjs", "realtime"],
  leadgen: ["astro"],
  ecom: ["nextjs"],
  budgetiq: ["nextjs", "ai"],
  trustless: ["solidity"],
  crypto: ["nextjs", "realtime"],
};

function matchesFilter(slug: string, filter: FilterValue): boolean {
  if (filter === "all") return true;
  return TAG_MAP[slug]?.includes(filter) ?? false;
}

interface ProjectFilterProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
  counts: Record<FilterValue, number>;
}

export default function ProjectFilter({ activeFilter, onFilterChange, counts }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {FILTER_TAGS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 cursor-pointer border ${
            activeFilter === value
              ? "bg-white text-black border-white"
              : "bg-transparent text-[var(--color-muted)] border-white/15 hover:border-white/30 hover:text-white"
          }`}
        >
          {label}
          <span className="ml-1.5 text-[11px] opacity-60">({counts[value]})</span>
        </button>
      ))}
    </div>
  );
}

export { matchesFilter, TAG_MAP, FILTER_TAGS };
export type { FilterValue };
