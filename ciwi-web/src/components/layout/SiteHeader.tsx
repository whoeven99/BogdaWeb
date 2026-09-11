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
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <PageContainer>
        <div className="relative flex min-h-[80px] items-center justify-between gap-4">
          <LocalizedLink
            href="/"
            className="inline-flex min-h-12 items-center gap-3 rounded-full pr-2 transition-opacity hover:opacity-90"
            aria-label="Ciwi"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
              <Image src="/logo-150.png" alt="Ciwi" width={44} height={44} priority />
            </span>
            <span className="grid gap-0.5 leading-none" aria-hidden="true">
              <span className="text-base font-semibold tracking-[-0.04em] text-slate-950">Ciwi.ai</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                AI PRODUCTS FOR SHOPIFY
              </span>
            </span>
          </LocalizedLink>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 lg:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-site-nav"
            aria-label={mobileMenuOpen ? mobileCopy.closeMenu : mobileCopy.openMenu}
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 lg:flex" aria-label="Primary">
            {navigation.primaryNavigation.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isDesktopOpen = openDesktopItem === item.label;

              return (
                <div
                  key={`${item.label}-${item.href}`}
                  className={[
                    "relative",
                    hasChildren
                      ? "pb-5 -mb-5 after:absolute after:left-[-24px] after:right-[-24px] after:top-full after:h-7 after:content-['']"
                      : "",
                  ].join(" ")}
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
                    className={[
                      "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                      isDesktopOpen
                        ? "bg-slate-100 text-slate-950"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                    ].join(" ")}
                    aria-haspopup={hasChildren ? "menu" : undefined}
                    aria-expanded={hasChildren ? isDesktopOpen : undefined}
                  >
                    <span>{item.label}</span>
                    {hasChildren ? <span className="text-[11px] text-slate-400" aria-hidden="true">▾</span> : null}
                  </LocalizedLink>
                  {hasChildren ? (
                    <div
                      className={[
                        "absolute left-1/2 top-[calc(100%+10px)] min-w-[260px] -translate-x-1/2 rounded-3xl border border-slate-200/80 bg-white/95 p-3 shadow-[0_22px_60px_-28px_rgba(15,23,42,0.35)] backdrop-blur",
                        "transition-all duration-200",
                        isDesktopOpen ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-2 opacity-0",
                      ].join(" ")}
                      role="menu"
                      aria-label={item.label}
                    >
                      {item.children?.map((child) => (
                        <LocalizedLink
                          key={`${child.label}-${child.href}`}
                          href={child.href}
                          className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                          role="menuitem"
                        >
                          {child.label}
                        </LocalizedLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
          <div
            className={[
              "absolute inset-x-0 top-full mt-3 rounded-[28px] border border-slate-200 bg-white/95 p-4 shadow-[0_22px_60px_-28px_rgba(15,23,42,0.35)] backdrop-blur lg:hidden",
              mobileMenuOpen ? "block" : "hidden",
            ].join(" ")}
            id="mobile-site-nav"
          >
            <nav className="space-y-2" aria-label={mobileCopy.menuLabel}>
              {navigation.primaryNavigation.map((item) => (
                <div key={`mobile-${item.label}-${item.href}`} className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-2">
                  <div className="flex items-center justify-between gap-3">
                    <LocalizedLink
                      href={item.href}
                      className="min-w-0 flex-1 rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </LocalizedLink>
                    {item.children?.length ? (
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:border-emerald-200 hover:text-emerald-700"
                        aria-expanded={expandedItem === item.label}
                        onClick={() => handleToggleSubmenu(item.label)}
                      >
                        {expandedItem === item.label ? "−" : "+"}
                      </button>
                    ) : null}
                  </div>
                  {item.children?.length && expandedItem === item.label ? (
                    <div className="mt-2 grid gap-1 px-2 pb-1">
                      {item.children.map((child) => (
                        <LocalizedLink
                          key={`mobile-${child.label}-${child.href}`}
                          href={child.href}
                          className="rounded-xl px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-white hover:text-slate-950"
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
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
              <LocaleSwitcher />
              <Button href={uiCopy.cta.installHref}>{uiCopy.cta.installLabel}</Button>
            </div>
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <LocaleSwitcher />
            <Button href={uiCopy.cta.installHref}>{uiCopy.cta.installLabel}</Button>
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
