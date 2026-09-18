import {LoginForm} from "@/components/affiliate/LoginForm";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getAffiliateCopy} from "@/content/affiliate";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

function buildAffiliateLoginNarrative(locale: "en" | "zh-cn") {
  if (locale === "zh-cn") {
    return [
      "登录页主要用于已加入联盟计划的合作伙伴查看数据、素材和账户状态，因此它本身不会展示完整项目介绍。",
      "如果你还没有账户，建议先确认你准备推广的渠道和受众类型，再进入注册页完成申请，这样后续审核和合作节奏会更顺。",
    ];
  }

  return [
    "This login page is mainly for partners who already joined the affiliate program and need to access reporting, materials, and account status, so it is intentionally lighter than the main program page.",
    "If you do not have an account yet, the better next step is usually the registration page after you have a clear promotion channel and audience in mind, which makes the approval and onboarding flow smoother.",
  ];
}

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const copy = getAffiliateCopy(locale);

  return buildPageMetadata({
    title: copy.login.title,
    description: copy.login.description,
    path: "/affiliate/login",
    locale,
  });
}

export default async function LoginPage() {
  const locale = await getRequestLocale();
  const copy = getAffiliateCopy(locale);
  const narrative = buildAffiliateLoginNarrative(locale);

  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero">
          <div className="split-grid auth-hero">
            <div className="page-copy">
              <SectionHeading
                eyebrow={copy.login.eyebrow}
                title={copy.login.title}
                description={copy.login.description}
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
            <LoginForm locale={locale} copy={copy.login} />
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
