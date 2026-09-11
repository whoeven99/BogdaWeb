"use client";

import {useMemo, useState} from "react";

import {LocalizedLink} from "@/components/ui/LocalizedLink";
import type {HelpCenterDoc} from "@/content/help-center";
import {getUiCopy} from "@/content/ui-copy";
import type {Locale} from "@/lib/i18n";

type HelpCenterLandingProps = {
  docs: HelpCenterDoc[];
  featuredDocs: HelpCenterDoc[];
  locale: Locale;
  eyebrow: string;
};

type TopicGroup = {
  key: string;
  label: string;
  docs: HelpCenterDoc[];
};

function toTopicKey(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getTopicLabel(doc: HelpCenterDoc) {
  return doc.meta[1] ?? doc.category;
}

export function HelpCenterLanding({docs, featuredDocs, locale, eyebrow}: HelpCenterLandingProps) {
  const uiCopy = getUiCopy(locale);
  const [activeTopic, setActiveTopic] = useState("all");
  const [query, setQuery] = useState("");

  const topicGroups = useMemo<TopicGroup[]>(() => {
    const groups = new Map<string, TopicGroup>();

    docs.forEach((doc) => {
      const label = getTopicLabel(doc);
      const key = toTopicKey(label);
      const existing = groups.get(key);

      if (existing) {
        existing.docs.push(doc);
        return;
      }

      groups.set(key, {
        key,
        label,
        docs: [doc],
      });
    });

    return Array.from(groups.values()).sort((left, right) => left.docs[0].order - right.docs[0].order);
  }, [docs]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredGroups = useMemo(() => {
    return topicGroups
      .map((group) => {
        const docsInTopic = group.docs.filter((doc) => {
          if (activeTopic !== "all" && group.key !== activeTopic) {
            return false;
          }

          if (!normalizedQuery) {
            return true;
          }

          const haystack = [doc.title, doc.description, ...doc.meta].join(" ").toLowerCase();

          return haystack.includes(normalizedQuery);
        });

        return {
          ...group,
          docs: docsInTopic,
        };
      })
      .filter((group) => group.docs.length > 0);
  }, [activeTopic, normalizedQuery, topicGroups]);

  const filteredDocCount = filteredGroups.reduce((count, group) => count + group.docs.length, 0);

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="rounded-[32px] border border-slate-200/80 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.92))] px-6 py-10 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)] sm:px-8 lg:px-12">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{eyebrow}</div>
        <h1 className="mt-4 max-w-4xl text-pretty text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
          {uiCopy.docs.landingTitle}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{uiCopy.docs.landingDescription}</p>
      </div>

      <div className="mt-10 space-y-8">
        <section className="rounded-[32px] bg-white/90 p-6 shadow-[0_16px_48px_-24px_rgba(15,23,42,0.14)] sm:p-8">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              {uiCopy.docs.featuredTitle}
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              {uiCopy.docs.featuredTitle}
            </h2>
            <p className="text-base leading-7 text-slate-600">{uiCopy.docs.featuredDescription}</p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredDocs.map((doc) => (
              <LocalizedLink
                key={doc.entryId}
                href={doc.href}
                className="group flex h-full flex-col rounded-[28px] bg-slate-50/70 p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
              >
                <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {doc.meta.map((item) => (
                    <span key={item} className="rounded-full bg-white px-3 py-1">
                      {item}
                    </span>
                  ))}
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-slate-950">{doc.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{doc.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  {uiCopy.docs.openArticleLabel}
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </LocalizedLink>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] bg-white/90 p-6 shadow-[0_16px_48px_-24px_rgba(15,23,42,0.14)] sm:p-8">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              {uiCopy.docs.browseTopicLabel}
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              {uiCopy.docs.allDocsTitle}
            </h2>
            <p className="text-base leading-7 text-slate-600">{uiCopy.docs.allDocsDescription}</p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)]">
            <label className="block">
              <span className="sr-only">{uiCopy.docs.searchPlaceholder}</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={uiCopy.docs.searchPlaceholder}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </label>

            <div className="flex flex-wrap gap-2" aria-label={uiCopy.docs.browseTopicLabel}>
              <button
                type="button"
                className={[
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  activeTopic === "all"
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700",
                ].join(" ")}
                onClick={() => setActiveTopic("all")}
              >
                {uiCopy.docs.allTopicsLabel}
              </button>

              {topicGroups.map((group) => (
                <button
                  key={group.key}
                  type="button"
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                    activeTopic === group.key
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700",
                  ].join(" ")}
                  onClick={() => setActiveTopic(group.key)}
                >
                  {group.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
            <strong className="text-base font-semibold text-slate-950">{filteredDocCount}</strong>
            <span>{uiCopy.docs.articleCountLabel}</span>
          </div>

          {filteredGroups.length ? (
            <div className="mt-8 space-y-8">
              {filteredGroups.map((group) => (
                <section key={group.key} className="space-y-4">
                  <header className="flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">{group.label}</h3>
                    <span className="text-sm text-slate-500">
                      {group.docs.length} {uiCopy.docs.articleCountLabel}
                    </span>
                  </header>

                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {group.docs.map((doc) => (
                      <LocalizedLink
                        key={doc.entryId}
                        href={doc.href}
                        className="group flex h-full flex-col rounded-[28px] border border-slate-200/80 bg-slate-50/70 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white"
                      >
                        <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                          {doc.meta.map((item) => (
                            <span key={item} className="rounded-full border border-slate-200 bg-white/90 px-3 py-1">
                              {item}
                            </span>
                          ))}
                          <span className="rounded-full border border-slate-200 bg-white/90 px-3 py-1">
                            {doc.readingTime}
                          </span>
                        </div>
                        <strong className="mt-4 text-lg font-semibold tracking-[-0.03em] text-slate-950">
                          {doc.title}
                        </strong>
                        <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{doc.description}</p>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                          {uiCopy.docs.openArticleLabel}
                          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                            →
                          </span>
                        </span>
                      </LocalizedLink>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[28px] border border-dashed border-slate-300 bg-slate-50/80 px-6 py-10">
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">{uiCopy.docs.noResultsTitle}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{uiCopy.docs.noResultsDescription}</p>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
