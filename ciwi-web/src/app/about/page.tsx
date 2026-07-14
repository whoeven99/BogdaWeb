import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {aboutPageMediaBriefs} from "@/content/media-briefs";
import {sitePages} from "@/content/site-pages";
import {buildPageMetadata} from "@/lib/seo/metadata";

const page = sitePages.about;

export const metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero page-copy">
          <SectionHeading eyebrow="Company" title={page.title} description={page.description} as="h1" />
          {page.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
        <MediaPlaceholderSection
          eyebrow="About media"
          title="品牌与团队素材预留"
          description="About 页建议补团队工作状态或真实产品场景素材，让用户更快建立信任感。"
          items={aboutPageMediaBriefs}
        />
        <FinalCtaSection
          title="了解 Ciwi，也直接去看产品和结果"
          description="如果这套方向和你的店铺目标一致，下一步就去看产品、文章和帮助文档。"
        />
      </PageContainer>
    </main>
  );
}
