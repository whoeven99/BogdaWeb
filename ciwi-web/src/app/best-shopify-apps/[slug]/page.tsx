import {notFound} from "next/navigation";

import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {SimpleCardGridSection} from "@/components/sections/SimpleCardGridSection";
import {BackLink} from "@/components/ui/BackLink";
import {Button} from "@/components/ui/Button";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getBestShopifyAppCollectionMap, getBestShopifyAppCollections} from "@/content/best-shopify-apps";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildGraphSchema, buildItemListSchema, buildWebPageSchema} from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

type BestShopifyAppCollectionPageProps = {
  params: Promise<{slug: string}>;
};

export function generateStaticParams() {
  return [...new Set([...getBestShopifyAppCollections("en"), ...getBestShopifyAppCollections("zh-cn")].map((item) => item.slug))].map(
    (slug) => ({slug}),
  );
}

export async function generateMetadata({params}: BestShopifyAppCollectionPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const collection = getBestShopifyAppCollectionMap(locale)[slug];

  if (!collection) {
    return buildPageMetadata({
      title: locale === "zh-cn" ? "页面不存在" : "Page not found",
      description: locale === "zh-cn" ? "你访问的合集页不存在。" : "The requested roundup page could not be found.",
      path: "/best-shopify-apps",
      locale,
    });
  }

  return buildPageMetadata({
    title: collection.title,
    description: collection.description,
    path: collection.href,
    locale,
  });
}

