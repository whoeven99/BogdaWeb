import {notFound} from "next/navigation";

import {FaqSection} from "@/components/sections/FaqSection";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {ArticleCard} from "@/components/cards/ArticleCard";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getCompareMap, getCompares, compares} from "@/content/compare";
import {getBlogPosts} from "@/content/blog";
import {getCompareMediaBriefs} from "@/content/media-briefs";
import {getHelpCenterDocs} from "@/content/help-center";
import {localizeHref} from "@/lib/i18n";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema} from "@/lib/seo/schema";

type CompareDetailPageProps = {
  params: Promise<{slug: string}>;
};

function getCompareDetailCopy(locale: "en" | "zh-cn") {
  return locale === "zh-cn"
    ? {
        notFound: {
          title: "未找到对比页",
          description: "你访问的对比页面不存在。",
          path: "/compare",
        },
        hero: {
          eyebrow: "对比",
          panels: {
            summaryTitle: "总结",
            bestFitTitle: "更适合谁",
          },
        },
        media: {
          eyebrow: "对比素材",
          title: "对比页视觉预留",
          description: "对比页适合补一张并排对照图，让用户在读维度之前先感受到两条路径的差异。",
        },
        sections: {
          dimensions: {
            eyebrow: "关键维度",
            title: "关键差异",
            description: "先看真正影响选型判断的几个维度。",
            ciwiLabel: "Ciwi",
            alternativeLabel: "对比方案",
          },
          highlights: {
            eyebrow: "结论",
            title: "简明结论",
            description: "先看最影响选型判断的差异。",
          },
          continue: {
            eyebrow: "继续查看",
            title: "继续查看",
            description: "从这里继续看产品页、文章和帮助文档。",
            siblingMeta: ["对比", "替代方案"],
            translatorCard: {
              title: "AI Translator",
              description: "回到产品页，直接看适用场景、Demo 和关键能力。",
              href: "/products/translator",
              meta: ["产品", "Translator"],
            },
          },
        },
        finalCta: {
          title: "从比较，进入判断",
          description: "如果你已经看清方向差异，下一步就该进入产品页或帮助文档确认细节。",
          primaryLabel: "查看 AI Translator",
          primaryHref: "/products/translator",
          secondaryLabel: "浏览对比页",
          secondaryHref: "/compare",
        },
        breadcrumbLabel: "对比",
        keywordLabel: "Shopify 对比",
      }
    : {
        notFound: {
          title: "Compare not found",
          description: "The requested compare page could not be found.",
          path: "/compare",
        },
        hero: {
          eyebrow: "Compare",
          panels: {
            summaryTitle: "Summary",
            bestFitTitle: "Best fit for",
          },
        },
        media: {
          eyebrow: "Compare media",
          title: "Comparison media placeholder",
          description: "A side-by-side visual works well here so visitors can feel the difference before reading the detailed dimensions.",
        },
        sections: {
          dimensions: {
            eyebrow: "Dimensions",
            title: "Key differences",
            description: "Start with the differences that matter most for product evaluation.",
            ciwiLabel: "Ciwi",
            alternativeLabel: "Alternative",
          },
          highlights: {
            eyebrow: "Highlights",
            title: "Quick conclusions",
            description: "Start with the differences that affect selection most directly.",
          },
          continue: {
            eyebrow: "Continue reading",
            title: "Continue reading",
            description: "From here, continue into the product page, articles, and help docs.",
            siblingMeta: ["Compare", "Alternative"],
            translatorCard: {
              title: "AI Translator",
              description: "Return to the product page for scenarios, demo, and core capabilities.",
              href: "/products/translator",
              meta: ["Product", "Translator"],
            },
          },
        },
        finalCta: {
          title: "Move from comparison to decision",
          description: "Once the direction difference is clear, the next step is usually the product page or help docs.",
          primaryLabel: "Open AI Translator",
          primaryHref: "/products/translator",
          secondaryLabel: "Browse compare pages",
          secondaryHref: "/compare",
        },
        breadcrumbLabel: "Compare",
        keywordLabel: "Shopify compare",
      };
}

export function generateStaticParams() {
  return compares.map((item) => ({slug: item.slug}));
}

