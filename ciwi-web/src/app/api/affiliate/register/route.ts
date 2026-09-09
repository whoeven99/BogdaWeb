import {NextResponse} from "next/server";
import {z} from "zod";

import {isUniqueConstraintError, toPublicAffiliateAccount} from "@/lib/affiliate-account";
import {hashPassword} from "@/lib/affiliate-password";
import {createAffiliateSession} from "@/lib/affiliate-session";
import {prisma} from "@/lib/db";

const registerSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(120).toLowerCase(),
  password: z.string().min(6).max(200),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ok: false, message: "Invalid registration payload."}, {status: 400});
    }

    const passwordHash = await hashPassword(result.data.password);
    const account = await prisma.affiliateAccount.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        passwordHash,
        status: "active",
      },
    });

    await createAffiliateSession(account.id);

    return NextResponse.json({
      ok: true,
      account: toPublicAffiliateAccount(account),
    });
  } catch (error) {
    if (isUniqueConstraintError(error, "AffiliateAccount.email")) {
      return NextResponse.json({ok: false, message: "An account with this email already exists."}, {status: 409});
    }

    console.error("Affiliate register failed", error);

    return NextResponse.json({ok: false, message: "Unable to register affiliate account."}, {status: 500});
  }
}
