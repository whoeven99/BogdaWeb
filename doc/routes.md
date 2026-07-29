# 路由迁移映射

本文件用于明确 `ciwi-web` 当前路由、目标路由和实施阶段的处理方式。

重点不是把所有现有 URL 原样保留，而是把当前散乱的根级 slug 收敛成可扩展的语义化结构。

## 1. 当前问题

当前官网路由存在几个明显问题：

- 只有根级 `[slug]` 页面，无法承接真正的多层级信息架构
- 顶部导航中的部分路径实际并不存在
- 大量根级 slug 页面未来不适合继续保留在顶层
- Blog 与 Help Center 没有纳入统一的路由规划

## 2. 目标路由原则

- 顶层路径只保留高层级信息架构
- 产品、解决方案、对比页、内容页全部使用明确前缀
- 历史 URL 如有价值，优先 301 到对应新页面
- 占位内容页不强行保留原样

## 3. 顶层目标结构

- `/`
- `/products`
- `/products/[slug]`
- `/solutions`
- `/solutions/[slug]`
- `/demo`
- `/demo/[slug]`
- `/compare`
- `/compare/[slug]`
- `/cases`
- `/cases/[slug]`
- `/blog`
- `/blog/[slug]`
- `/help-center`
- `/help-center/[category]`
- `/help-center/[category]/[slug]`
- `/pricing`
- `/about`
- `/contact`
- `/privacy-policy`
- `/terms-and-conditions`

## 4. 当前实现到目标结构的迁移表

### 4.1 已存在主页面

| 当前路由 | 当前状态 | 目标路由 | 一期处理 |
|---|---|---|---|
| `/` | 首页，需重写 | `/` | 保留路径，重做内容与结构 |
| `/pricing` | 占位页 | `/pricing` | 保留路径，重做 |
| `/translator` | 占位详情页 | `/products/translator` | 新路由落地后 301 |

### 4.2 当前导航里已写但不存在的页面

| 当前导航路径 | 当前状态 | 目标路由 | 一期处理 |
|---|---|---|---|
| `/product/ciwi-ai-translator` | 不存在 | `/products/translator` | 直接按目标路由实现 |
| `/product/ciwi-ai-product-content` | 不存在 | `/products/content-ai` | 直接按目标路由实现 |
| `/shopify-plan/1-dollar` | 不存在 | `/solutions/start-on-shopify` | 一期可延后 |
| `/shopify-plan/why-shopify` | 不存在 | `/solutions/why-shopify` | 一期可延后 |
| `/shopify-plan/build` | 不存在 | `/solutions/build-on-shopify` | 一期可延后 |
| `/shopify-plan/migrate` | 不存在 | `/solutions/migrate-to-shopify` | 一期可延后 |

### 4.3 根级模型能力页

这些页面当前来自 `footerItemsMap`，内容还是占位，不适合继续占用根级 URL。

| 当前路由 | 建议目标 | 一期处理 |
|---|---|---|
| `/gpt-4-1` | `/products/translator#models` | 301 到锚点 |
| `/gpt-4o` | `/products/translator#models` | 301 到锚点 |
| `/gemini-2-5-pro` | `/products/translator#models` | 301 到锚点 |
| `/qwen` | `/products/translator#models` | 301 到锚点 |
| `/deepseek` | `/products/translator#models` | 301 到锚点 |
| `/hunyuan` | `/products/translator#models` | 301 到锚点 |
| `/grok` | `/products/translator#models` | 301 到锚点 |
| `/kimi` | `/products/translator#models` | 301 到锚点 |

### 4.4 翻译引擎与翻译能力页

| 当前路由 | 建议目标 | 一期处理 |
|---|---|---|
| `/google-translation` | `/products/translator#engines` | 301 到锚点 |
| `/deepl` | `/products/translator#engines` | 301 到锚点 |
| `/store-theme-translation` | `/products/translator#features` | 301 到锚点 |
| `/product-content-translation` | `/products/translator#features` | 301 到锚点 |
| `/product-image-translation` | `/products/translator#features` | 301 到锚点 |
| `/shopify-app-translation` | `/products/translator#features` | 301 到锚点 |
| `/glossary` | `/products/translator#glossary` | 301 到锚点 |
| `/currency-exchange-rate-inquiry` | `/products/translator#localization` | 301 到锚点 |
| `/supported-languages-list` | `/products/translator#languages` | 301 到锚点 |
| `/ip-based-automatic-switching` | `/products/translator#localization` | 301 到锚点 |

