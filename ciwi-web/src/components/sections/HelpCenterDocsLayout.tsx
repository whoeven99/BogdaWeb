import Link from "next/link";

import type {HelpCenterDoc} from "@/content/help-center";
import {addSectionAnchors, extractSectionsFromHtml} from "@/lib/content/sections";

type HelpCenterDocsLayoutProps = {
  currentDoc: HelpCenterDoc;
  docs: HelpCenterDoc[];
  eyebrow?: string;
};

export function HelpCenterDocsLayout({
  currentDoc,
  docs,
  eyebrow = "Help Center",
}: HelpCenterDocsLayoutProps) {
  const docsPerPage = 8;
  const contentHtml = addSectionAnchors(currentDoc.contentHtml);
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
              <h2>目录</h2>
              <p className="quote">按文档顺序浏览安装、配置和日常使用说明。</p>
            </div>

            <nav className="docs-nav-list" aria-label="Help center directory">
              {directoryDocs.map((doc, index) => {
                const isActive = doc.slug === currentDoc.slug;
                const displayIndex = directoryPageStart + index;

                return (
                  <Link
                    key={doc.slug}
                    href={getDocHref(doc)}
                    className={`docs-nav-link${isActive ? " docs-nav-link--active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="docs-nav-link__index">{String(displayIndex + 1).padStart(2, "0")}</span>
                    <span className="docs-nav-link__title">{doc.title}</span>
                  </Link>
                );
              })}
            </nav>

            {directoryPageCount > 1 ? (
              <div className="docs-directory-pagination" aria-label="Help center directory pagination">
                {previousDirectoryDoc ? (
                  <Link href={getDocHref(previousDirectoryDoc)} className="docs-directory-pagination__link">
                    上一组
                  </Link>
                ) : (
                  <span className="docs-directory-pagination__placeholder" />
                )}
                <span className="docs-directory-pagination__status">
                  第 {directoryPageIndex + 1} / {directoryPageCount} 页
                </span>
                {nextDirectoryDoc ? (
                  <Link href={getDocHref(nextDirectoryDoc)} className="docs-directory-pagination__link">
                    下一组
                  </Link>
                ) : (
                  <span className="docs-directory-pagination__placeholder" />
                )}
              </div>
            ) : null}

            {sections.length ? (
              <div className="docs-sidebar__sections">
                <h3>本页内容</h3>
                <div className="toc-list">
                  {sections.map((section) => (
                    <Link key={section.id} href={`#${section.id}`} className="toc-link">
                      {section.title}
                    </Link>
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

          <div className="article-prose docs-article__prose" dangerouslySetInnerHTML={{__html: contentHtml}} />

          <nav className="docs-pagination" aria-label="Help center pagination">
            {previousDoc ? (
              <Link href={getDocHref(previousDoc)} className="docs-pagination__card">
                <span className="docs-pagination__label">上一页</span>
                <strong>{previousDoc.title}</strong>
              </Link>
            ) : <div />}

            {nextDoc ? (
              <Link href={getDocHref(nextDoc)} className="docs-pagination__card docs-pagination__card--next">
                <span className="docs-pagination__label">下一页</span>
                <strong>{nextDoc.title}</strong>
              </Link>
            ) : <div />}
          </nav>
        </article>
      </div>
    </section>
  );
}
