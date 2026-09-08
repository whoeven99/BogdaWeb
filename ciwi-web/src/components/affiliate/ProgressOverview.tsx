import type {AffiliateCopy, ProgressStats} from "@/content/affiliate";
import {formatCurrency} from "@/lib/affiliate";

type ProgressOverviewProps = {
  stats: ProgressStats;
  copy: AffiliateCopy["dashboard"]["overview"];
};

export function ProgressOverview({stats, copy}: ProgressOverviewProps) {
  const items = [
    {label: copy.labels.clicks, value: stats.clicks.toLocaleString()},
    {label: copy.labels.signups, value: stats.signups.toLocaleString()},
    {label: copy.labels.activated, value: stats.activated.toLocaleString()},
    {label: copy.labels.trackedRevenue, value: formatCurrency(stats.trackedRevenue)},
    {label: copy.labels.commissionEarned, value: formatCurrency(stats.commissionEarned)},
  ];

  return (
    <div className="section-stack">
      <div>
        <h3>{copy.statsTitle}</h3>
        <p className="quote">{copy.statsDescription}</p>
      </div>
      <div className="card-grid">
        {items.map((item) => (
          <div key={item.label} className="surface-card affiliate-stat-card">
            <span className="affiliate-stat__value">{item.value}</span>
            <span className="affiliate-stat__label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
