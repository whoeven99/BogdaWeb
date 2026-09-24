-- 联盟后台按邀请码统计安装与兑换。这两张表由翻译/Spark 应用写入，测试库里原先缺失。

CREATE TABLE IF NOT EXISTS "ReferralInstall" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codeId" TEXT NOT NULL,
    "shopHash" TEXT NOT NULL,
    "shop" TEXT,
    "installedAt" DATETIME,
    CONSTRAINT "ReferralInstall_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "ReferralCode" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "ReferralInstall_codeId_shopHash_key" ON "ReferralInstall"("codeId", "shopHash");

CREATE TABLE IF NOT EXISTS "ReferralClaim" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codeId" TEXT NOT NULL,
    "shopHash" TEXT NOT NULL,
    CONSTRAINT "ReferralClaim_codeId_fkey" FOREIGN KEY ("codeId") REFERENCES "ReferralCode" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "ReferralClaim_codeId_shopHash_key" ON "ReferralClaim"("codeId", "shopHash");
