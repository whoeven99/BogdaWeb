import type {ReactNode} from "react";

import {Button} from "@/components/ui/Button";
import {ciwiShopifyInstallUrl} from "@/lib/marketing-links";

type FinalCtaSectionProps = {
  title: string;
  description?: string;
  eyebrow?: string | null;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string | null;
  secondaryHref?: string | null;
  body?: ReactNode;
  panelClassName?: string;
  actionsClassName?: string;
};

export function FinalCtaSection({
  title,
  description,
  eyebrow = "Next step",
  primaryLabel = "Install on Shopify",
  primaryHref = ciwiShopifyInstallUrl,
  secondaryLabel = "Talk to us",
  secondaryHref = "/contact",
  body,
  panelClassName,
  actionsClassName,
}: FinalCtaSectionProps) {
  return (
    <section className="py-12 sm:py-14 lg:py-16">
      <div className={panelClassName ? `final-cta-panel ${panelClassName}` : "final-cta-panel"}>
        <div className="final-cta-content max-w-3xl space-y-3">
          {eyebrow ? <div className="ui-final-cta__eyebrow">{eyebrow}</div> : null}
          <h2 className="ui-final-cta__title">{title}</h2>
          {body ?? (description ? <p className="ui-final-cta__text">{description}</p> : null)}
        </div>
        <div className={actionsClassName ? `final-cta-actions mt-8 ${actionsClassName}` : "final-cta-actions mt-8 flex flex-wrap items-center gap-3"}>
          <Button href={primaryHref}>{primaryLabel}</Button>
          {secondaryLabel && secondaryHref ? (
            <Button href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
