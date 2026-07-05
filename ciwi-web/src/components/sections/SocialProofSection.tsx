import {TestimonialCard} from "@/components/cards/TestimonialCard";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {testimonials} from "@/content/home";

export function SocialProofSection() {
  return (
    <section className="page-section">
      <SectionHeading
        eyebrow="Proof"
        title="让真实商家反馈替代空泛卖点"
        description="可信度来自实际商家场景、使用体验和可验证的结果，而不是堆砌技术名词。"
      />
      <div className="card-grid">
        {testimonials.map((item) => (
          <TestimonialCard key={item.name} name={item.name} tag={item.tag} quote={item.quote} />
        ))}
      </div>
    </section>
  );
}
