import {SectionHeading} from "@/components/ui/SectionHeading";

type DemoScenario = {
  title: string;
  primaryLabel: string;
  primaryText: string;
  secondaryLabel: string;
  secondaryText: string;
  note: string;
};

type DemoShowcaseSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  items: DemoScenario[];
};

export function DemoShowcaseSection({
  eyebrow = "Demo",
  title,
  description,
  items,
}: DemoShowcaseSectionProps) {
  return (
    <section className="page-section">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="demo-grid">
        {items.map((item) => (
          <article key={item.title} className="surface-card section-stack">
            <div>
              <h3>{item.title}</h3>
              <p className="quote">{item.note}</p>
            </div>
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
          </article>
        ))}
      </div>
    </section>
  );
}
