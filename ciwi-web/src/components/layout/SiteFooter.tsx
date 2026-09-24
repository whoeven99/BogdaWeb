"use client";

import {useLocale} from "@/components/providers/LocaleProvider";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {getNavigation} from "@/content/navigation";
import {getUiCopy} from "@/content/ui-copy";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61594522884274",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/ciwiai",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    ),
  },
  {
    label: "小红书",
    href: "https://www.xiaohongshu.com/user/profile/67ff1be9000000000e01ea05",
    icon: <img src="/xiaohongshu-com-logo.png" alt="" className="h-4 w-4 object-contain" />,
  },
];

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
    <footer className="ui-site-footer">
      <PageContainer>
        <div className="grid gap-10 py-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)]">
          <div className="space-y-4">
            <div className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">Ciwi</div>
            <p className="max-w-md text-sm leading-7 text-slate-600">{uiCopy.footer.description}</p>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-emerald-600 hover:text-emerald-700"
                >
                  {link.icon}
                </a>
              ))}
            </div>
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
