import {NextResponse} from "next/server";

import {buildShopifyInstallUrl, extractShopHandle, getShopifyClientId, isValidShopHandle} from "@/lib/affiliate-install";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const shopDomain = url.searchParams.get("shop_domain") ?? "";
  const ref = url.searchParams.get("ref") ?? "";
  const product = url.searchParams.get("product") ?? "";

  const handle = extractShopHandle(shopDomain);
  const clientId = getShopifyClientId(product);

  // TODO: 归因落库占位（记录 visit / install intent，后端就绪后替换）
  console.log("[affiliate install redirect]", {shopDomain, handle, ref, product});

  if (!isValidShopHandle(handle) || !clientId) {
    return NextResponse.json(
      {ok: false, message: "Invalid shop domain or product."},
      {status: 400},
    );
  }

  return NextResponse.redirect(buildShopifyInstallUrl(handle, clientId));
}
