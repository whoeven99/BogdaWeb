import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {FaqSection} from "@/components/sections/FaqSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {demoPageMediaBriefs} from "@/content/media-briefs";
import {pagesCopy} from "@/content/pages-copy";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: pagesCopy.demo.metadata.title,
  description: pagesCopy.demo.metadata.description,
  path: pagesCopy.demo.metadata.path,
});

export default function DemoPage() {
  const copy = pagesCopy.demo;

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
            {copy.hero.cards.map((card) => {
              const accent = "accent" in card && card.accent;

              return (
                <article key={card.title} className={accent ? "hero-panel" : "surface-card"}>
                  {"eyebrow" in card ? <div className="hero-panel__badge">{card.eyebrow}</div> : null}
                  <h3>{card.title}</h3>
                  <p className={accent ? "quote light-copy" : "quote"}>{card.description}</p>
                </article>
              );
            })}
          </div>
        </section>
        <MediaPlaceholderSection
          eyebrow={copy.media.eyebrow}
          title={copy.media.title}
          description={copy.media.description}
          items={demoPageMediaBriefs}
        />
        <FaqSection items={copy.faq.map((item) => ({...item}))} />
        <FinalCtaSection
          title={copy.finalCta.title}
          description={copy.finalCta.description}
        />
      </PageContainer>
    </main>
  );
}
