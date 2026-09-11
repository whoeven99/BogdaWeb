import Image from "next/image";

import {Button} from "@/components/ui/Button";
import {SectionHeading} from "@/components/ui/SectionHeading";

type HeroSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  proofItems: string[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  brandName: string;
  brandTagline: string;
  visualWindowTitle: string;
  visualChips: string[];
  visualAlt: {
    brandLogo: string;
    builtForShopify: string;
    mainImage: string;
    secondaryTop: string;
    secondaryBottom: string;
  };
};

export function HeroSection({
  eyebrow,
  title,
  description,
  proofItems,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  brandName,
  brandTagline,
  visualWindowTitle,
  visualChips,
  visualAlt,
}: HeroSectionProps) {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
        <div>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            as="h1"
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {proofItems.map((item) => (
              <span key={item} className="pill">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={primaryCtaHref}>{primaryCtaLabel}</Button>
            <Button href={secondaryCtaHref} variant="secondary">
              {secondaryCtaLabel}
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-[32px] bg-white/90 p-5 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.18)] sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-150.png"
                alt={visualAlt.brandLogo}
                width={44}
                height={44}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm"
              />
              <div>
                <div className="text-base font-semibold tracking-[-0.03em] text-slate-950">{brandName}</div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{brandTagline}</div>
              </div>
            </div>
            <Image src="/20250813-132858.png" alt={visualAlt.builtForShopify} width={118} height={30} />
          </div>
          <div className="mt-5 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-white">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 text-sm font-medium text-slate-300">{visualWindowTitle}</span>
            </div>
            <Image
              src="https://img.bogdatech.com/ciwi-web/translator.webp"
              alt={visualAlt.mainImage}
              width={1024}
              height={484}
              className="w-full object-cover"
              priority
            />
            <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-4">
              {visualChips.map((chip) => (
                <span key={chip} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-[24px] bg-white shadow-sm">
              <Image
                src="https://img.bogdatech.com/ciwi-web/bundle.webp"
                alt={visualAlt.secondaryTop}
                width={1024}
                height={483}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-[24px] bg-white shadow-sm">
              <Image
                src="https://img.bogdatech.com/ciwi-web/Spark03.png"
                alt={visualAlt.secondaryBottom}
                width={1024}
                height={508}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
