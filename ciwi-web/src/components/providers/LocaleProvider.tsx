"use client";

import type {ReactNode} from "react";
import {createContext, useContext, useEffect, useMemo} from "react";
import {usePathname} from "next/navigation";

import {getHtmlLang, getLocaleFromPathname, type Locale} from "@/lib/i18n";

const LocaleContext = createContext<Locale>("en");

type LocaleProviderProps = {
  locale: Locale;
  children: ReactNode;
};

export function LocaleProvider({locale, children}: LocaleProviderProps) {
  const pathname = usePathname();
  const resolvedLocale = useMemo(() => {
    if (!pathname) {
      return locale;
    }

    return getLocaleFromPathname(pathname);
  }, [locale, pathname]);

  useEffect(() => {
    document.documentElement.lang = getHtmlLang(resolvedLocale);
  }, [resolvedLocale]);

  return <LocaleContext.Provider value={resolvedLocale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
