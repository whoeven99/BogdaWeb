import {PageContainer} from "@/components/ui/PageContainer";
import {pagesCopy} from "@/content/pages-copy";
import {sitePages} from "@/content/site-pages";
import {buildPageMetadata} from "@/lib/seo/metadata";

const page = sitePages.about;

export const metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: "/about",
});

export default function AboutPage() {
  const copy = pagesCopy.about;

  return (
    <main className="blog-article-page">
      <PageContainer>
        <section className="blog-article-shell">
          <article className="blog-article-single">
            <header className="blog-article-single__header">
              <span className="section-heading__eyebrow">{copy.hero.eyebrow}</span>
              <h1>{page.title}</h1>
              <p>{page.description}</p>
            </header>

            <div className="article-prose blog-article-single__prose">
              <div dangerouslySetInnerHTML={{__html: page.contentHtml}} />
            </div>
          </article>
        </section>
      </PageContainer>
    </main>
  );
}
