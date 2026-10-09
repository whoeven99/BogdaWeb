# Search Console 收录检查（2026-10-08）

## 数据范围

来源：`/Users/cedric/Downloads/ciwi.ai-Coverage-2026-10-08`。导出时间为 10 月 8 日，趋势最后一条为 10 月 4 日：已收录 1,178 页，未收录 1,244 页。

该导出只有分类统计和日期趋势，**没有各分类的受影响 URL**。线上 sitemap 检查用于确认当前公开网址的技术状态，不能替代 Google 的历史抓取记录，也不能据此确认报告中的具体页面已修复。

## 分类汇总

| 原因 | 页数 | GSC 验证状态 | 判断与处理 |
| --- | ---: | --- | --- |
| Page with redirect | 365 | Failed | 旧 URL 或规范化跳转可以正常排除。保留有效的永久跳转，检查目标是否返回 200；缺少明细，不能确认这 365 页的具体情况。 |
| Crawled - currently not indexed | 55 | Failed | 已抓取不等于保证收录。需结合具体 URL、Google 选定的 canonical 和内容检查，不能仅靠取消跳转解决。 |
| Not found (404) | 8 | Not Started | 需要这 8 个 URL：有相关替代页则永久跳转；误删则恢复；确实删除且无替代页则保留 404/410。不要统一跳转首页。 |
| Alternate page with proper canonical tag | 4 | Not Started | 通常是正确的重复页面归并。检查具体 URL 后判断是否符合预期。 |
| Excluded by ‘noindex’ tag | 1 | Not Started | 若属于主动排除则无需取消 noindex。本次另外发现线上两个中文版法务页的 sitemap/noindex 冲突并修正；不能确认其是否对应报告中的这 1 页。 |
| Discovered - currently not indexed | 811 | Started | 尚未收录的发现网址，需结合抓取统计、服务器日志和具体 URL 判断抓取/内容问题。 |
| **合计** | **1,244** | | |

9 月 18 日为已收录 386、未收录 101；9 月 19 日增至已收录 900、未收录 1,497。此次规模变化值得结合发布记录和受影响 URL 核实，不能仅凭汇总确定原因。

## 已完成的修复

线上确认 `/zh-cn/privacy-policy/` 和 `/zh-cn/terms-and-conditions/` 均返回 HTTP 200、带 `noindex, follow`，但仍出现在 sitemap。

- `src/app/sitemap.ts` 排除这两个主动 noindex 的中文版法务页，保留英文法务页及现有访问方式。
- `scripts/verify-seo-artifacts.mjs` 增加构建检查，禁止这两页重新进入 sitemap。
- 保留现有 noindex 策略和有效旧 URL 重定向。
- `next.config.ts` 将旧博客域名的中英文动态跳转目标改为 `https://ciwi.ai/blog/:path*/` 和 `https://ciwi.ai/zh-cn/blog/:path*/`，消除跳转目标缺斜杠引发的第二次规范化跳转。
- `scripts/check-seo.mjs` 检查配置中指向主域名的页面跳转目标必须带尾斜杠，防止同类问题复发。

## 尾斜杠专项检查

网站已经启用 `trailingSlash: true`；共享链接组件通过 `resolveLocalizedHref` / `localizeHref` 生成带尾斜杠的地址，metadata、sitemap 和 llms.txt 也使用统一的 URL 构造方法。

修复前本地复现：旧博客 `/hello/` 跳到 `https://ciwi.ai/blog/hello`，中文版 `/zh-cn/hello/` 跳到 `https://ciwi.ai/zh-cn/blog/hello`，两者都缺少规范尾斜杠。此次修正这些跳转目标。

`/about` 返回 308 到 `/about/` 是正确的规范化行为。旧比较页无斜杠版先跳到有斜杠的旧地址，再跳到新的比较页；当前保留框架的统一规范化策略。历史无斜杠网址仍可能出现在 GSC 的“Page with redirect”中，这不代表最终页面无法收录。

本地渲染检查了首页、中英文博客列表、Translator 产品页、Spark 场景索引、指南、比较列表和帮助中心，共 9 页，其 HTML 页面站内链接均没有缺尾斜杠的情况。内容数据中的 `/blog` 等写法会在渲染时统一转换，无需批量改写原始内容。

## 验证

