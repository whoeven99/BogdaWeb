import {notFound} from "next/navigation";

import {MdxContent} from "@/components/content/MdxContent";
import {BackLink} from "@/components/ui/BackLink";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {AuthorByline} from "@/components/content/AuthorByline";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {getAuthorBySlug} from "@/content/authors";
import {getAllBlogPosts, getBlogPostMap, getBlogPosts} from "@/content/blog";
import {getUiCopy} from "@/content/ui-copy";
import {getRequestLocale} from "@/lib/i18n-server";
import {localizeLanguageSignalList, localizeLanguageSignalText} from "@/lib/localized-language-signal";
import {buildPageMetadata, siteUrl, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {buildBlogPostingSchema, buildBreadcrumbSchema, buildGraphSchema} from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

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
        finalCta: {
          eyebrow: "继续往下",
          title: "从内容理解问题，再回到产品和配置",
          description:
            "如果你已经知道自己要解决什么问题，就该进入产品页或帮助文档，看看多语言内容同步、自动翻译和 Shopify 适配的具体做法。",
          primaryLabel: "打开 Translator 产品页",
          primaryHref: "/products/translator",
          secondaryLabel: "查看帮助中心",
          secondaryHref: "/help-center",
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
        finalCta: {
          eyebrow: "Keep going",
          title: "From insights to products",
          description:
            "If this article clarified the problem you're solving, jump into the product page or help center to review localization workflows, Shopify adapters, and automation details.",
          primaryLabel: "Open Translator",
          primaryHref: "/products/translator",
          secondaryLabel: "Browse help docs",
          secondaryHref: "/help-center",
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

  const pageUrl = toAbsoluteLocalizedUrl(locale, post.href);
  const author = getAuthorBySlug(post.slug);
  const relatedPosts = posts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);
  const localizedPostTitle = localizeLanguageSignalText(locale, post.title);
  const localizedPostDescription = localizeLanguageSignalText(locale, post.description);
  const structuredData = buildGraphSchema([
    buildBreadcrumbSchema([
      {name: locale === "zh-cn" ? "首页" : "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "博客" : "Blog", item: toAbsoluteLocalizedUrl(locale, "/blog")},
      {name: localizedPostTitle, item: pageUrl},
    ]),
    buildBlogPostingSchema({
      url: pageUrl,
      headline: localizedPostTitle,
      description: localizedPostDescription,
      datePublished: post.publishedAt,
      keywords: localizeLanguageSignalList(locale, post.tags),
      author: {name: author.name, jobTitle: author.role[locale], url: toAbsoluteLocalizedUrl(locale, `/authors/${author.id}`)},
    }),
  ]);

  return (
    <main className="blog-article-page">
      <PageContainer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />

        <section className="blog-article-shell">
          <article className="blog-article-single">
            <div className="blog-article-single__topbar">
              <BackLink href={copy.hero.backToBlogHref} label={copy.hero.backToBlogLabel} />
            </div>

            <header className="blog-article-single__header">
              <span className="section-heading__eyebrow">{copy.hero.eyebrow}</span>
              <h1>{localizedPostTitle}</h1>
              <p className="blog-article-single__lede">{localizedPostDescription}</p>
            </header>

            <div className="blog-article-single__meta-row">
              <div className="blog-article-single__meta-info">
                <span>{post.publishedAt}</span>
                <span className="blog-article-single__meta-dot" aria-hidden="true" />
                <span>{localizeLanguageSignalText(locale, post.readingTime)}</span>
              </div>
              <div className="blog-article-single__tag-list">
                {localizeLanguageSignalList(locale, post.tags).map((tag) => (
                  <span key={tag} className="blog-tag-pill">{tag}</span>
                ))}
              </div>
            </div>

            <AuthorByline author={author} className="blog-article-single__byline" />

            <MdxContent source={post.content} className="article-prose blog-article-single__prose" />
          </article>
        </section>

        <section className="blog-related-section" aria-labelledby="blog-related-title">
          <div className="blog-related-section__header">
            <span className="section-heading__eyebrow">{uiCopy.blog.relatedEyebrow}</span>
            <div className="blog-related-section__header-copy">
              <h2 id="blog-related-title" className="blog-related-section__title">{uiCopy.blog.relatedTitle}</h2>
              <p className="blog-related-section__description">{uiCopy.blog.relatedDescription}</p>
            </div>
          </div>

          <div className="blog-related-section__grid">
            {relatedPosts.map((item) => (
              <LocalizedLink
                key={item.slug}
                href={item.href}
                className="blog-related-card"
              >
                <div className="blog-related-card__meta">
                  <span>{item.publishedAt}</span>
                  <span className="blog-related-card__meta-dot" aria-hidden="true" />
                  <span>{localizeLanguageSignalText(locale, item.readingTime)}</span>
                </div>
                <h3 className="blog-related-card__title">{localizeLanguageSignalText(locale, item.title)}</h3>
                <p className="blog-related-card__description">{localizeLanguageSignalText(locale, item.description)}</p>
                <div className="blog-related-card__tags">
                  {localizeLanguageSignalList(locale, item.tags.slice(0, 2)).map((tag) => (
                    <span key={tag} className="blog-related-card__tag">{tag}</span>
                  ))}
                </div>
                <span className="blog-related-card__cta">
                  <span>{uiCopy.blog.readNextLabel}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </LocalizedLink>
            ))}
          </div>

          <div className="blog-related-section__footer">
            <LocalizedLink href="/blog" className="button button--primary">
              {uiCopy.blog.exploreLabel}
            </LocalizedLink>
          </div>
        </section>

        <FinalCtaSection
          eyebrow={copy.finalCta.eyebrow}
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
