import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {BackLink} from "@/components/ui/BackLink";
import {Button} from "@/components/ui/Button";
import {CardCtaLink} from "@/components/ui/CardCtaLink";
import {PaginationNav, ScenarioFilterBar} from "@/components/ui/CategoryFilter";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {
  getKeywordUseCaseCategories,
  getKeywordUseCaseCategorySlug,
  getKeywordUseCases,
  getKeywordUseCasesByCategory,
} from "@/content/shopify-keyword-use-cases";
import {getProductMap, products} from "@/content/products";
import {getProductPlaybookHref} from "@/content/use-cases";
import {getRequestLocale} from "@/lib/i18n-server";
import {localizeHref} from "@/lib/i18n";
import {buildPageMetadata, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema, buildGraphSchema} from "@/lib/seo/schema";
import {notFound, permanentRedirect} from "next/navigation";

export const dynamic = "force-dynamic";

type SparkPlaybookKeywordIndexPageProps = {
  params: Promise<{slug: string; page?: string}>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const CATEGORIES_PER_PAGE = 25;

function keywordIndexHref(productSlug: string) {
  return `${getProductPlaybookHref(productSlug)}/keyword`;
}

function keywordDetailHref(productSlug: string, slug: string) {
  return `${keywordIndexHref(productSlug)}/${slug}`;
}

function keywordPageHref(productSlug: string, page: number) {
  const base = keywordIndexHref(productSlug);
  if (page <= 1) return base;
  return `${base}/page/${page}`;
}

function keywordCategoryHref(productSlug: string, locale: "en" | "zh-cn", categoryName: string) {
  const base = keywordIndexHref(productSlug);
  return `${base}/category/${getKeywordUseCaseCategorySlug(locale, categoryName)}`;
}

function buildPagination(
  current: number,
  total: number,
  pageHref: (page: number) => string,
  locale: "en" | "zh-cn",
) {
  type P =
    | {type: "prev" | "next"; href?: string; disabled?: boolean}
    | {type: "page"; page: number; label: string; href: string; active?: boolean}
    | {type: "ellipsis"};

  const out: P[] = [];
  out.push({
    type: "prev",
      href: current > 1 ? localizeHref(locale, pageHref(current - 1)) : undefined,
    disabled: current <= 1,
  });

  const pages = new Set<number>([1, 2, total - 1, total, current, current - 1, current + 1]);
  const ordered = [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  let lastShown = 0;
  for (const p of ordered) {
    if (p - lastShown > 1) {
      out.push({type: "ellipsis"});
    }
    out.push({
      type: "page",
      page: p,
      label: String(p),
        href: localizeHref(locale, pageHref(p)),
      active: p === current,
    });
    lastShown = p;
  }
  out.push({
    type: "next",
      href: current < total ? localizeHref(locale, pageHref(current + 1)) : undefined,
    disabled: current >= total,
  });
  return out;
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
        description:
          "按场景数量从多到少排序，每个主题下直接列出对应场景页入口。支持按关键词/主题即时筛选；主题较多时可翻页浏览。",
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
        "Sorted by topic size so the most common Spark workflows are visible first. Filter by keyword or topic name; paginate to browse beyond the first 25 topics.",
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
  return products
    .filter((product) => product.slug === "spark-analytics-agent")
    .map((product) => ({slug: product.slug}));
}

export async function generateMetadata({params}: SparkPlaybookKeywordIndexPageProps) {
  const locale = await getRequestLocale();
  const resolved = await params;
  const {slug} = resolved;
  const page = (resolved as {page?: string}).page;
  const pageNum = page ? Number(page) : 1;
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

  if (page === "1") {
    // canonical 指向 keyword/（无 page）
    return buildPageMetadata({
      title: locale === "zh-cn" ? `${product.name} ${copy.metadata.titleSuffix}` : `${product.name} ${copy.metadata.titleSuffix}`,
      description: product.shortDescription + " " + copy.metadata.description,
      path: keywordIndexHref(slug),
      locale,
      keywords: ["Shopify AI", "Shopify automation", "Spark playbook", `${product.name} AI prompts`],
    });
  }

  const categories = getKeywordUseCaseCategories(locale);
  const totalPages = Math.max(1, Math.ceil(categories.length / CATEGORIES_PER_PAGE));
  const safePage = Math.min(totalPages, Math.max(1, Number.isFinite(pageNum) ? pageNum : 1));
  const pageTitle =
    locale === "zh-cn"
      ? `${product.name} ${copy.metadata.titleSuffix} (第 ${safePage}/${totalPages} 页)`
      : `${product.name} ${copy.metadata.titleSuffix} (page ${safePage}/${totalPages})`;
  return buildPageMetadata({
    title: pageTitle,
    description: product.shortDescription + " " + copy.metadata.description,
    path: keywordPageHref(slug, safePage),
    locale,
    keywords: [
      "Shopify AI",
      "Shopify automation",
      "Spark playbook",
      `${product.name} AI prompts`,
      locale === "zh-cn" ? `第 ${safePage} 页` : `page ${safePage}`,
    ],
  });
}

async function resolvePageParam(param?: string): Promise<{resolvedPage: number; totalPages: number}> {
  const locale = await getRequestLocale();
  const totalPages = Math.max(1, Math.ceil(getKeywordUseCaseCategories(locale).length / CATEGORIES_PER_PAGE));
  if (!param) return {resolvedPage: 1, totalPages};
  const n = Number(param);
  if (!Number.isFinite(n)) return {resolvedPage: 1, totalPages};
  const resolved = Math.max(1, Math.min(totalPages, Math.floor(n)));
  return {resolvedPage: resolved, totalPages};
}

export default async function SparkPlaybookKeywordIndexPage({params}: SparkPlaybookKeywordIndexPageProps) {
  const locale = await getRequestLocale();
  const resolved = await params;
  const {slug: productSlug} = resolved;
  const pageParam = (resolved as {page?: string}).page;
  const copy = getUiCopy(locale);
  const product = getProductMap(locale)[productSlug];

  if (!product) {
    notFound();
  }
  if (product.slug !== "spark-analytics-agent") {
    notFound();
  }

  const {resolvedPage, totalPages} = await resolvePageParam(pageParam);

  if (pageParam && (pageParam === "1" || String(resolvedPage) !== pageParam)) {
    // page=1 或越界值，永久跳转到规范化的页 URL
    permanentRedirect(localizeHref(locale, keywordPageHref(productSlug, resolvedPage)));
  }

  const categories = getKeywordUseCaseCategories(locale);
  const total = getKeywordUseCases(locale).length;
  const INDEX_HREF = keywordIndexHref(productSlug);
  const playbookHref = getProductPlaybookHref(productSlug);

  const startIdx = (resolvedPage - 1) * CATEGORIES_PER_PAGE;
  const endIdx = startIdx + CATEGORIES_PER_PAGE;
  const pagedCategories = categories.slice(startIdx, endIdx);

  const pageUrl = toAbsoluteLocalizedUrl(locale, keywordPageHref(productSlug, resolvedPage));
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
        item: toAbsoluteLocalizedUrl(locale, INDEX_HREF),
      },
      ...(totalPages > 1 && resolvedPage > 1
        ? [
            {
              name:
                locale === "zh-cn"
                  ? `第 ${resolvedPage} 页`
                  : `Page ${resolvedPage}`,
              item: pageUrl,
            },
          ]
        : []),
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name:
        locale === "zh-cn"
          ? `${product.name} ${copy.metadata.titleSuffix}` +
            (resolvedPage > 1 ? ` (第 ${resolvedPage}/${totalPages} 页)` : "")
          : `${product.name} ${copy.metadata.titleSuffix}` +
            (resolvedPage > 1 ? ` (page ${resolvedPage}/${totalPages})` : ""),
      description: product.shortDescription + " " + copy.metadata.description,
      keywords: [
        "Shopify AI",
        "Shopify automation",
        `${product.name} playbook`,
        `${total} Shopify use cases`,
        ...(resolvedPage > 1
          ? [locale === "zh-cn" ? `第 ${resolvedPage} 页` : `page ${resolvedPage}`]
          : []),
      ],
      type: "CollectionPage",
    }),
  ]);

  const heroTitle =
    locale === "zh-cn"
      ? `${product.name} 按主题浏览 500+ AI 运营场景`
      : `Browse ${product.name} 500+ operational scenarios by topic`;

  const categoriesForFilter = categories.map((cat) => {
    const items = getKeywordUseCasesByCategory(locale, cat.name);
    return {
      slug: getKeywordUseCaseCategorySlug(locale, cat.name),
      name: cat.name,
      count: cat.count,
      sampleKeywords: items.slice(0, 8).map((i) => i.keyword),
      sampleTitles: items.slice(0, 6).map((i) => i.title),
    };
  });

  const pagination = buildPagination(
    resolvedPage,
    totalPages,
    (p) => keywordPageHref(productSlug, p),
    locale,
  );

  return (
    <main>
      <PageContainer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />

        <section className="py-10 sm:py-12 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <BackLink href={playbookHref} label={copy.hero.backLabel} />
            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end sm:mt-8 lg:gap-10">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-700/90">
                  {copy.hero.eyebrow}
                  <span className="ml-3 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.12em] text-slate-500">
                    {total.toLocaleString()} {copy.categories.totalLabel} · {categories.length}{" "}
                    {locale === "zh-cn" ? "主题" : "topics"}
                    {totalPages > 1 && (
                      <>
                        <span className="mx-2 text-slate-300">·</span>
                        <span>
                          {locale === "zh-cn" ? "第 " : "Page "}
                          {resolvedPage}/{totalPages}
                        </span>
                      </>
                    )}
                  </span>
                </div>
                <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:mt-5 sm:text-4xl lg:text-5xl">
                  {heroTitle}
                </h1>
                <p className="mt-4 max-w-2xl text-[15px] leading-8 text-slate-600 sm:mt-5 sm:text-base">
                  {copy.hero.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
                  <Button href={playbookHref}>{copy.hero.primaryLabel}</Button>
                  <Button href={`/products/${product.slug}`} variant="secondary">
                    {copy.hero.secondaryLabel}
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="pb-14 pt-6 sm:pb-16 sm:pt-8 lg:pb-20 lg:pt-10">
          <div className="mx-auto max-w-6xl space-y-10 sm:space-y-12 lg:space-y-14">
            <SectionHeading
              eyebrow={copy.categories.eyebrow}
              title={copy.categories.title}
              description={copy.categories.description}
            />

              <div className="-mt-2 sm:-mt-3 lg:-mt-4">
                <ScenarioFilterBar
                  locale={locale}
                  productSlug={productSlug}
                  categories={categoriesForFilter}
                  chips={pagedCategories.map((c) => ({
                    slug: getKeywordUseCaseCategorySlug(locale, c.name),
                    name: c.name,
                    count: c.count,
                  }))}
                  currentPage={resolvedPage}
                  totalPages={totalPages}
                />
              </div>

            <div className="space-y-8 sm:space-y-10 lg:space-y-12">
              {pagedCategories.map((cat) => {
                const items = getKeywordUseCasesByCategory(locale, cat.name);
                  const previewItems = items.slice(0, 3);
                const slug = getKeywordUseCaseCategorySlug(locale, cat.name);
                return (
                  <section
                    key={cat.name}
                    id={`cat-${slug}`}
                    data-cat-slug={slug}
                    className="rounded-[26px] bg-white/85 px-5 py-7 shadow-[0_14px_40px_-32px_rgba(15,23,42,0.16)] sm:px-7 sm:py-8 lg:px-8 lg:py-9"
                  >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                          {cat.count} {copy.categories.totalLabel}
                        </div>
                        <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-2xl lg:text-[26px]">
                          {cat.name}
                        </h2>
                      </div>
                        {items.length > 3 ? (
                          <div>
                            <CardCtaLink
                              href={keywordCategoryHref(productSlug, locale, cat.name)}
                              variant="outlined"
                            >
                              {locale === "zh-cn" ? "查看全部场景" : "Open category page"}
                            </CardCtaLink>
                          </div>
                        ) : null}
                    </div>
                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
                        {previewItems.map((item) => (
                        <li key={item.slug}>
                          <article className="group flex h-full flex-col rounded-2xl border border-slate-200/75 bg-white/85 p-4 transition-colors hover:border-emerald-200 hover:bg-emerald-50/40 sm:p-4.5">
                            <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-500 line-clamp-1">
                                {item.keyword}
                              </span>
                            </div>
                            <h3 className="mt-2.5 line-clamp-3 text-[14.5px] font-semibold leading-6 text-slate-900 sm:mt-3 sm:text-base">
                              <CardCtaLink
                                href={keywordDetailHref(productSlug, item.slug)}
                                variant="text"
                              >
                                {item.title}
                              </CardCtaLink>
                            </h3>
                            <p className="mt-2 line-clamp-3 text-[13px] leading-6 text-slate-500 sm:mt-2.5 sm:text-[13.5px]">
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

            <PaginationNav
              locale={locale}
              currentPage={resolvedPage}
              totalPages={totalPages}
              pagination={pagination}
            />
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
