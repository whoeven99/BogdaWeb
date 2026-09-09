"use client";

import type {AffiliateCopy} from "@/content/affiliate";
import {formatCurrency} from "@/lib/affiliate";

type WithdrawCardProps = {
  copy: AffiliateCopy["dashboard"]["withdraw"];
  available: number;
  pending: number;
};

export function WithdrawCard({copy, available, pending}: WithdrawCardProps) {
  return (
    <div className="surface-card withdraw-card">
      <div className="withdraw-card__header">
        <div className="withdraw-card__balance">
          <span className="affiliate-stat__label">{copy.availableLabel}</span>
          <span className="affiliate-stat__value">{formatCurrency(available)}</span>
        </div>
        <div className="withdraw-card__balance">
          <span className="affiliate-stat__label">{copy.pendingLabel}</span>
          <span className="affiliate-stat__value">{formatCurrency(pending)}</span>
        </div>
      </div>
      <p className="quote">{copy.termNote}</p>
    </div>
  );
}
