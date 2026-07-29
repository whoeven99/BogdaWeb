import fs from "node:fs";
import path from "node:path";

import {readDocument, resolveDocPath, writeDocument} from "./content-utils.mjs";

function readArg(name) {
  const prefix = `--${name}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : null;
}

const collection = readArg("type");
const from = readArg("from");
const to = readArg("to");
const slug = readArg("slug");
const category = readArg("category");

if (!collection || !from || !to || !slug) {
  console.error("Usage: npm run content:translate -- --type=blog|help-center --from=en --to=zh-cn --slug=example [--category=shopify-app]");
  process.exit(1);
}

const sourcePath = resolveDocPath(collection, from, slug, category);

try {
  const {data, content} = readDocument(sourcePath);
  const targetPath = resolveDocPath(collection, to, data.slug, data.category ?? category);

  if (path.resolve(sourcePath) === path.resolve(targetPath)) {
    throw new Error("Source and target paths are identical.");
  }

  if (fs.existsSync(targetPath)) {
    throw new Error(`Target draft already exists: ${targetPath}`);
  }

  const nextData = {
    ...data,
    locale: to,
    sourceLocale: from,
    status: "draft",
    translationStatus: "ai-draft",
    title: `[TODO ${to}] ${data.title}`,
    description: `[TODO ${to}] ${data.description}`,
  };

  writeDocument(targetPath, nextData, content);

  console.log(`Created translation draft: ${targetPath}`);
  console.log("Note: this scaffolds a draft file only. Review title, description, body, and slug before publishing.");
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
