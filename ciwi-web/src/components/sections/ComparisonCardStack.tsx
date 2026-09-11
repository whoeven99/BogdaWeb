import type {ReactNode} from "react";

type ComparisonCardColumn = {
  label: string;
  items: string[];
};

type ComparisonCard = {
  title: string;
  chips?: string[];
  columns: ComparisonCardColumn[];
  footer?: ReactNode;
};

type ComparisonCardStackProps = {
  cards: ComparisonCard[];
  gridClassName?: string;
  cardClassName?: string;
  columnsClassName?: string;
};

export function ComparisonCardStack({
  cards,
  gridClassName = "guide-solution-stack",
  cardClassName = "guide-solution-card",
  columnsClassName = "guide-solution-card__columns",
}: ComparisonCardStackProps) {
  return (
    <div className={gridClassName}>
      {cards.map((card) => (
        <article key={`${card.title}-${card.columns.map((column) => column.label).join("-")}`} className={`surface-card ${cardClassName}`}>
          {card.chips?.length ? (
            <div className="guide-chip-row">
              {card.chips.map((chip) => (
                <span key={`${card.title}-${chip}`} className="guide-chip">
                  {chip}
                </span>
              ))}
            </div>
          ) : null}
          <h3>{card.title}</h3>
          <div className={columnsClassName}>
            {card.columns.map((column) => (
              <div key={`${card.title}-${column.label}`}>
                <span className="guide-hero__summary-label">{column.label}</span>
                <ul className="check-list">
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {card.footer ? <div className="space-top-lg">{card.footer}</div> : null}
        </article>
      ))}
    </div>
  );
}
