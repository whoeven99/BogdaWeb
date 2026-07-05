import {ArticleCard} from "@/components/cards/ArticleCard";
import {DemoShowcaseSection} from "@/components/sections/DemoShowcaseSection";
import {InteractiveDemoExplorer} from "@/components/sections/InteractiveDemoExplorer";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {ProductAnchorNav} from "@/components/sections/ProductAnchorNav";
import {Button} from "@/components/ui/Button";
import {notFound} from "next/navigation";

import {FaqSection} from "@/components/sections/FaqSection";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getProductDemoMediaBriefs, getProductHeroMediaBriefs} from "@/content/media-briefs";
import {productMap, products} from "@/content/products";
import {buildPageMetadata} from "@/lib/seo/metadata";

type ProductDetailPageProps = {
  params: Promise<{slug: string}>;
};

export async function generateStaticParams() {
  return products.map((product) => ({slug: product.slug}));
}

export async function generateMetadata({params}: ProductDetailPageProps) {
  const {slug} = await params;
  const product = productMap[slug];

  if (!product) {
    return buildPageMetadata({
      title: "Product not found",
      description: "The requested product page could not be found.",
      path: "/products",
    });
  }

  return buildPageMetadata({
    title: product.name,
    description: product.heroDescription,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductDetailPage({params}: ProductDetailPageProps) {
  const {slug} = await params;
  const product = productMap[slug];

  if (!product) {
    notFound();
  }

  const anchorItems = [
    {label: "Use cases", href: "#use-cases"},
    {label: "Demo", href: "#demo"},
    {label: "Audience fit", href: "#audience-fit"},
    {label: "Features", href: "#features"},
    {label: "Workflow", href: "#workflow"},
    {label: "Resources", href: "#resources"},
    {label: "FAQ", href: "#faq"},
  ];
  const heroMediaBriefs = getProductHeroMediaBriefs(product);
  const demoMediaBriefs = getProductDemoMediaBriefs(product);

  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero">
          <div className="detail-grid">
            <div>
              <SectionHeading
                eyebrow="Product"
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
                <Button href="/demo" variant="secondary">
                  View demo
                </Button>
              </div>
            </div>
            <div className="surface-card section-stack">
              <div>
                <h3>适用商家</h3>
                <ul className="check-list">
                  {product.targetUsers.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>核心收益</h3>
                <ul className="check-list">
                  {product.benefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>演示重点</h3>
                <div className="tag-list">
                  {product.demoHighlights.map((item) => (
                    <span key={item} className="pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <MediaPlaceholderSection
          eyebrow="Product media"
          title="产品主视觉预留"
          description="这里建议补真实产品图，而不是继续依赖文字解释产品界面。"
          items={heroMediaBriefs}
        />

        <ProductAnchorNav items={anchorItems} />

        <section className="page-section anchor-offset" id="use-cases">
          <SectionHeading
            eyebrow="Use cases"
            title="典型场景"
            description="先看产品最适合解决什么问题。"
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

        <section className="page-section anchor-offset" id="demo-focus">
          <SectionHeading
            eyebrow="Demo focus"
            title="先看关键演示点"
            description="聚焦最能说明产品价值的几个环节。"
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
          eyebrow="Interactive demo"
          title="交互演示"
          description="通过场景切换快速看懂前后差异、术语控制和 Shopify 适配方式。"
          items={product.demoScenarios}
        />

        <DemoShowcaseSection
          eyebrow="Live preview"
          title="快速预览"
          description="先快速扫一遍，再进入交互演示。"
          items={product.demoScenarios.slice(0, 2)}
        />

        <MediaPlaceholderSection
          eyebrow="Demo media"
          title="产品演示素材预留"
          description="产品页更适合放一段真实录屏或核心结果图，帮助用户快速判断是否值得继续看。"
          items={demoMediaBriefs}
        />

        <section className="page-section anchor-offset" id="audience-fit">
          <SectionHeading
            eyebrow="Audience fit"
            title="适合谁，以及为什么"
            description="把对象、收益和落地路径放在一起看。"
          />
          <div className="detail-grid">
            <div className="surface-card">
              <h3>适用商家</h3>
              <ul>
                {product.targetUsers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="surface-card">
              <h3>核心收益</h3>
              <ul>
                {product.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="page-section anchor-offset" id="features">
          {product.slug === "translator" ? <div id="models" className="anchor-offset" /> : null}
          {product.slug === "translator" ? <div id="engines" className="anchor-offset" /> : null}
          {product.slug === "translator" ? <div id="glossary" className="anchor-offset" /> : null}
          {product.slug === "translator" ? <div id="languages" className="anchor-offset" /> : null}
          {product.slug === "translator" ? <div id="localization" className="anchor-offset" /> : null}
          <SectionHeading
            eyebrow="Features"
            title="核心能力"
            description="围绕商家真正会用到的部分展开。"
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

        <section className="page-section anchor-offset" id="workflow">
          <SectionHeading
            eyebrow="Workflow"
            title="使用路径"
            description="按实际操作顺序理解产品。"
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

        <section className="page-section anchor-offset" id="resources">
          <SectionHeading
            eyebrow="Related resources"
            title="相关资源"
            description="从这里继续看文档、文章和对比内容。"
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
          title={`Explore ${product.name}`}
          description={product.shortDescription}
          primaryLabel={product.ctaLabel}
          primaryHref={product.ctaHref}
          secondaryLabel="Browse resources"
          secondaryHref="/resources"
        />
      </PageContainer>
    </main>
  );
}
