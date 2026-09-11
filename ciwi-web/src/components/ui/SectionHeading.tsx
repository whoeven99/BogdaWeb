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
  const titleClass =
    as === "h1"
      ? "text-pretty text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl"
      : "text-pretty text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-3xl";

  return (
    <div className="space-y-2.5">
      {eyebrow ? (
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          {eyebrow}
        </div>
      ) : null}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl space-y-2.5">
          <HeadingTag className={titleClass}>
            {title}
          </HeadingTag>
          {description ? <p className="text-[15px] leading-7 text-slate-600">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0 self-start md:self-center">{action}</div> : null}
      </div>
    </div>
  );
}
