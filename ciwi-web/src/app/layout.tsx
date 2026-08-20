import type {ReactNode} from "react";
import Script from "next/script";

import {LocaleProvider} from "@/components/providers/LocaleProvider";
import {SiteFooter} from "@/components/layout/SiteFooter";
import {SiteHeader} from "@/components/layout/SiteHeader";
import {getRequestLocale} from "@/lib/i18n-server";
import {getHtmlLang} from "@/lib/i18n";

import "./globals.css";

const GOOGLE_ANALYTICS_ID = "G-Y10P6WTLEX";

export const metadata = {
  icons: {
    icon: "/favicon-32.png",
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getRequestLocale();

  return (
    <html lang={getHtmlLang(locale)}>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
        <LocaleProvider locale={locale}>
          <div className="site-shell">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
