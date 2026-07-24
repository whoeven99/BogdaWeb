import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {ProductMatrixSection} from "@/components/sections/ProductMatrixSection";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {PageContainer} from "@/components/ui/PageContainer";
import {pagesCopy} from "@/content/pages-copy";
import {productsIndexMediaBriefs} from "@/content/media-briefs";
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
        <section className="page-section page-hero">
          <SectionHeading
            eyebrow={copy.hero.eyebrow}
            title={copy.hero.title}
            description={copy.hero.description}
            as="h1"
          />
        </section>
        <MediaPlaceholderSection
          eyebrow={copy.media.eyebrow}
          title={copy.media.title}
          description={copy.media.description}
          items={productsIndexMediaBriefs}
        />
        <ProductMatrixSection />
        <FinalCtaSection
          title={copy.finalCta.title}
          description={copy.finalCta.description}
        />
      </PageContainer>
    </main>
  );
}
