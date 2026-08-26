import type {Metadata} from "next";

import {buildAlternates, defaultLocale, type Locale, localizeHref} from "@/lib/i18n";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  locale?: Locale;
  supportedLocales?: Locale[];
};

export const siteName = "Ciwi";
export const siteUrl = "https://ciwi.ai";

export function buildPageMetadata({title, description, path = "/", locale = "en", supportedLocales}: MetadataInput): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  const alternates = buildAlternates(path);
  const enabledLocales = supportedLocales?.length ? supportedLocales : [defaultLocale, "zh-cn"];
  const canonicalLocale = enabledLocales.includes(locale) ? locale : defaultLocale;
  const localizedPath = localizeHref(canonicalLocale, path);
  const canonical = new URL(localizedPath, siteUrl).toString();
  const languageAlternates = Object.fromEntries(
    enabledLocales.map((enabledLocale) => [
      enabledLocale === "zh-cn" ? "zh-CN" : "en",
      new URL(enabledLocale === "zh-cn" ? alternates.languages["zh-CN"] : alternates.languages.en, siteUrl).toString(),
    ])
  );

  languageAlternates["x-default"] = new URL(alternates.languages["x-default"], siteUrl).toString();

  return {
    title: fullTitle,
    description,
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
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
