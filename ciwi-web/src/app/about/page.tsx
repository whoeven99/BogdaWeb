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
          description="About 页建议补团队工作状态或方法论相关素材，而不是继续只靠介绍性文字。"
          items={aboutPageMediaBriefs}
        />
        <FinalCtaSection
          title="了解我们，也了解我们的做法"
          description="如果你认同这套产品思路，下一步就去看产品、文章和帮助文档。"
        />
      </PageContainer>
    </main>
  );
}
