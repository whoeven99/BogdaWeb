import {ContentIndexHero} from "@/components/sections/ContentIndexHero";
import {ResourceCollectionSection} from "@/components/sections/ResourceCollectionSection";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getToolReviews} from "@/content/tool-reviews";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema, buildGraphSchema} from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

function formatRating(value: number) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}

function getPageCopy(locale: "en" | "zh-cn") {
  return locale === "zh-cn"
    ? {
        structuredData: {
          name: "选品工具测评",
          description: "Shopify 选品工具独立测评合集。",
          keywords: ["选品工具测评", "product research tool review", "shopify 选品工具"],
        },
        metaDescription:
          "Sell The Trend、Minea、Helium 10 等 6 款选品工具的独立测评与横向对比：综合评分、定价、所属阶段和最佳场景一次看完。",
        hero: {
          eyebrow: "Tool Reviews",
          title: "选品工具测评",
          description: "对常用选品工具做独立测评，按评分、优缺点、定价和最佳场景拆开看。",
        },
        matrix: {
          eyebrow: "横向对比",
          title: "先看这张横向对比",
          description: "把六款工具的综合评分、定价、所属阶段和最佳场景并排放在一起，先缩小范围，再点进去看细节。",
          columns: ["工具", "综合评分", "定价", "所属阶段", "最佳场景"],
        },
        method: {
          eyebrow: "评分方法",
          title: "我们怎么打分",
          description:
            "每篇测评都从功能覆盖、易用性、数据准确性、价格价值、支持与更新五个维度打分，明细可在各测评页核对。综合分是编辑面向选品场景给出的总体评价，以这五个维度为依据，但不是它们的算术平均，因此与维度均分可能不一致。分数来自测评期间的实际使用，不采用统一的标准化测试流程。定价以测评时的公开方案为准，试用政策会随官方调整变化。",
        },
      }
    : {
        structuredData: {
          name: "Product Research Tool Reviews",
          description: "Independent reviews of Shopify product research tools.",
          keywords: ["product research tool review", "shopify product research tool", "tool reviews"],
        },
        metaDescription:
          "Independent reviews and a side-by-side comparison of six product research tools: score, pricing, stage and best fit in one table.",
        hero: {
          eyebrow: "Tool Reviews",
          title: "Product Research Tool Reviews",
          description: "Independent reviews of common product research tools, split by score, pros and cons, pricing, and best fit.",
        },
        matrix: {
          eyebrow: "Side-by-side",
          title: "Start with the comparison",
          description: "Score, pricing, stage and best fit for all six tools on one table, so you can shortlist before opening a full review.",
          columns: ["Tool", "Score", "Pricing", "Stage", "Best for"],
        },
        method: {
          eyebrow: "How we score",
          title: "How the scores are built",
          description:
            "Every review scores five dimensions — feature coverage, ease of use, data accuracy, pricing value, and support & updates — and the breakdown is shown in each review. The headline score is an editorial overall rating for product research, informed by those dimension scores but not a straight average of them, so it can differ from the dimension mean. Scores come from hands-on use during the review period, not a standardized lab protocol. Pricing reflects the public plans at review time; trial terms change with the vendor.",
        },
      };
}

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const copy = getPageCopy(locale);

  return buildPageMetadata({
    title: locale === "zh-cn" ? "选品工具测评" : "Product Research Tool Reviews",
    description: copy.metaDescription,
    path: "/resources/product-research/reviews",
    locale,
  });
}

export default async function ToolReviewsIndexPage() {
  const locale = await getRequestLocale();
  const reviews = getToolReviews(locale);
  const copy = getPageCopy(locale);

  const pageUrl = toAbsoluteLocalizedUrl(locale, "/resources/product-research/reviews");
  const structuredData = buildGraphSchema([
    buildBreadcrumbSchema([
      {name: locale === "zh-cn" ? "首页" : "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "Shopify 选品" : "Product Research", item: toAbsoluteLocalizedUrl(locale, "/resources/product-research")},
      {name: copy.structuredData.name, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: copy.structuredData.name,
      description: copy.structuredData.description,
      keywords: [...copy.structuredData.keywords],
      type: "CollectionPage",
    }),
  ]);

  return (
    <main className="product-research-reviews-page">
      <PageContainer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />

        <section className="page-section page-hero">
          <ContentIndexHero eyebrow={copy.hero.eyebrow} title={copy.hero.title} description={copy.hero.description} />
        </section>

        {/* The hub page links into this index, so the comparison table carries the content
            that makes this page worth its own URL instead of being a relabelled subset. */}
        <section id="comparison" className="page-section page-section--compact">
          <SectionHeading eyebrow={copy.matrix.eyebrow} title={copy.matrix.title} description={copy.matrix.description} />
          <div className="review-matrix-scroll mt-8">
            <div className="review-matrix-table" role="table" aria-label={copy.matrix.title}>
              <div className="review-matrix-table__row" role="row">
                {copy.matrix.columns.map((column) => (
                  <div key={column} className="review-matrix-table__cell review-matrix-table__cell--head" role="columnheader">
                    <p className="review-matrix-table__text">{column}</p>
                  </div>
                ))}
              </div>
              {reviews.map((review) => (
                <div key={review.slug} className="review-matrix-table__row" role="row">
                  <div className="review-matrix-table__cell review-matrix-table__cell--tool" role="cell">
                    <p className="review-matrix-table__text">
                      <LocalizedLink href={review.href}>{review.toolName}</LocalizedLink>
                    </p>
                  </div>
                  <div className="review-matrix-table__cell" role="cell">
                    <p className="review-matrix-table__text">{`${formatRating(review.rating)}/10`}</p>
                  </div>
                  <div className="review-matrix-table__cell" role="cell">
                    <p className="review-matrix-table__text">{review.pricing}</p>
                  </div>
                  <div className="review-matrix-table__cell" role="cell">
                    <p className="review-matrix-table__text">{review.categoryLabel}</p>
                  </div>
                  <div className="review-matrix-table__cell" role="cell">
                    <p className="review-matrix-table__text">{review.bestFor[0] ?? ""}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="method" className="page-section page-section--compact">
          <SectionHeading eyebrow={copy.method.eyebrow} title={copy.method.title} />
          <p className="quote mt-6">{copy.method.description}</p>
        </section>

        <section className="page-section">
          <ResourceCollectionSection
            items={reviews.map((review) => ({
              title: review.title,
              description: review.description,
              href: review.href,
              meta: [review.categoryLabel, `${formatRating(review.rating)}/10`, String(review.year)],
            }))}
            className="mt-0 py-0"
          />
        </section>
      </PageContainer>
    </main>
  );
}
