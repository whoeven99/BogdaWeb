import {ArticleCard} from "@/components/cards/ArticleCard";
import {NewsletterSubscriptionCard} from "@/components/sections/NewsletterSubscriptionCard";
import {Button} from "@/components/ui/Button";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {resourcesPageCopy} from "@/content/resources-page-copy";
import {blogResources, compareResources, helpCenterResources} from "@/content/resources";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: resourcesPageCopy.metadata.title,
  description: resourcesPageCopy.metadata.description,
  path: resourcesPageCopy.metadata.path,
});

export default function ResourcesPage() {
  const copy = resourcesPageCopy;
  const featuredHelpCenterResources = helpCenterResources.slice(0, 3);
  const featuredBlogResources = blogResources.slice(0, 3);
  const featuredCompareResources = compareResources.slice(0, 3);

  return (
    <main className="resources-page">
      <PageContainer>
        <section className="page-section page-hero">
          <SectionHeading
            eyebrow={copy.hero.eyebrow}
            title={copy.hero.title}
            description={copy.hero.description}
            as="h1"
          />
        </section>

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.sections.helpCenter.eyebrow}
            title={copy.sections.helpCenter.title}
            description={copy.sections.helpCenter.description}
          />
          <div className="resource-grid">
            {featuredHelpCenterResources.map((item) => (
              <ArticleCard
                key={`${item.title}-${item.href}`}
                title={item.title}
                description={item.description}
                href={item.href}
                meta={item.meta}
              />
            ))}
          </div>
          <div className="resources-section__cta">
            <Button href={copy.sections.helpCenter.ctaHref} variant="secondary">
              {copy.sections.helpCenter.ctaLabel}
            </Button>
          </div>
        </section>

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.sections.blog.eyebrow}
            title={copy.sections.blog.title}
            description={copy.sections.blog.description}
          />
          <div className="resource-grid">
            {featuredBlogResources.map((item) => (
              <ArticleCard
                key={`${item.title}-${item.href}`}
                title={item.title}
                description={item.description}
                href={item.href}
                meta={item.meta}
              />
            ))}
          </div>
          <div className="resources-section__cta">
            <Button href={copy.sections.blog.ctaHref} variant="secondary">
              {copy.sections.blog.ctaLabel}
            </Button>
          </div>
        </section>

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.sections.compare.eyebrow}
            title={copy.sections.compare.title}
            description={copy.sections.compare.description}
          />
          <div className="resource-grid">
            {featuredCompareResources.map((item) => (
              <ArticleCard
                key={`${item.title}-${item.href}`}
                title={item.title}
                description={item.description}
                href={item.href}
                meta={item.meta}
              />
            ))}
          </div>
          <div className="resources-section__cta">
            <Button href={copy.sections.compare.ctaHref} variant="secondary">
              {copy.sections.compare.ctaLabel}
            </Button>
          </div>
        </section>

        <section className="page-section">
          <NewsletterSubscriptionCard copy={copy.subscription} />
        </section>
      </PageContainer>
    </main>
  );
}
