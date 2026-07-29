import type {Metadata} from "next";

import {buildAlternates, type Locale, localizeHref} from "@/lib/i18n";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  locale?: Locale;
};

export const siteName = "Ciwi";
export const siteUrl = "https://ciwi.ai";

export function buildPageMetadata({title, description, path = "/", locale = "en"}: MetadataInput): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  const localizedPath = localizeHref(locale, path);
  const canonical = new URL(localizedPath, siteUrl).toString();
  const alternates = buildAlternates(path);

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical,
      languages: {
        en: new URL(alternates.languages.en, siteUrl).toString(),
        "zh-CN": new URL(alternates.languages["zh-CN"], siteUrl).toString(),
        "x-default": new URL(alternates.languages["x-default"], siteUrl).toString(),
      },
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
