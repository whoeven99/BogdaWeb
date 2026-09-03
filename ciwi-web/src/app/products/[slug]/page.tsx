import {ArticleCard} from "@/components/cards/ArticleCard";
import {DemoShowcaseSection} from "@/components/sections/DemoShowcaseSection";
import {InteractiveDemoExplorer} from "@/components/sections/InteractiveDemoExplorer";
import {ProductAnchorNav} from "@/components/sections/ProductAnchorNav";
import {ProductFeatureSpotlightsSection} from "@/components/sections/ProductFeatureSpotlightsSection";
import {Button} from "@/components/ui/Button";
import {notFound} from "next/navigation";

import {FaqSection} from "@/components/sections/FaqSection";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getProductMap, products} from "@/content/products";
import {localizeHref} from "@/lib/i18n";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema} from "@/lib/seo/schema";

type ProductDetailPageProps = {
  params: Promise<{slug: string}>;
};

function getProductDetailCopy(locale: "en" | "zh-cn") {
  if (locale === "zh-cn") {
    return {
      notFound: {
        title: "未找到产品",
        description: "你访问的产品页面不存在。",
        path: "/products",
      },
      hero: {
        eyebrow: "产品",
        viewDemoLabel: "查看演示",
        viewDemoHref: "/demo",
        panels: {
          targetUsersTitle: "适用商家",
          benefitsTitle: "核心收益",
          demoHighlightsTitle: "演示重点",
        },
      },
      anchors: [
        {label: "典型场景", href: "#use-cases"},
        {label: "演示", href: "#demo"},
        {label: "适合谁", href: "#audience-fit"},
        {label: "核心能力", href: "#features"},
        {label: "使用路径", href: "#workflow"},
        {label: "相关资源", href: "#resources"},
        {label: "FAQ", href: "#faq"},
      ],
      translator: {
        anchors: [
          {label: "典型场景", href: "#use-cases"},
          {label: "视频演示", href: "#video-demo"},
          {label: "功能总览", href: "#function-overview"},
          {label: "产品对比", href: "#compare"},
          {label: "相关资源", href: "#resources"},
          {label: "FAQ", href: "#faq"},
        ],
        sections: {
          featureSpotlights: {
            id: "function-overview",
            eyebrow: "功能总览",
            title: "关键功能介绍与快速预览",
            description: "先快速扫一遍关键能力，再决定要不要继续深入看帮助文档、对比页面或完整演示。",
          },
          comparisons: {
            id: "compare",
            eyebrow: "对比",
            title: "为什么选择 Ciwi",
            description: "我们的产品理念：始终和商家利益保持一致，为结果负责。",
          },
        },
      },
      sections: {
        useCases: {id: "use-cases", eyebrow: "典型场景", title: "我们解决什么问题", description: "我们围绕获客和转化率，打造高ROI 的产品方案"},
        video: {id: "video-demo", eyebrow: "视频演示", title: "先用视频快速看一遍产品体验", description: "通过一段真实演示，先快速理解产品界面、核心流程和关键能力。"},
        demoFocus: {id: "demo-focus", eyebrow: "演示重点", title: "先看关键演示点", description: "先看最容易影响判断的几个关键结果。"},
        interactiveDemo: {eyebrow: "交互演示", title: "交互演示", description: "通过场景切换快速看懂前后差异、术语控制和 Shopify 适配方式。"},
        livePreview: {eyebrow: "快速预览", title: "快速预览", description: "先快速扫一遍，再进入交互演示。"},
        audienceFit: {
          id: "audience-fit",
          eyebrow: "适合谁",
          title: "适合谁",
          description: "把适用对象和核心收益放在一起看，会更容易判断是否匹配。",
          targetUsersTitle: "适用商家",
          benefitsTitle: "核心收益",
        },
        features: {id: "features", eyebrow: "核心能力", title: "核心能力", description: "围绕商家最常用、最直接影响结果的部分展开。"},
        workflow: {id: "workflow", eyebrow: "使用路径", title: "使用路径", description: "按实际操作顺序理解产品。"},
        resources: {id: "resources", eyebrow: "相关资源", title: "相关资源", description: "从这里继续看文档、文章和对比内容。"},
      },
      finalCta: {
        secondaryLabel: "浏览资源",
        secondaryHref: "/resources",
      },
    };
  }

  return {
    notFound: {
      title: "Product not found",
      description: "The requested product page could not be found.",
      path: "/products",
    },
    hero: {
      eyebrow: "Product",
      viewDemoLabel: "View demo",
      viewDemoHref: "/demo",
      panels: {
        targetUsersTitle: "Target users",
        benefitsTitle: "Core benefits",
        demoHighlightsTitle: "Demo focus",
      },
    },
    anchors: [
      {label: "Use cases", href: "#use-cases"},
      {label: "Demo", href: "#demo"},
      {label: "Audience fit", href: "#audience-fit"},
      {label: "Features", href: "#features"},
      {label: "Workflow", href: "#workflow"},
      {label: "Resources", href: "#resources"},
      {label: "FAQ", href: "#faq"},
    ],
    translator: {
      anchors: [
        {label: "Use cases", href: "#use-cases"},
        {label: "Video", href: "#video-demo"},
        {label: "Functions", href: "#function-overview"},
        {label: "Compare", href: "#compare"},
        {label: "Resources", href: "#resources"},
        {label: "FAQ", href: "#faq"},
      ],
      sections: {
        featureSpotlights: {
          id: "function-overview",
          eyebrow: "Function overview",
          title: "Key capabilities and fast preview",
          description: "Scan the most important capabilities first, then decide whether to continue into docs, comparison pages, or a fuller demo.",
        },
        comparisons: {
          id: "compare",
          eyebrow: "Compare",
          title: "How it differs from other products",
          description: "If you are already comparing paths, jumping into the relevant compare pages will be faster.",
        },
      },
    },
    sections: {
      useCases: {id: "use-cases", eyebrow: "Use cases", title: "Typical scenarios", description: "Start with the problems this product fits best."},
      video: {id: "video-demo", eyebrow: "Video demo", title: "See the product in action first", description: "Use a short walkthrough to understand the interface, core flow, and key capabilities faster."},
      demoFocus: {id: "demo-focus", eyebrow: "Demo focus", title: "Start with the key demo points", description: "Look at the outcome differences that influence evaluation first."},
      interactiveDemo: {eyebrow: "Interactive demo", title: "Interactive demo", description: "Switch between scenarios to understand before / after differences, glossary control, and Shopify fit."},
      livePreview: {eyebrow: "Quick preview", title: "Quick preview", description: "Scan quickly first, then go deeper into the interactive demo."},
      audienceFit: {
        id: "audience-fit",
        eyebrow: "Audience fit",
        title: "Who this is for",
        description: "Looking at target users and benefits together makes fit easier to judge.",
        targetUsersTitle: "Target users",
        benefitsTitle: "Core benefits",
      },
      features: {id: "features", eyebrow: "Features", title: "Core capabilities", description: "Focus on the parts merchants use most and that affect outcomes most directly."},
      workflow: {id: "workflow", eyebrow: "Workflow", title: "Workflow", description: "Understand the product in the same order merchants actually use it."},
      resources: {id: "resources", eyebrow: "Related resources", title: "Related resources", description: "Continue into docs, articles, and comparison content from here."},
    },
    finalCta: {
      secondaryLabel: "Browse resources",
      secondaryHref: "/resources",
    },
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({slug: product.slug}));
}

