import Image from "next/image";

import {SectionHeading} from "@/components/ui/SectionHeading";
import type {MediaAssetBrief} from "@/content/media-briefs";

type MediaPlaceholderSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  items: MediaAssetBrief[];
  compact?: boolean;
};

type ShowcasePreset = {
  badge: string;
  summary: string;
  highlights: string[];
  main: {
    src: string;
    alt: string;
  };
  secondary: {
    src: string;
    alt: string;
  }[];
};

function normalizeHeadingTitle(title: string) {
  return title
    .replaceAll("主素材预留", "主视觉展示")
    .replaceAll("素材预留", "素材展示")
    .replaceAll("视觉预留", "视觉展示")
    .replaceAll("说明图预留", "说明图展示")
    .replaceAll("预留", "展示");
}

function normalizeHeadingDescription(description: string) {
  return description
    .replaceAll("建议补", "补充")
    .replaceAll("适合补", "补充")
    .replaceAll("最适合放", "适合展示")
    .replaceAll("更适合放", "更适合展示")
    .replaceAll("适合放", "适合展示")
    .replaceAll("这里建议", "这里直接")
    .replaceAll("帮助用户快速判断入口", "帮助用户快速理解核心场景")
    .replaceAll("让操作入口更直观", "让核心操作路径更直观")
    .replaceAll("让 Blog、Help Center、Compare 的关系更直观", "让内容关系和访问路径更清晰")
    .replaceAll("先建立内容气质，再进入文章列表", "先建立内容感知，再进入文章列表");
}

function normalizeItemDescription(description: string) {
  return description
    .replaceAll("准备一张", "展示一张")
    .replaceAll("准备一段", "展示一段")
    .replaceAll("适合使用", "通过")
    .replaceAll("适合补一张", "展示一张")
    .replaceAll("适合补", "展示")
    .replaceAll("建议在正文前补一张主题图", "在正文前展示主题图")
    .replaceAll("建议同时准备", "这里同时展示")
    .replaceAll("建议放", "展示")
    .replaceAll("准备一段 20 到 40 秒的短视频，快速展示", "通过短视频快速呈现")
    .replaceAll("准备一段总览视频，快速概括", "通过总览视频快速概括")
    .replaceAll("准备一张", "用一张")
    .replaceAll("展示一张", "用一张")
    .replaceAll("展示一段", "用一段");
}

