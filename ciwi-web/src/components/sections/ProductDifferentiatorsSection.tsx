import {ArticleCard} from "@/components/cards/ArticleCard";
import {SectionHeading} from "@/components/ui/SectionHeading";

type DifferentiatorItem = {
  title: string;
  description: string;
  bullets?: string[];
};

type CompareLink = {
  title: string;
  description: string;
  href: string;
  meta: string[];
};

type ProductDifferentiatorsSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  items?: DifferentiatorItem[];
  compareLinks?: CompareLink[];
};

export function ProductDifferentiatorsSection({
  id,
  eyebrow,
  title,
  description,
  items = [],
  compareLinks = [],
}: ProductDifferentiatorsSectionProps) {
  if (!items.length && !compareLinks.length) {
    return null;
  }

  return (
    <section className="page-section anchor-offset" id={id}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="section-stack">
        {items.length ? (
          <div className="detail-grid">
            {items.map((item) => (
              <article key={`${item.title}-${item.description}`} className="surface-card section-stack">
                <h3>{item.title}</h3>
                <p className="quote">{item.description}</p>
                {item.bullets?.length ? (
                  <ul className="check-list">
                    {item.bullets.map((bullet) => (
                      <li key={`${item.title}-${bullet}`}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        ) : null}
        {compareLinks.length ? (
          <div className="resource-grid">
            {compareLinks.map((item) => (
              <ArticleCard
                key={item.href}
                title={item.title}
                description={item.description}
                href={item.href}
                meta={item.meta}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
