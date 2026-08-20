import type {Locale} from "@/lib/i18n";
import {getLocalizedValue} from "@/lib/i18n-content";
import {ciwiShopifyInstallUrl} from "@/lib/marketing-links";

const homePageCopyEn = {
    outcomeItems: [
      {
        title: "Higher conversion: make it easier for global shoppers to buy",
        description: "Clarify product messaging, keep terminology consistent, and localize the details that help international traffic understand and convert.",
      },
      {
        title: "More trust: reduce market friction and feel local",
        description: "Move from one-off translation to a workflow that stays in sync as products, campaigns, and pages keep changing.",
      },
      {
        title: "Better efficiency: let AI agents produce production-ready work",
        description: "Build a steadier content workflow across product pages, FAQs, help docs, and SEO pages.",
      },
    ],
    testimonials: [
      {
        name: "21Collagen",
        tag: "Beauty / Multi-language",
        quote: "From product pages to theme content, Ciwi helped us shorten multilingual launch time from weeks to hours.",
      },
      {
        name: "Orientaleaf",
        tag: "Tea / Global Store",
        quote: "What matters most is not speed alone. The output really sounds like our brand, and that directly affects conversion.",
      },
      {
        name: "Cooviphair",
        tag: "Fashion / Shopify",
        quote: "We needed a workflow that could support multilingual operations over time, not just finish the first translation. Ciwi fits that better.",
      },
    ],
    featuredResources: [
      {
        title: "Introducing the CIWI Translator app",
        description: "A good starting point if you want to see whether the product can launch multilingual storefronts faster without losing conversion quality.",
        href: "/blog/ciwi-translator-cha-jian-jie-shao",
        meta: ["Blog", "2025-07-31"],
      },
      {
        title: "How to set up and use glossary?",
        description: "If you are worried about brand terms drifting across pages, this is the first doc to read.",
        href: "/help-center/ShopifyApp/how-to-setup-and-use-glossary/",
        meta: ["Help Center", "Glossary"],
      },
      {
        title: "Transcy Alternative",
        description: "A quick way to compare long-term maintenance cost and localization control when you are choosing a solution.",
        href: "/compare/transcy-alternative",
        meta: ["Compare", "SEO"],
      },
    ],
    homeFaq: [
      {
        question: "What is Ciwi?",
        answer: "Ciwi helps Shopify merchants solve multilingual growth, localization, content operations, and conversion problems that directly affect revenue.",
      },
      {
        question: "Who is Ciwi best for?",
        answer: "It is best for Shopify brands expanding into multilingual markets, reducing content maintenance cost, or improving conversion and average order value.",
      },
      {
        question: "Is Ciwi only a translation tool?",
        answer: "No. Translation is the entry point, but Ciwi is really about better product messaging, ongoing sync, and storefront experiences that convert more clearly.",
      },
    ],
    hero: {
      eyebrow: "BUILT FOR GLOBAL SHOPIFY GROWTH",
      title: "Help your brand reach more customers around the world",
      description:
        "Ciwi builds AI-powered products for Shopify merchants so brands can cross language and market barriers more easily, and serve global customers with more confidence.",
      proofItems: ["Built for Shopify", "Expert support", "Designed for global growth"],
      primaryCtaLabel: "Explore Ciwi products",
      primaryCtaHref: ciwiShopifyInstallUrl,
      secondaryCtaLabel: "View demo",
      secondaryCtaHref: "/demo",
      brandName: "Ciwi",
      brandTagline: "Shopify AI Translator",
      visualWindowTitle: "Product preview",
      visualChips: ["Theme embed", "Language workflow", "Credits"],
      visualAlt: {
        brandLogo: "Ciwi",
        builtForShopify: "Built for Shopify",
        mainImage: "Ciwi storefront theme embed preview",
        secondaryTop: "Language management",
        secondaryBottom: "Credits quota",
      },
    },
    productMatrix: {
      eyebrow: "Products",
      title: "Start from real operating problems, not generic features",
      description: "Each Ciwi product is designed around real Shopify workflows so merchants can improve efficiency, expand market reach, and win more orders.",
    },
    outcomes: {
      eyebrow: "Outcomes",
      title: "Designed around business results",
      description: "From global expansion to content efficiency and order value, Ciwi focuses on the problems merchants face every day.",
    },
    socialProof: {
      eyebrow: "Proof",
      title: "What merchants say after using Ciwi",
      description: "We stay close to merchant needs and aim to deliver work that is practical, clear, and high quality.",
    },
    resources: {
      eyebrow: "Resources",
      title: "Not just tools, but a working playbook",
      description: "Our team comes from Amazon, TikTok, Temu, and other global platforms. We turn that operating experience into guides, comparisons, and practical advice for Shopify merchants.",
      subscription: {
        eyebrow: "Newsletter",
        title: "Subscribe to Ciwi updates",
        description: "Get product updates, Shopify globalization insights, and new resources first.",
        placeholder: "Enter your email",
        buttonLabel: "Subscribe",
        helperText: "We only send product updates, practical growth ideas, and important releases.",
        successMessage: "Subscription received. Once the real email service is connected, updates will be sent here.",
        errorMessage: "Please enter a valid email address.",
        highlights: ["Product updates", "Growth methods", "Comparison guides"],
      },
    },
    faq: {
      eyebrow: "FAQ",
      title: "What merchants usually ask about Ciwi",
      description: "We collected the most common questions to help you understand the product, service, and workflow faster.",
    },
    finalCta: {
      eyebrow: "NEXT STEP",
      title: "Start building your global growth capability today",
      description: "Explore the products and support Ciwi builds for Shopify merchants, from multilingual operations and content production to revenue growth.",
      primaryLabel: "Explore Ciwi products",
      primaryHref: "/products",
      secondaryLabel: "Talk to us",
      secondaryHref: "/contact",
    },
};

