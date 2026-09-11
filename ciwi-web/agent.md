# Ciwi Web Agent Guide

## 1. 目标

这份文档给进入 `ciwi-web` 仓库工作的 AI 使用。每次开始任何任务前，都必须先阅读本文件，再阅读相关代码与规范文件，确认项目当前约束后再动手。

目标不是只“写出代码”，而是：

- 理解当前项目结构和已沉淀的共享组件体系
- 在实现功能时同步考虑 SEO、多语言、路径规范和页面模板一致性
- 修改完成后主动自检、构建、修复问题，并把检查结果明确返回

## 2. 项目快照

- 技术栈：Next.js 15 + React 19 + Tailwind CSS 4
- 语言：`en`、`zh-cn`
- 路由策略：`trailingSlash: true`
- 站点 URL：`https://ciwi.ai`
- 核心 SEO 入口：
  - `src/lib/seo/metadata.ts`
  - `src/app/sitemap.ts`
  - `src/lib/i18n.ts`
  - `src/lib/route-locale.ts`
- 共享规范文档：`docs/component-system.md`

## 3. 开工前必做

开始任何任务前，按下面顺序建立上下文：

1. 阅读 `agent.md`
2. 阅读 `docs/component-system.md`
3. 阅读将被修改的文件
4. 额外阅读同类型页面或组件，确认当前项目的共享实现方式

禁止在没有阅读现有实现的情况下，直接新造页面结构、按钮样式、Hero 模式或 FAQ/CTA 结构。

## 4. 实现规则

### 4.1 组件与页面结构

- 优先复用共享组件，不重复手写 DOM 结构
- 返回入口必须使用 `BackLink`
- FAQ 必须使用 `FaqSection`
- 页面底部 CTA 必须使用 `FinalCtaSection`
- 非首页 Hero 不要额外包卡片壳，不要加无实际作用的装饰性标签
- 列表、卡片、目录、信息区块优先向现有 `sections` / `cards` 收口

### 4.2 链接与多语言

- 站内链接优先使用 `LocalizedLink`、`Button`、`CardCtaLink`、`BackLink`
- 不要直接新增指向站内路径的裸 `next/link`
- 不要手写带 locale 前缀的站内 `href`，优先走 `resolveLocalizedHref` / `localizeHref`
- 不要手写混乱的带 `/`、不带 `/` 双版本 URL
- 站内绝对 URL 优先使用 `toAbsoluteLocalizedUrl` 或 `toAbsoluteSiteUrl`

### 4.3 SEO

- 页面 metadata 优先走 `buildPageMetadata`
- 新增页面时同步考虑：
  - canonical
  - alternates / hreflang
  - open graph / twitter
  - sitemap 收录
  - 结构化数据是否需要更新
- 不要绕开现有 SEO helper 直接拼 canonical URL
- 新增内容型页面时，确认标题、描述、URL 与实际语言版本一致

### 4.4 视觉与内容语气

- 页面风格保持克制、信息型、低噪音
- 不做强营销口号式设计，不滥用绿色高饱和强调
- 保持高信息密度，但不要牺牲留白节奏
- 中文与英文页面都要检查排版、折行与信息结构是否自然

## 5. 开发完成后的强制自检

功能开发完成后，AI 必须自己运行检查，不能跳过。

默认执行：

```bash
npm run lint
npm run seo:check
npm run build
```

如果修改了内容数据、MDX、guide/blog/help-center 内容，还要额外确认：

```bash
npm run content:validate
```

如果检查失败：

1. 先自行定位原因
2. 修复问题
3. 重新运行失败的检查
4. 直到通过，或明确说明为什么当前环境无法通过

## 6. 每次交付时必须返回的信息

AI 完成任务后的回复，至少应包含：

1. 修改了哪些文件
2. 做了什么实现
3. 运行了哪些检查命令
4. 每个检查的结果
5. 发现并修复了哪些问题
6. 仍然存在的风险或未完成项

不要只说“已完成”，要把验证结果说清楚。

## 7. 日常 SEO / 多语言检查重点

- 页面是否通过 `buildPageMetadata` 暴露 metadata
- 是否出现新的裸内部 `<a href="/...">`
- 是否出现新的绕过本地化的 `next/link`
- 是否出现新的硬编码 locale 路径
- 是否出现新的直接拼接 `siteUrl` 的实现，绕开已有 helper
- 新路由是否进入 sitemap
- 英文与中文页面是否都能落到正确路径

## 8. 结论

在这个项目里，AI 不是只负责“生成代码”，而是要承担一部分工程守门职责：读代码、遵守组件规范、兼顾 SEO 与多语言、主动构建、自检并修复问题。
