# 官网改造计划

## 1. 项目目标

本次改造的目标不是简单重做首页，而是把官网建设成一套可持续扩展的 Shopify App 增长前台。

核心目标：

- 统一品牌语言：官网、博客、帮助中心尽量呈现为同一品牌体验。
- 提升扩展性：后续可自然接入更多产品、解决方案、案例和演示页面。
- 保持加载速度：优先静态化，少量交互区域按需动态化。
- 增强内容能力：支持 SEO、自然流量承接、专题页、对比页、博客和文档。
- 提供轻量演示：让用户在官网直接理解产品能力，而不是只看宣传文案。

## 2. 当前现状

- `ciwi-web`
  - 当前是 Next.js 官网壳子。
  - 首页可用，但大量二级页面仍是占位或未真正落地。
  - `public/` 中仅保留部分帮助中心截图素材供现有页面复用。
- 当前内容系统
  - Blog 与 Help Center 已迁移到 `ciwi-web` 的 `MDX + frontmatter` 体系。
  - 旧 `public/blog` 已移除，旧帮助中心静态站点也已清理，仅保留图片素材。

## 3. 目标架构

推荐架构：

- `ciwi-web` 作为唯一前台品牌站点。
- 内容统一由仓库内 `MDX + frontmatter` 管理。
- 博客、帮助中心、产品页、对比页、案例页最终都收敛到统一前台风格。
- 演示能力统一在官网内部实现，避免再分裂出独立站点。

一句话定义：

> 一个前台品牌层，多个内容与能力来源。

## 4. 内容与页面分层

建议官网信息架构：

- Home
- Products
- Solutions
- Demo Center
- Compare
- Case Studies
- Blog
- Help Center
- Pricing
- About / Contact / Policy

其中：

- `Products`：承接翻译、Bundle Discount、内容生成等产品线。
- `Solutions`：按商家场景拆分，如跨境、多语言、提转化、提 AOV。
- `Demo Center`：提供轻量体验能力。
- `Compare`：承接 SEO 型竞品对比页。
- `Blog`：承接自然流量和行业内容。
- `Help Center`：承接使用说明和长尾问题。

### 4.1 顶层导航建议

推荐顶层导航控制在 6 个以内，避免官网首页还没清晰就先把导航做成目录树。

建议一级导航：

- Products
- Solutions
- Demo
- Resources
- Pricing
- About

其中：

- `Products`：放具体产品线，如 Translator、Bundle Discount、Content AI
- `Solutions`：放面向业务目标或商家阶段的解决方案页
- `Demo`：放可直接体验的轻量演示能力
- `Resources`：聚合 Blog、Help Center、Case Studies、Compare
- `Pricing`：价格页单独放一级，服务转化
- `About`：承接 About、Contact、Policy 等品牌与合规信息

### 4.2 URL 结构建议

建议避免继续使用根级随意 slug 的方式，而是切换为有语义的分层路由。

推荐结构：

- `/`
- `/products`
- `/products/translator`
- `/products/bundle-discount`
- `/products/content-ai`
- `/solutions`
- `/solutions/increase-conversion`
- `/solutions/multilingual-growth`
- `/solutions/grow-aov`
- `/demo`
- `/demo/translator`
- `/demo/bundle-discount`
- `/compare`
- `/compare/ciwi-vs-transcy`
- `/compare/ciwi-vs-langwill`
- `/cases`
- `/cases/{slug}`
- `/blog`
- `/blog/{slug}`
- `/help-center`
- `/help-center/{category}`
- `/help-center/{category}/{slug}`
- `/pricing`
- `/about`
- `/contact`
- `/privacy-policy`
- `/terms-and-conditions`

### 4.3 页面类型分层

从建设顺序看，页面可以分成四层：

- 品牌页
  - Home、About、Contact、Pricing
- 产品页
  - Products、Product Detail、Demo
- 内容页
  - Blog、Case Studies、Help Center
- SEO 承接页
  - Compare、专题页、长尾解决方案页

建议优先顺序：

1. Home / Products / Pricing / Blog 入口
2. Translator 产品页 / Demo 页
3. Solutions 页 / Compare 页
4. Cases / Help Center 前台统一

## 5. 演示能力边界

官网需要演示能力，但不应变成真正的产品后台。

适合放在官网的能力：

- 翻译前后对比
- Glossary 术语干预示例
- 图片翻译前后示例
- Bundle discount 场景演示
- 多语言 / 多币种切换演示

不建议在官网一期承接的能力：

- 店铺授权
- 真实任务队列
- 长时异步处理
- 完整管理后台

## 6. 技术方向

总体原则：

- 前台统一使用 Next.js。
- 以可缓存、可静态化、可持续扩展为优先。
- 内容系统与前台展示解耦，但不急于一步到位重构全部后台。

阶段性建议：

- 第一阶段：统一官网前台结构和内容模型。
- 第二阶段：完善 Git-based 内容生产、校验、i18n 与富媒体能力。
- 第三阶段：接入 Demo Center 和更完整的 SEO 页面体系。

## 7. 一期范围

一期优先做：

- 官网信息架构重构
- 首页重写
- 产品页模板
- 解决方案页模板
- Demo Center 骨架
- Blog 入口和内容聚合方案
- Help Center 接入策略
- 统一导航、页脚、品牌表达

一期不强求：

- 全量历史博客迁移
- 帮助中心完全重构
- 多语言官网
- 完整 CMS 重建

### 7.1 一期页面优先级

