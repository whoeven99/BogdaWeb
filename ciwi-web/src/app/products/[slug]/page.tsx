import {ArticleCard} from "@/components/cards/ArticleCard";
import {UseCasePlaybookCard} from "@/components/cards/UseCasePlaybookCard";
import {ProductControlSection} from "@/components/sections/ProductControlSection";
import {ProductDeepDiveSection} from "@/components/sections/ProductDeepDiveSection";
import {InteractiveDemoExplorer} from "@/components/sections/InteractiveDemoExplorer";
import {ProductDifferentiatorsSection} from "@/components/sections/ProductDifferentiatorsSection";
import {ProductFeatureSpotlightsSection} from "@/components/sections/ProductFeatureSpotlightsSection";
import {ProductFeatureHubSection} from "@/components/sections/ProductFeatureHubSection";
import {ProductHowItWorksSection} from "@/components/sections/ProductHowItWorksSection";
import {ProductProofSection} from "@/components/sections/ProductProofSection";
import {ProductSectionCta} from "@/components/sections/ProductSectionCta";
import {ProductUseCasesSection} from "@/components/sections/ProductUseCasesSection";
import {Button} from "@/components/ui/Button";
import {notFound} from "next/navigation";

import {FaqSection} from "@/components/sections/FaqSection";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getProductMap, products} from "@/content/products";
import {getProductPlaybookHref, getUseCasesByProduct} from "@/content/use-cases";
import {getRequestLocale} from "@/lib/i18n-server";
import {localizeLanguageSignalFields} from "@/lib/localized-language-signal";
import {buildPageMetadata, siteUrl, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildGraphSchema, buildProductSchema, buildWebPageSchema} from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

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
        {label: "使用流程", href: "#workflow"},
        {label: "适合谁", href: "#audience-fit"},
        {label: "典型场景", href: "#use-cases"},
        {label: "核心能力", href: "#features"},
        {label: "演示", href: "#demo"},
        {label: "为什么选它", href: "#compare"},
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
        useCases: {
          id: "use-cases",
          eyebrow: "典型场景",
          title: "这款产品适合解决什么问题",
          description: "围绕获客、转化与效率提升，整理这款产品最常见的使用场景。",
          audienceLabel: "适合对象",
          outcomeLabel: "预期结果",
        },
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
        workflow: {id: "workflow", eyebrow: "使用流程", title: "使用流程", description: "按实际操作顺序理解产品，更容易判断落地成本和使用门槛。"},
        proof: {id: "proof", eyebrow: "结果与证据", title: "先看这款产品最关键的结果信号", description: "先看覆盖范围、控制能力和持续运营层面的证据，再决定要不要继续深入。"},
        features: {id: "features", eyebrow: "核心能力", title: "核心能力", description: "围绕商家最常用、最直接影响结果的部分展开。"},
        control: {id: "control", eyebrow: "控制权", title: "自动化不是放手不管，你仍然保留关键控制权", description: "这块专门回答：哪些地方由系统推进，哪些地方仍然适合由团队确认和把关。"},
        deepDive: {id: "deep-dive", eyebrow: "深入理解", title: "把最关键的差异点单独拆开讲", description: "这里不再平铺功能，而是把真正影响长期使用价值的那一层单独展开。"},
        compare: {id: "compare", eyebrow: "为什么选它", title: "为什么选择这款产品", description: "把产品定位、长期价值和常见比较路径放在一起看，会更容易判断它是否适合你的当前阶段。"},
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
      {label: "Workflow", href: "#workflow"},
      {label: "Audience fit", href: "#audience-fit"},
      {label: "Use cases", href: "#use-cases"},
      {label: "Features", href: "#features"},
      {label: "Demo", href: "#demo"},
      {label: "Compare", href: "#compare"},
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
      useCases: {
        id: "use-cases",
        eyebrow: "Use cases",
        title: "Typical scenarios",
        description: "Start with the problems this product fits best.",
        audienceLabel: "Best for",
        outcomeLabel: "Expected outcome",
      },
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
      workflow: {id: "workflow", eyebrow: "Workflow", title: "How it works", description: "Understand the product in the same order merchants actually use it."},
      proof: {id: "proof", eyebrow: "Proof", title: "Start with the strongest outcome signals", description: "Look at the most important evidence around coverage, control, and ongoing operations before going deeper."},
      features: {id: "features", eyebrow: "Features", title: "Core capabilities", description: "Focus on the parts merchants use most and that affect outcomes most directly."},
      control: {id: "control", eyebrow: "Control", title: "Automation still works better when you keep the key decisions", description: "This section answers where the product helps move work forward and where teams still keep review and approval."},
      deepDive: {id: "deep-dive", eyebrow: "Deep dive", title: "Pull the most important difference out into its own section", description: "Instead of flattening everything into features, this section focuses on the layer that usually determines long-term fit."},
      compare: {id: "compare", eyebrow: "Compare", title: "Why this product may fit better", description: "Look at the product's operating model, long-term value, and comparison paths in one place before going deeper."},
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
  const rawProduct = getProductMap(locale)[slug];
  const product = rawProduct ? localizeLanguageSignalFields(locale, rawProduct) : rawProduct;
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
    title: product.seoTitle ?? product.name,
    description: product.seoDescription ?? product.heroDescription,
    path: `/products/${product.slug}`,
    locale,
  });
}

