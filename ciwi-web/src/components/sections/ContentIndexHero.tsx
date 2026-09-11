import type {ReactNode} from "react";

type ContentIndexHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  className?: string;
  children?: ReactNode;
};

export function ContentIndexHero({eyebrow, title, description, actions, className, children}: ContentIndexHeroProps) {
  const classes = ["content-hero-shell max-w-[1080px]", className].filter(Boolean).join(" ");

  return (
    <header className={classes}>
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
        {eyebrow}
      </div>
      <h1 className="mt-4 max-w-[1080px] text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-[56px] lg:leading-[1.08]">
        {title}
      </h1>
      <p className="mt-4 max-w-[980px] text-base leading-8 text-slate-600 lg:text-[17px]">{description}</p>
      {actions ? <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div> : null}
      {children}
    </header>
  );
}
