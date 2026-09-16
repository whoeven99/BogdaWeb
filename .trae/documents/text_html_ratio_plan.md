# 全站 Text/HTML 比例提升 Implementation Plan

## Repository Research

**当前症状**：Semrush 报告 35+ 页面的 text/HTML 比例在 **0.03–0.10**（3%–10%），远低于 SEO 业界建议的 25%–70% 区间。这会显著降低搜索引擎评估的内容信号权重。

**比例 = 可见文本字符数 / 总 HTML 字符数**。代码走查已确认系统性成因（按影响权重排序）：

| # | 成因类别 | 具体模式 | 估算影响 |
|---|---------|---------|---------|
| 1 | **类名字段膨胀** | 几乎所有组件（Button / SectionHeading / ContentIndexCard / BlogFeed 分页按钮 / SiteHeader 菜单项 / OutcomeSection 卡片等）在每次渲染时把 150–400 字符的 Tailwind 工具类字符串内联写入 `class` 属性。首页约有 120+ 元素携带超长类名，仅此一项即可占 HTML 总字节 **≈35%–50%**。 | 高 |
| 2 | **过度嵌套 wrapper** | SectionHeading 无 action 时仍有 4 层 div（space-y → flex-row → contentClass → h1/p）；SiteHeader/Footer 由 PageContainer + site-shell + main + section/article/nav 等叠加到 8–12 层 DOM 深度才抵达实际文本。 | 高 |
| 3 | **空 anchor 占位 div** | products/[slug]/page.tsx、solutions/[slug]/page.tsx 存在 5–6 个 `<div id="faq/models/..." class="anchor-offset" />` 纯空占位。 | 中 |
| 4 | **FAQ 同款 SVG 逐份内联** | FaqAccordionList 把相同的 chevron SVG（≈350 字节）复制到每个 `<details>` 项，3 条 FAQ = 1KB 重复 SVG。 | 中 |
| 5 | **Schema 多 script 分散** | 除 `products/[slug]` 外，其它 18+ 页面仍用 `structuredData.map(...)` 输出 2–4 个 `<script>` 标签，每个都重复 `@context` / `@type` 封装。 | 中 |
| 6 | **HelpCenter sidebar 结构过载** | HelpCenterDocsLayout 即使内容很短也渲染 6 个侧边栏区块（intro / topics / related-list / nav-list / pagination / toc），DOM 节点 100+。 | 中 |
| 7 | **BlogFeed 分页按钮手写类名** | 上一页/页码/下一页三处按钮直接内联了 ~260 字符的 Tailwind 类名而未复用 Button 组件，且重复使用相同字面字符串。 | 中 |
| 8 | **Client 组件 SSR 下 React hydration 注释** | SiteHeader/SiteFooter/Button 等 `"use client"` 组件在静态 HTML 中注入 hydration marker comment 节点。 | 低（但叠加） |

**Semrush 报告里最低分的页面与根因映射**：
- `/blog/` 0.04：BlogFeed 仅展示 2 篇文章（2× short desc）但带上了完整 header+footer+sidebar+分页+schema。
- `/zh-cn/` 0.03：中文文案字符更少，叠加同样的 HTML 壳层，比例天然低于英文。
- `/help-center/ShopifyApp/*` 0.05：HelpCenterDocsLayout sidebar 结构开销 + 文章内容短。
- `/use-cases/*` 0.04–0.05：Use Case 详情的标题/描述/3个段落 vs 完整壳层+hero+3列panel+finalCTA。
- `/contact/` 0.05、`/demo/` 0.05：页面内容极少（一个表单/一个 hero），壳层占比过高。

## Files and Modules

> 按照「改动最集中 → 页面级收口 → 验证」的依赖顺序。

### Phase 1 — 语义 CSS 类收口（最高 ROI）
- `ciwi-web/src/app/globals.css`：新增 18–25 个语义组合类（`.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.section-heading`, `.section-heading__eyebrow`, `.section-heading__title`, `.surface-card` 的增强版、`.pagination-btn`、`.nav-chip`、`.outcome-card`, `.pill`, `.docs-*` 已有的继续沿用 + 补足），用于替代组件中高重复的 Tailwind 长字符串。
- `ciwi-web/src/components/ui/Button.tsx`：把 variant class 字符串从拼接数组改成**1–2 个语义类 + 最少必要覆盖**。
- `ciwi-web/src/components/ui/CardCtaLink.tsx`：同上。
- `ciwi-web/src/components/ui/SectionHeading.tsx`：
  - 类名 → 语义类；
  - **消除不必要 wrapper**：当没有 `action` 时去掉中间那层 flex-row wrapper；当没有 `eyebrow` 时不渲染最外层 space-y。
