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
  const variantClass =
    variant === "soft" ? "ui-content-index-card--soft" : "ui-content-index-card--bordered";
  const metaPillClass =
    variant === "soft"
      ? "ui-content-index-card__meta-pill--soft"
      : "ui-content-index-card__meta-pill";
  const classes = ["ui-content-index-card", variantClass, className].filter(Boolean).join(" ");

  return (
    <article className={classes}>
      <div className="ui-content-index-card__meta">
        {meta.map((item) => (
          <span key={item} className={metaPillClass}>
            {item}
          </span>
        ))}
      </div>
      <HeadingTag className="ui-content-index-card__heading">
        <LocalizedLink href={href} className="transition-colors hover:text-emerald-700">
          {title}
        </LocalizedLink>
      </HeadingTag>
      <p className="ui-content-index-card__body">{description}</p>
      <div className="ui-content-index-card__cta">
        <CardCtaLink href={href} variant="text">
          {ctaLabel}
        </CardCtaLink>
      </div>
    </article>
  );
}
