import {NextResponse} from "next/server";
import {z} from "zod";

import {toPublicAffiliateAccount} from "@/lib/affiliate-account";
import {verifyPassword} from "@/lib/affiliate-password";
import {createAffiliateSession} from "@/lib/affiliate-session";
import {prisma} from "@/lib/db";

const loginSchema = z.object({
  email: z.string().trim().email().max(120).toLowerCase(),
  password: z.string().min(1).max(200),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ok: false, message: "Invalid login payload."}, {status: 400});
    }

    const account = await prisma.affiliateAccount.findUnique({
      where: {email: result.data.email},
    });

    if (!account || !(await verifyPassword(result.data.password, account.passwordHash))) {
      return NextResponse.json({ok: false, message: "Invalid email or password."}, {status: 401});
    }

    await createAffiliateSession(account.id);

    return NextResponse.json({
      ok: true,
      account: toPublicAffiliateAccount(account),
    });
  } catch (error) {
    console.error("Affiliate login failed", error);

    return NextResponse.json({ok: false, message: "Unable to sign in."}, {status: 500});
  }
}
