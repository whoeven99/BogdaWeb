import type {AffiliateCopy, PayoutRecord} from "@/content/affiliate";
import {formatCurrency, formatPercent} from "@/lib/affiliate";

type PayoutTableProps = {
  payouts: PayoutRecord[];
  copy: AffiliateCopy["dashboard"]["payouts"];
};

export function PayoutTable({payouts, copy}: PayoutTableProps) {
  if (payouts.length === 0) {
    return <p className="quote">{copy.emptyState}</p>;
  }

  const pendingTotal = payouts
    .filter((payout) => payout.status === "pending")
    .reduce((sum, payout) => sum + payout.amount, 0);
  const paidTotal = payouts
    .filter((payout) => payout.status === "paid")
    .reduce((sum, payout) => sum + payout.amount, 0);

  return (
    <div className="section-stack">
      <div className="inline-list">
        <span className="pill">
          {copy.pendingTotal}: {formatCurrency(pendingTotal)}
        </span>
        <span className="pill">
          {copy.paidTotal}: {formatCurrency(paidTotal)}
        </span>
      </div>
      <div className="surface-card affiliate-table-card">
        <table className="affiliate-table">
          <thead>
            <tr>
              <th>{copy.columns.period}</th>
              <th>{copy.columns.base}</th>
              <th>{copy.columns.rate}</th>
              <th>{copy.columns.amount}</th>
              <th>{copy.columns.status}</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((payout) => (
              <tr key={payout.id}>
                <td>{payout.period}</td>
                <td>{formatCurrency(payout.baseAmount)}</td>
                <td>{formatPercent(payout.rate)}</td>
                <td>{formatCurrency(payout.amount)}</td>
                <td>{copy.statusLabels[payout.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
