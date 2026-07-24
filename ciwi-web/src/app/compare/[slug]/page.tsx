import {notFound} from "next/navigation";

import {FaqSection} from "@/components/sections/FaqSection";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {ArticleCard} from "@/components/cards/ArticleCard";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {detailPagesCopy} from "@/content/detail-pages-copy";
import {compareMap, compares} from "@/content/compare";
import {blogPosts} from "@/content/blog";
import {getCompareMediaBriefs} from "@/content/media-briefs";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema} from "@/lib/seo/schema";
import {helpCenterDocs} from "@/content/help-center";

type CompareDetailPageProps = {
  params: Promise<{slug: string}>;
};

export function generateStaticParams() {
  return compares.map((item) => ({slug: item.slug}));
}

export async function generateMetadata({params}: CompareDetailPageProps) {
  const {slug} = await params;
  const data = compareMap[slug];

  if (!data) {
    return buildPageMetadata({
      title: detailPagesCopy.compare.notFound.title,
      description: detailPagesCopy.compare.notFound.description,
      path: detailPagesCopy.compare.notFound.path,
    });
  }

  return buildPageMetadata({
    title: data.title,
    description: data.description,
    path: `/compare/${data.slug}`,
  });
}

export default async function CompareDetailPage({params}: CompareDetailPageProps) {
  const {slug} = await params;
  const data = compareMap[slug];
  const copy = detailPagesCopy.compare;

  if (!data) {
    notFound();
  }

  const pageUrl = new URL(`/compare/${data.slug}`, siteUrl).toString();
  const siblingCompares = compares.filter((item) => item.slug !== data.slug).slice(0, 2);
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: "Compare", item: new URL("/compare", siteUrl).toString()},
      {name: data.title, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: data.title,
      description: data.description,
      keywords: ["Shopify compare", data.title, ...data.bestFor],
    }),
    buildFaqSchema(data.faq),
  ];
  const mediaBriefs = getCompareMediaBriefs(data);

  return (
    <main>
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`${data.slug}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}
        <section className="page-section page-hero">
          <SectionHeading eyebrow={copy.hero.eyebrow} title={data.title} description={data.description} as="h1" />
          <div className="detail-grid">
            <article className="surface-card">
              <h3>{copy.hero.panels.summaryTitle}</h3>
              <p className="quote">{data.summary}</p>
            </article>
            <article className="surface-card">
              <h3>{copy.hero.panels.bestFitTitle}</h3>
              <ul className="check-list">
                {data.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <MediaPlaceholderSection
          eyebrow={copy.media.eyebrow}
          title={copy.media.title}
          description={copy.media.description}
          items={mediaBriefs}
        />

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.sections.dimensions.eyebrow}
            title={copy.sections.dimensions.title}
            description={copy.sections.dimensions.description}
          />
          <div className="faq-list">
            {data.dimensions.map((dimension) => (
              <article key={dimension.label} className="surface-card section-stack">
                <h3>{dimension.label}</h3>
                <div className="detail-grid">
                  <div>
                    <div className="section-heading__eyebrow">{copy.sections.dimensions.ciwiLabel}</div>
                    <p className="quote">{dimension.ciwi}</p>
                  </div>
                  <div>
                    <div className="section-heading__eyebrow">{copy.sections.dimensions.alternativeLabel}</div>
                    <p className="quote">{dimension.alternative}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.sections.highlights.eyebrow}
            title={copy.sections.highlights.title}
            description={copy.sections.highlights.description}
          />
          <div className="card-grid">
            {data.highlights.map((highlight) => (
              <article key={highlight} className="surface-card">
                <p className="quote">{highlight}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.sections.continue.eyebrow}
            title={copy.sections.continue.title}
            description={copy.sections.continue.description}
          />
          <div className="resource-grid">
            {siblingCompares.map((item) => (
              <ArticleCard
                key={item.slug}
                title={item.title}
                description={item.description}
                href={`/compare/${item.slug}`}
                meta={[...copy.sections.continue.siblingMeta]}
              />
            ))}
            <ArticleCard
              title={blogPosts[0].title}
              description={blogPosts[0].description}
              href={blogPosts[0].href}
              meta={["Blog", blogPosts[0].publishedAt]}
            />
            <ArticleCard
              title={helpCenterDocs[0].title}
              description={helpCenterDocs[0].description}
              href={helpCenterDocs[0].href}
              meta={helpCenterDocs[0].meta}
            />
            <ArticleCard
              title={copy.sections.continue.translatorCard.title}
              description={copy.sections.continue.translatorCard.description}
              href={copy.sections.continue.translatorCard.href}
              meta={[...copy.sections.continue.translatorCard.meta]}
            />
          </div>
        </section>

        <FaqSection items={data.faq} />
        <FinalCtaSection
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
