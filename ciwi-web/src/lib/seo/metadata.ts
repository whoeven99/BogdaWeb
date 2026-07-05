import type {Metadata} from "next";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
};

export const siteName = "Ciwi";
export const siteUrl = "https://ciwi.ai";

export function buildPageMetadata({title, description, path = "/"}: MetadataInput): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  const canonical = new URL(path, siteUrl).toString();

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
