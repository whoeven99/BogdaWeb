import {getPublishedProblems} from "@/lib/merchant-intelligence/content";
import {contentTypeLabels, targetUrl} from "@/lib/merchant-intelligence/core.mjs";
import {CardCtaLink} from "@/components/ui/CardCtaLink";
import {ContentIndexHero} from "@/components/sections/ContentIndexHero";
import {ResourceCollectionSection} from "@/components/sections/ResourceCollectionSection";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {getFunctionScenarioGuides} from "@/content/function-scenario-guides";
import {getLocalizationGuides} from "@/content/localization-guides";
import {getRequestLocale} from "@/lib/i18n-server";
import {localizeHref} from "@/lib/i18n";
import {buildPageMetadata, siteUrl, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema, buildGraphSchema} from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

function buildGuidesHubNarrative({
  locale,
  localizationCount,
  scenarioCount,
  merchantGuideCount,
}: {
  locale: "en" | "zh-cn";
  localizationCount: number;
  scenarioCount: number;
  merchantGuideCount: number;
}) {
  if (locale === "zh-cn") {
    return [
      `指南中心当前汇总了 ${localizationCount} 篇本地化指南和 ${scenarioCount} 篇功能场景指南。`,
      merchantGuideCount > 0 ? `另外还有 ${merchantGuideCount} 篇任务型工作流内容。` : "这里更适合先按内容类型判断入口。",
      "如果你在做市场扩张、品牌本地化或 B2B 多语言策略，可以先看本地化专题。",
      "如果你正在解决某个 Shopify 功能点的翻译与执行问题，更适合直接进入功能场景专题。",
    ];
  }

  return [
    `The guides hub currently brings together ${localizationCount} localization guides and ${scenarioCount} function scenario guides.`,
    merchantGuideCount > 0 ? `It also includes ${merchantGuideCount} task-style workflow entries.` : "It works best as a routing page before you open a specific article.",
    "Use the localization collection when the job is market expansion, brand localization, or B2B multilingual planning.",
    "Use the function scenario collection when the problem is tied to a specific Shopify surface, translation task, or execution workflow.",
  ];
}

export async function generateMetadata() {
  const locale = await getRequestLocale();

  return buildPageMetadata({
    title: locale === "zh-cn" ? "Shopify 实操与自动化指南" : "Shopify How-to & Automation Guides",
    description:
      locale === "zh-cn"
        ? "学习如何完成 Shopify 店铺任务、规划自动化工作流，以及开展本地化与翻译。"
        : "Practical Shopify how-to guides, automation workflows, and localization advice to help you complete store tasks.",
    path: "/guides",
    locale,
  });
}

