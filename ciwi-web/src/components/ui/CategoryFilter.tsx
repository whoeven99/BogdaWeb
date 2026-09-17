"use client";

import {useEffect, useMemo, useRef, useState, useId} from "react";

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
  quickTopics?: TopicChip[];
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
      topicFilterLabel: string;
      allTopicsLabel: string;
      clearTopicLabel: string;
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
      topicFilterLabel: "主题筛选",
      allTopicsLabel: "全部主题",
      clearTopicLabel: "清除主题筛选",
    resultSummary: (mc, tc, mi, ti) =>
      `匹配 ${mc.toLocaleString()}/${tc.toLocaleString()} 个主题 · ${mi.toLocaleString()}/${ti.toLocaleString()} 条场景`,
  },
  en: {
    placeholder: "Filter by topic or keyword, e.g. product research, ads, inventory, SEO, returns…",
    clearLabel: "Clear",
      topicFilterLabel: "Topic filter",
      allTopicsLabel: "All topics",
      clearTopicLabel: "Clear topic filter",
    resultSummary: (mc, tc, mi, ti) =>
      `${mc.toLocaleString()}/${tc.toLocaleString()} topics · ${mi.toLocaleString()}/${ti.toLocaleString()} scenarios match`,
  },
};

export type CategoryMatchContext = {
  normalizedQuery: string;
  activeTopicSlug: string | null;
  categories: CategoryStub[];
};

function normalizeFilterIdentity(slug: string, name: string): string {
  const normalizedSlug = String(slug ?? "").trim();
  if (normalizedSlug) return normalizedSlug;
  return String(name ?? "").trim().toLowerCase();
}

