import {ArticleCard} from "@/components/cards/ArticleCard";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {resourcesPageMediaBriefs} from "@/content/media-briefs";
import {blogResources, compareResources, helpCenterResources} from "@/content/resources";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Resources",
  description: "统一聚合 Blog、Help Center 和 Compare 内容的 Ciwi 资源中心。",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero">
          <SectionHeading
            eyebrow="Resources"
            title="把博客、帮助文档和对比页放进同一个资源入口"
            description="用户不一定会直接进入产品页。资源内容应该先帮助他们理解问题，再自然回到产品和演示。"
            as="h1"
          />
          <div className="card-grid">
            <article className="surface-card">
              <h3>Blog</h3>
              <p className="quote">适合用来讲产品理解、市场观察和商家真正会搜索的问题。</p>
            </article>
            <article className="surface-card">
              <h3>Help Center</h3>
              <p className="quote">适合承接安装、配置、术语控制和日常使用中的具体问题。</p>
            </article>
            <article className="surface-card">
              <h3>Compare</h3>
              <p className="quote">适合承接高意图选型流量，帮助商家判断哪条路径更适合自己。</p>
            </article>
          </div>
        </section>

        <MediaPlaceholderSection
          eyebrow="Resources media"
          title="资源地图视觉预留"
          description="资源页适合补一张内容地图或流转图，让 Blog、Help Center、Compare 的关系更直观。"
          items={resourcesPageMediaBriefs}
        />

        <section className="page-section">
          <SectionHeading
            eyebrow="Blog resources"
            title="从文章开始，持续回答商家会搜索的问题"
            description="博客适合承接产品故事、实操方法和搜索意图更广的主题内容。"
          />
          <div className="resource-grid">
            {blogResources.map((item) => (
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
            eyebrow="Help center"
            title="把支持文档纳入同一套资源地图"
            description="这样产品页、FAQ 和帮助文档之间就能形成自然回流，而不是停留在孤立跳转。"
          />
          <div className="resource-grid">
            {helpCenterResources.map((item) => (
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
            eyebrow="Compare"
            title="对比页是高意图流量进入产品理解的关键入口"
            description="对比页天然适合承接选型关键词和竞争对比流量，也最适合继续回流到产品页和 Demo。"
          />
          <div className="resource-grid">
            {compareResources.map((item) => (
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
          title="先从资源内容理解问题，再进入产品和演示"
          description="如果你还在比较路径，资源页是最适合开始的入口。"
          primaryLabel="Open blog"
          primaryHref="/blog"
          secondaryLabel="Open help center"
          secondaryHref="/help-center"
        />
      </PageContainer>
    </main>
  );
}
