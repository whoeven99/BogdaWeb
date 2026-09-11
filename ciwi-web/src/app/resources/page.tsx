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

  function renderArticleGrid(
    items: Array<{title: string; description: string; href: string; meta: string[]}>,
    emptyState?: {title: string; description: string},
  ) {
    if (items.length > 0) {
      return (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <ArticleCard
              key={`${item.title}-${item.href}`}
              title={item.title}
              description={item.description}
              href={item.href}
              meta={item.meta}
            />
          ))}
        </div>
      );
    }

    if (!emptyState) {
      return null;
    }

    return (
      <div className="mt-8 rounded-[28px] border border-dashed border-slate-300 bg-slate-50/80 px-6 py-8">
        <h3 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">{emptyState.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{emptyState.description}</p>
      </div>
    );
  }

  return (
    <main className="resources-page">
      <PageContainer>
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="rounded-[32px] border border-slate-200/80 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.92))] px-6 py-10 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)] sm:px-8 lg:px-12">
              <SectionHeading
                eyebrow={copy.hero.eyebrow}
                title={copy.hero.title}
                description={copy.hero.description}
                as="h1"
              />
          </div>
        </section>

        <section className="py-8 sm:py-10 lg:py-12">
          <SectionHeading
            eyebrow={copy.sections.guides.eyebrow}
            title={copy.sections.guides.title}
            description={copy.sections.guides.description}
          />
          <div className="mt-8 space-y-12">
            <section className="space-y-6">
              {renderArticleGrid(guideModuleResources)}
            </section>
            <section className="space-y-6 border-t border-slate-200/70 pt-10">
              <SectionHeading
                title={copy.sections.guides.categoryTitle}
                description={copy.sections.guides.categoryDescription}
              />
              {renderArticleGrid(featuredLocalizationGuideResources, unavailableGuideCopy)}
            </section>
            <section className="space-y-6 border-t border-slate-200/70 pt-10">
              <SectionHeading
                title={copy.sections.guides.scenarioTitle}
                description={copy.sections.guides.scenarioDescription}
              />
              {renderArticleGrid(featuredFunctionScenarioGuideResources, unavailableGuideCopy)}
            </section>
          </div>
          <div className="mt-8 flex justify-start">
            <Button href={copy.sections.guides.ctaHref} variant="secondary">
              {copy.sections.guides.ctaLabel}
            </Button>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeading
            title={copy.sections.useCases.title}
            description={copy.sections.useCases.description}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredUseCaseResources.map((item) => (
              <ArticleCard
                key={`${item.title}-${item.href}`}
                title={item.title}
                description={item.description}
                href={item.href}
                meta={item.meta}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-start">
            <Button href={copy.sections.useCases.ctaHref} variant="secondary">
              {copy.sections.useCases.ctaLabel}
            </Button>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeading
            title={copy.sections.helpCenter.title}
            description={copy.sections.helpCenter.description}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
          <div className="mt-8 flex justify-start">
            <Button href={copy.sections.helpCenter.ctaHref} variant="secondary">
              {copy.sections.helpCenter.ctaLabel}
            </Button>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeading
            title={copy.sections.blog.title}
            description={copy.sections.blog.description}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
          <div className="mt-8 flex justify-start">
            <Button href={copy.sections.blog.ctaHref} variant="secondary">
              {copy.sections.blog.ctaLabel}
            </Button>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeading
            title={copy.sections.compare.title}
            description={copy.sections.compare.description}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
          <div className="mt-8 flex justify-start">
            <Button href={copy.sections.compare.ctaHref} variant="secondary">
              {copy.sections.compare.ctaLabel}
            </Button>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeading
            title={copy.sections.bestShopifyApps.title}
            description={copy.sections.bestShopifyApps.description}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
          <div className="mt-8 flex justify-start">
            <Button href={copy.sections.bestShopifyApps.ctaHref} variant="secondary">
              {copy.sections.bestShopifyApps.ctaLabel}
            </Button>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeading
            title={copy.sections.productResearch.title}
            description={copy.sections.productResearch.description}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
          <div className="mt-8 flex justify-start">
            <Button href={copy.sections.productResearch.ctaHref} variant="secondary">
              {copy.sections.productResearch.ctaLabel}
            </Button>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <NewsletterSubscriptionCard source="resources_newsletter" copy={copy.subscription} />
        </section>
      </PageContainer>
    </main>
  );
}