- `ciwi-web/src/components/sections/OutcomeSection.tsx`：卡片内联类名 → `.outcome-card`。
- `ciwi-web/src/components/sections/BlogFeed.tsx`：
  - 三个分页按钮**改用 `<Button variant="secondary/ghost">` 组件**（或引入 `.pagination-btn` 语义类），消除三处手写重复；
  - 保留现有行为（disabled/active 态）。

### Phase 2 — FAQ 与空 anchor 结构优化
- `ciwi-web/src/components/ui/FaqAccordionList.tsx`：
  - 将 chevron SVG 抽成「CSS mask / background-image」或「单个 `<svg><symbol>` + `<use>` 复用」两种方案之一。选 `<symbol>` + `<use>`（对可访问性与 SEO 友好，兼容现有样式）。
- `ciwi-web/src/app/products/[slug]/page.tsx`：删除 5–6 个 `<div id="models/engines/..." className="anchor-offset" />`，把 `id` 直接挂载到**下一个实际渲染的 section 根节点**（或直接放在对应的 `ProductFeatureSpotlightsSection` 上）。
- `ciwi-web/src/app/solutions/[slug]/page.tsx`：对 `<div id="faq">` 做同样消除。

### Phase 3 — 结构化数据全站切换 @graph（与 products/[slug] 对齐）
- 受影响页面（18 个）：
  - 首页 `src/app/page.tsx`
  - 列表页：`blog/page.tsx`, `guides/page.tsx`, `help-center/page.tsx`, `products/page.tsx`, `resources/page.tsx`, `use-cases/page.tsx`, `best-shopify-apps/page.tsx`, `compare/page.tsx`, `solutions/page.tsx`
  - 详情页：`blog/[slug]/page.tsx`, `guides/[slug]/page.tsx`, `help-center/ShopifyApp/[slug]/page.tsx`, `best-shopify-apps/[slug]/page.tsx`, `compare/[slug]/page.tsx`, `products/[slug]/playbook/page.tsx`, `solutions/[slug]/page.tsx`, `use-cases/[slug]/page.tsx`
  - 内容页：`affiliate/page.tsx`, `contact/page.tsx`, `demo/page.tsx`, `about/page.tsx` 等
- 改动模式：
  1. `import { buildGraphSchema, ... } from "@/lib/seo/schema";`
  2. `const structuredData = buildGraphSchema([ buildBreadcrumbSchema(...), buildWebPageSchema(...), ... ]);`
  3. 把 `structuredData.map(...)` 替换为单个 `<script>` 输出。
  4. `pageUrl` 与 breadcrumb item URL 全部**改用 `toAbsoluteLocalizedUrl` / `toAbsoluteSiteUrl`**（替代手写 `new URL(localizeHref(...), siteUrl)`）。

### Phase 4 — SectionHeading / 全局 wrapper 多余层通用清理
- `ciwi-web/src/components/ui/SectionHeading.tsx`（承接 Phase 1）：
  - 无 `eyebrow` 且无 `action` 时：仅保留 1 层 wrapper（h1/p + 可选 subtitle）。
  - 有 `eyebrow` 无 `action` 时：2 层。
  - 有 `action` 时：3 层（当前 4–5 层）。
- 确认 SiteHeader/SiteFooter 本身结构不做 DOM 层变化（header 的可访问性与交互复杂，避免风险），仅在类名字节上做 Phase 1 优化。

### Phase 5 — 轻内容页的"内容填充"策略（可选补充，默认本次**不做**）
> 针对 `/blog/` 仅 2 篇、`/contact/`、`/demo/` 等文本极少的页面，最终比例提升仍然可能不够。建议作为下一轮由**用户确认是否扩充文案**（例如 Contact 加一段 FAQ、Demo 加"支持的数据来源列表"、Blog 把每页从 2 篇调到 4 篇）。本轮只做结构瘦身，以免改动用户体验/信息架构预期。

## Implementation Steps（依赖顺序）

