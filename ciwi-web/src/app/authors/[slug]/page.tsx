import {notFound} from "next/navigation";
import Image from "next/image";

import {ResourceCollectionSection} from "@/components/sections/ResourceCollectionSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {authors, getAuthorById, getAuthorBySlug} from "@/content/authors";
import {getBlogPosts} from "@/content/blog";
import {getFunctionScenarioGuides} from "@/content/function-scenario-guides";
import {getLocalizationGuides} from "@/content/localization-guides";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl, toAbsoluteLocalizedUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema, buildGraphSchema} from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

type AuthorPageProps = {
  params: Promise<{slug: string}>;
};

type GuideTopic = "planning" | "execution" | "limits";

const guideTopicOrder: GuideTopic[] = ["planning", "execution", "limits"];

// 按任务阶段分组，而不是按行业标签：同一行业的指南常常只出现一次，
// 按行业分会裂成一堆单篇。这里只切分已有的署名文章，不新增任何背景或案例。
function classifyGuideTopic(href: string): GuideTopic {
  if (href.includes("translate-and-adapt")) {
    return "limits";
  }

  if (href.includes("/how-to-translate-")) {
    return "execution";
  }

  return "planning";
}

export function generateStaticParams() {
  return authors.map((author) => ({slug: author.id}));
}

export async function generateMetadata({params}: AuthorPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const author = getAuthorById(slug);

  if (!author) {
    return buildPageMetadata({
      title: locale === "zh-cn" ? "作者不存在" : "Author not found",
      description: locale === "zh-cn" ? "你访问的作者不存在。" : "The requested author could not be found.",
      path: "/authors",
      locale,
    });
  }

  return buildPageMetadata({
    title: `${author.name} — ${author.role[locale]}`,
    description: author.bio[locale],
    path: `/authors/${author.id}`,
    locale,
  });
}

export default async function AuthorDetailPage({params}: AuthorPageProps) {
  const locale = await getRequestLocale();
  const {slug} = await params;
  const author = getAuthorById(slug);

  if (!author) {
    notFound();
  }

  const localizationGuides = getLocalizationGuides(locale).filter((guide) => getAuthorBySlug(guide.href).id === author.id);
  const functionScenarioGuides = getFunctionScenarioGuides(locale).filter((guide) => getAuthorBySlug(guide.href).id === author.id);
  const posts = getBlogPosts(locale).filter((post) => getAuthorBySlug(post.href).id === author.id);

  const allGuides = [...localizationGuides, ...functionScenarioGuides];
  const totalCount = allGuides.length + posts.length;

  const copy =
    locale === "zh-cn"
      ? {
          structuredData: {
            name: author.name,
            description: author.bio["zh-cn"],
          },
          hero: {
            eyebrow: "作者",
            contentCount: `${totalCount} 篇文章`,
            scopeNote: `已署名 ${allGuides.length} 篇指南、${posts.length} 篇博客，按主题分组如下。`,
          },
          guideGroups: {
            planning: {
              eyebrow: "规划",
              title: "市场与品类怎么选",
              description: "先定目标市场、判断品类是否适合本地化，再决定第一批要翻的内容。",
            },
            execution: {
              eyebrow: "执行",
              title: "具体模块怎么翻",
              description: "法律政策、POS、评价与忠诚度应用这些模块，各自有对应的处理方式。",
            },
            limits: {
              eyebrow: "平台边界",
              title: "Translate & Adapt 能覆盖到哪",
              description: "语言上限与覆盖范围决定了哪些内容靠应用就能解决，哪些需要另想办法。",
            },
          },
          blogSection: {
            eyebrow: "博客",
            title: "博客文章",
          },
          emptyState: {
            title: "该作者的内容正在整理中",
            description: "后续会持续补充该作者撰写的更多内容。",
          },
        }
      : {
          structuredData: {
            name: author.name,
            description: author.bio.en,
          },
          hero: {
            eyebrow: "Author",
            contentCount: `${totalCount} articles`,
            scopeNote: `${allGuides.length} guides and ${posts.length} blog posts are published under this byline, grouped by topic below.`,
          },
          guideGroups: {
            planning: {
              eyebrow: "Planning",
              title: "Choosing markets and categories",
              description: "Pick the target market and judge whether the category localizes well before deciding what to translate first.",
            },
            execution: {
              eyebrow: "Execution",
              title: "Translating specific storefront modules",
              description: "Legal policy pages, POS, reviews and loyalty apps each need their own handling rather than one blanket pass.",
            },
            limits: {
              eyebrow: "Platform limits",
              title: "What Translate & Adapt actually covers",
              description: "Language caps and coverage decide what the free app solves on its own and what needs another route.",
            },
          },
          blogSection: {
            eyebrow: "Blog",
            title: "Blog posts",
          },
          emptyState: {
            title: "This author's content is being organized",
            description: "More content by this author will be added over time.",
          },
        };

  const groupedGuides = guideTopicOrder
    .map((topic) => ({
      topic,
      copy: copy.guideGroups[topic],
      guides: allGuides.filter((guide) => classifyGuideTopic(guide.href) === topic),
    }))
    .filter((group) => group.guides.length > 0);

  const pageUrl = toAbsoluteLocalizedUrl(locale, `/authors/${author.id}`);
  const structuredData = buildGraphSchema([
    buildBreadcrumbSchema([
      {name: locale === "zh-cn" ? "首页" : "Home", item: siteUrl},
      {name: copy.structuredData.name, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: copy.structuredData.name,
      description: copy.structuredData.description,
      type: "CollectionPage",
    }),
  ]);

  return (
    <main className="author-page">
      <PageContainer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />

        <section className="page-section page-hero">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{copy.hero.eyebrow}</div>
          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Image src={author.avatar} alt={author.name} width={72} height={72} className="h-[72px] w-[72px] shrink-0 rounded-full object-cover" />
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">{author.name}</h1>
              <div className="mt-2 text-sm font-medium text-slate-600">{author.role[locale]}</div>
              <p className="mt-2 max-w-2xl text-[15px] leading-7 text-slate-600">{author.bio[locale]}</p>
              <div className="mt-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-400">{copy.hero.contentCount}</div>
              <p className="mt-2 max-w-2xl text-[13px] leading-6 text-slate-500">{copy.hero.scopeNote}</p>
            </div>
          </div>
        </section>

        {totalCount > 0 ? (
          <>
            {groupedGuides.map((group) => (
              <ResourceCollectionSection
                key={group.topic}
                eyebrow={group.copy.eyebrow}
                title={group.copy.title}
                description={group.copy.description}
                items={group.guides.map((guide) => ({
                  title: guide.title,
                  description: guide.description,
                  href: guide.href,
                  meta: [guide.segmentLabel, guide.guideLabel, String(guide.year)],
                }))}
                className="page-section"
              />
            ))}

            {posts.length > 0 ? (
              <ResourceCollectionSection
                eyebrow={copy.blogSection.eyebrow}
                title={copy.blogSection.title}
                items={posts.map((post) => ({
                  title: post.title,
                  description: post.description,
                  href: post.href,
                  meta: [post.publishedAt, post.readingTime],
                }))}
                className="page-section"
              />
            ) : null}
          </>
        ) : (
          <section className="page-section">
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50/80 px-6 py-8">
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">{copy.emptyState.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{copy.emptyState.description}</p>
            </div>
          </section>
        )}
      </PageContainer>
    </main>
  );
}
