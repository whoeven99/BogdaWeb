import {ArticleCard} from "@/components/cards/ArticleCard";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getToolReviews} from "@/content/tool-reviews";
import {getRequestLocale} from "@/lib/i18n-server";
import {localizeHref} from "@/lib/i18n";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema} from "@/lib/seo/schema";

function formatRating(value: number) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}

export async function generateMetadata() {
  const locale = await getRequestLocale();

  return buildPageMetadata({
    title: locale === "zh-cn" ? "选品工具测评" : "Product Research Tool Reviews",
    description:
      locale === "zh-cn"
        ? "对 Sell The Trend、Minea、Koala Inspector 等选品工具的独立测评，按评分、优缺点、定价和最佳场景拆解。"
        : "Independent reviews of product research tools like Sell The Trend, Minea, and Koala Inspector, broken down by score, pros and cons, pricing, and best fit.",
    path: "/resources/product-research/reviews",
    locale,
  });
}

export default async function ToolReviewsIndexPage() {
  const locale = await getRequestLocale();
  const reviews = getToolReviews(locale);
  const copy =
    locale === "zh-cn"
      ? {
          structuredData: {
            name: "选品工具测评",
            description: "Shopify 选品工具独立测评合集。",
            keywords: ["选品工具测评", "product research tool review", "shopify 选品工具"],
          },
          hero: {
            eyebrow: "Tool Reviews",
            title: "选品工具测评",
            description: "对常用选品工具做独立测评，按评分、优缺点、定价和最佳场景拆开看。",
          },
        }
      : {
          structuredData: {
            name: "Product Research Tool Reviews",
            description: "Independent reviews of Shopify product research tools.",
            keywords: ["product research tool review", "shopify product research tool", "tool reviews"],
          },
          hero: {
            eyebrow: "Tool Reviews",
            title: "Product Research Tool Reviews",
            description: "Independent reviews of common product research tools, split by score, pros and cons, pricing, and best fit.",
          },
        };

  const pageUrl = new URL(localizeHref(locale, "/resources/product-research/reviews"), siteUrl).toString();
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "Shopify 选品" : "Product Research", item: new URL(localizeHref(locale, "/resources/product-research"), siteUrl).toString()},
      {name: copy.structuredData.name, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: copy.structuredData.name,
      description: copy.structuredData.description,
      keywords: [...copy.structuredData.keywords],
      type: "CollectionPage",
    }),
  ];

  return (
    <main className="product-research-reviews-page">
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`tool-reviews-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}

        <section className="page-section page-hero">
          <SectionHeading
            eyebrow={copy.hero.eyebrow}
            title={copy.hero.title}
            description={copy.hero.description}
            as="h1"
          />
          <div className="resource-grid">
            {reviews.map((review) => (
              <ArticleCard
                key={review.slug}
                title={review.title}
                description={review.description}
                href={review.href}
                meta={[review.categoryLabel, `${formatRating(review.rating)}/10`, String(review.year)]}
              />
            ))}
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
