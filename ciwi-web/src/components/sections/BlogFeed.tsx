"use client";

import {useMemo, useState} from "react";

import {useLocale} from "@/components/providers/LocaleProvider";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import type {BlogPost} from "@/content/blog";
import {getUiCopy} from "@/content/ui-copy";

const POSTS_PER_PAGE = 2;

type BlogFeedProps = {
  posts: BlogPost[];
  title: string;
  description: string;
};

export function BlogFeed({posts, title, description}: BlogFeedProps) {
  const locale = useLocale();
  const uiCopy = getUiCopy(locale);
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

  const visiblePosts = useMemo(() => {
    const start = (page - 1) * POSTS_PER_PAGE;
    return posts.slice(start, start + POSTS_PER_PAGE);
  }, [page, posts]);

  return (
    <section className="blog-feed">
      <header className="blog-feed__header">
        <span className="section-heading__eyebrow">{uiCopy.blog.eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>

      <div className="blog-feed__list">
        {visiblePosts.map((post) => (
          <article key={post.slug} className="blog-summary-card">
            <div className="article-meta">
              <span>{post.publishedAt}</span>
              <span>{post.readingTime}</span>
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <h2>
              <LocalizedLink href={post.href}>{post.title}</LocalizedLink>
            </h2>
            <p>{post.description}</p>
            <LocalizedLink href={post.href} className="blog-summary-card__link">
              {uiCopy.blog.readArticleLabel}
            </LocalizedLink>
          </article>
        ))}
      </div>

      {pageCount > 1 ? (
        <nav className="blog-feed__pagination" aria-label={uiCopy.blog.paginationLabel}>
          <button
            type="button"
            className="blog-feed__page-button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
          >
            {uiCopy.blog.previousLabel}
          </button>

          <div className="blog-feed__page-list">
            {Array.from({length: pageCount}, (_, index) => {
              const targetPage = index + 1;
              const isActive = targetPage === page;

              return (
                <button
                  key={targetPage}
                  type="button"
                  className={`blog-feed__page-button${isActive ? " blog-feed__page-button--active" : ""}`}
                  onClick={() => setPage(targetPage)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {targetPage}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="blog-feed__page-button"
            onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
            disabled={page === pageCount}
          >
            {uiCopy.blog.nextLabel}
          </button>
        </nav>
      ) : null}
    </section>
  );
}
