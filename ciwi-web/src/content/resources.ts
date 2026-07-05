import {blogPosts} from "@/content/blog";
import {compares} from "@/content/compare";
import {featuredHelpCenterDocs, helpCenterDocs} from "@/content/help-center";

export type ResourceItem = {
  title: string;
  description: string;
  href: string;
  meta: string[];
};

export const blogResources: ResourceItem[] = blogPosts.map((post) => ({
  title: post.title,
  description: post.description,
  href: post.href,
  meta: ["Blog", post.publishedAt],
}));

export const helpCenterResources: ResourceItem[] = helpCenterDocs;

export const featuredHelpCenterResources: ResourceItem[] = featuredHelpCenterDocs;

export const compareResources: ResourceItem[] = compares.map((item) => ({
  title: item.title,
  description: item.description,
  href: `/compare/${item.slug}`,
  meta: ["Compare", "Selection"],
}));
