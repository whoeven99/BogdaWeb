const REFERRAL_BASE_URL = "https://ciwi.ai";

export function buildReferralLink(code: string, productSlug: string): string {
  return `${REFERRAL_BASE_URL}/?ref=${code}&product=${productSlug}`;
}

export function computeCommission(baseAmount: number, rate: number): number {
  return Math.round(baseAmount * rate * 100) / 100;
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercent(rate: number): string {
  return `${Math.round(rate * 100)}%`;
}

export function formatConversionRate(rate: number): string {
  return `${(rate * 100).toFixed(1)}%`;
}
