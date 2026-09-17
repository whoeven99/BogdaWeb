import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {BackLink} from "@/components/ui/BackLink";
import {CardCtaLink} from "@/components/ui/CardCtaLink";
import {PageContainer} from "@/components/ui/PageContainer";
import {
  getKeywordUseCaseCategories,
  getKeywordUseCaseCategorySlug,
  getKeywordUseCasesByCategory,
} from "@/content/shopify-keyword-use-cases";
import {getProductMap, products} from "@/content/products";
import {getProductPlaybookHref} from "@/content/use-cases";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildWebPageSchema,
  buildGraphSchema,
} from "@/lib/seo/schema";
import {notFound} from "next/navigation";

type CategoryPageProps = {
  params: Promise<{slug: string; catSlug: string}>;
};

function keywordIndexHref(productSlug: string) {
  return `${getProductPlaybookHref(productSlug)}/keyword`;
}

function keywordCategoryHref(productSlug: string, locale: "en" | "zh-cn", categoryName: string) {
  const slug = getKeywordUseCaseCategorySlug(locale, categoryName);
  return `${keywordIndexHref(productSlug)}/category/${slug}`;
}

function keywordDetailHref(productSlug: string, slug: string) {
  return `${keywordIndexHref(productSlug)}/${slug}`;
}

const copyByLocale: Record<
  "en" | "zh-cn",
  {
    hero: {
      backLabel: string;
      eyebrow: string;
      eyebrowSuffix: (count: number) => string;
      description: (catName: string, count: number) => string;
      primaryLabel: string;
      secondaryLabel: string;
    };
    section: {
      eyebrow: string;
      empty: string;
    };
    finalCta: {
      eyebrow: string;
      title: string;
      description: string;
      primaryLabel: string;
      secondaryLabel: string;
    };
  }
> = {
  "zh-cn": {
    hero: {
      backLabel: "返回运营场景库",
      eyebrow: "运营场景分类",
      eyebrowSuffix: (n) => `共 ${n} 条场景`,
      description: (name, n) =>
        `围绕「${name}」主题聚合 ${n} 条完整 AI 工作流。每条都带可复制 Prompt 和 FAQ，直接复制粘贴即可在你常用的 AI 助手或 Spark 智能体中使用。`,
      primaryLabel: "返回运营场景库首页",
      secondaryLabel: "返回 Spark Playbook",
    },
    section: {
      eyebrow: "该分类的全部场景",
      empty: "该分类暂无可用运营场景，请返回上一层浏览。",
    },
    finalCta: {
      eyebrow: "下一步",
      title: "继续探索更多 Spark 运营场景",
      description:
        "还有 500+ 条跨主题的 Shopify 运营 AI 工作流，继续按主题浏览，或回到 Spark Playbook 查看精选代表性落地页。",
      primaryLabel: "打开运营场景库",
      secondaryLabel: "返回 Spark Playbook",
    },
  },
  en: {
    hero: {
      backLabel: "Back to scenario library",
      eyebrow: "Scenario library",
      eyebrowSuffix: (n) => `${n} scenarios`,
      description: (name, n) =>
        `${n} AI workflows under the "${name}" topic. Each includes a copyable prompt and FAQs. Paste them into your preferred AI assistant or Spark agent and run it.`,
      primaryLabel: "All scenarios",
      secondaryLabel: "Back to Spark playbook",
    },
    section: {
      eyebrow: "All scenarios in this category",
      empty: "Nothing here yet. Go back up and try another category.",
    },
    finalCta: {
      eyebrow: "Next",
      title: "Keep exploring Spark scenarios",
      description:
        "500+ Shopify operational AI workflows across topics. Browse by topic or jump back to featured playbooks.",
      primaryLabel: "Open scenario library",
      secondaryLabel: "Back to Spark playbook",
    },
  },
};

export function generateStaticParams() {
  const combos: {slug: string; catSlug: string}[] = [];
  const productSlugs = products
    .filter((product) => product.slug === "spark-analytics-agent")
    .map((product) => product.slug);
  const cats = getKeywordUseCaseCategories("en");
  for (const slug of productSlugs) {
    for (const c of cats) {
      combos.push({slug, catSlug: getKeywordUseCaseCategorySlug("en", c.name)});
    }
  }
  return combos;
}

