export type SolutionItem = {
  slug: string;
  name: string;
  title: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  targetSignals: string[];
  challenges: string[];
  approach: {title: string; description: string}[];
  recommendedProducts: {title: string; description: string; href: string; meta: string[]}[];
  relatedResources: {title: string; description: string; href: string; meta: string[]}[];
  faq: {question: string; answer: string}[];
  ctaLabel: string;
  ctaHref: string;
};

export const solutions: SolutionItem[] = [
  {
    slug: "increase-conversion",
    name: "Increase Conversion",
    title: "Increase Conversion for Shopify Stores",
    description: "通过更自然的商品表达、更清晰的本地化体验和更低的理解成本，帮助 Shopify 商家提升跨市场转化。",
    heroTitle: "让用户更容易理解商品，也更愿意下单",
    heroDescription:
      "对 Shopify 商家来说，很多转化问题并不是流量不够，而是页面没有用用户熟悉的语言、术语和购买语境把商品讲清楚。",
    targetSignals: ["已经开始获取海外流量，但转化效率偏低", "商品页内容不够贴近目标市场用户", "多语言页面存在术语不统一或信任感不足的问题"],
    challenges: [
      "用户能进入页面，但很难在几秒内判断这是不是适合自己的版本。",
      "产品卖点、优惠表达和 FAQ 在不同语言里不够自然，削弱了品牌信任感。",
      "语言、货币和主题内容没有形成一致体验，用户需要自己做额外理解和切换。",
    ],
    approach: [
      {title: "先把最影响决策的内容讲清楚", description: "优先处理商品标题、卖点、FAQ、优惠说明和关键信任信息，降低理解摩擦。"},
      {title: "用 glossary 稳定品牌和术语表达", description: "让品牌词、产品词和营销语气在多页面、多语言里尽量保持一致。"},
      {title: "把语言、货币和页面结构一起本地化", description: "不只翻译正文，也覆盖主题区块、切换逻辑和结构化内容，让体验更完整。"},
    ],
    recommendedProducts: [
      {
        title: "AI Translator",
        description: "用在商品页、FAQ、主题内容和品牌术语控制上，是提升跨市场转化的核心能力层。",
        href: "/products/translator",
        meta: ["Product", "Localization"],
      },
      {
        title: "Demo Center",
        description: "先看翻译前后、术语控制和结构化内容覆盖的演示，再判断是否适合自己的业务场景。",
        href: "/demo",
        meta: ["Demo", "Conversion"],
      },
    ],
    relatedResources: [
      {
        title: "How to setup and use glossary?",
        description: "如果你要把多语言页面做得像自己的品牌，这篇文档是最关键的起点。",
        href: "/help-center/ShopifyApp/how-to-setup-and-use-glossary/",
        meta: ["Help Center", "Glossary"],
      },
      {
        title: "CIWI Translator 插件介绍",
        description: "快速理解 Translator 适合什么商家、解决什么问题，以及产品能力边界。",
        href: "/blog/ciwi-translator-cha-jian-jie-shao",
        meta: ["Blog", "Product"],
      },
      {
        title: "Ciwi vs Transcy",
        description: "适合继续看选型差异，尤其是 Shopify 适配深度和术语控制这两层。",
        href: "/compare/ciwi-vs-transcy",
        meta: ["Compare", "Selection"],
      },
    ],
    faq: [
      {question: "为什么本地化会直接影响转化？", answer: "因为用户是否愿意继续浏览、是否信任商品、是否理解优惠，往往取决于页面表达是不是贴近目标市场。"},
      {question: "提升转化应该先改哪里？", answer: "通常先从商品标题、卖点、FAQ、优惠表达和语言货币体验这些最直接影响购买决策的位置开始。"},
    ],
    ctaLabel: "Open translator product",
    ctaHref: "/products/translator",
  },
  {
    slug: "multilingual-growth",
    name: "Expand Global Reach",
    title: "Expand Global Reach with Structured Localization",
    description: "围绕多语言覆盖、持续同步和内容治理，帮助 Shopify 商家更稳地进入新的市场。",
    heroTitle: "让多语言扩张不止是上线，而是可以长期维护",
    heroDescription:
      "进入新市场最难的部分，往往不是第一次翻译，而是后续新品、活动和页面更新能不能继续保持多语言一致。",
    targetSignals: ["准备验证新的国家或地区市场", "商品和活动更新频繁，人工同步成本越来越高", "已经有多语言版本，但内容质量和一致性不稳定"],
    challenges: [
      "翻译只覆盖主文本，主题区块、metafields、FAQ 和图片文案经常被遗漏。",
      "每次上新、改版或促销都需要重新同步多个语言版本，运营成本不断上升。",
      "内容、产品和帮助资源彼此割裂，难以形成稳定的增长闭环。",
    ],
    approach: [
      {title: "先明确哪些内容必须一起被翻译", description: "把商品、导航、FAQ、主题区块、metafields 和图片文案纳入同一套本地化范围。"},
      {title: "把重点放在持续同步，而不是一次性上线", description: "真正决定运营效率的，是后续更新能不能快速进入所有目标市场版本。"},
      {title: "让产品页、资源页和帮助文档一起承接增长", description: "当用户搜索、比较和理解产品时，所有前台页面都应该协同工作。"},
    ],
    recommendedProducts: [
      {
        title: "AI Translator",
        description: "负责结构化内容翻译、术语控制和多语言持续同步。",
        href: "/products/translator",
        meta: ["Product", "Multilingual"],
      },
      {
        title: "Resources Hub",
        description: "把 Compare、Blog 和 Help Center 聚合起来，帮助用户持续理解多语言增长问题。",
        href: "/resources",
        meta: ["Resources", "SEO"],
      },
    ],
    relatedResources: [
      {
        title: "Does Translate Language AI Adapt support multiple languages?",
        description: "解释语言覆盖范围，以及多语言扩张时真正应该关注的边界和节奏。",
        href: "/help-center/ShopifyApp/does-translate-language-ai-adapt-support-multiple-languages/",
        meta: ["Help Center", "Languages"],
      },
      {
        title: "Can I auto switch language or currency based on website visitors' geolocation?",
        description: "继续看语言和货币自动切换对跨境体验和转化的影响。",
        href: "/help-center/ShopifyApp/can-i-auto-switch-language-or-currency-based-on-website-visitors-geolocation/",
        meta: ["Help Center", "Geolocation"],
      },
      {
        title: "Ciwi vs Langwill",
        description: "从内容承接、长期治理和前台统一角度看不同路径的差异。",
        href: "/compare/ciwi-vs-langwill",
        meta: ["Compare", "Selection"],
      },
    ],
    faq: [
      {question: "多语言扩张最容易忽略什么？", answer: "最容易忽略的是结构化内容和持续同步。很多团队完成了第一次翻译，却没有为后续更新建立稳定流程。"},
      {question: "什么时候应该尽早建立 glossary？", answer: "当你开始同时维护多个市场，且品牌词、产品术语或营销表达不能随意变化时，就应该尽早建立 glossary。"},
    ],
    ctaLabel: "Browse resources",
    ctaHref: "/resources",
  },
  {
    slug: "grow-aov",
    name: "Grow AOV",
    title: "Grow AOV with Clear Bundle Narratives",
    description: "围绕套餐逻辑、加购引导和优惠表达，帮助 Shopify 商家更稳定地提升客单价。",
    heroTitle: "让用户看懂为什么要一起买，而不只是看到一个折扣",
    heroDescription:
      "很多 AOV 问题并不是折扣规则不够多，而是套餐价值没有被讲清楚。用户如果看不懂节省了什么、为什么适合一起买，就很难自然接受加购。",
    targetSignals: ["SKU 之间有明显搭配关系", "活动期需要更清晰的套餐表达", "希望提高购物车和商品页的加购接受率"],
    challenges: [
      "套餐和折扣规则已经存在，但页面表达割裂，用户很难快速理解收益。",
      "加购入口与主商品关系不够自然，推荐看起来像额外打扰。",
      "促销季信息临时堆叠，长期难以形成一致的购买理由。",
    ],
    approach: [
      {title: "先讲清楚组合购买的理由", description: "用户更容易理解“为什么这样买更划算”，而不是先理解折扣规则本身。"},
      {title: "把节省金额和价值差异放到前台", description: "让商品页和购物车直接展示套餐价值、节省金额和适合对象。"},
      {title: "让产品、内容和演示一起解释 AOV 逻辑", description: "通过产品页、Demo 和资源内容共同解释 Bundle 的作用边界。"},
    ],
    recommendedProducts: [
      {
        title: "Bundle Discount",
        description: "围绕套餐组合、加购引导和优惠表达提升 AOV。",
        href: "/products/bundle-discount",
        meta: ["Product", "AOV"],
      },
      {
        title: "Demo Center",
        description: "先看购物车与套餐表达的轻演示，再决定是否深入咨询。",
        href: "/demo",
        meta: ["Demo", "Bundle"],
      },
    ],
    relatedResources: [
      {
        title: "Resources Hub",
        description: "汇总 Compare、Blog 和 Help Center 内容，适合继续理解 AOV 相关问题。",
        href: "/resources",
        meta: ["Resources", "Growth"],
      },
      {
        title: "Bundle Discount",
        description: "直接进入产品页，看套餐表达和加购路径应该如何设计。",
        href: "/products/bundle-discount",
        meta: ["Product", "Bundle"],
      },
      {
        title: "About ciwi.ai-translator Shopify App",
        description: "作为产品说明模板参考，帮助统一官网前台的叙事方式。",
        href: "/help-center/ShopifyApp/about-ciwi-ai-translator-shopify-app/",
        meta: ["Help Center", "Overview"],
      },
    ],
    faq: [
      {question: "为什么 AOV 提升也需要内容和页面模板？", answer: "因为用户是否接受套餐和加购，很大程度取决于页面有没有把组合价值讲清楚，而不是后台规则本身。"},
      {question: "应该先优化折扣规则还是先优化表达？", answer: "很多时候先优化表达就能提升理解和接受度。规则重要，但如果用户看不懂价值，再复杂的规则也很难转化。"},
    ],
    ctaLabel: "Open bundle discount product",
    ctaHref: "/products/bundle-discount",
  },
];

export const solutionMap = Object.fromEntries(solutions.map((solution) => [solution.slug, solution]));
