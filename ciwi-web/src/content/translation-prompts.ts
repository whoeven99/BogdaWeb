import type {Locale} from "@/lib/i18n";

export type PromptModelId = "chatgpt" | "claude" | "deepl";

export type PromptModel = {
  id: PromptModelId;
  name: string;
  tagline: Record<Locale, string>;
};

export const promptModels: PromptModel[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    tagline: {
      en: "Strongest for marketing copy, product descriptions, and tone adaptation.",
      "zh-cn": "最适合营销文案、商品描述和语气适配。",
    },
  },
  {
    id: "claude",
    name: "Claude",
    tagline: {
      en: "Strongest for long documents, structured output, and instruction-following.",
      "zh-cn": "最适合长文档、结构化输出和指令遵循。",
    },
  },
  {
    id: "deepl",
    name: "DeepL",
    tagline: {
      en: "Strongest raw translation quality for European and Asian language pairs.",
      "zh-cn": "欧亚语言对的原始翻译质量最强。",
    },
  },
];

export type PromptGroup = {
  id: string;
  name: Record<Locale, string>;
};

export const promptGroups: PromptGroup[] = [
  {id: "checkout-conversion", name: {en: "Checkout & conversion", "zh-cn": "结账与转化"}},
  {id: "catalog-content", name: {en: "Catalog & content", "zh-cn": "商品与内容"}},
  {id: "technical-seo", name: {en: "Technical SEO", "zh-cn": "技术 SEO"}},
  {id: "navigation-experience", name: {en: "Navigation & experience", "zh-cn": "导航与体验"}},
  {id: "trust-support", name: {en: "Trust & support", "zh-cn": "信任与支持"}},
  {id: "operations-scale", name: {en: "Operations & scale", "zh-cn": "运营与扩展"}},
];

export type TranslationPrompt = {
  model: PromptModelId;
  groupId: string;
  scenario: Record<Locale, string>;
  prompt?: Record<Locale, string>;
};

