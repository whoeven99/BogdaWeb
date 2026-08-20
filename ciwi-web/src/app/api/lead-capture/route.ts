import {NextResponse} from "next/server";

import {leadCaptureSchema, sendLeadCaptureToFeishu} from "@/lib/lead-capture";

function buildResponseMessage(entryType: "newsletter" | "waitlist" | "contact", locale: "en" | "zh-cn") {
  if (locale === "zh-cn") {
    if (entryType === "newsletter") {
      return "订阅已收到，我们会把后续更新同步给你。";
    }

    if (entryType === "waitlist") {
      return "已加入 waiting list，我们会尽快联系你。";
    }

    return "信息已收到，我们会尽快联系你。";
  }

  if (entryType === "newsletter") {
    return "Subscription received. We'll keep you posted.";
  }

  if (entryType === "waitlist") {
    return "You're on the waiting list. We'll follow up soon.";
  }

  return "Your message is in. We'll get back to you soon.";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = leadCaptureSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid lead capture payload.",
        },
        {status: 400},
      );
    }

    await sendLeadCaptureToFeishu(result.data);

    return NextResponse.json({
      ok: true,
      message: buildResponseMessage(result.data.entryType, result.data.locale),
    });
  } catch (error) {
    console.error("Lead capture request failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Lead capture is not configured correctly.",
      },
      {status: 500},
    );
  }
}
