"use client";

import {useEffect, useMemo, useState} from "react";

import {SectionHeading} from "@/components/ui/SectionHeading";

type DemoScenario = {
  title: string;
  primaryLabel: string;
  primaryText: string;
  secondaryLabel: string;
  secondaryText: string;
  note: string;
  variants?: {
    label: string;
    primaryText: string;
    secondaryText: string;
    note?: string;
  }[];
};

type InteractiveDemoExplorerProps = {
  eyebrow?: string;
  title: string;
  description: string;
  items: DemoScenario[];
};

export function InteractiveDemoExplorer({
  eyebrow = "Interactive demo",
  title,
  description,
  items,
}: InteractiveDemoExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const activeItem = useMemo(() => items[activeIndex] ?? items[0], [activeIndex, items]);
  const activeVariant = activeItem?.variants?.[activeVariantIndex];

  useEffect(() => {
    setActiveVariantIndex(0);
  }, [activeIndex]);

  if (!items.length || !activeItem) {
    return null;
  }

  const primaryText = activeVariant?.primaryText ?? activeItem.primaryText;
  const secondaryText = activeVariant?.secondaryText ?? activeItem.secondaryText;
  const note = activeVariant?.note ?? activeItem.note;

  return (
    <section className="page-section" id="demo">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="detail-grid">
        <div className="surface-card section-stack">
          <div className="tab-list" role="tablist" aria-label="Demo scenarios">
            {items.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={`tab-chip ${index === activeIndex ? "tab-chip--active" : ""}`}
                onClick={() => setActiveIndex(index)}
                role="tab"
                aria-selected={index === activeIndex}
              >
                {item.title}
              </button>
            ))}
          </div>
          {activeItem.variants?.length ? (
            <div className="section-stack">
              <h3 className="tab-panel-heading">Sample inputs</h3>
              <div className="tab-list" role="list" aria-label="Demo sample inputs">
                {activeItem.variants.map((variant, index) => (
                  <button
                    key={`${activeItem.title}-${variant.label}`}
                    type="button"
                    className={`tab-chip ${index === activeVariantIndex ? "tab-chip--active" : ""}`}
                    onClick={() => setActiveVariantIndex(index)}
                    aria-pressed={index === activeVariantIndex}
                  >
                    {variant.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          <p className="quote">{note}</p>
        </div>
        <div className="surface-card section-stack">
          <div className="demo-stack">
            <div className="demo-box">
              <strong>{activeItem.primaryLabel}</strong>
              <p>{primaryText}</p>
            </div>
            <div className="demo-box demo-box--accent">
              <strong>{activeItem.secondaryLabel}</strong>
              <p>{secondaryText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
