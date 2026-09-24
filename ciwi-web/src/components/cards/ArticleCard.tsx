"use client";

import {CardCtaLink} from "@/components/ui/CardCtaLink";
import {useLocale} from "@/components/providers/LocaleProvider";
import {getUiCopy} from "@/content/ui-copy";

type ArticleCardProps = {
  title: string;
  description: string;
  href: string;
  meta: string[];
  variant?: "default" | "landing";
};

export function ArticleCard({title, description, href, meta, variant = "default"}: ArticleCardProps) {
  const locale = useLocale();
  const uiCopy = getUiCopy(locale);
  const className =
    variant === "landing"
      ? "resource-card resource-card--landing group flex h-full flex-col"
      : "ui-editorial-card group";

  return (
    <article className={className}>
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
        <CardCtaLink href={href} variant="text">
          {uiCopy.resources.openResourceLabel}
        </CardCtaLink>
      </div>
    </article>
  );
}
