import {readFileSync, writeFileSync, mkdirSync} from "node:fs";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");

const CSV_PATH = process.argv[2];
if (!CSV_PATH) {
  console.error("Usage: node scripts/import-shopify-keyword-use-cases.mjs <path-to-csv>");
  process.exit(1);
}

const JSON_OUT = resolve(PROJECT_ROOT, "src/content/data/shopify_keyword_use_cases.json");

const COLUMNS = [
  "Keyword",
  "Category",
  "Use Case",
  "Scenario Description",
  "How to Solve",
  "AI Prompt",
  "FAQ 1 Question",
  "FAQ 1 Answer",
  "FAQ 2 Question",
  "FAQ 2 Answer",
  "FAQ 3 Question",
  "FAQ 3 Answer",
];

function parseCSV(text) {
  const rows = [];
  let cur = [];
  let field = "";
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQ = false;
        }
      } else {
        field += c;
      }
    } else {
      if (c === '"') inQ = true;
      else if (c === ",") {
        cur.push(field);
        field = "";
      } else if (c === "\r") {
      } else if (c === "\n") {
        cur.push(field);
        field = "";
        rows.push(cur);
        cur = [];
      } else {
        field += c;
      }
    }
  }
  if (field.length > 0 || cur.length > 0) {
    cur.push(field);
    rows.push(cur);
  }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ""));
}

function kebab(s) {
  return String(s)
    .toLowerCase()
    .replace(/['"]+/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function makeUniqueSlug(base, seen) {
  let slug = base;
  let i = 2;
  while (seen.has(slug)) {
    slug = `${base}-${i}`;
    i++;
  }
  seen.add(slug);
  return slug;
}

function escapeStr(s) {
  return String(s ?? "")
    .replace(/\u0000/g, "")
    .trim();
}

const raw = readFileSync(CSV_PATH, "utf8");
const allRows = parseCSV(raw);

const header = allRows[0];
if (header.length !== COLUMNS.length) {
  console.warn(`Header has ${header.length} columns, expected ${COLUMNS.length}`);
}

const dataRows = allRows.slice(1);
const out = [];
const slugs = new Set();
const categoryCount = new Map();

let skipped = 0;

for (const row of dataRows) {
  if (row.length < COLUMNS.length) {
    // pad
    while (row.length < COLUMNS.length) row.push("");
  }
  const keyword = escapeStr(row[0]);
  const category = escapeStr(row[1]);
  const useCaseTitle = escapeStr(row[2]);
  const scenario = escapeStr(row[3]);
  const howToSolve = escapeStr(row[4]);
  const aiPrompt = escapeStr(row[5]);
  const faqs = [
    {question: escapeStr(row[6]), answer: escapeStr(row[7])},
    {question: escapeStr(row[8]), answer: escapeStr(row[9])},
    {question: escapeStr(row[10]), answer: escapeStr(row[11])},
  ].filter((f) => f.question && f.answer);

  if (!keyword || !useCaseTitle) {
    skipped++;
    continue;
  }

  const slug = makeUniqueSlug(kebab(keyword), slugs);
  categoryCount.set(category, (categoryCount.get(category) ?? 0) + 1);

  out.push({
    slug,
    keyword,
    category: category || "General",
    title: useCaseTitle,
    scenarioDescription: scenario,
    howToSolve,
    aiPrompt,
    faqs,
  });
}

mkdirSync(dirname(JSON_OUT), {recursive: true});
writeFileSync(JSON_OUT, JSON.stringify(out, null, 2));

console.log(`Parsed rows from CSV : ${dataRows.length}`);
console.log(`Records written      : ${out.length}`);
console.log(`Skipped (empty kw)    : ${skipped}`);
console.log(`Duplicate slug fixes  : ${[...slugs].filter((s) => /-\d+$/.test(s)).length}`);
console.log("\nCategories:");
for (const [cat, n] of [...categoryCount.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${cat.padEnd(42)} ${n}`);
}
console.log(`\nJSON written to: ${JSON_OUT}`);
