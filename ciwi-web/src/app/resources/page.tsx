import {ArticleCard} from "@/components/cards/ArticleCard";
import {NewsletterSubscriptionCard} from "@/components/sections/NewsletterSubscriptionCard";
import {Button} from "@/components/ui/Button";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getResourcesPageCopy} from "@/content/resources-page-copy";
import {getBestShopifyAppsResources, getBlogResources, getCompareResources, getHelpCenterResources} from "@/content/resources";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const copy = getResourcesPageCopy(locale);

  return buildPageMetadata({
    title: copy.metadata.title,
    description: copy.metadata.description,
    path: copy.metadata.path,
    locale,
  });
}

export default async function ResourcesPage() {
  const locale = await getRequestLocale();
  const copy = getResourcesPageCopy(locale);
  const helpCenterResources = getHelpCenterResources(locale);
  const blogResources = getBlogResources(locale);
  const compareResources = getCompareResources(locale);
  const bestShopifyAppsResources = getBestShopifyAppsResources(locale);
  const featuredHelpCenterResources = helpCenterResources.slice(0, 3);
  const featuredBlogResources = blogResources.slice(0, 3);
  const featuredCompareResources = compareResources.slice(0, 3);
  const featuredBestShopifyAppsResources = bestShopifyAppsResources.slice(0, 3);

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
          <SectionHeading
            eyebrow={copy.sections.bestShopifyApps.eyebrow}
            title={copy.sections.bestShopifyApps.title}
            description={copy.sections.bestShopifyApps.description}
          />
          <div className="resource-grid">
            {featuredBestShopifyAppsResources.map((item) => (
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
            <Button href={copy.sections.bestShopifyApps.ctaHref} variant="secondary">
              {copy.sections.bestShopifyApps.ctaLabel}
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
