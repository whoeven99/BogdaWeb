import {SectionHeading} from "@/components/ui/SectionHeading";
import {homePageCopy} from "@/content/home-page-copy";

type FaqSectionProps = {
  items: {question: string; answer: string}[];
};

export function FaqSection({items}: FaqSectionProps) {
  const copy = homePageCopy.faq;

  return (
    <section className="page-section">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <div className="faq-list">
        {items.map((item) => (
          <details key={item.question} className="surface-card faq-item">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
