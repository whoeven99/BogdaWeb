import fs from "node:fs";
import path from "node:path";

const csvPath = path.join(process.cwd(), "..", "doc", "shopify_apps.csv");
const outputPath = path.join(process.cwd(), "src", "content", "best-shopify-apps.generated.json");

const categoryConfigs = {
  bundles: {
    slugBase: "shopify-bundle-apps",
    categoryLabelEn: "Bundles",
    categoryLabelZh: "套餐",
    titleEn: "Best Shopify Bundle Apps",
    titleZh: "Shopify 最佳套餐 App 推荐",
    descriptionEn:
      "A year-based roundup of Shopify bundle apps, focused on AOV lift, bundle flexibility, and how clearly each app supports real promotional workflows.",
    descriptionZh:
      "按年份组织的 Shopify 套餐 App 合集页，重点看提升客单价、套餐灵活度，以及是否真的适合实际促销工作流。",
    summaryEn:
      "If your goal is to grow AOV without making the offer harder to understand, the best Shopify bundle apps are usually the ones that combine flexible bundle logic with clear storefront execution.",
    summaryZh:
      "如果你的目标是在不增加理解成本的前提下提升客单价，那么更值得优先看的 Shopify 套餐 App，通常是那些既支持灵活套餐逻辑，又能把前台展示做清楚的产品。",
    introEn: [
      "For this bundle shortlist, the main question is not whether an app can create a discount. It is whether it can turn bundles, upsells, and offer framing into something shoppers can actually understand and accept.",
      "That is why the ranking below gives more weight to bundle flexibility, promotional clarity, and real storefront execution.",
    ],
    introZh: [
      "对于这份套餐榜单，真正的问题不是能不能做折扣，而是能不能把套餐、加购和优惠表达做成用户看得懂、愿意接受的前台体验。",
      "所以这份排序更看重套餐灵活度、促销表达清晰度和实际 storefront 落地能力。",
    ],
    methodologyEn: [
      {
        title: "Bundle flexibility",
        description: "The shortlist favors apps that can support more than one rigid offer type and can adapt to different promotion setups.",
      },
      {
        title: "Storefront clarity",
        description: "A bundle app should help merchants explain savings, offer logic, and purchase reasons clearly on the storefront.",
      },
      {
        title: "AOV workflow fit",
        description: "The better tools are the ones that fit into everyday merchandising and campaign work rather than acting like one-off widgets.",
      },
    ],
    methodologyZh: [
      {
        title: "套餐灵活度",
        description: "这份 shortlist 更偏向能支持多种优惠组合、而不是只做单一固定玩法的产品。",
      },
      {
        title: "前台表达清晰度",
        description: "好的套餐 app 不只是会算折扣，还要能把节省逻辑和购买理由讲清楚。",
      },
      {
        title: "AOV 工作流适配",
        description: "更好的工具通常能融入日常商品运营和活动节奏，而不是一次性的小组件。",
      },
    ],
    selectionGuideEn: [
      {
        title: "Compare offer types before UI polish",
        description: "Start by checking how many bundle structures the app supports, then judge whether the storefront presentation matches your selling style.",
      },
      {
        title: "Check how the discount is explained",
        description: "The better bundle apps make savings, thresholds, and cart logic obvious instead of hiding them inside a plugin box.",
      },
      {
        title: "Review how it fits your campaign rhythm",
        description: "If you run repeated promotions, seasonal offers, or upsell experiments, bundle maintenance matters as much as the first setup.",
      },
    ],
    selectionGuideZh: [
      {
        title: "先比较优惠结构，再看界面细节",
        description: "先确认它能支持几种套餐玩法，再判断前台展示是否符合你的售卖方式。",
      },
      {
        title: "重点看它怎么解释优惠",
        description: "更好的套餐 app 会把节省金额、门槛和购物车逻辑讲清楚，而不是都藏在插件盒子里。",
      },
      {
        title: "再看它是否适合你的活动节奏",
        description: "如果你经常跑活动、做组合促销或测试 upsell，后续维护的重要性不低于第一次配置。",
      },
    ],
    rightFitGuideEn: [
      {
        title: "Choose higher-flexibility apps for larger catalogs",
        description: "If your store runs many SKUs or multiple offer types, flexibility matters more than a simple basic bundle builder.",
      },
      {
        title: "Choose simpler apps for narrow offers",
        description: "If you only need one or two repeatable bundle formats, a lighter app may be enough and faster to manage.",
      },
      {
        title: "Choose clearer storefront execution when conversion is the bottleneck",
        description: "If shoppers already see the offer but do not take it, front-end clarity often matters more than adding more bundle logic.",
      },
    ],
    rightFitGuideZh: [
      {
        title: "SKU 多、玩法多时优先选更灵活的产品",
        description: "如果你的商品多、优惠结构复杂，灵活度通常比一个基础 bundle builder 更重要。",
      },
      {
        title: "促销结构简单时可以选轻量产品",
        description: "如果你只需要一两种固定套餐玩法，轻量 app 往往已经够用，而且管理更快。",
      },
      {
        title: "转化卡在前台理解时，优先看表达清晰度",
        description: "如果用户已经看到了优惠但不下单，前端表达是否清楚通常比继续堆逻辑更重要。",
      },
    ],
    finalVerdictEn: [
      "If your bundle strategy is still simple, a lightweight bundle app may be enough to move quickly.",
      "If bundles are becoming a bigger AOV lever across campaigns, catalogs, and upsell flows, the better long-term choice is usually the app that keeps both offer logic and storefront communication under control.",
    ],
    finalVerdictZh: [
      "如果你的套餐策略还很简单，轻量型 bundle app 往往已经足够让你快速上线。",
      "如果套餐已经开始影响活动节奏、商品结构和 upsell 流程，那么更值得长期用的，通常是那些同时能管住优惠逻辑和前台表达的产品。",
    ],
    matchTerms: [
      "bundle",
      "bundles",
      "upsell",
      "cross-sell",
      "cross sell",
      "volume discount",
      "quantity break",
      "quantity breaks",
      "bogo",
      "free gift",
      "mix and match",
    ],
    categoryTerms: [
      "product bundles",
      "upsell bundles",
      "cross-sell bundles",
      "custom bundles",
      "volume discounts",
      "cart discounts",
    ],
    bestForFocusEn: "support for bundles, upsells, or clearer offer packaging",
    bestForFocusZh: "套餐、加购和更清楚的优惠表达支持",
    genericBestForEn: "Merchants trying to grow AOV through bundles, upsells, or clearer offer packaging.",
    genericBestForZh: "希望通过套餐、加购或更清楚的优惠包装来提升客单价的商家。",
  },
  translation: {
    slugBase: "shopify-translation-apps",
    categoryLabelEn: "Translation",
    categoryLabelZh: "翻译",
    titleEn: "Best Shopify Translation Apps",
    titleZh: "Shopify 最佳翻译 App 推荐",
    descriptionEn:
      "A year-based roundup of Shopify translation apps, focused on structured localization coverage, workflow depth, and long-term maintenance fit.",
    descriptionZh:
      "按年份组织的 Shopify 翻译 App 合集页，重点看结构化本地化覆盖、工作流深度，以及长期维护是否省心。",
    summaryEn:
      "If your store needs more than quick text translation, the best option is usually the app that handles Shopify structure, repeated updates, and long-term terminology control with the least operational friction.",
    summaryZh:
      "如果你的店铺需要的不只是把文字翻出来，那么更值得优先看的，通常是那些能同时处理 Shopify 结构、后续更新和术语稳定性的产品。",
    introEn: [
      "For this translation shortlist, the real question is not which app can translate text fastest. It is which app can support Shopify localization as an ongoing workflow across products, themes, navigation, FAQs, images, and repeated updates.",
      "That is why the ranking below gives more weight to operational fit after launch, not just first-demo speed.",
    ],
    introZh: [
      "对于这份翻译榜单，真正的问题不是谁翻得最快，而是谁能把 Shopify 本地化变成一个长期可持续的工作流，覆盖产品、主题、导航、FAQ、图片和后续反复更新。",
      "所以这份排序更看重上线之后是否省心，而不是只看第一次演示是否足够快。",
    ],
    methodologyEn: [
      {
        title: "Shopify structure coverage",
        description: "The shortlist prioritizes tools that can go beyond product body text and support the broader Shopify storefront content stack.",
      },
      {
        title: "Operational depth",
        description: "Glossary control, sync behavior, workflow clarity, and reviewability matter more than one-click translation claims alone.",
      },
      {
        title: "Launch-to-maintenance fit",
        description: "A strong app should work both at initial rollout and during later updates, seasonal campaigns, and market expansion.",
      },
    ],
    methodologyZh: [
      {
        title: "Shopify 结构覆盖",
        description: "这份 shortlist 优先看能否覆盖更完整的店铺内容结构，而不只是商品正文。",
      },
      {
        title: "运营工作流深度",
        description: "术语表、同步能力、审核过程和流程清晰度，比“点一下就翻译”更重要。",
      },
      {
        title: "从上线到维护的适配度",
        description: "好的 app 不只适合首发，也要能承接后续更新、活动页和多市场扩张。",
      },
    ],
    selectionGuideEn: [
      {
        title: "Compare them by content coverage first",
        description: "If an app only handles visible page copy well, you may still struggle later with themes, navigation, FAQs, metafields, and image-related localization.",
      },
      {
        title: "Then compare workflow depth",
        description: "Glossary behavior, sync rules, review flow, and update handling matter more than a fast first translation if your catalog changes often.",
      },
      {
        title: "Then compare maintenance cost",
        description: "The best app is usually the one that reduces repeated cleanup and translation drift after launch, not the one that only looks cheapest on day one.",
      },
    ],
    selectionGuideZh: [
      {
        title: "先按内容覆盖来比较",
        description: "如果一个 app 只擅长处理页面可见文案，你后面仍然会卡在 theme、navigation、FAQ、metafields 和图片本地化这些问题上。",
      },
      {
        title: "再按工作流深度比较",
        description: "如果你的目录和活动会持续变化，术语表、同步规则、审核方式和后续更新处理，会比第一次翻译速度更重要。",
      },
      {
        title: "最后按维护成本比较",
        description: "真正更好的 app，通常不是第一天最便宜的那个，而是后面最能减少重复清理和翻译漂移的那个。",
      },
    ],
    rightFitGuideEn: [
      {
        title: "Choose deeper workflow apps for repeated updates",
        description: "If content changes often, glossary stability, sync behavior, and structured localization matter more than quick first translation.",
      },
      {
        title: "Choose simpler tools for lightweight market tests",
        description: "If you are only validating one new market or one language, a lighter setup path may already be enough.",
      },
      {
        title: "Choose bundled localization tools when currency is part of the same decision",
        description: "If the problem includes both translation and currency experience, bundled multilingual storefront tools become more relevant.",
      },
    ],
    rightFitGuideZh: [
      {
        title: "如果后续更新频繁，优先选工作流更深的产品",
        description: "当内容经常变化时，术语稳定、同步方式和结构化本地化的重要性会高于第一次翻译速度。",
      },
      {
        title: "如果只是轻量试水新市场，可以先选更简单的工具",
        description: "如果你只是验证一个新语种或一个新市场，轻量路径通常已经够用。",
      },
      {
        title: "如果翻译和货币要一起决策，优先看组合型本地化工具",
        description: "当选型问题里同时包含翻译和多币种体验时，一体化多语言 storefront 工具会更相关。",
      },
    ],
    finalVerdictEn: [
      "If your store only needs a light first step into multilingual selling, a native or lightweight translation path may be enough for now.",
      "If localization is becoming an ongoing operating layer across structured storefront content, the better long-term choice is usually the app that keeps translation quality and maintenance effort under tighter control.",
    ],
    finalVerdictZh: [
      "如果你现在只是轻量试水多语言，原生或更轻的翻译路径通常已经够用。",
      "如果多语言正在变成结构化 storefront 的长期运营层，那么更值得长期用的，通常是那些能同时控制翻译质量和维护成本的产品。",
    ],
    matchTerms: [
      "translation",
      "translate",
      "translator",
      "multi-language",
      "multilingual",
      "localization",
      "language switcher",
      "glossary",
      "hreflang",
    ],
    categoryTerms: ["translation", "multi-language", "multilingual seo", "geolocation", "currency and translation"],
    bestForFocusEn: "support for long-term Shopify localization workflows",
    bestForFocusZh: "长期 Shopify 本地化工作流支持",
    genericBestForEn: "Merchants that need Shopify localization to stay workable over time, not only on launch day.",
    genericBestForZh: "希望 Shopify 本地化在上线之后依然好维护、而不只是首发能跑通的商家。",
  },
};

