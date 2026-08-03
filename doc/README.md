# BogdaWeb 文档索引

本目录用于沉淀官网改造过程中的计划、设计和协作约束，避免讨论只停留在聊天记录里。

## 文档列表

- `plan.md`
  - 官网改造的目标、范围、阶段和技术方向。
- `tasks.md`
  - 当前阶段的待办、优先级和完成标准。
- `agent.md`
  - 项目协作规则、上下文约束、决策记录方式。
- `design.md`
  - 品牌语言、信息架构、页面设计原则和演示能力边界。
- `content-integration.md`
  - 博客与帮助中心的统一前台接入策略和阶段迁移方案。
- `routes.md`
  - 当前路由、目标路由和迁移映射表。
- `templates.md`
  - 页面模板体系、固定模块和 SEO 要求。
- `frontend-foundation.md`
  - 前端基础设施、组件分层、内容配置层和 SEO 工具层建议。

## 使用方式

1. 新需求先看 `plan.md`，确认是否在当前范围内。
2. 进入执行前，在 `tasks.md` 里补充或调整任务。
3. 涉及项目约束、模块边界、命名和长期决策，更新 `agent.md`。
4. 涉及页面结构、视觉方向、组件语义和内容表达，更新 `design.md`。

## 当前结论

- `ciwi-web` 应作为唯一前台品牌站点。
- Blog 与 Help Center 已收敛到 `ciwi-web` 的 `MDX + frontmatter` 内容体系。
- 官网不仅是宣传页，还应承担轻量演示与 SEO 承接能力。

## 当前实施进度

当前代码已经落地的关键内容：

- 统一前台 layout、导航、页脚和基础样式 token
- 目录化路由骨架：`products`、`blog`、`help-center`、`resources`、`compare`、`demo`
- 首页、Translator 产品页、Blog、Help Center、Compare 的第一版模板
- Blog 与 Help Center 已切换到 Git-based 内容源
- Compare 正式模板落地
- 首页与 Translator 页面接入轻量 Demo 展示模块

建议阅读顺序更新为：

1. `plan.md`：看当前阶段、已落地范围和下一步重点
2. `tasks.md`：看哪些基础设施已经完成、哪些任务仍在推进
3. `content-integration.md`：看 Blog 与 Help Center 的当前接入状态
4. `routes.md`：看旧路由兼容和目标路由结构