- `npm run build` 通过：内容校验、SEO 源码检查、TypeScript/构建、SEO 产物检查均通过。
- 构建后的 sitemap 有 1,689 个 URL；两个中文版法务页已排除，两个英文法务页仍在。
- 临时向构建产物注入被排除的 URL，确认新增检查失败并给出对应错误；随后恢复产物。
- 线上 robots.txt 返回 200，允许公共页面抓取，仅禁止 `/api/`，声明正确的 sitemap。
- 线上旧比较页 `/compare/ciwi-vs-transcy/` 返回 308，直接指向 `/compare/transcy-alternative/`，目标返回 200。
- 修复后使用真实博客 slug 在本地生产服务验证：中英文旧博客地址均返回 308 到带尾斜杠的新地址，查询参数保留，新地址直接返回 200；中英文 `/about` 正常跳到带斜杠页面并返回 200；robots.txt、sitemap.xml、llms.txt 不带尾斜杠直接返回 200。
- 构建有一条已有的 SiteFooter 图片性能警告，不影响本次构建结果。
- 线上批量检查共尝试 624 个不同 sitemap URL：535 个返回 200、canonical 与自身一致且无 noindex；另外 89 个请求超时。出现超时后停止批量检查，因此**没有完成线上全量检查**。随后低频复查其中一个超时页面，返回 200（约 17.7 秒）、canonical 正确；首页另一次检查返回 200（约 1 秒）。不能据此将批量超时认定为 404 或 Google 抓取故障，仍需服务器日志核实。

## 后续分类检查

针对 GSC 截图中的五类原因，对本地生产构建执行完整 sitemap 页面检查：全部 1,689 个 URL 返回 200、canonical 与自身一致、无 noindex。此结论限于当前本地构建，不代表 Google 历史抓取状态或线上部署已更新。

同时提取所有页面 HTML 的站内链接，发现中文版资源中心链接 `/guides/本地化/` 指向不存在的页面。`localizeLanguageSignalFields` 的排除字段名单缺少 `categoryHref`，导致 `/guides/localization` 被当作文案翻译。

修复：所有以 `Href` 结尾的链接字段跳过文案翻译；显示文字仍正常翻译。新增 `scripts/seo-localization.test.mjs`，使用实际资源中心文案检查中英文指南入口地址保持正确；纳入 `npm run seo:check`，构建会自动执行。

额外验证：不存在的博客、指南、产品 slug 返回真实 404；中文版法务页按现有策略返回 200 和 noindex，并已从 sitemap 排除。正常重定向与 canonical 归并继续保留。截图中的 8 个 404、4 个 canonical 替代页和 55 个抓取后未收录页面仍需要具体 URL 才能确认是否与当前代码问题对应，不能将本次死链接直接等同于报告中的某一页。

## URL 明细检查与修复

用户随后提供两份分类明细及 8 个 404 URL：

- `ciwi.ai-Coverage-Drilldown-2026-10-08/Table.csv`：365 个重定向 URL。
- `ciwi.ai-Coverage-Drilldown-2026-10-08 (1)/Table.csv`：55 个 URL。其 Metadata.csv 明确标注 `Crawled - currently not indexed`，不是 4 个 canonical 替代页的列表。

重定向列表中 223 个 URL 的路径有重复斜杠，另有 119 个不含重复斜杠但缺少尾斜杠；其余 23 个涉及其他迁移或规范化情况。当前共享链接构造已补充路径重复斜杠归一化，保留查询参数和锚点，外部网址保持原样；回归测试已纳入 SEO 检查。

修复前本地检查全部 420 个导出 URL：365 个重定向 URL 有 360 个最终返回 200、5 个最终 404；55 个抓取后未收录 URL 有 39 个最终返回 200、16 个最终 404。测试模拟原始 Host 并逐跳检查目标，限于本地应用，未验证公网的 www、HTTP、DNS 或边缘代理配置。

### 明确修复的目标错误

七个旧内容生成功能地址被 next.config.ts 跳转到已删除的 `/products/content-ai/`，导致“有跳转但最终 404”。已改到现有 `/products/spark-analytics-agent/#features`，并为中英文 `/products/content-ai/` 本身补充到 Spark 的永久跳转。新增回归测试禁止旧配置再次将流量导向被删除的 Content AI 页面。