1. 在 `globals.css` 新增语义组合类；同步更新所有组件中的语义类**只覆盖样式，不增删 DOM 节点**（先让视觉零回归，后面几步再删节点）。
2. 改 `Button.tsx`、`CardCtaLink.tsx`、`BlogFeed.tsx` 分页按钮 → 复用语义类或统一组件。
3. 改 `SectionHeading.tsx` 类名 + 按条件减 wrapper。
4. 改 `OutcomeSection.tsx`、`ContentIndexCard.tsx`、`SimpleCardGridSection.tsx`、`NumberedCardGridSection.tsx`、`ChecklistCardGrid.tsx`、`StackedInfoPanel.tsx`、`UseCaseHero.tsx`、`DetailHeroPanel.tsx`、`ProductFeatureSpotlightsSection.tsx`、`ProductAnchorNav.tsx`、`FinalCtaSection.tsx`、`FaqSection.tsx`（Section 级组件的卡片类名统一收口）。
5. `FaqAccordionList.tsx` 改成 `<symbol>` + `<use>` SVG 复用。
6. `products/[slug]/page.tsx`、`solutions/[slug]/page.tsx` 清除空 anchor div。
7. Phase 3 列出的 18+ 页面**批量**切换 `buildGraphSchema` 与标准化 URL helper。
8. `npm run lint` + `next build` 全量通过；启动 dev server 对 5 个低分页做肉眼对比（无视觉差异）。

## Dependencies and Considerations

- **Tailwind v4 `@import "tailwindcss"` 与 `@theme`**：globals.css 已走 v4 新 pipeline，直接在文件里追加 `.btn-primary { @apply ... }` 或手写普通 CSS 组合类均可（手写普通 CSS 更省字节，因为 `@apply` 仍会被编译成 utilities 展开？实际 v4 默认仍展开，选择**手写真实 CSS 组合类**才能真正减省 HTML 类名字节）。
- **SSR 与 client 组件 class 匹配**：Button / CardCtaLink / BlogFeed 是 `"use client"`，类名改动同样在 SSR 输出生效。
- **颜色 token / contrast 回归**：所有语义类在 globals.css 里按当前 Tailwind 生成的真实 property 值**一对一还原**，不改颜色值，只把 `bg-slate-950 hover:!bg-emerald-700` 这类字面序列搬到 CSS。
- **docs/component-system.md 对齐**：本次会新增 18–25 个语义类，属于 `ui-copy`/`globals` 层级，不改变组件 API；计划文件里的"删除 wrapper"部分不会影响 `FaqSection` / `FinalCtaSection` / `BackLink` 等硬性约束（已与 `docs/component-system.md` 交叉核对）。
- **`trailingSlash: true`**：Phase 3 改用 `toAbsoluteLocalizedUrl` 已保证一致性，这是项目记忆里的 hard constraint。

## Validation

1. **Lint + Build**：`npm run lint`（必须 0 exit）+ `npx next build`（必须 0 exit）。
2. **Diff 法验证类名不丢视觉**：对 `/products/spark-analytics-agent/`, `/blog/`, `/help-center/ShopifyApp/how-can-i-check-my-credit-balance/`, `/use-cases/translator-brand-voice-control/`, `/zh-cn/` 共 5 页，用浏览器并排对比 before/after 截图，确保：
   - 颜色、间距、字号、hover/focus 完全一致；
   - 锚点跳转（#faq、#use-cases）落点无偏移（因删了空 div，要复测）。
3. **Text/HTML 比例复测**（本地近似）：
   ```bash
   # 对 dev server 页面拉 HTML 并用 strip-html 脚本/浏览器 Console 统计
   # document.body.innerText.length / document.documentElement.outerHTML.length
   ```
   目标：英文首页 ≥ 0.20，Blog 列表 ≥ 0.15，use-case 详情 ≥ 0.18，help-center 详情 ≥ 0.15，`/zh-cn/` ≥ 0.12（中文单字节字符集在 Semrush 里基数不同，放宽目标）。

## Risks

| 风险 | 概率 | 影响 | 处理 |
|-----|-----|-----|-----|
| globals.css 语义类覆盖不够，某些页面出现细微间距错 | 中 | 低 | 先用浏览器 inspector 对比 Tailwind 展开后的 computed style，再对差异补单测或逐页修正 1–2 行；保留组件层 `className` 覆盖通道（现有 `className` prop 一直可用） |
| 删除 SectionHeading wrapper 导致 action 区在窄屏换行异常 | 中 | 中 | 先从「无 action 时删中间层」这个安全分支开始，有 action 时只删最外层非必要 wrapper，不改 flex 方向；最后截图回归 |
| 空 anchor 移除后 scroll 位置偏移 | 低 | 中 | 把 `id` 挂到后继实际 section 节点上，并验证 `scroll-margin-top`（由 `.anchor-offset` 类负责）跟随迁移 |
| Phase 3 全页面 schema 改动漏页 | 中 | 低 | 写一份清单 + 用 grep 检查 `structuredData.map` 剩余计数为 0 |
| 中文页面比例依然不达标 | 中 | 低 | 启动 Phase 5 的内容填充讨论（用户体验改动前置确认） |
