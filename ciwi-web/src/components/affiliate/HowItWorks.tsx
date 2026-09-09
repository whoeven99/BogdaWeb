import type {AffiliateCopy} from "@/content/affiliate";
import {SectionHeading} from "@/components/ui/SectionHeading";

type HowItWorksProps = {
  copy: AffiliateCopy["howItWorks"];
};

export function HowItWorks({copy}: HowItWorksProps) {
  return (
    <section className="page-section">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <div className="card-grid">
        {copy.steps.map((step, index) => (
          <article key={step.title} className="surface-card">
            <h3>{`0${index + 1}`}</h3>
            <p className="quote">{step.title}</p>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
