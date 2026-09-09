import type {Locale} from "@/lib/i18n";
import {getLocalizedValue} from "@/lib/i18n-content";
import {getProducts} from "@/content/products";

export const affiliateProductSlugs = ["translator", "bundle-discount", "content-ai", "spark-analytics-agent"] as const;
export type AffiliateProductSlug = (typeof affiliateProductSlugs)[number];
export const defaultAffiliateProductSlug: AffiliateProductSlug = "translator";

export const productCommissionRates: Record<AffiliateProductSlug, number> = {
  translator: 0.2,
  "bundle-discount": 0.25,
  "content-ai": 0.2,
  "spark-analytics-agent": 0.3,
};

export type AffiliateProduct = {
  slug: AffiliateProductSlug;
  name: string;
  rate: number;
};

export function getAffiliateProducts(locale: Locale): AffiliateProduct[] {
  return getProducts(locale).map((product) => ({
    slug: product.slug as AffiliateProductSlug,
    name: product.name,
    rate: productCommissionRates[product.slug as AffiliateProductSlug] ?? 0.2,
  }));
}

export type AffiliateAccount = {
  id: string;
  name: string;
  email: string;
  referralCode: string | null;
  status: "active" | "pending";
  joinedAt: string;
};

export type ProgressStats = {
  clicks: number;
  signups: number;
  activated: number;
  conversionRate: number;
  trackedRevenue: number;
  commissionEarned: number;
  currency: "USD";
};

export type PayoutRecord = {
  id: string;
  period: string;
  baseAmount: number;
  rate: number;
  amount: number;
  status: "pending" | "paid";
  paidAt?: string;
};

export type ReferralRecord = {
  id: string;
  email: string;
  storeId?: string;
  productSlug: AffiliateProductSlug;
  signedUpAt: string;
  installed: boolean;
  subscribed: boolean;
  plan?: string;
};

export type AffiliateCopy = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    registerLabel: string;
    loginLabel: string;
    highlights: string[];
    sampleTitle: string;
    sampleDescription: string;
    sampleLabels: {activated: string; trackedRevenue: string; commission: string};
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    description: string;
    steps: {title: string; description: string}[];
  };
  commission: {
    eyebrow: string;
    title: string;
    description: string;
    columns: {product: string; condition: string; rate: string};
    condition: string;
    footnote: string;
  };
  landing: {
    eyebrow: string;
    title: string;
    description: string;
    installLabel: string;
    benefits: Record<string, string>;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: {question: string; answer: string}[];
  };
  register: {
    eyebrow: string;
    title: string;
    description: string;
    fields: {name: string; email: string; password: string};
    placeholders: {name: string; email: string; password: string};
    submitLabel: string;
    submittingLabel: string;
    loginPrompt: string;
    loginLinkLabel: string;
    errorMessage: string;
  };
  login: {
    eyebrow: string;
    title: string;
    description: string;
    fields: {email: string; password: string};
    placeholders: {email: string; password: string};
    submitLabel: string;
    submittingLabel: string;
    registerPrompt: string;
    registerLinkLabel: string;
    errorMessage: string;
  };
  dashboard: {
    eyebrow: string;
    title: string;
    tabs: {overview: string; progress: string; payouts: string};
    logoutLabel: string;
    referralCard: {
      title: string;
      description: string;
      emptyState: string;
      generateLabel: string;
      codeLabel: string;
      linkLabel: string;
      copyCodeLabel: string;
      copyLinkLabel: string;
      copiedLabel: string;
      rateLabel: string;
    };
    overview: {
      statsTitle: string;
      statsDescription: string;
      labels: {
        clicks: string;
        signups: string;
        activated: string;
        trackedRevenue: string;
        commissionEarned: string;
      };
    };
    progress: {
      title: string;
      description: string;
      columns: {
        email: string;
        store: string;
        product: string;
        installed: string;
        subscribed: string;
        plan: string;
      };
      yes: string;
      no: string;
      emptyState: string;
    };
    payouts: {
      title: string;
      description: string;
      columns: {period: string; base: string; rate: string; amount: string; status: string};
      pendingTotal: string;
      paidTotal: string;
      statusLabels: {pending: string; paid: string};
      emptyState: string;
    };
    withdraw: {
      title: string;
      availableLabel: string;
      pendingLabel: string;
      buttonLabel: string;
      notice: string;
      termNote: string;
    };
  };
};

