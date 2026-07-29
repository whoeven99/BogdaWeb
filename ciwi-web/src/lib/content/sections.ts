export type ContentSection = {
  id: string;
  title: string;
};

export type FaqEntry = {
  question: string;
  answer: string;
};

function stripHtml(input: string) {
  return input
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9\u4e00-\u9fff\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function extractSectionsFromHtml(contentHtml: string): ContentSection[] {
  const matches = [...contentHtml.matchAll(/<h2(?:\s[^>]*)?>(.*?)<\/h2>/g)];

  return matches
    .map((match) => stripHtml(match[1] ?? ""))
    .filter(Boolean)
    .map((title) => ({
      title,
      id: slugify(title),
    }));
}

export function addSectionAnchors(contentHtml: string): string {
  return contentHtml.replace(/<h2([^>]*)>(.*?)<\/h2>/g, (match, attributes = "", inner) => {
    if (attributes.includes("id=")) {
      return match;
    }

    const title = stripHtml(inner);
    const id = slugify(title);
    const className = attributes.includes("class=")
      ? attributes.replace(/class="([^"]*)"/, 'class="$1 anchor-offset"')
      : `${attributes} class="anchor-offset"`;

    return `<h2${className} id="${id}">${inner}</h2>`;
  });
}

function isLikelyQuestion(title: string) {
  return /[?？]$/.test(title) || /^(can|how|what|why|will|does|do|is|are|when|where|which)\b/i.test(title);
}

export function extractFaqEntriesFromHtml(contentHtml: string): FaqEntry[] {
  const matches = [...contentHtml.matchAll(/<h2(?:\s[^>]*)?>(.*?)<\/h2>([\s\S]*?)(?=<h2(?:\s[^>]*)?>|$)/g)];

  return matches
    .map((match) => {
      const question = stripHtml(match[1] ?? "");
      const answer = stripHtml(match[2] ?? "");

      if (!question || !answer || !isLikelyQuestion(question)) {
        return null;
      }

      return {question, answer};
    })
    .filter((entry): entry is FaqEntry => entry !== null);
}
