import {ProductCard} from "@/components/cards/ProductCard";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {homePageCopy} from "@/content/home-page-copy";
import {products} from "@/content/products";

type ProductMatrixSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
};

export function ProductMatrixSection({eyebrow, title, description, className = "page-section"}: ProductMatrixSectionProps) {
  const fallback = homePageCopy.productMatrix;
  const copy = {
    eyebrow: eyebrow ?? fallback.eyebrow,
    title: title ?? fallback.title,
    description: description ?? fallback.description,
  };

  return (
    <section className={className}>
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <div className="card-grid">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            name={product.name}
            description={product.shortDescription}
            href={`/products/${product.slug}`}
            icon={product.icon}
            metrics={product.metrics}
            rating={product.rating}
            reviewCount={product.reviewCount}
            reviewSnippets={product.reviewSnippets}
          />
        ))}
      </div>
    </section>
  );
}