const affiliateCopy = {
  en: {
    hero: {
      eyebrow: "Affiliate Program",
      title: "Earn 20% from every merchant you bring to Ciwi",
      description:
        "Share your referral link, track signups and activated customers, and get paid on the revenue they generate. One dashboard for your progress and payouts.",
      registerLabel: "Create my referral code",
      loginLabel: "Sign in",
      highlights: ["20% revenue share", "Tracked referrals", "Monthly payouts"],
      sampleTitle: "Your dashboard, at a glance",
      sampleDescription: "Progress and payouts stay in one place after you sign in.",
      sampleLabels: {activated: "Activated", trackedRevenue: "Tracked revenue", commission: "Commission earned"},
    },
    howItWorks: {
      eyebrow: "How it works",
      title: "Three steps to your first payout",
      description: "A simple loop: get a code, share it, and collect on the merchants that convert.",
      steps: [
        {
          title: "Create your code",
          description: "Register once and get a personal referral code and shareable link.",
        },
        {
          title: "Share your link",
          description: "Send it to Shopify merchants who could use Ciwi's localization and growth tools.",
        },
        {
          title: "Earn and get paid",
          description: "Earn 20% of the tracked revenue from merchants you bring in, paid out monthly.",
        },
      ],
    },
    commission: {
      eyebrow: "Commission",
      title: "Product-based revenue share",
      description: "Your commission rate follows the product you promote. Pick a product and earn a share of the revenue it generates.",
      columns: {product: "Product", condition: "What counts", rate: "Your share"},
      condition: "Revenue from merchants you refer",
      footnote: "Commissions are tracked by product referral code and settled monthly.",
    },
    landing: {
      eyebrow: "Exclusive offer",
      title: "Start with Ciwi and claim your bonus",
      description: "You were referred by a Ciwi partner. Choose a product below and install to get started.",
      installLabel: "Install on Shopify",
      benefits: {
        translator: "5-day free trial + 4,000,000 bonus credits",
        "bundle-discount": "Bundle pricing to grow your average order value",
        "spark-analytics-agent": "Get 1,000,000 credits (worth $9.99) when you install",
      },
    },
    faq: {
      eyebrow: "FAQ",
      title: "Common questions",
      items: [
        {
          question: "How do I know a merchant came from my link?",
          answer: "Every registration and activation is attributed back to your referral code, so you can see clicks, signups, and activated customers in your dashboard.",
        },
        {
          question: "When do I get paid?",
          answer: "Payouts are settled monthly. Pending commissions from the current period appear in your dashboard until they are marked as paid.",
        },
        {
          question: "Is there a cap on how much I can earn?",
          answer: "No. Your earnings scale with the revenue generated by the merchants you refer.",
        },
      ],
    },
    register: {
      eyebrow: "Create account",
      title: "Create your referral account",
      description: "Register to generate your personal referral code and link.",
      fields: {name: "Name", email: "Work email", password: "Password"},
      placeholders: {name: "For example: Cedric", email: "name@company.com", password: "At least 6 characters"},
      submitLabel: "Create my referral code",
      submittingLabel: "Creating...",
      loginPrompt: "Already have an account?",
      loginLinkLabel: "Sign in",
      errorMessage: "We couldn't create your account right now. Please try again.",
    },
    login: {
      eyebrow: "Sign in",
      title: "Sign in to your dashboard",
      description: "Access your progress and payout history.",
      fields: {email: "Work email", password: "Password"},
      placeholders: {email: "name@company.com", password: "Your password"},
      submitLabel: "Sign in",
      submittingLabel: "Signing in...",
      registerPrompt: "New to the program?",
      registerLinkLabel: "Create a referral code",
      errorMessage: "We couldn't sign you in right now. Please try again.",
    },
    dashboard: {
      eyebrow: "Partner dashboard",
      title: "Your affiliate dashboard",
      tabs: {overview: "Overview", progress: "Progress", payouts: "Payouts"},
      logoutLabel: "Sign out",
      referralCard: {
        title: "Your referral code",
        description: "One code, one link per product. Generate your code once, then share the matching link for the product you promote.",
        emptyState: "You haven't generated your referral code yet.",
        generateLabel: "Generate referral code",
        codeLabel: "Referral code",
        linkLabel: "Product links",
        copyCodeLabel: "Copy code",
        copyLinkLabel: "Copy link",
        copiedLabel: "Copied",
        rateLabel: "Commission",
      },
      overview: {
        statsTitle: "Performance overview",
        statsDescription: "Key numbers from your referrals so far.",
        labels: {
          clicks: "Clicks",
          signups: "Signups",
          activated: "Activated",
          trackedRevenue: "Tracked revenue",
          commissionEarned: "Commission earned",
        },
      },
      progress: {
        title: "Referral progress",
        description: "See where each referred merchant is in their journey.",
        columns: {
          email: "Email",
          store: "Store",
          product: "Product",
          installed: "Installed",
          subscribed: "Subscribed",
          plan: "Plan",
        },
        yes: "Yes",
        no: "No",
        emptyState: "No referrals yet. Share your link to start tracking.",
      },
      payouts: {
        title: "Payout history",
        description: "Your settled and pending commissions by period.",
        columns: {period: "Period", base: "Revenue base", rate: "Rate", amount: "Commission", status: "Status"},
        pendingTotal: "Pending",
        paidTotal: "Paid",
        statusLabels: {pending: "Pending", paid: "Paid"},
        emptyState: "No payouts yet. Share your link to start earning.",
      },
      withdraw: {
        title: "Withdraw",
        availableLabel: "Available to withdraw",
        pendingLabel: "In 30-day hold",
        buttonLabel: "Withdraw",
        notice: "We've notified our team. We'll reach out by email shortly to complete your withdrawal.",
        termNote: "Commissions must clear a ~30 day hold period before they can be withdrawn.",
      },
    },
  },
  "zh-cn": {
    hero: {
      eyebrow: "联盟计划",
      title: "每带来一位 Ciwi 客户，赚取 20% 分成",
      description:
        "分享你的推广链接，追踪注册与付费激活客户，并按他们带来的收入获得分成。进度与结算都在同一个后台里。",
      registerLabel: "创建我的推广码",
      loginLabel: "登录",
      highlights: ["20% 收入分成", "推荐效果可追踪", "每月结算"],
      sampleTitle: "你的后台，一眼看清",
      sampleDescription: "登录后，进度与结算都集中在同一个页面。",
      sampleLabels: {activated: "激活客户", trackedRevenue: "追踪收入", commission: "累计佣金"},
    },
    howItWorks: {
      eyebrow: "如何运作",
      title: "三步拿到第一笔结算",
      description: "一个简单闭环：拿码、分享、按转化结算。",
      steps: [
        {title: "创建推广码", description: "注册一次，即可获得专属推广码和可分享链接。"},
        {title: "分享链接", description: "把它发给可能用得上 Ciwi 本地化与增长工具的 Shopify 商家。"},
        {title: "赚取并结算", description: "按你带来商家产生的收入赚取 20% 分成，每月结算。"},
      ],
    },
    commission: {
      eyebrow: "佣金",
      title: "按产品分成",
      description: "你的分成比例跟着产品走。选择产品，按它带来的收入获取对应比例分成。",
      columns: {product: "产品", condition: "计佣口径", rate: "你的分成"},
      condition: "你推荐商家产生的收入",
      footnote: "佣金按产品推广码归因，每月结算。",
    },
    landing: {
      eyebrow: "专属福利",
      title: "安装 Ciwi，领取专属福利",
      description: "你通过 Ciwi 推广链接来到这里。选择下方产品安装即可开始。",
      installLabel: "前往 Shopify 安装",
      benefits: {
        translator: "5 天免费试用 + 额外 400 万积分 bonus",
        "bundle-discount": "套餐定价，帮助提升客单价",
        "spark-analytics-agent": "安装就送 100 万积分，价值 $9.99",
      },
    },
    faq: {
      eyebrow: "常见问题",
      title: "常见问题",
      items: [
        {question: "如何知道某位商家来自我的链接？", answer: "每次注册与激活都会归因到你的推广码，你可以在后台看到点击、注册和激活客户数。"},
        {question: "什么时候结算？", answer: "每月结算一次。当前周期的待结算佣金会显示在后台，直到被标记为已结算。"},
        {question: "收入有上限吗？", answer: "没有。你的收入随推荐商家带来的收入而增长。"},
      ],
    },
    register: {
      eyebrow: "创建账户",
      title: "创建你的推广账户",
      description: "注册后即可生成专属推广码和链接。",
      fields: {name: "姓名", email: "工作邮箱", password: "密码"},
      placeholders: {name: "例如：Cedric", email: "name@company.com", password: "至少 6 位"},
      submitLabel: "创建我的推广码",
      submittingLabel: "创建中...",
      loginPrompt: "已经有账户？",
      loginLinkLabel: "登录",
      errorMessage: "暂时无法创建账户，请稍后再试。",
    },
    login: {
      eyebrow: "登录",
      title: "登录你的后台",
      description: "查看你的进度和结算记录。",
      fields: {email: "工作邮箱", password: "密码"},
      placeholders: {email: "name@company.com", password: "你的密码"},
      submitLabel: "登录",
      submittingLabel: "登录中...",
      registerPrompt: "还没有账户？",
      registerLinkLabel: "创建推广码",
      errorMessage: "暂时无法登录，请稍后再试。",
    },
    dashboard: {
      eyebrow: "伙伴后台",
      title: "你的联盟后台",
      tabs: {overview: "概览", progress: "进度", payouts: "结算"},
      logoutLabel: "退出登录",
      referralCard: {
        title: "你的推广码",
        description: "一个推广码，对应每个产品的推广链接。生成一次，即可分享对应产品的链接。",
        emptyState: "你还没有生成推广码。",
        generateLabel: "生成推广码",
        codeLabel: "推广码",
        linkLabel: "产品推广链接",
        copyCodeLabel: "复制推广码",
        copyLinkLabel: "复制链接",
        copiedLabel: "已复制",
        rateLabel: "分成比例",
      },
      overview: {
        statsTitle: "表现概览",
        statsDescription: "目前你的推荐带来的关键数据。",
        labels: {
          clicks: "点击",
          signups: "注册",
          activated: "激活",
          trackedRevenue: "追踪收入",
          commissionEarned: "累计佣金",
        },
      },
      progress: {
        title: "推广进度",
        description: "查看每位被推荐商家当前所处的阶段。",
        columns: {
          email: "注册邮箱",
          store: "商店",
          product: "产品",
          installed: "是否安装",
          subscribed: "是否订阅",
          plan: "订阅计划",
        },
        yes: "是",
        no: "否",
        emptyState: "暂无推广记录。分享链接后开始追踪。",
      },
      payouts: {
        title: "结算记录",
        description: "按周期查看已结算与待结算佣金。",
        columns: {period: "周期", base: "收入基数", rate: "比例", amount: "佣金", status: "状态"},
        pendingTotal: "待结算",
        paidTotal: "已结算",
        statusLabels: {pending: "待结算", paid: "已结算"},
        emptyState: "暂无结算记录。分享你的链接开始赚取分成。",
      },
      withdraw: {
        title: "提现",
        availableLabel: "可提现余额",
        pendingLabel: "账期内（约 30 天）",
        buttonLabel: "提现",
        notice: "已通知官方人员，我们会尽快通过邮箱联系你进行提现。",
        termNote: "佣金需经过约 30 天账期后方可提现。",
      },
    },
  },
} satisfies Record<Locale, AffiliateCopy>;

