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
    <section className="page-section page-hero">
      <div className="hero-grid">
        <div>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            as="h1"
          />
          <div className="hero-proof">
            {proofItems.map((item) => (
              <span key={item} className="pill">
                {item}
              </span>
            ))}
          </div>
          <div className="inline-list space-top-lg">
            <Button href={primaryCtaHref}>{primaryCtaLabel}</Button>
            <Button href={secondaryCtaHref} variant="secondary">
              {secondaryCtaLabel}
            </Button>
          </div>
        </div>
        <div className="hero-brand-visual">
          <div className="hero-brand-visual__top">
            <div className="hero-brand-visual__brand">
              <Image
                src="/logo-150.png"
                alt={visualAlt.brandLogo}
                width={44}
                height={44}
                className="hero-brand-visual__logo"
              />
              <div className="hero-brand-visual__brand-text">
                <div className="hero-brand-visual__name">{brandName}</div>
                <div className="hero-brand-visual__tagline">{brandTagline}</div>
              </div>
            </div>
            <Image src="/20250813-132858.png" alt={visualAlt.builtForShopify} width={118} height={30} />
          </div>
          <div className="hero-brand-visual__device">
            <div className="hero-brand-visual__device-bar">
              <span className="hero-brand-visual__dot" />
              <span className="hero-brand-visual__dot" />
              <span className="hero-brand-visual__dot" />
              <span className="hero-brand-visual__device-title">{visualWindowTitle}</span>
            </div>
            <Image
              src="https://img.bogdatech.com/ciwi-web/translator.webp"
              alt={visualAlt.mainImage}
              width={1024}
              height={484}
              className="hero-brand-visual__device-image"
              priority
            />
            <div className="hero-brand-visual__chips">
              {visualChips.map((chip) => (
                <span key={chip} className="hero-brand-chip">
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="hero-brand-visual__rail">
            <div className="hero-brand-visual__thumb">
              <Image
                src="https://img.bogdatech.com/ciwi-web/bundle.webp"
                alt={visualAlt.secondaryTop}
                width={1024}
                height={483}
                className="hero-brand-visual__thumb-image"
              />
            </div>
            <div className="hero-brand-visual__thumb">
              <Image
                src="https://img.bogdatech.com/ciwi-web/Spark03.png"
                alt={visualAlt.secondaryBottom}
                width={1024}
                height={508}
                className="hero-brand-visual__thumb-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
