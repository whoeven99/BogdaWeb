const SHOP_HANDLE_PATTERN = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

const defaultShopifyClientIds: Record<string, string> = {
  translator: "fb9fc15cbec02bd735e2a5b491cf8409",
  "spark-analytics-agent": "d68a7533dbbe676af335f27d01d87a12",
};

export function getShopifyClientId(product: string) {
  if (product === "translator") {
    return process.env.SHOPIFY_TRANSLATOR_API_KEY || defaultShopifyClientIds.translator;
  }

  if (product === "spark-analytics-agent") {
    return process.env.SHOPIFY_SPARK_API_KEY || defaultShopifyClientIds["spark-analytics-agent"];
  }

  return "";
}

export function extractShopHandle(shopDomain: string) {
  return shopDomain
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "")
    .replace(/\.myshopify\.com$/i, "")
    .toLowerCase();
}

export function isValidShopHandle(handle: string) {
  return handle.length >= 3 && handle.length <= 60 && SHOP_HANDLE_PATTERN.test(handle);
}

export function buildShopifyInstallUrl(handle: string, clientId: string) {
  const target = new URL(`https://admin.shopify.com/store/${handle}/oauth/install`);
  target.searchParams.set("client_id", clientId);
  return target.toString();
}
