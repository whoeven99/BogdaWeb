import {BlogFeed} from "@/components/sections/BlogFeed";
import {PageContainer} from "@/components/ui/PageContainer";
import {blogPosts} from "@/content/blog";
import {pagesCopy} from "@/content/pages-copy";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: pagesCopy.blog.metadata.title,
  description: pagesCopy.blog.metadata.description,
  path: pagesCopy.blog.metadata.path,
});

export default function BlogPage() {
  const copy = pagesCopy.blog;

  return (
    <main className="blog-page blog-page--medium">
      <PageContainer>
        <BlogFeed posts={blogPosts} title={copy.hero.title} description={copy.hero.description} />
      </PageContainer>
    </main>
  );
}
