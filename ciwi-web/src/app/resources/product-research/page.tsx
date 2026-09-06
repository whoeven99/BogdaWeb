import {ArticleCard} from "@/components/cards/ArticleCard";
import {FaqSection} from "@/components/sections/FaqSection";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getProductResearchHub, getProductResearchWorkflowArticles} from "@/content/product-research";
import {getToolReviewHrefMap, getToolReviews} from "@/content/tool-reviews";
import {getRequestLocale} from "@/lib/i18n-server";
import {localizeHref} from "@/lib/i18n";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema} from "@/lib/seo/schema";

function getHubCopy(locale: "en" | "zh-cn") {
  return locale === "zh-cn"
    ? {
        structuredData: {
          name: "Shopify 选品专题",
          description: "按工作流拆解的 Shopify 选品工具与策略专题。",
          keywords: ["shopify 选品工具", "电商选品工具", "product research tools"],
        },
        hero: {
          eyebrow: "Product Research",
          audienceLabel: "适用对象",
          stageLabel: "阶段数",
          yearLabel: "年份",
          summaryLabel: "摘要",
          tocLabel: "本页目录",
        },
        sections: {
          overview: {
            eyebrow: "为什么是一套工作流",
            title: "为什么选品不是一次搜索",
            description: "选品取决于需求、竞争、毛利和供给四件事。把工作流拆开，才能为每个阶段选对工具。",
          },
          tools: {
            eyebrow: "工具总览",
            title: "按工作流阶段选工具",
            description: "先按阶段看工具的用途和适配场景，再决定是否需要付费。",
            pricingLabel: "价格",
            bestForLabel: "最适合",
            strengthsLabel: "优点",
            watchoutsLabel: "注意点",
            reviewLinkLabel: "查看测评",
          },
          methods: {
            eyebrow: "四阶段工作流",
            title: "选品工作流怎么走",
            description: "四个阶段按顺序走，任何一环跳过去，后面都容易留盲区。",
          },
          stages: {
            eyebrow: "分阶段文章",
            title: "按阶段深入看",
            description: "每个阶段都有一篇独立文章，展开工具、方法和常见错误。",
          },
          reviews: {
            eyebrow: "工具测评",
            title: "常用工具独立测评",
            description: "对核心选品工具做独立测评，按评分、优缺点和最佳场景拆开看。",
            viewAllLabel: "查看全部",
          },
          faq: {
            eyebrow: "FAQ",
            title: "常见问题",
            description: "覆盖商家在选品时最常问的问题。",
          },
        },
      }
    : {
        structuredData: {
          name: "Shopify Product Research",
          description: "A workflow-based topic hub for Shopify product research tools and strategies.",
          keywords: ["best shopify product research tool", "ecommerce product research tools", "product research tools"],
        },
        hero: {
          eyebrow: "Product Research",
          audienceLabel: "Audience",
          stageLabel: "Stages",
          yearLabel: "Year",
          summaryLabel: "Summary",
          tocLabel: "On this page",
        },
        sections: {
          overview: {
            eyebrow: "Why a workflow",
            title: "Why product research is not one search",
            description: "Product selection depends on demand, competition, margin, and supply. Split the workflow so you can pick the right tool for each stage.",
          },
          tools: {
            eyebrow: "Tool overview",
            title: "Pick tools by workflow stage",
            description: "Compare tools by purpose and fit first, then decide whether a paid plan is worth it.",
            pricingLabel: "Pricing",
            bestForLabel: "Best for",
            strengthsLabel: "Strengths",
            watchoutsLabel: "Watchouts",
            reviewLinkLabel: "Read review",
          },
          methods: {
            eyebrow: "Four-stage workflow",
            title: "How the product research workflow runs",
            description: "Work through the four stages in order. Skipping any stage leaves a blind spot later.",
          },
          stages: {
            eyebrow: "Stage articles",
            title: "Go deeper by stage",
            description: "Each stage has a dedicated article covering tools, methods, and common mistakes.",
          },
          reviews: {
            eyebrow: "Tool reviews",
            title: "Independent tool reviews",
            description: "Independent reviews of core product research tools, split by score, pros and cons, and best fit.",
            viewAllLabel: "View all",
          },
          faq: {
            eyebrow: "FAQ",
            title: "Frequently asked questions",
            description: "Cover the most common questions merchants ask when doing product research.",
          },
        },
      };
}

export async function generateMetadata() {
  const locale = await getRequestLocale();

  return buildPageMetadata({
    title: locale === "zh-cn" ? "Shopify 选品工具推荐" : "Best Shopify Product Research Tools",
    description:
      locale === "zh-cn"
        ? "按需求发现、竞品拆解、利润测算和供货履约四个阶段拆解的 Shopify 选品工具与策略专题。"
        : "A workflow-based hub for Shopify product research tools, split into discovery, competitor analysis, profit validation, and sourcing.",
    path: "/resources/product-research",
    locale,
  });
}

