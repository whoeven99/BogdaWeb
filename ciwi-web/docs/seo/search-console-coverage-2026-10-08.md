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

## 部署后与待补数据

本次修改在本地工作区，尚未部署。部署后检查线上 sitemap 已排除两页，再向 Search Console 重新提交 `https://ciwi.ai/sitemap.xml`。正常 noindex、规范页归并和旧页跳转不需要强行变为收录页。

继续逐页处理所需：分别打开 404、重定向、已抓取未收录、已发现未收录分类，导出其具体 URL 表格；对关键未收录页面查看 URL 检查中的最近抓取时间、Google canonical、抓取允许状态。只有实际修复的异常才点击“验证修复”。

参考：[Google canonical 指南](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)、[抓取问题排查](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors)、[收录 FAQ](https://developers.google.com/search/help/crawling-index-faq)。Google 明确说明 sitemap 不保证收录。
