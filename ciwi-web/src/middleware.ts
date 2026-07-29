import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

import {chineseLocale, defaultLocale, getLocaleFromPathname, stripLocalePrefix} from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const locale = getLocaleFromPathname(request.nextUrl.pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-ciwi-locale", locale);

  if (locale === chineseLocale) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = stripLocalePrefix(request.nextUrl.pathname);

    return NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  requestHeaders.set("x-ciwi-locale", defaultLocale);

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
