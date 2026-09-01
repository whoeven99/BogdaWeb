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
const guideSupportedTranslationStatuses = new Set(["manual", "ai-draft", "reviewed"]);
const guideCollections = [
  {
    key: "localization-guides",
    files: {
      en: path.resolve("src/content/data/localization_guides.json"),
      "zh-cn": path.resolve("src/content/data/localization_guides.zh-cn.json"),
    },
    requiredStringFields: ["slug", "href", "title", "description", "industry", "audience", "segmentLabel", "guideLabel", "mainValue"],
    requiredNumberFields: ["year"],
    requiredArrayFields: [
      "keywords",
      "overviewDrivers",
      "benefits",
      "mistakes",
      "impacts",
      "languages",
      "marketHabits",
      "translationScope",
      "expansionPlan",
      "bestPractices",
      "styleRules",
      "solutions",
      "features",
      "recommendations",
      "terminology",
      "checklist",
      "faq",
    ],
  },
  {
    key: "function-scenario-guides",
    files: {
      en: path.resolve("src/content/data/function_scenario_guides.json"),
      "zh-cn": path.resolve("src/content/data/function_scenario_guides.zh-cn.json"),
    },
    requiredStringFields: ["slug", "href", "title", "description", "industry", "audience", "segmentLabel", "guideLabel", "mainValue", "topic"],
    requiredNumberFields: ["year"],
    requiredArrayFields: [
      "keywords",
      "overviewDrivers",
      "solutions",
      "translationScope",
      "checklist",
      "mistakes",
      "features",
      "recommendations",
      "faq",
    ],
  },
];

const errors = [];
const warnings = [];
const translatedEntries = new Map();
const slugRegistry = new Map();
const guideEntries = new Map();

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

function readJsonFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    pushError(`${filePath}: failed to parse JSON - ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function collectGuideEntry(collectionKey, locale, filePath, item) {
  const entryKey = createEntryKey(collectionKey, item.slug);
  const current = guideEntries.get(entryKey) ?? {
    locales: new Map(),
    files: [],
  };

  if (current.locales.has(locale)) {
    pushError(`${filePath}: duplicate locale "${locale}" for guide slug "${item.slug}"`);
  }

  current.locales.set(locale, {
    filePath,
    status: item.status ?? "published",
    slug: item.slug,
  });
  current.files.push(filePath);
  guideEntries.set(entryKey, current);
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

for (const collection of guideCollections) {
  for (const locale of locales) {
    const filePath = collection.files[locale];

    if (!fs.existsSync(filePath)) {
      pushError(`${filePath}: guide locale file is missing`);
      continue;
    }

    const data = readJsonFile(filePath);

    if (!Array.isArray(data)) {
      if (data !== null) {
        pushError(`${filePath}: guide file must contain an array`);
      }
      continue;
    }

    const localeSlugRegistry = new Set();

    for (const [index, item] of data.entries()) {
      const itemLabel = `${filePath}[${index}]`;

      if (!item || typeof item !== "object" || Array.isArray(item)) {
        pushError(`${itemLabel}: guide entry must be an object`);
        continue;
      }

      for (const field of collection.requiredStringFields) {
        if (!isNonEmptyString(item[field])) {
          pushError(`${itemLabel}: missing required string field "${field}"`);
        }
      }

      for (const field of collection.requiredNumberFields) {
        if (typeof item[field] !== "number" || Number.isNaN(item[field])) {
          pushError(`${itemLabel}: missing required number field "${field}"`);
        }
      }

      for (const field of collection.requiredArrayFields) {
        if (!Array.isArray(item[field]) || item[field].length === 0) {
          pushError(`${itemLabel}: missing required array field "${field}"`);
        }
      }

      if (isNonEmptyString(item.slug)) {
        if (localeSlugRegistry.has(item.slug)) {
          pushError(`${itemLabel}: duplicate slug "${item.slug}" in locale "${locale}"`);
        } else {
          localeSlugRegistry.add(item.slug);
        }
      }

      if (isNonEmptyString(item.slug) && item.href !== `/guides/${item.slug}`) {
        pushError(`${itemLabel}: href "${item.href}" does not match slug "${item.slug}"`);
      }

      const status = item.status ?? "published";

      if (!supportedStatuses.has(status)) {
        pushError(`${itemLabel}: unsupported status "${status}"`);
      }

      if (item.translationStatus && !guideSupportedTranslationStatuses.has(item.translationStatus)) {
        pushError(`${itemLabel}: unsupported translationStatus "${item.translationStatus}"`);
      }

      if (locale !== "en" && status === "draft" && !isNonEmptyString(item.sourceLocale)) {
        pushWarning(`${itemLabel}: translated draft is missing sourceLocale`);
      }

      if (status === "published") {
        if (typeof item.title === "string" && item.title.includes("[TODO")) {
          pushError(`${itemLabel}: published guide title still contains TODO placeholder`);
        }

        if (typeof item.description === "string" && item.description.includes("[TODO")) {
          pushError(`${itemLabel}: published guide description still contains TODO placeholder`);
        }

        if (item.translationStatus === "ai-draft") {
          pushError(`${itemLabel}: published guide cannot keep translationStatus "ai-draft"`);
        }
      }

      if (isNonEmptyString(item.slug)) {
        collectGuideEntry(collection.key, locale, filePath, item);
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

for (const [entryKey, record] of guideEntries.entries()) {
  for (const locale of locales) {
    if (!record.locales.has(locale)) {
      pushWarning(`${record.files[0]}: guide "${entryKey}" is missing locale "${locale}"`);
    }
  }

  const publishedLocales = [...record.locales.entries()]
    .filter(([, value]) => value.status === "published")
    .map(([locale]) => locale);

  if (publishedLocales.length === 1 && record.locales.size < locales.length) {
    pushWarning(`${record.files[0]}: guide "${entryKey}" is published only in locale "${publishedLocales[0]}"`);
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
