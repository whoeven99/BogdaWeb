import {ProductCard} from "@/components/cards/ProductCard";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {homePageCopy} from "@/content/home-page-copy";
import {products} from "@/content/products";

export function ProductMatrixSection() {
  const copy = homePageCopy.productMatrix;

  return (
    <section className="page-section">
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
          />
        ))}
      </div>
    </section>
  );
}
