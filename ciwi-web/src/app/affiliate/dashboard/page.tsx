import {AffiliateDashboard} from "@/components/affiliate/AffiliateDashboard";
import {PageContainer} from "@/components/ui/PageContainer";
import {getAffiliateCopy} from "@/content/affiliate";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const copy = getAffiliateCopy(locale);

  return buildPageMetadata({
    title: copy.dashboard.title,
    description: copy.dashboard.overview.statsDescription,
    path: "/affiliate/dashboard",
    locale,
  });
}

export default async function DashboardPage() {
  const locale = await getRequestLocale();
  const copy = getAffiliateCopy(locale);

  return (
    <main>
      <PageContainer>
        <AffiliateDashboard copy={copy.dashboard} />
      </PageContainer>
    </main>
  );
}
