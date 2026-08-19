import {notFound} from "next/navigation";

import {FaqSection} from "@/components/sections/FaqSection";
import {Button} from "@/components/ui/Button";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getLocalizationGuideMap, getLocalizationGuides} from "@/content/localization-guides";
import {getUiCopy} from "@/content/ui-copy";
import {localizeHref} from "@/lib/i18n";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildTechArticleSchema, buildWebPageSchema} from "@/lib/seo/schema";

type GuideDetailPageProps = {
  params: Promise<{slug: string}>;
};

function getGuidePageCopy(locale: "en" | "zh-cn") {
  return locale === "zh-cn"
    ? {
        notFound: {
          title: "页面不存在",
          description: "你访问的指南页不存在。",
          path: "/guides",
        },
        backLabel: "返回指南列表",
        hero: {
          eyebrow: "本地化指南",
          audienceLabel: "适用对象",
          segmentLabel: "所属类目",
          yearLabel: "年份",
          valueLabel: "页面重点",
          summaryLabel: "摘要",
          tocLabel: "本页目录",
          primaryCtaLabel: "安装 Ciwi",
          secondaryCtaLabel: "联系我们",
        },
        sections: {
          overview: {
            eyebrow: "类目特点",
            title: "这个类目的内容特点是什么？",
            description: "如果标题已经指向具体类目，就应该先把这个类目的购买方式、内容重点和本地化难点讲清楚。",
          },
          habits: {
            eyebrow: "国家与地区",
            title: "不同市场的用户习惯有什么差异？",
            description: "不是所有国家都用同一种表达方式。先理解用户习惯，再决定语言风格和页面重点。",
            market: "市场",
            language: "语言",
            habit: "用户习惯",
            localizationFocus: "本地化重点",
          },
          languages: {
            eyebrow: "语言建议",
            title: "建议优先覆盖哪些语言和市场？",
            description: "不要一开始就铺开所有语言，先从更有搜索需求和转化价值的市场切入。",
          },
          mistakes: {
            eyebrow: "常见错误",
            title: "这个翻译场景里最常见的错误是什么？",
            description: "这里不只是讲翻译错字，而是讲真正会伤害搜索、转化和信任的本地化错误。",
            wrongLabel: "错误示例",
            correctLabel: "更合适的做法",
            impactLabel: "业务影响",
          },
          style: {
            eyebrow: "风格控制",
            title: "如何保证翻译风格稳定？",
            description: "真正难的不是把句子翻出来，而是让整个站点在多语言下仍然像同一个品牌。",
          },
          terminology: {
            eyebrow: "术语",
            title: "哪些术语最需要本地化处理？",
            description: "这些词通常最容易被直译，但也最容易影响用户理解、搜索意图和品牌表达。",
            term: "原始术语",
            meaning: "在这个类目里的含义",
            localized: "更合适的本地化方式",
          },
          recommendations: {
            eyebrow: "补充建议",
            title: "除了翻译，还应该补哪些内容？",
            description: "这里放执行建议、内容范围和 app / workflow 推荐，让页面更像真正可落地的指南。",
            priorityLabel: "优先级",
          },
          scope: {
            eyebrow: "翻译范围",
            title: "建议优先翻译哪些内容？",
            description: "先把真正影响搜索、转化和理解效率的页面做对，再逐步扩展到更多内容。",
            priorityLabel: "优先级",
          },
          solutions: {
            eyebrow: "方案选择",
            title: "哪种本地化工作流更适合？",
            description: "帮助用户理解不同翻译方案在控制力、成本和后续维护上的区别。",
            solution: "方案",
            advantage: "优势",
            limitation: "限制",
          },
          ciwi: {
            eyebrow: "Ciwi",
            title: "基于 Ciwi 的推荐工具组合",
            description: "如果页面最后要落到工具建议，这里更适合讲 Ciwi 能解决哪些真正的多语言工作流问题。",
            featureDescription: "更适合持续做多语言店铺更新、SEO 同步和结构化内容维护。",
            stepLabel: "步骤",
          },
          checklist: {
            eyebrow: "检查清单",
            title: "上线前建议检查哪些点？",
            description: "把本地化从一次性项目变成可重复执行的检查流程，后续扩更多页面时会轻松很多。",
          },
          faq: {
            eyebrow: "FAQ",
            title: "常见问题",
            description: "补齐长尾搜索问题，并回答团队在启动本地化时最常见的疑问。",
          },
          cta: {
            eyebrow: "下一步",
            title: "准备开始做全球化了吗？",
            description: "先把高意图页面和核心市场跑通，再继续批量生成更多行业 guide 页面。",
            primaryCtaLabel: "安装 Ciwi",
            secondaryCtaLabel: "联系团队",
          },
        },
      }
    : {
        notFound: {
          title: "Page not found",
          description: "The requested guide page could not be found.",
          path: "/guides",
        },
        backLabel: "Back to guides",
        hero: {
          eyebrow: "Localization Guide",
          audienceLabel: "Audience",
          segmentLabel: "Segment",
          yearLabel: "Year",
          valueLabel: "Main value",
          summaryLabel: "Summary",
          tocLabel: "On this page",
          primaryCtaLabel: "Install Ciwi",
          secondaryCtaLabel: "Talk to us",
        },
        sections: {
          overview: {
            eyebrow: "Category",
            title: "What makes this category different",
            description: "If the title targets a specific category, start by explaining how buyers evaluate that category and what makes its localization different.",
          },
          habits: {
            eyebrow: "Markets",
            title: "How buyer habits change by market",
            description: "Different markets do not respond to the same wording in the same way. Explain the market habit before the translation advice.",
            market: "Market",
            language: "Language",
            habit: "Buyer habit",
            localizationFocus: "Localization focus",
          },
          languages: {
            eyebrow: "Language map",
            title: "Which languages and markets should you prioritize?",
            description: "Do not launch every language at once. Start with the markets that are more likely to create search demand and buying intent first.",
          },
          mistakes: {
            eyebrow: "Mistakes",
            title: "Common translation mistakes in this scenario",
            description: "Show the errors that actually hurt search performance, buying confidence, and page quality in this category.",
            wrongLabel: "Wrong example",
            correctLabel: "Better approach",
            impactLabel: "Business impact",
          },
          style: {
            eyebrow: "Style",
            title: "How to keep translation style consistent",
            description: "The hard part is not translating one sentence. It is keeping the whole site aligned with one brand voice across languages.",
          },
          terminology: {
            eyebrow: "Terminology",
            title: "Which terms need localization the most?",
            description: "These are usually the words that should not be translated literally because they shape search intent, clarity, and brand tone.",
            term: "Source term",
            meaning: "What it means in this category",
            localized: "Localized, not literal",
          },
          recommendations: {
            eyebrow: "Recommendations",
            title: "What else should you prepare?",
            description: "Use this section for execution notes, translation scope, and app or workflow recommendations.",
            priorityLabel: "Priority",
          },
          scope: {
            eyebrow: "Translation scope",
            title: "What should you translate first?",
            description: "Start with the pages that shape search visibility, conversion, and buyer understanding before expanding wider.",
            priorityLabel: "Priority",
          },
          solutions: {
            eyebrow: "Workflow options",
            title: "Which localization workflow fits best?",
            description: "Help buyers understand the tradeoffs across control, cost, and long-term maintenance.",
            solution: "Solution",
            advantage: "Advantage",
            limitation: "Limitation",
          },
          ciwi: {
            eyebrow: "Ciwi",
            title: "Recommended app setup with Ciwi",
            description: "If the page ends with a tool recommendation, use this section to explain what Ciwi solves in a real localization workflow.",
            featureDescription: "A practical fit for ongoing multilingual storefront updates, SEO sync, and structured content maintenance.",
            stepLabel: "Step",
          },
          checklist: {
            eyebrow: "Checklist",
            title: "What should you check before launch?",
            description: "Turn localization into a repeatable operating checklist so scaling more guide pages later becomes easier.",
          },
          faq: {
            eyebrow: "FAQ",
            title: "Frequently asked questions",
            description: "Cover long-tail search intent and the most common rollout questions teams ask early.",
          },
          cta: {
            eyebrow: "Next step",
            title: "Ready to expand globally?",
            description: "Start with high-intent pages and one clear market path, then scale into a broader guide library.",
            primaryCtaLabel: "Install Ciwi",
            secondaryCtaLabel: "Talk to us",
          },
        },
      };
}