export default async function BestShopifyAppCollectionPage({params}: BestShopifyAppCollectionPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const collection = getBestShopifyAppCollectionMap(locale)[slug];

  if (!collection) {
    notFound();
  }

  const copy =
    locale === "zh-cn"
      ? {
          backLabel: "返回应用合集",
          hero: {
            metaLabels: {
              category: "类目",
              year: "年份",
              updated: "更新时间",
            },
            summaryLabel: "摘要",
            tocLabel: "目录",
          },
          toc: [
            {href: "#why-these-apps", label: "为什么是这些 App"},
            {href: "#ranked-apps", label: "排行榜和 App 说明"},
            {href: "#how-to-compare", label: "如何比较这些 App"},
            {href: "#choose-right-app", label: "如何选适合自己的 App"},
            {href: "#final-verdict", label: "文末总结"},
          ],
          why: {
            eyebrow: "原因",
            title: "为什么这些 App 会进入这份榜单",
            description: "我们先定义筛选标准，再看评分、评价量、安装基础和适配度，尽量让这份榜单更接近商家真实的选型过程。",
          },
          picks: {
            eyebrow: "排行榜",
            title: "排行榜和 App 说明",
            description: "这份顺序更适合作为第一轮筛选参考，重点是帮助你更快缩小候选范围，而不是替代最终决策。",
            bestForLabel: "适合谁",
            pricingLabel: "价格",
            strengthsLabel: "优点",
            watchoutsLabel: "注意点",
            ctaLabel: "查看详情",
          },
          compare: {
            eyebrow: "如何比较",
            title: "如何比较这些 App",
            description: "先看比较维度，再看功能清单。否则信息越多，越容易把真正重要的差异淹没掉。",
          },
          fit: {
            eyebrow: "如何选择",
            title: "如何选择适合自己的 App",
            description: "真正适合你的方案，取决于店铺阶段、运营复杂度，以及你现在最想优先解决的增长问题。",
          },
        }
      : {
          backLabel: "Back to Best Shopify Apps",
          hero: {
            metaLabels: {
              category: "Category",
              year: "Year",
              updated: "Updated",
            },
            summaryLabel: "Summary",
            tocLabel: "Table of contents",
          },
          toc: [
            {href: "#why-these-apps", label: "Why these apps made the list"},
            {href: "#ranked-apps", label: "Rankings and app notes"},
            {href: "#how-to-compare", label: "How to compare these apps"},
            {href: "#choose-right-app", label: "How to choose the right app"},
            {href: "#final-verdict", label: "Final verdict"},
          ],
          why: {
            eyebrow: "Why these apps",
            title: "Why these apps made the list",
            description: "This section defines the shortlist logic first so the ranking and recommendations stay tied to the same evaluation lens.",
          },
          picks: {
            eyebrow: "Ranked apps",
            title: "Rankings and app notes",
            description: "The order below is based on Shopify localization fit, maintenance cost, and workflow depth.",
            bestForLabel: "Best for",
            pricingLabel: "Pricing",
            strengthsLabel: "Strengths",
            watchoutsLabel: "Watchouts",
            ctaLabel: "Open related page",
          },
          compare: {
            eyebrow: "How to compare",
            title: "How to compare these apps",
            description: "Start with the comparison lens before the feature list, otherwise high-volume information tends to blur the real tradeoffs.",
          },
          fit: {
            eyebrow: "How to choose",
            title: "How to choose the right app for your store",
            description: "The right pick depends on your store stage, operating complexity, and how often your content changes later.",
          },
        };

  const pageUrl = toAbsoluteLocalizedUrl(locale, collection.href);
  const structuredData = buildGraphSchema([
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "最佳 Shopify 应用合集" : "Best Shopify Apps", item: toAbsoluteLocalizedUrl(locale, "/best-shopify-apps")},
      {name: collection.title, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: collection.title,
      description: collection.description,
      keywords: [...collection.keywords],
      type: "CollectionPage",
    }),
    buildItemListSchema({
      url: pageUrl,
      name: collection.title,
      description: collection.description,
      items: collection.picks
        .filter((item) => Boolean(item.href))
        .map((item) => ({
          position: item.rank,
          name: item.name,
          url: toAbsoluteLocalizedUrl(locale, item.href!),
          description: item.summary,
        })),
    }),
  ]);

  return (
    <main className="best-apps-page">
      <PageContainer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />

        <section className="py-8 sm:py-10 lg:py-12">
          <div className="mx-auto max-w-5xl">
            <BackLink href="/best-shopify-apps" label={copy.backLabel} />
            <div className="mt-5 sm:mt-6">
              <SectionHeading
                eyebrow={collection.heroEyebrow}
                title={collection.title}
                description={collection.description}
                as="h1"
              />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                {label: copy.hero.metaLabels.category, value: collection.categoryLabel},
                {label: copy.hero.metaLabels.year, value: collection.year},
                {label: copy.hero.metaLabels.updated, value: collection.updatedLabel},
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {item.label}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-900">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[24px] border border-slate-200/80 bg-white/92 p-5 sm:p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                {copy.hero.summaryLabel}
              </div>
              <p className="mt-3 text-[15px] leading-7 text-slate-700 sm:text-base">
                {collection.summary}
              </p>
              <div className="mt-4 space-y-3 text-[15px] leading-7 text-slate-600 sm:text-base">
                {collection.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <nav
              className="mt-6 rounded-[24px] border border-slate-200/80 bg-slate-50/80 p-5"
              aria-label={copy.hero.tocLabel}
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                {copy.hero.tocLabel}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {copy.toc.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </section>

        <SimpleCardGridSection
          id="why-these-apps"
          eyebrow={copy.why.eyebrow}
          title={copy.why.title}
          description={copy.why.description}
          items={collection.methodology.map((item) => ({
            title: item.title,
            description: item.description,
          }))}
        />

        <section id="ranked-apps" className="page-section">
          <SectionHeading
            eyebrow={copy.picks.eyebrow}
            title={copy.picks.title}
            description={copy.picks.description}
          />
          <div className="best-apps-picks">
            {collection.picks.map((item) => (
              <article key={item.name} className="surface-card best-apps-pick">
                <div className="best-apps-pick__header">
                  <div className="best-apps-pick__rank">#{item.rank}</div>
                  <div>
                    <h3>{item.name}</h3>
                    <p className="best-apps-pick__badge">{item.badge}</p>
                  </div>
                </div>

                <p className="best-apps-pick__summary">{item.summary}</p>

                <div className="best-apps-pick__facts">
                  <div>
                    <span>{copy.picks.bestForLabel}</span>
                    <strong>{item.bestFor}</strong>
                  </div>
                  <div>
                    <span>{copy.picks.pricingLabel}</span>
                    <strong>{item.pricing}</strong>
                  </div>
                </div>

                <div className="best-apps-pick__lists">
                  <div>
                    <h4>{copy.picks.strengthsLabel}</h4>
                    <ul>
                      {item.strengths.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>{copy.picks.watchoutsLabel}</h4>
                    <ul>
                      {item.watchouts.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {item.href ? (
                  <div className="best-apps-pick__cta">
                    <Button href={item.href} variant="secondary">
                      {copy.picks.ctaLabel}
                    </Button>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section id="how-to-compare" className="page-section">
          <SectionHeading
            eyebrow={copy.compare.eyebrow}
            title={copy.compare.title}
            description={copy.compare.description}
          />
          <ol className="best-apps-principles">
            {collection.selectionGuide.map((item) => (
              <li key={item.title} className="best-apps-principles__item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="choose-right-app" className="page-section">
          <SectionHeading
            eyebrow={copy.fit.eyebrow}
            title={copy.fit.title}
            description={copy.fit.description}
          />
          <ol className="best-apps-principles">
            {collection.rightFitGuide.map((item) => (
              <li key={item.title} className="best-apps-principles__item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <FinalCtaSection
          title={collection.finalVerdict.title}
          primaryLabel={collection.finalVerdict.primaryLabel}
          primaryHref={collection.finalVerdict.primaryHref}
          secondaryLabel={collection.finalVerdict.secondaryLabel}
          secondaryHref={collection.finalVerdict.secondaryHref}
          body={
            <div className="best-apps-verdict__body">
              {collection.finalVerdict.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          }
          panelClassName="best-apps-verdict"
          actionsClassName="inline-list"
        />
      </PageContainer>
    </main>
  );
}
