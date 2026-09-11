import type {ReactNode} from "react";

type DetailHeroMetaItem = {
  label: string;
  value: ReactNode;
};

type DetailHeroTocItem = {
  href: string;
  label: string;
};

type DetailHeroPanelProps = {
  metaItems: DetailHeroMetaItem[];
  metaGridClassName?: string;
  summaryLabel: string;
  summary: ReactNode;
  intro?: ReactNode;
  actions?: ReactNode;
  tocLabel?: string;
  tocItems?: DetailHeroTocItem[];
};

export function DetailHeroPanel({
  metaItems,
  metaGridClassName,
  summaryLabel,
  summary,
  intro,
  actions,
  tocLabel,
  tocItems,
}: DetailHeroPanelProps) {
  const metaGridClasses = ["guide-meta-grid", metaGridClassName].filter(Boolean).join(" ");

  return (
    <>
      <div className={metaGridClasses}>
        {metaItems.map((item) => (
          <div key={item.label} className="surface-card guide-meta-card">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>

      <div className="guide-hero__layout">
        <article className="surface-card guide-hero__summary">
          <span className="guide-hero__summary-label">{summaryLabel}</span>
          <div className="guide-hero__summary-copy">
            {typeof summary === "string" ? <p>{summary}</p> : summary}
          </div>
          {intro ? <div className="guide-hero__intro">{intro}</div> : null}
          {actions ? <div className="guide-hero__actions">{actions}</div> : null}
        </article>

        {tocLabel && tocItems?.length ? (
          <nav className="surface-card guide-toc" aria-label={tocLabel}>
            <span className="guide-hero__summary-label">{tocLabel}</span>
            <ul>
              {tocItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </>
  );
}
