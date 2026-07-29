import {SectionHeading} from "@/components/ui/SectionHeading";

type OutcomeSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: {title: string; description: string}[];
};

export function OutcomeSection({eyebrow, title, description, items}: OutcomeSectionProps) {
  return (
    <section className="page-section">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
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
