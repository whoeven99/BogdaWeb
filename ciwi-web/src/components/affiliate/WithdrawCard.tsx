"use client";

import {useState} from "react";

import type {AffiliateCopy} from "@/content/affiliate";
import {formatCurrency} from "@/lib/affiliate";

type WithdrawCardProps = {
  copy: AffiliateCopy["dashboard"]["withdraw"];
  available: number;
  pending: number;
};

export function WithdrawCard({copy, available, pending}: WithdrawCardProps) {
  const [notified, setNotified] = useState(false);

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
      {notified ? (
        <p className="withdraw-card__notice">{copy.notice}</p>
      ) : (
        <button type="button" className="button button--primary" onClick={() => setNotified(true)}>
          {copy.buttonLabel}
        </button>
      )}
    </div>
  );
}
