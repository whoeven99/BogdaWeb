import Link from "next/link";
import {notFound} from "next/navigation";

import {PageContainer} from "@/components/ui/PageContainer";
import {blogPostMap, blogPosts} from "@/content/blog";
import {detailPagesCopy} from "@/content/detail-pages-copy";
import {addSectionAnchors} from "@/lib/content/sections";
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
  const pageUrl = new URL(post.href, siteUrl).toString();
  const currentIndex = blogPosts.findIndex((item) => item.slug === post.slug);
  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
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

  return (
    <main className="blog-article-page">
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`${post.slug}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}

        <section className="blog-article-shell">
          <article className="blog-article-single">
            <div className="blog-article-single__topbar">
              <Link href={copy.hero.backToBlogHref} className="blog-article-single__backlink">
                {copy.hero.backToBlogLabel}
              </Link>
              <Link href={post.sourceHref} className="blog-article-single__source">
                {copy.hero.viewSourceLabel}
              </Link>
            </div>

            <div className="article-meta">
              <span>{post.publishedAt}</span>
              <span>{post.readingTime}</span>
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <header className="blog-article-single__header">
              <span className="section-heading__eyebrow">{copy.hero.eyebrow}</span>
              <h1>{post.title}</h1>
              <p>{post.description}</p>
            </header>

            <div className="article-prose blog-article-single__prose" dangerouslySetInnerHTML={{__html: contentHtml}} />

            <nav className="blog-article-single__pagination" aria-label="Blog article pagination">
              {previousPost ? (
                <Link href={previousPost.href} className="blog-article-single__pagination-link">
                  <span className="blog-article-single__pagination-label">上一篇</span>
                  <strong>{previousPost.title}</strong>
                </Link>
              ) : <div />}

              {nextPost ? (
                <Link
                  href={nextPost.href}
                  className="blog-article-single__pagination-link blog-article-single__pagination-link--next"
                >
                  <span className="blog-article-single__pagination-label">下一篇</span>
                  <strong>{nextPost.title}</strong>
                </Link>
              ) : <div />}
            </nav>
          </article>
        </section>
      </PageContainer>
    </main>
  );
}
