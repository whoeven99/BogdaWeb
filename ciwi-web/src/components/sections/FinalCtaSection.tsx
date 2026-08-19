import {Button} from "@/components/ui/Button";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {ciwiShopifyInstallUrl} from "@/lib/marketing-links";

type FinalCtaSectionProps = {
  title: string;
  description: string;
  eyebrow?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function FinalCtaSection({
  title,
  description,
  eyebrow = "Next step",
  primaryLabel = "Install on Shopify",
  primaryHref = ciwiShopifyInstallUrl,
  secondaryLabel = "Talk to us",
  secondaryHref = "/contact",
}: FinalCtaSectionProps) {
  return (
    <section className="page-section">
      <div className="callout">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="inline-list">
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
