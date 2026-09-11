import {SectionHeading} from "@/components/ui/SectionHeading";

type OutcomeSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: {title: string; description: string}[];
};

export function OutcomeSection({eyebrow, title, description, items}: OutcomeSectionProps) {
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={item.title}
            className="rounded-[28px] bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(255,255,255,0.94))] p-7 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.14)] sm:p-8"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-5 text-[22px] font-semibold tracking-[-0.03em] text-slate-950">{item.title}</h3>
            <p className="mt-4 text-[15px] leading-8 text-slate-600">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
