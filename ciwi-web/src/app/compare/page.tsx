import {ArticleCard} from "@/components/cards/ArticleCard";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {compareIndexMediaBriefs} from "@/content/media-briefs";
import {compares} from "@/content/compare";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema} from "@/lib/seo/schema";

export const metadata = buildPageMetadata({
  title: "Compare",
  description: "Ciwi Compare 页面入口，帮助 Shopify 商家比较不同翻译和本地化路径。",
  path: "/compare",
});

export default function ComparePage() {
  const pageUrl = new URL("/compare", siteUrl).toString();
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: "Compare", item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: "Compare",
      description: "Ciwi Compare 页面入口，帮助 Shopify 商家比较不同翻译和本地化路径。",
      keywords: ["Shopify compare", "translator comparison", "Ciwi"],
      type: "CollectionPage",
    }),
  ];

  return (
    <main>
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`compare-list-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}
        <section className="page-section page-hero">
          <SectionHeading
            eyebrow="Compare"
            title="帮助商家比较不同路径，而不只是对照一张功能表"
            description="这些页面更适合回答“哪种方案更适合我的业务阶段”，而不是只罗列功能差异。"
            as="h1"
          />
          <div className="resource-grid">
            {compares.map((item) => (
              <ArticleCard
                key={item.slug}
                title={item.title}
                description={item.description}
                href={`/compare/${item.slug}`}
                meta={["Compare", "SEO"]}
              />
            ))}
          </div>
        </section>
        <MediaPlaceholderSection
          eyebrow="Compare media"
          title="对比总览视觉预留"
          description="对比列表页适合用一张总览型对照图，先把页面定位讲清楚。"
          items={compareIndexMediaBriefs}
        />
        <FinalCtaSection
          title="从 Compare 继续进入产品页、演示和帮助文档"
          description="如果你已经看到了方向差异，可以继续进入产品页、Demo 或帮助文档确认细节。"
        />
      </PageContainer>
    </main>
  );
}
