import {cache} from "react";

import {z} from "zod";

import {getContentDirectory, listMdxFiles, readMdxDocument} from "@/lib/content/files";
import type {Locale} from "@/lib/i18n";

const basePath = "/help-center/ShopifyApp";

const relatedResourceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  href: z.string().min(1),
  meta: z.array(z.string()).default([]),
});

const helpCenterFrontmatterSchema = z.object({
  entryId: z.string().min(1),
  locale: z.union([z.literal("en"), z.literal("zh-cn")]),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  publishedAt: z.string().min(1).optional(),
  status: z.enum(["draft", "published"]),
  category: z.string().min(1),
  order: z.number().int().nonnegative(),
  meta: z.array(z.string()).default([]),
  readingTime: z.string().min(1),
  sourceLocale: z.union([z.literal("en"), z.literal("zh-cn")]).optional(),
  translationStatus: z.enum(["manual", "ai-draft", "reviewed"]).optional(),
  relatedResources: z.array(relatedResourceSchema).default([]),
});

type HelpCenterFrontmatter = z.infer<typeof helpCenterFrontmatterSchema>;

export type HelpCenterDoc = HelpCenterFrontmatter & {
  href: string;
  contentHtml: string;
};

function byOrderAscending(left: HelpCenterDoc, right: HelpCenterDoc) {
  return left.order - right.order;
}

const featuredHelpCenterDocSlugs = [
  "about-ciwi-ai-translator-shopify-app",
  "how-to-setup-and-use-glossary",
  "how-to-translate",
  "how-to-enable-the-language-currency-exchange-switcher",
  "what-are-the-differences-when-choosing-different-translation-models",
  "how-to-set-up-multi-currency-pricing-on-your-shopify-store",
] as const;

const loadHelpCenterDocs = cache((locale: Locale): HelpCenterDoc[] => {
  const directory = getContentDirectory("help-center", locale);

  return listMdxFiles(directory)
    .map((filePath) => {
      const {frontmatter, content} = readMdxDocument(filePath, helpCenterFrontmatterSchema);

      return {
        ...frontmatter,
        href: `${basePath}/${frontmatter.slug}/`,
        contentHtml: content,
      };
    })
    .filter((doc) => doc.locale === locale && doc.status === "published")
    .sort(byOrderAscending);
});

export const helpCenterDocs = loadHelpCenterDocs("en");
export const helpCenterDocMap = Object.fromEntries(helpCenterDocs.map((doc) => [doc.slug, doc]));

export function getHelpCenterDocs(locale: Locale) {
  return loadHelpCenterDocs(locale);
}

export function getHelpCenterDocMap(locale: Locale) {
  return Object.fromEntries(getHelpCenterDocs(locale).map((doc) => [doc.slug, doc]));
}

export const featuredHelpCenterDocs = featuredHelpCenterDocSlugs
  .map((slug) => helpCenterDocMap[slug])
  .filter((doc): doc is HelpCenterDoc => Boolean(doc));

export function getFeaturedHelpCenterDocs(locale: Locale) {
  const docMap = getHelpCenterDocMap(locale);

  return featuredHelpCenterDocSlugs
    .map((slug) => docMap[slug])
    .filter((doc): doc is HelpCenterDoc => Boolean(doc));
}
