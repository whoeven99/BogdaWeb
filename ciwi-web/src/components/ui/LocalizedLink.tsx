"use client";

import Link from "next/link";
import type {ComponentProps} from "react";

import {useLocale} from "@/components/providers/LocaleProvider";
import {resolveLocalizedHref} from "@/lib/route-locale";

type LocalizedLinkProps = ComponentProps<typeof Link>;

export function LocalizedLink({href, ...props}: LocalizedLinkProps) {
  const locale = useLocale();
  const localizedHref = typeof href === "string" ? resolveLocalizedHref(locale, href) : href;

  return <Link href={localizedHref} {...props} />;
}
