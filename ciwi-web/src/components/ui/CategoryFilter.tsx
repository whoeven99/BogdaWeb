"use client";

import {useMemo, useState, useId} from "react";

type CategoryStub = {
  slug: string;
  name: string;
  count: number;
  sampleKeywords: string[];
  sampleTitles: string[];
};

type ScenarioSearchProps = {
  locale: "en" | "zh-cn";
  productSlug: string;
  categories: CategoryStub[];
  currentPage: number;
  totalPages: number;
  activeTopicSlug?: string | null;
  onActiveTopicChange?: (slug: string | null) => void;
};

const searchCopy: Record<
  "en" | "zh-cn",
  {
    placeholder: string;
    clearLabel: string;
    resultSummary: (
      matchingCats: number,
      totalCats: number,
      matchingItems: number,
      totalItems: number,
    ) => string;
  }
> = {
  "zh-cn": {
    placeholder: "搜索主题名或场景关键词，例如：选品、广告投放、库存、SEO、退货话术…",
    clearLabel: "清除",
    resultSummary: (mc, tc, mi, ti) =>
      `匹配 ${mc.toLocaleString()}/${tc.toLocaleString()} 个主题 · ${mi.toLocaleString()}/${ti.toLocaleString()} 条场景`,
  },
  en: {
    placeholder: "Filter by topic or keyword, e.g. product research, ads, inventory, SEO, returns…",
    clearLabel: "Clear",
    resultSummary: (mc, tc, mi, ti) =>
      `${mc.toLocaleString()}/${tc.toLocaleString()} topics · ${mi.toLocaleString()}/${ti.toLocaleString()} scenarios match`,
  },
};

export type CategoryMatchContext = {
  normalizedQuery: string;
  activeTopicSlug: string | null;
  categories: CategoryStub[];
};

export function buildScenarioHideStyle(ctx: CategoryMatchContext): string {
  const {normalizedQuery, activeTopicSlug, categories} = ctx;
  const hasQuery = !!normalizedQuery;
  const hasTopic = !!activeTopicSlug;

  if (!hasQuery && !hasTopic) return "";
  return categories
    .map((c) => {
      const topicOk = !hasTopic || activeTopicSlug === c.slug;
      let queryOk = true;
      if (hasQuery) {
        const haystack =
          c.name.toLowerCase() +
          " " +
          c.sampleKeywords.join(" ").toLowerCase() +
          " " +
          c.sampleTitles.join(" ").toLowerCase();
        queryOk = haystack.includes(normalizedQuery);
      }
      if (topicOk && queryOk) {
        return `[data-cat-slug="${CSS.escape(c.slug)}"]{display:block !important}`;
      }
      return `[data-cat-slug="${CSS.escape(c.slug)}"]{display:none !important}`;
    })
    .join("\n");
}

