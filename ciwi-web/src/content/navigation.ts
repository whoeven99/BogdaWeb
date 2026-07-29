import type {Locale} from "@/lib/i18n";
import {getLocalizedValue} from "@/lib/i18n-content";

export type NavItem = {
  label: string;
  href: string;
};

type FooterNavigation = {
  products: NavItem[];
  resources: NavItem[];
  company: NavItem[];
  legal: NavItem[];
};

type NavigationContent = {
  primaryNavigation: NavItem[];
  footerNavigation: FooterNavigation;
  footerGroupTitles: {
    products: string;
    resources: string;
    company: string;
    legal: string;
  };
};

const navigationContent = {
  en: {
    primaryNavigation: [
      {label: "Products", href: "/products"},
      {label: "Resources", href: "/resources"},
      {label: "About", href: "/about"},
    ],
    footerNavigation: {
      products: [
        {label: "AI Translator", href: "/products/translator"},
        {label: "Bundle Discount", href: "/products/bundle-discount"},
        {label: "Content AI", href: "/products/content-ai"},
      ],
      resources: [
        {label: "Blog", href: "/blog"},
        {label: "Help Center", href: "/help-center"},
        {label: "Resources Hub", href: "/resources"},
      ],
      company: [
        {label: "About", href: "/about"},
        {label: "Contact", href: "/contact"},
      ],
      legal: [
        {label: "Privacy Policy", href: "/privacy-policy"},
        {label: "Terms & Conditions", href: "/terms-and-conditions"},
      ],
    },
    footerGroupTitles: {
      products: "Products",
      resources: "Resources",
      company: "Company",
      legal: "Legal",
    },
  },
  "zh-cn": {
    primaryNavigation: [
      {label: "产品", href: "/products"},
      {label: "资源", href: "/resources"},
      {label: "关于我们", href: "/about"},
    ],
    footerNavigation: {
      products: [
        {label: "AI 翻译", href: "/products/translator"},
        {label: "套餐折扣", href: "/products/bundle-discount"},
        {label: "内容 AI", href: "/products/content-ai"},
      ],
      resources: [
        {label: "博客", href: "/blog"},
        {label: "帮助中心", href: "/help-center"},
        {label: "资源中心", href: "/resources"},
      ],
      company: [
        {label: "关于我们", href: "/about"},
        {label: "联系我们", href: "/contact"},
      ],
      legal: [
        {label: "隐私政策", href: "/privacy-policy"},
        {label: "服务条款", href: "/terms-and-conditions"},
      ],
    },
    footerGroupTitles: {
      products: "产品",
      resources: "资源",
      company: "公司",
      legal: "法务",
    },
  },
} satisfies Record<Locale, NavigationContent>;

export function getNavigation(locale: Locale) {
  return getLocalizedValue(locale, navigationContent);
}
