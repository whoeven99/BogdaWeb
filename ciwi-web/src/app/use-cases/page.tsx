import {UseCasePlaybookCard} from "@/components/cards/UseCasePlaybookCard";
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
        title: "Use Cases",
        description: "围绕 Ciwi 产品整理的一组 playbook 入口页，先按产品查看 use case 聚合页，再进入具体场景。",
      },
      hero: {
        eyebrow: "Use Cases",
        title: "Ciwi Business playbook",
        description: "基于真实的商业实践打造工作流和 agent 操作，从 shopify 卖家体验出发，通过 Ciwi 获得最佳的经营效果",
        primaryLabel: "查看 Spark Playbook",
        primaryHref: "/products/spark-analytics-agent/playbook",
        secondaryLabel: "查看产品列表",
        secondaryHref: "/products",
      },
      modules: {
        eyebrow: "按产品展开",
        title: "每个产品直接展开具体 use cases",
        description: "每个模块先给你足够判断方向的几张具体卡片，再决定要不要进入对应产品的完整 use case 聚合页。",
        countLabel: "个场景",
        actionLabel: "查看完整 use cases",
        actionLabelEn: "Open full playbook",
        linkLabel: "查看场景详情",
      },
      finalCta: {
        title: "你有更好的操作实践？",
        description: "欢迎和我们分享你是如何使用 Ciwi 产品更好地经营shopify 商店，我们愿意针对真实、有效的用户案例提供最高100 美金的反馈奖励",
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
      actionLabelEn: "Open full playbook",
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
          <div className="content-hero-shell overflow-hidden lg:py-4">
            <div className="max-w-4xl">
              <SectionHeading
                eyebrow={copy.hero.eyebrow}
                title={copy.hero.title}
                description={copy.hero.description}
                as="h1"
              />
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={copy.hero.primaryHref}>{copy.hero.primaryLabel}</Button>
                <Button href={copy.hero.secondaryHref} variant="secondary">
                  {copy.hero.secondaryLabel}
                </Button>
              </div>
            </div>
          </div>
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
                      ? `${group.product.name} 的 use cases`
                      : `${group.product.name} use cases`
                  }
                  description={`${group.product.shortDescription} ${
                    locale === "zh-cn"
                      ? `当前先展示 ${Math.min(group.items.length, 4)} 个代表场景。`
                      : `Showing ${Math.min(group.items.length, 4)} representative use cases first.`
                  }`}
                  action={
                    <Button href={getProductPlaybookHref(group.product.slug)} variant="secondary">
                      {locale === "zh-cn" ? copy.modules.actionLabel : copy.modules.actionLabelEn}
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

        <section className="py-12 sm:py-14 lg:py-16">
          <div className="final-cta-panel">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                {copy.finalCta.title}
              </h2>
              <p className="text-[15px] leading-7 text-slate-600">{copy.finalCta.description}</p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={copy.finalCta.primaryHref} variant="primary">
                {copy.finalCta.primaryLabel}
              </Button>
              <Button href={copy.finalCta.secondaryHref} variant="secondary">
                {copy.finalCta.secondaryLabel}
              </Button>
            </div>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
