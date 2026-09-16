import {SectionHeading} from "@/components/ui/SectionHeading";

type SimpleCardItem = {
  title?: string;
  description: string;
};

type SimpleCardGridSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  items: SimpleCardItem[];
  className?: string;
  gridClassName?: string;
  cardClassName?: string;
};

export function SimpleCardGridSection({
  id,
  eyebrow,
  title,
  description,
  items,
  className = "page-section",
  gridClassName,
  cardClassName,
}: SimpleCardGridSectionProps) {
  const gridClasses = ["ui-simple-card-grid", gridClassName].filter(Boolean).join(" ");
  const itemClasses = ["ui-simple-card-grid__item", cardClassName].filter(Boolean).join(" ");

  return (
    <section id={id} className={className}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className={gridClasses}>
        {items.map((item) => (
          <article key={`${item.title ?? "body"}-${item.description}`} className={itemClasses}>
            {item.title ? <h3 className="ui-simple-card-grid__item-title">{item.title}</h3> : null}
            <p className="quote">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
