import {notFound} from "next/navigation";

import {Button} from "@/components/ui/Button";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getBestShopifyAppCollectionMap, getBestShopifyAppCollections} from "@/content/best-shopify-apps";
import {getRequestLocale} from "@/lib/i18n-server";
import {localizeHref} from "@/lib/i18n";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema} from "@/lib/seo/schema";

type BestShopifyAppCollectionPageProps = {
  params: Promise<{slug: string}>;
};

function buildItemListSchema(url: string, collection: ReturnType<typeof getBestShopifyAppCollectionMap>[string]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: collection.title,
    description: collection.description,
    url,
    itemListElement: collection.picks.map((item) => ({
      "@type": "ListItem",
      position: item.rank,
      name: item.name,
      description: item.summary,
      url: item.href ? new URL(item.href, siteUrl).toString() : undefined,
    })),
  };
}

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
          backLabel: "返回合集页",
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

  const pageUrl = new URL(localizeHref(locale, collection.href), siteUrl).toString();
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: "Best Shopify Apps", item: new URL(localizeHref(locale, "/best-shopify-apps"), siteUrl).toString()},
      {name: collection.title, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: collection.title,
      description: collection.description,
      keywords: [...collection.keywords],
      type: "CollectionPage",
    }),
    buildItemListSchema(pageUrl, collection),
  ];

  return (
    <main className="best-apps-page">
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`${collection.slug}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}

        <section className="page-section best-apps-hero">
          <div className="best-apps-hero__topbar">
            <LocalizedLink href="/best-shopify-apps" className="best-apps-backlink">
              {copy.backLabel}
            </LocalizedLink>
          </div>

          <SectionHeading
            eyebrow={collection.heroEyebrow}
            title={collection.title}
            description={collection.description}
            as="h1"
          />

          <div className="best-apps-meta">
            <div className="surface-card best-apps-meta__card">
              <span>{copy.hero.metaLabels.category}</span>
              <strong>{collection.categoryLabel}</strong>
            </div>
            <div className="surface-card best-apps-meta__card">
              <span>{copy.hero.metaLabels.year}</span>
              <strong>{collection.year}</strong>
            </div>
            <div className="surface-card best-apps-meta__card">
              <span>{copy.hero.metaLabels.updated}</span>
              <strong>{collection.updatedLabel}</strong>
            </div>
          </div>

          <div className="best-apps-overview">
            <article className="surface-card best-apps-summary-card">
              <span className="best-apps-summary-card__label">{copy.hero.summaryLabel}</span>
              <p>{collection.summary}</p>
              <div className="best-apps-intro">
                {collection.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            <nav className="surface-card best-apps-toc" aria-label={copy.hero.tocLabel}>
              <span className="best-apps-summary-card__label">{copy.hero.tocLabel}</span>
              <ul>
                {copy.toc.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        <section id="why-these-apps" className="page-section">
          <SectionHeading
            eyebrow={copy.why.eyebrow}
            title={copy.why.title}
            description={copy.why.description}
          />
          <div className="card-grid">
            {collection.methodology.map((item) => (
              <article key={item.title} className="surface-card">
                <h3>{item.title}</h3>
                <p className="quote">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

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

        <section id="final-verdict" className="page-section">
          <div className="callout best-apps-verdict">
            <SectionHeading title={collection.finalVerdict.title} />
            <div className="best-apps-verdict__body">
              {collection.finalVerdict.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="inline-list">
              <Button href={collection.finalVerdict.primaryHref}>{collection.finalVerdict.primaryLabel}</Button>
              <Button href={collection.finalVerdict.secondaryHref} variant="secondary">
                {collection.finalVerdict.secondaryLabel}
              </Button>
            </div>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
