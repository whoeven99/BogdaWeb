import {cache} from "react";

import {z} from "zod";

import {getContentDirectory, listMdxFiles, readMdxDocument} from "@/lib/content/files";
import type {Locale} from "@/lib/i18n";

const dateStringSchema = z.preprocess((value) => {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value;
}, z.string().min(1));

const blogPostFrontmatterSchema = z.object({
  entryId: z.string().min(1),
  locale: z.union([z.literal("en"), z.literal("zh-cn")]),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  publishedAt: dateStringSchema,
  status: z.enum(["draft", "published"]),
  readingTime: z.string().min(1),
  tags: z.array(z.string()).default([]),
  sourceLocale: z.union([z.literal("en"), z.literal("zh-cn")]).optional(),
  translationStatus: z.enum(["manual", "ai-draft", "reviewed"]).optional(),
});

type BlogPostFrontmatter = z.infer<typeof blogPostFrontmatterSchema>;

export type BlogPost = BlogPostFrontmatter & {
  href: string;
  content: string;
};

function byPublishedDateDescending(left: BlogPost, right: BlogPost) {
  return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
}

const loadBlogPosts = cache((locale: Locale): BlogPost[] => {
  const directory = getContentDirectory("blog", locale);

  return listMdxFiles(directory)
    .map((filePath) => {
      const {frontmatter, content} = readMdxDocument(filePath, blogPostFrontmatterSchema);

      return {
        ...frontmatter,
        content,
        href: `/blog/${frontmatter.slug}`,
      };
    })
    .filter((post) => post.locale === locale && post.status === "published")
    .sort(byPublishedDateDescending);
});

export function getBlogPosts(locale: Locale) {
  return loadBlogPosts(locale);
}

export function getAllBlogPosts() {
  return [...getBlogPosts("en"), ...getBlogPosts("zh-cn")];
}

export function getBlogPostMap(locale: Locale) {
  return Object.fromEntries(getBlogPosts(locale).map((post) => [post.slug, post]));
}
