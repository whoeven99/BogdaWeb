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

export const compares: CompareItem[] = [
  {
    slug: "ciwi-vs-transcy",
    title: "Ciwi vs Transcy",
    description: "从 Shopify 适配深度、术语控制和长期维护成本三个维度比较两种路径。",
    summary: "如果你关心的不只是把文字翻出来，而是希望长期维护多语言商品、主题和 FAQ，Ciwi 会更偏向结构化治理和本地化质量。",
    bestFor: ["重视 glossary 和品牌术语一致性的商家", "需要覆盖 Shopify 结构化内容的团队", "希望把产品页、帮助文档和 SEO 页面联动起来的品牌"],
    dimensions: [
      {label: "Shopify structure awareness", ciwi: "更强调 metafields、主题区块、FAQ 和结构化内容一起进入翻译流程", alternative: "更偏向翻译能力本身的覆盖表达"},
      {label: "Localization control", ciwi: "更突出 glossary、品牌语气和术语一致性控制", alternative: "更容易从功能角度理解，但对质量治理的表达较弱"},
      {label: "Long-term operation fit", ciwi: "更适合长期多语言运营和持续同步场景", alternative: "更适合先理解基础翻译能力和功能范围"},
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
      {label: "Front-end integration", ciwi: "更容易和官网模板、Demo、Blog 与 Help Center 形成统一前台", alternative: "更偏向单工具理解和选型场景"},
      {label: "Content strategy fit", ciwi: "更适合把产品页、帮助文档和博客联动起来", alternative: "更偏向工具能力本身的理解"},
      {label: "Merchant education", ciwi: "更适合通过 Compare 页承接 SEO、教育和导购", alternative: "需要额外补内容层承接才能形成完整链路"},
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
      {label: "Workflow depth", ciwi: "从翻译、术语控制到持续同步和资源承接形成完整工作流", alternative: "更适合作为 Shopify 原生多语言的基础起点"},
      {label: "Glossary and quality control", ciwi: "更强调 glossary、模型策略和品牌表达一致性", alternative: "更偏向内容发布和基础适配"},
      {label: "Operational scalability", ciwi: "更适合后续新品、活动和多页面内容持续扩张", alternative: "更适合先满足基础多语言需求"},
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
      {label: "Launch speed vs governance depth", ciwi: "更强调长期多语言运营、资源承接和结构化覆盖", alternative: "更适合以快速上线为优先目标的团队"},
      {label: "Shopify content fit", ciwi: "更容易把产品页、帮助文档、Compare 和 Demo 放进同一前台体系", alternative: "更偏通用翻译方案理解"},
      {label: "Brand terminology control", ciwi: "更适合突出 glossary、品牌词和运营内容一致性", alternative: "更依赖基础翻译流程与额外补充治理"},
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
      {label: "Manual control", ciwi: "更适合把 AI、glossary 和人工校对放进一个连续工作流", alternative: "更偏翻译管理本身的操作层"},
      {label: "Content synchronization", ciwi: "更强调后续内容更新时的结构化同步与回流", alternative: "更适合基础内容维护与翻译组织"},
      {label: "SEO and resource fit", ciwi: "更容易和 Compare、Blog、Help Center 形成统一流量承接", alternative: "通常需要额外补内容前台层才能形成完整链路"},
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

export const compareMap = Object.fromEntries(compares.map((item) => [item.slug, item]));
