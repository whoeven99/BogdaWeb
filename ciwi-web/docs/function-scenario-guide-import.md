# Function Scenario Guide Import

这批数据来自：

- `/Users/cedric/Downloads/方向3_功能场景/Ciwi_W3_内容_03_*.json`

当前已经通过脚本合并为：

- [`src/content/data/function_scenario_guides.json`](file:///Users/cedric/Documents/GitHub/BogdaWeb/ciwi-web/src/content/data/function_scenario_guides.json)

读取模块：

- [`src/content/function-scenario-guides.ts`](file:///Users/cedric/Documents/GitHub/BogdaWeb/ciwi-web/src/content/function-scenario-guides.ts)

导入脚本：

- [`scripts/import-function-scenario-guides.mjs`](file:///Users/cedric/Documents/GitHub/BogdaWeb/ciwi-web/scripts/import-function-scenario-guides.mjs)

## Why This Works

这批 JSON 很适合作为“功能场景页”模板的数据源，原因是它已经覆盖了功能型 how-to 页面最关键的模块：

- `title / description / audience / mainValue`
- `overviewDrivers`
- `translationScope`
- `mistakes`
- `solutions`
- `checklist`
- `features`
- `recommendations`
- `faq`

而且 6 个内容文件内部字段完全一致，适合批量导入。

## Imported Shape

每条数据当前会映射为：

```ts
type FunctionScenarioGuide = {
  slug: string;
  href: string;
  year: number;
  title: string;
  description: string;
  industry: string;
  audience: string;
  segmentLabel: string;
  guideLabel: string;
  mainValue: string;
  topic: string;
  keywords: string[];
  overviewDrivers: {title: string; description: string}[];
  solutions: {name: string; advantages: string[]; limitations: string[]}[];
  translationScope: {category: string; items: string[]; priority: string}[];
  checklist: string[];
  mistakes: {
    category: string;
    wrongExample: string;
    correct: string;
    impact: string;
    severity: string;
  }[];
  features: string[];
  recommendations: {title: string; description: string}[];
  faq: {question: string; answer: string}[];
};
```

## Best Template Match

这批数据更适合单独接到一个新的功能场景模板，而不是直接硬塞进当前更重的 `LocalizationGuide` 模板。

推荐页面结构：

1. Hero
2. Why This Matters
3. What Should Be Translated
4. Common Mistakes
5. Workflow Options
6. Checklist
7. Ciwi Features
8. Related Guides
9. FAQ
10. CTA

## Re-import Command

当 Downloads 里的源文件更新后，可以重新执行：

```bash
node scripts/import-function-scenario-guides.mjs
```

如果以后源目录变化，也可以传入自定义路径：

```bash
node scripts/import-function-scenario-guides.mjs "/absolute/path/to/json-directory"
```
