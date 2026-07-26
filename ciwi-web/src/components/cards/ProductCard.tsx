import Image from "next/image";
import Link from "next/link";

import type {CSSProperties} from "react";

import {uiCopy} from "@/content/ui-copy";

type ProductCardProps = {
  name: string;
  description: string;
  href: string;
  icon: string;
  metrics: string[];
  rating?: number;
  reviewCount?: number;
  reviewSnippets?: string[];
};

function formatRatingValue(value: number) {
  return value.toFixed(1);
}

export function ProductCard({
  name,
  description,
  href,
  icon,
  metrics,
  rating,
  reviewCount,
  reviewSnippets = [],
}: ProductCardProps) {
  const hasRating = typeof rating === "number" && rating > 0;
  const hasReviews = reviewSnippets.length > 0;
  const starsStyle = hasRating ? ({"--rating": rating} as CSSProperties) : undefined;

  return (
    <article className="feature-card">
      <div className="feature-card__icon">
        <Image src={icon} alt={name} width={24} height={24} />
      </div>
      <h3>{name}</h3>
      <p className="quote">{description}</p>
      {hasRating ? (
        <div className="product-rating">
          <span className="product-rating__stars" style={starsStyle} aria-hidden="true">
            ★★★★★
          </span>
          <span className="product-rating__value">{formatRatingValue(rating)}</span>
          {reviewCount ? (
            <span className="product-rating__count">
              {reviewCount} {uiCopy.products.reviewsLabel}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="tag-list space-top-md">
        {metrics.slice(0, 2).map((metric) => (
          <span key={metric} className="pill">
            {metric}
          </span>
        ))}
      </div>
      {hasReviews ? (
        <div className="product-card__reviews">
          {reviewSnippets.slice(0, 2).map((snippet) => (
            <p key={snippet} className="product-card__review">
              “{snippet}”
            </p>
          ))}
        </div>
      ) : null}
      <div className="space-top-lg">
        <Link href={href} className="site-nav__link">
          {uiCopy.products.viewDetailsLabel}
        </Link>
      </div>
    </article>
  );
}
