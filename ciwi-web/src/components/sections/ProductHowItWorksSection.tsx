import type {ReactNode} from "react";

import {SectionHeading} from "@/components/ui/SectionHeading";

type HowItWorksStep = {
  title: string;
  description: string;
  bullets?: string[];
  badge?: string;
};

type ProductHowItWorksSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  steps: HowItWorksStep[];
  cta?: ReactNode;
};

export function ProductHowItWorksSection({
  id,
  eyebrow,
  title,
  description,
  steps,
  cta,
}: ProductHowItWorksSectionProps) {
  if (!steps.length) {
    return null;
  }

  return (
    <section id={id} className="page-section anchor-offset product-workflow">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <ol className="product-workflow__timeline">
        {steps.map((step, index) => (
          <li key={`${step.title}-${step.description}`} className="product-workflow__step">
            <span className="product-workflow__number" aria-hidden="true">{index + 1}</span>
            <div className="product-workflow__body">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {step.bullets?.length ? (
                <ul className="product-workflow__details">
                  {step.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {step.badge ? <span className="product-workflow__badge">{step.badge}</span> : null}
            </div>
          </li>
        ))}
      </ol>
      {cta}
    </section>
  );
}
