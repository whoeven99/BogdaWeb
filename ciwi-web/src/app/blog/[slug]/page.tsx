import {notFound} from "next/navigation";

import {MdxContent} from "@/components/content/MdxContent";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {getAllBlogPosts, getBlogPostMap, getBlogPosts} from "@/content/blog";
import {getUiCopy} from "@/content/ui-copy";
import {getRequestLocale} from "@/lib/i18n-server";
import {localizeHref} from "@/lib/i18n";
import {buildPageMetadata} from "@/lib/seo/metadata";
import {siteUrl} from "@/lib/seo/metadata";
import {buildBlogPostingSchema, buildBreadcrumbSchema} from "@/lib/seo/schema";

type BlogDetailPageProps = {
  params: Promise<{slug: string}>;
};

function getBlogDetailCopy(locale: "en" | "zh-cn") {
  return locale === "zh-cn"
    ? {
        notFound: {
          title: "未找到文章",
          description: "你访问的文章不存在。",
          path: "/blog",
        },
        hero: {
          eyebrow: "博客",
          backToBlogLabel: "返回博客",
          backToBlogHref: "/blog",
        },
      }
    : {
        notFound: {
          title: "Blog post not found",
          description: "The requested article could not be found.",
          path: "/blog",
        },
        hero: {
          eyebrow: "Blog",
          backToBlogLabel: "Back to blog",
          backToBlogHref: "/blog",
        },
      };
}

export function generateStaticParams() {
  return [...new Set(getAllBlogPosts().map((post) => post.slug))].map((slug) => ({slug}));
}

export async function generateMetadata({params}: BlogDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const post = getBlogPostMap(locale)[slug];
  const copy = getBlogDetailCopy(locale);

  if (!post) {
    return buildPageMetadata({
      title: copy.notFound.title,
      description: copy.notFound.description,
      path: copy.notFound.path,
      locale,
    });
  }

  return buildPageMetadata({
    title: post.title,
    description: post.description,
    path: post.href,
    locale,
  });
}

export default async function BlogDetailPage({params}: BlogDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const posts = getBlogPosts(locale);
  const post = getBlogPostMap(locale)[slug];
  const copy = getBlogDetailCopy(locale);
  const uiCopy = getUiCopy(locale);

  if (!post) {
    notFound();
  }

  const pageUrl = new URL(localizeHref(locale, post.href), siteUrl).toString();
  const currentIndex = posts.findIndex((item) => item.slug === post.slug);
  const previousPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "博客" : "Blog", item: new URL(localizeHref(locale, "/blog"), siteUrl).toString()},
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
              <LocalizedLink href={copy.hero.backToBlogHref} className="blog-article-single__backlink">
                {copy.hero.backToBlogLabel}
              </LocalizedLink>
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

            <MdxContent source={post.content} className="article-prose blog-article-single__prose" />

            <nav className="blog-article-single__pagination" aria-label={uiCopy.blog.paginationLabel}>
              {previousPost ? (
                <LocalizedLink href={previousPost.href} className="blog-article-single__pagination-link">
                  <span className="blog-article-single__pagination-label">{uiCopy.blog.previousLabel}</span>
                  <strong>{previousPost.title}</strong>
                </LocalizedLink>
              ) : <div />}

              {nextPost ? (
                <LocalizedLink
                  href={nextPost.href}
                  className="blog-article-single__pagination-link blog-article-single__pagination-link--next"
                >
                  <span className="blog-article-single__pagination-label">{uiCopy.blog.nextLabel}</span>
                  <strong>{nextPost.title}</strong>
                </LocalizedLink>
              ) : <div />}
            </nav>
          </article>
        </section>
      </PageContainer>
    </main>
  );
}
