import Link from "next/link";
import {notFound} from "next/navigation";

import {ArticleCard} from "@/components/cards/ArticleCard";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {ContentToc} from "@/components/ui/ContentToc";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {blogPostMap, blogPosts} from "@/content/blog";
import {detailPagesCopy} from "@/content/detail-pages-copy";
import {helpCenterDocs} from "@/content/help-center";
import {getBlogMediaBriefs} from "@/content/media-briefs";
import {addSectionAnchors, extractSectionsFromHtml} from "@/lib/content/sections";
import {buildPageMetadata} from "@/lib/seo/metadata";
import {siteUrl} from "@/lib/seo/metadata";
import {buildBlogPostingSchema, buildBreadcrumbSchema} from "@/lib/seo/schema";

type BlogDetailPageProps = {
  params: Promise<{slug: string}>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({slug: post.slug}));
}

export async function generateMetadata({params}: BlogDetailPageProps) {
  const {slug} = await params;
  const post = blogPostMap[slug];

  if (!post) {
    return buildPageMetadata({
      title: detailPagesCopy.blog.notFound.title,
      description: detailPagesCopy.blog.notFound.description,
      path: detailPagesCopy.blog.notFound.path,
    });
  }

  return buildPageMetadata({
    title: post.title,
    description: post.description,
    path: post.href,
  });
}

export default async function BlogDetailPage({params}: BlogDetailPageProps) {
  const {slug} = await params;
  const post = blogPostMap[slug];
  const copy = detailPagesCopy.blog;

  if (!post) {
    notFound();
  }

  const contentHtml = addSectionAnchors(post.contentHtml);
  const sections = extractSectionsFromHtml(post.contentHtml);
  const pageUrl = new URL(post.href, siteUrl).toString();
  const relatedDocs = helpCenterDocs.slice(0, 3);
  const relatedPosts = blogPosts
    .filter((item) => item.slug !== post.slug && item.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 2);
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: "Blog", item: new URL("/blog", siteUrl).toString()},
      {name: post.title, item: pageUrl},
    ]),
    buildBlogPostingSchema({
      url: pageUrl,
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      keywords: post.tags,
    }),
  ];
  const mediaBriefs = getBlogMediaBriefs(post);

  return (
    <main>
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`${post.slug}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}
        <section className="page-section page-hero">
          <div className="blog-layout">
            <article className="blog-article">
              <div className="article-meta">
                <span>{post.publishedAt}</span>
                <span>{post.readingTime}</span>
                <span>{post.tags.join(" · ")}</span>
              </div>
              <SectionHeading eyebrow={copy.hero.eyebrow} title={post.title} description={post.description} as="h1" />
              <div className="inline-list space-top-lg">
                <Link href={copy.hero.backToBlogHref} className="button button--secondary">
                  {copy.hero.backToBlogLabel}
                </Link>
                <Link href={post.sourceHref} className="button button--ghost">
                  {copy.hero.viewSourceLabel}
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
                  <h3>{copy.aside.keepReadingTitle}</h3>
                  <p className="quote">{copy.aside.keepReadingText}</p>
                </div>
                <div>
                  <h3>{copy.aside.nextStepTitle}</h3>
                  <p className="quote">{copy.aside.nextStepText}</p>
                </div>
              </div>
              <div className="section-stack space-top-lg">
                {relatedPosts.map((item) => (
                  <ArticleCard
                    key={`${item.title}-${item.href}`}
                    title={item.title}
                    description={item.description}
                    href={item.href}
                    meta={[copy.aside.relatedPostMetaLabel, item.publishedAt]}
                  />
                ))}
                {relatedDocs.map((doc) => (
                  <ArticleCard
                    key={`${doc.title}-${doc.href}`}
                    title={doc.title}
                    description={doc.description}
                    href={doc.href}
                    meta={doc.meta}
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
