import { Montserrat, Prata } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Script from 'next/script'; // Import Script

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const prata = Prata({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-prata",
  weight: ["400"],
});

export const metadata = {
  title: "SecureCash | Covert CIT Provider",
  description: "Australia's trusted cash in transit service. Secure, covert banking solutions with 25+ years experience. Available nationwide.",
  metadataBase: new URL('https://www.securecash.com.au'),
  openGraph: {
    title: "SecureCash | Covert CIT Provider",
    description: "Australia's trusted cash in transit service",
    type: "website",
  },
};

export default function RootLayout({ children })
{
  return (
    <html lang="en" className={`${montserrat.variable} ${prata.variable}`}>
      <body className="font-montserrat antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SecureCash",
              "alternateName": "Secure Cash",
              "url": "https://www.securecash.com.au",
              "logo": "https://www.securecash.com.au/images/SecureCash.webp",
              "description": "Australia's trusted cash in transit service. Secure, covert banking solutions with 25+ years experience.",
              "foundingDate": "1992",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+61-1300-732-873",
                "contactType": "customer service",
                "areaServed": "AU",
                "availableLanguage": "en"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AU"
              },
              "sameAs": [
                "https://www.facebook.com/SecureCash/",
                "https://twitter.com/SecureCash",
                "https://www.youtube.com/securecash",
                "https://www.linkedin.com/company/securecash"
              ]
            })
          }}
        />
        <link rel="dns-prefetch" href="https://i.vimeocdn.com" />

        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />

        {/* Updated JivoChat Implementation */}
        <Script
          src="https://code.jivosite.com/widget.js"
          data-jv-id={process.env.NEXT_PUBLIC_JIVO_ID}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}