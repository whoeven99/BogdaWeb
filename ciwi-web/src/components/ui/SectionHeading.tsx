type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as = "h2",
}: SectionHeadingProps) {
  const HeadingTag = as;

  return (
    <div className="section-heading">
      {eyebrow ? <div className="section-heading__eyebrow">{eyebrow}</div> : null}
      <HeadingTag>{title}</HeadingTag>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
