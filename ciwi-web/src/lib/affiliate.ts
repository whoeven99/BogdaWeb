const REFERRAL_CODE_PREFIX = "CIWI-";
const REFERRAL_CODE_LENGTH = 6;
const REFERRAL_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const REFERRAL_BASE_URL = "https://ciwi.ai";

export function generateReferralCode(): string {
  const values = new Uint32Array(REFERRAL_CODE_LENGTH);
  crypto.getRandomValues(values);

  let code = "";

  for (const value of values) {
    code += REFERRAL_CODE_ALPHABET[value % REFERRAL_CODE_ALPHABET.length];
  }

  return `${REFERRAL_CODE_PREFIX}${code}`;
}

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
