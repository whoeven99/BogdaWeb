import {UseCasePlaybookCard} from "@/components/cards/UseCasePlaybookCard";
import {ContentIndexHero} from "@/components/sections/ContentIndexHero";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {Button} from "@/components/ui/Button";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getProductPlaybookHref, getUseCasesByProduct} from "@/content/use-cases";
import {getProducts} from "@/content/products";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

function getPageCopy(locale: "en" | "zh-cn") {
  if (locale === "zh-cn") {
    return {
      metadata: {
        title: "Ciwi 应用场景",
        description: "按产品组织的 Ciwi 应用场景入口页，先浏览产品方案集，再进入具体场景页面。",
      },
      hero: {
        eyebrow: "应用场景",
        title: "按产品浏览 Ciwi 场景方案",
        description: "围绕真实经营问题整理各产品的代表性场景，先快速判断方向，再进入更完整的产品方案集或具体场景页。",
        primaryLabel: "查看 Spark 方案集",
        primaryHref: "/products/spark-analytics-agent/playbook",
        secondaryLabel: "浏览产品列表",
        secondaryHref: "/products",
      },
      modules: {
        eyebrow: "按产品展开",
        title: "每个产品先展开代表性场景",
        description: "每个模块先展示几张足够判断方向的具体卡片，再决定是否进入对应产品的完整方案集。",
        countLabel: "个场景",
        actionLabel: "查看完整方案集",
        linkLabel: "查看场景详情",
      },
      finalCta: {
        title: "有真实的应用场景想分享？",
        description: "欢迎告诉我们你如何使用 Ciwi 改善 Shopify 店铺经营；对于真实、有效的案例，我们愿意提供最高 100 美元的反馈奖励。",
        primaryLabel: "联系我们",
        primaryHref: "/contact",
        secondaryLabel: "查看资源中心",
        secondaryHref: "/resources",
      },
    };
  }

  return {
    metadata: {
      title: "Use Cases",
      description: "A directory of Ciwi product playbooks that groups use cases under each product before you drill into a specific scenario.",
    },
    hero: {
      eyebrow: "Use Cases",
      title: "Browse Ciwi through product playbooks",
      description: "Instead of stacking several similar aggregation blocks, this page now opens one module per product and shows a few concrete use cases before you jump into the full playbook.",
      primaryLabel: "Open Spark playbook",
      primaryHref: "/products/spark-analytics-agent/playbook",
      secondaryLabel: "Browse products",
      secondaryHref: "/products",
    },
    modules: {
      eyebrow: "Browse by product",
      title: "Each product module shows real use cases first",
      description: "Each module exposes a few concrete use cases up front, then links to the complete product playbook when you want the full list.",
      countLabel: "use cases",
      actionLabel: "Open full playbook",
      linkLabel: "Open use case",
    },
    finalCta: {
      title: "Ready to expand the product playbooks",
      description: "The structure is now product-first: product page, playbook hub, then use-case detail where needed.",
      primaryLabel: "Start a conversation",
      primaryHref: "/contact",
      secondaryLabel: "Open resources",
      secondaryHref: "/resources",
    },
  };
}

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const copy = getPageCopy(locale);

  return buildPageMetadata({
    title: copy.metadata.title,
    description: copy.metadata.description,
    path: "/use-cases",
    locale,
  });
}

export default async function UseCasesPage() {
  const locale = await getRequestLocale();
  const copy = getPageCopy(locale);
  const products = getProducts(locale);
  const productGroups = products
    .map((product) => ({
      product,
      items: getUseCasesByProduct(locale, product.slug),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <main>
      <PageContainer>
        <section className="py-12 sm:py-16 lg:py-20">
          <ContentIndexHero
            eyebrow={copy.hero.eyebrow}
            title={copy.hero.title}
            description={copy.hero.description}
            className="overflow-hidden lg:py-4"
            actions={
              <>
                <Button href={copy.hero.primaryHref}>{copy.hero.primaryLabel}</Button>
                <Button href={copy.hero.secondaryHref} variant="secondary">
                  {copy.hero.secondaryLabel}
                </Button>
              </>
            }
          />
        </section>

        <section className="py-8 sm:py-10 lg:py-12">
          <div className="space-y-12">
            {productGroups.map((group) => (
              <section
                key={group.product.slug}
                className="rounded-[32px] bg-white/80 px-6 py-9 shadow-[0_16px_48px_-28px_rgba(15,23,42,0.14)] sm:px-8 sm:py-10 lg:px-10 lg:py-11"
              >
                <SectionHeading
                  eyebrow={group.product.name}
                  title={
                    locale === "zh-cn"
                      ? `${group.product.name} 相关场景`
                      : `${group.product.name} use cases`
                  }
                  description={`${group.product.shortDescription} ${
                    locale === "zh-cn"
                      ? `当前先展示 ${Math.min(group.items.length, 4)} 个代表场景，方便快速判断方向。`
                      : `Showing ${Math.min(group.items.length, 4)} representative use cases first.`
                  }`}
                  action={
                    <Button href={getProductPlaybookHref(group.product.slug)} variant="secondary">
                      {copy.modules.actionLabel}
                    </Button>
                  }
                />
                <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:gap-8 xl:grid-cols-4">
                  {group.items.slice(0, 4).map((item) => (
                    <UseCasePlaybookCard
                      key={item.slug}
                      title={item.title}
                      description={item.description}
                      href={`/use-cases/${item.slug}`}
                      icon={group.product.icon}
                      productName={group.product.name}
                      eyebrow={item.category}
                      meta={[`${group.items.length} ${copy.modules.countLabel}`, item.category]}
                      linkLabel={copy.modules.linkLabel}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <FinalCtaSection
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
