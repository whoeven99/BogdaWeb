import {Button} from "@/components/ui/Button";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {sitePages} from "@/content/site-pages";
import {buildPageMetadata} from "@/lib/seo/metadata";

const page = sitePages.contact;

export const metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero">
          <div className="split-grid">
            <div className="page-copy">
              <SectionHeading eyebrow="Contact" title={page.title} description={page.description} as="h1" />
              {page.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="surface-card">
              <h3>Start a conversation</h3>
              <p className="quote">
                如果你正在评估 Shopify 多语言、本地化或 AOV 提升，可以直接从这里联系。
              </p>
              <div className="faq-list">
                <Button href="https://apps.shopify.com/translator-by-ciwi">Install on Shopify</Button>
                <Button href="mailto:support@ciwi.ai" variant="secondary">
                  support@ciwi.ai
                </Button>
              </div>
            </div>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
