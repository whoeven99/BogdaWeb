import type {ReactNode} from "react";

import {SectionHeading} from "@/components/ui/SectionHeading";

type ProductControlItem = {
  title: string;
  description: string;
};

type ProductControlSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  items: ProductControlItem[];
  cta?: ReactNode;
};

export function ProductControlSection({id, eyebrow, title, description, items, cta}: ProductControlSectionProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="page-section anchor-offset product-control-section" id={id}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="product-control-section__grid">
        {items.map((item, index) => (
          <article key={`${item.title}-${index}`} className="product-control-section__item">
            <div className="product-control-section__index">{String(index + 1).padStart(2, "0")}</div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
      {cta}
    </section>
  );
}
