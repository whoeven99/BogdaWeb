-- CreateTable
CREATE TABLE "AffiliateAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "referralCode" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AffiliateAccount_email_key" ON "AffiliateAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AffiliateAccount_referralCode_key" ON "AffiliateAccount"("referralCode");

-- CreateTable
CREATE TABLE "AffiliateSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AffiliateSession_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "AffiliateAccount" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "AffiliateSession_accountId_idx" ON "AffiliateSession"("accountId");

-- CreateIndex
CREATE INDEX "AffiliateSession_expiresAt_idx" ON "AffiliateSession"("expiresAt");
