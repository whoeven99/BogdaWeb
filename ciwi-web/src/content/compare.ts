import type {Locale} from "@/lib/i18n";

export type CompareItem = {
  slug: string;
  title: string;
  description: string;
  summary: string;
  bestFor: string[];
  dimensions: {label: string; ciwi: string; alternative: string}[];
  highlights: string[];
  faq: {question: string; answer: string}[];
};

const comparesEn: CompareItem[] = [
  {
    slug: "ciwi-vs-transcy",
    title: "Ciwi vs Transcy",
    description: "Compare both paths across Shopify structure coverage, terminology control, and long-term maintenance cost.",
    summary: "If you care about more than turning source text into another language, and you want a workflow for products, themes, FAQs, and long-term consistency, Ciwi is more focused on structured governance and localization quality.",
    bestFor: [
      "Merchants who care about glossary and brand terminology consistency",
      "Teams that need broader Shopify structure coverage",
      "Brands that want product pages, help docs, and SEO pages to work together",
    ],
    dimensions: [
      {label: "Shopify structure awareness", ciwi: "More emphasis on metafields, theme blocks, FAQs, and structured content moving through the same translation flow", alternative: "More centered on translation feature coverage itself"},
      {label: "Localization control", ciwi: "Stronger focus on glossary, brand tone, and terminology consistency", alternative: "Easier to understand as a feature set, but lighter on quality governance"},
      {label: "Long-term operation fit", ciwi: "Better suited to ongoing multilingual operations and continuous sync", alternative: "Better suited to understanding core translation capabilities first"},
    ],
    highlights: [
      "The real difference is not feature count alone, but how multilingual content gets maintained over time.",
      "If your store includes theme content, FAQs, and structured fields, governance matters more than one-time translation.",
      "This page helps merchants decide whether they need quick launch speed or stronger long-term control.",
    ],
    faq: [
      {question: "When is Ciwi the better choice?", answer: "Usually when you care about Shopify structure fit, brand terminology control, and ongoing multilingual operations."},
      {question: "Who is this comparison most useful for?", answer: "Merchants who already know they need multilingual storefronts and are comparing different workflow paths rather than browsing generic feature lists."},
    ],
  },
  {
    slug: "ciwi-vs-langwill",
    title: "Ciwi vs Langwill",
    description: "Useful when comparing translation capability, content workflows, and how unified the website front end feels.",
    summary: "If you are not just comparing translation tools but comparing whole multilingual growth systems, Ciwi places more weight on front-end consistency, content routing, and long-term governance.",
    bestFor: [
      "Teams that want a more unified website, blog, and help center experience",
      "Merchants evaluating both translation tooling and content growth workflow",
      "Brands that need a clearer comparison-led buyer journey",
    ],
    dimensions: [
      {label: "Front-end integration", ciwi: "Easier to align website templates, demos, blog, and help center into one storefront journey", alternative: "More oriented around single-tool understanding and evaluation"},
      {label: "Content strategy fit", ciwi: "Better for connecting product pages, help docs, and blog content", alternative: "More focused on understanding the tool itself"},
      {label: "Merchant education", ciwi: "Works better for SEO, education, and comparison-led acquisition", alternative: "Needs more content infrastructure to become a complete journey"},
    ],
    highlights: [
      "Some merchants are not comparing features alone. They are comparing whether the website and content system can work together.",
      "Ciwi differs not only in translation, but in how product, help, and demo content fit inside the same path.",
      "This comparison is useful for higher-intent traffic already doing active vendor evaluation.",
    ],
    faq: [
      {question: "Why build comparison pages on the website?", answer: "Because comparison pages are good for scalable SEO and also help merchants choose in the context of real operating problems."},
      {question: "What matters most in Ciwi vs Langwill?", answer: "How translation capability connects to content routing and whether the front end forms one clear merchant journey."},
    ],
  },
  {
    slug: "ciwi-vs-shopify-translate-adapt",
    title: "Ciwi vs Shopify Translate & Adapt",
    description: "Useful when comparing Shopify native localization with a more complete localization workflow.",
    summary: "If you have already moved beyond simply publishing multilingual pages and now care about glossary, structured content coverage, continuous sync, and brand consistency, Ciwi offers a deeper path.",
    bestFor: [
      "Teams already using Shopify native localization but needing more control",
      "Merchants trying to unify product pages, help docs, and resource content",
      "Brands that want localization to become an operating workflow rather than a one-time task",
    ],
    dimensions: [
      {label: "Workflow depth", ciwi: "Covers translation, terminology control, continuous sync, and resource routing in one broader workflow", alternative: "A simpler native starting point for Shopify multilingual publishing"},
      {label: "Glossary and quality control", ciwi: "Places more emphasis on glossary, model strategy, and brand consistency", alternative: "More focused on basic content publishing and native compatibility"},
      {label: "Operational scalability", ciwi: "Better for repeated product launches, campaign updates, and multi-page expansion", alternative: "Better when the need is still basic multilingual publishing"},
    ],
    highlights: [
      "The real choice is often not whether to do localization, but when native capabilities stop being enough.",
      "Once you care about terminology control, structured content, and ongoing sync, workflow depth matters more than basic publishing.",
      "This page is especially useful for higher-intent traffic already in an active buying decision.",
    ],
    faq: [
      {question: "Is Shopify Translate & Adapt enough?", answer: "It can be a solid starting point for basic multilingual publishing. Teams that need stronger terminology control, structured coverage, and sync usually need a deeper workflow."},
      {question: "Why compare against the native path?", answer: "Because many Shopify merchants are really comparing whether to stay with native capabilities or move into a fuller localization system."},
    ],
  },
  {
    slug: "ciwi-vs-weglot",
    title: "Ciwi vs Weglot",
    description: "Useful when comparing a quick-coverage translation path with a Shopify-specific content governance path.",
    summary: "If your priority is fast multilingual coverage, a Weglot-like path is often easier to understand. If you care more about Shopify structure, brand terminology, and long-term governance, Ciwi stays more focused there.",
    bestFor: [
      "Teams with existing multilingual traffic who now want better governance",
      "Brands that care about glossary, FAQ coverage, theme content, and resource routing together",
      "Merchants comparing launch speed against long-term maintenance cost",
    ],
    dimensions: [
      {label: "Launch speed vs governance depth", ciwi: "More focused on long-term multilingual operations, resource routing, and structured content coverage", alternative: "More suited to teams prioritizing speed to launch"},
      {label: "Shopify content fit", ciwi: "Easier to align product pages, help docs, compare pages, and demos into one system", alternative: "Closer to a generic translation-tool understanding"},
      {label: "Brand terminology control", ciwi: "More suitable for glossary, brand terms, and ongoing consistency", alternative: "Depends more on the base workflow plus extra governance outside the tool"},
    ],
    highlights: [
      "The real comparison is not only translation output, but how multilingual content keeps being managed after launch.",
      "For Shopify brands, whether product pages, FAQs, and help docs form one front-end system directly affects growth efficiency.",
      "This comparison is best for high-intent merchants already choosing between different paths.",
    ],
    faq: [
      {question: "When should governance matter more than translation speed?", answer: "Usually once you are operating across multiple markets and the ongoing cost of updates, terminology, and routing becomes more important than the first launch."},
      {question: "Who should read Ciwi vs Weglot?", answer: "Shopify merchants who already understand the value of multilingual commerce and are deciding between quick coverage and stronger long-term control."},
    ],
  },
  {
    slug: "ciwi-vs-langify",
    title: "Ciwi vs Langify",
    description: "Useful when comparing translation workflow, human control, and long-term synchronization strategy.",
    summary: "If you care more about human review, terminology consistency, and ongoing update governance, Ciwi is easier to combine with glossary, help docs, and resource routing. If the need is more basic translation organization, a Langify-like path is usually easier to understand.",
    bestFor: [
      "Brands with high requirements for human review and terminology consistency",
      "Teams already operating localization workflows and trying to reduce maintenance friction",
      "Shopify merchants thinking about SEO content and storefront content together",
    ],
    dimensions: [
      {label: "Manual control", ciwi: "Better for connecting AI, glossary, and human review into one continuous workflow", alternative: "More focused on translation management operations themselves"},
      {label: "Content synchronization", ciwi: "More emphasis on structured sync and routing after content changes", alternative: "More suitable for baseline translation management"},
      {label: "SEO and resource fit", ciwi: "Easier to connect compare pages, blog, and help center into one acquisition path", alternative: "Usually needs more front-end content work to become a complete journey"},
    ],
    highlights: [
      "Differences between translation tools often show up in maintenance, not in the first translation round.",
      "If the website itself should also educate buyers and capture search traffic, the resource system has to be considered together.",
      "Comparison pages should help merchants understand maintenance cost, update workflow, and growth routing differences.",
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
    description: "从 Shopify 适配深度、术语控制和长期维护成本三个维度比较两种路径。",
    summary: "如果你关心的不只是把文字翻出来，而是希望长期维护多语言商品、主题和 FAQ，Ciwi 会更偏向结构化治理和本地化质量。",
    bestFor: ["重视 glossary 和品牌术语一致性的商家", "需要覆盖 Shopify 结构化内容的团队", "希望把产品页、帮助文档和 SEO 页面联动起来的品牌"],
    dimensions: [
      {label: "Shopify 结构感知", ciwi: "更强调 metafields、主题区块、FAQ 和结构化内容一起进入翻译流程", alternative: "更偏向翻译能力本身的覆盖表达"},
      {label: "本地化控制", ciwi: "更突出 glossary、品牌语气和术语一致性控制", alternative: "更容易从功能角度理解，但对质量治理的表达较弱"},
      {label: "长期运营适配", ciwi: "更适合长期多语言运营和持续同步场景", alternative: "更适合先理解基础翻译能力和功能范围"},
    ],
    highlights: [
      "真正的差异不只在功能多少，而在于后续多语言内容怎么长期维护。",
      "如果你的商店有大量主题内容、FAQ 和结构化字段，治理能力会比单次翻译更关键。",
      "这类页面适合帮助商家判断自己要的是“快速上线”还是“长期可控”。",
    ],
    faq: [
      {question: "什么时候更应该选择 Ciwi？", answer: "当你关心 Shopify 结构适配、品牌术语控制和长期多语言运营时，Ciwi 的路径通常更匹配。"},
      {question: "这类对比页最适合谁看？", answer: "最适合已经明确要做多语言、正在比较不同工具路线，而不是只想看功能列表的 Shopify 商家。"},
    ],
  },
  {
    slug: "ciwi-vs-langwill",
    title: "Ciwi vs Langwill",
    description: "适合比较翻译能力、内容承接方式和官网前台统一度时使用。",
    summary: "如果你不只是在比较一个翻译工具，而是在比较整套多语言增长路径，Ciwi 会更强调前台统一、资源承接和长期内容治理。",
    bestFor: ["希望统一官网、博客和帮助中心体验的团队", "正在评估翻译工具和内容增长链路的商家", "需要更明确对比导购页的品牌"],
    dimensions: [
      {label: "前台整合", ciwi: "更容易和官网模板、Demo、Blog 与 Help Center 形成统一前台", alternative: "更偏向单工具理解和选型场景"},
      {label: "内容策略适配", ciwi: "更适合把产品页、帮助文档和博客联动起来", alternative: "更偏向工具能力本身的理解"},
      {label: "商家教育", ciwi: "更适合通过 Compare 页承接 SEO、教育和导购", alternative: "需要额外补内容层承接才能形成完整链路"},
    ],
    highlights: [
      "有些商家比较的不是功能多少，而是官网和内容体系能不能一起协同工作。",
      "Ciwi 的差异化不只在翻译本身，也在于如何把内容、帮助和演示放到同一条路径里。",
      "这类页面适合承接已经开始做实际选型的高意图流量。",
    ],
    faq: [
      {question: "为什么官网里要做 Compare 页？", answer: "因为 Compare 页既适合规模化 SEO，也最适合帮助商家在真实问题场景下做选型。"},
      {question: "Ciwi vs Langwill 最值得比较的点是什么？", answer: "最值得比较的是翻译能力背后的内容承接方式，以及前台是否能形成统一的商家理解路径。"},
    ],
  },
  {
    slug: "ciwi-vs-shopify-translate-adapt",
    title: "Ciwi vs Shopify Translate & Adapt",
    description: "适合比较 Shopify 原生多语言能力和更完整本地化工作流时使用。",
    summary: "如果你已经不满足于“能发布多语言版本”这一层，而是开始关心 glossary、结构化内容覆盖、持续同步和品牌一致性，Ciwi 的路径会更完整。",
    bestFor: ["已经在使用 Shopify 原生多语言，但需要更强控制力的团队", "希望统一产品页、帮助文档和资源前台的商家", "想把本地化从一次性任务变成持续流程的品牌"],
    dimensions: [
      {label: "工作流深度", ciwi: "从翻译、术语控制到持续同步和资源承接形成完整工作流", alternative: "更适合作为 Shopify 原生多语言的基础起点"},
      {label: "Glossary 与质量控制", ciwi: "更强调 glossary、模型策略和品牌表达一致性", alternative: "更偏向内容发布和基础适配"},
      {label: "运营扩展性", ciwi: "更适合后续新品、活动和多页面内容持续扩张", alternative: "更适合先满足基础多语言需求"},
    ],
    highlights: [
      "很多团队真正的选择不是“要不要做多语言”，而是“原生能力什么时候不够用”。",
      "当你开始关心术语控制、结构化内容和持续同步时，工作流深度就会比基础发布更重要。",
      "这类页面适合承接更高意图的选型流量，因为用户通常已经进入实际决策阶段。",
    ],
    faq: [
      {question: "Shopify Translate & Adapt 够不够用？", answer: "如果你只是需要基础多语言发布，它可以成为起点；如果你需要更强的术语控制、结构化覆盖和持续同步，通常还需要更完整的工作流。"},
      {question: "为什么要把原生方案也放进 Compare？", answer: "因为很多 Shopify 商家真正要比较的，不是两个第三方插件，而是“继续用原生能力”还是进入更完整的本地化方案。"},
    ],
  },
  {
    slug: "ciwi-vs-weglot",
    title: "Ciwi vs Weglot",
    description: "适合比较快速覆盖型翻译方案和更强调 Shopify 内容治理路径时使用。",
    summary: "如果你的重点是先快速覆盖多语言，Weglot 类路径通常更容易理解；如果你更关心 Shopify 结构化内容、品牌术语和长期治理，Ciwi 会更聚焦。",
    bestFor: ["已经有一定多语言流量，希望把内容治理做深的团队", "关心 glossary、FAQ、主题和资源回流的一体化品牌", "不只比较速度，也比较后续治理成本的商家"],
    dimensions: [
      {label: "上线速度 vs 治理深度", ciwi: "更强调长期多语言运营、资源承接和结构化覆盖", alternative: "更适合以快速上线为优先目标的团队"},
      {label: "Shopify 内容适配", ciwi: "更容易把产品页、帮助文档、Compare 和 Demo 放进同一前台体系", alternative: "更偏通用翻译方案理解"},
      {label: "品牌术语控制", ciwi: "更适合突出 glossary、品牌词和运营内容一致性", alternative: "更依赖基础翻译流程与额外补充治理"},
    ],
    highlights: [
      "真正的比较不只是翻译结果，而是多语言内容后续如何持续管理。",
      "对 Shopify 品牌来说，产品页、FAQ 和帮助文档能否形成统一前台，会直接影响增长效率。",
      "这类页面适合承接已经明确在比较不同路径的高意图流量。",
    ],
    faq: [
      {question: "什么时候更应该比较治理能力而不是翻译速度？", answer: "当你已经进入多市场运营阶段，后续更新、术语控制和资源承接成本通常比第一次上线更关键。"},
      {question: "Ciwi vs Weglot 最适合谁看？", answer: "最适合已经理解多语言价值，正在比较“快速覆盖”和“长期治理”两种路径差异的 Shopify 商家。"},
    ],
  },
  {
    slug: "ciwi-vs-langify",
    title: "Ciwi vs Langify",
    description: "适合比较翻译工作流、人工可控性与持续同步策略时使用。",
    summary: "如果你更强调人工控制、术语一致性和后续更新治理，Ciwi 的路径更容易和 glossary、帮助文档与资源前台结合；如果只是基础翻译组织，Langify 类路径通常更容易理解。",
    bestFor: ["对人工控制和术语一致性要求较高的品牌", "已经有一定本地化运营流程、希望降低后续维护摩擦的团队", "需要把 SEO 内容和产品前台一起考虑的 Shopify 商家"],
    dimensions: [
      {label: "人工控制", ciwi: "更适合把 AI、glossary 和人工校对放进一个连续工作流", alternative: "更偏翻译管理本身的操作层"},
      {label: "内容同步", ciwi: "更强调后续内容更新时的结构化同步与回流", alternative: "更适合基础内容维护与翻译组织"},
      {label: "SEO 与资源适配", ciwi: "更容易和 Compare、Blog、Help Center 形成统一流量承接", alternative: "通常需要额外补内容前台层才能形成完整链路"},
    ],
    highlights: [
      "翻译工具的差异常常体现在后续维护阶段，而不是第一次翻译时。",
      "如果你希望官网本身也成为产品教育与自然流量入口，就需要把资源体系一起考虑进去。",
      "Compare 页面应该帮助商家理解维护成本、更新流程和增长承接差异。",
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
