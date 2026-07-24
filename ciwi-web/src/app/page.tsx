import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {FaqSection} from "@/components/sections/FaqSection";
import {HeroSection} from "@/components/sections/HeroSection";
import {OutcomeSection} from "@/components/sections/OutcomeSection";
import {ProductMatrixSection} from "@/components/sections/ProductMatrixSection";
import {ResourcesSection} from "@/components/sections/ResourcesSection";
import {SocialProofSection} from "@/components/sections/SocialProofSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {homePageCopy} from "@/content/home-page-copy";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Shopify AI Growth Platform",
  description: "Ciwi 帮 Shopify 商家提升多语言转化、降低内容维护成本，并用更清晰的页面表达带动增长。",
  path: "/",
});

export default function HomePage() {
  const copy = homePageCopy;

  return (
    <main>
      <PageContainer>
        <HeroSection
          title={copy.hero.title}
          description={copy.hero.description}
          proofItems={[...copy.hero.proofItems]}
        />
        <ProductMatrixSection />
        <OutcomeSection />
        <SocialProofSection />
        <ResourcesSection />
        <FaqSection items={copy.homeFaq.map((item) => ({...item}))} />
        <FinalCtaSection
          title={copy.finalCta.title}
          description={copy.finalCta.description}
        />
      </PageContainer>
    </main>
  );
}
