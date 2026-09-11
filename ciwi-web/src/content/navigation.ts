import type {Locale} from "@/lib/i18n";
import {getLocalizedValue} from "@/lib/i18n-content";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
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
      {
        label: "Resources",
        href: "/resources",
        children: [
          {label: "Resources Hub", href: "/resources"},
          {label: "Use Cases", href: "/use-cases"},
          {label: "Localization Guides", href: "/guides#localization-guides"},
          {label: "Shopify How-to Guides", href: "/guides#function-scenario-guides"},
          {label: "Help Center", href: "/help-center"},
          {label: "Blog", href: "/blog"},
          {label: "Compare Products", href: "/compare"},
          {label: "Best Shopify Apps", href: "/best-shopify-apps"},
        ],
      },
      {label: "About", href: "/about"},
    ],
    footerNavigation: {
      products: [
        {label: "AI Translator", href: "/products/translator"},
        {label: "Spark: AI Store Assistant", href: "/products/spark-analytics-agent"},
      ],
      resources: [
        {label: "Use Cases", href: "/use-cases"},
        {label: "Blog", href: "/blog"},
        {label: "Help Center", href: "/help-center"},
        {label: "Localization Guides", href: "/guides#localization-guides"},
        {label: "Shopify How-to Guides", href: "/guides#function-scenario-guides"},
        {label: "Best Shopify Apps", href: "/best-shopify-apps"},
        {label: "Resources Hub", href: "/resources"},
      ],
      company: [
        {label: "About", href: "/about"},
        {label: "Contact", href: "/contact"},
        {label: "Affiliate Program", href: "/affiliate"},
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
      {
        label: "资源",
        href: "/resources",
        children: [
          {label: "资源中心", href: "/resources"},
          {label: "应用场景", href: "/use-cases"},
          {label: "本地化指南", href: "/guides#localization-guides"},
          {label: "功能场景指南", href: "/guides#function-scenario-guides"},
          {label: "帮助中心", href: "/help-center"},
          {label: "博客", href: "/blog"},
          {label: "产品测评", href: "/compare"},
          {label: "最佳 Shopify 应用", href: "/best-shopify-apps"},
        ],
      },
      {label: "关于我们", href: "/about"},
    ],
    footerNavigation: {
      products: [
        {label: "AI 翻译", href: "/products/translator"},
        {label: "Spark AI 店铺助手", href: "/products/spark-analytics-agent"},
      ],
      resources: [
        {label: "应用场景", href: "/use-cases"},
        {label: "博客", href: "/blog"},
        {label: "帮助中心", href: "/help-center"},
        {label: "本地化指南", href: "/guides#localization-guides"},
        {label: "功能场景指南", href: "/guides#function-scenario-guides"},
        {label: "最佳 Shopify 应用", href: "/best-shopify-apps"},
        {label: "资源中心", href: "/resources"},
      ],
      company: [
        {label: "关于我们", href: "/about"},
        {label: "联系我们", href: "/contact"},
        {label: "联盟计划", href: "/affiliate"},
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