export default async function ProductResearchHubPage() {
  const locale = await getRequestLocale();
  const hub = getProductResearchHub(locale);
  const articles = getProductResearchWorkflowArticles(locale);
  const reviews = getToolReviews(locale);
  const reviewHrefMap = getToolReviewHrefMap(locale);
  const copy = getHubCopy(locale);

  if (!hub) {
    return null;
  }

  const pageUrl = new URL(localizeHref(locale, "/resources/product-research"), siteUrl).toString();
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: copy.structuredData.name, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: copy.structuredData.name,
      description: copy.structuredData.description,
      keywords: [...hub.keywords],
      type: "CollectionPage",
    }),
    buildFaqSchema(hub.faq),
  ];

  const tocItems = [
    {href: "#overview", label: copy.sections.overview.title},
    {href: "#tools", label: copy.sections.tools.title},
    {href: "#methods", label: copy.sections.methods.title},
    {href: "#stages", label: copy.sections.stages.title},
    {href: "#reviews", label: copy.sections.reviews.title},
    {href: "#faq", label: copy.sections.faq.title},
  ];

  return (
    <main className="product-research-hub-page">
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`product-research-hub-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}

        <section className="page-section guide-hero">
          <SectionHeading eyebrow={copy.hero.eyebrow} title={hub.title} description={hub.description} as="h1" />

          <div className="guide-meta-grid">
            <div className="surface-card guide-meta-card">
              <span>{copy.hero.audienceLabel}</span>
              <strong>{hub.audience}</strong>
            </div>
            <div className="surface-card guide-meta-card">
              <span>{copy.hero.stageLabel}</span>
              <strong>{articles.length}</strong>
            </div>
            <div className="surface-card guide-meta-card">
              <span>{copy.hero.yearLabel}</span>
              <strong>{hub.year}</strong>
            </div>
          </div>

          <div className="guide-hero__layout">
            <article className="surface-card guide-hero__summary">
              <span className="guide-hero__summary-label">{copy.hero.summaryLabel}</span>
              <p>{hub.mainValue}</p>
              <div className="guide-hero__intro">
                {hub.overviewDrivers.slice(0, 3).map((item) => (
                  <p key={item.title}>{item.description}</p>
                ))}
              </div>
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

        <section id="overview" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.overview.eyebrow}
            title={copy.sections.overview.title}
            description={copy.sections.overview.description}
          />
          <div className="surface-card guide-article">
            <div className="guide-prose">
              <p>{hub.mainValue}</p>
            </div>
            <div className="guide-article__sections">
              {hub.overviewDrivers.map((item) => (
                <article key={item.title} className="guide-article__section">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="tools" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.tools.eyebrow}
            title={copy.sections.tools.title}
            description={copy.sections.tools.description}
          />
          <div className="guide-solution-stack">
            {hub.tools.map((tool) => {
              const reviewHref = reviewHrefMap.get(tool.name);
              return (
                <article key={tool.name} className="surface-card guide-solution-card">
                  <div className="guide-chip-row">
                    <span className="guide-chip">
                      {copy.sections.tools.pricingLabel}: {tool.pricing}
                    </span>
                    <span className="guide-chip">
                      {copy.sections.tools.bestForLabel}: {tool.bestFor}
                    </span>
                  </div>
                  <h3>{tool.name}</h3>
                  <div className="guide-solution-card__columns">
                    <div>
                      <span className="guide-hero__summary-label">{copy.sections.tools.strengthsLabel}</span>
                      <ul className="check-list">
                        {tool.strengths.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="guide-hero__summary-label">{copy.sections.tools.watchoutsLabel}</span>
                      <ul className="check-list">
                        {tool.watchouts.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {reviewHref ? (
                    <div className="space-top-lg">
                      <LocalizedLink href={reviewHref} className="site-nav__link">
                        {copy.sections.tools.reviewLinkLabel}
                      </LocalizedLink>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        <section id="methods" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.methods.eyebrow}
            title={copy.sections.methods.title}
            description={copy.sections.methods.description}
          />
          <ol className="guide-narrative-stack">
            {hub.methods.map((method) => (
              <li key={method.title} className="surface-card guide-narrative-card">
                <h3>{method.title}</h3>
                <p>{method.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="stages" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.stages.eyebrow}
            title={copy.sections.stages.title}
            description={copy.sections.stages.description}
          />
          <div className="resource-grid">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                description={article.description}
                href={article.href}
                meta={[article.stageLabel, String(article.year)]}
              />
            ))}
          </div>
        </section>

        <section id="reviews" className="page-section">
          <div className="section-heading">
            <div className="section-heading__eyebrow">{copy.sections.reviews.eyebrow}</div>
            <h2>
              <LocalizedLink href="/resources/product-research/reviews">{copy.sections.reviews.title}</LocalizedLink>
            </h2>
            <p>{copy.sections.reviews.description}</p>
          </div>
          <div className="resource-grid">
            {reviews.slice(0, 6).map((review) => (
              <ArticleCard
                key={review.slug}
                title={review.title}
                description={review.description}
                href={review.href}
                meta={[review.categoryLabel, `${review.rating}/10`, String(review.year)]}
              />
            ))}
          </div>
          {reviews.length > 6 ? (
            <div className="resources-section__cta">
              <LocalizedLink href="/resources/product-research/reviews" className="site-nav__link">
                {copy.sections.reviews.viewAllLabel}
              </LocalizedLink>
            </div>
          ) : null}
        </section>

        <section id="faq" className="page-section page-section--compact">
          <FaqSection
            eyebrow={copy.sections.faq.eyebrow}
            title={copy.sections.faq.title}
            description={copy.sections.faq.description}
            items={hub.faq}
          />
        </section>
      </PageContainer>
    </main>
  );
}
