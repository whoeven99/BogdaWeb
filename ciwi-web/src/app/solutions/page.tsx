import {ArticleCard} from "@/components/cards/ArticleCard";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {solutionsIndexMediaBriefs} from "@/content/media-briefs";
import {pagesCopy} from "@/content/pages-copy";
import {solutions} from "@/content/solutions";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema} from "@/lib/seo/schema";

export const metadata = buildPageMetadata({
  title: pagesCopy.solutions.metadata.title,
  description: pagesCopy.solutions.metadata.description,
  path: pagesCopy.solutions.metadata.path,
});

export default function SolutionsPage() {
  const copy = pagesCopy.solutions;
  const pageUrl = new URL("/solutions", siteUrl).toString();
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: "Solutions", item: pageUrl},
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
            key={`solutions-schema-${index}`}
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
            {solutions.map((solution) => (
              <ArticleCard
                key={solution.slug}
                title={solution.name}
                description={solution.description}
                href={`/solutions/${solution.slug}`}
                meta={[...copy.hero.cardMeta]}
              />
            ))}
          </div>
        </section>
        <MediaPlaceholderSection
          eyebrow={copy.media.eyebrow}
          title={copy.media.title}
          description={copy.media.description}
          items={solutionsIndexMediaBriefs}
        />
        <FinalCtaSection
          title={copy.finalCta.title}
          description={copy.finalCta.description}
        />
      </PageContainer>
    </main>
  );
}
