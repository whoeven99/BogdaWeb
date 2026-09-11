# Ciwi Web Component System

## 1. 目标

这份文档不是重新设计一套理想化系统，而是基于当前 `ciwi-web` 代码中已经存在、并且正在被多类页面复用的组件体系，总结出一套可执行的组件规范。

当前目标有三件事：

1. 把页面从“手写 DOM + 页面局部 class”继续收口到共享组件。
2. 明确哪些组件已经是全站标准入口，后续新增页面必须优先复用。
3. 明确哪些旧写法、例外写法、临时实现不应继续扩散。

## 2. 分层原则

组件体系按 4 层理解，不要跨层乱写：

### 2.1 UI primitives

路径：`src/components/ui`

职责：

- 提供最小可复用交互基元
- 解决链接本地化、按钮视觉、标题排版、返回入口等基础问题
- 不承载页面业务结构

当前核心组件：

- `LocalizedLink.tsx`
- `Button.tsx`
- `CardCtaLink.tsx`
- `SectionHeading.tsx`
- `BackLink.tsx`
- `PageContainer.tsx`

### 2.2 Cards

路径：`src/components/cards`

职责：

- 处理列表项级信息封装
- 默认用于列表页、资源页、产品矩阵、社证模块
- 不直接承担页面大区块布局

当前核心组件：

- `ProductCard.tsx`
- `ArticleCard.tsx`
- `TestimonialCard.tsx`
- `UseCasePlaybookCard.tsx`
- `ContentIndexCard.tsx`

### 2.3 Sections

路径：`src/components/sections`

职责：

- 封装页面级区块
- 负责 section 节奏、heading、内部卡片/列表组织方式
- 页面应优先组合 section，而不是每个页面重写 section 结构

当前核心组件：

- `HeroSection.tsx`
- `ContentIndexHero.tsx`
- `ProductMatrixSection.tsx`
- `OutcomeSection.tsx`
- `SocialProofSection.tsx`
- `ResourcesSection.tsx`
- `FaqSection.tsx`
- `FinalCtaSection.tsx`
- `DetailHeroPanel.tsx`
- `UseCaseHero.tsx`
- `ChecklistCardGrid.tsx`
- `ComparisonCardStack.tsx`
- `HeroPreviewCardGrid.tsx`
- `ResourceCollectionSection.tsx`
- `SimpleCardGridSection.tsx`
- `NumberedCardGridSection.tsx`
- `StackedInfoPanel.tsx`
- `ProductFeatureSpotlightsSection.tsx`
- `DemoShowcaseSection.tsx`
- `InteractiveDemoExplorer.tsx`
- `ProductAnchorNav.tsx`

### 2.4 Page templates

路径：`src/app/**/page.tsx`

职责：

- 只负责组装内容
- 决定区块顺序、schema、数据映射、少量页面级差异
- 不应继续创造新的通用视觉模式

## 3. 当前共享基线

### 3.1 容器与宽度

- 外层统一使用 `PageContainer`
- 介绍页 Hero 与正文区需保持统一版心
- 非首页 Hero 禁止额外套“展示型卡片壳”
- Hero `h1` 必须使用放宽后的宽度策略，避免中文过早折行

### 3.2 设计 Token 基线

当前 token 来源：`src/styles/tokens.css`

核心颜色：

- 主色：`--color-primary: #008060`
- 主色 hover：`--color-primary-hover: #00664f`
- 主色浅底：`--color-primary-soft: #e8f5ee`
- 正文主文字：`--color-ink-900: #111827`
- 次级正文：`--color-ink-700: #374151`
- 弱化文字：`--color-ink-500: #6b7280`
- 边框：`--color-border: #e5e7eb`
- 页面背景：`--color-surface: #ffffff`
- 浅背景：`--color-surface-soft: #f9fafb`
- 深底演示色：`--color-demo: #0f172a`

核心圆角：

- `--radius-sm: 8px`
- `--radius-md: 12px`
- `--radius-lg: 16px`
- `--radius-pill: 999px`

核心阴影：

- 卡片：`--shadow-card`
- 面板：`--shadow-panel`

核心间距：

- `--space-1` 到 `--space-11` 对应 4px 到 96px
- 当前页面常用节奏集中在 `--space-4` 到 `--space-10`

规范：

- 新样式优先复用 token，不直接引入新的随机色值和随机圆角
- 页面局部可以用 Tailwind 原子类表达，但视觉结果应回到现有 token 体系
- 主色只作为强调和交互反馈使用，不应该把整页做成高饱和绿色界面

### 3.3 字体与字号

当前字体基线：

