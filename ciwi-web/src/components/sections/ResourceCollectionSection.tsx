import {ArticleCard} from "@/components/cards/ArticleCard";
import {Button} from "@/components/ui/Button";
import {SectionHeading} from "@/components/ui/SectionHeading";

type ResourceCollectionItem = {
  title: string;
  description: string;
  href: string;
  meta: string[];
};

type ResourceCollectionSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: ResourceCollectionItem[];
  ctaLabel?: string;
  ctaHref?: string;
  emptyState?: {
    title: string;
    description: string;
  };
  className?: string;
};

export function ResourceCollectionSection({
  eyebrow,
  title,
  description,
  items,
  ctaLabel,
  ctaHref,
  emptyState,
  className = "py-12 sm:py-14 lg:py-16",
}: ResourceCollectionSectionProps) {
  return (
    <section className={className}>
      {title ? <SectionHeading eyebrow={eyebrow} title={title} description={description} /> : null}
      {items.length > 0 ? (
        <div className={title ? "mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3" : "grid gap-5 md:grid-cols-2 xl:grid-cols-3"}>
          {items.map((item) => (
            <ArticleCard
              key={`${item.title}-${item.href}`}
              title={item.title}
              description={item.description}
              href={item.href}
              meta={item.meta}
            />
          ))}
        </div>
      ) : emptyState ? (
        <div className={title ? "mt-8 rounded-[28px] border border-dashed border-slate-300 bg-slate-50/80 px-6 py-8" : "rounded-[28px] border border-dashed border-slate-300 bg-slate-50/80 px-6 py-8"}>
          <h3 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">{emptyState.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{emptyState.description}</p>
        </div>
      ) : null}

      {ctaLabel && ctaHref ? (
        <div className="mt-8 flex justify-start">
          <Button href={ctaHref} variant="secondary">
            {ctaLabel}
          </Button>
        </div>
      ) : null}
    </section>
  );
}