export function getAffiliateCopy(locale: Locale) {
  return getLocalizedValue(locale, affiliateCopy);
}

export const mockProgressStats: ProgressStats = {
  clicks: 1284,
  signups: 87,
  activated: 23,
  conversionRate: 0.068,
  trackedRevenue: 3120,
  commissionEarned: 624,
  currency: "USD",
};

export const mockPayouts: PayoutRecord[] = [
  {id: "po-2026-09", period: "2026-09", baseAmount: 320, rate: 0.2, amount: 64, status: "pending"},
  {id: "po-2026-08", period: "2026-08", baseAmount: 1450, rate: 0.2, amount: 290, status: "paid", paidAt: "2026-09-01"},
  {id: "po-2026-07", period: "2026-07", baseAmount: 980, rate: 0.2, amount: 196, status: "paid", paidAt: "2026-08-01"},
  {id: "po-2026-06", period: "2026-06", baseAmount: 690, rate: 0.2, amount: 138, status: "paid", paidAt: "2026-07-01"},
];

export const mockReferrals: ReferralRecord[] = [
  {id: "ref-1", email: "alice@coastalhome.com", storeId: "coastal-home", productSlug: "translator", signedUpAt: "2026-08-01", installed: true, subscribed: true, plan: "Pro"},
  {id: "ref-2", email: "bob@fitgear.co", storeId: "fit-gear", productSlug: "spark-analytics-agent", signedUpAt: "2026-08-04", installed: true, subscribed: true, plan: "Pro"},
  {id: "ref-3", email: "carol@petboutique.com", storeId: "pet-boutique", productSlug: "bundle-discount", signedUpAt: "2026-08-08", installed: true, subscribed: false},
  {id: "ref-4", email: "dave@glowbeauty.shop", productSlug: "content-ai", signedUpAt: "2026-08-15", installed: false, subscribed: false},
  {id: "ref-5", email: "erin@brewbox.store", storeId: "brew-box", productSlug: "translator", signedUpAt: "2026-08-20", installed: true, subscribed: true, plan: "Basic"},
  {id: "ref-6", email: "frank@minimaljewel.com", productSlug: "spark-analytics-agent", signedUpAt: "2026-09-01", installed: false, subscribed: false},
];

export const affiliateInstallUrls: Record<string, string> = {
  translator: "https://apps.shopify.com/translator-by-ciwi",
  "bundle-discount": "https://apps.shopify.com/ciwi-ai-bundle",
  "spark-analytics-agent": "https://apps.shopify.com/spark-1",
};

export const affiliateLandingProducts = ["translator", "bundle-discount", "spark-analytics-agent"] as const;

export type AffiliateLandingOffer = {
  slug: string;
  name: string;
  description: string;
  benefit: string;
  installUrl: string;
};

export type AffiliateLandingData = {
  copy: AffiliateCopy["landing"];
  offers: AffiliateLandingOffer[];
};

export function getAffiliateLanding(locale: Locale): AffiliateLandingData {
  const landingCopy = getAffiliateCopy(locale).landing;
  const products = getProducts(locale);

  return {
    copy: landingCopy,
    offers: affiliateLandingProducts.map((slug) => {
      const product = products.find((item) => item.slug === slug);

      return {
        slug,
        name: product?.name ?? slug,
        description: product?.shortDescription ?? "",
        benefit: landingCopy.benefits[slug] ?? "",
        installUrl: affiliateInstallUrls[slug] ?? "",
      };
    }),
  };
}
