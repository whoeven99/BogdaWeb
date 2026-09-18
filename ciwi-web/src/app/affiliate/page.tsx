import {AffiliateHero} from "@/components/affiliate/AffiliateHero";
import {CommissionTable} from "@/components/affiliate/CommissionTable";
import {HowItWorks} from "@/components/affiliate/HowItWorks";
import {FaqSection} from "@/components/sections/FaqSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {getAffiliateCopy, getAffiliateProducts} from "@/content/affiliate";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

function buildAffiliateNarrative({
  locale,
  productCount,
}: {
  locale: "en" | "zh-cn";
  productCount: number;
}) {
  if (locale === "zh-cn") {
    return [
      `联盟计划页的重点，不只是展示佣金比例，而是帮助你判断这个合作模式是否适合你的内容渠道、受众类型和推荐方式。当前支持 ${productCount} 个产品入口。`,
      "如果你的流量主要来自 Shopify 教程、工具对比、独立站运营内容或私域社群，这类计划通常更容易和现有内容自然结合，而不是额外硬卖一个新产品。",
    ];
  }

  return [
    `The goal of the affiliate page is not only to show the commission table, but to help you judge whether this partnership model fits your traffic source, audience type, and recommendation style. It currently supports ${productCount} product entries.`,
    "If your traffic already comes from Shopify tutorials, tool comparisons, ecommerce operator content, or community channels, this kind of program usually fits best when it extends what you already recommend rather than forcing a new offer into the mix.",
  ];
}

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const copy = getAffiliateCopy(locale);

  return buildPageMetadata({
    title: copy.hero.title,
    description: copy.hero.description,
    path: "/affiliate",
    locale,
  });
}

export default async function AffiliatePage() {
  const locale = await getRequestLocale();
  const copy = getAffiliateCopy(locale);
  const products = getAffiliateProducts(locale);
  const narrative = buildAffiliateNarrative({locale, productCount: products.length});

  return (
    <main>
      <PageContainer>
        <AffiliateHero copy={copy.hero} />
        <section className="pt-6 sm:pt-8">
          <div className="mx-auto max-w-4xl rounded-[24px] border border-slate-200/80 bg-white/90 p-5 sm:p-6">
            <div className="space-y-4 text-[15px] leading-7 text-slate-600 sm:text-base">
              {narrative.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
        <HowItWorks copy={copy.howItWorks} />
        <CommissionTable copy={copy.commission} products={products} />
        <FaqSection eyebrow={copy.faq.eyebrow} title={copy.faq.title} items={copy.faq.items} />
      </PageContainer>
    </main>
  );
}
