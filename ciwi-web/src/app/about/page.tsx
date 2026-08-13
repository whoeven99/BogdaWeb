import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {Button} from "@/components/ui/Button";
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

function getAboutPageCopy(locale: "en" | "zh-cn") {
  return locale === "zh-cn"
    ? {
        eyebrow: "关于我们",
        heroTitle: "让每一个成长中的品牌，都更有机会走向全球市场",
        heroDescription:
          "Ciwi 希望把平台经验、工程能力和 AI 能力，变成 Shopify 商家真正能用起来的产品与方法。",
        primaryLabel: "查看产品",
        primaryHref: "/products",
        secondaryLabel: "查看资源",
        secondaryHref: "/resources",
        articleTitle: "我们是谁，以及为什么做 Ciwi",
        articleDescription: "Ciwi AI的背景、愿景和价值观。",
        finalCta: {
          eyebrow: "联系我们",
          title: "联系我们",
          description: "如果你想聊产品方向、合作方式，或者你的 Shopify 店铺现在遇到的具体问题，可以直接联系 Ciwi 团队。",
          primaryLabel: "联系我们",
          primaryHref: "/contact",
        },
      }
    : {
        eyebrow: "About",
        heroTitle: "Help every growing brand get a fairer chance to reach global markets",
        heroDescription:
          "Ciwi turns platform experience, engineering capability, and AI workflows into products Shopify merchants can actually use.",
        primaryLabel: "View products",
        primaryHref: "/products",
        secondaryLabel: "Browse resources",
        secondaryHref: "/resources",
        articleTitle: "Who we are and why we are building Ciwi",
        articleDescription: "The full introduction stays here so you can understand the background, direction, and values behind Ciwi more clearly.",
        finalCta: {
          eyebrow: "Contact us",
          title: "Contact us",
          description: "If you want to talk about the product, a collaboration, or a specific Shopify growth problem, you can reach the Ciwi team directly.",
          primaryLabel: "Contact us",
          primaryHref: "/contact",
        },
      };
}

export default async function AboutPage() {
  const locale = await getRequestLocale();
  const page = getSitePages(locale).about;
  const copy = getAboutPageCopy(locale);

  return (
    <main className="about-page">
      <PageContainer>
        <section className="page-section page-hero about-hero">
          <div className="about-hero-simple">
            <span className="section-heading__eyebrow">{copy.eyebrow}</span>
            <h1>{copy.heroTitle}</h1>
            <p>{copy.heroDescription}</p>
            <div className="inline-list">
              <Button href={copy.primaryHref}>{copy.primaryLabel}</Button>
              <Button href={copy.secondaryHref} variant="secondary">
                {copy.secondaryLabel}
              </Button>
            </div>
          </div>
        </section>

        <section className="page-section page-section--compact about-prose-section">
          <div className="about-prose-card">
            <div className="about-prose-card__header">
              <h2>{copy.articleTitle}</h2>
              <p>{copy.articleDescription}</p>
            </div>
            <div className="article-prose about-prose">
              <div dangerouslySetInnerHTML={{__html: page.contentHtml}} />
            </div>
          </div>
        </section>

        <FinalCtaSection
          eyebrow={copy.finalCta.eyebrow}
          title={copy.finalCta.title}
          description={copy.finalCta.description}
          primaryLabel={copy.finalCta.primaryLabel}
          primaryHref={copy.finalCta.primaryHref}
        />
      </PageContainer>
    </main>
  );
}
