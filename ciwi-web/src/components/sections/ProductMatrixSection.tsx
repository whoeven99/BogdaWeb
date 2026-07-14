import {ProductCard} from "@/components/cards/ProductCard";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {products} from "@/content/products";

export function ProductMatrixSection() {
  return (
    <section className="page-section">
      <SectionHeading
        eyebrow="Products"
        title="按商家的增长目标来选产品"
        description="无论你更关心多语言转化、内容效率还是 AOV，这里都能直接找到对应入口。"
      />
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
