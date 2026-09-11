import {ArticleCard} from "@/components/cards/ArticleCard";
import {FaqSection} from "@/components/sections/FaqSection";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {UseCaseKeywordPlayground} from "@/components/sections/UseCaseKeywordPlayground";
import {Button} from "@/components/ui/Button";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getProductMap} from "@/content/products";
import {getProductPlaybookHref, getRelatedUseCases, getUseCaseMap, useCases} from "@/content/use-cases";
import {localizeHref} from "@/lib/i18n";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema} from "@/lib/seo/schema";
import {notFound} from "next/navigation";

type UseCaseDetailPageProps = {
  params: Promise<{slug: string}>;
};

function getPageCopy(locale: "en" | "zh-cn") {
  if (locale === "zh-cn") {
    return {
      notFound: {
        title: "未找到 use case",
        description: "你访问的 use case 页面不存在。",
      },
      hero: {
        eyebrow: "Use Case",
        primaryLabel: "查看产品页",
          secondaryLabel: "查看产品 playbook",
      },
      sections: {
        keywordPlayground: {
          eyebrow: "关键词预览",
          variablesTitle: "变量填写",
          previewTitle: "实时预览",
          previewDescription: "通过填写变量，快速查看这个 use case 页面在关键词和文案角度上的变化。",
        },
        previewModule: {
          eyebrow: "演示模块",
          highlightsTitle: "这个模块可以先承接什么",
        },
        fit: {
          eyebrow: "适用情况",
          title: "这个 use case 什么时候最有价值",
          description: "先看适用团队和触发信号，比先看功能列表更容易判断是否匹配。",
          audienceTitle: "适合谁",
          signalsTitle: "常见触发信号",
        },
        workflow: {
          eyebrow: "How it works",
          title: "建议按这个顺序推进",
          description: "这部分沿用模板页思路，把复杂工作流拆成几个更容易执行的步骤。",
        },
        deliverables: {
          eyebrow: "What you get",
          title: "推进完之后，团队会得到什么",
          description: "不是只看功能，而是看这套 use case 最终交付了哪些可执行结果。",
        },
        outcomes: {
          eyebrow: "Why it matters",
          title: "这套 use case 更适合解决什么问题",
          description: "用几个最直接的经营结果，帮助用户快速判断这页值不值得继续看。",
        },
        related: {
          eyebrow: "Related use cases",
          title: "继续看相关场景",
          description: "同一个产品下的其他场景，通常更容易继续扩成一组模板页。",
        },
        faq: {
          eyebrow: "FAQ",
          title: "常见问题",
          description: "围绕这个 use case 最常见的判断和疑问。",
        },
      },
      finalCta: {
        eyebrow: "下一步",
          secondaryLabel: "查看产品 playbook",
          secondaryHref: "",
      },
    };
  }

  return {
    notFound: {
      title: "Use case not found",
      description: "The requested use case page could not be found.",
    },
    hero: {
      eyebrow: "Use Case",
      primaryLabel: "View product page",
      secondaryLabel: "Open product playbook",
    },
    sections: {
      keywordPlayground: {
        eyebrow: "Keyword playground",
        variablesTitle: "Variables",
        previewTitle: "Live preview",
        previewDescription: "Update the variables to inspect how the keyword and page framing change before the app is directly connected to the site.",
      },
      previewModule: {
        eyebrow: "Demo module",
        highlightsTitle: "What this module can hold first",
      },
      fit: {
        eyebrow: "Best fit",
        title: "When this use case is most useful",
        description: "Starting with the team fit and trigger signals makes evaluation easier than starting from a feature list.",
        audienceTitle: "Who this is for",
        signalsTitle: "Common trigger signals",
      },
      workflow: {
        eyebrow: "How it works",
        title: "A practical workflow order",
        description: "This follows the landing page template approach: turn the workflow into a few clear steps instead of a long feature explanation.",
      },
      deliverables: {
        eyebrow: "What you get",
        title: "What the team gets after running this workflow",
        description: "Focus on the practical outputs of the use case, not just the product capabilities involved.",
      },
      outcomes: {
        eyebrow: "Why it matters",
        title: "What this workflow helps solve",
        description: "A short set of outcomes helps the reader decide quickly whether the page deserves more time.",
      },
      related: {
        eyebrow: "Related use cases",
        title: "Explore adjacent workflows",
        description: "Other workflows under the same product are usually the easiest next set to scale into more landing pages.",
      },
      faq: {
        eyebrow: "FAQ",
        title: "Common questions",
        description: "A few of the most common questions teams ask when evaluating this workflow.",
      },
    },
    finalCta: {
      eyebrow: "Next step",
      secondaryLabel: "Open product playbook",
      secondaryHref: "",
    },
  };
}