补充 `store-theme-translation`、`product-content-translation`、`ip-based-automatic-switching` 的旧入口跳转到 Translator 功能区；`currency-exchange-rate-inquiry` 跳转到现有的 Shopify 多币种定价指南。

### 用户提供的 8 个 404

| 旧地址 | 处理 |
| --- | --- |
| `/products/bundle-discount/` | 永久跳转到 `/help-center/ShopifyApp/bundle-discount-app-overview/`；旧产品页已删除，但同一应用的介绍仍存在。 |
| `/zh-cn/products/bundle-discount/` | 永久跳转到对应中文版应用介绍。 |
| `/product-title-generation` | 修正原本指向 Content AI 的失效跳转，目标为 Spark 功能区。 |
| `/store-theme-translation` | 永久跳转到 Translator 功能区。 |
| `/product-content-translation` | 永久跳转到 Translator 功能区。 |
| `/es/`、`/pt/` | 当前网站仅提供英文和简体中文，没有相应语言首页，保留 404。 |
| `/help-center/changelog/changelog-ciwi-translator/` | 当前没有对应 changelog 内容，保留 404。 |

第二份列表还有 9 个旧博客文章（旧域名迁移后同 slug 正文不存在）和 `/pricing`。未找到等价内容，保留 404，避免统一跳到博客目录或首页造成误导；若这些内容应当继续存在，需要恢复正文或提供逐篇对应的替代内容。4 个 canonical 替代页的具体明细仍未提供。

### 修复后验证

- 生产构建、3 个 SEO 回归测试、SEO 源码及产物检查通过。
- 重新检查全部 420 个导出 URL：365 个重定向 URL 最终全部返回 200；55 个抓取后未收录 URL 中 45 个最终返回 200，剩余 10 个为上述无替代内容的旧文章/定价页。
- 8 个 404 地址中 5 个通过永久跳转到现有相关内容后返回 200，另外 3 个按预期保留 404。
- 中英文 Content AI 旧产品地址均跳到对应 Spark 产品页，最终返回 200。
- 这些是本地构建验证结果；未部署，未改变 Google 当前的历史收录状态。

## 下一步

### 4 个 canonical 替代页的线上复查

用户随后补充以下四个 URL，2026-10-08 对线上逐页获取 HTML：

| keyword/ 后的路径 | 当前响应 | canonical |
| --- | --- | --- |
| `category/refund-analysis-and-alerts/` | 200，无跳转 | 唯一 canonical 指向自身 |
| `shopify-inventory-discrepancy-report/` | 200，无跳转 | 唯一 canonical 指向自身 |
| `shopify-rename-variant-options/` | 200，无跳转 | 唯一 canonical 指向自身 |
| `why-are-my-shopify-sales-dropping/` | 200，无跳转 | 唯一 canonical 指向自身 |

四页均无 HTML noindex，标题和 H1 对应不同主题。本地完整 sitemap 检查结果也与线上一致；分类页及场景页代码都按当前页路径生成 canonical，没有发现将这四页 canonical 指向其他页面的现存代码问题，因此不再修改 canonical 或增加跳转。

GSC 列表中的历史抓取日期为 9 月 21–22 日，不能直接反映 10 月 8 日的 HTML。历史 canonical 错误或抓取状态尚未刷新是可能原因，**尚未证实**。需对照每页 URL 检查中的“用户声明的规范网址”“Google 选择的规范网址”“最后抓取时间”，并运行实时测试，才能判断是否只需等待重新抓取，或仍有其他重复页面信号。当前自引用 canonical 不保证 Google 一定选定或收录该页。

本次修改在本地工作区，尚未部署。部署后检查线上 sitemap 已排除两页，再向 Search Console 重新提交 `https://ciwi.ai/sitemap.xml`。正常 noindex、规范页归并和旧页跳转不需要强行变为收录页。

继续逐页处理所需：补充 4 个 canonical 替代页以及 811 个已发现未收录页面的具体 URL；对已提供的未收录页面查看 URL 检查中的最近抓取时间、Google canonical、抓取允许状态。只有实际修复的异常才点击“验证修复”。

参考：[Google canonical 指南](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)、[抓取问题排查](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors)、[收录 FAQ](https://developers.google.com/search/help/crawling-index-faq)。Google 明确说明 sitemap 不保证收录。
