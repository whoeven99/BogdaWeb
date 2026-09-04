import {notFound} from "next/navigation";

import {FaqSection} from "@/components/sections/FaqSection";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getAvailableProductResearchLocales, getProductResearchArticleMap, getProductResearchWorkflowArticles} from "@/content/product-research";
import {getToolReviewHrefMap} from "@/content/tool-reviews";
import {localizeHref} from "@/lib/i18n";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema} from "@/lib/seo/schema";

type ProductResearchArticlePageProps = {
  params: Promise<{slug: string}>;
};

function getPageCopy(locale: "en" | "zh-cn") {
  return locale === "zh-cn"
    ? {
        notFound: {
          title: "页面不存在",
          description: "你访问的选品文章不存在。",
          path: "/resources/product-research",
        },
        backLabel: "返回选品专题",
        hero: {
          audienceLabel: "适用对象",
          stageLabel: "工作流阶段",
          yearLabel: "年份",
          summaryLabel: "摘要",
          tocLabel: "本页目录",
        },
        sections: {
          overview: {
            eyebrow: "为什么重要",
            title: "为什么这个阶段值得单独处理？",
            description: "先把这一阶段为什么关键讲清楚，再进入工具、方法和常见错误。",
          },
          tools: {
            eyebrow: "工具对比",
            title: "这个阶段用哪些工具更合适？",
            description: "按用途、价格和适配场景列出工具，而不是只给一个名字。",
            pricingLabel: "价格",
            bestForLabel: "最适合",
            strengthsLabel: "优点",
            watchoutsLabel: "注意点",
            reviewLinkLabel: "查看测评",
          },
          methods: {
            eyebrow: "执行方法",
            title: "这个阶段应该怎么做？",
            description: "把这一阶段的动作拆成可执行的步骤，而不是停留在原则层面。",
          },
          mistakes: {
            eyebrow: "常见错误",
            title: "这个阶段最容易踩哪些坑？",
            description: "这些错误之所以重要，是因为它们会直接导致选错产品、浪费预算或迟迟无法决策。",
            wrongLabel: "错误示例",
            correctLabel: "更合适的做法",
            impactLabel: "业务影响",
          },
          checklist: {
            eyebrow: "执行清单",
            title: "这个阶段应该检查哪些点？",
            description: "把动作收敛成一份清单，减少漏项。",
          },
          recommendations: {
            eyebrow: "延伸阅读",
            title: "接下来还应该看哪些阶段？",
            description: "这些相邻阶段一起看，能形成更完整的选品工作流。",
          },
          faq: {
            eyebrow: "FAQ",
            title: "常见问题",
            description: "覆盖商家在这个阶段最常问的问题。",
          },
        },
      }
    : {
        notFound: {
          title: "Page not found",
          description: "The requested product research article could not be found.",
          path: "/resources/product-research",
        },
        backLabel: "Back to product research",
        hero: {
          audienceLabel: "Audience",
          stageLabel: "Stage",
          yearLabel: "Year",
          summaryLabel: "Summary",
          tocLabel: "On this page",
        },
        sections: {
          overview: {
            eyebrow: "Why it matters",
            title: "Why this stage deserves its own workflow",
            description: "Start by explaining why this stage matters before moving into tools, methods, and common mistakes.",
          },
          tools: {
            eyebrow: "Tools",
            title: "Which tools fit this stage?",
            description: "Compare tools by purpose, price, and fit instead of just naming one.",
            pricingLabel: "Pricing",
            bestForLabel: "Best for",
            strengthsLabel: "Strengths",
            watchoutsLabel: "Watchouts",
            reviewLinkLabel: "Read review",
          },
          methods: {
            eyebrow: "Methods",
            title: "How to run this stage",
            description: "Turn the stage into executable steps instead of staying at the principle level.",
          },
          mistakes: {
            eyebrow: "Mistakes",
            title: "What goes wrong most often here?",
            description: "These mistakes matter because they lead to picking the wrong product, wasting budget, or never deciding.",
            wrongLabel: "Wrong example",
            correctLabel: "Better approach",
            impactLabel: "Business impact",
          },
          checklist: {
            eyebrow: "Checklist",
            title: "What should you check in this stage?",
            description: "Turn the actions into a checklist so nothing important gets missed.",
          },
          recommendations: {
            eyebrow: "Next stages",
            title: "What should you read next?",
            description: "These adjacent stages build a more complete product research workflow.",
          },
          faq: {
            eyebrow: "FAQ",
            title: "Frequently asked questions",
            description: "Cover the most common questions merchants ask during this stage.",
          },
        },
      };
}

function buildStructuredData(locale: "en" | "zh-cn", article: {title: string; description: string; href: string; keywords: string[]; faq: {question: string; answer: string}[]}) {
  const pageUrl = new URL(localizeHref(locale, article.href), siteUrl).toString();

  return [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "Shopify 选品" : "Product Research", item: new URL(localizeHref(locale, "/resources/product-research"), siteUrl).toString()},
      {name: article.title, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: article.title,
      description: article.description,
      keywords: article.keywords,
    }),
    buildFaqSchema(article.faq),
  ];
}

