import {WaitlistForm} from "@/components/sections/WaitlistForm";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const copy =
    locale === "zh-cn"
      ? {
          title: "Spark Waiting List",
          description: "加入 Spark Shopify Analytics Agent waiting list，获取 AI 每日经营分析的优先体验资格。",
        }
      : {
          title: "Spark Waiting List",
          description: "Join the Spark Shopify Analytics Agent waiting list for early access to daily AI operating analysis.",
        };

  return buildPageMetadata({
    title: copy.title,
    description: copy.description,
    path: "/waitlist",
    locale,
  });
}

export default async function WaitlistPage() {
  const locale = await getRequestLocale();
  const copy =
    locale === "zh-cn"
      ? {
          hero: {
            eyebrow: "Waiting List",
            title: "加入 Spark Shopify Analytics Agent waiting list",
            description: "如果你想优先体验基于广告、商店、履约和利润数据的 AI 每日经营分析，可以先加入 waiting list。",
            paragraphs: [
              "我们会优先联系正在持续投放广告、关注 ROI、履约稳定性和利润质量的 Shopify 商家。",
              "先留下你的基本信息和当前关注点，后续我们会按场景安排更合适的沟通或内测邀请。",
            ],
            highlights: ["AI 每日经营摘要", "广告 + 商店 + 履约联动", "定价 / ROI / 利润综合判断"],
          },
          form: {
            title: "提交 waiting list 申请",
            description: "填写后我们会记录你的需求；如果直连接口尚未配置，系统会自动帮你生成一封待发送邮件。",
            fields: {
              name: "姓名",
              email: "工作邮箱",
              storeUrl: "店铺链接",
              role: "你的角色",
              notes: "你最想解决的问题",
            },
            placeholders: {
              name: "例如：Cedric",
              email: "name@company.com",
              storeUrl: "例如：https://yourstore.com",
              role: "例如：Founder / Operator / Growth",
              notes: "例如：我希望每天看到广告花费、履约异常和利润变化，快速判断哪些商品或投放需要调整。",
            },
            helperText: "建议补充你当前最关心的经营问题，这样我们后续更容易给出有用反馈。",
            submitLabel: "加入 waiting list",
            submittingLabel: "提交中...",
            errorMessage: "提交失败，请稍后再试。",
          },
        }
      : {
          hero: {
            eyebrow: "Waiting List",
            title: "Join the Spark Shopify Analytics Agent waiting list",
            description: "If you want early access to AI daily operating analysis across ads, store performance, fulfillment, and profit signals, join the waiting list here.",
            paragraphs: [
              "We are prioritizing Shopify merchants already running paid acquisition and actively evaluating ROI, fulfillment quality, and profit health.",
              "Share a little context now and we can follow up with a better-fit conversation or early-access invite.",
            ],
            highlights: ["AI daily briefings", "Ads + store + fulfillment", "Pricing / ROI / margin insight"],
          },
          form: {
            title: "Submit your waitlist request",
            description: "Once submitted, we will capture your request. If the direct intake service is not connected yet, we will prepare a draft email for you automatically.",
            fields: {
              name: "Name",
              email: "Work email",
              storeUrl: "Store URL",
              role: "Role",
              notes: "What do you want to evaluate?",
            },
            placeholders: {
              name: "For example: Cedric",
              email: "name@company.com",
              storeUrl: "For example: https://yourstore.com",
              role: "For example: Founder / Operator / Growth",
              notes: "For example: I want a daily read on ad spend, fulfillment issues, and profit shifts so we can spot weak campaigns and pricing problems faster.",
            },
            helperText: "A little context helps us understand whether Spark fits your current operating questions.",
            submitLabel: "Join the waiting list",
            submittingLabel: "Submitting...",
            errorMessage: "We couldn't submit the form right now. Please try again.",
          },
        };

  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero">
          <div className="split-grid waitlist-hero">
            <div className="page-copy">
              <SectionHeading
                eyebrow={copy.hero.eyebrow}
                title={copy.hero.title}
                description={copy.hero.description}
                as="h1"
              />
              {copy.hero.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="tag-list space-top-lg">
                {copy.hero.highlights.map((item) => (
                  <span key={item} className="pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <WaitlistForm locale={locale} copy={copy.form} />
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
