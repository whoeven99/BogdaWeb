export const locales = ["en", "zh-cn"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const chineseLocale: Locale = "zh-cn";

export function normalizeLocale(value?: string | null): Locale {
  return value === chineseLocale ? chineseLocale : defaultLocale;
}

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === `/${chineseLocale}` || pathname.startsWith(`/${chineseLocale}/`) ? chineseLocale : defaultLocale;
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === `/${chineseLocale}`) {
    return "/";
  }

  if (pathname.startsWith(`/${chineseLocale}/`)) {
    return pathname.slice(chineseLocale.length + 1) || "/";
  }

  return pathname;
}

export function getHtmlLang(locale: Locale): string {
  return locale === chineseLocale ? "zh-CN" : "en";
}

export function isExternalHref(href: string): boolean {
  return /^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

function ensureTrailingSlash(href: string): string {
  const match = href.match(/^([^?#]*)(.*)$/);
  const pathname = match?.[1] ?? href;
  const suffix = match?.[2] ?? "";

  if (!pathname || pathname === "/" || pathname.endsWith("/")) {
    return href;
  }

  return `${pathname}/${suffix}`;
}

export function localizeHref(locale: Locale, href: string): string {
  if (!href || isExternalHref(href) || href.startsWith("#")) {
    return href;
  }

  if (!href.startsWith("/")) {
    return href;
  }

  if (locale === defaultLocale || href.startsWith(`/${chineseLocale}`)) {
    return ensureTrailingSlash(href);
  }

  return ensureTrailingSlash(href === "/" ? `/${chineseLocale}` : `/${chineseLocale}${href}`);
}

export function buildAlternates(path: string) {
  return {
    canonical: path,
    languages: {
      en: path,
      "zh-CN": localizeHref(chineseLocale, path),
      "x-default": path,
    },
  };
}

export function pickByLocale<T>(locale: Locale, values: Record<Locale, T>): T {
  return values[locale];
}