export function ScenarioSearch({
  locale,
  productSlug,
  categories,
  currentPage,
  totalPages,
  activeTopicSlug = null,
  onActiveTopicChange,
}: ScenarioSearchProps) {
  void productSlug;
  const [query, setQuery] = useState("");
  const [touched, setTouched] = useState(false);
  const labelId = useId();
  const text = searchCopy[locale];

  const normalized = useMemo(() => query.trim().toLowerCase(), [query]);

  const {matchingCats, matchingItems} = useMemo(() => {
    const {normalizedQuery, activeTopicSlug: active, cats: catList} = {
      normalizedQuery: normalized,
      activeTopicSlug,
      cats: categories,
    };
    const hasQuery = !!normalizedQuery;
    const hasTopic = !!active;
    let matchedCats = 0;
    let matchedItems = 0;
    for (const c of catList) {
      const topicOk = !hasTopic || active === c.slug;
      let queryOk = true;
      if (hasQuery) {
        const haystack =
          c.name.toLowerCase() +
          " " +
          c.sampleKeywords.join(" ").toLowerCase() +
          " " +
          c.sampleTitles.join(" ").toLowerCase();
        queryOk = haystack.includes(normalizedQuery);
      }
      if (topicOk && queryOk) {
        matchedCats++;
        matchedItems += c.count;
      }
    }
    return {matchingCats: matchedCats, matchingItems: matchedItems};
  }, [categories, normalized, activeTopicSlug]);

  const totalItems = useMemo(
    () => categories.reduce((acc, c) => acc + c.count, 0),
    [categories],
  );

  const pageText =
    locale === "zh-cn"
      ? `第 ${currentPage}/${totalPages} 页`
      : `Page ${currentPage} of ${totalPages}`;

  const hideStyle = useMemo(
    () => buildScenarioHideStyle({normalizedQuery: normalized, activeTopicSlug, categories}),
    [normalized, activeTopicSlug, categories],
  );

  return (
    <div className="space-y-3.5">
      <div>
        <label htmlFor={labelId} className="sr-only">
          {text.placeholder}
        </label>
        <div className="relative">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id={labelId}
            type="search"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setTouched(true);
            }}
            placeholder={text.placeholder}
            className="block w-full rounded-full border border-slate-200 bg-white px-11 py-3 text-[14.5px] leading-6 text-slate-800 placeholder:text-slate-400 transition focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100/60 sm:py-3.5 sm:text-[15px]"
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
            {activeTopicSlug && onActiveTopicChange && (
              <button
                type="button"
                onClick={() => onActiveTopicChange(null)}
                className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold tracking-[0.04em] text-emerald-800 transition hover:bg-emerald-100"
              >
                {locale === "zh-cn" ? "清除主题筛选" : "Clear topic filter"} ×
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setTouched(false);
              }}
              className={
                "hidden items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium tracking-[0.14em] uppercase text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 sm:inline-flex " +
                (touched && normalized ? "" : "sm:hidden ")
              }
            >
              {text.clearLabel}
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-1.5 text-[12.5px] leading-6 text-slate-500 sm:text-[13px]">
        <div className="font-medium text-slate-600">
          {text.resultSummary(matchingCats, categories.length, matchingItems, totalItems)}
        </div>
        {totalPages > 1 && <div className="font-medium text-slate-500">{pageText}</div>}
      </div>
      <style dangerouslySetInnerHTML={{__html: hideStyle}} />
    </div>
  );
}

export type TopicChip = {
  slug: string;
  name: string;
  count: number;
};

type TopicChipsProps = {
  locale: "en" | "zh-cn";
  chips: TopicChip[];
  activeTopicSlug: string | null;
  onActiveTopicChange: (slug: string | null) => void;
};

const chipsCopy: Record<
  "en" | "zh-cn",
  {
    eyebrow: string;
    clearAll: string;
    topicChipCountLabel: (n: number) => string;
  }
> = {
  "zh-cn": {
    eyebrow: "当前页主题快速筛选",
    clearAll: "全部",
    topicChipCountLabel: (n) => `${n}`,
  },
  en: {
    eyebrow: "Topics on this page",
    clearAll: "All",
    topicChipCountLabel: (n) => `${n}`,
  },
};

