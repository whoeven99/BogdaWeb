import {notFound} from "next/navigation";

import {FaqSection} from "@/components/sections/FaqSection";
import {ChecklistCardGrid} from "@/components/sections/ChecklistCardGrid";
import {SimpleCardGridSection} from "@/components/sections/SimpleCardGridSection";
import {BackLink} from "@/components/ui/BackLink";
import {CardCtaLink} from "@/components/ui/CardCtaLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getAvailableToolReviewLocales, getToolReviewMap, getToolReviews, type ToolReview} from "@/content/tool-reviews";
import {getRequestLocale} from "@/lib/i18n-server";
import {localizeLanguageSignalFields} from "@/lib/localized-language-signal";
import {buildPageMetadata, siteUrl, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildReviewSchema, buildWebPageSchema, buildGraphSchema} from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

type ToolReviewDetailPageProps = {
  params: Promise<{slug: string}>;
};

function buildReviewNarrative({
  locale,
  review,
}: {
  locale: "en" | "zh-cn";
  review: ToolReview;
}) {
  const featureLabels = review.features.slice(0, 3).map((item) => item.title).join(locale === "zh-cn" ? "、" : ", ");
  const bestFor = review.bestFor.slice(0, 2).join(locale === "zh-cn" ? "、" : ", ");
  const alternativeNames = review.alternatives.slice(0, 3).map((item) => item.name).join(locale === "zh-cn" ? "、" : ", ");

  if (locale === "zh-cn") {
    return [
      `${review.verdict} 这类测评页的作用不是替你做最终决定，而是先帮你判断这个工具更像“当前就该试”的候选项，还是只适合在某些特殊场景里再比较。`,
      featureLabels
        ? `像 ${featureLabels} 这些能力会直接影响它在 ${review.categoryLabel} 阶段的实用性；如果你的真实需求更接近 ${bestFor || "特定场景"}，那么本页的评分会更有参考价值。`
        : `本页会把核心能力、适用场景和评分维度放在一起，帮助判断是否值得继续试用或付费。`,
      alternativeNames
        ? `如果读完后仍拿不准，最有效的做法通常不是回到搜索结果重新找，而是直接和 ${alternativeNames} 这些替代工具交叉比较。`
        : "如果读完后仍拿不准，最有效的做法通常是直接和同阶段替代工具交叉比较。",
    ];
  }

  return [
    `${review.verdict} The job of a review page like this is not to make the final decision for you, but to show whether this tool looks like an immediate candidate or only fits a narrower edge case.`,
    featureLabels
      ? `Capabilities such as ${featureLabels} shape how useful it is in the ${review.categoryLabel} stage. If your real need is closer to ${bestFor || "the specific fit cases on this page"}, the score breakdown becomes much more relevant.`
      : "This page keeps capability, fit, and scoring in one place so it is easier to judge whether a trial or paid plan is worth the next step.",
    alternativeNames
      ? `If the fit is still unclear after reading, the fastest move is usually not another broad search but a direct comparison against alternatives such as ${alternativeNames}.`
      : "If the fit is still unclear after reading, the fastest move is usually a direct comparison against other tools in the same stage.",
  ];
}

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

function buildStructuredData(
  locale: "en" | "zh-cn",
  review: {
    toolName: string;
    title: string;
    description: string;
    href: string;
    rating: number;
    verdict: string;
    publishedAt: string;
    faq: {question: string; answer: string}[];
  }
) {
  const localizedReview = localizeLanguageSignalFields(locale, review);
  const pageUrl = toAbsoluteLocalizedUrl(locale, review.href);

  return buildGraphSchema([
    buildBreadcrumbSchema([
      {name: locale === "zh-cn" ? "首页" : "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "Shopify 选品" : "Product Research", item: toAbsoluteLocalizedUrl(locale, "/resources/product-research")},
      {name: locale === "zh-cn" ? "工具测评" : "Tool Reviews", item: toAbsoluteLocalizedUrl(locale, "/resources/product-research/reviews")},
      {name: localizedReview.toolName, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: localizedReview.title,
      description: localizedReview.description,
      type: "WebPage",
    }),
    buildReviewSchema({
      url: pageUrl,
      itemName: localizedReview.toolName,
      itemReviewedType: "SoftwareApplication",
      reviewBody: localizedReview.verdict,
      ratingValue: localizedReview.rating,
      bestRating: 10,
      datePublished: localizedReview.publishedAt,
    }),
    buildFaqSchema(localizedReview.faq),
  ]);
}

export function generateStaticParams() {
  return [...new Set([...getToolReviews("en"), ...getToolReviews("zh-cn")].map((review) => review.slug))].map((slug) => ({slug}));
}

export async function generateMetadata({params}: ToolReviewDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const rawReview = getToolReviewMap(locale)[slug];
  const review = rawReview ? localizeLanguageSignalFields(locale, rawReview) : rawReview;
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
  const rawReview = getToolReviewMap(locale)[slug];
  const review = rawReview ? localizeLanguageSignalFields(locale, rawReview) : rawReview;

  if (!review) {
    notFound();
  }

  const copy = getPageCopy(locale);
  const structuredData = buildStructuredData(locale, review);
  const narrative = buildReviewNarrative({locale, review});
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />

        <section className="py-8 sm:py-10 lg:py-12">
          <div className="mx-auto max-w-5xl">
            <BackLink href="/resources/product-research/reviews" label={copy.backLabel} />
            <div className="mt-5 sm:mt-6">
              <SectionHeading eyebrow={copy.hero.eyebrow} title={review.title} description={review.description} as="h1" />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {label: copy.hero.ratingLabel, value: `${formatRating(review.rating)}/10`},
                {label: copy.hero.categoryLabel, value: review.categoryLabel},
                {label: copy.hero.yearLabel, value: review.year},
                {label: copy.hero.pricingLabel, value: review.pricing},
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
              <div className="mt-3 space-y-4 text-[15px] leading-7 text-slate-700 sm:text-base">
                {narrative.map((paragraph) => (
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
                {tocItems.map((item) => (
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
            <ChecklistCardGrid
              gridClassName="guide-solution-stack"
              cardClassName="guide-solution-card"
              cards={[
                {title: copy.sections.prosCons.prosLabel, items: review.pros},
                {title: copy.sections.prosCons.consLabel, items: review.cons},
              ]}
            />
          </div>
        </section>

        <SimpleCardGridSection
          id="features"
          eyebrow={copy.sections.features.eyebrow}
          title={copy.sections.features.title}
          description={copy.sections.features.description}
          items={review.features.map((feature) => ({
            title: feature.title,
            description: feature.description,
          }))}
        />

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
                  <CardCtaLink href={item.href}>{locale === "zh-cn" ? "查看测评" : "Read review"}</CardCtaLink>
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
