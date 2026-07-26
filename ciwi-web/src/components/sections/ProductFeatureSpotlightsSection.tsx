import {SectionHeading} from "@/components/ui/SectionHeading";

type FeatureModule = {
  title: string;
  description: string;
  highlights: string[];
  primaryLabel: string;
  primaryText: string;
  secondaryLabel: string;
  secondaryText: string;
  note: string;
  previewLabels?: string[];
};

type ProductFeatureSpotlightsSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description: string;
  items: FeatureModule[];
};

export function ProductFeatureSpotlightsSection({
  id,
  eyebrow = "Function overview",
  title,
  description,
  items,
}: ProductFeatureSpotlightsSectionProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="page-section anchor-offset" id={id}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="section-stack">
        {items.map((item, index) => (
          <article
            key={item.title}
            className={`feature-spotlight ${index % 2 === 1 ? "feature-spotlight--reverse" : ""}`}
          >
            <div className="feature-spotlight__visual">
              {item.previewLabels?.length ? (
                <div className="resource-card__meta">
                  {item.previewLabels.map((label) => (
                    <span key={`${item.title}-${label}`}>{label}</span>
                  ))}
                </div>
              ) : null}
              <div className="demo-stack">
                <div className="demo-box">
                  <strong>{item.primaryLabel}</strong>
                  <p>{item.primaryText}</p>
                </div>
                <div className="demo-box demo-box--accent">
                  <strong>{item.secondaryLabel}</strong>
                  <p>{item.secondaryText}</p>
                </div>
              </div>
              <p className="quote">{item.note}</p>
            </div>
            <div className="feature-spotlight__content">
              <h3>{item.title}</h3>
              <p className="quote feature-spotlight__description">{item.description}</p>
              <ul className="check-list feature-spotlight__list">
                {item.highlights.map((highlight) => (
                  <li key={`${item.title}-${highlight}`}>{highlight}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
