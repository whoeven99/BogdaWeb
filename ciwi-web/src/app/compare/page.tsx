import {ArticleCard} from "@/components/cards/ArticleCard";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {compareIndexMediaBriefs} from "@/content/media-briefs";
import {pagesCopy} from "@/content/pages-copy";
import {compares} from "@/content/compare";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema} from "@/lib/seo/schema";

export const metadata = buildPageMetadata({
  title: pagesCopy.compare.metadata.title,
  description: pagesCopy.compare.metadata.description,
  path: pagesCopy.compare.metadata.path,
});

export default function ComparePage() {
  const copy = pagesCopy.compare;
  const pageUrl = new URL("/compare", siteUrl).toString();
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: "Compare", item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: copy.structuredData.name,
      description: copy.structuredData.description,
      keywords: [...copy.structuredData.keywords],
      type: "CollectionPage",
    }),
  ];

  return (
    <main>
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`compare-list-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}
        <section className="page-section page-hero">
          <SectionHeading
            eyebrow={copy.hero.eyebrow}
            title={copy.hero.title}
            description={copy.hero.description}
            as="h1"
          />
          <div className="resource-grid">
            {compares.map((item) => (
              <ArticleCard
                key={item.slug}
                title={item.title}
                description={item.description}
                href={`/compare/${item.slug}`}
                meta={[...copy.hero.cardMeta]}
              />
            ))}
          </div>
        </section>
        <MediaPlaceholderSection
          eyebrow={copy.media.eyebrow}
          title={copy.media.title}
          description={copy.media.description}
          items={compareIndexMediaBriefs}
        />
        <FinalCtaSection
          title={copy.finalCta.title}
          description={copy.finalCta.description}
        />
      </PageContainer>
    </main>
  );
}
