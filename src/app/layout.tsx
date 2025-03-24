import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Source_Sans_3, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoToTopButton from "@/components/GoToTopButton";
import { siteDetails } from '@/data/siteDetails';

// Gtag Config
import Script from "next/script";
const GTAG_ID = "AW-16911785832";

// import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import "./globals.css";

const manrope = Manrope({ subsets: ['latin'] });
const sourceSans = Source_Sans_3({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteDetails.metadata.title,
  description: siteDetails.metadata.description,
  openGraph: {
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    url: siteDetails.siteUrl,
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 675,
        alt: siteDetails.siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    images: ['/images/twitter-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} ${sourceSans.className} antialiased`}
      >
        {/* Google Analytics */}
        {siteDetails.googleAnalyticsId && <GoogleAnalytics gaId={siteDetails.googleAnalyticsId} />}
        {/* Google Ads Global Site Tag */}
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`} />
        <Script
          id="google-ads"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              // Initialize Google Ads Conversion Tracking
              gtag('config', '${GTAG_ID}'); 
            `,
          }}
        />
        <Header />
        <Analytics />
        <SpeedInsights />
        <main>
          {children}
        </main>
        <Footer />
        <GoToTopButton />
      </body>
    </html>
  );
}