export async function generateMetadata({params}: CompareDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const data = getCompareMap(locale)[slug];
  const copy = getCompareDetailCopy(locale);

  if (!data) {
    return buildPageMetadata({
      title: copy.notFound.title,
      description: copy.notFound.description,
      path: copy.notFound.path,
      locale,
    });
  }

  return buildPageMetadata({
    title: data.title,
    description: data.description,
    path: `/compare/${data.slug}`,
    locale,
  });
}

export default async function CompareDetailPage({params}: CompareDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const data = getCompareMap(locale)[slug];
  const copy = getCompareDetailCopy(locale);
  const compares = getCompares(locale);
  const blogPosts = getBlogPosts(locale);
  const helpCenterDocs = getHelpCenterDocs(locale);

  if (!data) {
    notFound();
  }

  const pageUrl = new URL(localizeHref(locale, `/compare/${data.slug}`), siteUrl).toString();
  const siblingCompares = compares.filter((item) => item.slug !== data.slug).slice(0, 2);
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: copy.breadcrumbLabel, item: new URL(localizeHref(locale, "/compare"), siteUrl).toString()},
      {name: data.title, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: data.title,
      description: data.description,
      keywords: [copy.keywordLabel, data.title, ...data.bestFor],
    }),
    buildFaqSchema(data.faq),
  ];
  const mediaBriefs = getCompareMediaBriefs(data);

  return (
    <main>
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`${data.slug}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}
        <section className="page-section page-hero">
          <SectionHeading eyebrow={copy.hero.eyebrow} title={data.title} description={data.description} as="h1" />
          <div className="detail-grid">
            <article className="surface-card">
              <h3>{copy.hero.panels.summaryTitle}</h3>
              <p className="quote">{data.summary}</p>
            </article>
            <article className="surface-card">
              <h3>{copy.hero.panels.bestFitTitle}</h3>
              <ul className="check-list">
                {data.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <MediaPlaceholderSection
          eyebrow={copy.media.eyebrow}
          title={copy.media.title}
          description={copy.media.description}
          items={mediaBriefs}
          locale={locale}
        />

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.sections.dimensions.eyebrow}
            title={copy.sections.dimensions.title}
            description={copy.sections.dimensions.description}
          />
          <div className="faq-list">
            {data.dimensions.map((dimension) => (
              <article key={dimension.label} className="surface-card section-stack">
                <h3>{dimension.label}</h3>
                <div className="detail-grid">
                  <div>
                    <div className="section-heading__eyebrow">{copy.sections.dimensions.ciwiLabel}</div>
                    <p className="quote">{dimension.ciwi}</p>
                  </div>
                  <div>
                    <div className="section-heading__eyebrow">{copy.sections.dimensions.alternativeLabel}</div>
                    <p className="quote">{dimension.alternative}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.sections.highlights.eyebrow}
            title={copy.sections.highlights.title}
            description={copy.sections.highlights.description}
          />
          <div className="card-grid">
            {data.highlights.map((highlight) => (
              <article key={highlight} className="surface-card">
                <p className="quote">{highlight}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.sections.continue.eyebrow}
            title={copy.sections.continue.title}
            description={copy.sections.continue.description}
          />
          <div className="resource-grid">
            {siblingCompares.map((item) => (
              <ArticleCard
                key={item.slug}
                title={item.title}
                description={item.description}
                href={`/compare/${item.slug}`}
                meta={[...copy.sections.continue.siblingMeta]}
              />
            ))}
            <ArticleCard
              title={blogPosts[0].title}
              description={blogPosts[0].description}
              href={blogPosts[0].href}
              meta={[locale === "zh-cn" ? "博客" : "Blog", blogPosts[0].publishedAt]}
            />
            <ArticleCard
              title={helpCenterDocs[0].title}
              description={helpCenterDocs[0].description}
              href={helpCenterDocs[0].href}
              meta={helpCenterDocs[0].meta}
            />
            <ArticleCard
              title={copy.sections.continue.translatorCard.title}
              description={copy.sections.continue.translatorCard.description}
              href={copy.sections.continue.translatorCard.href}
              meta={[...copy.sections.continue.translatorCard.meta]}
            />
          </div>
        </section>

        <FaqSection items={data.faq} />
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
