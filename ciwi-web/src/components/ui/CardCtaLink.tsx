"use client";

import type {ReactNode} from "react";

import {LocalizedLink} from "@/components/ui/LocalizedLink";

type CardCtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "outlined" | "text";
};

export function CardCtaLink({href, children, variant = "outlined"}: CardCtaLinkProps) {
  const className = [
    "group !inline-flex !items-center !gap-2 !text-sm !font-semibold !transition-colors !duration-200",
    variant === "outlined"
      ? "!rounded-full !border-transparent !bg-slate-950 !px-4 !py-2 !text-white shadow-[0_10px_24px_-14px_rgba(15,23,42,0.45)] hover:!bg-emerald-700 hover:!text-white"
      : "!text-slate-700 hover:!text-emerald-700",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <LocalizedLink href={href} className={className} data-card-cta-variant={variant}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
        →
      </span>
    </LocalizedLink>
  );
}
