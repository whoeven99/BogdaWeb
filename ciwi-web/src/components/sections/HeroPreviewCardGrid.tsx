type HeroPreviewCard = {
  title: string;
  description: string;
  eyebrow?: string;
  accent?: boolean;
};

type HeroPreviewCardGridProps = {
  items: HeroPreviewCard[];
  className?: string;
};

export function HeroPreviewCardGrid({items, className}: HeroPreviewCardGridProps) {
  const classes = ["mt-8 card-grid", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      {items.map((item) => (
        <article
          key={`${item.title}-${item.description}`}
          className={item.accent ? "hero-panel hero-preview-card--accent" : "surface-card"}
        >
          {item.eyebrow ? <div className="hero-panel__badge">{item.eyebrow}</div> : null}
          <h3 className={item.accent ? "text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl" : ""}>{item.title}</h3>
          <p
            className={item.accent ? "quote hero-preview-card__copy--accent" : "quote"}
            style={item.accent ? {color: "rgba(255, 255, 255, 0.9)"} : undefined}
          >
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
}
