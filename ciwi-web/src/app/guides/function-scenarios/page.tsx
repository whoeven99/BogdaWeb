import {BackLink} from "@/components/ui/BackLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {ResourceCollectionSection} from "@/components/sections/ResourceCollectionSection";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getFunctionScenarioGuides} from "@/content/function-scenario-guides";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildGraphSchema, buildWebPageSchema} from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const copy =
    locale === "zh-cn"
      ? {
          title: "Shopify 功能场景指南",
          description: "按 Shopify 功能查找翻译范围与操作流程，覆盖商品、集合、结账、导航和客户沟通等场景。",
        }
      : {
          title: "Shopify Translation Workflows by Feature",
          description:
            "Find Shopify translation workflows by feature, from product and collection pages to checkout, navigation, and customer communications.",
        };

  return buildPageMetadata({
    title: copy.title,
    description: copy.description,
    path: "/guides/function-scenarios",
    locale,
  });
}

export default async function FunctionScenarioGuidesPage() {
  const locale = await getRequestLocale();
  const guides = getFunctionScenarioGuides(locale);
  const copy =
    locale === "zh-cn"
      ? {
          structuredData: {
            name: "Shopify 功能场景指南",
            description: "Shopify 功能场景指南聚合页。",
            keywords: ["Shopify 功能指南", "功能场景指南", "Shopify 翻译", "how-to 指南"],
          },
          backLabel: "返回指南中心",
          hero: {
            eyebrow: "功能场景指南",
            title: "Shopify 功能场景翻译指南",
            description: "找到需要翻译的 Shopify 功能，逐步检查内容范围、操作流程与上线前注意事项。",
          },
          stats: {
            pages: "指南页面",
            scope: "覆盖范围",
            focus: "指南形式",
            scopeValue: "Shopify 功能点 / 执行流程",
            focusValue: "How-to / 操作型",
          },
          list: {
            title: "全部功能场景指南",
            description: "按 Shopify 功能点与执行场景浏览已发布的功能场景指南页面。",
          },
          emptyState: {
            title: "中文版指南正在准备中",
            description: "当前还没有正式发布的中文功能场景指南，所以这里先不展示未翻译的文章入口。",
          },
        }
      : {
          structuredData: {
            name: "Shopify Translation Workflows by Feature",
            description: "Collection page for Shopify translation workflows by feature.",
            keywords: ["shopify function guides", "shopify translation workflows", "how-to guides", "shopify execution guides"],
          },
          backLabel: "Back to guides",
          hero: {
            eyebrow: "Function scenario guides",
            title: "Shopify translation workflows by feature",
            description:
              "Choose the Shopify feature you need to translate, then follow its content checklist, workflow, and pre-launch checks.",
          },
          stats: {
            pages: "Guide pages",
            scope: "Coverage",
            focus: "Guide format",
            scopeValue: "Shopify surfaces / Execution",
            focusValue: "How-to / Operational",
          },
          list: {
            title: "All function scenario guides",
            description: "Browse every published function scenario guide by Shopify surface and execution context.",
          },
          emptyState: {
            title: "Guide translations are not published yet",
            description: "There is no published localized version yet, so we don't show untranslated function scenario guide entries here.",
          },
        };

  const pageUrl = toAbsoluteLocalizedUrl(locale, "/guides/function-scenarios");
  const structuredData = buildGraphSchema([
    buildBreadcrumbSchema([
      {name: locale === "zh-cn" ? "首页" : "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "指南" : "Guides", item: toAbsoluteLocalizedUrl(locale, "/guides")},
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
          <div className="mx-auto max-w-5xl">
            <BackLink href="/guides" label={copy.backLabel} />
            <div className="mt-5 sm:mt-6">
              <SectionHeading
                eyebrow={copy.hero.eyebrow}
                title={copy.hero.title}
                description={copy.hero.description}
                as="h1"
              />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {copy.stats.pages}
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">{guides.length}</div>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {copy.stats.scope}
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">{copy.stats.scopeValue}</div>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {copy.stats.focus}
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">{copy.stats.focusValue}</div>
              </div>
            </div>
          </div>
        </section>

        <ResourceCollectionSection
          title={copy.list.title}
          description={copy.list.description}
          items={guides.map((guide) => ({
            title: guide.title,
            description: guide.description,
            href: guide.href,
            meta: [guide.segmentLabel, guide.guideLabel, String(guide.year)],
          }))}
          emptyState={copy.emptyState}
          className="page-section guides-hub-page__section"
        />
      </PageContainer>
    </main>
  );
}
