import {SectionHeading} from "@/components/ui/SectionHeading";

type FaqSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: {question: string; answer: string; evidence?: string[]}[];
};

export function FaqSection({eyebrow, title, description, items}: FaqSectionProps) {
  return (
    <section className="page-section">
      {title ? <SectionHeading eyebrow={eyebrow} title={title} description={description} /> : null}
      <div className="faq-list">
        {items.map((item) => (
          <details key={item.question} className="surface-card faq-item">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
            {item.evidence?.length ? (
              <ul className="faq-evidence-list">
                {item.evidence.map((evidence) => (
                  <li key={evidence}>{evidence}</li>
                ))}
              </ul>
            ) : null}
          </details>
        ))}
      </div>
    </section>
  );
}
