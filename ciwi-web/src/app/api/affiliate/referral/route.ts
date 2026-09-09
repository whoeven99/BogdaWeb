import {NextResponse} from "next/server";

import {generateReferralCode} from "@/lib/affiliate";
import {isUniqueConstraintError, toPublicAffiliateAccount} from "@/lib/affiliate-account";
import {getCurrentAffiliateAccount} from "@/lib/affiliate-session";
import {prisma} from "@/lib/db";

const MAX_CODE_ATTEMPTS = 5;

export async function POST() {
  try {
    const current = await getCurrentAffiliateAccount();

    if (!current) {
      return NextResponse.json({ok: false, message: "Not authenticated."}, {status: 401});
    }

    if (current.referralCode) {
      return NextResponse.json({ok: true, account: current});
    }

    for (let attempt = 0; attempt < MAX_CODE_ATTEMPTS; attempt += 1) {
      try {
        const account = await prisma.affiliateAccount.update({
          where: {id: current.id},
          data: {referralCode: generateReferralCode()},
        });

        return NextResponse.json({
          ok: true,
          account: toPublicAffiliateAccount(account),
        });
      } catch (error) {
        if (!isUniqueConstraintError(error, "AffiliateAccount.referralCode")) {
          throw error;
        }
      }
    }

    return NextResponse.json({ok: false, message: "Unable to generate a unique referral code."}, {status: 500});
  } catch (error) {
    console.error("Affiliate referral generate failed", error);
    return NextResponse.json({ok: false, message: "Unable to generate referral code."}, {status: 500});
  }
}
