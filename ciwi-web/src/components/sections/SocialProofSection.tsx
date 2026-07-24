import {TestimonialCard} from "@/components/cards/TestimonialCard";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {homePageCopy} from "@/content/home-page-copy";

export function SocialProofSection() {
  const copy = homePageCopy.socialProof;
  const items = homePageCopy.testimonials;

  return (
    <section className="page-section">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <div className="card-grid">
        {items.map((item) => (
          <TestimonialCard key={item.name} name={item.name} tag={item.tag} quote={item.quote} />
        ))}
      </div>
    </section>
  );
}
