# Design System for Ciwi Official Website

面向 Shopify App 官网、产品页、博客前台和轻量 Demo Center 的统一设计规范。

不是单纯的视觉说明，而是给设计、前端和 agent 共同使用的实现基线。

## Usage

本文件用于以下场景：

- 生成首页、产品页、博客页、帮助中心页的 UI 方案
- 约束官网改造过程中的品牌语言和视觉一致性
- 给 agent 提供稳定的设计 token、页面模板和组件语义

使用原则：

- 参考其文档组织方式，不照搬外部品牌风格
- 保持 Ciwi 自身的品牌识别和 Shopify 电商语境
- 所有新页面优先遵循本文件，再做局部创新

## 1. Design Positioning

Ciwi 官网不是纯宣传站，也不是产品后台镜像。

它需要同时承担四个角色：

- 品牌窗口
- 产品销售前台
- SEO 内容承接层
- 轻量能力演示入口

因此整体设计定位应为：

- 中性、干净、专业
- 有产品感，但不过度后台化
- 有增长感，但不过度营销化
- 有电商场景语义，而不是泛 AI 落地页语言

一句话定义：

> Shopify 增长型 AI 产品官网，强调专业可信、结构清晰、扩展稳定。

## 2. Color Palette

整体不走强饱和营销色，而走“深色文本 + 浅底 + 单一品牌高亮色”的体系。

### Primary

Brand Primary  
`#6841EA`  
主品牌色。用于主 CTA、重点标签、关键交互反馈。

Brand Primary Hover  
`#5633CF`  
主按钮 hover、选中态增强。

Brand Primary Soft  
`#F3EEFF`  
品牌浅底、标签底色、局部高亮背景。

### Neutrals

Ink 900  
`#111827`  
主标题、核心正文、深色区块文字。

Ink 700  
`#374151`  
正文、说明文案。

Ink 500  
`#6B7280`  
辅助信息、标签说明、元数据。

Border 200  
`#E5E7EB`  
边框、分割线、输入框默认边界。

Surface 100  
`#F9FAFB`  
页面浅灰底、模块分区底色。

Surface 0  
`#FFFFFF`  
卡片、正文区、弹层背景。

### Semantic

Success  
`#16A34A`  
成功、已完成、正向状态。

Warning  
`#D97706`  
提醒、试用、限制说明。

Error  
`#DC2626`  
错误、失败、危险操作。

Info  
`#2563EB`  
说明性提示和中性强调。

### Accent Support

Shopify Green  
`#95BF47`  
仅用于 Shopify 生态关联场景、小面积辅助，不作为全站主色。

Demo Highlight  
`#0F172A`  
Demo 对比区、深色数据卡、重点能力展示区。

## 3. Typography Scale

整体建议：

- 英文优先使用 `Inter`
- 中文优先使用系统无衬线字体
- 标题字重偏中高，正文保持克制
- 不使用装饰性字体

### Type Tokens

Display XL  
`56px / 700 / 1.1`  
首页主 Hero，大屏品牌级标题。

Display L  
`44px / 700 / 1.15`  
一级营销标题、产品页 Hero。

Heading 1  
`36px / 700 / 1.2`  
页面主标题。

Heading 2  
`28px / 700 / 1.25`  
模块标题。

Heading 3  
`22px / 600 / 1.3`  
卡片标题、子模块标题。

Body L  
`18px / 400 / 1.75`  
Hero 副标题、重点段落。

Body  
`16px / 400 / 1.7`  
默认正文。

Body S  
`14px / 400 / 1.6`  
辅助文本、列表、说明。

Label  
`13px / 600 / 1.4`  
按钮、标签、表单标签。

Caption  
`12px / 400 / 1.4`  
元信息、更新时间、次级说明。

### Typography Rules

- Hero 标题尽量控制在 2 行内。
- 正文段落宽度建议控制在 `56-72ch`。
- 页面内同一屏不出现超过 3 个标题层级。
- 强调靠字重和留白，不靠滥用颜色。

## 4. Spacing Scale

统一采用 8px 基础节奏。

- `space-1` = `4px`
- `space-2` = `8px`
- `space-3` = `12px`
- `space-4` = `16px`
- `space-5` = `24px`
- `space-6` = `32px`
- `space-7` = `40px`
- `space-8` = `48px`
- `space-9` = `64px`
- `space-10` = `80px`
- `space-11` = `96px`

