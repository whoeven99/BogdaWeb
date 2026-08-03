# 前端基础设施

本文件定义官网改造在正式写页面前应先搭建的基础设施，包括目录结构、组件分层、数据组织、SEO 基础能力和样式约束。

目标：

- 让页面开发建立在稳定基础之上
- 避免后续因为结构不清晰而大面积返工
- 支撑模板化、SEO 扩展和多内容源接入

## 1. 基础设施范围

启动前优先建设以下几层：

- 路由层
- Layout 层
- Section 级组件层
- 业务卡片与内容组件层
- 数据配置层
- SEO / metadata 层
- 样式与 token 层

## 1.1 技术选型结论

当前项目的统一技术方向确定为：

- 前后端统一使用 `Next.js`
- 如需要数据库，统一使用 `Turso`

前端组件与样式层建议如下：

- 不以 Ant Design 作为新版官网的主要 UI 渲染层
- 新版官网优先采用“自定义营销组件 + 轻量无样式交互原语”的方案
- 样式优先使用：
  - `CSS Modules`
  - `CSS Variables / tokens.css`
  - 必要时配合少量 `Tailwind utilities`

交互原语建议：

- `Radix UI` 负责无样式交互基础能力
- `lucide-react` 负责图标

原因：

- 官网属于品牌前台，不适合被通用后台组件库强绑定
- Ant Design 更适合后台和管理台，不适合作为营销站的主要视觉骨架
- 自定义组件更利于品牌统一、性能控制和模板化扩展

## 2. 推荐目录结构

建议逐步从当前极简结构演进为：

```text
ciwi-web/
  src/
    app/
      (marketing)/
        page.tsx
        pricing/page.tsx
        products/
          page.tsx
          [slug]/page.tsx
        solutions/
          page.tsx
          [slug]/page.tsx
        demo/
          page.tsx
          [slug]/page.tsx
        compare/
          [slug]/page.tsx
        blog/
          page.tsx
          [slug]/page.tsx
        help-center/
          page.tsx
      components/
        layout/
        sections/
        cards/
        ui/
      content/
        navigation.ts
        footer.ts
        home.ts
        products.ts
        solutions.ts
        compare.ts
      lib/
        seo/
        content/
        utils/
      styles/
        tokens.css
        globals.css
```

当前实现进度：

- `src/components/layout`、`src/components/sections`、`src/components/cards`、`src/components/ui` 已建立
- `src/content` 已接入 `navigation`、`home`、`products`、`compare`、`resources`、`blog`、`help-center`
- `src/lib/seo` 已有基础 `metadata` 工具
- `src/styles/tokens.css` 与 `src/app/globals.css` 已承担当前主要样式基础
- 当前项目尚未引入 `Radix UI`、`zod` 等下一阶段依赖，当前组件层仍以自定义静态组件为主

## 3. 组件分层

### 3.1 `ui/`

最低层基础组件，要求通用、无业务语义。

示例：

- `Button`
- `Badge`
- `SectionHeading`
- `Container`
- `Grid`
- `Pill`
- `Card`

原则：

- 不耦合具体页面内容
- 样式和交互行为稳定
- 如需交互行为，优先基于 `Radix UI` 封装，而不是直接引入整套重型组件库

### 3.2 `cards/`

承接通用业务卡片，但仍保持可复用。

示例：

- `ProductCard`
- `TestimonialCard`
- `ArticleCard`
- `CompareCard`
- `FaqItem`

原则：

- 有业务语义
- 无页面布局依赖

### 3.3 `sections/`

页面的主要拼装单元，是实施阶段最重要的一层。

示例：

- `HeroSection`
- `ProductMatrixSection`
- `DemoPreviewSection`
- `SocialProofSection`
- `FaqSection`
- `ResourcesSection`

原则：

- 一般对应页面中的一个完整 section
- 接收结构化数据，而不是写死文案

### 3.4 `layout/`

承接全局结构。

示例：

- `SiteHeader`
- `SiteFooter`
- `PageShell`
- `ResourceShell`

## 4. 内容配置层

建议不要继续把大段内容直接写在页面文件里。

### 推荐做法

使用 `src/content/` 存放结构化内容配置：

- `navigation.ts`
- `footer.ts`
- `home.ts`
- `products.ts`
- `solutions.ts`
- `compare.ts`

### 好处

- 页面结构和内容配置分离
- 更适合模板化
- 更适合后续迁移到 CMS 或 API
- 改导航和 footer 不需要改 JSX 结构

## 5. SEO 基础设施

启动前建议先建一层 `lib/seo/`，避免每个页面各写各的 metadata。

### 建议能力

- `buildPageMetadata()`
- `buildProductMetadata()`
- `buildArticleMetadata()`
- `buildFaqSchema()`
- `buildArticleSchema()`
- `buildBreadcrumbSchema()`

### 原则

- metadata 统一生成
- schema 按模板输出
- canonical 统一控制
- 避免每个页面手写重复 SEO 逻辑

