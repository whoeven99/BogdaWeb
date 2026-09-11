"use client";

import Image from "next/image";

import type {CSSProperties} from "react";

import {CardCtaLink} from "@/components/ui/CardCtaLink";
import {useLocale} from "@/components/providers/LocaleProvider";
import {getUiCopy} from "@/content/ui-copy";

type ProductCardProps = {
  name: string;
  description: string;
  href: string;
  icon: string;
  metrics: string[];
  rating?: number;
  reviewCount?: number;
  reviewSnippets?: string[];
};

function formatRatingValue(value: number) {
  return value.toFixed(1);
}

export function ProductCard({
  name,
  description,
  href,
  icon,
  metrics,
  rating,
  reviewCount,
  reviewSnippets = [],
}: ProductCardProps) {
  const locale = useLocale();
  const uiCopy = getUiCopy(locale);
  const hasRating = typeof rating === "number" && rating > 0;
  const hasReviews = reviewSnippets.length > 0;
  const ratingPercentage = hasRating ? `${Math.min((rating / 5) * 100, 100)}%` : "0%";
  const starsStyle = {width: ratingPercentage} as CSSProperties;

  return (
    <article className="group flex h-full flex-col rounded-[24px] bg-white p-6 shadow-[0_18px_48px_-28px_rgba(15,23,42,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-28px_rgba(15,23,42,0.2)] sm:p-7">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
        <Image src={icon} alt={name} width={24} height={24} />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-950">{name}</h3>
      <p className="mt-3 text-[15px] leading-7 text-slate-600">{description}</p>
      {hasRating ? (
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
          <span className="relative inline-flex text-base leading-none" aria-hidden="true">
            <span className="text-slate-200">★★★★★</span>
            <span className="absolute inset-y-0 left-0 overflow-hidden text-amber-400" style={starsStyle}>
              ★★★★★
            </span>
          </span>
          <span className="font-semibold text-slate-950">{formatRatingValue(rating)}</span>
          {reviewCount ? (
            <span className="text-slate-500">
              {reviewCount} {uiCopy.products.reviewsLabel}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="mt-5 flex flex-wrap gap-2">
        {metrics.slice(0, 2).map((metric) => (
          <span key={metric} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            {metric}
          </span>
        ))}
      </div>
      {hasReviews ? (
        <div className="mt-5 grid gap-3">
          {reviewSnippets.slice(0, 2).map((snippet) => (
            <p key={snippet} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
              “{snippet}”
            </p>
          ))}
        </div>
      ) : null}
      <div className="mt-6">
        <CardCtaLink href={href}>{uiCopy.products.viewDetailsLabel}</CardCtaLink>
      </div>
    </article>
  );
}
