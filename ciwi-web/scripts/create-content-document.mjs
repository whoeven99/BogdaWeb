import fs from "node:fs";

import {listMdxFiles, readDocument, resolveCollectionDirectory, resolveDocPath, writeDocument, locales} from "./content-utils.mjs";

const supportedCollections = new Set(["blog", "help-center"]);

function readArg(name) {
  const prefix = `--${name}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : null;
}

function titleizeSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseList(value) {
  return value
    ? value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function findExistingEntryIds(collection) {
  const entryIds = new Set();

  for (const locale of locales) {
    for (const filePath of listMdxFiles(resolveCollectionDirectory(collection, locale))) {
      const {data} = readDocument(filePath);

      if (typeof data.entryId === "string" && data.entryId) {
        entryIds.add(data.entryId);
      }
    }
  }

  return entryIds;
}

function getNextHelpCenterOrder(locale, category) {
  const existingDocs = listMdxFiles(resolveCollectionDirectory("help-center", locale))
    .map((filePath) => readDocument(filePath).data)
    .filter((doc) => doc.category === category && Number.isInteger(doc.order))
    .map((doc) => doc.order);

  return existingDocs.length ? Math.max(...existingDocs) + 1 : 1;
}

const collection = readArg("type");
const locale = readArg("locale");
const slug = readArg("slug");
const category = readArg("category");
const explicitTitle = readArg("title");
const explicitEntryId = readArg("entry-id");
const topic = readArg("topic");
const tags = parseList(readArg("tags"));

if (!collection || !locale || !slug) {
  console.error("Usage: npm run content:new -- --type=blog|help-center --locale=en|zh-cn --slug=example [--category=shopify-app] [--title=\"...\"] [--topic=\"...\"] [--tags=tag-a,tag-b]");
  process.exit(1);
}

if (!supportedCollections.has(collection)) {
  console.error(`Unsupported content type: ${collection}`);
  process.exit(1);
}

if (!locales.includes(locale)) {
  console.error(`Unsupported locale: ${locale}`);
  process.exit(1);
}

if (collection === "help-center" && !category) {
  console.error("Help center documents require --category=shopify-app");
  process.exit(1);
}

const title = explicitTitle ?? titleizeSlug(slug);
const entryId = explicitEntryId ?? `${collection}-${slug}`;
const targetPath = resolveDocPath(collection, locale, slug, category);

if (fs.existsSync(targetPath)) {
  console.error(`Target document already exists: ${targetPath}`);
  process.exit(1);
}

const existingEntryIds = findExistingEntryIds(collection);

if (existingEntryIds.has(entryId)) {
  console.error(`entryId already exists: ${entryId}`);
  process.exit(1);
}

const baseData = {
  entryId,
  locale,
  slug,
  title,
  description: locale === "zh-cn" ? "TODO: 补充摘要。" : "TODO: Add summary.",
  status: "draft",
  sourceLocale: locale,
  translationStatus: "manual",
};

const documentData =
  collection === "blog"
    ? {
        ...baseData,
        publishedAt: today(),
        readingTime: locale === "zh-cn" ? "5 分钟阅读" : "5 min read",
        tags: tags.length ? tags : [locale === "zh-cn" ? "TODO 标签" : "TODO Tag"],
      }
    : {
        ...baseData,
        publishedAt: today(),
        category,
        order: getNextHelpCenterOrder(locale, category),
        meta: ["Help Center", topic ?? (locale === "zh-cn" ? "TODO 主题" : "TODO Topic")],
        readingTime: locale === "zh-cn" ? "5 分钟阅读" : "5 min read",
        relatedResources: [],
      };

const initialContent =
  locale === "zh-cn"
    ? `<p>TODO：在这里开始撰写正文。</p>\n`
    : `<p>TODO: Start writing here.</p>\n`;

writeDocument(targetPath, documentData, initialContent);

console.log(`Created content draft: ${targetPath}`);
console.log(`entryId: ${entryId}`);
console.log("Next: update title, description, body, and metadata before publishing.");
