# 内容系统改造执行计划

## 目标

- 统一 `blog` 与 `help center` 的内容源
- 保留现有 Next.js 前台与 i18n 路由体系
- 不引入数据库，采用 `MDX + GitHub 权限 + Render 自动发布`
- `subscription` 独立为后续功能，不耦合到内容系统

## 架构原则

1. `ciwi-web` 继续作为唯一前台站点。
2. 英文默认根路径 `/`，中文路径前缀 `/zh-cn/`。
3. 小文案继续保留在 `src/content/*.ts`。
4. 大内容迁移到 `content/**/*.mdx`。
5. 媒体资源采用分层策略：
   - 小型静态图：`public/`
   - 大图、下载文件、重媒体：对象存储/CDN

## 内容组织

```text
content/
  blog/
    en/
      *.mdx
    zh-cn/
      *.mdx
  help-center/
    en/
      **/*.mdx
    zh-cn/
      **/*.mdx
```

## i18n 策略

1. 每个语言版本使用独立 MDX 文件。
2. 每篇内容必须有稳定的 `entryId`，用于跨语言配对。
3. `slug` 可按语言独立，但同一 `entryId` 的多语言内容需要一一对应。
4. UI 文案允许回退到英文；正文内容不跨语言回退。

建议 frontmatter 字段：

```yaml
entryId: blog-ciwi-translator-intro
locale: en
slug: ciwi-translator-cha-jian-jie-shao
title: Introducing the CIWI Translator app
description: ...
publishedAt: 2025-07-31
status: published
readingTime: 6 min read
tags:
  - Product
  - Translation
sourceHref: https://ghost-blog-2m1k.onrender.com/ciwi-translator-cha-jian-jie-shao/
sourceLocale: en
translationStatus: manual
```

## 自动生成 i18n 的策略

默认不自动发布翻译版本，采用“自动生成草稿 + 人工审核”的模式：

1. 先创建源语言文章
2. 通过脚本生成另一语言的草稿文件
3. 自动写入：
   - `entryId`
   - `locale`
   - `sourceLocale`
   - `translationStatus: ai-draft`
   - `status: draft`
4. 人工校对后再改为 `published`

后续计划中的脚本目标：

- `npm run content:translate -- --type=blog --from=en --to=zh-cn --slug=...`

## 分阶段执行

### 阶段 1：内容基础设施

- 增加 MDX frontmatter 解析和 schema 校验
- 增加按 locale 读取内容的 loader
- 建立 `content/` 目录
- 输出第一版内容规范

### 阶段 2：Blog 迁移

- 将 `src/content/blog.ts` 切换为基于 MDX 读取
- 保持现有路由、SEO、分页与结构化数据不变
- 迁移现有中英文 blog 内容

### 阶段 3：Help Center 迁移

- 将 `src/content/help-center.ts` 逐步拆分到 MDX
- 保留目录导航、上一篇/下一篇、相关文章能力
- 增加目录排序和 TOC 数据

### 阶段 4：富媒体组件

- 为 MDX 提供可复用组件：
  - `ContentImage`
  - `VideoEmbed`
  - `Callout`
  - `ComparisonTable`
  - `FaqAccordion`
  - `CtaCard`

### 阶段 5：发布链路与治理

- 增加内容校验脚本
- 增加内容发布 SOP
- 补充 Docker / Render 部署文件
- 约束媒体文件进入 Git 仓库的规则

## 当前改造顺序

1. 先搭 MDX + i18n 基础设施
2. 先迁 Blog
3. 再迁 Help Center
4. 最后补自动翻译草稿脚本和富媒体组件