- 全站字体统一使用 `var(--font-geist-sans)` 回退系统字体
- 正文不混用多套字体
- 中文与英文页面共用同一套无衬线体系

当前字号基线：

- Hero `h1`：`text-4xl` 起步，桌面端放大到 `sm:text-5xl` 或 `lg:text-[56px] / lg:text-[60px]`
- Section `h2`：以 `text-2xl sm:text-3xl` 为主
- 卡片标题：多为 `text-[22px]` 或 `text-2xl`
- 正文：多为 `text-[15px] leading-7` 或 `text-[15px] leading-8`
- Hero 描述：`text-base` 到 `lg:text-[17px]`
- Meta / eyebrow：`text-[10px]` 或 `text-[11px]` 的 uppercase 小标签

规范：

- 标题优先通过 `SectionHeading` 统一
- 正文主尺寸以 `15px` 为默认基线，不要在普通正文里大面积混入 13px、14px、16px 多套体系
- 小字只用于 meta、eyebrow、辅助信息，不用于大段正文
- 标题与正文的字重应克制，优先使用 `font-semibold` 和常规字重，不堆叠过多超粗字重
- 标题继续保持负字距风格，但不要在正文段落滥用 tracking 调整

### 3.4 配色原则

当前站点风格不是高饱和营销页，而是偏安静、浅底、低噪音的信息型界面。

规范：

- 页面底色优先使用白色、浅灰、浅绿渐变，不做大面积纯黑或高饱和块
- 正文阅读区优先使用 `slate` 系文字和浅边框
- 绿色用于：
  - CTA hover
  - 链接强调
  - eyebrow / 状态点缀
  - FAQ、CTA、pill 的弱强调
- 禁止把绿色同时用于大面积背景、正文主文字、边框高亮，避免整页“发绿”
- 深色背景仅用于首页 Hero、演示窗、少数产品演示模块，不作为全站默认语气

### 3.5 间距节奏

当前共享区块基线：

- 常规 section：`py-12 sm:py-14 lg:py-16` 或 `page-section`
- 强信息区块：`py-12 sm:py-16 lg:py-20`
- 卡片内部正文多采用：
  - 标题后 `mt-4` 到 `mt-5`
  - CTA 前 `mt-7`
  - 正文行高以 `leading-7` 或 `leading-8` 为主

规范：

- 继续优先复用现有节奏，不要为单页局部重新发明 spacing 体系
- 需要更紧或更松时，优先扩展共享 section 或共享 hook class，而不是在页面里随意散写
- 高信息密度不等于紧贴，区块内至少保留清晰的标题层、正文层、操作层间距
- 同类卡片列表在同一页面内必须保持一致的垂直节奏

### 3.6 标题系统

`SectionHeading` 是默认标题入口：

- `as="h1"` 用于页面 Hero
- `as="h2"` 用于 section 标题
- 默认支持 `eyebrow / title / description / action`

规范：

- 新 section 优先使用 `SectionHeading`
- 不再新增页面级手写 hero heading 结构，除非已验证现有组件确实不适配
- `eyebrow` 只在信息分类有意义时使用，禁止为“看起来像设计系统”而滥用

## 4. 核心标准组件

### 4.1 `Button`

文件：`src/components/ui/Button.tsx`

用途：

- 页面主 CTA / 次 CTA / ghost 操作 / 浅底反差按钮

允许 variant：

- `primary`
- `secondary`
- `ghost`
- `dark`

规范：

- 页面 CTA 一律优先用 `Button`
- 禁止在页面里手写按钮视觉 class 复制按钮样式
- 需要新视觉时，先判断是否应扩展 `Button` 的 variant
- `primary` 用于页面主动作，一个区块通常只保留一个主按钮
- `secondary` 用于与主动作并列的次入口，适合浅底场景
- `ghost` 用于补充导航、轻操作、低优先级动作，不与主按钮争抢视觉重心
- `dark` 只用于深底或特殊反差场景，不应扩散成默认样式
- 同一区块按钮数量尽量控制在 1 到 2 个，超过 2 个通常说明结构需要重组

### 4.2 `CardCtaLink`

文件：`src/components/ui/CardCtaLink.tsx`

用途：

- 卡片尾部轻量 CTA
- 列表项“阅读/查看详情/打开内容”

规范：

- 卡片内部优先使用 `CardCtaLink`
- 页面底部主 CTA 禁止误用 `CardCtaLink`
- `variant="text"` 适合资源和文章类入口

### 4.3 `BackLink`

文件：`src/components/ui/BackLink.tsx`

用途：

- 详情页顶部统一返回入口

规范：

