import { Montserrat, Prata } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import JivoWidget from "@/utils/JivoWidget";
import GlobalScrollHandler from "@/utils/GlobalScrollHandler";

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

  alternates: {
    canonical: 'https://www.securecash.com.au',
  },

  openGraph: {
    title: "SecureCash | Covert CIT Provider",
    description: "Australia's trusted cash in transit service. Secure, covert banking solutions with 25+ years experience. Available nationwide.",
    url: 'https://www.securecash.com.au',
    siteName: 'SecureCash',
    type: "website",
    locale: 'en_GB',
    images: [
      {
        url: '/images/banner/Slide-1-web.jpg',
        width: 1200,
        height: 630,
        alt: 'SecureCash Covert Cash in Transit Security',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@SecureCash',
    creator: '@SecureCash',
    title: "SecureCash | Covert CIT Provider",
    description: "Australia's trusted cash in transit service. Secure, covert banking solutions with 25+ years experience. Available nationwide.",
    images: ['/images/banner/Slide-1-web.jpg'],
  },

  robots: 'index, follow',
};

export default function RootLayout({ children })
{
  return (
    <html lang="en" className={`${montserrat.variable} ${prata.variable}`} data-scroll-behavior="smooth">
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
        <GlobalScrollHandler />

        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />

        <JivoWidget />

      </body>
    </html>
  );
}