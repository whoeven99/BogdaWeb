"use client";

import type {ComponentProps} from "react";

import {LocalizedLink} from "@/components/ui/LocalizedLink";

type BackLinkProps = Omit<ComponentProps<typeof LocalizedLink>, "children"> & {
  label: string;
};

export function BackLink({label, className, ...props}: BackLinkProps) {
  const classes = ["detail-backlink", className].filter(Boolean).join(" ");

  return (
    <LocalizedLink {...props} className={classes}>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="detail-backlink__icon"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 3.5L5.5 8 10 12.5" />
        <path d="M6 8H13" />
      </svg>
      <span>{label}</span>
    </LocalizedLink>
  );
}