export async function generateMetadata({params}: ProductDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const product = getProductMap(locale)[slug];
  const copy = getProductDetailCopy(locale);

  if (!product) {
    return buildPageMetadata({
      title: copy.notFound.title,
      description: copy.notFound.description,
      path: copy.notFound.path,
      locale,
    });
  }

  return buildPageMetadata({
    title: product.name,
    description: product.heroDescription,
    path: `/products/${product.slug}`,
    locale,
  });
}

export default async function ProductDetailPage({params}: ProductDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const product = getProductMap(locale)[slug];
  const copy = getProductDetailCopy(locale);

  if (!product) {
    notFound();
  }

  const pageUrl = new URL(localizeHref(locale, `/products/${product.slug}`), siteUrl).toString();
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "产品" : "Products", item: new URL(localizeHref(locale, "/products"), siteUrl).toString()},
      {name: product.name, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: product.name,
      description: product.heroDescription,
      keywords: [product.name, ...product.metrics],
    }),
    buildFaqSchema(product.faq),
  ];
  const isTranslator = product.slug === "translator";
  const translatorCopy = isTranslator ? copy.translator : null;
  const hasVideo = Boolean(product.videoUrl);
  let anchorItems = (isTranslator ? translatorCopy?.anchors : copy.anchors)?.map((item) => ({...item})) ?? [];
  if (hasVideo && !isTranslator) {
    anchorItems = [
      anchorItems[0],
      {label: copy.sections.video.eyebrow, href: `#${copy.sections.video.id}`},
      ...anchorItems.slice(1),
    ];
  }

  return (
    <main>
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`${product.slug}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}
        <section className="page-section page-hero">
          <div className={isTranslator ? "detail-grid detail-grid--single" : "detail-grid"}>
            <div>
              <SectionHeading
                eyebrow={copy.hero.eyebrow}
                title={product.heroTitle}
                description={product.heroDescription}
                as="h1"
              />
              <div className="tag-list">
                {product.metrics.map((metric) => (
                  <span key={metric} className="pill">
                    {metric}
                  </span>
                ))}
              </div>
              <div className="inline-list space-top-xl">
                <Button href={product.ctaHref}>{product.ctaLabel}</Button>
                <Button href={copy.hero.viewDemoHref} variant="secondary">
                  {copy.hero.viewDemoLabel}
                </Button>
              </div>
            </div>
            {!isTranslator ? (
              <div className="surface-card section-stack">
                <div>
                  <h3>{copy.hero.panels.targetUsersTitle}</h3>
                  <ul className="check-list">
                    {product.targetUsers.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>{copy.hero.panels.benefitsTitle}</h3>
                  <ul className="check-list">
                    {product.benefits.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>{copy.hero.panels.demoHighlightsTitle}</h3>
                  <div className="tag-list">
                    {product.demoHighlights.map((item) => (
                      <span key={item} className="pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <ProductAnchorNav items={anchorItems} />

        <section className="page-section anchor-offset" id={copy.sections.useCases.id}>
          <SectionHeading
            eyebrow={copy.sections.useCases.eyebrow}
            title={copy.sections.useCases.title}
            description={copy.sections.useCases.description}
          />
          <div className="card-grid">
            {product.useCases.map((useCase) => (
              <article key={useCase.title} className="surface-card">
                <h3>{useCase.title}</h3>
                <p className="quote">{useCase.description}</p>
              </article>
            ))}
          </div>
        </section>

        {hasVideo ? (
          <section className="page-section anchor-offset" id={copy.sections.video.id}>
            <SectionHeading
              eyebrow={copy.sections.video.eyebrow}
              title={copy.sections.video.title}
              description={copy.sections.video.description}
            />
            <div className="surface-card section-stack">
              <div className="mdx-video">
                <div className="mdx-video__frame">
                  <iframe
                    src={product.videoUrl}
                    title={`${product.name} video demo`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {isTranslator && translatorCopy ? (
          <>
            <div id="models" className="anchor-offset" />
            <div id="engines" className="anchor-offset" />
            <div id="glossary" className="anchor-offset" />
            <div id="languages" className="anchor-offset" />
            <div id="localization" className="anchor-offset" />
            <ProductFeatureSpotlightsSection
              id={translatorCopy.sections.featureSpotlights.id}
              eyebrow={translatorCopy.sections.featureSpotlights.eyebrow}
              title={translatorCopy.sections.featureSpotlights.title}
              description={translatorCopy.sections.featureSpotlights.description}
              items={product.featureModules ?? []}
            />
            <section className="page-section anchor-offset" id={translatorCopy.sections.comparisons.id}>
              <SectionHeading
                eyebrow={translatorCopy.sections.comparisons.eyebrow}
                title={translatorCopy.sections.comparisons.title}
                description={translatorCopy.sections.comparisons.description}
              />
              <div className="resource-grid">
                {product.compareLinks?.map((item) => (
                  <ArticleCard
                    key={item.href}
                    title={item.title}
                    description={item.description}
                    href={item.href}
                    meta={item.meta}
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="page-section anchor-offset" id={copy.sections.demoFocus.id}>
              <SectionHeading
                eyebrow={copy.sections.demoFocus.eyebrow}
                title={copy.sections.demoFocus.title}
                description={copy.sections.demoFocus.description}
              />
              <div className="card-grid">
                {product.demoHighlights.map((item, index) => (
                  <article key={item} className="surface-card">
                    <h3>{`0${index + 1}`}</h3>
                    <p className="quote">{item}</p>
                  </article>
                ))}
              </div>
            </section>

            <InteractiveDemoExplorer
              eyebrow={copy.sections.interactiveDemo.eyebrow}
              title={copy.sections.interactiveDemo.title}
              description={copy.sections.interactiveDemo.description}
              items={product.demoScenarios}
            />

            <DemoShowcaseSection
              eyebrow={copy.sections.livePreview.eyebrow}
              title={copy.sections.livePreview.title}
              description={copy.sections.livePreview.description}
              items={product.demoScenarios.slice(0, 2)}
            />

            <section className="page-section anchor-offset" id={copy.sections.audienceFit.id}>
              <SectionHeading
                eyebrow={copy.sections.audienceFit.eyebrow}
                title={copy.sections.audienceFit.title}
                description={copy.sections.audienceFit.description}
              />
              <div className="detail-grid">
                <div className="surface-card">
                  <h3>{copy.sections.audienceFit.targetUsersTitle}</h3>
                  <ul>
                    {product.targetUsers.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="surface-card">
                  <h3>{copy.sections.audienceFit.benefitsTitle}</h3>
                  <ul>
                    {product.benefits.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="page-section anchor-offset" id={copy.sections.features.id}>
              <SectionHeading
                eyebrow={copy.sections.features.eyebrow}
                title={copy.sections.features.title}
                description={copy.sections.features.description}
              />
              <div className="card-grid">
                {product.features.map((feature) => (
                  <article key={feature.title} className="feature-card">
                    <h3>{feature.title}</h3>
                    <p className="quote">{feature.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="page-section anchor-offset" id={copy.sections.workflow.id}>
              <SectionHeading
                eyebrow={copy.sections.workflow.eyebrow}
                title={copy.sections.workflow.title}
                description={copy.sections.workflow.description}
              />
              <div className="card-grid">
                {product.workflow.map((step, index) => (
                  <article key={step} className="surface-card">
                    <h3>{`0${index + 1}`}</h3>
                    <p className="quote">{step}</p>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        <section className="page-section anchor-offset" id={copy.sections.resources.id}>
          <SectionHeading
            eyebrow={copy.sections.resources.eyebrow}
            title={copy.sections.resources.title}
            description={copy.sections.resources.description}
          />
          <div className="resource-grid">
            {product.relatedResources.map((resource) => (
              <ArticleCard
                key={`${resource.title}-${resource.href}`}
                title={resource.title}
                description={product.shortDescription}
                href={resource.href}
                meta={resource.meta}
              />
            ))}
          </div>
        </section>

        <div id="faq" className="anchor-offset" />
        <FaqSection items={product.faq} />
        <FinalCtaSection
          title={locale === "zh-cn" ? `了解 ${product.name}` : `Explore ${product.name}`}
          description={product.shortDescription}
          primaryLabel={product.ctaLabel}
          primaryHref={product.ctaHref}
          secondaryLabel={copy.finalCta.secondaryLabel}
          secondaryHref={copy.finalCta.secondaryHref}
        />
      </PageContainer>
    </main>
  );
}
