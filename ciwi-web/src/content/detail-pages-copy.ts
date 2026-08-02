export const detailPagesCopy = {
  products: {
    notFound: {
      title: "Product not found",
      description: "The requested product page could not be found.",
      path: "/products",
    },
    hero: {
      eyebrow: "Product",
      viewDemoLabel: "View demo",
      viewDemoHref: "/demo",
      panels: {
        targetUsersTitle: "适用商家",
        benefitsTitle: "核心收益",
        demoHighlightsTitle: "演示重点",
      },
    },
    anchors: [
      {label: "Use cases", href: "#use-cases"},
      {label: "Demo", href: "#demo"},
      {label: "Audience fit", href: "#audience-fit"},
      {label: "Features", href: "#features"},
      {label: "Workflow", href: "#workflow"},
      {label: "Resources", href: "#resources"},
      {label: "FAQ", href: "#faq"},
    ],
    translator: {
      anchors: [
        {label: "Use cases", href: "#use-cases"},
        {label: "Functions", href: "#function-overview"},
        {label: "Compare", href: "#compare"},
        {label: "Resources", href: "#resources"},
        {label: "FAQ", href: "#faq"},
      ],
      hero: {
        reviewsTitle: "商家评价",
        compareTitle: "常见对比",
        browseCompareLabel: "Browse compare pages",
        browseCompareHref: "/compare",
      },
      sections: {
        featureSpotlights: {
          id: "function-overview",
          eyebrow: "Function overview",
          title: "关键功能介绍、快速预览",
          description: "先快速扫一遍关键能力，再决定要不要继续深入看帮助文档、对比页面或完整演示。",
        },
        comparisons: {
          id: "compare",
          eyebrow: "Compare",
          title: "和其他产品怎么区分",
          description: "如果你已经在比较路线，直接进入对应对比页会更快。",
        },
      },
    },
    media: {
      hero: {
        eyebrow: "Product media",
        title: "产品主视觉预留",
        description: "这里建议补真实产品图，让用户更快看到界面和使用场景。",
      },
      demo: {
        eyebrow: "Demo media",
        title: "产品演示素材预留",
        description: "产品页更适合放一段真实录屏或核心结果图，帮助用户快速判断是否值得继续看。",
      },
    },
    sections: {
      useCases: {
        id: "use-cases",
        eyebrow: "Use cases",
        title: "解决什么问题",
        description: "我们围绕获客和转化率，打造高ROI 的产品方案",
      },
      demoFocus: {
        id: "demo-focus",
        eyebrow: "Demo focus",
        title: "先看关键演示点",
        description: "先看最容易影响判断的几个关键结果。",
      },
      interactiveDemo: {
        eyebrow: "Interactive demo",
        title: "交互演示",
        description: "通过场景切换快速看懂前后差异、术语控制和 Shopify 适配方式。",
      },
      livePreview: {
        eyebrow: "Live preview",
        title: "快速预览",
        description: "先快速扫一遍，再进入交互演示。",
      },
      audienceFit: {
        id: "audience-fit",
        eyebrow: "Audience fit",
        title: "适合谁",
        description: "把适用对象和核心收益放在一起看，会更容易判断是否匹配。",
        targetUsersTitle: "适用商家",
        benefitsTitle: "核心收益",
      },
      features: {
        id: "features",
        eyebrow: "Features",
        title: "核心能力",
        description: "围绕商家最常用、最直接影响结果的部分展开。",
      },
      workflow: {
        id: "workflow",
        eyebrow: "Workflow",
        title: "使用路径",
        description: "按实际操作顺序理解产品。",
      },
      resources: {
        id: "resources",
        eyebrow: "Related resources",
        title: "相关资源",
        description: "从这里继续看文档、文章和对比内容。",
      },
    },
    finalCta: {
      secondaryLabel: "Browse resources",
      secondaryHref: "/resources",
    },
  },
  solutions: {
    notFound: {
      title: "Solution not found",
      description: "The requested solution page could not be found.",
      path: "/solutions",
    },
    hero: {
      eyebrow: "Solutions",
      secondaryLabel: "Talk to us",
      secondaryHref: "/contact",
      panels: {
        overviewTitle: "Overview",
        signalsTitle: "Common signals",
      },
    },
    anchors: [
      {label: "Challenges", href: "#challenges"},
      {label: "Approach", href: "#approach"},
      {label: "Products", href: "#products"},
      {label: "Resources", href: "#resources"},
      {label: "FAQ", href: "#faq"},
    ],
    media: {
      eyebrow: "Solution media",
      title: "方案页素材预留",
      description: "方案页建议同时准备场景图和短视频，让用户更快看到问题如何被解决。",
    },
    sections: {
      challenges: {
        id: "challenges",
        eyebrow: "Challenges",
        title: "常见问题",
        description: "先看摩擦点，再看解决方式。",
      },
      approach: {
        id: "approach",
        eyebrow: "Approach",
        title: "解决方式",
        description: "把路径拆成几个容易执行的步骤。",
      },
      products: {
        id: "products",
        eyebrow: "Recommended products",
        title: "相关产品",
        description: "从场景进入对应产品能力。",
      },
      resources: {
        id: "resources",
        eyebrow: "Related resources",
        title: "相关资源",
        description: "继续看文档、文章和对比内容。",
      },
    },
    finalCta: {
      secondaryLabel: "Browse solutions",
      secondaryHref: "/solutions",
    },
  },
  compare: {
    notFound: {
      title: "Compare not found",
      description: "The requested compare page could not be found.",
      path: "/compare",
    },
    hero: {
      eyebrow: "Compare",
      panels: {
        summaryTitle: "Summary",
        bestFitTitle: "Best fit for",
      },
    },
    media: {
      eyebrow: "Compare media",
      title: "对比页视觉预留",
      description: "对比页适合补一张并排对照图，让用户在读维度之前先感受到两条路径的差异。",
    },
    sections: {
      dimensions: {
        eyebrow: "Dimensions",
        title: "关键差异",
        description: "先看真正影响选型判断的几个维度。",
        ciwiLabel: "Ciwi",
        alternativeLabel: "Alternative",
      },
      highlights: {
        eyebrow: "Highlights",
        title: "简明结论",
        description: "先看最影响选型判断的差异。",
      },
      continue: {
        eyebrow: "Continue reading",
        title: "继续查看",
        description: "从这里继续看产品页、文章和帮助文档。",
        siblingMeta: ["Compare", "Alternative"],
        translatorCard: {
          title: "AI Translator",
          description: "回到产品页，直接看适用场景、Demo 和关键能力。",
          href: "/products/translator",
          meta: ["Product", "Translator"],
        },
      },
    },
    finalCta: {
      title: "从比较，进入判断",
      description: "如果你已经看清方向差异，下一步就该进入产品页或帮助文档确认细节。",
      primaryLabel: "Open translator product",
      primaryHref: "/products/translator",
      secondaryLabel: "Browse compare pages",
      secondaryHref: "/compare",
    },
  },
  blog: {
    notFound: {
      title: "Blog post not found",
      description: "The requested article could not be found.",
      path: "/blog",
    },
    hero: {
      eyebrow: "Blog",
      backToBlogLabel: "Back to blog",
      backToBlogHref: "/blog",
      viewSourceLabel: "View original source",
    },
    media: {
      eyebrow: "Article media",
      title: "文章题图预留",
      description: "博客详情页建议在正文前补一张主题图，帮助文章看起来更完整。",
    },
    aside: {
      tocTitle: "Article sections",
      keepReadingTitle: "Keep reading",
      keepReadingText:
        "如果这篇文章和你的业务相关，下一步通常不是继续看抽象观点，而是回到产品、帮助文档和具体配置里确认细节。",
      nextStepTitle: "Recommended next step",
      nextStepText: "先看相关帮助文档，再回到产品页确认 glossary、多语言和 Shopify 适配方式。",
      relatedPostMetaLabel: "Blog",
    },
    finalCta: {
      title: "从内容理解问题，再回到产品和配置",
      description: "如果你已经知道自己要解决什么问题，下一步就该进入产品页或帮助文档看具体做法。",
      primaryLabel: "Open translator product",
      primaryHref: "/products/translator",
      secondaryLabel: "Open help center",
      secondaryHref: "/help-center",
    },
  },
  helpCenterDoc: {
    notFound: {
      title: "Help article not found",
      description: "The requested help article could not be found.",
      path: "/help-center",
    },
    hero: {
      eyebrow: "Help Center",
      backLabel: "Back to help center",
      backHref: "/help-center",
      primaryCtaLabel: "Open translator product",
      primaryCtaHref: "/products/translator",
    },
    media: {
      eyebrow: "Doc media",
      title: "文档截图与视频预留",
      description: "帮助文档更适合直接补截图或短视频，让用户不用只靠文字理解操作路径。",
    },
    aside: {
      tocTitle: "Doc sections",
      quickTitle: "Quick guidance",
      quickText: "帮助文档最适合解决具体问题。读完这页后，如果你还在比较方案，再回到产品页和 Demo 会更有效。",
      nextStepTitle: "Recommended next step",
      nextStepText: "先确认这项设置，再回到产品页看完整场景和相关资源。",
    },
    relatedFallback: {
      translatorTitle: "AI Translator",
      translatorDescription: "回到产品页，直接看适用场景、Demo 和关键能力。",
      translatorHref: "/products/translator",
      translatorMeta: ["Product", "Translator"],
    },
    finalCta: {
      title: "先解决具体问题，再回到产品全貌",
      description: "如果这篇文档已经回答了你的问题，下一步通常是进入产品页、Demo 或更多帮助文档继续确认。",
      primaryLabel: "Open translator product",
      primaryHref: "/products/translator",
      secondaryLabel: "Browse help docs",
      secondaryHref: "/help-center",
    },
  },
} as const;
