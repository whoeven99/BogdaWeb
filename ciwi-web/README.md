# Ciwi Web

Ciwi 官方站点，基于 Next.js 15、TypeScript 和文件化内容系统构建。

当前内容架构：

- 前台站点：`ciwi-web`
- 内容来源：`content/**/*.mdx`
- Guide 数据：`src/content/data/*.json`
- 权限与发布：GitHub PR + Render 自动构建
- i18n 路由：英文 `/`，中文 `/zh-cn/`

## 本地开发

```bash
npm install
npm run dev
```

默认开发地址：`http://localhost:3000`

## 内容目录

```text
content/
  blog/
    en/
    zh-cn/
  help-center/
    en/
      shopify-app/
    zh-cn/
      shopify-app/
```

内容规则：

- 每篇内容必须有 `entryId`
- 每个语言版本使用独立 `.mdx` 文件
- 中文不自动回退到英文正文
- 仅 `status: published` 的内容会进入页面生成

## 常用命令

```bash
npm run content:new -- --type=blog --locale=en --slug=shopify-localization-checklist
npm run content:validate
npm run build
```

`build` 已经内置内容校验，frontmatter 或内容结构不合法会直接失败。

当前校验会覆盖：

- 必填 frontmatter 字段
- `locale` 与目录是否匹配
- `status` 是否合法
- 内容正文是否为空
- 同 collection + locale 下是否重复 `slug`
- 同 `entryId` 下是否重复语言版本
- MDX 中引用的本地图片是否存在
- Guide JSON 的必填字段、`href/slug` 一致性、发布状态与翻译状态

对于单语先发这类情况，校验会给出 warning，但不会阻断构建。

## 新建内容脚手架

Blog 示例：

```bash
npm run content:new -- --type=blog --locale=en --slug=shopify-localization-checklist --title="Shopify localization checklist" --tags=Shopify,Localization
```

Help Center 示例：

```bash
npm run content:new -- --type=help-center --locale=en --category=shopify-app --slug=how-to-manage-market-priority --topic="Translation Workflow"
```

说明：

- 默认生成 `status: draft`
- 自动补 `entryId`、日期、基础 frontmatter 和正文占位
- Help Center 会自动计算同分类下的下一个 `order`
- 如需自定义 `entryId`，可追加 `--entry-id=...`

## 翻译草稿脚手架

先创建源语言文章，再生成另一语言草稿：

```bash
npm run content:translate -- --type=blog --from=en --to=zh-cn --slug=ciwi-translator-cha-jian-jie-shao
```

Help Center 示例：

```bash
npm run content:translate -- --type=help-center --from=en --to=zh-cn --slug=how-to-translate --category=shopify-app
```

说明：

- 该命令只会生成目标语言草稿文件
- 草稿会自动写入 `status: draft`
- 生成后需要人工校对标题、描述、正文和 slug，再改为 `published`

## Guide 翻译草稿

Guide 内容使用 JSON 数据文件维护，可先批量生成另一语言的草稿：

```bash
npm run guides:translate -- --type=localization --from=en --to=zh-cn
npm run guides:translate -- --type=function-scenario --from=en --to=zh-cn
```

单篇生成示例：

```bash
npm run guides:translate -- --type=localization --from=en --to=zh-cn --slug=shopify-translation-guide-2026
```

说明：

- 草稿会写入 `src/content/data/*.zh-cn.json`
- 草稿默认是 `status: draft`、`translationStatus: ai-draft`
- 只有把条目校对完成并改成 `status: published` 后，前台才会展示对应语言版本
- 已发布 guide 不允许保留 `[TODO ...]` 标记，也不允许继续保留 `translationStatus: ai-draft`

## 当前可用的 MDX 组件

- `ContentImage`
- `VideoEmbed`
- `Callout`
- `CtaCard`
- `FaqAccordion`
- `ComparisonTable`
- `FeatureGrid`

这些组件已经同时支持 `blog` 和 `help center`。

## Docker

本项目已支持 Docker 部署，使用 Next.js standalone 输出。

本地构建镜像：

```bash
docker build -t ciwi-web .
```

本地运行：

```bash
docker run --rm -p 9000:9000 ciwi-web
```

## Render 部署建议

将 `ciwi-web` 作为 Render 的 Docker Web Service：

- Root Directory: `ciwi-web`
- Runtime: `Docker`
- Port: `9000`

推荐环境变量：

```text
NODE_ENV=production
PORT=9000
HOSTNAME=0.0.0.0
```

## 发布流程

1. 在 `content/` 下新增或修改 MDX 内容
2. 本地运行 `npm run content:validate`
3. 提交 PR 并完成 review
4. 合并后由 Render 自动构建并发布

## 后续计划

- 增加 MDX 富媒体组件
- 增加内容校验的重复 slug / alternate 完整性检查
- 增加更完整的内容发布 SOP