export default async function ProductDetailPage({params}: ProductDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const rawProduct = getProductMap(locale)[slug];
  const product = rawProduct ? localizeLanguageSignalFields(locale, rawProduct) : rawProduct;
  const copy = getProductDetailCopy(locale);

  if (!product) {
    notFound();
  }

  const pageUrl = toAbsoluteLocalizedUrl(locale, `/products/${product.slug}`);
  const productsIndexUrl = toAbsoluteLocalizedUrl(locale, "/products");
  const structuredData = buildGraphSchema([
    buildBreadcrumbSchema([
      {name: locale === "zh-cn" ? "首页" : "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "产品" : "Products", item: productsIndexUrl},
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
      image: product.icon ? toAbsoluteLocalizedUrl(locale, product.icon) : undefined,
      rating: product.rating,
      reviewCount: product.reviewCount,
      offers: product.ctaHref
        ? {
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: product.ctaHref,
          }
        : undefined,
    }),
    buildFaqSchema(product.faq),
  ]);
  const isTranslator = product.slug === "translator";
  const translatorCopy = isTranslator ? copy.translator : null;
  const linkedUseCases = localizeLanguageSignalFields(locale, getUseCasesByProduct(locale, product.slug));
  const hasLinkedUseCases = linkedUseCases.length > 0;
  const hasVideo = Boolean(product.videoUrl);
  const showInteractiveDemo = !hasVideo;
  const hasFeatureSpotlights = Boolean(product.featureModules?.length);
  const useFeatureSpotlightsAsPrimary = Boolean(isTranslator && hasFeatureSpotlights);
  const hasCompareSection = Boolean(product.differentiators?.length || product.compareLinks?.length);
  const compareCopy = isTranslator && translatorCopy ? translatorCopy.sections.comparisons : copy.sections.compare;
  const workflowSteps = product.howItWorks?.length
    ? product.howItWorks
    : product.workflow.map((step) => ({
        title: step,
        description: step,
      }));
  const featurePreviewItems = (product.featureModules?.length
    ? product.featureModules.map((item) => ({
        title: item.title,
        primaryLabel: item.primaryLabel,
        primaryText: item.primaryText,
        secondaryLabel: item.secondaryLabel,
        secondaryText: item.secondaryText,
        note: item.note,
        highlights: item.highlights,
      }))
    : product.demoScenarios.map((item) => ({
        title: item.title,
        primaryLabel: item.primaryLabel,
        primaryText: item.primaryText,
        secondaryLabel: item.secondaryLabel,
        secondaryText: item.secondaryText,
        note: item.note,
      })));
  const heroScenario = product.demoScenarios[0];
  const heroDemoHref = hasVideo ? "#hero-demo" : "#demo";
  const sectionCta = <ProductSectionCta href={product.ctaHref} label={product.ctaLabel} />;

  return (
    <main className="product-detail-page">
      <PageContainer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="content-hero-shell">
            <div className="product-hero">
              <div className="product-hero__copy">
                <SectionHeading
                  eyebrow={copy.hero.eyebrow}
                  title={product.heroTitle}
                  description={product.heroDescription}
                  as="h1"
                />
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button href={product.ctaHref}>{product.ctaLabel}</Button>
                  <Button href={heroDemoHref} variant="ghost">
                    {copy.hero.viewDemoLabel}
                  </Button>
                </div>
                <p className="product-hero__metrics">{product.metrics.join(" · ")}</p>
              </div>

              <div className="hero-brand-visual product-hero__visual" id="hero-demo">
                <div className="hero-brand-visual__device">
                  <div className="hero-brand-visual__device-bar">
                    <span className="hero-brand-visual__dot" />
                    <span className="hero-brand-visual__dot" />
                    <span className="hero-brand-visual__dot" />
                    <span className="hero-brand-visual__device-title">{heroScenario?.title ?? product.name}</span>
                  </div>
                  <div className="product-hero__device-body">
                    {hasVideo ? (
                      <div className="mdx-video">
                        <div className="mdx-video__frame">
                          <iframe
                            src={product.videoUrl}
                            title={`${product.name} ${locale === "zh-cn" ? "演示" : "demo"}`}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    ) : heroScenario ? (
                      <>
                        <div className="demo-stack">
                          <div className="demo-box">
                            <strong>{heroScenario.primaryLabel}</strong>
                            <p>{heroScenario.primaryText}</p>
                          </div>
                          <div className="demo-box demo-box--accent">
                            <strong>{heroScenario.secondaryLabel}</strong>
                            <p>{heroScenario.secondaryText}</p>
                          </div>
                        </div>
                        <p className="product-hero__device-note">{heroScenario.note}</p>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {product.proofPoints?.length ? (
          <ProductProofSection
            id={copy.sections.proof.id}
            eyebrow={copy.sections.proof.eyebrow}
            title={copy.sections.proof.title}
            description={undefined}
            items={product.proofPoints}
          />
        ) : null}

        <ProductHowItWorksSection
          id={copy.sections.workflow.id}
          eyebrow={copy.sections.workflow.eyebrow}
          title={copy.sections.workflow.title}
          description={copy.sections.workflow.description}
          steps={workflowSteps}
          cta={sectionCta}
        />

        {hasLinkedUseCases ? (
          <section className="page-section anchor-offset" id={copy.sections.useCases.id}>
            <SectionHeading
              eyebrow={copy.sections.useCases.eyebrow}
              title={copy.sections.useCases.title}
              description={undefined}
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
                  variant="landing"
                />
              ))}
            </div>
            {sectionCta}
          </section>
        ) : (
          <ProductUseCasesSection
            id={copy.sections.useCases.id}
            eyebrow={copy.sections.useCases.eyebrow}
            title={copy.sections.useCases.title}
            description={undefined}
            items={product.useCases}
            audienceLabel={copy.sections.useCases.audienceLabel}
            outcomeLabel={copy.sections.useCases.outcomeLabel}
            cta={sectionCta}
          />
        )}

        {useFeatureSpotlightsAsPrimary && translatorCopy ? (
          <ProductFeatureSpotlightsSection
            id={copy.sections.features.id}
            eyebrow={translatorCopy.sections.featureSpotlights.eyebrow}
            title={translatorCopy.sections.featureSpotlights.title}
            description={translatorCopy.sections.featureSpotlights.description}
            items={product.featureModules ?? []}
            cta={sectionCta}
          />
        ) : (
          <ProductFeatureHubSection
            id={copy.sections.features.id}
            eyebrow={copy.sections.features.eyebrow}
            title={copy.sections.features.title}
            description={undefined}
            items={product.features}
            previewItems={featurePreviewItems}
            cta={sectionCta}
          />
        )}

        {product.controlPoints?.length ? (
          <ProductControlSection
            id={copy.sections.control.id}
            eyebrow={copy.sections.control.eyebrow}
            title={copy.sections.control.title}
            description={undefined}
            items={product.controlPoints}
            cta={sectionCta}
          />
        ) : null}

        {showInteractiveDemo ? (
          <InteractiveDemoExplorer
            className="page-section product-demo-explorer"
            eyebrow={copy.sections.interactiveDemo.eyebrow}
            title={copy.sections.interactiveDemo.title}
            description={undefined}
            items={product.demoScenarios}
            cta={sectionCta}
          />
        ) : null}

        {product.deepDive ? (
          <ProductDeepDiveSection
            id={copy.sections.deepDive.id}
            eyebrow={product.deepDive.eyebrow ?? copy.sections.deepDive.eyebrow}
            title={product.deepDive.title}
            description={undefined}
            steps={product.deepDive.steps}
            outcomeTitle={product.deepDive.outcomeTitle}
            outcomeText={product.deepDive.outcomeText}
            cta={sectionCta}
          />
        ) : null}

        {hasCompareSection ? (
          <ProductDifferentiatorsSection
            id={compareCopy.id}
            eyebrow={compareCopy.eyebrow}
            title={compareCopy.title}
            description={undefined}
            items={product.differentiators}
            compareLinks={product.compareLinks}
            cta={sectionCta}
          />
        ) : null}

        <section className="page-section anchor-offset" id={copy.sections.resources.id}>
          <SectionHeading
            eyebrow={copy.sections.resources.eyebrow}
            title={copy.sections.resources.title}
            description={undefined}
          />
          <div className="resource-grid">
            {product.relatedResources.map((resource) => (
              <ArticleCard
                key={`${resource.title}-${resource.href}`}
                title={resource.title}
                description={product.shortDescription}
                href={resource.href}
                meta={resource.meta}
                variant="landing"
              />
            ))}
          </div>
        </section>

        <FaqSection id="faq" className="anchor-offset" items={product.faq} />
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
