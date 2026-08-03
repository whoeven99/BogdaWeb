import type {Locale} from "@/lib/i18n";

export type CompareMetric = {
  label: string;
  ciwi: number;
  alternative: number;
};

export type CompareItem = {
  slug: string;
  title: string;
  alternativeName: string;
  description: string;
  summary: string;
  bestFor: string[];
  summaryMetrics: CompareMetric[];
  scoreMatrix: CompareMetric[];
  faq: {question: string; answer: string}[];
};

const comparesEn: CompareItem[] = [
  {
    slug: "ciwi-vs-transcy",
    title: "Ciwi vs Transcy",
    alternativeName: "Transcy",
    description: "Compare both paths across Shopify structure coverage, terminology control, and long-term maintenance cost.",
    summary: "If you care about more than turning source text into another language, and you want a workflow for products, themes, FAQs, and long-term consistency, Ciwi is more focused on structured governance and localization quality.",
    bestFor: [
      "Merchants who care about glossary and brand terminology consistency",
      "Teams that need broader Shopify structure coverage",
      "Brands that want product pages, help docs, and SEO pages to work together",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 7, alternative: 8},
      {label: "Translation speed", ciwi: 8, alternative: 8},
      {label: "Translation quality", ciwi: 9, alternative: 7},
      {label: "Data coverage", ciwi: 9, alternative: 7},
    ],
    scoreMatrix: [
      {label: "Glossary control", ciwi: 9, alternative: 7},
      {label: "Structured content coverage", ciwi: 9, alternative: 7},
      {label: "Continuous sync", ciwi: 9, alternative: 7},
      {label: "Theme and storefront fit", ciwi: 9, alternative: 6},
      {label: "Launch speed", ciwi: 7, alternative: 8},
      {label: "Long-term governance", ciwi: 9, alternative: 6},
    ],
    faq: [
      {question: "When is Ciwi the better choice?", answer: "Usually when you care about Shopify structure fit, brand terminology control, and ongoing multilingual operations."},
      {question: "Who is this comparison most useful for?", answer: "Merchants who already know they need multilingual storefronts and are comparing different workflow paths rather than browsing generic feature lists."},
    ],
  },
  {
    slug: "ciwi-vs-langwill",
    title: "Ciwi vs Langwill",
    alternativeName: "Langwill",
    description: "Useful when comparing translation capability, content workflows, and how unified the website front end feels.",
    summary: "If you are not just comparing translation tools but comparing whole multilingual growth systems, Ciwi places more weight on front-end consistency, content routing, and long-term governance.",
    bestFor: [
      "Teams that want a more unified website, blog, and help center experience",
      "Merchants evaluating both translation tooling and content growth workflow",
      "Brands that need a clearer comparison-led buyer journey",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 7, alternative: 7},
      {label: "Translation speed", ciwi: 8, alternative: 7},
      {label: "Translation quality", ciwi: 9, alternative: 7},
      {label: "Data coverage", ciwi: 9, alternative: 7},
    ],
    scoreMatrix: [
      {label: "Website integration", ciwi: 9, alternative: 6},
      {label: "Content routing", ciwi: 9, alternative: 6},
      {label: "SEO compare flow", ciwi: 9, alternative: 5},
      {label: "Structured governance", ciwi: 9, alternative: 6},
      {label: "Launch speed", ciwi: 7, alternative: 7},
      {label: "Merchant education fit", ciwi: 8, alternative: 6},
    ],
    faq: [
      {question: "Why build comparison pages on the website?", answer: "Because comparison pages are good for scalable SEO and also help merchants choose in the context of real operating problems."},
      {question: "What matters most in Ciwi vs Langwill?", answer: "How translation capability connects to content routing and whether the front end forms one clear merchant journey."},
    ],
  },
  {
    slug: "ciwi-vs-shopify-translate-adapt",
    title: "Ciwi vs Shopify Translate & Adapt",
    alternativeName: "Shopify Translate & Adapt",
    description: "Useful when comparing Shopify native localization with a more complete localization workflow.",
    summary: "If you have already moved beyond simply publishing multilingual pages and now care about glossary, structured content coverage, continuous sync, and brand consistency, Ciwi offers a deeper path.",
    bestFor: [
      "Teams already using Shopify native localization but needing more control",
      "Merchants trying to unify product pages, help docs, and resource content",
      "Brands that want localization to become an operating workflow rather than a one-time task",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 7, alternative: 9},
      {label: "Translation speed", ciwi: 8, alternative: 9},
      {label: "Translation quality", ciwi: 9, alternative: 6},
      {label: "Data coverage", ciwi: 9, alternative: 5},
    ],
    scoreMatrix: [
      {label: "Glossary control", ciwi: 9, alternative: 4},
      {label: "Structured content coverage", ciwi: 9, alternative: 5},
      {label: "Continuous sync", ciwi: 9, alternative: 4},
      {label: "Quick launch", ciwi: 7, alternative: 10},
      {label: "Native Shopify fit", ciwi: 8, alternative: 10},
      {label: "Long-term governance", ciwi: 9, alternative: 5},
    ],
    faq: [
      {question: "Is Shopify Translate & Adapt enough?", answer: "It can be a solid starting point for basic multilingual publishing. Teams that need stronger terminology control, structured coverage, and sync usually need a deeper workflow."},
      {question: "Why compare against the native path?", answer: "Because many Shopify merchants are really comparing whether to stay with native capabilities or move into a fuller localization system."},
    ],
  },
  {
    slug: "ciwi-vs-weglot",
    title: "Ciwi vs Weglot",
    alternativeName: "Weglot",
    description: "Useful when comparing a quick-coverage translation path with a Shopify-specific content governance path.",
    summary: "If your priority is fast multilingual coverage, a Weglot-like path is often easier to understand. If you care more about Shopify structure, brand terminology, and long-term governance, Ciwi stays more focused there.",
    bestFor: [
      "Teams with existing multilingual traffic who now want better governance",
      "Brands that care about glossary, FAQ coverage, theme content, and resource routing together",
      "Merchants comparing launch speed against long-term maintenance cost",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 7, alternative: 6},
      {label: "Translation speed", ciwi: 7, alternative: 9},
      {label: "Translation quality", ciwi: 9, alternative: 7},
      {label: "Data coverage", ciwi: 9, alternative: 7},
    ],
    scoreMatrix: [
      {label: "Launch speed", ciwi: 7, alternative: 10},
      {label: "Shopify structure fit", ciwi: 9, alternative: 6},
      {label: "Glossary control", ciwi: 9, alternative: 6},
      {label: "Help and SEO routing", ciwi: 9, alternative: 5},
      {label: "Long-term governance", ciwi: 9, alternative: 6},
      {label: "Growth workflow fit", ciwi: 9, alternative: 7},
    ],
    faq: [
      {question: "When should governance matter more than translation speed?", answer: "Usually once you are operating across multiple markets and the ongoing cost of updates, terminology, and routing becomes more important than the first launch."},
      {question: "Who should read Ciwi vs Weglot?", answer: "Shopify merchants who already understand the value of multilingual commerce and are deciding between quick coverage and stronger long-term control."},
    ],
  },
  {
    slug: "ciwi-vs-langify",
    title: "Ciwi vs Langify",
    alternativeName: "Langify",
    description: "Useful when comparing translation workflow, human control, and long-term synchronization strategy.",
    summary: "If you care more about human review, terminology consistency, and ongoing update governance, Ciwi is easier to combine with glossary, help docs, and resource routing. If the need is more basic translation organization, a Langify-like path is usually easier to understand.",
    bestFor: [
      "Brands with high requirements for human review and terminology consistency",
      "Teams already operating localization workflows and trying to reduce maintenance friction",
      "Shopify merchants thinking about SEO content and storefront content together",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 7, alternative: 7},
      {label: "Translation speed", ciwi: 8, alternative: 7},
      {label: "Translation quality", ciwi: 9, alternative: 7},
      {label: "Data coverage", ciwi: 9, alternative: 6},
    ],
    scoreMatrix: [
      {label: "Human review flow", ciwi: 9, alternative: 8},
      {label: "Glossary consistency", ciwi: 9, alternative: 6},
      {label: "Structured sync", ciwi: 9, alternative: 6},
      {label: "SEO and content routing", ciwi: 9, alternative: 5},
      {label: "Translation management basics", ciwi: 8, alternative: 8},
      {label: "Long-term governance", ciwi: 9, alternative: 6},
    ],
    faq: [
      {question: "Why emphasize later synchronization on comparison pages?", answer: "Because ecommerce content keeps changing. The real cost often comes from new launches, campaigns, and repeated page updates rather than the first translation."},
      {question: "What is the key difference in Ciwi vs Langify?", answer: "Not translation alone, but whether glossary, resource routing, ongoing sync, and the front-end website are treated as one workflow."},
    ],
  },
];

