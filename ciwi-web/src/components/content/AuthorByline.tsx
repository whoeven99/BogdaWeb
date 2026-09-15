"use client";

import Image from "next/image";

import {useLocale} from "@/components/providers/LocaleProvider";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import type {Author} from "@/content/authors";

type AuthorBylineProps = {
  author: Author;
  className?: string;
};

export function AuthorByline({author, className}: AuthorBylineProps) {
  const locale = useLocale();

  return (
    <div className={["flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 px-5 py-4", className].filter(Boolean).join(" ")}>
      <Image src={author.avatar} alt={author.name} width={44} height={44} className="h-11 w-11 shrink-0 rounded-full object-cover" />
      <div className="min-w-0">
        <div className="text-sm font-semibold text-slate-950">
          <LocalizedLink href={`/authors/${author.id}`} className="hover:underline">
            {author.name}
          </LocalizedLink>
        </div>
        <div className="text-[13px] text-slate-500">{author.role[locale]}</div>
        <p className="mt-1 text-[13px] leading-6 text-slate-600">{author.bio[locale]}</p>
      </div>
    </div>
  );
}
