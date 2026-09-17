import {ContentIndexHero} from "@/components/sections/ContentIndexHero";
import {PageContainer} from "@/components/ui/PageContainer";
import {promptGroups, promptModels, translationPrompts} from "@/content/translation-prompts";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema, buildGraphSchema} from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getRequestLocale();

  return buildPageMetadata({
    title: locale === "zh-cn" ? "Shopify 翻译提示词库" : "Shopify Translation Prompts",
    description:
      locale === "zh-cn"
        ? "按 AI 模型（ChatGPT、Claude、DeepL）和 Shopify 结构分类的可复制翻译提示词库，覆盖结账、商品、SEO、导航、支持等场景。"
        : "A reusable library of Shopify translation prompts, organized by AI model (ChatGPT, Claude, DeepL) and store surface — checkout, products, SEO, navigation, support, and more.",
    path: "/guides/shopify-translation/prompts",
    locale,
  });
}

function findPrompt(model: string, groupId: string) {
  return translationPrompts.find((prompt) => prompt.model === model && prompt.groupId === groupId);
}

export default async function ShopifyTranslationPromptsPage() {
  const locale = await getRequestLocale();

  const copy =
    locale === "zh-cn"
      ? {
          structuredData: {
            name: "Shopify 翻译提示词库",
            description: "按 AI 模型和 Shopify 结构分类的可复制翻译提示词库。",
            keywords: ["shopify translation prompt", "shopify 翻译提示词", "chatgpt prompt", "claude prompt"],
          },
          hero: {
            eyebrow: "Translation Prompts",
            title: "直接可用的 Shopify 翻译提示词",
            description: "按 AI 模型和店铺结构分类的提示词库。每个提示词都标注适用场景，复制即可用。",
          },
          modelSection: {
            promptLabel: "提示词",
            scenarioLabel: "适用场景",
          },
          emptyState: {
            title: "提示词正在建设中",
            description: "提示词正在整理中，后续会持续补充更多场景。",
          },
        }
      : {
          structuredData: {
            name: "Shopify Translation Prompts",
            description: "A reusable library of Shopify translation prompts, organized by AI model and store surface.",
            keywords: ["shopify translation prompt", "chatgpt prompt", "claude prompt", "deepl prompt"],
          },
          hero: {
            eyebrow: "Translation Prompts",
            title: "Copy-paste Shopify translation prompts",
            description: "A prompt library organized by AI model and store surface. Each prompt states its scenario and is ready to copy.",
          },
          modelSection: {
            promptLabel: "Prompt",
            scenarioLabel: "Scenario",
          },
          emptyState: {
            title: "Prompts are being built",
            description: "More prompts are being added across additional scenarios.",
          },
        };

  const pageUrl = toAbsoluteLocalizedUrl(locale, "/guides/shopify-translation/prompts");
  const structuredData = buildGraphSchema([
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "指南" : "Guides", item: toAbsoluteLocalizedUrl(locale, "/guides")},
      {name: locale === "zh-cn" ? "翻译地图" : "Translation map", item: toAbsoluteLocalizedUrl(locale, "/guides/shopify-translation")},
      {name: copy.structuredData.name, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: copy.structuredData.name,
      description: copy.structuredData.description,
      keywords: copy.structuredData.keywords,
      type: "CollectionPage",
    }),
  ]);

  const hasPrompts = translationPrompts.length > 0;

  return (
    <main className="guides-hub-page">
      <PageContainer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />

        <section className="page-section page-hero">
          <ContentIndexHero eyebrow={copy.hero.eyebrow} title={copy.hero.title} description={copy.hero.description} />
        </section>

        {hasPrompts ? (
          promptModels.map((model) => (
            <section key={model.id} className="page-section">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-3xl">{model.name}</h2>
                <p className="mt-2 text-[15px] leading-7 text-slate-600">{model.tagline[locale]}</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {promptGroups.map((group) => {
                  const prompt = findPrompt(model.id, group.id);

                  return prompt ? (
                    <article key={group.id} className="rounded-[24px] bg-white p-7 shadow-[0_18px_48px_-28px_rgba(15,23,42,0.16)]">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{group.name[locale]}</div>
                      <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.02em] text-slate-950">{prompt.scenario[locale]}</h3>
                      {prompt.prompt ? (
                        <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700">{prompt.prompt[locale]}</pre>
                      ) : null}
                    </article>
                  ) : null;
                })}
              </div>
            </section>
          ))
        ) : (
          <section className="page-section">
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50/80 px-6 py-10">
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">{copy.emptyState.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{copy.emptyState.description}</p>
            </div>
          </section>
        )}
      </PageContainer>
    </main>
  );
}
