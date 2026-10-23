import type {Metadata} from "next";

import {buildAlternates, defaultLocale, type Locale, localizeHref, normalizeInternalHref} from "@/lib/i18n";
import {localizeLanguageSignalText} from "@/lib/localized-language-signal";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  locale?: Locale;
  supportedLocales?: Locale[];
  keywords?: string[];
  noIndex?: boolean;
  /**
   * 放到标题最前面的词（通常是目标关键词）。传入后标题变为 `{titleLead}{分隔符}{title}`，
   * 并按 KEYWORD_LEAD_TITLE_BUDGET 收紧长度预算：先保 lead 完整，再截断后面的描述，
   * 避免 SERP 截断把关键词整段丢掉。未传时保持原有行为。
   */
  titleLead?: string;
};

export const siteName = "Ciwi";
export const siteUrl = "https://ciwi.ai";
export const siteDefaultOgImage = new URL("/logo-150.png", siteUrl).toString();

export function toAbsoluteFileUrl(href: string) {
  return new URL(href, siteUrl).toString();
}

export function toAbsoluteSiteUrl(href: string) {
  return new URL(normalizeInternalHref(href), siteUrl).toString();
}

export function toAbsoluteLocalizedUrl(locale: Locale, href: string) {
  return new URL(localizeHref(locale, href), siteUrl).toString();
}

/**
 * Google rewrites or truncates descriptions well before ~160 Latin characters.
 * CJK glyphs occupy roughly twice the horizontal space in a SERP snippet, so
 * they are charged two units against the same budget.
 */
const MAX_DESCRIPTION_WIDTH = 155;

function isWideDescriptionChar(code: number): boolean {
  return (
    (code >= 0x1100 && code <= 0x115f) ||
    (code >= 0x2e80 && code <= 0xa4cf) ||
    (code >= 0xac00 && code <= 0xd7a3) ||
    (code >= 0xf900 && code <= 0xfaff) ||
    (code >= 0xfe30 && code <= 0xfe6f) ||
    (code >= 0xff00 && code <= 0xff60) ||
    (code >= 0xffe0 && code <= 0xffe6)
  );
}

function estimateDescriptionWidth(text: string): number {
  let width = 0;
  for (const ch of text) {
    width += isWideDescriptionChar(ch.codePointAt(0) ?? 0) ? 2 : 1;
  }
  return width;
}

function truncateAtCleanBoundary(candidate: string): string {
  const trimmed = candidate.replace(/[\s、，,;；:：]+$/, "");
  if (!trimmed) return "";

  // Prefer ending on a sentence so the snippet does not read as cut off.
  const searchFrom = Math.floor(trimmed.length * 0.5);
  const sentenceBreaks = [...trimmed.slice(searchFrom).matchAll(/[。！？.!?]/g)];
  const lastSentenceBreak = sentenceBreaks.at(-1);
  if (lastSentenceBreak?.index !== undefined) {
    return trimmed.slice(0, searchFrom + lastSentenceBreak.index + 1);
  }

  // Otherwise avoid splitting a word for Latin descriptions.
  const lastSpace = trimmed.lastIndexOf(" ");
  if (lastSpace > trimmed.length * 0.6) {
    return trimmed.slice(0, lastSpace);
  }

  return trimmed;
}

export function truncateDescription(description: string, maxWidth = MAX_DESCRIPTION_WIDTH): string {
  const text = description.trim();
  if (!text) return text;

  if (estimateDescriptionWidth(text) <= maxWidth) {
    return text;
  }

  const ellipsis = "…";
  const budget = maxWidth - estimateDescriptionWidth(ellipsis);
  let width = 0;
  let cutLength = 0;

  for (const ch of text) {
    const additional = estimateDescriptionWidth(ch);
    if (width + additional > budget) break;
    width += additional;
    cutLength += ch.length;
  }

  return truncateAtCleanBoundary(text.slice(0, cutLength)) + ellipsis;
}

/**
 * 关键词前置标题的总宽度预算（含品牌后缀）。按 estimateSERPWidth 的单位计，
 * 34 单位约等于 60 个 ASCII 字符或 34 个 CJK 字符，对应 Google 标题展示上限。
 */
const KEYWORD_LEAD_TITLE_BUDGET = 34;

function estimateSERPWidth(title: string): number {
  let width = 0;
  for (const ch of title) {
    const code = ch.codePointAt(0) ?? 0;
    if (ch === " " || ch === "-" || ch === "|" || ch === ":") width += 0.3;
    else if (ch === "." || ch === "," || ch === "'" || ch === "/") width += 0.25;
    else if (code < 128) width += 0.52;
    else if (ch === "「" || ch === "」" || ch === "（" || ch === "）") width += 1.0;
    else width += 1.0;
  }
  return width;
}

