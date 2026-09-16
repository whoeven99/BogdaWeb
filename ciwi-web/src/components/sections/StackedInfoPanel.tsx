type InfoPanelSection =
  | {
      title: string;
      description: string;
      items?: never;
      chips?: never;
      listVariant?: never;
    }
  | {
      title: string;
      description?: never;
      items: string[];
      chips?: never;
      listVariant?: "boxed" | "checklist";
    }
  | {
      title: string;
      description?: never;
      items?: never;
      chips: string[];
      listVariant?: never;
    };

type StackedInfoPanelProps = {
  sections: InfoPanelSection[];
  className?: string;
  stackClassName?: string;
};

function hasDescription(section: InfoPanelSection): section is Extract<InfoPanelSection, {description: string}> {
  return "description" in section && typeof section.description === "string";
}

function hasItems(section: InfoPanelSection): section is Extract<InfoPanelSection, {items: string[]}> {
  return "items" in section && Array.isArray(section.items);
}

function hasChips(section: InfoPanelSection): section is Extract<InfoPanelSection, {chips: string[]}> {
  return "chips" in section && Array.isArray(section.chips);
}

function getSectionKey(section: InfoPanelSection) {
  if (hasDescription(section)) {
    return `${section.title}-${section.description}`;
  }

  if (hasItems(section)) {
    return `${section.title}-${section.items.join("-")}`;
  }

  if (hasChips(section)) {
    return `${section.title}-${section.chips.join("-")}`;
  }

  return "unreachable-section";
}

export function StackedInfoPanel({
  sections,
  className = "ui-stacked-info",
  stackClassName = "ui-stacked-info__stack",
}: StackedInfoPanelProps) {
  return (
    <div className={className}>
      <div className={stackClassName}>
        {sections.map((section) => (
          <div key={getSectionKey(section)}>
            <h3 className="ui-stacked-info__section-title">{section.title}</h3>
            {hasDescription(section) ? (
              <p className="quote mt-4">{section.description}</p>
            ) : null}
            {hasItems(section) ? (
              section.listVariant === "boxed" ? (
                <ul className="ui-stacked-info__boxed-list">
                  {section.items.map((item) => (
                    <li key={item} className="ui-stacked-info__boxed-item">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="check-list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )
            ) : null}
            {hasChips(section) ? (
              <div className="ui-stacked-info__chip-row">
                {section.chips.map((item) => (
                  <span key={item} className="pill">
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