const comparesZh: CompareItem[] = [
  {
    slug: "ciwi-vs-transcy",
    title: "Ciwi vs Transcy",
    alternativeName: "Transcy",
    description: "从 Shopify 适配深度、术语控制和长期维护成本三个维度比较两种路径。",
    summary: "如果你关心的不只是把文字翻出来，而是希望长期维护多语言商品、主题和 FAQ，Ciwi 会更偏向结构化治理和本地化质量。",
    bestFor: ["重视 glossary 和品牌术语一致性的商家", "需要覆盖 Shopify 结构化内容的团队", "希望把产品页、帮助文档和 SEO 页面联动起来的品牌"],
    summaryMetrics: [
      {label: "价格", ciwi: 7, alternative: 8},
      {label: "翻译速度", ciwi: 8, alternative: 8},
      {label: "翻译质量", ciwi: 9, alternative: 7},
      {label: "数据覆盖度", ciwi: 9, alternative: 7},
    ],
    scoreMatrix: [
      {label: "术语控制", ciwi: 9, alternative: 7},
      {label: "结构化内容覆盖", ciwi: 9, alternative: 7},
      {label: "持续同步", ciwi: 9, alternative: 7},
      {label: "主题与前台适配", ciwi: 9, alternative: 6},
      {label: "上线速度", ciwi: 7, alternative: 8},
      {label: "长期治理", ciwi: 9, alternative: 6},
    ],
    faq: [
      {question: "什么时候更应该选择 Ciwi？", answer: "当你关心 Shopify 结构适配、品牌术语控制和长期多语言运营时，Ciwi 的路径通常更匹配。"},
      {question: "这类对比页最适合谁看？", answer: "最适合已经明确要做多语言、正在比较不同工具路线，而不是只想看功能列表的 Shopify 商家。"},
    ],
  },
  {
    slug: "ciwi-vs-langwill",
    title: "Ciwi vs Langwill",
    alternativeName: "Langwill",
    description: "适合比较翻译能力、内容承接方式和官网前台统一度时使用。",
    summary: "如果你不只是在比较一个翻译工具，而是在比较整套多语言增长路径，Ciwi 会更强调前台统一、资源承接和长期内容治理。",
    bestFor: ["希望统一官网、博客和帮助中心体验的团队", "正在评估翻译工具和内容增长链路的商家", "需要更明确对比导购页的品牌"],
    summaryMetrics: [
      {label: "价格", ciwi: 7, alternative: 7},
      {label: "翻译速度", ciwi: 8, alternative: 7},
      {label: "翻译质量", ciwi: 9, alternative: 7},
      {label: "数据覆盖度", ciwi: 9, alternative: 7},
    ],
    scoreMatrix: [
      {label: "官网前台整合", ciwi: 9, alternative: 6},
      {label: "内容承接路径", ciwi: 9, alternative: 6},
      {label: "SEO 对比链路", ciwi: 9, alternative: 5},
      {label: "结构化治理", ciwi: 9, alternative: 6},
      {label: "上线速度", ciwi: 7, alternative: 7},
      {label: "商家教育适配", ciwi: 8, alternative: 6},
    ],
    faq: [
      {question: "为什么官网里要做 Compare 页？", answer: "因为 Compare 页既适合规模化 SEO，也最适合帮助商家在真实问题场景下做选型。"},
      {question: "Ciwi vs Langwill 最值得比较的点是什么？", answer: "最值得比较的是翻译能力背后的内容承接方式，以及前台是否能形成统一的商家理解路径。"},
    ],
  },
  {
    slug: "ciwi-vs-shopify-translate-adapt",
    title: "Ciwi vs Shopify Translate & Adapt",
    alternativeName: "Shopify Translate & Adapt",
    description: "适合比较 Shopify 原生多语言能力和更完整本地化工作流时使用。",
    summary: "如果你已经不满足于“能发布多语言版本”这一层，而是开始关心 glossary、结构化内容覆盖、持续同步和品牌一致性，Ciwi 的路径会更完整。",
    bestFor: ["已经在使用 Shopify 原生多语言，但需要更强控制力的团队", "希望统一产品页、帮助文档和资源前台的商家", "想把本地化从一次性任务变成持续流程的品牌"],
    summaryMetrics: [
      {label: "价格", ciwi: 7, alternative: 9},
      {label: "翻译速度", ciwi: 8, alternative: 9},
      {label: "翻译质量", ciwi: 9, alternative: 6},
      {label: "数据覆盖度", ciwi: 9, alternative: 5},
    ],
    scoreMatrix: [
      {label: "术语控制", ciwi: 9, alternative: 4},
      {label: "结构化内容覆盖", ciwi: 9, alternative: 5},
      {label: "持续同步", ciwi: 9, alternative: 4},
      {label: "快速上线", ciwi: 7, alternative: 10},
      {label: "Shopify 原生适配", ciwi: 8, alternative: 10},
      {label: "长期治理", ciwi: 9, alternative: 5},
    ],
    faq: [
      {question: "Shopify Translate & Adapt 够不够用？", answer: "如果你只是需要基础多语言发布，它可以成为起点；如果你需要更强的术语控制、结构化覆盖和持续同步，通常还需要更完整的工作流。"},
      {question: "为什么要把原生方案也放进 Compare？", answer: "因为很多 Shopify 商家真正要比较的，不是两个第三方插件，而是“继续用原生能力”还是进入更完整的本地化方案。"},
    ],
  },
  {
    slug: "ciwi-vs-weglot",
    title: "Ciwi vs Weglot",
    alternativeName: "Weglot",
    description: "适合比较快速覆盖型翻译方案和更强调 Shopify 内容治理路径时使用。",
    summary: "如果你的重点是先快速覆盖多语言，Weglot 类路径通常更容易理解；如果你更关心 Shopify 结构化内容、品牌术语和长期治理，Ciwi 会更聚焦。",
    bestFor: ["已经有一定多语言流量，希望把内容治理做深的团队", "关心 glossary、FAQ、主题和资源回流的一体化品牌", "不只比较速度，也比较后续治理成本的商家"],
    summaryMetrics: [
      {label: "价格", ciwi: 7, alternative: 6},
      {label: "翻译速度", ciwi: 7, alternative: 9},
      {label: "翻译质量", ciwi: 9, alternative: 7},
      {label: "数据覆盖度", ciwi: 9, alternative: 7},
    ],
    scoreMatrix: [
      {label: "上线速度", ciwi: 7, alternative: 10},
      {label: "Shopify 结构适配", ciwi: 9, alternative: 6},
      {label: "术语控制", ciwi: 9, alternative: 6},
      {label: "帮助文档与 SEO 承接", ciwi: 9, alternative: 5},
      {label: "长期治理", ciwi: 9, alternative: 6},
      {label: "增长工作流适配", ciwi: 9, alternative: 7},
    ],
    faq: [
      {question: "什么时候更应该比较治理能力而不是翻译速度？", answer: "当你已经进入多市场运营阶段，后续更新、术语控制和资源承接成本通常比第一次上线更关键。"},
      {question: "Ciwi vs Weglot 最适合谁看？", answer: "最适合已经理解多语言价值，正在比较“快速覆盖”和“长期治理”两种路径差异的 Shopify 商家。"},
    ],
  },
  {
    slug: "ciwi-vs-langify",
    title: "Ciwi vs Langify",
    alternativeName: "Langify",
    description: "适合比较翻译工作流、人工可控性与持续同步策略时使用。",
    summary: "如果你更强调人工控制、术语一致性和后续更新治理，Ciwi 的路径更容易和 glossary、帮助文档与资源前台结合；如果只是基础翻译组织，Langify 类路径通常更容易理解。",
    bestFor: ["对人工控制和术语一致性要求较高的品牌", "已经有一定本地化运营流程、希望降低后续维护摩擦的团队", "需要把 SEO 内容和产品前台一起考虑的 Shopify 商家"],
    summaryMetrics: [
      {label: "价格", ciwi: 7, alternative: 7},
      {label: "翻译速度", ciwi: 8, alternative: 7},
      {label: "翻译质量", ciwi: 9, alternative: 7},
      {label: "数据覆盖度", ciwi: 9, alternative: 6},
    ],
    scoreMatrix: [
      {label: "人工校对流程", ciwi: 9, alternative: 8},
      {label: "术语一致性", ciwi: 9, alternative: 6},
      {label: "结构化同步", ciwi: 9, alternative: 6},
      {label: "SEO 与内容承接", ciwi: 9, alternative: 5},
      {label: "基础翻译管理", ciwi: 8, alternative: 8},
      {label: "长期治理", ciwi: 9, alternative: 6},
    ],
    faq: [
      {question: "为什么 Compare 页里要强调后续同步？", answer: "因为电商站点的内容是持续变化的，真正高成本的部分往往不是第一次翻译，而是后续新品、活动和页面更新。"},
      {question: "Ciwi vs Langify 的核心差异是什么？", answer: "核心差异不只在翻译本身，而在于是否把 glossary、资源回流、持续同步和官网前台一起纳入工作流。"},
    ],
  },
];

export const compares = comparesEn;
export const compareMap = Object.fromEntries(compares.map((item) => [item.slug, item]));

export function getCompares(locale: Locale) {
  return locale === "zh-cn" ? comparesZh : comparesEn;
}

export function getCompareMap(locale: Locale) {
  return Object.fromEntries(getCompares(locale).map((item) => [item.slug, item]));
}