const signalCatalog = [
  {
    match: ["ai", "automation", "automated"],
    en: "AI or automation support appears in the public positioning",
    zh: "公开定位里强调了 AI 或自动化能力",
  },
  {
    match: ["seo", "hreflang", "indexing"],
    en: "SEO-related capability is part of the product story",
    zh: "产品故事里包含了 SEO 相关能力",
  },
  {
    match: ["glossary", "terminology"],
    en: "Glossary or terminology control is part of the workflow",
    zh: "工作流里带有术语表或术语控制能力",
  },
  {
    match: ["currency", "multi-currency"],
    en: "Pricing or currency handling is included in the positioning",
    zh: "定位里包含了货币或价格体验相关能力",
  },
  {
    match: ["analytics", "dashboard", "reporting"],
    en: "Analytics or reporting is included in the workflow",
    zh: "工作流里包含了分析或报表能力",
  },
  {
    match: ["theme", "themes", "custom css"],
    en: "Theme-level storefront fit is mentioned directly",
    zh: "公开描述里直接提到了主题层适配",
  },
  {
    match: ["upsell", "cross-sell", "discount", "bundle", "bogo"],
    en: "The app is positioned around offer logic and promotional packaging",
    zh: "这个产品明显围绕优惠逻辑和促销包装来定位",
  },
];

