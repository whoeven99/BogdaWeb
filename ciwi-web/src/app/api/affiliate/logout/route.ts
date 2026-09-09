import {NextResponse} from "next/server";

import {clearAffiliateSession} from "@/lib/affiliate-session";

export async function POST() {
  try {
    await clearAffiliateSession();
    return NextResponse.json({ok: true});
  } catch (error) {
    console.error("Affiliate logout failed", error);
    return NextResponse.json({ok: false, message: "Unable to sign out."}, {status: 500});
  }
}
