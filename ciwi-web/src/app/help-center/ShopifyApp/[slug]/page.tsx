import {notFound} from "next/navigation";

import {HelpCenterDocsLayout} from "@/components/sections/HelpCenterDocsLayout";
import {PageContainer} from "@/components/ui/PageContainer";
import {getHelpCenterDocMap, getHelpCenterDocs, helpCenterDocs} from "@/content/help-center";
import {extractFaqEntriesFromHtml} from "@/lib/content/sections";
import {localizeHref} from "@/lib/i18n";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";
import {siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildTechArticleSchema} from "@/lib/seo/schema";

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
  const pageUrl = new URL(localizeHref(locale, doc.href), siteUrl).toString();
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: copy.breadcrumbLabel, item: new URL(localizeHref(locale, "/help-center"), siteUrl).toString()},
      {name: doc.title, item: pageUrl},
    ]),
    buildTechArticleSchema({
      url: pageUrl,
      headline: doc.title,
      description: doc.description,
      datePublished: doc.publishedAt,
      keywords: doc.meta,
    }),
    ...(faqEntries.length ? [buildFaqSchema(faqEntries)] : []),
  ];

  return (
    <main>
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`${doc.slug}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}
        <HelpCenterDocsLayout currentDoc={doc} docs={docs} eyebrow={copy.eyebrow} locale={locale} />
      </PageContainer>
    </main>
  );
}
