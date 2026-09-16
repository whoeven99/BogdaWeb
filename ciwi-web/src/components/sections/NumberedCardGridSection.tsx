import {SectionHeading} from "@/components/ui/SectionHeading";

type NumberedCardItem = {
  title?: string;
  description: string;
};

type NumberedCardGridSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  items: NumberedCardItem[];
  className?: string;
};

export function NumberedCardGridSection({
  id,
  eyebrow,
  title,
  description,
  items,
  className = "page-section",
}: NumberedCardGridSectionProps) {
  return (
    <section id={id} className={className}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="ui-numbered-card-grid">
        {items.map((item, index) => (
          <article key={`${item.title ?? "step"}-${item.description}`} className="ui-numbered-card-grid__item">
            <div className="ui-numbered-card-grid__index">{String(index + 1).padStart(2, "0")}</div>
            <div className="ui-numbered-card-grid__body">
              {item.title ? (
                <p className="quote">
                  <strong>{item.title}</strong>
                </p>
              ) : null}
              <p className="quote">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
