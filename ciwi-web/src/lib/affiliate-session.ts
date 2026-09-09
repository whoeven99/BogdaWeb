import {createHmac, timingSafeEqual} from "node:crypto";
import {cookies} from "next/headers";

import type {AffiliateAccount} from "@/content/affiliate";
import {toPublicAffiliateAccount} from "@/lib/affiliate-account";
import {prisma} from "@/lib/db";

export const AFFILIATE_SESSION_COOKIE = "ciwi_affiliate_session";
const SESSION_DAYS = 30;

function getSessionSecret() {
  const secret = process.env.AFFILIATE_SESSION_SECRET;

  if (!secret) {
    throw new Error("请设置 AFFILIATE_SESSION_SECRET。");
  }

  return secret;
}

function signSessionId(sessionId: string) {
  const signature = createHmac("sha256", getSessionSecret()).update(sessionId).digest("hex");
  return `${sessionId}.${signature}`;
}

function readSignedSessionId(value: string | undefined) {
  if (!value) {
    return null;
  }

  const separator = value.lastIndexOf(".");
  if (separator <= 0 || separator === value.length - 1) {
    return null;
  }

  const sessionId = value.slice(0, separator);
  const signature = value.slice(separator + 1);
  const expected = createHmac("sha256", getSessionSecret()).update(sessionId).digest("hex");

  if (expected.length !== signature.length) {
    return null;
  }

  if (!timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) {
    return null;
  }

  return sessionId;
}

export async function createAffiliateSession(accountId: string) {
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const session = await prisma.affiliateSession.create({
    data: {
      accountId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(AFFILIATE_SESSION_COOKIE, signSessionId(session.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function clearAffiliateSession() {
  const cookieStore = await cookies();
  const sessionId = readSignedSessionId(cookieStore.get(AFFILIATE_SESSION_COOKIE)?.value);

  if (sessionId) {
    await prisma.affiliateSession.deleteMany({
      where: {id: sessionId},
    });
  }

  cookieStore.set(AFFILIATE_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}

export async function getCurrentAffiliateAccount(): Promise<AffiliateAccount | null> {
  const cookieStore = await cookies();
  const sessionId = readSignedSessionId(cookieStore.get(AFFILIATE_SESSION_COOKIE)?.value);

  if (!sessionId) {
    return null;
  }

  const session = await prisma.affiliateSession.findUnique({
    where: {id: sessionId},
    include: {account: true},
  });

  if (!session || session.expiresAt.getTime() <= Date.now()) {
    if (session) {
      await prisma.affiliateSession.delete({where: {id: session.id}});
    }

    return null;
  }

  return toPublicAffiliateAccount(session.account);
}
