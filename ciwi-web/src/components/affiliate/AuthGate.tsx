"use client";

import {useEffect, type ReactNode} from "react";
import {useRouter} from "next/navigation";

import {useAffiliate} from "@/components/providers/AffiliateProvider";
import {useLocale} from "@/components/providers/LocaleProvider";
import {localizeHref} from "@/lib/i18n";

export function AuthGate({children}: {children: ReactNode}) {
  const {isAuthed, isHydrated} = useAffiliate();
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !isAuthed) {
      router.replace(localizeHref(locale, "/affiliate/login"));
    }
  }, [isHydrated, isAuthed, locale, router]);

  if (!isHydrated || !isAuthed) {
    return null;
  }

  return <>{children}</>;
}
