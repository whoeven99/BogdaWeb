import {AffiliateClickTracker} from "@/components/affiliate/AffiliateClickTracker";
import {Button} from "@/components/ui/Button";
import {SectionHeading} from "@/components/ui/SectionHeading";
import type {AffiliateLandingData} from "@/content/affiliate";

type AffiliateLandingProps = {
  data: AffiliateLandingData;
  referralCode?: string;
  productSlug?: string;
};

export function AffiliateLanding({data, referralCode, productSlug}: AffiliateLandingProps) {
  const {copy, offers} = data;

  return (
    <section className="page-section page-hero">
      {referralCode ? <AffiliateClickTracker code={referralCode} product={productSlug} /> : null}
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} as="h1" />
      <div className="card-grid">
        {offers.map((offer) => (
          <article key={offer.slug} className="surface-card affiliate-offer-card">
            <h3>{offer.name}</h3>
            <p className="quote">{offer.description}</p>
            <p className="affiliate-offer-card__benefit">{offer.benefit}</p>
            <Button href={offer.installUrl}>{copy.installLabel}</Button>
          </article>
        ))}
      </div>
    </section>
  );
}
