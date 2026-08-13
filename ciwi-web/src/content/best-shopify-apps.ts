import type {Locale} from "@/lib/i18n";
import generatedCollections from "@/content/best-shopify-apps.generated.json";
import importedCollections from "@/content/data/best_shopify_app_collections.json";

export type BestShopifyAppCriterion = {
  title: string;
  description: string;
};

export type BestShopifyAppPick = {
  rank: number;
  name: string;
  badge: string;
  summary: string;
  bestFor: string;
  pricing: string;
  strengths: string[];
  watchouts: string[];
  href?: string;
};

export type BestShopifyAppDecisionPoint = {
  title: string;
  description: string;
};

export type BestShopifyAppCollection = {
  slug: string;
  href: string;
  categorySlug: string;
  categoryLabel: string;
  year: number;
  updatedLabel: string;
  title: string;
  description: string;
  heroEyebrow: string;
  summary: string;
  intro: string[];
  methodology: BestShopifyAppCriterion[];
  picks: BestShopifyAppPick[];
  selectionGuide: BestShopifyAppDecisionPoint[];
  rightFitGuide: BestShopifyAppDecisionPoint[];
  finalVerdict: {
    title: string;
    paragraphs: string[];
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  keywords: string[];
};

const collectionsEn: BestShopifyAppCollection[] = [
  {
    slug: "shopify-translation-apps-2026",
    href: "/best-shopify-apps/shopify-translation-apps-2026",
    categorySlug: "translation",
    categoryLabel: "Translation",
    year: 2026,
    updatedLabel: "Updated August 2026",
    title: "Best Shopify Translation Apps (2026)",
    description:
      "A year-based roundup of Shopify translation apps, focused on structured localization coverage, workflow depth, and long-term maintenance fit.",
    heroEyebrow: "Best Shopify Apps",
    summary:
      "If your store needs more than quick text translation, the best option in 2026 is usually the app that handles Shopify structure, repeated updates, and long-term terminology control with the least operational friction.",
    intro: [
      "For this 2026 shortlist, the real question is not which app can translate text fastest. It is which app can support Shopify localization as an ongoing workflow across products, themes, navigation, FAQs, images, and repeated updates.",
      "That is why the ranking below gives more weight to operational fit after launch, not just first-demo speed.",
    ],
    methodology: [
      {
        title: "Shopify structure coverage",
        description: "The shortlist prioritizes tools that can go beyond product body text and support the broader Shopify storefront content stack.",
      },
      {
        title: "Operational depth",
        description: "Glossary control, sync behavior, workflow clarity, and reviewability matter more than one-click translation claims alone.",
      },
      {
        title: "Launch-to-maintenance fit",
        description: "A strong app should work both at initial rollout and during later updates, seasonal campaigns, and market expansion.",
      },
    ],
    picks: [
      {
        rank: 1,
        name: "Ciwi Translator",
        badge: "Best for structured Shopify localization",
        summary:
          "Ciwi is the strongest fit when you want localization to cover products, themes, navigation, FAQs, images, and metafields in one operating workflow.",
        bestFor: "Brands that care about long-term multilingual governance, glossary control, and broader Shopify structure coverage.",
        pricing: "Free, then paid plans from $7.99/month.",
        strengths: [
          "Strong coverage across Shopify content types, not only plain text blocks",
          "Glossary and workflow positioning are clearer than generic translation tools",
          "Better fit for merchants who expect repeated updates after launch",
        ],
        watchouts: [
          "This is more valuable for merchants with ongoing localization needs than for stores wanting the simplest possible first setup",
          "Teams still need to define terminology and review standards to get the most from it",
        ],
        href: "/products/translator",
      },
      {
        rank: 2,
        name: "Shopify Translate & Adapt",
        badge: "Best native starting point",
        summary:
          "The native Shopify option is the easiest starting point for merchants who want a lightweight path and prefer staying close to Shopify's own workflow.",
        bestFor: "Stores testing early multilingual demand with modest requirements and a preference for native tooling.",
        pricing: "Native Shopify path; pricing depends on the broader Shopify setup.",
        strengths: [
          "Low-friction entry for merchants already operating inside Shopify",
          "Good option when requirements are still simple and scope is narrow",
          "Strong fit for merchants who prefer native-first evaluation",
        ],
        watchouts: [
          "The workflow is usually less complete for broader localization governance",
          "Merchants often outgrow it once structured content and repeated updates become more complex",
        ],
        href: "/compare/ciwi-vs-shopify-translate-adapt",
      },
      {
        rank: 3,
        name: "Weglot",
        badge: "Best for fast storefront launch",
        summary:
          "Weglot remains appealing when speed matters most and merchants want to get multilingual storefront coverage live quickly.",
        bestFor: "Teams that care most about launch speed and broad first-pass coverage.",
        pricing: "Pricing varies by usage and plan tier.",
        strengths: [
          "Fast time to first multilingual storefront rollout",
          "Well-known option for merchants prioritizing launch momentum",
          "Useful when broad coverage matters more than deep workflow control",
        ],
        watchouts: [
          "Fast launch does not automatically mean easier long-term governance",
          "Merchants should review ongoing control and maintenance cost carefully",
        ],
        href: "/compare/ciwi-vs-weglot",
      },
      {
        rank: 4,
        name: "Transcy",
        badge: "Best for translation plus currency bundle",
        summary:
          "Transcy is attractive when merchants want translation, currency, and broader storefront localization bundled into one shopping decision.",
        bestFor: "Stores that want an all-in-one multilingual storefront tool with currency capabilities in the same product story.",
        pricing: "Free tier, then paid plans up to higher multi-language tiers.",
        strengths: [
          "Clear all-in-one positioning for translation plus currency use cases",
          "Works well for merchants evaluating broad storefront localization bundles",
          "Useful for teams that want multiple localization functions under one app",
        ],
        watchouts: [
          "Operational tradeoffs and long-term maintenance quality need closer review",
          "A broader bundle is not always the same as stronger structured localization governance",
        ],
        href: "/compare/ciwi-vs-transcy",
      },
      {
        rank: 5,
        name: "Langwill",
        badge: "Best for simpler SMB setup",
        summary:
          "Langwill is a reasonable option for smaller stores that want a simpler translation setup without building a heavier localization process right away.",
        bestFor: "Smaller merchants that want an easier setup path and can accept less workflow depth.",
        pricing: "Varies by plan and scope.",
        strengths: [
          "Lower complexity positioning for merchants who want to move quickly",
          "Can fit stores with lighter structure and fewer localization edge cases",
          "Useful for merchants who are still early in multilingual operations",
        ],
        watchouts: [
          "Not the best fit if your store already depends on complex content structure",
          "May feel limiting once governance and sync requirements increase",
        ],
        href: "/compare/ciwi-vs-langwill",
      },
      {
        rank: 6,
        name: "Langify",
        badge: "Best for merchants wanting manual control",
        summary:
          "Langify can still make sense for merchants who want more explicit manual control and are comfortable managing more of the localization process themselves.",
        bestFor: "Teams that prefer hands-on control over language management and are willing to accept more manual effort.",
        pricing: "Paid app with pricing based on its current public plans.",
        strengths: [
          "Fits merchants that prefer a more controlled and manual path",
          "Useful when teams want to stay closely involved in translation operations",
          "Can work well for established storefronts with stable process owners",
        ],
        watchouts: [
          "Manual control often means more operational effort over time",
          "Not the strongest option if your goal is reducing maintenance workload",
        ],
        href: "/compare/ciwi-vs-langify",
      },
    ],
    selectionGuide: [
      {
        title: "Compare them by content coverage first",
        description: "If an app only handles visible page copy well, you may still struggle later with themes, navigation, FAQs, metafields, and image-related localization.",
      },
      {
        title: "Then compare workflow depth",
        description: "Glossary behavior, sync rules, review flow, and update handling matter more than a fast first translation if your catalog changes often.",
      },
      {
        title: "Then compare maintenance cost",
        description: "The best app is usually the one that reduces repeated cleanup and translation drift after launch, not the one that only looks cheapest on day one.",
      },
    ],
    rightFitGuide: [
      {
        title: "Choose Ciwi if workflow depth matters",
        description: "Pick Ciwi when your real challenge is ongoing localization quality, glossary stability, and Shopify structure coverage rather than quick text conversion alone.",
      },
      {
        title: "Choose native Shopify if scope is still light",
        description: "If you are only validating demand or testing one early market, the native path may be enough before workflow complexity grows.",
      },
      {
        title: "Choose launch-speed tools when time is the bottleneck",
        description: "Apps like Weglot are easier to justify when launch speed matters more than structured governance during the first phase.",
      },
      {
        title: "Choose bundled tools when currency is part of the same decision",
        description: "If the selection problem includes both translation and currency experience together, bundled options such as Transcy become more relevant.",
      },
    ],
    finalVerdict: {
      title: "Final verdict",
      paragraphs: [
        "If your store only needs a light first step into multilingual selling, Shopify Translate & Adapt or a launch-speed tool may be enough for now.",
        "If you already know localization will become an ongoing operating layer across structured storefront content, Ciwi is the stronger long-term choice in this 2026 shortlist.",
      ],
      primaryLabel: "Open Ciwi Translator",
      primaryHref: "/products/translator",
      secondaryLabel: "Back to Best Shopify Apps",
      secondaryHref: "/best-shopify-apps",
    },
    keywords: [
      "best shopify translation apps",
      "shopify translator app",
      "shopify localization app",
      "best shopify apps 2026",
    ],
  },
];

const collectionsZh: BestShopifyAppCollection[] = [
  {
    slug: "shopify-translation-apps-2026",
    href: "/best-shopify-apps/shopify-translation-apps-2026",
    categorySlug: "translation",
    categoryLabel: "翻译",
    year: 2026,
    updatedLabel: "更新于 2026 年 8 月",
    title: "2026 年 Shopify 最佳翻译 App 推荐",
    description:
      "按年份组织的 Shopify 翻译 App 合集页，重点看结构化本地化覆盖、工作流深度，以及长期维护是否省心。",
    heroEyebrow: "Best Shopify Apps",
    summary:
      "如果你的店铺需要的不只是把文字翻出来，那么 2026 年更值得优先看的，通常是那些能同时处理 Shopify 结构、后续更新和术语稳定性的产品。",
    intro: [
      "对于 2026 年的这份翻译榜单，真正的问题不是谁翻得最快，而是谁能把 Shopify 本地化变成一个长期可持续的工作流，覆盖产品、主题、导航、FAQ、图片和后续反复更新。",
      "所以这份排序更看重上线之后是否省心，而不是只看第一次演示是否足够快。",
    ],
    methodology: [
      {
        title: "Shopify 结构覆盖",
        description: "这份 shortlist 优先看能否覆盖更完整的店铺内容结构，而不只是商品正文。",
      },
      {
        title: "运营工作流深度",
        description: "术语表、同步能力、审核过程和流程清晰度，比“点一下就翻译”更重要。",
      },
      {
        title: "从上线到维护的适配度",
        description: "好的 app 不只适合首发，也要能承接后续更新、活动页和多市场扩张。",
      },
    ],
    picks: [
      {
        rank: 1,
        name: "Ciwi Translator",
        badge: "最适合结构化 Shopify 本地化",
        summary:
          "如果你希望把 products、themes、navigation、FAQ、images 和 metafields 放进同一套本地化工作流里，Ciwi 是这组里更完整的方案。",
        bestFor: "重视长期多语言治理、术语一致性，以及 Shopify 结构化内容覆盖的品牌商家。",
        pricing: "免费起步，付费版从 $7.99/月开始。",
        strengths: [
          "覆盖的 Shopify 内容类型更完整，不只限于纯文本翻译",
          "术语表和工作流定位比通用翻译工具更清晰",
          "更适合上线后还会持续更新内容的商家",
        ],
        watchouts: [
          "如果你只是想最快速做一个很轻量的首发，这类能力未必第一天就能完全用满",
          "团队依然需要设定术语和审核规则，才能把价值发挥到最好",
        ],
        href: "/products/translator",
      },
      {
        rank: 2,
        name: "Shopify Translate & Adapt",
        badge: "最适合原生轻量起步",
        summary:
          "如果你倾向于先走 Shopify 原生路径，并且当前需求还比较轻，Translate & Adapt 是最自然的起点。",
        bestFor: "只是在早期测试多语言需求、范围还不复杂、偏好原生工具链的店铺。",
        pricing: "属于 Shopify 原生路径，成本取决于整体 Shopify 方案。",
        strengths: [
          "对已经在 Shopify 里运营的商家来说上手门槛低",
          "当需求还比较简单时，是比较自然的试水路径",
          "适合偏好原生优先的商家先做评估",
        ],
        watchouts: [
          "对于更完整的本地化治理场景，工作流通常不够深",
          "当结构化内容和后续更新变复杂后，商家比较容易长出来更多需求",
        ],
        href: "/compare/ciwi-vs-shopify-translate-adapt",
      },
      {
        rank: 3,
        name: "Weglot",
        badge: "最适合追求上线速度",
        summary:
          "如果首要目标是尽快把多语言 storefront 跑起来，Weglot 依然是很容易进入候选名单的产品。",
        bestFor: "把首发速度放在第一位、希望尽快铺开首轮多语言覆盖的团队。",
        pricing: "按使用量和套餐层级变化。",
        strengths: [
          "多语言首发速度快",
          "适合优先追求上线节奏的商家",
          "在更看重覆盖速度而非治理深度时很有吸引力",
        ],
        watchouts: [
          "上线快不等于后续治理就更省心",
          "长期控制力和维护成本仍然需要单独评估",
        ],
        href: "/compare/ciwi-vs-weglot",
      },
      {
        rank: 4,
        name: "Transcy",
        badge: "最适合翻译和货币一起选",
        summary:
          "当商家想把翻译、货币和多市场 storefront 能力打包一起评估时，Transcy 的产品叙事会更有吸引力。",
        bestFor: "希望在同一个产品里一起考虑翻译和货币体验的店铺。",
        pricing: "有免费版，也有更高阶的多语言套餐。",
        strengths: [
          "翻译加货币的一体化定位比较明确",
          "适合一起评估 storefront 多语言和多币种的商家",
          "如果你倾向于一站式购买决策，会比较容易理解它",
        ],
        watchouts: [
          "功能打包更全，不代表结构化本地化治理也更强",
          "长期运营层面的取舍仍然需要仔细看",
        ],
        href: "/compare/ciwi-vs-transcy",
      },
      {
        rank: 5,
        name: "Langwill",
        badge: "最适合中小商家轻量配置",
        summary:
          "对于规模更小、想先用更轻的方式完成翻译配置的商家，Langwill 是一个可以考虑的轻量选项。",
        bestFor: "想快速上手、对流程深度要求还不高的中小商家。",
        pricing: "按公开套餐和能力范围变化。",
        strengths: [
          "定位更轻，适合先跑起来",
          "对结构没那么复杂的店铺更友好",
          "适合多语言运营刚起步的商家",
        ],
        watchouts: [
          "如果店铺内容结构已经比较复杂，适配度会下降",
          "当治理和同步要求提高之后，可能会觉得不够用",
        ],
        href: "/compare/ciwi-vs-langwill",
      },
      {
        rank: 6,
        name: "Langify",
        badge: "最适合偏手动控制的团队",
        summary:
          "如果团队更喜欢自己把控语言管理过程，并且接受更多手动操作，Langify 仍然有它的位置。",
        bestFor: "偏好手动控制、愿意投入更多人力维护翻译流程的团队。",
        pricing: "付费 app，按当前公开套餐计费。",
        strengths: [
          "适合希望自己更强参与翻译管理的团队",
          "当流程 owner 很明确时更容易落地",
          "对稳定老店来说可以作为偏手动的可控路径",
        ],
        watchouts: [
          "手动控制通常意味着后续运营人力更多",
          "如果你的目标是降低维护成本，它未必是最优先的选择",
        ],
        href: "/compare/ciwi-vs-langify",
      },
    ],
    selectionGuide: [
      {
        title: "先按内容覆盖来比较",
        description: "如果一个 app 只擅长处理页面可见文案，你后面仍然会卡在 theme、navigation、FAQ、metafields 和图片本地化这些问题上。",
      },
      {
        title: "再按工作流深度比较",
        description: "如果你的目录和活动会持续变化，术语表、同步规则、审核方式和后续更新处理，会比第一次翻译速度更重要。",
      },
      {
        title: "最后按维护成本比较",
        description: "真正更好的 app，通常不是第一天最便宜的那个，而是后面最能减少重复清理和翻译漂移的那个。",
      },
    ],
    rightFitGuide: [
      {
        title: "如果你更看重工作流深度，优先选 Ciwi",
        description: "当你的核心问题是长期多语言质量、术语稳定和 Shopify 结构覆盖时，Ciwi 的适配度会更高。",
      },
      {
        title: "如果当前范围还轻，可以先看原生 Shopify",
        description: "如果只是验证市场或先试一个早期语种，原生路径可能已经足够。",
      },
      {
        title: "如果时间最紧，优先看偏快启型工具",
        description: "像 Weglot 这样的方案更适合首阶段把速度放在第一位的团队。",
      },
      {
        title: "如果翻译和货币要一起决策，优先看打包型产品",
        description: "当选型问题本身就包含多币种体验时，像 Transcy 这样的组合型工具会更相关。",
      },
    ],
    finalVerdict: {
      title: "文末总结",
      paragraphs: [
        "如果你现在只是轻量试水多语言，原生 Shopify 路径或者偏快启型工具就已经够用了。",
        "如果你已经明确多语言会成为长期运营层的一部分，那么在这份 2026 榜单里，Ciwi 依然是更稳的长期选择。",
      ],
      primaryLabel: "打开 Ciwi Translator",
      primaryHref: "/products/translator",
      secondaryLabel: "返回 Best Shopify Apps",
      secondaryHref: "/best-shopify-apps",
    },
    keywords: [
      "shopify 最佳翻译 app",
      "shopify 翻译插件推荐",
      "shopify 本地化工具",
      "best shopify apps 2026",
    ],
  },
];

function mergeCollections(base: BestShopifyAppCollection[], generated: BestShopifyAppCollection[]) {
  const existingSlugs = new Set(base.map((item) => item.slug));
  const generatedItems = generated.filter((item) => !existingSlugs.has(item.slug));

  return [...base, ...generatedItems];
}

const importedCollectionZhMeta: Record<
  string,
  {
    topic: string;
    categoryLabel: string;
    heroEyebrow: string;
    keywords: string[];
    isBusinessGoal?: boolean;
  }
> = {
  "best-shopify-review-apps": {
    topic: "评论管理",
    categoryLabel: "评论",
    heroEyebrow: "客户评价",
    keywords: ["shopify 评论 app 推荐", "shopify 评价插件", "best shopify review apps"],
  },
  "best-shopify-email-marketing-apps": {
    topic: "邮件营销",
    categoryLabel: "邮件营销",
    heroEyebrow: "留存营销",
    keywords: ["shopify 邮件营销 app", "shopify EDM 插件", "best shopify email marketing apps"],
  },
  "best-shopify-upsell-apps": {
    topic: "加购与捆绑销售",
    categoryLabel: "加购与捆绑",
    heroEyebrow: "客单价增长",
    keywords: ["shopify upsell app 推荐", "shopify bundle app", "提高客单价 app"],
  },
  "best-shopify-seo-apps": {
    topic: "SEO",
    categoryLabel: "SEO",
    heroEyebrow: "自然流量增长",
    keywords: ["shopify SEO app 推荐", "shopify seo 插件", "best shopify seo apps"],
  },
  "best-shopify-shipping-apps": {
    topic: "物流与发货",
    categoryLabel: "物流",
    heroEyebrow: "履约运营",
    keywords: ["shopify shipping app 推荐", "shopify 发货插件", "物流 tracking app"],
  },
  "best-shopify-dropshipping-apps": {
    topic: "代发货",
    categoryLabel: "代发货",
    heroEyebrow: "选品与供货",
    keywords: ["shopify dropshipping app", "shopify 代发货插件", "dropshipping 工具推荐"],
  },
  "best-shopify-loyalty-apps": {
    topic: "会员积分与推荐裂变",
    categoryLabel: "忠诚度与推荐",
    heroEyebrow: "复购增长",
    keywords: ["shopify loyalty app", "shopify referral app", "会员积分插件推荐"],
  },
  "best-shopify-page-builder-apps": {
    topic: "页面搭建",
    categoryLabel: "页面搭建",
    heroEyebrow: "店铺前台设计",
    keywords: ["shopify page builder app", "shopify 页面搭建插件", "landing page builder"],
  },
  "best-shopify-product-options-apps": {
    topic: "商品选项",
    categoryLabel: "商品选项",
    heroEyebrow: "商品灵活度",
    keywords: ["shopify product options app", "shopify 变体插件", "商品定制选项 app"],
  },
  "best-shopify-analytics-apps": {
    topic: "数据分析",
    categoryLabel: "数据分析",
    heroEyebrow: "店铺数据洞察",
    keywords: ["shopify analytics app", "shopify 数据分析插件", "shopify dashboard app"],
  },
  "best-free-shopify-apps": {
    topic: "免费 App",
    categoryLabel: "免费 App",
    heroEyebrow: "低成本工具栈",
    keywords: ["free shopify apps", "shopify 免费 app 推荐", "免费 Shopify 插件"],
  },
  "best-new-shopify-apps": {
    topic: "新兴 App",
    categoryLabel: "新兴 App",
    heroEyebrow: "新工具趋势",
    keywords: ["new shopify apps", "新 Shopify app 推荐", "新兴 shopify 工具"],
  },
  "best-shopify-apps-to-increase-traffic": {
    topic: "提升流量",
    categoryLabel: "业务目标",
    heroEyebrow: "流量获取",
    keywords: ["提升流量的 shopify app", "shopify 获客工具", "increase traffic shopify apps"],
    isBusinessGoal: true,
  },
  "best-shopify-apps-to-improve-conversion-rate": {
    topic: "提升转化率",
    categoryLabel: "业务目标",
    heroEyebrow: "转化优化",
    keywords: ["提升转化率的 shopify app", "shopify conversion app", "improve conversion rate shopify apps"],
    isBusinessGoal: true,
  },
  "best-shopify-apps-to-improve-checkout-conversion": {
    topic: "提升结账转化",
    categoryLabel: "业务目标",
    heroEyebrow: "结账完成率",
    keywords: ["提升结账转化的 shopify app", "checkout conversion shopify apps", "结账优化 app"],
    isBusinessGoal: true,
  },
  "best-shopify-apps-to-increase-average-order-value": {
    topic: "提高客单价",
    categoryLabel: "业务目标",
    heroEyebrow: "AOV 增长",
    keywords: ["提高客单价的 shopify app", "AOV shopify apps", "增加平均订单金额 app"],
    isBusinessGoal: true,
  },
  "best-shopify-apps-to-reduce-cart-abandonment": {
    topic: "减少弃单",
    categoryLabel: "业务目标",
    heroEyebrow: "弃单挽回",
    keywords: ["减少弃单的 shopify app", "cart abandonment shopify apps", "弃单挽回 app"],
    isBusinessGoal: true,
  },
  "best-shopify-apps-to-increase-repeat-purchases": {
    topic: "提高复购",
    categoryLabel: "业务目标",
    heroEyebrow: "复购收入",
    keywords: ["提高复购的 shopify app", "repeat purchases shopify apps", "shopify 复购工具"],
    isBusinessGoal: true,
  },
  "best-shopify-apps-to-improve-customer-lifetime-value": {
    topic: "提升客户终身价值",
    categoryLabel: "业务目标",
    heroEyebrow: "客户价值增长",
    keywords: ["提升客户终身价值的 shopify app", "CLV shopify apps", "customer lifetime value 工具"],
    isBusinessGoal: true,
  },
  "best-shopify-apps-to-improve-customer-support": {
    topic: "提升客户支持效率",
    categoryLabel: "业务目标",
    heroEyebrow: "客服运营",
    keywords: ["提升客户支持效率的 shopify app", "shopify 客服 app", "customer support shopify apps"],
    isBusinessGoal: true,
  },
};

const importedBestForZhMap: Record<string, string> = {
  "adding useful store features without upfront software cost": "低成本补齐店铺常用能力",
  "answering customer questions faster and reducing support workload": "更快响应客户问题并降低客服负担",
  "bringing existing customers back for another purchase": "让老客户更快回到店铺再次下单",
  "bringing more qualified shoppers to a Shopify store": "为店铺带来更高质量的访问流量",
  "building email, SMS, and lifecycle marketing flows": "搭建邮件、短信和生命周期营销流程",
  "building storefront pages and landing pages without heavy theme work": "在不重度改主题的情况下搭建页面和落地页",
  "collecting and displaying customer reviews": "收集并展示客户评价",
  "finding newer Shopify apps with early traction": "发现已有早期增长势头的新 Shopify App",
  "growing long-term revenue from existing customers": "从老客户中持续放大长期收入",
  "improving search visibility and technical SEO hygiene": "提升搜索可见度和技术 SEO 完整度",
  "increasing average order value with bundles and offers": "通过捆绑和优惠提高客单价",
  "increasing cart size with upsells, bundles, discounts, and offers": "通过加购、捆绑和折扣提升购物车金额",
  "loyalty programs, rewards, referrals, and memberships": "做会员积分、奖励、推荐裂变和会员体系",
  "recovering shoppers who leave before completing an order": "挽回还没完成下单就离开的访客",
  "reducing checkout friction and helping more shoppers complete payment": "减少结账阻力并提升付款完成率",
  "reporting, attribution, forecasting, and operational dashboards": "做报表、归因、预测和经营仪表盘",
  "selling customizable products, variants, and personalized options": "销售可定制商品、变体和个性化选项",
  "shipping, delivery tracking, returns, and fulfillment workflows": "处理发货、物流跟踪、退货和履约流程",
  "sourcing, importing, and fulfilling dropshipping products": "做代发货商品 sourcing、导入和履约",
  "turning more storefront visitors into buyers": "把更多访客转成下单买家",
};

function translateImportedBadge(badge: string) {
  if (badge === "Best overall") {
    return "综合首选";
  }

  if (badge === "Best free plan") {
    return "免费方案首选";
  }

  if (badge === "Fast-growing") {
    return "增长势头快";
  }

  return badge;
}

function translateImportedPricing(pricing: string) {
  return pricing
    .replace(/Free plan available/gi, "提供免费方案")
    .replace(/^Free$/gi, "免费")
    .replace(/free trial/gi, "免费试用")
    .replace(/paid plans from \$([\d.]+)\s*\/\s*month/gi, "付费方案 $1 美元/月起")
    .replace(/Starts at \$([\d.]+) for US/gi, "美国地区 $1 美元起")
    .replace(/Pricing varies by plan tier\.?/gi, "价格会随套餐档位变化")
    .replace(/SMS prices depends on country\.?/gi, "短信费用随国家或地区变化")
    .replace(/Varies by plan and scope\.?/gi, "价格会随套餐和使用范围变化")
    .replace(/Native Shopify path; pricing depends on the broader Shopify setup\.?/gi, "原生 Shopify 路径，实际成本取决于你的 Shopify 方案")
    .replace(/; /g, "；");
}

function translateImportedStrength(strength: string) {
  const ratingMatch = strength.match(/^Strong ([\d.]+)-star rating$/);
  if (ratingMatch) {
    return `评分表现稳定，达到 ${ratingMatch[1]} 星`;
  }

  const reviewsMatch = strength.match(/^([\d,]+) merchant reviews$/);
  if (reviewsMatch) {
    return `已有 ${reviewsMatch[1]} 条商家评价`;
  }

  const installsMatch = strength.match(/^Estimated ([\d,]+) total installs$/);
  if (installsMatch) {
    return `预估安装量约为 ${installsMatch[1]}`;
  }

  if (strength === "Shows current install momentum") {
    return "当前安装增长势头比较明显";
  }

  return strength;
}

function translateImportedWatchout(watchout: string) {
  if (watchout === "Confirm feature fit and plan limits before installing") {
    return "安装前建议确认功能匹配度和套餐限制";
  }

  if (watchout === "Newer app with less long-term operating history") {
    return "属于较新的 App，长期稳定性还需要继续观察";
  }

  if (watchout === "No clearly listed free plan in the dataset") {
    return "当前数据里没有明确看到免费方案";
  }

  if (watchout === "Smaller review base than more established apps") {
    return "评价基数比成熟产品更小，参考样本还不算多";
  }

  return watchout;
}

function buildImportedZhTitle(meta: (typeof importedCollectionZhMeta)[string], year: number) {
  return meta.isBusinessGoal ? `${year} 年适合${meta.topic}的 Shopify 最佳 App 推荐` : `${year} 年 Shopify 最佳${meta.topic} App 推荐`;
}

function buildImportedZhDescription(meta: (typeof importedCollectionZhMeta)[string]) {
  return meta.isBusinessGoal
    ? `围绕“${meta.topic}”这一业务目标整理的 Shopify App 榜单，综合口碑、安装基础和实际适配度，帮助商家更快收敛候选范围。`
    : `围绕 ${meta.topic} 这一使用场景整理的 Shopify App 榜单，综合评分、商家反馈和安装基础，帮助商家更快缩小选择范围。`;
}

function buildImportedZhSummary(meta: (typeof importedCollectionZhMeta)[string]) {
  return meta.isBusinessGoal
    ? `这份合集围绕“${meta.topic}”这一目标筛选 Shopify App，把平台口碑信号和实际落地相关性放在一起看，方便商家先缩小一轮候选范围。`
    : `这份合集按统一逻辑整理 Shopify ${meta.topic} App，并结合商家适配度、可信度和落地成本给出第一轮候选名单。`;
}

function buildImportedZhIntro(meta: (typeof importedCollectionZhMeta)[string]) {
  return meta.isBusinessGoal
    ? [
        `下面这些 App 围绕“${meta.topic}”这个业务目标筛出，而不是只按单一功能类目做罗列。`,
        "因为业务目标往往会跨越获客、转化、留存、分析和运营几个环节，所以榜单里可能会混合不同类型的工具。",
        "你可以先把这份榜单当作第一轮候选名单，再到 Shopify App Store 逐个确认最新价格、集成能力、套餐限制和实施成本。",
      ]
    : [
        `下面这些 App 从更大的 Shopify 应用数据集中筛出，并围绕 ${meta.topic} 场景做了相关性过滤。`,
        "排序会优先考虑评分、评价量、安装基础，以及近期是否仍有活跃增长信号。",
        "你可以先把这份榜单当作第一轮候选名单，再到 Shopify App Store 逐个确认最新价格、集成能力、套餐限制和支持质量。",
      ];
}

function buildImportedZhMethodology(meta: (typeof importedCollectionZhMeta)[string]): BestShopifyAppCriterion[] {
  return meta.isBusinessGoal
    ? [
        {
          title: "目标相关性",
          description: `先看这个 App 是否真的能推动“${meta.topic}”这一目标，而不是只提供泛化功能。`,
        },
        {
          title: "市场信号",
          description: "评分、评价量、安装基础和近期增长势头会一起纳入判断，而不是只看某一个数字。",
        },
        {
          title: "组合可行性",
          description: "同一个业务目标往往要和现有营销、客服、数据或履约流程协同，所以实施复杂度也会影响排序。",
        },
      ]
    : [
        {
          title: "相关性过滤",
          description: `先看它是否真正服务于 ${meta.topic} 这一场景，而不是只在描述里出现相近关键词。`,
        },
        {
          title: "质量信号",
          description: "优先考虑评分、评价量、安装基础和近期增长势头都更健康的产品。",
        },
        {
          title: "落地约束",
          description: "如果价格、套餐限制、集成条件或维护成本明显偏高，排序会更保守。",
        },
      ];
}

function buildImportedZhSelectionGuide(meta: (typeof importedCollectionZhMeta)[string]): BestShopifyAppDecisionPoint[] {
  return [
    {
      title: "先从核心工作流开始比较",
      description: meta.isBusinessGoal
        ? `先确认你的关键瓶颈到底是不是“${meta.topic}”，再看这个 App 是否能直接介入那条增长链路。`
        : `先确认它是否真的覆盖你最常用的 ${meta.topic} 工作流，而不是只在功能列表里看起来很全。`,
    },
    {
      title: "再看价格和套餐边界",
      description: "免费方案、用量限制、附加计费和后续升级成本，往往比首页价格本身更影响长期使用体验。",
    },
    {
      title: "最后确认兼容性和实施成本",
      description: "主题兼容性、已有工具栈、上手门槛和后续维护工作量，决定了这款 App 是否真的适合你的现状。",
    },
  ];
}

function buildImportedZhRightFitGuide(): BestShopifyAppDecisionPoint[] {
  return [
    {
      title: "小体量店铺",
      description: "如果你当前更在意上手快和成本可控，优先看免费方案或实施路径更轻的产品。",
    },
    {
      title: "增长中品牌",
      description: "如果你已经有明确的订单或流量基础，重点看扩展性、自动化能力和集成稳定性。",
    },
    {
      title: "成熟团队",
      description: "如果你的流程更复杂，优先选择支持更深配置、跨团队协同和长期治理的方案。",
    },
  ];
}

function buildImportedZhFinalVerdict(meta: (typeof importedCollectionZhMeta)[string], item: BestShopifyAppCollection) {
  return {
    title: meta.isBusinessGoal ? `如何为“${meta.topic}”选择合适的 App` : `如何选择适合自己的${meta.topic} App`,
    paragraphs: meta.isBusinessGoal
      ? [
          `最适合你的方案，通常是那个最能直接推动“${meta.topic}”并且能和现有流程顺畅协同的 App。`,
          "建议先用这份榜单收敛候选名单，再去 Shopify App Store 比较最新价格、评价趋势、支持质量和实际实施成本。",
        ]
      : [
          `最适合你的方案，通常是那个最能贴合当前 ${meta.topic} 工作流，同时不会把维护成本越用越重的 App。`,
          "建议先用这份榜单收敛候选名单，再去 Shopify App Store 比较最新价格、评价趋势、支持质量和实施复杂度。",
        ],
    primaryLabel: item.finalVerdict.primaryLabel,
    primaryHref: item.finalVerdict.primaryHref,
    secondaryLabel: "浏览 Shopify App Store",
    secondaryHref: item.finalVerdict.secondaryHref,
  };
}

function localizeImportedPickSummary(pick: BestShopifyAppPick) {
  const bestFor = importedBestForZhMap[pick.bestFor] ?? pick.bestFor;
  const prefix =
    pick.badge === "Best overall"
      ? "在这类场景里整体表现更稳"
      : pick.badge === "Best free plan"
        ? "更适合想先低成本试水的商家"
        : "近期增长势头较快，值得提前关注";

  return `${pick.name}${prefix}，适合用于${bestFor}，可以优先放进第一轮评估名单。`;
}

function localizeImportedCollections(
  collections: BestShopifyAppCollection[],
  locale: Locale,
): BestShopifyAppCollection[] {
  return collections.map((item) => {
    const normalizedHref = `/best-shopify-apps/${item.slug}`;

    if (locale === "en") {
      return {
        ...item,
        href: normalizedHref,
      };
    }

    const meta = importedCollectionZhMeta[item.slug];
    const fallbackMeta = {
      topic: item.categoryLabel,
      categoryLabel: item.categoryLabel,
      heroEyebrow: item.heroEyebrow,
      keywords: item.keywords,
      isBusinessGoal: item.categorySlug === "business-goals",
    };
    const resolvedMeta = meta ?? fallbackMeta;

    return {
      ...item,
      href: normalizedHref,
      categoryLabel: resolvedMeta.categoryLabel,
      updatedLabel: `${item.year} 年 8 月更新`,
      title: buildImportedZhTitle(resolvedMeta, item.year),
      description: buildImportedZhDescription(resolvedMeta),
      heroEyebrow: resolvedMeta.heroEyebrow,
      summary: buildImportedZhSummary(resolvedMeta),
      intro: buildImportedZhIntro(resolvedMeta),
      methodology: buildImportedZhMethodology(resolvedMeta),
      picks: item.picks.map((pick) => ({
        ...pick,
        badge: translateImportedBadge(pick.badge),
        summary: localizeImportedPickSummary(pick),
        bestFor: importedBestForZhMap[pick.bestFor] ?? pick.bestFor,
        pricing: translateImportedPricing(pick.pricing),
        strengths: pick.strengths.map(translateImportedStrength),
        watchouts: pick.watchouts.map(translateImportedWatchout),
      })),
      selectionGuide: buildImportedZhSelectionGuide(resolvedMeta),
      rightFitGuide: buildImportedZhRightFitGuide(),
      finalVerdict: buildImportedZhFinalVerdict(resolvedMeta, item),
      keywords: resolvedMeta.keywords,
    };
  });
}

const generatedCollectionMap = generatedCollections as Record<Locale, BestShopifyAppCollection[]>;
const importedCollectionItemsEn = localizeImportedCollections(importedCollections as BestShopifyAppCollection[], "en");
const importedCollectionItemsZh = localizeImportedCollections(importedCollections as BestShopifyAppCollection[], "zh-cn");
const mergedCollectionsEn = mergeCollections(
  mergeCollections(collectionsEn, importedCollectionItemsEn),
  generatedCollectionMap.en ?? [],
);
const mergedCollectionsZh = mergeCollections(
  mergeCollections(collectionsZh, importedCollectionItemsZh),
  generatedCollectionMap["zh-cn"] ?? [],
);

export function getBestShopifyAppCollections(locale: Locale) {
  return locale === "zh-cn" ? mergedCollectionsZh : mergedCollectionsEn;
}

export function getBestShopifyAppCollectionMap(locale: Locale) {
  return Object.fromEntries(getBestShopifyAppCollections(locale).map((item) => [item.slug, item]));
}
