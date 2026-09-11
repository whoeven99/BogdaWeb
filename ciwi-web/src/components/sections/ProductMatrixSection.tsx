import {ProductCard} from "@/components/cards/ProductCard";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {products as defaultProducts} from "@/content/products";
import type {ProductItem} from "@/content/products";

type ProductMatrixSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  products?: ProductItem[];
};

export function ProductMatrixSection({
  eyebrow,
  title = "",
  description = "",
  className = "page-section",
  products = defaultProducts,
}: ProductMatrixSectionProps) {
  return (
    <section className={className}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
