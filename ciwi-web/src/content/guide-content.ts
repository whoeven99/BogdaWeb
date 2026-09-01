import {defaultLocale, locales, type Locale} from "@/lib/i18n";

type SluggedContent = {
  slug: string;
  status?: "draft" | "published";
  title?: string;
  description?: string;
  mainValue?: string;
};

export function createLocalizedGuideContent<T extends SluggedContent>(collectionsByLocale: Record<Locale, readonly T[]>) {
  function hasTodoMarker(value?: string) {
    return typeof value === "string" && /\[TODO\b/i.test(value);
  }

  function isIndexable(item: T, locale: Locale) {
    if (item.status === "draft") {
      return false;
    }

    if (locale !== defaultLocale && [item.title, item.description, item.mainValue].some(hasTodoMarker)) {
      return false;
    }

    return true;
  }

  const publishedCollectionsByLocale = Object.fromEntries(
    locales.map((locale) => [locale, collectionsByLocale[locale].filter((item) => isIndexable(item, locale))])
  ) as Record<Locale, T[]>;

  const mapsByLocale = Object.fromEntries(
    locales.map((locale) => [locale, Object.fromEntries(publishedCollectionsByLocale[locale].map((item) => [item.slug, item])) as Record<string, T>])
  ) as Record<Locale, Record<string, T>>;

  function getItems(locale: Locale) {
    return publishedCollectionsByLocale[locale];
  }

  function getMap(locale: Locale) {
    return mapsByLocale[locale];
  }

  function getAvailableLocales(slug: string): Locale[] {
    return locales.filter((locale) => Boolean(mapsByLocale[locale][slug]));
  }

  return {
    collectionsByLocale,
    publishedCollectionsByLocale,
    mapsByLocale,
    getItems,
    getMap,
    getAvailableLocales,
  };
}
