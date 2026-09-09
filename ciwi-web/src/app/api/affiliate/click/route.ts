import {NextResponse} from "next/server";
import {z} from "zod";

import {recordAffiliateClick} from "@/lib/affiliate-click";

const clickSchema = z.object({
  code: z.string().trim().min(1).max(40),
  product: z.string().trim().max(80).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = clickSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ok: false, message: "Invalid click payload."}, {status: 400});
    }

    await recordAffiliateClick({
      code: result.data.code,
      product: result.data.product,
    });

    return NextResponse.json({ok: true});
  } catch (error) {
    console.error("Affiliate click endpoint failed", error);
    return NextResponse.json({ok: false, message: "Unable to record affiliate click."}, {status: 500});
  }
}
