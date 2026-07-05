import Link from "next/link";
import {notFound} from "next/navigation";
import type {Metadata} from "next";

import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {legacyRouteMap, type LegacyRouteSlug} from "@/content/legacy-routes";
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
      title: "Page not found",
      description: "The requested page could not be found.",
      path: "/",
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
            <SectionHeading eyebrow="Legacy route" title={data.title} description={data.description} as="h1" />
            <p>
              这类旧根级页面已经纳入新的目录化结构。当前兼容页会自动把访问者带到新版地址，并把 canonical 收敛到新页面。
            </p>
            <p className="quote">Redirecting to <code>{data.destination}</code>...</p>
            <Link href={data.destination} className="button button--primary">
              Open new page
            </Link>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
