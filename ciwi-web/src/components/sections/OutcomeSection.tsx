import {SectionHeading} from "@/components/ui/SectionHeading";
import {homePageCopy} from "@/content/home-page-copy";

export function OutcomeSection() {
  const copy = homePageCopy.outcomes;
  const items = homePageCopy.outcomeItems;

  return (
    <section className="page-section">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <div className="card-grid">
        {items.map((item) => (
          <article key={item.title} className="surface-card">
            <h3>{item.title}</h3>
            <p className="quote">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
