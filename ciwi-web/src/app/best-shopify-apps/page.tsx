import {ArticleCard} from "@/components/cards/ArticleCard";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getBestShopifyAppCollections} from "@/content/best-shopify-apps";
import {getRequestLocale} from "@/lib/i18n-server";
import {localizeHref} from "@/lib/i18n";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema} from "@/lib/seo/schema";

export async function generateMetadata() {
  const locale = await getRequestLocale();

  return buildPageMetadata({
    title: locale === "zh-cn" ? "Best Shopify Apps 合集" : "Best Shopify Apps",
    description:
      locale === "zh-cn"
        ? "按年份和类目组织的 Shopify App 合集入口，方便后续批量扩展推荐页。"
        : "A reusable hub for year-based and category-based Shopify app roundups.",
    path: "/best-shopify-apps",
    locale,
  });
}

export default async function BestShopifyAppsHubPage() {
  const locale = await getRequestLocale();
  const collections = getBestShopifyAppCollections(locale);
  const copy =
    locale === "zh-cn"
      ? {
          structuredData: {
            name: "Best Shopify Apps 合集",
            description: "按年份和类目组织的 Shopify App 合集入口。",
            keywords: ["Shopify app 推荐", "Best Shopify Apps", "Shopify 榜单"],
          },
          hero: {
            eyebrow: "Best Shopify Apps",
            title: "Best Shopify Apps",
            description: "这里作为所有榜单子集合的聚合页，只展示每个合集的卡片入口。",
          },
        }
      : {
          structuredData: {
            name: "Best Shopify Apps",
            description: "A reusable hub for year-based and category-based Shopify app collections.",
            keywords: ["best shopify apps", "shopify app roundups", "shopify tools"],
          },
          hero: {
            eyebrow: "Best Shopify Apps",
            title: "Best Shopify Apps",
            description: "This hub is the collection index for all roundup pages and only shows card entries for each sub-collection.",
          },
        };

  const pageUrl = new URL(localizeHref(locale, "/best-shopify-apps"), siteUrl).toString();
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: copy.structuredData.name, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: copy.structuredData.name,
      description: copy.structuredData.description,
      keywords: [...copy.structuredData.keywords],
      type: "CollectionPage",
    }),
  ];

  return (
    <main className="best-apps-hub-page">
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`best-apps-hub-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}

        <section className="page-section page-hero">
          <SectionHeading
            eyebrow={copy.hero.eyebrow}
            title={copy.hero.title}
            description={copy.hero.description}
            as="h1"
          />
          <div className="resource-grid">
            {collections.map((item) => (
              <ArticleCard
                key={item.slug}
                title={item.title}
                description={item.description}
                href={item.href}
                meta={[item.categoryLabel, item.year.toString(), item.updatedLabel]}
              />
            ))}
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
