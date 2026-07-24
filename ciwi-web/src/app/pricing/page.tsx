import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {PageContainer} from "@/components/ui/PageContainer";
import {pricingPageMediaBriefs} from "@/content/media-briefs";
import {pagesCopy} from "@/content/pages-copy";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: pagesCopy.pricing.metadata.title,
  description: pagesCopy.pricing.metadata.description,
  path: pagesCopy.pricing.metadata.path,
});

export default function PricingPage() {
  const copy = pagesCopy.pricing;

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
          <div className="card-grid">
            {copy.hero.cards.map((item) => (
              <article key={item.title} className="surface-card">
                <h3>{item.title}</h3>
                <p className="quote">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
        <MediaPlaceholderSection
          eyebrow={copy.media.eyebrow}
          title={copy.media.title}
          description={copy.media.description}
          items={pricingPageMediaBriefs}
        />
        <FinalCtaSection
          title={copy.finalCta.title}
          description={copy.finalCta.description}
        />
      </PageContainer>
    </main>
  );
}
