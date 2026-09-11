import {UseCasePlaybookCard} from "@/components/cards/UseCasePlaybookCard";
import {Button} from "@/components/ui/Button";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getProductMap, products} from "@/content/products";
import {getFeaturedUseCasesByProduct, getProductPlaybookHref, getUseCasesByProduct} from "@/content/use-cases";
import {localizeHref} from "@/lib/i18n";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema} from "@/lib/seo/schema";
import {notFound} from "next/navigation";

type ProductPlaybookPageProps = {
  params: Promise<{slug: string}>;
};

function getPlaybookCopy(locale: "en" | "zh-cn") {
  if (locale === "zh-cn") {
    return {
      notFound: {
        title: "未找到 Playbook",
        description: "你访问的产品 playbook 不存在。",
      },
      hero: {
        eyebrow: "Playbook",
        titleSuffix: "use case playbook",
        description: "参考 Manus playbook 的聚合形式，先集中浏览这个产品最值得展开的 use case，再决定进入哪个具体场景。",
        primaryLabel: "查看产品页",
        secondaryLabel: "查看全部产品 playbook",
      },
      picks: {
        eyebrow: "Picks",
        title: "优先看这些高频 use cases",
        description: "先从最常见、最容易承接搜索和销售语境的场景开始看。",
      },
      all: {
        eyebrow: "All use cases",
        title: "这个产品下的全部场景",
        description: "每个卡片都可以继续扩成更完整的落地页，但聚合页本身先承担总入口。",
      },
      card: {
        linkLabel: "打开 use case",
        metaLabel: "Use Case",
      },
      finalCta: {
        title: "继续扩这个产品的 playbook",
        description: "现在已经有产品级聚合页，接下来可以继续补更多 use case、缩略图和差异化内容模块。",
        primaryLabel: "返回产品页",
        secondaryLabel: "查看全部产品",
      },
    };
  }

  return {
    notFound: {
      title: "Playbook not found",
      description: "The requested product playbook could not be found.",
    },
    hero: {
      eyebrow: "Playbook",
      titleSuffix: "use case playbook",
      description: "Use a Manus-style playbook structure to browse this product's most useful workflows first, then decide which scenario deserves a deeper landing page.",
      primaryLabel: "View product page",
      secondaryLabel: "Browse all product playbooks",
    },
    picks: {
      eyebrow: "Picks",
      title: "Start with the featured workflows",
      description: "Begin with the highest-signal use cases that are easiest to expand into stronger landing pages.",
    },
    all: {
      eyebrow: "All use cases",
      title: "All workflows for this product",
      description: "Each card can still expand into a deeper landing page later, but the playbook acts as the first product-level hub.",
    },
    card: {
      linkLabel: "Open use case",
      metaLabel: "Use Case",
    },
    finalCta: {
      title: "Ready to grow this product playbook",
      description: "The product-level aggregation page is now in place, so the next step can be adding more use cases, thumbnails, and differentiated modules.",
      primaryLabel: "Back to product page",
      secondaryLabel: "Browse all products",
    },
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({slug: product.slug}));
}

export async function generateMetadata({params}: ProductPlaybookPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const product = getProductMap(locale)[slug];
  const copy = getPlaybookCopy(locale);

  if (!product) {
    return buildPageMetadata({
      title: copy.notFound.title,
      description: copy.notFound.description,
      path: "/use-cases",
      locale,
    });
  }

  return buildPageMetadata({
    title: `${product.name} Playbook`,
    description: `${product.shortDescription} ${copy.hero.description}`,
    path: getProductPlaybookHref(product.slug),
    locale,
  });
}

export default async function ProductPlaybookPage({params}: ProductPlaybookPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const product = getProductMap(locale)[slug];
  const copy = getPlaybookCopy(locale);

  if (!product) {
    notFound();
  }

  const useCases = getUseCasesByProduct(locale, product.slug);
  const featuredUseCases = getFeaturedUseCasesByProduct(locale, product.slug);
  const pagePath = getProductPlaybookHref(product.slug);
  const pageUrl = new URL(localizeHref(locale, pagePath), siteUrl).toString();
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "产品" : "Products", item: new URL(localizeHref(locale, "/products"), siteUrl).toString()},
      {name: product.name, item: new URL(localizeHref(locale, `/products/${product.slug}`), siteUrl).toString()},
      {name: locale === "zh-cn" ? "Playbook" : "Playbook", item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: `${product.name} Playbook`,
      description: `${product.shortDescription} ${copy.hero.description}`,
      keywords: [product.name, ...useCases.map((item) => item.category)],
      type: "CollectionPage",
    }),
  ];

  return (
    <main>
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`${product.slug}-playbook-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="rounded-[32px] border border-slate-200/80 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.92))] px-6 py-10 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)] sm:px-8 lg:px-12">
            <SectionHeading
              eyebrow={copy.hero.eyebrow}
              title={`${product.name} ${copy.hero.titleSuffix}`}
              description={copy.hero.description}
              as="h1"
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {locale === "zh-cn" ? "产品" : "Product"}
                </span>
                <strong className="mt-3 block text-lg font-semibold text-slate-950">{product.name}</strong>
              </article>
              <article className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {locale === "zh-cn" ? "Use cases" : "Use cases"}
                </span>
                <strong className="mt-3 block text-lg font-semibold text-slate-950">{useCases.length}</strong>
              </article>
              <article className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {locale === "zh-cn" ? "重点方向" : "Focus"}
                </span>
                <strong className="mt-3 block text-lg font-semibold text-slate-950">{product.metrics[0]}</strong>
              </article>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.metrics.map((metric) => (
                <span key={metric} className="pill">
                  {metric}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={`/products/${product.slug}`}>{copy.hero.primaryLabel}</Button>
              <Button href="/use-cases" variant="secondary">
                {copy.hero.secondaryLabel}
              </Button>
            </div>
          </div>
        </section>

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.picks.eyebrow}
            title={copy.picks.title}
            description={copy.picks.description}
          />
          <div className="playbook-grid">
            {featuredUseCases.map((item) => (
              <UseCasePlaybookCard
                key={item.slug}
                title={item.title}
                description={item.description}
                href={`/use-cases/${item.slug}`}
                icon={product.icon}
                productName={product.name}
                eyebrow={item.category}
                meta={[copy.card.metaLabel, item.category]}
                linkLabel={copy.card.linkLabel}
              />
            ))}
          </div>
        </section>

        <section className="page-section">
          <SectionHeading
            eyebrow={copy.all.eyebrow}
            title={copy.all.title}
            description={copy.all.description}
          />
          <div className="playbook-grid">
            {useCases.map((item) => (
              <UseCasePlaybookCard
                key={item.slug}
                title={item.title}
                description={item.description}
                href={`/use-cases/${item.slug}`}
                icon={product.icon}
                productName={product.name}
                eyebrow={item.category}
                meta={[copy.card.metaLabel, item.category]}
                linkLabel={copy.card.linkLabel}
              />
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <div className="final-cta-panel">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">{copy.finalCta.title}</h2>
              <p className="text-[15px] leading-7 text-slate-300">{copy.finalCta.description}</p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={`/products/${product.slug}`}>{copy.finalCta.primaryLabel}</Button>
              <Button href="/products" variant="secondary">
                {copy.finalCta.secondaryLabel}
              </Button>
            </div>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
