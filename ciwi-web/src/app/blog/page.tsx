import {ArticleCard} from "@/components/cards/ArticleCard";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {blogPosts} from "@/content/blog";
import {blogIndexMediaBriefs} from "@/content/media-briefs";
import {pagesCopy} from "@/content/pages-copy";
import {blogResources} from "@/content/resources";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: pagesCopy.blog.metadata.title,
  description: pagesCopy.blog.metadata.description,
  path: pagesCopy.blog.metadata.path,
});

export default function BlogPage() {
  const copy = pagesCopy.blog;
  const [directionPrefix, directionSuffix] = copy.hero.directionTemplate.split("{{count}}");

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
              <h3>{copy.hero.directionTitle}</h3>
              <p className="quote">
                {directionPrefix}
                <strong>{blogPosts.length}</strong>
                {directionSuffix ?? ""}
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
          items={blogIndexMediaBriefs}
        />

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.list.eyebrow}
            title={copy.list.title}
            description={copy.list.description}
          />
          <div className="resource-grid">
            {blogResources.map((item) => (
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
