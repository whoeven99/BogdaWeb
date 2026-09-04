import {notFound} from "next/navigation";

import {FaqSection} from "@/components/sections/FaqSection";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getAvailableToolReviewLocales, getToolReviewMap, getToolReviews} from "@/content/tool-reviews";
import {localizeHref} from "@/lib/i18n";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema} from "@/lib/seo/schema";

type ToolReviewDetailPageProps = {
  params: Promise<{slug: string}>;
};

function formatRating(value: number) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}

function getPageCopy(locale: "en" | "zh-cn") {
  return locale === "zh-cn"
    ? {
        notFound: {
          title: "页面不存在",
          description: "你访问的工具测评不存在。",
          path: "/resources/product-research/reviews",
        },
        backLabel: "返回工具测评",
        hero: {
          eyebrow: "工具测评",
          ratingLabel: "综合评分",
          categoryLabel: "所属阶段",
          yearLabel: "年份",
          pricingLabel: "价格",
          summaryLabel: "结论",
          tocLabel: "本页目录",
        },
        sections: {
          score: {
            eyebrow: "评分拆解",
            title: "各维度评分",
            description: "按功能覆盖、易用性、数据准确性、价格价值和支持更新五个维度拆开看。",
            dimensionLabel: "维度",
            scoreLabel: "评分",
          },
          prosCons: {
            eyebrow: "优缺点",
            title: "优缺点一览",
            description: "把适合和不适合的场景直接列出来，方便快速判断。",
            prosLabel: "优点",
            consLabel: "缺点",
          },
          features: {
            eyebrow: "核心功能",
            title: "它能做什么",
            description: "只挑对选品最有用的核心能力展开。",
          },
          bestFor: {
            eyebrow: "最佳场景",
            title: "适合谁",
            description: "按使用场景判断这个工具是否匹配你的需求。",
          },
          alternatives: {
            eyebrow: "替代工具",
            title: "还可以看这些",
            description: "同阶段或功能相近的工具，方便你交叉对比。",
          },
          faq: {
            eyebrow: "FAQ",
            title: "常见问题",
            description: "覆盖用户在决定是否购买这个工具时最常问的问题。",
          },
        },
      }
    : {
        notFound: {
          title: "Page not found",
          description: "The requested tool review could not be found.",
          path: "/resources/product-research/reviews",
        },
        backLabel: "Back to tool reviews",
        hero: {
          eyebrow: "Tool review",
          ratingLabel: "Rating",
          categoryLabel: "Stage",
          yearLabel: "Year",
          pricingLabel: "Pricing",
          summaryLabel: "Verdict",
          tocLabel: "On this page",
        },
        sections: {
          score: {
            eyebrow: "Score breakdown",
            title: "How it scores by dimension",
            description: "Split across feature coverage, ease of use, data accuracy, pricing value, and support.",
            dimensionLabel: "Dimension",
            scoreLabel: "Score",
          },
          prosCons: {
            eyebrow: "Pros & cons",
            title: "Pros and cons at a glance",
            description: "List the fit and non-fit cases directly so you can decide faster.",
            prosLabel: "Pros",
            consLabel: "Cons",
          },
          features: {
            eyebrow: "Key features",
            title: "What it can do",
            description: "Only the core capabilities that matter most for product research.",
          },
          bestFor: {
            eyebrow: "Best for",
            title: "Who it fits",
            description: "Judge fit by use case instead of the feature list alone.",
          },
          alternatives: {
            eyebrow: "Alternatives",
            title: "Other tools to consider",
            description: "Tools in the same stage or with similar capabilities for cross-comparison.",
          },
          faq: {
            eyebrow: "FAQ",
            title: "Frequently asked questions",
            description: "Cover the most common questions buyers ask before choosing this tool.",
          },
        },
      };
}

function buildStructuredData(locale: "en" | "zh-cn", review: {toolName: string; title: string; description: string; href: string; faq: {question: string; answer: string}[]}) {
  const pageUrl = new URL(localizeHref(locale, review.href), siteUrl).toString();

  return [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "Shopify 选品" : "Product Research", item: new URL(localizeHref(locale, "/resources/product-research"), siteUrl).toString()},
      {name: locale === "zh-cn" ? "工具测评" : "Tool Reviews", item: new URL(localizeHref(locale, "/resources/product-research/reviews"), siteUrl).toString()},
      {name: review.toolName, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: review.title,
      description: review.description,
      type: "WebPage",
    }),
    buildFaqSchema(review.faq),
  ];
}

export function generateStaticParams() {
  return [...new Set([...getToolReviews("en"), ...getToolReviews("zh-cn")].map((review) => review.slug))].map((slug) => ({slug}));
}

