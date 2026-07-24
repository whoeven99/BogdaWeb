import {ArticleCard} from "@/components/cards/ArticleCard";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {featuredHelpCenterDocs, helpCenterDocs} from "@/content/help-center";
import {helpCenterIndexMediaBriefs} from "@/content/media-briefs";
import {pagesCopy} from "@/content/pages-copy";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: pagesCopy.helpCenter.metadata.title,
  description: pagesCopy.helpCenter.metadata.description,
  path: pagesCopy.helpCenter.metadata.path,
});

export default function HelpCenterPage() {
  const copy = pagesCopy.helpCenter;
  const featuredDocHrefs = new Set(featuredHelpCenterDocs.map((doc) => doc.href));
  const allDocs = helpCenterDocs
    .filter((doc) => !featuredDocHrefs.has(doc.href))
    .sort((left, right) => left.title.localeCompare(right.title));
  const startPrefix = copy.hero.startTemplate.split("{{count}}")[0];
  const startSuffix = copy.hero.startTemplate.split("{{count}}")[1] ?? "";
  const featuredPrefix = copy.all.statsFeaturedTemplate.split("{{count}}")[0];
  const featuredSuffix = copy.all.statsFeaturedTemplate.split("{{count}}")[1] ?? "";
  const allPrefix = copy.all.statsAllTemplate.split("{{count}}")[0];
  const allSuffix = copy.all.statsAllTemplate.split("{{count}}")[1] ?? "";

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
          <div className="detail-grid">
            <article className="surface-card">
              <h3>{copy.hero.startTitle}</h3>
              <p className="quote">
                {startPrefix}
                <strong>{helpCenterDocs.length}</strong>
                {startSuffix}
              </p>
            </article>
            <article className="surface-card">
              <h3>{copy.hero.audienceTitle}</h3>
              <p className="quote">{copy.hero.audienceText}</p>
            </article>
          </div>
        </section>

        <MediaPlaceholderSection
          eyebrow={copy.media.eyebrow}
          title={copy.media.title}
          description={copy.media.description}
          items={helpCenterIndexMediaBriefs}
        />

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.featured.eyebrow}
            title={copy.featured.title}
            description={copy.featured.description}
          />
          <div className="resource-grid">
            {featuredHelpCenterDocs.map((item) => (
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

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.all.eyebrow}
            title={copy.all.title}
            description={copy.all.description}
          />
          <div className="detail-grid">
            <article className="surface-card">
              <h3>{copy.all.statsFeaturedTitle}</h3>
              <p className="quote">
                {featuredPrefix}
                <strong>{featuredHelpCenterDocs.length}</strong>
                {featuredSuffix}
              </p>
            </article>
            <article className="surface-card">
              <h3>{copy.all.statsAllTitle}</h3>
              <p className="quote">
                {allPrefix}
                <strong>{helpCenterDocs.length}</strong>
                {allSuffix}
              </p>
            </article>
          </div>
          <div className="resource-grid space-top-xl">
            {allDocs.map((item) => (
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
