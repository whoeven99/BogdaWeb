import {NextResponse} from "next/server";

import {countAffiliateClicks} from "@/lib/affiliate-click";
import {getCurrentAffiliateAccount} from "@/lib/affiliate-session";

export async function GET() {
  try {
    const account = await getCurrentAffiliateAccount();

    if (!account) {
      return NextResponse.json({ok: false, message: "Not authenticated."}, {status: 401});
    }

    const clicks = await countAffiliateClicks(account.id);

    return NextResponse.json({
      ok: true,
      stats: {
        clicks,
        signups: 0,
        activated: 0,
        conversionRate: 0,
        trackedRevenue: 0,
        commissionEarned: 0,
        currency: "USD",
      },
    });
  } catch (error) {
    console.error("Affiliate stats failed", error);
    return NextResponse.json({ok: false, message: "Unable to load affiliate stats."}, {status: 500});
  }
}
