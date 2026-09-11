"use client";

import {useMemo, useState} from "react";

import {useLocale} from "@/components/providers/LocaleProvider";
import {CardCtaLink} from "@/components/ui/CardCtaLink";
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
    <section className="py-12 sm:py-16 lg:py-20">
      <header className="max-w-4xl rounded-[32px] border border-slate-200/80 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.92))] px-6 py-10 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)] sm:px-8 lg:px-12">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          {uiCopy.blog.eyebrow}
        </div>
        <h1 className="mt-4 text-pretty text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{description}</p>
      </header>

      <div className="mt-10 grid gap-5">
        {visiblePosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_16px_48px_-24px_rgba(15,23,42,0.28)] sm:p-7"
          >
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              <span>{post.publishedAt}</span>
              <span>{post.readingTime}</span>
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-slate-200 bg-slate-100/80 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
              <LocalizedLink href={post.href} className="transition-colors hover:text-emerald-700">
                {post.title}
              </LocalizedLink>
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{post.description}</p>
            <div className="mt-6">
              <CardCtaLink href={post.href} variant="text">
                {uiCopy.blog.readArticleLabel}
              </CardCtaLink>
            </div>
          </article>
        ))}
      </div>

      {pageCount > 1 ? (
        <nav
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          aria-label={uiCopy.blog.paginationLabel}
        >
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
          >
            {uiCopy.blog.previousLabel}
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {Array.from({length: pageCount}, (_, index) => {
              const targetPage = index + 1;
              const isActive = targetPage === page;

              return (
                <button
                  key={targetPage}
                  type="button"
                  className={[
                    "inline-flex h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition-colors",
                    isActive
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700",
                  ].join(" ")}
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
            className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
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
