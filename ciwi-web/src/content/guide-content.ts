import {defaultLocale, locales, type Locale} from "@/lib/i18n";
import {normalizeInternalHrefFields} from "@/lib/i18n-content";

type SluggedContent = {
  slug: string;
  status?: "draft" | "published";
  sourceLocale?: Locale;
  translationStatus?: "manual" | "ai-draft" | "reviewed";
  title?: string;
  description?: string;
  mainValue?: string;
};

export function createLocalizedGuideContent<T extends SluggedContent>(collectionsByLocale: Record<Locale, readonly T[]>) {
  function hasTodoMarker(value?: string) {
    return typeof value === "string" && /\[TODO\b/i.test(value);
  }

  function hasLocaleContentSignal(item: T, locale: Locale) {
    if (locale !== "zh-cn") {
      return true;
    }

    const combined = [item.title, item.description, item.mainValue]
      .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
      .join(" ");

    const hanCount = (combined.match(/[\u3400-\u9fff]/g) ?? []).length;
    const latinWordCount = (combined.match(/[A-Za-z]{3,}/g) ?? []).length;

    if (hanCount === 0) {
      return false;
    }

    if (hanCount < 8 && latinWordCount > hanCount * 2) {
      return false;
    }

    return true;
  }

  function isIndexable(item: T, locale: Locale) {
    if (item.status === "draft") {
      return false;
    }

    if (locale !== defaultLocale && [item.title, item.description, item.mainValue].some(hasTodoMarker)) {
      return false;
    }

    // Non-default locales should only expose content that has moved past draft translation.
    if (locale !== defaultLocale && item.translationStatus === "ai-draft") {
      return false;
    }

    if (locale !== defaultLocale && item.sourceLocale && item.sourceLocale !== locale && item.translationStatus !== "reviewed" && item.translationStatus !== "manual") {
      return false;
    }

    if (!hasLocaleContentSignal(item, locale)) {
      return false;
    }

    return true;
  }

  const publishedCollectionsByLocale = Object.fromEntries(
    locales.map((locale) => [
      locale,
      collectionsByLocale[locale]
        .filter((item) => isIndexable(item, locale))
        .map((item) => normalizeInternalHrefFields(item)),
    ])
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
