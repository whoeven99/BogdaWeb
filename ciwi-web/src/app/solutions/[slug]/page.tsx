import {notFound} from "next/navigation";

import {ArticleCard} from "@/components/cards/ArticleCard";
import {FaqSection} from "@/components/sections/FaqSection";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {ProductAnchorNav} from "@/components/sections/ProductAnchorNav";
import {Button} from "@/components/ui/Button";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {detailPagesCopy} from "@/content/detail-pages-copy";
import {getSolutionMediaBriefs} from "@/content/media-briefs";
import {solutionMap, solutions} from "@/content/solutions";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema} from "@/lib/seo/schema";

type SolutionDetailPageProps = {
  params: Promise<{slug: string}>;
};

export function generateStaticParams() {
  return solutions.map((solution) => ({slug: solution.slug}));
}

export async function generateMetadata({params}: SolutionDetailPageProps) {
  const {slug} = await params;
  const solution = solutionMap[slug];

  if (!solution) {
    return buildPageMetadata({
      title: detailPagesCopy.solutions.notFound.title,
      description: detailPagesCopy.solutions.notFound.description,
      path: detailPagesCopy.solutions.notFound.path,
    });
  }

  return buildPageMetadata({
    title: solution.title,
    description: solution.description,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionDetailPage({params}: SolutionDetailPageProps) {
  const {slug} = await params;
  const solution = solutionMap[slug];
  const copy = detailPagesCopy.solutions;

  if (!solution) {
    notFound();
  }

  const pageUrl = new URL(`/solutions/${solution.slug}`, siteUrl).toString();
  const anchorItems = copy.anchors.map((item) => ({...item}));
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: "Solutions", item: new URL("/solutions", siteUrl).toString()},
      {name: solution.title, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: solution.title,
      description: solution.description,
      keywords: [solution.name, "Shopify solutions", ...solution.targetSignals],
    }),
    buildFaqSchema(solution.faq),
  ];
  const mediaBriefs = getSolutionMediaBriefs(solution);

  return (
    <main>
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`${solution.slug}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}
        <section className="page-section page-hero">
          <div className="detail-grid">
            <div>
              <SectionHeading
                eyebrow={copy.hero.eyebrow}
                title={solution.heroTitle}
                description={solution.heroDescription}
                as="h1"
              />
              <div className="tag-list">
                {solution.targetSignals.map((item) => (
                  <span key={item} className="pill">
                    {item}
                  </span>
                ))}
              </div>
              <div className="inline-list space-top-xl">
                <Button href={solution.ctaHref}>{solution.ctaLabel}</Button>
                <Button href={copy.hero.secondaryHref} variant="secondary">
                  {copy.hero.secondaryLabel}
                </Button>
              </div>
            </div>
            <div className="surface-card section-stack">
              <div>
                <h3>{copy.hero.panels.overviewTitle}</h3>
                <p className="quote">{solution.description}</p>
              </div>
              <div>
                <h3>{copy.hero.panels.signalsTitle}</h3>
                <ul className="check-list">
                  {solution.targetSignals.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <MediaPlaceholderSection
          eyebrow={copy.media.eyebrow}
          title={copy.media.title}
          description={copy.media.description}
          items={mediaBriefs}
        />

        <ProductAnchorNav items={anchorItems} />

        <section className="page-section anchor-offset" id={copy.sections.challenges.id}>
          <SectionHeading
            eyebrow={copy.sections.challenges.eyebrow}
            title={copy.sections.challenges.title}
            description={copy.sections.challenges.description}
          />
          <div className="card-grid">
            {solution.challenges.map((item) => (
              <article key={item} className="surface-card">
                <p className="quote">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section anchor-offset" id={copy.sections.approach.id}>
          <SectionHeading
            eyebrow={copy.sections.approach.eyebrow}
            title={copy.sections.approach.title}
            description={copy.sections.approach.description}
          />
          <div className="card-grid">
            {solution.approach.map((item, index) => (
              <article key={item.title} className="surface-card">
                <h3>{`0${index + 1}`}</h3>
                <p className="quote">
                  <strong>{item.title}</strong>
                </p>
                <p className="quote">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section anchor-offset" id={copy.sections.products.id}>
          <SectionHeading
            eyebrow={copy.sections.products.eyebrow}
            title={copy.sections.products.title}
            description={copy.sections.products.description}
          />
          <div className="resource-grid">
            {solution.recommendedProducts.map((item) => (
              <ArticleCard
                key={`${item.title}-${item.href}`}
                title={item.title}
                description={item.description}
                href={item.href}
                meta={item.meta}
              />
            ))}
          </div>
        </section>

        <section className="page-section anchor-offset" id={copy.sections.resources.id}>
          <SectionHeading
            eyebrow={copy.sections.resources.eyebrow}
            title={copy.sections.resources.title}
            description={copy.sections.resources.description}
          />
          <div className="resource-grid">
            {solution.relatedResources.map((item) => (
              <ArticleCard
                key={`${item.title}-${item.href}`}
                title={item.title}
                description={item.description}
                href={item.href}
                meta={item.meta}
              />
            ))}
          </div>
        </section>

        <div id="faq" className="anchor-offset" />
        <FaqSection items={solution.faq} />
        <FinalCtaSection
          title={`Explore ${solution.name}`}
          description={solution.description}
          primaryLabel={solution.ctaLabel}
          primaryHref={solution.ctaHref}
          secondaryLabel={copy.finalCta.secondaryLabel}
          secondaryHref={copy.finalCta.secondaryHref}
        />
      </PageContainer>
    </main>
  );
}
