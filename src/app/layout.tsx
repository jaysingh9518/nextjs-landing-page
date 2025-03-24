import Script from "next/script";

const GTAG_ID = "AW-16911785832";
const CONVERSION_LABEL = "qZ7ACkqOuagaEOi-lYA_";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Google Tag for Conversion Tracking */}
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`} />
        <Script
          id="google-ads-tracking"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GTAG_ID}');

              window.trackLeadForm = function () {
                gtag('event', 'conversion', {
                  'send_to': '${GTAG_ID}/${CONVERSION_LABEL}'
                });
              };
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
