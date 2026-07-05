import Link from "next/link";

import {footerNavigation} from "@/content/navigation";
import {PageContainer} from "@/components/ui/PageContainer";

const footerGroups = [
  {title: "Products", items: footerNavigation.products},
  {title: "Resources", items: footerNavigation.resources},
  {title: "Company", items: footerNavigation.company},
  {title: "Legal", items: footerNavigation.legal},
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <PageContainer>
        <div className="footer-grid">
          <div>
            <div className="site-brand">Ciwi</div>
            <p className="muted">
              Built for Shopify merchants working on localization, content efficiency, and conversion growth.
            </p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title} className="site-footer__group">
              <h4>{group.title}</h4>
              <div className="site-footer__links">
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} className="site-footer__link">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="site-footer__meta">© 2026 Bogda Limited. Built for Shopify-first growth.</div>
      </PageContainer>
    </footer>
  );
}
