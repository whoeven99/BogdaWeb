import type {ReactNode} from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
  action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as = "h2",
  action,
}: SectionHeadingProps) {
  const HeadingTag = as;
  const isHeroHeading = as === "h1";
  const hasAction = Boolean(action);
  const hasEyebrow = Boolean(eyebrow);

  const wrapperClass = isHeroHeading ? "ui-section-heading--hero" : "ui-section-heading";
  const rowClass = isHeroHeading ? "ui-section-heading__row--hero" : "ui-section-heading__row";
  const contentClass = isHeroHeading ? "ui-section-heading__content--hero" : "ui-section-heading__content";
  const titleClass = isHeroHeading ? "ui-section-heading__title--hero" : "ui-section-heading__title";
  const descriptionClass = isHeroHeading
    ? "ui-section-heading__description--hero"
    : "ui-section-heading__description";

  const contentNode = (
    <div className={contentClass}>
      {hasEyebrow ? (
        <div className="ui-section-heading__eyebrow">
          {eyebrow}
        </div>
      ) : null}
      <HeadingTag className={titleClass}>
        {title}
      </HeadingTag>
      {description ? <p className={descriptionClass}>{description}</p> : null}
    </div>
  );

  if (!hasAction && !hasEyebrow) {
    return contentNode;
  }

  if (!hasAction) {
    return <div className={wrapperClass}>{contentNode}</div>;
  }

  return (
    <div className={wrapperClass}>
      <div className={rowClass}>
        {contentNode}
        <div className="ui-section-heading__action">{action}</div>
      </div>
    </div>
  );
}
