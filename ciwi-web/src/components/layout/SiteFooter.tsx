"use client";

import {useLocale} from "@/components/providers/LocaleProvider";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {getNavigation} from "@/content/navigation";
import {getUiCopy} from "@/content/ui-copy";

export function SiteFooter() {
  const locale = useLocale();
  const navigation = getNavigation(locale);
  const uiCopy = getUiCopy(locale);
  const footerGroups = [
    {title: navigation.footerGroupTitles.products, items: navigation.footerNavigation.products},
    {title: navigation.footerGroupTitles.resources, items: navigation.footerNavigation.resources},
    {title: navigation.footerGroupTitles.company, items: navigation.footerNavigation.company},
    {title: navigation.footerGroupTitles.legal, items: navigation.footerNavigation.legal},
  ];

  return (
    <footer className="border-t border-slate-200 bg-white/80">
      <PageContainer>
        <div className="grid gap-10 py-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)]">
          <div className="space-y-4">
            <div className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">Ciwi</div>
            <p className="max-w-md text-sm leading-7 text-slate-600">{uiCopy.footer.description}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title} className="space-y-3">
                <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{group.title}</h4>
                <div className="grid gap-2">
                  {group.items.map((item) => (
                    <LocalizedLink
                      key={item.href}
                      href={item.href}
                      className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700"
                    >
                      {item.label}
                    </LocalizedLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-200 py-5 text-sm text-slate-500">{uiCopy.footer.meta}</div>
      </PageContainer>
    </footer>
  );
}
