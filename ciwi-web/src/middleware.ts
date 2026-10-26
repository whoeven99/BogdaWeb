import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

import {chineseLocale, defaultLocale, getLocaleFromPathname, localizeHref, stripLocalePrefix} from "@/lib/i18n";
import {canonicalizePathname, collapseDuplicateSlashes, resolveLegacyDestination, restoreCanonicalCase, stripTrailingSlash} from "@/lib/seo/legacy-redirects";

const localeQueryKey = "__ciwi_locale";

export function middleware(request: NextRequest) {
  const inheritedLocale = request.headers.get("x-ciwi-locale");
  const queryLocale = request.nextUrl.searchParams.get(localeQueryKey);
  const pathLocale = getLocaleFromPathname(request.nextUrl.pathname);
  const locale =
    queryLocale === chineseLocale || queryLocale === defaultLocale
      ? queryLocale
      : inheritedLocale === chineseLocale || inheritedLocale === defaultLocale
      ? inheritedLocale
      : pathLocale;
  const hasLocalePrefix = request.nextUrl.pathname === `/${chineseLocale}` || request.nextUrl.pathname.startsWith(`/${chineseLocale}/`);
  const strippedPathname = stripLocalePrefix(request.nextUrl.pathname);
  // Duplicate slashes are collapsed before the legacy lookup so historical
  // `playbook//keyword/...` URLs still match their mapping.
  // Casing is repaired at the same time: `/help-center/ShopifyApp` is the only
  // case-sensitive prefix, and its lowercase form is a 404 rather than a match.
  const normalizedPathname = restoreCanonicalCase(stripTrailingSlash(collapseDuplicateSlashes(strippedPathname)));

  const legacyMatch = resolveLegacyDestination(normalizedPathname);

  if (legacyMatch) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = localizeHref(legacyMatch.locale ?? pathLocale, legacyMatch.destination);

    return NextResponse.redirect(redirectUrl, 308);
  }

  // `trailingSlash: true` is the canonical form. Next normalises it after
  // middleware, so it is asserted here as well to keep odd shapes (double
  // slashes, missing slash on rewritten paths) inside one hop.
  const canonicalPathname = localizeHref(pathLocale, canonicalizePathname(normalizedPathname));

  if (canonicalPathname !== request.nextUrl.pathname) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = canonicalPathname;

    return NextResponse.redirect(redirectUrl, 308);
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
