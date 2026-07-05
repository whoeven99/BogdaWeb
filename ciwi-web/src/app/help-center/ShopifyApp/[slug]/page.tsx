import Link from "next/link";
import {notFound} from "next/navigation";

import {ArticleCard} from "@/components/cards/ArticleCard";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {ContentToc} from "@/components/ui/ContentToc";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {blogPosts} from "@/content/blog";
import {helpCenterDocMap, helpCenterDocs} from "@/content/help-center";
import {getHelpDocMediaBriefs} from "@/content/media-briefs";
import {addSectionAnchors, extractFaqEntriesFromHtml, extractSectionsFromHtml} from "@/lib/content/sections";
import {buildPageMetadata} from "@/lib/seo/metadata";
import {siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildTechArticleSchema} from "@/lib/seo/schema";

type HelpCenterDetailPageProps = {
  params: Promise<{slug: string}>;
};

function getDocRelevanceScore(currentMeta: string[], candidateMeta: string[]) {
  return candidateMeta.filter((item) => currentMeta.includes(item)).length;
}

export function generateStaticParams() {
  return helpCenterDocs.map((doc) => ({slug: doc.slug}));
}

export async function generateMetadata({params}: HelpCenterDetailPageProps) {
  const {slug} = await params;
  const doc = helpCenterDocMap[slug];

  if (!doc) {
    return buildPageMetadata({
      title: "Help article not found",
      description: "The requested help article could not be found.",
      path: "/help-center",
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

  const contentHtml = addSectionAnchors(doc.contentHtml);
  const sections = extractSectionsFromHtml(doc.contentHtml);
  const faqEntries = extractFaqEntriesFromHtml(doc.contentHtml);
  const pageUrl = new URL(doc.href, siteUrl).toString();
  const relatedDocs = helpCenterDocs
    .filter((item) => item.slug !== doc.slug)
    .sort((left, right) => getDocRelevanceScore(doc.meta, right.meta) - getDocRelevanceScore(doc.meta, left.meta))
    .slice(0, 3);
  const relatedResources = doc.relatedResources ?? [
    {
      title: blogPosts[0].title,
      description: blogPosts[0].description,
      href: blogPosts[0].href,
      meta: ["Blog", blogPosts[0].publishedAt],
    },
    {
      title: "AI Translator",
      description: "回到产品页，直接看适用场景、Demo 和关键能力。",
      href: "/products/translator",
      meta: ["Product", "Translator"],
    },
  ];
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
  const mediaBriefs = getHelpDocMediaBriefs(doc);

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
        <section className="page-section page-hero">
          <div className="blog-layout">
            <article className="blog-article">
              <div className="article-meta">
                {doc.meta.map((item) => (
                  <span key={item}>{item}</span>
                ))}
                <span>{doc.readingTime}</span>
              </div>
              <SectionHeading eyebrow="Help Center" title={doc.title} description={doc.description} as="h1" />
              <div className="inline-list space-top-lg">
                <Link href="/help-center" className="button button--secondary">
                  Back to help center
                </Link>
                <Link href="/products/translator" className="button button--ghost">
                  Open translator product
                </Link>
              </div>
              <MediaPlaceholderSection
                eyebrow="Doc media"
                title="文档截图与视频预留"
                description="帮助文档更适合直接补截图或短视频，让用户不用只靠文字理解操作路径。"
                items={mediaBriefs}
                compact
              />
              <div className="article-prose space-top-xl" dangerouslySetInnerHTML={{__html: contentHtml}} />
            </article>

            <aside className="blog-aside">
              <ContentToc items={sections} title="Doc sections" />
              <div className="surface-card section-stack space-top-lg">
                <div>
                  <h3>Quick guidance</h3>
                  <p className="quote">
                    帮助文档最适合解决具体问题。读完这页后，如果你还在比较方案，再回到产品页和 Demo 会更有效。
                  </p>
                </div>
                <div>
                  <h3>Recommended next step</h3>
                  <p className="quote">先确认这项设置，再回到产品页看完整场景和相关资源。</p>
                </div>
              </div>

              <div className="section-stack space-top-lg">
                {relatedResources.map((item) => (
                  <ArticleCard
                    key={`${item.title}-${item.href}`}
                    title={item.title}
                    description={item.description}
                    href={item.href}
                    meta={item.meta}
                  />
                ))}
                {relatedDocs.map((item) => (
                  <ArticleCard
                    key={`${item.title}-${item.href}`}
                    title={item.title}
                    description={item.description}
                    href={item.href}
                    meta={item.meta}
                  />
                ))}
              </div>
            </aside>
          </div>
        </section>
        <FinalCtaSection
          title="先解决具体问题，再回到产品全貌"
          description="如果这篇文档已经回答了你的问题，下一步通常是进入产品页、Demo 或更多帮助文档继续确认。"
          primaryLabel="Open translator product"
          primaryHref="/products/translator"
          secondaryLabel="Browse help docs"
          secondaryHref="/help-center"
        />
      </PageContainer>
    </main>
  );
}
