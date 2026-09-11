import {ContentIndexHero} from "@/components/sections/ContentIndexHero";
import {NewsletterSubscriptionCard} from "@/components/sections/NewsletterSubscriptionCard";
import {ResourceCollectionSection} from "@/components/sections/ResourceCollectionSection";
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
  getUseCaseResources,
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
          description: "The guide articles don't have a published localized version yet, so we don't show untranslated article entries here.",
        };
  const localizationGuideResources = getLocalizationGuideCategoryResources(locale);
  const functionScenarioGuideResources = getFunctionScenarioGuideResources(locale);
  const helpCenterResources = getHelpCenterResources(locale);
  const blogResources = getBlogResources(locale);
  const compareResources = getCompareResources(locale);
  const bestShopifyAppsResources = getBestShopifyAppsResources(locale);
  const useCaseResources = getUseCaseResources(locale);
  const featuredLocalizationGuideResources = localizationGuideResources.slice(0, 3);
  const featuredFunctionScenarioGuideResources = functionScenarioGuideResources.slice(0, 3);
  const featuredHelpCenterResources = helpCenterResources.slice(0, 3);
  const featuredBlogResources = blogResources.slice(0, 3);
  const featuredCompareResources = compareResources.slice(0, 3);
  const featuredBestShopifyAppsResources = bestShopifyAppsResources.slice(0, 3);
  const featuredUseCaseResources = useCaseResources.slice(0, 3);
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
        <section className="py-12 sm:py-16 lg:py-20">
          <ContentIndexHero eyebrow={copy.hero.eyebrow} title={copy.hero.title} description={copy.hero.description} />
        </section>

        <section className="py-8 sm:py-10 lg:py-12">
          <SectionHeading
            eyebrow={copy.sections.guides.eyebrow}
            title={copy.sections.guides.title}
            description={copy.sections.guides.description}
          />
          <div className="mt-8 space-y-12">
            <section className="space-y-6">
              <ResourceCollectionSection
                items={guideModuleResources}
                className="py-0"
              />
            </section>
            <ResourceCollectionSection
              title={copy.sections.guides.categoryTitle}
              description={copy.sections.guides.categoryDescription}
              items={featuredLocalizationGuideResources}
              emptyState={unavailableGuideCopy}
              className="space-y-6 border-t border-slate-200/70 pt-10"
            />
            <ResourceCollectionSection
              title={copy.sections.guides.scenarioTitle}
              description={copy.sections.guides.scenarioDescription}
              items={featuredFunctionScenarioGuideResources}
              emptyState={unavailableGuideCopy}
              className="space-y-6 border-t border-slate-200/70 pt-10"
            />
          </div>
          <div className="mt-8 flex justify-start">
            <Button href={copy.sections.guides.ctaHref} variant="secondary">
              {copy.sections.guides.ctaLabel}
            </Button>
          </div>
        </section>

        <ResourceCollectionSection
          title={copy.sections.useCases.title}
          description={copy.sections.useCases.description}
          items={featuredUseCaseResources}
          ctaLabel={copy.sections.useCases.ctaLabel}
          ctaHref={copy.sections.useCases.ctaHref}
        />

        <ResourceCollectionSection
          title={copy.sections.helpCenter.title}
          description={copy.sections.helpCenter.description}
          items={featuredHelpCenterResources}
          ctaLabel={copy.sections.helpCenter.ctaLabel}
          ctaHref={copy.sections.helpCenter.ctaHref}
        />

        <ResourceCollectionSection
          title={copy.sections.blog.title}
          description={copy.sections.blog.description}
          items={featuredBlogResources}
          ctaLabel={copy.sections.blog.ctaLabel}
          ctaHref={copy.sections.blog.ctaHref}
        />

        <ResourceCollectionSection
          title={copy.sections.compare.title}
          description={copy.sections.compare.description}
          items={featuredCompareResources}
          ctaLabel={copy.sections.compare.ctaLabel}
          ctaHref={copy.sections.compare.ctaHref}
        />

        <ResourceCollectionSection
          title={copy.sections.bestShopifyApps.title}
          description={copy.sections.bestShopifyApps.description}
          items={featuredBestShopifyAppsResources}
          ctaLabel={copy.sections.bestShopifyApps.ctaLabel}
          ctaHref={copy.sections.bestShopifyApps.ctaHref}
        />

        <ResourceCollectionSection
          title={copy.sections.productResearch.title}
          description={copy.sections.productResearch.description}
          items={featuredProductResearchResources}
          ctaLabel={copy.sections.productResearch.ctaLabel}
          ctaHref={copy.sections.productResearch.ctaHref}
        />

        <section className="py-12 sm:py-14 lg:py-16">
          <NewsletterSubscriptionCard source="resources_newsletter" copy={copy.subscription} />
        </section>
      </PageContainer>
    </main>
  );
}