function readArg(name) {
  const prefix = `--${name}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : null;
}

function parseNumber(value) {
  const numeric = Number.parseFloat(String(value ?? "").replace(/,/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

function formatMonthYear(date, locale) {
  return new Intl.DateTimeFormat(locale === "zh-cn" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
  }).format(date);
}

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function normalizeText(value) {
  return String(value ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function containsTerm(text, term) {
  const normalizedTerm = term.toLowerCase().trim();

  if (!normalizedTerm) {
    return false;
  }

  if (/^[a-z0-9- ]+$/.test(normalizedTerm)) {
    const pattern = normalizedTerm.split(" ").map(escapeRegex).join("\\s+");
    return new RegExp(`(^|[^a-z0-9])${pattern}([^a-z0-9]|$)`, "i").test(text);
  }

  return text.includes(normalizedTerm);
}

function buildSearchText(row) {
  return normalizeText(
    [row.name, row.description, row.categories, row.primary_category, row.developer].filter(Boolean).join(" "),
  ).toLowerCase();
}

function buildPrimaryText(row) {
  return normalizeText([row.name, row.description, row.primary_category].filter(Boolean).join(" ")).toLowerCase();
}

function buildCategoryText(row) {
  return normalizeText([row.categories, row.primary_category].filter(Boolean).join(" ")).toLowerCase();
}

function parseCsvValues(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === "\"") {
      if (inQuotes && nextChar === "\"") {
        current += "\"";
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);

  return result;
}

function parseCsvRow(line, headers) {
  const result = parseCsvValues(line);

  return Object.fromEntries(headers.map((header, index) => [header, result[index] ?? ""]));
}

function splitCsvRecords(raw) {
  const records = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < raw.length; index += 1) {
    const char = raw[index];
    const nextChar = raw[index + 1];

    if (char === "\"") {
      if (inQuotes && nextChar === "\"") {
        current += "\"\"";
        index += 1;
      } else {
        inQuotes = !inQuotes;
        current += char;
      }
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (current.trim()) {
        records.push(current);
      }

      current = "";

      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    records.push(current);
  }

  return records;
}

function readCsv(filePath) {
  const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const lines = splitCsvRecords(raw);

  if (lines.length < 2) {
    return [];
  }

  const headers = parseCsvValues(lines[0]).map((item) => normalizeText(item));

  return lines.slice(1).map((line) => parseCsvRow(line, headers));
}

function detectSignals(text, limit = 3) {
  const matched = [];

  for (const signal of signalCatalog) {
    if (signal.match.some((term) => containsTerm(text, term))) {
      matched.push(signal);
    }

    if (matched.length >= limit) {
      break;
    }
  }

  return matched;
}

function buildScore(row, config) {
  const primaryText = buildPrimaryText(row);
  const categoryText = buildCategoryText(row);
  const rating = parseNumber(row.rating);
  const reviewCount = parseNumber(row.review_count);
  const installs = parseNumber(row.total_installs);
  const strictHits = config.matchTerms.reduce((count, term) => count + (containsTerm(primaryText, term) ? 1 : 0), 0);
  const categoryHits = (config.categoryTerms ?? []).reduce(
    (count, term) => count + (containsTerm(primaryText, term) || containsTerm(categoryText, term) ? 1 : 0),
    0,
  );

  return rating * 20 + Math.log10(reviewCount + 1) * 16 + Math.log10(installs + 1) * 14 + strictHits * 8 + categoryHits * 2;
}

function filterCategoryRows(rows, config) {
  return rows.filter((row) => {
    const primaryText = buildPrimaryText(row);
    const categoryText = buildCategoryText(row);
    const hasStrictMatch = config.matchTerms.some((term) => containsTerm(primaryText, term));
    const hasCategoryMatch = (config.categoryTerms ?? []).some(
      (term) => containsTerm(primaryText, term) || containsTerm(categoryText, term),
    );

    return hasStrictMatch || hasCategoryMatch;
  });
}

function buildPricingText(row, locale) {
  const raw = normalizeText(row.pricing);

  if (!raw) {
    return locale === "zh-cn" ? "需要进一步查看公开套餐。" : "Needs a closer review of the public pricing.";
  }

  const parsed = safeJsonParse(raw, null);

  if (Array.isArray(parsed) && parsed.length > 0) {
    const plans = parsed
      .slice(0, 2)
      .map((plan) => `${normalizeText(plan.plan_name)} ${normalizeText(plan.price)}`.trim())
      .filter(Boolean);

    return plans.join(locale === "zh-cn" ? "；" : "; ");
  }

  return raw;
}

function cleanSummary(description) {
  const text = normalizeText(description).replace(/\bmore\b.*$/i, "").trim();
  const [firstSentence] = text.split(/(?<=[.!?])\s+/);
  const summary = (firstSentence || text).slice(0, 220).trim();

  return summary.length >= 24 ? summary : "";
}

function buildBestFor(row, config, locale) {
  const installs = parseNumber(row.total_installs);
  const reviews = parseNumber(row.review_count);

  if (locale === "zh-cn") {
    if (installs > 10000 || reviews > 500) {
      return `适合希望优先选择更成熟公开样本的团队，也适合${config.genericBestForZh}`;
    }

    if (installs > 1000 || reviews > 100) {
      return `适合希望在功能和成熟度之间找平衡，同时又${config.genericBestForZh}`;
    }

    return config.genericBestForZh;
  }

  if (installs > 10000 || reviews > 500) {
    return `Larger or more established merchants that want a stronger public track record and still need ${config.bestForFocusEn}.`;
  }

  if (installs > 1000 || reviews > 100) {
    return `Merchants looking for a balance between feature depth and broader public adoption while still needing ${config.bestForFocusEn}.`;
  }

  return config.genericBestForEn;
}

function buildStrengths(row, config, locale) {
  const text = buildPrimaryText(row);
  const signals = detectSignals(text, 2);
  const installs = parseNumber(row.total_installs);
  const reviews = parseNumber(row.review_count);
  const items = [];

  if (signals.length > 0) {
    items.push(...signals.map((signal) => (locale === "zh-cn" ? signal.zh : signal.en)));
  }

  if (installs > 10000 || reviews > 500) {
    items.push(
      locale === "zh-cn"
        ? "公开安装量或评论量更高，说明它在更大范围内被反复验证过"
        : "The public install or review footprint is stronger, which suggests broader real-world validation",
    );
  } else {
    items.push(
      locale === "zh-cn"
        ? "公开定位比较明确，容易看出它主打的工作流方向"
        : "The public positioning is relatively clear, making its main workflow easier to understand",
    );
  }

  while (items.length < 3) {
    items.push(
      locale === "zh-cn"
        ? "更适合作为同类目 shortlist 里的候选，而不是只看单点功能"
        : "It is easier to evaluate as part of a shortlist, rather than only through one isolated feature",
    );
  }

  return items.slice(0, 3);
}

function buildWatchouts(row, locale) {
  const reviews = parseNumber(row.review_count);
  const pricing = normalizeText(row.pricing);
  const items = [];

  if (reviews < 30) {
    items.push(
      locale === "zh-cn"
        ? "公开评论样本还不算多，最好先结合你自己的主题和工作流做一轮验证"
        : "The public review sample is still limited, so it is worth testing against your own theme and workflow first",
    );
  } else {
    items.push(
      locale === "zh-cn"
        ? "即使公开样本更多，也仍然要确认它和你当前主题、商品结构、运营流程的适配度"
        : "Even with a larger public sample, you still need to confirm theme, catalog, and workflow fit on your own store",
    );
  }

  items.push(
    pricing
      ? locale === "zh-cn"
        ? "正式选型前仍然需要把公开套餐、额外收费边界和后续扩展成本看清楚"
        : "Before deciding, you should still review public pricing tiers, add-on costs, and longer-term expansion cost carefully"
      : locale === "zh-cn"
        ? "公开价格信息不够完整，正式决策前最好进一步核对"
        : "Public pricing details are incomplete, so it is worth validating cost details before making the final decision",
  );

  return items;
}

function buildPick(row, config, locale, rank) {
  const summaryBase = cleanSummary(row.description);

  return {
    rank,
    name: normalizeText(row.name),
    badge:
      locale === "zh-cn"
        ? `适合第 ${rank} 名 shortlist 候选`
        : `A strong shortlist candidate at #${rank}`,
    summary:
      summaryBase ||
      (locale === "zh-cn"
        ? "这是一个适合放进同类 shortlist 里继续比较、并且值得进一步核对工作流适配度的 Shopify app。"
        : "This is a Shopify app worth keeping in the shortlist for further comparison and workflow-fit review."),
    bestFor: buildBestFor(row, config, locale),
    pricing: buildPricingText(row, locale),
    strengths: buildStrengths(row, config, locale),
    watchouts: buildWatchouts(row, locale),
    href: normalizeText(row.url),
  };
}

