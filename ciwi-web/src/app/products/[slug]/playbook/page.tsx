import {UseCasePlaybookCard} from "@/components/cards/UseCasePlaybookCard";
import {ContentIndexCard} from "@/components/cards/ContentIndexCard";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {BackLink} from "@/components/ui/BackLink";
import {Button} from "@/components/ui/Button";
import {CardCtaLink} from "@/components/ui/CardCtaLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getFunctionScenarioGuides} from "@/content/function-scenario-guides";
import {getLocalizationGuides} from "@/content/localization-guides";
import {getProductMap, products} from "@/content/products";
import {
  getFeaturedUseCasesByProduct,
  getProductPlaybookHref,
  getUseCasesByProduct,
} from "@/content/use-cases";
import {
  getKeywordUseCaseCategories,
  getKeywordUseCaseCategorySlug,
  getKeywordUseCases,
  getKeywordUseCasesByCategory,
} from "@/content/shopify-keyword-use-cases";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema, buildGraphSchema} from "@/lib/seo/schema";
import {notFound} from "next/navigation";

const translatorPlaybookCopy = {
  title: "AI Translator Playbook for Ecommerce",
  description: "Explore multilingual storefront workflows for Shopify: launch a market, manage terminology, review translations, and keep store content in sync.",
};

export const dynamic = "force-dynamic";

type ProductPlaybookPageProps = {
  params: Promise<{slug: string}>;
};

function buildPlaybookNarrative({
  locale,
  productName,
  featuredCount,
  useCaseCount,
  keywordScenarioCount,
  topicCount,
}: {
  locale: "en" | "zh-cn";
  productName: string;
  featuredCount: number;
  useCaseCount: number;
  keywordScenarioCount: number;
  topicCount: number;
}) {
  if (locale === "zh-cn") {
    return [
      `${productName} 方案集会先把最值得展开的业务场景聚到一起，方便先判断这个产品主要解决哪类问题，再进入更细的详情页。当前包含 ${featuredCount} 条精选场景、${useCaseCount} 条产品级场景。`,
      keywordScenarioCount > 0
        ? `如果你需要更大规模的长尾场景覆盖，还可以继续进入运营场景库，那里按 ${topicCount} 个主题组织了 ${keywordScenarioCount.toLocaleString()} 条场景页，更适合按问题目录持续往下钻。`
        : "这个页面更适合作为产品级入口，先用代表性场景判断方向，再决定是否深入到某一条具体工作流。",
    ];
  }

  return [
    `${productName} Playbook groups the highest-signal workflows first so you can judge what this product is really for before opening a deeper landing page. It currently includes ${featuredCount} featured workflows and ${useCaseCount} product-level use cases.`,
    keywordScenarioCount > 0
      ? `If you need broader long-tail coverage, the operational scenario library expands that into ${keywordScenarioCount.toLocaleString()} scenario pages across ${topicCount} topics, which is better for drilling down by problem cluster.`
      : "This page works best as the product-level entry point: use representative workflows to judge fit, then decide whether a deeper page is worth opening.",
  ];
}

