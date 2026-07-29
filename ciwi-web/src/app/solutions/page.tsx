import {ArticleCard} from "@/components/cards/ArticleCard";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {solutionsIndexMediaBriefs} from "@/content/media-briefs";
import {getSolutions} from "@/content/solutions";
import {getRequestLocale} from "@/lib/i18n-server";
import {localizeHref} from "@/lib/i18n";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema} from "@/lib/seo/schema";

export async function generateMetadata() {
  const locale = await getRequestLocale();

  return buildPageMetadata({
    title: locale === "zh-cn" ? "解决方案" : "Solutions",
    description:
      locale === "zh-cn"
        ? "帮助 Shopify 商家按问题和增长目标找到更合适的路径。"
        : "Help Shopify merchants find the right path by operating problem and growth goal.",
    path: "/solutions",
    locale,
  });
}

export default async function SolutionsPage() {
  const locale = await getRequestLocale();
  const solutions = getSolutions(locale);
  const copy =
    locale === "zh-cn"
      ? {
          structuredData: {
            name: "解决方案",
            description: "帮助 Shopify 商家按跨境转化、多语言运营和 AOV 目标找到更合适的路径。",
            keywords: ["Shopify 解决方案", "转化", "本地化", "AOV"],
          },
          hero: {
            eyebrow: "解决方案",
            title: "按问题找路径，按结果选方案",
            description: "无论你更关心跨市场转化、多语言运营还是客单价提升，都可以先从对应场景进入。",
            cardMeta: ["方案", "Shopify"],
          },
          media: {
            eyebrow: "方案素材",
            title: "方案页素材预留",
            description: "方案列表页更适合用按问题分类的场景图，帮助用户快速判断入口。",
          },
          finalCta: {
            eyebrow: "下一步",
            title: "从场景页继续进入产品、对比页和帮助文档",
            description: "如果你已经判断清楚当前重点，可以继续看对应产品、对比页和文档。",
            primaryLabel: "查看产品",
            primaryHref: "/products",
            secondaryLabel: "查看资源",
            secondaryHref: "/resources",
          },
        }
      : {
          structuredData: {
            name: "Solutions",
            description: "Help Shopify merchants find the best path by conversion needs, multilingual operations, and AOV goals.",
            keywords: ["Shopify solutions", "conversion", "localization", "AOV"],
          },
          hero: {
            eyebrow: "Solutions",
            title: "Choose a path by problem, not by generic feature lists",
            description: "Whether you care most about cross-market conversion, multilingual operations, or AOV growth, you can start from the matching scenario.",
            cardMeta: ["Solution", "Shopify"],
          },
          media: {
            eyebrow: "Solutions media",
            title: "Solution page media placeholder",
            description: "A scenario-led visual works well here to help merchants understand each path faster.",
          },
          finalCta: {
            eyebrow: "Next step",
            title: "Use the scenario pages to move into products, comparisons, and docs",
            description: "Once the priority is clear, the next step is usually the matching product page, comparison, or documentation.",
            primaryLabel: "Browse products",
            primaryHref: "/products",
            secondaryLabel: "Browse resources",
            secondaryHref: "/resources",
          },
        };
  const pageUrl = new URL(localizeHref(locale, "/solutions"), siteUrl).toString();
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: copy.structuredData.name, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: copy.structuredData.name,
      description: copy.structuredData.description,
      keywords: [...copy.structuredData.keywords],
      type: "CollectionPage",
    }),
  ];

  return (
    <main>
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`solutions-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}
        <section className="page-section page-hero">
          <SectionHeading
            eyebrow={copy.hero.eyebrow}
            title={copy.hero.title}
            description={copy.hero.description}
            as="h1"
          />
          <div className="resource-grid">
            {solutions.map((solution) => (
              <ArticleCard
                key={solution.slug}
                title={solution.name}
                description={solution.description}
                href={`/solutions/${solution.slug}`}
                meta={[...copy.hero.cardMeta]}
              />
            ))}
          </div>
        </section>
        <MediaPlaceholderSection
          eyebrow={copy.media.eyebrow}
          title={copy.media.title}
          description={copy.media.description}
          items={solutionsIndexMediaBriefs}
          locale={locale}
        />
        <FinalCtaSection
          eyebrow={copy.finalCta.eyebrow}
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