节奏建议：

- 卡片内边距优先使用 `24px` 或 `32px`
- 页面 section 间距优先使用 `64px` 到 `96px`
- Hero 上下留白可放大到 `96px` 到 `128px`

## 5. Radius & Elevation

整体风格偏干净，不使用厚重阴影。

### Radius

- `8px`：输入框、小标签、小卡片
- `12px`：默认卡片、内容容器
- `16px`：重点模块、Demo 容器
- `999px`：胶囊按钮、状态标签

### Elevation

Card  
轻阴影，适合默认内容卡片  
`0 2px 8px rgba(17, 24, 39, 0.06)`

Panel  
稍强阴影，适合浮层、重点模块  
`0 8px 24px rgba(17, 24, 39, 0.08)`

Hero Media  
媒体和截图容器可用更柔和边框替代重阴影  
优先使用 `border + subtle shadow`

## 6. Button System

按钮需要简洁、稳定、可扩展，不追求夸张的营销造型。

### Primary Filled

- 背景：`Brand Primary`
- 文字：白色
- 用途：主 CTA、关键转化操作

示例：

- Start free trial
- View demo
- Install on Shopify

### Secondary Outline

- 背景：透明
- 边框：`Border 200`
- 文字：`Ink 900`
- 用途：次级跳转、详情查看、次级行动

### Soft Button

- 背景：`Brand Primary Soft`
- 文字：`Brand Primary`
- 用途：标签式行动、模块内小 CTA

### Dark Button

- 背景：`Ink 900`
- 文字：白色
- 用途：深色区块中的强转化 CTA、Demo 区重点操作

### Button Rules

- 默认高度建议 `44px` 到 `48px`
- 按钮圆角统一使用胶囊或 `12px`
- 一屏内主按钮不超过 2 个
- 不同时出现 3 种以上按钮风格

## 7. Signature Components

### Hero Section

首页和一级页面的 Hero 应具备：

- 左侧清晰价值主张
- 右侧产品截图、演示预览或结果可视化
- 两个以内 CTA
- 一句明确的 Shopify 场景说明

Hero 不应：

- 只放空泛口号
- 堆过多按钮
- 使用难以加载的大视频作为唯一核心视觉

### Value Cards

用于展示能力矩阵、产品能力、增长收益点。

规则：

- 3 到 6 张为宜
- 每张卡只表达一个能力
- 标题先讲结果，再讲功能

### Demo Panel

官网差异化组件之一。

适合表现：

- 翻译前后对比
- FAQ / SEO 内容生成
- Bundle discount 场景结果
- 多语言切换效果

形式建议：

- 左右对比
- 输入与输出
- before / after
- 场景卡片 + 数据提升摘要

### Social Proof Block

用于展示商家评价、案例摘要、核心指标。

建议组合：

- 应用评分
- 商家名称
- 关键一句评价
- 行业或站点类型标签

### Blog Feed Card

博客和内容模块要更像产品官网的一部分，而不是独立媒体站。

建议元素：

- 标签
- 标题
- 摘要
- 阅读时间
- 发布时间

### Compare Matrix

服务 SEO 和产品对比页。

适合结构：

- 功能维度
- 电商适配性
- 模型能力
- Shopify 支持深度
- 成本与效率

## 8. Page Templates

### Home

建议结构：

1. Hero
2. 产品矩阵入口
3. 按增长目标拆分的能力模块
4. Demo Center 入口
5. 商家评价与结果证明
6. Blog / Case Study 精选
7. FAQ
8. Final CTA

首页必须回答：

- Ciwi 是谁
- 解决什么问题
- 当前有哪些产品
- 为什么比泛工具更懂 Shopify

### Home Wireframe

首页建议按以下 section 顺序组织，避免继续写成单产品长页面。

#### Section 1. Global Header

结构：

- 左侧 Logo
- 中间一级导航
- 右侧主 CTA

建议内容：

- Products
- Solutions
- Demo
- Resources
- Pricing

右上角 CTA 优先：

- Install on Shopify
- View Demo

Header 规则：

