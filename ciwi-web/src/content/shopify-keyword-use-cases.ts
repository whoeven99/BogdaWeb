import type {Locale} from "@/lib/i18n";
import {localizeLanguageSignalFields} from "@/lib/localized-language-signal";

import importedKeywordUseCases from "@/content/data/shopify_keyword_use_cases.json";

export type KeywordUseCaseFaq = {
  question: string;
  answer: string;
};

export type KeywordUseCaseItem = {
  slug: string;
  keyword: string;
  category: string;
  title: string;
  scenarioDescription: string;
  howToSolve: string;
  aiPrompt: string;
  faqs: KeywordUseCaseFaq[];
};

type RawKeywordUseCaseRecord = KeywordUseCaseItem & {
  zh_keyword: string;
  zh_category: string;
  zh_title: string;
  zh_scenarioDescription: string;
  zh_howToSolve: string;
  zh_aiPrompt: string;
  zh_faqs: KeywordUseCaseFaq[];
};

const rawRecords = importedKeywordUseCases as RawKeywordUseCaseRecord[];

function slugifyCategoryLabel(value: string): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toLocaleItem(locale: Locale, raw: RawKeywordUseCaseRecord): KeywordUseCaseItem {
  if (locale === "zh-cn") {
    return {
      slug: raw.slug,
      keyword: raw.zh_keyword || raw.keyword,
      category: raw.zh_category || raw.category,
      title: raw.zh_title || raw.title,
      scenarioDescription: raw.zh_scenarioDescription || raw.scenarioDescription,
      howToSolve: raw.zh_howToSolve || raw.howToSolve,
      aiPrompt: raw.zh_aiPrompt || raw.aiPrompt,
      faqs: raw.zh_faqs && raw.zh_faqs.length > 0 ? raw.zh_faqs : raw.faqs,
    };
  }
  return {
    slug: raw.slug,
    keyword: raw.keyword,
    category: raw.category,
    title: raw.title,
    scenarioDescription: raw.scenarioDescription,
    howToSolve: raw.howToSolve,
    aiPrompt: raw.aiPrompt,
    faqs: raw.faqs,
  };
}

const allKeywordUseCasesEn: KeywordUseCaseItem[] = rawRecords.map((r) => toLocaleItem("en", r));
const allKeywordUseCasesZh: KeywordUseCaseItem[] = rawRecords.map((r) => toLocaleItem("zh-cn", r));

const categorySlugMapEn = new Map<string, string>();
const categorySlugMapZh = new Map<string, string>();

for (const record of rawRecords) {
  const stableSlug = slugifyCategoryLabel(record.category);
  categorySlugMapEn.set(record.category, stableSlug);
  categorySlugMapZh.set(record.zh_category || record.category, stableSlug);
}

const EMPTY: KeywordUseCaseItem[] = [];

export function getKeywordUseCases(locale: Locale): KeywordUseCaseItem[] {
  return localizeLanguageSignalFields(locale, locale === "zh-cn" ? allKeywordUseCasesZh : allKeywordUseCasesEn);
}

export function getKeywordUseCaseMap(locale: Locale): Record<string, KeywordUseCaseItem> {
  return Object.fromEntries(getKeywordUseCases(locale).map((item) => [item.slug, item]));
}

export function getKeywordUseCasesByCategory(
  locale: Locale,
  category: string,
): KeywordUseCaseItem[] {
  return getKeywordUseCases(locale).filter((item) => item.category === category);
}

export function getKeywordUseCaseCategories(locale: Locale): {name: string; count: number}[] {
  const counts = new Map<string, number>();
  for (const item of getKeywordUseCases(locale)) {
    counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({name, count}))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getKeywordUseCaseCategorySlug(locale: Locale, categoryName: string): string {
  const map = locale === "zh-cn" ? categorySlugMapZh : categorySlugMapEn;
  return map.get(categoryName) ?? slugifyCategoryLabel(categoryName);
}

export function getKeywordUseCaseBySlug(locale: Locale, slug: string): KeywordUseCaseItem | undefined {
  return getKeywordUseCaseMap(locale)[slug];
}

function tokenize(text: string): Set<string> {
  return new Set(
    String(text ?? "")
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const w of a) if (b.has(w)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

function similarityScore(a: KeywordUseCaseItem, b: KeywordUseCaseItem): number {
  const tokensA = tokenize(
    `${a.keyword} ${a.title} ${a.scenarioDescription} ${a.category} ${a.howToSolve}`,
  );
  const tokensB = tokenize(
    `${b.keyword} ${b.title} ${b.scenarioDescription} ${b.category} ${b.howToSolve}`,
  );
  return jaccard(tokensA, tokensB);
}

export function getRelatedKeywordUseCases(
  locale: Locale,
  slug: string,
  limit = 6,
): KeywordUseCaseItem[] {
  const all = getKeywordUseCases(locale);
  const current = all.find((item) => item.slug === slug);
  if (!current) return EMPTY;

  const sameCategory = all
    .filter((item) => item.slug !== slug && item.category === current.category)
    .sort((a, b) => similarityScore(current, b) - similarityScore(current, a));

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const remain = limit - sameCategory.length;
  const others = all
    .filter(
      (item) => item.slug !== slug && item.category !== current.category && !sameCategory.includes(item),
    )
    .sort((a, b) => similarityScore(current, b) - similarityScore(current, a));

  return [...sameCategory, ...others.slice(0, remain)].slice(0, limit);
}
