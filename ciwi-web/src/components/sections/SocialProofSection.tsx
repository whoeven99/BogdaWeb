import {TestimonialCard} from "@/components/cards/TestimonialCard";
import {SectionHeading} from "@/components/ui/SectionHeading";

type SocialProofSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: {name: string; tag: string; quote: string}[];
};

export function SocialProofSection({eyebrow, title, description, items}: SocialProofSectionProps) {
  return (
    <section className="page-section">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="card-grid">
        {items.map((item) => (
          <TestimonialCard key={item.name} name={item.name} tag={item.tag} quote={item.quote} />
        ))}
      </div>
    </section>
  );
}
