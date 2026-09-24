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
  variant?: "default" | "inverted";
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
  variant = "default",
}: FinalCtaSectionProps) {
  const panelClass =
    variant === "inverted"
      ? `final-cta-panel final-cta-panel--inverted ${panelClassName ?? ""}`.trim()
      : panelClassName
        ? `final-cta-panel ${panelClassName}`
        : "final-cta-panel";

  return (
    <section className="py-12 sm:py-14 lg:py-16">
      <div className={panelClass}>
        <div className="final-cta-content max-w-3xl space-y-3">
          {eyebrow ? (
            <div
              className={
                variant === "inverted" ? "ui-final-cta__eyebrow ui-final-cta__eyebrow--inverted" : "ui-final-cta__eyebrow"
              }
            >
              {eyebrow}
            </div>
          ) : null}
          <h2
            className={
              variant === "inverted" ? "ui-final-cta__title ui-final-cta__title--inverted" : "ui-final-cta__title"
            }
          >
            {title}
          </h2>
          {body ??
            (description ? (
              <p
                className={
                  variant === "inverted" ? "ui-final-cta__text ui-final-cta__text--inverted" : "ui-final-cta__text"
                }
              >
                {description}
              </p>
            ) : null)}
        </div>
        <div
          className={
            actionsClassName ? `final-cta-actions mt-8 ${actionsClassName}` : "final-cta-actions mt-8 flex flex-wrap items-center gap-3"
          }
        >
          <Button href={primaryHref} variant={variant === "inverted" ? "inverted" : "primary"} size="large">
            {primaryLabel}
          </Button>
          {secondaryLabel && secondaryHref ? (
            <Button href={secondaryHref} variant={variant === "inverted" ? "inverted-secondary" : "secondary"} size="large">
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
