import {SectionHeading} from "@/components/ui/SectionHeading";

type OutcomeSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: {title: string; description: string}[];
};

export function OutcomeSection({eyebrow, title, description, items}: OutcomeSectionProps) {
  return (
    <section className="ui-page-section">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={item.title}
            className="ui-outcome-card"
          >
            <div className="ui-outcome-card__index">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="ui-outcome-card__title">{item.title}</h3>
            <p className="ui-outcome-card__body">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
