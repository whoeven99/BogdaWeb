import {getPublishedProblems} from "@/lib/merchant-intelligence/content";
import {contentTypeLabels, targetUrl} from "@/lib/merchant-intelligence/core.mjs";
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
          summaryCards: {
            localization: "行业 / 品牌 / B2B",
            scenarios: "Shopify 功能场景",
            pagesLabel: "页面数",
          },
          quickJump: {
            localization: "跳转到本地化板块",
            scenarios: "跳转到功能场景板块",
          },
          structureGuide: {
            title: "页面关系说明",
            description: "当前页是总览页，下面两个 section 用来集中展示全部指南；如果你只想浏览某一类内容，再进入对应的专题聚合页。",
            hub: {
              label: "当前页",
              title: "Guides 总览页",
              description: "先看全站指南结构，再从这里进入具体专题。",
            },
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
            pagesLabel: "页面数",
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
              viewStructureMap: "查看完整 Shopify 翻译结构地图",
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
          summaryCards: {
            localization: "Industry / Brand / B2B",
            scenarios: "Shopify Function Scenarios",
            pagesLabel: "Pages",
          },
          quickJump: {
            localization: "Jump to localization section",
            scenarios: "Jump to function scenario section",
          },
          structureGuide: {
            title: "How these pages relate",
            description: "This page is the hub. The two sections below summarize all guides here, and each also has its own dedicated collection page when you want to browse only one topic cluster.",
            hub: {
              label: "Current page",
              title: "Guides hub",
              description: "Start here when you want the full site-wide guide overview.",
            },
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
            pagesLabel: "Pages",
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
              viewStructureMap: "View the full Shopify translation map",
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
            <div className="guide-meta-grid guide-meta-grid--two-up">
              <div className="guide-meta-card guide-meta-card--plain">
                <span>{copy.summaryCards.localization}</span>
                <strong>
                  {localizationGuides.length} {copy.summaryCards.pagesLabel}
                </strong>
              </div>
              <div className="guide-meta-card guide-meta-card--plain">
                <span>{copy.summaryCards.scenarios}</span>
                <strong>
                  {functionScenarioGuides.length} {copy.summaryCards.pagesLabel}
                </strong>
              </div>
            </div>
            {merchantGuides.length > 0 && <p className="mt-4 text-sm text-slate-600">{merchantGuides.length} task guides and workflows</p>}
            <nav className="guide-hub-jumpnav" aria-label={locale === "zh-cn" ? "快速跳转" : "Quick jump"}>
              {merchantGuides.length > 0 && <a href="#task-guides" className="guide-chip">Jump to task guides</a>}
              <a href="#localization-guides" className="guide-chip">
                {copy.quickJump.localization}
              </a>
              <a href="#function-scenario-guides" className="guide-chip">
                {copy.quickJump.scenarios}
              </a>
            </nav>
          </ContentIndexHero>
        </section>

        <section className="page-section pt-0">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-[24px] border border-slate-200/70 bg-slate-50/70 p-5 sm:p-6">
              <div className="max-w-3xl">
                <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-slate-950 sm:text-[22px]">
                  {copy.structureGuide.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-[15px]">
                  {copy.structureGuide.description}
                </p>
              </div>

              <div className="mt-5 grid gap-3 lg:grid-cols-3">
                <div className="rounded-[20px] border border-slate-200/70 bg-white/80 p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {copy.structureGuide.hub.label}
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-slate-950">
                    {copy.structureGuide.hub.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {copy.structureGuide.hub.description}
                  </p>
                </div>

                <div className="rounded-[20px] border border-slate-200/70 bg-white/80 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {copy.structureGuide.localization.label}
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {localizationGuides.length} {copy.structureGuide.pagesLabel}
                    </span>
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
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {copy.structureGuide.scenarios.label}
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {functionScenarioGuides.length} {copy.structureGuide.pagesLabel}
                    </span>
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

        <section className="page-section pt-0">
          <div className="flex justify-start">
            <LocalizedLink
              href="/guides/shopify-translation"
              className="inline-flex text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              {copy.sections.scenarios.viewStructureMap}
            </LocalizedLink>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
