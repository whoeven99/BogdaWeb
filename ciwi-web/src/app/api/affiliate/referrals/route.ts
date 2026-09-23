import {NextResponse} from "next/server";

import {listAffiliateReferrals} from "@/lib/affiliate-codes";
import {getCurrentAffiliateAccount} from "@/lib/affiliate-session";

export async function GET() {
  try {
    const account = await getCurrentAffiliateAccount();

    if (!account) {
      return NextResponse.json({ok: false, message: "Not authenticated."}, {status: 401});
    }

    const referrals = await listAffiliateReferrals({
      translatorCode: account.referralCode,
      sparkCode: account.sparkReferralCode,
    });

    return NextResponse.json({ok: true, referrals});
  } catch (error) {
    console.error("Affiliate referrals failed", error);
    return NextResponse.json({ok: false, message: "Unable to load affiliate referrals."}, {status: 500});
  }
}
