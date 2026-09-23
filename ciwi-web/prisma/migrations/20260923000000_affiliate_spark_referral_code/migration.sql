-- AlterTable
ALTER TABLE "AffiliateAccount" ADD COLUMN "sparkReferralCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "AffiliateAccount_sparkReferralCode_key" ON "AffiliateAccount"("sparkReferralCode");
