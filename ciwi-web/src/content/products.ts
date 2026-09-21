import type {Locale} from "@/lib/i18n";
import {normalizeInternalHrefFields} from "@/lib/i18n-content";
import {localizeLanguageSignalFields} from "@/lib/localized-language-signal";
import {ciwiShopifyInstallUrl, sparkShopifyInstallUrl} from "@/lib/marketing-links";

export type ProductItem = {
  slug: string;
  name: string;
  seoTitle?: string;
  seoDescription?: string;
  shortDescription: string;
  heroTitle: string;
  heroDescription: string;
  videoUrl?: string;
  icon: string;
  metrics: string[];
  rating?: number;
  reviewCount?: number;
  reviewSnippets?: string[];
  targetUsers: string[];
  benefits: string[];
  features: {title: string; description: string}[];
  workflow: string[];
  useCases: {title: string; description: string}[];
  demoHighlights: string[];
  demoScenarios: {
    title: string;
    primaryLabel: string;
    primaryText: string;
    secondaryLabel: string;
    secondaryText: string;
    note: string;
    variants?: {
      label: string;
      primaryText: string;
      secondaryText: string;
      note?: string;
    }[];
  }[];
  featureModules?: {
    title: string;
    description: string;
    highlights: string[];
    primaryLabel: string;
    primaryText: string;
    secondaryLabel: string;
    secondaryText: string;
    note: string;
    previewLabels?: string[];
  }[];
  differentiators?: {
    title: string;
    description: string;
    bullets?: string[];
  }[];
  compareLinks?: {title: string; description: string; href: string; meta: string[]}[];
  relatedResources: {title: string; href: string; meta: string[]}[];
  faq: {question: string; answer: string}[];
  ctaLabel: string;
  ctaHref: string;
};

