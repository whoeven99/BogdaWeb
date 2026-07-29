import type {Locale} from "@/lib/i18n";
import {pickByLocale} from "@/lib/i18n";

export type LocalizedValue<T> = Record<Locale, T>;

export function defineLocalizedValue<T>(en: T, zhCn: T): LocalizedValue<T> {
  return {
    en,
    "zh-cn": zhCn,
  };
}

export function getLocalizedValue<T>(locale: Locale, value: LocalizedValue<T>): T {
  return pickByLocale(locale, value);
}
