import {Button} from "@/components/ui/Button";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {uiCopy} from "@/content/ui-copy";

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
  primaryLabel = uiCopy.cta.installLabel,
  primaryHref = uiCopy.cta.installHref,
  secondaryLabel = uiCopy.cta.talkLabel,
  secondaryHref = uiCopy.cta.talkHref,
}: FinalCtaSectionProps) {
  return (
    <section className="page-section">
      <div className="callout">
        <SectionHeading eyebrow={uiCopy.sections.nextStepEyebrow} title={title} description={description} />
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
