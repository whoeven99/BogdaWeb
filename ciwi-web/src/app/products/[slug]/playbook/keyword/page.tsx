import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {BackLink} from "@/components/ui/BackLink";
import {Button} from "@/components/ui/Button";
import {CardCtaLink} from "@/components/ui/CardCtaLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {
  getKeywordUseCaseCategories,
  getKeywordUseCases,
  getKeywordUseCasesByCategory,
} from "@/content/shopify-keyword-use-cases";
import {getProductMap, products} from "@/content/products";
import {getProductPlaybookHref} from "@/content/use-cases";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema, buildGraphSchema} from "@/lib/seo/schema";
import {notFound} from "next/navigation";

type SparkPlaybookKeywordIndexPageProps = {
  params: Promise<{slug: string}>;
};

function keywordIndexHref(productSlug: string) {
  return `${getProductPlaybookHref(productSlug)}/keyword`;
}

function keywordDetailHref(productSlug: string, slug: string) {
  return `${keywordIndexHref(productSlug)}/${slug}`;
}

function getUiCopy(locale: "en" | "zh-cn") {
  if (locale === "zh-cn") {
    return {
      notFound: {
        title: "产品方案集不存在",
        description: "你访问的产品方案集不存在。",
      },
      metadata: {
        titleSuffix: "Spark 运营场景库",
        description:
          "围绕 Spark 数据与运营智能体，按 110+ 主题提供 535 条完整的 Shopify AI 工作流落地页。每条含场景描述、结构化解决步骤、可复制的提示词与常见问题。",
      },
      hero: {
        backLabel: "返回产品方案集",
        eyebrow: "运营场景库",
        titlePrefix: "",
        description:
          "围绕产品研究、竞品监控、库存管理、投放优化、客户支持、SEO 等 110+ 个主题，为 Spark 用户提供 535 条完整的 AI 工作流落地页。每条含场景描述、结构化解决步骤、可复制的提示词与常见问题。",
        primaryLabel: "回到方案集首页",
        secondaryLabel: "查看 Spark 产品页",
      },
      categories: {
        eyebrow: "主题目录",
        title: "按主题进入你关心的 Spark 运营流程",
        description: "按场景数量从多到少排序，每个主题下直接列出对应场景页入口。",
        totalLabel: "条场景",
      },
      finalCta: {
        title: "想把这些场景变成 Spark 内的自动化能力？",
        description:
          "Ciwi Spark 为 Shopify 商家提供可直接接入店铺的 AI 智能体与运营工具：从广告分析到库存预警，都有对应的产品方案。",
        primaryLabel: "看产品方案",
        secondaryLabel: "返回方案集首页",
      },
    };
  }

  return {
    notFound: {
      title: "Playbook not found",
      description: "The requested product playbook could not be found.",
    },
    metadata: {
      titleSuffix: "operational scenario library",
      description:
        "535 ready-to-use Shopify AI workflow pages grouped by topic for the Spark analytics agent. Each page includes a scenario, resolution steps, a copyable prompt, and three FAQs.",
    },
    hero: {
      backLabel: "Back to product playbook",
      eyebrow: "Operational scenario library",
      titlePrefix: "",
      description:
        "535 complete AI workflow landing pages across 110+ Shopify operator topics for Spark users: product research, competitor monitoring, inventory management, ad optimization, support operations, SEO, and more.",
      primaryLabel: "Back to playbook home",
      secondaryLabel: "Open Spark product page",
    },
    categories: {
      eyebrow: "Topics",
      title: "Pick the Spark workflow you care about",
      description:
        "Sorted by topic size so the most common Spark workflows are visible first. Every entry links to a dedicated scenario page with the full prompt and FAQ set.",
      totalLabel: "scenarios",
    },
    finalCta: {
      title: "Want these scenarios to run natively inside Spark?",
      description:
        "Ciwi Spark builds Shopify-native AI tools and agents for the workflows merchants actually run: translation, analytics, inventory alerts, and more.",
      primaryLabel: "See product lineup",
      secondaryLabel: "Back to playbook home",
    },
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({slug: product.slug}));
}

export async function generateMetadata({params}: SparkPlaybookKeywordIndexPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const copy = getUiCopy(locale);
  const product = getProductMap(locale)[slug];

  if (!product) {
    return buildPageMetadata({
      title: copy.notFound.title,
      description: copy.notFound.description,
      path: "/products",
      locale,
    });
  }

  return buildPageMetadata({
    title: locale === "zh-cn" ? `${product.name} ${copy.metadata.titleSuffix}` : `${product.name} ${copy.metadata.titleSuffix}`,
    description: product.shortDescription + " " + copy.metadata.description,
    path: keywordIndexHref(slug),
    locale,
    keywords: ["Shopify AI", "Shopify automation", "Spark playbook", `${product.name} AI prompts`],
  });
}

