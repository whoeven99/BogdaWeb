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
  /**
   * Fragment that belongs to the destination, e.g. `#features`.
   *
   * It is kept out of `destination` on purpose: the middleware assigns
   * `destination` to `URL.pathname`, and a `#` inside a pathname is escaped to
   * `%23`. That produced a live 404 — `/zh-cn/product-title-generation/` used to
   * redirect to `/zh-cn/products/spark-analytics-agent/%23features/`.
   */
  hash?: string;
};

/** Splits `path#fragment` so the fragment survives as a fragment, not as `%23`. */
function withFragment(destination: string, locale?: Locale): LegacyRedirect {
  const separator = destination.indexOf("#");
  const path = separator === -1 ? destination : destination.slice(0, separator);
  const hash = separator === -1 ? undefined : destination.slice(separator);

  return {
    destination: path,
    ...(locale ? {locale} : {}),
    ...(hash ? {hash} : {}),
  };
}

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
 * Segments whose spelling is case-sensitive, keyed by their lowercase form.
 *
 * `legacyHelpCenterBasePath` is `/help-center/ShopifyApp`, and the MDX route
 * resolves that exact camelCase prefix. `/help-center/shopifyapp/...` therefore
 * 404s instead of redirecting, so any tool that lowercases a URL (CMS editors,
 * chat clients, some crawlers) produces a dead link out of a live page.
 */
const caseSensitiveSegments = new Map(
  legacyHelpCenterBasePath
    .split("/")
    .filter(Boolean)
    .map((segment) => [segment.toLowerCase(), segment]),
);

/**
 * Repairs the casing of case-sensitive segments.
 *
 * Idempotent: a path that is already canonical is returned untouched, which is
 * what keeps this safe to run on every request before the redirect comparison.
 */
export function restoreCanonicalCase(pathname: string): string {
  if (!pathname.includes("/")) {
    return pathname;
  }

  return pathname
    .split("/")
    .map((segment) => caseSensitiveSegments.get(segment.toLowerCase()) ?? segment)
    .join("/");
}

/**
 * Legacy URLs that live below the root and therefore cannot use the root-slug
 * lookup below.
 *
 * These used to sit in `next.config.ts` `redirects()`, which runs before the
 * middleware. That order meant the middleware never saw them, so the language
 * parameter and UTM cleanup could not be folded into the same response: every
 * one of them cost one extra hop. The resolver owns them now, and the config
 * only keeps the host-level rules that have nothing to do with locale.
 */
const legacyPathRedirects: Record<string, LegacyRedirect> = {
  "/products/content-ai": {destination: "/products/spark-analytics-agent"},
  "/products/bundle-discount": {destination: "/help-center/ShopifyApp/bundle-discount-app-overview"},
};

/**
 * Resolves a legacy URL straight to its live destination.
 *
 * It runs on the locale-stripped, slash-less path so both `/deepl` and `/deepl/`
 * resolve to the same place. Next normalises the trailing slash before
 * middleware runs, which is why the slash-less form of a legacy URL still costs
 * one extra hop that cannot be removed inside the app.
 */
export function resolveLegacyDestination(rawPathname: string): LegacyRedirect | undefined {
  const pathname = collapseDuplicateSlashes(rawPathname);

  const pathRedirect = legacyPathRedirects[pathname];

  if (pathRedirect) {
    return pathRedirect;
  }

  // Ghost era prefix: /help-center/zh-Hans/ShopifyApp/<slug> -> /zh-cn/help-center/ShopifyApp/<slug>
  const legacyChineseHelpCenterMatch = pathname.match(/^\/help-center\/zh-Hans(?:\/(.+))?$/);

  if (legacyChineseHelpCenterMatch) {
    const rest = legacyChineseHelpCenterMatch[1];
    const slug = rest?.split("/").filter(Boolean).pop();

    return withFragment(
      slug ? legacyHelpCenterSlugRedirects[slug] ?? `${legacyHelpCenterBasePath}/${slug}` : "/help-center",
      chineseLocale,
    );
  }

  const helpCenterMatch = pathname.match(/^\/help-center\/ShopifyApp\/([^/]+)$/);

  if (helpCenterMatch) {
    const destination = legacyHelpCenterSlugRedirects[helpCenterMatch[1]];

    if (destination) {
      return withFragment(destination);
    }
  }

  const compareMatch = pathname.match(/^\/compare\/([^/]+)$/);

  if (compareMatch) {
    const canonicalCompareSlug = compareSlugRedirectMap[compareMatch[1]];

    if (canonicalCompareSlug) {
      return withFragment(`/compare/${canonicalCompareSlug}`);
    }
  }

  const rootMatch = pathname.match(/^\/([^/]+)$/);

  if (rootMatch) {
    const destination = legacyExtraRootRedirects[rootMatch[1]] ?? legacyRouteMap[rootMatch[1] as keyof typeof legacyRouteMap]?.destination;

    if (destination) {
      return withFragment(destination);
    }
  }

  return undefined;
}