function getPlaybookCopy(locale: "en" | "zh-cn") {
  if (locale === "zh-cn") {
    return {
      notFound: {
        title: "未找到方案集",
        description: "你访问的产品方案集不存在。",
      },
      hero: {
        eyebrow: "方案集",
        titleSuffix: "产品方案集",
        description: "先集中浏览这个产品最值得展开的应用场景，再决定进入哪个具体场景页面。",
        primaryLabel: "查看产品页",
        secondaryLabel: "查看全部产品方案集",
      },
      picks: {
        eyebrow: "精选场景",
        title: "优先看这些高频场景",
        description: "先从最常见、最容易承接搜索和销售语境的场景开始看。",
      },
      all: {
        eyebrow: "精选 Playbook",
        title: "先看精选业务场景",
        description: "这些是与产品能力直接耦合的代表性落地页；后续还可以进入 500+ 条运营场景库继续按主题深挖。",
      },
      scenarios: {
        eyebrow: "运营场景库",
        title: "500+ 条按主题组织的完整运营场景",
        description: "围绕产品研究、竞品监控、库存管理、投放优化、客户支持、SEO 等 100+ 主题，提供结构化场景描述、解决步骤、可复制提示词与 FAQ 问答组合。",
        primaryLabel: "打开运营场景库",
        categoryTitleLabel: "主题",
        countLabel: "条",
        emptyLabel: "暂无运营场景",
        categoryCardPrimaryLabel: "查看该主题全部场景",
      },
      stats: {
        productLabel: "产品",
        coreLabel: "精选场景",
        scenariosLabel: "运营场景",
        scenarioCatsLabel: "主题分类",
        focusLabel: "重点方向",
      },
      card: {
        linkLabel: "打开场景",
        metaLabel: "应用场景",
      },
      guides: {
        eyebrow: "配套指南",
        title: "相关指南与最佳实践",
        description: "按产品对应的翻译场景去看更具体的工作流，或直接进入行业本地化指南。",
        ctaLabel: "阅读指南",
      },
      finalCta: {
        title: "继续扩展这个产品的方案集",
        description: "现在已经有产品级聚合页，接下来可以继续补更多场景、缩略图和差异化内容模块。",
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
      eyebrow: "Featured playbooks",
      title: "Start with curated, product-tied workflows",
      description:
        "These are tightly-coupled, product-specific landing pages. For a broader library of 500+ operational Shopify AI scenarios organized by topic, open the scenario library.",
    },
    scenarios: {
      eyebrow: "Operational scenario library",
      title: "500+ operational scenarios organized by topic",
      description:
        "100+ topics: product research, competitor monitoring, inventory, ad optimization, support, SEO, and more. Each page ships with a scenario overview, a structured workflow, a copyable AI prompt, and 3 FAQs.",
      primaryLabel: "Open scenario library",
      categoryTitleLabel: "Topic",
      countLabel: "scenarios",
      emptyLabel: "No operational scenarios yet",
      categoryCardPrimaryLabel: "See all scenarios in this topic",
    },
    stats: {
      productLabel: "Product",
      coreLabel: "Featured playbooks",
      scenariosLabel: "Operational scenarios",
      scenarioCatsLabel: "Topics",
      focusLabel: "Focus",
    },
    card: {
      linkLabel: "Open use case",
      metaLabel: "Use Case",
    },
    guides: {
      eyebrow: "Related guides",
      title: "Guides & best practices for this product",
      description: "Drill into the Shopify translation workflows and localization strategy guides that pair with this product.",
      ctaLabel: "Read guide",
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
    title: locale === "zh-cn" ? `${product.name} 方案集` : product.slug === "translator" ? translatorPlaybookCopy.title : `${product.name} Playbook`,
    description: locale === "en" && product.slug === "translator" ? translatorPlaybookCopy.description : `${product.shortDescription} ${copy.hero.description}`,
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
  const localizationGuides = getLocalizationGuides(locale);
  const functionScenarioGuides = getFunctionScenarioGuides(locale);
  const isSpark = product.slug === "spark-analytics-agent";
  const keywordUseCases = isSpark ? getKeywordUseCases(locale) : [];
  const keywordCategories = isSpark ? getKeywordUseCaseCategories(locale).slice(0, 6) : [];
  const allKeywordCategories = isSpark ? getKeywordUseCaseCategories(locale) : [];
  const keywordIndexHref = isSpark ? `${getProductPlaybookHref(product.slug)}/keyword` : null;
  const pagePath = getProductPlaybookHref(product.slug);
  const narrative = buildPlaybookNarrative({
    locale,
    productName: product.name,
    featuredCount: featuredUseCases.length,
    useCaseCount: useCases.length,
    keywordScenarioCount: keywordUseCases.length,
    topicCount: allKeywordCategories.length,
  });

  let relatedGuides: Array<{href: string; title: string; description: string; meta: string[]; ctaLabel: string}> | null = null;
  if (product.slug === "translator") {
    const fsTop = functionScenarioGuides.slice(0, 12).map((item) => ({
      href: item.href,
      title: item.title,
      description: item.description,
      meta: [item.guideLabel],
      ctaLabel: copy.guides.ctaLabel,
    }));
    const lsShopify = localizationGuides.filter((item) => item.segmentLabel === "Shopify").slice(0, 3).map((item) => ({
      href: item.href,
      title: item.title,
      description: item.description,
      meta: [item.guideLabel],
      ctaLabel: copy.guides.ctaLabel,
    }));
    relatedGuides = [...fsTop, ...lsShopify].slice(0, 12);
  } else if (product.slug === "spark-analytics-agent") {
    const slugKeywords = [
      "metafields-metaobjects",
      "structured-data-schema",
      "search-filters",
      "markets",
      "customer-support-content",
      "store-locator-locations",
      "shopify-localization-strategy-2026",
      "shopify-international-expansion-guide-2026",
      "meta-titles-descriptions",
      "checkout",
    ];
    const fs = functionScenarioGuides.filter((item) => slugKeywords.some((kw) => item.slug.includes(kw))).slice(0, 6).map((item) => ({
      href: item.href,
      title: item.title,
      description: item.description,
      meta: [item.guideLabel],
      ctaLabel: copy.guides.ctaLabel,
    }));
    const ls = localizationGuides.filter((item) => slugKeywords.some((kw) => item.slug.includes(kw))).slice(0, 3).map((item) => ({
      href: item.href,
      title: item.title,
      description: item.description,
      meta: [item.guideLabel],
      ctaLabel: copy.guides.ctaLabel,
    }));
    relatedGuides = [...fs, ...ls].slice(0, 8);
  }
  const pageUrl = toAbsoluteLocalizedUrl(locale, pagePath);
  const structuredData = buildGraphSchema([
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "产品" : "Products", item: toAbsoluteLocalizedUrl(locale, "/products")},
      {name: product.name, item: toAbsoluteLocalizedUrl(locale, `/products/${product.slug}`)},
      {name: locale === "zh-cn" ? "方案集" : "Playbook", item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: locale === "zh-cn" ? `${product.name} 方案集` : product.slug === "translator" ? translatorPlaybookCopy.title : `${product.name} Playbook`,
      description: locale === "en" && product.slug === "translator" ? translatorPlaybookCopy.description : `${product.shortDescription} ${copy.hero.description}`,
      keywords: [
        product.name,
        ...useCases.map((item) => item.category),
        ...(isSpark ? keywordCategories.map((c) => c.name) : []),
        "Shopify AI",
        ...(isSpark ? [`${keywordUseCases.length} operational scenarios`] : []),
      ],
      type: "CollectionPage",
    }),
  ]);

  return (
    <main className="product-playbook-page">
      <PageContainer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />

        <section className="py-8 sm:py-10 lg:py-12">
          <div className="mx-auto max-w-5xl">
            <BackLink href={`/products/${product.slug}`} label={copy.finalCta.primaryLabel} />
            <div className="mt-5 sm:mt-6">
              <SectionHeading
                eyebrow={copy.hero.eyebrow}
                title={locale === "en" && product.slug === "translator" ? translatorPlaybookCopy.title : `${product.name} ${copy.hero.titleSuffix}`}
                description={locale === "en" && product.slug === "translator" ? translatorPlaybookCopy.description : copy.hero.description}
                as="h1"
              />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {copy.stats.productLabel}
                </span>
                <strong className="mt-2 block text-base font-semibold text-slate-950">{product.name}</strong>
              </article>
              <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {copy.stats.coreLabel}
                </span>
                <strong className="mt-2 block text-base font-semibold text-slate-950">{useCases.length}</strong>
              </article>
              {isSpark && (
                <>
                  <article className="rounded-2xl border border-emerald-200/70 bg-emerald-50/55 p-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                      {copy.stats.scenariosLabel}
                    </span>
                    <strong className="mt-2 block text-base font-semibold text-slate-950">
                      {keywordUseCases.length.toLocaleString()}
                    </strong>
                  </article>
                  <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {copy.stats.scenarioCatsLabel}
                    </span>
                    <strong className="mt-2 block text-base font-semibold text-slate-950">
                      {getKeywordUseCaseCategories(locale).length}
                    </strong>
                  </article>
                </>
              )}
            </div>
            <div className="mt-6 rounded-[24px] border border-slate-200/80 bg-white/90 p-5 sm:p-6">
              <div className="space-y-4 text-[15px] leading-7 text-slate-600 sm:text-base">
                {narrative.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
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

        {isSpark && keywordIndexHref && (
          <section className="page-section">
            <div className="scenario-library-header flex flex-wrap items-start justify-between gap-6 md:items-end">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-700/90">
                  {copy.scenarios.eyebrow}
                  <span className="ml-3 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.12em] text-slate-500">
                    {keywordUseCases.length.toLocaleString()} {copy.scenarios.countLabel} ·{" "}
                    {getKeywordUseCaseCategories(locale).length}{" "}
                    {locale === "zh-cn" ? "主题" : "topics"}
                  </span>
                </div>
                <h2 className="mt-4 text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] text-slate-950 sm:text-[32px]">
                  {copy.scenarios.title}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-[17px]">
                  {copy.scenarios.description}
                </p>
              </div>
              <div className="shrink-0">
                <Button href={keywordIndexHref}>{copy.scenarios.primaryLabel}</Button>
              </div>
            </div>

            {keywordUseCases.length === 0 ? (
              <div className="empty mt-10 rounded-[28px] border border-dashed border-slate-200/80 bg-white/60 px-6 py-14 text-center text-sm text-slate-500 sm:mt-12 lg:mt-14">
                {copy.scenarios.emptyLabel}
              </div>
            ) : (
              <div className="grid mt-10 gap-6 sm:grid-cols-2 sm:mt-12 lg:grid-cols-3 lg:mt-14 lg:gap-7">
                {keywordCategories.map((cat) => {
                  const items = getKeywordUseCasesByCategory(locale, cat.name).slice(0, 3);
                    const catSlug = getKeywordUseCaseCategorySlug(locale, cat.name);
                  return (
                    <article
                      key={cat.name}
                      className="scenario-library-card flex h-full flex-col rounded-[26px] border border-slate-200/80 bg-white/90 p-6 sm:p-7 shadow-[0_18px_48px_-32px_rgba(15,23,42,0.18)] transition-colors hover:border-emerald-200 hover:bg-emerald-50/40"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                          {copy.scenarios.categoryTitleLabel}
                        </div>
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.12em] text-slate-500">
                          {cat.count} {copy.scenarios.countLabel}
                        </span>
                      </div>
                      <h3
                        id={`cat-${catSlug}-summary`}
                        className="mt-4 text-lg font-semibold tracking-[-0.02em] text-slate-950 sm:mt-5"
                      >
                        {cat.name}
                      </h3>
                      <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700 sm:text-[15px]">
                        {items.map((item) => (
                          <li key={item.slug}>
                            <CardCtaLink
                              href={`${keywordIndexHref}/${item.slug}`}
                              variant="text"
                            >
                              {item.title}
                            </CardCtaLink>
                          </li>
                        ))}
                      </ul>
                      <div className="card-footer mt-7 pt-6 border-t border-slate-100/80">
                        <CardCtaLink href={`${keywordIndexHref}#cat-${catSlug}`} variant="outlined">
                          {copy.scenarios.categoryCardPrimaryLabel}
                        </CardCtaLink>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {relatedGuides && relatedGuides.length > 0 && (
          <section className="page-section">
            <SectionHeading eyebrow={copy.guides.eyebrow} title={copy.guides.title} description={copy.guides.description} />
            <div className="ui-simple-card-grid mt-8">
              {relatedGuides.map((item) => (
                <ContentIndexCard
                  key={item.href}
                  href={item.href}
                  title={item.title}
                  description={item.description}
                  meta={item.meta}
                  ctaLabel={item.ctaLabel}
                />
              ))}
            </div>
          </section>
        )}

        <FinalCtaSection
          title={copy.finalCta.title}
          description={copy.finalCta.description}
          primaryLabel={copy.finalCta.primaryLabel}
          primaryHref={`/products/${product.slug}`}
          secondaryLabel={copy.finalCta.secondaryLabel}
          secondaryHref="/products"
        />
      </PageContainer>
    </main>
  );
}
