"use client";

import type {ReactNode} from "react";

import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {isExternalHref} from "@/lib/i18n";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark" | "inverted" | "inverted-secondary";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({href, children, variant = "primary"}: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "ui-btn--primary"
      : variant === "secondary"
        ? "ui-btn--secondary"
        : variant === "ghost"
          ? "ui-btn--ghost"
          : variant === "inverted"
            ? "ui-btn--inverted"
            : variant === "inverted-secondary"
              ? "ui-btn--inverted-secondary"
              : "ui-btn--dark";
  const className = `ui-btn ${variantClass}`;

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={className}
        data-button-variant={variant}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <LocalizedLink href={href} className={className} data-button-variant={variant}>
      {children}
    </LocalizedLink>
  );
}
