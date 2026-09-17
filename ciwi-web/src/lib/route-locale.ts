import {defaultLocale, isExternalHref, locales, localizeHref, stripLocalePrefix, type Locale} from "@/lib/i18n";
import {getAvailableFunctionScenarioGuideLocales} from "@/content/function-scenario-guides";
import {getAvailableLocalizationGuideLocales} from "@/content/localization-guides";
import {getAvailableProductResearchLocales} from "@/content/product-research";
import {getAvailableToolReviewLocales} from "@/content/tool-reviews";

function normalizePathname(pathname: string) {
  const normalized = stripLocalePrefix(pathname.split(/[?#]/, 1)[0] || "/");
  return normalized !== "/" && normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;
}

export function getSupportedLocalesForPath(pathname: string): Locale[] {
  const normalizedPathname = normalizePathname(pathname);
  const bilingualGuideCollections = new Set([
    "/guides",
    "/guides/localization",
    "/guides/function-scenarios",
    "/guides/shopify-translation",
    "/guides/shopify-translation/prompts",
  ]);
  const bilingualProductResearchCollections = new Set([
    "/resources/product-research",
    "/resources/product-research/reviews",
  ]);

  if (bilingualGuideCollections.has(normalizedPathname) || bilingualProductResearchCollections.has(normalizedPathname)) {
    return [...locales];
  }

  if (normalizedPathname.startsWith("/guides/")) {
    const slug = normalizedPathname.slice("/guides/".length).replace(/\/$/, "");
    if (!slug) {
      return [...locales];
    }
    const supportedLocales = [
      ...new Set([...getAvailableLocalizationGuideLocales(slug), ...getAvailableFunctionScenarioGuideLocales(slug)]),
    ];

    return supportedLocales.length > 0 ? supportedLocales : [defaultLocale];
  }

  if (normalizedPathname.startsWith("/resources/product-research/reviews/")) {
    const slug = normalizedPathname.slice("/resources/product-research/reviews/".length).replace(/\/$/, "");
    if (!slug) {
      return [...locales];
    }
    const supportedLocales = getAvailableToolReviewLocales(slug);

    return supportedLocales.length > 0 ? supportedLocales : [defaultLocale];
  }

  if (normalizedPathname.startsWith("/resources/product-research/")) {
    const slug = normalizedPathname.slice("/resources/product-research/".length).replace(/\/$/, "");
    if (!slug) {
      return [...locales];
    }
    const supportedLocales = getAvailableProductResearchLocales(slug);

    return supportedLocales.length > 0 ? supportedLocales : [defaultLocale];
  }

  return [...locales];
}

export function resolveLocalizedHref(locale: Locale, href: string) {
  if (!href || isExternalHref(href) || href.startsWith("#") || !href.startsWith("/")) {
    return href;
  }

  const supportedLocales = getSupportedLocalesForPath(href);
  const targetLocale = supportedLocales.includes(locale) ? locale : defaultLocale;
  const normalizedHref = stripLocalePrefix(href);

  return localizeHref(targetLocale, normalizedHref);
}