export default async function SparkPlaybookKeywordIndexPage({params}: SparkPlaybookKeywordIndexPageProps) {
  const locale = await getRequestLocale();
  const {slug: productSlug} = await params;
  const copy = getUiCopy(locale);
  const product = getProductMap(locale)[productSlug];

  if (!product) {
    notFound();
  }

  const categories = getKeywordUseCaseCategories(locale);
  const total = getKeywordUseCases(locale).length;
  const INDEX_HREF = keywordIndexHref(productSlug);
  const playbookHref = getProductPlaybookHref(productSlug);
  const pageUrl = toAbsoluteLocalizedUrl(locale, INDEX_HREF);
  const playbookUrl = toAbsoluteLocalizedUrl(locale, playbookHref);

  const structuredData = buildGraphSchema([
    buildBreadcrumbSchema([
      {name: "Home", item: toAbsoluteLocalizedUrl(locale, "/")},
      {
        name: locale === "zh-cn" ? "产品" : "Products",
        item: toAbsoluteLocalizedUrl(locale, "/products"),
      },
      {name: product.name, item: toAbsoluteLocalizedUrl(locale, `/products/${product.slug}`)},
      {name: locale === "zh-cn" ? "方案集" : "Playbook", item: playbookUrl},
      {
        name:
          locale === "zh-cn"
            ? `${product.name} 运营场景库`
            : `${product.name} operational scenario library`,
        item: pageUrl,
      },
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name:
        locale === "zh-cn"
          ? `${product.name} ${copy.metadata.titleSuffix}`
          : `${product.name} ${copy.metadata.titleSuffix}`,
      description: product.shortDescription + " " + copy.metadata.description,
      keywords: [
        "Shopify AI",
        "Shopify automation",
        `${product.name} playbook`,
        `${total} Shopify use cases`,
      ],
      type: "CollectionPage",
    }),
  ]);

  const heroTitle =
    locale === "zh-cn"
      ? `${product.name} 按主题浏览 500+ AI 运营场景`
      : `Browse ${product.name} 500+ operational scenarios by topic`;

  return (
    <main>
      <PageContainer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <BackLink href={playbookHref} label={copy.hero.backLabel} />
            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-700/90">
                  {copy.hero.eyebrow}
                  <span className="ml-3 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.12em] text-slate-500">
                    {total.toLocaleString()} {copy.categories.totalLabel} · {categories.length}{" "}
                    {locale === "zh-cn" ? "主题" : "topics"}
                  </span>
                </div>
                <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  {heroTitle}
                </h1>
                <p className="mt-5 max-w-2xl text-[15px] leading-8 text-slate-600 sm:text-base">
                  {copy.hero.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={playbookHref}>{copy.hero.primaryLabel}</Button>
                  <Button href={`/products/${product.slug}`} variant="secondary">
                    {copy.hero.secondaryLabel}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-12 lg:py-14">
          <div className="mx-auto max-w-6xl space-y-14">
            <SectionHeading
              eyebrow={copy.categories.eyebrow}
              title={copy.categories.title}
              description={copy.categories.description}
            />

            {categories.map((cat) => {
              const items = getKeywordUseCasesByCategory(locale, cat.name);
              const slug = cat.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
              return (
                <section
                  key={cat.name}
                  id={`cat-${slug}`}
                  className="rounded-[30px] bg-white/82 px-6 py-9 shadow-[0_16px_48px_-28px_rgba(15,23,42,0.16)] sm:px-8 sm:py-10 lg:px-10 lg:py-11"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                        {cat.count} {copy.categories.totalLabel}
                      </div>
                      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
                        {cat.name}
                      </h2>
                    </div>
                  </div>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                      <li key={item.slug}>
                        <article className="group flex h-full flex-col rounded-2xl border border-slate-200/75 bg-white/80 p-4.5 transition-colors hover:border-emerald-200 hover:bg-emerald-50/40 sm:p-5">
                          <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-500 line-clamp-1">
                              {item.keyword}
                            </span>
                          </div>
                          <h3 className="mt-3 line-clamp-3 text-base font-semibold leading-6 text-slate-900 sm:text-[15px]">
                            <CardCtaLink
                              href={keywordDetailHref(productSlug, item.slug)}
                              variant="text"
                            >
                              {item.title}
                            </CardCtaLink>
                          </h3>
                          <p className="mt-3 line-clamp-3 text-[13.5px] leading-6 text-slate-500">
                            {item.scenarioDescription}
                          </p>
                        </article>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </section>

        <FinalCtaSection
          title={copy.finalCta.title}
          description={copy.finalCta.description}
          primaryLabel={copy.finalCta.primaryLabel}
          primaryHref="/products"
          secondaryLabel={copy.finalCta.secondaryLabel}
          secondaryHref={playbookHref}
        />
      </PageContainer>
    </main>
  );
}
