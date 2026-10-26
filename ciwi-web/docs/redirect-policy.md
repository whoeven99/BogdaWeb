# 跳转策略（Page with redirect 治理）

## 结论先行

GSC 里的「网页会自动重定向」不是错误状态：Google 会跟着 308 走，并把权重交给目标页。
真正需要处理的只有两种情况：

1. **跳转终点是 404** —— 权重在终点丢失，这类必须补映射；
2. **跳转链超过一跳** —— 只浪费抓取预算，优先级低于第 1 类。

当前 sitemap（1691 条）已实测全部 200、零跳转，站内链接 / canonical / hreflang / JSON-LD 全部使用
带尾斜杠的规范形态，因此报告里的几百条**都不在 sitemap 内**，是历史形态的遗留。

## 这个站点的三个历史形态

| 时间 | URL 形态 | 现状 |
|---|---|---|
| 2025-08 → 2026-07-04 | 无尾斜杠（`/deepl`、`/about-us`） | 全部 308 到带斜杠形态 |
| 2026-07-05 起 | `trailingSlash: true`（commit `f8b04ee9`） | 当前规范形态 |
| 2026-09 起 | 关键词页 / 目录化结构 | 1304 页新形态 |

因为 `trailingSlash` 打开，**每个被删掉的页面都会额外产生一个 308 双胞胎**
（`/pricing` → 308 → `/pricing/` → 404）。这是「Page with redirect」条数被放大到几百的主因。

## 已落地的处理

| 文件 | 作用 |
|---|---|
| `src/lib/seo/legacy-redirects.ts` | 旧 URL 解析：根级旧 slug、旧 compare slug、改过 slug 的 help center 文档、`zh-Hans` 旧语言前缀 |
| `src/content/legacy-routes.ts` | 映射表本体（`legacyRouteMap` / `legacyExtraRootRedirects` / `legacyHelpCenterSlugRedirects`） |
| `src/middleware.ts` | 在路由前解析并 308，顺带兜住双斜杠等非规范形态 |
| `scripts/seo-redirects.test.mjs` | 7 条断言，已接入 `npm run seo:check` |
| `scripts/audit-redirects.mjs` | 线上跳转审计：`--sitemap` / `--wayback <host>` / URL 文件，输出每跳链与终点 |

## 需要人工复核的映射

`legacyExtraRootRedirects` 里有一部分目标是「最接近的现存页面」而非等价页面，
如果这些旧页有真实搜索量，建议改成更贴近的目标，或直接 410：

- `pricing` → `/products/spark-analytics-agent`（原定价页已不存在，站内没有等价页）
- `google-translation` / `product-image-translation` / `shopify-app-translation` / `supported-languages-list` → `/products/translator`
- `translation-service-guarantees` → `/help-center/ShopifyApp/faqs-about-translation`
- `changelog-ciwi-translator` → `/help-center/ShopifyApp/about-ciwi-ai-translator-shopify-app`

## 一跳 vs 两跳

Next 会在 **middleware 之前**做尾斜杠规范化，所以：

- `/deepl`（无斜杠）→ 308 → `/deepl/` → 308 → `/products/translator/`（两跳）
- `/deepl/`（有斜杠）→ 308 → `/products/translator/`（一跳）

曾尝试用 `skipTrailingSlashRedirect: true` 把无斜杠形态也压成一跳，实测会让 `/about` 变成
`308 → /about` 的无限自跳，**已回退**。要彻底消除这一跳只能在 Nginx / Cloudflare 层处理。

## 用法

```bash
# 线上全站 sitemap 审计（部署后跑）
BASE_URL=https://ciwi.ai npm run seo:redirects -- --sitemap

# 把历史 URL 从 Wayback 拉出来审计，找出还缺映射的旧地址
BASE_URL=https://ciwi.ai npm run seo:redirects -- --wayback ciwi.ai

# 审计 GSC 导出的 URL 列表
BASE_URL=https://ciwi.ai npm run seo:redirects -- gsc-pages.csv
```
