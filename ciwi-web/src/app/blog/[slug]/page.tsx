import Link from "next/link";
import {notFound} from "next/navigation";

import {ArticleCard} from "@/components/cards/ArticleCard";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {ContentToc} from "@/components/ui/ContentToc";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {blogPostMap, blogPosts} from "@/content/blog";
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
      title: "Blog post not found",
      description: "The requested article could not be found.",
      path: "/blog",
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
              <SectionHeading eyebrow="Blog" title={post.title} description={post.description} as="h1" />
              <div className="inline-list space-top-lg">
                <Link href="/blog" className="button button--secondary">
                  Back to blog
                </Link>
                <Link href={post.sourceHref} className="button button--ghost">
                  View original source
                </Link>
              </div>
              <MediaPlaceholderSection
                eyebrow="Article media"
                title="文章题图预留"
                description="博客详情页建议在正文前补一张主题图，帮助文章看起来更完整。"
                items={mediaBriefs}
                compact
              />
              <div className="article-prose space-top-xl" dangerouslySetInnerHTML={{__html: contentHtml}} />
            </article>

            <aside className="blog-aside">
              <ContentToc items={sections} title="Article sections" />
              <div className="surface-card section-stack space-top-lg">
                <div>
                  <h3>Keep reading</h3>
                  <p className="quote">
                    如果这篇文章和你的业务相关，下一步通常不是继续看抽象观点，而是回到产品、帮助文档和具体配置里确认细节。
                  </p>
                </div>
                <div>
                  <h3>Recommended next step</h3>
                  <p className="quote">先看相关帮助文档，再回到产品页确认 glossary、多语言和 Shopify 适配方式。</p>
                </div>
              </div>
              <div className="section-stack space-top-lg">
                {relatedPosts.map((item) => (
                  <ArticleCard
                    key={`${item.title}-${item.href}`}
                    title={item.title}
                    description={item.description}
                    href={item.href}
                    meta={["Blog", item.publishedAt]}
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
          title="从内容理解问题，再回到产品和配置"
          description="如果你已经知道自己要解决什么问题，下一步就该进入产品页或帮助文档看具体做法。"
          primaryLabel="Open translator product"
          primaryHref="/products/translator"
          secondaryLabel="Open help center"
          secondaryHref="/help-center"
        />
      </PageContainer>
    </main>
  );
}
