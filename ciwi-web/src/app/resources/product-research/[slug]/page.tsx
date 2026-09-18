import {notFound} from "next/navigation";

import {FaqSection} from "@/components/sections/FaqSection";
import {ComparisonCardStack} from "@/components/sections/ComparisonCardStack";
import {BackLink} from "@/components/ui/BackLink";
import {CardCtaLink} from "@/components/ui/CardCtaLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getAvailableProductResearchLocales, getProductResearchArticleMap, getProductResearchWorkflowArticles, type ProductResearchArticle} from "@/content/product-research";
import {getToolReviewHrefMap} from "@/content/tool-reviews";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildTechArticleSchema, buildWebPageSchema, buildGraphSchema} from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

type ProductResearchArticlePageProps = {
  params: Promise<{slug: string}>;
};

type LinkedProductResearchRecommendation = ProductResearchArticle["recommendations"][number] & {
  href: string;
};

function buildProductResearchNarrative({
  locale,
  article,
}: {
  locale: "en" | "zh-cn";
  article: ProductResearchArticle;
}) {
  const toolNames = article.tools.slice(0, 3).map((item) => item.name).join(locale === "zh-cn" ? "、" : ", ");
  const methodTitles = article.methods.slice(0, 2).map((item) => item.title).join(locale === "zh-cn" ? "、" : ", ");
  const recommendationTitles = article.recommendations.slice(0, 2).map((item) => item.title).join(locale === "zh-cn" ? "、" : ", ");

  if (locale === "zh-cn") {
    return [
      `${article.mainValue} 这个阶段页的重点，是把一个容易被笼统讨论的选品问题拆成具体动作，帮助你判断当前到底该先看工具、先看方法，还是先排除明显错误。`,
      toolNames
        ? `在这个阶段里，像 ${toolNames} 这样的工具只是辅助手段，真正关键的是按 ${methodTitles || "阶段方法"} 这样的顺序推进，否则很容易在数据很多时依然无法做决定。`
        : `这个阶段里，工具只是辅助手段，真正关键的是按阶段方法顺序推进。`,
      recommendationTitles
        ? `如果你读完本页还没拿准下一步，通常可以继续看 ${recommendationTitles} 这些相邻阶段，把单点判断连成完整选品流程。`
        : "如果你读完本页还没拿准下一步，通常需要继续看相邻阶段，把单点判断连成完整选品流程。",
    ];
  }

  return [
    `${article.mainValue} The point of a stage page like this is to turn a broad product-research problem into concrete actions so you can see whether the next move is a tool check, a method step, or a mistake to avoid first.`,
    toolNames
      ? `Tools such as ${toolNames} are useful in this stage, but they are still supporting layers. The harder part is moving through steps such as ${methodTitles || "the core stage methods"} in the right order so more data actually leads to a decision.`
      : "Tools in this stage are supporting layers. The harder part is moving through the stage methods in the right order so more data actually leads to a decision.",
    recommendationTitles
      ? `If this page still leaves the next move unclear, the usual follow-up is to continue into adjacent stages such as ${recommendationTitles} so one decision point becomes a fuller product research workflow.`
      : "If this page still leaves the next move unclear, the usual follow-up is to continue into the adjacent stages so one decision point becomes a fuller product research workflow.",
  ];
}

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
            ctaLabel: "打开这篇文章",
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
            ctaLabel: "Open this article",
          },
          faq: {
            eyebrow: "FAQ",
            title: "Frequently asked questions",
            description: "Cover the most common questions merchants ask during this stage.",
          },
        },
      };
}

