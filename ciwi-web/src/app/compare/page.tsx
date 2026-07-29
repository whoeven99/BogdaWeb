import {ArticleCard} from "@/components/cards/ArticleCard";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {compareIndexMediaBriefs} from "@/content/media-briefs";
import {getCompares} from "@/content/compare";
import {getRequestLocale} from "@/lib/i18n-server";
import {localizeHref} from "@/lib/i18n";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema} from "@/lib/seo/schema";

export async function generateMetadata() {
  const locale = await getRequestLocale();

  return buildPageMetadata({
    title: locale === "zh-cn" ? "产品对比" : "Compare",
    description:
      locale === "zh-cn"
        ? "帮助 Shopify 商家更快比较不同翻译和本地化方案的适配度与长期成本。"
        : "Compare translation and localization paths faster by workflow fit, maintenance cost, and Shopify compatibility.",
    path: "/compare",
    locale,
  });
}

export default async function ComparePage() {
  const locale = await getRequestLocale();
  const compares = getCompares(locale);
  const copy =
    locale === "zh-cn"
      ? {
          structuredData: {
            name: "产品对比",
            description: "帮助 Shopify 商家更快比较不同翻译和本地化方案的适配度与长期成本。",
            keywords: ["Shopify 对比", "翻译工具对比", "Ciwi"],
          },
          hero: {
            eyebrow: "对比",
            title: "快速看清哪种方案更适合你的店铺阶段",
            description: "从适配深度、维护成本和增长目标三个角度，判断哪条路线更适合当前业务。",
            cardMeta: ["对比", "选型"],
          },
          media: {
            eyebrow: "对比素材",
            title: "对比页视觉预留",
            description: "对比页适合补一张总览型对照图，让差异一眼看明白。",
          },
          finalCta: {
            title: "从比较，进入判断",
            description: "如果你已经看清方向差异，下一步就该进入产品页或帮助文档确认细节。",
            eyebrow: "下一步",
            primaryLabel: "查看 AI Translator",
            primaryHref: "/products/translator",
            secondaryLabel: "浏览帮助中心",
            secondaryHref: "/help-center",
          },
        }
      : {
          structuredData: {
            name: "Compare",
            description: "Compare localization paths for Shopify by workflow depth, long-term cost, and practical fit.",
            keywords: ["Shopify compare", "translation comparison", "Ciwi"],
          },
          hero: {
            eyebrow: "Compare",
            title: "See which path fits your store stage faster",
            description: "Compare options through workflow depth, maintenance cost, and growth goals.",
            cardMeta: ["Compare", "Selection"],
          },
          media: {
            eyebrow: "Compare media",
            title: "Comparison media placeholder",
            description: "A side-by-side visual works well here to clarify the difference before merchants read the details.",
          },
          finalCta: {
            title: "Move from comparison to decision",
            description: "Once the direction is clearer, the next step is usually the product page or the help docs.",
            eyebrow: "Next step",
            primaryLabel: "Open AI Translator",
            primaryHref: "/products/translator",
            secondaryLabel: "Browse help center",
            secondaryHref: "/help-center",
          },
        };
  const pageUrl = new URL(localizeHref(locale, "/compare"), siteUrl).toString();
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
            key={`compare-list-schema-${index}`}
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
            {compares.map((item) => (
              <ArticleCard
                key={item.slug}
                title={item.title}
                description={item.description}
                href={`/compare/${item.slug}`}
                meta={[...copy.hero.cardMeta]}
              />
            ))}
          </div>
        </section>
        <MediaPlaceholderSection
          eyebrow={copy.media.eyebrow}
          title={copy.media.title}
          description={copy.media.description}
          items={compareIndexMediaBriefs}
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
