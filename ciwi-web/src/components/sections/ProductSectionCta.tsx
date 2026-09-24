import {Button} from "@/components/ui/Button";

type ProductSectionCtaProps = {
  href: string;
  label: string;
};

export function ProductSectionCta({href, label}: ProductSectionCtaProps) {
  return (
    <div className="product-section-cta">
      <Button href={href}>{label}</Button>
    </div>
  );
}