- 高度保持稳定
- 桌面端展示清晰导航
- 移动端收敛为抽屉菜单

#### Section 2. Hero

目标：

- 10 秒内说明 Ciwi 是做什么的
- 明确你们不是普通 AI 工具，而是懂 Shopify 增长的产品团队

结构建议：

- 左：主标题、副标题、主 CTA、次 CTA、社会证明摘要
- 右：产品截图 / 翻译结果可视化 / 演示预览

推荐信息顺序：

- 主标题先讲结果
- 副标题再讲能力组成
- CTA 最多两个
- 补一行 Shopify 场景证明

Hero 可包含的证明素材：

- Shopify App Store 评分
- 已服务商家数量
- 支持语言数量
- 翻译速度或内容效率提升

#### Section 3. Product Matrix

目标：

- 让用户马上知道 Ciwi 不止一个工具
- 给未来产品扩展预留位置

建议卡片数：

- 一期 3 到 4 张

建议首批产品：

- AI Translator
- Bundle Discount
- Content AI
- AI FAQ / SEO Content

每张卡包含：

- 产品名
- 一句话定位
- 2 到 3 个核心结果
- 进入详情页入口

#### Section 4. Growth Outcomes

目标：

- 不按功能分类，而按商家增长目标分类

建议模块：

- 提升跨境转化
- 提升多语言覆盖
- 提升内容生产效率
- 提升客单价与组合购买率

呈现方式建议：

- 4 张结果卡
- 每张卡一个业务目标 + 对应产品映射

#### Section 5. Demo Center Preview

目标：

- 让官网从“介绍”升级为“可验证”

推荐布局：

- 左侧：Demo 说明
- 右侧：交互预览或 before/after

一期建议只放 1 个主 Demo 入口：

- Translator Demo

可展示的次级预告：

- Bundle Discount Demo
- FAQ Content Demo

#### Section 6. Shopify Proof

目标：

- 强化用户对 Shopify 场景适配性的信任

可用元素：

- Shopify App Store 截图
- 应用评分
- 商家评价摘要
- 支持能力标签，如 metafields、Liquid、multi-language

避免：

- 只贴 logo，没有解释价值

#### Section 7. Merchant Testimonials

目标：

- 用真实商家评价替代空泛卖点

建议形式：

- 3 到 6 张评价卡
- 保留商家名称、行业标签、核心评价片段

如果后面有条件，可加：

- 国家 / 语言
- 使用产品
- 结果指标

#### Section 8. Resources Preview

目标：

- 首页直接给 SEO 和内容承接导流

建议分成 3 列：

- Blog
- Help Center
- Compare / Case Study

每列放 2 到 3 个入口，不做过长列表。

#### Section 9. FAQ

目标：

- 处理首页高频疑问，减少用户跳出

建议问题方向：

- 支持哪些 Shopify 场景
- 如何开始使用
- 如何计费
- 是否支持多语言 / 多币种 / glossary
- 与其他翻译工具差异是什么

#### Section 10. Final CTA

目标：

- 给用户明确收口动作

推荐只保留 2 类 CTA：

- Install on Shopify
- Talk to us / Contact

避免底部再出现过多重复链接。

### Product Page

建议结构：

1. Hero
2. 适用商家类型
3. 关键收益
4. 核心功能模块
5. 操作流程
6. 示例结果
7. FAQ
8. CTA

#### Product Page Wireframe

建议标准模板：

- Hero
- 商家适用场景
- 关键收益
- 核心能力模块
- 工作流程
- 结果示例
- FAQ
- Bottom CTA

产品页重点不是把所有功能讲全，而是把：

- 为什么需要它
- 为什么 Ciwi 做得更好
- 使用后会得到什么结果

讲清楚。

### Solution Page

按业务目标组织，不按功能组织。

示例方向：

- 提升跨境转化
- 提升多语言覆盖
- 提升内容生产效率
- 提升客单价与套餐转化

### Blog Page

博客前台应统一品牌，但保持内容阅读性。

建议结构：

1. 分类 / 标签入口
2. 头部摘要区
3. 文章列表
4. 推荐专题
5. 相关文章或关联产品

#### Blog List Rules

