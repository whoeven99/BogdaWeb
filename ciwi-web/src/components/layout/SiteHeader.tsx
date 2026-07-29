import Image from "next/image";

import {Button} from "@/components/ui/Button";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {getNavigation} from "@/content/navigation";
import {getUiCopy} from "@/content/ui-copy";
import type {Locale} from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({locale}: SiteHeaderProps) {
  const navigation = getNavigation(locale);
  const uiCopy = getUiCopy(locale);

  return (
    <header className="site-header">
      <PageContainer>
        <div className="site-header__inner">
          <LocalizedLink href="/" className="site-brand site-brand--header" aria-label="Ciwi">
            <span className="site-brand__mark">
              <Image src="/logo-150.png" alt="Ciwi" width={44} height={44} priority />
            </span>
            <span className="site-brand__wordmark" aria-hidden="true">
              <span className="site-brand__name">Ciwi.ai</span>
              <span className="site-brand__tagline">AI PRODUCTS FOR SHOPIFY</span>
            </span>
          </LocalizedLink>
          <nav className="site-nav__links" aria-label="Primary">
            {navigation.primaryNavigation.map((item) => (
              <LocalizedLink key={item.href} href={item.href} className="site-nav__link">
                {item.label}
              </LocalizedLink>
            ))}
          </nav>
          <div className="header-cta">
            <Button href={uiCopy.cta.installHref}>{uiCopy.cta.installLabel}</Button>
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
