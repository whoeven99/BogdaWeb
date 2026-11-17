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

const MONTH_ABBREVIATIONS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// 日期取自测评的 publishedAt —— 它只能证明文章何时发布，不等于价格复核时间。
// 手写格式化而不是 toLocaleDateString，避免不同运行环境的 ICU 数据把同一个日期
// 渲染成两种样子。
function formatPublishedDate(value: string, locale: "en" | "zh-cn") {
  const [year, month, day] = value.split("-").map((part) => Number(part));

  if (!year || !month || !day || month > 12) {
    return value;
  }

  const paddedDay = String(day).padStart(2, "0");

  return locale === "zh-cn"
    ? `${year}-${String(month).padStart(2, "0")}-${paddedDay}`
    : `${MONTH_ABBREVIATIONS[month - 1]} ${day}, ${year}`;
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
          publishedLabel: "测评发布于",
          note: "数据来源：本站六篇独立测评，点工具名进入对应测评页。日期为该测评的发布时间，不是价格的复核日期；定价按当时公开方案记录，官方调整后不会自动回写。",
        },
        scores: {
          eyebrow: "分项评分",
          title: "五个维度逐项对照",
          description:
            "六款工具用同一套五个维度打分，方便你只看决定购买的那一项。单项分之间不能相加，也不能跨维度取平均；综合分见上一张表。",
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
          publishedLabel: "Published",
          note: "Source: the six independent reviews on this site — the tool name links to each one. The date is when that review was published, not when its pricing was re-checked; vendor changes afterwards are not written back automatically.",
        },
        scores: {
          eyebrow: "Dimension scores",
          title: "The same five dimensions, side by side",
          description:
            "All six tools are scored on the same five dimensions, so you can look at the one that decides the purchase for you. Dimension scores do not add up, and averaging across them is not meaningful — the headline score is in the table above.",
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
  // 表头取所有测评维度的并集（按首次出现顺序），单元格按维度标签匹配取值。
  // 不按下标取值：某一篇删掉中间一项或调整顺序时，分数会整列错位；缺项留破折号。
  const dimensionLabels = Array.from(
    new Set(reviews.flatMap((review) => review.scoreBreakdown.map((item) => item.label))),
  );

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
                    <p className="review-matrix-table__meta">
                      {`${copy.matrix.publishedLabel} ${formatPublishedDate(review.publishedAt, locale)}`}
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
          <p className="quote mt-6">{copy.matrix.note}</p>
        </section>

        {/* 综合分只有一列，看不出「哪一项拖后腿」。分项表用同一套维度摊开，
            让读者按自己关心的维度挑工具，也把发布日期和口径写在页面上。 */}
        <section id="scores" className="page-section page-section--compact">
          <SectionHeading eyebrow={copy.scores.eyebrow} title={copy.scores.title} description={copy.scores.description} />
          <div className="review-matrix-scroll mt-8">
            <div
              className="review-matrix-table review-matrix-table--scores"
              role="table"
              aria-label={copy.scores.title}
            >
              <div className="review-matrix-table__row" role="row">
                <div className="review-matrix-table__cell review-matrix-table__cell--head" role="columnheader">
                  <p className="review-matrix-table__text">{copy.matrix.columns[0]}</p>
                </div>
                {dimensionLabels.map((label) => (
                  <div
                    key={label}
                    className="review-matrix-table__cell review-matrix-table__cell--head"
                    role="columnheader"
                  >
                    <p className="review-matrix-table__text">{label}</p>
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
                  {dimensionLabels.map((label) => {
                    const score = review.scoreBreakdown.find((item) => item.label === label)?.score;

                    return (
                      <div key={`${review.slug}-${label}`} className="review-matrix-table__cell" role="cell">
                        <p className="review-matrix-table__text review-matrix-table__text--score">
                          {typeof score === "number" ? score.toString() : "—"}
                        </p>
                      </div>
                    );
                  })}
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
