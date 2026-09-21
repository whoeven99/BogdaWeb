import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(".");
const appRoot = path.join(projectRoot, "src", "app");
const srcRoot = path.join(projectRoot, "src");
const nextConfigPath = path.join(projectRoot, "next.config.ts");
const robotsRoutePath = path.join(appRoot, "robots.ts");
const llmsRoutePath = path.join(appRoot, "llms.txt", "route.ts");
const toolReviewDetailPagePath = path.join(appRoot, "resources", "product-research", "reviews", "[slug]", "page.tsx");

const allowedNextLinkFiles = new Set([
  "src/components/ui/ContentToc.tsx",
  "src/components/ui/LocaleSwitcher.tsx",
  "src/components/ui/LocalizedLink.tsx",
]);

const allowedRawSiteUrlConstructionFiles = new Set([
  "src/lib/seo/metadata.ts",
]);

const errors = [];
const warnings = [];

function toRelativePath(filePath) {
  return path.relative(projectRoot, filePath).replaceAll(path.sep, "/");
}

function pushError(message) {
  errors.push(message);
}

function pushWarning(message) {
  warnings.push(message);
}

function walkFiles(directory, predicate, results = []) {
  for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walkFiles(fullPath, predicate, results);
      continue;
    }

    if (entry.isFile() && predicate(fullPath)) {
      results.push(fullPath);
    }
  }

  return results;
}

function getLineNumber(source, matchIndex) {
  return source.slice(0, matchIndex).split("\n").length;
}

function checkNextConfig() {
  const config = fs.readFileSync(nextConfigPath, "utf8");

  if (!config.includes("trailingSlash: true")) {
    pushError("next.config.ts: missing `trailingSlash: true`.");
  }
}

function checkAppMetadata() {
  const pageFiles = walkFiles(appRoot, (filePath) => filePath.endsWith("/page.tsx"));

  for (const filePath of pageFiles) {
    const source = fs.readFileSync(filePath, "utf8");

    const hasMetadata =
      source.includes("buildPageMetadata(") ||
      source.includes("generateMetadata(") ||
      source.includes("export const metadata");

    if (!hasMetadata) {
      pushError(`${toRelativePath(filePath)}: page file is missing metadata handling.`);
    }
  }
}

function checkNextLinkUsage() {
  const tsxFiles = walkFiles(srcRoot, (filePath) => filePath.endsWith(".tsx"));

  for (const filePath of tsxFiles) {
    const source = fs.readFileSync(filePath, "utf8");
    const relativePath = toRelativePath(filePath);

    if (!source.includes('from "next/link"') && !source.includes("from 'next/link'")) {
      continue;
    }

    if (!allowedNextLinkFiles.has(relativePath)) {
      pushError(`${relativePath}: direct \`next/link\` usage is not allowed here. Prefer \`LocalizedLink\`.`);
    }
  }
}

