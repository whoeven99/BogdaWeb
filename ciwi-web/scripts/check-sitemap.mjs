#!/usr/bin/env node
/**
 * Sitemap hygiene check.
 *
 * Answers one question: does the published sitemap still carry "old links"?
 * Four classes are checked, all offline (no requests against the site):
 *
 *   1. legacy      - the URL is a known old path that middleware now redirects
 *   2. shape       - duplicate slashes, missing trailing slash
 *   3. case        - spelling that does not match the canonical `/help-center/ShopifyApp`
 *   4. pairing     - a locale that is missing its counterpart
 *
 * Usage:
 *   BASE_URL=https://ciwi.ai node scripts/check-sitemap.mjs
 *   node scripts/check-sitemap.mjs path/to/sitemap.xml
 *   node scripts/check-sitemap.mjs --out docs/sitemap-check.csv
 */

import {readFile, writeFile} from "node:fs/promises";

const args = process.argv.slice(2);
const valueOptions = new Set(["out"]);
const positional = args.filter((argument, index) => {
  if (argument.startsWith("--")) {
    return false;
  }

  return !valueOptions.has(args[index - 1]?.replace(/^--/, ""));
});

function readOption(name, fallback) {
  const index = args.indexOf(`--${name}`);

  return index === -1 ? fallback : args[index + 1];
}

const outFile = readOption("out", "docs/sitemap-check.csv");
const baseUrl = (process.env.BASE_URL ?? "https://ciwi.ai").replace(/\/+$/, "");

async function loadSitemapXml() {
  if (positional.length > 0) {
    return readFile(positional[0], "utf8");
  }

  const response = await fetch(`${baseUrl}/sitemap.xml`, {headers: {"user-agent": "Mozilla/5.0 (compatible; ciwi-sitemap-check)"}});

  if (!response.ok) {
    throw new Error(`sitemap request failed: ${response.status}`);
  }

  return response.text();
}

/** Extracts the object keys of `export const <name>` blocks, including quoted keys. */
function objectKeys(source, name) {
  const start = source.indexOf(name);

  if (start === -1) {
    return [];
  }

  const braceStart = source.indexOf("{", start);
  let depth = 0;
  let end = braceStart;

  for (let index = braceStart; index < source.length; index += 1) {
    if (source[index] === "{") {
      depth += 1;
    } else if (source[index] === "}") {
      depth -= 1;

      if (depth === 0) {
        end = index;
        break;
      }
    }
  }

  return [...new Set([...source.slice(braceStart, end).matchAll(/^\s{2,4}"?([\w.-]+)"?\s*:/gm)].map((match) => match[1]))];
}

const [legacySource, compareSource] = await Promise.all([
  readFile(new URL("../src/content/legacy-routes.ts", import.meta.url), "utf8"),
  readFile(new URL("../src/content/compare-slugs.ts", import.meta.url), "utf8"),
]);

const rootLegacy = new Set([
  ...objectKeys(legacySource, "legacyRouteMap"),
  ...objectKeys(legacySource, "legacyExtraRootRedirects"),
  ...objectKeys(compareSource, "compareLegacyRootRouteMap"),
]);
const helpCenterLegacy = new Set(objectKeys(legacySource, "legacyHelpCenterSlugRedirects"));
const compareLegacy = new Set(objectKeys(compareSource, "compareSlugRedirectMap"));

// The one case-sensitive prefix in the route tree (`/help-center/ShopifyApp`).
// Its lowercase form 404s, so only the exact spelling counts as canonical.
const helpCenterBasePath = legacySource.match(/legacyHelpCenterBasePath\s*=\s*"([^"]+)"/)?.[1] ?? "/help-center/ShopifyApp";
const caseSensitiveSegments = new Map(
  helpCenterBasePath
    .split("/")
    .filter(Boolean)
    .map((segment) => [segment.toLowerCase(), segment]),
);

function restoreCanonicalCase(pathname) {
  return pathname
    .split("/")
    .map((segment) => caseSensitiveSegments.get(segment.toLowerCase()) ?? segment)
    .join("/");
}

const xml = await loadSitemapXml();
const urls = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim()))];

const findings = [];

function report(kind, url, detail) {
  findings.push({url, kind, detail});
}

for (const url of urls) {
  const {pathname} = new URL(url);
  const path = pathname.replace(/\/+$/, "");
  const [first, ...rest] = path.split("/").filter(Boolean);
  const tail = rest.at(-1);

  if (pathname.includes("//")) {
    report("shape", url, "duplicate slash");
  }

  if (pathname.length > 1 && !pathname.endsWith("/")) {
    report("shape", url, "missing trailing slash");
  }

  if (pathname !== pathname.toLowerCase()) {
    // camelCase is canonical for `/help-center/ShopifyApp`, so only a *variant*
    // spelling is a problem, not the uppercase itself.
    if (restoreCanonicalCase(pathname) !== pathname) {
      report("case", url, `expects ${restoreCanonicalCase(pathname)}`);
    }
  }

  // Locale-prefixed URLs never match the locale-less legacy tables.
  const localeFirst = first === "zh-cn" ? rest[0] : first;
  const localeRest = first === "zh-cn" ? rest.slice(1) : rest;
  const localeTail = localeRest.at(-1);

  if (rootLegacy.has(localeFirst ?? "") && localeRest.length === 0) {
    report("legacy", url, `root slug "${localeFirst}" is a known redirect source`);
  }

  if (localeFirst === "help-center" && localeRest[0] === "ShopifyApp" && helpCenterLegacy.has(localeTail ?? "")) {
    report("legacy", url, `help center slug "${localeTail}" was renamed`);
  }

  if (localeFirst === "compare" && localeRest.length === 1 && compareLegacy.has(localeTail ?? "")) {
    report("legacy", url, `compare slug "${localeTail}" was renamed`);
  }
}

const english = new Set(urls.map((url) => new URL(url).pathname).filter((path) => !path.startsWith("/zh-cn/")));
const chinese = new Set(urls.map((url) => new URL(url).pathname).filter((path) => path.startsWith("/zh-cn/")).map((path) => path.replace(/^\/zh-cn/, "") || "/"));

const alwaysEnglishOnly = new Set(["/privacy-policy/", "/terms-and-conditions/"]);
const unpaired = [...english].filter((path) => !chinese.has(path) && !alwaysEnglishOnly.has(path));

for (const path of unpaired) {
  report("pairing", `${baseUrl}${path}`, "no zh-cn counterpart");
}

const counts = new Map();

for (const finding of findings) {
  counts.set(finding.kind, (counts.get(finding.kind) ?? 0) + 1);
}

const lines = ["url,problem,detail", ...findings.map((finding) => [finding.url, finding.kind, `"${finding.detail}"`].join(","))];
await writeFile(outFile, `${lines.join("\n")}\n`);

console.log(`checked ${urls.length} sitemap URLs from ${positional[0] ?? `${baseUrl}/sitemap.xml`}\n`);
console.log("problems by class:");

for (const [kind, count] of [...counts.entries()].sort((left, right) => right[1] - left[1])) {
  console.log(`  ${String(count).padStart(5)}  ${kind}`);
}

if (counts.size === 0) {
  console.log("  (none)");
}

console.log(`\nper-URL detail: ${outFile}`);
