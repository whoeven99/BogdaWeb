import {randomUUID} from "node:crypto";

import type {AffiliateProductSlug, ReferralRecord} from "@/content/affiliate";
import {getAffiliateProductDb, type AffiliateProductDb} from "@/lib/affiliate-product-db";
import {prisma} from "@/lib/db";

const CODE_LENGTH = 6;
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const REWARD_AMOUNT = 1_000_000;
const MAX_USES = 1_000_000;
const CREATED_BY = "ciwi-affiliate";
const MAX_CODE_ATTEMPTS = 5;
const PROGRESS_LIMIT = 200;

type CodePrefix = "CIWI" | "SPARK";

type IssuedCode = {
  id: string;
  code: string;
};

function isUniqueError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return /UNIQUE/i.test(message);
}

function noteFor(email: string) {
  return `联盟 ${email}`.slice(0, 200);
}

export function generateProductReferralCode(prefix: CodePrefix): string {
  const values = new Uint8Array(CODE_LENGTH);
  crypto.getRandomValues(values);

  let suffix = "";
  for (const value of values) {
    suffix += CODE_ALPHABET[value % CODE_ALPHABET.length];
  }

  return `${prefix}-${suffix}`;
}

async function insertReferralCode(product: AffiliateProductDb, code: string, email: string): Promise<string> {
  const id = randomUUID();
  const amountColumn = product === "translator" ? "creditAmount" : "tokenAmount";
  const now = new Date().toISOString();

  await getAffiliateProductDb(product).execute({
    sql: `
      INSERT INTO ReferralCode
        (id, code, note, ${amountColumn}, maxUses, usedCount, enabled, startsAt, endsAt, createdBy, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, 0, 1, NULL, NULL, ?, ?, ?)
    `,
    args: [id, code, noteFor(email), REWARD_AMOUNT, MAX_USES, CREATED_BY, now, now],
  });

  return id;
}

async function deleteIssuedCode(product: AffiliateProductDb, id: string) {
  await getAffiliateProductDb(product)
    .execute({
      sql: `DELETE FROM ReferralCode WHERE id = ? AND usedCount = 0`,
      args: [id],
    })
    .catch(() => undefined);
}

async function insertFreshCode(product: AffiliateProductDb, prefix: CodePrefix, email: string): Promise<IssuedCode> {
  for (let attempt = 0; attempt < MAX_CODE_ATTEMPTS; attempt += 1) {
    const code = generateProductReferralCode(prefix);

    try {
      const id = await insertReferralCode(product, code, email);
      return {id, code};
    } catch (error) {
      if (!isUniqueError(error)) {
        throw error;
      }
    }
  }

  throw new Error("Unable to generate a unique referral code.");
}

async function findReferralOwner(product: AffiliateProductDb, code: string) {
  const result = await getAffiliateProductDb(product).execute({
    sql: `SELECT createdBy FROM ReferralCode WHERE code = ?`,
    args: [code],
  });
  const createdBy = result.rows[0]?.createdBy;
  return createdBy == null ? null : String(createdBy);
}

async function resolveTranslatorCode(currentCode: string | null, email: string, created: {product: AffiliateProductDb; id: string}[]) {
  if (!currentCode) {
    const issued = await insertFreshCode("translator", "CIWI", email);
    created.push({product: "translator", id: issued.id});
    return issued.code;
  }

  const owner = await findReferralOwner("translator", currentCode);
  if (owner === CREATED_BY) {
    return currentCode;
  }

  if (owner) {
    const issued = await insertFreshCode("translator", "CIWI", email);
    created.push({product: "translator", id: issued.id});
    return issued.code;
  }

  const id = await insertReferralCode("translator", currentCode, email);
  created.push({product: "translator", id});
  return currentCode;
}