function createCollection(config, rows, category, year, locale) {
  const now = new Date();
  const updatedLabel =
    locale === "zh-cn"
      ? `更新于 ${now.getFullYear()} 年 ${now.getMonth() + 1} 月`
      : `Updated ${formatMonthYear(now, locale)}`;

  return {
    slug: `${config.slugBase}-${year}`,
    href: `/best-shopify-apps/${config.slugBase}-${year}`,
    categorySlug: category,
    categoryLabel: locale === "zh-cn" ? config.categoryLabelZh : config.categoryLabelEn,
    year,
    updatedLabel,
    title: `${locale === "zh-cn" ? year + " 年 " + config.titleZh : `${config.titleEn} (${year})`}`,
    description: locale === "zh-cn" ? config.descriptionZh : config.descriptionEn,
    heroEyebrow: "Best Shopify Apps",
    summary: locale === "zh-cn" ? config.summaryZh : config.summaryEn,
    intro: locale === "zh-cn" ? config.introZh : config.introEn,
    methodology: locale === "zh-cn" ? config.methodologyZh : config.methodologyEn,
    picks: rows.map((row, index) => buildPick(row, config, locale, index + 1)),
    selectionGuide: locale === "zh-cn" ? config.selectionGuideZh : config.selectionGuideEn,
    rightFitGuide: locale === "zh-cn" ? config.rightFitGuideZh : config.rightFitGuideEn,
    finalVerdict: {
      title: locale === "zh-cn" ? "文末总结" : "Final verdict",
      paragraphs: locale === "zh-cn" ? config.finalVerdictZh : config.finalVerdictEn,
      primaryLabel: locale === "zh-cn" ? "打开 Shopify App Store" : "Open Shopify App Store",
      primaryHref: rows[0] ? normalizeText(rows[0].url) : "https://apps.shopify.com",
      secondaryLabel: locale === "zh-cn" ? "返回 Best Shopify Apps" : "Back to Best Shopify Apps",
      secondaryHref: "/best-shopify-apps",
    },
    keywords:
      locale === "zh-cn"
        ? [`shopify ${config.categoryLabelZh} app`, `shopify ${config.categoryLabelZh} 插件推荐`, `best shopify apps ${year}`]
        : [`best shopify ${config.categoryLabelEn.toLowerCase()} apps`, `shopify ${config.categoryEn ?? config.categoryLabelEn.toLowerCase()} app`, `best shopify apps ${year}`],
  };
}

function readGeneratedFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {en: [], "zh-cn": []};
  }

  return safeJsonParse(fs.readFileSync(filePath, "utf8"), {en: [], "zh-cn": []});
}

function writeGeneratedFile(filePath, content) {
  fs.writeFileSync(filePath, `${JSON.stringify(content, null, 2)}\n`);
}

function upsertCollection(items, collection) {
  const nextItems = items.filter((item) => item.slug !== collection.slug);
  nextItems.push(collection);

  return nextItems.sort((left, right) => left.slug.localeCompare(right.slug));
}

const category = readArg("category");
const year = Number.parseInt(readArg("year") ?? "", 10);
const limit = Number.parseInt(readArg("limit") ?? "6", 10);

if (!category || !categoryConfigs[category]) {
  console.error(`Usage: npm run best-apps:generate -- --category=${Object.keys(categoryConfigs).join("|")} --year=2026 [--limit=6]`);
  process.exit(1);
}

if (!Number.isInteger(year) || year < 2024) {
  console.error("Please provide a valid --year, for example --year=2026");
  process.exit(1);
}

const config = categoryConfigs[category];
const rows = readCsv(csvPath);
const matchedRows = filterCategoryRows(rows, config)
  .map((row) => ({row, score: buildScore(row, config)}))
  .sort((left, right) => right.score - left.score)
  .slice(0, limit)
  .map((item) => item.row);

if (matchedRows.length === 0) {
  console.error(`No rows matched category "${category}" in ${csvPath}`);
  process.exit(1);
}

const generatedFile = readGeneratedFile(outputPath);
generatedFile.en = upsertCollection(generatedFile.en ?? [], createCollection(config, matchedRows, category, year, "en"));
generatedFile["zh-cn"] = upsertCollection(generatedFile["zh-cn"] ?? [], createCollection(config, matchedRows, category, year, "zh-cn"));

writeGeneratedFile(outputPath, generatedFile);

console.log(`Generated Best Shopify Apps collection for ${category} ${year}`);
console.log(`Output: ${outputPath}`);
console.log(`Top picks: ${matchedRows.map((row) => normalizeText(row.name)).join(", ")}`);
