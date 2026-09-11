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
  const titleClass = isHeroHeading
    ? "text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-[56px] lg:leading-[1.08]"
    : "text-pretty text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-3xl";
  const contentClass = isHeroHeading ? "max-w-[1080px] space-y-3" : "max-w-3xl space-y-2.5";
  const descriptionClass = isHeroHeading
    ? "max-w-[980px] text-base leading-8 text-slate-600 lg:text-[17px]"
    : "text-[15px] leading-7 text-slate-600";

  return (
    <div className={isHeroHeading ? "space-y-3" : "space-y-2.5"}>
      {eyebrow ? (
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          {eyebrow}
        </div>
      ) : null}
      <div className={isHeroHeading ? "flex flex-col gap-6 md:flex-row md:items-center md:justify-between" : "flex flex-col gap-5 md:flex-row md:items-center md:justify-between"}>
        <div className={contentClass}>
          <HeadingTag className={titleClass}>
            {title}
          </HeadingTag>
          {description ? <p className={descriptionClass}>{description}</p> : null}
        </div>
        {action ? <div className="shrink-0 self-start md:self-center">{action}</div> : null}
      </div>
    </div>
  );
}