- 所有详情页返回入口统一使用 `BackLink`
- 页面只传 `href` 和 `label`
- 禁止继续新增 `guide-backlink`、`best-apps-backlink` 一类页面私有返回链接体系

### 4.4 `SectionHeading`

文件：`src/components/ui/SectionHeading.tsx`

用途：

- Hero 标题
- section 标题
- 带 action 的 section 标题

规范：

- 除 `about`、`blog`、`help-center` 这类已有特殊封装外，新区块默认从 `SectionHeading` 开始
- 页面样式扩展要挂在组件外层 hook 上，不直接依赖旧 `.section-heading` 结构

## 5. 卡片规范

### 5.1 现有卡片类型

- `ProductCard`: 产品矩阵
- `ArticleCard`: 资源/对比/文章入口
- `TestimonialCard`: 评价与社证
- `UseCasePlaybookCard`: 用例方案集入口

### 5.2 统一原则

- 卡片以内容为主，不以线框装饰为主
- 不叠加多层外框
- 卡片内部最多保留一层主要容器
- 列表页优先复用现有卡片，不再把每个列表页写成不同结构

### 5.3 标签/Meta 规范

- `meta` 可以用于真正有信息作用的分类、日期、阅读时长、产品名
- 没有导航价值、没有筛选价值、没有语义价值的装饰性标签不应继续新增
- 非首页介绍页尤其避免“无链接纯装饰 chips”

## 6. Section 规范

### 6.1 `FinalCtaSection`

文件：`src/components/sections/FinalCtaSection.tsx`

当前已是全站底部 CTA 标准入口。

可扩展点：

- `body`
- `panelClassName`
- `actionsClassName`
- `eyebrow`
- `secondaryLabel / secondaryHref`

规范：

- 页面底部 CTA 必须优先使用 `FinalCtaSection`
- 禁止再手写 `final-cta-panel` DOM
- 禁止纯黑背景 final CTA
- 浅底深字是默认规范
- 页面差异通过 class hook 注入，不复制整段结构

### 6.2 `FaqSection`

文件：`src/components/sections/FaqSection.tsx`

当前已被首页、产品页、对比页、guides、resources、reviews、use-cases 等页面复用，是站点正文 FAQ 的标准入口。

当前能力：

- 可选 `eyebrow`
- 可选 `title`
- 可选 `description`
- `items`
- `evidence`

规范：

- 正文 FAQ 一律优先用 `FaqSection`
- 默认使用右侧展开 icon 的 accordion 形式
- FAQ 回答保持一层核心段落；补充证据用 `evidence`
- FAQ 区块应与 `FAQ schema` 数据源保持一致

禁止：

- 在普通页面继续手写 `<details><summary>` FAQ 结构
- 为单页额外做一套 FAQ 视觉体系

当前遗留例外：

- `src/components/content/mdx-components.tsx` 里有 `FaqAccordion`
- `contact/page.tsx` 使用了 `.faq-list` 作为按钮堆叠容器，语义已漂移

后续统一方向：

- MDX FAQ 应收敛到与 `FaqSection` 同一视觉语言，至少抽出共享 FAQ item
- `faq-list / faq-item` 这些旧类需要逐步退场，避免与现有 `FaqSection` 并存

### 6.3 `DetailHeroPanel`

文件：`src/components/sections/DetailHeroPanel.tsx`

用途：

- 统一 guides / product research / review / best-apps 等详情页 Hero 中段

结构：

- `metaItems`
- `summary`
- `intro`
- `actions`
- `toc`

规范：

- 详情页 Hero 中段优先使用 `DetailHeroPanel`
- `metaItems` 控制事实信息，不放营销短句
- `summary` 用于核心判断
- `intro` 用于补充解释
- `toc` 仅在长内容详情页启用
- 页面差异优先通过 `metaGridClassName` 和外围 hook 控制

### 6.4 `UseCaseHero`

文件：`src/components/sections/UseCaseHero.tsx`

用途：

- 统一 use-case 详情页 Hero

规范：

- use-case 详情页不要再手写 hero 顶部结构
- 保持“返回入口 -> 标题/描述 -> CTA -> meta”这套轻量顺序

### 6.5 `HeroSection`

文件：`src/components/sections/HeroSection.tsx`

用途：

- 首页 Hero

注意：

- 首页允许更强视觉表达
- 非首页不要直接复制首页 Hero 的视觉面板和 chips 结构

### 6.6 `ProductAnchorNav`

文件：`src/components/sections/ProductAnchorNav.tsx`

用途：

- 长产品详情页的页内锚点导航

规范：

