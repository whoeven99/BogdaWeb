"use client";

import Image from "next/image";

import {CardCtaLink} from "@/components/ui/CardCtaLink";

type UseCasePlaybookCardProps = {
  title: string;
  description: string;
  href: string;
  icon: string;
  productName: string;
  eyebrow?: string;
  meta: string[];
  linkLabel: string;
};

export function UseCasePlaybookCard({
  title,
  description,
  href,
  icon,
  productName,
  eyebrow,
  meta,
  linkLabel,
}: UseCasePlaybookCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-[24px] bg-white p-7 shadow-[0_18px_48px_-28px_rgba(15,23,42,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-28px_rgba(15,23,42,0.18)] sm:p-8">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-2">
          {eyebrow ? (
            <span className="inline-flex text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              {eyebrow}
            </span>
          ) : null}
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            {productName}
          </span>
        </div>
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
          <Image src={icon} alt={productName} width={44} height={44} />
        </div>
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          {meta.map((item) => (
            <span key={item} className="rounded-full bg-slate-100 px-3 py-1">
              {item}
            </span>
          ))}
        </div>
        <h3 className="mt-5 text-[22px] font-semibold tracking-[-0.03em] text-slate-950">{title}</h3>
        <p className="mt-4 flex-1 text-[15px] leading-8 text-slate-600">{description}</p>
        <div className="mt-7">
          <CardCtaLink href={href}>{linkLabel}</CardCtaLink>
        </div>
      </div>
    </article>
  );
}
