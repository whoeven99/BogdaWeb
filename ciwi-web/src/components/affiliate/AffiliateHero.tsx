import type {AffiliateCopy} from "@/content/affiliate";
import {mockProgressStats} from "@/content/affiliate";
import {formatCurrency} from "@/lib/affiliate";
import {Button} from "@/components/ui/Button";
import {SectionHeading} from "@/components/ui/SectionHeading";

type AffiliateHeroProps = {
  copy: AffiliateCopy["hero"];
};

export function AffiliateHero({copy}: AffiliateHeroProps) {
  const sampleStats = [
    {label: copy.sampleLabels.activated, value: String(mockProgressStats.activated)},
    {label: copy.sampleLabels.trackedRevenue, value: formatCurrency(mockProgressStats.trackedRevenue)},
    {label: copy.sampleLabels.commission, value: formatCurrency(mockProgressStats.commissionEarned)},
  ];

  return (
    <section className="page-section page-hero">
      <div className="split-grid">
        <div>
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
            as="h1"
          />
          <div className="tag-list space-top-lg">
            {copy.highlights.map((highlight) => (
              <span key={highlight} className="pill">
                {highlight}
              </span>
            ))}
          </div>
          <div className="inline-list space-top-xl">
            <Button href="/affiliate/register">{copy.registerLabel}</Button>
            <Button href="/affiliate/login" variant="secondary">
              {copy.loginLabel}
            </Button>
          </div>
        </div>
        <div className="surface-card section-stack">
          <h3>{copy.sampleTitle}</h3>
          <p className="quote">{copy.sampleDescription}</p>
          <div className="card-grid">
            {sampleStats.map((stat) => (
              <div key={stat.label} className="affiliate-stat">
                <span className="affiliate-stat__value">{stat.value}</span>
                <span className="affiliate-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
