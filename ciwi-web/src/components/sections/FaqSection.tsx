import {SectionHeading} from "@/components/ui/SectionHeading";

type FaqSectionProps = {
  items: {question: string; answer: string}[];
};

export function FaqSection({items}: FaqSectionProps) {
  return (
    <section className="page-section">
      <SectionHeading
        eyebrow="FAQ"
        title="先回答关键问题，再推动用户进入下一步"
        description="把最常见的问题先说清楚。"
      />
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
