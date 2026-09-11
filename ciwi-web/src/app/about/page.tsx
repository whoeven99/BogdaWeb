import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
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
        heroTitle: "Ciwi 是一个为 Shopify 商家构建 AI 产品与工作流的团队",
        heroDescription:
          "我们更关心的是，怎样把平台经验、工程能力和 AI 能力，变成商家日常经营里真正能用、能积累、能持续放大的能力。",
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
        heroTitle: "Ciwi is a team building AI products and operating workflows for Shopify merchants",
        heroDescription:
          "What matters to us is turning platform experience, engineering capability, and AI workflows into tools merchants can actually use, build on, and trust in day-to-day operations.",
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
          <div className="content-hero-shell about-hero-simple">
            <span className="section-heading__eyebrow">{copy.eyebrow}</span>
            <h1>{copy.heroTitle}</h1>
            <p>{copy.heroDescription}</p>
          </div>
        </section>

        <section className="page-section page-section--compact about-prose-section">
          <div className="about-prose-card">
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
          secondaryLabel={null}
          secondaryHref={null}
        />
      </PageContainer>
    </main>
  );
}
