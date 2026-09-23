import {NextResponse} from "next/server";

import {
  buildAppReferralRedirect,
  extractShopHandle,
  isValidShopHandle,
} from "@/lib/affiliate-install";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const shopDomain = url.searchParams.get("shop_domain") ?? "";
  const ref = url.searchParams.get("ref") ?? "";
  const product = url.searchParams.get("product") ?? "";

  const handle = extractShopHandle(shopDomain);
  const redirectUrl = buildAppReferralRedirect(product, ref, handle);

  if (!isValidShopHandle(handle) || !redirectUrl) {
    return NextResponse.json(
      {ok: false, message: "Invalid shop domain or product."},
      {status: 400},
    );
  }

  return NextResponse.redirect(redirectUrl);
}
