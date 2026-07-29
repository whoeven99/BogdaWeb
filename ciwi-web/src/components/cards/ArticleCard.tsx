"use client";

import {LocalizedLink} from "@/components/ui/LocalizedLink";
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
    <article className="resource-card">
      <div className="resource-card__meta">
        {meta.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <h3>{title}</h3>
      <p className="quote">{description}</p>
      <div className="space-top-lg">
        <LocalizedLink href={href} className="site-nav__link">
          {uiCopy.resources.openResourceLabel}
        </LocalizedLink>
      </div>
    </article>
  );
}
