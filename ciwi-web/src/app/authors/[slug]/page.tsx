import {notFound} from "next/navigation";
import Image from "next/image";

import {ResourceCollectionSection} from "@/components/sections/ResourceCollectionSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {authors, getAuthorById, getAuthorBySlug} from "@/content/authors";
import {getBlogPosts} from "@/content/blog";
import {getFunctionScenarioGuides} from "@/content/function-scenario-guides";
import {getLocalizationGuides} from "@/content/localization-guides";
import {localizeHref} from "@/lib/i18n";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildWebPageSchema} from "@/lib/seo/schema";

type AuthorPageProps = {
  params: Promise<{slug: string}>;
};

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

  const pageUrl = new URL(localizeHref(locale, `/authors/${author.id}`), siteUrl).toString();
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: copy.structuredData.name, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: copy.structuredData.name,
      description: copy.structuredData.description,
      type: "CollectionPage",
    }),
  ];

  return (
    <main className="author-page">
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`author-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}

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
