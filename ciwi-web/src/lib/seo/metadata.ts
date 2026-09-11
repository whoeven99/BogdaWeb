import type {Metadata} from "next";

import {buildAlternates, defaultLocale, type Locale, localizeHref, normalizeInternalHref} from "@/lib/i18n";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  locale?: Locale;
  supportedLocales?: Locale[];
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

export function buildPageMetadata({title, description, path = "/", locale = "en", supportedLocales}: MetadataInput): Metadata {
  const fullTitle = `${title} | ${siteName}`;
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
