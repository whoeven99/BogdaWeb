import {notFound} from "next/navigation";

import {FaqSection} from "@/components/sections/FaqSection";
import {FinalCtaSection} from "@/components/sections/FinalCtaSection";
import {MediaPlaceholderSection} from "@/components/sections/MediaPlaceholderSection";
import {ArticleCard} from "@/components/cards/ArticleCard";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {compareMap, compares} from "@/content/compare";
import {blogPosts} from "@/content/blog";
import {getCompareMediaBriefs} from "@/content/media-briefs";
import {buildPageMetadata, siteUrl} from "@/lib/seo/metadata";
import {buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema} from "@/lib/seo/schema";
import {helpCenterDocs} from "@/content/help-center";

type CompareDetailPageProps = {
  params: Promise<{slug: string}>;
};

export function generateStaticParams() {
  return compares.map((item) => ({slug: item.slug}));
}

export async function generateMetadata({params}: CompareDetailPageProps) {
  const {slug} = await params;
  const data = compareMap[slug];

  if (!data) {
    return buildPageMetadata({
      title: "Compare not found",
      description: "The requested compare page could not be found.",
      path: "/compare",
    });
  }

  return buildPageMetadata({
    title: data.title,
    description: data.description,
    path: `/compare/${data.slug}`,
  });
}

export default async function CompareDetailPage({params}: CompareDetailPageProps) {
  const {slug} = await params;
  const data = compareMap[slug];

  if (!data) {
    notFound();
  }

  const pageUrl = new URL(`/compare/${data.slug}`, siteUrl).toString();
  const siblingCompares = compares.filter((item) => item.slug !== data.slug).slice(0, 2);
  const structuredData = [
    buildBreadcrumbSchema([
      {name: "Home", item: siteUrl},
      {name: "Compare", item: new URL("/compare", siteUrl).toString()},
      {name: data.title, item: pageUrl},
    ]),
    buildWebPageSchema({
      url: pageUrl,
      name: data.title,
      description: data.description,
      keywords: ["Shopify compare", data.title, ...data.bestFor],
    }),
    buildFaqSchema(data.faq),
  ];
  const mediaBriefs = getCompareMediaBriefs(data);

  return (
    <main>
      <PageContainer>
        {structuredData.map((schema, index) => (
          <script
            key={`${data.slug}-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
          />
        ))}
        <section className="page-section page-hero">
          <SectionHeading eyebrow="Compare" title={data.title} description={data.description} as="h1" />
          <div className="detail-grid">
            <article className="surface-card">
              <h3>Summary</h3>
              <p className="quote">{data.summary}</p>
            </article>
            <article className="surface-card">
              <h3>Best fit for</h3>
              <ul className="check-list">
                {data.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <MediaPlaceholderSection
          eyebrow="Compare media"
          title="对比页视觉预留"
          description="对比页适合补一张并排对照图，让用户在读维度之前先感受到两条路径的差异。"
          items={mediaBriefs}
        />

        <section className="page-section">
          <SectionHeading
            eyebrow="Dimensions"
            title="关键差异"
            description="先看真正影响选型判断的几个维度。"
          />
          <div className="faq-list">
            {data.dimensions.map((dimension) => (
              <article key={dimension.label} className="surface-card section-stack">
                <h3>{dimension.label}</h3>
                <div className="detail-grid">
                  <div>
                    <div className="section-heading__eyebrow">Ciwi</div>
                    <p className="quote">{dimension.ciwi}</p>
                  </div>
                  <div>
                    <div className="section-heading__eyebrow">Alternative</div>
                    <p className="quote">{dimension.alternative}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section">
          <SectionHeading
            eyebrow="Highlights"
            title="简明结论"
            description="把方向差异说清楚，而不是只看功能表。"
          />
          <div className="card-grid">
            {data.highlights.map((highlight) => (
              <article key={highlight} className="surface-card">
                <p className="quote">{highlight}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section">
          <SectionHeading
            eyebrow="Continue reading"
            title="继续查看"
            description="从这里继续看产品页、文章和帮助文档。"
          />
          <div className="resource-grid">
            {siblingCompares.map((item) => (
              <ArticleCard
                key={item.slug}
                title={item.title}
                description={item.description}
                href={`/compare/${item.slug}`}
                meta={["Compare", "Alternative"]}
              />
            ))}
            <ArticleCard
              title={blogPosts[0].title}
              description={blogPosts[0].description}
              href={blogPosts[0].href}
              meta={["Blog", blogPosts[0].publishedAt]}
            />
            <ArticleCard
              title={helpCenterDocs[0].title}
              description={helpCenterDocs[0].description}
              href={helpCenterDocs[0].href}
              meta={helpCenterDocs[0].meta}
            />
            <ArticleCard
              title="AI Translator"
              description="回到产品页，直接看适用场景、Demo 和关键能力。"
              href="/products/translator"
              meta={["Product", "Translator"]}
            />
          </div>
        </section>

        <FaqSection items={data.faq} />
        <FinalCtaSection
          title="从比较，进入判断"
          description="如果你已经看清方向差异，下一步就该进入产品页或帮助文档确认细节。"
          primaryLabel="Open translator product"
          primaryHref="/products/translator"
          secondaryLabel="Browse compare pages"
          secondaryHref="/compare"
        />
      </PageContainer>
    </main>
  );
}
