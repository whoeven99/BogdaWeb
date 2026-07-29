import {Button} from "@/components/ui/Button";
import {SectionHeading} from "@/components/ui/SectionHeading";

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
  primaryHref = "https://apps.shopify.com/partners/bogdatech",
  secondaryLabel = "Talk to us",
  secondaryHref = "/contact",
}: FinalCtaSectionProps) {
  return (
    <section className="page-section">
      <div className="callout">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
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