function truncateTitleToSERPWidth(title: string, targetPxWidth = 480): string {
  if (!title) return title;
  if (estimateSERPWidth(title) <= targetPxWidth) return title;
  const ellipsis = "…";
  const allowance = estimateSERPWidth(ellipsis);
  let width = 0;
  let result = "";
  for (const ch of title) {
    const w = estimateSERPWidth(ch);
    if (width + w > targetPxWidth - allowance) break;
    result += ch;
    width += w;
  }
  if (!result) return title;
  return result + ellipsis;
}

export function buildPageMetadata({
  title,
  description,
  path = "/",
  locale = "en",
  supportedLocales,
  keywords,
  noIndex = false,
  titleLead,
}: MetadataInput): Metadata {
  const localizedTitle = localizeLanguageSignalText(locale, title);
  const localizedTitleLead = titleLead ? localizeLanguageSignalText(locale, titleLead) : "";
  const localizedDescription = localizeLanguageSignalText(locale, description);
  const localizedKeywords = keywords?.map((keyword) => localizeLanguageSignalText(locale, keyword));
  const brandSuffix = ` | ${siteName}`;
  let safeTitle: string;

  if (localizedTitleLead) {
    const lead = localizedTitleLead.toLowerCase();
    const alreadyContainsLead = localizedTitle.toLowerCase().includes(lead);
    const brandWidth = estimateSERPWidth(brandSuffix);

    if (alreadyContainsLead) {
      // 标题里已经带了目标词（中文标题常把英文关键词内嵌在模板句里），
      // 再前置会出现「关键词：…关键词…」，此时只收紧长度，不加前缀。
      safeTitle = truncateTitleToSERPWidth(localizedTitle, KEYWORD_LEAD_TITLE_BUDGET - brandWidth);
    } else {
      // 关键词前置：先保住 lead 的完整，再用剩余预算截断描述部分
      const separator = locale === "zh-cn" ? "：" : " — ";
      const bodyBudget =
        KEYWORD_LEAD_TITLE_BUDGET - brandWidth - estimateSERPWidth(localizedTitleLead + separator);
      const body = bodyBudget > 0 ? truncateTitleToSERPWidth(localizedTitle, bodyBudget) : "";
      const bodyWithoutEllipsis = body.replace(/…$/, "").trim();
      // 描述残片过短时直接丢弃，避免留下 "… | Ciwi" 这类无意义结尾
      const keepBody = estimateSERPWidth(bodyWithoutEllipsis) >= 8;
      safeTitle = keepBody ? localizedTitleLead + separator + body : localizedTitleLead;
    }
  } else {
    safeTitle = truncateTitleToSERPWidth(localizedTitle, 480 - estimateSERPWidth(brandSuffix));
  }

  const fullTitle = safeTitle + brandSuffix;
  const alternates = buildAlternates(path);
  const enabledLocales = supportedLocales?.length ? supportedLocales : [defaultLocale, "zh-cn"];
  const canonicalLocale = enabledLocales.includes(locale) ? locale : defaultLocale;
  const canonical = toAbsoluteLocalizedUrl(canonicalLocale, path);
  const languageAlternates = Object.fromEntries(
    enabledLocales.map((enabledLocale) => [
      enabledLocale === "zh-cn" ? "zh-CN" : "en",
      toAbsoluteSiteUrl(enabledLocale === "zh-cn" ? alternates.languages["zh-CN"] : alternates.languages.en),
    ])
  );

  languageAlternates["x-default"] = toAbsoluteSiteUrl(alternates.languages["x-default"]);

  const keywordString = localizedKeywords?.length ? localizedKeywords.join(", ") : undefined;

  return {
    title: fullTitle,
    description: truncateDescription(localizedDescription),
    ...(keywordString ? {keywords: keywordString} : undefined),
    alternates: {
      canonical,
      languages: languageAlternates,
    },
    openGraph: {
      title: fullTitle,
      description: localizedDescription,
      url: canonical,
      siteName,
      type: "website",
      ...(keywordString ? {tags: localizedKeywords} : undefined),
      images: [
        {
          url: siteDefaultOgImage,
          alt: `${siteName} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: localizedDescription,
      images: [siteDefaultOgImage],
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: true,
          },
        }
      : undefined),
  };
}
