import Image from "next/image";
import Link from "next/link";

import {primaryNavigation} from "@/content/navigation";
import {Button} from "@/components/ui/Button";
import {PageContainer} from "@/components/ui/PageContainer";

export function SiteHeader() {
  return (
    <header className="site-header">
      <PageContainer>
        <div className="site-header__inner">
          <Link href="/" className="site-brand site-brand--header" aria-label="Ciwi">
            <span className="site-brand__mark">
              <Image src="/logo-150.png" alt="Ciwi" width={44} height={44} priority />
            </span>
            <span className="site-brand__wordmark" aria-hidden="true">
              <span className="site-brand__name">Ciwi.ai</span>
              <span className="site-brand__tagline">AI PRODUCTS FOR SHOPIFY</span>
            </span>
          </Link>
          <nav className="site-nav__links" aria-label="Primary">
            {primaryNavigation.map((item) => (
              <Link key={item.href} href={item.href} className="site-nav__link">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-cta">
            <Button href="https://apps.shopify.com/partners/bogdatech">Install on Shopify</Button>
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
