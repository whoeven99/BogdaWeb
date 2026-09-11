import {FaqSection} from "@/components/sections/FaqSection";
import {UseCaseHero} from "@/components/sections/UseCaseHero";
import {PageContainer} from "@/components/ui/PageContainer";
import {getProductMap} from "@/content/products";
import {getProductPlaybookHref, getUseCaseMap, useCases} from "@/content/use-cases";
import {localizeHref} from "@/lib/i18n";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema} from "@/lib/seo/schema";
import {notFound} from "next/navigation";

type UseCaseDetailPageProps = {
  params: Promise<{slug: string}>;
};

function getPageCopy(locale: "en" | "zh-cn") {
  if (locale === "zh-cn") {
    return {
      notFound: {
        title: "未找到应用场景",
        description: "你访问的应用场景页面不存在。",
      },
      hero: {
        backToPlaybook: "返回产品方案集",
        primaryLabel: "查看产品页",
        secondaryLabel: "开始使用",
        productLabel: "产品",
        categoryLabel: "场景类型",
      },
      sections: {
        howItWorksTitle: "它如何运行并达到目标",
        howItWorksDescription: "看这个场景如何从输入、判断到执行，最后把结果推进到可落地的目标。",
        faqEyebrow: "常见问题",
        faqTitle: "常见问题",
      },
    };
  }

  return {
    notFound: {
      title: "Use case not found",
      description: "The requested use case page could not be found.",
    },
    hero: {
      backToPlaybook: "Back to product playbook",
      primaryLabel: "Get started",
      secondaryLabel: "Get started",
      productLabel: "Product",
      categoryLabel: "Category",
    },
    sections: {
      howItWorksTitle: "How it works",
      howItWorksDescription: "See how this workflow runs from signal to action so the team can actually reach the intended outcome.",
      faqEyebrow: "Frequently asked questions",
      faqTitle: "Frequently asked questions",
    },
  };
}

export async function generateStaticParams() {
  return useCases.map((item) => ({slug: item.slug}));
}

export async function generateMetadata({params}: UseCaseDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const useCase = getUseCaseMap(locale)[slug];
  const copy = getPageCopy(locale);

  if (!useCase) {
    return buildPageMetadata({
      title: copy.notFound.title,
      description: copy.notFound.description,
      path: "/use-cases",
      locale,
    });
  }

  return buildPageMetadata({
    title: useCase.title,
    description: useCase.description,
    path: `/use-cases/${useCase.slug}`,
    locale,
  });
}

export default async function UseCaseDetailPage({params}: UseCaseDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const copy = getPageCopy(locale);
  const useCase = getUseCaseMap(locale)[slug];

  if (!useCase) {
    notFound();
  }

  const product = getProductMap(locale)[useCase.productSlug];
  const playbookHref = getProductPlaybookHref(useCase.productSlug);
  const pageUrl = new URL(localizeHref(locale, `/use-cases/${useCase.slug}`), siteUrl).toString();
  const productName = product?.name ?? useCase.productSlug;
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "应用场景" : "Use Cases", item: new URL(localizeHref(locale, "/use-cases"), siteUrl).toString()},
      {name: useCase.title, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: useCase.title,
      description: useCase.description,
      keywords: [useCase.category, productName, ...useCase.outcomes],
    }),
    buildFaqSchema(useCase.faq),
  ];

  return (
    <main>
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`${useCase.slug}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}

        <UseCaseHero
          backHref={playbookHref}
          backLabel={copy.hero.backToPlaybook}
          title={useCase.title}
          description={useCase.heroDescription}
          primaryLabel={useCase.ctaLabel || copy.hero.primaryLabel}
          primaryHref={useCase.ctaHref}
          metaItems={[
            {label: copy.hero.productLabel, value: productName},
            {label: copy.hero.categoryLabel, value: useCase.category},
          ]}
        />

        <section className="py-12 sm:py-14 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">{copy.sections.howItWorksTitle}</h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-600">{copy.sections.howItWorksDescription}</p>
            <div className="mt-8 grid gap-6">
              {useCase.workflow.map((step, index) => (
                <article
                  key={step.title}
                  className="grid gap-6 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/94 p-5 shadow-[0_14px_34px_-26px_rgba(15,23,42,0.2)] md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:p-6"
                >
                  <div
                    className="aspect-[4/3] rounded-[18px] bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.14),transparent_34%),linear-gradient(135deg,rgba(241,245,249,0.95),rgba(255,255,255,0.98))]"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col justify-center">
                    <div className="text-sm font-medium text-slate-400">{`0${index + 1}`}</div>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{step.title}</h3>
                    <p className="mt-4 max-w-3xl text-[15px] leading-8 text-slate-600">{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FaqSection
          eyebrow={copy.sections.faqEyebrow}
          title={copy.sections.faqTitle}
          items={useCase.faq}
        />
      </PageContainer>
    </main>
  );
}
