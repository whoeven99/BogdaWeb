import type {ReactNode} from "react";

import {SectionHeading} from "@/components/ui/SectionHeading";

type ProductDeepDiveStep = {
  title: string;
  description: string;
};

type ProductDeepDiveSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  steps: ProductDeepDiveStep[];
  outcomeTitle?: string;
  outcomeText?: string;
  cta?: ReactNode;
};

export function ProductDeepDiveSection({
  id,
  eyebrow,
  title,
  description,
  steps,
  outcomeTitle,
  outcomeText,
  cta,
}: ProductDeepDiveSectionProps) {
  if (!steps.length) {
    return null;
  }

  return (
    <section className="page-section anchor-offset product-deep-dive" id={id}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="product-deep-dive__layout">
        <div className="product-deep-dive__steps">
          {steps.map((step, index) => (
            <article key={`${step.title}-${index}`} className="product-deep-dive__step">
              <div className="product-deep-dive__step-index">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
        {outcomeTitle || outcomeText ? (
          <aside className="product-deep-dive__outcome">
            {outcomeTitle ? <span className="product-deep-dive__outcome-label">{outcomeTitle}</span> : null}
            {outcomeText ? <p>{outcomeText}</p> : null}
          </aside>
        ) : null}
      </div>
      {cta}
    </section>
  );
}
