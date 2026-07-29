import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

import matter from "gray-matter";

const projectRoot = process.cwd();
const sourcePath = path.join(projectRoot, "src/content/help-center.ts");
const source = fs.readFileSync(sourcePath, "utf8");

function extractAssignment(name, nextName) {
  const pattern = nextName
    ? new RegExp(`const ${name}: HelpCenterDoc\\[\\] = (\\[[\\s\\S]*?\\]);\\n\\nconst ${nextName}`, "m")
    : new RegExp(`const ${name}: HelpCenterDoc\\[\\] = (\\[[\\s\\S]*?\\]);`, "m");
  const match = source.match(pattern);

  if (!match) {
    throw new Error(`Unable to extract ${name}`);
  }

  return match[1];
}

function evaluateArray(arraySource) {
  const context = {
    module: {exports: null},
  };

  vm.runInNewContext(
    `
      const basePath = "/help-center/ShopifyApp";
      module.exports = ${arraySource};
    `,
    context,
  );

  return context.module.exports;
}

function ensureDirectory(directory) {
  fs.mkdirSync(directory, {recursive: true});
}

function writeDoc(locale, index, doc) {
  const outputDirectory = path.join(projectRoot, "content", "help-center", locale, "shopify-app");
  const outputPath = path.join(outputDirectory, `${doc.slug}.mdx`);

  ensureDirectory(outputDirectory);

  const frontmatter = {
    entryId: `help-center-${doc.slug}`,
    locale,
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    publishedAt: "2025-07-31",
    status: "published",
    category: "shopify-app",
    order: index + 1,
    meta: doc.meta,
    readingTime: doc.readingTime,
    sourceHref: doc.sourceHref,
    sourceLocale: locale === "en" ? "en" : "en",
    translationStatus: locale === "en" ? "manual" : "reviewed",
    relatedResources: doc.relatedResources ?? [],
  };

  const fileContent = matter.stringify(`${doc.contentHtml.trim()}\n`, frontmatter);
  fs.writeFileSync(outputPath, fileContent);
}

const helpCenterDocsEn = evaluateArray(extractAssignment("helpCenterDocsEn", "helpCenterDocsZh"));
const helpCenterDocsZh = evaluateArray(extractAssignment("helpCenterDocsZh", "featuredHelpCenterDocSlugs"));

helpCenterDocsEn.forEach((doc, index) => writeDoc("en", index, doc));
helpCenterDocsZh.forEach((doc, index) => writeDoc("zh-cn", index, doc));

console.log(`Exported ${helpCenterDocsEn.length} EN docs and ${helpCenterDocsZh.length} ZH docs.`);
