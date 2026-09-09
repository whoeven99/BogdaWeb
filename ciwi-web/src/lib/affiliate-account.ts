import type {AffiliateAccount} from "@/content/affiliate";
import type {AffiliateAccount as AffiliateAccountRecord} from "@/generated/prisma";

export function isUniqueConstraintError(error: unknown, field?: string) {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  if ("code" in error && error.code === "P2002") {
    return true;
  }

  const message = "message" in error ? String(error.message) : "";

  if (!/UNIQUE constraint failed/i.test(message)) {
    return false;
  }

  return field ? message.includes(field) : true;
}

export function toPublicAffiliateAccount(account: AffiliateAccountRecord): AffiliateAccount {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    referralCode: account.referralCode,
    status: account.status === "pending" ? "pending" : "active",
    joinedAt: account.createdAt.toISOString(),
  };
}