function getShowcasePreset(item: MediaAssetBrief, index: number): ShowcasePreset {
  const text = `${item.title} ${item.placement} ${item.description}`.toLowerCase();
  const isVideo = item.format === "Video";

  if (/pricing|credit|quota|refund|buy credits/.test(text)) {
    return {
      badge: isVideo ? "Pricing walkthrough" : "Credits overview",
      summary: "用真实后台界面呈现 credits、配额和购买方式，让计费逻辑一眼可读。",
      highlights: ["Credits usage", "Purchase tiers", "Pricing clarity"],
      main: {
        src: "/help-center/assets/images/image-41-1024x508-44cad0129e424014aed54ee5a962b9c4.png",
        alt: "Credits and pricing view inside Shopify app",
      },
      secondary: [
        {
          src: "/help-center/assets/images/image-24-1024x353-7ad870dd20ef8534b1e93b4e2e4231a4.png",
          alt: "Translation settings and API key configuration",
        },
        {
          src: "/feature/feature-4.png",
          alt: "Growth visual",
        },
      ],
    };
  }

  if (/api key|model|google cloud|translation settings/.test(text)) {
    return {
      badge: isVideo ? "Model setup flow" : "Model settings",
      summary: "直接展示模型与 API key 配置界面，让关键设置路径更直观。",
      highlights: ["Custom API key", "Quota setup", "Model workflow"],
      main: {
        src: "/help-center/assets/images/image-24-1024x353-7ad870dd20ef8534b1e93b4e2e4231a4.png",
        alt: "Translation settings with API key configuration",
      },
      secondary: [
        {
          src: "/help-center/assets/images/image-32-1024x484-ab043cc4334f544e47960898e24cbb0a.png",
          alt: "Translation management view",
        },
        {
          src: "/feature/feature-1.png",
          alt: "AI model ecosystem graphic",
        },
      ],
    };
  }

  if (/switcher|theme|header|footer|geolocation|currency/.test(text)) {
    return {
      badge: isVideo ? "Storefront walkthrough" : "Theme integration",
      summary: "把 Theme Editor、前台切换器和语言货币体验直接呈现出来，更容易判断实际效果。",
      highlights: ["Theme embed", "Switcher placement", "Storefront localization"],
      main: {
        src: "/help-center/assets/images/image-39-1024x484-199851b9146b9d40442c609beacc3615.png",
        alt: "Theme embed and storefront localization preview",
      },
      secondary: [
        {
          src: "/help-center/assets/images/image-25-1024x485-a299e79a71a705ed48147730cdb1b513.png",
          alt: "Language list in Shopify admin",
        },
        {
          src: "/shopify.png",
          alt: "Shopify logo",
        },
      ],
    };
  }

  if (/compare/.test(text)) {
    return {
      badge: isVideo ? "Compare walkthrough" : "Comparison visual",
      summary: "用并排的真实界面和能力标签呈现差异，让对比页先建立判断框架。",
      highlights: ["Workflow depth", "Theme coverage", "Merchant fit"],
      main: {
        src: "/help-center/assets/images/image-32-1024x484-ab043cc4334f544e47960898e24cbb0a.png",
        alt: "Translation management overview",
      },
      secondary: [
        {
          src: "/help-center/assets/images/image-39-1024x484-199851b9146b9d40442c609beacc3615.png",
          alt: "Storefront switcher screenshot",
        },
        {
          src: "/feature/feature-3.png",
          alt: "Shopify partners graphic",
        },
      ],
    };
  }

  if (/blog|seo|content|resources/.test(text)) {
    return {
      badge: isVideo ? "Content walkthrough" : "Content visual",
      summary: "用内容与增长相关视觉结合产品截图，让内容型页面更接近正式站点状态。",
      highlights: ["SEO content", "Resource map", "Growth narrative"],
      main: {
        src: "/feature/feature-5.png",
        alt: "SEO and growth illustration",
      },
      secondary: [
        {
          src: "/ai-generate-landscape-image-spark.svg",
          alt: "AI content generation icon",
        },
        {
          src: "/help-center/assets/images/image-32-1024x484-ab043cc4334f544e47960898e24cbb0a.png",
          alt: "Translation management screenshot",
        },
      ],
    };
  }

  if (/about|brand|team/.test(text)) {
    return {
      badge: isVideo ? "Brand story" : "Brand visual",
      summary: "用现有品牌资产、Shopify 生态标识和产品界面组合出更可信的品牌展示。",
      highlights: ["Brand trust", "Shopify focus", "Product context"],
      main: {
        src: "/feature/feature-3.png",
        alt: "Shopify partners graphic",
      },
      secondary: [
        {
          src: "/20250813-132858.png",
          alt: "Built for Shopify badge",
        },
        {
          src: "/logo-150.png",
          alt: "Ciwi logo",
        },
      ],
    };
  }

  if (/solution|scenario/.test(text)) {
    return {
      badge: isVideo ? "Scenario walkthrough" : "Scenario visual",
      summary: "把翻译、前台切换和增长场景组合到一个区块里，让方案页更像真实解决路径。",
      highlights: ["Localized flow", "Storefront touchpoints", "Outcome framing"],
      main: {
        src: "/help-center/assets/images/image-39-1024x484-199851b9146b9d40442c609beacc3615.png",
        alt: "Storefront localization screenshot",
      },
      secondary: [
        {
          src: "/help-center/assets/images/image-30-1024x483-bca184999f086a339ace9b093b68bed9.png",
          alt: "Language management screenshot",
        },
        {
          src: "/feature/feature-4.png",
          alt: "Growth chart illustration",
        },
      ],
    };
  }

  if (/bundle|aov|upsell|discount/.test(text)) {
    return {
      badge: isVideo ? "Bundle walkthrough" : "Growth visual",
      summary: "用增长类图形和真实后台界面结合，把 AOV 与套餐逻辑的收益感直接呈现出来。",
      highlights: ["Bundle logic", "AOV growth", "Offer clarity"],
      main: {
        src: "/feature/feature-4.png",
        alt: "Growth chart",
      },
      secondary: [
        {
          src: "/help-center/assets/images/image-41-1024x508-44cad0129e424014aed54ee5a962b9c4.png",
          alt: "Credits pricing page",
        },
        {
          src: "/subscriptions-created-outlined.svg",
          alt: "Bundle icon",
        },
      ],
    };
  }

  if (/demo/.test(text) || isVideo) {
    return {
      badge: "Video preview",
      summary: "用真实后台录屏截图做视频封面，让 Demo 区先具备完整画面感。",
      highlights: ["Flow preview", "Before and after", "Live product view"],
      main: {
        src: "/help-center/assets/images/image-32-1024x484-ab043cc4334f544e47960898e24cbb0a.png",
        alt: "Translation management overview",
      },
      secondary: [
        {
          src: "/help-center/assets/images/image-30-1024x483-bca184999f086a339ace9b093b68bed9.png",
          alt: "Language settings overview",
        },
        {
          src: "/help-center/assets/images/image-39-1024x484-199851b9146b9d40442c609beacc3615.png",
          alt: "Theme embed screenshot",
        },
      ],
    };
  }

  const productPresetPool: ShowcasePreset[] = [
    {
      badge: "Product visual",
      summary: "用真实产品截图做主视觉，让用户先看到 Shopify 场景里的界面形态和关键操作路径。",
      highlights: ["Product UI", "Localization workflow", "Shopify fit"],
      main: {
        src: "/help-center/assets/images/image-30-1024x483-bca184999f086a339ace9b093b68bed9.png",
        alt: "Language management inside Shopify admin",
      },
      secondary: [
        {
          src: "/help-center/assets/images/image-39-1024x484-199851b9146b9d40442c609beacc3615.png",
          alt: "Theme embed screenshot",
        },
        {
          src: "/help-center/assets/images/image-41-1024x508-44cad0129e424014aed54ee5a962b9c4.png",
          alt: "Credits page screenshot",
        },
      ],
    },
    {
      badge: "Feature visual",
      summary: "把真实后台界面和品牌能力标签一起呈现，让产品列表或详情页更容易形成整体理解。",
      highlights: ["Coverage depth", "Brand control", "Operational flow"],
      main: {
        src: "/help-center/assets/images/image-32-1024x484-ab043cc4334f544e47960898e24cbb0a.png",
        alt: "Manage translation page",
      },
      secondary: [
        {
          src: "/feature/feature-2.png",
          alt: "Voice and keywords graphic",
        },
        {
          src: "/help-center/assets/images/image-31-1024x484-74174fec40a40dd40a54103fab72f597.png",
          alt: "Selected languages screenshot",
        },
      ],
    },
  ];

  return productPresetPool[index % productPresetPool.length];
}