function checkRawInternalAnchors() {
  const tsxFiles = walkFiles(srcRoot, (filePath) => filePath.endsWith(".tsx"));
  const rawInternalAnchorPattern = /<a\b[^>]*\bhref=["']\/(?!\/)/g;

  for (const filePath of tsxFiles) {
    const source = fs.readFileSync(filePath, "utf8");
    const relativePath = toRelativePath(filePath);

    for (const match of source.matchAll(rawInternalAnchorPattern)) {
      const line = getLineNumber(source, match.index ?? 0);
      pushError(`${relativePath}:${line}: raw internal anchor detected. Use LocalizedLink or shared link components.`);
    }
  }
}

function checkHardcodedLocaleHrefs() {
  const sourceFiles = walkFiles(
    srcRoot,
    (filePath) => /\.(ts|tsx|json|mdx)$/.test(filePath),
  );
  const localeHrefPattern = /\bhref\s*[:=]\s*["']\/zh-cn(?:\/|["'#?])/g;

  for (const filePath of sourceFiles) {
    const source = fs.readFileSync(filePath, "utf8");
    const relativePath = toRelativePath(filePath);

    for (const match of source.matchAll(localeHrefPattern)) {
      const line = getLineNumber(source, match.index ?? 0);
      pushError(`${relativePath}:${line}: hardcoded locale-prefixed href detected. Store locale-neutral hrefs instead.`);
    }
  }
}

function checkRawAbsoluteUrlConstruction() {
  const sourceFiles = walkFiles(srcRoot, (filePath) => /\.(ts|tsx)$/.test(filePath));
  const rawUrlPattern = /new URL\(\s*[A-Za-z0-9_.]+\s*,\s*siteUrl\s*\)/g;

  for (const filePath of sourceFiles) {
    const source = fs.readFileSync(filePath, "utf8");
    const relativePath = toRelativePath(filePath);

    if (allowedRawSiteUrlConstructionFiles.has(relativePath)) {
      continue;
    }

    for (const match of source.matchAll(rawUrlPattern)) {
      const line = getLineNumber(source, match.index ?? 0);
      pushError(
        `${relativePath}:${line}: raw siteUrl URL construction detected. Prefer toAbsoluteLocalizedUrl/toAbsoluteSiteUrl or localizeHref.`,
      );
    }
  }
}

function checkRequestLocaleForceDynamic() {
  const appFiles = walkFiles(appRoot, (filePath) => /\.(ts|tsx)$/.test(filePath));

  for (const filePath of appFiles) {
    const source = fs.readFileSync(filePath, "utf8");
    const relativePath = toRelativePath(filePath);
    const usesRequestLocale = source.includes("getRequestLocale(") || /\bheaders\(/.test(source);

    if (!usesRequestLocale) {
      continue;
    }

    if (!/export const dynamic\s*=\s*["']force-dynamic["']/.test(source)) {
      pushError(`${relativePath}: uses request locale or headers without \`export const dynamic = "force-dynamic"\`.`);
    }
  }
}

function checkDiscoverySourceFiles() {
  const robotsSource = fs.readFileSync(robotsRoutePath, "utf8");
  const llmsSource = fs.readFileSync(llmsRoutePath, "utf8");

  if (!robotsSource.includes("sitemap: `${siteUrl}/sitemap.xml`")) {
    pushError("src/app/robots.ts: robots route should expose the canonical sitemap URL via siteUrl.");
  }

  if (!robotsSource.includes("host: siteUrl")) {
    pushError("src/app/robots.ts: robots route should expose host: siteUrl.");
  }

  if (!robotsSource.includes('disallow: "/api/"')) {
    pushError('src/app/robots.ts: robots route should explicitly disallow "/api/".');
  }

  if (!/export const dynamic\s*=\s*["']force-static["']/.test(llmsSource)) {
    pushError('src/app/llms.txt/route.ts: llms.txt route should stay force-static.');
  }

  if (!llmsSource.includes('toAbsoluteFileUrl("/robots.txt")')) {
    pushError('src/app/llms.txt/route.ts: llms.txt should reference robots.txt via toAbsoluteFileUrl("/robots.txt").');
  }

  if (!llmsSource.includes('toAbsoluteFileUrl("/sitemap.xml")')) {
    pushError('src/app/llms.txt/route.ts: llms.txt should reference sitemap.xml via toAbsoluteFileUrl("/sitemap.xml").');
  }
}

function checkKnownStructuredDataPatterns() {
  const toolReviewDetailSource = fs.readFileSync(toolReviewDetailPagePath, "utf8");

  if (!toolReviewDetailSource.includes('itemReviewedType: "SoftwareApplication"')) {
    pushError(
      'src/app/resources/product-research/reviews/[slug]/page.tsx: tool review detail pages should mark reviewed items as `SoftwareApplication`.',
    );
  }
}

function checkAgentGuidePresence() {
  const agentGuidePath = path.join(projectRoot, "agent.md");

  if (!fs.existsSync(agentGuidePath)) {
    pushWarning("agent.md is missing. AI onboarding guide will not be available.");
  }
}

checkAgentGuidePresence();
checkNextConfig();
checkAppMetadata();
checkNextLinkUsage();
checkRawInternalAnchors();
checkHardcodedLocaleHrefs();
checkRawAbsoluteUrlConstruction();
checkRequestLocaleForceDynamic();
checkDiscoverySourceFiles();
checkKnownStructuredDataPatterns();

if (warnings.length > 0) {
  console.warn("SEO check warnings:\n");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
  console.warn("");
}

if (errors.length > 0) {
  console.error("SEO check failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("SEO check passed.");
