import {compareLegacyRootRouteMap} from "@/content/compare-slugs";

export const legacyRouteMap = {
  translator: {
    title: "Translator 页面已迁移",
    destination: "/products/translator",
    description: "新版产品页已经迁移到更清晰的目录化结构下。",
  },
  "gpt-4-1": {
    title: "模型能力已并入 Translator 页面",
    destination: "/products/translator",
    description: "模型和翻译能力不再单独占用根级页面，而是统一并入产品页。",
  },
  "gpt-4o": {
    title: "模型能力已并入 Translator 页面",
    destination: "/products/translator",
    description: "模型和翻译能力不再单独占用根级页面，而是统一并入产品页。",
  },
  "gemini-2-5-pro": {
    title: "模型能力已并入 Translator 页面",
    destination: "/products/translator",
    description: "模型和翻译能力不再单独占用根级页面，而是统一并入产品页。",
  },
  qwen: {
    title: "模型能力已并入 Translator 页面",
    destination: "/products/translator",
    description: "模型和翻译能力不再单独占用根级页面，而是统一并入产品页。",
  },
  deepseek: {
    title: "模型能力已并入 Translator 页面",
    destination: "/products/translator",
    description: "模型和翻译能力不再单独占用根级页面，而是统一并入产品页。",
  },
  hunyuan: {
    title: "模型能力已并入 Translator 页面",
    destination: "/products/translator",
    description: "模型和翻译能力不再单独占用根级页面，而是统一并入产品页。",
  },
  grok: {
    title: "模型能力已并入 Translator 页面",
    destination: "/products/translator",
    description: "模型和翻译能力不再单独占用根级页面，而是统一并入产品页。",
  },
  kimi: {
    title: "模型能力已并入 Translator 页面",
    destination: "/products/translator",
    description: "模型和翻译能力不再单独占用根级页面，而是统一并入产品页。",
  },
  glossary: {
    title: "Glossary 页面已整合",
    destination: "/products/translator",
    description: "Glossary 相关说明已经并入 AI Translator 产品页。",
  },
  "product-description-generation": {
    title: "Product Description Generation 页面已整合",
    destination: "/products/spark-analytics-agent",
    description: "该功能已经并入 Spark 产品页的功能模块。",
  },
  "image-alt-text-generation": {
    title: "Image Alt Text Generation 页面已整合",
    destination: "/products/spark-analytics-agent",
    description: "该功能已经并入 Spark 产品页的功能模块。",
  },
  deepl: {
    title: "DeepL 能力已并入 Translator 页面",
    destination: "/products/translator",
    description: "翻译引擎与模型能力不再单独占用根级页面，而是统一并入产品页。",
  },
  "ciwi-blog": {
    title: "Blog 入口已更新",
    destination: "/blog",
    description: "新版资源入口已改为统一的 Blog 和 Resources 结构。",
  },
  "contact-us": {
    title: "Contact 页面已更新",
    destination: "/contact",
    description: "请使用新版 Contact 页面查看联系信息。",
  },
  "about-us": {
    title: "About 页面已更新",
    destination: "/about",
    description: "请使用新版 About 页面查看品牌说明。",
  },
  ...compareLegacyRootRouteMap,
};

export type LegacyRouteSlug = keyof typeof legacyRouteMap;

/**
 * Root-level slugs that were dropped or renamed before the structured route tree
 * existed. Middleware resolves these in a single hop so Googlebot never walks a
 * "trailing slash normalisation -> page level redirect" chain.
 *
 * Every entry below is a judgement call: the destination is the closest live
 * equivalent, not a perfect match. Review before shipping if intent matters.
 */
export const legacyExtraRootRedirects: Record<string, string> = {
  // Feature pages folded into the product pages.
  "product-title-generation": "/products/spark-analytics-agent/#features",
  "product-image-generation": "/products/spark-analytics-agent/#features",
  "product-seo-information-generation": "/products/spark-analytics-agent/#features",
  "collection-description-generation": "/products/spark-analytics-agent/#features",
  "product-faq-generation": "/products/spark-analytics-agent/#features",
  "store-theme-translation": "/products/translator/#features",
  "product-content-translation": "/products/translator/#features",
  "ip-based-automatic-switching": "/products/translator/#features",
  "currency-exchange-rate-inquiry": "/guides/how-to-localize-currency-pricing-on-shopify",
  // Pages that no longer exist. Redirected to the closest live page instead of
  // returning 404 so the accumulated signals are not thrown away.
  pricing: "/products/spark-analytics-agent",
  "google-translation": "/products/translator",
  "product-image-translation": "/products/translator",
  "shopify-app-translation": "/products/translator",
  "supported-languages-list": "/products/translator",
  // Misspelled compare slugs kept by external links.
  "vs-g-translate": "/compare/gtranslate-alternative",
  "vs-transtor": "/compare/transtore-alternative",
};

/**
 * Help center documents whose slug changed when the MDX library was rebuilt.
 * Anything not listed here falls through to the current slug (unchanged) or a
 * 404 when the document was genuinely retired.
 */
export const legacyHelpCenterSlugRedirects: Record<string, string> = {
  "how-to-complete-the-credit-payment-process": "/help-center/ShopifyApp/where-to-buy-credits",
  "why-do-i-need-to-pay-for-purchasing-credits": "/help-center/ShopifyApp/where-to-buy-credits",
  "how-can-i-check-my-credit": "/help-center/ShopifyApp/how-can-i-check-my-credit-balance",
  "how-to-enable-the-app-from-shopify-theme-customization-to-apply-the-language-currency-exchange-switcher":
    "/help-center/ShopifyApp/how-to-enable-the-language-currency-exchange-switcher",
  "why-cant-some-content-be-translated-by-open-ais-policy-restrictions": "/help-center/ShopifyApp/faqs-about-translation",
  "why-do-i-see-a-pop-up-window-indicating-that-the-translation-failed": "/help-center/ShopifyApp/faqs-about-translation",
  "translation-service-guarantees": "/help-center/ShopifyApp/faqs-about-translation",
  "changelog-ciwi-translator": "/help-center/ShopifyApp/about-ciwi-ai-translator-shopify-app",
};

export const legacyHelpCenterBasePath = "/help-center/ShopifyApp";
