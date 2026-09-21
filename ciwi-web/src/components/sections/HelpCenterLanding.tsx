"use client";

import {useMemo, useState} from "react";

import {ContentIndexCard} from "@/components/cards/ContentIndexCard";
import {ContentIndexHero} from "@/components/sections/ContentIndexHero";
import type {HelpCenterDoc} from "@/content/help-center";
import {getUiCopy} from "@/content/ui-copy";
import type {Locale} from "@/lib/i18n";
import {localizeLanguageSignalList, localizeLanguageSignalText} from "@/lib/localized-language-signal";

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

function buildHelpCenterLandingNarrative({
  locale,
  docs,
  topicGroups,
  featuredDocs,
}: {
  locale: Locale;
  docs: HelpCenterDoc[];
  topicGroups: TopicGroup[];
  featuredDocs: HelpCenterDoc[];
}) {
  const topicLabels = topicGroups.slice(0, 4).map((group) => localizeLanguageSignalText(locale, group.label));
  const featuredTitles = featuredDocs.slice(0, 3).map((doc) => localizeLanguageSignalText(locale, doc.title));

  if (locale === "zh-cn") {
    return [
      `帮助中心当前收录 ${docs.length} 篇文档，按 ${topicGroups.length} 个主题组织，适合先按问题类型缩小范围，再进入具体操作文章。`,
      topicLabels.length > 0
        ? `当前主要覆盖 ${topicLabels.join("、")} 等主题。每个主题下的文档会继续细分安装、配置、翻译流程、积分与模型等具体问题。`
        : "当前文档会继续细分安装、配置、翻译流程、积分与模型等具体问题。",
      featuredTitles.length > 0
        ? `如果你刚开始使用，可以先看 ${featuredTitles.join("、")} 这些高频入口，再回到目录继续深入。`
        : "如果你刚开始使用，可以先从精选入口开始，再回到目录继续深入。",
    ];
  }

  return [
    `The help center currently groups ${docs.length} documents under ${topicGroups.length} topics so visitors can narrow by problem type before opening a specific how-to article.`,
    topicLabels.length > 0
      ? `It mainly covers topics such as ${topicLabels.join(", ")}. Inside each topic, the docs break further into installation, setup, translation flow, credits, and model-selection questions.`
      : "Inside each topic, the docs break further into installation, setup, translation flow, credits, and model-selection questions.",
    featuredTitles.length > 0
      ? `If you are just getting started, begin with entries such as ${featuredTitles.join(", ")}, then come back to the directory for the deeper edge cases.`
      : "If you are just getting started, begin with the featured entries, then come back to the directory for deeper edge cases.",
  ];
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
  const narrative = buildHelpCenterLandingNarrative({
    locale,
    docs,
    topicGroups,
    featuredDocs,
  });

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <ContentIndexHero eyebrow={eyebrow} title={uiCopy.docs.landingTitle} description={uiCopy.docs.landingDescription} />
      <div className="mx-auto mt-6 max-w-4xl rounded-[24px] border border-slate-200/80 bg-white/90 p-5 sm:p-6">
        <div className="space-y-4 text-[15px] leading-7 text-slate-600 sm:text-base">
          {narrative.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-10">
        <section className="rounded-[32px] bg-white/90 p-7 shadow-[0_16px_48px_-24px_rgba(15,23,42,0.14)] sm:p-9">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              {uiCopy.docs.featuredTitle}
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              {uiCopy.docs.featuredTitle}
            </h2>
            <p className="text-base leading-7 text-slate-600">{uiCopy.docs.featuredDescription}</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:gap-8 xl:grid-cols-3">
            {featuredDocs.map((doc) => (
              <ContentIndexCard
                key={doc.entryId}
                href={doc.href}
                title={localizeLanguageSignalText(locale, doc.title)}
                description={localizeLanguageSignalText(locale, doc.description)}
                meta={localizeLanguageSignalList(locale, doc.meta)}
                ctaLabel={uiCopy.docs.openArticleLabel}
              />
            ))}
          </div>
        </section>

        <section className="rounded-[32px] bg-white/90 p-7 shadow-[0_16px_48px_-24px_rgba(15,23,42,0.14)] sm:p-9">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              {uiCopy.docs.browseTopicLabel}
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              {uiCopy.docs.allDocsTitle}
            </h2>
            <p className="text-base leading-7 text-slate-600">{uiCopy.docs.allDocsDescription}</p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)]">
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
                  {localizeLanguageSignalText(locale, group.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
            <strong className="text-base font-semibold text-slate-950">{filteredDocCount}</strong>
            <span>{uiCopy.docs.articleCountLabel}</span>
          </div>

          {filteredGroups.length ? (
          <div className="mt-10 space-y-10">
              {filteredGroups.map((group) => (
                <section key={group.key} className="space-y-5">
                  <header className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                      {localizeLanguageSignalText(locale, group.label)}
                    </h3>
                    <span className="text-sm text-slate-500">
                      {group.docs.length} {uiCopy.docs.articleCountLabel}
                    </span>
                  </header>

                  <div className="grid gap-6 md:grid-cols-2 xl:gap-8 xl:grid-cols-3">
                    {group.docs.map((doc) => (
                      <ContentIndexCard
                        key={doc.entryId}
                        href={doc.href}
                        title={localizeLanguageSignalText(locale, doc.title)}
                        description={localizeLanguageSignalText(locale, doc.description)}
                        meta={[...localizeLanguageSignalList(locale, doc.meta), localizeLanguageSignalText(locale, doc.readingTime)]}
                        ctaLabel={uiCopy.docs.openArticleLabel}
                        variant="bordered"
                      />
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
