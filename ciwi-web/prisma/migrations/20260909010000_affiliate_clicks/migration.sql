-- CreateTable
CREATE TABLE "AffiliateClick" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "referralCode" TEXT NOT NULL,
    "productSlug" TEXT,
    "visitorKey" TEXT NOT NULL,
    "clickedOn" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AffiliateClick_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "AffiliateAccount" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AffiliateClick_accountId_visitorKey_clickedOn_key" ON "AffiliateClick"("accountId", "visitorKey", "clickedOn");

-- CreateIndex
CREATE INDEX "AffiliateClick_accountId_createdAt_idx" ON "AffiliateClick"("accountId", "createdAt");
