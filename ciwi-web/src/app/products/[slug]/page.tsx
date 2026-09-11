import {ArticleCard} from "@/components/cards/ArticleCard";
import {UseCasePlaybookCard} from "@/components/cards/UseCasePlaybookCard";
import {DemoShowcaseSection} from "@/components/sections/DemoShowcaseSection";
import {InteractiveDemoExplorer} from "@/components/sections/InteractiveDemoExplorer";
import {ChecklistCardGrid} from "@/components/sections/ChecklistCardGrid";
import {NumberedCardGridSection} from "@/components/sections/NumberedCardGridSection";
import {ProductAnchorNav} from "@/components/sections/ProductAnchorNav";
import {ProductFeatureSpotlightsSection} from "@/components/sections/ProductFeatureSpotlightsSection";
import {SimpleCardGridSection} from "@/components/sections/SimpleCardGridSection";
import {StackedInfoPanel} from "@/components/sections/StackedInfoPanel";
import {Button} from "@/components/ui/Button";
import {notFound} from "next/navigation";

import {FaqSection} from "@/components/sections/FaqSection";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getProductMap, products} from "@/content/products";
import {getProductPlaybookHref, getUseCasesByProduct} from "@/content/use-cases";
import {localizeHref} from "@/lib/i18n";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildProductSchema, buildWebPageSchema} from "@/lib/seo/schema";

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
        playbookLabel: "查看产品方案集",
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
        {label: "使用流程", href: "#workflow"},
        {label: "相关资源", href: "#resources"},
        {label: "常见问题", href: "#faq"},
      ],
      translator: {
        anchors: [
          {label: "典型场景", href: "#use-cases"},
          {label: "视频演示", href: "#video-demo"},
          {label: "功能总览", href: "#function-overview"},
          {label: "产品对比", href: "#compare"},
          {label: "相关资源", href: "#resources"},
          {label: "常见问题", href: "#faq"},
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
        useCases: {id: "use-cases", eyebrow: "典型场景", title: "这款产品适合解决什么问题", description: "围绕获客、转化与效率提升，整理这款产品最常见的使用场景。"},
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
        workflow: {id: "workflow", eyebrow: "使用流程", title: "使用流程", description: "按实际操作顺序理解产品，更容易判断落地成本和使用门槛。"},
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
      playbookLabel: "Open use case playbook",
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
    buildProductSchema({
      url: pageUrl,
      name: product.name,
      description: product.heroDescription,
      rating: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      reviews: (product.reviewSnippets ?? []).map((snippet) => ({
        reviewBody: snippet,
        ratingValue: product.rating ?? 5,
      })),
    }),
    buildFaqSchema(product.faq),
  ];
  const isTranslator = product.slug === "translator";
  const translatorCopy = isTranslator ? copy.translator : null;
  const linkedUseCases = getUseCasesByProduct(locale, product.slug);
  const hasLinkedUseCases = linkedUseCases.length > 0;
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
        <section className="py-12 sm:py-16 lg:py-20">
          <div
            className={[
              "content-hero-shell",
              isTranslator ? "" : "",
            ].join(" ")}
          >
            <div className={isTranslator ? "grid gap-8" : "grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-start"}>
              <div>
              <SectionHeading
                eyebrow={copy.hero.eyebrow}
                title={product.heroTitle}
                description={product.heroDescription}
                as="h1"
              />
              <div className="mt-6 flex flex-wrap gap-2">
                {product.metrics.map((metric) => (
                  <span key={metric} className="pill">
                    {metric}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={product.ctaHref}>{product.ctaLabel}</Button>
                {hasLinkedUseCases ? (
                  <Button href={getProductPlaybookHref(product.slug)} variant="secondary">
                    {copy.hero.playbookLabel}
                  </Button>
                ) : null}
                <Button href={copy.hero.viewDemoHref} variant="ghost">
                  {copy.hero.viewDemoLabel}
                </Button>
              </div>
              </div>
              {!isTranslator ? (
                <StackedInfoPanel
                  sections={[
                    {
                      title: copy.hero.panels.targetUsersTitle,
                      items: product.targetUsers,
                      listVariant: "boxed",
                    },
                    {
                      title: copy.hero.panels.benefitsTitle,
                      items: product.benefits,
                      listVariant: "boxed",
                    },
                    {
                      title: copy.hero.panels.demoHighlightsTitle,
                      chips: product.demoHighlights,
                    },
                  ]}
                />
              ) : null}
            </div>
          </div>
        </section>

        <ProductAnchorNav items={anchorItems} />

        {hasLinkedUseCases ? (
          <section className="page-section anchor-offset" id={copy.sections.useCases.id}>
            <SectionHeading
              eyebrow={copy.sections.useCases.eyebrow}
              title={copy.sections.useCases.title}
              description={copy.sections.useCases.description}
              action={
                <Button href={getProductPlaybookHref(product.slug)} variant="secondary">
                  {locale === "zh-cn" ? "打开产品方案集" : "Open product playbook"}
                </Button>
              }
            />
            <div className="playbook-grid">
              {linkedUseCases.map((useCase) => (
                <UseCasePlaybookCard
                  key={useCase.slug}
                  title={useCase.title}
                  description={useCase.description}
                  href={`/use-cases/${useCase.slug}`}
                  icon={product.icon}
                  productName={product.name}
                  eyebrow={useCase.category}
                  meta={[locale === "zh-cn" ? "应用场景" : "Use Case", useCase.category]}
                  linkLabel={locale === "zh-cn" ? "查看场景详情" : "Open use case"}
                />
              ))}
            </div>
          </section>
        ) : (
          <SimpleCardGridSection
            id={copy.sections.useCases.id}
            className="page-section anchor-offset"
            eyebrow={copy.sections.useCases.eyebrow}
            title={copy.sections.useCases.title}
            description={copy.sections.useCases.description}
            items={product.useCases.map((useCase) => ({
              title: useCase.title,
              description: useCase.description,
            }))}
          />
        )}

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
            <NumberedCardGridSection
              id={copy.sections.demoFocus.id}
              className="page-section anchor-offset"
              eyebrow={copy.sections.demoFocus.eyebrow}
              title={copy.sections.demoFocus.title}
              description={copy.sections.demoFocus.description}
              items={product.demoHighlights.map((item) => ({description: item}))}
            />

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
              <ChecklistCardGrid
                cards={[
                  {title: copy.sections.audienceFit.targetUsersTitle, items: product.targetUsers},
                  {title: copy.sections.audienceFit.benefitsTitle, items: product.benefits},
                ]}
              />
            </section>

            <SimpleCardGridSection
              id={copy.sections.features.id}
              className="page-section anchor-offset"
              eyebrow={copy.sections.features.eyebrow}
              title={copy.sections.features.title}
              description={copy.sections.features.description}
              items={product.features.map((feature) => ({
                title: feature.title,
                description: feature.description,
              }))}
            />

            <NumberedCardGridSection
              id={copy.sections.workflow.id}
              className="page-section anchor-offset"
              eyebrow={copy.sections.workflow.eyebrow}
              title={copy.sections.workflow.title}
              description={copy.sections.workflow.description}
              items={product.workflow.map((step) => ({description: step}))}
            />
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
          title={locale === "zh-cn" ? `进一步了解 ${product.name}` : `Explore ${product.name}`}
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