function dedupeCategories(categories: CategoryStub[]): CategoryStub[] {
  const seen = new Set<string>();
  return categories.filter((category) => {
    const identity = normalizeFilterIdentity(category.slug, category.name);
    if (!identity || seen.has(identity)) return false;
    seen.add(identity);
    return true;
  });
}

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
  quickTopics = [],
  currentPage,
  totalPages,
  activeTopicSlug = null,
  onActiveTopicChange,
}: ScenarioSearchProps) {
  void productSlug;
  const [query, setQuery] = useState("");
  const [touched, setTouched] = useState(false);
  const [isTopicMenuOpen, setIsTopicMenuOpen] = useState(false);
  const labelId = useId();
  const topicMenuRef = useRef<HTMLDivElement | null>(null);
  const text = searchCopy[locale];
  const safeCategories = useMemo(() => dedupeCategories(categories), [categories]);
  const safeQuickTopics = useMemo(() => dedupeChips(quickTopics), [quickTopics]);

  const normalized = useMemo(() => query.trim().toLowerCase(), [query]);
  const activeTopic = useMemo(
    () => safeQuickTopics.find((chip) => chip.slug === activeTopicSlug) ?? null,
    [activeTopicSlug, safeQuickTopics],
  );

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!topicMenuRef.current?.contains(event.target as Node)) {
        setIsTopicMenuOpen(false);
      }
    }

    if (!isTopicMenuOpen) return;
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isTopicMenuOpen]);

  const {matchingCats, matchingItems} = useMemo(() => {
    const {normalizedQuery, activeTopicSlug: active, cats: catList} = {
      normalizedQuery: normalized,
      activeTopicSlug,
        cats: safeCategories,
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
    }, [safeCategories, normalized, activeTopicSlug]);

  const totalItems = useMemo(
    () => safeCategories.reduce((acc, c) => acc + c.count, 0),
    [safeCategories],
  );

  const pageText =
    locale === "zh-cn"
      ? `第 ${currentPage}/${totalPages} 页`
      : `Page ${currentPage} of ${totalPages}`;

  const hideStyle = useMemo(
    () =>
      buildScenarioHideStyle({
        normalizedQuery: normalized,
        activeTopicSlug,
        categories: safeCategories,
      }),
    [normalized, activeTopicSlug, safeCategories],
  );

  return (
      <div className="space-y-3.5">
          <div className="rounded-[30px] border border-slate-200/80 bg-white/95 p-2 shadow-[0_18px_45px_-34px_rgba(15,23,42,0.22)]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative min-w-0 flex-1">
            <label htmlFor={labelId} className="sr-only">
              {text.placeholder}
            </label>
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
                type="text"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setTouched(true);
              }}
              placeholder={text.placeholder}
                className="block h-12 w-full rounded-[24px] border-0 bg-transparent px-11 pr-16 text-[14.5px] leading-6 text-slate-800 placeholder:text-slate-400 transition focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100/60 sm:h-[52px] sm:text-[15px]"
            />
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setTouched(false);
                }}
                className={
                  "inline-flex h-8 items-center justify-center rounded-full border border-slate-200 bg-white px-3 text-[12px] font-medium text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 " +
                  (touched && normalized ? "" : "hidden ")
                }
              >
                {text.clearLabel}
              </button>
            </div>
          </div>
            <div className="hidden h-8 w-px bg-slate-200 sm:block" />
            <div ref={topicMenuRef} className="relative shrink-0 sm:min-w-[220px]">
              <button
                type="button"
                onClick={() => setIsTopicMenuOpen((open) => !open)}
                aria-haspopup="listbox"
                aria-expanded={isTopicMenuOpen}
                className={
                  "inline-flex h-12 w-full items-center justify-between gap-3 rounded-[24px] border border-transparent px-4 text-left text-[13px] font-medium leading-5 transition sm:h-[52px] " +
                  (activeTopic
                    ? "bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200"
                    : "bg-slate-50/70 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700")
                }
              >
                <span className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-slate-400">
                    {text.topicFilterLabel}
                  </span>
                  <span className="block max-w-[220px] truncate text-[15px] font-semibold text-slate-900">
                    {activeTopic?.name ?? text.allTopicsLabel}
                  </span>
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className={"h-4 w-4 shrink-0 transition " + (isTopicMenuOpen ? "rotate-180" : "")}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 7.5 5 5 5-5" />
                </svg>
              </button>
              {isTopicMenuOpen ? (
                <div className="absolute right-0 z-20 mt-2 w-full min-w-[260px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_24px_70px_-28px_rgba(15,23,42,0.24)]">
                  <div className="max-h-[320px] overflow-y-auto p-2">
                    <button
                      type="button"
                      onClick={() => {
                        onActiveTopicChange?.(null);
                        setIsTopicMenuOpen(false);
                      }}
                      className={
                        "flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-[13px] transition " +
                        (!activeTopicSlug
                          ? "bg-slate-950 text-white"
                          : "text-slate-700 hover:bg-slate-50")
                      }
                    >
                      <span>{text.allTopicsLabel}</span>
                    </button>
                    {safeQuickTopics.map((chip) => {
                      const active = !!chip.slug && activeTopicSlug === chip.slug;
                      return (
                        <button
                          key={normalizeFilterIdentity(chip.slug, chip.name)}
                          type="button"
                          role="option"
                          aria-selected={active}
                          onClick={() => {
                            onActiveTopicChange?.(active ? null : chip.slug);
                            setIsTopicMenuOpen(false);
                          }}
                          className={
                            "mt-1 flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-left text-[13px] transition " +
                            (active
                              ? "bg-emerald-50 text-emerald-800"
                              : "text-slate-700 hover:bg-slate-50")
                          }
                        >
                          <span className="min-w-0 truncate">{chip.name}</span>
                          <span
                            className={
                              "inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10.5px] font-semibold tracking-[0.02em] " +
                              (active ? "bg-emerald-200/70 text-emerald-900" : "bg-slate-100 text-slate-600")
                            }
                          >
                            {chip.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {activeTopicSlug ? (
                    <div className="border-t border-slate-100 p-2">
                      <button
                        type="button"
                        onClick={() => {
                          onActiveTopicChange?.(null);
                          setIsTopicMenuOpen(false);
                        }}
                        className="flex w-full items-center justify-center rounded-2xl px-3 py-2 text-[12px] font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
                      >
                        {text.clearTopicLabel}
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-1.5 text-[12.5px] leading-6 text-slate-500 sm:text-[13px]">
        <div className="font-medium text-slate-600">
            {text.resultSummary(matchingCats, safeCategories.length, matchingItems, totalItems)}
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

function dedupeChips(chips: TopicChip[]): TopicChip[] {
  const seen = new Set<string>();
  return chips.filter((chip) => {
    const identity = normalizeFilterIdentity(chip.slug, chip.name);
    if (!identity || seen.has(identity)) return false;
    seen.add(identity);
    return true;
  });
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
          quickTopics={chips}
        currentPage={currentPage}
        totalPages={totalPages}
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