export async function generateMetadata({params}: ToolReviewDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const review = getToolReviewMap(locale)[slug];
  const copy = getPageCopy(locale);

  if (!review) {
    return buildPageMetadata({
      title: copy.notFound.title,
      description: copy.notFound.description,
      path: copy.notFound.path,
      locale,
      supportedLocales: getAvailableToolReviewLocales(slug),
    });
  }

  return buildPageMetadata({
    title: review.title,
    description: review.description,
    path: review.href,
    locale,
    supportedLocales: getAvailableToolReviewLocales(slug),
  });
}

export default async function ToolReviewDetailPage({params}: ToolReviewDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const review = getToolReviewMap(locale)[slug];

  if (!review) {
    notFound();
  }

  const copy = getPageCopy(locale);
  const structuredData = buildStructuredData(locale, review);
  const tocItems = [
    {href: "#score", label: copy.sections.score.title},
    {href: "#pros-cons", label: copy.sections.prosCons.title},
    {href: "#features", label: copy.sections.features.title},
    {href: "#best-for", label: copy.sections.bestFor.title},
    {href: "#alternatives", label: copy.sections.alternatives.title},
    {href: "#faq", label: copy.sections.faq.title},
  ];

  return (
    <main className="guide-detail-page">
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`${review.slug}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}

        <section className="page-section guide-hero">
          <div className="guide-hero__topbar">
            <LocalizedLink href="/resources/product-research/reviews" className="guide-backlink">
              {copy.backLabel}
            </LocalizedLink>
          </div>

          <SectionHeading eyebrow={copy.hero.eyebrow} title={review.title} description={review.description} as="h1" />

          <div className="guide-meta-grid">
            <div className="surface-card guide-meta-card">
              <span>{copy.hero.ratingLabel}</span>
              <strong>{formatRating(review.rating)}/10</strong>
            </div>
            <div className="surface-card guide-meta-card">
              <span>{copy.hero.categoryLabel}</span>
              <strong>{review.categoryLabel}</strong>
            </div>
            <div className="surface-card guide-meta-card">
              <span>{copy.hero.yearLabel}</span>
              <strong>{review.year}</strong>
            </div>
            <div className="surface-card guide-meta-card">
              <span>{copy.hero.pricingLabel}</span>
              <strong>{review.pricing}</strong>
            </div>
          </div>

          <div className="guide-hero__layout">
            <article className="surface-card guide-hero__summary">
              <span className="guide-hero__summary-label">{copy.hero.summaryLabel}</span>
              <p>{review.verdict}</p>
            </article>

            <nav className="surface-card guide-toc" aria-label={copy.hero.tocLabel}>
              <span className="guide-hero__summary-label">{copy.hero.tocLabel}</span>
              <ul>
                {tocItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        <section id="score" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.score.eyebrow}
            title={copy.sections.score.title}
            description={copy.sections.score.description}
          />
          <div className="compare-table-card">
            <div className="compare-table-wrapper">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>{copy.sections.score.dimensionLabel}</th>
                    <th>{copy.sections.score.scoreLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {review.scoreBreakdown.map((item) => (
                    <tr key={item.label}>
                      <th>{item.label}</th>
                      <td>{formatRating(item.score)}/10</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="pros-cons" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.prosCons.eyebrow}
            title={copy.sections.prosCons.title}
            description={copy.sections.prosCons.description}
          />
          <div className="guide-article-layout">
            <div className="guide-solution-stack">
              <article className="surface-card guide-solution-card">
                <h3>{copy.sections.prosCons.prosLabel}</h3>
                <ul className="check-list">
                  {review.pros.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="surface-card guide-solution-card">
                <h3>{copy.sections.prosCons.consLabel}</h3>
                <ul className="check-list">
                  {review.cons.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="features" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.features.eyebrow}
            title={copy.sections.features.title}
            description={copy.sections.features.description}
          />
          <div className="card-grid">
            {review.features.map((feature) => (
              <article key={feature.title} className="surface-card">
                <h3>{feature.title}</h3>
                <p className="quote">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="best-for" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.bestFor.eyebrow}
            title={copy.sections.bestFor.title}
            description={copy.sections.bestFor.description}
          />
          <div className="surface-card guide-checklist">
            <ul className="check-list">
              {review.bestFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="alternatives" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.alternatives.eyebrow}
            title={copy.sections.alternatives.title}
            description={copy.sections.alternatives.description}
          />
          <div className="guide-narrative-stack">
            {review.alternatives.map((item) => (
              <article key={item.name} className="surface-card guide-narrative-card">
                <h3>{item.name}</h3>
                <div className="space-top-lg">
                  <LocalizedLink href={item.href} className="site-nav__link">
                    {locale === "zh-cn" ? "查看测评" : "Read review"}
                  </LocalizedLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="page-section page-section--compact">
          <FaqSection
            eyebrow={copy.sections.faq.eyebrow}
            title={copy.sections.faq.title}
            description={copy.sections.faq.description}
            items={review.faq}
          />
        </section>
      </PageContainer>
    </main>
  );
}
