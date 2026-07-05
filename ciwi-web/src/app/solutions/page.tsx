import {ArticleCard} from "@/components/cards/ArticleCard";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {solutionsIndexMediaBriefs} from "@/content/media-briefs";
import {solutions} from "@/content/solutions";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema} from "@/lib/seo/schema";

export const metadata = buildPageMetadata({
  title: "Solutions",
  description: "Ciwi 解决方案页，围绕跨境转化、多语言运营和 AOV 提升等 Shopify 增长场景展开。",
  path: "/solutions",
});

export default function SolutionsPage() {
  const pageUrl = new URL("/solutions", siteUrl).toString();
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: "Solutions", item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: "Solutions",
      description: "Ciwi 解决方案页，围绕跨境转化、多语言运营和 AOV 提升等 Shopify 增长场景展开。",
      keywords: ["Shopify solutions", "conversion", "localization", "AOV"],
      type: "CollectionPage",
    }),
  ];

  return (
    <main>
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`solutions-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}
        <section className="page-section page-hero">
          <SectionHeading
            eyebrow="Solutions"
            title="从业务问题出发，帮助商家更快判断哪条路径适合自己"
            description="这些页面不是重复介绍产品，而是把转化、多语言扩张和 AOV 提升这些问题拆开讲清楚。"
            as="h1"
          />
          <div className="resource-grid">
            {solutions.map((solution) => (
              <ArticleCard
                key={solution.slug}
                title={solution.name}
                description={solution.description}
                href={`/solutions/${solution.slug}`}
                meta={["Solution", "Shopify"]}
              />
            ))}
          </div>
        </section>
        <MediaPlaceholderSection
          eyebrow="Solutions media"
          title="场景总览视觉预留"
          description="方案列表页更适合用按问题分类的场景图，帮助用户快速判断入口。"
          items={solutionsIndexMediaBriefs}
        />
        <FinalCtaSection
          title="从场景页进入产品、对比页和资源内容"
          description="如果你已经明确自己的问题属于哪一类，可以继续看对应产品、对比页和帮助文档。"
        />
      </PageContainer>
    </main>
  );
}
