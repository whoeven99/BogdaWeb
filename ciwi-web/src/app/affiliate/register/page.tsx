import {RegisterForm} from "@/components/affiliate/RegisterForm";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getAffiliateCopy} from "@/content/affiliate";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

function buildAffiliateRegisterNarrative(locale: "en" | "zh-cn") {
  if (locale === "zh-cn") {
    return [
      "注册页适合已经明确要推广 Ciwi 产品，并且有现成内容渠道、客户资源或 Shopify 相关受众的合作伙伴。",
      "在提交申请前，最好先想清楚你会通过教程、测评、社群还是顾问服务来推荐产品，这会直接影响后续合作方式和转化效率。",
    ];
  }

  return [
    "The registration page fits partners who already know they want to promote Ciwi products and have an existing content channel, client base, or Shopify-relevant audience.",
    "Before applying, it helps to be clear whether the promotion path will be tutorials, reviews, communities, or advisory work, because that usually shapes both approval quality and later conversion performance.",
  ];
}

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const copy = getAffiliateCopy(locale);

  return buildPageMetadata({
    title: copy.register.title,
    description: copy.register.description,
    path: "/affiliate/register",
    locale,
  });
}

export default async function RegisterPage() {
  const locale = await getRequestLocale();
  const copy = getAffiliateCopy(locale);
  const narrative = buildAffiliateRegisterNarrative(locale);

  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero">
          <div className="split-grid auth-hero">
            <div className="page-copy">
              <SectionHeading
                eyebrow={copy.register.eyebrow}
                title={copy.register.title}
                description={copy.register.description}
                as="h1"
              />
              <div className="mt-6 rounded-[24px] border border-slate-200/80 bg-white/90 p-5 sm:p-6">
                <div className="space-y-4 text-[15px] leading-7 text-slate-600 sm:text-base">
                  {narrative.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
            <RegisterForm locale={locale} copy={copy.register} />
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
