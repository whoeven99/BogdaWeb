import {SectionHeading} from "@/components/ui/SectionHeading";

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
      <div className="mt-8 grid gap-4">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_16px_48px_-24px_rgba(15,23,42,0.22)] open:border-emerald-200 open:bg-emerald-50/40"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 pr-1 text-lg font-semibold tracking-[-0.03em] text-slate-950 marker:hidden">
              <span>{item.question}</span>
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors duration-200 group-open:bg-emerald-100 group-open:text-emerald-700">
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                >
                  <path d="M5.25 7.5 10 12.25 14.75 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 text-sm leading-7 text-slate-600">{item.answer}</p>
            {item.evidence?.length ? (
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
                {item.evidence.map((evidence) => (
                  <li key={evidence} className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
                    {evidence}
                  </li>
                ))}
              </ul>
            ) : null}
          </details>
        ))}
      </div>
    </section>
  );
}
