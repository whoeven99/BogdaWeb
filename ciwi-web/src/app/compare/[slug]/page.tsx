import {notFound} from "next/navigation";

import type {CSSProperties} from "react";

import {FaqSection} from "@/components/sections/FaqSection";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {ArticleCard} from "@/components/cards/ArticleCard";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import type {CompareItem, CompareMetric} from "@/content/compare";
import {getCompareMap, getCompares, compares} from "@/content/compare";
import {getBlogPosts} from "@/content/blog";
import {getHelpCenterDocs} from "@/content/help-center";
import {localizeHref} from "@/lib/i18n";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema} from "@/lib/seo/schema";

type CompareDetailPageProps = {
  params: Promise<{slug: string}>;
};

const primaryProductName = "CIwi Translator";

function clampScore(value: number) {
  return Math.max(0, Math.min(10, value));
}

function getScoreTone(value: number) {
  if (value <= 5) {
    return "weak";
  }

  if (value <= 8) {
    return "medium";
  }

  return "strong";
}

function getStrengthLabel(value: number, locale: "en" | "zh-cn") {
  const tone = getScoreTone(value);

  if (locale === "zh-cn") {
    return tone === "weak" ? "弱" : tone === "medium" ? "中" : "强";
  }

  return tone === "weak" ? "Weak" : tone === "medium" ? "Medium" : "Strong";
}

function getScoreBarStyle(value: number, delay = 0) {
  return {
    "--score-width": `${clampScore(value) * 10}%`,
    "--score-delay": `${delay}ms`,
  } as CSSProperties;
}

function formatScore(value: number) {
  const safeValue = clampScore(value);
  const formatted = Number.isInteger(safeValue) ? safeValue.toString() : safeValue.toFixed(1);

  return `${formatted}/10`;
}

function getAverageScore(items: CompareMetric[], key: "ciwi" | "alternative") {
  return items.reduce((total, item) => total + item[key], 0) / items.length;
}

function getTotalScore(items: CompareMetric[], key: "ciwi" | "alternative") {
  return items.reduce((total, item) => total + item[key], 0);
}

function getTotalStarRating(total: number, totalMax: number) {
  if (totalMax <= 0) {
    return 0;
  }

  return (total / totalMax) * 5;
}

function getVisualTotalStarRating(value: number) {
  const safeValue = Math.max(0, Math.min(5, value));

  return Math.round(safeValue * 2) / 2;
}

function formatTotalStarRating(value: number) {
  const safeValue = Math.max(0, Math.min(5, value));
  const formatted = Number.isInteger(safeValue) ? safeValue.toString() : safeValue.toFixed(1);

  return formatted;
}

function getTotalStarStyle(value: number) {
  return {"--total-rating": getVisualTotalStarRating(value)} as CSSProperties;
}

function getTopLabels(items: CompareMetric[], key: "ciwi" | "alternative", limit = 2) {
  return items
    .filter((item) => item[key] > item[key === "ciwi" ? "alternative" : "ciwi"])
    .sort((a, b) => (b[key] - b[key === "ciwi" ? "alternative" : "ciwi"]) - (a[key] - a[key === "ciwi" ? "alternative" : "ciwi"]))
    .slice(0, limit)
    .map((item) => item.label);
}

