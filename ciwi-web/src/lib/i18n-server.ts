import {headers} from "next/headers";

import {normalizeLocale} from "@/lib/i18n";

export async function getRequestLocale() {
  const headerStore = await headers();
  return normalizeLocale(headerStore.get("x-ciwi-locale"));
}
