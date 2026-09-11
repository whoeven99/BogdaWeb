"use client";

import {useRef} from "react";

import {TestimonialCard} from "@/components/cards/TestimonialCard";
import {SectionHeading} from "@/components/ui/SectionHeading";

type SocialProofSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: {name: string; tag: string; quote: string}[];
};

export function SocialProofSection({eyebrow, title, description, items}: SocialProofSectionProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (direction: "prev" | "next") => {
    if (!sliderRef.current) return;
    const card = sliderRef.current.querySelector<HTMLElement>("[data-review-card]");
    const gap = 24;
    const amount = (card?.offsetWidth ?? 320) + gap;
    sliderRef.current.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCard("prev")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            aria-label="Show previous review"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => scrollByCard("next")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            aria-label="Show next review"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <div
        ref={sliderRef}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div
            key={`${item.name}-${item.quote}`}
            data-review-card
            className="min-w-0 shrink-0 basis-full snap-start md:basis-[calc(50%-0.75rem)] xl:basis-[calc(33.333%-1rem)]"
          >
            <TestimonialCard name={item.name} tag={item.tag} quote={item.quote} />
          </div>
        ))}
      </div>
    </section>
  );
}
