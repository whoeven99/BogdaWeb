# 页面模板体系

本文件定义官网改造中应优先建立的页面模板类型、固定模块、SEO 要求和可配置字段。

目标：

- 降低每新增一个页面的实现成本
- 提高同类页面的一致性
- 让 SEO 页面可以规模化扩展
- 避免每个页面都重新设计和重新组织结构

## 1. 模板设计原则

- 同一类页面必须复用同一套模板结构
- 模板数量控制在 5 到 6 套以内
- 模板中分离“结构固定部分”和“内容可配置部分”
- 模板优先为 SEO、内链和扩展服务，而不是只服务当前首批页面

## 2. 模板总览

一期建议优先建立以下模板：

- Product Page Template
- Solution Page Template
- Compare Page Template
- Blog Article Template
- Help Article Template
- Resource Hub Template

## 3. Product Page Template

### 适用页面

- `/products/translator`
- `/products/bundle-discount`
- `/products/content-ai`

### 固定模块

1. Hero
2. 适用商家 / 适用场景
3. 核心收益
4. 关键功能模块
5. 工作流程
6. 结果展示 / Demo 入口
7. FAQ
8. 关联资源
9. Final CTA

### SEO 要求

- 每页只有一个明确 `H1`
- 标题优先包含产品名 + Shopify 语义
- 应包含产品相关 FAQ schema
- 应内链到 blog、help center、compare、demo

### 可配置字段

- `slug`
- `productName`
- `heroTitle`
- `heroDescription`
- `primaryCta`
- `secondaryCta`
- `targetUsers`
- `benefits`
- `features`
- `workflowSteps`
- `faqs`
- `relatedResources`

## 4. Solution Page Template

### 适用页面

- `/solutions/increase-conversion`
- `/solutions/multilingual-growth`
- `/solutions/grow-aov`

### 固定模块

1. Hero
2. 问题定义
3. 典型场景
4. 对应解决方案
5. 推荐产品组合
6. 结果证明
7. FAQ
8. CTA

### SEO 要求

- 标题围绕商家问题和结果词组织
- 内容需覆盖问题、方案、适用人群三层
- 页面应回链到具体产品页

### 可配置字段

- `problemStatement`
- `targetSegments`
- `solutionModules`
- `recommendedProducts`
- `proofPoints`
- `faqs`

## 5. Compare Page Template

### 适用页面

- `/compare/ciwi-vs-transcy`
- `/compare/ciwi-vs-langwill`

### 固定模块

1. Hero 对比结论
2. 适用人群摘要
3. 对比矩阵
4. Shopify 场景差异
5. 为什么选择 Ciwi
6. FAQ
7. CTA

### SEO 要求

- 标题必须包含双方品牌名
- 页面正文必须包含明确对比维度
- 支持 FAQ schema
- 应回链到对应产品页和案例内容

### 可配置字段

- `primaryBrand`
- `competitorBrand`
- `comparisonSummary`
- `comparisonRows`
- `recommendation`
- `faqs`

## 6. Blog Article Template

### 适用页面

- `/blog/[slug]`

### 固定模块

1. 文章头部信息
2. 目录
3. 正文
4. 相关文章
5. 关联产品
6. 作者 / 发布时间 / 标签

### SEO 要求

- 支持 Article schema
- 支持 Open Graph 和 Twitter metadata
- 标题、摘要、目录结构稳定
- 页尾必须有产品回流模块

### 可配置字段

- `title`
- `excerpt`
- `coverImage`
- `author`
- `publishedAt`
- `tags`
- `body`
- `relatedPosts`
- `relatedProducts`

## 7. Help Article Template

### 适用页面

- `/help-center/[category]/[slug]`

### 固定模块

1. 问题标题
2. 简短答案摘要
3. 步骤说明
4. 相关问题
5. 相关产品 / Demo

### SEO 要求

- 标题尽量采用问题式表达
- 支持 FAQ / HowTo 类型结构化数据
- 页面需可快速扫读

### 可配置字段

- `question`
- `summary`
- `steps`
- `relatedArticles`
- `relatedProducts`

## 8. Resource Hub Template

### 适用页面

- `/blog`
- `/help-center`
- `/compare`
- `/resources`

### 固定模块

1. Hero
2. 分类或筛选
3. 内容列表
4. 精选内容
5. 产品回流入口

### SEO 要求

- 列表页要有清晰分类和分页策略
- 分类页标题和描述需要可配置
- 每个 hub 都应该承担内链枢纽角色

### 可配置字段

- `title`
- `description`
- `categories`
- `featuredItems`
- `listItems`
- `productCta`

## 9. 模板与数据层关系

建议模板只定义结构，不直接把内容写死在 JSX 里。

推荐结构：

- 模板组件负责页面结构
- 页面文件负责组织 metadata 和页面数据
- 内容数据来源可以是：
  - 本地配置
  - MDX 内容层
  - 静态 JSON / TS 数据

## 10. 一期优先实现顺序

1. Product Page Template
2. Resource Hub Template
3. Compare Page Template
4. Blog Article Template
5. Help Article Template
6. Solution Page Template

## 11. 当前建议

如果马上开始写代码，一期至少要先落：

- 一个 `Product Page Template`
- 一个 `Resource Hub Template`
- 一个 `Compare Page Template` 的空模板骨架

这样就能支撑首页、产品页、资源页和后续 SEO 页面扩展。
