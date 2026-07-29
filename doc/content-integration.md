# 内容接入与统一策略

本文件用于明确博客与帮助中心在当前官网中的真实内容来源、迁移原则与后续边界。

当前策略已经明确收敛为：

- `ciwi-web` 是唯一前台品牌站点
- Blog 与 Help Center 都由 `ciwi-web` 直接渲染
- 内容源统一为仓库内的 `MDX + frontmatter`
- Ghost 服务已经下线，不再作为任何前台或后台依赖

## 1. 总体原则

- 前台统一：所有用户可见内容都由 `ciwi-web` 输出。
- 内容文件化：Blog 与 Help Center 使用 Git-based 内容目录维护。
- i18n 一致：英文走根路径，中文走 `/zh-cn/`。
- SEO 稳定：主站路径为唯一 canonical 来源，不再保留 Ghost 过渡链路。
- 渐进迁移：优先清理历史残留，再补内容运营体验。

## 2. 当前内容系统现状

### Blog

当前主方案：

- `ciwi-web/content/blog/en/*.mdx`
- `ciwi-web/content/blog/zh-cn/*.mdx`

已落地能力：

- `/blog` 与 `/blog/[slug]` 已由 Next 前台承接
- 详情页支持 TOC、section anchor、基础 JSON-LD 与相关文章
- 站内不再暴露原始 Ghost 跳转入口
- 内容 frontmatter 已去掉 Ghost 源地址依赖

历史残留：

- `ciwi-web/public/blog` 已移除，不再保留旧静态博客前台

### Help Center

当前主方案：

- `ciwi-web/content/help-center/en/**/*.mdx`
- `ciwi-web/content/help-center/zh-cn/**/*.mdx`

已落地能力：

- `/help-center` 已作为统一聚合入口
- 高价值帮助文档详情页已迁入 Next 前台模板
- 支持目录、正文锚点、FAQ / TechArticle schema
- 与产品页、资源页之间已有基础回流

历史残留：

- `ciwi-web/public/media/help-center` 保留当前页面仍在使用的帮助中心截图素材

## 3. 目标状态

### Blog 目标状态

- 内容编辑方式：仓库内 MDX 文件
- 最终前台渲染：Next.js
- URL：`/blog`、`/blog/[slug]`
- 多语言：`/blog/[slug]` 与 `/zh-cn/blog/[slug]`

### Help Center 目标状态

- 内容编辑方式：仓库内 MDX 文件
- 前台渲染：Next.js
- URL：`/help-center`、`/help-center/[category]/[slug]`
- 多语言：英文根路径、中文 `/zh-cn/`

## 4. 内容组织策略

### Blog

- 每篇文章按语言独立文件维护
- 使用 `entryId` 配对中英文版本
- 自动翻译只生成目标语言草稿，不自动发布
- 前台统一使用站内链接、站内 canonical 和站内结构化数据

### Help Center

- 按分类目录与 frontmatter 共同组织
- 高价值文档优先迁移
- FAQ、对比表、CTA、视频等富媒体能力通过 MDX 组件承载
- 长尾旧文档在未迁移前继续保留访问能力，但不再扩展旧静态方案

## 5. URL 与 SEO 原则

### Blog

- 主站 `/blog/*` 是唯一权威前台路径
- 不再为 Ghost 页面保留 canonical 或回链
- 文章 alternates 由 `entryId + locale` 生成
- 只对 `published` 内容进入 sitemap

### Help Center

- 已迁移文档优先使用站内新路径
- 原有高价值旧路径在需要时做跳转或兼容
- 不大规模重命名 slug，优先保持稳定

## 6. 当前风险与后续重点

### 风险

- 帮助中心截图素材已迁入独立媒体目录，后续可继续按用途细分命名与归档
- Git-based 内容体系对非技术编辑的门槛略高

### 后续重点

1. 继续扩大 Help Center 文档迁移覆盖
2. 补内容脚手架与发布 SOP，降低内容新增成本
3. 视运营需求再决定是否补 Git-based 后台编辑器

## 7. 结论

当前内容架构已经明确：

- Blog：`MDX + Next 前台`
- Help Center：`MDX + Next 前台`
- Ghost：已退场，不再保留

后续工作的重点不再是“如何继续兼容 Ghost”，而是继续完善内容生产、校验、发布与历史资源清理。
