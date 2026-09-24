"use client";

import {useId, useRef, useState, type ReactNode} from "react";

import {SectionHeading} from "@/components/ui/SectionHeading";

type FeatureItem = {
  title: string;
  description: string;
};

type PreviewItem = {
  title: string;
  primaryLabel: string;
  primaryText: string;
  secondaryLabel: string;
  secondaryText: string;
  note: string;
  highlights?: string[];
};

type ProductFeatureHubSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  items: FeatureItem[];
  previewItems: PreviewItem[];
  cta?: ReactNode;
};

export function ProductFeatureHubSection({
  id,
  eyebrow,
  title,
  description,
  items,
  previewItems,
  cta,
}: ProductFeatureHubSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabId = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeItem = items[activeIndex] ?? items[0];
  const activePreview = previewItems.find(
    (preview) => preview.title.toLowerCase() === activeItem?.title.toLowerCase(),
  );

  if (!items.length || !activeItem) {
    return null;
  }

  return (
    <section className="page-section anchor-offset product-feature-hub" id={id}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="product-feature-hub__layout">
        <div className="product-feature-hub__nav" role="tablist" aria-label={title}>
          {items.map((item, index) => (
            <button
              key={`${item.title}-${item.description}`}
              type="button"
              className={`product-feature-hub__tab ${index === activeIndex ? "product-feature-hub__tab--active" : ""}`}
              onClick={() => setActiveIndex(index)}
              ref={(element) => { tabs.current[index] = element; }}
              id={`${tabId}-tab-${index}`}
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls={`${tabId}-panel`}
              tabIndex={index === activeIndex ? 0 : -1}
              onKeyDown={(event) => {
                let next = index;
                if (event.key === "ArrowRight") next = (index + 1) % items.length;
                else if (event.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = items.length - 1;
                else return;
                event.preventDefault();
                setActiveIndex(next);
                tabs.current[next]?.focus();
              }}
            >
              <span className="product-feature-hub__tab-body">
                <strong>{item.title}</strong>
              </span>
            </button>
          ))}
        </div>

        <div
          className="product-feature-hub__stage"
          role="tabpanel"
          id={`${tabId}-panel`}
          aria-labelledby={`${tabId}-tab-${activeIndex}`}
          tabIndex={0}
        >
          <div className="product-feature-hub__preview">
            <div className="product-feature-hub__preview-bar" aria-hidden="true">
              <i /><i /><i />
            </div>
            {activePreview ? (
              <div className="demo-stack">
                <div className="demo-box">
                  <strong>{activePreview.primaryLabel}</strong>
                  <p>{activePreview.primaryText}</p>
                </div>
                <div className="demo-box demo-box--accent">
                  <strong>{activePreview.secondaryLabel}</strong>
                  <p>{activePreview.secondaryText}</p>
                </div>
              </div>
            ) : (
              <div className="product-feature-hub__capability">
                <span aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")}</span>
                <strong>{activeItem.title}</strong>
              </div>
            )}
          </div>
          <div className="product-feature-hub__stage-top">
            <h3>{activeItem.title}</h3>
            <p>{activeItem.description}</p>
            {activePreview ? (
              <>
              <p className="product-feature-hub__note">{activePreview.note}</p>
              {activePreview.highlights?.length ? (
                <ul className="check-list product-feature-hub__list">
                  {activePreview.highlights.map((highlight) => (
                    <li key={`${activeItem.title}-${highlight}`}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
      {cta}
    </section>
  );
}