export async function generateStaticParams() {
  return useCases.map((item) => ({slug: item.slug}));
}

export async function generateMetadata({params}: UseCaseDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const useCase = getUseCaseMap(locale)[slug];
  const copy = getPageCopy(locale);

  if (!useCase) {
    return buildPageMetadata({
      title: copy.notFound.title,
      description: copy.notFound.description,
      path: "/use-cases",
      locale,
    });
  }

  return buildPageMetadata({
    title: useCase.title,
    description: useCase.description,
    path: `/use-cases/${useCase.slug}`,
    locale,
  });
}

export default async function UseCaseDetailPage({params}: UseCaseDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const copy = getPageCopy(locale);
  const useCase = getUseCaseMap(locale)[slug];

  if (!useCase) {
    notFound();
  }

  const product = getProductMap(locale)[useCase.productSlug];
  const relatedUseCases = getRelatedUseCases(locale, useCase.slug);
  const pageUrl = new URL(localizeHref(locale, `/use-cases/${useCase.slug}`), siteUrl).toString();
  const productHref = `/products/${useCase.productSlug}`;
  const playbookHref = getProductPlaybookHref(useCase.productSlug);
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "Use Cases" : "Use Cases", item: new URL(localizeHref(locale, "/use-cases"), siteUrl).toString()},
      {name: useCase.title, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: useCase.title,
      description: useCase.description,
      keywords: [useCase.category, product?.name ?? useCase.productSlug, ...useCase.outcomes],
    }),
    buildFaqSchema(useCase.faq),
  ];

  return (
    <main>
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`${useCase.slug}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}

        <section className="page-section page-hero">
          <div className="detail-grid detail-grid--single">
            <div>
              <SectionHeading
                eyebrow={copy.hero.eyebrow}
                title={useCase.heroTitle}
                description={useCase.heroDescription}
                as="h1"
              />
              <div className="tag-list">
                <span className="pill">{product?.name ?? useCase.productSlug}</span>
                <span className="pill">{useCase.category}</span>
              </div>
              <div className="inline-list space-top-xl">
                <Button href={productHref}>{copy.hero.primaryLabel}</Button>
                  <Button href={playbookHref} variant="secondary">
                  {copy.hero.secondaryLabel}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {useCase.keywordPlayground ? (
          <div className="anchor-offset">
            <UseCaseKeywordPlayground
              eyebrow={copy.sections.keywordPlayground.eyebrow}
              title={useCase.keywordPlayground.title}
              description={useCase.keywordPlayground.description}
              variablesTitle={copy.sections.keywordPlayground.variablesTitle}
              previewTitle={copy.sections.keywordPlayground.previewTitle}
              previewDescription={copy.sections.keywordPlayground.previewDescription}
              variables={useCase.keywordPlayground.variables}
              templates={useCase.keywordPlayground.templates}
              note={useCase.keywordPlayground.note}
            />
          </div>
        ) : null}

        {useCase.previewModule ? (
          <section className="page-section">
            <SectionHeading
              eyebrow={copy.sections.previewModule.eyebrow}
              title={useCase.previewModule.title}
              description={useCase.previewModule.description}
            />
            {useCase.previewModule.type === "video" && useCase.previewModule.videoUrl ? (
              <div className="surface-card section-stack">
                <div className="mdx-video">
                  <div className="mdx-video__frame">
                    <iframe
                      src={useCase.previewModule.videoUrl}
                      title={`${useCase.title} demo`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  {useCase.previewModule.caption ? <p className="mdx-video__caption">{useCase.previewModule.caption}</p> : null}
                </div>
                {useCase.previewModule.highlights?.length ? (
                  <div>
                    <h3>{copy.sections.previewModule.highlightsTitle}</h3>
                    <div className="tag-list">
                      {useCase.previewModule.highlights.map((item) => (
                        <span key={item} className="pill">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="surface-card section-stack">
                {useCase.previewModule.highlights?.length ? (
                  <div>
                    <h3>{copy.sections.previewModule.highlightsTitle}</h3>
                    <ul className="check-list">
                      {useCase.previewModule.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {useCase.previewModule.note ? <p className="quote">{useCase.previewModule.note}</p> : null}
              </div>
            )}
          </section>
        ) : null}

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.sections.fit.eyebrow}
            title={copy.sections.fit.title}
            description={copy.sections.fit.description}
          />
          <div className="detail-grid">
            <article className="surface-card">
              <h3>{copy.sections.fit.audienceTitle}</h3>
              <ul className="check-list">
                {useCase.audience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="surface-card">
              <h3>{copy.sections.fit.signalsTitle}</h3>
              <ul className="check-list">
                {useCase.signals.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.sections.workflow.eyebrow}
            title={copy.sections.workflow.title}
            description={copy.sections.workflow.description}
          />
          <div className="card-grid">
            {useCase.workflow.map((step, index) => (
              <article key={step.title} className="surface-card">
                <h3>{`0${index + 1}`}</h3>
                <p className="quote">
                  <strong>{step.title}</strong>
                </p>
                <p className="quote">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.sections.deliverables.eyebrow}
            title={copy.sections.deliverables.title}
            description={copy.sections.deliverables.description}
          />
          <div className="card-grid">
            {useCase.deliverables.map((item) => (
              <article key={item.title} className="feature-card">
                <h3>{item.title}</h3>
                <p className="quote">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.sections.outcomes.eyebrow}
            title={copy.sections.outcomes.title}
            description={copy.sections.outcomes.description}
          />
          <div className="card-grid">
            {useCase.outcomes.map((item) => (
              <article key={item} className="surface-card">
                <p className="quote">{item}</p>
              </article>
            ))}
          </div>
        </section>

        {relatedUseCases.length > 0 ? (
          <section className="page-section">
            <SectionHeading
              eyebrow={copy.sections.related.eyebrow}
              title={copy.sections.related.title}
              description={copy.sections.related.description}
            />
            <div className="resource-grid">
              {relatedUseCases.map((item) => (
                <ArticleCard
                  key={item.slug}
                  title={item.title}
                  description={item.description}
                  href={`/use-cases/${item.slug}`}
                  meta={[item.category, getProductMap(locale)[item.productSlug]?.name ?? item.productSlug]}
                />
              ))}
            </div>
          </section>
        ) : null}

        <FaqSection
          eyebrow={copy.sections.faq.eyebrow}
          title={copy.sections.faq.title}
          description={copy.sections.faq.description}
          items={useCase.faq}
        />

        <FinalCtaSection
          eyebrow={copy.finalCta.eyebrow}
          title={useCase.title}
          description={useCase.description}
          primaryLabel={useCase.ctaLabel}
          primaryHref={useCase.ctaHref}
          secondaryLabel={copy.finalCta.secondaryLabel}
          secondaryHref={playbookHref}
        />
      </PageContainer>
    </main>
  );
}