export function MediaPlaceholderSection({
  eyebrow = "Media placeholder",
  title,
  description,
  items,
  compact = false,
}: MediaPlaceholderSectionProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className={`page-section ${compact ? "page-section--compact" : ""}`}>
      <SectionHeading
        eyebrow={eyebrow}
        title={normalizeHeadingTitle(title)}
        description={normalizeHeadingDescription(description)}
      />
      <div className={`media-showcase-grid ${compact ? "media-showcase-grid--compact" : ""}`}>
        {items.map((item, index) => {
          const preset = getShowcasePreset(item, index);

          return (
            <article key={`${item.placement}-${item.title}`} className="media-showcase-card">
              <div className="media-showcase-card__frame">
                <div className="media-showcase-card__toolbar">
                  <span className="media-showcase-card__label">{preset.badge}</span>
                  <span className="media-showcase-card__ratio">{item.aspectRatio}</span>
                </div>
                <div className="media-showcase-card__visual">
                  <div className="media-showcase-card__main">
                    <Image
                      src={preset.main.src}
                      alt={preset.main.alt}
                      width={1024}
                      height={640}
                      className="media-showcase-card__image"
                    />
                    {item.format === "Video" ? (
                      <span className="media-showcase-card__play">Watch walkthrough</span>
                    ) : null}
                  </div>
                  <div className="media-showcase-card__rail">
                    {preset.secondary.map((asset) => (
                      <div key={`${item.title}-${asset.src}`} className="media-showcase-card__thumb">
                        <Image
                          src={asset.src}
                          alt={asset.alt}
                          width={320}
                          height={220}
                          className="media-showcase-card__image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="section-stack">
                <div>
                  <div className="media-showcase-card__meta">
                    <strong>Placement</strong>
                    <p>{item.placement}</p>
                  </div>
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p className="quote">{normalizeItemDescription(item.description)}</p>
                  <p className="quote media-showcase-card__summary">{preset.summary}</p>
                </div>
                <div className="media-showcase-card__chips">
                  {preset.highlights.map((entry) => (
                    <span key={entry} className="pill">
                      {entry}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
