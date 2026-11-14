"use client";

import { useI18n } from "@/i18n/I18nContext";

const FILTER_TAGS = [
  { labelKey: "proj.filter.all", value: "all" },
  { labelKey: "proj.filter.nextjs", value: "nextjs" },
  { labelKey: "proj.filter.ai", value: "ai" },
  { labelKey: "proj.filter.realtime", value: "realtime" },
  { labelKey: "proj.filter.bots", value: "bots" },
] as const;

type FilterValue = (typeof FILTER_TAGS)[number]["value"];

interface TagMap {
  [key: string]: string[];
}

const TAG_MAP: TagMap = {
  crypto: ["nextjs", "realtime"],
  castcue: ["nextjs", "realtime"],
  ecom: ["nextjs"],
  budgetiq: ["nextjs", "ai"],
  rakt3adi: ["bots"],
  saletbot: ["bots", "ai"],
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
  const { t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("proj.filter.label")}
      className="flex flex-wrap gap-2 mb-8"
    >
      {FILTER_TAGS.map(({ labelKey, value }) => {
        const active = activeFilter === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onFilterChange(value)}
            aria-pressed={active}
            className={`inline-flex min-h-[44px] items-center px-4 rounded-full text-[13px] font-semibold transition-all duration-200 cursor-pointer border ${
              active
                ? "border-[var(--color-accent)] text-[var(--color-text)] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)]"
                : "bg-transparent text-[var(--color-muted)] border-[var(--color-field-border)] hover:border-white/30 hover:text-white"
            }`}
          >
            {t(labelKey)}
            <span className="ms-1.5 text-[11px] text-[var(--color-muted-2)]">
              ({counts[value]})
            </span>
          </button>
        );
      })}
    </div>
  );
}

export { matchesFilter, TAG_MAP, FILTER_TAGS };
export type { FilterValue };
