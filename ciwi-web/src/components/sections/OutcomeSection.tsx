import {SectionHeading} from "@/components/ui/SectionHeading";
import {outcomeItems} from "@/content/home";

export function OutcomeSection() {
  return (
    <section className="page-section">
      <SectionHeading
        eyebrow="Outcomes"
        title="围绕商家真正关心的结果组织产品和内容"
        description="从转化、内容效率到多语言运营，Ciwi 希望先回答业务问题，再介绍产品能力。"
      />
      <div className="card-grid">
        {outcomeItems.map((item) => (
          <article key={item.title} className="surface-card">
            <h3>{item.title}</h3>
            <p className="quote">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
