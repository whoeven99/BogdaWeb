"use client";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";

import {useLocale} from "@/components/providers/LocaleProvider";
import {Button} from "@/components/ui/Button";
import {LocaleSwitcher} from "@/components/ui/LocaleSwitcher";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {getNavigation} from "@/content/navigation";
import {getUiCopy} from "@/content/ui-copy";

export function SiteHeader() {
  const DESKTOP_NAV_OPEN_DELAY_MS = 90;
  const DESKTOP_NAV_CLOSE_DELAY_MS = 220;
  const locale = useLocale();
  const navigation = getNavigation(locale);
  const uiCopy = getUiCopy(locale);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [openDesktopItem, setOpenDesktopItem] = useState<string | null>(null);
  const openDesktopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeDesktopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mobileCopy =
    locale === "zh-cn"
      ? {
          openMenu: "打开菜单",
          closeMenu: "关闭菜单",
          menuLabel: "主菜单",
        }
      : {
          openMenu: "Open menu",
          closeMenu: "Close menu",
          menuLabel: "Main menu",
        };

  function handleToggleSubmenu(label: string) {
    setExpandedItem((current) => (current === label ? null : label));
  }

  function clearDesktopOpenTimer() {
    if (openDesktopTimerRef.current) {
      clearTimeout(openDesktopTimerRef.current);
      openDesktopTimerRef.current = null;
    }
  }

  function clearDesktopCloseTimer() {
    if (closeDesktopTimerRef.current) {
      clearTimeout(closeDesktopTimerRef.current);
      closeDesktopTimerRef.current = null;
    }
  }

  function scheduleDesktopOpen(label: string) {
    clearDesktopCloseTimer();

    if (openDesktopItem === label) {
      clearDesktopOpenTimer();
      return;
    }

    clearDesktopOpenTimer();
    openDesktopTimerRef.current = setTimeout(() => {
      setOpenDesktopItem(label);
      openDesktopTimerRef.current = null;
    }, DESKTOP_NAV_OPEN_DELAY_MS);
  }

  function openDesktopItemNow(label: string) {
    clearDesktopOpenTimer();
    clearDesktopCloseTimer();
    setOpenDesktopItem(label);
  }

  function scheduleDesktopClose(label: string) {
    clearDesktopOpenTimer();
    clearDesktopCloseTimer();
    closeDesktopTimerRef.current = setTimeout(() => {
      setOpenDesktopItem((current) => (current === label ? null : current));
      closeDesktopTimerRef.current = null;
    }, DESKTOP_NAV_CLOSE_DELAY_MS);
  }

  useEffect(() => {
    return () => {
      clearDesktopOpenTimer();
      clearDesktopCloseTimer();
    };
  }, []);

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
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-site-nav"
            aria-label={mobileMenuOpen ? mobileCopy.closeMenu : mobileCopy.openMenu}
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>
          <nav className="site-nav__links" aria-label="Primary">
            {navigation.primaryNavigation.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isDesktopOpen = openDesktopItem === item.label;

              return (
                <div
                  key={`${item.label}-${item.href}`}
                  className={`site-nav__item${hasChildren ? " site-nav__item--has-children" : ""}${isDesktopOpen ? " site-nav__item--open" : ""}`}
                  onMouseEnter={hasChildren ? () => scheduleDesktopOpen(item.label) : undefined}
                  onMouseLeave={hasChildren ? () => scheduleDesktopClose(item.label) : undefined}
                  onFocus={hasChildren ? () => openDesktopItemNow(item.label) : undefined}
                  onBlur={
                    hasChildren
                      ? (event) => {
                          const nextTarget = event.relatedTarget;

                          if (!event.currentTarget.contains(nextTarget as Node | null)) {
                            setOpenDesktopItem((current) => (current === item.label ? null : current));
                          }
                        }
                      : undefined
                  }
                >
                  <LocalizedLink
                    href={item.href}
                    className={hasChildren ? "site-nav__link site-nav__link--trigger" : "site-nav__link"}
                    aria-haspopup={hasChildren ? "menu" : undefined}
                    aria-expanded={hasChildren ? isDesktopOpen : undefined}
                  >
                  <span>{item.label}</span>
                    {hasChildren ? <span className="site-nav__caret" aria-hidden="true">▾</span> : null}
                  </LocalizedLink>
                  {hasChildren ? (
                    <div className="site-nav__dropdown" role="menu" aria-label={item.label}>
                      {item.children?.map((child) => (
                        <LocalizedLink key={`${child.label}-${child.href}`} href={child.href} className="site-nav__dropdown-link" role="menuitem">
                          {child.label}
                        </LocalizedLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
          <div className={`mobile-menu-drawer${mobileMenuOpen ? " mobile-menu-drawer--open" : ""}`} id="mobile-site-nav">
            <nav className="mobile-menu-nav" aria-label={mobileCopy.menuLabel}>
              {navigation.primaryNavigation.map((item) => (
                <div key={`mobile-${item.label}-${item.href}`} className="mobile-menu-group">
                  <div className="mobile-menu-row">
                    <LocalizedLink
                      href={item.href}
                      className="mobile-menu-link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </LocalizedLink>
                    {item.children?.length ? (
                      <button
                        type="button"
                        className="mobile-menu-expand"
                        aria-expanded={expandedItem === item.label}
                        onClick={() => handleToggleSubmenu(item.label)}
                      >
                        {expandedItem === item.label ? "−" : "+"}
                      </button>
                    ) : null}
                  </div>
                  {item.children?.length && expandedItem === item.label ? (
                    <div className="mobile-submenu">
                      {item.children.map((child) => (
                        <LocalizedLink
                          key={`mobile-${child.label}-${child.href}`}
                          href={child.href}
                          className="mobile-submenu-link"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.label}
                        </LocalizedLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>
            <div className="mobile-menu-footer">
              <LocaleSwitcher />
              <Button href={uiCopy.cta.installHref}>{uiCopy.cta.installLabel}</Button>
            </div>
          </div>
          <div className="header-cta">
            <LocaleSwitcher />
            <Button href={uiCopy.cta.installHref}>{uiCopy.cta.installLabel}</Button>
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
