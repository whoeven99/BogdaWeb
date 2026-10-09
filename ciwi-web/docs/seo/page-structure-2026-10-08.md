# 页面结构、内链与关键词优化

## 检查范围

基于 2026-10-08 Search Console 导出与本地生产构建，扫描 sitemap 中的 1,689 个中英文页面，以及页面实际输出的内链。此次修改未部署。

## 已实施的调整

- 资源、产品和场景卡片的标题成为可抓取的描述性链接，保留原有按钮。
- 产品、应用场景与竞品对比页增加可见面包屑，并让结构化数据中的首页链接对应当前语言。
- 应用场景详情增加产品与操作资源入口；翻译恢复页同时链接 Langify 和 Transcy 对比页。
- Translator 产品页补充 Langify 对比与翻译恢复入口；页脚增加翻译应用对比目录。
- Spark 相关资源替换为 AI 助手操作文档与工作流目录，减少与店铺任务不相关的翻译资源。
- 修复场景分类模板缺少主内容区域的问题，覆盖 224 个中英文分类页；分类标题去掉数量和冗长的产品后缀。
- 明确首页、产品页和对比目录的主题；补齐中文产品 SEO 标题与描述，修正 4 组中英文重复标题。
- 本地化目录承接 `ecommerce localization` 主题，明确标题、首段与导航链接文字；该查询在导出期间有 108 次曝光。
- 产品 FAQ 增加二级标题；最佳应用目录增加分类二级标题。
- 去掉场景正文对首屏简介的重复复述，以及产品资源卡片反复使用同一份产品简介的问题。

## 页面与关键词职责

| 页面 | 主要搜索意图 | 支撑内容与内链 |
| --- | --- | --- |
| 首页 | Ciwi 品牌、Shopify AI 翻译与店铺自动化 | 两个产品与相关资源 |
| `/products/translator/` | Shopify AI translation app、multilingual Shopify store | 翻译范围、术语控制、持续同步、迁移与应用对比 |
| `/products/spark-analytics-agent/` | Shopify AI agent、store task automation | 任务范围、权限、执行结果、助手文档与场景库 |
| `/compare/` | Shopify translation app comparisons、alternatives | 竞品目录与产品入口 |
| `/guides/localization/` | ecommerce localization、Shopify localization strategy | 行业、品牌、B2B 与具体操作指南 |
| `/compare/langify-alternative/` | Langify alternative、迁移与兼容性 | 产品、恢复检查清单与相关文档 |
| `/compare/transcy-alternative/` | Transcy alternative、pricing comparison | 产品、恢复检查清单与相关文档 |
| `/use-cases/translator-quality-recovery/` | 切换应用后的 Shopify 翻译恢复 | 备份、展示问题排查、小批量验证、竞品选择 |
| Spark 分类与场景页 | 一个主题或一个具体任务 | 分类 → 场景 → 相关场景／产品 |

## 关键词密度的处理原则

不设统一百分比，也不按次数补词。优先检查标题、H1、首段、二级标题和链接文字是否准确表达该页主题，正文是否解决对应问题。

修改前的英文主内容观察值：Translator 页约 1,680 个空格分隔词，`translation` 出现 27 次；Langify 对比页约 1,823 词，品牌名出现 47 次；Transcy 对比页约 1,854 词，品牌名出现 45 次。对比表中的品牌名会自然重复，这些数字本身不证明堆砌，也不是优化目标。优先删除没有新信息的重复段落，而非机械降低品牌名次数。

中文不采用英文空格分词计算密度。场景页的索引与排名仍取决于内容是否提供独立、具体的操作价值；结构检查通过不能保证 Google 收录或排名。

## 持续检查

本地生产页面全站复查结果：

| 检查项 | 结果 |
| --- | --- |
| 扫描的 sitemap 页面 | 1,689 |
| 主内容区域缺失或重复 | 0 |
| H1 缺失或重复 | 0 |
| 重复页面标题组 | 0 |
| 非 200 内链目标（包含重定向） | 0 |
| 在扫描页面中没有任何内链入口的页面 | 0 |

中英文两款产品、翻译恢复、Langify 和 Transcy 页面共 10 个页面另外验证了相关入口与面包屑语言一致性。最后修改的本地化目录文案与导航文字通过最终完整构建；中英文目录页另行验证了标题、主内容区域、H1，以及 55 个英文和 30 个中文内链目标，均返回 200。

运行本地生产服务后执行：

```sh
npm run seo:structure -- http://localhost:9011 /tmp/ciwi-page-structure.json
```

检查 sitemap 页面状态、主内容区域、H1、重复标题、实际内链目标，以及来自其他扫描页面的入口；输出每页标题、内链和英文词项出现次数。此检查需要运行中的网站，不作为静态构建检查的替代。

部署后按页面组观察曝光、点击、CTR、查询变化和 Shopify App Store 出站点击；优先观察 Langify、Transcy、翻译恢复与两款产品页。Search Console 变化需要重新抓取后才能反映。

参考：[Google 内链建议](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)、[搜索基础要求](https://developers.google.com/search/docs/essentials)、[关键词堆砌政策](https://developers.google.com/search/docs/essentials/spam-policies#keyword-stuffing)。