const productsEn: ProductItem[] = [
  {
    slug: "translator",
    name: "AI Translator",
    seoDescription: "Ciwi is an AI translation tool for Shopify ecommerce websites. Translate storefront content, manage brand terminology, and keep language versions in sync.",
    seoTitle: "AI Translation Tool for Shopify Ecommerce",
    shortDescription: "An AI translation tool for Shopify ecommerce websites, with glossary control and workflows for keeping multilingual storefront content up to date.",
    heroTitle: "AI-powered translation for your Shopify store",
    heroDescription:
      "Use Ciwi AI Translator to translate Shopify products, themes, navigation, FAQs, images, and metafields. Manage brand terminology and keep multilingual storefront content aligned as your store changes.",
    videoUrl: "https://www.youtube.com/embed/rAFB3AuXuH0?si=6v-NjiENBOqvREy-",
    icon: "/translate.svg",
    metrics: ["100+ languages", "Shopify-aware workflow", "Glossary and model control"],
    rating: 4.7,
    reviewCount: 22,
    reviewSnippets: [
      "Absolutely love this app! The support team is incredibly responsive — they help almost immediately.",
      "This app really works, and support responds fast whenever we need something.",
    ],
    targetUsers: [
      "Shopify brands expanding into new international markets",
      "Operations teams maintaining multilingual content over time",
      "Merchants who care about terminology consistency and localization quality",
    ],
    benefits: [
      "Launch multilingual storefronts faster",
      "Reduce terminology drift and brand inconsistency",
      "Keep later content updates synchronized more easily",
    ],
    features: [
      {title: "Translate beyond plain text", description: "Cover product copy, theme blocks, FAQs, navigation, image text, and metafields in one broader workflow."},
      {title: "Control terminology and tone", description: "Use glossary and model settings to stabilize brand terms, ingredients, and promotional language."},
      {title: "Stay synced as the store evolves", description: "When products, campaigns, and pages change, multilingual versions are easier to update in step."},
    ],
    workflow: [
      "Connect the store and identify translatable content",
      "Run translation by market, language, and glossary rules",
      "Review the output and keep future updates in sync",
    ],
    useCases: [
      {title: "Multilingual product pages", description: "For brands maintaining product titles, selling points, FAQs, and image messaging across markets."},
      {title: "Brand localization", description: "For teams that need glossary control over terminology, ingredients, and brand tone."},
      {title: "New market validation", description: "For merchants launching into more countries or languages and wanting a faster path to first release."},
    ],
    demoHighlights: ["Before / after translation", "Glossary term locking", "Theme and structured content coverage"],
    demoScenarios: [
      {
        title: "Product description localization",
        primaryLabel: "Original",
        primaryText: "Bundle two scalp-care products and save 15% with auto-applied discount.",
        secondaryLabel: "Localized",
        secondaryText: "Buy two scalp-care products and automatically receive a 15% bundle discount while keeping the brand tone and promotional framing intact.",
        note: "The goal is not only to translate text, but also to preserve the promotional logic and Shopify-specific context.",
        variants: [
          {
            label: "Bundle offer",
            primaryText: "Bundle two scalp-care products and save 15% with auto-applied discount.",
            secondaryText: "Buy two scalp-care products and automatically receive a 15% bundle discount while keeping the brand tone and promotional framing intact.",
          },
          {
            label: "Beauty PDP",
            primaryText: "Hydrating scalp serum with niacinamide helps calm dryness after every wash.",
            secondaryText: "A hydrating scalp serum with niacinamide helps calm dryness after each wash and reads more naturally for the target market.",
            note: "Even within product copy, ingredient language and tone need to match how the target market actually reads.",
          },
          {
            label: "FAQ snippet",
            primaryText: "Use twice a week for better scalp balance and softer hair texture.",
            secondaryText: "Use twice per week to support scalp balance and help hair feel softer and easier to manage.",
            note: "Localization should cover FAQs and support blocks too, not only the main description.",
          },
        ],
      },
      {
        title: "Glossary intervention",
        primaryLabel: "Without glossary",
        primaryText: "Hydrating repair serum suitable for dry and color-treated hair.",
        secondaryLabel: "With glossary",
        secondaryText: "Hydrating repair serum for dry and color-treated hair, with the brand-preferred term kept consistent across pages.",
        note: "Glossary helps protect important terms from drifting as content expands across languages.",
        variants: [
          {
            label: "Repair serum",
            primaryText: "Hydrating repair serum suitable for dry and color-treated hair.",
            secondaryText: "Hydrating repair serum for dry and color-treated hair, with the brand-preferred term kept consistent across pages.",
          },
          {
            label: "Brand term lock",
            primaryText: "The Cloud Reset ritual helps customers recover shine after heat styling.",
            secondaryText: "The Cloud Reset ritual helps customers restore shine after heat styling, while keeping the series name untouched.",
            note: "Series names and brand terms usually need to stay fixed rather than be freely rephrased.",
          },
          {
            label: "Promo copy",
            primaryText: "Limited drop: repair duo for damaged hair with salon-grade finish.",
            secondaryText: "Limited release: a repair duo for damaged hair, while keeping the brand-approved salon-grade framing consistent.",
            note: "Promotional copy also needs glossary control, otherwise tone drift appears quickly across pages.",
          },
        ],
      },
      {
        title: "Theme and metafield coverage",
        primaryLabel: "Store content",
        primaryText: "Theme blocks, metafields, navigation, FAQ and image text need to stay in sync.",
        secondaryLabel: "Ciwi approach",
        secondaryText: "Use a structured translation flow that covers theme blocks, metafields, navigation, FAQs, and image text together.",
        note: "This is the layer many generic text translation tools miss most easily.",
        variants: [
          {
            label: "Theme blocks",
            primaryText: "Theme blocks, metafields, navigation, FAQ and image text need to stay in sync.",
            secondaryText: "Use a structured translation flow that covers theme blocks, metafields, navigation, FAQs, and image text together.",
          },
          {
            label: "Metafields",
            primaryText: "Ingredient highlights and usage tips stored in metafields should follow the same translation rules.",
            secondaryText: "Ingredient highlights and usage tips stored in metafields follow the same glossary and translation rules as the main product copy.",
            note: "These fields are often missing from traditional export/import flows, even though they affect the storefront directly.",
          },
          {
            label: "Image captions",
            primaryText: "Hero banners, promo badges and comparison tables should update together when a market changes.",
            secondaryText: "When a market changes, hero banners, promo badges, and comparison tables should update together to keep the storefront coherent.",
            note: "Real localization is not a single-page task. It is whole-site synchronization.",
          },
        ],
      },
    ],
    featureModules: [
      {
        title: "Preview the translated result first",
        description: "Start by checking real output and tone before going deeper into interaction demos or setup details.",
        highlights: ["Before / after product copy", "FAQ and support blocks localized together", "Offers and context preserved"],
        primaryLabel: "Original content",
        primaryText: "Bundle two scalp-care products and save 15% with auto-applied discount.",
        secondaryLabel: "Localized result",
        secondaryText: "Buy two scalp-care products and automatically receive a 15% bundle discount while keeping the brand tone and promotional framing intact.",
        note: "Looking at the result first makes it easier to decide whether the product is worth further evaluation.",
        previewLabels: ["Bundle offer", "Beauty PDP", "FAQ snippet"],
      },
      {
        title: "Lock brand terminology with glossary",
        description: "Protect series names, brand terms, and critical ingredients so they do not drift across pages.",
        highlights: ["Brand terms stay fixed", "Promotional language stays steadier", "High-value terminology is maintained centrally"],
        primaryLabel: "Without glossary",
        primaryText: "Hydrating repair serum suitable for dry and color-treated hair.",
        secondaryLabel: "With glossary",
        secondaryText: "Hydrating repair serum for dry and color-treated hair, with the brand-preferred term kept consistent across pages.",
        note: "Long-term localization quality is usually determined less by the first translation and more by whether later updates stay consistent.",
        previewLabels: ["Repair serum", "Brand term lock", "Promo copy"],
      },
      {
        title: "Cover themes and structured content",
        description: "Do more than translate product copy by bringing theme blocks, metafields, navigation, FAQs, and image text into the same workflow.",
        highlights: ["Theme blocks and metafields included", "FAQ, navigation, and image text stay aligned", "Lower risk of missing structured content"],
        primaryLabel: "Store content",
        primaryText: "Theme blocks, metafields, navigation, FAQ and image text need to stay in sync.",
        secondaryLabel: "Ciwi approach",
        secondaryText: "Use a structured translation flow that covers theme blocks, metafields, navigation, FAQs, and image text together.",
        note: "If structured content is not included, multilingual storefronts usually start to break on the second round of updates.",
        previewLabels: ["Theme blocks", "Metafields", "Image captions"],
      },
    ],
    differentiators: [
      {
        title: "Built for Shopify content structure",
        description: "Go beyond plain text so product copy, theme blocks, FAQs, navigation, image text, and metafields stay in the same localization flow.",
        bullets: [
          "Covers more of the storefront than generic text-only tools",
          "Keeps structured content closer to the main product copy",
          "Reduces the chance that important fields are missed in later updates",
        ],
      },
      {
        title: "Glossary keeps brand language steadier",
        description: "Use glossary and model rules to protect brand terms, series names, and high-value terminology as content expands across languages.",
        bullets: [
          "Less terminology drift across pages and campaigns",
          "Better control over ingredients, offers, and product naming",
          "More reliable long-term consistency than one-off translation passes",
        ],
      },
      {
        title: "Better fit for ongoing multilingual operations",
        description: "The value is not only the first translation, but how much easier it is to keep later product, campaign, and content changes synchronized.",
        bullets: [
          "Supports repeat updates instead of only initial launch coverage",
          "Helps teams manage localization as the storefront changes",
          "More useful when multilingual content is part of regular operations",
        ],
      },
    ],
    compareLinks: [
      {
        title: "Shopify Translate & Adapt Alternative",
        description: "Compare Shopify native localization with a more complete multilingual workflow.",
        href: "/compare/shopify-translate-adapt-alternative",
        meta: ["Compare", "Native vs workflow"],
      },
      {
        title: "Transcy Alternative",
        description: "Compare Shopify fit, terminology control, and long-term maintenance cost.",
        href: "/compare/transcy-alternative",
        meta: ["Compare", "Localization control"],
      },
      {
        title: "Weglot Alternative",
        description: "See the difference between fast-coverage paths and deeper localization governance.",
        href: "/compare/weglot-alternative",
        meta: ["Compare", "Launch vs governance"],
      },
    ],
    relatedResources: [
      {title: "About the Ciwi AI Translator Shopify app", href: "/help-center/ShopifyApp/about-ciwi-ai-translator-shopify-app/", meta: ["Help Center", "Overview"]},
      {title: "How to set up and use glossary?", href: "/help-center/ShopifyApp/how-to-setup-and-use-glossary/", meta: ["Help Center", "Glossary"]},
      {title: "Shopify Translate & Adapt Alternative", href: "/compare/shopify-translate-adapt-alternative", meta: ["Compare", "Selection"]},
    ],
    faq: [
      {question: "What is the main difference between Ciwi and a generic translation tool?", answer: "Ciwi is better suited to Shopify-specific structured content, terminology control, and continuous sync, so multilingual operations stay more complete over time."},
      {question: "Does it support glossary and terminology control?", answer: "Yes. You can use glossary and model rules to protect high-value terms and reduce drift across pages."},
      {question: "What kind of Shopify merchants is it for?", answer: "It works both for merchants entering multilingual markets for the first time and for brands already running multi-market operations that need lower update cost."},
    ],
    ctaLabel: "Install on Shopify",
    ctaHref: ciwiShopifyInstallUrl,
  },
  {
    slug: "spark-analytics-agent",
    name: "Spark: AI Store Assistant",
    seoDescription: "Spark is a Shopify AI agent that plans and executes supported store tasks. Connect your data, describe a goal, and review the results.",
    seoTitle: "Shopify AI Agent for Store Tasks & Automation",
    shortDescription:
      "A Shopify AI agent and ecommerce assistant that plans and executes supported store tasks using connected data and tools.",
    heroTitle: "A Shopify AI agent that plans and executes store tasks",
    heroDescription:
      "Describe the outcome you want, and Spark uses connected Shopify data and tools to plan and execute supported tasks. Use this AI assistant for ecommerce to turn store questions into scoped actions and reviewable results.",
    videoUrl: "https://www.youtube.com/embed/UO8Hz0fCMJw?si=eBaqLeLxbLjxjKzw",
    icon: "/ai-generate-landscape-image-spark.svg",
    metrics: ["Goal-driven AI agent", "Autonomous planning & execution", "Connected store data & tools"],
    targetUsers: [
      "Growing Shopify teams that want clearer store visibility and faster issue discovery",
      "Merchants managing marketing, tracking, content, and daily operations across multiple tools",
      "Operators who want to turn store signals into actions instead of watching more dashboards",
    ],
    benefits: [
      "See what needs attention across your store without stitching reports together",
      "Turn a store goal into a plan and carry out supported tasks with Spark",
      "Keep marketing, tracking, content, and operations in one workspace",
    ],
    features: [
      {title: "AI store assistant", description: "Ask questions about store signals, business performance, and operations tasks."},
      {title: "Issue detection", description: "Find what needs attention across sales, conversion, traffic, tracking, content, and store health."},
      {title: "Today overview", description: "Review key performance signals like revenue, profit, conversion, traffic, and short-term ROI."},
      {title: "Store health monitor", description: "Check data reliability, tracking status, channel setup, and potential risks."},
      {title: "AI guidance", description: "Understand what may be happening, why it matters, and what to do next."},
      {title: "Task planning & execution", description: "Describe a goal and let Spark plan and execute supported store tasks within the connected tools and permissions."},
      {title: "Content Studio", description: "Generate and improve product copy for products, campaigns, and store content."},
      {title: "Image tools", description: "Support AI-powered image workflows for product and marketing content."},
      {title: "Pixels & tracking", description: "Set up and validate Web Pixel and storefront tracking for Meta, TikTok, Google, and more."},
      {title: "Marketing connections", description: "Connect Meta, Google, TikTok, GA4, Search Console, PageSpeed, and related data sources."},
      {title: "Task center", description: "Manage AI jobs, automation jobs, and daily operations tasks in one workspace."},
    ],
    workflow: [
      "Connect your store, marketing, and tracking data sources",
      "Review today's performance, health signals, and issues in one view",
      "Give Spark a goal, let it plan and execute supported steps, then review the result",
    ],
    useCases: [
      {
        title: "Daily store review",
        description: "For merchants who want a fast read on revenue, profit, conversion, traffic, and short-term ROI every day.",
      },
      {
        title: "Marketing and tracking setup",
        description: "For teams connecting Meta, Google, TikTok, GA4, Search Console, and PageSpeed, and validating pixels and tracking.",
      },
      {
        title: "Content and operations workflows",
        description: "For teams generating product and campaign content, then managing AI and operations tasks from one place.",
      },
    ],
    demoHighlights: ["Today overview", "Issue detection & AI guidance", "Tasks in one workspace"],
    demoScenarios: [
      {
        title: "Today overview",
        primaryLabel: "Scattered signals",
        primaryText: "Revenue, profit, conversion, traffic, and ROI live across Shopify, ad platforms, and tracking tools.",
        secondaryLabel: "Spark today view",
        secondaryText:
          "Spark pulls key performance signals into one overview so you can see what changed and what needs attention today.",
        note: "The goal is a faster daily read, not another dashboard to configure.",
      },
      {
        title: "Issue detection and AI guidance",
        primaryLabel: "A signal appears",
        primaryText: "Conversion dips or tracking breaks, but the cause isn't obvious across disconnected tools.",
        secondaryLabel: "Spark guidance",
        secondaryText:
          "Spark flags the issue and explains what may be happening, why it matters, and what to do next.",
        note: "Spark focuses on understanding and next steps, not just more charts.",
      },
      {
        title: "From insight to task",
        primaryLabel: "Insight found",
        primaryText: "You see an issue but have to switch tools to write it down, assign it, or fix it.",
        secondaryLabel: "Spark task flow",
        secondaryText:
          "Turn the insight into an AI task, automation job, or operations action and manage it in the task center.",
        note: "Insights only create value when they become actions.",
      },
    ],
    differentiators: [
      {
        title: "Moves from signals to supported actions",
        description: "Spark is not limited to showing store data. It can turn a goal into a plan, execute supported tasks, and return a reviewable result.",
        bullets: [
          "Bridges the gap between store insight and follow-through",
          "Supports goal-driven workflows instead of dashboard-only review",
          "Keeps task planning and execution closer to the original signal",
        ],
      },
      {
        title: "Keeps daily store work in one workspace",
        description: "Bring performance, issues, AI guidance, tasks, content, and tracking work into one place so teams switch tools less often.",
        bullets: [
          "Fewer context switches across analytics, tracking, and operations",
          "Makes daily review easier for growing Shopify teams",
          "Helps marketing, content, and operations stay closer together",
        ],
      },
      {
        title: "Designed around merchant goals, not just reports",
        description: "Start with the outcome you want and let Spark scope the work around connected tools, permissions, and the current store context.",
        bullets: [
          "Closer to how operators actually work day to day",
          "More useful when the next step matters more than the raw metric",
          "Turns a store question into a more actionable path forward",
        ],
      },
    ],
    relatedResources: [
      {
        title: "Best Shopify Analytics Apps",
        href: "/best-shopify-apps/best-shopify-analytics-apps",
        meta: ["Best Apps", "Analytics"],
      },
      {
        title: "How to localize currency pricing on Shopify",
        href: "/guides/how-to-localize-currency-pricing-on-shopify",
        meta: ["Guide", "Pricing"],
      },
      {
        title: "Resources",
        href: "/resources",
        meta: ["Resources", "Operations"],
      },
    ],
    faq: [
      {
        question: "What is Spark?",
        answer:
          "Spark is an AI agent for Shopify merchants. It uses connected store data and tools to plan and execute supported tasks from a goal you describe.",
      },
      {
        question: "Is Spark just another analytics dashboard?",
        answer:
          "No. Spark can move from understanding store signals to planning and executing supported tasks. What it can complete depends on the connected tools and permissions for the task.",
      },
      {
        question: "What data sources can Spark connect?",
        answer:
          "Spark supports Meta, Google, TikTok, GA4, Search Console, PageSpeed, and related data sources, plus Web Pixel and storefront tracking setup and validation.",
      },
    ],
    ctaLabel: "Install on Shopify",
    ctaHref: sparkShopifyInstallUrl,
  },
];

