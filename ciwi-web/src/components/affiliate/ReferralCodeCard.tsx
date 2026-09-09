"use client";

import {useState} from "react";

import type {AffiliateCopy, AffiliateProduct} from "@/content/affiliate";
import {buildReferralLink, formatPercent} from "@/lib/affiliate";

type ReferralCodeCardProps = {
  code: string;
  products: AffiliateProduct[];
  copy: AffiliateCopy["dashboard"]["referralCard"];
};

export function ReferralCodeCard({code, products, copy}: ReferralCodeCardProps) {
  const [copied, setCopied] = useState<string | null>(null);

  async function copyText(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard access can be blocked; ignore and keep the button label unchanged.
    }
  }

  return (
    <div className="surface-card referral-code-card">
      <div>
        <h3>{copy.title}</h3>
        <p className="quote">{copy.description}</p>
      </div>

      <div className="referral-code-card__field">
        <span className="lead-form__label">{copy.codeLabel}</span>
        <div className="referral-code-card__row">
          <code className="referral-code-card__code">{code}</code>
          <button type="button" className="button button--ghost" onClick={() => copyText(code, "code")}>
            {copied === "code" ? copy.copiedLabel : copy.copyCodeLabel}
          </button>
        </div>
      </div>

      <div className="referral-code-card__field">
        <span className="lead-form__label">{copy.linkLabel}</span>
        <div className="referral-link-list">
          {products.map((product) => {
            const link = buildReferralLink(code, product.slug);

            return (
              <div key={product.slug} className="referral-link-list__item">
                <div className="referral-link-list__meta">
                  <span className="pill">{product.name}</span>
                  <span className="pill">
                    {copy.rateLabel}: {formatPercent(product.rate)}
                  </span>
                </div>
                <div className="referral-code-card__row">
                  <code className="referral-code-card__code referral-code-card__code--link">{link}</code>
                  <button type="button" className="button button--ghost" onClick={() => copyText(link, product.slug)}>
                    {copied === product.slug ? copy.copiedLabel : copy.copyLinkLabel}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