- 多 section 长详情页优先使用它
- 页内导航应服务于结构定位，不做无意义标签堆叠

### 6.7 `SimpleCardGridSection`

文件：`src/components/sections/SimpleCardGridSection.tsx`

用途：

- 普通信息卡片网格
- 适合“标题 + 描述”或“单段说明”这类轻量 section

已开始覆盖的页面类型：

- 产品详情的普通能力卡
- `solutions` 中的 challenges
- `reviews` / `best-apps` 中的信息说明卡

规范：

- 当 section 只是重复输出一组轻量说明卡时，优先使用它
- 不要继续在页面里手写 `card-grid > article.surface-card > h3/p`
- 如果只是视觉不同但结构同构，优先通过 `cardClassName / gridClassName` 扩展

### 6.8 `ChecklistCardGrid`

文件：`src/components/sections/ChecklistCardGrid.tsx`

用途：

- 双列或纵向的清单卡片组合
- 每张卡片由标题 + 一组列表项组成

已开始覆盖的页面类型：

- 产品详情的 `audience fit`
- reviews 的 `pros / cons`

规范：

- 当页面只是重复输出“卡片标题 + checklist”时，优先使用它
- 不要继续手写 `surface-card > h3 > ul.check-list`
- 通过 `gridClassName / cardClassName` 控制它在详情页右栏、双列区块、纵向堆叠区的不同布局

### 6.9 `ComparisonCardStack`

文件：`src/components/sections/ComparisonCardStack.tsx`

用途：

- 对比型信息卡栈
- 每张卡以“标题 + 多列 checklist”组织，适合 strengths/watchouts、advantages/limitations 这类成对信息

已开始覆盖的页面类型：

- `guides` 中的 solution / workflow 对比卡
- `product-research` 详情和 hub 页的 tools 对比卡

规范：

- 当页面结构是“一个对象 + 两列以上要点对比”时优先使用它
- 可以带 `chips` 和 `footer`，但不要把它扩展成通用大杂烩卡片
- 不再继续手写 `guide-solution-stack > article > guide-solution-card__columns`

### 6.10 `NumberedCardGridSection`

文件：`src/components/sections/NumberedCardGridSection.tsx`

用途：

- 步骤、方法、关键演示点等带顺序的信息网格

已开始覆盖的页面类型：

- 产品详情的 `demo focus` / `workflow`
- `solutions` 的 `approach`

规范：

- 需要 `01 / 02 / 03` 这类顺序感时优先使用它
- 编号是结构提示，不是视觉装饰，不要把它扩散到普通信息卡
- 页面里不要继续手写 `h3` 编号拼接逻辑

### 6.11 `StackedInfoPanel`

文件：`src/components/sections/StackedInfoPanel.tsx`

用途：

- Hero 右侧信息侧栏
- 适合把文本说明、清单、chips 组合在一张信息面板里

已开始覆盖的页面类型：

- 产品详情 Hero 右侧信息卡
- `solutions` Hero 右侧信息卡

规范：

- 这类“标题区左侧 + 信息面板右侧”的结构优先使用它
- 面板内部允许混合三种信息块：`description`、`items`、`chips`
- 只是信息块内容不同，不要再为每个页面复制一套侧栏 DOM

### 6.12 `ResourceCollectionSection`

文件：`src/components/sections/ResourceCollectionSection.tsx`

用途：

- 资源聚合页中的入口区块
- 标准结构是 `SectionHeading + ArticleCard 网格 + CTA / empty state`

已开始覆盖的页面类型：

- `resources/page.tsx` 中的 use cases、help center、blog、compare、best apps、product research 等聚合入口
- `compare / solutions / best-shopify-apps / tool reviews` 等纯卡片型入口页
- `guides` hub 和 `product-research` hub 的资源列表区块

规范：

- 资源型和列表型 hub 页优先使用它，而不是重复手写 `SectionHeading + grid + Button`
- 空状态也通过它统一，不要为未发布内容再写一套新的空态块
- 当某个区块只是展示资源卡片网格、没有标题时，可以省略 heading，只复用卡片列表

### 6.13 `ContentIndexHero`

文件：`src/components/sections/ContentIndexHero.tsx`

用途：

- 内容索引页和入口页 Hero
- 标准结构是 `eyebrow + h1 + description`，现在也支持可选 `actions` 和补充内容 `children`

已开始覆盖的页面类型：

- blog
- help center
- resources
- compare
- products
- use cases
- solutions
- best shopify apps
- tool reviews
- guides hub
- product research hub

规范：

