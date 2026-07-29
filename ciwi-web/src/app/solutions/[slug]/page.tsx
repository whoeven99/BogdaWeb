import {notFound} from "next/navigation";

import {ArticleCard} from "@/components/cards/ArticleCard";
import {FaqSection} from "@/components/sections/FaqSection";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {ProductAnchorNav} from "@/components/sections/ProductAnchorNav";
import {Button} from "@/components/ui/Button";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getSolutionMediaBriefs} from "@/content/media-briefs";
import {getSolutionMap, solutions} from "@/content/solutions";
import {getRequestLocale} from "@/lib/i18n-server";
import {localizeHref} from "@/lib/i18n";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema} from "@/lib/seo/schema";

type SolutionDetailPageProps = {
  params: Promise<{slug: string}>;
};

function getSolutionDetailCopy(locale: "en" | "zh-cn") {
  if (locale === "zh-cn") {
    return {
      notFound: {
        title: "未找到方案",
        description: "你访问的方案页面不存在。",
        path: "/solutions",
      },
      hero: {
        eyebrow: "解决方案",
        secondaryLabel: "联系我们",
        secondaryHref: "/contact",
        panels: {
          overviewTitle: "概览",
          signalsTitle: "常见信号",
        },
      },
      anchors: [
        {label: "常见问题", href: "#challenges"},
        {label: "解决方式", href: "#approach"},
        {label: "相关产品", href: "#products"},
        {label: "相关资源", href: "#resources"},
        {label: "FAQ", href: "#faq"},
      ],
      media: {
        eyebrow: "方案素材",
        title: "方案页素材预留",
        description: "方案页建议同时准备场景图和短视频，让用户更快看到问题如何被解决。",
      },
      sections: {
        challenges: {id: "challenges", eyebrow: "常见问题", title: "常见问题", description: "先看摩擦点，再看解决方式。"},
        approach: {id: "approach", eyebrow: "解决方式", title: "解决方式", description: "把路径拆成几个容易执行的步骤。"},
        products: {id: "products", eyebrow: "相关产品", title: "相关产品", description: "从场景进入对应产品能力。"},
        resources: {id: "resources", eyebrow: "相关资源", title: "相关资源", description: "继续看文档、文章和对比内容。"},
      },
      finalCta: {
        secondaryLabel: "浏览方案",
        secondaryHref: "/solutions",
      },
      breadcrumbLabel: "解决方案",
    };
  }

  return {
    notFound: {
      title: "Solution not found",
      description: "The requested solution page could not be found.",
      path: "/solutions",
    },
    hero: {
      eyebrow: "Solutions",
      secondaryLabel: "Talk to us",
      secondaryHref: "/contact",
      panels: {
        overviewTitle: "Overview",
        signalsTitle: "Common signals",
      },
    },
    anchors: [
      {label: "Challenges", href: "#challenges"},
      {label: "Approach", href: "#approach"},
      {label: "Products", href: "#products"},
      {label: "Resources", href: "#resources"},
      {label: "FAQ", href: "#faq"},
    ],
    media: {
      eyebrow: "Solution media",
      title: "Solution page media placeholder",
      description: "A solution page works best with scenario visuals and short clips that help merchants understand how the problem gets solved.",
    },
    sections: {
      challenges: {id: "challenges", eyebrow: "Challenges", title: "Common challenges", description: "Look at the friction first, then the path forward."},
      approach: {id: "approach", eyebrow: "Approach", title: "Approach", description: "Break the path into a few steps that are easier to execute."},
      products: {id: "products", eyebrow: "Recommended products", title: "Recommended products", description: "Move from the scenario into the matching product capabilities."},
      resources: {id: "resources", eyebrow: "Related resources", title: "Related resources", description: "Continue into docs, articles, and comparison content."},
    },
    finalCta: {
      secondaryLabel: "Browse solutions",
      secondaryHref: "/solutions",
    },
    breadcrumbLabel: "Solutions",
  };
}

export function generateStaticParams() {
  return solutions.map((solution) => ({slug: solution.slug}));
}

export async function generateMetadata({params}: SolutionDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const solution = getSolutionMap(locale)[slug];
  const copy = getSolutionDetailCopy(locale);

  if (!solution) {
    return buildPageMetadata({
      title: copy.notFound.title,
      description: copy.notFound.description,
      path: copy.notFound.path,
      locale,
    });
  }

  return buildPageMetadata({
    title: solution.title,
    description: solution.description,
    path: `/solutions/${solution.slug}`,
    locale,
  });
}

