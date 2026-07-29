import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getSitePages} from "@/content/site-pages";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const page = getSitePages(locale).terms;

  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: "/terms-and-conditions",
    locale,
  });
}

export default async function TermsPage() {
  const locale = await getRequestLocale();
  const page = getSitePages(locale).terms;

  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero page-copy article-prose legal-page">
          <SectionHeading eyebrow={locale === "zh-cn" ? "法务" : "Legal"} title={page.title} description={page.description} as="h1" />
          <div className="legal-page__content" dangerouslySetInnerHTML={{__html: page.contentHtml}} />
        </section>
      </PageContainer>
    </main>
  );
}
