import {notFound} from "next/navigation";

import {HelpCenterDocsLayout} from "@/components/sections/HelpCenterDocsLayout";
import {PageContainer} from "@/components/ui/PageContainer";
import {detailPagesCopy} from "@/content/detail-pages-copy";
import {helpCenterDocMap, helpCenterDocs} from "@/content/help-center";
import {extractFaqEntriesFromHtml} from "@/lib/content/sections";
import {buildPageMetadata} from "@/lib/seo/metadata";
import {siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildTechArticleSchema} from "@/lib/seo/schema";

type HelpCenterDetailPageProps = {
  params: Promise<{slug: string}>;
};

export function generateStaticParams() {
  return helpCenterDocs.map((doc) => ({slug: doc.slug}));
}

export async function generateMetadata({params}: HelpCenterDetailPageProps) {
  const {slug} = await params;
  const doc = helpCenterDocMap[slug];

  if (!doc) {
    return buildPageMetadata({
      title: detailPagesCopy.helpCenterDoc.notFound.title,
      description: detailPagesCopy.helpCenterDoc.notFound.description,
      path: detailPagesCopy.helpCenterDoc.notFound.path,
    });
  }

  return buildPageMetadata({
    title: doc.title,
    description: doc.description,
    path: doc.href,
  });
}

export default async function HelpCenterDetailPage({params}: HelpCenterDetailPageProps) {
  const {slug} = await params;
  const doc = helpCenterDocMap[slug];

  if (!doc) {
    notFound();
  }

  const faqEntries = extractFaqEntriesFromHtml(doc.contentHtml);
  const pageUrl = new URL(doc.href, siteUrl).toString();
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: "Help Center", item: new URL("/help-center", siteUrl).toString()},
      {name: doc.title, item: pageUrl},
    ]),
    buildTechArticleSchema({
      url: pageUrl,
      headline: doc.title,
      description: doc.description,
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
        <HelpCenterDocsLayout currentDoc={doc} docs={helpCenterDocs} eyebrow={detailPagesCopy.helpCenterDoc.hero.eyebrow} />
      </PageContainer>
    </main>
  );
}
