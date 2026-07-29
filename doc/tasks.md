# 当前任务清单

## 状态说明

- `todo`：未开始
- `doing`：进行中
- `done`：已完成
- `blocked`：受阻

## 当前阶段：官网改造方案设计

### P0

- `done` 盘点现有官网、博客、帮助中心的技术形态
- `done` 明确官网改造的目标架构方向
- `done` 明确一期信息架构与导航层级
- `done` 明确首页内容模块和优先级
- `done` 明确产品页、解决方案页、对比页的模板结构
- `done` 明确博客接入策略：独立前台 / Headless / 渐进迁移
- `done` 明确 Demo Center 一期范围

### P1

- `done` 梳理现有路由与目标路由映射表
- `todo` 梳理官网需要保留的历史内容和静态资源
- `todo` 确定统一 SEO 方案：metadata、结构化数据、内链策略
- `done` 确定帮助中心的过渡方案
- `doing` 形成首页和关键模板的设计稿说明

## 当前阶段：准备实施

### P0

- `done` 建立页面模板体系：Product / Resource / Compare 优先
- `done` 建立前端基础设施目录结构
- `done` 建立全局 layout 组件：Header / Footer / Container
- `done` 建立基础 section 组件库
- `done` 建立内容配置层：navigation / home / products / compare / resources
- `done` 建立基础 SEO 工具层：metadata
- `done` 重写全局导航与页脚链接结构
- `done` 建立新的目录化路由骨架：`products`、`solutions`、`demo`、`resources`
- `done` 落地新版首页骨架
- `done` 落地 `/products/translator` 页面骨架
- `done` 落地 `/blog` 与 `/help-center` 入口页
- `done` 建立 Blog 详情页模板并切换到仓库内 MDX 内容源
- `done` 建立 Compare 详情页模板并接入结构化内容
- `done` 为首页与 Translator 页面接入轻量 Demo 展示模块

### P1

 - `doing` 处理旧路由到新路由的跳转策略
- `done` 清理历史 `public/blog` 遗留方案
- `done` 整理首页与资源页所需的初始内容数据
- `doing` 确定统一 SEO 方案：metadata、结构化数据、内链策略
- `done` 为 Blog 文章页补目录、section anchor、相关文章入口和基础结构化数据
- `doing` 为 Help Center 建立高价值文档页前台模板
- `done` 已继续迁入更多高价值 Help Center 文档，并补更细的资源回流
- `done` 已将 Help Center 入口拆成 featured docs / all docs 两层
- `todo` 为 Help Center 增加 topic grouping / filter，避免入口页继续膨胀
- `done` 清理旧帮助中心静态站点，仅保留当前页面仍在使用的截图素材
- `done` 为 Translator Demo 补样例输入切换式交互演示
- `done` 为 Solutions 建立内容层、详情页模板与基础 schema
- `done` 为 Compare / Solutions 页面补 breadcrumb、FAQ 和页面 schema 基础层
- `doing` 为 Compare 页面补更多竞争对比页和维度字段
- `done` 为官网核心页面模板预留图片 / 视频占位区块，并补素材说明

### P2

- `todo` 评估是否需要内容模型文档
- `done` 评估是否需要设计 token / 组件规范文档
- `done` 清理 `public/blog` 与其他历史静态博客残留
- `todo` 评估何时引入 Turso 承接结构化资源索引和 redirect 配置

## 当前阶段：已落地进度快照

- `done` 新版官网前台已切到统一的 Next.js 目录化结构
- `done` 已去除旧的 Ant Design 官网壳层
- `done` 首页、Products、Translator、Blog、Help Center、Resources、Compare 已有可构建页面
- `done` Solutions 已从入口骨架升级为内容驱动的列表页和详情页模板
- `done` Blog 已切换到 Git-based MDX 内容体系
- `done` Compare 已有正式模板骨架
- `done` Compare 已新增原生 Shopify 方案与更多竞品对比页，并自动进入资源聚合层
- `done` Compare 列表页与详情页已补基础 schema 和跨页面回流
- `done` 轻量 Demo 已进入首页和 Translator 页面
- `done` Translator 页面已具备锚点导航结构
- `done` Blog 详情页已补 TOC、section anchor 和基础 JSON-LD
- `done` Help Center 已开始迁入首批高价值文档详情页模板
- `done` Help Center 详情页已补 TOC、section anchor、TechArticle / FAQ schema 与更细的资源回流，并已继续扩大覆盖范围
- `done` Help Center 聚合页已拆成 featured docs / all docs 两层
- `done` 首页、产品页、方案页、对比页、Blog、Help Center 与关键静态页已补图片 / 视频占位区块和素材说明
- `done` 旧根级 slug 已有兼容层承接，并会自动跳到新版目录化地址
- `done` `npm run lint` 与 `npm run build` 持续通过

## 下一步建议执行顺序

1. 继续扩大 Help Center 高价值文档迁移范围，并增加 topic grouping / filter。
2. 继续扩 Compare 页面数量，并把 Solution 页与更多产品、资源形成更细的回流。
3. 继续完善内容脚手架与发布流程，并逐步把帮助中心截图素材迁出历史目录。

## 完成标准

当以下内容明确后，可以进入正式实施：

- 顶层导航确定
- 页面模板确定
- 博客接入策略确定
- 演示能力边界确定
- 一期范围确定