export const translationPrompts: TranslationPrompt[] = [
  {
    model: "chatgpt",
    groupId: "catalog-content",
    scenario: {
      en: "Localize a product description for a target market",
      "zh-cn": "将商品描述本地化到目标市场",
    },
    prompt: {
      en: "Act as a Shopify localization specialist. Localize the following product description for the {target market} in {target language}. Do not translate word-for-word. (1) First list 3-5 keywords local shoppers actually search for in this category, based on local search behavior — not direct translations of the English keywords. (2) Rewrite the description to use those keywords naturally while keeping the original brand tone. (3) Adapt units, sizing, and cultural references for the local market. Output the localized description, then a short note on what you changed and why.",
      "zh-cn": "作为 Shopify 本地化专家，把下面这段商品描述本地化到{目标市场}的{目标语言}。不要逐字翻译。(1) 先列出 3-5 个当地用户在该类目实际搜索的关键词（基于当地搜索行为，不要直接翻译英文关键词）；(2) 用这些关键词自然地改写描述，同时保留原品牌语气；(3) 适配当地的单位、尺码和文化表达。输出本地化后的描述，然后简短说明你改了什么、为什么。",
    },
  },
  {
    model: "chatgpt",
    groupId: "technical-seo",
    scenario: {
      en: "Localize meta title and description for local search",
      "zh-cn": "将 meta 标题和描述本地化以适配当地搜索",
    },
    prompt: {
      en: "Act as a multilingual SEO specialist. Localize the following meta title and description for the {target market}. Rules: (1) Title under 60 characters, description under 160 characters. (2) Do not translate literally — use the keywords local shoppers actually search for. (3) Keep the click intent: tell shoppers what the page offers and why it fits them. Output 2 title options and 2 description options, each marked with its primary keyword.",
      "zh-cn": "作为多语言 SEO 专家，把下面这段 meta 标题和描述本地化到{目标市场}。规则：(1) 标题不超过 60 字符，描述不超过 160 字符；(2) 不要直译——使用当地用户实际搜索的关键词；(3) 保留点击意图：告诉用户这个页面提供什么、为什么适合他们。输出 2 个标题备选和 2 个描述备选，每个标注其主关键词。",
    },
  },
  {
    model: "deepl",
    groupId: "checkout-conversion",
    scenario: {
      en: "Translate checkout labels without breaking local payment trust",
      "zh-cn": "翻译结账标签，同时不破坏本地支付信任",
    },
    prompt: {
      en: "Translate the following Shopify checkout labels into {target language} for the {target market}. Rules: (1) Keep the standard local names for payment methods — keep 'iDEAL' in the Netherlands and 'Rechnung' in Germany; do not translate them into English equivalents. (2) Keep labels short enough to fit the original button and field width. (3) Use the terminology shoppers expect at checkout, not dictionary translations. Output a table: original label | localized label | note if the local name differs from a direct translation.",
      "zh-cn": "把下面这些 Shopify 结账标签翻译成{目标市场}的{目标语言}。规则：(1) 保留支付方式的当地标准名称——荷兰的 'iDEAL'、德国的 'Rechnung'，不要翻成英文等价词；(2) 保持标签足够短，以适配原按钮和字段宽度；(3) 使用用户在结账时预期看到的术语，而不是词典直译。输出一个表格：原文标签 | 本地化标签 | 若当地名称与直译不同则注明。",
    },
  },
  {
    model: "claude",
    groupId: "trust-support",
    scenario: {
      en: "Translate legal and policy text with compliance review",
      "zh-cn": "翻译法律和政策文本并附合规复核",
    },
    prompt: {
      en: "Act as a legal translation reviewer. Translate the following policy text into {target language} for the {target market}. Rules: (1) Use the local standard legal terminology — for GDPR terms, tax terms, and consumer rights, use the established target-market phrasing, not a literal translation. (2) Preserve the exact obligations and conditions; do not soften or reword anything that changes legal meaning. (3) After the translation, list every sentence that is compliance-sensitive and needs human review, with a one-line reason for each.",
      "zh-cn": "作为法律翻译审校，把下面这段政策文本翻译成{目标市场}的{目标语言}。规则：(1) 使用当地标准法律术语——GDPR 术语、税务术语和消费者权益使用目标市场既定表述，而非直译；(2) 精确保留义务和条件，不要软化或改写任何改变法律含义的内容；(3) 翻译后，列出每个需要人工复核的合规敏感句，并各附一句原因。",
    },
  },
  {
    model: "chatgpt",
    groupId: "navigation-experience",
    scenario: {
      en: "Translate navigation and form text, including hidden strings",
      "zh-cn": "翻译导航和表单文字，包括隐藏字符串",
    },
    prompt: {
      en: "Translate the following Shopify navigation and form strings into {target language} for the {target market}. Do not only translate the visible labels. Also check and include: (1) footer and mobile menu items, not just the header; (2) form validation and error messages; (3) dropdown options. Rules: keep labels short enough to fit their container; use the terminology local shoppers expect; flag any string likely hardcoded in the theme and untranslatable without developer help. Output a table grouped by location (header / footer / mobile / form).",
      "zh-cn": "把下面这些 Shopify 导航和表单字符串翻译成{目标市场}的{目标语言}。不要只翻译可见的标签，还要检查并包含：(1) footer 和移动端菜单项，而不只是 header；(2) 表单校验和错误提示；(3) 下拉选项。规则：保持标签足够短以适配容器；使用当地用户预期的术语；标注任何可能硬编码在主题里、需要开发者才能翻译的字符串。按位置（header / footer / mobile / form）分组输出表格。",
    },
  },
  {
    model: "claude",
    groupId: "operations-scale",
    scenario: {
      en: "Translate email notifications without breaking Liquid variables",
      "zh-cn": "翻译邮件通知，不破坏 Liquid 变量",
    },
    prompt: {
      en: "Translate the following Shopify email notification into {target language} for the {target market}. Critical: keep every Liquid variable, tag, and conditional exactly as-is — do not translate or reorder anything inside {{ }} or {% %}; translate only the visible text around them. Also: (1) keep the tone consistent with the store's checkout language; (2) keep legal and refund wording accurate; (3) flag any dynamic field that needs testing after translation. Output the translated template, then list every Liquid variable you preserved.",
      "zh-cn": "把下面这封 Shopify 邮件通知翻译成{目标市场}的{目标语言}。关键：完整保留每个 Liquid 变量、标签和条件语句——不要翻译或调整 {{ }} 或 {% %} 内的任何内容，只翻译其周围的可见文字。同时：(1) 保持与店铺结账语言一致的语气；(2) 保持法律和退款表述准确；(3) 标注任何翻译后需要测试的动态字段。输出翻译后的模板，然后列出你保留的每个 Liquid 变量。",
    },
  },
];
