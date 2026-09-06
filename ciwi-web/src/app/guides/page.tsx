import {ArticleCard} from "@/components/cards/ArticleCard";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getFunctionScenarioGuideTopics, getFunctionScenarioGuides} from "@/content/function-scenario-guides";
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
  const localizationGuides = getLocalizationGuides(locale);
  const functionScenarioGuides = getFunctionScenarioGuides(locale);
  const localizationSegments = [...new Set(localizationGuides.map((guide) => guide.segmentLabel))];
  const functionScenarioTopics = getFunctionScenarioGuideTopics(locale);
  const copy =
    locale === "zh-cn"
      ? {
          structuredData: {
            name: "本地化指南",
            description: "面向行业、品牌与 B2B 场景的本地化与翻译指南集合页。",
            keywords: ["本地化指南", "翻译指南", "SEO 页面模板", "全球化增长", "Shopify 功能场景"],
          },
          hero: {
            eyebrow: "Guides",
            title: "Localization & Translation Guides",
            description: "这里集中承载行业 guide 和 Shopify 功能场景 guide，既能承接资源入口，也能继续批量扩展 SEO 页面。",
          },
          summaryCards: {
            localization: "行业 / 品牌 / B2B",
            scenarios: "Shopify 功能场景",
            pagesLabel: "页面数",
          },
          quickJump: {
            localization: "跳转到本地化指南",
            scenarios: "跳转到功能场景指南",
          },
          sections: {
            localization: {
              eyebrow: "Localization Guides",
              title: "行业、品牌与 B2B 本地化指南",
              description: "适合承接行业类搜索需求，重点讲类目特点、市场习惯、常见错误和本地化策略。",
              coverageLabel: "覆盖类目",
              pagesLabel: "页面数",
            },
            scenarios: {
              eyebrow: "Function Scenario Guides",
              title: "Shopify 功能场景翻译指南",
              description: "适合承接 how-to 搜索需求，重点讲某个 Shopify 功能点该翻哪些内容、怎么做、容易错在哪里。",
              coverageLabel: "覆盖主题",
              pagesLabel: "页面数",
            },
          },
          emptyState: {
            title: "中文版指南正在准备中",
            description: "当前 guide 正文还没有正式中文版本，所以这里先不展示未翻译文章入口。",
          },
        }
      : {
          structuredData: {
            name: "Localization Guides",
            description: "A reusable collection of localization and translation guide pages for industries, brand segments, B2B categories, and Shopify function scenarios.",
            keywords: ["localization guide", "translation guide", "seo landing pages", "global ecommerce growth", "shopify how-to guides"],
          },
          hero: {
            eyebrow: "Guides",
            title: "Localization & Translation Guides",
            description: "A scalable collection of industry-specific SEO pages and Shopify function-scenario guides for multilingual growth.",
          },
          summaryCards: {
            localization: "Industry / Brand / B2B",
            scenarios: "Shopify Function Scenarios",
            pagesLabel: "Pages",
          },
          quickJump: {
            localization: "Jump to localization guides",
            scenarios: "Jump to function scenario guides",
          },
          sections: {
            localization: {
              eyebrow: "Localization Guides",
              title: "Industry, Brand, and B2B localization guides",
              description: "Built for category-led search demand and broader localization education across markets, content types, and buying contexts.",
              coverageLabel: "Coverage",
              pagesLabel: "Pages",
            },
            scenarios: {
              eyebrow: "Function Scenario Guides",
              title: "Shopify function scenario guides",
              description: "Built for how-to search intent around specific Shopify surfaces, translation tasks, and rollout workflows.",
              coverageLabel: "Topics",
              pagesLabel: "Pages",
            },
          },
          emptyState: {
            title: "Guide translations are not published yet",
            description: "The guide articles don't have a published localized version yet, so we don't show untranslated article entries here.",
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
          <div className="guide-meta-grid">
            <div className="surface-card guide-meta-card">
              <span>{copy.summaryCards.localization}</span>
              <strong>
                {localizationGuides.length} {copy.summaryCards.pagesLabel}
              </strong>
            </div>
            <div className="surface-card guide-meta-card">
              <span>{copy.summaryCards.scenarios}</span>
              <strong>
                {functionScenarioGuides.length} {copy.summaryCards.pagesLabel}
              </strong>
            </div>
          </div>
          <nav className="guide-hub-jumpnav" aria-label={locale === "zh-cn" ? "快速跳转" : "Quick jump"}>
            <a href="#localization-guides" className="guide-chip">
              {copy.quickJump.localization}
            </a>
            <a href="#function-scenario-guides" className="guide-chip">
              {copy.quickJump.scenarios}
            </a>
          </nav>
        </section>

        <section id="localization-guides" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.localization.eyebrow}
            title={copy.sections.localization.title}
            description={copy.sections.localization.description}
          />
          <div className="guide-hub-section__meta">
            <div className="guide-chip-row">
              <span className="guide-chip">
                {copy.sections.localization.pagesLabel}: {localizationGuides.length}
              </span>
              {localizationSegments.map((segment) => (
                <span key={segment} className="guide-chip">
                  {segment}
                </span>
              ))}
            </div>
          </div>
          <div className="resource-grid">
            {localizationGuides.length > 0 ? (
              localizationGuides.map((guide) => (
                <ArticleCard
                  key={guide.slug}
                  title={guide.title}
                  description={guide.description}
                  href={guide.href}
                  meta={[guide.segmentLabel, guide.guideLabel, String(guide.year)]}
                />
              ))
            ) : (
              <div className="surface-card">
                <h3>{copy.emptyState.title}</h3>
                <p className="quote">{copy.emptyState.description}</p>
              </div>
            )}
          </div>
        </section>

        <section id="function-scenario-guides" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.scenarios.eyebrow}
            title={copy.sections.scenarios.title}
            description={copy.sections.scenarios.description}
          />
          <div className="guide-hub-section__meta">
            <div className="guide-chip-row">
              <span className="guide-chip">
                {copy.sections.scenarios.pagesLabel}: {functionScenarioGuides.length}
              </span>
              {functionScenarioTopics.map((topic) => (
                <span key={topic} className="guide-chip">
                  {topic}
                </span>
              ))}
            </div>
          </div>
          <div className="resource-grid">
            {functionScenarioGuides.length > 0 ? (
              functionScenarioGuides.map((guide) => (
                <ArticleCard
                  key={guide.slug}
                  title={guide.title}
                  description={guide.description}
                  href={guide.href}
                  meta={[guide.segmentLabel, guide.guideLabel, String(guide.year)]}
                />
              ))
            ) : (
              <div className="surface-card">
                <h3>{copy.emptyState.title}</h3>
                <p className="quote">{copy.emptyState.description}</p>
              </div>
            )}
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
