import type {Locale} from "@/lib/i18n";
import {ciwiShopifyInstallUrl} from "@/lib/marketing-links";

export type ProductItem = {
  slug: string;
  name: string;
  shortDescription: string;
  heroTitle: string;
  heroDescription: string;
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
    shortDescription: "Launch multilingual storefront content faster, keep terminology steady, and stay in sync as the store changes.",
    heroTitle: "Turn Shopify localization into a sustainable growth workflow",
    heroDescription:
      "Ciwi AI Translator covers products, themes, navigation, FAQs, images, and metafields so multilingual rollout gets faster and ongoing updates stay under better control.",
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
    slug: "bundle-discount",
    name: "Bundle Discount",
    shortDescription: "Clarify bundle offers, upsells, and promotional framing so Shopify merchants can grow AOV more naturally.",
    heroTitle: "Help shoppers understand bundle value and accept upsells more naturally",
    heroDescription: "Bundle Discount helps merchants explain bundle logic, savings, and purchase reasons more clearly so higher-value carts feel easier to accept.",
    icon: "/subscriptions-created-outlined.svg",
    metrics: ["Bundle-first UX", "Upsell-friendly framing", "Clear savings communication"],
    rating: 4.9,
    reviewCount: 8,
    reviewSnippets: [
      "The bundle logic is much easier to understand, and upsell messaging in the cart feels far more natural.",
      "Promotional information is finally clearer, and shoppers can see why buying more makes sense.",
    ],
    targetUsers: [
      "Shopify merchants trying to increase average order value",
      "Brands running frequent bundle or promotion campaigns",
      "Teams that need to explain add-on logic more clearly",
    ],
    benefits: ["Increase AOV", "Make bundle reasoning easier to understand", "Reduce messy promotional messaging on the page"],
    features: [
      {title: "Present the bundle, not just the discount", description: "Put savings, fit, and value difference in a place shoppers can actually understand."},
      {title: "Keep promotions readable", description: "Turn bundles, upsells, and offer language into one coherent purchase reason instead of a pile of disconnected modules."},
      {title: "Support natural upsell paths", description: "Make upsells feel more like helpful suggestions in PDP and cart flows, not extra interruptions."},
    ],
    workflow: [
      "Define which products belong together",
      "Configure the bundle logic and how savings are presented",
      "Review performance and keep refining the page narrative",
    ],
    useCases: [
      {title: "Bundle upsell", description: "For merchants whose SKUs clearly fit together and need stronger combo purchase rates."},
      {title: "Promotion periods", description: "For brands that need to show multiple discount levels clearly without cluttering the page."},
      {title: "Cart guidance", description: "For storefronts that want shoppers to accept higher-value combinations more naturally."},
    ],
    demoHighlights: ["Before / after cart messaging", "Bundle value visibility", "More natural upsell path"],
    demoScenarios: [
      {
        title: "Cart upsell framing",
        primaryLabel: "Before bundle",
        primaryText: "Single item in cart with no suggested add-on path.",
        secondaryLabel: "After bundle",
        secondaryText: "The cart directly shows a higher-value combination and the savings tied to it, making the upgrade easier to accept.",
        note: "The goal is to make the value obvious, not merely show a discount rule.",
      },
      {
        title: "Promotion clarity",
        primaryLabel: "Fragmented messaging",
        primaryText: "Coupon, upsell and quantity offer are shown in disconnected modules.",
        secondaryLabel: "Unified offer",
        secondaryText: "Bundle, upsell, and discount messages are pulled together into one clearer purchase reason.",
        note: "The point of a bundle page is to reduce cognitive load.",
      },
    ],
    relatedResources: [
      {title: "Grow AOV", href: "/solutions/grow-aov", meta: ["Solution", "AOV"]},
      {title: "Demo Center", href: "/demo", meta: ["Demo", "Bundle"]},
      {title: "Resources", href: "/resources", meta: ["Resources", "Growth"]},
    ],
    faq: [
      {question: "What kind of merchant is Bundle Discount best for?", answer: "It works best for Shopify merchants whose SKUs clearly belong together and who need to explain why a combined purchase is worth it."},
      {question: "Why does AOV growth need its own product page?", answer: "Because many brands do not fail at discount rules. They fail at explaining bundle value and savings clearly to shoppers."},
    ],
    ctaLabel: "Talk to us",
    ctaHref: "/contact",
  },
  {
    slug: "content-ai",
    name: "Content AI",
    shortDescription: "Improve content production efficiency across PDPs, FAQs, and SEO pages for Shopify storefronts.",
    heroTitle: "Turn scattered writing work into a reusable content growth workflow",
    heroDescription: "Content AI helps merchants generate product titles, selling points, FAQs, and SEO drafts faster so content production becomes steadier and easier to reuse.",
    icon: "/ai-generate-2.svg",
    metrics: ["SEO-ready drafts", "FAQ generation", "Works with localization"],
    rating: 4.8,
    reviewCount: 6,
    reviewSnippets: [
      "Draft quality for titles, selling points, and FAQs is very steady and saves a lot of editing time.",
      "Building the SEO structure first and then refining it manually has made our workflow much faster.",
    ],
    targetUsers: [
      "Brands with a large number of products",
      "Teams that need batch SEO content generation",
      "Operators who want to improve content efficiency",
    ],
    benefits: ["Improve content production efficiency", "Expand SEO coverage", "Reduce repeated manual writing work"],
    features: [
      {title: "Generate product-ready drafts", description: "Create editable drafts for product titles, selling points, descriptions, and SEO fields."},
      {title: "Scale FAQ production", description: "Generate FAQ drafts for products, categories, and common purchase questions."},
      {title: "Reuse content across pages", description: "Let product pages, help docs, and SEO pages share the same core information instead of being written from scratch every time."},
    ],
    workflow: [
      "Choose the content scenario and provide baseline inputs",
      "Generate a structured draft",
      "Review and publish the final version to the target page",
    ],
    useCases: [
      {title: "Product titles and selling points", description: "For merchants with many SKUs who need structured copy drafts quickly."},
      {title: "FAQ and SEO page production", description: "For teams expanding search coverage without keeping a large manual writing burden."},
      {title: "Cross-page content reuse", description: "For teams connecting product pages, help docs, and blog content into one content chain."},
    ],
    demoHighlights: ["Title and description generation", "Batch FAQ drafts", "SEO page structure proposals"],
    demoScenarios: [
      {
        title: "Product title generation",
        primaryLabel: "Input",
        primaryText: "Moisture repair serum, 50ml, for dry and damaged hair.",
        secondaryLabel: "Generated output",
        secondaryText: "Moisture Repair Serum for Dry Hair | Lightweight Daily Recovery, 50ml",
        note: "The goal is not simple rewriting, but a structure that works better for product pages and SEO.",
      },
      {
        title: "FAQ generation",
        primaryLabel: "Merchant need",
        primaryText: "Need scalable FAQ content for product and collection pages.",
        secondaryLabel: "Generated output",
        secondaryText: "Generate FAQ drafts at scale that are suitable for search and AI answer surfaces, then refine them manually where needed.",
        note: "FAQ is an important bridge between organic search and help content.",
      },
    ],
    relatedResources: [
      {title: "Resources", href: "/resources", meta: ["Resources", "SEO"]},
      {title: "Blog", href: "/blog", meta: ["Blog", "Content"]},
      {title: "Increase Conversion", href: "/solutions/increase-conversion", meta: ["Solution", "Conversion"]},
    ],
    faq: [
      {question: "Will Content AI replace human editing?", answer: "No. It is best used to improve first-draft speed and batch production, while final review and brand judgment still stay with the team."},
      {question: "Does Content AI work well with translation workflows?", answer: "Yes. Generating structured content first and then localizing it is a stronger international content workflow overall."},
    ],
    ctaLabel: "Explore roadmap",
    ctaHref: "/resources",
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
    slug: "bundle-discount",
    name: "Bundle Discount",
    shortDescription: "通过更清晰的套餐、加购和优惠表达，帮助 Shopify 商家提升 AOV。",
    heroTitle: "让用户更容易理解套餐价值，也更愿意接受加购",
    heroDescription: "Bundle Discount 帮助商家把套餐逻辑、节省金额和购买理由表达得更清楚，让加购更自然、更容易被接受。",
    icon: "/subscriptions-created-outlined.svg",
    metrics: ["Bundle-first UX", "Upsell-friendly framing", "Clear savings communication"],
    rating: 4.9,
    reviewCount: 8,
    reviewSnippets: [
      "套餐逻辑更好理解了，购物车里的加购引导也自然很多。",
      "页面促销信息不再乱，用户能更快看懂“为什么值得买更多”。",
    ],
    targetUsers: ["希望提升客单价的 Shopify 商家", "经常做套餐销售和促销活动的品牌", "需要把加购逻辑讲清楚的运营团队"],
    benefits: ["提高 AOV", "让套餐购买理由更直观", "减少页面促销表达混乱"],
    features: [
      {title: "Present the bundle, not just the discount", description: "把组合购买的节省金额、适合对象和价值差异直接放到用户能理解的位置。"},
      {title: "Keep promotions readable", description: "让套餐、加购和优惠表达形成一套更清晰的购买理由，而不是零散堆叠。"},
      {title: "Support natural upsell paths", description: "围绕商品页和购物车场景，让加购看起来更像合理建议，而不是额外打扰。"},
    ],
    workflow: ["定义适合做套餐的商品关系", "配置组合购买和优惠表达", "观察表现并持续优化页面叙事"],
    useCases: [
      {title: "套餐加购", description: "适合 SKU 之间有明显搭配关系，希望提高组合购买率的商家。"},
      {title: "活动期促销", description: "适合需要清晰表达多档优惠、又不希望页面信息过载的品牌。"},
      {title: "购物车导购", description: "适合在购物车或商品页中推动用户自然接受更高价值组合。"},
    ],
    demoHighlights: ["折扣前后购物车表达", "套餐收益可视化", "更自然的加购路径"],
    demoScenarios: [
      {
        title: "Cart upsell framing",
        primaryLabel: "Before bundle",
        primaryText: "Single item in cart with no suggested add-on path.",
        secondaryLabel: "After bundle",
        secondaryText: "购物车中直接看到组合购买和节省金额，引导用户接受更高价值套餐。",
        note: "核心是让收益表达足够直观，而不是只显示折扣规则。",
      },
      {
        title: "Promotion clarity",
        primaryLabel: "Fragmented messaging",
        primaryText: "Coupon, upsell and quantity offer are shown in disconnected modules.",
        secondaryLabel: "Unified offer",
        secondaryText: "将套餐、加购与折扣信息收敛成一套更清晰的购买理由。",
        note: "套餐页的目标是降低理解成本。",
      },
    ],
    relatedResources: [
      {title: "Grow AOV", href: "/solutions/grow-aov", meta: ["Solution", "AOV"]},
      {title: "Demo Center", href: "/demo", meta: ["Demo", "Bundle"]},
      {title: "Resources", href: "/resources", meta: ["Resources", "Growth"]},
    ],
    faq: [
      {question: "Bundle Discount 最适合什么类型商家？", answer: "最适合 SKU 之间有明显搭配关系、希望把组合购买和加购理由讲得更清楚的 Shopify 商家。"},
      {question: "为什么 AOV 提升也需要单独的产品页？", answer: "因为很多品牌的问题不是不会配折扣，而是不会把套餐价值和节省理由表达给用户。"},
    ],
    ctaLabel: "联系我们",
    ctaHref: "/contact",
  },
  {
    slug: "content-ai",
    name: "Content AI",
    shortDescription: "围绕商品页、FAQ 和 SEO 内容，帮助 Shopify 商家提高内容生产效率。",
    heroTitle: "让内容生产从零散写作，变成可持续复用的增长能力",
    heroDescription: "Content AI 帮助商家更快生成商品标题、卖点、FAQ 和 SEO 页面草稿，让内容生产更稳定，也更容易复用。",
    icon: "/ai-generate-2.svg",
    metrics: ["SEO-ready drafts", "FAQ generation", "Works with localization"],
    rating: 4.8,
    reviewCount: 6,
    reviewSnippets: [
      "标题、卖点和 FAQ 的初稿质量很稳定，节省了大量编辑时间。",
      "把 SEO 结构先搭出来，再做人工润色，效率提升非常明显。",
    ],
    targetUsers: ["商品量较多的品牌", "需要批量生成 SEO 内容的团队", "希望提升内容效率的运营人员"],
    benefits: ["提高内容生产效率", "扩大 SEO 覆盖", "减少重复内容劳动"],
    features: [
      {title: "Generate product-ready drafts", description: "为商品标题、卖点、描述和 SEO 字段生成更容易继续编辑的初稿。"},
      {title: "Scale FAQ production", description: "围绕商品、类目和常见购买问题生成 FAQ 草稿，便于扩搜索覆盖。"},
      {title: "Reuse content across pages", description: "让产品页、帮助文档和 SEO 页面共享同一套核心信息，而不是重复写作。"},
    ],
    workflow: ["选择内容场景并输入基础信息", "生成结构化初稿", "人工审阅后发布到目标页面"],
    useCases: [
      {title: "商品标题与卖点生成", description: "适合 SKU 多、需要快速生成结构化文案的商家。"},
      {title: "FAQ 与 SEO 页面生产", description: "适合希望扩大自然流量覆盖、又不想长期重复手工写作的团队。"},
      {title: "跨页面内容复用", description: "适合把产品页、帮助文档和博客串成内容链路的团队。"},
    ],
    demoHighlights: ["标题与描述生成", "FAQ 批量草稿", "SEO 页面骨架提案"],
    demoScenarios: [
      {
        title: "Product title generation",
        primaryLabel: "Input",
        primaryText: "Moisture repair serum, 50ml, for dry and damaged hair.",
        secondaryLabel: "Generated output",
        secondaryText: "Moisture Repair Serum for Dry Hair | Lightweight Daily Recovery, 50ml",
        note: "目标不是只改写，而是生成更适合商品页与 SEO 的结构化标题。",
      },
      {
        title: "FAQ generation",
        primaryLabel: "Merchant need",
        primaryText: "Need scalable FAQ content for product and collection pages.",
        secondaryLabel: "Generated output",
        secondaryText: "批量生成适合搜索与 AI answer 的 FAQ 草稿，并可继续人工审阅。",
        note: "FAQ 是自然流量和帮助中心联动的重要桥梁。",
      },
    ],
    relatedResources: [
      {title: "Resources", href: "/resources", meta: ["Resources", "SEO"]},
      {title: "Blog", href: "/blog", meta: ["Blog", "Content"]},
      {title: "Increase Conversion", href: "/solutions/increase-conversion", meta: ["Solution", "Conversion"]},
    ],
    faq: [
      {question: "Content AI 会替代人工编辑吗？", answer: "不会。它更适合提高初稿和批量内容的生产效率，最终仍建议保留人工审阅和品牌把关。"},
      {question: "Content AI 和翻译能力适合一起用吗？", answer: "适合。先生成结构化内容，再进入翻译和本地化流程，本身就是更完整的国际化内容链路。"},
    ],
    ctaLabel: "查看路线图",
    ctaHref: "/resources",
  },
];

export const products = productsEn;
export const productMap = Object.fromEntries(products.map((product) => [product.slug, product]));

export function getProducts(locale: Locale) {
  return locale === "zh-cn" ? productsZh : productsEn;
}

export function getProductMap(locale: Locale) {
  return Object.fromEntries(getProducts(locale).map((product) => [product.slug, product]));
}
