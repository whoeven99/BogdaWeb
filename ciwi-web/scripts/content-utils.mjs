import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export const locales = ["en", "zh-cn"];
export const contentRoot = path.join(process.cwd(), "content");

export function listMdxFiles(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const resolved = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return listMdxFiles(resolved);
    }

    return entry.name.endsWith(".mdx") ? [resolved] : [];
  });
}

export function readDocument(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const parsed = matter(source);

  return {
    filePath,
    data: parsed.data,
    content: parsed.content,
  };
}

export function writeDocument(filePath, data, content) {
  fs.mkdirSync(path.dirname(filePath), {recursive: true});
  fs.writeFileSync(filePath, matter.stringify(content, data));
}

export function resolveCollectionDirectory(collection, locale) {
  return path.join(contentRoot, collection, locale);
}

export function resolveDocPath(collection, locale, slug, category) {
  const baseDirectory = resolveCollectionDirectory(collection, locale);
  const categoryDirectory = category ? path.join(baseDirectory, category) : baseDirectory;

  return path.join(categoryDirectory, `${slug}.mdx`);
}

export function createEntryKey(collection, entryId) {
  return `${collection}:${entryId}`;
}

export function resolvePublicPath(assetPath) {
  const normalizedPath = assetPath.startsWith("/") ? assetPath.slice(1) : assetPath;
  return path.join(process.cwd(), "public", normalizedPath);
}
