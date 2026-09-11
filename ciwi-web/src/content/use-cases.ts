import type {Locale} from "@/lib/i18n";

export type UseCaseItem = {
  slug: string;
  productSlug: string;
  category: string;
  title: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  keywordPlayground?: {
    title: string;
    description: string;
    variables: {
      key: string;
      label: string;
      defaultValue: string;
      placeholder?: string;
    }[];
    templates: {
      label: string;
      template: string;
    }[];
    note?: string;
  };
  previewModule?: {
    title: string;
    description: string;
    type: "video" | "placeholder";
    videoUrl?: string;
    caption?: string;
    highlights?: string[];
    note?: string;
  };
  audience: string[];
  signals: string[];
  workflow: {title: string; description: string}[];
  deliverables: {title: string; description: string}[];
  outcomes: string[];
  faq: {question: string; answer: string}[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
};

const useCasesEn: UseCaseItem[] = [
  {
    slug: "spark-cross-platform-ad-reporting",
    productSlug: "spark-analytics-agent",
    category: "Reporting",
    title: "Run the Monday media review without merging three ad exports by hand",
    description: "Bring Google, Meta, and TikTok performance into one view before the weekly budget meeting, so the team can compare spend, revenue, and ROAS without rebuilding the same report again.",
    heroTitle: "When the team needs a weekly ad readout fast, do not start from three separate exports",
    heroDescription:
      "Use Spark to consolidate spend, revenue, ROAS, CPA, CTR, CPC, and conversions across ad platforms so Monday reporting becomes a decision workflow, not a spreadsheet assembly job.",
    keywordPlayground: {
      title: "Keyword and angle playground",
      description: "Swap in platform mix, reporting window, and export shape to preview how this use case should be framed on the page.",
      variables: [
        {key: "platforms", label: "Platform mix", defaultValue: "Google Meta TikTok", placeholder: "Meta and Google"},
        {key: "window", label: "Reporting window", defaultValue: "daily", placeholder: "weekly"},
        {key: "grain", label: "Breakdown", defaultValue: "campaign ad set ad", placeholder: "campaign level"},
      ],
      templates: [
        {label: "Primary keyword", template: "{{window}} {{platforms}} ad report export"},
        {label: "Landing-page angle", template: "How to export {{window}} {{platforms}} ad data by {{grain}} without rebuilding the report manually"},
      ],
      note: "This is a better fit for Spark than a generic analytics angle because the operational value is the export and cross-platform merge, not just another dashboard view.",
    },
    previewModule: {
      title: "Reporting demo placeholder",
      description: "Reserve a slot for a short walkthrough of multi-platform ad reporting, export filters, and daily or weekly summaries.",
      type: "placeholder",
      highlights: ["Google Meta TikTok merge", "Campaign / ad set / ad export", "Daily and weekly summary"],
      note: "This module can start with screenshots or a storyboard, then later switch to a true Spark reporting video.",
    },
    audience: [
      "Growth teams exporting ad performance every day or every week",
      "Operators who still merge Google, Meta, and TikTok data manually",
      "Founders who want one reliable marketing performance view before asking for a deeper breakdown",
    ],
    signals: [
      "The team keeps rebuilding the same ad report in spreadsheets",
      "Campaign, ad set, and ad-level exports take too many tool switches",
      "Different platforms are being reviewed separately, so daily decisions are slower than they should be",
    ],
    workflow: [
      {
        title: "Connect the ad accounts and Shopify revenue context",
        description: "Bring Google, Meta, TikTok, and store-side performance into Spark so the report starts from one shared source of truth.",
      },
      {
        title: "Break the data down by campaign, ad set, or ad",
        description: "Filter the same reporting view by the operational level the team actually needs before making budget calls.",
      },
      {
        title: "Export a repeatable daily or weekly report",
        description: "Turn the merged view into a reusable export workflow instead of reformatting the same report every cycle.",
      },
    ],
    deliverables: [
      {
        title: "A merged ad reporting view",
        description: "One place to read spend, revenue, ROAS, CPA, CTR, CPC, and conversions across the main ad channels.",
      },
      {
        title: "Breakdown-ready exports",
        description: "Campaign, ad set, and ad-level exports that do not require rebuilding the reporting logic each time.",
      },
      {
        title: "A reporting workflow the team can reuse",
        description: "The same reporting motion can be repeated daily or weekly without losing consistency.",
      },
    ],
    outcomes: [
      "Reduce time spent rebuilding ad reports",
      "Make cross-platform performance easier to compare",
      "Help the team move from reporting to action faster",
    ],
    faq: [
      {
        question: "Is this mainly for reporting or for action?",
        answer: "It starts with reporting, but the value is really that the same unified view becomes the basis for budget moves, pausing decisions, and deeper campaign review.",
      },
      {
        question: "Why not just export from each platform directly?",
        answer: "You still can, but the operational pain usually comes from merging the exports, aligning naming, and comparing platform data to store-side revenue in one place.",
      },
    ],
    ctaLabel: "Talk to us",
    ctaHref: "/waitlist",
    featured: true,
  },
  {
    slug: "spark-budget-reallocation",
    productSlug: "spark-analytics-agent",
    category: "Scaling",
    title: "Reallocate budget during a scaling week before weak ads waste another day",
    description: "When traffic is moving and spend is rising, use Spark to spot low-efficiency ads faster, pause the obvious losers, and move budget toward the campaigns that are still producing acceptable ROAS.",
    heroTitle: "When spend is climbing fast, protect the budget before weak campaigns burn through it",
    heroDescription:
      "Use Spark to surface low-ROAS or no-conversion ads, compare stronger campaigns across platforms, and turn daily budget moves into a repeatable scaling workflow instead of reactive cleanup.",
    keywordPlayground: {
      title: "Keyword and angle playground",
      description: "Preview how the page should read when the operating rule, metric, and platform mix change.",
      variables: [
        {key: "platforms", label: "Platform mix", defaultValue: "Google Meta TikTok", placeholder: "Meta and TikTok"},
        {key: "metric", label: "Decision rule", defaultValue: "ROAS below 1", placeholder: "3 days without conversion"},
        {key: "move", label: "Budget action", defaultValue: "shift budget to winners", placeholder: "pause weak ads"},
      ],
      templates: [
        {label: "Primary keyword", template: "{{platforms}} ad budget reallocation for {{metric}}"},
        {label: "Landing-page angle", template: "How to {{move}} across {{platforms}} when campaigns hit {{metric}}"},
      ],
      note: "This is where Spark can speak the language of actual operators: pause, enable, raise, lower, and reallocate budget based on rules merchants already use.",
    },
    previewModule: {
      title: "Budget ops demo placeholder",
      description: "Reserve a module for showing rule-based budget changes, low-efficiency ad detection, and pause / enable recommendations.",
      type: "placeholder",
      highlights: ["Pause low performers", "Raise winner budgets", "Budget reallocation logic"],
      note: "A short video or annotated screenshot flow would work well here because the value is the operating rule, not just the chart.",
    },
    audience: [
      "Teams managing budgets across Google, Meta, and TikTok at the same time",
      "Operators who need a repeatable way to pause weak campaigns and back winners",
      "Merchants who already use budget rules, but still apply them manually across platforms",
    ],
    signals: [
      "Too much spend is staying on clearly weak campaigns",
      "Budget increases are being decided manually and too slowly",
      "The same pause / enable / reallocation logic is being repeated in multiple ad platforms",
    ],
    workflow: [
      {
        title: "Pull campaign performance into one operating view",
        description: "Review ROAS, spend, conversions, and related signals across platforms before making a budget move.",
      },
      {
        title: "Identify the losers and the winners",
        description: "Use clear rules such as low ROAS, no conversions, or high-performing ads that deserve more budget.",
      },
      {
        title: "Turn the review into a repeatable budget action",
        description: "Move from one-off cleanup to a consistent operating pattern for pausing, enabling, and reallocating budget.",
      },
    ],
    deliverables: [
      {
        title: "A budget action queue",
        description: "A clearer list of which campaigns or ads should be paused, enabled, reduced, or scaled.",
      },
      {
        title: "Performance-backed budget logic",
        description: "Budget moves are tied to actual rules and outcomes instead of scattered judgment calls.",
      },
      {
        title: "A reusable operating workflow",
        description: "The team can use the same process every day instead of improvising each round of ad changes.",
      },
    ],
    outcomes: [
      "Reduce wasted ad spend on weak performers",
      "Scale stronger campaigns faster",
      "Make budget operations more consistent across platforms",
    ],
    faq: [
      {
        question: "Does this mean Spark directly edits all ad platforms today?",
        answer: "The page can still start from review, recommendation, and export logic first. Direct action can be added later, but the use case already reflects the real operating job the team wants done.",
      },
      {
        question: "Why not just rely on built-in automation rules?",
        answer: "Platform-native rules help, but merchants still need a shared view across channels, store revenue context, and a clearer understanding of where to shift money next.",
      },
    ],
    ctaLabel: "Talk to us",
    ctaHref: "/waitlist",
    featured: true,
  },
  {
    slug: "spark-catalog-feed-monitoring",
    productSlug: "spark-analytics-agent",
    category: "Catalog",
    title: "Recover paid growth when winning products get blocked by catalog or feed issues",
    description: "When ads suddenly stop spending or products are rejected, use Spark to see whether missing fields, price mismatches, or broken catalog sync are blocking the products that should be scaling.",
    heroTitle: "When good products stop moving through paid channels, check the catalog before touching the campaign",
    heroDescription:
      "Use Spark to monitor catalog sync status, rejected items, missing fields, and product-to-ad performance so the team can fix the feed issue that is suppressing revenue, not just guess at the campaign level.",
    keywordPlayground: {
      title: "Keyword and angle playground",
      description: "Adjust the catalog surface, error type, and action to see how the landing-page angle changes.",
      variables: [
        {key: "platform", label: "Catalog platform", defaultValue: "Meta and Google", placeholder: "Google Merchant Center"},
        {key: "issue", label: "Issue type", defaultValue: "catalog errors", placeholder: "price mismatch"},
        {key: "action", label: "Action", defaultValue: "fix rejected products", placeholder: "repair feed fields"},
      ],
      templates: [
        {label: "Primary keyword", template: "{{platform}} {{issue}} for Shopify catalog"},
        {label: "Landing-page angle", template: "How to {{action}} when {{platform}} catalog errors start blocking Shopify product ads"},
      ],
      note: "This ties directly to merchant pain: catalog sync, rejected products, missing fields, and the link between product data quality and ad performance.",
    },
    previewModule: {
      title: "Catalog monitoring demo placeholder",
      description: "Reserve a block for rejected-item dashboards, field error examples, and product-to-ad performance association.",
      type: "placeholder",
      highlights: ["Catalog sync checks", "Rejected product detection", "Product and ad linkage"],
      note: "A static proof block is enough at first because the value is already clear when merchants see concrete catalog failure patterns.",
    },
    audience: [
      "Teams running Meta, Google, or TikTok catalogs from Shopify product data",
      "Operators responsible for feed health, rejected products, and catalog sync issues",
      "Merchants who need to know which product data issues are hurting paid performance",
    ],
    signals: [
      "Catalog errors are blocking product ads from serving cleanly",
      "Products are being rejected or showing field mismatches across platforms",
      "The team cannot easily see which catalog fixes matter most for revenue",
    ],
    workflow: [
      {
        title: "Sync Shopify product data with ad catalogs",
        description: "Start from the catalog surfaces that feed paid channels, not just the storefront product page alone.",
      },
      {
        title: "Review feed errors and rejected items",
        description: "Identify missing images, field mismatches, pricing issues, rejected products, and other catalog health problems.",
      },
      {
        title: "Prioritize the fixes by business impact",
        description: "Use Spark to connect product issues to ad performance so the team fixes what matters most first.",
      },
    ],
    deliverables: [
      {
        title: "A catalog health view",
        description: "One place to review sync status, rejected items, and field-quality issues.",
      },
      {
        title: "A prioritized fix list",
        description: "The team can see which feed issues are operational noise and which ones are blocking performance.",
      },
      {
        title: "A link between product data and ad outcomes",
        description: "Catalog quality is no longer reviewed in isolation from actual campaign performance.",
      },
    ],
    outcomes: [
      "Catch catalog issues earlier",
      "Reduce revenue leakage from rejected or broken products",
      "Help the team fix feed quality based on business priority",
    ],
    faq: [
      {
        question: "Is this just a feed error list?",
        answer: "No. The stronger use case is that Spark helps connect feed problems to actual product and ad performance, so the team knows what to repair first.",
      },
      {
        question: "Why is this a Spark use case instead of a generic feed app page?",
        answer: "Because the real operator job is not only fixing fields. It is understanding how catalog quality, ad delivery, and product performance connect.",
      },
    ],
    ctaLabel: "Talk to us",
    ctaHref: "/waitlist",
  },
  {
    slug: "spark-tracking-and-anomaly-alerts",
    productSlug: "spark-analytics-agent",
    category: "Attribution",
    title: "Validate tracking before a false performance drop triggers the wrong budget cut",
    description: "When spend spikes, conversions disappear, or platform revenue drifts away from Shopify, use Spark to check whether the problem is real performance or broken tracking before cutting the budget.",
    heroTitle: "Before calling it a performance problem, rule out the data problem first",
    heroDescription:
      "Use Spark to review pixel and conversion tracking status, spot spend anomalies, and compare platform revenue against Shopify so attribution problems get surfaced before the team makes the wrong optimization move.",
    keywordPlayground: {
      title: "Keyword and angle playground",
      description: "Use channel, anomaly type, and tracking layer to test whether the page should lean more toward alerting, debugging, or attribution trust.",
      variables: [
        {key: "platforms", label: "Platform mix", defaultValue: "Meta TikTok Google", placeholder: "Meta and Google"},
        {key: "issue", label: "Issue type", defaultValue: "tracking anomaly", placeholder: "spend anomaly"},
        {key: "layer", label: "Tracking layer", defaultValue: "pixel and conversion events", placeholder: "Shopify revenue comparison"},
      ],
      templates: [
        {label: "Primary keyword", template: "{{platforms}} {{issue}} for {{layer}}"},
        {label: "Landing-page angle", template: "How to catch {{platforms}} {{issue}} before {{layer}} starts breaking ad decisions"},
      ],
      note: "This is especially relevant for Spark because anomaly detection, tracking trust, and cross-source comparison naturally belong in the same operating surface.",
    },
    previewModule: {
      title: "Tracking alert demo placeholder",
      description: "Reserve a module for pixel warnings, conversion gaps, revenue mismatch comparisons, and spend anomaly alerts.",
      type: "placeholder",
      highlights: ["Pixel and conversion health", "Spend anomaly alerts", "Shopify versus platform revenue"],
      note: "This can start with static screenshots or alert examples, then later become a live Spark alert walkthrough.",
    },
    audience: [
      "Teams running paid traffic across multiple ad platforms and tracking layers",
      "Operators who need earlier warning when data quality or attribution starts drifting",
      "Merchants who compare ad platform revenue against Shopify before making budget changes",
    ],
    signals: [
      "Spend suddenly rises without a matching conversion trend",
      "Pixel or conversion events look incomplete, duplicated, or delayed",
      "Platform-reported revenue starts diverging too far from Shopify revenue",
    ],
    workflow: [
      {
        title: "Review tracking and anomaly signals together",
        description: "Bring spend anomalies, conversion health, and attribution differences into one place instead of checking them in separate tools.",
      },
      {
        title: "Identify whether the issue is platform, tracking, or attribution",
        description: "Separate real performance change from broken event flow, missing conversion data, or revenue mismatch noise.",
      },
      {
        title: "Turn the alert into the next repair or decision step",
        description: "Use the signal to decide whether the next move is validation, repair, budget protection, or a deeper platform-side review.",
      },
    ],
    deliverables: [
      {
        title: "A tracking and anomaly view",
        description: "A shared operating surface for spend spikes, conversion issues, and attribution gaps.",
      },
      {
        title: "Clearer issue triage",
        description: "The team can separate data-quality problems from true performance deterioration faster.",
      },
      {
        title: "A better basis for budget decisions",
        description: "Ad decisions are less likely to be made on top of broken or suspicious data.",
      },
    ],
    outcomes: [
      "Catch bad data earlier",
      "Protect budgets from tracking-driven mistakes",
      "Make attribution debates shorter and more evidence-based",
    ],
    faq: [
      {
        question: "Does this replace engineering-level tracking debugging?",
        answer: "No. Spark is the earlier warning and triage layer. Deep technical debugging may still happen elsewhere, but the team gets to the problem faster.",
      },
      {
        question: "Why combine spend alerts and tracking health in one use case?",
        answer: "Because operators often see them together in the real world: spend looks wrong, conversions disappear, and the first job is deciding whether the issue is performance or data trust.",
      },
    ],
    ctaLabel: "Talk to us",
    ctaHref: "/waitlist",
  },
  {
    slug: "translator-new-market-launch",
    productSlug: "translator",
    category: "Market Launch",
    title: "Launch a new market without spending weeks localizing the whole store by hand",
    description: "When an English storefront is preparing for Germany, France, or Japan, use Ciwi to localize products, theme, SEO, metafields, and visual content together instead of shipping a half-translated launch.",
    heroTitle: "Before a new market goes live, get the storefront localized fast enough to match the launch timeline",
    heroDescription:
      "Use Ciwi AI Translator to cover products, theme sections, SEO, metafields, image text, and alt text together so the team can launch a more complete localized storefront in days or even hours instead of weeks.",
    keywordPlayground: {
      title: "Keyword and angle playground",
      description: "Swap in the market, language, and storefront scope to preview how the launch-oriented landing page could be framed.",
      variables: [
        {key: "market", label: "Target market", defaultValue: "Germany", placeholder: "Japan"},
        {key: "language", label: "Language", defaultValue: "German", placeholder: "Japanese"},
        {key: "scope", label: "Scope", defaultValue: "Shopify storefront", placeholder: "Shopify product and theme content"},
      ],
      templates: [
        {label: "Primary keyword", template: "{{language}} {{scope}} launch for {{market}}"},
        {label: "Landing-page angle", template: "How to launch a {{language}} {{scope}} for {{market}} without rebuilding your localization workflow"},
      ],
      note: "This lets the use case page act as a flexible SEO template even before the translator experience is directly embedded into the site.",
    },
    previewModule: {
      title: "Translator demo slot",
      description: "Use the current translator video as a practical proof block now, then later swap in a market-launch-specific walkthrough if needed.",
      type: "video",
      videoUrl: "https://www.youtube.com/embed/rAFB3AuXuH0?si=6v-NjiENBOqvREy-",
      caption: "This can stay as a generic Ciwi Translator demo until a dedicated new-market launch video is recorded.",
      highlights: ["Theme and structured content", "Glossary control", "Launch-ready scope"],
    },
    audience: [
      "Shopify teams entering a new country or language market for the first time",
      "Brands that need a broader translation workflow than simple text exports",
      "Operators trying to reduce the time from store decision to localized launch",
    ],
    signals: [
      "A new market opportunity needs a fast storefront rollout",
      "Manual translation exports are missing theme or structured content",
      "The team wants a faster first release without losing too much quality control",
    ],
    workflow: [
      {
        title: "Identify the content that must launch together",
        description: "Map product copy, theme sections, FAQs, navigation, and structured fields so the storefront launches coherently.",
      },
      {
        title: "Translate with glossary and model control",
        description: "Use Ciwi to translate by market and language while keeping key terminology and brand tone more stable.",
      },
      {
        title: "Review and keep later changes in sync",
        description: "After launch, use the same workflow to manage updates so the localized storefront does not drift immediately.",
      },
    ],
    deliverables: [
      {
        title: "A broader launch-ready translation scope",
        description: "More than product descriptions alone, including key structured storefront surfaces.",
      },
      {
        title: "Better terminology consistency",
        description: "Glossary support keeps important product and brand terms more stable.",
      },
      {
        title: "A workflow for later updates",
        description: "The first release does not have to become a maintenance burden right away.",
      },
    ],
    outcomes: [
      "Launch multilingual storefronts faster",
      "Reduce the chance of missing key content surfaces",
      "Create a more sustainable process for future updates",
    ],
    faq: [
      {
        question: "Is this only for product descriptions?",
        answer: "No. This use case is especially valuable when the launch needs theme content, FAQs, navigation, image text, and structured fields to move together.",
      },
      {
        question: "Why not just use a generic translation tool?",
        answer: "Because the operational challenge is usually broader than text translation alone. Structured Shopify content and ongoing sync are where many generic tools fall short.",
      },
    ],
    ctaLabel: "Install on Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
    featured: true,
  },
  {
    slug: "translator-auto-sync-localization",
    productSlug: "translator",
    category: "Sync",
    title: "Keep multilingual storefronts updated without checking every language version by hand",
    description: "When new SKUs, product edits, and promotion updates keep making other languages go stale, use Ciwi to automatically send new and changed content back into the translation workflow.",
    heroTitle: "Stop letting multilingual storefronts drift every time the primary store changes",
    heroDescription:
      "Use Ciwi AI Translator to keep product, theme, and other storefront content in sync after launch so the team no longer has to re-check every market manually after each update.",
    keywordPlayground: {
      title: "Keyword and angle playground",
      description: "Use store change frequency, content scope, and sync goal to test how the page should frame ongoing localization maintenance.",
      variables: [
        {key: "cadence", label: "Update cadence", defaultValue: "daily catalog changes", placeholder: "weekly promo updates"},
        {key: "scope", label: "Content scope", defaultValue: "products and theme", placeholder: "products and SEO"},
        {key: "goal", label: "Sync goal", defaultValue: "keep all languages current", placeholder: "reduce manual maintenance"},
      ],
      templates: [
        {label: "Primary keyword", template: "{{scope}} translation sync for {{cadence}}"},
        {label: "Landing-page angle", template: "How to {{goal}} when your store has {{cadence}} across {{scope}}"},
      ],
      note: "The point is to show that the real pain is not first translation, but the constant drift that happens after launch.",
    },
    previewModule: {
      title: "Sync workflow module",
      description: "Reserve a block for showing how new or updated content automatically re-enters translation instead of being forgotten after launch.",
      type: "placeholder",
      highlights: ["Auto-detect new content", "Re-translate changed content", "Reduce stale languages"],
      note: "A simple storyboard works here because the operator value is the maintenance workflow, not just a single batch translation run.",
    },
    audience: [
      "Teams that add products or change descriptions frequently after launch",
      "Operators maintaining multiple language markets without a dedicated localization team",
      "Brands that already launched multilingual stores but keep finding outdated secondary languages",
    ],
    signals: [
      "Other languages fall behind every time the primary store changes",
      "Teams keep doing repetitive manual QA across markets",
      "Important promos or product edits appear in one language but not the others",
    ],
    workflow: [
      {
        title: "Detect what changed in the source storefront",
        description: "Track new products, edits, and content updates that should re-enter localization instead of relying on memory or manual lists.",
      },
      {
        title: "Automatically route changes into translation",
        description: "Use Ciwi to send new and edited content back through the localization workflow with the right market settings.",
      },
      {
        title: "Keep every market version current",
        description: "Review updates faster so the localized storefront stays close to the source store instead of aging out over time.",
      },
    ],
    deliverables: [
      {
        title: "A sync-first localization workflow",
        description: "Localization becomes an ongoing system instead of a one-time project followed by manual patchwork.",
      },
      {
        title: "Fewer stale language pages",
        description: "New launches, edits, and promotions are less likely to be missing in secondary markets.",
      },
      {
        title: "Less repetitive manual maintenance",
        description: "Operators spend less time checking every market one by one after each product or campaign update.",
      },
    ],
    outcomes: [
      "Keep multilingual content closer to current",
      "Reduce missed translations and stale pages",
      "Free the team from repetitive post-launch translation maintenance",
    ],
    faq: [
      {
        question: "Is this mainly for products?",
        answer: "No. The value grows when products, theme, SEO, and promotional content all keep changing after launch and need to stay aligned across languages.",
      },
      {
        question: "Why is this a separate use case from market launch?",
        answer: "Because many merchants can launch once, but the bigger operational problem starts later when constant store updates make other languages drift out of sync.",
      },
    ],
    ctaLabel: "Install on Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
    featured: true,
  },
  {
    slug: "translator-brand-voice-control",
    productSlug: "translator",
    category: "Brand Voice",
    title: "Make translation sound like the brand instead of a generic machine draft",
    description: "When the brand already has a clear tone, use custom prompts and glossary rules to keep product names, materials, ingredients, and brand language more consistent across languages.",
    heroTitle: "When translation quality matters to brand perception, control the tone before it spreads across every page",
    heroDescription:
      "Use Ciwi AI Translator with Custom Prompt and Glossary settings so localized pages feel closer to the brand's own writing style instead of a literal machine translation.",
    keywordPlayground: {
      title: "Keyword and angle playground",
      description: "Use brand type, critical term, and tone goal to preview a brand-control framing for the page.",
      variables: [
        {key: "brandType", label: "Brand type", defaultValue: "beauty brand", placeholder: "supplement brand"},
        {key: "termType", label: "Critical term", defaultValue: "ingredient and product names", placeholder: "fabric and material terms"},
        {key: "goal", label: "Tone goal", defaultValue: "sound like the brand", placeholder: "reduce review cost"},
      ],
      templates: [
        {label: "Primary keyword", template: "{{brandType}} translation glossary and prompt control for {{termType}}"},
        {label: "Landing-page angle", template: "How to {{goal}} when localizing {{termType}} for a {{brandType}}"},
      ],
      note: "This use case should lead with brand quality and consistency, not just translation speed.",
    },
    previewModule: {
      title: "Brand voice proof module",
      description: "Reserve space for before-and-after examples that compare generic translation against glossary and prompt-controlled output.",
      type: "placeholder",
      highlights: ["Custom Prompt examples", "Glossary enforcement", "Brand voice comparison"],
      note: "Static examples are enough to prove the value here because merchants can immediately see the quality difference.",
    },
    audience: [
      "Growing brands with a defined tone of voice",
      "Teams selling products with important material, ingredient, or brand terms",
      "Operators who are tired of editing robotic translations page by page",
    ],
    signals: [
      "Translations feel stiff or inconsistent with brand tone",
      "Product names or industry terms keep drifting across languages",
      "The review team spends too much time rewriting AI output manually",
    ],
    workflow: [
      {
        title: "Define the brand rules first",
        description: "Set the core voice, protected terms, and preferred phrasing before scaling translation output.",
      },
      {
        title: "Translate with prompt and glossary control",
        description: "Use Ciwi to guide how content is phrased instead of accepting a raw machine draft everywhere.",
      },
      {
        title: "Reuse the same rules across future content",
        description: "Apply the same language guardrails to later products, pages, and campaigns so quality stays consistent as the catalog grows.",
      },
    ],
    deliverables: [
      {
        title: "A stronger brand-language layer",
        description: "Important product and brand terms stay more stable across pages and markets.",
      },
      {
        title: "Lower editing overhead",
        description: "Teams spend less time fixing the same tone and terminology issues repeatedly.",
      },
      {
        title: "More consistent multilingual copy",
        description: "Different languages feel closer to the same brand instead of drifting with each translation batch.",
      },
    ],
    outcomes: [
      "Reduce terminology drift",
      "Lower manual review cost",
      "Make multilingual copy feel more brand-aligned",
    ],
    faq: [
      {
        question: "Is this just for product names?",
        answer: "No. It also matters for ingredients, materials, campaign phrasing, and other high-value terms that shape brand perception.",
      },
      {
        question: "Why make this a separate use case?",
        answer: "Because many teams do not struggle with speed first. They struggle with the fact that fast translation still sounds unlike the brand.",
      },
    ],
    ctaLabel: "Install on Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
    featured: true,
  },
  {
    slug: "translator-market-specific-localization",
    productSlug: "translator",
    category: "Market Fit",
    title: "Localize for each market instead of using one translation for every country",
    description: "When the same language behaves differently across regions, use Ciwi to apply market-specific prompts, rules, and terminology instead of shipping one generic version everywhere.",
    heroTitle: "If different countries need different wording, treat localization like market fit instead of just language conversion",
    heroDescription:
      "Use Ciwi AI Translator to configure market-level language behavior so Portuguese, Spanish, or English content can reflect different buyer expectations in different countries.",
    keywordPlayground: {
      title: "Keyword and angle playground",
      description: "Test how the page should frame country-specific localization rather than generic language translation.",
      variables: [
        {key: "language", label: "Language family", defaultValue: "Spanish", placeholder: "Portuguese"},
        {key: "markets", label: "Target markets", defaultValue: "Spain and Mexico", placeholder: "Brazil and Portugal"},
        {key: "goal", label: "Localization goal", defaultValue: "fit local buying habits", placeholder: "avoid one-size-fits-all translation"},
      ],
      templates: [
        {label: "Primary keyword", template: "{{language}} localization by market for {{markets}}"},
        {label: "Landing-page angle", template: "How to {{goal}} when one {{language}} translation does not fit {{markets}}"},
      ],
      note: "The value here is real market adaptation, not just translating into the same language code for every country.",
    },
    previewModule: {
      title: "Market variation module",
      description: "Use examples that compare one generic translation against country-specific localization choices.",
      type: "placeholder",
      highlights: ["Market-specific prompts", "Country-level terminology", "Localized phrasing differences"],
      note: "This use case works well with examples because the merchant can immediately see why one language does not fit every market.",
    },
    audience: [
      "Brands entering multiple countries that share a language family",
      "Teams selling into regions with different buying habits and phrasing norms",
      "Operators who already know language coverage alone is not enough",
    ],
    signals: [
      "One translated version feels too generic across multiple countries",
      "Regional customers respond differently to the same wording",
      "The team wants more control over how each market reads without rebuilding the workflow",
    ],
    workflow: [
      {
        title: "Define the market-level differences",
        description: "Identify which countries need their own phrasing, terminology, or brand framing even inside the same language family.",
      },
      {
        title: "Set rules and prompts per market",
        description: "Use Ciwi to adjust how translation behaves for each destination market rather than reusing one generic output.",
      },
      {
        title: "Maintain variations without duplicating the whole process",
        description: "Keep each market aligned over time while still managing translation from one shared workflow.",
      },
    ],
    deliverables: [
      {
        title: "Country-aware localized content",
        description: "Content can match local phrasing and market expectations more closely.",
      },
      {
        title: "Better market-specific control",
        description: "Teams can localize by country without splitting into completely separate manual workflows.",
      },
      {
        title: "A more credible storefront experience",
        description: "Localized content feels less like a copied translation shared across unrelated countries.",
      },
    ],
    outcomes: [
      "Improve market-specific relevance",
      "Avoid one-size-fits-all translation across countries",
      "Make content feel closer to local consumer expectations",
    ],
    faq: [
      {
        question: "Why is this different from normal multilingual translation?",
        answer: "Because the challenge is not only language coverage. It is making the same language feel right in different countries with different habits and norms.",
      },
      {
        question: "Is this only useful for large brands?",
        answer: "No. Smaller brands often benefit even more because a little market-specific correction can make the storefront feel much more local without building a separate content team.",
      },
    ],
    ctaLabel: "Install on Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
  },
  {
    slug: "translator-scope-based-translation",
    productSlug: "translator",
    category: "Cost Control",
    title: "Lower translation cost by translating only the products and markets that actually matter",
    description: "When the catalog is huge but only part of it is relevant to a target market, use Ciwi to localize by collection, tag, vendor, product status, or market instead of translating everything.",
    heroTitle: "If only part of the catalog sells in a market, do not spend translation budget on the rest",
    heroDescription:
      "Use Ciwi AI Translator to choose the exact scope that should be localized so large stores can improve language coverage where it matters without wasting budget on low-priority products.",
    keywordPlayground: {
      title: "Keyword and angle playground",
      description: "Preview how the page should frame translation cost control and selective localization scope.",
      variables: [
        {key: "catalogSize", label: "Catalog size", defaultValue: "10,000 SKU store", placeholder: "3,000 SKU store"},
        {key: "filter", label: "Selection rule", defaultValue: "collection and market", placeholder: "tag and vendor"},
        {key: "goal", label: "Goal", defaultValue: "reduce wasted translation spend", placeholder: "prioritize sellable products"},
      ],
      templates: [
        {label: "Primary keyword", template: "{{catalogSize}} selective translation by {{filter}}"},
        {label: "Landing-page angle", template: "How to {{goal}} in a {{catalogSize}} using {{filter}} instead of translating everything"},
      ],
      note: "This use case should feel operational and cost-aware, especially for large merchants with massive catalogs.",
    },
    previewModule: {
      title: "Selective scope module",
      description: "Reserve a block for showing how merchants choose what gets translated by collection, tag, vendor, product status, or market.",
      type: "placeholder",
      highlights: ["Collection-based scope", "Market-based scope", "Lower translation waste"],
      note: "A small visual about translation scope selection is enough to make this use case concrete.",
    },
    audience: [
      "Large SKU stores entering only a few target markets",
      "Operators trying to balance localization coverage with budget limits",
      "Teams that know not every product deserves translation in every market",
    ],
    signals: [
      "The catalog is too large to translate indiscriminately",
      "Many products are not active or not sold in the target market",
      "Translation cost rises faster than localization value",
    ],
    workflow: [
      {
        title: "Choose the sellable scope first",
        description: "Use operational rules such as collection, tag, vendor, product status, or market to decide what actually needs localization.",
      },
      {
        title: "Translate only the relevant catalog slice",
        description: "Send the chosen subset through Ciwi instead of treating the entire catalog as equally important.",
      },
      {
        title: "Expand coverage strategically over time",
        description: "Add more products and markets when they become relevant instead of paying the full localization cost upfront.",
      },
    ],
    deliverables: [
      {
        title: "A narrower, more valuable translation scope",
        description: "Localization effort goes to the products most likely to matter in the target market.",
      },
      {
        title: "Lower wasted translation spend",
        description: "Teams avoid spending budget on products that are inactive, irrelevant, or unsellable in that market.",
      },
      {
        title: "Better coverage where it counts",
        description: "Critical collections and products can be localized more completely without waiting for a full-catalog project.",
      },
    ],
    outcomes: [
      "Reduce unnecessary translation cost",
      "Improve localization coverage on priority products",
      "Make large-catalog localization more manageable",
    ],
    faq: [
      {
        question: "Is this only about saving money?",
        answer: "No. It is also about getting the right products localized sooner, instead of delaying everything behind an unrealistic full-catalog project.",
      },
      {
        question: "Why make selective scope a separate use case?",
        answer: "Because for large merchants, the biggest barrier is often not translation quality. It is the cost and operational weight of translating far too much content at once.",
      },
    ],
    ctaLabel: "Install on Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
  },
  {
    slug: "translator-visual-localization",
    productSlug: "translator",
    category: "Visual Localization",
    title: "Fix the problem where the text is translated but the store still looks foreign",
    description: "When product descriptions are localized but banners, image text, product visuals, and alt text stay in English, use Ciwi to localize the visual layer too so the storefront feels more complete.",
    heroTitle: "If only the text is localized, the storefront still does not feel native to the shopper",
    heroDescription:
      "Use Ciwi AI Translator for image text translation, language-specific images, and localized alt text so buyers see a more consistent local shopping experience instead of a partially translated storefront.",
    keywordPlayground: {
      title: "Keyword and angle playground",
      description: "Use storefront surface, visual gap, and localization goal to preview how this page should frame visual localization.",
      variables: [
        {key: "surface", label: "Visual surface", defaultValue: "banners and product images", placeholder: "PDP visuals and promos"},
        {key: "gap", label: "Localization gap", defaultValue: "text is translated but visuals are not", placeholder: "alt text stays in English"},
        {key: "goal", label: "Goal", defaultValue: "create a more local shopping experience", placeholder: "reduce half-translated pages"},
      ],
      templates: [
        {label: "Primary keyword", template: "{{surface}} localization when {{gap}}"},
        {label: "Landing-page angle", template: "How to {{goal}} when {{gap}} across {{surface}}"},
      ],
      note: "This use case should clearly show that localization is not complete if the visual layer remains in the original language.",
    },
    previewModule: {
      title: "Visual localization module",
      description: "Reserve a slot for before-and-after examples of banners, image text, and alt text across languages.",
      type: "placeholder",
      highlights: ["Image text translation", "Localized images", "Localized alt text"],
      note: "This module can be especially persuasive with static screenshots that show why text-only translation still feels incomplete.",
    },
    audience: [
      "Brands with heavy visual merchandising",
      "Teams that already translated text but still feel the storefront looks foreign",
      "Operators who want a more complete localized shopper experience",
    ],
    signals: [
      "Banners and images still show the original language",
      "Localized PDP text is mixed with English image content or alt text",
      "The storefront still feels half-translated even after text localization is finished",
    ],
    workflow: [
      {
        title: "Identify the visual surfaces still stuck in the source language",
        description: "Find image text, banners, promotional assets, and alt text that make the storefront feel incomplete in the target market.",
      },
      {
        title: "Localize the visual layer with the text layer",
        description: "Use Ciwi to translate image text, assign language-specific images, and localize alt text alongside core storefront content.",
      },
      {
        title: "Ship a more coherent localized experience",
        description: "Make sure shoppers are not seeing translated copy next to source-language visuals that break trust or clarity.",
      },
    ],
    deliverables: [
      {
        title: "A more complete localized storefront",
        description: "Text and visual content feel more aligned instead of competing across languages.",
      },
      {
        title: "Better localized image coverage",
        description: "Important banners, product visuals, and alt text no longer lag behind the written copy.",
      },
      {
        title: "A more credible shopper experience",
        description: "The store looks less like a translated export and more like a market-ready storefront.",
      },
    ],
    outcomes: [
      "Reduce half-translated visual experiences",
      "Improve perceived localization quality",
      "Make the store feel more local to the shopper",
    ],
    faq: [
      {
        question: "Is this mostly a design problem or a translation problem?",
        answer: "It is both. The translation may be technically complete, but the shopper still experiences the store as unfinished if image text and visuals remain in the source language.",
      },
      {
        question: "Why is visual localization worth its own use case?",
        answer: "Because many stores say they are localized when only the text layer changed. In practice, shoppers still judge the storefront by what they see first.",
      },
    ],
    ctaLabel: "Install on Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
  },
  {
    slug: "translator-seo-coverage-localization",
    productSlug: "translator",
    category: "SEO",
    title: "Improve international search coverage by localizing the SEO layer, not just the product copy",
    description: "When a store already has overseas traffic but meta titles, descriptions, and image alt text stay in the original language, use Ciwi to strengthen target-language SEO coverage at scale.",
    heroTitle: "If search engines only see the source language, the market cannot get full SEO value from localized content",
    heroDescription:
      "Use Ciwi AI Translator to localize meta title, meta description, product content, and image alt text together so search engines have more complete target-language content to work with in each market.",
    keywordPlayground: {
      title: "Keyword and angle playground",
      description: "Test whether the page should lean more toward multilingual SEO coverage, product SEO, or alt-text completeness.",
      variables: [
        {key: "market", label: "Target market", defaultValue: "French market", placeholder: "German market"},
        {key: "surface", label: "SEO surface", defaultValue: "meta titles descriptions and alt text", placeholder: "product SEO and alt text"},
        {key: "goal", label: "SEO goal", defaultValue: "improve target-language content coverage", placeholder: "support international organic search"},
      ],
      templates: [
        {label: "Primary keyword", template: "{{surface}} localization for {{market}} SEO"},
        {label: "Landing-page angle", template: "How to {{goal}} by localizing {{surface}} for {{market}}"},
      ],
      note: "This use case should make it clear that international SEO often fails because the SEO layer remains untranslated even after core copy is localized.",
    },
    previewModule: {
      title: "SEO localization module",
      description: "Reserve a block for showing untranslated meta fields and alt text alongside the improved localized version.",
      type: "placeholder",
      highlights: ["Meta localization", "Product SEO fields", "Localized alt text"],
      note: "A side-by-side example works well because merchants can immediately see the SEO content gap.",
    },
    audience: [
      "Brands already getting traffic from overseas markets",
      "Teams trying to improve multilingual organic search coverage",
      "Operators who know the product copy is translated but SEO fields still lag behind",
    ],
    signals: [
      "Meta title and description remain in the source language",
      "Image alt text is not localized across the catalog",
      "Localized pages still do not give search engines enough target-language context",
    ],
    workflow: [
      {
        title: "Audit the SEO layer in each market",
        description: "Look beyond product descriptions and identify the untranslated meta and alt-text fields that still weaken search coverage.",
      },
      {
        title: "Batch localize SEO metadata and alt text",
        description: "Use Ciwi to localize the fields search engines rely on, not just the visible storefront body copy.",
      },
      {
        title: "Strengthen market-specific content coverage",
        description: "Give each target language a more complete SEO surface so the storefront has a better content base for local search.",
      },
    ],
    deliverables: [
      {
        title: "A more complete multilingual SEO layer",
        description: "Meta titles, descriptions, product content, and alt text are more consistently localized.",
      },
      {
        title: "Better target-language content coverage",
        description: "Search engines can read more of the store in the destination language instead of relying on mixed-language fields.",
      },
      {
        title: "Less SEO content drift across markets",
        description: "Important SEO fields stay closer to the localized storefront instead of being forgotten after launch.",
      },
    ],
    outcomes: [
      "Improve international SEO readiness",
      "Expand localized content coverage for search engines",
      "Reduce untranslated SEO gaps across the storefront",
    ],
    faq: [
      {
        question: "Does this guarantee higher rankings?",
        answer: "No. But it improves a very common weak point: search engines often see incomplete or mixed-language SEO fields even when the storefront body copy has already been translated.",
      },
      {
        question: "Why is SEO localization a separate use case?",
        answer: "Because many stores translate the visible page content first and forget the metadata and alt-text layer that helps local search performance scale later.",
      },
    ],
    ctaLabel: "Install on Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
  },
  {
    slug: "translator-quality-recovery",
    productSlug: "translator",
    category: "Migration",
    title: "Recover translation quality after migrating from another translation tool",
    description: "When a previous tool leaves duplicate, missing, inconsistent, or low-quality translations behind, use Ciwi to import existing content, identify gaps, and gradually rework what needs improvement.",
    heroTitle: "You do not have to start over from zero to fix a bad translation history",
    heroDescription:
      "Use Ciwi AI Translator to import historical translations, detect missing content, and selectively retranslate the parts that are inconsistent, outdated, or poor quality so the store improves without a full reset.",
    keywordPlayground: {
      title: "Keyword and angle playground",
      description: "Use migration source, content issue, and recovery goal to test how the page should frame post-migration cleanup.",
      variables: [
        {key: "source", label: "Previous setup", defaultValue: "another translation app", placeholder: "legacy translation workflow"},
        {key: "issue", label: "Main issue", defaultValue: "missing and inconsistent translations", placeholder: "duplicate and low-quality output"},
        {key: "goal", label: "Recovery goal", defaultValue: "improve quality without restarting", placeholder: "clean up translation history gradually"},
      ],
      templates: [
        {label: "Primary keyword", template: "{{source}} migration for {{issue}}"},
        {label: "Landing-page angle", template: "How to {{goal}} after moving from {{source}} with {{issue}}"},
      ],
      note: "This use case should reassure merchants that migration does not require a total content reset.",
    },
    previewModule: {
      title: "Migration cleanup module",
      description: "Reserve a block for showing imported translations, detected gaps, and selective retranslation paths.",
      type: "placeholder",
      highlights: ["Import historical translations", "Gap detection", "Selective retranslation"],
      note: "This is persuasive when presented as a recovery path rather than a full rewrite project.",
    },
    audience: [
      "Stores migrating from older translation apps",
      "Operators dealing with messy multilingual content histories",
      "Brands that want better translation quality without deleting everything first",
    ],
    signals: [
      "Historical translations contain duplicates or inconsistent terminology",
      "Some content is missing while other content was translated multiple times",
      "The team wants better quality but cannot afford a full restart project",
    ],
    workflow: [
      {
        title: "Import what already exists",
        description: "Bring historical translations into Ciwi instead of discarding all previous work immediately.",
      },
      {
        title: "Identify gaps and low-quality areas",
        description: "Scan for missing content, outdated output, duplicate translations, and obvious terminology inconsistency.",
      },
      {
        title: "Retranslate selectively with better controls",
        description: "Use glossary and prompt rules to improve the highest-impact content first instead of rebuilding the whole store at once.",
      },
    ],
    deliverables: [
      {
        title: "A structured migration recovery path",
        description: "Teams can improve translation quality gradually instead of treating migration like a full reset.",
      },
      {
        title: "Cleaner multilingual content over time",
        description: "Missing, duplicated, and inconsistent translations can be reduced in a controlled way.",
      },
      {
        title: "Less wasted historical work",
        description: "Merchants keep the usable parts of old translations while improving the parts that are clearly broken.",
      },
    ],
    outcomes: [
      "Improve historical translation quality",
      "Avoid a full restart migration project",
      "Clean up multilingual content with less disruption",
    ],
    faq: [
      {
        question: "Do we need to delete old translations first?",
        answer: "No. This use case works best when the team imports what exists, sees the gaps clearly, and then improves the content selectively.",
      },
      {
        question: "Why make migration cleanup a separate use case?",
        answer: "Because many merchants are not launching from zero. They are inheriting years of mixed-quality multilingual content and need a recovery workflow, not a blank slate.",
      },
    ],
    ctaLabel: "Install on Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
  },
  {
    slug: "translator-ai-human-review-workflow",
    productSlug: "translator",
    category: "Human + AI",
    title: "Let AI handle the draft while human translators review the markets that matter most",
    description: "When the team does not want a fully AI-only workflow, use Ciwi to generate large-scale first drafts, then export content for local reviewers and bring the approved version back in.",
    heroTitle: "Move human translation from starting from zero to reviewing and improving the draft",
    heroDescription:
      "Use Ciwi AI Translator to create the initial translation at scale, then export, review, and re-import content so local teams spend their time on quality control instead of blank-page translation.",
    keywordPlayground: {
      title: "Keyword and angle playground",
      description: "Preview how the page should frame AI-assisted translation plus human review.",
      variables: [
        {key: "team", label: "Reviewer team", defaultValue: "local market reviewers", placeholder: "regional brand team"},
        {key: "scope", label: "Content scope", defaultValue: "core market pages", placeholder: "high-priority product content"},
        {key: "goal", label: "Workflow goal", defaultValue: "review instead of translating from scratch", placeholder: "scale quality with smaller teams"},
      ],
      templates: [
        {label: "Primary keyword", template: "AI translation with human review for {{scope}}"},
        {label: "Landing-page angle", template: "How to let {{team}} {{goal}} across {{scope}}"},
      ],
      note: "This use case should show that AI and human review are complementary, not mutually exclusive.",
    },
    previewModule: {
      title: "AI plus human workflow module",
      description: "Reserve a block for showing draft generation, export for review, and re-import after approval.",
      type: "placeholder",
      highlights: ["AI first draft", "Export for review", "Re-import approved copy"],
      note: "A simple workflow diagram is enough to show how the handoff works.",
    },
    audience: [
      "Brands that want local reviewers involved in key markets",
      "Teams that trust AI for scale but still want human quality control",
      "Operators trying to reduce the cost of starting every translation manually",
    ],
    signals: [
      "The brand does not want a fully AI-only translation workflow",
      "Some markets still require local approval before publishing",
      "Human translators are spending too much time translating from scratch",
    ],
    workflow: [
      {
        title: "Generate the first draft at scale",
        description: "Use AI to cover the heavy first-pass work so the human team does not start from an empty document.",
      },
      {
        title: "Export for local review",
        description: "Send the draft to the local market or language reviewer for approval, correction, and brand alignment.",
      },
      {
        title: "Bring approved content back into the storefront",
        description: "Re-import the reviewed version so the final localized store reflects both AI speed and human judgment.",
      },
    ],
    deliverables: [
      {
        title: "A hybrid localization workflow",
        description: "AI handles the scale while humans focus on review and improvement where it matters most.",
      },
      {
        title: "Higher translator efficiency",
        description: "Human reviewers optimize a draft instead of translating every line from zero.",
      },
      {
        title: "A more flexible quality model",
        description: "Different markets can choose different levels of human review without losing the same base workflow.",
      },
    ],
    outcomes: [
      "Improve human translator efficiency",
      "Keep review in high-priority markets",
      "Scale localization without going AI-only everywhere",
    ],
    faq: [
      {
        question: "Does this mean AI quality is not good enough?",
        answer: "Not necessarily. It means some brands still want extra control in high-priority markets, and AI is most useful when it reduces the manual starting effort.",
      },
      {
        question: "Why is this a separate use case?",
        answer: "Because the operational question here is not how to translate faster. It is how to combine AI scale with human review without creating duplicate work.",
      },
    ],
    ctaLabel: "Install on Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
  },
  {
    slug: "translator-localization-gap-audit",
    productSlug: "translator",
    category: "Coverage Audit",
    title: "Find localization gaps before a new market ends up with half-translated pages",
    description: "When products are translated but theme, metafields, images, or other fields are not, use Ciwi to scan for missing or unsynced content before the storefront starts feeling incomplete.",
    heroTitle: "If one layer of the store is missing, the market still experiences a broken localization launch",
    heroDescription:
      "Use Ciwi AI Translator to scan for untranslated and unsynced content across products, theme, metafields, images, and other storefront surfaces so the team can fix gaps before shoppers notice the inconsistency.",
    keywordPlayground: {
      title: "Keyword and angle playground",
      description: "Preview how the page should frame audit and gap detection rather than translation generation alone.",
      variables: [
        {key: "surface", label: "Missing surface", defaultValue: "theme metafields and images", placeholder: "theme and SEO fields"},
        {key: "issue", label: "Gap type", defaultValue: "half-translated pages", placeholder: "unsynced localization"},
        {key: "goal", label: "Audit goal", defaultValue: "find missing localization quickly", placeholder: "keep every market complete"},
      ],
      templates: [
        {label: "Primary keyword", template: "{{surface}} localization gap audit for {{issue}}"},
        {label: "Landing-page angle", template: "How to {{goal}} when {{issue}} keeps appearing across {{surface}}"},
      ],
      note: "This use case should feel like a quality-assurance workflow for multilingual completeness, not just another batch translation run.",
    },
    previewModule: {
      title: "Gap audit module",
      description: "Reserve a block for showing untranslated surfaces, missed fields, and unsynced content alerts.",
      type: "placeholder",
      highlights: ["Untranslated content scan", "Unsynced content detection", "Coverage gap review"],
      note: "A checklist-style module can make this use case very concrete for operators.",
    },
    audience: [
      "Teams that constantly update storefront content after launch",
      "Operators who suspect some content layers keep getting missed",
      "Brands that want every target market to feel complete and credible",
    ],
    signals: [
      "Products are translated but other storefront layers are not",
      "New content keeps creating incomplete localized pages",
      "The team cannot easily see where localization coverage is still missing",
    ],
    workflow: [
      {
        title: "Scan across storefront surfaces",
        description: "Check products, theme, metafields, images, SEO, and related layers instead of looking only at one content type.",
      },
      {
        title: "Identify untranslated or unsynced gaps",
        description: "Use Ciwi to surface missing localization before the store presents a fragmented experience to shoppers.",
      },
      {
        title: "Turn the gaps into a repair queue",
        description: "Use the scan to prioritize what should be translated or resynced next to restore market completeness.",
      },
    ],
    deliverables: [
      {
        title: "A clearer localization coverage map",
        description: "Teams can see where translation exists and where key storefront layers are still incomplete.",
      },
      {
        title: "Fewer half-translated pages",
        description: "Missing or stale content can be detected before it quietly harms the market experience.",
      },
      {
        title: "A more disciplined QA process",
        description: "Localization quality checks become repeatable instead of depending on ad hoc discovery.",
      },
    ],
    outcomes: [
      "Find missing localization faster",
      "Reduce incomplete market experiences",
      "Keep multilingual stores more consistent over time",
    ],
    faq: [
      {
        question: "Is this only useful after launch?",
        answer: "No. It is valuable both before launch and during ongoing maintenance because the same problem keeps returning whenever the source storefront changes.",
      },
      {
        question: "Why make gap detection its own use case?",
        answer: "Because many stores are already translating content. The harder problem is knowing what still got missed across all the other storefront layers.",
      },
    ],
    ctaLabel: "Install on Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
  },
  {
    slug: "translator-small-team-multi-market",
    productSlug: "translator",
    category: "Team Efficiency",
    title: "Let a small team run multiple language markets without hiring a separate localization department",
    description: "When only a few people are managing Europe, Asia, and other markets at once, use Ciwi's automation, sync, glossary, prompt, and batch controls to reduce repetitive translation work.",
    heroTitle: "A small team can support more markets if localization stops consuming the whole week",
    heroDescription:
      "Use Ciwi AI Translator to combine automatic translation, sync, glossary rules, prompt control, and batch operations so a lean team can spend less time on repetitive localization and more time on growth work.",
    keywordPlayground: {
      title: "Keyword and angle playground",
      description: "Preview how the page should frame market expansion for lean teams rather than enterprise localization teams.",
      variables: [
        {key: "teamSize", label: "Team size", defaultValue: "three-person ecommerce team", placeholder: "small growth team"},
        {key: "marketCount", label: "Market count", defaultValue: "five language markets", placeholder: "multiple global markets"},
        {key: "goal", label: "Efficiency goal", defaultValue: "spend less time on repetitive localization", placeholder: "support more markets with fewer people"},
      ],
      templates: [
        {label: "Primary keyword", template: "{{teamSize}} managing {{marketCount}} with translation automation"},
        {label: "Landing-page angle", template: "How to {{goal}} as a {{teamSize}} running {{marketCount}}"},
      ],
      note: "This should read like an operating leverage story, not a pure translation feature page.",
    },
    previewModule: {
      title: "Lean-team workflow module",
      description: "Reserve a block for showing how automation, sync, glossary, and batch actions reduce manual workload across markets.",
      type: "placeholder",
      highlights: ["Automation for lean teams", "Batch workflows", "More markets with less manual work"],
      note: "A simple team-efficiency workflow is enough to make this use case immediately relatable.",
    },
    audience: [
      "Small ecommerce teams supporting multiple markets",
      "Founders and operators who cannot hire a dedicated localization team yet",
      "Brands expanding internationally with limited headcount",
    ],
    signals: [
      "The team is managing too many markets with too few people",
      "Localization work keeps pushing aside growth and merchandising work",
      "Manual translation operations are becoming the bottleneck for international expansion",
    ],
    workflow: [
      {
        title: "Automate the repetitive translation layer",
        description: "Use Ciwi for the routine work that would otherwise consume the team's weekly bandwidth.",
      },
      {
        title: "Keep quality controls lightweight but repeatable",
        description: "Use glossary, prompt rules, and batch controls so quality does not collapse as the number of markets grows.",
      },
      {
        title: "Free the team for higher-value work",
        description: "Shift time away from repetitive translation maintenance toward campaigns, merchandising, and growth decisions.",
      },
    ],
    deliverables: [
      {
        title: "A higher-leverage localization workflow",
        description: "The team supports more markets without manually touching every translation task.",
      },
      {
        title: "Less repetitive operational work",
        description: "Automation and batch control absorb the tasks that would otherwise dominate the team's time.",
      },
      {
        title: "More room for growth work",
        description: "Operators can spend more time on marketing and expansion instead of translation housekeeping.",
      },
    ],
    outcomes: [
      "Support more markets with less manual effort",
      "Reduce localization overhead for lean teams",
      "Shift team time toward growth instead of repetitive translation work",
    ],
    faq: [
      {
        question: "Is this mainly for very small brands?",
        answer: "It helps at multiple stages, but it is especially valuable for brands expanding faster than their team size can support through manual localization alone.",
      },
      {
        question: "Why make team efficiency a separate use case?",
        answer: "Because the core pain is organizational: a small team needs operating leverage, not just a slightly faster translation button.",
      },
    ],
    ctaLabel: "Install on Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
  },
  {
    slug: "translator-consistency-at-scale",
    productSlug: "translator",
    category: "Scale",
    title: "Keep terminology and translation quality consistent as the brand expands across more pages, SKUs, and markets",
    description: "When content volume and team size both grow, use glossary and brand prompt rules so translation quality does not become more chaotic every quarter.",
    heroTitle: "As the catalog and market count grow, stop letting translation quality become more random over time",
    heroDescription:
      "Use Ciwi AI Translator to centralize glossary and brand prompt rules so new products, new pages, and new market launches inherit the same language standards instead of creating new inconsistency every month.",
    keywordPlayground: {
      title: "Keyword and angle playground",
      description: "Use scale, content type, and consistency goal to preview how this page should frame translation governance.",
      variables: [
        {key: "scale", label: "Growth stage", defaultValue: "more SKUs pages and markets", placeholder: "fast catalog expansion"},
        {key: "content", label: "Content type", defaultValue: "products pages and campaigns", placeholder: "products and structured content"},
        {key: "goal", label: "Consistency goal", defaultValue: "keep terminology stable at scale", placeholder: "avoid translation chaos"},
      ],
      templates: [
        {label: "Primary keyword", template: "translation consistency at scale for {{content}}"},
        {label: "Landing-page angle", template: "How to {{goal}} when {{scale}} increases across {{content}}"},
      ],
      note: "This use case is about long-term translation governance as the business scales, not just launch speed.",
    },
    previewModule: {
      title: "Consistency at scale module",
      description: "Reserve a block for showing how shared glossary and prompt rules carry forward into later translation jobs.",
      type: "placeholder",
      highlights: ["Shared glossary rules", "Brand prompts at scale", "Consistency across future launches"],
      note: "This is a good place for a simple diagram that shows one language standard being reused across later growth.",
    },
    audience: [
      "Brands expanding catalog size and market count quickly",
      "Teams with multiple people contributing to multilingual content over time",
      "Operators who already see terminology and style drifting as content volume grows",
    ],
    signals: [
      "Different teams or time periods create inconsistent translation output",
      "More products and pages are making multilingual QA harder every month",
      "The brand wants growth without losing language consistency across markets",
    ],
    workflow: [
      {
        title: "Centralize the language rules",
        description: "Define glossary and brand prompt standards that apply across future translation work instead of resetting each time.",
      },
      {
        title: "Apply the same standards to new content",
        description: "Use Ciwi to carry those rules forward into later products, pages, and market launches automatically.",
      },
      {
        title: "Scale without multiplying inconsistency",
        description: "Keep new translation output closer to the same language system even as the store grows more complex.",
      },
    ],
    deliverables: [
      {
        title: "A reusable language governance layer",
        description: "Translation standards become a system the brand can reuse instead of a memory held by a few people.",
      },
      {
        title: "Less drift over time",
        description: "New content is less likely to introduce fresh terminology and tone inconsistency into the store.",
      },
      {
        title: "A more scalable multilingual operation",
        description: "Growth no longer automatically means quality becomes more chaotic across languages.",
      },
    ],
    outcomes: [
      "Protect translation consistency as the business grows",
      "Reduce multilingual chaos across teams and time periods",
      "Scale market coverage with stronger language governance",
    ],
    faq: [
      {
        question: "Is this the same as glossary control?",
        answer: "Glossary is part of it, but the broader use case is about keeping quality stable as more products, pages, people, and markets enter the system over time.",
      },
      {
        question: "Why make scale consistency its own use case?",
        answer: "Because many brands only feel this pain later. Launch speed is not the long-term problem if every new quarter adds another layer of inconsistency.",
      },
    ],
    ctaLabel: "Install on Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
  },
];

const useCasesZh: UseCaseItem[] = [
  {
    slug: "spark-cross-platform-ad-reporting",
    productSlug: "spark-analytics-agent",
    category: "投放复盘",
    title: "周一投放复盘时，不再手拼 Google / Meta / TikTok 报表",
    description: "在周报或晨会前，把 Spend、Revenue、ROAS、CPA 等广告数据先汇到一个视图里，让团队直接进入预算和策略讨论，而不是先重做报表。",
    heroTitle: "团队要看一份跨平台投放周报时，不必再从三个后台重新导数",
    heroDescription:
      "用 Spark 汇总 Google、Meta、TikTok 的广告表现，把 Spend、Revenue、ROAS、CPA、CTR、CPC 和 Conversions 放到同一个工作台，让周一复盘从“拼表”变成“做判断”。",
    keywordPlayground: {
      title: "关键词和页面角度预览",
      description: "把平台组合、报表周期和导出层级填进去，快速看这页更像“广告日报导出”还是“跨平台投放复盘”。",
      variables: [
        {key: "platforms", label: "平台组合", defaultValue: "Google Meta TikTok", placeholder: "Meta 和 Google"},
        {key: "window", label: "报表周期", defaultValue: "每周", placeholder: "每日"},
        {key: "grain", label: "导出层级", defaultValue: "Campaign / Ad Set / Ad", placeholder: "Campaign 层级"},
      ],
      templates: [
        {label: "主关键词", template: "{{window}}{{platforms}}广告报表导出"},
        {label: "落地页角度", template: "如何在不手工拼表的情况下完成 {{window}}{{platforms}} 的 {{grain}} 广告复盘"},
      ],
      note: "这个模块的重点不是解释 Spark 有哪些报表能力，而是先证明它能解决团队反复重做广告周报的实际问题。",
    },
    previewModule: {
      title: "投放报表演示预留位",
      description: "这里适合放跨平台报表合并、导出层级切换和日报 / 周报生成的演示视频或静态流程图。",
      type: "placeholder",
      highlights: ["跨平台汇总", "Campaign / Ad Set / Ad 导出", "日报 / 周报输出"],
      note: "哪怕先放静态流程图，也能让这个场景更像“团队如何完成复盘”，而不是一张功能清单。",
    },
    audience: [
      "每周都要做投放周报或晨会复盘的增长团队",
      "还在手工整合 Google、Meta、TikTok 数据的运营负责人",
      "希望先拿到一份统一广告视图，再决定下一步怎么调预算的老板或投手",
    ],
    signals: [
      "团队每周都在重复做同一份广告汇总报表",
      "Campaign、Ad Set、Ad 三级数据导出太分散",
      "广告平台数据和店铺营收讨论总是分开进行，导致复盘很慢",
    ],
    workflow: [
      {
        title: "先把广告账户和 Shopify 营收上下文接进来",
        description: "把 Google、Meta、TikTok 和店铺侧表现汇到同一个工作台，不再从三个广告后台分别导出后再拼。",
      },
      {
        title: "按 Campaign / Ad Set / Ad 查看表现",
        description: "先把数据切到团队真正要讨论的层级，再决定哪些活动值得继续放量，哪些需要继续排查。",
      },
      {
        title: "导出日报或周报",
        description: "把同一套视图变成能稳定复用的报表输出，而不是每次都重新整理逻辑和字段。",
      },
    ],
    deliverables: [
      {
        title: "一份跨平台广告总览",
        description: "在同一个地方查看 Spend、Revenue、ROAS、CPA、CTR、CPC 和转化数据。",
      },
      {
        title: "可继续拆分的导出报表",
        description: "Campaign、Ad Set、Ad 层级都可以作为稳定导出格式，而不是临时整理。",
      },
      {
        title: "可重复执行的复盘流程",
        description: "让广告复盘从零散动作变成每周都能复用的团队流程。",
      },
    ],
    outcomes: [
      "减少重复拼广告报表的时间",
      "让跨平台投放表现更容易横向比较",
      "让团队更快进入预算和策略讨论",
    ],
    faq: [
      {
        question: "这个场景更偏报表，还是更偏运营？",
        answer: "入口看起来像报表，但真正的价值是让团队更快进入预算、投放和异常排查决策，而不是停在导出动作本身。",
      },
      {
        question: "为什么不直接从各广告平台各自导出？",
        answer: "因为商家真正耗时间的往往不是“能不能导出”，而是跨平台合并、字段统一以及和 Shopify 营收一起看时的反复重做。",
      },
    ],
    ctaLabel: "联系我们",
    ctaHref: "/waitlist",
    featured: true,
  },
  {
    slug: "spark-budget-reallocation",
    productSlug: "spark-analytics-agent",
    category: "预算调度",
    title: "放量周里，先把低效广告停掉，再把预算转给赢家",
    description: "当花费在涨、投放节奏在变时，用 Spark 更快找出 ROAS 太低或连续无转化的广告，把预算从弱广告转到还值得继续放量的 Campaign。",
    heroTitle: "当预算快速上升时，先保护花费效率，而不是等一周后再回头补救",
    heroDescription:
      "用 Spark 把低 ROAS、无转化和高表现 Campaign 放到同一个操作视图里，让“暂停低效广告、提高赢家预算、重新分配花费”变成稳定的日常动作，而不是临时救火。",
    keywordPlayground: {
      title: "关键词和页面角度预览",
      description: "通过平台组合、判断规则和预算动作，快速看这页更像“广告止损”还是“放量调度”。",
      variables: [
        {key: "platforms", label: "平台组合", defaultValue: "Google Meta TikTok", placeholder: "Meta 和 TikTok"},
        {key: "metric", label: "判断规则", defaultValue: "ROAS 小于 1", placeholder: "连续 3 天无转化"},
        {key: "move", label: "预算动作", defaultValue: "把预算转向赢家", placeholder: "暂停弱广告"},
      ],
      templates: [
        {label: "主关键词", template: "{{platforms}}{{metric}}广告预算重分配"},
        {label: "落地页角度", template: "如何在 {{metric}} 时完成 {{platforms}} 广告的 {{move}}"},
      ],
      note: "重点不是罗列 Spark 有哪些预算功能，而是先把“商家怎么在放量周保护预算效率”讲清楚。",
    },
    previewModule: {
      title: "预算调度演示预留位",
      description: "适合展示低效广告识别、预算重分配规则和暂停 / 恢复建议，让这个场景看起来像真实操作过程。",
      type: "placeholder",
      highlights: ["暂停低效广告", "提高赢家预算", "预算再分配建议"],
      note: "后续即使加入真实视频，这个模块也应该继续围绕“放量时如何保住效率”来讲，而不是单纯展示功能按钮。",
    },
    audience: [
      "同时管理 Google、Meta、TikTok 预算的投放团队",
      "需要每天判断哪些广告该停、哪些该继续加预算的运营",
      "已经有预算规则，但仍在各平台手动执行的商家",
    ],
    signals: [
      "低效广告还在持续烧钱",
      "强广告和弱广告的预算分配不够快",
      "同样的暂停 / 恢复 / 调预算逻辑被分散在多个广告后台手动重复",
    ],
    workflow: [
      {
        title: "先把跨平台广告表现拉到同一个操作视图",
        description: "先统一看 ROAS、Spend、Conversions 等关键指标，再决定哪些广告该继续给钱，哪些应该马上停。",
      },
      {
        title: "标出弱广告和强广告",
        description: "按照低 ROAS、无转化或高表现规则，把真正值得处理的对象筛出来。",
      },
      {
        title: "把预算调整变成稳定流程",
        description: "不要每次都临时判断，而是把暂停、恢复、加预算和重分配变成可以重复执行的投放节奏。",
      },
    ],
    deliverables: [
      {
        title: "预算操作队列",
        description: "更清楚知道哪些 Campaign / Ad 该暂停、恢复、降低预算或继续加预算。",
      },
      {
        title: "有规则依据的预算判断",
        description: "让预算调整建立在可复用的判断逻辑上，而不是散乱的人工感觉。",
      },
      {
        title: "更可复用的放量流程",
        description: "团队可以把同一套逻辑用在每天或每周的投放优化里。",
      },
    ],
    outcomes: [
      "减少预算继续烧在低效广告上的时间",
      "让高表现广告更快获得预算支持",
      "让多平台预算操作更一致",
    ],
    faq: [
      {
        question: "这是不是意味着 Spark 现在就直接修改所有广告平台？",
        answer: "页面可以先从识别、建议和导出流程开始成立。后续即使再接入直接动作，这个 use case 的核心也还是“商家如何更快保护预算效率”。",
      },
      {
        question: "为什么不用广告平台自己的自动规则？",
        answer: "原生规则当然有帮助，但商家真正难的是跨平台对齐预算逻辑、结合 Shopify 营收语境做判断，以及知道下一步该把钱转去哪里。",
      },
    ],
    ctaLabel: "联系我们",
    ctaHref: "/waitlist",
    featured: true,
  },
  {
    slug: "spark-catalog-feed-monitoring",
    productSlug: "spark-analytics-agent",
    category: "Catalog / Feed",
    title: "爆品突然跑不动时，先排查 Catalog / Feed 错误，而不是先怪 Campaign",
    description: "当广告突然不花钱、商品被拒或 Feed 字段出错时，用 Spark 先看是不是 Catalog 同步、价格不一致、缺图或字段问题拦住了本该继续跑量的商品。",
    heroTitle: "当好商品在广告里突然失速时，先看 Catalog 和 Feed 有没有把它卡住",
    heroDescription:
      "用 Spark 监控 Catalog 同步状态、缺失字段、价格不匹配、商品被拒和商品与广告表现的关联，让团队知道该先修 Feed，还是该继续改 Campaign。",
    keywordPlayground: {
      title: "关键词和页面角度预览",
      description: "通过 Catalog 平台、错误类型和修复动作，快速看这页更适合承接“商品被拒”还是“Feed 修复”类搜索意图。",
      variables: [
        {key: "platform", label: "Catalog 平台", defaultValue: "Meta 和 Google", placeholder: "Google Merchant Center"},
        {key: "issue", label: "错误类型", defaultValue: "Catalog 错误", placeholder: "价格不匹配"},
        {key: "action", label: "修复动作", defaultValue: "修复被拒商品", placeholder: "补齐 Feed 字段"},
      ],
      templates: [
        {label: "主关键词", template: "{{platform}}Shopify{{issue}}修复"},
        {label: "落地页角度", template: "当 {{platform}} 出现 {{issue}} 时，如何更快完成 {{action}}"},
      ],
      note: "这里的重点是“广告跑不动时如何判断是不是 Feed 问题”，而不是单纯介绍 Spark 能看到哪些 Catalog 字段。",
    },
    previewModule: {
      title: "Catalog 监控演示预留位",
      description: "适合放被拒商品、缺字段、价格不匹配和商品与广告表现关联分析的截图或短视频。",
      type: "placeholder",
      highlights: ["Catalog 同步检查", "商品被拒识别", "商品与广告表现关联"],
      note: "即使先用静态素材，也要强调这是“为什么爆品突然不花钱”的排查过程，而不是一个 Catalog 功能列表。",
    },
    audience: [
      "同时管理 Shopify 商品数据和广告 Catalog 的团队",
      "负责 Feed 卫生、商品被拒和 Catalog 同步的运营负责人",
      "需要判断商品问题究竟出在广告层还是 Feed 层的商家",
    ],
    signals: [
      "广告突然不花钱，但 Campaign 本身看起来没明显问题",
      "部分商品被拒、字段缺失或价格与前台不一致",
      "团队不知道应该优先修哪个 Feed 错误，才最影响营收",
    ],
    workflow: [
      {
        title: "先把 Shopify 商品和广告 Catalog 状态接起来",
        description: "不要只看广告投放层，而是把商品数据、Catalog 状态和广告表现一起放进同一个排查视图。",
      },
      {
        title: "看 Feed 错误和被拒商品",
        description: "先找出缺图、字段不完整、价格不匹配和商品被拒这些真正影响投放的问题。",
      },
      {
        title: "按业务影响排序修复优先级",
        description: "结合商品与广告表现的关联，优先修那些真正挡住营收的 Feed 问题，而不是平均用力。",
      },
    ],
    deliverables: [
      {
        title: "一个 Catalog 健康视图",
        description: "更快看到同步状态、被拒商品和字段质量问题，而不是散落在多个平台里分别查。",
      },
      {
        title: "一份有优先级的修复清单",
        description: "团队知道哪些 Feed 问题只是噪音，哪些已经真的影响广告表现。",
      },
      {
        title: "商品和广告之间的上下文关联",
        description: "Catalog 问题不再是孤立的技术问题，而能和真实投放结果一起理解。",
      },
    ],
    outcomes: [
      "更早发现 Catalog 和 Feed 问题",
      "减少爆品因 Feed 错误造成的营收损失",
      "让团队先修最影响付费增长的商品问题",
    ],
    faq: [
      {
        question: "这只是一个 Feed 错误列表吗？",
        answer: "不是。更有价值的是它帮团队判断：现在广告跑不动，到底是 Campaign 问题，还是 Catalog / Feed 已经先把商品卡住了。",
      },
      {
        question: "为什么这适合放在 Spark，而不是单独做一个 Feed 工具页？",
        answer: "因为商家的真实工作不是“修字段”本身，而是判断这些字段问题和广告表现之间到底怎么连起来，并据此决定先修什么。",
      },
    ],
    ctaLabel: "联系我们",
    ctaHref: "/waitlist",
  },
  {
    slug: "spark-tracking-and-anomaly-alerts",
    productSlug: "spark-analytics-agent",
    category: "Tracking / 归因",
    title: "广告数据看起来失真时，先排查 Tracking，而不是误砍预算",
    description: "当花费异常上涨、转化突然消失，或者平台收入和 Shopify 收入开始明显对不上时，用 Spark 先判断问题是投放变差，还是 Tracking / 归因出了错。",
    heroTitle: "在把它认定为投放问题之前，先把数据问题排除掉",
    heroDescription:
      "用 Spark 检查 Pixel、Conversion 事件、花费异常和平台收入与 Shopify 收入的差异，让团队先知道是表现真的变差了，还是 Tracking 已经不可信，避免错误调预算。",
    keywordPlayground: {
      title: "关键词和页面角度预览",
      description: "通过平台组合、异常类型和 Tracking 层级，快速看这页更该偏异常预警还是归因排查。",
      variables: [
        {key: "platforms", label: "平台组合", defaultValue: "Meta TikTok Google", placeholder: "Meta 和 Google"},
        {key: "issue", label: "异常类型", defaultValue: "tracking 异常", placeholder: "花费异常"},
        {key: "layer", label: "Tracking 层级", defaultValue: "Pixel 和转化事件", placeholder: "Shopify 收入对比"},
      ],
      templates: [
        {label: "主关键词", template: "{{platforms}}{{issue}}{{layer}}检查"},
        {label: "落地页角度", template: "如何在 {{platforms}} 出现 {{issue}} 时，先检查 {{layer}}，避免做出错误优化"},
      ],
      note: "这页应该先强调“为什么预算判断会被坏数据带偏”，而不是先讲 Spark 支持哪些异常提醒。",
    },
    previewModule: {
      title: "Tracking 预警演示预留位",
      description: "适合放 Pixel 预警、Conversion 缺失、收入对比和花费异常报警的截图或短视频。",
      type: "placeholder",
      highlights: ["Pixel / Conversion 状态", "花费异常提醒", "Shopify 与平台收入对比"],
      note: "就算先不接真实告警，也可以先用静态案例把“误判预算”的痛点讲透。",
    },
    audience: [
      "同时跑多平台广告并依赖 Pixel / Conversion 数据做判断的团队",
      "需要更早发现 Tracking 与归因漂移的投手和运营负责人",
      "经常把广告平台收入和 Shopify 收入放在一起校验的商家",
    ],
    signals: [
      "花费突然变高，但转化趋势没有跟上",
      "Purchase、Add to Cart 等关键事件开始缺失、重复或延迟",
      "广告平台收入和 Shopify 收入的差异开始明显扩大",
    ],
    workflow: [
      {
        title: "先把异常和 Tracking 信号放到一起看",
        description: "不要把花费异常、转化事件和归因差异拆散在多个工具里分别判断。",
      },
      {
        title: "先区分是真变差，还是数据先坏了",
        description: "先判断是投放表现本身走弱，还是 Pixel、Conversion、归因链路已经让数据不可信。",
      },
      {
        title: "把预警转成下一步动作",
        description: "再决定下一步应该是验证、修 Tracking、保护预算，还是回到平台做更深层排查。",
      },
    ],
    deliverables: [
      {
        title: "一个异常与 Tracking 联合视图",
        description: "把花费异常、事件状态和归因差异放进同一个操作上下文里理解。",
      },
      {
        title: "更清楚的问题分诊",
        description: "团队可以更快分辨这是数据问题还是投放问题。",
      },
      {
        title: "更可靠的预算判断基础",
        description: "减少因为坏数据而做出错误加减预算决定的概率。",
      },
    ],
    outcomes: [
      "更早发现坏数据",
      "减少因为 Tracking 异常导致的误判",
      "让归因争议更快回到证据和行动层",
    ],
    faq: [
      {
        question: "这能替代更底层的技术排查吗？",
        answer: "不能。Spark 更像更早的预警和分诊层，真正的底层技术验证仍可能需要工程或广告平台侧继续处理。",
      },
      {
        question: "为什么要把花费异常和 Tracking 检查放在同一个场景里？",
        answer: "因为商家真实遇到的往往就是这两件事同时出现：Spend 看起来不对、转化突然少了，而第一步恰恰是先判断问题到底出在表现，还是出在数据可信度。",
      },
    ],
    ctaLabel: "联系我们",
    ctaHref: "/waitlist",
  },
  {
    slug: "translator-new-market-launch",
    productSlug: "translator",
    category: "新市场上线",
    title: "进入新市场前，不再靠人工把整店本地化拖成几周项目",
    description: "当英文店铺准备进入德国、法国或日本市场时，用 Ciwi 一次性覆盖 Products、Theme、SEO、Metafields 和图片内容，而不是上线一个“半翻译”的版本。",
    heroTitle: "新市场要上线时，先把整店本地化速度拉到和业务节奏匹配",
    heroDescription:
      "用 Ciwi AI Translator 把商品、主题、SEO、Metafields、图片文字和 Alt Text 一起纳入翻译流程，让团队在几天甚至几小时内完成过去需要人工团队数周才能推进完的整店本地化。",
    keywordPlayground: {
      title: "关键词和页面角度预览",
      description: "把市场、语言和站点范围填进去，先看这页 use case 更适合怎么承接新市场上线相关搜索。",
      variables: [
        {key: "market", label: "目标市场", defaultValue: "德国", placeholder: "日本"},
        {key: "language", label: "目标语言", defaultValue: "德语", placeholder: "日语"},
        {key: "scope", label: "站点范围", defaultValue: "Shopify 店铺", placeholder: "Shopify 商品和主题内容"},
      ],
      templates: [
        {label: "主关键词", template: "{{market}}{{language}}{{scope}}上线"},
        {label: "落地页角度", template: "如何为 {{market}} 更快上线 {{language}}{{scope}}，而不必重做整套本地化流程"},
      ],
      note: "即使还没有把翻译体验直接嵌进官网，这个 use case 页面也已经可以先承担模板化 SEO 页的作用。",
    },
    previewModule: {
      title: "Translator 演示位",
      description: "先用现有 Translator 演示作为证明模块，后续如果需要，再替换成更聚焦“新市场上线”的专项视频。",
      type: "video",
      videoUrl: "https://www.youtube.com/embed/rAFB3AuXuH0?si=6v-NjiENBOqvREy-",
      caption: "当前先复用通用 Translator 演示，未来可以替换成更贴合该 use case 的市场上线流程视频。",
      highlights: ["主题和结构化内容覆盖", "Glossary 控制", "上线范围完整性"],
    },
    audience: [
      "第一次进入新国家或新语言市场的 Shopify 团队",
      "需要覆盖的不只是商品文案，而是整站关键内容的品牌",
      "希望缩短从决策到多语言上线时间的运营团队",
    ],
    signals: [
      "你已经确定要进新市场，需要尽快上线对应语言版本",
      "手工导出翻译经常漏掉主题或结构化内容",
      "团队希望先更快上线第一版，再逐步优化质量",
    ],
    workflow: [
      {
        title: "先明确哪些内容必须一起上线",
        description: "把商品文案、主题区块、FAQ、导航和结构化字段一起纳入范围，避免上线后前台内容割裂。",
      },
      {
        title: "结合 glossary 和模型策略执行翻译",
        description: "按市场和语言批量翻译，同时尽量保持品牌术语和语气稳定。",
      },
      {
        title: "上线后继续同步后续更新",
        description: "让第一次上线不是一次性项目，而是后续还能持续维护的流程。",
      },
    ],
    deliverables: [
      {
        title: "更完整的首发翻译范围",
        description: "不只覆盖商品描述，还覆盖对前台体验有影响的关键结构化内容。",
      },
      {
        title: "更稳定的术语一致性",
        description: "通过 glossary 让品牌词和商品术语更不容易漂移。",
      },
      {
        title: "后续更新也能延续的流程",
        description: "第一次上线之后，后面的多语言维护成本不会立刻失控。",
      },
    ],
    outcomes: [
      "更快上线多语言店铺",
      "减少关键页面和结构化内容遗漏",
      "为后续更新建立更可持续的本地化流程",
    ],
    faq: [
      {
        question: "这只是翻译商品描述吗？",
        answer: "不是。这个场景的重点恰恰在于商品、主题、FAQ、导航、图片和结构化字段能一起进入流程。",
      },
      {
        question: "为什么不用普通翻译工具？",
        answer: "因为商家的真实问题通常不只是文本翻译，而是 Shopify 结构化内容覆盖和后续同步维护，这也是很多通用工具最容易断层的地方。",
      },
    ],
    ctaLabel: "安装到 Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
    featured: true,
  },
  {
    slug: "translator-auto-sync-localization",
    productSlug: "translator",
    category: "自动同步",
    title: "多语言商店持续更新时，不再靠人工反复补翻和检查",
    description: "当商家不断新增 SKU、修改商品描述和更新促销内容时，用 Ciwi 自动把新增和变更内容重新送进翻译流程，避免其他语言版本越来越旧。",
    heroTitle: "让多语言店铺长期保持同步，而不是每次更新后再人工补救",
    heroDescription:
      "用 Ciwi AI Translator 把商品、主题和其他店铺内容的新增与修改自动送回翻译流程，让多语言版本持续接近主语言店铺，而不是每次更新后再逐个市场人工检查。",
    keywordPlayground: {
      title: "关键词和页面角度预览",
      description: "通过更新频率、内容范围和同步目标，快速试出这页更该偏“自动同步”还是“多语言长期维护”。",
      variables: [
        {key: "cadence", label: "更新频率", defaultValue: "每天都有商品变更", placeholder: "每周都有活动更新"},
        {key: "scope", label: "内容范围", defaultValue: "商品和主题内容", placeholder: "商品和 SEO 内容"},
        {key: "goal", label: "同步目标", defaultValue: "保持所有语言版本最新", placeholder: "减少人工维护"},
      ],
      templates: [
        {label: "主关键词", template: "{{scope}}{{cadence}}翻译自动同步"},
        {label: "落地页角度", template: "如何在 {{cadence}} 下实现 {{scope}} 的 {{goal}}"},
      ],
      note: "重点是强调真正让团队疲惫的不是第一次翻译，而是上线之后长期反复补翻的维护负担。",
    },
    previewModule: {
      title: "自动同步演示位",
      description: "适合展示新增商品、内容修改和自动回流翻译的流程，让这个场景更像真实维护动作。",
      type: "placeholder",
      highlights: ["检测新增内容", "自动回流翻译", "减少语言版本过期"],
      note: "哪怕先放静态流程图，也足以说明这个 use case 解决的是长期维护问题，而不是一次性上线问题。",
    },
    audience: [
      "上线后还会频繁新增商品和改内容的团队",
      "没有独立本地化团队、却要维护多个市场的运营负责人",
      "已经上线多语言店铺，但总发现次级语言越来越旧的商家",
    ],
    signals: [
      "主语言店铺一更新，其他语言版本很快就落后",
      "团队经常手工检查每个市场有没有漏翻",
      "活动和新品在一个市场上线了，其他语言版本却没跟上",
    ],
    workflow: [
      {
        title: "先识别源店铺里哪些内容发生了变化",
        description: "把新增商品、内容修改和页面变更自动识别出来，而不是等团队凭记忆回头补翻。",
      },
      {
        title: "把变化重新送进翻译流程",
        description: "让新增和改动内容自动进入对应市场和语言的翻译流程，不再靠人工一条条追着处理。",
      },
      {
        title: "让多语言版本持续接近主店铺",
        description: "把多语言维护从“补洞”变成稳定同步，让各市场版本不会越跑越散。",
      },
    ],
    deliverables: [
      {
        title: "一套长期同步的本地化流程",
        description: "多语言维护不再是一次性项目后面的人工收尾，而是持续可运行的系统。",
      },
      {
        title: "更少的过期语言页面",
        description: "新品、促销和商品内容变更更不容易只停留在主语言市场。",
      },
      {
        title: "更低的人工维护负担",
        description: "团队不必每次更新后都逐个市场检查哪里又落下了。",
      },
    ],
    outcomes: [
      "让多语言内容持续保持最新",
      "减少漏翻和过期内容",
      "把运营时间从反复补翻中解放出来",
    ],
    faq: [
      {
        question: "这个场景只是针对商品吗？",
        answer: "不是。它的价值恰恰在于商品、主题、SEO 和其他店铺层内容都在持续变化，而团队不可能每次都手工追踪。",
      },
      {
        question: "为什么这要单独作为一个 use case？",
        answer: "因为很多商家第一次上线并不慢，真正长期消耗团队精力的是上线后每次内容更新都会让多语言版本重新失步。",
      },
    ],
    ctaLabel: "安装到 Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
    featured: true,
  },
  {
    slug: "translator-brand-voice-control",
    productSlug: "translator",
    category: "品牌语气控制",
    title: "让翻译更像品牌自己写的，而不是一眼就能看出的机器直译",
    description: "当品牌已经有明确语气、术语和命名规则时，用 Custom Prompt 和 Glossary 把品牌词、材质名、成分词和行业术语稳定下来，减少“翻得通但不像品牌”的问题。",
    heroTitle: "当翻译质量直接影响品牌感知时，先把语气和术语控制住",
    heroDescription:
      "用 Ciwi AI Translator 的 Custom Prompt 和 Glossary 能力，让本地化内容更接近品牌自己的表达方式，而不是每个页面都像不同的人或不同机器临时翻出来的版本。",
    keywordPlayground: {
      title: "关键词和页面角度预览",
      description: "通过品牌类型、关键术语和语气目标，快速试出这页更该偏“品牌一致性”还是“降低人工审校成本”。",
      variables: [
        {key: "brandType", label: "品牌类型", defaultValue: "美妆品牌", placeholder: "保健品牌"},
        {key: "termType", label: "关键术语", defaultValue: "成分词和产品名", placeholder: "材质名和系列名"},
        {key: "goal", label: "语气目标", defaultValue: "像品牌自己写的", placeholder: "减少人工改稿"},
      ],
      templates: [
        {label: "主关键词", template: "{{brandType}}{{termType}}翻译语气控制"},
        {label: "落地页角度", template: "如何让 {{brandType}} 的 {{termType}} 翻译更 {{goal}}"},
      ],
      note: "这页应该强调品牌质感和表达一致性，而不是只强调翻译速度。",
    },
    previewModule: {
      title: "品牌语气证明模块",
      description: "适合放普通机器翻译与 Prompt / Glossary 控制后版本的前后对比，直接展示差异。",
      type: "placeholder",
      highlights: ["Custom Prompt 示例", "Glossary 锁词", "品牌语气对比"],
      note: "哪怕只用静态对比图，也能让商家立即理解为什么这个场景不是普通翻译页的重复。",
    },
    audience: [
      "已经建立品牌语气的成长型品牌",
      "有大量成分词、材质词或商品命名规范的团队",
      "厌倦每个市场都在重复人工改机器翻译的运营负责人",
    ],
    signals: [
      "翻译虽然通顺，但读起来不像品牌自己写的",
      "品牌词和行业术语在不同页面和不同语言里反复漂移",
      "人工审校团队总在重复修同一类表达问题",
    ],
    workflow: [
      {
        title: "先定义品牌语气和关键术语",
        description: "先把品牌语气、高价值词汇和必须稳定的表达整理出来，再大规模推进翻译。",
      },
      {
        title: "通过 Prompt 和 Glossary 控制输出",
        description: "让 Ciwi 的翻译结果带着品牌规则走，而不是每次都从没有约束的机器翻译开始。",
      },
      {
        title: "把同一套规则复用到后续内容",
        description: "新品、活动页和未来新增市场都沿用同一套品牌语言约束，而不是每次重新训练人工习惯。",
      },
    ],
    deliverables: [
      {
        title: "更稳定的品牌语言层",
        description: "品牌词、产品名和关键术语在不同页面、不同市场之间更容易保持一致。",
      },
      {
        title: "更低的人工改稿成本",
        description: "团队不用再反复修同类语气和术语问题。",
      },
      {
        title: "更像品牌自己的多语言内容",
        description: "不同语言版本更接近同一个品牌，而不是各自散开。",
      },
    ],
    outcomes: [
      "减少术语漂移",
      "降低人工审校成本",
      "让多语言内容更贴近品牌表达",
    ],
    faq: [
      {
        question: "这个场景只是控制商品名吗？",
        answer: "不是。它同样适用于成分词、材质名、营销表达和其他会直接影响品牌感知的高价值语言元素。",
      },
      {
        question: "为什么它要单独作为一个 use case？",
        answer: "因为很多团队真正痛的不是翻译太慢，而是翻出来的内容虽然能用，却完全不像品牌自己写的。",
      },
    ],
    ctaLabel: "安装到 Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
    featured: true,
  },
  {
    slug: "translator-market-specific-localization",
    productSlug: "translator",
    category: "市场本地化",
    title: "针对不同国家做真正本地化，而不是一份翻译覆盖所有国家",
    description: "当同样是葡萄牙语、西班牙语或英语，不同国家的表达习惯并不一样时，用 Ciwi 为不同目标市场设置不同规则，而不是把一个语言版本硬套所有国家。",
    heroTitle: "同一种语言进入多个国家时，先把“市场差异”当成问题来处理",
    heroDescription:
      "用 Ciwi AI Translator 按目标市场设置不同语言规则、Prompt 和术语，让不同国家的消费者看到更符合当地表达习惯的内容，而不是千篇一律的泛化翻译。",
    keywordPlayground: {
      title: "关键词和页面角度预览",
      description: "通过语言家族、目标市场和本地化目标，快速试出这页更应该偏“市场适配”还是“语言覆盖”。",
      variables: [
        {key: "language", label: "语言家族", defaultValue: "西班牙语", placeholder: "葡萄牙语"},
        {key: "markets", label: "目标市场", defaultValue: "西班牙和墨西哥", placeholder: "巴西和葡萄牙"},
        {key: "goal", label: "本地化目标", defaultValue: "更贴合当地消费者习惯", placeholder: "避免一稿通吃"},
      ],
      templates: [
        {label: "主关键词", template: "{{language}}{{markets}}按市场本地化"},
        {label: "落地页角度", template: "如何在 {{markets}} 中实现 {{goal}}，而不是用一份 {{language}} 翻译覆盖全部国家"},
      ],
      note: "这页的重点不是“同一种语言怎么翻”，而是“同一种语言如何在不同国家读起来真的像本地内容”。",
    },
    previewModule: {
      title: "市场差异演示模块",
      description: "适合放一个通用翻译版本和不同国家本地化版本的对比，让差异更直观。",
      type: "placeholder",
      highlights: ["市场级 Prompt", "国家级术语差异", "更贴近当地表达"],
      note: "用示例比解释更有效，因为商家可以马上看出为什么不能只做语言级覆盖。",
    },
    audience: [
      "进入多个同语种国家的品牌",
      "知道“语言一致”不代表“市场适配”的团队",
      "希望在多国市场里提高内容贴近度的运营负责人",
    ],
    signals: [
      "同一种语言在不同国家里读起来太泛或太生硬",
      "不同国家的消费者对相同文案反应差异很大",
      "团队需要更细的市场控制，但又不想拆成完全独立的人工作业流",
    ],
    workflow: [
      {
        title: "先识别哪些国家需要单独适配",
        description: "把真正需要在表达、词汇或购买语境上区分开的国家先识别出来。",
      },
      {
        title: "按市场设置规则和 Prompt",
        description: "让 Ciwi 为不同国家输出更贴合当地习惯的版本，而不是复用一份泛化语言输出。",
      },
      {
        title: "在统一流程里维护差异化内容",
        description: "保持同一套本地化体系下的市场差异，而不是为每个国家重建一条完全独立流程。",
      },
    ],
    deliverables: [
      {
        title: "更贴近当地消费者的内容",
        description: "同一种语言在不同国家里更接近真实本地表达，而不是简单换词。",
      },
      {
        title: "更强的市场级控制能力",
        description: "团队能针对国家差异做本地化，而不必把流程彻底拆散。",
      },
      {
        title: "更可信的前台体验",
        description: "消费者感受到的是针对本市场优化过的内容，而不是被共享的翻译模板。",
      },
    ],
    outcomes: [
      "提升市场适配度",
      "避免一份翻译覆盖所有国家的生硬感",
      "让内容更接近当地消费者习惯",
    ],
    faq: [
      {
        question: "这和普通多语言翻译有什么区别？",
        answer: "区别在于问题不再只是“有没有这个语言”，而是“同一种语言在不同国家里到底是不是一个市场体验”。",
      },
      {
        question: "只有大品牌才需要这个能力吗？",
        answer: "不是。小团队如果能提前做一点市场级适配，反而更容易避免把多个国家都做成同样的泛化版本。",
      },
    ],
    ctaLabel: "安装到 Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
  },
  {
    slug: "translator-scope-based-translation",
    productSlug: "translator",
    category: "成本控制",
    title: "大型 SKU 商店只翻真正需要卖的内容，而不是整店全量翻译",
    description: "当店铺有几千甚至几万 SKU，但目标市场只会卖其中一部分时，用 Ciwi 按 Collection、Tag、Vendor、商品状态或 Market 选择翻译范围，控制成本同时提高覆盖效率。",
    heroTitle: "如果不是所有商品都进目标市场，就不要为所有商品支付同样的翻译成本",
    heroDescription:
      "用 Ciwi AI Translator 按商品集合、标签、Vendor、商品状态和 Market 选择真正需要翻译的范围，让大型目录店铺把本地化预算优先投向真正会卖的内容。",
    keywordPlayground: {
      title: "关键词和页面角度预览",
      description: "通过目录规模、筛选方式和成本目标，快速试出这页更该偏“降低翻译浪费”还是“优先本地化高价值内容”。",
      variables: [
        {key: "catalogSize", label: "目录规模", defaultValue: "一万 SKU 店铺", placeholder: "三千 SKU 店铺"},
        {key: "filter", label: "筛选方式", defaultValue: "Collection 和 Market", placeholder: "Tag 和 Vendor"},
        {key: "goal", label: "成本目标", defaultValue: "减少无效翻译成本", placeholder: "优先覆盖可售商品"},
      ],
      templates: [
        {label: "主关键词", template: "{{catalogSize}}{{filter}}选择性翻译"},
        {label: "落地页角度", template: "如何在 {{catalogSize}} 中通过 {{filter}} 实现 {{goal}}，而不是整店全量翻译"},
      ],
      note: "大型目录商家真正关心的往往不是“能不能翻”，而是“值不值得翻全部”。",
    },
    previewModule: {
      title: "选择性翻译演示模块",
      description: "适合展示按 Collection、Tag、Vendor、商品状态或 Market 选择翻译范围的过程。",
      type: "placeholder",
      highlights: ["按 Collection 翻译", "按 Market 控制范围", "降低无效翻译消耗"],
      note: "一个简单的范围选择流程图就足够让商家代入这个 use case。",
    },
    audience: [
      "大 SKU 目录店铺",
      "需要平衡本地化覆盖率和预算的运营团队",
      "知道并不是每个商品都值得在每个市场翻译的商家",
    ],
    signals: [
      "目录太大，不适合无差别全量翻译",
      "很多商品并不进入目标市场或当前不活跃",
      "翻译成本增长速度快于本地化带来的价值",
    ],
    workflow: [
      {
        title: "先确定哪些内容真正会卖",
        description: "先按 Collection、Tag、Vendor、商品状态和 Market 选出真正进入目标市场的内容。",
      },
      {
        title: "只翻需要的目录范围",
        description: "把翻译预算投给真正会影响该市场销售的商品，而不是把所有 SKU 一视同仁。",
      },
      {
        title: "随业务推进再逐步扩展覆盖",
        description: "随着市场验证和商品表现，再逐步增加翻译范围，而不是一开始就背上整店成本。",
      },
    ],
    deliverables: [
      {
        title: "更有价值的翻译范围",
        description: "预算优先用于真正会进入目标市场和影响销售的商品内容。",
      },
      {
        title: "更低的无效翻译消耗",
        description: "避免把大量预算花在当前不会销售、不会展示或不重要的内容上。",
      },
      {
        title: "更高的关键内容覆盖率",
        description: "重点商品和重点系列可以更早获得完整本地化，而不是被整店工程拖住。",
      },
    ],
    outcomes: [
      "降低不必要的翻译成本",
      "提高高价值商品的本地化覆盖率",
      "让大型目录本地化更可控",
    ],
    faq: [
      {
        question: "这个场景只是为了省钱吗？",
        answer: "不只是。它同样是在争取速度，让真正该卖的商品更早完成本地化，而不是被整个目录的体量拖慢。",
      },
      {
        question: "为什么选择性翻译要单独做成一个 use case？",
        answer: "因为对大型目录商家来说，最现实的障碍通常不是翻译质量，而是整店全量翻译的成本和操作负担根本不成立。",
      },
    ],
    ctaLabel: "安装到 Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
  },
  {
    slug: "translator-visual-localization",
    productSlug: "translator",
    category: "视觉本地化",
    title: "解决“文字翻了，但网站看起来仍然不像本地商店”的问题",
    description: "当商品描述已经翻译完成，但 Banner、商品图片、图片文字和 Alt Text 仍然是英文时，用 Ciwi 把视觉层也一起本地化，让消费者看到更完整的一致性体验。",
    heroTitle: "如果视觉层还停留在原语言，消费者依然不会觉得这是一家真正本地化的商店",
    heroDescription:
      "用 Ciwi AI Translator 做图片文字翻译、语言专属图片和 Alt Text 本地化，让多语言店铺不只是“文字被翻译了”，而是整体看起来都更像本地市场的购物体验。",
    keywordPlayground: {
      title: "关键词和页面角度预览",
      description: "通过视觉载体、缺口类型和本地化目标，快速试出这页更该偏“图片内容本地化”还是“完整店铺体验”。",
      variables: [
        {key: "surface", label: "视觉载体", defaultValue: "Banner 和商品图片", placeholder: "商品详情图和促销视觉"},
        {key: "gap", label: "缺口类型", defaultValue: "文字翻了但视觉没翻", placeholder: "Alt Text 仍然是英文"},
        {key: "goal", label: "体验目标", defaultValue: "更像本地商店", placeholder: "减少半翻译页面"},
      ],
      templates: [
        {label: "主关键词", template: "{{surface}}{{gap}}本地化"},
        {label: "落地页角度", template: "如何通过 {{surface}} 解决“{{gap}}”问题，让店铺更 {{goal}}"},
      ],
      note: "这里要强调的是消费者体验，而不是单纯的图片翻译功能。",
    },
    previewModule: {
      title: "视觉本地化演示模块",
      description: "适合放 Banner、商品图、图片文字和 Alt Text 本地化前后的对比。",
      type: "placeholder",
      highlights: ["图片文字翻译", "语言专属图片", "Alt Text 本地化"],
      note: "静态截图就很有效，因为商家能一眼看到为什么“只翻文字”仍然不够。",
    },
    audience: [
      "视觉素材很多的品牌",
      "已经翻了文案，但仍觉得店铺不像本地化商店的团队",
      "重视完整购物体验的运营负责人",
    ],
    signals: [
      "Banner 和图片仍然停留在原语言",
      "页面文字已经本地化，但视觉内容混着英文",
      "多语言店铺看起来仍然像“半翻译状态”",
    ],
    workflow: [
      {
        title: "先找到仍停留在原语言的视觉层",
        description: "把图片文字、Banner、促销视觉和 Alt Text 等视觉内容层面的缺口找出来。",
      },
      {
        title: "让视觉内容和文字内容一起本地化",
        description: "通过 Ciwi 同步处理图片文字、语言专属图片和 Alt Text，而不是只改页面正文。",
      },
      {
        title: "把本地化体验从“文字层”扩展到“感知层”",
        description: "让消费者看到的是更完整一致的本地购物体验，而不是翻译过但仍显得陌生的页面。",
      },
    ],
    deliverables: [
      {
        title: "更完整的本地化前台体验",
        description: "文字和视觉内容不再各说各话，而是更一致地服务于同一个目标市场。",
      },
      {
        title: "更高的视觉内容本地化覆盖",
        description: "Banner、商品图和 Alt Text 不再滞后于正文内容。",
      },
      {
        title: "更像本地店铺的整体感受",
        description: "消费者更容易把店铺视为面向本市场准备过的版本，而不是简单翻译副本。",
      },
    ],
    outcomes: [
      "减少半翻译的视觉体验",
      "提升本地化完成度感知",
      "让店铺更像真正的本地市场版本",
    ],
    faq: [
      {
        question: "这更像设计问题还是翻译问题？",
        answer: "两者都有。就算文字翻译正确，如果图片和视觉层还停留在原语言，消费者仍然会把整个店铺视为未完成状态。",
      },
      {
        question: "为什么视觉本地化要单独做成一个 use case？",
        answer: "因为很多商家以为“文字翻完就算本地化完成”，但消费者实际感受到的是整个前台，而不是只看正文。",
      },
    ],
    ctaLabel: "安装到 Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
  },
  {
    slug: "translator-seo-coverage-localization",
    productSlug: "translator",
    category: "SEO 本地化",
    title: "提高海外自然搜索覆盖，不再让 SEO 层停留在原语言",
    description: "当店铺已经有海外流量，但 Meta Title、Description 和图片 Alt 仍是原语言时，用 Ciwi 批量本地化 SEO 层，让搜索引擎看到更完整的目标语言内容。",
    heroTitle: "如果搜索引擎看到的还是原语言字段，市场就拿不到完整的 SEO 红利",
    heroDescription:
      "用 Ciwi AI Translator 一起处理 Meta Title、Meta Description、商品内容和图片 Alt Text，让每个目标市场都拥有更完整的目标语言内容基础，而不是正文翻译了、SEO 仍然停留在源语言。",
    keywordPlayground: {
      title: "关键词和页面角度预览",
      description: "通过目标市场、SEO 载体和覆盖目标，快速试出这页更该偏“国际 SEO 内容覆盖”还是“SEO 字段补全”。",
      variables: [
        {key: "market", label: "目标市场", defaultValue: "法语市场", placeholder: "德语市场"},
        {key: "surface", label: "SEO 载体", defaultValue: "Meta 和 Alt Text", placeholder: "商品 SEO 和图片 Alt"},
        {key: "goal", label: "覆盖目标", defaultValue: "提高目标语言内容覆盖", placeholder: "支持海外自然搜索"},
      ],
      templates: [
        {label: "主关键词", template: "{{market}}{{surface}}SEO 本地化"},
        {label: "落地页角度", template: "如何通过 {{surface}} 本地化实现 {{market}} 的 {{goal}}"},
      ],
      note: "这页要说明很多国际 SEO 的短板，来自于 SEO 层内容长期没有跟随本地化一起完成。",
    },
    previewModule: {
      title: "SEO 本地化演示模块",
      description: "适合放原语言 SEO 字段与本地化后版本的对比，让缺口一眼可见。",
      type: "placeholder",
      highlights: ["Meta 本地化", "商品 SEO 补全", "Alt Text 本地化"],
      note: "SEO 场景很适合用前后对比，因为商家能马上看出内容覆盖层面的缺口。",
    },
    audience: [
      "已经开始获取海外流量的品牌",
      "希望提升多语言自然搜索覆盖的团队",
      "知道商品正文翻了，但 SEO 层还没跟上的运营负责人",
    ],
    signals: [
      "Meta Title 和 Description 仍停留在原语言",
      "图片 Alt Text 没有在多语言店铺里同步本地化",
      "搜索引擎在目标市场看不到足够完整的目标语言内容",
    ],
    workflow: [
      {
        title: "先检查 SEO 层是否仍停留在原语言",
        description: "不要只看页面正文，而是把 Meta、Alt Text 和其他 SEO 相关字段也一起检查。",
      },
      {
        title: "批量补齐目标语言 SEO 内容",
        description: "用 Ciwi 本地化对搜索引擎最关键的字段，而不是只停留在正文翻译完成。",
      },
      {
        title: "让目标市场拥有更完整的内容基础",
        description: "让每个语言市场都拥有更完整的目标语言内容层，从而支撑后续自然搜索增长。",
      },
    ],
    deliverables: [
      {
        title: "更完整的多语言 SEO 层",
        description: "Meta、商品内容和 Alt Text 在各市场间更一致地完成本地化。",
      },
      {
        title: "更高的目标语言内容覆盖率",
        description: "搜索引擎能在目标市场读到更完整的目标语言信息，而不是混合字段。",
      },
      {
        title: "更少的 SEO 本地化缺口",
        description: "重要的 SEO 字段不再因为上线后被遗忘而长期停留在源语言。",
      },
    ],
    outcomes: [
      "提升国际 SEO 准备度",
      "扩展目标语言内容覆盖",
      "减少 SEO 层未翻译缺口",
    ],
    faq: [
      {
        question: "这能直接保证排名上涨吗？",
        answer: "不能直接保证，但它能修复一个非常常见的问题：页面正文翻了，搜索引擎实际读到的 Meta 和 Alt 层却仍然是原语言或混合状态。",
      },
      {
        question: "为什么 SEO 本地化要单独做成一个 use case？",
        answer: "因为很多商家先翻了前台可见内容，却忘了 SEO 层才是后续自然搜索覆盖扩张时最容易断层的部分。",
      },
    ],
    ctaLabel: "安装到 Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
  },
  {
    slug: "translator-quality-recovery",
    productSlug: "translator",
    category: "迁移修复",
    title: "从其他翻译工具迁移后，不推倒重来也能逐步修复历史翻译质量",
    description: "当旧工具留下重复、遗漏、错误或风格不一致的翻译时，用 Ciwi 导入已有翻译、扫描缺口，再按 Glossary 和 Prompt 对重点内容逐步重翻，而不是整店重做一遍。",
    heroTitle: "迁移之后，不必从零开始，先把最影响质量的历史问题一点点修回来",
    heroDescription:
      "用 Ciwi AI Translator 导入历史翻译、识别缺失内容和低质量区域，并针对重点内容重新翻译，让店铺在不彻底推倒重来的情况下逐步恢复多语言质量。",
    keywordPlayground: {
      title: "关键词和页面角度预览",
      description: "通过迁移来源、问题类型和修复目标，快速试出这页更该偏“翻译迁移修复”还是“历史质量治理”。",
      variables: [
        {key: "source", label: "迁移来源", defaultValue: "其他翻译工具", placeholder: "旧的翻译流程"},
        {key: "issue", label: "主要问题", defaultValue: "遗漏和风格不一致", placeholder: "重复和低质量翻译"},
        {key: "goal", label: "修复目标", defaultValue: "逐步提升质量而不重来", placeholder: "修复历史翻译问题"},
      ],
      templates: [
        {label: "主关键词", template: "{{source}}{{issue}}迁移修复"},
        {label: "落地页角度", template: "如何在从 {{source}} 迁移后实现 {{goal}}，而不是整店重翻"},
      ],
      note: "这个 use case 的核心是让商家看到：迁移不等于清空重来，历史内容也可以渐进式修复。",
    },
    previewModule: {
      title: "迁移修复演示模块",
      description: "适合展示历史翻译导入、缺口扫描和指定内容重新翻译的流程。",
      type: "placeholder",
      highlights: ["导入历史翻译", "扫描缺失内容", "按优先级重翻"],
      note: "把它讲成“修复路径”会比讲成“重新翻译能力”更贴近商家迁移时的真实焦虑。",
    },
    audience: [
      "准备从旧翻译工具迁移的店铺",
      "已经积累了多年杂乱多语言内容的团队",
      "想改善翻译质量但不敢启动整店重做项目的品牌",
    ],
    signals: [
      "历史翻译里有很多重复、遗漏或风格不一致内容",
      "某些页面已经翻过，但质量明显无法继续沿用",
      "团队希望提升质量，但又没有资源把所有内容重做一遍",
    ],
    workflow: [
      {
        title: "先导入还能用的历史翻译",
        description: "把已有内容先纳入 Ciwi，而不是一上来就假设所有历史翻译都得丢弃。",
      },
      {
        title: "识别缺口和低质量区域",
        description: "先看哪些内容缺失、哪些内容老旧、哪些术语明显失控，再决定修哪里。",
      },
      {
        title: "按优先级逐步重翻",
        description: "结合 Glossary 和 Prompt，优先修对品牌体验和转化影响最大的内容，而不是平均用力。",
      },
    ],
    deliverables: [
      {
        title: "一条可执行的迁移修复路径",
        description: "商家可以在保留可用历史内容的同时，逐步修正真正有问题的部分。",
      },
      {
        title: "逐步变干净的多语言内容库",
        description: "缺失、重复和低质量翻译能被持续清理，而不是长期堆积。",
      },
      {
        title: "更少被浪费的历史工作",
        description: "旧内容里还能用的部分不必全部推翻重做。",
      },
    ],
    outcomes: [
      "逐步改善历史翻译质量",
      "避免整店重来式迁移",
      "用更少中断完成多语言内容清理",
    ],
    faq: [
      {
        question: "迁移后需要先删掉所有旧翻译吗？",
        answer: "不需要。更现实的做法是先导入已有内容、识别真正的问题点，再决定哪些地方值得重翻。",
      },
      {
        question: "为什么迁移修复要单独做成一个 use case？",
        answer: "因为很多商家不是从零开始做本地化，而是在接手一堆历史问题时，需要一条“先修什么、怎么修”的恢复路径。",
      },
    ],
    ctaLabel: "安装到 Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
  },
  {
    slug: "translator-ai-human-review-workflow",
    productSlug: "translator",
    category: "AI + 人工协作",
    title: "让人工翻译团队从“从零写”变成“审核和优化”",
    description: "当品牌不想完全依赖 AI，且核心市场仍需要本地团队审核时，用 Ciwi 先批量生成初稿，再导出给当地团队校对，最后重新导入。",
    heroTitle: "把人工翻译从从零开始，升级成对 AI 初稿做高价值审核",
    heroDescription:
      "用 Ciwi AI Translator 先完成大规模初稿，再导出给本地团队校对和修订，最后重新导入店铺，让人工团队把时间花在质量控制上，而不是从空白页开始翻译。",
    keywordPlayground: {
      title: "关键词和页面角度预览",
      description: "通过审核团队、内容范围和协作目标，快速试出这页更该偏“AI + 人工协同”还是“本地团队审核流程”。",
      variables: [
        {key: "team", label: "审核团队", defaultValue: "本地市场审核团队", placeholder: "区域品牌团队"},
        {key: "scope", label: "内容范围", defaultValue: "核心市场页面", placeholder: "重点商品内容"},
        {key: "goal", label: "协作目标", defaultValue: "让人工从审核开始", placeholder: "提升人工翻译效率"},
      ],
      templates: [
        {label: "主关键词", template: "{{scope}}AI 翻译 + 人工审核"},
        {label: "落地页角度", template: "如何让 {{team}} 在 {{scope}} 中实现 {{goal}}，而不是从零翻译"},
      ],
      note: "这个页面的重点是说明 AI 和人工不是替代关系，而是如何组合成更高效的工作流。",
    },
    previewModule: {
      title: "AI + 人工协作演示模块",
      description: "适合展示 AI 起草、导出审核、人工修订和重新导入的完整流程。",
      type: "placeholder",
      highlights: ["AI 初稿", "导出审核", "回流上线"],
      note: "一个流程图就能很好解释为什么这个 use case 解决的是团队协作问题，不只是翻译速度问题。",
    },
    audience: [
      "希望关键市场仍由本地团队审核的品牌",
      "把 AI 当规模工具、把人工当质量工具的运营团队",
      "不想让人工翻译团队从空白页开始工作的商家",
    ],
    signals: [
      "品牌不愿意完全采用纯 AI 翻译流程",
      "部分市场仍需要本地审核或品牌负责人确认",
      "人工翻译团队把大量时间消耗在起草而不是优化上",
    ],
    workflow: [
      {
        title: "先由 AI 生成大规模初稿",
        description: "让机器完成最耗时的第一轮覆盖，而不是让人工团队从头写每一句。",
      },
      {
        title: "导出给本地团队审核",
        description: "把重点市场内容交给本地团队做品牌对齐、用词修正和最终确认。",
      },
      {
        title: "把审核后的内容重新导入",
        description: "让前台最终上线的版本兼顾 AI 的规模效率和人工的质量把关。",
      },
    ],
    deliverables: [
      {
        title: "一条 AI + 人工混合工作流",
        description: "AI 负责规模，人工负责审核和提升，而不是两者互相重复劳动。",
      },
      {
        title: "更高的人工作业效率",
        description: "本地团队的时间被更多用在优化和校对上，而不是空白起稿。",
      },
      {
        title: "更灵活的市场质量控制",
        description: "不同市场可以选择不同程度的人工参与，而不必拆成完全不同的流程。",
      },
    ],
    outcomes: [
      "提升人工翻译团队效率",
      "保留重点市场的人为把关",
      "在规模化和质量控制之间取得更好平衡",
    ],
    faq: [
      {
        question: "这是不是说明 AI 翻译质量不够好？",
        answer: "不一定。更多时候是品牌对某些核心市场本来就需要额外把关，而 AI 最有价值的部分恰恰是先帮团队把初稿规模化完成。",
      },
      {
        question: "为什么 AI + 人工协作要单独做成一个 use case？",
        answer: "因为这个场景解决的不是“翻得更快”本身，而是“如何把 AI 的规模和人工的质量控制组合成一条不重复劳动的流程”。",
      },
    ],
    ctaLabel: "安装到 Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
  },
  {
    slug: "translator-localization-gap-audit",
    productSlug: "translator",
    category: "缺口扫描",
    title: "发现本地化缺口，避免新市场出现“半翻译”页面",
    description: "当商品翻译了，但 Theme、Metafields、图片或其他层还没跟上时，用 Ciwi 定期扫描未翻译和未同步内容，避免前台体验一层层断开。",
    heroTitle: "只要有一个内容层没翻完，消费者感受到的就仍然是一个未完成的本地化站点",
    heroDescription:
      "用 Ciwi AI Translator 扫描 Products、Theme、Metafields、图片和其他店铺层面的未翻译与未同步内容，让团队在消费者看到问题之前，先找到那些“半翻译”缺口。",
    keywordPlayground: {
      title: "关键词和页面角度预览",
      description: "通过缺失载体、问题类型和扫描目标，快速试出这页更该偏“本地化 QA”还是“翻译缺口检测”。",
      variables: [
        {key: "surface", label: "缺失载体", defaultValue: "Theme、Metafields 和图片", placeholder: "Theme 和 SEO 字段"},
        {key: "issue", label: "问题类型", defaultValue: "半翻译页面", placeholder: "内容不同步"},
        {key: "goal", label: "扫描目标", defaultValue: "快速发现本地化缺口", placeholder: "保持市场完整性"},
      ],
      templates: [
        {label: "主关键词", template: "{{surface}}{{issue}}本地化扫描"},
        {label: "落地页角度", template: "如何通过 {{surface}} 扫描实现 {{goal}}，避免 {{issue}}"},
      ],
      note: "这里要强调的是完整性检查，而不是再讲一遍“怎么翻译内容”。",
    },
    previewModule: {
      title: "缺口扫描演示模块",
      description: "适合放未翻译载体、未同步内容和修复清单的扫描示例。",
      type: "placeholder",
      highlights: ["未翻译内容扫描", "未同步内容识别", "完整性修复清单"],
      note: "一个 checklist 式模块就很适合这个场景，因为它本质上就是 QA 和修补流程。",
    },
    audience: [
      "上线后仍持续更新店铺内容的团队",
      "总怀疑某些内容层已经漏翻的运营负责人",
      "希望每个目标市场都看起来完整一致的品牌",
    ],
    signals: [
      "商品翻译了，但其他层还停留在原语言",
      "每次有新内容后，总会出现某些市场没跟上的情况",
      "团队无法快速知道哪些层仍存在本地化缺口",
    ],
    workflow: [
      {
        title: "跨多个内容层做扫描",
        description: "不要只看商品正文，而是同时检查 Theme、Metafields、图片、SEO 和相关内容层。",
      },
      {
        title: "识别未翻译和未同步缺口",
        description: "把真正导致“半翻译体验”的载体和字段找出来，而不是靠人工浏览页面碰运气发现。",
      },
      {
        title: "把缺口变成待修复清单",
        description: "让扫描结果直接形成下一步翻译或同步动作，而不是继续散落在团队脑中。",
      },
    ],
    deliverables: [
      {
        title: "更清晰的本地化覆盖地图",
        description: "团队更容易知道哪些内容层已经完成，哪些地方还存在明显缺口。",
      },
      {
        title: "更少的半翻译页面",
        description: "缺失或不同步内容能在问题扩大前被发现和处理。",
      },
      {
        title: "更稳定的多语言 QA 流程",
        description: "本地化完整性检查不再依赖偶然发现，而是变成可重复执行的动作。",
      },
    ],
    outcomes: [
      "更快发现缺失本地化",
      "减少不完整市场体验",
      "让多语言店铺长期更完整一致",
    ],
    faq: [
      {
        question: "这个场景只适合上线后用吗？",
        answer: "不是。它在上线前和上线后都重要，因为新内容和内容改动会不断重新制造本地化缺口。",
      },
      {
        question: "为什么缺口扫描值得单独做成一个 use case？",
        answer: "因为很多店铺的问题已经不是“有没有翻译能力”，而是“我到底还漏了哪些内容层，为什么前台仍看起来不完整”。",
      },
    ],
    ctaLabel: "安装到 Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
  },
  {
    slug: "translator-small-team-multi-market",
    productSlug: "translator",
    category: "团队效率",
    title: "小团队也能维护多个语言市场，而不是被重复翻译工作拖垮",
    description: "当品牌只有几个人，却同时经营欧洲、亚洲等多个市场时，用 Ciwi 的自动翻译、自动同步、Glossary、Prompt 和批量操作，把重复翻译工作压缩到最低。",
    heroTitle: "团队规模不变时，也能支撑更多市场，只要本地化不再吃掉整周时间",
    heroDescription:
      "用 Ciwi AI Translator 把自动翻译、自动同步、Glossary、Prompt 和批量操作组合起来，让小团队把更多时间从重复翻译工作转回到营销、商品和增长动作上。",
    keywordPlayground: {
      title: "关键词和页面角度预览",
      description: "通过团队规模、市场数量和效率目标，快速试出这页更该偏“多市场运营效率”还是“自动化翻译工作流”。",
      variables: [
        {key: "teamSize", label: "团队规模", defaultValue: "三人电商团队", placeholder: "小型增长团队"},
        {key: "marketCount", label: "市场数量", defaultValue: "五个语言市场", placeholder: "多个全球市场"},
        {key: "goal", label: "效率目标", defaultValue: "减少重复翻译工作", placeholder: "用更少人维护更多市场"},
      ],
      templates: [
        {label: "主关键词", template: "{{teamSize}}{{marketCount}}自动化翻译运营"},
        {label: "落地页角度", template: "如何让 {{teamSize}} 在 {{marketCount}} 中实现 {{goal}}"},
      ],
      note: "这页应该更像“运营杠杆”的故事，而不是一个纯翻译工具页。",
    },
    previewModule: {
      title: "小团队效率演示模块",
      description: "适合展示自动化、批量操作和同步流程如何一起减少团队的人力消耗。",
      type: "placeholder",
      highlights: ["自动化翻译", "批量操作", "更多市场更少人工"],
      note: "一个 lean team workflow 的示意图就能让这个场景很快成立。",
    },
    audience: [
      "需要同时支持多个市场的小型电商团队",
      "还无法组建独立本地化团队的创始人和运营负责人",
      "正在快速做国际扩张、但人手跟不上的品牌",
    ],
    signals: [
      "团队人数太少，无法手工支撑多个市场",
      "翻译工作不断挤压营销和增长时间",
      "本地化维护开始成为国际扩张的主要瓶颈",
    ],
    workflow: [
      {
        title: "先把重复翻译层自动化",
        description: "把最容易消耗团队时间的重复翻译和维护动作先交给自动化工作流处理。",
      },
      {
        title: "用轻量但稳定的规则保证质量",
        description: "通过 Glossary、Prompt 和批量控制，让市场越多时质量也不会快速失控。",
      },
      {
        title: "把团队时间释放回增长工作",
        description: "让团队从反复翻译和同步中脱身，把更多精力放回营销、选品和市场推进上。",
      },
    ],
    deliverables: [
      {
        title: "更高杠杆的本地化工作流",
        description: "团队能在不手工处理每个翻译任务的情况下支持更多市场。",
      },
      {
        title: "更少的重复运营劳动",
        description: "自动化和批量动作接住了原本最耗时的那部分翻译维护工作。",
      },
      {
        title: "更多可分配给增长的时间",
        description: "运营团队能把更多精力投回营销和业务增长，而不是翻译 housekeeping。",
      },
    ],
    outcomes: [
      "用更少人工支持更多市场",
      "降低小团队的本地化运营负担",
      "把团队时间从重复翻译转向增长",
    ],
    faq: [
      {
        question: "这个场景只适合很小的品牌吗？",
        answer: "不只适合小品牌，但它对正在扩张、却还没有足够人手支持多市场的团队尤其有价值。",
      },
      {
        question: "为什么团队效率值得单独作为一个 use case？",
        answer: "因为这里真正要解决的是组织问题：不是翻译能不能更快，而是一个小团队怎么在不崩溃的前提下支持更多市场。",
      },
    ],
    ctaLabel: "安装到 Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
  },
  {
    slug: "translator-consistency-at-scale",
    productSlug: "translator",
    category: "规模化一致性",
    title: "品牌扩张过程中，翻译一致性不会随着 SKU 和市场增加而越来越乱",
    description: "当 SKU、页面和市场越来越多，不同时间、不同人翻译出的术语和语气开始失控时，用 Ciwi 的 Glossary 和品牌 Prompt 维持持续一致性。",
    heroTitle: "随着内容规模和市场规模变大，先把翻译质量治理成系统，而不是继续靠经验维持",
    heroDescription:
      "用 Ciwi AI Translator 建立统一的 Glossary 和品牌 Prompt 规则，让新品、页面扩张和后续新市场继续沿用同一套语言标准，而不是每一次新增内容都再制造新的不一致。",
    keywordPlayground: {
      title: "关键词和页面角度预览",
      description: "通过扩张规模、内容类型和一致性目标，快速试出这页更该偏“翻译治理”还是“品牌规模化控制”。",
      variables: [
        {key: "scale", label: "扩张阶段", defaultValue: "SKU、页面和市场都在增加", placeholder: "目录快速扩张"},
        {key: "content", label: "内容类型", defaultValue: "商品、页面和活动内容", placeholder: "商品和结构化内容"},
        {key: "goal", label: "一致性目标", defaultValue: "让术语在规模增长中仍保持稳定", placeholder: "避免翻译越来越乱"},
      ],
      templates: [
        {label: "主关键词", template: "{{content}}翻译规模化一致性"},
        {label: "落地页角度", template: "如何在 {{scale}} 时实现 {{goal}}"},
      ],
      note: "这页要讲的是长期翻译治理，不只是某一次项目翻译速度。",
    },
    previewModule: {
      title: "规模化一致性演示模块",
      description: "适合展示统一 Glossary 和 Prompt 如何在后续翻译任务里持续生效。",
      type: "placeholder",
      highlights: ["统一 Glossary", "品牌 Prompt 复用", "后续任务继承规则"],
      note: "一个简单流程图就能说明：真正重要的不是今天翻得多快，而是未来每次新增内容还能不能继续保持一致。",
    },
    audience: [
      "SKU、页面和市场都在快速扩张的品牌",
      "有多人参与多语言内容维护的团队",
      "已经明显感受到术语和风格开始漂移的运营负责人",
    ],
    signals: [
      "不同人、不同时间生成的翻译越来越不一致",
      "随着页面和市场变多，多语言 QA 越来越困难",
      "品牌希望增长，但不想让语言质量跟着内容规模一起失控",
    ],
    workflow: [
      {
        title: "先把语言规则系统化",
        description: "把 Glossary 和品牌 Prompt 从零散经验变成一套全团队可复用的语言规范。",
      },
      {
        title: "让后续所有新增内容继承这套规则",
        description: "让新品、新页面和新市场继续沿用同一套语言治理，而不是每次重新从空白开始。",
      },
      {
        title: "在规模扩大时压住质量漂移",
        description: "把翻译一致性从“靠熟悉项目的人记住”变成“靠系统长期维持”。",
      },
    ],
    deliverables: [
      {
        title: "可复用的语言治理层",
        description: "团队把翻译标准沉淀成系统，而不是只存在于少数人的习惯里。",
      },
      {
        title: "更少的长期漂移",
        description: "后续新增内容不容易再制造新的术语和语气混乱。",
      },
      {
        title: "更可扩展的多语言运营体系",
        description: "内容规模变大时，翻译质量不必同步变乱。",
      },
    ],
    outcomes: [
      "在业务扩大时保护翻译一致性",
      "减少不同团队和不同阶段造成的语言混乱",
      "用更强的治理支撑更多市场扩张",
    ],
    faq: [
      {
        question: "这和 Glossary 控制是同一件事吗？",
        answer: "Glossary 是其中一部分，但更大的问题是：随着 SKU、页面、团队和市场一起增长，品牌如何把语言标准变成可长期复用的系统。",
      },
      {
        question: "为什么规模化一致性要单独做成一个 use case？",
        answer: "因为很多品牌一开始痛的是上线速度，后面真正痛的却是每扩张一次内容，翻译质量就再乱一层。",
      },
    ],
    ctaLabel: "安装到 Shopify",
    ctaHref: "https://apps.shopify.com/ciwi",
  },
];

export const useCases = useCasesEn;

export function getUseCases(locale: Locale) {
  return locale === "zh-cn" ? useCasesZh : useCasesEn;
}

export function getUseCaseMap(locale: Locale) {
  return Object.fromEntries(getUseCases(locale).map((item) => [item.slug, item]));
}

export function getUseCasesByProduct(locale: Locale, productSlug: string) {
  return getUseCases(locale).filter((item) => item.productSlug === productSlug);
}

export function getFeaturedUseCasesByProduct(locale: Locale, productSlug: string) {
  const items = getUseCasesByProduct(locale, productSlug);
  const featured = items.filter((item) => item.featured);
  return featured.length > 0 ? featured : items.slice(0, 2);
}

export function getFeaturedUseCases(locale: Locale) {
  return getUseCases(locale).filter((item) => item.featured);
}

export function getProductPlaybookHref(productSlug: string) {
  return `/products/${productSlug}/playbook`;
}

export function getRelatedUseCases(locale: Locale, slug: string, limit = 3) {
  const allUseCases = getUseCases(locale);
  const current = allUseCases.find((item) => item.slug === slug);

  if (!current) {
    return [];
  }

  return allUseCases.filter((item) => item.slug !== slug).sort((left, right) => {
    const leftScore = left.productSlug === current.productSlug ? 1 : 0;
    const rightScore = right.productSlug === current.productSlug ? 1 : 0;
    return rightScore - leftScore;
  }).slice(0, limit);
}
