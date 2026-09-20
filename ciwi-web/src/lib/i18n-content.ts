import type {Locale} from "@/lib/i18n";
import {normalizeInternalHref, pickByLocale} from "@/lib/i18n";

export type LocalizedValue<T> = Record<Locale, T>;

export function defineLocalizedValue<T>(en: T, zhCn: T): LocalizedValue<T> {
  return {
    en,
    "zh-cn": zhCn,
  };
}

const hrefLikeKeys = new Set(["href", "ctaHref", "primaryHref", "secondaryHref", "destination"]);

export function normalizeInternalHrefFields<T>(value: T): T {
  if (typeof value === "string" || value === null || value === undefined) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeInternalHrefFields(item)) as T;
  }

  if (typeof value === "object") {
    const normalizedEntries = Object.entries(value as Record<string, unknown>).map(([key, entry]) => {
      if (typeof entry === "string" && hrefLikeKeys.has(key)) {
        return [key, normalizeInternalHref(entry)];
      }

      return [key, normalizeInternalHrefFields(entry)];
    });

    return Object.fromEntries(normalizedEntries) as T;
  }

  return value;
}

export function getLocalizedValue<T>(locale: Locale, value: LocalizedValue<T>): T {
  return normalizeInternalHrefFields(pickByLocale(locale, value));
}
