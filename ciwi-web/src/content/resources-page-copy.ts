export const resourcesPageCopy = {
  metadata: {
    title: "Resources",
    description: "统一聚合 Help Center、Blog 和产品对比内容的 Ciwi 资源中心。",
    path: "/resources",
  },
  hero: {
    eyebrow: "Resources",
    title: "Ciwi 电商知识库",
    description: "基于全球市场的第一手数据和专家分析，提供关于电商的解决方案和发展资讯",
    cards: [
      {title: "Blog", description: "分享Shopify 的知识和电商经营经验"},
      {title: "Help Center", description: "基于 Ciwi 产品系列进行解答和提供操作指引"},
      {title: "Compare", description: "帮助商家选择和对比，寻找更适合的 AI工具"},
    ],
  },
  sections: {
    helpCenter: {
      eyebrow: "Help center",
      title: "帮助中心",
      description: "查询 Ciwi 系列Shopify app 的操作指南和用户手册",
      ctaLabel: "查看帮助中心",
      ctaHref: "/help-center",
    },
    blog: {
      eyebrow: "Blog",
      title: "Ciwi 电商知识库",
      description: "持续输出 Shopify 本地化、内容增长等实战经验和方法",
      ctaLabel: "查看 Ciwi 电商知识库",
      ctaHref: "/blog",
    },
    compare: {
      eyebrow: "Product compare",
      title: "产品测评",
      description: "围绕产品效果、定价和用户评价，帮助商家用户进行产品选择和对比。",
      ctaLabel: "查看产品测评",
      ctaHref: "/compare",
    },
  },
  subscription: {
    eyebrow: "Next step",
    title: "订阅我们的博客，获得一手 Shopify 资讯",
    description: "优先获取 Shopify 增长趋势、产品更新、本地化方法和最新对比内容。",
    placeholder: "输入你的邮箱地址",
    buttonLabel: "立即订阅",
    helperText: "我们只发送和 Shopify 增长、产品更新与实战经验相关的内容。",
    successMessage: "订阅成功，后续这里接入真实邮件服务后会直接向你发送更新。",
    errorMessage: "请输入有效的邮箱地址。",
    highlights: ["Shopify 资讯", "增长方法", "产品对比"],
  },
} as const;
