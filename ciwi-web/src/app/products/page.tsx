import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {ProductMatrixSection} from "@/components/sections/ProductMatrixSection";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {PageContainer} from "@/components/ui/PageContainer";
import {getProducts} from "@/content/products";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = await getRequestLocale();

  return buildPageMetadata({
    title: locale === "zh-cn" ? "Ciwi 产品" : "Ciwi Products",
    description:
      locale === "zh-cn"
        ? "围绕 Shopify 商家真实经营问题打造的 AI 产品组合。"
        : "An AI product lineup built around real operating problems for Shopify merchants.",
    path: "/products",
    locale,
  });
}

export default async function ProductsPage() {
  const locale = await getRequestLocale();
  const products = getProducts(locale);
  const copy =
    locale === "zh-cn"
      ? {
          hero: {
            title: "Ciwi AI 电商工具",
            description: "围绕 Shopify 商家的真实经营问题，提供更贴近转化、流量和效率目标的 AI 产品。",
          },
          matrix: {
            eyebrow: "产品",
            title: "Shopify 产品列表",
            description: "从多语言、本地化到内容生产与客单价提升，Ciwi 提供一组可直接上手的 Shopify 产品。",
          },
          finalCta: {
            eyebrow: "你的需求",
            title: "我们也支持按业务需求定制 Shopify App",
            description: "把你的目标、约束和当前流程发给我们，我们会一起评估更合适的实现方式。",
            primaryLabel: "提出需求",
            primaryHref: "/contact",
            secondaryLabel: "查看演示",
            secondaryHref: "/demo",
          },
        }
      : {
          hero: {
            title: "Ciwi AI products for Shopify growth",
            description: "Built around real Shopify operating problems, with products aimed at conversion, content efficiency, and global expansion.",
          },
          matrix: {
            eyebrow: "Products",
            title: "Shopify product lineup",
            description: "From localization and multilingual workflows to content operations and AOV growth, Ciwi provides a practical set of products for Shopify teams.",
          },
          finalCta: {
            eyebrow: "Your request",
            title: "We also support custom Shopify app work",
            description: "Share your goals, constraints, and current workflow with us, and we can help shape a more tailored path.",
            primaryLabel: "Start a conversation",
            primaryHref: "/contact",
            secondaryLabel: "View demo",
            secondaryHref: "/demo",
          },
        };

  return (
    <main>
      <PageContainer>
        <section className="page-hero page-hero--compact">
          <SectionHeading title={copy.hero.title} description={copy.hero.description} as="h1" />
        </section>
        <ProductMatrixSection
          eyebrow={copy.matrix.eyebrow}
          title={copy.matrix.title}
          description={copy.matrix.description}
          className="page-section page-section--products-first"
          products={products}
        />
        <FinalCtaSection
          eyebrow={copy.finalCta.eyebrow}
          title={copy.finalCta.title}
          description={copy.finalCta.description}
          primaryLabel={copy.finalCta.primaryLabel}
          primaryHref={copy.finalCta.primaryHref}
          secondaryLabel={copy.finalCta.secondaryLabel}
          secondaryHref={copy.finalCta.secondaryHref}
        />
      </PageContainer>
    </main>
  );
}
