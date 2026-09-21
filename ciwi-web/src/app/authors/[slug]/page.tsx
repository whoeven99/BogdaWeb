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

function buildAuthorNarrative({
  locale,
  authorName,
  role,
  totalCount,
  guidesCount,
  postsCount,
}: {
  locale: "en" | "zh-cn";
  authorName: string;
  role: string;
  totalCount: number;
  guidesCount: number;
  postsCount: number;
}) {
  if (locale === "zh-cn") {
    return [
      `${authorName} 当前以 ${role} 的身份参与 Ciwi 内容体系，页面聚合了该作者公开署名的 ${totalCount} 篇内容，方便从作者视角连续阅读相关主题。`,
      `其中包括 ${guidesCount} 篇指南类内容和 ${postsCount} 篇博客内容。相比单篇文章页，这里更适合作为作者专题入口，快速理解该作者更常覆盖的问题范围和写作方向。`,
    ];
  }

  return [
    `${authorName} contributes to the Ciwi content system as ${role}, and this page aggregates ${totalCount} published items under that byline so readers can move through related topics from one author perspective.`,
    `That includes ${guidesCount} guide-type entries and ${postsCount} blog posts. Compared with a single article page, this author page works better as an editorial entry point for understanding what this author tends to cover.`,
  ];
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
  const narrative = buildAuthorNarrative({
    locale,
    authorName: author.name,
    role: author.role[locale],
    totalCount,
    guidesCount: allGuides.length,
    postsCount: posts.length,
  });

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
          },
          guidesSection: {
            eyebrow: "指南",
            title: "本地化与翻译指南",
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
          },
          guidesSection: {
            eyebrow: "Guides",
            title: "Localization & translation guides",
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
            </div>
          </div>
          <div className="mt-6 max-w-4xl rounded-[24px] border border-slate-200/80 bg-white/90 p-5 sm:p-6">
            <div className="space-y-4 text-[15px] leading-7 text-slate-600 sm:text-base">
              {narrative.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {totalCount > 0 ? (
          <>
            {allGuides.length > 0 ? (
              <ResourceCollectionSection
                eyebrow={copy.guidesSection.eyebrow}
                title={copy.guidesSection.title}
                items={allGuides.map((guide) => ({
                  title: guide.title,
                  description: guide.description,
                  href: guide.href,
                  meta: [guide.segmentLabel, guide.guideLabel, String(guide.year)],
                }))}
                className="page-section"
              />
            ) : null}

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
