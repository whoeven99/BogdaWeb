import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

import {chineseLocale, defaultLocale, getLocaleFromPathname, localizeHref, stripLocalePrefix, type Locale} from "@/lib/i18n";
import {canonicalizePathname, collapseDuplicateSlashes, resolveLegacyDestination, restoreCanonicalCase, stripTrailingSlash} from "@/lib/seo/legacy-redirects";

const localeQueryKey = "__ciwi_locale";

export function middleware(request: NextRequest) {
  const inheritedLocale = request.headers.get("x-ciwi-locale");
  const queryLocale = request.nextUrl.searchParams.get(localeQueryKey);
  const pathLocale = getLocaleFromPathname(request.nextUrl.pathname);
  const requestedLocale: Locale | null =
    queryLocale === chineseLocale || queryLocale === defaultLocale ? queryLocale : null;
  const locale = requestedLocale ?? (inheritedLocale === chineseLocale || inheritedLocale === defaultLocale ? inheritedLocale : pathLocale);
  const hasLocalePrefix = request.nextUrl.pathname === `/${chineseLocale}` || request.nextUrl.pathname.startsWith(`/${chineseLocale}/`);
  const strippedPathname = stripLocalePrefix(request.nextUrl.pathname);
  // Duplicate slashes are collapsed before the legacy lookup so historical
  // `playbook//keyword/...` URLs still match their mapping.
  // Casing is repaired at the same time: `/help-center/ShopifyApp` is the only
  // case-sensitive prefix, and its lowercase form is a 404 rather than a match.
  const normalizedPathname = restoreCanonicalCase(stripTrailingSlash(collapseDuplicateSlashes(strippedPathname)));

  const legacyMatch = resolveLegacyDestination(normalizedPathname);

  // 一次跳转收敛全部差异：旧链接映射、尾斜杠/大小写归一、语言前缀、内部
  // `__ciwi_locale` 参数。这几项必须在同一个 308 里算完——分开处理的话
  // 「旧路径 + 语言参数」会先跳路径（参数被 clone 带过去），下一跳才摘参数，
  // 变成两跳。目标地址在这里就是最终形态。
  const targetPathname = localizeHref(
    legacyMatch?.locale ?? requestedLocale ?? pathLocale,
    legacyMatch ? legacyMatch.destination : canonicalizePathname(normalizedPathname),
  );
  const targetSearch = new URLSearchParams(request.nextUrl.searchParams);
  targetSearch.delete(localeQueryKey);
  const pathChanged = targetPathname !== request.nextUrl.pathname;
  const searchChanged = targetSearch.toString() !== request.nextUrl.search.replace(/^\?/, "");

  if (legacyMatch || pathChanged || (requestedLocale !== null && searchChanged)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = targetPathname;
    // 内部参数不跟着跳，其余（UTM 等）原样保留。
    redirectUrl.searchParams.delete(localeQueryKey);

    // 旧链接可以自带锚点（功能页并入产品页的 `#features`）。锚点必须走 hash，
    // 拼进 pathname 会被编码成 `%23`，变成一条 404 路径。
    if (legacyMatch?.hash) {
      redirectUrl.hash = legacyMatch.hash;
    }

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
