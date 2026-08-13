import type {Locale} from "@/lib/i18n";

export type CompareMetric = {
  label: string;
  ciwi: number;
  alternative: number;
};

export type ComparePricingPlan = {
  name: string;
  price: string;
  note?: string;
};

export type ComparePricingTable = {
  rowLabels?: string[];
  ciwiPlans: ComparePricingPlan[];
  alternativePlans: ComparePricingPlan[];
};

export type CompareItem = {
  slug: string;
  title: string;
  alternativeName: string;
  description: string;
  summary: string;
  appComparison?: string;
  pricingComparison?: string;
  pricingTable?: ComparePricingTable;
  bestFor: string[];
  summaryMetrics: CompareMetric[];
  scoreMatrix: CompareMetric[];
  faq: {question: string; answer: string; evidence?: string[]}[];
};

type AdditionalMetricKey =
  | "afterSalesSupport"
  | "thirdPartyAppCompatibility"
  | "themeCompatibility"
  | "seoPerformance";

type AdditionalMetricScores = Record<AdditionalMetricKey, Omit<CompareMetric, "label">>;

const additionalMetricScoresBySlug: Record<string, AdditionalMetricScores> = {
  "ciwi-vs-transcy": {
    afterSalesSupport: {ciwi: 9, alternative: 5},
    thirdPartyAppCompatibility: {ciwi: 9, alternative: 8},
    themeCompatibility: {ciwi: 9, alternative: 7},
    seoPerformance: {ciwi: 9, alternative: 5},
  },
  "ciwi-vs-langwill": {
    afterSalesSupport: {ciwi: 9, alternative: 5},
    thirdPartyAppCompatibility: {ciwi: 9, alternative: 7},
    themeCompatibility: {ciwi: 9, alternative: 7},
    seoPerformance: {ciwi: 9, alternative: 7},
  },
  "ciwi-vs-shopify-translate-adapt": {
    afterSalesSupport: {ciwi: 9, alternative: 7},
    thirdPartyAppCompatibility: {ciwi: 9, alternative: 3},
    themeCompatibility: {ciwi: 9, alternative: 8},
    seoPerformance: {ciwi: 9, alternative: 7},
  },
  "ciwi-vs-weglot": {
    afterSalesSupport: {ciwi: 9, alternative: 6},
    thirdPartyAppCompatibility: {ciwi: 9, alternative: 5},
    themeCompatibility: {ciwi: 9, alternative: 7},
    seoPerformance: {ciwi: 9, alternative: 8},
  },
  "ciwi-vs-langify": {
    afterSalesSupport: {ciwi: 9, alternative: 5},
    thirdPartyAppCompatibility: {ciwi: 9, alternative: 4},
    themeCompatibility: {ciwi: 9, alternative: 4},
    seoPerformance: {ciwi: 9, alternative: 6},
  },
  "ciwi-vs-transtore": {
    afterSalesSupport: {ciwi: 9, alternative: 6},
    thirdPartyAppCompatibility: {ciwi: 9, alternative: 8},
    themeCompatibility: {ciwi: 9, alternative: 7},
    seoPerformance: {ciwi: 9, alternative: 8},
  },
  "ciwi-vs-hextom-ai": {
    afterSalesSupport: {ciwi: 9, alternative: 7},
    thirdPartyAppCompatibility: {ciwi: 9, alternative: 9},
    themeCompatibility: {ciwi: 9, alternative: 9},
    seoPerformance: {ciwi: 9, alternative: 7},
  },
  "ciwi-vs-langshop": {
    afterSalesSupport: {ciwi: 9, alternative: 8},
    thirdPartyAppCompatibility: {ciwi: 9, alternative: 8},
    themeCompatibility: {ciwi: 9, alternative: 7},
    seoPerformance: {ciwi: 9, alternative: 8},
  },
  "ciwi-vs-gtranslate": {
    afterSalesSupport: {ciwi: 9, alternative: 6},
    thirdPartyAppCompatibility: {ciwi: 9, alternative: 7},
    themeCompatibility: {ciwi: 9, alternative: 7},
    seoPerformance: {ciwi: 9, alternative: 9},
  },
  "ciwi-vs-t-lab": {
    afterSalesSupport: {ciwi: 9, alternative: 6},
    thirdPartyAppCompatibility: {ciwi: 9, alternative: 5},
    themeCompatibility: {ciwi: 9, alternative: 7},
    seoPerformance: {ciwi: 9, alternative: 6},
  },
  "ciwi-vs-locales-ai": {
    afterSalesSupport: {ciwi: 9, alternative: 7},
    thirdPartyAppCompatibility: {ciwi: 9, alternative: 9},
    themeCompatibility: {ciwi: 9, alternative: 8},
    seoPerformance: {ciwi: 9, alternative: 7},
  },
  "ciwi-vs-ea-auto-language-translate": {
    afterSalesSupport: {ciwi: 9, alternative: 3},
    thirdPartyAppCompatibility: {ciwi: 9, alternative: 4},
    themeCompatibility: {ciwi: 9, alternative: 6},
    seoPerformance: {ciwi: 9, alternative: 3},
  },
  "ciwi-vs-orbe-geolocation": {
    afterSalesSupport: {ciwi: 9, alternative: 6},
    thirdPartyAppCompatibility: {ciwi: 9, alternative: 3},
    themeCompatibility: {ciwi: 9, alternative: 7},
    seoPerformance: {ciwi: 9, alternative: 3},
  },
  "ciwi-vs-ez-product-image-translate": {
    afterSalesSupport: {ciwi: 9, alternative: 5},
    thirdPartyAppCompatibility: {ciwi: 9, alternative: 2},
    themeCompatibility: {ciwi: 9, alternative: 4},
    seoPerformance: {ciwi: 9, alternative: 2},
  },
  "ciwi-vs-selecty": {
    afterSalesSupport: {ciwi: 9, alternative: 6},
    thirdPartyAppCompatibility: {ciwi: 9, alternative: 2},
    themeCompatibility: {ciwi: 9, alternative: 7},
    seoPerformance: {ciwi: 9, alternative: 2},
  },
  "ciwi-vs-reversia": {
    afterSalesSupport: {ciwi: 9, alternative: 8},
    thirdPartyAppCompatibility: {ciwi: 9, alternative: 8},
    themeCompatibility: {ciwi: 9, alternative: 7},
    seoPerformance: {ciwi: 9, alternative: 9},
  },
};

function getAdditionalMetricLabel(key: AdditionalMetricKey, locale: Locale) {
  if (locale === "zh-cn") {
    switch (key) {
      case "afterSalesSupport":
        return "售后服务";
      case "thirdPartyAppCompatibility":
        return "第三方 app 数据兼容";
      case "themeCompatibility":
        return "主题兼容";
      case "seoPerformance":
        return "SEO 性能";
      default:
        return "";
    }
  }

  switch (key) {
    case "afterSalesSupport":
      return "After-sales support";
    case "thirdPartyAppCompatibility":
      return "Third-party app data compatibility";
    case "themeCompatibility":
      return "Theme compatibility";
    case "seoPerformance":
      return "SEO performance";
    default:
      return "";
  }
}

function getAdditionalMetrics(slug: string, locale: Locale): CompareMetric[] {
  const metricScores = additionalMetricScoresBySlug[slug];

  if (!metricScores) {
    return [];
  }

  return (Object.keys(metricScores) as AdditionalMetricKey[]).map((key) => ({
    label: getAdditionalMetricLabel(key, locale),
    ...metricScores[key],
  }));
}

function withAdditionalScoreMetrics(items: CompareItem[], locale: Locale): CompareItem[] {
  return items.map((item) => ({
    ...item,
    scoreMatrix: [...item.scoreMatrix, ...getAdditionalMetrics(item.slug, locale)],
  }));
}

const ciwiPricingPlansEn: ComparePricingPlan[] = [
  {name: "Free", price: "Free", note: "147+ languages; image support"},
  {name: "Basic", price: "$7.99/month", note: "1.5M credits; 200+ currencies"},
  {name: "Pro", price: "$19.99/month", note: "3M credits; auto translation"},
  {name: "Premium", price: "$39.99/month", note: "8M credits; 1v1 support"},
];

const ciwiPricingPlansZh: ComparePricingPlan[] = [
  {name: "Free", price: "Free", note: "147+ 种语言；支持图片本地化"},
  {name: "Basic", price: "$7.99/月", note: "150 万积分；200+ 货币"},
  {name: "Pro", price: "$19.99/月", note: "300 万积分；自动翻译"},
  {name: "Premium", price: "$39.99/月", note: "800 万积分；1 对 1 支持"},
];

