import {CardCtaLink} from "@/components/ui/CardCtaLink";
import {LocalizedLink} from "@/components/ui/LocalizedLink";

type ContentIndexCardProps = {
  href: string;
  title: string;
  description: string;
  meta: string[];
  ctaLabel: string;
  titleLevel?: "h2" | "h3";
  variant?: "soft" | "bordered";
  className?: string;
};

export function ContentIndexCard({
  href,
  title,
  description,
  meta,
  ctaLabel,
  titleLevel = "h3",
  variant = "soft",
  className,
}: ContentIndexCardProps) {
  const HeadingTag = titleLevel;
  const classes = [
    "group flex h-full flex-col rounded-[28px] p-7 transition-all duration-200 sm:p-8",
    variant === "soft"
      ? "bg-slate-50/70 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.18)] hover:-translate-y-0.5 hover:bg-white"
      : "border border-slate-200/80 bg-slate-50/70 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes}>
      <div className="flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {meta.map((item) => (
          <span key={item} className={variant === "soft" ? "rounded-full bg-white px-3 py-1" : "rounded-full border border-slate-200 bg-white/90 px-3 py-1"}>
            {item}
          </span>
        ))}
      </div>
      <HeadingTag className="mt-5 text-[22px] font-semibold tracking-[-0.03em] text-slate-950">
        <LocalizedLink href={href} className="transition-colors hover:text-emerald-700">
          {title}
        </LocalizedLink>
      </HeadingTag>
      <p className="mt-4 flex-1 text-[15px] leading-8 text-slate-600">{description}</p>
      <div className="mt-7">
        <CardCtaLink href={href} variant="text">
          {ctaLabel}
        </CardCtaLink>
      </div>
    </article>
  );
}
