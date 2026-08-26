"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

import {useLocale} from "@/components/providers/LocaleProvider";
import {stripLocalePrefix, type Locale} from "@/lib/i18n";
import {getSupportedLocalesForPath, resolveLocalizedHref} from "@/lib/route-locale";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  "zh-cn": "中文",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const normalizedPath = stripLocalePrefix(pathname || "/");
  const supportedLocales = getSupportedLocalesForPath(normalizedPath);

  return (
    <div className="locale-switcher" aria-label={locale === "zh-cn" ? "切换语言" : "Switch language"}>
      {supportedLocales.map((targetLocale) => {
        const href = resolveLocalizedHref(targetLocale, normalizedPath);
        const isActive = targetLocale === locale;

        return (
          <Link
            key={targetLocale}
            href={href}
            className={`locale-switcher__link${isActive ? " locale-switcher__link--active" : ""}`}
            hrefLang={targetLocale === "zh-cn" ? "zh-CN" : "en"}
            aria-current={isActive ? "true" : undefined}
          >
            {localeLabels[targetLocale]}
          </Link>
        );
      })}
    </div>
  );
}
