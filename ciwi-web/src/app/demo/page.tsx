import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {FaqSection} from "@/components/sections/FaqSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {demoPageMediaBriefs} from "@/content/media-briefs";
import {buildPageMetadata} from "@/lib/seo/metadata";

const demoFaq = [
  {
    question: "官网 Demo 会变成完整后台吗？",
    answer: "不会。官网优先提供无登录、低摩擦、可理解的轻演示，而不是复制完整产品后台。",
  },
  {
    question: "为什么要做 Demo Center？",
    answer: "因为 Demo 比静态宣传更容易让 Shopify 商家快速理解能力边界和业务价值。",
  },
];

export const metadata = buildPageMetadata({
  title: "Demo Center",
  description: "Ciwi Demo Center，帮助 Shopify 商家快速看懂关键产品能力。",
  path: "/demo",
});

export default function DemoPage() {
  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero">
          <SectionHeading
            eyebrow="Demo"
            title="用最短路径看懂产品能力"
            description="这里聚焦最关键的前后对比、术语控制和 bundle 场景。"
            as="h1"
          />
          <div className="card-grid">
            <article className="hero-panel">
              <div className="hero-panel__badge">Translation demo</div>
              <h3>Before / After localization</h3>
              <p className="quote light-copy">
                展示翻译前后文案差异、术语控制效果和 Shopify 场景适配方式。
              </p>
            </article>
            <article className="surface-card">
              <h3>Glossary intervention</h3>
              <p className="quote">展示 glossary 如何影响品牌词、产品词和营销文案的输出。</p>
            </article>
            <article className="surface-card">
              <h3>Bundle growth story</h3>
              <p className="quote">展示套餐折扣前后，购物车表达与客单价机会的变化。</p>
            </article>
          </div>
        </section>
        <MediaPlaceholderSection
          eyebrow="Demo media"
          title="Demo Center 主素材预留"
          description="Demo Center 最适合放总览视频，让访问者在几十秒内先理解能力边界。"
          items={demoPageMediaBriefs}
        />
        <FaqSection items={demoFaq} />
        <FinalCtaSection
          title="先看演示，再决定是否深入"
          description="如果你已经看到适合自己的场景，下一步就进入产品页或联系团队。"
        />
      </PageContainer>
    </main>
  );
}
