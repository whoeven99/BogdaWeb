import type {BlogPost} from "@/content/blog";
import type {CompareItem} from "@/content/compare";
import type {HelpCenterDoc} from "@/content/help-center";
import type {SolutionItem} from "@/content/solutions";

export type MediaAssetBrief = {
  title: string;
  format: "Image" | "Video";
  aspectRatio: string;
  placement: string;
  description: string;
  checklist: string[];
};

export const homeHeroMediaBriefs: MediaAssetBrief[] = [
  {
    title: "Homepage hero product visual",
    format: "Image",
    aspectRatio: "16:10",
    placement: "首页首屏右侧 Hero",
    description: "用一张品牌级主视觉展示 Ciwi 如何覆盖 Shopify 商品、FAQ、主题区块和术语控制，而不是只呈现零散 UI。",
    checklist: [
      "优先使用真实 Shopify 后台或官网页面截图，不要使用抽象插画",
      "画面中至少出现翻译前后、glossary 或结构化内容中的一个核心场景",
      "保留足够留白，避免文字过多抢掉 Hero 文案层级",
    ],
  },
];

export const homeDemoMediaBriefs: MediaAssetBrief[] = [
  {
    title: "Homepage demo walkthrough",
    format: "Video",
    aspectRatio: "16:9",
    placement: "首页 Demo preview 模块",
    description: "准备一段 20 到 40 秒的短视频，快速展示翻译前后切换、术语锁定和页面结构覆盖。",
    checklist: [
      "节奏要快，首屏 3 秒内就看到前后差异",
      "尽量录真实产品界面，不要只做动画过场",
      "结尾画面可停留在译后商品页或多语言前台效果",
    ],
  },
];

export const productsIndexMediaBriefs: MediaAssetBrief[] = [
  {
    title: "Products overview visual",
    format: "Image",
    aspectRatio: "16:9",
    placement: "Products 列表页首屏",
    description: "准备一张产品矩阵或多产品拼图，帮助用户快速理解 Translator、Bundle 和 Content AI 的关系。",
    checklist: [
      "适合用 2 到 3 个产品界面拼接成一张图",
      "每个产品只露出最有辨识度的部分",
      "不要把它做成单产品广告图",
    ],
  },
];

export const solutionsIndexMediaBriefs: MediaAssetBrief[] = [
  {
    title: "Solutions overview visual",
    format: "Image",
    aspectRatio: "16:9",
    placement: "Solutions 列表页首屏",
    description: "准备一张按业务问题分类的场景图，适合表达转化、本地化和 AOV 三类方向。",
    checklist: [
      "最好是一张问题分区图，而不是单一产品截图",
      "让用户一眼看懂这页是按场景而不是按功能组织",
      "可适度加入商品页、购物车或多语言前台元素",
    ],
  },
];

export const compareIndexMediaBriefs: MediaAssetBrief[] = [
  {
    title: "Compare landing visual",
    format: "Image",
    aspectRatio: "16:9",
    placement: "Compare 列表页首屏",
    description: "准备一张对比页总览图，表达“从选项比较进入判断”的页面定位。",
    checklist: [
      "适合用表格、卡片或双栏界面形成对比感",
      "避免只放品牌 Logo 对撞",
      "最好体现工作流或结果差异，而不只是品牌名称差异",
    ],
  },
];

export function getSolutionMediaBriefs(solution: SolutionItem): MediaAssetBrief[] {
  return [
    {
      title: `${solution.name} scenario visual`,
      format: "Image",
      aspectRatio: "16:9",
      placement: `方案页 Hero: /solutions/${solution.slug}`,
      description: "用一张场景图说明这个方案在真实商家环境里解决什么问题，画面可以是商品页、购物车、语言切换或多市场运营界面。",
      checklist: [
        "优先展示问题发生的前台场景，而不是纯后台截图",
        "让用户一眼看出这是转化、本地化或 AOV 相关问题",
        "图片风格保持克制，避免广告感过重",
      ],
    },
    {
      title: `${solution.name} explainer video`,
      format: "Video",
      aspectRatio: "16:9",
      placement: `方案页 Challenges / Approach 之后`,
      description: "用一段简短视频解释问题如何出现、Ciwi 如何介入，以及最终页面体验如何变化。",
      checklist: [
        "适合用前后对比或 3 步演示结构",
        "如果没有录屏，可先用静态页面滚动视频",
        "重点展示结果，不要拍成产品培训课",
      ],
    },
  ];
}

export function getCompareMediaBriefs(compare: CompareItem): MediaAssetBrief[] {
  return [
    {
      title: `${compare.title} comparison visual`,
      format: "Image",
      aspectRatio: "16:9",
      placement: `对比页 Hero: /compare/${compare.slug}`,
      description: "准备一张对比型视觉，最好能并排展示两种路径在界面、工作流或结果呈现上的差异。",
      checklist: [
        "左侧和右侧信息密度要接近，避免视觉偏置太明显",
        "更适合用真实界面拼图，而不是营销海报",
        "把用户真正会比较的点体现在画面里，比如术语控制、结构覆盖或工作流深度",
      ],
    },
  ];
}

