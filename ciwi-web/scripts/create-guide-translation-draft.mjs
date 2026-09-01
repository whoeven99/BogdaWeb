import fs from "node:fs";
import path from "node:path";

function readArg(name) {
  const prefix = `--${name}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : null;
}

const collection = readArg("type");
const from = readArg("from");
const to = readArg("to");
const slug = readArg("slug");

const collectionFileMap = {
  localization: {
    en: "src/content/data/localization_guides.json",
    "zh-cn": "src/content/data/localization_guides.zh-cn.json",
  },
  "function-scenario": {
    en: "src/content/data/function_scenario_guides.json",
    "zh-cn": "src/content/data/function_scenario_guides.zh-cn.json",
  },
};

if (!collection || !from || !to || !(collection in collectionFileMap)) {
  console.error("Usage: npm run guides:translate -- --type=localization|function-scenario --from=en --to=zh-cn [--slug=example]");
  process.exit(1);
}

if (!(from in collectionFileMap[collection]) || !(to in collectionFileMap[collection])) {
  console.error(`Unsupported locale pair for ${collection}: ${from} -> ${to}`);
  process.exit(1);
}

const sourcePath = path.resolve(collectionFileMap[collection][from]);
const targetPath = path.resolve(collectionFileMap[collection][to]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

const sourceItems = readJson(sourcePath);
const targetItems = fs.existsSync(targetPath) ? readJson(targetPath) : [];
const targetSlugs = new Set(targetItems.map((item) => item.slug));

const sourceSelection = slug ? sourceItems.filter((item) => item.slug === slug) : sourceItems;

if (slug && sourceSelection.length === 0) {
  console.error(`Could not find slug "${slug}" in ${sourcePath}`);
  process.exit(1);
}

const draftItems = sourceSelection
  .filter((item) => !targetSlugs.has(item.slug))
  .map((item) => ({
    ...item,
    status: "draft",
    sourceLocale: from,
    translationStatus: "ai-draft",
    title: `[TODO ${to}] ${item.title}`,
    description: `[TODO ${to}] ${item.description}`,
  }));

if (draftItems.length === 0) {
  console.log("No new draft guides were created.");
  process.exit(0);
}

writeJson(targetPath, [...targetItems, ...draftItems]);

console.log(`Created ${draftItems.length} ${to} draft guide entries in ${targetPath}`);
console.log("Note: draft guide entries stay hidden until their status is changed from draft to published.");