function buildOverallAssessment(data: CompareItem, locale: "en" | "zh-cn") {
  const allScores = [...data.summaryMetrics, ...data.scoreMatrix];
  const ciwiWins = allScores.filter((item) => item.ciwi > item.alternative).length;
  const alternativeWins = allScores.filter((item) => item.alternative > item.ciwi).length;
  const ciwiFocus = getTopLabels(allScores, "ciwi").join(locale === "zh-cn" ? "、" : ", ");
  const alternativeFocus = getTopLabels(allScores, "alternative").join(locale === "zh-cn" ? "、" : ", ");

  if (locale === "zh-cn") {
    if (ciwiWins === alternativeWins) {
      return `综合评价：按 ${allScores.length} 个 10 分制评分点看，两条路径各有侧重。${primaryProductName} 在 ${ciwiFocus || "长期治理"} 上更突出，${data.alternativeName} 在 ${alternativeFocus || "快速上线"} 上更有吸引力。`;
    }

    if (ciwiWins > alternativeWins) {
      return `综合评价：按 ${allScores.length} 个 10 分制评分点看，${primaryProductName} 整体更强，优势主要集中在 ${ciwiFocus || "长期治理"}；${data.alternativeName} 在 ${alternativeFocus || "价格和上线速度"} 上更适合作为轻量起点。`;
    }

    return `综合评价：按 ${allScores.length} 个 10 分制评分点看，${data.alternativeName} 更偏向轻量和快速上线，${primaryProductName} 则在 ${ciwiFocus || "长期治理"} 上给出更完整的能力深度。`;
  }

  if (ciwiWins === alternativeWins) {
    return `Overall: across ${allScores.length} ten-point signals, both paths emphasize different strengths. ${primaryProductName} is stronger on ${ciwiFocus || "long-term governance"}, while ${data.alternativeName} stands out more on ${alternativeFocus || "faster launch"}.`;
  }

  if (ciwiWins > alternativeWins) {
    return `Overall: across ${allScores.length} ten-point signals, ${primaryProductName} is stronger overall, with clearer advantages in ${ciwiFocus || "long-term governance"}; ${data.alternativeName} is still more attractive for ${alternativeFocus || "price and launch speed"}.`;
  }

  return `Overall: across ${allScores.length} ten-point signals, ${data.alternativeName} leans more toward a lighter and faster start, while ${primaryProductName} goes deeper on ${ciwiFocus || "long-term governance"}.`;
}

function getCompareDetailCopy(locale: "en" | "zh-cn") {
  return locale === "zh-cn"
    ? {
        notFound: {
          title: "未找到对比页",
          description: "你访问的对比页面不存在。",
          path: "/compare",
        },
        hero: {
          eyebrow: "对比",
          panels: {
            summaryTitle: "摘要",
            bestFitTitle: "更适合谁",
            totalScoreTitle: "总分对比",
          },
        },
        sections: {
          scoreTable: {
            eyebrow: "功能对比",
            title: "翻译功能和本地化能力对比",
            description:
              "大家对于翻译功能的预期有较大差异，shopify 电商独立站的翻译目的其实是为了更好地本地化和增加 SEO 强化的效果，而且正因为地道的翻译会带来整体品牌的体验提升和转化率提升，但大部分时候大家把翻译当做一个工具，忽略了润色和本地化的语言结构优化。因此，我们选择这些维度来重新测评翻译 APP 的效果。",
            featureLabel: "功能点",
            overallLabel: "综合结论",
          },
          faq: {
            eyebrow: "FAQ",
            title: "常见问题",
            description: "把商家最常见的判断问题收在一起，方便快速确认选型方向。",
          },
          continue: {
            eyebrow: "其他测评",
            title: "测评&翻译经验分享",
            description: "继续看其他产品测评、翻译经验和帮助文档，把选型判断和后续落地一起看清楚。",
            siblingMeta: ["对比", "替代方案"],
            translatorCard: {
              title: "AI Translator",
              description: "回到产品页，直接看适用场景、Demo 和关键能力。",
              href: "/products/translator",
              meta: ["产品", "Translator"],
            },
          },
        },
        finalCta: {
          title: "限时领取 5 天免费试用",
          description: "如果你已经看清方向差异，现在更适合直接安装 CIwi Translator，用 5 天试用把真实商品、主题和 FAQ 跑一遍。",
          primaryLabel: "安装 CIwi Translator",
          primaryHref: "https://apps.shopify.com/partners/bogdatech",
        },
        breadcrumbLabel: "对比",
        keywordLabel: "Shopify 对比",
      }
    : {
        notFound: {
          title: "Compare not found",
          description: "The requested compare page could not be found.",
          path: "/compare",
        },
        hero: {
          eyebrow: "Compare",
          panels: {
            summaryTitle: "Overview",
            bestFitTitle: "Best fit for",
            totalScoreTitle: "Total score",
          },
        },
        sections: {
          scoreTable: {
            eyebrow: "Score table",
            title: "Key differences and quick conclusions",
            description: "Read the feature rows vertically and compare both products horizontally on a ten-point scale. Scores 0-5 are weak, 6-8 are medium, and 9-10 are strong.",
            featureLabel: "Capability",
            overallLabel: "Overall",
          },
          faq: {
            eyebrow: "FAQ",
            title: "Frequently asked questions",
            description: "Collect the questions merchants ask most often so the comparison can turn into a clearer decision more quickly.",
          },
          continue: {
            eyebrow: "Continue reading",
            title: "Continue reading",
            description: "From here, continue into the product page, articles, and help docs.",
            siblingMeta: ["Compare", "Alternative"],
            translatorCard: {
              title: "AI Translator",
              description: "Return to the product page for scenarios, demo, and core capabilities.",
              href: "/products/translator",
              meta: ["Product", "Translator"],
            },
          },
        },
        finalCta: {
          title: "Claim a 5-day free trial",
          description: "If the direction is already clear, the best next step is to install CIwi Translator and run a real five-day trial on products, themes, and FAQs.",
          primaryLabel: "Install CIwi Translator",
          primaryHref: "https://apps.shopify.com/partners/bogdatech",
        },
        breadcrumbLabel: "Compare",
        keywordLabel: "Shopify compare",
      };
}

