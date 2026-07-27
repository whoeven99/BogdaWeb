import {HelpCenterDocsLayout} from "@/components/sections/HelpCenterDocsLayout";
import {PageContainer} from "@/components/ui/PageContainer";
import {helpCenterDocs} from "@/content/help-center";
import {pagesCopy} from "@/content/pages-copy";
import {buildPageMetadata} from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: pagesCopy.helpCenter.metadata.title,
  description: pagesCopy.helpCenter.metadata.description,
  path: pagesCopy.helpCenter.metadata.path,
});

export default function HelpCenterPage() {
  const currentDoc = helpCenterDocs[0];

  return (
    <main>
      <PageContainer>
        <HelpCenterDocsLayout currentDoc={currentDoc} docs={helpCenterDocs} eyebrow={pagesCopy.helpCenter.hero.eyebrow} />
      </PageContainer>
    </main>
  );
}
