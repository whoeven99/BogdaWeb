import {ArticleCard} from "@/components/cards/ArticleCard";
import {NewsletterSubscriptionCard} from "@/components/sections/NewsletterSubscriptionCard";
import {Button} from "@/components/ui/Button";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getResourcesPageCopy} from "@/content/resources-page-copy";
import {
  getBestShopifyAppsResources,
  getBlogResources,
  getCompareResources,
  getFunctionScenarioGuideResources,
  getHelpCenterResources,
  getLocalizationGuideCategoryResources,
  getProductResearchResources,
} from "@/content/resources";
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
  const unavailableGuideCopy =
    locale === "zh-cn"
      ? {
          title: "中文版指南正在准备中",
          description: "当前 guide 正文还没有正式中文版本，所以这里先不展示未翻译文章入口。",
        }
      : {
          title: "Guide translations are not published yet",
          description: "We only show guide entries in locales that already have a published article body.",
        };
  const localizationGuideResources = getLocalizationGuideCategoryResources(locale);
  const functionScenarioGuideResources = getFunctionScenarioGuideResources(locale);
  const helpCenterResources = getHelpCenterResources(locale);
  const blogResources = getBlogResources(locale);
  const compareResources = getCompareResources(locale);
  const bestShopifyAppsResources = getBestShopifyAppsResources(locale);
  const featuredLocalizationGuideResources = localizationGuideResources.slice(0, 3);
  const featuredFunctionScenarioGuideResources = functionScenarioGuideResources.slice(0, 3);
  const featuredHelpCenterResources = helpCenterResources.slice(0, 3);
  const featuredBlogResources = blogResources.slice(0, 3);
  const featuredCompareResources = compareResources.slice(0, 3);
  const featuredBestShopifyAppsResources = bestShopifyAppsResources.slice(0, 3);
  const productResearchResources = getProductResearchResources(locale);
  const featuredProductResearchResources = productResearchResources.slice(0, 3);
  const guideModuleResources = [
    {
      title: copy.sections.guides.categoryTitle,
      description: copy.sections.guides.categoryDescription,
      href: copy.sections.guides.categoryHref,
      meta: [
        copy.sections.guides.categoryEyebrow,
        `${localizationGuideResources.length} ${copy.sections.guides.pagesLabel}`,
      ],
    },
    {
      title: copy.sections.guides.scenarioTitle,
      description: copy.sections.guides.scenarioDescription,
      href: copy.sections.guides.scenarioHref,
      meta: [
        copy.sections.guides.scenarioEyebrow,
        `${functionScenarioGuideResources.length} ${copy.sections.guides.pagesLabel}`,
      ],
    },
  ];

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
            eyebrow={copy.sections.guides.eyebrow}
            title={copy.sections.guides.title}
            description={copy.sections.guides.description}
          />
          <div className="resource-subsection">
            <div className="resource-grid">
              {guideModuleResources.map((item) => (
                <ArticleCard
                  key={`${item.title}-${item.href}`}
                  title={item.title}
                  description={item.description}
                  href={item.href}
                  meta={item.meta}
                />
              ))}
            </div>
          </div>
          <div className="resource-subsection">
            <SectionHeading
              eyebrow={copy.sections.guides.categoryEyebrow}
              title={copy.sections.guides.categoryTitle}
              description={copy.sections.guides.categoryDescription}
            />
            <div className="resource-grid">
              {featuredLocalizationGuideResources.length > 0 ? (
                featuredLocalizationGuideResources.map((item) => (
                  <ArticleCard
                    key={`${item.title}-${item.href}`}
                    title={item.title}
                    description={item.description}
                    href={item.href}
                    meta={item.meta}
                  />
                ))
              ) : (
                <div className="surface-card">
                  <h3>{unavailableGuideCopy.title}</h3>
                  <p className="quote">{unavailableGuideCopy.description}</p>
                </div>
              )}
            </div>
          </div>
          <div className="resource-subsection">
            <SectionHeading
              eyebrow={copy.sections.guides.scenarioEyebrow}
              title={copy.sections.guides.scenarioTitle}
              description={copy.sections.guides.scenarioDescription}
            />
            <div className="resource-grid">
              {featuredFunctionScenarioGuideResources.length > 0 ? (
                featuredFunctionScenarioGuideResources.map((item) => (
                  <ArticleCard
                    key={`${item.title}-${item.href}`}
                    title={item.title}
                    description={item.description}
                    href={item.href}
                    meta={item.meta}
                  />
                ))
              ) : (
                <div className="surface-card">
                  <h3>{unavailableGuideCopy.title}</h3>
                  <p className="quote">{unavailableGuideCopy.description}</p>
                </div>
              )}
            </div>
          </div>
          <div className="resources-section__cta">
            <Button href={copy.sections.guides.ctaHref} variant="secondary">
              {copy.sections.guides.ctaLabel}
            </Button>
          </div>
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
          <SectionHeading
            eyebrow={copy.sections.productResearch.eyebrow}
            title={copy.sections.productResearch.title}
            description={copy.sections.productResearch.description}
          />
          <div className="resource-grid">
            {featuredProductResearchResources.map((item) => (
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
            <Button href={copy.sections.productResearch.ctaHref} variant="secondary">
              {copy.sections.productResearch.ctaLabel}
            </Button>
          </div>
        </section>

        <section className="page-section">
          <NewsletterSubscriptionCard source="resources_newsletter" copy={copy.subscription} />
        </section>
      </PageContainer>
    </main>
  );
}
