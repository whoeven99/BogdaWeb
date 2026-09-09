import {RegisterForm} from "@/components/affiliate/RegisterForm";
import {PageContainer} from "@/components/ui/PageContainer";
import {SectionHeading} from "@/components/ui/SectionHeading";
import {getAffiliateCopy} from "@/content/affiliate";
import {getRequestLocale} from "@/lib/i18n-server";
import {buildPageMetadata} from "@/lib/seo/metadata";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const copy = getAffiliateCopy(locale);

  return buildPageMetadata({
    title: copy.register.title,
    description: copy.register.description,
    path: "/affiliate/register",
    locale,
  });
}

export default async function RegisterPage() {
  const locale = await getRequestLocale();
  const copy = getAffiliateCopy(locale);

  return (
    <main>
      <PageContainer>
        <section className="page-section page-hero">
          <div className="split-grid auth-hero">
            <div className="page-copy">
              <SectionHeading
                eyebrow={copy.register.eyebrow}
                title={copy.register.title}
                description={copy.register.description}
                as="h1"
              />
            </div>
            <RegisterForm locale={locale} copy={copy.register} />
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
