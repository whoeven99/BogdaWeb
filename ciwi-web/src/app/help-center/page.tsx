import {HelpCenterDocsLayout} from "@/components/sections/HelpCenterDocsLayout";
import {PageContainer} from "@/components/ui/PageContainer";
import {getHelpCenterDocs} from "@/content/help-center";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = await getRequestLocale();

  return buildPageMetadata({
    title: locale === "zh-cn" ? "帮助中心" : "Help Center",
    description:
      locale === "zh-cn"
        ? "快速查看安装、配置、翻译流程和术语控制相关文档。"
        : "Browse installation, setup, translation workflow, and glossary documentation in one place.",
    path: "/help-center",
    locale,
  });
}

export default async function HelpCenterPage() {
  const locale = await getRequestLocale();
  const helpCenterDocs = getHelpCenterDocs(locale);
  const currentDoc = helpCenterDocs[0];
  const eyebrow = locale === "zh-cn" ? "帮助中心" : "Help Center";

  return (
    <main>
      <PageContainer>
        <HelpCenterDocsLayout currentDoc={currentDoc} docs={helpCenterDocs} eyebrow={eyebrow} locale={locale} />
      </PageContainer>
    </main>
  );
}
