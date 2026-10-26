# GSC「Page with redirect」476 条排查报告

数据源：Search Console → Coverage drilldown → Issue = `Page with redirect` → 导出 `Table.csv`（2026-10-24，共 476 条，最后抓取止于 2026-10-17）。
实测方式：对 476 条逐条发起请求并**手动跟随每一跳**，记录跳数与终点状态码。

## 结论先行

**这 476 条里没有一条落在 404 上。** 全部 476 条最终都到达 200 的正常页面，其中 425 条一跳直达。

也就是说，GSC 这个报告项当前**不构成收录损失**：这些 URL 本来就是历史形态，`Page with redirect` 只是 Google 的「已排除」状态标签，不是错误。上一轮我怀疑的「308 终点是 404」在这一批数据里**零命中**，那个假设被数据否掉了。

真正需要动的只有两处，见文末「待办」。

## 476 条的分类

按跳数：

| 跳数 | 条数 |
|---|---|
| 1 跳到 200 | 425 |
| 2 跳到 200 | 51 |
| **死链（终点非 200）** | **0** |

按「为什么会跳」（两个维度交叉，合计 476）：

| 成因 | 条数 | 说明 | 是否需要处理 |
|---|---|---|---|
| `double-slash` | 295 | `playbook//keyword/`，其中 45 条同时缺尾斜杠所以走 2 跳 | 不需要，代码已修 |
| `trailing-slash` | 149 | 缺尾斜杠，`trailingSlash: true` 的固有行为 | 不需要 |
| `legacy-slug` | 18 | 旧 slug / compare 改名 / zh-cn 内页映射，其中 6 条走 2 跳 | 不需要 |
| `zh-cn-fallback` | 14 | zh-cn 指南跳英文 | **需要决策**（译文未就绪） |

> 另有 `http://ciwi.ai/` 1 条返回 **403**（不是跳转），单独列在待办里，未计入上面 476 的跳数统计。

## 双斜杠（295 条，占 62%）是怎么来的

`playbook//keyword/` 不是外链写错，是**自己代码拼出来的**，而且已经修过了：

| 时间 | commit | `getProductPlaybookHref` 返回值 | 后果 |
|---|---|---|---|
| 2026-09-11 | `566cc63c` | `/products/<slug>/playbook` | 正常 |
| **2026-09-20** | `adaceea8` | `/products/<slug>/playbook/` ← 多了尾斜杠 | 所有 `${playbookHref}/keyword/<kw>` 变成 `playbook//keyword/<kw>` |
| **2026-09-24** | `7c6e4090` | `/products/<slug>/playbook` | 修复 |

GSC 的趋势线完全对应：9/19 是 163 条，9/22 跳到 365 条——正好是这 4 天窗口里 Google 抓到的新增量。

线上现状已确认干净：抽样 7 个入口页（关键词索引页、详情页、分页、分类页、zh-cn 详情页、sitemap、llms.txt）里 `playbook//` 出现次数**均为 0**。

## 为什么两跳压不成一跳

45 条「双斜杠 + 缺尾斜杠」和 6 条「旧 slug 缺尾斜杠」的 URL 需要 2 跳：

```
/products/.../playbook//keyword/shopify-customer-analytics
  → 308 → /products/.../playbook/keyword/shopify-customer-analytics   (Next 压平 //)
  → 308 → /products/.../playbook/keyword/shopify-customer-analytics/  (补尾斜杠)
```

原因：**Next 的尾斜杠/双斜杠归一化发生在 middleware 之前**。middleware 拿到的已经是压平过的路径，它只能补最后一跳。这一点在本轮本地构建上实测确认过：

| 本地实测 | 跳数 |
|---|---|
| `/about` | 1 |
| `/deepl/`（带斜杠，命中旧 slug 映射） | 1 |
| `/deepl`（不带斜杠） | 2 |
| `/.../playbook//keyword/<kw>/` | 1 |
| `/.../playbook//keyword/<kw>` | 2 |

要把这两类压成一跳，只能在 **Nginx / Cloudflare 层**做归一化，仓库里做不到。

> 重复一遍上一轮的踩坑：不要用 `skipTrailingSlashRedirect: true`。实测它会让 `/about` 变成 `308 → /about` 的无限自跳。

## 14 条 zh-cn 指南跳到英文页

形态：`/zh-cn/guides/saas-localization-guide-2026/` → 308 → `/guides/saas-localization-guide-2026/`

触发代码在 `src/app/guides/[slug]/page.tsx:1429`：当某 slug 在请求语言下不可用时，`permanentRedirect` 到 `fallbackLocale`。

**这不是 bug，是内容状态的问题。** `src/content/data/localization_guides.zh-cn.json` 里 37 条指南中 25 条仍是：

- `translationStatus: "ai-draft"`
- `status: "draft"`
- 部分标题还是 `[TODO zh-cn] SaaS Localization Guide 2026: ...` 占位符

`src/content/guide-content.ts` 的 `isIndexable()` 会把这些过滤掉，于是页面判定「zh-cn 不可用」→ 跳英文。这是对的：不该把未翻译的占位内容放上线。

至于这 14 条为什么会被 Google 记住——它们曾在某个版本被 sitemap / hreflang 暴露过，之后译文状态回退或过滤规则才补上。

## 待办

1. **zh-cn 指南（14 条）**：要么补完译文让 `/zh-cn/guides/<slug>/` 真正 200，要么接受它跳英文。25 条 `ai-draft` 是同一个问题的存量，建议按优先级批量补，而不是只补这 14 条。
2. **`http://ciwi.ai/` 返回 403**：确认 WAF / 反代是否直接拒明文 HTTP。理想是 301 到 https，而不是 403。
3. **其余 461 条不需要动作**。等 Google 重抓即可；想加速就在 GSC 里对**终点 URL**用「请求编入索引」，不要对重定向源 URL 用。

## 复跑方式

以后每次导出新的 drilldown，一条命令出结果：

```bash
npm run seo:redirects -- --gsc ~/Downloads/<导出目录>/Table.csv --out docs/gsc-redirect-drilldown.csv
```

脚本会输出「跳数分布」+「为什么跳转」两个维度，并标出死链（终点非 200）数量。只要 `dead ends` 是 0，这一项就不用管。
