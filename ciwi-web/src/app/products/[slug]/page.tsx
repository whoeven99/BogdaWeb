import {ArticleCard} from "@/components/cards/ArticleCard";
import {DemoShowcaseSection} from "@/components/sections/DemoShowcaseSection";
import {InteractiveDemoExplorer} from "@/components/sections/InteractiveDemoExplorer";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {ProductAnchorNav} from "@/components/sections/ProductAnchorNav";
import {ProductFeatureSpotlightsSection} from "@/components/sections/ProductFeatureSpotlightsSection";
import {Button} from "@/components/ui/Button";
import {notFound} from "next/navigation";

import {FaqSection} from "@/components/sections/FaqSection";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {detailPagesCopy} from "@/content/detail-pages-copy";
import {getProductDemoMediaBriefs, getProductHeroMediaBriefs} from "@/content/media-briefs";
import {productMap, products} from "@/content/products";
import {uiCopy} from "@/content/ui-copy";
import {buildPageMetadata} from "@/lib/seo/metadata";
import type {CSSProperties} from "react";

type ProductDetailPageProps = {
  params: Promise<{slug: string}>;
};

function formatRatingValue(value: number) {
  return value.toFixed(1);
}

export async function generateStaticParams() {
  return products.map((product) => ({slug: product.slug}));
}

