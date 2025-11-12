import { Montserrat, Prata } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

// ✅ OPTIMIZED: Only load weights actually used in hero section
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  preload: true,
  fallback: ['system-ui', 'arial'], // ✅ ADDED: Faster fallback rendering
});

const prata = Prata({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-prata",
  weight: ["400"],
  preload: true,
  fallback: ['Georgia', 'serif'], // ✅ ADDED: Faster fallback rendering
});

export const metadata = {
  title: "SecureCash | Covert CIT Provider",
  description: "Australia's trusted cash in transit service. Secure, covert banking solutions with 25+ years experience. Available nationwide.",
  openGraph: {
    title: "SecureCash | Covert CIT Provider",
    description: "Australia's trusted cash in transit service",
    type: "website",
  },
};

export default function RootLayout({ children })
{
  return (
    <html lang="en">
      <head>
        {/* Existing preload for AVIF banner images */}
        <link
          rel="preload"
          as="image"
          href="/images/banner/Slide-1-mobile.avif"
          type="image/avif"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/banner/Slide-1-tablet.avif"
          type="image/avif"
          media="(min-width: 768px) and (max-width: 1023px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/banner/Slide-1-web.avif"
          type="image/avif"
          media="(min-width: 1024px)"
          fetchPriority="high"
        />

        {/* ✅ ADD THIS - Structured Data */}
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

        {/* Only keep Vimeo DNS prefetch - remove Google Fonts preconnects */}
        <link rel="dns-prefetch" href="https://i.vimeocdn.com" />
      </head>
      <body
        className={`${montserrat.variable} ${prata.variable} font-montserrat antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}