import Link from "next/link";
import {notFound} from "next/navigation";

import {ArticleCard} from "@/components/cards/ArticleCard";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {ContentToc} from "@/components/ui/ContentToc";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {blogPosts} from "@/content/blog";
import {detailPagesCopy} from "@/content/detail-pages-copy";
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
  const copy = detailPagesCopy.helpCenterDoc;

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
      title: copy.relatedFallback.translatorTitle,
      description: copy.relatedFallback.translatorDescription,
      href: copy.relatedFallback.translatorHref,
      meta: [...copy.relatedFallback.translatorMeta],
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
              <SectionHeading eyebrow={copy.hero.eyebrow} title={doc.title} description={doc.description} as="h1" />
              <div className="inline-list space-top-lg">
                <Link href={copy.hero.backHref} className="button button--secondary">
                  {copy.hero.backLabel}
                </Link>
                <Link href={copy.hero.primaryCtaHref} className="button button--ghost">
                  {copy.hero.primaryCtaLabel}
                </Link>
              </div>
              <MediaPlaceholderSection
                eyebrow={copy.media.eyebrow}
                title={copy.media.title}
                description={copy.media.description}
                items={mediaBriefs}
                compact
              />
              <div className="article-prose space-top-xl" dangerouslySetInnerHTML={{__html: contentHtml}} />
            </article>

            <aside className="blog-aside">
              <ContentToc items={sections} title={copy.aside.tocTitle} />
              <div className="surface-card section-stack space-top-lg">
                <div>
                  <h3>{copy.aside.quickTitle}</h3>
                  <p className="quote">{copy.aside.quickText}</p>
                </div>
                <div>
                  <h3>{copy.aside.nextStepTitle}</h3>
                  <p className="quote">{copy.aside.nextStepText}</p>
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
          title={copy.finalCta.title}
          description={copy.finalCta.description}
          primaryLabel={copy.finalCta.primaryLabel}
          primaryHref={copy.finalCta.primaryHref}
          secondaryLabel={copy.finalCta.secondaryLabel}
          secondaryHref={copy.finalCta.secondaryHref}
        />
      </PageContainer>
    </main>
  );
}
