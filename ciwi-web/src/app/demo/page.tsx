import {ContentIndexHero} from "@/components/sections/ContentIndexHero";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {FaqSection} from "@/components/sections/FaqSection";
import {HeroPreviewCardGrid} from "@/components/sections/HeroPreviewCardGrid";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {demoPageMediaBriefs} from "@/content/media-briefs";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = await getRequestLocale();

  return buildPageMetadata({
    title: locale === "zh-cn" ? "演示中心" : "Demo Center",
    description:
      locale === "zh-cn"
        ? "通过前后对比和术语控制，快速判断产品价值。"
        : "Use focused before-and-after demos and terminology control examples to understand product value faster.",
    path: "/demo",
    locale,
  });
}

export default async function DemoPage() {
  const locale = await getRequestLocale();
  const copy =
    locale === "zh-cn"
      ? {
          hero: {
            eyebrow: "演示",
            title: "用最短路径看懂产品能力",
            description: "这里聚焦最关键的前后对比和术语控制。",
            cards: [
              {
                eyebrow: "翻译演示",
                title: "翻译前后对比",
                description: "展示翻译前后文案差异、术语控制效果和 Shopify 场景适配方式。",
                accent: true,
              },
              {title: "Glossary 术语干预", description: "展示 glossary 如何影响品牌词、产品词和营销文案的输出。"},
            ],
          },
          media: {
            eyebrow: "演示总览",
            title: "几十秒，先看到效果变化",
            description: "用一段总览视频，把翻译前后和术语控制的差异快速过一遍。",
          },
          faq: [
            {
              question: "官网 Demo 会变成完整后台吗？",
              answer: "不会。官网优先提供无登录、低摩擦、可理解的轻演示，而不是复制完整产品后台。",
            },
            {
              question: "先看 Demo 能带来什么？",
              answer: "你可以先用最短时间看到翻译前后差异和术语控制效果，再判断这套产品是否值得继续深入。",
            },
          ],
          finalCta: {
            eyebrow: "下一步",
            title: "先看演示，再决定是否深入",
            description: "如果你已经看到适合自己的场景，下一步就进入产品页或联系团队。",
            primaryLabel: "查看产品",
            primaryHref: "/products",
            secondaryLabel: "联系我们",
            secondaryHref: "/contact",
          },
        }
      : {
          hero: {
            eyebrow: "Demo",
            title: "Understand the product through the shortest path",
            description: "This page focuses on before-and-after comparisons and glossary control.",
            cards: [
              {
                eyebrow: "Translation demo",
                title: "Before / after localization",
                description: "Show the copy difference, glossary control, and Shopify-specific output more clearly.",
                accent: true,
              },
              {title: "Glossary intervention", description: "See how glossary changes brand terms, product terms, and promotional language."},
            ],
          },
          media: {
            eyebrow: "Demo overview",
            title: "See the effect in under a minute",
            description: "A short overview video walks through the before-and-after and glossary control scenarios.",
          },
          faq: [
            {
              question: "Will the website demo become the full product backend?",
              answer: "No. The site should stay lightweight and understandable, not try to duplicate the full admin product experience.",
            },
            {
              question: "What does viewing the demo first help with?",
              answer: "It lets merchants see the outcome difference quickly before deciding whether to move into the product page or a deeper evaluation.",
            },
          ],
          finalCta: {
            eyebrow: "Next step",
            title: "See the demo first, then decide how deep to go",
            description: "If the scenario already looks relevant, the next step is usually the product page or a direct conversation.",
            primaryLabel: "Browse products",
            primaryHref: "/products",
            secondaryLabel: "Talk to us",
            secondaryHref: "/contact",
          },
        };

  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero">
          <ContentIndexHero eyebrow={copy.hero.eyebrow} title={copy.hero.title} description={copy.hero.description}>
            <HeroPreviewCardGrid items={copy.hero.cards} />
          </ContentIndexHero>
        </section>
        <MediaPlaceholderSection
          eyebrow={copy.media.eyebrow}
          title={copy.media.title}
          description={copy.media.description}
          items={demoPageMediaBriefs}
          locale={locale}
        />
        <FaqSection items={copy.faq.map((item) => ({...item}))} />
        <FinalCtaSection
          eyebrow={copy.finalCta.eyebrow}
          title={copy.finalCta.title}
          description={copy.finalCta.description}
          primaryLabel={copy.finalCta.primaryLabel}
          primaryHref={copy.finalCta.primaryHref}
          secondaryLabel={copy.finalCta.secondaryLabel}
          secondaryHref={copy.finalCta.secondaryHref}
        />
      </PageContainer>
    </main>
  );
}