export function getBlogMediaBriefs(post: BlogPost): MediaAssetBrief[] {
  return [
    {
      title: `${post.title} cover image`,
      format: "Image",
      aspectRatio: "16:9",
      placement: `博客详情页标题下方: ${post.href}`,
      description: "用一张文章题图强化主题，适合使用真实 Shopify 页面、运营场景截图或结构化信息图。",
      checklist: [
        "题图要服务文章主题，不要只放品牌 Logo",
        "尽量避免把大量文字写进图里",
        "如果文章偏方法论，信息图会比单纯产品截图更合适",
      ],
    },
  ];
}

export function getHelpDocMediaBriefs(doc: HelpCenterDoc): MediaAssetBrief[] {
  return [
    {
      title: `${doc.title} setup screenshot`,
      format: "Image",
      aspectRatio: "16:10",
      placement: `帮助文档正文前: ${doc.href}`,
      description: "准备一张带标注的关键截图，直接告诉用户这篇文档主要会操作哪个页面或设置项。",
      checklist: [
        "优先使用真实后台截图，并在关键按钮或字段上加标注",
        "如果步骤多，首图要先说明入口位置",
        "避免截取过大的整页，重点区域需要足够清晰",
      ],
    },
    {
      title: `${doc.title} quick tutorial video`,
      format: "Video",
      aspectRatio: "16:9",
      placement: `帮助文档侧栏或正文开头`,
      description: "如果这个问题经常需要解释操作顺序，补一段 15 到 30 秒的短教程视频会更直接。",
      checklist: [
        "只演示单一流程，不要在视频里塞多个问题",
        "最好录到关键点击和结果反馈",
        "可以不带配音，但关键步骤要清楚",
      ],
    },
  ];
}

export const blogIndexMediaBriefs: MediaAssetBrief[] = [
  {
    title: "Blog landing hero visual",
    format: "Image",
    aspectRatio: "16:9",
    placement: "博客列表页首屏",
    description: "适合使用一张内容编辑、Shopify 运营或多语言页面管理相关的品牌图，强化“内容与增长”主题。",
    checklist: [
      "图片要更像内容品牌，而不是单一产品广告",
      "可以使用真实工作流或界面拼贴",
      "色调保持与官网整体一致",
    ],
  },
];

export const helpCenterIndexMediaBriefs: MediaAssetBrief[] = [
  {
    title: "Help center landing visual",
    format: "Image",
    aspectRatio: "16:9",
    placement: "帮助中心列表页首屏",
    description: "准备一张支持中心风格的界面图或带标注的产品截图，体现“安装、配置、使用支持”这一类内容。",
    checklist: [
      "适合用产品后台截图加标注",
      "重点体现导航、设置入口或关键模块",
      "不要做过于花哨的营销构图",
    ],
  },
];

export const demoPageMediaBriefs: MediaAssetBrief[] = [
  {
    title: "Demo center master video",
    format: "Video",
    aspectRatio: "16:9",
    placement: "Demo Center 首屏",
    description: "准备一段总览视频，快速概括 Translator、Glossary 和 Bundle 三类演示能力。",
    checklist: [
      "时长控制在 45 秒以内",
      "尽量一镜到底或少量切镜，减少理解负担",
      "每个场景都要有明确结果画面",
    ],
  },
];

export const aboutPageMediaBriefs: MediaAssetBrief[] = [
  {
    title: "About page brand image",
    format: "Image",
    aspectRatio: "4:3",
    placement: "About 页面正文后",
    description: "适合使用团队工作场景、产品讨论白板、设计稿或 Shopify 项目现场截图，强调方法论和团队判断力。",
    checklist: [
      "比起正式合影，更适合展示真实工作状态",
      "如暂无团队素材，可先用产品策略图或研究墙照片",
      "风格要专业，不要过于生活化",
    ],
  },
];

export const pricingPageMediaBriefs: MediaAssetBrief[] = [
  {
    title: "Pricing explainer graphic",
    format: "Image",
    aspectRatio: "16:9",
    placement: "Pricing 页面价格卡上方",
    description: "准备一张说明不同产品线收费逻辑的图，适合用表格、流程图或产品矩阵图呈现。",
    checklist: [
      "清楚区分订阅、credits 或服务型收费",
      "避免堆太多价格细节，重点放在计费方式理解",
      "可以作为后续正式 pricing 表的视觉引导",
    ],
  },
];

export const resourcesPageMediaBriefs: MediaAssetBrief[] = [
  {
    title: "Resources map visual",
    format: "Image",
    aspectRatio: "16:9",
    placement: "Resources 页面首屏",
    description: "准备一张资源地图型图片，展示 Blog、Help Center、Compare 如何共同服务产品理解和转化。",
    checklist: [
      "适合用信息架构图或内容流转图",
      "不要做成纯装饰图，最好能表达内容关系",
      "文字数量控制在少量标签级别",
    ],
  },
];
