import {ArticleCard} from "@/components/cards/ArticleCard";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {featuredHelpCenterDocs, helpCenterDocs} from "@/content/help-center";
import {helpCenterIndexMediaBriefs} from "@/content/media-briefs";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Help Center",
  description: "Ciwi Help Center，帮助商家更快完成安装、翻译配置、本地化设置和术语控制。",
  path: "/help-center",
});

export default function HelpCenterPage() {
  const allDocs = [...helpCenterDocs].sort((left, right) => left.title.localeCompare(right.title));

  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero">
          <SectionHeading
            eyebrow="Help Center"
            title="安装、配置和日常使用，都从这里开始"
            description="覆盖翻译流程、glossary、模型选择、多币种和日常使用问题。"
            as="h1"
          />
          <div className="detail-grid">
            <article className="surface-card">
              <h3>从这里开始</h3>
              <p className="quote">
                目前已整理出 <strong>{helpCenterDocs.length}</strong> 篇帮助文档，优先覆盖安装配置、翻译流程、术语控制和多市场运营等高频问题。
              </p>
            </article>
            <article className="surface-card">
              <h3>适合谁看</h3>
              <p className="quote">
                适合准备开始配置的商家，也适合已经在使用产品、想更快解决具体问题的运营团队。
              </p>
            </article>
          </div>
        </section>

        <MediaPlaceholderSection
          eyebrow="Help media"
          title="帮助中心首页视觉预留"
          description="帮助中心更适合用带标注的产品截图或支持中心风格图，让操作入口更直观。"
          items={helpCenterIndexMediaBriefs}
        />

        <section className="page-section">
          <SectionHeading
            eyebrow="Featured docs"
            title="先看这些"
            description="如果你刚开始评估或准备配置，这一组最值得先读。"
          />
          <div className="resource-grid">
            {featuredHelpCenterDocs.map((item) => (
              <ArticleCard
                key={`${item.title}-${item.href}`}
                title={item.title}
                description={item.description}
                href={item.href}
                meta={item.meta}
              />
            ))}
          </div>
        </section>

        <section className="page-section">
          <SectionHeading
            eyebrow="All docs"
            title="全部文档"
            description="如果问题不在精选文档里，就从完整索引继续找。"
          />
          <div className="detail-grid">
            <article className="surface-card">
              <h3>Featured docs</h3>
              <p className="quote">
                精选了 <strong>{featuredHelpCenterDocs.length}</strong> 篇文档，优先覆盖产品定位、翻译流程、glossary、模型和多币种等高频问题。
              </p>
            </article>
            <article className="surface-card">
              <h3>All docs</h3>
              <p className="quote">
                站内已纳入 <strong>{helpCenterDocs.length}</strong> 篇帮助文档，方便你按主题继续深入了解具体配置和使用细节。
              </p>
            </article>
          </div>
          <div className="resource-grid space-top-xl">
            {allDocs.map((item) => (
              <ArticleCard
                key={`${item.title}-${item.href}`}
                title={item.title}
                description={item.description}
                href={item.href}
                meta={item.meta}
              />
            ))}
          </div>
        </section>
        <FinalCtaSection
          title="先解决最常见的问题，再进入产品和演示"
          description="如果你已经把安装和配置思路理顺了，可以继续进入产品页、对比页或 Demo。"
          primaryLabel="Read Getting Started"
          primaryHref="/help-center/ShopifyApp/about-ciwi-ai-translator-shopify-app/"
          secondaryLabel="View Demo"
          secondaryHref="/demo"
        />
      </PageContainer>
    </main>
  );
}
