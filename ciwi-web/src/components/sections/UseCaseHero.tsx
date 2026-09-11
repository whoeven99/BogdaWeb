import type {ReactNode} from "react";

import {BackLink} from "@/components/ui/BackLink";
import {Button} from "@/components/ui/Button";

type UseCaseHeroMetaItem = {
  label: string;
  value: ReactNode;
};

type UseCaseHeroProps = {
  backHref: string;
  backLabel: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  metaItems: UseCaseHeroMetaItem[];
};

export function UseCaseHero({
  backHref,
  backLabel,
  title,
  description,
  primaryLabel,
  primaryHref,
  metaItems,
}: UseCaseHeroProps) {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <BackLink href={backHref} label={backLabel} />
        <div className="mt-8 space-y-5">
          <h1 className="max-w-4xl text-pretty text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-[60px] lg:leading-[1.04]">
            {title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-600">{description}</p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href={primaryHref}>{primaryLabel}</Button>
        </div>
        <div className="mt-10 grid max-w-2xl gap-4 border-t border-slate-200 pt-6 text-sm leading-7 text-slate-600 sm:grid-cols-2">
          {metaItems.map((item) => (
            <div key={item.label}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">{item.label}</div>
              <div className="mt-1 text-slate-900">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
