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

export const dynamic = "force-dynamic";

function buildResourcesNarrative({
  locale,
  guideCount,
  helpCenterCount,
  blogCount,
  compareCount,
  bestAppsCount,
  productResearchCount,
}: {
  locale: "en" | "zh-cn";
  guideCount: number;
  helpCenterCount: number;
  blogCount: number;
  compareCount: number;
  bestAppsCount: number;
  productResearchCount: number;
}) {
  if (locale === "zh-cn") {
    return [
      `资源中心把指南、帮助文档、博客、对比页、榜单页和选品专题放在同一个入口里，适合先判断应该看“知识型内容”还是“操作型内容”。当前已聚合 ${guideCount} 条指南入口、${helpCenterCount} 条帮助文档、${blogCount} 篇博客、${compareCount} 条对比页、${bestAppsCount} 条榜单入口和 ${productResearchCount} 条选品内容。`,
      `如果你要解决具体配置问题，更适合进帮助中心；如果你在做选型、调研或 SEO 内容扩展，对比页、榜单页和选品专题会更直接。博客和应用场景页则更适合补上下文与案例。`,
    ];
  }

  return [
    `The resource center puts guides, help docs, blog posts, comparison pages, roundup pages, and product research content into one routing layer so visitors can decide whether the next step is educational reading or task-specific documentation. It currently surfaces ${guideCount} guide entries, ${helpCenterCount} help docs, ${blogCount} blog posts, ${compareCount} comparison pages, ${bestAppsCount} roundup entries, and ${productResearchCount} product research resources.`,
    `Use the help center for concrete setup questions. Use comparison pages, roundup pages, and product research when the job is tool selection, research, or SEO content expansion. Blog posts and use-case pages are better for added context and examples.`,
  ];
}

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
  const featuredLocalizationGuideResources = localizationGuideResources.slice(0, 6);
  const featuredFunctionScenarioGuideResources = functionScenarioGuideResources.slice(0, 6);
  const featuredHelpCenterResources = helpCenterResources.slice(0, 3);
  const featuredBlogResources = blogResources.slice(0, 3);
  const featuredCompareResources = compareResources.slice(0, 3);
  const featuredBestShopifyAppsResources = bestShopifyAppsResources.slice(0, 3);
  const featuredUseCaseResources = useCaseResources.slice(0, 3);
  const productResearchResources = getProductResearchResources(locale);
  const featuredProductResearchResources = productResearchResources.slice(0, 3);
  const narrative = buildResourcesNarrative({
    locale,
    guideCount: localizationGuideResources.length + functionScenarioGuideResources.length,
    helpCenterCount: helpCenterResources.length,
    blogCount: blogResources.length,
    compareCount: compareResources.length,
    bestAppsCount: bestShopifyAppsResources.length,
    productResearchCount: productResearchResources.length,
  });
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
          <div className="mx-auto mt-6 max-w-4xl rounded-[24px] border border-slate-200/80 bg-white/90 p-5 sm:p-6">
            <div className="space-y-4 text-[15px] leading-7 text-slate-600 sm:text-base">
              {narrative.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
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
