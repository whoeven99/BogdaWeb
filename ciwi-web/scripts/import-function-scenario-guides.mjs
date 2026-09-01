import fs from "node:fs/promises";
import path from "node:path";

const DEFAULT_INPUT_DIR = "/Users/cedric/Downloads/方向3_功能场景";
const DEFAULT_LOCALE = "en";
const SAMPLE_FILE_NAME = "Ciwi_W3_样板_03_功能_产品描述.json";
const FILE_PREFIX = "Ciwi_W3_内容_03_";
const FILE_SUFFIX = ".json";

const EXPECTED_KEYS = [
  "audience",
  "checklist",
  "description",
  "faq",
  "features",
  "guideLabel",
  "href",
  "industry",
  "keywords",
  "mainValue",
  "mistakes",
  "overviewDrivers",
  "recommendations",
  "segmentLabel",
  "slug",
  "solutions",
  "title",
  "topic",
  "translationScope",
  "year",
];

function normalizeKeys(keys) {
  return [...keys].sort();
}

function readLocaleArg() {
  const localeArg = process.argv.find((value) => value.startsWith("--locale="));

  if (!localeArg) {
    return DEFAULT_LOCALE;
  }

  const locale = localeArg.slice("--locale=".length);

  if (!["en", "zh-cn"].includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  return locale;
}

function getOutputPath(locale) {
  return locale === "en"
    ? path.resolve("src/content/data/function_scenario_guides.json")
    : path.resolve(`src/content/data/function_scenario_guides.${locale}.json`);
}

function assertExpectedKeys(item, fileName, index) {
  const actualKeys = normalizeKeys(Object.keys(item));
  const expectedKeys = normalizeKeys(EXPECTED_KEYS);

  if (JSON.stringify(actualKeys) !== JSON.stringify(expectedKeys)) {
    throw new Error(
      `Unexpected keys in ${fileName} at index ${index}. Expected ${expectedKeys.join(", ")}, got ${actualKeys.join(", ")}.`
    );
  }
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function loadGuides(inputDir) {
  const entries = await fs.readdir(inputDir, {withFileTypes: true});
  const contentFiles = entries
    .filter((entry) => entry.isFile() && entry.name.startsWith(FILE_PREFIX) && entry.name.endsWith(FILE_SUFFIX))
    .map((entry) => entry.name)
    .sort();

  if (contentFiles.length === 0) {
    throw new Error(`No content JSON files found in ${inputDir}.`);
  }

  const samplePath = path.join(inputDir, SAMPLE_FILE_NAME);
  const sample = await readJson(samplePath);
  const expectedKeys = normalizeKeys(Object.keys(sample));

  if (JSON.stringify(expectedKeys) !== JSON.stringify(normalizeKeys(EXPECTED_KEYS))) {
    throw new Error(`Sample file ${SAMPLE_FILE_NAME} does not match the expected schema.`);
  }

  const merged = [];

  for (const fileName of contentFiles) {
    const filePath = path.join(inputDir, fileName);
    const json = await readJson(filePath);

    if (!Array.isArray(json)) {
      throw new Error(`${fileName} must contain an array of guides.`);
    }

    json.forEach((item, index) => {
      assertExpectedKeys(item, fileName, index);
      merged.push(item);
    });
  }

  const duplicateSlugs = merged
    .map((item) => item.slug)
    .filter((slug, index, arr) => arr.indexOf(slug) !== index);

  if (duplicateSlugs.length > 0) {
    throw new Error(`Duplicate slugs found: ${[...new Set(duplicateSlugs)].join(", ")}`);
  }

  return merged.sort((a, b) => a.slug.localeCompare(b.slug));
}

async function main() {
  const locale = readLocaleArg();
  const inputDir = process.argv.find((value) => !value.startsWith("--") && value !== process.argv[0] && value !== process.argv[1]) ?? DEFAULT_INPUT_DIR;
  const outputPath = getOutputPath(locale);
  const guides = await loadGuides(inputDir);

  await fs.mkdir(path.dirname(outputPath), {recursive: true});
  await fs.writeFile(outputPath, `${JSON.stringify(guides, null, 2)}\n`, "utf8");

  console.log(`Imported ${guides.length} ${locale} function scenario guides to ${outputPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
