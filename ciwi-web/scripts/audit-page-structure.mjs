import fs from "node:fs";

const base = new URL(process.argv[2] ?? "http://localhost:9011");
const output = process.argv[3] ?? "/tmp/ciwi-page-structure.json";
const text = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, " ")
  .replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").replace(/&#x27;/g, "'")
  .replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();

async function parallel(items, action) {
  let next = 0;
  await Promise.all(Array.from({length: 8}, async () => {
    while (next < items.length) await action(items[next++]);
  }));
}

const sitemapResponse = await fetch(new URL("/sitemap.xml", base));
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const paths = [...new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((match) => new URL(match[1]).pathname))];
if (!paths.length) throw new Error("No sitemap pages found");
const pages = [];
const targets = new Set();
let completed = 0;
await parallel(paths, async (path) => {
  const response = await fetch(new URL(path, base), {redirect: "manual"});
  const html = await response.text();
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  const links = [...html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)]
    .filter((match) => match[1].startsWith("/") && !match[1].startsWith("//"))
    .map((match) => ({href: match[1].replaceAll("&amp;", "&"), label: text(match[2])}));
  for (const link of links) {
    const target = new URL(link.href, base);
    if (!target.pathname.startsWith("/api/")) targets.add(target.pathname + target.search);
  }
  const body = text(main || html);
  const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((match) => text(match[1]));
  pages.push({path, status: response.status,
    mainCount: [...html.matchAll(/<main\b/g)].length,
    title: text(html.match(/<title>(.*?)<\/title>/)?.[1] ?? ""),
    h1, words: body.split(/\s+/).length, links,
    mainLinkCount: [...main.matchAll(/<a\b/g)].length,
    // These are observations, not a target keyword density or a ranking score.
    terms: Object.fromEntries(["Shopify", "translation", "Langify", "Transcy"].map((term) => [term,
      (body.match(new RegExp(`\\b${term}\\b`, "gi")) ?? []).length])),
  });
  completed++;
  if (completed % 200 === 0) console.log(`Checked ${completed}/${paths.length} sitemap pages`);
});

const known = new Map(pages.map((page) => [page.path, page.status]));
const destinations = [];
await parallel([...targets].filter((path) => !known.has(path)), async (path) => {
  const response = await fetch(new URL(path, base), {redirect: "manual"});
  await response.arrayBuffer();
  destinations.push({path, status: response.status, location: response.headers.get("location")});
});
const brokenDestinations = [
  ...pages.filter((page) => page.status !== 200).map(({path, status}) => ({path, status})),
  ...destinations.filter((destination) => destination.status !== 200),
];
const byTitle = new Map();
for (const page of pages) byTitle.set(page.title, [...(byTitle.get(page.title) ?? []), page.path]);
const incoming = new Set(pages.flatMap((page) => page.links.map((link) => new URL(link.href, base).pathname)));
const summary = {
  pages: pages.length,
  mainLandmarkIssues: pages.filter((page) => page.mainCount !== 1).map(({path, mainCount}) => ({path, mainCount})),
  headingIssues: pages.filter((page) => page.h1.length !== 1).map(({path, h1}) => ({path, h1})),
  duplicateTitles: [...byTitle].filter(([, entries]) => entries.length > 1),
  brokenDestinations,
  withoutIncomingLinks: paths.filter((path) => !incoming.has(path)),
};
fs.writeFileSync(output, JSON.stringify({summary, pages}, null, 2));
console.log(JSON.stringify(summary, null, 2));
console.log(`Saved page details to ${output}`);
if (summary.headingIssues.length || summary.mainLandmarkIssues.length || summary.duplicateTitles.length || brokenDestinations.length) process.exitCode = 1;