function buildStructuredData(locale: "en" | "zh-cn", article: {title: string; description: string; href: string; publishedAt: string; keywords: string[]; faq: {question: string; answer: string}[]}) {
  const pageUrl = toAbsoluteLocalizedUrl(locale, article.href);

  return buildGraphSchema([
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "Shopify 选品" : "Product Research", item: toAbsoluteLocalizedUrl(locale, "/resources/product-research")},
      {name: article.title, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: article.title,
      description: article.description,
      keywords: article.keywords,
    }),
    buildTechArticleSchema({
      url: pageUrl,
      headline: article.title,
      description: article.description,
      datePublished: article.publishedAt,
      keywords: article.keywords,
    }),
    buildFaqSchema(article.faq),
  ]);
}

function resolveProductResearchRecommendationHref(locale: "en" | "zh-cn", title: string) {
  const normalizedTitle = title.trim().toLowerCase();

  if (locale === "zh-cn") {
    if (normalizedTitle.includes("shopify 选品工具推荐")) {
      return "/resources/product-research";
    }
    if (normalizedTitle.includes("免费和 ai 选品工具")) {
      return "/resources/product-research/product-research-tools-free";
    }
    if (normalizedTitle.includes("reddit 推荐的 shopify 选品工具")) {
      return "/resources/product-research/shopify-product-research-tool-reddit";
    }
    if (normalizedTitle.includes("代发货利润选品工具")) {
      return "/resources/product-research/best-product-research-tools-for-dropshipping";
    }
    if (normalizedTitle.includes("etsy 选品")) {
      return "/resources/product-research/product-research-etsy";
    }

    return undefined;
  }

  if (normalizedTitle.includes("best shopify product research tools")) {
    return "/resources/product-research";
  }
  if (normalizedTitle.includes("free and ai product research tools")) {
    return "/resources/product-research/product-research-tools-free";
  }
  if (normalizedTitle.includes("reddit recommends for shopify research")) {
    return "/resources/product-research/shopify-product-research-tool-reddit";
  }
  if (normalizedTitle.includes("product research tools for dropshipping profit")) {
    return "/resources/product-research/best-product-research-tools-for-dropshipping";
  }
  if (normalizedTitle.includes("etsy product research")) {
    return "/resources/product-research/product-research-etsy";
  }

  return undefined;
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
  const narrative = buildProductResearchNarrative({locale, article});
  const linkedRecommendations = article.recommendations
    .map((item) => ({
      ...item,
      href: resolveProductResearchRecommendationHref(locale, item.title),
    }))
    .filter((item): item is LinkedProductResearchRecommendation => Boolean(item.href) && item.href !== article.href);
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />

        <section className="py-8 sm:py-10 lg:py-12">
          <div className="mx-auto max-w-5xl">
            <BackLink href="/resources/product-research" label={copy.backLabel} />
            <div className="mt-5 sm:mt-6">
              <SectionHeading title={article.title} description={article.description} as="h1" />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                {label: copy.hero.audienceLabel, value: article.audience},
                {label: copy.hero.stageLabel, value: article.stageLabel},
                {label: copy.hero.yearLabel, value: article.year},
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
          <ComparisonCardStack
            cards={article.tools.map((tool) => {
              const reviewHref = reviewHrefMap.get(tool.name);

              return {
                title: tool.name,
                chips: [
                  `${copy.sections.tools.pricingLabel}: ${tool.pricing}`,
                  `${copy.sections.tools.bestForLabel}: ${tool.bestFor}`,
                ],
                columns: [
                  {
                    label: copy.sections.tools.strengthsLabel,
                    items: tool.strengths,
                  },
                  {
                    label: copy.sections.tools.watchoutsLabel,
                    items: tool.watchouts,
                  },
                ],
                footer: reviewHref ? <CardCtaLink href={reviewHref}>{copy.sections.tools.reviewLinkLabel}</CardCtaLink> : undefined,
              };
            })}
          />
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
            {linkedRecommendations.map((item) => (
              <article key={item.title} className="surface-card guide-narrative-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="mt-4">
                  <CardCtaLink href={item.href}>{copy.sections.recommendations.ctaLabel}</CardCtaLink>
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
            items={article.faq}
          />
        </section>
      </PageContainer>
    </main>
  );
}
