import {Button} from "@/components/ui/Button";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {pagesCopy} from "@/content/pages-copy";
import {sitePages} from "@/content/site-pages";
import {buildPageMetadata} from "@/lib/seo/metadata";

const page = sitePages.contact;

export const metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: "/contact",
});

export default function ContactPage() {
  const copy = pagesCopy.contact.hero;

  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero">
          <div className="split-grid">
            <div className="page-copy">
              <SectionHeading eyebrow={copy.eyebrow} title={page.title} description={page.description} as="h1" />
              {page.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="surface-card">
              <h3>{copy.cardTitle}</h3>
              <p className="quote">{copy.cardDescription}</p>
              <div className="faq-list">
                <Button href={copy.installHref}>{copy.installLabel}</Button>
                <Button href={copy.supportEmailHref} variant="secondary">
                  {copy.supportEmailLabel}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
