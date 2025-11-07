import { Montserrat, Prata } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

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
  weight: ["400"]
});

export const metadata = {
  title: "SecureCash | Covert CIT Provider",
  description:
    "Australia's trusted cash in transit service. Secure, covert banking solutions with 25+ years experience. Available nationwide.",
};

export default function RootLayout({ children })
{
  return (
    <html lang="en">
      <head>
        {/* ✅ Preload First Slide Images Only */}
        <link
          rel="preload"
          href="/images/banner/Slide-1-mobile.jpg"
          as="image"
          media="(max-width: 480px)"
        />
        <link
          rel="preload"
          href="/images/banner/Slide-1-tablet.jpg"
          as="image"
          media="(min-width: 481px) and (max-width: 1023px)"
        />
        <link
          rel="preload"
          href="/images/banner/Slide-1-web.jpg"
          as="image"
          media="(min-width: 1024px)"
        />

        {/* ✅ Fonts Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>

      <body className={`${montserrat.variable} ${prata.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
