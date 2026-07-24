import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {aboutPageMediaBriefs} from "@/content/media-briefs";
import {pagesCopy} from "@/content/pages-copy";
import {sitePages} from "@/content/site-pages";
import {buildPageMetadata} from "@/lib/seo/metadata";

const page = sitePages.about;

export const metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: "/about",
});

export default function AboutPage() {
  const copy = pagesCopy.about;

  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero page-copy">
          <SectionHeading eyebrow={copy.hero.eyebrow} title={page.title} description={page.description} as="h1" />
          {page.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
        <MediaPlaceholderSection
          eyebrow={copy.media.eyebrow}
          title={copy.media.title}
          description={copy.media.description}
          items={aboutPageMediaBriefs}
        />
        <FinalCtaSection
          title={copy.finalCta.title}
          description={copy.finalCta.description}
        />
      </PageContainer>
    </main>
  );
}
