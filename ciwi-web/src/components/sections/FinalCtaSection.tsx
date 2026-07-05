import {Button} from "@/components/ui/Button";
import {SectionHeading} from "@/components/ui/SectionHeading";

type FinalCtaSectionProps = {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function FinalCtaSection({
  title,
  description,
  primaryLabel = "Install on Shopify",
  primaryHref = "https://apps.shopify.com/translator-by-ciwi",
  secondaryLabel = "Talk to us",
  secondaryHref = "/contact",
}: FinalCtaSectionProps) {
  return (
    <section className="page-section">
      <div className="callout">
        <SectionHeading eyebrow="Next step" title={title} description={description} />
        <div className="inline-list">
          <Button href={primaryHref}>{primaryLabel}</Button>
          <Button href={secondaryHref} variant="secondary">
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
