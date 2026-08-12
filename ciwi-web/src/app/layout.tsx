import {Geist, Geist_Mono} from "next/font/google";
import type {ReactNode} from "react";
import Script from "next/script";

import {LocaleProvider} from "@/components/providers/LocaleProvider";
import {SiteFooter} from "@/components/layout/SiteFooter";
import {SiteHeader} from "@/components/layout/SiteHeader";
import {getRequestLocale} from "@/lib/i18n-server";
import {getHtmlLang} from "@/lib/i18n";

import "./globals.css";

const GOOGLE_ANALYTICS_ID = "G-Y10P6WTLEX";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
