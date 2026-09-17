import {ContentIndexCard} from "@/components/cards/ContentIndexCard";
import {CopyPromptButton} from "@/components/ui/CopyPromptButton";
import {FaqSection} from "@/components/sections/FaqSection";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {BackLink} from "@/components/ui/BackLink";
import {Button} from "@/components/ui/Button";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {
  getKeywordUseCaseBySlug,
  getKeywordUseCaseCategorySlug,
  getKeywordUseCases,
  getRelatedKeywordUseCases,
} from "@/content/shopify-keyword-use-cases";
import {getProductMap, products} from "@/content/products";
import {getProductPlaybookHref} from "@/content/use-cases";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildWebPageSchema,
  buildHowToSchema,
  buildGraphSchema,
} from "@/lib/seo/schema";
import {notFound} from "next/navigation";

export const dynamic = "force-dynamic";

type SparkPlaybookKeywordDetailPageProps = {
  params: Promise<{slug: string; keywordSlug: string}>;
};

const PRODUCT_SLUG = "spark-analytics-agent";

function keywordIndexHref(productSlug: string) {
  return `${getProductPlaybookHref(productSlug)}/keyword`;
}

function keywordDetailHref(productSlug: string, slug: string) {
  return `${keywordIndexHref(productSlug)}/${slug}`;
}

function keywordCategoryHref(productSlug: string, locale: "en" | "zh-cn", categoryName: string) {
  const slug = getKeywordUseCaseCategorySlug(locale, categoryName);
  return `${keywordIndexHref(productSlug)}/category/${slug}`;
}

function getUiCopy(locale: "en" | "zh-cn") {
  if (locale === "zh-cn") {
    return {
      notFound: {
        title: "场景页不存在",
        description: "你访问的 Spark 运营场景页不存在。",
      },
      hero: {
        backLabel: "返回所属主题",
        eyebrow: "Spark 运营场景库",
        categoryLabel: "所属主题",
        keywordLabel: "目标关键词",
        primaryLabel: "查看 Spark Playbook",
      },
      sections: {
        scenario: {
          eyebrow: "场景与问题",
          title: "这个场景通常在什么情况下出现？",
          description: "先把问题的业务上下文、出现时机和最终要达成的输出讲清楚，再进入解决步骤。",
        },
        workflow: {
          eyebrow: "解决步骤",
          title: "推荐的解决流程",
          description: "按输入、判断、交付三个阶段拆开执行，先保证每一步的输出，再进入下一步。",
          stepLabel: "步骤",
        },
        prompt: {
          eyebrow: "可复制 AI 提示词",
          title: "直接用在 Spark 工作流里的提示词",
          description:
            "先替换所有 [方括号] 占位内容，再补充你真实的店铺数据和限制条件，最后粘贴到你常用的 AI 助手或 Spark 智能体里。Spark 会按本页定义的流程给出结构化的输出和验证方式。",
          copyLabel: "复制提示词",
          copySuccessLabel: "已复制提示词，可以粘贴到 Spark 或其他 AI 助手里使用。",
          copyErrorLabel: "当前环境无法复制，请手动选中上方提示词后复制。",
          ctaSparkLabel: "去 Spark 使用",
        },
        faq: {
          eyebrow: "常见问题",
          title: "执行这个场景时最常见的疑问",
          description: "覆盖判断依据、常见误解和必须准备的输入，让团队在真正动手之前先把前提对齐。",
        },
        related: {
          eyebrow: "相关场景",
          title: "继续浏览相近或同主题的 Spark 运营场景",
          description: "先优先看同主题的相似问题，或用相似度推荐扩展到跨主题但逻辑相近的其他场景。",
          ctaLabel: "打开场景页",
        },
        finalCta: {
          title: "想把这些 AI 场景直接嵌入日常运营？",
          description:
            "Ciwi Spark 围绕 Shopify 商家常见的研究、投放、翻译和客户支持等流程，提供可以直接接入店铺的 AI 工具与智能体，减少反复写提示词的成本。",
          primaryLabel: "看 Spark 产品页",
          primaryHref: `/products/${PRODUCT_SLUG}`,
          secondaryLabel: "返回 Spark 运营场景库",
        },
      },
    };
  }

  return {
    notFound: {
      title: "Use case not found",
      description: "The requested Spark operational scenario page does not exist.",
    },
    hero: {
      backLabel: "Back to topic",
      eyebrow: "Spark playbook scenarios",
      categoryLabel: "Topic",
      keywordLabel: "Target keyword",
      primaryLabel: "Open Spark playbook",
    },
    sections: {
      scenario: {
        eyebrow: "Scenario & problem",
        title: "When does this scenario usually come up?",
        description:
          "Start with the business context, the trigger, and the expected output before moving into the execution steps.",
      },
      workflow: {
        eyebrow: "How to solve",
        title: "A recommended resolution workflow",
        description:
          "Split the work into input, judgment, and deliverable phases. Verify each step's output before moving to the next.",
        stepLabel: "Step",
      },
      prompt: {
        eyebrow: "Copyable AI prompt",
        title: "A prompt you can drop directly into Spark",
        description:
          "First replace every [bracketed] placeholder with real store scope and constraints, then add any actual records or data you have, and paste it into your preferred AI assistant or Spark agent. Spark will follow this page's workflow to produce structured output and verification steps.",
        copyLabel: "Copy prompt",
        copySuccessLabel:
          "Prompt copied. Paste it into your preferred AI assistant or Shopify AI workflow.",
        copyErrorLabel:
          "Copy is unavailable. Select and copy the prompt text above.",
        ctaSparkLabel: "Use in Spark",
      },
      faq: {
        eyebrow: "FAQ",
        title: "Common questions when running this scenario",
        description:
          "Cover decision rules, frequent misunderstandings, and required inputs so the team aligns on prerequisites before execution.",
      },
      related: {
        eyebrow: "Related scenarios",
        title: "Continue with adjacent or same-topic scenarios",
        description:
          "Start with scenarios under the same topic, then expand into cross-topic matches suggested by similarity.",
        ctaLabel: "Open scenario",
      },
      finalCta: {
        title: "Want these AI scenarios embedded directly into daily operations?",
        description:
          "Ciwi Spark builds Shopify-native AI tools and agents around the workflows merchants actually run: research, ads, translation, and customer support. Stop rewriting the same prompts by hand.",
        primaryLabel: "Open Spark product page",
        primaryHref: `/products/${PRODUCT_SLUG}`,
        secondaryLabel: "Back to Spark scenario library",
      },
    },
  };
}