export function generateStaticParams() {
  return [...new Set([...getProductResearchWorkflowArticles("en"), ...getProductResearchWorkflowArticles("zh-cn")].map((article) => article.slug))].map(
    (slug) => ({slug}),
  );
}

export async function generateMetadata({params}: ProductResearchArticlePageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const article = getProductResearchArticleMap(locale)[slug];
  const copy = getPageCopy(locale);

  if (!article || article.stage === "overview") {
    return buildPageMetadata({
      title: copy.notFound.title,
      description: copy.notFound.description,
      path: copy.notFound.path,
      locale,
      supportedLocales: getAvailableProductResearchLocales(slug),
    });
  }

  return buildPageMetadata({
    title: article.title,
    description: article.description,
    path: article.href,
    locale,
    supportedLocales: getAvailableProductResearchLocales(slug),
  });
}

export default async function ProductResearchArticlePage({params}: ProductResearchArticlePageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const article = getProductResearchArticleMap(locale)[slug];

  if (!article || article.stage === "overview") {
    notFound();
  }

  const copy = getPageCopy(locale);
  const reviewHrefMap = getToolReviewHrefMap(locale);
  const structuredData = buildStructuredData(locale, article);
  const tocItems = [
    {href: "#overview", label: copy.sections.overview.title},
    {href: "#tools", label: copy.sections.tools.title},
    {href: "#methods", label: copy.sections.methods.title},
    {href: "#mistakes", label: copy.sections.mistakes.title},
    {href: "#checklist", label: copy.sections.checklist.title},
    {href: "#recommendations", label: copy.sections.recommendations.title},
    {href: "#faq", label: copy.sections.faq.title},
  ];

  return (
    <main className="guide-detail-page">
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`${article.slug}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}

        <section className="page-section guide-hero">
          <div className="guide-hero__topbar">
            <LocalizedLink href="/resources/product-research" className="guide-backlink">
              {copy.backLabel}
            </LocalizedLink>
          </div>

          <SectionHeading title={article.title} description={article.description} as="h1" />

          <div className="guide-meta-grid">
            <div className="surface-card guide-meta-card">
              <span>{copy.hero.audienceLabel}</span>
              <strong>{article.audience}</strong>
            </div>
            <div className="surface-card guide-meta-card">
              <span>{copy.hero.stageLabel}</span>
              <strong>{article.stageLabel}</strong>
            </div>
            <div className="surface-card guide-meta-card">
              <span>{copy.hero.yearLabel}</span>
              <strong>{article.year}</strong>
            </div>
          </div>

          <div className="guide-hero__layout">
            <article className="surface-card guide-hero__summary">
              <span className="guide-hero__summary-label">{copy.hero.summaryLabel}</span>
              <p>{article.mainValue}</p>
              <div className="guide-hero__intro">
                {article.overviewDrivers.slice(0, 3).map((item) => (
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
              <p>{article.mainValue}</p>
              <p>{article.description}</p>
            </div>
            <div className="guide-article__sections">
              {article.overviewDrivers.map((item) => (
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
            {article.tools.map((tool) => {
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
          <div className="guide-narrative-stack">
            {article.methods.map((method) => (
              <article key={method.title} className="surface-card guide-narrative-card">
                <h3>{method.title}</h3>
                <p>{method.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="mistakes" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.mistakes.eyebrow}
            title={copy.sections.mistakes.title}
            description={copy.sections.mistakes.description}
          />
          <div className="guide-narrative-stack">
            {article.mistakes.map((item) => (
              <article key={item.category} className="surface-card guide-narrative-card">
                <div className="guide-chip-row">
                  <span className="guide-chip">{item.category}</span>
                  <span className="guide-chip">{item.severity}</span>
                </div>
                <p>
                  <strong>{copy.sections.mistakes.wrongLabel}:</strong> {item.wrongExample}
                </p>
                <p>
                  <strong>{copy.sections.mistakes.correctLabel}:</strong> {item.correct}
                </p>
                <p className="quote">
                  <strong>{copy.sections.mistakes.impactLabel}:</strong> {item.impact}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="checklist" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.checklist.eyebrow}
            title={copy.sections.checklist.title}
            description={copy.sections.checklist.description}
          />
          <div className="surface-card guide-checklist">
            <ul className="check-list">
              {article.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="recommendations" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.recommendations.eyebrow}
            title={copy.sections.recommendations.title}
            description={copy.sections.recommendations.description}
          />
          <div className="guide-narrative-stack">
            {article.recommendations.map((item) => (
              <article key={item.title} className="surface-card guide-narrative-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="page-section page-section--compact">
          <FaqSection
            eyebrow={copy.sections.faq.eyebrow}
            title={copy.sections.faq.title}
            description={copy.sections.faq.description}
            items={article.faq}
          />
        </section>
      </PageContainer>
    </main>
  );
}
