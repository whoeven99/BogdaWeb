import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {PageContainer} from "@/components/ui/PageContainer";
import {pricingPageMediaBriefs} from "@/content/media-briefs";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Pricing",
  description: "Ciwi Pricing，帮助 Shopify 商家快速理解不同产品线的购买方式。",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero">
          <SectionHeading
            eyebrow="Pricing"
            title="按产品线理解购买方式"
            description="不同产品解决不同问题，购买方式也应保持清晰。"
            as="h1"
          />
          <div className="card-grid">
            <article className="surface-card">
              <h3>Translator</h3>
              <p className="quote">围绕多语言翻译、本地化和 glossary 管理设计价格表达。</p>
            </article>
            <article className="surface-card">
              <h3>Bundle Discount</h3>
              <p className="quote">围绕 AOV 与促销场景设计更贴近商家收益的定价说明。</p>
            </article>
            <article className="surface-card">
              <h3>Content AI</h3>
              <p className="quote">围绕内容生成、FAQ 与 SEO 页面扩展能力设计价格说明。</p>
            </article>
          </div>
        </section>
        <MediaPlaceholderSection
          eyebrow="Pricing media"
          title="价格说明图预留"
          description="价格页适合补一张计费逻辑图，帮助用户先理解收费方式。"
          items={pricingPageMediaBriefs}
        />
        <FinalCtaSection
          title="先理解产品，再决定购买"
          description="如果你还在比较路径，先看产品页、Demo 和帮助文档会更有效。"
        />
      </PageContainer>
    </main>
  );
}
