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
  className = "rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_16px_48px_-24px_rgba(15,23,42,0.24)] sm:p-7",
  stackClassName = "grid gap-6",
}: StackedInfoPanelProps) {
  return (
    <div className={className}>
      <div className={stackClassName}>
        {sections.map((section) => (
          <div key={getSectionKey(section)}>
            <h3 className="text-lg font-semibold tracking-[-0.03em] text-slate-950">{section.title}</h3>
            {hasDescription(section) ? (
              <p className="quote mt-4">{section.description}</p>
            ) : null}
            {hasItems(section) ? (
              section.listVariant === "boxed" ? (
                <ul className="mt-4 grid gap-2 text-sm leading-7 text-slate-600">
                  {section.items.map((item) => (
                    <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
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
              <div className="mt-4 flex flex-wrap gap-2">
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
