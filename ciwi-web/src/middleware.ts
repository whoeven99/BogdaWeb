import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

import {compareLegacyRootRouteMap, compareSlugRedirectMap} from "@/content/compare-slugs";
import {chineseLocale, defaultLocale, getLocaleFromPathname, localizeHref, stripLocalePrefix} from "@/lib/i18n";

const localeQueryKey = "__ciwi_locale";

export function middleware(request: NextRequest) {
  const inheritedLocale = request.headers.get("x-ciwi-locale");
  const queryLocale = request.nextUrl.searchParams.get(localeQueryKey);
  const locale =
    queryLocale === chineseLocale || queryLocale === defaultLocale
      ? queryLocale
      : inheritedLocale === chineseLocale || inheritedLocale === defaultLocale
      ? inheritedLocale
      : getLocaleFromPathname(request.nextUrl.pathname);
  const hasLocalePrefix = request.nextUrl.pathname === `/${chineseLocale}` || request.nextUrl.pathname.startsWith(`/${chineseLocale}/`);
  const strippedPathname = stripLocalePrefix(request.nextUrl.pathname);
  const normalizedPathname =
    strippedPathname.length > 1 && strippedPathname.endsWith("/") ? strippedPathname.slice(0, -1) : strippedPathname;
  const compareSlugMatch = normalizedPathname.match(/^\/compare\/([^/]+)$/);
  const compareRootSlugMatch = normalizedPathname.match(/^\/([^/]+)$/);
  const canonicalCompareSlug = compareSlugMatch ? compareSlugRedirectMap[compareSlugMatch[1]] : undefined;
  const legacyRootRedirect = compareRootSlugMatch ? compareLegacyRootRouteMap[compareRootSlugMatch[1]] : undefined;

  if (canonicalCompareSlug || legacyRootRedirect) {
    const destination = canonicalCompareSlug ? `/compare/${canonicalCompareSlug}` : legacyRootRedirect?.destination;

    if (destination) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = localizeHref(locale, destination);

      return NextResponse.redirect(redirectUrl, 308);
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-ciwi-locale", locale);

  if (locale === chineseLocale && hasLocalePrefix) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = stripLocalePrefix(request.nextUrl.pathname);
    rewriteUrl.searchParams.set(localeQueryKey, chineseLocale);

    return NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (request.nextUrl.searchParams.has(localeQueryKey)) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.searchParams.delete(localeQueryKey);

    return NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  requestHeaders.set("x-ciwi-locale", locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
