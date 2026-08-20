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
    destination: "/products/content-ai#features",
    description: "该功能已经并入 Content AI 产品页的功能模块。",
  },
  "image-alt-text-generation": {
    title: "Image Alt Text Generation 页面已整合",
    destination: "/products/content-ai#features",
    description: "该功能已经并入 Content AI 产品页的功能模块。",
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
