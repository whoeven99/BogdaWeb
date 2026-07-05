export type HelpCenterDoc = {
  slug: string;
  title: string;
  href: string;
  sourceHref: string;
  description: string;
  meta: string[];
  readingTime: string;
  contentHtml: string;
  relatedResources?: {title: string; description: string; href: string; meta: string[]}[];
};

const basePath = "/help-center/ShopifyApp";

export const helpCenterDocs: HelpCenterDoc[] = [
  {
    slug: "about-ciwi-ai-translator-shopify-app",
    title: "About ciwi.ai-translator Shopify App",
    href: `${basePath}/about-ciwi-ai-translator-shopify-app/`,
    sourceHref: `${basePath}/about-ciwi-ai-translator-shopify-app/`,
    description: "帮助用户快速理解 Ciwi Translator 的定位、主要能力和适用场景。",
    meta: ["Help Center", "Overview"],
    readingTime: "3 min read",
    contentHtml: `
      <p>Ciwi AI Translator 是一款面向 Shopify 商家的多语言与本地化产品，重点不是只翻译页面文本，而是帮助商家把商品、主题、FAQ、metafields 和本地化表达一起稳定下来。</p>
      <h2>适合谁</h2>
      <ul>
        <li>正在拓展多语言市场的 Shopify 商家</li>
        <li>需要控制 glossary 和品牌术语的团队</li>
        <li>希望减少人工翻译和后续同步成本的运营团队</li>
      </ul>
      <h2>核心能力</h2>
      <ul>
        <li>支持多语言翻译与持续同步</li>
        <li>支持 glossary、模型策略和品牌表达控制</li>
        <li>支持主题、导航、图片和结构化内容覆盖</li>
      </ul>
      <h2>为什么放在帮助中心</h2>
      <p>这类文档适合作为产品页之外的补充说明，帮助用户在正式安装前快速理解定位与边界。</p>
    `,
    relatedResources: [
      {title: "AI Translator", description: "回到产品页，继续看能力边界、用例和 Demo。", href: "/products/translator", meta: ["Product", "Translator"]},
      {title: "How to setup and use glossary?", description: "术语控制是翻译质量稳定的关键一层。", href: `${basePath}/how-to-setup-and-use-glossary/`, meta: ["Help Center", "Glossary"]},
      {title: "CIWI Translator 插件介绍", description: "从博客视角快速理解产品定位和套餐层级。", href: "/blog/ciwi-translator-cha-jian-jie-shao", meta: ["Blog", "Product"]},
    ],
  },
  {
    slug: "can-i-auto-switch-language-or-currency-based-on-website-visitors-geolocation",
    title: "Can I auto switch language or currency based on website visitors' geolocation?",
    href: `${basePath}/can-i-auto-switch-language-or-currency-based-on-website-visitors-geolocation/`,
    sourceHref: `${basePath}/can-i-auto-switch-language-or-currency-based-on-website-visitors-geolocation/`,
    description: "解释地理位置自动切换语言和币种的能力，适合用来承接多语言转化场景。",
    meta: ["Help Center", "Geolocation"],
    readingTime: "2 min read",
    contentHtml: `
      <p>可以。Ciwi 支持根据访问者 IP 自动切换币种，并结合浏览器语言或地理位置设置切换店铺语言。</p>
      <h2>适合的业务场景</h2>
      <ul>
        <li>面向多个国家投放广告，希望首屏就给用户更熟悉的语言和货币</li>
        <li>希望减少用户自己手动切换语言和币种的摩擦</li>
      </ul>
      <h2>启用方式</h2>
      <ol>
        <li>进入应用的 Currency 或 Localization 配置区域</li>
        <li>开启 geolocation 相关选项</li>
        <li>检查语言与币种切换规则是否符合你的市场策略</li>
      </ol>
      <h2>注意事项</h2>
      <p>自动切换应服务于转化，而不是替代用户选择。建议保留可见的语言或货币切换器，让用户可以随时手动切换。</p>
    `,
    relatedResources: [
      {title: "How to set up multi-currency pricing on your Shopify store?", description: "币种切换和 geolocation 往往需要一起配置。", href: `${basePath}/how-to-set-up-multi-currency-pricing-on-your-shopify-store/`, meta: ["Help Center", "Currency"]},
      {title: "Expand Global Reach", description: "从场景页理解地理位置切换和多语言扩张之间的关系。", href: "/solutions/multilingual-growth", meta: ["Solution", "Multilingual"]},
      {title: "Can I placing the switcher in the header or footer of the website?", description: "继续看切换器的前台放置和可见性策略。", href: `${basePath}/can-i-placing-the-switcher-in-the-header-or-footer-of-the-website/`, meta: ["Help Center", "Switcher"]},
    ],
  },
  {
    slug: "can-i-placing-the-switcher-in-the-header-or-footer-of-the-website",
    title: "Can I placing the switcher in the header or footer of the website?",
    href: `${basePath}/can-i-placing-the-switcher-in-the-header-or-footer-of-the-website/`,
    sourceHref: `${basePath}/can-i-placing-the-switcher-in-the-header-or-footer-of-the-website/`,
    description: "说明语言切换器在店铺前台中的放置和自定义能力。",
    meta: ["Help Center", "Switcher"],
    readingTime: "2 min read",
    contentHtml: `
      <p>可以。Ciwi 当前支持将语言切换器放在店铺的 Header 或 Footer，并支持样式和位置上的基础自定义。</p>
      <h2>推荐做法</h2>
      <ul>
        <li>如果语言切换是主要导航动作，优先放在 Header</li>
        <li>如果只是补充入口，可以放在 Footer</li>
      </ul>
      <h2>为什么位置重要</h2>
      <p>切换器不是装饰组件，它会直接影响用户是否能快速理解自己正在访问什么语言版本。位置越清晰，用户越容易信任页面。</p>
      <h2>实施建议</h2>
      <p>上线前建议分别测试桌面端和移动端，确保切换器不会和主导航、购物车或账号入口冲突。</p>
    `,
    relatedResources: [
      {title: "How to enable the language & currency exchange switcher", description: "继续看 Switcher 的具体启用流程和状态检查。", href: `${basePath}/how-to-enable-the-language-currency-exchange-switcher/`, meta: ["Help Center", "Switcher"]},
      {title: "Can I auto switch language or currency based on website visitors' geolocation?", description: "位置策略和切换器展示通常要一起规划。", href: `${basePath}/can-i-auto-switch-language-or-currency-based-on-website-visitors-geolocation/`, meta: ["Help Center", "Geolocation"]},
      {title: "AI Translator", description: "回到产品页查看本地化和前台切换能力的整体说明。", href: "/products/translator", meta: ["Product", "Translator"]},
    ],
  },
  {
    slug: "how-to-setup-and-use-glossary",
    title: "How to setup and use glossary?",
    href: `${basePath}/how-to-setup-and-use-glossary/`,
    sourceHref: `${basePath}/how-to-setup-and-use-glossary/`,
    description: "术语表是翻译质量和品牌一致性的关键控制点，这篇文档应作为重点资源展示。",
    meta: ["Help Center", "Glossary"],
    readingTime: "4 min read",
    contentHtml: `
      <p>Glossary 是 Ciwi 多语言质量控制里最关键的一层。它可以帮助你把品牌词、产品词和核心表达固定下来，避免不同页面或不同语言之间出现漂移。</p>
      <h2>什么时候一定要用 glossary</h2>
      <ul>
        <li>品牌名、产品线名、系列名不能被自由翻译时</li>
        <li>同一术语在不同页面必须保持一致时</li>
        <li>你希望不同模型输出仍然保持统一表达时</li>
      </ul>
      <h2>建议的设置流程</h2>
      <ol>
        <li>先整理品牌词、核心卖点和禁用翻译词</li>
        <li>把这些词条录入 glossary</li>
        <li>先在商品页和 FAQ 上做一轮试翻，确认术语效果</li>
        <li>再逐步扩大到更多页面类型</li>
      </ol>
      <h2>最佳实践</h2>
      <p>不要把 glossary 当成“所有词都录进去”的词典。真正重要的是高价值、高频、最影响品牌一致性的那一批术语。</p>
    `,
    relatedResources: [
      {title: "CIWI Translator 插件介绍", description: "结合产品介绍理解 glossary 在套餐和能力边界里的位置。", href: "/blog/ciwi-translator-cha-jian-jie-shao", meta: ["Blog", "Product"]},
      {title: "Ciwi vs Transcy", description: "从选型角度理解 glossary 控制为什么会成为差异化能力。", href: "/compare/ciwi-vs-transcy", meta: ["Compare", "Selection"]},
      {title: "Increase Conversion", description: "从转化场景页理解术语一致性和信任感之间的关系。", href: "/solutions/increase-conversion", meta: ["Solution", "Conversion"]},
    ],
  },
  {
    slug: "does-translate-language-ai-adapt-support-multiple-languages",
    title: "Does Translate Language AI Adapt support multiple languages?",
    href: `${basePath}/does-translate-language-ai-adapt-support-multiple-languages/`,
    sourceHref: `${basePath}/does-translate-language-ai-adapt-support-multiple-languages/`,
    description: "回答多语言覆盖能力，是产品选型阶段最常见的问题之一。",
    meta: ["Help Center", "Languages"],
    readingTime: "2 min read",
    contentHtml: `
      <p>支持。Ciwi 支持多语言能力，并可根据浏览器语言、市场设置和本地化配置，帮助商家更自然地覆盖不同市场。</p>
      <h2>支持范围</h2>
      <p>当前支持多种主流语言组合，适合 Shopify 商家面向不同国家和地区做内容扩展。</p>
      <h2>这意味着什么</h2>
      <ul>
        <li>你不需要只停留在 Shopify 原生语言数量限制之内</li>
        <li>可以针对不同市场逐步扩展语言覆盖</li>
        <li>可以将多语言策略和 glossary、内容生成结合起来</li>
      </ul>
      <h2>建议</h2>
      <p>多语言上线不应只看“支持多少语言”，更重要的是术语一致性、结构化内容覆盖和后续更新同步能力。</p>
    `,
    relatedResources: [
      {title: "Expand Global Reach", description: "从方案层理解多语言扩张和持续同步的关系。", href: "/solutions/multilingual-growth", meta: ["Solution", "Multilingual"]},
      {title: "How to translate your Shopify store?", description: "继续看完整的翻译执行流程，从加语言到发布预览。", href: `${basePath}/how-to-translate/`, meta: ["Help Center", "Translation Workflow"]},
      {title: "Ciwi vs Shopify Translate & Adapt", description: "对比原生方案和 Ciwi 在多语言覆盖上的差异。", href: "/compare/ciwi-vs-shopify-translate-adapt", meta: ["Compare", "Selection"]},
    ],
  },
  {
    slug: "faqs-about-translation",
    title: "FAQs About Translation",
    href: `${basePath}/faqs-about-translation/`,
    sourceHref: `${basePath}/faqs-about-translation/`,
    description: "聚合常见翻译问题，适合作为产品页与帮助中心之间的桥接内容。",
    meta: ["Help Center", "FAQ"],
    readingTime: "4 min read",
    contentHtml: `
      <h2>Will content translated by other apps be overwritten?</h2>
      <p>是否覆盖取决于当前店铺翻译内容的组织方式。上线前建议先在小范围内容上测试，明确现有翻译来源和同步逻辑。</p>
      <h2>Can I review translations before publishing?</h2>
      <p>可以。实际业务中，建议把 AI 翻译看作高效率初稿，再对重点页面保留人工审阅环节。</p>
      <h2>Why does ecommerce translation need special handling?</h2>
      <p>因为 Shopify 商店里不只有普通文案，还包括产品结构、metafields、FAQ、主题区块、图片文字和本地化表达，这些内容如果不同步，用户体验会明显断裂。</p>
      <h2>What should merchants care about most?</h2>
      <ul>
        <li>翻译质量是否稳定</li>
        <li>术语和品牌表达能否控制</li>
        <li>后续更新是否能持续同步</li>
        <li>是否真正适配 Shopify 场景，而不是只翻译平面文本</li>
      </ul>
    `,
    relatedResources: [
      {title: "AI Translator", description: "回到产品页，继续看结构化内容和本地化覆盖能力。", href: "/products/translator", meta: ["Product", "Translator"]},
      {title: "How to setup and use glossary?", description: "FAQ 中提到的术语一致性问题，可以继续看 glossary 设置策略。", href: `${basePath}/how-to-setup-and-use-glossary/`, meta: ["Help Center", "Glossary"]},
      {title: "Ciwi vs Transcy", description: "把常见问题进一步延伸到工具选型层。", href: "/compare/ciwi-vs-transcy", meta: ["Compare", "Selection"]},
    ],
  },
  {
    slug: "how-to-translate",
    title: "How to translate your Shopify store?",
    href: `${basePath}/how-to-translate/`,
    sourceHref: `${basePath}/how-to-translate/`,
    description: "从添加语言、启动翻译到编辑和发布，完整说明店铺翻译的标准流程。",
    meta: ["Help Center", "Translation Workflow"],
    readingTime: "5 min read",
    contentHtml: `
      <p>这篇文档用来说明 Ciwi 的基础翻译流程：先添加目标语言，再启动翻译任务，最后进行编辑、发布和预览。</p>
      <h2>Step 1: Add languages and start translation</h2>
      <p>先进入 Language 页面添加目标语言。Shopify 本身有语言数量限制，因此建议优先选择你当前真正要覆盖的市场，而不是一次性把所有语言都加进去。</p>
      <ul>
        <li>在语言列表中点击 Add Language 添加目标市场语言</li>
        <li>添加完成后点击 Translate 进入翻译设置页</li>
        <li>选择语言并启动翻译任务，再到 Dashboard 查看执行进度</li>
      </ul>
      <h2>Step 2: Edit translations before publish</h2>
      <p>翻译任务完成后进入 Manage 页面，对不同语言的内容逐项检查。右侧通常会显示机器翻译结果，你可以在正式发布前做人工修订。</p>
      <ul>
        <li>按语言切换不同 tab 检查翻译结果</li>
        <li>点击 Edit 进入细节页，对重点内容做人工校对</li>
        <li>保存后再回到语言列表，准备进入发布阶段</li>
      </ul>
      <h2>Step 3: Publish and preview</h2>
      <p>编辑完成后需要回到语言页点击 Publish，把语言版本发布到前台。发布后可以通过 Preview 查看当前市场下的实际展示效果。</p>
      <p>建议先从商品页、FAQ 和主要营销区块开始检查，确认术语、促销表达和结构化内容都没有出现明显偏差。</p>
    `,
    relatedResources: [
      {title: "How to setup and use glossary?", description: "翻译流程跑通后，下一步通常就是用 glossary 稳定术语。", href: `${basePath}/how-to-setup-and-use-glossary/`, meta: ["Help Center", "Glossary"]},
      {title: "Private API Translation Model User Manual", description: "如果你要使用自定义模型或私有 key，可以继续看这篇配置说明。", href: `${basePath}/how-to-use-your-own-key-for-translation/`, meta: ["Help Center", "API Key"]},
      {title: "AI Translator", description: "回到产品页，继续看产品能力、Demo 和适用场景。", href: "/products/translator", meta: ["Product", "Translator"]},
    ],
  },
  {
    slug: "how-to-enable-the-language-currency-exchange-switcher",
    title: "How to enable the language & currency exchange switcher",
    href: `${basePath}/how-to-enable-the-language-currency-exchange-switcher/`,
    sourceHref: `${basePath}/how-to-enable-the-language-currency-exchange-switcher/`,
    description: "说明如何在 Shopify 主题里启用 Ciwi 的语言与币种切换器，并检查配置状态。",
    meta: ["Help Center", "Switcher"],
    readingTime: "3 min read",
    contentHtml: `
      <p>Ciwi_Switcher 的启用流程分成两部分：先把它正确挂进主题编辑器，再回到应用页确认配置状态已经完成。</p>
      <h2>Configuration process</h2>
      <p>先进入 Currency 页面，根据状态提示判断配置是否已经完成。如果还是 Uncompleted，就点击入口进入 Theme Editor 的对应 section。</p>
      <ol>
        <li>进入主题编辑器并定位到 Footer 或目标区块</li>
        <li>确认 Apps 区域里已经出现 Ciwi_Switcher</li>
        <li>保存主题设置后，再回到应用页刷新确认状态</li>
      </ol>
      <h2>What to do when a market is still uncompleted</h2>
      <p>如果某些 market 仍然失败，通常意味着不同市场需要分别配置。你需要切换到对应 market，再手动把 Switcher 添加进去。</p>
      <p>同时不要重复添加同一个 Switcher，否则可能会造成显示异常或功能冲突。</p>
      <h2>Style configuration</h2>
      <p>启用成功后，可以继续在主题编辑器里调整颜色、位置和字号。建议优先保证可见性与清晰度，再考虑更细的视觉定制。</p>
    `,
    relatedResources: [
      {title: "Can I placing the switcher in the header or footer of the website?", description: "继续看 Switcher 具体应该放在 Header 还是 Footer。", href: `${basePath}/can-i-placing-the-switcher-in-the-header-or-footer-of-the-website/`, meta: ["Help Center", "Switcher"]},
      {title: "How to set up multi-currency pricing on your Shopify store?", description: "切换器启用后，通常还需要一起检查币种显示与价格格式。", href: `${basePath}/how-to-set-up-multi-currency-pricing-on-your-shopify-store/`, meta: ["Help Center", "Currency"]},
      {title: "Expand Global Reach", description: "从场景页理解前台切换器在多市场体验中的作用。", href: "/solutions/multilingual-growth", meta: ["Solution", "Multilingual"]},
    ],
  },
  {
    slug: "how-to-use-your-own-key-for-translation",
    title: "Private API Translation Model User Manual",
    href: `${basePath}/how-to-use-your-own-key-for-translation/`,
    sourceHref: `${basePath}/how-to-use-your-own-key-for-translation/`,
    description: "说明如何准备 Google Cloud key，并在 Ciwi 中启用自定义 API key 翻译。",
    meta: ["Help Center", "API Key"],
    readingTime: "5 min read",
    contentHtml: `
      <p>如果你希望用自己的 API key 管理模型调用和额度，这篇文档会分两步说明：先在 Google Cloud 准备 key，再把它配置到 Ciwi 的翻译设置里。</p>
      <h2>Get your own Google key</h2>
      <p>先在 Google Cloud 创建项目并启用对应 API，再到 Credentials 页面生成 API key。生成后建议补充权限限制，只开放需要的接口和来源范围。</p>
      <ul>
        <li>创建 Google Cloud 账号并设置计费信息</li>
        <li>新建项目并启用 Cloud Translation 或对应模型 API</li>
        <li>生成 API key，并根据安全要求限制接口和来源</li>
      </ul>
      <h2>Configure the key inside Ciwi</h2>
      <p>回到 Ciwi 的 Translation Settings 页面，在 AI Models 模块点击 Custom API key，把自己的 key 和 quota limit 填进去，再保存。</p>
      <ul>
        <li>在 Dashboard 或 Translation Settings 中进入 API key 配置页</li>
        <li>录入 key 与额度上限，避免误超第三方 API 预算</li>
        <li>保存后，在翻译任务里选择对应模型并开始执行</li>
      </ul>
      <h2>Operational notes</h2>
      <p>使用个人 key 时，更需要明确预算控制、模型选择和术语质量策略。配置不再使用后，也应及时删除旧 key，避免遗留安全风险。</p>
    `,
    relatedResources: [
      {title: "How to translate your Shopify store?", description: "配置好 key 之后，继续按标准流程启动翻译任务。", href: `${basePath}/how-to-translate/`, meta: ["Help Center", "Translation Workflow"]},
      {title: "How to setup and use glossary?", description: "自定义模型并不能替代术语控制，glossary 仍然是质量关键。", href: `${basePath}/how-to-setup-and-use-glossary/`, meta: ["Help Center", "Glossary"]},
      {title: "AI Translator", description: "回到产品页查看模型控制、多语言和 Shopify 结构适配能力。", href: "/products/translator", meta: ["Product", "Translator"]},
    ],
  },
  {
    slug: "how-to-set-up-multi-currency-pricing-on-your-shopify-store",
    title: "How to set up multi-currency pricing on your Shopify store?",
    href: `${basePath}/how-to-set-up-multi-currency-pricing-on-your-shopify-store/`,
    sourceHref: `${basePath}/how-to-set-up-multi-currency-pricing-on-your-shopify-store/`,
    description: "说明如何设置多币种价格显示、汇率、舍入规则和 geolocation 相关预览流程。",
    meta: ["Help Center", "Currency"],
    readingTime: "4 min read",
    contentHtml: `
      <p>这篇文档说明多币种配置的完整流程：先设置价格格式，再添加币种、编辑汇率与舍入规则，最后在前台预览并决定是否启用 geolocation。</p>
      <h2>Set up currency formatting first</h2>
      <p>在应用里复制推荐的格式模板，再到 Shopify 的 General 配置中更新 HTML with currency 和 HTML without currency。这样做的目的是先确保价格显示结构正确。</p>
      <h2>Add and edit currencies</h2>
      <p>添加需要的币种后，可以继续进入编辑状态调整汇率模式和 price rounding。Auto rate 更适合快速上线，Manual rate 适合你有更细的定价策略时使用。</p>
      <ul>
        <li>通过 Add Currency 选择目标币种</li>
        <li>在 Edit 中设置自动或手动汇率</li>
        <li>根据品牌定价习惯决定是否启用舍入规则</li>
      </ul>
      <h2>Preview and geolocation</h2>
      <p>配置完成后先做 Preview，确认前台货币切换和显示逻辑没有问题。若希望根据访问者地区自动展示币种，再继续启用 geolocation 设置。</p>
    `,
    relatedResources: [
      {title: "Can I auto switch language or currency based on website visitors' geolocation?", description: "多币种配置完成后，下一步通常就是 geolocation 自动切换。", href: `${basePath}/can-i-auto-switch-language-or-currency-based-on-website-visitors-geolocation/`, meta: ["Help Center", "Geolocation"]},
      {title: "How to enable the language & currency exchange switcher", description: "确保前台切换器已经正确接入主题。", href: `${basePath}/how-to-enable-the-language-currency-exchange-switcher/`, meta: ["Help Center", "Switcher"]},
      {title: "Expand Global Reach", description: "从场景页理解多币种和跨市场体验之间的关系。", href: "/solutions/multilingual-growth", meta: ["Solution", "Multilingual"]},
    ],
  },
  {
    slug: "is-it-possible-to-translate-multiple-languages-at-the-same-time",
    title: "Is it possible to translate multiple languages at the same time?",
    href: `${basePath}/is-it-possible-to-translate-multiple-languages-at-the-same-time/`,
    sourceHref: `${basePath}/is-it-possible-to-translate-multiple-languages-at-the-same-time/`,
    description: "解释当前是否支持一次性翻译多语言，以及更合理的执行节奏应该怎么安排。",
    meta: ["Help Center", "Translation Workflow"],
    readingTime: "2 min read",
    contentHtml: `
      <p>当前 Ciwi 还不支持一次性同时翻译多个语言版本。更稳妥的方式是先按优先市场逐步执行，这样更容易控制质量、预算和术语一致性。</p>
      <h2>Why not run every language together</h2>
      <p>对大多数 Shopify 商家来说，一次性铺开所有语言并不是效率最高的做法。不同市场往往需要不同术语、价格表达和促销语气，如果同时铺开，反而更难做质量控制。</p>
      <h2>Recommended rollout approach</h2>
      <ul>
        <li>先选 1 到 2 个最重要市场跑完整流程</li>
        <li>确认 glossary、模型和前台展示策略已经稳定</li>
        <li>再逐步扩到更多语言和市场版本</li>
      </ul>
      <h2>What to do if you need batch execution</h2>
      <p>如果你的业务确实需要更大规模的多语言并行处理，可以先联系支持团队说明语言数量、内容范围和时间要求，再评估是否需要更适合的工作流。</p>
    `,
    relatedResources: [
      {title: "How to translate your Shopify store?", description: "先把单语言的标准翻译流程跑通，再扩语言数量。", href: `${basePath}/how-to-translate/`, meta: ["Help Center", "Translation Workflow"]},
      {title: "Does Translate Language AI Adapt support multiple languages?", description: "继续看语言覆盖范围和多市场扩张的基本边界。", href: `${basePath}/does-translate-language-ai-adapt-support-multiple-languages/`, meta: ["Help Center", "Languages"]},
      {title: "Expand Global Reach", description: "从方案页理解多市场扩张的节奏应该怎么设计。", href: "/solutions/multilingual-growth", meta: ["Solution", "Multilingual"]},
    ],
  },
  {
    slug: "what-are-the-differences-when-choosing-different-translation-models",
    title: "What are the differences when choosing different translation models?",
    href: `${basePath}/what-are-the-differences-when-choosing-different-translation-models/`,
    sourceHref: `${basePath}/what-are-the-differences-when-choosing-different-translation-models/`,
    description: "说明不同翻译模型在质量、速度、语言适配和术语控制上的差异。",
    meta: ["Help Center", "Models"],
    readingTime: "4 min read",
    contentHtml: `
      <p>不同翻译模型的差异不只是“谁更准”，还包括速度、成本、语言组合适配、术语控制和对复杂商品文案的理解能力。</p>
      <h2>Quality and context understanding</h2>
      <p>如果你的重点是复杂语境、品牌表达和营销文案，自然更需要上下文理解能力强的模型。对于只是快速覆盖基础内容的场景，则可以更看重速度和成本。</p>
      <h2>Language and market fit</h2>
      <p>不同模型在不同语言组合上的表现并不完全一样。比如有些模型更适合处理中英互译，有些则在欧洲语言或多语言通用覆盖上更稳定。</p>
      <h2>How merchants should choose</h2>
      <ul>
        <li>先看你的主要市场和语言组合</li>
        <li>再看你更关心质量、速度还是预算</li>
        <li>最后结合 glossary 和人工审核策略，而不是只靠模型本身解决所有问题</li>
      </ul>
    `,
    relatedResources: [
      {title: "Private API Translation Model User Manual", description: "如果你需要更自由的模型配置和预算控制，可以继续看自定义 key。", href: `${basePath}/how-to-use-your-own-key-for-translation/`, meta: ["Help Center", "API Key"]},
      {title: "How to setup and use glossary?", description: "模型选择不能替代术语控制，glossary 仍然是稳定质量的关键。", href: `${basePath}/how-to-setup-and-use-glossary/`, meta: ["Help Center", "Glossary"]},
      {title: "Ciwi vs Shopify Translate & Adapt", description: "从选型页角度理解“模型能力”之外还需要什么工作流能力。", href: "/compare/ciwi-vs-shopify-translate-adapt", meta: ["Compare", "Selection"]},
    ],
  },
  {
    slug: "what-are-the-differences-when-choosing-different-language-packs",
    title: "What are the differences when choosing different language packs?",
    href: `${basePath}/what-are-the-differences-when-choosing-different-language-packs/`,
    sourceHref: `${basePath}/what-are-the-differences-when-choosing-different-language-packs/`,
    description: "解释语言包如何影响行业词汇、翻译风格和目标市场表达方式。",
    meta: ["Help Center", "Language Packs"],
    readingTime: "3 min read",
    contentHtml: `
      <p>语言包的意义不在于改变原意，而在于让翻译结果更贴近你的行业语境。不同品类商家面对的术语、产品表达和目标市场预期并不一样。</p>
      <h2>Industry-specific vocabulary</h2>
      <p>服饰、家居、户外等不同品类，会使用各自更常见的专业词汇。合适的语言包可以让翻译更接近目标行业用户的阅读习惯，而不是停留在字面直译。</p>
      <h2>Why language packs matter for ecommerce</h2>
      <p>电商翻译不仅要准确，还要让商品看起来“像本地市场会这样写”。如果行业表达不对，用户会明显感觉页面不够自然，影响理解和信任。</p>
      <h2>How to choose</h2>
      <ul>
        <li>优先按主营品类选择语言包</li>
        <li>对重点产品页做一轮试翻，观察词汇和语气是否合适</li>
        <li>必要时配合 glossary，把核心术语进一步锁定</li>
      </ul>
    `,
    relatedResources: [
      {title: "How to setup and use glossary?", description: "语言包负责风格和行业语境，glossary 负责锁定高价值术语。", href: `${basePath}/how-to-setup-and-use-glossary/`, meta: ["Help Center", "Glossary"]},
      {title: "What are the differences when choosing different translation models?", description: "模型和语言包不是一回事，继续看模型层面的差异。", href: `${basePath}/what-are-the-differences-when-choosing-different-translation-models/`, meta: ["Help Center", "Models"]},
      {title: "Increase Conversion", description: "从场景页理解行业语气和本地化表达对转化的影响。", href: "/solutions/increase-conversion", meta: ["Solution", "Conversion"]},
    ],
  },
  {
    slug: "faqs-about-translation",
    title: "FAQs About Translation",
    href: `${basePath}/faqs-about-translation/`,
    sourceHref: `${basePath}/faqs-about-translation/`,
    description: "回答翻译覆盖、手动修改是否会被覆盖，以及新增商品如何继续翻译等常见问题。",
    meta: ["Help Center", "Translation FAQ"],
    readingTime: "3 min read",
    contentHtml: `
      <p>这篇文档集中回答商家在正式开始翻译后最常遇到的几个问题，包括旧内容是否会被覆盖、原文改动后会发生什么，以及新商品如何继续进入翻译流程。</p>
      <h2>Will previous translations be overwritten</h2>
      <p>不会自动覆盖其他应用已经生成的翻译内容。但如果原文发生变化，下次重新执行该语言翻译时，系统会根据最新原文重新生成结果，旧翻译和手动编辑内容都可能被更新。</p>
      <h2>What happens after the source text changes</h2>
      <p>修改原文后，翻译不会立刻自动变化。下一次你重新翻译该语言时，系统会识别原文变化，并按最新内容生成新的译文。</p>
      <h2>Will manual edits be preserved</h2>
      <p>如果原文没有变化，手动修改的译文会保留。如果原文变了，下次重译时系统会以最新原文为准重新生成翻译。</p>
      <h2>How to translate newly added products</h2>
      <p>新增商品或新增内容后，只需要再次执行翻译流程，系统会识别新增或发生变化的部分，再把这些内容纳入翻译任务。</p>
    `,
    relatedResources: [
      {title: "How to translate your Shopify store?", description: "先看标准翻译流程，再结合这些常见问题理解实际操作边界。", href: `${basePath}/how-to-translate/`, meta: ["Help Center", "Translation Workflow"]},
      {title: "How to setup and use glossary?", description: "如果你担心术语一致性或手动编辑稳定性，glossary 是更稳的控制层。", href: `${basePath}/how-to-setup-and-use-glossary/`, meta: ["Help Center", "Glossary"]},
      {title: "AI Translator", description: "回到产品页，直接看结构化翻译、术语控制和持续同步能力。", href: "/products/translator", meta: ["Product", "Translator"]},
    ],
  },
  {
    slug: "how-to-set-regarding-geolocation",
    title: "How to set regarding geolocation",
    href: `${basePath}/how-to-set-regarding-geolocation/`,
    sourceHref: `${basePath}/how-to-set-regarding-geolocation/`,
    description: "说明如何按访问者地区自动切换语言和货币，以及启用前需要确认哪些基础设置。",
    meta: ["Help Center", "Geolocation"],
    readingTime: "2 min read",
    contentHtml: `
      <p>如果你希望店铺根据访问者所在地区自动切换语言和货币，先确保语言、币种和前台 switcher 已经配置完成，再打开 geolocation 相关设置。</p>
      <h2>Go to currency settings first</h2>
      <p>先进入 Currency 设置页，确认基础货币相关配置已经完成。没有完成这一步时，自动切换通常不会按预期工作。</p>
      <h2>Configure the switcher</h2>
      <p>确保语言与货币 switcher 已经接入主题，并且前台可见。自动切换不是替代 switcher，而是让用户进入页面时先看到更接近自己地区的版本。</p>
      <h2>Enable geolocation</h2>
      <p>完成前两步后，再打开 geolocation 相关开关。启用后，系统会根据访问者地区优先显示对应语言和货币。</p>
      <h2>Check your default fallback</h2>
      <p>如果某些地区没有单独配置语言或货币，系统会回退到默认设置。上线前建议至少测试主要目标市场，确认默认值是否合理。</p>
    `,
    relatedResources: [
      {title: "Can I auto switch language or currency based on website visitors' geolocation?", description: "先理解自动切换适合什么场景，再回到这篇文档做具体设置。", href: `${basePath}/can-i-auto-switch-language-or-currency-based-on-website-visitors-geolocation/`, meta: ["Help Center", "Geolocation"]},
      {title: "How to enable the language & currency exchange switcher", description: "先确保前台 switcher 已经正确接入。", href: `${basePath}/how-to-enable-the-language-currency-exchange-switcher/`, meta: ["Help Center", "Switcher"]},
      {title: "Expand Global Reach", description: "从方案页继续看多市场体验和自动切换对转化的影响。", href: "/solutions/multilingual-growth", meta: ["Solution", "Multilingual"]},
    ],
  },
  {
    slug: "how-can-i-check-my-credit-balance",
    title: "How can I check my credit balance?",
    href: `${basePath}/how-can-i-check-my-credit-balance/`,
    sourceHref: `${basePath}/how-can-i-check-my-credit-balance/`,
    description: "说明如何查看 credit 余额、已用额度，以及余额异常时应该去哪里确认。",
    meta: ["Help Center", "Credits"],
    readingTime: "2 min read",
    contentHtml: `
      <p>如果你需要确认当前还剩多少 credits，最直接的方式是先到应用内的相关页面查看总额度和已用额度，再决定是否需要补充购买。</p>
      <h2>Check credits from the pricing page</h2>
      <p>你可以直接进入 Pricing 页面查看当前总 credits、已用 credits 和剩余额度。这样最容易快速判断当前余额是否足够支持下一轮翻译任务。</p>
      <h2>Review usage before purchasing</h2>
      <p>在继续翻译之前，先看一次已用额度和预计需要处理的内容量，会比等到任务中断后再补买更稳妥。</p>
      <h2>Contact support when data looks wrong</h2>
      <p>如果你看到的余额和实际使用情况不一致，或者相关邮件没有收到，建议直接联系支持团队，让我们帮助你核对详情。</p>
    `,
    relatedResources: [
      {title: "Where to buy credits", description: "如果你已经确认余额不足，可以继续看购买流程。", href: `${basePath}/where-to-buy-credits/`, meta: ["Help Center", "Credits"]},
      {title: "What is the credit refund policy?", description: "如果你想确认未使用额度如何处理，可以继续看退款规则。", href: `${basePath}/what-is-the-credit-refund-policy/`, meta: ["Help Center", "Credits"]},
      {title: "Pricing", description: "回到价格页，继续看不同产品线的购买方式。", href: "/pricing", meta: ["Page", "Pricing"]},
    ],
  },
  {
    slug: "where-to-buy-credits",
    title: "Where to buy credits",
    href: `${basePath}/where-to-buy-credits/`,
    sourceHref: `${basePath}/where-to-buy-credits/`,
    description: "说明 credits 不足时应该从哪里购买，以及购买前后会发生什么。",
    meta: ["Help Center", "Credits"],
    readingTime: "3 min read",
    contentHtml: `
      <p>当你现有 credits 不足以完成下一轮翻译任务时，可以在应用内直接进入购买流程，无需单独切换到外部系统。</p>
      <h2>When you need to buy more credits</h2>
      <p>如果系统判断当前剩余额度不足以覆盖目标翻译内容，就会在你继续执行翻译时提示购买。先确认预计消耗量，再选择合适的 credits package。</p>
      <h2>Where the purchase flow starts</h2>
      <p>你可以从 Dashboard 或 Language 页面发起翻译任务。选择模型后，如果 credits 不足，系统会把你带到购买页面，并显示预计需要的字数和 credits 数量。</p>
      <h2>What happens after payment</h2>
      <p>完成支付后，你可以直接回到原来的翻译流程继续执行，不需要重新配置整个任务。</p>
      <h2>Why usage estimation matters</h2>
      <p>先看预计字数和 credits 消耗，再购买对应额度，会比事后多次补买更省时间，也更容易控制预算。</p>
    `,
    relatedResources: [
      {title: "How can I check my credit balance?", description: "购买前先确认当前余额，会更容易判断需要补多少 credits。", href: `${basePath}/how-can-i-check-my-credit-balance/`, meta: ["Help Center", "Credits"]},
      {title: "What is the credit refund policy?", description: "如果你想确认未使用额度如何处理，可以继续看退款规则。", href: `${basePath}/what-is-the-credit-refund-policy/`, meta: ["Help Center", "Credits"]},
      {title: "How to translate your Shopify store?", description: "购买完成后，继续按标准翻译流程执行任务。", href: `${basePath}/how-to-translate/`, meta: ["Help Center", "Translation Workflow"]},
    ],
  },
  {
    slug: "what-is-the-credit-refund-policy",
    title: "What is the credit refund policy?",
    href: `${basePath}/what-is-the-credit-refund-policy/`,
    sourceHref: `${basePath}/what-is-the-credit-refund-policy/`,
    description: "说明未使用 credits、已使用 credits，以及系统异常扣费时的处理原则。",
    meta: ["Help Center", "Credits"],
    readingTime: "3 min read",
    contentHtml: `
      <p>如果你购买了 credits，最需要先分清楚的是哪些额度还没有使用，哪些已经用于翻译任务。退款规则通常会按这两个状态区分处理。</p>
      <h2>Unused credits</h2>
      <p>如果 credits 还没有被使用，可以申请按未使用比例处理退款。也就是说，退款金额会基于剩余额度占购买总额的比例来计算。</p>
      <h2>Used credits</h2>
      <p>已经用于翻译服务或其他相关功能的 credits，一般不会再退回，因为这些额度已经消耗在实际服务中。</p>
      <h2>System errors or abnormal deductions</h2>
      <p>如果你怀疑是系统异常导致扣费错误，或者服务未完整执行，可以联系支持团队做进一步核查。确认后会按实际情况处理。</p>
      <h2>Check before you buy again</h2>
      <p>在再次购买前，建议先看一次当前余额、已用额度和预计任务量，这样更容易避免不必要的重复购买。</p>
    `,
    relatedResources: [
      {title: "How can I check my credit balance?", description: "先确认当前余额和已用额度，再决定是否需要继续购买。", href: `${basePath}/how-can-i-check-my-credit-balance/`, meta: ["Help Center", "Credits"]},
      {title: "Where to buy credits", description: "如果你已经确认需要补充额度，可以继续看购买流程。", href: `${basePath}/where-to-buy-credits/`, meta: ["Help Center", "Credits"]},
      {title: "Contact Us", description: "如果是扣费异常或余额问题，可以直接联系团队。", href: "/contact", meta: ["Page", "Contact"]},
    ],
  },
];

export const helpCenterDocMap = Object.fromEntries(helpCenterDocs.map((doc) => [doc.slug, doc]));

const featuredHelpCenterDocSlugs = [
  "about-ciwi-ai-translator-shopify-app",
  "how-to-setup-and-use-glossary",
  "how-to-translate",
  "how-to-enable-the-language-currency-exchange-switcher",
  "what-are-the-differences-when-choosing-different-translation-models",
  "how-to-set-up-multi-currency-pricing-on-your-shopify-store",
] as const;

export const featuredHelpCenterDocs = featuredHelpCenterDocSlugs
  .map((slug) => helpCenterDocMap[slug])
  .filter((doc): doc is (typeof helpCenterDocs)[number] => Boolean(doc));