function splitHowToSteps(text: string): string[] {
  if (!text) return [];
  const raw = String(text).trim();
  const parts = raw
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length <= 1) {
    const fallback = raw
      .split(". ")
      .map((s) => s.trim())
      .filter((s) => s.length > 20);
    return fallback.length ? fallback : [raw];
  }
  return parts;
}

const AI_PROMPT_BREAK_WORDS = [
  "Act as ",
  "You are ",
  "My store context ",
  "My scope ",
  "My goal ",
  "My role ",
  "Use these inputs ",
  "Use these source ",
  "Use these product ",
  "Analyze ",
  "Compare ",
  "Evaluate ",
  "Review ",
  "Check ",
  "Identify ",
  "Detect ",
  "Assess ",
  "Monitor ",
  "Build ",
  "Generate ",
  "Draft ",
  "Create ",
  "Produce ",
  "Translate ",
  "Localize ",
  "Summarize ",
  "Return ",
  "Output ",
  "Present ",
  "Format ",
  "Show ",
  "Provide ",
  "Deliver ",
  "List ",
  "Recommend ",
  "Prioritize ",
  "Suggest ",
  "Explain ",
  "Describe ",
  "Clarify ",
  "If ",
  "When ",
  "Do not ",
  "Don't ",
  "Never ",
  "Always ",
  "Ensure ",
  "Validate ",
  "Verify ",
  "Wait ",
  "Ask ",
  "Stop ",
  "Consider ",
  "For any ",
  "Before any ",
  "After ",
  "During ",
  "Unless ",
  "Remember ",
  "Note ",
  "Finally ",
  "Additionally ",
  "Also ",
  "Otherwise ",
] as const;

