"use client";

import {useMemo, useState} from "react";

import {ContentIndexCard} from "@/components/cards/ContentIndexCard";
import {useLocale} from "@/components/providers/LocaleProvider";
import type {BlogPost} from "@/content/blog";
import {getUiCopy} from "@/content/ui-copy";
import {ContentIndexHero} from "@/components/sections/ContentIndexHero";

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
    <section className="py-12 sm:py-16 lg:py-20">
      <ContentIndexHero eyebrow={uiCopy.blog.eyebrow} title={title} description={description} />

      <div className="mt-12 grid gap-6 lg:gap-7">
        {visiblePosts.map((post) => (
          <ContentIndexCard
            key={post.slug}
            href={post.href}
            title={post.title}
            description={post.description}
            meta={[post.publishedAt, post.readingTime, ...post.tags]}
            ctaLabel={uiCopy.blog.readArticleLabel}
            titleLevel="h2"
            variant="bordered"
            className="bg-white/90 shadow-[0_16px_48px_-24px_rgba(15,23,42,0.28)]"
          />
        ))}
      </div>

      {pageCount > 1 ? (
        <nav
          className="ui-blog-feed__pagination"
          aria-label={uiCopy.blog.paginationLabel}
        >
          <button
            type="button"
            className="ui-btn--pagination-prevnext"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
          >
            {uiCopy.blog.previousLabel}
          </button>

          <div className="ui-blog-feed__pagination-pages">
            {Array.from({length: pageCount}, (_, index) => {
              const targetPage = index + 1;
              const isActive = targetPage === page;

              return (
                <button
                  key={targetPage}
                  type="button"
                  className={`ui-btn--pagination${isActive ? " ui-btn--pagination-active" : ""}`}
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
            className="ui-btn--pagination-prevnext"
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
