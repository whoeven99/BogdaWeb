import type {Locale} from "@/lib/i18n";

const resourcesPageCopyByLocale = {
  en: {
    metadata: {
      title: "Resources",
      description: "A unified Ciwi hub for Help Center docs, blog articles, and product comparisons.",
      path: "/resources",
    },
    hero: {
      eyebrow: "Resources",
      title: "One place for guides, articles, and product comparisons",
      description: "Use the resource hub to move between help docs, blog content, and comparison pages without losing context.",
    },
    sections: {
      guides: {
        eyebrow: "Guides",
        title: "Localization Guides",
        description: "Industry, brand, and B2B guide templates built to capture SEO demand and support international growth.",
        ctaLabel: "Open guides",
        ctaHref: "/guides",
      },
      helpCenter: {
        eyebrow: "Help center",
        title: "Help Center",
        description: "Browse setup guides and hands-on product documentation for the Ciwi app suite.",
        ctaLabel: "Open help center",
        ctaHref: "/help-center",
      },
      blog: {
        eyebrow: "Blog",
        title: "Ciwi Blog",
        description: "Ongoing writing about Shopify localization, content systems, and practical growth workflows.",
        ctaLabel: "Open blog",
        ctaHref: "/blog",
      },
      compare: {
        eyebrow: "Product compare",
        title: "Compare products",
        description: "Compare tools by workflow fit, product impact, pricing context, and evaluation intent.",
        ctaLabel: "Open compare pages",
        ctaHref: "/compare",
      },
      bestShopifyApps: {
        eyebrow: "Collections",
        title: "Best Shopify Apps",
        description: "Browse roundup-style collection pages grouped by category and year.",
        ctaLabel: "Open collections",
        ctaHref: "/best-shopify-apps",
      },
    },
    subscription: {
      eyebrow: "Next step",
      title: "Subscribe to our blog for timely Shopify insights",
      description: "Get updates on Shopify growth, product releases, localization workflows, and new comparison content.",
      placeholder: "Enter your email",
      buttonLabel: "Subscribe",
      helperText: "We only send content related to Shopify growth, product updates, and practical operating ideas.",
      successMessage: "Subscription received. Once the email service is connected, updates will be delivered here.",
      errorMessage: "Please enter a valid email address.",
      highlights: ["Shopify insights", "Growth methods", "Product comparisons"],
    },
  },
  "zh-cn": {
    metadata: {
      title: "资源",
      description: "统一聚合 Help Center、Blog 和产品对比内容的 Ciwi 资源中心。",
      path: "/resources",
    },
    hero: {
      eyebrow: "资源",
      title: "Ciwi 电商知识库",
      description: "基于全球市场的第一手数据和专家分析，提供关于电商的解决方案和发展资讯",
    },
    sections: {
      guides: {
        eyebrow: "指南",
        title: "Localization Guides",
        description: "承载行业、品牌和 B2B 场景的翻译指南模板页，适合继续批量扩展 SEO 落地页。",
        ctaLabel: "查看指南",
        ctaHref: "/guides",
      },
      helpCenter: {
        eyebrow: "帮助中心",
        title: "帮助中心",
        description: "查询 Ciwi 系列 Shopify app 的操作指南和用户手册",
        ctaLabel: "查看帮助中心",
        ctaHref: "/help-center",
      },
      blog: {
        eyebrow: "博客",
        title: "Ciwi 电商知识库",
        description: "持续输出 Shopify 本地化、内容增长等实战经验和方法",
        ctaLabel: "查看 Ciwi 电商知识库",
        ctaHref: "/blog",
      },
      compare: {
        eyebrow: "产品对比",
        title: "产品测评",
        description: "围绕产品效果、定价和用户评价，帮助商家进行产品选择和对比。",
        ctaLabel: "查看产品测评",
        ctaHref: "/compare",
      },
      bestShopifyApps: {
        eyebrow: "合集",
        title: "Best Shopify Apps 合集",
        description: "按类目和年份浏览榜单型合集页面，适合先从 shortlist 入口开始筛选。",
        ctaLabel: "查看合集",
        ctaHref: "/best-shopify-apps",
      },
    },
    subscription: {
      eyebrow: "下一步",
      title: "订阅我们的博客，获得一手 Shopify 资讯",
      description: "优先获取 Shopify 增长趋势、产品更新、本地化方法和最新对比内容。",
      placeholder: "输入你的邮箱地址",
      buttonLabel: "立即订阅",
      helperText: "我们只发送和 Shopify 增长、产品更新与实战经验相关的内容。",
      successMessage: "订阅成功，后续这里接入真实邮件服务后会直接向你发送更新。",
      errorMessage: "请输入有效的邮箱地址。",
      highlights: ["Shopify 资讯", "增长方法", "产品对比"],
    },
  },
} as const;

export function getResourcesPageCopy(locale: Locale) {
  return resourcesPageCopyByLocale[locale];
}
