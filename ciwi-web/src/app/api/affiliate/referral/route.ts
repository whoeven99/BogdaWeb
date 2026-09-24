import {NextResponse} from "next/server";

import {toPublicAffiliateAccount} from "@/lib/affiliate-account";
import {ensureAffiliateReferralCodes} from "@/lib/affiliate-codes";
import {getCurrentAffiliateAccount} from "@/lib/affiliate-session";

export async function POST() {
  try {
    const current = await getCurrentAffiliateAccount();

    if (!current) {
      return NextResponse.json({ok: false, message: "Not authenticated."}, {status: 401});
    }

    const account = await ensureAffiliateReferralCodes(current.id);

    return NextResponse.json({
      ok: true,
      account: toPublicAffiliateAccount(account),
    });
  } catch (error) {
    console.error("Affiliate referral generate failed", error);
    return NextResponse.json({ok: false, message: "Unable to generate referral code."}, {status: 500});
  }
}