## 5.1 Next.js 全栈边界

既然后端统一使用 `Next.js`，建议按以下边界组织：

- 页面渲染：`App Router`
- 内容获取：Server Components
- 表单与轻交互提交：Server Actions 或 Route Handlers
- 内部 API：`app/api/*`
- SEO 生成：metadata + schema 工具层统一输出

原则：

- 能在服务端完成的内容拼装，尽量不放到客户端
- 能用静态生成或缓存的页面，不走不必要的动态请求
- 只有 Demo、搜索、提交类能力再使用动态接口

## 6. 数据获取与内容接入层

一期内容来源会有多种：

- 本地静态配置
- MDX 内容
- 帮助中心静态入口
- Turso 中的结构化内容或索引数据

因此建议在 `lib/content/` 里封装一层：

- `getFeaturedPosts()`
- `getBlogList()`
- `getBlogPostBySlug()`
- `getHelpCenterEntries()`
- `getFeaturedResources()`

原则：

- 页面文件不直接关心底层来源
- 先统一接口，再逐步替换来源

## 6.1 Turso 使用建议

Turso 适合承接官网自己的结构化数据，但不建议一开始拿它替代所有内容系统。

推荐放进 Turso 的内容：

- 产品配置数据
- Compare 页结构化内容
- FAQ 数据
- 路由映射与 redirect 配置
- Resources 聚合索引
- Demo 所需的轻量结构化数据
- 线索收集、预约、联系表单记录

不建议一期直接放进 Turso 的内容：

- Blog / Help Center 的全量 MDX 正文
- 帮助中心全部历史 HTML 正文

推荐技术栈：

- `@libsql/client`
- `drizzle-orm`

原因：

- 和 Turso 结合自然
- 适合类型化 schema 管理
- 便于后续给模板页做结构化数据读取

## 7. 样式基础设施

### 启动前建议先做

- 统一 tokens
- 统一 container 宽度
- 统一 section 间距
- 统一按钮规范
- 统一卡片规范

### 推荐形式

- `tokens.css` 负责颜色、间距、圆角、阴影
- 模块化样式或组件内样式负责局部布局

### 更具体的样式建议

- 营销页面主体使用 `CSS Modules`
- 全局设计 token 放在 `tokens.css`
- 布局类能力可适量使用 Tailwind，但不应把页面完全写成 Tailwind 拼装
- 不再继续扩大内联 style 的使用范围

推荐原因：

- `CSS Modules` 更适合建立长期可维护的品牌组件
- 纯 Tailwind 对快速试验有帮助，但官网长期维护会让模板层变得噪音较大
- 设计 token 独立后，更适合统一多页面风格

### 不建议

- 大量页面内联样式
- 同类 section 重复写不同 spacing
- 每个页面自己定义按钮样式

## 8. 页面模板与组件的关系

页面模板不是一个大组件文件塞满所有情况，而应这样组织：

- 模板约束页面结构
- section 组件负责模块复用
- card 组件负责具体表达
- content 配置层负责填数据

一句话：

> 模板定骨架，section 定模块，content 定内容。

## 9. 一期优先搭建的组件清单

### Layout

- `SiteHeader`
- `SiteFooter`
- `PageContainer`

### UI

- `Button`
- `Badge`
- `SectionHeading`
- `Card`
- `Pill`
- `Accordion`
- `Tabs`
- `Dialog`
- `Drawer`
- `Input`

### Cards

- `ProductCard`
- `TestimonialCard`
- `ArticleCard`
- `FeatureCard`
- `CompareRow`

### Sections

- `HeroSection`
- `LogoProofSection`
- `ProductMatrixSection`
- `OutcomeSection`
- `DemoPreviewSection`
- `TestimonialsSection`
- `ResourcesSection`
- `FaqSection`
- `FinalCtaSection`

## 10. 一期优先搭建的数据文件

- `navigation.ts`
- `footer.ts`
- `home.ts`
- `products.ts`
- `resources.ts`

## 11. 启动前最小基础设施清单

在真正大规模写页面前，至少先完成：

1. 新目录化路由骨架
2. 新版 `SiteHeader` / `SiteFooter`
3. `tokens.css`
4. 5 到 8 个基础 section 组件
5. 基础内容配置文件
6. metadata 构建函数

## 12. 当前建议的实施顺序

1. 建目录结构
2. 建 layout 组件
3. 建 tokens 和基础 UI
4. 建 section 组件
5. 建内容配置文件
6. 建首页和 `/products/translator`
7. 再接 `/blog`、`/help-center`

## 13. 当前结论

对这个项目来说，启动前最值得花时间的基础设施不是“更复杂的动画”，而是：

- 模板体系
- section 组件体系
- 内容配置层
- SEO 工具层
- Next.js 全栈边界
- Turso 结构化数据层

这些搭好之后，官网才真正具备可持续扩展能力。
