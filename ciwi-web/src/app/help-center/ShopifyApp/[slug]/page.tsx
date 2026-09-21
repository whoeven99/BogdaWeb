import {notFound} from "next/navigation";

import {HelpCenterDocsLayout} from "@/components/sections/HelpCenterDocsLayout";
import {PageContainer} from "@/components/ui/PageContainer";
import {getHelpCenterDocMap, getHelpCenterDocs, helpCenterDocs} from "@/content/help-center";
import {extractFaqEntriesFromHtml} from "@/lib/content/sections";
import {getRequestLocale} from "@/lib/i18n-server";
import {localizeLanguageSignalList, localizeLanguageSignalText} from "@/lib/localized-language-signal";
import {buildPageMetadata, siteUrl, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildTechArticleSchema, buildGraphSchema} from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

type HelpCenterDetailPageProps = {
  params: Promise<{slug: string}>;
};

function getHelpCenterDetailCopy(locale: "en" | "zh-cn") {
  return locale === "zh-cn"
    ? {
        notFound: {
          title: "未找到帮助文档",
          description: "你访问的帮助文档不存在。",
          path: "/help-center",
        },
        eyebrow: "帮助中心",
        breadcrumbLabel: "帮助中心",
      }
    : {
        notFound: {
          title: "Help article not found",
          description: "The requested help article could not be found.",
          path: "/help-center",
        },
        eyebrow: "Help Center",
        breadcrumbLabel: "Help Center",
      };
}

export function generateStaticParams() {
  return helpCenterDocs.map((doc) => ({slug: doc.slug}));
}

export async function generateMetadata({params}: HelpCenterDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const doc = getHelpCenterDocMap(locale)[slug];
  const copy = getHelpCenterDetailCopy(locale);

  if (!doc) {
    return buildPageMetadata({
      title: copy.notFound.title,
      description: copy.notFound.description,
      path: copy.notFound.path,
      locale,
    });
  }

  return buildPageMetadata({
    title: doc.title,
    description: doc.description,
    path: doc.href,
    locale,
  });
}

export default async function HelpCenterDetailPage({params}: HelpCenterDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const doc = getHelpCenterDocMap(locale)[slug];
  const docs = getHelpCenterDocs(locale);
  const copy = getHelpCenterDetailCopy(locale);

  if (!doc) {
    notFound();
  }

  const faqEntries = extractFaqEntriesFromHtml(doc.contentHtml);
  const pageUrl = toAbsoluteLocalizedUrl(locale, doc.href);
  const localizedTitle = localizeLanguageSignalText(locale, doc.title);
  const localizedDescription = localizeLanguageSignalText(locale, doc.description);
  const structuredData = buildGraphSchema([
    buildBreadcrumbSchema([
      {name: locale === "zh-cn" ? "首页" : "Home", item: siteUrl},
      {name: copy.breadcrumbLabel, item: toAbsoluteLocalizedUrl(locale, "/help-center")},
      {name: localizedTitle, item: pageUrl},
    ]),
    buildTechArticleSchema({
      url: pageUrl,
      headline: localizedTitle,
      description: localizedDescription,
      datePublished: doc.publishedAt,
      keywords: localizeLanguageSignalList(locale, doc.meta),
    }),
    ...(faqEntries.length ? [buildFaqSchema(faqEntries)] : []),
  ]);

  return (
    <main>
      <PageContainer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />
        <HelpCenterDocsLayout currentDoc={doc} docs={docs} eyebrow={copy.eyebrow} locale={locale} />
      </PageContainer>
    </main>
  );
}
