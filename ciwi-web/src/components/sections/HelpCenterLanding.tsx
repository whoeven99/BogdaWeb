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
    <section className="help-center-home">
      <div className="page-hero page-hero--compact">
        <div className="section-heading">
          <span className="section-heading__eyebrow">{eyebrow}</span>
          <h1>{uiCopy.docs.landingTitle}</h1>
          <p>{uiCopy.docs.landingDescription}</p>
        </div>
      </div>

      <div className="help-center-home__stack">
        <section className="surface-card help-center-home__featured">
          <div className="section-heading help-center-home__heading">
            <span className="section-heading__eyebrow">{uiCopy.docs.featuredTitle}</span>
            <h2>{uiCopy.docs.featuredTitle}</h2>
            <p>{uiCopy.docs.featuredDescription}</p>
          </div>

          <div className="resource-grid help-center-home__grid">
            {featuredDocs.map((doc) => (
              <LocalizedLink key={doc.entryId} href={doc.href} className="resource-card help-center-home__card">
                <div className="resource-card__meta">
                  {doc.meta.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <h3>{doc.title}</h3>
                <p>{doc.description}</p>
                <span className="help-center-home__card-cta">{uiCopy.docs.openArticleLabel}</span>
              </LocalizedLink>
            ))}
          </div>
        </section>

        <section className="surface-card help-center-home__browse">
          <div className="section-heading help-center-home__heading">
            <span className="section-heading__eyebrow">{uiCopy.docs.browseTopicLabel}</span>
            <h2>{uiCopy.docs.allDocsTitle}</h2>
            <p>{uiCopy.docs.allDocsDescription}</p>
          </div>

          <div className="help-center-home__toolbar">
            <label className="help-center-home__search">
              <span className="sr-only">{uiCopy.docs.searchPlaceholder}</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={uiCopy.docs.searchPlaceholder}
              />
            </label>

            <div className="help-center-home__topics" aria-label={uiCopy.docs.browseTopicLabel}>
              <button
                type="button"
                className={`tab-chip${activeTopic === "all" ? " tab-chip--active" : ""}`}
                onClick={() => setActiveTopic("all")}
              >
                {uiCopy.docs.allTopicsLabel}
              </button>

              {topicGroups.map((group) => (
                <button
                  key={group.key}
                  type="button"
                  className={`tab-chip${activeTopic === group.key ? " tab-chip--active" : ""}`}
                  onClick={() => setActiveTopic(group.key)}
                >
                  {group.label}
                </button>
              ))}
            </div>
          </div>

          <div className="help-center-home__results-meta">
            <strong>{filteredDocCount}</strong>
            <span>{uiCopy.docs.articleCountLabel}</span>
          </div>

          {filteredGroups.length ? (
            <div className="help-center-home__groups">
              {filteredGroups.map((group) => (
                <section key={group.key} className="help-center-home__group">
                  <header className="help-center-home__group-header">
                    <h3>{group.label}</h3>
                    <span>{group.docs.length} {uiCopy.docs.articleCountLabel}</span>
                  </header>

                  <div className="help-center-home__group-grid">
                    {group.docs.map((doc) => (
                      <LocalizedLink key={doc.entryId} href={doc.href} className="help-center-home__doc-card">
                        <div className="resource-card__meta">
                          {doc.meta.map((item) => (
                            <span key={item}>{item}</span>
                          ))}
                          <span>{doc.readingTime}</span>
                        </div>
                        <strong>{doc.title}</strong>
                        <p>{doc.description}</p>
                      </LocalizedLink>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="help-center-home__empty">
              <h3>{uiCopy.docs.noResultsTitle}</h3>
              <p>{uiCopy.docs.noResultsDescription}</p>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
