#!/usr/bin/env node
/**
 * Redirect chain auditor.
 *
 * Feeds a URL list through the live site and reports how many hops each URL
 * needs before it lands on a 200, plus how many dead ends (404) it produces.
 *
 * Usage:
 *   node scripts/audit-redirects.mjs urls.txt
 *   node scripts/audit-redirects.mjs --wayback ciwi.ai
 *   BASE_URL=https://ciwi.ai node scripts/audit-redirects.mjs --sitemap
 *   BASE_URL=https://ciwi.ai node scripts/audit-redirects.mjs --gsc Table.csv
 *
 * Options:
 *   --wayback <host>   pull historical URLs from the Wayback CDX API
 *   --sitemap          pull URLs from <BASE_URL>/sitemap.xml
 *   --gsc <file>       Search Console "Coverage drilldown" export (URL,Last crawled).
 *                      Adds a `cause` column explaining why each URL redirects.
 *   --out <file>       write the per-URL CSV (default docs/redirect-audit.csv)
 *   --concurrency <n>  parallel requests (default 4, keep it polite)
 */

import {writeFileSync} from "node:fs";

const args = process.argv.slice(2);
const baseUrl = (process.env.BASE_URL ?? "https://ciwi.ai").replace(/\/+$/, "");

/** Options that take a value; their value must not be mistaken for an input file. */
const valueOptions = new Set(["wayback", "out", "concurrency", "gsc"]);

function readOption(name, fallback) {
  const index = args.indexOf(`--${name}`);

  return index === -1 ? fallback : args[index + 1];
}

const outFile = readOption("out", "docs/redirect-audit.csv");
const concurrency = Number(readOption("concurrency", "4"));
const waybackHost = args.includes("--wayback") ? (readOption("wayback", "ciwi.ai") ?? "ciwi.ai") : null;
const useSitemap = args.includes("--sitemap");
const positional = args.filter((argument, index) => {
  if (argument.startsWith("--")) {
    return false;
  }

  // Skip the value that belongs to the preceding option.
  return !valueOptions.has(args[index - 1]?.replace(/^--/, ""));
});

async function urlsFromWayback(host) {
  const endpoint = `http://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(host)}&matchType=domain&output=text&fl=original&collapse=urlkey&limit=5000`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Wayback CDX request failed: ${response.status}`);
  }

  return [...new Set((await response.text()).split("\n").map((line) => line.trim()).filter(Boolean))];
}

async function urlsFromSitemap() {
  const response = await fetch(`${baseUrl}/sitemap.xml`);

  if (!response.ok) {
    throw new Error(`sitemap request failed: ${response.status}`);
  }

  const xml = await response.text();

  return [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim()))];
}

/**
 * Reads a Search Console coverage drilldown export.
 *
 * The export carries a "URL,Last crawled" header row and may be UTF-8 BOM
 * encoded; only the URL column is needed here.
 */
async function readGscExport(path) {
  const {readFile} = await import("node:fs/promises");
  const raw = (await readFile(path, "utf8")).replace(/^﻿/, "");
  const [, ...lines] = raw.split(/\r?\n/).filter(Boolean);

  return lines.map((line) => line.split(",")[0].trim()).filter((url) => url.startsWith("http"));
}

/**
 * Explains why a URL ended up in the "Page with redirect" bucket.
 *
 * The bucket is an indexing exclusion, not an error, so the useful signal is
 * the cause: only some causes are worth fixing.
 */
function classifyCause(url, finalUrl) {
  let sourcePath;
  let targetPath;

  try {
    sourcePath = new URL(url).pathname;
    targetPath = new URL(finalUrl).pathname;
  } catch {
    return "unparseable";
  }

  if (sourcePath.includes("//")) {
    // Four day window in Sept 2026 built every keyword link with `playbook//keyword`.
    return "double-slash";
  }

  if (sourcePath.replace(/\/+$/, "") === targetPath.replace(/\/+$/, "")) {
    return "trailing-slash";
  }

  if (sourcePath.startsWith("/zh-cn/") && !targetPath.startsWith("/zh-cn/")) {
    // Translation not ready yet, so the route falls back to the English page.
    return "zh-cn-fallback";
  }

  return "legacy-slug";
}

