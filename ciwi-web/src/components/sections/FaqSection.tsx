import {SectionHeading} from "@/components/ui/SectionHeading";
import {FaqAccordionList} from "@/components/ui/FaqAccordionList";

type FaqSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: {question: string; answer: string; evidence?: string[]}[];
};

export function FaqSection({eyebrow, title, description, items}: FaqSectionProps) {
  return (
    <section className="py-12 sm:py-14 lg:py-16">
      {title ? <SectionHeading eyebrow={eyebrow} title={title} description={description} /> : null}
      <FaqAccordionList items={items} className={title ? "mt-8" : undefined} />
    </section>
  );
}