- 列表页优先可扫读性
- 标签体系尽量稳定
- 每篇文章都应有可回流到产品页的关联模块
- 列表视觉不要比官网主体更“媒体化”

### Help Center Page

帮助中心前台应更克制，强调检索和问题解决效率。

建议结构：

1. 搜索框
2. 分类卡片
3. 热门问题
4. 文档内容
5. 关联产品 CTA

#### Help Center Rules

- 搜索优先级高于视觉装饰
- 文档正文宽度控制在易读区间
- 页面中保留回到产品页或 Demo 的轻 CTA
- 不把帮助中心做成与官网割裂的另一个品牌系统

## 9. Demo Center Rules

Demo Center 是官网差异化能力，不是完整产品后台。

### 一期推荐

- 文本翻译对比 Demo
- Glossary 干预 Demo
- 图片翻译前后 Demo
- Bundle discount 场景 Demo

### 交互规则

- 无登录即可体验
- 单次交互在几秒内完成
- 优先展示结果，不暴露复杂流程
- 明确标注为演示环境

### 不纳入一期

- 店铺授权
- 真正批量任务
- 长时间异步处理
- 用户级工作台

## 10. Content Tone

官网文案要体现“懂 Shopify 电商”，而不是只会讲 AI。

推荐语气：

- 专业
- 克制
- 直接
- 有业务判断

避免：

- 空泛口号式 AI 叙述
- 大量抽象词堆叠
- 没有业务结果的功能描述

推荐表达重点：

- 转化率
- 多语言覆盖
- 内容效率
- 本地化质量
- AOV
- Shopify 生态兼容性

### 首页文案优先级

首页文案必须优先回答：

1. 你们是谁
2. 你们为 Shopify 商家解决什么问题
3. 你们有哪些产品能力
4. 为什么值得信任
5. 下一步该点哪里

文案顺序上，优先：

- 结果
- 场景
- 证明
- 功能

而不是：

- 概念
- 愿景
- 抽象能力
- 模糊承诺

## 11. Responsive Behavior

### Breakpoints

- `xs`：`< 480px`
- `sm`：`480px - 767px`
- `md`：`768px - 1023px`
- `lg`：`1024px - 1439px`
- `xl`：`1440px+`

### Responsive Rules

- Hero 在桌面端使用左右布局，移动端改为上下堆叠
- 卡片网格优先 `3 -> 2 -> 1` 的降级方式
- 导航在平板以下切换为抽屉或折叠菜单
- Demo 模块移动端应优先保留结果，不保留复杂装饰
- 博客列表和帮助中心列表优先保证可扫读性

### Container Suggestions

- 主内容宽度建议 `1200px` 左右
- 阅读型正文宽度建议 `720px` 到 `820px`
- section 左右边距在移动端不低于 `16px`

## 12. Performance-Oriented Constraints

设计必须服从性能目标。

- 首屏媒体优先静态截图，其次短视频
- 避免把超大视频作为首屏唯一信息载体
- 非首屏模块可延迟加载
- 同类页面复用模板，减少样式和结构分叉
- 图片优先使用现代格式与清晰裁切

## 13. Agent Prompt Guide

给 agent 生成 Ciwi 风格 UI 时，优先使用以下关键词：

### Visual Keywords

- clean SaaS layout
- Shopify ecosystem tone
- neutral background
- purple primary accent
- structured marketing page
- product-led content blocks
- lightweight dashboard polish

### Component Keywords

- hero with product proof
- feature cards with business outcomes
- comparison matrix
- merchant testimonial cards
- demo before-after panel
- blog feed cards

### Color Quick Reference

- Primary CTA：`#6841EA`
- Primary Hover：`#5633CF`
- Primary Soft：`#F3EEFF`
- Main Text：`#111827`
- Secondary Text：`#6B7280`
- Border：`#E5E7EB`
- Surface Gray：`#F9FAFB`
- Card Background：`#FFFFFF`
- Shopify Accent：`#95BF47`

## 14. Current Design Judgment

- 现有首页更像单产品介绍页，不足以承接多产品扩展。
- 现有博客和帮助中心在品牌体验上明显割裂。
- 后续设计应优先建立统一前台语言，再逐步细化组件层和视觉层。
- `design.md` 应作为后续首页、产品页、博客页和 Demo Center 的共同设计基线。
