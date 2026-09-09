"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

import {AuthGate} from "@/components/affiliate/AuthGate";
import {PayoutTable} from "@/components/affiliate/PayoutTable";
import {ProgressOverview} from "@/components/affiliate/ProgressOverview";
import {ReferralCodeCard} from "@/components/affiliate/ReferralCodeCard";
import {ReferralTable} from "@/components/affiliate/ReferralTable";
import {WithdrawCard} from "@/components/affiliate/WithdrawCard";
import {useAffiliate} from "@/components/providers/AffiliateProvider";
import {useLocale} from "@/components/providers/LocaleProvider";
import {SectionHeading} from "@/components/ui/SectionHeading";
import type {AffiliateCopy} from "@/content/affiliate";
import {getAffiliateProducts} from "@/content/affiliate";
import {emptyAffiliateStats, fetchAffiliateStats} from "@/lib/affiliate-api";
import {localizeHref} from "@/lib/i18n";

type AffiliateDashboardProps = {
  copy: AffiliateCopy["dashboard"];
};

type TabKey = "overview" | "progress" | "payouts";

export function AffiliateDashboard({copy}: AffiliateDashboardProps) {
  return (
    <AuthGate>
      <DashboardContent copy={copy} />
    </AuthGate>
  );
}

function DashboardContent({copy}: AffiliateDashboardProps) {
  const {account, logout, generateReferral} = useAffiliate();
  const locale = useLocale();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [stats, setStats] = useState(emptyAffiliateStats);

  useEffect(() => {
    let cancelled = false;

    fetchAffiliateStats().then((nextStats) => {
      if (!cancelled) {
        setStats(nextStats);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!account) {
    return null;
  }

  async function handleLogout() {
    await logout();
    router.push(localizeHref(locale, "/affiliate"));
  }

  async function handleGenerateReferral() {
    await generateReferral();
  }

  const products = getAffiliateProducts(locale);

  const tabs: {key: TabKey; label: string}[] = [
    {key: "overview", label: copy.tabs.overview},
    {key: "progress", label: copy.tabs.progress},
    {key: "payouts", label: copy.tabs.payouts},
  ];

  const paidTotal = 0;
  const pendingTotal = 0;

  return (
    <section className="page-section page-hero">
      <div className="dashboard-bar">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} as="h1" />
        <button type="button" className="button button--secondary" onClick={handleLogout}>
          {copy.logoutLabel}
        </button>
      </div>

      <div className="tab-list dashboard-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`tab-chip${activeTab === tab.key ? " tab-chip--active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="dashboard-panel">
        {activeTab === "overview" ? (
          <div className="section-stack">
            {account.referralCode ? (
              <ReferralCodeCard code={account.referralCode} products={products} copy={copy.referralCard} />
            ) : (
              <div className="surface-card affiliate-empty">
                <div>
                  <h3>{copy.referralCard.title}</h3>
                  <p className="quote">{copy.referralCard.description}</p>
                </div>
                <p className="quote">{copy.referralCard.emptyState}</p>
                <button type="button" className="button button--primary" onClick={handleGenerateReferral}>
                  {copy.referralCard.generateLabel}
                </button>
              </div>
            )}
            <ProgressOverview stats={stats} copy={copy.overview} />
          </div>
        ) : null}

        {activeTab === "progress" ? (
          <ReferralTable referrals={[]} products={products} copy={copy.progress} />
        ) : null}

        {activeTab === "payouts" ? (
          <div className="section-stack">
            <WithdrawCard copy={copy.withdraw} available={paidTotal} pending={pendingTotal} />
            <PayoutTable payouts={[]} copy={copy.payouts} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
