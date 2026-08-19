import {ArticleCard} from "@/components/cards/ArticleCard";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getLocalizationGuides} from "@/content/localization-guides";
import {getRequestLocale} from "@/lib/i18n-server";
import {localizeHref} from "@/lib/i18n";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema} from "@/lib/seo/schema";

export async function generateMetadata() {
  const locale = await getRequestLocale();

  return buildPageMetadata({
    title: locale === "zh-cn" ? "本地化指南" : "Localization Guides",
    description:
      locale === "zh-cn"
        ? "面向行业、品牌与 B2B 场景的本地化与翻译指南集合页，可作为批量 SEO 页面模板入口。"
        : "A reusable hub for industry, brand, and B2B localization guides built for SEO-driven global growth.",
    path: "/guides",
    locale,
  });
}

export default async function GuidesHubPage() {
  const locale = await getRequestLocale();
  const guides = getLocalizationGuides(locale);
  const copy =
    locale === "zh-cn"
      ? {
          structuredData: {
            name: "本地化指南",
            description: "面向行业、品牌与 B2B 场景的本地化与翻译指南集合页。",
            keywords: ["本地化指南", "翻译指南", "SEO 页面模板", "全球化增长"],
          },
          hero: {
            eyebrow: "Guides",
            title: "Localization & Translation Guides",
            description: "这里集中承载行业化的 SEO guide 模板页，既能承接资源入口，也能继续批量扩展到更多细分类目。",
          },
        }
      : {
          structuredData: {
            name: "Localization Guides",
            description: "A reusable collection of localization and translation guide pages for industries, brand segments, and B2B categories.",
            keywords: ["localization guide", "translation guide", "seo landing pages", "global ecommerce growth"],
          },
          hero: {
            eyebrow: "Guides",
            title: "Localization & Translation Guides",
            description: "A scalable collection of industry-specific SEO pages for ecommerce, brand, and B2B localization demand.",
          },
        };

  const pageUrl = new URL(localizeHref(locale, "/guides"), siteUrl).toString();
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: copy.structuredData.name, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: copy.structuredData.name,
      description: copy.structuredData.description,
      keywords: copy.structuredData.keywords,
      type: "CollectionPage",
    }),
  ];

  return (
    <main className="guides-hub-page">
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`guides-hub-schema-${index}`}
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
            {guides.map((guide) => (
              <ArticleCard
                key={guide.slug}
                title={guide.title}
                description={guide.description}
                href={guide.href}
                meta={[guide.segmentLabel, guide.guideLabel, String(guide.year)]}
              />
            ))}
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
