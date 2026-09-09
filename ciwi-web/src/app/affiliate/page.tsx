import {AffiliateHero} from "@/components/affiliate/AffiliateHero";
import {CommissionTable} from "@/components/affiliate/CommissionTable";
import {HowItWorks} from "@/components/affiliate/HowItWorks";
import {FaqSection} from "@/components/sections/FaqSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {getAffiliateCopy, getAffiliateProducts} from "@/content/affiliate";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const copy = getAffiliateCopy(locale);

  return buildPageMetadata({
    title: copy.hero.title,
    description: copy.hero.description,
    path: "/affiliate",
    locale,
  });
}

export default async function AffiliatePage() {
  const locale = await getRequestLocale();
  const copy = getAffiliateCopy(locale);
  const products = getAffiliateProducts(locale);

  return (
    <main>
      <PageContainer>
        <AffiliateHero copy={copy.hero} />
        <HowItWorks copy={copy.howItWorks} />
        <CommissionTable copy={copy.commission} products={products} />
        <FaqSection eyebrow={copy.faq.eyebrow} title={copy.faq.title} items={copy.faq.items} />
      </PageContainer>
    </main>
  );
}
