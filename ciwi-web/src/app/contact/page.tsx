import {Button} from "@/components/ui/Button";
import {ContactForm} from "@/components/sections/ContactForm";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getSitePages} from "@/content/site-pages";
import {getRequestLocale} from "@/lib/i18n-server";
import {ciwiShopifyInstallUrl} from "@/lib/marketing-links";
import {buildPageMetadata} from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const page = getSitePages(locale).contact;

  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: "/contact",
    locale,
  });
}

export default async function ContactPage() {
  const locale = await getRequestLocale();
  const page = getSitePages(locale).contact;
  const copy = locale === "zh-cn"
    ? {
        eyebrow: "联系",
        form: {
          title: "开始沟通",
          description: "如果你正在评估 Shopify 多语言、本地化、增长或新的 AI 产品方向，可以直接从这里留信息。",
          fields: {
            name: "姓名",
            email: "工作邮箱",
            company: "店铺或公司",
            role: "你的角色",
            notes: "你想沟通什么",
          },
          placeholders: {
            name: "例如：Cedric",
            email: "name@company.com",
            company: "例如：yourstore.com / BOGDA",
            role: "例如：Founder / Operator / Growth",
            notes: "例如：我们想了解多语言、本地化、Spark analytics agent，或者其他 Shopify 增长场景。",
          },
          helperText: "提交后我们会把信息同步到内部飞书，并尽快联系你。",
          submitLabel: "提交信息",
          submittingLabel: "提交中...",
          errorMessage: "提交失败，请稍后重试。",
        },
        alternateTitle: "其他方式",
        alternateDescription: "如果你希望直接安装应用或发邮件，也可以继续使用下面两个入口。",
        installLabel: "前往 Shopify 安装",
        installHref: ciwiShopifyInstallUrl,
        supportEmailLabel: "support@ciwi.ai",
        supportEmailHref: "mailto:support@ciwi.ai",
      }
    : {
        eyebrow: "Contact",
        form: {
          title: "Start a conversation",
          description: "If you are evaluating Shopify localization, growth workflows, or a new AI product direction, you can leave your details here directly.",
          fields: {
            name: "Name",
            email: "Work email",
            company: "Store or company",
            role: "Role",
            notes: "What do you want to discuss?",
          },
          placeholders: {
            name: "For example: Cedric",
            email: "name@company.com",
            company: "For example: yourstore.com / BOGDA",
            role: "For example: Founder / Operator / Growth",
            notes: "For example: We want to discuss localization, Spark analytics, or another Shopify growth workflow.",
          },
          helperText: "Once submitted, we will send the message to our internal Feishu bot and follow up soon.",
          submitLabel: "Submit",
          submittingLabel: "Submitting...",
          errorMessage: "We couldn't submit your message right now. Please try again.",
        },
        alternateTitle: "Other ways",
        alternateDescription: "If you would rather install the app first or email us directly, both paths stay available below.",
        installLabel: "Install on Shopify",
        installHref: ciwiShopifyInstallUrl,
        supportEmailLabel: "support@ciwi.ai",
        supportEmailHref: "mailto:support@ciwi.ai",
      };

  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero">
          <div className="split-grid">
            <div className="page-copy">
              <SectionHeading eyebrow={copy.eyebrow} title={page.title} description={page.description} as="h1" />
              {page.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="section-stack">
              <ContactForm locale={locale} copy={copy.form} />
              <div className="surface-card">
                <h3>{copy.alternateTitle}</h3>
                <p className="quote">{copy.alternateDescription}</p>
                <div className="faq-list">
                  <Button href={copy.installHref}>{copy.installLabel}</Button>
                  <Button href={copy.supportEmailHref} variant="secondary">
                    {copy.supportEmailLabel}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
