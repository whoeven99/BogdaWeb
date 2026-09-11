import {Button} from "@/components/ui/Button";
import {ciwiShopifyInstallUrl} from "@/lib/marketing-links";

type FinalCtaSectionProps = {
  title: string;
  description: string;
  eyebrow?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string | null;
  secondaryHref?: string | null;
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
    <section className="py-12 sm:py-14 lg:py-16">
      <div className="final-cta-panel">
        <div className="max-w-3xl space-y-3">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">{eyebrow}</div>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">{title}</h2>
          <p className="text-[15px] leading-7 text-slate-600">{description}</p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
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
