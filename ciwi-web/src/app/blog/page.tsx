import {BlogFeed} from "@/components/sections/BlogFeed";
import {PageContainer} from "@/components/ui/PageContainer";
import {getBlogPosts} from "@/content/blog";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = await getRequestLocale();

  return buildPageMetadata({
    title: locale === "zh-cn" ? "博客" : "Blog",
    description:
      locale === "zh-cn"
        ? "Ciwi Blog，围绕 Shopify 多语言、本地化和增长问题持续输出内容。"
        : "Ciwi Blog shares practical thinking on Shopify localization, multilingual workflows, and growth.",
    path: "/blog",
    locale,
  });
}

export default async function BlogPage() {
  const locale = await getRequestLocale();
  const posts = getBlogPosts(locale);
  const copy =
    locale === "zh-cn"
      ? {
          title: "写给正在做 Shopify 增长的人",
          description: "从本地化到内容效率，这里专注回答真正会影响增长的问题。",
        }
      : {
          title: "Written for teams growing on Shopify",
          description: "From localization to content operations, this space stays focused on the problems that actually affect growth.",
        };

  return (
    <main className="blog-page blog-page--medium">
      <PageContainer>
        <BlogFeed posts={posts} title={copy.title} description={copy.description} />
      </PageContainer>
    </main>
  );
}
