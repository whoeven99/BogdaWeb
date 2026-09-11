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
    <div
      className="inline-flex items-center rounded-full border border-slate-200 bg-white/90 p-1 shadow-sm"
      aria-label={locale === "zh-cn" ? "切换语言" : "Switch language"}
    >
      {supportedLocales.map((targetLocale) => {
        const href = resolveLocalizedHref(targetLocale, normalizedPath);
        const isActive = targetLocale === locale;

        return (
          <Link
            key={targetLocale}
            href={href}
            className={[
              "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-200",
              isActive
                ? "bg-slate-200 text-slate-700 shadow-sm hover:bg-slate-300"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
            ].join(" ")}
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