const comparesEn: CompareItem[] = [
  {
    slug: "ciwi-vs-transcy",
    title: "Ciwi vs Transcy",
    alternativeName: "Transcy",
    description: "Compare both paths across Shopify structure coverage, terminology control, and long-term maintenance cost.",
    summary: "If you care about more than turning source text into another language, and you want a workflow for products, themes, FAQs, and long-term consistency, Ciwi is more focused on structured governance and localization quality.",
    appComparison:
      "Transcy's public pricing structure presents the app as a combined translation, currency, and market-localization tool. Even the Free plan already bundles one language, one currency, a basic switcher, third-party app translation, and Shopify Payments integration. Higher tiers then scale by editable languages, currencies, AI credits, multilingual SEO, automation, and API-key level integrations such as DeepL, OpenAI, and Gemini. Ciwi's public packaging reads differently. Its plans emphasize broad Shopify content coverage, glossary control, custom AI prompts, image and alt-text localization, IP-based language and currency switching, and higher-touch support at upper tiers. In practice, Transcy looks more like an all-in-one multilingual storefront operations suite, while Ciwi is positioned more around translation governance and structured localization workflow.",
    pricingComparison:
      "Based on the Transcy pricing screenshot you shared, the public ladder starts with Free, then paid plans at $14.90/month, $29/month, and a top tier at $69/month, with 7-day free trials on the paid tiers. The plan logic is mostly language-count, currency-count, and AI-credit based: the lower paid tier starts around one editable language and one convertible currency, the middle tier moves to three languages and three currencies, and the highest tier pushes toward fifteen languages, fifteen currencies, more glossary capacity, geolocation, and external AI/API flexibility. Ciwi also publishes four tiers, but the entry prices are lower: Free, Basic at $7.99/month, Pro at $19.99/month, and Premium at $39.99/month, with annual billing saving 20%. Ciwi's paid tiers are more workflow-led, moving from 1,500,000 monthly credits plus glossary and custom prompts, to 3,000,000 monthly credits with auto translation and localized product images and alt text, and then 8,000,000 monthly credits with 1v1 support and manual review by translation experts. So Transcy is more explicit about multilingual storefront breadth across languages and currencies, while Ciwi is more aggressive on entry pricing and clearer on translation workflow depth per paid tier.",
    pricingTable: {
      rowLabels: ["Free", "Tier 2", "Tier 3", "Tier 4"],
      ciwiPlans: ciwiPricingPlansEn,
      alternativePlans: [
        {name: "Free", price: "Free", note: "1 language; 1 currency"},
        {name: "Basic", price: "$14.90/month", note: "1 editable language; 1 currency"},
        {name: "Growth", price: "$29/month", note: "3 languages; 3 currencies"},
        {name: "Enterprise", price: "$69/month", note: "15 languages; 15 currencies"},
      ],
    },
    bestFor: [
      "Merchants who care about glossary and brand terminology consistency",
      "Teams that need broader Shopify structure coverage",
      "Brands that want product pages, help docs, and SEO pages to work together",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 7, alternative: 8},
      {label: "Translation speed", ciwi: 8, alternative: 8},
      {label: "Translation quality", ciwi: 9, alternative: 7},
      {label: "Data coverage", ciwi: 9, alternative: 7},
    ],
    scoreMatrix: [
      {label: "Glossary control", ciwi: 9, alternative: 7},
      {label: "Structured content coverage", ciwi: 9, alternative: 7},
      {label: "Continuous sync", ciwi: 9, alternative: 7},
      {label: "Theme and storefront fit", ciwi: 9, alternative: 6},
      {label: "Launch speed", ciwi: 7, alternative: 8},
      {label: "Long-term governance", ciwi: 9, alternative: 6},
    ],
    faq: [
      {
        question: "When is Ciwi the better choice than Transcy?",
        answer:
          "Conclusion: Ciwi becomes the stronger choice when SEO safety, translation ownership, and long-term multilingual maintenance matter more than simply getting a combined translation-plus-currency stack live quickly.",
        evidence: [
          "In the FAQ baseline, Transcy has 284 negative reviews, making it one of the highest-volume complaint sets in this compare group.",
          "Complaint themes repeatedly center on broken links, SEO/canonical or hreflang issues, refund friction, ongoing charges, and translation loss after updates or uninstall.",
          "Examples cited in the Chinese research notes include PurrEmbassy (2026-03) reporting link changes that could not be edited, chronofactum.com (2026-04) describing a refund dispute after nearly $1,000 in spend, and sandiia (2024-10) saying months of SEO work were damaged.",
        ],
      },
      {
        question: "What is the biggest operational risk merchants mention about Transcy?",
        answer:
          "Conclusion: the main risk is not translation speed but loss of control after launch, especially when SEO assets, URLs, billing, and existing live translations are already tied to revenue.",
        evidence: [
          "The repeated issues are operational rather than cosmetic: continued charging after uninstall, broken multilingual SEO, currency and price inconsistencies, and damaged or missing translated content.",
          "Research notes cite ZHENHUO GEAR (2025-12) as reporting continued billing after uninstall, MARSONIPRINT (2026-08) as reporting damaged existing translations, and Tessi-supply.com (2026-01) as explicitly mentioning SEO ranking decline.",
        ],
      },
      {
        question: "Is Transcy mainly a translation tool or a multilingual storefront operations suite?",
        answer:
          "Conclusion: Transcy reads more like an all-in-one multilingual storefront operations app, while Ciwi is positioned more around translation governance and structured Shopify localization workflow.",
        evidence: [
          "Even the published Free plan combines one language, one currency, a basic selector, third-party app translation, and Shopify Payments integration.",
          "Higher tiers then scale through editable languages, currencies, AI credits, multilingual SEO, automation, geolocation, and API-key integrations such as DeepL, OpenAI, and Gemini.",
        ],
      },
      {
        question: "How should merchants compare Transcy pricing against Ciwi?",
        answer:
          "Conclusion: the meaningful comparison is not just sticker price, but whether multilingual breadth is bundled at the cost of harder-to-control operations once languages, currencies, and SEO dependencies grow.",
        evidence: [
          "The public Transcy ladder runs Free, $14.90/month, $29/month, and $69/month, with paid tiers carrying 7-day trials.",
          "Ciwi's published ladder is lower on entry price at Free, $7.99/month, $19.99/month, and $39.99/month, while packaging around credits, glossary, custom prompts, auto translation, image localization, and support depth.",
          "That makes Transcy more explicit on multilingual storefront breadth, while Ciwi is clearer on workflow depth and lower first paid commitment.",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-langwill",
    title: "Ciwi vs Langwill",
    alternativeName: "Langwill",
    description: "Useful when comparing translation capability, content workflows, and how unified the website front end feels.",
    summary: "If you are not just comparing translation tools but comparing whole multilingual growth systems, Ciwi places more weight on front-end consistency, content routing, and long-term governance.",
    appComparison:
      "Langwill's public description positions it as a multilingual storefront growth tool that combines 138-language translation, auto currency conversion, geolocation, multilingual SEO, image translation, and selector customization. Its feature list emphasizes GPT-4, DeepL, or Google-based AI translation with full editing control, plus translated meta tags and URL handles for SEO-friendly rollout. Ciwi's public positioning is narrower but deeper on Shopify localization workflow: it emphasizes structured content coverage across products, themes, navigation, FAQs, images, and metafields, along with glossary control, custom prompts, and ongoing sync. In practice, Langwill reads more like an all-in-one translation plus currency-growth app, while Ciwi is positioned more around translation governance and Shopify-aware localization depth.",
    pricingComparison:
      "Based on the pricing screenshot you shared, Langwill publishes four tiers: Free, Starter at $9.99/month, Growth at $19.99/month, and Premium at $49.99/month, with 3-day free trials on the paid plans. The pricing ladder is word-and-language based: Free includes 5,000 words and 1 translated language, Starter raises that to 30,000 words and 5 translated languages with glossary, auto switch currency, backup and restore, and third-party app translation, Growth moves to 80,000 words and 20 translated languages with auto-translate, auto language switching, visual translation, and image translation, and Premium expands to 300,000 words, 20 translated languages, GPT-4 translation, extra word purchase, and priority technical support. Ciwi also publishes four tiers, but the entry prices are slightly lower on the first paid plan and more workflow-oriented overall: Free, Basic at $7.99/month, Pro at $19.99/month, and Premium at $39.99/month, with annual billing saving 20%. Ciwi's paid structure is more credits-based and capability-led, moving from 1,500,000 monthly credits plus glossary and custom AI prompts, to 3,000,000 credits with auto translation and localized product images and alt text, and then 8,000,000 credits with 1v1 support and manual review by translation experts. So Langwill is more explicit about word limits and translated-language scale, while Ciwi is clearer about automation depth, structured localization workflow, and high-touch support at upper tiers.",
    pricingTable: {
      rowLabels: ["Free", "Tier 2", "Tier 3", "Tier 4"],
      ciwiPlans: ciwiPricingPlansEn,
      alternativePlans: [
        {name: "Free", price: "Free", note: "5,000 words; 1 language"},
        {name: "Starter", price: "$9.99/month", note: "30,000 words; 5 languages"},
        {name: "Growth", price: "$19.99/month", note: "80,000 words; 20 languages"},
        {name: "Premium", price: "$49.99/month", note: "300,000 words; GPT-4"},
      ],
    },
    bestFor: [
      "Teams that want a more unified website, blog, and help center experience",
      "Merchants evaluating both translation tooling and content growth workflow",
      "Brands that need a clearer comparison-led buyer journey",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 7, alternative: 7},
      {label: "Translation speed", ciwi: 8, alternative: 7},
      {label: "Translation quality", ciwi: 9, alternative: 7},
      {label: "Data coverage", ciwi: 9, alternative: 7},
    ],
    scoreMatrix: [
      {label: "Website integration", ciwi: 9, alternative: 6},
      {label: "Content routing", ciwi: 9, alternative: 6},
      {label: "SEO compare flow", ciwi: 9, alternative: 5},
      {label: "Structured governance", ciwi: 9, alternative: 6},
      {label: "Launch speed", ciwi: 7, alternative: 7},
      {label: "Merchant education fit", ciwi: 8, alternative: 6},
    ],
    faq: [
      {
        question: "Why does a compare page matter for Ciwi vs Langwill?",
        answer:
          "Conclusion: a compare page matters because the real buying questions are usually about billing, update stability, and scaling limits, not just whether the app can translate a sentence.",
        evidence: [
          "In the FAQ baseline, Langwill carries 84 negative reviews, with repeated themes around trial charges, plan changes, product or word limits, unstable updates, and unhelpful support.",
          "Examples in the research notes include Handicraft Trend (2026-06) and Calves (2025-11) reporting charges during or right after trial periods, LBLYXIR (2024-04) reporting plan changes without enough notice, and Shoptery (2023-09) saying only 1,000 products could be translated.",
        ],
      },
      {
        question: "What matters most in Ciwi vs Langwill?",
        answer:
          "Conclusion: the most important comparison point is not translation availability but whether pricing boundaries, auto-update behavior, and support quality stay usable once multilingual operations become ongoing work.",
        evidence: [
          "Research notes mention repeated complaints that auto updates stopped working, manual edits were overwritten the next day, or premium plans still did not lead to timely fixes.",
          "Specific examples include a 2023-12 complaint saying auto-update did not work and required daily manual sync across 20 countries, a 2023-06 complaint saying edited copy was changed back the next day, and another 2023-12 complaint saying glossary issues remained unresolved for two months.",
        ],
      },
      {
        question: "How is Langwill positioned compared with Ciwi?",
        answer:
          "Conclusion: Langwill is positioned more as a translation-plus-currency growth tool, while Ciwi is positioned more as a Shopify-aware localization workflow with stronger governance and content-structure depth.",
        evidence: [
          "Langwill's public product copy emphasizes 138-language translation, automatic currency conversion, geolocation, multilingual SEO, image translation, selector customization, and AI translation via GPT-4, DeepL, or Google.",
          "Ciwi's public positioning on this page emphasizes structured coverage across product pages, theme content, metafields, images, alt text, glossary control, custom prompts, and real-time sync.",
        ],
      },
      {
        question: "How should Langwill pricing be compared with Ciwi pricing?",
        answer:
          "Conclusion: Langwill is easier to read as a word-and-language capacity ladder, while Ciwi is easier to read as a workflow-and-automation ladder with a lower first paid threshold.",
        evidence: [
          "Langwill's published ladder is Free, $9.99/month, $19.99/month, and $49.99/month, with 3-day trials on paid plans.",
          "Its tiers scale mainly by word volume and translated-language count: 5,000 words and 1 language on Free, then 30,000 and 5, 80,000 and 20, and finally 300,000 words with GPT-4 translation on Premium.",
          "Ciwi's published first paid tier starts lower at $7.99/month and scales through credits, glossary, custom prompts, auto translation, localized images and alt text, and support depth.",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-shopify-translate-adapt",
    title: "Ciwi vs Shopify Translate & Adapt",
    alternativeName: "Shopify Translate & Adapt",
    description: "Useful when comparing Shopify native localization with a more complete localization workflow.",
    summary: "If you have already moved beyond simply publishing multilingual pages and now care about glossary, structured content coverage, continuous sync, and brand consistency, Ciwi offers a deeper path.",
    appComparison:
      "Shopify Translate & Adapt's public description positions it as Shopify's native localization starting point for merchants who want to translate and adapt store content for different markets directly inside Shopify admin. Its message is centered on simplicity and native workflow: manually add, edit, and review translations in a side-by-side editor, auto-translate up to two languages for free with Google Translate, adapt copy for regional spelling or messaging differences, localize directly from the theme editor or resource pages, and manage localized store content without leaving Shopify admin. Ciwi's public positioning is less about being the native default and more about offering deeper Shopify localization workflow across structured content types such as products, themes, navigation, FAQs, images, and metafields, together with glossary control, custom prompts, image localization, and ongoing sync. In practice, Translate & Adapt reads more like the cleanest native entry point for basic multilingual operations, while Ciwi is positioned more around deeper workflow control and structured localization governance.",
    pricingComparison:
      "Shopify Translate & Adapt does not present a multi-tier app pricing ladder like most standalone translation apps. Based on the public description you shared, the clearest pricing fact is that it can auto-translate up to two languages for free using Google Translate, while manual translations can be added and reviewed beyond that inside Shopify admin. That means the value proposition is simplicity and native access rather than plan-based feature segmentation. Ciwi, by contrast, publishes four paid tiers with clearer workflow scaling: Free, Basic at $7.99/month, Pro at $19.99/month, and Premium at $39.99/month, with annual billing saving 20%. Ciwi's paid structure moves from 1,500,000 monthly credits plus glossary and custom AI prompts, to 3,000,000 credits with auto translation and localized product images and alt text, and then 8,000,000 credits with 1v1 support and manual review by translation experts. So Translate & Adapt is easier to understand as a native low-friction starting point, while Ciwi is easier to evaluate when you want explicit workflow depth, higher-volume automation, and plan-based feature progression.",
    bestFor: [
      "Teams already using Shopify native localization but needing more control",
      "Merchants trying to unify product pages, help docs, and resource content",
      "Brands that want localization to become an operating workflow rather than a one-time task",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 7, alternative: 9},
      {label: "Translation speed", ciwi: 8, alternative: 9},
      {label: "Translation quality", ciwi: 9, alternative: 6},
      {label: "Data coverage", ciwi: 9, alternative: 5},
    ],
    scoreMatrix: [
      {label: "Glossary control", ciwi: 9, alternative: 4},
      {label: "Structured content coverage", ciwi: 9, alternative: 5},
      {label: "Continuous sync", ciwi: 9, alternative: 4},
      {label: "Quick launch", ciwi: 7, alternative: 10},
      {label: "Native Shopify fit", ciwi: 8, alternative: 10},
      {label: "Long-term governance", ciwi: 9, alternative: 5},
    ],
    faq: [
      {
        question: "Is Shopify Translate & Adapt enough for long-term multilingual operations?",
        answer:
          "Conclusion: it is enough as a native starting point for lightweight multilingual publishing, but it usually stops being enough once merchants need more languages, stronger review protection, image-alt coverage, or stable structured coverage across more store content.",
        evidence: [
          "The recurring limit in research notes is the free auto-translate cap of only two languages.",
          "Multiple review references from late 2024 through 2026 explicitly mention the two-language ceiling, while other notes mention missing image-alt coverage, weaker media handling, and missing finer-grain control.",
          "Research notes also mention complaints that broad auto-translate actions could overwrite manual revisions.",
        ],
      },
      {
        question: "Why compare against Shopify's native path at all?",
        answer:
          "Conclusion: many merchants are not choosing between two third-party translation apps first; they are deciding when native functionality stops being sufficient and a fuller localization workflow becomes necessary.",
        evidence: [
          "The native app is attractive because it is inside Shopify admin, simple to understand, and can auto-translate up to two languages for free with Google Translate.",
          "Research notes show the common friction points appear later: more language needs, SEO and URL concerns, batch update friction, and less control over manual edits and structured content.",
        ],
      },
      {
        question: "What is the core difference between Shopify Translate & Adapt and Ciwi?",
        answer:
          "Conclusion: Translate & Adapt is a native localization starting layer, while Ciwi is a broader Shopify localization workflow focused on governance, structured coverage, and ongoing synchronization.",
        evidence: [
          "Translate & Adapt's public description centers on Shopify admin workflow, a side-by-side editor, up to two free auto-translated languages, and regional copy adaptation inside Shopify.",
          "Ciwi on this page is positioned around product pages, themes, navigation, metafields, images, alt text, glossary control, custom prompts, and real-time sync.",
        ],
      },
      {
        question: "How should pricing be compared between Translate & Adapt and Ciwi?",
        answer:
          "Conclusion: this is not a multi-tier plan-vs-plan comparison; it is a comparison between a native low-friction starting point and a paid workflow-led ladder with clearer scaling signals.",
        evidence: [
          "Translate & Adapt does not publish a standalone multi-tier pricing ladder in the same way as other translation apps.",
          "The clearest public pricing fact is free auto-translation for up to two languages, with further manual translation handled inside Shopify admin.",
          "Ciwi publishes a clear four-tier ladder from Free to $39.99/month, making it easier to compare as language count, automation, and support expectations grow.",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-weglot",
    title: "Ciwi vs Weglot",
    alternativeName: "Weglot",
    description: "Useful when comparing a quick-coverage translation path with a Shopify-specific content governance path.",
    summary: "If your priority is fast multilingual coverage, a Weglot-like path is often easier to understand. If you care more about Shopify structure, brand terminology, and long-term governance, Ciwi stays more focused there.",
    bestFor: [
      "Teams with existing multilingual traffic who now want better governance",
      "Brands that care about glossary, FAQ coverage, theme content, and resource routing together",
      "Merchants comparing launch speed against long-term maintenance cost",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 7, alternative: 6},
      {label: "Translation speed", ciwi: 7, alternative: 9},
      {label: "Translation quality", ciwi: 9, alternative: 7},
      {label: "Data coverage", ciwi: 9, alternative: 7},
    ],
    scoreMatrix: [
      {label: "Launch speed", ciwi: 7, alternative: 10},
      {label: "Shopify structure fit", ciwi: 9, alternative: 6},
      {label: "Glossary control", ciwi: 9, alternative: 6},
      {label: "Help and SEO routing", ciwi: 9, alternative: 5},
      {label: "Long-term governance", ciwi: 9, alternative: 6},
      {label: "Growth workflow fit", ciwi: 9, alternative: 7},
    ],
    faq: [
      {
        question: "When should governance matter more than translation speed in Ciwi vs Weglot?",
        answer:
          "Conclusion: governance matters more once live traffic, DNS, billing, and SEO assets are already tied to revenue, because mistakes at that point cost more than a slower initial setup.",
        evidence: [
          "Weglot's complaint set in the baseline reaches 109 negative reviews, with repeated themes around pricing pressure, automatic plan upgrades, continued billing after cancellation, and DNS or code residue.",
          "Research notes reference multiple complaints from 2024 about DNS configuration causing site accessibility problems, and a 2025 complaint describing continued monthly charges after cancellation.",
          "Another cited case from 2024 reported major site loss after a project deletion, which raises the perceived operational cost of mistakes.",
        ],
      },
      {
        question: "Who should read Ciwi vs Weglot carefully?",
        answer:
          "Conclusion: this page is most useful for merchants who already have multilingual traffic and are deciding between faster launch and stronger control over SEO, billing, and site stability.",
        evidence: [
          "The review themes are not limited to price complaints. They also include uninstall residue, DNS concerns, automatic upgrades, and support response quality.",
          "The baseline evidence includes merchants such as Bollard Canada Inc. complaining that a high monthly price still did not feel justified, while other cited stores reported continued charges even after uninstall or cancellation.",
        ],
      },
      {
        question: "How is Weglot positioned compared with Ciwi?",
        answer:
          "Conclusion: Weglot is positioned more around quick multilingual coverage and easier first understanding, while Ciwi is positioned more around Shopify structure, glossary control, and longer-term governance.",
        evidence: [
          "Weglot's public and market perception are tied more closely to quick setup and rapid multilingual rollout.",
          "Ciwi's page-level scoring here gives higher weight to Shopify structure fit, glossary control, help and SEO routing, and growth workflow fit.",
        ],
      },
      {
        question: "How should merchants compare Weglot pricing with Ciwi pricing?",
        answer:
          "Conclusion: the real comparison is whether higher ongoing cost and upgrade pressure are acceptable in exchange for faster coverage, or whether a workflow-led model is safer for long-term budgeting.",
        evidence: [
          "The price signal on this compare page favors Ciwi 7/10 to Weglot's 6/10.",
          "Research notes repeatedly mention high monthly cost, automatic upgrade behavior, and ongoing charges after cancellation as reasons merchants keep re-evaluating Weglot's long-term cost.",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-langify",
    title: "Ciwi vs Langify",
    alternativeName: "Langify",
    description: "Useful when comparing translation workflow, human control, and long-term synchronization strategy.",
    summary: "If you care more about human review, terminology consistency, and ongoing update governance, Ciwi is easier to combine with glossary, help docs, and resource routing. If the need is more basic translation organization, a Langify-like path is usually easier to understand.",
    bestFor: [
      "Brands with high requirements for human review and terminology consistency",
      "Teams already operating localization workflows and trying to reduce maintenance friction",
      "Shopify merchants thinking about SEO content and storefront content together",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 7, alternative: 7},
      {label: "Translation speed", ciwi: 8, alternative: 7},
      {label: "Translation quality", ciwi: 9, alternative: 7},
      {label: "Data coverage", ciwi: 9, alternative: 6},
    ],
    scoreMatrix: [
      {label: "Human review flow", ciwi: 9, alternative: 8},
      {label: "Glossary consistency", ciwi: 9, alternative: 6},
      {label: "Structured sync", ciwi: 9, alternative: 6},
      {label: "SEO and content routing", ciwi: 9, alternative: 5},
      {label: "Translation management basics", ciwi: 8, alternative: 8},
      {label: "Long-term governance", ciwi: 9, alternative: 6},
    ],
    faq: [
      {
        question: "Why emphasize ongoing synchronization in Ciwi vs Langify?",
        answer:
          "Conclusion: the more expensive multilingual problem usually starts after the first translation pass, when campaigns, launches, and repeated storefront updates create continuous maintenance work.",
        evidence: [
          "Research notes on Langify repeatedly mention slow loading, theme compatibility issues, uninstall residue, and problems that required manual cleanup after the fact.",
          "Examples include a 2022 review saying automatic translation damaged original source-language content with no rollback path, and later reviews pointing to poor PageFly integration and slow or missing support responses.",
        ],
      },
      {
        question: "What is the key difference in Ciwi vs Langify?",
        answer:
          "Conclusion: the real difference is not translation output alone, but whether glossary, ongoing sync, content routing, and storefront governance are treated as one system rather than manual cleanup tasks.",
        evidence: [
          "Research notes mention Langify complaints about archived or draft products being hard to filter, theme compatibility gaps, uninstall residue, and manual effort after translation mistakes.",
          "That pattern points to a workflow problem: merchants are not just translating once, they are constantly maintaining content and storefront behavior afterward.",
        ],
      },
      {
        question: "What does Langify still do well for some merchants?",
        answer:
          "Conclusion: Langify can still make sense for teams that mainly want basic translation organization and are comfortable managing more of the surrounding workflow themselves.",
        evidence: [
          "On this page, Langify remains competitive on the basic translation management signal at 8/10 versus Ciwi's 8/10.",
          "The score gap opens wider on glossary consistency, structured sync, SEO and content routing, and long-term governance rather than on basic management alone.",
        ],
      },
      {
        question: "Who should compare Ciwi and Langify most seriously?",
        answer:
          "Conclusion: merchants with high terminology standards, meaningful human review needs, and storefront plus SEO content changing over time should compare these two most carefully.",
        evidence: [
          "The best-fit signals on this page include human review quality, terminology consistency, reduced maintenance friction, and running storefront plus SEO content together.",
          "The score matrix gives Ciwi clear page-level advantages on glossary consistency, structured sync, SEO and content routing, and long-term governance.",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-transtore",
    title: "Ciwi vs Transtore",
    alternativeName: "Transtore",
    description: "Useful when comparing pricing transparency, AI translation quality, and how safely existing manual translations are handled.",
    summary:
      "If you care about predictable multilingual cost, preserving manual work, and avoiding confusion between free install and real publishing capability, Ciwi is the steadier path.",
    appComparison:
      "Transtore's public description positions it as an all-in-one Shopify localization app that combines translation, currency conversion, and geolocation-based redirection in one workflow. The product message is broad: translate storefront content, image alt text, and third-party apps; localize images; support RTL languages; keep translations consistent with glossary and manual editing; use advanced AI translation with GPT and DeepSeek; manage 163+ currencies with real-time or manual exchange rates and smart rounding rules; and auto-detect customer location to switch language and currency or redirect. It also highlights multilingual SEO through translated meta tags and URLs following Google best practices. Ciwi's public positioning is more structured around Shopify localization workflow depth across products, themes, navigation, FAQs, images, and metafields, together with glossary control, custom prompts, image localization, and ongoing sync. In practice, Transtore reads more like an all-in-one translation, currency, and geolocation app for quick international storefront setup, while Ciwi is positioned more around structured localization governance and long-term workflow control.",
    bestFor: [
      "Merchants comparing free-install messaging against actual multilingual readiness",
      "Teams that already invested in manual translations and do not want accidental overwrites",
      "Brands that want translation, SEO structure, and long-term operations to stay manageable together",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 8, alternative: 6},
      {label: "Translation speed", ciwi: 8, alternative: 7},
      {label: "Translation quality", ciwi: 9, alternative: 6},
      {label: "Data coverage", ciwi: 9, alternative: 6},
    ],
    scoreMatrix: [
      {label: "Pricing transparency", ciwi: 9, alternative: 4},
      {label: "Manual translation safety", ciwi: 9, alternative: 4},
      {label: "Structured sync", ciwi: 9, alternative: 6},
      {label: "Quick setup", ciwi: 8, alternative: 8},
      {label: "Multilingual operations", ciwi: 9, alternative: 6},
      {label: "Long-term governance", ciwi: 9, alternative: 5},
    ],
    faq: [
      {
        question: "Is Transtore really free?",
        answer:
          "Conclusion: merchants should not read Transtore as unconditionally free. In review patterns, it behaves more like free install or one-language entry, while real multilingual publishing often introduces a much narrower usable scope than expected.",
        evidence: [
          "Transtore's 86 negative reviews repeatedly focus on the gap between free-install messaging and what merchants can actually publish without upgrading.",
          "Research notes cite multiple reviews from 2025 to 2026 explicitly saying 'not free', and examples such as ValueShield describing the free version as barely usable and PrintingNest Studio saying a second language immediately pushed the app into paid territory.",
        ],
      },
      {
        question: "Can Transtore overwrite existing manual translations?",
        answer:
          "Conclusion: overwrite risk is real enough to factor into the decision. If a store has already invested in manual translation, review control and rollback safety become core buying criteria rather than optional workflow features.",
        evidence: [
          "Research notes reference a 2026-02 review saying Transtore 'wiped out ALL my manual translations' and a 2024-10 complaint saying professional translations were deleted, leaving the site without translations.",
          "Other notes mention merchants already holding professional translations but still seeing automatic processes interfere with or replace them.",
        ],
      },
      {
        question: "How good is Transtore's AI translation quality?",
        answer:
          "Conclusion: Transtore looks more suitable for lightweight coverage than for leaving high-conversion storefront copy completely on autopilot.",
        evidence: [
          "Research notes include an Italian merchant in 2026 saying the AI 'has no idea about the Italian language' and another complaint comparing output to generic machine translation rather than higher-quality AI localization.",
          "Other cited complaints mention content not translating at all, partial delivery, or promised language coverage not actually appearing in production.",
        ],
      },
      {
        question: "Is moving from Transtore to Ciwi difficult?",
        answer:
          "Conclusion: the hardest part is usually not the export itself but cleaning old rules, deciding what stays manual, and restoring content control before migration starts.",
        evidence: [
          "Review patterns already point to overwrite risk, free-scope confusion, and inconsistent geolocation, currency, or translation states, all of which increase cleanup work before migration.",
          "Research notes also cite cases where uninstall or site state was still affecting storefront behavior after removal, which means migration planning has to include cleanup validation.",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-hextom-ai",
    title: "Ciwi vs Hextom AI",
    alternativeName: "Hextom AI",
    description: "Useful when comparing credit transparency, rollback risk, translation quality, and support responsiveness.",
    summary:
      "If you want multilingual rollout without opaque credit math, unexpected reversions, or support delays during live storefront updates, Ciwi is the safer long-term workflow.",
    appComparison:
      "Hextom's public description positions the app as a combined multi-currency and multilingual storefront localization tool. The message is broad: 130+ languages, 180+ currencies, support for Shopify Markets and checkout, 200+ third-party apps, and 230+ themes, plus AI translation through ChatGPT, Claude, Grok, Deepseek, and Google Gemini. It also emphasizes visual-editor translation for third-party apps, image and alt-text translation, and geolocation-based language and currency switching. Ciwi's public positioning is less about sheer ecosystem breadth and more about structured Shopify localization workflow: products, themes, navigation, FAQs, images, and metafields, together with glossary control, custom prompts, and ongoing sync. In practice, Hextom reads more like a broad coverage translation-and-currency platform, while Ciwi is positioned more around controlled translation workflow and localization governance.",
    pricingComparison:
      "Based on the pricing screenshot you shared, Hextom publishes four tiers: Free, Basic at $9.99/month, Pro at $19.99/month, and Business at $49.99/month, with 7-day free trials on the paid plans. The packaging is language-scale led: Free includes 180+ currencies, free auto-translate for 3 languages, editable translation for 20 languages, manual and AI translation, plus a language/currency selector; Basic increases free auto-translate to 10 languages and adds language/currency redirection, import translation, and backup and restore; Pro pushes to 50 languages and adds image translation, glossary, autopilot for new or outdated content, and migration; Business scales to 133 languages with advanced translation filters. Ciwi also publishes four tiers, but with a lower first paid entry and a more credits-and-workflow led structure: Free, Basic at $7.99/month, Pro at $19.99/month, and Premium at $39.99/month, with annual billing saving 20%. Ciwi's paid plans move from 1,500,000 monthly credits plus glossary and custom AI prompts, to 3,000,000 credits with auto translation and localized product images and alt text, and then 8,000,000 credits with 1v1 support and manual review by translation experts. So Hextom is more explicit about language-scale expansion and ecosystem breadth, while Ciwi is clearer on translation workflow depth, support level, and upper-tier localization control.",
    pricingTable: {
      rowLabels: ["Free", "Tier 2", "Tier 3", "Tier 4"],
      ciwiPlans: ciwiPricingPlansEn,
      alternativePlans: [
        {name: "Free", price: "Free", note: "3 auto languages; 180+ currencies"},
        {name: "Basic", price: "$9.99/month", note: "10 auto languages"},
        {name: "Pro", price: "$19.99/month", note: "50 auto languages; glossary"},
        {name: "Business", price: "$49.99/month", note: "133 auto languages"},
      ],
    },
    bestFor: [
      "Teams that need predictable budget control instead of unclear credit consumption",
      "Brands with SEO-sensitive URLs and live translated pages that cannot break during updates",
      "Merchants who care about support responsiveness during ongoing localization work",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 8, alternative: 5},
      {label: "Translation speed", ciwi: 8, alternative: 7},
      {label: "Translation quality", ciwi: 9, alternative: 6},
      {label: "Data coverage", ciwi: 9, alternative: 6},
    ],
    scoreMatrix: [
      {label: "Credit transparency", ciwi: 9, alternative: 4},
      {label: "Manual control", ciwi: 9, alternative: 5},
      {label: "URL and SEO safety", ciwi: 9, alternative: 4},
      {label: "Shopify content fit", ciwi: 9, alternative: 6},
      {label: "Support reliability", ciwi: 8, alternative: 4},
      {label: "Long-term governance", ciwi: 9, alternative: 5},
    ],
    faq: [
      {
        question: "How are Hextom credits calculated?",
        answer:
          "Conclusion: the Hextom credits issue is not only about price. The bigger concern is whether merchants can predict when paid capacity becomes usable, how it is consumed, and when extra spend starts again.",
        evidence: [
          "Research notes cite a 2026-07 review saying newly purchased capacity could not be used until the next billing cycle, while 2024 and 2025 complaints describe disappearing credits or suspected over-consumption.",
          "That pattern turns credits from a billing detail into an operational planning risk.",
        ],
      },
      {
        question: "Can Hextom roll back translations?",
        answer:
          "Conclusion: rollback and translation loss should be treated as a real comparison risk, especially for stores with live URLs, SEO dependencies, or already-reviewed multilingual content.",
        evidence: [
          "Research notes cite a 2026-05 complaint saying URL translations were reverted without permission, causing multilingual pages to return 404s.",
          "Other notes include a 2022 review claiming 40 hours of translations disappeared and a 2024 complaint saying an existing language was deleted.",
        ],
      },
      {
        question: "Will Hextom translate brand names too literally?",
        answer:
          "Conclusion: yes, review evidence suggests key brand terms can be translated too literally, which makes glossary control and human review essential rather than optional.",
        evidence: [
          "Research notes cite a 2024 complaint where a brand term was translated into the equivalent of 'NOT/NON', and another complaint saying translation quality harmed brand credibility.",
          "The issue is not just awkward phrasing; it reaches core naming and trust signals on the storefront.",
        ],
      },
      {
        question: "Is Hextom support reliable?",
        answer:
          "Conclusion: support quality looks inconsistent enough that fast issue ownership should be treated as part of the product decision, not a secondary service detail.",
        evidence: [
          "Research notes include a 2025 long review criticizing the absence of a serious helpdesk process and saying issues were lost during handoffs.",
          "Other cited reviews from 2024 and earlier mention slow replies and long periods with no practical resolution while live storefront problems remained open.",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-langshop",
    title: "Ciwi vs LangShop",
    alternativeName: "LangShop",
    description: "Useful when comparing glossary cost, storefront switcher fit, day-to-day stability, and multilingual governance.",
    summary:
      "If you need stronger terminology control without enterprise-style glossary pricing, and you want a cleaner ongoing workflow for storefront updates, Ciwi is the more balanced path.",
    appComparison:
      "LangShop's public description positions it as a multilingual Shopify translation platform that can use AI engines such as DeepL, ChatGPT, and Google Cloud, or professional human translators, then refine the result with manual edits. The product message is broad: translate dynamic content, metafields, apps, URLs, and Shopify Checkout; manage glossary and content rules; support RTL languages; integrate with Shopify Markets; and combine language and currency switching with geolocation. Ciwi's public positioning is more focused on Shopify-aware translation workflow depth across products, themes, navigation, FAQs, images, and metafields, with glossary control, custom prompts, and ongoing sync. In practice, LangShop reads more like a full-service multilingual translation platform with both AI and human translation paths, while Ciwi is positioned more around structured localization workflow and translation governance.",
    pricingComparison:
      "Based on the pricing screenshot you shared, LangShop publishes four tiers: Free, Basic at $10/month, Standard at $40/month, and Advanced at $75/month, with 14-day free trials on the paid plans. The structure is product-count, language-count, and glossary-rule based: Free includes 1 language, unlimited translations for 50 products, limited manual and AI translations, multilingual SEO, agency handoff support, and basic 24/7 support; Basic keeps 1 language but raises unlimited translation scope to 250 products with 5 glossary rules, unlimited editing, no LangShop branding, bulk editing, and 24/7 priority support; Standard moves to 3 languages, 2000 products, 100 glossary rules, 50 new-item translation auto syncs, OpenAI/DeepL Pro/Google Cloud support, an advanced currency switcher, and dynamic plus third-party app translation; Advanced expands to 5 languages, 5000 products, 250 glossary rules, 125 auto syncs, 10 content-type exclusion rules, and Shopify Flow support. Ciwi also publishes four tiers, but with lower paid entry and a more credits-and-workflow led structure: Free, Basic at $7.99/month, Pro at $19.99/month, and Premium at $39.99/month, with annual billing saving 20%. Ciwi's paid plans move from 1,500,000 monthly credits plus glossary and custom AI prompts, to 3,000,000 credits with auto translation and localized product images and alt text, and then 8,000,000 credits with 1v1 support and manual review by translation experts. So LangShop is more explicit about language scale, product quotas, glossary rules, and AI-provider flexibility, while Ciwi is clearer on lower entry pricing, workflow depth, and upper-tier support level.",
    pricingTable: {
      rowLabels: ["Free", "Tier 2", "Tier 3", "Tier 4"],
      ciwiPlans: ciwiPricingPlansEn,
      alternativePlans: [
        {name: "Free", price: "Free", note: "50 products; 1 language"},
        {name: "Basic", price: "$10/month", note: "250 products; 5 glossary rules"},
        {name: "Standard", price: "$40/month", note: "2000 products; 3 languages"},
        {name: "Advanced", price: "$75/month", note: "5000 products; Shopify Flow"},
      ],
    },
    bestFor: [
      "Brands that care about terminology consistency but still want predictable costs",
      "Merchants sensitive to switcher design and premium storefront presentation",
      "Teams that cannot tolerate multi-day translation failures during active market operations",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 8, alternative: 5},
      {label: "Translation speed", ciwi: 8, alternative: 7},
      {label: "Translation quality", ciwi: 9, alternative: 7},
      {label: "Data coverage", ciwi: 9, alternative: 7},
    ],
    scoreMatrix: [
      {label: "Glossary value", ciwi: 9, alternative: 4},
      {label: "Storefront switcher fit", ciwi: 9, alternative: 5},
      {label: "Translation stability", ciwi: 9, alternative: 5},
      {label: "Structured sync", ciwi: 9, alternative: 6},
      {label: "Theme integration", ciwi: 9, alternative: 6},
      {label: "Long-term governance", ciwi: 9, alternative: 6},
    ],
    faq: [
      {
        question: "Does LangShop really require enterprise pricing for larger glossary use?",
        answer:
          "Conclusion: review evidence suggests that meaningful glossary scale in LangShop can feel like a high-tier or near-enterprise cost rather than a low-cost standard capability.",
        evidence: [
          "Research notes cite a 2026 review explicitly saying unlimited glossary rules would require roughly $500/month.",
          "Other notes mention glossary problems remaining unresolved for long periods, which makes the glossary question one of both cost and reliability.",
        ],
      },
      {
        question: "What does LangShop's switcher feel like on a premium storefront?",
        answer:
          "Conclusion: merchants with premium storefront expectations should test the switcher carefully, because review evidence shows it can become a real front-end fit issue rather than a minor design preference.",
        evidence: [
          "Research notes cite PurrEmbassy (2026-01) directly describing the switcher as ugly and not aligned with a premium shop.",
          "Other notes mention downgrade-related difficulty adjusting the selector itself, which suggests front-end control can become a workflow issue too.",
        ],
      },
      {
        question: "Is LangShop stable for daily operations?",
        answer:
          "Conclusion: stability is one of the strongest issues to test, because review evidence points not just to occasional bugs but to multi-day failures, missing sync, and translation jobs failing without enough visibility.",
        evidence: [
          "Research notes cite Lifted Clothing (2026-05) saying the app did not work for three straight days, and another 2025 complaint saying many translations failed across 17 days with no warning.",
          "Additional complaints mention critical bugs staying unresolved for months and new content not syncing automatically, increasing the maintenance burden during active operations.",
        ],
      },
      {
        question: "Which is better for smaller language markets, Ciwi or LangShop?",
        answer:
          "Conclusion: both can enter the shortlist for adding more languages, but the deciding factor for smaller markets is usually not raw language count. It is whether failures are visible, glossary costs remain manageable, and updates stay trustworthy when fewer team members can monitor those markets directly.",
        evidence: [
          "Research notes mention failed translations with no notifications and repeated need for manual correction in more specialized or smaller language contexts.",
          "That means governance quality, warning signals, and glossary economics often matter more than the headline number of supported languages.",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-gtranslate",
    title: "Ciwi vs GTranslate",
    alternativeName: "GTranslate",
    description: "Useful when comparing SEO safety, pricing pressure, uninstall risk, and storefront stability during multilingual growth.",
    summary:
      "If you care about predictable SEO structure, safer storefront behavior, and avoiding upgrade pressure when traffic grows, Ciwi is the steadier long-term path.",
    appComparison:
      "GTranslate's public description positions it as a fast-launch multilingual storefront tool built around instant automatic translation, lightweight design flexibility, and SEO-oriented URL infrastructure. The product message is clear: unlimited automatic translations for quick results, customizable language selectors, an in-context translation editor, translation proxy technology that can translate most third-party app content, URL translation for multilingual SEO, and country-specific top-level domains for translated languages such as example.es. It also highlights that merchants can improve automatic output themselves or order professional translations later. Ciwi's public positioning is less about proxy-based instant coverage and more about deeper Shopify localization workflow across products, themes, navigation, FAQs, images, and metafields, together with glossary control, custom prompts, image localization, and ongoing sync. In practice, GTranslate reads more like a rapid-coverage SEO-and-switcher translation platform, while Ciwi is positioned more around structured localization workflow and controlled long-term governance.",
    pricingComparison:
      "Based on the pricing screenshot you shared, GTranslate publishes four tiers: Free, Bilingual Startup at $12/month, Startup at $25/month, and Business at $35/month, with 15-day free trials on the paid plans. The packaging is language-count and SEO-feature led: Free includes all languages, machine translation, unlimited words and pageviews, no pressure to upgrade, and live chat support; Bilingual Startup adds 1 additional language, neural translation, search engine indexing for SEO, edit translations, and live chat support; Startup expands to all languages with neural translation, unlimited words and pageviews, SEO indexing, editable translations, and live chat support; Business adds URL translation on top of Startup. Ciwi also publishes four tiers, but with lower paid entry and a more workflow-led structure overall: Free, Basic at $7.99/month, Pro at $19.99/month, and Premium at $39.99/month, with annual billing saving 20%. Ciwi's paid plans move from 1,500,000 monthly credits plus glossary and custom AI prompts, to 3,000,000 credits with auto translation and localized product images and alt text, and then 8,000,000 credits with 1v1 support and manual review by translation experts. So GTranslate is more explicit about instant auto-translation, SEO indexing, and URL-based multilingual rollout, while Ciwi is clearer on lower entry pricing, structured workflow depth, and support-led scaling.",
    pricingTable: {
      rowLabels: ["Free", "Tier 2", "Tier 3", "Tier 4"],
      ciwiPlans: ciwiPricingPlansEn,
      alternativePlans: [
        {name: "Free", price: "Free", note: "All languages; machine translation"},
        {name: "Bilingual Startup", price: "$12/month", note: "1 additional language; SEO indexing"},
        {name: "Startup", price: "$25/month", note: "All languages; neural translation"},
        {name: "Business", price: "$35/month", note: "Startup + URL translation"},
      ],
    },
    bestFor: [
      "Merchants who care about translated URLs, SEO consistency, and storefront stability together",
      "Teams comparing lower-entry pricing against long-term platform dependence",
      "Brands that cannot afford translation errors during campaigns or high-traffic periods",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 8, alternative: 5},
      {label: "Translation speed", ciwi: 8, alternative: 7},
      {label: "Translation quality", ciwi: 9, alternative: 6},
      {label: "Data coverage", ciwi: 9, alternative: 6},
    ],
    scoreMatrix: [
      {label: "SEO safety", ciwi: 9, alternative: 4},
      {label: "Pricing predictability", ciwi: 9, alternative: 4},
      {label: "Uninstall cleanliness", ciwi: 9, alternative: 3},
      {label: "Manual editing control", ciwi: 9, alternative: 5},
      {label: "Storefront stability", ciwi: 9, alternative: 4},
      {label: "Long-term governance", ciwi: 9, alternative: 5},
    ],
    faq: [
      {
        question: "Can GTranslate keep control of your domain or translated URLs after uninstall?",
        answer:
          "Conclusion: uninstall cleanliness is a real buying factor here, because review evidence shows domain, subdomain, or selector residue can remain after removal and affect live SEO traffic or storefront behavior.",
        evidence: [
          "Research notes cite specific complaints about domain or translated URL residue after uninstall, including merchants who felt the app continued to affect storefront routing or SEO setup.",
          "That shifts the comparison from translation speed alone to exit cost and cleanup risk.",
        ],
      },
      {
        question: "How expensive can GTranslate become as traffic grows?",
        answer:
          "Conclusion: the cost question is less about the headline entry tier and more about whether the model stays affordable once translated traffic becomes business-critical.",
        evidence: [
          "Review patterns in the research notes repeatedly connect GTranslate with pricing pressure after stores begin relying on multilingual traffic.",
          "The negative-review evidence focuses on upgrade pressure, higher ongoing cost, and the feeling that long-term use becomes much more expensive than the first decision implied.",
        ],
      },
      {
        question: "How good is GTranslate's translation quality?",
        answer:
          "Conclusion: quality looks mixed enough that merchants should assume review and correction are still necessary, especially for copy that affects trust, conversion, or SEO.",
        evidence: [
          "Research notes repeatedly mention weak accuracy, missing translations, and heavy manual correction on live storefront text.",
          "That means the core comparison is not whether automatic output exists, but whether there is enough control to keep important pages commercially safe afterward.",
        ],
      },
      {
        question: "Why do some merchants mention site breakage during peak sales periods?",
        answer:
          "Conclusion: peak-period breakage matters because even a small translation or routing failure during major campaigns can turn a multilingual tool into a revenue risk instead of a growth layer.",
        evidence: [
          "Research notes cite complaints describing storefront bugs, checkout issues, or site disruption during important commercial windows, including Black Friday-style traffic periods.",
          "Even if not every store experiences this, the downside is large enough that stability deserves its own comparison weight.",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-t-lab",
    title: "Ciwi vs T Lab",
    alternativeName: "T Lab",
    description: "Useful when comparing searchability, translation workflow, language coverage, and setup complexity.",
    summary:
      "If you want multilingual operations to stay searchable, easier to review, and simpler to maintain after the initial launch, Ciwi gives a more structured workflow.",
    appComparison:
      "T Lab's public packaging presents it mainly as an admin-side translation tool: the plans are structured around product, collection, and article volume, AI language count, import/export, multi-currency, and AI engine management. Ciwi's public packaging reads differently. Even the Free plan already highlights 148 languages with RTL support, custom API connections such as Google Translate and ChatGPT 4, editable translations, and image translation. Paid tiers then expand into glossary, custom AI prompts, IP-based language and currency switching, auto translation, localized product images and alt text, plus 1v1 support and manual review on Premium. In practice, T Lab is easier to read as a capacity-based translation tool, while Ciwi is positioned more like a broader Shopify localization workflow.",
    pricingComparison:
      "Based on the pricing details you shared, T Lab publishes four tiers: Free, Pro at $11.99/month, Business at $29.99/month, and Premium at $59.99/month. The structure is resource-led, starting around 500 products, 20 collections, and 20 articles on Free, then moving to 3000 products on Pro and 7000 on Business, with Premium adding broader AI language and engine management. Ciwi also publishes four tiers, but the entry prices are lower: Free, Basic at $7.99/month, Pro at $19.99/month, and Premium at $39.99/month, with annual billing saving 20%. Ciwi's paid structure is more credits-and-workflow based: Basic includes 1,500,000 credits per month plus glossary and custom AI prompts, Pro moves to 3,000,000 credits with auto translation and localized product images and alt text, and Premium reaches 8,000,000 credits with 1v1 support and manual review by translation experts. So T Lab is more explicit about content-volume limits, while Ciwi is more explicit about translation capability, automation depth, and support level at each paid tier.",
    pricingTable: {
      rowLabels: ["Free", "Tier 2", "Tier 3", "Tier 4"],
      ciwiPlans: ciwiPricingPlansEn,
      alternativePlans: [
        {name: "Free", price: "Free", note: "500 products; 20 collections"},
        {name: "Pro", price: "$11.99/month", note: "3000 products; 500 collections"},
        {name: "Business", price: "$29.99/month", note: "7000 products; 2000 collections"},
        {name: "Premium", price: "$59.99/month", note: "20 AI languages; engine management"},
      ],
    },
    bestFor: [
      "Teams that expect many ongoing micro-edits after the first translation pass",
      "Merchants who care about finding and updating translated content quickly",
      "Brands comparing setup simplicity against deeper day-to-day control",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 8, alternative: 7},
      {label: "Translation speed", ciwi: 8, alternative: 7},
      {label: "Translation quality", ciwi: 9, alternative: 7},
      {label: "Data coverage", ciwi: 9, alternative: 7},
    ],
    scoreMatrix: [
      {label: "Global search", ciwi: 9, alternative: 5},
      {label: "Translation workflow clarity", ciwi: 9, alternative: 6},
      {label: "Structured sync", ciwi: 9, alternative: 6},
      {label: "SEO-fit translation", ciwi: 9, alternative: 6},
      {label: "Setup simplicity", ciwi: 8, alternative: 6},
      {label: "Long-term maintenance", ciwi: 9, alternative: 6},
    ],
    faq: [
      {
        question: "What is the main difference between T Lab and Ciwi translation engines?",
        answer:
          "Conclusion: for most merchants the practical difference is not the model label itself, but whether translated content stays easy to review, search, and maintain after launch.",
        evidence: [
          "On this page, Ciwi leads clearly on global search, translation workflow clarity, SEO-fit translation, and long-term maintenance rather than on raw 'engine label' messaging alone.",
          "T Lab's public packaging is also more capacity-led, organized around products, collections, articles, language limits, and engine management, which supports a different buying story from Ciwi's workflow-led positioning.",
        ],
      },
      {
        question: "Does T Lab support global search across translation content?",
        answer:
          "Conclusion: searchability matters because once a store starts making repeated small edits across products, collections, and articles, the expensive part is often finding what to change, not translating it once.",
        evidence: [
          "The score matrix on this page gives Ciwi a clear lead on global search at 9/10 versus 5/10 for T Lab.",
          "That gap aligns with the broader page theme: T Lab is easier to read as a capacity-based admin translation tool, while Ciwi is positioned as a broader workflow with stronger review and maintenance control.",
        ],
      },
      {
        question: "Do T Lab and Ciwi support the same language scale?",
        answer:
          "Conclusion: language count alone is not enough to compare them. The more practical question is whether the app remains manageable as languages, markets, and ongoing edits expand together.",
        evidence: [
          "T Lab's published tiers are defined more by content-volume limits and AI-language allowances, while Ciwi's public packaging emphasizes 147+ languages, 200+ currencies, and workflow capabilities such as glossary, prompts, auto translation, and localized images.",
          "That makes the comparison less about a single headline number and more about operational manageability after expansion.",
        ],
      },
      {
        question: "Is Ciwi easier to set up than T Lab?",
        answer:
          "Conclusion: setup should be judged by how quickly a merchant reaches a repeatable operating workflow, not only by how fast the app can be installed the first time.",
        evidence: [
          "The score matrix gives Ciwi an edge on setup simplicity at 8/10 versus 6/10 for T Lab.",
          "T Lab's plan messaging is more configuration- and capacity-heavy, while Ciwi's packaging is more explicitly workflow-led, which often changes how merchants experience the first setup phase.",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-locales-ai",
    title: "Ciwi vs Locales.ai",
    alternativeName: "Locales.ai",
    description: "Useful when comparing billing predictability, credit controls, support responsiveness, and multilingual operating cost.",
    summary:
      "If you want multilingual growth without unclear credit burn or surprise billing behavior, Ciwi is the safer path for budget control and day-to-day operations.",
    appComparison:
      "Locales.ai's public description positions it as an AI-first Shopify localization app built around GPT-5.1 speed and quality, with a strong emphasis on broad Shopify content coverage and third-party app support. The product message is specific: it auto-translates products, collections, pages, blogs, menus, notifications, Liquid templates, JSON metafields, URLs, inline translations, and dynamic content from a source locale, while also supporting integrations such as Judge.me, Loox, PageFly, GemPages, Vitals, Stoq Preorder, UpCart, Insureful, Powerful Form Builder, and Appstle Subscriptions. It also emphasizes glossary, tone control, bulk actions, a built-in language and currency switcher, and support for 100+ currencies. Ciwi's public positioning is less about a single model label and more about structured Shopify localization workflow depth across products, themes, navigation, FAQs, images, and metafields, together with glossary control, custom prompts, image localization, and ongoing sync. In practice, Locales.ai reads more like a GPT-first automation layer with strong app-content coverage, while Ciwi is positioned more around controlled translation workflow and structured localization governance.",
    pricingComparison:
      "Based on the pricing screenshot you shared, Locales.ai publishes four tiers: Free, Basic at $9.99/month, Pro at $29.99/month, and Premium at $89.99/month, with annual billing discounts and optional extra credits on demand. The structure is clearly credits-led: Free includes 2,500 credits, 1 max language, AI context, and template plus URL translation; Basic includes 10,000 credits per month, 5 max languages, auto-translate and manual edit, language switcher and currency converter, with extra credits priced at $1.20 per 1,000 credits; Pro increases to 33,000 credits per month, 20 max languages, glossary, and third-party app translation powered by GPT-5.1, with extra credits at $1.10 per 1,000 credits; Premium rises to 110,000 credits per month, 40 max languages, app market support, 1v1 support, and extra credits at $1.00 per 1,000 credits. Ciwi also publishes four tiers, but the entry pricing is lower on the first paid plan and the value message is more workflow-led overall: Free, Basic at $7.99/month, Pro at $19.99/month, and Premium at $39.99/month, with annual billing saving 20%. Ciwi's paid plans move from 1,500,000 monthly credits plus glossary and custom AI prompts, to 3,000,000 credits with auto translation and localized product images and alt text, and then 8,000,000 credits with 1v1 support and manual review by translation experts. So Locales.ai is more explicit about GPT-led automation, app-content coverage, and on-demand credit expansion, while Ciwi is clearer on lower paid entry, workflow depth, and support-led scaling.",
    pricingTable: {
      rowLabels: ["Free", "Tier 2", "Tier 3", "Tier 4"],
      ciwiPlans: ciwiPricingPlansEn,
      alternativePlans: [
        {name: "Free", price: "Free", note: "2,500 credits; 1 language"},
        {name: "Basic", price: "$9.99/month", note: "10,000 credits; 5 languages"},
        {name: "Pro", price: "$29.99/month", note: "33,000 credits; 20 languages"},
        {name: "Premium", price: "$89.99/month", note: "110,000 credits; 40 languages"},
      ],
    },
    bestFor: [
      "Teams that need a clearer budget model than subscription plus variable credits",
      "Brands sensitive to hidden spend, missing hard limits, or usage spikes",
      "Merchants who treat support responsiveness as part of core product reliability",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 8, alternative: 4},
      {label: "Translation speed", ciwi: 8, alternative: 7},
      {label: "Translation quality", ciwi: 9, alternative: 6},
      {label: "Data coverage", ciwi: 9, alternative: 6},
    ],
    scoreMatrix: [
      {label: "Billing transparency", ciwi: 9, alternative: 3},
      {label: "Credit control", ciwi: 9, alternative: 3},
      {label: "Budget predictability", ciwi: 9, alternative: 4},
      {label: "Support reliability", ciwi: 8, alternative: 4},
      {label: "Workflow continuity", ciwi: 9, alternative: 5},
      {label: "Long-term governance", ciwi: 9, alternative: 5},
    ],
    faq: [
      {
        question: "How is Locales.ai priced compared with Ciwi?",
        answer:
          "Conclusion: the core pricing issue is not just the monthly plan, but whether merchants can understand total cost before automation, extra credits, and growth all scale together.",
        evidence: [
          "Locales.ai publishes a subscription ladder from Free to $89.99/month while also selling additional credits on demand.",
          "The page-level pricing and billing signals strongly favor Ciwi because credit-heavy expansion creates a second layer of cost decisions on top of the base subscription.",
        ],
      },
      {
        question: "How does the Locales.ai credit system work?",
        answer:
          "Conclusion: the credit system matters because it affects usage control, not just invoicing. Once extra credit purchases enter the workflow, budget predictability becomes part of daily operations.",
        evidence: [
          "The published plans combine monthly credits, language caps, and extra-credit pricing from $1.20 to $1.00 per additional 1,000 credits.",
          "That makes Locales.ai easier to read as an AI automation and app-content coverage product, but also means budget control depends on understanding both the subscription and the expansion path.",
        ],
      },
      {
        question: "Does Ciwi have hidden spending risk like credit-heavy tools?",
        answer:
          "Conclusion: the question matters because teams choosing between these products are often not chasing the absolute lowest price. They want clearer boundaries around what multilingual usage will cost over time.",
        evidence: [
          "On this page Ciwi leads Locales.ai strongly on billing transparency, credit control, and budget predictability.",
          "Ciwi's public ladder is simpler to compare because the first paid tier is lower and the packaging message is more workflow-led than add-credit-led.",
        ],
      },
      {
        question: "How should support be evaluated in Ciwi vs Locales.ai?",
        answer:
          "Conclusion: support should be evaluated as a product reliability factor, especially when translation jobs fail, usage looks wrong, or billing questions become urgent during live operations.",
        evidence: [
          "The score matrix on this page gives Ciwi an advantage on support reliability as part of workflow continuity and long-term governance.",
          "That matters more for credit-heavy products because usage, support, and billing become tightly connected during troubleshooting.",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-ea-auto-language-translate",
    title: "Ciwi vs EA Auto Language Translate",
    alternativeName: "EA Auto Language Translate",
    description: "Useful when comparing language scope, setup simplicity, and the difference between lightweight translation and a fuller localization workflow.",
    summary:
      "If you need more than a lightweight translation add-on and want stronger structure, governance, and broader localization coverage, Ciwi gives the more complete path.",
    bestFor: [
      "Merchants evaluating lightweight entry tools before committing to a fuller workflow",
      "Teams that need broader localization capabilities beyond simple auto translation",
      "Brands that want a clearer setup path as multilingual operations grow",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 8, alternative: 7},
      {label: "Translation speed", ciwi: 8, alternative: 7},
      {label: "Translation quality", ciwi: 9, alternative: 7},
      {label: "Data coverage", ciwi: 9, alternative: 5},
    ],
    scoreMatrix: [
      {label: "Language coverage", ciwi: 9, alternative: 6},
      {label: "Setup clarity", ciwi: 8, alternative: 7},
      {label: "Structured content fit", ciwi: 9, alternative: 5},
      {label: "Glossary control", ciwi: 9, alternative: 4},
      {label: "Workflow depth", ciwi: 9, alternative: 5},
      {label: "Long-term governance", ciwi: 9, alternative: 4},
    ],
    faq: [
      {
        question: "How many languages do EA Auto Translate and Ciwi support?",
        answer:
          "Conclusion: language count is only the starting signal. The more important comparison is whether those languages remain manageable as storefront content, SEO assets, and repeated edits keep growing.",
        evidence: [
          "This page scores Ciwi clearly higher on language coverage, structured content fit, glossary control, workflow depth, and long-term governance.",
          "Ciwi's public packaging also frames language expansion together with images, alt text, glossary, prompts, and sync rather than as a lightweight add-on alone.",
        ],
      },
      {
        question: "How difficult is EA Auto Translate to operate?",
        answer:
          "Conclusion: because public review evidence is limited, the better comparison is operating clarity: how fast merchants understand setup, manage language changes, and keep translation control after the first install.",
        evidence: [
          "On this page, EA stays closer to Ciwi on setup clarity than on deeper governance signals, which suggests it is better read as a lightweight entry tool than a fuller localization workflow.",
          "The gap opens much wider on structured content fit, glossary control, workflow depth, and long-term governance.",
        ],
      },
      {
        question: "What does Ciwi offer beyond EA Auto Translate?",
        answer:
          "Conclusion: Ciwi's advantage is not one-pass translation alone, but the wider localization workflow around structured governance, terminology control, and Shopify content operations.",
        evidence: [
          "The page-level score gaps are strongest on structured content fit, glossary control, workflow depth, and long-term governance.",
          "Ciwi's public packaging also includes image and alt-text localization, currency switching, custom prompts, and higher-tier review support, which moves it beyond a lightweight translation utility.",
        ],
      },
      {
        question: "Who should still consider EA Auto Translate first?",
        answer:
          "Conclusion: merchants still validating whether they need a lightweight translation entry tool at all may want to review EA first, but the comparison shifts quickly once broader workflow needs appear.",
        evidence: [
          "The best-fit signals on this page specifically mention merchants evaluating lighter entry tools before committing to a fuller localization workflow.",
          "That makes EA easier to shortlist for early-stage validation, while Ciwi becomes easier to justify when operations start expanding across content types and markets.",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-orbe-geolocation",
    title: "Ciwi vs Orbe Geolocation",
    alternativeName: "Orbe Geolocation",
    description: "Useful when comparing a translation workflow with a geolocation and market redirection tool.",
    summary:
      "Ciwi and Orbe solve different problems. Ciwi is for multilingual translation and localization governance, while Orbe is primarily for geolocation, market routing, and country-based storefront logic.",
    bestFor: [
      "Merchants deciding whether the real need is translation or market redirection",
      "Brands that already have translations but need better country and market routing",
      "Teams mapping how localization and geolocation tools should work together",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 8, alternative: 8},
      {label: "Translation speed", ciwi: 9, alternative: 1},
      {label: "Translation quality", ciwi: 9, alternative: 1},
      {label: "Data coverage", ciwi: 9, alternative: 4},
    ],
    scoreMatrix: [
      {label: "Translation workflow", ciwi: 10, alternative: 1},
      {label: "Market redirection", ciwi: 4, alternative: 9},
      {label: "Geolocation logic", ciwi: 4, alternative: 9},
      {label: "Glossary control", ciwi: 9, alternative: 1},
      {label: "Shopify localization fit", ciwi: 9, alternative: 6},
      {label: "Functional overlap", ciwi: 3, alternative: 3},
    ],
    faq: [],
  },
  {
    slug: "ciwi-vs-ez-product-image-translate",
    title: "Ciwi vs EZ Product Image Translate",
    alternativeName: "EZ Product Image Translate",
    description: "Useful when comparing a full translation workflow with an image-focused translation utility.",
    summary:
      "Ciwi and EZ Product Image Translate overlap only partially. Ciwi handles broader storefront translation and localization governance, while EZ is much closer to an image-specific workflow.",
    bestFor: [
      "Merchants deciding whether they need store-wide translation or only image-focused support",
      "Brands that care about product image language alongside broader storefront localization",
      "Teams comparing alt text coverage against more limited image utility workflows",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 8, alternative: 8},
      {label: "Translation speed", ciwi: 8, alternative: 7},
      {label: "Translation quality", ciwi: 9, alternative: 6},
      {label: "Data coverage", ciwi: 10, alternative: 3},
    ],
    scoreMatrix: [
      {label: "Store-wide translation", ciwi: 10, alternative: 2},
      {label: "Image workflow focus", ciwi: 7, alternative: 9},
      {label: "Image alt coverage", ciwi: 9, alternative: 6},
      {label: "Glossary control", ciwi: 9, alternative: 2},
      {label: "Shopify content fit", ciwi: 9, alternative: 4},
      {label: "Long-term governance", ciwi: 9, alternative: 3},
    ],
    faq: [],
  },
  {
    slug: "ciwi-vs-selecty",
    title: "Ciwi vs Geolocation & Markets Selecty",
    alternativeName: "Geolocation & Markets Selecty",
    description: "Useful when comparing translation and localization workflow with a geolocation selector and market-detection tool.",
    summary:
      "Ciwi and Selecty focus on different layers. Ciwi is for translating and governing multilingual content, while Selecty is closer to country detection, market selection, and storefront routing.",
    bestFor: [
      "Merchants deciding whether the current bottleneck is translation or location detection",
      "Brands that need country selectors and market routing on top of existing translations",
      "Teams designing a stack that combines localization content with geolocation logic",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 8, alternative: 7},
      {label: "Translation speed", ciwi: 9, alternative: 1},
      {label: "Translation quality", ciwi: 9, alternative: 1},
      {label: "Data coverage", ciwi: 9, alternative: 4},
    ],
    scoreMatrix: [
      {label: "Translation workflow", ciwi: 10, alternative: 1},
      {label: "Location detection", ciwi: 4, alternative: 7},
      {label: "Market routing", ciwi: 4, alternative: 8},
      {label: "Storefront selector logic", ciwi: 5, alternative: 8},
      {label: "Localization governance", ciwi: 9, alternative: 3},
      {label: "Functional overlap", ciwi: 3, alternative: 3},
    ],
    faq: [
      {
        question: "How accurate is Selecty's location detection?",
        answer:
          "Conclusion: Selecty should be evaluated as a geolocation and market-routing layer first, not as a translation solution, and detection accuracy needs direct storefront testing before rollout.",
        evidence: [
          "The available review evidence is limited, but it does include complaints around incorrect detection and currency behavior.",
          "That fits the page-level score profile: Selecty is strong on location detection, market routing, and selector logic, but near-zero on translation workflow itself.",
        ],
      },
      {
        question: "What is the core difference between Ciwi and Selecty?",
        answer:
          "Conclusion: Ciwi governs multilingual content and localization workflow, while Selecty handles country detection, market choice, and storefront routing. They solve adjacent but not equivalent problems.",
        evidence: [
          "The score matrix gives Ciwi a large lead on translation workflow and localization governance, while Selecty leads on location detection, market routing, and selector logic.",
          "The functional overlap signal on this page is intentionally low for both products, reinforcing that they are only partial substitutes.",
        ],
      },
      {
        question: "When do merchants need Ciwi and Selecty together rather than one instead of the other?",
        answer:
          "Conclusion: merchants often need both when the real stack problem is split between multilingual content creation and country-based storefront routing.",
        evidence: [
          "Ciwi covers translation, glossary, structured Shopify content, and ongoing sync.",
          "Selecty covers the storefront decision layer of where visitors should land, which market they should see, and how selectors behave.",
        ],
      },
      {
        question: "How should pricing be judged for an adjacent tool like Selecty?",
        answer:
          "Conclusion: pricing should be judged against the specific problem being solved, because cheaper market routing is not a substitute for translation governance, and vice versa.",
        evidence: [
          "This page keeps price relatively close but shows extremely different scores on translation workflow versus routing-specific capabilities.",
          "That means value depends on whether the current bottleneck is multilingual content, location detection, or the combination of both.",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-reversia",
    title: "Ciwi vs Reversia",
    alternativeName: "Reversia",
    description: "Useful when comparing high-end AI translation, automatic sync, multilingual SEO depth, and enterprise-style pricing.",
    summary:
      "If you want strong multilingual SEO and automatic sync but need to balance that against a much higher monthly price, Ciwi is the more accessible workflow-led path while Reversia reads more like a premium AI translation platform.",
    appComparison:
      "Reversia's public description positions it as a professional-grade AI translation platform for Shopify stores that want contextual translations, automatic sync, and strong multilingual SEO. The product message is specific: translate products, collections, pages, metafields, URLs, and more into 110 languages; automatically sync every content creation and update; translate metadata, URL slugs, structured data, metafields, and metaobjects; and support unlimited languages with currency management. Ciwi's public positioning is broader on Shopify localization workflow rather than premium translation positioning alone. It emphasizes products, themes, navigation, FAQs, images, and metafields, together with glossary control, custom prompts, image localization, and ongoing sync. In practice, Reversia reads more like a higher-end AI translation and SEO platform, while Ciwi is positioned more around structured localization workflow depth at a lower entry point.",
    pricingComparison:
      "Based on the pricing screenshot you shared, Reversia publishes four paid tiers only: Pro at $199/month, Advanced at $299/month, Business at $399/month, and Scale at $499/month. The structure is translated-word led: 500,000 words on Pro, 1,000,000 on Advanced, 2,000,000 on Business, and 3,000,000 on Scale, with professional AI translation, unlimited languages, smart glossary, multilingual SEO, metafields and metaobjects translation, third-party app translation, and dedicated support appearing across the lineup. Ciwi, by contrast, publishes a much lower-entry four-tier structure: Free, Basic at $7.99/month, Pro at $19.99/month, and Premium at $39.99/month, with annual billing saving 20%. Ciwi's paid tiers move from 1,500,000 monthly credits plus glossary and custom AI prompts, to 3,000,000 credits with auto translation and localized product images and alt text, and then 8,000,000 credits with 1v1 support and manual review by translation experts. So Reversia is more clearly positioned as a premium paid-only AI translation platform with built-in SEO emphasis, while Ciwi is easier to adopt for merchants who want structured workflow depth without entering enterprise-style monthly pricing from day one.",
    pricingTable: {
      rowLabels: ["Tier 1", "Tier 2", "Tier 3", "Tier 4"],
      ciwiPlans: ciwiPricingPlansEn,
      alternativePlans: [
        {name: "Pro", price: "$199/month", note: "500,000 translated words"},
        {name: "Advanced", price: "$299/month", note: "1,000,000 translated words"},
        {name: "Business", price: "$399/month", note: "2,000,000 translated words"},
        {name: "Scale", price: "$499/month", note: "3,000,000 translated words"},
      ],
    },
    bestFor: [
      "Merchants comparing premium AI translation against a lower-entry workflow-led option",
      "Brands that care about multilingual SEO, synced updates, and translated structured data",
      "Teams evaluating whether premium translation positioning justifies a much higher monthly cost",
    ],
    summaryMetrics: [
      {label: "Price", ciwi: 9, alternative: 2},
      {label: "Translation speed", ciwi: 8, alternative: 8},
      {label: "Translation quality", ciwi: 9, alternative: 9},
      {label: "Data coverage", ciwi: 9, alternative: 8},
    ],
    scoreMatrix: [
      {label: "Entry pricing", ciwi: 10, alternative: 2},
      {label: "Automatic sync", ciwi: 9, alternative: 9},
      {label: "Multilingual SEO depth", ciwi: 9, alternative: 9},
      {label: "Metafield coverage", ciwi: 9, alternative: 9},
      {label: "Workflow breadth", ciwi: 9, alternative: 8},
      {label: "High-end translation positioning", ciwi: 8, alternative: 9},
    ],
    faq: [
      {
        question: "Who is Reversia best suited for compared with Ciwi?",
        answer:
          "Conclusion: Reversia is better suited to teams already comfortable with a premium monthly budget and specifically prioritizing professional AI translation positioning plus multilingual SEO depth.",
        evidence: [
          "Its public product message is built around contextual AI translation, automatic sync on content updates, multilingual SEO, translated structured data, metafields, and metaobjects.",
          "Its published price ladder also starts far above most Shopify translation apps, which changes the qualification threshold before a merchant even tests it.",
        ],
      },
      {
        question: "What stands out most in Reversia's pricing?",
        answer:
          "Conclusion: the biggest pricing difference is that Reversia is a paid-only product starting at $199/month and scaling through translated-word volume, which makes it a very different purchase decision from Ciwi's low-entry ladder.",
        evidence: [
          "Reversia's public tiers begin at $199/month and rise through $299, $399, and $499/month.",
          "The ladder scales by translated words from 500,000 to 3,000,000 rather than by a lower free-to-paid entry path.",
        ],
      },
      {
        question: "Is Reversia mainly about translation quality or workflow?",
        answer:
          "Conclusion: Reversia is positioned more around premium AI translation quality plus multilingual SEO, while Ciwi is positioned more around broader Shopify workflow depth and ongoing governance.",
        evidence: [
          "Reversia's public copy highlights professional AI translation, automatic sync, translated metadata, URL slugs, structured data, metafields, and metaobjects.",
          "Ciwi's public positioning on this page emphasizes coverage across product pages, theme content, metafields, images, alt text, prompts, glossary, and real-time sync as a broader workflow story.",
        ],
      },
      {
        question: "When is Ciwi easier to justify than Reversia?",
        answer:
          "Conclusion: Ciwi is easier to justify when a merchant wants strong Shopify localization workflow coverage without crossing immediately into premium paid-only pricing territory.",
        evidence: [
          "The price score on this page strongly favors Ciwi because Reversia begins at $199/month with no free or low-entry plan.",
          "At the same time, the score table still keeps Reversia highly competitive on translation quality, SEO depth, and automatic sync, which means the trade-off is mostly budget threshold versus premium specialization.",
        ],
      },
    ],
  },
];

const comparesZh: CompareItem[] = [
  {
    slug: "ciwi-vs-transcy",
    title: "Ciwi vs Transcy",
    alternativeName: "Transcy",
    description: "从 Shopify 适配深度、术语控制和长期维护成本三个维度比较两种路径。",
    summary: "如果你关心的不只是把文字翻出来，而是希望长期维护多语言商品、主题和 FAQ，Ciwi 会更偏向结构化治理和本地化质量。",
    appComparison:
      "从你给的套餐图看，Transcy 的产品定位更像“翻译 + 货币 + 多市场前台运营”的一体化工具。即使是免费版，也直接包含 1 种语言、1 种货币、基础切换器、第三方应用翻译和 Shopify Payments 集成；往上再按可编辑语言数、货币数、AI 代币、多语言 SEO、自动化流程以及 DeepL/OpenAI/Gemini 这类 API 级能力去扩展。Ciwi 的公开套餐结构则不一样，更强调 Shopify 结构化内容翻译和治理，包括 glossary、自定义 AI prompts、图片和 alt text 本地化、按 IP 切换语言/货币，以及高阶套餐里的 1v1 支持和人工翻译审核。换句话说，Transcy 更像“把多语言前台运营能力打包在一起卖”，Ciwi 更像“把翻译治理和本地化工作流做深”。",
    pricingComparison:
      "按你提供的截图，Transcy 当前公开是 4 档：免费版、$14.90/月、$29/月，以及最高档 $69/月，付费档都带 7 天免费试用。它的价格逻辑主要按语言数、货币数和 AI 代币往上走：较低档从 1 种可编辑语言、1 种货币开始，中间档提升到 3 种语言和 3 种货币，再到最高档强调 15 种语言、15 种货币、更多术语库、地理定位，以及 DeepL、OpenAI、Gemini API 密钥。Ciwi 也是 4 档，但公开月费更低：Free、Basic $7.99/月、Pro $19.99/月、Premium $39.99/月，年付可省 20%。Ciwi 的分层更像 credits 和 workflow 分层：Basic 给到每月 1,500,000 credits，加 glossary 和 custom AI prompts；Pro 提升到 3,000,000 credits，并加入 auto translation、localized product images and alt text；Premium 提升到 8,000,000 credits，再加 1v1 support 和人工翻译审核。简单说，Transcy 更强调“多语言+多货币+多市场广度”，Ciwi 更强调“更低入门价格 + 更清晰的翻译工作流深度”。",
    pricingTable: {
      rowLabels: ["免费档", "第二档", "第三档", "第四档"],
      ciwiPlans: ciwiPricingPlansZh,
      alternativePlans: [
        {name: "免费版", price: "Free", note: "1 种语言；1 种货币"},
        {name: "本地增强版", price: "$14.90/月", note: "1 种可编辑语言；1 种货币"},
        {name: "区域版", price: "$29/月", note: "3 种语言；3 种货币"},
        {name: "大陆版", price: "$69/月", note: "15 种语言；15 种货币"},
      ],
    },
    bestFor: ["重视 glossary 和品牌术语一致性的商家", "需要覆盖 Shopify 结构化内容的团队", "希望把产品页、帮助文档和 SEO 页面联动起来的品牌"],
    summaryMetrics: [
      {label: "价格", ciwi: 7, alternative: 8},
      {label: "翻译速度", ciwi: 8, alternative: 8},
      {label: "翻译质量", ciwi: 9, alternative: 7},
      {label: "数据覆盖度", ciwi: 9, alternative: 7},
    ],
    scoreMatrix: [
      {label: "术语控制", ciwi: 9, alternative: 7},
      {label: "结构化内容覆盖", ciwi: 9, alternative: 7},
      {label: "持续同步", ciwi: 9, alternative: 7},
      {label: "主题与前台适配", ciwi: 9, alternative: 6},
      {label: "上线速度", ciwi: 7, alternative: 8},
      {label: "长期治理", ciwi: 9, alternative: 6},
    ],
    faq: [
      {
        question: "什么时候更应该选择 Ciwi？",
        answer: "结论：当你不能接受链接、SEO、价格或已上线内容被翻译工具改坏时，更应该选择 Ciwi，而不是只看“能不能快速翻出来”。",
        evidence: [
          "在 FAQ 基准里，Transcy 有 284 条差评，高频主题集中在链接被改、SEO/canonical/hreflang、退款与持续扣费、翻译丢失。",
          "例如 PurrEmbassy（2026-03）提到链接被改且无法编辑；chronofactum.com（2026-04）称近 1000 美元退款数月未解决；sandiia（2024-10）提到 3 个月 SEO 工作被毁。",
        ],
      },
      {
        question: "这类对比页最适合谁看？",
        answer: "最适合已经明确要做多语言、但不想在上线后再为 SEO、订阅、退款和恢复问题反复补救的 Shopify 商家。",
        evidence: [
          "这不是抽象担忧：Transcy 的差评里反复出现持续扣费、方案变动、翻译内容被破坏、站点价格和货币异常等运营级问题。",
          "例如 ZHENHUO GEAR（2025-12）提到卸载后仍持续扣费；MARSONIPRINT（2026-08）提到卸载后现有翻译被破坏；Tessi-supply.com（2026-01）直接提到 SEO 排名下滑。",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-langwill",
    title: "Ciwi vs Langwill",
    alternativeName: "Langwill",
    description: "适合比较翻译能力、内容承接方式和官网前台统一度时使用。",
    summary: "如果你不只是在比较一个翻译工具，而是在比较整套多语言增长路径，Ciwi 会更强调前台统一、资源承接和长期内容治理。",
    appComparison:
      "从你给的官方描述看，Langwill 的产品定位很明确，偏向“多语言翻译 + 自动货币转换 + 全球转化增长”的一体化工具。它主打 138 种语言、自动货币换算、地理定位跳转、多语言 SEO、图片翻译和 selector 自定义，并强调可用 GPT-4、DeepL、Google 做 AI 翻译，同时支持 meta tags 和 URL handles 的翻译。Ciwi 的公开定位则更偏 Shopify 本地化工作流深度，重点在 products、themes、navigation、FAQ、images、metafields 这类结构化内容覆盖，以及 glossary、custom prompts 和后续持续同步。换句话说，Langwill 更像“翻译 + 货币 + 前台转化”的增长型工具，Ciwi 更像“翻译治理 + Shopify 结构化本地化”的工作流型工具。",
    pricingComparison:
      "按你给的套餐图，Langwill 当前公开是 4 档：Free、Starter $9.99/月、Growth $19.99/月、Premium $49.99/月，付费档有 3 天免费试用。它的价格逻辑很明显是按 words 和 translated languages 往上走：Free 给 5,000 words 和 1 种翻译语言；Starter 提升到 30,000 words、5 种翻译语言，并加入 glossary、自动货币切换、备份恢复和第三方应用翻译；Growth 到 80,000 words、20 种翻译语言，并加入 auto-translate、auto switch language、visual translation、image translation；Premium 则到 300,000 words、20 种翻译语言、GPT-4 translation、额外 words 购买和 priority technical support。Ciwi 也是 4 档，但首个付费档更低：Free、Basic $7.99/月、Pro $19.99/月、Premium $39.99/月，年付可省 20%。Ciwi 的分层更像 credits 和 workflow 分层：Basic 给到每月 1,500,000 credits，加 glossary 和 custom AI prompts；Pro 提升到 3,000,000 credits，并加入 auto translation、localized product images and alt text；Premium 提升到 8,000,000 credits，再加 1v1 support 和人工翻译审核。简单说，Langwill 更直白地按词数和语言数卖容量，Ciwi 更清楚地按自动化深度、结构化本地化能力和支持等级卖工作流。",
    pricingTable: {
      rowLabels: ["免费档", "第二档", "第三档", "第四档"],
      ciwiPlans: ciwiPricingPlansZh,
      alternativePlans: [
        {name: "Free", price: "Free", note: "5,000 words；1 种语言"},
        {name: "Starter", price: "$9.99/月", note: "30,000 words；5 种语言"},
        {name: "Growth", price: "$19.99/月", note: "80,000 words；20 种语言"},
        {name: "Premium", price: "$49.99/月", note: "300,000 words；GPT-4"},
      ],
    },
    bestFor: ["希望统一官网、博客和帮助中心体验的团队", "正在评估翻译工具和内容增长链路的商家", "需要更明确对比导购页的品牌"],
    summaryMetrics: [
      {label: "价格", ciwi: 7, alternative: 7},
      {label: "翻译速度", ciwi: 8, alternative: 7},
      {label: "翻译质量", ciwi: 9, alternative: 7},
      {label: "数据覆盖度", ciwi: 9, alternative: 7},
    ],
    scoreMatrix: [
      {label: "官网前台整合", ciwi: 9, alternative: 6},
      {label: "内容承接路径", ciwi: 9, alternative: 6},
      {label: "SEO 对比链路", ciwi: 9, alternative: 5},
      {label: "结构化治理", ciwi: 9, alternative: 6},
      {label: "上线速度", ciwi: 7, alternative: 7},
      {label: "商家教育适配", ciwi: 8, alternative: 6},
    ],
    faq: [
      {
        question: "为什么官网里要做 Compare 页？",
        answer: "因为像 Langwill 这类工具，真正决定选型的往往不是功能名，而是试用扣费、套餐变动、翻译上限和后续更新稳定性，这些问题只有 Compare 页能直接讲清楚。",
        evidence: [
          "在 FAQ 基准里，Langwill 有 84 条差评，问题集中在试用期扣费、套餐变更未充分告知、产品或字数上限、自动更新不稳定和客服无效。",
          "例如 Handicraft Trend（2026-06）和 Calves（2025-11）都提到试用期或试用中被收费；LBLYXIR（2024-04）提到付费方案变化未告知；Shoptery（2023-09）提到只能翻 1000 个产品。",
        ],
      },
      {
        question: "Ciwi vs Langwill 最值得比较的点是什么？",
        answer: "最值得比较的不是“能不能翻译”，而是收费边界、自动更新是否可靠、上限是否透明，以及客服能不能真正把 bug 修掉。",
        evidence: [
          "Langwill 的差评里，不少商家提到自动更新失效、翻译第二天又变回去、或 premium 计划也无法及时解决问题。",
          "例如 2023-12 的评论提到 auto-update 不工作，需要每天手动同步 20 个国家；2023-06 有评论提到手动改好的文案第二天又被改回；2023-12 还有评论提到 glossary 两个月都没修好。",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-shopify-translate-adapt",
    title: "Ciwi vs Shopify Translate & Adapt",
    alternativeName: "Shopify Translate & Adapt",
    description: "适合比较 Shopify 原生多语言能力和更完整本地化工作流时使用。",
    summary: "如果你已经不满足于“能发布多语言版本”这一层，而是开始关心 glossary、结构化内容覆盖、持续同步和品牌一致性，Ciwi 的路径会更完整。",
    appComparison:
      "从你给的官方描述看，Shopify Translate & Adapt 的定位非常明确，就是 Shopify 原生的多语言和市场适配起点。它强调直接在 Shopify admin 内完成多语言管理：可以在 side-by-side editor 里手动添加、编辑、审核翻译；可免费用 Google Translate 自动翻译最多 2 种语言；还能针对同一种语言在不同市场做 spelling、messaging、seasonal 和 regional 层面的 adapt；并且支持直接从 theme editor 或资源页里本地化内容。Ciwi 的公开定位则不是“原生默认方案”，而是更强调 Shopify 结构化本地化工作流深度，重点覆盖 products、themes、navigation、FAQ、images 和 metafields，以及 glossary、custom prompts、图片本地化和持续同步。换句话说，Translate & Adapt 更像“Shopify 原生多语言起步工具”，Ciwi 更像“适合长期运营的结构化本地化工作流工具”。",
    pricingComparison:
      "Shopify Translate & Adapt 和大多数独立翻译应用不一样，它没有一张多档套餐表。按你给的官方描述，最明确的真实定价信息就是：可免费自动翻译最多 2 种语言，使用 Google Translate；除此之外，商家可以继续在 Shopify admin 里手动添加和审核更多翻译。也就是说，它的价值主张更偏“原生、低门槛、直接可用”，而不是按套餐层级去卖功能。Ciwi 则是明确的 4 档：Free、Basic $7.99/月、Pro $19.99/月、Premium $39.99/月，年付可省 20%。Ciwi 的付费结构从每月 1,500,000 credits 加 glossary 和 custom AI prompts，提升到 3,000,000 credits 加 auto translation、localized product images and alt text，再到 8,000,000 credits 加 1v1 support 和人工翻译审核。简单说，Translate & Adapt 更适合把“原生免费自动翻 2 种语言”当作起步方案来理解，Ciwi 则更适合在你已经明确需要更多语言、更多自动化和更清晰的能力分层时做对比评估。",
    bestFor: ["已经在使用 Shopify 原生多语言，但需要更强控制力的团队", "希望统一产品页、帮助文档和资源前台的商家", "想把本地化从一次性任务变成持续流程的品牌"],
    summaryMetrics: [
      {label: "价格", ciwi: 7, alternative: 9},
      {label: "翻译速度", ciwi: 8, alternative: 9},
      {label: "翻译质量", ciwi: 9, alternative: 6},
      {label: "数据覆盖度", ciwi: 9, alternative: 5},
    ],
    scoreMatrix: [
      {label: "术语控制", ciwi: 9, alternative: 4},
      {label: "结构化内容覆盖", ciwi: 9, alternative: 5},
      {label: "持续同步", ciwi: 9, alternative: 4},
      {label: "快速上线", ciwi: 7, alternative: 10},
      {label: "Shopify 原生适配", ciwi: 8, alternative: 10},
      {label: "长期治理", ciwi: 9, alternative: 5},
    ],
    faq: [
      {
        question: "Shopify Translate & Adapt 够不够用？",
        answer: "结论：如果你只需要 Shopify 原生、2 种自动翻译语言、基础页面能跑起来，它可以作为起点；但一旦你需要更多语言、锁定手动翻译、图片 alt 或更稳定的结构化覆盖，它通常就不够用了。",
        evidence: [
          "评论里最反复出现的限制就是“只能自动翻译 2 种语言”，2024-12、2025-12、2026-08 等多个评论都明确提到这个上限。",
          "另外，2026-05 有评论提到 Auto-translate all 会覆盖手动修订；2025-12 和 2026-01 的评论都提到图片 alt、图片管理和更细粒度控制仍然缺失。",
        ],
      },
      {
        question: "为什么要把原生方案也放进 Compare？",
        answer: "因为很多 Shopify 商家的真实决策，不是在两个第三方插件里二选一，而是先从原生能力起步，再判断什么时候必须升级到更完整的本地化工作流。",
        evidence: [
          "Translate & Adapt 的评论里，常见路径就是“先用原生方案，因为免费且上手快”，然后在更多语言、SEO、批量翻译或手动修订控制上撞墙。",
          "例如 Golden Tallow（2026-05）和 Faronics Cloud（2024-12）都直接抱怨只能做 2 种语言；Alice Jewels Family（2024-08）和 Jungle Bird（2023-12）则把问题指向 URL/Google Merchant Center 等运营环节。",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-weglot",
    title: "Ciwi vs Weglot",
    alternativeName: "Weglot",
    description: "适合比较快速覆盖型翻译方案和更强调 Shopify 内容治理路径时使用。",
    summary: "如果你的重点是先快速覆盖多语言，Weglot 类路径通常更容易理解；如果你更关心 Shopify 结构化内容、品牌术语和长期治理，Ciwi 会更聚焦。",
    bestFor: ["已经有一定多语言流量，希望把内容治理做深的团队", "关心 glossary、FAQ、主题和资源回流的一体化品牌", "不只比较速度，也比较后续治理成本的商家"],
    summaryMetrics: [
      {label: "价格", ciwi: 7, alternative: 6},
      {label: "翻译速度", ciwi: 7, alternative: 9},
      {label: "翻译质量", ciwi: 9, alternative: 7},
      {label: "数据覆盖度", ciwi: 9, alternative: 7},
    ],
    scoreMatrix: [
      {label: "上线速度", ciwi: 7, alternative: 10},
      {label: "Shopify 结构适配", ciwi: 9, alternative: 6},
      {label: "术语控制", ciwi: 9, alternative: 6},
      {label: "帮助文档与 SEO 承接", ciwi: 9, alternative: 5},
      {label: "长期治理", ciwi: 9, alternative: 6},
      {label: "增长工作流适配", ciwi: 9, alternative: 7},
    ],
    faq: [
      {
        question: "什么时候更应该比较治理能力而不是翻译速度？",
        answer: "当你的店铺已经有真实流量、DNS 改动、自动升级或卸载残留一旦出错就会直接影响营收时，治理能力会比第一次上线速度更重要。",
        evidence: [
          "Weglot 的差评并不只是在抱怨“贵”，而是反复出现 DNS 变更导致网站下线、卸载后残留代码或 DNS 问题、自动升级和持续扣费。",
          "例如 2024-04 和 2024-01 的评论都提到 DNS 配置导致网站无法访问；2025-04 有商家称取消订阅后仍被收取 325 美元/月；2024-09 Icecartel 甚至提到删除项目后整站丢失。",
        ],
      },
      {
        question: "Ciwi vs Weglot 最适合谁看？",
        answer: "最适合已经跑出多语言流量，正在比较“先快上线”与“后续能不能稳住 SEO、计费和站点可控性”这两种路径差异的 Shopify 商家。",
        evidence: [
          "在 FAQ 基准里，Weglot 有 109 条差评，主题集中在高费用、自动升级、取消订阅后继续收费、DNS/代码残留和客服响应时效。",
          "例如 Bollard canada inc（2025-11）提到每月 140 美元仍觉得质量不值；Paper Shoot Official（2025-12）和 ROOTOTE GALLERY_EDITION（2023-11）都提到卸载或取消后继续收费。",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-langify",
    title: "Ciwi vs Langify",
    alternativeName: "Langify",
    description: "适合比较翻译工作流、人工可控性与持续同步策略时使用。",
    summary: "如果你更强调人工控制、术语一致性和后续更新治理，Ciwi 的路径更容易和 glossary、帮助文档与资源前台结合；如果只是基础翻译组织，Langify 类路径通常更容易理解。",
    bestFor: ["对人工控制和术语一致性要求较高的品牌", "已经有一定本地化运营流程、希望降低后续维护摩擦的团队", "需要把 SEO 内容和产品前台一起考虑的 Shopify 商家"],
    summaryMetrics: [
      {label: "价格", ciwi: 7, alternative: 7},
      {label: "翻译速度", ciwi: 8, alternative: 7},
      {label: "翻译质量", ciwi: 9, alternative: 7},
      {label: "数据覆盖度", ciwi: 9, alternative: 6},
    ],
    scoreMatrix: [
      {label: "人工校对流程", ciwi: 9, alternative: 8},
      {label: "术语一致性", ciwi: 9, alternative: 6},
      {label: "结构化同步", ciwi: 9, alternative: 6},
      {label: "SEO 与内容承接", ciwi: 9, alternative: 5},
      {label: "基础翻译管理", ciwi: 8, alternative: 8},
      {label: "长期治理", ciwi: 9, alternative: 6},
    ],
    faq: [
      {
        question: "为什么 Compare 页里要强调后续同步？",
        answer: "因为 Langify 类问题往往不是第一次翻译，而是后续回滚、速度慢、主题兼容和卸载残留；真正贵的通常是上线后的持续维护。",
        evidence: [
          "langify 的差评里，高频问题包括支持联系不上、翻译把原文改坏、加载极慢、兼容 PageFly/自定义主题差、卸载后残留代码。",
          "例如 2022-07 有评论提到自动翻译把原始母语内容也改坏且无法回滚；Neofollics（2024-04）提到和 PageFly 集成差；BAGS & PIECES（2026-07）提到两周联系不上支持。",
        ],
      },
      {
        question: "Ciwi vs Langify 的核心差异是什么？",
        answer: "核心差异不只在翻译本身，而在于是否把 glossary、持续同步、资源回流和前台治理一起纳入工作流，而不是把维护成本留给后续人工补洞。",
        evidence: [
          "langify 的多条差评都把问题指向“需要大量人工善后”：包括卸载后选择器或代码残留、主题兼容性差、无法过滤草稿/归档产品、自动翻译不可控。",
          "例如 2023-06 的评论提到无法过滤 archived/draft 产品，导致为无效内容付费；2021-05 和 2019-04 的评论都提到卸载后仍残留代码或选择器。",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-transtore",
    title: "Ciwi vs Transtore",
    alternativeName: "Transtore",
    description: "适合比较价格透明度、AI 翻译质量，以及对已有人工翻译的影响时使用。",
    summary:
      "如果你更关心多语言成本是否可预期、人工翻译是否会被误覆盖，以及“免费安装”和真正可发布之间有没有落差，Ciwi 会是更稳的路径。",
    appComparison:
      "从你给的官方描述看，Transtore 的产品定位很明确，偏向“翻译 + 货币转换 + geolocation 自动跳转”的一体化 Shopify 本地化工具。它强调可以翻译 storefront content、image alt text 和第三方应用内容，也能做图片本地化、RTL 语言支持、glossary 和 manual editing；AI 层面主打 GPT 和 DeepSeek；货币层面主打 163+ 货币切换、实时汇率和手动汇率、智能取整规则；同时还能按客户位置自动识别并切换语言、货币或直接重定向。它还明确强调 multilingual SEO，包括 meta tags 和 URLs 的翻译，并标注遵循 Google best practices。Ciwi 的公开定位则更偏 Shopify 结构化本地化工作流深度，重点在 products、themes、navigation、FAQ、images 和 metafields，以及 glossary、custom prompts、图片本地化和持续同步。换句话说，Transtore 更像“快速把翻译、货币和地理跳转打包在一起”的国际化工具，Ciwi 更像“更强调结构化治理和长期工作流控制”的本地化工具。",
    bestFor: [
      "正在比较“免费安装”宣传和真实多语言可用性的商家",
      "已经投入过人工翻译、不希望被自动流程误覆盖的团队",
      "希望把翻译、SEO 结构和长期多语言运营一起管好的品牌",
    ],
    summaryMetrics: [
      {label: "价格", ciwi: 8, alternative: 6},
      {label: "翻译速度", ciwi: 8, alternative: 7},
      {label: "翻译质量", ciwi: 9, alternative: 6},
      {label: "数据覆盖度", ciwi: 9, alternative: 6},
    ],
    scoreMatrix: [
      {label: "价格透明度", ciwi: 9, alternative: 4},
      {label: "人工翻译安全性", ciwi: 9, alternative: 4},
      {label: "结构化同步", ciwi: 9, alternative: 6},
      {label: "快速上手", ciwi: 8, alternative: 8},
      {label: "多语言运营适配", ciwi: 9, alternative: 6},
      {label: "长期治理", ciwi: 9, alternative: 5},
    ],
    faq: [
      {
        question: "Transtore 真的是免费的吗？",
        answer:
          "结论：不能把 Transtore 理解成“无条件免费”。从评论看，它更像是“免费安装或单语言入门”，一旦你要正式发布多语言，很多商家都会遇到预期落差。",
        evidence: [
          "Transtore 的 86 条差评里，最集中的主题就是“标免费但真正可用范围很窄”，尤其在第二语言、试用、忠诚计划和发布能力上。",
          "例如 2026-05、2026-02、2025-12 有多条评论都直接写“NOT FREE”；ValueShield（2025-12）提到 free version 几乎什么都做不了，PrintingNest Studio（2025-11）提到一旦发布第二语言就要付费。",
        ],
      },
      {
        question: "Transtore 会覆盖我已有的手动翻译吗？",
        answer:
          "结论：这类风险不能忽略。评论里已经出现“自动翻译覆盖人工翻译”或“原有翻译被改乱”的具体案例，所以如果你已经投入了人工翻译，控制权和回滚能力就必须单独比较。",
        evidence: [
          "2026-02 的评论明确提到“wiped out ALL my manual translations”；2024-10 也有评论称专业翻译被删除，网站一度没有翻译内容。",
          "另有 2024-11 的评论抱怨明明已有专业翻译，却仍被自动翻译覆盖或干扰，这说明 Transtore 的自动流程与人工流程边界并不总是清晰。",
        ],
      },
      {
        question: "Transtore 的 AI 翻译质量怎么样？",
        answer:
          "结论：更适合轻量覆盖，不适合直接把高转化页面交给它“自动跑完”。评论里对自然度、准确性和母语可读性的质疑非常明确。",
        evidence: [
          "2026-05 有意大利商家直接评价“AI has no idea about the Italian language”；2023-10 也有评论说它的翻译更像 Google Translate，而不是更自然的 AI 输出。",
          "另外 2025-07、2025-10、2023-09 的评论都提到“翻不出来”“承诺的多语言没兑现”或“翻译只部分生效”，这说明问题不只是文案质量，还有交付稳定性。",
        ],
      },
      {
        question: "从 Transtore 迁移到 Ciwi 麻烦吗？",
        answer:
          "结论：通常麻烦的不是导出导入本身，而是清理旧规则、确认哪些人工翻译还能保留，以及把被自动流程改乱的部分先恢复到可控状态。",
        evidence: [
          "Transtore 的差评里，常见前置问题就是自动覆盖人工翻译、免费范围理解错误，以及 geolocation/currency/翻译状态不一致，这些都会放大迁移前的梳理成本。",
          "例如 2023-09 有用户提到卸载后仍在网站生效；2025-10 有评论提到库存或商品状态被错误影响，说明迁移前必须先确认站点当前状态是否干净。",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-hextom-ai",
    title: "Ciwi vs Hextom AI",
    alternativeName: "Hextom AI",
    description: "适合比较 credits 透明度、回滚风险、翻译质量和客服响应时使用。",
    summary:
      "如果你不希望多语言上线过程中出现 credits 计算不清、翻译意外回滚，或线上更新时客服响应过慢，Ciwi 会是更适合长期运营的路径。",
    appComparison:
      "从你给的官方描述看，Hextom 的产品定位很明确，偏向“多货币换算 + 多语言翻译 + 全站本地化覆盖”的一体化平台。它主打 130+ 语言、180+ 货币，强调与 Shopify Markets 和 checkout、200+ 第三方应用、230+ 主题兼容，同时用 ChatGPT、Claude、Grok、Deepseek、Google Gemini 做 AI 翻译。它还特别强调第三方应用在 visual editor 里的手动/AI 翻译、图片和 alt-text 翻译，以及按地理位置自动切换语言和货币。Ciwi 的公开定位则没那么强调生态广度，而是更强调 Shopify 结构化内容工作流，包括 products、themes、navigation、FAQ、images 和 metafields，以及 glossary、custom prompts 和持续同步。换句话说，Hextom 更像“覆盖面很广的翻译+货币平台”，Ciwi 更像“翻译治理和本地化工作流更深的工具”。",
    pricingComparison:
      "按你给的套餐图，Hextom 当前公开是 4 档：Free、Basic $9.99/月、Pro $19.99/月、Business $49.99/月，付费档有 7 天免费试用。它的分层逻辑很明显是按可自动翻译语言规模往上走：Free 给 180+ 货币、免费自动翻译 3 种语言、20 种语言可编辑翻译、手动和 AI 翻译，以及语言/货币切换器；Basic 提升到免费自动翻译 10 种语言，并加入语言/货币重定向、导入翻译、备份恢复；Pro 提升到 50 种语言，再加图片翻译、glossary、new/outdated content autopilot、migration；Business 再到 133 种语言，并加入 advanced translation filter。Ciwi 也是 4 档，但首个付费档更低：Free、Basic $7.99/月、Pro $19.99/月、Premium $39.99/月，年付可省 20%。Ciwi 的分层更像 credits 和 workflow 分层：Basic 给到每月 1,500,000 credits，加 glossary 和 custom AI prompts；Pro 提升到 3,000,000 credits，并加入 auto translation、localized product images and alt text；Premium 提升到 8,000,000 credits，再加 1v1 support 和人工翻译审核。简单说，Hextom 更直白地按语言规模和生态广度卖能力，Ciwi 更清楚地按翻译工作流深度、支持等级和本地化治理卖能力。",
    pricingTable: {
      rowLabels: ["免费档", "第二档", "第三档", "第四档"],
      ciwiPlans: ciwiPricingPlansZh,
      alternativePlans: [
        {name: "Free", price: "Free", note: "3 种自动翻译语言；180+ 货币"},
        {name: "Basic", price: "$9.99/月", note: "10 种自动翻译语言"},
        {name: "Pro", price: "$19.99/月", note: "50 种自动翻译语言；glossary"},
        {name: "Business", price: "$49.99/月", note: "133 种自动翻译语言"},
      ],
    },
    bestFor: [
      "希望预算和 credits 消耗更可预期的团队",
      "有 SEO 页面和已翻译 URL，不能承受线上链接出错的品牌",
      "重视客服响应速度和后续维护效率的 Shopify 商家",
    ],
    summaryMetrics: [
      {label: "价格", ciwi: 8, alternative: 5},
      {label: "翻译速度", ciwi: 8, alternative: 7},
      {label: "翻译质量", ciwi: 9, alternative: 6},
      {label: "数据覆盖度", ciwi: 9, alternative: 6},
    ],
    scoreMatrix: [
      {label: "Credits 透明度", ciwi: 9, alternative: 4},
      {label: "人工控制力", ciwi: 9, alternative: 5},
      {label: "URL 与 SEO 安全性", ciwi: 9, alternative: 4},
      {label: "Shopify 内容适配", ciwi: 9, alternative: 6},
      {label: "客服可靠性", ciwi: 8, alternative: 4},
      {label: "长期治理", ciwi: 9, alternative: 5},
    ],
    faq: [
      {
        question: "Hextom 的翻译 credits 是怎么算的？",
        answer:
          "结论：Hextom 的 credits 争议不只是“贵”，而是很多商家在真正要用时，才发现额度生效时间、消耗逻辑或额外购买体验并不清晰。",
        evidence: [
          "2026-07 的评论明确提到升级后新增额度要等到下个 billing cycle 才能用；2024-08 和 2025-12 也都有“credits 突然消失”或“怀疑被过度消耗”的反馈。",
          "这类评论共同指向一个问题：商家无法提前判断花出去的钱何时能用、能用多久、为什么又要继续买。",
        ],
      },
      {
        question: "Hextom 会自动回滚我的翻译吗？",
        answer:
          "结论：回滚和丢失并不是个别传闻，至少在评论层面已经出现了明确案例，所以如果你有已上线 URL 或已校对翻译，必须把回滚风险算进选型里。",
        evidence: [
          "2026-05 有评论提到 URL translation 被“WITHOUT OUR PERMISSION”整段回滚，结果多市场页面直接 404；2022-07 也有评论提到花了 40 小时做的翻译全部消失。",
          "2024-10 还有评论称原有语言被删除，说明问题不只是单条文案错误，而是整批内容控制权的问题。",
        ],
      },
      {
        question: "Hextom 会翻译我的品牌名称吗？",
        answer:
          "结论：会，而且评论里已经出现品牌词被直接翻坏的情况。对品牌要求高的商家来说，这意味着 glossary 和人工审核不是加分项，而是必需项。",
        evidence: [
          "2024-07 的评论明确提到品牌名被翻成 NOT/NON，支持最初还拿 Google 翻译截图回应；2024-05 也有评论称翻译质量严重损害品牌可信度。",
          "这说明问题不是“偶尔不自然”，而是关键术语和品牌资产可能被错误处理。",
        ],
      },
      {
        question: "Hextom 的客服靠谱吗？",
        answer:
          "结论：客服体验并不稳定，而且很多差评不是抱怨语气，而是抱怨真正有故障时没人接、没人跟进、没人把问题闭环。",
        evidence: [
          "2025-08 的长评直接批评它没有像样的 helpdesk，问题会在交接中丢失；2024-07、2024-10、2021-12 的评论也都提到回复慢、长时间无人处理。",
          "如果你的店铺内容更新频繁，这类“慢支持”不是附属问题，而是会直接影响上线节奏和营收。",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-langshop",
    title: "Ciwi vs LangShop",
    alternativeName: "LangShop",
    description: "适合比较 glossary 成本、语言切换器体验、稳定性和多语言治理能力时使用。",
    summary:
      "如果你希望获得更强的术语一致性，但又不想为 glossary 扩容承担过重成本，同时还在意前台切换器观感和日常稳定性，Ciwi 会是更平衡的路径。",
    appComparison:
      "从你给的官方描述看，LangShop 的产品定位更像一个“AI 翻译 + 人工翻译 + Shopify 多语言运营”的全功能平台。它主打可用 DeepL、ChatGPT、Google Cloud 做 AI 翻译，也可以接入 native experts 做人工翻译，然后再通过 manual edits 精修；同时覆盖 dynamic content、metafields、apps、URLs、Shopify Checkout，支持 glossary 和 content rules、multilingual SEO、RTL 语言、Shopify Markets 集成，以及带地理定位的语言/货币切换。Ciwi 的公开定位则更聚焦于 Shopify 结构化翻译工作流深度，重点在 products、themes、navigation、FAQ、images 和 metafields，以及 glossary、custom prompts 和持续同步。换句话说，LangShop 更像“AI + 人工 + 多场景翻译平台”，Ciwi 更像“翻译治理和结构化本地化工作流工具”。",
    pricingComparison:
      "按你给的套餐图，LangShop 当前公开是 4 档：Free、Basic $10/月、Standard $40/月、Advanced $75/月，付费档有 14 天免费试用。它的价格逻辑很明显是按语言数、产品数、glossary rules 和自动同步能力往上走：Free 给 1 种语言、50 个产品的 unlimited translations、有限手动和 AI 翻译、multilingual SEO、翻译机构移交和基础 24/7 支持；Basic 仍是 1 种语言，但提升到 250 个产品、5 条 glossary rules、无限编辑、去 LangShop branding、bulk editing 和 24/7 priority support；Standard 提升到 3 种语言、2000 个产品、100 条 glossary rules、50 个新品自动同步，并加入 OpenAI/DeepL Pro/Google Cloud、advanced currency switcher、dynamic 和第三方应用翻译；Advanced 再到 5 种语言、5000 个产品、250 条 glossary rules、125 个自动同步、10 条内容类型排除规则和 Shopify Flow 支持。Ciwi 也是 4 档，但付费入门更低：Free、Basic $7.99/月、Pro $19.99/月、Premium $39.99/月，年付可省 20%。Ciwi 的分层更像 credits 和 workflow 分层：Basic 给到每月 1,500,000 credits，加 glossary 和 custom AI prompts；Pro 提升到 3,000,000 credits，并加入 auto translation、localized product images and alt text；Premium 提升到 8,000,000 credits，再加 1v1 support 和人工翻译审核。简单说，LangShop 更直白地按语言规模、产品上限、glossary 规则和 AI 服务商灵活度卖能力，Ciwi 更清楚地按更低入门成本、工作流深度和高阶支持等级卖能力。",
    pricingTable: {
      rowLabels: ["免费档", "第二档", "第三档", "第四档"],
      ciwiPlans: ciwiPricingPlansZh,
      alternativePlans: [
        {name: "Free", price: "Free", note: "50 个产品；1 种语言"},
        {name: "Basic", price: "$10/月", note: "250 个产品；5 条 glossary"},
        {name: "Standard", price: "$40/月", note: "2000 个产品；3 种语言"},
        {name: "Advanced", price: "$75/月", note: "5000 个产品；Shopify Flow"},
      ],
    },
    bestFor: [
      "重视术语一致性、但仍希望成本可控的品牌",
      "对语言切换器样式和前台高级感比较敏感的商家",
      "无法接受翻译任务连续多天异常的运营团队",
    ],
    summaryMetrics: [
      {label: "价格", ciwi: 8, alternative: 5},
      {label: "翻译速度", ciwi: 8, alternative: 7},
      {label: "翻译质量", ciwi: 9, alternative: 7},
      {label: "数据覆盖度", ciwi: 9, alternative: 7},
    ],
    scoreMatrix: [
      {label: "Glossary 性价比", ciwi: 9, alternative: 4},
      {label: "前台切换器适配", ciwi: 9, alternative: 5},
      {label: "翻译稳定性", ciwi: 9, alternative: 5},
      {label: "结构化同步", ciwi: 9, alternative: 6},
      {label: "主题整合", ciwi: 9, alternative: 6},
      {label: "长期治理", ciwi: 9, alternative: 6},
    ],
    faq: [
      {
        question: "LangShop 的术语库真的需要高价方案才够用吗？",
        answer:
          "结论：至少从差评看，LangShop 的 glossary 并不是“天然够用”，而是很多商家把它视为必须升到高价档才真正能用的功能。",
        evidence: [
          "Stoy（2026-03）直接写到“要无限 glossary 规则需要 500 美元/月”；2025-10 的评论也提到 glossary 本身不好用，修了一年都没解决。",
          "这说明术语治理在 LangShop 里并不是低成本基础能力，而更像高阶付费后的能力。",
        ],
      },
      {
        question: "LangShop 的语言切换器前台效果怎么样？",
        answer:
          "结论：如果你很在意店铺前台观感，LangShop 的切换器不是稳妥项。评论里已经出现“丑”“不适合 premium shop”的非常直白反馈。",
        evidence: [
          "PurrEmbassy（2026-01）明确写到 switcher ugly、not in line with a premium shop；2024-11 还有评论说降档后连切换器尺寸都难以调整。",
          "这意味着它不是单纯的审美争议，而是会实际影响品牌前台一致性和可控性。",
        ],
      },
      {
        question: "LangShop 的翻译稳定吗？",
        answer:
          "结论：稳定性是 LangShop 当前最需要单独评估的点之一，因为评论里不只是“偶发 bug”，而是连续多天无法工作、翻译任务失败和更新后不自动同步。",
        evidence: [
          "Lifted Clothing（2026-05）直接写到 app 连续三天不工作；2025-11 有评论称 17 天里大量翻译失败且没有提醒；2025-07 还有评论说关键 bug 三个月没修好。",
          "另外 2025-12 的评论提到新增文案不会自动更新，说明 LangShop 在日常运营阶段的维护成本并不低。",
        ],
      },
      {
        question: "ciwi 和 LangShop 哪个更适合小语种？",
        answer:
          "结论：如果你只是想先把语言数量加上去，两者都能进候选；但如果你担心小语种一旦出错更难被团队发现，那么治理能力、提醒机制和 glossary 成本会比“支持多少语言”更关键。",
        evidence: [
          "LangShop 的差评里，除了翻译质量，还有“失败了但没提醒”“小语种翻译要大量手动修”这类运营风险。",
          "例如 2025-11 的评论提到许多翻译失败却没有通知；2022-06 和 2022-07 的评论都提到专业或细分行业的翻译仍需大量手动纠正。",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-gtranslate",
    title: "Ciwi vs GTranslate",
    alternativeName: "GTranslate",
    description: "适合比较 SEO 安全性、价格压力、卸载残留风险和高流量阶段的稳定性时使用。",
    summary:
      "如果你更关心翻译后的 SEO 结构是否可控、站点运行是否稳定，以及流量增长后会不会被价格策略反向锁住，Ciwi 会是更稳的长期路径。",
    appComparison:
      "从你给的官方描述看，GTranslate 的产品定位很明确，偏向“快速自动翻译上线 + SEO 友好 URL + 轻量语言切换器”的方案。它强调 unlimited automatic translations 帮助商家快速得到结果，配合可自定义的 lightweight language switcher、in-context translation editor、translation proxy technology 来覆盖大多数第三方应用内容，同时支持 URL translation 和国家级顶级域名，例如 example.es，以增强多语言 SEO。它也明确说自动翻译之后，商家可以自己继续优化，或者再下单 professional translations。Ciwi 的公开定位则没那么强调 proxy 驱动的即时覆盖，而是更强调 Shopify 结构化本地化工作流，包括 products、themes、navigation、FAQ、images 和 metafields，以及 glossary、custom prompts、图片本地化和持续同步。换句话说，GTranslate 更像“快速覆盖 + SEO URL + 切换器”的多语言工具，Ciwi 更像“更适合长期治理的结构化本地化工作流工具”。",
    pricingComparison:
      "按你给的套餐图，GTranslate 当前公开是 4 档：Free、Bilingual Startup $12/月、Startup $25/月、Business $35/月，付费档有 15 天免费试用。它的价格逻辑很明显是按语言数和 SEO/URL 能力往上走：Free 给 all languages、machine translation、unlimited words and pageviews、live chat support；Bilingual Startup 加 1 additional language、neural translation、search engine indexing、edit translations；Startup 提升到 all languages，同时保留 neural translation、unlimited words and pageviews、SEO indexing 和 edit translations；Business 则在 Startup 基础上再加入 URL translation。Ciwi 也是 4 档，但首个付费档更低，整体结构也更偏工作流：Free、Basic $7.99/月、Pro $19.99/月、Premium $39.99/月，年付可省 20%。Ciwi 的付费结构从每月 1,500,000 credits 加 glossary 和 custom AI prompts，提升到 3,000,000 credits 加 auto translation、localized product images and alt text，再到 8,000,000 credits 加 1v1 support 和人工翻译审核。简单说，GTranslate 更直白地按自动翻译覆盖、SEO 索引和 URL 能力卖方案，Ciwi 更清楚地按更低入门价格、结构化工作流深度和支持式扩展卖能力。",
    pricingTable: {
      rowLabels: ["免费档", "第二档", "第三档", "第四档"],
      ciwiPlans: ciwiPricingPlansZh,
      alternativePlans: [
        {name: "Free", price: "Free", note: "All languages；machine translation"},
        {name: "Bilingual Startup", price: "$12/月", note: "1 additional language；SEO indexing"},
        {name: "Startup", price: "$25/月", note: "All languages；neural translation"},
        {name: "Business", price: "$35/月", note: "URL translation"},
      ],
    },
    bestFor: [
      "同时关心 URL 翻译、SEO 一致性和站点稳定性的商家",
      "正在比较低门槛价格和长期依赖成本的团队",
      "无法承受大促或高流量期间翻译工具出问题的品牌",
    ],
    summaryMetrics: [
      {label: "价格", ciwi: 8, alternative: 5},
      {label: "翻译速度", ciwi: 8, alternative: 7},
      {label: "翻译质量", ciwi: 9, alternative: 6},
      {label: "数据覆盖度", ciwi: 9, alternative: 6},
    ],
    scoreMatrix: [
      {label: "SEO 安全性", ciwi: 9, alternative: 4},
      {label: "价格可预期性", ciwi: 9, alternative: 4},
      {label: "卸载清理干净度", ciwi: 9, alternative: 3},
      {label: "人工编辑控制力", ciwi: 9, alternative: 5},
      {label: "前台稳定性", ciwi: 9, alternative: 4},
      {label: "长期治理", ciwi: 9, alternative: 5},
    ],
    faq: [
      {
        question: "GTranslate 卸载后真的会霸占域名吗？",
        answer:
          "结论：至少从评论证据看，卸载后的域名、子域名、选择器和代码残留不是小概率传言，而是被反复提到的真实风险。",
        evidence: [
          "INNOCN（2025-03）提到卸载后仍“hog your second-level domain name”；Forsaken Motorsports（2019-01）和 eXtreme 120+（2018-12）都提到卸载后按钮或代码没有干净移除。",
          "这类问题的核心不是单次 bug，而是退出成本偏高，一旦你要切换工具，清理工作可能落回到自己团队头上。",
        ],
      },
      {
        question: "GTranslate 的升级费用有多高？",
        answer:
          "结论：高流量店铺的价格上限是 GTranslate 最需要警惕的地方之一，因为评论里已经出现与店铺盈利能力完全不匹配的升级费用反馈。",
        evidence: [
          "PEAK SURGICALS（2025-11）提到流量升到 13k 后，被要求升级到 10000 美元/月服务器包，而店铺通过翻译流量带来的利润只有 600 到 800 美元。",
          "更早的评论也提到超过一定词数后要收取高额年费或附加费用，所以真正要比较的是流量放大后的成本曲线，而不是入门价。",
        ],
      },
      {
        question: "GTranslate 的翻译质量怎么样？",
        answer:
          "结论：不适合直接把高价值页面交给它“自动一键完成”。评论里对误译、漏译、结账页翻译失效和需要大量手工纠正的反馈非常集中。",
        evidence: [
          "elixirclothes.com（2024-03）提到尺码被翻错、结账页没翻；2020-03 的评论甚至直接说 Google Translate 都做得更好。",
          "另外 2022-06、2024-07 等评论都提到随机漏翻、第三方内容翻不了或翻译结果不稳定，这会直接抬高维护成本。",
        ],
      },
      {
        question: "为什么有用户在黑五期间全站崩溃？",
        answer:
          "结论：这类评论说明 GTranslate 的问题不是只停留在后台难用，而是可能在高峰期直接影响前台展示、结账和销售。",
        evidence: [
          "2023-11 的评论直接写到黑五期间网站出现“translations missing”并影响整个前台；2022-03 和 2022-04 的评论则提到数字显示错误、checkout 页语言异常。",
          "对大促期商家来说，这类风险的代价远高于“第一次翻译快不快”。",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-t-lab",
    title: "Ciwi vs T Lab",
    alternativeName: "T Lab",
    description: "适合比较全局搜索能力、翻译工作流、语言扩展和安装复杂度时使用。",
    summary:
      "如果你希望多语言运营不是一次性翻完就结束，而是后续还能持续查找、修改和维护，Ciwi 会提供更清晰的长期工作流。",
    appComparison:
      "从你给的套餐信息看，T Lab 的产品定位更偏向后台翻译工具：套餐核心围绕产品数、集合数、文章数、AI 语言数、导入导出、多币种和 AI 引擎管理展开。Ciwi 的公开套餐表达则不一样。即使是 Free 计划，也直接写了 148 种语言（支持 RTL）、自定义 API（Google Translate、ChatGPT 4）、可编辑翻译和图片翻译；Basic 再往上增加 glossary、自定义 AI prompts、按 IP 切换语言/货币；Pro 加上自动翻译和本地化商品图片与 alt text；Premium 再加 1v1 支持和人工翻译审核。换句话说，T Lab 更像“按资源量卖翻译容量”，Ciwi 更像“按本地化工作流深度卖能力”。",
    pricingComparison:
      "按你提供的两组套餐信息，T Lab 和 Ciwi 其实都是公开 4 档。T Lab 是 Free、Pro $11.99/月、Business $29.99/月、Premium $59.99/月，核心按产品数、集合数、文章数和 AI 语言数往上走，大致从 Free 的 500 个产品，提升到 Pro 的 3000、Business 的 7000，再到 Premium 强调更高的 AI 语言和引擎管理。Ciwi 则是 Free、Basic $7.99/月、Pro $19.99/月、Premium $39.99/月，年付都可省 20%。它的分层更像 credits 和 workflow 分层：Basic 给到每月 1,500,000 credits，加 glossary 和 custom AI prompts；Pro 提升到 3,000,000 credits，并加入 auto translation、localized product images and alt text；Premium 提升到 8,000,000 credits，再加 1v1 support 和人工翻译审核。简单说，T Lab 的价格表达更像“资源容量表”，Ciwi 的价格表达更像“能力和服务深度表”，而且从公开月费看，Ciwi 的付费档位整体低于 T Lab。",
    pricingTable: {
      rowLabels: ["免费档", "第二档", "第三档", "第四档"],
      ciwiPlans: ciwiPricingPlansZh,
      alternativePlans: [
        {name: "Free", price: "Free", note: "500 个产品；20 个集合"},
        {name: "Pro", price: "$11.99/月", note: "3000 个产品；500 个集合"},
        {name: "Business", price: "$29.99/月", note: "7000 个产品；2000 个集合"},
        {name: "Premium", price: "$59.99/月", note: "20 种 AI 语言；引擎管理"},
      ],
    },
    bestFor: [
      "初次翻译后仍会持续做大量小修改的团队",
      "重视翻译内容可搜索、可回查、可快速更新的商家",
      "正在比较安装简单度和长期可维护性的品牌",
    ],
    summaryMetrics: [
      {label: "价格", ciwi: 8, alternative: 7},
      {label: "翻译速度", ciwi: 8, alternative: 7},
      {label: "翻译质量", ciwi: 9, alternative: 7},
      {label: "数据覆盖度", ciwi: 9, alternative: 7},
    ],
    scoreMatrix: [
      {label: "全局搜索能力", ciwi: 9, alternative: 5},
      {label: "翻译工作流清晰度", ciwi: 9, alternative: 6},
      {label: "结构化同步", ciwi: 9, alternative: 6},
      {label: "SEO 适配翻译", ciwi: 9, alternative: 6},
      {label: "安装简洁度", ciwi: 8, alternative: 6},
      {label: "长期维护性", ciwi: 9, alternative: 6},
    ],
    faq: [
      {
        question: "T Lab 和 ciwi 的翻译引擎有什么区别？",
        answer:
          "结论：对商家来说，真正的差异不在模型名字，而在于翻译结果能不能稳定落地、被搜索到、被持续维护，而不是翻完之后越来越难管。",
        evidence: [
          "T Lab 的低星评论已经不止一次把问题指向错误标题、错误 URL、照片和标题对不上，说明问题不只是“翻得顺不顺”，而是结果会不会干扰前台理解。",
          "例如 2026-05 的德语评论提到标题、图片、URL 都会反复出错，客户因此被搞糊涂；2024-01 也有评论提到同一模块里 5 个相同元素只翻了 4 个。",
        ],
      },
      {
        question: "T Lab 支持全局搜索翻译内容吗？",
        answer:
          "结论：至少从公开评论看，全局搜索并不是 T Lab 的强项，这会直接影响你后续找词、批量修正和长期维护的效率。",
        evidence: [
          "2025-05 的评论直接把 lack of a comprehensive/global search 当成核心问题；2021-12 也有评论明确说 metafields 没有搜索、没有 global search/replace。",
          "这意味着 T Lab 不是“第一次翻译完就好”，而是越往后越容易在大量小修改里消耗团队时间。",
        ],
      },
      {
        question: "T Lab 和 ciwi 分别支持多少种语言？",
        answer:
          "结论：语言数量当然要看，但更值得比较的是这些语言一旦加上去之后，内容查找、SEO、结构化更新和长期维护会不会变得失控。",
        evidence: [
          "T Lab 的评论里，真正的抱怨并不主要围绕语言数量，而是围绕设置复杂、找不到内容、URL 和 SEO 处理不够好。",
          "例如 Intertaping B.V.（2022-01）提到它并不是“real SEO grade translation”；stepblock（2026-04）则直接说设置方式太复杂。",
        ],
      },
      {
        question: "ciwi 的安装流程比 T Lab 简单吗？",
        answer:
          "结论：如果你重视的是“装上之后能否快速进入稳定工作流”，Ciwi 的路径会更稳；T Lab 的公开反馈里，设置复杂和长期操作不直观是反复出现的问题。",
        evidence: [
          "stepblock（2026-04）明确评价“设置方式太复杂”；2025-01 和 2025-06 的评论则认为 app 不够 user friendly、找翻译内容太麻烦。",
          "这说明真正拖慢团队的，往往不是安装那 10 分钟，而是后面每一次找词、修词和追踪问题。",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-locales-ai",
    title: "Ciwi vs Locales.ai",
    alternativeName: "Locales.ai",
    description: "适合比较计费可预期性、credits 控制、客服响应和长期成本时使用。",
    summary:
      "如果你不希望多语言成本被 credits 机制不断放大，或者担心使用过程中出现额度异常和账单不可控，Ciwi 会是更稳的预算型路径。",
    appComparison:
      "从你给的官方描述看，Locales.ai 的产品定位很明确，偏向“以 GPT-5.1 为核心的 Shopify 自动本地化工具”。它强调质量和速度，主打从 source locale 自动翻译 products、collections、pages、blogs、menus、notifications，同时覆盖 theme Liquid templates、JSON metafields、URLs、inline translations 和 dynamic content；并且明确支持 Judge.me、Loox、PageFly、GemPages、Vitals、Stoq Preorder、UpCart、Insureful、Powerful Form Builder、Appstle Subscriptions 这些第三方应用内容。它还强调 glossary、tone control、bulk actions、内置语言/货币切换器，以及 100+ 货币支持。Ciwi 的公开定位则没那么强调单一模型标签，而是更强调 Shopify 结构化本地化工作流，包括 products、themes、navigation、FAQ、images 和 metafields，以及 glossary、custom prompts、图片本地化和持续同步。换句话说，Locales.ai 更像“GPT 驱动、覆盖应用内容很广的自动化翻译层”，Ciwi 更像“翻译治理和结构化本地化工作流更强的工具”。",
    pricingComparison:
      "按你给的套餐图，Locales.ai 当前公开是 4 档：Free、Basic $9.99/月、Pro $29.99/月、Premium $89.99/月，支持年付优惠，也支持按需额外购买 credits。它的价格逻辑非常明显是按 credits 和最大语言数往上走：Free 给 2,500 credits、最多 1 种语言、AI Context、Template & URL translation；Basic 提升到每月 10,000 credits、最多 5 种语言，并加入 auto-translate、manual edit、language switcher 和 currency converter，额外 credits 价格是 $1.20/1,000 credits；Pro 提升到每月 33,000 credits、最多 20 种语言，并加入 glossary、基于 GPT-5.1 的第三方应用翻译，额外 credits 是 $1.10/1,000 credits；Premium 再到每月 110,000 credits、最多 40 种语言，并加入 App Market support、1v1 support，额外 credits 是 $1.00/1,000 credits。Ciwi 也是 4 档，但首个付费档更低，整体价值表达也更偏工作流：Free、Basic $7.99/月、Pro $19.99/月、Premium $39.99/月，年付可省 20%。Ciwi 的付费结构从每月 1,500,000 credits 加 glossary 和 custom AI prompts，提升到 3,000,000 credits 加 auto translation、localized product images and alt text，再到 8,000,000 credits 加 1v1 support 和人工翻译审核。简单说，Locales.ai 更直白地按 GPT 驱动自动化、应用内容覆盖和按需买 credits 卖能力，Ciwi 更清楚地按更低付费门槛、工作流深度和支持式扩展卖能力。",
    pricingTable: {
      rowLabels: ["免费档", "第二档", "第三档", "第四档"],
      ciwiPlans: ciwiPricingPlansZh,
      alternativePlans: [
        {name: "Free", price: "Free", note: "2,500 credits；1 种语言"},
        {name: "Basic", price: "$9.99/月", note: "10,000 credits；5 种语言"},
        {name: "Pro", price: "$29.99/月", note: "33,000 credits；20 种语言"},
        {name: "Premium", price: "$89.99/月", note: "110,000 credits；40 种语言"},
      ],
    },
    bestFor: [
      "希望预算模型比“订阅费加 credits”更清晰的团队",
      "对隐藏成本、额度突增和信用消耗缺少上限敏感的品牌",
      "把客服响应视为产品可靠性一部分的 Shopify 商家",
    ],
    summaryMetrics: [
      {label: "价格", ciwi: 8, alternative: 4},
      {label: "翻译速度", ciwi: 8, alternative: 7},
      {label: "翻译质量", ciwi: 9, alternative: 6},
      {label: "数据覆盖度", ciwi: 9, alternative: 6},
    ],
    scoreMatrix: [
      {label: "计费透明度", ciwi: 9, alternative: 3},
      {label: "Credits 控制力", ciwi: 9, alternative: 3},
      {label: "预算可预期性", ciwi: 9, alternative: 4},
      {label: "客服可靠性", ciwi: 8, alternative: 4},
      {label: "流程连续性", ciwi: 9, alternative: 5},
      {label: "长期治理", ciwi: 9, alternative: 5},
    ],
    faq: [
      {
        question: "ciwi 和 Locales.ai 的计费方式有什么区别？",
        answer:
          "结论：Locales.ai 的核心争议不只是价格高，而是“订阅费 + credits”这套模式让很多商家在业务还没放大前，就看不清真实成本边界。",
        evidence: [
          "2026-01 和 2026-03 的评论都直接指向 abusive billing、订阅后仍要继续买 credits、而且翻到 5 种语言的真实成本远高于预期。",
          "例如 2026-01 的评论按 50 个产品测算，5 语言全站翻译要到 2500 万 credits，约 1020 美元，这和很多商家对“基础版 9.99 美元/月”的预期明显不一致。",
        ],
      },
      {
        question: "Locales.ai 的 credits 制度怎么运作？",
        answer:
          "结论：从公开差评看，Locales.ai 的 credits 机制最大的问题是缺少硬上限和异常消耗控制，而不是单纯“买不买得起”。",
        evidence: [
          "2026-02 有评论提到账号突然变成 -207,844 credits，且官方后来承认缺少 proper credit cap；另有商家提到 -2,800,000 credits 后依旧无人响应。",
          "True Organic Cosmetics（2025-11）则提到花完 credits 做完整站翻译后，第二天自动翻译失效，又被要求继续购买 credits。",
        ],
      },
      {
        question: "ciwi 有隐藏消费吗？",
        answer:
          "结论：这个问题的本质不是问“会不会贵”，而是问收费边界是否清楚、异常消耗是否有硬限制，以及商家能不能提前预估预算。",
        evidence: [
          "Locales.ai 的负评正好提供了反面样本：很多商家真正不满的不是总价，而是额度在没有足够提醒或上限的情况下继续消耗。",
          "当团队对预算控制更敏感时，收费模型越简单、边界越清晰，越适合长期运营。",
        ],
      },
      {
        question: "ciwi 的客服团队怎么联系？",
        answer:
          "结论：联系入口本身不是重点，重点是当 credits、账单或翻译任务出问题时，支持团队能不能及时接住并推动到解决。",
        evidence: [
          "Locales.ai 的差评里，客服问题并不是“语气不好”，而是 multiple tickets and emails 之后仍然无人处理，这会放大账单和翻译异常的损失。",
          "例如 Avgerinos Pharmacy（2026-02）和 Aelia rituel（2026-02）都直接提到几乎没有 customer service。",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-ea-auto-language-translate",
    title: "Ciwi vs EA Auto Language Translate",
    alternativeName: "EA Auto Language Translate",
    description: "适合比较语言数量、操作复杂度，以及轻量翻译工具和完整本地化工作流之间的差异。",
    summary:
      "如果你比较的是“先用一个轻量工具顶上”还是“直接进入更完整的本地化路径”，Ciwi 会更适合重视结构、治理和长期扩展的场景。",
    bestFor: [
      "在轻量入门工具和完整工作流之间做选择的商家",
      "需要更广本地化能力而不只是自动翻译的团队",
      "希望随着多语言业务扩展依然保持可管理性的品牌",
    ],
    summaryMetrics: [
      {label: "价格", ciwi: 8, alternative: 7},
      {label: "翻译速度", ciwi: 8, alternative: 7},
      {label: "翻译质量", ciwi: 9, alternative: 7},
      {label: "数据覆盖度", ciwi: 9, alternative: 5},
    ],
    scoreMatrix: [
      {label: "语言覆盖", ciwi: 9, alternative: 6},
      {label: "操作清晰度", ciwi: 8, alternative: 7},
      {label: "结构化内容适配", ciwi: 9, alternative: 5},
      {label: "术语控制", ciwi: 9, alternative: 4},
      {label: "工作流深度", ciwi: 9, alternative: 5},
      {label: "长期治理", ciwi: 9, alternative: 4},
    ],
    faq: [
      {
        question: "EA Auto Translate 和 ciwi 分别支持多少种语言？",
        answer:
          "结论：语言数量只是起点，更关键的是语言加进来后，商家是否仍能清楚知道每个语言对应的国家、用途和后续维护成本。",
        evidence: [
          "EA Auto 的公开低星样本很少，这本身说明它的争议度不像前几家那么高；但仅有的评论也指向“语言对应国家信息不清”这类基础可用性问题。",
          "Family Gadget Store（2026-05）的反馈就是希望语言能清楚显示对应国家，说明它更像轻量工具，而不是完整治理型方案。",
        ],
      },
      {
        question: "EA Auto Translate 的操作难度怎么样？",
        answer:
          "结论：从公开反馈看，它不像高差评工具那样问题密集，但也还没有足够多证据证明它能支撑复杂、多市场、多层内容的长期运营。",
        evidence: [
          "现有公开低星样本只有少量 2-3 星评论，更多像是功能信息不够清楚，而不是大规模站点事故。",
          "这意味着它更适合被视为轻量入口工具，而不是直接对标完整本地化工作流。",
        ],
      },
      {
        question: "ciwi 比 EA Auto Translate 多了哪些功能？",
        answer:
          "结论：Ciwi 的差异不在多一个小功能，而在它把结构化内容治理、术语控制、同步和后续运营放在一条工作流里，而 EA Auto 更偏轻量自动翻译。",
        evidence: [
          "EA Auto 当前公开争议较少，说明它更像“轻工具”；但这也意味着围绕 glossary、结构化内容、资源承接和长期治理的公开能力信号更少。",
          "如果你的目标不是先翻出来，而是长期运营可控，那么比较重点就不该只放在语言数量和安装速度上。",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-orbe-geolocation",
    title: "Ciwi vs Orbe Geolocation",
    alternativeName: "Orbe Geolocation",
    description: "适合比较翻译本地化工作流和地理位置识别/市场重定向工具时使用。",
    summary:
      "Ciwi 和 Orbe 解决的问题并不相同。Ciwi 更偏向多语言翻译与本地化治理，而 Orbe 更偏向地理位置识别、市场路由和国家级前台跳转。",
    bestFor: [
      "正在判断自己真正缺的是翻译能力还是市场重定向能力的商家",
      "已经有翻译内容，但需要国家识别和市场路由增强的品牌",
      "在设计多语言和 geolocation 工具协同关系的团队",
    ],
    summaryMetrics: [
      {label: "价格", ciwi: 8, alternative: 8},
      {label: "翻译速度", ciwi: 9, alternative: 1},
      {label: "翻译质量", ciwi: 9, alternative: 1},
      {label: "数据覆盖度", ciwi: 9, alternative: 4},
    ],
    scoreMatrix: [
      {label: "翻译工作流", ciwi: 10, alternative: 1},
      {label: "市场重定向", ciwi: 4, alternative: 9},
      {label: "地理识别能力", ciwi: 4, alternative: 9},
      {label: "术语控制", ciwi: 9, alternative: 1},
      {label: "Shopify 本地化适配", ciwi: 9, alternative: 6},
      {label: "功能重叠度", ciwi: 3, alternative: 3},
    ],
    faq: [],
  },
  {
    slug: "ciwi-vs-ez-product-image-translate",
    title: "Ciwi vs EZ Product Image Translate",
    alternativeName: "EZ Product Image Translate",
    description: "适合比较完整翻译工作流和图片翻译工具之间的功能边界。",
    summary:
      "Ciwi 和 EZ Product Image Translate 只有部分重叠。Ciwi 面向更完整的店铺翻译和本地化治理，而 EZ 更接近图片维度的单点工具。",
    bestFor: [
      "正在判断自己需要的是全站翻译还是只需要图片相关支持的商家",
      "关心商品图片语言表达，同时也在做更广多语言本地化的品牌",
      "希望比较图片 alt 覆盖和全站翻译能力差异的团队",
    ],
    summaryMetrics: [
      {label: "价格", ciwi: 8, alternative: 8},
      {label: "翻译速度", ciwi: 8, alternative: 7},
      {label: "翻译质量", ciwi: 9, alternative: 6},
      {label: "数据覆盖度", ciwi: 10, alternative: 3},
    ],
    scoreMatrix: [
      {label: "全站翻译能力", ciwi: 10, alternative: 2},
      {label: "图片工作流聚焦", ciwi: 7, alternative: 9},
      {label: "图片 alt 覆盖", ciwi: 9, alternative: 6},
      {label: "术语控制", ciwi: 9, alternative: 2},
      {label: "Shopify 内容适配", ciwi: 9, alternative: 4},
      {label: "长期治理", ciwi: 9, alternative: 3},
    ],
    faq: [],
  },
  {
    slug: "ciwi-vs-selecty",
    title: "Ciwi vs Geolocation & Markets Selecty",
    alternativeName: "Geolocation & Markets Selecty",
    description: "适合比较翻译本地化工作流和国家识别/市场切换工具时使用。",
    summary:
      "Ciwi 和 Selecty 更像是位于不同层级的工具。Ciwi 负责多语言内容翻译和治理，而 Selecty 更接近国家识别、市场切换和前台路由。",
    bestFor: [
      "正在判断当前瓶颈在翻译内容还是位置检测的商家",
      "已经有翻译内容，但还需要国家选择器和市场路由的品牌",
      "需要组合本地化内容工具和 geolocation 工具的团队",
    ],
    summaryMetrics: [
      {label: "价格", ciwi: 8, alternative: 7},
      {label: "翻译速度", ciwi: 9, alternative: 1},
      {label: "翻译质量", ciwi: 9, alternative: 1},
      {label: "数据覆盖度", ciwi: 9, alternative: 4},
    ],
    scoreMatrix: [
      {label: "翻译工作流", ciwi: 10, alternative: 1},
      {label: "位置检测", ciwi: 4, alternative: 7},
      {label: "市场路由", ciwi: 4, alternative: 8},
      {label: "前台选择器逻辑", ciwi: 5, alternative: 8},
      {label: "本地化治理", ciwi: 9, alternative: 3},
      {label: "功能重叠度", ciwi: 3, alternative: 3},
    ],
    faq: [
      {
        question: "Selecty 的位置检测准确吗？",
        answer:
          "结论：公开低星样本虽然不多，但已经足以说明 Selecty 的位置识别和货币判断并不是“装上就稳”。如果你的业务很依赖国家识别，仍然要把准确性单独验证。",
        evidence: [
          "可见的 2 条低星样本里，一条直接说免费版 absolutely unbrauchbar，另一条明确写到 failed to detect locations correctly、currency conversion completely inaccurate。",
          "这说明它更适合被当作 geolocation 层工具去验证，而不是默认它能像翻译工具那样“装上即用”。",
        ],
      },
      {
        question: "ciwi 和 Selecty 的功能定位有什么区别？",
        answer:
          "结论：Ciwi 解决的是多语言内容翻译和治理问题，Selecty 解决的是国家识别、市场切换和前台路由问题，它们不是同类替代，而是相邻能力层。",
        evidence: [
          "从公开评论看，Selecty 的争议集中在位置检测和货币转换，而不是翻译质量、术语控制或结构化内容覆盖。",
          "所以这类 Compare 页的价值，不是证明谁“更强”，而是先帮商家分清自己缺的是翻译工作流还是 geolocation 逻辑。",
        ],
      },
    ],
  },
  {
    slug: "ciwi-vs-reversia",
    title: "Ciwi vs Reversia",
    alternativeName: "Reversia",
    description: "适合比较高端 AI 翻译、自动同步、多语言 SEO 深度和高客单价方案时使用。",
    summary:
      "如果你看重多语言 SEO、自动同步和更强的专业 AI 翻译定位，但又要衡量是否值得为此承担明显更高的月费，Ciwi 会是更容易进入的工作流型路径，而 Reversia 更像高价位的专业 AI 翻译平台。",
    appComparison:
      "从你给的官方描述看，Reversia 的产品定位非常明确，偏向“专业级 AI 翻译 + 自动同步 + 多语言 SEO”的 Shopify 方案。它强调把 products、collections、pages、metafields、URLs 等内容翻到 110 种语言，并在内容创建或更新时自动同步翻译；同时突出 multilingual SEO，包括 meta tags、descriptions、URL slugs、structured data 的翻译，以及 metafields、metaobjects 和 unlimited languages、currency management。Ciwi 的公开定位则不是单纯把自己放在“高端翻译引擎”这个点上，而是更强调 Shopify 结构化本地化工作流，包括 products、themes、navigation、FAQ、images 和 metafields，以及 glossary、custom prompts、图片本地化和持续同步。换句话说，Reversia 更像“高价位、强调 SEO 和专业 AI 翻译质量的平台”，Ciwi 更像“更重视结构化工作流深度且更容易入手的本地化工具”。",
    pricingComparison:
      "按你给的套餐图，Reversia 当前公开只有 4 个付费档，没有免费版：Pro $199/月、Advanced $299/月、Business $399/月、Scale $499/月。它的分层逻辑很明显是按 translated words 往上走：Pro 给 500,000 words、Advanced 给 1,000,000 words、Business 给 2,000,000 words、Scale 给 3,000,000 words；并且整个产品线都围绕 professional AI translation、unlimited languages、smart glossary、multilingual SEO、metafields 和 metaobjects translation、第三方应用翻译、dedicated support 来卖。Ciwi 则是明显更低门槛的 4 档：Free、Basic $7.99/月、Pro $19.99/月、Premium $39.99/月，年付可省 20%。Ciwi 的付费结构从每月 1,500,000 credits 加 glossary 和 custom AI prompts，提升到 3,000,000 credits 加 auto translation、localized product images and alt text，再到 8,000,000 credits 加 1v1 support 和人工翻译审核。简单说，Reversia 更像“高价付费起步、强调 SEO 和专业 AI 翻译”的平台，Ciwi 更适合那些希望在不进入企业级月费之前，就先拿到完整结构化工作流的商家。",
    pricingTable: {
      rowLabels: ["第一档", "第二档", "第三档", "第四档"],
      ciwiPlans: ciwiPricingPlansZh,
      alternativePlans: [
        {name: "Pro", price: "$199/月", note: "500,000 translated words"},
        {name: "Advanced", price: "$299/月", note: "1,000,000 translated words"},
        {name: "Business", price: "$399/月", note: "2,000,000 translated words"},
        {name: "Scale", price: "$499/月", note: "3,000,000 translated words"},
      ],
    },
    bestFor: [
      "正在比较高端 AI 翻译方案和低门槛工作流方案的商家",
      "重视多语言 SEO、自动同步和结构化数据翻译的品牌",
      "需要评估更高月费是否真的能带来更高价值的团队",
    ],
    summaryMetrics: [
      {label: "价格", ciwi: 9, alternative: 2},
      {label: "翻译速度", ciwi: 8, alternative: 8},
      {label: "翻译质量", ciwi: 9, alternative: 9},
      {label: "数据覆盖度", ciwi: 9, alternative: 8},
    ],
    scoreMatrix: [
      {label: "入门价格", ciwi: 10, alternative: 2},
      {label: "自动同步", ciwi: 9, alternative: 9},
      {label: "多语言 SEO 深度", ciwi: 9, alternative: 9},
      {label: "Metafield 覆盖", ciwi: 9, alternative: 9},
      {label: "工作流广度", ciwi: 9, alternative: 8},
      {label: "高端翻译定位", ciwi: 8, alternative: 9},
    ],
    faq: [
      {
        question: "Reversia 和 ciwi 分别更适合哪类团队？",
        answer:
          "Reversia 更适合已经接受高月费、并且特别看重专业 AI 翻译定位、多语言 SEO 和自动同步的团队。Ciwi 更适合希望以更低门槛进入，同时又想拿到更完整 Shopify 本地化工作流的商家。",
      },
      {
        question: "Reversia 的定价最值得注意的地方是什么？",
        answer:
          "最值得注意的是它没有免费版，而且起步就是 199 美元/月，再按 translated words 往上走。这和 Ciwi 这种低门槛、多档渐进式方案是完全不同的购买决策。",
      },
      {
        question: "Reversia 更偏翻译质量还是工作流？",
        answer:
          "从公开描述看，它更强调 professional AI translation、自动同步和 multilingual SEO。Ciwi 则更强调 products、themes、FAQ、images、metafields 这类结构化内容在长期运营里的工作流深度。",
      },
    ],
  },
];

const comparesEnWithAdditionalMetrics = withAdditionalScoreMetrics(comparesEn, "en");
const comparesZhWithAdditionalMetrics = withAdditionalScoreMetrics(comparesZh, "zh-cn");

export const compares = comparesEnWithAdditionalMetrics;
export const compareMap = Object.fromEntries(compares.map((item) => [item.slug, item]));

export function getCompares(locale: Locale) {
  return locale === "zh-cn" ? comparesZhWithAdditionalMetrics : comparesEnWithAdditionalMetrics;
}

export function getCompareMap(locale: Locale) {
  return Object.fromEntries(getCompares(locale).map((item) => [item.slug, item]));
}
