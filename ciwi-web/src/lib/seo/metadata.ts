import type {Metadata} from "next";

import {buildAlternates, defaultLocale, type Locale, localizeHref, normalizeInternalHref} from "@/lib/i18n";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  locale?: Locale;
  supportedLocales?: Locale[];
  keywords?: string[];
};

export const siteName = "Ciwi";
export const siteUrl = "https://ciwi.ai";
export const siteDefaultOgImage = new URL("/logo-150.png", siteUrl).toString();

export function toAbsoluteSiteUrl(href: string) {
  return new URL(normalizeInternalHref(href), siteUrl).toString();
}

export function toAbsoluteLocalizedUrl(locale: Locale, href: string) {
  return new URL(localizeHref(locale, href), siteUrl).toString();
}

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

export function buildPageMetadata({title, description, path = "/", locale = "en", supportedLocales, keywords}: MetadataInput): Metadata {
  const brandSuffix = ` | ${siteName}`;
  const safeTitle = truncateTitleToSERPWidth(title, 480 - estimateSERPWidth(brandSuffix));
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

  const keywordString = keywords?.length ? keywords.join(", ") : undefined;

  return {
    title: fullTitle,
    description,
    ...(keywordString ? {keywords: keywordString} : undefined),
    alternates: {
      canonical,
      languages: languageAlternates,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName,
      type: "website",
      ...(keywordString ? {tags: keywords} : undefined),
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
      description,
      images: [siteDefaultOgImage],
    },
  };
}
