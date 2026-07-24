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
              <span className="site-brand__name">Ciwi</span>
              <span className="site-brand__tagline">Shopify AI</span>
            </span>
          </Link>
          <div className="site-nav">
            <nav className="site-nav__links" aria-label="Primary">
              {primaryNavigation.map((item) => (
                <Link key={item.href} href={item.href} className="site-nav__link">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="header-cta">
              <Button href="/demo" variant="secondary">
                View Demo
              </Button>
              <Button href="https://apps.shopify.com/translator-by-ciwi">Install on Shopify</Button>
            </div>
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