const productsZh: ProductItem[] = [
  {
    slug: "translator",
    name: "AI Translator",
    shortDescription: "帮助 Shopify 商家更快上线多语言、稳定术语表达并持续同步更新。",
    heroTitle: "Ciwi 翻译，让国际化SEO变成新的获客来源和转化工具",
    heroDescription:
      "Ciwi AI Translator 基于 ChatGPT 等先进 AI模型，进行更符合本地市场的翻译工作并保持品牌一致。同时，Ciwi 通过大数据模型优化翻译内容的 SEO 效果，为获客和转化率带来 13.5% 的显著提升",
    videoUrl: "https://www.youtube.com/embed/rAFB3AuXuH0?si=6v-NjiENBOqvREy-",
    icon: "/translate.svg",
    metrics: ["适配全球一百多个市场", "保持品牌风格和调性", "强化 翻译后的SEO 效果"],
    rating: 4.7,
    reviewCount: 22,
    reviewSnippets: [
      "Absolutely love this app! The support team is incredibly responsive — they help almost immediately.",
      "这个插件确实好用！而且客服响应特别快，有什么需求都会在第一时间解决。",
    ],
    targetUsers: ["正在拓展海外市场的 Shopify 品牌", "需要长期维护多语言内容的运营团队", "重视品牌术语一致性和本地化质量的商家"],
    benefits: ["更快上线多语言版本", "减少术语漂移和品牌表达不一致", "让后续内容更新也能持续同步"],
    features: [
      {title: "Translate beyond plain text", description: "不仅覆盖商品标题和描述，也覆盖主题区块、FAQ、导航、图片文案和 metafields。"},
      {title: "Control terminology and tone", description: "通过 glossary 和模型策略，尽量把品牌词、成分词和营销表达稳定下来。"},
      {title: "Stay synced as the store evolves", description: "当你更新新品、活动和页面内容时，多语言版本也能更容易保持同步。"},
    ],
    workflow: ["连接商店并识别可翻译内容", "按目标市场、语言和 glossary 执行翻译", "审阅结果并持续同步后续更新"],
    useCases: [
      {title: "多语言商品页", description: "适合需要同时维护产品标题、卖点、FAQ 和图片表达的品牌。"},
      {title: "品牌本地化", description: "适合对术语、成分词和品牌语气要求较高，需要 glossary 控制的团队。"},
      {title: "新市场验证", description: "适合准备进入更多国家或语言市场，希望先快速上线再持续优化的 Shopify 商家。"},
    ],
    demoHighlights: ["翻译前后对比", "glossary 术语锁定", "主题与结构化内容覆盖"],
    demoScenarios: [
      {
        title: "Product description localization",
        primaryLabel: "Original",
        primaryText: "Bundle two scalp-care products and save 15% with auto-applied discount.",
        secondaryLabel: "Localized",
        secondaryText: "购买两件头皮护理产品，系统将自动套用 15% 套餐折扣，并保留品牌语气与优惠表达。",
        note: "不仅翻译文本，还保留促销逻辑与 Shopify 场景表达。",
        variants: [
          {
            label: "Bundle offer",
            primaryText: "Bundle two scalp-care products and save 15% with auto-applied discount.",
            secondaryText: "购买两件头皮护理产品，系统将自动套用 15% 套餐折扣，并保留品牌语气与优惠表达。",
          },
          {
            label: "Beauty PDP",
            primaryText: "Hydrating scalp serum with niacinamide helps calm dryness after every wash.",
            secondaryText: "添加烟酰胺的头皮保湿精华可在每次洗发后舒缓干燥不适，并保持商品页表达更自然。",
            note: "同样是商品文案，但语气和成分表达需要更贴近目标市场阅读习惯。",
          },
          {
            label: "FAQ snippet",
            primaryText: "Use twice a week for better scalp balance and softer hair texture.",
            secondaryText: "建议每周使用两次，以帮助维持头皮平衡并改善发丝柔顺度。",
            note: "翻译并不局限在主描述区，FAQ 和说明块也需要一起本地化。",
          },
        ],
      },
      {
        title: "Glossary intervention",
        primaryLabel: "Without glossary",
        primaryText: "Hydrating repair serum suitable for dry and color-treated hair.",
        secondaryLabel: "With glossary",
        secondaryText: "保湿修护精华，适用于干燥及染后发质，并保持品牌术语“修护精华”的统一翻译。",
        note: "通过 glossary 控制关键术语，避免品牌词在多语言中漂移。",
        variants: [
          {
            label: "Repair serum",
            primaryText: "Hydrating repair serum suitable for dry and color-treated hair.",
            secondaryText: "保湿修护精华，适用于干燥及染后发质，并保持品牌术语“修护精华”的统一翻译。",
          },
          {
            label: "Brand term lock",
            primaryText: "The Cloud Reset ritual helps customers recover shine after heat styling.",
            secondaryText: "Cloud Reset 护理步骤可帮助顾客在热造型后恢复秀发光泽，并保留品牌词不被误译。",
            note: "品牌系列名通常需要锁定原文，避免被模型自由改写。",
          },
          {
            label: "Promo copy",
            primaryText: "Limited drop: repair duo for damaged hair with salon-grade finish.",
            secondaryText: "限时上新：面向受损发质的修护双件套，保留品牌设定的“沙龙级护理”表达。",
            note: "促销文案也需要 glossary 约束，否则不同页面容易出现风格漂移。",
          },
        ],
      },
      {
        title: "Theme and metafield coverage",
        primaryLabel: "Store content",
        primaryText: "Theme blocks, metafields, navigation, FAQ and image text need to stay in sync.",
        secondaryLabel: "Ciwi approach",
        secondaryText: "通过结构化翻译覆盖主题区块、metafields、导航、FAQ 和图片文案，减少更新不同步。",
        note: "这是普通文本翻译工具最容易遗漏的一层。",
        variants: [
          {
            label: "Theme blocks",
            primaryText: "Theme blocks, metafields, navigation, FAQ and image text need to stay in sync.",
            secondaryText: "通过结构化翻译覆盖主题区块、metafields、导航、FAQ 和图片文案，减少更新不同步。",
          },
          {
            label: "Metafields",
            primaryText: "Ingredient highlights and usage tips stored in metafields should follow the same translation rules.",
            secondaryText: "存放在 metafields 中的成分亮点与使用建议，也应沿用相同翻译规则和 glossary 约束。",
            note: "这类字段通常不会出现在传统导出导入流程里，但它们直接影响商品页完整度。",
          },
          {
            label: "Image captions",
            primaryText: "Hero banners, promo badges and comparison tables should update together when a market changes.",
            secondaryText: "当市场版本变化时，首页横幅、促销角标和对比表也应一起更新，保持整站本地化一致。",
            note: "真正的本地化不是单页任务，而是整站结构同步。",
          },
        ],
      },
    ],
    featureModules: [
      {
        title: "快速预览翻译结果",
        description: "先看真实前后结果和页面语气，再决定是否继续深入看交互演示或配置流程。",
        highlights: ["商品描述前后对照", "FAQ 与说明块一起本地化", "保留优惠和场景表达"],
        primaryLabel: "Original content",
        primaryText: "Bundle two scalp-care products and save 15% with auto-applied discount.",
        secondaryLabel: "Localized result",
        secondaryText: "购买两件头皮护理产品，系统将自动套用 15% 套餐折扣，并保留品牌语气与优惠表达。",
        note: "先看结果是否顺眼、是否贴近品牌语气，会比先看功能列表更容易判断产品值不值得继续研究。",
        previewLabels: ["Bundle offer", "Beauty PDP", "FAQ snippet"],
      },
      {
        title: "用 glossary 锁定品牌术语",
        description: "把品牌词、系列名和关键成分词锁住，减少不同页面出现不同翻法的情况。",
        highlights: ["品牌词不被误译", "促销表达更稳定", "高价值术语统一维护"],
        primaryLabel: "Without glossary",
        primaryText: "Hydrating repair serum suitable for dry and color-treated hair.",
        secondaryLabel: "With glossary",
        secondaryText: "保湿修护精华，适用于干燥及染后发质，并保持品牌术语“修护精华”的统一翻译。",
        note: "真正影响长期本地化质量的，往往不是第一次翻译，而是后续更新时术语还能不能保持一致。",
        previewLabels: ["Repair serum", "Brand term lock", "Promo copy"],
      },
      {
        title: "覆盖主题与结构化内容",
        description: "不只翻商品正文，也把主题区块、metafields、导航、FAQ 和图片文案一起纳入同一套流程。",
        highlights: ["主题区块与 metafields 一起覆盖", "FAQ / Navigation / Image text 同步更新", "降低结构化内容遗漏率"],
        primaryLabel: "Store content",
        primaryText: "Theme blocks, metafields, navigation, FAQ and image text need to stay in sync.",
        secondaryLabel: "Ciwi approach",
        secondaryText: "通过结构化翻译覆盖主题区块、metafields、导航、FAQ 和图片文案，减少更新不同步。",
        note: "如果这些结构化内容没有一起进入流程，多语言站点通常会在第二轮更新时开始出现断层。",
        previewLabels: ["Theme blocks", "Metafields", "Image captions"],
      },
    ],
    differentiators: [
      {
        title: "更适合 Shopify 结构化内容翻译",
        description: "不只翻纯文本，也把商品文案、主题区块、FAQ、导航、图片文案和 metafields 放进同一套本地化流程。",
        bullets: [
          "覆盖范围比纯文本翻译工具更完整",
          "让结构化内容尽量和商品正文一起维护",
          "降低后续更新时遗漏关键字段的概率",
        ],
      },
      {
        title: "用 glossary 稳住品牌表达",
        description: "通过 glossary 和模型策略，把品牌词、系列名和高价值术语稳定下来，减少不同页面翻法不一致的问题。",
        bullets: [
          "减少不同页面和活动中的术语漂移",
          "更容易控制成分词、优惠表达和商品命名",
          "比一次性翻译更适合长期内容治理",
        ],
      },
      {
        title: "更适合持续运营的多语言店铺",
        description: "真正的价值不只是第一次上线，而是后续商品、活动和页面更新时，多语言内容也更容易保持同步。",
        bullets: [
          "适合需要持续更新的店铺，而不是一次性上线后长期不动",
          "帮助团队在店铺变化时继续维护多语言一致性",
          "更贴近多语言运营的真实工作方式",
        ],
      },
    ],
    compareLinks: [
      {
        title: "Shopify Translate & Adapt Alternative",
        description: "比较 Shopify 原生多语言能力和更完整本地化工作流的差异。",
        href: "/compare/shopify-translate-adapt-alternative",
        meta: ["Compare", "Native vs workflow"],
      },
      {
        title: "Transcy Alternative",
        description: "从 Shopify 适配深度、术语控制和长期维护成本三个维度看差异。",
        href: "/compare/transcy-alternative",
        meta: ["Compare", "Localization control"],
      },
      {
        title: "Weglot Alternative",
        description: "适合比较快速覆盖型方案和更强调内容治理路径的不同。",
        href: "/compare/weglot-alternative",
        meta: ["Compare", "Launch vs governance"],
      },
    ],
    relatedResources: [
      {title: "About ciwi.ai-translator Shopify App", href: "/help-center/ShopifyApp/about-ciwi-ai-translator-shopify-app/", meta: ["Help Center", "Overview"]},
      {title: "How to setup and use glossary?", href: "/help-center/ShopifyApp/how-to-setup-and-use-glossary/", meta: ["Help Center", "Glossary"]},
      {title: "Shopify Translate & Adapt Alternative", href: "/compare/shopify-translate-adapt-alternative", meta: ["Compare", "Selection"]},
    ],
    faq: [
      {question: "Ciwi 和普通翻译工具的核心区别是什么？", answer: "Ciwi 更适合 Shopify 场景里的结构化内容翻译、术语控制和持续同步，能把多语言运营做得更完整。"},
      {question: "是否支持 glossary 和术语控制？", answer: "支持。你可以用 glossary 和模型策略约束高价值术语，减少品牌表达在不同页面里的漂移。"},
      {question: "适合什么阶段的 Shopify 商家？", answer: "既适合刚开始进入多语言市场的商家，也适合已经在长期维护多市场运营、希望降低后续同步成本的品牌。"},
    ],
    ctaLabel: "前往 Shopify 安装",
    ctaHref: ciwiShopifyInstallUrl,
  },
  {
    slug: "spark-analytics-agent",
    name: "Spark: AI Store Assistant",
    shortDescription: "面向 Shopify 商家的 AI Agent，将目标拆解为计划，并通过已连接的数据和工具执行支持的店铺任务。",
    heroTitle: "告诉 Spark 目标，让它规划并执行",
    heroDescription:
      "Spark 是面向 Shopify 商家的 AI Agent。描述你希望达成的目标，Spark 会自主规划步骤，并使用已连接的店铺数据和工具执行支持的任务。你可以明确任务范围和权限，再检查执行结果。",
    videoUrl: "https://www.youtube.com/embed/UO8Hz0fCMJw?si=eBaqLeLxbLjxjKzw",
    icon: "/ai-generate-landscape-image-spark.svg",
    metrics: ["目标驱动的 AI Agent", "自主规划与执行", "连接店铺数据与工具"],
    targetUsers: [
      "希望更清晰地看清店铺状态、更快发现问题的高成长 Shopify 团队",
      "需要在营销、追踪、内容和日常运营之间频繁切换工具的商家",
      "想把店铺信号变成行动、而不是只看更多报表的运营人员",
    ],
    benefits: [
      "无需拼凑多个报表，一眼看到店铺里需要关注的问题",
      "将店铺目标拆解为计划，由 Spark 执行支持的任务",
      "把营销、追踪、内容和运营统一放进一个工作台",
    ],
    features: [
      {title: "AI 店铺助手", description: "就店铺信号、经营表现和运营任务提问。"},
      {title: "问题发现", description: "在销售、转化、流量、追踪、内容和店铺健康中找出需要关注的问题。"},
      {title: "今日概览", description: "查看收入、利润、转化、流量和短期 ROI 等关键经营信号。"},
      {title: "店铺健康监测", description: "检查数据可靠性、追踪状态、渠道配置和潜在风险。"},
      {title: "AI 指引", description: "理解可能发生了什么、为什么重要，以及下一步该怎么做。"},
      {title: "任务规划与执行", description: "描述目标，让 Spark 在已连接的工具和授权范围内规划并执行支持的店铺任务。"},
      {title: "内容工作台", description: "为商品、活动和店铺内容生成并优化产品文案。"},
      {title: "图片工具", description: "支持面向商品和营销内容的 AI 图片工作流。"},
      {title: "Pixel 与追踪", description: "配置并校验 Meta、TikTok、Google 等渠道的 Web Pixel 和前台追踪。"},
      {title: "营销连接", description: "连接 Meta、Google、TikTok、GA4、Search Console、PageSpeed 及相关数据源。"},
      {title: "任务中心", description: "在一个工作台里管理 AI 任务、自动化任务和日常运营任务。"},
    ],
    workflow: [
      "连接店铺、营销和追踪数据源",
      "在一个视图里查看今日表现、健康信号和问题",
      "告诉 Spark 目标，让它规划并执行支持的步骤，再检查结果",
    ],
    useCases: [
      {
        title: "每日店铺复盘",
        description: "适合希望每天快速查看收入、利润、转化、流量和短期 ROI 的商家。",
      },
      {
        title: "营销与追踪配置",
        description: "适合连接 Meta、Google、TikTok、GA4、Search Console、PageSpeed，并校验 Pixel 与追踪的团队。",
      },
      {
        title: "内容与运营工作流",
        description: "适合生成商品和活动内容，并在一个工作台里管理 AI 与运营任务的团队。",
      },
    ],
    demoHighlights: ["今日概览", "问题发现与 AI 指引", "一体化任务管理"],
    demoScenarios: [
      {
        title: "今日概览",
        primaryLabel: "分散的信号",
        primaryText: "收入、利润、转化、流量和 ROI 分散在 Shopify、广告平台和追踪工具里。",
        secondaryLabel: "Spark 今日视图",
        secondaryText: "Spark 把关键经营信号汇到一个概览里，让你看清今天发生了什么、哪些需要关注。",
        note: "目标是更快完成每日复盘，而不是再配置一个仪表盘。",
      },
      {
        title: "问题发现与 AI 指引",
        primaryLabel: "一个信号出现",
        primaryText: "转化下滑或追踪失效，但在分散的工具里很难定位原因。",
        secondaryLabel: "Spark 指引",
        secondaryText: "Spark 标记出问题，并解释可能发生了什么、为什么重要，以及下一步该怎么做。",
        note: "Spark 关注的是理解和下一步，而不是更多图表。",
      },
      {
        title: "从洞察到任务",
        primaryLabel: "发现洞察",
        primaryText: "你看到了问题，却还要切换工具去记录、分配或处理。",
        secondaryLabel: "Spark 任务流",
        secondaryText: "把洞察转化为 AI 任务、自动化任务或运营动作，并在任务中心统一管理。",
        note: "洞察只有变成行动，才会产生价值。",
      },
    ],
    differentiators: [
      {
        title: "从店铺信号走到支持的行动",
        description: "Spark 不只是展示数据，而是可以把目标拆成计划，执行支持的任务，并返回可检查的结果。",
        bullets: [
          "把洞察和后续执行连接起来",
          "更适合目标驱动的工作流，而不是只看仪表盘",
          "让任务规划和执行更贴近最初发现的问题",
        ],
      },
      {
        title: "把日常店铺工作放进同一个工作台",
        description: "把表现、问题、AI 指引、任务、内容和追踪统一在一个地方，让团队少切工具、少断上下文。",
        bullets: [
          "减少分析、追踪和运营之间的上下文切换",
          "更适合需要每日复盘的成长型 Shopify 团队",
          "让营销、内容和运营工作更容易放在一起推进",
        ],
      },
      {
        title: "围绕商家目标组织，而不是围绕报表组织",
        description: "从你想达成的结果出发，再结合已连接的工具、权限和当前店铺上下文去规划执行路径。",
        bullets: [
          "更接近日常运营人员的真实工作方式",
          "当下一步动作比原始指标更重要时更有价值",
          "把一个店铺问题转成更可执行的推进路径",
        ],
      },
    ],
    relatedResources: [
      {
        title: "Best Shopify Analytics Apps",
        href: "/best-shopify-apps/best-shopify-analytics-apps",
        meta: ["Best Apps", "Analytics"],
      },
      {
        title: "How to localize currency pricing on Shopify",
        href: "/guides/how-to-localize-currency-pricing-on-shopify",
        meta: ["Guide", "Pricing"],
      },
      {
        title: "Resources",
        href: "/resources",
        meta: ["Resources", "Operations"],
      },
    ],
    faq: [
      {
        question: "Spark 是什么？",
        answer: "Spark 是面向 Shopify 商家的 AI Agent，根据你描述的目标，使用已连接的店铺数据和工具规划并执行支持的任务。",
      },
      {
        question: "Spark 只是另一个分析仪表盘吗？",
        answer: "不是。Spark 可以从理解店铺信号进一步规划并执行支持的任务，具体能完成的动作取决于该任务连接的工具和授予的权限。",
      },
      {
        question: "Spark 可以连接哪些数据源？",
        answer: "支持 Meta、Google、TikTok、GA4、Search Console、PageSpeed 及相关数据源，也支持 Web Pixel 和前台追踪的配置与校验。",
      },
    ],
    ctaLabel: "前往 Shopify 安装",
    ctaHref: sparkShopifyInstallUrl,
  },
];

export const products = normalizeInternalHrefFields(productsEn);
export const productMap = Object.fromEntries(products.map((product) => [product.slug, product]));

export function getProducts(locale: Locale) {
  return normalizeInternalHrefFields(localizeLanguageSignalFields(locale, locale === "zh-cn" ? productsZh : productsEn));
}

export function getProductMap(locale: Locale) {
  return Object.fromEntries(getProducts(locale).map((product) => [product.slug, product]));
}
