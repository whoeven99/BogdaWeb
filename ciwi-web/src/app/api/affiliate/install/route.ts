import {NextResponse} from "next/server";

import {affiliateAdminPaths} from "@/content/affiliate";

function extractShopHandle(shopDomain: string): string {
  return shopDomain.replace(/\.myshopify\.com$/i, "").trim();
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const shopDomain = url.searchParams.get("shop_domain") ?? "";
  const ref = url.searchParams.get("ref") ?? "";
  const product = url.searchParams.get("product") ?? "";

  const handle = extractShopHandle(shopDomain);
  const appPath = affiliateAdminPaths[product] ?? "";

  // TODO: 归因落库占位（记录 visit / install intent，后端就绪后替换）
  console.log("[affiliate install redirect]", {shopDomain, handle, ref, product});

  if (!handle || !appPath) {
    return NextResponse.json(
      {ok: false, message: "Invalid shop domain or product."},
      {status: 400},
    );
  }

  const query = new URLSearchParams();
  query.set("product", product);

  if (ref) {
    query.set("ref", ref);
  }

  const target = `https://admin.shopify.com/store/${handle}/apps/${appPath}?${query.toString()}`;

  return NextResponse.redirect(target);
}
