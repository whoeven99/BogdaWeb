import fs from "node:fs";
import path from "node:path";

import {
  contentRoot,
  createEntryKey,
  listMdxFiles,
  locales,
  readDocument,
  resolvePublicPath,
} from "./content-utils.mjs";

const collections = ["blog", "help-center"];
const requiredFields = ["entryId", "locale", "slug", "title", "description", "status"];
const supportedStatuses = new Set(["published", "draft"]);

const errors = [];
const warnings = [];
const translatedEntries = new Map();
const slugRegistry = new Map();

function pushError(message) {
  errors.push(message);
}

function pushWarning(message) {
  warnings.push(message);
}

function collectLocalAssetPaths(content) {
  const assetPaths = new Set();
  const patterns = [
    /<ContentImage[\s\S]*?\bsrc=["'](\/[^"']+)["']/g,
    /!\[[^\]]*\]\((\/[^)\s]+)(?:\s+"[^"]*")?\)/g,
    /<img[\s\S]*?\bsrc=["'](\/[^"']+)["']/g,
  ];

  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) {
      if (match[1]) {
        assetPaths.add(match[1]);
      }
    }
  }

  return [...assetPaths];
}

function validateLocalAssets(filePath, content) {
  for (const assetPath of collectLocalAssetPaths(content)) {
    if (assetPath.startsWith("http://") || assetPath.startsWith("https://")) {
      continue;
    }

    const resolvedAssetPath = resolvePublicPath(assetPath);

    if (!fs.existsSync(resolvedAssetPath)) {
      pushError(`${filePath}: referenced local asset does not exist at "${assetPath}"`);
    }
  }
}

for (const collection of collections) {
  for (const locale of locales) {
    const directory = path.join(contentRoot, collection, locale);

    for (const filePath of listMdxFiles(directory)) {
      const {data, content} = readDocument(filePath);

      for (const field of requiredFields) {
        if (!data[field]) {
          pushError(`${filePath}: missing required field "${field}"`);
        }
      }

      if (data.locale && data.locale !== locale) {
        pushError(`${filePath}: locale field "${data.locale}" does not match directory locale "${locale}"`);
      }

      if (data.status && !supportedStatuses.has(data.status)) {
        pushError(`${filePath}: unsupported status "${data.status}"`);
      }

      if (!content.trim()) {
        pushError(`${filePath}: empty content body`);
      }

      if (data.slug) {
        const slugKey = `${collection}:${locale}:${data.slug}`;
        const previousFile = slugRegistry.get(slugKey);

        if (previousFile) {
          pushError(`${filePath}: duplicate slug "${data.slug}" already used by ${previousFile}`);
        } else {
          slugRegistry.set(slugKey, filePath);
        }
      }

      validateLocalAssets(filePath, content);

      if (data.entryId) {
        const key = createEntryKey(collection, data.entryId);
        const current = translatedEntries.get(key) ?? {
          locales: new Map(),
          files: [],
        };

        if (current.locales.has(locale)) {
          pushError(`${filePath}: duplicate locale "${locale}" for entryId "${data.entryId}"`);
        }

        current.locales.set(locale, {
          filePath,
          status: data.status,
          slug: data.slug,
        });
        current.files.push(filePath);
        translatedEntries.set(key, current);
      }
    }
  }
}

for (const [entryKey, record] of translatedEntries.entries()) {
  const localeCount = record.locales.size;

  if (localeCount === 1) {
    const onlyLocale = [...record.locales.keys()][0];
    pushWarning(`${record.files[0]}: entry "${entryKey}" currently exists only in locale "${onlyLocale}"`);
    continue;
  }

  for (const locale of locales) {
    if (!record.locales.has(locale)) {
      pushWarning(`${record.files[0]}: entry "${entryKey}" is missing locale "${locale}"`);
    }
  }

  const publishedLocales = [...record.locales.entries()]
    .filter(([, value]) => value.status === "published")
    .map(([locale]) => locale);

  if (publishedLocales.length === 1) {
    pushWarning(`${record.files[0]}: entry "${entryKey}" is published only in locale "${publishedLocales[0]}"`);
  }
}

if (warnings.length) {
  console.warn("Content validation warnings:\n");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
  console.warn("");
}

if (errors.length) {
  console.error("Content validation failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Content validation passed.");
