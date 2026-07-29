"use client";

import type {ReactNode} from "react";

import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {isExternalHref} from "@/lib/i18n";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({href, children, variant = "primary"}: ButtonProps) {
  if (isExternalHref(href)) {
    return (
      <a href={href} className={`button button--${variant}`}>
        {children}
      </a>
    );
  }

  return (
    <LocalizedLink href={href} className={`button button--${variant}`}>
      {children}
    </LocalizedLink>
  );
}
