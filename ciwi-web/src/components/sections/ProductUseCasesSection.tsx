import type {ReactNode} from "react";

import {SectionHeading} from "@/components/ui/SectionHeading";

type ProductUseCaseItem = {
  title: string;
  description: string;
  audience?: string;
  outcome?: string;
  category?: string;
  href?: string;
};

type ProductUseCasesSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  items: ProductUseCaseItem[];
  audienceLabel: string;
  outcomeLabel: string;
  cta?: ReactNode;
};

export function ProductUseCasesSection({
  id,
  eyebrow,
  title,
  description,
  items,
  audienceLabel,
  outcomeLabel,
  cta,
}: ProductUseCasesSectionProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="page-section anchor-offset" id={id}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="detail-grid">
        {items.map((item) => (
          <article key={`${item.title}-${item.description}`} className="surface-card section-stack">
            <div className="space-y-3">
              {item.category ? <span className="pill">{item.category}</span> : null}
              <h3>{item.title}</h3>
            </div>
            <p className="quote">{item.description}</p>
            {item.audience || item.outcome ? (
              <dl className="product-use-case__meta">
                {item.audience ? (
                  <div className="product-use-case__meta-row">
                    <dt>{audienceLabel}</dt>
                    <dd>{item.audience}</dd>
                  </div>
                ) : null}
                {item.outcome ? (
                  <div className="product-use-case__meta-row">
                    <dt>{outcomeLabel}</dt>
                    <dd>{item.outcome}</dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
          </article>
        ))}
      </div>
      {cta}
    </section>
  );
}
