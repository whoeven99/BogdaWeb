import {SectionHeading} from "@/components/ui/SectionHeading";
import {FaqAccordionList} from "@/components/ui/FaqAccordionList";

type FaqSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  items: {question: string; answer: string; evidence?: string[]}[];
  className?: string;
};

export function FaqSection({id, eyebrow, title, description, items, className}: FaqSectionProps) {
  const sectionClass = ["py-12 sm:py-14 lg:py-16", className].filter(Boolean).join(" ");
  return (
    <section id={id} className={sectionClass}>
      {title ? <SectionHeading eyebrow={eyebrow} title={title} description={description} /> : null}
      <FaqAccordionList items={items} className={title ? "mt-8" : undefined} />
    </section>
  );
}
