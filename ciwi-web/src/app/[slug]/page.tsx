import {notFound, permanentRedirect} from "next/navigation";
import type {Metadata} from "next";

import {legacyRouteMap, type LegacyRouteSlug} from "@/content/legacy-routes";
import {localizeHref} from "@/lib/i18n";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

type LegacyPageProps = {
  params: Promise<{slug: string}>;
};

function getLegacyCopy(locale: "en" | "zh-cn") {
  return locale === "zh-cn"
    ? {
        notFound: {
          title: "页面不存在",
          description: "你访问的页面不存在。",
          path: "/",
        },
        hero: {
          eyebrow: "旧路由",
          notice: "这个旧的根级页面已经并入新的目录化结构，当前兼容页会自动带你跳转到新的地址。",
          redirectingPrefix: "正在跳转到 ",
          openNewPageLabel: "打开新页面",
        },
      }
    : {
        notFound: {
          title: "Page not found",
          description: "The requested page could not be found.",
          path: "/",
        },
        hero: {
          eyebrow: "Legacy route",
          notice: "This older root-level page has been folded into the new structured route tree. The compatibility page will redirect visitors automatically.",
          redirectingPrefix: "Redirecting to ",
          openNewPageLabel: "Open new page",
        },
      };
}

export function generateStaticParams() {
  return Object.keys(legacyRouteMap).map((slug) => ({slug}));
}

export async function generateMetadata({params}: LegacyPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const data = legacyRouteMap[slug as LegacyRouteSlug];
  const copy = getLegacyCopy(locale);

  if (!data) {
    return buildPageMetadata({
      title: copy.notFound.title,
      description: copy.notFound.description,
      path: copy.notFound.path,
      locale,
    });
  }

  const metadata: Metadata = {
    ...buildPageMetadata({
      title: data.title,
      description: data.description,
      path: data.destination,
      locale,
    }),
    robots: {
      index: false,
      follow: true,
    },
  };

  return metadata;
}

export default async function LegacyRoutePage({params}: LegacyPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const data = legacyRouteMap[slug as LegacyRouteSlug];

  if (!data) {
    notFound();
  }

  const localizedDestination = localizeHref(locale, data.destination);

  permanentRedirect(localizedDestination);
}