const homePageCopyZh: typeof homePageCopyEn = {
    outcomeItems: [
      {
        title: "高转化：让全球顾客更容易下单",
        description: "把商品表达、术语一致性和本地化细节做对，让国际流量更容易理解商品并完成下单。",
      },
      {
        title: "信任感：减少全球化的隔阂，让本地人更信任你的品牌",
        description: "从一次性翻译，走向可持续同步，减少新品、活动和页面更新时的重复劳动。",
      },
      {
        title: "高效率：让专业的 AI Agent 产出专业优质的工作结果",
        description: "围绕商品页、FAQ、帮助文档和 SEO 页面建立更稳定的内容生产链路。",
      },
    ],
    testimonials: [
      {
        name: "21Collagen",
        tag: "Beauty / Multi-language",
        quote: "从商品页到主题内容，Ciwi 帮我们把多语言上线时间从按周计算，缩短到按小时计算。",
      },
      {
        name: "Orientaleaf",
        tag: "Tea / Global Store",
        quote: "最重要的不是翻得快，而是翻出来真的像我们品牌会说的话，这一点对转化很关键。",
      },
      {
        name: "Cooviphair",
        tag: "Fashion / Shopify",
        quote: "我们需要的是能长期支撑多语言运营的方案，而不是只完成第一次翻译。Ciwi 在这点上更靠谱。",
      },
    ],
    featuredResources: [
      {
        title: "CIWI Translator 插件介绍",
        description: "适合先判断这款产品能不能帮你更快上线多语言并稳住转化体验。",
        href: "/blog/ciwi-translator-cha-jian-jie-shao",
        meta: ["博客", "2025-07-31"],
      },
      {
        title: "How to setup and use glossary?",
        description: "如果你担心品牌词翻乱、页面表达不一致，这篇文档最值得先看。",
        href: "/help-center/ShopifyApp/how-to-setup-and-use-glossary/",
        meta: ["帮助中心", "Glossary"],
      },
      {
        title: "Transcy Alternative",
        description: "适合正在选型的商家，快速看清长期维护成本和本地化控制差异。",
        href: "/compare/transcy-alternative",
        meta: ["对比", "SEO"],
      },
    ],
    homeFaq: [
      {
        question: "Ciwi 是什么？",
        answer: "Ciwi 帮 Shopify 商家处理多语言、本地化、内容生产和客单价提升这些直接影响增长结果的问题。",
      },
      {
        question: "Ciwi 最适合哪类商家？",
        answer: "最适合正在做多语言增长、想降低内容维护成本，或希望把商品页转化和客单价继续往上拉的 Shopify 品牌。",
      },
      {
        question: "Ciwi 只做翻译吗？",
        answer: "不是。翻译只是入口，Ciwi 更关注商品表达是否更好理解、更新是否能持续同步，以及页面是否更容易带来下单和加购。",
      },
    ],
    hero: {
      eyebrow: "专为 Shopify 全球增长打造",
      title: "让你的品牌，被更多世界顾客看见",
      description:
        "Ciwi 为 Shopify 商家打造 AI 驱动的产品，帮助品牌跨越语言与市场障碍，更轻松地触达、连接并服务全球消费者。",
      proofItems: ["专为 Shopify 打造", "专业团队支持", "面向全球增长"],
      primaryCtaLabel: "探索 Ciwi 产品",
      primaryCtaHref: ciwiShopifyInstallUrl,
      secondaryCtaLabel: "查看演示",
      secondaryCtaHref: "/demo",
      brandName: "Ciwi",
      brandTagline: "Shopify AI Translator",
      visualWindowTitle: "产品预览",
      visualChips: ["Theme embed", "Language workflow", "Credits"],
      visualAlt: {
        brandLogo: "Ciwi",
        builtForShopify: "Built for Shopify",
        mainImage: "Ciwi storefront theme embed preview",
        secondaryTop: "Language management",
        secondaryBottom: "Credits quota",
      },
    },
    productMatrix: {
      eyebrow: "产品",
      title: "从经营问题出发，为实际增长服务",
      description: "每一款 Ciwi 产品，都围绕 Shopify 商家的真实经营场景设计，帮助品牌提高效率、扩大市场并获得更多订单。",
    },
    outcomes: {
      eyebrow: "结果",
      title: "围绕真实经营结果设计",
      description: "从全球市场拓展到内容效率和订单价值，Ciwi 希望解决商家每天真正面对的问题。",
    },
    socialProof: {
      eyebrow: "用户反馈",
      title: "听听我们的客户怎么说",
      description: "我们始终以客户诉求为中心，提供专业优质的工作结果。",
    },
    resources: {
      eyebrow: "资源",
      title: "不只提供工具，也分享方法",
      description: "我们团队来自 Amazon、Tiktok 和 Temu 等全球平台，基于团队丰富的经验，我们通过产品指南、运营经验和选型对比，帮助 Shopify 商家理解问题、做出判断，并更有效地使用 Ciwi 产品。",
      subscription: {
        eyebrow: "邮件订阅",
        title: "订阅 Ciwi 邮件更新",
        description: "优先获取产品更新、Shopify 全球化方法和最新资源内容。",
        placeholder: "输入你的邮箱地址",
        buttonLabel: "立即订阅",
        helperText: "我们只发送和产品、增长方法、重要发布相关的内容。",
        successMessage: "订阅成功，后续这里接入真实邮件服务后会直接向你发送更新。",
        errorMessage: "请输入有效的邮箱地址。",
        highlights: ["产品更新", "运营方法", "选型对比"],
      },
    },
    faq: {
      eyebrow: "FAQ",
      title: "关于 Ciwi，你可能还想了解这些",
      description: "我们整理了商家最常见的问题，帮助你更快了解产品、服务与使用方式。",
    },
    finalCta: {
      eyebrow: "下一步",
      title: "从今天开始，建立你的全球化能力",
      description: "探索 Ciwi 为 Shopify 商家打造的产品与支持，从多语言经营、内容生产到订单增长，选择适合你的下一步。",
      primaryLabel: "探索 Ciwi 产品",
      primaryHref: "/products",
      secondaryLabel: "与我们聊聊",
      secondaryHref: "/contact",
    },
};

const homePageCopyByLocale: Record<Locale, typeof homePageCopyEn> = {
  en: homePageCopyEn,
  "zh-cn": homePageCopyZh,
};

export function getHomePageCopy(locale: Locale) {
  return getLocalizedValue(locale, homePageCopyByLocale);
}
