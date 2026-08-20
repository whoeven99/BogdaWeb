import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {FaqSection} from "@/components/sections/FaqSection";
import {HeroSection} from "@/components/sections/HeroSection";
import {OutcomeSection} from "@/components/sections/OutcomeSection";
import {ProductMatrixSection} from "@/components/sections/ProductMatrixSection";
import {ResourcesSection} from "@/components/sections/ResourcesSection";
import {SocialProofSection} from "@/components/sections/SocialProofSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {getHomePageCopy} from "@/content/home-page-copy";
import {getProducts} from "@/content/products";
import {getUiCopy} from "@/content/ui-copy";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const copy = getHomePageCopy(locale);

  return buildPageMetadata({
    title: locale === "en" ? "Shopify AI Growth Platform" : "Shopify AI 增长平台",
    description: copy.hero.description,
    path: "/",
    locale,
  });
}

export default async function HomePage() {
  const locale = await getRequestLocale();
  const copy = getHomePageCopy(locale);
  const uiCopy = getUiCopy(locale);
  const products = getProducts(locale);

  return (
    <main>
      <PageContainer>
        <HeroSection
          eyebrow={copy.hero.eyebrow}
          title={copy.hero.title}
          description={copy.hero.description}
          proofItems={[...copy.hero.proofItems]}
          primaryCtaLabel={copy.hero.primaryCtaLabel}
          primaryCtaHref={copy.hero.primaryCtaHref}
          secondaryCtaLabel={copy.hero.secondaryCtaLabel}
          secondaryCtaHref={copy.hero.secondaryCtaHref}
          brandName={copy.hero.brandName}
          brandTagline={copy.hero.brandTagline}
          visualWindowTitle={copy.hero.visualWindowTitle}
          visualChips={[...copy.hero.visualChips]}
          visualAlt={{...copy.hero.visualAlt}}
        />
        <ProductMatrixSection
          eyebrow={copy.productMatrix.eyebrow}
          title={copy.productMatrix.title}
          description={copy.productMatrix.description}
          products={products}
        />
        <OutcomeSection
          eyebrow={copy.outcomes.eyebrow}
          title={copy.outcomes.title}
          description={copy.outcomes.description}
          items={copy.outcomeItems.map((item) => ({...item}))}
        />
        <SocialProofSection
          eyebrow={copy.socialProof.eyebrow}
          title={copy.socialProof.title}
          description={copy.socialProof.description}
          items={copy.testimonials.map((item) => ({...item}))}
        />
        <ResourcesSection
          eyebrow={copy.resources.eyebrow}
          title={copy.resources.title}
          description={copy.resources.description}
          items={copy.featuredResources.map((item) => ({...item, meta: [...item.meta]}))}
          subscription={{...copy.resources.subscription, highlights: [...copy.resources.subscription.highlights], source: "home_newsletter"}}
        />
        <FaqSection
          eyebrow={copy.faq.eyebrow}
          title={copy.faq.title}
          description={copy.faq.description}
          items={copy.homeFaq.map((item) => ({...item}))}
        />
        <FinalCtaSection
          eyebrow={copy.finalCta.eyebrow ?? uiCopy.sections.nextStepEyebrow}
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
