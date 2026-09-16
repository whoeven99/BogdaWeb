type FaqAccordionItem = {
  question: string;
  answer: string;
  evidence?: string[];
};

type FaqAccordionListProps = {
  items: FaqAccordionItem[];
  className?: string;
};

export function FaqAccordionList({items, className}: FaqAccordionListProps) {
  const classes = ["faq-accordion", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <svg width="0" height="0" style={{position: "absolute"}} aria-hidden="true">
        <symbol id="faq-chevron" viewBox="0 0 20 20">
          <path
            d="M5.25 7.5 10 12.25 14.75 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
      </svg>
      {items.map((item) => (
        <details key={item.question} className="faq-accordion__item group">
          <summary className="faq-accordion__summary">
            <span>{item.question}</span>
            <span className="faq-accordion__icon" aria-hidden="true">
              <svg
                className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
              >
                <use href="#faq-chevron" />
              </svg>
            </span>
          </summary>
          <p className="faq-accordion__answer">{item.answer}</p>
          {item.evidence?.length ? (
            <ul className="faq-accordion__evidence">
              {item.evidence.map((evidence) => (
                <li key={evidence}>{evidence}</li>
              ))}
            </ul>
          ) : null}
        </details>
      ))}
    </div>
  );
}
