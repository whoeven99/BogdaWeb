import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {ProductMatrixSection} from "@/components/sections/ProductMatrixSection";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {PageContainer} from "@/components/ui/PageContainer";
import {productsIndexMediaBriefs} from "@/content/media-briefs";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Products",
  description: "Ciwi 产品矩阵，帮助 Shopify 商家按多语言转化、内容效率和 AOV 目标快速找到合适产品。",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero">
          <SectionHeading
            eyebrow="Products"
            title="直接按目标选产品"
            description="想提升多语言转化、加快内容生产，或把客单价做上去，都可以从这里直接进入对应产品。"
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
          title="先确定目标，再继续看 Demo、对比页和帮助文档"
          description="如果你已经知道当前最想解决的问题，可以继续进入对应产品页，把安装、选型和文档一起看清楚。"
        />
      </PageContainer>
    </main>
  );
}