export function generateStaticParams() {
  return [...new Set(getLocalizationGuides("en").map((guide) => guide.slug))].map((slug) => ({slug}));
}

export async function generateMetadata({params}: GuideDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const guide = getLocalizationGuideMap(locale)[slug];
  const copy = getGuidePageCopy(locale);

  if (!guide) {
    return buildPageMetadata({
      title: copy.notFound.title,
      description: copy.notFound.description,
      path: copy.notFound.path,
      locale,
    });
  }

  return buildPageMetadata({
    title: guide.title,
    description: guide.description,
    path: guide.href,
    locale,
  });
}

export default async function GuideDetailPage({params}: GuideDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const guide = getLocalizationGuideMap(locale)[slug];
  const copy = getGuidePageCopy(locale);
  const uiCopy = getUiCopy(locale);

  if (!guide) {
    notFound();
  }

  const pageUrl = new URL(localizeHref(locale, guide.href), siteUrl).toString();
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "本地化指南" : "Localization Guides", item: new URL(localizeHref(locale, "/guides"), siteUrl).toString()},
      {name: guide.title, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: guide.title,
      description: guide.description,
      keywords: guide.keywords,
    }),
    buildTechArticleSchema({
      url: pageUrl,
      headline: guide.title,
      description: guide.description,
      keywords: guide.keywords,
    }),
    buildFaqSchema(guide.faq),
  ];

  const tocItems = [
    {href: "#category", label: copy.sections.overview.title},
    {href: "#markets", label: copy.sections.habits.title},
    {href: "#languages", label: copy.sections.languages.title},
    {href: "#mistakes", label: copy.sections.mistakes.title},
    {href: "#style", label: copy.sections.style.title},
    {href: "#terminology", label: copy.sections.terminology.title},
    {href: "#recommendations", label: copy.sections.recommendations.title},
    {href: "#workflow", label: copy.sections.solutions.title},
    {href: "#ciwi", label: copy.sections.ciwi.title},
    {href: "#checklist", label: copy.sections.checklist.title},
    {href: "#faq", label: copy.sections.faq.title},
  ];

  return (
    <main className="guide-detail-page">
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`${guide.slug}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}

        <section className="page-section guide-hero">
          <div className="guide-hero__topbar">
            <LocalizedLink href="/guides" className="guide-backlink">
              {copy.backLabel}
            </LocalizedLink>
          </div>

          <SectionHeading
            eyebrow={copy.hero.eyebrow}
            title={guide.title}
            description={guide.description}
            as="h1"
          />

          <div className="guide-meta-grid">
            <div className="surface-card guide-meta-card">
              <span>{copy.hero.audienceLabel}</span>
              <strong>{guide.audience}</strong>
            </div>
            <div className="surface-card guide-meta-card">
              <span>{copy.hero.segmentLabel}</span>
              <strong>{guide.segmentLabel}</strong>
            </div>
            <div className="surface-card guide-meta-card">
              <span>{copy.hero.yearLabel}</span>
              <strong>{guide.year}</strong>
            </div>
          </div>

          <div className="guide-hero__layout">
            <article className="surface-card guide-hero__summary">
              <span className="guide-hero__summary-label">{copy.hero.summaryLabel}</span>
              <p>{guide.mainValue}</p>
              <div className="guide-hero__intro">
                {guide.overviewDrivers.slice(0, 3).map((item) => (
                  <p key={item.title}>{item.description}</p>
                ))}
              </div>
              <div className="guide-hero__actions">
                <Button href={uiCopy.cta.installHref}>{copy.hero.primaryCtaLabel}</Button>
                <Button href={uiCopy.cta.talkHref} variant="secondary">
                  {copy.hero.secondaryCtaLabel}
                </Button>
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

        <section id="category" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.overview.eyebrow}
            title={copy.sections.overview.title}
            description={copy.sections.overview.description}
          />
          <div className="card-grid">
            {guide.overviewDrivers.map((item) => (
              <article key={item.title} className="surface-card">
                <h3>{item.title}</h3>
                <p className="quote">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="markets" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.habits.eyebrow}
            title={copy.sections.habits.title}
            description={copy.sections.habits.description}
          />
          <div className="compare-table-card">
            <div className="compare-table-wrapper">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>{copy.sections.habits.market}</th>
                    <th>{copy.sections.habits.language}</th>
                    <th>{copy.sections.habits.habit}</th>
                    <th>{copy.sections.habits.localizationFocus}</th>
                  </tr>
                </thead>
                <tbody>
                  {guide.marketHabits.map((item) => (
                    <tr key={`${item.market}-${item.language}`}>
                      <th>{item.market}</th>
                      <td>{item.language}</td>
                      <td>{item.habit}</td>
                      <td>{item.localizationFocus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="languages" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.languages.eyebrow}
            title={copy.sections.languages.title}
            description={copy.sections.languages.description}
          />
          <div className="guide-language-grid">
            {guide.languages.map((item) => (
              <article key={`${item.market}-${item.language}-card`} className="surface-card guide-language-card">
                <span className="guide-language-card__priority">{item.priority}</span>
                <h3>{item.market}</h3>
                <p>{item.language}</p>
                <p className="quote">{item.reason}</p>
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
          <div className="card-grid">
            {guide.mistakes.map((item) => (
              <article key={item.category} className="surface-card guide-mistake-card">
                <div className="guide-chip-row">
                  <span className="guide-chip">{item.category}</span>
                  <span className="guide-chip">{item.severity}</span>
                </div>
                <p><strong>{copy.sections.mistakes.wrongLabel}:</strong> {item.wrongExample}</p>
                <p><strong>{copy.sections.mistakes.correctLabel}:</strong> {item.correct}</p>
                <p className="quote"><strong>{copy.sections.mistakes.impactLabel}:</strong> {item.impact}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="style" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.style.eyebrow}
            title={copy.sections.style.title}
            description={copy.sections.style.description}
          />
          <div className="card-grid">
            {guide.styleRules.map((item) => (
              <article key={item.title} className="surface-card">
                <h3>{item.title}</h3>
                <p className="quote">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="terminology" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.terminology.eyebrow}
            title={copy.sections.terminology.title}
            description={copy.sections.terminology.description}
          />
          <div className="compare-table-card">
            <div className="compare-table-wrapper">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>{copy.sections.terminology.term}</th>
                    <th>{copy.sections.terminology.meaning}</th>
                    <th>{copy.sections.terminology.localized}</th>
                  </tr>
                </thead>
                <tbody>
                  {guide.terminology.map((item) => (
                    <tr key={item.term}>
                      <th>{item.term}</th>
                      <td>{item.meaning}</td>
                      <td>{item.localized}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="recommendations" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.recommendations.eyebrow}
            title={copy.sections.recommendations.title}
            description={copy.sections.recommendations.description}
          />
          <div className="card-grid">
            {guide.recommendations.map((item) => (
              <article key={item.title} className="surface-card">
                <h3>{item.title}</h3>
                <p className="quote">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.sections.scope.eyebrow}
            title={copy.sections.scope.title}
            description={copy.sections.scope.description}
          />
          <div className="card-grid">
            {guide.translationScope.map((item) => (
              <article key={item.category} className="surface-card guide-list-card">
                <div className="guide-chip-row">
                  <span className="guide-chip">{item.category}</span>
                  <span className="guide-chip">{copy.sections.scope.priorityLabel}: {item.priority}</span>
                </div>
                <ul className="check-list">
                  {item.items.map((scopeItem) => (
                    <li key={scopeItem}>{scopeItem}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.solutions.eyebrow}
            title={copy.sections.solutions.title}
            description={copy.sections.solutions.description}
          />
          <div className="compare-table-card">
            <div className="compare-table-wrapper">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>{copy.sections.solutions.solution}</th>
                    <th>{copy.sections.solutions.advantage}</th>
                    <th>{copy.sections.solutions.limitation}</th>
                  </tr>
                </thead>
                <tbody>
                  {guide.solutions.map((item) => (
                    <tr key={item.name}>
                      <th>{item.name}</th>
                      <td>{item.advantages.join(", ")}</td>
                      <td>{item.limitations.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="ciwi" className="page-section">
          <div className="callout guide-callout">
            <SectionHeading
              eyebrow={copy.sections.ciwi.eyebrow}
              title={copy.sections.ciwi.title}
              description={copy.sections.ciwi.description}
            />
            <ol className="guide-steps">
              {guide.features.map((feature) => (
                <li key={feature} className="guide-steps__item">
                  <h3>{feature}</h3>
                  <p>{copy.sections.ciwi.featureDescription}</p>
                </li>
              ))}
            </ol>
            <div className="guide-callout__actions">
              <Button href={uiCopy.cta.installHref}>{copy.sections.cta.primaryCtaLabel}</Button>
              <Button href={uiCopy.cta.talkHref} variant="secondary">
                {copy.sections.cta.secondaryCtaLabel}
              </Button>
            </div>
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
              {guide.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="faq" className="page-section page-section--compact">
          <FaqSection
            eyebrow={copy.sections.faq.eyebrow}
            title={copy.sections.faq.title}
            description={copy.sections.faq.description}
            items={guide.faq}
          />
        </section>

        <section className="page-section">
          <div className="callout guide-final-cta">
            <SectionHeading
              eyebrow={copy.sections.cta.eyebrow}
              title={copy.sections.cta.title}
              description={copy.sections.cta.description}
            />
            <div className="guide-hero__actions">
              <Button href={uiCopy.cta.installHref}>{copy.sections.cta.primaryCtaLabel}</Button>
              <Button href={uiCopy.cta.talkHref} variant="secondary">
                {copy.sections.cta.secondaryCtaLabel}
              </Button>
            </div>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