export default async function SolutionDetailPage({params}: SolutionDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const solution = getSolutionMap(locale)[slug];
  const copy = getSolutionDetailCopy(locale);

  if (!solution) {
    notFound();
  }

  const pageUrl = new URL(localizeHref(locale, `/solutions/${solution.slug}`), siteUrl).toString();
  const anchorItems = copy.anchors.map((item) => ({...item}));
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: copy.breadcrumbLabel, item: new URL(localizeHref(locale, "/solutions"), siteUrl).toString()},
      {name: solution.title, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: solution.title,
      description: solution.description,
      keywords: [solution.name, locale === "zh-cn" ? "Shopify 解决方案" : "Shopify solutions", ...solution.targetSignals],
    }),
    buildFaqSchema(solution.faq),
  ];
  const mediaBriefs = getSolutionMediaBriefs(solution);

  return (
    <main>
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`${solution.slug}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}
        <section className="page-section page-hero">
          <div className="detail-grid">
            <div>
              <SectionHeading
                eyebrow={copy.hero.eyebrow}
                title={solution.heroTitle}
                description={solution.heroDescription}
                as="h1"
              />
              <div className="tag-list">
                {solution.targetSignals.map((item) => (
                  <span key={item} className="pill">
                    {item}
                  </span>
                ))}
              </div>
              <div className="inline-list space-top-xl">
                <Button href={solution.ctaHref}>{solution.ctaLabel}</Button>
                <Button href={copy.hero.secondaryHref} variant="secondary">
                  {copy.hero.secondaryLabel}
                </Button>
              </div>
            </div>
            <div className="surface-card section-stack">
              <div>
                <h3>{copy.hero.panels.overviewTitle}</h3>
                <p className="quote">{solution.description}</p>
              </div>
              <div>
                <h3>{copy.hero.panels.signalsTitle}</h3>
                <ul className="check-list">
                  {solution.targetSignals.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <MediaPlaceholderSection
          eyebrow={copy.media.eyebrow}
          title={copy.media.title}
          description={copy.media.description}
          items={mediaBriefs}
          locale={locale}
        />

        <ProductAnchorNav items={anchorItems} />

        <section className="page-section anchor-offset" id={copy.sections.challenges.id}>
          <SectionHeading
            eyebrow={copy.sections.challenges.eyebrow}
            title={copy.sections.challenges.title}
            description={copy.sections.challenges.description}
          />
          <div className="card-grid">
            {solution.challenges.map((item) => (
              <article key={item} className="surface-card">
                <p className="quote">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section anchor-offset" id={copy.sections.approach.id}>
          <SectionHeading
            eyebrow={copy.sections.approach.eyebrow}
            title={copy.sections.approach.title}
            description={copy.sections.approach.description}
          />
          <div className="card-grid">
            {solution.approach.map((item, index) => (
              <article key={item.title} className="surface-card">
                <h3>{`0${index + 1}`}</h3>
                <p className="quote">
                  <strong>{item.title}</strong>
                </p>
                <p className="quote">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section anchor-offset" id={copy.sections.products.id}>
          <SectionHeading
            eyebrow={copy.sections.products.eyebrow}
            title={copy.sections.products.title}
            description={copy.sections.products.description}
          />
          <div className="resource-grid">
            {solution.recommendedProducts.map((item) => (
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

        <section className="page-section anchor-offset" id={copy.sections.resources.id}>
          <SectionHeading
            eyebrow={copy.sections.resources.eyebrow}
            title={copy.sections.resources.title}
            description={copy.sections.resources.description}
          />
          <div className="resource-grid">
            {solution.relatedResources.map((item) => (
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

        <div id="faq" className="anchor-offset" />
        <FaqSection items={solution.faq} />
        <FinalCtaSection
          title={`Explore ${solution.name}`}
          description={solution.description}
          primaryLabel={solution.ctaLabel}
          primaryHref={solution.ctaHref}
          secondaryLabel={copy.finalCta.secondaryLabel}
          secondaryHref={copy.finalCta.secondaryHref}
        />
      </PageContainer>
    </main>
  );
}
