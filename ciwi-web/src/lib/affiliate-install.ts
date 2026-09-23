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

const DEFAULT_TRANSLATOR_APP_URL = "https://typescriptfrontendprod.onrender.com";
const DEFAULT_SPARK_APP_URL = "https://spark-prod.onrender.com";

function readTranslatorAppUrl() {
  return (
    process.env.ENVIRONMENT_URL?.trim() ||
    process.env.TRANSLATOR_APP_URL?.trim() ||
    DEFAULT_TRANSLATOR_APP_URL
  );
}

function readSparkAppUrl() {
  return process.env.SPARK_APP_URL?.trim() || DEFAULT_SPARK_APP_URL;
}

export function buildAppReferralRedirect(product: string, code: string, handle: string) {
  const configured =
    product === "translator"
      ? readTranslatorAppUrl()
      : product === "spark-analytics-agent"
        ? readSparkAppUrl()
        : "";
  const base = configured.trim().replace(/\/$/, "");

  if (!base || !code.trim()) {
    return "";
  }

  const target = new URL(base);
  target.pathname = `/r/${encodeURIComponent(code.trim())}`;
  target.search = "";
  target.searchParams.set("shop", handle);
  return target.toString();
}
