import {ArticleCard} from "@/components/cards/ArticleCard";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {blogPosts} from "@/content/blog";
import {blogIndexMediaBriefs} from "@/content/media-briefs";
import {blogResources} from "@/content/resources";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Blog",
  description: "Ciwi Blog，围绕 Shopify 多语言、本地化和增长问题持续输出内容。",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero">
          <SectionHeading
            eyebrow="Blog"
            title="写给在做 Shopify 增长的人"
            description="从本地化到内容效率，这里专注回答真正会影响增长的问题。"
            as="h1"
          />
          <div className="detail-grid">
            <article className="surface-card">
              <h3>内容方向</h3>
              <p className="quote">
                目前已有 <strong>{blogPosts.length}</strong> 篇文章，围绕多语言、本地化和增长方法展开。
              </p>
            </article>
            <article className="surface-card">
              <h3>适合谁看</h3>
              <p className="quote">
                适合正在评估翻译与本地化路径、希望通过内容先理解问题的 Shopify 商家和运营团队。
              </p>
            </article>
          </div>
        </section>

        <MediaPlaceholderSection
          eyebrow="Blog media"
          title="博客首页视觉预留"
          description="博客列表页适合补一张内容品牌图，先建立内容气质，再进入文章列表。"
          items={blogIndexMediaBriefs}
        />

        <section className="page-section">
          <SectionHeading
            eyebrow="Published posts"
            title="最新文章"
            description="先从问题开始，再进入产品和配置。"
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
        <FinalCtaSection
          title="从博客继续进入产品、对比页和帮助文档"
          description="如果你已经对某个问题有兴趣，可以继续进入产品页、Compare 或 Help Center 深入了解。"
          primaryLabel="Read latest post"
          primaryHref="/blog/ciwi-translator-cha-jian-jie-shao"
          secondaryLabel="Browse resources"
          secondaryHref="/resources"
        />
      </PageContainer>
    </main>
  );
}
