type CompareSlugDefinition = {
  alternativeName: string;
  legacyCompareSlug: string;
  canonicalSlug: string;
};

const compareSlugDefinitions: CompareSlugDefinition[] = [
  {alternativeName: "Transcy", legacyCompareSlug: "ciwi-vs-transcy", canonicalSlug: "transcy-alternative"},
  {alternativeName: "Langwill", legacyCompareSlug: "ciwi-vs-langwill", canonicalSlug: "langwill-alternative"},
  {
    alternativeName: "Shopify Translate & Adapt",
    legacyCompareSlug: "ciwi-vs-shopify-translate-adapt",
    canonicalSlug: "shopify-translate-adapt-alternative",
  },
  {alternativeName: "Weglot", legacyCompareSlug: "ciwi-vs-weglot", canonicalSlug: "weglot-alternative"},
  {alternativeName: "Langify", legacyCompareSlug: "ciwi-vs-langify", canonicalSlug: "langify-alternative"},
  {alternativeName: "Transtore", legacyCompareSlug: "ciwi-vs-transtore", canonicalSlug: "transtore-alternative"},
  {alternativeName: "Hextom AI", legacyCompareSlug: "ciwi-vs-hextom-ai", canonicalSlug: "hextom-ai-alternative"},
  {alternativeName: "LangShop", legacyCompareSlug: "ciwi-vs-langshop", canonicalSlug: "langshop-alternative"},
  {alternativeName: "GTranslate", legacyCompareSlug: "ciwi-vs-gtranslate", canonicalSlug: "gtranslate-alternative"},
  {alternativeName: "T Lab", legacyCompareSlug: "ciwi-vs-t-lab", canonicalSlug: "t-lab-alternative"},
  {alternativeName: "Locales.ai", legacyCompareSlug: "ciwi-vs-locales-ai", canonicalSlug: "locales-ai-alternative"},
  {
    alternativeName: "EA Auto Language Translate",
    legacyCompareSlug: "ciwi-vs-ea-auto-language-translate",
    canonicalSlug: "ea-auto-language-translate-alternative",
  },
  {
    alternativeName: "Orbe Geolocation",
    legacyCompareSlug: "ciwi-vs-orbe-geolocation",
    canonicalSlug: "orbe-geolocation-alternative",
  },
  {
    alternativeName: "EZ Product Image Translate",
    legacyCompareSlug: "ciwi-vs-ez-product-image-translate",
    canonicalSlug: "ez-product-image-translate-alternative",
  },
  {
    alternativeName: "Geolocation & Markets Selecty",
    legacyCompareSlug: "ciwi-vs-selecty",
    canonicalSlug: "selecty-alternative",
  },
  {alternativeName: "Reversia", legacyCompareSlug: "ciwi-vs-reversia", canonicalSlug: "reversia-alternative"},
];

export const compareSlugRedirectMap: Record<string, string> = Object.fromEntries(
  compareSlugDefinitions.map(({legacyCompareSlug, canonicalSlug}) => [legacyCompareSlug, canonicalSlug]),
);

export const compareLegacyRootRouteMap = Object.fromEntries(
  compareSlugDefinitions.flatMap(({alternativeName, legacyCompareSlug, canonicalSlug}) => {
    const destination = `/compare/${canonicalSlug}`;
    const title = `${alternativeName} compare page moved`;
    const description = `This comparison page now lives at ${destination}.`;

    return [
      [legacyCompareSlug, {title, destination, description}],
      [legacyCompareSlug.replace(/^ciwi-/, ""), {title, destination, description}],
    ];
  }),
);

export function getCanonicalCompareSlug(slug: string) {
  return compareSlugRedirectMap[slug] ?? slug;
}
