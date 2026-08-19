import {Button} from "@/components/ui/Button";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getSitePages} from "@/content/site-pages";
import {getRequestLocale} from "@/lib/i18n-server";
import {ciwiShopifyInstallUrl} from "@/lib/marketing-links";
import {buildPageMetadata} from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const page = getSitePages(locale).contact;

  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: "/contact",
    locale,
  });
}

export default async function ContactPage() {
  const locale = await getRequestLocale();
  const page = getSitePages(locale).contact;
  const copy = locale === "zh-cn"
    ? {
        eyebrow: "联系",
        cardTitle: "开始沟通",
        cardDescription: "如果你正在评估 Shopify 多语言、本地化或客单价提升，可以直接从这里联系。",
        installLabel: "前往 Shopify 安装",
        installHref: ciwiShopifyInstallUrl,
        supportEmailLabel: "support@ciwi.ai",
        supportEmailHref: "mailto:support@ciwi.ai",
      }
    : {
        eyebrow: "Contact",
        cardTitle: "Start a conversation",
        cardDescription: "If you are evaluating Shopify localization, multilingual growth, or AOV opportunities, you can reach out here directly.",
        installLabel: "Install on Shopify",
        installHref: ciwiShopifyInstallUrl,
        supportEmailLabel: "support@ciwi.ai",
        supportEmailHref: "mailto:support@ciwi.ai",
      };

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
