export type BlogPost = {
  title: string;
  slug: string;
  href: string;
  sourceHref: string;
  publishedAt: string;
  description: string;
  readingTime: string;
  tags: string[];
  contentHtml: string;
};

export const blogBaseUrl = "https://ghost-blog-2m1k.onrender.com";

export const blogPosts: BlogPost[] = [
  {
    title: "CIWI Translator 插件介绍",
    slug: "ciwi-translator-cha-jian-jie-shao",
    href: "/blog/ciwi-translator-cha-jian-jie-shao",
    sourceHref: `${blogBaseUrl}/ciwi-translator-cha-jian-jie-shao/`,
    publishedAt: "2025-07-31",
    description: "当前 Ghost 中最贴近产品能力的文章，适合用作博客接入和资源回流的起点。",
    readingTime: "6 min read",
    tags: ["Product", "Translation", "Shopify"],
    contentHtml: `
      <h2>概述</h2>
      <p><strong>CIWI Translator</strong> 是一款专为 Shopify 商店设计的轻量级多语言翻译插件。它能够自动识别页面文本并进行多语言转换，让国际客户无需切换站点即可浏览母语内容，从而提升跨境电商转化率。</p>
      <h2>使用场景</h2>
      <ul>
        <li>跨境电商卖家希望快速拓展海外市场</li>
        <li>希望提升非英语访客的停留时间和下单转化</li>
        <li>需要简化 Shopify 多语言配置的开发者</li>
      </ul>
      <h2>安装与使用</h2>
      <ol>
        <li>在 Shopify 应用市场安装 <strong>CIWI Translator</strong></li>
        <li>按照指引在主题文件中为需要翻译的内容添加指定 class，例如 <code>ciwi-money</code></li>
        <li>进入插件后台选择目标语言</li>
        <li>保存配置后，用户即可在前台通过语言切换组件访问多语言版本的商店</li>
      </ol>
      <h2>官方说明与应用地址</h2>
      <ul>
        <li>插件名称：<strong>Ciwi.ai: AI Translator GPT-4.1</strong></li>
        <li>开发者：<strong>ciwi.ai</strong></li>
        <li>官方 Shopify 商店页面：可在 Shopify App Store 搜索 “translator by ciwi” 访问对应应用页</li>
      </ul>
      <h2>插件核心功能</h2>
      <ol>
        <li><strong>AI 驱动翻译</strong>：支持 GPT 和多模型能力，可快速翻译商品描述、页面内容和图片文字。</li>
        <li><strong>支持 147+ 语言和 200+ 货币</strong>：可结合访问者 IP 自动切换语言与价格显示。</li>
        <li><strong>Glossary 和品牌风格控制</strong>：通过术语和规则提高翻译稳定性。</li>
        <li><strong>兼容 Shopify 元字段和 Liquid 模板</strong>：覆盖更完整的店铺结构，而不是只翻译平面文本。</li>
      </ol>
      <h2>价格套餐</h2>
      <table>
        <thead>
          <tr>
            <th>方案</th>
            <th>价格</th>
            <th>特点</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Free</td>
            <td>免费</td>
            <td>200,000 credits，支持多语言编辑和基础翻译能力。</td>
          </tr>
          <tr>
            <td>Standard</td>
            <td>$7.99 / month</td>
            <td>支持 IP 自动切换语言和货币，以及 glossary 能力。</td>
          </tr>
          <tr>
            <td>Pro</td>
            <td>$19.99 / month</td>
            <td>包含更强的自动翻译和第三方应用翻译支持。</td>
          </tr>
          <tr>
            <td>Premium</td>
            <td>$39.99 / month</td>
            <td>包含人工审核和更高阶的服务支持。</td>
          </tr>
        </tbody>
      </table>
      <h2>优势亮点</h2>
      <ul>
        <li>高度自动化，减少反复导入导出和人工同步成本。</li>
        <li>界面更易上手，嵌入 Shopify 后台而不是要求复杂配置。</li>
        <li>支持多币种与结构化内容，适合真正的跨境店铺场景。</li>
        <li>相对同类工具具备更完整的 Shopify 适配思路。</li>
      </ul>
    `,
  },
  {
    title: "Why Shopify localization breaks after launch",
    slug: "about",
    href: "/blog/about",
    sourceHref: `${blogBaseUrl}/about/`,
    publishedAt: "2025-07-31",
    description: "很多 Shopify 商家完成第一次翻译后，真正的问题才刚开始出现：术语漂移、结构化内容漏翻，以及后续更新无法同步。",
    readingTime: "4 min read",
    tags: ["Localization", "Shopify", "Operations"],
    contentHtml: `
      <p>很多 Shopify 商家在第一次把店铺翻成多语言后，会以为主要工作已经完成。真正的问题往往发生在上线之后：新品继续上、主题还在改、FAQ 不断更新，但多语言版本开始慢慢失真。</p>
      <h2>The first translation is only the start</h2>
      <p>第一次翻译通常最容易被看见，因为它有明显的开始和结束。但真正影响体验的，是后续每一次商品更新、活动上线和页面改版，能不能继续保持多语言一致。</p>
      <h2>Where most stores start to drift</h2>
      <p>问题通常不在主文案，而在更细的层面：metafields、FAQ、主题区块、图片文案和促销表达。只要其中一层没有跟上，用户就会感觉这个页面不像为自己准备的版本。</p>
      <h2>Why glossary matters more over time</h2>
      <p>当你开始进入更多市场，术语一致性会变得比第一次翻译速度更重要。品牌词、成分词、系列名和优惠表达如果经常变化，长期会直接影响信任感和转化。</p>
      <h2>What a better workflow looks like</h2>
      <p>更稳的路径通常是先明确哪些内容必须一起被翻译，再用 glossary 和结构化工作流把这些内容持续管住。这样多语言不会只停留在一次性项目，而会变成真正可维护的运营能力。</p>
    `,
  },
  {
    title: "Glossary first: how to keep product terms consistent across markets",
    slug: "coming-soon",
    href: "/blog/coming-soon",
    sourceHref: `${blogBaseUrl}/coming-soon/`,
    publishedAt: "2025-07-31",
    description: "如果品牌词、产品词和优惠表达在不同语言里反复变化，多语言页面很难建立信任感。Glossary 往往是更值得先做的一步。",
    readingTime: "4 min read",
    tags: ["Glossary", "Translation", "Shopify"],
    contentHtml: `
      <p>很多商家在开始做多语言时，会先关注翻译速度和覆盖语言数量。但如果品牌词、产品词和营销表达没有被稳定下来，页面很快就会出现风格漂移。</p>
      <h2>What glossary really solves</h2>
      <p>Glossary 不只是“固定几个词的翻译”，它本质上是在告诉模型：哪些词不能自由发挥，哪些表达必须保持品牌一致。对电商来说，这类词通常就是最影响理解和转化的部分。</p>
      <h2>Which terms should be locked first</h2>
      <p>通常应该先锁定系列名、成分词、功能词、套餐词和优惠表达。它们既频繁出现在商品页、FAQ 和活动页里，又最容易因为模型改写而产生理解偏差。</p>
      <h2>Why consistency matters more than literal accuracy</h2>
      <p>对用户来说，页面是否“像同一个品牌写出来的”往往比逐词准确更重要。只要产品词和优惠表达在不同页面中来回变化，品牌就很难建立稳定感。</p>
      <h2>How to start without overbuilding</h2>
      <p>不用一开始就建立很大的术语库。更有效的做法是先整理最常出现、最影响购买判断的 10 到 20 个词，再随着市场和页面扩展逐步补齐。</p>
    `,
  },
];

export const blogPostMap = Object.fromEntries(blogPosts.map((post) => [post.slug, post]));
