"use client";

import Link from "next/link";
import type {ComponentProps} from "react";

import {useLocale} from "@/components/providers/LocaleProvider";
import {localizeHref} from "@/lib/i18n";

type LocalizedLinkProps = ComponentProps<typeof Link>;

export function LocalizedLink({href, ...props}: LocalizedLinkProps) {
  const locale = useLocale();
  const localizedHref = typeof href === "string" ? localizeHref(locale, href) : href;

  return <Link href={localizedHref} {...props} />;
}
