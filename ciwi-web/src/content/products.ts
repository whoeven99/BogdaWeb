export type ProductItem = {
  slug: string;
  name: string;
  shortDescription: string;
  heroTitle: string;
  heroDescription: string;
  icon: string;
  metrics: string[];
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
  relatedResources: {title: string; href: string; meta: string[]}[];
  faq: {question: string; answer: string}[];
  ctaLabel: string;
  ctaHref: string;
};

export const products: ProductItem[] = [
  {
    slug: "translator",
    name: "AI Translator",
    shortDescription: "帮助 Shopify 商家更快上线多语言、稳定术语表达并持续同步更新。",
    heroTitle: "把 Shopify 多语言做成可持续维护的增长能力",
    heroDescription:
      "Ciwi AI Translator 覆盖商品、主题、导航、FAQ、图片和 metafields 等关键内容层，让多语言上线更快、术语控制更稳、后续更新更省力。",
    icon: "/translate.svg",
    metrics: ["100+ languages", "Shopify-aware workflow", "Glossary and model control"],
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
    relatedResources: [
      {title: "About ciwi.ai-translator Shopify App", href: "/help-center/ShopifyApp/about-ciwi-ai-translator-shopify-app/", meta: ["Help Center", "Overview"]},
      {title: "How to setup and use glossary?", href: "/help-center/ShopifyApp/how-to-setup-and-use-glossary/", meta: ["Help Center", "Glossary"]},
      {title: "Ciwi vs Shopify Translate & Adapt", href: "/compare/ciwi-vs-shopify-translate-adapt", meta: ["Compare", "Selection"]},
    ],
    faq: [
      {question: "Ciwi 和普通翻译工具的核心区别是什么？", answer: "Ciwi 更适合 Shopify 场景里的结构化内容翻译、术语控制和持续同步，能把多语言运营做得更完整。"},
      {question: "是否支持 glossary 和术语控制？", answer: "支持。你可以用 glossary 和模型策略约束高价值术语，减少品牌表达在不同页面里的漂移。"},
      {question: "适合什么阶段的 Shopify 商家？", answer: "既适合刚开始进入多语言市场的商家，也适合已经在长期维护多市场运营、希望降低后续同步成本的品牌。"},
    ],
    ctaLabel: "Install on Shopify",
    ctaHref: "https://apps.shopify.com/translator-by-ciwi",
  },
  {
    slug: "bundle-discount",
    name: "Bundle Discount",
    shortDescription: "通过更清晰的套餐、加购和优惠表达，帮助 Shopify 商家提升 AOV。",
    heroTitle: "让用户更容易理解套餐价值，也更愿意接受加购",
    heroDescription: "Bundle Discount 帮助商家把套餐逻辑、节省金额和购买理由表达得更清楚，让加购更自然、更容易被接受。",
    icon: "/subscriptions-created-outlined.svg",
    metrics: ["Bundle-first UX", "Upsell-friendly framing", "Clear savings communication"],
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
    ctaLabel: "Talk to us",
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
    ctaLabel: "Explore roadmap",
    ctaHref: "/resources",
  },
];

export const productMap = Object.fromEntries(products.map((product) => [product.slug, product]));
