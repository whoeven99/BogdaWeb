import {MdxContent} from "@/components/content/MdxContent";
import {LocalizedLink} from "@/components/ui/LocalizedLink";
import type {HelpCenterDoc} from "@/content/help-center";
import {getUiCopy} from "@/content/ui-copy";
import type {Locale} from "@/lib/i18n";
import {addSectionAnchors, extractSectionsFromHtml} from "@/lib/content/sections";

type HelpCenterDocsLayoutProps = {
  currentDoc: HelpCenterDoc;
  docs: HelpCenterDoc[];
  locale?: Locale;
  eyebrow?: string;
};

export function HelpCenterDocsLayout({
  currentDoc,
  docs,
  locale = "en",
  eyebrow = "Help Center",
}: HelpCenterDocsLayoutProps) {
  const uiCopy = getUiCopy(locale);
  const docsPerPage = 8;
  const currentTopic = currentDoc.meta[1] ?? currentDoc.category;
  const sections = extractSectionsFromHtml(currentDoc.contentHtml);
  const currentIndex = docs.findIndex((doc) => doc.slug === currentDoc.slug);
  const previousDoc = currentIndex > 0 ? docs[currentIndex - 1] : null;
  const nextDoc = currentIndex >= 0 && currentIndex < docs.length - 1 ? docs[currentIndex + 1] : null;
  const defaultDocSlug = docs[0]?.slug ?? currentDoc.slug;
  const resolvedIndex = currentIndex >= 0 ? currentIndex : 0;
  const directoryPageCount = Math.ceil(docs.length / docsPerPage);
  const directoryPageIndex = Math.floor(resolvedIndex / docsPerPage);
  const directoryPageStart = directoryPageIndex * docsPerPage;
  const directoryDocs = docs.slice(directoryPageStart, directoryPageStart + docsPerPage);
  const previousDirectoryDoc = directoryPageIndex > 0 ? docs[(directoryPageIndex - 1) * docsPerPage] : null;
  const nextDirectoryDoc = directoryPageIndex < directoryPageCount - 1 ? docs[(directoryPageIndex + 1) * docsPerPage] : null;
  const topicDocs = docs.filter((doc) => (doc.meta[1] ?? doc.category) === currentTopic);
  const topicMap = new Map<string, HelpCenterDoc>();

  docs.forEach((doc) => {
    const topic = doc.meta[1] ?? doc.category;

    if (!topicMap.has(topic)) {
      topicMap.set(topic, doc);
    }
  });

  const topicEntries = Array.from(topicMap.entries()).map(([topic, doc]) => ({
    topic,
    doc,
  }));

  function getDocHref(doc: HelpCenterDoc) {
    return doc.slug === defaultDocSlug ? "/help-center" : doc.href;
  }

  return (
    <section className="docs-page">
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <div className="surface-card docs-sidebar__panel">
            <div className="docs-sidebar__intro">
              <span className="section-heading__eyebrow">{eyebrow}</span>
              <h2>{uiCopy.docs.directoryTitle}</h2>
              <p className="quote">{uiCopy.docs.directoryDescription}</p>
            </div>

            <div className="docs-sidebar__topics">
              <h3>{uiCopy.docs.topicDirectoryTitle}</h3>
              <div className="docs-sidebar__topic-chips">
                <LocalizedLink href="/help-center" className="tab-chip">
                  {uiCopy.docs.allTopicsLabel}
                </LocalizedLink>
                {topicEntries.map(({topic, doc}) => {
                  const isActive = topic === currentTopic;

                  return (
                    <LocalizedLink
                      key={topic}
                      href={getDocHref(doc)}
                      className={`tab-chip${isActive ? " tab-chip--active" : ""}`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {topic}
                    </LocalizedLink>
                  );
                })}
              </div>
            </div>

            {topicDocs.length > 1 ? (
              <div className="docs-sidebar__topic-list">
                <h3>{uiCopy.docs.relatedTopicTitle}</h3>
                <nav className="docs-topic-list" aria-label={uiCopy.docs.relatedTopicTitle}>
                  {topicDocs.map((doc) => {
                    const isActive = doc.slug === currentDoc.slug;

                    return (
                      <LocalizedLink
                        key={doc.slug}
                        href={getDocHref(doc)}
                        className={`docs-topic-link${isActive ? " docs-topic-link--active" : ""}`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span>{doc.title}</span>
                        <small>{doc.readingTime}</small>
                      </LocalizedLink>
                    );
                  })}
                </nav>
              </div>
            ) : null}

            <nav className="docs-nav-list" aria-label={uiCopy.docs.directoryAriaLabel}>
              {directoryDocs.map((doc, index) => {
                const isActive = doc.slug === currentDoc.slug;
                const displayIndex = directoryPageStart + index;

                return (
                  <LocalizedLink
                    key={doc.slug}
                    href={getDocHref(doc)}
                    className={`docs-nav-link${isActive ? " docs-nav-link--active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="docs-nav-link__index">{String(displayIndex + 1).padStart(2, "0")}</span>
                    <span className="docs-nav-link__title">{doc.title}</span>
                  </LocalizedLink>
                );
              })}
            </nav>

            {directoryPageCount > 1 ? (
              <div className="docs-directory-pagination" aria-label={uiCopy.docs.directoryPaginationAriaLabel}>
                {previousDirectoryDoc ? (
                  <LocalizedLink href={getDocHref(previousDirectoryDoc)} className="docs-directory-pagination__link">
                    {uiCopy.docs.previousGroupLabel}
                  </LocalizedLink>
                ) : (
                  <span className="docs-directory-pagination__placeholder" />
                )}
                <span className="docs-directory-pagination__status">
                  {uiCopy.docs.pageStatusTemplate
                    .replace("{{current}}", String(directoryPageIndex + 1))
                    .replace("{{total}}", String(directoryPageCount))}
                </span>
                {nextDirectoryDoc ? (
                  <LocalizedLink href={getDocHref(nextDirectoryDoc)} className="docs-directory-pagination__link">
                    {uiCopy.docs.nextGroupLabel}
                  </LocalizedLink>
                ) : (
                  <span className="docs-directory-pagination__placeholder" />
                )}
              </div>
            ) : null}

            {sections.length ? (
              <div className="docs-sidebar__sections">
                <h3>{uiCopy.docs.onThisPageTitle}</h3>
                <div className="toc-list">
                  {sections.map((section) => (
                    <LocalizedLink key={section.id} href={`#${section.id}`} className="toc-link">
                      {section.title}
                    </LocalizedLink>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </aside>

        <article className="surface-card docs-article">
          <div className="article-meta">
            {currentDoc.meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
            <span>{currentDoc.readingTime}</span>
          </div>

          <header className="docs-article__header">
            <span className="section-heading__eyebrow">{eyebrow}</span>
            <h1>{currentDoc.title}</h1>
            <p className="quote">{currentDoc.description}</p>
          </header>

          <MdxContent source={addSectionAnchors(currentDoc.contentHtml)} className="article-prose docs-article__prose" />

          <nav className="docs-pagination" aria-label={uiCopy.docs.articlePaginationAriaLabel}>
            {previousDoc ? (
              <LocalizedLink href={getDocHref(previousDoc)} className="docs-pagination__card">
                <span className="docs-pagination__label">{uiCopy.docs.previousLabel}</span>
                <strong>{previousDoc.title}</strong>
              </LocalizedLink>
            ) : <div />}

            {nextDoc ? (
              <LocalizedLink href={getDocHref(nextDoc)} className="docs-pagination__card docs-pagination__card--next">
                <span className="docs-pagination__label">{uiCopy.docs.nextLabel}</span>
                <strong>{nextDoc.title}</strong>
              </LocalizedLink>
            ) : <div />}
          </nav>
        </article>
      </div>
    </section>
  );
}
