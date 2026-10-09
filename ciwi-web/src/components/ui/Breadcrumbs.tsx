import {LocalizedLink} from "@/components/ui/LocalizedLink";
import type {Locale} from "@/lib/i18n";

export function Breadcrumbs({locale, items}: {
  locale: Locale;
  items: {label: string; href?: string}[];
}) {
  return (
    <nav aria-label={locale === "zh-cn" ? "面包屑导航" : "Breadcrumb"} className="mb-6 text-sm text-slate-600">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <LocalizedLink href={item.href} className="hover:text-emerald-700">{item.label}</LocalizedLink>
            ) : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
