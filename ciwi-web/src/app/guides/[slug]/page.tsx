import {notFound} from "next/navigation";

import {FaqSection} from "@/components/sections/FaqSection";
import {Button} from "@/components/ui/Button";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getFunctionScenarioGuideMap, getFunctionScenarioGuides} from "@/content/function-scenario-guides";
import {getLocalizationGuideMap, getLocalizationGuides} from "@/content/localization-guides";
import {getUiCopy} from "@/content/ui-copy";
import {localizeHref} from "@/lib/i18n";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildTechArticleSchema, buildWebPageSchema} from "@/lib/seo/schema";

type GuideDetailPageProps = {
  params: Promise<{slug: string}>;
};

function getLocalizationGuidePageCopy(locale: "en" | "zh-cn") {
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

function getFunctionScenarioPageCopy(locale: "en" | "zh-cn") {
  return locale === "zh-cn"
    ? {
        notFound: {
          title: "页面不存在",
          description: "你访问的功能场景指南不存在。",
          path: "/guides",
        },
        backLabel: "返回指南列表",
        hero: {
          eyebrow: "功能场景指南",
          audienceLabel: "适用对象",
          topicLabel: "主题",
          yearLabel: "年份",
          summaryLabel: "摘要",
          tocLabel: "本页目录",
          primaryCtaLabel: "安装 Ciwi",
          secondaryCtaLabel: "联系我们",
        },
        sections: {
          overview: {
            eyebrow: "场景价值",
            title: "为什么这个翻译场景值得单独处理？",
            description: "先把这个页面为什么重要讲清楚，再进入翻译范围、错误和执行方法。",
          },
          scope: {
            eyebrow: "翻译范围",
            title: "这个功能场景应该先翻哪些内容？",
            description: "按照用户真正会看到、会影响转化和会影响 SEO 的优先级去拆翻译范围。",
            priorityLabel: "优先级",
          },
          mistakes: {
            eyebrow: "常见错误",
            title: "这个功能场景最容易踩哪些坑？",
            description: "这里重点不是语法错误，而是会直接影响体验、SEO 和转化的问题。",
            wrongLabel: "错误示例",
            correctLabel: "更合适的做法",
            impactLabel: "业务影响",
          },
          workflow: {
            eyebrow: "方案选择",
            title: "用哪种方式处理这个场景更合适？",
            description: "帮助用户在手工处理、翻译 app 和自定义开发之间做选择。",
            solution: "方案",
            advantage: "优势",
            limitation: "限制",
          },
          checklist: {
            eyebrow: "执行清单",
            title: "上线前应该检查哪些点？",
            description: "把操作顺序和 QA 节点整理成清晰的执行清单，减少漏项。",
          },
          ciwi: {
            eyebrow: "Ciwi",
            title: "Ciwi 在这个场景里能做什么？",
            description: "把产品能力翻成用户能理解的工作流收益，而不是只列功能名。",
            featureDescription: "更适合做批量翻译、结构化内容同步和多市场持续更新。",
          },
          recommendations: {
            eyebrow: "延伸阅读",
            title: "接下来还应该看哪些相关场景？",
            description: "这些内容适合继续往下看，形成更完整的 Shopify 多语言工作流。",
          },
          faq: {
            eyebrow: "FAQ",
            title: "常见问题",
            description: "覆盖用户在执行这个功能场景时最常问的问题。",
          },
          cta: {
            eyebrow: "下一步",
            title: "准备把这个场景真正跑起来了吗？",
            description: "先从最影响用户体验和转化的 Shopify 场景开始，再把翻译流程扩到更多页面和市场。",
            primaryCtaLabel: "安装 Ciwi",
            secondaryCtaLabel: "联系团队",
          },
        },
      }
    : {
        notFound: {
          title: "Page not found",
          description: "The requested function scenario guide could not be found.",
          path: "/guides",
        },
        backLabel: "Back to guides",
        hero: {
          eyebrow: "Function Scenario Guide",
          audienceLabel: "Audience",
          topicLabel: "Topic",
          yearLabel: "Year",
          summaryLabel: "Summary",
          tocLabel: "On this page",
          primaryCtaLabel: "Install Ciwi",
          secondaryCtaLabel: "Talk to us",
        },
        sections: {
          overview: {
            eyebrow: "Why it matters",
            title: "Why this translation scenario deserves its own workflow",
            description: "Start by explaining why this Shopify surface matters before moving into scope, errors, and rollout method.",
          },
          scope: {
            eyebrow: "Translation scope",
            title: "What should you translate first in this scenario?",
            description: "Prioritize the fields and surfaces that customers actually see, that shape conversion, and that influence SEO.",
            priorityLabel: "Priority",
          },
          mistakes: {
            eyebrow: "Mistakes",
            title: "What goes wrong most often here?",
            description: "Focus on the issues that break UX, hurt SEO, or reduce conversion, not just language quality in isolation.",
            wrongLabel: "Wrong example",
            correctLabel: "Better approach",
            impactLabel: "Business impact",
          },
          workflow: {
            eyebrow: "Workflow options",
            title: "Which setup fits this scenario best?",
            description: "Help buyers decide between manual handling, translation apps, and custom development.",
            solution: "Solution",
            advantage: "Advantage",
            limitation: "Limitation",
          },
          checklist: {
            eyebrow: "Checklist",
            title: "What should you verify before launch?",
            description: "Turn the rollout into a practical execution checklist so QA is easier and nothing important gets missed.",
          },
          ciwi: {
            eyebrow: "Ciwi",
            title: "What Ciwi helps automate here",
            description: "Translate product capabilities into workflow outcomes users can actually understand and act on.",
            featureDescription: "A practical fit for bulk translation, structured content sync, and ongoing multi-market updates.",
          },
          recommendations: {
            eyebrow: "Next topics",
            title: "What should you read next?",
            description: "These related topics help build a more complete Shopify localization workflow after this scenario.",
          },
          faq: {
            eyebrow: "FAQ",
            title: "Frequently asked questions",
            description: "Cover the most common execution questions users ask when working through this scenario.",
          },
          cta: {
            eyebrow: "Next step",
            title: "Ready to operationalize this workflow?",
            description: "Start with the Shopify surfaces that affect UX and conversion most, then scale the workflow into more markets and content types.",
            primaryCtaLabel: "Install Ciwi",
            secondaryCtaLabel: "Talk to us",
          },
        },
      };
}

function buildGuideStructuredData(
  locale: "en" | "zh-cn",
  guide: {title: string; description: string; href: string; keywords: string[]; faq: {question: string; answer: string}[]}
) {
  const pageUrl = new URL(localizeHref(locale, guide.href), siteUrl).toString();

  return {
    pageUrl,
    structuredData: [
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
    ],
  };
}

function formatNaturalList(items: string[]) {
  if (items.length <= 1) {
    return items[0] ?? "";
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function getFunctionScenarioNarrativeCopy(locale: "en" | "zh-cn") {
  return locale === "zh-cn"
    ? {
        overviewLead: "这类功能场景不是把几个字段翻译出来就结束了，它通常会直接影响用户是否愿意继续浏览、是否能理解页面信息，以及是否会在结账前流失。",
        scopeLead: "翻译范围最好按用户实际看到的路径去拆，而不是按后台字段名去拆。先把真正影响理解和转化的内容覆盖掉，再扩到补充模块。",
        mistakesLead: "下面这些错误之所以重要，不是因为它们语法不对，而是因为它们会让页面显得不可信、流程不连贯，或者直接损失 SEO 与转化。",
        workflowLead: "不同团队适合的工作流不一样。关键不是选最强的方案，而是选当前团队能稳定维护、能随着内容更新持续运行的方案。",
        checklistLead: "如果你准备真正上线这个功能场景，最好把下面这些动作当成一个完整的发布清单，而不是零散地做几项设置。",
        ciwiLead: "如果你想把这个场景做成可持续更新的流程，而不是一次性处理，下面这些 Ciwi 能力会更有帮助。",
        recommendationsLead: "做完这个页面之后，通常还会有一批相邻场景需要一起处理。继续往下看这些主题，工作流会更完整。",
        criticalLabel: "核心层",
        importantLabel: "重要层",
      }
    : {
        overviewLead:
          "This scenario is not just about translating a few strings. It usually shapes whether shoppers understand the page, trust the storefront, and continue far enough to convert.",
        scopeLead:
          "The translation scope should follow the customer journey, not just the Shopify field list. Start with the surfaces that affect understanding and conversion first, then expand into supporting modules.",
        mistakesLead:
          "These mistakes matter because they do more than create awkward language. They make the experience feel unreliable, disconnect the workflow, or quietly reduce SEO and conversion.",
        workflowLead:
          "There is no single best setup for every team. The right choice is the one your team can maintain consistently as content changes and more markets are added.",
        checklistLead:
          "If you are ready to publish this scenario, treat the steps below as one release checklist instead of a few disconnected settings.",
        ciwiLead:
          "If you want this scenario to become an ongoing workflow instead of a one-time cleanup, these Ciwi capabilities are the parts that usually help most.",
        recommendationsLead:
          "Once this page is handled, the next step is usually a cluster of adjacent Shopify surfaces. These related topics help turn one translated page into a fuller multilingual workflow.",
        criticalLabel: "Critical layer",
        importantLabel: "Important layer",
      };
}

function getLocalizationNarrativeCopy(locale: "en" | "zh-cn") {
  return locale === "zh-cn"
    ? {
        overviewLead: "如果这个页面已经明确指向某个类目，那么真正重要的不是先列模块，而是先把这个类目的购买逻辑、内容重点和本地化难点讲清楚。",
        marketsLead: "同一个类目在不同市场，用户关注点、表达习惯和信任判断都不一样。先理解这些差异，再决定怎么翻、翻到什么程度。",
        languagesLead: "语言优先级不应该只看人口规模，而要看这个类目在当地是否有更明确的搜索需求、购买习惯和品牌接受度。",
        mistakesLead: "下面这些错误并不是简单的翻译失误，它们往往会直接影响用户是否理解产品、是否信任品牌，以及是否愿意继续下单。",
        styleLead: "真正难的不是把页面翻出来，而是让整个站点在不同语言下仍然像同一个品牌在说话。",
        terminologyLead: "术语往往是类目里最容易被直译、但也最容易影响搜索意图和用户理解的部分。",
        recommendationsLead: "真正有效的本地化通常不止是翻译正文，还包括执行顺序、补充内容和工具搭配。",
        scopeLead: "翻译范围最好先覆盖最影响搜索、转化和理解的部分，再逐步扩到支持性内容，而不是一开始平均铺开。",
        workflowLead: "不同团队适合的本地化方案不一样。关键不是理论上最完整，而是当前团队是否能稳定维护并持续更新。",
        checklistLead: "如果准备把这个类目真正推向新市场，最好把上线前检查变成固定动作，而不是临时补漏。",
        ciwiLead: "如果最后要落到工具建议，重点应该是它能帮你把哪些多语言工作流长期跑起来。",
        criticalLabel: "核心层",
        importantLabel: "重要层",
      }
    : {
        overviewLead:
          "If the page targets a specific category, the first job is not listing modules. It is explaining how buyers evaluate that category and why its localization is different.",
        marketsLead:
          "The same category behaves differently across markets. Buyer expectations, trust signals, and wording habits all shift, so the localization advice has to shift with them.",
        languagesLead:
          "Language priority is not only about market size. It should reflect where this category has clearer search demand, stronger buying behavior, and better brand fit.",
        mistakesLead:
          "These are not just translation errors in isolation. They often change whether customers understand the product, trust the brand, and continue far enough to buy.",
        styleLead:
          "The hard part is not translating a page once. It is making the whole storefront still feel like one brand across multiple languages and product pages.",
        terminologyLead:
          "Terminology is where category nuance usually gets lost first. These are the terms most likely to be translated literally even when they shape search intent and clarity.",
        recommendationsLead:
          "Useful localization work usually goes beyond the translated paragraph. It also includes rollout order, supporting content, and the tools that keep the workflow repeatable.",
        scopeLead:
          "The scope should start with the pages that shape search visibility, conversion, and comprehension, then expand into supporting content instead of spreading effort evenly from day one.",
        workflowLead:
          "The right localization setup depends on what your team can maintain over time. The best option is the one that survives ongoing catalog changes and new market rollouts.",
        checklistLead:
          "If this category is about to launch in a new market, the checks below should work like a release routine instead of a last-minute cleanup pass.",
        ciwiLead:
          "If the page ends with a tool recommendation, the focus should be on which multilingual workflows it helps your team run continuously.",
        criticalLabel: "Critical layer",
        importantLabel: "Important layer",
      };
}

function renderLocalizationGuidePage(
  locale: "en" | "zh-cn",
  guide: ReturnType<typeof getLocalizationGuides>[number],
  uiCopy: ReturnType<typeof getUiCopy>
) {
  const copy = getLocalizationGuidePageCopy(locale);
  const articleCopy = getLocalizationNarrativeCopy(locale);
  const {structuredData} = buildGuideStructuredData(locale, guide);
  const criticalScope = guide.translationScope.find((item) => item.category.toLowerCase() === "critical") ?? guide.translationScope[0];
  const importantScope = guide.translationScope.find((item) => item.category.toLowerCase() === "important") ?? guide.translationScope[1];
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

          <SectionHeading eyebrow={copy.hero.eyebrow} title={guide.title} description={guide.description} as="h1" />

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
          <div className="surface-card guide-article">
            <div className="guide-prose">
              <p className="guide-article__lede">{articleCopy.overviewLead}</p>
              <p>{guide.mainValue}</p>
              <p>{guide.description}</p>
            </div>
            <div className="guide-article__sections">
              {guide.overviewDrivers.map((item) => (
                <article key={item.title} className="guide-article__section">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="markets" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.habits.eyebrow}
            title={copy.sections.habits.title}
            description={copy.sections.habits.description}
          />
          <div className="guide-article-layout">
            <article className="surface-card guide-article">
              <div className="guide-prose">
                <p className="guide-article__lede">{articleCopy.marketsLead}</p>
              </div>
            </article>
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
          </div>
        </section>

        <section id="languages" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.languages.eyebrow}
            title={copy.sections.languages.title}
            description={copy.sections.languages.description}
          />
          <div className="guide-article-layout">
            <article className="surface-card guide-article">
              <div className="guide-prose">
                <p className="guide-article__lede">{articleCopy.languagesLead}</p>
              </div>
            </article>
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
          </div>
        </section>

        <section id="mistakes" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.mistakes.eyebrow}
            title={copy.sections.mistakes.title}
            description={copy.sections.mistakes.description}
          />
          <div className="guide-article-layout">
            <article className="surface-card guide-article">
              <div className="guide-prose">
                <p className="guide-article__lede">{articleCopy.mistakesLead}</p>
              </div>
            </article>
            <div className="guide-narrative-stack">
              {guide.mistakes.map((item) => (
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
          </div>
        </section>

        <section id="style" className="page-section">
          <SectionHeading eyebrow={copy.sections.style.eyebrow} title={copy.sections.style.title} description={copy.sections.style.description} />
          <div className="guide-article-layout">
            <article className="surface-card guide-article">
              <div className="guide-prose">
                <p className="guide-article__lede">{articleCopy.styleLead}</p>
              </div>
            </article>
            <div className="guide-narrative-stack">
              {guide.styleRules.map((item) => (
                <article key={item.title} className="surface-card guide-narrative-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="terminology" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.terminology.eyebrow}
            title={copy.sections.terminology.title}
            description={copy.sections.terminology.description}
          />
          <div className="guide-article-layout">
            <article className="surface-card guide-article">
              <div className="guide-prose">
                <p className="guide-article__lede">{articleCopy.terminologyLead}</p>
              </div>
            </article>
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
          </div>
        </section>

        <section id="recommendations" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.recommendations.eyebrow}
            title={copy.sections.recommendations.title}
            description={copy.sections.recommendations.description}
          />
          <div className="guide-article-layout">
            <article className="surface-card guide-article">
              <div className="guide-prose">
                <p className="guide-article__lede">{articleCopy.recommendationsLead}</p>
              </div>
            </article>
            <div className="guide-narrative-stack">
              {guide.recommendations.map((item) => (
                <article key={item.title} className="surface-card guide-narrative-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section">
          <SectionHeading eyebrow={copy.sections.scope.eyebrow} title={copy.sections.scope.title} description={copy.sections.scope.description} />
          <div className="guide-article-layout">
            <article className="surface-card guide-article">
              <div className="guide-prose">
                <p className="guide-article__lede">{articleCopy.scopeLead}</p>
                {criticalScope ? (
                  <p>
                    <strong>{articleCopy.criticalLabel}:</strong> {formatNaturalList(criticalScope.items)}.
                  </p>
                ) : null}
                {importantScope ? (
                  <p>
                    <strong>{articleCopy.importantLabel}:</strong> {formatNaturalList(importantScope.items)}.
                  </p>
                ) : null}
              </div>
            </article>
            <div className="card-grid">
              {guide.translationScope.map((item) => (
                <article key={item.category} className="surface-card guide-list-card">
                  <div className="guide-chip-row">
                    <span className="guide-chip">{item.category}</span>
                    <span className="guide-chip">
                      {copy.sections.scope.priorityLabel}: {item.priority}
                    </span>
                  </div>
                  <ul className="check-list">
                    {item.items.map((scopeItem) => (
                      <li key={scopeItem}>{scopeItem}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.solutions.eyebrow}
            title={copy.sections.solutions.title}
            description={copy.sections.solutions.description}
          />
          <div className="guide-article-layout">
            <article className="surface-card guide-article">
              <div className="guide-prose">
                <p className="guide-article__lede">{articleCopy.workflowLead}</p>
                <p>{guide.solutions.map((item) => item.name).join(" / ")}</p>
              </div>
            </article>
            <div className="guide-solution-stack">
              {guide.solutions.map((item) => (
                <article key={item.name} className="surface-card guide-solution-card">
                  <h3>{item.name}</h3>
                  <div className="guide-solution-card__columns">
                    <div>
                      <span className="guide-hero__summary-label">{copy.sections.solutions.advantage}</span>
                      <ul className="check-list">
                        {item.advantages.map((advantage) => (
                          <li key={advantage}>{advantage}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="guide-hero__summary-label">{copy.sections.solutions.limitation}</span>
                      <ul className="check-list">
                        {item.limitations.map((limitation) => (
                          <li key={limitation}>{limitation}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ciwi" className="page-section">
          <div className="callout guide-callout">
            <SectionHeading eyebrow={copy.sections.ciwi.eyebrow} title={copy.sections.ciwi.title} description={copy.sections.ciwi.description} />
            <div className="guide-prose">
              <p className="guide-article__lede">{articleCopy.ciwiLead}</p>
            </div>
            <div className="surface-card guide-feature-list">
              <ul className="check-list">
                {guide.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
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
          <div className="guide-article-layout">
            <article className="surface-card guide-article">
              <div className="guide-prose">
                <p className="guide-article__lede">{articleCopy.checklistLead}</p>
              </div>
            </article>
            <div className="surface-card guide-checklist">
              <ul className="check-list">
                {guide.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="faq" className="page-section page-section--compact">
          <FaqSection eyebrow={copy.sections.faq.eyebrow} title={copy.sections.faq.title} description={copy.sections.faq.description} items={guide.faq} />
        </section>

        <section className="page-section">
          <div className="callout guide-final-cta">
            <SectionHeading eyebrow={copy.sections.cta.eyebrow} title={copy.sections.cta.title} description={copy.sections.cta.description} />
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

function renderFunctionScenarioGuidePage(
  locale: "en" | "zh-cn",
  guide: ReturnType<typeof getFunctionScenarioGuides>[number],
  uiCopy: ReturnType<typeof getUiCopy>
) {
  const copy = getFunctionScenarioPageCopy(locale);
  const articleCopy = getFunctionScenarioNarrativeCopy(locale);
  const {structuredData} = buildGuideStructuredData(locale, guide);
  const criticalScope = guide.translationScope.find((item) => item.category.toLowerCase() === "critical") ?? guide.translationScope[0];
  const importantScope = guide.translationScope.find((item) => item.category.toLowerCase() === "important") ?? guide.translationScope[1];
  const tocItems = [
    {href: "#overview", label: copy.sections.overview.title},
    {href: "#scope", label: copy.sections.scope.title},
    {href: "#mistakes", label: copy.sections.mistakes.title},
    {href: "#workflow", label: copy.sections.workflow.title},
    {href: "#checklist", label: copy.sections.checklist.title},
    {href: "#ciwi", label: copy.sections.ciwi.title},
    {href: "#recommendations", label: copy.sections.recommendations.title},
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

          <SectionHeading eyebrow={copy.hero.eyebrow} title={guide.title} description={guide.description} as="h1" />

          <div className="guide-meta-grid">
            <div className="surface-card guide-meta-card">
              <span>{copy.hero.audienceLabel}</span>
              <strong>{guide.audience}</strong>
            </div>
            <div className="surface-card guide-meta-card">
              <span>{copy.hero.topicLabel}</span>
              <strong>{guide.topic}</strong>
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

        <section id="overview" className="page-section">
          <SectionHeading eyebrow={copy.sections.overview.eyebrow} title={copy.sections.overview.title} description={copy.sections.overview.description} />
          <div className="surface-card guide-article">
            <div className="guide-prose">
              <p className="guide-article__lede">{articleCopy.overviewLead}</p>
              <p>{guide.mainValue}</p>
              <p>{guide.description}</p>
            </div>
            <div className="guide-article__sections">
              {guide.overviewDrivers.map((item) => (
                <article key={item.title} className="guide-article__section">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="scope" className="page-section">
          <SectionHeading eyebrow={copy.sections.scope.eyebrow} title={copy.sections.scope.title} description={copy.sections.scope.description} />
          <div className="guide-article-layout">
            <article className="surface-card guide-article">
              <div className="guide-prose">
                <p className="guide-article__lede">{articleCopy.scopeLead}</p>
                {criticalScope ? (
                  <p>
                    <strong>{articleCopy.criticalLabel}:</strong> {formatNaturalList(criticalScope.items)}.
                  </p>
                ) : null}
                {importantScope ? (
                  <p>
                    <strong>{articleCopy.importantLabel}:</strong> {formatNaturalList(importantScope.items)}.
                  </p>
                ) : null}
              </div>
            </article>
            <div className="card-grid">
              {guide.translationScope.map((item) => (
                <article key={item.category} className="surface-card guide-list-card">
                  <div className="guide-chip-row">
                    <span className="guide-chip">{item.category}</span>
                    <span className="guide-chip">
                      {copy.sections.scope.priorityLabel}: {item.priority}
                    </span>
                  </div>
                  <ul className="check-list">
                    {item.items.map((scopeItem) => (
                      <li key={scopeItem}>{scopeItem}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="mistakes" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.mistakes.eyebrow}
            title={copy.sections.mistakes.title}
            description={copy.sections.mistakes.description}
          />
          <div className="guide-article-layout">
            <article className="surface-card guide-article">
              <div className="guide-prose">
                <p className="guide-article__lede">{articleCopy.mistakesLead}</p>
              </div>
            </article>
            <div className="guide-narrative-stack">
              {guide.mistakes.map((item) => (
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
          </div>
        </section>

        <section id="workflow" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.workflow.eyebrow}
            title={copy.sections.workflow.title}
            description={copy.sections.workflow.description}
          />
          <div className="guide-article-layout">
            <article className="surface-card guide-article">
              <div className="guide-prose">
                <p className="guide-article__lede">{articleCopy.workflowLead}</p>
                <p>{guide.solutions.map((item) => item.name).join(" / ")}</p>
              </div>
            </article>
            <div className="guide-solution-stack">
              {guide.solutions.map((item) => (
                <article key={item.name} className="surface-card guide-solution-card">
                  <h3>{item.name}</h3>
                  <div className="guide-solution-card__columns">
                    <div>
                      <span className="guide-hero__summary-label">{copy.sections.workflow.advantage}</span>
                      <ul className="check-list">
                        {item.advantages.map((advantage) => (
                          <li key={advantage}>{advantage}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="guide-hero__summary-label">{copy.sections.workflow.limitation}</span>
                      <ul className="check-list">
                        {item.limitations.map((limitation) => (
                          <li key={limitation}>{limitation}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="checklist" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.checklist.eyebrow}
            title={copy.sections.checklist.title}
            description={copy.sections.checklist.description}
          />
          <div className="guide-article-layout">
            <article className="surface-card guide-article">
              <div className="guide-prose">
                <p className="guide-article__lede">{articleCopy.checklistLead}</p>
              </div>
            </article>
            <div className="surface-card guide-checklist">
              <ul className="check-list">
                {guide.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="ciwi" className="page-section">
          <div className="callout guide-callout">
            <SectionHeading eyebrow={copy.sections.ciwi.eyebrow} title={copy.sections.ciwi.title} description={copy.sections.ciwi.description} />
            <div className="guide-prose">
              <p className="guide-article__lede">{articleCopy.ciwiLead}</p>
            </div>
            <div className="surface-card guide-feature-list">
              <ul className="check-list">
                {guide.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="guide-callout__actions">
              <Button href={uiCopy.cta.installHref}>{copy.sections.cta.primaryCtaLabel}</Button>
              <Button href={uiCopy.cta.talkHref} variant="secondary">
                {copy.sections.cta.secondaryCtaLabel}
              </Button>
            </div>
          </div>
        </section>

        <section id="recommendations" className="page-section">
          <SectionHeading
            eyebrow={copy.sections.recommendations.eyebrow}
            title={copy.sections.recommendations.title}
            description={copy.sections.recommendations.description}
          />
          <div className="guide-article-layout">
            <article className="surface-card guide-article">
              <div className="guide-prose">
                <p className="guide-article__lede">{articleCopy.recommendationsLead}</p>
              </div>
            </article>
            <div className="guide-narrative-stack">
              {guide.recommendations.map((item) => (
                <article key={item.title} className="surface-card guide-narrative-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="page-section page-section--compact">
          <FaqSection eyebrow={copy.sections.faq.eyebrow} title={copy.sections.faq.title} description={copy.sections.faq.description} items={guide.faq} />
        </section>

        <section className="page-section">
          <div className="callout guide-final-cta">
            <SectionHeading eyebrow={copy.sections.cta.eyebrow} title={copy.sections.cta.title} description={copy.sections.cta.description} />
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

export function generateStaticParams() {
  return [
    ...new Set([...getLocalizationGuides("en").map((guide) => guide.slug), ...getFunctionScenarioGuides("en").map((guide) => guide.slug)]),
  ].map((slug) => ({slug}));
}

export async function generateMetadata({params}: GuideDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const localizationGuide = getLocalizationGuideMap(locale)[slug];
  const functionScenarioGuide = getFunctionScenarioGuideMap(locale)[slug];
  const localizationCopy = getLocalizationGuidePageCopy(locale);
  const guide = localizationGuide ?? functionScenarioGuide;

  if (!guide) {
    return buildPageMetadata({
      title: localizationCopy.notFound.title,
      description: localizationCopy.notFound.description,
      path: localizationCopy.notFound.path,
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
  const uiCopy = getUiCopy(locale);
  const localizationGuide = getLocalizationGuideMap(locale)[slug];

  if (localizationGuide) {
    return renderLocalizationGuidePage(locale, localizationGuide, uiCopy);
  }

  const functionScenarioGuide = getFunctionScenarioGuideMap(locale)[slug];

  if (functionScenarioGuide) {
    return renderFunctionScenarioGuidePage(locale, functionScenarioGuide, uiCopy);
  }

  notFound();
}
