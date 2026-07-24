import Image from "next/image";

import {Button} from "@/components/ui/Button";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {homePageCopy} from "@/content/home-page-copy";

type HeroSectionProps = {
  title: string;
  description: string;
  proofItems: string[];
};

export function HeroSection({title, description, proofItems}: HeroSectionProps) {
  const copy = homePageCopy.hero;

  return (
    <section className="page-section page-hero">
      <div className="hero-grid">
        <div>
          <SectionHeading
            eyebrow={copy.eyebrow}
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
            <Button href={copy.primaryCtaHref}>{copy.primaryCtaLabel}</Button>
            <Button href={copy.secondaryCtaHref} variant="secondary">
              {copy.secondaryCtaLabel}
            </Button>
          </div>
        </div>
        <div className="hero-brand-visual">
          <div className="hero-brand-visual__top">
            <div className="hero-brand-visual__brand">
              <Image
                src="/logo-150.png"
                alt={copy.visualAlt.brandLogo}
                width={44}
                height={44}
                className="hero-brand-visual__logo"
              />
              <div className="hero-brand-visual__brand-text">
                <div className="hero-brand-visual__name">{copy.brandName}</div>
                <div className="hero-brand-visual__tagline">{copy.brandTagline}</div>
              </div>
            </div>
            <Image src="/20250813-132858.png" alt={copy.visualAlt.builtForShopify} width={118} height={30} />
          </div>
          <div className="hero-brand-visual__device">
            <div className="hero-brand-visual__device-bar">
              <span className="hero-brand-visual__dot" />
              <span className="hero-brand-visual__dot" />
              <span className="hero-brand-visual__dot" />
              <span className="hero-brand-visual__device-title">{copy.visualWindowTitle}</span>
            </div>
            <Image
              src="/help-center/assets/images/image-39-1024x484-199851b9146b9d40442c609beacc3615.png"
              alt={copy.visualAlt.mainImage}
              width={1024}
              height={484}
              className="hero-brand-visual__device-image"
              priority
            />
            <div className="hero-brand-visual__chips">
              {copy.visualChips.map((chip) => (
                <span key={chip} className="hero-brand-chip">
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="hero-brand-visual__rail">
            <div className="hero-brand-visual__thumb">
              <Image
                src="/help-center/assets/images/image-30-1024x483-bca184999f086a339ace9b093b68bed9.png"
                alt={copy.visualAlt.secondaryTop}
                width={1024}
                height={483}
                className="hero-brand-visual__thumb-image"
              />
            </div>
            <div className="hero-brand-visual__thumb">
              <Image
                src="/help-center/assets/images/image-41-1024x508-44cad0129e424014aed54ee5a962b9c4.png"
                alt={copy.visualAlt.secondaryBottom}
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