async function readUrlFile(path) {
  const {readFile} = await import("node:fs/promises");
  const raw = await readFile(path, "utf8");

  return [...new Set(raw.split("\n").map((line) => line.trim()).filter(Boolean))];
}

async function trace(url) {
  const hops = [];
  let current = url;

  for (let step = 0; step < 6; step += 1) {
    let response;

    try {
      response = await fetch(current, {
        redirect: "manual",
        headers: {"user-agent": "Mozilla/5.0 (compatible; ciwi-redirect-audit)"},
      });
    } catch (error) {
      hops.push(`ERR:${error.message}`);
      break;
    }

    hops.push(String(response.status));

    if (response.status < 300 || response.status >= 400) {
      break;
    }

    const location = response.headers.get("location");

    if (!location) {
      break;
    }

    current = new URL(location, current).toString();
  }

  const finalStatus = hops.at(-1);

  let verdict = "other";

  if (finalStatus === "200") {
    verdict = hops.length === 1 ? "ok" : `redirected-in-${hops.length - 1}-hops`;
  } else if (finalStatus?.startsWith("3")) {
    verdict = "chain-not-resolved";
  } else if (finalStatus === "404") {
    verdict = hops.length === 1 ? "404" : "ends-in-404";
  } else if (finalStatus?.startsWith("ERR")) {
    verdict = "connection-error";
  }

  return {url, hops: hops.join(" "), finalStatus, finalUrl: current, verdict, cause: classifyCause(url, current)};
}

const gscFile = readOption("gsc", null);

const urls = gscFile
  ? await readGscExport(gscFile)
  : waybackHost
  ? await urlsFromWayback(waybackHost)
  : useSitemap
  ? await urlsFromSitemap()
  : positional.length > 0
  ? (await Promise.all(positional.map(readUrlFile))).flat()
  : [];

if (urls.length === 0) {
  console.error("No URLs to audit. Pass a file, --sitemap or --wayback <host>.");
  process.exit(1);
}

const results = [];

for (let index = 0; index < urls.length; index += concurrency) {
  const batch = urls.slice(index, index + concurrency);
  results.push(...(await Promise.all(batch.map(trace))));

  if (index > 0 && index % (concurrency * 20) === 0) {
    console.error(`… ${index}/${urls.length}`);
  }
}

const counts = new Map();

for (const result of results) {
  counts.set(result.verdict, (counts.get(result.verdict) ?? 0) + 1);
}

const lines = ["url,hops,final_status,final_url,verdict,cause", ...results.map((result) => [result.url, `"${result.hops}"`, result.finalStatus, result.finalUrl, result.verdict, result.cause].join(","))];

writeFileSync(outFile, `${lines.join("\n")}\n`);

console.log(`audited ${results.length} URLs against ${baseUrl}`);

for (const [verdict, count] of [...counts.entries()].sort((left, right) => right[1] - left[1])) {
  console.log(`  ${String(count).padStart(5)}  ${verdict}`);
}

if (gscFile) {
  const causes = new Map();

  for (const result of results) {
    causes.set(result.cause, (causes.get(result.cause) ?? 0) + 1);
  }

  console.log("\nwhy these URLs redirect:");

  for (const [cause, count] of [...causes.entries()].sort((left, right) => right[1] - left[1])) {
    console.log(`  ${String(count).padStart(5)}  ${cause}`);
  }

  const deadEnds = results.filter((result) => result.verdict === "404" || result.verdict === "ends-in-404" || result.verdict === "chain-not-resolved");

  console.log(`\ndead ends (redirect that never reaches a live page): ${deadEnds.length}`);
}

console.log(`\nper-URL detail: ${outFile}`);
