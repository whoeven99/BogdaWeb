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
  const className = [
    "!inline-flex !min-h-11 !items-center !justify-center !rounded-full !px-5 !text-sm !font-semibold !transition-all !duration-200",
    "focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-emerald-500/60 focus-visible:!ring-offset-2",
    variant === "primary"
      ? "!border-transparent !bg-slate-950 !text-white shadow-[0_12px_30px_-12px_rgba(15,23,42,0.4)] hover:!bg-emerald-700 hover:!text-white"
      : "",
    variant === "secondary"
      ? "!border-transparent !bg-emerald-50 !text-slate-950 !ring-1 !ring-inset !ring-emerald-200 hover:!bg-emerald-100 hover:!text-slate-950"
      : "",
    variant === "ghost" ? "!bg-transparent !text-slate-700 hover:!bg-slate-100 hover:!text-slate-950" : "",
    variant === "dark" ? "!border-transparent !bg-white !text-slate-950 shadow-sm hover:!bg-slate-100 hover:!text-slate-950" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (isExternalHref(href)) {
    return (
      <a href={href} className={className} data-button-variant={variant}>
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
