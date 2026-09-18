import {ContentIndexHero} from "@/components/sections/ContentIndexHero";
import {ResourceCollectionSection} from "@/components/sections/ResourceCollectionSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {getBestShopifyAppCollections} from "@/content/best-shopify-apps";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema, buildGraphSchema} from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

function buildBestAppsHubNarrative({
  locale,
  collections,
}: {
  locale: "en" | "zh-cn";
  collections: Array<{title: string; categoryLabel: string; year: number}>;
}) {
  const sampledTitles = collections.slice(0, 3).map((item) => item.title);
  const sampledCategories = [...new Set(collections.slice(0, 6).map((item) => item.categoryLabel))];

  if (locale === "zh-cn") {
    return [
      `这个入口页把不同年份、不同类目的 Shopify App 榜单集中在一起，适合先判断“应该看哪类工具”，再进入具体榜单逐个比较。`,
      sampledTitles.length > 0
        ? `当前已经覆盖 ${sampledCategories.join("、")} 等类目，包含 ${sampledTitles.join("、")} 等榜单。每个榜单页都会继续拆解推荐理由、适合对象、价格信息和注意点。`
        : "每个榜单页都会继续拆解推荐理由、适合对象、价格信息和注意点。",
    ];
  }

  return [
    "This hub groups Shopify app roundups by year and category so visitors can decide which tool family to inspect before opening a specific ranking page.",
    sampledTitles.length > 0
      ? `It already covers categories such as ${sampledCategories.join(", ")} through collections like ${sampledTitles.join(", ")}. Each roundup then breaks the shortlist into fit, pricing, strengths, and watchouts.`
      : "Each roundup page then breaks the shortlist into fit, pricing, strengths, and watchouts.",
  ];
}

export async function generateMetadata() {
  const locale = await getRequestLocale();

  return buildPageMetadata({
    title: locale === "zh-cn" ? "最佳 Shopify 应用合集" : "Best Shopify Apps",
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
  const narrative = buildBestAppsHubNarrative({locale, collections});
  const copy =
    locale === "zh-cn"
      ? {
          structuredData: {
            name: "最佳 Shopify 应用合集",
            description: "按年份和类目组织的 Shopify App 合集入口。",
            keywords: ["Shopify app 推荐", "Best Shopify Apps", "Shopify 榜单"],
          },
          hero: {
            eyebrow: "最佳 Shopify 应用",
            title: "最佳 Shopify 应用合集",
            description: "这里集中整理各类榜单合集入口，方便按主题继续浏览具体合集。",
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

  const pageUrl = toAbsoluteLocalizedUrl(locale, "/best-shopify-apps");
  const structuredData = buildGraphSchema([
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
  ]);

  return (
    <main className="best-apps-hub-page">
      <PageContainer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />

        <section className="page-section page-hero">
          <ContentIndexHero eyebrow={copy.hero.eyebrow} title={copy.hero.title} description={copy.hero.description} />
          <div className="mx-auto mt-6 max-w-4xl rounded-[24px] border border-slate-200/80 bg-white/90 p-5 sm:p-6">
            <div className="space-y-4 text-[15px] leading-7 text-slate-600 sm:text-base">
              {narrative.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <ResourceCollectionSection
            items={collections.map((item) => ({
              title: item.title,
              description: item.description,
              href: item.href,
              meta: [item.categoryLabel, item.year.toString(), item.updatedLabel],
            }))}
            className="mt-8 py-0"
          />
        </section>
      </PageContainer>
    </main>
  );
}
