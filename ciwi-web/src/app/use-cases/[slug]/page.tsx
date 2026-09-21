import {FaqSection} from "@/components/sections/FaqSection";
import {BackLink} from "@/components/ui/BackLink";
import {Button} from "@/components/ui/Button";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getProductMap} from "@/content/products";
import {getProductPlaybookHref, getUseCaseMap, useCases, type UseCaseItem} from "@/content/use-cases";
import {getRequestLocale} from "@/lib/i18n-server";
import {localizeLanguageSignalFields, localizeLanguageSignalText} from "@/lib/localized-language-signal";
import {buildPageMetadata, siteUrl, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema, buildGraphSchema} from "@/lib/seo/schema";
import {notFound} from "next/navigation";

export const dynamic = "force-dynamic";

type UseCaseDetailPageProps = {
  params: Promise<{slug: string}>;
};

function buildUseCaseNarrative(useCase: UseCaseItem, locale: "en" | "zh-cn") {
  const signalSummary = useCase.signals.slice(0, 2).join(locale === "zh-cn" ? "；" : "; ");
  const deliverableSummary = useCase.deliverables.slice(0, 2).map((item) => item.title).join(locale === "zh-cn" ? "、" : ", ");
  const outcomeSummary = useCase.outcomes.slice(0, 3).join(locale === "zh-cn" ? "、" : ", ");
  const workflowTitles = useCase.workflow.map((step) => step.title).join(locale === "zh-cn" ? " -> " : " -> ");

  if (locale === "zh-cn") {
    return [
      `${useCase.heroDescription} 这类场景通常出现在团队已经感受到明显运营摩擦，但还没有把输入、判断和执行顺序沉淀成固定流程的时候。`,
      signalSummary
        ? `如果你现在遇到的问题更接近「${signalSummary}」，那这条工作流就是在把零散信号整理成一个可重复执行的流程。它会沿着 ${workflowTitles} 这样的顺序推进，避免不同成员各自用不同方法处理同一问题。`
        : `这条工作流会把零散信号整理成一个可重复执行的流程，避免不同成员各自用不同方法处理同一问题。`,
      `执行完成后，团队通常会拿到 ${deliverableSummary || "更清晰的执行输出"} 等可直接复用的交付物，并最终帮助业务实现 ${outcomeSummary || "更稳定的运营结果"}。`,
    ];
  }

  return [
    `${useCase.heroDescription} This kind of page is most useful when the team already feels the operating friction but has not yet turned the inputs, decisions, and handoff into a stable workflow.`,
    signalSummary
      ? `If the current pain looks more like "${signalSummary}", this workflow is designed to turn those scattered signals into one repeatable operating sequence. It moves through ${workflowTitles} so different team members are not improvising the same job in different ways.`
      : `This workflow turns scattered signals into one repeatable operating sequence so different team members are not improvising the same job in different ways.`,
    `By the end, the team should have deliverables such as ${deliverableSummary || "clearer operating outputs"} and use them to drive outcomes like ${outcomeSummary || "more stable operating results"}.`,
  ];
}

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
  const rawUseCase = getUseCaseMap(locale)[slug];
  const useCase = rawUseCase ? localizeLanguageSignalFields(locale, rawUseCase) : rawUseCase;
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
  const rawUseCase = getUseCaseMap(locale)[slug];
  const useCase = rawUseCase ? localizeLanguageSignalFields(locale, rawUseCase) : rawUseCase;

  if (!useCase) {
    notFound();
  }

  const rawProduct = getProductMap(locale)[useCase.productSlug];
  const product = rawProduct ? localizeLanguageSignalFields(locale, rawProduct) : rawProduct;
  const playbookHref = getProductPlaybookHref(useCase.productSlug);
  const pageUrl = toAbsoluteLocalizedUrl(locale, `/use-cases/${useCase.slug}`);
  const productName = product?.name ?? useCase.productSlug;
  const narrative = buildUseCaseNarrative(useCase, locale);
  const structuredData = buildGraphSchema([
    buildBreadcrumbSchema([
      {name: locale === "zh-cn" ? "首页" : "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "应用场景" : "Use Cases", item: toAbsoluteLocalizedUrl(locale, "/use-cases")},
      {name: useCase.title, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: useCase.title,
      description: useCase.description,
      keywords: [useCase.category, productName, ...useCase.outcomes],
    }),
    buildFaqSchema(useCase.faq),
  ]);

  return (
    <main>
      <PageContainer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />

        <section className="py-8 sm:py-10 lg:py-12">
          <div className="mx-auto max-w-5xl">
            <BackLink href={playbookHref} label={copy.hero.backToPlaybook} />
            <div className="mt-5 sm:mt-6">
              <SectionHeading
                title={useCase.title}
                description={useCase.heroDescription}
                as="h1"
              />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
              {[
                {label: copy.hero.productLabel, value: productName},
                {label: copy.hero.categoryLabel, value: useCase.category},
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {item.label}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-900">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={useCase.ctaHref}>{localizeLanguageSignalText(locale, useCase.ctaLabel || copy.hero.primaryLabel)}</Button>
            </div>
            <div className="mt-6 rounded-[24px] border border-slate-200/80 bg-white/92 p-5 sm:p-6">
              <div className="space-y-4 text-[15px] leading-7 text-slate-600 sm:text-base">
                {narrative.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">{copy.sections.howItWorksTitle}</h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-600">{copy.sections.howItWorksDescription}</p>
            <div className="mt-10 grid gap-6 sm:mt-12">
              {useCase.workflow.map((step, index) => (
                <article
                  key={step.title}
                  className="grid gap-5 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/94 p-5 shadow-[0_14px_34px_-26px_rgba(15,23,42,0.2)] md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:gap-7 md:p-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]"
                >
                  <div
                    className="mx-auto aspect-[5/4] w-full max-w-[280px] rounded-[18px] bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.14),transparent_34%),linear-gradient(135deg,rgba(241,245,249,0.95),rgba(255,255,255,0.98))] lg:max-w-[320px]"
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
