import type {Locale} from "@/lib/i18n";

export type Author = {
  id: string;
  name: string;
  role: Record<Locale, string>;
  avatar: string;
  bio: Record<Locale, string>;
};

export const authors: Author[] = [
  {
    id: "elena-vasquez",
    name: "Elena Vasquez",
    role: {en: "EU Localization Lead", "zh-cn": "欧盟市场本地化负责人"},
    avatar: "/avatar/avatar-1.png",
    bio: {
      en: "10+ years localizing DTC brands for European markets.",
      "zh-cn": "10 年以上为欧洲市场本地化 DTC 品牌。",
    },
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    role: {en: "Multilingual SEO Specialist", "zh-cn": "多语言 SEO 专家"},
    avatar: "/avatar/avatar-2.png",
    bio: {
      en: "Focuses on multilingual search intent and hreflang architecture.",
      "zh-cn": "专注多语言搜索意图与 hreflang 架构。",
    },
  },
  {
    id: "sofia-ricci",
    name: "Sofia Ricci",
    role: {en: "Beauty & Fashion Localization", "zh-cn": "美妆与时尚本地化"},
    avatar: "/avatar/avatar-3.png",
    bio: {
      en: "Specializes in beauty and fashion brand voice across languages.",
      "zh-cn": "专注美妆与时尚品牌的跨语言语气。",
    },
  },
  {
    id: "david-okafor",
    name: "David Okafor",
    role: {en: "B2B & Manufacturing Translation", "zh-cn": "B2B 与制造业翻译"},
    avatar: "/avatar/avatar-4.png",
    bio: {
      en: "Translates technical B2B and manufacturing content for global buyers.",
      "zh-cn": "为全球买家翻译技术与制造业 B2B 内容。",
    },
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: {en: "Cross-border Growth Strategist", "zh-cn": "跨境增长策略师"},
    avatar: "/avatar/avatar-5.png",
    bio: {
      en: "Advises DTC brands on cross-border expansion and localization ROI.",
      "zh-cn": "为 DTC 品牌提供跨境扩张与本地化 ROI 建议。",
    },
  },
  {
    id: "thomas-becker",
    name: "Thomas Becker",
    role: {en: "Technical SEO & Schema", "zh-cn": "技术 SEO 与结构化数据"},
    avatar: "/avatar/avatar-6.png",
    bio: {
      en: "Focuses on technical SEO, structured data, and localized page indexing.",
      "zh-cn": "专注技术 SEO、结构化数据与本地化页面索引。",
    },
  },
  {
    id: "aiko-tanaka",
    name: "Aiko Tanaka",
    role: {en: "APAC Localization", "zh-cn": "亚太市场本地化"},
    avatar: "/avatar/avatar-7.png",
    bio: {
      en: "Localizes storefronts for Japan and Asia-Pacific markets.",
      "zh-cn": "为日本与亚太市场本地化 storefront。",
    },
  },
];

export function getAuthorByIndex(index: number): Author {
  return authors[Math.abs(index) % authors.length];
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find((author) => author.id === id);
}

export function getAuthorBySlug(slug: string): Author {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return getAuthorByIndex(hash);
}
