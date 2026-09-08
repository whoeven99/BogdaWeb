import {LoginForm} from "@/components/affiliate/LoginForm";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getAffiliateCopy} from "@/content/affiliate";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const copy = getAffiliateCopy(locale);

  return buildPageMetadata({
    title: copy.login.title,
    description: copy.login.description,
    path: "/affiliate/login",
    locale,
  });
}

export default async function LoginPage() {
  const locale = await getRequestLocale();
  const copy = getAffiliateCopy(locale);

  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero">
          <div className="split-grid auth-hero">
            <div className="page-copy">
              <SectionHeading
                eyebrow={copy.login.eyebrow}
                title={copy.login.title}
                description={copy.login.description}
                as="h1"
              />
            </div>
            <LoginForm locale={locale} copy={copy.login} />
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
