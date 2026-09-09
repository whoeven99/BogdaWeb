import {cookies, headers} from "next/headers";

import {affiliateProductSlugs} from "@/content/affiliate";
import {isUniqueConstraintError} from "@/lib/affiliate-account";
import {prisma} from "@/lib/db";

const VISITOR_COOKIE = "ciwi_aff_vid";
const REF_COOKIE = "ciwi_aff_ref";
const PRODUCT_COOKIE = "ciwi_aff_product";
const VISITOR_MAX_AGE = 60 * 60 * 24 * 365;
const ATTRIBUTION_MAX_AGE = 60 * 60 * 24 * 30;

function normalizeReferralCode(code: string) {
  return code.trim().toUpperCase();
}

function resolveProductSlug(product: string | undefined) {
  if (!product) {
    return null;
  }

  return affiliateProductSlugs.find((slug) => slug === product) ?? null;
}

function isBotUserAgent(userAgent: string) {
  return /bot|crawler|spider|preview|facebookexternalhit|slurp|bingpreview/i.test(userAgent);
}

function utcDayStamp(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

export async function recordAffiliateClick(input: {code?: string; product?: string}) {
  try {
    const rawCode = input.code?.trim();
    if (!rawCode) {
      return;
    }

    const headerStore = await headers();
    if (isBotUserAgent(headerStore.get("user-agent") ?? "")) {
      return;
    }

    const referralCode = normalizeReferralCode(rawCode);
    const account = await prisma.affiliateAccount.findUnique({
      where: {referralCode},
      select: {id: true},
    });

    if (!account) {
      return;
    }

    const productSlug = resolveProductSlug(input.product);
    const cookieStore = await cookies();
    const visitorKey = cookieStore.get(VISITOR_COOKIE)?.value || crypto.randomUUID();
    const clickedOn = utcDayStamp();

    cookieStore.set(VISITOR_COOKIE, visitorKey, cookieOptions(VISITOR_MAX_AGE));
    cookieStore.set(REF_COOKIE, referralCode, cookieOptions(ATTRIBUTION_MAX_AGE));
    if (productSlug) {
      cookieStore.set(PRODUCT_COOKIE, productSlug, cookieOptions(ATTRIBUTION_MAX_AGE));
    }

    await prisma.affiliateClick.create({
      data: {
        accountId: account.id,
        referralCode,
        productSlug,
        visitorKey,
        clickedOn,
      },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return;
    }

    console.error("Affiliate click record failed", error);
  }
}

export async function countAffiliateClicks(accountId: string) {
  return prisma.affiliateClick.count({
    where: {accountId},
  });
}
