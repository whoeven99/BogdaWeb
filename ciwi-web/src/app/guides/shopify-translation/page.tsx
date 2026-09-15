import {ArticleCard} from "@/components/cards/ArticleCard";
import {ContentIndexHero} from "@/components/sections/ContentIndexHero";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getFunctionScenarioGuides} from "@/content/function-scenario-guides";
import {getUiCopy} from "@/content/ui-copy";
import type {Locale} from "@/lib/i18n";
import {localizeHref} from "@/lib/i18n";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema} from "@/lib/seo/schema";

type StructureGroup = {
  id: string;
  topics: string[];
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  blindspot: Record<Locale, string>;
};

const STRUCTURE_GROUPS: StructureGroup[] = [
  {
    id: "checkout-conversion",
    topics: ["Checkout", "Cart & Mini-Cart", "Currency & Pricing", "Discount Codes & Promotions", "Invoices & Order Documents"],
    name: {en: "Checkout & conversion", "zh-cn": "结账与转化"},
    description: {
      en: "The surfaces where translation directly decides whether a sale completes.",
      "zh-cn": "翻译质量直接决定订单能否完成的关键区域。",
    },
    blindspot: {
      en: "App- and theme-generated text inside the funnel — payment labels, mini-cart strings, invoice lines — is the easiest to miss and the last thing a shopper sees before converting.",
      "zh-cn": "漏斗内 app 与主题动态生成的文字——付款方式标签、mini-cart、发票行——最容易漏，也恰恰是用户下单前最后看到的。",
    },
  },
  {
    id: "catalog-content",
    topics: ["Collections", "Product Images & Alt Text", "Pages (About, FAQ, Policies)", "Blog Posts", "FAQ Sections", "Metafields & Metaobjects"],
    name: {en: "Catalog & content", "zh-cn": "商品与内容"},
    description: {
      en: "Products, collections, and the browsing content shoppers read before buying.",
      "zh-cn": "用户在购买前浏览的商品、集合与内容。",
    },
    blindspot: {
      en: "The invisible fields — image alt text, URL handles, FAQ questions, SEO metadata — are skipped most often, and they carry most of the ranking value.",
      "zh-cn": "看不见的字段——图片 alt、URL handle、FAQ 问题项、SEO metadata——最常被跳过，却承载了大部分排名价值。",
    },
  },
  {
    id: "technical-seo",
    topics: ["Meta Titles & Descriptions", "URLs & Slugs", "Structured Data (Schema)", "Sitemap", "Tags"],
    name: {en: "Technical SEO", "zh-cn": "技术 SEO"},
    description: {
      en: "Metadata and structure that decide whether localized pages get found at all.",
      "zh-cn": "决定本地化页面能否被搜索发现的技术结构。",
    },
    blindspot: {
      en: "Metadata and structured data stay in the source language even when body copy is translated, so search snippets show the wrong language and local clicks collapse.",
      "zh-cn": "正文翻了，meta 标题与 schema 却还是源语言，搜索结果里显示错语言，本地点击率直接崩。",
    },
  },
  {
    id: "navigation-experience",
    topics: ["Menus & Navigation", "Search & Filters", "Forms", "Store Locator & Locations"],
    name: {en: "Navigation & experience", "zh-cn": "导航与体验"},
    description: {
      en: "Menus, search, and forms that keep shoppers moving through the store.",
      "zh-cn": "让用户顺畅浏览店铺的导航、搜索与表单。",
    },
    blindspot: {
      en: "Text hidden inside interactions — footer and mobile menus, form validation messages, dropdown options — breaks the store the moment a shopper scrolls or fills a form.",
      "zh-cn": "藏在交互里的文字——footer/mobile 菜单、表单校验提示、下拉选项——用户一滚动或填表就露馅。",
    },
  },
  {
    id: "trust-support",
    topics: ["Legal & Policy Pages", "Customer Accounts & Login", "Customer Support Content", "Loyalty & Membership Pages", "Review Apps Content"],
    name: {en: "Trust & support", "zh-cn": "信任与支持"},
    description: {
      en: "Policy, account, and support content that builds confidence and removes friction.",
      "zh-cn": "建立信任、减少摩擦的政策、账户与支持内容。",
    },
    blindspot: {
      en: "Consent banners, cookie text, and error messages are skipped most often, and machine-translated policy copy can be non-compliant exactly where reassurance matters most.",
      "zh-cn": "consent banner、cookie 提示与错误信息最常被跳过，而机器翻译的政策文案在用户最需要信任的地方反而不合规。",
    },
  },
  {
    id: "operations-scale",
    topics: ["Markets", "Email Notifications", "Gift Cards", "Subscription Management Pages", "POS (Point of Sale)", "Wholesale / B2B Catalogs"],
    name: {en: "Operations & scale", "zh-cn": "运营与扩展"},
    description: {
      en: "Markets, emails, subscriptions, and B2B flows that keep localization running long-term.",
      "zh-cn": "让本地化长期运转的 Markets、邮件、订阅与 B2B 流程。",
    },
    blindspot: {
      en: "Email notifications and Markets content break after launch — a market created without content, or Liquid variables broken while editing emails, leaves paying customers with the wrong language.",
      "zh-cn": "邮件通知与 Markets 内容最容易在上线后出问题——建了 market 却空着内容、编辑邮件时破坏 Liquid 变量，让已下单用户收到错语言。",
    },
  },
];

function buildStructureGroups(locale: Locale) {
  const guides = getFunctionScenarioGuides(locale);

  return STRUCTURE_GROUPS.map((group) => ({
    id: group.id,
    name: group.name[locale],
    description: group.description[locale],
    blindspot: group.blindspot[locale],
    items: group.topics.flatMap((topic) => guides.filter((guide) => guide.topic === topic)),
  }));
}

