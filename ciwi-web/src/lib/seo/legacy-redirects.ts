import {compareSlugRedirectMap} from "@/content/compare-slugs";
import {
  legacyExtraRootRedirects,
  legacyHelpCenterBasePath,
  legacyHelpCenterSlugRedirects,
  legacyRouteMap,
} from "@/content/legacy-routes";
import type {Locale} from "@/lib/i18n";
import {chineseLocale} from "@/lib/i18n";

export type LegacyRedirect = {
  destination: string;
  /** Forces the destination locale, used by URLs that carry their own legacy locale prefix. */
  locale?: Locale;
};

export function stripTrailingSlash(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function ensureTrailingSlash(pathname: string): string {
  return pathname.length > 1 && !pathname.endsWith("/") ? `${pathname}/` : pathname;
}

/**
 * Collapses `//` inside a path.
 *
 * A four day window (commit `adaceea8`, 2026-09-20 to `7c6e4090`, 2026-09-24)
 * shipped `getProductPlaybookHref` with a trailing slash, so every keyword link
 * was built as `/products/<slug>/playbook//keyword/<keyword>`. Next already
 * repairs this, but it costs a second hop because it normalises duplicate
 * slashes before it applies `trailingSlash`. Fixing both here keeps the repair
 * inside a single response.
 */
export function collapseDuplicateSlashes(pathname: string): string {
  return pathname.replace(/\/{2,}/g, "/");
}

/**
 * Full canonical form: locale prefix preserved, no duplicate slashes,
 * trailing slash present.
 */
export function canonicalizePathname(pathname: string): string {
  return ensureTrailingSlash(collapseDuplicateSlashes(pathname));
}

/**
 * Resolves a legacy URL straight to its live destination.
 *
 * It runs on the locale-stripped, slash-less path so both `/deepl` and `/deepl/`
 * resolve to the same place. Next normalises the trailing slash before
 * middleware runs, which is why the slash-less form of a legacy URL always costs
 * one extra hop that cannot be removed inside the app.
 */
export function resolveLegacyDestination(rawPathname: string): LegacyRedirect | undefined {
  const pathname = collapseDuplicateSlashes(rawPathname);

  // Ghost era prefix: /help-center/zh-Hans/ShopifyApp/<slug> -> /zh-cn/help-center/ShopifyApp/<slug>
  const legacyChineseHelpCenterMatch = pathname.match(/^\/help-center\/zh-Hans(?:\/(.+))?$/);

  if (legacyChineseHelpCenterMatch) {
    const rest = legacyChineseHelpCenterMatch[1];
    const slug = rest?.split("/").filter(Boolean).pop();

    return {
      destination: slug ? legacyHelpCenterSlugRedirects[slug] ?? `${legacyHelpCenterBasePath}/${slug}` : "/help-center",
      locale: chineseLocale,
    };
  }

  const helpCenterMatch = pathname.match(/^\/help-center\/ShopifyApp\/([^/]+)$/);

  if (helpCenterMatch) {
    const destination = legacyHelpCenterSlugRedirects[helpCenterMatch[1]];

    if (destination) {
      return {destination};
    }
  }

  const compareMatch = pathname.match(/^\/compare\/([^/]+)$/);

  if (compareMatch) {
    const canonicalCompareSlug = compareSlugRedirectMap[compareMatch[1]];

    if (canonicalCompareSlug) {
      return {destination: `/compare/${canonicalCompareSlug}`};
    }
  }

  const rootMatch = pathname.match(/^\/([^/]+)$/);

  if (rootMatch) {
    const destination = legacyExtraRootRedirects[rootMatch[1]] ?? legacyRouteMap[rootMatch[1] as keyof typeof legacyRouteMap]?.destination;

    if (destination) {
      return {destination};
    }
  }

  return undefined;
}
