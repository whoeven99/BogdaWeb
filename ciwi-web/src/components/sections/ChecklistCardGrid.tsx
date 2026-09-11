type ChecklistCard = {
  title: string;
  items: string[];
};

type ChecklistCardGridProps = {
  cards: ChecklistCard[];
  gridClassName?: string;
  cardClassName?: string;
  listClassName?: string;
};

export function ChecklistCardGrid({
  cards,
  gridClassName = "detail-grid",
  cardClassName,
  listClassName = "check-list",
}: ChecklistCardGridProps) {
  const cardClasses = ["surface-card", cardClassName].filter(Boolean).join(" ");

  return (
    <div className={gridClassName}>
      {cards.map((card) => (
        <article key={`${card.title}-${card.items.join("-")}`} className={cardClasses}>
          <h3>{card.title}</h3>
          <ul className={listClassName}>
            {card.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