export async function generateMetadata({params}: ProductDetailPageProps) {
  const {slug} = await params;
  const product = productMap[slug];

  if (!product) {
    return buildPageMetadata({
      title: detailPagesCopy.products.notFound.title,
      description: detailPagesCopy.products.notFound.description,
      path: detailPagesCopy.products.notFound.path,
    });
  }

  return buildPageMetadata({
    title: product.name,
    description: product.heroDescription,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductDetailPage({params}: ProductDetailPageProps) {
  const {slug} = await params;
  const product = productMap[slug];
  const copy = detailPagesCopy.products;

  if (!product) {
    notFound();
  }

  const isTranslator = product.slug === "translator";
  const translatorCopy = isTranslator ? copy.translator : null;
  const anchorItems = (isTranslator ? translatorCopy?.anchors : copy.anchors)?.map((item) => ({...item})) ?? [];
  const heroMediaBriefs = isTranslator ? [] : getProductHeroMediaBriefs(product);
  const demoMediaBriefs = isTranslator ? [] : getProductDemoMediaBriefs(product);
  const hasRating = typeof product.rating === "number" && product.rating > 0;
  const starsStyle = hasRating ? ({"--rating": product.rating} as CSSProperties) : undefined;

  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero">
          <div className="detail-grid">
            <div>
              <SectionHeading
                eyebrow={copy.hero.eyebrow}
                title={product.heroTitle}
                description={product.heroDescription}
                as="h1"
              />
              <div className="tag-list">
                {product.metrics.map((metric) => (
                  <span key={metric} className="pill">
                    {metric}
                  </span>
                ))}
              </div>
              <div className="inline-list space-top-xl">
                <Button href={product.ctaHref}>{product.ctaLabel}</Button>
                <Button href={copy.hero.viewDemoHref} variant="secondary">
                  {copy.hero.viewDemoLabel}
                </Button>
              </div>
            </div>
            {isTranslator && translatorCopy ? (
              <div className="surface-card section-stack">
                <div>
                  <h3>{translatorCopy.hero.reviewsTitle}</h3>
                  {hasRating ? (
                    <div className="product-rating">
                      <span className="product-rating__stars" style={starsStyle} aria-hidden="true">
                        ★★★★★
                      </span>
                      <span className="product-rating__value">{formatRatingValue(product.rating!)}</span>
                      {product.reviewCount ? (
                        <span>
                          {product.reviewCount} {uiCopy.products.reviewsLabel}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="product-card__reviews">
                    {product.reviewSnippets?.slice(0, 2).map((snippet) => (
                      <p key={snippet} className="product-card__review">
                        “{snippet}”
                      </p>
                    ))}
                  </div>
                </div>
                {product.compareLinks?.length ? (
                  <div>
                    <h3>{translatorCopy.hero.compareTitle}</h3>
                    <div className="product-detail-links">
                      {product.compareLinks.map((item) => (
                        <a key={item.href} href={item.href} className="product-detail-link">
                          <strong>{item.title}</strong>
                          <span>{item.description}</span>
                        </a>
                      ))}
                    </div>
                    <div className="space-top-lg">
                      <a href={translatorCopy.hero.browseCompareHref} className="site-nav__link">
                        {translatorCopy.hero.browseCompareLabel}
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="surface-card section-stack">
                <div>
                  <h3>{copy.hero.panels.targetUsersTitle}</h3>
                  <ul className="check-list">
                    {product.targetUsers.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>{copy.hero.panels.benefitsTitle}</h3>
                  <ul className="check-list">
                    {product.benefits.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>{copy.hero.panels.demoHighlightsTitle}</h3>
                  <div className="tag-list">
                    {product.demoHighlights.map((item) => (
                      <span key={item} className="pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {!isTranslator ? (
          <MediaPlaceholderSection
            eyebrow={copy.media.hero.eyebrow}
            title={copy.media.hero.title}
            description={copy.media.hero.description}
            items={heroMediaBriefs}
          />
        ) : null}

        <ProductAnchorNav items={anchorItems} />

        <section className="page-section anchor-offset" id={copy.sections.useCases.id}>
          <SectionHeading
            eyebrow={copy.sections.useCases.eyebrow}
            title={copy.sections.useCases.title}
            description={copy.sections.useCases.description}
          />
          <div className="card-grid">
            {product.useCases.map((useCase) => (
              <article key={useCase.title} className="surface-card">
                <h3>{useCase.title}</h3>
                <p className="quote">{useCase.description}</p>
              </article>
            ))}
          </div>
        </section>

        {isTranslator && translatorCopy ? (
          <>
            <div id="models" className="anchor-offset" />
            <div id="engines" className="anchor-offset" />
            <div id="glossary" className="anchor-offset" />
            <div id="languages" className="anchor-offset" />
            <div id="localization" className="anchor-offset" />
            <ProductFeatureSpotlightsSection
              id={translatorCopy.sections.featureSpotlights.id}
              eyebrow={translatorCopy.sections.featureSpotlights.eyebrow}
              title={translatorCopy.sections.featureSpotlights.title}
              description={translatorCopy.sections.featureSpotlights.description}
              items={product.featureModules ?? []}
            />
            <section className="page-section anchor-offset" id={translatorCopy.sections.comparisons.id}>
              <SectionHeading
                eyebrow={translatorCopy.sections.comparisons.eyebrow}
                title={translatorCopy.sections.comparisons.title}
                description={translatorCopy.sections.comparisons.description}
              />
              <div className="resource-grid">
                {product.compareLinks?.map((item) => (
                  <ArticleCard
                    key={item.href}
                    title={item.title}
                    description={item.description}
                    href={item.href}
                    meta={item.meta}
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="page-section anchor-offset" id={copy.sections.demoFocus.id}>
              <SectionHeading
                eyebrow={copy.sections.demoFocus.eyebrow}
                title={copy.sections.demoFocus.title}
                description={copy.sections.demoFocus.description}
              />
              <div className="card-grid">
                {product.demoHighlights.map((item, index) => (
                  <article key={item} className="surface-card">
                    <h3>{`0${index + 1}`}</h3>
                    <p className="quote">{item}</p>
                  </article>
                ))}
              </div>
            </section>

            <InteractiveDemoExplorer
              eyebrow={copy.sections.interactiveDemo.eyebrow}
              title={copy.sections.interactiveDemo.title}
              description={copy.sections.interactiveDemo.description}
              items={product.demoScenarios}
            />

            <DemoShowcaseSection
              eyebrow={copy.sections.livePreview.eyebrow}
              title={copy.sections.livePreview.title}
              description={copy.sections.livePreview.description}
              items={product.demoScenarios.slice(0, 2)}
            />

            <MediaPlaceholderSection
              eyebrow={copy.media.demo.eyebrow}
              title={copy.media.demo.title}
              description={copy.media.demo.description}
              items={demoMediaBriefs}
            />

            <section className="page-section anchor-offset" id={copy.sections.audienceFit.id}>
              <SectionHeading
                eyebrow={copy.sections.audienceFit.eyebrow}
                title={copy.sections.audienceFit.title}
                description={copy.sections.audienceFit.description}
              />
              <div className="detail-grid">
                <div className="surface-card">
                  <h3>{copy.sections.audienceFit.targetUsersTitle}</h3>
                  <ul>
                    {product.targetUsers.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="surface-card">
                  <h3>{copy.sections.audienceFit.benefitsTitle}</h3>
                  <ul>
                    {product.benefits.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="page-section anchor-offset" id={copy.sections.features.id}>
              <SectionHeading
                eyebrow={copy.sections.features.eyebrow}
                title={copy.sections.features.title}
                description={copy.sections.features.description}
              />
              <div className="card-grid">
                {product.features.map((feature) => (
                  <article key={feature.title} className="feature-card">
                    <h3>{feature.title}</h3>
                    <p className="quote">{feature.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="page-section anchor-offset" id={copy.sections.workflow.id}>
              <SectionHeading
                eyebrow={copy.sections.workflow.eyebrow}
                title={copy.sections.workflow.title}
                description={copy.sections.workflow.description}
              />
              <div className="card-grid">
                {product.workflow.map((step, index) => (
                  <article key={step} className="surface-card">
                    <h3>{`0${index + 1}`}</h3>
                    <p className="quote">{step}</p>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        <section className="page-section anchor-offset" id={copy.sections.resources.id}>
          <SectionHeading
            eyebrow={copy.sections.resources.eyebrow}
            title={copy.sections.resources.title}
            description={copy.sections.resources.description}
          />
          <div className="resource-grid">
            {product.relatedResources.map((resource) => (
              <ArticleCard
                key={`${resource.title}-${resource.href}`}
                title={resource.title}
                description={product.shortDescription}
                href={resource.href}
                meta={resource.meta}
              />
            ))}
          </div>
        </section>

        <div id="faq" className="anchor-offset" />
        <FaqSection items={product.faq} />
        <FinalCtaSection
          title={`Explore ${product.name}`}
          description={product.shortDescription}
          primaryLabel={product.ctaLabel}
          primaryHref={product.ctaHref}
          secondaryLabel={copy.finalCta.secondaryLabel}
          secondaryHref={copy.finalCta.secondaryHref}
        />
      </PageContainer>
    </main>
  );
}