function formatAiPrompt(text: string): string {
  if (!text) return "";
  const raw = String(text).trim();
  if (raw.includes("\n")) {
    return raw;
  }
  let working = raw;
  for (const token of AI_PROMPT_BREAK_WORDS) {
    const pattern = new RegExp(`([.!?。！？])\\s+(?=${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "g");
    working = working.replace(pattern, `$1\n\n`);
  }
  const sentenceBreak = working.replace(/([a-z][.!?])\s+(?=[A-Z"“])/g, "$1\n");
  return sentenceBreak.trim();
}

export async function generateStaticParams() {
  const keywords = getKeywordUseCases("en").map((item) => ({slug: item.slug}));
  const productSlugs = products
    .filter((product) => product.slug === "spark-analytics-agent")
    .map((product) => ({slug: product.slug}));
  const params: Array<{slug: string; keywordSlug: string}> = [];
  for (const product of productSlugs) {
    for (const kw of keywords) {
      params.push({slug: product.slug, keywordSlug: kw.slug});
    }
  }
  return params;
}

export async function generateMetadata({params}: SparkPlaybookKeywordDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug: productSlug, keywordSlug} = await params;
  const copy = getUiCopy(locale);
  const product = getProductMap(locale)[productSlug];
  const item = getKeywordUseCaseBySlug(locale, keywordSlug);

  if (!item || !product) {
    return buildPageMetadata({
      title: copy.notFound.title,
      description: copy.notFound.description,
      path: keywordIndexHref(PRODUCT_SLUG),
      locale,
    });
  }

  return buildPageMetadata({
    title: `${item.title} — ${item.keyword}`,
    description: item.scenarioDescription || `${item.category}: ${item.title}`,
    path: keywordDetailHref(productSlug, keywordSlug),
    locale,
    keywords: [item.keyword, item.category, "Shopify AI", "Shopify automation", "Spark playbook"],
  });
}

export default async function SparkPlaybookKeywordDetailPage({params}: SparkPlaybookKeywordDetailPageProps) {
  const locale = await getRequestLocale();
  const {slug: productSlug, keywordSlug} = await params;
  const copy = getUiCopy(locale);
  const product = getProductMap(locale)[productSlug];
  const item = getKeywordUseCaseBySlug(locale, keywordSlug);

  if (!product || !item) {
    notFound();
  }
  if (product.slug !== "spark-analytics-agent") {
    notFound();
  }

  const INDEX_HREF = keywordIndexHref(productSlug);
  const CATEGORY_HREF = keywordCategoryHref(productSlug, locale, item.category);
  const playbookHref = getProductPlaybookHref(productSlug);
  const pageUrl = toAbsoluteLocalizedUrl(locale, keywordDetailHref(productSlug, keywordSlug));
  const playbookUrl = toAbsoluteLocalizedUrl(locale, playbookHref);
  const steps = splitHowToSteps(item.howToSolve);
  const howToSteps = steps.map((text, index) => ({
    name: `${copy.sections.workflow.stepLabel} ${index + 1}`,
    text,
  }));
  const related = getRelatedKeywordUseCases(locale, keywordSlug, 6);
  const formattedAiPrompt = formatAiPrompt(item.aiPrompt);

  const structuredData = buildGraphSchema([
    buildBreadcrumbSchema([
      {name: "Home", item: toAbsoluteLocalizedUrl(locale, "/")},
      {
        name: locale === "zh-cn" ? "产品" : "Products",
        item: toAbsoluteLocalizedUrl(locale, "/products"),
      },
      {
        name: product.name,
        item: toAbsoluteLocalizedUrl(locale, `/products/${product.slug}`),
      },
      {
        name: locale === "zh-cn" ? "方案集" : "Playbook",
        item: playbookUrl,
      },
      {
        name: locale === "zh-cn" ? "运营场景库" : "Scenario library",
        item: toAbsoluteLocalizedUrl(locale, INDEX_HREF),
      },
      {
        name: item.category,
        item: toAbsoluteLocalizedUrl(
          locale,
          keywordCategoryHref(product.slug, locale, item.category),
        ),
      },
      {name: item.title, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: `${item.title} — ${item.keyword}`,
      description: item.scenarioDescription || `${item.category}: ${item.title}`,
      keywords: [item.keyword, item.category, "Shopify AI prompt", item.title, "Spark playbook"],
    }),
    buildHowToSchema({
      url: pageUrl,
      name: `${copy.sections.workflow.title}: ${item.title}`,
      description: item.howToSolve,
      steps: howToSteps,
    }),
    buildFaqSchema(item.faqs),
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
            <BackLink href={CATEGORY_HREF} label={copy.hero.backLabel} />
            <div className="mt-5 sm:mt-6">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-700/90">
                {copy.hero.eyebrow} · {product.name}
              </div>
              <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-[42px] lg:leading-[1.08]">
                {item.title}
              </h1>
              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-600 sm:text-base">
                {item.scenarioDescription}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
                <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
                  <div className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                    {copy.hero.categoryLabel}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-900">{item.category}</div>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
                  <div className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                    {copy.hero.keywordLabel}
                  </div>
                  <div className="mt-2 break-words text-sm font-semibold text-slate-900">
                    {item.keyword}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-12 lg:py-14" aria-label="Copyable AI prompt">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow={copy.sections.prompt.eyebrow}
              title={copy.sections.prompt.title}
              description={copy.sections.prompt.description}
            />
            <div className="mt-8 overflow-hidden rounded-[28px] border border-slate-200/80 bg-slate-950 shadow-[0_22px_54px_-36px_rgba(15,23,42,0.4)]">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3 sm:px-6">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                    ai-prompt.txt
                  </span>
                </div>
              </div>
              <pre className="whitespace-pre-wrap break-words p-5 text-[13px] leading-7 text-slate-100 sm:p-6 sm:text-sm">
                <code>{formattedAiPrompt}</code>
              </pre>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <CopyPromptButton
                text={item.aiPrompt}
                label={copy.sections.prompt.copyLabel}
                successLabel={copy.sections.prompt.copySuccessLabel}
                errorLabel={copy.sections.prompt.copyErrorLabel}
              />
              <Button
                href={`https://apps.shopify.com/spark-1?keyword=${encodeURIComponent(item.keyword)}`}
              >
                {copy.sections.prompt.ctaSparkLabel}
              </Button>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-12 lg:py-14">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow={copy.sections.scenario.eyebrow}
              title={copy.sections.scenario.title}
              description={copy.sections.scenario.description}
            />
            <div className="mt-8 rounded-[26px] border border-slate-200/80 bg-white/94 p-6 shadow-[0_18px_48px_-32px_rgba(15,23,42,0.2)] sm:p-8">
              <p className="text-[15px] leading-8 text-slate-700 sm:text-base">
                {item.scenarioDescription}
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-12 lg:py-14">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow={copy.sections.workflow.eyebrow}
              title={copy.sections.workflow.title}
              description={copy.sections.workflow.description}
            />
            <div className="mt-10 grid gap-6 sm:mt-12">
              {howToSteps.map((step, index) => (
                <article
                  key={index}
                  className="grid gap-5 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/94 p-5 shadow-[0_14px_34px_-26px_rgba(15,23,42,0.2)] md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:gap-7 md:p-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]"
                >
                  <div
                    className="mx-auto aspect-[5/4] w-full max-w-[280px] rounded-[18px] bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.14),transparent_34%),linear-gradient(135deg,rgba(241,245,249,0.95),rgba(255,255,255,0.98))] lg:max-w-[320px]"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col justify-center">
                    <div className="text-sm font-medium text-slate-400">{`0${index + 1}`}</div>
                    <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-2xl">
                      {step.name}
                    </h3>
                    <p className="mt-4 max-w-3xl text-[15px] leading-8 text-slate-600">{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FaqSection
          eyebrow={copy.sections.faq.eyebrow}
          title={copy.sections.faq.title}
          description={copy.sections.faq.description}
          items={item.faqs}
        />

        {related.length > 0 ? (
          <section className="py-12 sm:py-14 lg:py-16" aria-label="Related Spark operational scenarios">
            <div className="mx-auto max-w-6xl">
              <SectionHeading
                eyebrow={copy.sections.related.eyebrow}
                title={copy.sections.related.title}
                description={copy.sections.related.description}
              />
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {related.map((candidate) => (
                  <ContentIndexCard
                    key={candidate.slug}
                    href={keywordDetailHref(productSlug, candidate.slug)}
                    title={candidate.title}
                    description={candidate.scenarioDescription.slice(0, 140) + "…"}
                    meta={[candidate.category, candidate.keyword]}
                    ctaLabel={copy.sections.related.ctaLabel}
                    titleLevel="h3"
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <FinalCtaSection
          title={copy.sections.finalCta.title}
          description={copy.sections.finalCta.description}
          primaryLabel={copy.sections.finalCta.primaryLabel}
          primaryHref={copy.sections.finalCta.primaryHref}
          secondaryLabel={copy.sections.finalCta.secondaryLabel}
          secondaryHref={INDEX_HREF}
        />
      </PageContainer>
    </main>
  );
}
