import {PageContainer} from "@/components/ui/PageContainer";
import {getSitePages} from "@/content/site-pages";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const page = getSitePages(locale).about;

  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: "/about",
    locale,
  });
}

export default async function AboutPage() {
  const locale = await getRequestLocale();
  const page = getSitePages(locale).about;
  const eyebrow = locale === "zh-cn" ? "关于我们" : "About";

  return (
    <main className="blog-article-page">
      <PageContainer>
        <section className="blog-article-shell">
          <article className="blog-article-single">
            <header className="blog-article-single__header">
              <span className="section-heading__eyebrow">{eyebrow}</span>
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
