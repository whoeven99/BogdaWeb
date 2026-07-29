import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {getNavigation} from "@/content/navigation";
import {getUiCopy} from "@/content/ui-copy";
import type {Locale} from "@/lib/i18n";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({locale}: SiteFooterProps) {
  const navigation = getNavigation(locale);
  const uiCopy = getUiCopy(locale);
  const footerGroups = [
    {title: navigation.footerGroupTitles.products, items: navigation.footerNavigation.products},
    {title: navigation.footerGroupTitles.resources, items: navigation.footerNavigation.resources},
    {title: navigation.footerGroupTitles.company, items: navigation.footerNavigation.company},
    {title: navigation.footerGroupTitles.legal, items: navigation.footerNavigation.legal},
  ];

  return (
    <footer className="site-footer">
      <PageContainer>
        <div className="footer-grid">
          <div>
            <div className="site-brand">Ciwi</div>
            <p className="muted">{uiCopy.footer.description}</p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title} className="site-footer__group">
              <h4>{group.title}</h4>
              <div className="site-footer__links">
                {group.items.map((item) => (
                  <LocalizedLink key={item.href} href={item.href} className="site-footer__link">
                    {item.label}
                  </LocalizedLink>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="site-footer__meta">{uiCopy.footer.meta}</div>
      </PageContainer>
    </footer>
  );
}