export async function generateMetadata(props: CategoryPageProps) {
  const params = await props.params;
  const locale = await getRequestLocale();
  const productMap = getProductMap(locale as "en" | "zh-cn");
  const product = productMap[params.slug];
  if (!product) return {};
  const cats = getKeywordUseCaseCategories(locale as "en" | "zh-cn");
  const match = cats.find(
    (c) => getKeywordUseCaseCategorySlug(locale as "en" | "zh-cn", c.name) === params.catSlug,
  );
  if (!match) return {};
  const copy = copyByLocale[locale as "en" | "zh-cn"];
  const heroTitle =
    locale === "zh-cn"
      ? `${match.name} (${match.count.toLocaleString()} 条)`
      : `${match.name} · ${match.count.toLocaleString()}`;
  const description = copy.hero.description(match.name, match.count);
  const pagePath = keywordCategoryHref(product.slug, locale as "en" | "zh-cn", match.name);
  const keywords = [
    match.name,
    `${match.count} ${locale === "zh-cn" ? "条" : ""} Shopify AI`,
    `${product.name} ${locale === "zh-cn" ? "场景分类" : "scenario category"}`,
    product.name,
    locale === "zh-cn" ? "Spark 运营场景库" : "Spark scenario library",
  ];
  return buildPageMetadata({
    title: `${heroTitle} · ${product.name}${locale === "zh-cn" ? " 运营场景分类" : " scenario category"}`,
    description,
    locale,
    path: pagePath,
    keywords,
  });
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params;
  const locale = await getRequestLocale() as "en" | "zh-cn";
  const productMap = getProductMap(locale);
  const product = productMap[params.slug];
  if (!product) notFound();
  if (product.slug !== "spark-analytics-agent") notFound();
  const copy = copyByLocale[locale];
  const allCats = getKeywordUseCaseCategories(locale);
  const match = allCats.find(
    (c) => getKeywordUseCaseCategorySlug(locale, c.name) === params.catSlug,
  );
  if (!match) notFound();

  const items = getKeywordUseCasesByCategory(locale, match.name);
  if (!items || items.length === 0) {
    return (
      <PageContainer>
        <section className="py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl space-y-8">
            <BackLink href={keywordIndexHref(product.slug)} label={copy.hero.backLabel} />
            <p className="text-sm text-slate-500">{copy.section.empty}</p>
          </div>
        </section>
      </PageContainer>
    );
  }

  const categoryPageHref = keywordCategoryHref(product.slug, locale, match.name);
  const scenarioLibraryHref = keywordIndexHref(product.slug);
  const playbookHref = getProductPlaybookHref(product.slug);

  const heroTitle =
    locale === "zh-cn"
      ? `${match.name} (${match.count.toLocaleString()} 条)`
      : `${match.name} · ${match.count.toLocaleString()}`;
  const description = copy.hero.description(match.name, match.count);

  const pageUrl = toAbsoluteLocalizedUrl(locale, categoryPageHref);

  const breadcrumbs = buildBreadcrumbSchema([
    {name: locale === "zh-cn" ? "首页" : "Home", item: toAbsoluteLocalizedUrl(locale, "/")},
    {
      name: locale === "zh-cn" ? "产品中心" : "Products",
      item: toAbsoluteLocalizedUrl(locale, "/products"),
    },
    {
      name: product.name,
      item: toAbsoluteLocalizedUrl(locale, `/products/${product.slug}`),
    },
    {
      name: "Playbook",
      item: toAbsoluteLocalizedUrl(locale, playbookHref),
    },
    {
      name:
        locale === "zh-cn"
          ? `${product.name} 运营场景库`
          : `${product.name} scenario library`,
      item: toAbsoluteLocalizedUrl(locale, scenarioLibraryHref),
    },
    {
      name: match.name,
      item: toAbsoluteLocalizedUrl(locale, categoryPageHref),
    },
  ]);

  const itemList = buildItemListSchema({
    url: pageUrl,
    name: heroTitle,
    description,
    items: items.map((item, i) => ({
      position: i + 1,
      name: item.title,
      url: toAbsoluteLocalizedUrl(
        locale,
        keywordDetailHref(product.slug, item.slug),
      ),
    })),
  });

  const keywords = [
    match.name,
    product.name,
    locale === "zh-cn" ? "运营场景分类" : "scenario category",
    locale === "zh-cn" ? "Spark 运营场景库" : "Spark scenario library",
    `Shopify ${match.name} AI`,
    `${match.count}${locale === "zh-cn" ? "条场景" : " scenarios"}`,
  ];

  const webPage = buildWebPageSchema({
    url: pageUrl,
    name: `${heroTitle} · ${product.name}`,
    description,
    keywords,
    type: "CollectionPage",
  });

  const jsonLd = buildGraphSchema([breadcrumbs, itemList, webPage]);

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
      <section className="py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-5xl">
          <BackLink href={scenarioLibraryHref} label={copy.hero.backLabel} />
          <div className="mt-5 max-w-3xl sm:mt-6">
            <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-700/90">
              <span>{copy.hero.eyebrow}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.12em] text-slate-500">
                {copy.hero.eyebrowSuffix(match.count)}
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-[42px] lg:leading-[1.08]">
              {heroTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-base">
              {description}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-14 pt-4 sm:pb-16 sm:pt-6 lg:pb-20 lg:pt-8">
        <div className="mx-auto max-w-5xl space-y-8 sm:space-y-10 lg:space-y-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2.5">
              <div className="text-[11.5px] font-medium uppercase tracking-[0.18em] text-slate-400">
                {copy.section.eyebrow}
              </div>
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2">
            {items.map((item) => {
              const href = keywordDetailHref(product.slug, item.slug);
              return (
                <li key={item.slug}>
                  <article className="group flex h-full flex-col rounded-2xl border border-slate-200/75 bg-white/85 p-5 transition-colors hover:border-emerald-200 hover:bg-emerald-50/40 sm:p-5.5">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-500 line-clamp-1">
                        {item.keyword}
                      </span>
                    </div>
                    <h3 className="mt-3 line-clamp-3 text-[15px] font-semibold leading-7 text-slate-900 sm:text-[16px]">
                      <CardCtaLink href={href} variant="text">
                        {item.title}
                      </CardCtaLink>
                    </h3>
                    <p className="mt-2.5 line-clamp-4 text-[13.5px] leading-6 text-slate-500 sm:text-[14px]">
                      {item.scenarioDescription}
                    </p>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <FinalCtaSection
        eyebrow={copy.finalCta.eyebrow}
        title={copy.finalCta.title}
        description={copy.finalCta.description}
        primaryLabel={copy.finalCta.primaryLabel}
        primaryHref={scenarioLibraryHref}
        secondaryLabel={copy.finalCta.secondaryLabel}
        secondaryHref={playbookHref}
      />
    </PageContainer>
  );
}

export const dynamic = "force-dynamic";
