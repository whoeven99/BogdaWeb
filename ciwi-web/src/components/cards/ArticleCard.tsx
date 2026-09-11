"use client";

import {CardCtaLink} from "@/components/ui/CardCtaLink";
import {useLocale} from "@/components/providers/LocaleProvider";
import {getUiCopy} from "@/content/ui-copy";

type ArticleCardProps = {
  title: string;
  description: string;
  href: string;
  meta: string[];
};

export function ArticleCard({title, description, href, meta}: ArticleCardProps) {
  const locale = useLocale();
  const uiCopy = getUiCopy(locale);

  return (
    <article className="group flex h-full flex-col rounded-[24px] bg-white p-6 shadow-[0_18px_48px_-28px_rgba(15,23,42,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-28px_rgba(15,23,42,0.18)] sm:p-7">
      <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {meta.map((item) => (
          <span key={item} className="rounded-full bg-slate-100 px-3 py-1">
            {item}
          </span>
        ))}
      </div>
      <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-slate-950">{title}</h3>
      <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">{description}</p>
      <div className="mt-6">
        <CardCtaLink href={href} variant="text">
          {uiCopy.resources.openResourceLabel}
        </CardCtaLink>
      </div>
    </article>
  );
}
