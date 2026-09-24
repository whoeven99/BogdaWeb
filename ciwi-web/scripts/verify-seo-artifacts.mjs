import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(".");
const appBuildRoot = path.join(projectRoot, ".next", "server", "app");

const sitemapBodyPath = path.join(appBuildRoot, "sitemap.xml.body");
const robotsBodyPath = path.join(appBuildRoot, "robots.txt.body");
const llmsBodyPath = path.join(appBuildRoot, "llms.txt.body");

const errors = [];

function pushError(message) {
  errors.push(message);
}

function readRequiredFile(filePath) {
  if (!fs.existsSync(filePath)) {
    pushError(`${path.relative(projectRoot, filePath)} is missing. Run \`npm run build\` before artifact verification.`);
    return "";
  }

  return fs.readFileSync(filePath, "utf8");
}

function checkSitemapArtifacts() {
  const sitemapBody = readRequiredFile(sitemapBodyPath);

  if (!sitemapBody) {
    return;
  }

  if (!sitemapBody.includes("<urlset")) {
    pushError("Built sitemap is missing the <urlset> root element.");
  }

  const locMatches = [...sitemapBody.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map((match) => match[1]);

  if (locMatches.length === 0) {
    pushError("Built sitemap does not contain any <loc> entries.");
    return;
  }

  const redirectSourcePattern = /https:\/\/(?:www\.)?ciwi\.ai\/(?:deepl|vs-langshop)\/|https:\/\/ciwi\.ai\/compare\/ciwi-vs-|http:\/\//;
  for (const loc of locMatches) {
    if (redirectSourcePattern.test(loc)) {
      pushError(`Built sitemap contains a redirect-source URL: ${loc}`);
    }

    if (loc.startsWith("https://www.ciwi.ai/")) {
      pushError(`Built sitemap contains a www host URL: ${loc}`);
    }

    if (loc.startsWith("http://")) {
      pushError(`Built sitemap contains a non-HTTPS URL: ${loc}`);
    }

    const pathname = loc.replace(/^https:\/\/[^/]+/, "");
    if (pathname.includes("//")) {
      pushError(`Built sitemap contains a malformed URL with duplicate slashes: ${loc}`);
    }

    if (loc.startsWith("https://ciwi.ai/") && loc !== "https://ciwi.ai/" && !loc.endsWith("/")) {
      pushError(`Built sitemap contains a non-canonical URL without trailing slash: ${loc}`);
    }
  }
}

function checkRobotsArtifacts() {
  const robotsBody = readRequiredFile(robotsBodyPath);

  if (!robotsBody) {
    return;
  }

  if (!robotsBody.includes("User-Agent: *")) {
    pushError("Built robots.txt is missing `User-Agent: *`.");
  }

  if (!robotsBody.includes("Allow: /")) {
    pushError("Built robots.txt is missing `Allow: /`.");
  }

  if (!robotsBody.includes("Disallow: /api/")) {
    pushError("Built robots.txt is missing `Disallow: /api/`.");
  }

  if (!robotsBody.includes("Host: https://ciwi.ai")) {
    pushError("Built robots.txt is missing the canonical host.");
  }

  if (!robotsBody.includes("Sitemap: https://ciwi.ai/sitemap.xml")) {
    pushError("Built robots.txt is missing the canonical sitemap URL.");
  }
}

function checkLlmsArtifacts() {
  const llmsBody = readRequiredFile(llmsBodyPath);

  if (!llmsBody) {
    return;
  }

  if (!llmsBody.includes("Official website  : https://ciwi.ai")) {
    pushError("Built llms.txt is missing the official site URL.");
  }

  if (!llmsBody.includes("Robots file       : https://ciwi.ai/robots.txt")) {
    pushError("Built llms.txt should reference https://ciwi.ai/robots.txt exactly.");
  }

  if (!llmsBody.includes("Sitemap file      : https://ciwi.ai/sitemap.xml")) {
    pushError("Built llms.txt should reference https://ciwi.ai/sitemap.xml exactly.");
  }

  if (llmsBody.includes("/robots.txt/")) {
    pushError("Built llms.txt contains a malformed robots.txt URL with trailing slash.");
  }

  if (llmsBody.includes("/sitemap.xml/")) {
    pushError("Built llms.txt contains a malformed sitemap.xml URL with trailing slash.");
  }

  const urlMatches = [...llmsBody.matchAll(/https:\/\/[^\s]+/g)].map((match) => match[0]);
  for (const url of urlMatches) {
    const pathname = url.replace(/^https:\/\/[^/]+/, "");

    if (pathname.includes("//")) {
      pushError(`Built llms.txt contains a malformed URL with duplicate slashes: ${url}`);
    }

    if (
      url.startsWith("https://ciwi.ai/") &&
      !url.endsWith("/") &&
      !url.endsWith(".txt") &&
      !url.endsWith(".xml")
    ) {
      pushError(`Built llms.txt contains a non-canonical internal URL without trailing slash: ${url}`);
    }
  }
}

checkSitemapArtifacts();
checkRobotsArtifacts();
checkLlmsArtifacts();

if (errors.length > 0) {
  console.error("SEO artifact verification failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("SEO artifact verification passed.");
