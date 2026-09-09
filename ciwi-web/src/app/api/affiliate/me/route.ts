import {NextResponse} from "next/server";

import {getCurrentAffiliateAccount} from "@/lib/affiliate-session";

export async function GET() {
  try {
    const account = await getCurrentAffiliateAccount();

    if (!account) {
      return NextResponse.json({ok: false, message: "Not authenticated."}, {status: 401});
    }

    return NextResponse.json({ok: true, account});
  } catch (error) {
    console.error("Affiliate session lookup failed", error);
    return NextResponse.json({ok: false, message: "Unable to load affiliate session."}, {status: 500});
  }
}
