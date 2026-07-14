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
  description: "Ciwi 解决方案页，帮助 Shopify 商家按跨境转化、多语言运营和 AOV 目标找到更合适的路径。",
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
      description: "Ciwi 解决方案页，帮助 Shopify 商家按跨境转化、多语言运营和 AOV 目标找到更合适的路径。",
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
            title="按问题找路径，按结果选方案"
            description="无论你更关心跨市场转化、多语言运营还是客单价提升，都可以先从对应场景进入。"
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
          title="从场景页继续进入产品、对比页和资源内容"
          description="如果你已经判断清楚当前重点，可以继续看对应产品、对比页和帮助文档。"
        />
      </PageContainer>
    </main>
  );
}
