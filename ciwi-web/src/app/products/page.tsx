import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {ProductMatrixSection} from "@/components/sections/ProductMatrixSection";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {PageContainer} from "@/components/ui/PageContainer";
import {pagesCopy} from "@/content/pages-copy";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: pagesCopy.products.metadata.title,
  description: pagesCopy.products.metadata.description,
  path: pagesCopy.products.metadata.path,
});

export default function ProductsPage() {
  const copy = pagesCopy.products;

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
