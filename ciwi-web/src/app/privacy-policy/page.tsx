import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {pagesCopy} from "@/content/pages-copy";
import {sitePages} from "@/content/site-pages";
import {buildPageMetadata} from "@/lib/seo/metadata";

const page = sitePages.privacy;

export const metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero page-copy article-prose legal-page">
          <SectionHeading eyebrow={pagesCopy.legal.eyebrow} title={page.title} description={page.description} as="h1" />
          <div className="legal-page__content" dangerouslySetInnerHTML={{__html: page.contentHtml}} />
        </section>
      </PageContainer>
    </main>
  );
}