export async function generateMetadata() {
  const locale = await getRequestLocale();

  return buildPageMetadata({
    title: locale === "zh-cn" ? "Shopify 翻译：完整翻译地图" : "Shopify Translation: The Complete Map of What to Translate",
    description:
      locale === "zh-cn"
        ? "一份结构化的 Shopify 翻译地图，覆盖结账、商品、SEO、导航、支持等 31 个需要翻译的页面结构，按对营收、SEO 和信任的影响分组。"
        : "A structured map of every Shopify surface that needs translation — checkout, products, SEO metadata, navigation, support, and more — grouped by how each affects revenue, SEO, and trust.",
    path: "/guides/shopify-translation",
    locale,
  });
}

export default async function ShopifyTranslationMapPage() {
  const locale = await getRequestLocale();
  const uiCopy = getUiCopy(locale);
  const groups = buildStructureGroups(locale);

  const copy =
    locale === "zh-cn"
      ? {
          structuredData: {
            name: "Shopify 翻译结构地图",
            description: "覆盖 Shopify 店铺 31 个可翻译结构的分组地图，按结账转化、商品内容、技术 SEO、导航体验、信任支持和运营扩展组织。",
            keywords: ["shopify translation", "shopify 翻译", "shopify 本地化", "翻译地图"],
          },
          hero: {
            eyebrow: "Shopify Translation",
            title: "你的 Shopify 店铺，到底有多少东西需要翻译？",
            description: "比你想的多得多。这张地图把 31 个可翻译结构按「营收、SEO、信任」的影响分组，让你知道该先翻什么、什么最容易漏掉。",
          },
          blindspotLabel: "最容易漏",
          cta: {
            eyebrow: "下一步",
            title: "翻译每一个结构，而不只是商品页",
            description: "结账、metafields、邮件、结构化数据——这些最容易被忽略的结构，往往最影响转化和搜索。",
          },
        }
      : {
          structuredData: {
            name: "Shopify Translation Structure Map",
            description: "A grouped map of the 31 translatable surfaces in a Shopify store, organized by checkout conversion, catalog content, technical SEO, navigation experience, trust and support, and operations.",
            keywords: ["shopify translation", "shopify localization", "translate shopify store", "shopify multilingual"],
          },
          hero: {
            eyebrow: "Shopify Translation",
            title: "Everything your Shopify store needs to translate",
            description: "Your store has more translatable surfaces than you think. This map groups all 31 of them by how they affect revenue, SEO, and trust — so you know what to translate first and what's easy to miss.",
          },
          blindspotLabel: "Most commonly missed",
          cta: {
            eyebrow: "Next step",
            title: "Translate every surface, not just product pages",
            description: "Checkout, metafields, emails, structured data — the surfaces most people miss are often the ones that matter most for conversion and search.",
          },
        };

  const pageUrl = new URL(localizeHref(locale, "/guides/shopify-translation"), siteUrl).toString();
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: locale === "zh-cn" ? "指南" : "Guides", item: new URL(localizeHref(locale, "/guides"), siteUrl).toString()},
      {name: copy.structuredData.name, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: copy.structuredData.name,
      description: copy.structuredData.description,
      keywords: copy.structuredData.keywords,
      type: "CollectionPage",
    }),
  ];

  return (
    <main className="guides-hub-page">
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`shopify-translation-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}

        <section className="page-section page-hero">
          <ContentIndexHero eyebrow={copy.hero.eyebrow} title={copy.hero.title} description={copy.hero.description}>
            <div className="guide-meta-grid guide-meta-grid--two-up">
              <div className="guide-meta-card guide-meta-card--plain">
                <span>{locale === "zh-cn" ? "可翻译结构" : "Translatable surfaces"}</span>
                <strong>
                  {groups.reduce((total, group) => total + group.items.length, 0)}{" "}
                  {locale === "zh-cn" ? "个" : ""}
                </strong>
              </div>
              <div className="guide-meta-card guide-meta-card--plain">
                <span>{locale === "zh-cn" ? "分组" : "Groups"}</span>
                <strong>{groups.length}</strong>
              </div>
            </div>
          </ContentIndexHero>
        </section>

        {groups.map((group, groupIndex) => (
          <section key={group.id} className="page-section">
            <SectionHeading
              eyebrow={`${String(groupIndex + 1).padStart(2, "0")} / ${locale === "zh-cn" ? "翻译优先级" : "translation priority"}`}
              title={group.name}
              description={group.description}
            />
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4">
              <p className="text-sm leading-7 text-slate-700">
                <span className="font-semibold text-slate-900">{copy.blindspotLabel}</span>
                <span className="mx-2 text-slate-300">·</span>
                {group.blindspot}
              </p>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {group.items.map((guide) => (
                <ArticleCard
                  key={guide.href}
                  title={guide.title}
                  description={guide.description}
                  href={guide.href}
                  meta={[String(guide.year)]}
                />
              ))}
            </div>
          </section>
        ))}

        <FinalCtaSection
          eyebrow={copy.cta.eyebrow}
          title={copy.cta.title}
          description={copy.cta.description}
          primaryLabel={uiCopy.cta.installLabel}
          primaryHref={uiCopy.cta.installHref}
          secondaryLabel={uiCopy.cta.talkLabel}
          secondaryHref={uiCopy.cta.talkHref}
          panelClassName="guide-final-cta"
          actionsClassName="guide-hero__actions"
        />
      </PageContainer>
    </main>
  );
}
