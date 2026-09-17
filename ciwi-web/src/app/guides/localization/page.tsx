import {BackLink} from "@/components/ui/BackLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {ResourceCollectionSection} from "@/components/sections/ResourceCollectionSection";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getLocalizationGuides} from "@/content/localization-guides";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildGraphSchema, buildWebPageSchema} from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const copy =
    locale === "zh-cn"
      ? {
          title: "Shopify 本地化指南",
          description: "集中浏览行业、品牌与 B2B 本地化指南，承接类目型搜索需求并覆盖多市场语言策略。",
        }
      : {
          title: "Shopify Localization Guides",
          description:
            "Browse industry, brand, and B2B localization guides built for category-led search demand and international growth planning.",
        };

  return buildPageMetadata({
    title: copy.title,
    description: copy.description,
    path: "/guides/localization",
    locale,
  });
}

export default async function LocalizationGuidesPage() {
  const locale = await getRequestLocale();
  const guides = getLocalizationGuides(locale);
  const copy =
    locale === "zh-cn"
      ? {
          structuredData: {
            name: "Shopify 本地化指南",
            description: "行业、品牌与 B2B 本地化指南聚合页。",
            keywords: ["Shopify 本地化", "本地化指南", "B2B 本地化", "品牌本地化"],
          },
          backLabel: "返回指南中心",
          hero: {
            eyebrow: "本地化指南",
            title: "行业、品牌与 B2B 本地化指南",
            description: "集中浏览更适合承接类目型搜索需求的本地化指南，覆盖市场差异、语言策略、内容范围与常见错误。",
          },
          stats: {
            pages: "指南页面",
            scope: "覆盖范围",
            focus: "搜索意图",
            scopeValue: "行业 / 品牌 / B2B",
            focusValue: "类目型 / 策略型",
          },
          list: {
            title: "全部本地化指南",
            description: "按行业和业务场景浏览已发布的本地化指南页面。",
          },
          emptyState: {
            title: "中文版指南正在准备中",
            description: "当前还没有正式发布的中文本地化指南，所以这里先不展示未翻译的文章入口。",
          },
        }
      : {
          structuredData: {
            name: "Shopify Localization Guides",
            description: "Collection page for industry, brand, and B2B localization guides.",
            keywords: ["shopify localization guides", "b2b localization", "brand localization", "industry localization"],
          },
          backLabel: "Back to guides",
          hero: {
            eyebrow: "Localization guides",
            title: "Industry, brand, and B2B localization guides",
            description:
              "Browse the guide collection built for category-led localization search demand, market planning, and multilingual content strategy.",
          },
          stats: {
            pages: "Guide pages",
            scope: "Coverage",
            focus: "Search intent",
            scopeValue: "Industry / Brand / B2B",
            focusValue: "Category-led / Strategic",
          },
          list: {
            title: "All localization guides",
            description: "Browse every published localization guide by industry and business context.",
          },
          emptyState: {
            title: "Guide translations are not published yet",
            description: "There is no published localized version yet, so we don't show untranslated localization guide entries here.",
          },
        };

  const pageUrl = toAbsoluteLocalizedUrl(locale, "/guides/localization");
  const structuredData = buildGraphSchema([
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
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