### 4.5 内容生成能力页

| 当前路由 | 建议目标 | 一期处理 |
|---|---|---|
| `/product-title-generation` | `/products/content-ai#features` | 301 到锚点 |
| `/product-description-generation` | `/products/content-ai#features` | 301 到锚点 |
| `/product-image-generation` | `/products/content-ai#features` | 301 到锚点 |
| `/product-seo-information-generation` | `/products/content-ai#features` | 301 到锚点 |
| `/collection-description-generation` | `/products/content-ai#features` | 301 到锚点 |
| `/product-faq-generation` | `/products/content-ai#features` | 301 到锚点 |
| `/image-alt-text-generation` | `/products/content-ai#features` | 301 到锚点 |

### 4.6 对比页

这类页面具备 SEO 价值，建议保留，但移动到 `compare` 目录下。

| 当前路由 | 目标路由 | 一期处理 |
|---|---|---|
| `/vs-transcy` | `/compare/ciwi-vs-transcy` | 新页落地后 301 |
| `/vs-langwill` | `/compare/ciwi-vs-langwill` | 新页落地后 301 |
| `/vs-locales-ai` | `/compare/ciwi-vs-locales-ai` | 新页落地后 301 |
| `/vs-langshop` | `/compare/ciwi-vs-langshop` | 新页落地后 301 |
| `/vs-transtor` | `/compare/ciwi-vs-transtor` | 新页落地后 301 |
| `/vs-g-translate` | `/compare/ciwi-vs-g-translate` | 新页落地后 301 |

### 4.7 Learn More / About / Legal

| 当前路由 | 目标路由 | 一期处理 |
|---|---|---|
| `/help-center` | `/help-center` | 统一入口页 |
| `/ciwi-blog` | `/blog` | 301 到 Blog 入口 |
| `/contact-us` | `/contact` | 新页落地后 301 |
| `/privacy-policy` | `/privacy-policy` | 保留 |
| `/terms-and-conditions` | `/terms-and-conditions` | 保留 |
| `/about-us` | `/about` | 新页落地后 301 |

## 5. Blog 与 Help Center 处理

### Blog

当前存在：

- `blog/` 的 Ghost
- `ciwi-web/public/blog` 的历史 Gatsby 静态产物

一期策略：

- 官网前台使用 `/blog` 作为统一入口
- 历史 `public/blog` 不再作为未来主博客方案扩展
- 真实博客详情页前期可继续由 Ghost 承担

当前实现进度：

- `/blog` 已作为统一入口页落地
- `/blog/[slug]` 已建立站内文章页模板
- 当前已发布 Ghost 内容通过构建期静态数据映射到站内文章页
- 原始 Ghost 链接仍作为内容来源引用保留

### Help Center

当前帮助中心静态产物仍保留在：

- `/help-center/*`

一期策略：

- 新增统一的 `/help-center` Landing Page
- 高流量文章继续沿用现有静态地址
- 后续再逐步迁移文章详情前台

当前实现进度：

- `/help-center` Landing Page 已落地
- 高价值帮助文档已纳入首页、资源页和帮助中心入口页
- 帮助文档详情页尚未迁入统一前台模板

## 6. 实施优先级

### 第一批必须改造

- `/`
- `/pricing`
- `/products/translator`
- `/products`
- `/demo`
- `/blog`
- `/blog/[slug]`
- `/help-center`
- `/about`
- `/contact`

### 第二批补路由与重定向

- 根级旧 slug 到新结构的 301
- 对比页重定向
- 内容生成和翻译能力页重定向

### 第三批清理

- 清理无价值占位页
- 下线历史不再使用的静态资源入口
- 最终收敛 `public/blog` 的遗留产物

## 7. 代码实施建议

建议实施时按这个顺序改：

1. 去掉根级 `[slug]` 作为主要承载方式
2. 建立新的目录结构，如 `products`、`solutions`、`demo`、`compare`
3. 重写导航和页脚链接到目标结构
4. 视上线节奏增加 `redirects` 或应用层跳转
5. 最后再清理历史占位页

## 8. 当前结论

路由层需要尽快做的不是“补更多单页”，而是先建立可扩展的目录化结构。

否则继续往现有根级 slug 上堆页面，只会让后续迁移成本更高。