- 入口页 Hero 优先使用它，而不是继续手写 `content-hero-shell + SectionHeading + buttons`
- 当 Hero 只有标题说明时直接用基础形态
- 当 Hero 需要 1 到 2 个入口动作时，通过 `actions` 传入按钮，不再复制整段布局
- 当 Hero 下方还需要补一个预览网格或附加说明时，通过 `children` 承接，不再回退到页面私有 Hero 结构

### 6.14 `HeroPreviewCardGrid`

文件：`src/components/sections/HeroPreviewCardGrid.tsx`

用途：

- Hero 下方的预览卡片组
- 适合入口页首屏直接展示 2 到 3 个重点能力或预览方向

已开始覆盖的页面类型：

- `demo/page.tsx`

规范：

- 当 Hero 下方只是少量预览卡片时优先使用它
- 支持普通卡片和 accent 卡片混排，但不要把它扩成通用内容网格
- 页面不要继续手写 `hero-panel` 和 `surface-card` 的混合 Hero 卡片结构

## 7. 共享样式 hook 规范

主样式文件：`src/app/globals.css`

共享 hook 已形成几个稳定层次：

- 布局：`page-section`、`page-section--compact`
- 通用容器：`surface-card`
- 详情页 Hero：`guide-meta-grid`、`guide-hero__layout`、`guide-toc`
- CTA：`final-cta-panel`
- 标签：`pill`
- 清单：`check-list`
- 功能 Spotlight：`feature-spotlight`

规范：

- 样式扩展优先挂在共享组件的 hook 上
- 不要直接把页面样式绑死在旧 DOM 层级上
- 可以加页面级 modifier class，但必须建立在共享组件结构之上

## 8. 禁用模式

以下模式不应继续新增：

1. 页面手写底部 CTA 结构
2. 页面手写返回入口视觉
3. 非首页 Hero 套额外卡片壳
4. 无链接、无筛选、无语义价值的装饰性 chips
5. 为单个页面复制一整套 FAQ DOM
6. 页面本地直接拼按钮视觉 class，绕过 `Button`
7. 同类列表页继续各写一套卡片结构
8. 直接操作旧 `.section-heading` 内部结构来实现页面特例

## 9. 当前允许的例外

以下例外暂时允许存在，但不应继续扩散：

### 9.1 `about/page.tsx`

- 当前仍是手写简化 Hero
- 原因是该页内容气质与营销型 Hero 不同
- 但其版心、标题、正文节奏仍需遵循共享基线

### 9.2 `BlogFeed.tsx` / `HelpCenterLanding.tsx`

- 当前各自维护自定义 Hero 和列表结构
- 原因是分页、筛选、内容列表交互较强
- 后续可考虑抽出 `ContentIndexHero` / `ContentIndexCard` 级别组件，但暂不强行并入 `SectionHeading + Card` 组合

### 9.3 `MDX FAQ`

- 当前在 `mdx-components.tsx` 内独立实现
- 这是待统一对象，不是新的长期标准

## 10. 新增页面/模块时的执行顺序

后续新增页面或重构旧页面时，按这个顺序做：

1. 先判断是否已有对应 section 组件
2. 没有 section 时，先看是否只是卡片组合问题
3. 没有卡片时，再看是否只是 UI primitive 组合问题
4. 只有在现有层级都不适配时，才新增共享组件
5. 新增共享组件后，必须反查是否能替换旧页面中的同类手写结构

## 11. 下一批优先统一对象

基于当前代码，下一批最值得继续收口的对象是：

1. `MDX FAQ` 与正文 `FaqSection` 的统一
2. `contact/page.tsx` 中误用 `.faq-list` 的局部结构清理
3. 双列清单卡与 Hero 侧栏清单这类结构继续收口，减少 `detail-grid > surface-card > ul` 的重复实现
4. 更多内容索引页继续复用 `ContentIndexHero / ContentIndexCard`，不要再新增平行实现

## 12. 结论

从现在开始，组件系统以这份文档为基线：

- `Button / CardCtaLink / SectionHeading / BackLink` 是 UI 入口
- `ProductCard / ArticleCard / TestimonialCard / UseCasePlaybookCard / ContentIndexCard` 是卡片入口
- `FinalCtaSection / FaqSection / DetailHeroPanel / UseCaseHero / ContentIndexHero / HeroPreviewCardGrid / ChecklistCardGrid / ComparisonCardStack / ResourceCollectionSection / SimpleCardGridSection / NumberedCardGridSection / StackedInfoPanel` 是当前最重要的页面级标准组件

后续工作重点不是继续为单页“补一个更像的样式”，而是继续减少页面私有结构，把已经出现复用趋势的模式收口进共享组件。