#### P0：必须先落地

- Home
- Products Overview
- Translator Product Page
- Pricing
- Resources Hub
- Blog List Entry
- Demo Center Hub
- Translator Demo
- About / Contact / Policy

#### P1：应尽快补齐

- Bundle Discount Product Page
- Content AI Product Page
- Solution Overview
- 2 到 3 个 Solution Detail Pages
- 2 到 3 个 Compare Pages
- Blog Detail Unified Frontend Strategy
- Help Center Unified Frontend Strategy

#### P2：后续扩展

- Case Studies Hub
- Case Detail Pages
- 更多 Compare 页面
- 更多 Demo 页面
- 多语言官网前台

### 7.2 一期内容优先级

一期内容不求全，但必须先把“品牌理解 + 核心产品 + 结果证明”讲清楚。

优先内容：

- Translator 核心价值主张
- Bundle Discount 的增长定位
- 你们对 Shopify 本地化和转化的理解
- 商家评价和结果证明
- 3 到 5 篇具备 SEO 价值的博客内容入口

可以后补：

- 全量产品矩阵
- 大规模案例库
- 长尾帮助中心结构

### 7.3 一期交付物

一期结束时，至少应有以下成果：

- 统一前台导航和页脚
- 可上线的新版首页
- 至少 1 个完整产品页模板
- 至少 1 个可交互 demo
- Blog 前台入口和文章承接策略
- 文档化的信息架构和设计基线

## 8. 实施顺序建议

建议按以下顺序推进：

1. 信息架构和路由定稿
2. 首页与产品页模板定稿
3. 导航、页脚、全局样式重构
4. 首页与 Translator 产品页落地
5. Demo Center 骨架落地

## 9. 当前实施进度

截至当前代码状态，以下内容已经落地到 `ciwi-web`：

- 新版官网已切换到目录化路由结构：
  - `/products`
  - `/products/[slug]`
  - `/blog`
  - `/blog/[slug]`
  - `/help-center`
  - `/resources`
  - `/compare`
  - `/compare/[slug]`
  - `/demo`
- 已建立统一的前台 layout、导航、页脚、基础 section 组件和内容配置层。
- 已建立基础 metadata 工具层，并统一各页面 metadata 输出。
- 已完成首页、Products、Translator、Resources、Blog、Help Center、Compare 的第一版前台骨架。
- 已将 Solutions 从入口骨架推进为内容驱动的列表页和详情页模板，并落地 3 个场景页。
- 已将 Blog 与 Help Center 切换到仓库内 MDX 内容源，并由 Next 统一前台渲染。
- 已为 Blog 详情页补充目录、section anchor、相关文章入口和基础 JSON-LD。
- 已将 Compare 页从简单说明页升级为正式模板，包含摘要、适配对象、对比维度、FAQ 和回流模块。
- 已为 Compare 列表页和详情页补充 breadcrumb、FAQ 和页面 schema 基础层。
- 已继续扩充 Help Center 的高价值文档详情页，并补更细的资源回流。
- 已新增原生 Shopify 方案和更多竞品对比页，继续推进 Compare 页面族扩展。
- 已将轻量 Demo 展示模块接入首页和 Translator 产品页。
- 已为 Translator 页面补充锚点导航，并将交互式 Demo 升级为样例输入切换式展示。
- 已开始将 Help Center 的高价值文档详情页迁入统一前台模板，并补充目录、section anchor 与基础 schema。
- 已将 Help Center 聚合页拆成 featured docs / all docs 两层，避免入口页继续膨胀。
- 已为首页、Products、Solutions、Compare、Blog、Help Center 及关键静态页补上统一的图片 / 视频占位区块，并附素材说明。
- 已让旧根级 slug 兼容页自动跳转到新版目录化页面，并把 canonical 收敛到新地址。
- 已保留旧根级 slug 的兼容层，用于承接历史链接。

### 9.1 当前仍未完成的关键点

- Help Center 详情页已开始迁移，但当前只覆盖首批高价值文档，尚未形成完整前台文档体系。
- Blog 与 Help Center 已采用 Git-based 内容体系，当前重点转向内容脚手架、发布流程与历史静态残留清理。
- Demo 已具备样例输入切换式交互，但仍不包含真实任务处理或后端联动。
- Blog / Help Center / Compare / Solutions 的基础结构化数据已接入，但 canonical 策略、相关推荐质量和内容同步链路仍需要继续补完。
- Help Center 当前虽然已覆盖更多高价值文档，但随着文档继续增加，仍需要进入 topic grouping / filter 层，避免入口页再次变重。
- Help Center 入口虽然已经完成两层拆分，但随着文档继续增加，下一步需要进入 topic grouping / filter 层。

### 9.2 当前阶段判断

项目已经从“准备实施”进入“核心页面模板已开始落地”的阶段。

现阶段的重点不应再是继续扩充抽象规划，而是：

1. 完善已落地模板的深度
2. 打通高价值内容页
3. 补强 SEO 和内链体系
4. 逐步让 Demo 更像真实能力证明
6. Blog 与 Resources 入口整合
7. Compare / Solution / Cases 扩展

## 9. 成功标准

- 用户进入官网后，能快速理解 Ciwi 的产品线和电商价值。
- 官网可自然扩展到多个产品，而不是继续围绕单一翻译产品堆内容。
- 博客、帮助中心、产品页之间具备统一导航和品牌表达。
- 新增一个产品或一个 SEO 专题页时，不需要再引入新的站点体系。