export default async function GuidesHubPage() {
  const locale = await getRequestLocale();
  const localizationGuides = getLocalizationGuides(locale);
  const functionScenarioGuides = getFunctionScenarioGuides(locale);
  const merchantGuides = locale === "en" ? getPublishedProblems() : [];
  const narrative = buildGuidesHubNarrative({
    locale,
    localizationCount: localizationGuides.length,
    scenarioCount: functionScenarioGuides.length,
    merchantGuideCount: merchantGuides.length,
  });
  const copy =
    locale === "zh-cn"
      ? {
          structuredData: {
            name: "Shopify 实操与自动化指南",
            description: "Shopify 店铺任务、自动化工作流、本地化与翻译实操指南。",
            keywords: ["Shopify 操作指南", "自动化工作流", "本地化指南", "翻译指南"],
          },
          hero: {
            eyebrow: "指南",
            title: "Shopify 实操与自动化指南",
            description: "从明确目标到完成任务，查找 Shopify 操作方法、自动化工作流，以及本地化与翻译指南。",
          },
          structureGuide: {
            localization: {
              label: "专题聚合页",
              title: "本地化指南页",
              description: "聚焦行业、品牌与 B2B 本地化内容。",
              cta: "进入本地化专题页",
            },
            scenarios: {
              label: "专题聚合页",
              title: "功能场景指南页",
              description: "聚焦 Shopify 功能点与执行流程内容。",
              cta: "进入功能场景专题页",
            },
          },
          sections: {
            localization: {
              eyebrow: "本地化指南",
              title: "行业、品牌与 B2B 本地化指南",
              description: "适合承接行业类搜索需求，重点讲类目特点、市场习惯、常见错误和本地化策略。",
              cta: "进入本地化专题页",
            },
            scenarios: {
              eyebrow: "功能场景指南",
              title: "Shopify 功能场景翻译指南",
              description: "适合承接操作类搜索需求，重点讲某个 Shopify 功能点该翻哪些内容、怎么做、容易错在哪里。",
              viewStructureMap: "先看 Shopify 翻译总览",
              cta: "进入功能场景专题页",
            },
          },
          emptyState: {
            title: "中文版指南正在准备中",
            description: "当前正文还没有正式中文版本，所以这里先不展示未翻译的文章入口。",
          },
        }
      : {
          structuredData: {
            name: "Shopify How-to & Automation Guides",
            description: "Step-by-step Shopify task guides, automation workflows, and localization advice for merchants.",
            keywords: ["shopify how-to guides", "shopify automation workflows", "localization guide", "translation guide"],
          },
          hero: {
            eyebrow: "Guides",
            title: "Shopify How-to & Automation Guides",
            description: "Find the steps to complete your Shopify tasks, plan repeatable workflows, and grow across languages and markets.",
          },
          structureGuide: {
            localization: {
              label: "Collection page",
              title: "Localization guides",
              description: "Focused on industry, brand, and B2B localization content.",
              cta: "Open localization collection",
            },
            scenarios: {
              label: "Collection page",
              title: "Function scenario guides",
              description: "Focused on Shopify surfaces and execution workflows.",
              cta: "Open function scenario collection",
            },
          },
          sections: {
            localization: {
              eyebrow: "Localization Guides",
              title: "Industry, Brand, and B2B localization guides",
              description: "Built for category-led search demand and broader localization education across markets, content types, and buying contexts.",
              cta: "Open localization collection",
            },
            scenarios: {
              eyebrow: "Function Scenario Guides",
              title: "Shopify function scenario guides",
              description: "Built for how-to search intent around specific Shopify surfaces, translation tasks, and rollout workflows.",
              viewStructureMap: "See the Shopify translation overview",
              cta: "Open function scenario collection",
            },
          },
          emptyState: {
            title: "Guide translations are not published yet",
            description: "The guide articles don't have a published localized version yet, so we don't show untranslated article entries here.",
          },
        };

  const pageUrl = toAbsoluteLocalizedUrl(locale, "/guides");
  const structuredData = buildGraphSchema([
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
  ]);

  return (
    <main className="guides-hub-page">
      <PageContainer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />

        <section className="page-section page-hero guides-hub-page__hero">
          <ContentIndexHero eyebrow={copy.hero.eyebrow} title={copy.hero.title} description={copy.hero.description}>
            {merchantGuides.length > 0 && <p className="mt-4 text-sm text-slate-600">{merchantGuides.length} task guides and workflows</p>}
              {merchantGuides.length > 0 ? (
                <nav className="guide-hub-jumpnav" aria-label={locale === "zh-cn" ? "快速跳转" : "Quick jump"}>
                  <a href="#task-guides" className="guide-chip">Jump to task guides</a>
                </nav>
              ) : null}
          </ContentIndexHero>
          <div className="mx-auto mt-6 max-w-4xl rounded-[24px] border border-slate-200/80 bg-white/90 p-5 sm:p-6">
            <div className="space-y-4 text-[15px] leading-7 text-slate-600 sm:text-base">
              {narrative.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-8 sm:pb-10 lg:pb-10">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-[24px] border border-slate-200/70 bg-slate-50/70 p-5 sm:p-6">
              <div className="grid gap-3 lg:grid-cols-2">
                <div className="rounded-[20px] border border-slate-200/70 bg-white/80 p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {copy.structureGuide.localization.label}
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-slate-950">
                    {copy.structureGuide.localization.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {copy.structureGuide.localization.description}
                  </p>
                  <LocalizedLink href="/guides/localization" className="mt-3 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                    {copy.structureGuide.localization.cta}
                  </LocalizedLink>
                </div>

                <div className="rounded-[20px] border border-slate-200/70 bg-white/80 p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {copy.structureGuide.scenarios.label}
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-slate-950">
                    {copy.structureGuide.scenarios.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {copy.structureGuide.scenarios.description}
                  </p>
                  <LocalizedLink href="/guides/function-scenarios" className="mt-3 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                    {copy.structureGuide.scenarios.cta}
                  </LocalizedLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {merchantGuides.length > 0 && <div id="task-guides">
          <ResourceCollectionSection
            eyebrow="Tasks & workflows"
            title="Complete your Shopify tasks"
            description="Find a direct answer, follow the steps, and use Spark for tasks it can plan and execute."
            items={merchantGuides.map(problem => ({title: problem.page?.title ?? problem.canonicalProblem, description: problem.page?.description ?? problem.merchantGoal, href: targetUrl(problem), meta: [contentTypeLabels[problem.contentType], problem.topic.replaceAll("-", " ")]}))}
            className="page-section"
          />
        </div>}

        <ResourceCollectionSection
          id="localization-guides"
          eyebrow={copy.sections.localization.eyebrow}
          title={copy.sections.localization.title}
          description={copy.sections.localization.description}
          items={localizationGuides.map((guide) => ({
            title: guide.title,
            description: guide.description,
            href: guide.href,
            meta: [guide.segmentLabel, guide.guideLabel, String(guide.year)],
          }))}
          ctaLabel={copy.sections.localization.cta}
          ctaHref={localizeHref(locale, "/guides/localization")}
          emptyState={copy.emptyState}
          className="page-section guides-hub-page__section"
        />

        <ResourceCollectionSection
          id="function-scenario-guides"
          eyebrow={copy.sections.scenarios.eyebrow}
          title={copy.sections.scenarios.title}
          description={copy.sections.scenarios.description}
          headingAction={
            <CardCtaLink href="/guides/shopify-translation" variant="text">
              {copy.sections.scenarios.viewStructureMap}
            </CardCtaLink>
          }
          items={functionScenarioGuides.map((guide) => ({
            title: guide.title,
            description: guide.description,
            href: guide.href,
            meta: [guide.segmentLabel, guide.guideLabel, String(guide.year)],
          }))}
          ctaLabel={copy.sections.scenarios.cta}
          ctaHref={localizeHref(locale, "/guides/function-scenarios")}
          emptyState={copy.emptyState}
          className="page-section guides-hub-page__section"
        />
      </PageContainer>
    </main>
  );
}
