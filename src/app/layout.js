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
        {/* ✅ Preload ONLY first slide - Next.js auto-optimizes */}
        <link
          rel="preload"
          as="image"
          href="/images/banner/Slide-1-web.jpg"
          fetchPriority="high"
        />

        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
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