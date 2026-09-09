"use client";

import {useState, type CSSProperties} from "react";

import {SectionHeading} from "@/components/ui/SectionHeading";
import type {AffiliateLandingData} from "@/content/affiliate";

type AffiliateLandingProps = {
  data: AffiliateLandingData;
  refCode: string;
};

export function AffiliateLanding({data, refCode}: AffiliateLandingProps) {
  const {copy, offers} = data;
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [shopHandle, setShopHandle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const activeOffer = offers.find((offer) => offer.slug === activeProduct);

  function openModal(productSlug: string) {
    setActiveProduct(productSlug);
    setShopHandle("");
    setError(null);
  }

  function closeModal() {
    setActiveProduct(null);
    setShopHandle("");
    setError(null);
  }

  function handleInstall() {
    if (!activeProduct) {
      return;
    }

    const handle = shopHandle.trim();

    if (!handle) {
      setError(copy.modalErrorRequired);
      return;
    }

    const params = new URLSearchParams({
      shop_domain: `${handle}.myshopify.com`,
      product: activeProduct,
    });

    if (refCode) {
      params.set("ref", refCode);
    }

    window.location.href = `/api/affiliate/install/?${params.toString()}`;
  }

  return (
    <>
      <section className="page-section page-hero">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} as="h1" />
        <div className="card-grid">
          {offers.map((offer) => (
            <article key={offer.slug} className="surface-card affiliate-offer-card">
              <h3>{offer.name}</h3>
              {offer.rating > 0 ? (
                <div className="product-rating">
                  <span
                    className="product-rating__stars"
                    style={{"--rating": offer.rating} as CSSProperties}
                    aria-hidden="true"
                  >
                    ★★★★★
                  </span>
                  <span className="product-rating__value">{offer.rating.toFixed(1)}</span>
                  {offer.reviewCount > 0 ? (
                    <span className="product-rating__count">
                      {offer.reviewCount} {copy.reviewsCountLabel}
                    </span>
                  ) : null}
                </div>
              ) : null}
              <p className="quote">{offer.description}</p>
              <p className="affiliate-offer-card__benefit">{offer.benefit}</p>
              <div className="affiliate-offer-card__actions">
                <button type="button" className="button button--primary" onClick={() => openModal(offer.slug)}>
                  {copy.installLabel}
                </button>
                {offer.reviewUrl ? (
                  <a href={offer.reviewUrl} className="button button--secondary" target="_blank" rel="noopener noreferrer">
                    {copy.reviewsLabel}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      {activeProduct ? (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="modal__close" aria-label={copy.modalCloseLabel} onClick={closeModal}>
              ×
            </button>
            <h3 id="install-modal-title">
              {copy.modalTitle}
              {activeOffer?.benefit}
            </h3>
            <div className="lead-form__field">
              <label className="lead-form__label" htmlFor="shop-handle-input">
                {copy.shopDomainLabel}
              </label>
              <div className="affiliate-shop-input">
                <input
                  id="shop-handle-input"
                  type="text"
                  value={shopHandle}
                  onChange={(event) => {
                    setShopHandle(event.target.value);
                    if (error) {
                      setError(null);
                    }
                  }}
                  placeholder={copy.shopDomainPlaceholder}
                  autoComplete="off"
                  autoFocus
                />
                <span className="affiliate-shop-input__suffix">.myshopify.com</span>
              </div>
              {error ? <p className="affiliate-shop-input__error">{error}</p> : null}
            </div>
            <div className="inline-list">
              <button type="button" className="button button--primary" onClick={handleInstall}>
                {copy.modalSubmitLabel}
              </button>
              <button type="button" className="button button--secondary" onClick={closeModal}>
                {copy.modalCancelLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
