# 关键词场景页内容重写（2026-10-27）

背景：Google Search Console 把
`/products/spark-analytics-agent/playbook/keyword/shopify-product-page-conversion-rate/`
报为 **Soft 404**。该页当时约 94% 的文字是跨场景复用的模板（同类目两两 8-gram Jaccard 0.936，
博客文章之间仅 0.208），内容近乎空白/雷同是最主要的问题。
**注意**：相似度下降只能证明文字重复减少，不能证明 Soft 404 已解除——后者仍需部署后核对
GSC 实际抓取内容、页面渲染与复查结果。

## 本轮改动

`src/content/data/shopify_keyword_use_cases.json`（535 条场景，全量）

| 字段 | 改动前 | 改动后 |
| --- | --- | --- |
| `howToSolve` / `zh_howToSolve` | EN 167 个不同值、ZH **9** 个不同值覆盖全部 535 条 | 535 条各自独立，恒定 3 步 |
| `faqs` / `zh_faqs` | 同类目整段复用 | 535 条各自独立，各 3 问 |
| `scenarioDescription` / `zh_scenarioDescription` | 同类目模板句 | 按场景自身处境/任务/产出重写 |
| `aiPrompt` / `zh_aiPrompt` | 核心部分同类目相似度 0.894，占整页约 27% | 核心由该场景自己的 3 步生成 |

提示词仍由「固定前缀 + 场景核心 + 固定后缀」拼装，占位符保持不变：
`[describe the business, products and target audience]`、`[specify the affected products, pages, customers or reporting period]`（中：`[填写品类、目标市场、目标客群]` 等）。

## 相似度变化（同类目两两 8-gram Jaccard / 中文 4-gram）

| 口径 | 改动前 | 改动后 |
| --- | --- | --- |
| EN 情景描述 + 提示词 | 0.720（峰值 0.810） | **0.289**（峰值 0.410） |
| ZH 情景描述 + 提示词 | 0.827（峰值 0.980） | **0.532**（峰值 0.629） |
| EN 整页（含步骤与 FAQ） | — | **0.172** |
| ZH 整页 | — | **0.325** |

渲染后的页面实测（同主题 3 页互比）：EN 0.270–0.357。

## 回归保护

`scripts/seo-keyword-scenarios.test.mjs` 新增 3 条断言：

1. 同类目内 `scenarioDescription` / `aiPrompt` 核心（中英）不得重复
2. 提示词必须保留固定前后缀与两处方括号占位符
3. 同类目相似度阈值：EN 均值 < 0.35、峰值 < 0.5；ZH 均值 < 0.6、峰值 < 0.7

`npm run seo:check` 由 28 条增至 **36 条，全部通过**；`npm run build` 与 `seo:artifacts` 通过。

## 已知局限：去重 ≠ 内容重建（2026-10-27 评审反馈）

全量重写解决了「整类目复制」，但多数页面仍停在**任务摘要**层面：EN 步骤平均约 47 词、
FAQ 答案约 18 词，缺少可执行的判断口径（分母定义、归属规则、低流量判定、毛利口径、
取整检查、时区/同意配置等）。已按反馈完成 3 个「可执行样例」试点（见下节），
其余 532 条按同一质量基准继续补齐。

## 试点：可执行样例（3 条，2026-10-27）

`shopify-product-page-conversion-rate`、`shopify-bulk-price-editor`、`shopify-ga4-integration`。
每条的中英文 `howToSolve`（仍恒为 3 步）、`faqs`/`zh_faqs`、提示词核心均已升级为可执行版本：

- **步骤 1（输入）**：不只列数据，还写清口径——浏览量按「每会话每页一次」去重、
  订单按「订单行含该页商品 + 同一时间窗」归属；调价需成本口径、币种、原价（回滚用）；
  GA4 需时区、币种、交易标识、同意配置。
- **步骤 2（判断）**：写明判定规则与例外处理——低流量以「商家给定最低浏览量门槛」判定，
  不发明数字；毛利例外 = 跌破商家底线 或 取整偏差超过允许步长；GA4 按交易标识+币种在
  留出处理延迟的窗口内核对，区分缺失/迟到/重复。
- **步骤 3（交付/验证）**：写明交付物与核对动作——归属订单合计对订单导出、调价表行数对
  变体数、差异记录逐条给可能原因与确认修复的方法。
- **FAQ**：答案从一句话扩为「规则 + 为什么 + 边界」，覆盖评审点名的跨页浏览、重复会话等。
- **阈值一律是商家提供的参数**（stated floor / minimum view count / 允许取整步长），
  不虚构任何指标。

## 还需要做的

1. 部署最新构建。
2. 在 GSC 对下列 URL 提交重新索引：
   - `/zh-cn/guides/smart-home-product-translation-guide-2026/`（此前为 draft，10-23 后才补完全文翻译）
   - `/products/spark-analytics-agent/playbook/keyword/shopify-product-page-conversion-rate/`
   - `/zh-cn/resources/product-research/reviews/`（Duplicate without user-selected canonical）
   - 25 篇 10-26 前跳英文的 zh-cn 指南
3. 重抓需 1–3 周，之后复查 GSC 的 Soft 404 / Duplicate 计数；届时再核对
   GSC 抓取内容与页面渲染，确认 Soft 404 是否真正解除。
4. 按试点质量基准补齐其余 532 条场景的可执行细节（分批进行）。