export function generateStaticParams() {
  return compares.map((item) => ({slug: item.slug}));
}

export async function generateMetadata({params}: CompareDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const data = getCompareMap(locale)[slug];
  const copy = getCompareDetailCopy(locale);

  if (!data) {
    return buildPageMetadata({
      title: copy.notFound.title,
      description: copy.notFound.description,
      path: copy.notFound.path,
      locale,
    });
  }

  return buildPageMetadata({
    title: data.title,
    description: data.description,
    path: `/compare/${data.slug}`,
    locale,
  });
}

export default async function CompareDetailPage({params}: CompareDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const data = getCompareMap(locale)[slug];
  const copy = getCompareDetailCopy(locale);
  const compares = getCompares(locale);
  const blogPosts = getBlogPosts(locale);
  const helpCenterDocs = getHelpCenterDocs(locale);

  if (!data) {
    notFound();
  }

  const pageUrl = new URL(localizeHref(locale, `/compare/${data.slug}`), siteUrl).toString();
  const siblingCompares = compares.filter((item) => item.slug !== data.slug).slice(0, 2);
  const allScores = [...data.summaryMetrics, ...data.scoreMatrix];
  const overallReview = buildOverallAssessment(data, locale);
  const ciwiTotal = getTotalScore(allScores, "ciwi");
  const alternativeTotal = getTotalScore(allScores, "alternative");
  const totalMax = allScores.length * 10;
  const ciwiTotalStars = getTotalStarRating(ciwiTotal, totalMax);
  const alternativeTotalStars = getTotalStarRating(alternativeTotal, totalMax);
  const ciwiAverage = getAverageScore(data.scoreMatrix, "ciwi");
  const alternativeAverage = getAverageScore(data.scoreMatrix, "alternative");
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: copy.breadcrumbLabel, item: new URL(localizeHref(locale, "/compare"), siteUrl).toString()},
      {name: data.title, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: data.title,
      description: data.description,
      keywords: [copy.keywordLabel, data.title, ...data.bestFor],
    }),
    buildFaqSchema(data.faq),
  ];
  return (
    <main className="compare-detail-page">
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`${data.slug}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}
        <section className="page-section page-hero compare-page-hero">
          <SectionHeading eyebrow={copy.hero.eyebrow} title={data.title} description={data.description} as="h1" />
          <div className="compare-page-overview" aria-label={locale === "zh-cn" ? "对比页概览" : "Compare page overview"}>
            <div className="compare-page-overview__item">
              <span className="compare-page-overview__label">{locale === "zh-cn" ? "对比产品" : "Products"}</span>
              <strong className="compare-page-overview__value">{primaryProductName} vs {data.alternativeName}</strong>
            </div>
            <div className="compare-page-overview__item">
              <span className="compare-page-overview__label">{locale === "zh-cn" ? "评分维度" : "Score dimensions"}</span>
              <strong className="compare-page-overview__value">
                {locale === "zh-cn"
                  ? `${data.scoreMatrix.length} 项功能 + ${data.summaryMetrics.length} 项摘要`
                  : `${data.scoreMatrix.length} feature signals + ${data.summaryMetrics.length} summary signals`}
              </strong>
            </div>
            <div className="compare-page-overview__item">
              <span className="compare-page-overview__label">{locale === "zh-cn" ? "评测方式" : "Method"}</span>
              <strong className="compare-page-overview__value">{locale === "zh-cn" ? "10 分制 / 弱中强" : "10-point / weak-medium-strong"}</strong>
            </div>
          </div>
          <div className="detail-grid detail-grid--single compare-detail-stack">
            <article className="compare-hero-panel compare-summary-card">
              <h2 className="compare-hero-panel__title">{copy.hero.panels.summaryTitle}</h2>
              <p className="compare-summary-card__lead">{overallReview}</p>
              <p className="quote">{data.summary}</p>
              <div className="compare-total-card">
                <div className="compare-total-card__title">{copy.hero.panels.totalScoreTitle}</div>
                <div className="compare-total-card__summary">
                  {[
                    {name: primaryProductName, value: ciwiTotalStars, accentClass: "compare-total-stat--ciwi"},
                    {name: data.alternativeName, value: alternativeTotalStars, accentClass: "compare-total-stat--alternative"},
                  ].map((item) => (
                    <div key={`summary-${item.name}`} className={`compare-total-stat ${item.accentClass}`}>
                      <span className="compare-total-stat__label">{item.name}</span>
                      <strong className="compare-total-stat__value">
                        {formatTotalStarRating(item.value)}
                      </strong>
                      <span className="compare-total-stat__stars" style={getTotalStarStyle(item.value)} aria-hidden="true">
                        <span className="compare-total-stat__stars-base">★★★★★</span>
                        <span className="compare-total-stat__stars-fill">★★★★★</span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="compare-metric__rows">
                  {[
                    {name: primaryProductName, value: ciwiTotalStars, accentClass: "compare-metric__fill--ciwi"},
                    {name: data.alternativeName, value: alternativeTotalStars, accentClass: "compare-metric__fill--alternative"},
                  ].map((item, index) => (
                    <div key={`total-${item.name}`} className="compare-metric__row compare-metric__row--total">
                      <span className="compare-metric__name">{item.name}</span>
                      <div className="compare-metric__track compare-metric__track--total" aria-hidden="true">
                        <span
                          className={`compare-metric__fill ${item.accentClass}`}
                          style={getScoreBarStyle((item.value / 5) * 10, index * 100)}
                        />
                      </div>
                      <span className="compare-metric__value compare-metric__value--total">
                        {formatTotalStarRating(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="compare-metric-list">
                {data.summaryMetrics.map((metric, metricIndex) => (
                  <div key={metric.label} className="compare-metric">
                    <div className="compare-metric__header">
                      <strong>{metric.label}</strong>
                    </div>
                    <div className="compare-metric__rows">
                      {[
                        {name: primaryProductName, value: metric.ciwi, accentClass: "compare-metric__fill--ciwi"},
                        {name: data.alternativeName, value: metric.alternative, accentClass: "compare-metric__fill--alternative"},
                      ].map((item, itemIndex) => (
                        <div key={`${metric.label}-${item.name}`} className="compare-metric__row">
                          <span className="compare-metric__name">{item.name}</span>
                          <div className="compare-metric__track" aria-hidden="true">
                            <span
                              className={`compare-metric__fill ${item.accentClass}`}
                              style={getScoreBarStyle(item.value, metricIndex * 120 + itemIndex * 80)}
                            />
                          </div>
                          <span className="compare-metric__value">
                            {formatScore(item.value)} {getStrengthLabel(item.value, locale)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
            <article className="compare-hero-panel compare-bestfit-card">
              <h2 className="compare-hero-panel__title">{copy.hero.panels.bestFitTitle}</h2>
              <ul className="compare-bestfit-list">
                {data.bestFor.map((item, index) => (
                  <li key={item} className="compare-bestfit-item">
                    <span className="compare-bestfit-item__index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="compare-bestfit-item__text">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
        <section className="page-section compare-page-section compare-page-section--matrix">
          <div className="compare-score-intro">
            <div className="compare-score-intro__header">
              <div className="section-heading__eyebrow">{copy.sections.scoreTable.eyebrow}</div>
              <h2>{copy.sections.scoreTable.title}</h2>
            </div>
            <p className="compare-score-intro__description">{copy.sections.scoreTable.description}</p>
          </div>
          <div className="surface-card compare-table-card">
            <div className="compare-table-wrapper">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th scope="col">{copy.sections.scoreTable.featureLabel}</th>
                    <th scope="col">{primaryProductName}</th>
                    <th scope="col">{data.alternativeName}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.scoreMatrix.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>{renderScoreCell(row.ciwi, locale)}</td>
                      <td>{renderScoreCell(row.alternative, locale)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row">{copy.sections.scoreTable.overallLabel}</th>
                    <td>{renderScoreCell(ciwiAverage, locale)}</td>
                    <td>{renderScoreCell(alternativeAverage, locale)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>

        <section className="page-section compare-page-section compare-page-section--resources">
          <SectionHeading
            eyebrow={copy.sections.continue.eyebrow}
            title={copy.sections.continue.title}
            description={copy.sections.continue.description}
          />
          <div className="resource-grid">
            {siblingCompares.map((item) => (
              <ArticleCard
                key={item.slug}
                title={item.title}
                description={item.description}
                href={`/compare/${item.slug}`}
                meta={[...copy.sections.continue.siblingMeta]}
              />
            ))}
            <ArticleCard
              title={blogPosts[0].title}
              description={blogPosts[0].description}
              href={blogPosts[0].href}
              meta={[locale === "zh-cn" ? "博客" : "Blog", blogPosts[0].publishedAt]}
            />
            <ArticleCard
              title={helpCenterDocs[0].title}
              description={helpCenterDocs[0].description}
              href={helpCenterDocs[0].href}
              meta={helpCenterDocs[0].meta}
            />
            <ArticleCard
              title={copy.sections.continue.translatorCard.title}
              description={copy.sections.continue.translatorCard.description}
              href={copy.sections.continue.translatorCard.href}
              meta={[...copy.sections.continue.translatorCard.meta]}
            />
          </div>
        </section>

        <FaqSection
          eyebrow={copy.sections.faq.eyebrow}
          title={copy.sections.faq.title}
          description={copy.sections.faq.description}
          items={data.faq}
        />
        <FinalCtaSection
          title={copy.finalCta.title}
          description={copy.finalCta.description}
          primaryLabel={copy.finalCta.primaryLabel}
          primaryHref={copy.finalCta.primaryHref}
        />
      </PageContainer>
    </main>
  );
}

function renderScoreCell(value: number, locale: "en" | "zh-cn") {
  const tone = getScoreTone(value);

  return (
    <div className="compare-score-cell">
      <span className={`compare-score-badge compare-score-badge--${tone}`}>{getStrengthLabel(value, locale)}</span>
      <span className="compare-score-cell__value">{formatScore(value)}</span>
    </div>
  );
}
