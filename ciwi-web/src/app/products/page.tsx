import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {ProductMatrixSection} from "@/components/sections/ProductMatrixSection";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {PageContainer} from "@/components/ui/PageContainer";
import {productsIndexMediaBriefs} from "@/content/media-briefs";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Products",
  description: "Ciwi 产品矩阵，围绕翻译、本地化、内容效率和 AOV 等 Shopify 增长问题组织。",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero">
          <SectionHeading
            eyebrow="Products"
            title="围绕商家的真实增长问题组织产品，而不是只列一组功能"
            description="每个产品都对应一类更具体的业务问题，例如多语言转化、内容效率或 AOV 提升。"
            as="h1"
          />
        </section>
        <MediaPlaceholderSection
          eyebrow="Products media"
          title="产品总览视觉预留"
          description="产品列表页适合用产品矩阵图，而不是单一产品图。"
          items={productsIndexMediaBriefs}
        />
        <ProductMatrixSection />
        <FinalCtaSection
          title="先看产品，再进入 Demo、对比页和帮助文档"
          description="如果你已经知道自己更关心哪类问题，可以继续进入对应产品页，查看演示、文档和选型内容。"
        />
      </PageContainer>
    </main>
  );
}
