import {z} from "zod";

import type {Locale} from "@/lib/i18n";

const localeSchema = z.enum(["en", "zh-cn"]);

const baseLeadSchema = z.object({
  locale: localeSchema.default("en"),
  source: z.string().trim().min(1).max(80),
});

const optionalTextField = z.string().trim().max(1000).optional().or(z.literal(""));

export const newsletterLeadSchema = baseLeadSchema.extend({
  entryType: z.literal("newsletter"),
  email: z.string().trim().email().max(120),
});

export const waitlistLeadSchema = baseLeadSchema.extend({
  entryType: z.literal("waitlist"),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  product: z.string().trim().min(1).max(120),
  storeUrl: optionalTextField,
  role: z.string().trim().max(80).optional().or(z.literal("")),
  notes: optionalTextField,
});

export const contactLeadSchema = baseLeadSchema.extend({
  entryType: z.literal("contact"),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  role: z.string().trim().max(80).optional().or(z.literal("")),
  notes: optionalTextField,
});

export const leadCaptureSchema = z.discriminatedUnion("entryType", [
  newsletterLeadSchema,
  waitlistLeadSchema,
  contactLeadSchema,
]);

export type LeadCapturePayload = z.infer<typeof leadCaptureSchema>;

function getLocaleLabel(locale: Locale) {
  return locale === "zh-cn" ? "中文" : "English";
}

function formatValue(value: string | undefined) {
  return value && value.trim() ? value.trim() : "Not provided";
}

function buildFeishuText(payload: LeadCapturePayload) {
  const lines = [
    "[Ciwi Lead Capture]",
    `Type: ${payload.entryType}`,
    `Source: ${payload.source}`,
    `Locale: ${getLocaleLabel(payload.locale)}`,
    `Submitted At: ${new Date().toISOString()}`,
  ];

  if (payload.entryType === "newsletter") {
    lines.push(`Email: ${payload.email}`);
    return lines.join("\n");
  }

  if (payload.entryType === "waitlist") {
    lines.push(
      `Product: ${payload.product}`,
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Store URL: ${formatValue(payload.storeUrl)}`,
      `Role: ${formatValue(payload.role)}`,
      `Notes: ${formatValue(payload.notes)}`,
    );

    return lines.join("\n");
  }

  lines.push(
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company / Store: ${formatValue(payload.company)}`,
    `Role: ${formatValue(payload.role)}`,
    `Notes: ${formatValue(payload.notes)}`,
  );

  return lines.join("\n");
}

function getFeishuWebhookUrl() {
  return process.env.FEISHU_BOT_WEBHOOK_URL || process.env.LARK_BOT_WEBHOOK_URL || "";
}

export async function sendLeadCaptureToFeishu(payload: LeadCapturePayload) {
  const webhookUrl = getFeishuWebhookUrl();

  if (!webhookUrl) {
    throw new Error("Missing Feishu bot webhook URL.");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      msg_type: "text",
      content: {
        text: buildFeishuText(payload),
      },
    }),
  });

  const responseText = await response.text();
  let parsed: {code?: number; StatusCode?: number; msg?: string} = {};

  try {
    parsed = JSON.parse(responseText) as {code?: number; StatusCode?: number; msg?: string};
  } catch {
    parsed = {};
  }

  const hasStructuredCode = typeof parsed.code === "number" || typeof parsed.StatusCode === "number";
  const feishuSuccess = hasStructuredCode ? parsed.code === 0 || parsed.StatusCode === 0 : response.ok;

  if (!feishuSuccess) {
    throw new Error(parsed.msg || "Feishu bot notification failed.");
  }
}
