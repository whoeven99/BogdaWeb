import type {Locale} from "@/lib/i18n";
import {getLocalizedValue} from "@/lib/i18n-content";

type UiCopy = {
  cta: {
    installLabel: string;
    installHref: string;
    talkLabel: string;
    talkHref: string;
  };
  products: {
    viewDetailsLabel: string;
    reviewsLabel: string;
  };
  resources: {
    openResourceLabel: string;
  };
  blog: {
    eyebrow: string;
    readArticleLabel: string;
    previousLabel: string;
    nextLabel: string;
    paginationLabel: string;
  };
  docs: {
    directoryTitle: string;
    directoryDescription: string;
    directoryAriaLabel: string;
    directoryPaginationAriaLabel: string;
    previousGroupLabel: string;
    nextGroupLabel: string;
    pageStatusTemplate: string;
    onThisPageTitle: string;
    articlePaginationAriaLabel: string;
    previousLabel: string;
    nextLabel: string;
  };
  sections: {
    nextStepEyebrow: string;
  };
  footer: {
    description: string;
    meta: string;
  };
};

const uiCopyByLocale = {
  en: {
    cta: {
      installLabel: "Install on Shopify",
      installHref: "https://apps.shopify.com/partners/bogdatech",
      talkLabel: "Talk to us",
      talkHref: "/contact",
    },
    products: {
      viewDetailsLabel: "View details",
      reviewsLabel: "reviews",
    },
    resources: {
      openResourceLabel: "Open resource",
    },
    blog: {
      eyebrow: "Blog",
      readArticleLabel: "Read article",
      previousLabel: "Previous",
      nextLabel: "Next",
      paginationLabel: "Blog pagination",
    },
    docs: {
      directoryTitle: "Directory",
      directoryDescription: "Browse installation, setup, and day-to-day usage docs in order.",
      directoryAriaLabel: "Help center directory",
      directoryPaginationAriaLabel: "Help center directory pagination",
      previousGroupLabel: "Previous group",
      nextGroupLabel: "Next group",
      pageStatusTemplate: "Page {{current}} / {{total}}",
      onThisPageTitle: "On this page",
      articlePaginationAriaLabel: "Help center pagination",
      previousLabel: "Previous article",
      nextLabel: "Next article",
    },
    sections: {
      nextStepEyebrow: "Next step",
    },
    footer: {
      description: "Built for Shopify merchants working on localization, content efficiency, and conversion growth.",
      meta: "© 2026 Bogda Limited. Built for Shopify-first growth.",
    },
  },
  "zh-cn": {
    cta: {
      installLabel: "前往 Shopify 安装",
      installHref: "https://apps.shopify.com/partners/bogdatech",
      talkLabel: "联系我们",
      talkHref: "/contact",
    },
    products: {
      viewDetailsLabel: "查看详情",
      reviewsLabel: "条评价",
    },
    resources: {
      openResourceLabel: "查看资源",
    },
    blog: {
      eyebrow: "博客",
      readArticleLabel: "阅读文章",
      previousLabel: "上一页",
      nextLabel: "下一页",
      paginationLabel: "博客分页",
    },
    docs: {
      directoryTitle: "目录",
      directoryDescription: "按顺序浏览安装、配置和日常使用说明。",
      directoryAriaLabel: "帮助中心目录",
      directoryPaginationAriaLabel: "帮助中心目录分页",
      previousGroupLabel: "上一组",
      nextGroupLabel: "下一组",
      pageStatusTemplate: "第 {{current}} / {{total}} 页",
      onThisPageTitle: "本页内容",
      articlePaginationAriaLabel: "帮助中心分页",
      previousLabel: "上一页",
      nextLabel: "下一页",
    },
    sections: {
      nextStepEyebrow: "下一步",
    },
    footer: {
      description: "为 Shopify 商家打造，专注于本地化、内容效率与转化增长。",
      meta: "© 2026 Bogda Limited. 为 Shopify 增长而构建。",
    },
  },
} satisfies Record<Locale, UiCopy>;

export function getUiCopy(locale: Locale) {
  return getLocalizedValue(locale, uiCopyByLocale);
}