export function TopicChips({
  locale,
  chips,
  activeTopicSlug,
  onActiveTopicChange,
}: TopicChipsProps) {
  const text = chipsCopy[locale];
  if (chips.length === 0) return null;
  const total = chips.reduce((acc, c) => acc + c.count, 0);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-[11.5px] font-medium uppercase tracking-[0.18em] text-slate-400">
          {text.eyebrow}
          <span className="ml-3 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.12em] text-slate-500">
            {chips.length} {locale === "zh-cn" ? "主题 · " : "topics · "}
            {total.toLocaleString()}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onActiveTopicChange(null)}
          className={
            "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold tracking-[0.04em] transition " +
            (activeTopicSlug
              ? "border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
              : "border-transparent bg-slate-950 text-white hover:bg-emerald-700")
          }
        >
          {text.clearAll}
        </button>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {chips.map((chip) => {
          const active = activeTopicSlug === chip.slug;
          return (
            <button
              key={chip.slug}
              type="button"
              onClick={() =>
                onActiveTopicChange(active ? null : chip.slug)
              }
              aria-pressed={active}
              className={
                "group inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium leading-5 transition " +
                (active
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100"
                  : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700")
              }
            >
              <span className="max-w-[220px] truncate sm:max-w-[260px] lg:max-w-[300px]">
                {chip.name}
              </span>
              <span
                className={
                  "inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-semibold tracking-[0.02em] " +
                  (active
                    ? "bg-emerald-200/70 text-emerald-900"
                    : "bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-800")
                }
              >
                {text.topicChipCountLabel(chip.count)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

type ScenarioFilterBarProps = {
  locale: "en" | "zh-cn";
  productSlug: string;
  categories: CategoryStub[];
  chips: TopicChip[];
  currentPage: number;
  totalPages: number;
};

export function ScenarioFilterBar({
  locale,
  productSlug,
  categories,
  chips,
  currentPage,
  totalPages,
}: ScenarioFilterBarProps) {
  const [activeTopicSlug, setActiveTopicSlug] = useState<string | null>(null);
  return (
    <div className="space-y-5">
      <ScenarioSearch
        locale={locale}
        productSlug={productSlug}
        categories={categories}
        currentPage={currentPage}
        totalPages={totalPages}
        activeTopicSlug={activeTopicSlug}
        onActiveTopicChange={setActiveTopicSlug}
      />
      <TopicChips
        locale={locale}
        chips={chips}
        activeTopicSlug={activeTopicSlug}
        onActiveTopicChange={setActiveTopicSlug}
      />
    </div>
  );
}

type PaginationItem =
  | {type: "prev"; href?: string; disabled?: boolean}
  | {type: "next"; href?: string; disabled?: boolean}
  | {type: "page"; page: number; label: string; href: string; active?: boolean}
  | {type: "ellipsis"};

type PaginationNavProps = {
  locale: "en" | "zh-cn";
  currentPage: number;
  totalPages: number;
  pagination: PaginationItem[];
};

const navCopy: Record<
  "en" | "zh-cn",
  {
    pagePrev: string;
    pageNext: string;
    pageCurrentLabel: (page: number, totalPages: number) => string;
  }
> = {
  "zh-cn": {
    pagePrev: "上一页",
    pageNext: "下一页",
    pageCurrentLabel: (p, tp) => `第 ${p} 页，共 ${tp} 页`,
  },
  en: {
    pagePrev: "Previous",
    pageNext: "Next",
    pageCurrentLabel: (p, tp) => `Page ${p} of ${tp}`,
  },
};

export function PaginationNav({
  locale,
  currentPage,
  totalPages,
  pagination,
}: PaginationNavProps) {
  if (totalPages <= 1) return null;
  const text = navCopy[locale];
  const prev = pagination.find(
    (p): p is Extract<PaginationItem, {type: "prev"}> => p.type === "prev",
  );
  const next = pagination.find(
    (p): p is Extract<PaginationItem, {type: "next"}> => p.type === "next",
  );
  return (
    <nav
      aria-label={text.pageCurrentLabel(currentPage, totalPages)}
      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 sm:px-5 sm:py-3.5"
    >
      {prev?.disabled ? (
        <span
          aria-disabled="true"
          className="ui-btn ui-btn--pagination-prevnext cursor-not-allowed opacity-45"
        >
          ← {text.pagePrev}
        </span>
      ) : (
        <a
          href={prev?.href ?? "#"}
          className="ui-btn ui-btn--pagination-prevnext"
        >
          ← {text.pagePrev}
        </a>
      )}

      <ol className="flex flex-wrap items-center gap-1.5">
        {pagination.map((p, i) => {
          if (p.type === "ellipsis") {
            return (
              <li
                key={`e-${i}`}
                aria-hidden="true"
                className="px-2 py-1 text-slate-400"
              >
                …
              </li>
            );
          }
          if (p.type !== "page") return null;
          return (
            <li key={`p-${p.page}`}>
              <a
                href={p.href}
                aria-current={p.active ? "page" : undefined}
                className={
                  "ui-btn " +
                  (p.active ? "ui-btn--pagination is-active" : "ui-btn--pagination")
                }
              >
                {p.label}
              </a>
            </li>
          );
        })}
      </ol>

      {next?.disabled ? (
        <span
          aria-disabled="true"
          className="ui-btn ui-btn--pagination-prevnext cursor-not-allowed opacity-45"
        >
          {text.pageNext} →
        </span>
      ) : (
        <a
          href={next?.href ?? "#"}
          className="ui-btn ui-btn--pagination-prevnext"
        >
          {text.pageNext} →
        </a>
      )}
    </nav>
  );
}