export async function ensureAffiliateReferralCodes(accountId: string) {
  const account = await prisma.affiliateAccount.findUnique({where: {id: accountId}});

  if (!account) {
    throw new Error("Affiliate account not found.");
  }

  if (account.referralCode && account.sparkReferralCode) {
    return account;
  }

  const created: {product: AffiliateProductDb; id: string}[] = [];

  try {
    const translatorCode = await resolveTranslatorCode(account.referralCode, account.email, created);
    let sparkCode = account.sparkReferralCode;

    if (!sparkCode) {
      const issued = await insertFreshCode("spark", "SPARK", account.email);
      sparkCode = issued.code;
      created.push({product: "spark", id: issued.id});
    }

    const updated = await prisma.affiliateAccount.updateMany({
      where: {
        id: account.id,
        referralCode: account.referralCode,
        sparkReferralCode: account.sparkReferralCode,
      },
      data: {
        referralCode: translatorCode,
        sparkReferralCode: sparkCode,
      },
    });

    if (updated.count !== 1) {
      throw new Error("Affiliate referral codes changed concurrently.");
    }

    return await prisma.affiliateAccount.findUniqueOrThrow({where: {id: account.id}});
  } catch (error) {
    await Promise.all(created.map((row) => deleteIssuedCode(row.product, row.id)));
    throw error;
  }
}

async function countForCode(product: AffiliateProductDb, code: string | null) {
  if (!code) {
    return {installs: 0, claims: 0};
  }

  const result = await getAffiliateProductDb(product).execute({
    sql: `
      SELECT
        (SELECT COUNT(*) FROM ReferralInstall i WHERE i.codeId = c.id) AS installs,
        (SELECT COUNT(*) FROM ReferralClaim cl WHERE cl.codeId = c.id) AS claims
      FROM ReferralCode c
      WHERE c.code = ?
    `,
    args: [code],
  });
  const row = result.rows[0];

  return {
    installs: Number(row?.installs ?? 0),
    claims: Number(row?.claims ?? 0),
  };
}

export async function countAffiliateFunnel(codes: {translatorCode: string | null; sparkCode: string | null}) {
  const [translator, spark] = await Promise.all([
    countForCode("translator", codes.translatorCode).catch((error) => {
      console.error("Affiliate translator funnel count failed", error);
      return {installs: 0, claims: 0};
    }),
    countForCode("spark", codes.sparkCode).catch((error) => {
      console.error("Affiliate spark funnel count failed", error);
      return {installs: 0, claims: 0};
    }),
  ]);

  return {
    signups: translator.installs + spark.installs,
    activated: translator.claims + spark.claims,
  };
}

function productSlug(product: AffiliateProductDb): AffiliateProductSlug {
  return product === "translator" ? "translator" : "spark-analytics-agent";
}

async function listInstalls(product: AffiliateProductDb, code: string | null): Promise<ReferralRecord[]> {
  if (!code) {
    return [];
  }

  const result = await getAffiliateProductDb(product).execute({
    sql: `
      SELECT i.shopHash AS shopHash, i.shop AS shop, i.installedAt AS installedAt,
             CASE WHEN cl.shopHash IS NULL THEN 0 ELSE 1 END AS subscribed
      FROM ReferralInstall i
      JOIN ReferralCode c ON c.id = i.codeId
      LEFT JOIN ReferralClaim cl ON cl.codeId = c.id AND cl.shopHash = i.shopHash
      WHERE c.code = ?
      ORDER BY i.installedAt DESC
      LIMIT ?
    `,
    args: [code, PROGRESS_LIMIT],
  });

  return result.rows.map((row) => {
    const shopHash = String(row.shopHash ?? "");
    const installedAt = row.installedAt == null ? "" : String(row.installedAt);

    return {
      id: `${product}:${shopHash}`,
      email: "",
      storeId: row.shop == null || row.shop === "" ? undefined : String(row.shop),
      productSlug: productSlug(product),
      signedUpAt: installedAt,
      installed: true,
      subscribed: Number(row.subscribed ?? 0) > 0,
    };
  });
}

export async function listAffiliateReferrals(codes: {translatorCode: string | null; sparkCode: string | null}) {
  const [translator, spark] = await Promise.all([
    listInstalls("translator", codes.translatorCode).catch((error) => {
      console.error("Affiliate translator progress failed", error);
      return [] as ReferralRecord[];
    }),
    listInstalls("spark", codes.sparkCode).catch((error) => {
      console.error("Affiliate spark progress failed", error);
      return [] as ReferralRecord[];
    }),
  ]);

  return [...translator, ...spark].sort((left, right) => right.signedUpAt.localeCompare(left.signedUpAt));
}
