import {SectionHeading} from "@/components/ui/SectionHeading";

type ProductProofItem = {
  label: string;
  value: string;
  description: string;
};

type ProductProofSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  items: ProductProofItem[];
};

export function ProductProofSection({id, eyebrow, title, description, items}: ProductProofSectionProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="page-section anchor-offset product-proof-section" id={id}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="product-proof-section__grid">
        {items.map((item) => (
          <article key={`${item.label}-${item.value}`} className="product-proof-section__card">
            <span className="product-proof-section__label">{item.label}</span>
            <h3>{item.value}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
