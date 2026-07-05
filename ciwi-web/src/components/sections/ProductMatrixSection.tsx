import {ProductCard} from "@/components/cards/ProductCard";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {products} from "@/content/products";

export function ProductMatrixSection() {
  return (
    <section className="page-section">
      <SectionHeading
        eyebrow="Products"
        title="围绕 Shopify 增长问题组织产品，而不是只堆功能"
        description="从翻译、本地化到内容效率和 AOV，每个产品都对应一类更具体的问题。"
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
