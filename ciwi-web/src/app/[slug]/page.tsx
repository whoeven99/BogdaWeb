import Link from "next/link";
import {notFound} from "next/navigation";
import type {Metadata} from "next";

import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {legacyRouteMap, type LegacyRouteSlug} from "@/content/legacy-routes";
import {pagesCopy} from "@/content/pages-copy";
import {buildPageMetadata} from "@/lib/seo/metadata";

type LegacyPageProps = {
  params: Promise<{slug: string}>;
};

export function generateStaticParams() {
  return Object.keys(legacyRouteMap).map((slug) => ({slug}));
}

export async function generateMetadata({params}: LegacyPageProps) {
  const {slug} = await params;
  const data = legacyRouteMap[slug as LegacyRouteSlug];

  if (!data) {
    return buildPageMetadata({
      title: pagesCopy.legacy.notFound.title,
      description: pagesCopy.legacy.notFound.description,
      path: pagesCopy.legacy.notFound.path,
    });
  }

  const metadata: Metadata = {
    ...buildPageMetadata({
      title: data.title,
      description: data.description,
      path: data.destination,
    }),
    robots: {
      index: false,
      follow: true,
    },
  };

  return metadata;
}

export default async function LegacyRoutePage({params}: LegacyPageProps) {
  const {slug} = await params;
  const data = legacyRouteMap[slug as LegacyRouteSlug];
  const copy = pagesCopy.legacy.hero;

  if (!data) {
    notFound();
  }

  return (
    <main>
      <PageContainer>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.replace(${JSON.stringify(data.destination)});`,
          }}
        />
        <section className="page-section page-hero">
          <div className="surface-card page-copy">
            <SectionHeading eyebrow={copy.eyebrow} title={data.title} description={data.description} as="h1" />
            <p>{copy.notice}</p>
            <p className="quote">
              {copy.redirectingPrefix}
              <code>{data.destination}</code>...
            </p>
            <Link href={data.destination} className="button button--primary">
              {copy.openNewPageLabel}
            </Link>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
