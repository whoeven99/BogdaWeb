import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {sitePages} from "@/content/site-pages";
import {buildPageMetadata} from "@/lib/seo/metadata";

const page = sitePages.terms;

export const metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero page-copy">
          <SectionHeading eyebrow="Legal" title={page.title} description={page.description} as="h1" />
          {page.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      </PageContainer>
    </main>
  );
}
