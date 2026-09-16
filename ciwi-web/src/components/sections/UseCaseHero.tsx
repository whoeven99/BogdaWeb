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
    <section className="ui-uc-hero">
      <div className="ui-uc-hero__inner">
        <BackLink href={backHref} label={backLabel} />
        <div className="ui-uc-hero__title-wrap">
          <h1 className="ui-uc-hero__title">{title}</h1>
          <p className="ui-uc-hero__desc">{description}</p>
        </div>
        <div className="ui-uc-hero__actions">
          <Button href={primaryHref}>{primaryLabel}</Button>
        </div>
        <div className="ui-uc-hero__meta">
          {metaItems.map((item) => (
            <div key={item.label}>
              <div className="ui-uc-hero__meta-label">{item.label}</div>
              <div className="ui-uc-hero__meta-value">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
