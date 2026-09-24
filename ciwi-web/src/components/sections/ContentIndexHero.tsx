import type {ReactNode} from "react";

import {SectionHeading} from "@/components/ui/SectionHeading";

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
      <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
      {actions ? <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div> : null}
      {children}
    </header>
  );
}
