import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(".");
const appRoot = path.join(projectRoot, "src", "app");
const srcRoot = path.join(projectRoot, "src");
const nextConfigPath = path.join(projectRoot, "next.config.ts");

const allowedNextLinkFiles = new Set([
  "src/components/ui/ContentToc.tsx",
  "src/components/ui/LocaleSwitcher.tsx",
  "src/components/ui/LocalizedLink.tsx",
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

    for (const match of source.matchAll(rawUrlPattern)) {
      const line = getLineNumber(source, match.index ?? 0);
      pushError(
        `${relativePath}:${line}: raw siteUrl URL construction detected. Prefer toAbsoluteLocalizedUrl/toAbsoluteSiteUrl or localizeHref.`,
      );
    }
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
