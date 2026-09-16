"use client";

import type {ReactNode} from "react";

import {LocalizedLink} from "@/components/ui/LocalizedLink";

type CardCtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "outlined" | "text";
};

export function CardCtaLink({href, children, variant = "outlined"}: CardCtaLinkProps) {
  const baseClass = variant === "outlined" ? "ui-card-cta ui-card-cta--outlined group" : "ui-card-cta ui-card-cta--text group";

  return (
    <LocalizedLink href={href} className={baseClass} data-card-cta-variant={variant}>
      {children}
      <span aria-hidden="true" className="ui-card-cta__arrow">
        →
      </span>
    </LocalizedLink>
  );
}
