export function withShopifyUtm(href: string): string {
  if (!/^https?:\/\/apps\.shopify\.com(?:[/?#]|$)/i.test(href)) return href;

  const url = new URL(href);
  for (const [key, value] of Object.entries({
    utm_source: "ciwi.ai",
    utm_medium: "referral",
    utm_campaign: "website",
  })) {
    if (!url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  return url.toString();
}

export const ciwiShopifyInstallUrl = withShopifyUtm("https://apps.shopify.com/partners/bogdatech?utm=officialweb");
export const sparkShopifyInstallUrl = withShopifyUtm("https://apps.shopify.com/spark-1?source=ciwiweb");
